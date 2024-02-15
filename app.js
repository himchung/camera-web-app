var frontCamera = false;
var currentStream;

const
    cameraView = document.querySelector("#camera-view"),
    cameraDevice = document.querySelector("#camera-device"),
    photoDisplay = document.querySelector("#photo-diaplay"),
    takePhotoButton= document.querySelector("#take-photo-button");
    frontCameraButton= document.querySelector("#front-camera-button");
function cameraStart(){
    if(typeof currentStream!=='undefined'){
        currentStream.getTracks().forEach(track=>{
            track.stop();
        });
    }
    var constraints={video:{facingMode:(frontCamera?"user":"environment")},audio:false};
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream){
            currentStream=stream;
            cameraDevice.srcObject= stream;
        })
        .catch(function(error){
            console.error("Error happened.",error);
        });
}
takePhotoButton.onclick = function(){
    cameraView.width= cameraDevice.videoWidth;
    cameraView.height= cameraDevice.videoHeight;
    cameraView.getContext("2d").drawImage(cameraDevice,0,0);
    photoDisplay.src=cameraView.toDataUrl("image/webp");
    photoDisplay.classList.add("photo-taken");
};
frontCameraButton.onclick = function(){
    frontCamera=!frontCamera;
    if(frontCamera){
        frontCameraButton.textcontent="Back Camera";
    }
    else{
        frontCameraButton.textcontent="Front Camera";
    }
    cameraStart();
};
window.addEventListener("load", cameraStart);