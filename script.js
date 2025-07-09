// Navigation mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Fermer le menu mobile quand on clique sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navigation active selon la section
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (scrollPos >= top && scrollPos < top + height) {
            // Retirer la classe active de tous les liens
            navLinks.forEach(link => link.classList.remove('active'));
            // Ajouter la classe active au lien correspondant
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-card, .project-item, .expertise-item, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Effet parallax léger pour le hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animation des statistiques
const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateStat = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current) + (stat.textContent.includes('+') ? '+' : '') + (stat.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateStat);
            } else {
                stat.textContent = stat.textContent; // Garder le texte original
            }
        };
        
        // Observer pour déclencher l'animation quand la section est visible
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateStat();
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statObserver.observe(stat);
    });
};

// Initialiser l'animation des stats
document.addEventListener('DOMContentLoaded', animateStats);

// Gestion du téléchargement du CV
document.querySelector('.download-cv')?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Fonctionnalité de téléchargement du CV à implémenter selon vos besoins.');
});

// Effet de typing pour le titre principal
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const type = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// Appliquer l'effet typing au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 500);
    }
});

// Gestion des formulaires de contact (si ajoutés plus tard)
const handleContactForm = (e) => {
    e.preventDefault();
    // Logique de traitement du formulaire
    alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
};

// Ajout d'une classe pour les animations CSS
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    // Fermer le menu mobile si la fenêtre est redimensionnée
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Préchargement des images (si nécessaire)
const preloadImages = () => {
    const images = [
        // Ajouter ici les URLs des images à précharger
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    
    // Ajouter une classe pour indiquer que le JS est chargé
    document.documentElement.classList.add('js-loaded');
    
    // Animation d'entrée pour le hero
    setTimeout(() => {
        document.querySelector('.hero-content')?.classList.add('animate-in');
    }, 100);
});

// Gestion des erreurs
window.addEventListener('error', (e) => {
    console.error('Erreur détectée:', e.error);
});

// Performance: Lazy loading pour les images (si ajoutées)
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Initialiser le lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

