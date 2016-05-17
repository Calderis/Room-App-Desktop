/* CONNECTION TO socket.io */
//var socket = io.connect('http://141.138.157.108:4445');//Online
var socket = io.connect('http://localhost:4445');//Offline

socket.on("msg", function(data){
    console.log(data);
    var li = document.createElement("li");
    li.innerHTML = data;
    document.getElementById("tchat").appendChild(li);
});