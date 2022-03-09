import React, { useState } from 'react';
import styled from 'styled-components';

import isEmpty from '../../validation/is-empty';

const DragDropFileContainer = styled.div`
  background: #ffffff;
  border: 2px solid #333333;
  border-radius: 3px;
  display: flex;
  position: relative;
  height: 251px;
  width: 489px;
`;

const StyledInput = styled.input`
  outline: none;
  opacity: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  cursor: pointer;
  ::-webkit-file-upload-button {
    visibility: hidden;
  }
`;

const PreviewFile = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 19px;
  color: #a7a7a7;

  a {
    font-weight: 600;
    text-decoration: underline;
  }

  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
  }

  p {
    text-align: right;
    color: black;
  }

  span {
    text-align: left;
    color: black;
  }
`;

const DragDropFile: React.FC = () => {
  const [file, setFile] = useState<null | File>(null);

  return (
    <DragDropFileContainer>
      <StyledInput type="file" onChange={e => setFile(e.target.files![0])} />
      {file === null ? (
        <PreviewFile>
          Arrastra o&nbsp;<a>selecciona</a>
        </PreviewFile>
      ) : (
        <PreviewFile>
          <div>
            <p>Name:</p>
            <span>{file.name}</span>
            <p>Type:</p>
            <span>{file.type}</span>
            <p>Last Modified Date:</p>
            <span>{file.lastModified}</span>
          </div>
        </PreviewFile>
      )}
    </DragDropFileContainer>
  );
};

export default DragDropFile;
