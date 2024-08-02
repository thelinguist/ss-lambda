var p = Object.defineProperty;
var h = (s, o, r) => o in s ? p(s, o, { enumerable: !0, configurable: !0, writable: !0, value: r }) : s[o] = r;
var a = (s, o, r) => h(s, typeof o != "symbol" ? o + "" : o, r);
let u = {};
const m = () => u, w = (s) => u = s, d = (s, o = 200, r = {}, e) => {
  var t;
  return {
    statusCode: o,
    isBase64Encoded: !1,
    headers: {
      "Access-Control-Allow-Origin": ((t = m()) == null ? void 0 : t.domain) || "*",
      "Access-Control-Allow-Credentials": !0,
      "Content-Type": "application/json",
      ...r
    },
    body: s ? JSON.stringify(s) : void 0
  };
};
class i extends Error {
  /**
   * @param message
   * @param statusCode if left out then lambda will return 500 with generic error and log actual error
   * @param reporting
   */
  constructor(r, e, t) {
    super(r);
    a(this, "statusCode");
    a(this, "reporting");
    this.name = "ApiError", this.statusCode = e, this.reporting = t, Object.setPrototypeOf(this, i.prototype);
  }
}
const C = (s, o) => {
  if (!o)
    try {
      return s.body ? JSON.parse(s.body) : s.body;
    } catch {
      throw new i("bad request", 400);
    }
};
function b(s) {
  const o = {
    Error: s.message
  };
  for (const r in s.reporting)
    o[r] = s.reporting[r];
  return o;
}
const A = {
  // eslint-disable-next-line no-console
  error: console.error,
  // eslint-disable-next-line no-console
  info: console.log,
  // eslint-disable-next-line no-console
  warn: console.warn
}, f = (s, o) => async (r, e, t) => {
  const { responsePassThru: y, bodyPassThru: c, validators: g } = o ?? {};
  try {
    c || (r.body = C(r, c)), await E(g, r, e, t);
    const n = await s(r, e, t);
    return y ? n : d(n, 200);
  } catch (n) {
    return A.error(n), d(b(n), n.statusCode ?? 500);
  }
}, E = async (s, o, r, e) => {
  try {
    s && (Array.isArray(s) ? await Promise.all(s.map((t) => t(o, r, e))) : await s(o, r, e));
  } catch (t) {
    throw t.statusCode || (t.statusCode = 400), t;
  }
};
let l = f;
const P = (s) => {
  w(s), l = f;
}, j = l;
export {
  i as ApiError,
  P as configure,
  j as default
};
