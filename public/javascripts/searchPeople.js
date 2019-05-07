document.querySelector("#search-people").addEventListener("input", e => {
  if (e.target.value) {
    axios.post("people/search", { name: e.target.value }).then(res => {
      let arr = [...res.data];
      let name = e.target.value.toLowerCase();
      arr.sort((a, b) => {
        return a.fullName.indexOf(name) - b.fullName.indexOf(name);
      });
      if (arr.length > 0) {
        let str = "";
        for (let i = 0; i < arr.length; i++) {
          str += ` <div class="card mx-auto mb-3">
          <div class="card-body d-flex align-items-center">
              <img style="width : 75px; height : 75px; border-radius : 100%;"
                  src="${arr[i].profilePicture}" />
              <h4 class="ml-3"><a href="/account/people/${arr[i]._id}">${
            arr[i].fullName
          }</a></h4>

          </div>
      </div>`;
        }
        document.querySelector("#users").innerHTML = str;
      } else {
        document.querySelector("#users").innerHTML = "";
      }
    });
  } else {
    document.querySelector("#users").innerHTML = "";
  }
});
