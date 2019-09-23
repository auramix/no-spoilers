import React from 'react';

function convertDate (date) {
  date = date.split('/');
  date.unshift(date.pop());
  return date.join('-');
}

function DatePicker (props) {
  var date = new Date(Date.now());
  date = date.toLocaleDateString();
  date = convertDate(date);

  return (
      <span>
        <label htmlFor={props.for}>{props.text}</label>
        <input type="date" name={props.name} value={props.dateFrom} min="2000-01-01" max={date} onChange={props.onChange}></input>
      </span>
  )
}

export default DatePicker;