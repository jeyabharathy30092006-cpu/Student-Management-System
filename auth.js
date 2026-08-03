function login(){

    let username = document.getElementById("username").value.trim();

    let password = document.getElementById("password").value.trim();

    if(username === "admin" && password === "admin123"){

        localStorage.setItem("login","true");

        window.location.href = "dashboard.html";

    }else{

        document.getElementById("error").innerHTML =
        "Invalid Username or Password";

    }

}