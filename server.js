const path = require('path');
const express = require('express');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const { Hotel } = require('./api/model/hotel');
const { Theme } = require('./api/model/theme');
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
            { 
                resource: Hotel, 
                options: { 
                    properties: {
                        theme: {
                            components: {
                                list: AdminBro.bundle('./admin/components/hotel-theme-in-list'),
                                show: AdminBro.bundle('./admin/components/hotel-theme-show')
                            }
                        }
                    }
                } 
            },
            { 
                resource: Theme, 
                options: {
                    properties: {
                        primaryBackgroundColor: {
                            components: {
                                edit: AdminBro.bundle('./admin/components/theme-color-edit')
                            }
                        },
                        primaryTextColor: {
                            components: {
                                edit: AdminBro.bundle('./admin/components/theme-color-edit')
                            }
                        }
                    }
                } 
            },
        ],
    }
    
    const adminBro = new AdminBro(adminBroOptions);

    app.use(function(request, response, next) {

        if (process.env.NODE_ENV != 'dev' && !request.secure) {
           return response.redirect("https://" + request.headers.host + request.url);
        }
    
        next();
    })
    
    app.use(express.static(path.resolve(__dirname, './app/build')));
    
    app.use('/api', api);
    app.use(adminBro.options.rootPath, AdminBroExpress.buildRouter(adminBro));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, './app/build', 'index.html'));
    });

    return app;
});