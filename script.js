let numeroAdivinar;
let maxNumero = 100;
let tiempoRestante = 30;
let intervaloTiempo;

function iniciarJuego() {
  numeroAdivinar = Math.floor(Math.random() * maxNumero) + 1;
  document.getElementById('max-number').textContent = maxNumero;
  document.getElementById('message').textContent = '';
  tiempoRestante = 30;
  actualizarTiempo();
  intervaloTiempo = setInterval(actualizarTiempo, 1000);
  
  // Cambiar botón de Verificar a Reiniciar
  let button = document.getElementById('verify-button');
  button.textContent = 'Verificar';
  button.setAttribute('onclick', 'verificarNumero()');
}

function actualizarTiempo() {
  document.getElementById('time-left').textContent = tiempoRestante;
  tiempoRestante--;

  if (tiempoRestante < 0) {
    clearInterval(intervaloTiempo);
    mostrarMensaje('Se acabó el tiempo. El número era ' + numeroAdivinar + '.');
    mostrarPreguntaReinicio();
  }
}

function verificarNumero() {
  if (tiempoRestante < 0) {
    mostrarMensaje('El tiempo ya se acabó. Reinicia el juego para intentar de nuevo.');
    return;
  }

  let guess = parseInt(document.getElementById('guess').value);

  if (isNaN(guess) || guess < 1 || guess > maxNumero) {
    mostrarMensaje('Ingresa un número válido entre 1 y ' + maxNumero + '.');
    return;
  }

  if (guess === numeroAdivinar) {
    clearInterval(intervaloTiempo);
    mostrarMensaje('¡Adivinaste! El número era ' + numeroAdivinar + '.');
    mostrarPreguntaReinicio();
  } else if (guess < numeroAdivinar) {
    mostrarMensaje('Intenta con un número más alto.');
  } else {
    mostrarMensaje('Intenta con un número más bajo.');
  }
}

function reiniciarJuego() {
  document.getElementById('guess').value = ''; // Limpiar campo de input
  iniciarJuego(); // Reiniciar juego
  let button = document.getElementById('verify-button');
  button.textContent = 'Verificar';
  button.setAttribute('onclick', 'verificarNumero()');
}

function mostrarMensaje(mensaje) {
  document.getElementById('message').textContent = mensaje;
}

function mostrarPreguntaReinicio() {
  let preguntaElement = document.createElement('p');
  preguntaElement.textContent = '¿Quieres volver a jugar?';
  document.getElementById('game-container').appendChild(preguntaElement);

  let restartButton = document.createElement('button');
  restartButton.textContent = 'Jugar de nuevo';
  restartButton.addEventListener('click', function() {
    limpiarMensajes();
    reiniciarJuego();
  });
  document.getElementById('game-container').appendChild(restartButton);
}

function limpiarMensajes() {
  let messages = document.querySelectorAll('#game-container p');
  messages.forEach(function(message) {
    message.remove();
  });
}

// Iniciar juego cuando se carga la página
window.onload = iniciarJuego;