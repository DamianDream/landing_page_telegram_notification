const fetchTelegramMessage = async (url, form) => {
    try {
        const response = await fetch(url, { method: "GET" })
        if(response.ok) {
            form.reset()
        }
    } catch(error) {
        console.log('There was an error', error.message);
    }
}

export default fetchTelegramMessage