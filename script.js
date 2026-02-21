// ===== script.js =====

// Дозволені користувачі
const users = ["andriy", "maria", "serhii", "minecrafter", "juniorit", "aaa123", "mark", "danya", "egor", "sonya"];

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
    document.body.classList.remove("bg-andriy", "bg-maria", "bg-serhii", "bg-minecrafter", "sonya");
    document.body.classList.add(bgClasses[currentUser]);
  } else {
    welcomeEl.textContent = "Помилка входу";
  }
}