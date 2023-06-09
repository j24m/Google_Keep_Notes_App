let searchBarContainer = document.querySelector(".searchbar-container");
let searchbarInput = document.querySelector("#searchbar-input");
let notesHeading = document.querySelector("#notesHeading");
let archiveHeading = document.querySelector("#archiveHeading");
let trashHeading = document.querySelector("#trashHeading");
let archivesAppearHere = document.querySelector(".archives-appear-here");
let trashedAppearHere = document.querySelector(".trashed-appear-here");
let createNoteCard = document.querySelector(".create-note");
let addTitle = document.querySelector("#title");
let addNote = document.querySelector("#add-note");
let addNoteBtn = document.querySelector(".btn-add-note");
let addedTitle = document.querySelector(".addedTitle");
let showToastDiv = document.querySelector(".showToastDiv");
let toastMessage = document.querySelector(".toast-message");
let closeToastBtn = document.querySelector(".close-Toast");
let addedText = document.querySelector(".addedText");
let showNotesDiv = document.querySelector(".showNotesDiv");
let allNotes = [];
let archivedNotes = [];
let trashedNotes = [];
let archivedNotesDiv = document.querySelector(".archivedNotesDiv");
let trashedNotesDiv = document.querySelector(".trashedNotesDiv");

// Searchbar styling starts here
searchBarContainer.addEventListener("click", changeBackground);
function changeBackground(e) {
  if (e.target.tagName === "INPUT") {
    searchBarContainer.style.background = "white";
    searchBarContainer.style.boxShadow = "0px 1px 3px 1px rgba(65,69, 73, 0.3)";
  }
}

window.addEventListener("click", outsideClick);
function outsideClick(e) {
  let body = document.querySelector("body");
  if (e.target.tagName !== "INPUT") {
    searchBarContainer.style.background = "";
    searchBarContainer.style.boxShadow = "";
  }
}
// Search bar styling ends here

archivesAppearHere.style.display = "none";
trashedAppearHere.style.display = "none";
archivedNotesDiv.style.display = "none";
trashedNotesDiv.style.display = "none";
// Sidebar heading styling starts here
notesHeading.classList.add("active-link");
notesHeading.addEventListener("click", () => {
  notesHeading.classList.add("active-link");
  archiveHeading.classList.remove("active-link");
  trashHeading.classList.remove("active-link");
  createNoteCard.style.display = "flex";
  showNotesDiv.style.display = "flex";
  archivesAppearHere.style.display = "none";
  trashedAppearHere.style.display = "none";
  archivedNotesDiv.style.display = "none";
  trashedNotesDiv.style.display = "none";
});

archiveHeading.addEventListener("click", () => {
  notesHeading.classList.remove("active-link");
  archiveHeading.classList.add("active-link");
  trashHeading.classList.remove("active-link");
  createNoteCard.style.display = "none";
  trashedAppearHere.style.display = "none";
  trashedNotesDiv.style.display = "none";
  showNotesDiv.style.display = "none";
  if (archivedNotesDiv.innerHTML === "") {
    archivesAppearHere.style.display = "flex";
  } else {
    archivedNotesDiv.style.display = "flex";
  }
});

trashHeading.addEventListener("click", () => {
  notesHeading.classList.remove("active-link");
  archiveHeading.classList.remove("active-link");
  trashHeading.classList.add("active-link");
  createNoteCard.style.display = "none";
  archivesAppearHere.style.display = "none";
  showNotesDiv.style.display = "none";
  archivedNotesDiv.style.display = "none";
  if (trashedNotesDiv.innerHTML === "") {
    trashedAppearHere.style.display = "flex";
  } else {
    trashedNotesDiv.style.display = "flex";
  }
});
// Sidebar heading styling ends here

// hide toast initially
showToastDiv.style.display = "none";

//Create and capture new note
addNoteBtn.addEventListener("click", saveNote);
function saveNote() {
  const allNotesObj = {
    providedTitle: addTitle.value.trim(),
    providedNote: addNote.value.trim(),
  };

  if (allNotesObj.providedTitle === "") {
    toastMessage.innerHTML = "Please add a Title";
    showToastDiv.style.display = "block";
  } else if (allNotesObj.providedNote === "") {
    toastMessage.innerHTML = "Please add a Note";
    showToastDiv.style.display = "block";
  } else {
    allNotes.push(allNotesObj);
    renderAllnotes();
    addTitle.value = "";
    addNote.value = "";
  }
}

closeToastBtn.addEventListener("click", () => {
  showToastDiv.style.display = "none";
});

