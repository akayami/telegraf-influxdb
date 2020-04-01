const dgram = require('dgram');
const client = require('../index');

describe('Tests client functionality', () => {

	const ref = {
		server: null,
		client: client,
		port: null,
		type: 'udp4'
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

	require('./shared/client.test')(ref);

	// it('Needs to handle a simple udp message', (done) => {
	// 	const c = new client({
	// 		type: 'udp4',
	// 		address: 'localhost',
	// 		port: ref.port
	// 	});
	//
	// 	c.connect((err) => {
	// 		ref.server.on('message', (msg) => {
	// 			c.close(() => {
	// 				if(msg.toLocaleString() === 'test,country=CA b=5,a=10') {
	// 					done();
	// 				} else {
	// 					done(new Error('Wrong message'));
	// 				}
	// 			});
	// 		});
	//
	// 		const measurment = new Measurement('test');
	// 		measurment.tag('country', 'CA');
	// 		measurment.field('b', 5);
	// 		measurment.field('a', 10);
	// 		c.send(measurment.toString());
	// 	});
	// });

});