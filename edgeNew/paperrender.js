
let answers = new Array();

/**
 * 
 * @param content 
 * {
    "code": "200",
    "data": [{}],
    "time": "1689924596",
    "encrypt": "bz7SksejUQ3v7dJTaGWBiR=="
}
 */
function renderPaper(content) {
    let _paper = document.getElementById("paper");
    _paper.innerHTML = '';
    
    const paperContent = JSON.parse(content);
    paperContent.data.forEach(renderSubject);

    renderAnswer();
}

function renderAnswer() {
    let _answer = document.getElementById("answer");
    _answer.innerHTML = '';

    answers.forEach(element => {
        const _item = document.createElement("li");
        _item.innerText = element.answer;
        _answer.appendChild(_item);
    });
}

/**
 * 
 * @param subject 
 * {
     "id": "460683024",
     "uid": "4152629",
     "paperid": "5752805",
     "chapter": "15996812",
     "difficulty": "1",
     "difficulty_score": "0.00",
     "parentid": "0",
     "path": "",
     "ptype": "4",
     "question": "What quality process should be done first in order to measure information quality?",
     "qtype": "1",
     "type_name": "",
     "number": "0",
     "options": "[{\"Key\":\"A\",\"Value\":\"<p>Re-engineer data <\\/p>\"},{\"Key\":\"B\",\"Value\":\"<p>Cleanse data <\\/p>\"},{\"Key\":\"C\",\"Value\":\"<p>Assess data definitions <\\/p>\"},{\"Key\":\"D\",\"Value\":\"<p>Measure information costs <\\/p>\"},{\"Key\":\"E\",\"Value\":\"<p>database security <\\/p>\"}]",
     "answer": "C",
     "analysis": "",
     "hash": "551110b5bc49b802cad1f2cbebd19ee3cf319882",
     "question_context_id": "",
     "question_images": "",
     "answer_images": "",
     "extra": "{\"ordered\":\"0\",\"case_sensitive\":\"0\"}",
     "status": "0",
     "is_show": "1",
     "editor": "",
     "created_at": "2022-05-04 21:14:06",
     "updated_at": "2022-05-04 21:14:06",
     "note": "",
     "note_id": "0",
     "self_analysis": "",
     "all_right": "75",
     "all_wrong": "34",
     "all_accuracy": "0.6880"
  }
 */
function renderSubject(subject) {
    let _paper = document.getElementById("paper");

    const { id, question, options, answer } = subject;
    const _subject = document.createElement("dt");
    _subject.className = "subject";
    _subject.innerHTML = question;
    _paper.appendChild(_subject);

    const _options = document.createElement("ol");
    _options.className = "options"
    _options.type = "A";
    _subject.appendChild(_options);

    const items = JSON.parse(options);
    items.forEach(element => {
        const _item = document.createElement("li");
        _item.innerHTML = element.Value;
        _options.appendChild(_item);
    });

    answers.push({ id, answer });
}