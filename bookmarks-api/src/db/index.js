"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var postgres_js_1 = require("drizzle-orm/postgres-js");
var postgres_1 = require("postgres");
var schema = require("./schema.js");
var client = (0, postgres_1.default)('postgres://bookmark_user:bookmark_pass@localhost:5432/bookmark_db');
exports.db = (0, postgres_js_1.drizzle)(client, { schema: schema });
