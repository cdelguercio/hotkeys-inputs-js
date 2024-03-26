import k from "./gamecontrol.mjs";
import "./gamepad-0ef47351.mjs";
var C = typeof navigator < "u" ? navigator.userAgent.toLowerCase().indexOf("firefox") > 0 : !1;
function x(e, t, r, n) {
  e.addEventListener ? e.addEventListener(t, r, n) : e.attachEvent && e.attachEvent("on".concat(t), function() {
    r(window.event);
  });
}
function D(e, t) {
  for (var r = t.slice(0, t.length - 1), n = 0; n < r.length; n++)
    r[n] = e[r[n].toLowerCase()];
  return r;
}
function I(e) {
  typeof e != "string" && (e = ""), e = e.replace(/\s/g, "");
  for (var t = e.split(","), r = t.lastIndexOf(""); r >= 0; )
    t[r - 1] += ",", t.splice(r, 1), r = t.lastIndexOf("");
  return t;
}
function R(e, t) {
  for (var r = e.length >= t.length ? e : t, n = e.length >= t.length ? t : e, i = !0, a = 0; a < r.length; a++)
    n.indexOf(r[a]) === -1 && (i = !1);
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
}, l = {
  16: !1,
  18: !1,
  17: !1,
  91: !1
}, d = {};
for (var A = 1; A < 20; A++)
  K["f".concat(A)] = 111 + A;
var o = [], H = !1, T = "all", $ = [], E = function(t) {
  return K[t.toLowerCase()] || b[t.toLowerCase()] || t.toUpperCase().charCodeAt(0);
}, V = function(t) {
  return Object.keys(K).find(function(r) {
    return K[r] === t;
  });
}, F = function(t) {
  return Object.keys(b).find(function(r) {
    return b[r] === t;
  });
};
function G(e) {
  T = e || "all";
}
function O() {
  return T || "all";
}
function X() {
  return o.slice(0);
}
function q() {
  return o.map(function(e) {
    return V(e) || F(e) || String.fromCharCode(e);
  });
}
function z(e) {
  var t = e.target || e.srcElement, r = t.tagName, n = !0;
  return (t.isContentEditable || (r === "INPUT" || r === "TEXTAREA" || r === "SELECT") && !t.readOnly) && (n = !1), n;
}
function J(e) {
  return typeof e == "string" && (e = E(e)), o.indexOf(e) !== -1;
}
function Q(e, t) {
  var r, n;
  e || (e = O());
  for (var i in d)
    if (Object.prototype.hasOwnProperty.call(d, i))
      for (r = d[i], n = 0; n < r.length; )
        r[n].scope === e ? r.splice(n, 1) : n++;
  O() === e && G(t || "all");
}
function W(e) {
  var t = e.keyCode || e.which || e.charCode, r = o.indexOf(t);
  if (r >= 0 && o.splice(r, 1), e.key && e.key.toLowerCase() === "meta" && o.splice(0, o.length), (t === 93 || t === 224) && (t = 91), t in l) {
    l[t] = !1;
    for (var n in b)
      b[n] === t && (y[n] = !1);
  }
}
function Y(e) {
  if (typeof e > "u")
    Object.keys(d).forEach(function(f) {
      return delete d[f];
    });
  else if (Array.isArray(e))
    e.forEach(function(f) {
      f.key && j(f);
    });
  else if (typeof e == "object")
    e.key && j(e);
  else if (typeof e == "string") {
    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      r[n - 1] = arguments[n];
    var i = r[0], a = r[1];
    typeof i == "function" && (a = i, i = ""), j({
      key: e,
      scope: i,
      method: a,
      splitKey: "+"
    });
  }
}
var j = function(t) {
  var r = t.key, n = t.scope, i = t.method, a = t.splitKey, f = a === void 0 ? "+" : a, s = I(r);
  s.forEach(function(u) {
    var p = u.split(f), m = p.length, g = p[m - 1], c = g === "*" ? "*" : E(g);
    if (d[c]) {
      n || (n = O());
      var w = m > 1 ? D(b, p) : [];
      d[c] = d[c].filter(function(h) {
        var v = i ? h.method === i : !0;
        return !(v && h.scope === n && R(h.mods, w));
      });
    }
  });
};
function U(e, t, r, n) {
  if (t.element === n) {
    var i;
    if (t.scope === r || t.scope === "all") {
      i = t.mods.length > 0;
      for (var a in l)
        Object.prototype.hasOwnProperty.call(l, a) && (!l[a] && t.mods.indexOf(+a) > -1 || l[a] && t.mods.indexOf(+a) === -1) && (i = !1);
      (t.mods.length === 0 && !l[16] && !l[18] && !l[17] && !l[91] || i || t.shortcut === "*") && t.method(e, t) === !1 && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation && e.stopPropagation(), e.cancelBubble && (e.cancelBubble = !0));
    }
  }
}
function B(e, t) {
  var r = d["*"], n = e.keyCode || e.which || e.charCode;
  if (y.filter.call(this, e)) {
    if ((n === 93 || n === 224) && (n = 91), o.indexOf(n) === -1 && n !== 229 && o.push(n), ["ctrlKey", "altKey", "shiftKey", "metaKey"].forEach(function(h) {
      var v = S[h];
      e[h] && o.indexOf(v) === -1 ? o.push(v) : !e[h] && o.indexOf(v) > -1 ? o.splice(o.indexOf(v), 1) : h === "metaKey" && e[h] && o.length === 3 && (e.ctrlKey || e.shiftKey || e.altKey || (o = o.slice(o.indexOf(v))));
    }), n in l) {
      l[n] = !0;
      for (var i in b)
        b[i] === n && (y[i] = !0);
      if (!r)
        return;
    }
    for (var a in l)
      Object.prototype.hasOwnProperty.call(l, a) && (l[a] = e[S[a]]);
    e.getModifierState && !(e.altKey && !e.ctrlKey) && e.getModifierState("AltGraph") && (o.indexOf(17) === -1 && o.push(17), o.indexOf(18) === -1 && o.push(18), l[17] = !0, l[18] = !0);
    var f = O();
    if (r)
      for (var s = 0; s < r.length; s++)
        r[s].scope === f && (e.type === "keydown" && r[s].keydown || e.type === "keyup" && r[s].keyup) && U(e, r[s], f, t);
    if (n in d) {
      for (var u = 0; u < d[n].length; u++)
        if ((e.type === "keydown" && d[n][u].keydown || e.type === "keyup" && d[n][u].keyup) && d[n][u].key) {
          for (var p = d[n][u], m = p.splitKey, g = p.key.split(m), c = [], w = 0; w < g.length; w++)
            c.push(E(g[w]));
          c.sort().join("") === o.sort().join("") && U(e, p, f, t);
        }
    }
  }
}
function Z(e) {
  return $.indexOf(e) > -1;
}
function y(e, t, r) {
  o = [];
  var n = I(e), i = [], a = "all", f = document, s = 0, u = !1, p = !0, m = "+", g = !1;
  for (r === void 0 && typeof t == "function" && (r = t), Object.prototype.toString.call(t) === "[object Object]" && (t.scope && (a = t.scope), t.element && (f = t.element), t.keyup && (u = t.keyup), t.keydown !== void 0 && (p = t.keydown), t.capture !== void 0 && (g = t.capture), typeof t.splitKey == "string" && (m = t.splitKey)), typeof t == "string" && (a = t); s < n.length; s++)
    e = n[s].split(m), i = [], e.length > 1 && (i = D(b, e)), e = e[e.length - 1], e = e === "*" ? "*" : E(e), e in d || (d[e] = []), d[e].push({
      keyup: u,
      keydown: p,
      scope: a,
      mods: i,
      shortcut: n[s],
      method: r,
      key: n[s],
      splitKey: m,
      element: f
    });
  typeof f < "u" && !Z(f) && window && ($.push(f), x(f, "keydown", function(c) {
    B(c, f);
  }, g), H || (H = !0, x(window, "focus", function() {
    o = [];
  }, g)), x(f, "keyup", function(c) {
    B(c, f), W(c);
  }, g));
}
function N(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "all";
  Object.keys(d).forEach(function(r) {
    var n = d[r].filter(function(i) {
      return i.scope === t && i.shortcut === e;
    });
    n.forEach(function(i) {
      i && i.method && i.method();
    });
  });
}
var P = {
  getPressedKeyString: q,
  setScope: G,
  getScope: O,
  deleteScope: Q,
  getPressedKeyCodes: X,
  isPressed: J,
  filter: z,
  trigger: N,
  unbind: Y,
  keyMap: K,
  modifier: b,
  modifierMap: S
};
for (var M in P)
  Object.prototype.hasOwnProperty.call(P, M) && (y[M] = P[M]);
