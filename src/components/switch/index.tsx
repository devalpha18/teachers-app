import React from 'react';
import styled from 'styled-components';

const SwitchContainer = styled.div`
  display: flex;

  input[type='checkbox'] {
    height: 0;
    width: 0;
    display: none;
  }

  label {
    cursor: pointer;
    text-indent: -9999px;
    width: 64px;
    height: 32px;
    background: #ffffff;
    border: 2px solid #333333;
    display: block;
    border-radius: 34px;
    position: relative;
  }

  label:after {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    left: 2px;
    top: 2px;
    background: #333333;
    border-radius: 100px;
    transition: 0.3s;
  }

  input:checked + label {
    background: #333333;
  }

  input:checked + label:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
    background: #ffffff;
  }

  label:active:after {
    width: 60px;
  }
`;

interface SwitchProps {
  onSwitch: Function;
}

const Switch: React.FC<SwitchProps> = props => {
  const { onSwitch } = props;

  return (
    <SwitchContainer>
      <input type="checkbox" id="switch" onChange={e => onSwitch(e.target.checked)} />
      <label htmlFor="switch">Toggle</label>
    </SwitchContainer>
  );
};

export default Switch;