// Render all notes to DOM
function renderAllnotes() {
  let notes = "";
  for (note of allNotes) {
    notes += ` <div class="noteCard">
  <h1 class="addedTitle">${note.providedTitle}</h1>
  <p class="addedText">${note.providedNote}</p>
  <div class="operation-icons">
    <button class="btn btn-primary btn-floating btn-archive-note">
    <span class="archive-icon">
      <svg
        class="svg-archive-note"
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M5 21q-.825 0-1.413-.588T3 19V6.5q0-.375.125-.675t.325-.575l1.4-1.7q.2-.275.5-.413T6 3h12q.35 0 .65.137t.5.413l1.4 1.7q.2.275.325.575T21 6.5V19q0 .825-.588 1.413T19 21H5Zm.4-15h13.2l-.85-1H6.25L5.4 6ZM5 8v11h14V8H5Zm7 10l4-4l-1.4-1.4l-1.6 1.6V10h-2v4.2l-1.6-1.6L8 14l4 4Zm-7 1h14H5Z"
        />
      </svg>
      </span>
    </button>
    <button class="btn btn-primary btn-floating btn-trash-note">
    <span class="trash-icon">  
    <svg
      class="svg-trash-note"
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"
        />
      </svg>
      </span>
    </button>
  </div>
</div>`;
  }
  showNotesDiv.innerHTML = notes;

  // Capture archived note
  let btnArchiveNote = document.querySelectorAll(".btn-archive-note");

  btnArchiveNote.forEach((item) => {
    item.addEventListener("click", archivedNotesHandler);
  });
  function archivedNotesHandler(event) {
    let noteCardArr = Array.from(showNotesDiv.children);
    let indexOfNoteCardToBeArchived = noteCardArr.indexOf(
      event.target.closest(".noteCard")
    );
    let archivedNote = noteCardArr.splice(indexOfNoteCardToBeArchived, 1)[0];
    archivedNotes.push(archivedNote);
    allNotes.splice(indexOfNoteCardToBeArchived, 1);
    renderAllnotes();
    renderArchivedNotes();
    toastMessage.innerHTML = "Note Archived";
    showToastDiv.style.display = "block";
  }

  // Capture trashed note
  let btnTrashNote = document.querySelectorAll(".btn-trash-note");

  btnTrashNote.forEach((item) => {
    item.addEventListener("click", trashedNotesHandler);
  });

  function trashedNotesHandler(event) {
    let noteCardArr = Array.from(showNotesDiv.children);
    let indexOfNoteCardToBeTrashed = noteCardArr.indexOf(
      event.target.closest(".noteCard")
    );
    let trashedNote = noteCardArr.splice(indexOfNoteCardToBeTrashed, 1)[0];
    trashedNotes.push(trashedNote);
    allNotes.splice(indexOfNoteCardToBeTrashed, 1);
    renderAllnotes();
    renderTrashedNotes();
    toastMessage.innerHTML = "Note Trashed";
    showToastDiv.style.display = "block";
  }
}

// Render archived notes to DOM
function renderArchivedNotes() {
  let archivedNotesHTML = "";
  for (note of archivedNotes) {
    archivedNotesHTML += `
      <div class="noteCard">
        <h1 class="addedTitle">${
          note.querySelector(".addedTitle").textContent
        }</h1>
        <p class="addedText">${note.querySelector(".addedText").textContent}</p>
        <div class="operation-icons">

        <button class="btn btn-primary btn-floating btn-trash-note">
        <span class="unarchive-icon">  
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm3-5h2.55v3h2.9v-3H16l-4-4z"/></svg>
      </span>
    </button>

        <button class="btn btn-primary btn-floating btn-trash-note">
        <span class="trash-icon">  
        <svg
      class="svg-trash-note"
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"
        />
      </svg>
      </span>
    </button>
    
    </div>
      </div>
    `;
  }
  archivedNotesDiv.innerHTML = archivedNotesHTML;
}

// Render trashed notes to DOM
function renderTrashedNotes() {
  let trashedNotesHTML = "";
  for (note of trashedNotes) {
    trashedNotesHTML += `
      <div class="noteCard">
        <h1 class="addedTitle">${
          note.querySelector(".addedTitle").textContent
        }</h1>
        <p class="addedText">${note.querySelector(".addedText").textContent}</p>
        <div class="operation-icons">
        <button class="btn btn-primary btn-floating btn-trash-note">
        <span class="restore-from-trash-icon">  
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14zM6 7v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm8 7v4h-4v-4H8l4-4l4 4h-2z"/></svg>
      </span>
    </button>
        <button class="btn btn-primary btn-floating btn-trash-note">
        <span class="delete-forever-icon">  
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg>
      </span>
    </button>
    </div>
      </div>
    `;
  }
  trashedNotesDiv.innerHTML = trashedNotesHTML;
}

// Search note by title
// function searchFunc() {
//   const searchValue = searchbarInput.value.toLowerCase();
//   let titles = allNotes.map((obj) => obj.providedTitle.toLowerCase());
// }
