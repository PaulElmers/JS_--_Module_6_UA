// Helper function to get and set cookies
function setCookie(name, value, hours) {
    const d = new Date();
    d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
    let cookieName = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(cookieName) === 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return "";
}

function eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
}

// Form validation for registration page
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    let valid = true;

    // Reset errors
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = "Неправильний формат електронної пошти.";
        valid = false;
    }

    // Password validation
    if (password.length < 6 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
        passwordError.textContent = "Пароль має містити мінімум 6 символів, з", "(як", "1 літера нижнього регістра, 1 літера верхнього регістра та 1 цифра.";
        valid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Паролі не збігаються.";
        valid = false;
    }

    if (valid) {
        setCookie("userEmail", email, 1);
        setCookie("userPassword", password, 1);
        window.location.href = "user_info.html";
    }
});

// Form validation for user information page
document.getElementById('userInfoForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const birthYear = document.getElementById('birthYear').value;
    const gender = document.getElementById('gender').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const skype = document.getElementById('skype').value;

    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const birthYearError = document.getElementById('birthYearError');
    const genderError = document.getElementById('genderError');
    const phoneNumberError = document.getElementById('phoneNumberError');
    let valid = true;

    // Reset errors
    firstNameError.textContent = "";
    lastNameError.textContent = "";
    birthYearError.textContent = "";
    genderError.textContent = "";
    phoneNumberError.textContent = "";

    // First name validation
    if (!/^[a-zA-Z]+$/.test(firstName) || firstName.length > 20) {
        firstNameError.textContent = "Ім'я повинно складатися лише з літер та мати не більше 20 символів.";
        valid = false;
    }

    // Last name validation
    if (!/^[a-zA-Z]+$/.test(lastName) || lastName.length > 20) {
        lastNameError.textContent = "Прізвище повинно складатися лише з літер та мати не більше 20 символів.";
        valid = false;
    }

    // Birth year validation
    const currentYear = new Date().getFullYear();
    if (birthYear < 1900 || birthYear > currentYear) {
        birthYearError.textContent = `Рік народження має бути від 1900 до ${currentYear}.`;
        valid = false;
    }

    // Gender validation
    if (gender === "") {
        genderError.textContent = "Оберіть стать.";
        valid = false;
    }

    // Phone number validation
    if (phoneNumber !== "" && !/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,7}$/.test(phoneNumber)) {
        phoneNumberError.textContent = "Неправильний формат номеру телефону.";
        valid = false;
    }

    if (valid) {
        setCookie("userFirstName", firstName, 1);
        setCookie("userLastName", lastName, 1);
        setCookie("userBirthYear", birthYear, 1);
        setCookie("userGender", gender, 1);
        setCookie("userPhoneNumber", phoneNumber, 1);
        setCookie("userSkype", skype, 1);
        alert("Інформація збережена.");
    }
});

// Check if user is already registered
window.onload = function() {
    if (getCookie("userEmail") !== "" && window.location.pathname.endsWith("index.html")) {
        window.location.href = "user_info.html";
    } else if (getCookie("userFirstName") === "" && window.location.pathname.endsWith("user_info.html")) {
        window.location.href = "index.html";
    }
};

// Exit button logic
document.getElementById('exitButton').addEventListener('click', function() {
    eraseCookie("userEmail");
    eraseCookie("userPassword");
    eraseCookie("userFirstName");
    eraseCookie("userLastName");
    eraseCookie("userBirthYear");
    eraseCookie("/userGender");
    eraseCookie("userPhoneNumber");
    eraseCookie("userSkype");
    window.location.href = "index techs html";
});
