function displayTask() {
    isSession();
    viewReminder();
    viewToday();
    let arr = JSON.parse(localStorage.getItem("task"));
    let userid = sessionStorage.getItem("userid");
    let txt = "<th>Task name</th><th>Task details</th><th>Task date</th><th>Status</th><th>Public</th><th>Category</th><th>Reminder</th><th>Reminder Date</th>";
    let newarr = []
    for (let x of arr) {
        if (x["userid"] == userid) {
            newarr.push(x);
            txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["category"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";
        }
    }
    sessionStorage.setItem("task", JSON.stringify(newarr));
    document.getElementById("ViewTable").innerHTML = txt;

}


function viewReminder() {    
    let txt = "<th>Task name</th><th>Task details</th><th>Task date</th><th>Task Status</th><th>Public or Private</th><th>Category</th><th>Reminder</th><th>Reminder Date</th>";
    let today = new Date();
    var dd = today. getDate();
    var mm = today. getMonth()+1;
    var yyyy = today. getFullYear();

    if(dd<10){
        dd="0"+dd
    }
    if(mm<10){
        mm="0"+mm
    }

    let date1 = yyyy+"-"+mm+"-"+dd;

    let cnt = 0;
    let arr = JSON.parse(sessionStorage.getItem("task"));
    let userid = sessionStorage.getItem("userid");
    for (let x of arr) {
        if(x["userid"] == userid){
            if (x["isReminder"] == "Yes") {
                
                if((x["reminderDate"]) == (date1)) {
                    cnt++
                    txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["category"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td> </tr>";
                }            
            }
        }
    }
    if(cnt==0){
        txt = "No Reminder's For Today";
    }

    document.getElementById("reminderTable").innerHTML = txt;
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
        let userid = Number(sessionStorage.getItem("userid"));
        let task = JSON.parse(sessionStorage.getItem("task"));
        let taskid = 0;
        for(var x of task){
            if(taskid < x["taskid"]){
                taskid = x["taskid"]
            }
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

        let category = document.getElementById("category").value;

        if (flag) {
            obj = {
                "userid": userid,
                "taskid": 1+taskid,
                "task": tname.value,
                "details": tdetails.value,
                "date": tdate.value,
                "status": "pending",
                "category": category,
                "isPublic": isPublic,
                "isReminder": reminder,
                "reminderDate": reminderDate
            };
            console.log(obj);
            task.push(obj);
            localStorage.setItem("task", JSON.stringify(task));
            sessionStorage.setItem("task", JSON.stringify(task));
            alert("Task Added");
            window.location.reload();
        }
    }
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

function viewToday() {    
    let txt = "<tr><th>Task name</th><th>Task details</th><th>Task date</th><th>Task Status</th><th>Public or Private</th><th>Category</th><th>Reminder</th><th>Reminder Date</th><th>Mark as Done</th></tr>";
    let today = new Date();
    var dd = today. getDate();
    var mm = today. getMonth()+1;
    var yyyy = today. getFullYear();

    if(mm<10){
        mm="0"+mm
    }
    if(dd<10){
        dd="0"+dd
    }

    let date1 = yyyy+"-"+mm+"-"+dd;
    let cnt = 0;
    let arr = JSON.parse(sessionStorage.getItem("task"));
    let userid = sessionStorage.getItem("userid");
    for (let x of arr) {
        if(x["userid"] == userid){
            if(x["status"]=="pending"){
                if((x["date"]) == (date1)) {
                    cnt++
                    txt += "<tr><td>" + x["task"] + "</td><td>" + x["details"] + "</td><td>" + x["date"] + "</td><td>" + x["status"] + "</td><td>" + x["isPublic"] + "</td><td>" + x["category"] + "</td><td>" + x["isReminder"] + "</td><td>" + x["reminderDate"] + "</td><td> <input type='checkbox' value=" + x["taskid"]+" name='doCheck' ></td> </tr>";
                }
            }
                        
            
        }
    }
    if(cnt==0){
        txt = "No Task For Today";
    }

    document.getElementById("TodayTable").innerHTML = txt;
}


function DoTask(){
    let doItems = document.getElementsByName("doCheck");

    console.log("length = ",doItems.length);
    let tasks = JSON.parse(sessionStorage.getItem("task"));

    for(let x of doItems){
        for(let y of tasks){
            if(x.value == y["taskid"]){
                if(x.checked){
                    y["status"] = "done";
                }
            }
        }
    }
    
    sessionStorage.setItem("task",JSON.stringify(tasks));

    
    userid = sessionStorage.getItem("userid");
    ltask = JSON.parse(localStorage.getItem("task"));
    for(let x of ltask){
        if(x["userid"] == userid){
            for(y of tasks){
                if(y["taskid"] == x["taskid"]){
                    x["status"] = y["status"];
                }
            }       
        }
    }
    
    localStorage.setItem("task",JSON.stringify(ltask));

    window.location.reload();

}



function isSession() {
    userid = sessionStorage.getItem("userid");

    if (userid === null) {
        alert("Please Login !!");
        window.location.href = "login.html";
    }
}

function logout() {
    sessionStorage.clear();
}
