let correctQuestions = 0;

requestQuestions();

let questions = [];

function guess(isTrue, num){
    if (questions[num] == isTrue) {

    }    
};

function questionGen(num, text, isTrue){
    let questionHTML = `
    <div id="question-${num}" class="question">
        <h3 class="question-text">${text}</h3>
        <button onclick="guess(true, ${num}) type="button" class="truth-button>Truth</button>
        <button onclick="guess(false, ${num})" type="button" class="lie-button>Lie</button>
    </div>`;
    return questionHTML;
}

function updateQuestions(response){
    //let obj = JSON.parse(questions);
    let i = 0;
    for (const q of response['questions']) {
        questions.push(q);
        $('.questions').append(questionGen(i, q['text'], q['isTrue']));        
        i++;
    }
} 

function requestQuestions() {
    $.get('questions', (data, status) => {
        if (status == 200) updateQuestions(data);
        else console.error(`Could not retrieve questions, get status: ${status}.`);
    }, "json");
}