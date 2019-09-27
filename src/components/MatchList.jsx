import React from 'react';
import styled from 'styled-components';



const StyledDivLi = styled.div`
  display: block;
  margin: 10px;
  height: 100px;
  width: 300px;
`;

const MatchWrapper = styled.div`
  display: block;
  padding: 30px 0px;
`;


const BadgeDiv = styled.div`
  background-image: url(${props => props.image});
  position: relative;
  display: inline-block;
  height: 48px;
  width: 48px;
  background-position: center;
  background-size: cover;
  margin: ${props => props.team === 'home' ? '5px 80px 5px 5px' : '5px 5px 5px 80px'};
  ::after {
    content: ${props => props.teamName};
  }
`;

const Versus = styled.span`
  margin: 0px;
`;


function MatchItem(props) {
  return (
    <StyledDivLi>
      <MatchWrapper>
        <BadgeDiv image={props.homeImg} teamName={props.homeTeam} awayName={null} team={"home"}></BadgeDiv>
        <Versus>vs</Versus>
        <BadgeDiv image={props.awayImg} teamName={props.awayTeam} homeName={null} team={"away"}></BadgeDiv>
      </MatchWrapper>
    </StyledDivLi>
  )
};



const StyledUl = styled.ul`
  display: inline-block
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