const gotoLogin = document.querySelector('.signin .gotologin a');
const gotoSignin = document.querySelector('.login .gotosignin a');
const signin = document.querySelector('.signin');
const login = document.querySelector('.login');
const getVerifyCode = document.querySelector('#get-verifycode');
const emailInput = document.querySelector('#email');
const signinSubmit = document.querySelector('.signinsubmit');
const verifyCodeInput = document.querySelector('#email-verifycode');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const passwordAgainInput = document.querySelector('#password1');

const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
let countdown = 60;

gotoLogin.addEventListener('click', () => {
    signin.classList.add('hidden');
    login.classList.remove('hidden');
})

gotoSignin.addEventListener('click', () => {
    signin.classList.remove('hidden');
    login.classList.add('hidden');
})

getVerifyCode.addEventListener('click', () => {
    testEmail();
});

signinSubmit.addEventListener('click',(e)=>{
    e.preventDefault();
    testEmail1();
    testVerifyCode();
    testUsername();
    testPassword();
    testPasswordAgain();
})

function testEmail() {
    const email = emailInput.value.trim();
    emailInput.classList.remove("error");
    emailInput.classList.remove("error");
    const errorMessage1 = emailInput.parentNode.querySelector(".error-message1");
    if (errorMessage1) {
        emailInput.parentNode.removeChild(errorMessage1);
    }
    const errorMessage2 = emailInput.parentNode.querySelector(".error-message2");
    if (errorMessage2) {
        emailInput.parentNode.removeChild(errorMessage2);
    }
    if (!email) {
        emailInput.classList.add('error');
        const errorMessage1 = document.createElement("p");
        errorMessage1.classList.add('error-message1');
        errorMessage1.innerText = "请输入邮箱";
        emailInput.parentNode.insertBefore(errorMessage1, emailInput.nextSibling);
    }
    else if (!emailReg.test(email)) {
        emailInput.classList.add('error');
        const errorMessage2 = document.createElement("p");
        errorMessage2.classList.add('error-message2');
        errorMessage2.innerText = "请输入正确的邮箱格式";
        emailInput.parentNode.insertBefore(errorMessage2, emailInput.nextSibling);
    }
    else {
        emailInput.classList.remove("error");
        emailInput.classList.remove("error");
        const errorMessage1 = emailInput.parentNode.querySelector(".error-message1");
        if (errorMessage1) {
            emailInput.parentNode.removeChild(errorMessage1);
        }
        const errorMessage2 = emailInput.parentNode.querySelector(".error-mssage2");
        if (errorMessage2) {
            emailInput.parentNode.removeChild(errorMessage2);
        }
        if (countdown === 60) {
            setTimeout(() => {
                getVerifyCode.classList.add('countdown');
                getVerifyCode.value = '60s'
            }, 0);
            let k = setInterval(() => {
                countdown--;
                getVerifyCode.value = `${countdown}s`
            }, 1000);
            setTimeout(() => {
                getVerifyCode.classList.remove('countdown');
                getVerifyCode.value = '重新获取';
                countdown = 60;
                clearInterval(k);
            }, 60000);
        }
    }
}

function testEmail1(){
    const email = emailInput.value.trim();
    emailInput.classList.remove("error");
    emailInput.classList.remove("error");
    const errorMessage1 = emailInput.parentNode.querySelector(".error-message1");
    if (errorMessage1) {
        emailInput.parentNode.removeChild(errorMessage1);
    }
    const errorMessage2 = emailInput.parentNode.querySelector(".error-message2");
    if (errorMessage2) {
        emailInput.parentNode.removeChild(errorMessage2);
    }
    if (!email) {
        emailInput.classList.add('error');
        const errorMessage1 = document.createElement("p");
        errorMessage1.classList.add('error-message1');
        errorMessage1.innerText = "请输入邮箱";
        emailInput.parentNode.insertBefore(errorMessage1, emailInput.nextSibling);
    }
    else if (!emailReg.test(email)) {
        emailInput.classList.add('error');
        const errorMessage2 = document.createElement("p");
        errorMessage2.classList.add('error-message2');
        errorMessage2.innerText = "请输入正确的邮箱格式";
        emailInput.parentNode.insertBefore(errorMessage2, emailInput.nextSibling);
    }
    else return 1;
}

