import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
  Vibration
} from "react-native";

import StudyScreen from "./screens/StudyScreen";
import BreakScreen from "./screens/BreakScreen";

const DURATION = 1000;

export default class App extends Component {
  state = {
    studyMinutesLeft: 24,
    breakMinutesLeft: 4,
    timer: 0,
    studyMode: true,
    timerRunning: false
  };
  starStudyTimer = () => {
    this.setState({
      timerRunning: true
    });
    let stop = setInterval(() => {
      if (!this.state.timerRunning) clearInterval(stop);
      if (this.state.studyMinutesLeft === 0 && this.state.timer === 60) {
        // Vibrates for 1s
        Vibration.vibrate(DURATION);
        clearInterval(stop);
        this.setState({
          studyMode: false,
          timer: 0
        });
      }
      if (this.state.timer == 60) {
        this.setState({
          timer: 0,
          studyMinutesLeft: this.state.studyMinutesLeft - 1
        });
      }

      this.setState({
        timer: this.state.timer + 1
      });
    }, 1000);
  };
  startBreakTimer = () => {
    this.setState({
      timerRunning: true
    });
    let stop = setInterval(() => {
      if (!this.state.timerRunning) clearInterval(stop);
      if (this.state.breakMinutesLeft === 0 && this.state.timer === 60) {
        // Vibrates for 1s
        Vibration.vibrate(DURATION);
        this.setState({
          studyMode: true,
          timer: 0
        });
        clearInterval(stop);
      }
      if (this.state.timer == 60) {
        this.setState({
          timer: 0,
          breakMinutesLeft: this.state.breakMinutesLeft - 1
        });
      }
      this.setState({
        timer: this.state.timer + 1
      });
    }, 1000);
  };
  pauseTimer = () => {
    this.setState({ timerRunning: false });
  };
  resetTimer = () => { 
    this.setState({
      studyMinutesLeft: 24,
      breakMinutesLeft: 4,
      timer: 0,
      studyMode: true,
      timerRunning: false
    });
  };

  render() {
    let secondsToDisplay = 60 - this.state.timer;
    const screenToDisplay = this.state.studyMode ? (
      <StudyScreen
        start={this.starStudyTimer}
        stop={this.pauseTimer}
        min={this.state.studyMinutesLeft}
        sec={secondsToDisplay}
      />
    ) : (
      <BreakScreen
        start={this.startBreakTimer}
        stop={this.pauseTimer}
        min={this.state.breakMinutesLeft}
        sec={secondsToDisplay}
      />
    );
    return (
      <ImageBackground
        source={require("./assets/clock.jpg")}
        style={styles.container}
        resizeMode="cover"
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Pomodoro Timer</Text>
        </View>

        <View style={styles.screen}>{screenToDisplay}</View>
        <View style={{ width: "80%" }}>
          <Button title="reset" color="purple" onPress={this.resetTimer} />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  header: {
    textAlign: "center",
    color: "black",
    fontSize: 38,
    fontWeight: "bold"
  },
  screen: {
    width: "100%",
    alignItems: "center"
  },
  headerContainer: {
    padding: 20,
    backgroundColor: "#e6ecf5"
  }
});
