import pool from './connectdb';
import queries from './queries';

class RepaymentModel {
  static async getRepayment(loanId) {
    this.res = await pool.query(queries.getLoanRepayment, [loanId]);
        return this.res;
  }
}
export default RepaymentModel;