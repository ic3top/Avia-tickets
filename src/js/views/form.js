import { getAutoCompleteInstance, getDatepickerInstance } from '../plugins/materialize';
import toast from '../helpers/toast';

class FormUI {
  constructor(autocompleteInstance, datePickerInstance) {
    this._form = document.forms.locationControls;
    this.origin = document.getElementById('autocomplete-origin');
    this.destination = document.getElementById('autocomplete-destination');
    this.depart = document.getElementById('datepicker-depart');
    this.return = document.getElementById('datepicker-return');
    this.originAutocomplete = autocompleteInstance(this.origin);
    this.destinationAutoComplete = autocompleteInstance(this.destination);
    this.departDatePicker = datePickerInstance(this.depart);
    this.returnDatePicker = datePickerInstance(this.return);
  }

  get form() {
    return this._form;
  }

  get originValue() {
    return this.origin.value;
  }

  get destinationValue() {
    return this.destination.value;
  }

  get departDateValue() {
    if (!this.departDatePicker.toString()) {
      toast('Must be mentioned depart date', 4000, '#ad1457');
    }
    return this.departDatePicker.toString();
  }

  get returnDateValue() {
    return this.departDatePicker.toString();
  }

  setAutoCompleteData(data) {
    this.originAutocomplete.updateData(data);
    this.destinationAutoComplete.updateData(data);
  }
}

const formUI = new FormUI(getAutoCompleteInstance, getDatepickerInstance);
export default formUI;
