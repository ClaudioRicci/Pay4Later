import styled from "styled-components";

export default styled.table`
  font-family: ${props => (props.font ? props.font : props.theme.font)};
  text-align: left;
  border: 2px #000 solid;
  border-collapse: collapse;
  margin: 1em;
  width: 90%;
  th,
  td {
    border-right: 2px #000 solid;
    padding: 0.4em 1em 0.4em 0.2em;
  }
  th:last-child,
  td:last-child {
    border: none;
  }

  thead > tr {
    background: #95bbf2;
  }
  tbody > tr:nth-child(even) {
    background: #fff;
  }
  tbody > tr:nth-child(odd) {
    background: #eee;
  }
`;
