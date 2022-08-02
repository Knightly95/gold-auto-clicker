import { LitElement, html, css } from 'lit';
import { setUserList } from '../services/main.js';
import 'fa-icons';
import { capitalize } from '../utils/helpers.js';

export class StatusCard extends LitElement {
  static get styles() {
    return css`
      .status-card {
        display: flex;
        flex-direction: column;
        height: 100%;
        text-align: center;
        justify-content: space-between;
      }

      .status-card__btns {
        display: flex;
        align-items: center;
      }
      .status-card__username {
        font-size: 30px;
        font-weight: bold;
      }
      .status-card__counters {
        font-size: 20px;
      }

      .status-card__username,
      .status-card__counters {
        width: 80%;
        margin: 0 auto;
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
      currentUser: {
        username: String,
        clicks: Number,
        clickPower: Number,
        autoclicker: Object,
      },
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    this.interval = window.setInterval(() => {
      this.autoclickerCall();
    }, 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.interval);
  }

  render() {
    const { username, clicks, autoclicker } = this.currentUser;

    return html`
      <div class="status-card">
        <div class="status-card__username">${capitalize(username)}</div>
        <div class="status-card__counters">${clicks} gold</div>
        <div class="status-card__btns">
          <button class="btn" .onclick=${() => this.getGold()}>Mine</button>
          <button
            class="btn"
            .disabled=${clicks < autoclicker.cost}
            .onclick=${() => this.hireGoldMiner()}
          >
            Hire gold miner (${autoclicker.cost})
          </button>
        </div>
        <div class="status-card__counters">${autoclicker.amount} Miners</div>
      </div>
    `;
  }

  getGold() {
    const clicks =
      this.currentUser.clicks + 1 * (this.currentUser.clickPower || 1);
    this.currentUser = {
      ...this.currentUser,
      clicks,
    };
    setUserList(this.currentUser);
  }

  hireGoldMiner() {
    const {
      clicks,
      autoclicker: { amount, cost, baseCost },
    } = this.currentUser;
    if (clicks < cost) {
      return;
    }
    const newAmount = amount + 1;
    const autoclicker = {
      ...this.currentUser.autoclicker,
      amount: newAmount,
      cost: baseCost + baseCost * newAmount,
    };
    this.currentUser = {
      ...this.currentUser,
      clicks: clicks - cost,
      autoclicker,
    };
    setUserList(this.currentUser);
  }

  autoclickerCall() {
    const {
      clicks,
      autoclicker: { amount, power },
    } = this.currentUser;
    if (amount < 1) {
      return;
    }
    const addAutoClicks = clicks + amount * power;
    this.currentUser = {
      ...this.currentUser,
      clicks: addAutoClicks,
    };
    setUserList(this.currentUser);
  }
}

customElements.define('status-card', StatusCard);
