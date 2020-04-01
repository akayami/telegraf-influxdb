const Measurement = require('@akayami/influxdb-line-protocol').generate;

module.exports = (ref) => {

	it('Needs to detect unsupported client', (done) => {
		try {
			const c = new ref.client({
				type: 'unsupported',
				address: 'localhost',
				port: ref.port
			});
			done(new Error('Exception should have been thrown'));
		} catch (e) {
			done();
		}
	});

	it('Needs to handle a single message', (done) => {

		const c = new ref.client({
			type: ref.type,
			address: 'localhost',
			port: ref.port
		});

		c.connect((err) => {
			ref.server.on('message', (msg) => {
				if(msg.toLocaleString() === 'test,country=CA b=5,a=10') {
					done();
				} else {
					done(new Error('Wrong message'));
				}
			});

			const measurment = new Measurement('test');
			measurment.tag('country', 'CA');
			measurment.field('b', 5);
			measurment.field('a', 10);
			//c.send('test');
			c.send(measurment.toString(), (e) => {
				c.close();
			});
		});
	});

	// it('Needs to handle a 2 messages', (done) => {
	//
	// 	const c = new ref.client({
	// 		type: ref.type,
	// 		address: 'localhost',
	// 		port: ref.port
	// 	});
	//
	// 	c.connect((err) => {
	// 		ref.server.on('message', (msg) => {
	// 			if(msg.toLocaleString() === 'message2') {
	// 				done();
	// 			}
	// 		});
	//
	// 		const measurment = new Measurement('test');
	// 		measurment.tag('country', 'CA');
	// 		measurment.field('b', 5);
	// 		measurment.field('a', 10);
	// 		//c.send('test');
	// 		c.send('message1', (e) => {
	// 			c.send('message2', (e) => {
	// 				c.close();
	// 			});
	// 		});
	// 	});
	// });
};