import { css, html, LitElement } from 'lit';
import { Router } from '@vaadin/router';
import { loginUser } from '../services/main.js';

class Home extends LitElement {
  static get styles() {
    return css`
      .home {
        display: flex;
        height: 100%;
        justify-content: space-evenly;
        flex-direction: column;
      }

      .home__rules,
      .home__username {
        width: 80%;
        margin: 0 auto;
      }

      .home__rules {
        display: flex;
        flex-direction: column;
      }

      .home__title {
        font-size: 20px;
        padding: 10px;
        text-align: center;
      }

      .home__username {
        padding: 10px;
        border-radius: 5px;
      }

      .home__btns {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .btn {
        border-radius: 5px;
        padding: 10px;
        width: 50%;
        margin: 10px;
      }
    `;
  }

  static get properties() {
    return {
      placeholder: String,
      username: String,
    };
  }

  constructor() {
    super();
    this.placeholder = 'Username';
    this.username = '';
  }

  render() {
    return html`
      <div class="home">
        <div class="home__title">Welcome to the Gold Mine!</div>
        <div class="home__rules">
          <span>Rules are simple:</span>
          <span>Login with your username and start diggin'</span>
        </div>
        <input
          class="home__username"
          type="search"
          placeholder="${this.placeholder}"
          @keyup=${this.handleKeyUp}
        />
        <div class="home__btns">
          <button
            class="btn"
            .disabled=${!this.username}
            .onclick=${() => this.login()}
          >
            login
          </button>
          <button class="btn" .onclick=${() => this.goToRanking()}>
            See Ranking
          </button>
        </div>
      </div>
    `;
  }

  handleKeyUp(event) {
    const inputValue = event.target.value;
    if (event.keyCode === 13) {
      this.login();
    }
    this.username = inputValue;
  }

  login() {
    if (this.username) {
      loginUser(String(this.username).toLowerCase());

      Router.go({
        pathname: '/game',
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  goToRanking() {
    Router.go({
      pathname: '/ranking',
    });
  }
}

customElements.define('home-view', Home);
