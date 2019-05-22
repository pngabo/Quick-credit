import pool from './connectdb';
import moment from 'moment';
import queries from './queries';

class Loans {
    async applyForLoan(loan) {
        this.interest = 0.05 * parseInt(loan.amount, 10);
        this.installment = (parseInt(loan.amount, 10) + parseInt(this.interest, 10)) / parseInt(loan.tenor, 10);
        this.balance = parseInt(loan.amount, 10);
        this.status = 'pending';
        this.repaid = false;
        this.createdOn = moment(new Date());
        this.newLoan = [
            loan.email,
            loan.tenor,
            loan.amount,
            this.interest,
            this.installment,
            this.balance,
            this.status,
            this.repaid,
            this.createdOn,
        ];
        this.res = await pool.query(queries.createLoanApplication, this.newLoan);
        return [this.res.rows[0]];
    }
    async getAllLoans() {
        this.res = await pool.query(queries.getAllLoanApplications);
        return this.res.rows;
    }
    async getOneLoan(id) {
        this.loan = [];
        this.res = await pool.query(queries.getSpecificLoan, [id]);
        if (this.res.rowCount === 1) {
            this.loan.push(this.res.rows[0]);
        }
        return this.loan;
    }
    async checkLoan(email) {
        this.loan = [];
        const res = await pool.query(queries.checkIfApplicationExist, [email]);
        if (res.rowCount > 0) {
            this.loan.push(res.rows[0]);
        }
        return this.loan;
    }
    async updateLoan(id, status) {
        this.res = await pool.query(queries.approveLoanApplication, [id, status]);
        return [this.res.rows[0]];
    }
    async updateLoanBalance(id, data, loans) {
        const newBalance = data.balance || loans[0].balance;
        this.newId = id;
        this.newData = [
            newBalance,
            this.newId,
        ];
        this.res = await pool.query(queries.updateBalance, this.newData);
        return [this.res.rows[0]];
    }
}
export default new Loans();
