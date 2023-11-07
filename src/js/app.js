import Chat from './Chat';

const root = document.getElementById('root');

const app = new Chat(root);

app.init();

console.log(app);

/* app.init(['Grisha']);
console.log(app.init('Grisha')); */

// app.init();

/* import Collapsible from './Collapsible';

const link = document.querySelector('.link');
const collapsibleElement = document.querySelector('.collapse');

console.log(collapsibleElement.offsetHeight);

const example = new Collapsible(link, collapsibleElement, 0); */

//     "test": "echo \"Error: no test specified\" && exit 1"
