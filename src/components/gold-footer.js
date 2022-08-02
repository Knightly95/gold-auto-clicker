import { LitElement, html, css } from 'lit';

export class GoldFooter extends LitElement {
  static get styles() {
    return css`
      .gold-footer {
        padding: 10px 25px;
        background-color: #cc812e;
      }
    `;
  }

  static get properties() {
    return {
      developerInfo: String,
    };
  }

  constructor() {
    super();
    this.developerInfo = 'Luis Villarroel, Sr Front End Developer';
  }

  render() {
    return html` <div class="gold-footer">${this.developerInfo}</div> `;
  }
}

customElements.define('gold-footer', GoldFooter);
