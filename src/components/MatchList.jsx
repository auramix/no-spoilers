import React from 'react';
import styled from 'styled-components';



const StyledDivLi = styled.div`
  display: block;
  margin: 10px;
`;

const BadgeDiv = styled.div`
  background-image: ${props => props.image};
  position: relative;
  margin: 8px;
  ::after {
    content: ${props => props.teamName}
  }
`;

const Versus = styled.span`
  margin: 80px;
`;


function MatchItem(props) {
  return (
    <StyledDivLi>
      <BadgeDiv image={props.homeImg} teamName={props.homeTeam}></BadgeDiv>
      <Versus>vs</Versus>
      <BadgeDiv image={props.awayImg} teamName={props.awayTeam}></BadgeDiv>
    </StyledDivLi>
  )
};



const StyledUl = styled.ul`
  display: inline-block
`;

function MatchList(props) {
  return (
    <StyleUl>
      {props.children}
    </StyleUl>
  )
};

export { MatchList, MatchItem };