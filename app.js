const express = require("express");
const app = express();
const http = require("http");
const path = require("path");

const socketio = require("socket.io");
const server = http.createServer(app)
const io =  socketio(server);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "public", "views"));


io.on("connection", function (socket) {
    socket.on("send-location", function (data){
        io.emit("recieve-location", {id:socket.id,  ...data});
    });

    // console.log("Connected");   Here Its Show Always Connected Loaction
    // If User Is Disconnected Then Connection Is Break
    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id);
    });
});


app.get("/", function (req , res){
    res.render("index");
});

server.listen(9999)