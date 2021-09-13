import React from "react";
import { View } from 'react-native';
import styled from "styled-components/native";
import { IMenuButtonProps } from "../Types";

export const ScreenWrapper = styled.View`
  background-color: #333333;
  justify-content: center;
  flex: 1;
`;

export const MainMenuOption = (buttonProps: IMenuButtonProps) => {

  return (
    <ButtonContainer
      onPress={buttonProps.actionOnPress}
    >
      <ButtonText>{buttonProps.buttonText}</ButtonText>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.Pressable`
  align-self: center;
  align-items: center;
  background-color: #f4af1b;
  width: 75%;
  margin: 24px 0px;
`;

const ButtonText = styled.Text`
  padding: 12px;
  font-size: 24px;
`;