firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("User : ", user);
  } else {
    console.log("No user is signed in.");
    axios.post("/logout");
  }
});

if (document.querySelector("#logout")) {
  document.querySelector("#logout").addEventListener("click", () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        axios.post("/logout").then(() => {
          window.location.href = "/";
        });
      });
  });
}
