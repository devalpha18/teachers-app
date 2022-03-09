import React from 'react';
import GlobalStyle from '../../styles/global';
import { StyledContainer } from './styled';
import Form from '../form';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        <Form />
      </StyledContainer>
    </>
  );
};

export default App;
