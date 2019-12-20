import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";

export default function StudyScreen({ min, sec, start, stop }) {
  let seconds;
  if (sec === 60) {
    min = "25";
    seconds = "00";
  } else if (sec < 10) seconds = `0${sec}`;
  else seconds = sec;
  return (
    <View style={styles.container}>
      <Text style={styles.time}>
        {min} : {seconds}
      </Text>
      <View style={styles.startStopButtons}>
        <TouchableOpacity style={{...styles.button,backgroundColor:'green'}} onPress={start}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.button,backgroundColor:'red'}} onPress={stop}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  time: {
    color: "white",
    fontSize: 52,
    fontWeight: "800"
  },
  startStopButtons: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 30
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
    padding: 20,
    width: "35%"
  },
  buttonText:{
    fontSize:18,
    color:'white'
  }
});
