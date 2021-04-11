let token = sessionStorage.getItem("token");
let testid = 2;
const root = "https://seanwallace.ca/v1/";
function loadCurrentPost() {
    const xhttp = new XMLHttpRequest();
    let loadPostPastEntryUrl = root + "posts";
    xhttp.open()
}

function sumbitNewComment() {
    const xhttp = new XMLHttpRequest();
}

function loadPost() {
    const xhttp = new XMLHttpRequest();
}

function loadUser(){
    const xhttp = new XMLHttpRequest();
}

function deletePost() {
    let userDecision = window.confirm("Are you sure you would like delete the post?");
    if(userDecision) {
        window.location.href = "./delete_succeed.html";
    }
}
function deleteComment() {

}
function editComment() {

}
function deletePost() {

}

function editPost() {

}
document.getElementById("submit").onclick = sumbitNewComment;
window.onload = loadUser,loadPost,loadPostPastEntry;