function submitThing() {
    let question = {};
    question['text'] = document.getElementById("text").value;
    question['isTrue'] = document.getElementById("isTrue").checked;
    question['password'] = document.getElementById("password").value;
    $('#textOut').html(JSON.stringify(question));

    $.ajax({
        url: 'api/submitquestion',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(question),
    });
}