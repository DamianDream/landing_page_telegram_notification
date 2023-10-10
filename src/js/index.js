import images from "./modules/images"
import formNotificationHandler from './modules/formNotificationHandler'
import modal from "./modules/modal"

window.addEventListener('DOMContentLoaded', () => {
    "use strict"

    formNotificationHandler('header-form')
    formNotificationHandler('footer-form')
    formNotificationHandler('modal-form')

    modal()

    images()
})