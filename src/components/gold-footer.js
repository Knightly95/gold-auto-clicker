import { LitElement, html } from 'lit';

export class GoldFooter extends LitElement {
  static get properties() {
    return {
      title: { type: String },
    };
  }

  render() {
    return html`
      <span>Luis Villarroel, Sr Front End Developer</span>
    `;
  }
}

customElements.define('gold-footer', GoldFooter);
