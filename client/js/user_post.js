let token = sessionStorage.getItem("token");
const root = "https://seanwallace.ca/v1/";
function loadPostPastEntry() {
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
document.getElementById("submit").onclick = sumbitNewComment;
window.onload = loadUser,loadPost,loadPostPastEntry;