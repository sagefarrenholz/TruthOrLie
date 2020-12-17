let correctQuestions = 0;
let questions = [];
let iter = 0;
let confetti;

requestQuestions();

function hasTouch() {
    return 'ontouchstart' in document.documentElement
           || navigator.maxTouchPoints > 0
           || navigator.msMaxTouchPoints > 0;
  }
  
  if (hasTouch()) { // remove all the :hover stylesheets
    try { // prevent exception on browsers not supporting DOM styleSheets properly
      for (var si in document.styleSheets) {
        var styleSheet = document.styleSheets[si];
        if (!styleSheet.rules) continue;
  
        for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
          if (!styleSheet.rules[ri].selectorText) continue;
  
          if (styleSheet.rules[ri].selectorText.match(':hover')) {
            styleSheet.deleteRule(ri);
          }
        }
      }
    } catch (ex) {}
  }

document.addEventListener('keydown', function(event) {
    if(event.code === "End") {
      correctQuestions = 20;
      endScreen(); 
    } else if (event.code === "Pause") {
      correctQuestions = 0;
      endScreen(); 
    }
});

function guess(falsity){
    if (questions[iter-1].isTrue === falsity) {
        correctQuestions++;
    }    
};

function questionGen(num, text, isTrue){
    let questionHTML = `
    <div id="question-${num}" class="question">
        <h3 class="question-text">${text}</h3>
        <div class="button --truth" onclick="guess(true, ${num}) type="button" class="truth-button>Truth</button>
        <div class="button --lie" onclick="guess(false, ${num})" type="button" class="lie-button>Lie</button>
    </div>`;
    return questionHTML;
}

function requestQuestions() {
  $.get('/api/questions', (data, status) => {
      if (status == 'success') questions = data['questions'];
      else console.error(`Could not retrieve questions, get status: ${status}.`);
  }, "json"); 
}

function updateQuestions() {
  $(".central-box").removeClass("fade-in");
  $(".button").css("display","hidden");
  $(".button-hover").removeClass("button-hover");
  $("#title").text((iter + 1)+".");
  $('#description').text(questions[iter]['text']);
  $('#lie-button').css("display", "block");
  $('#lie-text').text('Lie');
  $('#truth-text').text('Truth');

  setTimeout(() => {$(".button-hover").addClass("button-hover")}, 2);
  setTimeout(() => {$(".button").css("display","block");}, 1);
  setTimeout(() => {$(".central-box").addClass("fade-in")}, 3);
}

function endScreen(){
  if (correctQuestions >= 12){
    // win!
    $(".central-box").removeClass("fade-in");
    $("#lie-button").css("display","none");
    $(".button-hover").removeClass("button-hover");
    $("#title").text("Congratulations.");
    $('#truth-text').text('View Prize!');
    $('#truth-button').css("display", "block");
    $('#truth-button').attr("onclick",'loadPrize()');
    setTimeout(() => {$(".button-hover").addClass("button-hover")}, 2);
    setTimeout(() => {$(".central-box").addClass("fade-in")}, 3);
    confettiSettings = { target: 'confetti', max: 200};
    confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
  } else {
    // lose
    $("#description").text("You got " + correctQuestions + " right");
    $(".central-box").removeClass("fade-in");
    $("#truth-button").css("display","none");
    $(".button-hover").removeClass("button-hover");
    $("#title").text("Whoops...");
    $('#lie-text').text('Try Again');
    $('#lie-button').css("display", "block");
    $('#lie-button').attr("onclick","location.reload()");
    setTimeout(() => {$(".button-hover").addClass("button-hover")}, 2);
    setTimeout(() => {$(".central-box").addClass("fade-in")}, 3);
    confetti.clear();
  }
  $("#description").text("You got " + correctQuestions + " right");
}

function nextQuestion(falsity){
  if (iter > 0) guess(falsity);
  if (iter == questions.length) endScreen();
  else {
      updateQuestions();
      iter++;
  }
}

function loadPrize() {
  $(".central-box").removeClass("fade-in");
  $(".button-hover").removeClass("button-hover");
  $("#title").text("You Win a Leia Hoodie!");
  $("#lie-button").css("display","none");
  $('#truth-button').css("display", "none");
  $('#description').text('');
  $("#prize").css("display","flex");
  setTimeout(() => {$(".button-hover").addClass("button-hover")}, 2);
  setTimeout(() => {$(".central-box").addClass("fade-in")}, 3);
}
