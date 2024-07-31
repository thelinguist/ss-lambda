var h = Object.defineProperty;
var p = (s, t, o) => t in s ? h(s, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : s[t] = o;
var i = (s, t, o) => p(s, typeof t != "symbol" ? t + "" : t, o);
let u = {};
const m = () => u, w = (s) => u = s, f = (s, t = 200, o = {}, e) => {
  var r;
  return {
    statusCode: t,
    isBase64Encoded: !1,
    headers: {
      "Access-Control-Allow-Origin": ((r = m()) == null ? void 0 : r.domain) || "*",
      "Access-Control-Allow-Credentials": !0,
      "Content-Type": "application/json",
      ...o
    },
    body: s ? JSON.stringify(s) : void 0
  };
};
class c extends Error {
  /**
   * @param message
   * @param statusCode if left out then lambda will return 500 with generic error and log actual error
   * @param reporting
   */
  constructor(o, e, r) {
    super(o);
    i(this, "statusCode");
    i(this, "reporting");
    if (this.statusCode = e, r)
      for (const a in r)
        this[a] = r[a];
    Object.setPrototypeOf(this, c.prototype);
  }
}
const C = (s, t) => {
  if (!t)
    try {
      return s.body ? JSON.parse(s.body) : s.body;
    } catch {
      throw new c("bad request", 400);
    }
};
function b(s) {
  const t = {
    Error: s.message
  };
  for (const o in s.reporting)
    o && (t[o] = s[o]);
  return t;
}
const A = {
  // eslint-disable-next-line no-console
  error: console.error,
  // eslint-disable-next-line no-console
  info: console.log,
  // eslint-disable-next-line no-console
  warn: console.warn
}, l = (s, t) => async (o, e, r) => {
  const { responsePassThru: a, bodyPassThru: d, validators: g } = t ?? {};
  try {
    d || (o.body = C(o, d)), await O(g, o, e, r);
    const n = await s(o, e, r);
    return a ? n : f(n, 200);
  } catch (n) {
    return A.error(n), f(b(n), n.statusCode ?? 500);
  }
}, O = async (s, t, o, e) => {
  try {
    s && (Array.isArray(s) ? await Promise.all(s.map((r) => r(t, o, e))) : await s(t, o, e));
  } catch (r) {
    throw r.statusCode || (r.statusCode = 400), r;
  }
};
let y = l;
const P = (s) => {
  w(s), y = l;
}, j = y;
export {
  c as ApiError,
  P as configure,
  j as default
};
