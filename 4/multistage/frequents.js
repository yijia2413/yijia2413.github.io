var patterns={};






function start(){



d3.text("new_docID-wordsID").get(function(error,data){
	
d3.text("new_id_words").get(function(error,id_word_data){
	var wz = id_word_data.split("\n");
	var mean_data = new Array();
	mean_data[0] = "";
	for(var i=0;i<wz.length-1;i++){
		mean_data[i] = wz[i].split(" ")[1];	
	}
	
	var s = data.split("\n");
	var origin_data = new Array();
	for(var i=0;i<s.length-1;i++){
		var ww = s[i].substring(0,s[i].length-1).split(" ");
		var tool_set = d3.set();
		for(var k=0;k<ww.length;k++)
			tool_set.add(ww[k]);
		origin_data.push(tool_set.values().sort(sortNumber));
	}
	s = null;
		
	patterns.result = multistage(origin_data,100,25735);
	



	d3.select("#frequents_results").style("display","block");
	d3.selectAll("#frequent_sel_child").remove();
	var wz_frequent_sel = d3.select("#frequent_sel");
	for(var i=0;i<patterns.result.length-1;i++){
		wz_frequent_sel.append("option").text(i+1).attr("value",i+1).attr("id","frequent_sel_child").on("click", function(){
		var index = d3.select(this).text()-1;
		var items = patterns.result[index];
		var dimension_map = d3.map();
		var trans_dimension = new Array();
		if(index!=0){
			for(var k=0;k<items.length;k++){
				var name = items[k].name.split(" ");
				for(var x=0;x<name.length-1;x++){
					if(!dimension_map.has(name[x])){
						trans_dimension[dimension_map.size()] = name[x];
						dimension_map.set(name[x],dimension_map.size());
										
					}			
				}
			}
		}else{
			for(var k=0;k<items.length;k++){
				trans_dimension[dimension_map.size()] = items[k].name;
				dimension_map.set(items[k].name,dimension_map.size());
			}		
		}
		
		var matrix = new Array();
		for(var k=0;k<dimension_map.size();k++){
			matrix[k]=new Array();
			for(var x=0;x<dimension_map.size();x++)
				matrix[k][x]=0;
		}
		
		if(index!=0){
			for(var k=0;k<items.length;k++){
				var name = items[k].name.split(" ");
				for(var x=0;x<name.length-2;x++){
					var y = x+1;
					matrix[dimension_map.get(name[x])][dimension_map.get(name[y])]+=items[k].frequency;
					matrix[dimension_map.get(name[y])][dimension_map.get(name[x])]+=items[k].frequency;	
				}		
			}
		}else{
			for(var k=0;k<items.length;k++){
				matrix[dimension_map.get(items[k].name)][dimension_map.get(items[k].name)] = items[k].frequency;			
			}
		}
	
		d3.select("#svg_chord").remove();
		var chord_layout = d3.layout.chord().padding(0.03).sortSubgroups(d3.descending).matrix(matrix);
		
		var width = 600;
		var height = 600;
		var innerRadius = width/2*0.7;
		var outerRadius = innerRadius*1.1;
		var color20 = d3.scale.category20();
		var svg = d3.select("#chord").append("svg").attr("width",width).attr("height",height).attr("id","svg_chord").append("g").attr("transform","translate("+width/2+","+height/2+")");
		svg.call(d3.behavior.zoom().scaleExtent([1,10]).on("zoom",function(){svg.attr("transform","translate("+(d3.event.translate[0]+width/2)+","+(d3.event.translate[1]+height/2)+")scale("+d3.event.scale+")");}));
		var outer_arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);
		var g_outer = svg.append("g").attr("class","chord_outer");
		g_outer.selectAll("path").data(chord_layout.groups).enter()
		.append("path").style("fill",function(d,i){return color20(i);})
		.style("stroke",function(d,i){return color20(i);})
		.attr("d",outer_arc);

		g_outer.selectAll("text").data(chord_layout.groups).enter().append("text").each(function(d,i){d.angle = (d.startAngle + d.endAngle)/2.0; d.name = mean_data[trans_dimension[i]];})
	.attr("dy",".35em").attr("transform",function(d){ return "rotate("+(d.angle*180/Math.PI)+")"+"translate(0,"+ -1.0*(outerRadius+10)+")"+((d.angle>Math.PI*0.25 && d.angle<Math.PI*0.8)? "rotate(180)":"");}).text(function(d){
				if(d.endAngle-d.startAngle<0.3)
					return "";

			return d.name;});
		
		var inner_chord = d3.svg.chord().radius(innerRadius);
		var chords = svg.append("g").attr("class","chord").selectAll("path")
		.data(chord_layout.chords).enter().append("path")
		.attr("d",inner_chord).style("fill",function(d){ return color20(d.source.index);}).style("opacity",0.67).on("mouseover",function(d,i){
			d3.select(this).style("opacity",1).style("fill","yellow");
			/**var tooltip_chord = d3.select("#tooltip");
			tooltip_chord.selectAll("p").remove();
			var xPosition = parseFloat(d3.mouse(this)[0]);
			var yPosition = parseFloat(d3.mouse(this)[1]);
			tooltip_chord.append("p").text("frequency:"+parseInt(d.source.value));
			tooltip_chord.classed("hidden",false);
			tooltip_chord.style("left",(xPosition+width/2+20)+"px");
			tooltip_chord.style("top",(yPosition+height/2-20)+"px");*/
		}).on("mouseout",function(d){
			d3.select("#tooltip").classed("hidden",true);
			d3.select(this).transition().duration(500).style("fill",color20(d.source.index)).style("opacity",0.67);
		});


	g_outer.selectAll("path").on("mouseover",function(d,i){
		
		var tooltip_content = d3.select("#tooltip");
		tooltip_content.selectAll("p").remove();
		tooltip_content.append("p").text(d.name);
		
		tooltip_content.append("p").text("co-dimension-display");
		tooltip_content.classed("hidden",false);
		tooltip_content.style("left",(width+50)+"px");
		tooltip_content.style("top",100+"px");




		chords.classed("fade",function(p){
			var co_content = d3.select("#tooltip");
			var test =( p.source.index!=i && p.target.index!=i);
			if(test==false){
				if(p.source.index!=i)
					co_content.append("p").append("font").attr("color",function(){return color20(p.source.index);}).text(mean_data[trans_dimension[p.source.index]]+":"+Math.floor((p.source.value+0.0)/d.value*100)+"%");
				else
					co_content.append("p").append("font").attr("color",function(){return color20(p.target.index);}).text(mean_data[trans_dimension[p.target.index]]+":"+Math.floor((p.target.value+0.0)/d.value*100)+"%");
			}
				


			return test;});
	}).on("click",function(){chords.classed("fade",false);}).on("mouseout",function(){
		d3.select("#tooltip").classed("hidden",true);});




		var q = chord_layout.chords();

		var frequents_form = d3.select("#frequents_results");
		frequents_form.selectAll("font").remove();
		var alpha_link = frequents_form.append("font").attr("color","green");
		for(var x=0;x<items.length;x++){
			if(x>20)
				break;
			alpha_link.append("p").text(
				function(){
					if(index!=0){
					var temp = items[x].name.substring(0,items[x].name.length-1).split(" ");
					var temp_result = "";
					for(var w=0;w<temp.length-1;w++){
						temp_result+=(mean_data[temp[w]]+",");
					}
					temp_result+=(mean_data[temp[temp.length-1]]);
					temp_result+=(" "+"support:"+items[x].frequency);
					return temp_result;
					}else{
					temp_result = mean_data[items[x].name]+" support:"+items[x].frequency;
					return temp_result;	
					}				
				}




/**items[x].name.substring(0,items[x].name.length-1).replace(new RegExp(" ","gm"),",")+" "+"support:"+items[x].frequency*/).attr("title",function(){return items[x].name.substring(0,items[x].name.length-1);}).style("font-size","12px").on("mouseout",function(){d3.select(".newchord").remove();}).on("mouseover",function(){
			d3.select(".newchord").remove();
			var se_items = d3.select(this).attr("title").split(" ");			
			//var se_items = d3.select(this).text().split(" support")[0].split(" ")[0].split(",");
			

			var newchord = new Array();
			var count =0;

			for(var k=0;k<se_items.length-1;k++){
				for(var m=0;m<q.length;m++){
					if(q[m].source.index == dimension_map.get(se_items[k]) && q[m].target.index == dimension_map.get(se_items[k+1]) || q[m].target.index == dimension_map.get(se_items[k]) && q[m].source.index == dimension_map.get(se_items[k+1])){
							
						var tool ={};
						tool.source = {};
						tool.source.index = q[m].source.index;
						tool.source.subindex = q[m].source.subindex;
						tool.source.value = 1;
						tool.target={};
						tool.target.index = q[m].target.index;
						tool.target.subindex = q[m].target.subindex;
						tool.target.value = 1;
						var holder = (q[m].source.endAngle-q[m].source.startAngle)/2;
						var middle = (q[m].source.startAngle+q[m].source.endAngle)/2;
						tool.source.startAngle = middle-holder*0.5;
						tool.source.endAngle = middle+holder*0.5;
						holder = (q[m].target.endAngle-q[m].target.startAngle)/2;
						middle = (q[m].target.startAngle+q[m].target.endAngle)/2;
						tool.target.startAngle =middle-holder*0.5;
						tool.target.endAngle = middle+holder*0.5;
						newchord.push(tool);
						break;				
					}				
				}			
			}

			
			svg.append("g").attr("class","newchord").selectAll("path").data(newchord).enter().append("path").attr("d",inner_chord).attr("pointer-events","none").style("opacity",0.67).style("fill","black");
});
		}
	});	
		
	}
});
});
}


