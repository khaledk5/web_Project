document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    var interval;
    var test=2
    function shiftUp(rowId) {
        const table = document.getElementById('rows');
        const row = document.getElementById(rowId);
        if(row.previousElementSibling){
          while (row.previousElementSibling) {
            table.insertBefore( row, row.previousElementSibling);
          }
          table.insertBefore(row.nextElementSibling.nextElementSibling, row.nextElementSibling);
          return true;
        }
        return false;
    }

    function shiftDown(rowId) {
        const table = document.getElementById('rows');
        const row = document.getElementById(rowId);
        if(row.nextElementSibling){
          while (row.nextElementSibling) { 
            table.insertBefore(row.nextElementSibling, row);
          }
          table.insertBefore(row.previousElementSibling,row.previousElementSibling.previousElementSibling);
          return true;
        }
        return false;
    }

    function showSlide(index) {
      slides.forEach((slide, idx) => {
        slide.style.position = idx === index ? "relative" : "absolute";
        slide.style.transform = idx === index ? "rotateY(0deg)" : "rotateY(90deg)";
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      if(shiftUp('row'+(currentSlide + 1))){
        showSlide((currentSlide )% slides.length);
      }
      else{
        nextSlide()
      }
    }
  
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      if(shiftDown('row'+(currentSlide + 1))){
        showSlide((currentSlide + Number(test%2!=0))% slides.length);
      }
      else{
        test=1
        prevSlide()
      }
    }
  
    function playSlideshow() {
      interval = setInterval(nextSlide, 5000);
    }
  
    document.querySelector(".icondisplay2").addEventListener("click", prevSlide);
    document.querySelector(".icondisplay").addEventListener("click", nextSlide);
    
    playSlideshow();
});
function apply_lang (){
  const LanguageValue = document.querySelector('input[name="lang"]:checked').getAttribute('value');
  document.getElementById('lang').innerHTML = LanguageValue
}

