
function createNewUser() {
    const xhttp = new XMLHttpRequest();
    let createuserurl = "https://seanwallace.ca/v1/?name=";
    let connect = "&password="
    let name = document.getElementById("userName").value;
    let password = document.getElementById("userPassword").value;
    xhttp.open("POST", createuserurl + name + connect + password, true);

    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("1stEPUsage").innerHTML = this.responseText;
        }
    };
}

document.getElementById("createUser").onclick = createNewUser;

function logIn() {
    const xhttp = new XMLHttpRequest();
    let loginurl = "https://seanwallace.ca/v1/user?username=";
    let connect = "&username="
    let name = document.getElementById("userName").value;
    // let password = document.getElementById("userPassword").value;
    xhttp.open("POST", loginurl+name, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        console.log(this.readyState);
        console.log(this.status);
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("2ndEPUsage").innerHTML = this.responseText;
        }
        document.getElementById("2ndEPUsage").innerHTML = this.responseText;
    };
}

document.getElementById("login").onclick = logIn;