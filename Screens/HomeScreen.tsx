import React from 'react';
import { SafeAreaView, View, Text, TextPropTypes } from 'react-native';
import { MainMenuOption, ScreenWrapper } from '../ReusableComponents/StyledComponents';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {

  const navigation = useNavigation();

  const quizAction = () => {
    console.log('quiz button was pressed')
    navigation.navigate({key: 'QuizScreen'});
  }

  const typeChartAction = () => {
    navigation.navigate({key: 'TypeChartScreen'});
  }

  const optionsAction = () => {
    navigation.navigate({key: 'OptionsScreen'});
  }

  return (
    <ScreenWrapper>
      <MainMenuOption 
        actionOnPress={() => quizAction}
        buttonText='Quiz Time'
        buttonWidth='75%'
        buttonColor='#f4af1b'
      />
      <MainMenuOption 
        actionOnPress={() => typeChartAction}
        buttonText='Type Chart'
        buttonWidth='75%'
        buttonColor='#f4af1b'
      />
      <MainMenuOption 
        actionOnPress={() => optionsAction}
        buttonText='Options'
        buttonWidth='75%'
        buttonColor='#f4af1b'
      />
    </ScreenWrapper>
  );
}


export default HomeScreen;