import pool from './connectdb';
import queries from './queries';

class RepaymentModel {
  static async getRepayment(loanId) {
    this.repayment = [];
    this.res = await pool.query(queries.getLoanRepayment, [loanId]);
    if (this.res.rowCount === 1) {
      this.repayment.push(this.res.rows[0]);
    }
    return this.repayment;
  }
}
export default RepaymentModel;