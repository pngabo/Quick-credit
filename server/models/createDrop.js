import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('Connected to the database...');
});

//create tables
const createTables = () => {
    const userTable =`CREATE TABLE IF NOT EXISTS 
    users (
        id SERIAL NOT NULL PRIMARY KEY,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        gender VARCHAR(30) NOT NULL,
        address VARCHAR(128) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phonenumber VARCHAR(12) NOT NULL,
        occupation VARCHAR(50) NOT NULL,
        isAdmin BOOLEAN NOT NULL,
        password VARCHAR(255) NOT NULL,
        status VARCHAR(20) NOT NULL,
        createdOn TIMESTAMP
    )                 
    `;

    const loanTable = `CREATE TABLE IF NOT EXISTS 
    loans (
        loanId SERIAL NOT NULL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        tenor INTEGER NOT NULL,
        amount INTEGER NOT NULL,
        interest INTEGER NOT NULL,
        installment INTEGER NOT NULL,
        balance INTEGER NOT NULL,
        status VARCHAR(255) NOT NULL,
        repaid BOOLEAN NOT NULL,
        createdOn TIMESTAMP,
        FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
    )`;

    const repaymentTable = `CREATE TABLE IF NOT EXISTS 
    repayments (
        id SERIAL NOT NULL PRIMARY KEY,
        loanId INTEGER NOT NULL,
        email VARCHAR(255) NOT NULL,
        paidamount INTEGER NOT NULL,
        amount INTEGER NOT NULL,
        installment INTEGER NOT NULL,
        balance INTEGER NOT NULL,
        createdOn TIMESTAMP,
        FOREIGN KEY (loanId) REFERENCES loans(loanId) ON DELETE CASCADE
    )`;
const queries = `${userTable}; ${loanTable}; ${repaymentTable}`;
    pool.query(queries);
    pool.end();
};

//Drop tables
const dropTables = () => {
    const queryText = `DROP TABLE IF EXISTS 
        users,loans,repayments`;
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

pool.on('remove', () => {
    console.log('Client removed');
    process.exit(0);
});

export default{
    createTables,
    dropTables,
    pool,
}
require('make-runnable');