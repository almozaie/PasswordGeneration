const allChars      = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()_-+={[}],|:;<>.?/".split("");
const alphanumChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");

const symbolsToggle = document.getElementById("symbols-toggle");
const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");

function generatePassword(charset) {
  let password = "";
  for (let i = 0; i < 15; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  return password;
}

function passwordBox() {
  const charset = symbolsToggle.checked ? allChars : alphanumChars;
  text1.textContent = generatePassword(charset);
  text2.textContent = generatePassword(charset);
}

const clipboardSVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
const checkSVG     = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
//review the function here
function copyPassword(spanId, btn) {
  const text = document.getElementById(spanId).textContent;
  if (!text) return;

  navigator.clipboard.writeText(text).then(function () {
    btn.innerHTML = checkSVG;
    btn.classList.add("copied");
    setTimeout(function () {
      btn.innerHTML = clipboardSVG;
      btn.classList.remove("copied");
    }, 1800);
  });
}
