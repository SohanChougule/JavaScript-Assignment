function viewUpdate() {
    isSession();
    let task = JSON.parse(sessionStorage.getItem("task"));
    let txt = ""

    let userid = sessionStorage.getItem("userid");
    for (let x of task) {
        if(x["userid"] == userid){
            
            let c = "";
            let checkedPublic = "";
            let checkedReminder = "";
            let checkedDate = "";
            if (x["status"] == "done") {
                c = "checked";
            } else {
                c = "";
            }

            if (x["isPublic"] == "public") {
                checkedPublic = "checked";
            } else {
                checkedPublic = "";

            }
            if (x["isReminder"] == "Yes") {
                checkedReminder = "checked";
            } else {
                checkedDate = "disabled";
            }


            txt += "<input value='" + x["taskid"] + "' readonly><input type='text' value='" + x["task"] + "'><input type='text' value='" + x["details"] + "'><input type='date' value='" + x["date"] + "'><span class='statusSpan'><input type='checkbox'  id='status" + x["taskid"] + "' value='pending' " + c + " onchange='isDone(" + x["taskid"] + ")'></span><span class='statusSpan'><input type='checkbox' id='public" + x["taskid"] + "' " + checkedPublic + "></span><span class='statusSpan'><input type='checkbox'  id='reminder" + x["taskid"] + "' " + checkedReminder + " onchange='remDateDisable(" + x["taskid"] + ")'></span> <input type='date' id='remDate" + x["taskid"] + "' value='" + x["reminderDate"] + "' " + checkedDate + "><br> ";
        }
    }
    document.getElementById("updateTaskTable").innerHTML = txt;
}

function isDone(a) {
    let doneObj = "status" + a;
    val = document.getElementById(doneObj).checked;
    let rem = "reminder" + a;
    let remdate = "remDate" + a;
    if (val) {
        document.getElementById(rem).disabled = true;
        document.getElementById(remdate).disabled = true;
    } else {
        document.getElementById(rem).disabled = false;
        document.getElementById(remdate).disabled = false;
    }
}

function remDateDisable(a) {
    let dateObj = "reminder" + a;
    let val = document.getElementById(dateObj).checked; 
    let remdate = "remDate" + a;
    if (val) {
        document.getElementById(remdate).disabled = false;
    } else {
        document.getElementById(remdate).disabled = true;
    }
}

function updateTask() {
    let tab = document.getElementById("updateTaskTable").getElementsByTagName("input");
    let taskobj = JSON.parse(sessionStorage.getItem("task"));
    let rlen = taskobj.length;

    obj = []
    for (let i = 0; i < (rlen * 8); i += 8) {
        let id = tab[i].value;
        let task = tab[i + 1].value;
        let details = tab[i + 2].value;
        let date = tab[i + 3].value;
        b = i + 1;
        let status, isPublic, isReminder, reminderDate;

        if (tab[i + 4].checked) {
            status = "done";
        }else{
            status = "pending";
        }
        

        
        let pubvar = document.getElementById("public" + id);

        if (pubvar.checked) {
            isPublic = "public";
        } else {
            isPublic = "private";
        }

        let remvar = document.getElementById("reminder" + id);

        if (remvar.checked) {
            isReminder = "Yes";
            reminderDate = document.getElementById("remDate" + id).value;
        } else {
            isReminder = "NO";
            reminderDate = "-"
        }


        task = {
            "taskid": id,
            "task": task,
            "details": details,
            "date": date,
            "status": status,
            "isPublic": isPublic,
            "isReminder": isReminder,
            "reminderDate": reminderDate
        };
        obj.push(task);
    }

    let userid = sessionStorage.getItem("userid");
    let ltask = JSON.parse(localStorage.getItem("task"));
    for (let x of ltask) {
        for (let y of obj) {
            if (x["userid"] == userid) {
                if (x["taskid"] == y["taskid"]) {
                    x["task"] = y["task"];
                    x["details"] = y["details"];
                    x["date"] = y["date"];
                    x["status"] = y["status"];
                    x["isPublic"] = y["isPublic"];
                    x["isReminder"] = y["isReminder"];
                    x["reminderDate"] = y["reminderDate"];
                }
            }
        }
    }

    localStorage.setItem("task", JSON.stringify(ltask));
    sessionStorage.setItem("task", JSON.stringify(ltask));

    alert("Updated");
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