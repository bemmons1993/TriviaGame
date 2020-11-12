$(document).ready(function(){
  
    
    $("#timeremaining").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 10,
    timerOn: false,
    timerId : '',
    
    questions: {
      Question1: "What is Stan's father's occupation?",
      Question2: "What is Scott Tenorman's favorite band?",
      Question3: "Kyle's family follows which religion?",
      Question4: "What is Cartman's first name?",
      Question5: "Which condiment should be kept away from embalming fluid?",
    },
    options: {
      Question1: ['geologist', 'teacher', 'stripper', 'hypeman'],
      Question2: ['Pantera', 'Maroon 5', 'Radiohead', 'Billie Eilish'],
      Question3: ['Christianity', 'Judaism', 'Islam', 'Rastafari'],
      Question4: ['Oliver', 'Tyrone', 'Eric', 'Muhammed'],
      Question5: ['ketchup','Worcestershire sauce','honey mustard','sriracha'],
    },
    answers: {
      Question1: 'geologist',
      Question2: 'Radiohead',
      Question3: 'Judaism',
      Question4: 'Eric',
      Question5: 'Worcestershire sauce',
    },
    
    startGame: function(){
      
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      $('#game').show();
      
      $('#results').html('');
      
      $('#timer').text(trivia.timer);
      
      $('#start').hide();
  
      $('#timeremaining').show();
      
      trivia.nextQuestion();
      
    },
    
    nextQuestion : function(){
      
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    timerRunning : function(){
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h2>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        $('#results')
          .html('<h2>Thanks for playing</h2>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Run it back!</p>');
        
        $('#game').hide();
        
        $('#start').show();
      }
      
    },
    guessChecker : function() {
      
      var resultId;
      
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h2>Correct Answer!</h2>');
      }
      
      else{
        
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h2>Wrong answer! '+ currentAnswer +'</h2>');
      }
      
    },
    guessResult : function(){
      
      trivia.currentSet++;
      
      $('.option').remove();
      $('#results h2').remove();
      
      trivia.nextQuestion();
       
    }
  
  }