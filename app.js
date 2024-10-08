const PORT = 3000;
const WS_PORT = 4000;
const express = require('express');
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const crypto = require('crypto');
const requestIp = require('request-ip');
const db = require('./db');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const router = express.Router();
var template = require('./template.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./auth');
const second = require('./game2server.js')


const cookie = require('cookie'); // 쿠키 파싱을 위한 모듈


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/auth', authRouter);
var authcheck = require('./authcheck.js');

app.use('/auth', express.static(__dirname +'/auth'));
app.use(express.static(path.join(__dirname, '/public')));

const ejs = require('ejs');
app.set('view engine', 'ejs');

app.use(session({
  secret: '~~~',	// 원하는 문자 입력
  resave: false,
  saveUninitialized: true,
  //store:new FileStore(),
}));

//cors정책에 따른  Access-Control-Allow-Origin 헤더 세팅
// var httpServer = http.createServer(function (request, response) {
//   // Setting up Headers
//   response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // 로컬 호스트 출처 허용
//   response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // 모든 HTTP 메서드 허용
//   response.setHeader('Access-Control-Allow-Credentials', 'true'); // 클라이언트와 서버 간에 쿠키 주고받기 허용

//   response.writeHead(200, { 'Content-Type': 'text/plain' });
//   response.end('ok');
// });

app.use(cors({
  origin: `http://localhost:${PORT}`
}));

app.use(cors({
  origin: `http://localhost:${WS_PORT}`
}));



app.use('/', router);
app.get('/cardgame', function(req, res) {
  res.sendFile(__dirname + '/public/CardGame1.html');
});


app.use(express.static(path.join(__dirname, './asset'))); // asset 폴더를 정적 파일 제공 경로로 설정
app.use(express.static(path.join(__dirname, './game2'))); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
