const express = require('express');
const app = express();
const mongoose = require('mongoose');
const globalRouter = require('./routers/globalRouter');

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;

const handleConnection = () => {
  console.log('✅ DB is connected!');
};
const handleError = (err) => {
  console.log(`Error on DB: ${err}`);
};

db.once('open', handleConnection);
// DB 정상 연결 시 handleConnection 함수 실행
db.on('error', handleError);
// DB 에러 발생 시 handleError 함수 실행

app.use('/', globalRouter);

app.listen(PORT, () => {
  console.log(`✅ Listening on 'http://localhost:${PORT}'`);
});