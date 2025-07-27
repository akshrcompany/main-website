const navbarData = {
    logo: "https://akshr.in/logo/Akshr Logo-12 1.png",
    links: [
      { href: "https://akshr.in#homesection", text: "Pofile" },
      { href: "https://akshr.in#about", text: "Support" },
      { href: "https://akshr.in#services", text: "History" },
      { href: "https://akshr.in/login", text: "Log Out" }
    ]
  };
  
  function createNavbar(data) {
    const navbar = document.createElement("div");
    navbar.className = "navbar";
  
    // Create logo
    const logo = document.createElement("img");
    logo.src = data.logo;
    logo.alt = "Logo";
    navbar.appendChild(logo);
  
    // Create hamburger menu
    const hamburgerMenu = document.createElement("div");
    hamburgerMenu.className = "hamburger-menu";
    hamburgerMenu.id = "hamburger-menu";
  
    for (let i = 0; i < 3; i++) {
      const bar = document.createElement("div");
      bar.className = "bar";
      hamburgerMenu.appendChild(bar);
    }
    navbar.appendChild(hamburgerMenu);
  
    // Create navigation links
    const navLinks = document.createElement("div");
    navLinks.className = "nav-links";
    data.links.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.text;
  
      // Close menu on click
      a.addEventListener("click", () => {
        navLinks.classList.remove("show");
        hamburgerMenu.classList.remove("open");
        document.body.style.overflow = ""; // Enable scrolling
      });
  
      navLinks.appendChild(a);
    });
    navbar.appendChild(navLinks);
  
    document.getElementById("navbar-container").appendChild(navbar);
  
    // Toggle navigation links on hamburger menu click
    hamburgerMenu.addEventListener("click", () => {
      const isMenuOpen = navLinks.classList.toggle("show");
      hamburgerMenu.classList.toggle("open");
      document.body.style.overflow = isMenuOpen ? "hidden" : ""; // Disable or enable scrolling
    });
  }
  
  // Initialize navbar
  createNavbar(navbarData);
  
  // Toggle navbar visibility on scroll
  const navbar = document.querySelector(".navbar");
  let lastScrollTop = 0;
  
  function toggleNavbarVisibility() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      navbar.classList.remove("visible"); // Hide on scroll down
    } else {
      navbar.classList.add("visible"); // Show on scroll up

    }
    lastScrollTop = scrollTop;
  }
  
  window.addEventListener("scroll", toggleNavbarVisibility);
  