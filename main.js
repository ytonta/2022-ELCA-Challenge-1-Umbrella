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
        .error {

        }
          input[type="text"] {
            box-sizing: border-box;
            border-radius: 4px;
            padding: 10px 10px;
            height: 50px;
            width: 100%;
          }
          button {
            color: #000000;
            cursor: pointer;
            background-color: rgb(127 213 255);
            border-radius: 100px;
            border: none;
            box-shadow: 0 10px 35px 0 rgb(127 213 255 / 25%);
            margin-top: 15px;
            padding: 15px 20px;
          }
          button:disabled {
            color: #f2f2f2;
          }
        </style>
        <h3>${title}</h3>
        <div>
          <label>
            <h2>Enter all values separated by comma</h2>
            <input class="weather-widget-input" type="text" placeholder="Example: sunny, clear" />
          </label>
          <span class="error">
            One or more values are invalid
            Accepted values: clear, sunny, cloudy, rainy, windy, thunderstorms
          </span>
          <button disabled class="get-minimum-umbrellas-button">Get Minimum Umbrellas</button>
        </div>
      `;

      // binding methods
      this.minimumUmbrellas = this.minimumUmbrellas.bind(this);
      this.validateInput = this.validateInput.bind(this);

      // appending the container to the shadow DOM
      shadow.appendChild(weatherWidgetContainer);
    }

    minimumUmbrellas(e) {
      console.log('e', e);
      const allowed = [
        'clear',
        'sunny',
        'cloudy',
        'rainy',
        'windy',
        'thunderstorms',
      ];
      let morningUmbrellas = 0;
      let afternoonUmbrellas = 0;

      const textInput = this.shadowRoot.querySelector('.weather-widget-input');

      if (textInput.value) {
        textInput.value = '';
      }
    }

    validateInput(e) {
      const getMinimumUmbrellasButton = this.shadowRoot.querySelector(
        '.get-minimum-umbrellas-button'
      );
      const allowed = [
        'clear',
        'sunny',
        'cloudy',
        'rainy',
        'windy',
        'thunderstorms',
      ];
      console.log('e', e.target.value);
      if (e.target.value) {
        const weatherArray = e.target.value
          .split(',')
          .map((item) => item.trim());

        if (weatherArray.some((item) => !allowed.includes(item))) {
          getMinimumUmbrellasButton.setAttribute('disabled', true);
        } else {
          getMinimumUmbrellasButton.removeAttribute('disabled');
        }
      } else {
        getMinimumUmbrellasButton.setAttribute('disabled', true);
      }
    }

    // fires after the element has been attached to the DOM
    connectedCallback() {
      const getMinimumUmbrellasButton = this.shadowRoot.querySelector(
        '.get-minimum-umbrellas-button'
      );
      const weatherWidgetInput = this.shadowRoot.querySelector(
        '.weather-widget-input'
      );
      getMinimumUmbrellasButton.addEventListener(
        'click',
        this.minimumUmbrellas,
        false
      );
      weatherWidgetInput.addEventListener('keyup', this.validateInput, false);
    }
  }

  customElements.define('weather-widget', WeatherWidget);
})();
