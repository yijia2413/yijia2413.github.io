var graph={};


function graph_vis(){
	graph={};
	graph.color = "green";
	graph.hit = false;
	var points = document.getElementById("point").value;
	var edges = document.getElementById("edge").value;
	if(checkParam_link(points,edges)!="")
		return;
	graph.width=600;
	graph.height=600;
	graph.force = d3.layout.force().charge(-120).linkDistance(50).size([graph.width,graph.height]);
	graph.nodes = new Array();
	graph.links = new Array();
	var edgeSet = d3.set();
	for(var i=0;i<points;i++){
		graph.nodes[i]={};
		graph.nodes[i].name = i;
		graph.nodes[i].h = -1;
		graph.nodes[i].a = -1;
	}
	var hashString;
	var source;
	var target;
	for(var i=0;i<edges;i++){ 
		do{
			source = Math.floor(Math.random()*points);
			target = Math.floor(Math.random()*points);
			while(source==target){
				source = Math.floor(Math.random()*points);
				target = Math.floor(Math.random()*points);
			}
			hashString = source+" "+target;	
		}while(edgeSet.has(hashString));
		edgeSet.add(hashString);
		graph.links[i]={};
		graph.links[i].source = source;
		graph.links[i].target = target;
		graph.links[i].value = 1;
	}
	var svg = d3.select("#svg_graph");
	if(svg[0][0]!=null)
		svg.remove();
	svg = d3.select("#graph").append("svg").attr("width",graph.width).attr("height",graph.height).attr("id","svg_graph").call(d3.behavior.zoom().scaleExtent([1,10]).on("zoom",function(){svg.attr("transform","translate("+d3.event.translate+")scale("+d3.event.scale+")");})).append("g");
	graph.force.nodes(graph.nodes).links(graph.links).start();
	var link = svg.selectAll("#link").data(graph.links).enter().append("line").attr("id","link").style("stroke-width",1).style("stroke","purple").style("stroke-opacity",0.1);
	var node = svg.selectAll("#node").data(graph.nodes).enter().append("circle").attr("id","node").attr("r",6).style("fill",'green').style("opacity",0.5).call(graph.force.drag).on("mouseover",function(d){

	
	var circle_tooltip = d3.select("#tooltip")
		.style("left",(graph.width+20)+"px")
		.style("top",50+"px");
	
	circle_tooltip.selectAll("p").remove();
	circle_tooltip.selectAll("font").remove();
	circle_tooltip.append("p").text("id:"+d.name);
	





	d3.select("#tooltip").classed("hidden",false);
	var in_neighbours = new Array();
	var out_neighbours = new Array();
	link.each(function(p,i){
		if(p.source.name==d.name){
			node[0][p.target.name].style.fill="red";
			out_neighbours.push(p.target.name);

			link[0][i].style['stroke-opacity']=0.5;
		}else if(p.target.name==d.name){
			in_neighbours.push(p.source.name);
			if(node[0][p.source.name].style.fill=="red")
				node[0][p.source.name].style.fill="yellow";
			else{
				node[0][p.source.name].style.fill="blue";
			}
	
			link[0][i].style['stroke-opacity']=0.5;
		}

	});
	if(d.a!=-1 && d.h!=-1){
		circle_tooltip.append("font").attr("color","brown").append("p").text("a:"+d.a);
		circle_tooltip.append("font").attr("color","green").append("p").text("h:"+d.h);
	}else if(d.h!=-1){
		circle_tooltip.append("p").text("importance:"+d.h);
	}
	if(in_neighbours.length!=0){
		var neighbours_contents = circle_tooltip.append("font").attr("color","blue");
		neighbours_contents.append("p").text("in neighbours");
		for(var wz=0;wz<in_neighbours.length||wz<10;wz++){
			neighbours_contents.append("p").text(in_neighbours[wz]);
		}
	}
	if(out_neighbours.length!=0){
		var neighbours_contents = circle_tooltip.append("font").attr("color","red");
		neighbours_contents.append("p").text("out neighbours");
		for(var wz=0;wz<out_neighbours.length||wz<10;wz++){
			neighbours_contents.append("p").text(out_neighbours[wz]);
		}
	}
	d3.select(this).style("fill","purple");



}).on("mouseout",function(){d3.select("#tooltip").classed("hidden",true); d3.selectAll("#node").style("fill",graph.color);d3.selectAll("#link").style("stroke-opacity",0.1);});
	graph.force.on("tick",function(){
		link.attr("x1",function(d){return d.source.x;})
			.attr("y1",function(d){return d.source.y})
			.attr("x2",function(d){return d.target.x})
			.attr("y2",function(d){return d.target.y});

		node.attr("cx",function(d){return d.x;})
			.attr("cy",function(d){return d.y;});
	});
}
function link_vis(){
	
	var selectedList = document.getElementById("targetName");
	var selectAlgo = selectedList.options[selectedList.selectedIndex].getAttribute("value");

	if(selectAlgo=="pagerank"||graph.hit==false)
		d3.selectAll("#node").each(function(d){d.h=-1;d.a=-1;}).style("fill","green");
	

	var result;
	
	if(selectAlgo=="pagerank"){

			var alpha = document.getElementById("alpha").value;
		var checkString="";
		if(isNaN(alpha)||alpha==""||alpha<0||alpha>1){
			checkString+="alpha value->input error!\n";
			document.getElementById("alpha").value="";
		}
		if(checkString!=""){
			alert("alpha value->input error!");
			return;
		}
		var vertex = new Array();
		var edge = new Array();
		for(var i=0;i<graph.nodes.length;i++){
			vertex.push(i);
			edge[i]=new Array();
			for(var k=0;k<graph.nodes.length;k++){
				edge[i][k]=0;		
			}
		}	
		for(var i=0;i<graph.links.length;i++){
			edge[graph.links[i].source.name][graph.links[i].target.name]=1;	
		}
		graph.hit=false;
		var max = 0;
		result = pagerank(vertex,edge,alpha);		
		for(var m=0;m<result[1].length;m++){
			graph.nodes[m].h = result[1][m];
			if(graph.nodes[m].h>max)
				max = graph.nodes[m].h;		
		}
		d3.selectAll("#node").transition().duration(1000).attr("r",function(d){
			return 12*(d.h)/max+3;
		
		});
		graph.color ="green";
	}else{
		if(graph.hit==false){
		var maxA = 0;
		var maxH = 0;
		var vertex = new Array();
		var edge = new Array();
		for(var i=0;i<graph.nodes.length;i++){
			vertex.push(i);
			edge[i]=new Array();
			for(var k=0;k<graph.nodes.length;k++){
				edge[i][k]=0;		
			}
		}	
		for(var i=0;i<graph.links.length;i++){
			edge[graph.links[i].source.name][graph.links[i].target.name]=1;	
		}
		result = hits(vertex,edge);
		for(var m=0;m<result[1].length;m++){
			graph.nodes[m].h = result[1][m];
			if(graph.nodes[m].h>maxH)
				maxH = graph.nodes[m].h;
			graph.nodes[m].a = result[2][m];
			if(graph.nodes[m].a>maxA)
				maxA = graph.nodes[m].a;		
		}
		graph.hit = true;
		graph.maxA = maxA;
		graph.maxH = maxH;
		}
		if(selectAlgo=="hit-a"){
			d3.selectAll("#node").transition().duration(1000).attr("r",function(d){return 12*(d.a)/graph.maxA+3;}).style("fill","brown");
			graph.color="brown";		
		}
		if(selectAlgo=="hit-h"){
			d3.selectAll("#node").transition().duration(1000).attr("r",function(d){return 12*(d.h)/graph.maxH+3;}).style("fill","green");
			graph.color="green";
		}

	}

}