document.addEventListener("DOMContentLoaded", function () {
  const paths = document.querySelectorAll('.rate button svg path');
  const nums = document.querySelectorAll('#num');
  const star = "M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z";
  const unstar = "M22.724 8.217l-6.786-.587-2.65-6.22c-.477-1.133-2.103-1.133-2.58 0l-2.65 6.234-6.772.573c-1.234.098-1.739 1.636-.8 2.446l5.146 4.446-1.542 6.598c-.28 1.202 1.023 2.153 2.09 1.51l5.818-3.495 5.819 3.509c1.065.643 2.37-.308 2.089-1.51l-1.542-6.612 5.145-4.446c.94-.81.45-2.348-.785-2.446zm-10.726 8.89l-5.272 3.174 1.402-5.983-4.655-4.026 6.141-.531 2.384-5.634 2.398 5.648 6.14.531-4.654 4.026 1.402 5.983-5.286-3.187z";
  const lastRate = []
  var raters = 5;
  nums.forEach(num => {
    lastRate.push(Number(num.textContent))
  });
  function increaseRate(newRate,index) {
    raters += 1;
    return lastRate[index]+(newRate-lastRate[index])/raters;
    // return (lastRate[index]+( newRate/ (raters-1)))*((raters-1)/raters);
  }
  function decreaseRate(index) {
    raters -= 1;
    return lastRate[index];
  }
  function rate(pathIndex) {
    const path = paths[pathIndex];
    const num = nums[pathIndex];
    
    if (path.getAttribute('d') === unstar) {
      const newRate = parseFloat(prompt('Enter your rate (0 : 10)', '0'));
      if (!isNaN(newRate)) {
        num.textContent = increaseRate(newRate,pathIndex).toFixed(1);
        path.setAttribute('d', star);
        path.style.fill = "#4f89d5";
      }
    } else {
      path.setAttribute('d', unstar);
      path.style.fill = "#4f89d5";
      num.textContent = decreaseRate(pathIndex).toFixed(1);
    }
  }
  const buttons = document.querySelectorAll(".rate button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      rate(i);
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const movies = document.querySelectorAll('.move');
  
  function createMovieElement(index) {
    // Create main container div with class "move"
    document.querySelector('.loading').setAttribute('style','display: none')
    const move=movies[index]
    const imageURL = move.querySelector('.poster img').getAttribute('src')
    const movename = move.querySelector('.info .name').textContent
    const videolink= move.querySelector('.action a').getAttribute('href')
    const ratingnum= move.querySelector('#num').textContent
    
    var mainDiv = document.createElement("div");
    mainDiv.className = "move";

    // Create poster div with class "poster" and an image element
    var posterDiv = document.createElement("div");
    posterDiv.className = "poster";
    var posterImage = document.createElement("img");
    posterImage.src = imageURL;
    posterImage.alt = "notfound";
    posterDiv.appendChild(posterImage);
    mainDiv.appendChild(posterDiv);

    // Create rate div with class "rate", containing star icons and rating text
    var rateDiv = document.createElement("div");
    rateDiv.className = "rate";

    var starSpan = document.createElement("span");
    var starIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    starIconSvg.setAttribute("width", "13");
    starIconSvg.setAttribute("height", "13");
    starIconSvg.setAttribute("class", "star-inline");
    starIconSvg.setAttribute("viewBox", "0 0 24 24");
    starIconSvg.setAttribute("fill", "currentColor");
    var starIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    starIconPath.setAttribute("d", "M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z");
    starIconSvg.appendChild(starIconPath);
    starSpan.appendChild(starIconSvg);
    rateDiv.appendChild(starSpan);

    var ratingSpan = document.createElement("span");
    ratingSpan.id = "num";
    ratingSpan.textContent = ratingnum;
    rateDiv.appendChild(ratingSpan);

    var button = document.createElement("button");
    var starBorderSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    starBorderSvg.setAttribute("width", "15");
    starBorderSvg.setAttribute("height", "15");
    starBorderSvg.setAttribute("class", "star-border-inline");
    starBorderSvg.setAttribute("viewBox", "0 0 24 24");
    starBorderSvg.setAttribute("fill", "currentColor");
    var starBorderPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    starBorderPath.setAttribute("d", "M22.724 8.217l-6.786-.587-2.65-6.22c-.477-1.133-2.103-1.133-2.58 0l-2.65 6.234-6.772.573c-1.234.098-1.739 1.636-.8 2.446l5.146 4.446-1.542 6.598c-.28 1.202 1.023 2.153 2.09 1.51l5.818-3.495 5.819 3.509c1.065.643 2.37-.308 2.089-1.51l-1.542-6.612 5.145-4.446c.94-.81.45-2.348-.785-2.446zm-10.726 8.89l-5.272 3.174 1.402-5.983-4.655-4.026 6.141-.531 2.384-5.634 2.398 5.648 6.14.531-4.654 4.026 1.402 5.983-5.286-3.187z");
    starBorderSvg.appendChild(starBorderPath);
    button.appendChild(starBorderSvg);
    rateDiv.appendChild(button);

    mainDiv.appendChild(rateDiv);

    // Create info div with class "info", containing movie name
    var infoDiv = document.createElement("div");
    infoDiv.className = "info";
    var nameDiv = document.createElement("div");
    nameDiv.className = "name";
    nameDiv.textContent = movename;
    infoDiv.appendChild(nameDiv);
    mainDiv.appendChild(infoDiv);

    // Create action div with class "action", containing buttons
    var actionDiv = document.createElement("div");
    actionDiv.className = "action";

    var watchlistButton = document.createElement("button");
    watchlistButton.type = "RemoveFromWatchList";
    var addIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    addIconSvg.setAttribute("width", "24");
    addIconSvg.setAttribute("height", "24");
    addIconSvg.setAttribute("class", "add icon");
    addIconSvg.setAttribute("viewBox", "0 0 30 24");
    addIconSvg.setAttribute("fill", "currentColor");
    var addIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    addIconPath.setAttribute("d", "M5 11h14c.55 0 1 -.45 1 -1s-.45 -1 -1 -1H5c-.55 0 -1 .45 -1 1s.45 1 1 1z");
    addIconSvg.appendChild(addIconPath);
    watchlistButton.appendChild(addIconSvg);
    var watchlistSpan = document.createElement("span");
    watchlistSpan.textContent = "Remove";
    watchlistButton.appendChild(watchlistSpan);
    actionDiv.appendChild(watchlistButton);

    var trailerLink = document.createElement("a");
    trailerLink.href = videolink;
    var playArrowSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    playArrowSvg.setAttribute("width", "24");
    playArrowSvg.setAttribute("height", "24");
    playArrowSvg.setAttribute("class", "play-arrow icon");
    playArrowSvg.setAttribute("viewBox", "0 0 24 24");
    playArrowSvg.setAttribute("fill", "currentColor");
    var playArrowPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    playArrowPath.setAttribute("d", "M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z");
    playArrowSvg.appendChild(playArrowPath);
    trailerLink.appendChild(playArrowSvg);
    var trailerSpan = document.createElement("span");
    trailerSpan.textContent = "Trailer";
    trailerLink.appendChild(trailerSpan);
    actionDiv.appendChild(trailerLink);

    mainDiv.appendChild(actionDiv);

    document.querySelector('.watchlist').appendChild(mainDiv);
}

  const buttons = document.querySelectorAll('button[type="AddToWatchList"]');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      createMovieElement(i);
      buttons[i].disabled = true;
    });
  }
});
