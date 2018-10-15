let ip,city

$(async () => {
    $.getJSON("http://ip-api.com/json", (data) => { ip = data.query; city = data.city })
})