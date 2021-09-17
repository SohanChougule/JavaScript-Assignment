function profileDisplay() {
    isSession();
    
    let users = JSON.parse(sessionStorage.getItem("luser"));
    
        tables = document.getElementsByTagName("td");
        tables[0].innerText = users["uname"];
        tables[1].innerText = users["fname"] + " " + users["lname"];
        tables[2].innerText = users["address"];
        tables[3].innerText = users["gender"];        
    
   
}

function profileEditDisplay() {
    isSession();
    let userid = sessionStorage.getItem("userid");
    let users = JSON.parse(localStorage.getItem("users"));
    let count = 0;
    for (let x of users) {
        if (x["userid"] == userid) {
            tables = document.getElementsByTagName("input");
            document.getElementById("username").value = x["uname"];
            tables[1].value = x["fname"];
            tables[2].value = x["lname"];
            tables[3].value = x["address"];
            tables[4].value = x["gender"];
        }
        count++;
    }
}

function editProfile() {
    
    let tab = document.getElementsByClassName("profileinp");
    let users = JSON.parse(localStorage.getItem("users"));
    let uname = document.getElementById("username").value;
    let fname = tab[1].value;
    let lname = tab[2].value;
    let address = tab[3].value;
    let gender = tab[4].value;

    let userid = sessionStorage.getItem("userid");
    
    for (let x of users) {

        if (x["userid"] == userid) {
            
            x["fname"] = fname;
            x["lname"] = lname;
            x["address"] = address;
            x["gender"] = gender;

        }
    }

    let updatedUser = {
        "userid":userid,
        "uname":uname,
        "fname":fname,
        "lname":lname,
        "address":address,
        "gender":gender
    }
    sessionStorage.setItem("luser", JSON.stringify(updatedUser));
    
    localStorage.setItem("users", JSON.stringify(users));

    alert("Updated");
    window.location.href = "profile.html"
}


function logout() {
    sessionStorage.clear();
}

function isSession() {
    userid = sessionStorage.getItem("userid");

    if (userid === null) {
        alert("Please Login !!");
        window.location.href = "login.html";
    }
}