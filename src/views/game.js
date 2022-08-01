import { css, html, LitElement } from 'lit';
import { Router } from '@vaadin/router';
import '../components/status-card.js';
import { getCurrentUser, setUserList } from '../services/main.js';

class Game extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .wrapper {
        padding: 25px;
      }
      /* 
      @media only screen and (min-width: 758px) {
        .wrapper {
          padding: 50px;
        }
      } */
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
        ?
         html`
            <status-card .currentUser=${this.currentUser}></status-card>
            <button .onclick=${() => this.logout()}>logout</button>
          `
        : html``}
    `;
  }

  logout() {
    setUserList(getCurrentUser());
    this.isLoading = false;

    Router.go({
      pathname: '/home',
    });
  }
}

customElements.define('game-view', Game);
