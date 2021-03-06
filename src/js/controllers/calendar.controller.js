import _ from 'lodash';
import $ from 'jquery';
import { MONTHS } from '../utilities/months.constant';
import angular from 'angular';
import { DayViewController } from './day-view.controller.js';


function CalendarController($scope, $mdDialog, $mdMedia, ProfileService, $cookies) {

  let vm = this;
  vm.next = next;
  vm.prev = prev;
  vm.current = current;
  vm.accounts = [];
  vm.accountData = [];

  let clock = new Date();
  let month = clock.getMonth();
  let year = clock.getFullYear();

  getAccountInfo();

  $scope.status = '  ';
  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

  $scope.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: DayViewController,
      templateUrl: 'templates/day-view.tpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      locals: {
        date: $(ev.target).find(".num-date").text(),
        begin: $(ev.target).find('.beginning_balance').text(),
        end: $(ev.target).find('.ending_balance').text()
      },
      clickOutsideToClose: true,
      fullscreen: useFullScreen
    })
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });

  };

// Add each month to the Month dropdown menu (All 12 months)
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
// Add each year to the Year dropdown menu (5 years in advanced and 5 years behind)
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


    let currentYear = $(document).find('#year').val();
    let currentMonth = $(document).find('#month').val();
    let autoScroll = function () {
        if($('.num-container').hasClass('day_background_color') === true){
          $('body').animate({scrollTop: $('.day_background_color').offset().top - 165}, 250);
        } else{
          $('body').animate({scrollTop: '0px'}, 250);
        }
    }
//Needs to be refactored
// Calendar Code (If dropdown menus change)
$('.month-selector, .year-selector').on('change', function(event){
  event.preventDefault();
  var num = day.find('.num');

  let renderMonth = function () {
    MONTHS[1].days = Number($('#year').val()) % 4 == 0 ? 29 : 28;
    let nextMonth = Number(currentMonth) + 2;
    let startOfMonth = new Date(currentYear, currentMonth , 1).getDay();
    let monthDays = MONTHS[currentMonth].days;
    let days = $(document).find('.days').children();
    $(document).find('.num').empty();
    _.range(1, 43).forEach(function(dayIndex, i) {
      let day = $(days[startOfMonth + dayIndex - 1]);
      if (clock.getDate() === dayIndex && clock.getMonth() == $('#month').val() && clock.getFullYear() == $('#year').val()) {
       num.parent().addClass("day_background_color");
       num.parent().removeClass("dead_month_color");
     } else {
       num.parent().removeClass("day_background_color");
       num.parent().removeClass("dead_month_color");
     }
     if(dayIndex > monthDays){
       num.html(dayIndex - monthDays).parent().addClass("dead_month_color");
       if(nextMonth == 13){
         nextMonth = 1;
         currentYear = Number(currentYear) + 1;
       }
       if(nextMonth < 10){
         let newMonth = '0' + nextMonth
         if ((dayIndex - monthDays) < 10){
           let newDayIndex = '0' + (dayIndex - monthDays)
           day.find('.num-date').html(currentYear + '-' + newMonth + '-' + newDayIndex);
         } else {
           day.find('.num-date').html(currentYear + '-' + newMonth + '-' + (dayIndex - monthDays));
         }
       } else {
         if ((dayIndex - monthDays) < 10){
           let newDayIndex = '0' + (dayIndex - monthDays)
           day.find('.num-date').html(currentYear + '-' + nextMonth + '-' + newDayIndex);
         } else {
           day.find('.num-date').html(currentYear + '-' + nextMonth + '-' + (dayIndex - monthDays));
         }
       }
     } else {
       num.html(dayIndex);
       let thisMonth = (Number(currentMonth) + 1);
       if(thisMonth < 10){
         let newMonth = '0' + thisMonth
         if(dayIndex < 10){
           let newDays = '0' + dayIndex
           day.find('.num-date').html(currentYear + '-' + newMonth + '-' + newDays)
         } else{
           day.find('.num-date').html(currentYear + '-' + newMonth + '-' + (dayIndex));
         }
       } else {
         if(dayIndex < 10){
           let newDays = '0' + dayIndex
           day.find('.num-date').html(currentYear + '-' + thisMonth + '-' + newDays)
         } else{
           day.find('.num-date').html(currentYear + '-' + thisMonth + '-' + (dayIndex));
         }
       }
     }
    //  console.log($('.num-date').html());
    })
    // autoScroll();
    // if($('.num-container').hasClass('day_background_color') === true){
    //   $('body').animate({scrollTop: $('.day_background_color').offset().top - 165}, 250);
    // } else{
    //   $('body').animate({scrollTop: '0px'}, 250);
    // }
  };
  function renderPrevMonthDays(){
    MONTHS[1].days = Number(currentYear) % 4 == 0 ? 29 : 28
    let prevMonth = Number(currentMonth);
    let startOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    let monthDays = MONTHS[currentMonth].days;
    let prevMonthDays = currentMonth == 0 ? 31 : MONTHS[currentMonth - 1].days;
    let days = $(document).find('.days').children();
    let prevDays = _.range(1, prevMonthDays + 1).slice(-startOfMonth);
    _.range(0, startOfMonth).forEach(function(dayIndex){
      let day = $(days[dayIndex]);
      if (startOfMonth > dayIndex){
        num.html(prevDays[dayIndex]);
        if(prevMonth == 0){
          prevMonth = 12;
          currentYear = Number(currentYear) - 1;
        }
        if(prevMonth < 10){
          let newMonth = '0' + prevMonth
          day.find('.num-date').html(currentYear + '-' + newMonth + '-' + (prevDays[dayIndex]));
          // day.find('.num-box').data(currentYear + '-' + newMonth + '-' + (prevDays[dayIndex]));
        } else {
          day.find('.num-date').html(currentYear + '-' + prevMonth + '-' + (prevDays[dayIndex]));
        }

        num.parent().addClass("dead_month_color");
        num.parent().removeClass("day_background_color");
      }
    })
  }


  renderMonth();
  renderPrevMonthDays();

})


let animateDay = $('body').animate({scrollTop: $('.day_background_color').offset().top - 165}, 250);
//Needs to be refactored
$('.month-selector').change();

  function prev(){
    if(currentYear <= (year - 5)){
      $(document).find('#year').val(year - 5).change()
      $(document).find('#month').val(0).change()
    } else {
      if($('#month').val() == null || $('#month').val() == 0){
        $(document).find('#month').val(11).change()
        $(document).find('#year').val(Number(currentYear) - 1).change()
      } else {
        $(document).find('#month').val(Number(currentMonth) - 1).change();
      }
    }
    // if($('.num-container').hasClass('day_background_color') === true){
    //   animateDay;
    // } else{
    //   $('body').animate({scrollTop: '0px'}, 250);
    // }
  }

  function current(){
    $(document).find('#month').val(month).change()
    $(document).find('#year').val(year).change()
    // animateDay
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
    // if($('.num-container').hasClass('day_background_color') === true){
    //   animateDay
    // } else{
    //   $('body').animate({scrollTop: '0px'}, 250);
    // }
  }

  //animateDay

  function getAccountInfo(){
    let user_id = $cookies.get('user_id');
    ProfileService.getAccountInfo(user_id).then(function(res){
      console.log(res.data[0]);
      let splitArray = res.data[0].created_at.split(' ');
      let inputDate = splitArray[0];
      console.log(inputDate);
    })
  }

}

CalendarController.$inject = ['$scope', '$mdDialog', '$mdMedia', 'ProfileService', '$cookies'];

export { CalendarController };
