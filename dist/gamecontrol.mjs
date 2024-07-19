import { L as o, g as s } from "./gamepad-bf84a617.mjs";
const t = {
  gamepads: {},
  axeThreshold: [1],
  isReady: () => navigator.getGamepads && typeof navigator.getGamepads == "function" || navigator.getGamepads && typeof navigator.webkitGetGamepads == "function" || !1,
  onConnect: new o(),
  onDisconnect: new o(),
  onBeforeCycle: new o(),
  onAfterCycle: new o(),
  getGamepads() {
    return this.gamepads;
  },
  getGamepad(n) {
    return this.gamepads[n] ? this.gamepads[n] : null;
  },
  checkStatus: () => {
    const n = window.requestAnimationFrame || window.webkitRequestAnimationFrame, e = Object.keys(t.gamepads);
    t.onBeforeCycle.trigger();
    for (const a of e)
      t.gamepads[a].checkStatus();
    t.onAfterCycle.trigger(), e.length > 0 && n(t.checkStatus);
  },
  init() {
    window.addEventListener("gamepadconnected", (n) => {
      const e = n.gamepad || n.detail.gamepad;
      if (window.gamepads || (window.gamepads = {}), e) {
        if (!window.gamepads[e.index]) {
          window.gamepads[e.index] = e;
          const a = s.init(e);
          this.gamepads[a.id] = a, this.onConnect.trigger(this.gamepads[a.id]);
        }
        Object.keys(this.gamepads).length === 1 && this.checkStatus();
      }
    }), window.addEventListener("gamepaddisconnected", (n) => {
      const e = n.gamepad || n.detail.gamepad;
      e && (this.onDisconnect.trigger(this.gamepads[e.index]), delete window.gamepads[e.index], delete this.gamepads[e.index]);
    });
  },
  on(n, e) {
    switch (n) {
      case "connect":
        this.onConnect.on(e);
        break;
      case "disconnect":
        this.onDisconnect.on(e);
        break;
      case "beforeCycle":
        this.onBeforeCycle.on(e);
        break;
      case "afterCycle":
        this.onAfterCycle.on(e);
        break;
      default:
        console.error("gamepad: unknown custom event");
        break;
    }
    return this;
  },
  off(n, e) {
    switch (n) {
      case "connect":
        this.onConnect.off(e);
        break;
      case "disconnect":
        this.onDisconnect.off(e);
        break;
      case "beforeCycle":
        this.onBeforeCycle.off(e);
        break;
      case "afterCycle":
        this.onAfterCycle.off(e);
        break;
      default:
        console.error("gamepad: unknown event");
        break;
    }
    return this;
  }
};
t.init();
export {
  t as default
};
