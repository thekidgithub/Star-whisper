let screenW = document.documentElement.clientWidth * 0.8;
let screenH = document.documentElement.clientHeight * 0.8;
let screenW1 = document.documentElement.clientWidth * 0.1;
let screenH1 = document.documentElement.clientHeight * 0.1;
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
    star.style.left = (x + screenW1) + 'px';
    star.style.top = (y + screenH1) + 'px';
    star.style.zIndex = '1';
    // star.style.animationDelay = `${Math.random()*5}s`;
    star.style.transform = `rotate(${Math.random() * 360}deg) scale(${Math.random() + 0.5})`;
    if (i < 3) star.classList.add('star1');
    else if (i < 6) star.classList.add('star2');
    else star.classList.add('star3');
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
                else {
                    alert("请先登录！")
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
    if (e.target.classList.contains('star1') || e.target.classList.contains('star2') || e.target.classList.contains('star3')) {
        $.ajax({
            method: 'POST',
            url: 'http://60.204.203.164:7700/randp',
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify({
                tags: myTags,
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
                                    const lis = document.querySelectorAll('.get-model .comment')
                                    lis.forEach((e) => {
                                        // console.log(e);
                                        if (e.classList.contains('comment')) {
                                            // console.log(e);
                                            e.remove();
                                        }
                                    })
                                    // console.log(Array.from(UlGetModel.childNodes).length);
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
                                        // console.log(res.data[i]);
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
    if (commentTextarea.value.length > 0) {
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
                if (result.success) {
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
                        error: function (msg) {
                            console.log(msg);
                        },
                    });
                }
                else alert("请先登录!");
            },
         
            error: function (msg) {
                console.log(msg);
            },
        })
    }
    commentTextarea.value = '';
    const len = commentTextarea.value.length;
    lenComment.innerHTML = `${len}/150`;
})

const email = document.querySelector('.email-box');
email.addEventListener('click', () => {

    $.ajax({
        method: "GET",
        url: `http://60.204.203.164:7700/unseen`,
        dataType: 'json',
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('author'),
        },
        success: function (result) {
            if(result.success){
            getModel.classList.remove('hidden');
            getModel.classList.add('show');
            document.body.classList.add('show');
            $.ajax({
                method: 'GET',
                url: `http://60.204.203.164:7700/p/${result.data.post_id}`,
                dataType: "json",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('author'),
                },
                success: function (res) {
                    if (res.success) {
                        //  console.log(result);
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
                            url: `http://60.204.203.164:7700/chatnum?post=${starId}&user1=${user1Id}&user2=${user1Id ^ result.data.user_id ^ result.data.send_id}`,
                            dataType: "json",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": localStorage.getItem('author'),
                            },
                            success: function (res1) {
                                commNums.innerHTML = `回复(${res1.data})`;
                                $.ajax({
                                    method: 'GET',
                                    url: `http://60.204.203.164:7700/chat?post=${starId}&user1=${user1Id}&user2=${user1Id ^ result.data.user_id ^ result.data.send_id}`,
                                    dataType: 'json',
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": localStorage.getItem('author'),
                                    },
                                    success: function (res2) {
                                        // console.log(res2);
                                        // for(let i=0;i<Array.from(UlGetModel.childNodes).length-2;i++){
                                        // UlGetModel.firstChild.remove();
                                        // }
                                        const lis = document.querySelectorAll('.get-model .comment')
                                        lis.forEach((e) => {
                                            // console.log(e);
                                            if (e.classList.contains('comment')) {
                                                // console.log(e);
                                                e.remove();
                                            }
                                        })
                                        for (let i = 0; i < res1.data; i++) {
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
                    // console.log(msg);
                },
            })
            }
            else{
                if(!result.error.includes('login')) alert("没有消息");
                else alert("请先登录");
            }
        },
        error: function (msg) {
            console.log(msg);
        },
    })
})

const exit = document.querySelector('.exit');
if (!localStorage.getItem('author')) exit.innerHTML = '注册/登录';
else exit.innerHTML = '退出登录';
exit.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = '../entry/entry.html';
})

const notice = document.querySelector('.notice');
const tagModel = document.querySelector('.selete-model');
const closeTagModel = document.querySelector('.selete-model .close');
const cancelTagModel = document.querySelector('.selete-model .cancel');
const tagsUl1 = document.querySelector('.selete-model .tag-to-choose');
const sendTagModel = document.querySelector('.selete-model .send');
notice.addEventListener('click',()=>{
    tagModel.classList.add('show');
    tagModel.classList.remove('hidden');
    document.body.classList.add('show');
})

closeTagModel.addEventListener('click',()=>{
    tagModel.classList.remove('show');
    tagModel.classList.add('hidden');
    document.body.classList.remove('show');
})

cancelTagModel.addEventListener('click',()=>{
    tagModel.classList.remove('show');
    tagModel.classList.add('hidden');
    document.body.classList.remove('show');
})
const tags1 = document.querySelectorAll('.selete-model li')
tagsUl1.addEventListener('click',(event)=>{
    if (event.target.classList.contains('tag')) {
        tags1.forEach((e) => {
            e.classList.remove('seleted');
        })
        event.target.classList.add('seleted');
    }
})

sendTagModel.addEventListener('click',()=>{
    myTags = [];
    tags1.forEach((e, i) => {
        if (e.classList.contains('seleted')) {
            myTags.push(tagToChoose1[i]);
        }
    })
    tagModel.classList.remove('show');
    tagModel.classList.add('hidden');
    document.body.classList.remove('show');
})

