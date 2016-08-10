import $ from 'jquery';

function LayoutController(UserService, $rootScope){
  let vm = this;
  vm.logOut = logOut;

  vm.setNavigation = setNavigation;
  vm.init = init;
  $rootScope.$on('loginChange', function(event, status){
    vm.loggedIn = status;
    console.log('am i logged in?', vm.loggedIn);
  });

  function logOut(){
    UserService.logOut();
    vm.loggedIn = false;
  }

  function init() {
    setNavigation();
    hamburgerHandler();
    linksHandler();
    vm.loggedIn = UserService.loggedIn();
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

LayoutController.$inject = ['UserService', '$rootScope'];

export { LayoutController };
