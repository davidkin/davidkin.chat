/* eslint linebreak-style: ['error', 'windows'] */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint no-restricted-globals: ["error", "event", "fdescribe"]*/

jQuery(document).ready(() => {
  const targetOrg = '*';

  let iframeCount = $('#label-msg').text();
  iframeCount = iframeCount.slice(1, iframeCount.length - 2);
  parent.postMessage(`[system]: ${iframeCount} joined the conversation`, targetOrg);

  $('#main-form').on('submit', (e) => {
    const name = document.querySelector('#label-msg').innerHTML;
    let message = document.querySelector('#input-msg').value;

    if (message === '') {
      message = '<span>Glad to see you <strong class=\'attation\'>(please write the message &#9786;)</strong></span>';
    }

    parent.postMessage(`${name} ${message}`, targetOrg);

    document.getElementById('main-form').reset();

    e.preventDefault();
  });

  window.addEventListener('message', (e) => {
    const index = e.data.indexOf(':');
    const frameName = e.data.slice(0, index);
    const message = e.data.slice(index + 1);

    const newComment = $(`<li class='iframe-body__item'><strong>${frameName} - </strong> ${message} </li>`);
    $('#message-list').append(newComment);
  });

  window.addEventListener('click', () => {
    $('#input-msg').focus();
  });
});

