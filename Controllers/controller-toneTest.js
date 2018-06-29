angular.module('formApp').controller('toneTestController', ['$scope', 'resultsObj', '$state', function ($scope, resultsObj, $state) {
    var tone = this;


    // returns a boolean from resultsObj.toneCompleted 
    tone.testCompleted = resultsObj.testComplete('tone');

    // assigns audio html to a variable
    tone.toneAudio = document.querySelector('#toneAudio');

    // set volume of audio
    tone.toneAudio.volume = 0.5;

    // sets loop
    tone.toneAudio.loop = true;

    // establishes autoplay variable
    tone.toneAudio.autoplay = false;

    // disable y/n buttons if true
    tone.disabledBool = false;

    // hide y/n buttons if true
    tone.buttonHide_YN = false;

    // hide next button if true
    tone.buttonHide_Next = true;

    // array of frequency strings that match audio file names
    tone.frequencies = new Array('2000', '4000', '6000', '8000', '10000');

    // The html block with active-freq is styled as the active tone.
    // The active-freq will be pushed down the array,
    // and the corresponding html blocks will change to active style
    // depending on which index of the array contains 'active-freq'

    tone.curClass = new Array('active-freq', '', '', '', '');

    // a counter for which tone we're on
    tone.curTone = 0;

    // an reference object for the current audio filepath / updating it
    tone.curToneObj = {
        freq: '2000',
        srcPath: '/sounds/2000.mp3'
    }

    // starts audio if test has not already been completed
    if(!tone.testCompleted){
        tone.toneAudio.autoplay = true;
    }

    
    tone.nextTone = function(someBool){

        tone.curClass[tone.curTone] = '';

        if(!someBool){
            resultsObj.toneScore++
            resultsObj.toneAns.push(tone.frequencies[tone.curTone]);
        };

        tone.curTone++;

        if(tone.curTone < tone.frequencies.length){
            tone.curClass[tone.curTone] = 'active-freq';
            var newSrc = ('/sounds/' + tone.frequencies[tone.curTone] + '.mp3');
            tone.curToneObj.freq = tone.frequencies[tone.curTone];

            tone.curToneObj.srcPath = newSrc;

        } else if (tone.curTone >= tone.frequencies.length){
            tone.disabledBool = true;
            tone.toneAudio.autoplay = false;
            tone.buttonHide_YN = true;
            tone.buttonHide_Next = false;
            resultsObj.toneCompleted = true;
            $state.go('^.speechTest')
            console.log(resultsObj.toneAns);

        } else {
            console.log(("something went wrong with tone.nextTone. Here is someBool: " + someBool + "\n and here is tone.curTone: " + tone.curTone));
        }
    }

    tone.resetStage = function(){
        tone.toneAudio.play();

        setTimeout(function(){
            $scope.$apply(function(){
                tone.toneAudio.autoplay = true;
            });
        }, 1);
        resultsObj.toneScore = 0;
        resultsObj.toneAns = [];
        resultsObj.toneCompleted = false;
        tone.testCompleted = resultsObj.testComplete('tone');
    };


    ////////////////////////////

}])