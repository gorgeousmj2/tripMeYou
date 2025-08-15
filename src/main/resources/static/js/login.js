document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // 새로고침 방지

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
  });

  if (res.redirected) {
    // 로그인 성공 시 리디렉트
    window.location.href = res.url;
  } else {
    alert("로그인 실패! 아이디 또는 비밀번호를 확인하세요.");
  }
});
