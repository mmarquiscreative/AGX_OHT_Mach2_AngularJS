angular.module('formApp').controller('SpeechTest', ['$scope', 'resultsObj', 'answerStrings', function($scope, resultsObj, answerStrings){
    
    ///////////////////////////////////
    //////////// Variables ////////////
    
    var speech = this;
    
    // Pulls array of strings from global namespace
    speech.answerStrings = answerStrings;
    
    // Are the answer buttons disabled?
    speech.ansDisabled = true;
    
    // Is the start test button disabled?
    speech.startTestDisabled = false;
    
    // Current Round counter
    speech.curRound = 0;
    
    // Holding array for answers input via buttons
    speech.answerInput = [];
    
    // Key to compare answerInput against to test for true/false
    speech.answerKey = ['Bean', 'Chalk', 'Goose'];
    
    // What answers were wrong (strings)
    speech.wrongAns = [];
    
    speech.testFunction = function(){
        console.log('Test function run');
    };
    
    
    ///////////////////////////////////
    //////////// Functions ////////////
    
    // Pushes an answer to the answerInput array
    speech.addAnswer = function(someAns){
        
        // Add new answer if round isn't over
        if(speech.answerInput.length < 2){
            speech.answerInput.push(someAns);
        } else {
            
            // 1. if round is over push answer then eval
            speech.answerInput.push(someAns);
            
            // 2. compare answers to key
            evalAnswers();
            
            // 3. reset answerInput array
            speech.answerInput = [];
            
            // 4. Play next round audio/gen answers ect
            speech.roundAudio();
        };
    
    }
    
    function resetAns(){
        speech.ansDisabled = false;
    }
    
    // Compare input answers to answer key
    function evalAnswers(){
        for(i = 0; i < 4; i++){
            
            // if answerInput doesn't match answerKey
            if(speech.answerInput[i] !== speech.answerKey[i]){
                
                // add wrong answer string to wrongAns array
                speech.wrongAns.push(speech.answerKey[i]);
            };
        };
        console.log(speech.wrongAns);
    };
    
    // play new round audio/gen new round answers
    speech.roundAudio = function(){
        
        // establish how many rounds here
        if(speech.curRound < 4){
            
            // 1. add one to curRound counter
            speech.curRound++;
            
            // 2. disable answer input
            speech.ansDisabled = true;
            
            // 3. disable start test button
            speech.startTestDisabled = true;
            
            // 4. generate new round answers
            generateRoundAns();
            
            // 5. play corresponding audio for new round answers
            playRoundAudio();
            
        } else { 
            
            // 1. disable answer input
            speech.ansDisabled = true;
            
            // 2. Push number of wrong answers to global resultsObj object
            console.log('time for the next round');
            resultsObj.speechAns = speech.wrongAns.length;
            
        }
    };
    
    // generates three random answers from answerkey for new round
    function generateRoundAns(){
        var num1, num2, num3;
        
        // 1. Reset answerKey array
        speech.answerKey = [];
        
        
        // 2. Calculate 3 random numbers
        num1 = Math.round(Math.random()*8);
        num2 = Math.round(Math.random()*8);
        num3 = Math.round(Math.random()*8);
        
        // 2. Resolve/remove duplicates within the three numbers
        while (num1 === num2 || num2 === num3 || num1 === num3){
            num2 = Math.round(Math.random()*8);
            num3 = Math.round(Math.random()*8);
        };
        
        // 3. Push answers to answerStrings array
        // Uses random numbers above to pull random answers from answerKey
        speech.answerKey.push(speech.answerStrings[num1]);
        speech.answerKey.push(speech.answerStrings[num2]);
        speech.answerKey.push(speech.answerStrings[num3]);
     };
  
    // Play the audio files that match the answers generated
    function playRoundAudio(){
       var tempAudio, delayTime;
        
        // initialize empty array
        tempAudio = [];
        
        // set delay between audio files playing
        delayTime = 1200;
        
        for(i=0; i < 3; i++){
            
            // Push file paths to audio file which corresponds to the round answers
             tempAudio.push(new Audio('/sounds/Speech_' +  speech.answerKey[i] + '.mp3'));
        };
            
            // play first audio
        tempAudio[0].play();
        
        // play next audio from within setTimeout to delay
        setTimeout(function(){
            
            tempAudio[1].play();
            
            // play third audio from within setTimeout
            setTimeout(function(){
                tempAudio[2].play();

                // after delay, enable answer button input
                setTimeout(function(){

                    // enable answer button input
                    $scope.$apply(resetAns());
                    console.log(speech.ansDisabled);
                }, delayTime);
            }, delayTime)
        }, delayTime);
           
     };  
    
}]);
