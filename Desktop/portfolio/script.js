// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// Initialize particles.js
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#8b5cf6" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#8b5cf6",
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      out_mode: "out",
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 0.5 } },
      push: { particles_nb: 4 },
    },
  },
  retina_detect: true,
})

// Custom cursor
const cursor = document.getElementById("cursor")
const cursorFollower = document.getElementById("cursorFollower")

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px"
  cursor.style.top = e.clientY + "px"

  setTimeout(() => {
    cursorFollower.style.left = e.clientX + "px"
    cursorFollower.style.top = e.clientY + "px"
  }, 100)
})

// Hide cursor on mobile
if (window.innerWidth <= 768) {
  cursor.style.display = "none"
  cursorFollower.style.display = "none"
  document.body.style.cursor = "auto"
}

// Navbar scroll effect
const navbar = document.getElementById("navbar")
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileMenu = document.getElementById("mobileMenu")
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")
  const icon = mobileMenuBtn.querySelector("i")
  if (mobileMenu.classList.contains("active")) {
    icon.className = "fas fa-times"
  } else {
    icon.className = "fas fa-bars"
  }
})

// Close mobile menu when clicking on a link
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    mobileMenuBtn.querySelector("i").className = "fas fa-bars"
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="/assets/Aniket_Resume.pdf"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: target,
          offsetY: 100,
        },
        ease: "power2.inOut",
      })
    }
  })
})

// GSAP Animations
// Hero animations
gsap.fromTo(".hero-title", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out" })

gsap.fromTo(".hero-subtitle", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: "power3.out" })

gsap.fromTo(".hero-cta", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: "power3.out" })

gsap.fromTo(".hero-social", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: "power3.out" })

// Section title animations
gsap.utils.toArray(".section-title").forEach((title) => {
  gsap.fromTo(
    title,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    },
  )
})

// About section animations
gsap.fromTo(
  ".about-image",
  { x: -50, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: ".about-image",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  },
)

gsap.fromTo(
  ".about-content",
  { x: 50, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: ".about-content",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  },
)

// Education timeline animations
gsap.utils.toArray(".education-item").forEach((item, index) => {
  gsap.fromTo(
    item,
    { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    },
  )
})

// Skills animations
gsap.utils.toArray(".skill-card").forEach((card, index) => {
  gsap.fromTo(
    card,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      delay: index * 0.1,
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    },
  )
})

// Skill progress bars
gsap.utils.toArray(".skill-bar").forEach((bar) => {
  const width = bar.getAttribute("data-width")
  gsap.fromTo(
    bar,
    { width: "0%" },
    {
      width: width + "%",
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: bar,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    },
  )
})

// Project cards animations
gsap.utils.toArray(".project-card").forEach((card, index) => {
  gsap.fromTo(
    card,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay: index * 0.2,
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    },
  )
})

// Timeline animations
gsap.utils.toArray(".timeline-item").forEach((item, index) => {
  gsap.fromTo(
    item,
    { opacity: 0, x: index % 2 === 0 ? 50 : -50 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    },
  )
})

// Contact section animations
gsap.fromTo(
  ".contact-info",
  { y: 50, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".contact-info",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  },
)

gsap.fromTo(
  ".contact-form",
  { y: 50, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".contact-form",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  },
)

// Form submission
document.querySelector(".contact-form").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  // Simple validation
  if (!name || !email || !message) {
    alert("Please fill in all fields")
    return
  }

  // Simulate form submission
  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.innerHTML

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
  submitBtn.disabled = true

  setTimeout(() => {
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!'
    setTimeout(() => {
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
      this.reset()
    }, 2000)
  }, 2000)
})

// Add hover effects to interactive elements
document.querySelectorAll(".btn, .social-link, .project-link, .nav-link").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    gsap.to(cursor, { scale: 1.5, duration: 0.2 })
    gsap.to(cursorFollower, { scale: 1.2, duration: 0.2 })
  })

  element.addEventListener("mouseleave", () => {
    gsap.to(cursor, { scale: 1, duration: 0.2 })
    gsap.to(cursorFollower, { scale: 1, duration: 0.2 })
  })
})

// Parallax effect for hero section
gsap.to("#particles-js", {
  yPercent: -50,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
})

// Loading animation
window.addEventListener("load", () => {
  gsap.to(".hero", { opacity: 1, duration: 0.5 })
})

// Add active class to current navigation item
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top
    if (sectionTop <= 150) {
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
