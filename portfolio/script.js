document.addEventListener('DOMContentLoaded', () => {
  // --- HEADER SCROLL EFFECT ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- MOBILE MENU TOGGLE ---
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // --- HERO DYNAMIC TYPING EFFECT ---
  const typingElement = document.querySelector('.hero-typing');
  if (typingElement) {
    const roles = JSON.parse(typingElement.getAttribute('data-roles') || '["Software Developer", "Quality Analyst"]');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    function type() {
      const fullRole = roles[roleIndex];
      
      if (isDeleting) {
        currentText = fullRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        currentText = fullRole.substring(0, charIndex + 1);
        charIndex++;
      }

      typingElement.textContent = currentText;

      let typingSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && currentText === fullRole) {
        typingSpeed = 2000; // Pause at full word
        isDeleting = true;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before typing next word
      }

      setTimeout(type, typingSpeed);
    }

    // Start the typing cycle
    setTimeout(type, 1000);
  }

  // --- SCROLL REVEAL (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once shown to prevent continuous firing
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- NAVIGATION LINK ACTIVE SPY ---
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 120) {
        currentSection = section.getAttribute('id') || '';
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentSection}`) {
        item.classList.add('active');
      }
    });
  });

  // --- CERTIFICATIONS HORIZONTAL CAROUSEL SCROLL ---
  const certsWrapper = document.querySelector('.certs-wrapper');
  const prevBtn = document.getElementById('cert-prev');
  const nextBtn = document.getElementById('cert-next');

  if (certsWrapper && prevBtn && nextBtn) {
    const scrollAmount = 400; // rough width of card + gap

    prevBtn.addEventListener('click', () => {
      certsWrapper.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });

    nextBtn.addEventListener('click', () => {
      certsWrapper.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });

    // Disable/Enable buttons depending on scroll position
    const updateButtons = () => {
      const scrollLeft = certsWrapper.scrollLeft;
      const maxScrollLeft = certsWrapper.scrollWidth - certsWrapper.clientWidth;

      if (scrollLeft <= 5) {
        prevBtn.style.opacity = '0.5';
        prevBtn.style.cursor = 'not-allowed';
      } else {
        prevBtn.style.opacity = '1';
        prevBtn.style.cursor = 'pointer';
      }

      if (scrollLeft >= maxScrollLeft - 5) {
        nextBtn.style.opacity = '0.5';
        nextBtn.style.cursor = 'not-allowed';
      } else {
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
      }
    };

    certsWrapper.addEventListener('scroll', updateButtons);
    // Initialize buttons state on load
    setTimeout(updateButtons, 300);
  }

  // --- PROJECTS HORIZONTAL CAROUSEL SCROLL & CENTER-FOCUS DETECT ---
  const projectsWrapper = document.querySelector('.projects-wrapper');
  const projectCards = document.querySelectorAll('.project-card');
  const projPrevBtn = document.getElementById('project-prev');
  const projNextBtn = document.getElementById('project-next');

  if (projectsWrapper && projectCards.length > 0) {
    // 1. Center-focus detection
    const updateActiveProject = () => {
      const wrapperRect = projectsWrapper.getBoundingClientRect();
      const centerPoint = wrapperRect.left + wrapperRect.width / 2;

      projectCards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(centerPoint - cardCenter);

        // If card center is close to wrapper center, focus it
        if (distance < cardRect.width * 0.6) {
          card.classList.add('center-focus');
        } else {
          card.classList.remove('center-focus');
        }
      });
    };

    projectsWrapper.addEventListener('scroll', updateActiveProject);
    // Initial call to set active card on load
    setTimeout(updateActiveProject, 300);

    // 2. Click controls
    if (projPrevBtn && projNextBtn) {
      const scrollAmount = 550; // approximation of card offset
      
      projPrevBtn.addEventListener('click', () => {
        projectsWrapper.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth'
        });
      });

      projNextBtn.addEventListener('click', () => {
        projectsWrapper.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      });
      
      const updateProjButtons = () => {
        const scrollLeft = projectsWrapper.scrollLeft;
        const maxScrollLeft = projectsWrapper.scrollWidth - projectsWrapper.clientWidth;

        if (scrollLeft <= 5) {
          projPrevBtn.style.opacity = '0.5';
          projPrevBtn.style.cursor = 'not-allowed';
        } else {
          projPrevBtn.style.opacity = '1';
          projPrevBtn.style.cursor = 'pointer';
        }

        if (scrollLeft >= maxScrollLeft - 5) {
          projNextBtn.style.opacity = '0.5';
          projNextBtn.style.cursor = 'not-allowed';
        } else {
          projNextBtn.style.opacity = '1';
          projNextBtn.style.cursor = 'pointer';
        }
      };

      projectsWrapper.addEventListener('scroll', updateProjButtons);
      setTimeout(updateProjButtons, 300);
    }
  }

  // --- CONTACT FORM SIMULATION ---
  const contactForm = document.getElementById('portfolioContactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get values
      const name = document.getElementById('formName').value;
      const email = document.getElementById('formEmail').value;
      const message = document.getElementById('formMessage').value;

      if (!name || !email || !message) {
        formStatus.textContent = 'Please fill out all fields.';
        formStatus.className = 'form-status error';
        formStatus.style.display = 'block';
        return;
      }

      formStatus.textContent = 'Sending message...';
      formStatus.className = 'form-status';
      formStatus.style.display = 'block';

      // Submit form asynchronously using FormSubmit AJAX API
      fetch("https://formsubmit.co/ajax/pavankumargandavarapu@gmail.com", {
        method: "POST",
        body: new FormData(contactForm)
      })
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(data => {
        formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
        formStatus.className = 'form-status success';
        contactForm.reset();
      })
      .catch(error => {
        console.error("FormSubmit Error:", error);
        formStatus.textContent = 'Oops! Error sending message. Please try again or email directly.';
        formStatus.className = 'form-status error';
      })
      .finally(() => {
        // Hide status alert after 6 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 6000);
      });
    });
  }

  // --- RE-TRIGGERABLE PROFILE BACKFLIP ---
  const profileWrapper = document.querySelector('.profile-image-wrapper');
  if (profileWrapper) {
    const profileObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          profileWrapper.classList.add('flip-active');
        } else {
          profileWrapper.classList.remove('flip-active');
        }
      });
    }, {
      threshold: 0.15
    });
    profileObserver.observe(profileWrapper);
  }

  // --- INTERACTIVE CARD SPOTLIGHT EFFECT ---
  const spotlightCards = document.querySelectorAll('.project-card, .internship-card, .skills-category, .cert-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // --- LIGHTBOX IMAGE VIEWER LOGIC ---
  const lightbox = document.getElementById('lightboxModal');
  const lightboxGallery = document.getElementById('lightboxGallery');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.querySelector('.lightbox-close');
  const galleryPrev = document.getElementById('galleryPrev');
  const galleryNext = document.getElementById('galleryNext');
  const zoomableImages = document.querySelectorAll('.project-img-cover, .profile-img');

  if (lightbox && lightboxGallery && zoomableImages.length > 0) {
    zoomableImages.forEach(img => {
      // Add a zoom visual cue cursor
      img.style.cursor = 'zoom-in';

      img.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Clear previous contents
        lightboxGallery.innerHTML = '';
        
        // Check if the image belongs to a slideshow
        const slidesContainer = img.closest('.project-slides');
        let imagesToLoad = [img];
        let startIndex = 0;
        
        if (slidesContainer) {
          const allSlides = Array.from(slidesContainer.querySelectorAll('img'));
          imagesToLoad = allSlides;
          startIndex = allSlides.indexOf(img);
        }
        
        // Load images into gallery
        imagesToLoad.forEach(sourceImg => {
          const item = document.createElement('div');
          item.className = 'lightbox-gallery-item';
          
          const newImg = document.createElement('img');
          newImg.className = 'lightbox-content';
          newImg.src = sourceImg.src;
          newImg.alt = sourceImg.alt;
          
          item.appendChild(newImg);
          lightboxGallery.appendChild(item);
        });
        
        // Update caption
        lightboxCaption.textContent = img.alt || 'Project Preview';
        
        // Set navigation buttons visibility
        if (imagesToLoad.length > 1) {
          galleryPrev.style.display = 'flex';
          galleryNext.style.display = 'flex';
        } else {
          galleryPrev.style.display = 'none';
          galleryNext.style.display = 'none';
        }
        
        // Open Lightbox
        lightbox.style.display = 'flex';
        void lightbox.offsetWidth; // force reflow
        lightbox.classList.add('active');
        
        // Scroll to the clicked image index
        const itemWidth = lightboxGallery.clientWidth;
        lightboxGallery.scrollLeft = startIndex * itemWidth;
        
        // Update caption on scroll inside lightbox
        const handleGalleryScroll = () => {
          const scrollLeft = lightboxGallery.scrollLeft;
          const index = Math.round(scrollLeft / lightboxGallery.clientWidth);
          if (imagesToLoad[index]) {
            lightboxCaption.textContent = imagesToLoad[index].alt || 'Project Preview';
          }
        };
        
        lightboxGallery.addEventListener('scroll', handleGalleryScroll);
      });
    });

    const hideLightbox = () => {
      lightbox.classList.remove('active');
      setTimeout(() => {
        lightbox.style.display = 'none';
        lightboxGallery.innerHTML = '';
      }, 400); // matches the CSS transition length
    };

    if (closeBtn) {
      closeBtn.addEventListener('click', hideLightbox);
    }
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-container') || e.target.id === 'lightboxGallery') {
        hideLightbox();
      }
    });

    // Gallery button clicks
    if (galleryPrev && galleryNext) {
      galleryPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxGallery.scrollBy({
          left: -lightboxGallery.clientWidth,
          behavior: 'smooth'
        });
      });

      galleryNext.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxGallery.scrollBy({
          left: lightboxGallery.clientWidth,
          behavior: 'smooth'
        });
      });
    }
  }

  // --- MINI-CAROUSEL INNER SLIDESHOWS ---
  const slideContainers = document.querySelectorAll('.project-header-visual');
  slideContainers.forEach(container => {
    const slides = container.querySelectorAll('.project-slides img');
    const dots = container.querySelectorAll('.slide-dot');
    
    if (slides.length > 1 && dots.length > 0) {
      let activeIndex = 0;
      let intervalId = null;

      const setSlide = (index) => {
        slides.forEach((slide, i) => {
          if (i === index) {
            slide.classList.add('active');
            dots[i].classList.add('active');
          } else {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
          }
        });
        activeIndex = index;
      };

      // Dot click navigation
      dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
          e.stopPropagation(); // prevent opening lightbox modal on dot click
          setSlide(index);
        });
      });

      // Auto cycle
      const startCycle = () => {
        intervalId = setInterval(() => {
          const nextIndex = (activeIndex + 1) % slides.length;
          setSlide(nextIndex);
        }, 4000);
      };

      const stopCycle = () => {
        if (intervalId) clearInterval(intervalId);
      };

      // Cycle controls based on hover
      container.addEventListener('mouseenter', stopCycle);
      container.addEventListener('mouseleave', startCycle);
      
      startCycle();
    }
  });

  // --- SCROLL PROGRESS BAR ---
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  // --- HERO BACKGROUND PARTICLES ---
  const canvas = document.getElementById('hero-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    // Set canvas dimensions
    const setCanvasSize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Track mouse coordinates
    let mouse = {
      x: null,
      y: null,
      radius: 120
    };
    
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });
      heroSection.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
      });
    }
    
    // Particle Class
    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      
      update() {
        // Bounce on borders
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }
        
        // Mouse interact (push away)
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx*dx + dy*dy);
          if (distance < mouse.radius) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
              this.x += 1.5;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
              this.x -= 1.5;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
              this.y += 1.5;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
              this.y -= 1.5;
            }
          }
        }
        
        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }
    
    // Create particle array
    const init = () => {
      particlesArray = [];
      let numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
      numberOfParticles = Math.min(numberOfParticles, 80); // cap for performance
      
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 0.8;
        let x = Math.random() * (canvas.width - size * 2) + size * 2;
        let y = Math.random() * (canvas.height - size * 2) + size * 2;
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = Math.random() > 0.5 ? 'rgba(0, 242, 254, 0.35)' : 'rgba(138, 43, 226, 0.35)';
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    };
    
    // Draw lines connecting particles
    const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx*dx + dy*dy);
          
          if (distance < 90) {
            opacityValue = 1 - (distance / 90);
            ctx.strokeStyle = `rgba(0, 242, 254, ${opacityValue * 0.12})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
      requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    // Re-initialize on window resize
    window.addEventListener('resize', init);
  }
});
