import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8888/";
const socket = socketIOClient(ENDPOINT);


const constraints = window.constraints = {
  audio: true,
  video: true
};


function App() {
  // const audio = useRef();
  const video = useRef();
  const otherVideo = useRef();

  useEffect(() => {
    socket.on("video", (data) => {
      console.log(data)
    });
    // socket.on("got", (data) => {
    //   console.log(data)
    //   var otherVid = data
    
    // });
  })


  navigator.mediaDevices.getUserMedia(constraints)
.then((stream)=> {
  
  var mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.onstart = function(e) {
    this.chunks = [];
  };
  mediaRecorder.ondataavailable = function(e) {
    this.chunks.push(e.data);
    var blob = new Blob(this.chunks, { 'type' : 'audio/ogg; codecs=opus' });
    socket.emit('video', blob);
    // mediaRecorder.start();
  };
  //   mediaRecorder.onstop = function(e) {
    // };
    
    mediaRecorder.start();
    
    // Start recording
    
    // Stop recording after 5 seconds and broadcast it server
    setInterval(() => {
      // setTimeout(function() {
        mediaRecorder.stop()
        mediaRecorder.start();
      }, 800);
      
    // }, 100);
    // console.log(stream)
    // if (video.current) {
      // var userVideoStream = stream
      // video.current.srcObject = stream
      socket.on('got', function(arrayBuffer) {
        var blob = new Blob([arrayBuffer], { 'type' : 'audio/ogg; codecs=opus' });
        var audio = document.createElement('audio');
        audio.src = window.URL.createObjectURL(blob);
        audio.play();
      });
      console.log(stream)
      // }
      
    })
    
    
    // navigator.mediaDevices.getUserMedia(constraints).then(stream=>{
      
      // });
      
      return (
        <div className="App">
      <header className="App-header">
      <div id="container">
      {/* <video ref={video} id="gum-local" controls autoPlay></video>
      <video ref={otherVideo} id="gum-local" controls autoPlay></video> */}

</div>
      </header>
    </div>
  );
}

export default App;
