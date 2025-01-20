import j from "./gamecontrol.mjs";
import "./gamepad-074d868b.mjs";
const M = typeof navigator < "u" ? navigator.userAgent.toLowerCase().indexOf("firefox") > 0 : !1;
function P(e, t, n, s) {
  e.addEventListener ? e.addEventListener(t, n, s) : e.attachEvent && e.attachEvent("on".concat(t), n);
}
function O(e, t, n, s) {
  e.removeEventListener ? e.removeEventListener(t, n, s) : e.detachEvent && e.detachEvent("on".concat(t), n);
}
function B(e, t) {
  const n = t.slice(0, t.length - 1);
  for (let s = 0; s < n.length; s++)
    n[s] = e[n[s].toLowerCase()];
  return n;
}
function G(e) {
  typeof e != "string" && (e = ""), e = e.replace(/\s/g, "");
  const t = e.split(",");
  let n = t.lastIndexOf("");
  for (; n >= 0; )
    t[n - 1] += ",", t.splice(n, 1), n = t.lastIndexOf("");
  return t;
}
function v(e, t) {
  const n = e.length >= t.length ? e : t, s = e.length >= t.length ? t : e;
  let i = !0;
  for (let o = 0; o < n.length; o++)
    s.indexOf(n[o]) === -1 && (i = !1);
  return i;
}
const A = {
  backspace: 8,
  "⌫": 8,
  tab: 9,
  clear: 12,
  enter: 13,
  "↩": 13,
  return: 13,
  esc: 27,
  escape: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  del: 46,
  delete: 46,
  ins: 45,
  insert: 45,
  home: 36,
  end: 35,
  pageup: 33,
  pagedown: 34,
  capslock: 20,
  num_0: 96,
  num_1: 97,
  num_2: 98,
  num_3: 99,
  num_4: 100,
  num_5: 101,
  num_6: 102,
  num_7: 103,
  num_8: 104,
  num_9: 105,
  num_multiply: 106,
  num_add: 107,
  num_enter: 108,
  num_subtract: 109,
  num_decimal: 110,
  num_divide: 111,
  "⇪": 20,
  ",": 188,
  ".": 190,
  "/": 191,
  "`": 192,
  "-": M ? 173 : 189,
  "=": M ? 61 : 187,
  ";": M ? 59 : 186,
  "'": 222,
  "[": 219,
  "]": 221,
  "\\": 220
}, b = {
  // shiftKey
  "⇧": 16,
  shift: 16,
  // altKey
  "⌥": 18,
  alt: 18,
  option: 18,
  // ctrlKey
  "⌃": 17,
  ctrl: 17,
  control: 17,
  // metaKey
  "⌘": 91,
  cmd: 91,
  command: 91
}, L = {
  16: "shiftKey",
  18: "altKey",
  17: "ctrlKey",
  91: "metaKey",
  shiftKey: 16,
  ctrlKey: 17,
  altKey: 18,
  metaKey: 91
}, c = {
  16: !1,
  18: !1,
  17: !1,
  91: !1
}, f = {};
for (let e = 1; e < 20; e++)
  A["f".concat(e)] = 111 + e;
