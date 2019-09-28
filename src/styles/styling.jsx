import styled from 'styled-components';
import React from 'react';

const Title = styled.h1`
  margin: 5px;
`;

const StyledDiv = styled.div`
  padding: 10px;
`;
const FormWrapper = styled.div`
  display: inline-block;
  margin-bottom: 10px;
  padding: 10px;
  border: solid thin;
  border-color: black;
  border-radius: 2%;
`;

const AppWrapper = styled.div`
  position: absolute;
  text-align: center;
  left: 50%;
  top: 5%;
  width: 500px;
  height: fit-content;
  margin-left: -100px;
  margin-top: -50px;
  border: 1px solid black;
  `;

const WrapperDiv = styled.div`
  display: inline-block;
`;

const IconWrapper = styled.div`
  display: block;
`;

const IconDiv = styled.div`
  height: 65px;
  width: 65px;
  margin: 0px, 0px, 5px, 0px;
  background-image: url(http://localhost:8000/ball.png);
  display: inline-block;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Icon = function () {
  return (
    <IconWrapper >
      <IconDiv />
    </IconWrapper>
  )
}


export {
  StyledDiv,
  FormWrapper,
  AppWrapper,
  WrapperDiv,
  Icon,
  Title
};