//**************** minimize side-bar ****************/
var toggleBtn = document.querySelector(".toggle-menu");
var sideBar = document.querySelector(".side-bar");
var container = document.querySelector(".container");
toggleBtn.onclick = function () {
  sideBar.classList.toggle("small-sidebar");
  container.classList.toggle("large-container");
};

//**************** minimize watch-list ****************/
var toggleIcon = document.querySelector(".toggle-icon");
var myWatchList = document.querySelector(".my-watch-list");
toggleIcon.onclick = function () {
  myWatchList.classList.toggle("hidden-watch-list");
};

//**************** scroll-bar ****************/
let progress = document.getElementById("progressbar");
let totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function () {
  let progressHeight = (window.pageYOffset / totalHeight) * 100;
  progress.style.height = progressHeight + "%";
};
//**************** search-bar ****************/
function search() {
  let searchBar = document.querySelector(".search-input").value.toUpperCase();
  let cardsContainer = document.querySelector(".cards");
  let card = document.querySelectorAll(".card");

  let cardName = document.getElementsByTagName("h2");
  for (let i = 0; i < cardName.length; i++) {
    if (cardName[i].innerHTML.toUpperCase().indexOf(searchBar) >= 0) {
      card[i].style.display = "";
    } else {
      card[i].style.display = "none";
    }
  }
}

//**************** play-video ****************/
function changeVideoSource(hmmmmmmmm) {
  var videoSource = hmmmmmmmm;
  localStorage.setItem("videoSource", videoSource);
  window.location.href("play-video.html"); // <-- second page
}

//**************** rotate-icon ****************/
const iconContainer = document.querySelector(".toggle-icon");
iconContainer.addEventListener("click", function () {
  iconContainer.classList.toggle("rotated");
});

//**************** watch-list ****************/
// Get references to the elements
const addToWatchButtons = document.querySelectorAll(".add-to-list");
const watchList = document.querySelector(".watch-list");

// Function to handle clearing an item from the watch list
function clearItem(event) {
  const listItem = event.target.parentElement;
  listItem.remove();
}

// Function to check if an item already exists in the watch
function isItemInwatch(title, date) {
  const watchItems = watchList.querySelectorAll("li");
  for (let i = 0; i < watchItems.length; i++) {
    const item = watchItems[i];
    const itemTitle = item
      .querySelector("span")
      .textContent.split(":")[0]
      .trim();
    const itemDate = item
      .querySelector("span")
      .textContent.split(":")[1]
      .trim();
    if (itemTitle === title && itemDate === date) {
      return true;
    }
  }
  return false;
}

// Add click event listeners to the "Add to watch" buttons
addToWatchButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    const item = event.target.parentElement;
    const title = item.querySelector("h2").textContent;
    const date = item.querySelector("p").textContent;

    // Check if the item is already in the watch
    if (isItemInwatch(title, date)) {
      alert("This film is already in the watch list!");
      return;
    }

    const watchItem = document.createElement("li");

    watchItem.innerHTML = `<span>${title}: ${date}</span>
                          <button class="clear-item">x</button>`;

    const clearButton = watchItem.querySelector(".clear-item");
    clearButton.addEventListener("click", clearItem);
    watchList.appendChild(watchItem);
    localStorage.setItem("watch-list", watchList);
  });
});
