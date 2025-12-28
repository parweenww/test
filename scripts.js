
        // Mobile Navigation Toggle
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            });
        });
        
        // Header background on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
                header.style.padding = '15px 0';
            } else {
                header.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
                header.style.padding = '20px 0';
            }
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const bannerHeight = document.querySelector('.offers-banner').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: targetPosition - headerHeight - bannerHeight,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Close offers banner
        document.getElementById('closeOffer').addEventListener('click', function() {
            document.getElementById('offersBanner').style.display = 'none';
            document.querySelector('header').style.top = '0';
        });
        
        // Close flash offer
        function closeFlashOffer() {
            document.getElementById('flashOffer').style.display = 'none';
        }
        
        // Show flash offer after 3 seconds
        setTimeout(() => {
            document.getElementById('flashOffer').style.display = 'block';
        }, 3000);
        
        // Copy coupon codes
        document.querySelectorAll('.copy-btn').forEach(button => {
            button.addEventListener('click', function() {
                const couponCode = this.getAttribute('data-coupon');
                navigator.clipboard.writeText(couponCode).then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    this.classList.add('copied');
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.classList.remove('copied');
                    }, 2000);
                });
            });
        });
        
        // Form submission with offer validation
        const bookingForm = document.getElementById('booking-form');
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const guests = document.getElementById('guests').value;
            const coupon = document.getElementById('coupon').value;
            const specialOffer = document.getElementById('special-offer').value;
            
            // Simple validation
            if (!name || !email || !phone || !date || !guests) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Validate coupon if entered
            const validCoupons = ['BORCELLE15', 'BDAY25', 'TAKE10'];
            if (coupon && !validCoupons.includes(coupon.toUpperCase())) {
                alert('Invalid coupon code. Please check and try again.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Processing Offer...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                let message = 'Thank you for your reservation! We will contact you shortly to confirm your booking.';
                
                if (coupon) {
                    message += `\n\nCoupon applied: ${coupon}`;
                }
                
                if (specialOffer && specialOffer !== 'none') {
                    message += `\nSpecial offer selected: ${document.getElementById('special-offer').options[document.getElementById('special-offer').selectedIndex].text}`;
                }
                
                alert(message);
                bookingForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 2000);
        });
        
        // Animated counter
        function animateCounter() {
            const counters = document.querySelectorAll('.counter');
            const speed = 200;
            
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-count');
                    const count = +counter.innerText;
                    
                    const inc = target / speed;
                    
                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCount();
            });
        }
        
        // Start counter when about section is in view
        const aboutSection = document.querySelector('.about-content');
        let counterAnimated = false;
        
        if (aboutSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !counterAnimated) {
                        animateCounter();
                        counterAnimated = true;
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(aboutSection);
        }
        
        // Set minimum date for reservation to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').setAttribute('min', today);
        
        // Initialize the page
        window.addEventListener('load', () => {
            console.log('Borcelle Restaurant with Offers loaded successfully!');
            
            // Auto-hide flash offer after 15 seconds
            setTimeout(() => {
                const flashOffer = document.getElementById('flashOffer');
                if (flashOffer) {
                    flashOffer.style.opacity = '0';
                    setTimeout(() => {
                        flashOffer.style.display = 'none';
                    }, 500);
                }
            }, 15000);
            
            // Show special offers notification
            setTimeout(() => {
                if (window.innerWidth > 768) {
                    alert("🎉 Special Offers Available!\n\nCheck out our exclusive offers and loyalty program for amazing discounts!");
                }
            }, 5000);
        });
