import {getRecources} from '../services/services';

function cards() {
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

    // one more change
    axios.get('https://my-json-server.typicode.com/maximshawcross/server-for-good-food-deliry/menu')
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

}

export default cards;