let a = [], K = null, R = "all";
const k = /* @__PURE__ */ new Map(), x = (e) => A[e.toLowerCase()] || b[e.toLowerCase()] || e.toUpperCase().charCodeAt(0), z = (e) => Object.keys(A).find((t) => A[t] === e), F = (e) => Object.keys(b).find((t) => b[t] === e);
function V(e) {
  R = e || "all";
}
function C() {
  return R || "all";
}
function X() {
  return a.slice(0);
}
function q() {
  return a.map((e) => z(e) || F(e) || String.fromCharCode(e));
}
function J() {
  const e = [];
  return Object.keys(f).forEach((t) => {
    f[t].forEach((n) => {
      let {
        key: s,
        scope: i,
        mods: o,
        shortcut: l
      } = n;
      e.push({
        scope: i,
        shortcut: l,
        mods: o,
        keys: s.split("+").map((r) => x(r))
      });
    });
  }), e;
}
function Q(e) {
  const t = e.target || e.srcElement, {
    tagName: n
  } = t;
  let s = !0;
  const i = n === "INPUT" && !["checkbox", "radio", "range", "button", "file", "reset", "submit", "color"].includes(t.type);
  return (t.isContentEditable || (i || n === "TEXTAREA" || n === "SELECT") && !t.readOnly) && (s = !1), s;
}
function W(e) {
  return typeof e == "string" && (e = x(e)), a.indexOf(e) !== -1;
}
function Y(e, t) {
  let n, s;
  e || (e = C());
  for (const i in f)
    if (Object.prototype.hasOwnProperty.call(f, i))
      for (n = f[i], s = 0; s < n.length; )
        n[s].scope === e ? n.splice(s, 1).forEach((l) => {
          let {
            element: r
          } = l;
          return I(r);
        }) : s++;
  C() === e && V(t || "all");
}
function Z(e) {
  let t = e.keyCode || e.which || e.charCode;
  const n = a.indexOf(t);
  if (n >= 0 && a.splice(n, 1), e.key && e.key.toLowerCase() === "meta" && a.splice(0, a.length), (t === 93 || t === 224) && (t = 91), t in c) {
    c[t] = !1;
    for (const s in b)
      b[s] === t && (m[s] = !1);
  }
}
function $(e) {
  if (typeof e > "u")
    Object.keys(f).forEach((i) => {
      Array.isArray(f[i]) && f[i].forEach((o) => _(o)), delete f[i];
    }), I(null);
  else if (Array.isArray(e))
    e.forEach((i) => {
      i.key && _(i);
    });
  else if (typeof e == "object")
    e.key && _(e);
  else if (typeof e == "string") {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
      n[s - 1] = arguments[s];
    let [i, o] = n;
    typeof i == "function" && (o = i, i = ""), _({
      key: e,
      scope: i,
      method: o,
      splitKey: "+"
    });
  }
}
const _ = (e) => {
  let {
    key: t,
    scope: n,
    method: s,
    splitKey: i = "+"
  } = e;
  G(t).forEach((l) => {
    const r = l.split(i), d = r.length, p = r[d - 1], y = p === "*" ? "*" : x(p);
    if (!f[y])
      return;
    n || (n = C());
    const h = d > 1 ? B(b, r) : [], g = [];
    f[y] = f[y].filter((u) => {
      const w = (s ? u.method === s : !0) && u.scope === n && v(u.mods, h);
      return w && g.push(u.element), !w;
    }), g.forEach((u) => I(u));
  });
};
function H(e, t, n, s) {
  if (t.element !== s)
    return;
  let i;
  if (t.scope === n || t.scope === "all") {
    i = t.mods.length > 0;
    for (const o in c)
      Object.prototype.hasOwnProperty.call(c, o) && (!c[o] && t.mods.indexOf(+o) > -1 || c[o] && t.mods.indexOf(+o) === -1) && (i = !1);
    (t.mods.length === 0 && !c[16] && !c[18] && !c[17] && !c[91] || i || t.shortcut === "*") && (t.keys = [], t.keys = t.keys.concat(a), t.method(e, t) === !1 && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation && e.stopPropagation(), e.cancelBubble && (e.cancelBubble = !0)));
  }
}
function T(e, t) {
  const n = f["*"];
  let s = e.keyCode || e.which || e.charCode;
  if (!m.filter.call(this, e))
    return;
  if ((s === 93 || s === 224) && (s = 91), a.indexOf(s) === -1 && s !== 229 && a.push(s), ["metaKey", "ctrlKey", "altKey", "shiftKey"].forEach((r) => {
    const d = L[r];
    e[r] && a.indexOf(d) === -1 ? a.push(d) : !e[r] && a.indexOf(d) > -1 ? a.splice(a.indexOf(d), 1) : r === "metaKey" && e[r] && (a = a.filter((p) => p in L || p === s));
  }), s in c) {
    c[s] = !0;
    for (const r in b)
      b[r] === s && (m[r] = !0);
    if (!n)
      return;
  }
  for (const r in c)
    Object.prototype.hasOwnProperty.call(c, r) && (c[r] = e[L[r]]);
  e.getModifierState && !(e.altKey && !e.ctrlKey) && e.getModifierState("AltGraph") && (a.indexOf(17) === -1 && a.push(17), a.indexOf(18) === -1 && a.push(18), c[17] = !0, c[18] = !0);
  const i = C();
  if (n)
    for (let r = 0; r < n.length; r++)
      n[r].scope === i && (e.type === "keydown" && n[r].keydown || e.type === "keyup" && n[r].keyup) && H(e, n[r], i, t);
  if (!(s in f))
    return;
  const o = f[s], l = o.length;
  for (let r = 0; r < l; r++)
    if ((e.type === "keydown" && o[r].keydown || e.type === "keyup" && o[r].keyup) && o[r].key) {
      const d = o[r], {
        splitKey: p
      } = d, y = d.key.split(p), h = [];
      for (let g = 0; g < y.length; g++)
        h.push(x(y[g]));
      h.sort().join("") === a.sort().join("") && H(e, d, i, t);
    }
}
function m(e, t, n) {
  a = [];
  const s = G(e);
  let i = [], o = "all", l = document, r = 0, d = !1, p = !0, y = "+", h = !1, g = !1;
  for (n === void 0 && typeof t == "function" && (n = t), Object.prototype.toString.call(t) === "[object Object]" && (t.scope && (o = t.scope), t.element && (l = t.element), t.keyup && (d = t.keyup), t.keydown !== void 0 && (p = t.keydown), t.capture !== void 0 && (h = t.capture), typeof t.splitKey == "string" && (y = t.splitKey), t.single === !0 && (g = !0)), typeof t == "string" && (o = t), g && $(e, o); r < s.length; r++)
    e = s[r].split(y), i = [], e.length > 1 && (i = B(b, e)), e = e[e.length - 1], e = e === "*" ? "*" : x(e), e in f || (f[e] = []), f[e].push({
      keyup: d,
      keydown: p,
      scope: o,
      mods: i,
      shortcut: s[r],
      method: n,
      key: s[r],
      splitKey: y,
      element: l
    });
  if (typeof l < "u" && window) {
    if (!k.has(l)) {
      const u = function() {
        let w = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.event;
        return T(w, l);
      }, E = function() {
        let w = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.event;
        T(w, l), Z(w);
      };
      k.set(l, {
        keydownListener: u,
        keyupListenr: E,
        capture: h
      }), P(l, "keydown", u, h), P(l, "keyup", E, h);
    }
    if (!K) {
      const u = () => {
        a = [];
      };
      K = {
        listener: u,
        capture: h
      }, P(window, "focus", u, h);
    }
  }
}
function N(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "all";
  Object.keys(f).forEach((n) => {
    f[n].filter((i) => i.scope === t && i.shortcut === e).forEach((i) => {
      i && i.method && i.method();
    });
  });
}
function I(e) {
  const t = Object.values(f).flat();
  if (t.findIndex((s) => {
    let {
      element: i
    } = s;
    return i === e;
  }) < 0) {
    const {
      keydownListener: s,
      keyupListenr: i,
      capture: o
    } = k.get(e) || {};
    s && i && (O(e, "keyup", i, o), O(e, "keydown", s, o), k.delete(e));
  }
  if ((t.length <= 0 || k.size <= 0) && (Object.keys(k).forEach((i) => {
    const {
      keydownListener: o,
      keyupListenr: l,
      capture: r
    } = k.get(i) || {};
    o && l && (O(i, "keyup", l, r), O(i, "keydown", o, r), k.delete(i));
  }), k.clear(), Object.keys(f).forEach((i) => delete f[i]), K)) {
    const {
      listener: i,
      capture: o
    } = K;
    O(window, "focus", i, o), K = null;
  }
}
const S = {
  getPressedKeyString: q,
  setScope: V,
  getScope: C,
  deleteScope: Y,
  getPressedKeyCodes: X,
  getAllKeyCodes: J,
  isPressed: W,
  filter: Q,
  trigger: N,
  unbind: $,
  keyMap: A,
  modifier: b,
  modifierMap: L
};
for (const e in S)
  Object.prototype.hasOwnProperty.call(S, e) && (m[e] = S[e]);
