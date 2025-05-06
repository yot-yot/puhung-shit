const fs = require("fs");

let dataJson = JSON.parse(fs.readFileSync("./storage/input/data.json"));
let mrJson = JSON.parse(fs.readFileSync("./storage/output/memory.json"));
let dmJson = JSON.parse(fs.readFileSync("./storage/output/dummy.json"));



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
        text += (`{"bagNum":${i},
            "white":${parseInt(Math.random() * 9)},
            "red":${parseInt(Math.random() * 9)},
            "green":${parseInt(Math.random() * 9)},
            "yellow":${parseInt(Math.random() * 9)},
            "orange":${parseInt(Math.random() * 9)}}
            ,  `);
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

function haribo() {
    dataJson = JSON.parse(fs.readFileSync("./storage/input/data.json"));
    mrJson = JSON.parse(fs.readFileSync("./storage/output/memory.json"));
    mrJson.shortMr.push(dataJson.bag.colorNum);
    fs.writeFileSync("./storage/output/memory.json", JSON.stringify(mrJson), "utf-8");
    return 0;
}

function long(color){
    //dataJson = JSON.parse(fs.readFileSync("./storage/input/data.json"));
    j=0
    mrJson = JSON.parse(fs.readFileSync("./storage/output/memory.json"));
    mrJson.longMr = [];
    for (i = 0; i < mrJson.shortMr[0].length; i++) {
        
        d = mrJson.shortMr[0][i];
        //console.log(d)
        //console.log(eval(`d.${color}`))
        if (eval(`d.${color}`)>=4) {
            
            mrJson.longMr.push(d);
            j++
        }else{
            dmJson.noNeed.push(d);
        }
    }
    //console.log(j, mrJson.longMr.length)
    fs.writeFileSync("./storage/output/memory.json", JSON.stringify(mrJson), "utf-8");
    fs.writeFileSync("./storage/output/dummy.json", JSON.stringify(dmJson), "utf-8");
    return mrJson.longMr;
}
//haribo(0, nowSee);

function colorMost(color) {
    dataJson = JSON.parse(fs.readFileSync("./storage/input/data.json"));
    var re = [];
    //console.log(eval(`dataJson.bag.colorNum[0].${color}`))
    var d;
    var num = 0;
    for (i = 0; i < dataJson.bag.colorNum.length; i++) {
        d = dataJson.bag.colorNum[i];
        if (Math.max(d.orange, d.red, d.yellow, d.green, d.white) == eval(`d.${color}`)) {
            re.push(dataJson.bag.colorNum[i].bagNum);
            num+=eval(`d.${color}`);
        }
    }
    //console.log(num/n);
    if (re == []) return -1;
    return re;
}

function colorMost2(color) {
    dataJson = JSON.parse(fs.readFileSync("./storage/output/memory.json"));
    var re = [];
    //console.log(eval(`dataJson.bag.colorNum[0].${color}`))
    var d;
    var num = 0;
    for (i = 0; i < dataJson.longMr.length; i++) {
        d = dataJson.longMr[i];
        if (Math.max(d.orange, d.red, d.yellow, d.green, d.white) == eval(`d.${color}`)) {
            re.push(dataJson.longMr[i].bagNum);
            num+=eval(`d.${color}`);
        }
    }
    //console.log(num/n);
    if (re == []) return -1;
    //console.log(re)
    return re;
}

module.exports = {
    haribo,
    colorMost,
    colorMost2,
    sibal,
    long
}