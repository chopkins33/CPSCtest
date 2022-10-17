function login() {
    var pass = document.getElementById("Password").value;
    var user = document.getElementById("Username").value;

    document.getElementById("message").innerHTML = ""

    if (user == "adminCPSC" && pass == "4454") {
        // $('#exampleModal').modal('show')
        window.open("adminHome.html", "_self")

    }
    else {
        var message = document.createElement("div");
        message.classList.add("alert")
        message.classList.add("alert-danger")
        message.setAttribute("role", "alert")
        message.innerHTML = "Invalid Username or Password";
        document.getElementById("message").appendChild(message);
    }
}