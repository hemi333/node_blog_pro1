const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const commentRouter = require('./routers/commentRouter');
const globalRouter = require('./routers/globalRouter');
const postRouter = require('./routers/postRouter');

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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`✅ Listening on 'http://localhost:${PORT}`)
});

app.use('/', globalRouter);
app.use('/board', postRouter);
app.use('/comment', commentRouter);