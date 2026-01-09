const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    output: {
        publicPath: "http://localhost:4200/",
        uniqueName: "container"
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                home: 'home@http://localhost:4201/remoteEntry.js'
            },
            // shared: {
            //     "@angular/core": { singleton: true, strictVersion: true },
            //     "@angular/common": { singleton: true, strictVersion: true },
            //     "@angular/router": { singleton: true, strictVersion: true },
            // }
        })
    ]
}