export const eduTest = (request, response, next) => {
  console.log('eduTest 미들웨어 실행');
  next(); // 다음 미들웨어 또는 처리로 진행
}

export const eduUsersTest = (request, response, next) => {
  console.log('eduUsersTest 미들웨어 실행');
  next(); // 다음 미들웨어 또는 처리로 진행
}