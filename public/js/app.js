const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

//event listener for submitting form
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`http://localhost:3003/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          return (messageOne.textContent = data.error);
        }
        messageOne.textContent = data.location;
        messageTwo.textContent = `Currently ${data.forecast.temperature} degrees. ${data.forecast.description}`;
      });
    }
  );
});
