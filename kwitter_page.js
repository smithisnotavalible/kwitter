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
room_name = localStorage.getItem("room_name");

function send() {
  msg = document.getElementById("message1").value;
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
  });

  document.getElementById("message1").value = "";
}

function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        console.log(firebase_message_id);
        console.log(message_data);
        name = message_data('name');
        message = message_data('name')
        like = message_data('like');
        name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'"
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

        row = name_with_tag + message_with_tag +like_button + span_with_tag;
        document.getElementById("output").innerHTML += row;
      }
    });
  });
}
getData();

function logout() 
{
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html"
}

function updateLike(message_id)
{
  consolee.log("clicked on like button - " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  upadated_likes = Number(likes) + 1;
  console.log(upadated_likes);

  firebase.database().ref(room_name).child(message_id).update({
    like : upadated_likes
  });
}