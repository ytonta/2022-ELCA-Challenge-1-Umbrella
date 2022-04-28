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
      const theme = this.theme;

      // adding a class to our container for the sake of clarity
      weatherWidgetContainer.classList.add('weather-widget');

      // creating the inner HTML of the editable list element
      weatherWidgetContainer.innerHTML = `
        <style>
          .weather-widget {
            box-shadow: -2px -2px 4px 0px #ffffff, 50px 50px 50px 0px rgb(0 0 0 / 25%);
            background: #181818;
            border-radius: 20px;
            max-width: 400px;
            padding: 30px;
          }
          .weather-widget .error-message {
            display: none;
            color: #eb2525;
          }
          .weather-widget .error-message p {
            margin: 5px 0;
          }
          .weather-widget h2,weather-widget h3 {
            color: #ffffff;
          }
          .weather-input-container {
            background: #121212;
            border-radius: 15px;
            box-shadow: 0 0 5px 1px rgb(255 255 255 / 17%);
            display: flex;
            width: 100%;
          }
          .weather-input-container input[type="text"] {
            color: #f2f2f2;
            background: #121212;
            box-sizing: border-box;
            border-radius: 15px;
            padding: 10px;
            height: 50px;
            width: 100%;
            outline: none;
            border: 0;
          }
          .weather-input-container button {
            background: #121212;
            color: #f2f2f2;
            cursor: pointer;
            border-radius: 100px;
            border: none;
            box-shadow: 0 0 3px 3px rgb(255 255 255 / 15%);
            margin: 10px;
            padding: 8px;
            height: 30px;
          }
          .weather-input-container button:disabled {
            color: #121212;
            cursor: auto;
            box-shadow: none;
          }
          .weather-input-container label {
            width: 100%
          }
          .weather-widget-result {
            display: flex;
            flex-wrap: wrap;
            margin-top: 30px;
          }
          .weather-widget-result > div {
            background: #121212;
            border-radius: 15px;
            color: #f2f2f2;
            width: 50%;
          }
        </style>
        <h3>${title}</h3>
        <div>
          <h2>Enter all values separated by comma</h2>
          <div class="weather-input-container">
            <label>
              <input class="weather-widget-input" type="text" placeholder="Example: sunny, clear" />
            </label>
            <button disabled class="get-minimum-umbrellas-button">></button>
          </div>
          <span class="error-message">
            <p>One or more values are invalid</p>
            <p>Accepted values: clear, sunny, cloudy, rainy, windy, thunderstorms</p>
          </span>

          <div class="weather-widget-result"></div>
        </div>
      `;

      // binding methods
      this.addWeatherRow = this.addWeatherRow.bind(this);
      this.minimumUmbrellas = this.minimumUmbrellas.bind(this);
      this.validateInput = this.validateInput.bind(this);

      // appending the container to the shadow DOM
      shadow.appendChild(weatherWidgetContainer);
    }

    addWeatherRow(item) {
      const resultContainer = this.shadowRoot.querySelector(
        '.weather-widget-result'
      );
      const div = document.createElement('div');
      div.innerHTML = item;

      resultContainer.appendChild(div);
    }

    minimumUmbrellas(e) {
      let homeUmbrellas = 0;
      let officeUmbrellas = 0;

      const textInput = this.shadowRoot.querySelector('.weather-widget-input');

      if (textInput.value) {
        const weatherArray = textInput.value
          .replace(/['"\[\]]+/g, '')
          .split(',')
          .map((item) => item.trim())
          .filter((item) => item !== '');

        weatherArray.forEach((item, index) => {
          if (item === 'rainy') {
            if (index % 2 === 0) {
              // morning
              if (homeUmbrellas > 0) {
                homeUmbrellas--;
              }
              officeUmbrellas++;
            } else {
              // afternoon
              if (officeUmbrellas > 0) {
                officeUmbrellas--;
              }
              homeUmbrellas++;
            }
          }

          this.addWeatherRow(item);
        });

        const totalUmbrella = homeUmbrellas + officeUmbrellas;
      }
    }

    validateInput(e) {
      const allowed = [
        'clear',
        'sunny',
        'cloudy',
        'rainy',
        'windy',
        'thunderstorms',
      ];
      const getMinimumUmbrellasButton = this.shadowRoot.querySelector(
        '.get-minimum-umbrellas-button'
      );
      const errorMessage = this.shadowRoot.querySelector('.error-message');

      console.log('e.target.value', e.target.value);
      if (e.target.value) {
        const weatherArray = e.target.value
          .replace(/['"\[\]]+/g, '')
          .split(',')
          .map((item) => item.trim())
          .filter((item) => item !== '');
        console.log('weatherArray', weatherArray);
        if (weatherArray.some((item) => !allowed.includes(item))) {
          errorMessage.style.display = 'block';
          getMinimumUmbrellasButton.setAttribute('disabled', true);
        } else {
          errorMessage.style.display = 'none';
          getMinimumUmbrellasButton.removeAttribute('disabled');
        }
      } else {
        errorMessage.style.display = 'none';
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
