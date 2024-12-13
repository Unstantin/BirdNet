import { Sequelize } from 'sequelize';

// Создание экземпляра Sequelize
const sequelize = new Sequelize('birdnet', 'postgres', '7l1282', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    port: 5432
  });


export default sequelize