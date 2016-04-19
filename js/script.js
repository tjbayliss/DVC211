var dvc = {};

dvc.initialYear = 1920;
dvc.finalYear = 1997;	
			
pymChild = new pym.Child();
			

dvc.boolHasError = false;

if (Modernizr.inlinesvg)
{
	d3.select("#altern").remove();

	
	$(document).ready(function()
	{	
	

			//load some data - config file
			loadchartData();
			onSubmit();
				
			
			//var dvc={}; // global object variable to contain all variables prefixed with 'dvc.' 
			
		
			dvc.firstYear = 1920;
			dvc.lastYear = 1997;

			dvc.currentYear = 2012;
			dvc.maxDataAge = 45;
			
			dvc.chartWidth = 360;
			dvc.chartHeight = 300;
			dvc.gapRatio = 0.2;
			dvc.yPadding = 20;
			dvc.xPadding = 40;	
			
			
			// to load json data driving the chart	
			function loadchartData()
			{
				
				d3.csv("./lib/table1.csv", function(error, data) {
						
						dvc.data1 = data;
						
				});
			
			
				d3.csv("./lib/table2.csv", function(error, data) {
						
						dvc.data2 = data;			
						
				});

				
				d3.csv("./lib/table3.csv", function(error, data) {
						
						dvc.data3 = data;					
						
				});
				
			
			
			} //end loadchartData
						
			
			function onSubmit()
			{	
			
	
				$("#fertCalculator").submit(function(event)
				{				
		
					event.preventDefault();
					event.stopPropagation();
										
					d3.selectAll(".mainChart").remove();
					d3.selectAll(".infoText").html("");
					onblurBirthYear();
					onblurMothersBirthYear()
					
					dvc.birthYear = $("#birthYear").val();
								
					dvc.mothersBirthYear = $("#mothersBirthYear").val();
					
					dvc.years =[dvc.birthYear,dvc.mothersBirthYear];
					
					dvc.currentAge = dvc.currentYear - dvc.birthYear;
					
					if(dvc.currentAge > 45){ dvc.currentAge = 99; }
					getValues();
					
					if ( parseInt(dvc.currentYear - dvc.mothersBirthYear) < 45 ) {
						
						d3.select("#chartthree").attr("class","col-sm-4 col-xs-12 hide");
						
					} // end  if ....
					
					return;				
				
				});
				
			}// end function onSubmit()
			
			
			
			function getValues()
			{	
				/* Graph 1 */ 
		
				dvc.myIndex = ( dvc.birthYear - dvc.firstYear );
				dvc.mothersIndex = ( dvc.mothersBirthYear - dvc.firstYear );
				
				var str1 = "dvc.Val1 = (1 - (dvc.data2[" + dvc.myIndex + "].Y" + dvc.currentAge + ")) * 100";
				eval(str1);
				
				var str2 = "dvc.Val2 = (1 - (dvc.data2[" + dvc.mothersIndex + "].Y" + dvc.currentAge + ")) * 100";
				eval(str2);
				
				dvc.Chart1Array = [ dvc.Val1 , dvc.Val2 ];	
				
				
				/* Graph 2 */ 			
				var str3 = "dvc.Val3 = dvc.data1[" + dvc.myIndex + "].Y" + dvc.currentAge;
				eval(str3);
				
				var str4 = "dvc.Val4 = dvc.data1[" + dvc.mothersIndex + "].Y" + dvc.currentAge;
				eval(str4);
				
				dvc.Chart2Array = [ dvc.Val3 , dvc.Val4 ];
				
				
				
				/* Graph 3 */
				var str5 = "dvc.Val5 = dvc.data1[" + dvc.mothersIndex + "].Y45";
				eval(str5);
				
				var str6 = "dvc.Val6 = (1 - (dvc.data2[" + dvc.mothersIndex + "].Y45)) * 100";
				eval(str6);
				
				dvc.Chart3Array = [dvc.Val5 ];
				
				dvc.barColours = ["#8dd3c7","#bebada"];
				
				console.log(dvc.Chart1Array);
				console.log(dvc.Chart2Array);
				console.log(dvc.Chart3Array);		
				
				dvc.title1 = "Percentage of women with no children at your age";
				dvc.title2 = "Average number of children for women at your age";
				dvc.title3 = "Average number of children for women at the end of their childbearing years*";
				
				dvc.barTitle1 = ["Born in ","Born in "];
				dvc.barTitle2 = ["Born in ","Born in "];
				dvc.barTitle3 = ["Born in "];
				
				if ( dvc.boolHasError == false ) {
					
					
			
				d3.select("#chartone").attr("class","col-sm-4 col-xs-12 show");
				d3.select("#charttwo").attr("class","col-sm-4 col-xs-12 show");
				d3.select("#chartthree").attr("class","col-sm-4 col-xs-12 show"); 
				
					makeGraph1(dvc.Chart1Array);
					makeGraph2(dvc.Chart2Array);
					makeGraph3(dvc.Chart3Array);
				
				} // end if ... 
				
				if (pymChild) {
				   pymChild.sendHeight();
				   setTimeout(function(){ pymChild.sendHeight()},4000);
				}			
				
				
				
					
				$("#paraGrp1Para1").html("<span style='font-family:open_sanssemibold'>" +dvc.Chart1Array[0].toFixed(0) + "%</span> of women born the same year as you had not had any children by the end of " + dvc.currentYear + ".");
				$("#paraGrp1Para2").html("In comparison,  <span style='font-family:open_sanssemibold'>" + dvc.Chart1Array[1].toFixed(0) + "%</span> of women born the same year as your mother had not had any children when they were your age.");
				
				$("#paraGrp2Para1").html("<span style='font-family:open_sanssemibold'>" + dvc.Chart2Array[0] + "</span> was the average number of children that women born in the same year as you had by the end of " + dvc.currentYear + ".");
				$("#paraGrp2Para2").html("In comparison, <span style='font-family:open_sanssemibold'>" + dvc.Chart2Array[1] + "</span> was the average number of children that women born in the same year as your mother had when they were your age.");
				

				$("#paraGrp3Para1").html("<span style='font-family:open_sanssemibold'>" + dvc.Chart3Array[0] + "</span> was the average number of children that women born in the same year as your mother had by the end of their childbearing years.");
				$("#paraGrp3Para2").html("<span style='font-family:open_sanssemibold'>" + dvc.Val6.toFixed(0) + "%</span> of women born the same year as your mother had no children by the end of their childbearing years.");
				
				d3.selectAll(".infoText").style( "display" , "inline" );
				
				return;
				
				
			} // end function getValues()
			
			
		
		
			function makeGraph1(array)
			{
				
				console.log(array + " : " + array[0] + " : " + array[1]);
				
				//Find out about the data
				
				//length of the array
				dvc.myInputDivisor = array.length;
	
				//Find min/max 
				dvc.minValue = d3.min(array);
				dvc.maxValue = 100;
				
				
				//set up the scale objects as per normal
	
				dvc.yScale=d3.scale.linear()
					.domain([Math.min(0,dvc.minValue),dvc.maxValue])
					.range([dvc.chartHeight,0])
					.nice();
					
				dvc.xScale = d3.scale.ordinal()
					.domain(array)
					.rangeRoundBands([0, dvc.chartWidth], dvc.gapRatio);
					
					
				//work out the width of the bars based on the nummber of records
					
				dvc.cellWidth=(1-dvc.gapRatio)*dvc.chartWidth/dvc.myInputDivisor;
				
				//Create a chart title
				
				d3.select("#chartone").select("h4").text(dvc.title1);
				
				
				//Set up the chart object the data([array]) is part of a trick that means that it's only set up the once
				
				mainChart = d3.select("#chart1").selectAll('svg').data([array]);
				
							
				//Add the main SVG - only once on enter
				mainChartEnter = mainChart.enter()
								  .append('svg')
								  .attr('class','mainChart')
								  .attr("viewBox", "0 0 420 370")
								  .attr("height","300px")
								  .attr("preserveAspectRatio","xMidYMax meet");
								  
								  
				//Set up the axis - this is done on each call of the function
				dvc.yAxisChar=d3.svg.axis()
						.scale(dvc.yScale)
						.orient("left")
						.tickSize(-(dvc.chartWidth))
						.ticks(8);
				
				//Append the axis - only once (mainChartEnter)
				mainChartEnter.append("g")
					.attr("class","axis")
					.attr("transform","translate("+ dvc.xPadding + ", " + dvc.yPadding + ")")
					.call(dvc.yAxisChar);
	
				
				//removes the stroke on the y-axis vertical - only once	
				mainChartEnter.selectAll(".domain").style("stroke","none");
				
	
				//add a group element for the bar - only once
				mainChartEnter.append("g")
					.attr("id","grpBars")
					.attr("transform", "translate(" + dvc.xPadding + "," + dvc.yPadding + ")");
				
				
				// Every time the function is called
				mainChart.select('.axis')
					.transition()
					.duration(500)
					.call(dvc.yAxisChar);
					
				
				//Same trick as before
				//Select the group element which contains the bars and then all the chartBars within
				bar = mainChart.select("#grpBars").selectAll(".chartBars")
					.data(array);
				
				//If the element is a new selection then append a rectangle - ENTER - Do the things you only want to do once.
								bar.enter()
						.append("rect")
						.attr("class", "chartBars")
						.attr("id",function(d,i) {
							return "bar" + i;
						})
						.attr("width", dvc.cellWidth)
						.attr("y", function(d) { 
							return dvc.yScale(0);
						})
						.attr("transform", function(d, i) {
							return "translate(" + dvc.xScale(array[i]) +"," + 0  + ")";
						})
						.attr("height", function(d)	{
							return 0;
						});
						
	
				//If it's an existing selection just change these attributes - UPDATE - Do the things here you want to do apply to every element	
				bar.transition()
						.duration(1000)
						.attr("height", function(d)	{
							return Math.abs(dvc.yScale(d) - dvc.yScale(0));
						})
						.attr("y", function(d) { 
							return dvc.yScale(d);
						});
						
					
				//If it's a selection that is no longer needed (ie there isn't a data point in the array for an existing bar) then remove it - REMOVE		
				bar.exit().remove();
				
				
				//Add some labels
				var datalabels = d3.zip(dvc.barTitle1, dvc.barColours);
				
				mainChartEnter.append("g").attr("class","labels")
				
				var labels = mainChartEnter.select(".labels").selectAll("rect")
					.data(datalabels);
					
				insertLinebreaks = function () {
					var el1 = this.firstChild;
					var el = el1.data;
			
					var words = el.split('  ');
					
					d3.select(this).text('');
			
				
					for (var i = 0; i < words.length; i++) {
						var tspan = d3.select(this).append('tspan').text(words[i]);
						if (i > 0)
						var xpos = d3.select(this).attr("x");
							tspan.attr('x', xpos).attr('dy', '17');
					}
				};
				
				labels.enter().append("text")
					.attr("x",function(d,i){return dvc.xPadding + (dvc.cellWidth/2) + dvc.xScale(array[i])})
					.attr("y",function(d,i){return dvc.yScale(0)+30})
					.attr("width",30)			
					.attr("height",20);
					//.text(function(d,i){return datalabels[i][0] + dvc.years[i]});
				
				labels.text(function(d,i){return datalabels[i][0] + dvc.years[i]});
				
				mainChart.selectAll(".labels").selectAll("text").each(insertLinebreaks);

				return;
					
			}// end function makeGraph1(array)
			
			
		
		
			function makeGraph2(array)
			{
				
				//d3.select("#chart2Title").text("");	
				
				
				//Find out about the data
				
				//length of the array
				dvc.myInputDivisor = array.length;
	
				//Find min/max 
				dvc.minValue = d3.min(array);
				dvc.maxValue = 2.5;
				
				
				//set up the scale objects as per normal
	
				dvc.yScale=d3.scale.linear()
					.domain([Math.min(0,dvc.minValue),dvc.maxValue])
					.range([dvc.chartHeight,0])
					.nice();
					
				dvc.xScale = d3.scale.ordinal()
					.domain(array)
					.rangeRoundBands([0, dvc.chartWidth], dvc.gapRatio);
					
					
				//work out the width of the bars based on the nummber of records
					
				dvc.cellWidth=(1-dvc.gapRatio)*dvc.chartWidth/dvc.myInputDivisor;
				
				//Create a chart title
										
				d3.select("#charttwo").select("h4").text(dvc.title2);
				
				//Set up the chart object the data([array]) is part of a trick that means that it's only set up the once
				
				mainChart = d3.select("#chart2").selectAll('svg').data([array]);
				
							
				//Add the main SVG - only once on enter
				mainChartEnter = mainChart.enter()
								  .append('svg')
								  .attr('class','mainChart')
								  .attr("viewBox", "0 0 420 370")
								  .attr("height","300px")
								  .attr("preserveAspectRatio","xMidYMax meet");
								  
								  
				//Set up the axis - this is done on each call of the function
				dvc.yAxisChar=d3.svg.axis()
						.scale(dvc.yScale)
						.orient("left")
						.tickSize(-(dvc.chartWidth))
						.ticks(8);
						
				//Append the axis - only once (mainChartEnter)
				mainChartEnter.append("g")
					.attr("class","axis")
					.attr("transform","translate("+ dvc.xPadding + ", " + dvc.yPadding + ")")
					.call(dvc.yAxisChar);
	
				
				//removes the stroke on the y-axis vertical - only once	
				mainChartEnter.selectAll(".domain").style("stroke","none");
				
	
				//add a group element for the bar - only once
				mainChartEnter.append("g")
					.attr("id","grpBars")
					.attr("transform", "translate(" + dvc.xPadding + "," + dvc.yPadding + ")");
				
				
				// Every time the function is called
				mainChart.select('.axis')
					.transition()
					.duration(500)
					.call(dvc.yAxisChar);
					
				
				//Same trick as before
				//Select the group element which contains the bars and then all the chartBars within
				bar = mainChart.select("#grpBars").selectAll(".chartBars")
					.data(array);
				
				//If the element is a new selection then append a rectangle - ENTER - Do the things you only want to do once.
				bar.enter()
						.append("rect")
						.attr("class", "chartBars")
						.attr("id",function(d,i) {
							return "bar" + i;
						})
						.attr("width", dvc.cellWidth)
						.attr("y", function(d) { 
							return dvc.yScale(0);
						})
						.attr("transform", function(d, i) {
							return "translate(" + dvc.xScale(array[i]) +"," + 0  + ")";
						})
						.attr("height", function(d)	{
							return 0;
						});
						
	
				//If it's an existing selection just change these attributes - UPDATE - Do the things here you want to do apply to every element	
				bar.transition()
						.duration(1000)
						.attr("height", function(d)	{
							return Math.abs(dvc.yScale(d) - dvc.yScale(0));
						})
						.attr("y", function(d) { 
							return dvc.yScale(d);
						});
						
					
				//If it's a selection that is no longer needed (ie there isn't a data point in the array for an existing bar) then remove it - REMOVE		
				bar.exit().remove();
				
				
				//Add some labels
				var datalabels = d3.zip(dvc.barTitle2, dvc.barColours);
				
				mainChartEnter.append("g").attr("class","labels")
				
				var labels = mainChartEnter.select(".labels").selectAll("rect")
					.data(datalabels);
					
					
				insertLinebreaks = function () {
					var el1 = this.firstChild;
					var el = el1.data;
			
					var words = el.split('  ');
					
					d3.select(this).text('');
			
				
					for (var i = 0; i < words.length; i++) {
						var tspan = d3.select(this).append('tspan').text(words[i]);
						if (i > 0)
						var xpos = d3.select(this).attr("x");
							tspan.attr('x', xpos).attr('dy', '17');
					}
				};
				
				labels.enter().append("text")
					.attr("x",function(d,i){return dvc.xPadding + (dvc.cellWidth/2) + dvc.xScale(array[i])})
					.attr("y",function(d,i){return dvc.yScale(0)+30})
					.attr("width",30)			
					.attr("height",20);
					//.text(function(d,i){return datalabels[i][0] + dvc.years[i]});
				
				//console.log(labels.selectAll("text"));
				
				labels.text(function(d,i){return datalabels[i][0] + dvc.years[i]});
				
				mainChart.selectAll(".labels").selectAll("text").each(insertLinebreaks);				
				
				return;
					
			}// end function makeGraph2(array)
			
			
		
		
			function makeGraph3(array)
			{
				//d3.select("#chart3Title").text("");	
				
				//Find out about the data
				
				//length of the array
				dvc.myInputDivisor = array.length;
	
				//Find min/max 
				dvc.minValue = d3.min(array);
				dvc.maxValue = 2.5;
				var xPadding = 120
				
				//set up the scale objects as per normal
	
				dvc.yScale=d3.scale.linear()
					.domain([Math.min(0,dvc.minValue),dvc.maxValue])
					.range([dvc.chartHeight,0])
					.nice();
					
				dvc.xScale = d3.scale.ordinal()
					.domain(array)
					.rangeRoundBands([0, dvc.chartWidth/2], dvc.gapRatio);
					
					
				//work out the width of the bars based on the nummber of records
					
				dvc.cellWidth=((1-dvc.gapRatio)*(dvc.chartWidth/2)/dvc.myInputDivisor);
				

				//Create a chart title
				
				d3.select("#chartthree").select("h4").text(dvc.title3);
				
				
				//Set up the chart object the data([array]) is part of a trick that means that it's only set up the once				
				mainChart = d3.select("#chart3").selectAll('svg').data([array]);
				
							
				//Add the main SVG - only once on enter
				mainChartEnter = mainChart.enter()
								  .append('svg')
								  .attr('class','mainChart')
								  .attr("viewBox", "0 0 420 370")
								  .attr("height","300px")
								  .attr("preserveAspectRatio","xMidYMax meet");
								  
								  
				//Set up the axis - this is done on each call of the function
				dvc.yAxisChar=d3.svg.axis()
						.scale(dvc.yScale)
						.orient("left")
						.tickSize(-(dvc.chartWidth/2))
						.ticks(8);
				
				//Append the axis - only once (mainChartEnter)
				mainChartEnter.append("g")
					.attr("class","axis")
					.attr("transform","translate("+ xPadding + ", " + dvc.yPadding + ")")
					.call(dvc.yAxisChar);
	
				
				//removes the stroke on the y-axis vertical - only once	
				mainChartEnter.selectAll(".domain").style("stroke","none");
				
	
				//add a group element for the bar - only once
				mainChartEnter.append("g")
					.attr("id","grpBars")
					.attr("transform", "translate(" +  xPadding + "," + dvc.yPadding + ")");
				
				
				// Every time the function is called
				mainChart.select('.axis')
					.transition()
					.duration(500)
					.call(dvc.yAxisChar);
					
				
				//Same trick as before
				//Select the group element which contains the bars and then all the chartBars within
				bar = mainChart.select("#grpBars").selectAll(".chartBars")
					.data(array);
				
				//If the element is a new selection then append a rectangle - ENTER - Do the things you only want to do once.
								bar.enter()
						.append("rect")
						.attr("class", "chartBars")
						.attr("id",function(d,i) {
							return "bar" + i;
						})
						.attr("width", dvc.cellWidth)
						.attr("y", function(d) { 
							return dvc.yScale(0);
						})
						.attr("transform", function(d, i) {
							return "translate(" + dvc.xScale(array[i]) +"," + 0  + ")";
						})
						.attr("height", function(d)	{
							return 0;
						});
						
	
				//If it's an existing selection just change these attributes - UPDATE - Do the things here you want to do apply to every element	
				bar.transition()
						.duration(1000)
						.attr("height", function(d)	{
							return Math.abs(dvc.yScale(d) - dvc.yScale(0));
						})
						.attr("y", function(d) { 
							return dvc.yScale(d);
						});
					
				//If it's a selection that is no longer needed (ie there isn't a data point in the array for an existing bar) then remove it - REMOVE		
				bar.exit().remove();
				d3.selectAll(".axis").selectAll("text").attr("transform", "translate(-4,0)");
				
				
				//Add some labels
				var datalabels = d3.zip(dvc.barTitle3, dvc.barColours);
				
				mainChartEnter.append("g").attr("class","labels")
				
				var labels = mainChartEnter.select(".labels").selectAll("rect")
					.data(datalabels);
					
					
				insertLinebreaks = function () {
					var el1 = this.firstChild;
					var el = el1.data;
			
					var words = el.split('  ');
					
					d3.select(this).text('');
			
				
					for (var i = 0; i < words.length; i++) {
						var tspan = d3.select(this).append('tspan').text(words[i]);
						if (i > 0)
						var xpos = d3.select(this).attr("x");
							tspan.attr('x', xpos).attr('dy', '17');
					}
				};
				
				labels.enter().append("text")
					.attr("x",function(d,i){return xPadding + (dvc.cellWidth/2) + dvc.xScale(array[i])})
					.attr("y",function(d,i){return dvc.yScale(0)+30})
					.attr("width",30)			
					.attr("height",20);
					//.text(function(d,i){return datalabels[i][0] + dvc.years[1]});
				
				
				labels.text(function(d,i){return datalabels[i][0] + dvc.years[1]});
				//console.log(labels.selectAll("text"));
				
				mainChart.selectAll(".labels").selectAll("text").each(insertLinebreaks);				
				
				return;
					
			}// end function makeGraph3(array)
	
		})// END MODERNZR 
		
		
	
	
	
	

	} 
	else  // from modernizer
	
	{
		$("#ieMsg").fadeIn(1000);
		
	}
	
	
	
	
	
	function getMeanAge()
	{
		
		var valueToCheck = document.getElementById("birthYear").value;
		var regExp = /[0-9]{4}/;
			
		//loadData3();
			
		var meanAgeArray = 	[ 
								[1920,-1],	[1921,-1],	[1922,-1],	[1923,-1],	[1924,-1],	[1925,-1],	[1926,-1],	[1927,-1],	[1928,-1],	[1929,-1],
								[1930,-1],	[1931,-1],	[1932,-1],	[1933,-1],	[1934,-1],	[1935,-1],	[1936,-1],	[1937,-1],	[1938,26],	[1939,26],
								[1940,26],	[1941,26],	[1942,26],	[1943,26],	[1944,26],	[1945,26],	[1946,26],	[1947,26],	[1948,26],	[1949,25],
								[1950,25],	[1951,25],	[1952,25],	[1953,25],	[1954,25],	[1955,25],	[1956,25],	[1957,25],	[1958,25],	[1959,25],
								[1960,25],	[1961,24],	[1962,24],	[1963,24],	[1964,24],	[1965,24],	[1966,24],	[1967,23],	[1968,23],	[1969,23],
								[1970,23],	[1971,24],	[1972,24],	[1973,24],	[1974,24],	[1975,24],	[1976,24],	[1977,24],	[1978,25],	[1979,25],
								[1980,25],	[1981,25],	[1982,25],	[1983,25],	[1984,25],	[1985,25],	[1986,25],	[1987,25],	[1988,25],	[1989,25],
								[1990,26],	[1991,26],	[1992,26],	[1993,26],	[1994,26],	[1995,27],	[1996,27],	[1997,27],	[1998,27],	[1999,27],
								[2000,27],	[2001,27],	[2002,27],	[2003,27],	[2004,28],	[2005,28],	[2006,28],	[2007,28],	[2008,28],	[2009,28],
								[2010,28],	[2011,28],	[2012,28]
			];
			
			
		
		dvc.firstYear = meanAgeArray[0][0];
		
		
		if ( document.getElementById('meanAgeCheck').checked == true && regExp.test(valueToCheck) == true )
		{
					
			dvc.birthYear = document.getElementById("birthYear").value;
			dvc.myIndex = ( dvc.birthYear - dvc.firstYear );
			dvc.meanMothersAgeYOB = dvc.birthYear - meanAgeArray[dvc.myIndex][1];
			
			$("#mothersBirthYear").val(parseInt(dvc.meanMothersAgeYOB));
			
		} // end if 
		
		
		
	}// end function getMeanYear()
	
	
	function onblurBirthYear()
	{
		
		var regExp = /[0-9]{4}/;
		var regExp2 = /[ ]+/;			
		var valueToCheck = document.getElementById("birthYear").value;		
		dvc.firstYear = dvc.initialYear;
		dvc.lastYear = dvc.finalYear;
		
		dvc.boolHasError = false;
		d3.select("#byear").attr("class","form-group");
		
		
		// if input is correct format, and within year reange ...  		
		if (  (	regExp.test(valueToCheck) == true && valueToCheck.length == 4 && 
				parseInt(valueToCheck) >= dvc.firstYear && parseInt(valueToCheck) <= dvc.lastYear  &&
				valueToCheck > document.getElementById("mothersBirthYear").value ) || valueToCheck == '' )
		{
			
			
			d3.select("#inputform").attr("class","form-group has-feedback");
			document.getElementById( "meanAgeCheck" ).disabled = false;
			document.getElementById( "mothersBirthYear" ).disabled = false;
			
			d3.select("#sublabel2").text("Enter a year between 1920-" + (valueToCheck-1));
			
		}// end if ....
		
		
		else if ( regExp2.test(valueToCheck) == true || valueToCheck == '' )
		{
			d3.select("#inputform").attr("class","form-group has-feedback");
		}
		
		
		
		// else error ...
		else {					
		
		
			d3.select("#byear").attr("class","form-group has-error");
			dvc.boolHasError = false;
			
		} // end else ...
		
		
		return;
		
	}// end function onblurBirthYear()
	
	
	
	
	function onblurMothersBirthYear()
	{	
		
		
		var regExp = /[0-9]{4}/;
		var regExp2 = /[ ]+/;		
		var valueToCheck = document.getElementById("mothersBirthYear").value;	
		dvc.firstYear = dvc.initialYear;
		dvc.lastYear = dvc.finalYear;
		
		dvc.boolHasError = false;
		d3.select("#myear").attr("class","form-group");
		
		// if input is correct format, and within year reange ...  		
		if (  	regExp.test(valueToCheck) == true && valueToCheck.length == 4 && 
				parseInt(valueToCheck) >= dvc.firstYear && parseInt(valueToCheck) <= dvc.lastYear &&
				valueToCheck < document.getElementById("birthYear").value )
		{
			
			
			d3.select("#inputform").attr("class","form-group has-feedback");
			document.getElementById( "meanAgeCheck" ).disabled = false;	
			document.getElementById( "meanAgeCheck" ).checked = false;		
			
			
		}// end if ....
		
		
		else if ( regExp2.test(valueToCheck) == true || valueToCheck == '' )  {
			 
			document.getElementById( "meanAgeCheck" ).disabled = false;	
			document.getElementById( "meanAgeCheck" ).checked = false;
			d3.select("#inputform").attr("class","form-group has-feedback");	
			
		}// end else if ...
		
		
		// else error ...
		else {					
		
		
			d3.select("#myear").attr("class","form-group has-error");
			dvc.boolHasError = true;
			
		} // end else ...
		
		
		return;
		
	}// end function onblurMothersBirthYear()
	
	
	
	
	function onfocusMothersBirthYear()
	{
					
		$( "#meanAgeCheck" ).css( "checked", "false" );
		
		return;
		
	}// end onfocusMothersBirthYear()
	
	
		d3.select("#twitter").on("click",tweet);
		d3.select("#face").on("click",faceb);
		d3.select("#embed").on("click",embed);
		d3.select("#close").on("click",embedclose);
		d3.select("#inputType").attr("value",'<iframe width=940 height=700 src="' + document.URL + '" scrolling=no frameborder=0/>');
		
		
		function faceb() {
				var face = 'http://www.facebook.com/share.php?u=' + window.location.href;
				window.open(face);
		}
		
		function tweet() {
				var myString="http://twitter.com/home?status="+escape("Births by age of mother? How do you compare?"+ window.location.href);
				window.open(myString);
		}
		
		function embed() {
				d3.select("#embedrow").attr("class","row show");
		}
		
		function embedclose() {
				d3.select("#embedrow").attr("class","row hide");
		}
		
		
		
