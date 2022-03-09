import styled from 'styled-components';

interface ButtonProps {
  theme: 'light' | 'dark';
}

const Button = styled.button<ButtonProps>`
  padding: 0 32px;
  height: 45px;
  width: fit-content;
  background: ${({ theme }) => (theme == 'light' ? 'white' : '#333333')};
  color: ${({ theme }) => (theme == 'light' ? '#333333' : 'white')};
  border: 2px solid #333333;
  border-radius: 100px;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  :active {
    transform: scale(0.85);
  }
`;

export default Button;
