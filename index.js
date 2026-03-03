const allChars      = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()_-+={[}],|:;<>.?/".split("");
const alphanumChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");

const symbolsToggle = document.getElementById("symbols-toggle");
const box1 = document.getElementById("password-box1");
const box2 = document.getElementById("password-box2");

function generatePassword(charset) {
  return Array.from({ length: 15 }, () => charset[Math.floor(Math.random() * charset.length)]).join("");
}

function setPasswordText(box, text) {
  const node = Array.from(box.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
  if (node) node.textContent = text;
  else box.insertBefore(document.createTextNode(text), box.firstChild);
}

function passwordBox() {
  const charset = symbolsToggle.checked ? allChars : alphanumChars;
  setPasswordText(box1, generatePassword(charset));
  setPasswordText(box2, generatePassword(charset));
}

const clipboardSVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
const checkSVG     = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

function showCopiedFeedback(btn) {
  btn.innerHTML = checkSVG;
  btn.classList.add("copied");
  setTimeout(() => { btn.innerHTML = clipboardSVG; btn.classList.remove("copied"); }, 1800);
}

async function copyPassword(boxId, btn) {
  const box = document.getElementById(boxId);
  const node = Array.from(box.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
  if (!node?.textContent) return;

  const text = node.textContent;
  let copied = false;

  if (navigator.clipboard?.writeText) {
    try { await navigator.clipboard.writeText(text); copied = true; } catch (e) {}
  }

  if (!copied) {
    const ta = document.createElement("textarea");
    ta.value = text;
    Object.assign(ta.style, { position: "fixed", opacity: "0" });
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { document.execCommand("copy"); copied = true; } catch (e) {}
    document.body.removeChild(ta);
  }

  if (copied) showCopiedFeedback(btn);
}
