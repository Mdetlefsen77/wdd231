document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(function (msg) {
      msg.remove();
    });

    let isValid = true;

    let name = document.getElementById("name").value;
    if (name.length < 2) {
      isValid = false;
      displayError("name", "Please enter at least 2 characters for your name.");
    }

    let email = document.getElementById("email").value;
    if (!validateEmail(email)) {
      isValid = false;
      displayError("email", "Please enter a valid email address.");
    }

    let title = document.getElementById("title").value;
    if (title.length < 5) {
      isValid = false;
      displayError(
        "title",
        "The tip title must be at least 5 characters long."
      );
    }

    let description = document.getElementById("description").value;
    if (description.length < 10) {
      isValid = false;
      displayError(
        "description",
        "The tip description must be at least 10 characters long."
      );
    }

    if (isValid) {
      this.submit();
    }
  });

function displayError(fieldId, message) {
  let field = document.getElementById(fieldId);
  let errorMessage = document.createElement("p");
  errorMessage.classList.add("error-message");
  errorMessage.style.color = "red";
  errorMessage.textContent = message;
  field.parentNode.appendChild(errorMessage);
}

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
}
