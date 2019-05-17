import loans from '../../models/loanDb';

class LoanController {
static getCurrentLoans(req, res) {
    if (Object.keys(req.query).length === 0) {
      return res.status(200).json({
        message: 'ALL CLIENT LOANS',
        status: 200,
        data: loans,
      });
    }
    const repaidLoans = loans.filter(loan => loan.status === req.query.status && loan.repaid.toString() === req.query.repaid);
    if (req.query.status === 'approved' && req.query.repaid === 'true') {
      return res.status(200).json({
        status: 200,
        data: repaidLoans,
        message: 'All fully repaid loans',
      });
    }
    const unrepaidLoans = loans.filter(loan => loan.status === req.query.status && loan.repaid.toString() === req.query.repaid);
    if (req.query.status === 'approved' && req.query.repaid === 'false') {
      return res.status(200).json({
        status: 200,
        data: unrepaidLoans,
        message: 'ALL CURRENT LOANS',
      });
    }
  }
}
export default LoanController;