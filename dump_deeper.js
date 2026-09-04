// Dump all 11 deeper_partN/data.js files into one JSON array
const fs = require("fs");
const path = require("path");

const all = [];
for (let p = 1; p <= 11; p++) {
  const dataPath = `/tmp/work/deeper_part${p}/data.js`;
  const { chapters } = require(dataPath);
  chapters.forEach((ch) => {
    all.push({ part: p, num: ch.num, title: ch.title, items: ch.items });
  });
}
fs.writeFileSync("/tmp/work/app321/scripts/deeper_raw.json", JSON.stringify(all, null, 0));
console.log("chapters dumped:", all.length, "total items:", all.reduce((s, c) => s + c.items.length, 0));
