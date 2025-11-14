import dayjs from "dayjs";
import { DataTypes } from "sequelize";

// 모델명
const modelName = 'Title';

// 컬럼정의
const attributes = {
  titleCode: {
    field: 'title_code',
    type: DataTypes.CHAR(4),
    primaryKey: true,
    allowNull: false,
    comment: '직급 코드',
  },
  title: {
    field: 'title',
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '직급명'
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
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
    defaultValue: null,
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

// 옵션 설정 
const options = {
  tableName: 'titles',
  typestamps: true,
  paranoid: true,       // Soft Delete 하기 위해서 
}

// 모델 객체 설정 
const Title = {
  init: (sequelize) => {
    const defineTitle = sequelize.define(modelName, attributes, options);

    return defineTitle;
  },
  associate: (db) => {
    // 1:n 관계에서 부모 모델에 설정하는 방법 (하나의 직급은 복수의 사원 직급 정보를 가진다)
    db.Title.hasMany(db.TitleEmp, { sourceKey: 'titleCode', foreignKey: 'titleCode', as: 'titleEmps'});
  }
}

export default Title;