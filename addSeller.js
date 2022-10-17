async function addSeller() {

    let apiUrl = 'https://prod-121.westus.logic.azure.com:443/workflows/acf213a55a224c198cf15c42d41b6714/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=_yQ6X42XNqNte4bNcptpSl4MVpeUKagBsnGNRVR2xxU';

    var ID = document.getElementById("ID").value
    var email = document.getElementById("email").value
    var name = document.getElementById("name").value




    //Build the JSON Body
    let data = {
        "sellerID": ID,
        "sellerEmail": email,
        "sellerName": name


    }

    //NEW FETCH Code to POST data. This mean it sends data to the API in addition to calling it
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const results = await response.json();

    return results;

}