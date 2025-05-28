const express = require('express');
const app = express();
const haribo = require("./module/haribo");
const path = require("path");

const ban = 100; //반복횟수

const server = app.listen(80, () => {
    console.log('Start server : localhost');
});

app.get('/', async (req, res) => { 
    var filePath = path.join(__dirname, 'html', 'main.html');
    res.sendFile(filePath);
})

app.get('/clear', async (req, res) => { 
    haribo.fileClear(); //db 초기화
    res.send("success"); // 성공 시 보여지는 응답
})

app.get('/color/:data', async (req, res) => { 

    let start = performance.now();
    let { data } = req.params;
    haribo.writeBase(ban); //데이터 수정
    let end = performance.now();

    var mostColor = haribo.colorMost(data);
    haribo.haribo(); //단기 기억 저장?
    
    var longMr = haribo.long(data);//장기 기억인듯
    
    var result = [];

    let start2 = performance.now();
    for(i=0;i<longMr.length;i++){
        result.push(longMr[i].bagNum);
    }
    let end2 = performance.now();

    var goodRt = countCommonElements(result, mostColor);
    console.log(result.length, mostColor.length, goodRt);
    res.send(`${data} / 일반 : ` +  ` 실행 시간 : ${end - start}ms, ${data} / 뇌 모방 : `+` 실행 시간2 : ${end2 - start2}ms ,`+"정확도:"+goodRt/mostColor.length*100+"%"); // 성공 시 보여지는 응답
})

function countCommonElements(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    let count = 0;

    for (const item of set1) {
        if (set2.has(item)) {
            count++;
        }
    }
    return count;
}
