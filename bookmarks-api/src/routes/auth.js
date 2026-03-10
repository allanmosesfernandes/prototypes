"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var hono_1 = require("hono");
var schema_js_1 = require("../db/schema.js");
var bcryptjs_1 = require("bcryptjs");
var drizzle_orm_1 = require("drizzle-orm");
var index_js_1 = require("../db/index.js");
var auth = new hono_1.Hono();
auth.post('/register', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, existing, hashedPassword, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, c.req.json()];
            case 1:
                _a = _b.sent(), email = _a.email, password = _a.password;
                if (!email || !password) {
                    return [2 /*return*/, c.json({ error: 'Email and password are required' }, 400)];
                }
                return [4 /*yield*/, index_js_1.db.select().from(schema_js_1.users).where((0, drizzle_orm_1.eq)(schema_js_1.users.email, email))];
            case 2:
                existing = _b.sent();
                if (existing.length > 0) {
                    return [2 /*return*/, c.json({ error: 'Email already registered' }, 400)];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 3:
                hashedPassword = _b.sent();
                return [4 /*yield*/, index_js_1.db.insert(schema_js_1.users).values({
                        email: email,
                        password: hashedPassword
                    }).returning({ id: schema_js_1.users.id, email: schema_js_1.users.email })];
            case 4:
                user = (_b.sent())[0];
                return [2 /*return*/, c.json({ user: user }, 201)];
        }
    });
}); });
auth.post('/login', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, c.req.json()];
            case 1:
                body = _a.sent();
                return [2 /*return*/, c.json({ message: 'Login endpoint', email: body.email })];
        }
    });
}); });
exports.default = auth;
/*
import { Hono } from 'hono';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

const auth = new Hono();

auth.post('/register', async (c) => {
  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json({ error: 'Email and password are required' }, 400);
  }

  // Check if user already exists
  const existing = await db.select().from(users).where(eq(users.email, email));

  if (existing.length > 0) {
    return c.json({ error: 'Email already registered' }, 409);
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user
  const [user] = await db.insert(users).values({
    email,
    password: hashedPassword,
  }).returning({ id: users.id, email: users.email });

  return c.json({ user }, 201);
});

export default auth;
```

Test it:
```
curl -X POST http://localhost:8000/api/auth/register -H "Content-Type: application/json" -d "{\"email\": \"allan@test.com\", \"password\": \"test123\"}"
*/ 
