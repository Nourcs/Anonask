let deleteBtns = document.querySelectorAll("#delete-post");
for (let i = 0; i < deleteBtns.length; i++) {
  deleteBtns[i].addEventListener("click", e => {
    let postId = e.target.attributes.postId.value;
    let questionId = e.target.attributes.questionId.value;
    let confirm = window.confirm(
      "Are you sure you want to remove your answer? The question will go back into your “Questions” section."
    );
    if (confirm) {
      axios.post("/profile/delete/", { postId, questionId }).then(() => {
        window.location.href = "/profile";
      });
    }
  });
}
