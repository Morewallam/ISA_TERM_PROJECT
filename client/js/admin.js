
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