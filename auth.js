// DOM Elements
const registerForm = document.getElementById("register-form")
const loginForm = document.getElementById("login-form")
const signupForm = document.getElementById("signup-form")

// User data storage
const users = JSON.parse(localStorage.getItem("users")) || []

// Register form handler (for backward compatibility)
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const fullname = document.getElementById("fullname").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirm-password").value

    // Validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    // Check if user already exists
    if (users.find((user) => user.email === email)) {
      alert("User with this email already exists!")
      return
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      fullname,
      email,
      password, // In a real app, you would hash this password
      createdAt: new Date(),
    }

    // Add to users array
    users.push(newUser)

    // Save to localStorage
    localStorage.setItem("users", JSON.stringify(users))

    // Redirect to login
    alert("Registration successful! Please login.")
    window.location.href = "login.html"
  })
}

// Signup form handler
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form")
  const loginForm = document.getElementById("login-form")

  // User data storage
  const users = JSON.parse(localStorage.getItem("users")) || []

  // Signup form handler
  if (signupForm) {
    console.log("Signup form found")
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()
      console.log("Signup form submitted")

      const fullname = document.getElementById("fullname").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirm-password").value
      const terms = document.getElementById("terms").checked

      // Validation
      if (!terms) {
        alert("You must agree to the Terms and Conditions!")
        return
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match!")
        return
      }

      // Check if user already exists
      if (users.find((user) => user.email === email)) {
        alert("User with this email already exists!")
        return
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        fullname,
        email,
        password, // In a real app, you would hash this password
        createdAt: new Date(),
      }

      // Add to users array
      users.push(newUser)

      // Save to localStorage
      localStorage.setItem("users", JSON.stringify(users))

      // Redirect to login
      alert("Sign up successful! Please login to continue.")
      window.location.href = "login.html"
    })
  }

  // Login form handler
  if (loginForm) {
    console.log("Login form found")
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
      console.log("Login form submitted")

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const remember = document.getElementById("remember")?.checked

      // Find user
      const user = users.find((user) => user.email === email && user.password === password)

      if (!user) {
        alert("Invalid email or password!")
        return
      }

      // Set current user in localStorage
      const currentUser = {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
      }

      localStorage.setItem("currentUser", JSON.stringify(currentUser))

      // Set session expiry if remember me is not checked
      if (!remember) {
        const expiry = new Date()
        expiry.setHours(expiry.getHours() + 1) // 1 hour session
        localStorage.setItem("sessionExpiry", expiry.toString())
      } else {
        localStorage.removeItem("sessionExpiry")
      }

      console.log("Login successful, redirecting to dashboard")
      // Redirect to dashboard
      window.location.href = "dashboard.html"
    })
  }

  // Check if user is logged in
  function checkAuth() {
    const currentUser = localStorage.getItem("currentUser")
    const sessionExpiry = localStorage.getItem("sessionExpiry")
    const currentPage = window.location.pathname.split("/").pop() || "index.html"

    console.log("Current page:", currentPage)
    console.log("Current user:", currentUser)

    // If no user is logged in, allow access to index, login, and signup pages
    if (!currentUser) {
      // If trying to access dashboard or other protected pages, redirect to login
      if (currentPage === "dashboard.html") {
        console.log("Not logged in, redirecting to login")
        window.location.href = "login.html"
      }
      return
    }

    // Check if session has expired
    if (sessionExpiry && new Date() > new Date(sessionExpiry)) {
      localStorage.removeItem("currentUser")
      localStorage.removeItem("sessionExpiry")
      alert("Your session has expired. Please login again.")
      window.location.href = "login.html"
      return
    }

    // If on login, signup, or index page and already logged in, redirect to dashboard
    if (currentPage === "login.html" || currentPage === "signup.html" || currentPage === "index.html") {
      console.log("Already logged in, redirecting to dashboard")
      window.location.href = "dashboard.html"
    }
  }

  // Run auth check on page load
  checkAuth()
})

