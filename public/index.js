const socket = io()

var clientName = prompt("Write your nickname")
var myInputText = document.getElementById("myInputText")
var messagesConainerDiv = document.getElementById('messagesContainer')
var clientRoom = "room1"

joinRoom(clientRoom)

myInputText.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Evitar comportamiento por defecto si es necesario
    sendMyMessage(); // Llamar a la función para borrar el texto
  }
});

function sendMyMessage()
{
  socket.emit("sendMessage", clientName, myInputText.value, clientRoom)
  myInputText.value = ""
}



function joinRoom(room)
{
  socket.emit("joinRoom", room)
}

socket.on("roomMessages", (senderName, senderText) => {
  var newPar = document.createElement('p'); // Crea un nuevo elemento <p>
  newPar.textContent = senderName + ": " + senderText; // Establece el texto del párrafo con el valor del input
  messagesConainerDiv.appendChild(newPar);

  console.log(senderName,":" ,senderText)
})

// socket.on("mi mensaje", data => {
//   console.log(data)
//   socket.emit("notificacion", "El cliente recibió el mensaje")
// })
