let searchBarContainer = document.querySelector(".searchbar-container");
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
// Sidebar heading bgcolor styling starts here
notesHeading.classList.add("active-link");
notesHeading.addEventListener("click", () => {
  notesHeading.classList.add("active-link");
  archiveHeading.classList.remove("active-link");
  trashHeading.classList.remove("active-link");
  createNoteCard.style.display = "flex";
  archivesAppearHere.style.display = "none";
  trashedAppearHere.style.display = "none";
});

archiveHeading.addEventListener("click", () => {
  notesHeading.classList.remove("active-link");
  archiveHeading.classList.add("active-link");
  trashHeading.classList.remove("active-link");
  createNoteCard.style.display = "none";
  archivesAppearHere.style.display = "flex";
  trashedAppearHere.style.display = "none";
});

trashHeading.addEventListener("click", () => {
  notesHeading.classList.remove("active-link");
  archiveHeading.classList.remove("active-link");
  trashHeading.classList.add("active-link");
  createNoteCard.style.display = "none";
  archivesAppearHere.style.display = "none";
  trashedAppearHere.style.display = "flex";
});
// Sidebar heading bgcolor styling ends here

// hide toast
showToastDiv.style.display = "none";
addNoteBtn.addEventListener("click", saveNote);
function saveNote() {
  const allNotesObj = {
    providedTitle: addTitle.value,
    providedNote: addNote.value,
  };

  if (addTitle.value === "") {
    toastMessage.innerHTML = "Please add a Title";
    showToastDiv.style.display = "block";
  } else if (addNote.value === "") {
    toastMessage.innerHTML = "Please add a Note";
    showToastDiv.style.display = "block";
  } else {
    allNotes.push(allNotesObj);
    console.log(allNotes);
    renderAllnotes();
  }
}

closeToastBtn.addEventListener("click", () => {
  showToastDiv.style.display = "none";
});

function renderAllnotes() {
  let notes = "";
  for (note of allNotes) {
    notes += ` <div class="noteCard">
  <h1 class="addedTitle">${note.providedTitle}</h1>
  <p class="addedText">${note.providedNote}</p>
  <div class="operation-icons">
    <button class="btn btn-primary btn-floating btn-add-note">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M5 21q-.825 0-1.413-.588T3 19V6.5q0-.375.125-.675t.325-.575l1.4-1.7q.2-.275.5-.413T6 3h12q.35 0 .65.137t.5.413l1.4 1.7q.2.275.325.575T21 6.5V19q0 .825-.588 1.413T19 21H5Zm.4-15h13.2l-.85-1H6.25L5.4 6ZM5 8v11h14V8H5Zm7 10l4-4l-1.4-1.4l-1.6 1.6V10h-2v4.2l-1.6-1.6L8 14l4 4Zm-7 1h14H5Z"
        />
      </svg>
    </button>
    <button class="btn btn-primary btn-floating btn-add-note">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"
        />
      </svg>
    </button>
  </div>
</div>`;
  }
  showNotesDiv.innerHTML = notes;
}
