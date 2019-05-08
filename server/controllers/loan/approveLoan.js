import loandb from '../../modules/loanDb';

class ApproveLoan{
    approve(req, res) {
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
const approveLoan = new ApproveLoan();
export default approveLoan;