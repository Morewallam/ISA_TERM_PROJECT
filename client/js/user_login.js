function tocreateUser() {
    window.location.href = "./new_user.html";
   }
document.getElementById("createUser").onclick = tocreateUser;

function toHome() {
    window.location.href = "./home.html";
}
document.getElementById("back").onclick = toHome;

function logIn() {
    const xhttp = new XMLHttpRequest();
    let loginurl = "https://seanwallace.ca/v1/user/login";
    xhttp.open("POST", loginurl, true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Content-type", "application/json");
    let logUser = document.getElementById("userName").value;
    let logPassword = document.getElementById("userPassword").value;
    console.log(logUser);
    console.log(logPassword);
    xhttp.send('{"username" : "bob", "password" : "123"}');
    xhttp.onreadystatechange = function () {
        console.log(this.readyState);
        console.log(this.status);
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let tokenParsed = JSON.parse(this.responseText);
            sessionStorage.setItem("token", tokenParsed["token"]);
            window.location.href = "./all_post.html";
        }
    };
    console.log(sessionStorage.getItem("token"));

}
console.log(sessionStorage.getItem("token"));
document.getElementById("login").onclick = logIn;