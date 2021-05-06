const path = require('path');
const express = require('express');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const { Hotel } = require('./api/model/hotel');
const api = require('./routes/api');
const { Resource, Database } = require('admin-bro-typeorm');
const db = require('./api/common/db');
const app = express();

module.exports.create = db.connect().then(() => {
    
    AdminBro.registerAdapter({Database, Resource});

    const adminBroOptions = {
        rootPath: "/admin",
        databases: [],
        resources: [
            { resource: Hotel, options: {} },
        ],
    }
    
    const adminBro = new AdminBro(adminBroOptions);
    
    app.use(express.static(path.resolve(__dirname, './app/build')));
    
    app.use('/api', api);
    app.use(adminBro.options.rootPath, AdminBroExpress.buildRouter(adminBro));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, './app/build', 'index.html'));
    });

    return app;
});