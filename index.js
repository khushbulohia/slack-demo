'use strict';

let SlackBot = require('slack-quick-bots');
let handlebars = require('handlebars');
let fs = require('fs');
let sampleTemplate = fs.readFileSync('./samples.hbs', 'utf8');

var config = {
  bots: [{
  botCommand: {
    'traffic': {
      commandType: 'RECURSIVE',

      template: function() {
        return handlebars.compile({sampleTemplate});
      },
      data: function(command, param, callback) {
        console.log('command:'+command)
        console.log('param:'+param)

        callback({data: 'data fetched from service'});
      }
    },
    'error': {
      commandType: 'RECURSIVE',
      lowerLimit: 1,
      upperLimit: 5,
      timeUnit: 'm',
      defaultParamValue: 5,
      template: function() {
        return handlebars.compile(sampleTemplate);
      },
      data: function(command, param, callback) {
        callback({data: 'data fetched from service'});
      }
    }
  },
  botToken: 'xoxb-36143176470-BQ83QdyQoXV6JtLFpga3Csa7'
  }]
}

var slackBot = new SlackBot(config);
slackBot.start();
