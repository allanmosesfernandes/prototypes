"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hono_1 = require("hono");
var node_server_1 = require("@hono/node-server");
var auth_js_1 = require("./routes/auth.js");
var app = new hono_1.Hono();
app.get('/', function (c) {
    return c.json({ message: 'Bookmarks API is running' });
});
app.route('/api/auth', auth_js_1.default);
(0, node_server_1.serve)({ fetch: app.fetch, port: 8000 }, function () {
    console.log('Server listening on port 8000');
});
