if (JSON.parse(localStorage.getItem("users")) == null) {
    localStorage.setItem("users", JSON.stringify([]));

}
if (JSON.parse(localStorage.getItem("task")) == null) {
    localStorage.setItem("task", JSON.stringify([]));
}

function RegFormValidation() {
    let uname = document.getElementById("uname");

    let fname = document.getElementById("fname");
    let password = document.getElementById("password");
    let cpassword = document.getElementById("cpassword");
    let lname = document.getElementById("lname");
    let gender = document.getElementById("gender");
    let address = document.getElementById("address");

    let arr = JSON.parse(localStorage.getItem("users"));
    let flag = true;
    if (typeof arr !== null) {
        for (let x of arr) {
            if (x["uname"] == uname.value) {
                flag = false;
                break;
            }
        }
    }
    if (!flag) {
        document.getElementById("unameerrmsg").innerText = "Username already taken please try another username";
        uname.focus();
    } else if (uname.value == "") {
        document.getElementById("unameerrmsg").innerText = "Please Enter User Name";
        fname.focus();
    } else if (password.value == "") {
        document.getElementById("passerrmsg").innerText = "Please Enter Password";
        password.focus();
    } else if (cpassword.value == "") {
        document.getElementById("passerrmsg").innerText = "Please Enter Confirm Password";
        cpassword.focus();
    } else if (cpassword.value !== password.value) {
        document.getElementById("passerrmsg").innerText = "Password and Confirm Password must match";
    } else if (fname.value == "") {
        document.getElementById("fnameerrmsg").innerText = "Please Enter First Name";
        fname.focus();
    } else if (lname.value == "") {
        lname.focus();
        document.getElementById("lnameerrmsg").innerText = "Please Enter Last Name";
    } else if (gender.value == "") {
        document.getElementById("gendererrmsg").innerText = "Please Select gender";
        gender.focus();
    }
    else if (address.value == "") {
        address.focus();
        document.getElementById("adderrmsg").innerText = "Please Enter Address";
    } else {
        confirm("Are you sure ?")
        let obj = {
            uname: uname.value,
            password: password.value,
            fname: fname.value,
            lname: lname.value,
            address: address.value,
            gender: gender.value
        }
        let users = JSON.parse(localStorage.getItem("users"))
        users.push(obj);

        localStorage.setItem("users", JSON.stringify(users));

        window.location.href = "login.html";
    }
}

function LoginFormValidation() {
    let uname = document.getElementById("luname");
    let password = document.getElementById("lpassword");
    let arr = JSON.parse(localStorage.getItem("users"));

    if (uname.value == "") {
        document.getElementById("loginerrmsg").innerText = "Please Enter User Name";
        fname.focus();
    } else if (password.value == "") {
        document.getElementById("loginerrmsg").innerText = "Please Enter Password";
        password.focus();
    } else {
        let count = 0;
        for (let x of arr) {
            if (x["uname"] == uname.value) {
                if (x["password"] == password.value) {
                    sessionStorage.setItem("luser", JSON.stringify(x));
                    window.location.href = "index.html";
                    sessionStorage.setItem("userid", count);
                    break;
                } else {
                    document.getElementById("loginerrmsg").innerHTML = "incorrect password";
                }
            } else {
                document.getElementById("loginerrmsg").innerHTML = "Invalid Username or password";
            }
            count++;
        }
    }
}


function displayTask() {
    isSession();
    viewReminder();
    let arr = JSON.parse(localStorage.getItem("task"));
    let userid = sessionStorage.getItem("userid");
    let txt = "<th>Task name</th><th>Task details</th><th>Task date</th><th>Status</th><th>Public</th><th>Reminder</th><th>Reminder Date</th>";
    let newarr = []
    for (let x of arr) {
        if (x["userid"] == userid) {
            newarr.push(x);
            txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>"
        }
    }
    sessionStorage.setItem("task", JSON.stringify(newarr));
    document.getElementById("ViewTable").innerHTML = txt;

}

