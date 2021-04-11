let token = sessionStorage.getItem("token");
if(!token){
    window.location.href = "./user_login.html";
}
let testid = 2;
const root = "https://seanwallace.ca/v1/";
const params = new URLSearchParams(window.location.search);
function loadCurrentPost() {
    var payload = JSON.parse(window.atob(token.split('.')[1])); 

    document.getElementById("userName").innerText = "Logged in as " + payload["user"]["username"];

    const xhttp = new XMLHttpRequest();
    console.log(token);
    let loadPostPastEntryUrl = root + "posts";
    xhttp.open("GET", loadPostPastEntryUrl);
    xhttp.setRequestHeader("Authorization", "Bearer " +token);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send(null);

    let currentPostUrl = window.location.href;

    let currentPostId = parseInt(params.get("id"));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
           var entryCollection = JSON.parse(this.responseText);
           console.log(entryCollection);
           let entryContainer = document.createElement("div");
        entryContainer.id = "allEntry";
        for (let i = 0; i < entryCollection.length; i++) {
            if (entryCollection[i]["id"] === currentPostId) {      
                console.log("exexuted");          
                document.getElementById("postAuthor").innerText = entryCollection[i]["user"]["username"];
                document.getElementById("postTitle").innerText = entryCollection[i]["title"];
                document.getElementById("postContent").innerText = entryCollection[i]["content"];
                console.log(payload["user"]["user_id"]);
                console.log(entryCollection[i]["user"]["userID"]);
                if (payload["user"]["user_id"] !== entryCollection[i]["user"]["userID"]) {
                    document.getElementById("postEdit").style.visibility = "hidden";
                    document.getElementById("postDelete").style.visibility = "hidden";
                    } else {
                        document.getElementById("postEdit").style.visibility = "visible";
                        document.getElementById("postDelete").style.visibility = "visible";
                    }
                }
            }
        }
    };
}



function deletePost() {
    const xhttp = new XMLHttpRequest();
    let currentPostId = parseInt(params.get("id"));
    let deletePosturl = root + "posts/" + currentPostId;
    console.log(deletePosturl);
    console.log("clc");
    let userDecision = window.confirm("Are you sure you would like delete the post?");
    if(userDecision) {
        console.log("going to dl");
        xhttp.open("DELETE",deletePosturl);
        xhttp.setRequestHeader("Authorization", "Bearer " +token);
        xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(null);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        };
    }
}
function editPost() {
    const xhttp = new XMLHttpRequest();
    let currentPostId = parseInt(params.get("id"));
    console.log(currentPostId); 
    let editUrl = root + "posts";
    console.log(editUrl);
    let userDecision = window.confirm("Are you sure you would like edit the post?");
    if(userDecision) {
        console.log("going to edit");
        let newTitle = window.prompt("Please enter the new title");
        let newContent = window.prompt("Please enter the new content");
        xhttp.open("PUT",editUrl);
        xhttp.setRequestHeader("Authorization", "Bearer " +token);
        xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhttp.setRequestHeader("Content-type", "application/json");
        let newPostData = {id:currentPostId,title:newTitle.trim(),content:newContent.trim()};
        xhttp.send(JSON.stringify(newPostData));
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        };
    }
}
document.getElementById("postEdit").onclick = editPost;

function sumbitNewComment() {
    console.log("trying for new comment");

    var payload = JSON.parse(window.atob(token.split('.')[1])); 

    const xhttp = new XMLHttpRequest();
    let submitCommenturl = root + "comments";
    
    let currentPostId = parseInt(params.get("id"));

    xhttp.open("POST",submitCommenturl,true);

    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "Bearer " +token);
    xhttp.setRequestHeader('Access-Control-Allow-Origin','*')


    let newCommentUser = payload["user"]["user_id"];
    let newCommentContent = document.getElementById("userEnterNewCommentEntry").value.trim();


    let commentdata = {postID: currentPostId, content:newCommentContent, userID:newCommentUser};
    xhttp.send(JSON.stringify(commentdata));
    xhttp.onreadystatechange = function(){
        let a = this.HEADERS_RECEIVED;
        console.log(a);
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    window.alert("Comment added");
}
document.getElementById("userSubmitNewCommentEntry").onclick = sumbitNewComment;

