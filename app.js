import express from 'express'; // express 모듈 가져오기

const app = express();

// 클라이언트가 '/' 경로로 GET 요청을 보낼 때 실행되는 Router
app.get('/', (request, response, next) => {
  response.status(200).send('안녕 익스프레스!');
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

// 서버를 주어진 포트에서 시작
app.listen(3000, () => {
  console.log(`3000포트에서 리스닝`);
});
