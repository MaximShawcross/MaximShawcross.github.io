"use strict";
document.addEventListener('DOMContentLoaded', () => {
    //TABS
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });

        }


    });

    // TIMER
    const deadLine = '2021-12-12';

    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }
    }
    setClock('.timer', deadLine);

    //MODAL WINDOW // 135 lINE CALL MODAL WINDOW WITH INTERVAL AND WHEN clientHeight == someNum

    const modalParent = document.querySelector('.modal'),
        modalTrigger = document.querySelectorAll('[data-modal]');

    const timerId = setTimeout(() => {
        showModal();
        closeModal();
    }, 50000);

    // const timerIdInterval = setInterval(() => {
    //     showModal();
    //     closeModal();
    // }, 3000);

    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', showModal);
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modalParent.classList.contains('show')) {
            closeModalCode();
        }
    });


    function closeModal() {
        const modal = document.querySelector('.modal');

        modal.addEventListener('click', (event) => {
            if (event.target === modal || event.target.getAttribute('data-close') == '') {
                closeModalCode();
            }
        });
    }

    // console.log(document.documentElement.scrollHeight); // 3984
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    function closeModalCode() {
        modalParent.classList.remove('show');
        modalParent.classList.add('hide');
        document.body.style.overflow = "";
    }

    function showModal() {

        modalParent.classList.add('show');
        modalParent.classList.remove('hide');
        document.body.style.overflow = "hidden";
        closeModal();
        // clearInterval(timerIdInterval);

    }
    // create card with classes

    class CardCreate {
        constructor(img, alt, menuName, desccription, totalPrice, parentSelector, ...classes) {
            this.parentSelector = document.querySelector(parentSelector);
            this.menuName = menuName;
            this.desccription = desccription;
            this.totalPrice = totalPrice;
            this.img = img;
            this.alt = alt;
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }
        changeToUAH() {
            this.totalPrice = +this.totalPrice * +this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = "menu__item";
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
            <img src=${this.img} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.menuName}"</h3>
            <div class="menu__item-descr">${this.desccription}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.totalPrice}</span> грн/день</div>
            `;

            this.parentSelector.append(element);
        }

    }
    // const newCard = new CardCreate();
    // newCard.render();

    const getRecources = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, ${res.status}`);
        }

        return await res.json();
    };

    // getRecources('http://localhost:3000/menu')
    // .then(data =>{
    // data.forEach(function ({img, altimg, title, descr, price}) {
    //     new CardCreate(img, altimg, title, descr, price, ".menu .container").render();
    // });
    // });

    axios.get('http://localhost:3000/menu')
        .then((data) => {
            data.data.forEach(function ({
                img,
                altimg,
                title,
                descr,
                price
            }) {
                new CardCreate(img, altimg, title, descr, price, ".menu .container").render();
            });
        });

    // Forms and add spinner on load (274)

    const forms = document.querySelectorAll('form');


    forms.forEach(item => {
        bindPostData(item);
    });
    // post data functions
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: data /* formData */
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const massage = {
                loading: "img/form/spinner.svg",
                succsess: "Evrything's okey",
                failure: "Sorry, something failure"
            };

            const statusMassage = document.createElement('img');
            statusMassage.src = massage.loading;
            statusMassage.classList.add('spinner');
            // form.append(statusMassage);
            form.insertAdjacentElement('afterend', statusMassage);



            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(massage.succsess);
                    statusMassage.remove();
                }).catch(() => {
                    showThanksModal(massage.failure);
                }).finally(() => {
                    form.reset();
                });

        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
         `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            closeModalCode();
        }, 400);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json());
    // .then(res => console.log(res));

    //slider
    const nextSlide = document.querySelector('.offer__slider-next'),
        prevSlide = document.querySelector('.offer__slider-prev'),
        slides = document.querySelectorAll('.offer__slide'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total');

    let slideIndex = 1;


    // if (slides.length < 10) {
    //     total.textContet = `0${slides.lenght}`;
    // } else {
    //     total.textContet = slides.lenght;
    // }

    // showSlides(slideIndex);

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }


    //     slides.forEach(item => {
    //         item.classList.remove('show');
    //         item.classList.add('hide');
    //     });

    //     slides[slideIndex - 1].classList.remove('hide');
    //     slides[slideIndex - 1].classList.add('show');

    //     if (slides.length < 10) {
    //         current.textContent =`0${slideIndex}`;
    //     } else {
    //         current.textContent =slideIndex;
    //     }
    // }



    // function plusSlide(n) {
    //     showSlides(slideIndex += n);
    // }

    // nextSlide.addEventListener('click', () => {
    //     plusSlide(1);    
    // });

    // prevSlide.addEventListener('click', () => {
    //     plusSlide(-1);
    // });

    //2 option
    const slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

        let offset = 0;

        if (slides.length < 10) {
            total.textContet = `0${slides.lenght}`;
            current.textContent = `0${slideIndex}`;
        } else {
            total.textContet = slides.lenght;
            current.textContent = slideIndex;
        }
        


    slidesField.style.width = 100 * slides.length + '%';
    slides.forEach(item =>{
        item.style.width = width;
    });

    nextSlide.addEventListener('click', ()=>{
        if(offset == +width.slice(0, width.length -2) * (slides.length -1)){
            offset = 0;
        }else{
            offset += +width.slice(0, width.length -2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        
        if(slideIndex == slides.length){
            slideIndex =1;
        }else{
            slideIndex++;
        }

        if(slides.length <10){
            current.textContent =`0${slideIndex}`;
        }else{
            current.textContent = slideIndex;
        }

    });
    prevSlide.addEventListener('click', () =>{
        if(offset == 0){
            offset = +width.slice(0, width.length -2) * (slides.length-1);
        }else{
            offset -= +width.slice(0, width.length -2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
       
        if(slideIndex == 1){
            slideIndex = slides.length;
        }else{
            slideIndex--;
        }

        if(slides.length <10){
            current.textContent =`0${slideIndex}`;
        }else{
            current.textContent = slideIndex;
        }

    });

});