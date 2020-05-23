module.exports = {
  apps : [{
    name: 'TOORNEY-SITE',
    script: 'node .',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '167.99.48.4',
      ref  : 'origin/master',
      repo : 'git@github.com:Mart100/Toorney-website.git',
      path : './',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
