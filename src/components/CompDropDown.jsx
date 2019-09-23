import React from 'react';

function CompDropDown (props) {
  return (
    <div>
      <label htmlFor="competition" name="competition" onChange={props.onChange}>Select a competition:
        <select id="comp-list">
          <option value="">--Please choose a competition--</option>
          <option value="CL">Champions League</option>
          <option value="PL">Premier League</option>
          <option value="SA">Serie A</option>
          <option value="PD">La Liga</option>
          <option value="BL1">Bundesliga</option>
          <option value="FL1">Ligue 1</option>
        </select>
      </label>
    </div>
  )
}

export default CompDropDown;