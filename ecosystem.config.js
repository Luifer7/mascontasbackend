module.exports = {
  apps: [
    {
      name: 'MyAPI',
      script: 'dist/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
// "stop": "pm2 stop ecosystem.config.js --env production", pm2 start ecosystem.config.js --env production
