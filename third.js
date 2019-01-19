var csv = require("fast-csv");

var thirdProblem = function() {
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
      var filterMatchesData = matchesData.filter(item => item.season == 2016);

      //match id of filterMatchesData and deliveriesData
      var obj = {};
      var filteredDeliveries = deliveriesData.filter(
        item =>
          item["extra_runs"] > 0 &&
          filterMatchesData.find(item2 => item2["id"] === item["match_id"])
      );

      //Filter extra run conceded by each team.
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

thirdProblem();
