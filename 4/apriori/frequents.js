var patterns={};

function generate_items(){
	var ids = document.getElementById("id_number").value;
	var dimensions = document.getElementById("dimensions").value;
	var validBits = document.getElementById("valid_bits").value;
	
	if(checkParam_frequent(ids,dimensions,validBits)!="")
		return;	

	patterns.validBits = parseInt(validBits);	
	patterns.ids = parseInt(ids);
	patterns.dimensions = parseInt(dimensions);
	
	var owner_set = d3.set();
	patterns.matrix = new Array();
	for(var i=0;i<ids;i++){
		patterns.matrix[i] = new Array();
		for(var j=0;j<dimensions;j++)
			patterns.matrix[i][j]=0;
	} 
	var hashString;
	var source;
	var target;
	for(var i=0;i<validBits;i++){
		do{
			source = Math.floor(Math.random()*ids);
			target = Math.floor(Math.random()*dimensions);
			hashString = source+" "+target;
		}while(owner_set.has(hashString));
		owner_set.add(hashString);
		patterns.matrix[source][target]=1;
	}


	patterns_asymatrix = new Array();
	for(var i=0;i<dimensions;i++){
		patterns_asymatrix[i] = new Array();
		for(var k=0;k<dimensions;k++){
			patterns_asymatrix[i][k] = 0;
		}
	}
	
	for(var i=0;i<dimensions;i++){
		for(var k=0;k<dimensions;k++){
			if(i==k)
				continue;
			for(var m=0;m<ids;m++){
				if(patterns.matrix[m][i]==1 && patterns.matrix[m][k]==1)
					patterns_asymatrix[i][k]++;
			}
		}
	}
	patterns.svg = d3.select("#svg_chord");
	if(patterns.svg[0][0]!=null)
		patterns.svg.remove();
	patterns.chord_layout = d3.layout.chord().padding(0.03).sortSubgroups(d3.descending).matrix(patterns_asymatrix);
	
	var width = 600;
	var height = 600;
	var innerRadius = width/2*0.7;
	var outerRadius = innerRadius*1.1;
	var color20 = d3.scale.category20();
	patterns.svg = d3.select("#chord").append("svg").attr("width",width)
			.attr("height",height).attr("id","svg_chord").append("g")
			.attr("transform","translate("+width/2+","+height/2+")");

	patterns.svg.call(d3.behavior.zoom().scaleExtent([1,10]).on("zoom",function(){patterns.svg.attr("transform","translate("+(d3.event.translate[0]+width/2)+","+(d3.event.translate[1]+height/2)+")scale("+d3.event.scale+")");}));
	var outer_arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);
	var g_outer = patterns.svg.append("g").attr("class","chord_outer");
	
	g_outer.selectAll("path").data(patterns.chord_layout.groups).enter()
		.append("path").style("fill",function(d,i){return color20(i);})
		.style("stroke",function(d,i){return color20(i);})
		.attr("d",outer_arc);

	g_outer.selectAll("text").data(patterns.chord_layout.groups).enter().append("text").each(function(d,i){d.angle = (d.startAngle + d.endAngle)/2.0; d.name = i;})
	.attr("dy",".35em").attr("transform",function(d){ return "rotate("+(d.angle*180/Math.PI)+")"+"translate(0,"+ -1.0*(outerRadius+10)+")"+((d.angle>Math.PI*0.25 && d.angle<Math.PI*0.8)? "rotate(180)":"");}).text(function(d){return d.name;});

	patterns.inner_chord = d3.svg.chord().radius(innerRadius);
	var chords = patterns.svg.append("g").attr("class","chord").selectAll("path")
		.data(patterns.chord_layout.chords).enter().append("path")
		.attr("d",patterns.inner_chord).style("fill",function(d){ return color20(d.source.index);}).style("opacity",0.67).on("mouseover",function(d,i){
			d3.select(this).style("opacity",1).style("fill","yellow");
			var tooltip_chord = d3.select("#tooltip");
			tooltip_chord.selectAll("p").remove();
			var xPosition = parseFloat(d3.mouse(this)[0]);
			var yPosition = parseFloat(d3.mouse(this)[1]);
			tooltip_chord.append("p").text("frequency:"+parseInt(d.source.value));
			tooltip_chord.classed("hidden",false);
			tooltip_chord.style("left",(xPosition+width/2+20)+"px");
			tooltip_chord.style("top",(yPosition+height/2-20)+"px");
		}).on("mouseout",function(d){
			d3.select("#tooltip").classed("hidden",true);
			d3.select(this).transition().duration(500).style("fill",color20(d.source.index)).style("opacity",0.67);
		});


	g_outer.selectAll("path").on("mouseover",function(d,i){
		
		var tooltip_content = d3.select("#tooltip");
		tooltip_content.selectAll("p").remove();
		tooltip_content.append("p").text("dimension:"+d.name);
		tooltip_content.append("p").text("frequency:"+parseInt(d.value));
		tooltip_content.append("p").text("co-dimension-display");
		tooltip_content.classed("hidden",false);
		tooltip_content.style("left",(width+50)+"px");
		tooltip_content.style("top",100+"px");




		chords.classed("fade",function(p){
			var co_content = d3.select("#tooltip");
			var test =( p.source.index!=i && p.target.index!=i);
			if(test==false){
				if(p.source.index!=i)
					co_content.append("p").text("dimension"+p.source.index+":"+p.source.value);
				else
					co_content.append("p").text("dimension"+p.target.index+":"+p.target.value);
			}
				


			return test;});
	}).on("click",function(){chords.classed("fade",false);}).on("mouseout",function(){
		d3.select("#tooltip").classed("hidden",true);});
	
}

