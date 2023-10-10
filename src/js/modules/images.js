
const images = () => {
    const imgPopup = document.createElement('div'),
        workSection = document.querySelector('.gallery'),
        bigImage = document.createElement('img'),
        span = document.createElement('span');

    imgPopup.classList.add('popup')
    span.classList.add('popup__text')
    imgPopup.appendChild(span)
    workSection.appendChild(imgPopup)

    imgPopup.style.justifyContent = 'center'
    imgPopup.style.alignItems = 'center'
    imgPopup.style.display = 'none'

    imgPopup.appendChild(bigImage)

    workSection.addEventListener('click', (e) => {
        e.preventDefault()
        let target = e.target
        let text = target.dataset.breed

        if (target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex'
            span.textContent = text
            document.body.style.overflow = 'hidden'

            const path = target.parentNode.getAttribute('href')
            bigImage.setAttribute('src', path)
        }

        if (target && target.matches('div.popup')) {
            imgPopup.style.display = 'none'
            span.textContent = ''
            document.body.style.overflow = ''
        }
    })
}

export default images