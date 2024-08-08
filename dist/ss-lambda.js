var h = Object.defineProperty;
var m = (e, r, s) => r in e ? h(e, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[r] = s;
var i = (e, r, s) => m(e, typeof r != "symbol" ? r + "" : r, s);
let l = {};
const y = () => l, w = (e) => l = e, d = (e, r = 200, s = {}, o) => {
  var t;
  return {
    statusCode: r,
    isBase64Encoded: !1,
    headers: {
      "Access-Control-Allow-Origin": ((t = y()) == null ? void 0 : t.domain) || "*",
      "Access-Control-Allow-Credentials": !0,
      "Content-Type": "application/json",
      ...s
    },
    ...o ? { cookies: o } : {},
    body: e ? JSON.stringify(e) : void 0
  };
}, j = (e) => {
  var r;
  return {
    isBase64Encoded: !1,
    headers: {
      "Access-Control-Allow-Origin": ((r = y()) == null ? void 0 : r.domain) || "*",
      "Access-Control-Allow-Credentials": !0,
      location: e
    },
    statusCode: 307,
    body: void 0
  };
};
class n extends Error {
  /**
   * @param message
   * @param statusCode if left out then lambda will return 500 with generic error and log actual error
   * @param reporting
   */
  constructor(s, o, t) {
    super(s);
    i(this, "statusCode");
    i(this, "reporting");
    this.name = "ApiError", this.statusCode = o, this.reporting = t, Object.setPrototypeOf(this, n.prototype);
  }
}
const C = (e, r) => {
  if (!r)
    try {
      return e.body ? JSON.parse(e.body) : e.body;
    } catch {
      throw new n("bad request", 400);
    }
};
function b(e) {
  const r = {
    Error: e.message
  };
  for (const s in e.reporting)
    r[s] = e.reporting[s];
  return r;
}
const A = {
  // eslint-disable-next-line no-console
  error: console.error,
  // eslint-disable-next-line no-console
  info: console.log,
  // eslint-disable-next-line no-console
  warn: console.warn
}, u = (e, r) => async (s, o, t) => {
  const { responsePassThru: g, bodyPassThru: c, validators: p } = r ?? {};
  try {
    c || (s.body = C(s, c)), await O(p, s, o, t);
    const a = await e(s, o, t);
    return g ? a : d(a, 200);
  } catch (a) {
    return A.error(a), d(b(a), a.statusCode ?? 500);
  }
}, O = async (e, r, s, o) => {
  try {
    e && (Array.isArray(e) ? await Promise.all(e.map((t) => t(r, s, o))) : await e(r, s, o));
  } catch (t) {
    throw t.statusCode || (t.statusCode = 400), t;
  }
}, P = (e, r) => (s) => {
  const o = s.headers.apiKey || s.headers.apikey || s.headers.ApiKey;
  if (!o)
    throw new n("apiKey expected", 400);
  if (o !== e)
    throw new n("apiKey not valid", 401, r);
}, K = (e) => (r) => {
  const s = e.filter((o) => !r.body[o]);
  if (s.length)
    throw new n(`missing required keys in body: ${s}`, 400);
}, E = (e) => (r) => {
  const s = e.filter((o) => !r.queryStringParameters[o]);
  if (s.length)
    throw new n(`missing required queryStringParams: ${s}`, 400);
}, q = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createApiChecker: P,
  createBodyValidator: K,
  createParamsValidator: E
}, Symbol.toStringTag, { value: "Module" }));
let f = u;
const B = (e) => {
  w(e), f = u;
}, T = f;
export {
  n as ApiError,
  B as configure,
  T as default,
  d as lambdaResponse,
  j as redirectResponse,
  q as validators
};
