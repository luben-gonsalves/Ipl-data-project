var csv = require("fast-csv");

//1st problem
var secondProblem = function() {
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
      var TotalCount = {};
      for (var i in matchesData) {
        if (matchesData[i]["winner"] !== "") {
          if (TotalCount.hasOwnProperty(matchesData[i]["winner"])) {
            TotalCount[matchesData[i]["winner"]].hasOwnProperty(
              matchesData[i]["season"]
            )
              ? TotalCount[matchesData[i]["winner"]][matchesData[i]["season"]]++
              : (TotalCount[matchesData[i]["winner"]][
                  matchesData[i]["season"]
                ] = 1);
          } else TotalCount[matchesData[i]["winner"]] = {};
        }
      }
      console.log(TotalCount);
      // let obj = matchesData.reduce(function(output, current) {
      //   if (output.hasOwnProperty(current.winner)) {
      //     if (output[current.winner].hasOwnProperty(current.season))
      //       output[current.winner][current.season] =
      //         output[current.winner][current.season] + 1;
      //     else output[current.winner][current.season] = 1;
      //   } else {
      //     output[current.winner] = {};
      //     output[current.winner][current.season] = 1;
      //   }
      // }, {});

      // console.log(obj);
      // var obj1;
      // var obj = {
      //   2008: {},
      //   2009: {},
      //   2010: {},
      //   2011: {},
      //   2012: {},
      //   2013: {},
      //   2014: {},
      //   2015: {},
      //   2016: {},
      //   2017: {}
      // };

      // console.log(obj1);

      //   for (var i in matchesData) {
      //     obj[matchesData[i]["season"]]=(obj[filteredDeliveries[delivery]["bowling_team"]] || 0) +1
      // }
    });
};

secondProblem();
