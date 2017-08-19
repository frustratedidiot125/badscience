var express = require("express");
var alexa = require("alexa-app");

var PORT = process.env.PORT || 8080;
var app = express();

// ALWAYS setup the alexa app and attach it to express before anything else.
var alexaApp = new alexa.app("test");

alexaApp.express({
  expressApp: app,
  //router: express.Router(),

  // verifies requests come from amazon alexa. Must be enabled for production.
  // You can disable this if you're running a dev environment and want to POST
  // things to test behavior. enabled by default.
  checkCert: true,

  // sets up a GET route when set to true. This is handy for testing in
  // development, but not recommended for production. disabled by default
  debug: false
});

// now POST calls to /test in express will be handled by the app.request() function

// from here on you can setup any other express routes or middlewares as normal
app.set("view engine", "ejs");

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================


//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = undefined;

var SKILL_NAME = "";
var GET_FACT_MESSAGE = "Yogi Berra once said.  ";
var HELP_MESSAGE = "  You can say give a quote, or, say stop at any time to exit.";
var HELP_REPROMPT = "You can say, give me a quote, or stop to exit.";
var STOP_MESSAGE = "Goodbye!";

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
var data = [
    "When you come to a fork in the road, take it.", // 
  "You can observe a lot by just watching.",
  "It ain’t over till it’s over.",
  "It’s like déjà vu all over again.",
  "No one goes there nowadays, it’s too crowded.",
  "Baseball is 90% mental and the other half is physical.",
  "Always go to other people’s funerals, otherwise they won’t come to yours.",
  "A nickel ain’t worth a dime anymore.",
  "We made too many wrong mistakes.",
  "Congratulations. I knew the record would stand until it was broken.",
  "You better cut the pizza in four pieces because I’m not hungry enough to eat six.",
  "You wouldn’t have won if we’d beaten you.",
  "I usually take a two-hour nap from one to four.",
  "Never answer an anonymous letter.",
  "Slump? I ain’t in no slump. I just ain’t hitting.",
  "How can you think and hit at the same time?",
  "The future ain’t what it used to be.",
  "I tell the kids, somebody’s gotta win, somebody’s gotta lose. Just don’t fight about it. Just try to get better.",
  "It gets late early out here.",
  "If the people don’t want to come out to the ballpark, nobody’s going to stop them.",
  "We have deep depth.",
  "Pair up in threes.",
  "Why buy good luggage, you only use it when you travel.",
  "You’ve got to be very careful if you don’t know where you are going, because you might not get there.",
  "All pitchers are liars or crybabies.",
  "Even Napoleon had his Watergate.",
  "Bill Dickey is learning me his experience.",
  "He hits from both sides of the plate. He’s amphibious.",
  "It was impossible to get a conversation going, everybody was talking too much.",
  "I can see how he won twenty-five games. What I don’t understand is how he lost five.",
  
  
    "
];

var randomFact = function () {
  var factArr = data;
  var factIndex = Math.floor(Math.random() * factArr.length);
  var nextFact = factArr[factIndex];
  return nextFact;
  };


//=========================================================================================================================================
//Editing anything below this line might break your skill.--  NVM just broke it.
//=========================================================================================================================================
// exports.handler = function(event, context, callback) {
 //   var alexa = Alexa.handler(event, context);
  //  alexa.APP_ID = APP_ID;
   // alexa.registerHandlers(handlers);
   // alexa.execute();
// };
// var handlers = {
   // 'LaunchRequest': function () {
     //   this.emit('GetNewFactIntent');
  //  },




alexaApp.launch(function(request, response) {
//var factArrA = data;
// var factIndexA = Math.floor(Math.random() * factArrA.length);
// var randomFactA = factArrA[factIndexA];
    response.say(GET_FACT_MESSAGE + randomFact()).reprompt(HELP_REPROMPT).shouldEndSession(true);
});

alexaApp.intent("GetNewQuoteIntent", {
  "slots": {},
                  "utterances": [
      "a quote", "tell me a quote", "tell me another quote", "give me a quote", "give me another quote", "tell me a mark twain quote", "what would mark twain say", "drop some knowledge", "tell me some trivia", "tell me something new", "enlighten me", "enlighten us", "give me another", "give me another quote", "can i have another", "give us another", "tell me another", "tell us another"
    ]
  },
                function (request, response){
  response.say(GET_FACT_MESSAGE + randomFact()).reprompt(HELP_REPROMPT).shouldEndSession(true)});

    
   // 'GetNewFactIntent': function () {
     //   var factArr = data;
      //  var factIndex = Math.floor(Math.random() * factArr.length);
     //   var randomFact = factArr[factIndex];
    //    var speechOutput = GET_FACT_MESSAGE + randomFact;
     //   this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
//    },

alexaApp.intent("AMAZON.HelpIntent", {
  "slots": {} },
//"utterances": [ 
 //              "help", "help me"
  //              ]
//  },
  function(request, response) {
    response.say(HELP_MESSAGE).reprompt(HELP_REPROMPT).shouldEndSession(false);
  }
 );


 //   'AMAZON.HelpIntent': function () {
 //       var speechOutput = HELP_MESSAGE;
  //      var reprompt = HELP_REPROMPT;
  //      this.emit(':ask', speechOutput, reprompt);
  //  },
  //  'AMAZON.CancelIntent': function () {
    //    this.emit(':tell', STOP_MESSAGE);
 //   },
  //  'AMAZON.StopIntent': function () {
   //     this.emit(':tell', STOP_MESSAGE);
 //   }
// };


alexaApp.intent("AMAZON.StopIntent", {
  "slots": {} },
//"utterances": [ 
 //              "help", "help me"
  //              ]
//  },
  function(request, response) {
    response.say("Ok, Goodbye!").shouldEndSession(true);
  }
 );

alexaApp.intent("AMAZON.CancelIntent", {
  "slots": {} },
//"utterances": [ 
 //              "help", "help me"
  //              ]
//  },
  function(request, response) {
    response.say("Goodbye!").shouldEndSession(true);
  }
 );

app.listen(PORT, () => console.log("Listening on port " + PORT + "."));
