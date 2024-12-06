const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

registerButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});
document.querySelector(".register-container button").addEventListener("click", function(event) {
    event.preventDefault();

    const usernameInput = document.querySelector(".register-container input[type='text']");
    const emailInput = document.querySelector(".register-container input[type='email']");
    const passwordInput = document.querySelector(".register-container input[type='password']");

    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    const emailRegex = /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email.");
        return;
    }

    const savedData = localStorage.getItem('usersArray');
    let parsedData;

    if (savedData) {
        parsedData = JSON.parse(savedData);
        const emailExists = parsedData.some(user => user.email === email);
        if (emailExists) {
            alert("This email is already in use.");
            return; 
        }
    } else {
        parsedData = [];
    }

    // حفظ بيانات المستخدم
    storeUserData(parsedData, username, email, password);

    // عرض رسالة التأكيد
    alert("Account created successfully! Redirecting to login...");

    // تفريغ الحقول
    usernameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";

    // إعادة التوجيه إلى تسجيل الدخول
    const container = document.getElementById("container");
    container.classList.remove("right-panel-active"); // الانتقال إلى وضع تسجيل الدخول
});

function storeUserData(existingData, username, email, password) {
    const data = {
        username: username,
        email: email,
        password: password
    };

    existingData.push(data);

    const updatedData = JSON.stringify(existingData);
    localStorage.setItem('usersArray', updatedData);

    console.log(existingData);
}

var loginlink = document.querySelector(".login-link");
loginlink.addEventListener("click", () => {
    var registerContainer = document.querySelector(".register-container");
    registerContainer.style.display = "none";
});

var signlink = document.querySelector(".sign-up-link");
signlink.addEventListener("click", () => {
    var registerContainer = document.querySelector(".register-container");
    registerContainer.style.display = "block";
});

// Login check
document.querySelector(".login-container button").addEventListener("click", function(event) {
    event.preventDefault();

    const email = document.querySelector(".login-container input[type='email']").value;
    const password = document.querySelector(".login-container input[type='password']").value;

    const savedData = localStorage.getItem('usersArray');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        const userExists = parsedData.some(user => user.email === email && user.password === password);
        
        if (userExists) {
            alert("Login successful!");
            // Redirect to the desired page
            // location.href = "/project/index.html";
        } else {
            alert("Invalid email or password.");
        }
    } else {
        alert("No registered users found.");
    }
});
