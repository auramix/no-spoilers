import styled from 'styled-components';

const StyledDiv = styled.div `
  padding: 10px;
`;
const FormWrapper = styled.div `
  display: inline-block;
  padding: 10px;
  border: solid thin;
  border-color: black;
  border-radius: 2%;
`;

const AppWrapper = styled.div `
margin: 5% 50%;
height: fit-content;
width: 500px;`;


export {
  StyledDiv,
  FormWrapper,
  AppWrapper
};