function testVerifyCode(){
    const verifyCode = verifyCodeInput.value.trim();
    verifyCodeInput.classList.remove("error");
    const errorMessage3 = verifyCodeInput.parentNode.querySelector(".error-message3");
    if(errorMessage3){
        verifyCodeInput.parentNode.removeChild(errorMessage3);
    }
    if(/*verifyCode !== verifyCodeSupplied*/ 1 === 1){
        verifyCodeInput.classList.add('error');
        const errorMessage3 = document.createElement("p");
        errorMessage3.classList.add('error-message3');
        errorMessage3.innerText = "验证码错误";
        verifyCodeInput.parentNode.insertBefore(errorMessage3, getVerifyCode.nextSibling);
    }
    else return 1;
}

function testUsername(){
    const username = usernameInput.value.trim();
    usernameInput.classList.remove('error');
    const errorMessage4 = usernameInput.parentNode.querySelector(".error-message4");
    if(errorMessage4){
        usernameInput.parentNode.removeChild(errorMessage4);
    }
    const errorMessage5 = usernameInput.parentNode.querySelector(".error-message5");
    if(errorMessage5){
        usernameInput.parentNode.removeChild(errorMessage5);
    }
    if(username === ''){
        usernameInput.classList.add('error');
        const errorMessage4 = document.createElement('p');
        errorMessage4.classList.add('error-message4');
        errorMessage4.innerText = "请输入用户名";
        usernameInput.parentNode.insertBefore(errorMessage4, usernameInput.nextSibling);
    }
    else if(/*用户名已存在*/1 === 0){
        usernameInput.classList.add('error');
        const errorMessage5 = document.createElement('p');
        errorMessage5.classList.add('error-message4');
        errorMessage5.innerText = "用户名已存在";
        usernameInput.parentNode.insertBefore(errorMessage5, usernameInput.nextSibling);
    }
    else return 1;
}

function testPassword(){
    const password = passwordInput.value.trim();
    passwordInput.classList.remove('error');
    const errorMessage6 = passwordInput.parentNode.querySelector(".error-message6");
    if(errorMessage6){
        passwordInput.parentNode.removeChild(errorMessage6);
    }
    const errorMessage7 = passwordInput.parentNode.querySelector(".error-message7");
    if(errorMessage7){
        passwordInput.parentNode.removeChild(errorMessage7);
    }
    if(password === ''){
        passwordInput.classList.add('error');
        const errorMessage6 = document.createElement('p');
        errorMessage6.classList.add('error-message6');
        errorMessage6.innerText = "请输入密码";
        passwordInput.parentNode.insertBefore(errorMessage6, passwordInput.nextSibling);
    }
    else if(!passwordReg.test(password)){
        passwordInput.classList.add('error');
        const errorMessage7 = document.createElement('p');
        errorMessage7.classList.add('error-message7');
        errorMessage7.innerText = "密码格式不正确";
        passwordInput.parentNode.insertBefore(errorMessage7, passwordInput.nextSibling);
    }
    else return 1;
}

function testPasswordAgain(){
    const passwordAgain = passwordAgainInput.value.trim();
    const password = passwordInput.value.trim();
    passwordAgainInput.classList.remove('error');
    const errorMessage8 = passwordAgainInput.parentNode.querySelector(".error-message8");
    if(errorMessage8){
        passwordAgainInput.parentNode.removeChild(errorMessage8);
    }
    if(password !== passwordAgain){
        passwordAgainInput.classList.add('error');
        const errorMessage8 = document.createElement('p');
        errorMessage8.classList.add('error-message8');
        errorMessage8.innerText = "密码不一致";
        passwordAgainInput.parentNode.insertBefore(errorMessage8, passwordAgainInput.nextSibling);
    }
    else return 1;
}