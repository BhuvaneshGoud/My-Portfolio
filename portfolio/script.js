const menubar = document.querySelector('#menu');
const Navbar = document.querySelector('.navbar');
menubar.onclick=()=>{
    menubar.classList.toggle('bx-x');
    Navbar.classList.toggle('active')
}
const section=document.querySelectorAll('section');
const navlink = document.querySelectorAll('header nav a')
window.onscroll = ()=>{
    section.forEach(sec=>{
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id')
        if(top>offset && top < offset + height){
            sec.classList.add('start-animation');
            navlink.forEach(links=>{
                links.classList.remove('active')
                document.querySelector('header nav a[href*='+id+']').classList.add('active')
              
            })
        }
    })
    var header = document.querySelector('.header');
    header.classList.toggle('sticky',window.scrollY>100)
    menubar.classList.remove('bx-x');
    Navbar.classList.remove('active')
}

// Smooth scroll functionality for buttons
const letsTalkBtn = document.getElementById('letsTalkBtn');
const readMoreBtn = document.getElementById('readMoreBtn');

// Function to smoothly scroll to a target section
function smoothScrollTo(targetId, duration = 1000) {
    const target = document.querySelector(targetId);
    if (!target) return;
    
    const targetPosition = target.offsetTop - 100;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function for smooth scrolling
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Let's Talk button - scrolls to Contact section
if (letsTalkBtn) {
    letsTalkBtn.addEventListener('click', () => {
        smoothScrollTo('#contact', 100);
    });
}

// Read More button - scrolls to Education, then automatically to Skills
if (readMoreBtn) {
    readMoreBtn.addEventListener('click', () => {
        // First scroll to Education section
        smoothScrollTo('#education', 500);
        
        // After scrolling to Education, wait and then scroll to Skills
        setTimeout(() => {
            smoothScrollTo('#skills', 500);
        }, 1800); // Wait for the first scroll to complete + some buffer time
    });
}
