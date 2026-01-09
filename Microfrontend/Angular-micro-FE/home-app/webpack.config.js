const ModuleFedrationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    output: {
        publicPath: 'http://localhost:4201/',
        uniqueName: "home"
    },
    Plugins: [
        new ModuleFedrationPlugin({
            name: 'home',
            filename: 'remoteEntry.js',
            exposes: {
                './HomeApp' : './src/app/app.module.ts',
            },
            // shared: {
            //     "@angular/core": { singleton: true, strictVersion: true },
            //     "@angular/common": { singleton: true, strictVersion: true },
            //     "@angular/router": { singleton: true, strictVersion: true },
            // }
        })
    ]
}