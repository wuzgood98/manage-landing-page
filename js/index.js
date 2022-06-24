const yearDOM = document.querySelectorAll(".year");
const nav = document.querySelector("#menu");
const menuButton = document.querySelector("#menu-btn");
const form = document.querySelector("form");
const input = document.querySelector("input");
const alertMessage = document.querySelector(".alert-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validate();
});

const validate = () => {
  if (!isEmailValid(input.value)) {
    displayAlertMessage();
  } else {
    removeAlertMessage();
    input.value = "";
  }
};

const isEmailValid = (email) => {
  const emailExpression = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/;
  return email.match(emailExpression);
};

const displayAlertMessage = () => {
  input.classList.add("alert");
  alertMessage.textContent = "Please enter a valid email";
  alertMessage.style.display = "block";
};

const removeAlertMessage = () => {
  input.classList.remove("alert");
  alertMessage.textContent = "";
  alertMessage.style.display = "none";
};

// Swipe event listener
const { SwipeEventListener } = window.SwipeEventListener;
const { swipeArea, updateOptions } = SwipeEventListener({
  swipeArea: document.querySelector("#carousel"),
});

menuButton.addEventListener("click", openMenu);

function openMenu() {
  menuButton.classList.toggle("open");
  nav.classList.toggle("hidden");
}

class Gallery {
  constructor(swipeArea) {
    this.swipeArea = swipeArea;
    this.carousel = document.querySelector("#carousel");
    this.activeIndicator = document.querySelectorAll(".indicator");
    this.testimonials = document.querySelectorAll("#testimonial");

    for (let i = 0; i < this.activeIndicator.length; i++) {
      let indicator = this.activeIndicator[i];
      indicator.addEventListener(
        "click",
        function () {
          indicator.classList.remove("bg-brightRed");
          this.chooseTestimonial(indicator, this.testimonials);
          this.activeClickedOption(indicator);
        }.bind(this)
      );
    }

    this.nextTestimonial = this.nextTestimonial.bind(this);
    this.previousTestimonial = this.previousTestimonial.bind(this);

    // Swipe event listener
    this.swipeArea.addEventListener("swipeLeft", this.nextTestimonial);
    this.swipeArea.addEventListener("swipeRight", this.previousTestimonial);

    setInterval(
      function () {
        this.nextTestimonial();
      }.bind(this),
      8000
    );
  }

  nextTestimonial() {
    const selected = document.querySelector(".selected");
    const next = selected.nextElementSibling || this.carousel.firstElementChild;
    selected.classList.remove("selected");
    next.classList.add("selected");
    this.setIndicator(next);
  }

  previousTestimonial() {
    const selected = document.querySelector(".selected");
    const prev = selected.nextElementSibling || this.carousel.firstElementChild;
    selected.classList.remove("selected");
    prev.classList.add("selected");
    this.setIndicator(prev);
  }

  setIndicator(element) {
    for (let i = 0; i < this.activeIndicator.length; i++) {
      let indicator = this.activeIndicator[i];
      element.dataset.id === indicator.id
        ? indicator.classList.add("bg-brightRed")
        : indicator.classList.remove("bg-brightRed");
    }
  }

  chooseTestimonial(indicator, selected) {
    for (let i = 0; i < selected.length; i++) {
      let chosenTestimonial = selected[i];
      if (indicator.id === chosenTestimonial.dataset.id) {
        chosenTestimonial.classList.add("selected");
      } else {
        chosenTestimonial.classList.remove("selected");
      }
    }
  }

  activeClickedOption(indicator) {
    for (let i = 0; i < this.activeIndicator.length; i++) {
      let indicator = this.activeIndicator[i];
      indicator.classList.remove("bg-brightRed");
    }
    indicator.classList.add("bg-brightRed");
  }
}

new Gallery(swipeArea);

const date = new Date();
const year = date.getFullYear();
yearDOM.forEach((element) => (element.textContent = year));
