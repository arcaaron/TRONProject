function toggleMenu(){ 
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// GSAP animations
gsap.from('.logo', { duration: 1, x: '-100vw', ease: 'power2.in'})
gsap.from('.nav-links', {duration: 2, opacity: 0, delay: .3})
gsap.from('.section__text__p1', { duration: 1, x: '-100vw', delay: .5, ease: 'power2.in'})
gsap.from('.title', {duration: 3, opacity: 0, delay: 2})
gsap.from('.section__text__p2', {duration: 1.5, opacity: 0, delay: 1})
gsap.from('.section__pic-container', {duration: 2, opacity: 0, delay: .2})