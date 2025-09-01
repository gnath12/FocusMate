let timer;
let duration = 25 * 60; // 25분
let elapsed = 0;

// 타이머 갱신
function updateDial() {
  elapsed++;
  let percent = elapsed / duration;
  let degrees = percent * 360;

  document.getElementById("dial").style.background =
    `conic-gradient(#6a5acd ${degrees}deg, #ddd ${degrees}deg)`;

  if (elapsed >= duration) clearInterval(timer);
}

// 시작 버튼
function startTimer() {
  if (timer) clearInterval(timer); // 중복 실행 방지
  elapsed = 0;
  timer = setInterval(updateDial, 1000);
}

// 리셋 버튼
function resetTimer() {
  clearInterval(timer);
  elapsed = 0;
  document.getElementById("dial").style.background =
    "conic-gradient(#6a5acd 0deg, #ddd 0deg)";
}
