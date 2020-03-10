class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];


    //    Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 200;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}


// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

$(document).ready(function () {

  // Nav button

  $(".nav-button").click(function() {
    $(".nav-button").toggleClass("change");
  })

  $('.filter').not('.django').hide(300);
  $('.filter').not('.react').hide(300);
  $('.filter').not('.bootstrap').hide(300);
  $('.filter').filter('.javascript').show(300);

  $('.project-list-item').click(function () {
    let value = $(this).attr("data-filter");
    console.log(value);

    $('.filter').not('.' + value).hide(300);
    $('.filter').filter('.' + value).show(300);
  });
  $('.project-list-item').click(function () {
    $(this).addClass('active-item').siblings().removeClass('active-item');
  });

  // Scroll Top
  $(window).scroll(function () {
    if ($(this).scrollTop() > 40) {
      $('#topBtn').fadeIn();
    } else {
      $('#topBtn').fadeOut();
    }
  });

  $("#topBtn").click(function () {
    $('html ,body').animate({
      scrollTop: 0
    }, 800);
  });

  // Navbar
  $(window).scroll(function() {
    let position = $(this).scrollTop();
    // console.log(position);
    if(position >=200) {
      $('.navbar').addClass('custom-navbar');
    } else {
      $('.navbar').removeClass('custom-navbar');
    }
  })

  // Skill
  $(window).scroll(function() {
    let position = $(this).scrollTop();
    // console.log(position);
    if(position >=1400) {
      $('.h').attr('id', 'html');
      $('.c').attr('id', 'css');
      $('.j').attr('id', 'javascript');
      $('.d').attr('id', 'django');
      $('.r').attr('id', 'react');
      $('.p').attr('id', 'python');
    } else {
      $('.h').attr('id', '');
      $('.c').attr('id', '');
      $('.j').attr('id', '');
      $('.d').attr('id', '');
      $('.p').attr('id', '');
      $('.r').attr('id', '');
    }
  })
})

const myForm = document.getElementById("send-message");
const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const alertParent = document.querySelector(".alert-parent");

function sendMessage() {
  myForm.addEventListener("submit", e => {
    if (name !== "" && email !== "" && message !== "") {
      const alert = `<div class="sent-alert">
      Message Sent Successfully
      </div>`;
      alertParent.innerHTML = alert;
      setTimeout(() => alertParent.remove(), 3000);
      myForm.reset();
    } else {
      console.log("Error")
    }
    location.reload();
    e.preventDefault();
  })
}
sendMessage();