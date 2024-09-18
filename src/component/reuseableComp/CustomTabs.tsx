import React from "react";
import styled from "styled-components";

const TabsWrapper = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const TabButton = styled.button<{ active: boolean }>`
  background-color: ${(props) =>
    props.active
      ? "var(--tab-active-bg-color, #0F6292)"
      : "var(--tab-inactive-bg-color, #f1f1f1)"};
  color: ${(props) =>
    props.active
      ? "var(--tab-active-text-color, #ffffff)"
      : "var(--tab-inactive-text-color, #333)"};
  padding: 0.625rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
  font-size: 0.75rem;
  @media screen and (min-width: 0px) and (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.625rem;
  }
`;

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChangeTab: (tabId: string) => void;
}

const CustomTabs: React.FC<TabsProps> = ({ tabs, activeTab, onChangeTab }) => {
  return (
    <TabsWrapper>
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          active={activeTab === tab.id}
          onClick={() => onChangeTab(tab.id)}
        >
          {tab.label}
        </TabButton>
      ))}
    </TabsWrapper>
  );
};

export default CustomTabs;
