const gotoLogin = document.querySelector('.signin .gotologin a');
const gotoSignin = document.querySelector('.login .gotosignin a');
const signin = document.querySelector('.signin');
const login = document.querySelector('.login');
const getVerifyCode = document.querySelector('#get-verifycode');
const emailInput = document.querySelector('#email');
const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
gotoLogin.addEventListener('click', () => {
    signin.classList.add('hidden');
    login.classList.remove('hidden');
})

gotoSignin.addEventListener('click', () => {
    signin.classList.remove('hidden');
    login.classList.add('hidden');
})

getVerifyCode.addEventListener('click', () => {
    const email = emailInput.value.trim();
    emailInput.classList.remove("error1");
    emailInput.classList.remove("error2");
    const errorMessage1 = emailInput.parentNode.querySelector(".error-message1");
    if (errorMessage1) {
        emailInput.parentNode.removeChild(errorMessage1);
    }
    const errorMessage2 = emailInput.parentNode.querySelector(".error-message2");
    if (errorMessage2) {
        emailInput.parentNode.removeChild(errorMessage2);
    }
    if (!email) {
            emailInput.classList.add('error1');
            const errorMessage1 = document.createElement("p");
            errorMessage1.classList.add('error-message1');
            errorMessage1.innerText = "请输入邮箱";
            emailInput.parentNode.insertBefore(errorMessage1, emailInput.nextSibling);
    }
    else if (!emailReg.test(email)) {
            emailInput.classList.add('error2');
            const errorMessage2 = document.createElement("p");
            errorMessage2.classList.add('error-message2');
            errorMessage2.innerText = "请输入正确的邮箱格式";
            emailInput.parentNode.insertBefore(errorMessage2, emailInput.nextSibling);
    }
    else {
        emailInput.classList.remove("error1");
        emailInput.classList.remove("error2");
        const errorMessage1 = emailInput.parentNode.querySelector(".error-message1");
        if (errorMessage1) {
            emailInput.parentNode.removeChild(errorMessage1);
        }
        const errorMessage2 = emailInput.parentNode.querySelector(".error-mssage2");
        if (errorMessage2) {
            emailInput.parentNode.removeChild(errorMessage2);
        }
    }
})