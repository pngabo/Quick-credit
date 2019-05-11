import loanDb from '../../models/loanDb';

class AllLoansController {
    getLoans(req, res) {
        if (loanDb.length >= 1) {
            return res.status(200).json({
                status: 200,
                message: "Loans retrieved successfully",
                Loans: loanDb,
            });
        } else
            return res.status(404).json({
                status: 404,
                error: "No loans found",
            });
    }
}
const loans = new AllLoansController();
export default loans;