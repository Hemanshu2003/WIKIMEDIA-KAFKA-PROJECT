'use strict';

// Create the crossfilter for the relevant dimensions and groups.
let events = crossfilter_facade([], dc.redrawAll),
    all = events.groupAll()

let reducer = reductio_facade()
  .count(true)

let width = document.getElementById('container').clientWidth
let smallwidth = width > 500 ? width / 3 : width
let charts = []
let clearAll = () => {
  charts.forEach((c) => {
    c.filterAll()
  })
}

reductio_facade()
  .groupAll(function() { return [""]; })
  .count(true)(all);

var rehydrateFilter = function(f) {
  if(Array.isArray(f)) {
    return dc.filters.RangedFilter(f[0],f[1]);
  } else {
    return f;
  }
};

var filterHandler = function (dimension, filters) {
  if (filters.length === 0) {
    dimension.filter(null);
  } else if (filters.length === 1 && !Array.isArray(filters[0])) {
    dimension.filterExact(filters[0]);
  } else if(filters.length === 1 && Array.isArray(filters[0]) &&
    filters[0].isFiltered &&
    typeof filters[0][0] === typeof filters[0][1]) {

    dimension.filterRange([filters[0][0], filters[0][1]]);
  } else {
    dimension.filterFunction(function (d) {
      for (var i = 0; i < filters.length; i++) {
        var filter = filters[i];
        if (filter.isFiltered && filter.isFiltered(d)) {
          return true;
        } else if (filter <= d && filter >= d) {
          return true;
        }
      }
      return false;
    }, 'var filters = ' + JSON.stringify(filters) + '.map(' + rehydrateFilter.toString() + ');');
  }
  return filters;
};

let clientRecords = dc.dataCount("#client-records")
  .dimension({ size: function() { return events.size(); } })
  .group({ value: function() { return all.value()[0] ? all.value()[0].value.count : 0; }})
  .html({
    some: '%filter-count of %total-count total records displayed',
    all: '%filter-count of %total-count total records displayed'
  });

let typeDim = events.dimension(function(d) { return d.type ? d.type : ""; });
let typeGroup = typeDim.group();
reducer(typeGroup)
let typeChart = dc.rowChart('#type')
  .height(180)
  .width(smallwidth)
  .margins({top: 5, left: 10, right: 10, bottom: 20})
  .group(typeGroup)
  .valueAccessor(function(d) { return d.value.count; })
  .labelOffsetY(function() { return 7; })
  .labelOffsetX(function() { return 5; })
  .dimension(typeDim)
  .ordinalColors(['#ff0000'])
  .elasticX(true)
typeChart.filterHandler(filterHandler)
charts.push(typeChart)

let minorDim = events.dimension(function(d) { return d.minor ? d.minor : ""; });
let minorGroup = minorDim.group();
reducer(minorGroup)
let minorChart = dc.rowChart('#minor')
  .height(180)
  .width(smallwidth)
  .margins({top: 5, left: 10, right: 10, bottom: 20})
  .group(minorGroup)
  .valueAccessor(function(d) { return d.value.count; })
  .labelOffsetY(function() { return 7; })
  .labelOffsetX(function() { return 5; })
  .label((d) => { return d.key ? "Minor" : "Major" })
  .dimension(minorDim)
  .ordinalColors(['#ff0000'])
  .elasticX(true)
minorChart.filterHandler(filterHandler)
charts.push(minorChart)

let botDim = events.dimension(function(d) { return d.bot ? d.bot : ""; });
let botGroup = botDim.group();
reducer(botGroup)
let botChart = dc.rowChart('#bot')
  .height(180)
  .width(smallwidth)
  .margins({top: 5, left: 10, right: 10, bottom: 20})
  .group(botGroup)
  .valueAccessor(function(d) { return d.value.count; })
  .labelOffsetY(function() { return 7; })
  .labelOffsetX(function() { return 5; })
  .label((d) => { return d.key ? "Bot" : "Not a bot" })
  .dimension(botDim)
  .ordinalColors(['#ff0000'])
  .elasticX(true);
botChart.filterHandler(filterHandler)
charts.push(botChart)

