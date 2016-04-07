// import some code we need
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import FormatTime from 'minutes-seconds-milliseconds';

// Create our component
class StopWatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>{/* Yellow */}
          <View style={styles.timerWrapper}>{/* Red */}
            <Text style={styles.timer}>
              {FormatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style={styles.buttonWrapper}>{/* Green */}
            {this.startStopButton()}
            {this.lapButton()}
          </View>
        </View>
        <View style={styles.footer}>{/* Blue */}
           {this.laps()}
        </View>
      </View>
    );
  }

  laps() {
    return this.state.laps.map(function(time, index){
      return <View key={index} style={styles.lap}>
        <Text style={styles.lapText}>
          Lap #{index + 1}
        </Text>
        <Text style={styles.lapText}>
          {FormatTime(time)}
        </Text>
      </View>
    })
  }

  startStopButton() {
    var styleButton = this.state.running ? styles.stopButton : styles.startButton;

    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.handleStartPress.bind(this)}
      style={[styleButton, styles.button]}
      >
      <Text>
        {this.state.running ? 'Stop' : 'Start'}
      </Text>
    </TouchableHighlight>
  }

  handleStartPress() {
    if(this.state.running) {
      clearInterval(this.interval);

      this.setState({running: false});
      return;
    }

    this.setState({startTime: new Date()});

    this.interval = setInterval(() => {
      // Atualizar o State com novo valor
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 30);
  }

  lapButton() {
    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.handleLapPress.bind(this)}
      style={[styles.lapButton, styles.button]}
      >
      <Text>
        Lap
      </Text>
    </TouchableHighlight>
  }

  handleLapPress() {
    var lap = this.state.timeElapsed;
    console.log(lap);

    this.setState({
      laps: this.state.laps.concat(lap)
    });
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Preenche toda a tela
    alignItems: 'stretch'
  },
  header: { // Yellow
    flex: 1
  },
  footer: { // Blue
    flex: 1
  },
  timerWrapper: { // Red
    flex: 5, // ocupa 5 de 8 espaços disponíveis
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: { // Green
    flex: 3, // ocupa 3/8 espaços disponíveis
    flexDirection: 'row', // Deixa os elementos um do lado do outro
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#2b9f13'
  },
  stopButton: {
    borderColor: '#c32441'
  },
  lapButton: {
    borderColor: '#a72c3f'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('devdactic_react', () => StopWatch);
