const usernameEl = document.querySelector("#username");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const confirmPasswordEl = document.querySelector("#confirm-password");

const form = document.querySelector("#signup");

// this function will show the border of the input field turn red when it is invalid

const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;

  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message in the <small> tag

  const error = formField.querySelector("small");
  error.textContent = message;
};

// this function will show the success by making the border turn red

const showSuccess = (input) => {
  // get the parent element
  const formField = input.parentElement;

  // remove the error class and replace success
  formField.classList.remove("error");
  formField.classList.add("success");

  // this will hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

// validating the input field

// username field

const checkUsername = () => {
  let valid = false;
  const min = 3,
    max = 25;

  const username = usernameEl.value.trim();

  if (!isRequired(username)) {
    showError(usernameEl, "Username cannot be blank.");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      usernameEl,
      `Username must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(usernameEl);
    valid = true;
  }
};

// email field

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();

  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

// this function will check if the email is valid.

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

// password field

const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password must be at least 8 characters long, includes 1 lowercase, 1 uppercase, 1 number, 1 special character (!@#$%^&*). "
    );
  } else {
    showSuccess(passwordEl);
    valid = true;
  }
  return valid;
};

// this function will check if the password is strong, and should match the specified pattern

const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  return re.test(password);
};
// this function return true if the input argument is empty
const isRequired = (value) => (value === " " ? false : true);

// this function return false if the lenght argument is not between the min and max argument
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

//confirm password field

const checkConfirmPassword = () => {
  let valid = false;

  const confirmPassword = confirmPasswordEl.value.trim();
  const password = passwordEl.value.trim();

  if (!isRequired(confirmPassword)) {
    showError(confirmPasswordEl, "Please enter the password again.");
  } else if (password !== confirmPassword) {
    showError(confirmPasswordEl, "Confirm password does not match!");
  } else {
    showSuccess(confirmPasswordEl);
    valid = true;
  }
  return valid;
};

// event delegation - by adding single event listener - this will prevent the lagging since there are alot of movement
form.addEventListener("submit", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate fields
  let isUsernameValid = checkUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid =
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  // submit to the server if the form is valid
  if (isFormValid) {
  }
});

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "username":
        checkUsername();
        break;
      case "email":
        checkEmail();
        break;
      case "password":
        checkPassword();
        break;
      case "confirm-password":
        break;
    }
  })
);

// debouncing the time for instant feedback and improve the performance of the app
const debounce = (fn, delay = 500) => {
  let timeoutId;

  return (...args) => {
    // cancel previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup new timer

    timeoutId = setTimeout(() => {
      fn.apply(null.args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "username":
        checkUsername();
        break;
      case "email":
        checkEmail();
        break;
      case "password":
        checkPassword();
        break;
      case "confirm-password":
        checkConfirmPassword();
        break;
    }
  })
);

