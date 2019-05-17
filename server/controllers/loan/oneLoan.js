import loanDb from '../../models/loanDb';
class OneLoanController{
    getLoan(req, res) {
        const id = parseInt(req.params.id, 10);
        loanDb.map(loan => {
            if (loan.id === id) {
                return res.status(200).send({
                    status: "200",
                    message: "loan retrieved successfully",
                    data: loan,
                });
            }  return res.status(404).send({
                status: "404",
                error: "Loan does not exist"
            });            
        });
          
    
    }
}
const oneloan = new OneLoanController();
export default oneloan;