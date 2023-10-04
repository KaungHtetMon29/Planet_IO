const { parse } = require("csv-parse");
const fs = require("fs");
const arr = [];
fs.createReadStream("kepler_data.csv")
  .pipe(parse({ comment: "#", columns: true }))
  .on("data", (data) => {
    if (
      data["koi_disposition"] === "CONFIRMED" &&
      data["koi_insol"] > 0.36 &&
      data["koi_insol"] < 1.11 &&
      data["koi_prad"] < 1.6
    ) {
      arr.push(data.kepler_name);
    }
  })
  .on("end", () => {
    console.log(arr);
  });
