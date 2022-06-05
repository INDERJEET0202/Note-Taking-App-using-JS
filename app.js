console.log("Welcome to notes taking app")
// If user adds a note to the local storage
showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function(e){
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem("notes")
    if(notes == null){
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    if(addTxt.value != ""){
        notesObj.push(addTxt.value);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
        console.log(notesObj);
        showNotes();
        let date = new Date();
        // Date with time
        let today = date.getTime() + date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
        let alertTxt = document.getElementById('alert');
        alertTxt.innerHTML = 
        `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Your note has been added successfully ! Timestamp :&nbsp ${new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
    }
    else{
        // alert("Please enter a note");
        let alertTxt = document.getElementById('alert');
        alertTxt.innerHTML = 
        `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Warning!</strong> You have to enter some text to add as a Note.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
    }

})

function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    // let date = new Date();
    // let today = + " " + date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
    notesObj.forEach(function(element, index){
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <!-- <div class="timeStamp">Time stamp :&nbsp; <div id="date"> </div> </div> -->
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
        </div>
        `
    });
    let notesElm = document.getElementById('notes');
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<h4>Nothing to show! Use "Add Note" section to add notes</h4>`;
    }

}

// Function to delete a note
function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

search = document.getElementById('searchTxt');
search.addEventListener('input', function(){
    // console.log("Input event fired");
    let inputVal = search.value.toLowerCase();
    // console.log(inputVal);
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})