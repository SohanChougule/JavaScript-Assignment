function profileDisplay() {
    isSession();

    let x = JSON.parse(sessionStorage.getItem("luser"));

    document.getElementById("profile-img").src = x["userimageurl"];

    document.getElementById("pusername").innerText = x["uname"];
    document.getElementById("pname").innerText = x["fname"] + " " + x["lname"];
    document.getElementById("paddress").innerText = x["address"];
    document.getElementById("pgender").innerText = x["gender"];


}

function updateProfilePicture(){
    let userimage = document.getElementById("profile-img");
    let userimageurl = getBase64Image(userimage);
    let users = JSON.parse(localStorage.getItem("users"));
    for (let x of users) {

        if (x["userid"] == userid) {
            x["userimageurl"] = userimageurl;
        }
    }

    updatedUser = JSON.parse(sessionStorage.getItem("luser"));
    updatedUser["userimageurl"] = userimageurl;

    sessionStorage.setItem("luser", JSON.stringify(updatedUser));

    localStorage.setItem("users", JSON.stringify(users));

    alert("Updated");
}



function profileEditDisplay() {
    isSession();
    let x = JSON.parse(sessionStorage.getItem("luser"));
    document.getElementById("profile-img").src = x["userimageurl"];

    document.getElementById("username").value = x["uname"];
    document.getElementById("password").value = x["password"];
    document.getElementById("cpassword").value = x["password"];
    document.getElementById("fname").value = x["fname"];
    document.getElementById("lname").value = x["lname"];
    document.getElementById("address").value = x["address"];
    document.getElementById("gender").value = x["gender"];

}

function editProfile() {

    let users = JSON.parse(localStorage.getItem("users"));

    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let address = document.getElementById("address").value;
    let gender = document.getElementById("gender").value;
    let password = document.getElementById("password").value;
    let cpassword = document.getElementById("cpassword").value;
    

    if (password == "") {
        document.getElementById("unameerrmsg").innerText = " ";
        document.getElementById("passerrmsg").innerText = "Please Enter Password";
        
        return false;
    } else if (password.length < 8) {
        document.getElementById("passerrmsg").innerText = "Password length must not be less than 8";
        return false;
    } else if (!passCheck(password)) {
        document.getElementById("passerrmsg").innerText = "Password must contain atleast 1 special character, 1 number, 1 lowercase and 1 Uppercase character";
        return false;
    }else if (cpassword == "") {
        document.getElementById("passerrmsg").innerText = "";
        document.getElementById("cpasserrmsg").innerText = "Please Enter Confirm Password";
        return false;
    } else if (cpassword !== password) {
        document.getElementById("cpasserrmsg").innerText = "Password and Confirm Password must match";
        return false;
    } else if (fname == "") {
        document.getElementById("cpasserrmsg").innerText = " ";
        document.getElementById("fnameerrmsg").innerText = "Please Enter First Name";
        
        return false;
    } else if (lname == "") {
        lname.focus();
        document.getElementById("fnameerrmsg").innerText = " ";
        document.getElementById("lnameerrmsg").innerText = "Please Enter Last Name";
        return false;
    } else if (gender == "") {
        document.getElementById("lnameerrmsg").innerText = " ";
        document.getElementById("gendererrmsg").innerText = "Please Select gender";
        return false;
    }
    else if (address == "") {
        document.getElementById("gendererrmsg").innerText = " ";
        document.getElementById("adderrmsg").innerText = "Please Enter Address";
        return false;
    } else {
        confirm("Are you sure ?")
        let userid = sessionStorage.getItem("userid");
        
        for (let x of users) {

            if (x["userid"] == userid) {

                x["password"] = password;
                x["fname"] = fname;
                x["lname"] = lname;
                x["address"] = address;
                x["gender"] = gender;
            }
        }

        let updatedUser = JSON.parse(sessionStorage.getItem("luser"));

        updatedUser["password"] = password;
        updatedUser["fname"] = fname;
        updatedUser["lname"] = lname;
        updatedUser["address"] = address;
        updatedUser["gender"] = gender;

        sessionStorage.setItem("luser", JSON.stringify(updatedUser));

        localStorage.setItem("users", JSON.stringify(users));

        alert("Updated");
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
            document.getElementById("profile-img").setAttribute('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function passCheck(str){
    return /[A-Z]/.test(str) && /[a-z]/.test(str) && /[0-9]/.test(str) && /[!@#$%^&*()_+\-=\[\]{}':"\\|,.<>\/?~]/.test(str);
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