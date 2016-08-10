import _ from 'lodash';
import $ from 'jquery';
import { MONTHS } from '../utilities/months.constant';
import angular from 'angular';
import { DayViewController } from './day-view.controller.js';

function CalendarController($scope, $mdDialog, $mdMedia) {

  let vm = this;
  vm.next = next;
  vm.prev = prev;
  vm.current = current;

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
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });

  };


$(document).find('#month').html(`
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

  $(document).find('#year').html(`
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

//Needs to be refactored
$('.month-selector, .year-selector').on('change', function(event){
  event.preventDefault();
  let renderMonth = function () {
    MONTHS[1].days = Number($('#year').val()) % 4 == 0 ? 29 : 28;
    let currentMonth = $(document).find('#month').val();
    let nextMonth = Number($(document).find('#month').val()) + 2;
    let currentYear = $(document).find('#year').val();
    let startOfMonth = new Date(currentYear, currentMonth , 1).getDay();
    let monthDays = MONTHS[$(document).find('#month').val()].days;
    let days = $(document).find('.days').children();
    $(document).find('.num').empty();
    _.range(1, 43).forEach(function(dayIndex, i) {
      let day = $(days[startOfMonth + dayIndex - 1]);
      if (clock.getDate() === dayIndex && clock.getMonth() == $('#month').val() && clock.getFullYear() == $('#year').val()) {
       day.find('.num').parent().addClass("day_background_color");
       day.find('.num').parent().removeClass("dead_month_color");
     } else {
       day.find('.num').parent().removeClass("day_background_color");
       day.find('.num').parent().removeClass("dead_month_color");
     }
     if(dayIndex > monthDays){
       day.find('.num').html(dayIndex - monthDays).parent().addClass("dead_month_color");
       if(nextMonth == 13){
         nextMonth = 1;
         currentYear = Number(currentYear) + 1;
       }
       day.find('.num-date').html(nextMonth + '/' + (dayIndex - monthDays) + '/' + currentYear);
        // console.log(nextMonth + '/' + (dayIndex - monthDays) + '/' + currentYear);
     } else {
       day.find('.num').html(dayIndex);
      //  console.log(currentMonth + '/' + (dayIndex) + '/' + currentYear);
       day.find('.num-date').html((Number(currentMonth) + 1) + '/' + (dayIndex) + '/' + currentYear);
     }
    })
  };
  function renderPrevMonthDays(){
    MONTHS[1].days = Number($(document).find('#year').val()) % 4 == 0 ? 29 : 28
    let currentYear = $(document).find('#year').val();
    let prevMonth = Number($(document).find('#month').val());
    let startOfMonth = new Date($(document).find('#year').val(), $(document).find('#month').val(), 1).getDay();
    let monthDays = MONTHS[$(document).find('#month').val()].days;
    let prevMonthDays = $(document).find('#month').val() == 0 ? 31 : MONTHS[$(document).find('#month').val() - 1].days;
    let days = $(document).find('.days').children();
    let prevDays = _.range(1, prevMonthDays + 1).slice(-startOfMonth);
    _.range(0, startOfMonth).forEach(function(dayIndex){
      let day = $(days[dayIndex]);
      if (startOfMonth > dayIndex){
        day.find('.num').html(prevDays[dayIndex]);
        if(prevMonth == 0){
          prevMonth = 12;
          currentYear = Number(currentYear) - 1;
        }
        day.find('.num-date').html(prevMonth + '/' + (prevDays[dayIndex]) + '/' + currentYear);
        // console.log(prevMonth + '/' + (prevDays[dayIndex]) + '/' + currentYear);
        day.find('.num').parent().addClass("dead_month_color");
        day.find('.num').parent().removeClass("day_background_color");
      }
    })
  }


  renderMonth();
  renderPrevMonthDays();

})
//Needs to be refactored
$('.month-selector').change();

  function prev(){
    if($(document).find('#year').val() <= (year - 5)){
      $(document).find('#year').val(year - 5).change()
      $(document).find('#month').val(0).change()
    } else {
      if($('#month').val() == null || $('#month').val() == 0){
        $(document).find('#month').val(11).change()
        $(document).find('#year').val(Number($(document).find('#year').val()) - 1).change()
      } else {
        $(document).find('#month').val(Number($(document).find('#month').val()) - 1).change();
      }
    }
  }

  function current(){
    $(document).find('#month').val(month).change()
    $(document).find('#year').val(year).change()
  }

  function next(){
    if($(document).find('#year').val() >= (year + 5) && $(document).find('#month').val() == 11){
      $(document).find('#year').val(year + 5).change()
      $(document).find('#month').val(11).change()
    } else {
      if($(document).find('#month').val() == null || $(document).find('#month').val() == 11){
        $(document).find('#month').val(0).change()
        $(document).find('#year').val(Number($(document).find('#year').val()) + 1).change()
      } else {
        $(document).find('#month').val(Number($(document).find('#month').val()) + 1).change();
      }
    }
  }

}

CalendarController.$inject = ['$scope', '$mdDialog', '$mdMedia'];

export { CalendarController };
