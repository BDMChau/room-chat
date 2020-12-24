// client side
document.addEventListener(
  "DOMContentLoaded",
  function () {
    const socket = io("http://localhost:5000");
    const messageForm = document.querySelector(".message-send");
    const messageInput = document.querySelector(".message-input");
    const messageBox = document.querySelector(".message-box");
    const roomContainer = document.querySelector(".room-box");
    const nameFormInput = document.querySelector(".info-send");
    const nameForm = document.querySelector(".info");


    socket.on("newRoomCreated", (element) => {
      let roomLink = document.createElement("a");
      roomLink.href = "/" + element;
      roomLink.innerHTML = element;

      roomContainer.append(roomLink);
    });


    if (newUserName) {
      // const name = prompt("Enter your name!", "");
      socket.emit("newUser", roomName, newUserName);

      socket.on("newUserName", (name) => {
        displayMessage(`<b>${name}</b> joined room!`);
      });

      socket.on("serverMessage", (data) => {
        displayMessage(data); //welcome
      });

      socket.on("userServerMessage", (data) => {
        displayMessage(
          `<b>${data.name}</b>: ${data.message} <em>${data.time}</em>`
        );
      });

      socket.on("userDisconnect", (name) => {
        displayMessage(`<b>${name}</b> left room!`);
      });

      //////////////////
      messageForm.addEventListener("submit", (val) => {
        val.preventDefault();
        const message = messageInput.value.trim();

        if (message) {
          let h = new Date().getHours();
          let m = new Date().getMinutes();
          let mFormat = m <= 9 ? '0' : '';
          let AmPm = h >= 12 ? 'pm' : 'am';

          displayMessage(`<b>You:</b> ${message} <em>${h}:${mFormat}${m} ${AmPm}</em>`);

          socket.emit("userMessage", roomName, message, newUserName); //send from client to server
          messageInput.value = "";
        }
      });


      const formNameControl = nameFormInput.addEventListener("submit", (val) => {
        val.preventDefault();
        nameForm.classList.add("active");
      });

      displayMessage = (message) => {
        let element = document.createElement("p");
        element.innerHTML = message;
        messageBox.append(element);
        messageBox.scrollTop = messageBox.scrollHeight;
      };
    }

  },
  false
);
