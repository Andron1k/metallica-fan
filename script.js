// ===== script.js =====

// Дозволені користувачі
const users = ["andriy", "maria", "serhii", "minecrafter", "juniorit", "aaa123", "mark", "danya", "egor", "sonya", "glib", "kostya", "lyoha"];

// Привітання для success.html
const greetings = {
  andriy: "Привіт, Андрію!",
  maria: "Вітаємо, Маріє!",
  serhii: "Доброго дня, Сергію!", 
  minecrafter: "Хелоу-хелоу! Вітаємо на сайті!",
  sonya:"Привіт Соня, як твої справи?!"
};

// CSS-класи для фону на success.html
const bgClasses = {
  andriy: "bg-andriy",
  maria: "bg-maria",
  serhii: "bg-serhii",
  minecrafter: "bg-minecrafter",
  sonya:"bg-sonya"
};

// -------------------- login.html --------------------
const form = document.getElementById("loginForm");
const loginInput = document.getElementById("login");
const errorMessage = document.getElementById("errorMessage");

if (form && loginInput && errorMessage) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const loginValue = loginInput.value.trim().toLowerCase();

    if (users.includes(loginValue)) {
      errorMessage.textContent = "";
      localStorage.setItem("currentUser", loginValue);
      window.location.href = "success.html";
    } else {
      localStorage.removeItem("currentUser");
      errorMessage.textContent = "Помилка входу";
    }
  });
}

// -------------------- success.html --------------------
const welcomeEl = document.getElementById("welcomeMessage");

if (welcomeEl) {
  const currentUser = localStorage.getItem("currentUser");

  if (currentUser && users.includes(currentUser)) {
    // 1) Текст
    welcomeEl.textContent = greetings[currentUser];

    // 2) Фон (через клас на body)
    document.body.classList.remove("bg-andriy", "bg-maria", "bg-serhii", "bg-minecrafter", "bg-sonya");
    document.body.classList.add(bgClasses[currentUser]);
  } else {
    welcomeEl.textContent = "Помилка входу";
  }
}


// ===== Popup (toast) для помилок на login.html =====
const toast = document.getElementById("loginToast");
const toastClose = document.getElementById("toastClose");
const toastText = document.getElementById("toastText");

function showToast(message) {
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add("is-open");
  toast.setAttribute("aria-hidden", "false");

  // Автоматично сховати через 3.5 секунди (можеш змінити)
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(hideToast, 3500);
}

function hideToast() {
  if (!toast) return;
  toast.classList.remove("is-open");
  toast.setAttribute("aria-hidden", "true");
}

// Закриття по "×"
if (toastClose) {
  toastClose.addEventListener("click", hideToast);
}

// Закриття по ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") hideToast();
});

// ✅ Підключаємо до твоєї існуючої логіки:
// НЕ змінюємо твою перевірку, а просто "підсилюємо" повідомлення.
if (form && loginInput && errorMessage) {
  form.addEventListener("submit", function () {
    // Якщо з’явилась помилка (ти вже ставиш "Помилка входу")
    if (errorMessage.textContent && errorMessage.textContent.trim() !== "") {
      showToast("Неправильний логін. Перевірте введення та спробуйте ще раз.");
    }
  });
}