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

      //find total win count of all teams in each year
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
    });
};

secondProblem();
