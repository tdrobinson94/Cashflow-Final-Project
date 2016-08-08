import _ from 'lodash';
import $ from 'jquery';
import { MONTHS } from '../utilities/months.constant';
import angular from 'angular';
import { DayViewController } from './day-view.controller.js';

function CalendarController($scope, $mdDialog, $mdMedia) {

  let clock = new Date();
  let month = clock.getMonth();
  let year = clock.getFullYear();

  $scope.status = '  ';
  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

  $scope.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: DayViewController,
      templateUrl: 'templates/day-view.tpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };


$('.month-selector').append(`
  <option value="${month}" selected>${MONTHS[month].name}</option>
  <option value="0">${MONTHS[0].name}</option>
  <option value="1">${MONTHS[1].name}</option>
  <option value="2">${MONTHS[2].name}</option>
  <option value="3">${MONTHS[3].name}</option>
  <option value="4">${MONTHS[4].name}</option>
  <option value="5">${MONTHS[5].name}</option>
  <option value="6">${MONTHS[6].name}</option>
  <option value="7">${MONTHS[7].name}</option>
  <option value="8">${MONTHS[8].name}</option>
  <option value="9">${MONTHS[9].name}</option>
  <option value="10">${MONTHS[10].name}</option>
  <option value="11">${MONTHS[11].name}</option>
  `)

  $('.year-selector').append(`
    <option value="${year - 5}">${year - 5}</option>
    <option value="${year - 4}">${year - 4}</option>
    <option value="${year - 3}">${year - 3}</option>
    <option value="${year - 2}">${year - 2}</option>
    <option value="${year - 1}">${year - 1}</option>
    <option value="${year}" selected>${year}</option>
    <option value="${year + 1}">${year + 1}</option>
    <option value="${year + 2}">${year + 2}</option>
    <option value="${year + 3}">${year + 3}</option>
    <option value="${year + 4}">${year + 4}</option>
    <option value="${year + 5}">${year + 5}</option>
    `)

    $('.prev').on('click', function(event){
      event.preventDefault();
      if($('#year').val() <= (year - 5)){
        $('#year').val(year - 5).change()
        $('#month').val(0).change()
      } else {
        if($('#month').val() == null || $('#month').val() == 0){
          $('#month').val(11).change()
          $('#year').val(Number($('#year').val()) - 1).change()
        } else {
          $('#month').val(Number($('#month').val()) - 1).change()
        }
      }
    })

    $('.current').on('click', function(event){
      event.preventDefault();
      $('#month').val(month).change()
      $('#year').val(year).change()
    })

    $('.next').on('click', function(event){
      event.preventDefault();
      if($('#year').val() >= (year + 5) && $('#month').val() == 11){
        $('#year').val(year + 5).change()
        $('#month').val(11).change()
      } else {
        if($('#month').val() == null || $('#month').val() == 11){
          $('#month').val(0).change()
          $('#year').val(Number($('#year').val()) + 1).change()
        } else {
          $('#month').val(Number($('#month').val()) + 1).change()
        }
      }
    })


$('.month-selector, .year-selector').on('change', function(event){
  event.preventDefault();
  let renderMonth = function () {
    MONTHS[1].days = Number($('#year').val()) % 4 == 0 ? 29 : 28;
    let currentMonth = $('#month').val();
    let currentYear = $('#year').val();
    let startOfMonth = new Date(currentYear, currentMonth , 1).getDay();
    let monthDays = MONTHS[$('#month').val()].days;
    let days = $(".days").children();
    $('.num').empty();
    _.range(1, 43).forEach(function(dayIndex, i) {
      let day = $(days[startOfMonth + dayIndex - 1]);
      // console.log(dayIndex > monthDays);
      if (clock.getDate() === dayIndex && clock.getMonth() == $('#month').val() && clock.getFullYear() == $('#year').val()) {
       day.find('.num').parent().addClass("day_background_color");
       day.find('.num').parent().removeClass("dead_month_color");
     } else {
       day.find('.num').parent().removeClass("day_background_color");
       day.find('.num').parent().removeClass("dead_month_color");
     }
     if(dayIndex > monthDays){
       day.find('.num').html(dayIndex - monthDays).parent().addClass("dead_month_color");
     } else {
       day.find('.num').html(dayIndex);
     }
    })
  };

  function renderPrevMonthDays(){
    MONTHS[1].days = Number($('#year').val()) % 4 == 0 ? 29 : 28
    let startOfMonth = new Date($('#year').val(), $('#month').val(), 1).getDay();
    let monthDays = MONTHS[$('#month').val()].days;
    let prevMonthDays = $('#month').val() == 0 ? 31 : MONTHS[$('#month').val() - 1].days;
    let days = $(".days").children();
    let prevDays = _.range(1, prevMonthDays + 1).slice(-startOfMonth);
    _.range(0, startOfMonth).forEach(function(dayIndex){
      let day = $(days[dayIndex]);
      if (startOfMonth > dayIndex){
        day.find('.num').html(prevDays[dayIndex]);
        day.find('.num').parent().addClass("dead_month_color");
        day.find('.num').parent().removeClass("day_background_color");
      }
    })
  }

  renderMonth();
  renderPrevMonthDays();

})

$('.month-selector').change();

}

CalendarController.$inject = ['$scope', '$mdDialog', '$mdMedia'];

export { CalendarController };
