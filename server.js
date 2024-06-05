const express = require("express")
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http)
const port = 3000

app.use(express.static("./public"))

app.get("/", (req, res) =>{
  res.sendFile("index.html", {root: __dirname})
})

http.listen(port, () => console.log("Server on in port: " + port))

io.on("connection", socket => {
  console.log("USER CONNECTED")

  socket.on("sendMessage", (senderName, senderText, clientRoom) => {
    io.sockets.in(clientRoom).emit("roomMessages", senderName, senderText) //All in room
    //socket.to(clientRoom).emit("roomMessages", senderName, senderText) //All except sender in room
    console.log(socket.id, senderName, "said", senderText,"in room", clientRoom)
  })

  socket.on("joinRoom", room => {
    socket.join(room)
    console.log("SOMEONE JOINED")
  })

})