function form_frequents(){

	var frequentSize = document.getElementById("frequent_bound").value;
	if(isNaN(frequentSize)||frequentSize<1){
		alert("frequent size->input error!");
		document.getElementById("frequent_bound").value="";
		return;
	}
	patterns.frequent = parseInt(frequentSize);
	var q = patterns.chord_layout.chords();
	//var freq_chords = patterns.svg.append("g").attr("class","newchord").selectAll("path").data(q).enter().append("path")
			//	.attr("d",patterns.inner_chord).style("fill","black").style("opacity",0.2);
	



	var transactions = Apriori.ArrayUtils.matrixToArray(patterns.matrix,patterns.ids,patterns.dimensions);
	var apriori = new Apriori.Algorithm((patterns.frequent+0.0)/patterns.ids, 0.6, true);
	var result = apriori.analyze(transactions).frequentItemSets;
	
	var frequent_info = {};
	for(var key in result){
		if(key == "1")
			continue;
		frequent_info[key] = new Array();
		var maxSet = d3.set();
		if(result[key].length<10){
			for(var x=0;x<result[key].length;x++){
				frequent_info[key][x].support = result[key][x].support;
				frequent_info[key][x].itemSet = result[key][x].itemSet.sort(sortNumber);			
			}
		}else{
			for(var y=0;y<10;y++){
				var index = -1;		
				for(var x=0;x<result[key].length;x++){
					if(maxSet.has(result[key][x].itemSet.sort(sortNumber).toString())==true)
						continue;
					if(index==-1 || result[key][x].support>result[key][index].support){
						index = x;
					}
				}
				if(index==-1)
					break;
				frequent_info[key][y]={};
				
				frequent_info[key][y].itemSet = result[key][index].itemSet.sort(sortNumber);

				frequent_info[key][y].support = result[key][index].support;
				maxSet.add(frequent_info[key][y].itemSet.toString());
			}
		}
			
	}

	d3.select("#frequents_results").style("display","block");
	d3.selectAll("#frequent_sel_child").remove();
	var wz_frequent_sel = d3.select("#frequent_sel");
	for(var key in frequent_info){
		wz_frequent_sel.append("option").text(key).attr("value",key).attr("id","frequent_sel_child").on("click",function(){
			var frequentLength = d3.select(this).text();
			var frequents_form = d3.select("#frequents_results");
			frequents_form.selectAll("font").remove();
			var alpha_link = frequents_form.append("font").attr("color","green");
			for(var x=0;x<frequent_info[frequentLength].length;x++){
				alpha_link.append("p").text(frequent_info[frequentLength][x].itemSet+"  support:"+Math.floor((patterns.ids*frequent_info[frequentLength][x].support))).on("click",function(){
					d3.select(".newchord").remove();		
					var items = d3.select(this).text().split(" ")[0].split(",");
					for(var k=0;k<items.length;k++){
						items[k] = parseInt(items[k]);
					}	
					var newchord = new Array();	
					var count = 0;
					for(var k=0;k<q.length;k++){
						if(count>=items.length-1)
							break;
						if(q[k].source.index==items[count]&& q[k].target.index==items[count+1]){
							var tool = {};
							tool.source={};
							tool.source.index = q[k].source.index;
							tool.source.subindex = q[k].source.subindex;
							tool.source.value =1;
							tool.target={};
							tool.target.index = q[k].target.index;
							tool.target.subindex = q[k].target.subindex;
							tool.target.value =1;
							var holder = (q[k].source.endAngle-q[k].source.startAngle)/2;
							var middle = (q[k].source.startAngle+q[k].source.endAngle)/2;
							tool.source.startAngle = middle-holder*0.5;
							tool.source.endAngle = middle+holder*0.5;
							holder = (q[k].target.endAngle-q[k].target.startAngle)/2;
							middle = (q[k].target.startAngle + q[k].target.endAngle)/2;
							tool.target.startAngle = middle-holder*0.5;
							tool.target.endAngle = middle+holder*0.5;			
							newchord.push(tool);
							count++;
						}
						if(q[k].source.index>items[count])
							count++;
					}
								
					patterns.svg.append("g").attr("class","newchord").selectAll("path").data(newchord).enter().append("path").attr("d",patterns.inner_chord).attr("pointer-events","none")
					.style("opacity",0.8).style("fill","black");
			});			
			}		

		});
	}
	//graph.frequent_info = frequent_info;
/**
	var axo = [];
	axo.push({"item":"1 2 3","frequency":"1"});
	axo.push({"item":"2 3 4","frequency":"1"});
	axo.push({"item":"3 4 5","frequency":"1"});
	var frequents_form = d3.select("#frequents_results");
	frequents_form.style("display","block");

	var alpha_link = frequents_form.append("font").attr("color","steel blue");	     
	for(var i=0;i<axo.length;i++){
		alpha_link.append("p").text(axo[i].item).on("click",function(){
			d3.select(".newchord").remove();
			var items = d3.select(this).text().split(" ");
			for(var k=0;k<items.length;k++){
				items[k] = parseInt(items[k]);
			}
			var newchord = new Array();
			var count = 0;
			for(var k=0;k<q.length;k++){
				if(count>=items.length-1)
					break;
				if(q[k].source.index==items[count]&& q[k].target.index==items[count+1]){
					var tool = {};
					tool.source={};
					tool.source.index = q[k].source.index;
					tool.source.subindex = q[k].source.subindex;
					tool.source.value =1;
					tool.target={};
					tool.target.index = q[k].target.index;
					tool.target.subindex = q[k].target.subindex;
					tool.target.value =1;
					var holder = (q[k].source.endAngle-q[k].source.startAngle)/2;
					var middle = (q[k].source.startAngle+q[k].source.endAngle)/2;
					tool.source.startAngle = middle-holder*0.5;
					tool.source.endAngle = middle+holder*0.5;
					holder = (q[k].target.endAngle-q[k].target.startAngle)/2;
					middle = (q[k].target.startAngle + q[k].target.endAngle)/2;
					tool.target.startAngle = middle-holder*0.5;
					tool.target.endAngle = middle+holder*0.5;			
					newchord.push(tool);
					count++;
				}
				if(q[k].source.index>items[count])
					count++;
			}
			patterns.svg.append("g").attr("class","newchord").selectAll("path").data(newchord).enter().append("path").attr("d",patterns.inner_chord).attr("pointer-events","none")
				.style("opacity",0.8).style("fill","black");	
	
		});
	}	

	*/
	

	
}

