async function loginUser(username, password) {
  const url = "http://localhost:3001/api/v1/auth";

  const data = {
    id: username,
    password: password,
  };

  const response=await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  const resp=await response.json();
  console.log(resp);
  const token=resp.token;

  localStorage.setItem('jwtToken',token)

    // .then((response) => {
    //   console.log(response.status);
    //   console.log(response.body)
    //   // if(response.status==200){
        // window.location.href='http://localhost:5500/views/blog.html'
    //   // }

    // })
    // .catch((error) => {
    //   console.error("There was a problem with the fetch operation:", error);
    // });
}

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    loginUser(username, password);
  });
