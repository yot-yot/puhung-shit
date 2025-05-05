const express = require('express');
const app = express();
const haribo = require("./module/haribo");

const server = app.listen(80, () => {
    console.log('Start server : localhost');
});

app.get('/:data', async (req, res) => { // url path, async (요청, 응답)
    let start = performance.now();
    let {data} = req.params;
    haribo.sibal(100000);
    let end = performance.now();

    res.send(`${data} 색이 가장 많은 봉지 : `+haribo.colorMost(data)+` 실행 시간 : ${end-start}ms`); // 성공 시 보여지는 응답
})
