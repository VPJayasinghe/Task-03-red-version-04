

// ================== Scroll to Top ==================
const scrollBtn = document.getElementById("scrollToTopBtn");
if (scrollBtn) {
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ================== Dark Mode Toggle ==================
const toggleBtn = document.getElementById("darkModeToggle");
const icon = document.getElementById("darkIcon");
const body = document.body;

if (toggleBtn && icon) {
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    icon.classList.replace("bi-moon-fill", "bi-sun-fill");
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const enabled = body.classList.contains("dark-mode");

    icon.classList.toggle("bi-moon-fill", !enabled);
    icon.classList.toggle("bi-sun-fill", enabled);
    localStorage.setItem("darkMode", enabled ? "enabled" : "disabled");

    // === Add this inside the same function ===
    const lightLogos = document.querySelectorAll(".light-logo");
    const darkLogos = document.querySelectorAll(".dark-logo");

    if (enabled) {
      lightLogos.forEach(el => el.style.display = "none");
      darkLogos.forEach(el => el.style.display = "inline");
    } else {
      lightLogos.forEach(el => el.style.display = "inline");
      darkLogos.forEach(el => el.style.display = "none");
    }
  });
} // <-- This closing brace was missing

// ================== AOS Init & Preloader ==================
if (typeof AOS !== "undefined") {
  AOS.init();
}

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => preloader.style.display = "none", 600);
  }
});

// ================== Bootstrap Carousel Progress ==================
const myCarousel = document.getElementById("carouselExampleIndicators");
if (myCarousel) {
  const carouselIndicators = myCarousel.querySelectorAll(".carousel-indicators button span");
  const carousel = new bootstrap.Carousel(myCarousel);
  let progressInterval;

  function resetIndicators() {
    carouselIndicators.forEach(indicator => {
      indicator.style.width = "0%";
    });
  }

  function animateActiveIndicator() {
    const activeSpan = myCarousel.querySelector(".carousel-indicators .active span");
    if (!activeSpan) return;
    let progress = 0;
    clearInterval(progressInterval);
    resetIndicators();

    progressInterval = setInterval(() => {
      if (progress >= 100) {
        clearInterval(progressInterval);
        carousel.next();
      } else {
        progress += 2;
        activeSpan.style.width = `${progress}%`;
      }
    }, 100);
  }

  window.addEventListener("load", animateActiveIndicator);
  myCarousel.addEventListener("slide.bs.carousel", () => clearInterval(progressInterval));
  myCarousel.addEventListener("slid.bs.carousel", animateActiveIndicator);
}

// ================== Contact Form (Optional for Contact Page) ==================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Sending...`;

    setTimeout(() => {
      alert("Message sent successfully! ✅");
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Send Message";
      contactForm.reset();
    }, 1500);
  });
}

// ================== Gallery Filtering ==================
const filterButtons = document.querySelectorAll('.gallery-filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove 'active' class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));

    // Add 'active' class to clicked button
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    galleryItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

FB.login(response => {
  if (response.authResponse) {
    console.log("Logged in!", response);
  }
});
AppleID.auth.init({
  clientId: "com.example.web",
  scope: "name email",
  redirectURI: "https://yourwebsite.com/callback",
  usePopup: true
});
// Login handling
document.getElementById("loginForm")?.addEventListener("submit", function(e){
    e.preventDefault();
    let email = document.getElementById("loginEmail").value;
    let pass = document.getElementById("loginPass").value;

    let storedEmail = localStorage.getItem("userEmail");
    let storedPass = localStorage.getItem("userPass");

    if(email === storedEmail && pass === storedPass){
        document.getElementById("pName").innerText = localStorage.getItem("userName");
        document.getElementById("pEmail").innerText = localStorage.getItem("userEmail");

        // Slide-in effect
        document.getElementById("profileSidebar").classList.add("active");
    } else {
        alert("Invalid email or password!");
    }
});

// Logout
function logout(){
    localStorage.clear();
    document.getElementById("profileSidebar").classList.remove("active");
}

document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const fullname = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const country = document.getElementById('country').value;
  const age = parseInt(document.getElementById('age').value);
  const ageConfirm = document.getElementById('ageConfirm').checked;

  // AGE VALIDATION
  if (isNaN(age) || age < 15) {
    alert("You must be at least 15 years old to create an account.");
    return;
  }

  if (!ageConfirm) {
    alert("You must confirm that you are 15 years or older.");
    return;
  }

  if (!validatePassword(password)) {
    alert("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Save user in localStorage (demo only, not secure!)
  localStorage.setItem('explorelk_user', JSON.stringify({ 
    fullname, 
    email, 
    username, 
    password,
    gender,
    country,
    age
  }));
  
  alert('Signup successful! You can now log in.');
  window.location.href = 'login.html';
});


// ================== DOB Setup ==================

// Auto-generate year options (from current year back to 100 years ago)
function populateYears() {
  const yearSelect = document.getElementById("dobYear");
  const currentYear = new Date().getFullYear();

  for (let y = currentYear; y >= currentYear - 100; y--) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
  }
}

// Auto-populate days based on month + year
function populateDays() {
  const daySelect = document.getElementById("dobDay");
  const month = parseInt(document.getElementById("dobMonth").value);
  const year = parseInt(document.getElementById("dobYear").value);

  if (!month || !year) return;

  const daysInMonth = new Date(year, month, 0).getDate();

  daySelect.innerHTML = '<option value="">Day</option>';
  for (let d = 1; d <= daysInMonth; d++) {
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    daySelect.appendChild(opt);
  }
}

// ================== Validation ==================

document.getElementById("dobMonth").addEventListener("change", populateDays);
document.getElementById("dobYear").addEventListener("change", populateDays);

document.addEventListener("DOMContentLoaded", populateYears);

document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const dobDay = parseInt(document.getElementById("dobDay").value);
  const dobMonth = parseInt(document.getElementById("dobMonth").value) - 1; // zero-based
  const dobYear = parseInt(document.getElementById("dobYear").value);
  const ageConfirm = document.getElementById("ageConfirm").checked;

  if (!dobDay || !dobMonth || !dobYear) {
    alert("Please select your full date of birth.");
    return;
  }

  const today = new Date();
  const birthDate = new Date(dobYear, dobMonth, dobDay);

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 15) {
    alert("You must be at least 15 years old to create an account.");
    return;
  }

  if (!ageConfirm) {
    alert("You must confirm that you are 15 years or older.");
    return;
  }

  // ✅ Success flow
  alert("Signup successful ✅");
  window.location.href = "login.html";
});






