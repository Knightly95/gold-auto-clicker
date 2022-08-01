import { css, html, LitElement } from 'lit';
import { Router } from '@vaadin/router';
import { getUserList } from '../services/main.js';

class Ranking extends LitElement {
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
      userList: [],
    };
  }

  constructor() {
    super();
    this.isLoading = true;
  }

  async connectedCallback() {
    super.connectedCallback();
    const parsedUserList = [];
    const userListMap = await getUserList();

    userListMap.forEach(value => parsedUserList.push(value));

    this.userList = parsedUserList;
    this.isLoading = false;
  }

  render() {
    return html`
      ${!this.isLoading && !!this.userList
        ? html`
            ${this.userList.map(
              user => html`<h2>${user.username} : gold: ${user.clicks}</h2>`
            )}
            <button .onclick=${() => this.logout()}>logout</button>
          `
        : html``}
    `;
  }

  logout() {
    this.isLoading = false;

    Router.go({
      pathname: '/home',
    });
  }
}

customElements.define('ranking-view', Ranking);
