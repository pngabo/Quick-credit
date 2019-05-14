const sidebar = `
    <div class="sidebar">
    <div class="logo">
    <a href="#"><img src="./images/logo.png" alt="logo"></a>
    </div>
    <div class="side-menu">
        <ul>
            <li><a href="#"><i class="fa fa-dashboard"></i>Dashboard</a></li>
            <li><a href="#"><i class="fa fa-users"></i>Verify Loans</a></li>
            <li><a href="#"><i class="fa fa-money"></i>Loan applications</a></li>
            <li><a href="#"><i class="fa fa-book" aria-hidden="true"></i>Current loans</a></li>
            <li><a href="#"><i></i>Repaid Loans</a></li>
        </ul>
    </div>
</div>
    `;
const header = `
<div class="header">
<div class="toggle-btn" onclick="toggleSidebar()">
<span></span>
<span></span>
<span></span>
</div>
            <div class="nav-menu">
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Logout</a></li>
                    </ul>
                </nav>
            </div>
        </div>
`;
const footer = `
<div class="footer">
    <div class="footer-menu">Footer</div>
</div>
`;

try {
  const sideNav = document.querySelector(".sidebar");
  sideNav.innerHTML = sidebar;
} catch (error) {
  console.log("no .sidebar found");
  console.log(error);
}
try {
  const headerNav = document.querySelector(".header");
  headerNav.innerHTML = header;
} catch (error) {
  console.log("no .header found");
  console.log(error);
}
try {
  const footerDiv = document.querySelector(".footer");
  footerDiv.innerHTML = footer;
} catch (error) {
  console.log("no .footer found");
  console.log(error);
}


function toggleSidebar(){
    document.getElementById("sidebar").classList.toggle("active");
}