function setReminderMax() {
    let taskdate = document.getElementById("taskdate").value;
    document.getElementById("taskReminderdate").setAttribute("max", taskdate);
}

function isReminder() {
    let reminder = document.getElementsByName("isTaskReminder");
    let isReminder;
    for (i = 0; i < reminder.length; i++) {
        if (reminder[i].checked) {
            isReminder = reminder[i].value;
        }
    }
    if (isReminder == "reminderNo") {
        document.getElementById("taskReminderdate").disabled = true;
    } else {
        document.getElementById("taskReminderdate").disabled = false;
    }
}

function addTask() {
    let tname = document.getElementById("taskName");
    let tdetails = document.getElementById("taskdetails");
    let tdate = document.getElementById("taskdate");
    let flag = true;
    if (tname.value == "") {
        document.getElementById("taskerrmsg").innerHTML = "Please Enter Task";
    } else if (tdetails.value == "") {
        document.getElementById("taskerrmsg").innerHTML = "Please Enter Task details";
    } else if (tdate.value == "") {
        document.getElementById("taskerrmsg").innerHTML = "Please Enter Date";
    } else {
        let userid = sessionStorage.getItem("userid");
        let task = JSON.parse(localStorage.getItem("task"));
        let cnt = 0
        for (x of task) {
            if (x["userid"] == userid) {
                cnt++
            }
        }

        let status = "";
        let dtask = document.getElementById("isDoneTask");

        if (dtask.checked) {
            status = "done";
        } else {
            status = "pending";
        }

        isPublicEle = document.getElementsByName("isTaskPublic");
        let isPublic;
        for (i = 0; i < isPublicEle.length; i++) {
            if (isPublicEle[i].checked) {
                isPublic = isPublicEle[i].value;
            }
        }

        let reminderObj = document.getElementsByName("isTaskReminder");
        let isReminder;
        let reminder;
        let reminderDate;
        for (i = 0; i < reminderObj.length; i++) {
            if (reminderObj[i].checked) {
                isReminder = reminderObj[i].value;
            }
        }
        if (isReminder == "reminderNo") {
            reminder = "NO";
            reminderDate = "-";
        } else {
            reminder = "Yes";
            reminderDate = document.getElementById("taskReminderdate").value;
            if (reminderDate == "") {
                document.getElementById("taskerrmsg").innerHTML = "Please Enter Reminder Date";
                flag = false;
            } else {
                flag = true;
            }

        }

        if (flag) {
            obj = {
                "userid": userid,
                "taskid": cnt,
                "task": tname.value,
                "details": tdetails.value,
                "date": tdate.value,
                "status": status,
                "isPublic": isPublic,
                "isReminder": reminder,
                "reminderDate": reminderDate
            };
            console.log(obj);
            task.push(obj);
            localStorage.setItem("task", JSON.stringify(task));
            alert("Task Added");
            window.location.reload();
        }

    }


}

function viewUpdate() {
    isSession();
    let task = JSON.parse(sessionStorage.getItem("task"));
    let txt = ""


    for (let x of task) {
        let a = 1 + x["taskid"];
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


        txt += "<input value='" + a + "' readonly><input type='text' value='" + x["task"] + "'><input type='text' value='" + x["details"] + "'><input type='date' value='" + x["date"] + "'><span class='statusSpan'><input type='checkbox'  id='status" + a + "' value='pending' " + c + " onchange='isDone(" + a + ")'></span><span class='statusSpan'><input type='checkbox' id='public" + a + "' " + checkedPublic + "></span><span class='statusSpan'><input type='checkbox'  id='reminder" + a + "' " + checkedReminder + " onchange='remDateDisable(" + a + ")'></span> <input type='date' id='remDate" + a + "' value='" + x["reminderDate"] + "' " + checkedDate + "><br> ";
    }
    document.getElementById("updateTaskTable").innerHTML = txt;
}

