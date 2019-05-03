var googleProvider = new firebase.auth.GoogleAuthProvider();
var facebookProvider = new firebase.auth.FacebookAuthProvider();

document.querySelector("#email-signup").addEventListener("click", () => {
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  console.log("email :", email, "password : ", password);
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      if (user.additionalUserInfo.isNewUser) {
        axios.post("/signup/email", user).then(() => {
          window.location.href = "/";
        });
      }
    });
});

// Google
document.querySelector("#google-signin").addEventListener("click", () => {
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then(result => {
      console.log(result);
      if (result.additionalUserInfo.isNewUser) {
        axios.post("/signup/provider", result).then(() => {
          window.location.href = "/";
        });
      } else {
        axios.post("/login", result).then(() => {
          window.location.href = "/";
        });
      }
    });
});
// Facebook
document.querySelector("#facebook-signin").addEventListener("click", () => {
  console.log("clicked");
  firebase
    .auth()
    .signInWithPopup(facebookProvider)
    .then(result => {
      if (result.additionalUserInfo.isNewUser) {
        axios.post("/signup/provider", result).then(() => {
          window.location.href = "/";
        });
      } else {
        axios.post("/login", result).then(() => {
          window.location.href = "/";
        });
      }
    });
});
