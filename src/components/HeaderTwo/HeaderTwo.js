import styled from "styled-components";

export default styled.h2`
  font-family: ${props => (props.font ? props.font : props.theme.font)};
  text-align: left;
  border-bottom: 1px #000 solid;
  padding: 20px 0 20px 10px;
`;