function isDone(a) {
    let doneObj = "status" + a;
    val = document.getElementById(doneObj).checked;
    let rem = "reminder" + a;
    if (val) {
        document.getElementById(rem).disabled = true;
    } else {
        document.getElementById(rem).disabled = false;
    }
}

function remDateDisable(a) {
    let dateObj = "reminder" + a;
    val = document.getElementById(dateObj).checked;
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
    for (let i = 0; i < (rlen * 9); i += 9) {
        let id = tab[i].value - 1;
        let task = tab[i + 1].value;
        let details = tab[i + 2].value;
        let date = tab[i + 3].value;
        b = i + 1;
        let status, isPublic, isReminder, reminderDate;

        if (tab[i + 4].checked) {
            status = tab[i + 4].value;
        }
        if (tab[i + 5].checked) {
            status = tab[i + 5].value;
        }

        a = id + 1
        let pubvar = document.getElementById("public" + a);

        console.log("public" + a);
        if (pubvar.checked) {
            isPublic = "public";
        } else {
            isPublic = "private";
        }

        let remvar = document.getElementById("reminder" + a);

        if (remvar.checked) {
            isReminder = "Yes";
            reminderDate = document.getElementById("remDate" + a).value;
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


function deleteView() {
    isSession();
    let task = JSON.parse(sessionStorage.getItem("task"));
    let txt = "<tr><th>Task Id</th><th>Task</th><th>Task details</th><th>Date</th><th>Status</th><th>Public or Private</th><th>Reminder</th><th>Reminder Date</th><th>Select</th></tr>"

    for (let x of task) {
        let a = 1 + x["taskid"];
        txt += "<tr><td style='none'>" + a + "</td><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td><td><input type = 'checkbox' class ='deleteItem' value='" + x["taskid"] + "'</td></tr>"
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

function profileDisplay() {
    isSession();
    let userid = sessionStorage.getItem("userid");
    let users = JSON.parse(localStorage.getItem("users"));
    let count = 0;
    for (let x of users) {
        if (count == userid) {

            tables = document.getElementsByTagName("td");
            tables[0].innerText = x["uname"];
            tables[1].innerText = x["fname"] + " " + x["lname"];
            tables[2].innerText = x["address"];
            tables[3].innerText = x["gender"];
        }
        count++;
    }
}

function profileEditDisplay() {
    isSession();
    let userid = sessionStorage.getItem("userid");
    let users = JSON.parse(localStorage.getItem("users"));
    let count = 0;
    for (let x of users) {
        if (count == userid) {

            tables = document.getElementsByTagName("input");
            document.getElementById("username").innerText = x["uname"];
            tables[0].value = x["fname"];
            tables[1].value = x["lname"];
            tables[2].value = x["address"];
            tables[3].value = x["gender"];
        }
        count++;
    }
}



function editProfile() {
    let tab = document.getElementsByClassName("profileinp");
    let users = JSON.parse(localStorage.getItem("users"));
    let fname = tab[0].value;
    let lname = tab[1].value;
    let address = tab[2].value;
    let gender = tab[3].value;

    let userid = sessionStorage.getItem("userid");
    let count = 0;

    for (let x of users) {

        if (count == userid) {
            x["fname"] = fname;
            x["lname"] = lname;
            x["address"] = address;
            x["gender"] = gender;

        }
        count++;
    }
    localStorage.setItem("users", JSON.stringify(users));
    alert("Updated");
    window.location.href = "profile.html"
}


function viewBy() {

    let view = document.getElementById("viewTask").value;
    let arr = JSON.parse(sessionStorage.getItem("task"));
    let txt = "<th>Task name</th><th>Task details</th><th>Task date</th><th>Task Status</th><th>Public or Private</th><th>Reminder</th><th>Reminder Date</th>";
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

    if (view == "taskPublic") {
        document.getElementById("statusSort").innerHTML = `<select name="taskPublic" id="taskPublic" onchange="viewPublicBy()">
        <option value="-">-</option>
        <option value="public">Public</option>
        <option value="private">Private</option>
        </select>`;
    }
    for (let x of arr) {
        txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>"
    }

    document.getElementById("ViewTable").innerHTML = txt;
}

function viewStatusBy() {
    let arr = JSON.parse(sessionStorage.getItem("task"));
    ele = document.getElementById("statusTask").value;
    let txt = "<th>Task name</th><th>Task details</th><th>Task date</th><th>Task Status</th><th>Public or Private</th><th>Reminder</th><th>Reminder Date</th>";
    if (ele == "pending") {
        for (let x of arr) {
            if (x["status"] == "pending") {
                txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";
            }
        }

    } else if (ele == "done") {
        for (let x of arr) {
            if (x["status"] == "done") {
                txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";
            }
        }

    } else {
        for (let x of arr) {
            txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";

        }
    }
    document.getElementById("ViewTable").innerHTML = txt;

}

function viewReminderBy() {
    let arr = JSON.parse(sessionStorage.getItem("task"));
    ele = document.getElementById("reminderTask").value;
    let txt = "<th>Task name</th><th>Task details</th><th>Task date</th><th>Task Status</th><th>Public or Private</th><th>Reminder</th><th>Reminder Date</th>";
    if (ele == "Yes") {
        for (let x of arr) {
            if (x["isReminder"] == "Yes") {
                txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";
            }
        }

    } else if (ele == "No") {
        for (let x of arr) {
            if (x["isReminder"] == "NO") {
                txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";
            }
        }

    } else {
        for (let x of arr) {
            txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";

        }
    }
    document.getElementById("ViewTable").innerHTML = txt;

}

function viewReminder() {

    let arr = JSON.parse(sessionStorage.getItem("task"));
    let txt = "<th>Task name</th><th>Task details</th><th>Task date</th><th>Task Status</th><th>Public or Private</th><th>Reminder</th><th>Reminder Date</th>";
    let today = new Date();
    var dd = today. getDate();
    var mm = today. getMonth()+1;
    var yyyy = today. getFullYear();

    if(mm<10){
        mm="0"+mm
    }

    let date1 = yyyy+"-"+mm+"-"+dd;
    let cnt = 0;
    for (let x of arr) {
        if (x["isReminder"] == "Yes") {
            
            if((x["reminderDate"]) == (date1)) {
                cnt++
                txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";
            }            
        }
    }
    if(cnt==0){
        txt = "No Task For Today";
    }

    document.getElementById("reminderTable").innerHTML = txt;
}


function viewPublicBy() {
    let arr = JSON.parse(sessionStorage.getItem("task"));
    ele = document.getElementById("taskPublic").value;
    let txt = "<th>Task name</th><th>Task details</th><th>Task date</th><th>Task Status</th><th>Public or Private</th><th>Reminder</th><th>Reminder Date</th>";
    if (ele == "public") {
        for (let x of arr) {
            if (x["isPublic"] == "public") {
                txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";
            }
        }

    } else if (ele == "private") {
        for (let x of arr) {
            if (x["isPublic"] == "private") {
                txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";
            }
        }

    } else {
        for (let x of arr) {
            txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";

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

}

function searchByName() {
    word = document.getElementById("searchInpName").value;
    let arr = JSON.parse(sessionStorage.getItem("task"));
    let txt = "<th>Task name</th><th>Task details</th><th>Task date</th><th>Task Status</th><th>Public or Private</th><th>Reminder</th><th>Reminder Date</th>";
    for (let x of arr) {
        if (x["task"].includes(word)) {
            txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";
        }
    }
    document.getElementById("searchTable").innerHTML = txt;
}

function searchByDate() {
    word = document.getElementById("searchInpName").value;
    let arr = JSON.parse(sessionStorage.getItem("task"));
    let txt = "<th>Task name</th><th>Task details</th><th>Task date</th><th>Task Status</th><th>Public or Private</th><th>Reminder</th><th>Reminder Date</th>";
    for (let x of arr) {
        if (x["date"] == word) {
            txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";
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