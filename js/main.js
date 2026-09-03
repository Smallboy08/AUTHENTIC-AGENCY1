// =====================================
// Authentic Agency - main.js
// Base version: navigation, active link,
// year and form validation foundations
// =====================================

document.addEventListener("DOMContentLoaded", function () {
  setupNavigation();
  setActiveNav();
  setupYear();
  setupFormValidation();
});

// =====================================
// Mobile Navigation
// =====================================
function setupNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.getElementById("site-nav");

  if (!navToggle || !siteNav) return;

  navToggle.addEventListener("click", function () {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
    navToggle.textContent = isOpen ? "Close" : "Menu";
  });

  siteNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.textContent = "Menu";
    });
  });
}

// =====================================
// Active Navigation Highlighting
// =====================================
function setActiveNav() {
  const page = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".menu a").forEach(function (link) {
    if (link.getAttribute("href") === page) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

// =====================================
// Footer Year
// =====================================
function setupYear() {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

// =====================================
// Form Validation (used from Day 12)
// =====================================
function setupFormValidation() {
  const forms = document.querySelectorAll(".validate-form");

  forms.forEach(function (form) {
    const message = form.querySelector(".form-message");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let isValid = true;
      const requiredFields = form.querySelectorAll("[required]");

      requiredFields.forEach(function (field) {
        clearError(field);

        const label = form.querySelector('label[for="' + field.id + '"]');
        const labelText = label
          ? label.textContent.replace("*", "").trim()
          : "This field";

        if (field.type === "checkbox") {
          if (!field.checked) {
            showError(field, "Please accept this before submitting.");
            isValid = false;
          }
        } else if (!field.value.trim()) {
          showError(field, labelText + " is required.");
          isValid = false;
        } else if (field.type === "email" && !isValidEmail(field.value.trim())) {
          showError(field, "Please enter a valid email address.");
          isValid = false;
        }
      });

      if (isValid) {
        if (message) {
          message.textContent =
            "Thank you. Your enquiry has been prepared. In the final version, this form will be connected to an email or form service.";
          message.className = "form-message success";
        }
        form.reset();
      } else {
        if (message) {
          message.textContent = "Please check the highlighted fields and try again.";
          message.className = "form-message error";
        }
      }
    });

    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      field.addEventListener("input", function () { clearError(field); });
      field.addEventListener("change", function () { clearError(field); });
    });
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(field, message) {
  const wrapper = field.closest(".field");
  const error = wrapper ? wrapper.querySelector(".field-error") : null;

  field.classList.add("invalid");
  field.setAttribute("aria-invalid", "true");
  if (error) error.textContent = message;
}

function clearError(field) {
  const wrapper = field.closest(".field");
  const error = wrapper ? wrapper.querySelector(".field-error") : null;

  field.classList.remove("invalid");
  field.removeAttribute("aria-invalid");
  if (error) error.textContent = "";
}