function checkParam_frequent(ids, dimensions, validBits){
	var checkString="";
	if(isNaN(ids) ||ids<=0||ids>100){
		checkString+="ids number->input error!\n";
		document.getElementById("id_number").value="";
	}
	if(isNaN(dimensions)||dimensions<1||dimensions>20){
		checkString+="dimensions->input error!\n";
		document.getElementById("dimensions").value="";
	}
	if(isNaN(validBits)||validBits<1||validBits>ids*dimensions){
		checkString+="valid bits->input error!\n";
		document.getElementById("valid_bits").value="";
	}
	if(checkString!="")
		alert(checkString);
	return checkString;	
}


/**
 * Created by siyu on 2015/6/21.
 */
(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory();
    }
    else if(typeof define === 'function' && define.amd) {
        define('apriori', [], factory);
    }
    else {
        root['Apriori'] = factory();
    }
}(this, function() {

    'use strict';

    var Apriori;
    (function (Apriori) {
        var AnalysisResult = (function () {
            function AnalysisResult(frequentItemSets, associationRules) {
                this.frequentItemSets = frequentItemSets;
                this.associationRules = associationRules;
            }
            return AnalysisResult;
        })();
        Apriori.AnalysisResult = AnalysisResult;

        var FrequentItemSet = (function () {
            function FrequentItemSet(itemSet, support) {
                this.itemSet = itemSet;
                this.support = support;
            }
            return FrequentItemSet;
        })();
        Apriori.FrequentItemSet = FrequentItemSet;

        var AssociationRule = (function () {
            function AssociationRule(lhs, rhs, confidence) {
                this.lhs = lhs;
                this.rhs = rhs;
                this.confidence = confidence;
            }
            return AssociationRule;
        })();
        Apriori.AssociationRule = AssociationRule;

        var Algorithm = (function () {
            function Algorithm(minSupport, minConfidence, debugMode) {
                this.minSupport = minSupport || 0.15;
                this.minConfidence = minConfidence || 0.6;
                this.debugMode = debugMode || false;
            }
            Algorithm.prototype.analyze = function (transactions) {
                var self = this;
                var beforeMillis = new Date().getTime();

                var frequencies = {};
                var frequentItemSets = {};

                var oneElementItemSets = self.toOneElementItemSets(transactions);
                var oneCItemSets = self.findItemSetsMinSupportSatisfied(oneElementItemSets, transactions, self.minSupport, frequencies);
                var currentLItemSets = oneCItemSets;
                var itemSetSize = 1;

                if (self.debugMode) {
                    console.log('Before finding item sets: ' + self.getTime(beforeMillis) + ' ms');
                }
                var extractItemSet = function (f) {
                    return f.itemSet;
                };
                while (currentLItemSets.length !== 0) {
                    frequentItemSets[itemSetSize] = currentLItemSets;
                    var joinedSets = ArrayUtils.toFixedSizeJoinedSets(currentLItemSets.map(extractItemSet), itemSetSize + 1);
                    currentLItemSets = self.findItemSetsMinSupportSatisfied(joinedSets, transactions, self.minSupport, frequencies);
                    itemSetSize += 1;
                }
                if (self.debugMode) {
                    console.log('After finding item sets: ' + self.getTime(beforeMillis) + ' ms');
                }

                var calculateSupport = function (itemSet, frequencies, transactions) {
                    var frequency = frequencies[itemSet.toString()];
                    return frequency ? frequency / transactions.length : 0;
                };
                var foundSubSets = [];
                var isTheRuleAlreadyFound = function (itemSet) {
                    var found = false;
                    foundSubSets.forEach(function (subset) {
                        if (!found)
                            found = subset.toString() === itemSet.toString();
                    });
                    return found;
                };

                if (self.debugMode) {
                    console.log('Before calculating association rules: ' + self.getTime(beforeMillis) + ' ms');
                }
                var associationRules = [];
                var currentItemSet;
                var saveAssociationRuleIfFound = function (subsetItemSet) {
                    var diffItemSet = ArrayUtils.getDiffArray(currentItemSet, subsetItemSet);
                    if (diffItemSet.length > 0) {
                        var itemSupport = calculateSupport(currentItemSet, frequencies, transactions), subsetSupport = calculateSupport(subsetItemSet, frequencies, transactions), confidence = itemSupport / subsetSupport;

                        if (!isNaN(confidence) && !isTheRuleAlreadyFound(subsetItemSet) && confidence >= self.minConfidence) {
                            foundSubSets.push(subsetItemSet);
                            associationRules.push(new Apriori.AssociationRule(subsetItemSet, diffItemSet, confidence));
                        }
                    }
                };
                var saveAllAssociationRulesIfFound = function (itemSet) {
                    currentItemSet = itemSet;
                    ArrayUtils.toAllSubSets(currentItemSet).forEach(saveAssociationRuleIfFound);
                };
                for (var k in frequentItemSets) {
                    var itemSets = frequentItemSets[k].map(extractItemSet);
                    if (itemSets.length === 0 || itemSets[0].length <= 1) {
                        continue;
                    }
                    itemSets.forEach(saveAllAssociationRulesIfFound);
                }
                if (self.debugMode) {
                    console.log('After calculating association rules: ' + self.getTime(beforeMillis) + ' ms');
                }

                var analysisResult = new AnalysisResult(frequentItemSets, associationRules);
                if (self.debugMode) {
                    console.log('AnalysisResult: ' + JSON.stringify(analysisResult));
                    console.log('Apriori.Algorithm\'s total spent time: ' + self.getTime(beforeMillis) + ' ms');
                }
                return analysisResult;
            };

            Algorithm.prototype.toOneElementItemSets = function (transactions) {
                var nestedArrayOfItem = [];
                transactions.forEach(function (transaction) {
                    transaction.forEach(function (item) {
                        nestedArrayOfItem.push(new Array(item));
                    });
                });
                return ArrayUtils.toArraySet(nestedArrayOfItem);
            };

            Algorithm.prototype.findItemSetsMinSupportSatisfied = function (itemSets, transactions, minSupport, frequencies) {
                var filteredItemSets = [], localFrequencies = {};

                itemSets.forEach(function (itemSet) {
                    transactions.forEach(function (transaction) {
                        if (ArrayUtils.isSubSetArrayOf(itemSet, transaction)) {
                            if (!frequencies[itemSet.toString()])
                                frequencies[itemSet.toString()] = 0;
                            if (!localFrequencies[itemSet.toString()])
                                localFrequencies[itemSet.toString()] = 0;
                            frequencies[itemSet.toString()] += 1;
                            localFrequencies[itemSet.toString()] += 1;
                        }
                    });
                });
                var alreadyAdded = false;
                var setAsAlreadyAddedIfFound = function (f) {
                    if (!alreadyAdded)
                        alreadyAdded = f.itemSet === itemSet;
                };
                for (var strItemSet in localFrequencies) {
                    var itemSet = strItemSet.split(',').sort(), localCount = localFrequencies[itemSet.toString()], support = localCount / transactions.length;

                    if (support >= minSupport) {
                        alreadyAdded = false;
                        filteredItemSets.forEach(setAsAlreadyAddedIfFound);
                        if (!alreadyAdded) {
                            filteredItemSets.push(new FrequentItemSet(itemSet, support));
                        }
                    }
                }
                return filteredItemSets;
            };

            Algorithm.prototype.showAnalysisResultFromFile = function (filename) {
                var self = this;
                require('fs').readFile(filename, 'utf8', function (err, data) {
                    if (err)
                        throw err;
                    var transactions = ArrayUtils.readCSVToArray(data, ',');
                    var analysisResult = self.analyze(transactions);
                    console.log(JSON.stringify(analysisResult.associationRules));
                });
            };

            Algorithm.prototype.getTime = function (initial) {
                return new Date().getTime() - initial;
            };
            return Algorithm;
        })();
        Apriori.Algorithm = Algorithm;

        var ArrayUtils = (function () {
            function ArrayUtils() {
            }
            ArrayUtils.toStringSet = function (array) {
                var uniqueArray = [];
                array.forEach(function (e) {
                    if (uniqueArray.indexOf(e) === -1)
                        uniqueArray.push(e);
                });
                return uniqueArray;
            };
            ArrayUtils.toArraySet = function (arrayOfArray) {
                var foundElements = {}, uniqueArray = [];
                arrayOfArray.forEach(function (array) {
                    if (!foundElements.hasOwnProperty(array.toString())) {
                        uniqueArray.push(array);
                        foundElements[array.toString()] = true;
                    }
                });
                return uniqueArray;
            };
            ArrayUtils.toAllSubSets = function (array) {
                var op = function (n, sourceArray, currentArray, allSubSets) {
                    if (n === 0) {
                        if (currentArray.length > 0) {
                            allSubSets[allSubSets.length] = ArrayUtils.toStringSet(currentArray);
                        }
                    } else {
                        for (var j = 0; j < sourceArray.length; j++) {
                            var nextN = n - 1, nextArray = sourceArray.slice(j + 1), updatedCurrentSubSet = currentArray.concat([sourceArray[j]]);
                            op(nextN, nextArray, updatedCurrentSubSet, allSubSets);
                        }
                    }
                };
                var allSubSets = [];
                array.sort();
                for (var i = 1; i < array.length; i++) {
                    op(i, array, [], allSubSets);
                }
                allSubSets.push(array);
                return ArrayUtils.toArraySet(allSubSets);
            };
            ArrayUtils.toFixedSizeJoinedSets = function (itemSets, length) {
                var joinedSetArray = [];
                itemSets.forEach(function (itemSetA) {
                    itemSets.forEach(function (itemSetB) {
                        if (ArrayUtils.getDiffArray(itemSetA, itemSetB).length > 0) {
                            var mergedArray = [].concat(itemSetA).concat(itemSetB), joinedSet = ArrayUtils.toStringSet(mergedArray);
                            if (joinedSet.length === length)
                                joinedSetArray.push(joinedSet);
                        }
                    });
                });
                return ArrayUtils.toArraySet(joinedSetArray);
            };
            ArrayUtils.isSubSetArrayOf = function (targetArray, superSetArray) {
                var isSubSetArray = true;
                targetArray.forEach(function (item) {
                    if (isSubSetArray && superSetArray.indexOf(item) === -1)
                        isSubSetArray = false;
                });
                return isSubSetArray;
            };
            ArrayUtils.getDiffArray = function (arrayA, arrayB) {
                var diffArray = [];
                arrayA.forEach(function (e) {
                    if (arrayB.indexOf(e) === -1)
                        diffArray.push(e);
                });
                return diffArray;
            };
            ArrayUtils.readCSVToArray = function (inputString, delimiter) {
                delimiter = delimiter || ',';
                var regexp = new RegExp(("(\\" + delimiter + "|\\r?\\n|\\r|^)" + "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" + "([^\"\\" + delimiter + "\\r\\n]*))"), 'gi');

                var arrayOfRows = [[]];
                var matched;
                while (!!(matched = regexp.exec(inputString))) {
                    var matchedDelimiter = matched[1];
                    if (matchedDelimiter.length && matchedDelimiter !== delimiter) {
                        arrayOfRows.push([]);
                    }
                    var matchedValue = matched[2] ? matched[2].replace(new RegExp('""', 'g'), '"') : matched[3];
                    if (matchedValue.length > 0) {
                        arrayOfRows[arrayOfRows.length - 1].push(matchedValue);
                    }
                }
                return arrayOfRows;
            };
            //m--row n--column
            ArrayUtils.matrixToArray = function (inputMatrix,m,n){
                var arrayOfRows=new Array();
                for(var i = 0;i<m;i++){
                    arrayOfRows[i] = new Array();
                    for(var j = 0;j<n;j++){
                        if(inputMatrix[i][j]==1){
                           // document.write(i+'+'+j);
                            arrayOfRows[i].push(j.toString());
                        }
                    }

                }
                return arrayOfRows;

            };
            return ArrayUtils;
        })();
        Apriori.ArrayUtils = ArrayUtils;
    })(Apriori || (Apriori = {}));
//# sourceMappingURL=apriori.js.map


    return Apriori;

}));

function sortNumber(a,b){
	return a-b;
}
