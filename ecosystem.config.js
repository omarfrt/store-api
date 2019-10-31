module.exports = {
    apps: [{
      name: 'store-api',
      script: 'server.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-3-17-186-120.us-east-2.compute.amazonaws.com',
        key: 'C:/Users/adam/Desktop/bookstore.pem',
        ref: 'origin/master',
        repo: 'git@github.com:omarfrt/store-api.git',
        path: '/home/ubuntu/server/store-api',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }