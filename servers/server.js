const net = require('net');

//== Basic Server ==//
/*
	const server = net.createServer((socket) => {
	socket.on('data', (data) => {
		console.log(data.toString());
	})
		});
*/

//== Basic Response mock ==//
/*
	const server = net.createServer((socket) => {
		socket.on('data', (data) => {
			const body = '<h1> Hello World from Raw TCP </h1>'
			const response = [
				'HTTP/1.1 200 OK',
				'Content-type: text/html',
				`Content-length: ${body.length}`,
				'',
				body
			].join('\r\n');

			socket.write(response);
			socket.end();
		})
	})
*/

//== Basic Routing ==//
const server = net.createServer((socket) => {
	socket.on('data', (data) => {
		const request = data.toString();
		const [requestLine] = request.split('\r\n');
		const [method, path] = requestLine.split(' ');
		console.log(`The HTTP method is: ${method}, and the path is ${path}`);
	})
})

server.listen(3003, () => {
	console.log('TCP server is listening on Port 3003');
});
