import k from "./gamecontrol.mjs";
import "./gamepad-07c8af72.mjs";
var C = typeof navigator < "u" ? navigator.userAgent.toLowerCase().indexOf("firefox") > 0 : !1;
function j(e, t, r, n) {
  e.addEventListener ? e.addEventListener(t, r, n) : e.attachEvent && e.attachEvent("on".concat(t), function() {
    r(window.event);
  });
}
function I(e, t) {
  for (var r = t.slice(0, t.length - 1), n = 0; n < r.length; n++)
    r[n] = e[r[n].toLowerCase()];
  return r;
}
function T(e) {
  typeof e != "string" && (e = ""), e = e.replace(/\s/g, "");
  for (var t = e.split(","), r = t.lastIndexOf(""); r >= 0; )
    t[r - 1] += ",", t.splice(r, 1), r = t.lastIndexOf("");
  return t;
}
function R(e, t) {
  for (var r = e.length >= t.length ? e : t, n = e.length >= t.length ? t : e, i = !0, s = 0; s < r.length; s++)
    n.indexOf(r[s]) === -1 && (i = !1);
  return i;
}
var K = {
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
  "-": C ? 173 : 189,
  "=": C ? 61 : 187,
  ";": C ? 59 : 186,
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
}, S = {
  16: "shiftKey",
  18: "altKey",
  17: "ctrlKey",
  91: "metaKey",
  shiftKey: 16,
  ctrlKey: 17,
  altKey: 18,
  metaKey: 91
}, u = {
  16: !1,
  18: !1,
  17: !1,
  91: !1
}, l = {};
for (var A = 1; A < 20; A++)
  K["f".concat(A)] = 111 + A;
