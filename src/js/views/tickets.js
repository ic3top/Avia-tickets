import currencyUI from './currency';
import { de } from 'date-fns/locale';

class TicketsUI {
  constructor(currency) {
    this.container = document.querySelector('.tickets-sections .row');
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
    this.favContainer = document.querySelector('#dropdown1');
    this.favourites = localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : [];
  }

  renderTickets(tickets) {
    this.clearContainer();
    if (tickets.length === 0) {
      this.showEmptyMsg();
    }

    let fragment = '';
    const currency = this.getCurrencySymbol();

    tickets.forEach((ticket) => {
      const template = TicketsUI.ticketTemplate(ticket, currency);
      fragment += template;
    });

    this.container.insertAdjacentHTML('afterbegin', fragment);
  }

  clearContainer() {
    this.container.innerHTML = '';
  }

  showEmptyMsg() {
    const template = TicketsUI.emptyMessageTemplate();
    this.container.insertAdjacentHTML('afterbegin', template);
  }

  static emptyMessageTemplate() {
    return `
    <div class="tickets-empty-res-msg">
      По вашему запросу ничего не найдено.
    </div>
    `;
  }

  static ticketTemplate(ticket, currency) {
    return `
    <div class="col s12 m6">
      <div class="card ticket-card">
        <div class="ticket-airline d-flex align-items-center">
          <img
            src="${ticket.airline_logo}"
            class="ticket-airline-img"
          />
          <span class="ticket-airline-name"
            >${ticket.airline_name}</span
          >
        </div>
        <div class="ticket-destination d-flex align-items-center">
          <div class="d-flex align-items-center mr-auto">
            <span class="ticket-city">${ticket.origin_name}</span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="ticket-city">${ticket.destination_name}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${ticket.departure_at}</span>
          <span class="ticket-price ml-auto">${currency} ${ticket.price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
        </div>
        <a
          class="waves-effect waves-light btn-small orange darken-1 add-favourite ml-auto"
          >Add to favorites</a
        >
      </div>
    </div>
    `;
  }

  addToFavourite(tickets) {
    const addFavouritesBtns = document.querySelectorAll('.add-favourite');

    addFavouritesBtns.forEach((el, favIndex) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();

        const favTicket = tickets[favIndex];
        if (this.favourites.includes(favTicket)) {
          return;
        }

        this.favourites.push(favTicket);
        this.initFavourites(favTicket);
        localStorage.setItem('favourites', JSON.stringify(this.favourites));
      });
    });
  }

  initFavourites(favTicket) {
    const currency = this.getCurrencySymbol();
    const template = TicketsUI.favTemplate(favTicket, currency);
    const delBtn = template.querySelector('button');
    let _this = this;
    this.favContainer.insertAdjacentElement('beforeend', template);
    delBtn.addEventListener('click', (e) => {
      this.deleteFav(e, delBtn, _this);
    });
  }

  deleteFav(e, delBtn, _this) {
    e.preventDefault();

    const allBtns = [...document.querySelectorAll('.delete-favorite')];
    const index = allBtns.indexOf(delBtn);
    _this.favContainer.removeChild(_this.favContainer.children[index]);

    _this.favourites.splice(index, 1);
    console.log(_this.favourites);
    localStorage.setItem('favourites', JSON.stringify(this.favourites));
  }

  static favTemplate(ticket, currency) {
    const wrap = document.createElement('div');
    const item = document.createElement('div');
    const deleteBtn = document.createElement('button');
    wrap.classList.add('favorite-item', 'd-flex', 'align-items-start');
    item.classList.add('favorite-item-info', 'd-flex', 'flex-column');
    deleteBtn.classList.add('waves-effect', 'waves-light', 'btn-small', 'pink', 'darken-3', 'delete-favorite', 'ml-auto');
    deleteBtn.textContent = 'Delete';
    wrap.innerHTML = `<img src="${ticket.airline_logo}" class="favorite-item-airline-img" />`;
    item.innerHTML = `
      <div class="favorite-item-destination d-flex align-items-center">
        <div class="d-flex align-items-center mr-auto">
          <span class="favorite-item-city">${ticket.origin_name}</span>
            <i class="medium material-icons">flight_takeoff</i>
        </div>
        <div class="d-flex align-items-center">
          <i class="medium material-icons">flight_land</i>
            <span class="favorite-item-city">${ticket.destination_name}</span>
        </div>
      </div>
      <div class="ticket-time-price d-flex align-items-center">
        <span class="ticket-time-departure">${ticket.departure_at}</span>
        <span class="ticket-price ml-auto">${currency} ${ticket.price}</span>
      </div>
      <div class="ticket-additional-info">
        <span class="ticket-transfers">${ticket.transfers}</span>
        <span class="ticket-flight-number">${ticket.flight_number}</span>
      </div>
    `;
    item.insertAdjacentElement('beforeend', deleteBtn);
    wrap.appendChild(item);

    // event for deleting
    // deleteBtn.addEventListener('click', (e) => {
    //   e.preventDefault();

    //   const allBtns = [...document.querySelectorAll('.delete-favorite')];
    //   const index = allBtns.indexOf(deleteBtn);
    //   const container = document.querySelector('#dropdown1');
    //   container.removeChild(container.children[index]);
    // });

    return wrap;
    // return `
    // <div class="favorite-item d-flex align-items-start">
    //   <img
    //     src="${ticket.airline_logo}"
    //     class="favorite-item-airline-img"
    //   />
    //   <div class="favorite-item-info d-flex flex-column">
    //     <div class="favorite-item-destination d-flex align-items-center">
    //       <div class="d-flex align-items-center mr-auto">
    //         <span class="favorite-item-city">${ticket.origin_name}</span>
    //           <i class="medium material-icons">flight_takeoff</i>
    //       </div>
    //       <div class="d-flex align-items-center">
    //         <i class="medium material-icons">flight_land</i>
    //           <span class="favorite-item-city">${ticket.destination_name}</span>
    //       </div>
    //     </div>
    //     <div class="ticket-time-price d-flex align-items-center">
    //       <span class="ticket-time-departure">${ticket.departure_at}</span>
    //       <span class="ticket-price ml-auto">${currency} ${ticket.price}</span>
    //     </div>
    //     <div class="ticket-additional-info">
    //       <span class="ticket-transfers">${ticket.transfers}</span>
    //       <span class="ticket-flight-number">${ticket.flight_number}</span>
    //     </div>
    //     <a class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto">Delete</a>
    //   </div>
    // </div>
    // `;
  }
}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;
