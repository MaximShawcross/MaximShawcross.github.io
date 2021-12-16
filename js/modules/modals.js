function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = "";

}

function showModal(modalSelector, timerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = "hidden";


    console.log(timerId);
    if (timerId) {
        clearInterval(timerId);
    }
}

function modal(triggerSelector, modalSelector, timerId) {
    // modal

    const modalParent = document.querySelector(modalSelector);
    const modalTrigger = document.querySelectorAll(triggerSelector);

    // const timerIdInterval = setInterval(() => {
    //     showModal();
    //     closeModal();
    // }, 3000);

    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', () => showModal(modalSelector, timerId));
    });


    modalParent.addEventListener('click', (e) => {
        if (e.target === modalParent || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modalParent.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });
    // console.log(document.documentElement.scrollHeight); // 3984
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modalSelector, timerId);
            window.removeEventListener('scrosll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    // clearInterval(timerIdInterval);
}
export default modal;
export {
    closeModal
};
export {
    showModal
};