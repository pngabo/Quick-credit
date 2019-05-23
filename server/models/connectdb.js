
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_LOCAL,
});
pool.on('connect', () => {
  console.log('connected to the Database');
});
export default pool;