if (typeof window < "u") {
  var ee = window.hotkeys;
  y.noConflict = function(e) {
    return e && window.hotkeys === y && (window.hotkeys = ee), y;
  }, window.hotkeys = y;
}
const te = {
  on: function(e, t, r = "changed") {
    r === "repeat" ? y(e, (n, i) => {
      n.preventDefault(), t(1);
    }) : y(e, {
      keyup: r === "released" || r === "changed" ? !0 : null,
      keydown: r === "pressed" || r === "changed" ? !0 : null
    }, (i, a) => {
      i.repeat || t(y.isPressed(e) === !0 ? 1 : 0);
    });
  },
  off: function(e, t) {
    y.unbind(e);
  }
}, re = {
  supportedInputHandlers: ["keyboard", "gamepad"],
  handlers: {
    keyboard: {
      handler: te,
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
    Object.entries(t).forEach(([i, a]) => {
      const f = this.definedActions[i];
      f == null || f.forEach((s) => {
        var m, g, c, w;
        const u = this.registeredActions[s.type][s.key];
        if (u) {
          if (u.id === e)
            throw new Error(`There is already a group of event registered under the id [${e}]. Unsubscribe this group of event before registering a new one`);
          n.add(u.id), (m = this.handlers[s.type].handler) == null || m.off(s.key, u.handler);
        }
        const p = (h) => {
          var _, L;
          if (!this.handlers[s.type].enabled)
            return;
          if (!h) {
            a(0);
            return;
          }
          const v = h === 1 ? ((_ = s.options) == null ? void 0 : _.value) ?? 1 : h === 0 ? 0 : (((L = s.options) == null ? void 0 : L.value) ?? 1) * h;
          a(v);
        };
        this.registeredActions[s.type][s.key] = {
          handler: p,
          id: e,
          event: (g = s.options) == null ? void 0 : g.event
        }, (w = this.handlers[s.type].handler) == null || w.on(s.key, p, (c = s.options) == null ? void 0 : c.event);
      });
    }), r && (this.unregisterActionsCallbacks[e] = r), this.supportedInputHandlers.forEach((i) => {
      Object.entries(this.registeredActions[i]).forEach(([a, f]) => {
        var s;
        n.has(f.id) && ((s = this.handlers[i].handler) == null || s.off(a, f.handler), delete this.registeredActions[i][a]);
      });
    });
    for (const i of Array.from(n.values()))
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
re.init();
export {
  re as default
};
