
        // Dark/Light mode toggle
        const modeToggle = document.getElementById('modeToggle');
        const body = document.body;
        const icon = modeToggle.querySelector('i');

        // Check for saved user preference
        if (localStorage.getItem('theme') === 'light') {
            body.classList.add('light-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
        }

        modeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            
            // Update icon
            if (body.classList.contains('light-mode')) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });

        // Smooth scrolling for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll down button functionality
        document.querySelector('.scroll-down').addEventListener('click', () => {
            const aboutSection = document.querySelector('#about') || document.querySelectorAll('.section')[0];
            if (aboutSection) {
                window.scrollTo({
                    top: aboutSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });


        // Admin modal open/close functionality
const openModalBtn = document.getElementById('openAdminModal');
const closeModalBtn = document.getElementById('closeModal');
const adminModal = document.getElementById('adminModal');

if (openModalBtn && closeModalBtn && adminModal) {
    openModalBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent anchor default jump
        adminModal.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', () => {
        adminModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === adminModal) {
            adminModal.style.display = 'none';
        }
    });
}

// Admin login validation + redirect to projects page
const loginForm = document.getElementById('adminLoginForm');

// Set your admin credentials


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = loginForm.querySelector('input[type="email"]').value.trim();
    const passwordInput = loginForm.querySelector('input[type="password"]').value;

    if (emailInput === adminEmail && passwordInput === adminPassword) {
        localStorage.setItem('isAdmin', 'true');
        alert("Login successful! Redirecting to admin projects page...");
        window.location.href = "projects.html"; // change this if the filename is different
    } else {
        alert("Invalid credentials! Please try again.");
    }
});


// Only run this if you're on the main page (optional)
if (document.getElementById("projects")) {
    const publicProjects = JSON.parse(localStorage.getItem("publicProjects")) || [];
    const grid = document.querySelector(".projects-grid");
  
    if (publicProjects.length && grid) {
      grid.innerHTML = ""; // Clear default cards
  
      publicProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = "project-card";
        card.innerHTML = `
          <div class="project-img">
            <img src="${project.image}" alt="${project.title}">
          </div>
          <div class="project-details">
            <h3>${project.title}</h3>
            <div class="tech-stack">
              ${project.stack.map(tech => `<span>${tech}</span>`).join("")}
            </div>
            <p>${project.description}</p>
            <div class="project-links">
              <a href="${project.github}" target="_blank"><i class="fab fa-github"></i> GitHub</a>
              <a href="${project.live}" target="_blank"><i class="fas fa-external-link-alt"></i> Live</a>
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const publicProjects = JSON.parse(localStorage.getItem("publicProjects")) || [];
    const grid = document.querySelector(".projects-grid");
  
    if (!grid) return;
  
    grid.innerHTML = ""; // Clear default
  
    if (publicProjects.length === 0) {
      const msg = document.createElement("p");
      msg.textContent = "No projects for Show";
      msg.style.textAlign = "center";
      msg.style.fontSize = "1.2rem";
      msg.style.marginTop = "2rem";
      msg.style.color = "#888";
      grid.appendChild(msg);
      return;
    }
  
    publicProjects.forEach(project => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <div class="project-img">
          <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-details">
          <h3>${project.title}</h3>
          <div class="tech-stack">
            ${project.stack.map(tech => `<span>${tech}</span>`).join("")}
          </div>
          <p>${project.description}</p>
          <div class="project-highlights">
            <div class="highlight">
              <i class="fas fa-tools"></i>
              <p><strong>Tools Used:</strong> VS Code</p>
            </div>
            <div class="highlight">
              <i class="fas fa-lightbulb"></i>
              <p><strong>Key Learning:</strong> Project building, UI design</p>
            </div>
          </div>
          <div class="project-links">
            <a href="${project.github}" class="project-link" target="_blank">
              <i class="fab fa-github"></i> GitHub
            </a>
            <a href="${project.live}" class="project-link" target="_blank">
              <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  });
  
  