const header = `
<div class="logo">
                <a href="index.html"><img src="../images/logoquick.png"></a>
            </div>
            <div class="navbar">
                <ul>
                    <li><a href="#">Dashboard</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="index.html">Logout</a></li>
                </ul>
            </div>
`;
const sidebar=`
<ul>
                    <li><a href="users.html">Users</a></li>
                    <li><a href="applications.html">Loan applications</a></li>
                    <li><a href="currentLoans.html">Current Loans</a></li>
                    <li><a href="repaid.html">Repaid Loans</a></li>
                    <li><a href="postLoan.html">Post Loan Repayment</a></li>
                </ul>
`;
try {
    const headerNav = document.querySelector(".header");
    headerNav.innerHTML = header;
  } catch (error) {
    console.log("no .header found");
    console.log(error);
  }
  try {
    const sideNav = document.querySelector(".sidebar");
    sideNav.innerHTML = sidebar;
  } catch (error) {
    console.log("no .sidebar found");
    console.log(error);
  }