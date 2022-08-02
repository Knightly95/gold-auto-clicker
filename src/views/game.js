import { css, html, LitElement } from 'lit';
import { Router } from '@vaadin/router';
import '../components/status-card.js';
import { getCurrentUser, setUserList } from '../services/main.js';

class Game extends LitElement {
  static get styles() {
    return css`
      .game {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-evenly;
      }

      .game__wrapper {
        height: 80%;
      }

      .game__btns {
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
      isLoading: Boolean,
      currentUser: {
        username: String,
        clicks: Number,
        clickPower: Number,
        autoclicker: Object,
      },
    };
  }

  constructor() {
    super();
    this.isLoading = true;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.currentUser = await getCurrentUser();
    this.isLoading = false;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.interval);
  }

  render() {
    return html`
      ${!this.isLoading && !!this.currentUser
        ? html`
            <div class="game">
              <status-card
                class="game__wrapper"
                .currentUser=${this.currentUser}
              ></status-card>
              <div class="game__btns">
                <button class="btn" .onclick=${() => this.logout()}>
                  logout
                </button>
              </div>
            </div>
          `
        : html``}
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  logout() {
    setUserList(getCurrentUser());
    Router.go({
      pathname: '/home',
    });
  }
}

customElements.define('game-view', Game);
