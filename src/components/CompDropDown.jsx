import React from 'react';

function CompDropDown(props) {
  return (
    <div>
      <label htmlFor="competition" onChange={props.onChange}>Select a competition:
        <select id="comp-list" name="competition">
          <option value="">--Please choose a competition--</option>
          <option value="5">Champions League</option>
          <option value="524">Premier League</option>
          <option value="891">Serie A</option>
          <option value="775">La Liga</option>
          <option value="754">Bundesliga</option>
          <option value="525">Ligue 1</option>
        </select>
      </label>
    </div>
  )
}

export default CompDropDown;