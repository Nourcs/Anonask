var googleProvider = new firebase.auth.GoogleAuthProvider();
var facebookProvider = new firebase.auth.FacebookAuthProvider();

// Email
document.querySelector("#email-signin").addEventListener("click", () => {
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      axios.post("/login/email", user);
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
        axios.post("/login/provider", result);
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
        axios.post("/login/provider", result);
      }
    });
});
