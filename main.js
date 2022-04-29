'use strict';

(function () {
  class WeatherWidget extends HTMLElement {
    constructor() {
      // establish prototype chain
      super();

      // attaches shadow tree and returns shadow root reference
      const shadow = this.attachShadow({ mode: 'open' });

      // creating a container for the weather widget component
      const weatherWidgetContainer = document.createElement('div');

      // get attribute values from getters
      const title = this.title;
      const theme = this.theme;

      weatherWidgetContainer.classList.add('weather-widget');
      weatherWidgetContainer.setAttribute('data-theme', theme);

      // creating the inner HTML of the weather widget element
      weatherWidgetContainer.innerHTML = `
        <style>
          .weather-widget {
            --font-color: #f2f2f2;
            --error-color: #d81717;
            --bg-color: #181818;
            --input-bg-color: #121212;
            --input-hover-bg-color: #2a2a2a;
            --input-active-bg-color: #000000;
            --button-shadow: -2px -2px 4px rgba(255, 255, 255, 0.05), 0 0 10px 10px rgba(255, 255, 255, 0.005), 2px 2px 8px rgba(60, 60, 60, 0.1);
          }
          [data-theme=light] {
            --font-color: #222222;
            --bg-color: #f2f3f7;
            --input-bg-color: #f2f3f7;
            --input-hover-bg-color: #ebebeb;
            --input-active-bg-color: #ffffff;
            --button-shadow: -6px -6px 8px rgba(255, 255, 255, 0.9), 5px 5px 8px rgba(0, 0, 0, 0.07);
          }
          .weather-widget .title, .weather-widget h3 {
            color: var(--font-color);
          }
          .weather-widget .title {
            font-size: 20px;
            margin: 0 0 25px
          }
          .weather-widget h3 {
            font-size: 16px;
            margin: 0 0 15px
          }
          .weather-widget {
            font-family: inherit;
            box-shadow: -2px -2px 4px 0 #ffffff, 5px 5px 30px 0 rgb(0, 0, 0, 0.25);
            background: var(--bg-color);
            border-radius: 20px;
            max-width: 350px;
            padding: 30px;
          }
          .weather-widget .reset-button-container {
            text-align: center;
            width: 100%;
          }
          .weather-widget .reset-button {
            display: none;
            font-size: 16px;
            color: var(--font-color);
            cursor: pointer;
            background: var(--input-bg-color);
            border: none;
            box-shadow: var(--button-shadow);
            border-radius: 15px;
            padding: 10px 20px;
            margin-top: 20px;
            max-width: 150px;
            width: 100%;
          }
          .weather-widget .reset-button:hover {
            background: var(--input-hover-bg-color);
          }
          .weather-widget .reset-button:active {
            background: var(--input-active-bg-color);
          }
          .weather-widget .error-message {
            display: none;
            font-size: 12px;
            color: var(--error-color);
          }
          .weather-widget .error-message p {
            margin: 5px 0;
          }
          .weather-widget h2,weather-widget h3 {
            color: var(--font-color);
          }
          .weather-input-container {
            background: var(--input-bg-color);
            border-radius: 15px;
            box-shadow: var(--button-shadow);
            display: flex;
            width: 100%;
          }
          .weather-input-container input[type="text"] {
            font-size: 14px;
            color: var(--font-color);
            background: var(--input-bg-color);
            box-sizing: border-box;
            border-radius: 15px;
            padding: 10px;
            height: 50px;
            width: 100%;
            outline: none;
            border: 0;
          }
          .weather-input-container button {
            display: flex;
            align-items: center;
            background: var(--input-bg-color);
            border: none;
            cursor: pointer;
            margin-right: 10px;
          }
          .weather-input-container button:disabled {
            cursor: auto;
          }
          .weather-input-container button svg {
            fill: var(--font-color);
          }
          .weather-input-container button:disabled svg {
            fill: var(--input-bg-color);
          }
          .weather-input-container label {
            width: 100%
          }
          .weather-widget-result {
            display: flex;
            flex-wrap: wrap;
          }
          .weather-widget-result div:not(:last-child) {
            font-size: 16px;
            background: var(--input-bg-color);
            border-radius: 15px;
            box-shadow: var(--button-shadow);
            color: var(--font-color);
            margin-bottom: 20px;
            padding: 15px;
            width: calc(50% - 40px);
            transition: all 100ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform: translateY(40px);
            opacity: 0;
            text-align: center;
          }
          .weather-widget-result.show-result div:not(:last-child) {
            transform: translateY(0);
            opacity: 1;
          }
          .weather-widget-result div:not(:last-child) p {
            color: #ffffff;
            font-weight: 600;
            font-size: 16px;
            margin: 0;
            text-shadow: 2px 2px 10px rgb(0 0 0 / 65%);
            text-align: left;
          }
          .weather-widget-result div:nth-child(odd) {
            background: #2980B9;
            background: -webkit-linear-gradient(to bottom, #FFFFFF, #6DD5FA, #2980B9);
            background: linear-gradient(to bottom, #FFFFFF, #6DD5FA, #2980B9);
            margin-right: 10px;
          }
          .weather-widget-result div:nth-child(even) {
            background: #e65c00;
            background: -webkit-linear-gradient(to left, #e65c00, #f9d423);
            background: linear-gradient(to left, #e65c00, #f9d423);
            margin-left: 10px;
          }
          .weather-widget-result div:nth-child(odd) svg {
            fill: #20638e;
          }
          .weather-widget-result div:nth-child(even) svg {
            fill: #bb4b00;
          }
          .weather-widget-result div:first-child, .weather-widget-result div:nth-child(2) {
            margin-top: 30px;
          }
          .weather-widget-result div:last-child {
            display: flex;
            align-items: center;
            background: var(--bg-color);
            color: var(--font-color);
            font-size: 16px;
            margin: 15px 0 0;
            width: 100%;
          }
          .weather-widget-result div:last-child svg {
            fill: var(--font-color);
            margin-left: 10px;
          }
        </style>
        <h2 class="title">${title}</h2>
        <div>
          <h3 class="">Enter all values separated by comma</h3>
          <div class="weather-input-container">
            <label>
              <input class="weather-widget-input" type="text" placeholder="Example: sunny, clear" />
            </label>
            <button disabled class="submit-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/><path d="M9.293 8.707 12.586 12l-3.293 3.293 1.414 1.414L15.414 12l-4.707-4.707-1.414 1.414z"/></svg></button>
          </div>
          <span class="error-message">
            <p>One or more values are invalid</p>
            <p>Accepted values: clear, sunny, cloudy, rainy, windy, thunderstorms</p>
          </span>
          <div class="weather-widget-result"></div>
          <div class="reset-button-container"><button class="reset-button">Reset</button></div>
        </div>
      `;

      // binding methods
      this.getMinimumUmbrellas = this.getMinimumUmbrellas.bind(this);
      this.submit = this.submit.bind(this);
      this.validateInput = this.validateInput.bind(this);
      this.resetWidget = this.resetWidget.bind(this);
      this.getIcon = this.getIcon.bind(this);
      this.getWeatherArray = this.getWeatherArray.bind(this);
      this.addWeatherRows = this.addWeatherRows.bind(this);

      // appending the container to the shadow DOM
      shadow.appendChild(weatherWidgetContainer);
    }

    getIcon(weather) {
      switch (weather) {
        case 'clear':
          return `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100" height="100" xml:space="preserve"><path d="M43.333 10H50v11.666h-6.667zM10 43.333h11.667V50H10zM66.7 31.345l-4.715-4.712 8.25-8.252 4.714 4.713zM31.348 26.627l-4.713 4.713-8.249-8.249L23.1 18.38zM66.667 43.333c-.102 0-.195.02-.297.02-1.582-9.466-9.788-16.687-19.703-16.687-11.045 0-20 8.952-20 19.997 0 4.775 1.68 9.157 4.473 12.601-4.675 2.949-7.807 8.125-7.807 14.069C23.333 82.539 30.794 90 40 90h26.667C79.554 90 90 79.551 90 66.666c0-12.891-10.446-23.333-23.333-23.333zm-33.334 3.33c0-7.36 5.971-13.33 13.334-13.33 6.578 0 12.012 4.772 13.102 11.038a23.393 23.393 0 0 0-14.593 13.193c-1.641-.533-3.356-.898-5.176-.898-.632 0-1.23.117-1.843.183-2.923-2.442-4.824-6.075-4.824-10.186zm33.334 36.67H40c-5.524 0-10-4.479-10-10 0-5.527 4.476-10 10-10s10 4.473 10 10h6.667c0-4.941-2.188-9.329-5.6-12.376C53.405 54.576 59.476 50 66.667 50c9.205 0 16.666 7.461 16.666 16.666 0 9.206-7.461 16.667-16.666 16.667z"/></svg>
          `;
        case 'sunny':
          return `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100" height="100" xml:space="preserve"><path d="M90 16.392 65.41 30.587a19.995 19.995 0 0 0-2.662-2.663L73.096 10h-7.698l-8.432 14.606a19.676 19.676 0 0 0-3.633-.973V10h-6.666v13.633a19.768 19.768 0 0 0-3.631.971L34.604 10h-7.698l10.346 17.924a20.297 20.297 0 0 0-2.663 2.662L10 16.388v7.698l21.271 12.283A19.81 19.81 0 0 0 30.3 40H10v6.667h20.3c.309 1.836.934 3.555 1.707 5.189a23.255 23.255 0 0 0-5.074 11.478h-3.599C15.97 63.333 10 69.304 10 76.667 10 84.029 15.97 90 23.333 90h53.333C84.03 90 90 84.029 90 76.667c0-7.363-5.97-13.334-13.333-13.334h-3.601a23.25 23.25 0 0 0-5.074-11.478c.774-1.634 1.399-3.35 1.709-5.189H90V40H69.701a20.147 20.147 0 0 0-.971-3.63L90 24.09v-7.698zM50 30c7.359 0 13.334 5.969 13.334 13.333 0 1.331-.254 2.59-.619 3.802C59.056 44.742 54.7 43.333 50 43.333s-9.059 1.409-12.716 3.802c-.363-1.212-.617-2.471-.617-3.802C36.667 35.969 42.635 30 50 30zm26.667 39.999a6.668 6.668 0 0 1 0 13.335H23.333a6.668 6.668 0 0 1 0-13.335h10v-3.332C33.333 57.463 40.796 50 50 50c9.202 0 16.667 7.463 16.667 16.667v3.332h10z"/></svg>
          `;
        case 'cloudy':
          return `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100" height="100" xml:space="preserve"><path d="M90 43.333H58.333a3.333 3.333 0 0 1 0-6.666H65v-8.334c0-2.764 2.236-5 5-5s5 2.236 5 5h6.667V25A8.332 8.332 0 0 1 90 16.667V10c-5.996 0-11.133 3.542-13.532 8.63A11.6 11.6 0 0 0 70 16.667c-6.445 0-11.667 5.221-11.667 11.666V30c-5.523 0-10 4.476-10 10 0 5.521 4.476 10 10 10H90v-6.667z"/><path d="M73.333 70v-1.668c0-6.445-5.221-11.666-11.666-11.666-2.396 0-4.616.727-6.469 1.963-2.174-4.609-6.604-7.92-11.876-8.505 0-.046.012-.082.012-.124 0-7.363-5.969-13.333-13.332-13.333-.057 0-.11.016-.167.016-.832-7.496-7.113-13.35-14.833-13.35-1.763 0-3.436.337-5.001.898v7.473c1.395-1.055 3.114-1.704 5-1.704a8.332 8.332 0 0 1 8.332 8.333v5h6.668A6.665 6.665 0 0 1 36.666 50c0 .319-.045.617-.089.924-2.997 1.094-5.504 3.129-7.251 5.742H10v6.666h16.665c-7.363 0-13.332 5.971-13.332 13.334S19.302 90 26.665 90h46.668c5.524 0 10-4.48 10-10 0-5.525-4.476-10-10-10zm0 13.332H26.665c-3.682 0-6.665-2.984-6.665-6.666S22.983 70 26.665 70h6.668v-5a8.332 8.332 0 0 1 8.332-8.334A8.333 8.333 0 0 1 50 65v3.332h6.667c0-2.764 2.236-5 5-5s5 2.236 5 5v8.334h6.666a3.333 3.333 0 1 1 0 6.666z"/></svg>
          `;
        case 'rainy':
          return `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100" height="100" xml:space="preserve"><path d="m27.975 63.334-4.446 13.333h7.028L35 63.334zM73.333 23.333C70.071 15.501 62.347 10 53.333 10c-12.421 0-22.825 8.503-25.794 20h-4.206C15.97 30 10 35.97 10 43.333c0 7.364 5.97 13.333 13.333 13.333h50C82.539 56.667 90 49.206 90 40s-7.461-16.667-16.667-16.667zm0 26.667h-50c-3.679 0-6.667-2.995-6.667-6.667a6.672 6.672 0 0 1 6.667-6.667h10c0-11.048 8.955-20 20-20 7.702 0 13.991 5.853 14.831 13.333h5.169c5.515 0 10 4.486 10 10 0 5.516-4.485 10.001-10 10.001z"/><circle cx="23.333" cy="86.667" r="3.333"/><path d="m47.025 90 4.447-13.333h-7.029L40 90z"/><circle cx="51.667" cy="66.667" r="3.333"/><path d="m67.976 63.334-4.448 13.333h7.029L75 63.334z"/><circle cx="63.333" cy="86.667" r="3.333"/></svg>
          `;
        case 'windy':
          return `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100" height="100" xml:space="preserve"><path d="M46.667 70H10v6.667h36.667a3.333 3.333 0 1 1 0 6.666H40V90h6.667c5.521 0 10-4.473 10-10 0-5.521-4.479-10-10-10zM53.333 56.667a6.667 6.667 0 0 0 0-13.334h-6.667v-6.667h6.667c7.36 0 13.334 5.97 13.334 13.333 0 7.37-5.974 13.333-13.334 13.333H10v-6.666h43.333z"/><path d="M73.333 23.333C70.071 15.501 62.347 10 53.333 10c-12.421 0-22.825 8.502-25.794 20h-4.206C15.97 30 10 35.97 10 43.333V50h6.667v-6.667a6.671 6.671 0 0 1 6.667-6.667h10c0-11.048 8.955-20 20-20 7.702 0 13.991 5.853 14.831 13.333h5.169c5.515 0 10 4.486 10 10s-4.485 10-10 10v6.667C82.539 56.667 90 49.206 90 40s-7.461-16.667-16.667-16.667z"/></svg>
          `;
        case 'thunderstorms':
          return `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100" height="100" xml:space="preserve"><path d="M60 36.667H47.777L40 60h10l-6.667 20 20-26.667h-10z"/><path d="M33.333 40c0-11.045 8.955-20 20-20 7.702 0 13.991 5.853 14.831 13.333h5.169c5.515 0 10 4.485 10 10 0 5.514-4.485 10-10 10H70V60h3.333C82.539 60 90 52.539 90 43.333c0-9.206-7.461-16.667-16.667-16.667-3.262-7.829-10.986-13.333-20-13.333-12.42 0-22.827 8.506-25.792 20h-4.207C15.97 33.333 10 39.303 10 46.667 10 54.03 15.97 60 23.333 60h10v-6.667h-10a6.674 6.674 0 0 1-6.667-6.667 6.675 6.675 0 0 1 6.667-6.667h10zM14.445 66.667 10 80h7.028l4.445-13.333zM76.309 66.667 71.862 80h7.025l4.446-13.333zM26.305 73.333 21.86 86.667h7.028l4.445-13.334zM59.642 73.333l-4.447 13.334h7.029l4.443-13.334z"/></svg>
          `;
        default:
          return weather;
      }
    }

    // assign input value to an array
    getWeatherArray(value) {
      return value
        .replace(/['"\[\]\}]+/g, '')
        .split(',')
        .map((item) => item.trim().toLowerCase())
        .filter((item) => item !== '');
    }

    // create the weather cards
    addWeatherRows(weatherArray) {
      const resultContainer = this.shadowRoot.querySelector(
        '.weather-widget-result'
      );

      weatherArray.forEach((weather) => {
        const div = document.createElement('div');
        div.innerHTML = `${this.getIcon(weather)} <p>${weather}</p>`;

        resultContainer.appendChild(div);
      });
    }

    // return the minimum umbrellas needed
    getMinimumUmbrellas(weatherArray) {
      let homeUmbrellas = 0;
      let officeUmbrellas = 0;

      weatherArray.forEach((item, index) => {
        if (item === 'rainy' || item === 'thunderstorms') {
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
      });

      return homeUmbrellas + officeUmbrellas;
    }

    // submit input and display result
    submit() {
      const resetButton = this.shadowRoot.querySelector('.reset-button');
      const textInput = this.shadowRoot.querySelector('.weather-widget-input');
      const resultContainer = this.shadowRoot.querySelector(
        '.weather-widget-result'
      );

      resultContainer.innerHTML = '';
      resultContainer.classList.remove('show-result');

      if (textInput.value) {
        const weatherArray = this.getWeatherArray(textInput.value);
        const totalUmbrella = this.getMinimumUmbrellas(weatherArray);
        const totalUmbrellaText = `Umbrella(s) needed: ${totalUmbrella}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M22 13v-1a10 10 0 0 0-20 0v1h9v7a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1h-2v1h-1v-7zM12 4a8.013 8.013 0 0 1 7.938 7H4.062A8.013 8.013 0 0 1 12 4z"/></svg>
        `;
        const totalUmbrellaTextContainer = document.createElement('div');

        this.addWeatherRows(weatherArray);
        totalUmbrellaTextContainer.innerHTML = totalUmbrellaText;
        resultContainer.appendChild(totalUmbrellaTextContainer);
        resetButton.style.display = 'inline-block';
        setTimeout(() => {
          resultContainer.classList.add('show-result');
        }, 100);
      }
    }

    // input validation
    validateInput(e) {
      const resetButton = this.shadowRoot.querySelector('.reset-button');
      const submitButton = this.shadowRoot.querySelector('.submit-button');
      const errorMessage = this.shadowRoot.querySelector('.error-message');
      const allowed = [
        'clear',
        'sunny',
        'cloudy',
        'rainy',
        'windy',
        'thunderstorms',
      ];

      if (e.target.value) {
        const weatherArray = this.getWeatherArray(e.target.value);

        if (weatherArray.some((item) => !allowed.includes(item))) {
          resetButton.style.display = 'inline-block';
          errorMessage.style.display = 'block';
          submitButton.setAttribute('disabled', true);
        } else {
          resetButton.style.display = 'none';
          errorMessage.style.display = 'none';
          submitButton.removeAttribute('disabled');

          if (e.key === 'Enter') {
            this.submit();
          }
        }
      } else {
        resetButton.style.display = 'none';
        errorMessage.style.display = 'none';
        submitButton.setAttribute('disabled', true);
      }
    }

    resetWidget() {
      const resetButton = this.shadowRoot.querySelector('.reset-button');
      const submitButton = this.shadowRoot.querySelector('.submit-button');
      const errorMessage = this.shadowRoot.querySelector('.error-message');
      const textInput = this.shadowRoot.querySelector('.weather-widget-input');
      const resultContainer = this.shadowRoot.querySelector(
        '.weather-widget-result'
      );

      errorMessage.style.display = 'none';
      resetButton.style.display = 'none';
      submitButton.setAttribute('disabled', true);
      textInput.value = '';
      resultContainer.innerHTML = '';
    }

    // fires after the element has been attached to the DOM
    connectedCallback() {
      const submitButton = this.shadowRoot.querySelector('.submit-button');
      const weatherWidgetInput = this.shadowRoot.querySelector(
        '.weather-widget-input'
      );
      const resetButton = this.shadowRoot.querySelector('.reset-button');

      submitButton.addEventListener('click', this.submit, false);
      weatherWidgetInput.addEventListener('keyup', this.validateInput, false);
      resetButton.addEventListener('click', this.resetWidget, false);
    }

    // getters
    get title() {
      return this.getAttribute('title') || '';
    }

    get theme() {
      return this.getAttribute('theme') || '';
    }
  }

  customElements.define('weather-widget', WeatherWidget);
})();
