var peer = new Peer({key:"b3igy216q6geewmi",debug:3});

$(function() {
  $("#make-call").click(function() {
    let id = $("#callto-id").val();
    var call = peer.call(id,window.localstream);
    receive_call(call);
  })
  set_video();
});

peer.on('open',function(id) {
  $("#my-id").text(id);
});

peer.on('call',function(call) {
  call.answer(window.localstream);
  receive_call(call);
});

function set_video() {
  navigator.getUserMedia({"audio":true,"video":true},function(stream) {
    window.localstream = stream;
    $("#you").prop("src",URL.createObjectURL(stream));
    showfields();
  },function(err) {
    console.log(err);
  })
}

function showfields() {
  $(".video-area").show();
}

function receive_call(call) {
  if(window.existingCall) {
    window.existingCall.close();
  }
  call.on('stream', function(stream) {
    $("#friend").prop("src",URL.createObjectURL(stream));
});
}
