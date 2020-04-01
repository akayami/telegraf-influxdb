const dgram = require('dgram');

module.exports = class TransportUDP {

	constructor(options) {
		this.type = options.type || 'udp4';
		this.address = options.address;
		this.port = options.port || 8092;
		this.client = options.client || dgram.createSocket(this.type);
	}


	connect(cb) {
		cb();
	}

	send(message, cb) {
		this.client.send(message, this.port, this.address, cb);
	}

	end(cb) {
		this.client.close(cb);
	}

};