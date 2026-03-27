document.addEventListener('DOMContentLoaded', () => {
    // 1. Load Components (Header/Footer)
    const loadComponents = async () => {
        try {
            const [headerRes, footerRes] = await Promise.all([
                fetch('components/header.html'),
                fetch('components/footer.html')
            ]);
            
            document.getElementById('header-placeholder').innerHTML = await headerRes.text();
            document.getElementById('footer-placeholder').innerHTML = await footerRes.text();
            
            // Activate mobile menu logic after header is loaded
            initMobileMenu();
        } catch (err) {
            console.error('Error loading components:', err);
        }
    };

    loadComponents();

    // 2. Mobile Menu Logic
    function initMobileMenu() {
        const burger = document.querySelector('.burger');
        const overlay = document.querySelector('.mobile-overlay');
        const links = document.querySelectorAll('.mobile-overlay a');

        if(burger && overlay) {
            burger.addEventListener('click', () => {
                overlay.classList.toggle('active');
                burger.textContent = overlay.classList.contains('active') ? '✕' : '☰';
            });

            links.forEach(link => {
                link.addEventListener('click', () => {
                    overlay.classList.remove('active');
                    burger.textContent = '☰';
                });
            });
        }
    }

    // 3. Typewriter Effect
    const typewriter = document.getElementById('typewriter');
    if(typewriter) {
        const phrases = ["Moderne Websites", "Snelle Webshops", "SEO Succes", "Maatwerk Code"];
        let i = 0, j = 0, isDeleting = false;
        
        function type() {
            const current = phrases[i];
            if(isDeleting) {
                typewriter.textContent = current.substring(0, j - 1);
                j--;
                if(j == 0) { isDeleting = false; i = (i + 1) % phrases.length; }
            } else {
                typewriter.textContent = current.substring(0, j + 1);
                j++;
                if(j == current.length) isDeleting = true;
            }
            setTimeout(type, isDeleting ? 100 : 200);
        }
        type();
    }

    // 4. Reveal on Scroll
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Initial check for elements
    const checkReveals = () => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    };
    
    // Check elements after a short delay to ensure DOM is ready
    setTimeout(checkReveals, 500);
});