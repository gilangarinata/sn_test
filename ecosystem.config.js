module.exports = {
  apps : [{
    script: 'npm start',
  }],
  deploy : {
    production : {
      user : 'root',
      host : '193.203.163.79',
      ref  : 'origin/new_update',
      repo : 'https://github.com/gilangarinata/sn_test.git',
      path : '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install --force && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
