import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const iframePlayer = new Player(iframe);
const SAVED_TIME = 'videoplayer-current-time';

const startTimeOnLoad = load(SAVED_TIME);

iframePlayer.on(
  'timeupdate',
  throttle(evt => save(SAVED_TIME, evt.seconds), 1000)
);

if (startTimeOnLoad) {
  iframePlayer.setCurrentTime(startTimeOnLoad);
}

function save(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.log('Set state error-', error.message);
  }
}

function load(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? 'undefined' : JSON.parse(serializedState);
  } catch (error) {
    console.log('Get state error-', error.message);
  }
}
