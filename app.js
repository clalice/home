const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// 루트 경로로 접속 시 index.html 파일을 반환
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