function get_data(){
	d3.text("documents").get(function(error,data){
		var s = data.split("\n");
		var order_max = 0;
		data = null;
		inputdata = new Array();
		for(var i=0;i<s.length-1;i++){
			inputdata[i] = new Array();
			var eachrow = s[i].split(" ");
			for(var k=1;k<eachrow.length;k++){
				inputdata[i].push(eachrow[k]);
				if(order_max<eachrow[k])
					order_max = eachrow[k];
			}
			inputdata[i] = inputdata[i].sort(sortNumber);
		}
		
		alert(inputdata.length);
		multistage(inputdata,100,order_max);	
	});
}
function gen_data(){
	d3.text("docID-wordsID").get(function(error,data){
		alert(error);
		alert(data);
		var s = data.split("\n");
		var origin_data = new Array();
		for(var i=0;i<s.length-1;i++)
			origin_data.push(s[i].split(" ").sort(sortNumber));
		s = null;
		return origin_data;
	});

/**
	
	var origin_data = new Array();
	for(var i=0;i<1000;i++){
		var sub_data = new Array();
		for(var k=0;k<10;k++){
			sub_data[k] = Math.floor(100*Math.random());
		}
		//sub_data.push(1);
		//sub_data.push(2);
		//sub_data.push(3);
		origin_data.push(sub_data.sort(sortNumber));
	}
	return origin_data;*/
}

