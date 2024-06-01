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
    firstNameError.style.display = "none";
    firstName.style.border = "1px solid #5f9552";
  } else {
    firstNameError.style.display = "block";
    firstName.style.border = "3px solid #f56767";
  }

  if (checkLength(lastName.value, 1)) {
    lastNameError.style.display = "none";
    lastName.style.border = "1px solid #5f9552";
  } else {
    lastNameError.style.display = "block";
    lastName.style.border = "3px solid #f56767";
  }

  if (checkLength(subject.value, 1)) {
    subjectError.style.display = "none";
    subject.style.border = "1px solid #5f9552";
  } else {
    subjectError.style.display = "block";
    subject.style.border = "3px solid #f56767";
  }

  if (checkLength(message.value, 5)) {
    messageError.style.display = "none";
    message.style.border = "1px solid #5f9552";
  } else {
    messageError.style.display = "block";
    message.style.border = "3px solid #f56767";
  }
  if (validateEmail(email.value)) {
    emailError.style.display = "none";
    email.style.border = "1px solid #5f9552";
  } else {
    emailError.style.display = "block";
    email.style.border = "3px solid #f56767";
  }

  //makes unique key to store contactdata with
  let dateKey = Date.now().toString();

  let contactData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
  };

  let contactDataString = JSON.stringify(contactData);

  //Checks lenght and emailformat before sending
  if (
    checkLength(firstName.value, 1) &&
    checkLength(lastName.value, 1) &&
    checkLength(subject.value, 1) &&
    checkLength(message.value, 5) &&
    validateEmail(email.value)
  ) {
    localStorage.setItem("contactform_" + dateKey, contactDataString);
    window.location.href = "messageSent.html";
  }
}

form.addEventListener("submit", validateInput);

//checks inputlength
function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

//Checks emailformat
function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}
