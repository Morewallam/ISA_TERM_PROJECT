let token = sessionStorage.getItem("token");
if(!token){
    window.location.href = "./user_login.html";
}
const root = "https://seanwallace.ca/v1/";
function loadUserStatus() {
    var payload = JSON.parse(window.atob(token.split('.')[1])); 
    console.log(payload["user"]["username"]);
    console.log(payload["user"]);
    document.getElementById("userNameContainer").innerText = "Logged in as " + payload["user"]["username"];
    if (payload["user"]["auth"] !== "admin") {
        document.getElementById("adminButton").style.visibility = "hidden";
    }
}
function loadPostPastEntry() {
    const xhttp = new XMLHttpRequest();
    console.log(token);
    let loadPostPastEntryUrl = root + "posts";
    xhttp.open("GET", loadPostPastEntryUrl);
    xhttp.setRequestHeader("Authorization", "Bearer " +token);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send(null);

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
           var entryCollection = JSON.parse(this.responseText);
           console.log(entryCollection);
           let entryContainer = document.createElement("div");
        entryContainer.id = "allEntry";
        for (let i = 0; i < entryCollection.length; i++) {
            let entry = document.createElement("div");
            entry.className = "mt-3 border border-dark border-bottom bg-light"
            entry.id = entryCollection[i]["id"];
            entry.onclick=()=>{
                window.location.href = "./post.html?id="+entry.id;
            }
            let entryTitle = document.createElement("div");
            let entryContent = document.createElement("div");
            let entryUser = document.createElement("div");
    
            entryTitle.className = "fs-4";
    
            entryTitle.innerText = entryCollection[i]["title"];
            console.log(entryCollection[i]["user"]);
            entryUser.innerText = entryCollection[i]["user"]["username"];
            entryContent.innerText = entryCollection[i]["content"];
    
            entry.appendChild(entryTitle);
            entry.appendChild(entryUser);
            entry.appendChild(entryContent);
    
            entryContainer.appendChild(entry);
        }
        document.getElementById("AllPostContainer").appendChild(entryContainer);
        }
        
    };
}
function toNewPost() {
    window.location.href = "./new_post.html";
}
document.getElementById("createPost").onclick = toNewPost;

function load(){
    loadUserStatus();
    loadPostPastEntry();
}
window.onload = load;

