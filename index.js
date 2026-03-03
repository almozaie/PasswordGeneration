const allCharacters = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
  "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
  "0","1","2","3","4","5","6","7","8","9",
  "~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"
];

const alphanumericCharacters = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
  "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
  "0","1","2","3","4","5","6","7","8","9"
];

const symbolsToggle = document.getElementById("symbols-toggle");
const box1 = document.getElementById("password-box1");
const box2 = document.getElementById("password-box2");

function generatePassword(charset) {
  let password = "";
  for (let i = 0; i < 15; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  return password;
}

function setPasswordText(box, text) {
  const existingText = Array.from(box.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
  if (existingText) {
    existingText.textContent = text;
  } else {
    box.insertBefore(document.createTextNode(text), box.firstChild);
  }
}

function passwordBox() {
  const charset = symbolsToggle.checked ? allCharacters : alphanumericCharacters;
  setPasswordText(box1, generatePassword(charset));
  setPasswordText(box2, generatePassword(charset));
}

const clipboardSVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
</svg>`;

const checkSVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="20 6 9 17 4 12"></polyline>
</svg>`;

function showCopiedFeedback(btn) {
  btn.innerHTML = checkSVG;
  btn.classList.add("copied");
  setTimeout(() => {
    btn.innerHTML = clipboardSVG;
    btn.classList.remove("copied");
  }, 1800);
}

function copyPassword(boxId, btn) {
  const box = document.getElementById(boxId);
  const textNode = Array.from(box.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
  if (!textNode || !textNode.textContent) return;

  const text = textNode.textContent;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showCopiedFeedback(btn);
    }).catch(() => {
      fallbackCopy(text, btn);
    });
  } else {
    fallbackCopy(text, btn);
  }
}

function fallbackCopy(text, btn) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand("copy");
    showCopiedFeedback(btn);
  } catch (e) {
    // copy not supported
  }
  document.body.removeChild(ta);
}
