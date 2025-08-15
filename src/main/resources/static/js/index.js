// 공통 navbar 로드
fetch("/navbar.html")
  .then(res => res.text())
  .then(html => (document.getElementById("navbar").innerHTML = html));

// 로그인 상자 버튼 이동
document.addEventListener("click", (e) => {
  if (e.target.id === "goLogin") {
    window.location.href = "/login.html";
  }
  if (e.target.id === "goFindId" || e.target.id === "goFindPw" || e.target.id === "goSignup") {
    alert("해당 페이지는 추후 제공됩니다.");
    e.preventDefault();
  }
});

// 검색 폼
const searchForm = document.getElementById("searchForm");
const qInput = document.getElementById("q");
const resultTabs = document.getElementById("resultTabs");
const tabContents = document.getElementById("tabContents");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const q = qInput.value.trim();
  if (!q) return;
  // 검색 성공 가정하고 탭 노출
  resultTabs.style.display = "flex";
  tabContents.style.display = "block";
  // 기본 탭은 '관광지'
  setActiveTab("attraction");
});

// 탭 전환
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("tab-btn")) {
    const t = e.target.dataset.target;
    setActiveTab(t);
  }
});

function setActiveTab(id) {
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
  const btn = document.querySelector(`.tab-btn[data-target="${id}"]`);
  const pane = document.getElementById(id);
  if (btn) btn.classList.add("active");
  if (pane) pane.classList.add("active");
}

// 보드로 이동(로그인 필요)
document.addEventListener("click", async (e) => {
  if (e.target.id === "goBoardBtn") {
    // 백엔드에서 비로그인 시 401을 주는 것으로 가정
    try {
      const res = await fetch("/api/posts", { method: "GET" });
      if (res.status === 401) {
        alert("로그인 후 이용해주세요.");
        window.location.href = "/login.html";
        return;
      }
      window.location.href = "/postList.html";
    } catch {
      alert("서버 연결을 확인해주세요.");
    }
  }
});

// 세계 지도 클릭 → 간단히 입력창 채우고 검색 실행
document.getElementById("worldMap").addEventListener("click", () => {
  // 데모: 임의로 'Seoul, South Korea' 입력
  qInput.value = "Seoul, South Korea";
  searchForm.dispatchEvent(new Event("submit"));
});
