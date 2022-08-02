import { LitElement, html, css } from 'lit';
import './components/gold-footer.js';

import { attachRouterOutlet } from './router/router.js';

export class GoldClicker extends LitElement {
  static get styles() {
    return css`
      :host {
        font-family: cursive;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
        justify-content: center;
      }

      main {
        height: 100%;
        width: 100%;
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        max-width: 400px;
        height: 400px;
        border: 1px solid black;
        background-color: #cfe17f;
        box-shadow: 0px 1px 20px #00000085;
      }
    `;
  }

  firstUpdated() {
    const element = this.shadowRoot.querySelector('#main-content');
    attachRouterOutlet(element);
  }

  render() {
    return html`
      <div class="wrapper">
        <main id="main-content"></main>
        <gold-footer></gold-footer>
      </div>
    `;
  }
}

customElements.define('gold-clicker', GoldClicker);
