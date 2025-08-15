document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "logoutBtn") {
    fetch("/logout", { method: "GET" }).then(() => {
      window.location.href = "/login.html";
    });
  }
});
