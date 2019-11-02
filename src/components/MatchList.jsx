import React from 'react';
import styled from 'styled-components';


const colorRank = function (ranking) {
  const rgb = [60, 181, 84];

  let r = 195;
  let g = 74;
  let b = 171;

  let percentage = 100 - Math.floor(ranking);
  let newR = Math.floor(rgb[0] + r * (percentage / 100));
  let newG = Math.floor(rgb[1] + g * (percentage / 100));
  let newB = Math.floor(rgb[2] + b * (percentage / 100));

  return `rgb(${newR}, ${newG}, ${newB})`;
}



// const StyledDivLi = styled.div`
//   display: block;
//   margin: 10px;
//   height: 110px;
//   width: 400px;
//   border: solid thin;
//   border-color: black;
//   border-radius: 2%;
//   background-color: ${props => colorRank(props.ranking)};

// `;

// const MatchWrapper = styled.div`
//   display: block;
//   margin: 0;
//   padding: 10px 5px 20px 5px;
//   `;

// const ImageDiv = styled.div`
//   position: relative;
//   display: block;
//   margin: auto;
//   height: 48px;
//   width: 48px;
//   background-image: url(${props => props.image});
//   background-position: center;
//   background-size: contain;
//   background-repeat: no-repeat;
// `;

// const BadgeDiv = styled.div`
//   display: inline-block;
//   height: 75px;
//   width: 75px;
//   margin: ${props => props.team === 'home' ? '5px 80px 5px 5px' : '5px 5px 5px 80px'};
// `;

// const TeamSpan = styled.span`
//   display: table;
//   margin: auto;
//   position: relative;
//   white-space: nowrap
// `;

// const Versus = styled.span`
//   vertical-align: middle;
//   display: inline-table;
//   margin-bottom: 50px;
// }
// `;


function MatchItem(props) {
  return (
    <li className="media" ranking={props.ranking}>
      <div className="matches-wrapper">
        <div className="match-div" team={"home"}>
          <img className="team-img" src={props.homeImg} />
          <div className="centered">
            <h5 team={"home"}>{props.homeTeam}</h5>
          </div>
        </div>
        <div className="match-div badge badge-secondary badge-vs">vs</div>
        <div className="match-div" team={"away"}>
          <img className="team-img" src={props.awayImg} />
          <div className="centered">
            <h5 team={"away"}>{props.awayTeam}</h5>
          </div>
        </div>
      </div>
    </li>
  )
};



// const StyledUl = styled.ul`
//   display: inline-block;
//   padding: 0px 0px 0px 10px;`;

function MatchList(props) {
  return (
    <ul className="list-unstyled">
      {props.children}
    </ul>
  )
};

export { MatchList, MatchItem };