/* eslint linebreak-style: ['error', 'windows'] */
/* eslint no-plusplus: 0 */

// ----------- Create iframe ----------- \\

class Frame {
  constructor(settings) {
    let {iframeNumber} = settings;
    const {targetOrg} = settings;

    const createFrame = () => {
      const block = $('<div class=\'main-body__iframe-block iframe-block\'>');
      const iframe = $('<iframe class="iframe-block__iframe iframe"></iframe>');
      const close = $(`<span class='iframe-block__title'>Window - ${iframeNumber}</span>`);

      block.append(iframe);
      block.append(close);
      $('.wrapper').append(block);

      $('.iframe')[$('.iframe').length - 1].srcdoc = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <link rel="stylesheet" href="style/normalize.css">
          <link rel="stylesheet" href="style/chat-Style.css">
          <title>Iframe Window</title>
        </head>

        <body id='iframe-body'>

          <ul class='iframe-body__message' id='message-list'></ul>
          <form id='main-form' class='iframe-body__form form'>
            <label for='input-msg' id='label-msg' class='form__label'>[Speaker${iframeNumber}]:</label>
            <input type='text' id='input-msg' class='form__message' placeholder='Your message'>
            <input type='submit' class='form__button' value='Send'>
          </form>

          <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
          <script src="js/iframe-Work.js"></script>
        </body>
        </html>`;

      iframeNumber++;
    };

    const postMessageToAll = (message, targetOrigin) => {
      const iFrames = $('.iframe');
      console.log(iFrames);

      for (let i = 0; i < iFrames.length; i++) {
        iFrames[i].contentWindow.postMessage(message, targetOrigin);
      }
    };

    jQuery(document).ready(() => {
      window.addEventListener('message', (e) => {
        postMessageToAll(e.data, targetOrg);
      });

      $('.main-body__plus').on('click', () => {
        createFrame();
      });
    });
  }
}

const iFrame1 = new Frame({
  iframeNumber: 1,
  targetOrg: '*',
});

// ------------------------------------- \\