var o = [], U = !1, V = "all", $ = [], E = function(t) {
  return K[t.toLowerCase()] || b[t.toLowerCase()] || t.toUpperCase().charCodeAt(0);
}, F = function(t) {
  return Object.keys(K).find(function(r) {
    return K[r] === t;
  });
}, X = function(t) {
  return Object.keys(b).find(function(r) {
    return b[r] === t;
  });
};
function G(e) {
  V = e || "all";
}
function O() {
  return V || "all";
}
function q() {
  return o.slice(0);
}
function z() {
  return o.map(function(e) {
    return F(e) || X(e) || String.fromCharCode(e);
  });
}
function J(e) {
  var t = e.target || e.srcElement, r = t.tagName, n = !0;
  return (t.isContentEditable || (r === "INPUT" || r === "TEXTAREA" || r === "SELECT") && !t.readOnly) && (n = !1), n;
}
function Q(e) {
  return typeof e == "string" && (e = E(e)), o.indexOf(e) !== -1;
}
function W(e, t) {
  var r, n;
  e || (e = O());
  for (var i in l)
    if (Object.prototype.hasOwnProperty.call(l, i))
      for (r = l[i], n = 0; n < r.length; )
        r[n].scope === e ? r.splice(n, 1) : n++;
  O() === e && G(t || "all");
}
function Y(e) {
  var t = e.keyCode || e.which || e.charCode, r = o.indexOf(t);
  if (r >= 0 && o.splice(r, 1), e.key && e.key.toLowerCase() === "meta" && o.splice(0, o.length), (t === 93 || t === 224) && (t = 91), t in u) {
    u[t] = !1;
    for (var n in b)
      b[n] === t && (m[n] = !1);
  }
}
function Z(e) {
  if (typeof e > "u")
    Object.keys(l).forEach(function(f) {
      return delete l[f];
    });
  else if (Array.isArray(e))
    e.forEach(function(f) {
      f.key && x(f);
    });
  else if (typeof e == "object")
    e.key && x(e);
  else if (typeof e == "string") {
    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      r[n - 1] = arguments[n];
    var i = r[0], s = r[1];
    typeof i == "function" && (s = i, i = ""), x({
      key: e,
      scope: i,
      method: s,
      splitKey: "+"
    });
  }
}
var x = function(t) {
  var r = t.key, n = t.scope, i = t.method, s = t.splitKey, f = s === void 0 ? "+" : s, d = T(r);
  d.forEach(function(a) {
    var c = a.split(f), v = c.length, p = c[v - 1], h = p === "*" ? "*" : E(p);
    if (l[h]) {
      n || (n = O());
      var w = v > 1 ? I(b, c) : [];
      l[h] = l[h].filter(function(g) {
        var y = i ? g.method === i : !0;
        return !(y && g.scope === n && R(g.mods, w));
      });
    }
  });
};
function B(e, t, r, n) {
  if (t.element === n) {
    var i;
    if (t.scope === r || t.scope === "all") {
      i = t.mods.length > 0;
      for (var s in u)
        Object.prototype.hasOwnProperty.call(u, s) && (!u[s] && t.mods.indexOf(+s) > -1 || u[s] && t.mods.indexOf(+s) === -1) && (i = !1);
      (t.mods.length === 0 && !u[16] && !u[18] && !u[17] && !u[91] || i || t.shortcut === "*") && t.method(e, t) === !1 && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation && e.stopPropagation(), e.cancelBubble && (e.cancelBubble = !0));
    }
  }
}
function D(e, t) {
  var r = l["*"], n = e.keyCode || e.which || e.charCode;
  if (m.filter.call(this, e)) {
    if ((n === 93 || n === 224) && (n = 91), o.indexOf(n) === -1 && n !== 229 && o.push(n), ["ctrlKey", "altKey", "shiftKey", "metaKey"].forEach(function(g) {
      var y = S[g];
      e[g] && o.indexOf(y) === -1 ? o.push(y) : !e[g] && o.indexOf(y) > -1 ? o.splice(o.indexOf(y), 1) : g === "metaKey" && e[g] && o.length === 3 && (e.ctrlKey || e.shiftKey || e.altKey || (o = o.slice(o.indexOf(y))));
    }), n in u) {
      u[n] = !0;
      for (var i in b)
        b[i] === n && (m[i] = !0);
      if (!r)
        return;
    }
    for (var s in u)
      Object.prototype.hasOwnProperty.call(u, s) && (u[s] = e[S[s]]);
    e.getModifierState && !(e.altKey && !e.ctrlKey) && e.getModifierState("AltGraph") && (o.indexOf(17) === -1 && o.push(17), o.indexOf(18) === -1 && o.push(18), u[17] = !0, u[18] = !0);
    var f = O();
    if (r)
      for (var d = 0; d < r.length; d++)
        r[d].scope === f && (e.type === "keydown" && r[d].keydown || e.type === "keyup" && r[d].keyup) && B(e, r[d], f, t);
    if (n in l) {
      for (var a = 0; a < l[n].length; a++)
        if ((e.type === "keydown" && l[n][a].keydown || e.type === "keyup" && l[n][a].keyup) && l[n][a].key) {
          for (var c = l[n][a], v = c.splitKey, p = c.key.split(v), h = [], w = 0; w < p.length; w++)
            h.push(E(p[w]));
          h.sort().join("") === o.sort().join("") && B(e, c, f, t);
        }
    }
  }
}
function N(e) {
  return $.indexOf(e) > -1;
}
function m(e, t, r) {
  o = [];
  var n = T(e), i = [], s = "all", f = document, d = 0, a = !1, c = !0, v = "+", p = !1;
  for (r === void 0 && typeof t == "function" && (r = t), Object.prototype.toString.call(t) === "[object Object]" && (t.scope && (s = t.scope), t.element && (f = t.element), t.keyup && (a = t.keyup), t.keydown !== void 0 && (c = t.keydown), t.capture !== void 0 && (p = t.capture), typeof t.splitKey == "string" && (v = t.splitKey)), typeof t == "string" && (s = t); d < n.length; d++)
    e = n[d].split(v), i = [], e.length > 1 && (i = I(b, e)), e = e[e.length - 1], e = e === "*" ? "*" : E(e), e in l || (l[e] = []), l[e].push({
      keyup: a,
      keydown: c,
      scope: s,
      mods: i,
      shortcut: n[d],
      method: r,
      key: n[d],
      splitKey: v,
      element: f
    });
  typeof f < "u" && !N(f) && window && ($.push(f), j(f, "keydown", function(h) {
    D(h, f);
  }, p), U || (U = !0, j(window, "focus", function() {
    o = [];
  }, p)), j(f, "keyup", function(h) {
    D(h, f), Y(h);
  }, p));
}
function ee(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "all";
  Object.keys(l).forEach(function(r) {
    var n = l[r].filter(function(i) {
      return i.scope === t && i.shortcut === e;
    });
    n.forEach(function(i) {
      i && i.method && i.method();
    });
  });
}
var P = {
  getPressedKeyString: z,
  setScope: G,
  getScope: O,
  deleteScope: W,
  getPressedKeyCodes: q,
  isPressed: Q,
  filter: J,
  trigger: ee,
  unbind: Z,
  keyMap: K,
  modifier: b,
  modifierMap: S
};
for (var M in P)
  Object.prototype.hasOwnProperty.call(P, M) && (m[M] = P[M]);
