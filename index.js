//> Imports
const { spawn } = require('child_process');
const fs = require('fs');

//> Code
const launch = function () {
  const bot = spawn('node', ['./bot.js']);
  bot.stdout.pipe(process.stdout);
  bot.stderr.pipe(process.stdout)
  enable(bot);
  let time = new Date().toJSON();
  time = time.replace(/[^0-9a-zA-Z ]/g, "");
  var access = fs.createWriteStream('./data/logs/bot-'+String(time)+'.log');
  // log all console output to file
  bot.stdout.pipe(access);
}

const enable = function (bot) {
  bot.on('close', code => {
    if (code == 1) {
      console.log('Bot crashed with code: ' + code);
      launch();
    } else if (code == 2) {
      launch();
    }
  })
}

launch();