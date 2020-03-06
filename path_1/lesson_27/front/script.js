const publish = document.getElementById('publish');
const messages = document.getElementById('messages');

publish.onsubmit = (e) => {
  e.preventDefault();
  const input = publish.getElementsByTagName('input')[0];
  fetch('http://localhost:1337/publish', {
    method: 'POST',
    body: JSON.stringify({message: input.value}),
  });
  input.value = '';
  return false;
}

const subscribe = () => {
  fetch('http://localhost:1337/subscribe')
    .then(r => r.text())
    .then(message => {
      console.log(message)
      const div = document.createElement('div');
      div.textContent = message;
      messages.appendChild(div);

      subscribe();
    })
};

subscribe();