if (typeof window < "u") {
  var te = window.hotkeys;
  m.noConflict = function(e) {
    return e && window.hotkeys === m && (window.hotkeys = te), m;
  }, window.hotkeys = m;
}
const re = {
  on: function(e, t, r = "changed") {
    r === "repeat" ? m(e, (n, i) => {
      n.preventDefault(), t(1);
    }) : m(e, {
      keyup: r === "released" || r === "changed" ? !0 : null,
      keydown: r === "pressed" || r === "changed" ? !0 : null
    }, (i, s) => {
      i.repeat || t(m.isPressed(e) === !0 ? 1 : 0);
    });
  },
  off: function(e, t) {
    m.unbind(e);
  }
}, ne = {
  supportedInputHandlers: ["keyboard", "gamepad"],
  handlers: {
    keyboard: {
      handler: re,
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
  init: function() {
    k.on("connect", (e) => {
      this.handlers.gamepad.handler || (this.handlers.gamepad.handler = e, Object.entries(this.registeredActions.gamepad).forEach(([t, r]) => {
        var n;
        (n = this.handlers.gamepad.handler) == null || n.on(t, r.handler, r.event);
      }));
    }), k.on("disconnect", (e) => {
      e.id === this.handlers.gamepad.handler.id && (this.handlers.gamepad.handler = void 0);
    }), Object.entries(k.getGamepads()).find(([e, t]) => {
      t !== null && t.id !== this.handlers.gamepad.handler.id && (this.handlers.gamepad.handler = t);
    });
  },
  defineInputActions: function(e, t) {
    Object.entries(e).map(([r, n]) => {
      if (!(t != null && t.override) && this.definedActions[r])
        throw new Error(`${r} action has already been defined as a dependency.`);
      this.definedActions[r] = n;
    });
  },
  cleanInputActions: function() {
    this.definedActions = {};
  },
  onInputActions: function(e, t, r) {
    const n = /* @__PURE__ */ new Set();
    Object.entries(t).forEach(([s, f]) => {
      const d = this.definedActions[s];
      d == null || d.forEach((a) => {
        var p, h, w, g;
        const c = this.registeredActions[a.type][a.key];
        if (c) {
          if (c.id === e)
            throw new Error(`There is already a group of event registered under the id [${e}]. Unsubscribe this group of event before registering a new one`);
          n.add(c.id), (p = this.handlers[a.type].handler) == null || p.off(a.key, c.handler);
        }
        const v = (y) => {
          var L, H;
          if (!this.handlers[a.type].enabled)
            return;
          if (!y) {
            console.log("No value for action", a), f();
            return;
          }
          const _ = y === 1 ? ((L = a.options) == null ? void 0 : L.value) ?? 1 : y === 0 ? 0 : (((H = a.options) == null ? void 0 : H.value) ?? 1) * y;
          console.log("adjustedValue", _), f(_);
        };
        this.registeredActions[a.type][a.key] = {
          handler: v,
          id: e,
          event: (h = a.options) == null ? void 0 : h.event
        }, (g = this.handlers[a.type].handler) == null || g.on(a.key, v, (w = a.options) == null ? void 0 : w.event);
      });
    }), r && (this.unregisterActionsCallbacks[e] = r), this.supportedInputHandlers.forEach((s) => {
      Object.entries(this.registeredActions[s]).forEach(([f, d]) => {
        var a;
        n.has(d.id) && ((a = this.handlers[s].handler) == null || a.off(f, d.handler), delete this.registeredActions[s][f]);
      });
    });
    for (var i of Array.from(n.values()))
      this.unregisterActionsCallbacks[i] && this.unregisterActionsCallbacks[i]();
  },
  offInputActions: function(e) {
    this.supportedInputHandlers.forEach((t) => {
      Object.entries(this.registeredActions[t]).forEach(([r, n]) => {
        var i;
        e === n.id && ((i = this.handlers[t].handler) == null || i.off(r), delete this.registeredActions[t][r]);
      });
    }), this.unregisterActionsCallbacks[e] && this.unregisterActionsCallbacks[e]();
  }
};
ne.init();
export {
  ne as default
};
