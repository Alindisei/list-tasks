// Variables
const listTweets = document.querySelector('#list-ToDo');
const form = document.querySelector('#form-container');
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners() {
     //Cuando se envia el form
     form.addEventListener('submit', addTweet);

     // Borrar Tweets
     listTweets.addEventListener('click', removeTweet);

     // content cargado
     document.addEventListener('DOMContentLoaded', () => {
          tweets = JSON.parse( localStorage.getItem('tweets') ) || [] ;
          createHTML();
     });
}

// Añadir tweet del form
function addTweet(e) {
     e.preventDefault();
     // leer el valor del textarea
     const tweet = document.querySelector('#ToDo').value;
     
     // validación
     if(tweet === '') {
          showError('Cannot be empty');
          return;
     }

     // Crear un objeto Tweet
     const tweetObj = {
          id: Date.now(),
          text: tweet
     }

     // Añadirlo a mis tweets
     tweets = [...tweets, tweetObj];
     
     // Una vez agregado, mandamos renderizar nuestro HTML
     createHTML();

     // Reiniciar el form
     form.reset();
}

function showError(error) {
     const mensajeEerror = document.createElement('P');
     mensajeEerror.textContent = error;
     mensajeEerror.classList.add('error');

     const content = document.querySelector('#content');
     content.appendChild(mensajeEerror);

     setTimeout(() => {
          mensajeEerror.remove();
     }, 3000);
}

function createHTML() {
     cleanHTML();
     
     if(tweets.length > 0 ) {
          tweets.forEach( tweet =>  {
               // crear boton de eliminar
               const deleteButton = document.createElement('A');
               deleteButton.classList = 'delete-tweet';
               deleteButton.innerText = 'X';
     
               // Crear elemento y añadirle el content a la lista
               const li = document.createElement('LI');

               // Añade el text
               //li.classList.add('')
               li.innerText = tweet.text;

               // añade el botón de borrar al tweet
               li.appendChild(deleteButton);

               // añade un atributo único...
               li.dataset.tweetId = tweet.id;

               // añade el tweet a la lista
               listTweets.appendChild(li);
          });
     }

     sincronizarStorage();
}

// Elimina el Tweet del DOM
function removeTweet(e) {
     e.preventDefault();

     // console.log(e.target.parentElement.dataset.tweetId);
     const id = e.target.parentElement.dataset.tweetId;
     tweets = tweets.filter( tweet => tweet.id != id  );
     createHTML();
}

// Agrega tweet a local storage
function sincronizarStorage() {
     localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Elimina los cursos del carrito en el DOM
function cleanHTML() {
     while(listTweets.firstChild) {
          listTweets.removeChild(listTweets.firstChild);
     }
}