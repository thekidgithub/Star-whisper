let screenW = document.documentElement.clientWidth;
let screenH = document.documentElement.clientHeight;
/*const starContainer = document.querySelector('.star-container');
let containerStyle = window.getComputedStyle(starContainer);*/
const myProfile = document.querySelector('.settings .profile');
const appDes = document.querySelector('.app-des');
const post = document.querySelector('.post');
for (let i = 0; i < 10; i++) {
    let star = document.createElement('span');
    let x = parseInt(Math.random() * parseInt(screenW));
    let y = parseInt(Math.random() * parseInt(screenH));
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    star.style.zIndex = '1';
    star.style.transform = `rotate(${Math.random() * 360}deg) scale(${Math.random() + 0.5})`
    star.classList.add('star');
    console.log(Math.floor(Math.random() * 3) + 1);
    star.style.backgroundImage = `url(../images/star${Math.floor(Math.random() * 4) + 1}.svg)`
    document.body.appendChild(star);
}

myProfile.addEventListener('click', () => {
    appDes.classList.toggle('show');
})

const editModel = document.querySelector('.edit-model');
const closeEditModel = document.querySelector('.edit-model .close');
const sendTextarea = document.querySelector('.edit-model textarea');
const cancelEditModel = document.querySelector('.edit-model .cancel');
const lengthEditModel = document.querySelector('.edit-model .count');
const sendEditModel = document.querySelector('.edit-model .send');
const tagsUl = document.querySelector('.edit-model .tag-to-choose');
const tags = document.querySelector('.edit-model .tag-container')
let tagSeleted1 = [];
let tagToChoose1 = ['1', '2', '3', '4'];
post.addEventListener('click', () => {
    const len = sendTextarea.value.length;
    lengthEditModel.innerHTML = `${len}/150`;
    editModel.classList.add('show');
    editModel.classList.remove('hidden');
    document.body.classList.add('show');
    sendTextarea.focus();
})

closeEditModel.addEventListener('click', () => {
    editModel.classList.add('hidden');
    editModel.classList.remove('show');
    document.body.classList.remove('show');
})

cancelEditModel.addEventListener('click', () => {
    editModel.classList.add('hidden');
    editModel.classList.remove('show');
    document.body.classList.remove('show');
})

sendTextarea.addEventListener('change', (e) => {
    const len = sendTextarea.value.length;
    lengthEditModel.innerHTML = `${len}/150`;
})

tagsUl.addEventListener('click', (e) => {
    if (e.target.classList.contains('tag')) {
        const tagToChoose = document.querySelectorAll('.edit-model .tag-to-choose li');
        const i = Array.from(tagToChoose).indexOf(e.target);
        tagToChoose1.splice(i, 1);
        tagSeleted1.push(e.target.innerHTML);
        updTag();
    }
})

tags.addEventListener('click', (e) => {
    if (e.target.classList.contains('close')) {
        const tagsNow = document.querySelectorAll('.edit-model .tag-container li');
        const i = Array.from(tagsNow).indexOf(e.target.closest('li'));
        tagSeleted1.splice(i, 1);
        tagToChoose1.push(e.target.closest('li').innerHTML.slice(2, 3));
        updTag1();
    }
})

function updTag() {
    tagsUl.innerHTML = '';
    tagToChoose1.forEach((e, i) => {
        const tag = document.createElement('li');
        tag.innerHTML = e;
        tag.classList.add('tag');
        tagsUl.appendChild(tag);
    })
    tags.innerHTML = '';
    tagSeleted1.forEach((e, i) => {
        const tag = document.createElement('li');
        const close = document.createElement('span');
        close.innerHTML = '✕';
        close.classList.add('close');
        tag.innerHTML = `# ${e}`;
        tag.appendChild(close);
        tag.classList.add('tag1');
        tags.appendChild(tag);
    })
}

function updTag1() {
    tagsUl.innerHTML = '';
    tagToChoose1.forEach((e, i) => {
        const tag = document.createElement('li');
        tag.innerHTML = e;
        tag.classList.add('tag');
        tagsUl.appendChild(tag);
    })
    tags.innerHTML = '';
    tagSeleted1.forEach((e, i) => {
        const tag = document.createElement('li');
        const close = document.createElement('span');
        close.innerHTML = '✕';
        close.classList.add('close');
        tag.innerHTML = `# ${e}`;
        tag.appendChild(close);
        tag.classList.add('tag1');
        tags.appendChild(tag);
    })
}

sendEditModel.addEventListener('click', () => {
    const content = sendTextarea.value;
    sendTextarea.value = '';
    const tagsSend = tagSeleted1;
    tagSeleted1 = [];
    tagToChoose1 = ['1', '2', '3', '4'];
    updTag();
    updTag1();
    alert(localStorage.getItem('author'));
    $.ajax({
        method: 'POST',
        url: 'http://60.204.203.164:7700/p',
        dataType: 'json',
        data: JSON.stringify({
            content: content,
            tags: tagsSend,
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('author'),
        },
        success: function (result) {
            if (result.success) {
                alert("发布成功");
            }
        },
        error: function (msg) {
            console.log(msg);
        }
    });
    editModel.classList.add('hidden');
    editModel.classList.remove('show');
    document.body.classList.remove('show');
})


document.body.addEventListener('click',(e)=>{
    if(e.target.classList.contains('star')){
        
    }
})


