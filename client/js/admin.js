
// function createNewUser() {
//     const xhttp = new XMLHttpRequest();
//     let createuserurl = "https://seanwallace.ca/v1/user";
//     xhttp.open("POST", createuserurl, true);
//     xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
//     xhttp.setRequestHeader("Content-type", "application/json");
//     xhttp.send('{"username":"bob", "password": "123",  "repeatPassword":"123","authorization" : "admin"}');
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             document.getElementById("1stEPUsage").innerHTML = this.responseText;
//         }
//         document.getElementById("1stEPUsage").innerHTML = this.responseText;
//     };
// }

// document.getElementById("createUser").onclick = createNewUser;

// function logIn() {
//     const xhttp = new XMLHttpRequest();
//     let loginurl = "https://seanwallace.ca/v1/user/login";
//     xhttp.open("POST", loginurl, true);
//     xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
//     xhttp.setRequestHeader("Content-type", "application/json");
//     xhttp.send('{"username" : "bob", "password" : "123"}');
//     xhttp.onreadystatechange = function () {
//         console.log(this.readyState);
//         console.log(this.status);
//         if (this.readyState == 4 && this.status == 200) {
//             document.getElementById("2ndEPUsage").innerHTML = this.responseText;
//         }
//         document.getElementById("2ndEPUsage").innerHTML = this.responseText;
//     };
// }

// document.getElementById("login").onclick = logIn;

function toBack() {
    window.location.href = "./home.html";
   }
   
   document.getElementById("back").onclick = toBack;
//Admin detail
function showAdmin() {
    const xhttp = new XMLHttpRequest();
    let adminurl = "https://seanwallace.ca/v1/admin";
    xhttp.open("GET", adminurl, true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        console.log(this.readyState);
        console.log(this.status);
        if (this.readyState == 4 && this.status == 200) {
            let admincollection = JSON.parse(this.responseText);
            let admincollectionContainer = document.createElement("div");
            admincollectionContainer.id = "admincollectionContainer";
            admincollection.className = "row";
            for (var i in admincollection){
                let admindetail = document.createElement("div");
                admindetail.className = "border border-2 border-primary bg-light col-auto fs-5";
                admindetail.innerText = i + " " + admincollection[i];
                admincollectionContainer.appendChild(admindetail);
            }
            document.getElementById("showstat").appendChild(admincollectionContainer);
        }
    };
}
window.onload = showAdmin;