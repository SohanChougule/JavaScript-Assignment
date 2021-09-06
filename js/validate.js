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
    }else if (password.value == "") {
        document.getElementById("passerrmsg").innerText = "Please Enter Password";
        password.focus();
    }else if (cpassword.value == "" ) {
        document.getElementById("passerrmsg").innerText = "Please Enter Confirm Password";
        cpassword.focus();
    }else if (cpassword.value !== password.value ) {
        document.getElementById("passerrmsg").innerText = "Password and Confirm Password must match";
    }else if (fname.value == "") {
        document.getElementById("fnameerrmsg").innerText = "Please Enter First Name";
        fname.focus();
    }else if (fname.value == "") {
        document.getElementById("fnameerrmsg").innerText = "Please Enter First Name";
        fname.focus();
    }
    else if (lname.value == "") {
        lname.focus();
        document.getElementById("lnameerrmsg").innerText = "Please Enter Last Name";
    }else if (gender.value == "") {
        document.getElementById("gendererrmsg").innerText = "Please Select gender";
        gender.focus();
    }
    else if (address.value == "") {
        address.focus();
        document.getElementById("adderrmsg").innerText = "Please Enter Address";
    } 
    else {
        confirm("Are you sure ?")
        localStorage.setItem("uname",uname.value);
        localStorage.setItem("password",password.value);
        
        localStorage.setItem("fname",fname.value);
        localStorage.setItem("lname",lname.value);
        localStorage.setItem("address",address.value);
        localStorage.setItem("gender",gender.value);
        
        window.location.href = "login.html"

    }
}

function LoginFormValidation(){
    let uname = document.getElementById("luname").value;
    let password = document.getElementById("lpassword").value;
    if(localStorage.getItem("uname")==uname){
        if(localStorage.getItem("password")==password){
            sessionStorage.setItem("luname",uname);
            window.location.href = "index.html";
        }else{
            document.getElementById("loginerrmsg").innerHTML = "password does not match";
        }
    }else{
        document.getElementById("loginerrmsg").innerHTML = "username not found";
    }
    
}