function deleteComment() {
    let currentCommentId = this.parentNode.id;

    const xhttp = new XMLHttpRequest();
    
    let deleteCommentUrl = root + "comments/" + currentCommentId;
    console.log(deleteCommentUrl);
    console.log("clc");
    let userDecision = window.confirm("Are you sure you would like delete the comment?");
    if(userDecision) {
        console.log("going to dl");
        xhttp.open("DELETE",deleteCommentUrl);
        xhttp.setRequestHeader("Authorization", "Bearer " +token);
        xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(null);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        };
    }
    window.alert("Comment delete");
}
function editComment() {
    let currentCommentId = parseInt(this.parentNode.id);
    const xhttp = new XMLHttpRequest();

    console.log(currentCommentId); 
    let editCommentUrl = root + "comments";
    console.log(editCommentUrl);
    let userDecision = window.confirm("Are you sure you would like edit the comment?");
    if(userDecision) {
        console.log("going to edit");
        let newCommentContent = window.prompt("Please enter the new content");
        console.log(newCommentContent);
        xhttp.open("PUT",editCommentUrl);
        xhttp.setRequestHeader("Authorization", "Bearer " +token);
        xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhttp.setRequestHeader("Content-type", "application/json");
        let newCommentData = {id:currentCommentId,content:newCommentContent.trim()};
        xhttp.send(JSON.stringify(newCommentData));
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        };
    }
    window.alert("Comment edited");
}

function loadComment() {

    const xhttp = new XMLHttpRequest();
    console.log(token);
    var payload = JSON.parse(window.atob(token.split('.')[1])); 
    console.log(payload["user"]["username"]);
    console.log(payload["user"]);
    let currentPostUrl = window.location.href;
    console.log(currentPostUrl);
    console.log(params.get("id"));
    let currentPostId = parseInt(params.get("id"));
    let loadPostCommentUrl = root + "comments/commentsForPost/"+currentPostId;
    xhttp.open("GET", loadPostCommentUrl);
    
    xhttp.setRequestHeader("Authorization", "Bearer " +token);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send(null);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
           var commentCollection = JSON.parse(this.responseText);
           console.log(commentCollection);
           let commentContainer = document.createElement("div");
           commentContainer.id = "allComment";
        for (let i = 0; i < commentCollection.length; i++) {
            let comment = document.createElement("div");
            comment.className = "mt-3 border border-dark border-bottom bg-light"
            comment.id = commentCollection[i]["id"];
            // entry.onclick=()=>{
            //     window.location.href = "./user_post.html?id="+entry.id;
            // }
            let currentUserID = payload["user"]["user_id"];
            let commentUserID = commentCollection[i]["user"]["userID"];
            
            let commentContent = document.createElement("div");
            let commentUser = document.createElement("div");

            commentUser.innerText = commentCollection[i]["user"]["username"];
            commentContent.innerText = commentCollection[i]["content"];

            comment.appendChild(commentUser);
            comment.appendChild(commentContent);

            console.log(currentUserID);
            console.log(commentUserID);

            if (currentUserID === commentUserID) {
                let buttonContainer = document.createElement("div");
                buttonContainer.className = "col self-align-end";
                buttonContainer.id = commentCollection[i]["id"];

                let editButton = document.createElement("button");
                let deleteButton = document.createElement("button");

                editButton.onclick = editComment;
                deleteButton.onclick = deleteComment;

                editButton.innerText = "Edit comment";
                deleteButton.innerText = "Delete comment";

                buttonContainer.appendChild(editButton);
                buttonContainer.appendChild(deleteButton);

                comment.appendChild(buttonContainer);
            }
    
            commentContainer.appendChild(comment);
            document.getElementById("commentPastEntry").appendChild(commentContainer);
            }
        }
        
    };
}

function load() {
    loadCurrentPost();
    loadComment();
}
// document.getElementById("submit").onclick = sumbitNewComment;
document.getElementById("postDelete").onclick = deletePost;
window.onload = load;