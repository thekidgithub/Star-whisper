let screenW = document.documentElement.clientWidth;
let screenH = document.documentElement.clientHeight;
const myTags = [];
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
    // star.style.backgroundImage = `url(../images/star${Math.floor(Math.random() * 4) + 1}.svg)`
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
let tagSeleted1 = [];
let tagToChoose1 = ['记录思考', '倾诉烦恼', '分享趣事', '找寻另一个自己', '悄悄话', '感情里的那些事'];
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

const tags = document.querySelectorAll('.edit-model li')
tagsUl.addEventListener('click', (event) => {
    if (event.target.classList.contains('tag')) {
        tags.forEach((e) => {
            e.classList.remove('seleted');
        })
        event.target.classList.add('seleted');
    }
})

sendEditModel.addEventListener('click', () => {
    tags.forEach((e, i) => {
        if (e.classList.contains('seleted')) {
            tagSeleted1.push(tagToChoose1[i]);
        }
    })
    if (sendTextarea.value.length > 0 && tagSeleted1.length > 0) {
        const content = sendTextarea.value;
        sendTextarea.value = '';
        $.ajax({
            method: 'POST',
            url: 'http://60.204.203.164:7700/p',
            dataType: 'json',
            data: JSON.stringify({
                content: content,
                tags: tagSeleted1,
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('author'),
            },
            success: function (result) {
                if (result.success) {
                    alert("发布成功");
                    console.log(result);
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        });
        tagSeleted1 = [];
        tagToChoose1 = ['记录思考', '倾诉烦恼', '分享趣事', '找寻另一个自己', '悄悄话', '感情里的那些事'];
        tags.forEach((e) => {
            e.classList.remove('seleted');
        })
        editModel.classList.add('hidden');
        editModel.classList.remove('show');
        document.body.classList.remove('show');
    }

})
const getModel = document.querySelector('.get-model');
const closeGetModel = document.querySelector('.get-model .close');
const cancelGetModel = document.querySelector('.get-model .cancel');
const userNameGet = document.querySelector('.get-model .username');
const contentGet = document.querySelector('.get-model textarea');
const tagsGet = document.querySelector('.get-model .tag-container');
const commentTextarea = document.querySelector('.get-model .comment1');
const lenComment = document.querySelector('.get-model .count');
const sendGetModel = document.querySelector('.get-model .send');
const UlGetModel = document.querySelector('.get-model .comments');
const commNums = document.querySelector('.get-model .total-comments');
let starId, user1Id, user2Id;
document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('star')) {
        $.ajax({
            method: 'POST',
            url: 'http://60.204.203.164:7700/randp',
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify({
                tags: [],
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('author'),
            },
            success: function (result) {
                if (result.success) {
                    // console.log(result);
                    userNameGet.innerHTML = result.data.username;
                    contentGet.innerHTML = result.data.content;
                    tagsGet.innerHTML = '';
                    result.data.tags.forEach((e, i) => {
                        const tag = document.createElement('div');
                        tag.classList.add('tag1');
                        tag.innerHTML = `# ${e}`;
                        tagsGet.appendChild(tag);
                    })
                    starId = result.data.id;
                    user1Id = result.data.user_id;
                    $.ajax({
                        method: "GET",
                        url: `http://60.204.203.164:7700/chatnum?post=${starId}&user1=${user1Id}&user2=${Number(localStorage.getItem('id'))}`,
                        dataType: "json",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": localStorage.getItem('author'),
                        },
                        success: function (result) {
                            commNums.innerHTML = `回复(${result.data})`;
                            $.ajax({
                                method: 'GET',
                                url: `http://60.204.203.164:7700/chat?post=${starId}&user1=${user1Id}&user2=${Number(localStorage.getItem('id'))}`,
                                dataType: 'json',
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": localStorage.getItem('author'),
                                },
                                success: function (res) {
                                    
                                    for(let i=0;i<result.data;i++){
                                        UlGetModel.firstChild.remove();
                                    }
                                    for (let i = 0; i < result.data; i++) {
                                        const comment = document.createElement('li');
                                        comment.classList.add('comment');
                                        const info = document.createElement('div');
                                        const profile = document.createElement('div');
                                        const username = document.createElement('div');
                                        info.classList.add('info');
                                        profile.classList.add('profile');
                                        username.classList.add('username');
                                        const textarea = document.createElement('textarea');
                                        textarea.readOnly = true;
                                        console.log(res.data[i]);
                                        textarea.innerHTML = res.data[i].content;
                                        username.innerHTML = res.data[i].send_name;
                                        comment.appendChild(textarea);
                                        info.appendChild(profile);
                                        info.appendChild(username);
                                        comment.appendChild(info);
                                        UlGetModel.insertBefore(comment, UlGetModel.firstChild);
                                    }
                                },
                                error: function (msg) {
                                    console.log(msg);
                                },
                            })

                        }
                    });
                }
            },
            error: function (msg) {
                console.log(msg);
            },
        })
        getModel.classList.remove('hidden');
        getModel.classList.add('show');
        document.body.classList.add('show');
    }
})

