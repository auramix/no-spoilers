import React from 'react';
import styled from 'styled-components';



const StyledDivLi = styled.div`
  display: block;
  margin: 10px;
  height: 100px;
  width: fit-content;
  border: solid thin;
  border-color: black;
  border-radius: 2%;
`;

const MatchWrapper = styled.div`
  display: block;
  margin: 0;
  padding: 10px 5px 20px 5px;
  `;

const ImageDiv = styled.div`
  position: relative;
  display: block;
  margin: auto;
  height: 48px;
  width: 48px;
  background-image: url(${props => props.image});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const BadgeDiv = styled.div`
  display: inline-block;
  height: 75px;
  width: 75px;
  margin: ${props => props.team === 'home' ? '5px 80px 5px 5px' : '5px 5px 5px 80px'};
`;

const TeamSpan = styled.span`
  display: table;
  margin: auto;
  position: relative;
`;

const Versus = styled.span`
  vertical-align: middle;
  display: inline-table;
  margin-bottom: 50px;
}
`;


function MatchItem(props) {
  return (
    <StyledDivLi>
      <MatchWrapper>
        <BadgeDiv team={"home"}>
          <ImageDiv image={props.homeImg} />
          <TeamSpan team={"home"}>{props.homeTeam}</TeamSpan>
        </BadgeDiv>
        <Versus>vs</Versus>
        <BadgeDiv image={props.awayImg} team={"away"}>
          <ImageDiv image={props.awayImg} />
          <TeamSpan team={"away"}>{props.awayTeam}</TeamSpan>
        </BadgeDiv>
      </MatchWrapper>
    </StyledDivLi>
  )
};



const StyledUl = styled.ul`
display: inline - block
padding: 0px;
`;

function MatchList(props) {
  return (
    <StyledUl>
      {props.children}
    </StyledUl>
  )
};

export { MatchList, MatchItem };