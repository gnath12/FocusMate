let timer = null;
const duration = 25 * 60; // 25분(초단위)
let elapsed = 0;
let isAnalog = true;

// 버튼 요소
const analogBtn = document.getElementById("analogBtn");
const digitalBtn = document.getElementById("digitalBtn");

// 타이머 업데이트 함수
function updateDial() {
  elapsed++;
  if (elapsed > duration) {
    clearInterval(timer);
    timer = null;
    return;
  }

  const percent = elapsed / duration;
  const degrees = percent * 360;

  if (isAnalog) {
    const dial = document.getElementById("dial");
    dial.style.background = `conic-gradient(#015c2b ${degrees}deg, #ddd ${degrees}deg)`;
  } else {
    const timeDisplay = document.getElementById("timeDisplay");
    const remaining = duration - elapsed;
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}

// 타이머 시작
function startTimer() {
  if (timer) return;

  if (isAnalog) {
    document.getElementById("dial").style.background = "conic-gradient(#6a5acd 0deg, #ddd 0deg)";
  } else {
    document.getElementById("timeDisplay").textContent = "25:00";
  }

  timer = setInterval(updateDial, 1000);
}

// 타이머 중단
function stopTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

// 타이머 리셋
function resetTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  elapsed = 0;

  if (isAnalog) {
    document.getElementById("dial").style.background = "conic-gradient(#6a5acd 0deg, #ddd 0deg)";
  } else {
    const timeDisplay = document.getElementById("timeDisplay");
    timeDisplay.textContent = "25:00";
  }
}

// 아날로그 모드 설정
function setAnalogMode() {
  isAnalog = true;

  const dial = document.getElementById("dial");
  const timeDisplay = document.getElementById("timeDisplay");
  timeDisplay.classList.add("hidden");
  dial.style.background = "conic-gradient(#6a5acd 0deg, #ddd 0deg)";

  analogBtn.classList.add("active");
  digitalBtn.classList.remove("active");
}

// 디지털 모드 설정
function setDigitalMode() {
  isAnalog = false;

  const dial = document.getElementById("dial");
  const timeDisplay = document.getElementById("timeDisplay");
  timeDisplay.classList.remove("hidden");
  timeDisplay.textContent = "25:00";
  dial.style.background = "#fff";

  digitalBtn.classList.add("active");
  analogBtn.classList.remove("active");
}

// 페이지 로드 시 아날로그 모드 기본 설정
window.onload = () => {
  setAnalogMode();
};