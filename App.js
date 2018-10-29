import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import Map from './components/Map';
import { Location, Permissions } from 'expo';

// A placeholder until we get our own location

const region_copenhagen = {
  latitude: 55.676098,
  longitude: 12.568337,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

export default class App extends React.Component {
  
  state = {
    region: region_copenhagen,
    coffeeShops: [],
  }

  componentWillMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas
    };
    await this.setState({ region });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Map
          region={this.state.region}
          places={this.state.coffeeShops}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#f8f9fa",
    alignItems: 'center',
    justifyContent: 'center',
  },
});
