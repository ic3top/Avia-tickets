import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';

document.addEventListener('DOMContentLoaded', () => {
  // Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutoCompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    // eslint-disable-next-line camelcase
    const depart_date = formUI.departDateValue;
    // eslint-disable-next-line camelcase
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency
    });

    ticketsUI.renderTickets(locations.lastSearch);
    ticketsUI.addToFavourite(locations.lastSearch);
  }

  initApp();

  Object.values(ticketsUI.favourites).forEach((ticket) => {
    ticketsUI.initFavourites(ticket);
  });
  const form = formUI.form;

  // Events
  document.querySelector('.favorites .btn').addEventListener('click', () => {
    document.querySelector('#dropdown1').classList.toggle('activeDropDown');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    onFormSubmit();
  });
});
