# Simple Telegraf Influxdb Client
This package, used together with the message formatter allows to communicate with telegraf UDP or TCP endpoint using Influx Line Protocol.

```javascript
const client = require('@akayami/telegraf-influxdb');
const generate = require('@akayami/influxdb-line-protocol').generate;

const c = new client({
	address: 'localhost',
	port: 8092,
	type: 'udp4'
});

c.connect((e) => {
	if(e) throw e;
	const p = new generate('testMeasurement');
	p.tag('tag', 'Some tag');
	p.field('field', 1);
	p.timestamp(new Date().getTime());
	c.send(p.toString(), (e) => {
		if(e) return console.error(e);
		c.close((e) => {
			if(e) return console.error(e);
			console.log('Message sent');
		});
	});
});
```