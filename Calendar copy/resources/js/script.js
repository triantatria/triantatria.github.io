let events = [];
let set2Delete= "";
let idIndex = 0;

function updateLocationOptions(edit) {
    const eMod = document.getElementById(edit+"event_modality").value;
    const eRURL = document.getElementById(edit+"event_remote_url_cont");
    const eLoc = document.getElementById(edit+"event_location_cont");

    if (eMod == "in-person") {
        eRURL.style.display = "none";
        eLoc.style.display = "block";
    } if (eMod == "remote") {
        eRURL.style.display = "block";
        eLoc.style.display = "none";
    }
}

function saveEvent(edit) {
    const eDetails = {
        id: idIndex,
        name: null,
        category: null,
        weekday: null,
        time: null,
        modality: null,
        location: null,
        remote_url: null,
        attendees: null
    };
    idIndex++;
    const nameHolder = document.getElementById("event_name").value;
    eDetails.name = document.getElementById(edit + "event_name").value;
    eDetails.category = document.getElementById(edit + "event_category").value;
    eDetails.weekday = document.getElementById(edit + "event_weekday").value;
    eDetails.time = document.getElementById(edit + "event_time").value;
    eDetails.modality = document.getElementById(edit + "event_modality").value;
    if(eDetails.modality == "in-person"){
        eDetails.location = document.getElementById(edit + "event_location").value;
    }else{
        eDetails.remote_url = document.getElementById(edit + "event_remote_url").value;
    }
    eDetails.attendees = document.getElementById(edit + "event_attendees").value;
  

    const remoteInput1 = document.getElementById(edit + "event_name");
    if (!remoteInput1.checkValidity()) {
        remoteInput1.classList.add("is-invalid");
        remoteInput1.reportValidity();
        return;
    } else {
        remoteInput1.classList.remove("is-invalid");
    }

    const remoteInput2 = document.getElementById(edit + "event_time");
    if (!remoteInput2.checkValidity()) {
        remoteInput2.classList.add("is-invalid");
        remoteInput2.reportValidity(); 
        return;
    } else {
        remoteInput2.classList.remove("is-invalid");
    }
        if (eDetails.modality === "in-person") {
    const remoteInput3 = document.getElementById(edit + "event_location");
    if (!remoteInput3.checkValidity()) {
        remoteInput3.classList.add("is-invalid");
        remoteInput3.reportValidity(); 
        return;
    } else {
        remoteInput3.classList.remove("is-invalid");
    }
}

    const remoteInput4 = document.getElementById(edit + "event_attendees");
    if (!remoteInput4.checkValidity()) {
        remoteInput4.classList.add("is-invalid");
        remoteInput4.reportValidity(); 
        return;
    } else {
        remoteInput4.classList.remove("is-invalid");
    }

    if (eDetails.modality === "remote") {
      const remoteInput = document.getElementById(edit + "event_remote_url");
      if (!remoteInput.checkValidity()) {
        remoteInput.classList.add("is-invalid");
        remoteInput.reportValidity(); 
        return;
      } else {
        remoteInput.classList.remove("is-invalid");
      }
    }
    

    events.push(eDetails); //Found push command on Stack Overflow
    console.log(events);
    addEventToCalendarUI(eDetails);
    document.getElementById(edit + "data_form").reset();

    const modalElement = bootstrap.Modal.getInstance(document.getElementById(edit + 'event_modal')); //Found this line on Stack Overflow
    modalElement.hide(); //Found this line on Stack Overflow

    updateLocationOptions(edit);

    if(edit == 'edit_'){
        console.log(set2Delete);
        deleteEventCard(set2Delete);
    }
}

function  addEventToCalendarUI(eInfo) {
    //console.log("In func Name:" + eInfo.name)
    let event_card = createEventCard(eInfo);
    console.log(eInfo.weekday)
    let wDay = document.getElementById(eInfo.weekday);
    wDay.appendChild(event_card)
}

function createEventCard(eDeets){
    let event_element = document.createElement('div');
    event_element.classList = 'event row border rounded m-1 py-1';
    event_element.style.backgroundColor = eDeets.category;
    event_element.id = eDeets.id;
    event_element.onclick = () => editEventCard(eDeets); //Stack Overflow
    let info = document.createElement('div');
    info.innerHTML = "<strong> Name</strong>: " + eDeets.name + "<br>";
    info.innerHTML += "<strong>Time</strong>: " + eDeets.time + "<br>";
    
    if(eDeets.modality == "in-person"){
        info.innerHTML += "<strong>Modality</strong>: In-Person <br>";
        info.innerHTML += "<strong>Location</strong>: " + eDeets.location + "<br>";
    }else{
        info.innerHTML += "<strong>Modality</strong>: Remote <br>";
        info.innerHTML += "<strong>Remote URL</strong>: " + eDeets.remote_url + "<br>";
    }
    info.innerHTML += "<strong>Attendees</strong>: " + eDeets.attendees + "<br>";
    
    event_element.appendChild(info);
    return event_element;
}

function editEventCard(eDeets){
    console.log(eDeets.id);
    set2Delete = eDeets;
    document.getElementById("edit_event_name").value = eDeets.name;
    document.getElementById("edit_event_time").value = eDeets.time;
    document.getElementById("edit_event_weekday").value = eDeets.weekday;
    document.getElementById("edit_event_modality").value = eDeets.modality;
    if(eDeets.modality == "in-person"){
        document.getElementById("edit_event_location").value = eDeets.location;
    }else{
        document.getElementById("edit_event_remote_url").value = eDeets.remote_url;
    }
    document.getElementById("edit_event_attendees").value = eDeets.attendees;

    let modal = new bootstrap.Modal(document.getElementById('edit_event_modal'));
    modal.show();    

    updateLocationOptions('edit_');
}

function deleteEventCard(card){
    for (let i = 0; i < events.length; i++) {
        if (events[i].name === card.name) {
            events.splice(i, 1); //stack overflow
            break;
        }
    }

    const allCards = document.querySelectorAll('.event'); //stack overflow
    for (let i = 0; i < allCards.length; i++) {
        if (allCards[i].id == card.id) {
            allCards[i].remove();
            break;
        }
    }
}