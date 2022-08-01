import { css, html, LitElement } from 'lit';
import { Router } from '@vaadin/router';
import { loginUser } from '../services/main.js';

class Home extends LitElement {
  static get styles() {
    return [
      css`
        .container,
        .rules {
          display: flex;
          flex-direction: column;
        }
      `,
    ];
  }

  static get properties() {
    return {
      isLoading: Boolean,
      placeholder: String,
      username: String,
    };
  }

  constructor() {
    super();
    this.isLoading = false;
    this.placeholder = 'Nombre de Usuario';
    this.username = '';
  }

  //   async connectedCallback() {
  //     super.connectedCallback();
  //   }

  render() {
    return html`
      ${!this.isLoading
        ? html`
            <div class="container">
              <h2>Welcome to the gold mine</h2>
              <div class="rules">
                <span>Rules are simple</span>
                <span>Login with your username and start diggin'</span>
              </div>

              <vaadin-text-field
                label="Username"
                placeholder="username"
                value="maverick"
              >
                <vaadin-icon slot="prefix" icon="vaadin:user"></vaadin-icon>
              </vaadin-text-field>
              <input
                type="search"
                placeholder="${this.placeholder}"
                class="search__input"
                @keyup=${this.handleKeyUp}
              />
              <button .onclick=${() => this.login()}>login</button>
              <button .onclick=${() => this.goToRanking()}>See Ranking</button>
            </div>
          `
        : html``}
    `;
  }

  handleKeyUp(event) {
    const inputValue = event.target.value;

    if (event.keyCode === 13 || inputValue === '') {
      this.login();
    }

    this.username = inputValue;
  }

  login() {
    loginUser(this.username);
    this.isLoading = false;

    Router.go({
      pathname: '/game',
    });
  }

  goToRanking() {
    this.isLoading = false;

    Router.go({
      pathname: '/ranking',
    });
  }
}

customElements.define('home-view', Home);