function checkParam_link(points, edges){
	var checkString = "";
	if(isNaN(points)||points<=0||points>100){
		checkString+="points number->input error!\n";
		document.getElementById("point").value="";
		
	}
	if(isNaN(edges)||edges<0 || edges>points*(points-1)/2){
		checkString+="edges number->input error!\n";
		document.getElementById("edge").value="";
		
	}
	if(checkString!="")
		alert(checkString);
	return checkString;
	
}
function pagerank(vertex, edge, beta)
{
//result[0]是一个数组，该数组存储节点的id
//result[1]是一个数组，该数组存储对应节点的pagerank值

	var pagerankResult = new Array();
	var tempResult = new Array();
	var degree = new Array();
	for(var i =0;i<vertex.length;i++ ){
		pagerankResult[i] = 1.0 / vertex.length;
		tempResult[i] = 0.0;
		degree[i] = 0;
	}
	for(var i = 0;i<vertex.length;i++ ){
		for(var j=0;j<edge[i].length;j++){
			if(edge[i][j] == 1){
				degree[i] ++;
			}
		}
	}
	for(var times = 0;times<50;times++){
		for(var i=0;i<vertex.length;i++){
			for(var j=0;j<edge[i].length;j++){
				if(edge[i][j] == 1){
					tempResult[j] += pagerankResult[i] / degree[i];
				}
			}	
		}
		for(var i=0;i<vertex.length;i++){
			pagerankResult[i] = tempResult[i]*beta +(1-beta)/vertex.length;
			tempResult[i] = 0;	
		}
	}
	var result = new Array();
	result[0] = vertex;
	result[1] = pagerankResult;
	return result;
}

function hits(vertex, edge){
//result[0]是一个数组，该数组存储节点的id
//result[1]是一个数组，该数组存储对应节点的h值
//result[1]是一个数组，该数组存储对应节点的a值
	var a = new Array();
	var temp_a = new Array();
	var h = new Array();
	var temp_h = new Array();
	
	for(var i=0;i<vertex.length;i++){
		a[i] = 1;
		h[i] = 1;
		temp_a[i] = 0;
		temp_h[i] = 0;
	}
	for(var times = 0;times<50;times++){
		for(var i=0;i<vertex.length;i++){
			for(var j=0;j<edge[i].length;j++){
				if(edge[i][j] == 1){
					//i指向j，计算aj和hi
					temp_a[j] += h[i];
					temp_h[i] += a[j];
				}
			}	
		}
		var max_a = temp_a[0];
		var max_h = temp_h[0];
		for(var i=0;i<vertex.length;i++){
			if(max_a < temp_a[i]){
				max_a = temp_a[i];
			}
			if(max_h < temp_h[i]){
				max_h = temp_h[i];
			}
		}
		for(var i=0;i<vertex.length;i++){
			a[i] = temp_a[i]/max_a;
			h[i] = temp_h[i]/max_h;
			temp_a[i] = 0;
			temp_h[i] = 0;
		}
	}
	var result = new Array();
	result[0] = vertex;
	result[1] = h;
	result[2] = a;
	return result;
}
