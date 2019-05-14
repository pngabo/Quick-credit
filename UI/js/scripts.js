//
let username = document.forms['login-form']['username'];
let password = document.forms['login-form']['password'];

let uname_error = document.getElementById('uname-error');
let pswd_error = document.getElementById('pswd-error');

//Event listeners
username.addEventListener('blur', nameVerify, true);
password.addEventListener('blur', passwordVerify, true);

//Validation function
function validateForm() {
    if (username.value == null || username.value == "") {
        username.style.border="1px solid red";
        uname_error.textContent = 'Username is required';
        uname_error.style.color = 'red';
        username.focus();
        return false;
    } else if (password.value == null || password.value == "") {
        password.style.border="1px solid red";
        pswd_error.textContent = 'Password is required';
        pswd_error.style.color = 'red';
        password.focus();
        return false;
    }
}
//event handler functions
function nameVerify(){
    if(username.value!=""){
        username.style.border='1px solid red';
        uname_error.innerHTML='';
        return true;
    }
}
function passwordVerify(){
    if(password.value!=""){
        password.style.border='1px solid red';
        pswd_error.innerHTML='';
        return true;
    }
}