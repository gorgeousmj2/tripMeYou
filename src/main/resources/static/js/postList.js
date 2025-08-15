// navbar.html을 동적으로 불러와 삽입
fetch("/navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
  });

// 게시글 목록 불러오기
window.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("postListContainer");

  const res = await fetch("/api/posts"); // 백엔드에서 GET 방식으로 목록 제공해야 함
  const posts = await res.json();

  if (posts.length === 0) {
    container.innerHTML = "<p>작성된 게시글이 없습니다.</p>";
    return;
  }

  posts.forEach(post => {
    const div = document.createElement("div");
    div.classList.add("post-card");
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small>작성자: ${post.writer} | ${new Date(post.createdAt).toLocaleString()}</small>
      <hr>
    `;
    container.appendChild(div);
  });
});
