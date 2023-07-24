

const slides = document.getElementsByClassName('slide');
// const dots = document.querySelectorAll('.slider-dot')
// slides[slideIndex].classList.add('active')
// let prev = document.querySelector('.active .sliderprevbtn');
// let next = document.querySelector('.active .slidernextbtn');

let slideIndex = 0;
// let prev = document.querySelector('.sliderprevbtn');
let next = document.querySelector('.nextbtn');

const showSlides = (n) => {
    
    // if (n > slides.length - 1 ){ n = 0, slideIndex = n }
    // if ( n < 0 ){ n = slides.length - 1; slideIndex = n}
    
    if (n > slides.length - 1 || n < 0 ){ return; }
    
    for (i = 0; i < slides.length; i++){
        slides[i].style.display = 'none';
        slides[i].classList.remove('active');
        // dots[i].classList.remove('slider-dot--active')
        
    }
    
    slides[n].style.display = 'flex';
    slides[n].classList.add('active');
    // prev = document.querySelector('.active .sliderprevbtn');
    next = document.querySelector('.active .nextbtn');
    // prev.addEventListener('click', () => showSlides(--slideIndex));
    next.addEventListener('click', () => showSlides(++slideIndex));
    
    // dots[n].classList.add('slider-dot--active')
}

showSlides(slideIndex);

// dots.forEach((dot, i) => {
//     dot.addEventListener('click', () => {
//         showSlides(i)
//     })
// })

