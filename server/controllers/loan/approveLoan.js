import loandb from '../../models/loanDb';
import validation from '../../helpers/validation';
class ApproveLoan{
   static approve(req, res) {
      const { error } = validation.validateLoanStatus(req.body);
      if (error) return res.status(400).json(error.details[0].message);
        const { id } = req.params;
        const data = loandb.find(loan => loan.id === parseInt(id, 10));
        if (data) {
          data.status = req.body.status;
          const newData = {
            loanId: data.id,
            loanAmount: data.amount,
            tenor: data.tenor,
            monthlyInstallments: data.paymentInstallment,
            status: data.status,
            interest: data.interest,
          };
          return res.status(200).send({
            status: 200,
            data: [newData],
          });
        }
        return res.status(404).send({
          status: 404,
          error: 'No Loan with that id exist on database',
        });
      }
}
export default ApproveLoan;