if (typeof window < "u") {
  const e = window.hotkeys;
  m.noConflict = (t) => (t && window.hotkeys === m && (window.hotkeys = e), m), window.hotkeys = m;
}
const ee = {
  on(e, t, n = "changed") {
    n === "repeat" ? m(e, (s, i) => {
      s.preventDefault(), t(1);
    }) : m(e, {
      keyup: n === "released" || n === "changed" ? !0 : null,
      keydown: n === "pressed" || n === "changed" ? !0 : null
    }, (i, o) => {
      i.repeat || t(m.isPressed(e) === !0 ? 1 : 0);
    });
  },
  off(e, t) {
    m.unbind(e);
  }
}, te = {
  supportedInputHandlers: ["keyboard", "gamepad"],
  handlers: {
    keyboard: {
      handler: ee,
      enabled: !0
    },
    gamepad: {
      handler: void 0,
      enabled: !1
    }
  },
  definedActions: {},
  registeredActions: {
    keyboard: {},
    gamepad: {}
  },
  get gamepadEnabled() {
    return this.handlers.gamepad.enabled;
  },
  set gamepadEnabled(e) {
    this.handlers.gamepad.enabled = e;
  },
  get keyboardEnabled() {
    return this.handlers.keyboard.enabled;
  },
  set keyboardEnabled(e) {
    this.handlers.keyboard.enabled = e;
  },
  unregisterActionsCallbacks: {},
  init() {
    j.on("connect", (e) => {
      this.handlers.gamepad.handler || (this.handlers.gamepad.handler = e, Object.entries(this.registeredActions.gamepad).forEach(([t, n]) => {
        var s;
        (s = this.handlers.gamepad.handler) == null || s.on(t, n.handler, n.event);
      }));
    }), j.on("disconnect", (e) => {
      e.id === this.handlers.gamepad.handler.id && (this.handlers.gamepad.handler = void 0);
    }), Object.entries(j.getGamepads()).find(([e, t]) => {
      t !== null && t.id !== this.handlers.gamepad.handler.id && (this.handlers.gamepad.handler = t);
    });
  },
  defineInputActions(e, t) {
    Object.entries(e).map(([n, s]) => {
      if (!(t != null && t.override) && this.definedActions[n])
        throw new Error(`${n} action has already been defined as a dependency.`);
      this.definedActions[n] = s;
    });
  },
  cleanInputActions() {
    this.definedActions = {};
  },
  onInputActions(e, t, n) {
    const s = /* @__PURE__ */ new Set();
    Object.entries(t).forEach(([i, o]) => {
      const l = this.definedActions[i];
      l == null || l.forEach((r) => {
        var y, h, g, u;
        const d = this.registeredActions[r.type][r.key];
        if (d) {
          if (d.id === e)
            throw new Error(`There is already a group of event registered under the id [${e}]. Unsubscribe this group of event before registering a new one`);
          s.add(d.id), (y = this.handlers[r.type].handler) == null || y.off(r.key, d.handler);
        }
        const p = (E) => {
          var U, D;
          if (!this.handlers[r.type].enabled)
            return;
          if (!E) {
            o(0);
            return;
          }
          const w = E === 1 ? ((U = r.options) == null ? void 0 : U.value) ?? 1 : E === 0 ? 0 : (((D = r.options) == null ? void 0 : D.value) ?? 1) * E;
          o(w);
        };
        this.registeredActions[r.type][r.key] = {
          handler: p,
          id: e,
          event: (h = r.options) == null ? void 0 : h.event
        }, (u = this.handlers[r.type].handler) == null || u.on(r.key, p, (g = r.options) == null ? void 0 : g.event);
      });
    }), n && (this.unregisterActionsCallbacks[e] = n), this.supportedInputHandlers.forEach((i) => {
      Object.entries(this.registeredActions[i]).forEach(([o, l]) => {
        var r;
        s.has(l.id) && ((r = this.handlers[i].handler) == null || r.off(o, l.handler), delete this.registeredActions[i][o]);
      });
    });
    for (const i of Array.from(s.values()))
      this.unregisterActionsCallbacks[i] && this.unregisterActionsCallbacks[i]();
  },
  offInputActions(e) {
    this.supportedInputHandlers.forEach((t) => {
      Object.entries(this.registeredActions[t]).forEach(([n, s]) => {
        var i;
        e === s.id && ((i = this.handlers[t].handler) == null || i.off(n), delete this.registeredActions[t][n]);
      });
    }), this.unregisterActionsCallbacks[e] && this.unregisterActionsCallbacks[e]();
  }
};
te.init();
export {
  te as default
};
