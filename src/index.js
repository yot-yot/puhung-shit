const express = require('express');
const app = express();
const haribo = require("./module/haribo");

const ban = 100; //반복횟수

const server = app.listen(80, () => {
    console.log('Start server : localhost');
});

app.get('/:data', async (req, res) => { 
    let start = performance.now();
    let { data } = req.params;
    haribo.sibal(ban); //데이터 수정
    let end = performance.now();
    var sib = haribo.colorMost(data);
    haribo.haribo(); //단기 기억 머시깽이
    
    var ddd = haribo.long(data);
    
    //console.log(ddd)
    var fuck = [];
    let start2 = performance.now();
    for(i=0;i<ddd.length;i++){
        fuck.push(ddd[i].bagNum);
    }
    let end2 = performance.now();
    var s = countCommonElements(fuck, sib);
    console.log(fuck.length, sib.length, s, );
    res.send(`${data} / 일반 : ` +  ` 실행 시간 : ${end - start}ms, ${data} / 뇌 모방 : `+` 실행 시간2 : ${end2 - start2}ms,`+"정확도:"+s/sib.length*100+"%"); // 성공 시 보여지는 응답
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
