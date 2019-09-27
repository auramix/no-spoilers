import React from 'react';
import styled from 'styled-components';

const DropDownDiv = styled.div`
  margin: 10px;
`;

function CompDropDown(props) {
  return (
    <DropDownDiv>
      <label htmlFor="competition" onChange={props.onChange}>Select a competition:
        <select id="comp-list" name="competition">
          <option value="">--Please choose a competition--</option>
          <option value="530">Champions League</option>
          <option value="524">Premier League</option>
          <option value="891">Serie A</option>
          <option value="775">La Liga</option>
          <option value="754">Bundesliga</option>
          <option value="525">Ligue 1</option>
          <option value="1">World Cup</option>
        </select>
      </label>
    </DropDownDiv>
  )
}

export default CompDropDown;