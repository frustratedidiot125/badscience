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


var HELP_MESSAGE = "If you'd like to hear any old science joke,  You can say give me a joke. To hear a physics joke, say, tell me a physics joke. The same goes for chemistry and astrophysics.  If I stop being funny, or you'd like me to leave, feel free to say stop to exit at any time.";
var HELP_REPROMPT = "You can say, give me a joke, or stop to exit.";
var rprompt = "you can say, give me another for the same type of joke, 
var STOP_MESSAGE = "Goodbye!";

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
var chem = [
    "I would make a chemistry pun but it’d be easily miscible.", // 
  "The optimist sees the glass half full. The pessimist sees the glass half empty. The chemist sees the glass completely full, half with liquid and half with air.",
  "If you're not part of the solution, you're part of the precipitate.",

  "Organic chemistry is difficult. Those who study it have alkynes of trouble.",

  "When asked if she knew any jokes about sodium? The chemist replied, nah.",
  "Two chemists go into a bar. The first one says, I think I'll have an H2O. The second one says, I think I'll have an H2O too. The second one died shortly thereafter.",
  
  "Never trust atoms. They make up everything!",
  "Carbon is a girl's best friend.",
  "I had to make these bad chemistry jokes because all the good ones Argon.",

  "The name's Bond. Ionic Bond. Taken, not shared.",
  "Chemists are great problem solvers. They have all the solutions.",



  
  "Outside his buckyball home, one molecule overheard another molecule saying, I'm positive that a free electron once stripped me of an electron after he lepton me. You gotta keep your ion them.",
  "Classified ad. Do you have mole problems? If so, call Avogadro at 602-1023.",
  "Definition hydrophobic. Fear of utility bills.",
  "A cation is defined as a positively charged kitten.",
  "a benzene ring with iron atoms replacing the carbon atoms is a ferrous wheel."

  
];
var phys = [
  "A photon checks into a hotel and is asked if he needs any help with his luggage. He says, No, I'm traveling light.",
   "Did you hear about the man who got cooled to absolute zero? He's 0K now.",
  "A fellow accidentally ingested some alpha-L-glucose and discovered that he had no ill effect. Apparently he was ambidextrose.",
  "Absolute zero is so cool!",
  "A neutron walked into a bar and asked, How much for a gin and tonic? The bartender replied, for you, no charge.",
  "Two atoms were walking across a road when one of them said, I think I lost an electron!  Are you sure? The other replied. Yes, I'm absolutely positive!",
  
  "entropy isn't what it used to be.",
  "Bad photons go to prisms.",
  "Heisenberg went for a drive and got stopped by a traffic cop. The cop asked, do you know how fast you were going? Heisenberg replied, No, but I know where I am.",
  "One night, a year after almost failing her high school physics class, a girl told her older brother, You know, my physics teacher was right about the optical Doppler effect. You see those cars? The lights of the ones approaching us are white, but the lights of the ones moving away from us are red.",
  "elementary particles are the dreams that stuff is made of.",
  "Seen on a product warning label. warning. Due to its heavy mass, this product warps the space surrounding it. No health hazards are yet known to be associated with effect. ",
  "Seen on a warning label. This product may actually be nine-dimensional but, if this is the case, functionality is not affected by the extra six dimensions. ",
  "Seen on a warning label. According to quantum theory, this product may collapse into another state if directly observed. ",
  "Nothing in the known universe travels faster than a bad check. ",
  "The speed of an IRS tax refund is constant. ",
  "Anger is neither created nor conserved but only changed from one form to another. "
  "Bodies in motion remain in motion, and bodies at rest stay in bed unless their mothers call them to get up."
  
  ]
 var bio = [
  " A couple of biologists had twins. They named one Jessica and the other Control.",
    "Biology is the only science in which multiplication is the same thing as division.",
    "you’re so hot you denature my proteins.",
   "The way to a man's stomach is through his esophagus.",
  "The Fastest way to determine the sex of a chromosome is to pull down its genes.",
  "A British biologist walks into a pub in London, and asks for a pint of adenosine triphosphate. The barman replies, That'll be 80p.",
 "The microbiologist who visited 30 different countries and spoke 6 languages? He was a man of many cultures.",
   "the English major defined microtome on his biology exam as An itsy bitsy book.",
   
   
   "the difference between a dog and a marine biologist? One wags a tail and the other tags a whale. "
   
   ];
   
var astro = [
     "It is reported that Copernicus's parents said the following to him at the age of twelve. Copernicus, young man, when are you going to come to terms with the fact that the world does not revolve around you?" 
  "black holes are what you get in black socks.",
  "An astrophysicist who lived in New York City once said, Whatever the missing mass of the universe is, I hope it's not in cockroaches.",
  "My professor says that black holes are interesting, but I think they suck.",
  "Murphy's Law for string theorists. anything in string theory that theoretically can go wrong will go wrong, but if nothing does go theoretically wrong, then experimentally it is ruled out.",
  "Star light, star bright, first star I see tonight. I wish I may, I wish I might. Oh, crap, it's just a satellite."
   
]

// var rastro = function (){
  
// var randomFact = function () {
  
 // return nextFact;
 // };

  var data = chem.concat(phys, bio, astro);

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

    response.say(HELP_MESSAGE).reprompt(HELP_REPROMPT).shouldEndSession(false);
});

alexaApp.intent("NewSciJoke", {
  "slots": {"Typeofjoke": "Fieldofstudy" },
                  "utterances": [
      "a quote", "tell me a quote", "tell me another quote", "give me a quote", "give me another quote", "tell me a mark twain quote", "what would mark twain say", "drop some knowledge", "tell me some trivia", "tell me something new", "enlighten me", "enlighten us", "give me another", "give me another quote", "can i have another", "give us another", "tell me another", "tell us another"
    ]
  },
                //indont know any _slota- jokes, so i'm just going to tell you a random one
                function (request, response){
 
  var field = req.slot("Typeofjoke");
  var prevfield = +req.session('type');
  if (field != "physics" && field != "biology" && field != "astrophysics" && field && field != "??"){ //im sorry, i dont know any jokes in $field. why don't you try again?  
  if (!field || field == "??"){
    if (prevfield){ //spin previous field as commanded by 'another' ...or assign prevfield to field? no..if field == "another" AND prevfield has one ofnthe three, then run that type? else random?? but random a certain way?
    
    
  if (field == "chemistry"){
  } else if (field == "physics"){
  } else if (field == "biology"){
  } else if (field == "astrophysics"){
    else if (!field 
  
  var factArr = data;
  var factIndex = Math.floor(Math.random() * factArr.length);
  var randomFact = factArr[factIndex];
  response.say(randomFact.reprompt(HELP_REPROMPT).shouldEndSession(false)});
  res.session('type', 'random');

    
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
