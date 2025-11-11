import express from 'express';
import { eduUsersTest } from '../app/middlewares/edu/edu.middleware.js';

const usersRouter = express.Router();

usersRouter.get('/', eduUsersTest, (request, response, next) => {
  response.status(200).send(`전체 유저 정보 조회 완료`);
});

usersRouter.get('/:id',(request, response, next) => {
  response.status(200).send(`유저 정보 조회 완료`);
});

usersRouter.put('/:id',(request, response, next) => {
  response.status(200).send(`유저 정보 수정 완료`);
});

export default usersRouter;