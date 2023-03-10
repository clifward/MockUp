function fact(n) {
  let answer = 1;
  if (n == 0 || n == 1) {
    return answer;
  }
  for (var i = n; i >= 1; i--) {
    answer = answer * i;
  }
  return answer;
}

function applique(f, tab) {
  const res = new Array();
  for (let el of tab) {
    res.push(f(el))
  }
  return res
}

// console.log(fact(5));
// console.log(applique(fact, [1, 2, 3, 4]));
// console.log(applique(function(n) {
//     return (n + 1);
// }, [1, 2, 3, 4, 5, 6]));

const msgs = [
  { "msg": "Hello World" },
  { "msg": "Blah Blah" },
  { "msg": "I love cats" }
];

function formatMessages(msgs) {
  let res = ""
  for (let msg of msgs) {
    res += `<li><p>${msg.msg}</p></li>`
  }
  return res
}

// console.log(formatMessages(msgs))

function update(msgsArr) {
  document.getElementById('messages').innerHTML = (formatMessages(msgsArr));
}

// update(msgs);


document.getElementById('send').onclick = function(e) {
  const content = document.getElementById('newmessage').value
  if (content == "") {
    return;
  }
  document.getElementById('newmessage').value = "";
  fetch('https://messageboard.clifward1.repl.co/msg/post/' + btoa(content)).then(function(response) {
      return response.json();
    })
    .then(function(data) {
      refresh();
    });
}

function refresh() {
  fetch('https://messageboard.clifward1.repl.co/msg/getAll')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      update(data.map(msg => ({ "msg": msg })));
    });
}

refresh();

setInterval(function(){
   refresh();
}, 10000);
