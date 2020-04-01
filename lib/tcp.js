const net = require('net');


module.exports = class TransportTCP {

	constructor(options) {
		this.address = options.address || 'localhost';
		this.port = options.port || 8094;
		this.client = options.client || new net.Socket();
	}

	connect(cb) {
		this.client.connect(this.port, this.address, cb);
	}

	send(message, cb) {
		this.client.write(message, cb);
	}

	end(cb) {
		this.client.end(cb);
	}

};