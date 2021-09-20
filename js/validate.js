if (JSON.parse(localStorage.getItem("users")) == null) {
    localStorage.setItem("users", JSON.stringify([]));

}
if (JSON.parse(localStorage.getItem("task")) == null) {
    localStorage.setItem("task", JSON.stringify([]));
}

function isUpper(str) {
    return /[A-Z]/.test(str);
}

function passCheck(str){
    return /[A-Z]/.test(str) && /[a-z]/.test(str) && /[0-9]/.test(str) && /[!@#$%^&*()_+\-=\[\]{}':"\\|,.<>\/?~]/.test(str);
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
    
    if (uname.value == "") {
        document.getElementById("unameerrmsg").innerText = "Please Enter User Name";
        uname.focus();
        return false;
    }else if(isUpper(uname.value)) {
        document.getElementById("unameerrmsg").innerText = "User Name must not contain capital letter";
        uname.focus();
        return false;
    }

    if (!flag) {
        document.getElementById("unameerrmsg").innerText = "Username already taken please try another username";
        uname.focus();
        return false;
    }
    else if (password.value == "") {
        document.getElementById("unameerrmsg").innerText = " ";
        document.getElementById("passerrmsg").innerText = "Please Enter Password";
        password.focus();
        return false;
    }else if (password.value.length < 8 ) {
        document.getElementById("passerrmsg").innerText = "Password length must not be less than 8";
        password.focus();
        return false;
    }else if (!passCheck(password.value)) {
        document.getElementById("passerrmsg").innerText = "Password must contain atleast 1 special character, 1 number, 1 lowercase and 1 Uppercase character";
        password.focus();
        return false;
    } else if (cpassword.value == "") {
        document.getElementById("passerrmsg").innerText = "";
        document.getElementById("cpasserrmsg").innerText = "Please Enter Confirm Password";
        cpassword.focus();
        return false;
    } else if (cpassword.value !== password.value) {
        document.getElementById("cpasserrmsg").innerText = "Password and Confirm Password must match";
        return false;
    } else if (fname.value == "") {
        document.getElementById("cpasserrmsg").innerText = " ";
        document.getElementById("fnameerrmsg").innerText = "Please Enter First Name";
        fname.focus();
        return false;
    } else if (lname.value == "") {
        lname.focus();
        document.getElementById("fnameerrmsg").innerText = " ";
        document.getElementById("lnameerrmsg").innerText = "Please Enter Last Name";
        return false;
    } else if (gender.value == "") {
        document.getElementById("lnameerrmsg").innerText = " ";
        document.getElementById("gendererrmsg").innerText = "Please Select gender";
        gender.focus();
        return false;
    }
    else if (address.value == "") {
        document.getElementById("gendererrmsg").innerText = " ";
        
        address.focus();
        document.getElementById("adderrmsg").innerText = "Please Enter Address";
        return false;
    } else {
        confirm("Are you sure ?")
        let users = JSON.parse(localStorage.getItem("users"));
        userid = users.length + 1;
        let userimage = document.getElementById("preview-img");
        let userimageurl = getBase64Image(userimage);

        let obj = {
            userid :userid,
            uname: uname.value,
            password: password.value,
            fname: fname.value,
            lname: lname.value,
            address: address.value,
            gender: gender.value,
            "userimageurl": userimageurl
        }
        
        users.push(obj);

        localStorage.setItem("users", JSON.stringify(users));
        return true;
    }
}

function getBase64Image(userimage) {
    var imgCanvas = document.createElement("canvas"),
    imgContext = imgCanvas.getContext("2d");

    imgCanvas.width = userimage.width;
    imgCanvas.height = userimage.height;

    imgContext.drawImage(userimage, 0, 0, userimage.width, userimage.height);

    var imgAsDataURL = imgCanvas.toDataURL("image/png");
    
    return imgAsDataURL;
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("preview-img").setAttribute('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}


function LoginFormValidation() {
    let uname = document.getElementById("luname");
    let password = document.getElementById("lpassword");
    let arr = JSON.parse(localStorage.getItem("users"));
    let flag = false;
    if (uname.value == "") {
        document.getElementById("loginuerrmsg").innerText = "Please Enter User Name";
        uname.focus();
        return false;
    }else if(password.value == "") {
        document.getElementById("loginuerrmsg").innerText = " ";
        document.getElementById("loginperrmsg").innerText = "Please Enter Password";
        password.focus();
        return false;
    } else {
        for (let x of arr) {
            if (x["uname"] == uname.value) {
                flag= true;
                console.log("user present");
                if (x["password"] == password.value) {
                    console.log("password present");
                    sessionStorage.setItem("luser", JSON.stringify(x));
                    sessionStorage.setItem("userid", x["userid"]);
                    let task = JSON.parse(localStorage.getItem("task"));
                    newtaskarr = [];
                    for(var y of task){
                        if(y["userid"] = x["userid"]){
                            newtaskarr.push(y);
                        }
                    }
                    sessionStorage.setItem("task", JSON.stringify(newtaskarr));
                    return true;
                } else {
                    document.getElementById("loginuerrmsg").innerText = " ";
                    document.getElementById("loginperrmsg").innerText = "incorrect password";
                    return false;
                }
                
            }   
            
        }
        if(!flag){
            document.getElementById("loginuerrmsg").innerText = "username not present";
                    return false;
        }

        
    }
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