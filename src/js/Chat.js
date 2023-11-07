import ChatAPI from "./api/ChatAPI";

export default class Chat {
  constructor(container) {
    this.container = container;
    this.api = new ChatAPI();
    // this.websocket = null;

    this.websocket = new WebSocket('ws://localhost:3000/ws');



    this.apiUrl = 'http://localhost:3000';
  }

  /* async init(userName) {
    const request = fetch(`${this.apiUrl}/new-user/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userName),
    });

    const result = await request;

    // Если в запросе ошибка и ответ не обработался
    if (!result.ok) {
      console.error('Ошибка!');

      return; // если не нужно обрабатывать ошибку - выйдем из метода add
    }

    const json = await result.json();

    const {status} = json; // написанный сервер возвращает статусы (ОК и т.д.)
    
    const { user } = json; 
    console.log(status + ' - ' + user);
  } */
  init() {
    this.bindToDOM();
    console.log('контейнер заполнен приветственной формой');
  }

  static get html() {
    return `
    <div class="container">
      <div class="modal__form">
        <form class="form" action="">
          <div class="modal__header">Выберите псевдоним</div>
          <div class="form_content">
            <div class="modal__body">
              <input class="form__input" type="text" required="">
              <div class="form__label"></div>
              <button class="modal__footer" type="submit">Продолжить</button>
            </div>
            <div class="form__group"></div>
          </div>
        </form>
      </div>

      <div class="chat hidden">
        <div class="chat__header"> header
          <div class="chat__connect"> Smth 1
          </div>
          <div class="chat__connect"> Smth 2
          </div>
          <div class="chat__container">
            <div class="chat__area"> 
              <div class="chat__messages-container">
                <div class="message__container message__container-interlocutor">
                  <div class="message__header"> Gloria             
                  </div>             
                </div>
                <div class="message__container message__container-yourself">
                  <div class="message__header"> Me             
                  </div>  
                  <div class="message__content"> Приветики             
                  </div>             
                </div>              
              </div> 
              <div class="chat__messages-input"> 
                <input class="form__input chat__message" type="text" required="">           
              </div>             
            </div>
            <div class="chat__userlist">
              <div class="chat__user chat__connect">Hanz
              </div>
              <div class="chat__user">Valerie
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  bindToDOM() {
    this.container.innerHTML = Chat.html;
    this.modal = this.container.querySelector('.modal__form');
    this.form = this.container.querySelector('.form');
    this.input = this.container.querySelector('.form__input');
    this.subscribeButton = this.container.querySelector('button');

    this.chat = this.container.querySelector('.chat');
    this.chatInput = this.container.querySelector('.chat__message');

    
    this.subscribeOnEvents = this.subscribeOnEvents.bind(this);
    this.form.addEventListener('submit', this.subscribeOnEvents);
    
    this.registerEvents(); // Регистрирую события WS

    this.sendMessage = this.sendMessage.bind(this);
    this.chatInput.addEventListener('keyup', this.sendMessage);
  }

  registerEvents() {
    this.websocket.addEventListener('open', (e) => {
      console.log(e);

      console.log('ws open event');
    });

    this.websocket.addEventListener('message', (e) => {
      console.log(e);

      console.log('ws message event');
    });

    this.websocket.addEventListener('error', (e) => {
      console.log(e);

      console.log('ws error event');
    });

    this.websocket.addEventListener('close', (e) => {
      console.log(e);

      console.log('ws close event');
    });
  }

  async subscribeOnEvents(e) {
    e.preventDefault();

    console.log(this);

    // const userName = this.input.value;
    const userName = {
      name: this.input.value,
    };

    const request = fetch(`${this.apiUrl}/new-user/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userName),
    });

    const result = await request;
    console.log(result);

    console.log(result.headers.get('Content-Type')); // заголовки ответа

    // Если в запросе ошибка и ответ не обработался
    // if (!result.ok) {
    //   console.error('Ошибка!');

    //   return; // если не нужно обрабатывать ошибку - выйдем из метода add
    // }

    const json = await result.json();

    const { status } = json; // написанный сервер возвращает статусы (ОК и т.д.)
    
    // const { user } = json; 
    // console.log(status + ' - ' + user);

    if (status === 'ok') {
      const { user } = json;
      console.log(user);

      this.user = user;

      this.input.value = '';

      this.modal.classList.toggle('hidden');
      this.chat.classList.toggle('hidden');

      // this.registerEvents();
    } else {
      // console.log(json.message);
      // const { message } = json;
      // console.log(message);
      console.log(json);
      const { message } = json;
      
      console.log(this.form.elements);
      console.log(this.input);
      this.input.focus();
      const error = document.createElement('div');
      error.dataset.id = 'error';
      // error.className = 'form-error';
      error.className = 'form__hint';
      error.textContent = message;

      this.input.offsetParent.appendChild(error);
      error.style.top = `${this.input.offsetTop + this.input.offsetHeight / 2 - error.offsetHeight / 2}px`;
      error.style.left = `${this.input.offsetLeft + this.input.offsetWidth}px`;

      setTimeout(() => {
        error.remove();
      }, 3000);

      this.input.value = '';
    }
  }

  onEnterChatHandler() {

  }

  sendMessage(e) {
    console.log(e);
    const message = this.chatInput.value;
    console.log(message);

    if (!message) return;

    if (message && e.code === 'Enter') {
      this.websocket.send(JSON.stringify({ message }));

      this.chatInput.value = '';
    }
  }

  renderMessage() {}
}
