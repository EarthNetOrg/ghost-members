import { g as at, i as sr, T as lr, a as et, b as or, c as ze, d as wt, E as cr, e as Re, f as kt, U as ur, s as yt, r as tt, p as xt, h as a, j as Le, k as Ct, l as rt, m as nt, n as ee, o as it, q as qe, I as Ye, t as Lt, u as Ue, v as fr, w as vr, x as dr, y as _r, z as hr, A as St, B as Mt, C as gr, D as pr, F as Pt, G as mr, H as br, L as wr, N as kr, J as yr, K as xr, M as Cr, O as v, S as Et, P as xe, Q as Lr, R as Xe, V as st, W as Sr, X as k, Y as Tt, Z as Mr, _ as Pr, $ as Er, a0 as Tr, a1 as q, a2 as Ar, a3 as Nr, a4 as Ir, a5 as Fr, a6 as Dr, a7 as At, a8 as Rr, a9 as jr, aa as Nt, ab as Vr, ac as de, ad as fe, ae as F, af as m, ag as J, ah as K, ai as X, aj as _e, ak as le, al as He, am as Ze } from "./index-DPPNtEvk.js";
function Br() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
let Or = !1;
function Gr(r) {
  var t = document.createElement("template");
  return t.innerHTML = r.replaceAll("<!>", "<!---->"), t.content;
}
function $e(r, t) {
  var e = (
    /** @type {Effect} */
    et
  );
  e.nodes_start === null && (e.nodes_start = r, e.nodes_end = t);
}
// @__NO_SIDE_EFFECTS__
function j(r, t) {
  var e = (t & or) !== 0, i = (t & lr) !== 0, n, s = !r.startsWith("<!>");
  return () => {
    n === void 0 && (n = Gr(s ? r : "<!>" + r), e || (n = /** @type {Node} */
    at(n)));
    var l = (
      /** @type {TemplateNode} */
      i || sr ? document.importNode(n, !0) : n.cloneNode(!0)
    );
    if (e) {
      var c = (
        /** @type {TemplateNode} */
        at(l)
      ), T = (
        /** @type {TemplateNode} */
        l.lastChild
      );
      $e(c, T);
    } else
      $e(l, l);
    return l;
  };
}
function je() {
  var r = document.createDocumentFragment(), t = document.createComment(""), e = ze();
  return r.append(t, e), $e(t, e), r;
}
function I(r, t) {
  r !== null && r.before(
    /** @type {Node} */
    t
  );
}
function H(r, t, e = !1) {
  var i = r, n = null, s = null, l = ur, c = e ? cr : 0, T = !1;
  const y = (D, u = !0) => {
    T = !0, _(u, D);
  };
  var o = null;
  function x() {
    o !== null && (o.lastChild.remove(), i.before(o), o = null);
    var D = l ? n : s, u = l ? s : n;
    D && tt(D), u && xt(u, () => {
      l ? s = null : n = null;
    });
  }
  const _ = (D, u) => {
    if (l !== (l = D)) {
      var C = yt(), f = i;
      if (C && (o = document.createDocumentFragment(), o.append(f = ze())), l ? n ??= u && Re(() => u(f)) : s ??= u && Re(() => u(f)), C) {
        var V = (
          /** @type {Batch} */
          kt
        ), z = l ? n : s, M = l ? s : n;
        z && V.skipped_effects.delete(z), M && V.skipped_effects.add(M), V.add_callback(x);
      } else
        x();
    }
  };
  wt(() => {
    T = !1, t(y), T || _(null, null);
  }, c);
}
function Ve(r, t) {
  return t;
}
function zr(r, t, e) {
  for (var i = r.items, n = [], s = t.length, l = 0; l < s; l++)
    dr(t[l].e, n, !0);
  var c = s > 0 && n.length === 0 && e !== null;
  if (c) {
    var T = (
      /** @type {Element} */
      /** @type {Element} */
      e.parentNode
    );
    _r(T), T.append(
      /** @type {Element} */
      e
    ), i.clear(), ce(r, t[0].prev, t[s - 1].next);
  }
  hr(n, () => {
    for (var y = 0; y < s; y++) {
      var o = t[y];
      c || (i.delete(o.k), ce(r, o.prev, o.next)), Lt(o.e, !c);
    }
  });
}
function Se(r, t, e, i, n, s = null) {
  var l = r, c = { flags: t, items: /* @__PURE__ */ new Map(), first: null }, T = (t & St) !== 0;
  if (T) {
    var y = (
      /** @type {Element} */
      r
    );
    l = y.appendChild(ze());
  }
  var o = null, x = !1, _ = /* @__PURE__ */ new Map(), D = Le(() => {
    var V = e();
    return rt(V) ? V : V == null ? [] : Ct(V);
  }), u, C;
  function f() {
    qr(
      C,
      u,
      c,
      _,
      l,
      n,
      t,
      i,
      e
    ), s !== null && (u.length === 0 ? o ? tt(o) : o = Re(() => s(l)) : o !== null && xt(o, () => {
      o = null;
    }));
  }
  wt(() => {
    C ??= /** @type {Effect} */
    et, u = /** @type {V[]} */
    a(D);
    var V = u.length;
    if (!(x && V === 0)) {
      x = V === 0;
      var z, M, h, d;
      if (yt()) {
        var R = /* @__PURE__ */ new Set(), G = (
          /** @type {Batch} */
          kt
        );
        for (M = 0; M < V; M += 1) {
          h = u[M], d = i(h, M);
          var Y = c.items.get(d) ?? _.get(d);
          Y ? (t & (Ue | qe)) !== 0 && It(Y, h, M, t) : (z = Ft(
            null,
            c,
            null,
            null,
            h,
            d,
            M,
            n,
            t,
            e,
            !0
          ), _.set(d, z)), R.add(d);
        }
        for (const [ie, ne] of c.items)
          R.has(ie) || G.skipped_effects.add(ne.e);
        G.add_callback(f);
      } else
        f();
      a(D);
    }
  });
}
function qr(r, t, e, i, n, s, l, c, T) {
  var y = (l & gr) !== 0, o = (l & (Ue | qe)) !== 0, x = t.length, _ = e.items, D = e.first, u = D, C, f = null, V, z = [], M = [], h, d, R, G;
  if (y)
    for (G = 0; G < x; G += 1)
      h = t[G], d = c(h, G), R = _.get(d), R !== void 0 && (R.a?.measure(), (V ??= /* @__PURE__ */ new Set()).add(R));
  for (G = 0; G < x; G += 1) {
    if (h = t[G], d = c(h, G), R = _.get(d), R === void 0) {
      var Y = i.get(d);
      if (Y !== void 0) {
        i.delete(d), _.set(d, Y);
        var ie = f ? f.next : u;
        ce(e, f, Y), ce(e, Y, ie), Ke(Y, ie, n), f = Y;
      } else {
        var ne = u ? (
          /** @type {TemplateNode} */
          u.e.nodes_start
        ) : n;
        f = Ft(
          ne,
          e,
          f,
          f === null ? e.first : f.next,
          h,
          d,
          G,
          s,
          l,
          T
        );
      }
      _.set(d, f), z = [], M = [], u = f.next;
      continue;
    }
    if (o && It(R, h, G, l), (R.e.f & Ye) !== 0 && (tt(R.e), y && (R.a?.unfix(), (V ??= /* @__PURE__ */ new Set()).delete(R))), R !== u) {
      if (C !== void 0 && C.has(R)) {
        if (z.length < M.length) {
          var se = M[0], re;
          f = se.prev;
          var Z = z[0], w = z[z.length - 1];
          for (re = 0; re < z.length; re += 1)
            Ke(z[re], se, n);
          for (re = 0; re < M.length; re += 1)
            C.delete(M[re]);
          ce(e, Z.prev, w.next), ce(e, f, Z), ce(e, w, se), u = se, f = w, G -= 1, z = [], M = [];
        } else
          C.delete(R), Ke(R, u, n), ce(e, R.prev, R.next), ce(e, R, f === null ? e.first : f.next), ce(e, f, R), f = R;
        continue;
      }
      for (z = [], M = []; u !== null && u.k !== d; )
        (u.e.f & Ye) === 0 && (C ??= /* @__PURE__ */ new Set()).add(u), M.push(u), u = u.next;
      if (u === null)
        continue;
      R = u;
    }
    z.push(R), f = R, u = R.next;
  }
  if (u !== null || C !== void 0) {
    for (var P = C === void 0 ? [] : Ct(C); u !== null; )
      (u.e.f & Ye) === 0 && P.push(u), u = u.next;
    var U = P.length;
    if (U > 0) {
      var b = (l & St) !== 0 && x === 0 ? n : null;
      if (y) {
        for (G = 0; G < U; G += 1)
          P[G].a?.measure();
        for (G = 0; G < U; G += 1)
          P[G].a?.fix();
      }
      zr(e, P, b);
    }
  }
  y && Mt(() => {
    if (V !== void 0)
      for (R of V)
        R.a?.apply();
  }), r.first = e.first && e.first.e, r.last = f && f.e;
  for (var B of i.values())
    Lt(B.e);
  i.clear();
}
function It(r, t, e, i) {
  (i & Ue) !== 0 && nt(r.v, t), (i & qe) !== 0 ? nt(
    /** @type {Value<number>} */
    r.i,
    e
  ) : r.i = e;
}
function Ft(r, t, e, i, n, s, l, c, T, y, o) {
  var x = (T & Ue) !== 0, _ = (T & fr) === 0, D = x ? _ ? ee(n, !1, !1) : it(n) : n, u = (T & qe) === 0 ? l : it(l), C = {
    i: u,
    v: D,
    k: s,
    a: null,
    // @ts-expect-error
    e: null,
    prev: e,
    next: i
  };
  try {
    if (r === null) {
      var f = document.createDocumentFragment();
      f.append(r = ze());
    }
    return C.e = Re(() => c(
      /** @type {Node} */
      r,
      D,
      u,
      y
    ), Or), C.e.prev = e && e.e, C.e.next = i && i.e, e === null ? o || (t.first = C) : (e.next = C, e.e.next = C.e), i !== null && (i.prev = C, i.e.prev = C.e), C;
  } finally {
  }
}
function Ke(r, t, e) {
  for (var i = r.next ? (
    /** @type {TemplateNode} */
    r.next.e.nodes_start
  ) : e, n = t ? (
    /** @type {TemplateNode} */
    t.e.nodes_start
  ) : e, s = (
    /** @type {TemplateNode} */
    r.e.nodes_start
  ); s !== null && s !== i; ) {
    var l = (
      /** @type {TemplateNode} */
      vr(s)
    );
    n.before(s), s = l;
  }
}
function ce(r, t, e) {
  t === null ? r.first = e : (t.next = e, t.e.next = e && e.e), e !== null && (e.prev = t, e.e.prev = t && t.e);
}
const lt = [...` 	
\r\f \v\uFEFF`];
function Ur(r, t, e) {
  var i = r == null ? "" : "" + r;
  if (t && (i = i ? i + " " + t : t), e) {
    for (var n in e)
      if (e[n])
        i = i ? i + " " + n : n;
      else if (i.length)
        for (var s = n.length, l = 0; (l = i.indexOf(n, l)) >= 0; ) {
          var c = l + s;
          (l === 0 || lt.includes(i[l - 1])) && (c === i.length || lt.includes(i[c])) ? i = (l === 0 ? "" : i.substring(0, l)) + i.substring(c + 1) : l = c;
        }
  }
  return i === "" ? null : i;
}
function ue(r, t, e, i, n, s) {
  var l = r.__className;
  if (l !== e || l === void 0) {
    var c = Ur(e, i, s);
    c == null ? r.removeAttribute("class") : r.className = c, r.__className = e;
  } else if (s && n !== s)
    for (var T in s) {
      var y = !!s[T];
      (n == null || y !== !!n[T]) && r.classList.toggle(T, y);
    }
  return s;
}
function Dt(r, t, e = !1) {
  if (r.multiple) {
    if (t == null)
      return;
    if (!rt(t))
      return Br();
    for (var i of r.options)
      i.selected = t.includes(Ce(i));
    return;
  }
  for (i of r.options) {
    var n = Ce(i);
    if (mr(n, t)) {
      i.selected = !0;
      return;
    }
  }
  (!e || t !== void 0) && (r.selectedIndex = -1);
}
function Hr(r) {
  var t = new MutationObserver(() => {
    Dt(r, r.__value);
  });
  t.observe(r, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), br(() => {
    t.disconnect();
  });
}
function Qe(r, t, e = t) {
  var i = !0;
  pr(r, "change", (n) => {
    var s = n ? "[selected]" : ":checked", l;
    if (r.multiple)
      l = [].map.call(r.querySelectorAll(s), Ce);
    else {
      var c = r.querySelector(s) ?? // will fall back to first non-disabled option if no option is selected
      r.querySelector("option:not([disabled])");
      l = c && Ce(c);
    }
    e(l);
  }), Pt(() => {
    var n = t();
    if (Dt(r, n, i), i && n === void 0) {
      var s = r.querySelector(":checked");
      s !== null && (n = Ce(s), e(n));
    }
    r.__value = n, i = !1;
  }), Hr(r);
}
function Ce(r) {
  return "__value" in r ? r.__value : r.value;
}
const Wr = Symbol("is custom element"), Jr = Symbol("is html");
function Yr(r, t) {
  var e = Rt(r);
  e.value === (e.value = // treat null and undefined the same for the initial value
  t ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  r.value === t && (t !== 0 || r.nodeName !== "PROGRESS") || (r.value = t ?? "");
}
function te(r, t, e, i) {
  var n = Rt(r);
  n[t] !== (n[t] = e) && (t === "loading" && (r[wr] = e), e == null ? r.removeAttribute(t) : typeof e != "string" && Zr(r).includes(t) ? r[t] = e : r.setAttribute(t, e));
}
function Rt(r) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    r.__attributes ??= {
      [Wr]: r.nodeName.includes("-"),
      [Jr]: r.namespaceURI === kr
    }
  );
}
var ot = /* @__PURE__ */ new Map();
function Zr(r) {
  var t = r.getAttribute("is") || r.nodeName, e = ot.get(t);
  if (e) return e;
  ot.set(t, e = []);
  for (var i, n = r, s = Element.prototype; s !== n; ) {
    i = xr(n);
    for (var l in i)
      i[l].set && e.push(l);
    n = yr(n);
  }
  return e;
}
function ct(r, t) {
  return r === t || r?.[Et] === t;
}
function Kr(r = {}, t, e, i) {
  return Pt(() => {
    var n, s;
    return Cr(() => {
      n = s, s = [], v(() => {
        r !== e(...s) && (t(r, ...s), n && ct(e(...n), r) && t(null, ...n));
      });
    }), () => {
      Mt(() => {
        s && ct(e(...s), r) && t(null, ...s);
      });
    };
  }), r;
}
function he(r = !1) {
  const t = (
    /** @type {ComponentContextLegacy} */
    xe
  ), e = t.l.u;
  if (!e) return;
  let i = () => k(t.s);
  if (r) {
    let n = 0, s = (
      /** @type {Record<string, any>} */
      {}
    );
    const l = Tt(() => {
      let c = !1;
      const T = t.s;
      for (const y in T)
        T[y] !== s[y] && (s[y] = T[y], c = !0);
      return c && n++, n;
    });
    i = () => a(l);
  }
  e.b.length && Lr(() => {
    ut(t, i), st(e.b);
  }), Xe(() => {
    const n = v(() => e.m.map(Sr));
    return () => {
      for (const s of n)
        typeof s == "function" && s();
    };
  }), e.a.length && Xe(() => {
    ut(t, i), st(e.a);
  });
}
function ut(r, t) {
  if (r.l.s)
    for (const e of r.l.s) a(e);
  t();
}
let Me = !1;
function Qr(r) {
  var t = Me;
  try {
    return Me = !1, [r(), Me];
  } finally {
    Me = t;
  }
}
function O(r, t, e, i) {
  var n = !At || (e & Rr) !== 0, s = (e & Nr) !== 0, l = (e & Fr) !== 0, c = (
    /** @type {V} */
    i
  ), T = !0, y = () => (T && (T = !1, c = l ? v(
    /** @type {() => V} */
    i
  ) : (
    /** @type {V} */
    i
  )), c), o;
  if (s) {
    var x = Et in r || jr in r;
    o = Mr(r, t)?.set ?? (x && t in r ? (M) => r[t] = M : void 0);
  }
  var _, D = !1;
  s ? [_, D] = Qr(() => (
    /** @type {V} */
    r[t]
  )) : _ = /** @type {V} */
  r[t], _ === void 0 && i !== void 0 && (_ = y(), o && (n && Pr(), o(_)));
  var u;
  if (n ? u = () => {
    var M = (
      /** @type {V} */
      r[t]
    );
    return M === void 0 ? y() : (T = !0, M);
  } : u = () => {
    var M = (
      /** @type {V} */
      r[t]
    );
    return M !== void 0 && (c = /** @type {V} */
    void 0), M === void 0 ? c : M;
  }, n && (e & Er) === 0)
    return u;
  if (o) {
    var C = r.$$legacy;
    return (
      /** @type {() => V} */
      (function(M, h) {
        return arguments.length > 0 ? ((!n || !h || C || D) && o(h ? u() : M), M) : u();
      })
    );
  }
  var f = !1, V = ((e & Ir) !== 0 ? Tt : Le)(() => (f = !1, u()));
  s && a(V);
  var z = (
    /** @type {Effect} */
    et
  );
  return (
    /** @type {() => V} */
    (function(M, h) {
      if (arguments.length > 0) {
        const d = h ? a(V) : n && s ? Tr(M) : M;
        return q(V, d), f = !0, c !== void 0 && (c = d), M;
      }
      return Dr && f || (z.f & Ar) !== 0 ? V.v : a(V);
    })
  );
}
function Xr(r) {
  xe === null && Nt(), At && xe.l !== null ? ea(xe).m.push(r) : Xe(() => {
    const t = v(r);
    if (typeof t == "function") return (
      /** @type {() => void} */
      t
    );
  });
}
function $r(r, t, { bubbles: e = !1, cancelable: i = !1 } = {}) {
  return new CustomEvent(r, { detail: t, bubbles: e, cancelable: i });
}
function pe() {
  const r = xe;
  return r === null && Nt(), (t, e, i) => {
    const n = (
      /** @type {Record<string, Function | Function[]>} */
      r.s.$$events?.[
        /** @type {string} */
        t
      ]
    );
    if (n) {
      const s = rt(n) ? n.slice() : [n], l = $r(
        /** @type {string} */
        t,
        e,
        i
      );
      for (const c of s)
        c.call(r.x, l);
      return !l.defaultPrevented;
    }
    return !0;
  };
}
function ea(r) {
  var t = (
    /** @type {ComponentContextLegacy} */
    r.l
  );
  return t.u ??= { a: [], b: [], m: [] };
}
const ta = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(ta);
Vr();
const ra = "en", Be = (
  /** @type {const} */
  ["en", "fr", "ar", "es"]
), jt = "PARAGLIDE_LOCALE", aa = 3456e4, Vt = [
  "cookie",
  "globalVariable",
  "baseLocale"
];
globalThis.__paraglide = {};
let De, ft = !1, $ = () => {
  let r;
  for (const t of Vt) {
    if (t === "cookie")
      r = ia();
    else if (t === "baseLocale")
      r = ra;
    else if (t === "globalVariable" && De !== void 0)
      r = De;
    else if (Ot(t) && Oe.has(t)) {
      const e = Oe.get(t);
      if (e) {
        const i = e.getLocale();
        if (i instanceof Promise)
          continue;
        r = i;
      }
    }
    if (r !== void 0) {
      const e = na(r);
      return ft || (De = e, ft = !0, be(e, { reload: !1 })), e;
    }
  }
  throw new Error("No locale found. Read the docs https://inlang.com/m/gerre34r/library-inlang-paraglideJs/errors#no-locale-found");
}, be = (r, t) => {
  const e = {
    reload: !0,
    ...t
  };
  let i;
  try {
    i = $();
  } catch {
  }
  for (const n of Vt)
    if (n === "globalVariable")
      De = r;
    else if (n === "cookie") {
      if (typeof document > "u" || typeof window > "u")
        continue;
      const s = `${jt}=${r}; path=/; max-age=${aa}`;
      document.cookie = s;
    } else {
      if (n === "baseLocale")
        continue;
      if (Ot(n) && Oe.has(n)) {
        const s = Oe.get(n);
        if (s) {
          const l = s.setLocale(r);
          l instanceof Promise && l.catch((c) => {
            console.warn(`Custom strategy "${n}" setLocale failed:`, c);
          });
        }
      }
    }
  e.reload && window.location && r !== i && window.location.reload();
};
function Bt(r) {
  return r ? Be.includes(r) : !1;
}
function na(r) {
  if (Bt(r) === !1)
    throw new Error(`Invalid locale: ${r}. Expected one of: ${Be.join(", ")}`);
  return r;
}
function ia() {
  if (typeof document > "u" || !document.cookie)
    return;
  const t = document.cookie.match(new RegExp(`(^| )${jt}=([^;]+)`))?.[2];
  if (Bt(t))
    return t;
}
const Oe = /* @__PURE__ */ new Map();
function Ot(r) {
  return typeof r == "string" && /^custom-[A-Za-z0-9_-]+$/.test(r);
}
const Gt = (
  /** @type {(inputs: {}) => string} */
  () => "Member Directory"
), sa = (
  /** @type {(inputs: {}) => string} */
  () => "دليل الأعضاء"
), la = (
  /** @type {(inputs: {}) => string} */
  () => "Directorio de Miembros"
), oa = Gt, vt = /* @__NO_SIDE_EFFECTS__ */ (r = {}, t = {}) => {
  const e = t.locale ?? $();
  return e === "en" ? Gt() : e === "fr" ? oa() : e === "ar" ? sa() : la();
}, zt = (
  /** @type {(inputs: {}) => string} */
  () => "Search members..."
), ca = (
  /** @type {(inputs: {}) => string} */
  () => "البحث في الأعضاء..."
), ua = (
  /** @type {(inputs: {}) => string} */
  () => "Buscar miembros..."
), fa = zt, Ge = /* @__NO_SIDE_EFFECTS__ */ (r = {}, t = {}) => {
  const e = t.locale ?? $();
  return e === "en" ? zt() : e === "fr" ? fa() : e === "ar" ? ca() : ua();
}, qt = (
  /** @type {(inputs: {}) => string} */
  () => "Filter by tier"
), va = (
  /** @type {(inputs: {}) => string} */
  () => "تصفية حسب الفئة"
), da = (
  /** @type {(inputs: {}) => string} */
  () => "Filtrar por nivel"
), _a = qt, Pe = /* @__NO_SIDE_EFFECTS__ */ (r = {}, t = {}) => {
  const e = t.locale ?? $();
  return e === "en" ? qt() : e === "fr" ? _a() : e === "ar" ? va() : da();
}, Ut = (
  /** @type {(inputs: {}) => string} */
  () => "No members found matching your search"
), ha = (
  /** @type {(inputs: {}) => string} */
  () => "لم يتم العثور على أعضاء تطابق بحثك"
), ga = (
  /** @type {(inputs: {}) => string} */
  () => "No se encontraron miembros que coincidan con su búsqueda"
), pa = Ut, dt = /* @__NO_SIDE_EFFECTS__ */ (r = {}, t = {}) => {
  const e = t.locale ?? $();
  return e === "en" ? Ut() : e === "fr" ? pa() : e === "ar" ? ha() : ga();
}, Ht = (
  /** @type {(inputs: {}) => string} */
  () => "Loading members..."
), ma = (
  /** @type {(inputs: {}) => string} */
  () => "جارٍ تحميل الأعضاء..."
), ba = (
  /** @type {(inputs: {}) => string} */
  () => "Cargando miembros..."
), wa = Ht, _t = /* @__NO_SIDE_EFFECTS__ */ (r = {}, t = {}) => {
  const e = t.locale ?? $();
  return e === "en" ? Ht() : e === "fr" ? wa() : e === "ar" ? ma() : ba();
}, Wt = (
  /** @type {(inputs: { date: NonNullable<unknown> }) => string} */
  (r) => `Member since ${r.date}`
), ka = (
  /** @type {(inputs: { date: NonNullable<unknown> }) => string} */
  (r) => `عضو منذ ${r.date}`
), ya = (
  /** @type {(inputs: { date: NonNullable<unknown> }) => string} */
  (r) => `Miembro desde ${r.date}`
), xa = Wt, ht = /* @__NO_SIDE_EFFECTS__ */ (r, t = {}) => {
  const e = t.locale ?? $();
  return e === "en" ? Wt(r) : e === "fr" ? xa(r) : e === "ar" ? ka(r) : ya(r);
}, Jt = (
  /** @type {(inputs: {}) => string} */
  () => "View profile"
), Ca = (
  /** @type {(inputs: {}) => string} */
  () => "عرض الملف الشخصي"
), La = (
  /** @type {(inputs: {}) => string} */
  () => "Ver perfil"
), Sa = Jt, Ee = /* @__NO_SIDE_EFFECTS__ */ (r = {}, t = {}) => {
  const e = t.locale ?? $();
  return e === "en" ? Jt() : e === "fr" ? Sa() : e === "ar" ? Ca() : La();
}, Yt = (
  /** @type {(inputs: {}) => string} */
  () => "Premium"
), Ma = (
  /** @type {(inputs: {}) => string} */
  () => "مميز"
), Pa = (
  /** @type {(inputs: {}) => string} */
  () => "Premium"
), Ea = Yt, we = /* @__NO_SIDE_EFFECTS__ */ (r = {}, t = {}) => {
  const e = t.locale ?? $();
  return e === "en" ? Yt() : e === "fr" ? Ea() : e === "ar" ? Ma() : Pa();
}, Zt = (
  /** @type {(inputs: {}) => string} */
  () => "Free"
), Ta = (
  /** @type {(inputs: {}) => string} */
  () => "مجاني"
), Aa = (
  /** @type {(inputs: {}) => string} */
  () => "Gratis"
), Na = Zt, ke = /* @__NO_SIDE_EFFECTS__ */ (r = {}, t = {}) => {
  const e = t.locale ?? $();
  return e === "en" ? Zt() : e === "fr" ? Na() : e === "ar" ? Ta() : Aa();
}, Kt = (
  /** @type {(inputs: {}) => string} */
  () => "Complimentary"
), Ia = (
  /** @type {(inputs: {}) => string} */
  () => "مجاني مؤقت"
), Fa = (
  /** @type {(inputs: {}) => string} */
  () => "Cortesía"
), Da = Kt, ye = /* @__NO_SIDE_EFFECTS__ */ (r = {}, t = {}) => {
  const e = t.locale ?? $();
  return e === "en" ? Kt() : e === "fr" ? Da() : e === "ar" ? Ia() : Fa();
}, Qt = (
  /** @type {(inputs: {}) => string} */
  () => "Active"
), Ra = (
  /** @type {(inputs: {}) => string} */
  () => "نشط"
), ja = (
  /** @type {(inputs: {}) => string} */
  () => "Activo"
), Va = Qt, Te = /* @__NO_SIDE_EFFECTS__ */ (r = {}, t = {}) => {
  const e = t.locale ?? $();
  return e === "en" ? Qt() : e === "fr" ? Va() : e === "ar" ? Ra() : ja();
}, Xt = (
  /** @type {(inputs: {}) => string} */
  () => "Canceled"
), Ba = (
  /** @type {(inputs: {}) => string} */
  () => "ملغي"
), Oa = (
  /** @type {(inputs: {}) => string} */
  () => "Cancelado"
), Ga = Xt, Ae = /* @__NO_SIDE_EFFECTS__ */ (r = {}, t = {}) => {
  const e = t.locale ?? $();
  return e === "en" ? Xt() : e === "fr" ? Ga() : e === "ar" ? Ba() : Oa();
}, $t = (
  /** @type {(inputs: {}) => string} */
  () => "Past Due"
), za = (
  /** @type {(inputs: {}) => string} */
  () => "متأخر الدفع"
), qa = (
  /** @type {(inputs: {}) => string} */
  () => "Vencido"
), Ua = $t, Ne = /* @__NO_SIDE_EFFECTS__ */ (r = {}, t = {}) => {
  const e = t.locale ?? $();
  return e === "en" ? $t() : e === "fr" ? Ua() : e === "ar" ? za() : qa();
}, er = (
  /** @type {(inputs: {}) => string} */
  () => "Clear Filters"
), Ha = (
  /** @type {(inputs: {}) => string} */
  () => "مسح المرشحات"
), Wa = (
  /** @type {(inputs: {}) => string} */
  () => "Limpiar filtros"
), Ja = er, gt = /* @__NO_SIDE_EFFECTS__ */ (r = {}, t = {}) => {
  const e = t.locale ?? $();
  return e === "en" ? er() : e === "fr" ? Ja() : e === "ar" ? Ha() : Wa();
}, tr = (
  /** @type {(inputs: {}) => string} */
  () => "Loading..."
), Ya = (
  /** @type {(inputs: {}) => string} */
  () => "جارٍ التحميل..."
), Za = (
  /** @type {(inputs: {}) => string} */
  () => "Cargando..."
), Ka = tr, pt = /* @__NO_SIDE_EFFECTS__ */ (r = {}, t = {}) => {
  const e = t.locale ?? $();
  return e === "en" ? tr() : e === "fr" ? Ka() : e === "ar" ? Ya() : Za();
}, rr = (
  /** @type {(inputs: {}) => string} */
  () => "Next"
), Qa = (
  /** @type {(inputs: {}) => string} */
  () => "التالي"
), Xa = (
  /** @type {(inputs: {}) => string} */
  () => "Siguiente"
), $a = rr, Ie = /* @__NO_SIDE_EFFECTS__ */ (r = {}, t = {}) => {
  const e = t.locale ?? $();
  return e === "en" ? rr() : e === "fr" ? $a() : e === "ar" ? Qa() : Xa();
}, ar = (
  /** @type {(inputs: {}) => string} */
  () => "Previous"
), en = (
  /** @type {(inputs: {}) => string} */
  () => "السابق"
), tn = (
  /** @type {(inputs: {}) => string} */
  () => "Anterior"
), rn = ar, Fe = /* @__NO_SIDE_EFFECTS__ */ (r = {}, t = {}) => {
  const e = t.locale ?? $();
  return e === "en" ? ar() : e === "fr" ? rn() : e === "ar" ? en() : tn();
}, nr = (
  /** @type {(inputs: {}) => string} */
  () => "Page"
), an = (
  /** @type {(inputs: {}) => string} */
  () => "صفحة"
), nn = (
  /** @type {(inputs: {}) => string} */
  () => "Página"
), sn = nr, mt = /* @__NO_SIDE_EFFECTS__ */ (r = {}, t = {}) => {
  const e = t.locale ?? $();
  return e === "en" ? nr() : e === "fr" ? sn() : e === "ar" ? an() : nn();
}, ir = (
  /** @type {(inputs: {}) => string} */
  () => "of"
), ln = (
  /** @type {(inputs: {}) => string} */
  () => "من"
), on = (
  /** @type {(inputs: {}) => string} */
  () => "de"
), cn = ir, bt = /* @__NO_SIDE_EFFECTS__ */ (r = {}, t = {}) => {
  const e = t.locale ?? $();
  return e === "en" ? ir() : e === "fr" ? cn() : e === "ar" ? ln() : on();
};
var un = /* @__PURE__ */ j('<div class="member-avatar svelte-13mtud8"><img loading="lazy" class="avatar-image svelte-13mtud8"/></div>'), fn = /* @__PURE__ */ j('<div class="member-avatar member-avatar--placeholder svelte-13mtud8"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"></circle><path d="M6 21C6 17.134 8.686 14 12 14C15.314 14 18 17.134 18 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg></div>'), vn = /* @__PURE__ */ j('<button type="button" class="profile-button svelte-13mtud8"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-13mtud8"><path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>'), dn = /* @__PURE__ */ j('<p class="member-joined svelte-13mtud8"> </p>'), _n = /* @__PURE__ */ j("<span> </span>"), hn = /* @__PURE__ */ j('<div class="member-tiers svelte-13mtud8"></div>'), gn = /* @__PURE__ */ j(' <div><!> <div class="member-info svelte-13mtud8"><div class="member-header svelte-13mtud8"><h3 class="member-name svelte-13mtud8"> </h3> <!></div> <!> <!></div></div>', 1), pn = /* @__PURE__ */ j("<div></div>");
function mn(r, t) {
  de(t, !1);
  let e = O(t, "members", 24, () => []), i = O(t, "showAvatars", 8, !0);
  O(t, "showRealNames", 8, !0);
  let n = O(t, "showJoinDates", 8, !0), s = O(t, "showTiers", 8, !0), l = O(t, "showProfiles", 8, !1), c = O(t, "loading", 8, !1), T = O(t, "layout", 8, "grid"), y = O(t, "clickable", 8, !1);
  const o = pe();
  function x(h) {
    o("memberClick", { member: h });
  }
  function _(h, d) {
    d.stopPropagation(), o("profileClick", { member: h });
  }
  function D(h) {
    try {
      return new Date(h).toLocaleDateString();
    } catch {
      return h;
    }
  }
  function u(h) {
    return !h.subscriptions || !Array.isArray(h.subscriptions) ? [] : h.subscriptions.map((d) => d.tier?.type).filter((d) => d).filter((d, R, G) => G.indexOf(d) === R);
  }
  function C(h) {
    switch (h) {
      case "free":
        return /* @__PURE__ */ ke();
      case "paid":
        return /* @__PURE__ */ we();
      case "comped":
        return /* @__PURE__ */ ye();
      default:
        return h;
    }
  }
  function f(h) {
    return h.name && typeof h.name == "string" ? h.name : h.username && typeof h.username == "string" ? h.username : (console.log("MemberGrid: member:", h), "Member");
  }
  function V(h, d) {
    (h.key === "Enter" || h.key === " ") && (h.preventDefault(), x(d));
  }
  he();
  var z = pn();
  let M;
  Se(z, 5, e, (h) => h.id, (h, d) => {
    var R = gn(), G = fe(R), Y = F(G);
    let ie;
    var ne = m(Y);
    {
      var se = (p) => {
        var g = un(), S = m(g);
        J(
          (L) => {
            te(S, "src", (a(d), v(() => a(d).avatar_image))), te(S, "alt", L);
          },
          [
            () => (a(d), v(() => f(a(d))))
          ]
        ), I(p, g);
      }, re = (p) => {
        var g = je(), S = fe(g);
        {
          var L = (Q) => {
            var ae = fn();
            I(Q, ae);
          };
          H(
            S,
            (Q) => {
              i() && Q(L);
            },
            !0
          );
        }
        I(p, g);
      };
      H(ne, (p) => {
        k(i()), a(d), v(() => i() && a(d).avatar_image) ? p(se) : p(re, !1);
      });
    }
    var Z = F(ne, 2), w = m(Z), P = m(w), U = m(P), b = F(P, 2);
    {
      var B = (p) => {
        var g = vn();
        J(
          (S, L) => {
            te(g, "aria-label", S), te(g, "title", L);
          },
          [
            () => (k(Ee), v(Ee)),
            () => (k(Ee), v(Ee))
          ]
        ), X("click", g, (S) => _(a(d), S)), I(p, g);
      };
      H(b, (p) => {
        l() && p(B);
      });
    }
    var W = F(w, 2);
    {
      var N = (p) => {
        var g = dn(), S = m(g);
        J((L) => K(S, L), [
          () => (k(ht), a(d), v(() => /* @__PURE__ */ ht({ date: D(a(d).created_at) })))
        ]), I(p, g);
      };
      H(W, (p) => {
        k(n()), a(d), v(() => n() && a(d).created_at) && p(N);
      });
    }
    var A = F(W, 2);
    {
      var E = (p) => {
        const g = Le(() => (a(d), v(() => u(a(d)))));
        var S = je(), L = fe(S);
        {
          var Q = (ae) => {
            var oe = hn();
            Se(oe, 5, () => a(g), Ve, (me, ve) => {
              var ge = _n(), We = m(ge);
              J(
                (Je) => {
                  ue(ge, 1, `tier-badge tier-${a(ve) ?? ""}`, "svelte-13mtud8"), K(We, Je);
                },
                [
                  () => (a(ve), v(() => C(a(ve))))
                ]
              ), I(me, ge);
            }), I(ae, oe);
          };
          H(L, (ae) => {
            k(a(g)), v(() => a(g).length > 0) && ae(Q);
          });
        }
        I(p, S);
      };
      H(A, (p) => {
        s() && p(E);
      });
    }
    J(
      (p, g, S) => {
        K(G, `${p ?? ""} `), ie = ue(Y, 1, "member-card svelte-13mtud8", null, ie, g), te(Y, "role", y() ? "button" : void 0), te(Y, "tabindex", y() ? 0 : void 0), K(U, S);
      },
      [
        () => (a(d), v(() => console.log("MemberGrid: member:", a(d)))),
        () => ({ "member-card--clickable": y() }),
        () => (a(d), v(() => f(a(d))))
      ]
    ), X("click", Y, () => x(a(d))), X("keydown", Y, (p) => V(p, a(d))), I(h, R);
  }), J((h) => M = ue(z, 1, "member-grid svelte-13mtud8", null, M, h), [
    () => ({
      "member-grid--list": T() === "list",
      "member-grid--loading": c()
    })
  ]), I(r, z), _e();
}
var bn = /* @__PURE__ */ j('<button type="button" class="clear-button svelte-98aafb" aria-label="Clear search"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>'), wn = /* @__PURE__ */ j('<div class="search-bar svelte-98aafb"><div class="search-input-container svelte-98aafb"><svg class="search-icon svelte-98aafb" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 14L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> <input type="text" class="search-input svelte-98aafb"/> <!></div></div>');
function kn(r, t) {
  de(t, !1);
  let e = O(t, "value", 12, ""), i = O(t, "placeholder", 8, ""), n = O(t, "disabled", 8, !1);
  const s = pe();
  let l = ee();
  function c(C) {
    const f = C.target;
    e(f.value), s("search", e());
  }
  function T() {
    e(""), s("clear"), s("search", ""), a(l) && a(l).focus();
  }
  function y(C) {
    C.key === "Escape" && T();
  }
  he();
  var o = wn(), x = m(o), _ = F(m(x), 2);
  Kr(_, (C) => q(l, C), () => a(l));
  var D = F(_, 2);
  {
    var u = (C) => {
      var f = bn();
      J(() => f.disabled = n()), X("click", f, T), I(C, f);
    };
    H(D, (C) => {
      e() && C(u);
    });
  }
  J(
    (C) => {
      Yr(_, e()), te(_, "placeholder", C), _.disabled = n();
    },
    [
      () => (k(i()), k(Ge), v(() => i() || /* @__PURE__ */ Ge()))
    ]
  ), X("input", _, c), X("keydown", _, y), I(r, o), _e();
}
var yn = /* @__PURE__ */ j('<div class="filter-group svelte-1mp3hhf"><label for="tier-filter" class="filter-label svelte-1mp3hhf"> </label> <select id="tier-filter" class="filter-select svelte-1mp3hhf"><option>All tiers</option><option> </option><option> </option><option> </option></select></div>'), xn = /* @__PURE__ */ j('<div class="filter-group svelte-1mp3hhf"><label for="status-filter" class="filter-label svelte-1mp3hhf">Status</label> <select id="status-filter" class="filter-select svelte-1mp3hhf"><option>All statuses</option><option> </option><option> </option><option> </option></select></div>'), Cn = /* @__PURE__ */ j("<option> </option>"), Ln = /* @__PURE__ */ j('<div class="filter-group svelte-1mp3hhf"><label for="newsletter-filter" class="filter-label svelte-1mp3hhf">Groups</label> <select id="newsletter-filter" class="filter-select svelte-1mp3hhf"><option>Select group</option><!></select></div>'), Sn = /* @__PURE__ */ j('<button type="button" class="clear-filters-button svelte-1mp3hhf"> </button>'), Mn = /* @__PURE__ */ j('<span class="filter-tag svelte-1mp3hhf"> <button type="button" class="remove-filter svelte-1mp3hhf" aria-label="Remove tier filter"><svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></span>'), Pn = /* @__PURE__ */ j('<span class="filter-tag svelte-1mp3hhf"> <button type="button" class="remove-filter svelte-1mp3hhf" aria-label="Remove status filter"><svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></span>'), En = /* @__PURE__ */ j('<span class="filter-tag svelte-1mp3hhf"> <button type="button" class="remove-filter svelte-1mp3hhf"><svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></span>'), Tn = /* @__PURE__ */ j('<div class="active-filters svelte-1mp3hhf"><!> <!> <!></div>'), An = /* @__PURE__ */ j('<div class="filter-panel svelte-1mp3hhf"><div class="filter-controls svelte-1mp3hhf"><!> <!> <!> <!></div> <!></div>');
function Nn(r, t) {
  de(t, !1);
  const e = ee();
  let i = O(t, "filters", 28, () => ({})), n = O(t, "disabled", 8, !1), s = O(t, "availableNewsletters", 24, () => []), l = O(t, "showTierFilter", 8, !0), c = O(t, "showStatusFilter", 8, !0), T = O(t, "showNewsletterFilter", 8, !0);
  const y = pe();
  let o = ee(i().tier || ""), x = ee(i().status || ""), _ = ee(i().newsletters ? i().newsletters.split(",") : []), D = ee("");
  function u(w) {
    const P = w.target;
    q(o, P.value), f();
  }
  function C(w) {
    const P = w.target;
    q(x, P.value), f();
  }
  function f() {
    const w = {};
    a(o) && (w.tier = a(o)), a(x) && (w.status = a(x)), a(_).length > 0 && (w.newsletters = a(_).join(",")), i(w), y("change", w);
  }
  function V() {
    q(o, ""), q(x, ""), q(_, []), i({}), y("clear"), y("change", {});
  }
  le(
    () => (k(i()), a(o), a(x), a(_)),
    () => {
      i().tier !== a(o) && q(o, i().tier || ""), i().status !== a(x) && q(x, i().status || "");
      const w = a(_).join(","), P = i().newsletters || "";
      P !== w && q(_, P ? P.split(",") : []);
    }
  ), le(
    () => (a(o), a(x), a(_)),
    () => {
      q(e, a(o) || a(x) || a(_).length > 0);
    }
  ), le(() => (k(i()), a(_)), () => {
    const w = i().newsletters || "";
    a(_).join(",") !== w && f();
  }), He(), he();
  var z = An(), M = m(z), h = m(M);
  {
    var d = (w) => {
      var P = yn(), U = m(P), b = m(U), B = F(U, 2);
      J(() => {
        a(o), Ze(() => {
          n();
        });
      });
      var W = m(B);
      W.value = W.__value = "";
      var N = F(W), A = m(N);
      N.value = N.__value = "free";
      var E = F(N), p = m(E);
      E.value = E.__value = "paid";
      var g = F(E), S = m(g);
      g.value = g.__value = "comped", J(
        (L, Q, ae, oe) => {
          K(b, L), B.disabled = n(), K(A, Q), K(p, ae), K(S, oe);
        },
        [
          () => (k(Pe), v(Pe)),
          () => (k(ke), v(ke)),
          () => (k(we), v(we)),
          () => (k(ye), v(ye))
        ]
      ), Qe(B, () => a(o), (L) => q(o, L)), X("input", B, (L) => {
        const Q = L.target;
        q(o, Q.value), u(L);
      }), I(w, P);
    };
    H(h, (w) => {
      l() && w(d);
    });
  }
  var R = F(h, 2);
  {
    var G = (w) => {
      var P = xn(), U = F(m(P), 2);
      J(() => {
        a(x), Ze(() => {
          n();
        });
      });
      var b = m(U);
      b.value = b.__value = "";
      var B = F(b), W = m(B);
      B.value = B.__value = "active";
      var N = F(B), A = m(N);
      N.value = N.__value = "canceled";
      var E = F(N), p = m(E);
      E.value = E.__value = "past_due", J(
        (g, S, L) => {
          U.disabled = n(), K(W, g), K(A, S), K(p, L);
        },
        [
          () => (k(Te), v(Te)),
          () => (k(Ae), v(Ae)),
          () => (k(Ne), v(Ne))
        ]
      ), Qe(U, () => a(x), (g) => q(x, g)), X("input", U, (g) => {
        const S = g.target;
        q(x, S.value), C(g);
      }), I(w, P);
    };
    H(R, (w) => {
      c() && w(G);
    });
  }
  var Y = F(R, 2);
  {
    var ie = (w) => {
      var P = Ln(), U = F(m(P), 2);
      J(() => {
        a(D), Ze(() => {
          a(_), n(), s();
        });
      });
      var b = m(U);
      b.value = b.__value = "";
      var B = F(b);
      Se(B, 1, s, Ve, (W, N) => {
        var A = Cn(), E = m(A), p = {};
        J(() => {
          K(E, (a(N), v(() => a(N).name))), p !== (p = (a(N), v(() => a(N).name))) && (A.value = (A.__value = (a(N), v(() => a(N).name))) ?? "");
        }), I(W, A);
      }), J(() => U.disabled = n()), Qe(U, () => a(D), (W) => q(D, W)), X("input", U, (W) => {
        const A = W.target.value;
        A && !a(_).includes(A) && (q(_, [...a(_), A]), f()), q(D, "");
      }), I(w, P);
    };
    H(Y, (w) => {
      k(T()), k(s()), v(() => T() && s().length > 0) && w(ie);
    });
  }
  var ne = F(Y, 2);
  {
    var se = (w) => {
      var P = Sn(), U = m(P);
      J(
        (b) => {
          P.disabled = n(), K(U, b);
        },
        [
          () => (k(gt), v(gt))
        ]
      ), X("click", P, V), I(w, P);
    };
    H(ne, (w) => {
      a(e) && w(se);
    });
  }
  var re = F(M, 2);
  {
    var Z = (w) => {
      var P = Tn(), U = m(P);
      {
        var b = (A) => {
          var E = Mn(), p = m(E), g = F(p);
          J(
            (S, L) => {
              K(p, `${S ?? ""}:
					${L ?? ""} `), g.disabled = n();
            },
            [
              () => (k(Pe), v(Pe)),
              () => (a(o), k(ke), k(we), k(ye), v(() => a(o) === "free" ? /* @__PURE__ */ ke() : a(o) === "paid" ? /* @__PURE__ */ we() : /* @__PURE__ */ ye()))
            ]
          ), X("click", g, () => {
            q(o, ""), f();
          }), I(A, E);
        };
        H(U, (A) => {
          a(o) && A(b);
        });
      }
      var B = F(U, 2);
      {
        var W = (A) => {
          var E = Pn(), p = m(E), g = F(p);
          J(
            (S) => {
              K(p, `Status:
					${S ?? ""} `), g.disabled = n();
            },
            [
              () => (a(x), k(Te), k(Ae), k(Ne), v(() => a(x) === "active" ? /* @__PURE__ */ Te() : a(x) === "canceled" ? /* @__PURE__ */ Ae() : /* @__PURE__ */ Ne()))
            ]
          ), X("click", g, () => {
            q(x, ""), f();
          }), I(A, E);
        };
        H(B, (A) => {
          a(x) && A(W);
        });
      }
      var N = F(B, 2);
      Se(N, 1, () => a(_), Ve, (A, E) => {
        var p = En(), g = m(p), S = F(g);
        J(() => {
          K(g, `Group: ${a(E) ?? ""} `), S.disabled = n(), te(S, "aria-label", `Remove ${a(E) ?? ""} filter`);
        }), X("click", S, () => {
          q(_, a(_).filter((L) => L !== a(E))), f();
        }), I(A, p);
      }), I(w, P);
    };
    H(re, (w) => {
      a(e) && w(Z);
    });
  }
  I(r, z), _e();
}
var In = /* @__PURE__ */ j('<div class="view-toggle svelte-1ptwobt" role="radiogroup" aria-label="View options"><button type="button" role="radio" aria-label="Grid view" title="Grid view"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.2" fill="none"></rect><rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.2" fill="none"></rect><rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.2" fill="none"></rect><rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.2" fill="none"></rect></svg></button> <button type="button" role="radio" aria-label="List view" title="List view"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="2" width="14" height="2" rx="1" fill="currentColor"></rect><rect x="1" y="7" width="14" height="2" rx="1" fill="currentColor"></rect><rect x="1" y="12" width="14" height="2" rx="1" fill="currentColor"></rect></svg></button></div>');
function Fn(r, t) {
  de(t, !1);
  let e = O(t, "currentView", 8, "grid"), i = O(t, "disabled", 8, !1);
  const n = pe();
  function s(D) {
    D !== e() && !i() && n("viewChange", D);
  }
  function l(D) {
    D.preventDefault(), s("grid");
  }
  function c(D) {
    D.preventDefault(), s("list");
  }
  he();
  var T = In(), y = m(T);
  let o;
  var x = F(y, 2);
  let _;
  J(
    (D, u) => {
      o = ue(y, 1, "view-toggle-button svelte-1ptwobt", null, o, D), te(y, "aria-checked", e() === "grid"), y.disabled = i(), _ = ue(x, 1, "view-toggle-button svelte-1ptwobt", null, _, u), te(x, "aria-checked", e() === "list"), x.disabled = i();
    },
    [
      () => ({ "view-toggle-button--active": e() === "grid" }),
      () => ({ "view-toggle-button--active": e() === "list" })
    ]
  ), X("click", y, l), X("click", x, c), I(r, T), _e();
}
var Dn = /* @__PURE__ */ j('<span class="pagination-ellipsis svelte-1jbhdyc">…</span>'), Rn = /* @__PURE__ */ j('<button type="button" class="page-button svelte-1jbhdyc">1</button> <!>', 1), jn = /* @__PURE__ */ j('<button type="button"> </button>'), Vn = /* @__PURE__ */ j('<span class="pagination-ellipsis svelte-1jbhdyc">…</span>'), Bn = /* @__PURE__ */ j('<!> <button type="button" class="page-button svelte-1jbhdyc"> </button>', 1), On = /* @__PURE__ */ j('<div class="page-numbers svelte-1jbhdyc"><!> <!> <!></div>'), Gn = /* @__PURE__ */ j('<div class="pagination svelte-1jbhdyc"><div class="pagination-info svelte-1jbhdyc"><span class="page-info svelte-1jbhdyc"> </span></div> <div class="pagination-controls svelte-1jbhdyc"><button type="button" class="pagination-button pagination-prev svelte-1jbhdyc"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="pagination-icon svelte-1jbhdyc"><path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> <span class="pagination-text svelte-1jbhdyc"> </span></button> <!> <button type="button" class="pagination-button pagination-next svelte-1jbhdyc"><span class="pagination-text svelte-1jbhdyc"> </span> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="pagination-icon svelte-1jbhdyc"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div></div>');
function zn(r, t) {
  de(t, !1);
  const e = ee(), i = ee(), n = ee();
  let s = O(t, "currentPage", 8, 1), l = O(t, "totalPages", 8, 1), c = O(t, "disabled", 8, !1), T = O(t, "showPageNumbers", 8, !0), y = O(t, "maxVisiblePages", 8, 5);
  const o = pe();
  function x(Z, w, P) {
    if (w <= P)
      return Array.from({ length: w }, (W, N) => N + 1);
    const U = Math.floor(P / 2);
    let b = Math.max(1, Z - U), B = Math.min(w, b + P - 1);
    return B - b + 1 < P && (b = Math.max(1, B - P + 1)), Array.from({ length: B - b + 1 }, (W, N) => b + N);
  }
  function _(Z) {
    Z === s() || Z < 1 || Z > l() || c() || o("pageChange", Z);
  }
  function D() {
    a(e) && !c() && o("pageChange", s() - 1);
  }
  function u() {
    a(i) && !c() && o("pageChange", s() + 1);
  }
  function C(Z, w) {
    (Z.key === "Enter" || Z.key === " ") && (Z.preventDefault(), _(w));
  }
  le(() => k(s()), () => {
    q(e, s() > 1);
  }), le(
    () => (k(s()), k(l())),
    () => {
      q(i, s() < l());
    }
  ), le(
    () => (k(s()), k(l()), k(y())),
    () => {
      q(n, x(s(), l(), y()));
    }
  ), He(), he();
  var f = Gn(), V = m(f), z = m(V), M = m(z), h = F(V, 2), d = m(h), R = F(m(d), 2), G = m(R), Y = F(d, 2);
  {
    var ie = (Z) => {
      var w = On(), P = m(w);
      {
        var U = (N) => {
          var A = Rn(), E = fe(A), p = F(E, 2);
          {
            var g = (S) => {
              var L = Dn();
              I(S, L);
            };
            H(p, (S) => {
              a(n), v(() => a(n)[0] > 2) && S(g);
            });
          }
          J(() => E.disabled = c()), X("click", E, () => _(1)), X("keydown", E, (S) => C(S, 1)), I(N, A);
        };
        H(P, (N) => {
          a(n), v(() => a(n)[0] > 1) && N(U);
        });
      }
      var b = F(P, 2);
      Se(b, 1, () => a(n), Ve, (N, A) => {
        var E = jn();
        let p;
        var g = m(E);
        J(
          (S) => {
            p = ue(E, 1, "page-button svelte-1jbhdyc", null, p, S), E.disabled = c(), te(E, "aria-label", `Go to page ${a(A)}`), te(E, "aria-current", a(A) === s() ? "page" : void 0), K(g, a(A));
          },
          [() => ({ active: a(A) === s() })]
        ), X("click", E, () => _(a(A))), X("keydown", E, (S) => C(S, a(A))), I(N, E);
      });
      var B = F(b, 2);
      {
        var W = (N) => {
          var A = Bn(), E = fe(A);
          {
            var p = (L) => {
              var Q = Vn();
              I(L, Q);
            };
            H(E, (L) => {
              a(n), k(l()), v(() => a(n)[a(n).length - 1] < l() - 1) && L(p);
            });
          }
          var g = F(E, 2), S = m(g);
          J(() => {
            g.disabled = c(), K(S, l());
          }), X("click", g, () => _(l())), X("keydown", g, (L) => C(L, l())), I(N, A);
        };
        H(B, (N) => {
          a(n), k(l()), v(() => a(n)[a(n).length - 1] < l()) && N(W);
        });
      }
      I(Z, w);
    };
    H(Y, (Z) => {
      T() && l() > 1 && Z(ie);
    });
  }
  var ne = F(Y, 2), se = m(ne), re = m(se);
  J(
    (Z, w, P, U, b, B) => {
      K(M, `${Z ?? ""}
			${s() ?? ""}
			${w ?? ""}
			${l() ?? ""}`), d.disabled = !a(e) || c(), te(d, "aria-label", P), K(G, U), ne.disabled = !a(i) || c(), te(ne, "aria-label", b), K(re, B);
    },
    [
      () => (k(mt), v(mt)),
      () => (k(bt), v(bt)),
      () => (k(Fe), v(Fe)),
      () => (k(Fe), v(Fe)),
      () => (k(Ie), v(Ie)),
      () => (k(Ie), v(Ie))
    ]
  ), X("click", d, D), X("click", ne, u), I(r, f), _e();
}
var qn = /* @__PURE__ */ j("<span> </span>"), Un = /* @__PURE__ */ j('<div role="status" aria-live="polite"><svg class="spinner svelte-15j9ao9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="spinner-track svelte-15j9ao9" cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.2"></circle><circle class="spinner-head svelte-15j9ao9" cx="12" cy="12" r="10" stroke="currentColor" stroke-linecap="round" stroke-dasharray="31.416" stroke-dashoffset="31.416"></circle></svg> <!></div>');
function Hn(r, t) {
  de(t, !1);
  const e = ee(), i = ee();
  let n = O(t, "size", 8, "medium"), s = O(t, "message", 8, ""), l = O(t, "showMessage", 8, !0), c = O(t, "inline", 8, !1);
  function T(f) {
    switch (f) {
      case "small":
        return { width: 16, height: 16, strokeWidth: 2 };
      case "large":
        return { width: 48, height: 48, strokeWidth: 2 };
      default:
        return { width: 24, height: 24, strokeWidth: 2 };
    }
  }
  le(() => (k(s()), pt), () => {
    q(e, s() || /* @__PURE__ */ pt());
  }), le(() => k(n()), () => {
    q(i, T(n()));
  }), He(), he();
  var y = Un();
  let o;
  var x = m(y), _ = m(x), D = F(_), u = F(x, 2);
  {
    var C = (f) => {
      var V = qn();
      let z;
      var M = m(V);
      J(
        (h) => {
          z = ue(V, 1, "loading-message svelte-15j9ao9", null, z, h), K(M, a(e));
        },
        [() => ({ "sr-only": c() })]
      ), I(f, V);
    };
    H(u, (f) => {
      l() && a(e) && f(C);
    });
  }
  J(
    (f) => {
      o = ue(y, 1, "loading-spinner svelte-15j9ao9", null, o, f), te(y, "aria-label", a(e)), te(x, "width", (a(i), v(() => a(i).width))), te(x, "height", (a(i), v(() => a(i).height))), te(_, "stroke-width", (a(i), v(() => a(i).strokeWidth))), te(D, "stroke-width", (a(i), v(() => a(i).strokeWidth)));
    },
    [
      () => ({
        "loading-spinner--inline": c(),
        "loading-spinner--small": n() === "small",
        "loading-spinner--medium": n() === "medium",
        "loading-spinner--large": n() === "large"
      })
    ]
  ), I(r, y), _e();
}
var Wn = /* @__PURE__ */ j('<h2 class="directory-title svelte-1isd5oi"> </h2>'), Jn = /* @__PURE__ */ j('<div class="member-count svelte-1isd5oi"> </div>'), Yn = /* @__PURE__ */ j('<div class="directory-header svelte-1isd5oi"><!> <!></div>'), Zn = /* @__PURE__ */ j('<div class="controls-right svelte-1isd5oi"><!></div>'), Kn = /* @__PURE__ */ j('<div class="directory-controls svelte-1isd5oi"><div class="controls-left svelte-1isd5oi"><!> <!></div> <!></div>'), Qn = /* @__PURE__ */ j('<div class="loading-state"><!></div>'), Xn = /* @__PURE__ */ j('<div class="empty-state svelte-1isd5oi"><p class="empty-message"> </p></div>'), $n = /* @__PURE__ */ j('<div class="directory-pagination"><!></div>'), ei = /* @__PURE__ */ j("<!> <!>", 1), ti = /* @__PURE__ */ j('<div><!> <!> <div class="directory-content svelte-1isd5oi"><!></div></div>');
function ai(r, t) {
  de(t, !1);
  const e = ee(), i = ee(), n = ee();
  let s = O(t, "config", 8), l = O(t, "members", 24, () => []), c = O(t, "totalMembers", 8, 0), T = O(t, "currentPage", 8, 1), y = O(t, "totalPages", 8, 1), o = O(t, "loading", 8, !1), x = O(t, "initialSearchQuery", 8, ""), _ = O(t, "initialFilters", 24, () => ({})), D = O(t, "availableNewsletters", 24, () => []), u = ee(x()), C = ee(_()), f = ee("grid"), V = ee(!1);
  const z = pe();
  Xr(() => {
    a(e).defaultLanguage && Be.includes(a(e).defaultLanguage) ? be(a(e).defaultLanguage) : (console.log("Fallback to English"), be("en"));
  });
  function M(b) {
    q(u, b), z("search", b);
  }
  function h(b) {
    q(C, b), z("filterChange", b);
  }
  function d(b) {
    z("pageChange", b);
  }
  function R(b) {
    q(f, b);
  }
  le(() => k(s()), () => {
    q(e, s().get());
  }), le(() => k(s()), () => {
    q(i, s().isRTL());
  }), le(() => a(e), () => {
    q(n, a(e).defaultPageSize);
  }), le(() => (a(e), a(V)), () => {
    a(e).defaultView && !a(V) && (q(f, a(e).defaultView), q(V, !0));
  }), le(() => (a(e), be), () => {
    a(e).defaultLanguage && Be.includes(a(e).defaultLanguage) && be(a(e).defaultLanguage);
  }), He(), he();
  var G = ti();
  let Y;
  var ie = m(G);
  {
    var ne = (b) => {
      var B = Yn(), W = m(B);
      {
        var N = (p) => {
          var g = Wn(), S = m(g);
          J((L) => K(S, L), [
            () => (k(vt), v(vt))
          ]), I(p, g);
        };
        H(W, (p) => {
          a(e), v(() => a(e).showTitle) && p(N);
        });
      }
      var A = F(W, 2);
      {
        var E = (p) => {
          var g = Jn(), S = m(g);
          J(() => K(S, `${c() ?? ""} members`)), I(p, g);
        };
        H(A, (p) => {
          a(e), k(c()), v(() => a(e).showMemberCount && c() > 0) && p(E);
        });
      }
      I(b, B);
    };
    H(ie, (b) => {
      a(e), v(() => a(e).showTitle || a(e).showMemberCount) && b(ne);
    });
  }
  var se = F(ie, 2);
  {
    var re = (b) => {
      var B = Kn(), W = m(B), N = m(W);
      {
        var A = (L) => {
          {
            let Q = Le(() => (k(Ge), v(Ge)));
            kn(L, {
              get value() {
                return a(u);
              },
              get placeholder() {
                return a(Q);
              },
              get disabled() {
                return o();
              },
              $$events: {
                search: (ae) => M(ae.detail),
                clear: () => M("")
              }
            });
          }
        };
        H(N, (L) => {
          a(e), v(() => a(e).enableSearch) && L(A);
        });
      }
      var E = F(N, 2);
      {
        var p = (L) => {
          Nn(L, {
            get filters() {
              return a(C);
            },
            get disabled() {
              return o();
            },
            get availableNewsletters() {
              return D();
            },
            get showTierFilter() {
              return a(e), v(() => a(e).showTierFilter);
            },
            get showStatusFilter() {
              return a(e), v(() => a(e).showStatusFilter);
            },
            get showNewsletterFilter() {
              return a(e), v(() => a(e).showNewsletterFilter);
            },
            $$events: {
              change: (Q) => h(Q.detail),
              clear: () => h({})
            }
          });
        };
        H(E, (L) => {
          a(e), v(() => a(e).enableFilters) && L(p);
        });
      }
      var g = F(W, 2);
      {
        var S = (L) => {
          var Q = Zn(), ae = m(Q);
          Fn(ae, {
            get currentView() {
              return a(f);
            },
            get disabled() {
              return o();
            },
            $$events: { viewChange: (oe) => R(oe.detail) }
          }), I(L, Q);
        };
        H(g, (L) => {
          a(e), v(() => a(e).enableViewToggle) && L(S);
        });
      }
      I(b, B);
    };
    H(se, (b) => {
      a(e), v(() => a(e).enableSearch || a(e).enableFilters || a(e).enableViewToggle) && b(re);
    });
  }
  var Z = F(se, 2), w = m(Z);
  {
    var P = (b) => {
      var B = Qn(), W = m(B);
      {
        let N = Le(() => (k(_t), v(_t)));
        Hn(W, {
          size: "large",
          get message() {
            return a(N);
          }
        });
      }
      I(b, B);
    }, U = (b) => {
      var B = je(), W = fe(B);
      {
        var N = (A) => {
          var E = je(), p = fe(E);
          {
            var g = (L) => {
              var Q = Xn(), ae = m(Q), oe = m(ae);
              J((me) => K(oe, me), [
                () => (a(u), k(dt), v(() => a(u) ? /* @__PURE__ */ dt() : "No members"))
              ]), I(L, Q);
            }, S = (L) => {
              var Q = ei(), ae = fe(Q);
              mn(ae, {
                get members() {
                  return l();
                },
                get showAvatars() {
                  return a(e), v(() => a(e).showAvatars);
                },
                get showRealNames() {
                  return a(e), v(() => a(e).showRealNames);
                },
                get showJoinDates() {
                  return a(e), v(() => a(e).showJoinDates);
                },
                showTiers: !0,
                get loading() {
                  return o();
                },
                get layout() {
                  return a(f);
                },
                clickable: !1
              });
              var oe = F(ae, 2);
              {
                var me = (ve) => {
                  var ge = $n(), We = m(ge);
                  zn(We, {
                    get currentPage() {
                      return T();
                    },
                    get totalPages() {
                      return y();
                    },
                    get disabled() {
                      return o();
                    },
                    showPageNumbers: !0,
                    maxVisiblePages: 5,
                    $$events: { pageChange: (Je) => d(Je.detail) }
                  }), I(ve, ge);
                };
                H(oe, (ve) => {
                  c() > 0 && ve(me);
                });
              }
              I(L, Q);
            };
            H(
              p,
              (L) => {
                k(l()), v(() => l().length === 0) ? L(g) : L(S, !1);
              },
              !0
            );
          }
          I(A, E);
        };
        H(
          W,
          (A) => {
            A(N, !1);
          },
          !0
        );
      }
      I(b, B);
    };
    H(w, (b) => {
      o() ? b(P) : b(U, !1);
    });
  }
  J((b) => Y = ue(G, 1, "ghost-member-directory svelte-1isd5oi", null, Y, b), [
    () => ({
      "ghost-member-directory--rtl": a(i),
      "ghost-member-directory--dark": a(e).widgetTheme === "dark",
      "ghost-member-directory--light": a(e).widgetTheme === "light"
    })
  ]), I(r, G), _e();
}
export {
  ai as default
};
