import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'Employee'; // 모델 명 (JS 내부에서 사용하는 이름)

// 컬럼 정의
const attributes = {
  empId: {
    field: 'emp_id', // DB의 컬럼 물리명
    type: DataTypes.BIGINT.UNSIGNED, // 컬럼 데이터 타입 지정 
    primaryKey: true, // PK 지정
    allowNull: false, // NULL 비허용
    autoIncrement: true, // AUTOINCREMENT 지정
    comment: '사원 ID', // 코멘트 설정
  },
  name: {
    field: 'name',
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '사원명',
  },
  birth: {
    field: 'birth',
    type: DataTypes.DATE,
    allowNull: false,
    comment: '사원 생년월일',
    get() {
      const val = this.getDataValue('birth'); 
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD');
    }
  },
  gender: {
    field: 'gender',
    type: DataTypes.CHAR(1),
    allowNull: false,
    comment: '사원 성별'
  },
  hireAt: {
    field: 'hire_at',
    type: DataTypes.DATE,
    allowNull: false,
    comment: '입사일',
    get() {
      const val = this.getDataValue('hireAt'); 
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD');
    }
  },
  fireAt: {
    field: 'fire_at',
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    comment: '퇴직일',
    get() {
      const val = this.getDataValue('fireAt'); 
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD');
    }
  },
  supId: {
    field: 'sup_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    defaultValue: null,
    comment: '사수 번호',
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.NOW,
    allowNull: false,
    comeent: '작성일',
    get() {
      const val = this.getDataValue('createdAt'); 
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    allowNull: false,
    comeent: '수정일',
    get() {
      const val = this.getDataValue('updatedAt'); 
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  deletedAt: {
    field: 'deleted_at',
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: false,
    comeent: '삭제일',
    get() {
      const val = this.getDataValue('deletedAt'); 
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
};

// Options 설정 (테이블 관련 설정)
const Options = {
  tableName: 'employees', // 실제 테이블명 
  timestamps: true, // createdAt, updatedAt 자동 관리
  // 별도로 관리 
  // createdAt: 'empCreatedAt',
  // updatedAt: false,
  paranoid: true, // Soft Delete 설정 (deletedAt 자동 관리), Employee.destroy(1); 업데이트 문 실행
}

// 모델 객체 작성 
const Employee = {
  init: (sequelize) => {
    const defineEmployee = sequelize.define(modelName, attributes, Options);

    return defineEmployee;
  },
};

export default Employee;
