import getUrl from './getUrl'
import fetchTelegramMessage from './fetchTelegramMessage'
import getFormData from './getFormData'
import validateForm from './validateForm'

const formNotificationHandler = ( formID ) => {
    const form = document.getElementById(formID)
    validateForm(form)


    let modalSelector = false;
    if(formID === 'modal-form') {
        modalSelector = true
    }
    const sendFormNotification = async (event) => {
        event.preventDefault()

        const message = getFormData(form, modalSelector)
        const url = getUrl(message)
        await fetchTelegramMessage(url, form)
    }
    form.addEventListener('submit', sendFormNotification)
}

export default formNotificationHandler