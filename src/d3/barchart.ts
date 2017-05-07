// tslint:disable
const d3 = require('d3');


function renderBarChart(selector: any, data: any, options: any = {}) {
  const { height, width, barWidth, margins, showAxis, showCdf } = options;

  const m = margins || {top: 50, right: 50, bottom: 50, left: 50};
  const h = height || 500 - m.top - m.bottom;
  const w = width || 960 - m.left - m.right;
  const bw = barWidth || 5;

  let dataset = null;


  // typecast Amount to #, calculate total, and cumulative amounts
  var totalAmount = 0;
  for(var i = 0; i < data.length; i++){
    data[i].Amount = +data[i].Amount;
    totalAmount += data[i].Amount;
    if(i > 0) {
      data[i]['CumulativeAmount'] = data[i].Amount + data[i-1].CumulativeAmount;
    } else{
      data[i]['CumulativeAmount'] = data[i].Amount;
    }
  }
  // now calculate cumulative % from the cumulative amounts & total, round %
  for(var i = 0; i < data.length; i++){
    data[i]['CumulativePercentage'] = (data[i]['CumulativeAmount'] / totalAmount);
    data[i]['CumulativePercentage'] = parseFloat(data[i]['CumulativePercentage'].toFixed(2));
  }

  dataset = data;

    //Axes and scales
    var xScale = d3.scale.ordinal().rangeRoundBands([0, w], 0.1);
    xScale.domain(data.map(function(d: any) { return d.Category; }));

    var yhist = d3.scale.linear()
                    .domain([0, d3.max(data, function(d: any) { return d.Amount; })])
                    .range([h, 0]);

    var ycum = d3.scale.linear().domain([0, 1]).range([h, 0]);

  if (showAxis) {
    var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient('bottom');

    var yAxis = d3.svg.axis()
                  .scale(yhist)
                  .orient('left');

    var yAxis2 = d3.svg.axis()
                  .scale(ycum)
                  .orient('right');
  }

  //Draw svg
  var svg = d3.select(selector).append("svg")
              .attr("width", w + m.left + m.right)
              .attr("height", h + m.top + m.bottom)
              .append("g")
              .attr("transform", "translate(" + m.left + "," + m.top + ")")
              .attr('class', 'pareto__svg');

  //Draw histogram
  var bar = svg.selectAll(".bar")
                .data(data)
                .enter().append("g")
                .attr("class", "bar");

  var tooltip = d3.select("body")
    .append("div")
    .data(data)
    .attr('class', 'tooltip__small')
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")

  bar.append("rect")
      .attr("x", function(d: any) { return xScale(d.Category); })
      .attr("width", xScale.rangeBand())
      .attr("y", function(d: any) { return yhist(d.Amount); })
      .attr("height", function(d: any) { return h - yhist(d.Amount); })
      .attr('fill', '#000000')
      .attr('stroke', '#1B2838')
      .on("mouseover", (d: any) => {
        tooltip.style("visibility", "visible");
        tooltip.style("opacity", "1");
        tooltip.text(`${d.Category}: ${d.Amount.toFixed(1)}`);
      })
      .on("mousemove", () => tooltip.style("top",(
        d3.event.pageY - 10)+"px").style("left",(d3.event.pageX + 15)+"px")
      ).on("mouseout", () => {
        tooltip.style("visibility", "hidden")
        tooltip.style("opacity", "0");
      });

  // Draw CDF line
  if (showCdf) {
    var guide = d3.svg.line()
                  .x(function(d: any) { return xScale(d.Category); })
                  .y(function(d: any){ return ycum(d.CumulativePercentage) })
                  .interpolate('basis');

    var line = svg.append('path')
                  .datum(data)
                  .attr('d', guide)
                  .attr('class', 'line');
  }

  // Draw axes
  if (showAxis) { 
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Amount");

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + [w, 0] + ")")
        .call(yAxis2)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 4)
        .attr("dy", "-.71em")
        .style("text-anchor", "end")
        .text("Cumulative %");
  }
}

export default renderBarChart;
