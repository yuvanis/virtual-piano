const letterButton = document.querySelector('.btn-letters');
const noteButton = document.querySelector('.btn-notes');
const fullScreen = document.querySelector('.fullscreen');
const keys = document.querySelectorAll('.piano-key');
const piano = document.getElementById('piano');
let click = false;

letterButton.addEventListener('click' , () => {
  letterButton.classList.add('btn-active');
  noteButton.classList.remove('btn-active');
  keys.forEach(elem =>
    elem.classList.add('piano-key-letter'));
})

noteButton.addEventListener('click' , () => {
  letterButton.classList.remove('btn-active');
  noteButton.classList.add('btn-active');
  keys.forEach(elem =>
    elem.classList.remove('piano-key-letter'));
})

function openFullScreen(){
  document.documentElement.requestFullscreen();
}

function closeFullScreen(){
  document.exitFullscreen();
}

fullScreen.addEventListener('click', openFullScreen);
fullScreen.addEventListener('click', closeFullScreen);

keys.forEach(elem => {
  elem.addEventListener('mousedown', () => playSound(elem));
})

function playSound(elem){
  const noteSound = document.getElementById(elem.dataset.letter)
  if (elem.classList.contains('piano-key'))
  noteSound.play();
  noteSound.currentTime = 0;
  elem.classList.add('piano-key-active');
  elem.classList.add('piano-key-active-pseudo');
  click = true;
}

  keys.forEach(elem => {
  elem.addEventListener('mouseout', () => endClick(elem))
})

keys.forEach(elem => {
  elem.addEventListener('mouseup', () => {
  endClick(elem);
  click = false;
  })
})

  keys.forEach(elem => {
  elem.addEventListener('mouseover', e => {
    if (e.which == 1 && click)
    playSound(elem);
  })
})

function endClick(elem) {
  elem.classList.remove('piano-key-active');
  elem.classList.remove('piano-key-active-pseudo');
  elem.classList.add('piano-key-remove-mouse');
}

keys.forEach(elem => {
  window.addEventListener('keydown', e => {
    const audio = document.querySelector(`audio[data-key="${e.code}"]`);
    const light = document.querySelector(`div[data-key="${e.code}"]`);
    if (!audio) return;
    if (e.repeat) return;
    audio.play();
    audio.currentTime = 0;
    light.classList.add('piano-key-active');
    light.classList.add('piano-key-active-pseudo');
}) 
 })

 keys.forEach(elem => {
  document.addEventListener('keyup', e => {
    const light = document.querySelector(`div[data-key="${e.code}"]`);
    light.classList.remove('piano-key-active');
    light.classList.remove('piano-key-active-pseudo');
  })
})