const fs = require("fs");

let dataJson = JSON.parse(fs.readFileSync("./storage/input/data.json"));
let mrJson = JSON.parse(fs.readFileSync("./storage/output/memory.json"));



let colorKind = ["orange", "red", "green", "yellow", "white"];
let nowSee; //tq
/*
{
    "longMr" : [
        {
            "name":"",
            "mkDate":"",
            "content":""
        }
    ],
    "shortMr" : [
        {
            "name":"",
            "mkDate":"",
            "content":""
        }
    ]
}
*/


function sibal(n) {
    var text = "";
    for (i = 0; i < n; i++) {
        text += (`{"bagNum":${i},"white":${parseInt(Math.random() * 9)},"red":${parseInt(Math.random() * 9)},"green":${parseInt(Math.random() * 9)},"yellow":${parseInt(Math.random() * 9)},"orange":${parseInt(Math.random() * 9)}},  `);
    }
    text = text.slice(0, -1);
    text=text.split(",  ");
    text[n-1]=text[n-1].replace(", ","");
    //text = text.splice(n, n-1)
    
    var json = {
        "bag": {
            "colorNum": []
        }
    }
    for(i=0;i<n;i++){
        json.bag.colorNum.push(JSON.parse(text[i]));
    }
    //console.log(json);
    fs.writeFileSync("./storage/input/data.json", JSON.stringify(json), "utf-8");
}

function haribo(i, data) {
    var json = {
        "name": `bag${i}`,
        "mkDate": new Date().toString(),
        "content": dataJson.bag.colorNum[i]
    };
    mrJson.shortMr.push(json);
    fs.writeFileSync("./storage/output/memory.json", JSON.stringify(mrJson), "utf-8");
    return 0;
}

//haribo(0, nowSee);

function colorMost(color, n) {
    dataJson = JSON.parse(fs.readFileSync("./storage/input/data.json"));
    var re = [];
    console.log(eval(`dataJson.bag.colorNum[0].${color}`))
    var d;
    for (i = 0; i < dataJson.bag.colorNum.length; i++) {
        d = dataJson.bag.colorNum[i];
        if (Math.max(d.orange, d.red, d.yellow, d.green, d.white) == eval(`d.${color}`)) {
            re.push(dataJson.bag.colorNum[i].bagNum);
        }
    }
    if (re == []) return -1;
    return re;
}

module.exports = {
    haribo,
    colorMost,
    sibal
}