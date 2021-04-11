
function createNewUser() {
    const xhttp = new XMLHttpRequest();
    let createuserurl = "https://seanwallace.ca/v1/user/register";
    xhttp.open("POST", createuserurl, true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Content-type", "application/json");
    let newUserName = document.getElementById("userName").value.trim();
    let newUserPassword = document.getElementById("userPassword").value.trim();
    let newUserRepeatPassword = document.getElementById("userCheckPassword").value.trim();
    let newUserAuth = document.getElementById("userAuth").value.trim();
    let newUserData = {username:newUserName,password:newUserPassword,repeatPassowrd:newUserPassword,authorization:newUserAuth};
    xhttp.send(JSON.stringify(newUserData));
    xhttp.onreadystatechange = function () {
        console.log(this.readyState);
        console.log(this.status);
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
}

document.getElementById("createUser").onclick = createNewUser;


function toBack() {
    window.location.href = "./home.html";
   }
   
   document.getElementById("back").onclick = toBack;