let wikiDim = events.dimension(function(d) { return d.wiki ? d.wiki : ""; });
let wikiGroup = wikiDim.group();
reducer(wikiGroup)
let wikiChart = dc.pieChart('#wiki')
  .height(180)
  .group(wikiGroup)
  .valueAccessor(function(d) { return d.value.count; })
  .dimension(wikiDim)
  .ordinalColors(['#ff0000'])
  .ordering((d) => {
    return -d.value.count
  })
  .innerRadius(30)
  .slicesCap(9)
  .colors(d3.scale.ordinal().range(colorbrewer.Reds[9]))
wikiChart.filterHandler(filterHandler)
charts.push(wikiChart)
// console.log(colorbrewer.Reds[9]);
// ['rgb(254 242 242)' , 'rgb(254 202 202)' , 'rgb(254 202 202)' , 'rgb(248 113 113)' , 'rgb(239 68 68)' , 'rgb(220 38 38)', 'rgb(185 28 28)', 'rgb(153 27 27)', 'rgb(127 29 29)']

let timeDim = events.dimension(function(d) { return d.timestamp ? new Date(d.timestamp*1000) : new Date(Date.now()); });
let timeGroup = timeDim.group();
let startDate = new Date(Date.now()+5000)
reducer(timeGroup)
let timeChart = dc.lineChart('#timestamp')
        .renderArea(true)
        .width(width)
        .height(200)
        .transitionDuration(250)
        .dimension(timeDim)
        .round(d3.time.second.round)
        .xUnits(d3.time.seconds)
        .elasticY(true)
        .x(d3.time.scale().domain([startDate, new Date()]))
        .renderHorizontalGridLines(true)
        .legend(dc.legend().x(width - 100).y(20).itemHeight(13).gap(5))
        .group(timeGroup, 'Edits / second').ordinalColors(['#ff0000'])
        .valueAccessor(function (d) {
            return d.value.count;
        })
timeChart.filterHandler(filterHandler)
charts.push(timeChart)

let sizeDim = events.dimension(function(d) { return d.size ? d.size : 0; });
// aggregate all 10000+ edits at 10000, strip out 0s (which are actually nulls)  to -1000
let sizeGroup = sizeDim.group(function(d) { return d > 10000 ? 10000 : d===0 ? -1000 : Math.floor(d/1000)*1000 });
reducer(sizeGroup)
let sizeChart = dc.barChart('#size')
        .width(smallwidth)
        .height(200)
        .dimension(sizeDim)
        .x(d3.scale.linear().domain([0, 11000]))
        .elasticY(true)
        .xUnits(function(d) { return 11; })
        .renderHorizontalGridLines(true)
        .group(sizeGroup).ordinalColors(['#ff0000'])
        .valueAccessor(function (d) {
          return d.value.count
        })
sizeChart.yAxis().tickFormat(d3.format("s"))
sizeChart.xAxis().tickFormat(d3.format("s"))
sizeChart.filterHandler(function (dimension, filters) {
  let newFilters = []
  if(filters[0] && filters[0][1] === 11000) {
    newFilters[0] = [filters[0][0], 999999999] // Infinity doesn't serialize
  } else {
    newFilters = filters
  }
  return filterHandler(dimension, newFilters)
})
charts.push(sizeChart)


let arrivalDim = events.dimension(function(d) { return d.arrivalDelay ? d.arrivalDelay : 0; });
// aggregate all 10+ delays at 10, strip out 0s (which are actually nulls)  to -1
let arrivalGroup = arrivalDim.group(function(d) { return d > 10 ? 10 : d===0 ? -1 : Math.floor(d) });
reducer(arrivalGroup)
let arrivalChart = dc.barChart('#arrival')
        .width(smallwidth)
        .height(200)
        .dimension(arrivalDim)
        .x(d3.scale.linear().domain([0, 11]))
        .elasticY(true)
        .xUnits(function(d) { return 11; })
        .renderHorizontalGridLines(true)
        .group(arrivalGroup).ordinalColors(['#ff0000'])
        .valueAccessor(function (d) {
          return d.value.count
        })
arrivalChart.yAxis().tickFormat(d3.format("s"))
arrivalChart.filterHandler(function (dimension, filters) {
  let newFilters = []
  if(filters[0] && filters[0][1] === 11) {
    newFilters[0] = [filters[0][0], 999999999] // Infinity doesn't serialize
  } else {
    newFilters = filters
  }
  return filterHandler(dimension, newFilters)
})
charts.push(arrivalChart)



dc.renderAll()

setInterval(() => {
  timeChart.x(d3.time.scale().domain([startDate, new Date()]))
  dc.redrawAll()
}, 1000)