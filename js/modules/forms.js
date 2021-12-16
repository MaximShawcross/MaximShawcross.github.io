import {
    closeModal,
    showModal
} from './modals';
import {postData} from '../services/services';


function forms(formSelector, timerId) {
    const forms = document.querySelectorAll(formSelector);

    forms.forEach(item => {
        bindPostData(item);
    });
    // post data functions
   

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
        showModal('.modal', timerId);

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
            closeModal('.modal');
        }, 400);

        fetch('http://localhost:3000/menu')
            .then(data => data.json());
        // .then(res => console.log(res));
    }


}



export default forms;