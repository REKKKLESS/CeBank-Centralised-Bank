function postData() {
  let text= document.getElementsByClassName("ChatInput-input")[0].innerText
  let data_
  let chatWindow = document.getElementsByClassName("ChatWindow")[0]
  let url = "http://localhost:3000";
  obj = {'message':`${text}`};
  data= JSON.stringify(obj);
  console.log(data)
  params = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: data,
  };
  fetch(url, params)
    .then((response) => response.text())
    .then((data) =>{ 
      console.log(data)
      data_=data
    
  chatWindow.innerHTML += `
  <div class="ChatItem ChatItem--expert">
  <div class="ChatItem-meta">
    <div class="ChatItem-avatar">
      <img class="ChatItem-avatarImage" src="https://randomuser.me/api/portraits/women/0.jpg">
    </div>
  </div>
  <div class="ChatItem-chatContent">
    <div class="ChatItem-chatText">${text}</div>
   </div>
</div>

  <div class="ChatItem ChatItem--customer">
  <div class="ChatItem-meta">
    <div class="ChatItem-avatar">
      <img
        class="ChatItem-avatarImage"
        src="https://image.ibb.co/eTiXWa/avatarrobot.png"
      />
    </div>
  </div>
  <div class="ChatItem-chatContent">
    <div class="ChatItem-chatText">
      <p> ${data} </p>
    </div>
  </div>
</div>
    `;
  });
}

function myFunction() {
  var x = document.getElementById("bubble");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

