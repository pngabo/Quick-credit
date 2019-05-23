// USER QUERIES
const getAllUsersQuery = `SELECT * FROM users`;
const checkIfUserExist = 'SELECT * FROM users WHERE email = $1';
const getUserById = 'SELECT * FROM users WHERE id = $1';
const verifyUser = 'UPDATE users SET status = $2 WHERE email = $1 RETURNING *';
const deleteUser = 'DELETE FROM users WHERE id = $1';
const userLogin = `SELECT * FROM users WHERE email= $1`;
const resetPassword = `UPDATE users SET password = $2 WHERE email=$1`;
const createUserAccount = `INSERT INTO users (firstname, lastname, gender, address, email, phonenumber, occupation,isAdmin, password, status, createdOn)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11)
                        RETURNING *`;

// LOAN QUERIES
const createLoanApplication = `INSERT INTO loans (email, tenor, amount, installment, interest, balance, status,repaid, createdOn)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING loanId, email, tenor, amount, installment, interest, balance, status, repaid, createdOn`;
const approveLoanApplication = `UPDATE loans SET status = $2 WHERE loanId = $1 RETURNING *`;
const updateBalance = `UPDATE loans SET balance = $2 WHERE loanId = $1 RETURNING *`;
const updateStatus = `UPDATE loans SET repaid = $2 WHERE loanId = $1 RETURNING *`;
const getCurrentLoans = `SELECT * FROM loans where status = $1 AND repaid = $2`;
const getRepaidLoans = `SELECT * FROM loans where status = $1 AND repaid = $2`;
const getAllLoanApplications = `SELECT * FROM loans`;
const getSpecificLoan = `SELECT * FROM loans WHERE loanId = $1`;
const checkIfApplicationExist = `SELECT * FROM loans WHERE email = $1 AND repaid = false`;



// REPAYMENT QUERIES
const createRepayment = `INSERT INTO repayments (loanId, email, paidamount, installment, amount, balance, createdOn)
VALUES ($1, $2, $3,$4,$5,$6,$7)
RETURNING id, loanId, email, paidamount, installment, amount, balance, createdOn`;
const getLoanRepayment = `SELECT * FROM repayments WHERE loanId = $1`;

// DROP TABLES
const dropTables = `DROP TABLE IF EXISTS 
                      users, loans, repayments`;

export default {
    // USER
    createUserAccount,
    userLogin,
    resetPassword,
    verifyUser,
    getUserById,
    getAllUsersQuery,
    checkIfUserExist,
    deleteUser,
    
    // LOAN
    createLoanApplication,
    approveLoanApplication,
    getCurrentLoans,
    getRepaidLoans,
    getSpecificLoan,
    getAllLoanApplications,
    checkIfApplicationExist,
    updateBalance,
    updateStatus,

    // LOAN REPAYMENT
    createRepayment,
    getLoanRepayment,

    // DROP TABLES
    dropTables,
};