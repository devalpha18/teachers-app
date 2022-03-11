import React from 'react';
import GlobalStyle from '../../styles/global';
import { StyledContainer } from './styled';
import Form from '../form';

import Toastr from '../../components/toastr';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        <Form />
      </StyledContainer>
      <Toastr />
    </>
  );
};

export default App;
