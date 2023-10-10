function showModal(el) {
    el.showModal()
    document.body.style.overflow = 'hidden'
}
function removeWindowFreez() {
    document.body.style.overflow = ''
}

const modal = () => {
    const pricingNodes = document.querySelectorAll('.pricing-card__button')
    const closeModalBtn = document.querySelector('.modal-form__btn')
    const modal = document.querySelector('[data-modal]')
    const dialog = document.querySelector('dialog')

    // showModal(modal)

   pricingNodes.forEach(item => {
       item.addEventListener('click', (e) => {
           showModal(modal)
       })
   })

    closeModalBtn.addEventListener('click', () => {
        removeWindowFreez()
    })

    dialog.addEventListener("click", e => {
        const dialogDimensions = dialog.getBoundingClientRect()
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            dialog.close()
            removeWindowFreez()
        }
    })
}

export default modal
