backendURL = "http://localhost:8080";

function loadAgencies(tagID) {
    apiPath = "/agencias";


    fetch(backendURL + apiPath)
        .then(resp => resp.json())
        .then(list => createSelectorOptions(list, "id", "name", tagID));
}


function createSelectorOptions(list, listID, listName, tagID) {
    let selectorHTML = `<option selected>Selecione uma opção</option>`;

    for (let i = 0; i < list.length; i++) {
        console.log(list[i].id + " " + list[i].name)
        selectorHTML += `<option value="${list[i].id}">${list[i].name}</option>`;
    }

    document.getElementById(tagID).innerHTML = selectorHTML;
}

function createSchedule() {
    apiPath = "/novoagendamento";

    let customName = document.getElementById("customerName").value;
    let customEmail = document.getElementById("customerEmail").value;
    let customPhone = document.getElementById("customerPhone").value;
    let schedDate = document.getElementById("schedDate").value;
    let schedTime = document.getElementById("schedTime").value;
    let obs = document.getElementById("obs").value;
    let agencyID = parseInt(document.getElementById("agency").value);

    let fillStatus = [];
    fillStatus.push(customName,customEmail,customPhone,schedDate,schedTime,agencyID);

    if (fillStatus.indexOf("") != -1) {
        alert("Preencha todos os dados requeridos");
        return 1
    }

    let msgBody = {
        customerName : customName,
        customerEmail : customEmail,
        customerPhone : customPhone,
        schedulingDate : schedDate,
        schedulingTime : schedTime,
        observation : obs,
        agency : {
            id: agencyID
        }
    }

    let msgHeader = {
        "content-type": "application/json"
    }

    let msg = {
        method : "POST",
        body : JSON.stringify(msgBody),
        headers : msgHeader
    }

    fetch(backendURL + apiPath, msg).then(resp => treatResponse(resp));
}

function treatResponse(resp) {
    if (resp.status == 201) {
        alert("Solicitacao de agendamento Efetivada!");
        window.location = "scheduler.html";
    }
    else {
        alert("ERRO ao atender solicitacao");
        console.log(resp.body);
    }
}