let timer;
let duration = 25 * 60; // 25분
let elapsed = 0;
let isAnalog = true; // 기본은 아날로그 모드

// 버튼 요소 가져오기
const analogBtn = document.getElementById("analogBtn");
const digitalBtn = document.getElementById("digitalBtn");

// 타이머 갱신
function updateDial() {
  elapsed++;
  let percent = elapsed / duration;
  let degrees = percent * 360;

  if (isAnalog) {
    document.getElementById("dial").style.background =
      `conic-gradient(#6a5acd ${degrees}deg, #ddd ${degrees}deg)`;
  } else {
    let remaining = duration - elapsed;
    let minutes = Math.floor(remaining / 60);
    let seconds = remaining % 60;
    document.getElementById("timeDisplay").textContent =
      `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  if (elapsed >= duration) clearInterval(timer);
}

// 시작 버튼
function startTimer() {
  if (timer) clearInterval(timer);
  elapsed = 0;
  document.getElementById("timeDisplay").textContent = "25:00";
  timer = setInterval(updateDial, 1000);
}

// 리셋 버튼
function resetTimer() {
  clearInterval(timer);
  elapsed = 0;
  if (isAnalog) {
    document.getElementById("dial").style.background =
      "conic-gradient(#6a5acd 0deg, #ddd 0deg)";
  } else {
    document.getElementById("timeDisplay").textContent = "25:00";
  }
}

// 아날로그 모드
function setAnalogMode() {
  isAnalog = true;
  const dial = document.getElementById("dial");
  const timeDisplay = document.getElementById("timeDisplay");

  timeDisplay.classList.add("hidden");
  dial.style.background = "conic-gradient(#6a5acd 0deg, #ddd 0deg)";

  // 버튼 활성화 표시
  analogBtn.classList.add("active");
  digitalBtn.classList.remove("active");
}

// 디지털 모드
function setDigitalMode() {
  isAnalog = false;
  const dial = document.getElementById("dial");
  const timeDisplay = document.getElementById("timeDisplay");

  timeDisplay.classList.remove("hidden");
  timeDisplay.textContent = "25:00";
  dial.style.background = "#fff";

  // 버튼 활성화 표시
  digitalBtn.classList.add("active");
  analogBtn.classList.remove("active");
}

// 페이지 처음 로드될 때 아날로그 모드 버튼 활성화
window.onload = () => {
  setAnalogMode();
};
