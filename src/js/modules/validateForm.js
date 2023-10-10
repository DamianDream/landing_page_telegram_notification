const validateForm = (formNode) => {
    const teleInput = formNode.querySelector('input[type="tel"]')

    teleInput.addEventListener('input', (e) => {
        teleInput.setCustomValidity('');
        teleInput.checkValidity();
    })

    teleInput.addEventListener('invalid', () => {
        if(teleInput.value === '') {
            teleInput.setCustomValidity('Додайте телефон для звязку!');
        } else {
            teleInput.setCustomValidity('Телефон має бути в такому форматі: 050-123-45-65');
        }
    });
}

export default validateForm