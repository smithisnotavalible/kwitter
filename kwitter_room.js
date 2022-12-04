var firebaseConfig = {
  apiKey: "AIzaSyDUOe2-c8Xq11hH0RdGz-VNX0zn_bPo3kY",
  authDomain: "kwitter-71bea.firebaseapp.com",
  databaseURL: "https://kwitter-71bea-default-rtdb.firebaseio.com",
  projectId: "kwitter-71bea",
  storageBucket: "kwitter-71bea.appspot.com",
  messagingSenderId: "624617267561",
  appId: "1:624617267561:web:9b54901e952316fd9b5df8"
}
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name

function addRoom() {
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  })

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("Room Name - " + Room_names);
      row = "<div class'room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"<div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });
}
getData();
function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}
function logout() 
{
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location = "index.html"
}