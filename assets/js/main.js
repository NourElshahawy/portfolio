let bar = document.querySelector("header nav .menu-bar");
let menu = document.querySelector("header nav ul");
let scrollTopBtn = document.getElementById("scroll-top");
let faqItems = document.querySelectorAll(".faq-question");

// القائمة الجانبية (Menu)
bar.addEventListener("click", function () {
  menu.classList.toggle("menu");
});

// زر Scroll to Top
window.onscroll = function () {
  if (window.scrollY > 100) {
    scrollTopBtn.classList.add("show");
    scrollTopBtn.classList.remove("hide");
  } else {
    scrollTopBtn.classList.add("hide");
    scrollTopBtn.classList.remove("show");
  }
};

scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* Form Submission */
document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Fetching form inputs
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Showing a success message after form submission
  const formMessage = document.querySelector(".form-message");
  formMessage.textContent = "Thank you, " + name + "! Your message has been sent successfully.";
  formMessage.style.visibility = "visible";
  formMessage.style.opacity = "1";

  setTimeout(() => {
    document.getElementById("contactForm").reset();
    formMessage.style.visibility = "hidden";
    formMessage.style.opacity = "0";
  }, 3000);
});

/* Testimonials */
const testimonials = [
  {
    text: '"WebDev Team turned our website into a modern, responsive platform. Their attention to detail and commitment are top-notch!"',
    name: "- Karim , CEO of Amit",
  },
  {
    text: '"The team delivered our project on time and went beyond our expectations. Our business has seen significant growth since the website overhaul."',
    name: "- Shady, Founder of StartUp KOD Solutions.",
  },
  {
    text: '"We were really impressed with the professionalism and expertise that WebDev Team brought to the table. Highly recommended!"',
    name: "- Nour,  Creative Solutions",
  },
];

let currentIndex = localStorage.getItem("testimonialIndex") || 0;

document.getElementById("nextTestimonial").addEventListener("click", function () {
  currentIndex = (currentIndex + 1) % testimonials.length;
  document.querySelector(".testimonial-text").textContent = testimonials[currentIndex].text;
  document.querySelector(".client-name").textContent = testimonials[currentIndex].name;
  localStorage.setItem("testimonialIndex", currentIndex); // حفظ الفهرس
});

// عرض التستيمونيال المحفوظ عند تحميل الصفحة
document.querySelector(".testimonial-text").textContent = testimonials[currentIndex].text;
document.querySelector(".client-name").textContent = testimonials[currentIndex].name;

/* FAQ State */
faqItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    const answer = item.nextElementSibling;
    const allAnswers = document.querySelectorAll(".faq-answer");

    allAnswers.forEach((ans) => {
      ans.style.display = "none";
      ans.previousElementSibling.classList.remove("active");
    });

    if (answer.style.display === "block") {
      answer.style.display = "none";
      item.classList.remove("active");
    } else {
      answer.style.display = "block";
      item.classList.add("active");
    }

    // حفظ حالة السؤال في localStorage
    const faqState = {};
    faqItems.forEach((faqItem, i) => {
      faqState[i] = faqItem.classList.contains("active");
    });
    localStorage.setItem("faqState", JSON.stringify(faqState));
  });
});

// استرجاع حالة الأسئلة من localStorage
const savedFaqState = JSON.parse(localStorage.getItem("faqState")) || {};
faqItems.forEach((item, index) => {
  if (savedFaqState[index]) {
    item.classList.add("active");
    item.nextElementSibling.style.display = "block";
  }
});

/* Settings Panel */
document.getElementById("settings-btn").addEventListener("click", function () {
  const panel = document.getElementById("settings-panel");
  panel.classList.toggle("active");
});

// تغيير لون الموقع
function changeColor(color) {
  document.body.style.backgroundColor = color;
  localStorage.setItem("siteColor", color); // حفظ اللون
}

// استرجاع لون الموقع عند التحميل
const savedColor = localStorage.getItem("siteColor");
if (savedColor) {
  document.body.style.backgroundColor = savedColor;
}
