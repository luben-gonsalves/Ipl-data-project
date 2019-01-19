var csv = require("fast-csv");

var fourthProblem = function() {
  var matchesData = [];
  var deliveriesData = [];
  csv
    .fromPath("matches.csv", { headers: true })
    .on("data", data => {
      let rowData = {};
      Object.keys(data).forEach(current_key => {
        rowData[current_key] = data[current_key];
      });
      matchesData.push(rowData);
    })
    .on("end", () => {});

  csv
    .fromPath("deliveries.csv", { headers: true })
    .on("data", data => {
      let rowData = {};

      Object.keys(data).forEach(current_key => {
        rowData[current_key] = data[current_key];
      });
      deliveriesData.push(rowData);
    })
    .on("end", () => {
      //filter data for the year 2016 from matchesData
      var filterMatchesData = matchesData.filter(item => item.season == 2015);

      //match id of filterMatchesData and deliveriesData
      var totalRuns = {};
      var totalBalls = {};
      var filterDeliveriesData = deliveriesData.filter(o =>
        filterMatchesData.find(o2 => o2["id"] === o["match_id"])
      );

      //total number of runs
      for (var item in filterDeliveriesData) {
        totalRuns[filterDeliveriesData[item]["bowler"]] =
          (totalRuns[filterDeliveriesData[item]["bowler"]] || 0) +
          parseInt(filterDeliveriesData[item]["total_runs"]);
      }

      //total number of balls
      for (var item in filterDeliveriesData) {
        if (
          filterDeliveriesData[item]["wide_runs"] === "0" &&
          filterDeliveriesData[item]["noball_runs"] === "0"
        ) {
          totalBalls[filterDeliveriesData[item]["bowler"]] =
            (totalBalls[filterDeliveriesData[item]["bowler"]] || 0) + 1;
        }
      }

      for (var i in totalRuns) {
        totalRuns[i] = totalRuns[i] / (totalBalls[i] / 6);
      }

      //get top ten teams
      var topTen = {};
      var toSort = [];
      for (var i in totalRuns) {
        toSort.push([i, totalRuns[i]]);
      }

      toSort.sort(function(a, b) {
        return a[1] - b[1];
      });

      for (var i = 0; i < 10; i++) {
        topTen[toSort[i][0]] = toSort[i][1];
      }
      console.log(topTen);
    });
};

fourthProblem();
