import $ from 'jquery';

function LayoutController(){
  let vm = this;

  vm.setNavigation = setNavigation;
  vm.init = init;

  function init() {
    setNavigation();
    hamburgerHandler();
    linksHandler();
  };

  init();

  function setNavigation () {
    if ($(window).width() < 450) {
      $('.links').hide();
    } else {
      $('.links').show();
    }
  };

  function hamburgerHandler() {
    $(".hamburger").on("click", () => {
      $('.hamburger').toggleClass('is-active')
      $(".links").slideToggle();
    });
  };

  function linksHandler() {
    $(".navbar a").on("click", () => {
      if ($(window).width() < 450) {
        $(".hamburger").removeClass("is-active")
        $('.links').slideToggle();
      }
    })
  };

  $(window).resize(setNavigation)


}

LayoutController.$inject = [];

export { LayoutController };
