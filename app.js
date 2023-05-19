let searchBarContainer = document.querySelector(".searchbar-container");

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
