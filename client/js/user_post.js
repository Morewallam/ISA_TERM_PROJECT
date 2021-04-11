let token = sessionStorage.getItem("token");
if(!token){
    window.location.href = "./user_login.html";
}
let testid = 2;
const root = "https://seanwallace.ca/v1/";
const params = new URLSearchParams(window.location.search);
function loadCurrentPost() {
    var payload = JSON.parse(window.atob(token.split('.')[1])); 
    console.log(payload["user"]["username"]);
    console.log(payload["user"]);
    document.getElementById("userName").innerText = "Logged in as " + payload["user"]["username"];

    const xhttp = new XMLHttpRequest();
    console.log(token);
    let loadPostPastEntryUrl = root + "posts";
    xhttp.open("GET", loadPostPastEntryUrl);
    xhttp.setRequestHeader("Authorization", "Bearer " +token);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send(null);

    let currentPostUrl = window.location.href;
    console.log(currentPostUrl);
    console.log(params.get("id"));
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
                }
            }
        }
        
    };
   
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
    const xhttp = new XMLHttpRequest();
}
function editComment() {

}
function deletePost() {

}

function editPost() {

}
function load() {
    loadCurrentPost();
}
// document.getElementById("submit").onclick = sumbitNewComment;
window.onload = load;