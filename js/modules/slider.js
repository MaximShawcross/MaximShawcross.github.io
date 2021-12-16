function slider({container, slide, nextArrow, prevArrow, totalCount, currentCount, wrapper, slideField}){
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        nextSlide = document.querySelector(nextArrow),
        prevSlide = document.querySelector(prevArrow),
        total = document.querySelector(totalCount),
        current = document.querySelector(currentCount),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(slideField),

        width = window.getComputedStyle(slidesWrapper).width;

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    let slideIndex = 1;

    let offset = 0;

    function showCurrentTotalWithZero(parent, index) {
        if (slides.length < 10) {
            total.textContet = `0${parent}`;
            current.textContent = `0${index}`;
        } else {
            total.textContet = parent;
            current.textContent = index;
        }
    }

    function dotsArrOpocity() {
        dotsArr.forEach(dot => dot.style.opacity = '.5');
        dotsArr[slideIndex - 1].style.opacity = 1;
    }

    slidesField.style.width = 100 * slides.length + '%';

    slides.forEach(item => {
        item.style.width = width;
    });

    // slide Navigation start /
    const indicators = document.createElement('ol'),
        dotsArr = [];

    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');

        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dotsArr.push(dot);

    }
    //end slide Navigation finisher/  



    nextSlide.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        showCurrentTotalWithZero(slides.lenght, slideIndex);

        dotsArrOpocity();

    });

    prevSlide.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        showCurrentTotalWithZero(slides.lenght, slideIndex);

        dotsArrOpocity();
    });
    dotsArr.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');

            slideIndex = slideTo;

            offset = deleteNotDigits(width) * (slideTo - 1);

            showCurrentTotalWithZero(slides.lenght, slideIndex);
            dotsArrOpocity();

            slidesField.style.transform = `translateX(-${offset}px)`;
        });
    });
}

export default slider;