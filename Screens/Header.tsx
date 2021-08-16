import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import styled from 'styled-components/native';

export const Header = () => {

  return (
    <HeaderView>
      <HeaderText>PM Type Trainer</HeaderText>
    </HeaderView>
  );
}

const HeaderView = styled.SafeAreaView`
  width: 100%;
  background-color: #f4af1b;
  align-items: center;
`;

const HeaderText = styled.Text`
  font-size: 32px;
  padding-bottom: 4px;
`;

