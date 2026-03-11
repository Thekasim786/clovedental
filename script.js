/* ════════════════════════════════════════════════════
   CLOVE DENTAL — script.js
   All validation, captcha, toasts + original features
════════════════════════════════════════════════════ */

const CAPTCHA_CODE = "1514";

/* ── Toast ── */
function showToast(msg, isError) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = "toast-show" + (isError ? " toast-error" : "");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(function () {
    toast.className = "";
  }, 3500);
}

/* ── Field validators ── */
function validName(v)    { return v.trim().length >= 2; }
function validMobile(v)  { return /^[6-9]\d{9}$/.test(v.trim()); }
function validCaptcha(v) { return v.trim() === CAPTCHA_CODE; }

/* ── Mark a field valid / invalid ── */
function setFieldState(input, errorEl, isValid) {
  input.classList.toggle("valid", isValid);
  input.classList.toggle("invalid", !isValid);
  if (isValid) {
    errorEl.classList.remove("visible");
  } else {
    errorEl.classList.add("visible");
  }
  return isValid;
}

/* ── Live-clear error as user fixes input ── */
function bindLive(input, errorEl, validator) {
  input.addEventListener("input", function () {
    if (validator(this.value)) {
      this.classList.remove("invalid");
      this.classList.add("valid");
      errorEl.classList.remove("visible");
    }
  });
}

/* ── Only allow digits in tel inputs ── */
function digitsOnly(input) {
  input.addEventListener("keypress", function (e) {
    if (!/\d/.test(e.key)) e.preventDefault();
  });
  input.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
  });
}

/* ── Reset field state classes after successful submit ── */
function clearStates() {
  var inputs = Array.prototype.slice.call(arguments);
  inputs.forEach(function (el) {
    if (el) el.classList.remove("valid", "invalid");
  });
}

/* ════════════════════════════════════════════════════
   HERO FORM
════════════════════════════════════════════════════ */
function initHeroForm() {
  var form      = document.getElementById("heroForm");
  var submitBtn = document.getElementById("heroSubmitBtn");
  if (!form || !submitBtn) return;

  var nameEl    = document.getElementById("hero-name");
  var mobileEl  = document.getElementById("hero-mobile");
  var captchaEl = document.getElementById("hero-captcha");
  var termsEl   = document.getElementById("terms1");
  var nameErr   = document.getElementById("hero-name-err");
  var mobErr    = document.getElementById("hero-mobile-err");
  var capErr    = document.getElementById("hero-captcha-err");
  var termsErr  = document.getElementById("hero-terms-err");

  /* Block any native submit from firing */
  form.addEventListener("submit", function (e) { e.preventDefault(); });

  bindLive(nameEl,    nameErr,  validName);
  bindLive(mobileEl,  mobErr,   validMobile);
  bindLive(captchaEl, capErr,   validCaptcha);
  digitsOnly(mobileEl);

  submitBtn.addEventListener("click", function () {
    var ok = true;
    ok = setFieldState(nameEl,    nameErr,  validName(nameEl.value))    && ok;
    ok = setFieldState(mobileEl,  mobErr,   validMobile(mobileEl.value)) && ok;
    ok = setFieldState(captchaEl, capErr,   validCaptcha(captchaEl.value)) && ok;

    if (!termsEl.checked) {
      termsEl.classList.add("invalid");
      termsErr.classList.add("visible");
      ok = false;
    } else {
      termsEl.classList.remove("invalid");
      termsErr.classList.remove("visible");
    }

    if (!ok) {
      showToast("Please fix the errors before submitting.", true);
      return;
    }

    showToast("🎉 Consultation booked! We'll call you shortly.");
    form.reset();
    termsEl.checked = false;
    clearStates(nameEl, mobileEl, captchaEl);
  });
}

/* ════════════════════════════════════════════════════
   BOOKING FORM
   (submit button is outside the <form> tag in HTML)
════════════════════════════════════════════════════ */
function initBookingForm() {
  var form      = document.getElementById("bookingForm");
  var submitBtn = document.getElementById("bookingSubmitBtn");
  if (!form || !submitBtn) return;

  var nameEl    = document.getElementById("book-name");
  var mobileEl  = document.getElementById("book-mobile");
  var captchaEl = document.getElementById("book-captcha");
  var termsEl   = document.getElementById("terms2");
  var nameErr   = document.getElementById("book-name-err");
  var mobErr    = document.getElementById("book-mobile-err");
  var capErr    = document.getElementById("book-captcha-err");
  var termsErr  = document.getElementById("book-terms-err");

  form.addEventListener("submit", function (e) { e.preventDefault(); });

  bindLive(nameEl,    nameErr,  validName);
  bindLive(mobileEl,  mobErr,   validMobile);
  bindLive(captchaEl, capErr,   validCaptcha);
  digitsOnly(mobileEl);

  submitBtn.addEventListener("click", function () {
    var ok = true;
    ok = setFieldState(nameEl,    nameErr,  validName(nameEl.value))      && ok;
    ok = setFieldState(mobileEl,  mobErr,   validMobile(mobileEl.value))  && ok;
    ok = setFieldState(captchaEl, capErr,   validCaptcha(captchaEl.value)) && ok;

    if (!termsEl.checked) {
      termsEl.classList.add("invalid");
      termsErr.classList.add("visible");
      ok = false;
    } else {
      termsEl.classList.remove("invalid");
      termsErr.classList.remove("visible");
    }

    if (!ok) {
      showToast("Please fix the errors before submitting.", true);
      return;
    }

    showToast("🎉 Appointment booked! We'll call you shortly.");
    form.reset();
    termsEl.checked = false;
    clearStates(nameEl, mobileEl, captchaEl);
  });
}

