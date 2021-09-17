
function deleteView() {
    isSession();
    let task = JSON.parse(sessionStorage.getItem("task"));
    let txt = "<tr><th>Task Id</th><th>Task</th><th>Task details</th><th>Date</th><th>Status</th><th>Public or Private</th><th>Reminder</th><th>Reminder Date</th><th>Select</th></tr>"
    let userid = sessionStorage.getItem("userid");
    for (let x of task) {
        if(x["userid"] == userid){
            
        txt += "<tr><td style='none'>" + x["taskid"] + "</td><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td><td><input type = 'checkbox' class ='deleteItem' value='" + x["taskid"] + "'</td></tr>"
        }
        
    }
    document.getElementById("DeleteView").innerHTML = txt;
}

function deleteTask() {
    let inputElements = document.getElementsByClassName("deleteItem");
    let deltask = [];
    for (let i = 0; inputElements[i]; i++) {
        if (inputElements[i].checked) {
            deltask.push(inputElements[i].value);
        }
    }
    let ltask = JSON.parse(localStorage.getItem("task"));
    let userid = sessionStorage.getItem("userid");
    let count = 0
    for (let x of ltask) {
        if (x["userid"] == userid) {
            for (let y of deltask) {
                if (x["taskid"] == y) {
                    ltask.splice(count, 1);

                }

            }
        }
        count++;
    }
    localStorage.setItem("task", JSON.stringify(ltask));
    sessionStorage.setItem("task", JSON.stringify(ltask));
    alert("Deleted tasks");
    window.location.reload();
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