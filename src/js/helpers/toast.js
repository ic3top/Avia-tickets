import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

/**
 *
 * @param {String} text
 * @param {Number} duration
 * @param {String} backgroundColor
 */
const toast = (text, duration, backgroundColor) => {
  Toastify({
    text,
    duration,
    close: true,
    gravity: 'top',
    position: 'right',
    backgroundColor,
    stopOnFocus: false
  }).showToast();
};

export default toast;
