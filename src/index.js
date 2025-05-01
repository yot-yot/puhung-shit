const express = require('express');
const app = express();

const server = app.listen(80, () => {
    console.log('Start server : localhost');
});

app.get('/api/user/:data', async (req, res) => { // url path, async (요청, 응답)
    let {data} = req.params;
    res.send(data); // 성공 시 보여지는 응답
})
