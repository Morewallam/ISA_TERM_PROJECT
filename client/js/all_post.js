let token = sessionStorage.getItem("token");
const root = "https://seanwallace.ca/v1/";
function loadPostPastEntry() {
    const xhttp = new XMLHttpRequest();
    console.log(token);
    let loadPostPastEntryUrl = root + "posts";
    xhttp.open("GET", loadPostPastEntryUrl);
    xhttp.setRequestHeader("Authorization", "Bearer " +token);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    // xhttp.withCredentials = true;
    let testEntry = [
        {
            "id": 2,
            "title": "SUNG OOOOPPPPP",
            "content": "HOW IS HE SO GOOD AT INTTINNNGNGG",
            "user": {
                "userID": 1,
                "username": "seanTest"
            }
        },
        {
            "id": 3,
            "title": "The big day!!",
            "content": "This is the biggest bestest day of my whole life",
            "user": {
                "userID": 1,
                "username": "seanTest"
            }
        }
    ];
    xhttp.send(null);

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    let entryContainer = document.createElement("div");
    entryContainer.id = "allEntry";
    for (let i = 0; i < testEntry.length; i++) {
        let entry = document.createElement("div");
        entry.className = "mt-3 border border-dark border-bottom bg-light"
        entry.id = testEntry[i]["id"];

        let entryTitle = document.createElement("div");
        let entryContent = document.createElement("div");
        let entryUser = document.createElement("div");

        entryTitle.className = "fs-4";

        entryTitle.innerText = testEntry[i]["title"];
        console.log(testEntry[i]["user"]);
        entryUser.innerText = testEntry[i]["user"]["username"];
        entryContent.innerText = testEntry[i]["content"];

        entry.appendChild(entryTitle);
        entry.appendChild(entryUser);
        entry.appendChild(entryContent);

        entryContainer.appendChild(entry);
    }
    document.getElementById("test").appendChild(entryContainer);
}
window.onload = loadPostPastEntry;

function deletePost() {

}

function editPost() {

}