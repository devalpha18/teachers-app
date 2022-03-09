import React, { useState } from 'react';
import { GoChevronDown } from 'react-icons/go';
import styled from 'styled-components';

const SelectContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledSelect = styled.div`
  width: fit-content;
  height: 39px;
  padding: 16px;
  display: flex;
  grid-gap: 16px;
  background: #ffffff;
  border: 2px solid #333333;
  align-items: center;
  border-radius: 3px;
  font-size: 16px;
  color: #333333;
  cursor: pointer;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;

  span {
    font-weight: 600;
    line-height: 19px;
  }
`;

const StyledOptions = styled.div`
  position: absolute;
  left: 0;
  top: 41px;
  background: #ffffff;
  border: 2px solid #333333;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  grid-gap: 8px;
  z-index: 5;
`;

interface StyledOptionProps {
  width?: number;
}

const StyledOption = styled.div<StyledOptionProps>`
  background: #ffffff;
  border-radius: 3px;
  width: ${({ width }) => (width ? `${width}px` : '213px')};
  height: 35px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  transition: all 0.2s;
  overflow: hidden;

  :hover {
    span {
      color: white;
    }
    background: #333333;
  }
  cursor: pointer;
`;

interface SelectProps {
  selectionData: any[];
  onSelect: Function;
  selectedIndex: number;
  width?: number;
}

const Select: React.FC<SelectProps> = props => {
  const { selectionData, selectedIndex, onSelect, width } = props;

  const [optionsVisible, setOptionsVisible] = useState<boolean>(false);

  const handleClick = (index: number) => {
    setOptionsVisible(false);
    onSelect(index);
  };

  return (
    <SelectContainer>
      <StyledSelect onClick={() => setOptionsVisible(!optionsVisible)}>
        <span>{selectionData[selectedIndex]}</span>
        <GoChevronDown />
      </StyledSelect>
      {optionsVisible && (
        <StyledOptions>
          {selectionData.map((data: string, index: number) => {
            return (
              <StyledOption onClick={() => handleClick(index)} width={width} key={index}>
                <span>{data}</span>
              </StyledOption>
            );
          })}
        </StyledOptions>
      )}
    </SelectContainer>
  );
};

export default Select;
