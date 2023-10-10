const getFormData = (formNode, modalSelector) => {
    let formDataMessage = `WebPage notification:%0A`
    const data = Object.fromEntries(new FormData(formNode))

    function getSelectorValue(selector) {
        const nodeElement = document.getElementById(selector)
        return `Вибрана порода: ${nodeElement.value}%0A`
    }

    for(let key in data) {
        if(data[key]) {
            let title = ""
            switch(key) {
                case "username":
                    title = "Iм'я"
                    break
                case "usertel":
                    title = "Телефон"
                    break
                case "usermessage":
                    title = "Повідомлення"
                    break
                default:
                    title = "bane"
            }
            formDataMessage += `${title}: ${data[key]}%0A`
        }
    }

    if(modalSelector) {
        formDataMessage += getSelectorValue('breedchose')
    }
    return formDataMessage;
}
export default getFormData