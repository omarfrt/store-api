module.exports = {
    apps: [{
      name: 'store-api',
      script: 'server.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ubuntu@ec2-52-14-247-220.us-east-2.compute.amazonaws.com',
        key: 'C:/Users/adam/Desktop/bookstore.pem',
        ref: 'origin/master',
        repo: 'git@github.com:omarfrt/store-api.git',
        path: '/home/ubuntu/server/store-api',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }