const form = document.querySelector("#contactForm");
const firstName = document.querySelector("#firstName");
const firstNameError = document.querySelector("#firstNameError");
const lastName = document.querySelector("#lastName");
const lastNameError = document.querySelector("#lastNameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const message = document.querySelector("#message");
const messageError = document.querySelector("#textError");

function validateInput(event) {
    event.preventDefault();

    if (checkLength(firstName.value, 1)) {
        firstNameError.style.display ="none"
    } else {
        firstNameError.style.display = "block";
    }

    if (checkLength(lastName.value, 1)) {
        lastNameError.style.display ="none"
    } else {
        lastNameError.style.display = "block";
    }

 if (checkLength(subject.value, 1)) {
        subjectError.style.display ="none"
    } else {
        subjectError.style.display = "block";
    }

    if (checkLength(message.value, 5)) {
        messageError.style.display ="none"
    } else {
        messageError.style.display = "block";
    }
    if (validateEmail(email.value)) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
    }

    localStorage.setItem("firstName", firstName.value);
    localStorage.setItem("lastName", lastName.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("subject", subject.value);
    localStorage.setItem("message", message.value);


    if (checkLength(firstName.value, 1) && checkLength(lastName.value, 1) && checkLength(subject.value, 1) && checkLength(message.value, 5) &&validateEmail(email.value)) 
   { 
    window.location.href = "messageSent.html"
}



    console.log (firstName.value, lastName.value, email.value, subject.value, message.value)
    console.log(event);
}






form.addEventListener("submit", validateInput)

function checkLength(value, len) {
    if (value.trim().length > len) {
    return true;
} else {
    return false; 
}
}


function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}


// form.onsubmit = function() {

//     event.preventDefault()

//     console.log(event)

// }



// function validateForm() {
//     event.preventDefault();

//     if (firstName.length > 0) {
//         firstNameError.style.display = "none";
//     } else {
//         firstNameError.style.display = "block";

//     }

//     console.log("hello")

// }
