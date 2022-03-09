import styled from 'styled-components';

interface InputProps {
  width: number;
}

const Input = styled.input<InputProps>`
  background: #ffffff;
  border: 2px solid #333333;
  border-radius: 3px;
  outline: none;
  font-size: 16px;
  line-height: 19px;
  padding-left: 16px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  height: 39px;
  width: ${({ width }) => `${width}px`};
`;

export default Input;
