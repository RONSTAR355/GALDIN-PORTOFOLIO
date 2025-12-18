// ===== NAVIGATION FUNCTIONALITY =====
const navbar = document.getElementById("navbar")
const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")
const navLinks = document.querySelectorAll(".nav-link")

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Mobile menu toggle
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Active nav link on scroll
const sections = document.querySelectorAll("section")

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById("backToTop")

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show")
  } else {
    backToTopBtn.classList.remove("show")
  }
})

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// ===== CONTACT FORM FUNCTIONALITY =====
const contactForm = document.getElementById("contactForm")
const formStatus = document.getElementById("formStatus")

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const submitBtn = contactForm.querySelector(".btn-submit")
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const subject = document.getElementById("subject").value
  const message = document.getElementById("message").value

  // Show loading state
  submitBtn.classList.add("loading")
  submitBtn.disabled = true
  formStatus.style.display = "none"

  // Simulate form submission (replace with actual API call)
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // For GitHub Pages deployment, you can integrate with:
    // - Formspree (https://formspree.io/)
    // - Netlify Forms
    // - EmailJS (https://www.emailjs.com/)
    // - Or use mailto link as fallback

    // Success feedback
    formStatus.className = "form-status success"
    formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`
    formStatus.style.display = "block"

    // Reset form
    contactForm.reset()

    // Optional: Open default email client as fallback
    const mailtoLink = `mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`
    // Uncomment to enable: window.location.href = mailtoLink;
  } catch (error) {
    // Error feedback
    formStatus.className = "form-status error"
    formStatus.textContent = "Oops! Something went wrong. Please try again or contact me directly via WhatsApp."
    formStatus.style.display = "block"
  } finally {
    // Remove loading state
    submitBtn.classList.remove("loading")
    submitBtn.disabled = false
  }
})

// Form validation
const formInputs = contactForm.querySelectorAll("input, textarea")

formInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    if (input.value.trim() === "") {
      input.style.borderColor = "var(--primary-red)"
    } else {
      input.style.borderColor = "var(--light-gray)"
    }
  })

  input.addEventListener("focus", () => {
    input.style.borderColor = "var(--primary-red)"
  })
})

// Email validation
const emailInput = document.getElementById("email")
emailInput.addEventListener("blur", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(emailInput.value)) {
    emailInput.style.borderColor = "var(--primary-red)"
  }
})

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(".skill-card, .project-card, .stat-card")

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (elementTop < windowHeight - 100) {
      element.classList.add("reveal", "active")
    }
  })
}

window.addEventListener("scroll", revealOnScroll)
revealOnScroll() // Initial check

// ===== TYPING EFFECT FOR HERO SUBTITLE =====
const subtitleElement = document.querySelector(".hero-subtitle")
const subtitleText = subtitleElement.textContent
let charIndex = 0

function typeEffect() {
  if (charIndex < subtitleText.length) {
    subtitleElement.textContent = subtitleText.substring(0, charIndex + 1)
    charIndex++
    setTimeout(typeEffect, 100)
  }
}

// Start typing effect after page load
window.addEventListener("load", () => {
  subtitleElement.textContent = ""
  setTimeout(typeEffect, 1500)
})

// ===== CURSOR EFFECT (Optional Enhancement) =====
document.addEventListener("mousemove", (e) => {
  const cursor = document.createElement("div")
  cursor.className = "cursor-effect"
  cursor.style.left = e.pageX + "px"
  cursor.style.top = e.pageY + "px"
  document.body.appendChild(cursor)

  setTimeout(() => {
    cursor.remove()
  }, 1000)
})

// ===== PROJECT CARDS TILT EFFECT =====
const projectCards = document.querySelectorAll(".project-card")

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)"
  })
})

// ===== SOCIAL LINKS ANIMATION =====
const socialIcons = document.querySelectorAll(".social-icon")

socialIcons.forEach((icon, index) => {
  icon.style.animationDelay = `${index * 0.1}s`
})

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images
const images = document.querySelectorAll("img")

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.classList.add("loaded")
      imageObserver.unobserve(img)
    }
  })
})

images.forEach((img) => {
  imageObserver.observe(img)
})

// ===== CONSOLE MESSAGE =====
console.log("%c👋 Hello, Developer!", "color: #dc143c; font-size: 20px; font-weight: bold;")
console.log("%cInterested in the code? Check out my GitHub!", "color: #999; font-size: 14px;")
console.log("%c© 2025 Sebastianus Efraye Galdyn", "color: #666; font-size: 12px;")
