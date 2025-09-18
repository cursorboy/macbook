// Smooth scrolling function
function scrollToSection(sectionId) {
    // Track section navigation
    trackEvent('section_navigation', {
        section: sectionId,
        timestamp: new Date().toISOString()
    });

    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Modal functionality
function showContactInfo() {
    // Track contact modal open
    trackEvent('contact_modal_opened', {
        timestamp: new Date().toISOString()
    });

    const modal = document.getElementById('contact-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contact-modal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.close');
    
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };
    
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
});

// Scroll animations (AOS alternative)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// Progress meter animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.meter-bar');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percent = bar.getAttribute('data-percent') || 95;
                
                // Animate the progress bar
                setTimeout(() => {
                    bar.style.setProperty('--progress', percent + '%');
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Floating elements animation enhancement
function enhanceFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-mac, .floating-rocket, .floating-lightning, .floating-star');
    
    floatingElements.forEach((element, index) => {
        // Add random slight movements
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            const randomRotation = (Math.random() - 0.5) * 10;
            
            element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
        }, 3000 + index * 1000);
    });
}

// Parallax scrolling effect
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const floatingElements = document.querySelector('.floating-elements');
        if (floatingElements) {
            floatingElements.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Type writer effect for dynamic text
function typeWriterEffect(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function typeCharacter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeCharacter, speed);
        }
    }
    
    typeCharacter();
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Add sparkle effects to buttons
function addSparkleEffects() {
    const buttons = document.querySelectorAll('.primary-btn, .mega-cta-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('sparkle');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('sparkle');
        });
    });
}

// Random color shifts for gradient text
function animateGradientText() {
    const gradientTexts = document.querySelectorAll('.gradient-text');
    
    gradientTexts.forEach(text => {
        setInterval(() => {
            const hue1 = Math.random() * 360;
            const hue2 = Math.random() * 360;
            const hue3 = Math.random() * 360;
            const hue4 = Math.random() * 360;
            
            text.style.background = `linear-gradient(45deg, hsl(${hue1}, 70%, 60%), hsl(${hue2}, 70%, 60%), hsl(${hue3}, 70%, 60%), hsl(${hue4}, 70%, 60%))`;
            text.style.backgroundSize = '400% 400%';
            text.style.webkitBackgroundClip = 'text';
            text.style.webkitTextFillColor = 'transparent';
        }, 5000);
    });
}

// Shake effect for emphasis
function addShakeEffect() {
    const urgencyBox = document.querySelector('.urgency-box');
    
    if (urgencyBox) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        urgencyBox.style.animation = 'shake 0.5s ease-in-out 3';
                    }, 1000);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(urgencyBox);
    }
}

// Add shake animation to CSS dynamically
function addShakeAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .shake {
            animation: shake 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);
}

// Easter egg: Konami code
function initKonamiCode() {
    let konamiCode = [];
    const targetSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > targetSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === targetSequence.length) {
            if (konamiCode.every((code, index) => code === targetSequence[index])) {
                triggerEasterEgg();
                konamiCode = [];
            }
        }
    });
}

function triggerEasterEgg() {
    // Create rainbow background effect
    document.body.style.background = 'linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080)';
    document.body.style.backgroundSize = '400% 400%';
    document.body.style.animation = 'gradientShift 2s ease infinite';
    
    // Add confetti effect
    createConfetti();
    
    // Show special message
    setTimeout(() => {
        alert('★ You found the easter egg! This level of attention to detail is exactly why I need that MacBook! ★');
        
        // Reset background after 5 seconds
        setTimeout(() => {
            document.body.style.background = '';
            document.body.style.animation = '';
        }, 5000);
    }, 1000);
}

