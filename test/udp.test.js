const dgram = require('dgram');
const client = require('../lib/udp');

describe('Test of the UDP connector', () => {

	const ref = {
		server: null,
		client: client,
		port: null
	};

	beforeEach((done) => {
		ref.port = 20222;
		ref.server = dgram.createSocket('udp4');
		ref.server.on('error', (err) => {
			throw new err;
		});
		ref.server.bind(ref.port);
		done();
	});

	afterEach((done) => {
		ref.server.close();
		done();
	});

	require('./shared/adapter.test')(ref);
});