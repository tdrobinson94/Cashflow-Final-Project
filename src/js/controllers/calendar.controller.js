import _ from 'lodash';
import $ from 'jquery';

function CalendarController($scope) {

  let clock = new Date();
  let month = clock.getMonth();
  let year = clock.getFullYear();

  const MONTHS = [
  {
    name: "January",
    days: 31
  },
  {
    name: "February",
    days: 28
  },
  {
    name: "March",
    days: 31
  },
  {
    name: "April",
    days: 30
  },
  {
    name: "May",
    days: 31
  },
  {
    name: "June",
    days: 30
  },
  {
    name: "July",
    days: 31
  },
  {
    name: "August",
    days: 31
  },
  {
    name: "September",
    days: 30
  },
  {
    name: "October",
    days: 31
  },
  {
    name: "November",
    days: 30
  },
  {
    name: "December",
    days: 31
  }
];

// This shows the current calendar month with current day.
let renderCurrentMonth = function () {
  let startOfMonth = new Date(year, month, 1).getDay();
  let monthDays = MONTHS[month].days;
  let days = $(".days").children();
  _.range(1, monthDays + 1).forEach(function(dayIndex) {
    let day = $(days[startOfMonth + dayIndex - 1]);
    day.find('.num').html(dayIndex);
    if (clock.getDate() === dayIndex) {
      day.find('.num').parent().addClass("day_background_color");
    } else{
      day.find('.num').parent().removeClass('day_background_color');
    }
  })
};
renderCurrentMonth();


$('.month-selector').append(`
  <option value="${month - 6}">${MONTHS[month - 6].name}</option>
  <option value="${month - 5}">${MONTHS[month - 5].name}</option>
  <option value="${month - 4}">${MONTHS[month - 4].name}</option>
  <option value="${month - 3}">${MONTHS[month - 3].name}</option>
  <option value="${month - 2}">${MONTHS[month - 2].name}</option>
  <option value="${month - 1}">${MONTHS[month - 1].name}</option>
  <option value="${month}" selected>${MONTHS[month].name}</option>
  <option value="${month + 1}">${MONTHS[month + 1].name}</option>
  <option value="${month + 2}">${MONTHS[month + 2].name}</option>
  <option value="${month + 3}">${MONTHS[month + 3].name}</option>
  <option value="${month + 4}">${MONTHS[month + 4].name}</option>
  <option value="${month + 5}">${MONTHS[month + 5].name}</option>
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

$('.month-selector, .year-selector').on('change', function(event){
  event.preventDefault();

  let renderMonth = function () {
    MONTHS[1].days = Number($('#year').val()) % 4 == 0 ? 29 : 28
    let startOfMonth = new Date($('#year').val(), $('#month').val(), 1).getDay();
    let monthDays = MONTHS[$('#month').val()].days;
    let days = $(".days").children();
    $('.num').empty();
    _.range(1, monthDays + 1).forEach(function(dayIndex) {
      let day = $(days[startOfMonth + dayIndex - 1]);
      day.find('.num').html(dayIndex);
      if (clock.getDate() === dayIndex && clock.getMonth() == $('#month').val() && clock.getFullYear() == $('#year').val()) {
       day.find('.num').parent().addClass("day_background_color");
      } else{
       day.find('.num').parent().removeClass('day_background_color');
     }
    })
  };

  renderMonth();
})

}

CalendarController.$inject = ['$scope'];

export { CalendarController };