function createConfetti() {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `fall ${Math.random() * 2 + 3}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
    
    // Add fall animation
    if (!document.getElementById('confetti-styles')) {
        const style = document.createElement('style');
        style.id = 'confetti-styles';
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Mouse trail effect
function initMouseTrail() {
    const trail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', function(e) {
        trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        updateTrail();
    });
    
    function updateTrail() {
        // Remove old trail elements
        document.querySelectorAll('.mouse-trail').forEach(el => el.remove());
        
        trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            trailElement.className = 'mouse-trail';
            trailElement.style.position = 'fixed';
            trailElement.style.left = point.x + 'px';
            trailElement.style.top = point.y + 'px';
            trailElement.style.width = (index + 1) * 2 + 'px';
            trailElement.style.height = (index + 1) * 2 + 'px';
            trailElement.style.borderRadius = '50%';
            trailElement.style.backgroundColor = '#ff6b6b';
            trailElement.style.pointerEvents = 'none';
            trailElement.style.opacity = index / trailLength;
            trailElement.style.zIndex = '9998';
            trailElement.style.transform = 'translate(-50%, -50%)';
            
            document.body.appendChild(trailElement);
        });
    }
}

// Real-Time Value Calculator
function initValueCalculator() {
    const targetProgress = document.getElementById('targetProgress');

    // Fixed calculations for $17/hour
    const hourlyWage = 17;
    const macbookDifference = 2000;
    const hours = Math.ceil(macbookDifference / hourlyWage); // 118 hours

    // Update progress bar (max 200 hours)
    const progressPercent = Math.min((hours / 200) * 100, 100);
    if (targetProgress) {
        targetProgress.style.width = progressPercent + '%';
    }
}

// Commitment Tracker
function initCommitmentTracker() {
    const commitmentHours = document.getElementById('commitmentHours');
    const displayHours = document.getElementById('displayHours');
    const dollarValue = document.getElementById('dollarValue');
    const targetWeeks = document.getElementById('targetWeeks');
    const commitmentProgressBar = document.getElementById('commitmentProgressBar');
    const coveragePercent = document.getElementById('coveragePercent');
    const makeCommitmentBtn = document.getElementById('makeCommitment');
    const commitmentTime = document.getElementById('commitmentTime');

    function updateCommitmentDisplay() {
        const hours = parseInt(commitmentHours.value);
        const dollarsValue = hours * 18; // Assume $18/hour
        const weeks = (hours / 40).toFixed(1);
        const coverage = Math.min((dollarsValue / 2000) * 100, 100);

        displayHours.textContent = hours;
        dollarValue.textContent = '$' + dollarsValue.toLocaleString();
        targetWeeks.textContent = weeks + ' weeks';
        coveragePercent.textContent = Math.round(coverage) + '%';
        commitmentProgressBar.style.width = coverage + '%';
    }

    function makeCommitment() {
        const now = new Date();
        const timestamp = now.toLocaleString();
        const selectedServices = Array.from(document.querySelectorAll('.service-option input:checked'))
            .map(checkbox => checkbox.parentElement.textContent.trim());

        commitmentTime.innerHTML = `
            <div class="commitment-made">
                <i class="fas fa-check-circle"></i>
                <strong>Commitment Made!</strong>
                <p>Alternative: ${commitmentHours.value} hours working at Target to afford MacBook</p>
                <p>Services: ${selectedServices.join(', ')}</p>
                <p class="timestamp">Committed on: ${timestamp}</p>
            </div>
        `;

        makeCommitmentBtn.innerHTML = '<i class="fas fa-check"></i> Commitment Recorded';
        makeCommitmentBtn.disabled = true;
        makeCommitmentBtn.style.background = '#30d158';
    }

    if (commitmentHours) {
        commitmentHours.addEventListener('input', updateCommitmentDisplay);
        updateCommitmentDisplay(); // Initial calculation
    }

    if (makeCommitmentBtn) {
        makeCommitmentBtn.addEventListener('click', makeCommitment);
    }
}

// Productivity Loss Simulator
function initProductivitySimulator() {
    const crashBtn = document.getElementById('crashBtn');
    const smoothBtn = document.getElementById('smoothBtn');
    const crashOverlay = document.getElementById('crashOverlay');
    const brokenScreen = document.getElementById('brokenScreen');
    const macScreen = document.getElementById('macScreen');

    function simulateCrash() {
        crashOverlay.style.display = 'flex';
        crashOverlay.style.opacity = '0';

        // Animate crash overlay appearing
        setTimeout(() => {
            crashOverlay.style.opacity = '1';
        }, 100);

        // Simulate loading/recovery
        setTimeout(() => {
            crashOverlay.style.opacity = '0';
            setTimeout(() => {
                crashOverlay.style.display = 'none';
            }, 500);
        }, 3000);

        // Shake the broken laptop
        brokenScreen.style.animation = 'shake 0.5s ease-in-out 3';
        setTimeout(() => {
            brokenScreen.style.animation = '';
        }, 1500);
    }

    function showSmoothPerformance() {
        // Add success glow effect
        macScreen.style.boxShadow = '0 0 20px rgba(48, 209, 88, 0.5)';
        macScreen.style.transform = 'scale(1.02)';

        // Add success animation to code lines
        const codeLines = macScreen.querySelectorAll('.code-line');
        codeLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.color = '#30d158';
                line.style.fontWeight = 'bold';
            }, index * 200);
        });

        // Reset after animation
        setTimeout(() => {
            macScreen.style.boxShadow = '';
            macScreen.style.transform = '';
            codeLines.forEach(line => {
                line.style.color = '';
                line.style.fontWeight = '';
            });
        }, 2000);
    }

    if (crashBtn) {
        crashBtn.addEventListener('click', simulateCrash);
    }

    if (smoothBtn) {
        smoothBtn.addEventListener('click', showSmoothPerformance);
    }
}

// AI Chat Functionality
let messageCount = 0;
let advocateWins = 0;

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    // Track chat interaction
    trackEvent('chat_message_sent', {
        message_length: message.length,
        timestamp: new Date().toISOString()
    });

    // Add user message to chat
    addMessageToChat(message, 'user');
    input.value = '';

    // Update message count
    messageCount++;
    document.getElementById('messageCount').textContent = messageCount;

    // Show typing indicator
    showTypingIndicator();

    try {
        // Send to AI backend
        const baseUrl = window.location.origin;
        const response = await fetch(`${baseUrl}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        // Remove typing indicator
        removeTypingIndicator();

        // Add AI response to chat
        addMessageToChat(data.response, 'ai');

        // Update advocate wins (assume advocate always wins for now)
        advocateWins++;
        document.getElementById('advocateWins').textContent = advocateWins;

        // Track chat interaction for analytics
        if (typeof va !== 'undefined') {
            va('track', 'Chat Message Sent', { 
                message_count: messageCount,
                advocate_wins: advocateWins 
            });
        }

    } catch (error) {
        console.error('Chat error:', error);
        removeTypingIndicator();
        addMessageToChat("Sorry, I'm having trouble connecting right now. But I guarantee if I could respond, I'd have a killer argument for why that MacBook should stay! 🤖", 'ai');
    }
}

