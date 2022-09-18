const textarea = document.querySelector("textarea"),
  voiceList = document.querySelector("select"),
  speechBtn = document.querySelector("button");

let synth = speechSynthesis;
let isSpeaking = true;

voices();

function voices() {
  for (let voice of synth.getVoices()) {
    console.log(voice);
    let selected = voice.name === "Google US English" ? "selected" : "";
    let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);
  }
}
synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
  let utternance = new SpeechSynthesisUtterance(text);
  for (let voice of synth.getVoices()) {
    if (voice.name === voiceList.value) {
      utternance.voice = voice;
    }
  }
  synth.speak(utternance);
}

speechBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (textarea.value === "") return;

  if (!synth.speaking) {
    textToSpeech(textarea.value);
  }
  if (textarea.value.length > 80) {
    if (isSpeaking) {
      synth.resume();
      isSpeaking = false;
      speechBtn.innerHTML = "Pause";
    } else {
      synth.pause();
      isSpeaking = true;
      speechBtn.innerHTML = "Resume";
    }
    setInterval(() => {
      if (!synth.speaking && !isSpeaking) {
        isSpeaking = true;
        speechBtn.innerHTML = "Speak!";
      }
    }, 500);
  }
});

textToSpeech("Hello World");
