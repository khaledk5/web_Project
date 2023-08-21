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
      console.log(slides.length)
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
  console.log(LanguageValue)
  console.log(document.getElementById('lang'))
  document.getElementById('lang').innerHTML = LanguageValue
}

document.addEventListener("DOMContentLoaded", function () {
  const paths = document.querySelectorAll('.rate button svg path');
  const nums = document.querySelectorAll('#num');
  const star = "M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z";
  const unstar = "M22.724 8.217l-6.786-.587-2.65-6.22c-.477-1.133-2.103-1.133-2.58 0l-2.65 6.234-6.772.573c-1.234.098-1.739 1.636-.8 2.446l5.146 4.446-1.542 6.598c-.28 1.202 1.023 2.153 2.09 1.51l5.818-3.495 5.819 3.509c1.065.643 2.37-.308 2.089-1.51l-1.542-6.612 5.145-4.446c.94-.81.45-2.348-.785-2.446zm-10.726 8.89l-5.272 3.174 1.402-5.983-4.655-4.026 6.141-.531 2.384-5.634 2.398 5.648 6.14.531-4.654 4.026 1.402 5.983-5.286-3.187z";
  
  var totalrate = 100;
  var raters = 5;

  function increaseRate(newRate) {
    totalrate += newRate;
    raters += 1;
    return totalrate / (5 * raters);
  }

  function decreaseRate(lastRate) {
    totalrate -= lastRate;
    raters -= 1;
    return totalrate / (5 * raters);
  }
  function rate(pathIndex) {
    const path = paths[pathIndex];
    const num = nums[pathIndex];
    
    if (path.getAttribute('d') === unstar) {
      path.setAttribute('d', star);
      path.style.fill = "var(--theard_color)";
      const newRate = parseFloat(prompt('Enter your rate (0 : 10)', '0'));
      if (!isNaN(newRate)) {
        num.textContent = increaseRate(newRate).toFixed(2);
      }
    } else {
      path.setAttribute('d', unstar);
      path.style.fill = "#4f89d5";
      const lastRate = parseFloat(num.textContent);
      if (!isNaN(lastRate)) {
        num.textContent = decreaseRate(lastRate).toFixed(2);
      }
    }
  }
  const buttons = document.querySelectorAll(".rate button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      rate(i);
    });
  }
});
