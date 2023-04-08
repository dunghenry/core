require('dotenv').config();
process.env.UV_THREADPOOL_SIZE = 5;
const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
const start = Date.now();
function createRequest() {
    https
        .request('https://google.com', (res) => {
            res.on('data', () => {});
            res.on('end', () => {
                console.log('Request:', Date.now() - start);
            });
        })
        .end();
}
function hashData() {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log('Hash:', Date.now() - start);
    });
}

fs.readFile('./index.js', 'utf8', () => {
    console.log('fs:', Date.now() - start);
});

createRequest();
hashData();
hashData();
hashData();
hashData();

//Modules use Worker Pool:
//Default Thread Pool = 4
//!1 I/O-intensive
// DNS: dns.lookup(), dns.lookupService().
// File System: All file system APIs except fs.FSWatcher() and those that are explicitly synchronous use libuv's threadpool.
//2 CPU-intensive
// Crypto: crypto.pbkdf2(), crypto.scrypt(), crypto.randomBytes(), crypto.randomFill(), crypto.generateKeyPair().
// Zlib: All zlib APIs except those that are explicitly synchronous use libuv's threadpool.
