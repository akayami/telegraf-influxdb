const net = require('net');
const client = require('../lib/tcp');

describe('Test of the TCP connector', () => {

	const ref = {
		server: null,
		client: client,
		port: null
	};

	beforeEach((done) => {
		ref.port = 20222;
		ref.server = new net.Server((socket) => {
			const b = [];
			socket.on('data', (data) => {
				b.push(data);
			});
			socket.on('end', (e) => {
				// custom way to send message to match UDP
				ref.server.emit('message', b.join());
			});
		});
		ref.server.listen(ref.port, (err) => {
			done(err);
		});

	});

	afterEach((done) => {
		ref.server.close(() => {
			done();
		});
	});

	require('./shared/adapter.test')(ref);
});