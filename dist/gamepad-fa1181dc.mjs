var f = Object.defineProperty;
var p = (i, e, t) => e in i ? f(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var u = (i, e, t) => (p(i, typeof e != "symbol" ? e + "" : e, t), t);
class c {
  constructor() {
    u(this, "handlers", []);
  }
  on(e) {
    this.handlers.push(e);
  }
  off(e) {
    this.handlers = this.handlers.filter((t) => t !== e);
  }
  offAll() {
    this.handlers = [];
  }
  async trigger(e) {
    const t = this.handlers.slice(0).map(async (a) => a(e));
    await Promise.all(t);
  }
}
const b = {
  lastUpdate: Date.now(),
  tick: function(i = 10) {
    var e = Date.now(), t = e - this.lastUpdate;
    return t > 1e3 / i ? (this.lastUpdate = e, !0) : !1;
  }
}, l = () => ({
  changed: new c(),
  pressed: new c(),
  released: new c(),
  repeat: new c()
}), d = {
  init: function(i) {
    let e = {
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
        const a = b.tick(), n = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : [];
        if (n.length) {
          if (t = n[this.id], t.buttons)
            for (let s = 0; s < this.buttons; s++)
              console.log(t.buttons[s]), a && (t.buttons[s].value === void 0 ? (console.log("gp.buttons[x].value is undefined", t.buttons[s]), this.buttonActions[s].repeat.trigger(t.buttons[s].pressed ? 1 : 0)) : (this.pressed[`button${s}`] || t.buttons[s].pressed) && this.buttonActions[s].repeat.trigger(t.buttons[s].value)), t.buttons[s].pressed ? (this.pressed[`button${s}`] || (this.pressed[`button${s}`] = !0, this.buttonActions[s].pressed.trigger(1)), this.buttonActions[s].changed.trigger(1)) : this.pressed[`button${s}`] && (delete this.pressed[`button${s}`], this.buttonActions[s].released.trigger(0), this.buttonActions[s].repeat.trigger(0));
          if (t.axes)
            for (let s = 0; s < this.axes; s++) {
              const r = Math.floor(s / 2), h = s % 2 === 0 ? "horizontal" : "vertical";
              let o = t.axes[s];
              Math.abs(t.axes[s]) <= this.axeStep && (o = 0), Math.abs(this.axeValues[s]) > this.axeStep ? (o === 0 || a) && this.axesActions[r][h].repeat.trigger(o) : a && Math.abs(o) > this.axeStep && this.axesActions[r][h].repeat.trigger(o), o === 0 && this.axeValues[s] !== 0 ? (this.axesActions[r][h].changed.trigger(o), this.axesActions[r][h].released.trigger(o), this.axeValues[s] = o) : Math.abs(this.axeValues[s] - o) < this.axeStep || (this.axeValues[s] === 0 ? (this.axesActions[r][h].changed.trigger(o), this.axesActions[r][h].pressed.trigger(o), this.axeValues[s] = o) : (this.axesActions[r][h].changed.trigger(o), this.axeValues[s] = o)), o === 0 && (this.axeValues[s] = 0);
            }
        }
      },
      on: function(t, a, n = "changed") {
        if (t < 0) {
          const s = Math.floor((Math.abs(t) - 1) / 2), r = (Math.abs(t) - 1) % 2 === 0 ? "horizontal" : "vertical";
          this.axesActions[s][r][n].on(a);
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
    for (let t = 0; t < e.buttons; t++)
      e.buttonActions[t] = l();
    for (let t = 0; t < e.axes; t++)
      e.axesActions[t] = {
        vertical: l(),
        horizontal: l()
      };
    return i.hapticActuators ? typeof i.hapticActuators.pulse == "function" ? (e.hapticActuator = i.hapticActuators, e.vibrationMode = 0, e.vibration = !0) : i.hapticActuators[0] && typeof i.hapticActuators[0].pulse == "function" && (e.hapticActuator = i.hapticActuators[0], e.vibrationMode = 0, e.vibration = !0) : i.vibrationActuator && typeof i.vibrationActuator.playEffect == "function" && (e.hapticActuator = i.vibrationActuator, e.vibrationMode = 1, e.vibration = !0), e.axeValues = [...i.axes], e;
  }
};
export {
  c as L,
  d as g
};
