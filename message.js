const STORE_KEY = "message:today:v1";

const MESSAGES = [
  "오늘도 한 걸음, 작아도 전진이야.",
  "완벽 말고 진행! 20분만 달려보자.",
  "기록이 증거가 된다. 한 줄이라도 남기자.",
  "멈춰도 괜찮아, 다시 시작하면 돼.",
  "집중은 근육. 오늘도 1세트!",
  "작은 승리 하나면 충분해.",
  "어제보다 1%만 나아지자.",
  "내가 나를 만든다. 지금 이 선택으로.",
  "리듬을 타면 쉬워진다. 가볍게 출발!",
  "시작하면 절반은 끝난 거야.",
  "Great things take time.",
  "Becoming a better version of me.",
  "You`re glowing all the time.",
  "As time flows, dreams grow.",
  "You are strong enough to realize your dream."
];

function dateKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// 오늘의 메시지 가져오기(당일 고정, 랜덤 선택)
function getTodayMessage() {
  const key = dateKey();
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    if (saved?.key === key && Number.isInteger(saved.idx)) {
      return MESSAGES[saved.idx % MESSAGES.length];
    }
    const idx = Math.floor(Math.random() * MESSAGES.length);
    localStorage.setItem(STORE_KEY, JSON.stringify({ key, idx }));
    return MESSAGES[idx];
  } catch {
    const idx = Math.floor(Date.now() / 86400000) % MESSAGES.length;
    return MESSAGES[(idx + MESSAGES.length) % MESSAGES.length];
  }
}

// 자정까지 남은 밀리초 계산
function msUntilMidnight() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  return next - now;
}

// 렌더
function renderMessage() {
  const box = document.getElementById("message-box");
  if (!box) return;
  box.setAttribute("aria-live", "polite");
  box.textContent = getTodayMessage();
}

// 첫 렌더
renderMessage();

// 자정에 자동 갱신(페이지 켜둔 상태)
setTimeout(() => {
  localStorage.removeItem(STORE_KEY);
  renderMessage();
  setInterval(() => {
    localStorage.removeItem(STORE_KEY);
    renderMessage();
  }, 24 * 60 * 60 * 1000);
}, msUntilMidnight());