closeGetModel.addEventListener('click', () => {
    getModel.classList.add('hidden');
    getModel.classList.remove('show');
    document.body.classList.remove('show');
})

cancelGetModel.addEventListener('click', () => {
    getModel.classList.add('hidden');
    getModel.classList.remove('show');
    document.body.classList.remove('show');
})

commentTextarea.addEventListener('keyup', (e) => {
    const len = commentTextarea.value.length;
    lenComment.innerHTML = `${len}/150`;
})

sendGetModel.addEventListener('click', () => {
    const comment = commentTextarea.value;
    // console.log(starId,user1Id,localStorage.getItem('id'));
    $.ajax({
        method: 'POST',
        url: `http://60.204.203.164:7700/chat?post=${starId}&user1=${user1Id}&user2=${Number(localStorage.getItem('id'))}`,
        dataType: 'json',
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('author'),
        },
        data: JSON.stringify({
            content: comment,
        }),
        success: function (result) {
            const comment = document.createElement('li');
            comment.classList.add('comment');
            const info = document.createElement('div');
            const profile = document.createElement('div');
            const username = document.createElement('div');
            info.classList.add('info');
            profile.classList.add('profile');
            username.classList.add('username');
            const textarea = document.createElement('textarea');
            textarea.readOnly = true;
            textarea.innerHTML = result.data.content;
            username.innerHTML = result.data.send_name;
            comment.appendChild(textarea);
            info.appendChild(profile);
            info.appendChild(username);
            comment.appendChild(info);
            UlGetModel.insertBefore(comment, UlGetModel.firstChild);
            $.ajax({
                method: "GET",
                url: `http://60.204.203.164:7700/chatnum?post=${starId}&user1=${user1Id}&user2=${Number(localStorage.getItem('id'))}`,
                dataType: "json",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('author'),
                },
                success: function (result) {
                    commNums.innerHTML = `回复(${result.data})`;
                },
                error: function(msg){
                    console.log(msg);
                },
        });
    },
        error: function (msg) {
            console.log(msg);
        },
    })
    commentTextarea.value = '';
    const len = commentTextarea.value.length;
    lenComment.innerHTML = `${len}/150`;
})

const email = document.querySelector('.email-box');
email.addEventListener('click',()=>{
    $.ajax({
        method: "GET",
        url: `http://60.204.203.164:7700/unseen`,
        dataType: 'json',
        headers:{
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('author'),
        },
        success: function (result) {
            $.ajax({
                method: 'GET',
                url: `http://60.204.203.164:7700/p:${result.post_id}`,
                dataType: "json",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('author'),
                },
                success: function (res) {
                    if (res.success) {
                        // console.log(result);
                        userNameGet.innerHTML = res.data.username;
                        contentGet.innerHTML = res.data.content;
                        tagsGet.innerHTML = '';
                        res.data.tags.forEach((e, i) => {
                            const tag = document.createElement('div');
                            tag.classList.add('tag1');
                            tag.innerHTML = `# ${e}`;
                            tagsGet.appendChild(tag);
                        })
                        starId = res.data.id;
                        user1Id = res.data.user_id;
                        $.ajax({
                            method: "GET",
                            url: `http://60.204.203.164:7700/chatnum?post=${starId}&user1=${user1Id}&user2=${user1Id^result.user_id^result.send_id}`,
                            dataType: "json",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": localStorage.getItem('author'),
                            },
                            success: function (res1) {
                                commNums.innerHTML = `回复(${res1.data})`;
                                $.ajax({
                                    method: 'GET',
                                    url: `http://60.204.203.164:7700/chat?post=${starId}&user1=${user1Id}&user2=${user1Id^result.user_id^result.send_id}`,
                                    dataType: 'json',
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": localStorage.getItem('author'),
                                    },
                                    success: function (res2) {
                                        
                                        for(let i=0;i<result.data;i++){
                                            UlGetModel.firstChild.remove();
                                        }
                                        for (let i = 0; i < result.data; i++) {
                                            const comment = document.createElement('li');
                                            comment.classList.add('comment');
                                            const info = document.createElement('div');
                                            const profile = document.createElement('div');
                                            const username = document.createElement('div');
                                            info.classList.add('info');
                                            profile.classList.add('profile');
                                            username.classList.add('username');
                                            const textarea = document.createElement('textarea');
                                            textarea.readOnly = true;
                                            console.log(res2.data[i]);
                                            textarea.innerHTML = res2.data[i].content;
                                            username.innerHTML = res2.data[i].send_name;
                                            comment.appendChild(textarea);
                                            info.appendChild(profile);
                                            info.appendChild(username);
                                            comment.appendChild(info);
                                            UlGetModel.insertBefore(comment, UlGetModel.firstChild);
                                        }
                                    },
                                    error: function (msg) {
                                        console.log(msg);
                                    },
                                })
    
                            }
                        });
                    }
                },
                error: function (msg) {
                    console.log(msg);
                },
            })
        },
        error: function(msg){
            console.log(msg);
        },
    })
})