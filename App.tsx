import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as fs from 'fs';

interface ITypeEndpointData {
  name: string,
  url: string
}

export default function App() {

  grabTypesFromPokeAPI();

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function grabTypesFromPokeAPI() {
  const URL = "https://pokeapi.co/api/v2/type";
  let typeEndpointArray : {url: string}[] = [];

  fetch(URL)
    .then(response => response.json())
    .then(data => {
      data["results"].forEach((item : ITypeEndpointData) => {
        if (item.name !== "unknown" && item.name !== "shadow") {
          typeEndpointArray.push({url: item.url});
        }
      });

      writeDataToLocalJSON(typeEndpointArray);
    });
}

function writeDataToLocalJSON(listOfEndpoints: {url: string}[]) {


  let requests = listOfEndpoints.map((item) => makePromise(item.url));

  Promise.all(requests)
    .then((responses) => {
      responses.forEach((res) => {
        console.log(res);
      })
    })

  // fs.writeFile("../Test.json", JSON.stringify(listOfEndpoints), error => {
  //   if (error) {
  //     console.log('Error writing file', error);
  //   }
  //   else {
  //     console.log('Successfully wrote file');
  //   }
  // });
}

function makePromise(url : string) {
  return fetch(url)
    .then(response => console.log(response.json()));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
