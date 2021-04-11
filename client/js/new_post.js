let token = sessionStorage.getItem("token");
var payload = JSON.parse(window.atob(token.split('.')[1])); 
const root = "https://seanwallace.ca/v1/";
function loadUserStatus() {
    
    console.log(payload["user"]["username"]);
    console.log(payload["user"]);
    document.getElementById("userNameContainer").innerText = "Logged in as " + payload["user"]["username"];
    if (payload["user"]["auth"] !== "admin") {
        document.getElementById("adminButton").style.visibility = "hidden";
    }
}
function toNewPost() {
    window.location.href = "./user_login.html";
}
document.getElementById("createPost").onclick = toNewPost;

function submitNewPost() {
    const xhttp = new XMLHttpRequest();
    let submiturl = root + "posts";

    xhttp.open("POST",submiturl,true);

    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "Bearer " +token);
    xhttp.setRequestHeader('Access-Control-Allow-Origin','*')


    let newPostUser = payload["user"]["user_id"];
    let newPostContent = document.getElementById("postEntryContent");
    let newPostTitle = document.getElementById("postEntryTitle");
    console.log(newPostContent.value);
    console.log(newPostTitle.value);
    let data = {title: newPostTitle.value.trim(), content:newPostContent.value.trim(), user:newPostUser};
    xhttp.send(JSON.stringify(data));
    xhttp.onreadystatechange = function(){
        let a = this.HEADERS_RECEIVED;
        console.log(a);
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
}
document.getElementById("submitPost").onclick = submitNewPost;
function load() {
    loadUserStatus();
}
window.onload = load;