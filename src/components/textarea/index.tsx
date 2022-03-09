import styled from 'styled-components';

const TextArea = styled.textarea`
  padding: 10px 16px;
  background: #ffffff;
  border: 2px solid #333333;
  border-radius: 3px;
  width: 489px;
  height: 251px;
  font-size: 16px;
  line-height: 19px;
  outline: none;

  ::placeholder {
    padding: 100px 0;
  }
`;

export default TextArea;
