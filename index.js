module.exports = class TelegrafClient {

	constructor(opt) {
		const options = {};
		let client, transport;
		options.type = opt.type || 'tcp';
		options.address = opt.address;
		options.port = opt.port;

		if(options.type === 'tcp') {
			transport = require('./lib/tcp');
		} else if (options.type === 'udp4' || options.type === 'udp6') {
			transport = require('./lib/udp');
		} else {
			throw new Error('Unsupported type ' + options.type + ' Valid values are tcp, udp4 or udp6');
		}
		this.transport = opt.transport || new transport(options);

	}

	connect(cb) {
		this.transport.connect(cb);
	}

	send(message, cb) {
		this.transport.send(message, cb);
	}

	close(cb) {
		this.transport.end(cb);
	}

};