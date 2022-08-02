import { css, html, LitElement } from 'lit';
import { Router } from '@vaadin/router';
import { getUserList } from '../services/main.js';
import { capitalize } from '../utils/helpers.js';

class Ranking extends LitElement {
  static get styles() {
    return css`
      .ranking {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        text-align: center;
      }

      .ranking__position {
        font-size: 20px;
        display: flex;
        justify-content: space-between;
        padding: 10px 30px;
      }

      .ranking__btns {
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

    this.userList = parsedUserList
      .sort((diggerA, diggerB) => diggerA.clicks - diggerB.clicks)
      .reverse();
    this.isLoading = false;
  }

  render() {
    return html`
      ${!this.isLoading && !!this.userList
        ? html`
            <div class="ranking">
              <h3>Ranking</h3>
              <div>
                ${this.userList.map(
                  user => html` <div class="ranking__position">
                    <span> ${capitalize(user.username)}</span>
                    <span> ${user.clicks} gold </span>
                  </div>`
                )}
              </div>
              <div class="ranking__btns">
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
    Router.go({
      pathname: '/home',
    });
  }
}

customElements.define('ranking-view', Ranking);
