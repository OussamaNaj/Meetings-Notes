import React from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import Button from '@material-ui/core/Button';
import MicOffIcon from '@material-ui/icons/MicOff';

const Mp3Recorder = new MicRecorder({ 
    bitRate: 64 ,
    prefix: "data:audio/wav;base64,",
});


class Record extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
    };
  }


  start = () => {
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
    }
  };

  stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        const binaryString = btoa(blobURL)
        this.setState({ blobURL, isRecording: false });
      }).catch((e) => console.log(e));
  };

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true })
      },
    );
  }


  render(){
    return (
        <>
          <div className="btn-group" spacing={3}>
            <Button variant="contained" size="small" type="button"  onClick={this.start} disabled={this.state.isRecording}>{this.state.isRecording ? <span> Recording...</span> : <span>Record</span>}</Button>
            &nbsp;
            <Button variant="contained" size="small" type="button" onClick={this.stop} disabled={!this.state.isRecording}><MicOffIcon />Stop Recording</Button>
            &nbsp;
            &nbsp;
            <audio variant="contained" size="small" type="button" src={this.state.blobURL} style={{"width":"220px","height":"35px"}} controls="controls" title={this.props.title}/>
          </div>

        </>

    );
  }
}



export default Record;