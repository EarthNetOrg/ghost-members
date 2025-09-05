const Iu = typeof window < "u", Ve = {
  // Ghost API Configuration (will be provided at runtime)
  ghostAdminApiUrl: "",
  ghostAdminApiKey: "",
  // Internationalization & RTL
  defaultLanguage: "en",
  supportedLanguages: ["en", "ar", "he", "es", "fr", "de", "ru", "zh", "ja"],
  rtlLanguages: ["ar", "he"],
  autoDetectLanguage: !0,
  fallbackLanguage: "en",
  // Widget Behavior
  defaultPageSize: 24,
  enableSearch: !0,
  enableFilters: !0,
  enableMemberProfiles: !0,
  showJoinDates: !0,
  showMemberCount: !0,
  enableLanguageSwitcher: !0,
  // Display Options
  showTitle: !0,
  showTierFilter: !0,
  showStatusFilter: !0,
  showNewsletterFilter: !0,
  defaultView: "grid",
  enableViewToggle: !0,
  // Styling
  widgetTheme: "light",
  primaryColor: "#1f2937",
  backgroundColor: "#ffffff",
  textColor: "#374151",
  borderRadius: "8px",
  fontFamily: "system-ui",
  // Performance
  enableCaching: !0,
  cacheDuration: 300,
  apiTimeout: 5e3,
  maxRetries: 3,
  // Privacy
  privacyMode: "opt-in",
  showAvatars: !0,
  showRealNames: !1,
  showEmailDomains: !1,
  // Testing
  enableTestMode: !1
};
class ht {
  config;
  constructor(t) {
    this.config = { ...Ve, ...t };
  }
  get() {
    return { ...this.config };
  }
  update(t) {
    this.config = { ...this.config, ...t };
  }
  isRTL(t) {
    const r = t || this.config.defaultLanguage;
    return this.config.rtlLanguages.includes(r);
  }
  getApiUrl() {
    return this.config.enableTestMode && this.config.testGhostApiUrl ? this.config.testGhostApiUrl : this.config.ghostAdminApiUrl;
  }
  getApiKey() {
    return this.config.enableTestMode && this.config.testApiKey ? this.config.testApiKey : this.config.ghostAdminApiKey;
  }
  validateConfig() {
    const t = [];
    return (this.config.defaultPageSize < 1 || this.config.defaultPageSize > 100) && t.push("Default page size must be between 1 and 100"), this.config.supportedLanguages.includes(this.config.defaultLanguage) || t.push("Default language must be included in supported languages"), {
      isValid: t.length === 0,
      errors: t
    };
  }
  getCSSCustomProperties() {
    return {
      "--widget-primary-color": this.config.primaryColor,
      "--widget-background": this.config.backgroundColor,
      "--widget-text-color": this.config.textColor,
      "--widget-border-radius": this.config.borderRadius,
      "--widget-font-family": this.config.fontFamily
    };
  }
  static fromEnvironment() {
    return new ht(Ve);
  }
  static fromWindowConfig() {
    if (!Iu) return new ht(Ve);
    const t = window.GhostMemberDirectory;
    return t && typeof t == "object" ? new ht({
      ...Ve,
      ghostAdminApiUrl: t.apiUrl,
      ghostAdminApiKey: t.apiKey,
      defaultPageSize: t.pageSize || Ve.defaultPageSize,
      enableSearch: t.showSearch ?? Ve.enableSearch,
      enableFilters: t.showFilters ?? Ve.enableFilters,
      widgetTheme: t.theme || Ve.widgetTheme
    }) : new ht(Ve);
  }
}
const Do = !1;
var ko = Array.isArray, Lu = Array.prototype.indexOf, Pu = Array.from, es = Object.defineProperty, Tt = Object.getOwnPropertyDescriptor, $u = Object.getOwnPropertyDescriptors, Nu = Object.prototype, xu = Array.prototype, Fo = Object.getPrototypeOf, Zs = Object.isExtensible;
function Uf(e) {
  return e();
}
function Cu(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function ju() {
  var e, t, r = new Promise((s, o) => {
    e = s, t = o;
  });
  return { promise: r, resolve: e, reject: t };
}
const Le = 2, is = 4, er = 8, yt = 16, Ke = 32, ct = 64, Bo = 128, $e = 256, Wt = 512, Ee = 1024, Ne = 2048, ze = 4096, Ze = 8192, Et = 16384, os = 32768, Mo = 65536, Qs = 1 << 17, qu = 1 << 18, Lt = 1 << 19, Uo = 1 << 20, ts = 1 << 21, as = 1 << 22, st = 1 << 23, it = Symbol("$state"), Vf = Symbol("legacy props"), Gf = Symbol(""), us = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function Du() {
  throw new Error("https://svelte.dev/e/await_outside_boundary");
}
function Kf(e) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function ku() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Fu(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Bu() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Mu(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function Uu() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function zf(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function Vu() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Gu() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Hu() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
const Wf = 1, Jf = 2, Xf = 4, Yf = 8, Zf = 16, Qf = 1, el = 2, tl = 4, rl = 8, nl = 16, sl = 1, il = 2, we = Symbol(), ol = "http://www.w3.org/1999/xhtml";
function Vo(e) {
  return e === this.v;
}
function Ku(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Go(e) {
  return !Ku(e, this.v);
}
let tr = !1, zu = !1;
function al() {
  tr = !0;
}
let ge = null;
function Jt(e) {
  ge = e;
}
function Wu(e, t = !1, r) {
  ge = {
    p: ge,
    c: null,
    e: null,
    s: e,
    x: null,
    l: tr && !t ? { s: null, u: null, $: [] } : null
  };
}
function Ju(e) {
  var t = (
    /** @type {ComponentContext} */
    ge
  ), r = t.e;
  if (r !== null) {
    t.e = null;
    for (var s of r)
      ra(s);
  }
  return ge = t.p, /** @type {T} */
  {};
}
function Pt() {
  return !tr || ge !== null && ge.l === null;
}
const Xu = /* @__PURE__ */ new WeakMap();
function Yu(e) {
  var t = ae;
  if (t === null)
    return oe.f |= st, e;
  if ((t.f & os) === 0) {
    if ((t.f & Bo) === 0)
      throw !t.parent && e instanceof Error && Ho(e), e;
    t.b.error(e);
  } else
    cs(e, t);
}
function cs(e, t) {
  for (; t !== null; ) {
    if ((t.f & Bo) !== 0)
      try {
        t.b.error(e);
        return;
      } catch (r) {
        e = r;
      }
    t = t.parent;
  }
  throw e instanceof Error && Ho(e), e;
}
function Ho(e) {
  const t = Xu.get(e);
  t && (es(e, "message", {
    value: t.message
  }), es(e, "stack", {
    value: t.stack
  }));
}
let Xt = [];
function Zu() {
  var e = Xt;
  Xt = [], Cu(e);
}
function Qu(e) {
  Xt.length === 0 && queueMicrotask(Zu), Xt.push(e);
}
function ec() {
  for (var e = (
    /** @type {Effect} */
    ae.b
  ); e !== null && !e.has_pending_snippet(); )
    e = e.parent;
  return e === null && Du(), e;
}
// @__NO_SIDE_EFFECTS__
function Ko(e) {
  var t = Le | Ne, r = oe !== null && (oe.f & Le) !== 0 ? (
    /** @type {Derived} */
    oe
  ) : null;
  return ae === null || r !== null && (r.f & $e) !== 0 ? t |= $e : ae.f |= Lt, {
    ctx: ge,
    deps: null,
    effects: null,
    equals: Vo,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      we
    ),
    wv: 0,
    parent: r ?? ae,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function tc(e, t) {
  let r = (
    /** @type {Effect | null} */
    ae
  );
  r === null && ku();
  var s = (
    /** @type {Boundary} */
    r.b
  ), o = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), l = ds(
    /** @type {V} */
    we
  ), f = null, E = !oe;
  return mc(() => {
    try {
      var d = e();
      f && Promise.resolve(d).catch(() => {
      });
    } catch (y) {
      d = Promise.reject(y);
    }
    var h = () => d;
    o = f?.then(h, h) ?? Promise.resolve(d), f = o;
    var a = (
      /** @type {Batch} */
      be
    ), p = s.pending;
    E && (s.update_pending_count(1), p || a.increment());
    const g = (y, _ = void 0) => {
      f = null, p || a.activate(), _ ? _ !== us && (l.f |= st, Zt(l, _)) : ((l.f & st) !== 0 && (l.f ^= st), Zt(l, y)), E && (s.update_pending_count(-1), p || a.decrement()), Jo();
    };
    if (o.then(g, (y) => g(null, y || "unknown")), a)
      return () => {
        queueMicrotask(() => a.neuter());
      };
  }), new Promise((d) => {
    function h(a) {
      function p() {
        a === o ? d(l) : h(o);
      }
      a.then(p, p);
    }
    h(o);
  });
}
// @__NO_SIDE_EFFECTS__
function rc(e) {
  const t = /* @__PURE__ */ Ko(e);
  return t.equals = Go, t;
}
function zo(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var r = 0; r < t.length; r += 1)
      ut(
        /** @type {Effect} */
        t[r]
      );
  }
}
function nc(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & Le) === 0)
      return (
        /** @type {Effect} */
        t
      );
    t = t.parent;
  }
  return null;
}
function fs(e) {
  var t, r = ae;
  Qe(nc(e));
  try {
    zo(e), t = da(e);
  } finally {
    Qe(r);
  }
  return t;
}
function Wo(e) {
  var t = fs(e);
  if (e.equals(t) || (e.v = t, e.wv = fa()), !vt) {
    var r = (Xe || (e.f & $e) !== 0) && e.deps !== null ? ze : Ee;
    _e(e, r);
  }
}
function sc(e, t, r) {
  const s = Pt() ? Ko : rc;
  if (t.length === 0) {
    r(e.map(s));
    return;
  }
  var o = be, l = (
    /** @type {Effect} */
    ae
  ), f = ic(), E = ec();
  Promise.all(t.map((d) => /* @__PURE__ */ tc(d))).then((d) => {
    o?.activate(), f();
    try {
      r([...e.map(s), ...d]);
    } catch (h) {
      (l.f & Et) === 0 && cs(h, l);
    }
    o?.deactivate(), Jo();
  }).catch((d) => {
    E.error(d);
  });
}
function ic() {
  var e = ae, t = oe, r = ge, s = be;
  return function() {
    Qe(e), Fe(t), Jt(r), s?.activate();
  };
}
function Jo() {
  Qe(null), Fe(null), Jt(null);
}
const Or = /* @__PURE__ */ new Set();
let be = null, ei = /* @__PURE__ */ new Set(), Yt = [];
function Xo() {
  const e = (
    /** @type {() => void} */
    Yt.shift()
  );
  Yt.length > 0 && queueMicrotask(Xo), e();
}
let Ot = [], ls = null, rs = !1;
class mt {
  /**
   * The current values of any sources that are updated in this batch
   * They keys of this map are identical to `this.#previous`
   * @type {Map<Source, any>}
   */
  current = /* @__PURE__ */ new Map();
  /**
   * The values of any sources that are updated in this batch _before_ those updates took place.
   * They keys of this map are identical to `this.#current`
   * @type {Map<Source, any>}
   */
  #u = /* @__PURE__ */ new Map();
  /**
   * When the batch is committed (and the DOM is updated), we need to remove old branches
   * and append new ones by calling the functions added inside (if/each/key/etc) blocks
   * @type {Set<() => void>}
   */
  #s = /* @__PURE__ */ new Set();
  /**
   * The number of async effects that are currently in flight
   */
  #e = 0;
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #c = null;
  /**
   * True if an async effect inside this batch resolved and
   * its parent branch was already deleted
   */
  #f = !1;
  /**
   * Async effects (created inside `async_derived`) encountered during processing.
   * These run after the rest of the batch has updated, since they should
   * always have the latest values
   * @type {Effect[]}
   */
  #r = [];
  /**
   * The same as `#async_effects`, but for effects inside a newly-created
   * `<svelte:boundary>` — these do not prevent the batch from committing
   * @type {Effect[]}
   */
  #i = [];
  /**
   * Template effects and `$effect.pre` effects, which run when
   * a batch is committed
   * @type {Effect[]}
   */
  #n = [];
  /**
   * The same as `#render_effects`, but for `$effect` (which runs after)
   * @type {Effect[]}
   */
  #t = [];
  /**
   * Block effects, which may need to re-run on subsequent flushes
   * in order to update internal sources (e.g. each block items)
   * @type {Effect[]}
   */
  #o = [];
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Effect[]}
   */
  #l = [];
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Effect[]}
   */
  #d = [];
  /**
   * A set of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`
   * @type {Set<Effect>}
   */
  skipped_effects = /* @__PURE__ */ new Set();
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(t) {
    Ot = [];
    for (const o of t)
      this.#p(o);
    if (this.#r.length === 0 && this.#e === 0) {
      this.#h();
      var r = this.#n, s = this.#t;
      this.#n = [], this.#t = [], this.#o = [], be = null, ti(r), ti(s), be === null ? be = this : Or.delete(this), this.#c?.resolve();
    } else
      this.#a(this.#n), this.#a(this.#t), this.#a(this.#o);
    for (const o of this.#r)
      at(o);
    for (const o of this.#i)
      at(o);
    this.#r = [], this.#i = [];
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   */
  #p(t) {
    t.f ^= Ee;
    for (var r = t.first; r !== null; ) {
      var s = r.f, o = (s & (Ke | ct)) !== 0, l = o && (s & Ee) !== 0, f = l || (s & Ze) !== 0 || this.skipped_effects.has(r);
      if (!f && r.fn !== null) {
        if (o)
          r.f ^= Ee;
        else if ((s & is) !== 0)
          this.#t.push(r);
        else if ((s & Ee) === 0)
          if ((s & as) !== 0) {
            var E = r.b?.pending ? this.#i : this.#r;
            E.push(r);
          } else $t(r) && ((r.f & yt) !== 0 && this.#o.push(r), at(r));
        var d = r.first;
        if (d !== null) {
          r = d;
          continue;
        }
      }
      var h = r.parent;
      for (r = r.next; r === null && h !== null; )
        r = h.next, h = h.parent;
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #a(t) {
    for (const r of t)
      ((r.f & Ne) !== 0 ? this.#l : this.#d).push(r), _e(r, Ee);
    t.length = 0;
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, r) {
    this.#u.has(t) || this.#u.set(t, r), this.current.set(t, t.v);
  }
  activate() {
    be = this;
  }
  deactivate() {
    be = null;
    for (const t of ei)
      if (ei.delete(t), t(), be !== null)
        break;
  }
  neuter() {
    this.#f = !0;
  }
  flush() {
    Ot.length > 0 ? oc() : this.#h(), be === this && (this.#e === 0 && Or.delete(this), this.deactivate());
  }
  /**
   * Append and remove branches to/from the DOM
   */
  #h() {
    if (!this.#f)
      for (const t of this.#s)
        t();
    this.#s.clear();
  }
  increment() {
    this.#e += 1;
  }
  decrement() {
    if (this.#e -= 1, this.#e === 0) {
      for (const t of this.#l)
        _e(t, Ne), gt(t);
      for (const t of this.#d)
        _e(t, ze), gt(t);
      this.#n = [], this.#t = [], this.flush();
    } else
      this.deactivate();
  }
  /** @param {() => void} fn */
  add_callback(t) {
    this.#s.add(t);
  }
  settled() {
    return (this.#c ??= ju()).promise;
  }
  static ensure() {
    if (be === null) {
      const t = be = new mt();
      Or.add(be), mt.enqueue(() => {
        be === t && t.flush();
      });
    }
    return be;
  }
  /** @param {() => void} task */
  static enqueue(t) {
    Yt.length === 0 && queueMicrotask(Xo), Yt.unshift(t);
  }
}
function oc() {
  var e = pt;
  rs = !0;
  try {
    var t = 0;
    for (ii(!0); Ot.length > 0; ) {
      var r = mt.ensure();
      if (t++ > 1e3) {
        var s, o;
        ac();
      }
      r.process(Ot), Ye.clear();
    }
  } finally {
    rs = !1, ii(e), ls = null;
  }
}
function ac() {
  try {
    Uu();
  } catch (e) {
    cs(e, ls);
  }
}
let nt = null;
function ti(e) {
  var t = e.length;
  if (t !== 0) {
    for (var r = 0; r < t; ) {
      var s = e[r++];
      if ((s.f & (Et | Ze)) === 0 && $t(s) && (nt = [], at(s), s.deps === null && s.first === null && s.nodes_start === null && (s.teardown === null && s.ac === null ? oa(s) : s.fn = null), nt?.length > 0)) {
        Ye.clear();
        for (const o of nt)
          at(o);
        nt = [];
      }
    }
    nt = null;
  }
}
function gt(e) {
  for (var t = ls = e; t.parent !== null; ) {
    t = t.parent;
    var r = t.f;
    if (rs && t === ae && (r & yt) !== 0)
      return;
    if ((r & (ct | Ke)) !== 0) {
      if ((r & Ee) === 0) return;
      t.f ^= Ee;
    }
  }
  Ot.push(t);
}
const Ye = /* @__PURE__ */ new Map();
function ds(e, t) {
  var r = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Vo,
    rv: 0,
    wv: 0
  };
  return r;
}
// @__NO_SIDE_EFFECTS__
function Je(e, t) {
  const r = ds(e);
  return Sc(r), r;
}
// @__NO_SIDE_EFFECTS__
function ul(e, t = !1, r = !0) {
  const s = ds(e);
  return t || (s.equals = Go), tr && r && ge !== null && ge.l !== null && (ge.l.s ??= []).push(s), s;
}
function rt(e, t, r = !1) {
  oe !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!ke || (oe.f & Qs) !== 0) && Pt() && (oe.f & (Le | yt | as | Qs)) !== 0 && !He?.includes(e) && Hu();
  let s = r ? St(t) : t;
  return Zt(e, s);
}
function Zt(e, t) {
  if (!e.equals(t)) {
    var r = e.v;
    vt ? Ye.set(e, t) : Ye.set(e, r), e.v = t;
    var s = mt.ensure();
    s.capture(e, r), (e.f & Le) !== 0 && ((e.f & Ne) !== 0 && fs(
      /** @type {Derived} */
      e
    ), _e(e, (e.f & $e) === 0 ? Ee : ze)), e.wv = fa(), Yo(e, Ne), Pt() && ae !== null && (ae.f & Ee) !== 0 && (ae.f & (Ke | ct)) === 0 && (Pe === null ? _c([e]) : Pe.push(e));
  }
  return t;
}
function Ir(e) {
  rt(e, e.v + 1);
}
function Yo(e, t) {
  var r = e.reactions;
  if (r !== null)
    for (var s = Pt(), o = r.length, l = 0; l < o; l++) {
      var f = r[l], E = f.f;
      if (!(!s && f === ae)) {
        var d = (E & Ne) === 0;
        d && _e(f, t), (E & Le) !== 0 ? Yo(
          /** @type {Derived} */
          f,
          ze
        ) : d && ((E & yt) !== 0 && nt !== null && nt.push(
          /** @type {Effect} */
          f
        ), gt(
          /** @type {Effect} */
          f
        ));
      }
    }
}
function St(e) {
  if (typeof e != "object" || e === null || it in e)
    return e;
  const t = Fo(e);
  if (t !== Nu && t !== xu)
    return e;
  var r = /* @__PURE__ */ new Map(), s = ko(e), o = /* @__PURE__ */ Je(0), l = ot, f = (E) => {
    if (ot === l)
      return E();
    var d = oe, h = ot;
    Fe(null), ai(l);
    var a = E();
    return Fe(d), ai(h), a;
  };
  return s && r.set("length", /* @__PURE__ */ Je(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(E, d, h) {
        (!("value" in h) || h.configurable === !1 || h.enumerable === !1 || h.writable === !1) && Vu();
        var a = r.get(d);
        return a === void 0 ? a = f(() => {
          var p = /* @__PURE__ */ Je(h.value);
          return r.set(d, p), p;
        }) : rt(a, h.value, !0), !0;
      },
      deleteProperty(E, d) {
        var h = r.get(d);
        if (h === void 0) {
          if (d in E) {
            const a = f(() => /* @__PURE__ */ Je(we));
            r.set(d, a), Ir(o);
          }
        } else
          rt(h, we), Ir(o);
        return !0;
      },
      get(E, d, h) {
        if (d === it)
          return e;
        var a = r.get(d), p = d in E;
        if (a === void 0 && (!p || Tt(E, d)?.writable) && (a = f(() => {
          var y = St(p ? E[d] : we), _ = /* @__PURE__ */ Je(y);
          return _;
        }), r.set(d, a)), a !== void 0) {
          var g = _t(a);
          return g === we ? void 0 : g;
        }
        return Reflect.get(E, d, h);
      },
      getOwnPropertyDescriptor(E, d) {
        var h = Reflect.getOwnPropertyDescriptor(E, d);
        if (h && "value" in h) {
          var a = r.get(d);
          a && (h.value = _t(a));
        } else if (h === void 0) {
          var p = r.get(d), g = p?.v;
          if (p !== void 0 && g !== we)
            return {
              enumerable: !0,
              configurable: !0,
              value: g,
              writable: !0
            };
        }
        return h;
      },
      has(E, d) {
        if (d === it)
          return !0;
        var h = r.get(d), a = h !== void 0 && h.v !== we || Reflect.has(E, d);
        if (h !== void 0 || ae !== null && (!a || Tt(E, d)?.writable)) {
          h === void 0 && (h = f(() => {
            var g = a ? St(E[d]) : we, y = /* @__PURE__ */ Je(g);
            return y;
          }), r.set(d, h));
          var p = _t(h);
          if (p === we)
            return !1;
        }
        return a;
      },
      set(E, d, h, a) {
        var p = r.get(d), g = d in E;
        if (s && d === "length")
          for (var y = h; y < /** @type {Source<number>} */
          p.v; y += 1) {
            var _ = r.get(y + "");
            _ !== void 0 ? rt(_, we) : y in E && (_ = f(() => /* @__PURE__ */ Je(we)), r.set(y + "", _));
          }
        if (p === void 0)
          (!g || Tt(E, d)?.writable) && (p = f(() => /* @__PURE__ */ Je(void 0)), rt(p, St(h)), r.set(d, p));
        else {
          g = p.v !== we;
          var P = f(() => St(h));
          rt(p, P);
        }
        var j = Reflect.getOwnPropertyDescriptor(E, d);
        if (j?.set && j.set.call(a, h), !g) {
          if (s && typeof d == "string") {
            var b = (
              /** @type {Source<number>} */
              r.get("length")
            ), O = Number(d);
            Number.isInteger(O) && O >= b.v && rt(b, O + 1);
          }
          Ir(o);
        }
        return !0;
      },
      ownKeys(E) {
        _t(o);
        var d = Reflect.ownKeys(E).filter((p) => {
          var g = r.get(p);
          return g === void 0 || g.v !== we;
        });
        for (var [h, a] of r)
          a.v !== we && !(h in E) && d.push(h);
        return d;
      },
      setPrototypeOf() {
        Gu();
      }
    }
  );
}
function ri(e) {
  try {
    if (e !== null && typeof e == "object" && it in e)
      return e[it];
  } catch {
  }
  return e;
}
function cl(e, t) {
  return Object.is(ri(e), ri(t));
}
var ni, uc, Zo, Qo;
function cc() {
  if (ni === void 0) {
    ni = window, uc = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, r = Text.prototype;
    Zo = Tt(t, "firstChild").get, Qo = Tt(t, "nextSibling").get, Zs(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), Zs(r) && (r.__t = void 0);
  }
}
function fc(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function ea(e) {
  return Zo.call(e);
}
// @__NO_SIDE_EFFECTS__
function hs(e) {
  return Qo.call(e);
}
function fl(e, t) {
  return /* @__PURE__ */ ea(e);
}
function ll(e, t) {
  {
    var r = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ ea(
        /** @type {Node} */
        e
      )
    );
    return r instanceof Comment && r.data === "" ? /* @__PURE__ */ hs(r) : r;
  }
}
function dl(e, t = 1, r = !1) {
  let s = e;
  for (; t--; )
    s = /** @type {TemplateNode} */
    /* @__PURE__ */ hs(s);
  return s;
}
function hl(e) {
  e.textContent = "";
}
function pl() {
  return !1;
}
let si = !1;
function lc() {
  si || (si = !0, document.addEventListener(
    "reset",
    (e) => {
      Promise.resolve().then(() => {
        if (!e.defaultPrevented)
          for (
            const t of
            /**@type {HTMLFormElement} */
            e.target.elements
          )
            t.__on_r?.();
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possiblity of stopPropagation)
    { capture: !0 }
  ));
}
function rr(e) {
  var t = oe, r = ae;
  Fe(null), Qe(null);
  try {
    return e();
  } finally {
    Fe(t), Qe(r);
  }
}
function ml(e, t, r, s = r) {
  e.addEventListener(t, () => rr(r));
  const o = e.__on_r;
  o ? e.__on_r = () => {
    o(), s(!0);
  } : e.__on_r = () => s(!0), lc();
}
function ta(e) {
  ae === null && oe === null && Mu(), oe !== null && (oe.f & $e) !== 0 && ae === null && Bu(), vt && Fu();
}
function dc(e, t) {
  var r = t.last;
  r === null ? t.last = t.first = e : (r.next = e, e.prev = r, t.last = e);
}
function Be(e, t, r, s = !0) {
  var o = ae;
  o !== null && (o.f & Ze) !== 0 && (e |= Ze);
  var l = {
    ctx: ge,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: e | Ne,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: o,
    b: o && o.b,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0,
    ac: null
  };
  if (r)
    try {
      at(l), l.f |= os;
    } catch (d) {
      throw ut(l), d;
    }
  else t !== null && gt(l);
  if (s) {
    var f = l;
    if (r && f.deps === null && f.teardown === null && f.nodes_start === null && f.first === f.last && // either `null`, or a singular child
    (f.f & Lt) === 0 && (f = f.first), f !== null && (f.parent = o, o !== null && dc(f, o), oe !== null && (oe.f & Le) !== 0 && (e & ct) === 0)) {
      var E = (
        /** @type {Derived} */
        oe
      );
      (E.effects ??= []).push(f);
    }
  }
  return l;
}
function hc(e) {
  const t = Be(er, null, !1);
  return _e(t, Ee), t.teardown = e, t;
}
function gl(e) {
  ta();
  var t = (
    /** @type {Effect} */
    ae.f
  ), r = !oe && (t & Ke) !== 0 && (t & os) === 0;
  if (r) {
    var s = (
      /** @type {ComponentContext} */
      ge
    );
    (s.e ??= []).push(e);
  } else
    return ra(e);
}
function ra(e) {
  return Be(is | Uo, e, !1);
}
function yl(e) {
  return ta(), Be(er | Uo, e, !0);
}
function pc(e) {
  mt.ensure();
  const t = Be(ct | Lt, e, !0);
  return (r = {}) => new Promise((s) => {
    r.outro ? vc(t, () => {
      ut(t), s(void 0);
    }) : (ut(t), s(void 0));
  });
}
function El(e) {
  return Be(is, e, !1);
}
function vl(e, t) {
  var r = (
    /** @type {ComponentContextLegacy} */
    ge
  ), s = { effect: null, ran: !1, deps: e };
  r.l.$.push(s), s.effect = na(() => {
    e(), !s.ran && (s.ran = !0, pa(t));
  });
}
function wl() {
  var e = (
    /** @type {ComponentContextLegacy} */
    ge
  );
  na(() => {
    for (var t of e.l.$) {
      t.deps();
      var r = t.effect;
      (r.f & Ee) !== 0 && _e(r, ze), $t(r) && at(r), t.ran = !1;
    }
  });
}
function mc(e) {
  return Be(as | Lt, e, !0);
}
function na(e, t = 0) {
  return Be(er | t, e, !0);
}
function bl(e, t = [], r = []) {
  sc(t, r, (s) => {
    Be(er, () => e(...s.map(_t)), !0);
  });
}
function Sl(e, t = 0) {
  var r = Be(yt | t, e, !0);
  return r;
}
function gc(e, t = !0) {
  return Be(Ke | Lt, e, !0, t);
}
function sa(e) {
  var t = e.teardown;
  if (t !== null) {
    const r = vt, s = oe;
    oi(!0), Fe(null);
    try {
      t.call(null);
    } finally {
      oi(r), Fe(s);
    }
  }
}
function ia(e, t = !1) {
  var r = e.first;
  for (e.first = e.last = null; r !== null; ) {
    const o = r.ac;
    o !== null && rr(() => {
      o.abort(us);
    });
    var s = r.next;
    (r.f & ct) !== 0 ? r.parent = null : ut(r, t), r = s;
  }
}
function yc(e) {
  for (var t = e.first; t !== null; ) {
    var r = t.next;
    (t.f & Ke) === 0 && ut(t), t = r;
  }
}
function ut(e, t = !0) {
  var r = !1;
  (t || (e.f & qu) !== 0) && e.nodes_start !== null && e.nodes_end !== null && (Ec(
    e.nodes_start,
    /** @type {TemplateNode} */
    e.nodes_end
  ), r = !0), ia(e, t && !r), Qt(e, 0), _e(e, Et);
  var s = e.transitions;
  if (s !== null)
    for (const l of s)
      l.stop();
  sa(e);
  var o = e.parent;
  o !== null && o.first !== null && oa(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes_start = e.nodes_end = e.ac = null;
}
function Ec(e, t) {
  for (; e !== null; ) {
    var r = e === t ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ hs(e)
    );
    e.remove(), e = r;
  }
}
function oa(e) {
  var t = e.parent, r = e.prev, s = e.next;
  r !== null && (r.next = s), s !== null && (s.prev = r), t !== null && (t.first === e && (t.first = s), t.last === e && (t.last = r));
}
function vc(e, t) {
  var r = [];
  aa(e, r, !0), wc(r, () => {
    ut(e), t && t();
  });
}
function wc(e, t) {
  var r = e.length;
  if (r > 0) {
    var s = () => --r || t();
    for (var o of e)
      o.out(s);
  } else
    t();
}
function aa(e, t, r) {
  if ((e.f & Ze) === 0) {
    if (e.f ^= Ze, e.transitions !== null)
      for (const f of e.transitions)
        (f.is_global || r) && t.push(f);
    for (var s = e.first; s !== null; ) {
      var o = s.next, l = (s.f & Mo) !== 0 || (s.f & Ke) !== 0;
      aa(s, t, l ? r : !1), s = o;
    }
  }
}
function _l(e) {
  ua(e, !0);
}
function ua(e, t) {
  if ((e.f & Ze) !== 0) {
    e.f ^= Ze, (e.f & Ee) === 0 && (_e(e, Ne), gt(e));
    for (var r = e.first; r !== null; ) {
      var s = r.next, o = (r.f & Mo) !== 0 || (r.f & Ke) !== 0;
      ua(r, o ? t : !1), r = s;
    }
    if (e.transitions !== null)
      for (const l of e.transitions)
        (l.is_global || t) && l.in();
  }
}
let dt = null;
function bc(e) {
  var t = dt;
  try {
    if (dt = /* @__PURE__ */ new Set(), pa(e), t !== null)
      for (var r of dt)
        t.add(r);
    return dt;
  } finally {
    dt = t;
  }
}
function Rl(e) {
  for (var t of bc(e))
    Zt(t, t.v);
}
let pt = !1;
function ii(e) {
  pt = e;
}
let vt = !1;
function oi(e) {
  vt = e;
}
let oe = null, ke = !1;
function Fe(e) {
  oe = e;
}
let ae = null;
function Qe(e) {
  ae = e;
}
let He = null;
function Sc(e) {
  oe !== null && (He === null ? He = [e] : He.push(e));
}
let Se = null, Ie = 0, Pe = null;
function _c(e) {
  Pe = e;
}
let ca = 1, It = 0, ot = It;
function ai(e) {
  ot = e;
}
let Xe = !1;
function fa() {
  return ++ca;
}
function $t(e) {
  var t = e.f;
  if ((t & Ne) !== 0)
    return !0;
  if ((t & ze) !== 0) {
    var r = e.deps, s = (t & $e) !== 0;
    if (r !== null) {
      var o, l, f = (t & Wt) !== 0, E = s && ae !== null && !Xe, d = r.length;
      if ((f || E) && (ae === null || (ae.f & Et) === 0)) {
        var h = (
          /** @type {Derived} */
          e
        ), a = h.parent;
        for (o = 0; o < d; o++)
          l = r[o], (f || !l?.reactions?.includes(h)) && (l.reactions ??= []).push(h);
        f && (h.f ^= Wt), E && a !== null && (a.f & $e) === 0 && (h.f ^= $e);
      }
      for (o = 0; o < d; o++)
        if (l = r[o], $t(
          /** @type {Derived} */
          l
        ) && Wo(
          /** @type {Derived} */
          l
        ), l.wv > e.wv)
          return !0;
    }
    (!s || ae !== null && !Xe) && _e(e, Ee);
  }
  return !1;
}
function la(e, t, r = !0) {
  var s = e.reactions;
  if (s !== null && !He?.includes(e))
    for (var o = 0; o < s.length; o++) {
      var l = s[o];
      (l.f & Le) !== 0 ? la(
        /** @type {Derived} */
        l,
        t,
        !1
      ) : t === l && (r ? _e(l, Ne) : (l.f & Ee) !== 0 && _e(l, ze), gt(
        /** @type {Effect} */
        l
      ));
    }
}
function da(e) {
  var t = Se, r = Ie, s = Pe, o = oe, l = Xe, f = He, E = ge, d = ke, h = ot, a = e.f;
  Se = /** @type {null | Value[]} */
  null, Ie = 0, Pe = null, Xe = (a & $e) !== 0 && (ke || !pt || oe === null), oe = (a & (Ke | ct)) === 0 ? e : null, He = null, Jt(e.ctx), ke = !1, ot = ++It, e.ac !== null && (rr(() => {
    e.ac.abort(us);
  }), e.ac = null);
  try {
    e.f |= ts;
    var p = (
      /** @type {Function} */
      e.fn
    ), g = p(), y = e.deps;
    if (Se !== null) {
      var _;
      if (Qt(e, Ie), y !== null && Ie > 0)
        for (y.length = Ie + Se.length, _ = 0; _ < Se.length; _++)
          y[Ie + _] = Se[_];
      else
        e.deps = y = Se;
      if (!Xe || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      (a & Le) !== 0 && /** @type {import('#client').Derived} */
      e.reactions !== null)
        for (_ = Ie; _ < y.length; _++)
          (y[_].reactions ??= []).push(e);
    } else y !== null && Ie < y.length && (Qt(e, Ie), y.length = Ie);
    if (Pt() && Pe !== null && !ke && y !== null && (e.f & (Le | ze | Ne)) === 0)
      for (_ = 0; _ < /** @type {Source[]} */
      Pe.length; _++)
        la(
          Pe[_],
          /** @type {Effect} */
          e
        );
    return o !== null && o !== e && (It++, Pe !== null && (s === null ? s = Pe : s.push(.../** @type {Source[]} */
    Pe))), (e.f & st) !== 0 && (e.f ^= st), g;
  } catch (P) {
    return Yu(P);
  } finally {
    e.f ^= ts, Se = t, Ie = r, Pe = s, oe = o, Xe = l, He = f, Jt(E), ke = d, ot = h;
  }
}
function Rc(e, t) {
  let r = t.reactions;
  if (r !== null) {
    var s = Lu.call(r, e);
    if (s !== -1) {
      var o = r.length - 1;
      o === 0 ? r = t.reactions = null : (r[s] = r[o], r.pop());
    }
  }
  r === null && (t.f & Le) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Se === null || !Se.includes(t)) && (_e(t, ze), (t.f & ($e | Wt)) === 0 && (t.f ^= Wt), zo(
    /** @type {Derived} **/
    t
  ), Qt(
    /** @type {Derived} **/
    t,
    0
  ));
}
function Qt(e, t) {
  var r = e.deps;
  if (r !== null)
    for (var s = t; s < r.length; s++)
      Rc(e, r[s]);
}
function at(e) {
  var t = e.f;
  if ((t & Et) === 0) {
    _e(e, Ee);
    var r = ae, s = pt;
    ae = e, pt = !0;
    try {
      (t & yt) !== 0 ? yc(e) : ia(e), sa(e);
      var o = da(e);
      e.teardown = typeof o == "function" ? o : null, e.wv = ca;
      var l;
      Do && zu && (e.f & Ne) !== 0 && e.deps;
    } finally {
      pt = s, ae = r;
    }
  }
}
function _t(e) {
  var t = e.f, r = (t & Le) !== 0;
  if (dt?.add(e), oe !== null && !ke) {
    var s = ae !== null && (ae.f & Et) !== 0;
    if (!s && !He?.includes(e)) {
      var o = oe.deps;
      if ((oe.f & ts) !== 0)
        e.rv < It && (e.rv = It, Se === null && o !== null && o[Ie] === e ? Ie++ : Se === null ? Se = [e] : (!Xe || !Se.includes(e)) && Se.push(e));
      else {
        (oe.deps ??= []).push(e);
        var l = e.reactions;
        l === null ? e.reactions = [oe] : l.includes(oe) || l.push(oe);
      }
    }
  } else if (r && /** @type {Derived} */
  e.deps === null && /** @type {Derived} */
  e.effects === null) {
    var f = (
      /** @type {Derived} */
      e
    ), E = f.parent;
    E !== null && (E.f & $e) === 0 && (f.f ^= $e);
  }
  if (vt) {
    if (Ye.has(e))
      return Ye.get(e);
    if (r) {
      f = /** @type {Derived} */
      e;
      var d = f.v;
      return ((f.f & Ee) === 0 && f.reactions !== null || ha(f)) && (d = fs(f)), Ye.set(f, d), d;
    }
  } else r && (f = /** @type {Derived} */
  e, $t(f) && Wo(f));
  if ((e.f & st) !== 0)
    throw e.v;
  return e.v;
}
function ha(e) {
  if (e.v === we) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (Ye.has(t) || (t.f & Le) !== 0 && ha(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function pa(e) {
  var t = ke;
  try {
    return ke = !0, e();
  } finally {
    ke = t;
  }
}
const Ac = -7169;
function _e(e, t) {
  e.f = e.f & Ac | t;
}
function Al(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (it in e)
      ns(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const r = e[t];
        typeof r == "object" && r && it in r && ns(r);
      }
  }
}
function ns(e, t = /* @__PURE__ */ new Set()) {
  if (typeof e == "object" && e !== null && // We don't want to traverse DOM elements
  !(e instanceof EventTarget) && !t.has(e)) {
    t.add(e), e instanceof Date && e.getTime();
    for (let s in e)
      try {
        ns(e[s], t);
      } catch {
      }
    const r = Fo(e);
    if (r !== Object.prototype && r !== Array.prototype && r !== Map.prototype && r !== Set.prototype && r !== Date.prototype) {
      const s = $u(r);
      for (let o in s) {
        const l = s[o].get;
        if (l)
          try {
            l.call(e);
          } catch {
          }
      }
    }
  }
}
const Tc = ["touchstart", "touchmove"];
function Oc(e) {
  return Tc.includes(e);
}
const Ic = /* @__PURE__ */ new Set(), ui = /* @__PURE__ */ new Set();
function Lc(e, t, r, s = {}) {
  function o(l) {
    if (s.capture || Rt.call(t, l), !l.cancelBubble)
      return rr(() => r?.call(this, l));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Qu(() => {
    t.addEventListener(e, o, s);
  }) : t.addEventListener(e, o, s), o;
}
function Tl(e, t, r, s, o) {
  var l = { capture: s, passive: o }, f = Lc(e, t, r, l);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && hc(() => {
    t.removeEventListener(e, f, l);
  });
}
let ci = null;
function Rt(e) {
  var t = this, r = (
    /** @type {Node} */
    t.ownerDocument
  ), s = e.type, o = e.composedPath?.() || [], l = (
    /** @type {null | Element} */
    o[0] || e.target
  );
  ci = e;
  var f = 0, E = ci === e && e.__root;
  if (E) {
    var d = o.indexOf(E);
    if (d !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var h = o.indexOf(t);
    if (h === -1)
      return;
    d <= h && (f = d);
  }
  if (l = /** @type {Element} */
  o[f] || e.target, l !== t) {
    es(e, "currentTarget", {
      configurable: !0,
      get() {
        return l || r;
      }
    });
    var a = oe, p = ae;
    Fe(null), Qe(null);
    try {
      for (var g, y = []; l !== null; ) {
        var _ = l.assignedSlot || l.parentNode || /** @type {any} */
        l.host || null;
        try {
          var P = l["__" + s];
          if (P != null && (!/** @type {any} */
          l.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === l))
            if (ko(P)) {
              var [j, ...b] = P;
              j.apply(l, [e, ...b]);
            } else
              P.call(l, e);
        } catch (O) {
          g ? y.push(O) : g = O;
        }
        if (e.cancelBubble || _ === t || _ === null)
          break;
        l = _;
      }
      if (g) {
        for (let O of y)
          queueMicrotask(() => {
            throw O;
          });
        throw g;
      }
    } finally {
      e.__root = t, delete e.currentTarget, Fe(a), Qe(p);
    }
  }
}
function Ol(e, t) {
  var r = t == null ? "" : typeof t == "object" ? t + "" : t;
  r !== (e.__t ??= e.nodeValue) && (e.__t = r, e.nodeValue = r + "");
}
function Pc(e, t) {
  return $c(e, t);
}
const lt = /* @__PURE__ */ new Map();
function $c(e, { target: t, anchor: r, props: s = {}, events: o, context: l, intro: f = !0 }) {
  cc();
  var E = /* @__PURE__ */ new Set(), d = (p) => {
    for (var g = 0; g < p.length; g++) {
      var y = p[g];
      if (!E.has(y)) {
        E.add(y);
        var _ = Oc(y);
        t.addEventListener(y, Rt, { passive: _ });
        var P = lt.get(y);
        P === void 0 ? (document.addEventListener(y, Rt, { passive: _ }), lt.set(y, 1)) : lt.set(y, P + 1);
      }
    }
  };
  d(Pu(Ic)), ui.add(d);
  var h = void 0, a = pc(() => {
    var p = r ?? t.appendChild(fc());
    return gc(() => {
      if (l) {
        Wu({});
        var g = (
          /** @type {ComponentContext} */
          ge
        );
        g.c = l;
      }
      o && (s.$$events = o), h = e(p, s) || {}, l && Ju();
    }), () => {
      for (var g of E) {
        t.removeEventListener(g, Rt);
        var y = (
          /** @type {number} */
          lt.get(g)
        );
        --y === 0 ? (document.removeEventListener(g, Rt), lt.delete(g)) : lt.set(g, y);
      }
      ui.delete(d), p !== r && p.parentNode?.removeChild(p);
    };
  });
  return ss.set(h, a), h;
}
let ss = /* @__PURE__ */ new WeakMap();
function Nc(e, t) {
  const r = ss.get(e);
  return r ? (ss.delete(e), r(t)) : Promise.resolve();
}
const ma = typeof window < "u";
class xc {
  instances = /* @__PURE__ */ new Map();
  nextId = 1;
  register(t) {
    const r = `ghost-member-directory-${this.nextId++}`;
    return t.id = r, this.instances.set(r, t), r;
  }
  unregister(t) {
    return this.instances.delete(t);
  }
  get(t) {
    return this.instances.get(t);
  }
  getAll() {
    return Array.from(this.instances.values());
  }
  unmountAll() {
    for (const t of this.instances.values())
      t.unmount();
    this.instances.clear();
  }
}
const At = new xc();
let Lr = class zt {
  static appliedGlobalStyles = !1;
  static async mount(t, r = {}) {
    if (!ma)
      return {
        success: !1,
        error: "Widget can only be mounted in browser environment"
      };
    try {
      const s = typeof t == "string" ? document.querySelector(t) : t;
      if (!s)
        return {
          success: !1,
          error: `Target element not found: ${t}`
        };
      const o = new ht(r), l = o.validateConfig();
      if (!l.isValid)
        return {
          success: !1,
          error: `Configuration error: ${l.errors.join(", ")}`
        };
      zt.appliedGlobalStyles || (zt.injectGlobalStyles(o), zt.appliedGlobalStyles = !0);
      const f = document.createElement("div");
      f.className = "ghost-member-directory-widget";
      const E = o.getCSSCustomProperties();
      Object.entries(E).forEach(([j, b]) => {
        f.style.setProperty(j, b);
      }), o.isRTL() && (f.setAttribute("dir", "rtl"), f.classList.add("ghost-member-directory--rtl"));
      const d = o.get();
      f.classList.add(`ghost-member-directory--${d.widgetTheme}`), s.innerHTML = "", s.appendChild(f);
      const h = new URL("/api/widget/members", window.location.origin);
      h.searchParams.set("lang", d.defaultLanguage), h.searchParams.set("theme", d.widgetTheme), h.searchParams.set("pageSize", d.defaultPageSize.toString()), h.searchParams.set("search", d.enableSearch.toString()), h.searchParams.set("filters", d.enableFilters.toString()), h.searchParams.set("avatars", d.showAvatars.toString()), h.searchParams.set("joinDates", d.showJoinDates.toString()), h.searchParams.set("memberCount", d.showMemberCount.toString()), console.log("Fetching data from server API:", h.toString());
      const a = await fetch(h);
      if (!a.ok)
        throw new Error(`Server API error: ${a.status} ${a.statusText}`);
      const p = await a.json();
      if (!p.success)
        throw new Error(p.message || "Failed to fetch data from server");
      const g = p.data, y = await import("./MemberDirectoryWidget-DYV60bdg.js"), _ = Pc(y.default, {
        target: f,
        props: {
          config: o,
          members: g.members,
          totalMembers: g.totalMembers,
          currentPage: g.currentPage,
          totalPages: g.totalPages,
          loading: !1,
          initialSearchQuery: g.searchQuery,
          initialFilters: g.filters,
          availableNewsletters: g.availableNewsletters || []
        }
      }), P = {
        id: "",
        element: s,
        config: o,
        unmount: () => {
          try {
            Nc(_), At.unregister(P.id);
          } catch (j) {
            console.error("Error unmounting widget:", j), s.innerHTML = "";
          }
        },
        update: (j) => {
          o.update(j);
          const b = o.getCSSCustomProperties();
          Object.entries(b).forEach(([R, N]) => {
            f.style.setProperty(R, N);
          }), o.isRTL() ? (f.setAttribute("dir", "rtl"), f.classList.add("ghost-member-directory--rtl")) : (f.removeAttribute("dir"), f.classList.remove("ghost-member-directory--rtl"));
        },
        getState: () => ({})
      };
      return At.register(P), {
        success: !0,
        instance: P
      };
    } catch (s) {
      return {
        success: !1,
        error: s instanceof Error ? s.message : "Unknown mounting error"
      };
    }
  }
  static unmount(t) {
    try {
      const r = typeof t == "string" ? At.get(t) : t;
      return r ? (r.unmount(), !0) : !1;
    } catch (r) {
      return console.error("Error unmounting widget:", r), !1;
    }
  }
  static unmountAll() {
    At.unmountAll();
  }
  static injectGlobalStyles(t) {
    const r = t.get(), s = document.createElement("style");
    s.id = "ghost-member-directory-global-styles", s.textContent = `
			.ghost-member-directory-widget {
				--widget-primary-color: ${r.primaryColor};
				--widget-background: ${r.backgroundColor};
				--widget-text-color: ${r.textColor};
				--widget-border-radius: ${r.borderRadius};
				--widget-font-family: ${r.fontFamily};
				
				/* Widget container styles */
				font-family: var(--widget-font-family);
				color: var(--widget-text-color);
				background: var(--widget-background);
				border-radius: var(--widget-border-radius);
				
				/* Isolation */
				position: relative;
				isolation: isolate;
				
				/* Reset some common inherited styles */
				line-height: 1.6;
				font-size: 14px;
				
				/* Ensure proper box-sizing */
				box-sizing: border-box;
			}
			
			.ghost-member-directory-widget *,
			.ghost-member-directory-widget *::before,
			.ghost-member-directory-widget *::after {
				box-sizing: border-box;
			}
			
			/* RTL styles */
			.ghost-member-directory--rtl {
				direction: rtl;
				text-align: right;
			}
			
			.ghost-member-directory--rtl .flex {
				flex-direction: row-reverse;
			}
			
			/* Theme-specific styles */
			.ghost-member-directory--dark {
				--widget-background: #1f2937;
				--widget-text-color: #f9fafb;
				--widget-primary-color: #3b82f6;
			}
			
			.ghost-member-directory--light {
				--widget-background: #ffffff;
				--widget-text-color: #374151;
				--widget-primary-color: #1f2937;
			}
		`, document.head.appendChild(s);
  }
};
ma && (window.GhostMemberDirectory = {
  mount: Lr.mount,
  unmount: Lr.unmount,
  unmountAll: Lr.unmountAll,
  getInstances: () => At.getAll()
});
var Cc = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function jc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function qc(e) {
  if (Object.prototype.hasOwnProperty.call(e, "__esModule")) return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function s() {
      var o = !1;
      try {
        o = this instanceof s;
      } catch {
      }
      return o ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(s) {
    var o = Object.getOwnPropertyDescriptor(e, s);
    Object.defineProperty(r, s, o.get ? o : {
      enumerable: !0,
      get: function() {
        return e[s];
      }
    });
  }), r;
}
/*! Axios v1.11.0 Copyright (c) 2025 Matt Zabriskie and contributors */
var Pr, fi;
function Dc() {
  if (fi) return Pr;
  fi = 1;
  function e(n, i) {
    return function() {
      return n.apply(i, arguments);
    };
  }
  const { toString: t } = Object.prototype, { getPrototypeOf: r } = Object, { iterator: s, toStringTag: o } = Symbol, l = /* @__PURE__ */ ((n) => (i) => {
    const u = t.call(i);
    return n[u] || (n[u] = u.slice(8, -1).toLowerCase());
  })(/* @__PURE__ */ Object.create(null)), f = (n) => (n = n.toLowerCase(), (i) => l(i) === n), E = (n) => (i) => typeof i === n, { isArray: d } = Array, h = E("undefined");
  function a(n) {
    return n !== null && !h(n) && n.constructor !== null && !h(n.constructor) && _(n.constructor.isBuffer) && n.constructor.isBuffer(n);
  }
  const p = f("ArrayBuffer");
  function g(n) {
    let i;
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? i = ArrayBuffer.isView(n) : i = n && n.buffer && p(n.buffer), i;
  }
  const y = E("string"), _ = E("function"), P = E("number"), j = (n) => n !== null && typeof n == "object", b = (n) => n === !0 || n === !1, O = (n) => {
    if (l(n) !== "object")
      return !1;
    const i = r(n);
    return (i === null || i === Object.prototype || Object.getPrototypeOf(i) === null) && !(o in n) && !(s in n);
  }, R = (n) => {
    if (!j(n) || a(n))
      return !1;
    try {
      return Object.keys(n).length === 0 && Object.getPrototypeOf(n) === Object.prototype;
    } catch {
      return !1;
    }
  }, N = f("Date"), H = f("File"), T = f("Blob"), D = f("FileList"), $ = (n) => j(n) && _(n.pipe), V = (n) => {
    let i;
    return n && (typeof FormData == "function" && n instanceof FormData || _(n.append) && ((i = l(n)) === "formdata" || // detect form-data instance
    i === "object" && _(n.toString) && n.toString() === "[object FormData]"));
  }, K = f("URLSearchParams"), [G, re, x, A] = ["ReadableStream", "Request", "Response", "Headers"].map(f), S = (n) => n.trim ? n.trim() : n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  function C(n, i, { allOwnKeys: u = !1 } = {}) {
    if (n === null || typeof n > "u")
      return;
    let c, m;
    if (typeof n != "object" && (n = [n]), d(n))
      for (c = 0, m = n.length; c < m; c++)
        i.call(null, n[c], c, n);
    else {
      if (a(n))
        return;
      const v = u ? Object.getOwnPropertyNames(n) : Object.keys(n), w = v.length;
      let q;
      for (c = 0; c < w; c++)
        q = v[c], i.call(null, n[q], q, n);
    }
  }
  function k(n, i) {
    if (a(n))
      return null;
    i = i.toLowerCase();
    const u = Object.keys(n);
    let c = u.length, m;
    for (; c-- > 0; )
      if (m = u[c], i === m.toLowerCase())
        return m;
    return null;
  }
  const F = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : Cc, U = (n) => !h(n) && n !== F;
  function J() {
    const { caseless: n } = U(this) && this || {}, i = {}, u = (c, m) => {
      const v = n && k(i, m) || m;
      O(i[v]) && O(c) ? i[v] = J(i[v], c) : O(c) ? i[v] = J({}, c) : d(c) ? i[v] = c.slice() : i[v] = c;
    };
    for (let c = 0, m = arguments.length; c < m; c++)
      arguments[c] && C(arguments[c], u);
    return i;
  }
  const se = (n, i, u, { allOwnKeys: c } = {}) => (C(i, (m, v) => {
    u && _(m) ? n[v] = e(m, u) : n[v] = m;
  }, { allOwnKeys: c }), n), ee = (n) => (n.charCodeAt(0) === 65279 && (n = n.slice(1)), n), ie = (n, i, u, c) => {
    n.prototype = Object.create(i.prototype, c), n.prototype.constructor = n, Object.defineProperty(n, "super", {
      value: i.prototype
    }), u && Object.assign(n.prototype, u);
  }, fe = (n, i, u, c) => {
    let m, v, w;
    const q = {};
    if (i = i || {}, n == null) return i;
    do {
      for (m = Object.getOwnPropertyNames(n), v = m.length; v-- > 0; )
        w = m[v], (!c || c(w, n, i)) && !q[w] && (i[w] = n[w], q[w] = !0);
      n = u !== !1 && r(n);
    } while (n && (!u || u(n, i)) && n !== Object.prototype);
    return i;
  }, ce = (n, i, u) => {
    n = String(n), (u === void 0 || u > n.length) && (u = n.length), u -= i.length;
    const c = n.indexOf(i, u);
    return c !== -1 && c === u;
  }, Me = (n) => {
    if (!n) return null;
    if (d(n)) return n;
    let i = n.length;
    if (!P(i)) return null;
    const u = new Array(i);
    for (; i-- > 0; )
      u[i] = n[i];
    return u;
  }, cr = /* @__PURE__ */ ((n) => (i) => n && i instanceof n)(typeof Uint8Array < "u" && r(Uint8Array)), fr = (n, i) => {
    const c = (n && n[s]).call(n);
    let m;
    for (; (m = c.next()) && !m.done; ) {
      const v = m.value;
      i.call(n, v[0], v[1]);
    }
  }, lr = (n, i) => {
    let u;
    const c = [];
    for (; (u = n.exec(i)) !== null; )
      c.push(u);
    return c;
  }, dr = f("HTMLFormElement"), hr = (n) => n.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function(u, c, m) {
      return c.toUpperCase() + m;
    }
  ), L = (({ hasOwnProperty: n }) => (i, u) => n.call(i, u))(Object.prototype), Z = f("RegExp"), Q = (n, i) => {
    const u = Object.getOwnPropertyDescriptors(n), c = {};
    C(u, (m, v) => {
      let w;
      (w = i(m, v, n)) !== !1 && (c[v] = w || m);
    }), Object.defineProperties(n, c);
  }, ye = (n) => {
    Q(n, (i, u) => {
      if (_(n) && ["arguments", "caller", "callee"].indexOf(u) !== -1)
        return !1;
      const c = n[u];
      if (_(c)) {
        if (i.enumerable = !1, "writable" in i) {
          i.writable = !1;
          return;
        }
        i.set || (i.set = () => {
          throw Error("Can not rewrite read-only method '" + u + "'");
        });
      }
    });
  }, Te = (n, i) => {
    const u = {}, c = (m) => {
      m.forEach((v) => {
        u[v] = !0;
      });
    };
    return d(n) ? c(n) : c(String(n).split(i)), u;
  }, xe = () => {
  }, Pa = (n, i) => n != null && Number.isFinite(n = +n) ? n : i;
  function $a(n) {
    return !!(n && _(n.append) && n[o] === "FormData" && n[s]);
  }
  const Na = (n) => {
    const i = new Array(10), u = (c, m) => {
      if (j(c)) {
        if (i.indexOf(c) >= 0)
          return;
        if (a(c))
          return c;
        if (!("toJSON" in c)) {
          i[m] = c;
          const v = d(c) ? [] : {};
          return C(c, (w, q) => {
            const z = u(w, m + 1);
            !h(z) && (v[q] = z);
          }), i[m] = void 0, v;
        }
      }
      return c;
    };
    return u(n, 0);
  }, xa = f("AsyncFunction"), Ca = (n) => n && (j(n) || _(n)) && _(n.then) && _(n.catch), Ss = ((n, i) => n ? setImmediate : i ? ((u, c) => (F.addEventListener("message", ({ source: m, data: v }) => {
    m === F && v === u && c.length && c.shift()();
  }, !1), (m) => {
    c.push(m), F.postMessage(u, "*");
  }))(`axios@${Math.random()}`, []) : (u) => setTimeout(u))(
    typeof setImmediate == "function",
    _(F.postMessage)
  ), ja = typeof queueMicrotask < "u" ? queueMicrotask.bind(F) : typeof process < "u" && process.nextTick || Ss;
  var I = {
    isArray: d,
    isArrayBuffer: p,
    isBuffer: a,
    isFormData: V,
    isArrayBufferView: g,
    isString: y,
    isNumber: P,
    isBoolean: b,
    isObject: j,
    isPlainObject: O,
    isEmptyObject: R,
    isReadableStream: G,
    isRequest: re,
    isResponse: x,
    isHeaders: A,
    isUndefined: h,
    isDate: N,
    isFile: H,
    isBlob: T,
    isRegExp: Z,
    isFunction: _,
    isStream: $,
    isURLSearchParams: K,
    isTypedArray: cr,
    isFileList: D,
    forEach: C,
    merge: J,
    extend: se,
    trim: S,
    stripBOM: ee,
    inherits: ie,
    toFlatObject: fe,
    kindOf: l,
    kindOfTest: f,
    endsWith: ce,
    toArray: Me,
    forEachEntry: fr,
    matchAll: lr,
    isHTMLForm: dr,
    hasOwnProperty: L,
    hasOwnProp: L,
    // an alias to avoid ESLint no-prototype-builtins detection
    reduceDescriptors: Q,
    freezeMethods: ye,
    toObjectSet: Te,
    toCamelCase: hr,
    noop: xe,
    toFiniteNumber: Pa,
    findKey: k,
    global: F,
    isContextDefined: U,
    isSpecCompliantForm: $a,
    toJSONObject: Na,
    isAsyncFn: xa,
    isThenable: Ca,
    setImmediate: Ss,
    asap: ja,
    isIterable: (n) => n != null && _(n[s])
  };
  function te(n, i, u, c, m) {
    Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = n, this.name = "AxiosError", i && (this.code = i), u && (this.config = u), c && (this.request = c), m && (this.response = m, this.status = m.status ? m.status : null);
  }
  I.inherits(te, Error, {
    toJSON: function() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: I.toJSONObject(this.config),
        code: this.code,
        status: this.status
      };
    }
  });
  const _s = te.prototype, Rs = {};
  [
    "ERR_BAD_OPTION_VALUE",
    "ERR_BAD_OPTION",
    "ECONNABORTED",
    "ETIMEDOUT",
    "ERR_NETWORK",
    "ERR_FR_TOO_MANY_REDIRECTS",
    "ERR_DEPRECATED",
    "ERR_BAD_RESPONSE",
    "ERR_BAD_REQUEST",
    "ERR_CANCELED",
    "ERR_NOT_SUPPORT",
    "ERR_INVALID_URL"
    // eslint-disable-next-line func-names
  ].forEach((n) => {
    Rs[n] = { value: n };
  }), Object.defineProperties(te, Rs), Object.defineProperty(_s, "isAxiosError", { value: !0 }), te.from = (n, i, u, c, m, v) => {
    const w = Object.create(_s);
    return I.toFlatObject(n, w, function(z) {
      return z !== Error.prototype;
    }, (q) => q !== "isAxiosError"), te.call(w, n.message, i, u, c, m), w.cause = n, w.name = n.name, v && Object.assign(w, v), w;
  };
  var qa = null;
  function pr(n) {
    return I.isPlainObject(n) || I.isArray(n);
  }
  function As(n) {
    return I.endsWith(n, "[]") ? n.slice(0, -2) : n;
  }
  function Ts(n, i, u) {
    return n ? n.concat(i).map(function(m, v) {
      return m = As(m), !u && v ? "[" + m + "]" : m;
    }).join(u ? "." : "") : i;
  }
  function Da(n) {
    return I.isArray(n) && !n.some(pr);
  }
  const ka = I.toFlatObject(I, {}, null, function(i) {
    return /^is[A-Z]/.test(i);
  });
  function Ct(n, i, u) {
    if (!I.isObject(n))
      throw new TypeError("target must be an object");
    i = i || new FormData(), u = I.toFlatObject(u, {
      metaTokens: !0,
      dots: !1,
      indexes: !1
    }, !1, function(ne, Y) {
      return !I.isUndefined(Y[ne]);
    });
    const c = u.metaTokens, m = u.visitor || M, v = u.dots, w = u.indexes, z = (u.Blob || typeof Blob < "u" && Blob) && I.isSpecCompliantForm(i);
    if (!I.isFunction(m))
      throw new TypeError("visitor must be a function");
    function B(X) {
      if (X === null) return "";
      if (I.isDate(X))
        return X.toISOString();
      if (I.isBoolean(X))
        return X.toString();
      if (!z && I.isBlob(X))
        throw new te("Blob is not supported. Use a Buffer instead.");
      return I.isArrayBuffer(X) || I.isTypedArray(X) ? z && typeof Blob == "function" ? new Blob([X]) : Buffer.from(X) : X;
    }
    function M(X, ne, Y) {
      let le = X;
      if (X && !Y && typeof X == "object") {
        if (I.endsWith(ne, "{}"))
          ne = c ? ne : ne.slice(0, -2), X = JSON.stringify(X);
        else if (I.isArray(X) && Da(X) || (I.isFileList(X) || I.endsWith(ne, "[]")) && (le = I.toArray(X)))
          return ne = As(ne), le.forEach(function(me, Ue) {
            !(I.isUndefined(me) || me === null) && i.append(
              // eslint-disable-next-line no-nested-ternary
              w === !0 ? Ts([ne], Ue, v) : w === null ? ne : ne + "[]",
              B(me)
            );
          }), !1;
      }
      return pr(X) ? !0 : (i.append(Ts(Y, ne, v), B(X)), !1);
    }
    const W = [], ue = Object.assign(ka, {
      defaultVisitor: M,
      convertValue: B,
      isVisitable: pr
    });
    function he(X, ne) {
      if (!I.isUndefined(X)) {
        if (W.indexOf(X) !== -1)
          throw Error("Circular reference detected in " + ne.join("."));
        W.push(X), I.forEach(X, function(le, pe) {
          (!(I.isUndefined(le) || le === null) && m.call(
            i,
            le,
            I.isString(pe) ? pe.trim() : pe,
            ne,
            ue
          )) === !0 && he(le, ne ? ne.concat(pe) : [pe]);
        }), W.pop();
      }
    }
    if (!I.isObject(n))
      throw new TypeError("data must be an object");
    return he(n), i;
  }
  function Os(n) {
    const i = {
      "!": "%21",
      "'": "%27",
      "(": "%28",
      ")": "%29",
      "~": "%7E",
      "%20": "+",
      "%00": "\0"
    };
    return encodeURIComponent(n).replace(/[!'()~]|%20|%00/g, function(c) {
      return i[c];
    });
  }
  function mr(n, i) {
    this._pairs = [], n && Ct(n, this, i);
  }
  const Is = mr.prototype;
  Is.append = function(i, u) {
    this._pairs.push([i, u]);
  }, Is.toString = function(i) {
    const u = i ? function(c) {
      return i.call(this, c, Os);
    } : Os;
    return this._pairs.map(function(m) {
      return u(m[0]) + "=" + u(m[1]);
    }, "").join("&");
  };
  function Fa(n) {
    return encodeURIComponent(n).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  function Ls(n, i, u) {
    if (!i)
      return n;
    const c = u && u.encode || Fa;
    I.isFunction(u) && (u = {
      serialize: u
    });
    const m = u && u.serialize;
    let v;
    if (m ? v = m(i, u) : v = I.isURLSearchParams(i) ? i.toString() : new mr(i, u).toString(c), v) {
      const w = n.indexOf("#");
      w !== -1 && (n = n.slice(0, w)), n += (n.indexOf("?") === -1 ? "?" : "&") + v;
    }
    return n;
  }
  class Ba {
    constructor() {
      this.handlers = [];
    }
    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    use(i, u, c) {
      return this.handlers.push({
        fulfilled: i,
        rejected: u,
        synchronous: c ? c.synchronous : !1,
        runWhen: c ? c.runWhen : null
      }), this.handlers.length - 1;
    }
    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     *
     * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
     */
    eject(i) {
      this.handlers[i] && (this.handlers[i] = null);
    }
    /**
     * Clear all interceptors from the stack
     *
     * @returns {void}
     */
    clear() {
      this.handlers && (this.handlers = []);
    }
    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     *
     * @returns {void}
     */
    forEach(i) {
      I.forEach(this.handlers, function(c) {
        c !== null && i(c);
      });
    }
  }
  var Ps = Ba, $s = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1
  }, Ma = typeof URLSearchParams < "u" ? URLSearchParams : mr, Ua = typeof FormData < "u" ? FormData : null, Va = typeof Blob < "u" ? Blob : null, Ga = {
    isBrowser: !0,
    classes: {
      URLSearchParams: Ma,
      FormData: Ua,
      Blob: Va
    },
    protocols: ["http", "https", "file", "blob", "url", "data"]
  };
  const gr = typeof window < "u" && typeof document < "u", yr = typeof navigator == "object" && navigator || void 0, Ha = gr && (!yr || ["ReactNative", "NativeScript", "NS"].indexOf(yr.product) < 0), Ka = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts == "function", za = gr && window.location.href || "http://localhost";
  var Wa = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    hasBrowserEnv: gr,
    hasStandardBrowserWebWorkerEnv: Ka,
    hasStandardBrowserEnv: Ha,
    navigator: yr,
    origin: za
  }), ve = {
    ...Wa,
    ...Ga
  };
  function Ja(n, i) {
    return Ct(n, new ve.classes.URLSearchParams(), {
      visitor: function(u, c, m, v) {
        return ve.isNode && I.isBuffer(u) ? (this.append(c, u.toString("base64")), !1) : v.defaultVisitor.apply(this, arguments);
      },
      ...i
    });
  }
  function Xa(n) {
    return I.matchAll(/\w+|\[(\w*)]/g, n).map((i) => i[0] === "[]" ? "" : i[1] || i[0]);
  }
  function Ya(n) {
    const i = {}, u = Object.keys(n);
    let c;
    const m = u.length;
    let v;
    for (c = 0; c < m; c++)
      v = u[c], i[v] = n[v];
    return i;
  }
  function Ns(n) {
    function i(u, c, m, v) {
      let w = u[v++];
      if (w === "__proto__") return !0;
      const q = Number.isFinite(+w), z = v >= u.length;
      return w = !w && I.isArray(m) ? m.length : w, z ? (I.hasOwnProp(m, w) ? m[w] = [m[w], c] : m[w] = c, !q) : ((!m[w] || !I.isObject(m[w])) && (m[w] = []), i(u, c, m[w], v) && I.isArray(m[w]) && (m[w] = Ya(m[w])), !q);
    }
    if (I.isFormData(n) && I.isFunction(n.entries)) {
      const u = {};
      return I.forEachEntry(n, (c, m) => {
        i(Xa(c), m, u, 0);
      }), u;
    }
    return null;
  }
  function Za(n, i, u) {
    if (I.isString(n))
      try {
        return (i || JSON.parse)(n), I.trim(n);
      } catch (c) {
        if (c.name !== "SyntaxError")
          throw c;
      }
    return (u || JSON.stringify)(n);
  }
  const Er = {
    transitional: $s,
    adapter: ["xhr", "http", "fetch"],
    transformRequest: [function(i, u) {
      const c = u.getContentType() || "", m = c.indexOf("application/json") > -1, v = I.isObject(i);
      if (v && I.isHTMLForm(i) && (i = new FormData(i)), I.isFormData(i))
        return m ? JSON.stringify(Ns(i)) : i;
      if (I.isArrayBuffer(i) || I.isBuffer(i) || I.isStream(i) || I.isFile(i) || I.isBlob(i) || I.isReadableStream(i))
        return i;
      if (I.isArrayBufferView(i))
        return i.buffer;
      if (I.isURLSearchParams(i))
        return u.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), i.toString();
      let q;
      if (v) {
        if (c.indexOf("application/x-www-form-urlencoded") > -1)
          return Ja(i, this.formSerializer).toString();
        if ((q = I.isFileList(i)) || c.indexOf("multipart/form-data") > -1) {
          const z = this.env && this.env.FormData;
          return Ct(
            q ? { "files[]": i } : i,
            z && new z(),
            this.formSerializer
          );
        }
      }
      return v || m ? (u.setContentType("application/json", !1), Za(i)) : i;
    }],
    transformResponse: [function(i) {
      const u = this.transitional || Er.transitional, c = u && u.forcedJSONParsing, m = this.responseType === "json";
      if (I.isResponse(i) || I.isReadableStream(i))
        return i;
      if (i && I.isString(i) && (c && !this.responseType || m)) {
        const w = !(u && u.silentJSONParsing) && m;
        try {
          return JSON.parse(i);
        } catch (q) {
          if (w)
            throw q.name === "SyntaxError" ? te.from(q, te.ERR_BAD_RESPONSE, this, null, this.response) : q;
        }
      }
      return i;
    }],
    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: ve.classes.FormData,
      Blob: ve.classes.Blob
    },
    validateStatus: function(i) {
      return i >= 200 && i < 300;
    },
    headers: {
      common: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": void 0
      }
    }
  };
  I.forEach(["delete", "get", "head", "post", "put", "patch"], (n) => {
    Er.headers[n] = {};
  });
  var vr = Er;
  const Qa = I.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ]);
  var eu = (n) => {
    const i = {};
    let u, c, m;
    return n && n.split(`
`).forEach(function(w) {
      m = w.indexOf(":"), u = w.substring(0, m).trim().toLowerCase(), c = w.substring(m + 1).trim(), !(!u || i[u] && Qa[u]) && (u === "set-cookie" ? i[u] ? i[u].push(c) : i[u] = [c] : i[u] = i[u] ? i[u] + ", " + c : c);
    }), i;
  };
  const xs = Symbol("internals");
  function bt(n) {
    return n && String(n).trim().toLowerCase();
  }
  function jt(n) {
    return n === !1 || n == null ? n : I.isArray(n) ? n.map(jt) : String(n);
  }
  function tu(n) {
    const i = /* @__PURE__ */ Object.create(null), u = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let c;
    for (; c = u.exec(n); )
      i[c[1]] = c[2];
    return i;
  }
  const ru = (n) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(n.trim());
  function wr(n, i, u, c, m) {
    if (I.isFunction(c))
      return c.call(this, i, u);
    if (m && (i = u), !!I.isString(i)) {
      if (I.isString(c))
        return i.indexOf(c) !== -1;
      if (I.isRegExp(c))
        return c.test(i);
    }
  }
  function nu(n) {
    return n.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (i, u, c) => u.toUpperCase() + c);
  }
  function su(n, i) {
    const u = I.toCamelCase(" " + i);
    ["get", "set", "has"].forEach((c) => {
      Object.defineProperty(n, c + u, {
        value: function(m, v, w) {
          return this[c].call(this, i, m, v, w);
        },
        configurable: !0
      });
    });
  }
  class qt {
    constructor(i) {
      i && this.set(i);
    }
    set(i, u, c) {
      const m = this;
      function v(q, z, B) {
        const M = bt(z);
        if (!M)
          throw new Error("header name must be a non-empty string");
        const W = I.findKey(m, M);
        (!W || m[W] === void 0 || B === !0 || B === void 0 && m[W] !== !1) && (m[W || z] = jt(q));
      }
      const w = (q, z) => I.forEach(q, (B, M) => v(B, M, z));
      if (I.isPlainObject(i) || i instanceof this.constructor)
        w(i, u);
      else if (I.isString(i) && (i = i.trim()) && !ru(i))
        w(eu(i), u);
      else if (I.isObject(i) && I.isIterable(i)) {
        let q = {}, z, B;
        for (const M of i) {
          if (!I.isArray(M))
            throw TypeError("Object iterator must return a key-value pair");
          q[B = M[0]] = (z = q[B]) ? I.isArray(z) ? [...z, M[1]] : [z, M[1]] : M[1];
        }
        w(q, u);
      } else
        i != null && v(u, i, c);
      return this;
    }
    get(i, u) {
      if (i = bt(i), i) {
        const c = I.findKey(this, i);
        if (c) {
          const m = this[c];
          if (!u)
            return m;
          if (u === !0)
            return tu(m);
          if (I.isFunction(u))
            return u.call(this, m, c);
          if (I.isRegExp(u))
            return u.exec(m);
          throw new TypeError("parser must be boolean|regexp|function");
        }
      }
    }
    has(i, u) {
      if (i = bt(i), i) {
        const c = I.findKey(this, i);
        return !!(c && this[c] !== void 0 && (!u || wr(this, this[c], c, u)));
      }
      return !1;
    }
    delete(i, u) {
      const c = this;
      let m = !1;
      function v(w) {
        if (w = bt(w), w) {
          const q = I.findKey(c, w);
          q && (!u || wr(c, c[q], q, u)) && (delete c[q], m = !0);
        }
      }
      return I.isArray(i) ? i.forEach(v) : v(i), m;
    }
    clear(i) {
      const u = Object.keys(this);
      let c = u.length, m = !1;
      for (; c--; ) {
        const v = u[c];
        (!i || wr(this, this[v], v, i, !0)) && (delete this[v], m = !0);
      }
      return m;
    }
    normalize(i) {
      const u = this, c = {};
      return I.forEach(this, (m, v) => {
        const w = I.findKey(c, v);
        if (w) {
          u[w] = jt(m), delete u[v];
          return;
        }
        const q = i ? nu(v) : String(v).trim();
        q !== v && delete u[v], u[q] = jt(m), c[q] = !0;
      }), this;
    }
    concat(...i) {
      return this.constructor.concat(this, ...i);
    }
    toJSON(i) {
      const u = /* @__PURE__ */ Object.create(null);
      return I.forEach(this, (c, m) => {
        c != null && c !== !1 && (u[m] = i && I.isArray(c) ? c.join(", ") : c);
      }), u;
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON()).map(([i, u]) => i + ": " + u).join(`
`);
    }
    getSetCookie() {
      return this.get("set-cookie") || [];
    }
    get [Symbol.toStringTag]() {
      return "AxiosHeaders";
    }
    static from(i) {
      return i instanceof this ? i : new this(i);
    }
    static concat(i, ...u) {
      const c = new this(i);
      return u.forEach((m) => c.set(m)), c;
    }
    static accessor(i) {
      const c = (this[xs] = this[xs] = {
        accessors: {}
      }).accessors, m = this.prototype;
      function v(w) {
        const q = bt(w);
        c[q] || (su(m, w), c[q] = !0);
      }
      return I.isArray(i) ? i.forEach(v) : v(i), this;
    }
  }
  qt.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]), I.reduceDescriptors(qt.prototype, ({ value: n }, i) => {
    let u = i[0].toUpperCase() + i.slice(1);
    return {
      get: () => n,
      set(c) {
        this[u] = c;
      }
    };
  }), I.freezeMethods(qt);
  var Ce = qt;
  function br(n, i) {
    const u = this || vr, c = i || u, m = Ce.from(c.headers);
    let v = c.data;
    return I.forEach(n, function(q) {
      v = q.call(u, v, m.normalize(), i ? i.status : void 0);
    }), m.normalize(), v;
  }
  function Cs(n) {
    return !!(n && n.__CANCEL__);
  }
  function ft(n, i, u) {
    te.call(this, n ?? "canceled", te.ERR_CANCELED, i, u), this.name = "CanceledError";
  }
  I.inherits(ft, te, {
    __CANCEL__: !0
  });
  function js(n, i, u) {
    const c = u.config.validateStatus;
    !u.status || !c || c(u.status) ? n(u) : i(new te(
      "Request failed with status code " + u.status,
      [te.ERR_BAD_REQUEST, te.ERR_BAD_RESPONSE][Math.floor(u.status / 100) - 4],
      u.config,
      u.request,
      u
    ));
  }
  function iu(n) {
    const i = /^([-+\w]{1,25})(:?\/\/|:)/.exec(n);
    return i && i[1] || "";
  }
  function ou(n, i) {
    n = n || 10;
    const u = new Array(n), c = new Array(n);
    let m = 0, v = 0, w;
    return i = i !== void 0 ? i : 1e3, function(z) {
      const B = Date.now(), M = c[v];
      w || (w = B), u[m] = z, c[m] = B;
      let W = v, ue = 0;
      for (; W !== m; )
        ue += u[W++], W = W % n;
      if (m = (m + 1) % n, m === v && (v = (v + 1) % n), B - w < i)
        return;
      const he = M && B - M;
      return he ? Math.round(ue * 1e3 / he) : void 0;
    };
  }
  function au(n, i) {
    let u = 0, c = 1e3 / i, m, v;
    const w = (B, M = Date.now()) => {
      u = M, m = null, v && (clearTimeout(v), v = null), n(...B);
    };
    return [(...B) => {
      const M = Date.now(), W = M - u;
      W >= c ? w(B, M) : (m = B, v || (v = setTimeout(() => {
        v = null, w(m);
      }, c - W)));
    }, () => m && w(m)];
  }
  const Dt = (n, i, u = 3) => {
    let c = 0;
    const m = ou(50, 250);
    return au((v) => {
      const w = v.loaded, q = v.lengthComputable ? v.total : void 0, z = w - c, B = m(z), M = w <= q;
      c = w;
      const W = {
        loaded: w,
        total: q,
        progress: q ? w / q : void 0,
        bytes: z,
        rate: B || void 0,
        estimated: B && q && M ? (q - w) / B : void 0,
        event: v,
        lengthComputable: q != null,
        [i ? "download" : "upload"]: !0
      };
      n(W);
    }, u);
  }, qs = (n, i) => {
    const u = n != null;
    return [(c) => i[0]({
      lengthComputable: u,
      total: n,
      loaded: c
    }), i[1]];
  }, Ds = (n) => (...i) => I.asap(() => n(...i));
  var uu = ve.hasStandardBrowserEnv ? /* @__PURE__ */ ((n, i) => (u) => (u = new URL(u, ve.origin), n.protocol === u.protocol && n.host === u.host && (i || n.port === u.port)))(
    new URL(ve.origin),
    ve.navigator && /(msie|trident)/i.test(ve.navigator.userAgent)
  ) : () => !0, cu = ve.hasStandardBrowserEnv ? (
    // Standard browser envs support document.cookie
    {
      write(n, i, u, c, m, v) {
        const w = [n + "=" + encodeURIComponent(i)];
        I.isNumber(u) && w.push("expires=" + new Date(u).toGMTString()), I.isString(c) && w.push("path=" + c), I.isString(m) && w.push("domain=" + m), v === !0 && w.push("secure"), document.cookie = w.join("; ");
      },
      read(n) {
        const i = document.cookie.match(new RegExp("(^|;\\s*)(" + n + ")=([^;]*)"));
        return i ? decodeURIComponent(i[3]) : null;
      },
      remove(n) {
        this.write(n, "", Date.now() - 864e5);
      }
    }
  ) : (
    // Non-standard browser env (web workers, react-native) lack needed support.
    {
      write() {
      },
      read() {
        return null;
      },
      remove() {
      }
    }
  );
  function fu(n) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(n);
  }
  function lu(n, i) {
    return i ? n.replace(/\/?\/$/, "") + "/" + i.replace(/^\/+/, "") : n;
  }
  function ks(n, i, u) {
    let c = !fu(i);
    return n && (c || u == !1) ? lu(n, i) : i;
  }
  const Fs = (n) => n instanceof Ce ? { ...n } : n;
  function et(n, i) {
    i = i || {};
    const u = {};
    function c(B, M, W, ue) {
      return I.isPlainObject(B) && I.isPlainObject(M) ? I.merge.call({ caseless: ue }, B, M) : I.isPlainObject(M) ? I.merge({}, M) : I.isArray(M) ? M.slice() : M;
    }
    function m(B, M, W, ue) {
      if (I.isUndefined(M)) {
        if (!I.isUndefined(B))
          return c(void 0, B, W, ue);
      } else return c(B, M, W, ue);
    }
    function v(B, M) {
      if (!I.isUndefined(M))
        return c(void 0, M);
    }
    function w(B, M) {
      if (I.isUndefined(M)) {
        if (!I.isUndefined(B))
          return c(void 0, B);
      } else return c(void 0, M);
    }
    function q(B, M, W) {
      if (W in i)
        return c(B, M);
      if (W in n)
        return c(void 0, B);
    }
    const z = {
      url: v,
      method: v,
      data: v,
      baseURL: w,
      transformRequest: w,
      transformResponse: w,
      paramsSerializer: w,
      timeout: w,
      timeoutMessage: w,
      withCredentials: w,
      withXSRFToken: w,
      adapter: w,
      responseType: w,
      xsrfCookieName: w,
      xsrfHeaderName: w,
      onUploadProgress: w,
      onDownloadProgress: w,
      decompress: w,
      maxContentLength: w,
      maxBodyLength: w,
      beforeRedirect: w,
      transport: w,
      httpAgent: w,
      httpsAgent: w,
      cancelToken: w,
      socketPath: w,
      responseEncoding: w,
      validateStatus: q,
      headers: (B, M, W) => m(Fs(B), Fs(M), W, !0)
    };
    return I.forEach(Object.keys({ ...n, ...i }), function(M) {
      const W = z[M] || m, ue = W(n[M], i[M], M);
      I.isUndefined(ue) && W !== q || (u[M] = ue);
    }), u;
  }
  var Bs = (n) => {
    const i = et({}, n);
    let { data: u, withXSRFToken: c, xsrfHeaderName: m, xsrfCookieName: v, headers: w, auth: q } = i;
    i.headers = w = Ce.from(w), i.url = Ls(ks(i.baseURL, i.url, i.allowAbsoluteUrls), n.params, n.paramsSerializer), q && w.set(
      "Authorization",
      "Basic " + btoa((q.username || "") + ":" + (q.password ? unescape(encodeURIComponent(q.password)) : ""))
    );
    let z;
    if (I.isFormData(u)) {
      if (ve.hasStandardBrowserEnv || ve.hasStandardBrowserWebWorkerEnv)
        w.setContentType(void 0);
      else if ((z = w.getContentType()) !== !1) {
        const [B, ...M] = z ? z.split(";").map((W) => W.trim()).filter(Boolean) : [];
        w.setContentType([B || "multipart/form-data", ...M].join("; "));
      }
    }
    if (ve.hasStandardBrowserEnv && (c && I.isFunction(c) && (c = c(i)), c || c !== !1 && uu(i.url))) {
      const B = m && v && cu.read(v);
      B && w.set(m, B);
    }
    return i;
  }, du = typeof XMLHttpRequest < "u" && function(n) {
    return new Promise(function(u, c) {
      const m = Bs(n);
      let v = m.data;
      const w = Ce.from(m.headers).normalize();
      let { responseType: q, onUploadProgress: z, onDownloadProgress: B } = m, M, W, ue, he, X;
      function ne() {
        he && he(), X && X(), m.cancelToken && m.cancelToken.unsubscribe(M), m.signal && m.signal.removeEventListener("abort", M);
      }
      let Y = new XMLHttpRequest();
      Y.open(m.method.toUpperCase(), m.url, !0), Y.timeout = m.timeout;
      function le() {
        if (!Y)
          return;
        const me = Ce.from(
          "getAllResponseHeaders" in Y && Y.getAllResponseHeaders()
        ), Oe = {
          data: !q || q === "text" || q === "json" ? Y.responseText : Y.response,
          status: Y.status,
          statusText: Y.statusText,
          headers: me,
          config: n,
          request: Y
        };
        js(function(tt) {
          u(tt), ne();
        }, function(tt) {
          c(tt), ne();
        }, Oe), Y = null;
      }
      "onloadend" in Y ? Y.onloadend = le : Y.onreadystatechange = function() {
        !Y || Y.readyState !== 4 || Y.status === 0 && !(Y.responseURL && Y.responseURL.indexOf("file:") === 0) || setTimeout(le);
      }, Y.onabort = function() {
        Y && (c(new te("Request aborted", te.ECONNABORTED, n, Y)), Y = null);
      }, Y.onerror = function() {
        c(new te("Network Error", te.ERR_NETWORK, n, Y)), Y = null;
      }, Y.ontimeout = function() {
        let Ue = m.timeout ? "timeout of " + m.timeout + "ms exceeded" : "timeout exceeded";
        const Oe = m.transitional || $s;
        m.timeoutErrorMessage && (Ue = m.timeoutErrorMessage), c(new te(
          Ue,
          Oe.clarifyTimeoutError ? te.ETIMEDOUT : te.ECONNABORTED,
          n,
          Y
        )), Y = null;
      }, v === void 0 && w.setContentType(null), "setRequestHeader" in Y && I.forEach(w.toJSON(), function(Ue, Oe) {
        Y.setRequestHeader(Oe, Ue);
      }), I.isUndefined(m.withCredentials) || (Y.withCredentials = !!m.withCredentials), q && q !== "json" && (Y.responseType = m.responseType), B && ([ue, X] = Dt(B, !0), Y.addEventListener("progress", ue)), z && Y.upload && ([W, he] = Dt(z), Y.upload.addEventListener("progress", W), Y.upload.addEventListener("loadend", he)), (m.cancelToken || m.signal) && (M = (me) => {
        Y && (c(!me || me.type ? new ft(null, n, Y) : me), Y.abort(), Y = null);
      }, m.cancelToken && m.cancelToken.subscribe(M), m.signal && (m.signal.aborted ? M() : m.signal.addEventListener("abort", M)));
      const pe = iu(m.url);
      if (pe && ve.protocols.indexOf(pe) === -1) {
        c(new te("Unsupported protocol " + pe + ":", te.ERR_BAD_REQUEST, n));
        return;
      }
      Y.send(v || null);
    });
  }, hu = (n, i) => {
    const { length: u } = n = n ? n.filter(Boolean) : [];
    if (i || u) {
      let c = new AbortController(), m;
      const v = function(B) {
        if (!m) {
          m = !0, q();
          const M = B instanceof Error ? B : this.reason;
          c.abort(M instanceof te ? M : new ft(M instanceof Error ? M.message : M));
        }
      };
      let w = i && setTimeout(() => {
        w = null, v(new te(`timeout ${i} of ms exceeded`, te.ETIMEDOUT));
      }, i);
      const q = () => {
        n && (w && clearTimeout(w), w = null, n.forEach((B) => {
          B.unsubscribe ? B.unsubscribe(v) : B.removeEventListener("abort", v);
        }), n = null);
      };
      n.forEach((B) => B.addEventListener("abort", v));
      const { signal: z } = c;
      return z.unsubscribe = () => I.asap(q), z;
    }
  };
  const pu = function* (n, i) {
    let u = n.byteLength;
    if (u < i) {
      yield n;
      return;
    }
    let c = 0, m;
    for (; c < u; )
      m = c + i, yield n.slice(c, m), c = m;
  }, mu = async function* (n, i) {
    for await (const u of gu(n))
      yield* pu(u, i);
  }, gu = async function* (n) {
    if (n[Symbol.asyncIterator]) {
      yield* n;
      return;
    }
    const i = n.getReader();
    try {
      for (; ; ) {
        const { done: u, value: c } = await i.read();
        if (u)
          break;
        yield c;
      }
    } finally {
      await i.cancel();
    }
  }, Ms = (n, i, u, c) => {
    const m = mu(n, i);
    let v = 0, w, q = (z) => {
      w || (w = !0, c && c(z));
    };
    return new ReadableStream({
      async pull(z) {
        try {
          const { done: B, value: M } = await m.next();
          if (B) {
            q(), z.close();
            return;
          }
          let W = M.byteLength;
          if (u) {
            let ue = v += W;
            u(ue);
          }
          z.enqueue(new Uint8Array(M));
        } catch (B) {
          throw q(B), B;
        }
      },
      cancel(z) {
        return q(z), m.return();
      }
    }, {
      highWaterMark: 2
    });
  }, kt = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Us = kt && typeof ReadableStream == "function", yu = kt && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((n) => (i) => n.encode(i))(new TextEncoder()) : async (n) => new Uint8Array(await new Response(n).arrayBuffer())), Vs = (n, ...i) => {
    try {
      return !!n(...i);
    } catch {
      return !1;
    }
  }, Eu = Us && Vs(() => {
    let n = !1;
    const i = new Request(ve.origin, {
      body: new ReadableStream(),
      method: "POST",
      get duplex() {
        return n = !0, "half";
      }
    }).headers.has("Content-Type");
    return n && !i;
  }), Gs = 64 * 1024, Sr = Us && Vs(() => I.isReadableStream(new Response("").body)), Ft = {
    stream: Sr && ((n) => n.body)
  };
  kt && ((n) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((i) => {
      !Ft[i] && (Ft[i] = I.isFunction(n[i]) ? (u) => u[i]() : (u, c) => {
        throw new te(`Response type '${i}' is not supported`, te.ERR_NOT_SUPPORT, c);
      });
    });
  })(new Response());
  const vu = async (n) => {
    if (n == null)
      return 0;
    if (I.isBlob(n))
      return n.size;
    if (I.isSpecCompliantForm(n))
      return (await new Request(ve.origin, {
        method: "POST",
        body: n
      }).arrayBuffer()).byteLength;
    if (I.isArrayBufferView(n) || I.isArrayBuffer(n))
      return n.byteLength;
    if (I.isURLSearchParams(n) && (n = n + ""), I.isString(n))
      return (await yu(n)).byteLength;
  }, wu = async (n, i) => {
    const u = I.toFiniteNumber(n.getContentLength());
    return u ?? vu(i);
  };
  var bu = kt && (async (n) => {
    let {
      url: i,
      method: u,
      data: c,
      signal: m,
      cancelToken: v,
      timeout: w,
      onDownloadProgress: q,
      onUploadProgress: z,
      responseType: B,
      headers: M,
      withCredentials: W = "same-origin",
      fetchOptions: ue
    } = Bs(n);
    B = B ? (B + "").toLowerCase() : "text";
    let he = hu([m, v && v.toAbortSignal()], w), X;
    const ne = he && he.unsubscribe && (() => {
      he.unsubscribe();
    });
    let Y;
    try {
      if (z && Eu && u !== "get" && u !== "head" && (Y = await wu(M, c)) !== 0) {
        let Oe = new Request(i, {
          method: "POST",
          body: c,
          duplex: "half"
        }), We;
        if (I.isFormData(c) && (We = Oe.headers.get("content-type")) && M.setContentType(We), Oe.body) {
          const [tt, Gt] = qs(
            Y,
            Dt(Ds(z))
          );
          c = Ms(Oe.body, Gs, tt, Gt);
        }
      }
      I.isString(W) || (W = W ? "include" : "omit");
      const le = "credentials" in Request.prototype;
      X = new Request(i, {
        ...ue,
        signal: he,
        method: u.toUpperCase(),
        headers: M.normalize().toJSON(),
        body: c,
        duplex: "half",
        credentials: le ? W : void 0
      });
      let pe = await fetch(X, ue);
      const me = Sr && (B === "stream" || B === "response");
      if (Sr && (q || me && ne)) {
        const Oe = {};
        ["status", "statusText", "headers"].forEach((Ys) => {
          Oe[Ys] = pe[Ys];
        });
        const We = I.toFiniteNumber(pe.headers.get("content-length")), [tt, Gt] = q && qs(
          We,
          Dt(Ds(q), !0)
        ) || [];
        pe = new Response(
          Ms(pe.body, Gs, tt, () => {
            Gt && Gt(), ne && ne();
          }),
          Oe
        );
      }
      B = B || "text";
      let Ue = await Ft[I.findKey(Ft, B) || "text"](pe, n);
      return !me && ne && ne(), await new Promise((Oe, We) => {
        js(Oe, We, {
          data: Ue,
          headers: Ce.from(pe.headers),
          status: pe.status,
          statusText: pe.statusText,
          config: n,
          request: X
        });
      });
    } catch (le) {
      throw ne && ne(), le && le.name === "TypeError" && /Load failed|fetch/i.test(le.message) ? Object.assign(
        new te("Network Error", te.ERR_NETWORK, n, X),
        {
          cause: le.cause || le
        }
      ) : te.from(le, le && le.code, n, X);
    }
  });
  const _r = {
    http: qa,
    xhr: du,
    fetch: bu
  };
  I.forEach(_r, (n, i) => {
    if (n) {
      try {
        Object.defineProperty(n, "name", { value: i });
      } catch {
      }
      Object.defineProperty(n, "adapterName", { value: i });
    }
  });
  const Hs = (n) => `- ${n}`, Su = (n) => I.isFunction(n) || n === null || n === !1;
  var Ks = {
    getAdapter: (n) => {
      n = I.isArray(n) ? n : [n];
      const { length: i } = n;
      let u, c;
      const m = {};
      for (let v = 0; v < i; v++) {
        u = n[v];
        let w;
        if (c = u, !Su(u) && (c = _r[(w = String(u)).toLowerCase()], c === void 0))
          throw new te(`Unknown adapter '${w}'`);
        if (c)
          break;
        m[w || "#" + v] = c;
      }
      if (!c) {
        const v = Object.entries(m).map(
          ([q, z]) => `adapter ${q} ` + (z === !1 ? "is not supported by the environment" : "is not available in the build")
        );
        let w = i ? v.length > 1 ? `since :
` + v.map(Hs).join(`
`) : " " + Hs(v[0]) : "as no adapter specified";
        throw new te(
          "There is no suitable adapter to dispatch the request " + w,
          "ERR_NOT_SUPPORT"
        );
      }
      return c;
    },
    adapters: _r
  };
  function Rr(n) {
    if (n.cancelToken && n.cancelToken.throwIfRequested(), n.signal && n.signal.aborted)
      throw new ft(null, n);
  }
  function zs(n) {
    return Rr(n), n.headers = Ce.from(n.headers), n.data = br.call(
      n,
      n.transformRequest
    ), ["post", "put", "patch"].indexOf(n.method) !== -1 && n.headers.setContentType("application/x-www-form-urlencoded", !1), Ks.getAdapter(n.adapter || vr.adapter)(n).then(function(c) {
      return Rr(n), c.data = br.call(
        n,
        n.transformResponse,
        c
      ), c.headers = Ce.from(c.headers), c;
    }, function(c) {
      return Cs(c) || (Rr(n), c && c.response && (c.response.data = br.call(
        n,
        n.transformResponse,
        c.response
      ), c.response.headers = Ce.from(c.response.headers))), Promise.reject(c);
    });
  }
  const Ws = "1.11.0", Bt = {};
  ["object", "boolean", "number", "function", "string", "symbol"].forEach((n, i) => {
    Bt[n] = function(c) {
      return typeof c === n || "a" + (i < 1 ? "n " : " ") + n;
    };
  });
  const Js = {};
  Bt.transitional = function(i, u, c) {
    function m(v, w) {
      return "[Axios v" + Ws + "] Transitional option '" + v + "'" + w + (c ? ". " + c : "");
    }
    return (v, w, q) => {
      if (i === !1)
        throw new te(
          m(w, " has been removed" + (u ? " in " + u : "")),
          te.ERR_DEPRECATED
        );
      return u && !Js[w] && (Js[w] = !0, console.warn(
        m(
          w,
          " has been deprecated since v" + u + " and will be removed in the near future"
        )
      )), i ? i(v, w, q) : !0;
    };
  }, Bt.spelling = function(i) {
    return (u, c) => (console.warn(`${c} is likely a misspelling of ${i}`), !0);
  };
  function _u(n, i, u) {
    if (typeof n != "object")
      throw new te("options must be an object", te.ERR_BAD_OPTION_VALUE);
    const c = Object.keys(n);
    let m = c.length;
    for (; m-- > 0; ) {
      const v = c[m], w = i[v];
      if (w) {
        const q = n[v], z = q === void 0 || w(q, v, n);
        if (z !== !0)
          throw new te("option " + v + " must be " + z, te.ERR_BAD_OPTION_VALUE);
        continue;
      }
      if (u !== !0)
        throw new te("Unknown option " + v, te.ERR_BAD_OPTION);
    }
  }
  var Mt = {
    assertOptions: _u,
    validators: Bt
  };
  const De = Mt.validators;
  class Ut {
    constructor(i) {
      this.defaults = i || {}, this.interceptors = {
        request: new Ps(),
        response: new Ps()
      };
    }
    /**
     * Dispatch a request
     *
     * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
     * @param {?Object} config
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    async request(i, u) {
      try {
        return await this._request(i, u);
      } catch (c) {
        if (c instanceof Error) {
          let m = {};
          Error.captureStackTrace ? Error.captureStackTrace(m) : m = new Error();
          const v = m.stack ? m.stack.replace(/^.+\n/, "") : "";
          try {
            c.stack ? v && !String(c.stack).endsWith(v.replace(/^.+\n.+\n/, "")) && (c.stack += `
` + v) : c.stack = v;
          } catch {
          }
        }
        throw c;
      }
    }
    _request(i, u) {
      typeof i == "string" ? (u = u || {}, u.url = i) : u = i || {}, u = et(this.defaults, u);
      const { transitional: c, paramsSerializer: m, headers: v } = u;
      c !== void 0 && Mt.assertOptions(c, {
        silentJSONParsing: De.transitional(De.boolean),
        forcedJSONParsing: De.transitional(De.boolean),
        clarifyTimeoutError: De.transitional(De.boolean)
      }, !1), m != null && (I.isFunction(m) ? u.paramsSerializer = {
        serialize: m
      } : Mt.assertOptions(m, {
        encode: De.function,
        serialize: De.function
      }, !0)), u.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? u.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : u.allowAbsoluteUrls = !0), Mt.assertOptions(u, {
        baseUrl: De.spelling("baseURL"),
        withXsrfToken: De.spelling("withXSRFToken")
      }, !0), u.method = (u.method || this.defaults.method || "get").toLowerCase();
      let w = v && I.merge(
        v.common,
        v[u.method]
      );
      v && I.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (X) => {
          delete v[X];
        }
      ), u.headers = Ce.concat(w, v);
      const q = [];
      let z = !0;
      this.interceptors.request.forEach(function(ne) {
        typeof ne.runWhen == "function" && ne.runWhen(u) === !1 || (z = z && ne.synchronous, q.unshift(ne.fulfilled, ne.rejected));
      });
      const B = [];
      this.interceptors.response.forEach(function(ne) {
        B.push(ne.fulfilled, ne.rejected);
      });
      let M, W = 0, ue;
      if (!z) {
        const X = [zs.bind(this), void 0];
        for (X.unshift(...q), X.push(...B), ue = X.length, M = Promise.resolve(u); W < ue; )
          M = M.then(X[W++], X[W++]);
        return M;
      }
      ue = q.length;
      let he = u;
      for (W = 0; W < ue; ) {
        const X = q[W++], ne = q[W++];
        try {
          he = X(he);
        } catch (Y) {
          ne.call(this, Y);
          break;
        }
      }
      try {
        M = zs.call(this, he);
      } catch (X) {
        return Promise.reject(X);
      }
      for (W = 0, ue = B.length; W < ue; )
        M = M.then(B[W++], B[W++]);
      return M;
    }
    getUri(i) {
      i = et(this.defaults, i);
      const u = ks(i.baseURL, i.url, i.allowAbsoluteUrls);
      return Ls(u, i.params, i.paramsSerializer);
    }
  }
  I.forEach(["delete", "get", "head", "options"], function(i) {
    Ut.prototype[i] = function(u, c) {
      return this.request(et(c || {}, {
        method: i,
        url: u,
        data: (c || {}).data
      }));
    };
  }), I.forEach(["post", "put", "patch"], function(i) {
    function u(c) {
      return function(v, w, q) {
        return this.request(et(q || {}, {
          method: i,
          headers: c ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url: v,
          data: w
        }));
      };
    }
    Ut.prototype[i] = u(), Ut.prototype[i + "Form"] = u(!0);
  });
  var Vt = Ut;
  class Ar {
    constructor(i) {
      if (typeof i != "function")
        throw new TypeError("executor must be a function.");
      let u;
      this.promise = new Promise(function(v) {
        u = v;
      });
      const c = this;
      this.promise.then((m) => {
        if (!c._listeners) return;
        let v = c._listeners.length;
        for (; v-- > 0; )
          c._listeners[v](m);
        c._listeners = null;
      }), this.promise.then = (m) => {
        let v;
        const w = new Promise((q) => {
          c.subscribe(q), v = q;
        }).then(m);
        return w.cancel = function() {
          c.unsubscribe(v);
        }, w;
      }, i(function(v, w, q) {
        c.reason || (c.reason = new ft(v, w, q), u(c.reason));
      });
    }
    /**
     * Throws a `CanceledError` if cancellation has been requested.
     */
    throwIfRequested() {
      if (this.reason)
        throw this.reason;
    }
    /**
     * Subscribe to the cancel signal
     */
    subscribe(i) {
      if (this.reason) {
        i(this.reason);
        return;
      }
      this._listeners ? this._listeners.push(i) : this._listeners = [i];
    }
    /**
     * Unsubscribe from the cancel signal
     */
    unsubscribe(i) {
      if (!this._listeners)
        return;
      const u = this._listeners.indexOf(i);
      u !== -1 && this._listeners.splice(u, 1);
    }
    toAbortSignal() {
      const i = new AbortController(), u = (c) => {
        i.abort(c);
      };
      return this.subscribe(u), i.signal.unsubscribe = () => this.unsubscribe(u), i.signal;
    }
    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    static source() {
      let i;
      return {
        token: new Ar(function(m) {
          i = m;
        }),
        cancel: i
      };
    }
  }
  var Ru = Ar;
  function Au(n) {
    return function(u) {
      return n.apply(null, u);
    };
  }
  function Tu(n) {
    return I.isObject(n) && n.isAxiosError === !0;
  }
  const Tr = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
  };
  Object.entries(Tr).forEach(([n, i]) => {
    Tr[i] = n;
  });
  var Ou = Tr;
  function Xs(n) {
    const i = new Vt(n), u = e(Vt.prototype.request, i);
    return I.extend(u, Vt.prototype, i, { allOwnKeys: !0 }), I.extend(u, i, null, { allOwnKeys: !0 }), u.create = function(m) {
      return Xs(et(n, m));
    }, u;
  }
  const de = Xs(vr);
  return de.Axios = Vt, de.CanceledError = ft, de.CancelToken = Ru, de.isCancel = Cs, de.VERSION = Ws, de.toFormData = Ct, de.AxiosError = te, de.Cancel = de.CanceledError, de.all = function(i) {
    return Promise.all(i);
  }, de.spread = Au, de.isAxiosError = Tu, de.mergeConfig = et, de.AxiosHeaders = Ce, de.formToJSON = (n) => Ns(I.isHTMLForm(n) ? new FormData(n) : n), de.getAdapter = Ks.getAdapter, de.HttpStatusCode = Ou, de.default = de, Pr = de, Pr;
}
var $r, li;
function kc() {
  return li || (li = 1, $r = typeof self == "object" ? self.FormData : window.FormData), $r;
}
const Fc = {}, Bc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fc
}, Symbol.toStringTag, { value: "Module" })), Re = /* @__PURE__ */ qc(Bc);
var Ge = {}, Ht = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var di;
function Nt() {
  return di || (di = 1, (function(e, t) {
    var r = Re, s = r.Buffer;
    function o(f, E) {
      for (var d in f)
        E[d] = f[d];
    }
    s.from && s.alloc && s.allocUnsafe && s.allocUnsafeSlow ? e.exports = r : (o(r, t), t.Buffer = l);
    function l(f, E, d) {
      return s(f, E, d);
    }
    l.prototype = Object.create(s.prototype), o(s, l), l.from = function(f, E, d) {
      if (typeof f == "number")
        throw new TypeError("Argument must not be a number");
      return s(f, E, d);
    }, l.alloc = function(f, E, d) {
      if (typeof f != "number")
        throw new TypeError("Argument must be a number");
      var h = s(f);
      return E !== void 0 ? typeof d == "string" ? h.fill(E, d) : h.fill(E) : h.fill(0), h;
    }, l.allocUnsafe = function(f) {
      if (typeof f != "number")
        throw new TypeError("Argument must be a number");
      return s(f);
    }, l.allocUnsafeSlow = function(f) {
      if (typeof f != "number")
        throw new TypeError("Argument must be a number");
      return r.SlowBuffer(f);
    };
  })(Ht, Ht.exports)), Ht.exports;
}
var Nr, hi;
function ga() {
  if (hi) return Nr;
  hi = 1;
  var e = Nt().Buffer, t = Re, r = Re;
  function s(o) {
    if (this.buffer = null, this.writable = !0, this.readable = !0, !o)
      return this.buffer = e.alloc(0), this;
    if (typeof o.pipe == "function")
      return this.buffer = e.alloc(0), o.pipe(this), this;
    if (o.length || typeof o == "object")
      return this.buffer = o, this.writable = !1, process.nextTick((function() {
        this.emit("end", o), this.readable = !1, this.emit("close");
      }).bind(this)), this;
    throw new TypeError("Unexpected data type (" + typeof o + ")");
  }
  return r.inherits(s, t), s.prototype.write = function(l) {
    this.buffer = e.concat([this.buffer, e.from(l)]), this.emit("data", l);
  }, s.prototype.end = function(l) {
    l && this.write(l), this.emit("end", l), this.emit("close"), this.writable = !1, this.readable = !1;
  }, Nr = s, Nr;
}
var xr, pi;
function Mc() {
  if (pi) return xr;
  pi = 1;
  function e(s) {
    var o = (s / 8 | 0) + (s % 8 === 0 ? 0 : 1);
    return o;
  }
  var t = {
    ES256: e(256),
    ES384: e(384),
    ES512: e(521)
  };
  function r(s) {
    var o = t[s];
    if (o)
      return o;
    throw new Error('Unknown algorithm "' + s + '"');
  }
  return xr = r, xr;
}
var Cr, mi;
function Uc() {
  if (mi) return Cr;
  mi = 1;
  var e = Nt().Buffer, t = Mc(), r = 128, s = 0, o = 32, l = 16, f = 2, E = l | o | s << 6, d = f | s << 6;
  function h(_) {
    return _.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  }
  function a(_) {
    if (e.isBuffer(_))
      return _;
    if (typeof _ == "string")
      return e.from(_, "base64");
    throw new TypeError("ECDSA signature must be a Base64 string or a Buffer");
  }
  function p(_, P) {
    _ = a(_);
    var j = t(P), b = j + 1, O = _.length, R = 0;
    if (_[R++] !== E)
      throw new Error('Could not find expected "seq"');
    var N = _[R++];
    if (N === (r | 1) && (N = _[R++]), O - R < N)
      throw new Error('"seq" specified length of "' + N + '", only "' + (O - R) + '" remaining');
    if (_[R++] !== d)
      throw new Error('Could not find expected "int" for "r"');
    var H = _[R++];
    if (O - R - 2 < H)
      throw new Error('"r" specified length of "' + H + '", only "' + (O - R - 2) + '" available');
    if (b < H)
      throw new Error('"r" specified length of "' + H + '", max of "' + b + '" is acceptable');
    var T = R;
    if (R += H, _[R++] !== d)
      throw new Error('Could not find expected "int" for "s"');
    var D = _[R++];
    if (O - R !== D)
      throw new Error('"s" specified length of "' + D + '", expected "' + (O - R) + '"');
    if (b < D)
      throw new Error('"s" specified length of "' + D + '", max of "' + b + '" is acceptable');
    var $ = R;
    if (R += D, R !== O)
      throw new Error('Expected to consume entire buffer, but "' + (O - R) + '" bytes remain');
    var V = j - H, K = j - D, G = e.allocUnsafe(V + H + K + D);
    for (R = 0; R < V; ++R)
      G[R] = 0;
    _.copy(G, R, T + Math.max(-V, 0), T + H), R = j;
    for (var re = R; R < re + K; ++R)
      G[R] = 0;
    return _.copy(G, R, $ + Math.max(-K, 0), $ + D), G = G.toString("base64"), G = h(G), G;
  }
  function g(_, P, j) {
    for (var b = 0; P + b < j && _[P + b] === 0; )
      ++b;
    var O = _[P + b] >= r;
    return O && --b, b;
  }
  function y(_, P) {
    _ = a(_);
    var j = t(P), b = _.length;
    if (b !== j * 2)
      throw new TypeError('"' + P + '" signatures must be "' + j * 2 + '" bytes, saw "' + b + '"');
    var O = g(_, 0, j), R = g(_, j, _.length), N = j - O, H = j - R, T = 2 + N + 1 + 1 + H, D = T < r, $ = e.allocUnsafe((D ? 2 : 3) + T), V = 0;
    return $[V++] = E, D ? $[V++] = T : ($[V++] = r | 1, $[V++] = T & 255), $[V++] = d, $[V++] = N, O < 0 ? ($[V++] = 0, V += _.copy($, V, 0, j)) : V += _.copy($, V, O, j), $[V++] = d, $[V++] = H, R < 0 ? ($[V++] = 0, _.copy($, V, j)) : _.copy($, V, j + R), $;
  }
  return Cr = {
    derToJose: p,
    joseToDer: y
  }, Cr;
}
var jr, gi;
function Vc() {
  if (gi) return jr;
  gi = 1;
  var e = Re.Buffer, t = Re.SlowBuffer;
  jr = r;
  function r(l, f) {
    if (!e.isBuffer(l) || !e.isBuffer(f) || l.length !== f.length)
      return !1;
    for (var E = 0, d = 0; d < l.length; d++)
      E |= l[d] ^ f[d];
    return E === 0;
  }
  r.install = function() {
    e.prototype.equal = t.prototype.equal = function(f) {
      return r(this, f);
    };
  };
  var s = e.prototype.equal, o = t.prototype.equal;
  return r.restore = function() {
    e.prototype.equal = s, t.prototype.equal = o;
  }, jr;
}
var qr, yi;
function ya() {
  if (yi) return qr;
  yi = 1;
  var e = Nt().Buffer, t = Re, r = Uc(), s = Re, o = `"%s" is not a valid algorithm.
  Supported algorithms are:
  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".`, l = "secret must be a string or buffer", f = "key must be a string or a buffer", E = "key must be a string, a buffer or an object", d = typeof t.createPublicKey == "function";
  d && (f += " or a KeyObject", l += "or a KeyObject");
  function h(x) {
    if (!e.isBuffer(x) && typeof x != "string" && (!d || typeof x != "object" || typeof x.type != "string" || typeof x.asymmetricKeyType != "string" || typeof x.export != "function"))
      throw _(f);
  }
  function a(x) {
    if (!e.isBuffer(x) && typeof x != "string" && typeof x != "object")
      throw _(E);
  }
  function p(x) {
    if (!e.isBuffer(x)) {
      if (typeof x == "string")
        return x;
      if (!d || typeof x != "object" || x.type !== "secret" || typeof x.export != "function")
        throw _(l);
    }
  }
  function g(x) {
    return x.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  }
  function y(x) {
    x = x.toString();
    var A = 4 - x.length % 4;
    if (A !== 4)
      for (var S = 0; S < A; ++S)
        x += "=";
    return x.replace(/\-/g, "+").replace(/_/g, "/");
  }
  function _(x) {
    var A = [].slice.call(arguments, 1), S = s.format.bind(s, x).apply(null, A);
    return new TypeError(S);
  }
  function P(x) {
    return e.isBuffer(x) || typeof x == "string";
  }
  function j(x) {
    return P(x) || (x = JSON.stringify(x)), x;
  }
  function b(x) {
    return function(S, C) {
      p(C), S = j(S);
      var k = t.createHmac("sha" + x, C), F = (k.update(S), k.digest("base64"));
      return g(F);
    };
  }
  var O, R = "timingSafeEqual" in t ? function(A, S) {
    return A.byteLength !== S.byteLength ? !1 : t.timingSafeEqual(A, S);
  } : function(A, S) {
    return O || (O = Vc()), O(A, S);
  };
  function N(x) {
    return function(S, C, k) {
      var F = b(x)(S, k);
      return R(e.from(C), e.from(F));
    };
  }
  function H(x) {
    return function(S, C) {
      a(C), S = j(S);
      var k = t.createSign("RSA-SHA" + x), F = (k.update(S), k.sign(C, "base64"));
      return g(F);
    };
  }
  function T(x) {
    return function(S, C, k) {
      h(k), S = j(S), C = y(C);
      var F = t.createVerify("RSA-SHA" + x);
      return F.update(S), F.verify(k, C, "base64");
    };
  }
  function D(x) {
    return function(S, C) {
      a(C), S = j(S);
      var k = t.createSign("RSA-SHA" + x), F = (k.update(S), k.sign({
        key: C,
        padding: t.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: t.constants.RSA_PSS_SALTLEN_DIGEST
      }, "base64"));
      return g(F);
    };
  }
  function $(x) {
    return function(S, C, k) {
      h(k), S = j(S), C = y(C);
      var F = t.createVerify("RSA-SHA" + x);
      return F.update(S), F.verify({
        key: k,
        padding: t.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: t.constants.RSA_PSS_SALTLEN_DIGEST
      }, C, "base64");
    };
  }
  function V(x) {
    var A = H(x);
    return function() {
      var C = A.apply(null, arguments);
      return C = r.derToJose(C, "ES" + x), C;
    };
  }
  function K(x) {
    var A = T(x);
    return function(C, k, F) {
      k = r.joseToDer(k, "ES" + x).toString("base64");
      var U = A(C, k, F);
      return U;
    };
  }
  function G() {
    return function() {
      return "";
    };
  }
  function re() {
    return function(A, S) {
      return S === "";
    };
  }
  return qr = function(A) {
    var S = {
      hs: b,
      rs: H,
      ps: D,
      es: V,
      none: G
    }, C = {
      hs: N,
      rs: T,
      ps: $,
      es: K,
      none: re
    }, k = A.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/i);
    if (!k)
      throw _(o, A);
    var F = (k[1] || k[3]).toLowerCase(), U = k[2];
    return {
      sign: S[F](U),
      verify: C[F](U)
    };
  }, qr;
}
var Dr, Ei;
function Ea() {
  if (Ei) return Dr;
  Ei = 1;
  var e = Re.Buffer;
  return Dr = function(r) {
    return typeof r == "string" ? r : typeof r == "number" || e.isBuffer(r) ? r.toString() : JSON.stringify(r);
  }, Dr;
}
var kr, vi;
function Gc() {
  if (vi) return kr;
  vi = 1;
  var e = Nt().Buffer, t = ga(), r = ya(), s = Re, o = Ea(), l = Re;
  function f(a, p) {
    return e.from(a, p).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  }
  function E(a, p, g) {
    g = g || "utf8";
    var y = f(o(a), "binary"), _ = f(o(p), g);
    return l.format("%s.%s", y, _);
  }
  function d(a) {
    var p = a.header, g = a.payload, y = a.secret || a.privateKey, _ = a.encoding, P = r(p.alg), j = E(p, g, _), b = P.sign(j, y);
    return l.format("%s.%s", j, b);
  }
  function h(a) {
    var p = a.secret || a.privateKey || a.key, g = new t(p);
    this.readable = !0, this.header = a.header, this.encoding = a.encoding, this.secret = this.privateKey = this.key = g, this.payload = new t(a.payload), this.secret.once("close", (function() {
      !this.payload.writable && this.readable && this.sign();
    }).bind(this)), this.payload.once("close", (function() {
      !this.secret.writable && this.readable && this.sign();
    }).bind(this));
  }
  return l.inherits(h, s), h.prototype.sign = function() {
    try {
      var p = d({
        header: this.header,
        payload: this.payload.buffer,
        secret: this.secret.buffer,
        encoding: this.encoding
      });
      return this.emit("done", p), this.emit("data", p), this.emit("end"), this.readable = !1, p;
    } catch (g) {
      this.readable = !1, this.emit("error", g), this.emit("close");
    }
  }, h.sign = d, kr = h, kr;
}
var Fr, wi;
function Hc() {
  if (wi) return Fr;
  wi = 1;
  var e = Nt().Buffer, t = ga(), r = ya(), s = Re, o = Ea(), l = Re, f = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
  function E(b) {
    return Object.prototype.toString.call(b) === "[object Object]";
  }
  function d(b) {
    if (E(b))
      return b;
    try {
      return JSON.parse(b);
    } catch {
      return;
    }
  }
  function h(b) {
    var O = b.split(".", 1)[0];
    return d(e.from(O, "base64").toString("binary"));
  }
  function a(b) {
    return b.split(".", 2).join(".");
  }
  function p(b) {
    return b.split(".")[2];
  }
  function g(b, O) {
    O = O || "utf8";
    var R = b.split(".")[1];
    return e.from(R, "base64").toString(O);
  }
  function y(b) {
    return f.test(b) && !!h(b);
  }
  function _(b, O, R) {
    if (!O) {
      var N = new Error("Missing algorithm parameter for jws.verify");
      throw N.code = "MISSING_ALGORITHM", N;
    }
    b = o(b);
    var H = p(b), T = a(b), D = r(O);
    return D.verify(T, H, R);
  }
  function P(b, O) {
    if (O = O || {}, b = o(b), !y(b))
      return null;
    var R = h(b);
    if (!R)
      return null;
    var N = g(b);
    return (R.typ === "JWT" || O.json) && (N = JSON.parse(N, O.encoding)), {
      header: R,
      payload: N,
      signature: p(b)
    };
  }
  function j(b) {
    b = b || {};
    var O = b.secret || b.publicKey || b.key, R = new t(O);
    this.readable = !0, this.algorithm = b.algorithm, this.encoding = b.encoding, this.secret = this.publicKey = this.key = R, this.signature = new t(b.signature), this.secret.once("close", (function() {
      !this.signature.writable && this.readable && this.verify();
    }).bind(this)), this.signature.once("close", (function() {
      !this.secret.writable && this.readable && this.verify();
    }).bind(this));
  }
  return l.inherits(j, s), j.prototype.verify = function() {
    try {
      var O = _(this.signature.buffer, this.algorithm, this.key.buffer), R = P(this.signature.buffer, this.encoding);
      return this.emit("done", O, R), this.emit("data", O), this.emit("end"), this.readable = !1, O;
    } catch (N) {
      this.readable = !1, this.emit("error", N), this.emit("close");
    }
  }, j.decode = P, j.isValid = y, j.verify = _, Fr = j, Fr;
}
var bi;
function ps() {
  if (bi) return Ge;
  bi = 1;
  var e = Gc(), t = Hc(), r = [
    "HS256",
    "HS384",
    "HS512",
    "RS256",
    "RS384",
    "RS512",
    "PS256",
    "PS384",
    "PS512",
    "ES256",
    "ES384",
    "ES512"
  ];
  return Ge.ALGORITHMS = r, Ge.sign = e.sign, Ge.verify = t.verify, Ge.decode = t.decode, Ge.isValid = t.isValid, Ge.createSign = function(o) {
    return new e(o);
  }, Ge.createVerify = function(o) {
    return new t(o);
  }, Ge;
}
var Br, Si;
function va() {
  if (Si) return Br;
  Si = 1;
  var e = ps();
  return Br = function(t, r) {
    r = r || {};
    var s = e.decode(t, r);
    if (!s)
      return null;
    var o = s.payload;
    if (typeof o == "string")
      try {
        var l = JSON.parse(o);
        l !== null && typeof l == "object" && (o = l);
      } catch {
      }
    return r.complete === !0 ? {
      header: s.header,
      payload: o,
      signature: s.signature
    } : o;
  }, Br;
}
var Mr, _i;
function nr() {
  if (_i) return Mr;
  _i = 1;
  var e = function(t, r) {
    Error.call(this, t), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.name = "JsonWebTokenError", this.message = t, r && (this.inner = r);
  };
  return e.prototype = Object.create(Error.prototype), e.prototype.constructor = e, Mr = e, Mr;
}
var Ur, Ri;
function wa() {
  if (Ri) return Ur;
  Ri = 1;
  var e = nr(), t = function(r, s) {
    e.call(this, r), this.name = "NotBeforeError", this.date = s;
  };
  return t.prototype = Object.create(e.prototype), t.prototype.constructor = t, Ur = t, Ur;
}
var Vr, Ai;
function ba() {
  if (Ai) return Vr;
  Ai = 1;
  var e = nr(), t = function(r, s) {
    e.call(this, r), this.name = "TokenExpiredError", this.expiredAt = s;
  };
  return t.prototype = Object.create(e.prototype), t.prototype.constructor = t, Vr = t, Vr;
}
var Gr, Ti;
function Kc() {
  if (Ti) return Gr;
  Ti = 1;
  var e = 1e3, t = e * 60, r = t * 60, s = r * 24, o = s * 7, l = s * 365.25;
  Gr = function(a, p) {
    p = p || {};
    var g = typeof a;
    if (g === "string" && a.length > 0)
      return f(a);
    if (g === "number" && isFinite(a))
      return p.long ? d(a) : E(a);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(a)
    );
  };
  function f(a) {
    if (a = String(a), !(a.length > 100)) {
      var p = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        a
      );
      if (p) {
        var g = parseFloat(p[1]), y = (p[2] || "ms").toLowerCase();
        switch (y) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return g * l;
          case "weeks":
          case "week":
          case "w":
            return g * o;
          case "days":
          case "day":
          case "d":
            return g * s;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return g * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return g * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return g * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return g;
          default:
            return;
        }
      }
    }
  }
  function E(a) {
    var p = Math.abs(a);
    return p >= s ? Math.round(a / s) + "d" : p >= r ? Math.round(a / r) + "h" : p >= t ? Math.round(a / t) + "m" : p >= e ? Math.round(a / e) + "s" : a + "ms";
  }
  function d(a) {
    var p = Math.abs(a);
    return p >= s ? h(a, p, s, "day") : p >= r ? h(a, p, r, "hour") : p >= t ? h(a, p, t, "minute") : p >= e ? h(a, p, e, "second") : a + " ms";
  }
  function h(a, p, g, y) {
    var _ = p >= g * 1.5;
    return Math.round(a / g) + " " + y + (_ ? "s" : "");
  }
  return Gr;
}
var Hr, Oi;
function Sa() {
  if (Oi) return Hr;
  Oi = 1;
  var e = Kc();
  return Hr = function(t, r) {
    var s = r || Math.floor(Date.now() / 1e3);
    if (typeof t == "string") {
      var o = e(t);
      return typeof o > "u" ? void 0 : Math.floor(s + o / 1e3);
    } else return typeof t == "number" ? s + t : void 0;
  }, Hr;
}
var Kt = { exports: {} }, Kr, Ii;
function sr() {
  if (Ii) return Kr;
  Ii = 1;
  const e = "2.0.0", t = 256, r = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, s = 16, o = t - 6;
  return Kr = {
    MAX_LENGTH: t,
    MAX_SAFE_COMPONENT_LENGTH: s,
    MAX_SAFE_BUILD_LENGTH: o,
    MAX_SAFE_INTEGER: r,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: e,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, Kr;
}
var zr, Li;
function ir() {
  return Li || (Li = 1, zr = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...t) => console.error("SEMVER", ...t) : () => {
  }), zr;
}
var Pi;
function xt() {
  return Pi || (Pi = 1, (function(e, t) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: r,
      MAX_SAFE_BUILD_LENGTH: s,
      MAX_LENGTH: o
    } = sr(), l = ir();
    t = e.exports = {};
    const f = t.re = [], E = t.safeRe = [], d = t.src = [], h = t.safeSrc = [], a = t.t = {};
    let p = 0;
    const g = "[a-zA-Z0-9-]", y = [
      ["\\s", 1],
      ["\\d", o],
      [g, s]
    ], _ = (j) => {
      for (const [b, O] of y)
        j = j.split(`${b}*`).join(`${b}{0,${O}}`).split(`${b}+`).join(`${b}{1,${O}}`);
      return j;
    }, P = (j, b, O) => {
      const R = _(b), N = p++;
      l(j, N, b), a[j] = N, d[N] = b, h[N] = R, f[N] = new RegExp(b, O ? "g" : void 0), E[N] = new RegExp(R, O ? "g" : void 0);
    };
    P("NUMERICIDENTIFIER", "0|[1-9]\\d*"), P("NUMERICIDENTIFIERLOOSE", "\\d+"), P("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${g}*`), P("MAINVERSION", `(${d[a.NUMERICIDENTIFIER]})\\.(${d[a.NUMERICIDENTIFIER]})\\.(${d[a.NUMERICIDENTIFIER]})`), P("MAINVERSIONLOOSE", `(${d[a.NUMERICIDENTIFIERLOOSE]})\\.(${d[a.NUMERICIDENTIFIERLOOSE]})\\.(${d[a.NUMERICIDENTIFIERLOOSE]})`), P("PRERELEASEIDENTIFIER", `(?:${d[a.NONNUMERICIDENTIFIER]}|${d[a.NUMERICIDENTIFIER]})`), P("PRERELEASEIDENTIFIERLOOSE", `(?:${d[a.NONNUMERICIDENTIFIER]}|${d[a.NUMERICIDENTIFIERLOOSE]})`), P("PRERELEASE", `(?:-(${d[a.PRERELEASEIDENTIFIER]}(?:\\.${d[a.PRERELEASEIDENTIFIER]})*))`), P("PRERELEASELOOSE", `(?:-?(${d[a.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${d[a.PRERELEASEIDENTIFIERLOOSE]})*))`), P("BUILDIDENTIFIER", `${g}+`), P("BUILD", `(?:\\+(${d[a.BUILDIDENTIFIER]}(?:\\.${d[a.BUILDIDENTIFIER]})*))`), P("FULLPLAIN", `v?${d[a.MAINVERSION]}${d[a.PRERELEASE]}?${d[a.BUILD]}?`), P("FULL", `^${d[a.FULLPLAIN]}$`), P("LOOSEPLAIN", `[v=\\s]*${d[a.MAINVERSIONLOOSE]}${d[a.PRERELEASELOOSE]}?${d[a.BUILD]}?`), P("LOOSE", `^${d[a.LOOSEPLAIN]}$`), P("GTLT", "((?:<|>)?=?)"), P("XRANGEIDENTIFIERLOOSE", `${d[a.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), P("XRANGEIDENTIFIER", `${d[a.NUMERICIDENTIFIER]}|x|X|\\*`), P("XRANGEPLAIN", `[v=\\s]*(${d[a.XRANGEIDENTIFIER]})(?:\\.(${d[a.XRANGEIDENTIFIER]})(?:\\.(${d[a.XRANGEIDENTIFIER]})(?:${d[a.PRERELEASE]})?${d[a.BUILD]}?)?)?`), P("XRANGEPLAINLOOSE", `[v=\\s]*(${d[a.XRANGEIDENTIFIERLOOSE]})(?:\\.(${d[a.XRANGEIDENTIFIERLOOSE]})(?:\\.(${d[a.XRANGEIDENTIFIERLOOSE]})(?:${d[a.PRERELEASELOOSE]})?${d[a.BUILD]}?)?)?`), P("XRANGE", `^${d[a.GTLT]}\\s*${d[a.XRANGEPLAIN]}$`), P("XRANGELOOSE", `^${d[a.GTLT]}\\s*${d[a.XRANGEPLAINLOOSE]}$`), P("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), P("COERCE", `${d[a.COERCEPLAIN]}(?:$|[^\\d])`), P("COERCEFULL", d[a.COERCEPLAIN] + `(?:${d[a.PRERELEASE]})?(?:${d[a.BUILD]})?(?:$|[^\\d])`), P("COERCERTL", d[a.COERCE], !0), P("COERCERTLFULL", d[a.COERCEFULL], !0), P("LONETILDE", "(?:~>?)"), P("TILDETRIM", `(\\s*)${d[a.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", P("TILDE", `^${d[a.LONETILDE]}${d[a.XRANGEPLAIN]}$`), P("TILDELOOSE", `^${d[a.LONETILDE]}${d[a.XRANGEPLAINLOOSE]}$`), P("LONECARET", "(?:\\^)"), P("CARETTRIM", `(\\s*)${d[a.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", P("CARET", `^${d[a.LONECARET]}${d[a.XRANGEPLAIN]}$`), P("CARETLOOSE", `^${d[a.LONECARET]}${d[a.XRANGEPLAINLOOSE]}$`), P("COMPARATORLOOSE", `^${d[a.GTLT]}\\s*(${d[a.LOOSEPLAIN]})$|^$`), P("COMPARATOR", `^${d[a.GTLT]}\\s*(${d[a.FULLPLAIN]})$|^$`), P("COMPARATORTRIM", `(\\s*)${d[a.GTLT]}\\s*(${d[a.LOOSEPLAIN]}|${d[a.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", P("HYPHENRANGE", `^\\s*(${d[a.XRANGEPLAIN]})\\s+-\\s+(${d[a.XRANGEPLAIN]})\\s*$`), P("HYPHENRANGELOOSE", `^\\s*(${d[a.XRANGEPLAINLOOSE]})\\s+-\\s+(${d[a.XRANGEPLAINLOOSE]})\\s*$`), P("STAR", "(<|>)?=?\\s*\\*"), P("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), P("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(Kt, Kt.exports)), Kt.exports;
}
var Wr, $i;
function ms() {
  if ($i) return Wr;
  $i = 1;
  const e = Object.freeze({ loose: !0 }), t = Object.freeze({});
  return Wr = (s) => s ? typeof s != "object" ? e : s : t, Wr;
}
var Jr, Ni;
function _a() {
  if (Ni) return Jr;
  Ni = 1;
  const e = /^[0-9]+$/, t = (s, o) => {
    const l = e.test(s), f = e.test(o);
    return l && f && (s = +s, o = +o), s === o ? 0 : l && !f ? -1 : f && !l ? 1 : s < o ? -1 : 1;
  };
  return Jr = {
    compareIdentifiers: t,
    rcompareIdentifiers: (s, o) => t(o, s)
  }, Jr;
}
var Xr, xi;
function Ae() {
  if (xi) return Xr;
  xi = 1;
  const e = ir(), { MAX_LENGTH: t, MAX_SAFE_INTEGER: r } = sr(), { safeRe: s, t: o } = xt(), l = ms(), { compareIdentifiers: f } = _a();
  class E {
    constructor(h, a) {
      if (a = l(a), h instanceof E) {
        if (h.loose === !!a.loose && h.includePrerelease === !!a.includePrerelease)
          return h;
        h = h.version;
      } else if (typeof h != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof h}".`);
      if (h.length > t)
        throw new TypeError(
          `version is longer than ${t} characters`
        );
      e("SemVer", h, a), this.options = a, this.loose = !!a.loose, this.includePrerelease = !!a.includePrerelease;
      const p = h.trim().match(a.loose ? s[o.LOOSE] : s[o.FULL]);
      if (!p)
        throw new TypeError(`Invalid Version: ${h}`);
      if (this.raw = h, this.major = +p[1], this.minor = +p[2], this.patch = +p[3], this.major > r || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > r || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > r || this.patch < 0)
        throw new TypeError("Invalid patch version");
      p[4] ? this.prerelease = p[4].split(".").map((g) => {
        if (/^[0-9]+$/.test(g)) {
          const y = +g;
          if (y >= 0 && y < r)
            return y;
        }
        return g;
      }) : this.prerelease = [], this.build = p[5] ? p[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(h) {
      if (e("SemVer.compare", this.version, this.options, h), !(h instanceof E)) {
        if (typeof h == "string" && h === this.version)
          return 0;
        h = new E(h, this.options);
      }
      return h.version === this.version ? 0 : this.compareMain(h) || this.comparePre(h);
    }
    compareMain(h) {
      return h instanceof E || (h = new E(h, this.options)), f(this.major, h.major) || f(this.minor, h.minor) || f(this.patch, h.patch);
    }
    comparePre(h) {
      if (h instanceof E || (h = new E(h, this.options)), this.prerelease.length && !h.prerelease.length)
        return -1;
      if (!this.prerelease.length && h.prerelease.length)
        return 1;
      if (!this.prerelease.length && !h.prerelease.length)
        return 0;
      let a = 0;
      do {
        const p = this.prerelease[a], g = h.prerelease[a];
        if (e("prerelease compare", a, p, g), p === void 0 && g === void 0)
          return 0;
        if (g === void 0)
          return 1;
        if (p === void 0)
          return -1;
        if (p === g)
          continue;
        return f(p, g);
      } while (++a);
    }
    compareBuild(h) {
      h instanceof E || (h = new E(h, this.options));
      let a = 0;
      do {
        const p = this.build[a], g = h.build[a];
        if (e("build compare", a, p, g), p === void 0 && g === void 0)
          return 0;
        if (g === void 0)
          return 1;
        if (p === void 0)
          return -1;
        if (p === g)
          continue;
        return f(p, g);
      } while (++a);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(h, a, p) {
      if (h.startsWith("pre")) {
        if (!a && p === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (a) {
          const g = `-${a}`.match(this.options.loose ? s[o.PRERELEASELOOSE] : s[o.PRERELEASE]);
          if (!g || g[1] !== a)
            throw new Error(`invalid identifier: ${a}`);
        }
      }
      switch (h) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", a, p);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", a, p);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", a, p), this.inc("pre", a, p);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", a, p), this.inc("pre", a, p);
          break;
        case "release":
          if (this.prerelease.length === 0)
            throw new Error(`version ${this.raw} is not a prerelease`);
          this.prerelease.length = 0;
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const g = Number(p) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [g];
          else {
            let y = this.prerelease.length;
            for (; --y >= 0; )
              typeof this.prerelease[y] == "number" && (this.prerelease[y]++, y = -2);
            if (y === -1) {
              if (a === this.prerelease.join(".") && p === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(g);
            }
          }
          if (a) {
            let y = [a, g];
            p === !1 && (y = [a]), f(this.prerelease[0], a) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = y) : this.prerelease = y;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${h}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return Xr = E, Xr;
}
var Yr, Ci;
function wt() {
  if (Ci) return Yr;
  Ci = 1;
  const e = Ae();
  return Yr = (r, s, o = !1) => {
    if (r instanceof e)
      return r;
    try {
      return new e(r, s);
    } catch (l) {
      if (!o)
        return null;
      throw l;
    }
  }, Yr;
}
var Zr, ji;
function zc() {
  if (ji) return Zr;
  ji = 1;
  const e = wt();
  return Zr = (r, s) => {
    const o = e(r, s);
    return o ? o.version : null;
  }, Zr;
}
var Qr, qi;
function Wc() {
  if (qi) return Qr;
  qi = 1;
  const e = wt();
  return Qr = (r, s) => {
    const o = e(r.trim().replace(/^[=v]+/, ""), s);
    return o ? o.version : null;
  }, Qr;
}
var en, Di;
function Jc() {
  if (Di) return en;
  Di = 1;
  const e = Ae();
  return en = (r, s, o, l, f) => {
    typeof o == "string" && (f = l, l = o, o = void 0);
    try {
      return new e(
        r instanceof e ? r.version : r,
        o
      ).inc(s, l, f).version;
    } catch {
      return null;
    }
  }, en;
}
var tn, ki;
function Xc() {
  if (ki) return tn;
  ki = 1;
  const e = wt();
  return tn = (r, s) => {
    const o = e(r, null, !0), l = e(s, null, !0), f = o.compare(l);
    if (f === 0)
      return null;
    const E = f > 0, d = E ? o : l, h = E ? l : o, a = !!d.prerelease.length;
    if (!!h.prerelease.length && !a) {
      if (!h.patch && !h.minor)
        return "major";
      if (h.compareMain(d) === 0)
        return h.minor && !h.patch ? "minor" : "patch";
    }
    const g = a ? "pre" : "";
    return o.major !== l.major ? g + "major" : o.minor !== l.minor ? g + "minor" : o.patch !== l.patch ? g + "patch" : "prerelease";
  }, tn;
}
var rn, Fi;
function Yc() {
  if (Fi) return rn;
  Fi = 1;
  const e = Ae();
  return rn = (r, s) => new e(r, s).major, rn;
}
var nn, Bi;
function Zc() {
  if (Bi) return nn;
  Bi = 1;
  const e = Ae();
  return nn = (r, s) => new e(r, s).minor, nn;
}
var sn, Mi;
function Qc() {
  if (Mi) return sn;
  Mi = 1;
  const e = Ae();
  return sn = (r, s) => new e(r, s).patch, sn;
}
var on, Ui;
function ef() {
  if (Ui) return on;
  Ui = 1;
  const e = wt();
  return on = (r, s) => {
    const o = e(r, s);
    return o && o.prerelease.length ? o.prerelease : null;
  }, on;
}
var an, Vi;
function je() {
  if (Vi) return an;
  Vi = 1;
  const e = Ae();
  return an = (r, s, o) => new e(r, o).compare(new e(s, o)), an;
}
var un, Gi;
function tf() {
  if (Gi) return un;
  Gi = 1;
  const e = je();
  return un = (r, s, o) => e(s, r, o), un;
}
var cn, Hi;
function rf() {
  if (Hi) return cn;
  Hi = 1;
  const e = je();
  return cn = (r, s) => e(r, s, !0), cn;
}
var fn, Ki;
function gs() {
  if (Ki) return fn;
  Ki = 1;
  const e = Ae();
  return fn = (r, s, o) => {
    const l = new e(r, o), f = new e(s, o);
    return l.compare(f) || l.compareBuild(f);
  }, fn;
}
var ln, zi;
function nf() {
  if (zi) return ln;
  zi = 1;
  const e = gs();
  return ln = (r, s) => r.sort((o, l) => e(o, l, s)), ln;
}
var dn, Wi;
function sf() {
  if (Wi) return dn;
  Wi = 1;
  const e = gs();
  return dn = (r, s) => r.sort((o, l) => e(l, o, s)), dn;
}
var hn, Ji;
function or() {
  if (Ji) return hn;
  Ji = 1;
  const e = je();
  return hn = (r, s, o) => e(r, s, o) > 0, hn;
}
var pn, Xi;
function ys() {
  if (Xi) return pn;
  Xi = 1;
  const e = je();
  return pn = (r, s, o) => e(r, s, o) < 0, pn;
}
var mn, Yi;
function Ra() {
  if (Yi) return mn;
  Yi = 1;
  const e = je();
  return mn = (r, s, o) => e(r, s, o) === 0, mn;
}
var gn, Zi;
function Aa() {
  if (Zi) return gn;
  Zi = 1;
  const e = je();
  return gn = (r, s, o) => e(r, s, o) !== 0, gn;
}
var yn, Qi;
function Es() {
  if (Qi) return yn;
  Qi = 1;
  const e = je();
  return yn = (r, s, o) => e(r, s, o) >= 0, yn;
}
var En, eo;
function vs() {
  if (eo) return En;
  eo = 1;
  const e = je();
  return En = (r, s, o) => e(r, s, o) <= 0, En;
}
var vn, to;
function Ta() {
  if (to) return vn;
  to = 1;
  const e = Ra(), t = Aa(), r = or(), s = Es(), o = ys(), l = vs();
  return vn = (E, d, h, a) => {
    switch (d) {
      case "===":
        return typeof E == "object" && (E = E.version), typeof h == "object" && (h = h.version), E === h;
      case "!==":
        return typeof E == "object" && (E = E.version), typeof h == "object" && (h = h.version), E !== h;
      case "":
      case "=":
      case "==":
        return e(E, h, a);
      case "!=":
        return t(E, h, a);
      case ">":
        return r(E, h, a);
      case ">=":
        return s(E, h, a);
      case "<":
        return o(E, h, a);
      case "<=":
        return l(E, h, a);
      default:
        throw new TypeError(`Invalid operator: ${d}`);
    }
  }, vn;
}
var wn, ro;
function of() {
  if (ro) return wn;
  ro = 1;
  const e = Ae(), t = wt(), { safeRe: r, t: s } = xt();
  return wn = (l, f) => {
    if (l instanceof e)
      return l;
    if (typeof l == "number" && (l = String(l)), typeof l != "string")
      return null;
    f = f || {};
    let E = null;
    if (!f.rtl)
      E = l.match(f.includePrerelease ? r[s.COERCEFULL] : r[s.COERCE]);
    else {
      const y = f.includePrerelease ? r[s.COERCERTLFULL] : r[s.COERCERTL];
      let _;
      for (; (_ = y.exec(l)) && (!E || E.index + E[0].length !== l.length); )
        (!E || _.index + _[0].length !== E.index + E[0].length) && (E = _), y.lastIndex = _.index + _[1].length + _[2].length;
      y.lastIndex = -1;
    }
    if (E === null)
      return null;
    const d = E[2], h = E[3] || "0", a = E[4] || "0", p = f.includePrerelease && E[5] ? `-${E[5]}` : "", g = f.includePrerelease && E[6] ? `+${E[6]}` : "";
    return t(`${d}.${h}.${a}${p}${g}`, f);
  }, wn;
}
var bn, no;
function af() {
  if (no) return bn;
  no = 1;
  class e {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(r) {
      const s = this.map.get(r);
      if (s !== void 0)
        return this.map.delete(r), this.map.set(r, s), s;
    }
    delete(r) {
      return this.map.delete(r);
    }
    set(r, s) {
      if (!this.delete(r) && s !== void 0) {
        if (this.map.size >= this.max) {
          const l = this.map.keys().next().value;
          this.delete(l);
        }
        this.map.set(r, s);
      }
      return this;
    }
  }
  return bn = e, bn;
}
var Sn, so;
function qe() {
  if (so) return Sn;
  so = 1;
  const e = /\s+/g;
  class t {
    constructor(S, C) {
      if (C = o(C), S instanceof t)
        return S.loose === !!C.loose && S.includePrerelease === !!C.includePrerelease ? S : new t(S.raw, C);
      if (S instanceof l)
        return this.raw = S.value, this.set = [[S]], this.formatted = void 0, this;
      if (this.options = C, this.loose = !!C.loose, this.includePrerelease = !!C.includePrerelease, this.raw = S.trim().replace(e, " "), this.set = this.raw.split("||").map((k) => this.parseRange(k.trim())).filter((k) => k.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const k = this.set[0];
        if (this.set = this.set.filter((F) => !P(F[0])), this.set.length === 0)
          this.set = [k];
        else if (this.set.length > 1) {
          for (const F of this.set)
            if (F.length === 1 && j(F[0])) {
              this.set = [F];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let S = 0; S < this.set.length; S++) {
          S > 0 && (this.formatted += "||");
          const C = this.set[S];
          for (let k = 0; k < C.length; k++)
            k > 0 && (this.formatted += " "), this.formatted += C[k].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(S) {
      const k = ((this.options.includePrerelease && y) | (this.options.loose && _)) + ":" + S, F = s.get(k);
      if (F)
        return F;
      const U = this.options.loose, J = U ? d[h.HYPHENRANGELOOSE] : d[h.HYPHENRANGE];
      S = S.replace(J, re(this.options.includePrerelease)), f("hyphen replace", S), S = S.replace(d[h.COMPARATORTRIM], a), f("comparator trim", S), S = S.replace(d[h.TILDETRIM], p), f("tilde trim", S), S = S.replace(d[h.CARETTRIM], g), f("caret trim", S);
      let se = S.split(" ").map((ce) => O(ce, this.options)).join(" ").split(/\s+/).map((ce) => G(ce, this.options));
      U && (se = se.filter((ce) => (f("loose invalid filter", ce, this.options), !!ce.match(d[h.COMPARATORLOOSE])))), f("range list", se);
      const ee = /* @__PURE__ */ new Map(), ie = se.map((ce) => new l(ce, this.options));
      for (const ce of ie) {
        if (P(ce))
          return [ce];
        ee.set(ce.value, ce);
      }
      ee.size > 1 && ee.has("") && ee.delete("");
      const fe = [...ee.values()];
      return s.set(k, fe), fe;
    }
    intersects(S, C) {
      if (!(S instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((k) => b(k, C) && S.set.some((F) => b(F, C) && k.every((U) => F.every((J) => U.intersects(J, C)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(S) {
      if (!S)
        return !1;
      if (typeof S == "string")
        try {
          S = new E(S, this.options);
        } catch {
          return !1;
        }
      for (let C = 0; C < this.set.length; C++)
        if (x(this.set[C], S, this.options))
          return !0;
      return !1;
    }
  }
  Sn = t;
  const r = af(), s = new r(), o = ms(), l = ar(), f = ir(), E = Ae(), {
    safeRe: d,
    t: h,
    comparatorTrimReplace: a,
    tildeTrimReplace: p,
    caretTrimReplace: g
  } = xt(), { FLAG_INCLUDE_PRERELEASE: y, FLAG_LOOSE: _ } = sr(), P = (A) => A.value === "<0.0.0-0", j = (A) => A.value === "", b = (A, S) => {
    let C = !0;
    const k = A.slice();
    let F = k.pop();
    for (; C && k.length; )
      C = k.every((U) => F.intersects(U, S)), F = k.pop();
    return C;
  }, O = (A, S) => (f("comp", A, S), A = T(A, S), f("caret", A), A = N(A, S), f("tildes", A), A = $(A, S), f("xrange", A), A = K(A, S), f("stars", A), A), R = (A) => !A || A.toLowerCase() === "x" || A === "*", N = (A, S) => A.trim().split(/\s+/).map((C) => H(C, S)).join(" "), H = (A, S) => {
    const C = S.loose ? d[h.TILDELOOSE] : d[h.TILDE];
    return A.replace(C, (k, F, U, J, se) => {
      f("tilde", A, k, F, U, J, se);
      let ee;
      return R(F) ? ee = "" : R(U) ? ee = `>=${F}.0.0 <${+F + 1}.0.0-0` : R(J) ? ee = `>=${F}.${U}.0 <${F}.${+U + 1}.0-0` : se ? (f("replaceTilde pr", se), ee = `>=${F}.${U}.${J}-${se} <${F}.${+U + 1}.0-0`) : ee = `>=${F}.${U}.${J} <${F}.${+U + 1}.0-0`, f("tilde return", ee), ee;
    });
  }, T = (A, S) => A.trim().split(/\s+/).map((C) => D(C, S)).join(" "), D = (A, S) => {
    f("caret", A, S);
    const C = S.loose ? d[h.CARETLOOSE] : d[h.CARET], k = S.includePrerelease ? "-0" : "";
    return A.replace(C, (F, U, J, se, ee) => {
      f("caret", A, F, U, J, se, ee);
      let ie;
      return R(U) ? ie = "" : R(J) ? ie = `>=${U}.0.0${k} <${+U + 1}.0.0-0` : R(se) ? U === "0" ? ie = `>=${U}.${J}.0${k} <${U}.${+J + 1}.0-0` : ie = `>=${U}.${J}.0${k} <${+U + 1}.0.0-0` : ee ? (f("replaceCaret pr", ee), U === "0" ? J === "0" ? ie = `>=${U}.${J}.${se}-${ee} <${U}.${J}.${+se + 1}-0` : ie = `>=${U}.${J}.${se}-${ee} <${U}.${+J + 1}.0-0` : ie = `>=${U}.${J}.${se}-${ee} <${+U + 1}.0.0-0`) : (f("no pr"), U === "0" ? J === "0" ? ie = `>=${U}.${J}.${se}${k} <${U}.${J}.${+se + 1}-0` : ie = `>=${U}.${J}.${se}${k} <${U}.${+J + 1}.0-0` : ie = `>=${U}.${J}.${se} <${+U + 1}.0.0-0`), f("caret return", ie), ie;
    });
  }, $ = (A, S) => (f("replaceXRanges", A, S), A.split(/\s+/).map((C) => V(C, S)).join(" ")), V = (A, S) => {
    A = A.trim();
    const C = S.loose ? d[h.XRANGELOOSE] : d[h.XRANGE];
    return A.replace(C, (k, F, U, J, se, ee) => {
      f("xRange", A, k, F, U, J, se, ee);
      const ie = R(U), fe = ie || R(J), ce = fe || R(se), Me = ce;
      return F === "=" && Me && (F = ""), ee = S.includePrerelease ? "-0" : "", ie ? F === ">" || F === "<" ? k = "<0.0.0-0" : k = "*" : F && Me ? (fe && (J = 0), se = 0, F === ">" ? (F = ">=", fe ? (U = +U + 1, J = 0, se = 0) : (J = +J + 1, se = 0)) : F === "<=" && (F = "<", fe ? U = +U + 1 : J = +J + 1), F === "<" && (ee = "-0"), k = `${F + U}.${J}.${se}${ee}`) : fe ? k = `>=${U}.0.0${ee} <${+U + 1}.0.0-0` : ce && (k = `>=${U}.${J}.0${ee} <${U}.${+J + 1}.0-0`), f("xRange return", k), k;
    });
  }, K = (A, S) => (f("replaceStars", A, S), A.trim().replace(d[h.STAR], "")), G = (A, S) => (f("replaceGTE0", A, S), A.trim().replace(d[S.includePrerelease ? h.GTE0PRE : h.GTE0], "")), re = (A) => (S, C, k, F, U, J, se, ee, ie, fe, ce, Me) => (R(k) ? C = "" : R(F) ? C = `>=${k}.0.0${A ? "-0" : ""}` : R(U) ? C = `>=${k}.${F}.0${A ? "-0" : ""}` : J ? C = `>=${C}` : C = `>=${C}${A ? "-0" : ""}`, R(ie) ? ee = "" : R(fe) ? ee = `<${+ie + 1}.0.0-0` : R(ce) ? ee = `<${ie}.${+fe + 1}.0-0` : Me ? ee = `<=${ie}.${fe}.${ce}-${Me}` : A ? ee = `<${ie}.${fe}.${+ce + 1}-0` : ee = `<=${ee}`, `${C} ${ee}`.trim()), x = (A, S, C) => {
    for (let k = 0; k < A.length; k++)
      if (!A[k].test(S))
        return !1;
    if (S.prerelease.length && !C.includePrerelease) {
      for (let k = 0; k < A.length; k++)
        if (f(A[k].semver), A[k].semver !== l.ANY && A[k].semver.prerelease.length > 0) {
          const F = A[k].semver;
          if (F.major === S.major && F.minor === S.minor && F.patch === S.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Sn;
}
var _n, io;
function ar() {
  if (io) return _n;
  io = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(a, p) {
      if (p = r(p), a instanceof t) {
        if (a.loose === !!p.loose)
          return a;
        a = a.value;
      }
      a = a.trim().split(/\s+/).join(" "), f("comparator", a, p), this.options = p, this.loose = !!p.loose, this.parse(a), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, f("comp", this);
    }
    parse(a) {
      const p = this.options.loose ? s[o.COMPARATORLOOSE] : s[o.COMPARATOR], g = a.match(p);
      if (!g)
        throw new TypeError(`Invalid comparator: ${a}`);
      this.operator = g[1] !== void 0 ? g[1] : "", this.operator === "=" && (this.operator = ""), g[2] ? this.semver = new E(g[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(a) {
      if (f("Comparator.test", a, this.options.loose), this.semver === e || a === e)
        return !0;
      if (typeof a == "string")
        try {
          a = new E(a, this.options);
        } catch {
          return !1;
        }
      return l(a, this.operator, this.semver, this.options);
    }
    intersects(a, p) {
      if (!(a instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new d(a.value, p).test(this.value) : a.operator === "" ? a.value === "" ? !0 : new d(this.value, p).test(a.semver) : (p = r(p), p.includePrerelease && (this.value === "<0.0.0-0" || a.value === "<0.0.0-0") || !p.includePrerelease && (this.value.startsWith("<0.0.0") || a.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && a.operator.startsWith(">") || this.operator.startsWith("<") && a.operator.startsWith("<") || this.semver.version === a.semver.version && this.operator.includes("=") && a.operator.includes("=") || l(this.semver, "<", a.semver, p) && this.operator.startsWith(">") && a.operator.startsWith("<") || l(this.semver, ">", a.semver, p) && this.operator.startsWith("<") && a.operator.startsWith(">")));
    }
  }
  _n = t;
  const r = ms(), { safeRe: s, t: o } = xt(), l = Ta(), f = ir(), E = Ae(), d = qe();
  return _n;
}
var Rn, oo;
function ur() {
  if (oo) return Rn;
  oo = 1;
  const e = qe();
  return Rn = (r, s, o) => {
    try {
      s = new e(s, o);
    } catch {
      return !1;
    }
    return s.test(r);
  }, Rn;
}
var An, ao;
function uf() {
  if (ao) return An;
  ao = 1;
  const e = qe();
  return An = (r, s) => new e(r, s).set.map((o) => o.map((l) => l.value).join(" ").trim().split(" ")), An;
}
var Tn, uo;
function cf() {
  if (uo) return Tn;
  uo = 1;
  const e = Ae(), t = qe();
  return Tn = (s, o, l) => {
    let f = null, E = null, d = null;
    try {
      d = new t(o, l);
    } catch {
      return null;
    }
    return s.forEach((h) => {
      d.test(h) && (!f || E.compare(h) === -1) && (f = h, E = new e(f, l));
    }), f;
  }, Tn;
}
var On, co;
function ff() {
  if (co) return On;
  co = 1;
  const e = Ae(), t = qe();
  return On = (s, o, l) => {
    let f = null, E = null, d = null;
    try {
      d = new t(o, l);
    } catch {
      return null;
    }
    return s.forEach((h) => {
      d.test(h) && (!f || E.compare(h) === 1) && (f = h, E = new e(f, l));
    }), f;
  }, On;
}
var In, fo;
function lf() {
  if (fo) return In;
  fo = 1;
  const e = Ae(), t = qe(), r = or();
  return In = (o, l) => {
    o = new t(o, l);
    let f = new e("0.0.0");
    if (o.test(f) || (f = new e("0.0.0-0"), o.test(f)))
      return f;
    f = null;
    for (let E = 0; E < o.set.length; ++E) {
      const d = o.set[E];
      let h = null;
      d.forEach((a) => {
        const p = new e(a.semver.version);
        switch (a.operator) {
          case ">":
            p.prerelease.length === 0 ? p.patch++ : p.prerelease.push(0), p.raw = p.format();
          /* fallthrough */
          case "":
          case ">=":
            (!h || r(p, h)) && (h = p);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${a.operator}`);
        }
      }), h && (!f || r(f, h)) && (f = h);
    }
    return f && o.test(f) ? f : null;
  }, In;
}
var Ln, lo;
function df() {
  if (lo) return Ln;
  lo = 1;
  const e = qe();
  return Ln = (r, s) => {
    try {
      return new e(r, s).range || "*";
    } catch {
      return null;
    }
  }, Ln;
}
var Pn, ho;
function ws() {
  if (ho) return Pn;
  ho = 1;
  const e = Ae(), t = ar(), { ANY: r } = t, s = qe(), o = ur(), l = or(), f = ys(), E = vs(), d = Es();
  return Pn = (a, p, g, y) => {
    a = new e(a, y), p = new s(p, y);
    let _, P, j, b, O;
    switch (g) {
      case ">":
        _ = l, P = E, j = f, b = ">", O = ">=";
        break;
      case "<":
        _ = f, P = d, j = l, b = "<", O = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (o(a, p, y))
      return !1;
    for (let R = 0; R < p.set.length; ++R) {
      const N = p.set[R];
      let H = null, T = null;
      if (N.forEach((D) => {
        D.semver === r && (D = new t(">=0.0.0")), H = H || D, T = T || D, _(D.semver, H.semver, y) ? H = D : j(D.semver, T.semver, y) && (T = D);
      }), H.operator === b || H.operator === O || (!T.operator || T.operator === b) && P(a, T.semver))
        return !1;
      if (T.operator === O && j(a, T.semver))
        return !1;
    }
    return !0;
  }, Pn;
}
var $n, po;
function hf() {
  if (po) return $n;
  po = 1;
  const e = ws();
  return $n = (r, s, o) => e(r, s, ">", o), $n;
}
var Nn, mo;
function pf() {
  if (mo) return Nn;
  mo = 1;
  const e = ws();
  return Nn = (r, s, o) => e(r, s, "<", o), Nn;
}
var xn, go;
function mf() {
  if (go) return xn;
  go = 1;
  const e = qe();
  return xn = (r, s, o) => (r = new e(r, o), s = new e(s, o), r.intersects(s, o)), xn;
}
var Cn, yo;
function gf() {
  if (yo) return Cn;
  yo = 1;
  const e = ur(), t = je();
  return Cn = (r, s, o) => {
    const l = [];
    let f = null, E = null;
    const d = r.sort((g, y) => t(g, y, o));
    for (const g of d)
      e(g, s, o) ? (E = g, f || (f = g)) : (E && l.push([f, E]), E = null, f = null);
    f && l.push([f, null]);
    const h = [];
    for (const [g, y] of l)
      g === y ? h.push(g) : !y && g === d[0] ? h.push("*") : y ? g === d[0] ? h.push(`<=${y}`) : h.push(`${g} - ${y}`) : h.push(`>=${g}`);
    const a = h.join(" || "), p = typeof s.raw == "string" ? s.raw : String(s);
    return a.length < p.length ? a : s;
  }, Cn;
}
var jn, Eo;
function yf() {
  if (Eo) return jn;
  Eo = 1;
  const e = qe(), t = ar(), { ANY: r } = t, s = ur(), o = je(), l = (p, g, y = {}) => {
    if (p === g)
      return !0;
    p = new e(p, y), g = new e(g, y);
    let _ = !1;
    e: for (const P of p.set) {
      for (const j of g.set) {
        const b = d(P, j, y);
        if (_ = _ || b !== null, b)
          continue e;
      }
      if (_)
        return !1;
    }
    return !0;
  }, f = [new t(">=0.0.0-0")], E = [new t(">=0.0.0")], d = (p, g, y) => {
    if (p === g)
      return !0;
    if (p.length === 1 && p[0].semver === r) {
      if (g.length === 1 && g[0].semver === r)
        return !0;
      y.includePrerelease ? p = f : p = E;
    }
    if (g.length === 1 && g[0].semver === r) {
      if (y.includePrerelease)
        return !0;
      g = E;
    }
    const _ = /* @__PURE__ */ new Set();
    let P, j;
    for (const $ of p)
      $.operator === ">" || $.operator === ">=" ? P = h(P, $, y) : $.operator === "<" || $.operator === "<=" ? j = a(j, $, y) : _.add($.semver);
    if (_.size > 1)
      return null;
    let b;
    if (P && j) {
      if (b = o(P.semver, j.semver, y), b > 0)
        return null;
      if (b === 0 && (P.operator !== ">=" || j.operator !== "<="))
        return null;
    }
    for (const $ of _) {
      if (P && !s($, String(P), y) || j && !s($, String(j), y))
        return null;
      for (const V of g)
        if (!s($, String(V), y))
          return !1;
      return !0;
    }
    let O, R, N, H, T = j && !y.includePrerelease && j.semver.prerelease.length ? j.semver : !1, D = P && !y.includePrerelease && P.semver.prerelease.length ? P.semver : !1;
    T && T.prerelease.length === 1 && j.operator === "<" && T.prerelease[0] === 0 && (T = !1);
    for (const $ of g) {
      if (H = H || $.operator === ">" || $.operator === ">=", N = N || $.operator === "<" || $.operator === "<=", P) {
        if (D && $.semver.prerelease && $.semver.prerelease.length && $.semver.major === D.major && $.semver.minor === D.minor && $.semver.patch === D.patch && (D = !1), $.operator === ">" || $.operator === ">=") {
          if (O = h(P, $, y), O === $ && O !== P)
            return !1;
        } else if (P.operator === ">=" && !s(P.semver, String($), y))
          return !1;
      }
      if (j) {
        if (T && $.semver.prerelease && $.semver.prerelease.length && $.semver.major === T.major && $.semver.minor === T.minor && $.semver.patch === T.patch && (T = !1), $.operator === "<" || $.operator === "<=") {
          if (R = a(j, $, y), R === $ && R !== j)
            return !1;
        } else if (j.operator === "<=" && !s(j.semver, String($), y))
          return !1;
      }
      if (!$.operator && (j || P) && b !== 0)
        return !1;
    }
    return !(P && N && !j && b !== 0 || j && H && !P && b !== 0 || D || T);
  }, h = (p, g, y) => {
    if (!p)
      return g;
    const _ = o(p.semver, g.semver, y);
    return _ > 0 ? p : _ < 0 || g.operator === ">" && p.operator === ">=" ? g : p;
  }, a = (p, g, y) => {
    if (!p)
      return g;
    const _ = o(p.semver, g.semver, y);
    return _ < 0 ? p : _ > 0 || g.operator === "<" && p.operator === "<=" ? g : p;
  };
  return jn = l, jn;
}
var qn, vo;
function bs() {
  if (vo) return qn;
  vo = 1;
  const e = xt(), t = sr(), r = Ae(), s = _a(), o = wt(), l = zc(), f = Wc(), E = Jc(), d = Xc(), h = Yc(), a = Zc(), p = Qc(), g = ef(), y = je(), _ = tf(), P = rf(), j = gs(), b = nf(), O = sf(), R = or(), N = ys(), H = Ra(), T = Aa(), D = Es(), $ = vs(), V = Ta(), K = of(), G = ar(), re = qe(), x = ur(), A = uf(), S = cf(), C = ff(), k = lf(), F = df(), U = ws(), J = hf(), se = pf(), ee = mf(), ie = gf(), fe = yf();
  return qn = {
    parse: o,
    valid: l,
    clean: f,
    inc: E,
    diff: d,
    major: h,
    minor: a,
    patch: p,
    prerelease: g,
    compare: y,
    rcompare: _,
    compareLoose: P,
    compareBuild: j,
    sort: b,
    rsort: O,
    gt: R,
    lt: N,
    eq: H,
    neq: T,
    gte: D,
    lte: $,
    cmp: V,
    coerce: K,
    Comparator: G,
    Range: re,
    satisfies: x,
    toComparators: A,
    maxSatisfying: S,
    minSatisfying: C,
    minVersion: k,
    validRange: F,
    outside: U,
    gtr: J,
    ltr: se,
    intersects: ee,
    simplifyRange: ie,
    subset: fe,
    SemVer: r,
    re: e.re,
    src: e.src,
    tokens: e.t,
    SEMVER_SPEC_VERSION: t.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: t.RELEASE_TYPES,
    compareIdentifiers: s.compareIdentifiers,
    rcompareIdentifiers: s.rcompareIdentifiers
  }, qn;
}
var Dn, wo;
function Ef() {
  return wo || (wo = 1, Dn = bs().satisfies(process.version, ">=15.7.0")), Dn;
}
var kn, bo;
function vf() {
  return bo || (bo = 1, kn = bs().satisfies(process.version, ">=16.9.0")), kn;
}
var Fn, So;
function Oa() {
  if (So) return Fn;
  So = 1;
  const e = Ef(), t = vf(), r = {
    ec: ["ES256", "ES384", "ES512"],
    rsa: ["RS256", "PS256", "RS384", "PS384", "RS512", "PS512"],
    "rsa-pss": ["PS256", "PS384", "PS512"]
  }, s = {
    ES256: "prime256v1",
    ES384: "secp384r1",
    ES512: "secp521r1"
  };
  return Fn = function(o, l) {
    if (!o || !l) return;
    const f = l.asymmetricKeyType;
    if (!f) return;
    const E = r[f];
    if (!E)
      throw new Error(`Unknown key type "${f}".`);
    if (!E.includes(o))
      throw new Error(`"alg" parameter for "${f}" key type must be one of: ${E.join(", ")}.`);
    if (e)
      switch (f) {
        case "ec":
          const d = l.asymmetricKeyDetails.namedCurve, h = s[o];
          if (d !== h)
            throw new Error(`"alg" parameter "${o}" requires curve "${h}".`);
          break;
        case "rsa-pss":
          if (t) {
            const a = parseInt(o.slice(-3), 10), { hashAlgorithm: p, mgf1HashAlgorithm: g, saltLength: y } = l.asymmetricKeyDetails;
            if (p !== `sha${a}` || g !== p)
              throw new Error(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${o}.`);
            if (y !== void 0 && y > a >> 3)
              throw new Error(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${o}.`);
          }
          break;
      }
  }, Fn;
}
var Bn, _o;
function Ia() {
  if (_o) return Bn;
  _o = 1;
  var e = bs();
  return Bn = e.satisfies(process.version, "^6.12.0 || >=8.0.0"), Bn;
}
var Mn, Ro;
function wf() {
  if (Ro) return Mn;
  Ro = 1;
  const e = nr(), t = wa(), r = ba(), s = va(), o = Sa(), l = Oa(), f = Ia(), E = ps(), { KeyObject: d, createSecretKey: h, createPublicKey: a } = Re, p = ["RS256", "RS384", "RS512"], g = ["ES256", "ES384", "ES512"], y = ["RS256", "RS384", "RS512"], _ = ["HS256", "HS384", "HS512"];
  return f && (p.splice(p.length, 0, "PS256", "PS384", "PS512"), y.splice(y.length, 0, "PS256", "PS384", "PS512")), Mn = function(P, j, b, O) {
    typeof b == "function" && !O && (O = b, b = {}), b || (b = {}), b = Object.assign({}, b);
    let R;
    if (O ? R = O : R = function(V, K) {
      if (V) throw V;
      return K;
    }, b.clockTimestamp && typeof b.clockTimestamp != "number")
      return R(new e("clockTimestamp must be a number"));
    if (b.nonce !== void 0 && (typeof b.nonce != "string" || b.nonce.trim() === ""))
      return R(new e("nonce must be a non-empty string"));
    if (b.allowInvalidAsymmetricKeyTypes !== void 0 && typeof b.allowInvalidAsymmetricKeyTypes != "boolean")
      return R(new e("allowInvalidAsymmetricKeyTypes must be a boolean"));
    const N = b.clockTimestamp || Math.floor(Date.now() / 1e3);
    if (!P)
      return R(new e("jwt must be provided"));
    if (typeof P != "string")
      return R(new e("jwt must be a string"));
    const H = P.split(".");
    if (H.length !== 3)
      return R(new e("jwt malformed"));
    let T;
    try {
      T = s(P, { complete: !0 });
    } catch (V) {
      return R(V);
    }
    if (!T)
      return R(new e("invalid token"));
    const D = T.header;
    let $;
    if (typeof j == "function") {
      if (!O)
        return R(new e("verify must be called asynchronous if secret or public key is provided as a callback"));
      $ = j;
    } else
      $ = function(V, K) {
        return K(null, j);
      };
    return $(D, function(V, K) {
      if (V)
        return R(new e("error in secret or public key callback: " + V.message));
      const G = H[2].trim() !== "";
      if (!G && K)
        return R(new e("jwt signature is required"));
      if (G && !K)
        return R(new e("secret or public key must be provided"));
      if (!G && !b.algorithms)
        return R(new e('please specify "none" in "algorithms" to verify unsigned tokens'));
      if (K != null && !(K instanceof d))
        try {
          K = a(K);
        } catch {
          try {
            K = h(typeof K == "string" ? Buffer.from(K) : K);
          } catch {
            return R(new e("secretOrPublicKey is not valid key material"));
          }
        }
      if (b.algorithms || (K.type === "secret" ? b.algorithms = _ : ["rsa", "rsa-pss"].includes(K.asymmetricKeyType) ? b.algorithms = y : K.asymmetricKeyType === "ec" ? b.algorithms = g : b.algorithms = p), b.algorithms.indexOf(T.header.alg) === -1)
        return R(new e("invalid algorithm"));
      if (D.alg.startsWith("HS") && K.type !== "secret")
        return R(new e(`secretOrPublicKey must be a symmetric key when using ${D.alg}`));
      if (/^(?:RS|PS|ES)/.test(D.alg) && K.type !== "public")
        return R(new e(`secretOrPublicKey must be an asymmetric key when using ${D.alg}`));
      if (!b.allowInvalidAsymmetricKeyTypes)
        try {
          l(D.alg, K);
        } catch (A) {
          return R(A);
        }
      let re;
      try {
        re = E.verify(P, T.header.alg, K);
      } catch (A) {
        return R(A);
      }
      if (!re)
        return R(new e("invalid signature"));
      const x = T.payload;
      if (typeof x.nbf < "u" && !b.ignoreNotBefore) {
        if (typeof x.nbf != "number")
          return R(new e("invalid nbf value"));
        if (x.nbf > N + (b.clockTolerance || 0))
          return R(new t("jwt not active", new Date(x.nbf * 1e3)));
      }
      if (typeof x.exp < "u" && !b.ignoreExpiration) {
        if (typeof x.exp != "number")
          return R(new e("invalid exp value"));
        if (N >= x.exp + (b.clockTolerance || 0))
          return R(new r("jwt expired", new Date(x.exp * 1e3)));
      }
      if (b.audience) {
        const A = Array.isArray(b.audience) ? b.audience : [b.audience];
        if (!(Array.isArray(x.aud) ? x.aud : [x.aud]).some(function(k) {
          return A.some(function(F) {
            return F instanceof RegExp ? F.test(k) : F === k;
          });
        }))
          return R(new e("jwt audience invalid. expected: " + A.join(" or ")));
      }
      if (b.issuer && (typeof b.issuer == "string" && x.iss !== b.issuer || Array.isArray(b.issuer) && b.issuer.indexOf(x.iss) === -1))
        return R(new e("jwt issuer invalid. expected: " + b.issuer));
      if (b.subject && x.sub !== b.subject)
        return R(new e("jwt subject invalid. expected: " + b.subject));
      if (b.jwtid && x.jti !== b.jwtid)
        return R(new e("jwt jwtid invalid. expected: " + b.jwtid));
      if (b.nonce && x.nonce !== b.nonce)
        return R(new e("jwt nonce invalid. expected: " + b.nonce));
      if (b.maxAge) {
        if (typeof x.iat != "number")
          return R(new e("iat required when maxAge is specified"));
        const A = o(b.maxAge, x.iat);
        if (typeof A > "u")
          return R(new e('"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
        if (N >= A + (b.clockTolerance || 0))
          return R(new r("maxAge exceeded", new Date(A * 1e3)));
      }
      if (b.complete === !0) {
        const A = T.signature;
        return R(null, {
          header: D,
          payload: x,
          signature: A
        });
      }
      return R(null, x);
    });
  }, Mn;
}
var Un, Ao;
function bf() {
  if (Ao) return Un;
  Ao = 1;
  var e = 1 / 0, t = 9007199254740991, r = 17976931348623157e292, s = NaN, o = "[object Arguments]", l = "[object Function]", f = "[object GeneratorFunction]", E = "[object String]", d = "[object Symbol]", h = /^\s+|\s+$/g, a = /^[-+]0x[0-9a-f]+$/i, p = /^0b[01]+$/i, g = /^0o[0-7]+$/i, y = /^(?:0|[1-9]\d*)$/, _ = parseInt;
  function P(L, Z) {
    for (var Q = -1, ye = L ? L.length : 0, Te = Array(ye); ++Q < ye; )
      Te[Q] = Z(L[Q], Q, L);
    return Te;
  }
  function j(L, Z, Q, ye) {
    for (var Te = L.length, xe = Q + -1; ++xe < Te; )
      if (Z(L[xe], xe, L))
        return xe;
    return -1;
  }
  function b(L, Z, Q) {
    if (Z !== Z)
      return j(L, O, Q);
    for (var ye = Q - 1, Te = L.length; ++ye < Te; )
      if (L[ye] === Z)
        return ye;
    return -1;
  }
  function O(L) {
    return L !== L;
  }
  function R(L, Z) {
    for (var Q = -1, ye = Array(L); ++Q < L; )
      ye[Q] = Z(Q);
    return ye;
  }
  function N(L, Z) {
    return P(Z, function(Q) {
      return L[Q];
    });
  }
  function H(L, Z) {
    return function(Q) {
      return L(Z(Q));
    };
  }
  var T = Object.prototype, D = T.hasOwnProperty, $ = T.toString, V = T.propertyIsEnumerable, K = H(Object.keys, Object), G = Math.max;
  function re(L, Z) {
    var Q = F(L) || k(L) ? R(L.length, String) : [], ye = Q.length, Te = !!ye;
    for (var xe in L)
      D.call(L, xe) && !(Te && (xe == "length" || A(xe, ye))) && Q.push(xe);
    return Q;
  }
  function x(L) {
    if (!S(L))
      return K(L);
    var Z = [];
    for (var Q in Object(L))
      D.call(L, Q) && Q != "constructor" && Z.push(Q);
    return Z;
  }
  function A(L, Z) {
    return Z = Z ?? t, !!Z && (typeof L == "number" || y.test(L)) && L > -1 && L % 1 == 0 && L < Z;
  }
  function S(L) {
    var Z = L && L.constructor, Q = typeof Z == "function" && Z.prototype || T;
    return L === Q;
  }
  function C(L, Z, Q, ye) {
    L = U(L) ? L : hr(L), Q = Q && !ye ? fr(Q) : 0;
    var Te = L.length;
    return Q < 0 && (Q = G(Te + Q, 0)), ce(L) ? Q <= Te && L.indexOf(Z, Q) > -1 : !!Te && b(L, Z, Q) > -1;
  }
  function k(L) {
    return J(L) && D.call(L, "callee") && (!V.call(L, "callee") || $.call(L) == o);
  }
  var F = Array.isArray;
  function U(L) {
    return L != null && ee(L.length) && !se(L);
  }
  function J(L) {
    return fe(L) && U(L);
  }
  function se(L) {
    var Z = ie(L) ? $.call(L) : "";
    return Z == l || Z == f;
  }
  function ee(L) {
    return typeof L == "number" && L > -1 && L % 1 == 0 && L <= t;
  }
  function ie(L) {
    var Z = typeof L;
    return !!L && (Z == "object" || Z == "function");
  }
  function fe(L) {
    return !!L && typeof L == "object";
  }
  function ce(L) {
    return typeof L == "string" || !F(L) && fe(L) && $.call(L) == E;
  }
  function Me(L) {
    return typeof L == "symbol" || fe(L) && $.call(L) == d;
  }
  function cr(L) {
    if (!L)
      return L === 0 ? L : 0;
    if (L = lr(L), L === e || L === -e) {
      var Z = L < 0 ? -1 : 1;
      return Z * r;
    }
    return L === L ? L : 0;
  }
  function fr(L) {
    var Z = cr(L), Q = Z % 1;
    return Z === Z ? Q ? Z - Q : Z : 0;
  }
  function lr(L) {
    if (typeof L == "number")
      return L;
    if (Me(L))
      return s;
    if (ie(L)) {
      var Z = typeof L.valueOf == "function" ? L.valueOf() : L;
      L = ie(Z) ? Z + "" : Z;
    }
    if (typeof L != "string")
      return L === 0 ? L : +L;
    L = L.replace(h, "");
    var Q = p.test(L);
    return Q || g.test(L) ? _(L.slice(2), Q ? 2 : 8) : a.test(L) ? s : +L;
  }
  function dr(L) {
    return U(L) ? re(L) : x(L);
  }
  function hr(L) {
    return L ? N(L, dr(L)) : [];
  }
  return Un = C, Un;
}
var Vn, To;
function Sf() {
  if (To) return Vn;
  To = 1;
  var e = "[object Boolean]", t = Object.prototype, r = t.toString;
  function s(l) {
    return l === !0 || l === !1 || o(l) && r.call(l) == e;
  }
  function o(l) {
    return !!l && typeof l == "object";
  }
  return Vn = s, Vn;
}
var Gn, Oo;
function _f() {
  if (Oo) return Gn;
  Oo = 1;
  var e = 1 / 0, t = 17976931348623157e292, r = NaN, s = "[object Symbol]", o = /^\s+|\s+$/g, l = /^[-+]0x[0-9a-f]+$/i, f = /^0b[01]+$/i, E = /^0o[0-7]+$/i, d = parseInt, h = Object.prototype, a = h.toString;
  function p(O) {
    return typeof O == "number" && O == j(O);
  }
  function g(O) {
    var R = typeof O;
    return !!O && (R == "object" || R == "function");
  }
  function y(O) {
    return !!O && typeof O == "object";
  }
  function _(O) {
    return typeof O == "symbol" || y(O) && a.call(O) == s;
  }
  function P(O) {
    if (!O)
      return O === 0 ? O : 0;
    if (O = b(O), O === e || O === -e) {
      var R = O < 0 ? -1 : 1;
      return R * t;
    }
    return O === O ? O : 0;
  }
  function j(O) {
    var R = P(O), N = R % 1;
    return R === R ? N ? R - N : R : 0;
  }
  function b(O) {
    if (typeof O == "number")
      return O;
    if (_(O))
      return r;
    if (g(O)) {
      var R = typeof O.valueOf == "function" ? O.valueOf() : O;
      O = g(R) ? R + "" : R;
    }
    if (typeof O != "string")
      return O === 0 ? O : +O;
    O = O.replace(o, "");
    var N = f.test(O);
    return N || E.test(O) ? d(O.slice(2), N ? 2 : 8) : l.test(O) ? r : +O;
  }
  return Gn = p, Gn;
}
var Hn, Io;
function Rf() {
  if (Io) return Hn;
  Io = 1;
  var e = "[object Number]", t = Object.prototype, r = t.toString;
  function s(l) {
    return !!l && typeof l == "object";
  }
  function o(l) {
    return typeof l == "number" || s(l) && r.call(l) == e;
  }
  return Hn = o, Hn;
}
var Kn, Lo;
function Af() {
  if (Lo) return Kn;
  Lo = 1;
  var e = "[object Object]";
  function t(g) {
    var y = !1;
    if (g != null && typeof g.toString != "function")
      try {
        y = !!(g + "");
      } catch {
      }
    return y;
  }
  function r(g, y) {
    return function(_) {
      return g(y(_));
    };
  }
  var s = Function.prototype, o = Object.prototype, l = s.toString, f = o.hasOwnProperty, E = l.call(Object), d = o.toString, h = r(Object.getPrototypeOf, Object);
  function a(g) {
    return !!g && typeof g == "object";
  }
  function p(g) {
    if (!a(g) || d.call(g) != e || t(g))
      return !1;
    var y = h(g);
    if (y === null)
      return !0;
    var _ = f.call(y, "constructor") && y.constructor;
    return typeof _ == "function" && _ instanceof _ && l.call(_) == E;
  }
  return Kn = p, Kn;
}
var zn, Po;
function Tf() {
  if (Po) return zn;
  Po = 1;
  var e = "[object String]", t = Object.prototype, r = t.toString, s = Array.isArray;
  function o(f) {
    return !!f && typeof f == "object";
  }
  function l(f) {
    return typeof f == "string" || !s(f) && o(f) && r.call(f) == e;
  }
  return zn = l, zn;
}
var Wn, $o;
function Of() {
  if ($o) return Wn;
  $o = 1;
  var e = "Expected a function", t = 1 / 0, r = 17976931348623157e292, s = NaN, o = "[object Symbol]", l = /^\s+|\s+$/g, f = /^[-+]0x[0-9a-f]+$/i, E = /^0b[01]+$/i, d = /^0o[0-7]+$/i, h = parseInt, a = Object.prototype, p = a.toString;
  function g(N, H) {
    var T;
    if (typeof H != "function")
      throw new TypeError(e);
    return N = O(N), function() {
      return --N > 0 && (T = H.apply(this, arguments)), N <= 1 && (H = void 0), T;
    };
  }
  function y(N) {
    return g(2, N);
  }
  function _(N) {
    var H = typeof N;
    return !!N && (H == "object" || H == "function");
  }
  function P(N) {
    return !!N && typeof N == "object";
  }
  function j(N) {
    return typeof N == "symbol" || P(N) && p.call(N) == o;
  }
  function b(N) {
    if (!N)
      return N === 0 ? N : 0;
    if (N = R(N), N === t || N === -t) {
      var H = N < 0 ? -1 : 1;
      return H * r;
    }
    return N === N ? N : 0;
  }
  function O(N) {
    var H = b(N), T = H % 1;
    return H === H ? T ? H - T : H : 0;
  }
  function R(N) {
    if (typeof N == "number")
      return N;
    if (j(N))
      return s;
    if (_(N)) {
      var H = typeof N.valueOf == "function" ? N.valueOf() : N;
      N = _(H) ? H + "" : H;
    }
    if (typeof N != "string")
      return N === 0 ? N : +N;
    N = N.replace(l, "");
    var T = E.test(N);
    return T || d.test(N) ? h(N.slice(2), T ? 2 : 8) : f.test(N) ? s : +N;
  }
  return Wn = y, Wn;
}
var Jn, No;
function If() {
  if (No) return Jn;
  No = 1;
  const e = Sa(), t = Ia(), r = Oa(), s = ps(), o = bf(), l = Sf(), f = _f(), E = Rf(), d = Af(), h = Tf(), a = Of(), { KeyObject: p, createSecretKey: g, createPrivateKey: y } = Re, _ = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "HS256", "HS384", "HS512", "none"];
  t && _.splice(3, 0, "PS256", "PS384", "PS512");
  const P = {
    expiresIn: { isValid: function(T) {
      return f(T) || h(T) && T;
    }, message: '"expiresIn" should be a number of seconds or string representing a timespan' },
    notBefore: { isValid: function(T) {
      return f(T) || h(T) && T;
    }, message: '"notBefore" should be a number of seconds or string representing a timespan' },
    audience: { isValid: function(T) {
      return h(T) || Array.isArray(T);
    }, message: '"audience" must be a string or array' },
    algorithm: { isValid: o.bind(null, _), message: '"algorithm" must be a valid string enum value' },
    header: { isValid: d, message: '"header" must be an object' },
    encoding: { isValid: h, message: '"encoding" must be a string' },
    issuer: { isValid: h, message: '"issuer" must be a string' },
    subject: { isValid: h, message: '"subject" must be a string' },
    jwtid: { isValid: h, message: '"jwtid" must be a string' },
    noTimestamp: { isValid: l, message: '"noTimestamp" must be a boolean' },
    keyid: { isValid: h, message: '"keyid" must be a string' },
    mutatePayload: { isValid: l, message: '"mutatePayload" must be a boolean' },
    allowInsecureKeySizes: { isValid: l, message: '"allowInsecureKeySizes" must be a boolean' },
    allowInvalidAsymmetricKeyTypes: { isValid: l, message: '"allowInvalidAsymmetricKeyTypes" must be a boolean' }
  }, j = {
    iat: { isValid: E, message: '"iat" should be a number of seconds' },
    exp: { isValid: E, message: '"exp" should be a number of seconds' },
    nbf: { isValid: E, message: '"nbf" should be a number of seconds' }
  };
  function b(T, D, $, V) {
    if (!d($))
      throw new Error('Expected "' + V + '" to be a plain object.');
    Object.keys($).forEach(function(K) {
      const G = T[K];
      if (!G) {
        if (!D)
          throw new Error('"' + K + '" is not allowed in "' + V + '"');
        return;
      }
      if (!G.isValid($[K]))
        throw new Error(G.message);
    });
  }
  function O(T) {
    return b(P, !1, T, "options");
  }
  function R(T) {
    return b(j, !0, T, "payload");
  }
  const N = {
    audience: "aud",
    issuer: "iss",
    subject: "sub",
    jwtid: "jti"
  }, H = [
    "expiresIn",
    "notBefore",
    "noTimestamp",
    "audience",
    "issuer",
    "subject",
    "jwtid"
  ];
  return Jn = function(T, D, $, V) {
    typeof $ == "function" ? (V = $, $ = {}) : $ = $ || {};
    const K = typeof T == "object" && !Buffer.isBuffer(T), G = Object.assign({
      alg: $.algorithm || "HS256",
      typ: K ? "JWT" : void 0,
      kid: $.keyid
    }, $.header);
    function re(S) {
      if (V)
        return V(S);
      throw S;
    }
    if (!D && $.algorithm !== "none")
      return re(new Error("secretOrPrivateKey must have a value"));
    if (D != null && !(D instanceof p))
      try {
        D = y(D);
      } catch {
        try {
          D = g(typeof D == "string" ? Buffer.from(D) : D);
        } catch {
          return re(new Error("secretOrPrivateKey is not valid key material"));
        }
      }
    if (G.alg.startsWith("HS") && D.type !== "secret")
      return re(new Error(`secretOrPrivateKey must be a symmetric key when using ${G.alg}`));
    if (/^(?:RS|PS|ES)/.test(G.alg)) {
      if (D.type !== "private")
        return re(new Error(`secretOrPrivateKey must be an asymmetric key when using ${G.alg}`));
      if (!$.allowInsecureKeySizes && !G.alg.startsWith("ES") && D.asymmetricKeyDetails !== void 0 && //KeyObject.asymmetricKeyDetails is supported in Node 15+
      D.asymmetricKeyDetails.modulusLength < 2048)
        return re(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${G.alg}`));
    }
    if (typeof T > "u")
      return re(new Error("payload is required"));
    if (K) {
      try {
        R(T);
      } catch (S) {
        return re(S);
      }
      $.mutatePayload || (T = Object.assign({}, T));
    } else {
      const S = H.filter(function(C) {
        return typeof $[C] < "u";
      });
      if (S.length > 0)
        return re(new Error("invalid " + S.join(",") + " option for " + typeof T + " payload"));
    }
    if (typeof T.exp < "u" && typeof $.expiresIn < "u")
      return re(new Error('Bad "options.expiresIn" option the payload already has an "exp" property.'));
    if (typeof T.nbf < "u" && typeof $.notBefore < "u")
      return re(new Error('Bad "options.notBefore" option the payload already has an "nbf" property.'));
    try {
      O($);
    } catch (S) {
      return re(S);
    }
    if (!$.allowInvalidAsymmetricKeyTypes)
      try {
        r(G.alg, D);
      } catch (S) {
        return re(S);
      }
    const x = T.iat || Math.floor(Date.now() / 1e3);
    if ($.noTimestamp ? delete T.iat : K && (T.iat = x), typeof $.notBefore < "u") {
      try {
        T.nbf = e($.notBefore, x);
      } catch (S) {
        return re(S);
      }
      if (typeof T.nbf > "u")
        return re(new Error('"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
    }
    if (typeof $.expiresIn < "u" && typeof T == "object") {
      try {
        T.exp = e($.expiresIn, x);
      } catch (S) {
        return re(S);
      }
      if (typeof T.exp > "u")
        return re(new Error('"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
    }
    Object.keys(N).forEach(function(S) {
      const C = N[S];
      if (typeof $[S] < "u") {
        if (typeof T[C] < "u")
          return re(new Error('Bad "options.' + S + '" option. The payload already has an "' + C + '" property.'));
        T[C] = $[S];
      }
    });
    const A = $.encoding || "utf8";
    if (typeof V == "function")
      V = V && a(V), s.createSign({
        header: G,
        privateKey: D,
        payload: T,
        encoding: A
      }).once("error", V).once("done", function(S) {
        if (!$.allowInsecureKeySizes && /^(?:RS|PS)/.test(G.alg) && S.length < 256)
          return V(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${G.alg}`));
        V(null, S);
      });
    else {
      let S = s.sign({ header: G, payload: T, secret: D, encoding: A });
      if (!$.allowInsecureKeySizes && /^(?:RS|PS)/.test(G.alg) && S.length < 256)
        throw new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${G.alg}`);
      return S;
    }
  }, Jn;
}
var Xn, xo;
function Lf() {
  return xo || (xo = 1, Xn = {
    decode: va(),
    verify: wf(),
    sign: If(),
    JsonWebTokenError: nr(),
    NotBeforeError: wa(),
    TokenExpiredError: ba()
  }), Xn;
}
var Yn, Co;
function Pf() {
  if (Co) return Yn;
  Co = 1;
  const e = Lf();
  return Yn = function(r, s) {
    const [o, l] = r.split(":");
    return e.sign({}, Buffer.from(l, "hex"), {
      // eslint-disable-line no-undef
      keyid: o,
      algorithm: "HS256",
      expiresIn: "5m",
      audience: s
    });
  }, Yn;
}
const $f = "1.14.0", Nf = {
  version: $f
};
var Zn, jo;
function xf() {
  if (jo) return Zn;
  jo = 1;
  const e = /* @__PURE__ */ Dc(), t = kc(), r = Re, s = Pf(), l = Nf.version, f = "v6.0", E = ["v2", "v3", "v4", "v5", "v6", "canary"], d = "@tryghost/admin-api", h = (a) => {
    let p;
    return a === "v2" || a === "v3" || a === "v4" || a === "canary" ? p = `/${a}/admin/` : a && a.match(/^v[2-4]\.\d+/) ? p = `/${/^(v[2-4])\.\d+/.exec(a)[1]}/admin/` : p = "/admin/", p;
  };
  return Zn = function a(p) {
    if (this instanceof a)
      return a(p);
    const y = Object.assign({}, {
      ghostPath: "ghost",
      userAgent: !0,
      generateToken: s,
      makeRequest({ url: T, method: D, data: $, params: V = {}, headers: K = {} }) {
        return e({
          url: T,
          method: D,
          params: V,
          data: $,
          headers: K,
          maxContentLength: 1 / 0,
          maxBodyLength: 1 / 0,
          paramsSerializer(G) {
            return Object.keys(G).reduce((re, x) => {
              const A = encodeURIComponent([].concat(G[x]).join(","));
              return re.concat(`${x}=${A}`);
            }, []).join("&");
          }
        }).then((G) => G.data);
      }
    }, p);
    if (y.host && (console.warn(`${d}: The 'host' parameter is deprecated, please use 'url' instead`), y.url || (y.url = y.host)), y.version === void 0)
      throw new Error(`${d} Config Missing: 'version' is required. E.g. ${E.join(",")}`);
    if (typeof y.version == "boolean")
      y.version === !0 && (y.acceptVersionHeader = f), y.version = void 0;
    else {
      if (!E.includes(y.version) && !y.version.match(/^v\d+\.\d+/))
        throw new Error(`${d} Config Invalid: 'version' ${y.version} is not supported`);
      (E.includes(y.version) || y.version.match(/^v\d+\.\d+/)) && (y.version === "canary" ? (console.warn(`${d}: The 'version' parameter has a deprecated format 'canary', please use 'v{major}.{minor}' format instead`), y.acceptVersionHeader = f) : y.version.match(/^v\d+$/) ? (console.warn(`${d}: The 'version' parameter has a deprecated format 'v{major}', please use 'v{major}.{minor}' format instead`), y.acceptVersionHeader = `${y.version}.0`) : y.acceptVersionHeader = y.version);
    }
    if (!y.url)
      throw new Error(`${d} Config Missing: 'url' is required. E.g. 'https://site.com'`);
    if (!/https?:\/\//.test(y.url))
      throw new Error(`${d} Config Invalid: 'url' ${y.url} requires a protocol. E.g. 'https://site.com'`);
    if (y.url.endsWith("/"))
      throw new Error(`${d} Config Invalid: 'url' ${y.url} must not have a trailing slash. E.g. 'https://site.com'`);
    if (y.ghostPath.endsWith("/") || y.ghostPath.startsWith("/"))
      throw new Error(`${d} Config Invalid: 'ghostPath' ${y.ghostPath} must not have a leading or trailing slash. E.g. 'ghost'`);
    if (!y.key)
      throw new Error(`${d} Config Invalid: 'key' ${y.key} must have 26 hex characters`);
    if (!/[0-9a-f]{24}:[0-9a-f]{64}/.test(y.key))
      throw new Error(`${d} Config Invalid: 'key' ${y.key} must have the following format {A}:{B}, where A is 24 hex characters and B is 64 hex characters`);
    const _ = [
      "posts",
      "pages",
      "tags",
      "webhooks",
      "members",
      "users",
      "newsletters"
    ];
    typeof y.version == "string" && y.version.startsWith("v2") && _.push("subscribers");
    const P = _.reduce((T, D) => {
      function $(A, S = {}) {
        if (!A || !Object.keys(A).length)
          return Promise.reject(new Error("Missing data"));
        const C = {};
        return C[D] = [A], R(D, S, C, "POST");
      }
      function V(A, S = {}) {
        if (!A)
          return Promise.reject(new Error("Missing data"));
        if (!A.id)
          return Promise.reject(new Error("Must include data.id"));
        const C = {}, k = {};
        return A.id && (k.id = A.id, delete A.id), C[D] = [A], R(D, S, C, "PUT", k);
      }
      function K(A, S = {}) {
        return A ? !A.id && !A.email ? Promise.reject(new Error("Must include either data.id or data.email")) : R(D, S, A, "DELETE", A) : Promise.reject(new Error("Missing data"));
      }
      function G(A = {}) {
        return R(D, A);
      }
      function re(A, S) {
        if (!A)
          return Promise.reject(new Error("Missing data"));
        if (!A.id && !A.slug && !A.email)
          return Promise.reject(new Error("Must include either data.id or data.slug or data.email"));
        const C = {
          id: A.id,
          slug: A.slug,
          email: A.email
        };
        return delete A.id, delete A.slug, delete A.email, S = Object.assign({}, S, A), R(D, S, "", "GET", C);
      }
      let x = {};
      return D === "webhooks" ? x = {
        [D]: {
          add: $,
          edit: V,
          delete: K
        }
      } : x = {
        [D]: {
          read: re,
          browse: G,
          add: $,
          edit: V,
          delete: K
        }
      }, Object.assign(T, x);
    }, {});
    function j(T) {
      return !!(T instanceof t || T.file);
    }
    function b(T) {
      let D;
      if (T instanceof t)
        return T;
      if (T.file)
        return D = new t(), D.append("file", r.createReadStream(T.file)), D.append("purpose", T.purpose || "image"), T.ref && D.append("ref", T.ref), T.thumbnail && D.append("thumbnail", r.createReadStream(T.thumbnail)), D;
    }
    return P.images = {
      upload(T) {
        return O("images", T, N("images/upload"));
      }
    }, P.media = {
      /**
       *
       * @param {Object} data
       * @param {String} data.file - file path to a media file
       * @param {String} [data.thumbnail] - file path to a thumbnail file
       * @param {String} [data.purpose]
       * @returns Promise<Object>
       */
      upload(T) {
        return O("media", T, N("media/upload"));
      }
    }, P.files = {
      /**
       *
       * @param {Object} data
       * @param {String} data.file - file path to a media file
       * @param {String} [data.ref] - reference field returned in the response
       * @returns Promise<Object>
       */
      upload(T) {
        return O("files", T, N("files/upload"));
      }
    }, P.config = {
      read() {
        return R("config", {}, {});
      }
    }, P.site = {
      read() {
        return R("site", {}, {});
      }
    }, P.themes = {
      upload(T) {
        return O("themes", T, N("themes/upload"));
      },
      activate(T) {
        return T ? R("themes", {}, {}, "PUT", { id: `${T}/activate` }) : Promise.reject(new Error("Missing theme name"));
      }
    }, P;
    function O(T, D, $) {
      if (!D)
        return Promise.reject(new Error("Missing data"));
      if (!j(D))
        return Promise.reject(new Error("Must be of FormData or include path"));
      let V = b(D);
      const K = {
        "Content-Type": `multipart/form-data; boundary=${V._boundary}`
      };
      return H({
        endpoint: $,
        method: "POST",
        body: V,
        headers: K
      }).then((G) => {
        if (!Array.isArray(G[T]))
          return G[T];
        if (G[T].length === 1 && !G.meta)
          return G[T][0];
      });
    }
    function R(T, D = {}, $ = "", V = "GET", K = {}) {
      return H({
        endpoint: N(T, K),
        method: V,
        queryParams: D,
        body: $
      }).then((G) => V === "DELETE" ? G : Array.isArray(G[T]) ? G[T].length === 1 && !G.meta ? G[T][0] : Object.assign(G[T], { meta: G.meta }) : G[T]);
    }
    function N(T, { id: D, slug: $, email: V } = {}) {
      const { ghostPath: K, version: G } = y, re = h(G);
      let x = `/${K}/api${re}${T}/`;
      return D ? x = `${x}${D}/` : $ ? x = `${x}slug/${$}/` : V && (x = `${x}email/${V}/`), x;
    }
    function H({ endpoint: T, method: D, body: $, queryParams: V = {}, headers: K = {} }) {
      const { url: G, key: re, version: x, makeRequest: A } = y, S = `${G}${T}`;
      let C;
      const k = h(x);
      C = `Ghost ${y.generateToken(re, k)}`;
      const F = {
        Authorization: C
      };
      return y.userAgent && (typeof y.userAgent == "boolean" ? F["User-Agent"] = `GhostAdminSDK/${l}` : K["User-Agent"] = y.userAgent), y.acceptVersionHeader && (F["Accept-Version"] = y.acceptVersionHeader), K = Object.assign({}, K, F), A({
        url: S,
        method: D,
        data: $,
        params: V,
        headers: K
      }).catch((U) => {
        if (U.response && U.response.data && U.response.data.errors) {
          const J = U.response.data.errors[0], se = new Error(J.message), ee = Object.keys(J);
          throw se.name = J.type, ee.forEach((ie) => {
            se[ie] = J[ie];
          }), se;
        } else
          throw delete U.request, delete U.config, delete U.response, U;
      });
    }
  }, Zn;
}
var Qn, qo;
function Cf() {
  return qo || (qo = 1, Qn = xf()), Qn;
}
var jf = Cf();
const qf = /* @__PURE__ */ jc(jf);
class Df extends Error {
  constructor(t, r, s, o) {
    super(t), this.statusCode = r, this.ghostCode = s, this.details = o, this.name = "GhostApiError";
  }
}
class La {
  api;
  maxRetries;
  constructor(t) {
    this.maxRetries = t.maxRetries || 3, this.api = new qf({
      url: t.baseUrl,
      key: t.apiKey,
      version: "v5.0"
    });
  }
  static fromConfig(t) {
    const r = t.get();
    return new La({
      baseUrl: t.getApiUrl(),
      apiKey: t.getApiKey(),
      timeout: r.apiTimeout,
      maxRetries: r.maxRetries
    });
  }
  async retryOperation(t, r = 0) {
    try {
      return await t();
    } catch (s) {
      if (r < this.maxRetries && s instanceof Error && (s.message.includes("timeout") || s.message.includes("network") || s.message.includes("429") || s.message.includes("5"))) {
        const l = Math.pow(2, r) * 1e3;
        return await new Promise((f) => setTimeout(f, l)), this.retryOperation(t, r + 1);
      }
      throw s instanceof Error ? new Df(s.message) : s;
    }
  }
  async getMembers(t = {}) {
    return this.retryOperation(async () => {
      const r = {
        page: t.page || 1,
        limit: t.limit || 15,
        include: t.include || "labels,newsletters",
        order: t.order || "created_at DESC",
        ...t.filter && { filter: t.filter }
      }, o = await this.api.members.browse(r);
      return {
        data: o,
        meta: {
          pagination: {
            page: r.page,
            limit: r.limit,
            pages: o.meta?.pagination?.pages || Math.ceil((o.length || 0) / r.limit),
            total: o.meta?.pagination?.total || o.length || 0,
            next: o.meta?.pagination?.next || void 0,
            prev: o.meta?.pagination?.prev || void 0
          }
        }
      };
    });
  }
  async getMember(t) {
    return this.retryOperation(async () => ({ members: [await this.api.members.read(
      { id: t },
      {
        include: "labels,newsletters"
      }
    )] }));
  }
  async searchMembers(t, r = {}) {
    const s = `name:~'${t}',email:~'${t}'`;
    return this.getMembers({
      ...r,
      filter: s
    });
  }
  async getMembersByTier(t, r = {}) {
    let s;
    switch (t.toLowerCase()) {
      case "free":
        s = "status:free";
        break;
      case "paid":
        s = "status:paid";
        break;
      case "comped":
        s = "status:comped";
        break;
      default:
        s = `tier:${t}`;
    }
    return this.getMembers({
      ...r,
      filter: s
    });
  }
  async getMembersByLabel(t, r = {}) {
    return this.getMembers({
      ...r,
      filter: `label:${t}`
    });
  }
  async getMembersByDateRange(t, r, s = {}) {
    const o = t.toISOString(), l = r.toISOString();
    return this.getMembers({
      ...s,
      filter: `created_at:>='${o}'+created_at:<='${l}'`
    });
  }
  buildComplexFilter(t) {
    const r = [];
    return t.search && r.push(`name:~'${t.search}',email:~'${t.search}'`), t.tier && (["free", "paid", "comped"].includes(t.tier) ? r.push(`status:${t.tier}`) : r.push(`tier:${t.tier}`)), t.label && r.push(`label:${t.label}`), t.status && r.push(`status:${t.status}`), t.created_at?.gte && r.push(`created_at:>='${t.created_at.gte}'`), t.created_at?.lte && r.push(`created_at:<='${t.created_at.lte}'`), r.join("+");
  }
  async getMembersWithFilters(t, r = {}) {
    const s = this.buildComplexFilter(t);
    return this.getMembers({
      ...r,
      filter: s || void 0
    });
  }
  async testConnection() {
    return this.retryOperation(async () => {
      try {
        const t = await this.api.site.read(), r = await this.api.members.browse({ limit: 1 });
        return {
          success: !0,
          message: "Connection successful",
          siteInfo: {
            title: t.title,
            totalMembers: r.meta?.pagination?.total || 0
          }
        };
      } catch (t) {
        return {
          success: !1,
          message: t instanceof Error ? t.message : "Unknown connection error"
        };
      }
    });
  }
}
class kf {
  cache = /* @__PURE__ */ new Map();
  defaultTTL;
  maxSize;
  constructor(t = {}) {
    this.defaultTTL = t.ttl || 300 * 1e3, this.maxSize = t.maxSize || 100;
  }
  generateKey(t, r) {
    const s = Object.keys(r).sort().map((o) => `${o}=${r[o]}`).join("&");
    return `${t}?${s}`;
  }
  isExpired(t) {
    return Date.now() - t.timestamp > t.ttl;
  }
  evictOldest() {
    if (this.cache.size === 0) return;
    let t = "", r = 1 / 0;
    for (const [s, o] of this.cache.entries())
      o.timestamp < r && (r = o.timestamp, t = s);
    t && this.cache.delete(t);
  }
  get(t, r = {}) {
    const s = this.generateKey(t, r), o = this.cache.get(s);
    return o ? this.isExpired(o) ? (this.cache.delete(s), null) : o.data : null;
  }
  set(t, r = {}, s, o) {
    for (; this.cache.size >= this.maxSize; )
      this.evictOldest();
    const l = this.generateKey(t, r);
    this.cache.set(l, {
      data: s,
      timestamp: Date.now(),
      ttl: o || this.defaultTTL
    });
  }
  invalidate(t, r) {
    if (r) {
      const s = this.generateKey(t, r);
      this.cache.delete(s);
    } else
      for (const s of this.cache.keys())
        s.startsWith(`${t}?`) && this.cache.delete(s);
  }
  clear() {
    this.cache.clear();
  }
  // Clean expired entries
  cleanup() {
    for (const [t, r] of this.cache.entries())
      this.isExpired(r) && this.cache.delete(t);
  }
  getStats() {
    const t = Array.from(this.cache.entries()).map(([r, s]) => ({
      key: r,
      age: Date.now() - s.timestamp,
      ttl: s.ttl
    }));
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: 0,
      // Could implement hit tracking if needed
      entries: t
    };
  }
}
class Il {
  apiClient;
  // Will be injected
  cache;
  constructor(t, r) {
    this.apiClient = t, this.cache = new kf(r), setInterval(() => this.cache.cleanup(), 6e4);
  }
  async getMembers(t = {}) {
    const r = "members", s = this.cache.get(r, t);
    if (s)
      return s;
    const o = await this.apiClient.getMembers(t);
    return this.cache.set(r, t, o), o;
  }
  async getMember(t) {
    const r = `member-${t}`, s = this.cache.get(r);
    if (s)
      return s;
    const o = await this.apiClient.getMember(t);
    return this.cache.set(r, {}, o, 600 * 1e3), o;
  }
  async searchMembers(t, r = {}) {
    const s = "search", o = { query: t, ...r }, l = this.cache.get(s, o);
    if (l)
      return l;
    const f = await this.apiClient.searchMembers(t, r);
    return this.cache.set(s, o, f, 120 * 1e3), f;
  }
  async getMembersByTier(t, r = {}) {
    const s = "members-by-tier", o = { tier: t, ...r }, l = this.cache.get(s, o);
    if (l)
      return l;
    const f = await this.apiClient.getMembersByTier(t, r);
    return this.cache.set(s, o, f), f;
  }
  async getMembersByLabel(t, r = {}) {
    const s = "members-by-label", o = { label: t, ...r }, l = this.cache.get(s, o);
    if (l)
      return l;
    const f = await this.apiClient.getMembersByLabel(t, r);
    return this.cache.set(s, o, f), f;
  }
  async getMembersWithFilters(t, r = {}) {
    const s = "members-filtered", o = { filters: t, ...r }, l = this.cache.get(s, o);
    if (l)
      return l;
    const f = await this.apiClient.getMembersWithFilters(t, r);
    return this.cache.set(s, o, f), f;
  }
  // Pass-through methods that don't need caching
  async testConnection() {
    return this.apiClient.testConnection();
  }
  buildComplexFilter(t) {
    return this.apiClient.buildComplexFilter(t);
  }
  // Cache management methods
  clearCache() {
    this.cache.clear();
  }
  invalidateMembers() {
    this.cache.invalidate("members"), this.cache.invalidate("members-by-tier"), this.cache.invalidate("members-by-label"), this.cache.invalidate("members-filtered");
  }
  getCacheStats() {
    return this.cache.getStats();
  }
}
typeof window < "u" && (window.GhostMemberDirectory = {
  mount: WidgetMounter.mount,
  unmount: WidgetMounter.unmount,
  unmountAll: WidgetMounter.unmountAll
});
export {
  tl as $,
  Xf as A,
  Qu as B,
  Yf as C,
  ml as D,
  Mo as E,
  El as F,
  cl as G,
  hc as H,
  Ze as I,
  Fo as J,
  $u as K,
  Gf as L,
  na as M,
  ol as N,
  pa as O,
  ge as P,
  yl as Q,
  gl as R,
  it as S,
  il as T,
  we as U,
  Cu as V,
  Uf as W,
  Al as X,
  Ko as Y,
  Tt as Z,
  zf as _,
  ae as a,
  St as a0,
  rt as a1,
  Et as a2,
  rl as a3,
  Qf as a4,
  nl as a5,
  vt as a6,
  tr as a7,
  el as a8,
  Vf as a9,
  Kf as aa,
  al as ab,
  Wu as ac,
  ll as ad,
  dl as ae,
  fl as af,
  bl as ag,
  Ol as ah,
  Tl as ai,
  Ju as aj,
  vl as ak,
  wl as al,
  Rl as am,
  Lr as an,
  ht as ao,
  La as ap,
  Il as aq,
  sl as b,
  fc as c,
  Sl as d,
  gc as e,
  be as f,
  ea as g,
  _t as h,
  uc as i,
  rc as j,
  Pu as k,
  ko as l,
  Zt as m,
  ul as n,
  ds as o,
  vc as p,
  Jf as q,
  _l as r,
  pl as s,
  ut as t,
  Wf as u,
  Zf as v,
  hs as w,
  aa as x,
  hl as y,
  wc as z
};
