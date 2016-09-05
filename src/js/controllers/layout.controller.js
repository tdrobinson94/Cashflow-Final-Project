import $ from 'jquery';

function LayoutController(UserService, $state, $rootScope){
  let vm = this;
  vm.logOut = logOut;
  vm.scrollTop = scrollTop;
  vm.loggedIn = false;

  vm.setNavigation = setNavigation;
  vm.init = init;

  $rootScope.$on('loginChange', function(event, status){
    vm.loggedIn = status;
  });

  function logOut(){
    UserService.logOut();
    $state.go("root.home");
  }

  function init() {
    setNavigation();
    hamburgerHandler();
    linksHandler();
    vm.loggedIn = UserService.loggedIn();
  };

  init();

  function setNavigation () {
    if ($(window).width() <= 450) {
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
      if ($(window).width() <= 450) {
        $(".hamburger").removeClass("is-active")
        $('.links').slideToggle();
      }
    })
  };

  $(window).resize(setNavigation)

  function scrollTop(){
    $('body').animate({scrollTop: '0px'}, 250);
  }

}

LayoutController.$inject = ['UserService', '$state', '$rootScope'];

export { LayoutController };
