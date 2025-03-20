// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  const sidebarToggle = document.getElementById("sidebar-toggle")
  const sidebar = document.querySelector(".sidebar")
  const sidebarItems = document.querySelectorAll(".sidebar-nav li")
  const contentSections = document.querySelectorAll(".content-section")
  const profileBtn = document.querySelector(".profile-btn")
  const dropdownContent = document.querySelector(".dropdown-content")

  // Current user
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  console.log("Dashboard loaded, current user:", currentUser)

  // Initialize dashboard
  function initDashboard() {
    // Check if user is logged in
    if (!currentUser) {
      console.log("No user found, redirecting to login")
      window.location.href = "login.html"
      return
    }

    // Set user name in profile button
    if (profileBtn) {
      const userNameSpan = profileBtn.querySelector("span")
      if (userNameSpan) {
        userNameSpan.textContent = currentUser.fullname
      }
    }

    // Toggle sidebar on mobile
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("active")
      })
    }

    // Handle sidebar navigation
    sidebarItems.forEach((item) => {
      item.addEventListener("click", function () {
        // Remove active class from all items
        sidebarItems.forEach((i) => i.classList.remove("active"))

        // Add active class to clicked item
        this.classList.add("active")

        // Show corresponding content section
        const targetId = this.getAttribute("data-page")
        contentSections.forEach((section) => {
          section.classList.remove("active")
          if (section.id === targetId) {
            section.classList.add("active")
          }
        })

        // Close sidebar on mobile after navigation
        if (window.innerWidth <= 768) {
          sidebar.classList.remove("active")
        }
      })
    })

    // Handle settings navigation
    const settingsTabs = document.querySelectorAll(".settings-sidebar li")
    const settingsSections = document.querySelectorAll(".settings-section")

    if (settingsTabs.length > 0) {
      settingsTabs.forEach((tab) => {
        tab.addEventListener("click", function (e) {
          e.preventDefault()

          // Remove active class from all tabs
          settingsTabs.forEach((t) => t.classList.remove("active"))

          // Add active class to clicked tab
          this.classList.add("active")

          // Show corresponding settings section
          const targetId = this.querySelector("a").getAttribute("href").substring(1)
          settingsSections.forEach((section) => {
            section.classList.remove("active")
            if (section.id === targetId) {
              section.classList.add("active")
            }
          })
        })
      })
    }

    // Handle logout
    const logoutBtn = document.querySelector('.dropdown-content a[href="login.html"]')
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault()

        // Clear user data
        localStorage.removeItem("currentUser")
        localStorage.removeItem("sessionExpiry")

        // Redirect to login
        window.location.href = "login.html"
      })
    }
  }

  // Run dashboard initialization on page load
  initDashboard()

  // Toggle dropdown when clicking profile button
  if (profileBtn) {
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block"
    })
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (dropdownContent && profileBtn) {
      if (!profileBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
        dropdownContent.style.display = "none"
      }
    }
  })

  // Responsive behavior
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && sidebar) {
      sidebar.classList.remove("active")
    }
  })
})

