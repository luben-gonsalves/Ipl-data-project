var csv = require("fast-csv");

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
      // console.log(count);
      var arr = [];
      for (var i in count) {
        var obj = {};
        obj["name"] = i;
        obj["y"] = count[i];
        arr.push(obj);
      }
      console.log(arr);
      require("fs").writeFile(
        "./jsonFiles/matchesWonPerYear.json",
        JSON.stringify(arr, null, 4),
        err => {
          if (err) {
            console.log(err);
            return;
          }
        }
      );
    });
};

firstProblem();
