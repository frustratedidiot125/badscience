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

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = undefined;

var SKILL_NAME = "";
var GET_FACT_MESSAGE = "Mark Twain once said.  ";
var HELP_MESSAGE = "  You can say give me another quote, or, say stop to exit.";
var HELP_REPROMPT = "You can say, give me another quote, or stop to exit.";
var STOP_MESSAGE = "Goodbye!";

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
var data = [
    "Whenever you find yourself on the side of the majority, it is time to pause and reflect.", // He was a good friend to many, but not me.",
    "If you tell the truth, you don't have to remember anything.",
    "Don't go around saying the world owes you a living. The world owes you nothing. It was here first.",
    "I have never let my schooling interfere with my education.",
    "Get your facts first, and then you can distort them as much as you please.",
    "Reader, suppose you were an idiot. And suppose you were a member of Congress. But I repeat myself.",
    "Always do right. This will gratify some people and astonish the rest.",
    "The man who does not read good books has no advantage over the man who cannot read them.",
    "Clothes make the man. Naked people have little or no influence on society.",
    "Truth is stranger than fiction, but it is because Fiction is obliged to stick to possibilities; Truth isn't.",
    "Kindness is the language which the deaf can hear and the blind can see.",
    "Travel is fatal to prejudice, bigotry, and narrow-mindedness.",
    "Courage is resistance to fear, mastery of fear - not absence of fear. ",
    "The report of my death was an exaggeration.",
    "It's not the size of the dog in the fight, it's the size of the fight in the dog."
    "Be careful about reading health books. You may die of a misprint.",
    "It is better to keep your mouth closed and let people think you are a fool than to open it and remove all doubt.",
    "Keep away from people who try to belittle your ambitions. Small people always do that, but the really great make you feel that you, too, can become great.",
    "Age is an issue of mind over matter. If you don't mind, it doesn't matter.",
    "There are three kinds of lies: lies, damned lies, and statistics.",
    "You can't depend on your eyes when your imagination is out of focus.",
    "The secret of getting ahead is getting started.",
    "Life would be infinitely happier if we could only be born at the age of eighty and gradually approach eighteen.",
    "The average American may not know who his grandfather was. But the American was, however, one degree better off than the average Frenchman who, as a rule, was in considerable doubt as to who his father was.",
    "There has been only one Christian. They caught him and crucified him. Early.",
    "Total abstinence is so excellent a thing that it cannot be carried to too great an extent. In my passion for it I even carry it so far as to totally abstain from total abstinence itself.",
    "Concerning the difference between man and the jackass: some observers hold that there isn’t any. But this wrongs the jackass.",
    "Heaven goes by favor. If it went by merit, you would stay out and your dog would go in.",
    "I am quite sure now that often, very often, in matters concerning religion and politics a man’s reasoning powers are not above the monkey’s.",
    "I would rather have my ignorance than another man’s knowledge, because I have so much more of it.",
    "In the first place God made idiots. This was for practice. Then He made school boards.",
    "Let us endeavor so to live that when we come to die even the undertaker will be sorry.",
    "Patriot: the person who can holler the loudest without knowing what he is hollering about.",
    "It is by the goodness of God that in our country we have those three unspeakably precious things: freedom of speech, freedom of conscience, and the prudence never to practice either.",
    "To be good is noble; but to show others how to be good is nobler and no trouble."
   

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
    response.say(GET_FACT_MESSAGE + randomFact()+HELP_MESSAGE).reprompt(HELP_REPROMPT).shouldEndSession(false);
});

alexaApp.intent("GetNewQuoteIntent", {
  "slots": {},
                  "utterances": [
      "a quote", "tell me a quote", "tell me another quote", "give me a quote", "give me another quote", "tell me a mark twain quote", "what would mark twain say", "drop some knowledge","tell me some trivia", "tell me something new","enlighten me", "enlighten us","give me another", "give me another quote", "can i have another","give us another","tell me another"
    ]
  },
                function (request, response){
  response.say(GET_FACT_MESSAGE + randomFact() + HELP_MESSAGE).reprompt(HELP_REPROMPT).shouldEndSession(false)});

    
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
    response.say("Cancelling. Goodbye!").shouldEndSession(true);
  }
 );

app.listen(PORT, () => console.log("Listening on port " + PORT + "."));
