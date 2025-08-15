document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const res = await fetch("/api/posts/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });

  const msg = await res.text();
  alert(msg);
  if (res.ok) {
    window.location.href = "index.html";
  }
});
