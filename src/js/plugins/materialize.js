/* eslint-disable no-undef */
import 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';

// Init select
const select = document.querySelector('select');
M.FormSelect.init(select);

export function getSelectInstance(element) {
  return M.FormSelect.getInstance(element);
}

// Init autocomplete
const autoComplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autoComplete);

export function getAutoCompleteInstance(element) {
  return M.Autocomplete.getInstance(element);
}

// Init datepicker
const datepickers = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepickers, {
  showClearBtn: true,
  format: 'yyyy-mm'
});

export function getDatepickerInstance(element) {
  return M.Datepicker.getInstance(element);
}
