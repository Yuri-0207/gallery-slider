// get slider items
var sliderImages = Array.from(
  document.querySelectorAll(".slider-container img")
);
// get number of slides
var slidesCount = sliderImages.length;
// set current slide
var currentSlide = 1;
// previous and next buttons
var nextButton = document.getElementById("next");
var prevButton = document.getElementById("prev");
// handle click on previous and next buttons
nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;
// create the main ul elements
var paginationElement = document.createElement("ul");
// set ID on ul element
paginationElement.setAttribute("id", "pagination-ul");
// create list items based on slides count
for (var i = 1; i <= slidesCount; i++) {
  // create the li
  var paginationItem = document.createElement("li");
  // set custom attribute
  paginationItem.setAttribute("data-index", i);
  // set item content
  paginationItem.appendChild(document.createTextNode(i));
  // append items to the main ul list
  paginationElement.appendChild(paginationItem);
}
// add the created ul element to the page
document.getElementById("indicators").appendChild(paginationElement);
// get the new created ul
var paginationCreatedUl = document.getElementById("pagination-ul");
// get pagination
var paginationBullets = Array.from(
  document.querySelectorAll("#pagination-ul li")
);
// loop through all bullets items
for (var i = 0; i < paginationBullets.length; i++) {
  paginationBullets[i].onclick = function () {
    currentSlide = parseInt(this.getAttribute("data-index"));
    theChecker();
  };
}

// trigger the checker function
theChecker();

function nextSlide() {
  if (nextButton.classList.contains("disabled")) {
    // do nothing
    return false;
  } else {
    currentSlide++;
    theChecker();
  }
}
function prevSlide() {
  if (prevButton.classList.contains("disabled")) {
    // do nothing
    return false;
  } else {
    currentSlide--;
    theChecker();
  }
}

// create the checker function
function theChecker() {
  // remove all active classes
  removeAllActive();
  // set active class on current slide
  sliderImages[currentSlide - 1].classList.add("active");
  // set active class on current pagination item
  paginationCreatedUl.children[currentSlide - 1].classList.add("active");
  // check if current slide is the first
  if (currentSlide == 1) {
    // add disabled class on previous button
    prevButton.classList.add("disabled");
  } else {
    prevButton.classList.remove("disabled");
  }
  // check if current slide is the last
  if (currentSlide == slidesCount) {
    // add disabled class on next button
    nextButton.classList.add("disabled");
  } else {
    nextButton.classList.remove("disabled");
  }
}
// remove all active classes from images and pagination bullets
function removeAllActive() {
  // loop through images
  sliderImages.forEach(function (img) {
    img.classList.remove("active");
  });
  // loop through pagination bullets
  paginationBullets.forEach(function (bullet) {
    bullet.classList.remove("active");
  });
}

// set auto slider interval
var autoSlider = setInterval(function () {
  // move to next slide
  currentSlide++;
  // reset slide index to 1 if it goes beyond total number of slides
  if (currentSlide > slidesCount) {
    currentSlide = 1;
  }
  // update slider and pagination
  theChecker();
}, 5000);

// stop auto slider when user interacts with previous/next buttons or pagination bullets
function stopAutoSlider() {
  clearInterval(autoSlider);
}

// update previous and next buttons to stop auto slider on click
nextButton.onclick = function () {
  stopAutoSlider();
  nextSlide();
};
prevButton.onclick = function () {
  stopAutoSlider();
  prevSlide();
};

// update pagination bullets to stop auto slider on click
paginationBullets.forEach(function (bullet) {
  bullet.onclick = function () {
    stopAutoSlider();
    currentSlide = parseInt(this.getAttribute("data-index"));
    theChecker();
  };
});
