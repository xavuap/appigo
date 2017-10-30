// Generated by CoffeeScript 1.12.0
(function() {
  module.exports = function(ws) {
    var ask, conna, connxs, fuente, net, re;
    connxs = [];
    net = require("net");
    fuente = net.createServer(function(conn) {
      connxs.push(conn);
      console.log("por favor, je conectó alguien, habemus " + connxs.length);
      conn.on("end", function() {
        connxs.splice(connxs.indexOf(conn));
        return console.log("se cerró una conección en el neutrón, hay " + connxs.length);
      });
      return conn.on("data", function(d) {
        var connx, i, len, results;
        results = [];
        for (i = 0, len = connxs.length; i < len; i++) {
          connx = connxs[i];
          results.push(connx.write(d.toString()));
        }
        return results;
      });
    });
    fuente.on("error", function(e) {
      console.log("en el servicio hubo un " + e);
      return fuente.close();
    });
    fuente.listen("./sckt", function() {
      return console.log("escuchando por favor a ./sckt");
    });
    process.on('SIGINT', function() {
      fuente.close();
      return process.exit();
    });
    conna = net.createConnection("./sckt", function() {
      return console.log("conna conectado a sckt, por favor");
    });
    conna.on("end", function() {
      return console.log("por favor, me retiré del neutrón");
    });
    conna.on("error", function(beta) {
      return console.log("por favor, pasó un " + beta);
    });

    /*
    	sckt = net.Socket()
    	sckt.connect("./sckt",->
    		console.log("por favor, conectado a sckt")
    	)
    	sckt.on("error",(beta)->
    		console.log("pasó un "+beta)
    	)
     */
    re = function(fd) {
      return conna.on("data", function(d) {
        return fd(d.toString());
      });
    };
    ask = function(m) {
      return conna.write(m);
    };
    return ws({
      ask: ask,
      re: re
    });

    /*
    	ff(
    		ask: (m)->conna.write(m,->console.log("por favor write")) # señal para todes
    		re: (f)->conna.on("data",(d)->
    			console.log("conna alcanzó respuesta "+d.toString())
    			f(d.toString())
    		) # evento común
    	)
     */
  };

}).call(this);