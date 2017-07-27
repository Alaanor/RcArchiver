let express = require('express');
let server = express();

server.configure(function(){
  server.use('/media', express.static(__dirname + '/media'));
  server.use(express.static(__dirname + '/public'));
});

server.listen(3000);
