import express from 'express'; // express 모듈 가져오기
import authRouter from './routes/auth.router.js';
import usersRouter from './routes/users.router.js';
import { eduTest, eduUsersTest } from './app/middlewares/edu/edu.middleware.js';
import { errorHandler } from './app/middlewares/errors/error-handler.js';

const app = express();
app.use(express.json()); // JSON으로 요청이 올 경우 파싱 처리 
app.use(eduTest); //커스텀 미들웨어 전역 등록

// 클라이언트가 '/' 경로로 GET 요청을 보낼 때 실행되는 Router
app.get('/', (request, response, next) => {
  response.status(200).send({
    code: '00',
    msg:'안녕 익스프레스!',
  });
});

// 클라이언트가 '/' 경로로 POST 요청을 보낼 때 실행되는 Router
app.post('/', (request, response, next)=> {
  response.status(200).send('포스트 익스프레스!');
});


// 클라이언트가 '/' 경로로 PUT 요청을 보낼 때 실행되는 Router
app.put('/', (request, response, next)=> {
  response.status(200).send('풋 익스프레스!');
});

// 클라이언트가 '/' 경로로 DELETE 요청을 보낼 때 실행되는 Router
app.delete('/', (request, response, next)=> {
  response.status(200).send('딜리트 익스프레스!');
}); 

// ----------------
// Query Parameter 제어 
// Request.query 프로퍼티를 통해서 접근 가능
// 모든 값을 string으로 받기 때문에 주의 필요
app.get('/api/posts', (request, response, next) => {
  const params = request.query;
  const name = request.query.name;
  const age = parseInt(request.query.age);
  console.log(name, age);
  response.status(200).send(params);
});

// Segemnet Parameter 
// `Request.params`를 통해서 접근 가능
app.get('/api/posts/:id', (request, response, next) => {
  const postId = request.params.id;
  console.log(typeof(postId));
  response.status(200).send(postId);
});

// JSON 요청 제어 
// 'Request.body'를 통해서 접근 가능 (** express.json() 추가 필요 **)
app.post('/api/posts', (request, response, next) => {
  const {account, password, name} = request.body;
  // const account = request.body.account;
  // const password = request.body.password;
  // const name = request.body.name;
  response.status(200).send({account, password, name}); 

  // response.status(200).send({
  //   password: password
  //   ,acoount: account
  //   ,name: name
  // });
});

// -------------
// 라우트 그룹 
// -------------
// 라우트를 모듈로 나누고 그룹핑하여 관리 
app.use('/api', authRouter);
app.use('/api/users', eduUsersTest ,usersRouter);

// 에러 테스트용 라우터 
app.get('/error', (reqeust, response, next) => {
  // `throw`를 이용하여 에러 핸들링 처리도 가능 (비동기 처리 내부에서는 사용하면 에러 핸들러가 핸들링 못함)
  // setTimeout(() => {
  //   throw new Error('쓰로우로 예외 발생');
  // }, 1000);

  // 비동기 처리 내부에서는 반드시 `next(error)`를 이용해야 서버 crashed 안 일어남
  setTimeout(() => {
    next (new Error('쓰로우로 예외 발생'));
  }, 1000);
});

// 대체 라우트 (모든 라우터 중에 가장 마지막에 작성)
// app.use((request, response, next) => {
//   response.status(404).send('찾을 수 없는 페이지입니다.');
// });
app.use((request, response, next) => {
  response.status(404).send({
    code: 'E01',
    msg: '찾을 수 없는 페이지입니다.'
  });
});

// -----------------------
//  Error Handler 등록 
// -----------------------
app.use(errorHandler);

// 서버를 주어진 포트에서 시작
app.listen(3000, () => {
  console.log(`3000포트에서 리스닝`);
});
