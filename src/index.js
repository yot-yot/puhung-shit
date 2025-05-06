const express = require('express');
const app = express();
const haribo = require("./module/haribo");

const ban = 10000; //반복횟수

const server = app.listen(80, () => {
    console.log('Start server : localhost');
});

app.get('/:data', async (req, res) => { // url path, async (요청, 응답)
    let start = performance.now();
    let { data } = req.params;
    haribo.sibal(ban); //데이터 수정
    let end = performance.now();
    var sib = haribo.colorMost(data);
    haribo.haribo(); //단기 기억 머시깽이
    var ddd = haribo.long(data);
    
    console.log(ddd)
    var fuck = [];
    for(i=0;i<ddd.length;i++){
        fuck.push(ddd[i].bagNum)
    }
    var s = countCommonElements(fuck, sib)
    console.log(fuck.length, sib.length, s)
    res.send(`${data} 색이 가장 많은 봉지 : ` + sib + ` 실행 시간 : ${end - start}ms    `+fuck); // 성공 시 보여지는 응답
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
