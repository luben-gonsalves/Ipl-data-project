var csv = require("fast-csv");
var Chartkick = require("chartkick");
var Chart = require("chart.js");

Chartkick.addAdapter(Chart);

//1st problem
var firstProblem = function() {
  var matchesData = [];
  csv
    .fromPath("matches.csv", { headers: true })
    .on("data", data => {
      let rowData = {};

      Object.keys(data).forEach(current_key => {
        rowData[current_key] = data[current_key];
      });
      matchesData.push(rowData);
    })
    .on("end", () => {
      // Getting all the year and counting total number of games played
      count = {};
      matchesData
        .map(item => item.season)
        .forEach(function(i) {
          count[i] = (count[i] || 0) + 1;
        });
      console.log(count);
    });
};

<div id="chart-1" style="height: 300px;" />
new Chartkick.BarChart("chart-1", [["Work", 32], ["Play", 1492]]);

firstProblem();
