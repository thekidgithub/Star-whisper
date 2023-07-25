const gotoLogin = document.querySelector('.signin .gotologin a');
const gotoSignin = document.querySelector('.login .gotosignin a');
const signin = document.querySelector('.signin');
const login = document.querySelector('.login');
const getVerifyCode = document.querySelector('#get-verifycode');
const emailInput = document.querySelector('#email');
const signinSubmit = document.querySelector('.signinsubmit');
const verifyCodeInput1 = document.querySelector(".email-verifycode")
const verifyCodeInput = document.querySelector('#email-verifycode');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const passwordAgainInput = document.querySelector('#password1');
const emailInput1 = document.querySelector("#email1");
const passwordInput1 = document.querySelector('#password2');
const loginSubmit = document.querySelector('.loginsubmit');
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
    const email = emailInput.value.trim();
    const verifyCode = verifyCodeInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    testPassword();
    testPasswordAgain();
    testEmail1();
    testUsername();
    if(testPassword()&&testPasswordAgain()&&testEmail1()&&testUsername()){
     /*   $.ajax({
            method:"POST",
            url:"8.140.204.13:7700/u/register",
            dataType:"json",
            data:{
                email:email,
                verifyCode:verifyCode,
                username:username,
                password:password,
            },
            headers: {
                "Content-Type": "application/json",
            },
            success:function(result){
                const res = JSON.parse(result);
                if(res.success){
                    alert("注册成功！");
                }
                else{
                    if(res.error.includes('verifycode')) verifyCodeError();
                    if(res.error.includes('email')) emailError();
                    if(res.error.includes('username')) usernameError();
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })*/
        $.post("60.204.203.164:7700/u/register", JSON.stringify({
            email: email,
            verifyCode: verifyCode,
            username: username,
            password: password,
          }), function (res) {
            if (res.success) {
              alert("注册成功！");
            } else {
              if (res.error.includes("verifycode")) verifyCodeError();
              if (res.error.includes("email")) emailError();
              if (res.error.includes("username")) usernameError();
            }
          }, "json");
    }
})

