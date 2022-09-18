const convert_text = document.getElementById("convert_text");
const click_to_convert = document.getElementById("click_to_convert");

click_to_convert.addEventListener("click", (event) => {
  event.preventDefault();
  var speech = true;
  window.SpeechRecognition = window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;

  recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript);

    convert_text.innerHTML = transcript;
  });

  if (speech === true) {
    recognition.start();
    console.log("Speech recognition started");
  }
});
