import React, { useState } from 'react';
import styled from 'styled-components';

const TabContainer = styled.div`
  background: #ffffff;
  border: 2px solid #333333;
  border-radius: 34px;
  display: flex;
  padding: 2px;
  width: fit-content;
  height: fit-content;
`;

interface TabItemProps {
  clicked?: boolean;
}

const TabItem = styled.div<TabItemProps>`
  height: 28px;
  background: ${({ clicked }) => (clicked ? '#333333' : 'white')};
  border-radius: 100px;
  display: flex;
  width: fit-content;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  letter-spacing: -0.084px;
  color: ${({ clicked }) => (clicked ? 'white' : '#333333')};
  padding: 0 30px;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

interface TabProps {
  tabItems: string[];
  selectedIndex: number;
  onClick: Function;
}

const Tab: React.FC<TabProps> = props => {
  const { tabItems, selectedIndex, onClick } = props;

  const handleClick = (index: number) => {
    onClick(index);
  };

  return (
    <TabContainer>
      {tabItems.map((item, index) => {
        return (
          <TabItem key={index} onClick={() => handleClick(index)} clicked={selectedIndex === index ? true : false}>
            {item}
          </TabItem>
        );
      })}
    </TabContainer>
  );
};

export default Tab;
