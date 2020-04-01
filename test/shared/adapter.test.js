module.exports = (ref) => {

	it('Testing test suite before/after routines', (done) => {
		done();
	});

	it('Needs to connect/disconnect', (done) => {
		const c = new ref.client({
			port: ref.port
		});
		c.connect((err) => {
			c.end(done);
		});
	});


	it('Needs to connect/write/disconnect', (done) => {
		const c = new ref.client({
			port: ref.port
		});
		c.connect((err) => {
			ref.server.on('message', (msg, rinfo) => {
				if(msg.toLocaleString() === 'test') {
					done();
				} else {
					done(new Error('Wrong message received'));
				}
			});
			c.send('test', (err) => {
				c.end(() => {
					//console.log('Connection Ended');
				});
			});
		});
	});

	it('Needs to connect/write/disconnect 2', (done) => {
		const c = new ref.client({
			port: ref.port
		});
		c.connect((err) => {
			ref.server.on('message', (msg, rinfo) => {
				if(msg.toLocaleString() === 'test2') {
					done();
				} else {
					done(new Error('Wrong message received'));
				}
			});
			c.send('test2', (err) => {
				c.end(() => {
					//console.log('Connection Ended');
				});
			});
		});
	});

};