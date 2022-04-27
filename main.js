'use strict';

(function () {
  class WeatherWidget extends HTMLElement {
    constructor() {
      // establish prototype chain
      super();

      // attaches shadow tree and returns shadow root reference
      const shadow = this.attachShadow({ mode: 'open' });

      // creating a container for the editable-list component
      const weatherWidgetContainer = document.createElement('div');

      // get attribute values from getters
      const title = this.title;

      // adding a class to our container for the sake of clarity
      weatherWidgetContainer.classList.add('weather-widget');

      // creating the inner HTML of the editable list element
      weatherWidgetContainer.innerHTML = `
        <style>
        </style>
        <h3>${title}</h3>
        <div>
          <input class="weather-widget-input" type="text"></input>
          <button class="get-minimum-umbrellas-button">Get Minimum Umbrellas</button>
        </div>
      `;

      // binding methods
      this.minimumUmbrellas = this.minimumUmbrellas.bind(this);

      // appending the container to the shadow DOM
      shadow.appendChild(weatherWidgetContainer);
    }

    minimumUmbrellas(e) {
      const textInput = this.shadowRoot.querySelector('.weather-widget-input');

      if (textInput.value) {
        textInput.value = '';
      }
    }

    // fires after the element has been attached to the DOM
    connectedCallback() {
      const getMinimumUmbrellasButton = this.shadowRoot.querySelector(
        '.get-minimum-umbrellas-button'
      );
      getMinimumUmbrellasButton.addEventListener(
        'click',
        this.minimumUmbrellas,
        false
      );
    }
  }

  customElements.define('weather-widget', WeatherWidget);
})();
