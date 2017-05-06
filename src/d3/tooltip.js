
/**
 * Closure that creates the tooltip hover function
 * @param groupName Name of the x group
 * @param metrics Object to use to get values for the group
 * @returns {Function} A function that provides the values for the tooltip
 */
function tooltipHover(groupName, metrics) {
    var tooltipString = "Group: " + groupName;
    tooltipString += "<br\>Max: " + formatAsFloat(metrics.max, 0.1);
    tooltipString += "<br\>Q3: " + formatAsFloat(metrics.quartile3);
    tooltipString += "<br\>Median: " + formatAsFloat(metrics.median);
    tooltipString += "<br\>Q1: " + formatAsFloat(metrics.quartile1);
    tooltipString += "<br\>Min: " + formatAsFloat(metrics.min);
    return function () {
        chart.objs.tooltip.transition().duration(200).style("opacity", 0.9);
        chart.objs.tooltip.html(tooltipString)
    };
}

export default tooltipHover;