loginSubmit.addEventListener('click',(e)=>{
    const email = emailInput1.value.trim();
    const password = passwordInput1.value.trim();
    testEmail2();
    testPassword1();
    if(testEmail2()&&testPassword1()){
     /*   $.ajax({
            method:"POST",
            url:"8.140.204.13:7700/u/login",
            dataType:"json",
            data:{
                email:email,
                password:password,
            },
            headers: {
                "Content-Type": "application/json",
            },
            success:function(result){
                const res = JSON.parse(result);
                if(res.success){
                    alert("登录成功！");
                }
                else{
                    if(res.error.includes('email')) emailError1();
                    if(res.error.includes('password')) passwordError();
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })*/
        $.post("60.204.203.164:7700/u/login", JSON.stringify({
            email: email,
            password: password,
          }), function (res) {
            if (res.success) {
              alert("登录成功！");
            } else {
              if (res.error.includes("email")) emailError1();
              if (res.error.includes("password")) passwordError();
            }
          }, "json");
    }
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
     /*   $.ajax({
            method : "POST",
            url : "8.140.204.13:7700/u/send_code",
            dataType : "json",
            data : {
                email:email,
            },
            headers: {
                "Content-Type": "application/json",
            },
            success : function(result){
                const res = JSON.parse(result);
                if(res.success){
                    alert(res.data);
                }
                else{
                    console.log(res.error);
                }
            },
            error : function(msg){
                console.log(msg);
            }
        });*/
        $.post("60.204.203.164:7700/u/send_code", JSON.stringify({
            email: email,
          }), function (res) {
            if (res.success) {
              alert(res.data);
            } else {
              console.log(res.error);
            }
          }, "json");
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

function emailError(){
    emailInput.classList.remove("error");
    const error13 = emailInput.parentNode.querySelector(".error-message13");
    if (error13) {
        emailInput.parentNode.removeChild(error13);
    }
    emailInput.classList.add('error');
    const errorMessage13 = document.createElement("p");
    errorMessage13.classList.add('error-message13');
    errorMessage13.innerText = "邮箱已存在";
    emailInput.parentNode.insertBefore(errorMessage13, emailInput.nextSibling);
}

function testVerifyCode(){
    const verifyCode = verifyCodeInput.value.trim();
    verifyCodeInput.classList.remove("error");
    const errorMessage3 = verifyCodeInput.parentNode.parentNode.querySelector(".error-message3");
    if(errorMessage3){
        verifyCodeInput.parentNode.parentNode.removeChild(errorMessage3);
    }
    if(verifyCode === ''){
        verifyCodeInput.classList.add('error');
        const errorMessage3 = document.createElement("p");
        errorMessage3.classList.add('error-message3');
        errorMessage3.innerText = "请输入验证码";
        emailInput.parentNode.insertBefore(errorMessage3, verifyCodeInput1.nextSibling);
    }
    else return 1;
}

function verifyCodeError(){
    verifyCodeInput.classList.remove("error");
    const error14 = verifyCodeInput.parentNode.parentNode.querySelector(".error-message14");
    if(errorMessage14){
        verifyCodeInput.parentNode.parentNode.removeChild(errorMessage14);
    }
    verifyCodeInput.classList.add('error');
    const errorMessage14 = document.createElement("p");
    errorMessage14.classList.add('error-message14');
    errorMessage14.innerText = "验证码错误";
    emailInput.parentNode.insertBefore(errorMessage14, verifyCodeInput1.nextSibling);
}

function testUsername(){
    const username = usernameInput.value.trim();
    usernameInput.classList.remove('error');
    const errorMessage4 = usernameInput.parentNode.querySelector(".error-message4");
    if(errorMessage4){
        usernameInput.parentNode.removeChild(errorMessage4);
    }
    
    if(username === ''){
        usernameInput.classList.add('error');
        const errorMessage4 = document.createElement('p');
        errorMessage4.classList.add('error-message4');
        errorMessage4.innerText = "请输入用户名";
        usernameInput.parentNode.insertBefore(errorMessage4, usernameInput.nextSibling);
    }
    else return 1;
}

function usernameError(){
    usernameInput.classList.remove('error');
    const error5 = usernameInput.parentNode.querySelector(".error-message5");
    if(error5){
        usernameInput.parentNode.removeChild(error5);
    }
    usernameInput.classList.add('error');
    const errorMessage5 = document.createElement('p');
    errorMessage5.classList.add('error-message5');
    errorMessage5.innerText = "用户名已存在";
    usernameInput.parentNode.insertBefore(errorMessage5, usernameInput.nextSibling);
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

function testEmail2(){
    const email = emailInput1.value.trim();
    emailInput1.classList.remove("error");
    const errorMessage9 = emailInput1.parentNode.querySelector(".error-message9");
    if (errorMessage9) {
        emailInput1.parentNode.removeChild(errorMessage9);
    }
    const errorMessage10 = emailInput1.parentNode.querySelector(".error-message10");
    if (errorMessage10) {
        emailInput1.parentNode.removeChild(errorMessage10);
    }
    if (!email) {
        emailInput1.classList.add('error');
        const errorMessage9 = document.createElement("p");
        errorMessage9.classList.add('error-message9');
        errorMessage9.innerText = "请输入邮箱";
        emailInput1.parentNode.insertBefore(errorMessage9, emailInput1.nextSibling);
    }
    else return 1;
}

function emailError1(){
    emailInput1.classList.remove("error");
    const error10 = emailInput1.parentNode.querySelector(".error-message10");
    if (error10) {
        emailInput1.parentNode.removeChild(error10);
    }
    emailInput1.classList.add('error');
    const errorMessage10 = document.createElement("p");
    errorMessage10.classList.add('error-message10');
    errorMessage10.innerText = "邮箱用户不存在";
    emailInput1.parentNode.insertBefore(errorMessage10, emailInput1.nextSibling);
}

function testPassword1(){
    const password = passwordInput1.value.trim();
    passwordInput1.classList.remove('error');
    const errorMessage11 = passwordInput1.parentNode.querySelector(".error-message11");
    if(errorMessage11){
        passwordInput1.parentNode.removeChild(errorMessage11);
    }
    const errorMessage12 = passwordInput1.parentNode.querySelector(".error-message12");
    if(errorMessage12){
        passwordInput1.parentNode.removeChild(errorMessage12);
    }
    if(password === ''){
        passwordInput1.classList.add('error');
        const errorMessage11 = document.createElement('p');
        errorMessage11.classList.add('error-message11');
        errorMessage11.innerText = "请输入密码";
        passwordInput1.parentNode.insertBefore(errorMessage11, passwordInput1.nextSibling);
    }
    else return 1;
}

function passwordError(){
    passwordInput1.classList.remove('error');
    const error12 = passwordInput1.parentNode.querySelector(".error-message12");
    if(error12){
        passwordInput1.parentNode.removeChild(error12);
    }
    passwordInput1.classList.add('error');
    const errorMessage12 = document.createElement('p');
    errorMessage12.classList.add('error-message12');
    errorMessage12.innerText = "密码错误";
    passwordInput1.parentNode.insertBefore(errorMessage12, passwordInput1.nextSibling);
}