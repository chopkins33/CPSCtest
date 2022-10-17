async function addFlagged() {

    let apiUrl = 'https://prod-41.westus.logic.azure.com:443/workflows/51fb74ea502b479c8baf7b198f8d6453/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=M9B76qG3E5rezEPlY-rArA6zCfaeqpQgF0Bt6efKnPY';

    var flagListingID = document.getElementById("flagListingID").value
    var flagListingURL = document.getElementById("flagListingURL").value
    var flagSellerID = document.getElementById("flagSellerID").value
    var flagInvestigatorID = document.getElementById("flagInvestigatorID").value





    //Build the JSON Body
    let data = {
        "listingID": flagListingID,
        "listingURL": flagListingURL,
        "sellerID": flagSellerID,
        "investigatorID": flagInvestigatorID



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
    await updateTable2();

    return results;

}

async function getFlagged() {

    //Same Code as In Class 08 https://jsfiddle.net/jdickhans/zbfwrve8/9/

    let apiUrl = 'https://prod-158.westus.logic.azure.com:443/workflows/9ab6ca00966f4de599aa96ac327bcecf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=FEAsXSui3c9NZY0ypAPXxhtY_f2aYXjOy8HSqfi_ZH0';


    const response = await fetch(apiUrl);

    const results = await response.json();

    return results;


    /* SAMPLE OF Array 1
            [
            {
            "@odata.etag": "",
            "ItemInternalId": "3f6f3355df544bb2b1ad792db656b8a3",
            "locationName": "Pamplin Hall",
            "address": "880 W Campus Dr",
            "city": "Blacksburg",
            "state": "VA",
            "zipCode": "24061",
            "latitude": "37.2286835",
            "longitude": "-80.4246478",
            "combinedCoordinates": "37.2286835,-80.4246478",
            "displayName": "880 W Campus Dr, Blacksburg, VA 24061",
            "__PowerAppsId__": "3f6f3355df544bb2b1ad792db656b8a3,2"
            }
            ]
    */


}

async function updateTable2() {

    let container = document.getElementById("appointmentTableBodyCompl");

    //First Clear Out the Table
    container.innerHTML = "";

    //Get Address from API
    let flags = await getFlagged();

    //Loop Through Address
    for (let index = 0; index < flags.length; index++) {

        //Insert into table
        let row = createFlaggedRow(flags[index]);
        container.appendChild(row);
    }
    document.getElementById("flagListingID").value = "";
    document.getElementById("flagListingURL").value = "";
    document.getElementById("flagSellerID").value = "";
    document.getElementById("flagInvestigatorID").value = "";


}
function createFlaggedRow(flag) {
    /* SAMPLE HTML
            <tr data-powerappsid="3f6f3355df544bb2b1ad792db656b8a3" data-latitude="37.2286835" data-longitude="-80.4246478" data-name="Pamplin Hall">
                <th scope="row">Pamplin Hall</th>
                <td>880 W Campus Dr, Blacksburg, VA 24061</td>
                <td>37.2286835,-80.4246478</td>
                <td><button type="button" onclick="deleteAddress('3f6f3355df544bb2b1ad792db656b8a3')">Delete</button></td>
            </tr>
    */

    let flagRow = document.createElement("tr");
    flagRow.setAttribute("data-powerappsid", flag.ItemInternalId);
    flagRow.setAttribute("data-listingID", flag.listingID);
    flagRow.setAttribute("data-listingURL", flag.listingURL);
    flagRow.setAttribute("data-sellerID", flag.sellerID);
    flagRow.setAttribute("data-investigatorID", flag.investigatorID);
    flagRow.setAttribute("id", flag.ItemInternalId);
    console.log(flagRow.id);

    //Create by using Create Element
    let flagRowID = document.createElement('th');
    flagRowID.setAttribute("scope", "row");
    flagRowID.innerHTML = flag.listingID;

    let flagRowURL = document.createElement('td');
    flagRowURL.innerHTML = '<a href="#link">' + flag.listingURL + '<a/>';

    let flagRowSellID = document.createElement('td');
    flagRowSellID.innerHTML = flag.sellerID;

    let flagRowInvID = document.createElement('td');
    flagRowInvID.innerHTML = flag.investigatorID;



    /*  let appointmentRowActions = document.createElement('td');
      let btn = document.createElement("button");
      btn.innerHTML = "Cancel";
      let itemID = appointment.ItemInternalId;
      btn.setAttribute("onclick", "deleteRow('" + itemID + "')");
      appointmentRowActions.appendChild(btn);
      console.log(appointment.ItemInternalId + " this the first one")
  
      let appointmentRowActions2 = document.createElement('td');
      let btn2 = document.createElement("button");
      btn2.innerHTML = "Completed";
      let itemID2 = appointment.ItemInternalId;
      btn2.setAttribute("onclick", "completeApt('" + itemID2 + "')");
      appointmentRowActions2.appendChild(btn2);
      console.log(appointment.ItemInternalId + " this the first one")
  
  **/
    flagRow.appendChild(flagRowID);
    flagRow.appendChild(flagRowURL);
    flagRow.appendChild(flagRowSellID);
    flagRow.appendChild(flagRowInvID);

    /* appointmentRow.appendChild(appointmentRowActions2);
     appointmentRow.appendChild(appointmentRowActions);*/




    return flagRow;

}