/* ════════════════════════════════════════════════════
   HEALTH PLAN FORM  (no captcha field)
════════════════════════════════════════════════════ */
function initPlanForm() {
  var form = document.getElementById("planForm");
  if (!form) return;

  var nameEl   = document.getElementById("plan-name");
  var mobileEl = document.getElementById("plan-mobile");
  var termsEl  = document.getElementById("terms3");
  var nameErr  = document.getElementById("plan-name-err");
  var mobErr   = document.getElementById("plan-mobile-err");
  var termsErr = document.getElementById("plan-terms-err");

  bindLive(nameEl,   nameErr, validName);
  bindLive(mobileEl, mobErr,  validMobile);
  digitsOnly(mobileEl);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    ok = setFieldState(nameEl,   nameErr, validName(nameEl.value))     && ok;
    ok = setFieldState(mobileEl, mobErr,  validMobile(mobileEl.value)) && ok;

    if (!termsEl.checked) {
      termsEl.classList.add("invalid");
      termsErr.classList.add("visible");
      ok = false;
    } else {
      termsEl.classList.remove("invalid");
      termsErr.classList.remove("visible");
    }

    if (!ok) {
      showToast("Please fix the errors before submitting.", true);
      return;
    }

    showToast("🎉 Consultation booked! We'll call you shortly.");
    form.reset();
    clearStates(nameEl, mobileEl);
  });
}

/* ════════════════════════════════════════════════════
   WHY CHOOSE — accordion
════════════════════════════════════════════════════ */
function toggleFeature(element) {
  var isActive = element.classList.contains("active");

  document.querySelectorAll(".feature-item").forEach(function (item) {
    item.classList.remove("active");
    var toggle = item.querySelector(".feature-toggle");
    if (toggle) toggle.textContent = "+";
  });

  if (!isActive) {
    element.classList.add("active");
    var toggle = element.querySelector(".feature-toggle");
    if (toggle) toggle.textContent = "−";
  }
}

/* ════════════════════════════════════════════════════
   FAQ — accordion
════════════════════════════════════════════════════ */
function toggleFAQ(element) {
  var faqItem = element.parentElement;
  var isActive = faqItem.classList.contains("active");

  document.querySelectorAll(".faq-item").forEach(function (item) {
    item.classList.remove("active");
  });

  if (!isActive) {
    faqItem.classList.add("active");
  }
}

/* ════════════════════════════════════════════════════
   DOMContentLoaded — wire everything up
════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {

  /* Forms */
  initHeroForm();
  initBookingForm();
  initPlanForm();

  /* Feature accordion — touch support */
  document.querySelectorAll(".feature-item").forEach(function (item) {
    item.addEventListener("touchstart", function () {
      this.style.backgroundColor = "#f0f0f0";
    });
    item.addEventListener("touchend", function (e) {
      e.preventDefault();
      this.style.backgroundColor = "";
      toggleFeature(this);
    });
  });

  /* Book / Consultation buttons (non-submit) → scroll to hero form */
  document.querySelectorAll(".btn").forEach(function (button) {
    if (button.id === "heroSubmitBtn") return; // skip our submit btn
    button.addEventListener("click", function (e) {
      var text = this.textContent.trim();
      if (
        this.type !== "submit" &&
        (text.includes("Book") || text.includes("Consultation"))
      ) {
        e.preventDefault();
        var heroRight = document.querySelector(".hero-right");
        if (heroRight) heroRight.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* Buy Now button */
  var planBuyBtn = document.querySelector(".plan-buy-btn");
  if (planBuyBtn) {
    planBuyBtn.addEventListener("click", function () {
      alert("Redirecting to payment gateway...");
    });
  }

  /* Learn More links */
  document.querySelectorAll(".learn-more").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      alert("More information about our safety protocols will be displayed here.");
    });
  });

  /* City cards */
  document.querySelectorAll(".city-card").forEach(function (card) {
    card.addEventListener("click", function () {
      var cityName = this.querySelector(".city-name").textContent;
      alert("Showing clinics in " + cityName + "...");
    });
  });

  /* Smooth scroll for anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

});