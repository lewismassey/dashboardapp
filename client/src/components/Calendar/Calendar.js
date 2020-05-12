import React, { Fragment, useState, useEffect } from "react";
import './Calendar.css'
const moment = require('moment');


const Calendar = () => {
  const weekdayShort = moment.weekdaysShort();
  const [dateObject, setDateObject] = useState(moment());

  let weekdayShortName = weekdayShort.map(day => {
   return (
     <th key={day} className="week-day">
      {day}
     </th>
   );
 });

 const firstDayOfMonth = () => {
   let firstDay = moment(dateObject)
   .startOf("month")
   .format("d")
   return firstDay;
 }

 let blanks = [];
    for (let i = 0; i < firstDayOfMonth(); i++) {
      blanks.push(
        <td className="calendar-day empty">{""}</td>
      );
    }

  let daysInMonth = [];
    for (let d = 1; d <= daysInMonth; d++) {
      daysInMonth.push(
        <td key={d} className="calendar-day">
          {d}
        </td>
      );
    }

    const totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row); // if index not equal 7 that means not go to next week
      } else {
        rows.push(cells); // when reach next week we contain all td in last week to rows
        cells = []; // empty container
        cells.push(row); // in current loop we still push current row to new container
      }
      if (i === totalSlots.length - 1) { // when end loop we add remain date
        rows.push(cells);
      }
    });

    let mapDaysInMonth = rows.map((d, i) => {
       return <tr>{d}</tr>;
     });






return (
  <div>
    <div>
      <h2>Calendar</h2>
    </div>
    <div>
    <table className="calendar-day">
          <thead>
            <tr key={weekdayShortName}>{weekdayShortName}</tr>
          </thead>
          <tbody>{mapDaysInMonth}</tbody>
        </table>
    </div>
  </div>


);
}

export default Calendar;
