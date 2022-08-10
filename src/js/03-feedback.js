import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_FORM_DATA = 'feedback-form-state';

onLoadPage();
form.addEventListener('input', throttle(inputHandle, 500));
form.addEventListener('submit', onFormSubmit);

function onLoadPage() {
  const { email, message } = loadFromLocalStorage(STORAGE_FORM_DATA);
  if (email) {
    form.email.value = email;
  }
  if (message) {
    form.message.value = message;
  }
}

function inputHandle(evt) {
  const savedFormData = loadFromLocalStorage(STORAGE_FORM_DATA)
    ? loadFromLocalStorage(STORAGE_FORM_DATA)
    : {};
  const value = savedFormData !== 'undefined' ? savedFormData : {};
  value[evt.target.name] = evt.target.value;
  saveToLocalStorage(STORAGE_FORM_DATA, value);
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const { email, message } = evt.currentTarget;
  console.log('email: ', email.value);
  console.log('message: ', message.value);

  evt.currentTarget.reset();
  removeFromLoacalStorage(STORAGE_FORM_DATA);
}

function saveToLocalStorage(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error-', error.message);
  }
}

function loadFromLocalStorage(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? 'undefined' : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error-', error.message);
  }
}

function removeFromLoacalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Remove state error-', error.message);
  }
}
