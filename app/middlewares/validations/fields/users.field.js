import { body } from "express-validator";

// 아이디 필드
export const account = body('account')
  .trim()
  .notEmpty()
  .withMessage('아이디는 필수 항목입니다.')
  .bail()
  .matches(/^[a-zA-Z0-9]{4,8}$/)
  .withMessage('영어대/소문자, 숫자, 4~8 글자 허용');

// 비밀번호 필드 
export const password = body('password')
  .trim()
  .notEmpty()
  .withMessage('비밀번호는 필수 항목입니다.')
  .bail()
  .matches(/^[a-zA-Z0-9!@]{4,8}$/)
  .withMessage('영어대/소문자, 숫자, 특수문자(!@), 4~8 글자 허용');

// 이름 필드 
export const name = body('name')
  .trim()
  .notEmpty()
  .withMessage('이름은 필수 항목입니다.')
  .bail()
  .matches(/^[가-힣]{2,30}$/)
  .withMessage('한글, 2~30 글자 허용');
