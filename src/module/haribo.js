const fs = require("fs");

let dataJson = JSON.parse(fs.readFileSync("./storage/input/data.json"));
let mrJson = JSON.parse(fs.readFileSync("./storage/output/memory.json"));
let dmJson = JSON.parse(fs.readFileSync("./storage/output/dummy.json"));

/*
{
    "longMr" : [

    ],
    "shortMr" : [

    ]
}

{
    "noNeed":[]
}

*/

function writeBase(n) {
    var text = "";
    for (i = 0; i < n; i++) {
        text += (`{"bagNum":${i},
            "white":${parseInt(Math.random() * 9)},
            "red":${parseInt(Math.random() * 9)},
            "green":${parseInt(Math.random() * 9)},
            "yellow":${parseInt(Math.random() * 9)},
            "orange":${parseInt(Math.random() * 9)}}
            ,  `);
    }
    text = text.slice(0, -1);
    text = text.split(",  ");
    text[n - 1] = text[n - 1].replace(", ", "");

    var json = {
        "bag": {
            "colorNum": []
        }
    }
    for (i = 0; i < n; i++) {
        json.bag.colorNum.push(JSON.parse(text[i]));
    }

    fs.writeFileSync("./storage/input/data.json", JSON.stringify(json), "utf-8");
}

function haribo() {
    dataJson = JSON.parse(fs.readFileSync("./storage/input/data.json"));
    mrJson = JSON.parse(fs.readFileSync("./storage/output/memory.json"));
    mrJson.shortMr.push(dataJson.bag.colorNum);
    fs.writeFileSync("./storage/output/memory.json", JSON.stringify(mrJson), "utf-8");
    return 0;
}

function long(color) {
    j = 0
    mrJson = JSON.parse(fs.readFileSync("./storage/output/memory.json"));
    mrJson.longMr = [];
    for (i = 0; i < mrJson.shortMr[0].length; i++) {

        d = mrJson.shortMr[0][i];
        if (eval(`d.${color}`) >= 4) {

            mrJson.longMr.push(d);
            j++
        } else {
            dmJson.noNeed.push(d);
        }
    }
    fs.writeFileSync("./storage/output/memory.json", JSON.stringify(mrJson), "utf-8");
    fs.writeFileSync("./storage/output/dummy.json", JSON.stringify(dmJson), "utf-8");
    return mrJson.longMr;
}

function colorMost(color) {
    dataJson = JSON.parse(fs.readFileSync("./storage/input/data.json"));
    var re = [];
    var d;
    var num = 0;
    for (i = 0; i < dataJson.bag.colorNum.length; i++) {
        d = dataJson.bag.colorNum[i];
        if (Math.max(d.orange, d.red, d.yellow, d.green, d.white) == eval(`d.${color}`)) {
            re.push(dataJson.bag.colorNum[i].bagNum);
            num += eval(`d.${color}`);
        }
    }
    if (re == []) return -1;
    return re;
}

function fileClear() {
    mrJson = {
        "longMr": [

        ],
        "shortMr": [

        ]
    };
    dmJson = {
        "noNeed": []
    };
    dataJson = {
        "bag": {
            "colorNum": [
                {

                }
            ]
        }
    }
    fs.writeFileSync("./storage/output/memory.json", JSON.stringify(mrJson), "utf-8");
    fs.writeFileSync("./storage/output/dummy.json", JSON.stringify(dmJson), "utf-8");
    fs.writeFileSync("./storage/input/data.json", JSON.stringify(dataJson), "utf-8");
    return 0;
}

module.exports = {
    haribo,
    colorMost,
    writeBase,
    long,
    fileClear
}