function multistage(data,threshold,order_max){
	var single_frequent = new Array();
	var dimensions = 20;
	var result = new Array();
	
	var baskets = 1009;
	var hashBuckets = new Array();
	
	//one pass
	
	for(var i=0;i<baskets;i++)
		hashBuckets[i]=0;

	for(var i=0;i<order_max;i++)
		single_frequent[i]=0;

	for(var i=0;i<data.length;i++){
		for(var k=0;k<data[i].length;k++){
			single_frequent[data[i][k]]++;
			for(var m=k+1;m<data[i].length;m++){
				
				hashBuckets[(data[i][k]+1)*(data[i][m]+1)%baskets]++;
			}
		}
	}
	
	//two pass

	
	var frequent_items = d3.set();
	for(var i=0;i<single_frequent.length;i++){
		if(single_frequent[i]>=threshold)
			frequent_items.add(i);
	}


	//alert(frequent_items.size());
	result[0] = new Array();
	var as = d3.set();
	for(var i=0;i<=dimensions && i<=frequent_items.size();i++){
		var obj = {};
		var max = -1;
		var index = -1;
		frequent_items.forEach(function(d){
			if(!as.has(d) && max<single_frequent[d]){
				max = single_frequent[d];
				index = d;
			}		


		});
		as.add(index);
		obj.name = index;
		obj.frequency = single_frequent[index];
		result[0].push(obj);
	}
	as = null;





	single_frequent = null;
	
	
		
	var new_baskets = 997;
		
	var bitmap1 = trans_bitmap(hashBuckets,threshold,baskets);

	for(var i=0;i<baskets;i++)
		hashBuckets[i] = 0;
	
	for(var i=0;i<data.length;i++){
		for(var k=0;k<data[i].length;k++){
			if(!frequent_items.has(data[i][k]))
				continue;
			for(var m=k+1;m<data[i].length;m++){
				if(frequent_items.has(data[i][m]) && is_frequent(bitmap1,(data[i][k]+1)*(data[i][m]+1)%baskets))
					hashBuckets[(data[i][k]+1)*(data[i][m]+1)%new_baskets]++;
					
			}
		}
	}
	
	var bitmap2 = trans_bitmap(hashBuckets,threshold,new_baskets);
	hashBuckets = null;
	
	var c2 = d3.map();
	for(var i=0;i<data.length;i++){
		for(var k=0;k<data[i].length;k++){
			if(!frequent_items.has(data[i][k]))
				continue;
			for(var m = k+1;m<data[i].length;m++){
				if(frequent_items.has(data[i][m]) && is_frequent(bitmap2,(data[i][k]+1)*(data[i][m]+1)%new_baskets)){
					if(c2.has(data[i][k]+" "+data[i][m]+" "))
						c2.set(data[i][k]+" "+data[i][m]+" ",c2.get(data[i][k]+" "+data[i][m]+" ")+1);
					else
						c2.set(data[i][k]+" "+data[i][m]+" ",1);
				}
			}
		}
	}
	bitmap1 = null;
	bitmap2 = null;
	//alert(c2.size());
	var l2 = d3.map();


	c2.forEach(function(d){
		if(c2.get(d)>=threshold)
			l2.set(d,new Array());	
	});
	//alert(l2.size());
	c2 = null;
	
	
	//alert(l2.size());
	for(var i=0;i<data.length;i++){
		for(var k=0;k<data[i].length;k++){
			if(!frequent_items.has(data[i][k]))
				continue;
			for(var m=k+1;m<data[i].length;m++){
				if(l2.has(data[i][k]+" "+data[i][m]+" "))
					l2.get(data[i][k]+" "+data[i][m]+" ").push(i);
			}
		}
		data[i] = null;
	}
	
	data = null;	

	
	as = d3.set();
	result[1] = new Array();
	var sss = count_dimensions(dimensions,l2);
	var as_candi = d3.set();
	while(as.size()<=sss){
		var max = -1;
		var index = -1;
		l2.forEach(function(d){
			if(!as_candi.has(d) && l2.get(d).length>max){
				max = l2.get(d).length; 
				index = d;		
			}		
		});
		
		as_candi.add(index);
		var key_split = index.split(" ");
		for(var x=0;x<key_split.length-1;x++)
			as.add(key_split[x]);
		
		var obj = {};
		obj.name = index;
		obj.frequency = max;
		result[1].push(obj);
	}
	as = null;
	as_candi = null;
	var result_count =2;
	
	
	while(l2.size()!=0){
		var l3 =d3.map();
		var current_keys = l2.keys();
		for(var i=0;i<current_keys.length;i++){
			for(var k=i+1;k<current_keys.length;k++){
				var c_set = pick_success(current_keys[i],current_keys[k],l2);
				if(c_set!=null){
					var x=0,y=0;
					var first = l2.get(current_keys[i]);
					var second = l2.get(current_keys[k]);
					var combine = new Array();
					while(x<first.length && y<second.length){
						if(first[x]<second[y])
							x++;
						else if(first[x]>second[y])
							y++;
						else{
							combine.push(first[x]);
							x++;
							y++;
						}
					}
					if(combine.length>=threshold){
						l3.set(c_set,combine);
					}
				}
			}
		}
		l2 = l3;
		l3 = null;
		
		
		result[result_count] = new Array();
		as = d3.set();
		as_candi = d3.set();
		sss = count_dimensions(dimensions,l2);
		while(as.size()<=sss){
			var max = -1;
			var index = -1;
			l2.forEach(function(d){
				if(!as_candi.has(d) && l2.get(d).length>max){
					max = l2.get(d).length; 
					index = d;		
				}		
			});
			as_candi.add(index);
			var key_split = index.split(" ");
			for(var x=0;x<key_split.length-1;x++)
				as.add(key_split[x]);
		
			var obj = {};
			obj.name = index;
			obj.frequency = max;
			result[result_count].push(obj);
		
		}
		as=null;
		as_candi=null;
		result_count++;

	}
	

	return result;
	
	
	
}
function pick_success(key1,key2,l_low){
	var first_key = key1.split(" ");
	var second_key = key2.split(" ");
	for(var i=0;i<first_key.length-2;i++){
		if(first_key[i]!=second_key[i])
			return null;
	}
	
		
	var keys = d3.set();
	for(var i=0;i<first_key.length-1;i++)
		keys.add(first_key[i]);
	for(var i=0;i<second_key.length-1;i++)
		keys.add(second_key[i]);
	var list_keys = keys.values();
	list_keys = list_keys.sort(sortNumber);
	for(var i=0;i<list_keys.length;i++){
		var subs = "";
		for(var k=0;k<list_keys.length;k++){
			if(k==i)
				continue;
			subs+=(list_keys[k]+" ");
		}
		if(!l_low.has(subs))
			return null;
	}
	
	var result="";
	for(var i=0;i<list_keys.length;i++)
		result+=(list_keys[i]+" ");
	return result;
}
function sortNumber(a,b){
	return a-b;
}

function is_frequent(bitmap, index){
	var deviation = 31-index%32;
	var place = Math.floor(index/32);
	var count = 1<<deviation;
	if(bitmap[place]&count!=0)
		return true;
	return false;
}
function trans_bitmap(hashBuckets, threshold,baskets){
	var index = 0;
	var count = 0;
	var bit_32 = 0;
	var bit_map = new Array();
	for(var i=0;i<Math.floor(baskets/32)+1;i++)
		bit_map[i] = 0;
	for(var i=0;i<hashBuckets.length;i++){
		if(count%32==0 && count!=0){
			bit_map[index++] = bit_32;
			bit_32=0;
			count=0;
		}
		if(hashBuckets[i]>=threshold)
			bit_32 = (bit_32<<1)+1;
		else
			bit_32 = bit_32<<1;
		count++;
	}
	return bit_map;
	
}
function count_dimensions(dimensions,l2){
	var keys_set = d3.set();
	l2.forEach(function(d){
		var key_split = d.split(" ");
		for(var i=0;i<key_split.length-1;i++)
			keys_set.add(key_split[i]);	

	});

	return d3.min([dimensions,keys_set.size()-1]);
}

function sortNumber(a,b){
	return a-b;
}
