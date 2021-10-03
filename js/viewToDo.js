function viewBy() {

    let view = document.getElementById("viewTask").value;
    let arr = JSON.parse(sessionStorage.getItem("task"));
    let txt = "<th>Task name</th><th>Task details</th><th>Task date</th><th>Task Status</th><th>Public or Private</th><th>Category</th><th>Reminder</th><th>Reminder Date</th>";
    if (view == "taskDate") {
        document.getElementById("statusSort").innerHTML = "";
        arr.sort((a, b) => {
            let da = new Date(a.date),
                db = new Date(b.date);
            return da - db;
        });
    } if (view == "taskName") {
        document.getElementById("statusSort").innerHTML = "";
        arr.sort((a, b) => {
            let fa = a.task.toLowerCase(),
                fb = b.task.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
    } if (view == "taskStatus") {
        document.getElementById("statusSort").innerHTML = `<select name="statusTask" id="statusTask" onchange="viewStatusBy()">
        <option value="-">-</option>
        <option value="pending">Pending</option>
        <option value="done">Done</option>
        </select>`;

    }
    if (view == "taskReminder") {
        document.getElementById("statusSort").innerHTML = `<select name="reminderTask" id="reminderTask" onchange="viewReminderBy()">
        <option value="-">-</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        </select>`;
    }

    if (view == "taskCategory") {
        document.getElementById("statusSort").innerHTML = `<select name="categoryTask" id="categoryTask" onchange="viewCategoryBy()">
        <option value="Not important and not urgent.">Not important and not urgent.
        </option>
        <option value="Time sensitive but less important.">
            Time sensitive but less important.
        </option>
        <option value="Important but not time sensitive.">Important but not time sensitive.
        </option>
        <option value="Urgent and important.">Urgent and important.
        </option>

    </select>`;
    }

    if (view == "taskPublic") {
        document.getElementById("statusSort").innerHTML = `<select name="taskPublic" id="taskPublic" onchange="viewPublicBy()">
        <option value="-">-</option>
        <option value="public">Public</option>
        <option value="private">Private</option>
        </select>`;
    }
    for (let x of arr) {
        txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["category"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>"
    }

    document.getElementById("ViewTable").innerHTML = txt;
}

function viewStatusBy() {
    let arr = JSON.parse(sessionStorage.getItem("task"));
    ele = document.getElementById("statusTask").value;
    let txt = "<th>Task name</th><th>Task details</th><th>Task date</th><th>Task Status</th><th>Public or Private</th><th>Category</th><th>Reminder</th><th>Reminder Date</th>";
    if (ele == "pending") {
        for (let x of arr) {
            if (x["status"] == "pending") {
                txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["category"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";
            }
        }

    } else if (ele == "done") {
        for (let x of arr) {
            if (x["status"] == "done") {
                txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["category"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";
            }
        }

    } else {
        for (let x of arr) {
            txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["category"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";

        }
    }
    document.getElementById("ViewTable").innerHTML = txt;

}

function viewReminderBy() {
    let arr = JSON.parse(sessionStorage.getItem("task"));
    ele = document.getElementById("reminderTask").value;
    let txt = "<th>Task name</th><th>Task details</th><th>Task date</th><th>Task Status</th><th>Public or Private</th><th>Category</th><th>Reminder</th><th>Reminder Date</th>";
    if (ele == "Yes") {
        for (let x of arr) {
            if (x["isReminder"] == "Yes") {
                txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["category"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";
            }
        }

    } else if (ele == "No") {
        for (let x of arr) {
            if (x["isReminder"] == "NO") {
                txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["category"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";
            }
        }

    } else {
        for (let x of arr) {
            txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["category"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";

        }
    }
    document.getElementById("ViewTable").innerHTML = txt;

}

function viewCategoryBy(){
    let arr = JSON.parse(sessionStorage.getItem("task"));
    ele = document.getElementById("categoryTask").value;
    let txt = "<th>Task name</th><th>Task details</th><th>Task date</th><th>Task Status</th><th>Public or Private</th><th>Category</th><th>Reminder</th><th>Reminder Date</th>";
    for (let x of arr) {
        if(x["category"] == ele){
                txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["category"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";
        }
    }
    
    document.getElementById("ViewTable").innerHTML = txt;
}

function viewPublicBy() {
    let arr = JSON.parse(sessionStorage.getItem("task"));
    ele = document.getElementById("taskPublic").value;
    let txt = "<th>Task name</th><th>Task details</th><th>Task date</th><th>Task Status</th><th>Public or Private</th><th>Category</th><th>Reminder</th><th>Reminder Date</th>";
    if (ele == "public") {
        for (let x of arr) {
            if (x["isPublic"] == "public") {
                txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["category"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";
            }
        }

    } else if (ele == "private") {
        for (let x of arr) {
            if (x["isPublic"] == "private") {
                txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["category"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";
            }
        }

    } else {
        for (let x of arr) {
            txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["category"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";

        }
    }
    document.getElementById("ViewTable").innerHTML = txt;

}

function searchBy() {
    searchTaskBy = document.getElementById("searchTask").value;
    if (searchTaskBy == "taskName") {
        document.getElementById("viewSearch").innerHTML = "<input type = 'text' id = 'searchInpName' oninput='searchByName()' style='float:right' placeholder='enter task'>";
    }
    if (searchTaskBy == "taskDate") {
        document.getElementById("viewSearch").innerHTML = "<input type = 'date' id = 'searchInpName' onchange='searchByDate()' style='float:right'>";
    }
    if (searchTaskBy == "-") {
        document.getElementById("viewSearch").innerHTML = "";
    }
    

}

function searchByName() {
    word = document.getElementById("searchInpName").value;
    let arr = JSON.parse(sessionStorage.getItem("task"));
    let txt = "<th>Task name</th><th>Task details</th><th>Task date</th><th>Task Status</th><th>Public or Private</th><th>Category</th><th>Reminder</th><th>Reminder Date</th>";
    for (let x of arr) {
        if (x["task"].includes(word)) {
            txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["category"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";
        }
    }
    document.getElementById("searchTable").innerHTML = txt;
}

function searchByDate() {
    word = document.getElementById("searchInpName").value;
    let arr = JSON.parse(sessionStorage.getItem("task"));
    let txt = "<th>Task name</th><th>Task details</th><th>Task date</th><th>Task Status</th><th>Public or Private</th><th>Category</th><th>Reminder</th><th>Reminder Date</th>";
    for (let x of arr) {
        if (x["date"] == word) {
            txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["category"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";
        }
    }
    document.getElementById("searchTable").innerHTML = txt;
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