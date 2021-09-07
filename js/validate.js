
if(JSON.parse(localStorage.getItem("users")) == null ){
    localStorage.setItem("users" ,JSON.stringify([]));

}
if(JSON.parse(localStorage.getItem("task")) == null ){
    localStorage.setItem("task" ,JSON.stringify([]));

}

function RegFormValidation() {
    console.log("in validate function")
    let uname = document.getElementById("uname");

    let fname = document.getElementById("fname");
    let password = document.getElementById("password");
    let cpassword = document.getElementById("cpassword");
    let lname = document.getElementById("lname");
    let gender = document.getElementById("gender");
    let address = document.getElementById("address");

    if (uname.value == "") {
        document.getElementById("unameerrmsg").innerText = "Please Enter User Name";
        fname.focus();
    } else {
        let arr = JSON.parse(localStorage.getItem("users"));
        if (typeof arr !== null) {
            for (let x of arr) {
                if (x["uname"] == uname.value) {
                    document.getElementById("unameerrmsg").innerText = "Username already taken please try another username";
                    fname.focus();
                }
            }
        }

    }
    if (password.value == "") {
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
    } else if (fname.value == "") {
        document.getElementById("fnameerrmsg").innerText = "Please Enter First Name";
        fname.focus();
    }
    else if (lname.value == "") {
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

        window.location.href = "login.html"

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
    let arr = JSON.parse(localStorage.getItem("task"));
    let userid = sessionStorage.getItem("userid");
    let txt = "<th>Task name</th><th>Task details</th><th>Task date</th>";
    let newarr = []
    for(let x of arr){
        if(x["userid"] == userid){
            newarr.push(x);
            txt += "<tr><td>" + x["task"] +"</td><td>" + x["details"] +"</td><td>" + x["date"] +"</td> </tr>"
        }
    }
    sessionStorage.setItem("task",newarr); 
    document.getElementById("ViewTable").innerHTML = txt;

}
displayTask();

function addTask() {
    let tname = document.getElementById("taskName");
    let tdetails = document.getElementById("taskdetails");
    let tdate = document.getElementById("taskdate");
    
    if(tname.value == ""){
        document.getElementById("taskerrmsg").innerHTML = "Please Enter Task";
    }else if(tdetails.value == ""){
        document.getElementById("taskerrmsg").innerHTML = "Please Enter Task details";
    }else if(tdate.value == ""){
        document.getElementById("taskerrmsg").innerHTML = "Please Enter Date";
    }else{
        let userid = sessionStorage.getItem("userid");
        let task = JSON.parse(localStorage.getItem("task"));
        let cnt =0
        for(x of task){
            if(x["userid"] == userid){
                cnt++
            }
        }
        obj = {"userid": userid,
                "taskid":cnt,
                "task":tname.value,
                "details":tdetails.value,
            "date":tdate.value};
        
        
        task.push(obj)
        localStorage.setItem("task",JSON.stringify(task));
        alert("Task Added");
        window.location.reload();
    }
    

}

function logout() {
    sessionStorage.clear();
    window.location.href = "login.html";
}

