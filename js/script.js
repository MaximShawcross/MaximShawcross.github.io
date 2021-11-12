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


    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });



            // const time = setTimeout(function(item) {
            //     alert(item);
            // }, 200, 'Some Item');
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
        const   modal = document.querySelector('.modal');
       
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
            
            if(this.classes.length === 0){
                this.element = "menu__item";
                element.classList.add(this.element);
            }else{
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
    new CardCreate(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        10,
        ".menu .container",
        // "menu__item"    
    ).render();

    new CardCreate(
        "img/tabs/elite.jpg",
        "elite",
        "Меню 'Премиум'",
        "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        14,
        ".menu .container",
        // "menu__item"
    ).render();

     new CardCreate(
        "img/tabs/vegy.jpg",
        "post",
        "Меню 'Постное'",   
        "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        21,
        ".menu .container",
        "menu__item"
    ).render(); 
   
    // Forms and add spinner on load (274)

    const forms = document.querySelectorAll('form');
    

    forms.forEach(item => {
        postData(item);
    });

    function postData(form){
        form.addEventListener('submit', (e)=>{
            e.preventDefault();
            
            const massage = {
                failure: "Sorry, something failure",
                loading: "img/form/spinner.svg",
                succsess: "Evrything's okey"
            };

            const statusMassage = document.createElement('img');
            statusMassage.src = massage.loading;
            statusMassage.classList.add('spinner');
            // form.append(statusMassage);
            form.insertAdjacentElement('afterend', statusMassage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);

            const obj = {};
            formData.forEach(function(value, key){
                obj[key] = value;
            });

            const json = JSON.stringify(obj);

            request.send(json);

            request.addEventListener('load', ()=>{
                if(request.status === 200){
                    console.log(request.response);
                    showThanksModal(massage.succsess);
                    form.reset();
                    statusMassage.remove();  
                }else{
                    showThanksModal(massage.failure);
                }
            });
        });
    }
    
    function showThanksModal(message){
        const prevModalDialog =document.querySelector('.modal__dialog');

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

         setTimeout(()=>{
             thanksModal.remove();
             prevModalDialog.classList.remove('hide');
             prevModalDialog.classList.add('show');
             closeModalCode();
         },400);
    }
    
});