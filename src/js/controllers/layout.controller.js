import $ from 'jquery';

function LayoutController(){
  let vm = this;

$('.hamburger').on('click', function(event){
  $(this).toggleClass('is-active')
  $('.links').slideToggle('slow')
})




}

LayoutController.$inject = [];

export { LayoutController };
