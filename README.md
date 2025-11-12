# 유효성 체크를 위한 준비
## 설치 
```
npm install express-validator
```

## 유효성 체크 처리 디렉토리 구조

middlewares/
└─ validations/
  ├─ fields/     # 각 요소들의 유효성 체크 처리 로직이 있는 디렉토리
  ├─ validators/ # 필요한 field를 모아서 한기능에서 사용하는 데이터들을 검증하는 로직이 들어가 있는 디렉토리
  └─ validationHandler.js # 유효성 검사 통과 여부에 따른 공통 처리 미들웨어


# DB 연동 
## 설치 
```
npm i mysql2 sequelize sequelize-cli
``` 