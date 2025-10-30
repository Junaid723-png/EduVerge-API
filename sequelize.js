import Sequelize from 'sequelize';

const sequelize = new Sequelize("EduVerge", 'admin', 'IAMKKO22', {
  host: 'eduverge.cl0g8i8qykzl.eu-north-1.rds.amazonaws.com',
  dialect: 'mysql',
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false
});

export default sequelize;