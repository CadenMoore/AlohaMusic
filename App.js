import React, { Component } from 'react';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

const ukuleleImage = require('./images/ukulele.png');

export default class App extends Component {
  state = {
    isPlaying: false,
    playbackInstance: null,
  }

  async componentDidMount() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playThroughEarpieceAndroid: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
    });
    this.loadAudio();
  }

  async loadAudio() {
    const playbackInstance = new Audio.Sound();
    
    await playbackInstance.loadAsync(require('./music/ukulele.mp3'));
    this.setState({
      playbackInstance
    });
  }

  handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = this.state;
    isPlaying ? await playbackInstance.pauseAsync() : playbackInstance.playAsync();
    this.setState({
      isPlaying: !isPlaying
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Aloha Music
        </Text>
        <Image style={styles.imageContainer} source={ukuleleImage}/>
        <TouchableOpacity
          onPress={this.handlePlayPause}
        >
          {this.state.isPlaying ?
            <Feather name="pause" size={32} color="black" /> :
            <Feather name="play" size={32} color="black" />
          }
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4e3cf',
    color: '#563822',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    width: 300,
    backgroundColor: '#da9547',
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
  },
  imageContainer: {
    height: 500,
    width: 300,
    margin: 45,
  },

});
