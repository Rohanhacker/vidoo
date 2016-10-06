var peer = new Peer({key:"b3igy216q6geewmi",debug:3,config:{
  "iceServer": [
    {"url":"stun.l.google.com:19302"},
    {"url":"stun1.l.google.com:19302"},
    {	"url": "turn:numb.viagenie.ca",
	   "credential": "muazkh",
	    "username": "webrtc@live.com"
    }
  ]
} }
);

$(function() {
  $("#make-call").click(function(event) {
    event.preventDefault();
    let id = $("#callto-id").val();
    peer.call(id,window.localstream);
    receive_call();
  })
});

peer.on('open',function(id) {
  $("#my-id").text(id);
});

peer.on('call',function(call)) {
  call.answer(window.localstream);
  receive_call();
}

function set_video() {
  navigator.getUserMedia({"audio":true,"video":true},function(stream) {
    window.localstream = stream;
    $("#you").prop("src",URL.crateObjectUrl(stream));
    showfields();
  },function(err) {
    console.log(err);
  })
}

function showfields() {
  $(".video-area").show();
}

function receive_call() {
  if(window.existingCall) {
    window.existingCall.close();
  }
  peer.on('stream', function(stream) {
    $("#friend").prop("src",URL,crateObjectUrl(stream));
});
}
