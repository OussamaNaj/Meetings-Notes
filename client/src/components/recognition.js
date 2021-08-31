import { colors, TextField,Button} from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Record from './record';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';




const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()


function Dictaphone({ postData,setPostData }) {


  const [language,setlanguage]=useState("en-US");
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState("")
  const [aux, setaux] = useState(false)
  mic.continuous = true
  mic.interimResults = true
  mic.lang = language; 
  var finalTranscripts = "";
  useEffect(() => {
    handleListen()
  }, [isListening])

  const [v, setv] = useState("first");

  

  const handleListen = () => {

    if (isListening) {
      setaux(true)
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      setaux(false)
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
      postData.message=note;
}

    if("webkitSpeechRecognition" in window){
    mic.onstart = () => {
      console.log('Mics on') 
    }


    mic.onresult = function(event){
      var interimTranscripts = "";
      for(var i=event.resultIndex; i<event.results.length; i++){
          var transcript = event.results[i][0].transcript;
          
          if(event.results[i].isFinal){
              finalTranscripts += transcript ;
          }
          else{
              interimTranscripts += transcript  ;

          }

          setNote(v + finalTranscripts + interimTranscripts);
      
      }
  };
  mic.onerror = function(event){
    console.log(event)
  };
}
else{
  console.log("Your browser does not support that.");
}

  }

  const NotFromZero =(note)=>{
    setv(postData.message + ' ');
  }

  const FromZero =(note)=>{
    setv("");
  }


  const handleSaveNote = () => {
    setNote('')
  }

const Sel =(select)=>{
  if (select.target.value === "French"){
    setlanguage("fr-FR");
  }
  else if (select.target.value === "English"){
    setlanguage("en-US");
  }
}

  return (
    <>
    <div>
      <div className="btn-group" spacing={3}>
          <Button variant="contained"  size="medium" onClick={() => {if ( isListening === false){setIsListening(true); FromZero();}}} type="button" >Start</Button>
          &nbsp;
          <Button variant="contained"  size="medium" onClick={() => { setIsListening(false)}} type="button" >Stop/End</Button>
          &nbsp;
          <Button variant="contained" size="medium" type="button" onClick={() =>{if ( isListening === false){
            setIsListening(true)}; 
            NotFromZero(note);
          }}>Resume</Button>
          &nbsp;
          &nbsp;
        <FormControl>
          <Select style={{"width":"100px"}}   size="medium" onChange={Sel}>
          <MenuItem value="English" defaultvalue selected>English</MenuItem>
          <MenuItem value="French">French</MenuItem>
        </Select>
        <FormHelperText>Language</FormHelperText>
        </FormControl>
          </div>
          <div align="center">
          <h2>{isListening ? <span>🎙️ Working</span> : <span>🎙️ Stopped </span>}</h2>
          </div></div>
          <Record title={postData.title}/>
          <TextField name="Meeting Notes" className="french" id="result" variant="outlined" label="Meeting Notes" fullWidth multiline rows={10} value={ aux ? note : postData.message  } onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
          <Button onClick={handleSaveNote} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
    </>
  )
}

export default Dictaphone