import express from 'express';
// import pool from'../db/my-db.js';
import db from '../app/models/index.js';
const {sequelize, Employee} = db;

const usersRouter = express.Router();

usersRouter.get('/', (request, response, next) => {
  response.status(200).send(`전체 유저 정보 조회 완료`);
});

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const id = parseInt(request.params.id);
    // -----------------------
    // Sequelize로 DB연동
    // -----------------------
    const result = await Employee.findByPk(id);
    console.log(result);
    return response.status(200).send(result);

    // ---------------------------
    // mysql2로 DB연동
    // -------------------------
    // 쿼리 작성 
    // // Prepared Statement
    // const sql = `
    //   SELECT *
    //   FROM employees
    //   WHERE 
    //     emp_id = ?
    // `;
    // const [result] = await pool.execute(sql, [id]);

  //   return response.status(200).send(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.put('/:id',(request, response, next) => {
  response.status(200).send(`유저 정보 수정 완료`);
});

export default usersRouter;