jQuery(document).ready(function() {
  var isConnected = false,
      websocket = '';

  // Connect to WS
  function connect(wsHost, wsProtocol){
    //var wsProtocol = window.location.protocol == 'https:' ? 'wss://' : 'ws://';
  //  var wsHost = wsProtocol + window.location.host + "/ws";

    websocket = new WebSocket(wsHost, wsProtocol);

    websocket.onopen = function() {
      isConnected = true;
      jQuery('<li>WS connect is open</li>').appendTo(".ws-response ul");
    };

    websocket.onclose = function(event) {
      isConnected = false;
      var errorMsg = 'Error code: ' + event.code;
      console.log(event);
      jQuery('<li>').text(errorMsg).appendTo('.ws-response ul');
    };

    websocket.onmessage = function(event) {
      jQuery('<li>').text(event.data).appendTo('.ws-response ul');
    };

    websocket.onerror = function(error) {
      isConnected = false;
      var errorMsg = "Error Message " + error.message;
      jQuery('<li>').text(errorMsg).appendTo('.ws-response ul');
    };
  }

  // Connect Model Show
  jQuery('.ws-connect').on('click', function(){
    //connect();
    jQuery('#wsTryConnect').modal('show');
  });

  // Connect Model To WebSocket
  jQuery('.ws-try-connect').on('click', function(){
    //connect();
    var wsHost = jQuery('#wsTryConnect').find('.ws-connect-data #host').val();
    var wsProtocol = jQuery('#wsTryConnect').find('.ws-connect-data #protocol').val();
    if(wsHost && wsProtocol) {
      jQuery('#wsTryConnect').modal('hide');
      connect(wsHost, wsProtocol);
    } else {
      jQuery('#wsTryConnect').modal('hide');
      jQuery('#wsNotConnected').modal('show');
    }
  });

  // Send Data
  jQuery('.ws-send').on('click', function(){
    if(isConnected){
      var data = jQuery('.ws-container textarea').val();
      websocket.send(data);
    } else{
      jQuery('#wsNotConnected').modal('show');
    }
  });

  // Clear Result
  jQuery('.ws-clear').on('click', function(){
    jQuery('.ws-response ul').html('');
    jQuery('.ws-container textarea').val('');
  });
});
