
import { Sequelize  } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASS,
    {
        host:process.env.DATABASE_HOST,
        dialect:process.env.DATABASE_DIALECT,
        logging: false
    }
)

export default sequelize;