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

iframePlayer
  .setCurrentTime(startTimeOnLoad)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

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
