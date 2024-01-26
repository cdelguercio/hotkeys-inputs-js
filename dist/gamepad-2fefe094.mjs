var f = Object.defineProperty;
var p = (i, s, t) => s in i ? f(i, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[s] = t;
var u = (i, s, t) => (p(i, typeof s != "symbol" ? s + "" : s, t), t);
class c {
  constructor() {
    u(this, "handlers", []);
  }
  on(s) {
    this.handlers.push(s);
  }
  off(s) {
    this.handlers = this.handlers.filter((t) => t !== s);
  }
  offAll() {
    this.handlers = [];
  }
  async trigger(s) {
    const t = this.handlers.slice(0).map(async (a) => a(s));
    await Promise.all(t);
  }
}
const A = {
  lastUpdate: Date.now(),
  tick: function(i = 10) {
    var s = Date.now(), t = s - this.lastUpdate;
    return t > 1e3 / i ? (this.lastUpdate = s, !0) : !1;
  }
}, l = () => ({
  changed: new c(),
  pressed: new c(),
  released: new c(),
  repeat: new c()
}), b = {
  init: function(i) {
    let s = {
      id: i.index,
      buttons: i.buttons.length,
      axes: Math.floor(i.axes.length / 2),
      axeValues: [],
      axeStep: 0.15,
      hapticActuator: null,
      vibrationMode: -1,
      vibration: !1,
      mapping: i.mapping,
      buttonActions: {},
      axesActions: {},
      pressed: {},
      vibrate: function(t = 0.75, a = 500) {
        if (this.hapticActuator)
          switch (this.vibrationMode) {
            case 0:
              return this.hapticActuator.pulse(t, a);
            case 1:
              return this.hapticActuator.playEffect("dual-rumble", {
                duration: a,
                strongMagnitude: t,
                weakMagnitude: t
              });
          }
      },
      checkStatus: function() {
        let t = {};
        const a = A.tick(), n = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : [];
        if (n.length) {
          if (t = n[this.id], t.buttons)
            for (let e = 0; e < this.buttons; e++)
              a && this.buttonActions[e].repeat.trigger(t.buttons[e].pressed ? 1 : 0), t.buttons[e].pressed === !0 ? (this.pressed[`button${e}`] || (this.pressed[`button${e}`] = !0, this.buttonActions[e].pressed.trigger(1)), this.buttonActions[e].changed.trigger(1)) : this.pressed[`button${e}`] && (delete this.pressed[`button${e}`], this.buttonActions[e].released.trigger(0));
          if (t.axes)
            for (let e = 0; e < this.axes; e++) {
              const r = Math.floor(e / 2), h = e % 2 === 0 ? "horizontal" : "vertical";
              let o = t.axes[e];
              Math.abs(t.axes[e]) <= this.axeStep && (o = 0), Math.abs(this.axeValues[e]) > this.axeStep ? (o === 0 || a) && this.axesActions[r][h].repeat.trigger(o) : a && Math.abs(o) > this.axeStep && this.axesActions[r][h].repeat.trigger(o), o === 0 && this.axeValues[e] !== 0 ? (this.axesActions[r][h].changed.trigger(o), this.axesActions[r][h].released.trigger(o), this.axeValues[e] = o) : Math.abs(this.axeValues[e] - o) < this.axeStep || (this.axeValues[e] === 0 ? (this.axesActions[r][h].changed.trigger(o), this.axesActions[r][h].pressed.trigger(o), this.axeValues[e] = o) : (this.axesActions[r][h].changed.trigger(o), this.axeValues[e] = o)), o === 0 && (this.axeValues[e] = 0);
            }
        }
      },
      on: function(t, a, n = "changed") {
        if (t < 0) {
          const e = Math.floor((Math.abs(t) - 1) / 2), r = (Math.abs(t) - 1) % 2 === 0 ? "horizontal" : "vertical";
          this.axesActions[e][r][n].on(a);
        } else
          this.buttonActions[t][n].on(a);
        return this;
      },
      off: function(t) {
        if (t < 0) {
          const a = Math.floor((Math.abs(t) - 1) / 2), n = (Math.abs(t) - 1) % 2 === 0 ? "horizontal" : "vertical";
          this.axesActions[a][n].changed.offAll(), this.axesActions[a][n].pressed.offAll(), this.axesActions[a][n].released.offAll(), this.axesActions[a][n].repeat.offAll();
        } else
          this.buttonActions[t].changed.offAll(), this.buttonActions[t].pressed.offAll(), this.buttonActions[t].released.offAll(), this.buttonActions[t].repeat.offAll();
        return this;
      }
    };
    for (let t = 0; t < s.buttons; t++)
      s.buttonActions[t] = l();
    for (let t = 0; t < s.axes; t++)
      s.axesActions[t] = {
        vertical: l(),
        horizontal: l()
      };
    return i.hapticActuators ? typeof i.hapticActuators.pulse == "function" ? (s.hapticActuator = i.hapticActuators, s.vibrationMode = 0, s.vibration = !0) : i.hapticActuators[0] && typeof i.hapticActuators[0].pulse == "function" && (s.hapticActuator = i.hapticActuators[0], s.vibrationMode = 0, s.vibration = !0) : i.vibrationActuator && typeof i.vibrationActuator.playEffect == "function" && (s.hapticActuator = i.vibrationActuator, s.vibrationMode = 1, s.vibration = !0), s.axeValues = [...i.axes], s;
  }
};
export {
  c as L,
  b as g
};
