import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as RNFS from 'react-native-fs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from './Screens/Header';
import HomeScreen from './Screens/HomeScreen';
import QuizScreen from './Screens/QuizScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  // grabTypesFromPokeAPI();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='Home'
          screenOptions={{header: () => <Header/>}}
        >
          <Stack.Screen 
            name='Home'
            component={HomeScreen}
          />
          <Stack.Screen 
            name='Quiz'
            component={QuizScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  );
}

function grabTypesFromPokeAPI() {
  const URL = "https://pokeapi.co/api/v2/type";
  let typeEndpointArray = [];

  fetch(URL)
    .then(response => response.json())
    .then(data => {
      data["results"].forEach((item) => {
        if (item.name !== "unknown" && item.name !== "shadow") {
          typeEndpointArray.push(item);
        }
      });

      writeDataToLocalJSON(typeEndpointArray);
    })
    .catch(error => {
      console.log(error.message);

    });
}

function writeDataToLocalJSON(listOfEndpoints) {
  let requests = [];
  let typeNames = [];
  listOfEndpoints.forEach(
    (item) => {
      typeNames.push(item.name);
      requests.push(makePromise(item.url))
    }
  );

  let typeMap = PreconstructTypeChart(typeNames);

  Promise.all(requests)
    .then((proms) => {

      proms.forEach((res) => {
        let damgeRelations = res['damage_relations'];

        typeMap.set(res['name'], {
          doubleDamageTo: returnNames(damgeRelations['double_damage_to']),
          normalDamageTo: typeNames.filter((type) => {
            if (returnNames(damgeRelations['double_damage_to']).includes(type)) return false;
            if (returnNames(damgeRelations['half_damage_to']).includes(type)) return false;
            if (returnNames(damgeRelations['no_damage_to']).includes(type)) return false;
            return true;
          }),
          halfDamageTo: returnNames(damgeRelations['half_damage_to']),
          noDamageTo: returnNames(damgeRelations['no_damage_to']),
          normalDamageFrom: typeNames.filter((type) => {
            if (returnNames(damgeRelations['double_damage_from']).includes(type)) return false;
            if (returnNames(damgeRelations['half_damage_from']).includes(type)) return false;
            if (returnNames(damgeRelations['no_damage_from']).includes(type)) return false;
            return true;
          }),
          doubleDamageFrom: returnNames(damgeRelations['double_damage_from']),
          halfDamageFrom: returnNames(damgeRelations['half_damage_from']),
          noDamageFrom: returnNames(damgeRelations['no_damage_from'])
        });
        // console.log('printing type...');
        // console.log(typeMap.get(res['name']));
      });
      
    }).then(() => {

      console.log(typeMap.get('normal'));
      
      RNFS.writeFile('/Users/matt-brooks/Personal/poke-type-trainer/PokeData.json', JSON.stringify(typeMap, replacer, 2), 'ascii').then(res => {
        console.log('Success');
      })
    }).catch(error => {
      console.log(error.message);
    });
}

function returnNames(typeArray) {
  let nameArray = [];
  typeArray.forEach((type) => {
    nameArray.push(type.name);
  })
  return nameArray;
}

function PreconstructTypeChart(types) {

  let typeChartMap = new Map();

  types.forEach(
    (type) => {
      typeChartMap.set(type,
        {
          doubleDamageTo: [],
          normalDamageTo: [],
          halfDamageTo: [],
          noDamageTo: [],
          normalDamageFrom: [],
          doubleDamageFrom: [],
          halfDamageFrom: [],
          noDamageFrom: []
        }
      );
    }
  );

  return typeChartMap;
}

function makePromise(url) {
  return fetch(url).then(res => res.json());
}

function replacer(key, value) {
  if(value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}