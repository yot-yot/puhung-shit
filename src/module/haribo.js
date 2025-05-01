const fs = require("fs");

let dataJson = fs.readFileSync("../../storage/input/data.json");
/*
for(i=0;i<100;i++){
    console.log(`{"bagNum":${i},"white":${parseInt(Math.random()*9)},"red":${parseInt(Math.random()*9)}, "green":${parseInt(Math.random()*9)}, "yellow":${parseInt(Math.random()*9)},"orange":${parseInt(Math.random()*9)}},`);
}
*/

let nowSee = "";