function sendPredefinedMessage(message) {
    const input = document.getElementById('chatInput');
    input.value = message;
    sendMessage();
}

function addMessageToChat(content, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const avatar = sender === 'ai' ? '🤖' : '🧠';
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${content}</p>
            <div class="message-time">${time}</div>
        </div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.className = 'message ai-message typing';

    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;

    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Analytics helper function
function trackEvent(name, properties = {}) {
    if (typeof window !== 'undefined' && window.va) {
        window.va('track', name, properties);
    }
}

// Check API status and update UI
async function checkApiStatus() {
    try {
        const baseUrl = window.location.origin;
        const response = await fetch(`${baseUrl}/api/status`);
        const status = await response.json();

        const statusIndicator = document.querySelector('.status-indicator');
        const statusText = document.querySelector('.chat-status');

        if (statusIndicator && statusText) {
            if (status.openai_configured) {
                statusIndicator.style.backgroundColor = '#4CAF50';
                statusText.innerHTML = '<span class="status-indicator"></span>OpenAI GPT-3.5 Active';
            } else {
                statusIndicator.style.backgroundColor = '#FF9800';
                statusText.innerHTML = '<span class="status-indicator"></span>Fallback Mode (No OpenAI Key)';
            }
        }
    } catch (error) {
        console.error('Failed to check API status:', error);
    }
}

// Handle Enter key in chat input
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

});

// Check API status for analytics
async function checkApiStatus() {
    try {
        const response = await fetch('/api/status');
        const data = await response.json();
        
        // Track API configuration status
        if (typeof va !== 'undefined') {
            va('track', 'API Status Check', {
                openai_configured: data.openai_configured,
                ai_mode: data.ai_mode
            });
        }
    } catch (error) {
        console.log('Could not check API status');
    }
}

// Initialize all effects when page loads
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    animateProgressBars();
    enhanceFloatingElements();
    initParallaxEffect();
    animateCounters();
    addSparkleEffects();
    animateGradientText();
    addShakeEffect();
    addShakeAnimation();
    initKonamiCode();
    initMouseTrail();

    // Initialize new interactive features
    initValueCalculator();
    initCommitmentTracker();
    initProductivitySimulator();

    // Track page load for analytics
    if (typeof va !== 'undefined') {
        va('track', 'Page Loaded');
    }

    // Check API status on page load
    checkApiStatus();

    // Add some dynamic content updates
    setTimeout(() => {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            typeWriterEffect(heroSubtitle, 'Why this MacBook is worth more than cash for my startup future', 50);
        }
    }, 2000);

    // Add loading animation completion
    document.body.classList.add('loaded');
});

// Add scroll-triggered animations for better performance
let ticking = false;

function updateAnimations() {
    // Update any scroll-based animations here
    ticking = false;
}

document.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
});

// Performance optimization: Reduce animations on mobile
if (window.innerWidth <= 768) {
    document.body.classList.add('mobile-optimized');
    
    // Disable some heavy animations on mobile
    const style = document.createElement('style');
    style.textContent = `
        .mobile-optimized .floating-elements {
            display: none;
        }
        
        .mobile-optimized .sparkle::after {
            display: none;
        }
    `;
    document.head.appendChild(style);
}