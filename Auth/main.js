document.addEventListener("DOMContentLoaded", () => {
  const one = document.getElementById("one");
  const two = document.getElementById("two");
  const r = JSON.parse(localStorage.getItem("append")) || 1;
  const emailAndPassword = JSON.parse(localStorage.getItem("answer"));
  // 1 is for register
  if (1 == r) {
    if (emailAndPassword) {
      one.style.display = "none";
      two.style.display = "flex";
    } else {
      one.style.display = "flex";
      two.style.display = "none";
    }
  } else {
    one.style.display = "none";
    two.style.display = "flex";
  }
});

document.getElementById("form1").addEventListener("submit", (event) => {
  event.preventDefault();

  const passwordConfirm = document.getElementById("confirmPassword").value;
  const emailConfirm = document.getElementById("confirmEmail").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;

  const loc = JSON.parse(localStorage.getItem("answer")) || [];
  console.log(loc.email);
  console.log(email);

  if (password.length < 8) {
    document.getElementById("answer").style.color = "red";
    document.getElementById("answer").innerHTML =
      "You're password is too short should be more than 8 letters";
  }
  if (name.trim().length == 0) {
    document.getElementById("answer").style.color = "red";
    document.getElementById("answer").innerHTML = "You're name is too short";
  }
  if (email !== emailConfirm) {
    document.getElementById("answer").style.color = "red";
    document.getElementById("answer").innerHTML =
      "You're email doesnt match the confirmed one try again";
  }
  if (password !== passwordConfirm) {
    document.getElementById("answer").style.color = "red";
    document.getElementById("answer").innerHTML =
      "You're password doesnt match the confirmed one try again";
  }
  if (email === loc.email) {
    document.getElementById("answer").style.color = "red";
    document.getElementById("answer").innerHTML =
      "You have an account with this email address";
  }
  if (
    email &&
    emailConfirm &&
    passwordConfirm &&
    name.trim() &&
    password === passwordConfirm &&
    email === emailConfirm &&
    password.length > 8 &&
    email !== loc.email
  ) {
    localStorage.setItem(
      "answer",
      JSON.stringify({
        name: name,
        email: email,
        password: password,
        logedin: false,
      })
    );
    document.getElementById("answer").innerHTML = "";
    appending(2);
    localStorage.setItem("append", "2");
    form.reset();
  }
});

const form = document.getElementById("form1");

form.addEventListener("input", () => {
  document.getElementById("submit").disabled = true;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("confirmPassword").value;
  const emailConfirm = document.getElementById("confirmEmail").value;
  const name = document.getElementById("name").value;
  if (email && password && emailConfirm && passwordConfirm && name) {
    document.getElementById("submit").disabled = false;
  }
});

document.getElementById("form2").addEventListener("submit", (event) => {
  event.preventDefault();
  const email2 = document.getElementById("email2").value || "";
  const password2 = document.getElementById("password2").value || "";

  let r = JSON.parse(localStorage.getItem("answer"));

  if (r == null) {
    document.getElementById("answer2").style.color = "red";
    document.getElementById("answer2").innerHTML = "You don't have an account!";
  }
  if (email2 !== r.email) {
    document.getElementById("answer2").style.color = "red";
    document.getElementById("answer2").innerHTML =
      "You're email doesnt match the confirmed one try again";
  }

  if (password2 != r.password) {
    document.getElementById("answer2").style.color = "red";
    document.getElementById("answer2").innerHTML =
      "You're pass doesnt match the confirmed one try again";
  }
  if (email2 && password2 && password2 === r.password && email2 === r.email) {
    document.getElementById("answer2").style.color = "green";
    document.getElementById("answer2").innerHTML =
      "Form Submitted Successfully";
    let userData = JSON.parse(localStorage.getItem("answer"));
    userData.logedin = true; 
    localStorage.setItem("answer", JSON.stringify(userData));

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 200);
  }
});
document.getElementById("form2").addEventListener("input", () => {
  document.getElementById("submit2").disabled = true;
  const email = document.getElementById("email2").value;
  const password = document.getElementById("password2").value;
  if (email && password) {
    document.getElementById("submit2").disabled = false;
  }
});

document.getElementById("btn1").addEventListener("click", () => {
  document.getElementById("form1").reset();
  document.getElementById("submit").disabled = true;
  appending(2);
  localStorage.setItem("append", "2");
});
document.getElementById("btn2").addEventListener("click", () => {
  document.getElementById("answer2").innerHTML = "";
  document.getElementById("submit2").disabled = true;
  document.getElementById("form2").reset();
  appending(1);
  localStorage.setItem("append", "1");
});

const appending = (pageNumber) => {
  const one = document.getElementById("one");
  const two = document.getElementById("two");

  if (pageNumber == 1) {
    one.style.display = "flex";
    two.style.display = "none";
  } else if (pageNumber == 2) {
    one.style.display = "none";
    two.style.display = "flex";
  }
};
