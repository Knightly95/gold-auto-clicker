import { LitElement, html } from 'lit';
import { setUserList } from '../services/main.js';
import 'fa-icons';

export class StatusCard extends LitElement {
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
    const {
      username,
      clicks,
      autoclicker,
    } = this.currentUser;
    
    return html`
      <h2>${username}</h2>
      <h3>${clicks}</h3>
      <button .onclick=${() => this.getGold()}>Get Gold <fa-icon class="fa-solid fa-coin-vertical"></i>" size="12px"></fa-icon></button>
      <button .disabled=${clicks < autoclicker.cost} .onclick=${() => this.hireGoldMiner()}>
        Hire gold miner (${autoclicker.cost})
      </button>
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
      cost: baseCost * newAmount,
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
    if(amount < 1){
      return;
    }
    console.log("called");
    const addAutoClicks = clicks + amount * power;
    this.currentUser = {
      ...this.currentUser,
      clicks: addAutoClicks,
    };
    setUserList(this.currentUser);
  }
}

customElements.define('status-card', StatusCard);
