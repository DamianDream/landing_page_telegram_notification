const getUrl = (message) => {
    // const _TOKEN = "6580816336:AAGmm6cN09FQmkMrexKkDeRBNTv0lSVqZRA"
    // const _CHAT_ID = "-1001721377931"
    return `https://api.telegram.org/bot6580816336:AAGmm6cN09FQmkMrexKkDeRBNTv0lSVqZRA/sendMessage?chat_id=-1001721377931&text=${message}&parse_mode=html`
    // return `https://api.telegram.org/bot${_TOKEN}/sendMessage?chat_id=${_CHAT_ID}&text=${message}&parse_mode=html`
}

export default getUrl