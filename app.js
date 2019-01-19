var csv = require("fast-csv");
var matchesData = [];
var deliveriesData = [];

//1st problem
var firstProblem = function() {
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

//3rd problem
var thirdProblem = function() {
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
      var filterMatchesData = matchesData.filter(item => item.season == 2016);

      //match id of filterMatchesData and deliveriesData
      var obj = {};
      var filteredDeliveries = deliveriesData.filter(
        o =>
          o["extra_runs"] > 0 &&
          filterMatchesData.find(o2 => o2["id"] === o["match_id"])
      );

      //Filter extra run conceded by each item.
      for (var delivery in filteredDeliveries) {
        obj[filteredDeliveries[delivery]["bowling_team"]] =
          (obj[filteredDeliveries[delivery]["bowling_team"]] || 0) +
          parseInt(filteredDeliveries[delivery]["extra_runs"]);
      }
      console.log(obj);

      //-Same output as above
      //
      // var targetObj = {};
      // for (var i = 0; i < filterDeliveriesData.length; i++) {
      //   if (
      //     !targetObj.hasOwnProperty(filterDeliveriesData[i]["bowling_team"])
      //   ) {
      //     targetObj[filterDeliveriesData[i]["bowling_team"]] = 0;
      //   }
      //   targetObj[filterDeliveriesData[i]["bowling_team"]] =
      //     targetObj[filterDeliveriesData[i]["bowling_team"]] +
      //     parseInt(filterDeliveriesData[i]["extra_runs"]);
      // }
      // console.log(targetObj);
      //end
    });
};

var fourthProblem = function() {
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
          filterDeliveriesData[item]["wide_runs"] == "0" &&
          filterDeliveriesData[item]["noball_runs"] == "0"
        ) {
          totalBalls[filterDeliveriesData[item]["bowler"]] =
            (totalBalls[filterDeliveriesData[item]["bowler"]] || 0) +
            parseInt(filterDeliveriesData[item]["ball"]);
        }
      }

      for (var i in totalRuns) {
        totalRuns[i] = totalRuns[i] / (totalBalls[i] / 6);
      }
      console.log(totalRuns);
    });
};

firstProblem();
thirdProblem();
fourthProblem();
