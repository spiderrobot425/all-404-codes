const codes = [
  [100, "Continue"],
  [101, "Switching Protocols"],
  [102, "Processing"],
  [200, "OK"],
  [201, "Created"],
  [204, "No Content"],
  [226, "IM Used"],
  [301, "Moved Permanently"],
  [302, "Found"],
  [308, "Permanent Redirect"],
  [400, "Bad Request"],
  [401, "Unauthorized"],
  [403, "Forbidden"],
  [404, "Not Found"],
  [405, "Method Not Allowed"],
  [418, "I'm a Teapot ☕"],
  [429, "Too Many Requests"],
  [451, "Unavailable For Legal Reasons"],
  [500, "Internal Server Error"],
  [502, "Bad Gateway"],
  [503, "Service Unavailable"],
  [504, "Gateway Timeout"],
  [511, "Network Auth Required"],

  // Fake codes:
  [600, "Out of Coffee ☕ (fake)"],
  [666, "Evil Gateway 👿 (fake)"],
  [777, "Jackpot 🎰 (fake)"],
  [900, "Quantum Error ⚛️ (fake)"],
  [999, "Rate Limited (fake)"],
  [1000, "Overflow Error 💥 (fake)"],
  [100500, "Explosion Detected 💣 (fake)"],
  [123456, "Critical Glitch 👾 (fake)"]
];

const fakeCodes = new Set([600, 666, 777, 900, 999, 1000, 100500, 123456]);

const list = document.getElementById("code-list");
const toggleBtn = document.getElementById("toggle-mode");

let useStatusPath = false;

// Replace this with your actual domain URL
const baseDomain = 'https://spiderrobot425.github.io/all-404-codes/';

function buildButtons() {
  list.innerHTML = ''; // Clear old buttons

  codes.forEach(([code, description]) => {
    const btn = document.createElement("button");
    btn.innerText = code;
    btn.className = "code-btn";
    btn.title = description;

    btn.onclick = () => {
      let url;
      if (fakeCodes.has(code)) {
        // Fake codes go to your domain with either /status/ or root path
        url = useStatusPath
          ? `${baseDomain}/status/${code}.html`
          : `${baseDomain}/${code}.html`;
      } else {
        // Real codes go to http.cat
        url = useStatusPath
          ? `https://http.cat/status/${code}`
          : `https://http.cat/${code}`;
      }
      window.location.href = url;
    };

    list.appendChild(btn);
  });
}

buildButtons();

toggleBtn.onclick = () => {
  useStatusPath = !useStatusPath;
  toggleBtn.innerText = useStatusPath
    ? "Switch to simple URL mode"
    : "Switch to /status/ URL mode";
  buildButtons();
};
