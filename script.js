/**
 * Script.js for Nandhini Pugazhanthi Portfolio
 * Built with Lenis, GSAP, and ScrollTrigger.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       1. INITIALIZE LENIS (Smooth Scrolling)
       ========================================================= */
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    /* =========================================================
       2. CUSTOM JAVASCRIPT CURSOR
       ========================================================= */
    const cursor = document.getElementById('cursor');
    const cursorText = document.getElementById('cursor-text');
    let isDesktop = window.innerWidth > 768;

    window.addEventListener('resize', () => {
        isDesktop = window.innerWidth > 768;
    });

    if (cursor && cursorText) {
        document.addEventListener('mousemove', (e) => {
            if (!isDesktop) return;

            // Move the main dot
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });

            // Move the text container (slightly delayed)
            gsap.to(cursorText, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15,
                ease: "power2.out"
            });
        });

        // Hover effects using data attributes
        const hoverElements = document.querySelectorAll('.link-hover, a:not(.no-cursor), button, input, textarea');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                if (!isDesktop) return;

                cursor.classList.add('hover-active');

                // Add text if data attribute exists
                const textAttr = el.getAttribute('data-cursor-text');
                if (textAttr) {
                    cursorText.innerText = textAttr;
                    cursorText.classList.add('visible');
                }
            });

            el.addEventListener('mouseleave', () => {
                if (!isDesktop) return;

                cursor.classList.remove('hover-active');
                cursorText.classList.remove('visible');
                cursorText.innerText = '';
            });
        });

        // Marquee section cursor color
        const marqueeSection = document.querySelector('.marquee-section');
        if (marqueeSection) {
            marqueeSection.addEventListener('mouseenter', () => {
                if (isDesktop) cursor.classList.add('cursor-green');
            });
            marqueeSection.addEventListener('mouseleave', () => {
                if (isDesktop) cursor.classList.remove('cursor-green');
            });
        }
    }

    /* =========================================================
       3. GSAP INTRO ANIMATION (Hero Timeline)
       ========================================================= */
    // Helper function for wrapping text into individual spans for stagger animation
    document.querySelectorAll('.reveal-text').forEach(el => {
        const text = el.innerText;
        el.innerText = '';
        const words = text.split(' ');
        words.forEach(word => {
            if (word.trim() !== '') {
                const wordWrap = document.createElement('span');
                wordWrap.style.display = 'inline-block';
                wordWrap.style.overflow = 'hidden';
                wordWrap.style.verticalAlign = 'top';
                wordWrap.style.marginRight = '0.3em'; // Space between words

                const wordSpan = document.createElement('span');
                wordSpan.innerText = word;
                wordSpan.style.display = 'inline-block';
                wordSpan.style.transform = 'translateY(110%)';
                wordSpan.className = 'word-anim';

                wordWrap.appendChild(wordSpan);
                el.appendChild(wordWrap);
            }
        });
    });

    const heroTl = gsap.timeline();

    // Reset Hero Title Lines
    gsap.set('.line-text', { y: '110%' });

    // Animate Title
    heroTl.to('.line-text', {
        y: '0%',
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out"
    })
        // Animate Description / Subtitle
        .to('.word-anim', {
            y: '0%',
            duration: 0.8,
            stagger: 0.02,
            ease: "power3.out"
        }, "-=0.8")
        // Animate Magnetic Btn
        .fromTo('.magnetic-btn',
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" },
            "-=0.6"
        )
        .fromTo('.navbar',
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
            "-=1"
        );

    /* =========================================================
       4. MAGNETIC BUTTON HOVER EFFECT
       ========================================================= */
    const magBtns = document.querySelectorAll('.magnetic-btn');

    magBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            if (!isDesktop) return;

            const rect = btn.getBoundingClientRect();
            // Calculate center of button
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate distance cursor is from center
            const moveX = (e.clientX - centerX) * 0.3;
            const moveY = (e.clientY - centerY) * 0.3;

            gsap.to(btn, {
                x: moveX,
                y: moveY,
                duration: 0.3,
                ease: "power2.out"
            });

            // Move child text slightly more for parallax
            gsap.to(btn.querySelector('.btn-text'), {
                x: moveX * 0.5,
                y: moveY * 0.5,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            if (!isDesktop) return;

            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.3)"
            });
            gsap.to(btn.querySelector('.btn-text'), {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    /* =========================================================
       5. GSAP SCROLLTRIGGER ANIMATIONS (3D ENHANCED)
       ========================================================= */
    gsap.registerPlugin(ScrollTrigger);

    // 5.1 Hero Parallax Effect
    gsap.to('.hero-content', {
        yPercent: 30,
        opacity: 0,
        scale: 0.95,
        rotationX: -5,
        transformPerspective: 1000,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    gsap.to('.grid-pattern', {
        yPercent: 15,
        rotationZ: 2,
        scale: 1.05,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // 5.2 About Section 3D Reveal
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        gsap.fromTo('.about-right',
            { opacity: 0, x: 50, rotationY: -10, z: -100, transformPerspective: 1000 },
            {
                opacity: 1, x: 0, rotationY: 0, z: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.about',
                    start: 'top 85%',
                    end: 'top 30%',
                    scrub: 1
                }
            }
        );
        gsap.fromTo('.about-left',
            { opacity: 0, x: -30, rotationX: 10, transformPerspective: 800 },
            {
                opacity: 1, x: 0, rotationX: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.about',
                    start: 'top 85%',
                    end: 'top 30%',
                    scrub: 1
                }
            }
        );
    }

    // 5.3 3D Layers for Experience
    const expRows = document.querySelectorAll('.exp-row');
    expRows.forEach((row, i) => {
        // Remove simple reveal class to prevent conflict
        row.classList.remove('gs-reveal');
        
        gsap.fromTo(row,
            { opacity: 0, y: 30, rotationX: 15, transformPerspective: 800 },
            {
                opacity: 1, y: 0, rotationX: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: row,
                    start: "top 95%",
                    end: "top 75%",
                    scrub: 1
                }
            }
        );
    });

    // 5.4 3D Projects Reveal
    const projectElements = document.querySelectorAll('.project-item');
    projectElements.forEach((item, i) => {
        // Remove simple reveal class
        item.classList.remove('gs-reveal');

        gsap.fromTo(item,
            { opacity: 0, y: 50, z: -50, rotationX: -10, scale: 0.95, transformPerspective: 1000 },
            {
                opacity: 1, y: 0, z: 0, rotationX: 0, scale: 1,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                    end: "top 60%",
                    scrub: 1
                }
            }
        );
    });

    // 5.5 Behance Cards Staggered Reveal
    const behanceCards = document.querySelectorAll('.behance-card');
    if (behanceCards.length > 0) {
        behanceCards.forEach(card => card.classList.remove('gs-reveal'));
        gsap.fromTo('.behance-card',
            { opacity: 0, y: 80, rotationX: -10, scale: 0.95, transformPerspective: 1000 },
            {
                opacity: 1, y: 0, rotationX: 0, scale: 1,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.behance-grid',
                    start: "top 85%",
                    end: "top 50%",
                    scrub: 1.5
                }
            }
        );
    }

    // 5.6 Stagger Tools Section with 3D Pop
    gsap.fromTo('.tool-circle',
        { scale: 0.5, opacity: 0, rotationY: 90, z: -200, transformPerspective: 800 },
        {
            scale: 1, opacity: 1, rotationY: 0, z: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "back.out(1.5)",
            scrollTrigger: {
                trigger: '.tools-grid',
                start: "top 85%",
                end: "top 50%",
                scrub: 1 // smooth 3D entry
            }
        }
    );

    // 5.6 Contact Section Premium Reveal
    const contactFormWrap = document.querySelector('.contact-form-wrap');
    if (contactFormWrap) {
        contactFormWrap.classList.remove('gs-reveal');
        gsap.fromTo(contactFormWrap,
            { y: 80, opacity: 0, scale: 0.95 },
            {
                y: 0, opacity: 1, scale: 1,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: '.contact',
                    start: "top 85%",
                    end: "top 40%",
                    scrub: 1.5
                }
            }
        );
    }

    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
        contactInfo.classList.remove('gs-reveal');
        gsap.fromTo(contactInfo,
            { y: 80, opacity: 0, scale: 0.95 },
            {
                y: 0, opacity: 1, scale: 1,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: '.contact',
                    start: "top 85%",
                    end: "top 40%",
                    scrub: 1
                }
            }
        );
    }

    // 5.7 Fallback/Slide Up general elements for any remaining gs-reveal
    setTimeout(() => {
        const remainingRevealElements = document.querySelectorAll('.gs-reveal');
        remainingRevealElements.forEach(el => {
            gsap.fromTo(el,
                { y: 50, opacity: 0, rotationX: 10, transformPerspective: 800 },
                {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }, 50); // Small delay to let other initializations remove gs-reveal classes

    /* =========================================================
       6. FLOATING PROJECT IMAGE REVEAL (GSAP)
       ========================================================= */
    const projItems = document.querySelectorAll('.project-item');
    const hoverImage = document.querySelector('.hover-image-reveal');

    if (projItems.length > 0 && hoverImage) {
        // Move image box to follow cursor inside projects section
        const projSection = document.querySelector('.projects-wrapper');

        projSection.addEventListener('mousemove', (e) => {
            if (!isDesktop) return;
            // Get position relative to viewport
            gsap.to(hoverImage, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        projItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                if (!isDesktop) return;
                const imgSrc = item.getAttribute('data-image');
                if (imgSrc) {
                    hoverImage.style.backgroundImage = `url(${imgSrc})`;
                    hoverImage.classList.add('visible');
                }
            });

            item.addEventListener('mouseleave', () => {
                if (!isDesktop) return;
                hoverImage.classList.remove('visible');
            });
        });
    }

    /* =========================================================
       7. MOBILE MENU OVERLAY
       ========================================================= */
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    menuToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;

        // Transform hamburger lines
        const lines = menuToggle.querySelectorAll('.line');
        if (isMenuOpen) {
            lines[0].style.transform = 'translateY(4px) rotate(45deg)';
            lines[1].style.transform = 'translateY(-4px) rotate(-45deg)';
            mobileOverlay.classList.add('active');

            // Animate Links
            gsap.fromTo(mobileLinks,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out", delay: 0.2 }
            );

            // Stop scroll
            lenis.stop();
        } else {
            lines[0].style.transform = 'none';
            lines[1].style.transform = 'none';
            mobileOverlay.classList.remove('active');
            lenis.start();
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            const lines = menuToggle.querySelectorAll('.line');
            lines[0].style.transform = 'none';
            lines[1].style.transform = 'none';
            mobileOverlay.classList.remove('active');
            lenis.start();
        });
    });

    /* =========================================================
       8. CONTACT FORM SIMULATION
       ========================================================= */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.querySelector('.form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const origText = btn.innerHTML;

            btn.innerHTML = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = origText;
                btn.disabled = false;
                formStatus.textContent = 'Message sent! We will connect soon.';
                formStatus.classList.add('success');
                contactForm.reset();

                setTimeout(() => {
                    formStatus.classList.remove('success');
                    formStatus.textContent = '';
                }, 4000);
            }, 1500);
        });
    }

    /* =========================================================
       9. DATE FOOTER & BACK TO TOP
       ========================================================= */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            lenis.scrollTo(0, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        });
    }

    /* =========================================================
       10. PROJECT ACCORDION & TABS (REUSABLE)
       ========================================================= */
    const initAccordion = (accordionId, panelId, toggleId) => {
        const accordion = document.getElementById(accordionId);
        const panel = document.getElementById(panelId);
        const toggle = document.getElementById(toggleId);

        if (accordion && panel) {
            // Accordion Toggle Logic
            accordion.addEventListener('click', (e) => {
                const isOpen = panel.classList.contains('open');

                if (isOpen) {
                    panel.classList.remove('open');
                    accordion.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
                    panel.setAttribute('aria-hidden', 'true');
                    toggle.querySelector('.btn-text').textContent = 'Expand';
                } else {
                    panel.classList.add('open');
                    accordion.classList.add('active');
                    toggle.setAttribute('aria-expanded', 'true');
                    panel.setAttribute('aria-hidden', 'false');
                    toggle.querySelector('.btn-text').textContent = 'Collapse';

                    // Scroll to accordion start
                    setTimeout(() => {
                        const offset = accordion.getBoundingClientRect().top + window.pageYOffset - 100;
                        lenis.scrollTo(offset, { duration: 1.2 });
                    }, 300);
                }
            });

            // Tab Switching Logic
            const tabs = panel.querySelectorAll('.cs-tab');
            const panes = panel.querySelectorAll('.cs-pane');

            tabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    e.stopPropagation(); // Don't trigger accordion toggle

                    const targetTab = tab.getAttribute('data-tab');

                    // Update active tab
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');

                    // Update visible pane
                    panes.forEach(pane => {
                        pane.classList.remove('active');
                        if (pane.id === `cs-${targetTab}`) {
                            pane.classList.add('active');
                        }
                    });
                });
            });

            // Prevent content clicks from toggling accordion
            panel.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    };

    // Initialize Case Studies
    initAccordion('quicktest-accordion', 'quicktest-panel', 'quicktest-toggle');
    initAccordion('quizzer-accordion', 'quizzer-panel', 'quizzer-toggle');
    initAccordion('coherence-accordion', 'coherence-panel', 'coherence-toggle');

    /* =========================================================
       11. THEME TOGGLE
       ========================================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check local storage for theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
            
            if (themeIcon) {
                if (isLight) {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                } else {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
            }
        });
    }

});
