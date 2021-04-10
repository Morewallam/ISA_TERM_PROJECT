
function createNewUser() {
    const xhttp = new XMLHttpRequest();
    let createuserurl = "https://seanwallace.ca/v1/user/register";
    xhttp.open("POST", createuserurl, true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send('{"username":"bob", "password": "123",  "repeatPassword":"123","authorization" : "admin"}');
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