/*! For license information please see build.js.LICENSE.txt */
(() => {
    var e, t, n = {
        20: (e, t, n) => {
            "use strict";
            var r = n(540), a = Symbol.for("react.element"), o = Symbol.for("react.fragment"),
                i = Object.prototype.hasOwnProperty,
                l = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
                s = {key: !0, ref: !0, __self: !0, __source: !0};

            function u(e, t, n) {
                var r, o = {}, u = null, c = null;
                for (r in void 0 !== n && (u = "" + n), void 0 !== t.key && (u = "" + t.key), void 0 !== t.ref && (c = t.ref), t) i.call(t, r) && !s.hasOwnProperty(r) && (o[r] = t[r]);
                if (e && e.defaultProps) for (r in t = e.defaultProps) void 0 === o[r] && (o[r] = t[r]);
                return {$$typeof: a, type: e, key: u, ref: c, props: o, _owner: l.current}
            }

            t.Fragment = o, t.jsx = u, t.jsxs = u
        }, 45: (e, t, n) => {
            "use strict";
            n.d(t, {QueryClientProvider: () => f, useQuery: () => C, useQueryClient: () => d});
            var r = n(428), a = n(961).unstable_batchedUpdates;
            r.j.setBatchNotifyFunction(a);
            var o = n(690), i = console;
            (0, o.B)(i);
            var l = n(540), s = l.createContext(void 0), u = l.createContext(!1);

            function c(e) {
                return e && "undefined" != typeof window ? (window.ReactQueryClientContext || (window.ReactQueryClientContext = s), window.ReactQueryClientContext) : s
            }

            var d = function () {
                var e = l.useContext(c(l.useContext(u)));
                if (!e) throw new Error("No QueryClient set, use QueryClientProvider to set one");
                return e
            }, f = function (e) {
                var t = e.client, n = e.contextSharing, r = void 0 !== n && n, a = e.children;
                l.useEffect((function () {
                    return t.mount(), function () {
                        t.unmount()
                    }
                }), [t]);
                var o = c(r);
                return l.createElement(u.Provider, {value: r}, l.createElement(o.Provider, {value: t}, a))
            }, p = n(168), h = n(159), m = n(941), g = n(289), y = n(668), v = n(281), b = function (e) {
                function t(t, n) {
                    var r;
                    return (r = e.call(this) || this).client = t, r.options = n, r.trackedProps = [], r.selectError = null, r.bindMethods(), r.setOptions(n), r
                }

                (0, h.A)(t, e);
                var n = t.prototype;
                return n.bindMethods = function () {
                    this.remove = this.remove.bind(this), this.refetch = this.refetch.bind(this)
                }, n.onSubscribe = function () {
                    1 === this.listeners.length && (this.currentQuery.addObserver(this), w(this.currentQuery, this.options) && this.executeFetch(), this.updateTimers())
                }, n.onUnsubscribe = function () {
                    this.listeners.length || this.destroy()
                }, n.shouldFetchOnReconnect = function () {
                    return x(this.currentQuery, this.options, this.options.refetchOnReconnect)
                }, n.shouldFetchOnWindowFocus = function () {
                    return x(this.currentQuery, this.options, this.options.refetchOnWindowFocus)
                }, n.destroy = function () {
                    this.listeners = [], this.clearTimers(), this.currentQuery.removeObserver(this)
                }, n.setOptions = function (e, t) {
                    var n = this.options, r = this.currentQuery;
                    if (this.options = this.client.defaultQueryObserverOptions(e), void 0 !== this.options.enabled && "boolean" != typeof this.options.enabled) throw new Error("Expected enabled to be a boolean");
                    this.options.queryKey || (this.options.queryKey = n.queryKey), this.updateQuery();
                    var a = this.hasListeners();
                    a && k(this.currentQuery, r, this.options, n) && this.executeFetch(), this.updateResult(t), !a || this.currentQuery === r && this.options.enabled === n.enabled && this.options.staleTime === n.staleTime || this.updateStaleTimeout();
                    var o = this.computeRefetchInterval();
                    !a || this.currentQuery === r && this.options.enabled === n.enabled && o === this.currentRefetchInterval || this.updateRefetchInterval(o)
                }, n.getOptimisticResult = function (e) {
                    var t = this.client.defaultQueryObserverOptions(e),
                        n = this.client.getQueryCache().build(this.client, t);
                    return this.createResult(n, t)
                }, n.getCurrentResult = function () {
                    return this.currentResult
                }, n.trackResult = function (e, t) {
                    var n = this, r = {}, a = function (e) {
                        n.trackedProps.includes(e) || n.trackedProps.push(e)
                    };
                    return Object.keys(e).forEach((function (t) {
                        Object.defineProperty(r, t, {
                            configurable: !1, enumerable: !0, get: function () {
                                return a(t), e[t]
                            }
                        })
                    })), (t.useErrorBoundary || t.suspense) && a("error"), r
                }, n.getNextResult = function (e) {
                    var t = this;
                    return new Promise((function (n, r) {
                        var a = t.subscribe((function (t) {
                            t.isFetching || (a(), t.isError && (null == e ? void 0 : e.throwOnError) ? r(t.error) : n(t))
                        }))
                    }))
                }, n.getCurrentQuery = function () {
                    return this.currentQuery
                }, n.remove = function () {
                    this.client.getQueryCache().remove(this.currentQuery)
                }, n.refetch = function (e) {
                    return this.fetch((0, p.A)({}, e, {meta: {refetchPage: null == e ? void 0 : e.refetchPage}}))
                }, n.fetchOptimistic = function (e) {
                    var t = this, n = this.client.defaultQueryObserverOptions(e),
                        r = this.client.getQueryCache().build(this.client, n);
                    return r.fetch().then((function () {
                        return t.createResult(r, n)
                    }))
                }, n.fetch = function (e) {
                    var t = this;
                    return this.executeFetch(e).then((function () {
                        return t.updateResult(), t.currentResult
                    }))
                }, n.executeFetch = function (e) {
                    this.updateQuery();
                    var t = this.currentQuery.fetch(this.options, e);
                    return (null == e ? void 0 : e.throwOnError) || (t = t.catch(m.lQ)), t
                }, n.updateStaleTimeout = function () {
                    var e = this;
                    if (this.clearStaleTimeout(), !m.S$ && !this.currentResult.isStale && (0, m.gn)(this.options.staleTime)) {
                        var t = (0, m.j3)(this.currentResult.dataUpdatedAt, this.options.staleTime) + 1;
                        this.staleTimeoutId = setTimeout((function () {
                            e.currentResult.isStale || e.updateResult()
                        }), t)
                    }
                }, n.computeRefetchInterval = function () {
                    var e;
                    return "function" == typeof this.options.refetchInterval ? this.options.refetchInterval(this.currentResult.data, this.currentQuery) : null != (e = this.options.refetchInterval) && e
                }, n.updateRefetchInterval = function (e) {
                    var t = this;
                    this.clearRefetchInterval(), this.currentRefetchInterval = e, !m.S$ && !1 !== this.options.enabled && (0, m.gn)(this.currentRefetchInterval) && 0 !== this.currentRefetchInterval && (this.refetchIntervalId = setInterval((function () {
                        (t.options.refetchIntervalInBackground || g.m.isFocused()) && t.executeFetch()
                    }), this.currentRefetchInterval))
                }, n.updateTimers = function () {
                    this.updateStaleTimeout(), this.updateRefetchInterval(this.computeRefetchInterval())
                }, n.clearTimers = function () {
                    this.clearStaleTimeout(), this.clearRefetchInterval()
                }, n.clearStaleTimeout = function () {
                    this.staleTimeoutId && (clearTimeout(this.staleTimeoutId), this.staleTimeoutId = void 0)
                }, n.clearRefetchInterval = function () {
                    this.refetchIntervalId && (clearInterval(this.refetchIntervalId), this.refetchIntervalId = void 0)
                }, n.createResult = function (e, t) {
                    var n, r = this.currentQuery, a = this.options, i = this.currentResult, l = this.currentResultState,
                        s = this.currentResultOptions, u = e !== r, c = u ? e.state : this.currentQueryInitialState,
                        d = u ? this.currentResult : this.previousQueryResult, f = e.state, p = f.dataUpdatedAt,
                        h = f.error, g = f.errorUpdatedAt, y = f.isFetching, v = f.status, b = !1, x = !1;
                    if (t.optimisticResults) {
                        var S = this.hasListeners(), N = !S && w(e, t), j = S && k(e, r, t, a);
                        (N || j) && (y = !0, p || (v = "loading"))
                    }
                    if (t.keepPreviousData && !f.dataUpdateCount && (null == d ? void 0 : d.isSuccess) && "error" !== v) n = d.data, p = d.dataUpdatedAt, v = d.status, b = !0; else if (t.select && void 0 !== f.data) if (i && f.data === (null == l ? void 0 : l.data) && t.select === this.selectFn) n = this.selectResult; else try {
                        this.selectFn = t.select, n = t.select(f.data), !1 !== t.structuralSharing && (n = (0, m.BH)(null == i ? void 0 : i.data, n)), this.selectResult = n, this.selectError = null
                    } catch (e) {
                        (0, o.t)().error(e), this.selectError = e
                    } else n = f.data;
                    if (void 0 !== t.placeholderData && void 0 === n && ("loading" === v || "idle" === v)) {
                        var C;
                        if ((null == i ? void 0 : i.isPlaceholderData) && t.placeholderData === (null == s ? void 0 : s.placeholderData)) C = i.data; else if (C = "function" == typeof t.placeholderData ? t.placeholderData() : t.placeholderData, t.select && void 0 !== C) try {
                            C = t.select(C), !1 !== t.structuralSharing && (C = (0, m.BH)(null == i ? void 0 : i.data, C)), this.selectError = null
                        } catch (e) {
                            (0, o.t)().error(e), this.selectError = e
                        }
                        void 0 !== C && (v = "success", n = C, x = !0)
                    }
                    return this.selectError && (h = this.selectError, n = this.selectResult, g = Date.now(), v = "error"), {
                        status: v,
                        isLoading: "loading" === v,
                        isSuccess: "success" === v,
                        isError: "error" === v,
                        isIdle: "idle" === v,
                        data: n,
                        dataUpdatedAt: p,
                        error: h,
                        errorUpdatedAt: g,
                        failureCount: f.fetchFailureCount,
                        errorUpdateCount: f.errorUpdateCount,
                        isFetched: f.dataUpdateCount > 0 || f.errorUpdateCount > 0,
                        isFetchedAfterMount: f.dataUpdateCount > c.dataUpdateCount || f.errorUpdateCount > c.errorUpdateCount,
                        isFetching: y,
                        isRefetching: y && "loading" !== v,
                        isLoadingError: "error" === v && 0 === f.dataUpdatedAt,
                        isPlaceholderData: x,
                        isPreviousData: b,
                        isRefetchError: "error" === v && 0 !== f.dataUpdatedAt,
                        isStale: _(e, t),
                        refetch: this.refetch,
                        remove: this.remove
                    }
                }, n.shouldNotifyListeners = function (e, t) {
                    if (!t) return !0;
                    var n = this.options, r = n.notifyOnChangeProps, a = n.notifyOnChangePropsExclusions;
                    if (!r && !a) return !0;
                    if ("tracked" === r && !this.trackedProps.length) return !0;
                    var o = "tracked" === r ? this.trackedProps : r;
                    return Object.keys(e).some((function (n) {
                        var r = n, i = e[r] !== t[r], l = null == o ? void 0 : o.some((function (e) {
                            return e === n
                        })), s = null == a ? void 0 : a.some((function (e) {
                            return e === n
                        }));
                        return i && !s && (!o || l)
                    }))
                }, n.updateResult = function (e) {
                    var t = this.currentResult;
                    if (this.currentResult = this.createResult(this.currentQuery, this.options), this.currentResultState = this.currentQuery.state, this.currentResultOptions = this.options, !(0, m.f8)(this.currentResult, t)) {
                        var n = {cache: !0};
                        !1 !== (null == e ? void 0 : e.listeners) && this.shouldNotifyListeners(this.currentResult, t) && (n.listeners = !0), this.notify((0, p.A)({}, n, e))
                    }
                }, n.updateQuery = function () {
                    var e = this.client.getQueryCache().build(this.client, this.options);
                    if (e !== this.currentQuery) {
                        var t = this.currentQuery;
                        this.currentQuery = e, this.currentQueryInitialState = e.state, this.previousQueryResult = this.currentResult, this.hasListeners() && (null == t || t.removeObserver(this), e.addObserver(this))
                    }
                }, n.onQueryUpdate = function (e) {
                    var t = {};
                    "success" === e.type ? t.onSuccess = !0 : "error" !== e.type || (0, v.wm)(e.error) || (t.onError = !0), this.updateResult(t), this.hasListeners() && this.updateTimers()
                }, n.notify = function (e) {
                    var t = this;
                    r.j.batch((function () {
                        e.onSuccess ? (null == t.options.onSuccess || t.options.onSuccess(t.currentResult.data), null == t.options.onSettled || t.options.onSettled(t.currentResult.data, null)) : e.onError && (null == t.options.onError || t.options.onError(t.currentResult.error), null == t.options.onSettled || t.options.onSettled(void 0, t.currentResult.error)), e.listeners && t.listeners.forEach((function (e) {
                            e(t.currentResult)
                        })), e.cache && t.client.getQueryCache().notify({
                            query: t.currentQuery,
                            type: "observerResultsUpdated"
                        })
                    }))
                }, t
            }(y.Q);

            function w(e, t) {
                return function (e, t) {
                    return !(!1 === t.enabled || e.state.dataUpdatedAt || "error" === e.state.status && !1 === t.retryOnMount)
                }(e, t) || e.state.dataUpdatedAt > 0 && x(e, t, t.refetchOnMount)
            }

            function x(e, t, n) {
                if (!1 !== t.enabled) {
                    var r = "function" == typeof n ? n(e) : n;
                    return "always" === r || !1 !== r && _(e, t)
                }
                return !1
            }

            function k(e, t, n, r) {
                return !1 !== n.enabled && (e !== t || !1 === r.enabled) && (!n.suspense || "error" !== e.state.status) && _(e, n)
            }

            function _(e, t) {
                return e.isStaleByTime(t.staleTime)
            }

            var S, N = l.createContext((S = !1, {
                clearReset: function () {
                    S = !1
                }, reset: function () {
                    S = !0
                }, isReset: function () {
                    return S
                }
            })), j = function () {
                return l.useContext(N)
            };

            function C(e, t, n) {
                return function (e, t) {
                    var n = l.useRef(!1), a = l.useState(0)[1], o = d(), i = j(), s = o.defaultQueryObserverOptions(e);
                    s.optimisticResults = !0, s.onError && (s.onError = r.j.batchCalls(s.onError)), s.onSuccess && (s.onSuccess = r.j.batchCalls(s.onSuccess)), s.onSettled && (s.onSettled = r.j.batchCalls(s.onSettled)), s.suspense && ("number" != typeof s.staleTime && (s.staleTime = 1e3), 0 === s.cacheTime && (s.cacheTime = 1)), (s.suspense || s.useErrorBoundary) && (i.isReset() || (s.retryOnMount = !1));
                    var u, c, f, p = l.useState((function () {
                        return new t(o, s)
                    }))[0], h = p.getOptimisticResult(s);
                    if (l.useEffect((function () {
                        n.current = !0, i.clearReset();
                        var e = p.subscribe(r.j.batchCalls((function () {
                            n.current && a((function (e) {
                                return e + 1
                            }))
                        })));
                        return p.updateResult(), function () {
                            n.current = !1, e()
                        }
                    }), [i, p]), l.useEffect((function () {
                        p.setOptions(s, {listeners: !1})
                    }), [s, p]), s.suspense && h.isLoading) throw p.fetchOptimistic(s).then((function (e) {
                        var t = e.data;
                        null == s.onSuccess || s.onSuccess(t), null == s.onSettled || s.onSettled(t, null)
                    })).catch((function (e) {
                        i.clearReset(), null == s.onError || s.onError(e), null == s.onSettled || s.onSettled(void 0, e)
                    }));
                    if (h.isError && !i.isReset() && !h.isFetching && (u = s.suspense, c = s.useErrorBoundary, f = [h.error, p.getCurrentQuery()], "function" == typeof c ? c.apply(void 0, f) : "boolean" == typeof c ? c : u)) throw h.error;
                    return "tracked" === s.notifyOnChangeProps && (h = p.trackResult(h, s)), h
                }((0, m.vh)(e, t, n), b)
            }
        }, 56: (e, t, n) => {
            "use strict";
            e.exports = function (e) {
                var t = n.nc;
                t && e.setAttribute("nonce", t)
            }
        }, 72: e => {
            "use strict";
            var t = [];

            function n(e) {
                for (var n = -1, r = 0; r < t.length; r++) if (t[r].identifier === e) {
                    n = r;
                    break
                }
                return n
            }

            function r(e, r) {
                for (var o = {}, i = [], l = 0; l < e.length; l++) {
                    var s = e[l], u = r.base ? s[0] + r.base : s[0], c = o[u] || 0, d = "".concat(u, " ").concat(c);
                    o[u] = c + 1;
                    var f = n(d), p = {css: s[1], media: s[2], sourceMap: s[3], supports: s[4], layer: s[5]};
                    if (-1 !== f) t[f].references++, t[f].updater(p); else {
                        var h = a(p, r);
                        r.byIndex = l, t.splice(l, 0, {identifier: d, updater: h, references: 1})
                    }
                    i.push(d)
                }
                return i
            }

            function a(e, t) {
                var n = t.domAPI(t);
                return n.update(e), function (t) {
                    if (t) {
                        if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap && t.supports === e.supports && t.layer === e.layer) return;
                        n.update(e = t)
                    } else n.remove()
                }
            }

            e.exports = function (e, a) {
                var o = r(e = e || [], a = a || {});
                return function (e) {
                    e = e || [];
                    for (var i = 0; i < o.length; i++) {
                        var l = n(o[i]);
                        t[l].references--
                    }
                    for (var s = r(e, a), u = 0; u < o.length; u++) {
                        var c = n(o[u]);
                        0 === t[c].references && (t[c].updater(), t.splice(c, 1))
                    }
                    o = s
                }
            }
        }, 113: e => {
            "use strict";
            e.exports = function (e, t) {
                if (t.styleSheet) t.styleSheet.cssText = e; else {
                    for (; t.firstChild;) t.removeChild(t.firstChild);
                    t.appendChild(document.createTextNode(e))
                }
            }
        }, 159: (e, t, n) => {
            "use strict";

            function r(e, t) {
                return r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
                    return e.__proto__ = t, e
                }, r(e, t)
            }

            function a(e, t) {
                e.prototype = Object.create(t.prototype), e.prototype.constructor = e, r(e, t)
            }

            n.d(t, {A: () => a})
        }, 168: (e, t, n) => {
            "use strict";

            function r() {
                return r = Object.assign ? Object.assign.bind() : function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                }, r.apply(null, arguments)
            }

            n.d(t, {A: () => r})
        }, 213: function (e, t, n) {
            var r, a;
            void 0 === (a = "function" == typeof (r = function () {
                "use strict";

                function t(e, t, n) {
                    var r = new XMLHttpRequest;
                    r.open("GET", e), r.responseType = "blob", r.onload = function () {
                        l(r.response, t, n)
                    }, r.onerror = function () {
                        console.error("could not download file")
                    }, r.send()
                }

                function r(e) {
                    var t = new XMLHttpRequest;
                    t.open("HEAD", e, !1);
                    try {
                        t.send()
                    } catch (e) {
                    }
                    return 200 <= t.status && 299 >= t.status
                }

                function a(e) {
                    try {
                        e.dispatchEvent(new MouseEvent("click"))
                    } catch (n) {
                        var t = document.createEvent("MouseEvents");
                        t.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(t)
                    }
                }

                var o = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof n.g && n.g.global === n.g ? n.g : void 0,
                    i = o.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent),
                    l = o.saveAs || ("object" != typeof window || window !== o ? function () {
                    } : "download" in HTMLAnchorElement.prototype && !i ? function (e, n, i) {
                        var l = o.URL || o.webkitURL, s = document.createElement("a");
                        n = n || e.name || "download", s.download = n, s.rel = "noopener", "string" == typeof e ? (s.href = e, s.origin === location.origin ? a(s) : r(s.href) ? t(e, n, i) : a(s, s.target = "_blank")) : (s.href = l.createObjectURL(e), setTimeout((function () {
                            l.revokeObjectURL(s.href)
                        }), 4e4), setTimeout((function () {
                            a(s)
                        }), 0))
                    } : "msSaveOrOpenBlob" in navigator ? function (e, n, o) {
                        if (n = n || e.name || "download", "string" != typeof e) navigator.msSaveOrOpenBlob(function (e, t) {
                            return void 0 === t ? t = {autoBom: !1} : "object" != typeof t && (console.warn("Deprecated: Expected third argument to be a object"), t = {autoBom: !t}), t.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\ufeff", e], {type: e.type}) : e
                        }(e, o), n); else if (r(e)) t(e, n, o); else {
                            var i = document.createElement("a");
                            i.href = e, i.target = "_blank", setTimeout((function () {
                                a(i)
                            }))
                        }
                    } : function (e, n, r, a) {
                        if ((a = a || open("", "_blank")) && (a.document.title = a.document.body.innerText = "downloading..."), "string" == typeof e) return t(e, n, r);
                        var l = "application/octet-stream" === e.type,
                            s = /constructor/i.test(o.HTMLElement) || o.safari,
                            u = /CriOS\/[\d]+/.test(navigator.userAgent);
                        if ((u || l && s || i) && "undefined" != typeof FileReader) {
                            var c = new FileReader;
                            c.onloadend = function () {
                                var e = c.result;
                                e = u ? e : e.replace(/^data:[^;]*;/, "data:attachment/file;"), a ? a.location.href = e : location = e, a = null
                            }, c.readAsDataURL(e)
                        } else {
                            var d = o.URL || o.webkitURL, f = d.createObjectURL(e);
                            a ? a.location = f : location.href = f, a = null, setTimeout((function () {
                                d.revokeObjectURL(f)
                            }), 4e4)
                        }
                    });
                o.saveAs = l.saveAs = l, e.exports = l
            }) ? r.apply(t, []) : r) || (e.exports = a)
        }, 232: (e, t, n) => {
            "use strict";
            n.d(t, {A: () => l});
            var r = n(601), a = n.n(r), o = n(314), i = n.n(o)()(a());
            i.push([e.id, ".svg{\n    display: none;\n}\n.img-container:hover .svg{\n        display: block;\n    }\n.glow-svg {\n    filter: drop-shadow(0 0 25px blue); /* Adjust the values as needed */\n  }\n@media (max-width: 639px) {\n    .titlesContainer {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n}\n@media (min-width: 639px) {\n    .titlesContainer {\n        display: grid;\n    }\n}\n  ", ""]);
            const l = i
        }, 251: (e, t) => {
            t.read = function (e, t, n, r, a) {
                var o, i, l = 8 * a - r - 1, s = (1 << l) - 1, u = s >> 1, c = -7, d = n ? a - 1 : 0, f = n ? -1 : 1,
                    p = e[t + d];
                for (d += f, o = p & (1 << -c) - 1, p >>= -c, c += l; c > 0; o = 256 * o + e[t + d], d += f, c -= 8) ;
                for (i = o & (1 << -c) - 1, o >>= -c, c += r; c > 0; i = 256 * i + e[t + d], d += f, c -= 8) ;
                if (0 === o) o = 1 - u; else {
                    if (o === s) return i ? NaN : 1 / 0 * (p ? -1 : 1);
                    i += Math.pow(2, r), o -= u
                }
                return (p ? -1 : 1) * i * Math.pow(2, o - r)
            }, t.write = function (e, t, n, r, a, o) {
                var i, l, s, u = 8 * o - a - 1, c = (1 << u) - 1, d = c >> 1,
                    f = 23 === a ? Math.pow(2, -24) - Math.pow(2, -77) : 0, p = r ? 0 : o - 1, h = r ? 1 : -1,
                    m = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
                for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (l = isNaN(t) ? 1 : 0, i = c) : (i = Math.floor(Math.log(t) / Math.LN2), t * (s = Math.pow(2, -i)) < 1 && (i--, s *= 2), (t += i + d >= 1 ? f / s : f * Math.pow(2, 1 - d)) * s >= 2 && (i++, s /= 2), i + d >= c ? (l = 0, i = c) : i + d >= 1 ? (l = (t * s - 1) * Math.pow(2, a), i += d) : (l = t * Math.pow(2, d - 1) * Math.pow(2, a), i = 0)); a >= 8; e[n + p] = 255 & l, p += h, l /= 256, a -= 8) ;
                for (i = i << a | l, u += a; u > 0; e[n + p] = 255 & i, p += h, i /= 256, u -= 8) ;
                e[n + p - h] |= 128 * m
            }
        }, 281: (e, t, n) => {
            "use strict";
            n.d(t, {dd: () => l, eJ: () => c, wm: () => u});
            var r = n(289), a = n(622), o = n(941);

            function i(e) {
                return Math.min(1e3 * Math.pow(2, e), 3e4)
            }

            function l(e) {
                return "function" == typeof (null == e ? void 0 : e.cancel)
            }

            var s = function (e) {
                this.revert = null == e ? void 0 : e.revert, this.silent = null == e ? void 0 : e.silent
            };

            function u(e) {
                return e instanceof s
            }

            var c = function (e) {
                var t, n, u, c, d = this, f = !1;
                this.abort = e.abort, this.cancel = function (e) {
                    return null == t ? void 0 : t(e)
                }, this.cancelRetry = function () {
                    f = !0
                }, this.continueRetry = function () {
                    f = !1
                }, this.continue = function () {
                    return null == n ? void 0 : n()
                }, this.failureCount = 0, this.isPaused = !1, this.isResolved = !1, this.isTransportCancelable = !1, this.promise = new Promise((function (e, t) {
                    u = e, c = t
                }));
                var p = function (t) {
                    d.isResolved || (d.isResolved = !0, null == e.onSuccess || e.onSuccess(t), null == n || n(), u(t))
                }, h = function (t) {
                    d.isResolved || (d.isResolved = !0, null == e.onError || e.onError(t), null == n || n(), c(t))
                };
                !function u() {
                    if (!d.isResolved) {
                        var c;
                        try {
                            c = e.fn()
                        } catch (e) {
                            c = Promise.reject(e)
                        }
                        t = function (e) {
                            if (!d.isResolved && (h(new s(e)), null == d.abort || d.abort(), l(c))) try {
                                c.cancel()
                            } catch (e) {
                            }
                        }, d.isTransportCancelable = l(c), Promise.resolve(c).then(p).catch((function (t) {
                            var l, s;
                            if (!d.isResolved) {
                                var c = null != (l = e.retry) ? l : 3, p = null != (s = e.retryDelay) ? s : i,
                                    m = "function" == typeof p ? p(d.failureCount, t) : p,
                                    g = !0 === c || "number" == typeof c && d.failureCount < c || "function" == typeof c && c(d.failureCount, t);
                                !f && g ? (d.failureCount++, null == e.onFail || e.onFail(d.failureCount, t), (0, o.yy)(m).then((function () {
                                    if (!r.m.isFocused() || !a.t.isOnline()) return new Promise((function (t) {
                                        n = t, d.isPaused = !0, null == e.onPause || e.onPause()
                                    })).then((function () {
                                        n = void 0, d.isPaused = !1, null == e.onContinue || e.onContinue()
                                    }))
                                })).then((function () {
                                    f ? h(t) : u()
                                }))) : h(t)
                            }
                        }))
                    }
                }()
            }
        }, 287: (e, t) => {
            "use strict";
            var n = Symbol.for("react.element"), r = Symbol.for("react.portal"), a = Symbol.for("react.fragment"),
                o = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), l = Symbol.for("react.provider"),
                s = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"),
                d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), p = Symbol.iterator, h = {
                    isMounted: function () {
                        return !1
                    }, enqueueForceUpdate: function () {
                    }, enqueueReplaceState: function () {
                    }, enqueueSetState: function () {
                    }
                }, m = Object.assign, g = {};

            function y(e, t, n) {
                this.props = e, this.context = t, this.refs = g, this.updater = n || h
            }

            function v() {
            }

            function b(e, t, n) {
                this.props = e, this.context = t, this.refs = g, this.updater = n || h
            }

            y.prototype.isReactComponent = {}, y.prototype.setState = function (e, t) {
                if ("object" != typeof e && "function" != typeof e && null != e) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
                this.updater.enqueueSetState(this, e, t, "setState")
            }, y.prototype.forceUpdate = function (e) {
                this.updater.enqueueForceUpdate(this, e, "forceUpdate")
            }, v.prototype = y.prototype;
            var w = b.prototype = new v;
            w.constructor = b, m(w, y.prototype), w.isPureReactComponent = !0;
            var x = Array.isArray, k = Object.prototype.hasOwnProperty, _ = {current: null},
                S = {key: !0, ref: !0, __self: !0, __source: !0};

            function N(e, t, r) {
                var a, o = {}, i = null, l = null;
                if (null != t) for (a in void 0 !== t.ref && (l = t.ref), void 0 !== t.key && (i = "" + t.key), t) k.call(t, a) && !S.hasOwnProperty(a) && (o[a] = t[a]);
                var s = arguments.length - 2;
                if (1 === s) o.children = r; else if (1 < s) {
                    for (var u = Array(s), c = 0; c < s; c++) u[c] = arguments[c + 2];
                    o.children = u
                }
                if (e && e.defaultProps) for (a in s = e.defaultProps) void 0 === o[a] && (o[a] = s[a]);
                return {$$typeof: n, type: e, key: i, ref: l, props: o, _owner: _.current}
            }

            function j(e) {
                return "object" == typeof e && null !== e && e.$$typeof === n
            }

            var C = /\/+/g;

            function P(e, t) {
                return "object" == typeof e && null !== e && null != e.key ? function (e) {
                    var t = {"=": "=0", ":": "=2"};
                    return "$" + e.replace(/[=:]/g, (function (e) {
                        return t[e]
                    }))
                }("" + e.key) : t.toString(36)
            }

            function E(e, t, a, o, i) {
                var l = typeof e;
                "undefined" !== l && "boolean" !== l || (e = null);
                var s = !1;
                if (null === e) s = !0; else switch (l) {
                    case"string":
                    case"number":
                        s = !0;
                        break;
                    case"object":
                        switch (e.$$typeof) {
                            case n:
                            case r:
                                s = !0
                        }
                }
                if (s) return i = i(s = e), e = "" === o ? "." + P(s, 0) : o, x(i) ? (a = "", null != e && (a = e.replace(C, "$&/") + "/"), E(i, t, a, "", (function (e) {
                    return e
                }))) : null != i && (j(i) && (i = function (e, t) {
                    return {$$typeof: n, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner}
                }(i, a + (!i.key || s && s.key === i.key ? "" : ("" + i.key).replace(C, "$&/") + "/") + e)), t.push(i)), 1;
                if (s = 0, o = "" === o ? "." : o + ":", x(e)) for (var u = 0; u < e.length; u++) {
                    var c = o + P(l = e[u], u);
                    s += E(l, t, a, c, i)
                } else if (c = function (e) {
                    return null === e || "object" != typeof e ? null : "function" == typeof (e = p && e[p] || e["@@iterator"]) ? e : null
                }(e), "function" == typeof c) for (e = c.call(e), u = 0; !(l = e.next()).done;) s += E(l = l.value, t, a, c = o + P(l, u++), i); else if ("object" === l) throw t = String(e), Error("Objects are not valid as a React child (found: " + ("[object Object]" === t ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
                return s
            }

            function A(e, t, n) {
                if (null == e) return e;
                var r = [], a = 0;
                return E(e, r, "", "", (function (e) {
                    return t.call(n, e, a++)
                })), r
            }

            function I(e) {
                if (-1 === e._status) {
                    var t = e._result;
                    (t = t()).then((function (t) {
                        0 !== e._status && -1 !== e._status || (e._status = 1, e._result = t)
                    }), (function (t) {
                        0 !== e._status && -1 !== e._status || (e._status = 2, e._result = t)
                    })), -1 === e._status && (e._status = 0, e._result = t)
                }
                if (1 === e._status) return e._result.default;
                throw e._result
            }

            var L = {current: null}, T = {transition: null},
                O = {ReactCurrentDispatcher: L, ReactCurrentBatchConfig: T, ReactCurrentOwner: _};
            t.Children = {
                map: A, forEach: function (e, t, n) {
                    A(e, (function () {
                        t.apply(this, arguments)
                    }), n)
                }, count: function (e) {
                    var t = 0;
                    return A(e, (function () {
                        t++
                    })), t
                }, toArray: function (e) {
                    return A(e, (function (e) {
                        return e
                    })) || []
                }, only: function (e) {
                    if (!j(e)) throw Error("React.Children.only expected to receive a single React element child.");
                    return e
                }
            }, t.Component = y, t.Fragment = a, t.Profiler = i, t.PureComponent = b, t.StrictMode = o, t.Suspense = c, t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = O, t.cloneElement = function (e, t, r) {
                if (null == e) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
                var a = m({}, e.props), o = e.key, i = e.ref, l = e._owner;
                if (null != t) {
                    if (void 0 !== t.ref && (i = t.ref, l = _.current), void 0 !== t.key && (o = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
                    for (u in t) k.call(t, u) && !S.hasOwnProperty(u) && (a[u] = void 0 === t[u] && void 0 !== s ? s[u] : t[u])
                }
                var u = arguments.length - 2;
                if (1 === u) a.children = r; else if (1 < u) {
                    s = Array(u);
                    for (var c = 0; c < u; c++) s[c] = arguments[c + 2];
                    a.children = s
                }
                return {$$typeof: n, type: e.type, key: o, ref: i, props: a, _owner: l}
            }, t.createContext = function (e) {
                return (e = {
                    $$typeof: s,
                    _currentValue: e,
                    _currentValue2: e,
                    _threadCount: 0,
                    Provider: null,
                    Consumer: null,
                    _defaultValue: null,
                    _globalName: null
                }).Provider = {$$typeof: l, _context: e}, e.Consumer = e
            }, t.createElement = N, t.createFactory = function (e) {
                var t = N.bind(null, e);
                return t.type = e, t
            }, t.createRef = function () {
                return {current: null}
            }, t.forwardRef = function (e) {
                return {$$typeof: u, render: e}
            }, t.isValidElement = j, t.lazy = function (e) {
                return {$$typeof: f, _payload: {_status: -1, _result: e}, _init: I}
            }, t.memo = function (e, t) {
                return {$$typeof: d, type: e, compare: void 0 === t ? null : t}
            }, t.startTransition = function (e) {
                var t = T.transition;
                T.transition = {};
                try {
                    e()
                } finally {
                    T.transition = t
                }
            }, t.unstable_act = function () {
                throw Error("act(...) is not supported in production builds of React.")
            }, t.useCallback = function (e, t) {
                return L.current.useCallback(e, t)
            }, t.useContext = function (e) {
                return L.current.useContext(e)
            }, t.useDebugValue = function () {
            }, t.useDeferredValue = function (e) {
                return L.current.useDeferredValue(e)
            }, t.useEffect = function (e, t) {
                return L.current.useEffect(e, t)
            }, t.useId = function () {
                return L.current.useId()
            }, t.useImperativeHandle = function (e, t, n) {
                return L.current.useImperativeHandle(e, t, n)
            }, t.useInsertionEffect = function (e, t) {
                return L.current.useInsertionEffect(e, t)
            }, t.useLayoutEffect = function (e, t) {
                return L.current.useLayoutEffect(e, t)
            }, t.useMemo = function (e, t) {
                return L.current.useMemo(e, t)
            }, t.useReducer = function (e, t, n) {
                return L.current.useReducer(e, t, n)
            }, t.useRef = function (e) {
                return L.current.useRef(e)
            }, t.useState = function (e) {
                return L.current.useState(e)
            }, t.useSyncExternalStore = function (e, t, n) {
                return L.current.useSyncExternalStore(e, t, n)
            }, t.useTransition = function () {
                return L.current.useTransition()
            }, t.version = "18.2.0"
        }, 289: (e, t, n) => {
            "use strict";
            n.d(t, {m: () => i});
            var r = n(159), a = n(668), o = n(941), i = new (function (e) {
                function t() {
                    var t;
                    return (t = e.call(this) || this).setup = function (e) {
                        var t;
                        if (!o.S$ && (null == (t = window) ? void 0 : t.addEventListener)) {
                            var n = function () {
                                return e()
                            };
                            return window.addEventListener("visibilitychange", n, !1), window.addEventListener("focus", n, !1), function () {
                                window.removeEventListener("visibilitychange", n), window.removeEventListener("focus", n)
                            }
                        }
                    }, t
                }

                (0, r.A)(t, e);
                var n = t.prototype;
                return n.onSubscribe = function () {
                    this.cleanup || this.setEventListener(this.setup)
                }, n.onUnsubscribe = function () {
                    var e;
                    this.hasListeners() || (null == (e = this.cleanup) || e.call(this), this.cleanup = void 0)
                }, n.setEventListener = function (e) {
                    var t, n = this;
                    this.setup = e, null == (t = this.cleanup) || t.call(this), this.cleanup = e((function (e) {
                        "boolean" == typeof e ? n.setFocused(e) : n.onFocus()
                    }))
                }, n.setFocused = function (e) {
                    this.focused = e, e && this.onFocus()
                }, n.onFocus = function () {
                    this.listeners.forEach((function (e) {
                        e()
                    }))
                }, n.isFocused = function () {
                    return "boolean" == typeof this.focused ? this.focused : "undefined" == typeof document || [void 0, "visible", "prerender"].includes(document.visibilityState)
                }, t
            }(a.Q))
        }, 314: e => {
            "use strict";
            e.exports = function (e) {
                var t = [];
                return t.toString = function () {
                    return this.map((function (t) {
                        var n = "", r = void 0 !== t[5];
                        return t[4] && (n += "@supports (".concat(t[4], ") {")), t[2] && (n += "@media ".concat(t[2], " {")), r && (n += "@layer".concat(t[5].length > 0 ? " ".concat(t[5]) : "", " {")), n += e(t), r && (n += "}"), t[2] && (n += "}"), t[4] && (n += "}"), n
                    })).join("")
                }, t.i = function (e, n, r, a, o) {
                    "string" == typeof e && (e = [[null, e, void 0]]);
                    var i = {};
                    if (r) for (var l = 0; l < this.length; l++) {
                        var s = this[l][0];
                        null != s && (i[s] = !0)
                    }
                    for (var u = 0; u < e.length; u++) {
                        var c = [].concat(e[u]);
                        r && i[c[0]] || (void 0 !== o && (void 0 === c[5] || (c[1] = "@layer".concat(c[5].length > 0 ? " ".concat(c[5]) : "", " {").concat(c[1], "}")), c[5] = o), n && (c[2] ? (c[1] = "@media ".concat(c[2], " {").concat(c[1], "}"), c[2] = n) : c[2] = n), a && (c[4] ? (c[1] = "@supports (".concat(c[4], ") {").concat(c[1], "}"), c[4] = a) : c[4] = "".concat(a)), t.push(c))
                    }
                }, t
            }
        }, 338: (e, t, n) => {
            "use strict";
            var r = n(961);
            t.H = r.createRoot, r.hydrateRoot
        }, 428: (e, t, n) => {
            "use strict";
            n.d(t, {j: () => a});
            var r = n(941), a = new (function () {
                function e() {
                    this.queue = [], this.transactions = 0, this.notifyFn = function (e) {
                        e()
                    }, this.batchNotifyFn = function (e) {
                        e()
                    }
                }

                var t = e.prototype;
                return t.batch = function (e) {
                    var t;
                    this.transactions++;
                    try {
                        t = e()
                    } finally {
                        this.transactions--, this.transactions || this.flush()
                    }
                    return t
                }, t.schedule = function (e) {
                    var t = this;
                    this.transactions ? this.queue.push(e) : (0, r.G6)((function () {
                        t.notifyFn(e)
                    }))
                }, t.batchCalls = function (e) {
                    var t = this;
                    return function () {
                        for (var n = arguments.length, r = new Array(n), a = 0; a < n; a++) r[a] = arguments[a];
                        t.schedule((function () {
                            e.apply(void 0, r)
                        }))
                    }
                }, t.flush = function () {
                    var e = this, t = this.queue;
                    this.queue = [], t.length && (0, r.G6)((function () {
                        e.batchNotifyFn((function () {
                            t.forEach((function (t) {
                                e.notifyFn(t)
                            }))
                        }))
                    }))
                }, t.setNotifyFunction = function (e) {
                    this.notifyFn = e
                }, t.setBatchNotifyFunction = function (e) {
                    this.batchNotifyFn = e
                }, e
            }())
        }, 449: () => {
        }, 463: (e, t) => {
            "use strict";

            function n(e, t) {
                var n = e.length;
                e.push(t);
                e:for (; 0 < n;) {
                    var r = n - 1 >>> 1, a = e[r];
                    if (!(0 < o(a, t))) break e;
                    e[r] = t, e[n] = a, n = r
                }
            }

            function r(e) {
                return 0 === e.length ? null : e[0]
            }

            function a(e) {
                if (0 === e.length) return null;
                var t = e[0], n = e.pop();
                if (n !== t) {
                    e[0] = n;
                    e:for (var r = 0, a = e.length, i = a >>> 1; r < i;) {
                        var l = 2 * (r + 1) - 1, s = e[l], u = l + 1, c = e[u];
                        if (0 > o(s, n)) u < a && 0 > o(c, s) ? (e[r] = c, e[u] = n, r = u) : (e[r] = s, e[l] = n, r = l); else {
                            if (!(u < a && 0 > o(c, n))) break e;
                            e[r] = c, e[u] = n, r = u
                        }
                    }
                }
                return t
            }

            function o(e, t) {
                var n = e.sortIndex - t.sortIndex;
                return 0 !== n ? n : e.id - t.id
            }

            if ("object" == typeof performance && "function" == typeof performance.now) {
                var i = performance;
                t.unstable_now = function () {
                    return i.now()
                }
            } else {
                var l = Date, s = l.now();
                t.unstable_now = function () {
                    return l.now() - s
                }
            }
            var u = [], c = [], d = 1, f = null, p = 3, h = !1, m = !1, g = !1,
                y = "function" == typeof setTimeout ? setTimeout : null,
                v = "function" == typeof clearTimeout ? clearTimeout : null,
                b = "undefined" != typeof setImmediate ? setImmediate : null;

            function w(e) {
                for (var t = r(c); null !== t;) {
                    if (null === t.callback) a(c); else {
                        if (!(t.startTime <= e)) break;
                        a(c), t.sortIndex = t.expirationTime, n(u, t)
                    }
                    t = r(c)
                }
            }

            function x(e) {
                if (g = !1, w(e), !m) if (null !== r(u)) m = !0, T(k); else {
                    var t = r(c);
                    null !== t && O(x, t.startTime - e)
                }
            }

            function k(e, n) {
                m = !1, g && (g = !1, v(j), j = -1), h = !0;
                var o = p;
                try {
                    for (w(n), f = r(u); null !== f && (!(f.expirationTime > n) || e && !E());) {
                        var i = f.callback;
                        if ("function" == typeof i) {
                            f.callback = null, p = f.priorityLevel;
                            var l = i(f.expirationTime <= n);
                            n = t.unstable_now(), "function" == typeof l ? f.callback = l : f === r(u) && a(u), w(n)
                        } else a(u);
                        f = r(u)
                    }
                    if (null !== f) var s = !0; else {
                        var d = r(c);
                        null !== d && O(x, d.startTime - n), s = !1
                    }
                    return s
                } finally {
                    f = null, p = o, h = !1
                }
            }

            "undefined" != typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
            var _, S = !1, N = null, j = -1, C = 5, P = -1;

            function E() {
                return !(t.unstable_now() - P < C)
            }

            function A() {
                if (null !== N) {
                    var e = t.unstable_now();
                    P = e;
                    var n = !0;
                    try {
                        n = N(!0, e)
                    } finally {
                        n ? _() : (S = !1, N = null)
                    }
                } else S = !1
            }

            if ("function" == typeof b) _ = function () {
                b(A)
            }; else if ("undefined" != typeof MessageChannel) {
                var I = new MessageChannel, L = I.port2;
                I.port1.onmessage = A, _ = function () {
                    L.postMessage(null)
                }
            } else _ = function () {
                y(A, 0)
            };

            function T(e) {
                N = e, S || (S = !0, _())
            }

            function O(e, n) {
                j = y((function () {
                    e(t.unstable_now())
                }), n)
            }

            t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function (e) {
                e.callback = null
            }, t.unstable_continueExecution = function () {
                m || h || (m = !0, T(k))
            }, t.unstable_forceFrameRate = function (e) {
                0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : C = 0 < e ? Math.floor(1e3 / e) : 5
            }, t.unstable_getCurrentPriorityLevel = function () {
                return p
            }, t.unstable_getFirstCallbackNode = function () {
                return r(u)
            }, t.unstable_next = function (e) {
                switch (p) {
                    case 1:
                    case 2:
                    case 3:
                        var t = 3;
                        break;
                    default:
                        t = p
                }
                var n = p;
                p = t;
                try {
                    return e()
                } finally {
                    p = n
                }
            }, t.unstable_pauseExecution = function () {
            }, t.unstable_requestPaint = function () {
            }, t.unstable_runWithPriority = function (e, t) {
                switch (e) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        break;
                    default:
                        e = 3
                }
                var n = p;
                p = e;
                try {
                    return t()
                } finally {
                    p = n
                }
            }, t.unstable_scheduleCallback = function (e, a, o) {
                var i = t.unstable_now();
                switch (o = "object" == typeof o && null !== o && "number" == typeof (o = o.delay) && 0 < o ? i + o : i, e) {
                    case 1:
                        var l = -1;
                        break;
                    case 2:
                        l = 250;
                        break;
                    case 5:
                        l = 1073741823;
                        break;
                    case 4:
                        l = 1e4;
                        break;
                    default:
                        l = 5e3
                }
                return e = {
                    id: d++,
                    callback: a,
                    priorityLevel: e,
                    startTime: o,
                    expirationTime: l = o + l,
                    sortIndex: -1
                }, o > i ? (e.sortIndex = o, n(c, e), null === r(u) && e === r(c) && (g ? (v(j), j = -1) : g = !0, O(x, o - i))) : (e.sortIndex = l, n(u, e), m || h || (m = !0, T(k))), e
            }, t.unstable_shouldYield = E, t.unstable_wrapCallback = function (e) {
                var t = p;
                return function () {
                    var n = p;
                    p = t;
                    try {
                        return e.apply(this, arguments)
                    } finally {
                        p = n
                    }
                }
            }
        }, 468: (e, t, n) => {
            "use strict";
            n.d(t, {QueryClient: () => r.E});
            var r = n(687), a = n(449);
            n.o(a, "QueryClientProvider") && n.d(t, {
                QueryClientProvider: function () {
                    return a.QueryClientProvider
                }
            }), n.o(a, "useQuery") && n.d(t, {
                useQuery: function () {
                    return a.useQuery
                }
            }), n.o(a, "useQueryClient") && n.d(t, {
                useQueryClient: function () {
                    return a.useQueryClient
                }
            })
        }, 525: (e, t, n) => {
            "use strict";
            const r = n(526), a = n(251),
                o = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;
            t.hp = s, t.IS = 50;
            const i = 2147483647;

            function l(e) {
                if (e > i) throw new RangeError('The value "' + e + '" is invalid for option "size"');
                const t = new Uint8Array(e);
                return Object.setPrototypeOf(t, s.prototype), t
            }

            function s(e, t, n) {
                if ("number" == typeof e) {
                    if ("string" == typeof t) throw new TypeError('The "string" argument must be of type string. Received type number');
                    return d(e)
                }
                return u(e, t, n)
            }

            function u(e, t, n) {
                if ("string" == typeof e) return function (e, t) {
                    if ("string" == typeof t && "" !== t || (t = "utf8"), !s.isEncoding(t)) throw new TypeError("Unknown encoding: " + t);
                    const n = 0 | m(e, t);
                    let r = l(n);
                    const a = r.write(e, t);
                    return a !== n && (r = r.slice(0, a)), r
                }(e, t);
                if (ArrayBuffer.isView(e)) return function (e) {
                    if (G(e, Uint8Array)) {
                        const t = new Uint8Array(e);
                        return p(t.buffer, t.byteOffset, t.byteLength)
                    }
                    return f(e)
                }(e);
                if (null == e) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
                if (G(e, ArrayBuffer) || e && G(e.buffer, ArrayBuffer)) return p(e, t, n);
                if ("undefined" != typeof SharedArrayBuffer && (G(e, SharedArrayBuffer) || e && G(e.buffer, SharedArrayBuffer))) return p(e, t, n);
                if ("number" == typeof e) throw new TypeError('The "value" argument must not be of type number. Received type number');
                const r = e.valueOf && e.valueOf();
                if (null != r && r !== e) return s.from(r, t, n);
                const a = function (e) {
                    if (s.isBuffer(e)) {
                        const t = 0 | h(e.length), n = l(t);
                        return 0 === n.length || e.copy(n, 0, 0, t), n
                    }
                    return void 0 !== e.length ? "number" != typeof e.length || J(e.length) ? l(0) : f(e) : "Buffer" === e.type && Array.isArray(e.data) ? f(e.data) : void 0
                }(e);
                if (a) return a;
                if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive]) return s.from(e[Symbol.toPrimitive]("string"), t, n);
                throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e)
            }

            function c(e) {
                if ("number" != typeof e) throw new TypeError('"size" argument must be of type number');
                if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"')
            }

            function d(e) {
                return c(e), l(e < 0 ? 0 : 0 | h(e))
            }

            function f(e) {
                const t = e.length < 0 ? 0 : 0 | h(e.length), n = l(t);
                for (let r = 0; r < t; r += 1) n[r] = 255 & e[r];
                return n
            }

            function p(e, t, n) {
                if (t < 0 || e.byteLength < t) throw new RangeError('"offset" is outside of buffer bounds');
                if (e.byteLength < t + (n || 0)) throw new RangeError('"length" is outside of buffer bounds');
                let r;
                return r = void 0 === t && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e, t) : new Uint8Array(e, t, n), Object.setPrototypeOf(r, s.prototype), r
            }

            function h(e) {
                if (e >= i) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
                return 0 | e
            }

            function m(e, t) {
                if (s.isBuffer(e)) return e.length;
                if (ArrayBuffer.isView(e) || G(e, ArrayBuffer)) return e.byteLength;
                if ("string" != typeof e) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
                const n = e.length, r = arguments.length > 2 && !0 === arguments[2];
                if (!r && 0 === n) return 0;
                let a = !1;
                for (; ;) switch (t) {
                    case"ascii":
                    case"latin1":
                    case"binary":
                        return n;
                    case"utf8":
                    case"utf-8":
                        return $(e).length;
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        return 2 * n;
                    case"hex":
                        return n >>> 1;
                    case"base64":
                        return H(e).length;
                    default:
                        if (a) return r ? -1 : $(e).length;
                        t = ("" + t).toLowerCase(), a = !0
                }
            }

            function g(e, t, n) {
                let r = !1;
                if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
                if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
                if ((n >>>= 0) <= (t >>>= 0)) return "";
                for (e || (e = "utf8"); ;) switch (e) {
                    case"hex":
                        return A(this, t, n);
                    case"utf8":
                    case"utf-8":
                        return j(this, t, n);
                    case"ascii":
                        return P(this, t, n);
                    case"latin1":
                    case"binary":
                        return E(this, t, n);
                    case"base64":
                        return N(this, t, n);
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        return I(this, t, n);
                    default:
                        if (r) throw new TypeError("Unknown encoding: " + e);
                        e = (e + "").toLowerCase(), r = !0
                }
            }

            function y(e, t, n) {
                const r = e[t];
                e[t] = e[n], e[n] = r
            }

            function v(e, t, n, r, a) {
                if (0 === e.length) return -1;
                if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), J(n = +n) && (n = a ? 0 : e.length - 1), n < 0 && (n = e.length + n), n >= e.length) {
                    if (a) return -1;
                    n = e.length - 1
                } else if (n < 0) {
                    if (!a) return -1;
                    n = 0
                }
                if ("string" == typeof t && (t = s.from(t, r)), s.isBuffer(t)) return 0 === t.length ? -1 : b(e, t, n, r, a);
                if ("number" == typeof t) return t &= 255, "function" == typeof Uint8Array.prototype.indexOf ? a ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : b(e, [t], n, r, a);
                throw new TypeError("val must be string, number or Buffer")
            }

            function b(e, t, n, r, a) {
                let o, i = 1, l = e.length, s = t.length;
                if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                    if (e.length < 2 || t.length < 2) return -1;
                    i = 2, l /= 2, s /= 2, n /= 2
                }

                function u(e, t) {
                    return 1 === i ? e[t] : e.readUInt16BE(t * i)
                }

                if (a) {
                    let r = -1;
                    for (o = n; o < l; o++) if (u(e, o) === u(t, -1 === r ? 0 : o - r)) {
                        if (-1 === r && (r = o), o - r + 1 === s) return r * i
                    } else -1 !== r && (o -= o - r), r = -1
                } else for (n + s > l && (n = l - s), o = n; o >= 0; o--) {
                    let n = !0;
                    for (let r = 0; r < s; r++) if (u(e, o + r) !== u(t, r)) {
                        n = !1;
                        break
                    }
                    if (n) return o
                }
                return -1
            }

            function w(e, t, n, r) {
                n = Number(n) || 0;
                const a = e.length - n;
                r ? (r = Number(r)) > a && (r = a) : r = a;
                const o = t.length;
                let i;
                for (r > o / 2 && (r = o / 2), i = 0; i < r; ++i) {
                    const r = parseInt(t.substr(2 * i, 2), 16);
                    if (J(r)) return i;
                    e[n + i] = r
                }
                return i
            }

            function x(e, t, n, r) {
                return K($(t, e.length - n), e, n, r)
            }

            function k(e, t, n, r) {
                return K(function (e) {
                    const t = [];
                    for (let n = 0; n < e.length; ++n) t.push(255 & e.charCodeAt(n));
                    return t
                }(t), e, n, r)
            }

            function _(e, t, n, r) {
                return K(H(t), e, n, r)
            }

            function S(e, t, n, r) {
                return K(function (e, t) {
                    let n, r, a;
                    const o = [];
                    for (let i = 0; i < e.length && !((t -= 2) < 0); ++i) n = e.charCodeAt(i), r = n >> 8, a = n % 256, o.push(a), o.push(r);
                    return o
                }(t, e.length - n), e, n, r)
            }

            function N(e, t, n) {
                return 0 === t && n === e.length ? r.fromByteArray(e) : r.fromByteArray(e.slice(t, n))
            }

            function j(e, t, n) {
                n = Math.min(e.length, n);
                const r = [];
                let a = t;
                for (; a < n;) {
                    const t = e[a];
                    let o = null, i = t > 239 ? 4 : t > 223 ? 3 : t > 191 ? 2 : 1;
                    if (a + i <= n) {
                        let n, r, l, s;
                        switch (i) {
                            case 1:
                                t < 128 && (o = t);
                                break;
                            case 2:
                                n = e[a + 1], 128 == (192 & n) && (s = (31 & t) << 6 | 63 & n, s > 127 && (o = s));
                                break;
                            case 3:
                                n = e[a + 1], r = e[a + 2], 128 == (192 & n) && 128 == (192 & r) && (s = (15 & t) << 12 | (63 & n) << 6 | 63 & r, s > 2047 && (s < 55296 || s > 57343) && (o = s));
                                break;
                            case 4:
                                n = e[a + 1], r = e[a + 2], l = e[a + 3], 128 == (192 & n) && 128 == (192 & r) && 128 == (192 & l) && (s = (15 & t) << 18 | (63 & n) << 12 | (63 & r) << 6 | 63 & l, s > 65535 && s < 1114112 && (o = s))
                        }
                    }
                    null === o ? (o = 65533, i = 1) : o > 65535 && (o -= 65536, r.push(o >>> 10 & 1023 | 55296), o = 56320 | 1023 & o), r.push(o), a += i
                }
                return function (e) {
                    const t = e.length;
                    if (t <= C) return String.fromCharCode.apply(String, e);
                    let n = "", r = 0;
                    for (; r < t;) n += String.fromCharCode.apply(String, e.slice(r, r += C));
                    return n
                }(r)
            }

            s.TYPED_ARRAY_SUPPORT = function () {
                try {
                    const e = new Uint8Array(1), t = {
                        foo: function () {
                            return 42
                        }
                    };
                    return Object.setPrototypeOf(t, Uint8Array.prototype), Object.setPrototypeOf(e, t), 42 === e.foo()
                } catch (e) {
                    return !1
                }
            }(), s.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(s.prototype, "parent", {
                enumerable: !0,
                get: function () {
                    if (s.isBuffer(this)) return this.buffer
                }
            }), Object.defineProperty(s.prototype, "offset", {
                enumerable: !0, get: function () {
                    if (s.isBuffer(this)) return this.byteOffset
                }
            }), s.poolSize = 8192, s.from = function (e, t, n) {
                return u(e, t, n)
            }, Object.setPrototypeOf(s.prototype, Uint8Array.prototype), Object.setPrototypeOf(s, Uint8Array), s.alloc = function (e, t, n) {
                return function (e, t, n) {
                    return c(e), e <= 0 ? l(e) : void 0 !== t ? "string" == typeof n ? l(e).fill(t, n) : l(e).fill(t) : l(e)
                }(e, t, n)
            }, s.allocUnsafe = function (e) {
                return d(e)
            }, s.allocUnsafeSlow = function (e) {
                return d(e)
            }, s.isBuffer = function (e) {
                return null != e && !0 === e._isBuffer && e !== s.prototype
            }, s.compare = function (e, t) {
                if (G(e, Uint8Array) && (e = s.from(e, e.offset, e.byteLength)), G(t, Uint8Array) && (t = s.from(t, t.offset, t.byteLength)), !s.isBuffer(e) || !s.isBuffer(t)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                if (e === t) return 0;
                let n = e.length, r = t.length;
                for (let a = 0, o = Math.min(n, r); a < o; ++a) if (e[a] !== t[a]) {
                    n = e[a], r = t[a];
                    break
                }
                return n < r ? -1 : r < n ? 1 : 0
            }, s.isEncoding = function (e) {
                switch (String(e).toLowerCase()) {
                    case"hex":
                    case"utf8":
                    case"utf-8":
                    case"ascii":
                    case"latin1":
                    case"binary":
                    case"base64":
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        return !0;
                    default:
                        return !1
                }
            }, s.concat = function (e, t) {
                if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === e.length) return s.alloc(0);
                let n;
                if (void 0 === t) for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
                const r = s.allocUnsafe(t);
                let a = 0;
                for (n = 0; n < e.length; ++n) {
                    let t = e[n];
                    if (G(t, Uint8Array)) a + t.length > r.length ? (s.isBuffer(t) || (t = s.from(t)), t.copy(r, a)) : Uint8Array.prototype.set.call(r, t, a); else {
                        if (!s.isBuffer(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                        t.copy(r, a)
                    }
                    a += t.length
                }
                return r
            }, s.byteLength = m, s.prototype._isBuffer = !0, s.prototype.swap16 = function () {
                const e = this.length;
                if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (let t = 0; t < e; t += 2) y(this, t, t + 1);
                return this
            }, s.prototype.swap32 = function () {
                const e = this.length;
                if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (let t = 0; t < e; t += 4) y(this, t, t + 3), y(this, t + 1, t + 2);
                return this
            }, s.prototype.swap64 = function () {
                const e = this.length;
                if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (let t = 0; t < e; t += 8) y(this, t, t + 7), y(this, t + 1, t + 6), y(this, t + 2, t + 5), y(this, t + 3, t + 4);
                return this
            }, s.prototype.toString = function () {
                const e = this.length;
                return 0 === e ? "" : 0 === arguments.length ? j(this, 0, e) : g.apply(this, arguments)
            }, s.prototype.toLocaleString = s.prototype.toString, s.prototype.equals = function (e) {
                if (!s.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                return this === e || 0 === s.compare(this, e)
            }, s.prototype.inspect = function () {
                let e = "";
                const n = t.IS;
                return e = this.toString("hex", 0, n).replace(/(.{2})/g, "$1 ").trim(), this.length > n && (e += " ... "), "<Buffer " + e + ">"
            }, o && (s.prototype[o] = s.prototype.inspect), s.prototype.compare = function (e, t, n, r, a) {
                if (G(e, Uint8Array) && (e = s.from(e, e.offset, e.byteLength)), !s.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
                if (void 0 === t && (t = 0), void 0 === n && (n = e ? e.length : 0), void 0 === r && (r = 0), void 0 === a && (a = this.length), t < 0 || n > e.length || r < 0 || a > this.length) throw new RangeError("out of range index");
                if (r >= a && t >= n) return 0;
                if (r >= a) return -1;
                if (t >= n) return 1;
                if (this === e) return 0;
                let o = (a >>>= 0) - (r >>>= 0), i = (n >>>= 0) - (t >>>= 0);
                const l = Math.min(o, i), u = this.slice(r, a), c = e.slice(t, n);
                for (let e = 0; e < l; ++e) if (u[e] !== c[e]) {
                    o = u[e], i = c[e];
                    break
                }
                return o < i ? -1 : i < o ? 1 : 0
            }, s.prototype.includes = function (e, t, n) {
                return -1 !== this.indexOf(e, t, n)
            }, s.prototype.indexOf = function (e, t, n) {
                return v(this, e, t, n, !0)
            }, s.prototype.lastIndexOf = function (e, t, n) {
                return v(this, e, t, n, !1)
            }, s.prototype.write = function (e, t, n, r) {
                if (void 0 === t) r = "utf8", n = this.length, t = 0; else if (void 0 === n && "string" == typeof t) r = t, n = this.length, t = 0; else {
                    if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    t >>>= 0, isFinite(n) ? (n >>>= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
                }
                const a = this.length - t;
                if ((void 0 === n || n > a) && (n = a), e.length > 0 && (n < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                r || (r = "utf8");
                let o = !1;
                for (; ;) switch (r) {
                    case"hex":
                        return w(this, e, t, n);
                    case"utf8":
                    case"utf-8":
                        return x(this, e, t, n);
                    case"ascii":
                    case"latin1":
                    case"binary":
                        return k(this, e, t, n);
                    case"base64":
                        return _(this, e, t, n);
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        return S(this, e, t, n);
                    default:
                        if (o) throw new TypeError("Unknown encoding: " + r);
                        r = ("" + r).toLowerCase(), o = !0
                }
            }, s.prototype.toJSON = function () {
                return {type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0)}
            };
            const C = 4096;

            function P(e, t, n) {
                let r = "";
                n = Math.min(e.length, n);
                for (let a = t; a < n; ++a) r += String.fromCharCode(127 & e[a]);
                return r
            }

            function E(e, t, n) {
                let r = "";
                n = Math.min(e.length, n);
                for (let a = t; a < n; ++a) r += String.fromCharCode(e[a]);
                return r
            }

            function A(e, t, n) {
                const r = e.length;
                (!t || t < 0) && (t = 0), (!n || n < 0 || n > r) && (n = r);
                let a = "";
                for (let r = t; r < n; ++r) a += Y[e[r]];
                return a
            }

            function I(e, t, n) {
                const r = e.slice(t, n);
                let a = "";
                for (let e = 0; e < r.length - 1; e += 2) a += String.fromCharCode(r[e] + 256 * r[e + 1]);
                return a
            }

            function L(e, t, n) {
                if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
                if (e + t > n) throw new RangeError("Trying to access beyond buffer length")
            }

            function T(e, t, n, r, a, o) {
                if (!s.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (t > a || t < o) throw new RangeError('"value" argument is out of bounds');
                if (n + r > e.length) throw new RangeError("Index out of range")
            }

            function O(e, t, n, r, a) {
                Q(t, r, a, e, n, 7);
                let o = Number(t & BigInt(4294967295));
                e[n++] = o, o >>= 8, e[n++] = o, o >>= 8, e[n++] = o, o >>= 8, e[n++] = o;
                let i = Number(t >> BigInt(32) & BigInt(4294967295));
                return e[n++] = i, i >>= 8, e[n++] = i, i >>= 8, e[n++] = i, i >>= 8, e[n++] = i, n
            }

            function R(e, t, n, r, a) {
                Q(t, r, a, e, n, 7);
                let o = Number(t & BigInt(4294967295));
                e[n + 7] = o, o >>= 8, e[n + 6] = o, o >>= 8, e[n + 5] = o, o >>= 8, e[n + 4] = o;
                let i = Number(t >> BigInt(32) & BigInt(4294967295));
                return e[n + 3] = i, i >>= 8, e[n + 2] = i, i >>= 8, e[n + 1] = i, i >>= 8, e[n] = i, n + 8
            }

            function M(e, t, n, r, a, o) {
                if (n + r > e.length) throw new RangeError("Index out of range");
                if (n < 0) throw new RangeError("Index out of range")
            }

            function z(e, t, n, r, o) {
                return t = +t, n >>>= 0, o || M(e, 0, n, 4), a.write(e, t, n, r, 23, 4), n + 4
            }

            function U(e, t, n, r, o) {
                return t = +t, n >>>= 0, o || M(e, 0, n, 8), a.write(e, t, n, r, 52, 8), n + 8
            }

            s.prototype.slice = function (e, t) {
                const n = this.length;
                (e = ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n), (t = void 0 === t ? n : ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), t < e && (t = e);
                const r = this.subarray(e, t);
                return Object.setPrototypeOf(r, s.prototype), r
            }, s.prototype.readUintLE = s.prototype.readUIntLE = function (e, t, n) {
                e >>>= 0, t >>>= 0, n || L(e, t, this.length);
                let r = this[e], a = 1, o = 0;
                for (; ++o < t && (a *= 256);) r += this[e + o] * a;
                return r
            }, s.prototype.readUintBE = s.prototype.readUIntBE = function (e, t, n) {
                e >>>= 0, t >>>= 0, n || L(e, t, this.length);
                let r = this[e + --t], a = 1;
                for (; t > 0 && (a *= 256);) r += this[e + --t] * a;
                return r
            }, s.prototype.readUint8 = s.prototype.readUInt8 = function (e, t) {
                return e >>>= 0, t || L(e, 1, this.length), this[e]
            }, s.prototype.readUint16LE = s.prototype.readUInt16LE = function (e, t) {
                return e >>>= 0, t || L(e, 2, this.length), this[e] | this[e + 1] << 8
            }, s.prototype.readUint16BE = s.prototype.readUInt16BE = function (e, t) {
                return e >>>= 0, t || L(e, 2, this.length), this[e] << 8 | this[e + 1]
            }, s.prototype.readUint32LE = s.prototype.readUInt32LE = function (e, t) {
                return e >>>= 0, t || L(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
            }, s.prototype.readUint32BE = s.prototype.readUInt32BE = function (e, t) {
                return e >>>= 0, t || L(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
            }, s.prototype.readBigUInt64LE = X((function (e) {
                W(e >>>= 0, "offset");
                const t = this[e], n = this[e + 7];
                void 0 !== t && void 0 !== n || q(e, this.length - 8);
                const r = t + 256 * this[++e] + 65536 * this[++e] + this[++e] * 2 ** 24,
                    a = this[++e] + 256 * this[++e] + 65536 * this[++e] + n * 2 ** 24;
                return BigInt(r) + (BigInt(a) << BigInt(32))
            })), s.prototype.readBigUInt64BE = X((function (e) {
                W(e >>>= 0, "offset");
                const t = this[e], n = this[e + 7];
                void 0 !== t && void 0 !== n || q(e, this.length - 8);
                const r = t * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + this[++e],
                    a = this[++e] * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + n;
                return (BigInt(r) << BigInt(32)) + BigInt(a)
            })), s.prototype.readIntLE = function (e, t, n) {
                e >>>= 0, t >>>= 0, n || L(e, t, this.length);
                let r = this[e], a = 1, o = 0;
                for (; ++o < t && (a *= 256);) r += this[e + o] * a;
                return a *= 128, r >= a && (r -= Math.pow(2, 8 * t)), r
            }, s.prototype.readIntBE = function (e, t, n) {
                e >>>= 0, t >>>= 0, n || L(e, t, this.length);
                let r = t, a = 1, o = this[e + --r];
                for (; r > 0 && (a *= 256);) o += this[e + --r] * a;
                return a *= 128, o >= a && (o -= Math.pow(2, 8 * t)), o
            }, s.prototype.readInt8 = function (e, t) {
                return e >>>= 0, t || L(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            }, s.prototype.readInt16LE = function (e, t) {
                e >>>= 0, t || L(e, 2, this.length);
                const n = this[e] | this[e + 1] << 8;
                return 32768 & n ? 4294901760 | n : n
            }, s.prototype.readInt16BE = function (e, t) {
                e >>>= 0, t || L(e, 2, this.length);
                const n = this[e + 1] | this[e] << 8;
                return 32768 & n ? 4294901760 | n : n
            }, s.prototype.readInt32LE = function (e, t) {
                return e >>>= 0, t || L(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
            }, s.prototype.readInt32BE = function (e, t) {
                return e >>>= 0, t || L(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
            }, s.prototype.readBigInt64LE = X((function (e) {
                W(e >>>= 0, "offset");
                const t = this[e], n = this[e + 7];
                void 0 !== t && void 0 !== n || q(e, this.length - 8);
                const r = this[e + 4] + 256 * this[e + 5] + 65536 * this[e + 6] + (n << 24);
                return (BigInt(r) << BigInt(32)) + BigInt(t + 256 * this[++e] + 65536 * this[++e] + this[++e] * 2 ** 24)
            })), s.prototype.readBigInt64BE = X((function (e) {
                W(e >>>= 0, "offset");
                const t = this[e], n = this[e + 7];
                void 0 !== t && void 0 !== n || q(e, this.length - 8);
                const r = (t << 24) + 65536 * this[++e] + 256 * this[++e] + this[++e];
                return (BigInt(r) << BigInt(32)) + BigInt(this[++e] * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + n)
            })), s.prototype.readFloatLE = function (e, t) {
                return e >>>= 0, t || L(e, 4, this.length), a.read(this, e, !0, 23, 4)
            }, s.prototype.readFloatBE = function (e, t) {
                return e >>>= 0, t || L(e, 4, this.length), a.read(this, e, !1, 23, 4)
            }, s.prototype.readDoubleLE = function (e, t) {
                return e >>>= 0, t || L(e, 8, this.length), a.read(this, e, !0, 52, 8)
            }, s.prototype.readDoubleBE = function (e, t) {
                return e >>>= 0, t || L(e, 8, this.length), a.read(this, e, !1, 52, 8)
            }, s.prototype.writeUintLE = s.prototype.writeUIntLE = function (e, t, n, r) {
                e = +e, t >>>= 0, n >>>= 0, r || T(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
                let a = 1, o = 0;
                for (this[t] = 255 & e; ++o < n && (a *= 256);) this[t + o] = e / a & 255;
                return t + n
            }, s.prototype.writeUintBE = s.prototype.writeUIntBE = function (e, t, n, r) {
                e = +e, t >>>= 0, n >>>= 0, r || T(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
                let a = n - 1, o = 1;
                for (this[t + a] = 255 & e; --a >= 0 && (o *= 256);) this[t + a] = e / o & 255;
                return t + n
            }, s.prototype.writeUint8 = s.prototype.writeUInt8 = function (e, t, n) {
                return e = +e, t >>>= 0, n || T(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1
            }, s.prototype.writeUint16LE = s.prototype.writeUInt16LE = function (e, t, n) {
                return e = +e, t >>>= 0, n || T(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
            }, s.prototype.writeUint16BE = s.prototype.writeUInt16BE = function (e, t, n) {
                return e = +e, t >>>= 0, n || T(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
            }, s.prototype.writeUint32LE = s.prototype.writeUInt32LE = function (e, t, n) {
                return e = +e, t >>>= 0, n || T(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4
            }, s.prototype.writeUint32BE = s.prototype.writeUInt32BE = function (e, t, n) {
                return e = +e, t >>>= 0, n || T(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
            }, s.prototype.writeBigUInt64LE = X((function (e, t = 0) {
                return O(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"))
            })), s.prototype.writeBigUInt64BE = X((function (e, t = 0) {
                return R(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"))
            })), s.prototype.writeIntLE = function (e, t, n, r) {
                if (e = +e, t >>>= 0, !r) {
                    const r = Math.pow(2, 8 * n - 1);
                    T(this, e, t, n, r - 1, -r)
                }
                let a = 0, o = 1, i = 0;
                for (this[t] = 255 & e; ++a < n && (o *= 256);) e < 0 && 0 === i && 0 !== this[t + a - 1] && (i = 1), this[t + a] = (e / o | 0) - i & 255;
                return t + n
            }, s.prototype.writeIntBE = function (e, t, n, r) {
                if (e = +e, t >>>= 0, !r) {
                    const r = Math.pow(2, 8 * n - 1);
                    T(this, e, t, n, r - 1, -r)
                }
                let a = n - 1, o = 1, i = 0;
                for (this[t + a] = 255 & e; --a >= 0 && (o *= 256);) e < 0 && 0 === i && 0 !== this[t + a + 1] && (i = 1), this[t + a] = (e / o | 0) - i & 255;
                return t + n
            }, s.prototype.writeInt8 = function (e, t, n) {
                return e = +e, t >>>= 0, n || T(this, e, t, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
            }, s.prototype.writeInt16LE = function (e, t, n) {
                return e = +e, t >>>= 0, n || T(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
            }, s.prototype.writeInt16BE = function (e, t, n) {
                return e = +e, t >>>= 0, n || T(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
            }, s.prototype.writeInt32LE = function (e, t, n) {
                return e = +e, t >>>= 0, n || T(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4
            }, s.prototype.writeInt32BE = function (e, t, n) {
                return e = +e, t >>>= 0, n || T(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
            }, s.prototype.writeBigInt64LE = X((function (e, t = 0) {
                return O(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
            })), s.prototype.writeBigInt64BE = X((function (e, t = 0) {
                return R(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
            })), s.prototype.writeFloatLE = function (e, t, n) {
                return z(this, e, t, !0, n)
            }, s.prototype.writeFloatBE = function (e, t, n) {
                return z(this, e, t, !1, n)
            }, s.prototype.writeDoubleLE = function (e, t, n) {
                return U(this, e, t, !0, n)
            }, s.prototype.writeDoubleBE = function (e, t, n) {
                return U(this, e, t, !1, n)
            }, s.prototype.copy = function (e, t, n, r) {
                if (!s.isBuffer(e)) throw new TypeError("argument should be a Buffer");
                if (n || (n = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), r > 0 && r < n && (r = n), r === n) return 0;
                if (0 === e.length || 0 === this.length) return 0;
                if (t < 0) throw new RangeError("targetStart out of bounds");
                if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
                if (r < 0) throw new RangeError("sourceEnd out of bounds");
                r > this.length && (r = this.length), e.length - t < r - n && (r = e.length - t + n);
                const a = r - n;
                return this === e && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(t, n, r) : Uint8Array.prototype.set.call(e, this.subarray(n, r), t), a
            }, s.prototype.fill = function (e, t, n, r) {
                if ("string" == typeof e) {
                    if ("string" == typeof t ? (r = t, t = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                    if ("string" == typeof r && !s.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
                    if (1 === e.length) {
                        const t = e.charCodeAt(0);
                        ("utf8" === r && t < 128 || "latin1" === r) && (e = t)
                    }
                } else "number" == typeof e ? e &= 255 : "boolean" == typeof e && (e = Number(e));
                if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");
                if (n <= t) return this;
                let a;
                if (t >>>= 0, n = void 0 === n ? this.length : n >>> 0, e || (e = 0), "number" == typeof e) for (a = t; a < n; ++a) this[a] = e; else {
                    const o = s.isBuffer(e) ? e : s.from(e, r), i = o.length;
                    if (0 === i) throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                    for (a = 0; a < n - t; ++a) this[a + t] = o[a % i]
                }
                return this
            };
            const F = {};

            function D(e, t, n) {
                F[e] = class extends n {
                    constructor() {
                        super(), Object.defineProperty(this, "message", {
                            value: t.apply(this, arguments),
                            writable: !0,
                            configurable: !0
                        }), this.name = `${this.name} [${e}]`, this.stack, delete this.name
                    }

                    get code() {
                        return e
                    }

                    set code(e) {
                        Object.defineProperty(this, "code", {configurable: !0, enumerable: !0, value: e, writable: !0})
                    }

                    toString() {
                        return `${this.name} [${e}]: ${this.message}`
                    }
                }
            }

            function B(e) {
                let t = "", n = e.length;
                const r = "-" === e[0] ? 1 : 0;
                for (; n >= r + 4; n -= 3) t = `_${e.slice(n - 3, n)}${t}`;
                return `${e.slice(0, n)}${t}`
            }

            function Q(e, t, n, r, a, o) {
                if (e > n || e < t) {
                    const r = "bigint" == typeof t ? "n" : "";
                    let a;
                    throw a = o > 3 ? 0 === t || t === BigInt(0) ? `>= 0${r} and < 2${r} ** ${8 * (o + 1)}${r}` : `>= -(2${r} ** ${8 * (o + 1) - 1}${r}) and < 2 ** ${8 * (o + 1) - 1}${r}` : `>= ${t}${r} and <= ${n}${r}`, new F.ERR_OUT_OF_RANGE("value", a, e)
                }
                !function (e, t, n) {
                    W(t, "offset"), void 0 !== e[t] && void 0 !== e[t + n] || q(t, e.length - (n + 1))
                }(r, a, o)
            }

            function W(e, t) {
                if ("number" != typeof e) throw new F.ERR_INVALID_ARG_TYPE(t, "number", e)
            }

            function q(e, t, n) {
                if (Math.floor(e) !== e) throw W(e, n), new F.ERR_OUT_OF_RANGE(n || "offset", "an integer", e);
                if (t < 0) throw new F.ERR_BUFFER_OUT_OF_BOUNDS;
                throw new F.ERR_OUT_OF_RANGE(n || "offset", `>= ${n ? 1 : 0} and <= ${t}`, e)
            }

            D("ERR_BUFFER_OUT_OF_BOUNDS", (function (e) {
                return e ? `${e} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds"
            }), RangeError), D("ERR_INVALID_ARG_TYPE", (function (e, t) {
                return `The "${e}" argument must be of type number. Received type ${typeof t}`
            }), TypeError), D("ERR_OUT_OF_RANGE", (function (e, t, n) {
                let r = `The value of "${e}" is out of range.`, a = n;
                return Number.isInteger(n) && Math.abs(n) > 2 ** 32 ? a = B(String(n)) : "bigint" == typeof n && (a = String(n), (n > BigInt(2) ** BigInt(32) || n < -(BigInt(2) ** BigInt(32))) && (a = B(a)), a += "n"), r += ` It must be ${t}. Received ${a}`, r
            }), RangeError);
            const V = /[^+/0-9A-Za-z-_]/g;

            function $(e, t) {
                let n;
                t = t || 1 / 0;
                const r = e.length;
                let a = null;
                const o = [];
                for (let i = 0; i < r; ++i) {
                    if (n = e.charCodeAt(i), n > 55295 && n < 57344) {
                        if (!a) {
                            if (n > 56319) {
                                (t -= 3) > -1 && o.push(239, 191, 189);
                                continue
                            }
                            if (i + 1 === r) {
                                (t -= 3) > -1 && o.push(239, 191, 189);
                                continue
                            }
                            a = n;
                            continue
                        }
                        if (n < 56320) {
                            (t -= 3) > -1 && o.push(239, 191, 189), a = n;
                            continue
                        }
                        n = 65536 + (a - 55296 << 10 | n - 56320)
                    } else a && (t -= 3) > -1 && o.push(239, 191, 189);
                    if (a = null, n < 128) {
                        if ((t -= 1) < 0) break;
                        o.push(n)
                    } else if (n < 2048) {
                        if ((t -= 2) < 0) break;
                        o.push(n >> 6 | 192, 63 & n | 128)
                    } else if (n < 65536) {
                        if ((t -= 3) < 0) break;
                        o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                    } else {
                        if (!(n < 1114112)) throw new Error("Invalid code point");
                        if ((t -= 4) < 0) break;
                        o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                    }
                }
                return o
            }

            function H(e) {
                return r.toByteArray(function (e) {
                    if ((e = (e = e.split("=")[0]).trim().replace(V, "")).length < 2) return "";
                    for (; e.length % 4 != 0;) e += "=";
                    return e
                }(e))
            }

            function K(e, t, n, r) {
                let a;
                for (a = 0; a < r && !(a + n >= t.length || a >= e.length); ++a) t[a + n] = e[a];
                return a
            }

            function G(e, t) {
                return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
            }

            function J(e) {
                return e != e
            }

            const Y = function () {
                const e = "0123456789abcdef", t = new Array(256);
                for (let n = 0; n < 16; ++n) {
                    const r = 16 * n;
                    for (let a = 0; a < 16; ++a) t[r + a] = e[n] + e[a]
                }
                return t
            }();

            function X(e) {
                return "undefined" == typeof BigInt ? Z : e
            }

            function Z() {
                throw new Error("BigInt not supported")
            }
        }, 526: (e, t) => {
            "use strict";
            t.byteLength = function (e) {
                var t = l(e), n = t[0], r = t[1];
                return 3 * (n + r) / 4 - r
            }, t.toByteArray = function (e) {
                var t, n, o = l(e), i = o[0], s = o[1], u = new a(function (e, t, n) {
                    return 3 * (t + n) / 4 - n
                }(0, i, s)), c = 0, d = s > 0 ? i - 4 : i;
                for (n = 0; n < d; n += 4) t = r[e.charCodeAt(n)] << 18 | r[e.charCodeAt(n + 1)] << 12 | r[e.charCodeAt(n + 2)] << 6 | r[e.charCodeAt(n + 3)], u[c++] = t >> 16 & 255, u[c++] = t >> 8 & 255, u[c++] = 255 & t;
                return 2 === s && (t = r[e.charCodeAt(n)] << 2 | r[e.charCodeAt(n + 1)] >> 4, u[c++] = 255 & t), 1 === s && (t = r[e.charCodeAt(n)] << 10 | r[e.charCodeAt(n + 1)] << 4 | r[e.charCodeAt(n + 2)] >> 2, u[c++] = t >> 8 & 255, u[c++] = 255 & t), u
            }, t.fromByteArray = function (e) {
                for (var t, r = e.length, a = r % 3, o = [], i = 16383, l = 0, u = r - a; l < u; l += i) o.push(s(e, l, l + i > u ? u : l + i));
                return 1 === a ? (t = e[r - 1], o.push(n[t >> 2] + n[t << 4 & 63] + "==")) : 2 === a && (t = (e[r - 2] << 8) + e[r - 1], o.push(n[t >> 10] + n[t >> 4 & 63] + n[t << 2 & 63] + "=")), o.join("")
            };
            for (var n = [], r = [], a = "undefined" != typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0; i < 64; ++i) n[i] = o[i], r[o.charCodeAt(i)] = i;

            function l(e) {
                var t = e.length;
                if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                var n = e.indexOf("=");
                return -1 === n && (n = t), [n, n === t ? 0 : 4 - n % 4]
            }

            function s(e, t, r) {
                for (var a, o, i = [], l = t; l < r; l += 3) a = (e[l] << 16 & 16711680) + (e[l + 1] << 8 & 65280) + (255 & e[l + 2]), i.push(n[(o = a) >> 18 & 63] + n[o >> 12 & 63] + n[o >> 6 & 63] + n[63 & o]);
                return i.join("")
            }

            r["-".charCodeAt(0)] = 62, r["_".charCodeAt(0)] = 63
        }, 540: (e, t, n) => {
            "use strict";
            e.exports = n(287)
        }, 551: (e, t, n) => {
            "use strict";
            var r = n(540), a = n(982);

            function o(e) {
                for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
                return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
            }

            var i = new Set, l = {};

            function s(e, t) {
                u(e, t), u(e + "Capture", t)
            }

            function u(e, t) {
                for (l[e] = t, e = 0; e < t.length; e++) i.add(t[e])
            }

            var c = !("undefined" == typeof window || void 0 === window.document || void 0 === window.document.createElement),
                d = Object.prototype.hasOwnProperty,
                f = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
                p = {}, h = {};

            function m(e, t, n, r, a, o, i) {
                this.acceptsBooleans = 2 === t || 3 === t || 4 === t, this.attributeName = r, this.attributeNamespace = a, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i
            }

            var g = {};
            "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function (e) {
                g[e] = new m(e, 0, !1, e, null, !1, !1)
            })), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach((function (e) {
                var t = e[0];
                g[t] = new m(t, 1, !1, e[1], null, !1, !1)
            })), ["contentEditable", "draggable", "spellCheck", "value"].forEach((function (e) {
                g[e] = new m(e, 2, !1, e.toLowerCase(), null, !1, !1)
            })), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach((function (e) {
                g[e] = new m(e, 2, !1, e, null, !1, !1)
            })), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function (e) {
                g[e] = new m(e, 3, !1, e.toLowerCase(), null, !1, !1)
            })), ["checked", "multiple", "muted", "selected"].forEach((function (e) {
                g[e] = new m(e, 3, !0, e, null, !1, !1)
            })), ["capture", "download"].forEach((function (e) {
                g[e] = new m(e, 4, !1, e, null, !1, !1)
            })), ["cols", "rows", "size", "span"].forEach((function (e) {
                g[e] = new m(e, 6, !1, e, null, !1, !1)
            })), ["rowSpan", "start"].forEach((function (e) {
                g[e] = new m(e, 5, !1, e.toLowerCase(), null, !1, !1)
            }));
            var y = /[\-:]([a-z])/g;

            function v(e) {
                return e[1].toUpperCase()
            }

            function b(e, t, n, r) {
                var a = g.hasOwnProperty(t) ? g[t] : null;
                (null !== a ? 0 !== a.type : r || !(2 < t.length) || "o" !== t[0] && "O" !== t[0] || "n" !== t[1] && "N" !== t[1]) && (function (e, t, n, r) {
                    if (null == t || function (e, t, n, r) {
                        if (null !== n && 0 === n.type) return !1;
                        switch (typeof t) {
                            case"function":
                            case"symbol":
                                return !0;
                            case"boolean":
                                return !r && (null !== n ? !n.acceptsBooleans : "data-" !== (e = e.toLowerCase().slice(0, 5)) && "aria-" !== e);
                            default:
                                return !1
                        }
                    }(e, t, n, r)) return !0;
                    if (r) return !1;
                    if (null !== n) switch (n.type) {
                        case 3:
                            return !t;
                        case 4:
                            return !1 === t;
                        case 5:
                            return isNaN(t);
                        case 6:
                            return isNaN(t) || 1 > t
                    }
                    return !1
                }(t, n, a, r) && (n = null), r || null === a ? function (e) {
                    return !!d.call(h, e) || !d.call(p, e) && (f.test(e) ? h[e] = !0 : (p[e] = !0, !1))
                }(t) && (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : a.mustUseProperty ? e[a.propertyName] = null === n ? 3 !== a.type && "" : n : (t = a.attributeName, r = a.attributeNamespace, null === n ? e.removeAttribute(t) : (n = 3 === (a = a.type) || 4 === a && !0 === n ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
            }

            "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function (e) {
                var t = e.replace(y, v);
                g[t] = new m(t, 1, !1, e, null, !1, !1)
            })), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function (e) {
                var t = e.replace(y, v);
                g[t] = new m(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1)
            })), ["xml:base", "xml:lang", "xml:space"].forEach((function (e) {
                var t = e.replace(y, v);
                g[t] = new m(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1)
            })), ["tabIndex", "crossOrigin"].forEach((function (e) {
                g[e] = new m(e, 1, !1, e.toLowerCase(), null, !1, !1)
            })), g.xlinkHref = new m("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach((function (e) {
                g[e] = new m(e, 1, !1, e.toLowerCase(), null, !0, !0)
            }));
            var w = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, x = Symbol.for("react.element"),
                k = Symbol.for("react.portal"), _ = Symbol.for("react.fragment"), S = Symbol.for("react.strict_mode"),
                N = Symbol.for("react.profiler"), j = Symbol.for("react.provider"), C = Symbol.for("react.context"),
                P = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"),
                A = Symbol.for("react.suspense_list"), I = Symbol.for("react.memo"), L = Symbol.for("react.lazy");
            Symbol.for("react.scope"), Symbol.for("react.debug_trace_mode");
            var T = Symbol.for("react.offscreen");
            Symbol.for("react.legacy_hidden"), Symbol.for("react.cache"), Symbol.for("react.tracing_marker");
            var O = Symbol.iterator;

            function R(e) {
                return null === e || "object" != typeof e ? null : "function" == typeof (e = O && e[O] || e["@@iterator"]) ? e : null
            }

            var M, z = Object.assign;

            function U(e) {
                if (void 0 === M) try {
                    throw Error()
                } catch (e) {
                    var t = e.stack.trim().match(/\n( *(at )?)/);
                    M = t && t[1] || ""
                }
                return "\n" + M + e
            }

            var F = !1;

            function D(e, t) {
                if (!e || F) return "";
                F = !0;
                var n = Error.prepareStackTrace;
                Error.prepareStackTrace = void 0;
                try {
                    if (t) if (t = function () {
                        throw Error()
                    }, Object.defineProperty(t.prototype, "props", {
                        set: function () {
                            throw Error()
                        }
                    }), "object" == typeof Reflect && Reflect.construct) {
                        try {
                            Reflect.construct(t, [])
                        } catch (e) {
                            var r = e
                        }
                        Reflect.construct(e, [], t)
                    } else {
                        try {
                            t.call()
                        } catch (e) {
                            r = e
                        }
                        e.call(t.prototype)
                    } else {
                        try {
                            throw Error()
                        } catch (e) {
                            r = e
                        }
                        e()
                    }
                } catch (t) {
                    if (t && r && "string" == typeof t.stack) {
                        for (var a = t.stack.split("\n"), o = r.stack.split("\n"), i = a.length - 1, l = o.length - 1; 1 <= i && 0 <= l && a[i] !== o[l];) l--;
                        for (; 1 <= i && 0 <= l; i--, l--) if (a[i] !== o[l]) {
                            if (1 !== i || 1 !== l) do {
                                if (i--, 0 > --l || a[i] !== o[l]) {
                                    var s = "\n" + a[i].replace(" at new ", " at ");
                                    return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s
                                }
                            } while (1 <= i && 0 <= l);
                            break
                        }
                    }
                } finally {
                    F = !1, Error.prepareStackTrace = n
                }
                return (e = e ? e.displayName || e.name : "") ? U(e) : ""
            }

            function B(e) {
                switch (e.tag) {
                    case 5:
                        return U(e.type);
                    case 16:
                        return U("Lazy");
                    case 13:
                        return U("Suspense");
                    case 19:
                        return U("SuspenseList");
                    case 0:
                    case 2:
                    case 15:
                        return D(e.type, !1);
                    case 11:
                        return D(e.type.render, !1);
                    case 1:
                        return D(e.type, !0);
                    default:
                        return ""
                }
            }

            function Q(e) {
                if (null == e) return null;
                if ("function" == typeof e) return e.displayName || e.name || null;
                if ("string" == typeof e) return e;
                switch (e) {
                    case _:
                        return "Fragment";
                    case k:
                        return "Portal";
                    case N:
                        return "Profiler";
                    case S:
                        return "StrictMode";
                    case E:
                        return "Suspense";
                    case A:
                        return "SuspenseList"
                }
                if ("object" == typeof e) switch (e.$$typeof) {
                    case C:
                        return (e.displayName || "Context") + ".Consumer";
                    case j:
                        return (e._context.displayName || "Context") + ".Provider";
                    case P:
                        var t = e.render;
                        return (e = e.displayName) || (e = "" !== (e = t.displayName || t.name || "") ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
                    case I:
                        return null !== (t = e.displayName || null) ? t : Q(e.type) || "Memo";
                    case L:
                        t = e._payload, e = e._init;
                        try {
                            return Q(e(t))
                        } catch (e) {
                        }
                }
                return null
            }

            function W(e) {
                var t = e.type;
                switch (e.tag) {
                    case 24:
                        return "Cache";
                    case 9:
                        return (t.displayName || "Context") + ".Consumer";
                    case 10:
                        return (t._context.displayName || "Context") + ".Provider";
                    case 18:
                        return "DehydratedFragment";
                    case 11:
                        return e = (e = t.render).displayName || e.name || "", t.displayName || ("" !== e ? "ForwardRef(" + e + ")" : "ForwardRef");
                    case 7:
                        return "Fragment";
                    case 5:
                        return t;
                    case 4:
                        return "Portal";
                    case 3:
                        return "Root";
                    case 6:
                        return "Text";
                    case 16:
                        return Q(t);
                    case 8:
                        return t === S ? "StrictMode" : "Mode";
                    case 22:
                        return "Offscreen";
                    case 12:
                        return "Profiler";
                    case 21:
                        return "Scope";
                    case 13:
                        return "Suspense";
                    case 19:
                        return "SuspenseList";
                    case 25:
                        return "TracingMarker";
                    case 1:
                    case 0:
                    case 17:
                    case 2:
                    case 14:
                    case 15:
                        if ("function" == typeof t) return t.displayName || t.name || null;
                        if ("string" == typeof t) return t
                }
                return null
            }

            function q(e) {
                switch (typeof e) {
                    case"boolean":
                    case"number":
                    case"string":
                    case"undefined":
                    case"object":
                        return e;
                    default:
                        return ""
                }
            }

            function V(e) {
                var t = e.type;
                return (e = e.nodeName) && "input" === e.toLowerCase() && ("checkbox" === t || "radio" === t)
            }

            function $(e) {
                e._valueTracker || (e._valueTracker = function (e) {
                    var t = V(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
                        r = "" + e[t];
                    if (!e.hasOwnProperty(t) && void 0 !== n && "function" == typeof n.get && "function" == typeof n.set) {
                        var a = n.get, o = n.set;
                        return Object.defineProperty(e, t, {
                            configurable: !0, get: function () {
                                return a.call(this)
                            }, set: function (e) {
                                r = "" + e, o.call(this, e)
                            }
                        }), Object.defineProperty(e, t, {enumerable: n.enumerable}), {
                            getValue: function () {
                                return r
                            }, setValue: function (e) {
                                r = "" + e
                            }, stopTracking: function () {
                                e._valueTracker = null, delete e[t]
                            }
                        }
                    }
                }(e))
            }

            function H(e) {
                if (!e) return !1;
                var t = e._valueTracker;
                if (!t) return !0;
                var n = t.getValue(), r = "";
                return e && (r = V(e) ? e.checked ? "true" : "false" : e.value), (e = r) !== n && (t.setValue(e), !0)
            }

            function K(e) {
                if (void 0 === (e = e || ("undefined" != typeof document ? document : void 0))) return null;
                try {
                    return e.activeElement || e.body
                } catch (t) {
                    return e.body
                }
            }

            function G(e, t) {
                var n = t.checked;
                return z({}, t, {
                    defaultChecked: void 0,
                    defaultValue: void 0,
                    value: void 0,
                    checked: null != n ? n : e._wrapperState.initialChecked
                })
            }

            function J(e, t) {
                var n = null == t.defaultValue ? "" : t.defaultValue,
                    r = null != t.checked ? t.checked : t.defaultChecked;
                n = q(null != t.value ? t.value : n), e._wrapperState = {
                    initialChecked: r,
                    initialValue: n,
                    controlled: "checkbox" === t.type || "radio" === t.type ? null != t.checked : null != t.value
                }
            }

            function Y(e, t) {
                null != (t = t.checked) && b(e, "checked", t, !1)
            }

            function X(e, t) {
                Y(e, t);
                var n = q(t.value), r = t.type;
                if (null != n) "number" === r ? (0 === n && "" === e.value || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n); else if ("submit" === r || "reset" === r) return void e.removeAttribute("value");
                t.hasOwnProperty("value") ? ee(e, t.type, n) : t.hasOwnProperty("defaultValue") && ee(e, t.type, q(t.defaultValue)), null == t.checked && null != t.defaultChecked && (e.defaultChecked = !!t.defaultChecked)
            }

            function Z(e, t, n) {
                if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
                    var r = t.type;
                    if (!("submit" !== r && "reset" !== r || void 0 !== t.value && null !== t.value)) return;
                    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t
                }
                "" !== (n = e.name) && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, "" !== n && (e.name = n)
            }

            function ee(e, t, n) {
                "number" === t && K(e.ownerDocument) === e || (null == n ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
            }

            var te = Array.isArray;

            function ne(e, t, n, r) {
                if (e = e.options, t) {
                    t = {};
                    for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
                    for (n = 0; n < e.length; n++) a = t.hasOwnProperty("$" + e[n].value), e[n].selected !== a && (e[n].selected = a), a && r && (e[n].defaultSelected = !0)
                } else {
                    for (n = "" + q(n), t = null, a = 0; a < e.length; a++) {
                        if (e[a].value === n) return e[a].selected = !0, void (r && (e[a].defaultSelected = !0));
                        null !== t || e[a].disabled || (t = e[a])
                    }
                    null !== t && (t.selected = !0)
                }
            }

            function re(e, t) {
                if (null != t.dangerouslySetInnerHTML) throw Error(o(91));
                return z({}, t, {value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue})
            }

            function ae(e, t) {
                var n = t.value;
                if (null == n) {
                    if (n = t.children, t = t.defaultValue, null != n) {
                        if (null != t) throw Error(o(92));
                        if (te(n)) {
                            if (1 < n.length) throw Error(o(93));
                            n = n[0]
                        }
                        t = n
                    }
                    null == t && (t = ""), n = t
                }
                e._wrapperState = {initialValue: q(n)}
            }

            function oe(e, t) {
                var n = q(t.value), r = q(t.defaultValue);
                null != n && ((n = "" + n) !== e.value && (e.value = n), null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)), null != r && (e.defaultValue = "" + r)
            }

            function ie(e) {
                var t = e.textContent;
                t === e._wrapperState.initialValue && "" !== t && null !== t && (e.value = t)
            }

            function le(e) {
                switch (e) {
                    case"svg":
                        return "http://www.w3.org/2000/svg";
                    case"math":
                        return "http://www.w3.org/1998/Math/MathML";
                    default:
                        return "http://www.w3.org/1999/xhtml"
                }
            }

            function se(e, t) {
                return null == e || "http://www.w3.org/1999/xhtml" === e ? le(t) : "http://www.w3.org/2000/svg" === e && "foreignObject" === t ? "http://www.w3.org/1999/xhtml" : e
            }

            var ue, ce, de = (ce = function (e, t) {
                if ("http://www.w3.org/2000/svg" !== e.namespaceURI || "innerHTML" in e) e.innerHTML = t; else {
                    for ((ue = ue || document.createElement("div")).innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = ue.firstChild; e.firstChild;) e.removeChild(e.firstChild);
                    for (; t.firstChild;) e.appendChild(t.firstChild)
                }
            }, "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction ? function (e, t, n, r) {
                MSApp.execUnsafeLocalFunction((function () {
                    return ce(e, t)
                }))
            } : ce);

            function fe(e, t) {
                if (t) {
                    var n = e.firstChild;
                    if (n && n === e.lastChild && 3 === n.nodeType) return void (n.nodeValue = t)
                }
                e.textContent = t
            }

            var pe = {
                animationIterationCount: !0,
                aspectRatio: !0,
                borderImageOutset: !0,
                borderImageSlice: !0,
                borderImageWidth: !0,
                boxFlex: !0,
                boxFlexGroup: !0,
                boxOrdinalGroup: !0,
                columnCount: !0,
                columns: !0,
                flex: !0,
                flexGrow: !0,
                flexPositive: !0,
                flexShrink: !0,
                flexNegative: !0,
                flexOrder: !0,
                gridArea: !0,
                gridRow: !0,
                gridRowEnd: !0,
                gridRowSpan: !0,
                gridRowStart: !0,
                gridColumn: !0,
                gridColumnEnd: !0,
                gridColumnSpan: !0,
                gridColumnStart: !0,
                fontWeight: !0,
                lineClamp: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                tabSize: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0,
                fillOpacity: !0,
                floodOpacity: !0,
                stopOpacity: !0,
                strokeDasharray: !0,
                strokeDashoffset: !0,
                strokeMiterlimit: !0,
                strokeOpacity: !0,
                strokeWidth: !0
            }, he = ["Webkit", "ms", "Moz", "O"];

            function me(e, t, n) {
                return null == t || "boolean" == typeof t || "" === t ? "" : n || "number" != typeof t || 0 === t || pe.hasOwnProperty(e) && pe[e] ? ("" + t).trim() : t + "px"
            }

            function ge(e, t) {
                for (var n in e = e.style, t) if (t.hasOwnProperty(n)) {
                    var r = 0 === n.indexOf("--"), a = me(n, t[n], r);
                    "float" === n && (n = "cssFloat"), r ? e.setProperty(n, a) : e[n] = a
                }
            }

            Object.keys(pe).forEach((function (e) {
                he.forEach((function (t) {
                    t = t + e.charAt(0).toUpperCase() + e.substring(1), pe[t] = pe[e]
                }))
            }));
            var ye = z({menuitem: !0}, {
                area: !0,
                base: !0,
                br: !0,
                col: !0,
                embed: !0,
                hr: !0,
                img: !0,
                input: !0,
                keygen: !0,
                link: !0,
                meta: !0,
                param: !0,
                source: !0,
                track: !0,
                wbr: !0
            });

            function ve(e, t) {
                if (t) {
                    if (ye[e] && (null != t.children || null != t.dangerouslySetInnerHTML)) throw Error(o(137, e));
                    if (null != t.dangerouslySetInnerHTML) {
                        if (null != t.children) throw Error(o(60));
                        if ("object" != typeof t.dangerouslySetInnerHTML || !("__html" in t.dangerouslySetInnerHTML)) throw Error(o(61))
                    }
                    if (null != t.style && "object" != typeof t.style) throw Error(o(62))
                }
            }

            function be(e, t) {
                if (-1 === e.indexOf("-")) return "string" == typeof t.is;
                switch (e) {
                    case"annotation-xml":
                    case"color-profile":
                    case"font-face":
                    case"font-face-src":
                    case"font-face-uri":
                    case"font-face-format":
                    case"font-face-name":
                    case"missing-glyph":
                        return !1;
                    default:
                        return !0
                }
            }

            var we = null;

            function xe(e) {
                return (e = e.target || e.srcElement || window).correspondingUseElement && (e = e.correspondingUseElement), 3 === e.nodeType ? e.parentNode : e
            }

            var ke = null, _e = null, Se = null;

            function Ne(e) {
                if (e = ba(e)) {
                    if ("function" != typeof ke) throw Error(o(280));
                    var t = e.stateNode;
                    t && (t = xa(t), ke(e.stateNode, e.type, t))
                }
            }

            function je(e) {
                _e ? Se ? Se.push(e) : Se = [e] : _e = e
            }

            function Ce() {
                if (_e) {
                    var e = _e, t = Se;
                    if (Se = _e = null, Ne(e), t) for (e = 0; e < t.length; e++) Ne(t[e])
                }
            }

            function Pe(e, t) {
                return e(t)
            }

            function Ee() {
            }

            var Ae = !1;

            function Ie(e, t, n) {
                if (Ae) return e(t, n);
                Ae = !0;
                try {
                    return Pe(e, t, n)
                } finally {
                    Ae = !1, (null !== _e || null !== Se) && (Ee(), Ce())
                }
            }

            function Le(e, t) {
                var n = e.stateNode;
                if (null === n) return null;
                var r = xa(n);
                if (null === r) return null;
                n = r[t];
                e:switch (t) {
                    case"onClick":
                    case"onClickCapture":
                    case"onDoubleClick":
                    case"onDoubleClickCapture":
                    case"onMouseDown":
                    case"onMouseDownCapture":
                    case"onMouseMove":
                    case"onMouseMoveCapture":
                    case"onMouseUp":
                    case"onMouseUpCapture":
                    case"onMouseEnter":
                        (r = !r.disabled) || (r = !("button" === (e = e.type) || "input" === e || "select" === e || "textarea" === e)), e = !r;
                        break e;
                    default:
                        e = !1
                }
                if (e) return null;
                if (n && "function" != typeof n) throw Error(o(231, t, typeof n));
                return n
            }

            var Te = !1;
            if (c) try {
                var Oe = {};
                Object.defineProperty(Oe, "passive", {
                    get: function () {
                        Te = !0
                    }
                }), window.addEventListener("test", Oe, Oe), window.removeEventListener("test", Oe, Oe)
            } catch (ce) {
                Te = !1
            }

            function Re(e, t, n, r, a, o, i, l, s) {
                var u = Array.prototype.slice.call(arguments, 3);
                try {
                    t.apply(n, u)
                } catch (e) {
                    this.onError(e)
                }
            }

            var Me = !1, ze = null, Ue = !1, Fe = null, De = {
                onError: function (e) {
                    Me = !0, ze = e
                }
            };

            function Be(e, t, n, r, a, o, i, l, s) {
                Me = !1, ze = null, Re.apply(De, arguments)
            }

            function Qe(e) {
                var t = e, n = e;
                if (e.alternate) for (; t.return;) t = t.return; else {
                    e = t;
                    do {
                        !!(4098 & (t = e).flags) && (n = t.return), e = t.return
                    } while (e)
                }
                return 3 === t.tag ? n : null
            }

            function We(e) {
                if (13 === e.tag) {
                    var t = e.memoizedState;
                    if (null === t && null !== (e = e.alternate) && (t = e.memoizedState), null !== t) return t.dehydrated
                }
                return null
            }

            function qe(e) {
                if (Qe(e) !== e) throw Error(o(188))
            }

            function Ve(e) {
                return null !== (e = function (e) {
                    var t = e.alternate;
                    if (!t) {
                        if (null === (t = Qe(e))) throw Error(o(188));
                        return t !== e ? null : e
                    }
                    for (var n = e, r = t; ;) {
                        var a = n.return;
                        if (null === a) break;
                        var i = a.alternate;
                        if (null === i) {
                            if (null !== (r = a.return)) {
                                n = r;
                                continue
                            }
                            break
                        }
                        if (a.child === i.child) {
                            for (i = a.child; i;) {
                                if (i === n) return qe(a), e;
                                if (i === r) return qe(a), t;
                                i = i.sibling
                            }
                            throw Error(o(188))
                        }
                        if (n.return !== r.return) n = a, r = i; else {
                            for (var l = !1, s = a.child; s;) {
                                if (s === n) {
                                    l = !0, n = a, r = i;
                                    break
                                }
                                if (s === r) {
                                    l = !0, r = a, n = i;
                                    break
                                }
                                s = s.sibling
                            }
                            if (!l) {
                                for (s = i.child; s;) {
                                    if (s === n) {
                                        l = !0, n = i, r = a;
                                        break
                                    }
                                    if (s === r) {
                                        l = !0, r = i, n = a;
                                        break
                                    }
                                    s = s.sibling
                                }
                                if (!l) throw Error(o(189))
                            }
                        }
                        if (n.alternate !== r) throw Error(o(190))
                    }
                    if (3 !== n.tag) throw Error(o(188));
                    return n.stateNode.current === n ? e : t
                }(e)) ? $e(e) : null
            }

            function $e(e) {
                if (5 === e.tag || 6 === e.tag) return e;
                for (e = e.child; null !== e;) {
                    var t = $e(e);
                    if (null !== t) return t;
                    e = e.sibling
                }
                return null
            }

            var He = a.unstable_scheduleCallback, Ke = a.unstable_cancelCallback, Ge = a.unstable_shouldYield,
                Je = a.unstable_requestPaint, Ye = a.unstable_now, Xe = a.unstable_getCurrentPriorityLevel,
                Ze = a.unstable_ImmediatePriority, et = a.unstable_UserBlockingPriority, tt = a.unstable_NormalPriority,
                nt = a.unstable_LowPriority, rt = a.unstable_IdlePriority, at = null, ot = null,
                it = Math.clz32 ? Math.clz32 : function (e) {
                    return 0 === (e >>>= 0) ? 32 : 31 - (lt(e) / st | 0) | 0
                }, lt = Math.log, st = Math.LN2, ut = 64, ct = 4194304;

            function dt(e) {
                switch (e & -e) {
                    case 1:
                        return 1;
                    case 2:
                        return 2;
                    case 4:
                        return 4;
                    case 8:
                        return 8;
                    case 16:
                        return 16;
                    case 32:
                        return 32;
                    case 64:
                    case 128:
                    case 256:
                    case 512:
                    case 1024:
                    case 2048:
                    case 4096:
                    case 8192:
                    case 16384:
                    case 32768:
                    case 65536:
                    case 131072:
                    case 262144:
                    case 524288:
                    case 1048576:
                    case 2097152:
                        return 4194240 & e;
                    case 4194304:
                    case 8388608:
                    case 16777216:
                    case 33554432:
                    case 67108864:
                        return 130023424 & e;
                    case 134217728:
                        return 134217728;
                    case 268435456:
                        return 268435456;
                    case 536870912:
                        return 536870912;
                    case 1073741824:
                        return 1073741824;
                    default:
                        return e
                }
            }

            function ft(e, t) {
                var n = e.pendingLanes;
                if (0 === n) return 0;
                var r = 0, a = e.suspendedLanes, o = e.pingedLanes, i = 268435455 & n;
                if (0 !== i) {
                    var l = i & ~a;
                    0 !== l ? r = dt(l) : 0 !== (o &= i) && (r = dt(o))
                } else 0 !== (i = n & ~a) ? r = dt(i) : 0 !== o && (r = dt(o));
                if (0 === r) return 0;
                if (0 !== t && t !== r && 0 === (t & a) && ((a = r & -r) >= (o = t & -t) || 16 === a && 4194240 & o)) return t;
                if (4 & r && (r |= 16 & n), 0 !== (t = e.entangledLanes)) for (e = e.entanglements, t &= r; 0 < t;) a = 1 << (n = 31 - it(t)), r |= e[n], t &= ~a;
                return r
            }

            function pt(e, t) {
                switch (e) {
                    case 1:
                    case 2:
                    case 4:
                        return t + 250;
                    case 8:
                    case 16:
                    case 32:
                    case 64:
                    case 128:
                    case 256:
                    case 512:
                    case 1024:
                    case 2048:
                    case 4096:
                    case 8192:
                    case 16384:
                    case 32768:
                    case 65536:
                    case 131072:
                    case 262144:
                    case 524288:
                    case 1048576:
                    case 2097152:
                        return t + 5e3;
                    default:
                        return -1
                }
            }

            function ht(e) {
                return 0 != (e = -1073741825 & e.pendingLanes) ? e : 1073741824 & e ? 1073741824 : 0
            }

            function mt() {
                var e = ut;
                return !(4194240 & (ut <<= 1)) && (ut = 64), e
            }

            function gt(e) {
                for (var t = [], n = 0; 31 > n; n++) t.push(e);
                return t
            }

            function yt(e, t, n) {
                e.pendingLanes |= t, 536870912 !== t && (e.suspendedLanes = 0, e.pingedLanes = 0), (e = e.eventTimes)[t = 31 - it(t)] = n
            }

            function vt(e, t) {
                var n = e.entangledLanes |= t;
                for (e = e.entanglements; n;) {
                    var r = 31 - it(n), a = 1 << r;
                    a & t | e[r] & t && (e[r] |= t), n &= ~a
                }
            }

            var bt = 0;

            function wt(e) {
                return 1 < (e &= -e) ? 4 < e ? 268435455 & e ? 16 : 536870912 : 4 : 1
            }

            var xt, kt, _t, St, Nt, jt = !1, Ct = [], Pt = null, Et = null, At = null, It = new Map, Lt = new Map,
                Tt = [],
                Ot = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");

            function Rt(e, t) {
                switch (e) {
                    case"focusin":
                    case"focusout":
                        Pt = null;
                        break;
                    case"dragenter":
                    case"dragleave":
                        Et = null;
                        break;
                    case"mouseover":
                    case"mouseout":
                        At = null;
                        break;
                    case"pointerover":
                    case"pointerout":
                        It.delete(t.pointerId);
                        break;
                    case"gotpointercapture":
                    case"lostpointercapture":
                        Lt.delete(t.pointerId)
                }
            }

            function Mt(e, t, n, r, a, o) {
                return null === e || e.nativeEvent !== o ? (e = {
                    blockedOn: t,
                    domEventName: n,
                    eventSystemFlags: r,
                    nativeEvent: o,
                    targetContainers: [a]
                }, null !== t && null !== (t = ba(t)) && kt(t), e) : (e.eventSystemFlags |= r, t = e.targetContainers, null !== a && -1 === t.indexOf(a) && t.push(a), e)
            }

            function zt(e) {
                var t = va(e.target);
                if (null !== t) {
                    var n = Qe(t);
                    if (null !== n) if (13 === (t = n.tag)) {
                        if (null !== (t = We(n))) return e.blockedOn = t, void Nt(e.priority, (function () {
                            _t(n)
                        }))
                    } else if (3 === t && n.stateNode.current.memoizedState.isDehydrated) return void (e.blockedOn = 3 === n.tag ? n.stateNode.containerInfo : null)
                }
                e.blockedOn = null
            }

            function Ut(e) {
                if (null !== e.blockedOn) return !1;
                for (var t = e.targetContainers; 0 < t.length;) {
                    var n = Gt(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
                    if (null !== n) return null !== (t = ba(n)) && kt(t), e.blockedOn = n, !1;
                    var r = new (n = e.nativeEvent).constructor(n.type, n);
                    we = r, n.target.dispatchEvent(r), we = null, t.shift()
                }
                return !0
            }

            function Ft(e, t, n) {
                Ut(e) && n.delete(t)
            }

            function Dt() {
                jt = !1, null !== Pt && Ut(Pt) && (Pt = null), null !== Et && Ut(Et) && (Et = null), null !== At && Ut(At) && (At = null), It.forEach(Ft), Lt.forEach(Ft)
            }

            function Bt(e, t) {
                e.blockedOn === t && (e.blockedOn = null, jt || (jt = !0, a.unstable_scheduleCallback(a.unstable_NormalPriority, Dt)))
            }

            function Qt(e) {
                function t(t) {
                    return Bt(t, e)
                }

                if (0 < Ct.length) {
                    Bt(Ct[0], e);
                    for (var n = 1; n < Ct.length; n++) {
                        var r = Ct[n];
                        r.blockedOn === e && (r.blockedOn = null)
                    }
                }
                for (null !== Pt && Bt(Pt, e), null !== Et && Bt(Et, e), null !== At && Bt(At, e), It.forEach(t), Lt.forEach(t), n = 0; n < Tt.length; n++) (r = Tt[n]).blockedOn === e && (r.blockedOn = null);
                for (; 0 < Tt.length && null === (n = Tt[0]).blockedOn;) zt(n), null === n.blockedOn && Tt.shift()
            }

            var Wt = w.ReactCurrentBatchConfig, qt = !0;

            function Vt(e, t, n, r) {
                var a = bt, o = Wt.transition;
                Wt.transition = null;
                try {
                    bt = 1, Ht(e, t, n, r)
                } finally {
                    bt = a, Wt.transition = o
                }
            }

            function $t(e, t, n, r) {
                var a = bt, o = Wt.transition;
                Wt.transition = null;
                try {
                    bt = 4, Ht(e, t, n, r)
                } finally {
                    bt = a, Wt.transition = o
                }
            }

            function Ht(e, t, n, r) {
                if (qt) {
                    var a = Gt(e, t, n, r);
                    if (null === a) qr(e, t, r, Kt, n), Rt(e, r); else if (function (e, t, n, r, a) {
                        switch (t) {
                            case"focusin":
                                return Pt = Mt(Pt, e, t, n, r, a), !0;
                            case"dragenter":
                                return Et = Mt(Et, e, t, n, r, a), !0;
                            case"mouseover":
                                return At = Mt(At, e, t, n, r, a), !0;
                            case"pointerover":
                                var o = a.pointerId;
                                return It.set(o, Mt(It.get(o) || null, e, t, n, r, a)), !0;
                            case"gotpointercapture":
                                return o = a.pointerId, Lt.set(o, Mt(Lt.get(o) || null, e, t, n, r, a)), !0
                        }
                        return !1
                    }(a, e, t, n, r)) r.stopPropagation(); else if (Rt(e, r), 4 & t && -1 < Ot.indexOf(e)) {
                        for (; null !== a;) {
                            var o = ba(a);
                            if (null !== o && xt(o), null === (o = Gt(e, t, n, r)) && qr(e, t, r, Kt, n), o === a) break;
                            a = o
                        }
                        null !== a && r.stopPropagation()
                    } else qr(e, t, r, null, n)
                }
            }

            var Kt = null;

            function Gt(e, t, n, r) {
                if (Kt = null, null !== (e = va(e = xe(r)))) if (null === (t = Qe(e))) e = null; else if (13 === (n = t.tag)) {
                    if (null !== (e = We(t))) return e;
                    e = null
                } else if (3 === n) {
                    if (t.stateNode.current.memoizedState.isDehydrated) return 3 === t.tag ? t.stateNode.containerInfo : null;
                    e = null
                } else t !== e && (e = null);
                return Kt = e, null
            }

            function Jt(e) {
                switch (e) {
                    case"cancel":
                    case"click":
                    case"close":
                    case"contextmenu":
                    case"copy":
                    case"cut":
                    case"auxclick":
                    case"dblclick":
                    case"dragend":
                    case"dragstart":
                    case"drop":
                    case"focusin":
                    case"focusout":
                    case"input":
                    case"invalid":
                    case"keydown":
                    case"keypress":
                    case"keyup":
                    case"mousedown":
                    case"mouseup":
                    case"paste":
                    case"pause":
                    case"play":
                    case"pointercancel":
                    case"pointerdown":
                    case"pointerup":
                    case"ratechange":
                    case"reset":
                    case"resize":
                    case"seeked":
                    case"submit":
                    case"touchcancel":
                    case"touchend":
                    case"touchstart":
                    case"volumechange":
                    case"change":
                    case"selectionchange":
                    case"textInput":
                    case"compositionstart":
                    case"compositionend":
                    case"compositionupdate":
                    case"beforeblur":
                    case"afterblur":
                    case"beforeinput":
                    case"blur":
                    case"fullscreenchange":
                    case"focus":
                    case"hashchange":
                    case"popstate":
                    case"select":
                    case"selectstart":
                        return 1;
                    case"drag":
                    case"dragenter":
                    case"dragexit":
                    case"dragleave":
                    case"dragover":
                    case"mousemove":
                    case"mouseout":
                    case"mouseover":
                    case"pointermove":
                    case"pointerout":
                    case"pointerover":
                    case"scroll":
                    case"toggle":
                    case"touchmove":
                    case"wheel":
                    case"mouseenter":
                    case"mouseleave":
                    case"pointerenter":
                    case"pointerleave":
                        return 4;
                    case"message":
                        switch (Xe()) {
                            case Ze:
                                return 1;
                            case et:
                                return 4;
                            case tt:
                            case nt:
                                return 16;
                            case rt:
                                return 536870912;
                            default:
                                return 16
                        }
                    default:
                        return 16
                }
            }

            var Yt = null, Xt = null, Zt = null;

            function en() {
                if (Zt) return Zt;
                var e, t, n = Xt, r = n.length, a = "value" in Yt ? Yt.value : Yt.textContent, o = a.length;
                for (e = 0; e < r && n[e] === a[e]; e++) ;
                var i = r - e;
                for (t = 1; t <= i && n[r - t] === a[o - t]; t++) ;
                return Zt = a.slice(e, 1 < t ? 1 - t : void 0)
            }

            function tn(e) {
                var t = e.keyCode;
                return "charCode" in e ? 0 === (e = e.charCode) && 13 === t && (e = 13) : e = t, 10 === e && (e = 13), 32 <= e || 13 === e ? e : 0
            }

            function nn() {
                return !0
            }

            function rn() {
                return !1
            }

            function an(e) {
                function t(t, n, r, a, o) {
                    for (var i in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = a, this.target = o, this.currentTarget = null, e) e.hasOwnProperty(i) && (t = e[i], this[i] = t ? t(a) : a[i]);
                    return this.isDefaultPrevented = (null != a.defaultPrevented ? a.defaultPrevented : !1 === a.returnValue) ? nn : rn, this.isPropagationStopped = rn, this
                }

                return z(t.prototype, {
                    preventDefault: function () {
                        this.defaultPrevented = !0;
                        var e = this.nativeEvent;
                        e && (e.preventDefault ? e.preventDefault() : "unknown" != typeof e.returnValue && (e.returnValue = !1), this.isDefaultPrevented = nn)
                    }, stopPropagation: function () {
                        var e = this.nativeEvent;
                        e && (e.stopPropagation ? e.stopPropagation() : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0), this.isPropagationStopped = nn)
                    }, persist: function () {
                    }, isPersistent: nn
                }), t
            }

            var on, ln, sn, un = {
                    eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function (e) {
                        return e.timeStamp || Date.now()
                    }, defaultPrevented: 0, isTrusted: 0
                }, cn = an(un), dn = z({}, un, {view: 0, detail: 0}), fn = an(dn), pn = z({}, dn, {
                    screenX: 0,
                    screenY: 0,
                    clientX: 0,
                    clientY: 0,
                    pageX: 0,
                    pageY: 0,
                    ctrlKey: 0,
                    shiftKey: 0,
                    altKey: 0,
                    metaKey: 0,
                    getModifierState: Nn,
                    button: 0,
                    buttons: 0,
                    relatedTarget: function (e) {
                        return void 0 === e.relatedTarget ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
                    },
                    movementX: function (e) {
                        return "movementX" in e ? e.movementX : (e !== sn && (sn && "mousemove" === e.type ? (on = e.screenX - sn.screenX, ln = e.screenY - sn.screenY) : ln = on = 0, sn = e), on)
                    },
                    movementY: function (e) {
                        return "movementY" in e ? e.movementY : ln
                    }
                }), hn = an(pn), mn = an(z({}, pn, {dataTransfer: 0})), gn = an(z({}, dn, {relatedTarget: 0})),
                yn = an(z({}, un, {animationName: 0, elapsedTime: 0, pseudoElement: 0})), vn = z({}, un, {
                    clipboardData: function (e) {
                        return "clipboardData" in e ? e.clipboardData : window.clipboardData
                    }
                }), bn = an(vn), wn = an(z({}, un, {data: 0})), xn = {
                    Esc: "Escape",
                    Spacebar: " ",
                    Left: "ArrowLeft",
                    Up: "ArrowUp",
                    Right: "ArrowRight",
                    Down: "ArrowDown",
                    Del: "Delete",
                    Win: "OS",
                    Menu: "ContextMenu",
                    Apps: "ContextMenu",
                    Scroll: "ScrollLock",
                    MozPrintableKey: "Unidentified"
                }, kn = {
                    8: "Backspace",
                    9: "Tab",
                    12: "Clear",
                    13: "Enter",
                    16: "Shift",
                    17: "Control",
                    18: "Alt",
                    19: "Pause",
                    20: "CapsLock",
                    27: "Escape",
                    32: " ",
                    33: "PageUp",
                    34: "PageDown",
                    35: "End",
                    36: "Home",
                    37: "ArrowLeft",
                    38: "ArrowUp",
                    39: "ArrowRight",
                    40: "ArrowDown",
                    45: "Insert",
                    46: "Delete",
                    112: "F1",
                    113: "F2",
                    114: "F3",
                    115: "F4",
                    116: "F5",
                    117: "F6",
                    118: "F7",
                    119: "F8",
                    120: "F9",
                    121: "F10",
                    122: "F11",
                    123: "F12",
                    144: "NumLock",
                    145: "ScrollLock",
                    224: "Meta"
                }, _n = {Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey"};

            function Sn(e) {
                var t = this.nativeEvent;
                return t.getModifierState ? t.getModifierState(e) : !!(e = _n[e]) && !!t[e]
            }

            function Nn() {
                return Sn
            }

            var jn = z({}, dn, {
                key: function (e) {
                    if (e.key) {
                        var t = xn[e.key] || e.key;
                        if ("Unidentified" !== t) return t
                    }
                    return "keypress" === e.type ? 13 === (e = tn(e)) ? "Enter" : String.fromCharCode(e) : "keydown" === e.type || "keyup" === e.type ? kn[e.keyCode] || "Unidentified" : ""
                },
                code: 0,
                location: 0,
                ctrlKey: 0,
                shiftKey: 0,
                altKey: 0,
                metaKey: 0,
                repeat: 0,
                locale: 0,
                getModifierState: Nn,
                charCode: function (e) {
                    return "keypress" === e.type ? tn(e) : 0
                },
                keyCode: function (e) {
                    return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0
                },
                which: function (e) {
                    return "keypress" === e.type ? tn(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0
                }
            }), Cn = an(jn), Pn = an(z({}, pn, {
                pointerId: 0,
                width: 0,
                height: 0,
                pressure: 0,
                tangentialPressure: 0,
                tiltX: 0,
                tiltY: 0,
                twist: 0,
                pointerType: 0,
                isPrimary: 0
            })), En = an(z({}, dn, {
                touches: 0,
                targetTouches: 0,
                changedTouches: 0,
                altKey: 0,
                metaKey: 0,
                ctrlKey: 0,
                shiftKey: 0,
                getModifierState: Nn
            })), An = an(z({}, un, {propertyName: 0, elapsedTime: 0, pseudoElement: 0})), In = z({}, pn, {
                deltaX: function (e) {
                    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
                }, deltaY: function (e) {
                    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
                }, deltaZ: 0, deltaMode: 0
            }), Ln = an(In), Tn = [9, 13, 27, 32], On = c && "CompositionEvent" in window, Rn = null;
            c && "documentMode" in document && (Rn = document.documentMode);
            var Mn = c && "TextEvent" in window && !Rn, zn = c && (!On || Rn && 8 < Rn && 11 >= Rn),
                Un = String.fromCharCode(32), Fn = !1;

            function Dn(e, t) {
                switch (e) {
                    case"keyup":
                        return -1 !== Tn.indexOf(t.keyCode);
                    case"keydown":
                        return 229 !== t.keyCode;
                    case"keypress":
                    case"mousedown":
                    case"focusout":
                        return !0;
                    default:
                        return !1
                }
            }

            function Bn(e) {
                return "object" == typeof (e = e.detail) && "data" in e ? e.data : null
            }

            var Qn = !1, Wn = {
                color: !0,
                date: !0,
                datetime: !0,
                "datetime-local": !0,
                email: !0,
                month: !0,
                number: !0,
                password: !0,
                range: !0,
                search: !0,
                tel: !0,
                text: !0,
                time: !0,
                url: !0,
                week: !0
            };

            function qn(e) {
                var t = e && e.nodeName && e.nodeName.toLowerCase();
                return "input" === t ? !!Wn[e.type] : "textarea" === t
            }

            function Vn(e, t, n, r) {
                je(r), 0 < (t = $r(t, "onChange")).length && (n = new cn("onChange", "change", null, n, r), e.push({
                    event: n,
                    listeners: t
                }))
            }

            var $n = null, Hn = null;

            function Kn(e) {
                Ur(e, 0)
            }

            function Gn(e) {
                if (H(wa(e))) return e
            }

            function Jn(e, t) {
                if ("change" === e) return t
            }

            var Yn = !1;
            if (c) {
                var Xn;
                if (c) {
                    var Zn = "oninput" in document;
                    if (!Zn) {
                        var er = document.createElement("div");
                        er.setAttribute("oninput", "return;"), Zn = "function" == typeof er.oninput
                    }
                    Xn = Zn
                } else Xn = !1;
                Yn = Xn && (!document.documentMode || 9 < document.documentMode)
            }

            function tr() {
                $n && ($n.detachEvent("onpropertychange", nr), Hn = $n = null)
            }

            function nr(e) {
                if ("value" === e.propertyName && Gn(Hn)) {
                    var t = [];
                    Vn(t, Hn, e, xe(e)), Ie(Kn, t)
                }
            }

            function rr(e, t, n) {
                "focusin" === e ? (tr(), Hn = n, ($n = t).attachEvent("onpropertychange", nr)) : "focusout" === e && tr()
            }

            function ar(e) {
                if ("selectionchange" === e || "keyup" === e || "keydown" === e) return Gn(Hn)
            }

            function or(e, t) {
                if ("click" === e) return Gn(t)
            }

            function ir(e, t) {
                if ("input" === e || "change" === e) return Gn(t)
            }

            var lr = "function" == typeof Object.is ? Object.is : function (e, t) {
                return e === t && (0 !== e || 1 / e == 1 / t) || e != e && t != t
            };

            function sr(e, t) {
                if (lr(e, t)) return !0;
                if ("object" != typeof e || null === e || "object" != typeof t || null === t) return !1;
                var n = Object.keys(e), r = Object.keys(t);
                if (n.length !== r.length) return !1;
                for (r = 0; r < n.length; r++) {
                    var a = n[r];
                    if (!d.call(t, a) || !lr(e[a], t[a])) return !1
                }
                return !0
            }

            function ur(e) {
                for (; e && e.firstChild;) e = e.firstChild;
                return e
            }

            function cr(e, t) {
                var n, r = ur(e);
                for (e = 0; r;) {
                    if (3 === r.nodeType) {
                        if (n = e + r.textContent.length, e <= t && n >= t) return {node: r, offset: t - e};
                        e = n
                    }
                    e:{
                        for (; r;) {
                            if (r.nextSibling) {
                                r = r.nextSibling;
                                break e
                            }
                            r = r.parentNode
                        }
                        r = void 0
                    }
                    r = ur(r)
                }
            }

            function dr(e, t) {
                return !(!e || !t) && (e === t || (!e || 3 !== e.nodeType) && (t && 3 === t.nodeType ? dr(e, t.parentNode) : "contains" in e ? e.contains(t) : !!e.compareDocumentPosition && !!(16 & e.compareDocumentPosition(t))))
            }

            function fr() {
                for (var e = window, t = K(); t instanceof e.HTMLIFrameElement;) {
                    try {
                        var n = "string" == typeof t.contentWindow.location.href
                    } catch (e) {
                        n = !1
                    }
                    if (!n) break;
                    t = K((e = t.contentWindow).document)
                }
                return t
            }

            function pr(e) {
                var t = e && e.nodeName && e.nodeName.toLowerCase();
                return t && ("input" === t && ("text" === e.type || "search" === e.type || "tel" === e.type || "url" === e.type || "password" === e.type) || "textarea" === t || "true" === e.contentEditable)
            }

            function hr(e) {
                var t = fr(), n = e.focusedElem, r = e.selectionRange;
                if (t !== n && n && n.ownerDocument && dr(n.ownerDocument.documentElement, n)) {
                    if (null !== r && pr(n)) if (t = r.start, void 0 === (e = r.end) && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length); else if ((e = (t = n.ownerDocument || document) && t.defaultView || window).getSelection) {
                        e = e.getSelection();
                        var a = n.textContent.length, o = Math.min(r.start, a);
                        r = void 0 === r.end ? o : Math.min(r.end, a), !e.extend && o > r && (a = r, r = o, o = a), a = cr(n, o);
                        var i = cr(n, r);
                        a && i && (1 !== e.rangeCount || e.anchorNode !== a.node || e.anchorOffset !== a.offset || e.focusNode !== i.node || e.focusOffset !== i.offset) && ((t = t.createRange()).setStart(a.node, a.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset), e.addRange(t)))
                    }
                    for (t = [], e = n; e = e.parentNode;) 1 === e.nodeType && t.push({
                        element: e,
                        left: e.scrollLeft,
                        top: e.scrollTop
                    });
                    for ("function" == typeof n.focus && n.focus(), n = 0; n < t.length; n++) (e = t[n]).element.scrollLeft = e.left, e.element.scrollTop = e.top
                }
            }

            var mr = c && "documentMode" in document && 11 >= document.documentMode, gr = null, yr = null, vr = null,
                br = !1;

            function wr(e, t, n) {
                var r = n.window === n ? n.document : 9 === n.nodeType ? n : n.ownerDocument;
                br || null == gr || gr !== K(r) || (r = "selectionStart" in (r = gr) && pr(r) ? {
                    start: r.selectionStart,
                    end: r.selectionEnd
                } : {
                    anchorNode: (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection()).anchorNode,
                    anchorOffset: r.anchorOffset,
                    focusNode: r.focusNode,
                    focusOffset: r.focusOffset
                }, vr && sr(vr, r) || (vr = r, 0 < (r = $r(yr, "onSelect")).length && (t = new cn("onSelect", "select", null, t, n), e.push({
                    event: t,
                    listeners: r
                }), t.target = gr)))
            }

            function xr(e, t) {
                var n = {};
                return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n
            }

            var kr = {
                animationend: xr("Animation", "AnimationEnd"),
                animationiteration: xr("Animation", "AnimationIteration"),
                animationstart: xr("Animation", "AnimationStart"),
                transitionend: xr("Transition", "TransitionEnd")
            }, _r = {}, Sr = {};

            function Nr(e) {
                if (_r[e]) return _r[e];
                if (!kr[e]) return e;
                var t, n = kr[e];
                for (t in n) if (n.hasOwnProperty(t) && t in Sr) return _r[e] = n[t];
                return e
            }

            c && (Sr = document.createElement("div").style, "AnimationEvent" in window || (delete kr.animationend.animation, delete kr.animationiteration.animation, delete kr.animationstart.animation), "TransitionEvent" in window || delete kr.transitionend.transition);
            var jr = Nr("animationend"), Cr = Nr("animationiteration"), Pr = Nr("animationstart"),
                Er = Nr("transitionend"), Ar = new Map,
                Ir = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");

            function Lr(e, t) {
                Ar.set(e, t), s(t, [e])
            }

            for (var Tr = 0; Tr < Ir.length; Tr++) {
                var Or = Ir[Tr];
                Lr(Or.toLowerCase(), "on" + (Or[0].toUpperCase() + Or.slice(1)))
            }
            Lr(jr, "onAnimationEnd"), Lr(Cr, "onAnimationIteration"), Lr(Pr, "onAnimationStart"), Lr("dblclick", "onDoubleClick"), Lr("focusin", "onFocus"), Lr("focusout", "onBlur"), Lr(Er, "onTransitionEnd"), u("onMouseEnter", ["mouseout", "mouseover"]), u("onMouseLeave", ["mouseout", "mouseover"]), u("onPointerEnter", ["pointerout", "pointerover"]), u("onPointerLeave", ["pointerout", "pointerover"]), s("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), s("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), s("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), s("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), s("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), s("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
            var Rr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
                Mr = new Set("cancel close invalid load scroll toggle".split(" ").concat(Rr));

            function zr(e, t, n) {
                var r = e.type || "unknown-event";
                e.currentTarget = n, function (e, t, n, r, a, i, l, s, u) {
                    if (Be.apply(this, arguments), Me) {
                        if (!Me) throw Error(o(198));
                        var c = ze;
                        Me = !1, ze = null, Ue || (Ue = !0, Fe = c)
                    }
                }(r, t, void 0, e), e.currentTarget = null
            }

            function Ur(e, t) {
                t = !!(4 & t);
                for (var n = 0; n < e.length; n++) {
                    var r = e[n], a = r.event;
                    r = r.listeners;
                    e:{
                        var o = void 0;
                        if (t) for (var i = r.length - 1; 0 <= i; i--) {
                            var l = r[i], s = l.instance, u = l.currentTarget;
                            if (l = l.listener, s !== o && a.isPropagationStopped()) break e;
                            zr(a, l, u), o = s
                        } else for (i = 0; i < r.length; i++) {
                            if (s = (l = r[i]).instance, u = l.currentTarget, l = l.listener, s !== o && a.isPropagationStopped()) break e;
                            zr(a, l, u), o = s
                        }
                    }
                }
                if (Ue) throw e = Fe, Ue = !1, Fe = null, e
            }

            function Fr(e, t) {
                var n = t[ma];
                void 0 === n && (n = t[ma] = new Set);
                var r = e + "__bubble";
                n.has(r) || (Wr(t, e, 2, !1), n.add(r))
            }

            function Dr(e, t, n) {
                var r = 0;
                t && (r |= 4), Wr(n, e, r, t)
            }

            var Br = "_reactListening" + Math.random().toString(36).slice(2);

            function Qr(e) {
                if (!e[Br]) {
                    e[Br] = !0, i.forEach((function (t) {
                        "selectionchange" !== t && (Mr.has(t) || Dr(t, !1, e), Dr(t, !0, e))
                    }));
                    var t = 9 === e.nodeType ? e : e.ownerDocument;
                    null === t || t[Br] || (t[Br] = !0, Dr("selectionchange", !1, t))
                }
            }

            function Wr(e, t, n, r) {
                switch (Jt(t)) {
                    case 1:
                        var a = Vt;
                        break;
                    case 4:
                        a = $t;
                        break;
                    default:
                        a = Ht
                }
                n = a.bind(null, t, n, e), a = void 0, !Te || "touchstart" !== t && "touchmove" !== t && "wheel" !== t || (a = !0), r ? void 0 !== a ? e.addEventListener(t, n, {
                    capture: !0,
                    passive: a
                }) : e.addEventListener(t, n, !0) : void 0 !== a ? e.addEventListener(t, n, {passive: a}) : e.addEventListener(t, n, !1)
            }

            function qr(e, t, n, r, a) {
                var o = r;
                if (!(1 & t || 2 & t || null === r)) e:for (; ;) {
                    if (null === r) return;
                    var i = r.tag;
                    if (3 === i || 4 === i) {
                        var l = r.stateNode.containerInfo;
                        if (l === a || 8 === l.nodeType && l.parentNode === a) break;
                        if (4 === i) for (i = r.return; null !== i;) {
                            var s = i.tag;
                            if ((3 === s || 4 === s) && ((s = i.stateNode.containerInfo) === a || 8 === s.nodeType && s.parentNode === a)) return;
                            i = i.return
                        }
                        for (; null !== l;) {
                            if (null === (i = va(l))) return;
                            if (5 === (s = i.tag) || 6 === s) {
                                r = o = i;
                                continue e
                            }
                            l = l.parentNode
                        }
                    }
                    r = r.return
                }
                Ie((function () {
                    var r = o, a = xe(n), i = [];
                    e:{
                        var l = Ar.get(e);
                        if (void 0 !== l) {
                            var s = cn, u = e;
                            switch (e) {
                                case"keypress":
                                    if (0 === tn(n)) break e;
                                case"keydown":
                                case"keyup":
                                    s = Cn;
                                    break;
                                case"focusin":
                                    u = "focus", s = gn;
                                    break;
                                case"focusout":
                                    u = "blur", s = gn;
                                    break;
                                case"beforeblur":
                                case"afterblur":
                                    s = gn;
                                    break;
                                case"click":
                                    if (2 === n.button) break e;
                                case"auxclick":
                                case"dblclick":
                                case"mousedown":
                                case"mousemove":
                                case"mouseup":
                                case"mouseout":
                                case"mouseover":
                                case"contextmenu":
                                    s = hn;
                                    break;
                                case"drag":
                                case"dragend":
                                case"dragenter":
                                case"dragexit":
                                case"dragleave":
                                case"dragover":
                                case"dragstart":
                                case"drop":
                                    s = mn;
                                    break;
                                case"touchcancel":
                                case"touchend":
                                case"touchmove":
                                case"touchstart":
                                    s = En;
                                    break;
                                case jr:
                                case Cr:
                                case Pr:
                                    s = yn;
                                    break;
                                case Er:
                                    s = An;
                                    break;
                                case"scroll":
                                    s = fn;
                                    break;
                                case"wheel":
                                    s = Ln;
                                    break;
                                case"copy":
                                case"cut":
                                case"paste":
                                    s = bn;
                                    break;
                                case"gotpointercapture":
                                case"lostpointercapture":
                                case"pointercancel":
                                case"pointerdown":
                                case"pointermove":
                                case"pointerout":
                                case"pointerover":
                                case"pointerup":
                                    s = Pn
                            }
                            var c = !!(4 & t), d = !c && "scroll" === e, f = c ? null !== l ? l + "Capture" : null : l;
                            c = [];
                            for (var p, h = r; null !== h;) {
                                var m = (p = h).stateNode;
                                if (5 === p.tag && null !== m && (p = m, null !== f && null != (m = Le(h, f)) && c.push(Vr(h, m, p))), d) break;
                                h = h.return
                            }
                            0 < c.length && (l = new s(l, u, null, n, a), i.push({event: l, listeners: c}))
                        }
                    }
                    if (!(7 & t)) {
                        if (s = "mouseout" === e || "pointerout" === e, (!(l = "mouseover" === e || "pointerover" === e) || n === we || !(u = n.relatedTarget || n.fromElement) || !va(u) && !u[ha]) && (s || l) && (l = a.window === a ? a : (l = a.ownerDocument) ? l.defaultView || l.parentWindow : window, s ? (s = r, null !== (u = (u = n.relatedTarget || n.toElement) ? va(u) : null) && (u !== (d = Qe(u)) || 5 !== u.tag && 6 !== u.tag) && (u = null)) : (s = null, u = r), s !== u)) {
                            if (c = hn, m = "onMouseLeave", f = "onMouseEnter", h = "mouse", "pointerout" !== e && "pointerover" !== e || (c = Pn, m = "onPointerLeave", f = "onPointerEnter", h = "pointer"), d = null == s ? l : wa(s), p = null == u ? l : wa(u), (l = new c(m, h + "leave", s, n, a)).target = d, l.relatedTarget = p, m = null, va(a) === r && ((c = new c(f, h + "enter", u, n, a)).target = p, c.relatedTarget = d, m = c), d = m, s && u) e:{
                                for (f = u, h = 0, p = c = s; p; p = Hr(p)) h++;
                                for (p = 0, m = f; m; m = Hr(m)) p++;
                                for (; 0 < h - p;) c = Hr(c), h--;
                                for (; 0 < p - h;) f = Hr(f), p--;
                                for (; h--;) {
                                    if (c === f || null !== f && c === f.alternate) break e;
                                    c = Hr(c), f = Hr(f)
                                }
                                c = null
                            } else c = null;
                            null !== s && Kr(i, l, s, c, !1), null !== u && null !== d && Kr(i, d, u, c, !0)
                        }
                        if ("select" === (s = (l = r ? wa(r) : window).nodeName && l.nodeName.toLowerCase()) || "input" === s && "file" === l.type) var g = Jn; else if (qn(l)) if (Yn) g = ir; else {
                            g = ar;
                            var y = rr
                        } else (s = l.nodeName) && "input" === s.toLowerCase() && ("checkbox" === l.type || "radio" === l.type) && (g = or);
                        switch (g && (g = g(e, r)) ? Vn(i, g, n, a) : (y && y(e, l, r), "focusout" === e && (y = l._wrapperState) && y.controlled && "number" === l.type && ee(l, "number", l.value)), y = r ? wa(r) : window, e) {
                            case"focusin":
                                (qn(y) || "true" === y.contentEditable) && (gr = y, yr = r, vr = null);
                                break;
                            case"focusout":
                                vr = yr = gr = null;
                                break;
                            case"mousedown":
                                br = !0;
                                break;
                            case"contextmenu":
                            case"mouseup":
                            case"dragend":
                                br = !1, wr(i, n, a);
                                break;
                            case"selectionchange":
                                if (mr) break;
                            case"keydown":
                            case"keyup":
                                wr(i, n, a)
                        }
                        var v;
                        if (On) e:{
                            switch (e) {
                                case"compositionstart":
                                    var b = "onCompositionStart";
                                    break e;
                                case"compositionend":
                                    b = "onCompositionEnd";
                                    break e;
                                case"compositionupdate":
                                    b = "onCompositionUpdate";
                                    break e
                            }
                            b = void 0
                        } else Qn ? Dn(e, n) && (b = "onCompositionEnd") : "keydown" === e && 229 === n.keyCode && (b = "onCompositionStart");
                        b && (zn && "ko" !== n.locale && (Qn || "onCompositionStart" !== b ? "onCompositionEnd" === b && Qn && (v = en()) : (Xt = "value" in (Yt = a) ? Yt.value : Yt.textContent, Qn = !0)), 0 < (y = $r(r, b)).length && (b = new wn(b, e, null, n, a), i.push({
                            event: b,
                            listeners: y
                        }), (v || null !== (v = Bn(n))) && (b.data = v))), (v = Mn ? function (e, t) {
                            switch (e) {
                                case"compositionend":
                                    return Bn(t);
                                case"keypress":
                                    return 32 !== t.which ? null : (Fn = !0, Un);
                                case"textInput":
                                    return (e = t.data) === Un && Fn ? null : e;
                                default:
                                    return null
                            }
                        }(e, n) : function (e, t) {
                            if (Qn) return "compositionend" === e || !On && Dn(e, t) ? (e = en(), Zt = Xt = Yt = null, Qn = !1, e) : null;
                            switch (e) {
                                case"paste":
                                default:
                                    return null;
                                case"keypress":
                                    if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                                        if (t.char && 1 < t.char.length) return t.char;
                                        if (t.which) return String.fromCharCode(t.which)
                                    }
                                    return null;
                                case"compositionend":
                                    return zn && "ko" !== t.locale ? null : t.data
                            }
                        }(e, n)) && 0 < (r = $r(r, "onBeforeInput")).length && (a = new wn("onBeforeInput", "beforeinput", null, n, a), i.push({
                            event: a,
                            listeners: r
                        }), a.data = v)
                    }
                    Ur(i, t)
                }))
            }

            function Vr(e, t, n) {
                return {instance: e, listener: t, currentTarget: n}
            }

            function $r(e, t) {
                for (var n = t + "Capture", r = []; null !== e;) {
                    var a = e, o = a.stateNode;
                    5 === a.tag && null !== o && (a = o, null != (o = Le(e, n)) && r.unshift(Vr(e, o, a)), null != (o = Le(e, t)) && r.push(Vr(e, o, a))), e = e.return
                }
                return r
            }

            function Hr(e) {
                if (null === e) return null;
                do {
                    e = e.return
                } while (e && 5 !== e.tag);
                return e || null
            }

            function Kr(e, t, n, r, a) {
                for (var o = t._reactName, i = []; null !== n && n !== r;) {
                    var l = n, s = l.alternate, u = l.stateNode;
                    if (null !== s && s === r) break;
                    5 === l.tag && null !== u && (l = u, a ? null != (s = Le(n, o)) && i.unshift(Vr(n, s, l)) : a || null != (s = Le(n, o)) && i.push(Vr(n, s, l))), n = n.return
                }
                0 !== i.length && e.push({event: t, listeners: i})
            }

            var Gr = /\r\n?/g, Jr = /\u0000|\uFFFD/g;

            function Yr(e) {
                return ("string" == typeof e ? e : "" + e).replace(Gr, "\n").replace(Jr, "")
            }

            function Xr(e, t, n) {
                if (t = Yr(t), Yr(e) !== t && n) throw Error(o(425))
            }

            function Zr() {
            }

            var ea = null, ta = null;

            function na(e, t) {
                return "textarea" === e || "noscript" === e || "string" == typeof t.children || "number" == typeof t.children || "object" == typeof t.dangerouslySetInnerHTML && null !== t.dangerouslySetInnerHTML && null != t.dangerouslySetInnerHTML.__html
            }

            var ra = "function" == typeof setTimeout ? setTimeout : void 0,
                aa = "function" == typeof clearTimeout ? clearTimeout : void 0,
                oa = "function" == typeof Promise ? Promise : void 0,
                ia = "function" == typeof queueMicrotask ? queueMicrotask : void 0 !== oa ? function (e) {
                    return oa.resolve(null).then(e).catch(la)
                } : ra;

            function la(e) {
                setTimeout((function () {
                    throw e
                }))
            }

            function sa(e, t) {
                var n = t, r = 0;
                do {
                    var a = n.nextSibling;
                    if (e.removeChild(n), a && 8 === a.nodeType) if ("/$" === (n = a.data)) {
                        if (0 === r) return e.removeChild(a), void Qt(t);
                        r--
                    } else "$" !== n && "$?" !== n && "$!" !== n || r++;
                    n = a
                } while (n);
                Qt(t)
            }

            function ua(e) {
                for (; null != e; e = e.nextSibling) {
                    var t = e.nodeType;
                    if (1 === t || 3 === t) break;
                    if (8 === t) {
                        if ("$" === (t = e.data) || "$!" === t || "$?" === t) break;
                        if ("/$" === t) return null
                    }
                }
                return e
            }

            function ca(e) {
                e = e.previousSibling;
                for (var t = 0; e;) {
                    if (8 === e.nodeType) {
                        var n = e.data;
                        if ("$" === n || "$!" === n || "$?" === n) {
                            if (0 === t) return e;
                            t--
                        } else "/$" === n && t++
                    }
                    e = e.previousSibling
                }
                return null
            }

            var da = Math.random().toString(36).slice(2), fa = "__reactFiber$" + da, pa = "__reactProps$" + da,
                ha = "__reactContainer$" + da, ma = "__reactEvents$" + da, ga = "__reactListeners$" + da,
                ya = "__reactHandles$" + da;

            function va(e) {
                var t = e[fa];
                if (t) return t;
                for (var n = e.parentNode; n;) {
                    if (t = n[ha] || n[fa]) {
                        if (n = t.alternate, null !== t.child || null !== n && null !== n.child) for (e = ca(e); null !== e;) {
                            if (n = e[fa]) return n;
                            e = ca(e)
                        }
                        return t
                    }
                    n = (e = n).parentNode
                }
                return null
            }

            function ba(e) {
                return !(e = e[fa] || e[ha]) || 5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag ? null : e
            }

            function wa(e) {
                if (5 === e.tag || 6 === e.tag) return e.stateNode;
                throw Error(o(33))
            }

            function xa(e) {
                return e[pa] || null
            }

            var ka = [], _a = -1;

            function Sa(e) {
                return {current: e}
            }

            function Na(e) {
                0 > _a || (e.current = ka[_a], ka[_a] = null, _a--)
            }

            function ja(e, t) {
                _a++, ka[_a] = e.current, e.current = t
            }

            var Ca = {}, Pa = Sa(Ca), Ea = Sa(!1), Aa = Ca;

            function Ia(e, t) {
                var n = e.type.contextTypes;
                if (!n) return Ca;
                var r = e.stateNode;
                if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
                var a, o = {};
                for (a in n) o[a] = t[a];
                return r && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = o), o
            }

            function La(e) {
                return null != e.childContextTypes
            }

            function Ta() {
                Na(Ea), Na(Pa)
            }

            function Oa(e, t, n) {
                if (Pa.current !== Ca) throw Error(o(168));
                ja(Pa, t), ja(Ea, n)
            }

            function Ra(e, t, n) {
                var r = e.stateNode;
                if (t = t.childContextTypes, "function" != typeof r.getChildContext) return n;
                for (var a in r = r.getChildContext()) if (!(a in t)) throw Error(o(108, W(e) || "Unknown", a));
                return z({}, n, r)
            }

            function Ma(e) {
                return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Ca, Aa = Pa.current, ja(Pa, e), ja(Ea, Ea.current), !0
            }

            function za(e, t, n) {
                var r = e.stateNode;
                if (!r) throw Error(o(169));
                n ? (e = Ra(e, t, Aa), r.__reactInternalMemoizedMergedChildContext = e, Na(Ea), Na(Pa), ja(Pa, e)) : Na(Ea), ja(Ea, n)
            }

            var Ua = null, Fa = !1, Da = !1;

            function Ba(e) {
                null === Ua ? Ua = [e] : Ua.push(e)
            }

            function Qa() {
                if (!Da && null !== Ua) {
                    Da = !0;
                    var e = 0, t = bt;
                    try {
                        var n = Ua;
                        for (bt = 1; e < n.length; e++) {
                            var r = n[e];
                            do {
                                r = r(!0)
                            } while (null !== r)
                        }
                        Ua = null, Fa = !1
                    } catch (t) {
                        throw null !== Ua && (Ua = Ua.slice(e + 1)), He(Ze, Qa), t
                    } finally {
                        bt = t, Da = !1
                    }
                }
                return null
            }

            var Wa = [], qa = 0, Va = null, $a = 0, Ha = [], Ka = 0, Ga = null, Ja = 1, Ya = "";

            function Xa(e, t) {
                Wa[qa++] = $a, Wa[qa++] = Va, Va = e, $a = t
            }

            function Za(e, t, n) {
                Ha[Ka++] = Ja, Ha[Ka++] = Ya, Ha[Ka++] = Ga, Ga = e;
                var r = Ja;
                e = Ya;
                var a = 32 - it(r) - 1;
                r &= ~(1 << a), n += 1;
                var o = 32 - it(t) + a;
                if (30 < o) {
                    var i = a - a % 5;
                    o = (r & (1 << i) - 1).toString(32), r >>= i, a -= i, Ja = 1 << 32 - it(t) + a | n << a | r, Ya = o + e
                } else Ja = 1 << o | n << a | r, Ya = e
            }

            function eo(e) {
                null !== e.return && (Xa(e, 1), Za(e, 1, 0))
            }

            function to(e) {
                for (; e === Va;) Va = Wa[--qa], Wa[qa] = null, $a = Wa[--qa], Wa[qa] = null;
                for (; e === Ga;) Ga = Ha[--Ka], Ha[Ka] = null, Ya = Ha[--Ka], Ha[Ka] = null, Ja = Ha[--Ka], Ha[Ka] = null
            }

            var no = null, ro = null, ao = !1, oo = null;

            function io(e, t) {
                var n = Lu(5, null, null, 0);
                n.elementType = "DELETED", n.stateNode = t, n.return = e, null === (t = e.deletions) ? (e.deletions = [n], e.flags |= 16) : t.push(n)
            }

            function lo(e, t) {
                switch (e.tag) {
                    case 5:
                        var n = e.type;
                        return null !== (t = 1 !== t.nodeType || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t) && (e.stateNode = t, no = e, ro = ua(t.firstChild), !0);
                    case 6:
                        return null !== (t = "" === e.pendingProps || 3 !== t.nodeType ? null : t) && (e.stateNode = t, no = e, ro = null, !0);
                    case 13:
                        return null !== (t = 8 !== t.nodeType ? null : t) && (n = null !== Ga ? {
                            id: Ja,
                            overflow: Ya
                        } : null, e.memoizedState = {
                            dehydrated: t,
                            treeContext: n,
                            retryLane: 1073741824
                        }, (n = Lu(18, null, null, 0)).stateNode = t, n.return = e, e.child = n, no = e, ro = null, !0);
                    default:
                        return !1
                }
            }

            function so(e) {
                return !(!(1 & e.mode) || 128 & e.flags)
            }

            function uo(e) {
                if (ao) {
                    var t = ro;
                    if (t) {
                        var n = t;
                        if (!lo(e, t)) {
                            if (so(e)) throw Error(o(418));
                            t = ua(n.nextSibling);
                            var r = no;
                            t && lo(e, t) ? io(r, n) : (e.flags = -4097 & e.flags | 2, ao = !1, no = e)
                        }
                    } else {
                        if (so(e)) throw Error(o(418));
                        e.flags = -4097 & e.flags | 2, ao = !1, no = e
                    }
                }
            }

            function co(e) {
                for (e = e.return; null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;) e = e.return;
                no = e
            }

            function fo(e) {
                if (e !== no) return !1;
                if (!ao) return co(e), ao = !0, !1;
                var t;
                if ((t = 3 !== e.tag) && !(t = 5 !== e.tag) && (t = "head" !== (t = e.type) && "body" !== t && !na(e.type, e.memoizedProps)), t && (t = ro)) {
                    if (so(e)) throw po(), Error(o(418));
                    for (; t;) io(e, t), t = ua(t.nextSibling)
                }
                if (co(e), 13 === e.tag) {
                    if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null)) throw Error(o(317));
                    e:{
                        for (e = e.nextSibling, t = 0; e;) {
                            if (8 === e.nodeType) {
                                var n = e.data;
                                if ("/$" === n) {
                                    if (0 === t) {
                                        ro = ua(e.nextSibling);
                                        break e
                                    }
                                    t--
                                } else "$" !== n && "$!" !== n && "$?" !== n || t++
                            }
                            e = e.nextSibling
                        }
                        ro = null
                    }
                } else ro = no ? ua(e.stateNode.nextSibling) : null;
                return !0
            }

            function po() {
                for (var e = ro; e;) e = ua(e.nextSibling)
            }

            function ho() {
                ro = no = null, ao = !1
            }

            function mo(e) {
                null === oo ? oo = [e] : oo.push(e)
            }

            var go = w.ReactCurrentBatchConfig;

            function yo(e, t) {
                if (e && e.defaultProps) {
                    for (var n in t = z({}, t), e = e.defaultProps) void 0 === t[n] && (t[n] = e[n]);
                    return t
                }
                return t
            }

            var vo = Sa(null), bo = null, wo = null, xo = null;

            function ko() {
                xo = wo = bo = null
            }

            function _o(e) {
                var t = vo.current;
                Na(vo), e._currentValue = t
            }

            function So(e, t, n) {
                for (; null !== e;) {
                    var r = e.alternate;
                    if ((e.childLanes & t) !== t ? (e.childLanes |= t, null !== r && (r.childLanes |= t)) : null !== r && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
                    e = e.return
                }
            }

            function No(e, t) {
                bo = e, xo = wo = null, null !== (e = e.dependencies) && null !== e.firstContext && (0 !== (e.lanes & t) && (wl = !0), e.firstContext = null)
            }

            function jo(e) {
                var t = e._currentValue;
                if (xo !== e) if (e = {context: e, memoizedValue: t, next: null}, null === wo) {
                    if (null === bo) throw Error(o(308));
                    wo = e, bo.dependencies = {lanes: 0, firstContext: e}
                } else wo = wo.next = e;
                return t
            }

            var Co = null;

            function Po(e) {
                null === Co ? Co = [e] : Co.push(e)
            }

            function Eo(e, t, n, r) {
                var a = t.interleaved;
                return null === a ? (n.next = n, Po(t)) : (n.next = a.next, a.next = n), t.interleaved = n, Ao(e, r)
            }

            function Ao(e, t) {
                e.lanes |= t;
                var n = e.alternate;
                for (null !== n && (n.lanes |= t), n = e, e = e.return; null !== e;) e.childLanes |= t, null !== (n = e.alternate) && (n.childLanes |= t), n = e, e = e.return;
                return 3 === n.tag ? n.stateNode : null
            }

            var Io = !1;

            function Lo(e) {
                e.updateQueue = {
                    baseState: e.memoizedState,
                    firstBaseUpdate: null,
                    lastBaseUpdate: null,
                    shared: {pending: null, interleaved: null, lanes: 0},
                    effects: null
                }
            }

            function To(e, t) {
                e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
                    baseState: e.baseState,
                    firstBaseUpdate: e.firstBaseUpdate,
                    lastBaseUpdate: e.lastBaseUpdate,
                    shared: e.shared,
                    effects: e.effects
                })
            }

            function Oo(e, t) {
                return {eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null}
            }

            function Ro(e, t, n) {
                var r = e.updateQueue;
                if (null === r) return null;
                if (r = r.shared, 2 & Es) {
                    var a = r.pending;
                    return null === a ? t.next = t : (t.next = a.next, a.next = t), r.pending = t, Ao(e, n)
                }
                return null === (a = r.interleaved) ? (t.next = t, Po(r)) : (t.next = a.next, a.next = t), r.interleaved = t, Ao(e, n)
            }

            function Mo(e, t, n) {
                if (null !== (t = t.updateQueue) && (t = t.shared, 4194240 & n)) {
                    var r = t.lanes;
                    n |= r &= e.pendingLanes, t.lanes = n, vt(e, n)
                }
            }

            function zo(e, t) {
                var n = e.updateQueue, r = e.alternate;
                if (null !== r && n === (r = r.updateQueue)) {
                    var a = null, o = null;
                    if (null !== (n = n.firstBaseUpdate)) {
                        do {
                            var i = {
                                eventTime: n.eventTime,
                                lane: n.lane,
                                tag: n.tag,
                                payload: n.payload,
                                callback: n.callback,
                                next: null
                            };
                            null === o ? a = o = i : o = o.next = i, n = n.next
                        } while (null !== n);
                        null === o ? a = o = t : o = o.next = t
                    } else a = o = t;
                    return n = {
                        baseState: r.baseState,
                        firstBaseUpdate: a,
                        lastBaseUpdate: o,
                        shared: r.shared,
                        effects: r.effects
                    }, void (e.updateQueue = n)
                }
                null === (e = n.lastBaseUpdate) ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t
            }

            function Uo(e, t, n, r) {
                var a = e.updateQueue;
                Io = !1;
                var o = a.firstBaseUpdate, i = a.lastBaseUpdate, l = a.shared.pending;
                if (null !== l) {
                    a.shared.pending = null;
                    var s = l, u = s.next;
                    s.next = null, null === i ? o = u : i.next = u, i = s;
                    var c = e.alternate;
                    null !== c && (l = (c = c.updateQueue).lastBaseUpdate) !== i && (null === l ? c.firstBaseUpdate = u : l.next = u, c.lastBaseUpdate = s)
                }
                if (null !== o) {
                    var d = a.baseState;
                    for (i = 0, c = u = s = null, l = o; ;) {
                        var f = l.lane, p = l.eventTime;
                        if ((r & f) === f) {
                            null !== c && (c = c.next = {
                                eventTime: p,
                                lane: 0,
                                tag: l.tag,
                                payload: l.payload,
                                callback: l.callback,
                                next: null
                            });
                            e:{
                                var h = e, m = l;
                                switch (f = t, p = n, m.tag) {
                                    case 1:
                                        if ("function" == typeof (h = m.payload)) {
                                            d = h.call(p, d, f);
                                            break e
                                        }
                                        d = h;
                                        break e;
                                    case 3:
                                        h.flags = -65537 & h.flags | 128;
                                    case 0:
                                        if (null == (f = "function" == typeof (h = m.payload) ? h.call(p, d, f) : h)) break e;
                                        d = z({}, d, f);
                                        break e;
                                    case 2:
                                        Io = !0
                                }
                            }
                            null !== l.callback && 0 !== l.lane && (e.flags |= 64, null === (f = a.effects) ? a.effects = [l] : f.push(l))
                        } else p = {
                            eventTime: p,
                            lane: f,
                            tag: l.tag,
                            payload: l.payload,
                            callback: l.callback,
                            next: null
                        }, null === c ? (u = c = p, s = d) : c = c.next = p, i |= f;
                        if (null === (l = l.next)) {
                            if (null === (l = a.shared.pending)) break;
                            l = (f = l).next, f.next = null, a.lastBaseUpdate = f, a.shared.pending = null
                        }
                    }
                    if (null === c && (s = d), a.baseState = s, a.firstBaseUpdate = u, a.lastBaseUpdate = c, null !== (t = a.shared.interleaved)) {
                        a = t;
                        do {
                            i |= a.lane, a = a.next
                        } while (a !== t)
                    } else null === o && (a.shared.lanes = 0);
                    zs |= i, e.lanes = i, e.memoizedState = d
                }
            }

            function Fo(e, t, n) {
                if (e = t.effects, t.effects = null, null !== e) for (t = 0; t < e.length; t++) {
                    var r = e[t], a = r.callback;
                    if (null !== a) {
                        if (r.callback = null, r = n, "function" != typeof a) throw Error(o(191, a));
                        a.call(r)
                    }
                }
            }

            var Do = (new r.Component).refs;

            function Bo(e, t, n, r) {
                n = null == (n = n(r, t = e.memoizedState)) ? t : z({}, t, n), e.memoizedState = n, 0 === e.lanes && (e.updateQueue.baseState = n)
            }

            var Qo = {
                isMounted: function (e) {
                    return !!(e = e._reactInternals) && Qe(e) === e
                }, enqueueSetState: function (e, t, n) {
                    e = e._reactInternals;
                    var r = tu(), a = nu(e), o = Oo(r, a);
                    o.payload = t, null != n && (o.callback = n), null !== (t = Ro(e, o, a)) && (ru(t, e, a, r), Mo(t, e, a))
                }, enqueueReplaceState: function (e, t, n) {
                    e = e._reactInternals;
                    var r = tu(), a = nu(e), o = Oo(r, a);
                    o.tag = 1, o.payload = t, null != n && (o.callback = n), null !== (t = Ro(e, o, a)) && (ru(t, e, a, r), Mo(t, e, a))
                }, enqueueForceUpdate: function (e, t) {
                    e = e._reactInternals;
                    var n = tu(), r = nu(e), a = Oo(n, r);
                    a.tag = 2, null != t && (a.callback = t), null !== (t = Ro(e, a, r)) && (ru(t, e, r, n), Mo(t, e, r))
                }
            };

            function Wo(e, t, n, r, a, o, i) {
                return "function" == typeof (e = e.stateNode).shouldComponentUpdate ? e.shouldComponentUpdate(r, o, i) : !(t.prototype && t.prototype.isPureReactComponent && sr(n, r) && sr(a, o))
            }

            function qo(e, t, n) {
                var r = !1, a = Ca, o = t.contextType;
                return "object" == typeof o && null !== o ? o = jo(o) : (a = La(t) ? Aa : Pa.current, o = (r = null != (r = t.contextTypes)) ? Ia(e, a) : Ca), t = new t(n, o), e.memoizedState = null !== t.state && void 0 !== t.state ? t.state : null, t.updater = Qo, e.stateNode = t, t._reactInternals = e, r && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = a, e.__reactInternalMemoizedMaskedChildContext = o), t
            }

            function Vo(e, t, n, r) {
                e = t.state, "function" == typeof t.componentWillReceiveProps && t.componentWillReceiveProps(n, r), "function" == typeof t.UNSAFE_componentWillReceiveProps && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Qo.enqueueReplaceState(t, t.state, null)
            }

            function $o(e, t, n, r) {
                var a = e.stateNode;
                a.props = n, a.state = e.memoizedState, a.refs = Do, Lo(e);
                var o = t.contextType;
                "object" == typeof o && null !== o ? a.context = jo(o) : (o = La(t) ? Aa : Pa.current, a.context = Ia(e, o)), a.state = e.memoizedState, "function" == typeof (o = t.getDerivedStateFromProps) && (Bo(e, t, o, n), a.state = e.memoizedState), "function" == typeof t.getDerivedStateFromProps || "function" == typeof a.getSnapshotBeforeUpdate || "function" != typeof a.UNSAFE_componentWillMount && "function" != typeof a.componentWillMount || (t = a.state, "function" == typeof a.componentWillMount && a.componentWillMount(), "function" == typeof a.UNSAFE_componentWillMount && a.UNSAFE_componentWillMount(), t !== a.state && Qo.enqueueReplaceState(a, a.state, null), Uo(e, n, a, r), a.state = e.memoizedState), "function" == typeof a.componentDidMount && (e.flags |= 4194308)
            }

            function Ho(e, t, n) {
                if (null !== (e = n.ref) && "function" != typeof e && "object" != typeof e) {
                    if (n._owner) {
                        if (n = n._owner) {
                            if (1 !== n.tag) throw Error(o(309));
                            var r = n.stateNode
                        }
                        if (!r) throw Error(o(147, e));
                        var a = r, i = "" + e;
                        return null !== t && null !== t.ref && "function" == typeof t.ref && t.ref._stringRef === i ? t.ref : (t = function (e) {
                            var t = a.refs;
                            t === Do && (t = a.refs = {}), null === e ? delete t[i] : t[i] = e
                        }, t._stringRef = i, t)
                    }
                    if ("string" != typeof e) throw Error(o(284));
                    if (!n._owner) throw Error(o(290, e))
                }
                return e
            }

            function Ko(e, t) {
                throw e = Object.prototype.toString.call(t), Error(o(31, "[object Object]" === e ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
            }

            function Go(e) {
                return (0, e._init)(e._payload)
            }

            function Jo(e) {
                function t(t, n) {
                    if (e) {
                        var r = t.deletions;
                        null === r ? (t.deletions = [n], t.flags |= 16) : r.push(n)
                    }
                }

                function n(n, r) {
                    if (!e) return null;
                    for (; null !== r;) t(n, r), r = r.sibling;
                    return null
                }

                function r(e, t) {
                    for (e = new Map; null !== t;) null !== t.key ? e.set(t.key, t) : e.set(t.index, t), t = t.sibling;
                    return e
                }

                function a(e, t) {
                    return (e = Ou(e, t)).index = 0, e.sibling = null, e
                }

                function i(t, n, r) {
                    return t.index = r, e ? null !== (r = t.alternate) ? (r = r.index) < n ? (t.flags |= 2, n) : r : (t.flags |= 2, n) : (t.flags |= 1048576, n)
                }

                function l(t) {
                    return e && null === t.alternate && (t.flags |= 2), t
                }

                function s(e, t, n, r) {
                    return null === t || 6 !== t.tag ? ((t = Uu(n, e.mode, r)).return = e, t) : ((t = a(t, n)).return = e, t)
                }

                function u(e, t, n, r) {
                    var o = n.type;
                    return o === _ ? d(e, t, n.props.children, r, n.key) : null !== t && (t.elementType === o || "object" == typeof o && null !== o && o.$$typeof === L && Go(o) === t.type) ? ((r = a(t, n.props)).ref = Ho(e, t, n), r.return = e, r) : ((r = Ru(n.type, n.key, n.props, null, e.mode, r)).ref = Ho(e, t, n), r.return = e, r)
                }

                function c(e, t, n, r) {
                    return null === t || 4 !== t.tag || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? ((t = Fu(n, e.mode, r)).return = e, t) : ((t = a(t, n.children || [])).return = e, t)
                }

                function d(e, t, n, r, o) {
                    return null === t || 7 !== t.tag ? ((t = Mu(n, e.mode, r, o)).return = e, t) : ((t = a(t, n)).return = e, t)
                }

                function f(e, t, n) {
                    if ("string" == typeof t && "" !== t || "number" == typeof t) return (t = Uu("" + t, e.mode, n)).return = e, t;
                    if ("object" == typeof t && null !== t) {
                        switch (t.$$typeof) {
                            case x:
                                return (n = Ru(t.type, t.key, t.props, null, e.mode, n)).ref = Ho(e, null, t), n.return = e, n;
                            case k:
                                return (t = Fu(t, e.mode, n)).return = e, t;
                            case L:
                                return f(e, (0, t._init)(t._payload), n)
                        }
                        if (te(t) || R(t)) return (t = Mu(t, e.mode, n, null)).return = e, t;
                        Ko(e, t)
                    }
                    return null
                }

                function p(e, t, n, r) {
                    var a = null !== t ? t.key : null;
                    if ("string" == typeof n && "" !== n || "number" == typeof n) return null !== a ? null : s(e, t, "" + n, r);
                    if ("object" == typeof n && null !== n) {
                        switch (n.$$typeof) {
                            case x:
                                return n.key === a ? u(e, t, n, r) : null;
                            case k:
                                return n.key === a ? c(e, t, n, r) : null;
                            case L:
                                return p(e, t, (a = n._init)(n._payload), r)
                        }
                        if (te(n) || R(n)) return null !== a ? null : d(e, t, n, r, null);
                        Ko(e, n)
                    }
                    return null
                }

                function h(e, t, n, r, a) {
                    if ("string" == typeof r && "" !== r || "number" == typeof r) return s(t, e = e.get(n) || null, "" + r, a);
                    if ("object" == typeof r && null !== r) {
                        switch (r.$$typeof) {
                            case x:
                                return u(t, e = e.get(null === r.key ? n : r.key) || null, r, a);
                            case k:
                                return c(t, e = e.get(null === r.key ? n : r.key) || null, r, a);
                            case L:
                                return h(e, t, n, (0, r._init)(r._payload), a)
                        }
                        if (te(r) || R(r)) return d(t, e = e.get(n) || null, r, a, null);
                        Ko(t, r)
                    }
                    return null
                }

                function m(a, o, l, s) {
                    for (var u = null, c = null, d = o, m = o = 0, g = null; null !== d && m < l.length; m++) {
                        d.index > m ? (g = d, d = null) : g = d.sibling;
                        var y = p(a, d, l[m], s);
                        if (null === y) {
                            null === d && (d = g);
                            break
                        }
                        e && d && null === y.alternate && t(a, d), o = i(y, o, m), null === c ? u = y : c.sibling = y, c = y, d = g
                    }
                    if (m === l.length) return n(a, d), ao && Xa(a, m), u;
                    if (null === d) {
                        for (; m < l.length; m++) null !== (d = f(a, l[m], s)) && (o = i(d, o, m), null === c ? u = d : c.sibling = d, c = d);
                        return ao && Xa(a, m), u
                    }
                    for (d = r(a, d); m < l.length; m++) null !== (g = h(d, a, m, l[m], s)) && (e && null !== g.alternate && d.delete(null === g.key ? m : g.key), o = i(g, o, m), null === c ? u = g : c.sibling = g, c = g);
                    return e && d.forEach((function (e) {
                        return t(a, e)
                    })), ao && Xa(a, m), u
                }

                function g(a, l, s, u) {
                    var c = R(s);
                    if ("function" != typeof c) throw Error(o(150));
                    if (null == (s = c.call(s))) throw Error(o(151));
                    for (var d = c = null, m = l, g = l = 0, y = null, v = s.next(); null !== m && !v.done; g++, v = s.next()) {
                        m.index > g ? (y = m, m = null) : y = m.sibling;
                        var b = p(a, m, v.value, u);
                        if (null === b) {
                            null === m && (m = y);
                            break
                        }
                        e && m && null === b.alternate && t(a, m), l = i(b, l, g), null === d ? c = b : d.sibling = b, d = b, m = y
                    }
                    if (v.done) return n(a, m), ao && Xa(a, g), c;
                    if (null === m) {
                        for (; !v.done; g++, v = s.next()) null !== (v = f(a, v.value, u)) && (l = i(v, l, g), null === d ? c = v : d.sibling = v, d = v);
                        return ao && Xa(a, g), c
                    }
                    for (m = r(a, m); !v.done; g++, v = s.next()) null !== (v = h(m, a, g, v.value, u)) && (e && null !== v.alternate && m.delete(null === v.key ? g : v.key), l = i(v, l, g), null === d ? c = v : d.sibling = v, d = v);
                    return e && m.forEach((function (e) {
                        return t(a, e)
                    })), ao && Xa(a, g), c
                }

                return function e(r, o, i, s) {
                    if ("object" == typeof i && null !== i && i.type === _ && null === i.key && (i = i.props.children), "object" == typeof i && null !== i) {
                        switch (i.$$typeof) {
                            case x:
                                e:{
                                    for (var u = i.key, c = o; null !== c;) {
                                        if (c.key === u) {
                                            if ((u = i.type) === _) {
                                                if (7 === c.tag) {
                                                    n(r, c.sibling), (o = a(c, i.props.children)).return = r, r = o;
                                                    break e
                                                }
                                            } else if (c.elementType === u || "object" == typeof u && null !== u && u.$$typeof === L && Go(u) === c.type) {
                                                n(r, c.sibling), (o = a(c, i.props)).ref = Ho(r, c, i), o.return = r, r = o;
                                                break e
                                            }
                                            n(r, c);
                                            break
                                        }
                                        t(r, c), c = c.sibling
                                    }
                                    i.type === _ ? ((o = Mu(i.props.children, r.mode, s, i.key)).return = r, r = o) : ((s = Ru(i.type, i.key, i.props, null, r.mode, s)).ref = Ho(r, o, i), s.return = r, r = s)
                                }
                                return l(r);
                            case k:
                                e:{
                                    for (c = i.key; null !== o;) {
                                        if (o.key === c) {
                                            if (4 === o.tag && o.stateNode.containerInfo === i.containerInfo && o.stateNode.implementation === i.implementation) {
                                                n(r, o.sibling), (o = a(o, i.children || [])).return = r, r = o;
                                                break e
                                            }
                                            n(r, o);
                                            break
                                        }
                                        t(r, o), o = o.sibling
                                    }
                                    (o = Fu(i, r.mode, s)).return = r, r = o
                                }
                                return l(r);
                            case L:
                                return e(r, o, (c = i._init)(i._payload), s)
                        }
                        if (te(i)) return m(r, o, i, s);
                        if (R(i)) return g(r, o, i, s);
                        Ko(r, i)
                    }
                    return "string" == typeof i && "" !== i || "number" == typeof i ? (i = "" + i, null !== o && 6 === o.tag ? (n(r, o.sibling), (o = a(o, i)).return = r, r = o) : (n(r, o), (o = Uu(i, r.mode, s)).return = r, r = o), l(r)) : n(r, o)
                }
            }

            var Yo = Jo(!0), Xo = Jo(!1), Zo = {}, ei = Sa(Zo), ti = Sa(Zo), ni = Sa(Zo);

            function ri(e) {
                if (e === Zo) throw Error(o(174));
                return e
            }

            function ai(e, t) {
                switch (ja(ni, t), ja(ti, e), ja(ei, Zo), e = t.nodeType) {
                    case 9:
                    case 11:
                        t = (t = t.documentElement) ? t.namespaceURI : se(null, "");
                        break;
                    default:
                        t = se(t = (e = 8 === e ? t.parentNode : t).namespaceURI || null, e = e.tagName)
                }
                Na(ei), ja(ei, t)
            }

            function oi() {
                Na(ei), Na(ti), Na(ni)
            }

            function ii(e) {
                ri(ni.current);
                var t = ri(ei.current), n = se(t, e.type);
                t !== n && (ja(ti, e), ja(ei, n))
            }

            function li(e) {
                ti.current === e && (Na(ei), Na(ti))
            }

            var si = Sa(0);

            function ui(e) {
                for (var t = e; null !== t;) {
                    if (13 === t.tag) {
                        var n = t.memoizedState;
                        if (null !== n && (null === (n = n.dehydrated) || "$?" === n.data || "$!" === n.data)) return t
                    } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
                        if (128 & t.flags) return t
                    } else if (null !== t.child) {
                        t.child.return = t, t = t.child;
                        continue
                    }
                    if (t === e) break;
                    for (; null === t.sibling;) {
                        if (null === t.return || t.return === e) return null;
                        t = t.return
                    }
                    t.sibling.return = t.return, t = t.sibling
                }
                return null
            }

            var ci = [];

            function di() {
                for (var e = 0; e < ci.length; e++) ci[e]._workInProgressVersionPrimary = null;
                ci.length = 0
            }

            var fi = w.ReactCurrentDispatcher, pi = w.ReactCurrentBatchConfig, hi = 0, mi = null, gi = null, yi = null,
                vi = !1, bi = !1, wi = 0, xi = 0;

            function ki() {
                throw Error(o(321))
            }

            function _i(e, t) {
                if (null === t) return !1;
                for (var n = 0; n < t.length && n < e.length; n++) if (!lr(e[n], t[n])) return !1;
                return !0
            }

            function Si(e, t, n, r, a, i) {
                if (hi = i, mi = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, fi.current = null === e || null === e.memoizedState ? ll : sl, e = n(r, a), bi) {
                    i = 0;
                    do {
                        if (bi = !1, wi = 0, 25 <= i) throw Error(o(301));
                        i += 1, yi = gi = null, t.updateQueue = null, fi.current = ul, e = n(r, a)
                    } while (bi)
                }
                if (fi.current = il, t = null !== gi && null !== gi.next, hi = 0, yi = gi = mi = null, vi = !1, t) throw Error(o(300));
                return e
            }

            function Ni() {
                var e = 0 !== wi;
                return wi = 0, e
            }

            function ji() {
                var e = {memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null};
                return null === yi ? mi.memoizedState = yi = e : yi = yi.next = e, yi
            }

            function Ci() {
                if (null === gi) {
                    var e = mi.alternate;
                    e = null !== e ? e.memoizedState : null
                } else e = gi.next;
                var t = null === yi ? mi.memoizedState : yi.next;
                if (null !== t) yi = t, gi = e; else {
                    if (null === e) throw Error(o(310));
                    e = {
                        memoizedState: (gi = e).memoizedState,
                        baseState: gi.baseState,
                        baseQueue: gi.baseQueue,
                        queue: gi.queue,
                        next: null
                    }, null === yi ? mi.memoizedState = yi = e : yi = yi.next = e
                }
                return yi
            }

            function Pi(e, t) {
                return "function" == typeof t ? t(e) : t
            }

            function Ei(e) {
                var t = Ci(), n = t.queue;
                if (null === n) throw Error(o(311));
                n.lastRenderedReducer = e;
                var r = gi, a = r.baseQueue, i = n.pending;
                if (null !== i) {
                    if (null !== a) {
                        var l = a.next;
                        a.next = i.next, i.next = l
                    }
                    r.baseQueue = a = i, n.pending = null
                }
                if (null !== a) {
                    i = a.next, r = r.baseState;
                    var s = l = null, u = null, c = i;
                    do {
                        var d = c.lane;
                        if ((hi & d) === d) null !== u && (u = u.next = {
                            lane: 0,
                            action: c.action,
                            hasEagerState: c.hasEagerState,
                            eagerState: c.eagerState,
                            next: null
                        }), r = c.hasEagerState ? c.eagerState : e(r, c.action); else {
                            var f = {
                                lane: d,
                                action: c.action,
                                hasEagerState: c.hasEagerState,
                                eagerState: c.eagerState,
                                next: null
                            };
                            null === u ? (s = u = f, l = r) : u = u.next = f, mi.lanes |= d, zs |= d
                        }
                        c = c.next
                    } while (null !== c && c !== i);
                    null === u ? l = r : u.next = s, lr(r, t.memoizedState) || (wl = !0), t.memoizedState = r, t.baseState = l, t.baseQueue = u, n.lastRenderedState = r
                }
                if (null !== (e = n.interleaved)) {
                    a = e;
                    do {
                        i = a.lane, mi.lanes |= i, zs |= i, a = a.next
                    } while (a !== e)
                } else null === a && (n.lanes = 0);
                return [t.memoizedState, n.dispatch]
            }

            function Ai(e) {
                var t = Ci(), n = t.queue;
                if (null === n) throw Error(o(311));
                n.lastRenderedReducer = e;
                var r = n.dispatch, a = n.pending, i = t.memoizedState;
                if (null !== a) {
                    n.pending = null;
                    var l = a = a.next;
                    do {
                        i = e(i, l.action), l = l.next
                    } while (l !== a);
                    lr(i, t.memoizedState) || (wl = !0), t.memoizedState = i, null === t.baseQueue && (t.baseState = i), n.lastRenderedState = i
                }
                return [i, r]
            }

            function Ii() {
            }

            function Li(e, t) {
                var n = mi, r = Ci(), a = t(), i = !lr(r.memoizedState, a);
                if (i && (r.memoizedState = a, wl = !0), r = r.queue, qi(Ri.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || null !== yi && 1 & yi.memoizedState.tag) {
                    if (n.flags |= 2048, Fi(9, Oi.bind(null, n, r, a, t), void 0, null), null === As) throw Error(o(349));
                    30 & hi || Ti(n, t, a)
                }
                return a
            }

            function Ti(e, t, n) {
                e.flags |= 16384, e = {
                    getSnapshot: t,
                    value: n
                }, null === (t = mi.updateQueue) ? (t = {
                    lastEffect: null,
                    stores: null
                }, mi.updateQueue = t, t.stores = [e]) : null === (n = t.stores) ? t.stores = [e] : n.push(e)
            }

            function Oi(e, t, n, r) {
                t.value = n, t.getSnapshot = r, Mi(t) && zi(e)
            }

            function Ri(e, t, n) {
                return n((function () {
                    Mi(t) && zi(e)
                }))
            }

            function Mi(e) {
                var t = e.getSnapshot;
                e = e.value;
                try {
                    var n = t();
                    return !lr(e, n)
                } catch (e) {
                    return !0
                }
            }

            function zi(e) {
                var t = Ao(e, 1);
                null !== t && ru(t, e, 1, -1)
            }

            function Ui(e) {
                var t = ji();
                return "function" == typeof e && (e = e()), t.memoizedState = t.baseState = e, e = {
                    pending: null,
                    interleaved: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: Pi,
                    lastRenderedState: e
                }, t.queue = e, e = e.dispatch = nl.bind(null, mi, e), [t.memoizedState, e]
            }

            function Fi(e, t, n, r) {
                return e = {
                    tag: e,
                    create: t,
                    destroy: n,
                    deps: r,
                    next: null
                }, null === (t = mi.updateQueue) ? (t = {
                    lastEffect: null,
                    stores: null
                }, mi.updateQueue = t, t.lastEffect = e.next = e) : null === (n = t.lastEffect) ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e
            }

            function Di() {
                return Ci().memoizedState
            }

            function Bi(e, t, n, r) {
                var a = ji();
                mi.flags |= e, a.memoizedState = Fi(1 | t, n, void 0, void 0 === r ? null : r)
            }

            function Qi(e, t, n, r) {
                var a = Ci();
                r = void 0 === r ? null : r;
                var o = void 0;
                if (null !== gi) {
                    var i = gi.memoizedState;
                    if (o = i.destroy, null !== r && _i(r, i.deps)) return void (a.memoizedState = Fi(t, n, o, r))
                }
                mi.flags |= e, a.memoizedState = Fi(1 | t, n, o, r)
            }

            function Wi(e, t) {
                return Bi(8390656, 8, e, t)
            }

            function qi(e, t) {
                return Qi(2048, 8, e, t)
            }

            function Vi(e, t) {
                return Qi(4, 2, e, t)
            }

            function $i(e, t) {
                return Qi(4, 4, e, t)
            }

            function Hi(e, t) {
                return "function" == typeof t ? (e = e(), t(e), function () {
                    t(null)
                }) : null != t ? (e = e(), t.current = e, function () {
                    t.current = null
                }) : void 0
            }

            function Ki(e, t, n) {
                return n = null != n ? n.concat([e]) : null, Qi(4, 4, Hi.bind(null, t, e), n)
            }

            function Gi() {
            }

            function Ji(e, t) {
                var n = Ci();
                t = void 0 === t ? null : t;
                var r = n.memoizedState;
                return null !== r && null !== t && _i(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e)
            }

            function Yi(e, t) {
                var n = Ci();
                t = void 0 === t ? null : t;
                var r = n.memoizedState;
                return null !== r && null !== t && _i(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e)
            }

            function Xi(e, t, n) {
                return 21 & hi ? (lr(n, t) || (n = mt(), mi.lanes |= n, zs |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, wl = !0), e.memoizedState = n)
            }

            function Zi(e, t) {
                var n = bt;
                bt = 0 !== n && 4 > n ? n : 4, e(!0);
                var r = pi.transition;
                pi.transition = {};
                try {
                    e(!1), t()
                } finally {
                    bt = n, pi.transition = r
                }
            }

            function el() {
                return Ci().memoizedState
            }

            function tl(e, t, n) {
                var r = nu(e);
                n = {
                    lane: r,
                    action: n,
                    hasEagerState: !1,
                    eagerState: null,
                    next: null
                }, rl(e) ? al(t, n) : null !== (n = Eo(e, t, n, r)) && (ru(n, e, r, tu()), ol(n, t, r))
            }

            function nl(e, t, n) {
                var r = nu(e), a = {lane: r, action: n, hasEagerState: !1, eagerState: null, next: null};
                if (rl(e)) al(t, a); else {
                    var o = e.alternate;
                    if (0 === e.lanes && (null === o || 0 === o.lanes) && null !== (o = t.lastRenderedReducer)) try {
                        var i = t.lastRenderedState, l = o(i, n);
                        if (a.hasEagerState = !0, a.eagerState = l, lr(l, i)) {
                            var s = t.interleaved;
                            return null === s ? (a.next = a, Po(t)) : (a.next = s.next, s.next = a), void (t.interleaved = a)
                        }
                    } catch (e) {
                    }
                    null !== (n = Eo(e, t, a, r)) && (ru(n, e, r, a = tu()), ol(n, t, r))
                }
            }

            function rl(e) {
                var t = e.alternate;
                return e === mi || null !== t && t === mi
            }

            function al(e, t) {
                bi = vi = !0;
                var n = e.pending;
                null === n ? t.next = t : (t.next = n.next, n.next = t), e.pending = t
            }

            function ol(e, t, n) {
                if (4194240 & n) {
                    var r = t.lanes;
                    n |= r &= e.pendingLanes, t.lanes = n, vt(e, n)
                }
            }

            var il = {
                readContext: jo,
                useCallback: ki,
                useContext: ki,
                useEffect: ki,
                useImperativeHandle: ki,
                useInsertionEffect: ki,
                useLayoutEffect: ki,
                useMemo: ki,
                useReducer: ki,
                useRef: ki,
                useState: ki,
                useDebugValue: ki,
                useDeferredValue: ki,
                useTransition: ki,
                useMutableSource: ki,
                useSyncExternalStore: ki,
                useId: ki,
                unstable_isNewReconciler: !1
            }, ll = {
                readContext: jo, useCallback: function (e, t) {
                    return ji().memoizedState = [e, void 0 === t ? null : t], e
                }, useContext: jo, useEffect: Wi, useImperativeHandle: function (e, t, n) {
                    return n = null != n ? n.concat([e]) : null, Bi(4194308, 4, Hi.bind(null, t, e), n)
                }, useLayoutEffect: function (e, t) {
                    return Bi(4194308, 4, e, t)
                }, useInsertionEffect: function (e, t) {
                    return Bi(4, 2, e, t)
                }, useMemo: function (e, t) {
                    var n = ji();
                    return t = void 0 === t ? null : t, e = e(), n.memoizedState = [e, t], e
                }, useReducer: function (e, t, n) {
                    var r = ji();
                    return t = void 0 !== n ? n(t) : t, r.memoizedState = r.baseState = t, e = {
                        pending: null,
                        interleaved: null,
                        lanes: 0,
                        dispatch: null,
                        lastRenderedReducer: e,
                        lastRenderedState: t
                    }, r.queue = e, e = e.dispatch = tl.bind(null, mi, e), [r.memoizedState, e]
                }, useRef: function (e) {
                    return e = {current: e}, ji().memoizedState = e
                }, useState: Ui, useDebugValue: Gi, useDeferredValue: function (e) {
                    return ji().memoizedState = e
                }, useTransition: function () {
                    var e = Ui(!1), t = e[0];
                    return e = Zi.bind(null, e[1]), ji().memoizedState = e, [t, e]
                }, useMutableSource: function () {
                }, useSyncExternalStore: function (e, t, n) {
                    var r = mi, a = ji();
                    if (ao) {
                        if (void 0 === n) throw Error(o(407));
                        n = n()
                    } else {
                        if (n = t(), null === As) throw Error(o(349));
                        30 & hi || Ti(r, t, n)
                    }
                    a.memoizedState = n;
                    var i = {value: n, getSnapshot: t};
                    return a.queue = i, Wi(Ri.bind(null, r, i, e), [e]), r.flags |= 2048, Fi(9, Oi.bind(null, r, i, n, t), void 0, null), n
                }, useId: function () {
                    var e = ji(), t = As.identifierPrefix;
                    if (ao) {
                        var n = Ya;
                        t = ":" + t + "R" + (n = (Ja & ~(1 << 32 - it(Ja) - 1)).toString(32) + n), 0 < (n = wi++) && (t += "H" + n.toString(32)), t += ":"
                    } else t = ":" + t + "r" + (n = xi++).toString(32) + ":";
                    return e.memoizedState = t
                }, unstable_isNewReconciler: !1
            }, sl = {
                readContext: jo,
                useCallback: Ji,
                useContext: jo,
                useEffect: qi,
                useImperativeHandle: Ki,
                useInsertionEffect: Vi,
                useLayoutEffect: $i,
                useMemo: Yi,
                useReducer: Ei,
                useRef: Di,
                useState: function () {
                    return Ei(Pi)
                },
                useDebugValue: Gi,
                useDeferredValue: function (e) {
                    return Xi(Ci(), gi.memoizedState, e)
                },
                useTransition: function () {
                    return [Ei(Pi)[0], Ci().memoizedState]
                },
                useMutableSource: Ii,
                useSyncExternalStore: Li,
                useId: el,
                unstable_isNewReconciler: !1
            }, ul = {
                readContext: jo,
                useCallback: Ji,
                useContext: jo,
                useEffect: qi,
                useImperativeHandle: Ki,
                useInsertionEffect: Vi,
                useLayoutEffect: $i,
                useMemo: Yi,
                useReducer: Ai,
                useRef: Di,
                useState: function () {
                    return Ai(Pi)
                },
                useDebugValue: Gi,
                useDeferredValue: function (e) {
                    var t = Ci();
                    return null === gi ? t.memoizedState = e : Xi(t, gi.memoizedState, e)
                },
                useTransition: function () {
                    return [Ai(Pi)[0], Ci().memoizedState]
                },
                useMutableSource: Ii,
                useSyncExternalStore: Li,
                useId: el,
                unstable_isNewReconciler: !1
            };

            function cl(e, t) {
                try {
                    var n = "", r = t;
                    do {
                        n += B(r), r = r.return
                    } while (r);
                    var a = n
                } catch (e) {
                    a = "\nError generating stack: " + e.message + "\n" + e.stack
                }
                return {value: e, source: t, stack: a, digest: null}
            }

            function dl(e, t, n) {
                return {value: e, source: null, stack: null != n ? n : null, digest: null != t ? t : null}
            }

            function fl(e, t) {
                try {
                    console.error(t.value)
                } catch (e) {
                    setTimeout((function () {
                        throw e
                    }))
                }
            }

            var pl = "function" == typeof WeakMap ? WeakMap : Map;

            function hl(e, t, n) {
                (n = Oo(-1, n)).tag = 3, n.payload = {element: null};
                var r = t.value;
                return n.callback = function () {
                    Vs || (Vs = !0, $s = r), fl(0, t)
                }, n
            }

            function ml(e, t, n) {
                (n = Oo(-1, n)).tag = 3;
                var r = e.type.getDerivedStateFromError;
                if ("function" == typeof r) {
                    var a = t.value;
                    n.payload = function () {
                        return r(a)
                    }, n.callback = function () {
                        fl(0, t)
                    }
                }
                var o = e.stateNode;
                return null !== o && "function" == typeof o.componentDidCatch && (n.callback = function () {
                    fl(0, t), "function" != typeof r && (null === Hs ? Hs = new Set([this]) : Hs.add(this));
                    var e = t.stack;
                    this.componentDidCatch(t.value, {componentStack: null !== e ? e : ""})
                }), n
            }

            function gl(e, t, n) {
                var r = e.pingCache;
                if (null === r) {
                    r = e.pingCache = new pl;
                    var a = new Set;
                    r.set(t, a)
                } else void 0 === (a = r.get(t)) && (a = new Set, r.set(t, a));
                a.has(n) || (a.add(n), e = ju.bind(null, e, t, n), t.then(e, e))
            }

            function yl(e) {
                do {
                    var t;
                    if ((t = 13 === e.tag) && (t = null === (t = e.memoizedState) || null !== t.dehydrated), t) return e;
                    e = e.return
                } while (null !== e);
                return null
            }

            function vl(e, t, n, r, a) {
                return 1 & e.mode ? (e.flags |= 65536, e.lanes = a, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, 1 === n.tag && (null === n.alternate ? n.tag = 17 : ((t = Oo(-1, 1)).tag = 2, Ro(n, t, 1))), n.lanes |= 1), e)
            }

            var bl = w.ReactCurrentOwner, wl = !1;

            function xl(e, t, n, r) {
                t.child = null === e ? Xo(t, null, n, r) : Yo(t, e.child, n, r)
            }

            function kl(e, t, n, r, a) {
                n = n.render;
                var o = t.ref;
                return No(t, a), r = Si(e, t, n, r, o, a), n = Ni(), null === e || wl ? (ao && n && eo(t), t.flags |= 1, xl(e, t, r, a), t.child) : (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, Vl(e, t, a))
            }

            function _l(e, t, n, r, a) {
                if (null === e) {
                    var o = n.type;
                    return "function" != typeof o || Tu(o) || void 0 !== o.defaultProps || null !== n.compare || void 0 !== n.defaultProps ? ((e = Ru(n.type, null, r, t, t.mode, a)).ref = t.ref, e.return = t, t.child = e) : (t.tag = 15, t.type = o, Sl(e, t, o, r, a))
                }
                if (o = e.child, 0 === (e.lanes & a)) {
                    var i = o.memoizedProps;
                    if ((n = null !== (n = n.compare) ? n : sr)(i, r) && e.ref === t.ref) return Vl(e, t, a)
                }
                return t.flags |= 1, (e = Ou(o, r)).ref = t.ref, e.return = t, t.child = e
            }

            function Sl(e, t, n, r, a) {
                if (null !== e) {
                    var o = e.memoizedProps;
                    if (sr(o, r) && e.ref === t.ref) {
                        if (wl = !1, t.pendingProps = r = o, 0 === (e.lanes & a)) return t.lanes = e.lanes, Vl(e, t, a);
                        131072 & e.flags && (wl = !0)
                    }
                }
                return Cl(e, t, n, r, a)
            }

            function Nl(e, t, n) {
                var r = t.pendingProps, a = r.children, o = null !== e ? e.memoizedState : null;
                if ("hidden" === r.mode) if (1 & t.mode) {
                    if (!(1073741824 & n)) return e = null !== o ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
                        baseLanes: e,
                        cachePool: null,
                        transitions: null
                    }, t.updateQueue = null, ja(Os, Ts), Ts |= e, null;
                    t.memoizedState = {
                        baseLanes: 0,
                        cachePool: null,
                        transitions: null
                    }, r = null !== o ? o.baseLanes : n, ja(Os, Ts), Ts |= r
                } else t.memoizedState = {
                    baseLanes: 0,
                    cachePool: null,
                    transitions: null
                }, ja(Os, Ts), Ts |= n; else null !== o ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, ja(Os, Ts), Ts |= r;
                return xl(e, t, a, n), t.child
            }

            function jl(e, t) {
                var n = t.ref;
                (null === e && null !== n || null !== e && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152)
            }

            function Cl(e, t, n, r, a) {
                var o = La(n) ? Aa : Pa.current;
                return o = Ia(t, o), No(t, a), n = Si(e, t, n, r, o, a), r = Ni(), null === e || wl ? (ao && r && eo(t), t.flags |= 1, xl(e, t, n, a), t.child) : (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, Vl(e, t, a))
            }

            function Pl(e, t, n, r, a) {
                if (La(n)) {
                    var o = !0;
                    Ma(t)
                } else o = !1;
                if (No(t, a), null === t.stateNode) ql(e, t), qo(t, n, r), $o(t, n, r, a), r = !0; else if (null === e) {
                    var i = t.stateNode, l = t.memoizedProps;
                    i.props = l;
                    var s = i.context, u = n.contextType;
                    u = "object" == typeof u && null !== u ? jo(u) : Ia(t, u = La(n) ? Aa : Pa.current);
                    var c = n.getDerivedStateFromProps,
                        d = "function" == typeof c || "function" == typeof i.getSnapshotBeforeUpdate;
                    d || "function" != typeof i.UNSAFE_componentWillReceiveProps && "function" != typeof i.componentWillReceiveProps || (l !== r || s !== u) && Vo(t, i, r, u), Io = !1;
                    var f = t.memoizedState;
                    i.state = f, Uo(t, r, i, a), s = t.memoizedState, l !== r || f !== s || Ea.current || Io ? ("function" == typeof c && (Bo(t, n, c, r), s = t.memoizedState), (l = Io || Wo(t, n, l, r, f, s, u)) ? (d || "function" != typeof i.UNSAFE_componentWillMount && "function" != typeof i.componentWillMount || ("function" == typeof i.componentWillMount && i.componentWillMount(), "function" == typeof i.UNSAFE_componentWillMount && i.UNSAFE_componentWillMount()), "function" == typeof i.componentDidMount && (t.flags |= 4194308)) : ("function" == typeof i.componentDidMount && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), i.props = r, i.state = s, i.context = u, r = l) : ("function" == typeof i.componentDidMount && (t.flags |= 4194308), r = !1)
                } else {
                    i = t.stateNode, To(e, t), l = t.memoizedProps, u = t.type === t.elementType ? l : yo(t.type, l), i.props = u, d = t.pendingProps, f = i.context, s = "object" == typeof (s = n.contextType) && null !== s ? jo(s) : Ia(t, s = La(n) ? Aa : Pa.current);
                    var p = n.getDerivedStateFromProps;
                    (c = "function" == typeof p || "function" == typeof i.getSnapshotBeforeUpdate) || "function" != typeof i.UNSAFE_componentWillReceiveProps && "function" != typeof i.componentWillReceiveProps || (l !== d || f !== s) && Vo(t, i, r, s), Io = !1, f = t.memoizedState, i.state = f, Uo(t, r, i, a);
                    var h = t.memoizedState;
                    l !== d || f !== h || Ea.current || Io ? ("function" == typeof p && (Bo(t, n, p, r), h = t.memoizedState), (u = Io || Wo(t, n, u, r, f, h, s) || !1) ? (c || "function" != typeof i.UNSAFE_componentWillUpdate && "function" != typeof i.componentWillUpdate || ("function" == typeof i.componentWillUpdate && i.componentWillUpdate(r, h, s), "function" == typeof i.UNSAFE_componentWillUpdate && i.UNSAFE_componentWillUpdate(r, h, s)), "function" == typeof i.componentDidUpdate && (t.flags |= 4), "function" == typeof i.getSnapshotBeforeUpdate && (t.flags |= 1024)) : ("function" != typeof i.componentDidUpdate || l === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), "function" != typeof i.getSnapshotBeforeUpdate || l === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = h), i.props = r, i.state = h, i.context = s, r = u) : ("function" != typeof i.componentDidUpdate || l === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), "function" != typeof i.getSnapshotBeforeUpdate || l === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1)
                }
                return El(e, t, n, r, o, a)
            }

            function El(e, t, n, r, a, o) {
                jl(e, t);
                var i = !!(128 & t.flags);
                if (!r && !i) return a && za(t, n, !1), Vl(e, t, o);
                r = t.stateNode, bl.current = t;
                var l = i && "function" != typeof n.getDerivedStateFromError ? null : r.render();
                return t.flags |= 1, null !== e && i ? (t.child = Yo(t, e.child, null, o), t.child = Yo(t, null, l, o)) : xl(e, t, l, o), t.memoizedState = r.state, a && za(t, n, !0), t.child
            }

            function Al(e) {
                var t = e.stateNode;
                t.pendingContext ? Oa(0, t.pendingContext, t.pendingContext !== t.context) : t.context && Oa(0, t.context, !1), ai(e, t.containerInfo)
            }

            function Il(e, t, n, r, a) {
                return ho(), mo(a), t.flags |= 256, xl(e, t, n, r), t.child
            }

            var Ll, Tl, Ol, Rl, Ml = {dehydrated: null, treeContext: null, retryLane: 0};

            function zl(e) {
                return {baseLanes: e, cachePool: null, transitions: null}
            }

            function Ul(e, t, n) {
                var r, a = t.pendingProps, i = si.current, l = !1, s = !!(128 & t.flags);
                if ((r = s) || (r = (null === e || null !== e.memoizedState) && !!(2 & i)), r ? (l = !0, t.flags &= -129) : null !== e && null === e.memoizedState || (i |= 1), ja(si, 1 & i), null === e) return uo(t), null !== (e = t.memoizedState) && null !== (e = e.dehydrated) ? (1 & t.mode ? "$!" === e.data ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (s = a.children, e = a.fallback, l ? (a = t.mode, l = t.child, s = {
                    mode: "hidden",
                    children: s
                }, 1 & a || null === l ? l = zu(s, a, 0, null) : (l.childLanes = 0, l.pendingProps = s), e = Mu(e, a, n, null), l.return = t, e.return = t, l.sibling = e, t.child = l, t.child.memoizedState = zl(n), t.memoizedState = Ml, e) : Fl(t, s));
                if (null !== (i = e.memoizedState) && null !== (r = i.dehydrated)) return function (e, t, n, r, a, i, l) {
                    if (n) return 256 & t.flags ? (t.flags &= -257, Dl(e, t, l, r = dl(Error(o(422))))) : null !== t.memoizedState ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, a = t.mode, r = zu({
                        mode: "visible",
                        children: r.children
                    }, a, 0, null), (i = Mu(i, a, l, null)).flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, 1 & t.mode && Yo(t, e.child, null, l), t.child.memoizedState = zl(l), t.memoizedState = Ml, i);
                    if (!(1 & t.mode)) return Dl(e, t, l, null);
                    if ("$!" === a.data) {
                        if (r = a.nextSibling && a.nextSibling.dataset) var s = r.dgst;
                        return r = s, Dl(e, t, l, r = dl(i = Error(o(419)), r, void 0))
                    }
                    if (s = 0 !== (l & e.childLanes), wl || s) {
                        if (null !== (r = As)) {
                            switch (l & -l) {
                                case 4:
                                    a = 2;
                                    break;
                                case 16:
                                    a = 8;
                                    break;
                                case 64:
                                case 128:
                                case 256:
                                case 512:
                                case 1024:
                                case 2048:
                                case 4096:
                                case 8192:
                                case 16384:
                                case 32768:
                                case 65536:
                                case 131072:
                                case 262144:
                                case 524288:
                                case 1048576:
                                case 2097152:
                                case 4194304:
                                case 8388608:
                                case 16777216:
                                case 33554432:
                                case 67108864:
                                    a = 32;
                                    break;
                                case 536870912:
                                    a = 268435456;
                                    break;
                                default:
                                    a = 0
                            }
                            0 !== (a = 0 !== (a & (r.suspendedLanes | l)) ? 0 : a) && a !== i.retryLane && (i.retryLane = a, Ao(e, a), ru(r, e, a, -1))
                        }
                        return gu(), Dl(e, t, l, r = dl(Error(o(421))))
                    }
                    return "$?" === a.data ? (t.flags |= 128, t.child = e.child, t = Pu.bind(null, e), a._reactRetry = t, null) : (e = i.treeContext, ro = ua(a.nextSibling), no = t, ao = !0, oo = null, null !== e && (Ha[Ka++] = Ja, Ha[Ka++] = Ya, Ha[Ka++] = Ga, Ja = e.id, Ya = e.overflow, Ga = t), (t = Fl(t, r.children)).flags |= 4096, t)
                }(e, t, s, a, r, i, n);
                if (l) {
                    l = a.fallback, s = t.mode, r = (i = e.child).sibling;
                    var u = {mode: "hidden", children: a.children};
                    return 1 & s || t.child === i ? (a = Ou(i, u)).subtreeFlags = 14680064 & i.subtreeFlags : ((a = t.child).childLanes = 0, a.pendingProps = u, t.deletions = null), null !== r ? l = Ou(r, l) : (l = Mu(l, s, n, null)).flags |= 2, l.return = t, a.return = t, a.sibling = l, t.child = a, a = l, l = t.child, s = null === (s = e.child.memoizedState) ? zl(n) : {
                        baseLanes: s.baseLanes | n,
                        cachePool: null,
                        transitions: s.transitions
                    }, l.memoizedState = s, l.childLanes = e.childLanes & ~n, t.memoizedState = Ml, a
                }
                return e = (l = e.child).sibling, a = Ou(l, {
                    mode: "visible",
                    children: a.children
                }), !(1 & t.mode) && (a.lanes = n), a.return = t, a.sibling = null, null !== e && (null === (n = t.deletions) ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = a, t.memoizedState = null, a
            }

            function Fl(e, t) {
                return (t = zu({mode: "visible", children: t}, e.mode, 0, null)).return = e, e.child = t
            }

            function Dl(e, t, n, r) {
                return null !== r && mo(r), Yo(t, e.child, null, n), (e = Fl(t, t.pendingProps.children)).flags |= 2, t.memoizedState = null, e
            }

            function Bl(e, t, n) {
                e.lanes |= t;
                var r = e.alternate;
                null !== r && (r.lanes |= t), So(e.return, t, n)
            }

            function Ql(e, t, n, r, a) {
                var o = e.memoizedState;
                null === o ? e.memoizedState = {
                    isBackwards: t,
                    rendering: null,
                    renderingStartTime: 0,
                    last: r,
                    tail: n,
                    tailMode: a
                } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = a)
            }

            function Wl(e, t, n) {
                var r = t.pendingProps, a = r.revealOrder, o = r.tail;
                if (xl(e, t, r.children, n), 2 & (r = si.current)) r = 1 & r | 2, t.flags |= 128; else {
                    if (null !== e && 128 & e.flags) e:for (e = t.child; null !== e;) {
                        if (13 === e.tag) null !== e.memoizedState && Bl(e, n, t); else if (19 === e.tag) Bl(e, n, t); else if (null !== e.child) {
                            e.child.return = e, e = e.child;
                            continue
                        }
                        if (e === t) break e;
                        for (; null === e.sibling;) {
                            if (null === e.return || e.return === t) break e;
                            e = e.return
                        }
                        e.sibling.return = e.return, e = e.sibling
                    }
                    r &= 1
                }
                if (ja(si, r), 1 & t.mode) switch (a) {
                    case"forwards":
                        for (n = t.child, a = null; null !== n;) null !== (e = n.alternate) && null === ui(e) && (a = n), n = n.sibling;
                        null === (n = a) ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null), Ql(t, !1, a, n, o);
                        break;
                    case"backwards":
                        for (n = null, a = t.child, t.child = null; null !== a;) {
                            if (null !== (e = a.alternate) && null === ui(e)) {
                                t.child = a;
                                break
                            }
                            e = a.sibling, a.sibling = n, n = a, a = e
                        }
                        Ql(t, !0, n, null, o);
                        break;
                    case"together":
                        Ql(t, !1, null, null, void 0);
                        break;
                    default:
                        t.memoizedState = null
                } else t.memoizedState = null;
                return t.child
            }

            function ql(e, t) {
                !(1 & t.mode) && null !== e && (e.alternate = null, t.alternate = null, t.flags |= 2)
            }

            function Vl(e, t, n) {
                if (null !== e && (t.dependencies = e.dependencies), zs |= t.lanes, 0 === (n & t.childLanes)) return null;
                if (null !== e && t.child !== e.child) throw Error(o(153));
                if (null !== t.child) {
                    for (n = Ou(e = t.child, e.pendingProps), t.child = n, n.return = t; null !== e.sibling;) e = e.sibling, (n = n.sibling = Ou(e, e.pendingProps)).return = t;
                    n.sibling = null
                }
                return t.child
            }

            function $l(e, t) {
                if (!ao) switch (e.tailMode) {
                    case"hidden":
                        t = e.tail;
                        for (var n = null; null !== t;) null !== t.alternate && (n = t), t = t.sibling;
                        null === n ? e.tail = null : n.sibling = null;
                        break;
                    case"collapsed":
                        n = e.tail;
                        for (var r = null; null !== n;) null !== n.alternate && (r = n), n = n.sibling;
                        null === r ? t || null === e.tail ? e.tail = null : e.tail.sibling = null : r.sibling = null
                }
            }

            function Hl(e) {
                var t = null !== e.alternate && e.alternate.child === e.child, n = 0, r = 0;
                if (t) for (var a = e.child; null !== a;) n |= a.lanes | a.childLanes, r |= 14680064 & a.subtreeFlags, r |= 14680064 & a.flags, a.return = e, a = a.sibling; else for (a = e.child; null !== a;) n |= a.lanes | a.childLanes, r |= a.subtreeFlags, r |= a.flags, a.return = e, a = a.sibling;
                return e.subtreeFlags |= r, e.childLanes = n, t
            }

            function Kl(e, t, n) {
                var r = t.pendingProps;
                switch (to(t), t.tag) {
                    case 2:
                    case 16:
                    case 15:
                    case 0:
                    case 11:
                    case 7:
                    case 8:
                    case 12:
                    case 9:
                    case 14:
                        return Hl(t), null;
                    case 1:
                    case 17:
                        return La(t.type) && Ta(), Hl(t), null;
                    case 3:
                        return r = t.stateNode, oi(), Na(Ea), Na(Pa), di(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), null !== e && null !== e.child || (fo(t) ? t.flags |= 4 : null === e || e.memoizedState.isDehydrated && !(256 & t.flags) || (t.flags |= 1024, null !== oo && (lu(oo), oo = null))), Tl(e, t), Hl(t), null;
                    case 5:
                        li(t);
                        var a = ri(ni.current);
                        if (n = t.type, null !== e && null != t.stateNode) Ol(e, t, n, r, a), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152); else {
                            if (!r) {
                                if (null === t.stateNode) throw Error(o(166));
                                return Hl(t), null
                            }
                            if (e = ri(ei.current), fo(t)) {
                                r = t.stateNode, n = t.type;
                                var i = t.memoizedProps;
                                switch (r[fa] = t, r[pa] = i, e = !!(1 & t.mode), n) {
                                    case"dialog":
                                        Fr("cancel", r), Fr("close", r);
                                        break;
                                    case"iframe":
                                    case"object":
                                    case"embed":
                                        Fr("load", r);
                                        break;
                                    case"video":
                                    case"audio":
                                        for (a = 0; a < Rr.length; a++) Fr(Rr[a], r);
                                        break;
                                    case"source":
                                        Fr("error", r);
                                        break;
                                    case"img":
                                    case"image":
                                    case"link":
                                        Fr("error", r), Fr("load", r);
                                        break;
                                    case"details":
                                        Fr("toggle", r);
                                        break;
                                    case"input":
                                        J(r, i), Fr("invalid", r);
                                        break;
                                    case"select":
                                        r._wrapperState = {wasMultiple: !!i.multiple}, Fr("invalid", r);
                                        break;
                                    case"textarea":
                                        ae(r, i), Fr("invalid", r)
                                }
                                for (var s in ve(n, i), a = null, i) if (i.hasOwnProperty(s)) {
                                    var u = i[s];
                                    "children" === s ? "string" == typeof u ? r.textContent !== u && (!0 !== i.suppressHydrationWarning && Xr(r.textContent, u, e), a = ["children", u]) : "number" == typeof u && r.textContent !== "" + u && (!0 !== i.suppressHydrationWarning && Xr(r.textContent, u, e), a = ["children", "" + u]) : l.hasOwnProperty(s) && null != u && "onScroll" === s && Fr("scroll", r)
                                }
                                switch (n) {
                                    case"input":
                                        $(r), Z(r, i, !0);
                                        break;
                                    case"textarea":
                                        $(r), ie(r);
                                        break;
                                    case"select":
                                    case"option":
                                        break;
                                    default:
                                        "function" == typeof i.onClick && (r.onclick = Zr)
                                }
                                r = a, t.updateQueue = r, null !== r && (t.flags |= 4)
                            } else {
                                s = 9 === a.nodeType ? a : a.ownerDocument, "http://www.w3.org/1999/xhtml" === e && (e = le(n)), "http://www.w3.org/1999/xhtml" === e ? "script" === n ? ((e = s.createElement("div")).innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : "string" == typeof r.is ? e = s.createElement(n, {is: r.is}) : (e = s.createElement(n), "select" === n && (s = e, r.multiple ? s.multiple = !0 : r.size && (s.size = r.size))) : e = s.createElementNS(e, n), e[fa] = t, e[pa] = r, Ll(e, t, !1, !1), t.stateNode = e;
                                e:{
                                    switch (s = be(n, r), n) {
                                        case"dialog":
                                            Fr("cancel", e), Fr("close", e), a = r;
                                            break;
                                        case"iframe":
                                        case"object":
                                        case"embed":
                                            Fr("load", e), a = r;
                                            break;
                                        case"video":
                                        case"audio":
                                            for (a = 0; a < Rr.length; a++) Fr(Rr[a], e);
                                            a = r;
                                            break;
                                        case"source":
                                            Fr("error", e), a = r;
                                            break;
                                        case"img":
                                        case"image":
                                        case"link":
                                            Fr("error", e), Fr("load", e), a = r;
                                            break;
                                        case"details":
                                            Fr("toggle", e), a = r;
                                            break;
                                        case"input":
                                            J(e, r), a = G(e, r), Fr("invalid", e);
                                            break;
                                        case"option":
                                        default:
                                            a = r;
                                            break;
                                        case"select":
                                            e._wrapperState = {wasMultiple: !!r.multiple}, a = z({}, r, {value: void 0}), Fr("invalid", e);
                                            break;
                                        case"textarea":
                                            ae(e, r), a = re(e, r), Fr("invalid", e)
                                    }
                                    for (i in ve(n, a), u = a) if (u.hasOwnProperty(i)) {
                                        var c = u[i];
                                        "style" === i ? ge(e, c) : "dangerouslySetInnerHTML" === i ? null != (c = c ? c.__html : void 0) && de(e, c) : "children" === i ? "string" == typeof c ? ("textarea" !== n || "" !== c) && fe(e, c) : "number" == typeof c && fe(e, "" + c) : "suppressContentEditableWarning" !== i && "suppressHydrationWarning" !== i && "autoFocus" !== i && (l.hasOwnProperty(i) ? null != c && "onScroll" === i && Fr("scroll", e) : null != c && b(e, i, c, s))
                                    }
                                    switch (n) {
                                        case"input":
                                            $(e), Z(e, r, !1);
                                            break;
                                        case"textarea":
                                            $(e), ie(e);
                                            break;
                                        case"option":
                                            null != r.value && e.setAttribute("value", "" + q(r.value));
                                            break;
                                        case"select":
                                            e.multiple = !!r.multiple, null != (i = r.value) ? ne(e, !!r.multiple, i, !1) : null != r.defaultValue && ne(e, !!r.multiple, r.defaultValue, !0);
                                            break;
                                        default:
                                            "function" == typeof a.onClick && (e.onclick = Zr)
                                    }
                                    switch (n) {
                                        case"button":
                                        case"input":
                                        case"select":
                                        case"textarea":
                                            r = !!r.autoFocus;
                                            break e;
                                        case"img":
                                            r = !0;
                                            break e;
                                        default:
                                            r = !1
                                    }
                                }
                                r && (t.flags |= 4)
                            }
                            null !== t.ref && (t.flags |= 512, t.flags |= 2097152)
                        }
                        return Hl(t), null;
                    case 6:
                        if (e && null != t.stateNode) Rl(e, t, e.memoizedProps, r); else {
                            if ("string" != typeof r && null === t.stateNode) throw Error(o(166));
                            if (n = ri(ni.current), ri(ei.current), fo(t)) {
                                if (r = t.stateNode, n = t.memoizedProps, r[fa] = t, (i = r.nodeValue !== n) && null !== (e = no)) switch (e.tag) {
                                    case 3:
                                        Xr(r.nodeValue, n, !!(1 & e.mode));
                                        break;
                                    case 5:
                                        !0 !== e.memoizedProps.suppressHydrationWarning && Xr(r.nodeValue, n, !!(1 & e.mode))
                                }
                                i && (t.flags |= 4)
                            } else (r = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(r))[fa] = t, t.stateNode = r
                        }
                        return Hl(t), null;
                    case 13:
                        if (Na(si), r = t.memoizedState, null === e || null !== e.memoizedState && null !== e.memoizedState.dehydrated) {
                            if (ao && null !== ro && 1 & t.mode && !(128 & t.flags)) po(), ho(), t.flags |= 98560, i = !1; else if (i = fo(t), null !== r && null !== r.dehydrated) {
                                if (null === e) {
                                    if (!i) throw Error(o(318));
                                    if (!(i = null !== (i = t.memoizedState) ? i.dehydrated : null)) throw Error(o(317));
                                    i[fa] = t
                                } else ho(), !(128 & t.flags) && (t.memoizedState = null), t.flags |= 4;
                                Hl(t), i = !1
                            } else null !== oo && (lu(oo), oo = null), i = !0;
                            if (!i) return 65536 & t.flags ? t : null
                        }
                        return 128 & t.flags ? (t.lanes = n, t) : ((r = null !== r) != (null !== e && null !== e.memoizedState) && r && (t.child.flags |= 8192, 1 & t.mode && (null === e || 1 & si.current ? 0 === Rs && (Rs = 3) : gu())), null !== t.updateQueue && (t.flags |= 4), Hl(t), null);
                    case 4:
                        return oi(), Tl(e, t), null === e && Qr(t.stateNode.containerInfo), Hl(t), null;
                    case 10:
                        return _o(t.type._context), Hl(t), null;
                    case 19:
                        if (Na(si), null === (i = t.memoizedState)) return Hl(t), null;
                        if (r = !!(128 & t.flags), null === (s = i.rendering)) if (r) $l(i, !1); else {
                            if (0 !== Rs || null !== e && 128 & e.flags) for (e = t.child; null !== e;) {
                                if (null !== (s = ui(e))) {
                                    for (t.flags |= 128, $l(i, !1), null !== (r = s.updateQueue) && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; null !== n;) e = r, (i = n).flags &= 14680066, null === (s = i.alternate) ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = s.childLanes, i.lanes = s.lanes, i.child = s.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = s.memoizedProps, i.memoizedState = s.memoizedState, i.updateQueue = s.updateQueue, i.type = s.type, e = s.dependencies, i.dependencies = null === e ? null : {
                                        lanes: e.lanes,
                                        firstContext: e.firstContext
                                    }), n = n.sibling;
                                    return ja(si, 1 & si.current | 2), t.child
                                }
                                e = e.sibling
                            }
                            null !== i.tail && Ye() > Ws && (t.flags |= 128, r = !0, $l(i, !1), t.lanes = 4194304)
                        } else {
                            if (!r) if (null !== (e = ui(s))) {
                                if (t.flags |= 128, r = !0, null !== (n = e.updateQueue) && (t.updateQueue = n, t.flags |= 4), $l(i, !0), null === i.tail && "hidden" === i.tailMode && !s.alternate && !ao) return Hl(t), null
                            } else 2 * Ye() - i.renderingStartTime > Ws && 1073741824 !== n && (t.flags |= 128, r = !0, $l(i, !1), t.lanes = 4194304);
                            i.isBackwards ? (s.sibling = t.child, t.child = s) : (null !== (n = i.last) ? n.sibling = s : t.child = s, i.last = s)
                        }
                        return null !== i.tail ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = Ye(), t.sibling = null, n = si.current, ja(si, r ? 1 & n | 2 : 1 & n), t) : (Hl(t), null);
                    case 22:
                    case 23:
                        return fu(), r = null !== t.memoizedState, null !== e && null !== e.memoizedState !== r && (t.flags |= 8192), r && 1 & t.mode ? !!(1073741824 & Ts) && (Hl(t), 6 & t.subtreeFlags && (t.flags |= 8192)) : Hl(t), null;
                    case 24:
                    case 25:
                        return null
                }
                throw Error(o(156, t.tag))
            }

            function Gl(e, t) {
                switch (to(t), t.tag) {
                    case 1:
                        return La(t.type) && Ta(), 65536 & (e = t.flags) ? (t.flags = -65537 & e | 128, t) : null;
                    case 3:
                        return oi(), Na(Ea), Na(Pa), di(), 65536 & (e = t.flags) && !(128 & e) ? (t.flags = -65537 & e | 128, t) : null;
                    case 5:
                        return li(t), null;
                    case 13:
                        if (Na(si), null !== (e = t.memoizedState) && null !== e.dehydrated) {
                            if (null === t.alternate) throw Error(o(340));
                            ho()
                        }
                        return 65536 & (e = t.flags) ? (t.flags = -65537 & e | 128, t) : null;
                    case 19:
                        return Na(si), null;
                    case 4:
                        return oi(), null;
                    case 10:
                        return _o(t.type._context), null;
                    case 22:
                    case 23:
                        return fu(), null;
                    default:
                        return null
                }
            }

            Ll = function (e, t) {
                for (var n = t.child; null !== n;) {
                    if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode); else if (4 !== n.tag && null !== n.child) {
                        n.child.return = n, n = n.child;
                        continue
                    }
                    if (n === t) break;
                    for (; null === n.sibling;) {
                        if (null === n.return || n.return === t) return;
                        n = n.return
                    }
                    n.sibling.return = n.return, n = n.sibling
                }
            }, Tl = function () {
            }, Ol = function (e, t, n, r) {
                var a = e.memoizedProps;
                if (a !== r) {
                    e = t.stateNode, ri(ei.current);
                    var o, i = null;
                    switch (n) {
                        case"input":
                            a = G(e, a), r = G(e, r), i = [];
                            break;
                        case"select":
                            a = z({}, a, {value: void 0}), r = z({}, r, {value: void 0}), i = [];
                            break;
                        case"textarea":
                            a = re(e, a), r = re(e, r), i = [];
                            break;
                        default:
                            "function" != typeof a.onClick && "function" == typeof r.onClick && (e.onclick = Zr)
                    }
                    for (c in ve(n, r), n = null, a) if (!r.hasOwnProperty(c) && a.hasOwnProperty(c) && null != a[c]) if ("style" === c) {
                        var s = a[c];
                        for (o in s) s.hasOwnProperty(o) && (n || (n = {}), n[o] = "")
                    } else "dangerouslySetInnerHTML" !== c && "children" !== c && "suppressContentEditableWarning" !== c && "suppressHydrationWarning" !== c && "autoFocus" !== c && (l.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
                    for (c in r) {
                        var u = r[c];
                        if (s = null != a ? a[c] : void 0, r.hasOwnProperty(c) && u !== s && (null != u || null != s)) if ("style" === c) if (s) {
                            for (o in s) !s.hasOwnProperty(o) || u && u.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
                            for (o in u) u.hasOwnProperty(o) && s[o] !== u[o] && (n || (n = {}), n[o] = u[o])
                        } else n || (i || (i = []), i.push(c, n)), n = u; else "dangerouslySetInnerHTML" === c ? (u = u ? u.__html : void 0, s = s ? s.__html : void 0, null != u && s !== u && (i = i || []).push(c, u)) : "children" === c ? "string" != typeof u && "number" != typeof u || (i = i || []).push(c, "" + u) : "suppressContentEditableWarning" !== c && "suppressHydrationWarning" !== c && (l.hasOwnProperty(c) ? (null != u && "onScroll" === c && Fr("scroll", e), i || s === u || (i = [])) : (i = i || []).push(c, u))
                    }
                    n && (i = i || []).push("style", n);
                    var c = i;
                    (t.updateQueue = c) && (t.flags |= 4)
                }
            }, Rl = function (e, t, n, r) {
                n !== r && (t.flags |= 4)
            };
            var Jl = !1, Yl = !1, Xl = "function" == typeof WeakSet ? WeakSet : Set, Zl = null;

            function es(e, t) {
                var n = e.ref;
                if (null !== n) if ("function" == typeof n) try {
                    n(null)
                } catch (n) {
                    Nu(e, t, n)
                } else n.current = null
            }

            function ts(e, t, n) {
                try {
                    n()
                } catch (n) {
                    Nu(e, t, n)
                }
            }

            var ns = !1;

            function rs(e, t, n) {
                var r = t.updateQueue;
                if (null !== (r = null !== r ? r.lastEffect : null)) {
                    var a = r = r.next;
                    do {
                        if ((a.tag & e) === e) {
                            var o = a.destroy;
                            a.destroy = void 0, void 0 !== o && ts(t, n, o)
                        }
                        a = a.next
                    } while (a !== r)
                }
            }

            function as(e, t) {
                if (null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)) {
                    var n = t = t.next;
                    do {
                        if ((n.tag & e) === e) {
                            var r = n.create;
                            n.destroy = r()
                        }
                        n = n.next
                    } while (n !== t)
                }
            }

            function os(e) {
                var t = e.ref;
                if (null !== t) {
                    var n = e.stateNode;
                    e.tag, e = n, "function" == typeof t ? t(e) : t.current = e
                }
            }

            function is(e) {
                var t = e.alternate;
                null !== t && (e.alternate = null, is(t)), e.child = null, e.deletions = null, e.sibling = null, 5 === e.tag && null !== (t = e.stateNode) && (delete t[fa], delete t[pa], delete t[ma], delete t[ga], delete t[ya]), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null
            }

            function ls(e) {
                return 5 === e.tag || 3 === e.tag || 4 === e.tag
            }

            function ss(e) {
                e:for (; ;) {
                    for (; null === e.sibling;) {
                        if (null === e.return || ls(e.return)) return null;
                        e = e.return
                    }
                    for (e.sibling.return = e.return, e = e.sibling; 5 !== e.tag && 6 !== e.tag && 18 !== e.tag;) {
                        if (2 & e.flags) continue e;
                        if (null === e.child || 4 === e.tag) continue e;
                        e.child.return = e, e = e.child
                    }
                    if (!(2 & e.flags)) return e.stateNode
                }
            }

            function us(e, t, n) {
                var r = e.tag;
                if (5 === r || 6 === r) e = e.stateNode, t ? 8 === n.nodeType ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (8 === n.nodeType ? (t = n.parentNode).insertBefore(e, n) : (t = n).appendChild(e), null != (n = n._reactRootContainer) || null !== t.onclick || (t.onclick = Zr)); else if (4 !== r && null !== (e = e.child)) for (us(e, t, n), e = e.sibling; null !== e;) us(e, t, n), e = e.sibling
            }

            function cs(e, t, n) {
                var r = e.tag;
                if (5 === r || 6 === r) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e); else if (4 !== r && null !== (e = e.child)) for (cs(e, t, n), e = e.sibling; null !== e;) cs(e, t, n), e = e.sibling
            }

            var ds = null, fs = !1;

            function ps(e, t, n) {
                for (n = n.child; null !== n;) hs(e, t, n), n = n.sibling
            }

            function hs(e, t, n) {
                if (ot && "function" == typeof ot.onCommitFiberUnmount) try {
                    ot.onCommitFiberUnmount(at, n)
                } catch (e) {
                }
                switch (n.tag) {
                    case 5:
                        Yl || es(n, t);
                    case 6:
                        var r = ds, a = fs;
                        ds = null, ps(e, t, n), fs = a, null !== (ds = r) && (fs ? (e = ds, n = n.stateNode, 8 === e.nodeType ? e.parentNode.removeChild(n) : e.removeChild(n)) : ds.removeChild(n.stateNode));
                        break;
                    case 18:
                        null !== ds && (fs ? (e = ds, n = n.stateNode, 8 === e.nodeType ? sa(e.parentNode, n) : 1 === e.nodeType && sa(e, n), Qt(e)) : sa(ds, n.stateNode));
                        break;
                    case 4:
                        r = ds, a = fs, ds = n.stateNode.containerInfo, fs = !0, ps(e, t, n), ds = r, fs = a;
                        break;
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                        if (!Yl && null !== (r = n.updateQueue) && null !== (r = r.lastEffect)) {
                            a = r = r.next;
                            do {
                                var o = a, i = o.destroy;
                                o = o.tag, void 0 !== i && (2 & o || 4 & o) && ts(n, t, i), a = a.next
                            } while (a !== r)
                        }
                        ps(e, t, n);
                        break;
                    case 1:
                        if (!Yl && (es(n, t), "function" == typeof (r = n.stateNode).componentWillUnmount)) try {
                            r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount()
                        } catch (e) {
                            Nu(n, t, e)
                        }
                        ps(e, t, n);
                        break;
                    case 21:
                        ps(e, t, n);
                        break;
                    case 22:
                        1 & n.mode ? (Yl = (r = Yl) || null !== n.memoizedState, ps(e, t, n), Yl = r) : ps(e, t, n);
                        break;
                    default:
                        ps(e, t, n)
                }
            }

            function ms(e) {
                var t = e.updateQueue;
                if (null !== t) {
                    e.updateQueue = null;
                    var n = e.stateNode;
                    null === n && (n = e.stateNode = new Xl), t.forEach((function (t) {
                        var r = Eu.bind(null, e, t);
                        n.has(t) || (n.add(t), t.then(r, r))
                    }))
                }
            }

            function gs(e, t) {
                var n = t.deletions;
                if (null !== n) for (var r = 0; r < n.length; r++) {
                    var a = n[r];
                    try {
                        var i = e, l = t, s = l;
                        e:for (; null !== s;) {
                            switch (s.tag) {
                                case 5:
                                    ds = s.stateNode, fs = !1;
                                    break e;
                                case 3:
                                case 4:
                                    ds = s.stateNode.containerInfo, fs = !0;
                                    break e
                            }
                            s = s.return
                        }
                        if (null === ds) throw Error(o(160));
                        hs(i, l, a), ds = null, fs = !1;
                        var u = a.alternate;
                        null !== u && (u.return = null), a.return = null
                    } catch (e) {
                        Nu(a, t, e)
                    }
                }
                if (12854 & t.subtreeFlags) for (t = t.child; null !== t;) ys(t, e), t = t.sibling
            }

            function ys(e, t) {
                var n = e.alternate, r = e.flags;
                switch (e.tag) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                        if (gs(t, e), vs(e), 4 & r) {
                            try {
                                rs(3, e, e.return), as(3, e)
                            } catch (t) {
                                Nu(e, e.return, t)
                            }
                            try {
                                rs(5, e, e.return)
                            } catch (t) {
                                Nu(e, e.return, t)
                            }
                        }
                        break;
                    case 1:
                        gs(t, e), vs(e), 512 & r && null !== n && es(n, n.return);
                        break;
                    case 5:
                        if (gs(t, e), vs(e), 512 & r && null !== n && es(n, n.return), 32 & e.flags) {
                            var a = e.stateNode;
                            try {
                                fe(a, "")
                            } catch (t) {
                                Nu(e, e.return, t)
                            }
                        }
                        if (4 & r && null != (a = e.stateNode)) {
                            var i = e.memoizedProps, l = null !== n ? n.memoizedProps : i, s = e.type,
                                u = e.updateQueue;
                            if (e.updateQueue = null, null !== u) try {
                                "input" === s && "radio" === i.type && null != i.name && Y(a, i), be(s, l);
                                var c = be(s, i);
                                for (l = 0; l < u.length; l += 2) {
                                    var d = u[l], f = u[l + 1];
                                    "style" === d ? ge(a, f) : "dangerouslySetInnerHTML" === d ? de(a, f) : "children" === d ? fe(a, f) : b(a, d, f, c)
                                }
                                switch (s) {
                                    case"input":
                                        X(a, i);
                                        break;
                                    case"textarea":
                                        oe(a, i);
                                        break;
                                    case"select":
                                        var p = a._wrapperState.wasMultiple;
                                        a._wrapperState.wasMultiple = !!i.multiple;
                                        var h = i.value;
                                        null != h ? ne(a, !!i.multiple, h, !1) : p !== !!i.multiple && (null != i.defaultValue ? ne(a, !!i.multiple, i.defaultValue, !0) : ne(a, !!i.multiple, i.multiple ? [] : "", !1))
                                }
                                a[pa] = i
                            } catch (t) {
                                Nu(e, e.return, t)
                            }
                        }
                        break;
                    case 6:
                        if (gs(t, e), vs(e), 4 & r) {
                            if (null === e.stateNode) throw Error(o(162));
                            a = e.stateNode, i = e.memoizedProps;
                            try {
                                a.nodeValue = i
                            } catch (t) {
                                Nu(e, e.return, t)
                            }
                        }
                        break;
                    case 3:
                        if (gs(t, e), vs(e), 4 & r && null !== n && n.memoizedState.isDehydrated) try {
                            Qt(t.containerInfo)
                        } catch (t) {
                            Nu(e, e.return, t)
                        }
                        break;
                    case 4:
                    default:
                        gs(t, e), vs(e);
                        break;
                    case 13:
                        gs(t, e), vs(e), 8192 & (a = e.child).flags && (i = null !== a.memoizedState, a.stateNode.isHidden = i, !i || null !== a.alternate && null !== a.alternate.memoizedState || (Qs = Ye())), 4 & r && ms(e);
                        break;
                    case 22:
                        if (d = null !== n && null !== n.memoizedState, 1 & e.mode ? (Yl = (c = Yl) || d, gs(t, e), Yl = c) : gs(t, e), vs(e), 8192 & r) {
                            if (c = null !== e.memoizedState, (e.stateNode.isHidden = c) && !d && 1 & e.mode) for (Zl = e, d = e.child; null !== d;) {
                                for (f = Zl = d; null !== Zl;) {
                                    switch (h = (p = Zl).child, p.tag) {
                                        case 0:
                                        case 11:
                                        case 14:
                                        case 15:
                                            rs(4, p, p.return);
                                            break;
                                        case 1:
                                            es(p, p.return);
                                            var m = p.stateNode;
                                            if ("function" == typeof m.componentWillUnmount) {
                                                r = p, n = p.return;
                                                try {
                                                    t = r, m.props = t.memoizedProps, m.state = t.memoizedState, m.componentWillUnmount()
                                                } catch (e) {
                                                    Nu(r, n, e)
                                                }
                                            }
                                            break;
                                        case 5:
                                            es(p, p.return);
                                            break;
                                        case 22:
                                            if (null !== p.memoizedState) {
                                                ks(f);
                                                continue
                                            }
                                    }
                                    null !== h ? (h.return = p, Zl = h) : ks(f)
                                }
                                d = d.sibling
                            }
                            e:for (d = null, f = e; ;) {
                                if (5 === f.tag) {
                                    if (null === d) {
                                        d = f;
                                        try {
                                            a = f.stateNode, c ? "function" == typeof (i = a.style).setProperty ? i.setProperty("display", "none", "important") : i.display = "none" : (s = f.stateNode, l = null != (u = f.memoizedProps.style) && u.hasOwnProperty("display") ? u.display : null, s.style.display = me("display", l))
                                        } catch (t) {
                                            Nu(e, e.return, t)
                                        }
                                    }
                                } else if (6 === f.tag) {
                                    if (null === d) try {
                                        f.stateNode.nodeValue = c ? "" : f.memoizedProps
                                    } catch (t) {
                                        Nu(e, e.return, t)
                                    }
                                } else if ((22 !== f.tag && 23 !== f.tag || null === f.memoizedState || f === e) && null !== f.child) {
                                    f.child.return = f, f = f.child;
                                    continue
                                }
                                if (f === e) break e;
                                for (; null === f.sibling;) {
                                    if (null === f.return || f.return === e) break e;
                                    d === f && (d = null), f = f.return
                                }
                                d === f && (d = null), f.sibling.return = f.return, f = f.sibling
                            }
                        }
                        break;
                    case 19:
                        gs(t, e), vs(e), 4 & r && ms(e);
                    case 21:
                }
            }

            function vs(e) {
                var t = e.flags;
                if (2 & t) {
                    try {
                        e:{
                            for (var n = e.return; null !== n;) {
                                if (ls(n)) {
                                    var r = n;
                                    break e
                                }
                                n = n.return
                            }
                            throw Error(o(160))
                        }
                        switch (r.tag) {
                            case 5:
                                var a = r.stateNode;
                                32 & r.flags && (fe(a, ""), r.flags &= -33), cs(e, ss(e), a);
                                break;
                            case 3:
                            case 4:
                                var i = r.stateNode.containerInfo;
                                us(e, ss(e), i);
                                break;
                            default:
                                throw Error(o(161))
                        }
                    } catch (t) {
                        Nu(e, e.return, t)
                    }
                    e.flags &= -3
                }
                4096 & t && (e.flags &= -4097)
            }

            function bs(e, t, n) {
                Zl = e, ws(e, t, n)
            }

            function ws(e, t, n) {
                for (var r = !!(1 & e.mode); null !== Zl;) {
                    var a = Zl, o = a.child;
                    if (22 === a.tag && r) {
                        var i = null !== a.memoizedState || Jl;
                        if (!i) {
                            var l = a.alternate, s = null !== l && null !== l.memoizedState || Yl;
                            l = Jl;
                            var u = Yl;
                            if (Jl = i, (Yl = s) && !u) for (Zl = a; null !== Zl;) s = (i = Zl).child, 22 === i.tag && null !== i.memoizedState ? _s(a) : null !== s ? (s.return = i, Zl = s) : _s(a);
                            for (; null !== o;) Zl = o, ws(o, t, n), o = o.sibling;
                            Zl = a, Jl = l, Yl = u
                        }
                        xs(e)
                    } else 8772 & a.subtreeFlags && null !== o ? (o.return = a, Zl = o) : xs(e)
                }
            }

            function xs(e) {
                for (; null !== Zl;) {
                    var t = Zl;
                    if (8772 & t.flags) {
                        var n = t.alternate;
                        try {
                            if (8772 & t.flags) switch (t.tag) {
                                case 0:
                                case 11:
                                case 15:
                                    Yl || as(5, t);
                                    break;
                                case 1:
                                    var r = t.stateNode;
                                    if (4 & t.flags && !Yl) if (null === n) r.componentDidMount(); else {
                                        var a = t.elementType === t.type ? n.memoizedProps : yo(t.type, n.memoizedProps);
                                        r.componentDidUpdate(a, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                                    }
                                    var i = t.updateQueue;
                                    null !== i && Fo(t, i, r);
                                    break;
                                case 3:
                                    var l = t.updateQueue;
                                    if (null !== l) {
                                        if (n = null, null !== t.child) switch (t.child.tag) {
                                            case 5:
                                            case 1:
                                                n = t.child.stateNode
                                        }
                                        Fo(t, l, n)
                                    }
                                    break;
                                case 5:
                                    var s = t.stateNode;
                                    if (null === n && 4 & t.flags) {
                                        n = s;
                                        var u = t.memoizedProps;
                                        switch (t.type) {
                                            case"button":
                                            case"input":
                                            case"select":
                                            case"textarea":
                                                u.autoFocus && n.focus();
                                                break;
                                            case"img":
                                                u.src && (n.src = u.src)
                                        }
                                    }
                                    break;
                                case 6:
                                case 4:
                                case 12:
                                case 19:
                                case 17:
                                case 21:
                                case 22:
                                case 23:
                                case 25:
                                    break;
                                case 13:
                                    if (null === t.memoizedState) {
                                        var c = t.alternate;
                                        if (null !== c) {
                                            var d = c.memoizedState;
                                            if (null !== d) {
                                                var f = d.dehydrated;
                                                null !== f && Qt(f)
                                            }
                                        }
                                    }
                                    break;
                                default:
                                    throw Error(o(163))
                            }
                            Yl || 512 & t.flags && os(t)
                        } catch (e) {
                            Nu(t, t.return, e)
                        }
                    }
                    if (t === e) {
                        Zl = null;
                        break
                    }
                    if (null !== (n = t.sibling)) {
                        n.return = t.return, Zl = n;
                        break
                    }
                    Zl = t.return
                }
            }

            function ks(e) {
                for (; null !== Zl;) {
                    var t = Zl;
                    if (t === e) {
                        Zl = null;
                        break
                    }
                    var n = t.sibling;
                    if (null !== n) {
                        n.return = t.return, Zl = n;
                        break
                    }
                    Zl = t.return
                }
            }

            function _s(e) {
                for (; null !== Zl;) {
                    var t = Zl;
                    try {
                        switch (t.tag) {
                            case 0:
                            case 11:
                            case 15:
                                var n = t.return;
                                try {
                                    as(4, t)
                                } catch (e) {
                                    Nu(t, n, e)
                                }
                                break;
                            case 1:
                                var r = t.stateNode;
                                if ("function" == typeof r.componentDidMount) {
                                    var a = t.return;
                                    try {
                                        r.componentDidMount()
                                    } catch (e) {
                                        Nu(t, a, e)
                                    }
                                }
                                var o = t.return;
                                try {
                                    os(t)
                                } catch (e) {
                                    Nu(t, o, e)
                                }
                                break;
                            case 5:
                                var i = t.return;
                                try {
                                    os(t)
                                } catch (e) {
                                    Nu(t, i, e)
                                }
                        }
                    } catch (e) {
                        Nu(t, t.return, e)
                    }
                    if (t === e) {
                        Zl = null;
                        break
                    }
                    var l = t.sibling;
                    if (null !== l) {
                        l.return = t.return, Zl = l;
                        break
                    }
                    Zl = t.return
                }
            }

            var Ss, Ns = Math.ceil, js = w.ReactCurrentDispatcher, Cs = w.ReactCurrentOwner,
                Ps = w.ReactCurrentBatchConfig, Es = 0, As = null, Is = null, Ls = 0, Ts = 0, Os = Sa(0), Rs = 0,
                Ms = null, zs = 0, Us = 0, Fs = 0, Ds = null, Bs = null, Qs = 0, Ws = 1 / 0, qs = null, Vs = !1,
                $s = null, Hs = null, Ks = !1, Gs = null, Js = 0, Ys = 0, Xs = null, Zs = -1, eu = 0;

            function tu() {
                return 6 & Es ? Ye() : -1 !== Zs ? Zs : Zs = Ye()
            }

            function nu(e) {
                return 1 & e.mode ? 2 & Es && 0 !== Ls ? Ls & -Ls : null !== go.transition ? (0 === eu && (eu = mt()), eu) : 0 !== (e = bt) ? e : e = void 0 === (e = window.event) ? 16 : Jt(e.type) : 1
            }

            function ru(e, t, n, r) {
                if (50 < Ys) throw Ys = 0, Xs = null, Error(o(185));
                yt(e, n, r), 2 & Es && e === As || (e === As && (!(2 & Es) && (Us |= n), 4 === Rs && su(e, Ls)), au(e, r), 1 === n && 0 === Es && !(1 & t.mode) && (Ws = Ye() + 500, Fa && Qa()))
            }

            function au(e, t) {
                var n = e.callbackNode;
                !function (e, t) {
                    for (var n = e.suspendedLanes, r = e.pingedLanes, a = e.expirationTimes, o = e.pendingLanes; 0 < o;) {
                        var i = 31 - it(o), l = 1 << i, s = a[i];
                        -1 === s ? 0 !== (l & n) && 0 === (l & r) || (a[i] = pt(l, t)) : s <= t && (e.expiredLanes |= l), o &= ~l
                    }
                }(e, t);
                var r = ft(e, e === As ? Ls : 0);
                if (0 === r) null !== n && Ke(n), e.callbackNode = null, e.callbackPriority = 0; else if (t = r & -r, e.callbackPriority !== t) {
                    if (null != n && Ke(n), 1 === t) 0 === e.tag ? function (e) {
                        Fa = !0, Ba(e)
                    }(uu.bind(null, e)) : Ba(uu.bind(null, e)), ia((function () {
                        !(6 & Es) && Qa()
                    })), n = null; else {
                        switch (wt(r)) {
                            case 1:
                                n = Ze;
                                break;
                            case 4:
                                n = et;
                                break;
                            case 16:
                            default:
                                n = tt;
                                break;
                            case 536870912:
                                n = rt
                        }
                        n = Au(n, ou.bind(null, e))
                    }
                    e.callbackPriority = t, e.callbackNode = n
                }
            }

            function ou(e, t) {
                if (Zs = -1, eu = 0, 6 & Es) throw Error(o(327));
                var n = e.callbackNode;
                if (_u() && e.callbackNode !== n) return null;
                var r = ft(e, e === As ? Ls : 0);
                if (0 === r) return null;
                if (30 & r || 0 !== (r & e.expiredLanes) || t) t = yu(e, r); else {
                    t = r;
                    var a = Es;
                    Es |= 2;
                    var i = mu();
                    for (As === e && Ls === t || (qs = null, Ws = Ye() + 500, pu(e, t)); ;) try {
                        bu();
                        break
                    } catch (t) {
                        hu(e, t)
                    }
                    ko(), js.current = i, Es = a, null !== Is ? t = 0 : (As = null, Ls = 0, t = Rs)
                }
                if (0 !== t) {
                    if (2 === t && 0 !== (a = ht(e)) && (r = a, t = iu(e, a)), 1 === t) throw n = Ms, pu(e, 0), su(e, r), au(e, Ye()), n;
                    if (6 === t) su(e, r); else {
                        if (a = e.current.alternate, !(30 & r || function (e) {
                            for (var t = e; ;) {
                                if (16384 & t.flags) {
                                    var n = t.updateQueue;
                                    if (null !== n && null !== (n = n.stores)) for (var r = 0; r < n.length; r++) {
                                        var a = n[r], o = a.getSnapshot;
                                        a = a.value;
                                        try {
                                            if (!lr(o(), a)) return !1
                                        } catch (e) {
                                            return !1
                                        }
                                    }
                                }
                                if (n = t.child, 16384 & t.subtreeFlags && null !== n) n.return = t, t = n; else {
                                    if (t === e) break;
                                    for (; null === t.sibling;) {
                                        if (null === t.return || t.return === e) return !0;
                                        t = t.return
                                    }
                                    t.sibling.return = t.return, t = t.sibling
                                }
                            }
                            return !0
                        }(a) || (t = yu(e, r), 2 === t && (i = ht(e), 0 !== i && (r = i, t = iu(e, i))), 1 !== t))) throw n = Ms, pu(e, 0), su(e, r), au(e, Ye()), n;
                        switch (e.finishedWork = a, e.finishedLanes = r, t) {
                            case 0:
                            case 1:
                                throw Error(o(345));
                            case 2:
                            case 5:
                                ku(e, Bs, qs);
                                break;
                            case 3:
                                if (su(e, r), (130023424 & r) === r && 10 < (t = Qs + 500 - Ye())) {
                                    if (0 !== ft(e, 0)) break;
                                    if (((a = e.suspendedLanes) & r) !== r) {
                                        tu(), e.pingedLanes |= e.suspendedLanes & a;
                                        break
                                    }
                                    e.timeoutHandle = ra(ku.bind(null, e, Bs, qs), t);
                                    break
                                }
                                ku(e, Bs, qs);
                                break;
                            case 4:
                                if (su(e, r), (4194240 & r) === r) break;
                                for (t = e.eventTimes, a = -1; 0 < r;) {
                                    var l = 31 - it(r);
                                    i = 1 << l, (l = t[l]) > a && (a = l), r &= ~i
                                }
                                if (r = a, 10 < (r = (120 > (r = Ye() - r) ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Ns(r / 1960)) - r)) {
                                    e.timeoutHandle = ra(ku.bind(null, e, Bs, qs), r);
                                    break
                                }
                                ku(e, Bs, qs);
                                break;
                            default:
                                throw Error(o(329))
                        }
                    }
                }
                return au(e, Ye()), e.callbackNode === n ? ou.bind(null, e) : null
            }

            function iu(e, t) {
                var n = Ds;
                return e.current.memoizedState.isDehydrated && (pu(e, t).flags |= 256), 2 !== (e = yu(e, t)) && (t = Bs, Bs = n, null !== t && lu(t)), e
            }

            function lu(e) {
                null === Bs ? Bs = e : Bs.push.apply(Bs, e)
            }

            function su(e, t) {
                for (t &= ~Fs, t &= ~Us, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t;) {
                    var n = 31 - it(t), r = 1 << n;
                    e[n] = -1, t &= ~r
                }
            }

            function uu(e) {
                if (6 & Es) throw Error(o(327));
                _u();
                var t = ft(e, 0);
                if (!(1 & t)) return au(e, Ye()), null;
                var n = yu(e, t);
                if (0 !== e.tag && 2 === n) {
                    var r = ht(e);
                    0 !== r && (t = r, n = iu(e, r))
                }
                if (1 === n) throw n = Ms, pu(e, 0), su(e, t), au(e, Ye()), n;
                if (6 === n) throw Error(o(345));
                return e.finishedWork = e.current.alternate, e.finishedLanes = t, ku(e, Bs, qs), au(e, Ye()), null
            }

            function cu(e, t) {
                var n = Es;
                Es |= 1;
                try {
                    return e(t)
                } finally {
                    0 === (Es = n) && (Ws = Ye() + 500, Fa && Qa())
                }
            }

            function du(e) {
                null !== Gs && 0 === Gs.tag && !(6 & Es) && _u();
                var t = Es;
                Es |= 1;
                var n = Ps.transition, r = bt;
                try {
                    if (Ps.transition = null, bt = 1, e) return e()
                } finally {
                    bt = r, Ps.transition = n, !(6 & (Es = t)) && Qa()
                }
            }

            function fu() {
                Ts = Os.current, Na(Os)
            }

            function pu(e, t) {
                e.finishedWork = null, e.finishedLanes = 0;
                var n = e.timeoutHandle;
                if (-1 !== n && (e.timeoutHandle = -1, aa(n)), null !== Is) for (n = Is.return; null !== n;) {
                    var r = n;
                    switch (to(r), r.tag) {
                        case 1:
                            null != (r = r.type.childContextTypes) && Ta();
                            break;
                        case 3:
                            oi(), Na(Ea), Na(Pa), di();
                            break;
                        case 5:
                            li(r);
                            break;
                        case 4:
                            oi();
                            break;
                        case 13:
                        case 19:
                            Na(si);
                            break;
                        case 10:
                            _o(r.type._context);
                            break;
                        case 22:
                        case 23:
                            fu()
                    }
                    n = n.return
                }
                if (As = e, Is = e = Ou(e.current, null), Ls = Ts = t, Rs = 0, Ms = null, Fs = Us = zs = 0, Bs = Ds = null, null !== Co) {
                    for (t = 0; t < Co.length; t++) if (null !== (r = (n = Co[t]).interleaved)) {
                        n.interleaved = null;
                        var a = r.next, o = n.pending;
                        if (null !== o) {
                            var i = o.next;
                            o.next = a, r.next = i
                        }
                        n.pending = r
                    }
                    Co = null
                }
                return e
            }

            function hu(e, t) {
                for (; ;) {
                    var n = Is;
                    try {
                        if (ko(), fi.current = il, vi) {
                            for (var r = mi.memoizedState; null !== r;) {
                                var a = r.queue;
                                null !== a && (a.pending = null), r = r.next
                            }
                            vi = !1
                        }
                        if (hi = 0, yi = gi = mi = null, bi = !1, wi = 0, Cs.current = null, null === n || null === n.return) {
                            Rs = 1, Ms = t, Is = null;
                            break
                        }
                        e:{
                            var i = e, l = n.return, s = n, u = t;
                            if (t = Ls, s.flags |= 32768, null !== u && "object" == typeof u && "function" == typeof u.then) {
                                var c = u, d = s, f = d.tag;
                                if (!(1 & d.mode || 0 !== f && 11 !== f && 15 !== f)) {
                                    var p = d.alternate;
                                    p ? (d.updateQueue = p.updateQueue, d.memoizedState = p.memoizedState, d.lanes = p.lanes) : (d.updateQueue = null, d.memoizedState = null)
                                }
                                var h = yl(l);
                                if (null !== h) {
                                    h.flags &= -257, vl(h, l, s, 0, t), 1 & h.mode && gl(i, c, t), u = c;
                                    var m = (t = h).updateQueue;
                                    if (null === m) {
                                        var g = new Set;
                                        g.add(u), t.updateQueue = g
                                    } else m.add(u);
                                    break e
                                }
                                if (!(1 & t)) {
                                    gl(i, c, t), gu();
                                    break e
                                }
                                u = Error(o(426))
                            } else if (ao && 1 & s.mode) {
                                var y = yl(l);
                                if (null !== y) {
                                    !(65536 & y.flags) && (y.flags |= 256), vl(y, l, s, 0, t), mo(cl(u, s));
                                    break e
                                }
                            }
                            i = u = cl(u, s), 4 !== Rs && (Rs = 2), null === Ds ? Ds = [i] : Ds.push(i), i = l;
                            do {
                                switch (i.tag) {
                                    case 3:
                                        i.flags |= 65536, t &= -t, i.lanes |= t, zo(i, hl(0, u, t));
                                        break e;
                                    case 1:
                                        s = u;
                                        var v = i.type, b = i.stateNode;
                                        if (!(128 & i.flags || "function" != typeof v.getDerivedStateFromError && (null === b || "function" != typeof b.componentDidCatch || null !== Hs && Hs.has(b)))) {
                                            i.flags |= 65536, t &= -t, i.lanes |= t, zo(i, ml(i, s, t));
                                            break e
                                        }
                                }
                                i = i.return
                            } while (null !== i)
                        }
                        xu(n)
                    } catch (e) {
                        t = e, Is === n && null !== n && (Is = n = n.return);
                        continue
                    }
                    break
                }
            }

            function mu() {
                var e = js.current;
                return js.current = il, null === e ? il : e
            }

            function gu() {
                0 !== Rs && 3 !== Rs && 2 !== Rs || (Rs = 4), null === As || !(268435455 & zs) && !(268435455 & Us) || su(As, Ls)
            }

            function yu(e, t) {
                var n = Es;
                Es |= 2;
                var r = mu();
                for (As === e && Ls === t || (qs = null, pu(e, t)); ;) try {
                    vu();
                    break
                } catch (t) {
                    hu(e, t)
                }
                if (ko(), Es = n, js.current = r, null !== Is) throw Error(o(261));
                return As = null, Ls = 0, Rs
            }

            function vu() {
                for (; null !== Is;) wu(Is)
            }

            function bu() {
                for (; null !== Is && !Ge();) wu(Is)
            }

            function wu(e) {
                var t = Ss(e.alternate, e, Ts);
                e.memoizedProps = e.pendingProps, null === t ? xu(e) : Is = t, Cs.current = null
            }

            function xu(e) {
                var t = e;
                do {
                    var n = t.alternate;
                    if (e = t.return, 32768 & t.flags) {
                        if (null !== (n = Gl(n, t))) return n.flags &= 32767, void (Is = n);
                        if (null === e) return Rs = 6, void (Is = null);
                        e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null
                    } else if (null !== (n = Kl(n, t, Ts))) return void (Is = n);
                    if (null !== (t = t.sibling)) return void (Is = t);
                    Is = t = e
                } while (null !== t);
                0 === Rs && (Rs = 5)
            }

            function ku(e, t, n) {
                var r = bt, a = Ps.transition;
                try {
                    Ps.transition = null, bt = 1, function (e, t, n, r) {
                        do {
                            _u()
                        } while (null !== Gs);
                        if (6 & Es) throw Error(o(327));
                        n = e.finishedWork;
                        var a = e.finishedLanes;
                        if (null === n) return null;
                        if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(o(177));
                        e.callbackNode = null, e.callbackPriority = 0;
                        var i = n.lanes | n.childLanes;
                        if (function (e, t) {
                            var n = e.pendingLanes & ~t;
                            e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
                            var r = e.eventTimes;
                            for (e = e.expirationTimes; 0 < n;) {
                                var a = 31 - it(n), o = 1 << a;
                                t[a] = 0, r[a] = -1, e[a] = -1, n &= ~o
                            }
                        }(e, i), e === As && (Is = As = null, Ls = 0), !(2064 & n.subtreeFlags) && !(2064 & n.flags) || Ks || (Ks = !0, Au(tt, (function () {
                            return _u(), null
                        }))), i = !!(15990 & n.flags), 15990 & n.subtreeFlags || i) {
                            i = Ps.transition, Ps.transition = null;
                            var l = bt;
                            bt = 1;
                            var s = Es;
                            Es |= 4, Cs.current = null, function (e, t) {
                                if (ea = qt, pr(e = fr())) {
                                    if ("selectionStart" in e) var n = {
                                        start: e.selectionStart,
                                        end: e.selectionEnd
                                    }; else e:{
                                        var r = (n = (n = e.ownerDocument) && n.defaultView || window).getSelection && n.getSelection();
                                        if (r && 0 !== r.rangeCount) {
                                            n = r.anchorNode;
                                            var a = r.anchorOffset, i = r.focusNode;
                                            r = r.focusOffset;
                                            try {
                                                n.nodeType, i.nodeType
                                            } catch (e) {
                                                n = null;
                                                break e
                                            }
                                            var l = 0, s = -1, u = -1, c = 0, d = 0, f = e, p = null;
                                            t:for (; ;) {
                                                for (var h; f !== n || 0 !== a && 3 !== f.nodeType || (s = l + a), f !== i || 0 !== r && 3 !== f.nodeType || (u = l + r), 3 === f.nodeType && (l += f.nodeValue.length), null !== (h = f.firstChild);) p = f, f = h;
                                                for (; ;) {
                                                    if (f === e) break t;
                                                    if (p === n && ++c === a && (s = l), p === i && ++d === r && (u = l), null !== (h = f.nextSibling)) break;
                                                    p = (f = p).parentNode
                                                }
                                                f = h
                                            }
                                            n = -1 === s || -1 === u ? null : {start: s, end: u}
                                        } else n = null
                                    }
                                    n = n || {start: 0, end: 0}
                                } else n = null;
                                for (ta = {
                                    focusedElem: e,
                                    selectionRange: n
                                }, qt = !1, Zl = t; null !== Zl;) if (e = (t = Zl).child, 1028 & t.subtreeFlags && null !== e) e.return = t, Zl = e; else for (; null !== Zl;) {
                                    t = Zl;
                                    try {
                                        var m = t.alternate;
                                        if (1024 & t.flags) switch (t.tag) {
                                            case 0:
                                            case 11:
                                            case 15:
                                            case 5:
                                            case 6:
                                            case 4:
                                            case 17:
                                                break;
                                            case 1:
                                                if (null !== m) {
                                                    var g = m.memoizedProps, y = m.memoizedState, v = t.stateNode,
                                                        b = v.getSnapshotBeforeUpdate(t.elementType === t.type ? g : yo(t.type, g), y);
                                                    v.__reactInternalSnapshotBeforeUpdate = b
                                                }
                                                break;
                                            case 3:
                                                var w = t.stateNode.containerInfo;
                                                1 === w.nodeType ? w.textContent = "" : 9 === w.nodeType && w.documentElement && w.removeChild(w.documentElement);
                                                break;
                                            default:
                                                throw Error(o(163))
                                        }
                                    } catch (e) {
                                        Nu(t, t.return, e)
                                    }
                                    if (null !== (e = t.sibling)) {
                                        e.return = t.return, Zl = e;
                                        break
                                    }
                                    Zl = t.return
                                }
                                m = ns, ns = !1
                            }(e, n), ys(n, e), hr(ta), qt = !!ea, ta = ea = null, e.current = n, bs(n, e, a), Je(), Es = s, bt = l, Ps.transition = i
                        } else e.current = n;
                        if (Ks && (Ks = !1, Gs = e, Js = a), 0 === (i = e.pendingLanes) && (Hs = null), function (e) {
                            if (ot && "function" == typeof ot.onCommitFiberRoot) try {
                                ot.onCommitFiberRoot(at, e, void 0, !(128 & ~e.current.flags))
                            } catch (e) {
                            }
                        }(n.stateNode), au(e, Ye()), null !== t) for (r = e.onRecoverableError, n = 0; n < t.length; n++) r((a = t[n]).value, {
                            componentStack: a.stack,
                            digest: a.digest
                        });
                        if (Vs) throw Vs = !1, e = $s, $s = null, e;
                        !!(1 & Js) && 0 !== e.tag && _u(), 1 & (i = e.pendingLanes) ? e === Xs ? Ys++ : (Ys = 0, Xs = e) : Ys = 0, Qa()
                    }(e, t, n, r)
                } finally {
                    Ps.transition = a, bt = r
                }
                return null
            }

            function _u() {
                if (null !== Gs) {
                    var e = wt(Js), t = Ps.transition, n = bt;
                    try {
                        if (Ps.transition = null, bt = 16 > e ? 16 : e, null === Gs) var r = !1; else {
                            if (e = Gs, Gs = null, Js = 0, 6 & Es) throw Error(o(331));
                            var a = Es;
                            for (Es |= 4, Zl = e.current; null !== Zl;) {
                                var i = Zl, l = i.child;
                                if (16 & Zl.flags) {
                                    var s = i.deletions;
                                    if (null !== s) {
                                        for (var u = 0; u < s.length; u++) {
                                            var c = s[u];
                                            for (Zl = c; null !== Zl;) {
                                                var d = Zl;
                                                switch (d.tag) {
                                                    case 0:
                                                    case 11:
                                                    case 15:
                                                        rs(8, d, i)
                                                }
                                                var f = d.child;
                                                if (null !== f) f.return = d, Zl = f; else for (; null !== Zl;) {
                                                    var p = (d = Zl).sibling, h = d.return;
                                                    if (is(d), d === c) {
                                                        Zl = null;
                                                        break
                                                    }
                                                    if (null !== p) {
                                                        p.return = h, Zl = p;
                                                        break
                                                    }
                                                    Zl = h
                                                }
                                            }
                                        }
                                        var m = i.alternate;
                                        if (null !== m) {
                                            var g = m.child;
                                            if (null !== g) {
                                                m.child = null;
                                                do {
                                                    var y = g.sibling;
                                                    g.sibling = null, g = y
                                                } while (null !== g)
                                            }
                                        }
                                        Zl = i
                                    }
                                }
                                if (2064 & i.subtreeFlags && null !== l) l.return = i, Zl = l; else e:for (; null !== Zl;) {
                                    if (2048 & (i = Zl).flags) switch (i.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            rs(9, i, i.return)
                                    }
                                    var v = i.sibling;
                                    if (null !== v) {
                                        v.return = i.return, Zl = v;
                                        break e
                                    }
                                    Zl = i.return
                                }
                            }
                            var b = e.current;
                            for (Zl = b; null !== Zl;) {
                                var w = (l = Zl).child;
                                if (2064 & l.subtreeFlags && null !== w) w.return = l, Zl = w; else e:for (l = b; null !== Zl;) {
                                    if (2048 & (s = Zl).flags) try {
                                        switch (s.tag) {
                                            case 0:
                                            case 11:
                                            case 15:
                                                as(9, s)
                                        }
                                    } catch (e) {
                                        Nu(s, s.return, e)
                                    }
                                    if (s === l) {
                                        Zl = null;
                                        break e
                                    }
                                    var x = s.sibling;
                                    if (null !== x) {
                                        x.return = s.return, Zl = x;
                                        break e
                                    }
                                    Zl = s.return
                                }
                            }
                            if (Es = a, Qa(), ot && "function" == typeof ot.onPostCommitFiberRoot) try {
                                ot.onPostCommitFiberRoot(at, e)
                            } catch (e) {
                            }
                            r = !0
                        }
                        return r
                    } finally {
                        bt = n, Ps.transition = t
                    }
                }
                return !1
            }

            function Su(e, t, n) {
                e = Ro(e, t = hl(0, t = cl(n, t), 1), 1), t = tu(), null !== e && (yt(e, 1, t), au(e, t))
            }

            function Nu(e, t, n) {
                if (3 === e.tag) Su(e, e, n); else for (; null !== t;) {
                    if (3 === t.tag) {
                        Su(t, e, n);
                        break
                    }
                    if (1 === t.tag) {
                        var r = t.stateNode;
                        if ("function" == typeof t.type.getDerivedStateFromError || "function" == typeof r.componentDidCatch && (null === Hs || !Hs.has(r))) {
                            t = Ro(t, e = ml(t, e = cl(n, e), 1), 1), e = tu(), null !== t && (yt(t, 1, e), au(t, e));
                            break
                        }
                    }
                    t = t.return
                }
            }

            function ju(e, t, n) {
                var r = e.pingCache;
                null !== r && r.delete(t), t = tu(), e.pingedLanes |= e.suspendedLanes & n, As === e && (Ls & n) === n && (4 === Rs || 3 === Rs && (130023424 & Ls) === Ls && 500 > Ye() - Qs ? pu(e, 0) : Fs |= n), au(e, t)
            }

            function Cu(e, t) {
                0 === t && (1 & e.mode ? (t = ct, !(130023424 & (ct <<= 1)) && (ct = 4194304)) : t = 1);
                var n = tu();
                null !== (e = Ao(e, t)) && (yt(e, t, n), au(e, n))
            }

            function Pu(e) {
                var t = e.memoizedState, n = 0;
                null !== t && (n = t.retryLane), Cu(e, n)
            }

            function Eu(e, t) {
                var n = 0;
                switch (e.tag) {
                    case 13:
                        var r = e.stateNode, a = e.memoizedState;
                        null !== a && (n = a.retryLane);
                        break;
                    case 19:
                        r = e.stateNode;
                        break;
                    default:
                        throw Error(o(314))
                }
                null !== r && r.delete(t), Cu(e, n)
            }

            function Au(e, t) {
                return He(e, t)
            }

            function Iu(e, t, n, r) {
                this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null
            }

            function Lu(e, t, n, r) {
                return new Iu(e, t, n, r)
            }

            function Tu(e) {
                return !(!(e = e.prototype) || !e.isReactComponent)
            }

            function Ou(e, t) {
                var n = e.alternate;
                return null === n ? ((n = Lu(e.tag, t, e.key, e.mode)).elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = 14680064 & e.flags, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = null === t ? null : {
                    lanes: t.lanes,
                    firstContext: t.firstContext
                }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n
            }

            function Ru(e, t, n, r, a, i) {
                var l = 2;
                if (r = e, "function" == typeof e) Tu(e) && (l = 1); else if ("string" == typeof e) l = 5; else e:switch (e) {
                    case _:
                        return Mu(n.children, a, i, t);
                    case S:
                        l = 8, a |= 8;
                        break;
                    case N:
                        return (e = Lu(12, n, t, 2 | a)).elementType = N, e.lanes = i, e;
                    case E:
                        return (e = Lu(13, n, t, a)).elementType = E, e.lanes = i, e;
                    case A:
                        return (e = Lu(19, n, t, a)).elementType = A, e.lanes = i, e;
                    case T:
                        return zu(n, a, i, t);
                    default:
                        if ("object" == typeof e && null !== e) switch (e.$$typeof) {
                            case j:
                                l = 10;
                                break e;
                            case C:
                                l = 9;
                                break e;
                            case P:
                                l = 11;
                                break e;
                            case I:
                                l = 14;
                                break e;
                            case L:
                                l = 16, r = null;
                                break e
                        }
                        throw Error(o(130, null == e ? e : typeof e, ""))
                }
                return (t = Lu(l, n, t, a)).elementType = e, t.type = r, t.lanes = i, t
            }

            function Mu(e, t, n, r) {
                return (e = Lu(7, e, r, t)).lanes = n, e
            }

            function zu(e, t, n, r) {
                return (e = Lu(22, e, r, t)).elementType = T, e.lanes = n, e.stateNode = {isHidden: !1}, e
            }

            function Uu(e, t, n) {
                return (e = Lu(6, e, null, t)).lanes = n, e
            }

            function Fu(e, t, n) {
                return (t = Lu(4, null !== e.children ? e.children : [], e.key, t)).lanes = n, t.stateNode = {
                    containerInfo: e.containerInfo,
                    pendingChildren: null,
                    implementation: e.implementation
                }, t
            }

            function Du(e, t, n, r, a) {
                this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = gt(0), this.expirationTimes = gt(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = gt(0), this.identifierPrefix = r, this.onRecoverableError = a, this.mutableSourceEagerHydrationData = null
            }

            function Bu(e, t, n, r, a, o, i, l, s) {
                return e = new Du(e, t, n, l, s), 1 === t ? (t = 1, !0 === o && (t |= 8)) : t = 0, o = Lu(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = {
                    element: r,
                    isDehydrated: n,
                    cache: null,
                    transitions: null,
                    pendingSuspenseBoundaries: null
                }, Lo(o), e
            }

            function Qu(e) {
                if (!e) return Ca;
                e:{
                    if (Qe(e = e._reactInternals) !== e || 1 !== e.tag) throw Error(o(170));
                    var t = e;
                    do {
                        switch (t.tag) {
                            case 3:
                                t = t.stateNode.context;
                                break e;
                            case 1:
                                if (La(t.type)) {
                                    t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                                    break e
                                }
                        }
                        t = t.return
                    } while (null !== t);
                    throw Error(o(171))
                }
                if (1 === e.tag) {
                    var n = e.type;
                    if (La(n)) return Ra(e, n, t)
                }
                return t
            }

            function Wu(e, t, n, r, a, o, i, l, s) {
                return (e = Bu(n, r, !0, e, 0, o, 0, l, s)).context = Qu(null), n = e.current, (o = Oo(r = tu(), a = nu(n))).callback = null != t ? t : null, Ro(n, o, a), e.current.lanes = a, yt(e, a, r), au(e, r), e
            }

            function qu(e, t, n, r) {
                var a = t.current, o = tu(), i = nu(a);
                return n = Qu(n), null === t.context ? t.context = n : t.pendingContext = n, (t = Oo(o, i)).payload = {element: e}, null !== (r = void 0 === r ? null : r) && (t.callback = r), null !== (e = Ro(a, t, i)) && (ru(e, a, i, o), Mo(e, a, i)), i
            }

            function Vu(e) {
                return (e = e.current).child ? (e.child.tag, e.child.stateNode) : null
            }

            function $u(e, t) {
                if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
                    var n = e.retryLane;
                    e.retryLane = 0 !== n && n < t ? n : t
                }
            }

            function Hu(e, t) {
                $u(e, t), (e = e.alternate) && $u(e, t)
            }

            Ss = function (e, t, n) {
                if (null !== e) if (e.memoizedProps !== t.pendingProps || Ea.current) wl = !0; else {
                    if (0 === (e.lanes & n) && !(128 & t.flags)) return wl = !1, function (e, t, n) {
                        switch (t.tag) {
                            case 3:
                                Al(t), ho();
                                break;
                            case 5:
                                ii(t);
                                break;
                            case 1:
                                La(t.type) && Ma(t);
                                break;
                            case 4:
                                ai(t, t.stateNode.containerInfo);
                                break;
                            case 10:
                                var r = t.type._context, a = t.memoizedProps.value;
                                ja(vo, r._currentValue), r._currentValue = a;
                                break;
                            case 13:
                                if (null !== (r = t.memoizedState)) return null !== r.dehydrated ? (ja(si, 1 & si.current), t.flags |= 128, null) : 0 !== (n & t.child.childLanes) ? Ul(e, t, n) : (ja(si, 1 & si.current), null !== (e = Vl(e, t, n)) ? e.sibling : null);
                                ja(si, 1 & si.current);
                                break;
                            case 19:
                                if (r = 0 !== (n & t.childLanes), 128 & e.flags) {
                                    if (r) return Wl(e, t, n);
                                    t.flags |= 128
                                }
                                if (null !== (a = t.memoizedState) && (a.rendering = null, a.tail = null, a.lastEffect = null), ja(si, si.current), r) break;
                                return null;
                            case 22:
                            case 23:
                                return t.lanes = 0, Nl(e, t, n)
                        }
                        return Vl(e, t, n)
                    }(e, t, n);
                    wl = !!(131072 & e.flags)
                } else wl = !1, ao && 1048576 & t.flags && Za(t, $a, t.index);
                switch (t.lanes = 0, t.tag) {
                    case 2:
                        var r = t.type;
                        ql(e, t), e = t.pendingProps;
                        var a = Ia(t, Pa.current);
                        No(t, n), a = Si(null, t, r, e, a, n);
                        var i = Ni();
                        return t.flags |= 1, "object" == typeof a && null !== a && "function" == typeof a.render && void 0 === a.$$typeof ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, La(r) ? (i = !0, Ma(t)) : i = !1, t.memoizedState = null !== a.state && void 0 !== a.state ? a.state : null, Lo(t), a.updater = Qo, t.stateNode = a, a._reactInternals = t, $o(t, r, e, n), t = El(null, t, r, !0, i, n)) : (t.tag = 0, ao && i && eo(t), xl(null, t, a, n), t = t.child), t;
                    case 16:
                        r = t.elementType;
                        e:{
                            switch (ql(e, t), e = t.pendingProps, r = (a = r._init)(r._payload), t.type = r, a = t.tag = function (e) {
                                if ("function" == typeof e) return Tu(e) ? 1 : 0;
                                if (null != e) {
                                    if ((e = e.$$typeof) === P) return 11;
                                    if (e === I) return 14
                                }
                                return 2
                            }(r), e = yo(r, e), a) {
                                case 0:
                                    t = Cl(null, t, r, e, n);
                                    break e;
                                case 1:
                                    t = Pl(null, t, r, e, n);
                                    break e;
                                case 11:
                                    t = kl(null, t, r, e, n);
                                    break e;
                                case 14:
                                    t = _l(null, t, r, yo(r.type, e), n);
                                    break e
                            }
                            throw Error(o(306, r, ""))
                        }
                        return t;
                    case 0:
                        return r = t.type, a = t.pendingProps, Cl(e, t, r, a = t.elementType === r ? a : yo(r, a), n);
                    case 1:
                        return r = t.type, a = t.pendingProps, Pl(e, t, r, a = t.elementType === r ? a : yo(r, a), n);
                    case 3:
                        e:{
                            if (Al(t), null === e) throw Error(o(387));
                            r = t.pendingProps, a = (i = t.memoizedState).element, To(e, t), Uo(t, r, null, n);
                            var l = t.memoizedState;
                            if (r = l.element, i.isDehydrated) {
                                if (i = {
                                    element: r,
                                    isDehydrated: !1,
                                    cache: l.cache,
                                    pendingSuspenseBoundaries: l.pendingSuspenseBoundaries,
                                    transitions: l.transitions
                                }, t.updateQueue.baseState = i, t.memoizedState = i, 256 & t.flags) {
                                    t = Il(e, t, r, n, a = cl(Error(o(423)), t));
                                    break e
                                }
                                if (r !== a) {
                                    t = Il(e, t, r, n, a = cl(Error(o(424)), t));
                                    break e
                                }
                                for (ro = ua(t.stateNode.containerInfo.firstChild), no = t, ao = !0, oo = null, n = Xo(t, null, r, n), t.child = n; n;) n.flags = -3 & n.flags | 4096, n = n.sibling
                            } else {
                                if (ho(), r === a) {
                                    t = Vl(e, t, n);
                                    break e
                                }
                                xl(e, t, r, n)
                            }
                            t = t.child
                        }
                        return t;
                    case 5:
                        return ii(t), null === e && uo(t), r = t.type, a = t.pendingProps, i = null !== e ? e.memoizedProps : null, l = a.children, na(r, a) ? l = null : null !== i && na(r, i) && (t.flags |= 32), jl(e, t), xl(e, t, l, n), t.child;
                    case 6:
                        return null === e && uo(t), null;
                    case 13:
                        return Ul(e, t, n);
                    case 4:
                        return ai(t, t.stateNode.containerInfo), r = t.pendingProps, null === e ? t.child = Yo(t, null, r, n) : xl(e, t, r, n), t.child;
                    case 11:
                        return r = t.type, a = t.pendingProps, kl(e, t, r, a = t.elementType === r ? a : yo(r, a), n);
                    case 7:
                        return xl(e, t, t.pendingProps, n), t.child;
                    case 8:
                    case 12:
                        return xl(e, t, t.pendingProps.children, n), t.child;
                    case 10:
                        e:{
                            if (r = t.type._context, a = t.pendingProps, i = t.memoizedProps, l = a.value, ja(vo, r._currentValue), r._currentValue = l, null !== i) if (lr(i.value, l)) {
                                if (i.children === a.children && !Ea.current) {
                                    t = Vl(e, t, n);
                                    break e
                                }
                            } else for (null !== (i = t.child) && (i.return = t); null !== i;) {
                                var s = i.dependencies;
                                if (null !== s) {
                                    l = i.child;
                                    for (var u = s.firstContext; null !== u;) {
                                        if (u.context === r) {
                                            if (1 === i.tag) {
                                                (u = Oo(-1, n & -n)).tag = 2;
                                                var c = i.updateQueue;
                                                if (null !== c) {
                                                    var d = (c = c.shared).pending;
                                                    null === d ? u.next = u : (u.next = d.next, d.next = u), c.pending = u
                                                }
                                            }
                                            i.lanes |= n, null !== (u = i.alternate) && (u.lanes |= n), So(i.return, n, t), s.lanes |= n;
                                            break
                                        }
                                        u = u.next
                                    }
                                } else if (10 === i.tag) l = i.type === t.type ? null : i.child; else if (18 === i.tag) {
                                    if (null === (l = i.return)) throw Error(o(341));
                                    l.lanes |= n, null !== (s = l.alternate) && (s.lanes |= n), So(l, n, t), l = i.sibling
                                } else l = i.child;
                                if (null !== l) l.return = i; else for (l = i; null !== l;) {
                                    if (l === t) {
                                        l = null;
                                        break
                                    }
                                    if (null !== (i = l.sibling)) {
                                        i.return = l.return, l = i;
                                        break
                                    }
                                    l = l.return
                                }
                                i = l
                            }
                            xl(e, t, a.children, n), t = t.child
                        }
                        return t;
                    case 9:
                        return a = t.type, r = t.pendingProps.children, No(t, n), r = r(a = jo(a)), t.flags |= 1, xl(e, t, r, n), t.child;
                    case 14:
                        return a = yo(r = t.type, t.pendingProps), _l(e, t, r, a = yo(r.type, a), n);
                    case 15:
                        return Sl(e, t, t.type, t.pendingProps, n);
                    case 17:
                        return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : yo(r, a), ql(e, t), t.tag = 1, La(r) ? (e = !0, Ma(t)) : e = !1, No(t, n), qo(t, r, a), $o(t, r, a, n), El(null, t, r, !0, e, n);
                    case 19:
                        return Wl(e, t, n);
                    case 22:
                        return Nl(e, t, n)
                }
                throw Error(o(156, t.tag))
            };
            var Ku = "function" == typeof reportError ? reportError : function (e) {
                console.error(e)
            };

            function Gu(e) {
                this._internalRoot = e
            }

            function Ju(e) {
                this._internalRoot = e
            }

            function Yu(e) {
                return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType)
            }

            function Xu(e) {
                return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType && (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue))
            }

            function Zu() {
            }

            function ec(e, t, n, r, a) {
                var o = n._reactRootContainer;
                if (o) {
                    var i = o;
                    if ("function" == typeof a) {
                        var l = a;
                        a = function () {
                            var e = Vu(i);
                            l.call(e)
                        }
                    }
                    qu(t, i, e, a)
                } else i = function (e, t, n, r, a) {
                    if (a) {
                        if ("function" == typeof r) {
                            var o = r;
                            r = function () {
                                var e = Vu(i);
                                o.call(e)
                            }
                        }
                        var i = Wu(t, r, e, 0, null, !1, 0, "", Zu);
                        return e._reactRootContainer = i, e[ha] = i.current, Qr(8 === e.nodeType ? e.parentNode : e), du(), i
                    }
                    for (; a = e.lastChild;) e.removeChild(a);
                    if ("function" == typeof r) {
                        var l = r;
                        r = function () {
                            var e = Vu(s);
                            l.call(e)
                        }
                    }
                    var s = Bu(e, 0, !1, null, 0, !1, 0, "", Zu);
                    return e._reactRootContainer = s, e[ha] = s.current, Qr(8 === e.nodeType ? e.parentNode : e), du((function () {
                        qu(t, s, n, r)
                    })), s
                }(n, t, e, a, r);
                return Vu(i)
            }

            Ju.prototype.render = Gu.prototype.render = function (e) {
                var t = this._internalRoot;
                if (null === t) throw Error(o(409));
                qu(e, t, null, null)
            }, Ju.prototype.unmount = Gu.prototype.unmount = function () {
                var e = this._internalRoot;
                if (null !== e) {
                    this._internalRoot = null;
                    var t = e.containerInfo;
                    du((function () {
                        qu(null, e, null, null)
                    })), t[ha] = null
                }
            }, Ju.prototype.unstable_scheduleHydration = function (e) {
                if (e) {
                    var t = St();
                    e = {blockedOn: null, target: e, priority: t};
                    for (var n = 0; n < Tt.length && 0 !== t && t < Tt[n].priority; n++) ;
                    Tt.splice(n, 0, e), 0 === n && zt(e)
                }
            }, xt = function (e) {
                switch (e.tag) {
                    case 3:
                        var t = e.stateNode;
                        if (t.current.memoizedState.isDehydrated) {
                            var n = dt(t.pendingLanes);
                            0 !== n && (vt(t, 1 | n), au(t, Ye()), !(6 & Es) && (Ws = Ye() + 500, Qa()))
                        }
                        break;
                    case 13:
                        du((function () {
                            var t = Ao(e, 1);
                            if (null !== t) {
                                var n = tu();
                                ru(t, e, 1, n)
                            }
                        })), Hu(e, 1)
                }
            }, kt = function (e) {
                if (13 === e.tag) {
                    var t = Ao(e, 134217728);
                    null !== t && ru(t, e, 134217728, tu()), Hu(e, 134217728)
                }
            }, _t = function (e) {
                if (13 === e.tag) {
                    var t = nu(e), n = Ao(e, t);
                    null !== n && ru(n, e, t, tu()), Hu(e, t)
                }
            }, St = function () {
                return bt
            }, Nt = function (e, t) {
                var n = bt;
                try {
                    return bt = e, t()
                } finally {
                    bt = n
                }
            }, ke = function (e, t, n) {
                switch (t) {
                    case"input":
                        if (X(e, n), t = n.name, "radio" === n.type && null != t) {
                            for (n = e; n.parentNode;) n = n.parentNode;
                            for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
                                var r = n[t];
                                if (r !== e && r.form === e.form) {
                                    var a = xa(r);
                                    if (!a) throw Error(o(90));
                                    H(r), X(r, a)
                                }
                            }
                        }
                        break;
                    case"textarea":
                        oe(e, n);
                        break;
                    case"select":
                        null != (t = n.value) && ne(e, !!n.multiple, t, !1)
                }
            }, Pe = cu, Ee = du;
            var tc = {usingClientEntryPoint: !1, Events: [ba, wa, xa, je, Ce, cu]},
                nc = {findFiberByHostInstance: va, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom"},
                rc = {
                    bundleType: nc.bundleType,
                    version: nc.version,
                    rendererPackageName: nc.rendererPackageName,
                    rendererConfig: nc.rendererConfig,
                    overrideHookState: null,
                    overrideHookStateDeletePath: null,
                    overrideHookStateRenamePath: null,
                    overrideProps: null,
                    overridePropsDeletePath: null,
                    overridePropsRenamePath: null,
                    setErrorHandler: null,
                    setSuspenseHandler: null,
                    scheduleUpdate: null,
                    currentDispatcherRef: w.ReactCurrentDispatcher,
                    findHostInstanceByFiber: function (e) {
                        return null === (e = Ve(e)) ? null : e.stateNode
                    },
                    findFiberByHostInstance: nc.findFiberByHostInstance || function () {
                        return null
                    },
                    findHostInstancesForRefresh: null,
                    scheduleRefresh: null,
                    scheduleRoot: null,
                    setRefreshHandler: null,
                    getCurrentFiber: null,
                    reconcilerVersion: "18.2.0-next-9e3b772b8-20220608"
                };
            if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
                var ac = __REACT_DEVTOOLS_GLOBAL_HOOK__;
                if (!ac.isDisabled && ac.supportsFiber) try {
                    at = ac.inject(rc), ot = ac
                } catch (ce) {
                }
            }
            t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tc, t.createPortal = function (e, t) {
                var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
                if (!Yu(t)) throw Error(o(200));
                return function (e, t, n) {
                    var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
                    return {
                        $$typeof: k,
                        key: null == r ? null : "" + r,
                        children: e,
                        containerInfo: t,
                        implementation: n
                    }
                }(e, t, null, n)
            }, t.createRoot = function (e, t) {
                if (!Yu(e)) throw Error(o(299));
                var n = !1, r = "", a = Ku;
                return null != t && (!0 === t.unstable_strictMode && (n = !0), void 0 !== t.identifierPrefix && (r = t.identifierPrefix), void 0 !== t.onRecoverableError && (a = t.onRecoverableError)), t = Bu(e, 1, !1, null, 0, n, 0, r, a), e[ha] = t.current, Qr(8 === e.nodeType ? e.parentNode : e), new Gu(t)
            }, t.findDOMNode = function (e) {
                if (null == e) return null;
                if (1 === e.nodeType) return e;
                var t = e._reactInternals;
                if (void 0 === t) {
                    if ("function" == typeof e.render) throw Error(o(188));
                    throw e = Object.keys(e).join(","), Error(o(268, e))
                }
                return null === (e = Ve(t)) ? null : e.stateNode
            }, t.flushSync = function (e) {
                return du(e)
            }, t.hydrate = function (e, t, n) {
                if (!Xu(t)) throw Error(o(200));
                return ec(null, e, t, !0, n)
            }, t.hydrateRoot = function (e, t, n) {
                if (!Yu(e)) throw Error(o(405));
                var r = null != n && n.hydratedSources || null, a = !1, i = "", l = Ku;
                if (null != n && (!0 === n.unstable_strictMode && (a = !0), void 0 !== n.identifierPrefix && (i = n.identifierPrefix), void 0 !== n.onRecoverableError && (l = n.onRecoverableError)), t = Wu(t, null, e, 1, null != n ? n : null, a, 0, i, l), e[ha] = t.current, Qr(e), r) for (e = 0; e < r.length; e++) a = (a = (n = r[e])._getVersion)(n._source), null == t.mutableSourceEagerHydrationData ? t.mutableSourceEagerHydrationData = [n, a] : t.mutableSourceEagerHydrationData.push(n, a);
                return new Ju(t)
            }, t.render = function (e, t, n) {
                if (!Xu(t)) throw Error(o(200));
                return ec(null, e, t, !1, n)
            }, t.unmountComponentAtNode = function (e) {
                if (!Xu(e)) throw Error(o(40));
                return !!e._reactRootContainer && (du((function () {
                    ec(null, null, e, !1, (function () {
                        e._reactRootContainer = null, e[ha] = null
                    }))
                })), !0)
            }, t.unstable_batchedUpdates = cu, t.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
                if (!Xu(n)) throw Error(o(200));
                if (null == e || void 0 === e._reactInternals) throw Error(o(38));
                return ec(e, t, n, !1, r)
            }, t.version = "18.2.0-next-9e3b772b8-20220608"
        }, 557: (e, t, n) => {
            "use strict";
            n.d(t, {A: () => l});
            var r = n(601), a = n.n(r), o = n(314), i = n.n(o)()(a());
            i.push([e.id, "@media (max-width: 639px) {\n    .titlesContainer {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n}\n@media (min-width: 639px) {\n    .titlesContainer {\n        display: grid;\n    }\n}", ""]);
            const l = i
        }, 597: (e, t, n) => {
            "use strict";
            n.d(t, {A: () => l});
            var r = n(601), a = n.n(r), o = n(314), i = n.n(o)()(a());
            i.push([e.id, ".blur-left::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 50px;\n    height: 100%;\n    background: inherit;\n    filter: blur(50px); \n  }\n  *{\n    -ms-overflow-style: none;\n    }\n", ""]);
            const l = i
        }, 601: e => {
            "use strict";
            e.exports = function (e) {
                return e[1]
            }
        }, 622: (e, t, n) => {
            "use strict";
            n.d(t, {t: () => i});
            var r = n(159), a = n(668), o = n(941), i = new (function (e) {
                function t() {
                    var t;
                    return (t = e.call(this) || this).setup = function (e) {
                        var t;
                        if (!o.S$ && (null == (t = window) ? void 0 : t.addEventListener)) {
                            var n = function () {
                                return e()
                            };
                            return window.addEventListener("online", n, !1), window.addEventListener("offline", n, !1), function () {
                                window.removeEventListener("online", n), window.removeEventListener("offline", n)
                            }
                        }
                    }, t
                }

                (0, r.A)(t, e);
                var n = t.prototype;
                return n.onSubscribe = function () {
                    this.cleanup || this.setEventListener(this.setup)
                }, n.onUnsubscribe = function () {
                    var e;
                    this.hasListeners() || (null == (e = this.cleanup) || e.call(this), this.cleanup = void 0)
                }, n.setEventListener = function (e) {
                    var t, n = this;
                    this.setup = e, null == (t = this.cleanup) || t.call(this), this.cleanup = e((function (e) {
                        "boolean" == typeof e ? n.setOnline(e) : n.onOnline()
                    }))
                }, n.setOnline = function (e) {
                    this.online = e, e && this.onOnline()
                }, n.onOnline = function () {
                    this.listeners.forEach((function (e) {
                        e()
                    }))
                }, n.isOnline = function () {
                    return "boolean" == typeof this.online ? this.online : "undefined" == typeof navigator || void 0 === navigator.onLine || navigator.onLine
                }, t
            }(a.Q))
        }, 626: (e, t, n) => {
            "use strict";
            n.d(t, {A: () => l});
            var r = n(601), a = n.n(r), o = n(314), i = n.n(o)()(a());
            i.push([e.id, "/* Enhanced responsive design with better performance */\n.menu {\n    display: flex;\n}\n.toggleMenu {\n    display: none;\n}\n@media (max-width: 913px) {\n    .menu {\n        display: none;\n    }\n    \n    .toggleMenu {\n        display: block;\n    }\n}\n/* Additional utility classes for better performance */\n.ent-header-dropdown-list {\n    will-change: transform, opacity;\n}\n.ent-header-sidemenu {\n    will-change: transform;\n}\n.ent-header-filter-panel {\n    will-change: transform;\n}\n/* Smooth transitions for better UX */\n.ent-header-navitem,\n.ent-header-dropdown {\n    transition: color 0.2s ease, border-color 0.2s ease;\n}", ""]);
            const l = i
        }, 659: e => {
            "use strict";
            var t = {};
            e.exports = function (e, n) {
                var r = function (e) {
                    if (void 0 === t[e]) {
                        var n = document.querySelector(e);
                        if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) try {
                            n = n.contentDocument.head
                        } catch (e) {
                            n = null
                        }
                        t[e] = n
                    }
                    return t[e]
                }(e);
                if (!r) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                r.appendChild(n)
            }
        }, 668: (e, t, n) => {
            "use strict";
            n.d(t, {Q: () => r});
            var r = function () {
                function e() {
                    this.listeners = []
                }

                var t = e.prototype;
                return t.subscribe = function (e) {
                    var t = this, n = e || function () {
                    };
                    return this.listeners.push(n), this.onSubscribe(), function () {
                        t.listeners = t.listeners.filter((function (e) {
                            return e !== n
                        })), t.onUnsubscribe()
                    }
                }, t.hasListeners = function () {
                    return this.listeners.length > 0
                }, t.onSubscribe = function () {
                }, t.onUnsubscribe = function () {
                }, e
            }()
        }, 687: (e, t, n) => {
            "use strict";
            n.d(t, {E: () => y});
            var r = n(168), a = n(941), o = n(159), i = n(428), l = n(690), s = n(281), u = function () {
                function e(e) {
                    this.abortSignalConsumed = !1, this.hadObservers = !1, this.defaultOptions = e.defaultOptions, this.setOptions(e.options), this.observers = [], this.cache = e.cache, this.queryKey = e.queryKey, this.queryHash = e.queryHash, this.initialState = e.state || this.getDefaultState(this.options), this.state = this.initialState, this.meta = e.meta, this.scheduleGc()
                }

                var t = e.prototype;
                return t.setOptions = function (e) {
                    var t;
                    this.options = (0, r.A)({}, this.defaultOptions, e), this.meta = null == e ? void 0 : e.meta, this.cacheTime = Math.max(this.cacheTime || 0, null != (t = this.options.cacheTime) ? t : 3e5)
                }, t.setDefaultOptions = function (e) {
                    this.defaultOptions = e
                }, t.scheduleGc = function () {
                    var e = this;
                    this.clearGcTimeout(), (0, a.gn)(this.cacheTime) && (this.gcTimeout = setTimeout((function () {
                        e.optionalRemove()
                    }), this.cacheTime))
                }, t.clearGcTimeout = function () {
                    this.gcTimeout && (clearTimeout(this.gcTimeout), this.gcTimeout = void 0)
                }, t.optionalRemove = function () {
                    this.observers.length || (this.state.isFetching ? this.hadObservers && this.scheduleGc() : this.cache.remove(this))
                }, t.setData = function (e, t) {
                    var n, r, o = this.state.data, i = (0, a.Zw)(e, o);
                    return (null == (n = (r = this.options).isDataEqual) ? void 0 : n.call(r, o, i)) ? i = o : !1 !== this.options.structuralSharing && (i = (0, a.BH)(o, i)), this.dispatch({
                        data: i,
                        type: "success",
                        dataUpdatedAt: null == t ? void 0 : t.updatedAt
                    }), i
                }, t.setState = function (e, t) {
                    this.dispatch({type: "setState", state: e, setStateOptions: t})
                }, t.cancel = function (e) {
                    var t, n = this.promise;
                    return null == (t = this.retryer) || t.cancel(e), n ? n.then(a.lQ).catch(a.lQ) : Promise.resolve()
                }, t.destroy = function () {
                    this.clearGcTimeout(), this.cancel({silent: !0})
                }, t.reset = function () {
                    this.destroy(), this.setState(this.initialState)
                }, t.isActive = function () {
                    return this.observers.some((function (e) {
                        return !1 !== e.options.enabled
                    }))
                }, t.isFetching = function () {
                    return this.state.isFetching
                }, t.isStale = function () {
                    return this.state.isInvalidated || !this.state.dataUpdatedAt || this.observers.some((function (e) {
                        return e.getCurrentResult().isStale
                    }))
                }, t.isStaleByTime = function (e) {
                    return void 0 === e && (e = 0), this.state.isInvalidated || !this.state.dataUpdatedAt || !(0, a.j3)(this.state.dataUpdatedAt, e)
                }, t.onFocus = function () {
                    var e, t = this.observers.find((function (e) {
                        return e.shouldFetchOnWindowFocus()
                    }));
                    t && t.refetch(), null == (e = this.retryer) || e.continue()
                }, t.onOnline = function () {
                    var e, t = this.observers.find((function (e) {
                        return e.shouldFetchOnReconnect()
                    }));
                    t && t.refetch(), null == (e = this.retryer) || e.continue()
                }, t.addObserver = function (e) {
                    -1 === this.observers.indexOf(e) && (this.observers.push(e), this.hadObservers = !0, this.clearGcTimeout(), this.cache.notify({
                        type: "observerAdded",
                        query: this,
                        observer: e
                    }))
                }, t.removeObserver = function (e) {
                    -1 !== this.observers.indexOf(e) && (this.observers = this.observers.filter((function (t) {
                        return t !== e
                    })), this.observers.length || (this.retryer && (this.retryer.isTransportCancelable || this.abortSignalConsumed ? this.retryer.cancel({revert: !0}) : this.retryer.cancelRetry()), this.cacheTime ? this.scheduleGc() : this.cache.remove(this)), this.cache.notify({
                        type: "observerRemoved",
                        query: this,
                        observer: e
                    }))
                }, t.getObserversCount = function () {
                    return this.observers.length
                }, t.invalidate = function () {
                    this.state.isInvalidated || this.dispatch({type: "invalidate"})
                }, t.fetch = function (e, t) {
                    var n, r, o, i = this;
                    if (this.state.isFetching) if (this.state.dataUpdatedAt && (null == t ? void 0 : t.cancelRefetch)) this.cancel({silent: !0}); else if (this.promise) {
                        var u;
                        return null == (u = this.retryer) || u.continueRetry(), this.promise
                    }
                    if (e && this.setOptions(e), !this.options.queryFn) {
                        var c = this.observers.find((function (e) {
                            return e.options.queryFn
                        }));
                        c && this.setOptions(c.options)
                    }
                    var d = (0, a.HN)(this.queryKey), f = (0, a.jY)(),
                        p = {queryKey: d, pageParam: void 0, meta: this.meta};
                    Object.defineProperty(p, "signal", {
                        enumerable: !0, get: function () {
                            if (f) return i.abortSignalConsumed = !0, f.signal
                        }
                    });
                    var h, m, g = {
                        fetchOptions: t,
                        options: this.options,
                        queryKey: d,
                        state: this.state,
                        fetchFn: function () {
                            return i.options.queryFn ? (i.abortSignalConsumed = !1, i.options.queryFn(p)) : Promise.reject("Missing queryFn")
                        },
                        meta: this.meta
                    };
                    return (null == (n = this.options.behavior) ? void 0 : n.onFetch) && (null == (h = this.options.behavior) || h.onFetch(g)), this.revertState = this.state, this.state.isFetching && this.state.fetchMeta === (null == (r = g.fetchOptions) ? void 0 : r.meta) || this.dispatch({
                        type: "fetch",
                        meta: null == (m = g.fetchOptions) ? void 0 : m.meta
                    }), this.retryer = new s.eJ({
                        fn: g.fetchFn,
                        abort: null == f || null == (o = f.abort) ? void 0 : o.bind(f),
                        onSuccess: function (e) {
                            i.setData(e), null == i.cache.config.onSuccess || i.cache.config.onSuccess(e, i), 0 === i.cacheTime && i.optionalRemove()
                        },
                        onError: function (e) {
                            (0, s.wm)(e) && e.silent || i.dispatch({
                                type: "error",
                                error: e
                            }), (0, s.wm)(e) || (null == i.cache.config.onError || i.cache.config.onError(e, i), (0, l.t)().error(e)), 0 === i.cacheTime && i.optionalRemove()
                        },
                        onFail: function () {
                            i.dispatch({type: "failed"})
                        },
                        onPause: function () {
                            i.dispatch({type: "pause"})
                        },
                        onContinue: function () {
                            i.dispatch({type: "continue"})
                        },
                        retry: g.options.retry,
                        retryDelay: g.options.retryDelay
                    }), this.promise = this.retryer.promise, this.promise
                }, t.dispatch = function (e) {
                    var t = this;
                    this.state = this.reducer(this.state, e), i.j.batch((function () {
                        t.observers.forEach((function (t) {
                            t.onQueryUpdate(e)
                        })), t.cache.notify({query: t, type: "queryUpdated", action: e})
                    }))
                }, t.getDefaultState = function (e) {
                    var t = "function" == typeof e.initialData ? e.initialData() : e.initialData,
                        n = void 0 !== e.initialData ? "function" == typeof e.initialDataUpdatedAt ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt : 0,
                        r = void 0 !== t;
                    return {
                        data: t,
                        dataUpdateCount: 0,
                        dataUpdatedAt: r ? null != n ? n : Date.now() : 0,
                        error: null,
                        errorUpdateCount: 0,
                        errorUpdatedAt: 0,
                        fetchFailureCount: 0,
                        fetchMeta: null,
                        isFetching: !1,
                        isInvalidated: !1,
                        isPaused: !1,
                        status: r ? "success" : "idle"
                    }
                }, t.reducer = function (e, t) {
                    var n, a;
                    switch (t.type) {
                        case"failed":
                            return (0, r.A)({}, e, {fetchFailureCount: e.fetchFailureCount + 1});
                        case"pause":
                            return (0, r.A)({}, e, {isPaused: !0});
                        case"continue":
                            return (0, r.A)({}, e, {isPaused: !1});
                        case"fetch":
                            return (0, r.A)({}, e, {
                                fetchFailureCount: 0,
                                fetchMeta: null != (n = t.meta) ? n : null,
                                isFetching: !0,
                                isPaused: !1
                            }, !e.dataUpdatedAt && {error: null, status: "loading"});
                        case"success":
                            return (0, r.A)({}, e, {
                                data: t.data,
                                dataUpdateCount: e.dataUpdateCount + 1,
                                dataUpdatedAt: null != (a = t.dataUpdatedAt) ? a : Date.now(),
                                error: null,
                                fetchFailureCount: 0,
                                isFetching: !1,
                                isInvalidated: !1,
                                isPaused: !1,
                                status: "success"
                            });
                        case"error":
                            var o = t.error;
                            return (0, s.wm)(o) && o.revert && this.revertState ? (0, r.A)({}, this.revertState) : (0, r.A)({}, e, {
                                error: o,
                                errorUpdateCount: e.errorUpdateCount + 1,
                                errorUpdatedAt: Date.now(),
                                fetchFailureCount: e.fetchFailureCount + 1,
                                isFetching: !1,
                                isPaused: !1,
                                status: "error"
                            });
                        case"invalidate":
                            return (0, r.A)({}, e, {isInvalidated: !0});
                        case"setState":
                            return (0, r.A)({}, e, t.state);
                        default:
                            return e
                    }
                }, e
            }(), c = n(668), d = function (e) {
                function t(t) {
                    var n;
                    return (n = e.call(this) || this).config = t || {}, n.queries = [], n.queriesMap = {}, n
                }

                (0, o.A)(t, e);
                var n = t.prototype;
                return n.build = function (e, t, n) {
                    var r, o = t.queryKey, i = null != (r = t.queryHash) ? r : (0, a.F$)(o, t), l = this.get(i);
                    return l || (l = new u({
                        cache: this,
                        queryKey: o,
                        queryHash: i,
                        options: e.defaultQueryOptions(t),
                        state: n,
                        defaultOptions: e.getQueryDefaults(o),
                        meta: t.meta
                    }), this.add(l)), l
                }, n.add = function (e) {
                    this.queriesMap[e.queryHash] || (this.queriesMap[e.queryHash] = e, this.queries.push(e), this.notify({
                        type: "queryAdded",
                        query: e
                    }))
                }, n.remove = function (e) {
                    var t = this.queriesMap[e.queryHash];
                    t && (e.destroy(), this.queries = this.queries.filter((function (t) {
                        return t !== e
                    })), t === e && delete this.queriesMap[e.queryHash], this.notify({type: "queryRemoved", query: e}))
                }, n.clear = function () {
                    var e = this;
                    i.j.batch((function () {
                        e.queries.forEach((function (t) {
                            e.remove(t)
                        }))
                    }))
                }, n.get = function (e) {
                    return this.queriesMap[e]
                }, n.getAll = function () {
                    return this.queries
                }, n.find = function (e, t) {
                    var n = (0, a.b_)(e, t)[0];
                    return void 0 === n.exact && (n.exact = !0), this.queries.find((function (e) {
                        return (0, a.MK)(n, e)
                    }))
                }, n.findAll = function (e, t) {
                    var n = (0, a.b_)(e, t)[0];
                    return Object.keys(n).length > 0 ? this.queries.filter((function (e) {
                        return (0, a.MK)(n, e)
                    })) : this.queries
                }, n.notify = function (e) {
                    var t = this;
                    i.j.batch((function () {
                        t.listeners.forEach((function (t) {
                            t(e)
                        }))
                    }))
                }, n.onFocus = function () {
                    var e = this;
                    i.j.batch((function () {
                        e.queries.forEach((function (e) {
                            e.onFocus()
                        }))
                    }))
                }, n.onOnline = function () {
                    var e = this;
                    i.j.batch((function () {
                        e.queries.forEach((function (e) {
                            e.onOnline()
                        }))
                    }))
                }, t
            }(c.Q), f = function () {
                function e(e) {
                    this.options = (0, r.A)({}, e.defaultOptions, e.options), this.mutationId = e.mutationId, this.mutationCache = e.mutationCache, this.observers = [], this.state = e.state || {
                        context: void 0,
                        data: void 0,
                        error: null,
                        failureCount: 0,
                        isPaused: !1,
                        status: "idle",
                        variables: void 0
                    }, this.meta = e.meta
                }

                var t = e.prototype;
                return t.setState = function (e) {
                    this.dispatch({type: "setState", state: e})
                }, t.addObserver = function (e) {
                    -1 === this.observers.indexOf(e) && this.observers.push(e)
                }, t.removeObserver = function (e) {
                    this.observers = this.observers.filter((function (t) {
                        return t !== e
                    }))
                }, t.cancel = function () {
                    return this.retryer ? (this.retryer.cancel(), this.retryer.promise.then(a.lQ).catch(a.lQ)) : Promise.resolve()
                }, t.continue = function () {
                    return this.retryer ? (this.retryer.continue(), this.retryer.promise) : this.execute()
                }, t.execute = function () {
                    var e, t = this, n = "loading" === this.state.status, r = Promise.resolve();
                    return n || (this.dispatch({
                        type: "loading",
                        variables: this.options.variables
                    }), r = r.then((function () {
                        null == t.mutationCache.config.onMutate || t.mutationCache.config.onMutate(t.state.variables, t)
                    })).then((function () {
                        return null == t.options.onMutate ? void 0 : t.options.onMutate(t.state.variables)
                    })).then((function (e) {
                        e !== t.state.context && t.dispatch({type: "loading", context: e, variables: t.state.variables})
                    }))), r.then((function () {
                        return t.executeMutation()
                    })).then((function (n) {
                        e = n, null == t.mutationCache.config.onSuccess || t.mutationCache.config.onSuccess(e, t.state.variables, t.state.context, t)
                    })).then((function () {
                        return null == t.options.onSuccess ? void 0 : t.options.onSuccess(e, t.state.variables, t.state.context)
                    })).then((function () {
                        return null == t.options.onSettled ? void 0 : t.options.onSettled(e, null, t.state.variables, t.state.context)
                    })).then((function () {
                        return t.dispatch({type: "success", data: e}), e
                    })).catch((function (e) {
                        return null == t.mutationCache.config.onError || t.mutationCache.config.onError(e, t.state.variables, t.state.context, t), (0, l.t)().error(e), Promise.resolve().then((function () {
                            return null == t.options.onError ? void 0 : t.options.onError(e, t.state.variables, t.state.context)
                        })).then((function () {
                            return null == t.options.onSettled ? void 0 : t.options.onSettled(void 0, e, t.state.variables, t.state.context)
                        })).then((function () {
                            throw t.dispatch({type: "error", error: e}), e
                        }))
                    }))
                }, t.executeMutation = function () {
                    var e, t = this;
                    return this.retryer = new s.eJ({
                        fn: function () {
                            return t.options.mutationFn ? t.options.mutationFn(t.state.variables) : Promise.reject("No mutationFn found")
                        }, onFail: function () {
                            t.dispatch({type: "failed"})
                        }, onPause: function () {
                            t.dispatch({type: "pause"})
                        }, onContinue: function () {
                            t.dispatch({type: "continue"})
                        }, retry: null != (e = this.options.retry) ? e : 0, retryDelay: this.options.retryDelay
                    }), this.retryer.promise
                }, t.dispatch = function (e) {
                    var t = this;
                    this.state = function (e, t) {
                        switch (t.type) {
                            case"failed":
                                return (0, r.A)({}, e, {failureCount: e.failureCount + 1});
                            case"pause":
                                return (0, r.A)({}, e, {isPaused: !0});
                            case"continue":
                                return (0, r.A)({}, e, {isPaused: !1});
                            case"loading":
                                return (0, r.A)({}, e, {
                                    context: t.context,
                                    data: void 0,
                                    error: null,
                                    isPaused: !1,
                                    status: "loading",
                                    variables: t.variables
                                });
                            case"success":
                                return (0, r.A)({}, e, {data: t.data, error: null, status: "success", isPaused: !1});
                            case"error":
                                return (0, r.A)({}, e, {
                                    data: void 0,
                                    error: t.error,
                                    failureCount: e.failureCount + 1,
                                    isPaused: !1,
                                    status: "error"
                                });
                            case"setState":
                                return (0, r.A)({}, e, t.state);
                            default:
                                return e
                        }
                    }(this.state, e), i.j.batch((function () {
                        t.observers.forEach((function (t) {
                            t.onMutationUpdate(e)
                        })), t.mutationCache.notify(t)
                    }))
                }, e
            }(), p = function (e) {
                function t(t) {
                    var n;
                    return (n = e.call(this) || this).config = t || {}, n.mutations = [], n.mutationId = 0, n
                }

                (0, o.A)(t, e);
                var n = t.prototype;
                return n.build = function (e, t, n) {
                    var r = new f({
                        mutationCache: this,
                        mutationId: ++this.mutationId,
                        options: e.defaultMutationOptions(t),
                        state: n,
                        defaultOptions: t.mutationKey ? e.getMutationDefaults(t.mutationKey) : void 0,
                        meta: t.meta
                    });
                    return this.add(r), r
                }, n.add = function (e) {
                    this.mutations.push(e), this.notify(e)
                }, n.remove = function (e) {
                    this.mutations = this.mutations.filter((function (t) {
                        return t !== e
                    })), e.cancel(), this.notify(e)
                }, n.clear = function () {
                    var e = this;
                    i.j.batch((function () {
                        e.mutations.forEach((function (t) {
                            e.remove(t)
                        }))
                    }))
                }, n.getAll = function () {
                    return this.mutations
                }, n.find = function (e) {
                    return void 0 === e.exact && (e.exact = !0), this.mutations.find((function (t) {
                        return (0, a.nJ)(e, t)
                    }))
                }, n.findAll = function (e) {
                    return this.mutations.filter((function (t) {
                        return (0, a.nJ)(e, t)
                    }))
                }, n.notify = function (e) {
                    var t = this;
                    i.j.batch((function () {
                        t.listeners.forEach((function (t) {
                            t(e)
                        }))
                    }))
                }, n.onFocus = function () {
                    this.resumePausedMutations()
                }, n.onOnline = function () {
                    this.resumePausedMutations()
                }, n.resumePausedMutations = function () {
                    var e = this.mutations.filter((function (e) {
                        return e.state.isPaused
                    }));
                    return i.j.batch((function () {
                        return e.reduce((function (e, t) {
                            return e.then((function () {
                                return t.continue().catch(a.lQ)
                            }))
                        }), Promise.resolve())
                    }))
                }, t
            }(c.Q), h = n(289), m = n(622);

            function g(e, t) {
                return null == e.getNextPageParam ? void 0 : e.getNextPageParam(t[t.length - 1], t)
            }

            var y = function () {
                function e(e) {
                    void 0 === e && (e = {}), this.queryCache = e.queryCache || new d, this.mutationCache = e.mutationCache || new p, this.defaultOptions = e.defaultOptions || {}, this.queryDefaults = [], this.mutationDefaults = []
                }

                var t = e.prototype;
                return t.mount = function () {
                    var e = this;
                    this.unsubscribeFocus = h.m.subscribe((function () {
                        h.m.isFocused() && m.t.isOnline() && (e.mutationCache.onFocus(), e.queryCache.onFocus())
                    })), this.unsubscribeOnline = m.t.subscribe((function () {
                        h.m.isFocused() && m.t.isOnline() && (e.mutationCache.onOnline(), e.queryCache.onOnline())
                    }))
                }, t.unmount = function () {
                    var e, t;
                    null == (e = this.unsubscribeFocus) || e.call(this), null == (t = this.unsubscribeOnline) || t.call(this)
                }, t.isFetching = function (e, t) {
                    var n = (0, a.b_)(e, t)[0];
                    return n.fetching = !0, this.queryCache.findAll(n).length
                }, t.isMutating = function (e) {
                    return this.mutationCache.findAll((0, r.A)({}, e, {fetching: !0})).length
                }, t.getQueryData = function (e, t) {
                    var n;
                    return null == (n = this.queryCache.find(e, t)) ? void 0 : n.state.data
                }, t.getQueriesData = function (e) {
                    return this.getQueryCache().findAll(e).map((function (e) {
                        return [e.queryKey, e.state.data]
                    }))
                }, t.setQueryData = function (e, t, n) {
                    var r = (0, a.vh)(e), o = this.defaultQueryOptions(r);
                    return this.queryCache.build(this, o).setData(t, n)
                }, t.setQueriesData = function (e, t, n) {
                    var r = this;
                    return i.j.batch((function () {
                        return r.getQueryCache().findAll(e).map((function (e) {
                            var a = e.queryKey;
                            return [a, r.setQueryData(a, t, n)]
                        }))
                    }))
                }, t.getQueryState = function (e, t) {
                    var n;
                    return null == (n = this.queryCache.find(e, t)) ? void 0 : n.state
                }, t.removeQueries = function (e, t) {
                    var n = (0, a.b_)(e, t)[0], r = this.queryCache;
                    i.j.batch((function () {
                        r.findAll(n).forEach((function (e) {
                            r.remove(e)
                        }))
                    }))
                }, t.resetQueries = function (e, t, n) {
                    var o = this, l = (0, a.b_)(e, t, n), s = l[0], u = l[1], c = this.queryCache,
                        d = (0, r.A)({}, s, {active: !0});
                    return i.j.batch((function () {
                        return c.findAll(s).forEach((function (e) {
                            e.reset()
                        })), o.refetchQueries(d, u)
                    }))
                }, t.cancelQueries = function (e, t, n) {
                    var r = this, o = (0, a.b_)(e, t, n), l = o[0], s = o[1], u = void 0 === s ? {} : s;
                    void 0 === u.revert && (u.revert = !0);
                    var c = i.j.batch((function () {
                        return r.queryCache.findAll(l).map((function (e) {
                            return e.cancel(u)
                        }))
                    }));
                    return Promise.all(c).then(a.lQ).catch(a.lQ)
                }, t.invalidateQueries = function (e, t, n) {
                    var o, l, s, u = this, c = (0, a.b_)(e, t, n), d = c[0], f = c[1], p = (0, r.A)({}, d, {
                        active: null == (o = null != (l = d.refetchActive) ? l : d.active) || o,
                        inactive: null != (s = d.refetchInactive) && s
                    });
                    return i.j.batch((function () {
                        return u.queryCache.findAll(d).forEach((function (e) {
                            e.invalidate()
                        })), u.refetchQueries(p, f)
                    }))
                }, t.refetchQueries = function (e, t, n) {
                    var o = this, l = (0, a.b_)(e, t, n), s = l[0], u = l[1], c = i.j.batch((function () {
                        return o.queryCache.findAll(s).map((function (e) {
                            return e.fetch(void 0, (0, r.A)({}, u, {meta: {refetchPage: null == s ? void 0 : s.refetchPage}}))
                        }))
                    })), d = Promise.all(c).then(a.lQ);
                    return (null == u ? void 0 : u.throwOnError) || (d = d.catch(a.lQ)), d
                }, t.fetchQuery = function (e, t, n) {
                    var r = (0, a.vh)(e, t, n), o = this.defaultQueryOptions(r);
                    void 0 === o.retry && (o.retry = !1);
                    var i = this.queryCache.build(this, o);
                    return i.isStaleByTime(o.staleTime) ? i.fetch(o) : Promise.resolve(i.state.data)
                }, t.prefetchQuery = function (e, t, n) {
                    return this.fetchQuery(e, t, n).then(a.lQ).catch(a.lQ)
                }, t.fetchInfiniteQuery = function (e, t, n) {
                    var r = (0, a.vh)(e, t, n);
                    return r.behavior = {
                        onFetch: function (e) {
                            e.fetchFn = function () {
                                var t, n, r, o, i, l, u, c, d,
                                    f = null == (t = e.fetchOptions) || null == (n = t.meta) ? void 0 : n.refetchPage,
                                    p = null == (r = e.fetchOptions) || null == (o = r.meta) ? void 0 : o.fetchMore,
                                    h = null == p ? void 0 : p.pageParam,
                                    m = "forward" === (null == p ? void 0 : p.direction),
                                    y = "backward" === (null == p ? void 0 : p.direction),
                                    v = (null == (i = e.state.data) ? void 0 : i.pages) || [],
                                    b = (null == (l = e.state.data) ? void 0 : l.pageParams) || [], w = (0, a.jY)(),
                                    x = null == w ? void 0 : w.signal, k = b, _ = !1,
                                    S = e.options.queryFn || function () {
                                        return Promise.reject("Missing queryFn")
                                    }, N = function (e, t, n, r) {
                                        return k = r ? [t].concat(k) : [].concat(k, [t]), r ? [n].concat(e) : [].concat(e, [n])
                                    }, j = function (t, n, r, a) {
                                        if (_) return Promise.reject("Cancelled");
                                        if (void 0 === r && !n && t.length) return Promise.resolve(t);
                                        var o = {queryKey: e.queryKey, signal: x, pageParam: r, meta: e.meta}, i = S(o),
                                            l = Promise.resolve(i).then((function (e) {
                                                return N(t, r, e, a)
                                            }));
                                        return (0, s.dd)(i) && (l.cancel = i.cancel), l
                                    };
                                if (v.length) if (m) {
                                    var C = void 0 !== h, P = C ? h : g(e.options, v);
                                    u = j(v, C, P)
                                } else if (y) {
                                    var E = void 0 !== h,
                                        A = E ? h : (c = e.options, d = v, null == c.getPreviousPageParam ? void 0 : c.getPreviousPageParam(d[0], d));
                                    u = j(v, E, A, !0)
                                } else !function () {
                                    k = [];
                                    var t = void 0 === e.options.getNextPageParam, n = !f || !v[0] || f(v[0], 0, v);
                                    u = n ? j([], t, b[0]) : Promise.resolve(N([], b[0], v[0]));
                                    for (var r = function (n) {
                                        u = u.then((function (r) {
                                            if (!f || !v[n] || f(v[n], n, v)) {
                                                var a = t ? b[n] : g(e.options, r);
                                                return j(r, t, a)
                                            }
                                            return Promise.resolve(N(r, b[n], v[n]))
                                        }))
                                    }, a = 1; a < v.length; a++) r(a)
                                }(); else u = j([]);
                                var I = u.then((function (e) {
                                    return {pages: e, pageParams: k}
                                }));
                                return I.cancel = function () {
                                    _ = !0, null == w || w.abort(), (0, s.dd)(u) && u.cancel()
                                }, I
                            }
                        }
                    }, this.fetchQuery(r)
                }, t.prefetchInfiniteQuery = function (e, t, n) {
                    return this.fetchInfiniteQuery(e, t, n).then(a.lQ).catch(a.lQ)
                }, t.cancelMutations = function () {
                    var e = this, t = i.j.batch((function () {
                        return e.mutationCache.getAll().map((function (e) {
                            return e.cancel()
                        }))
                    }));
                    return Promise.all(t).then(a.lQ).catch(a.lQ)
                }, t.resumePausedMutations = function () {
                    return this.getMutationCache().resumePausedMutations()
                }, t.executeMutation = function (e) {
                    return this.mutationCache.build(this, e).execute()
                }, t.getQueryCache = function () {
                    return this.queryCache
                }, t.getMutationCache = function () {
                    return this.mutationCache
                }, t.getDefaultOptions = function () {
                    return this.defaultOptions
                }, t.setDefaultOptions = function (e) {
                    this.defaultOptions = e
                }, t.setQueryDefaults = function (e, t) {
                    var n = this.queryDefaults.find((function (t) {
                        return (0, a.Od)(e) === (0, a.Od)(t.queryKey)
                    }));
                    n ? n.defaultOptions = t : this.queryDefaults.push({queryKey: e, defaultOptions: t})
                }, t.getQueryDefaults = function (e) {
                    var t;
                    return e ? null == (t = this.queryDefaults.find((function (t) {
                        return (0, a.Cp)(e, t.queryKey)
                    }))) ? void 0 : t.defaultOptions : void 0
                }, t.setMutationDefaults = function (e, t) {
                    var n = this.mutationDefaults.find((function (t) {
                        return (0, a.Od)(e) === (0, a.Od)(t.mutationKey)
                    }));
                    n ? n.defaultOptions = t : this.mutationDefaults.push({mutationKey: e, defaultOptions: t})
                }, t.getMutationDefaults = function (e) {
                    var t;
                    return e ? null == (t = this.mutationDefaults.find((function (t) {
                        return (0, a.Cp)(e, t.mutationKey)
                    }))) ? void 0 : t.defaultOptions : void 0
                }, t.defaultQueryOptions = function (e) {
                    if (null == e ? void 0 : e._defaulted) return e;
                    var t = (0, r.A)({}, this.defaultOptions.queries, this.getQueryDefaults(null == e ? void 0 : e.queryKey), e, {_defaulted: !0});
                    return !t.queryHash && t.queryKey && (t.queryHash = (0, a.F$)(t.queryKey, t)), t
                }, t.defaultQueryObserverOptions = function (e) {
                    return this.defaultQueryOptions(e)
                }, t.defaultMutationOptions = function (e) {
                    return (null == e ? void 0 : e._defaulted) ? e : (0, r.A)({}, this.defaultOptions.mutations, this.getMutationDefaults(null == e ? void 0 : e.mutationKey), e, {_defaulted: !0})
                }, t.clear = function () {
                    this.queryCache.clear(), this.mutationCache.clear()
                }, e
            }()
        }, 690: (e, t, n) => {
            "use strict";
            n.d(t, {B: () => o, t: () => a});
            var r = console;

            function a() {
                return r
            }

            function o(e) {
                r = e
            }
        }, 778: e => {
            "use strict";
            e.exports = function (e) {
                var t = document.createElement("style");
                return e.setAttributes(t, e.attributes), e.insert(t, e.options), t
            }
        }, 825: e => {
            "use strict";
            e.exports = function (e) {
                if ("undefined" == typeof document) return {
                    update: function () {
                    }, remove: function () {
                    }
                };
                var t = e.insertStyleElement(e);
                return {
                    update: function (n) {
                        !function (e, t, n) {
                            var r = "";
                            n.supports && (r += "@supports (".concat(n.supports, ") {")), n.media && (r += "@media ".concat(n.media, " {"));
                            var a = void 0 !== n.layer;
                            a && (r += "@layer".concat(n.layer.length > 0 ? " ".concat(n.layer) : "", " {")), r += n.css, a && (r += "}"), n.media && (r += "}"), n.supports && (r += "}");
                            var o = n.sourceMap;
                            o && "undefined" != typeof btoa && (r += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o)))), " */")), t.styleTagTransform(r, e, t.options)
                        }(t, e, n)
                    }, remove: function () {
                        !function (e) {
                            if (null === e.parentNode) return !1;
                            e.parentNode.removeChild(e)
                        }(t)
                    }
                }
            }
        }, 848: (e, t, n) => {
            "use strict";
            e.exports = n(20)
        }, 941: (e, t, n) => {
            "use strict";
            n.d(t, {
                BH: () => v,
                Cp: () => g,
                F$: () => h,
                G6: () => S,
                HN: () => s,
                MK: () => f,
                Od: () => m,
                S$: () => a,
                Zw: () => i,
                b_: () => d,
                f8: () => b,
                gn: () => l,
                j3: () => u,
                jY: () => N,
                lQ: () => o,
                nJ: () => p,
                vh: () => c,
                yy: () => _
            });
            var r = n(168), a = "undefined" == typeof window;

            function o() {
            }

            function i(e, t) {
                return "function" == typeof e ? e(t) : e
            }

            function l(e) {
                return "number" == typeof e && e >= 0 && e !== 1 / 0
            }

            function s(e) {
                return Array.isArray(e) ? e : [e]
            }

            function u(e, t) {
                return Math.max(e + (t || 0) - Date.now(), 0)
            }

            function c(e, t, n) {
                return k(e) ? "function" == typeof t ? (0, r.A)({}, n, {
                    queryKey: e,
                    queryFn: t
                }) : (0, r.A)({}, t, {queryKey: e}) : e
            }

            function d(e, t, n) {
                return k(e) ? [(0, r.A)({}, t, {queryKey: e}), n] : [e || {}, t]
            }

            function f(e, t) {
                var n = e.active, r = e.exact, a = e.fetching, o = e.inactive, i = e.predicate, l = e.queryKey,
                    s = e.stale;
                if (k(l)) if (r) {
                    if (t.queryHash !== h(l, t.options)) return !1
                } else if (!g(t.queryKey, l)) return !1;
                var u = function (e, t) {
                    return !0 === e && !0 === t || null == e && null == t ? "all" : !1 === e && !1 === t ? "none" : (null != e ? e : !t) ? "active" : "inactive"
                }(n, o);
                if ("none" === u) return !1;
                if ("all" !== u) {
                    var c = t.isActive();
                    if ("active" === u && !c) return !1;
                    if ("inactive" === u && c) return !1
                }
                return !("boolean" == typeof s && t.isStale() !== s || "boolean" == typeof a && t.isFetching() !== a || i && !i(t))
            }

            function p(e, t) {
                var n = e.exact, r = e.fetching, a = e.predicate, o = e.mutationKey;
                if (k(o)) {
                    if (!t.options.mutationKey) return !1;
                    if (n) {
                        if (m(t.options.mutationKey) !== m(o)) return !1
                    } else if (!g(t.options.mutationKey, o)) return !1
                }
                return !("boolean" == typeof r && "loading" === t.state.status !== r || a && !a(t))
            }

            function h(e, t) {
                return ((null == t ? void 0 : t.queryKeyHashFn) || m)(e)
            }

            function m(e) {
                var t;
                return t = s(e), JSON.stringify(t, (function (e, t) {
                    return w(t) ? Object.keys(t).sort().reduce((function (e, n) {
                        return e[n] = t[n], e
                    }), {}) : t
                }))
            }

            function g(e, t) {
                return y(s(e), s(t))
            }

            function y(e, t) {
                return e === t || typeof e == typeof t && !(!e || !t || "object" != typeof e || "object" != typeof t) && !Object.keys(t).some((function (n) {
                    return !y(e[n], t[n])
                }))
            }

            function v(e, t) {
                if (e === t) return e;
                var n = Array.isArray(e) && Array.isArray(t);
                if (n || w(e) && w(t)) {
                    for (var r = n ? e.length : Object.keys(e).length, a = n ? t : Object.keys(t), o = a.length, i = n ? [] : {}, l = 0, s = 0; s < o; s++) {
                        var u = n ? s : a[s];
                        i[u] = v(e[u], t[u]), i[u] === e[u] && l++
                    }
                    return r === o && l === r ? e : i
                }
                return t
            }

            function b(e, t) {
                if (e && !t || t && !e) return !1;
                for (var n in e) if (e[n] !== t[n]) return !1;
                return !0
            }

            function w(e) {
                if (!x(e)) return !1;
                var t = e.constructor;
                if (void 0 === t) return !0;
                var n = t.prototype;
                return !!x(n) && !!n.hasOwnProperty("isPrototypeOf")
            }

            function x(e) {
                return "[object Object]" === Object.prototype.toString.call(e)
            }

            function k(e) {
                return "string" == typeof e || Array.isArray(e)
            }

            function _(e) {
                return new Promise((function (t) {
                    setTimeout(t, e)
                }))
            }

            function S(e) {
                Promise.resolve().then(e).catch((function (e) {
                    return setTimeout((function () {
                        throw e
                    }))
                }))
            }

            function N() {
                if ("function" == typeof AbortController) return new AbortController
            }
        }, 942: (e, t, n) => {
            "use strict";
            n.d(t, {
                QueryClient: () => r.QueryClient,
                QueryClientProvider: () => a.QueryClientProvider,
                useQuery: () => a.useQuery,
                useQueryClient: () => a.useQueryClient
            });
            var r = n(468);
            n.o(r, "QueryClientProvider") && n.d(t, {
                QueryClientProvider: function () {
                    return r.QueryClientProvider
                }
            }), n.o(r, "useQuery") && n.d(t, {
                useQuery: function () {
                    return r.useQuery
                }
            }), n.o(r, "useQueryClient") && n.d(t, {
                useQueryClient: function () {
                    return r.useQueryClient
                }
            });
            var a = n(45)
        }, 961: (e, t, n) => {
            "use strict";
            !function e() {
                if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) try {
                    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)
                } catch (e) {
                    console.error(e)
                }
            }(), e.exports = n(551)
        }, 972: (e, t, n) => {
            "use strict";
            n.d(t, {A: () => l});
            var r = n(601), a = n.n(r), o = n(314), i = n.n(o)()(a());
            i.push([e.id, "/*\n! tailwindcss v3.4.0 | MIT License | https://tailwindcss.com\n*//*\n1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)\n*/\n\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: #e5e7eb; /* 2 */\n}\n\n::before,\n::after {\n  --tw-content: '';\n}\n\n/*\n1. Use a consistent sensible line-height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n3. Use a more readable tab size.\n4. Use the user's configured `sans` font-family by default.\n5. Use the user's configured `sans` font-feature-settings by default.\n6. Use the user's configured `sans` font-variation-settings by default.\n7. Disable tap highlights on iOS\n*/\n\nhtml,\n:host {\n  line-height: 1.5; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */ /* 3 */\n  tab-size: 4; /* 3 */\n  font-family: ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"; /* 4 */\n  font-feature-settings: normal; /* 5 */\n  font-variation-settings: normal; /* 6 */\n  -webkit-tap-highlight-color: transparent; /* 7 */\n}\n\n/*\n1. Remove the margin in all browsers.\n2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.\n*/\n\nbody {\n  margin: 0; /* 1 */\n  line-height: inherit; /* 2 */\n}\n\n/*\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n3. Ensure horizontal rules are visible by default.\n*/\n\nhr {\n  height: 0; /* 1 */\n  color: inherit; /* 2 */\n  border-top-width: 1px; /* 3 */\n}\n\n/*\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n}\n\n/*\nRemove the default font size and weight for headings.\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\nReset links to optimize for opt-in styling instead of opt-out.\n*/\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/*\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n1. Use the user's configured `mono` font-family by default.\n2. Use the user's configured `mono` font-feature-settings by default.\n3. Use the user's configured `mono` font-variation-settings by default.\n4. Correct the odd `em` font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; /* 1 */\n  font-feature-settings: normal; /* 2 */\n  font-variation-settings: normal; /* 3 */\n  font-size: 1em; /* 4 */\n}\n\n/*\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/*\nPrevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n3. Remove gaps between table borders by default.\n*/\n\ntable {\n  text-indent: 0; /* 1 */\n  border-color: inherit; /* 2 */\n  border-collapse: collapse; /* 3 */\n}\n\n/*\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n3. Remove default padding in all browsers.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-feature-settings: inherit; /* 1 */\n  font-variation-settings: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  font-weight: inherit; /* 1 */\n  line-height: inherit; /* 1 */\n  color: inherit; /* 1 */\n  margin: 0; /* 2 */\n  padding: 0; /* 3 */\n}\n\n/*\nRemove the inheritance of text transform in Edge and Firefox.\n*/\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Remove default button styles.\n*/\n\nbutton,\n[type='button'],\n[type='reset'],\n[type='submit'] {\n  -webkit-appearance: button; /* 1 */\n  background-color: transparent; /* 2 */\n  background-image: none; /* 2 */\n}\n\n/*\nUse the modern Firefox focus style for all focusable elements.\n*/\n\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\nRemove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/*\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type='search'] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/*\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to `inherit` in Safari.\n*/\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/*\nRemoves the default spacing and border for appropriate elements.\n*/\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nlegend {\n  padding: 0;\n}\n\nol,\nul,\nmenu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/*\nReset default styling for dialogs.\n*/\ndialog {\n  padding: 0;\n}\n\n/*\nPrevent resizing textareas horizontally by default.\n*/\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n2. Set the default placeholder color to the user's configured gray 400 color.\n*/\n\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\n/*\nSet the default cursor for buttons.\n*/\n\nbutton,\n[role=\"button\"] {\n  cursor: pointer;\n}\n\n/*\nMake sure disabled buttons don't get the pointer cursor.\n*/\n:disabled {\n  cursor: default;\n}\n\n/*\n1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n   This can trigger a poorly considered lint error in some tools but is included by design.\n*/\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block; /* 1 */\n  vertical-align: middle; /* 2 */\n}\n\n/*\nConstrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n/* Make elements with the HTML hidden attribute stay hidden by default */\n[hidden] {\n  display: none;\n}\n\n*, ::before, ::after {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-gradient-from-position:  ;\n  --tw-gradient-via-position:  ;\n  --tw-gradient-to-position:  ;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n\n::backdrop {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-gradient-from-position:  ;\n  --tw-gradient-via-position:  ;\n  --tw-gradient-to-position:  ;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n.visible {\n  visibility: visible;\n}\n.static {\n  position: static;\n}\n.fixed {\n  position: fixed;\n}\n.absolute {\n  position: absolute;\n}\n.relative {\n  position: relative;\n}\n.sticky {\n  position: -webkit-sticky;\n  position: sticky;\n}\n.inset-0 {\n  inset: 0px;\n}\n.left-0 {\n  left: 0px;\n}\n.left-4 {\n  left: 1rem;\n}\n.right-0 {\n  right: 0px;\n}\n.right-4 {\n  right: 1rem;\n}\n.top-0 {\n  top: 0px;\n}\n.top-1\\/2 {\n  top: 50%;\n}\n.top-full {\n  top: 100%;\n}\n.z-10 {\n  z-index: 10;\n}\n.z-50 {\n  z-index: 50;\n}\n.col-span-full {\n  grid-column: 1 / -1;\n}\n.mx-auto {\n  margin-left: auto;\n  margin-right: auto;\n}\n.mb-1 {\n  margin-bottom: 0.25rem;\n}\n.mb-2 {\n  margin-bottom: 0.5rem;\n}\n.mb-4 {\n  margin-bottom: 1rem;\n}\n.mb-6 {\n  margin-bottom: 1.5rem;\n}\n.mb-8 {\n  margin-bottom: 2rem;\n}\n.ml-1 {\n  margin-left: 0.25rem;\n}\n.ml-2 {\n  margin-left: 0.5rem;\n}\n.mr-2 {\n  margin-right: 0.5rem;\n}\n.mr-3 {\n  margin-right: 0.75rem;\n}\n.mt-1 {\n  margin-top: 0.25rem;\n}\n.mt-2 {\n  margin-top: 0.5rem;\n}\n.mt-4 {\n  margin-top: 1rem;\n}\n.mt-6 {\n  margin-top: 1.5rem;\n}\n.mt-8 {\n  margin-top: 2rem;\n}\n.mt-\\[45px\\] {\n  margin-top: 45px;\n}\n.mt-auto {\n  margin-top: auto;\n}\n.block {\n  display: block;\n}\n.inline-block {\n  display: inline-block;\n}\n.flex {\n  display: flex;\n}\n.table {\n  display: table;\n}\n.grid {\n  display: grid;\n}\n.contents {\n  display: contents;\n}\n.hidden {\n  display: none;\n}\n.h-1 {\n  height: 0.25rem;\n}\n.h-10 {\n  height: 2.5rem;\n}\n.h-12 {\n  height: 3rem;\n}\n.h-16 {\n  height: 4rem;\n}\n.h-3 {\n  height: 0.75rem;\n}\n.h-32 {\n  height: 8rem;\n}\n.h-4 {\n  height: 1rem;\n}\n.h-5 {\n  height: 1.25rem;\n}\n.h-6 {\n  height: 1.5rem;\n}\n.h-8 {\n  height: 2rem;\n}\n.h-96 {\n  height: 24rem;\n}\n.h-\\[480px\\] {\n  height: 480px;\n}\n.h-full {\n  height: 100%;\n}\n.max-h-0 {\n  max-height: 0px;\n}\n.max-h-96 {\n  max-height: 24rem;\n}\n.max-h-\\[500px\\] {\n  max-height: 500px;\n}\n.max-h-full {\n  max-height: 100%;\n}\n.min-h-screen {\n  min-height: 100vh;\n}\n.w-1 {\n  width: 0.25rem;\n}\n.w-10 {\n  width: 2.5rem;\n}\n.w-12 {\n  width: 3rem;\n}\n.w-16 {\n  width: 4rem;\n}\n.w-28 {\n  width: 7rem;\n}\n.w-3 {\n  width: 0.75rem;\n}\n.w-4 {\n  width: 1rem;\n}\n.w-40 {\n  width: 10rem;\n}\n.w-48 {\n  width: 12rem;\n}\n.w-5 {\n  width: 1.25rem;\n}\n.w-6 {\n  width: 1.5rem;\n}\n.w-8 {\n  width: 2rem;\n}\n.w-\\[136px\\] {\n  width: 136px;\n}\n.w-auto {\n  width: auto;\n}\n.w-full {\n  width: 100%;\n}\n.min-w-0 {\n  min-width: 0px;\n}\n.min-w-\\[100px\\] {\n  min-width: 100px;\n}\n.max-w-4xl {\n  max-width: 56rem;\n}\n.max-w-7xl {\n  max-width: 80rem;\n}\n.max-w-\\[200px\\] {\n  max-width: 200px;\n}\n.max-w-full {\n  max-width: 100%;\n}\n.max-w-md {\n  max-width: 28rem;\n}\n.max-w-xs {\n  max-width: 20rem;\n}\n.flex-1 {\n  flex: 1 1 0%;\n}\n.flex-shrink-0 {\n  flex-shrink: 0;\n}\n.-translate-y-1\\/2 {\n  --tw-translate-y: -50%;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.rotate-180 {\n  --tw-rotate: 180deg;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.scale-100 {\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.scale-95 {\n  --tw-scale-x: .95;\n  --tw-scale-y: .95;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.transform {\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n@keyframes spin {\n\n  to {\n    transform: rotate(360deg);\n  }\n}\n.animate-spin {\n  animation: spin 1s linear infinite;\n}\n.cursor-not-allowed {\n  cursor: not-allowed;\n}\n.cursor-pointer {\n  cursor: pointer;\n}\n.grid-cols-1 {\n  grid-template-columns: repeat(1, minmax(0, 1fr));\n}\n.grid-cols-2 {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n.flex-col {\n  flex-direction: column;\n}\n.items-start {\n  align-items: flex-start;\n}\n.items-center {\n  align-items: center;\n}\n.justify-center {\n  justify-content: center;\n}\n.justify-between {\n  justify-content: space-between;\n}\n.gap-1 {\n  gap: 0.25rem;\n}\n.gap-2 {\n  gap: 0.5rem;\n}\n.gap-3 {\n  gap: 0.75rem;\n}\n.gap-4 {\n  gap: 1rem;\n}\n.gap-6 {\n  gap: 1.5rem;\n}\n.space-x-1 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-x-reverse: 0;\n  margin-right: calc(0.25rem * var(--tw-space-x-reverse));\n  margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));\n}\n.space-x-3 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-x-reverse: 0;\n  margin-right: calc(0.75rem * var(--tw-space-x-reverse));\n  margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));\n}\n.space-y-1 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));\n}\n.space-y-2 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));\n}\n.space-y-3 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));\n}\n.space-y-4 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(1rem * var(--tw-space-y-reverse));\n}\n.space-y-6 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));\n}\n.overflow-hidden {\n  overflow: hidden;\n}\n.truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.rounded {\n  border-radius: 0.25rem;\n}\n.rounded-\\[50\\%\\] {\n  border-radius: 50%;\n}\n.rounded-full {\n  border-radius: 9999px;\n}\n.rounded-lg {\n  border-radius: 0.5rem;\n}\n.rounded-md {\n  border-radius: 0.375rem;\n}\n.rounded-t-lg {\n  border-top-left-radius: 0.5rem;\n  border-top-right-radius: 0.5rem;\n}\n.border {\n  border-width: 1px;\n}\n.border-2 {\n  border-width: 2px;\n}\n.border-b {\n  border-bottom-width: 1px;\n}\n.border-b-2 {\n  border-bottom-width: 2px;\n}\n.border-l-2 {\n  border-left-width: 2px;\n}\n.border-r {\n  border-right-width: 1px;\n}\n.border-t {\n  border-top-width: 1px;\n}\n.border-gray-600 {\n  --tw-border-opacity: 1;\n  border-color: rgb(75 85 99 / var(--tw-border-opacity));\n}\n.border-gray-700\\/50 {\n  border-color: rgb(55 65 81 / 0.5);\n}\n.border-gray-dark {\n  --tw-border-opacity: 1;\n  border-color: rgb(24 24 24 / var(--tw-border-opacity));\n}\n.border-gray-light {\n  --tw-border-opacity: 1;\n  border-color: rgb(56 56 56 / var(--tw-border-opacity));\n}\n.border-red-500 {\n  --tw-border-opacity: 1;\n  border-color: rgb(239 68 68 / var(--tw-border-opacity));\n}\n.border-red-500\\/50 {\n  border-color: rgb(239 68 68 / 0.5);\n}\n.border-sky-600 {\n  --tw-border-opacity: 1;\n  border-color: rgb(2 132 199 / var(--tw-border-opacity));\n}\n.border-transparent {\n  border-color: transparent;\n}\n.border-white {\n  --tw-border-opacity: 1;\n  border-color: rgb(255 255 255 / var(--tw-border-opacity));\n}\n.border-t-gray-light {\n  --tw-border-opacity: 1;\n  border-top-color: rgb(56 56 56 / var(--tw-border-opacity));\n}\n.border-t-transparent {\n  border-top-color: transparent;\n}\n.bg-\\[\\#F4C404\\] {\n  --tw-bg-opacity: 1;\n  background-color: rgb(244 196 4 / var(--tw-bg-opacity));\n}\n.bg-black\\/50 {\n  background-color: rgb(0 0 0 / 0.5);\n}\n.bg-blue-400\\/10 {\n  background-color: rgb(96 165 250 / 0.1);\n}\n.bg-blue-600 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(37 99 235 / var(--tw-bg-opacity));\n}\n.bg-blue-700 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(29 78 216 / var(--tw-bg-opacity));\n}\n.bg-gray-400 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(156 163 175 / var(--tw-bg-opacity));\n}\n.bg-gray-600 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(75 85 99 / var(--tw-bg-opacity));\n}\n.bg-gray-700 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(55 65 81 / var(--tw-bg-opacity));\n}\n.bg-gray-800 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(31 41 55 / var(--tw-bg-opacity));\n}\n.bg-gray-800\\/50 {\n  background-color: rgb(31 41 55 / 0.5);\n}\n.bg-gray-800\\/95 {\n  background-color: rgb(31 41 55 / 0.95);\n}\n.bg-gray-900\\/95 {\n  background-color: rgb(17 24 39 / 0.95);\n}\n.bg-gray-dark {\n  --tw-bg-opacity: 1;\n  background-color: rgb(24 24 24 / var(--tw-bg-opacity));\n}\n.bg-green-600 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(22 163 74 / var(--tw-bg-opacity));\n}\n.bg-pink-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(236 72 153 / var(--tw-bg-opacity));\n}\n.bg-red-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(239 68 68 / var(--tw-bg-opacity));\n}\n.bg-red-500\\/20 {\n  background-color: rgb(239 68 68 / 0.2);\n}\n.bg-red-600 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(220 38 38 / var(--tw-bg-opacity));\n}\n.bg-sky-600 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(2 132 199 / var(--tw-bg-opacity));\n}\n.bg-transparent {\n  background-color: transparent;\n}\n.bg-white\\/5 {\n  background-color: rgb(255 255 255 / 0.05);\n}\n.bg-yellow-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(234 179 8 / var(--tw-bg-opacity));\n}\n.bg-zinc-900 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(24 24 27 / var(--tw-bg-opacity));\n}\n.bg-opacity-20 {\n  --tw-bg-opacity: 0.2;\n}\n.bg-opacity-50 {\n  --tw-bg-opacity: 0.5;\n}\n.bg-gradient-to-r {\n  background-image: linear-gradient(to right, var(--tw-gradient-stops));\n}\n.from-blue-400 {\n  --tw-gradient-from: #60a5fa var(--tw-gradient-from-position);\n  --tw-gradient-to: rgb(96 165 250 / 0) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);\n}\n.to-purple-500 {\n  --tw-gradient-to: #a855f7 var(--tw-gradient-to-position);\n}\n.bg-clip-text {\n  -webkit-background-clip: text;\n          background-clip: text;\n}\n.object-contain {\n  object-fit: contain;\n}\n.object-cover {\n  object-fit: cover;\n}\n.p-1 {\n  padding: 0.25rem;\n}\n.p-2 {\n  padding: 0.5rem;\n}\n.p-3 {\n  padding: 0.75rem;\n}\n.p-4 {\n  padding: 1rem;\n}\n.p-6 {\n  padding: 1.5rem;\n}\n.px-0 {\n  padding-left: 0px;\n  padding-right: 0px;\n}\n.px-1 {\n  padding-left: 0.25rem;\n  padding-right: 0.25rem;\n}\n.px-2 {\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}\n.px-3 {\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n}\n.px-4 {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n.px-6 {\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}\n.py-1 {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}\n.py-1\\.5 {\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n}\n.py-16 {\n  padding-top: 4rem;\n  padding-bottom: 4rem;\n}\n.py-2 {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n.py-3 {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n}\n.py-4 {\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n}\n.py-6 {\n  padding-top: 1.5rem;\n  padding-bottom: 1.5rem;\n}\n.py-8 {\n  padding-top: 2rem;\n  padding-bottom: 2rem;\n}\n.text-left {\n  text-align: left;\n}\n.text-center {\n  text-align: center;\n}\n.text-2xl {\n  font-size: 1.5rem;\n  line-height: 2rem;\n}\n.text-lg {\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n}\n.text-sm {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n}\n.text-xl {\n  font-size: 1.25rem;\n  line-height: 1.75rem;\n}\n.text-xs {\n  font-size: 0.75rem;\n  line-height: 1rem;\n}\n.font-bold {\n  font-weight: 700;\n}\n.font-medium {\n  font-weight: 500;\n}\n.font-semibold {\n  font-weight: 600;\n}\n.uppercase {\n  text-transform: uppercase;\n}\n.leading-10 {\n  line-height: 2.5rem;\n}\n.tracking-wider {\n  letter-spacing: 0.05em;\n}\n.text-black {\n  --tw-text-opacity: 1;\n  color: rgb(0 0 0 / var(--tw-text-opacity));\n}\n.text-blue-400 {\n  --tw-text-opacity: 1;\n  color: rgb(96 165 250 / var(--tw-text-opacity));\n}\n.text-gray-300 {\n  --tw-text-opacity: 1;\n  color: rgb(209 213 219 / var(--tw-text-opacity));\n}\n.text-gray-400 {\n  --tw-text-opacity: 1;\n  color: rgb(156 163 175 / var(--tw-text-opacity));\n}\n.text-gray-500 {\n  --tw-text-opacity: 1;\n  color: rgb(107 114 128 / var(--tw-text-opacity));\n}\n.text-red-200 {\n  --tw-text-opacity: 1;\n  color: rgb(254 202 202 / var(--tw-text-opacity));\n}\n.text-red-300 {\n  --tw-text-opacity: 1;\n  color: rgb(252 165 165 / var(--tw-text-opacity));\n}\n.text-red-400 {\n  --tw-text-opacity: 1;\n  color: rgb(248 113 113 / var(--tw-text-opacity));\n}\n.text-transparent {\n  color: transparent;\n}\n.text-white {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.underline {\n  -webkit-text-decoration-line: underline;\n          text-decoration-line: underline;\n}\n.placeholder-gray-400::placeholder {\n  --tw-placeholder-opacity: 1;\n  color: rgb(156 163 175 / var(--tw-placeholder-opacity));\n}\n.opacity-0 {\n  opacity: 0;\n}\n.opacity-100 {\n  opacity: 1;\n}\n.opacity-85 {\n  opacity: 0.85;\n}\n.shadow-2xl {\n  --tw-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);\n  --tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.shadow-lg {\n  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.shadow-xl {\n  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.filter {\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\n.backdrop-blur-md {\n  --tw-backdrop-blur: blur(12px);\n  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\n          backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\n}\n.backdrop-blur-sm {\n  --tw-backdrop-blur: blur(4px);\n  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\n          backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\n}\n.transition-all {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.transition-colors {\n  transition-property: color, background-color, border-color, fill, stroke, -webkit-text-decoration-color;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, -webkit-text-decoration-color;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.transition-transform {\n  transition-property: transform;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.duration-200 {\n  transition-duration: 200ms;\n}\n.duration-300 {\n  transition-duration: 300ms;\n}\n.duration-500 {\n  transition-duration: 500ms;\n}\n/* width */\n::-webkit-scrollbar {\n  width: 12px !important;\n}\n/* Track */\n::-webkit-scrollbar-track {\n  background: rgba(255, 255, 255, 0.1) !important;\n}\n/* Handle */\n::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.4) !important;\n}\n/* Handle on hover */\n::-webkit-scrollbar-thumb:hover {\n  background: rgba(255, 255, 255, 0.6) !important;\n}\nimg {\n  text-indent: -10000px;\n}\ninput:focus {\n  outline: 0;\n}\n.hover\\:scale-105:hover {\n  --tw-scale-x: 1.05;\n  --tw-scale-y: 1.05;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.hover\\:border-blue-500:hover {\n  --tw-border-opacity: 1;\n  border-color: rgb(59 130 246 / var(--tw-border-opacity));\n}\n.hover\\:border-gray-600:hover {\n  --tw-border-opacity: 1;\n  border-color: rgb(75 85 99 / var(--tw-border-opacity));\n}\n.hover\\:border-sky-400:hover {\n  --tw-border-opacity: 1;\n  border-color: rgb(56 189 248 / var(--tw-border-opacity));\n}\n.hover\\:bg-black\\/70:hover {\n  background-color: rgb(0 0 0 / 0.7);\n}\n.hover\\:bg-blue-700:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(29 78 216 / var(--tw-bg-opacity));\n}\n.hover\\:bg-gray-600:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(75 85 99 / var(--tw-bg-opacity));\n}\n.hover\\:bg-gray-700:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(55 65 81 / var(--tw-bg-opacity));\n}\n.hover\\:bg-gray-700\\/50:hover {\n  background-color: rgb(55 65 81 / 0.5);\n}\n.hover\\:bg-gray-800\\/30:hover {\n  background-color: rgb(31 41 55 / 0.3);\n}\n.hover\\:bg-gray-800\\/50:hover {\n  background-color: rgb(31 41 55 / 0.5);\n}\n.hover\\:bg-green-700:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(21 128 61 / var(--tw-bg-opacity));\n}\n.hover\\:bg-pink-600:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(219 39 119 / var(--tw-bg-opacity));\n}\n.hover\\:bg-red-700:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(185 28 28 / var(--tw-bg-opacity));\n}\n.hover\\:bg-sky-700:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(3 105 161 / var(--tw-bg-opacity));\n}\n.hover\\:bg-white\\/10:hover {\n  background-color: rgb(255 255 255 / 0.1);\n}\n.hover\\:bg-yellow-500:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(234 179 8 / var(--tw-bg-opacity));\n}\n.hover\\:bg-yellow-600:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(202 138 4 / var(--tw-bg-opacity));\n}\n.hover\\:text-blue-300:hover {\n  --tw-text-opacity: 1;\n  color: rgb(147 197 253 / var(--tw-text-opacity));\n}\n.hover\\:text-blue-400:hover {\n  --tw-text-opacity: 1;\n  color: rgb(96 165 250 / var(--tw-text-opacity));\n}\n.hover\\:text-sky-400:hover {\n  --tw-text-opacity: 1;\n  color: rgb(56 189 248 / var(--tw-text-opacity));\n}\n.hover\\:text-white:hover {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.hover\\:opacity-100:hover {\n  opacity: 1;\n}\n.focus\\:border-transparent:focus {\n  border-color: transparent;\n}\n.focus\\:bg-white\\/10:focus {\n  background-color: rgb(255 255 255 / 0.1);\n}\n.focus\\:outline-none:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n}\n.focus\\:ring-2:focus {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n.focus\\:ring-blue-500:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity));\n}\n.focus\\:ring-pink-500:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(236 72 153 / var(--tw-ring-opacity));\n}\n.focus\\:ring-sky-500:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(14 165 233 / var(--tw-ring-opacity));\n}\n.focus\\:ring-offset-2:focus {\n  --tw-ring-offset-width: 2px;\n}\n.disabled\\:cursor-not-allowed:disabled {\n  cursor: not-allowed;\n}\n.disabled\\:bg-gray-600:disabled {\n  --tw-bg-opacity: 1;\n  background-color: rgb(75 85 99 / var(--tw-bg-opacity));\n}\n.group:hover .group-hover\\:scale-105 {\n  --tw-scale-x: 1.05;\n  --tw-scale-y: 1.05;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.group:hover .group-hover\\:scale-110 {\n  --tw-scale-x: 1.1;\n  --tw-scale-y: 1.1;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n@media (min-width: 640px) {\n\n  .sm\\:block {\n    display: block;\n  }\n\n  .sm\\:w-auto {\n    width: auto;\n  }\n\n  .sm\\:grid-cols-1 {\n    grid-template-columns: repeat(1, minmax(0, 1fr));\n  }\n\n  .sm\\:grid-cols-2 {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .sm\\:grid-cols-3 {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n\n  .sm\\:flex-row {\n    flex-direction: row;\n  }\n\n  .sm\\:px-8 {\n    padding-left: 2rem;\n    padding-right: 2rem;\n  }\n}\n@media (min-width: 768px) {\n\n  .md\\:grid-cols-3 {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n\n  .md\\:grid-cols-4 {\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n  }\n\n  .md\\:gap-2 {\n    gap: 0.5rem;\n  }\n}\n@media (min-width: 1024px) {\n\n  .lg\\:grid-cols-2 {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .lg\\:grid-cols-4 {\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n  }\n\n  .lg\\:grid-cols-6 {\n    grid-template-columns: repeat(6, minmax(0, 1fr));\n  }\n\n  .lg\\:gap-2 {\n    gap: 0.5rem;\n  }\n}\n@media (min-width: 1280px) {\n\n  .xl\\:flex {\n    display: flex;\n  }\n\n  .xl\\:hidden {\n    display: none;\n  }\n\n  .xl\\:grid-cols-6 {\n    grid-template-columns: repeat(6, minmax(0, 1fr));\n  }\n\n  .xl\\:grid-cols-8 {\n    grid-template-columns: repeat(8, minmax(0, 1fr));\n  }\n\n  .xl\\:gap-2 {\n    gap: 0.5rem;\n  }\n}\n", ""]);
            const l = i
        }, 982: (e, t, n) => {
            "use strict";
            e.exports = n(463)
        }
    }, r = {};

    function a(e) {
        var t = r[e];
        if (void 0 !== t) return t.exports;
        var o = r[e] = {id: e, exports: {}};
        return n[e].call(o.exports, o, o.exports, a), o.exports
    }

    a.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return a.d(t, {a: t}), t
    }, t = Object.getPrototypeOf ? e => Object.getPrototypeOf(e) : e => e.__proto__, a.t = function (n, r) {
        if (1 & r && (n = this(n)), 8 & r) return n;
        if ("object" == typeof n && n) {
            if (4 & r && n.__esModule) return n;
            if (16 & r && "function" == typeof n.then) return n
        }
        var o = Object.create(null);
        a.r(o);
        var i = {};
        e = e || [null, t({}), t([]), t(t)];
        for (var l = 2 & r && n; "object" == typeof l && !~e.indexOf(l); l = t(l)) Object.getOwnPropertyNames(l).forEach((e => i[e] = () => n[e]));
        return i.default = () => n, a.d(o, i), o
    }, a.d = (e, t) => {
        for (var n in t) a.o(t, n) && !a.o(e, n) && Object.defineProperty(e, n, {enumerable: !0, get: t[n]})
    }, a.g = function () {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window) return window
        }
    }(), a.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), a.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, a.nc = void 0, (() => {
        "use strict";
        var e, t = a(848), n = a(338), r = a(540), o = a.t(r, 2), i = a(961), l = a.t(i, 2);

        function s() {
            return s = Object.assign ? Object.assign.bind() : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }, s.apply(this, arguments)
        }

        !function (e) {
            e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE"
        }(e || (e = {}));
        const u = "popstate";

        function c(e, t) {
            if (!1 === e || null == e) throw new Error(t)
        }

        function d(e, t) {
            if (!e) {
                "undefined" != typeof console && console.warn(t);
                try {
                    throw new Error(t)
                } catch (e) {
                }
            }
        }

        function f(e, t) {
            return {usr: e.state, key: e.key, idx: t}
        }

        function p(e, t, n, r) {
            return void 0 === n && (n = null), s({
                pathname: "string" == typeof e ? e : e.pathname,
                search: "",
                hash: ""
            }, "string" == typeof t ? m(t) : t, {
                state: n,
                key: t && t.key || r || Math.random().toString(36).substr(2, 8)
            })
        }

        function h(e) {
            let {pathname: t = "/", search: n = "", hash: r = ""} = e;
            return n && "?" !== n && (t += "?" === n.charAt(0) ? n : "?" + n), r && "#" !== r && (t += "#" === r.charAt(0) ? r : "#" + r), t
        }

        function m(e) {
            let t = {};
            if (e) {
                let n = e.indexOf("#");
                n >= 0 && (t.hash = e.substr(n), e = e.substr(0, n));
                let r = e.indexOf("?");
                r >= 0 && (t.search = e.substr(r), e = e.substr(0, r)), e && (t.pathname = e)
            }
            return t
        }

        var g;

        function y(e, t, n) {
            void 0 === n && (n = "/");
            let r = I(("string" == typeof t ? m(t) : t).pathname || "/", n);
            if (null == r) return null;
            let a = v(e);
            !function (e) {
                e.sort(((e, t) => e.score !== t.score ? t.score - e.score : function (e, t) {
                    let n = e.length === t.length && e.slice(0, -1).every(((e, n) => e === t[n]));
                    return n ? e[e.length - 1] - t[t.length - 1] : 0
                }(e.routesMeta.map((e => e.childrenIndex)), t.routesMeta.map((e => e.childrenIndex)))))
            }(a);
            let o = null;
            for (let e = 0; null == o && e < a.length; ++e) o = P(a[e], A(r));
            return o
        }

        function v(e, t, n, r) {
            void 0 === t && (t = []), void 0 === n && (n = []), void 0 === r && (r = "");
            let a = (e, a, o) => {
                let i = {
                    relativePath: void 0 === o ? e.path || "" : o,
                    caseSensitive: !0 === e.caseSensitive,
                    childrenIndex: a,
                    route: e
                };
                i.relativePath.startsWith("/") && (c(i.relativePath.startsWith(r), 'Absolute route path "' + i.relativePath + '" nested under path "' + r + '" is not valid. An absolute child route path must start with the combined path of all its parent routes.'), i.relativePath = i.relativePath.slice(r.length));
                let l = T([r, i.relativePath]), s = n.concat(i);
                e.children && e.children.length > 0 && (c(!0 !== e.index, 'Index routes must not have child routes. Please remove all child routes from route path "' + l + '".'), v(e.children, t, s, l)), (null != e.path || e.index) && t.push({
                    path: l,
                    score: C(l, e.index),
                    routesMeta: s
                })
            };
            return e.forEach(((e, t) => {
                var n;
                if ("" !== e.path && null != (n = e.path) && n.includes("?")) for (let n of b(e.path)) a(e, t, n); else a(e, t)
            })), t
        }

        function b(e) {
            let t = e.split("/");
            if (0 === t.length) return [];
            let [n, ...r] = t, a = n.endsWith("?"), o = n.replace(/\?$/, "");
            if (0 === r.length) return a ? [o, ""] : [o];
            let i = b(r.join("/")), l = [];
            return l.push(...i.map((e => "" === e ? o : [o, e].join("/")))), a && l.push(...i), l.map((t => e.startsWith("/") && "" === t ? "/" : t))
        }

        !function (e) {
            e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error"
        }(g || (g = {})), new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
        const w = /^:\w+$/, x = 3, k = 2, _ = 1, S = 10, N = -2, j = e => "*" === e;

        function C(e, t) {
            let n = e.split("/"), r = n.length;
            return n.some(j) && (r += N), t && (r += k), n.filter((e => !j(e))).reduce(((e, t) => e + (w.test(t) ? x : "" === t ? _ : S)), r)
        }

        function P(e, t) {
            let {routesMeta: n} = e, r = {}, a = "/", o = [];
            for (let e = 0; e < n.length; ++e) {
                let i = n[e], l = e === n.length - 1, s = "/" === a ? t : t.slice(a.length) || "/",
                    u = E({path: i.relativePath, caseSensitive: i.caseSensitive, end: l}, s);
                if (!u) return null;
                Object.assign(r, u.params);
                let c = i.route;
                o.push({
                    params: r,
                    pathname: T([a, u.pathname]),
                    pathnameBase: O(T([a, u.pathnameBase])),
                    route: c
                }), "/" !== u.pathnameBase && (a = T([a, u.pathnameBase]))
            }
            return o
        }

        function E(e, t) {
            "string" == typeof e && (e = {path: e, caseSensitive: !1, end: !0});
            let [n, r] = function (e, t, n) {
                void 0 === t && (t = !1), void 0 === n && (n = !0), d("*" === e || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were "' + e.replace(/\*$/, "/*") + '" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "' + e.replace(/\*$/, "/*") + '".');
                let r = [],
                    a = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:(\w+)(\?)?/g, ((e, t, n) => (r.push({
                        paramName: t,
                        isOptional: null != n
                    }), n ? "/?([^\\/]+)?" : "/([^\\/]+)")));
                return e.endsWith("*") ? (r.push({paramName: "*"}), a += "*" === e || "/*" === e ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? a += "\\/*$" : "" !== e && "/" !== e && (a += "(?:(?=\\/|$))"), [new RegExp(a, t ? void 0 : "i"), r]
            }(e.path, e.caseSensitive, e.end), a = t.match(n);
            if (!a) return null;
            let o = a[0], i = o.replace(/(.)\/+$/, "$1"), l = a.slice(1);
            return {
                params: r.reduce(((e, t, n) => {
                    let {paramName: r, isOptional: a} = t;
                    if ("*" === r) {
                        let e = l[n] || "";
                        i = o.slice(0, o.length - e.length).replace(/(.)\/+$/, "$1")
                    }
                    const s = l[n];
                    return e[r] = a && !s ? void 0 : function (e, t) {
                        try {
                            return decodeURIComponent(e)
                        } catch (n) {
                            return d(!1, 'The value for the URL param "' + t + '" will not be decoded because the string "' + e + '" is a malformed URL segment. This is probably due to a bad percent encoding (' + n + ")."), e
                        }
                    }(s || "", r), e
                }), {}), pathname: o, pathnameBase: i, pattern: e
            }
        }

        function A(e) {
            try {
                return decodeURI(e)
            } catch (t) {
                return d(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding (' + t + ")."), e
            }
        }

        function I(e, t) {
            if ("/" === t) return e;
            if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
            let n = t.endsWith("/") ? t.length - 1 : t.length, r = e.charAt(n);
            return r && "/" !== r ? null : e.slice(n) || "/"
        }

        function L(e, t, n, r) {
            return "Cannot include a '" + e + "' character in a manually specified `to." + t + "` field [" + JSON.stringify(r) + "].  Please separate it out to the `to." + n + '` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'
        }

        const T = e => e.join("/").replace(/\/\/+/g, "/"), O = e => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
            R = e => e && "?" !== e ? e.startsWith("?") ? e : "?" + e : "",
            M = e => e && "#" !== e ? e.startsWith("#") ? e : "#" + e : "";
        Error;
        const z = ["post", "put", "patch", "delete"], U = (new Set(z), ["get", ...z]);

        function F() {
            return F = Object.assign ? Object.assign.bind() : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }, F.apply(this, arguments)
        }

        new Set(U), new Set([301, 302, 303, 307, 308]), new Set([307, 308]), Symbol("deferred");
        const D = r.createContext(null), B = r.createContext(null), Q = r.createContext(null),
            W = r.createContext(null), q = r.createContext({outlet: null, matches: [], isDataRoute: !1}),
            V = r.createContext(null);

        function $() {
            return null != r.useContext(W)
        }

        function H() {
            return $() || c(!1), r.useContext(W).location
        }

        function K(e) {
            r.useContext(Q).static || r.useLayoutEffect(e)
        }

        function G() {
            let {isDataRoute: e} = r.useContext(q);
            return e ? function () {
                let {router: e} = function () {
                    let e = r.useContext(D);
                    return e || c(!1), e
                }(ne.UseNavigateStable), t = ae(re.UseNavigateStable), n = r.useRef(!1);
                K((() => {
                    n.current = !0
                }));
                let a = r.useCallback((function (r, a) {
                    void 0 === a && (a = {}), n.current && ("number" == typeof r ? e.navigate(r) : e.navigate(r, F({fromRouteId: t}, a)))
                }), [e, t]);
                return a
            }() : function () {
                $() || c(!1);
                let e = r.useContext(D), {
                        basename: t,
                        future: n,
                        navigator: a
                    } = r.useContext(Q), {matches: o} = r.useContext(q), {pathname: i} = H(),
                    l = JSON.stringify(function (e, t) {
                        let n = function (e) {
                            return e.filter(((e, t) => 0 === t || e.route.path && e.route.path.length > 0))
                        }(e);
                        return t ? n.map(((t, n) => n === e.length - 1 ? t.pathname : t.pathnameBase)) : n.map((e => e.pathnameBase))
                    }(o, n.v7_relativeSplatPath)), u = r.useRef(!1);
                K((() => {
                    u.current = !0
                }));
                let d = r.useCallback((function (n, r) {
                    if (void 0 === r && (r = {}), !u.current) return;
                    if ("number" == typeof n) return void a.go(n);
                    let o = function (e, t, n, r) {
                        let a;
                        void 0 === r && (r = !1), "string" == typeof e ? a = m(e) : (a = s({}, e), c(!a.pathname || !a.pathname.includes("?"), L("?", "pathname", "search", a)), c(!a.pathname || !a.pathname.includes("#"), L("#", "pathname", "hash", a)), c(!a.search || !a.search.includes("#"), L("#", "search", "hash", a)));
                        let o, i = "" === e || "" === a.pathname, l = i ? "/" : a.pathname;
                        if (null == l) o = n; else {
                            let e = t.length - 1;
                            if (!r && l.startsWith("..")) {
                                let t = l.split("/");
                                for (; ".." === t[0];) t.shift(), e -= 1;
                                a.pathname = t.join("/")
                            }
                            o = e >= 0 ? t[e] : "/"
                        }
                        let u = function (e, t) {
                            void 0 === t && (t = "/");
                            let {pathname: n, search: r = "", hash: a = ""} = "string" == typeof e ? m(e) : e,
                                o = n ? n.startsWith("/") ? n : function (e, t) {
                                    let n = t.replace(/\/+$/, "").split("/");
                                    return e.split("/").forEach((e => {
                                        ".." === e ? n.length > 1 && n.pop() : "." !== e && n.push(e)
                                    })), n.length > 1 ? n.join("/") : "/"
                                }(n, t) : t;
                            return {pathname: o, search: R(r), hash: M(a)}
                        }(a, o), d = l && "/" !== l && l.endsWith("/"), f = (i || "." === l) && n.endsWith("/");
                        return u.pathname.endsWith("/") || !d && !f || (u.pathname += "/"), u
                    }(n, JSON.parse(l), i, "path" === r.relative);
                    null == e && "/" !== t && (o.pathname = "/" === o.pathname ? t : T([t, o.pathname])), (r.replace ? a.replace : a.push)(o, r.state, r)
                }), [t, a, l, i, e]);
                return d
            }()
        }

        function J() {
            let {matches: e} = r.useContext(q), t = e[e.length - 1];
            return t ? t.params : {}
        }

        function Y(t, n, a, o) {
            $() || c(!1);
            let {navigator: i} = r.useContext(Q), {matches: l} = r.useContext(q), s = l[l.length - 1],
                u = s ? s.params : {}, d = (s && s.pathname, s ? s.pathnameBase : "/");
            s && s.route;
            let f, p = H();
            if (n) {
                var h;
                let e = "string" == typeof n ? m(n) : n;
                "/" === d || (null == (h = e.pathname) ? void 0 : h.startsWith(d)) || c(!1), f = e
            } else f = p;
            let g = f.pathname || "/", v = y(t, {pathname: "/" === d ? g : g.slice(d.length) || "/"}),
                b = function (e, t, n, a) {
                    var o;
                    if (void 0 === t && (t = []), void 0 === n && (n = null), void 0 === a && (a = null), null == e) {
                        var i;
                        if (null == (i = n) || !i.errors) return null;
                        e = n.matches
                    }
                    let l = e, s = null == (o = n) ? void 0 : o.errors;
                    if (null != s) {
                        let e = l.findIndex((e => e.route.id && (null == s ? void 0 : s[e.route.id])));
                        e >= 0 || c(!1), l = l.slice(0, Math.min(l.length, e + 1))
                    }
                    let u = !1, d = -1;
                    if (n && a && a.v7_partialHydration) for (let e = 0; e < l.length; e++) {
                        let t = l[e];
                        if ((t.route.HydrateFallback || t.route.hydrateFallbackElement) && (d = e), t.route.id) {
                            let {loaderData: e, errors: r} = n,
                                a = t.route.loader && void 0 === e[t.route.id] && (!r || void 0 === r[t.route.id]);
                            if (t.route.lazy || a) {
                                u = !0, l = d >= 0 ? l.slice(0, d + 1) : [l[0]];
                                break
                            }
                        }
                    }
                    return l.reduceRight(((e, a, o) => {
                        let i, c = !1, f = null, p = null;
                        var h;
                        n && (i = s && a.route.id ? s[a.route.id] : void 0, f = a.route.errorElement || Z, u && (d < 0 && 0 === o ? (oe[h = "route-fallback"] || (oe[h] = !0), c = !0, p = null) : d === o && (c = !0, p = a.route.hydrateFallbackElement || null)));
                        let m = t.concat(l.slice(0, o + 1)), g = () => {
                            let t;
                            return t = i ? f : c ? p : a.route.Component ? r.createElement(a.route.Component, null) : a.route.element ? a.route.element : e, r.createElement(te, {
                                match: a,
                                routeContext: {outlet: e, matches: m, isDataRoute: null != n},
                                children: t
                            })
                        };
                        return n && (a.route.ErrorBoundary || a.route.errorElement || 0 === o) ? r.createElement(ee, {
                            location: n.location,
                            revalidation: n.revalidation,
                            component: f,
                            error: i,
                            children: g(),
                            routeContext: {outlet: null, matches: m, isDataRoute: !0}
                        }) : g()
                    }), null)
                }(v && v.map((e => Object.assign({}, e, {
                    params: Object.assign({}, u, e.params),
                    pathname: T([d, i.encodeLocation ? i.encodeLocation(e.pathname).pathname : e.pathname]),
                    pathnameBase: "/" === e.pathnameBase ? d : T([d, i.encodeLocation ? i.encodeLocation(e.pathnameBase).pathname : e.pathnameBase])
                }))), l, a, o);
            return n && b ? r.createElement(W.Provider, {
                value: {
                    location: F({
                        pathname: "/",
                        search: "",
                        hash: "",
                        state: null,
                        key: "default"
                    }, f), navigationType: e.Pop
                }
            }, b) : b
        }

        function X() {
            let e = function () {
                    var e;
                    let t = r.useContext(V), n = function () {
                        let e = r.useContext(B);
                        return e || c(!1), e
                    }(re.UseRouteError), a = ae(re.UseRouteError);
                    return void 0 !== t ? t : null == (e = n.errors) ? void 0 : e[a]
                }(), t = function (e) {
                    return null != e && "number" == typeof e.status && "string" == typeof e.statusText && "boolean" == typeof e.internal && "data" in e
                }(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e),
                n = e instanceof Error ? e.stack : null,
                a = {padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)"};
            return r.createElement(r.Fragment, null, r.createElement("h2", null, "Unexpected Application Error!"), r.createElement("h3", {style: {fontStyle: "italic"}}, t), n ? r.createElement("pre", {style: a}, n) : null, null)
        }

        const Z = r.createElement(X, null);

        class ee extends r.Component {
            constructor(e) {
                super(e), this.state = {location: e.location, revalidation: e.revalidation, error: e.error}
            }

            static getDerivedStateFromError(e) {
                return {error: e}
            }

            static getDerivedStateFromProps(e, t) {
                return t.location !== e.location || "idle" !== t.revalidation && "idle" === e.revalidation ? {
                    error: e.error,
                    location: e.location,
                    revalidation: e.revalidation
                } : {
                    error: void 0 !== e.error ? e.error : t.error,
                    location: t.location,
                    revalidation: e.revalidation || t.revalidation
                }
            }

            componentDidCatch(e, t) {
                console.error("React Router caught the following error during render", e, t)
            }

            render() {
                return void 0 !== this.state.error ? r.createElement(q.Provider, {value: this.props.routeContext}, r.createElement(V.Provider, {
                    value: this.state.error,
                    children: this.props.component
                })) : this.props.children
            }
        }

        function te(e) {
            let {routeContext: t, match: n, children: a} = e, o = r.useContext(D);
            return o && o.static && o.staticContext && (n.route.errorElement || n.route.ErrorBoundary) && (o.staticContext._deepestRenderedBoundaryId = n.route.id), r.createElement(q.Provider, {value: t}, a)
        }

        var ne = function (e) {
            return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e
        }(ne || {}), re = function (e) {
            return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e
        }(re || {});

        function ae(e) {
            let t = function () {
                let e = r.useContext(q);
                return e || c(!1), e
            }(), n = t.matches[t.matches.length - 1];
            return n.route.id || c(!1), n.route.id
        }

        const oe = {};

        function ie(e) {
            c(!1)
        }

        function le(t) {
            let {
                basename: n = "/",
                children: a = null,
                location: o,
                navigationType: i = e.Pop,
                navigator: l,
                static: s = !1,
                future: u
            } = t;
            $() && c(!1);
            let d = n.replace(/^\/*/, "/"), f = r.useMemo((() => ({
                basename: d,
                navigator: l,
                static: s,
                future: F({v7_relativeSplatPath: !1}, u)
            })), [d, u, l, s]);
            "string" == typeof o && (o = m(o));
            let {pathname: p = "/", search: h = "", hash: g = "", state: y = null, key: v = "default"} = o,
                b = r.useMemo((() => {
                    let e = I(p, d);
                    return null == e ? null : {
                        location: {pathname: e, search: h, hash: g, state: y, key: v},
                        navigationType: i
                    }
                }), [d, p, h, g, y, v, i]);
            return null == b ? null : r.createElement(Q.Provider, {value: f}, r.createElement(W.Provider, {
                children: a,
                value: b
            }))
        }

        function se(e, t) {
            void 0 === t && (t = []);
            let n = [];
            return r.Children.forEach(e, ((e, a) => {
                if (!r.isValidElement(e)) return;
                let o = [...t, a];
                if (e.type === r.Fragment) return void n.push.apply(n, se(e.props.children, o));
                e.type !== ie && c(!1), e.props.index && e.props.children && c(!1);
                let i = {
                    id: e.props.id || o.join("-"),
                    caseSensitive: e.props.caseSensitive,
                    element: e.props.element,
                    Component: e.props.Component,
                    index: e.props.index,
                    path: e.props.path,
                    loader: e.props.loader,
                    action: e.props.action,
                    errorElement: e.props.errorElement,
                    ErrorBoundary: e.props.ErrorBoundary,
                    hasErrorBoundary: null != e.props.ErrorBoundary || null != e.props.errorElement,
                    shouldRevalidate: e.props.shouldRevalidate,
                    handle: e.props.handle,
                    lazy: e.props.lazy
                };
                e.props.children && (i.children = se(e.props.children, o)), n.push(i)
            })), n
        }

        function ue(e) {
            return void 0 === e && (e = ""), new URLSearchParams("string" == typeof e || Array.isArray(e) || e instanceof URLSearchParams ? e : Object.keys(e).reduce(((t, n) => {
                let r = e[n];
                return t.concat(Array.isArray(r) ? r.map((e => [n, e])) : [[n, r]])
            }), []))
        }

        o.startTransition, new Promise((() => {
        })), r.Component, new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]), new Map;
        const ce = o.startTransition;
        var de, fe;

        function pe(e) {
            let t = r.useRef(ue(e)), n = r.useRef(!1), a = H(), o = r.useMemo((() => function (e, t) {
                let n = ue(e);
                return t && t.forEach(((e, r) => {
                    n.has(r) || t.getAll(r).forEach((e => {
                        n.append(r, e)
                    }))
                })), n
            }(a.search, n.current ? null : t.current)), [a.search]), i = G(), l = r.useCallback(((e, t) => {
                const r = ue("function" == typeof e ? e(o) : e);
                n.current = !0, i("?" + r, t)
            }), [i, o]);
            return [o, l]
        }

        l.flushSync, "undefined" != typeof window && void 0 !== window.document && window.document.createElement, function (e) {
            e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState"
        }(de || (de = {})), function (e) {
            e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration"
        }(fe || (fe = {}));
        var he = a(942);
        let me = {data: ""},
            ge = e => "object" == typeof window ? ((e ? e.querySelector("#_goober") : window._goober) || Object.assign((e || document.head).appendChild(document.createElement("style")), {
                innerHTML: " ",
                id: "_goober"
            })).firstChild : e || me, ye = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,
            ve = /\/\*[^]*?\*\/|  +/g, be = /\n+/g, we = (e, t) => {
                let n = "", r = "", a = "";
                for (let o in e) {
                    let i = e[o];
                    "@" == o[0] ? "i" == o[1] ? n = o + " " + i + ";" : r += "f" == o[1] ? we(i, o) : o + "{" + we(i, "k" == o[1] ? "" : t) + "}" : "object" == typeof i ? r += we(i, t ? t.replace(/([^,])+/g, (e => o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g, (t => /&/.test(t) ? t.replace(/&/g, e) : e ? e + " " + t : t)))) : o) : null != i && (o = /^--/.test(o) ? o : o.replace(/[A-Z]/g, "-$&").toLowerCase(), a += we.p ? we.p(o, i) : o + ":" + i + ";")
                }
                return n + (t && a ? t + "{" + a + "}" : a) + r
            }, xe = {}, ke = e => {
                if ("object" == typeof e) {
                    let t = "";
                    for (let n in e) t += n + ke(e[n]);
                    return t
                }
                return e
            }, _e = (e, t, n, r, a) => {
                let o = ke(e), i = xe[o] || (xe[o] = (e => {
                    let t = 0, n = 11;
                    for (; t < e.length;) n = 101 * n + e.charCodeAt(t++) >>> 0;
                    return "go" + n
                })(o));
                if (!xe[i]) {
                    let t = o !== e ? e : (e => {
                        let t, n, r = [{}];
                        for (; t = ye.exec(e.replace(ve, ""));) t[4] ? r.shift() : t[3] ? (n = t[3].replace(be, " ").trim(), r.unshift(r[0][n] = r[0][n] || {})) : r[0][t[1]] = t[2].replace(be, " ").trim();
                        return r[0]
                    })(e);
                    xe[i] = we(a ? {["@keyframes " + i]: t} : t, n ? "" : "." + i)
                }
                let l = n && xe.g ? xe.g : null;
                return n && (xe.g = xe[i]), ((e, t, n, r) => {
                    r ? t.data = t.data.replace(r, e) : -1 === t.data.indexOf(e) && (t.data = n ? e + t.data : t.data + e)
                })(xe[i], t, r, l), i
            };

        function Se(e) {
            let t = this || {}, n = e.call ? e(t.p) : e;
            return _e(n.unshift ? n.raw ? ((e, t, n) => e.reduce(((e, r, a) => {
                let o = t[a];
                if (o && o.call) {
                    let e = o(n), t = e && e.props && e.props.className || /^go/.test(e) && e;
                    o = t ? "." + t : e && "object" == typeof e ? e.props ? "" : we(e, "") : !1 === e ? "" : e
                }
                return e + r + (null == o ? "" : o)
            }), ""))(n, [].slice.call(arguments, 1), t.p) : n.reduce(((e, n) => Object.assign(e, n && n.call ? n(t.p) : n)), {}) : n, ge(t.target), t.g, t.o, t.k)
        }

        Se.bind({g: 1});
        let Ne, je, Ce, Pe = Se.bind({k: 1});

        function Ee(e, t) {
            let n = this || {};
            return function () {
                let r = arguments;

                function a(o, i) {
                    let l = Object.assign({}, o), s = l.className || a.className;
                    n.p = Object.assign({theme: je && je()}, l), n.o = / *go\d+/.test(s), l.className = Se.apply(n, r) + (s ? " " + s : ""), t && (l.ref = i);
                    let u = e;
                    return e[0] && (u = l.as || e, delete l.as), Ce && u[0] && Ce(l), Ne(u, l)
                }

                return t ? t(a) : a
            }
        }

        var Ae = (e, t) => (e => "function" == typeof e)(e) ? e(t) : e, Ie = (() => {
            let e = 0;
            return () => (++e).toString()
        })(), Le = (() => {
            let e;
            return () => {
                if (void 0 === e && typeof window < "u") {
                    let t = matchMedia("(prefers-reduced-motion: reduce)");
                    e = !t || t.matches
                }
                return e
            }
        })(), Te = (e, t) => {
            switch (t.type) {
                case 0:
                    return {...e, toasts: [t.toast, ...e.toasts].slice(0, 20)};
                case 1:
                    return {...e, toasts: e.toasts.map((e => e.id === t.toast.id ? {...e, ...t.toast} : e))};
                case 2:
                    let {toast: n} = t;
                    return Te(e, {type: e.toasts.find((e => e.id === n.id)) ? 1 : 0, toast: n});
                case 3:
                    let {toastId: r} = t;
                    return {
                        ...e,
                        toasts: e.toasts.map((e => e.id === r || void 0 === r ? {...e, dismissed: !0, visible: !1} : e))
                    };
                case 4:
                    return void 0 === t.toastId ? {...e, toasts: []} : {
                        ...e,
                        toasts: e.toasts.filter((e => e.id !== t.toastId))
                    };
                case 5:
                    return {...e, pausedAt: t.time};
                case 6:
                    let a = t.time - (e.pausedAt || 0);
                    return {
                        ...e,
                        pausedAt: void 0,
                        toasts: e.toasts.map((e => ({...e, pauseDuration: e.pauseDuration + a})))
                    }
            }
        }, Oe = [], Re = {toasts: [], pausedAt: void 0}, Me = e => {
            Re = Te(Re, e), Oe.forEach((e => {
                e(Re)
            }))
        }, ze = {blank: 4e3, error: 4e3, success: 2e3, loading: 1 / 0, custom: 4e3}, Ue = e => (t, n) => {
            let r = ((e, t = "blank", n) => ({
                createdAt: Date.now(),
                visible: !0,
                dismissed: !1,
                type: t,
                ariaProps: {role: "status", "aria-live": "polite"},
                message: e,
                pauseDuration: 0, ...n,
                id: (null == n ? void 0 : n.id) || Ie()
            }))(t, e, n);
            return Me({type: 2, toast: r}), r.id
        }, Fe = (e, t) => Ue("blank")(e, t);
        Fe.error = Ue("error"), Fe.success = Ue("success"), Fe.loading = Ue("loading"), Fe.custom = Ue("custom"), Fe.dismiss = e => {
            Me({type: 3, toastId: e})
        }, Fe.remove = e => Me({type: 4, toastId: e}), Fe.promise = (e, t, n) => {
            let r = Fe.loading(t.loading, {...n, ...null == n ? void 0 : n.loading});
            return "function" == typeof e && (e = e()), e.then((e => {
                let a = t.success ? Ae(t.success, e) : void 0;
                return a ? Fe.success(a, {id: r, ...n, ...null == n ? void 0 : n.success}) : Fe.dismiss(r), e
            })).catch((e => {
                let a = t.error ? Ae(t.error, e) : void 0;
                a ? Fe.error(a, {id: r, ...n, ...null == n ? void 0 : n.error}) : Fe.dismiss(r)
            })), e
        };
        var De = (e, t) => {
                Me({type: 1, toast: {id: e, height: t}})
            }, Be = () => {
                Me({type: 5, time: Date.now()})
            }, Qe = new Map, We = Pe`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`, qe = Pe`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`, Ve = Pe`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`, $e = Ee("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e => e.primary || "#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${We} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${qe} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e => e.secondary || "#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Ve} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`, He = Pe`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`, Ke = Ee("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e => e.secondary || "#e0e0e0"};
  border-right-color: ${e => e.primary || "#616161"};
  animation: ${He} 1s linear infinite;
`, Ge = Pe`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`, Je = Pe`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`, Ye = Ee("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e => e.primary || "#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ge} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Je} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e => e.secondary || "#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`, Xe = Ee("div")`
  position: absolute;
`, Ze = Ee("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`, et = Pe`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`, tt = Ee("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${et} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`, nt = ({toast: e}) => {
                let {icon: t, type: n, iconTheme: a} = e;
                return void 0 !== t ? "string" == typeof t ? r.createElement(tt, null, t) : t : "blank" === n ? null : r.createElement(Ze, null, r.createElement(Ke, {...a}), "loading" !== n && r.createElement(Xe, null, "error" === n ? r.createElement($e, {...a}) : r.createElement(Ye, {...a})))
            },
            rt = e => `\n0% {transform: translate3d(0,${-200 * e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,
            at = e => `\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150 * e}%,-1px) scale(.6); opacity:0;}\n`,
            ot = Ee("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`, it = Ee("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`, lt = r.memo((({toast: e, position: t, style: n, children: a}) => {
                let o = e.height ? ((e, t) => {
                        let n = e.includes("top") ? 1 : -1, [r, a] = Le() ? ["0%{opacity:0;} 100%{opacity:1;}", "0%{opacity:1;} 100%{opacity:0;}"] : [rt(n), at(n)];
                        return {animation: t ? `${Pe(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards` : `${Pe(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}
                    })(e.position || t || "top-center", e.visible) : {opacity: 0}, i = r.createElement(nt, {toast: e}),
                    l = r.createElement(it, {...e.ariaProps}, Ae(e.message, e));
                return r.createElement(ot, {
                    className: e.className,
                    style: {...o, ...n, ...e.style}
                }, "function" == typeof a ? a({icon: i, message: l}) : r.createElement(r.Fragment, null, i, l))
            }));
        !function (e) {
            we.p = void 0, Ne = e, je = void 0, Ce = void 0
        }(r.createElement);
        var st = ({id: e, className: t, style: n, onHeightUpdate: a, children: o}) => {
                let i = r.useCallback((t => {
                    if (t) {
                        let n = () => {
                            let n = t.getBoundingClientRect().height;
                            a(e, n)
                        };
                        n(), new MutationObserver(n).observe(t, {subtree: !0, childList: !0, characterData: !0})
                    }
                }), [e, a]);
                return r.createElement("div", {ref: i, className: t, style: n}, o)
            }, ut = Se`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`, ct = Fe, dt = a(72), ft = a.n(dt), pt = a(825), ht = a.n(pt), mt = a(659), gt = a.n(mt), yt = a(56), vt = a.n(yt),
            bt = a(778), wt = a.n(bt), xt = a(113), kt = a.n(xt), _t = a(972), St = {};
        St.styleTagTransform = kt(), St.setAttributes = vt(), St.insert = gt().bind(null, "head"), St.domAPI = ht(), St.insertStyleElement = wt(), ft()(_t.A, St), _t.A && _t.A.locals && _t.A.locals;
        var Nt, jt, Ct = (Nt = function (e, t) {
            return Nt = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }, Nt(e, t)
        }, function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function n() {
                this.constructor = e
            }

            Nt(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
        }), Pt = function (e) {
            return function (e, t, n, r) {
                return new (n || (n = Promise))((function (a, o) {
                    function i(e) {
                        try {
                            s(r.next(e))
                        } catch (e) {
                            o(e)
                        }
                    }

                    function l(e) {
                        try {
                            s(r.throw(e))
                        } catch (e) {
                            o(e)
                        }
                    }

                    function s(e) {
                        var t;
                        e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(i, l)
                    }

                    s((r = r.apply(e, t || [])).next())
                }))
            }(void 0, void 0, void 0, (function () {
                var t, n, r, a, o, i, l, s;
                return function (e, t) {
                    var n, r, a, o, i = {
                        label: 0, sent: function () {
                            if (1 & a[0]) throw a[1];
                            return a[1]
                        }, trys: [], ops: []
                    };
                    return o = {
                        next: l(0),
                        throw: l(1),
                        return: l(2)
                    }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                        return this
                    }), o;

                    function l(l) {
                        return function (s) {
                            return function (l) {
                                if (n) throw new TypeError("Generator is already executing.");
                                for (; o && (o = 0, l[0] && (i = 0)), i;) try {
                                    if (n = 1, r && (a = 2 & l[0] ? r.return : l[0] ? r.throw || ((a = r.return) && a.call(r), 0) : r.next) && !(a = a.call(r, l[1])).done) return a;
                                    switch (r = 0, a && (l = [2 & l[0], a.value]), l[0]) {
                                        case 0:
                                        case 1:
                                            a = l;
                                            break;
                                        case 4:
                                            return i.label++, {value: l[1], done: !1};
                                        case 5:
                                            i.label++, r = l[1], l = [0];
                                            continue;
                                        case 7:
                                            l = i.ops.pop(), i.trys.pop();
                                            continue;
                                        default:
                                            if (!((a = (a = i.trys).length > 0 && a[a.length - 1]) || 6 !== l[0] && 2 !== l[0])) {
                                                i = 0;
                                                continue
                                            }
                                            if (3 === l[0] && (!a || l[1] > a[0] && l[1] < a[3])) {
                                                i.label = l[1];
                                                break
                                            }
                                            if (6 === l[0] && i.label < a[1]) {
                                                i.label = a[1], a = l;
                                                break
                                            }
                                            if (a && i.label < a[2]) {
                                                i.label = a[2], i.ops.push(l);
                                                break
                                            }
                                            a[2] && i.ops.pop(), i.trys.pop();
                                            continue
                                    }
                                    l = t.call(e, i)
                                } catch (e) {
                                    l = [6, e], r = 0
                                } finally {
                                    n = a = 0
                                }
                                if (5 & l[0]) throw l[1];
                                return {value: l[0] ? l[1] : void 0, done: !0}
                            }([l, s])
                        }
                    }
                }(this, (function (u) {
                    switch (u.label) {
                        case 0:
                            t = window, n = {ip: t.ip, ip1: t.ip2}, r = n.ip, a = n.ip1, u.label = 1;
                        case 1:
                            return u.trys.push([1, 3, , 8]), [4, fetch("https://".concat(r, "/").concat(e))];
                        case 2:
                            if (200 === (o = u.sent()).status) return [2, o.json()];
                            throw new Error("".concat(r, "-failure-").concat(o.status));
                        case 3:
                            if (i = u.sent(), console.log("Primary IP failed: ".concat(i.message)), !a || a === r) return [3, 7];
                            u.label = 4;
                        case 4:
                            return u.trys.push([4, 6, , 7]), [4, fetch("https://".concat(a, "/").concat(e))];
                        case 5:
                            if (200 === (l = u.sent()).status) return [2, l.json()];
                            throw new Error("".concat(a, "-failure-").concat(l.status));
                        case 6:
                            return s = u.sent(), console.log("Fallback IP failed: ".concat(s.message)), [3, 7];
                        case 7:
                            return [3, 8];
                        case 8:
                            return [2]
                    }
                }))
            }))
        }, Et = (jt = Error, Ct((function (e) {
            var t = jt.call(this, e) || this;
            return t.name = "PotentialFirewallError", t
        }), jt), a(232)), At = {};
        At.styleTagTransform = kt(), At.setAttributes = vt(), At.insert = gt().bind(null, "head"), At.domAPI = ht(), At.insertStyleElement = wt(), ft()(Et.A, At), Et.A && Et.A.locals && Et.A.locals;
        var It = "1.0.0", Lt = {
            runAtOsStartup: "false",
            soundEnabled: "true",
            downloadCounter: "0",
            endpoints: [],
            uiLanguage: "en",
            subLanguage: "en",
            downloadDirectory: "",
            urlMap: {},
            favouriteList: [],
            torrentInfo: [],
            torrentData: [],
            pieceStates: [],
            port: "",
            osLang: "en",
            categorySelected: "",
            typeSelected: "",
            listingSelected: ""
        }, Tt = function (e) {
            try {
                var t = localStorage.getItem("".concat(e, "-").concat(It));
                if (t) if ("endpoints" === e) (n = JSON.parse(t)) && (Lt[e] = n); else if ("urlMap" === e || "favouriteList" == e || "torrentInfo" == e || "torrentData" == e || "pieceStates" == e) {
                    var n;
                    (n = JSON.parse(t)) && (Lt[e] = n)
                } else Lt[e] = t
            } catch (e) {
            }
            return Lt[e]
        }, Ot = function (e, t) {
            Lt[e] = t;
            var n = t;
            "endpoints" !== e && "urlMap" != e && "favouriteList" != e && "torrentInfo" != e && "torrentData" != e && "pieceStates" != e || (n = JSON.stringify(t)), localStorage.setItem("".concat(e, "-").concat(It), n)
        };
        const Rt = {
            en: {
                popular: "Popular",
                top_rated: "Top Rated",
                new: "New",
                random: "Random",
                category: "Category",
                genre: "Genre",
                country: "Country",
                all: "All",
                watch_only: "Watch Only",
                title: "Title",
                actor: "Actor",
                keyword: "Keyword",
                search: "Search",
                listing: "Listing",
                feature: "Feature",
                type: "Type",
                filter: "Filter",
                total: "Total",
                page: "pages",
                download: "Download",
                copy_download_link: "Copy Download Link",
                install_xunlei: "Please install Xunlei and click this button again",
                download_link_copied: "Download link is copied!",
                watch_online: "Watch Online",
                episode_list: "Episode List",
                cast: "Cast",
                trailers: "Trailers",
                snapshots: "Snapshots",
                favorite_list: "Favorite list",
                playlist: "Playlist",
                video_duration: "Video Duration",
                imdb_score: "IMDb Score",
                file_size: "File Size",
                download_speed: "Download Speed",
                download_progress: "Download Progress",
                download_status: "Download Status",
                pause: "Pause",
                resume: "Resume",
                remove_from_list: "Remove from List",
                delete_from_storage: "Delete from Storage",
                title_info: "Title info",
                settings: "Settings",
                my_account: "My Account",
                email: "email",
                language: "Language",
                app: "App",
                subtitle: "Subtitle",
                sub_from_local: "Open subtitle from storage",
                sub_from_server: "Download subtitle from server",
                turn_off_sub: "Turn off subtitle",
                server_error: "Something went wrong",
                server_error2: "Please try to reopen app.",
                logout_device: "You are now logged out from this device",
                logout_device2: "as your account has logged in to 2 others devices.",
                login_again: "Log in again",
                later: "I will do it later",
                login: "Login",
                password: "Password",
                forgot_password: "Forgot password?",
                signup: "Sign up now.",
                MISSING_INPUT_VALUE: "Please input values",
                INVALID_LOGIN_CREDENTIAL: "User not found or wrong password    ",
                logout: "Logout",
                select_endpoint: "Select API endpoint",
                add_endpoint: "Add New API endpoint",
                download_folder: "Download Location",
                no_folder_selected: "No Folder Selected",
                select: "Select",
                add: "Add",
                apply: "Apply",
                reset: "Reset",
                change: "Change",
                general: "General",
                open_startup: "Open API Player from background as OS startup",
                enable_sound: "Enable sound",
                go_2_main: "Go to main page",
                membership_balance: "Membership balance",
                cloud_balance: "Traffic Balance",
                days: "days",
                disclaimer: "Disclaimer",
                disclaimer_text: "API player provides a software product that enables a user to play media contents fetched from 3rd party media sources by his/her own API integration.",
                disclaimer_text_2: "API player is not liable for any violation of law caused by a user’s own integration with any API granting access to illegal contents such as copyright infringing material illegal pornography and others not limited to them.",
                understood: "Understood",
                search_title: "Search by title",
                search_actor: "Search by actress",
                subscribe_now: "You should subscribe to a membership in order to use this feature",
                subscribe: "Subscribe",
                yes: "Yes",
                no: "No",
                download_limit_3: "If you download more than 2 titles the first title shall be automatically removed from the playlist. But you can find it in your download folder at any time",
                welcome_tip_heading: "Useful tips!",
                welcome_tip_1: "You can see all titles or actors by clicking [Search] button without a keyword.",
                welcome_tip_2: "Download speed may be unstable according to traffic conditions. We are continuously working to improve it.",
                welcome_tip_3: "You can always go back to the previous screen by pressing Esc key in your keyboard.",
                usecasettl: "Watch Full HD videos by API Player",
                usecasettl1: "API player is a open source media player streaming any video & audio files fetched by open API.",
                usecasettl2: "A user can edit code for integration with the API in settings menu.",
                usecasettl3: "Below is a sample code for integration with imdb7 API.",
                usecasettl4: "Follow this step to test how it works.",
                usecasettl5: "1. Download Windows app or Android / iOS app (A lower version of API Player Lite is currently available on the MS Store. We recommend downloading the higher version by clicking the yellow [Download link 2] button below.)",
                usecasettl6: "API Player Lite (Windows)",
                usecasettl7: "New ✨API Player Lite (Windows)",
                usecasettl8: "Flix1 (Android)",
                usecasettl9: "Download link",
                usecasettl10: "Download link 2",
                usecasettl11: "2. Click the button below.",
                usecasettl12: "Copy API for all age",
                usecasettl13: "Copy API for 18+",
                usecasettl14: "3. Go to settings - Edit API integration and paste the code.",
                usecasettl15: "If some other code already exist pleasce back up in advance.",
                usecasettl16: "Now you have your own media player! Enjoy it.",
                usecasettl17: "Flix1 (iOS)",
                label: "English",
                find_more_subs: "You can find more subtitles in your language by clicking settings icon on bottom right corner of the video player.",
                WATCH_ON_PHONE: "Follow this step to watch videos on your phone.",
                DOWNLOAD_APIPL: "1. Download latest versioon of API Player Lite on your Windows PC.",
                ENTER_API: "2. Enter API endpoint in settings page of API Player Lite.",
                SCAN_QR: "3. Scan QR code with your phone once title list is loaded.",
                WEBSITE_OPEN: "4. Website of your API endpoint is opened on your phone.",
                ENJOY_VIDEO: "5. Enjoy your videos!",
                STILL_WANT_MULTIFLIX: "✅ If you want to use our old version Android app, click Android icon on the left.",
                usecase: "Download app",
                release_date: "Release date",
                duration: "Video Duration",
                Size: "Size",
                Maker: "Maker",
                also_stared: "Also starred",
                titles_by_same_maker: "Titles by same maker",
                "most popular": "Popular",
                "top rated": "Top Rated",
                copy_magnet_uri: "Copy magnet URI",
                start_downloading: "Start downloading",
                download_subtitle: "Download subtitle",
                translate_subtitle: "Translate subtitle",
                loading_also_starred: "Loading starred movies...",
                censored: "Censored",
                uncensored: "Uncensored",
                leaked: "Leaked",
                fc2: "FC2",
                download_available_or_translate: "Download or translate a subtitle"
            }, ko: {
                popular: "인기작",
                top_rated: "최고평점",
                new: "신작",
                random: "랜덤",
                category: "카테고리",
                genre: "장르",
                country: "국가",
                all: "모두",
                watch_only: "시청만 가능",
                title: "작품",
                actor: "배우",
                keyword: "키워드",
                search: "검색",
                listing: "정렬순서",
                feature: "특징",
                type: "유형",
                filter: "분류하기",
                total: "총",
                page: "페이지",
                download: "다운로드",
                copy_download_link: "다운로드 링크 복사",
                install_xunlei: "쉰레이를 설치하고 이 버튼을 다시 클릭하세요",
                download_link_copied: "다운로드 링크가 복사되었습니다!",
                watch_online: "온라인 시청",
                episode_list: "에피소드 리스트",
                cast: "출연자",
                trailers: "예고편",
                snapshots: "스냅샷",
                favorite_list: "즐겨찾기",
                playlist: "재생목록",
                video_duration: "재생시간",
                imdb_score: "IMDb 평점",
                file_size: "파일 크기",
                download_speed: "다운로드 속도",
                download_progress: "다운로드 진척율",
                download_status: "다운로드 상태",
                pause: "일시중지",
                resume: "재개",
                remove_from_list: "리스트에서 삭제",
                delete_from_storage: "저장공간에서 삭제",
                title_info: "작품정보",
                settings: "환경설정",
                my_account: "나의 계정",
                email: "이메일",
                language: "언어",
                app: "앱",
                subtitle: "자막",
                sub_from_local: "저장장치에서 자막 열기",
                sub_from_server: "서버에서 자막 다운로드",
                turn_off_sub: "자막 끄기",
                server_error: "오류가 발생했습니다.",
                server_error2: "앱을 다시 열어 보세요.",
                logout_device: "당신의 계정이 다른기기에서 로그인",
                logout_device2: "되었으므로 이 기기는 로그아웃됩니다.",
                login_again: "다시로그인",
                later: "나중에 하겠습니다",
                login: "로그인",
                password: "패스워드",
                forgot_password: "패스워드를 잊어버렸나요?",
                signup: "계정이 없으신가요? 지금 회원가입 하세요.",
                MISSING_INPUT_VALUE: "내용을 입력해 주세요",
                INVALID_LOGIN_CREDENTIAL: "사용자를 찾을 수 없거나 패스워드가 틀렸습니다.",
                logout: "로그아웃",
                select_endpoint: "APIendpoint를선택하고편집하세요",
                add_endpoint: "새로운APIendpoint를추가하세요",
                download_folder: "다운로드경로",
                no_folder_selected: "선택된폴더없음",
                select: "선택",
                add: "추가",
                apply: "적용",
                reset: "초기화",
                change: "변경",
                general: "일반",
                open_startup: "운영체제시작시APIplayer백그라운드에서열기",
                enable_sound: "사운드활성화하기",
                go_2_main: "메인페이지로가기",
                membership_balance: "멤버십잔여기간",
                cloud_balance: "트래픽잔액",
                days: "일",
                disclaimer: "면책조항",
                disclaimer_text: "본번역본은편의를위해제공되는것으로불일치하는내용이있을경우영문본이우선합니다.",
                disclaimer_text_2: "API플레이어는사용자가API연동을통해제3자미디어소스에서가져온미디어콘텐츠를재생할수있는소프트웨어제품을제공합니다.API플레이어는저작권침해자료불법포르노및이에국한되지않는기타불법콘텐츠에대해액세스권한을부여하는API를사용자가연동함으로인해발생하는법률위반에대해책임을지지않습니다.",
                understood: "이해했습니다",
                search_title: "타이틀로검색",
                search_actor: "배우로검색",
                subscribe_now: "이기능을사용하려면멤버십을구독해야합니다.",
                subscribe: "구독하기",
                yes: "네",
                no: "아니오",
                download_limit_3: "2개이상의타이틀을다운로드하면첫번째타이틀은자동으로플레이리스트에서삭제됩니다.하지만다운로드폴더에서언제든찾을수있습니다",
                welcome_tip_heading: "유용한팁!",
                welcome_tip_1: "키워드없이[Search]를누르면모든타이틀또는배우를볼수있습니다.",
                welcome_tip_2: "키보드에서Esc키를누르면언제든이전화면으로돌아갈수있습니다.",
                welcome_tip_3: "트래픽상황에따라다운로드속도가불안정할수있습니다.속도를개선하기위해지속적으로작업중입니다.",
                usecasettl: "API Player로 Full HD 비디오 시청",
                usecasettl1: "API Player는 외부 API로 가져온 모든 비디오 및 오디오 파일을 스트리밍 하는 오픈소스 미디어 플레이어입니다.",
                usecasettl2: "사용자는 설정 메뉴에서 API 연동을 위한 코드를 편집할 수 있습니다.",
                usecasettl3: "아래는 imdb7 API와의 연동을 위한 샘플코드입니다.",
                usecasettl4: "어떻게 작동하는지 테스트 하려면 이 단계를 따르세요.",
                usecasettl5: "1. Windows 앱 또는 Android 앱을 다운로드 하세요 (현재 MS store에는 하위 버전의 API Player Lite가 게시되어 있습니다. 아래 노란색 [Download link 2] 버튼을 눌러 상위 버전 앱을 다운 받는 것을 권장합니다.)",
                usecasettl6: "API Player Lite (Windows)",
                usecasettl7: "새로운✨ API Player Lite (Windows)",
                usecasettl8: "Flix1 (안드로이드)",
                usecasettl9: "다운로드 링크",
                usecasettl10: "다운로드 링크2",
                usecasettl11: "2. 아래 버튼을 클릭하세요.",
                usecasettl12: "모든 연령을 위한 API복사",
                usecasettl13: "18세 이상용 API 복사",
                usecasettl14: "3. 설정으로 이동 - API 연동 코드를 붙여넣으세요.",
                usecasettl15: "다른 코드가 이미 존재하는 경우 미리 백업하시기 바랍니다.",
                usecasettl16: "이제 나만의 미디어 플레이어가 생겼습니다! 즐겨 보세요.",
                usecasettl17: "Flix1 (iOS)",
                label: "한국어",
                find_more_subs: "비디오 플레이어의 오른쪽 하단에 있는 설정 아이콘을 클릭하면 귀하의 언어로 된 더 많은 자막을 찾을 수 있습니다.",
                WATCH_ON_PHONE: "휴대폰에서 동영상을 시청하려면 이 단계를 따르세요.",
                DOWNLOAD_APIPL: "1. Windows PC에 API Player Lite 최신버전을 다운로드합니다.",
                ENTER_API: "2. API Player Lite의 설정 페이지에서 API endpoint를 입력합니다.",
                SCAN_QR: "3. 작품 목록이 로드되면 휴대폰으로 QR 코드를 스캔합니다.",
                WEBSITE_OPEN: "4. 휴대폰에서 API endpoint의 웹사이트가 열립니다.",
                ENJOY_VIDEO: "5. 동영상을 즐겨보세요!",
                STILL_WANT_MULTIFLIX: "✅ 이전 버전의 Android 앱을 사용하려면 왼쪽의 Android 아이콘을 클릭하세요.",
                usecase: "앱 다운로드",
                release_date: "출시일",
                duration: "비디오 길이",
                Size: "크기",
                Maker: "제작사",
                also_stared: "출연작",
                titles_by_same_maker: "동일 제작사 작품",
                "most popular": "인기작",
                "top rated": "최고평점",
                copy_magnet_uri: "마그넷 링크 복사",
                start_downloading: "다운로드를 시작",
                download_subtitle: "자막 다운로드",
                translate_subtitle: "자막 번역",
                loading_also_starred: "다른 출연작을 로딩 중...",
                censored: "유모",
                uncensored: "노모",
                leaked: "모자이크 파괴",
                fc2: "FC2",
                download_available_or_translate: "자막 다운로드 또는 번역"
            }, zh: {
                popular: "热门作品",
                top_rated: "最佳评分",
                new: "最新作品",
                random: "随机",
                category: "类别",
                genre: "类型",
                country: "国家",
                all: "全部",
                watch_only: "仅限观看",
                title: "作品",
                actor: "演员",
                keyword: "关键词",
                search: "搜索",
                listing: "排序方式",
                feature: "特点",
                type: "类别",
                filter: "过滤",
                total: "总计",
                page: "页次",
                download: "下载",
                copy_download_link: "复制下载链接",
                install_xunlei: "请安装迅雷并再次点击此按钮",
                download_link_copied: "下载链接已复制！",
                watch_online: "在线观看",
                episode_list: "剧集列表",
                cast: "表演者",
                trailers: "预告片",
                snapshots: "快照",
                favorite_list: "最喜欢的列表",
                playlist: "播放列表",
                video_duration: "视频时长",
                imdb_score: "IMDB 评分",
                file_size: "文件大小",
                download_speed: "下载速度",
                download_progress: "下载进度",
                download_status: "下载状态",
                pause: "暂停",
                resume: "继续",
                remove_from_list: "从列表中删除",
                delete_from_storage: "从存储器中删除",
                title_info: "标题信息",
                settings: "设置",
                my_account: "我的账户",
                email: "电子邮件",
                language: "语言",
                app: "应用",
                subtitle: "字幕",
                sub_from_local: "从存储器打开字幕",
                sub_from_server: "从服务器下载字幕",
                turn_off_sub: "关闭字幕",
                server_error: "出了些问题",
                server_error2: "请尝试重新打开应用",
                logout_device: "您现在已使用此设备注销",
                logout_device2: "因为您的帐户已使用其他设备登录",
                login_again: "再次登录",
                later: "我稍后会做",
                login: "登录",
                password: "密码",
                forgot_password: "忘记密码？",
                signup: "没有账户？立即注册。",
                MISSING_INPUT_VALUE: "请输入值",
                INVALID_LOGIN_CREDENTIAL: "找不到用户或密码错误",
                logout: "登出",
                select_endpoint: "添加并选择应用程序接口端点",
                add_endpoint: "添加新的 API 端点",
                download_folder: "下载位置",
                no_folder_selected: "未选择文件夹",
                select: "选择",
                add: "增加",
                apply: "申请",
                reset: "重置",
                change: "改变",
                general: "一般的",
                open_startup: "在操作系统启动时从后台打开API Player",
                enable_sound: "启用声音",
                go_2_main: "转到主页",
                membership_balance: "会员余额",
                cloud_balance: "交通平衡",
                days: "天",
                disclaimer: "免责声明",
                disclaimer_text: "提供此翻译仅是为了帮助用户更好地理解。 如果与英文版本不一致则以英文版本为准。",
                disclaimer_text_2: "API播放器提供了一种软件产品该产品使用户能够播放通过其自身的API集成从第三方媒体源获取的媒体内容。 API播放器对用户自行与任何允许访问非法内容（例如侵犯版权的材料非法色情内容和不限于此的内容）的API集成而造成的任何违法行为概不负责。",
                understood: "明白了",
                search_title: "按标题搜索",
                search_actor: "按演员搜索",
                subscribe_now: "要使用此功能您必须购买会员资格。",
                subscribe: "购买会员资格",
                yes: "是的",
                no: "不",
                download_limit_3: "如果您下载超过 2 个标题第一个标题将自动从播放列表中删除。 但是您可以随时在下载文件夹中找到它",
                welcome_tip_heading: "有用的提示！",
                welcome_tip_1: "您可以通过单击 [Search] 按钮查看所有标题或演员无需关键字。",
                welcome_tip_2: "根据交通状况下载速度可能不稳定。 我们一直在努力改进它。",
                welcome_tip_3: "您可以随时通过按键盘上的 Esc 键返回上一屏幕。",
                usecasettl: "通过 API 播放器观看全高清视频",
                usecasettl1: "API 播放器是一个开源媒体播放器可流式传输由开放 API 获取的任何视频和音频文件。",
                usecasettl2: "用户可以在设置菜单中编辑与 API 集成的代码。",
                usecasettl3: "下面是与 imdb7 API 集成的示例代码。",
                usecasettl4: "按照此步骤测试它是如何工作的。",
                usecasettl5: "1. 下载 Windows 应用程序或 Android / iOS 应用程序 (⚠️如果您无法在手机上下载 Flix1，请使用 Chrome 或 Edge 下载。否则，请在电脑上下载，然后传输到手机。)",
                usecasettl6: "API Player Lite (Windows)",
                usecasettl7: "新 ✨API Player Lite (Windows)",
                usecasettl8: "Flix1 (Android)",
                usecasettl9: "下载链接",
                usecasettl10: "下载链接 2",
                usecasettl11: "2.点击下面的按钮。",
                usecasettl12: "复制适用于所有年龄段的 API (imdb7.plus)",
                usecasettl13: "复制 18+ 的 API (manko.fun)",
                usecasettl14: "3. 转到设置 - 编辑 API 集成并粘贴代码。",
                usecasettl15: "如果已经存在其他代码请提前备份。",
                usecasettl16: "现在你有了自己的媒体播放器！尽情享受吧。",
                usecasettl17: "Flix1 (iOS)",
                label: "简体中文",
                find_more_subs: "您可以通过单击视频播放器右下角的设置图标找到更多您语言的字幕。",
                WATCH_ON_PHONE: "按照此步骤在手机上观看视频。",
                DOWNLOAD_APIPL: "1.在 Windows PC 上下载最新版本的 API Player Lite。",
                ENTER_API: "2.在 API Player Lite 的设置页面中输入 API 端点。",
                SCAN_QR: "3.标题列表加载完毕后，用手机扫描二维码。",
                WEBSITE_OPEN: "4.在手机上打开 API 端点的网站。",
                ENJOY_VIDEO: "5. 欣赏您的视频！",
                STILL_WANT_MULTIFLIX: "✅ 如果您想使用我们的旧版本 Android 应用程序，请单击左侧的 Android 图标。",
                usecase: "下载应用程序",
                release_date: "发布日期",
                duration: "视频时长",
                Size: "尺寸",
                Maker: "制作公司",
                also_stared: "出场",
                titles_by_same_maker: "同一家制作公司的作品",
                "most popular": "热门作品",
                "top rated": "最佳评分",
                copy_magnet_uri: "复制磁力链接",
                start_downloading: "开始下载",
                download_subtitle: "下载字幕",
                translate_subtitle: "翻译字幕",
                loading_also_starred: "正在加载其他作品...",
                censored: "马赛克",
                uncensored: "无马赛克",
                leaked: "马赛克已移除",
                fc2: "FC2",
                download_available_or_translate: "下载或翻译字幕"
            }, ja: {
                popular: "人気",
                top_rated: "最高評価",
                new: "新作",
                random: "ランダム",
                category: "カテゴリー",
                genre: "ジャンル",
                country: "国名",
                all: "全て",
                watch_only: "見るだけ",
                title: "作品",
                actor: "俳優",
                keyword: "キーワード",
                search: "探索",
                listing: "並べ替え順",
                feature: "特徴",
                type: "タイプ",
                filter: "フィルター",
                total: "合計",
                page: "ペイ",
                download: "ダウンロード",
                copy_download_link: "ダウンロードリンクをコピー",
                install_xunlei: "Xunleiをインストールして、このボタンをもう一度クリックしてください。",
                download_link_copied: "ダウンロードリンクがコピーされている！",
                watch_online: "オンライン視聴",
                episode_list: "エピソードリスト",
                cast: "出演者",
                trailers: "予告編",
                snapshots: "スナップ写真",
                favorite_list: "お気に入りリスト",
                playlist: "プレイリスト",
                video_duration: "動画時間",
                imdb_score: "IMDbスコア",
                file_size: "ファイルサイズ",
                download_speed: "ダウンロード速度",
                download_progress: "ダウンロードの進捗",
                download_status: "ダウンロード状況",
                pause: "ポーズ",
                resume: "再開",
                remove_from_list: "リストから削除",
                delete_from_storage: "ストレージから削除",
                title_info: "作品情報",
                settings: "設定",
                my_account: "マイアカウント",
                email: "メール",
                language: "言語",
                app: "アプリ",
                subtitle: "字幕",
                sub_from_local: "字幕をストレージから開く",
                sub_from_server: "字幕をサーバーからダウンロード",
                turn_off_sub: "字幕をオフにする",
                server_error: "「何かがうまくいかなかった",
                server_error2: "アプリを再度開いてみてください.",
                logout_device: "このデバイスからログアウトしました",
                logout_device2: "アカウントが別のデバイスでログインしているため.",
                login_again: "再度ログイン",
                later: "後でやります",
                login: "ログイン",
                password: "パスワード",
                forgot_password: "パスワードをお忘れですか?",
                signup: "今すぐ申し込む",
                MISSING_INPUT_VALUE: "値を入力してください",
                INVALID_LOGIN_CREDENTIAL: "パスワードが見つからないか間違っている    ",
                logout: "ログアウト",
                select_endpoint: "APIエンドポイントの追加と選択",
                add_endpoint: "新しいAPIエンドポイントを追加する",
                download_folder: "ダウンロード場所",
                no_folder_selected: "選択されたフォルダなし",
                select: "選択",
                add: "追加",
                apply: "「適用」",
                reset: "初期化",
                change: "変化する",
                general: "「一般」",
                open_startup: "OSの起動時にバックグラウンドからAPIPlayerを開きます",
                enable_sound: "サウンドを有効にする",
                go_2_main: "メインページに移動",
                membership_balance: "会員残高",
                cloud_balance: "トラフィック・バランス",
                days: "日",
                disclaimer: "免責事項",
                disclaimer_text: "本翻訳は便宜のために提供されるもので矛盾する内容がある場合、英語版が優先します。",
                disclaimer_text_2: "APIプレーヤーは、ユーザーが独自のAPI統合によってサードパーティのメディアソースからフェッチされたメディアコンテンツを再生できるようにするソフトウェア製品を提供します。 APIプレーヤーは、著作権を侵害する素材、違法なポルノなど、それらに限定されない違法なコンテンツへのアクセスを許可するAPIとのユーザー自身の統合によって引き起こされた、法律違反について責任を負いません.",
                understood: "理解した",
                search_title: "タイトルで検索",
                search_actor: "俳優から探す",
                subscribe_now: "この機能を使用するには、購読する必要があります。",
                subscribe: "サブスクライブ",
                yes: "はい",
                no: "いいえ",
                download_limit_3: "2つ以上のタイトルをダウンロードすると、最初のタイトルがプレイリストから自動的に削除されます。 ただし、ダウンロードフォルダにはいつでも見つけることができます",
                welcome_tip_heading: "役立つヒント！",
                welcome_tip_1: "キーワードなしで[Search]ボタンをクリックすると、すべてのタイトルや俳優を見ることができます。",
                welcome_tip_2: "交通状況によりダウンロード速度が不安定になる場合があります。 私たちは継続的にそれを改善するために取り組んでいます。",
                welcome_tip_3: "キーボードのEscキーを押すと、いつでも前の画面に戻ることができます。",
                usecasettl: "API プレーヤーでフル HD ビデオを視聴",
                usecasettl1: "API プレーヤーは、オープン API によって取得されたビデオおよびオーディオ ファイルをストリーミングするオープン ソース メディア プレーヤーです。",
                usecasettl2: "ユーザーは設定メニューで API と統合するコードを編集できます。",
                usecasettl3: "以下は imdb7 API と統合するためのサンプル コードです。",
                usecasettl4: "この手順に従って動作をテストします。",
                usecasettl5: "1. Windows アプリまたは Android / iOS アプリをダウンロードします (API Player Lite の下位バージョンは現在 MS ストアで入手できます。下の黄色の [ダウンロード リンク 2] ボタンをクリックして上位バージョンをダウンロードすることをお勧めします。)",
                usecasettl6: "API Player Lite (Windows)",
                usecasettl7: "新しい✨API Player Lite (Windows)",
                usecasettl8: "Flix1 (Android)",
                usecasettl9: "ダウンロードリンク 1",
                usecasettl10: "ダウンロードリンク 2",
                usecasettl11: "2. 下のボタンをクリックします。",
                usecasettl12: "すべての年齢層向けに API をコピー",
                usecasettl13: "18 歳以上向けの API をコピー",
                usecasettl14: "3. [設定] - [API 統合の編集] に移動し、コードを貼り付けます。",
                usecasettl15: "他のコードが既に存在する場合は、事前にバックアップしてください。",
                usecasettl16: "これで、独自のメディア プレーヤーが完成しました。お楽しみください。",
                usecasettl17: "Flix1 (iOS)",
                label: "日本語",
                find_more_subs: "ビデオプレーヤーの右下隅にある設定アイコンをクリックすると、お使いの言語の字幕をさらに見つけることができます。",
                WATCH_ON_PHONE: "携帯電話でビデオを見るには、この手順に従ってください。",
                DOWNLOAD_APIPL: "1.Windows PCでAPI Player Liteの最新バージョンをダウンロードしてください。",
                ENTER_API: "2.API Player Liteの設定ページにAPIエンドポイントを入力します。",
                SCAN_QR: "3.タイトルリストが読み込まれたら、携帯電話でQRコードをスキャンします。",
                WEBSITE_OPEN: "4.APIエンドポイントのウェブサイトが携帯電話で開かれる。",
                ENJOY_VIDEO: "5. ビデオをお楽しみください!",
                STILL_WANT_MULTIFLIX: "✅ 古いバージョンの Android アプリを使用したい場合は、左側の Android アイコンをクリックしてください。",
                usecase: "アプリをダウンロード",
                release_date: "発売日",
                duration: "ビデオの長さ",
                Size: "サイズ",
                Maker: "メーカー",
                also_stared: "出演作",
                titles_by_same_maker: "同じ制作会社の作品",
                "most popular": "人気",
                "top rated": "最高評価",
                copy_magnet_uri: "マグネットリンクのコピー",
                start_downloading: "ダウンロードを開始",
                download_subtitle: "字幕をダウンロード",
                translate_subtitle: "字幕を翻訳",
                loading_also_starred: "他の出演作を読み込んでいます...",
                censored: "修正",
                uncensored: "無修正",
                leaked: "削除",
                fc2: "FC2",
                download_available_or_translate: "字幕をダウンロードまたは翻訳する"
            }, id: {
                popular: "Populer",
                top_rated: "Peringkat Teratas",
                new: "Baru",
                random: "Acak",
                category: "Kategori",
                genre: "Genre",
                country: "Negara",
                all: "Semua",
                watch_only: "Hanya Tonton",
                title: "Judul",
                actor: "Aktor",
                keyword: "Kata kunci",
                search: "Mencari",
                listing: "Daftar",
                feature: "Fitur",
                type: "Jenis",
                filter: "Menyaring",
                total: "Total",
                page: "halaman",
                download: "Unduh",
                copy_download_link: "Salin Tautan Unduhan",
                install_xunlei: "Silakan instal Xunlei dan klik tombol ini lagi",
                download_link_copied: "Tautan unduhan disalin!",
                watch_online: "Tonton Online",
                episode_list: "Daftar Episode",
                cast: "Pemeran",
                trailers: "Trailer",
                snapshots: "Jepretan",
                favorite_list: "Daftar favorit",
                playlist: "Daftar Putar",
                video_duration: "Durasi Video",
                imdb_score: "Skor IMDb",
                file_size: "Ukuran Berkas",
                download_speed: "Kecepatan Unduh",
                download_progress: "Unduh Kemajuan",
                download_status: "Status Unduhan",
                pause: "Berhenti sebentar",
                resume: "Melanjutkan",
                remove_from_list: "Hapus dari Daftar",
                delete_from_storage: "Hapus dari Penyimpanan",
                title_info: "Info judul",
                settings: "Pengaturan",
                my_account: "Akun Saya",
                email: "e-mail",
                language: "Bahasa",
                app: "Aplikasi",
                subtitle: "Subjudul",
                sub_from_local: "Buka subtitle dari penyimpanan",
                sub_from_server: "Unduh subtitle dari server",
                turn_off_sub: "Matikan subtitle",
                server_error: "Ada yang salah",
                server_error2: "Silakan coba membuka kembali aplikasi.",
                logout_device: "Anda sekarang keluar dari perangkat ini",
                logout_device2: "karena akun Anda telah masuk ke 2 perangkat lain.",
                login_again: "Masuk lagi",
                later: "Aku akan melakukannya nanti",
                login: "Login",
                password: "Kata sandi",
                forgot_password: "Lupa kata sandi?",
                signup: "Daftar sekarang.",
                MISSING_INPUT_VALUE: "Silakan masukkan nilai",
                INVALID_LOGIN_CREDENTIAL: "Pengguna tidak ditemukan atau kata sandi salah",
                logout: "Keluar",
                select_endpoint: "Pilih titik akhir API",
                add_endpoint: "Tambahkan titik akhir API baru",
                download_folder: "Lokasi Unduhan",
                no_folder_selected: "Tidak Ada Folder yang Dipilih",
                select: "Memilih",
                add: "Menambahkan",
                apply: "Menerapkan",
                reset: "Mengatur ulang",
                change: "Mengubah",
                general: "Umum",
                open_startup: "Buka API Player dari latar belakang saat OS dimulai",
                enable_sound: "Aktifkan suara",
                go_2_main: "Buka halaman utama",
                membership_balance: "Saldo keanggotaan",
                cloud_balance: "Keseimbangan Lalu Lintas",
                days: "hari",
                disclaimer: "Penafian",
                disclaimer_text: "Pemutar API menyediakan produk perangkat lunak yang memungkinkan pengguna untuk memutar konten media yang diambil dari sumber media pihak ketiga melalui integrasi API miliknya sendiri.",
                disclaimer_text_2: "Pemain API tidak bertanggung jawab atas pelanggaran hukum apa pun yang disebabkan oleh integrasi pengguna dengan API apa pun yang memberikan akses ke konten ilegal seperti materi yang melanggar hak cipta, pornografi ilegal, dan lainnya yang tidak terbatas pada itu.",
                understood: "Dipahami",
                search_title: "Cari berdasarkan judul",
                search_actor: "Cari berdasarkan aktris",
                subscribe_now: "Anda harus berlangganan keanggotaan untuk menggunakan fitur ini",
                subscribe: "Berlangganan",
                yes: "Ya",
                no: "TIDAK",
                download_limit_3: "Jika Anda mengunduh lebih dari 2 judul, judul pertama akan otomatis dihapus dari daftar putar. Namun, Anda dapat menemukannya di folder unduhan kapan saja.",
                welcome_tip_heading: "Tips yang berguna!",
                welcome_tip_1: "Anda dapat melihat semua judul atau aktor dengan mengklik tombol [Cari] tanpa kata kunci.",
                welcome_tip_2: "Kecepatan unduh mungkin tidak stabil tergantung kondisi lalu lintas. Kami terus berupaya memperbaikinya.",
                welcome_tip_3: "Anda selalu dapat kembali ke layar sebelumnya dengan menekan tombol Esc di keyboard Anda.",
                usecasettl: "Tonton video Full HD oleh API Player",
                usecasettl1: "Pemutar API adalah pemutar media sumber terbuka yang mengalirkan berkas video & audio apa pun yang diambil melalui API terbuka.",
                usecasettl2: "Pengguna dapat mengedit kode untuk integrasi dengan API di menu pengaturan.",
                usecasettl3: "Di bawah ini adalah contoh kode untuk integrasi dengan API imdb7.",
                usecasettl4: "Ikuti langkah ini untuk menguji cara kerjanya.",
                usecasettl5: "1. Unduh aplikasi Windows atau Android/iOS (Versi API Player Lite yang lebih rendah saat ini tersedia di MS Store. Kami sarankan mengunduh versi yang lebih tinggi dengan mengeklik tombol kuning [Tautan unduhan 2] di bawah.)",
                usecasettl6: "API Player Lite (Windows)",
                usecasettl7: "✨API Player Lite Baru (Windows)",
                usecasettl8: "Flix1 (Android)",
                usecasettl9: "Tautan unduhan",
                usecasettl10: "Tautan unduhan 2",
                usecasettl11: "2. Klik tombol di bawah ini.",
                usecasettl12: "Salin API untuk semua umur",
                usecasettl13: "Salin API untuk 18+",
                usecasettl14: "3. Buka pengaturan - Edit integrasi API dan tempel kode.",
                usecasettl15: "Jika sudah ada kode lainnya, harap buat cadangan terlebih dahulu.",
                usecasettl16: "Sekarang Anda punya pemutar media sendiri! Selamat menikmati.",
                usecasettl17: "Flix1 (iOS)",
                label: "Bahasa inggris",
                find_more_subs: "Anda dapat menemukan lebih banyak subtitle dalam bahasa Anda dengan mengklik ikon pengaturan di sudut kanan bawah pemutar video.",
                WATCH_ON_PHONE: "Ikuti langkah ini untuk menonton video di ponsel Anda.",
                DOWNLOAD_APIPL: "1. Unduh versi terbaru API Player Lite di PC Windows Anda.",
                ENTER_API: "2. Masukkan titik akhir API di halaman pengaturan API Player Lite.",
                SCAN_QR: "3. Pindai kode QR dengan ponsel Anda setelah daftar judul dimuat.",
                WEBSITE_OPEN: "4. Situs web titik akhir API Anda dibuka di ponsel Anda.",
                ENJOY_VIDEO: "5. Nikmati video Anda!",
                STILL_WANT_MULTIFLIX: "✅ Jika Anda ingin menggunakan aplikasi Android versi lama kami, klik ikon Android di sebelah kiri.",
                usecase: "Unduh aplikasi",
                release_date: "Tanggal rilis",
                duration: "Durasi Video",
                Size: "Ukuran",
                Maker: "Pembuat",
                also_stared: "Juga dibintangi",
                titles_by_same_maker: "Judul dari pembuat yang sama",
                "most popular": "Populer",
                "top rated": "Peringkat Teratas",
                copy_magnet_uri: "Salin URI magnet",
                start_downloading: "Mulai mengunduh",
                download_subtitle: "Unduh subtitle",
                translate_subtitle: "Terjemahkan subtitle",
                loading_also_starred: "Memuat film berbintang...",
                censored: "Disensor",
                uncensored: "Tanpa Sensor",
                leaked: "Dibocorkan",
                fc2: "FC2",
                download_available_or_translate: "Unduh atau terjemahkan subtitle"
            }, ms: {
                popular: "Popular",
                top_rated: "Tertinggi",
                new: "baru",
                random: "rawak",
                category: "kategori",
                genre: "Genre",
                country: "Negara",
                all: "Semua",
                watch_only: "Tonton Sahaja",
                title: "Tajuk",
                actor: "pelakon",
                keyword: "Kata kunci",
                search: "Cari",
                listing: "Penyenaraian",
                feature: "Ciri",
                type: "taip",
                filter: "Penapis",
                total: "Jumlah",
                page: "muka surat",
                download: "Muat turun",
                copy_download_link: "Salin Pautan Muat Turun",
                install_xunlei: "Sila pasang Xunlei dan klik butang ini sekali lagi",
                download_link_copied: "Pautan muat turun disalin!",
                watch_online: "Tonton Dalam Talian",
                episode_list: "Senarai Episod",
                cast: "Pelakon",
                trailers: "Treler",
                snapshots: "Syot kilat",
                favorite_list: "Senarai kegemaran",
                playlist: "Senarai main",
                video_duration: "Tempoh Video",
                imdb_score: "Skor IMDb",
                file_size: "Saiz Fail",
                download_speed: "Kelajuan Muat Turun",
                download_progress: "Muat Turun Kemajuan",
                download_status: "Status Muat Turun",
                pause: "jeda",
                resume: "Sambung semula",
                remove_from_list: "Alih keluar daripada Senarai",
                delete_from_storage: "Padam daripada Storan",
                title_info: "Maklumat tajuk",
                settings: "tetapan",
                my_account: "Akaun Saya",
                email: "emel",
                language: "Bahasa",
                app: "Apl",
                subtitle: "Sari kata",
                sub_from_local: "Buka sari kata daripada storan",
                sub_from_server: "Muat turun sari kata daripada pelayan",
                turn_off_sub: "Matikan sari kata",
                server_error: "Sesuatu telah berlaku",
                server_error2: "Sila cuba buka semula apl.",
                logout_device: "Anda kini log keluar daripada peranti ini",
                logout_device2: "kerana akaun anda telah log masuk ke 2 peranti lain.",
                login_again: "Log masuk semula",
                later: "Saya akan buat nanti",
                login: "Log masuk",
                password: "Kata laluan",
                forgot_password: "Terlupa kata laluan?",
                signup: "Daftar sekarang.",
                MISSING_INPUT_VALUE: "Sila masukkan nilai",
                INVALID_LOGIN_CREDENTIAL: "Pengguna tidak ditemui atau kata laluan yang salah    ",
                logout: "Log keluar",
                select_endpoint: "Pilih titik akhir API",
                add_endpoint: "Tambah titik akhir API Baharu",
                download_folder: "Lokasi Muat Turun",
                no_folder_selected: "Tiada Folder Dipilih",
                select: "Pilih",
                add: "Tambah",
                apply: "Mohon",
                reset: "Tetapkan semula",
                change: "Berubah",
                general: "Umum",
                open_startup: "Buka Pemain API dari latar belakang sebagai permulaan OS",
                enable_sound: "Dayakan bunyi",
                go_2_main: "Pergi ke halaman utama",
                membership_balance: "Baki keahlian",
                cloud_balance: "Imbangan Trafik",
                days: "hari",
                disclaimer: "Penafian",
                disclaimer_text: "Pemain API menyediakan produk perisian yang membolehkan pengguna memainkan kandungan media yang diambil daripada sumber media pihak ketiga melalui penyepaduan APInya sendiri.",
                disclaimer_text_2: "Pemain API tidak bertanggungjawab atas sebarang pelanggaran undang-undang yang disebabkan oleh penyepaduan pengguna sendiri dengan mana-mana API yang memberikan akses kepada kandungan haram seperti bahan pornografi haram yang melanggar hak cipta dan lain-lain yang tidak terhad kepada mereka.",
                understood: "Difahamkan",
                search_title: "Cari mengikut tajuk",
                search_actor: "Carian mengikut pelakon",
                subscribe_now: "Anda harus melanggan keahlian untuk menggunakan ciri ini",
                subscribe: "Langgan",
                yes: "ya",
                no: "Tidak",
                download_limit_3: "Jika anda memuat turun lebih daripada 2 tajuk, tajuk pertama akan dialih keluar secara automatik daripada senarai main. Tetapi anda boleh menemuinya dalam folder muat turun anda pada bila-bila masa",
                welcome_tip_heading: "Petua berguna!",
                welcome_tip_1: "Anda boleh melihat semua tajuk atau pelakon dengan mengklik butang [Cari] tanpa kata kunci.",
                welcome_tip_2: "Kelajuan muat turun mungkin tidak stabil mengikut keadaan trafik. Kami terus berusaha untuk memperbaikinya.",
                welcome_tip_3: "Anda sentiasa boleh kembali ke skrin sebelumnya dengan menekan kekunci Esc dalam papan kekunci anda.",
                usecasettl: "Tonton video HD Penuh oleh Pemain API",
                usecasettl1: "Pemain API ialah pemain media sumber terbuka yang menstrim sebarang fail video & audio yang diambil oleh API terbuka.",
                usecasettl2: "Pengguna boleh mengedit kod untuk penyepaduan dengan API dalam menu tetapan.",
                usecasettl3: "Di bawah ialah contoh kod untuk penyepaduan dengan imdb7 API.",
                usecasettl4: "Ikuti langkah ini untuk menguji cara ia berfungsi.",
                usecasettl5: "1. Muat turun apl Windows atau apl Android / iOS (Versi API Player Lite yang lebih rendah kini tersedia di MS Store. Kami mengesyorkan anda memuat turun versi yang lebih tinggi dengan mengklik butang kuning [Muat turun pautan 2] di bawah.)",
                usecasettl6: "API Player Lite (Windows)",
                usecasettl7: "Baharu ✨API Player Lite (Windows)",
                usecasettl8: "Flix1 (Android)",
                usecasettl9: "pautan muat turun",
                usecasettl10: "Muat turun pautan 2",
                usecasettl11: "2. Klik butang di bawah.",
                usecasettl12: "Salin API untuk semua peringkat umur",
                usecasettl13: "Salin API untuk 18+",
                usecasettl14: "3. Pergi ke tetapan - Edit integrasi API dan tampal kod.",
                usecasettl15: "Jika beberapa kod lain sudah wujud, sila buat sandaran terlebih dahulu.",
                usecasettl16: "Kini anda mempunyai pemain media anda sendiri! Nikmatilah.",
                usecasettl17: "Flix1 (iOS)",
                label: "Inggeris",
                find_more_subs: "Anda boleh mendapatkan lebih banyak sari kata dalam bahasa anda dengan mengklik ikon tetapan di sudut kanan bawah pemain video.",
                WATCH_ON_PHONE: "Ikuti langkah ini untuk menonton video pada telefon anda.",
                DOWNLOAD_APIPL: "1. Muat turun versi terkini API Player Lite pada PC Windows anda.",
                ENTER_API: "2. Masukkan titik akhir API dalam halaman tetapan API Player Lite.",
                SCAN_QR: "3. Imbas kod QR dengan telefon anda sebaik sahaja senarai tajuk dimuatkan.",
                WEBSITE_OPEN: "4. Tapak web titik akhir API anda dibuka pada telefon anda.",
                ENJOY_VIDEO: "5. Nikmati video anda!",
                STILL_WANT_MULTIFLIX: "✅ Jika anda ingin menggunakan aplikasi Android versi lama kami, klik ikon Android di sebelah kiri.",
                usecase: "Muat turun aplikasi",
                release_date: "Tarikh keluaran",
                duration: "Tempoh Video",
                Size: "Saiz",
                Maker: "pembuat",
                also_stared: "Juga dibintangi",
                titles_by_same_maker: "Tajuk oleh pembuat yang sama",
                "most popular": "Popular",
                "top rated": "Tertinggi",
                copy_magnet_uri: "Salin URI magnet",
                start_downloading: "Mula memuat turun",
                download_subtitle: "Muat turun sari kata",
                translate_subtitle: "Terjemah sari kata",
                loading_also_starred: "Memuatkan filem berbintang...",
                censored: "ditapis",
                uncensored: "Tidak ditapis",
                leaked: "Bocor",
                fc2: "FC2",
                download_available_or_translate: "Muat turun atau terjemah sari kata"
            }, tw: {
                popular: "受歡迎的",
                top_rated: "最高評分",
                new: "新的",
                random: "隨機的",
                category: "類別",
                genre: "類型",
                country: "國家",
                all: "全部",
                watch_only: "僅限觀看",
                title: "標題",
                actor: "演員",
                keyword: "關鍵字",
                search: "搜尋",
                listing: "上市",
                feature: "特徵",
                type: "類型",
                filter: "篩選",
                total: "全部的",
                page: "頁面",
                download: "下載",
                copy_download_link: "複製下載連結",
                install_xunlei: "請安裝迅雷並再次點擊此按鈕",
                download_link_copied: "下載連結已複製！",
                watch_online: "在線觀看",
                episode_list: "劇集列表",
                cast: "投擲",
                trailers: "預告片",
                snapshots: "快照",
                favorite_list: "收藏列表",
                playlist: "播放清單",
                video_duration: "影片時長",
                imdb_score: "IMDb評分",
                file_size: "文件大小",
                download_speed: "下載速度",
                download_progress: "下載進度",
                download_status: "下載狀態",
                pause: "暫停",
                resume: "恢復",
                remove_from_list: "從清單中刪除",
                delete_from_storage: "從儲存中刪除",
                title_info: "標題訊息",
                settings: "設定",
                my_account: "我的帳戶",
                email: "電子郵件",
                language: "語言",
                app: "應用程式",
                subtitle: "字幕",
                sub_from_local: "從儲存開啟字幕",
                sub_from_server: "從伺服器下載字幕",
                turn_off_sub: "關閉字幕",
                server_error: "出了點問題",
                server_error2: "請嘗試重新開啟應用程式。",
                logout_device: "您現在已從此裝置登出",
                logout_device2: "因為您的帳號已登入另外 2 台裝置。",
                login_again: "重新登入",
                later: "我稍後會做",
                login: "登入",
                password: "密碼",
                forgot_password: "忘記密碼？",
                signup: "立即註冊。",
                MISSING_INPUT_VALUE: "請輸入數值",
                INVALID_LOGIN_CREDENTIAL: "未找到使用者或密碼錯誤",
                logout: "登出",
                select_endpoint: "選擇 API 端點",
                add_endpoint: "新增新的 API 端點",
                download_folder: "下載位置",
                no_folder_selected: "未選擇資料夾",
                select: "選擇",
                add: "添加",
                apply: "申請",
                reset: "重置",
                change: "改變",
                general: "一般的",
                open_startup: "作業系統啟動時從背景開啟 API 播放器",
                enable_sound: "啟用聲音",
                go_2_main: "轉至首頁",
                membership_balance: "會員餘額",
                cloud_balance: "流量平衡",
                days: "天",
                disclaimer: "免責聲明",
                disclaimer_text: "API 播放器提供一種軟體產品，使用戶能夠透過自己的 API 整合播放從第三方媒體來源取得的媒體內容。",
                disclaimer_text_2: "API 播放器不對使用者自行整合任何 API 而導致存取非法內容（例如侵犯版權的資料、非法色情內容等）而造成的任何違法行為負責。",
                understood: "明白",
                search_title: "按標題搜尋",
                search_actor: "按女演員搜尋",
                subscribe_now: "您需要訂閱會員資格才能使用此功能",
                subscribe: "訂閱",
                yes: "是的",
                no: "不",
                download_limit_3: "如果您下載超過 2 部影片，第一部影片將自動從播放清單中移除。但您可以隨時在下載資料夾中找到它。",
                welcome_tip_heading: "有用的提示！",
                welcome_tip_1: "點擊[搜尋]按鈕，不輸入關鍵字，即可查看所有標題或演員。",
                welcome_tip_2: "下載速度可能會因流量狀況而不穩定。我們正在不斷努力改進。",
                welcome_tip_3: "您可以隨時按下鍵盤上的 Esc 鍵返回上一畫面。",
                usecasettl: "透過 API Player 觀看全高清視頻",
                usecasettl1: "API 播放器是一個開源媒體播放器，可串流傳輸透過開放 API 取得的任何視訊和音訊檔案。",
                usecasettl2: "使用者可以在設定選單中編輯與 API 整合的程式碼。",
                usecasettl3: "以下是與 imdb7 API 整合的範例程式碼。",
                usecasettl4: "請按照此步驟測試其工作原理。",
                usecasettl5: "1. 下載 Windows 應用程式或 Android / iOS 應用程式（目前 MS Store 上提供較低版本的 API Player Lite。我們建議您點擊下方黃色的 [下載連結 2] 按鈕下載更高版本。）",
                usecasettl6: "API Player Lite（Windows）",
                usecasettl7: "新的✨API Player Lite（Windows）",
                usecasettl8: "Flix1（安卓系統）",
                usecasettl9: "下載連結",
                usecasettl10: "下載連結2",
                usecasettl11: "2. 點選下面的按鈕。",
                usecasettl12: "複製適合所有年齡層的 API",
                usecasettl13: "18 歲以上適用的複製 API",
                usecasettl14: "3.進入設定-編輯API集成，貼上程式碼。",
                usecasettl15: "如果其他代碼已經存在，請提前備份。",
                usecasettl16: "現在您有了自己的媒體播放器！盡情享受吧。",
                usecasettl17: "Flix1（iOS）",
                label: "英語",
                find_more_subs: "您可以點擊視訊播放器右下角的設定圖示來找到更多您語言的字幕。",
                WATCH_ON_PHONE: "請按照此步驟即可在手機上觀看影片。",
                DOWNLOAD_APIPL: "1. 在您的 Windows PC 上下載最新版本的 API Player Lite。",
                ENTER_API: "2. 在 API Player Lite 的設定頁面中輸入 API 端點。",
                SCAN_QR: "3. 標題清單載入完成後，使用手機掃描二維碼。",
                WEBSITE_OPEN: "4. 您的 API 端點的網站在您的手機上開啟。",
                ENJOY_VIDEO: "5. 享受您的影片吧！",
                STILL_WANT_MULTIFLIX: "✅ 如果您想使用我們的舊版 Android 應用程序，請點擊左側的 Android 圖示。",
                usecase: "下載應用程式",
                release_date: "發布日期",
                duration: "影片時長",
                Size: "尺寸",
                Maker: "製造商",
                also_stared: "還主演",
                titles_by_same_maker: "同一廠商的作品",
                "most popular": "受歡迎的",
                "top rated": "最高評分",
                copy_magnet_uri: "複製磁力連結",
                start_downloading: "開始下載",
                download_subtitle: "下載字幕",
                translate_subtitle: "翻譯字幕",
                loading_also_starred: "正在加載星級電影...",
                censored: "審查",
                uncensored: "未經審查",
                leaked: "洩漏",
                fc2: "FC2",
                download_available_or_translate: "下載或翻譯字幕"
            }, th: {
                popular: "เป็นที่นิยม",
                top_rated: "อันดับสูงสุด",
                new: "ใหม่",
                random: "สุ่ม",
                category: "หมวดหมู่",
                genre: "ประเภท",
                country: "ประเทศ",
                all: "ทั้งหมด",
                watch_only: "ดูอย่างเดียว",
                title: "ชื่อ",
                actor: "นักแสดงชาย",
                keyword: "คำสำคัญ",
                search: "ค้นหา",
                listing: "รายการ",
                feature: "คุณสมบัติ",
                type: "พิมพ์",
                filter: "กรอง",
                total: "ทั้งหมด",
                page: "หน้า",
                download: "ดาวน์โหลด",
                copy_download_link: "คัดลอกลิงค์ดาวน์โหลด",
                install_xunlei: "โปรดติดตั้ง Xunlei และคลิกปุ่มนี้อีกครั้ง",
                download_link_copied: "ลิงค์ดาวน์โหลดถูกคัดลอกแล้ว!",
                watch_online: "ดูออนไลน์",
                episode_list: "รายชื่อตอน",
                cast: "หล่อ",
                trailers: "รถพ่วง",
                snapshots: "สแนปช็อต",
                favorite_list: "รายการโปรด",
                playlist: "เพลย์ลิสต์",
                video_duration: "ระยะเวลาของวิดีโอ",
                imdb_score: "คะแนน IMDb",
                file_size: "ขนาดไฟล์",
                download_speed: "ความเร็วในการดาวน์โหลด",
                download_progress: "ความคืบหน้าการดาวน์โหลด",
                download_status: "สถานะการดาวน์โหลด",
                pause: "หยุดชั่วคราว",
                resume: "ประวัติย่อ",
                remove_from_list: "ลบออกจากรายการ",
                delete_from_storage: "ลบออกจากที่เก็บข้อมูล",
                title_info: "ข้อมูลชื่อเรื่อง",
                settings: "การตั้งค่า",
                my_account: "บัญชีของฉัน",
                email: "อีเมล",
                language: "ภาษา",
                app: "แอป",
                subtitle: "คำบรรยาย",
                sub_from_local: "เปิดคำบรรยายจากที่เก็บข้อมูล",
                sub_from_server: "ดาวน์โหลดคำบรรยายจากเซิร์ฟเวอร์",
                turn_off_sub: "ปิดคำบรรยาย",
                server_error: "มีบางอย่างผิดพลาดเกิดขึ้น",
                server_error2: "กรุณาลองเปิดแอปอีกครั้ง",
                logout_device: "ตอนนี้คุณได้ออกจากระบบจากอุปกรณ์นี้แล้ว",
                logout_device2: "เนื่องจากบัญชีของคุณได้เข้าสู่ระบบในอุปกรณ์อีก 2 เครื่อง",
                login_again: "เข้าสู่ระบบอีกครั้ง",
                later: "ฉันจะทำมันทีหลัง",
                login: "เข้าสู่ระบบ",
                password: "รหัสผ่าน",
                forgot_password: "ลืมรหัสผ่าน?",
                signup: "สมัครสมาชิกได้เลย",
                MISSING_INPUT_VALUE: "กรุณาใส่ค่า",
                INVALID_LOGIN_CREDENTIAL: "ไม่พบผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
                logout: "ออกจากระบบ",
                select_endpoint: "เลือกจุดสิ้นสุด API",
                add_endpoint: "เพิ่มจุดสิ้นสุด API ใหม่",
                download_folder: "ตำแหน่งการดาวน์โหลด",
                no_folder_selected: "ไม่มีโฟลเดอร์ที่เลือก",
                select: "เลือก",
                add: "เพิ่ม",
                apply: "นำมาใช้",
                reset: "รีเซ็ต",
                change: "เปลี่ยน",
                general: "ทั่วไป",
                open_startup: "เปิด API Player จากพื้นหลังขณะเริ่มต้นระบบปฏิบัติการ",
                enable_sound: "เปิดใช้งานเสียง",
                go_2_main: "ไปที่หน้าหลัก",
                membership_balance: "ยอดคงเหลือสมาชิก",
                cloud_balance: "ความสมดุลของการจราจร",
                days: "วัน",
                disclaimer: "คำปฏิเสธความรับผิดชอบ",
                disclaimer_text: "API Player เป็นผลิตภัณฑ์ซอฟต์แวร์ที่ช่วยให้ผู้ใช้สามารถเล่นเนื้อหาสื่อที่ดึงมาจากแหล่งสื่อของบุคคลที่สามโดยบูรณาการ API ของตัวเอง",
                disclaimer_text_2: "API Player จะไม่รับผิดชอบต่อการละเมิดกฎหมายใดๆ ที่เกิดจากการที่ผู้ใช้บูรณาการกับ API ที่ให้สิทธิ์เข้าถึงเนื้อหาที่ผิดกฎหมาย เช่น สื่อละเมิดลิขสิทธิ์ สื่อลามกอนาจาร และอื่นๆ ที่ไม่จำกัดเฉพาะเนื้อหาดังกล่าว",
                understood: "เข้าใจแล้ว",
                search_title: "ค้นหาตามชื่อเรื่อง",
                search_actor: "ค้นหาตามนักแสดง",
                subscribe_now: "คุณควรสมัครสมาชิกเพื่อใช้ฟีเจอร์นี้",
                subscribe: "สมัครสมาชิก",
                yes: "ใช่",
                no: "เลขที่",
                download_limit_3: "หากคุณดาวน์โหลดมากกว่า 2 เรื่อง ชื่อแรกจะถูกลบออกจากเพลย์ลิสต์โดยอัตโนมัติ แต่คุณสามารถค้นหาชื่อนั้นในโฟลเดอร์ดาวน์โหลดของคุณได้ตลอดเวลา",
                welcome_tip_heading: "เคล็ดลับที่เป็นประโยชน์!",
                welcome_tip_1: "คุณสามารถดูชื่อเรื่องหรือนักแสดงทั้งหมดได้โดยคลิกปุ่ม [ค้นหา] โดยไม่ต้องใส่คำสำคัญ",
                welcome_tip_2: "ความเร็วในการดาวน์โหลดอาจไม่เสถียรตามสภาพการจราจร เรากำลังพยายามปรับปรุงอย่างต่อเนื่อง",
                welcome_tip_3: "คุณสามารถกลับไปยังหน้าจอที่แล้วได้เสมอโดยการกดปุ่ม Esc บนแป้นพิมพ์ของคุณ",
                usecasettl: "รับชมวิดีโอ Full HD โดย API Player",
                usecasettl1: "API player เป็นเครื่องเล่นสื่อโอเพ่นซอร์สที่สตรีมไฟล์วิดีโอและเสียงที่ดึงมาโดย API แบบเปิด",
                usecasettl2: "ผู้ใช้สามารถแก้ไขโค้ดเพื่อบูรณาการกับ API ได้ในเมนูการตั้งค่า",
                usecasettl3: "ด้านล่างนี้เป็นตัวอย่างโค้ดสำหรับการบูรณาการกับ API ของ imdb7",
                usecasettl4: "ทำตามขั้นตอนนี้เพื่อทดสอบว่ามันทำงานอย่างไร",
                usecasettl5: "1. ดาวน์โหลดแอป Windows หรือแอป Android / iOS (ปัจจุบันมี API Player Lite เวอร์ชันต่ำกว่าใน MS Store เราแนะนำให้ดาวน์โหลดเวอร์ชันสูงกว่าโดยคลิกปุ่มสีเหลือง [ลิงก์ดาวน์โหลด 2] ด้านล่าง)",
                usecasettl6: "API Player Lite (Windows)",
                usecasettl7: "✨API Player Lite ใหม่ (Windows)",
                usecasettl8: "Flix1 (แอนดรอยด์)",
                usecasettl9: "ลิงค์ดาวน์โหลด",
                usecasettl10: "ลิงค์ดาวน์โหลด 2",
                usecasettl11: "2. คลิกปุ่มด้านล่าง",
                usecasettl12: "คัดลอก API สำหรับทุกวัย",
                usecasettl13: "คัดลอก API สำหรับ 18+",
                usecasettl14: "3. ไปที่การตั้งค่า - แก้ไขการรวม API และวางโค้ด",
                usecasettl15: "หากมีโค้ดอื่นอยู่แล้ว โปรดสำรองข้อมูลไว้ล่วงหน้า",
                usecasettl16: "ตอนนี้คุณมีเครื่องเล่นสื่อเป็นของตัวเองแล้ว! เพลิดเพลินไปกับมันได้เลย",
                usecasettl17: "Flix1 (iOS)",
                label: "ภาษาอังกฤษ",
                find_more_subs: "คุณสามารถค้นหาคำบรรยายเพิ่มเติมในภาษาของคุณได้โดยคลิกไอคอนการตั้งค่าที่มุมล่างขวาของเครื่องเล่นวิดีโอ",
                WATCH_ON_PHONE: "ทำตามขั้นตอนนี้เพื่อดูวิดีโอบนโทรศัพท์ของคุณ",
                DOWNLOAD_APIPL: "1. ดาวน์โหลด API Player Lite เวอร์ชันล่าสุดลงในพีซี Windows ของคุณ",
                ENTER_API: "2. ป้อนจุดสิ้นสุด API ในหน้าการตั้งค่าของ API Player Lite",
                SCAN_QR: "3. สแกนรหัส QR ด้วยโทรศัพท์ของคุณหลังจากโหลดรายการชื่อเรื่องเสร็จแล้ว",
                WEBSITE_OPEN: "4. เว็บไซต์ของจุดสิ้นสุด API ของคุณเปิดอยู่บนโทรศัพท์ของคุณ",
                ENJOY_VIDEO: "5. เพลิดเพลินไปกับวิดีโอของคุณ!",
                STILL_WANT_MULTIFLIX: "✅ หากคุณต้องการใช้แอป Android เวอร์ชันเก่าของเรา ให้คลิกไอคอน Android ทางด้านซ้าย",
                usecase: "ดาวน์โหลดแอป",
                release_date: "วันที่วางจำหน่าย",
                duration: "ระยะเวลาของวิดีโอ",
                Size: "ขนาด",
                Maker: "ผู้สร้าง",
                also_stared: "ยังแสดงนำด้วย",
                titles_by_same_maker: "ชื่อเรื่องจากผู้ผลิตเดียวกัน",
                "most popular": "เป็นที่นิยม",
                "top rated": "อันดับสูงสุด",
                copy_magnet_uri: "คัดลอก URI แม่เหล็ก",
                start_downloading: "เริ่มการดาวน์โหลด",
                download_subtitle: "ดาวน์โหลดคำบรรยาย",
                translate_subtitle: "แปลคำบรรยาย",
                loading_also_starred: "กำลังโหลดภาพยนตร์ที่ติดดาว...",
                censored: "เซ็นเซอร์",
                uncensored: "ไม่เซ็นเซอร์",
                leaked: "รั่วไหล",
                fc2: "เอฟซี2",
                download_available_or_translate: "ดาวน์โหลดหรือแปลคำบรรยาย"
            }, vi: {
                popular: "Phổ biến",
                top_rated: "Đánh giá cao nhất",
                new: "Mới",
                random: "Ngẫu nhiên",
                category: "Loại",
                genre: "Thể loại",
                country: "Quốc gia",
                all: "Tất cả",
                watch_only: "Chỉ xem",
                title: "Tiêu đề",
                actor: "Diễn viên",
                keyword: "Từ khóa",
                search: "Tìm kiếm",
                listing: "Danh sách",
                feature: "Tính năng",
                type: "Kiểu",
                filter: "Lọc",
                total: "Tổng cộng",
                page: "các trang",
                download: "Tải xuống",
                copy_download_link: "Sao chép liên kết tải xuống",
                install_xunlei: "Vui lòng cài đặt Xunlei và nhấp vào nút này một lần nữa",
                download_link_copied: "Đã sao chép liên kết tải xuống!",
                watch_online: "Xem trực tuyến",
                episode_list: "Danh sách tập phim",
                cast: "Dàn diễn viên",
                trailers: "Rơ moóc",
                snapshots: "Ảnh chụp nhanh",
                favorite_list: "Danh sách yêu thích",
                playlist: "Danh sách phát",
                video_duration: "Thời lượng video",
                imdb_score: "Điểm IMDb",
                file_size: "Kích thước tập tin",
                download_speed: "Tốc độ tải xuống",
                download_progress: "Tiến trình tải xuống",
                download_status: "Tải xuống trạng thái",
                pause: "Tạm dừng",
                resume: "Bản tóm tắt",
                remove_from_list: "Xóa khỏi danh sách",
                delete_from_storage: "Xóa khỏi bộ nhớ",
                title_info: "Thông tin tiêu đề",
                settings: "Cài đặt",
                my_account: "Tài khoản của tôi",
                email: "e-mail",
                language: "Ngôn ngữ",
                app: "Ứng dụng",
                subtitle: "Phụ đề",
                sub_from_local: "Mở phụ đề từ bộ nhớ",
                sub_from_server: "Tải phụ đề từ máy chủ",
                turn_off_sub: "Tắt phụ đề",
                server_error: "Có gì đó không ổn",
                server_error2: "Vui lòng thử mở lại ứng dụng.",
                logout_device: "Bây giờ bạn đã đăng xuất khỏi thiết bị này",
                logout_device2: "vì tài khoản của bạn đã đăng nhập vào 2 thiết bị khác.",
                login_again: "Đăng nhập lại",
                later: "Tôi sẽ làm điều đó sau",
                login: "Đăng nhập",
                password: "Mật khẩu",
                forgot_password: "Quên mật khẩu?",
                signup: "Đăng ký ngay.",
                MISSING_INPUT_VALUE: "Vui lòng nhập giá trị",
                INVALID_LOGIN_CREDENTIAL: "Không tìm thấy người dùng hoặc mật khẩu sai",
                logout: "Đăng xuất",
                select_endpoint: "Chọn điểm cuối API",
                add_endpoint: "Thêm điểm cuối API mới",
                download_folder: "Tải xuống vị trí",
                no_folder_selected: "Không có thư mục nào được chọn",
                select: "Lựa chọn",
                add: "Thêm vào",
                apply: "Áp dụng",
                reset: "Cài lại",
                change: "Thay đổi",
                general: "Tổng quan",
                open_startup: "Mở API Player từ chế độ nền khi khởi động hệ điều hành",
                enable_sound: "Bật âm thanh",
                go_2_main: "Đi đến trang chính",
                membership_balance: "Số dư thành viên",
                cloud_balance: "Cân bằng lưu lượng",
                days: "ngày",
                disclaimer: "Tuyên bố miễn trừ trách nhiệm",
                disclaimer_text: "Trình phát API cung cấp sản phẩm phần mềm cho phép người dùng phát nội dung phương tiện được lấy từ các nguồn phương tiện của bên thứ 3 thông qua tích hợp API của riêng người dùng.",
                disclaimer_text_2: "API Player không chịu trách nhiệm cho bất kỳ hành vi vi phạm pháp luật nào do người dùng tự tích hợp với bất kỳ API nào cấp quyền truy cập vào nội dung bất hợp pháp như tài liệu vi phạm bản quyền, nội dung khiêu dâm bất hợp pháp và các nội dung khác không giới hạn ở đó.",
                understood: "Đã hiểu",
                search_title: "Tìm kiếm theo tiêu đề",
                search_actor: "Tìm kiếm theo nữ diễn viên",
                subscribe_now: "Bạn nên đăng ký thành viên để sử dụng tính năng này",
                subscribe: "Đặt mua",
                yes: "Đúng",
                no: "KHÔNG",
                download_limit_3: "Nếu bạn tải xuống nhiều hơn 2 tựa phim, tựa phim đầu tiên sẽ tự động bị xóa khỏi danh sách phát. Tuy nhiên, bạn có thể tìm thấy tựa phim đó trong thư mục tải xuống bất cứ lúc nào.",
                welcome_tip_heading: "Mẹo hữu ích!",
                welcome_tip_1: "Bạn có thể xem tất cả các tiêu đề hoặc diễn viên bằng cách nhấp vào nút [Tìm kiếm] mà không cần từ khóa.",
                welcome_tip_2: "Tốc độ tải xuống có thể không ổn định tùy thuộc vào tình hình giao thông. Chúng tôi đang liên tục nỗ lực để cải thiện.",
                welcome_tip_3: "Bạn luôn có thể quay lại màn hình trước đó bằng cách nhấn phím Esc trên bàn phím.",
                usecasettl: "Xem video Full HD bằng API Player",
                usecasettl1: "API Player là trình phát phương tiện nguồn mở có thể phát trực tuyến bất kỳ tệp video và âm thanh nào được lấy bằng API mở.",
                usecasettl2: "Người dùng có thể chỉnh sửa mã để tích hợp với API trong menu cài đặt.",
                usecasettl3: "Dưới đây là mã mẫu để tích hợp với API imdb7.",
                usecasettl4: "Thực hiện theo bước này để kiểm tra cách thức hoạt động.",
                usecasettl5: "1. Tải xuống ứng dụng Windows hoặc ứng dụng Android/iOS (Phiên bản thấp hơn của API Player Lite hiện có trên MS Store. Chúng tôi khuyên bạn nên tải xuống phiên bản cao hơn bằng cách nhấp vào nút màu vàng [Liên kết tải xuống 2] bên dưới.)",
                usecasettl6: "API Player Lite (Windows)",
                usecasettl7: "✨API Player Lite mới (Windows)",
                usecasettl8: "Flix1 (Android)",
                usecasettl9: "Liên kết tải xuống",
                usecasettl10: "Liên kết tải xuống 2",
                usecasettl11: "2. Nhấp vào nút bên dưới.",
                usecasettl12: "Sao chép API cho mọi lứa tuổi",
                usecasettl13: "Sao chép API cho người dùng 18+",
                usecasettl14: "3. Vào cài đặt - Chỉnh sửa tích hợp API và dán mã.",
                usecasettl15: "Nếu đã có mã khác, vui lòng sao lưu trước.",
                usecasettl16: "Bây giờ bạn đã có trình phát đa phương tiện của riêng mình! Hãy tận hưởng nhé.",
                usecasettl17: "Flix1 (iOS)",
                label: "Tiếng Anh",
                find_more_subs: "Bạn có thể tìm thêm phụ đề bằng ngôn ngữ của mình bằng cách nhấp vào biểu tượng cài đặt ở góc dưới bên phải của trình phát video.",
                WATCH_ON_PHONE: "Thực hiện theo bước này để xem video trên điện thoại của bạn.",
                DOWNLOAD_APIPL: "1. Tải xuống phiên bản mới nhất của API Player Lite trên PC Windows của bạn.",
                ENTER_API: "2. Nhập điểm cuối API vào trang cài đặt của API Player Lite.",
                SCAN_QR: "3. Quét mã QR bằng điện thoại sau khi danh sách tiêu đề được tải xong.",
                WEBSITE_OPEN: "4. Trang web của điểm cuối API của bạn sẽ được mở trên điện thoại của bạn.",
                ENJOY_VIDEO: "5. Chúc bạn xem video vui vẻ!",
                STILL_WANT_MULTIFLIX: "✅ Nếu bạn muốn sử dụng ứng dụng Android phiên bản cũ của chúng tôi, hãy nhấp vào biểu tượng Android ở bên trái.",
                usecase: "Tải ứng dụng",
                release_date: "Ngày phát hành",
                duration: "Thời lượng video",
                Size: "Kích cỡ",
                Maker: "Nhà sản xuất",
                also_stared: "Cũng được đóng vai chính",
                titles_by_same_maker: "Tiêu đề của cùng một nhà sản xuất",
                "most popular": "Phổ biến",
                "top rated": "Đánh giá cao nhất",
                copy_magnet_uri: "Sao chép URI nam châm",
                start_downloading: "Bắt đầu tải xuống",
                download_subtitle: "Tải phụ đề",
                translate_subtitle: "Dịch phụ đề",
                loading_also_starred: "Đang tải phim có gắn sao...",
                censored: "Đã kiểm duyệt",
                uncensored: "Không kiểm duyệt",
                leaked: "Rò rỉ",
                fc2: "FC2",
                download_available_or_translate: "Tải xuống hoặc dịch phụ đề"
            }
        };
        var Mt = function (e, t) {
            return Rt[t] && (Rt[t][e] || Rt.en[e]) || e
        }, zt = "/images/dummy_cover.jpg", Ut = r.memo((function (e) {
            var n = e.movie, r = e.onNavigate, a = e.onCopyTitle, o = e.renderTitle, i = e.onImageError,
                l = (e.locale, o(n));
            return (0, t.jsxs)("div", {
                className: "border border-gray-dark rounded-lg hover:border-blue-500 transition-all duration-300 overflow-hidden group",
                style: {background: "linear-gradient(0deg, rgba(66, 66, 66, 0.20) 0%, rgba(66, 66, 66, 0.20) 100%), var(--dark1, #181818)"},
                children: [(0, t.jsx)("div", {
                    "data-id": "".concat(n._id, "?series=").concat(n.is_series || !1),
                    onClick: r,
                    className: "relative cursor-pointer rounded-t-lg overflow-hidden",
                    style: {paddingBottom: "58.25%", height: 0},
                    role: "button",
                    tabIndex: 0,
                    "aria-label": "View details for ".concat(l),
                    onKeyDown: function (e) {
                        "Enter" !== e.key && " " !== e.key || (e.preventDefault(), r(e))
                    },
                    children: (0, t.jsx)("div", {
                        className: "absolute inset-0 opacity-85 hover:opacity-100 transform duration-300 group-hover:scale-110",
                        children: (0, t.jsx)("img", {
                            src: n.wide_thumbnail || zt,
                            alt: "".concat(l, " poster"),
                            className: "w-full h-full object-cover",
                            onError: i,
                            loading: "lazy"
                        })
                    })
                }), (0, t.jsxs)("div", {
                    className: "p-3",
                    children: [(0, t.jsx)("div", {
                        className: "flex justify-between items-start mb-2",
                        children: (0, t.jsx)("button", {
                            className: "text-sm font-bold text-left hover:text-blue-400 transition-colors duration-200 truncate flex-1 mr-2",
                            onClick: function () {
                                return a(l)
                            },
                            title: l,
                            "aria-label": "Copy title: ".concat(l),
                            children: l
                        })
                    }), (0, t.jsxs)("div", {
                        className: "text-xs font-bold flex justify-between items-center",
                        children: [n.share_date && (0, t.jsx)("span", {
                            className: "text-gray-300",
                            children: n.share_date
                        }), n.imdb_score ? (0, t.jsxs)("button", {
                            className: "bg-[#F4C404] text-black px-2 py-1 rounded text-xs font-bold hover:bg-yellow-500 transition-colors duration-200",
                            onClick: function () {
                                return a(n.imdb_id || "")
                            },
                            "aria-label": "Copy IMDb ID, rating: ".concat(n.imdb_score),
                            children: ["IMDb ", n.imdb_score]
                        }) : null]
                    })]
                })]
            })
        }));
        Ut.displayName = "MovieCard";
        const Ft = function (e) {
            var n = e.title, a = e.data, o = G(), i = (0, r.useMemo)((function () {
                return Tt("endpoints")
            }), []), l = (0, r.useMemo)((function () {
                return Tt("uiLanguage")
            }), []), s = ((0, r.useMemo)((function () {
                return i.find((function (e) {
                    return e.isActive
                }))
            }), [i]), (0, r.useCallback)((function (e) {
                var t = e.currentTarget.dataset.id;
                t && o("/movie-info/".concat(t))
            }), [o])), u = (0, r.useCallback)((function (e) {
                if (!e.title_display_name || 0 === e.title_display_name.length) return e.title;
                var t = e.title_display_name.find((function (e) {
                    return e.language === l && "" !== e.title.trim()
                }));
                if (t) return t.title;
                var n = e.title_display_name.find((function (e) {
                    return "en" === e.language && "" !== e.title.trim()
                }));
                return (null == n ? void 0 : n.title) || e.title
            }), [l]), c = (0, r.useCallback)((function (e) {
                return function (e, t, n, r) {
                    return new (n || (n = Promise))((function (a, o) {
                        function i(e) {
                            try {
                                s(r.next(e))
                            } catch (e) {
                                o(e)
                            }
                        }

                        function l(e) {
                            try {
                                s(r.throw(e))
                            } catch (e) {
                                o(e)
                            }
                        }

                        function s(e) {
                            var t;
                            e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                                e(t)
                            }))).then(i, l)
                        }

                        s((r = r.apply(e, t || [])).next())
                    }))
                }(void 0, void 0, void 0, (function () {
                    var t, n;
                    return function (e, t) {
                        var n, r, a, o, i = {
                            label: 0, sent: function () {
                                if (1 & a[0]) throw a[1];
                                return a[1]
                            }, trys: [], ops: []
                        };
                        return o = {
                            next: l(0),
                            throw: l(1),
                            return: l(2)
                        }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                            return this
                        }), o;

                        function l(l) {
                            return function (s) {
                                return function (l) {
                                    if (n) throw new TypeError("Generator is already executing.");
                                    for (; o && (o = 0, l[0] && (i = 0)), i;) try {
                                        if (n = 1, r && (a = 2 & l[0] ? r.return : l[0] ? r.throw || ((a = r.return) && a.call(r), 0) : r.next) && !(a = a.call(r, l[1])).done) return a;
                                        switch (r = 0, a && (l = [2 & l[0], a.value]), l[0]) {
                                            case 0:
                                            case 1:
                                                a = l;
                                                break;
                                            case 4:
                                                return i.label++, {value: l[1], done: !1};
                                            case 5:
                                                i.label++, r = l[1], l = [0];
                                                continue;
                                            case 7:
                                                l = i.ops.pop(), i.trys.pop();
                                                continue;
                                            default:
                                                if (!((a = (a = i.trys).length > 0 && a[a.length - 1]) || 6 !== l[0] && 2 !== l[0])) {
                                                    i = 0;
                                                    continue
                                                }
                                                if (3 === l[0] && (!a || l[1] > a[0] && l[1] < a[3])) {
                                                    i.label = l[1];
                                                    break
                                                }
                                                if (6 === l[0] && i.label < a[1]) {
                                                    i.label = a[1], a = l;
                                                    break
                                                }
                                                if (a && i.label < a[2]) {
                                                    i.label = a[2], i.ops.push(l);
                                                    break
                                                }
                                                a[2] && i.ops.pop(), i.trys.pop();
                                                continue
                                        }
                                        l = t.call(e, i)
                                    } catch (e) {
                                        l = [6, e], r = 0
                                    } finally {
                                        n = a = 0
                                    }
                                    if (5 & l[0]) throw l[1];
                                    return {value: l[0] ? l[1] : void 0, done: !0}
                                }([l, s])
                            }
                        }
                    }(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return r.trys.push([0, 2, , 3]), [4, navigator.clipboard.writeText(e)];
                            case 1:
                                return r.sent(), ct.success(Mt("copied", l)), [3, 3];
                            case 2:
                                return t = r.sent(), console.warn("Failed to copy to clipboard:", t), (n = document.createElement("textarea")).value = e, document.body.appendChild(n), n.select(), document.execCommand("copy"), document.body.removeChild(n), ct.success(Mt("copied", l)), [3, 3];
                            case 3:
                                return [2]
                        }
                    }))
                }))
            }), [l]), d = (0, r.useCallback)((function (e) {
                var t = e.target;
                t.src !== zt && (t.src = zt)
            }), []);
            return a && 0 !== a.length ? (0, t.jsxs)("div", {
                className: "movie-grid-container",
                children: [(0, t.jsx)("div", {
                    className: "font-semibold mb-4 text-lg",
                    children: Mt(n.toLowerCase(), l)
                }), (0, t.jsx)("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4",
                    children: a.map((function (e) {
                        return (0, t.jsx)(Ut, {
                            movie: e,
                            onNavigate: s,
                            onCopyTitle: c,
                            renderTitle: u,
                            onImageError: d,
                            locale: l
                        }, e._id)
                    }))
                })]
            }) : (0, t.jsx)("div", {
                className: "text-center text-gray-400 py-8",
                children: Mt("no_movies_available", l)
            })
        };
        var Dt = a(525).hp;
        const Bt = function (e) {
            for (var t = "" + (e || ""), n = t.length, r = [], a = 0, o = 0, i = -1, l = 0; l < n; l++) {
                var s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~"'.indexOf(t[l]);
                if (-1 !== s) if (i < 0) i = s; else {
                    a |= (i += 91 * s) << o, o += (8191 & i) > 88 ? 13 : 14;
                    do {
                        r.push(255 & a), a >>= 8, o -= 8
                    } while (o > 7);
                    i = -1
                }
            }
            return i > -1 && r.push(255 & (a | i << o)), Dt.from(r).toString("utf-8")
        };
        var Qt = a(626), Wt = {};
        Wt.styleTagTransform = kt(), Wt.setAttributes = vt(), Wt.insert = gt().bind(null, "head"), Wt.domAPI = ht(), Wt.insertStyleElement = wt(), ft()(Qt.A, Wt), Qt.A && Qt.A.locals && Qt.A.locals;

        function qt(e) {
            var t, n, r = "";
            if ("string" == typeof e || "number" == typeof e) r += e; else if ("object" == typeof e) if (Array.isArray(e)) {
                var a = e.length;
                for (t = 0; t < a; t++) e[t] && (n = qt(e[t])) && (r && (r += " "), r += n)
            } else for (n in e) e[n] && (r && (r += " "), r += n);
            return r
        }

        const Vt = function () {
            for (var e, t, n = 0, r = "", a = arguments.length; n < a; n++) (e = arguments[n]) && (t = qt(e)) && (r && (r += " "), r += t);
            return r
        };
        var $t = [{label: "popular", value: "movie-list?category=Most Popular", icon: "🔥"}, {
                label: "top_rated",
                value: "movie-list?category=Top Rated",
                icon: "⭐"
            }, {label: "new", value: "movie-list?category=New", icon: "✨"}, {
                label: "subtitle",
                value: "movie-list?category=Subtitle",
                icon: "📝"
            }, {label: "random", value: "movie-list?category=Random", icon: "🎲"}, {
                label: "genre",
                value: "genre",
                icon: "🎭"
            }, {label: "country", value: "maker", icon: "🌍"}, {label: "usecase", value: "usecase", icon: "📋"}],
            Ht = ["Censored", "Uncensored", "Most Popular", "Top Rated", "FC2"], Kt = ["Censored", "Uncensored"];
        const Gt = function () {
            var e, n, a, o = G(), i = Tt("uiLanguage"), l = (0, r.useState)(Tt("uiLanguage") || "en"), s = l[0],
                u = l[1], c = (0, r.useState)("title"), d = c[0], f = c[1], p = (0, r.useState)(!1), h = p[0], m = p[1],
                g = (0, r.useState)(null), y = g[0], v = g[1], b = (0, r.useState)(!1), w = (b[0], b[1]),
                x = (0, r.useState)(!1), k = (x[0], x[1]), _ = (0, r.useRef)(null), S = (0, r.useRef)(null),
                N = (0, r.useRef)(null), j = (0, r.useRef)(null);
            e = N, n = function () {
                v(null), w(!1), k(!1)
            }, a = function (t) {
                e.current && !e.current.contains(t.target) && n()
            }, (0, r.useEffect)((function () {
                return document.addEventListener("click", a), function () {
                    document.removeEventListener("click", a)
                }
            }));
            var C, P = function () {
                var e, t, n = null === (e = _.current) || void 0 === e ? void 0 : e.value,
                    r = null === (t = S.current) || void 0 === t ? void 0 : t.value, a = n || r;
                if (console.log("value", a), m(!1), a) {
                    var i = encodeURIComponent(a);
                    o("actor" === d ? "/searchActor?by=Actor&keyword=".concat(i) : "/searchresult?by=Title&keyword=".concat(i)), _.current && (_.current.value = ""), S.current && (S.current.value = "")
                }
            }, E = function (e) {
                console.log("sdf"), "Enter" === e.key && P()
            }, A = function (e) {
                o("/" + e), m(!1), v(null)
            }, I = function (e, t) {
                o("/".concat(t, "?category=").concat(encodeURIComponent(e), "&page=1")), v(null), m(!1), w(!1), k(!1)
            }, L = function (e) {
                v(y === e ? null : e)
            };
            return (0, t.jsx)("header", {
                ref: N,
                className: "bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50",
                children: (0, t.jsxs)("div", {
                    className: " mx-auto px-4", children: [(0, t.jsxs)("div", {
                        className: "flex items-center justify-between h-16",
                        children: [(0, t.jsx)("div", {
                            className: "flex-shrink-0",
                            children: (0, t.jsx)("button", {
                                onClick: function () {
                                    return o("/home")
                                },
                                className: "text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform",
                                children: "Manko.fun"
                            })
                        }), (0, t.jsxs)("nav", {
                            className: "hidden xl:flex items-center space-x-1", children: [$t.map((function (e) {
                                return (0, t.jsxs)("button", {
                                    onClick: function () {
                                        return A(e.value)
                                    },
                                    className: "px-2 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 flex items-center gap-2",
                                    children: [(0, t.jsx)("span", {children: e.icon}), Mt(e.label, i)]
                                }, e.value)
                            })), (0, t.jsxs)("div", {
                                className: "relative",
                                children: [(0, t.jsxs)("button", {
                                    onClick: function () {
                                        return L("category")
                                    },
                                    className: "px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 flex items-center gap-1",
                                    children: ["🎬 ", Mt("category", i), (0, t.jsx)("svg", {
                                        className: "w-4 h-4 transition-transform ".concat("category" === y ? "rotate-180" : ""),
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: (0, t.jsx)("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M19 9l-7 7-7-7"
                                        })
                                    })]
                                }), "category" === y && (0, t.jsx)("div", {
                                    className: "absolute top-full left-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700/50 py-2 z-50",
                                    children: Ht.map((function (e) {
                                        return (0, t.jsx)("button", {
                                            onClick: function () {
                                                return I(e, "cate-list")
                                            },
                                            className: "w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors",
                                            children: Mt(e.toLowerCase(), i)
                                        }, e)
                                    }))
                                })]
                            }), (0, t.jsxs)("div", {
                                className: "relative",
                                children: [(0, t.jsxs)("button", {
                                    onClick: function () {
                                        return L("actor")
                                    },
                                    className: "px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 flex items-center gap-1",
                                    children: ["👥 ", Mt("actor", i), (0, t.jsx)("svg", {
                                        className: "w-4 h-4 transition-transform ".concat("actor" === y ? "rotate-180" : ""),
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: (0, t.jsx)("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M19 9l-7 7-7-7"
                                        })
                                    })]
                                }), "actor" === y && (0, t.jsx)("div", {
                                    className: "absolute top-full left-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700/50 py-2 z-50",
                                    children: Kt.map((function (e) {
                                        return (0, t.jsx)("button", {
                                            onClick: function () {
                                                return I(e, "actor-list")
                                            },
                                            className: "w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors",
                                            children: Mt(e.toLowerCase(), i)
                                        }, e)
                                    }))
                                })]
                            })]
                        }), (0, t.jsxs)("div", {
                            className: "flex items-center space-x-3", children: [(0, t.jsx)("div", {
                                className: "hidden xl:flex items-center", children: (0, t.jsxs)("div", {
                                    className: "flex items-center bg-gray-800/50 rounded-lg border border-gray-700/50 w-48 h-10",
                                    children: [(0, t.jsxs)("div", {
                                        className: "relative", children: [(0, t.jsxs)("button", {
                                            onClick: function () {
                                                return L("searchType")
                                            },
                                            className: "px-1 py-2 text-xs font-medium text-gray-400 hover:text-white border-r border-gray-700/50 flex items-center gap-1 h-10",
                                            children: [Mt("title" === d ? "title" : "actor", i), (0, t.jsx)("svg", {
                                                className: "w-3 h-3",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: (0, t.jsx)("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M19 9l-7 7-7-7"
                                                })
                                            })]
                                        }), "searchType" === y && (0, t.jsxs)("div", {
                                            className: "absolute top-full left-0 mt-1 w-28 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700/50 py-1 z-50",
                                            children: [(0, t.jsxs)("button", {
                                                onClick: function () {
                                                    f("title"), v(null)
                                                },
                                                className: Vt("w-full text-left px-3 py-2 text-xs transition-colors flex items-center gap-2", "title" === d ? "text-blue-400 bg-blue-400/10" : "text-gray-300 hover:text-white hover:bg-gray-700/50"),
                                                children: ["📝 ", Mt("title", i)]
                                            }), (0, t.jsxs)("button", {
                                                onClick: function () {
                                                    f("actor"), v(null)
                                                },
                                                className: Vt("w-full text-left px-3 py-2 text-xs transition-colors flex items-center gap-2", "actor" === d ? "text-blue-400 bg-blue-400/10" : "text-gray-300 hover:text-white hover:bg-gray-700/50"),
                                                children: ["👤 ", Mt("actor", i)]
                                            })]
                                        })]
                                    }), (0, t.jsx)("input", {
                                        ref: _,
                                        type: "text",
                                        placeholder: "".concat(Mt("search", i), "..."),
                                        onKeyUp: E,
                                        className: "flex-1 px-2 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm h-10 min-w-0"
                                    }), (0, t.jsx)("button", {
                                        onClick: P,
                                        className: "px-2 py-2 text-gray-400 hover:text-white transition-colors h-10 flex items-center justify-center flex-shrink-0",
                                        children: (0, t.jsx)("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: (0, t.jsx)("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            })
                                        })
                                    })]
                                })
                            }), (0, t.jsxs)("div", {
                                className: "relative", children: [(0, t.jsx)("button", {
                                    onClick: function () {
                                        return L("language")
                                    },
                                    className: "w-10 h-10 rounded-[50%] overflow-hidden border-2 border-gray-700/50 hover:border-gray-600 transition-colors",
                                    children: (0, t.jsx)("img", {
                                        src: (C = {
                                            ja: "/images/japan.png",
                                            zh: "/images/china.png",
                                            ko: "/images/south-korea.png",
                                            en: "/images/united-kingdom.png",
                                            vi: "/images/VI.png",
                                            id: "/images/ID.png",
                                            th: "/images/TH.png",
                                            ms: "/images/MS.png",
                                            tw: "/images/TW.png"
                                        }, C[s] || C.en), alt: "Language", className: "w-full h-full object-cover"
                                    })
                                }), "language" === y && (0, t.jsx)("div", {
                                    className: "absolute top-full  right-0 mt-2 w-40 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700/50 py-2 z-50",
                                    children: [{
                                        code: "en",
                                        name: "English",
                                        flag: "/images/united-kingdom.png"
                                    }, {code: "ko", name: "한국어", flag: "/images/south-korea.png"}, {
                                        code: "ja",
                                        name: "日本語",
                                        flag: "/images/japan.png"
                                    }, {code: "zh", name: "简体中文", flag: "/images/china.png"}, {
                                        code: "vi",
                                        name: "Tiếng Việt",
                                        flag: "/images/VI.png"
                                    }, {code: "id", name: "Bahasa Indonesia", flag: "/images/ID.png"}, {
                                        code: "th",
                                        name: "ภาษาไทย",
                                        flag: "/images/TH.png"
                                    }, {code: "ms", name: "Bahasa Melayu", flag: "/images/MS.png"}, {
                                        code: "tw",
                                        name: "繁體中文",
                                        flag: "/images/TW.png"
                                    }].map((function (e) {
                                        return (0, t.jsxs)("button", {
                                            onClick: function () {
                                                return function (e) {
                                                    Ot("uiLanguage", e), u(e), v(null), o(0)
                                                }(e.code)
                                            },
                                            className: Vt("w-full flex items-center px-3 py-2 text-sm transition-colors", s === e.code ? "text-blue-400 bg-blue-400/10" : "text-gray-300 hover:text-white hover:bg-gray-700/50"),
                                            children: [(0, t.jsx)("img", {
                                                src: e.flag,
                                                alt: e.name,
                                                className: "w-6 h-6 rounded-full mr-3"
                                            }), e.name]
                                        }, e.code)
                                    }))
                                })]
                            }), (0, t.jsx)("button", {
                                onClick: function () {
                                    return m(!h)
                                },
                                className: "xl:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors",
                                children: (0, t.jsx)("svg", {
                                    className: "w-6 h-6",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: (0, t.jsx)("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: h ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                                    })
                                })
                            })]
                        })]
                    }), (0, t.jsx)("div", {
                        ref: j,
                        className: Vt("xl:hidden transition-all duration-300 overflow-hidden", h ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"),
                        children: (0, t.jsxs)("div", {
                            className: "py-4 border-t border-gray-700/50", children: [(0, t.jsx)("div", {
                                className: "mb-4", children: (0, t.jsxs)("div", {
                                    className: "flex items-center bg-gray-800/50 rounded-lg border border-gray-700/50 h-10",
                                    children: [(0, t.jsxs)("div", {
                                        className: "relative", children: [(0, t.jsxs)("button", {
                                            onClick: function () {
                                                return L("mobileSearchType")
                                            },
                                            className: "px-2 py-2 text-xs font-medium text-gray-400 hover:text-white border-r border-gray-700/50 flex items-center gap-1 h-10",
                                            children: [Mt("title" === d ? "title" : "actor", i), (0, t.jsx)("svg", {
                                                className: "w-3 h-3",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: (0, t.jsx)("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M19 9l-7 7-7-7"
                                                })
                                            })]
                                        }), "mobileSearchType" === y && (0, t.jsxs)("div", {
                                            className: "absolute top-full left-0 mt-1 w-28 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700/50 py-1 z-50",
                                            children: [(0, t.jsxs)("button", {
                                                onClick: function () {
                                                    f("title"), v(null)
                                                },
                                                className: Vt("w-full text-left px-3 py-2 text-xs transition-colors flex items-center gap-2", "title" === d ? "text-blue-400 bg-blue-400/10" : "text-gray-300 hover:text-white hover:bg-gray-700/50"),
                                                children: ["📝 ", Mt("title", i)]
                                            }), (0, t.jsxs)("button", {
                                                onClick: function () {
                                                    f("actor"), v(null)
                                                },
                                                className: Vt("w-full text-left px-3 py-2 text-xs transition-colors flex items-center gap-2", "actor" === d ? "text-blue-400 bg-blue-400/10" : "text-gray-300 hover:text-white hover:bg-gray-700/50"),
                                                children: ["👤 ", Mt("actor", i)]
                                            })]
                                        })]
                                    }), (0, t.jsx)("input", {
                                        ref: S,
                                        type: "text",
                                        placeholder: "".concat(Mt("search", i), "..."),
                                        onKeyUp: E,
                                        className: "flex-1 px-2 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm h-10 min-w-0"
                                    }), (0, t.jsx)("button", {
                                        onClick: P,
                                        className: "px-2 py-2 text-gray-400 hover:text-white transition-colors h-10 flex items-center justify-center flex-shrink-0",
                                        children: (0, t.jsx)("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: (0, t.jsx)("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            })
                                        })
                                    })]
                                })
                            }), (0, t.jsxs)("div", {
                                className: "grid grid-cols-2 gap-4",
                                children: [(0, t.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [(0, t.jsx)("div", {
                                        className: "px-2 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2",
                                        children: "📱 Navigation"
                                    }), $t.map((function (e) {
                                        return (0, t.jsxs)("button", {
                                            onClick: function () {
                                                return A(e.value)
                                            },
                                            className: "w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors flex items-center gap-2",
                                            children: [(0, t.jsx)("span", {
                                                className: "text-sm",
                                                children: e.icon
                                            }), (0, t.jsx)("span", {className: "text-sm", children: Mt(e.label, i)})]
                                        }, e.value)
                                    }))]
                                }), (0, t.jsxs)("div", {
                                    className: "space-y-4",
                                    children: [(0, t.jsxs)("div", {
                                        children: [(0, t.jsxs)("div", {
                                            className: "px-2 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2",
                                            children: ["🎬 ", Mt("category", i)]
                                        }), (0, t.jsx)("div", {
                                            className: "space-y-1", children: Ht.map((function (e) {
                                                return (0, t.jsx)("button", {
                                                    onClick: function () {
                                                        return I(e, "cate-list")
                                                    },
                                                    className: "w-full text-left px-2 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800/30 transition-colors rounded",
                                                    children: Mt(e.toLowerCase(), i)
                                                }, e)
                                            }))
                                        })]
                                    }), (0, t.jsxs)("div", {
                                        children: [(0, t.jsxs)("div", {
                                            className: "px-2 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2",
                                            children: ["👥 ", Mt("actor", i)]
                                        }), (0, t.jsx)("div", {
                                            className: "space-y-1", children: Kt.map((function (e) {
                                                return (0, t.jsx)("button", {
                                                    onClick: function () {
                                                        return I(e, "actor-list")
                                                    },
                                                    className: "w-full text-left px-2 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800/30 transition-colors rounded",
                                                    children: Mt(e.toLowerCase(), i)
                                                }, e)
                                            }))
                                        })]
                                    })]
                                })]
                            })]
                        })
                    })]
                })
            })
        };
        var Jt = function (e, t, n) {
            if (n || 2 === arguments.length) for (var r, a = 0, o = t.length; a < o; a++) !r && a in t || (r || (r = Array.prototype.slice.call(t, 0, a)), r[a] = t[a]);
            return e.concat(r || Array.prototype.slice.call(t))
        }, Yt = function (e) {
            var n = e.value, r = e.onClick, a = e.onKeyDown, o = e.isActive, i = void 0 !== o && o, l = e.children,
                s = e["aria-label"], u = e["aria-current"];
            return (0, t.jsx)("div", {
                onClick: r,
                onKeyDown: a,
                "data-value": n,
                tabIndex: 0,
                role: "button",
                "aria-label": s,
                "aria-current": u,
                className: "\n      px-2 py-1 rounded-md cursor-pointer text-xs font-medium transition-all duration-200\n      hover:bg-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500\n      ".concat(i ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white", "\n    "),
                children: l
            })
        }, Xt = function () {
            return (0, t.jsx)("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 20 20",
                fill: "none",
                "aria-hidden": "true",
                children: (0, t.jsx)("path", {
                    d: "M6 4.75C5.6203 4.75 5.30651 5.03215 5.25685 5.39823L5.25 5.5V14.5C5.25 14.9142 5.58579 15.25 6 15.25C6.3797 15.25 6.69349 14.9678 6.74315 14.6018L6.75 14.5V5.5C6.75 5.08579 6.41421 4.75 6 4.75ZM14.2803 4.96967C14.0141 4.7034 13.5974 4.6792 13.3038 4.89705L13.2197 4.96967L8.71967 9.46967C8.4534 9.73594 8.4292 10.1526 8.64705 10.4462L8.71967 10.5303L13.2197 15.0303C13.5126 15.3232 13.9874 15.3232 14.2803 15.0303C14.5466 14.7641 14.5708 14.3474 14.3529 14.0538L14.2803 13.9697L10.3107 10L14.2803 6.03033C14.5732 5.73744 14.5732 5.26256 14.2803 4.96967Z",
                    fill: "currentColor"
                })
            })
        }, Zt = function () {
            return (0, t.jsx)("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 20 20",
                fill: "none",
                "aria-hidden": "true",
                children: (0, t.jsx)("path", {
                    d: "M13.75 4.75C14.1297 4.75 14.4435 5.03215 14.4932 5.39823L14.5 5.5V14.5C14.5 14.9142 14.1642 15.25 13.75 15.25C13.3703 15.25 13.0565 14.9678 13.0068 14.6018L13 14.5V5.5C13 5.08579 13.3358 4.75 13.75 4.75ZM5.46967 4.96967C5.73594 4.7034 6.1526 4.6792 6.44621 4.89705L6.53033 4.96967L11.0303 9.46967C11.2966 9.73594 11.3208 10.1526 11.1029 10.4462L11.0303 10.5303L6.53033 15.0303C6.23744 15.3232 5.76256 15.3232 5.46967 15.0303C5.2034 14.7641 5.1792 14.3474 5.39705 14.0538L5.46967 13.9697L9.43934 10L5.46967 6.03033C5.17678 5.73744 5.17678 5.26256 5.46967 4.96967Z",
                    fill: "currentColor"
                })
            })
        }, en = function () {
            return (0, t.jsx)("div", {
                className: "flex items-center gap-1 px-2",
                "aria-hidden": "true",
                children: Jt([], Array(3), !0).map((function (e, n) {
                    return (0, t.jsx)("div", {className: "w-1 h-1 bg-gray-400 rounded-full"}, n)
                }))
            })
        };
        const tn = function (e) {
            var n = e.total, a = void 0 === n ? 72 : n, o = e.itemsPerPage, i = void 0 === o ? 24 : o, l = e.page,
                s = e.onChange, u = (0, r.useMemo)((function () {
                    return Math.ceil(a / i)
                }), [a, i]), c = ((0, r.useMemo)((function () {
                    return Tt("uiLanguage")
                }), []), (0, r.useMemo)((function () {
                    for (var e = [l], t = l + 1; t <= u && e.length < 7;) e.push(t), t++;
                    return e
                }), [l, u])), d = (0, r.useMemo)((function () {
                    return {
                        showPrevJump: c[0] > 1,
                        showNextJump: l < u - 10,
                        showEllipsis: l < u - 7,
                        prevJumpTarget: Math.max(1, l - 10),
                        nextJumpTarget: Math.min(u, l + 10)
                    }
                }), [c, l, u]), f = (0, r.useCallback)((function (e) {
                    var t = Number(e.currentTarget.dataset.value);
                    t && t !== l && t >= 1 && t <= u && s(t)
                }), [l, s, u]), p = (0, r.useCallback)((function (e) {
                    if ("Enter" === e.key || " " === e.key) {
                        e.preventDefault();
                        var t = Number(e.currentTarget.dataset.value);
                        t && t !== l && t >= 1 && t <= u && s(t)
                    }
                }), [l, s, u]);
            return 0 === a || u <= 1 ? null : (0, t.jsxs)("nav", {
                className: "border-t border-t-gray-light p-2 flex lg:gap-2 xl:gap-2 md:gap-2 gap-1 justify-center items-center",
                role: "navigation",
                "aria-label": "Pagination Navigation",
                children: [d.showPrevJump && (0, t.jsx)(Yt, {
                    value: d.prevJumpTarget,
                    onClick: f,
                    onKeyDown: p,
                    "aria-label": "Go to page ".concat(d.prevJumpTarget),
                    children: (0, t.jsx)(Xt, {})
                }), c.map((function (e) {
                    return (0, t.jsx)(Yt, {
                        value: e,
                        onClick: f,
                        onKeyDown: p,
                        isActive: e === l,
                        "aria-label": "Go to page ".concat(e),
                        "aria-current": e === l ? "page" : void 0,
                        children: e
                    }, e)
                })), d.showEllipsis && (0, t.jsxs)("div", {
                    className: "flex items-center gap-1",
                    children: [(0, t.jsx)(en, {}), (0, t.jsx)(Yt, {
                        value: u,
                        onClick: f,
                        onKeyDown: p,
                        isActive: u === l,
                        "aria-label": "Go to last page ".concat(u),
                        children: u
                    })]
                }), d.showNextJump && (0, t.jsx)(Yt, {
                    value: d.nextJumpTarget,
                    onClick: f,
                    onKeyDown: p,
                    "aria-label": "Go to page ".concat(d.nextJumpTarget),
                    children: (0, t.jsx)(Zt, {})
                })]
            })
        };
        var nn = function (e, t) {
            return Tt("osLang"), "swx/movie/search?page=".concat(t, "&size=").concat(24, "&most_popular=true")
        }, rn = function () {
            return (0, t.jsxs)("div", {
                className: "fixed inset-0 flex flex-col items-center justify-center bg-gray-dark bg-opacity-50 backdrop-blur-sm",
                role: "status",
                "aria-label": "Loading movies",
                children: [(0, t.jsx)("div", {className: "w-8 h-8 border-2 border-sky-600 rounded-full border-t-transparent animate-spin"}), (0, t.jsx)("span", {
                    className: "mt-2 text-sm text-gray-300",
                    children: "Loading movies..."
                })]
            })
        }, an = function (e) {
            var n = e.message;
            return (0, t.jsxs)("div", {
                className: "px-4 py-3 rounded-lg bg-red-500 bg-opacity-20 border border-red-500 text-red-200",
                role: "alert",
                "aria-live": "polite",
                children: [(0, t.jsx)("h3", {
                    className: "font-semibold mb-1",
                    children: "Error loading movies"
                }), (0, t.jsx)("p", {className: "text-sm", children: n})]
            })
        }, on = function () {
            return (0, t.jsxs)("div", {
                className: "flex flex-col items-center justify-center py-16 text-center",
                children: [(0, t.jsx)("div", {
                    className: "w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mb-4",
                    children: (0, t.jsx)("svg", {
                        className: "w-8 h-8 text-gray-400",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "aria-hidden": "true",
                        children: (0, t.jsx)("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1h2a1 1 0 011-1z"
                        })
                    })
                }), (0, t.jsx)("h3", {
                    className: "text-lg font-semibold text-gray-300 mb-2",
                    children: "No movies found"
                }), (0, t.jsx)("p", {
                    className: "text-gray-400 max-w-md",
                    children: "No movies are available at the moment. Please check back later."
                })]
            })
        };
        var ln = {in: "en", vn: "vi"};
        var sn = a(597), un = {};
        un.styleTagTransform = kt(), un.setAttributes = vt(), un.insert = gt().bind(null, "head"), un.domAPI = ht(), un.insertStyleElement = wt(), ft()(sn.A, un), sn.A && sn.A.locals && sn.A.locals;
        var cn = a(213), dn = function () {
            return dn = Object.assign || function (e) {
                for (var t, n = 1, r = arguments.length; n < r; n++) for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }, dn.apply(this, arguments)
        }, fn = function (e, t, n, r) {
            return new (n || (n = Promise))((function (a, o) {
                function i(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function s(e) {
                    var t;
                    e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(i, l)
                }

                s((r = r.apply(e, t || [])).next())
            }))
        }, pn = function (e, t) {
            var n, r, a, o, i = {
                label: 0, sent: function () {
                    if (1 & a[0]) throw a[1];
                    return a[1]
                }, trys: [], ops: []
            };
            return o = {
                next: l(0),
                throw: l(1),
                return: l(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function l(l) {
                return function (s) {
                    return function (l) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; o && (o = 0, l[0] && (i = 0)), i;) try {
                            if (n = 1, r && (a = 2 & l[0] ? r.return : l[0] ? r.throw || ((a = r.return) && a.call(r), 0) : r.next) && !(a = a.call(r, l[1])).done) return a;
                            switch (r = 0, a && (l = [2 & l[0], a.value]), l[0]) {
                                case 0:
                                case 1:
                                    a = l;
                                    break;
                                case 4:
                                    return i.label++, {value: l[1], done: !1};
                                case 5:
                                    i.label++, r = l[1], l = [0];
                                    continue;
                                case 7:
                                    l = i.ops.pop(), i.trys.pop();
                                    continue;
                                default:
                                    if (!((a = (a = i.trys).length > 0 && a[a.length - 1]) || 6 !== l[0] && 2 !== l[0])) {
                                        i = 0;
                                        continue
                                    }
                                    if (3 === l[0] && (!a || l[1] > a[0] && l[1] < a[3])) {
                                        i.label = l[1];
                                        break
                                    }
                                    if (6 === l[0] && i.label < a[1]) {
                                        i.label = a[1], a = l;
                                        break
                                    }
                                    if (a && i.label < a[2]) {
                                        i.label = a[2], i.ops.push(l);
                                        break
                                    }
                                    a[2] && i.ops.pop(), i.trys.pop();
                                    continue
                            }
                            l = t.call(e, i)
                        } catch (e) {
                            l = [6, e], r = 0
                        } finally {
                            n = a = 0
                        }
                        if (5 & l[0]) throw l[1];
                        return {value: l[0] ? l[1] : void 0, done: !0}
                    }([l, s])
                }
            }
        }, hn = {
            en: {name: "English", code: "en", flag: "🇺🇸", nativeName: "English"},
            ko: {name: "Korean", code: "ko", flag: "🇰🇷", nativeName: "한국어"},
            zh: {name: "Chinese Simplified", code: "zh-cn", flag: "🇨🇳", nativeName: "简体中文"},
            id: {name: "Indonesian", code: "id", flag: "🇮🇩", nativeName: "Bahasa Indonesia"},
            ms: {name: "Malay", code: "ms", flag: "🇲🇾", nativeName: "Bahasa Melayu"},
            tw: {name: "Chinese Traditional", code: "zh-tw", flag: "🇹🇼", nativeName: "繁體中文"},
            th: {name: "Thai", code: "th", flag: "🇹🇭", nativeName: "ไทย"},
            vi: {name: "Vietnamese", code: "vi", flag: "🇻🇳", nativeName: "Tiếng Việt"}
        };
        const mn = function (e) {
            var n = e.movieId, a = e.availableSubtitles, o = e.movieTitle, i = e.onSubtitleUploaded,
                l = (0, r.useState)({}), s = l[0], u = l[1], c = Tt("uiLanguage"), d = Tt("osLang"), f = G(),
                p = function (e) {
                    var t = e.toLowerCase();
                    return "zh-cn" === t || "cn" === t ? "zh" : "zh-tw" === t || "tw" === t ? "tw" : t
                }, h = a.map((function (e) {
                    return p(e.language)
                })), m = function (e, t, n) {
                    return void 0 === n && (n = 3), fn(void 0, void 0, void 0, (function () {
                        var r, a, o, i;
                        return pn(this, (function (l) {
                            switch (l.label) {
                                case 0:
                                    r = function (r) {
                                        var a, o, l;
                                        return pn(this, (function (s) {
                                            switch (s.label) {
                                                case 0:
                                                    return s.trys.push([0, 3, , 5]), [4, fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=".concat(t, "&dt=t&q=").concat(encodeURIComponent(e)))];
                                                case 1:
                                                    if (!(a = s.sent()).ok) throw new Error("Translation failed: ".concat(a.status));
                                                    return [4, a.json()];
                                                case 2:
                                                    return o = s.sent(), [2, {
                                                        value: (null === (i = o[0]) || void 0 === i ? void 0 : i.map((function (e) {
                                                            return e[0]
                                                        })).join("")) || e
                                                    }];
                                                case 3:
                                                    if (l = s.sent(), console.warn("Translation attempt ".concat(r + 1, " failed:"), l), r === n - 1) throw l;
                                                    return [4, new Promise((function (e) {
                                                        return setTimeout(e, 1e3 * Math.pow(2, r))
                                                    }))];
                                                case 4:
                                                    return s.sent(), [3, 5];
                                                case 5:
                                                    return [2]
                                            }
                                        }))
                                    }, a = 0, l.label = 1;
                                case 1:
                                    return a < n ? [5, r(a)] : [3, 4];
                                case 2:
                                    if ("object" == typeof (o = l.sent())) return [2, o.value];
                                    l.label = 3;
                                case 3:
                                    return a++, [3, 1];
                                case 4:
                                    return [2, e]
                            }
                        }))
                    }))
                }, g = (0, r.useCallback)((function (e, t) {
                    if (e) {
                        var n = Tt("downloadCounter");
                        if (parseInt(n) >= 5) return Ot("downloadCounter", "0"), void f("/usecase");
                        var r = (parseInt(n) + 1).toString();
                        Ot("downloadCounter", r);
                        var a = hn[t], i = "".concat(o.replace(/[^a-zA-Z0-9]/g, "-"), "-").concat(t, ".srt");
                        fetch(e).then((function (e) {
                            return e.blob()
                        })).then((function (e) {
                            (0, cn.saveAs)(e, i), ct.success("".concat((null == a ? void 0 : a.nativeName) || t, " subtitle downloaded!"))
                        })).catch((function () {
                            ct.error("Failed to download subtitle")
                        }))
                    }
                }), [o]), y = (0, r.useCallback)((function (e) {
                    return fn(void 0, void 0, void 0, (function () {
                        var t, r, l, s, h, g, y, v, b, w, x, k, _, S, N, j, C, P, E;
                        return pn(this, (function (A) {
                            switch (A.label) {
                                case 0:
                                    if ("zh" === d || "tw" === d) return f("/usecase"), [2];
                                    if (t = Tt("downloadCounter"), parseInt(t) >= 5) return Ot("downloadCounter", "0"), f("/usecase"), [2];
                                    r = (parseInt(t) + 1).toString(), Ot("downloadCounter", r), A.label = 1;
                                case 1:
                                    return A.trys.push([1, 13, 14, 15]), (l = a.find((function (e) {
                                        return "en" === p(e.language)
                                    })) || a.find((function (e) {
                                        return "ja" === p(e.language)
                                    })) || a.find((function (e) {
                                        return "ko" === p(e.language)
                                    })) || a.find((function (e) {
                                        return "zh" === p(e.language)
                                    })) || a.find((function (e) {
                                        return p(e.language) === c
                                    })) || a[0]) ? (s = hn[e], u((function (t) {
                                        var n;
                                        return dn(dn({}, t), ((n = {})[e] = {isTranslating: !0, progress: 0}, n))
                                    })), [4, fetch(l.file_link)]) : (ct.error("No source subtitle available for translation"), [2]);
                                case 2:
                                    if (!(h = A.sent()).ok) throw new Error("Failed to fetch subtitle file");
                                    return [4, h.text()];
                                case 3:
                                    if (g = A.sent(), !(y = g.trim().split(/\n\s*\n/).map((function (e, t) {
                                        var n = e.trim().split("\n");
                                        return n.length < 3 ? null : {
                                            index: parseInt(n[0]) || t + 1,
                                            timestamp: n[1],
                                            text: n.slice(2).join("\n")
                                        }
                                    })).filter(Boolean)).length) throw new Error("No valid subtitle content found");
                                    v = 50, b = [], w = function (t) {
                                        var n, r, a, o, i, l;
                                        return pn(this, (function (c) {
                                            switch (c.label) {
                                                case 0:
                                                    return n = y.slice(t, t + v), [4, Promise.all(n.map((function (e) {
                                                        return fn(void 0, void 0, void 0, (function () {
                                                            var t, n;
                                                            return pn(this, (function (r) {
                                                                switch (r.label) {
                                                                    case 0:
                                                                        if (!e) return [2, null];
                                                                        r.label = 1;
                                                                    case 1:
                                                                        return r.trys.push([1, 3, , 4]), [4, m(e.text, s.code)];
                                                                    case 2:
                                                                        return t = r.sent(), [2, dn(dn({}, e), {text: t})];
                                                                    case 3:
                                                                        return n = r.sent(), console.warn("Failed to translate line ".concat(e.index, ":"), n), [2, null];
                                                                    case 4:
                                                                        return [2]
                                                                }
                                                            }))
                                                        }))
                                                    })))];
                                                case 1:
                                                    if (r = c.sent(), (a = r.filter((function (e) {
                                                        return null === e
                                                    }))).length > 0) throw new Error("Translation failed for ".concat(a.length, " lines in batch starting at line ").concat(t + 1));
                                                    return o = r.filter(Boolean), b.push.apply(b, o), i = Math.min(t + v, y.length), l = Math.round(i / y.length * 100), u((function (t) {
                                                        var n;
                                                        return dn(dn({}, t), ((n = {})[e] = {
                                                            isTranslating: !0,
                                                            progress: l
                                                        }, n))
                                                    })), [2]
                                            }
                                        }))
                                    }, x = 0, A.label = 4;
                                case 4:
                                    return x < y.length ? [5, w(x)] : [3, 7];
                                case 5:
                                    A.sent(), A.label = 6;
                                case 6:
                                    return x += v, [3, 4];
                                case 7:
                                    if (b.length !== y.length) throw new Error("Translation incomplete: ".concat(b.length, " of ").concat(y.length, " lines translated"));
                                    k = function (e) {
                                        return e.map((function (e) {
                                            return "".concat(e.index, "\n").concat(e.timestamp, "\n").concat(e.text, "\n")
                                        })).join("\n")
                                    }(b), _ = new Blob([k], {type: "text/plain;charset=utf-8"}), S = "".concat(o.replace(/[^a-zA-Z0-9]/g, "-"), "-").concat(e, ".srt"), (0, cn.saveAs)(_, S), A.label = 8;
                                case 8:
                                    return A.trys.push([8, 11, , 12]), (N = new FormData).append("subtitle", _, S), N.append("movieId", n), N.append("title", o), N.append("languageCode", e), [4, fetch("/api/upload-subtitle", {
                                        method: "POST",
                                        body: N
                                    })];
                                case 9:
                                    if (!(j = A.sent()).ok) throw new Error("Failed to upload to server");
                                    return [4, j.json()];
                                case 10:
                                    if (!(C = A.sent()).success) throw new Error(C.error || "Upload failed");
                                    return ct.success("Subtitle translated to ".concat(s.nativeName, ", downloaded and uploaded successfully!")), i && i(e, C.s3Url), [3, 12];
                                case 11:
                                    return P = A.sent(), console.warn("S3 upload failed, but translation succeeded:", P), ct.success("Subtitle translated to ".concat(s.nativeName, " and downloaded! (Upload failed)")), [3, 12];
                                case 12:
                                    return [3, 15];
                                case 13:
                                    return E = A.sent(), console.error("Translation failed:", E), ct.error("Translation failed: ".concat(E instanceof Error ? E.message : "Unknown error")), [3, 15];
                                case 14:
                                    return u((function (t) {
                                        var n = dn({}, t);
                                        return delete n[e], n
                                    })), [7];
                                case 15:
                                    return [2]
                            }
                        }))
                    }))
                }), [a, c, o, n, i]);
            return (0, t.jsxs)("div", {
                className: "bg-gray-800 rounded-lg p-4 mt-4",
                children: [(0, t.jsxs)("div", {
                    className: "mb-4",
                    children: [(0, t.jsxs)("h3", {
                        className: "text-lg font-medium mb-2",
                        children: ["🌐 ", Mt("subtitle", c) || "Subtitles"]
                    }), (0, t.jsx)("p", {
                        className: "text-sm text-gray-400",
                        children: a.length > 0 ? Mt("download_available_or_translate", c) || "Download available subtitles or translate to other languages" : Mt("no_subtitles_available_translate", c) || "No subtitles available - translate from other sources when available"
                    })]
                }), 0 === a.length ? (0, t.jsxs)("div", {
                    className: "text-center py-8",
                    children: [(0, t.jsx)("div", {
                        className: "text-gray-500 mb-4",
                        children: (0, t.jsx)("svg", {
                            className: "mx-auto h-12 w-12 text-gray-400",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: (0, t.jsx)("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            })
                        })
                    }), (0, t.jsx)("p", {
                        className: "text-gray-400 text-sm",
                        children: Mt("no_subtitles_found", c) || "No subtitles found for this movie"
                    }), (0, t.jsx)("p", {
                        className: "text-gray-500 text-xs mt-2",
                        children: Mt("subtitle_translation_unavailable", c) || "Translation will be available when subtitles are added"
                    })]
                }) : (0, t.jsx)("div", {
                    className: "grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-3",
                    children: Object.entries(hn).map((function (e) {
                        var n, r, o = e[0], i = e[1], l = h.includes(o), u = a.find((function (e) {
                                return p(e.language) === o
                            })), d = (null === (n = s[o]) || void 0 === n ? void 0 : n.isTranslating) || !1,
                            f = (null === (r = s[o]) || void 0 === r ? void 0 : r.progress) || 0;
                        return (0, t.jsxs)("div", {
                            className: "flex items-center justify-between bg-gray-700 rounded-lg p-4",
                            children: [(0, t.jsxs)("div", {
                                className: "flex items-center gap-3",
                                children: [(0, t.jsx)("span", {
                                    className: "text-xl",
                                    children: i.flag
                                }), (0, t.jsxs)("div", {
                                    className: "flex flex-col",
                                    children: [(0, t.jsx)("span", {
                                        className: "text-sm font-medium",
                                        children: i.name
                                    }), (0, t.jsx)("span", {
                                        className: "text-xs text-gray-400",
                                        children: i.nativeName
                                    })]
                                })]
                            }), (0, t.jsx)("div", {
                                className: "flex items-center gap-2",
                                children: l ? (0, t.jsx)("button", {
                                    onClick: function () {
                                        return g(u.file_link, o)
                                    },
                                    className: "px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors min-w-[100px]",
                                    children: Mt("download_subtitle", c)
                                }) : (0, t.jsx)("button", {
                                    onClick: function () {
                                        return y(o)
                                    },
                                    disabled: 0 === a.length || d,
                                    className: "px-4 py-2 text-white text-sm font-medium rounded-lg transition-all duration-300 min-w-[100px] relative overflow-hidden ".concat(d ? "bg-blue-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"),
                                    children: d ? (0, t.jsxs)("div", {
                                        className: "flex items-center justify-center gap-2",
                                        children: [(0, t.jsx)("div", {className: "w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"}), (0, t.jsxs)("span", {children: [f, "%"]})]
                                    }) : (0, t.jsx)("span", {children: Mt("translate_subtitle", c) || "Translate"})
                                })
                            })]
                        }, o)
                    }))
                })]
            })
        };
        var gn = function () {
            return gn = Object.assign || function (e) {
                for (var t, n = 1, r = arguments.length; n < r; n++) for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }, gn.apply(this, arguments)
        }, yn = function (e, t, n, r) {
            return new (n || (n = Promise))((function (a, o) {
                function i(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function l(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function s(e) {
                    var t;
                    e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(i, l)
                }

                s((r = r.apply(e, t || [])).next())
            }))
        }, vn = function (e, t) {
            var n, r, a, o, i = {
                label: 0, sent: function () {
                    if (1 & a[0]) throw a[1];
                    return a[1]
                }, trys: [], ops: []
            };
            return o = {
                next: l(0),
                throw: l(1),
                return: l(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function l(l) {
                return function (s) {
                    return function (l) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; o && (o = 0, l[0] && (i = 0)), i;) try {
                            if (n = 1, r && (a = 2 & l[0] ? r.return : l[0] ? r.throw || ((a = r.return) && a.call(r), 0) : r.next) && !(a = a.call(r, l[1])).done) return a;
                            switch (r = 0, a && (l = [2 & l[0], a.value]), l[0]) {
                                case 0:
                                case 1:
                                    a = l;
                                    break;
                                case 4:
                                    return i.label++, {value: l[1], done: !1};
                                case 5:
                                    i.label++, r = l[1], l = [0];
                                    continue;
                                case 7:
                                    l = i.ops.pop(), i.trys.pop();
                                    continue;
                                default:
                                    if (!((a = (a = i.trys).length > 0 && a[a.length - 1]) || 6 !== l[0] && 2 !== l[0])) {
                                        i = 0;
                                        continue
                                    }
                                    if (3 === l[0] && (!a || l[1] > a[0] && l[1] < a[3])) {
                                        i.label = l[1];
                                        break
                                    }
                                    if (6 === l[0] && i.label < a[1]) {
                                        i.label = a[1], a = l;
                                        break
                                    }
                                    if (a && i.label < a[2]) {
                                        i.label = a[2], i.ops.push(l);
                                        break
                                    }
                                    a[2] && i.ops.pop(), i.trys.pop();
                                    continue
                            }
                            l = t.call(e, i)
                        } catch (e) {
                            l = [6, e], r = 0
                        } finally {
                            n = a = 0
                        }
                        if (5 & l[0]) throw l[1];
                        return {value: l[0] ? l[1] : void 0, done: !0}
                    }([l, s])
                }
            }
        }, bn = function (e, t, n) {
            if (n || 2 === arguments.length) for (var r, a = 0, o = t.length; a < o; a++) !r && a in t || (r || (r = Array.prototype.slice.call(t, 0, a)), r[a] = t[a]);
            return e.concat(r || Array.prototype.slice.call(t))
        }, wn = {en: "en", zh: "tw", ko: "kr", ja: "jp"};
        var xn = function (e, t) {
            var n = "page=".concat(t, "&size=").concat(24);
            switch (e) {
                case"Most Popular":
                    return "swx/movie/search?".concat(n, "&most_popular=true");
                case"Top Rated":
                    return "swx/movie/search?".concat(n, "&top_rated=true");
                case"New":
                    return "swx/movie/search?".concat(n);
                case"Subtitle":
                    return Tt("uiLanguage"), "swx/movie/search?".concat(n, "&subtitle_link=true");
                case"Random":
                    return "swx/movie/random-list?".concat(n);
                default:
                    return "swx/movie/search?category=".concat(encodeURIComponent(e || ""), "&").concat(n)
            }
        }, kn = function () {
            return (0, t.jsxs)("div", {
                className: "fixed inset-0 flex flex-col items-center justify-center bg-gray-dark bg-opacity-50 backdrop-blur-sm",
                role: "status",
                "aria-label": "Loading movies",
                children: [(0, t.jsx)("div", {className: "w-8 h-8 border-2 border-sky-600 rounded-full border-t-transparent animate-spin"}), (0, t.jsx)("span", {
                    className: "mt-2 text-sm text-gray-300",
                    children: "Loading movies..."
                })]
            })
        }, _n = function (e) {
            var n = e.message;
            return (0, t.jsxs)("div", {
                className: "px-4 py-3 rounded-lg bg-red-500 bg-opacity-20 border border-red-500 text-red-200",
                role: "alert",
                "aria-live": "polite",
                children: [(0, t.jsx)("h3", {
                    className: "font-semibold mb-1",
                    children: "Error loading movies"
                }), (0, t.jsx)("p", {className: "text-sm", children: n})]
            })
        }, Sn = function (e) {
            var n = e.category;
            return (0, t.jsxs)("div", {
                className: "flex flex-col items-center justify-center py-16 text-center",
                children: [(0, t.jsx)("div", {
                    className: "w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mb-4",
                    children: (0, t.jsx)("svg", {
                        className: "w-8 h-8 text-gray-400",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "aria-hidden": "true",
                        children: (0, t.jsx)("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1h2a1 1 0 011-1z"
                        })
                    })
                }), (0, t.jsx)("h3", {
                    className: "text-lg font-semibold text-gray-300 mb-2",
                    children: "No movies found"
                }), (0, t.jsx)("p", {
                    className: "text-gray-400 max-w-md",
                    children: n ? 'No movies found in the "'.concat(n, '" category.') : "No movies available at the moment."
                })]
            })
        };
        var Nn = r.memo((function (e) {
            var n = e.genre, r = e.onClick;
            return (0, t.jsx)("div", {
                className: "px-3 py-2 bg-white/5 hover:bg-white/10 cursor-pointer rounded-md transition-all duration-200 text-center border border-transparent hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500",
                "data-id": n,
                onClick: r,
                role: "button",
                tabIndex: 0,
                "aria-label": "Browse ".concat(n, " movies"),
                onKeyDown: function (e) {
                    "Enter" !== e.key && " " !== e.key || (e.preventDefault(), r(e))
                },
                children: (0, t.jsx)("span", {className: "text-sm font-medium", children: n})
            })
        }));
        Nn.displayName = "GenreCard";
        var jn = function () {
            return (0, t.jsxs)("div", {
                className: "flex flex-col items-center justify-center py-16",
                role: "status",
                "aria-label": "Loading genres",
                children: [(0, t.jsx)("div", {className: "w-8 h-8 border-2 border-sky-600 rounded-full border-t-transparent animate-spin"}), (0, t.jsx)("span", {
                    className: "mt-2 text-sm text-gray-300",
                    children: "Loading genres..."
                })]
            })
        }, Cn = function (e) {
            var n = e.message;
            return (0, t.jsxs)("div", {
                className: "px-4 py-3 rounded-lg bg-red-500 bg-opacity-20 border border-red-500 text-red-200",
                role: "alert",
                "aria-live": "polite",
                children: [(0, t.jsx)("h3", {
                    className: "font-semibold mb-1",
                    children: "Error loading genres"
                }), (0, t.jsx)("p", {className: "text-sm", children: n})]
            })
        }, Pn = function (e) {
            var n = e.keyword;
            return e.locale, (0, t.jsxs)("div", {
                className: "text-center text-gray-400",
                children: [(0, t.jsx)("div", {
                    className: "w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4",
                    children: (0, t.jsx)("svg", {
                        className: "w-8 h-8 text-gray-400",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "aria-hidden": "true",
                        children: (0, t.jsx)("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        })
                    })
                }), (0, t.jsx)("h3", {
                    className: "text-lg font-semibold text-gray-300 mb-2",
                    children: "No genres found"
                }), (0, t.jsxs)("p", {
                    className: "text-gray-400",
                    children: ['No genres match "', n, '". Try a different search term.']
                })]
            })
        };
        var En = r.memo((function (e) {
            var n = e.country, r = e.onClick;
            return (0, t.jsx)("div", {
                className: "px-3 py-2 bg-white/5 hover:bg-white/10 cursor-pointer rounded-md transition-all duration-200 text-center border border-transparent hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500",
                "data-id": n,
                onClick: r,
                role: "button",
                tabIndex: 0,
                "aria-label": "Browse movies from ".concat(n),
                onKeyDown: function (e) {
                    "Enter" !== e.key && " " !== e.key || (e.preventDefault(), r(e))
                },
                children: (0, t.jsx)("span", {className: "text-sm font-medium", children: n})
            })
        }));
        En.displayName = "CountryCard";
        var An = function () {
            return (0, t.jsxs)("div", {
                className: "flex flex-col items-center justify-center py-16",
                role: "status",
                "aria-label": "Loading countries",
                children: [(0, t.jsx)("div", {className: "w-8 h-8 border-2 border-sky-600 rounded-full border-t-transparent animate-spin"}), (0, t.jsx)("span", {
                    className: "mt-2 text-sm text-gray-300",
                    children: "Loading countries..."
                })]
            })
        }, In = function (e) {
            var n = e.message;
            return (0, t.jsxs)("div", {
                className: "px-4 py-3 rounded-lg bg-red-500 bg-opacity-20 border border-red-500 text-red-200",
                role: "alert",
                "aria-live": "polite",
                children: [(0, t.jsx)("h3", {
                    className: "font-semibold mb-1",
                    children: "Error loading countries"
                }), (0, t.jsx)("p", {className: "text-sm", children: n})]
            })
        }, Ln = function (e) {
            var n = e.keyword;
            return e.locale, (0, t.jsxs)("div", {
                className: "text-center text-gray-400",
                children: [(0, t.jsx)("div", {
                    className: "w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4",
                    children: (0, t.jsx)("svg", {
                        className: "w-8 h-8 text-gray-400",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "aria-hidden": "true",
                        children: (0, t.jsx)("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        })
                    })
                }), (0, t.jsx)("h3", {
                    className: "text-lg font-semibold text-gray-300 mb-2",
                    children: "No countries found"
                }), (0, t.jsxs)("p", {
                    className: "text-gray-400",
                    children: ['No countries match "', n, '". Try a different search term.']
                })]
            })
        };
        var Tn = a(557), On = {};
        On.styleTagTransform = kt(), On.setAttributes = vt(), On.insert = gt().bind(null, "head"), On.domAPI = ht(), On.insertStyleElement = wt(), ft()(Tn.A, On), Tn.A && Tn.A.locals && Tn.A.locals;
        var Rn = {en: "en", zh: "tw", ko: "kr", ja: "jp"}, Mn = {
            background: "linear-gradient(0deg, rgba(66, 66, 66, 0.20) 0%, rgba(66, 66, 66, 0.20) 100%), var(--dark1, #181818)",
            aspectRatio: {position: "relative", paddingBottom: "160%", height: 0, overflow: "hidden"}
        }, zn = r.memo((function (e) {
            var n = e.actor, r = e.onNavigate, a = e.renderName;
            return (0, t.jsxs)("div", {
                className: "border border-gray-dark rounded-lg hover:border-blue-500 transition-colors duration-200 overflow-hidden",
                style: {background: Mn.background},
                children: [(0, t.jsx)("div", {
                    "data-id": n.person_id,
                    onClick: r,
                    className: "rounded-t-lg cursor-pointer group",
                    style: Mn.aspectRatio,
                    children: (0, t.jsx)("div", {
                        className: "absolute inset-0",
                        children: (0, t.jsx)("img", {
                            src: n.profile_path,
                            alt: "".concat(a(n), " profile"),
                            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
                            loading: "lazy",
                            onError: function (e) {
                                e.target.src = "/images/default-avatar.png"
                            }
                        })
                    })
                }), (0, t.jsx)("div", {
                    className: "p-2",
                    children: (0, t.jsx)("div", {
                        className: "text-sm text-center text-white truncate",
                        title: a(n),
                        children: a(n)
                    })
                })]
            })
        }));
        zn.displayName = "ActorCard";
        const Un = function (e) {
            e.title;
            var n = e.data, a = G(), o = (0, r.useMemo)((function () {
                return Tt("uiLanguage")
            }), []), i = (0, r.useCallback)((function (e, t) {
                var n = e.currentTarget.dataset.id;
                n && a("/actor/".concat(n, "?name=").concat(encodeURIComponent(t)))
            }), [a]), l = (0, r.useCallback)((function (e) {
                if (!e.also_known_as) return e.name;
                console.log(e);
                var t = e.also_known_as[Rn[o]];
                return console.log(t, o), t || e.name
            }), [o]);
            return n && 0 !== n.length ? (0, t.jsx)("div", {
                className: "p-4 bg-zinc-900 rounded-lg",
                children: (0, t.jsx)("div", {
                    className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4",
                    children: n.map((function (e) {
                        return (0, t.jsx)(zn, {
                            actor: e, onNavigate: function (t) {
                                return i(t, l(e))
                            }, renderName: l
                        }, e._id)
                    }))
                })
            }) : (0, t.jsx)("div", {
                className: "p-4 bg-zinc-900 rounded-lg",
                children: (0, t.jsx)("div", {
                    className: "text-center text-gray-400 py-8",
                    children: "No actors available"
                })
            })
        };
        var Fn = function () {
            return (0, t.jsxs)("div", {
                className: "fixed inset-0 flex flex-col items-center justify-center bg-gray-dark bg-opacity-50 backdrop-blur-sm",
                role: "status",
                "aria-label": "Loading actors",
                children: [(0, t.jsx)("div", {className: "w-8 h-8 border-2 border-sky-600 rounded-full border-t-transparent animate-spin"}), (0, t.jsx)("span", {
                    className: "mt-2 text-sm text-gray-300",
                    children: "Loading actors..."
                })]
            })
        }, Dn = function (e) {
            var n = e.message;
            return (0, t.jsxs)("div", {
                className: "px-4 py-3 rounded-lg bg-red-500 bg-opacity-20 border border-red-500 text-red-200",
                role: "alert",
                "aria-live": "polite",
                children: [(0, t.jsx)("h3", {
                    className: "font-semibold mb-1",
                    children: "Error loading actors"
                }), (0, t.jsx)("p", {className: "text-sm", children: n})]
            })
        }, Bn = function (e) {
            var n = e.category;
            return (0, t.jsxs)("div", {
                className: "flex flex-col items-center justify-center py-16 text-center",
                children: [(0, t.jsx)("div", {
                    className: "w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mb-4",
                    children: (0, t.jsx)("svg", {
                        className: "w-8 h-8 text-gray-400",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "aria-hidden": "true",
                        children: (0, t.jsx)("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        })
                    })
                }), (0, t.jsx)("h3", {
                    className: "text-lg font-semibold text-gray-300 mb-2",
                    children: "No actors found"
                }), (0, t.jsx)("p", {
                    className: "text-gray-400 max-w-md",
                    children: n ? 'No actors found in the "'.concat(n, '" category.') : "No actors available at the moment."
                })]
            })
        };
        var Qn = function (e, t) {
            var n = "page=".concat(t, "&size=").concat(24);
            switch (e) {
                case"Popular":
                    return "swx/movie/search?".concat(n, "&most_popular=true");
                case"top_rated":
                    return "swx/movie/search?".concat(n, "&top_rated=true");
                case"New":
                    return "swx/movie/search?".concat(n);
                case"Subtitle":
                    var r = Tt("uiLanguage").toUpperCase();
                    return "swx/movie/search?".concat(n, "&subtitle_link.").concat(r, "=true");
                case"Random":
                    return "swx/movie/random-list?".concat(n);
                default:
                    return "swx/movie/search?category=".concat(encodeURIComponent(e || ""), "&").concat(n)
            }
        }, Wn = function () {
            return (0, t.jsxs)("div", {
                className: "fixed inset-0 flex flex-col items-center justify-center bg-gray-dark bg-opacity-50 backdrop-blur-sm",
                role: "status",
                "aria-label": "Loading movies",
                children: [(0, t.jsx)("div", {className: "w-8 h-8 border-2 border-sky-600 rounded-full border-t-transparent animate-spin"}), (0, t.jsx)("span", {
                    className: "mt-2 text-sm text-gray-300",
                    children: "Loading movies..."
                })]
            })
        }, qn = function (e) {
            var n = e.message;
            return (0, t.jsxs)("div", {
                className: "px-4 py-3 rounded-lg bg-red-500 bg-opacity-20 border border-red-500 text-red-200",
                role: "alert",
                "aria-live": "polite",
                children: [(0, t.jsx)("h3", {
                    className: "font-semibold mb-1",
                    children: "Error loading movies"
                }), (0, t.jsx)("p", {className: "text-sm", children: n})]
            })
        }, Vn = function (e) {
            var n = e.category;
            return (0, t.jsxs)("div", {
                className: "flex flex-col items-center justify-center py-16 text-center",
                children: [(0, t.jsx)("div", {
                    className: "w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mb-4",
                    children: (0, t.jsx)("svg", {
                        className: "w-8 h-8 text-gray-400",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "aria-hidden": "true",
                        children: (0, t.jsx)("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1h2a1 1 0 011-1z"
                        })
                    })
                }), (0, t.jsx)("h3", {
                    className: "text-lg font-semibold text-gray-300 mb-2",
                    children: "No movies found"
                }), (0, t.jsx)("p", {
                    className: "text-gray-400 max-w-md",
                    children: n ? 'No movies found in the "'.concat(n, '" category.') : "No movies available at the moment."
                })]
            })
        };
        var $n = function (e) {
            var t = e.category, n = e.listing, r = e.type, a = e.page, o = [],
                i = "New" === n ? "swx/movie/search?" : "swx/movie/random-list?";
            t && "All" !== t && o.push("category=".concat(encodeURIComponent(t))), r && "All" !== r && ("Most Popular" === r ? o.push("most_popular=true") : "Top Rated" === r && o.push("top_rated=true")), o.push("size=".concat(48, "&page=").concat(a));
            var l = i + o.join("&");
            return console.log("API Endpoint:", l), l
        }, Hn = function () {
            return (0, t.jsxs)("div", {
                className: "fixed inset-0 flex flex-col items-center justify-center bg-gray-dark bg-opacity-50 backdrop-blur-sm",
                role: "status",
                "aria-label": "Loading movies",
                children: [(0, t.jsx)("div", {className: "w-8 h-8 border-2 border-sky-600 rounded-full border-t-transparent animate-spin"}), (0, t.jsx)("span", {
                    className: "mt-2 text-sm text-gray-300",
                    children: "Loading movies..."
                })]
            })
        }, Kn = function (e) {
            var n = e.message;
            return (0, t.jsxs)("div", {
                className: "px-4 py-3 rounded-lg bg-red-500 bg-opacity-20 border border-red-500 text-red-200",
                role: "alert",
                "aria-live": "polite",
                children: [(0, t.jsx)("h3", {
                    className: "font-semibold mb-1",
                    children: "Error loading movies"
                }), (0, t.jsx)("p", {className: "text-sm", children: n})]
            })
        }, Gn = function (e) {
            var n = e.filters;
            return (0, t.jsxs)("div", {
                className: "flex flex-col items-center justify-center py-16 text-center",
                children: [(0, t.jsx)("div", {
                    className: "w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mb-4",
                    children: (0, t.jsx)("svg", {
                        className: "w-8 h-8 text-gray-400",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "aria-hidden": "true",
                        children: (0, t.jsx)("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1h2a1 1 0 011-1z"
                        })
                    })
                }), (0, t.jsx)("h3", {
                    className: "text-lg font-semibold text-gray-300 mb-2",
                    children: "No movies found"
                }), (0, t.jsx)("p", {
                    className: "text-gray-400 max-w-md",
                    children: "No movies match the current filters. Try adjusting your search criteria."
                }), (n.category || n.type || n.listing) && (0, t.jsxs)("div", {
                    className: "mt-4 text-sm text-gray-500",
                    children: [(0, t.jsx)("p", {children: "Active filters:"}), (0, t.jsxs)("ul", {
                        className: "mt-1",
                        children: [n.category && "All" !== n.category && (0, t.jsxs)("li", {children: ["Category: ", n.category]}), n.listing && (0, t.jsxs)("li", {children: ["Listing: ", n.listing]}), n.type && "All" !== n.type && (0, t.jsxs)("li", {children: ["Type: ", n.type]})]
                    })]
                })]
            })
        };
        var Jn = function () {
            return (0, t.jsxs)("div", {
                className: "fixed inset-0 flex flex-col items-center justify-center bg-gray-dark bg-opacity-50 backdrop-blur-sm",
                role: "status",
                "aria-label": "Loading movies",
                children: [(0, t.jsx)("div", {className: "w-8 h-8 border-2 border-sky-600 rounded-full border-t-transparent animate-spin"}), (0, t.jsx)("span", {
                    className: "mt-2 text-sm text-gray-300",
                    children: "Loading movies..."
                })]
            })
        }, Yn = function (e) {
            var n = e.message;
            return (0, t.jsxs)("div", {
                className: "px-4 py-3 rounded-lg bg-red-500 bg-opacity-20 border border-red-500 text-red-200",
                role: "alert",
                "aria-live": "polite",
                children: [(0, t.jsx)("h3", {
                    className: "font-semibold mb-1",
                    children: "Error loading movies"
                }), (0, t.jsx)("p", {className: "text-sm", children: n})]
            })
        }, Xn = function () {
            return (0, t.jsxs)("div", {
                className: "flex flex-col items-center justify-center py-16 text-center",
                children: [(0, t.jsx)("div", {
                    className: "w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mb-4",
                    children: (0, t.jsx)("svg", {
                        className: "w-8 h-8 text-gray-400",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "aria-hidden": "true",
                        children: (0, t.jsx)("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1h2a1 1 0 011-1z"
                        })
                    })
                }), (0, t.jsx)("h3", {
                    className: "text-lg font-semibold text-gray-300 mb-2",
                    children: "No movies found"
                }), (0, t.jsx)("p", {
                    className: "text-gray-400 max-w-md",
                    children: "This actor doesn't have any movies available at the moment."
                })]
            })
        };
        var Zn = function (e, t, n) {
            if (!e || !t) throw new Error("Category and name are required");
            return "swx/movie/search?size=".concat(24, "&page=").concat(n, "&").concat(encodeURIComponent(e), "=").concat(encodeURIComponent(t))
        }, er = function () {
            return (0, t.jsxs)("div", {
                className: "fixed inset-0 flex flex-col items-center justify-center bg-gray-dark bg-opacity-50 backdrop-blur-sm",
                role: "status",
                "aria-label": "Loading movies",
                children: [(0, t.jsx)("div", {className: "w-8 h-8 border-2 border-sky-600 rounded-full border-t-transparent animate-spin"}), (0, t.jsx)("span", {
                    className: "mt-2 text-sm text-gray-300",
                    children: "Loading movies..."
                })]
            })
        }, tr = function (e) {
            var n = e.message;
            return (0, t.jsxs)("div", {
                className: "px-4 py-3 rounded-lg bg-red-500 bg-opacity-20 border border-red-500 text-red-200",
                role: "alert",
                "aria-live": "polite",
                children: [(0, t.jsx)("h3", {
                    className: "font-semibold mb-1",
                    children: "Error loading movies"
                }), (0, t.jsx)("p", {className: "text-sm", children: n})]
            })
        }, nr = function (e) {
            var n = e.name, r = e.type;
            return (0, t.jsxs)("div", {
                className: "flex flex-col items-center justify-center py-16 text-center",
                children: [(0, t.jsx)("div", {
                    className: "w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mb-4",
                    children: (0, t.jsx)("svg", {
                        className: "w-8 h-8 text-gray-400",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "aria-hidden": "true",
                        children: (0, t.jsx)("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1h2a1 1 0 011-1z"
                        })
                    })
                }), (0, t.jsx)("h3", {
                    className: "text-lg font-semibold text-gray-300 mb-2",
                    children: "No movies found"
                }), (0, t.jsx)("p", {
                    className: "text-gray-400 max-w-md",
                    children: n && r ? "No movies found for ".concat(r, ': "').concat(n, '".') : "No movies available at the moment."
                })]
            })
        };
        var rr = function (e, t, n) {
            return "Title" === e ? "swx/movie/search?keyword=".concat(t, "&size=24&page=").concat(n) : "swx/movie/search?actor=".concat(t, "&size=24&page=").concat(n)
        }, ar = function () {
            return (0, t.jsxs)("div", {
                className: "fixed inset-0 flex flex-col items-center justify-center bg-gray-dark bg-opacity-50 backdrop-blur-sm",
                role: "status",
                "aria-label": "Loading search results",
                children: [(0, t.jsx)("div", {className: "w-8 h-8 border-2 border-sky-600 rounded-full border-t-transparent animate-spin"}), (0, t.jsx)("span", {
                    className: "mt-2 text-sm text-gray-300",
                    children: "Searching movies..."
                })]
            })
        }, or = function (e) {
            var n = e.message;
            return (0, t.jsxs)("div", {
                className: "px-4 py-3 rounded-lg bg-red-500 bg-opacity-20 border border-red-500 text-red-200",
                role: "alert",
                "aria-live": "polite",
                children: [(0, t.jsx)("h3", {
                    className: "font-semibold mb-1",
                    children: "Error loading search results"
                }), (0, t.jsx)("p", {className: "text-sm", children: n})]
            })
        }, ir = function (e) {
            var n = e.keyword;
            return (0, t.jsxs)("div", {
                className: "flex flex-col items-center justify-center py-16 text-center",
                children: [(0, t.jsx)("div", {
                    className: "w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mb-4",
                    children: (0, t.jsx)("svg", {
                        className: "w-8 h-8 text-gray-400",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "aria-hidden": "true",
                        children: (0, t.jsx)("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        })
                    })
                }), (0, t.jsx)("h3", {
                    className: "text-lg font-semibold text-gray-300 mb-2",
                    children: "No results found"
                }), (0, t.jsx)("p", {
                    className: "text-gray-400 max-w-md",
                    children: n ? 'No movies found for "'.concat(n, '". Try a different search term.') : "No search results available."
                })]
            })
        };
        var lr = function (e) {
            var n = e.title, r = e.iconSrc, a = e.iconAlt, o = e.downloads, i = e.variant, l = e.locale,
                s = e.onDownload;
            return (0, t.jsxs)("div", {
                className: "border border-gray-600 rounded-lg p-4",
                children: [(0, t.jsx)("h3", {
                    className: "text-lg font-semibold mb-4",
                    children: n
                }), (0, t.jsx)("div", {
                    className: "space-y-4",
                    children: (0, t.jsxs)("div", {
                        className: "flex flex-col gap-2 sm:flex-row items-center",
                        children: [(0, t.jsx)("img", {
                            width: 40,
                            height: 40,
                            className: "rounded-lg flex-shrink-0 hidden sm:block",
                            src: r,
                            alt: a,
                            loading: "lazy"
                        }), o.map((function (e, n) {
                            return (0, t.jsx)(sr, {
                                microsoftStoreImage: "primary" === i && ("zh" === l ? 2 === n : 0 === n),
                                locale: l,
                                url: e,
                                label: "".concat(Mt("usecasettl9", l), " ").concat(n + 1),
                                variant: i,
                                onClick: s
                            }, n)
                        })).filter((function (e, t) {
                            return "zh" === l || t < 2
                        }))]
                    })
                })]
            })
        }, sr = function (e) {
            var n = e.url, r = e.label, a = e.variant, o = e.onClick, i = e.microsoftStoreImage, l = e.locale,
                s = "primary" === a ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-700 hover:bg-gray-600";
            return i && "zh" == l ? (0, t.jsx)("img", {
                src: "/images/wormhole.png",
                alt: "Wormhole",
                className: "cursor-pointer h-10",
                "data-url": n,
                onClick: o
            }) : i ? (0, t.jsx)("img", {
                src: "/images/ms-store.png",
                alt: "Microsoft Store",
                className: "cursor-pointer h-10",
                "data-url": n,
                onClick: o
            }) : (0, t.jsx)("button", {
                onClick: o,
                "data-url": n,
                className: "".concat(s, " w-[136px] text-sm sm:w-auto text-white h-10 leading-10 rounded-lg font-medium px-0 sm:px-8"),
                "aria-label": r,
                children: r
            })
        }, ur = function (e) {
            var n = e.locale, r = e.onCopy;
            return (0, t.jsxs)("div", {
                children: [(0, t.jsx)("h3", {
                    className: "text-xl font-bold mb-4",
                    children: Mt("usecasettl11", n)
                }), (0, t.jsxs)("div", {
                    className: "flex flex-col sm:flex-row gap-3",
                    children: [(0, t.jsx)(cr, {
                        text: "imdb7.plus",
                        label: Mt("usecasettl12", n),
                        onClick: r
                    }), (0, t.jsx)(cr, {text: "manko.fun", label: Mt("usecasettl13", n), onClick: r})]
                })]
            })
        }, cr = function (e) {
            var n = e.text, r = e.label, a = e.onClick;
            return (0, t.jsx)("button", {
                onClick: function () {
                    return a(n)
                },
                className: "bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 max-w-xs",
                "aria-label": "Copy ".concat(n),
                children: r
            })
        };
        var dr = function (e) {
            var n = e.locale;
            return (0, t.jsxs)("div", {
                className: "flex flex-col items-center justify-center py-16",
                children: [(0, t.jsx)("div", {className: "w-8 h-8 border-2 border-sky-600 rounded-full border-t-transparent animate-spin mb-4"}), (0, t.jsx)("span", {
                    className: "text-gray-300 text-sm",
                    children: Mt("searching_actors", n) || "Searching actors..."
                })]
            })
        }, fr = function (e) {
            var n = e.onRetry, r = e.locale;
            return (0, t.jsxs)("div", {
                className: "bg-red-500/20 border border-red-500/50 rounded-lg p-6 text-center",
                children: [(0, t.jsx)("div", {
                    className: "text-red-400 mb-4",
                    children: (0, t.jsx)("svg", {
                        className: "w-12 h-12 mx-auto",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: (0, t.jsx)("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                        })
                    })
                }), (0, t.jsx)("h3", {
                    className: "text-lg font-semibold text-red-300 mb-2",
                    children: Mt("search_failed", r) || "Search Failed"
                }), (0, t.jsx)("p", {
                    className: "text-red-200 mb-4",
                    children: Mt("failed_to_load_actors", r) || "Failed to load actors. Please try again."
                }), (0, t.jsx)("button", {
                    onClick: n,
                    className: "bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200",
                    children: Mt("try_again", r) || "Try Again"
                })]
            })
        }, pr = function (e) {
            var n = e.locale;
            return (0, t.jsxs)("div", {
                className: "flex flex-col items-center justify-center py-16 text-center",
                children: [(0, t.jsx)("div", {
                    className: "w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mb-4",
                    children: (0, t.jsx)("svg", {
                        className: "w-8 h-8 text-gray-400",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: (0, t.jsx)("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        })
                    })
                }), (0, t.jsx)("h3", {
                    className: "text-lg font-semibold text-gray-300 mb-2",
                    children: Mt("no_search_query", n) || "No Search Query"
                }), (0, t.jsx)("p", {
                    className: "text-gray-400 max-w-md",
                    children: Mt("enter_actor_name", n) || "Enter an actor's name in the search box to find actors."
                })]
            })
        }, hr = function (e) {
            var n = e.keyword, r = e.locale;
            return (0, t.jsxs)("div", {
                className: "flex flex-col items-center justify-center py-16 text-center",
                children: [(0, t.jsx)("div", {
                    className: "w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mb-4",
                    children: (0, t.jsx)("svg", {
                        className: "w-8 h-8 text-gray-400",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: (0, t.jsx)("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.073m10.582 0A7.962 7.962 0 0018 12a7.962 7.962 0 00-1.71-4.928M5.291 14.073A7.962 7.962 0 004 12a7.962 7.962 0 011.71-4.928"
                        })
                    })
                }), (0, t.jsx)("h3", {
                    className: "text-lg font-semibold text-gray-300 mb-2",
                    children: Mt("no_actors_found", r) || "No Actors Found"
                }), (0, t.jsxs)("p", {
                    className: "text-gray-400 max-w-md",
                    children: [Mt("no_results_for", r) || "No actors found for", " ", (0, t.jsxs)("span", {
                        className: "text-blue-400 font-medium",
                        children: ['"', n, '"']
                    }), ".", Mt("try_different_search", r) || " Try a different search term."]
                })]
            })
        };
        var mr = (0, n.H)(document.getElementById("app")), gr = new he.QueryClient({
            defaultOptions: {
                queries: {
                    retry: !1,
                    refetchOnMount: !1,
                    refetchOnWindowFocus: !1
                }
            }
        });
        mr.render((0, t.jsxs)(he.QueryClientProvider, {
            client: gr, children: [(0, t.jsxs)((function (t) {
                let {basename: n, children: a, future: o, window: i} = t, l = r.useRef();
                null == l.current && (l.current = function (t) {
                    return void 0 === t && (t = {}), function (t, n, r, a) {
                        void 0 === a && (a = {});
                        let {window: o = document.defaultView, v5Compat: i = !1} = a, l = o.history, d = e.Pop,
                            m = null, g = y();

                        function y() {
                            return (l.state || {idx: null}).idx
                        }

                        function v() {
                            d = e.Pop;
                            let t = y(), n = null == t ? null : t - g;
                            g = t, m && m({action: d, location: w.location, delta: n})
                        }

                        function b(e) {
                            let t = "null" !== o.location.origin ? o.location.origin : o.location.href,
                                n = "string" == typeof e ? e : h(e);
                            return c(t, "No window.location.(origin|href) available to create URL for href: " + n), new URL(n, t)
                        }

                        null == g && (g = 0, l.replaceState(s({}, l.state, {idx: g}), ""));
                        let w = {
                            get action() {
                                return d
                            }, get location() {
                                return t(o, l)
                            }, listen(e) {
                                if (m) throw new Error("A history only accepts one active listener");
                                return o.addEventListener(u, v), m = e, () => {
                                    o.removeEventListener(u, v), m = null
                                }
                            }, createHref: e => n(o, e), createURL: b, encodeLocation(e) {
                                let t = b(e);
                                return {pathname: t.pathname, search: t.search, hash: t.hash}
                            }, push: function (t, n) {
                                d = e.Push;
                                let a = p(w.location, t, n);
                                r && r(a, t), g = y() + 1;
                                let s = f(a, g), u = w.createHref(a);
                                try {
                                    l.pushState(s, "", u)
                                } catch (e) {
                                    if (e instanceof DOMException && "DataCloneError" === e.name) throw e;
                                    o.location.assign(u)
                                }
                                i && m && m({action: d, location: w.location, delta: 1})
                            }, replace: function (t, n) {
                                d = e.Replace;
                                let a = p(w.location, t, n);
                                r && r(a, t), g = y();
                                let o = f(a, g), s = w.createHref(a);
                                l.replaceState(o, "", s), i && m && m({action: d, location: w.location, delta: 0})
                            }, go: e => l.go(e)
                        };
                        return w
                    }((function (e, t) {
                        let {pathname: n, search: r, hash: a} = e.location;
                        return p("", {
                            pathname: n,
                            search: r,
                            hash: a
                        }, t.state && t.state.usr || null, t.state && t.state.key || "default")
                    }), (function (e, t) {
                        return "string" == typeof t ? t : h(t)
                    }), null, t)
                }({window: i, v5Compat: !0}));
                let d = l.current, [m, g] = r.useState({
                    action: d.action,
                    location: d.location
                }), {v7_startTransition: y} = o || {}, v = r.useCallback((e => {
                    y && ce ? ce((() => g(e))) : g(e)
                }), [g, y]);
                return r.useLayoutEffect((() => d.listen(v)), [d, v]), r.createElement(le, {
                    basename: n,
                    children: a,
                    location: m.location,
                    navigationType: m.action,
                    navigator: d,
                    future: o
                })
            }), {
                children: [(0, t.jsx)((function () {
                    var e = H(), t = e.pathname, n = e.search;
                    return (0, r.useEffect)((function () {
                        window.scrollTo({top: 0, left: 0, behavior: "smooth"})
                    }), [t, n]), null
                }), {}), (0, t.jsxs)((function (e) {
                    let {children: t, location: n} = e;
                    return Y(se(t), n)
                }), {
                    children: [(0, t.jsx)(ie, {
                        path: "/home", element: (0, t.jsx)((function () {
                            var e, n, a = pe(), o = a[0], i = a[1], l = (0, r.useMemo)((function () {
                                    return Number(o.get("page")) || 1
                                }), [o]), s = (0, he.useQuery)({
                                    queryKey: ["home-movies", l], queryFn: function () {
                                        return function (e, t, n, r) {
                                            return new (n || (n = Promise))((function (a, o) {
                                                function i(e) {
                                                    try {
                                                        s(r.next(e))
                                                    } catch (e) {
                                                        o(e)
                                                    }
                                                }

                                                function l(e) {
                                                    try {
                                                        s(r.throw(e))
                                                    } catch (e) {
                                                        o(e)
                                                    }
                                                }

                                                function s(e) {
                                                    var t;
                                                    e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                                                        e(t)
                                                    }))).then(i, l)
                                                }

                                                s((r = r.apply(e, t || [])).next())
                                            }))
                                        }(void 0, void 0, void 0, (function () {
                                            var e, t;
                                            return function (e, t) {
                                                var n, r, a, o, i = {
                                                    label: 0, sent: function () {
                                                        if (1 & a[0]) throw a[1];
                                                        return a[1]
                                                    }, trys: [], ops: []
                                                };
                                                return o = {
                                                    next: l(0),
                                                    throw: l(1),
                                                    return: l(2)
                                                }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                                                    return this
                                                }), o;

                                                function l(l) {
                                                    return function (s) {
                                                        return function (l) {
                                                            if (n) throw new TypeError("Generator is already executing.");
                                                            for (; o && (o = 0, l[0] && (i = 0)), i;) try {
                                                                if (n = 1, r && (a = 2 & l[0] ? r.return : l[0] ? r.throw || ((a = r.return) && a.call(r), 0) : r.next) && !(a = a.call(r, l[1])).done) return a;
                                                                switch (r = 0, a && (l = [2 & l[0], a.value]), l[0]) {
                                                                    case 0:
                                                                    case 1:
                                                                        a = l;
                                                                        break;
                                                                    case 4:
                                                                        return i.label++, {value: l[1], done: !1};
                                                                    case 5:
                                                                        i.label++, r = l[1], l = [0];
                                                                        continue;
                                                                    case 7:
                                                                        l = i.ops.pop(), i.trys.pop();
                                                                        continue;
                                                                    default:
                                                                        if (!((a = (a = i.trys).length > 0 && a[a.length - 1]) || 6 !== l[0] && 2 !== l[0])) {
                                                                            i = 0;
                                                                            continue
                                                                        }
                                                                        if (3 === l[0] && (!a || l[1] > a[0] && l[1] < a[3])) {
                                                                            i.label = l[1];
                                                                            break
                                                                        }
                                                                        if (6 === l[0] && i.label < a[1]) {
                                                                            i.label = a[1], a = l;
                                                                            break
                                                                        }
                                                                        if (a && i.label < a[2]) {
                                                                            i.label = a[2], i.ops.push(l);
                                                                            break
                                                                        }
                                                                        a[2] && i.ops.pop(), i.trys.pop();
                                                                        continue
                                                                }
                                                                l = t.call(e, i)
                                                            } catch (e) {
                                                                l = [6, e], r = 0
                                                            } finally {
                                                                n = a = 0
                                                            }
                                                            if (5 & l[0]) throw l[1];
                                                            return {value: l[0] ? l[1] : void 0, done: !0}
                                                        }([l, s])
                                                    }
                                                }
                                            }(this, (function (n) {
                                                switch (n.label) {
                                                    case 0:
                                                        return n.trys.push([0, 2, , 3]), [4, Pt(nn(0, l.toString()))];
                                                    case 1:
                                                        return e = n.sent(), [2, {
                                                            data: JSON.parse(Bt(e.data)),
                                                            total: e.total || 0
                                                        }];
                                                    case 2:
                                                        return t = n.sent(), console.error("Failed to fetch home movies:", t), [2, {
                                                            data: [],
                                                            total: 0
                                                        }];
                                                    case 3:
                                                        return [2]
                                                }
                                            }))
                                        }))
                                    }, staleTime: 3e5, cacheTime: 6e5
                                }), u = (0, r.useCallback)((function (e) {
                                    i((function (t) {
                                        var n = new URLSearchParams(t);
                                        return n.set("page", e.toString()), n
                                    }))
                                }), [i]), c = (0, r.useMemo)((function () {
                                    var e;
                                    return (null === (e = s.data) || void 0 === e ? void 0 : e.total) || 0
                                }), [null === (e = s.data) || void 0 === e ? void 0 : e.total]),
                                d = (0, r.useMemo)((function () {
                                    var e;
                                    return (null === (e = s.data) || void 0 === e ? void 0 : e.data) || []
                                }), [null === (n = s.data) || void 0 === n ? void 0 : n.data]);
                            return (0, t.jsxs)("div", {
                                className: "min-h-screen bg-gray-dark text-white",
                                children: [(0, t.jsx)("header", {
                                    className: "w-full fixed top-0 left-0 bg-gray-dark shadow-lg",
                                    style: {zIndex: 1e4},
                                    children: (0, t.jsx)(Gt, {})
                                }), (0, t.jsxs)("main", {
                                    className: "px-2 py-2 flex flex-col gap-4",
                                    style: {marginTop: "".concat(60, "px")},
                                    children: [s.isLoading && (0, t.jsx)(rn, {}), s.error && (0, t.jsx)(an, {message: s.error.message}), d.length > 0 && (0, t.jsx)(Ft, {
                                        data: d,
                                        title: "most popular"
                                    }), !s.isLoading && !s.error && 0 === d.length && (0, t.jsx)(on, {})]
                                }), c > 0 && (0, t.jsx)("footer", {
                                    className: "mt-auto",
                                    children: (0, t.jsx)(tn, {total: c, page: l, itemsPerPage: 24, onChange: u})
                                })]
                            })
                        }), {})
                    }), (0, t.jsx)(ie, {
                        path: "/", element: (0, t.jsx)((function () {
                            var e = G(), n = (0, r.useCallback)((function () {
                                var t = window, n = null == t ? void 0 : t.javLanguage;
                                n && (Ot("osLang", n), Ot("uiLanguage", ln[n] || n)), e("/home")
                            }), [e]);
                            return (0, r.useEffect)((function () {
                                n()
                            }), [n]), (0, t.jsxs)("div", {
                                className: "fixed inset-0 flex flex-col items-center justify-center bg-gray-dark",
                                role: "status",
                                "aria-label": "Loading application",
                                children: [(0, t.jsx)("div", {className: "w-8 h-8 border-2 border-sky-600 rounded-full border-t-transparent animate-spin"}), (0, t.jsx)("span", {
                                    className: "mt-4 text-sm text-gray-300",
                                    children: "Loading..."
                                })]
                            })
                        }), {})
                    }), (0, t.jsx)(ie, {
                        path: "/movie-info/:movieId", element: (0, t.jsx)((function () {
                            var e, n, a, o, i, l, s, u, c, d = J().movieId, f = pe()[0], p = G(),
                                h = (0, r.useState)(0), m = h[0], g = h[1], y = (0, r.useState)(!1),
                                v = (y[0], y[1], (0, r.useState)(!1)), b = v[0], w = v[1], x = (0, r.useState)(!1),
                                k = x[0], _ = x[1], S = ((0, r.useMemo)((function () {
                                    return "true" === f.get("series")
                                }), [f]), (0, r.useMemo)((function () {
                                    return Tt("uiLanguage")
                                }), [])), N = (0, he.useQueryClient)(), j = (0, he.useQuery)({
                                    queryKey: [d, "movieInfo"], queryFn: function () {
                                        return yn(void 0, void 0, void 0, (function () {
                                            var e;
                                            return vn(this, (function (t) {
                                                switch (t.label) {
                                                    case 0:
                                                        return [4, Pt("swx/movie/detail/" + d)];
                                                    case 1:
                                                        return [2, (e = t.sent()).data ? JSON.parse(Bt(e.data)) : null]
                                                }
                                            }))
                                        }))
                                    }, enabled: Boolean(d), retry: !1
                                }), C = (0, he.useQuery)({
                                    queryKey: [d, "Cast"], queryFn: function () {
                                        return yn(void 0, void 0, void 0, (function () {
                                            var e;
                                            return vn(this, (function (t) {
                                                switch (t.label) {
                                                    case 0:
                                                        return [4, Pt("swx/movie/actors/".concat(d, "?size=6&page=1"))];
                                                    case 1:
                                                        return [2, (e = t.sent()).data ? JSON.parse(Bt(e.data)) : []]
                                                }
                                            }))
                                        }))
                                    }, enabled: Boolean(d), retry: !1
                                }), P = (0, he.useQuery)({
                                    queryKey: [d, "subtitle"], queryFn: function () {
                                        return yn(void 0, void 0, void 0, (function () {
                                            var e;
                                            return vn(this, (function (t) {
                                                switch (t.label) {
                                                    case 0:
                                                        return [4, Pt("swx/subtitle-link/".concat(d))];
                                                    case 1:
                                                        return [2, (e = t.sent()).data ? JSON.parse(Bt(e.data)) : []]
                                                }
                                            }))
                                        }))
                                    }, enabled: Boolean(d), retry: !1
                                }), E = (0, he.useQuery)({
                                    queryKey: ["relatedMovies", null === (n = null === (e = C.data) || void 0 === e ? void 0 : e[0]) || void 0 === n ? void 0 : n.person_id],
                                    queryFn: function () {
                                        return yn(void 0, void 0, void 0, (function () {
                                            var e, t, n;
                                            return vn(this, (function (r) {
                                                switch (r.label) {
                                                    case 0:
                                                        return (null === (n = null === (t = C.data) || void 0 === t ? void 0 : t[0]) || void 0 === n ? void 0 : n.person_id) ? [4, Pt("swx/movie/search?person_id=".concat(C.data[0].person_id, "&page=1&size=12"))] : [2, []];
                                                    case 1:
                                                        return [2, (e = r.sent()).data ? JSON.parse(Bt(e.data)) : []]
                                                }
                                            }))
                                        }))
                                    },
                                    enabled: Boolean((null === (o = null === (a = C.data) || void 0 === a ? void 0 : a[0]) || void 0 === o ? void 0 : o.person_id) && b),
                                    retry: !1
                                }), A = (0, he.useQuery)({
                                    queryKey: ["countryMovies", null === (i = j.data) || void 0 === i ? void 0 : i.country],
                                    queryFn: function () {
                                        return yn(void 0, void 0, void 0, (function () {
                                            var e, t;
                                            return vn(this, (function (n) {
                                                switch (n.label) {
                                                    case 0:
                                                        return (null === (t = j.data) || void 0 === t ? void 0 : t.country) ? [4, Pt("swx/movie/search?page=1&size=12&country=".concat(encodeURIComponent(j.data.country)))] : [2, []];
                                                    case 1:
                                                        return [2, (e = n.sent()).data ? JSON.parse(Bt(e.data)) : []]
                                                }
                                            }))
                                        }))
                                    },
                                    enabled: Boolean((null === (l = j.data) || void 0 === l ? void 0 : l.country) && k && (E.isSuccess || !b)),
                                    retry: !1
                                }), I = (0, r.useCallback)((function (e) {
                                    return yn(void 0, void 0, void 0, (function () {
                                        var t;
                                        return vn(this, (function (n) {
                                            switch (n.label) {
                                                case 0:
                                                    return n.trys.push([0, 2, , 3]), [4, navigator.clipboard.writeText(e)];
                                                case 1:
                                                    return n.sent(), ct.success(Mt("copied", S)), [3, 3];
                                                case 2:
                                                    return t = n.sent(), console.warn("Failed to copy to clipboard:", t), [3, 3];
                                                case 3:
                                                    return [2]
                                            }
                                        }))
                                    }))
                                }), [S]), L = (0, r.useCallback)((function (e) {
                                    p(e)
                                }), [p]), T = ((0, r.useCallback)((function (e) {
                                    var t;
                                    if (null === (t = j.data) || void 0 === t ? void 0 : t.backdrop_images) {
                                        var n = j.data.backdrop_images.length - 1;
                                        g((function (t) {
                                            return "next" === e ? t < n ? t + 1 : t : t > 0 ? t - 1 : t
                                        }))
                                    }
                                }), [null === (s = j.data) || void 0 === s ? void 0 : s.backdrop_images]), (0, r.useCallback)((function (e, t) {
                                    var n = "/movie-info/".concat(e, "?series=false");
                                    p(n)
                                }), [p]), (0, r.useCallback)((function (e) {
                                    if (e) {
                                        var t = new IntersectionObserver((function (e) {
                                            var n, r;
                                            e[0].isIntersecting && (null === (r = null === (n = C.data) || void 0 === n ? void 0 : n[0]) || void 0 === r ? void 0 : r.person_id) && !b && (w(!0), t.disconnect())
                                        }), {threshold: .1});
                                        return t.observe(e), function () {
                                            return t.disconnect()
                                        }
                                    }
                                }), [C.data, b])), O = (0, r.useCallback)((function (e) {
                                    if (e) {
                                        var t = new IntersectionObserver((function (e) {
                                            var n;
                                            !e[0].isIntersecting || !(null === (n = j.data) || void 0 === n ? void 0 : n.country) || k || !E.isSuccess && b || (_(!0), t.disconnect())
                                        }), {threshold: .1});
                                        return t.observe(e), function () {
                                            return t.disconnect()
                                        }
                                    }
                                }), [null === (u = j.data) || void 0 === u ? void 0 : u.country, k, E.isSuccess, b]),
                                R = (0, r.useCallback)((function (e) {
                                    var t, n;
                                    return (null === (t = e.title_display_name.find((function (e) {
                                        return e.language === S
                                    }))) || void 0 === t ? void 0 : t.title) || (null === (n = e.title_display_name[0]) || void 0 === n ? void 0 : n.title) || e.title
                                }), [S]), M = ((0, r.useCallback)((function (e) {
                                    if (e) {
                                        var t = e.split("/"), n = t[t.length - 1] || "subtitle.srt";
                                        fetch(e).then((function (e) {
                                            return e.blob()
                                        })).then((function (e) {
                                            (0, cn.saveAs)(e, n)
                                        })).catch((function () {
                                            ct.error("Failed to download subtitle")
                                        }))
                                    }
                                }), []), (0, r.useCallback)((function (e) {
                                    var t, n,
                                        r = null === (t = e.discription) || void 0 === t ? void 0 : t.find((function (e) {
                                            return e.language === S
                                        })),
                                        a = null === (n = e.discription) || void 0 === n ? void 0 : n.find((function (e) {
                                            return "en" === e.language
                                        }));
                                    return (null == r ? void 0 : r.overview) || (null == a ? void 0 : a.overview) || ""
                                }), [S])), z = (0, r.useCallback)((function (e) {
                                    return e.also_known_as && e.also_known_as[wn[S]] || e.name
                                }), [S]), U = (0, r.useCallback)((function () {
                                    var e;
                                    if (!(null === (e = P.data) || void 0 === e ? void 0 : e.subtitle_link)) return null;
                                    var t = S.toUpperCase(), n = P.data.subtitle_link.find((function (e) {
                                        return Object.keys(e)[0] === t
                                    }));
                                    return n ? Object.values(n)[0] : null
                                }), [P.data, S]), F = (0, r.useCallback)((function () {
                                    var e;
                                    return (null === (e = P.data) || void 0 === e ? void 0 : e.subtitle_link) ? P.data.subtitle_link.map((function (e) {
                                        return {language: Object.keys(e)[0].toLowerCase(), file_link: Object.values(e)[0]}
                                    })) : []
                                }), [P.data]), D = (0, r.useCallback)((function (e, t) {
                                    N.setQueryData([d, "subtitle"], (function (n) {
                                        var r, a, o;
                                        if (!n) return {subtitle_link: [(r = {}, r[e.toUpperCase()] = t, r)]};
                                        var i = n.subtitle_link.findIndex((function (t) {
                                            return Object.keys(t)[0].toLowerCase() === e.toLowerCase()
                                        }));
                                        if (i >= 0) {
                                            var l = bn([], n.subtitle_link, !0);
                                            return l[i] = ((a = {})[e.toUpperCase()] = t, a), gn(gn({}, n), {subtitle_link: l})
                                        }
                                        return gn(gn({}, n), {subtitle_link: bn(bn([], n.subtitle_link, !0), [(o = {}, o[e.toUpperCase()] = t, o)], !1)})
                                    }))
                                }), [d, N]);
                            if (j.isLoading || C.isLoading) return (0, t.jsxs)("div", {
                                className: "min-h-screen bg-gray-dark text-white",
                                children: [(0, t.jsx)(Gt, {}), (0, t.jsx)("div", {
                                    className: "flex items-center justify-center h-96",
                                    children: (0, t.jsx)("div", {className: "w-8 h-8 border-2 border-sky-600 rounded-full border-t-transparent animate-spin"})
                                })]
                            });
                            if (!j.data) return (0, t.jsxs)("div", {
                                className: "min-h-screen bg-gray-dark text-white",
                                children: [(0, t.jsx)(Gt, {}), (0, t.jsx)("div", {
                                    className: "flex items-center justify-center h-96",
                                    children: (0, t.jsx)("p", {children: "Movie not found"})
                                })]
                            });
                            var B = j.data, Q = C.data || [], W = R(B), q = M(B), V = (U(), F());
                            return (0, t.jsxs)("div", {
                                className: "min-h-screen bg-gray-dark text-white",
                                children: [(0, t.jsx)(Gt, {}), (0, t.jsxs)("div", {
                                    className: "max-w-7xl mx-auto px-4 py-6 mt-[45px]",
                                    children: [(0, t.jsx)("div", {
                                        className: "mb-6",
                                        children: (0, t.jsxs)("div", {
                                            className: "flex items-center gap-2 mb-4",
                                            children: [(0, t.jsx)("h1", {
                                                className: "text-2xl font-bold",
                                                children: q || W
                                            }), (0, t.jsx)("button", {
                                                onClick: function () {
                                                    return I(q || W)
                                                },
                                                className: "p-1 hover:bg-gray-700 rounded transition-colors",
                                                title: "Copy title",
                                                children: "📋"
                                            })]
                                        })
                                    }), (0, t.jsxs)("div", {
                                        className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8",
                                        children: [(0, t.jsx)("div", {
                                            className: "bg-gray-800 rounded-lg p-4 flex justify-center",
                                            children: (0, t.jsx)("img", {
                                                src: B.cover_image || "/images/dummy_cover.jpg",
                                                alt: W,
                                                className: "max-w-full max-h-96 object-contain rounded",
                                                onError: function (e) {
                                                    e.target.src = "/images/dummy_cover.jpg"
                                                }
                                            })
                                        }), (0, t.jsxs)("div", {
                                            className: "bg-gray-800 rounded-lg p-6 space-y-4",
                                            children: [(0, t.jsxs)("div", {
                                                className: "space-y-3 text-lg",
                                                children: [(0, t.jsxs)("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [(0, t.jsxs)("span", {children: [(0, t.jsxs)("strong", {children: [Mt("title", S), ":"]}), " ", W]}), (0, t.jsx)("button", {
                                                        onClick: function () {
                                                            return I(W)
                                                        },
                                                        className: "p-1 hover:bg-gray-700 rounded transition-colors",
                                                        title: "Copy title",
                                                        children: "📋"
                                                    })]
                                                }), (0, t.jsxs)("div", {children: [(0, t.jsxs)("strong", {children: [Mt("release_date", S), ":"]}), " ", B.share_date || "N/A"]}), (0, t.jsxs)("div", {children: [(0, t.jsxs)("strong", {children: [Mt("duration", S), ":"]}), " ", B.video_duration ? "".concat(B.video_duration, " min") : "N/A"]}), (0, t.jsxs)("div", {children: [(0, t.jsxs)("strong", {children: [Mt("Size", S), ":"]}), " ", B.file_size_2 || "N/A"]}), B.country && (0, t.jsxs)("div", {
                                                    children: [(0, t.jsxs)("strong", {children: [Mt("Maker", S), ":"]}), " ", (0, t.jsx)("button", {
                                                        onClick: function () {
                                                            return L("/filter/country/".concat(encodeURIComponent(B.country)))
                                                        },
                                                        className: "text-blue-400 hover:text-blue-300 underline",
                                                        children: B.country
                                                    })]
                                                }), (0, t.jsxs)("div", {
                                                    children: [(0, t.jsxs)("strong", {children: [Mt("cast", S), ":"]}), " ", Q.length > 0 ? Q.slice(0, 3).map((function (e, n) {
                                                        return (0, t.jsxs)("span", {
                                                            children: [(0, t.jsx)("button", {
                                                                onClick: function () {
                                                                    return L("/actor/".concat(e.person_id))
                                                                },
                                                                className: "text-blue-400 hover:text-blue-300 underline",
                                                                children: z(e)
                                                            }), n < Math.min(Q.length - 1, 2) && ", "]
                                                        }, e._id)
                                                    })) : "N/A"]
                                                })]
                                            }), (0, t.jsxs)("div", {
                                                className: "space-y-3 mt-6",
                                                children: [B.torrent_url_2 && (0, t.jsxs)(t.Fragment, {
                                                    children: [(0, t.jsx)("button", {
                                                        onClick: function () {
                                                            return I(B.torrent_url_2.url)
                                                        },
                                                        className: "w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors",
                                                        children: Mt("copy_magnet_uri", S) || "Copy Magnet URI"
                                                    }), (0, t.jsx)("button", {
                                                        onClick: function () {
                                                            return window.open(B.torrent_url_2.url, "_blank")
                                                        },
                                                        className: "w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors",
                                                        children: Mt("start_downloading", S) || "Start Downloading"
                                                    })]
                                                }), (0, t.jsx)("button", {
                                                    onClick: function () {
                                                        return L("/usecase")
                                                    },
                                                    className: "w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors",
                                                    children: Mt("watch_online", S) || "Watch Online"
                                                })]
                                            })]
                                        })]
                                    }), V && V.length > 0 && (0, t.jsx)("div", {
                                        className: "mt-8 border border-gray-600 bg-gray-800 rounded-lg",
                                        children: (0, t.jsx)(mn, {
                                            movieId: d,
                                            availableSubtitles: V,
                                            movieTitle: W,
                                            onSubtitleUploaded: D
                                        })
                                    }), B.backdrop_images && B.backdrop_images.length > 0 && (0, t.jsxs)("div", {
                                        className: "mt-8 border border-gray-600 bg-gray-800 rounded-lg p-4",
                                        children: [(0, t.jsx)("h2", {
                                            className: "font-bold text-white text-xl mb-4",
                                            children: Mt("snapshots", S) || "Snapshots"
                                        }), (0, t.jsxs)("div", {
                                            className: "relative flex items-center justify-center h-[480px] rounded-lg overflow-hidden",
                                            children: [(0, t.jsx)("button", {
                                                className: "absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full z-10 transition-all duration-200",
                                                onClick: function () {
                                                    return g(0 === m ? B.backdrop_images.length - 1 : m - 1)
                                                },
                                                children: (0, t.jsx)("svg", {
                                                    className: "text-white w-5 h-5",
                                                    fill: "currentColor",
                                                    viewBox: "0 0 20 20",
                                                    children: (0, t.jsx)("path", {
                                                        fillRule: "evenodd",
                                                        d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
                                                        clipRule: "evenodd"
                                                    })
                                                })
                                            }), (0, t.jsx)("div", {
                                                className: "w-full h-full flex items-center justify-center",
                                                children: B.backdrop_images.map((function (e, n) {
                                                    return (0, t.jsx)("img", {
                                                        className: "max-h-full w-auto object-contain rounded-md transition-all duration-500 ".concat(m === n ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute"),
                                                        src: e,
                                                        alt: "Backdrop ".concat(n + 1),
                                                        loading: "lazy"
                                                    }, n)
                                                }))
                                            }), (0, t.jsx)("button", {
                                                className: "absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full z-10 transition-all duration-200",
                                                onClick: function () {
                                                    return g(m === B.backdrop_images.length - 1 ? 0 : m + 1)
                                                },
                                                children: (0, t.jsx)("svg", {
                                                    className: "text-white w-5 h-5",
                                                    fill: "currentColor",
                                                    viewBox: "0 0 20 20",
                                                    children: (0, t.jsx)("path", {
                                                        fillRule: "evenodd",
                                                        d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
                                                        clipRule: "evenodd"
                                                    })
                                                })
                                            })]
                                        })]
                                    }), C.data && C.data.length > 0 && (0, t.jsx)("div", {
                                        ref: T,
                                        className: "mt-8",
                                        children: b ? E.isLoading ? (0, t.jsxs)("div", {
                                            className: "flex items-center justify-center h-32 border border-gray-600 bg-gray-800 rounded-lg",
                                            children: [(0, t.jsx)("div", {className: "w-6 h-6 border-2 border-sky-600 rounded-full border-t-transparent animate-spin"}), (0, t.jsxs)("span", {
                                                className: "ml-2 text-gray-400",
                                                children: [Mt("loading_also_starred", S), "..."]
                                            })]
                                        }) : E.data && E.data.length > 1 ? (0, t.jsx)(Ft, {
                                            data: E.data.filter((function (e) {
                                                return e._id !== d
                                            })), title: "also_stared"
                                        }) : b && (0, t.jsx)("div", {
                                            className: "text-center text-gray-400 py-8 border border-gray-600 bg-gray-800 rounded-lg",
                                            children: "No related movies found for this actor."
                                        }) : (0, t.jsx)("div", {
                                            className: "flex items-center justify-center h-32 border border-gray-600 bg-gray-800 rounded-lg",
                                            children: (0, t.jsx)("div", {
                                                className: "text-gray-400",
                                                children: "Scroll to load related movies..."
                                            })
                                        })
                                    }), (null === (c = j.data) || void 0 === c ? void 0 : c.country) && (0, t.jsx)("div", {
                                        ref: O,
                                        className: "mt-8",
                                        children: k ? A.isLoading ? (0, t.jsxs)("div", {
                                            className: "flex items-center justify-center h-32 border border-gray-600 bg-gray-800 rounded-lg",
                                            children: [(0, t.jsx)("div", {className: "w-6 h-6 border-2 border-sky-600 rounded-full border-t-transparent animate-spin"}), (0, t.jsxs)("span", {
                                                className: "ml-2 text-gray-400",
                                                children: ["Loading movies from ", j.data.country, "..."]
                                            })]
                                        }) : A.data && A.data.length > 1 ? (0, t.jsx)(Ft, {
                                            data: A.data.filter((function (e) {
                                                return e._id !== d
                                            })), title: "titles_by_same_maker"
                                        }) : null : (0, t.jsx)("div", {
                                            className: "flex items-center justify-center h-32 border border-gray-600 bg-gray-800 rounded-lg",
                                            children: (0, t.jsxs)("div", {
                                                className: "text-gray-400",
                                                children: ["Scroll to load movies from ", j.data.country, "..."]
                                            })
                                        })
                                    })]
                                })]
                            })
                        }), {})
                    }), (0, t.jsx)(ie, {
                        path: "/movie-list", element: (0, t.jsx)((function () {
                            var e, n, a = pe(), o = a[0], i = a[1], l = (0, r.useMemo)((function () {
                                    return Number(o.get("page")) || 1
                                }), [o]), s = (0, r.useMemo)((function () {
                                    return o.get("category")
                                }), [o]), u = (0, he.useQuery)({
                                    queryKey: ["movie-list", s, l], queryFn: function () {
                                        return function (e, t, n, r) {
                                            return new (n || (n = Promise))((function (a, o) {
                                                function i(e) {
                                                    try {
                                                        s(r.next(e))
                                                    } catch (e) {
                                                        o(e)
                                                    }
                                                }

                                                function l(e) {
                                                    try {
                                                        s(r.throw(e))
                                                    } catch (e) {
                                                        o(e)
                                                    }
                                                }

                                                function s(e) {
                                                    var t;
                                                    e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                                                        e(t)
                                                    }))).then(i, l)
                                                }

                                                s((r = r.apply(e, t || [])).next())
                                            }))
                                        }(void 0, void 0, void 0, (function () {
                                            var e, t;
                                            return function (e, t) {
                                                var n, r, a, o, i = {
                                                    label: 0, sent: function () {
                                                        if (1 & a[0]) throw a[1];
                                                        return a[1]
                                                    }, trys: [], ops: []
                                                };
                                                return o = {
                                                    next: l(0),
                                                    throw: l(1),
                                                    return: l(2)
                                                }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                                                    return this
                                                }), o;

                                                function l(l) {
                                                    return function (s) {
                                                        return function (l) {
                                                            if (n) throw new TypeError("Generator is already executing.");
                                                            for (; o && (o = 0, l[0] && (i = 0)), i;) try {
                                                                if (n = 1, r && (a = 2 & l[0] ? r.return : l[0] ? r.throw || ((a = r.return) && a.call(r), 0) : r.next) && !(a = a.call(r, l[1])).done) return a;
                                                                switch (r = 0, a && (l = [2 & l[0], a.value]), l[0]) {
                                                                    case 0:
                                                                    case 1:
                                                                        a = l;
                                                                        break;
                                                                    case 4:
                                                                        return i.label++, {value: l[1], done: !1};
                                                                    case 5:
                                                                        i.label++, r = l[1], l = [0];
                                                                        continue;
                                                                    case 7:
                                                                        l = i.ops.pop(), i.trys.pop();
                                                                        continue;
                                                                    default:
                                                                        if (!((a = (a = i.trys).length > 0 && a[a.length - 1]) || 6 !== l[0] && 2 !== l[0])) {
                                                                            i = 0;
                                                                            continue
                                                                        }
                                                                        if (3 === l[0] && (!a || l[1] > a[0] && l[1] < a[3])) {
                                                                            i.label = l[1];
                                                                            break
                                                                        }
                                                                        if (6 === l[0] && i.label < a[1]) {
                                                                            i.label = a[1], a = l;
                                                                            break
                                                                        }
                                                                        if (a && i.label < a[2]) {
                                                                            i.label = a[2], i.ops.push(l);
                                                                            break
                                                                        }
                                                                        a[2] && i.ops.pop(), i.trys.pop();
                                                                        continue
                                                                }
                                                                l = t.call(e, i)
                                                            } catch (e) {
                                                                l = [6, e], r = 0
                                                            } finally {
                                                                n = a = 0
                                                            }
                                                            if (5 & l[0]) throw l[1];
                                                            return {value: l[0] ? l[1] : void 0, done: !0}
                                                        }([l, s])
                                                    }
                                                }
                                            }(this, (function (n) {
                                                switch (n.label) {
                                                    case 0:
                                                        return n.trys.push([0, 2, , 3]), [4, Pt(xn(s, l.toString()))];
                                                    case 1:
                                                        return e = n.sent(), [2, {
                                                            data: JSON.parse(Bt(e.data)),
                                                            total: e.total || 0
                                                        }];
                                                    case 2:
                                                        return t = n.sent(), console.error("Failed to fetch movie list:", t), [2, {
                                                            data: [],
                                                            total: 0
                                                        }];
                                                    case 3:
                                                        return [2]
                                                }
                                            }))
                                        }))
                                    }, enabled: Boolean(s), staleTime: 3e5, cacheTime: 6e5
                                }), c = (0, r.useCallback)((function (e) {
                                    i((function (t) {
                                        var n = new URLSearchParams(t);
                                        return n.set("page", e.toString()), n
                                    }))
                                }), [i]), d = (0, r.useMemo)((function () {
                                    var e;
                                    return (null === (e = u.data) || void 0 === e ? void 0 : e.total) || 0
                                }), [null === (e = u.data) || void 0 === e ? void 0 : e.total]),
                                f = (0, r.useMemo)((function () {
                                    var e;
                                    return (null === (e = u.data) || void 0 === e ? void 0 : e.data) || []
                                }), [null === (n = u.data) || void 0 === n ? void 0 : n.data]);
                            return (0, t.jsxs)("div", {
                                className: "min-h-screen bg-gray-dark text-white",
                                children: [(0, t.jsx)("header", {
                                    className: "w-full fixed top-0 left-0 bg-gray-dark shadow-lg",
                                    style: {zIndex: 1e4},
                                    children: (0, t.jsx)(Gt, {})
                                }), (0, t.jsxs)("main", {
                                    className: "px-2 py-2 flex flex-col gap-4",
                                    style: {marginTop: "".concat(60, "px")},
                                    children: [u.isLoading && (0, t.jsx)(kn, {}), u.error && (0, t.jsx)(_n, {message: u.error.message}), f.length > 0 && (0, t.jsx)(Ft, {
                                        data: f,
                                        title: s || "Unknown Category"
                                    }), !u.isLoading && !u.error && 0 === f.length && (0, t.jsx)(Sn, {category: s}), d > 0 && (0, t.jsx)(tn, {
                                        total: d,
                                        page: l,
                                        itemsPerPage: 24,
                                        onChange: c
                                    })]
                                })]
                            })
                        }), {})
                    }), (0, t.jsx)(ie, {
                        path: "/genre", element: (0, t.jsx)((function () {
                            var e, n = (0, r.useMemo)((function () {
                                    return Tt("uiLanguage")
                                }), []), a = (0, r.useState)(""), o = a[0], i = a[1], l = G(), s = (0, r.useRef)(null),
                                u = (0, he.useQuery)({
                                    queryKey: ["genre"], queryFn: function () {
                                        return function (e, t, n, r) {
                                            return new (n || (n = Promise))((function (a, o) {
                                                function i(e) {
                                                    try {
                                                        s(r.next(e))
                                                    } catch (e) {
                                                        o(e)
                                                    }
                                                }

                                                function l(e) {
                                                    try {
                                                        s(r.throw(e))
                                                    } catch (e) {
                                                        o(e)
                                                    }
                                                }

                                                function s(e) {
                                                    var t;
                                                    e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                                                        e(t)
                                                    }))).then(i, l)
                                                }

                                                s((r = r.apply(e, t || [])).next())
                                            }))
                                        }(void 0, void 0, void 0, (function () {
                                            var e;
                                            return function (e, t) {
                                                var n, r, a, o, i = {
                                                    label: 0, sent: function () {
                                                        if (1 & a[0]) throw a[1];
                                                        return a[1]
                                                    }, trys: [], ops: []
                                                };
                                                return o = {
                                                    next: l(0),
                                                    throw: l(1),
                                                    return: l(2)
                                                }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                                                    return this
                                                }), o;

                                                function l(l) {
                                                    return function (s) {
                                                        return function (l) {
                                                            if (n) throw new TypeError("Generator is already executing.");
                                                            for (; o && (o = 0, l[0] && (i = 0)), i;) try {
                                                                if (n = 1, r && (a = 2 & l[0] ? r.return : l[0] ? r.throw || ((a = r.return) && a.call(r), 0) : r.next) && !(a = a.call(r, l[1])).done) return a;
                                                                switch (r = 0, a && (l = [2 & l[0], a.value]), l[0]) {
                                                                    case 0:
                                                                    case 1:
                                                                        a = l;
                                                                        break;
                                                                    case 4:
                                                                        return i.label++, {value: l[1], done: !1};
                                                                    case 5:
                                                                        i.label++, r = l[1], l = [0];
                                                                        continue;
                                                                    case 7:
                                                                        l = i.ops.pop(), i.trys.pop();
                                                                        continue;
                                                                    default:
                                                                        if (!((a = (a = i.trys).length > 0 && a[a.length - 1]) || 6 !== l[0] && 2 !== l[0])) {
                                                                            i = 0;
                                                                            continue
                                                                        }
                                                                        if (3 === l[0] && (!a || l[1] > a[0] && l[1] < a[3])) {
                                                                            i.label = l[1];
                                                                            break
                                                                        }
                                                                        if (6 === l[0] && i.label < a[1]) {
                                                                            i.label = a[1], a = l;
                                                                            break
                                                                        }
                                                                        if (a && i.label < a[2]) {
                                                                            i.label = a[2], i.ops.push(l);
                                                                            break
                                                                        }
                                                                        a[2] && i.ops.pop(), i.trys.pop();
                                                                        continue
                                                                }
                                                                l = t.call(e, i)
                                                            } catch (e) {
                                                                l = [6, e], r = 0
                                                            } finally {
                                                                n = a = 0
                                                            }
                                                            if (5 & l[0]) throw l[1];
                                                            return {value: l[0] ? l[1] : void 0, done: !0}
                                                        }([l, s])
                                                    }
                                                }
                                            }(this, (function (t) {
                                                switch (t.label) {
                                                    case 0:
                                                        return t.trys.push([0, 2, , 3]), [4, Pt("common/list-genre")];
                                                    case 1:
                                                        return [2, t.sent()];
                                                    case 2:
                                                        throw e = t.sent(), console.error("Failed to fetch genres:", e), e;
                                                    case 3:
                                                        return [2]
                                                }
                                            }))
                                        }))
                                    }, staleTime: 6e5, cacheTime: 18e5
                                }), c = (0, r.useCallback)((function () {
                                    s.current && i(s.current.value.trim())
                                }), []), d = (0, r.useCallback)((function (e) {
                                    var t = e.currentTarget.dataset.id;
                                    t && l("/filter/genre/".concat(encodeURIComponent(t)))
                                }), [l]), f = (0, r.useCallback)((function (e) {
                                    "Enter" === e.key && (e.preventDefault(), c())
                                }), [c]), p = (0, r.useMemo)((function () {
                                    var e;
                                    if (!(null === (e = u.data) || void 0 === e ? void 0 : e.data)) return [];
                                    if (!o.trim()) return u.data.data;
                                    var t = new RegExp(o, "i");
                                    return u.data.data.filter((function (e) {
                                        return t.test(e)
                                    }))
                                }), [null === (e = u.data) || void 0 === e ? void 0 : e.data, o]);
                            return (0, t.jsxs)("div", {
                                className: "min-h-screen bg-gray-dark text-white",
                                children: [(0, t.jsx)("header", {
                                    className: "w-full fixed top-0 left-0 bg-gray-dark shadow-lg",
                                    style: {zIndex: 1e4},
                                    children: (0, t.jsx)(Gt, {})
                                }), (0, t.jsxs)("main", {
                                    className: "px-2 py-2 flex flex-col gap-4",
                                    style: {marginTop: "".concat(60, "px")},
                                    children: [u.isLoading && (0, t.jsx)(jn, {}), u.error && (0, t.jsx)(Cn, {message: u.error.message}), u.data && (0, t.jsxs)("div", {
                                        className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4",
                                        children: [(0, t.jsxs)("div", {
                                            className: "col-span-full flex items-center gap-2 mb-2",
                                            children: [(0, t.jsx)("input", {
                                                ref: s,
                                                type: "text",
                                                onKeyDown: f,
                                                className: "bg-white/5 text-sm border border-gray-light px-3 py-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200",
                                                placeholder: "".concat(Mt("search", n), " ").concat(Mt("genre", n), "..."),
                                                "aria-label": "Search ".concat(Mt("genre", n))
                                            }), (0, t.jsx)("button", {
                                                onClick: c,
                                                className: "px-4 py-2 text-sm rounded-md bg-sky-600 hover:bg-sky-700 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500",
                                                "aria-label": Mt("search", n),
                                                children: Mt("search", n)
                                            })]
                                        }), p.map((function (e) {
                                            return (0, t.jsx)(Nn, {genre: e, onClick: d}, e)
                                        })), 0 === p.length && o.trim() && (0, t.jsx)("div", {
                                            className: "col-span-full text-center py-8",
                                            children: (0, t.jsx)(Pn, {keyword: o, locale: n})
                                        })]
                                    })]
                                })]
                            })
                        }), {})
                    }), (0, t.jsx)(ie, {
                        path: "/maker", element: (0, t.jsx)((function () {
                            var e, n = G(), a = (0, r.useMemo)((function () {
                                    return Tt("uiLanguage")
                                }), []), o = (0, r.useState)(""), i = o[0], l = o[1], s = (0, r.useRef)(null),
                                u = (0, he.useQuery)({
                                    queryKey: ["countries"], queryFn: function () {
                                        return function (e, t, n, r) {
                                            return new (n || (n = Promise))((function (a, o) {
                                                function i(e) {
                                                    try {
                                                        s(r.next(e))
                                                    } catch (e) {
                                                        o(e)
                                                    }
                                                }

                                                function l(e) {
                                                    try {
                                                        s(r.throw(e))
                                                    } catch (e) {
                                                        o(e)
                                                    }
                                                }

                                                function s(e) {
                                                    var t;
                                                    e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                                                        e(t)
                                                    }))).then(i, l)
                                                }

                                                s((r = r.apply(e, t || [])).next())
                                            }))
                                        }(void 0, void 0, void 0, (function () {
                                            var e;
                                            return function (e, t) {
                                                var n, r, a, o, i = {
                                                    label: 0, sent: function () {
                                                        if (1 & a[0]) throw a[1];
                                                        return a[1]
                                                    }, trys: [], ops: []
                                                };
                                                return o = {
                                                    next: l(0),
                                                    throw: l(1),
                                                    return: l(2)
                                                }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                                                    return this
                                                }), o;

                                                function l(l) {
                                                    return function (s) {
                                                        return function (l) {
                                                            if (n) throw new TypeError("Generator is already executing.");
                                                            for (; o && (o = 0, l[0] && (i = 0)), i;) try {
                                                                if (n = 1, r && (a = 2 & l[0] ? r.return : l[0] ? r.throw || ((a = r.return) && a.call(r), 0) : r.next) && !(a = a.call(r, l[1])).done) return a;
                                                                switch (r = 0, a && (l = [2 & l[0], a.value]), l[0]) {
                                                                    case 0:
                                                                    case 1:
                                                                        a = l;
                                                                        break;
                                                                    case 4:
                                                                        return i.label++, {value: l[1], done: !1};
                                                                    case 5:
                                                                        i.label++, r = l[1], l = [0];
                                                                        continue;
                                                                    case 7:
                                                                        l = i.ops.pop(), i.trys.pop();
                                                                        continue;
                                                                    default:
                                                                        if (!((a = (a = i.trys).length > 0 && a[a.length - 1]) || 6 !== l[0] && 2 !== l[0])) {
                                                                            i = 0;
                                                                            continue
                                                                        }
                                                                        if (3 === l[0] && (!a || l[1] > a[0] && l[1] < a[3])) {
                                                                            i.label = l[1];
                                                                            break
                                                                        }
                                                                        if (6 === l[0] && i.label < a[1]) {
                                                                            i.label = a[1], a = l;
                                                                            break
                                                                        }
                                                                        if (a && i.label < a[2]) {
                                                                            i.label = a[2], i.ops.push(l);
                                                                            break
                                                                        }
                                                                        a[2] && i.ops.pop(), i.trys.pop();
                                                                        continue
                                                                }
                                                                l = t.call(e, i)
                                                            } catch (e) {
                                                                l = [6, e], r = 0
                                                            } finally {
                                                                n = a = 0
                                                            }
                                                            if (5 & l[0]) throw l[1];
                                                            return {value: l[0] ? l[1] : void 0, done: !0}
                                                        }([l, s])
                                                    }
                                                }
                                            }(this, (function (t) {
                                                switch (t.label) {
                                                    case 0:
                                                        return t.trys.push([0, 2, , 3]), [4, Pt("common/country-list")];
                                                    case 1:
                                                        return [2, t.sent()];
                                                    case 2:
                                                        throw e = t.sent(), console.error("Failed to fetch countries:", e), e;
                                                    case 3:
                                                        return [2]
                                                }
                                            }))
                                        }))
                                    }, staleTime: 6e5, cacheTime: 18e5
                                }), c = (0, r.useCallback)((function () {
                                    s.current && l(s.current.value.trim())
                                }), []), d = (0, r.useCallback)((function (e) {
                                    var t = e.currentTarget.dataset.id;
                                    t && n("/filter/country/".concat(encodeURIComponent(t)))
                                }), [n]), f = (0, r.useCallback)((function (e) {
                                    "Enter" === e.key && (e.preventDefault(), c())
                                }), [c]), p = (0, r.useMemo)((function () {
                                    var e;
                                    if (!(null === (e = u.data) || void 0 === e ? void 0 : e.data)) return [];
                                    if (!i.trim()) return u.data.data;
                                    var t = new RegExp(i, "i");
                                    return u.data.data.filter((function (e) {
                                        return t.test(e)
                                    }))
                                }), [null === (e = u.data) || void 0 === e ? void 0 : e.data, i]);
                            return (0, t.jsxs)("div", {
                                className: "min-h-screen bg-gray-dark text-white",
                                children: [(0, t.jsx)("header", {
                                    className: "w-full fixed top-0 left-0 bg-gray-dark shadow-lg",
                                    style: {zIndex: 1e4},
                                    children: (0, t.jsx)(Gt, {})
                                }), (0, t.jsxs)("main", {
                                    className: "px-2 py-2 flex flex-col gap-4",
                                    style: {marginTop: "".concat(60, "px")},
                                    children: [u.isLoading && (0, t.jsx)(An, {}), u.error && (0, t.jsx)(In, {message: u.error.message}), u.data && (0, t.jsxs)("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4",
                                        children: [(0, t.jsxs)("div", {
                                            className: "col-span-full flex items-center gap-2 mb-2",
                                            children: [(0, t.jsx)("input", {
                                                ref: s,
                                                type: "text",
                                                onKeyDown: f,
                                                className: "bg-white/5 text-sm border border-gray-light px-3 py-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200",
                                                placeholder: "".concat(Mt("search", a), " ").concat(Mt("country", a), "..."),
                                                "aria-label": "Search ".concat(Mt("country", a))
                                            }), (0, t.jsx)("button", {
                                                onClick: c,
                                                className: "px-4 py-2 text-sm rounded-md bg-sky-600 hover:bg-sky-700 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500",
                                                "aria-label": Mt("search", a),
                                                children: Mt("search", a)
                                            })]
                                        }), p.map((function (e) {
                                            return (0, t.jsx)(En, {country: e, onClick: d}, e)
                                        })), 0 === p.length && i.trim() && (0, t.jsx)("div", {
                                            className: "col-span-full text-center py-8",
                                            children: (0, t.jsx)(Ln, {keyword: i, locale: a})
                                        })]
                                    })]
                                })]
                            })
                        }), {})
                    }), (0, t.jsx)(ie, {
                        path: "/actor-list", element: (0, t.jsx)((function () {
                            var e, n, a = pe(), o = a[0], i = a[1], l = (0, r.useMemo)((function () {
                                    return Number(o.get("page")) || 1
                                }), [o]), s = (0, r.useMemo)((function () {
                                    return o.get("category") || ""
                                }), [o]), u = (0, he.useQuery)({
                                    queryKey: ["actor", s, l], queryFn: function () {
                                        return function (e, t, n, r) {
                                            return new (n || (n = Promise))((function (a, o) {
                                                function i(e) {
                                                    try {
                                                        s(r.next(e))
                                                    } catch (e) {
                                                        o(e)
                                                    }
                                                }

                                                function l(e) {
                                                    try {
                                                        s(r.throw(e))
                                                    } catch (e) {
                                                        o(e)
                                                    }
                                                }

                                                function s(e) {
                                                    var t;
                                                    e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                                                        e(t)
                                                    }))).then(i, l)
                                                }

                                                s((r = r.apply(e, t || [])).next())
                                            }))
                                        }(void 0, void 0, void 0, (function () {
                                            var e, t, n;
                                            return function (e, t) {
                                                var n, r, a, o, i = {
                                                    label: 0, sent: function () {
                                                        if (1 & a[0]) throw a[1];
                                                        return a[1]
                                                    }, trys: [], ops: []
                                                };
                                                return o = {
                                                    next: l(0),
                                                    throw: l(1),
                                                    return: l(2)
                                                }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                                                    return this
                                                }), o;

                                                function l(l) {
                                                    return function (s) {
                                                        return function (l) {
                                                            if (n) throw new TypeError("Generator is already executing.");
                                                            for (; o && (o = 0, l[0] && (i = 0)), i;) try {
                                                                if (n = 1, r && (a = 2 & l[0] ? r.return : l[0] ? r.throw || ((a = r.return) && a.call(r), 0) : r.next) && !(a = a.call(r, l[1])).done) return a;
                                                                switch (r = 0, a && (l = [2 & l[0], a.value]), l[0]) {
                                                                    case 0:
                                                                    case 1:
                                                                        a = l;
                                                                        break;
                                                                    case 4:
                                                                        return i.label++, {value: l[1], done: !1};
                                                                    case 5:
                                                                        i.label++, r = l[1], l = [0];
                                                                        continue;
                                                                    case 7:
                                                                        l = i.ops.pop(), i.trys.pop();
                                                                        continue;
                                                                    default:
                                                                        if (!((a = (a = i.trys).length > 0 && a[a.length - 1]) || 6 !== l[0] && 2 !== l[0])) {
                                                                            i = 0;
                                                                            continue
                                                                        }
                                                                        if (3 === l[0] && (!a || l[1] > a[0] && l[1] < a[3])) {
                                                                            i.label = l[1];
                                                                            break
                                                                        }
                                                                        if (6 === l[0] && i.label < a[1]) {
                                                                            i.label = a[1], a = l;
                                                                            break
                                                                        }
                                                                        if (a && i.label < a[2]) {
                                                                            i.label = a[2], i.ops.push(l);
                                                                            break
                                                                        }
                                                                        a[2] && i.ops.pop(), i.trys.pop();
                                                                        continue
                                                                }
                                                                l = t.call(e, i)
                                                            } catch (e) {
                                                                l = [6, e], r = 0
                                                            } finally {
                                                                n = a = 0
                                                            }
                                                            if (5 & l[0]) throw l[1];
                                                            return {value: l[0] ? l[1] : void 0, done: !0}
                                                        }([l, s])
                                                    }
                                                }
                                            }(this, (function (r) {
                                                switch (r.label) {
                                                    case 0:
                                                        return r.trys.push([0, 2, , 3]), e = 48 * (l - 1), [4, Pt("swx/movie/actor/".concat(s, "?offset=").concat(e, "&limit=").concat(48))];
                                                    case 1:
                                                        return t = r.sent(), [2, {
                                                            data: JSON.parse(Bt(t.data)),
                                                            total: t.total || 0
                                                        }];
                                                    case 2:
                                                        return n = r.sent(), console.error("Failed to fetch actor list:", n), [2, {
                                                            data: [],
                                                            total: 0
                                                        }];
                                                    case 3:
                                                        return [2]
                                                }
                                            }))
                                        }))
                                    }, enabled: Boolean(s), staleTime: 3e5, cacheTime: 6e5
                                }), c = (0, r.useCallback)((function (e) {
                                    i((function (t) {
                                        var n = new URLSearchParams(t);
                                        return n.set("page", e.toString()), n
                                    }))
                                }), [i]), d = (0, r.useMemo)((function () {
                                    var e;
                                    return (null === (e = u.data) || void 0 === e ? void 0 : e.total) || 0
                                }), [null === (e = u.data) || void 0 === e ? void 0 : e.total]),
                                f = (0, r.useMemo)((function () {
                                    var e;
                                    return (null === (e = u.data) || void 0 === e ? void 0 : e.data) || []
                                }), [null === (n = u.data) || void 0 === n ? void 0 : n.data]);
                            return (0, t.jsxs)("div", {
                                className: "min-h-screen bg-gray-dark text-white",
                                children: [(0, t.jsx)("header", {
                                    className: "w-full fixed top-0 left-0 bg-gray-dark shadow-lg",
                                    style: {zIndex: 1e4},
                                    children: (0, t.jsx)(Gt, {})
                                }), (0, t.jsxs)("main", {
                                    className: "px-2 py-2 flex flex-col gap-4",
                                    style: {marginTop: "".concat(60, "px")},
                                    children: [u.isLoading && (0, t.jsx)(Fn, {}), u.error && (0, t.jsx)(Dn, {message: u.error.message}), f.length > 0 && (0, t.jsx)(Un, {
                                        data: f,
                                        title: s || "Unknown Category"
                                    }), !u.isLoading && !u.error && 0 === f.length && (0, t.jsx)(Bn, {category: s})]
                                }), d > 0 && (0, t.jsx)("footer", {
                                    className: "mt-auto",
                                    children: (0, t.jsx)(tn, {total: d, page: l, itemsPerPage: 48, onChange: c})
                                })]
                            })
                        }), {})
                    }), (0, t.jsx)(ie, {
                        path: "/cate-list", element: (0, t.jsx)((function () {
                            var e, n, a = pe(), o = a[0], i = a[1], l = (0, r.useMemo)((function () {
                                    return Number(o.get("page")) || 1
                                }), [o]), s = (0, r.useMemo)((function () {
                                    return o.get("category")
                                }), [o]), u = (0, he.useQuery)({
                                    queryKey: ["category-movies", s, l], queryFn: function () {
                                        return function (e, t, n, r) {
                                            return new (n || (n = Promise))((function (a, o) {
                                                function i(e) {
                                                    try {
                                                        s(r.next(e))
                                                    } catch (e) {
                                                        o(e)
                                                    }
                                                }

                                                function l(e) {
                                                    try {
                                                        s(r.throw(e))
                                                    } catch (e) {
                                                        o(e)
                                                    }
                                                }

                                                function s(e) {
                                                    var t;
                                                    e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                                                        e(t)
                                                    }))).then(i, l)
                                                }

                                                s((r = r.apply(e, t || [])).next())
                                            }))
                                        }(void 0, void 0, void 0, (function () {
                                            var e, t;
                                            return function (e, t) {
                                                var n, r, a, o, i = {
                                                    label: 0, sent: function () {
                                                        if (1 & a[0]) throw a[1];
                                                        return a[1]
                                                    }, trys: [], ops: []
                                                };
                                                return o = {
                                                    next: l(0),
                                                    throw: l(1),
                                                    return: l(2)
                                                }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                                                    return this
                                                }), o;

                                                function l(l) {
                                                    return function (s) {
                                                        return function (l) {
                                                            if (n) throw new TypeError("Generator is already executing.");
                                                            for (; o && (o = 0, l[0] && (i = 0)), i;) try {
                                                                if (n = 1, r && (a = 2 & l[0] ? r.return : l[0] ? r.throw || ((a = r.return) && a.call(r), 0) : r.next) && !(a = a.call(r, l[1])).done) return a;
                                                                switch (r = 0, a && (l = [2 & l[0], a.value]), l[0]) {
                                                                    case 0:
                                                                    case 1:
                                                                        a = l;
                                                                        break;
                                                                    case 4:
                                                                        return i.label++, {value: l[1], done: !1};
                                                                    case 5:
                                                                        i.label++, r = l[1], l = [0];
                                                                        continue;
                                                                    case 7:
                                                                        l = i.ops.pop(), i.trys.pop();
                                                                        continue;
                                                                    default:
                                                                        if (!((a = (a = i.trys).length > 0 && a[a.length - 1]) || 6 !== l[0] && 2 !== l[0])) {
                                                                            i = 0;
                                                                            continue
                                                                        }
                                                                        if (3 === l[0] && (!a || l[1] > a[0] && l[1] < a[3])) {
                                                                            i.label = l[1];
                                                                            break
                                                                        }
                                                                        if (6 === l[0] && i.label < a[1]) {
                                                                            i.label = a[1], a = l;
                                                                            break
                                                                        }
                                                                        if (a && i.label < a[2]) {
                                                                            i.label = a[2], i.ops.push(l);
                                                                            break
                                                                        }
                                                                        a[2] && i.ops.pop(), i.trys.pop();
                                                                        continue
                                                                }
                                                                l = t.call(e, i)
                                                            } catch (e) {
                                                                l = [6, e], r = 0
                                                            } finally {
                                                                n = a = 0
                                                            }
                                                            if (5 & l[0]) throw l[1];
                                                            return {value: l[0] ? l[1] : void 0, done: !0}
                                                        }([l, s])
                                                    }
                                                }
                                            }(this, (function (n) {
                                                switch (n.label) {
                                                    case 0:
                                                        return n.trys.push([0, 2, , 3]), [4, Pt(Qn(s, l.toString()))];
                                                    case 1:
                                                        return e = n.sent(), [2, {
                                                            data: JSON.parse(Bt(e.data)),
                                                            total: e.total || 0
                                                        }];
                                                    case 2:
                                                        return t = n.sent(), console.error("Failed to fetch category movies:", t), [2, {
                                                            data: [],
                                                            total: 0
                                                        }];
                                                    case 3:
                                                        return [2]
                                                }
                                            }))
                                        }))
                                    }, enabled: Boolean(s), staleTime: 3e5, cacheTime: 6e5
                                }), c = (0, r.useCallback)((function (e) {
                                    i((function (t) {
                                        var n = new URLSearchParams(t);
                                        return n.set("page", e.toString()), n
                                    }))
                                }), [i]), d = (0, r.useMemo)((function () {
                                    var e;
                                    return (null === (e = u.data) || void 0 === e ? void 0 : e.total) || 0
                                }), [null === (e = u.data) || void 0 === e ? void 0 : e.total]),
                                f = (0, r.useMemo)((function () {
                                    var e;
                                    return (null === (e = u.data) || void 0 === e ? void 0 : e.data) || []
                                }), [null === (n = u.data) || void 0 === n ? void 0 : n.data]);
                            return (0, t.jsxs)("div", {
                                className: "min-h-screen bg-gray-dark text-white",
                                children: [(0, t.jsx)("header", {
                                    className: "w-full fixed top-0 left-0 bg-gray-dark shadow-lg",
                                    style: {zIndex: 1e4},
                                    children: (0, t.jsx)(Gt, {})
                                }), (0, t.jsxs)("main", {
                                    className: "px-2 py-2 flex flex-col gap-4",
                                    style: {marginTop: "".concat(60, "px")},
                                    children: [u.isLoading && (0, t.jsx)(Wn, {}), u.error && (0, t.jsx)(qn, {message: u.error.message}), f.length > 0 && (0, t.jsx)(Ft, {
                                        data: f,
                                        title: s || "Unknown Category"
                                    }), !u.isLoading && !u.error && 0 === f.length && (0, t.jsx)(Vn, {category: s}), d > 0 && (0, t.jsx)(tn, {
                                        total: d,
                                        page: l,
                                        itemsPerPage: 24,
                                        onChange: c
                                    })]
                                })]
                            })
                        }), {})
                    }), (0, t.jsx)(ie, {
                        path: "/advanceFilter", element: (0, t.jsx)((function () {
                            var e, n, a = pe(), o = a[0], i = a[1], l = (0, r.useMemo)((function () {
                                    return {
                                        page: o.get("page") || "1",
                                        category: o.get("category"),
                                        listing: o.get("listing"),
                                        type: o.get("type")
                                    }
                                }), [o]), s = (0, r.useMemo)((function () {
                                    return Number(l.page)
                                }), [l.page]), u = (0, he.useQuery)({
                                    queryKey: ["advance-filter", l.category, l.listing, l.type, l.page],
                                    queryFn: function () {
                                        return function (e, t, n, r) {
                                            return new (n || (n = Promise))((function (a, o) {
                                                function i(e) {
                                                    try {
                                                        s(r.next(e))
                                                    } catch (e) {
                                                        o(e)
                                                    }
                                                }

                                                function l(e) {
                                                    try {
                                                        s(r.throw(e))
                                                    } catch (e) {
                                                        o(e)
                                                    }
                                                }

                                                function s(e) {
                                                    var t;
                                                    e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                                                        e(t)
                                                    }))).then(i, l)
                                                }

                                                s((r = r.apply(e, t || [])).next())
                                            }))
                                        }(void 0, void 0, void 0, (function () {
                                            var e, t;
                                            return function (e, t) {
                                                var n, r, a, o, i = {
                                                    label: 0, sent: function () {
                                                        if (1 & a[0]) throw a[1];
                                                        return a[1]
                                                    }, trys: [], ops: []
                                                };
                                                return o = {
                                                    next: l(0),
                                                    throw: l(1),
                                                    return: l(2)
                                                }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                                                    return this
                                                }), o;

                                                function l(l) {
                                                    return function (s) {
                                                        return function (l) {
                                                            if (n) throw new TypeError("Generator is already executing.");
                                                            for (; o && (o = 0, l[0] && (i = 0)), i;) try {
                                                                if (n = 1, r && (a = 2 & l[0] ? r.return : l[0] ? r.throw || ((a = r.return) && a.call(r), 0) : r.next) && !(a = a.call(r, l[1])).done) return a;
                                                                switch (r = 0, a && (l = [2 & l[0], a.value]), l[0]) {
                                                                    case 0:
                                                                    case 1:
                                                                        a = l;
                                                                        break;
                                                                    case 4:
                                                                        return i.label++, {value: l[1], done: !1};
                                                                    case 5:
                                                                        i.label++, r = l[1], l = [0];
                                                                        continue;
                                                                    case 7:
                                                                        l = i.ops.pop(), i.trys.pop();
                                                                        continue;
                                                                    default:
                                                                        if (!((a = (a = i.trys).length > 0 && a[a.length - 1]) || 6 !== l[0] && 2 !== l[0])) {
                                                                            i = 0;
                                                                            continue
                                                                        }
                                                                        if (3 === l[0] && (!a || l[1] > a[0] && l[1] < a[3])) {
                                                                            i.label = l[1];
                                                                            break
                                                                        }
                                                                        if (6 === l[0] && i.label < a[1]) {
                                                                            i.label = a[1], a = l;
                                                                            break
                                                                        }
                                                                        if (a && i.label < a[2]) {
                                                                            i.label = a[2], i.ops.push(l);
                                                                            break
                                                                        }
                                                                        a[2] && i.ops.pop(), i.trys.pop();
                                                                        continue
                                                                }
                                                                l = t.call(e, i)
                                                            } catch (e) {
                                                                l = [6, e], r = 0
                                                            } finally {
                                                                n = a = 0
                                                            }
                                                            if (5 & l[0]) throw l[1];
                                                            return {value: l[0] ? l[1] : void 0, done: !0}
                                                        }([l, s])
                                                    }
                                                }
                                            }(this, (function (n) {
                                                switch (n.label) {
                                                    case 0:
                                                        return n.trys.push([0, 2, , 3]), [4, Pt($n(l))];
                                                    case 1:
                                                        return e = n.sent(), [2, {
                                                            data: JSON.parse(Bt(e.data)),
                                                            total: e.total || 0
                                                        }];
                                                    case 2:
                                                        return t = n.sent(), console.error("Failed to fetch filtered movies:", t), [2, {
                                                            data: [],
                                                            total: 0
                                                        }];
                                                    case 3:
                                                        return [2]
                                                }
                                            }))
                                        }))
                                    },
                                    staleTime: 3e5,
                                    cacheTime: 6e5
                                }), c = (0, r.useCallback)((function (e) {
                                    i((function (t) {
                                        var n = new URLSearchParams(t);
                                        return n.set("page", e.toString()), n
                                    }))
                                }), [i]), d = (0, r.useMemo)((function () {
                                    var e;
                                    return (null === (e = u.data) || void 0 === e ? void 0 : e.total) || 0
                                }), [null === (e = u.data) || void 0 === e ? void 0 : e.total]),
                                f = (0, r.useMemo)((function () {
                                    var e;
                                    return (null === (e = u.data) || void 0 === e ? void 0 : e.data) || []
                                }), [null === (n = u.data) || void 0 === n ? void 0 : n.data]),
                                p = (0, r.useMemo)((function () {
                                    var e = l.listing, t = l.category, n = l.type,
                                        r = [e && e, t && "All" !== t && t, n && "All" !== n && n].filter(Boolean);
                                    return r.length > 0 ? r.join(" & ") : "Unknown Category"
                                }), [l]);
                            return (0, t.jsxs)("div", {
                                className: "min-h-screen bg-gray-dark text-white",
                                children: [(0, t.jsx)("header", {
                                    className: "w-full fixed top-0 left-0 bg-gray-dark shadow-lg",
                                    style: {zIndex: 1e4},
                                    children: (0, t.jsx)(Gt, {})
                                }), (0, t.jsxs)("main", {
                                    className: "px-2 py-2 flex flex-col gap-4",
                                    style: {marginTop: "".concat(60, "px")},
                                    children: [u.isLoading && (0, t.jsx)(Hn, {}), u.error && (0, t.jsx)(Kn, {message: u.error.message}), f.length > 0 && (0, t.jsx)(Ft, {
                                        data: f,
                                        title: p
                                    }), !u.isLoading && !u.error && 0 === f.length && (0, t.jsx)(Gn, {filters: l}), d > 0 && (0, t.jsx)(tn, {
                                        total: d,
                                        page: s,
                                        itemsPerPage: 48,
                                        onChange: c
                                    })]
                                })]
                            })
                        }), {})
                    }), (0, t.jsx)(ie, {
                        path: "/actor/:personId", element: (0, t.jsx)((function () {
                            var e, n, a = pe(), o = a[0], i = a[1], l = J().personId, s = (0, r.useMemo)((function () {
                                    return Number(o.get("page")) || 1
                                }), [o]), u = (0, r.useMemo)((function () {
                                    var e = o.get("name");
                                    return e ? decodeURIComponent(e) : ""
                                }), [o]), c = (0, he.useQuery)({
                                    queryKey: ["actor-titles", l, s], queryFn: function () {
                                        return function (e, t, n, r) {
                                            return new (n || (n = Promise))((function (a, o) {
                                                function i(e) {
                                                    try {
                                                        s(r.next(e))
                                                    } catch (e) {
                                                        o(e)
                                                    }
                                                }

                                                function l(e) {
                                                    try {
                                                        s(r.throw(e))
                                                    } catch (e) {
                                                        o(e)
                                                    }
                                                }

                                                function s(e) {
                                                    var t;
                                                    e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                                                        e(t)
                                                    }))).then(i, l)
                                                }

                                                s((r = r.apply(e, t || [])).next())
                                            }))
                                        }(void 0, void 0, void 0, (function () {
                                            var e, t;
                                            return function (e, t) {
                                                var n, r, a, o, i = {
                                                    label: 0, sent: function () {
                                                        if (1 & a[0]) throw a[1];
                                                        return a[1]
                                                    }, trys: [], ops: []
                                                };
                                                return o = {
                                                    next: l(0),
                                                    throw: l(1),
                                                    return: l(2)
                                                }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                                                    return this
                                                }), o;

                                                function l(l) {
                                                    return function (s) {
                                                        return function (l) {
                                                            if (n) throw new TypeError("Generator is already executing.");
                                                            for (; o && (o = 0, l[0] && (i = 0)), i;) try {
                                                                if (n = 1, r && (a = 2 & l[0] ? r.return : l[0] ? r.throw || ((a = r.return) && a.call(r), 0) : r.next) && !(a = a.call(r, l[1])).done) return a;
                                                                switch (r = 0, a && (l = [2 & l[0], a.value]), l[0]) {
                                                                    case 0:
                                                                    case 1:
                                                                        a = l;
                                                                        break;
                                                                    case 4:
                                                                        return i.label++, {value: l[1], done: !1};
                                                                    case 5:
                                                                        i.label++, r = l[1], l = [0];
                                                                        continue;
                                                                    case 7:
                                                                        l = i.ops.pop(), i.trys.pop();
                                                                        continue;
                                                                    default:
                                                                        if (!((a = (a = i.trys).length > 0 && a[a.length - 1]) || 6 !== l[0] && 2 !== l[0])) {
                                                                            i = 0;
                                                                            continue
                                                                        }
                                                                        if (3 === l[0] && (!a || l[1] > a[0] && l[1] < a[3])) {
                                                                            i.label = l[1];
                                                                            break
                                                                        }
                                                                        if (6 === l[0] && i.label < a[1]) {
                                                                            i.label = a[1], a = l;
                                                                            break
                                                                        }
                                                                        if (a && i.label < a[2]) {
                                                                            i.label = a[2], i.ops.push(l);
                                                                            break
                                                                        }
                                                                        a[2] && i.ops.pop(), i.trys.pop();
                                                                        continue
                                                                }
                                                                l = t.call(e, i)
                                                            } catch (e) {
                                                                l = [6, e], r = 0
                                                            } finally {
                                                                n = a = 0
                                                            }
                                                            if (5 & l[0]) throw l[1];
                                                            return {value: l[0] ? l[1] : void 0, done: !0}
                                                        }([l, s])
                                                    }
                                                }
                                            }(this, (function (n) {
                                                switch (n.label) {
                                                    case 0:
                                                        return n.trys.push([0, 2, , 3]), [4, Pt("swx/movie/search?person_id=".concat(l, "&size=").concat(30, "&page=").concat(s))];
                                                    case 1:
                                                        return e = n.sent(), [2, {
                                                            data: JSON.parse(Bt(e.data)),
                                                            total: e.total || 0
                                                        }];
                                                    case 2:
                                                        return t = n.sent(), console.error("Failed to fetch actor titles:", t), [2, {
                                                            data: [],
                                                            total: 0
                                                        }];
                                                    case 3:
                                                        return [2]
                                                }
                                            }))
                                        }))
                                    }, enabled: Boolean(l), staleTime: 3e5, cacheTime: 6e5
                                }), d = (0, r.useCallback)((function (e) {
                                    i((function (t) {
                                        var n = new URLSearchParams(t);
                                        return n.set("page", e.toString()), n
                                    }))
                                }), [i]), f = (0, r.useMemo)((function () {
                                    var e;
                                    return (null === (e = c.data) || void 0 === e ? void 0 : e.total) || 0
                                }), [null === (e = c.data) || void 0 === e ? void 0 : e.total]),
                                p = (0, r.useMemo)((function () {
                                    var e;
                                    return (null === (e = c.data) || void 0 === e ? void 0 : e.data) || []
                                }), [null === (n = c.data) || void 0 === n ? void 0 : n.data]);
                            return (0, t.jsxs)("div", {
                                className: "min-h-screen bg-gray-dark text-white",
                                children: [(0, t.jsx)("header", {
                                    className: "w-full fixed top-0 left-0 bg-gray-dark shadow-lg",
                                    style: {zIndex: 1e4},
                                    children: (0, t.jsx)(Gt, {})
                                }), (0, t.jsxs)("main", {
                                    className: "px-2 py-2 flex flex-col gap-4",
                                    style: {marginTop: "".concat(60, "px")},
                                    children: [c.isLoading && (0, t.jsx)(Jn, {}), c.error && (0, t.jsx)(Yn, {message: c.error.message}), p.length > 0 && (0, t.jsx)(Ft, {
                                        data: p,
                                        title: u
                                    }), !c.isLoading && !c.error && 0 === p.length && (0, t.jsx)(Xn, {}), f > 0 && (0, t.jsx)(tn, {
                                        total: f,
                                        page: s,
                                        itemsPerPage: 30,
                                        onChange: d
                                    })]
                                })]
                            })
                        }), {})
                    }), (0, t.jsx)(ie, {
                        path: "/filter/:type/:name", element: (0, t.jsx)((function () {
                            var e, n, a = pe(), o = a[0], i = a[1], l = J(), s = l.type, u = l.name,
                                c = (0, r.useMemo)((function () {
                                    return Number(o.get("page")) || 1
                                }), [o]), d = (0, he.useQuery)({
                                    queryKey: ["maker-titles", s, u, c], queryFn: function () {
                                        return function (e, t, n, r) {
                                            return new (n || (n = Promise))((function (a, o) {
                                                function i(e) {
                                                    try {
                                                        s(r.next(e))
                                                    } catch (e) {
                                                        o(e)
                                                    }
                                                }

                                                function l(e) {
                                                    try {
                                                        s(r.throw(e))
                                                    } catch (e) {
                                                        o(e)
                                                    }
                                                }

                                                function s(e) {
                                                    var t;
                                                    e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                                                        e(t)
                                                    }))).then(i, l)
                                                }

                                                s((r = r.apply(e, t || [])).next())
                                            }))
                                        }(void 0, void 0, void 0, (function () {
                                            var e, t;
                                            return function (e, t) {
                                                var n, r, a, o, i = {
                                                    label: 0, sent: function () {
                                                        if (1 & a[0]) throw a[1];
                                                        return a[1]
                                                    }, trys: [], ops: []
                                                };
                                                return o = {
                                                    next: l(0),
                                                    throw: l(1),
                                                    return: l(2)
                                                }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                                                    return this
                                                }), o;

                                                function l(l) {
                                                    return function (s) {
                                                        return function (l) {
                                                            if (n) throw new TypeError("Generator is already executing.");
                                                            for (; o && (o = 0, l[0] && (i = 0)), i;) try {
                                                                if (n = 1, r && (a = 2 & l[0] ? r.return : l[0] ? r.throw || ((a = r.return) && a.call(r), 0) : r.next) && !(a = a.call(r, l[1])).done) return a;
                                                                switch (r = 0, a && (l = [2 & l[0], a.value]), l[0]) {
                                                                    case 0:
                                                                    case 1:
                                                                        a = l;
                                                                        break;
                                                                    case 4:
                                                                        return i.label++, {value: l[1], done: !1};
                                                                    case 5:
                                                                        i.label++, r = l[1], l = [0];
                                                                        continue;
                                                                    case 7:
                                                                        l = i.ops.pop(), i.trys.pop();
                                                                        continue;
                                                                    default:
                                                                        if (!((a = (a = i.trys).length > 0 && a[a.length - 1]) || 6 !== l[0] && 2 !== l[0])) {
                                                                            i = 0;
                                                                            continue
                                                                        }
                                                                        if (3 === l[0] && (!a || l[1] > a[0] && l[1] < a[3])) {
                                                                            i.label = l[1];
                                                                            break
                                                                        }
                                                                        if (6 === l[0] && i.label < a[1]) {
                                                                            i.label = a[1], a = l;
                                                                            break
                                                                        }
                                                                        if (a && i.label < a[2]) {
                                                                            i.label = a[2], i.ops.push(l);
                                                                            break
                                                                        }
                                                                        a[2] && i.ops.pop(), i.trys.pop();
                                                                        continue
                                                                }
                                                                l = t.call(e, i)
                                                            } catch (e) {
                                                                l = [6, e], r = 0
                                                            } finally {
                                                                n = a = 0
                                                            }
                                                            if (5 & l[0]) throw l[1];
                                                            return {value: l[0] ? l[1] : void 0, done: !0}
                                                        }([l, s])
                                                    }
                                                }
                                            }(this, (function (n) {
                                                switch (n.label) {
                                                    case 0:
                                                        return n.trys.push([0, 2, , 3]), [4, Pt(Zn(s, u, c.toString()))];
                                                    case 1:
                                                        return e = n.sent(), [2, {
                                                            data: JSON.parse(Bt(e.data)),
                                                            total: e.total || 0
                                                        }];
                                                    case 2:
                                                        return t = n.sent(), console.error("Failed to fetch maker titles:", t), [2, {
                                                            data: [],
                                                            total: 0
                                                        }];
                                                    case 3:
                                                        return [2]
                                                }
                                            }))
                                        }))
                                    }, enabled: Boolean(s && u), staleTime: 3e5, cacheTime: 6e5
                                }), f = (0, r.useCallback)((function (e) {
                                    i((function (t) {
                                        var n = new URLSearchParams(t);
                                        return n.set("page", e.toString()), n
                                    }))
                                }), [i]), p = (0, r.useMemo)((function () {
                                    var e;
                                    return (null === (e = d.data) || void 0 === e ? void 0 : e.total) || 0
                                }), [null === (e = d.data) || void 0 === e ? void 0 : e.total]),
                                h = (0, r.useMemo)((function () {
                                    var e;
                                    return (null === (e = d.data) || void 0 === e ? void 0 : e.data) || []
                                }), [null === (n = d.data) || void 0 === n ? void 0 : n.data]);
                            return (0, t.jsxs)("div", {
                                className: "min-h-screen bg-gray-dark text-white",
                                children: [(0, t.jsx)("header", {
                                    className: "w-full fixed top-0 left-0 bg-gray-dark shadow-lg",
                                    style: {zIndex: 1e4},
                                    children: (0, t.jsx)(Gt, {})
                                }), (0, t.jsxs)("main", {
                                    className: "px-2 py-2 flex flex-col gap-4",
                                    style: {marginTop: "".concat(60, "px")},
                                    children: [d.isLoading && (0, t.jsx)(er, {}), d.error && (0, t.jsx)(tr, {message: d.error.message}), h.length > 0 && (0, t.jsx)(Ft, {
                                        data: h,
                                        title: u || "Unknown Category"
                                    }), !d.isLoading && !d.error && 0 === h.length && (0, t.jsx)(nr, {
                                        name: u,
                                        type: s
                                    }), p > 0 && (0, t.jsx)(tn, {total: p, page: c, itemsPerPage: 24, onChange: f})]
                                })]
                            })
                        }), {})
                    }), (0, t.jsx)(ie, {
                        path: "/searchresult", element: (0, t.jsx)((function () {
                            var e, n, a = pe(), o = a[0], i = a[1], l = ((0, r.useMemo)((function () {
                                    return Tt("endpoints")
                                }), []), (0, r.useMemo)((function () {
                                    return Number(o.get("page")) || 1
                                }), [o])), s = (0, r.useMemo)((function () {
                                    return o.get("by")
                                }), [o]), u = (0, r.useMemo)((function () {
                                    return o.get("keyword")
                                }), [o]), c = (0, he.useQuery)({
                                    queryKey: ["search-results", s, u, l], queryFn: function () {
                                        return function (e, t, n, r) {
                                            return new (n || (n = Promise))((function (a, o) {
                                                function i(e) {
                                                    try {
                                                        s(r.next(e))
                                                    } catch (e) {
                                                        o(e)
                                                    }
                                                }

                                                function l(e) {
                                                    try {
                                                        s(r.throw(e))
                                                    } catch (e) {
                                                        o(e)
                                                    }
                                                }

                                                function s(e) {
                                                    var t;
                                                    e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                                                        e(t)
                                                    }))).then(i, l)
                                                }

                                                s((r = r.apply(e, t || [])).next())
                                            }))
                                        }(void 0, void 0, void 0, (function () {
                                            var e, t;
                                            return function (e, t) {
                                                var n, r, a, o, i = {
                                                    label: 0, sent: function () {
                                                        if (1 & a[0]) throw a[1];
                                                        return a[1]
                                                    }, trys: [], ops: []
                                                };
                                                return o = {
                                                    next: l(0),
                                                    throw: l(1),
                                                    return: l(2)
                                                }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                                                    return this
                                                }), o;

                                                function l(l) {
                                                    return function (s) {
                                                        return function (l) {
                                                            if (n) throw new TypeError("Generator is already executing.");
                                                            for (; o && (o = 0, l[0] && (i = 0)), i;) try {
                                                                if (n = 1, r && (a = 2 & l[0] ? r.return : l[0] ? r.throw || ((a = r.return) && a.call(r), 0) : r.next) && !(a = a.call(r, l[1])).done) return a;
                                                                switch (r = 0, a && (l = [2 & l[0], a.value]), l[0]) {
                                                                    case 0:
                                                                    case 1:
                                                                        a = l;
                                                                        break;
                                                                    case 4:
                                                                        return i.label++, {value: l[1], done: !1};
                                                                    case 5:
                                                                        i.label++, r = l[1], l = [0];
                                                                        continue;
                                                                    case 7:
                                                                        l = i.ops.pop(), i.trys.pop();
                                                                        continue;
                                                                    default:
                                                                        if (!((a = (a = i.trys).length > 0 && a[a.length - 1]) || 6 !== l[0] && 2 !== l[0])) {
                                                                            i = 0;
                                                                            continue
                                                                        }
                                                                        if (3 === l[0] && (!a || l[1] > a[0] && l[1] < a[3])) {
                                                                            i.label = l[1];
                                                                            break
                                                                        }
                                                                        if (6 === l[0] && i.label < a[1]) {
                                                                            i.label = a[1], a = l;
                                                                            break
                                                                        }
                                                                        if (a && i.label < a[2]) {
                                                                            i.label = a[2], i.ops.push(l);
                                                                            break
                                                                        }
                                                                        a[2] && i.ops.pop(), i.trys.pop();
                                                                        continue
                                                                }
                                                                l = t.call(e, i)
                                                            } catch (e) {
                                                                l = [6, e], r = 0
                                                            } finally {
                                                                n = a = 0
                                                            }
                                                            if (5 & l[0]) throw l[1];
                                                            return {value: l[0] ? l[1] : void 0, done: !0}
                                                        }([l, s])
                                                    }
                                                }
                                            }(this, (function (n) {
                                                switch (n.label) {
                                                    case 0:
                                                        return n.trys.push([0, 2, , 3]), [4, Pt(rr(s, u, l.toString()))];
                                                    case 1:
                                                        return e = n.sent(), [2, {
                                                            data: JSON.parse(Bt(e.data)),
                                                            total: e.total || 0
                                                        }];
                                                    case 2:
                                                        return t = n.sent(), console.error("Failed to fetch search results:", t), [2, {
                                                            data: [],
                                                            total: 0
                                                        }];
                                                    case 3:
                                                        return [2]
                                                }
                                            }))
                                        }))
                                    }, enabled: Boolean(u), staleTime: 3e5, cacheTime: 6e5
                                }), d = (0, r.useCallback)((function (e) {
                                    i((function (t) {
                                        var n = new URLSearchParams(t);
                                        return n.set("page", e.toString()), n
                                    }))
                                }), [i]), f = (0, r.useMemo)((function () {
                                    var e;
                                    return (null === (e = c.data) || void 0 === e ? void 0 : e.total) || 0
                                }), [null === (e = c.data) || void 0 === e ? void 0 : e.total]),
                                p = (0, r.useMemo)((function () {
                                    var e;
                                    return (null === (e = c.data) || void 0 === e ? void 0 : e.data) || []
                                }), [null === (n = c.data) || void 0 === n ? void 0 : n.data]);
                            return (0, t.jsxs)("div", {
                                className: "min-h-screen bg-gray-dark text-white",
                                children: [(0, t.jsx)("header", {
                                    className: "w-full fixed top-0 left-0 bg-gray-dark shadow-lg",
                                    style: {zIndex: 1e4},
                                    children: (0, t.jsx)(Gt, {})
                                }), (0, t.jsxs)("main", {
                                    className: "px-2 py-2 flex flex-col gap-4",
                                    style: {marginTop: "".concat(60, "px")},
                                    children: [c.isLoading && (0, t.jsx)(ar, {}), c.error && (0, t.jsx)(or, {message: c.error.message}), p.length > 0 && (0, t.jsx)(Ft, {
                                        data: p,
                                        title: u || "Search Results"
                                    }), !c.isLoading && !c.error && 0 === p.length && (0, t.jsx)(ir, {keyword: u}), f > 0 && (0, t.jsx)(tn, {
                                        total: f,
                                        page: l,
                                        itemsPerPage: 24,
                                        onChange: d
                                    })]
                                })]
                            })
                        }), {})
                    }), (0, t.jsx)(ie, {
                        path: "/searchActor", element: (0, t.jsx)((function () {
                            var e = pe(), n = e[0], a = e[1], o = (G(), (0, r.useMemo)((function () {
                                return Number(n.get("page")) || 1
                            }), [n])), i = (0, r.useMemo)((function () {
                                return n.get("keyword")
                            }), [n]), l = (0, r.useMemo)((function () {
                                return Tt("uiLanguage")
                            }), []), s = (0, he.useQuery)({
                                queryKey: ["searchActor", i, o], queryFn: function () {
                                    return function (e, t, n, r) {
                                        return new (n || (n = Promise))((function (a, o) {
                                            function i(e) {
                                                try {
                                                    s(r.next(e))
                                                } catch (e) {
                                                    o(e)
                                                }
                                            }

                                            function l(e) {
                                                try {
                                                    s(r.throw(e))
                                                } catch (e) {
                                                    o(e)
                                                }
                                            }

                                            function s(e) {
                                                var t;
                                                e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                                                    e(t)
                                                }))).then(i, l)
                                            }

                                            s((r = r.apply(e, t || [])).next())
                                        }))
                                    }(void 0, void 0, void 0, (function () {
                                        var e, t;
                                        return function (e, t) {
                                            var n, r, a, o, i = {
                                                label: 0, sent: function () {
                                                    if (1 & a[0]) throw a[1];
                                                    return a[1]
                                                }, trys: [], ops: []
                                            };
                                            return o = {
                                                next: l(0),
                                                throw: l(1),
                                                return: l(2)
                                            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                                                return this
                                            }), o;

                                            function l(l) {
                                                return function (s) {
                                                    return function (l) {
                                                        if (n) throw new TypeError("Generator is already executing.");
                                                        for (; o && (o = 0, l[0] && (i = 0)), i;) try {
                                                            if (n = 1, r && (a = 2 & l[0] ? r.return : l[0] ? r.throw || ((a = r.return) && a.call(r), 0) : r.next) && !(a = a.call(r, l[1])).done) return a;
                                                            switch (r = 0, a && (l = [2 & l[0], a.value]), l[0]) {
                                                                case 0:
                                                                case 1:
                                                                    a = l;
                                                                    break;
                                                                case 4:
                                                                    return i.label++, {value: l[1], done: !1};
                                                                case 5:
                                                                    i.label++, r = l[1], l = [0];
                                                                    continue;
                                                                case 7:
                                                                    l = i.ops.pop(), i.trys.pop();
                                                                    continue;
                                                                default:
                                                                    if (!((a = (a = i.trys).length > 0 && a[a.length - 1]) || 6 !== l[0] && 2 !== l[0])) {
                                                                        i = 0;
                                                                        continue
                                                                    }
                                                                    if (3 === l[0] && (!a || l[1] > a[0] && l[1] < a[3])) {
                                                                        i.label = l[1];
                                                                        break
                                                                    }
                                                                    if (6 === l[0] && i.label < a[1]) {
                                                                        i.label = a[1], a = l;
                                                                        break
                                                                    }
                                                                    if (a && i.label < a[2]) {
                                                                        i.label = a[2], i.ops.push(l);
                                                                        break
                                                                    }
                                                                    a[2] && i.ops.pop(), i.trys.pop();
                                                                    continue
                                                            }
                                                            l = t.call(e, i)
                                                        } catch (e) {
                                                            l = [6, e], r = 0
                                                        } finally {
                                                            n = a = 0
                                                        }
                                                        if (5 & l[0]) throw l[1];
                                                        return {value: l[0] ? l[1] : void 0, done: !0}
                                                    }([l, s])
                                                }
                                            }
                                        }(this, (function (n) {
                                            switch (n.label) {
                                                case 0:
                                                    return n.trys.push([0, 2, , 3]), [4, Pt("swx/searchBy?keyword=".concat(i, "&by=actress&page=").concat(o, "&size=").concat(24))];
                                                case 1:
                                                    return e = n.sent(), [2, {
                                                        data: JSON.parse(Bt(e.data)),
                                                        total: e.total || 0
                                                    }];
                                                case 2:
                                                    return t = n.sent(), console.error("Failed to fetch actors:", t), [2, {
                                                        data: [],
                                                        total: 0
                                                    }];
                                                case 3:
                                                    return [2]
                                            }
                                        }))
                                    }))
                                }, enabled: Boolean(i), retry: !1, staleTime: 3e5, cacheTime: 6e5
                            });
                            return (0, t.jsxs)("div", {
                                className: "min-h-screen bg-gray-dark text-white",
                                children: [(0, t.jsx)("header", {
                                    className: "w-full fixed top-0 left-0 bg-gray-dark shadow-lg",
                                    style: {zIndex: 1e4},
                                    children: (0, t.jsx)(Gt, {})
                                }), (0, t.jsxs)("main", {
                                    className: "px-4 py-4 flex flex-col gap-4",
                                    style: {marginTop: "64px"},
                                    children: [s.error && (0, t.jsx)(fr, {
                                        onRetry: function () {
                                            s.refetch()
                                        }, locale: l
                                    }), s.isLoading && (0, t.jsx)(dr, {locale: l}), !i && !s.isLoading && (0, t.jsx)(pr, {locale: l}), s.data && s.data.data.length > 0 && (0, t.jsx)(Un, {
                                        data: s.data.data,
                                        title: "".concat(Mt("search_results_for", l) || "Search results for", ": ").concat(i)
                                    }), !s.isLoading && !s.error && i && s.data && 0 === s.data.data.length && (0, t.jsx)(hr, {
                                        keyword: i,
                                        locale: l
                                    }), s.data && s.data.total > 24 && (0, t.jsx)(tn, {
                                        total: s.data.total,
                                        page: o,
                                        itemsPerPage: 24,
                                        onChange: function (e) {
                                            a((function (t) {
                                                var n = new URLSearchParams(t);
                                                return n.set("page", e.toString()), n
                                            }))
                                        }
                                    })]
                                })]
                            })
                        }), {})
                    }), (0, t.jsx)(ie, {
                        path: "/usecase", element: (0, t.jsx)((function () {
                            var e = (0, r.useMemo)((function () {
                                return Tt("uiLanguage")
                            }), []), n = (0, r.useState)(!1), a = (n[0], n[1], (0, r.useCallback)((function (t) {
                                return function (e, t, n, r) {
                                    return new (n || (n = Promise))((function (a, o) {
                                        function i(e) {
                                            try {
                                                s(r.next(e))
                                            } catch (e) {
                                                o(e)
                                            }
                                        }

                                        function l(e) {
                                            try {
                                                s(r.throw(e))
                                            } catch (e) {
                                                o(e)
                                            }
                                        }

                                        function s(e) {
                                            var t;
                                            e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                                                e(t)
                                            }))).then(i, l)
                                        }

                                        s((r = r.apply(e, t || [])).next())
                                    }))
                                }(void 0, void 0, void 0, (function () {
                                    var n, r;
                                    return function (e, t) {
                                        var n, r, a, o, i = {
                                            label: 0, sent: function () {
                                                if (1 & a[0]) throw a[1];
                                                return a[1]
                                            }, trys: [], ops: []
                                        };
                                        return o = {
                                            next: l(0),
                                            throw: l(1),
                                            return: l(2)
                                        }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                                            return this
                                        }), o;

                                        function l(l) {
                                            return function (s) {
                                                return function (l) {
                                                    if (n) throw new TypeError("Generator is already executing.");
                                                    for (; o && (o = 0, l[0] && (i = 0)), i;) try {
                                                        if (n = 1, r && (a = 2 & l[0] ? r.return : l[0] ? r.throw || ((a = r.return) && a.call(r), 0) : r.next) && !(a = a.call(r, l[1])).done) return a;
                                                        switch (r = 0, a && (l = [2 & l[0], a.value]), l[0]) {
                                                            case 0:
                                                            case 1:
                                                                a = l;
                                                                break;
                                                            case 4:
                                                                return i.label++, {value: l[1], done: !1};
                                                            case 5:
                                                                i.label++, r = l[1], l = [0];
                                                                continue;
                                                            case 7:
                                                                l = i.ops.pop(), i.trys.pop();
                                                                continue;
                                                            default:
                                                                if (!((a = (a = i.trys).length > 0 && a[a.length - 1]) || 6 !== l[0] && 2 !== l[0])) {
                                                                    i = 0;
                                                                    continue
                                                                }
                                                                if (3 === l[0] && (!a || l[1] > a[0] && l[1] < a[3])) {
                                                                    i.label = l[1];
                                                                    break
                                                                }
                                                                if (6 === l[0] && i.label < a[1]) {
                                                                    i.label = a[1], a = l;
                                                                    break
                                                                }
                                                                if (a && i.label < a[2]) {
                                                                    i.label = a[2], i.ops.push(l);
                                                                    break
                                                                }
                                                                a[2] && i.ops.pop(), i.trys.pop();
                                                                continue
                                                        }
                                                        l = t.call(e, i)
                                                    } catch (e) {
                                                        l = [6, e], r = 0
                                                    } finally {
                                                        n = a = 0
                                                    }
                                                    if (5 & l[0]) throw l[1];
                                                    return {value: l[0] ? l[1] : void 0, done: !0}
                                                }([l, s])
                                            }
                                        }
                                    }(this, (function (a) {
                                        switch (a.label) {
                                            case 0:
                                                return a.trys.push([0, 2, , 3]), [4, navigator.clipboard.writeText(t)];
                                            case 1:
                                                return a.sent(), ct.success(Mt("copied", e)), [3, 3];
                                            case 2:
                                                return n = a.sent(), console.warn("Failed to copy to clipboard:", n), (r = document.createElement("textarea")).value = t, document.body.appendChild(r), r.select(), document.execCommand("copy"), document.body.removeChild(r), ct.success(Mt("copied", e)), [3, 3];
                                            case 3:
                                                return [2]
                                        }
                                    }))
                                }))
                            }), [e])), o = (0, r.useCallback)((function (e) {
                                var t = e.currentTarget.dataset.url;
                                t && window.open(t, "_blank", "noopener,noreferrer")
                            }), []), i = (0, r.useCallback)((function (t) {
                                var n, r = window, a = "zh" === e ? "CN" : "others",
                                    o = null === (n = r.appDownloads) || void 0 === n ? void 0 : n.find((function (e) {
                                        return e.app === t && e.site_lang === a
                                    }));
                                return o ? [o.link1, o.link2, o.link3] : (console.warn("App download entry not found for ".concat(t, " (").concat(a, ")")), ["", "", ""])
                            }), [e]), l = (0, r.useMemo)((function () {
                                return {multiflix: i("multiflix"), apipl: i("apipl")}
                            }), [i]);
                            return (0, t.jsxs)("div", {
                                className: "min-h-screen bg-gray-dark text-white",
                                children: [(0, t.jsx)("header", {
                                    className: "w-full fixed top-0 left-0 bg-gray-dark shadow-lg",
                                    style: {zIndex: 1e4},
                                    children: (0, t.jsx)(Gt, {})
                                }), (0, t.jsx)("main", {
                                    className: "px-4 py-6 flex flex-col gap-6",
                                    style: {marginTop: "".concat(60, "px")},
                                    children: (0, t.jsxs)("div", {
                                        className: "max-w-7xl mx-auto w-full space-y-6",
                                        children: [(0, t.jsxs)("div", {
                                            className: "bg-gray-800 rounded-lg p-6",
                                            children: [(0, t.jsx)("h1", {
                                                className: "text-2xl font-bold mb-4",
                                                children: Mt("usecasettl", e)
                                            }), (0, t.jsx)("div", {
                                                className: "mb-6",
                                                children: (0, t.jsx)("img", {
                                                    className: "w-full max-w-4xl mx-auto rounded-lg shadow-lg",
                                                    src: "/images/Before_".concat((null == e ? void 0 : e.toUpperCase()) || "EN", ".png"),
                                                    alt: Mt("usecasettl", e),
                                                    loading: "lazy"
                                                })
                                            }), (0, t.jsxs)("div", {
                                                className: "space-y-3 text-gray-300",
                                                children: [(0, t.jsx)("p", {children: Mt("usecasettl1", e)}), (0, t.jsx)("p", {children: Mt("usecasettl2", e)}), (0, t.jsx)("p", {children: Mt("usecasettl3", e)}), (0, t.jsx)("p", {children: Mt("usecasettl4", e)})]
                                            })]
                                        }), (0, t.jsxs)("div", {
                                            className: "bg-gray-800 rounded-lg p-6",
                                            children: [(0, t.jsx)("h2", {
                                                className: "text-xl font-bold mb-6",
                                                children: Mt("usecasettl5", e)
                                            }), (0, t.jsxs)("div", {
                                                className: "space-y-6",
                                                children: [(0, t.jsx)(lr, {
                                                    title: Mt("usecasettl6", e),
                                                    iconSrc: "/images/apip_lite.png",
                                                    iconAlt: "APIP Lite",
                                                    downloads: l.apipl,
                                                    variant: "primary",
                                                    locale: e,
                                                    onDownload: o
                                                }), (0, t.jsx)(lr, {
                                                    title: Mt("usecasettl8", e),
                                                    iconSrc: "/images/flix1_128x128.png",
                                                    iconAlt: "Multiflix",
                                                    downloads: l.multiflix,
                                                    variant: "secondary",
                                                    locale: e,
                                                    onDownload: o
                                                }), "ko" != e && (0, t.jsxs)("div", {
                                                    className: "border border-gray-600 rounded-lg p-4",
                                                    children: [(0, t.jsx)("h3", {
                                                        className: "text-lg font-semibold mb-4",
                                                        children: Mt("usecasettl17", e)
                                                    }), (0, t.jsx)("div", {
                                                        className: "space-y-4",
                                                        children: (0, t.jsxs)("div", {
                                                            className: "flex flex-col gap-2 sm:flex-row items-center",
                                                            children: [(0, t.jsx)("img", {
                                                                width: 40,
                                                                height: 40,
                                                                className: "rounded-lg flex-shrink-0 hidden sm:block",
                                                                src: "/images/flix1_128x128.png",
                                                                alt: "Flix1",
                                                                loading: "lazy"
                                                            }), (0, t.jsx)("img", {
                                                                src: "/images/apple-store.webp",
                                                                alt: "Apple App Store",
                                                                className: "cursor-pointer h-10",
                                                                "data-url": "https://apps.apple.com/us/app/flix1/id6747633918",
                                                                onClick: o
                                                            })]
                                                        })
                                                    })]
                                                })]
                                            })]
                                        }), (0, t.jsx)("div", {
                                            className: "bg-gray-800 rounded-lg p-6",
                                            children: (0, t.jsx)(ur, {locale: e, onCopy: a})
                                        }), (0, t.jsxs)("div", {
                                            className: "bg-gray-800 rounded-lg p-6",
                                            children: [(0, t.jsx)("h3", {
                                                className: "text-xl font-bold mb-4",
                                                children: Mt("usecasettl14", e)
                                            }), (0, t.jsxs)("div", {
                                                className: "space-y-3 text-gray-300 mb-6",
                                                children: [(0, t.jsx)("p", {children: Mt("usecasettl15", e)}), (0, t.jsx)("p", {children: Mt("usecasettl16", e)})]
                                            }), (0, t.jsx)("img", {
                                                className: "w-full max-w-4xl mx-auto rounded-lg shadow-lg",
                                                src: "/images/After_EN.png",
                                                alt: "After setup example",
                                                loading: "lazy"
                                            })]
                                        })]
                                    })
                                })]
                            })
                        }), {})
                    })]
                })]
            }), (0, t.jsx)((({
                                 reverseOrder: e,
                                 position: t = "top-center",
                                 toastOptions: n,
                                 gutter: a,
                                 children: o,
                                 containerStyle: i,
                                 containerClassName: l
                             }) => {
                let {toasts: s, handlers: u} = (e => {
                    let {toasts: t, pausedAt: n} = ((e = {}) => {
                        let [t, n] = (0, r.useState)(Re), a = (0, r.useRef)(Re);
                        (0, r.useEffect)((() => (a.current !== Re && n(Re), Oe.push(n), () => {
                            let e = Oe.indexOf(n);
                            e > -1 && Oe.splice(e, 1)
                        })), []);
                        let o = t.toasts.map((t => {
                            var n, r, a;
                            return {
                                ...e, ...e[t.type], ...t,
                                removeDelay: t.removeDelay || (null == (n = e[t.type]) ? void 0 : n.removeDelay) || (null == e ? void 0 : e.removeDelay),
                                duration: t.duration || (null == (r = e[t.type]) ? void 0 : r.duration) || (null == e ? void 0 : e.duration) || ze[t.type],
                                style: {...e.style, ...null == (a = e[t.type]) ? void 0 : a.style, ...t.style}
                            }
                        }));
                        return {...t, toasts: o}
                    })(e);
                    (0, r.useEffect)((() => {
                        if (n) return;
                        let e = Date.now(), r = t.map((t => {
                            if (t.duration === 1 / 0) return;
                            let n = (t.duration || 0) + t.pauseDuration - (e - t.createdAt);
                            if (!(n < 0)) return setTimeout((() => Fe.dismiss(t.id)), n);
                            t.visible && Fe.dismiss(t.id)
                        }));
                        return () => {
                            r.forEach((e => e && clearTimeout(e)))
                        }
                    }), [t, n]);
                    let a = (0, r.useCallback)((() => {
                        n && Me({type: 6, time: Date.now()})
                    }), [n]), o = (0, r.useCallback)(((e, n) => {
                        let {reverseOrder: r = !1, gutter: a = 8, defaultPosition: o} = n || {},
                            i = t.filter((t => (t.position || o) === (e.position || o) && t.height)),
                            l = i.findIndex((t => t.id === e.id)), s = i.filter(((e, t) => t < l && e.visible)).length;
                        return i.filter((e => e.visible)).slice(...r ? [s + 1] : [0, s]).reduce(((e, t) => e + (t.height || 0) + a), 0)
                    }), [t]);
                    return (0, r.useEffect)((() => {
                        t.forEach((e => {
                            if (e.dismissed) ((e, t = 1e3) => {
                                if (Qe.has(e)) return;
                                let n = setTimeout((() => {
                                    Qe.delete(e), Me({type: 4, toastId: e})
                                }), t);
                                Qe.set(e, n)
                            })(e.id, e.removeDelay); else {
                                let t = Qe.get(e.id);
                                t && (clearTimeout(t), Qe.delete(e.id))
                            }
                        }))
                    }), [t]), {toasts: t, handlers: {updateHeight: De, startPause: Be, endPause: a, calculateOffset: o}}
                })(n);
                return r.createElement("div", {
                    id: "_rht_toaster",
                    style: {
                        position: "fixed",
                        zIndex: 9999,
                        top: 16,
                        left: 16,
                        right: 16,
                        bottom: 16,
                        pointerEvents: "none", ...i
                    },
                    className: l,
                    onMouseEnter: u.startPause,
                    onMouseLeave: u.endPause
                }, s.map((n => {
                    let i = n.position || t, l = ((e, t) => {
                        let n = e.includes("top"), r = n ? {top: 0} : {bottom: 0},
                            a = e.includes("center") ? {justifyContent: "center"} : e.includes("right") ? {justifyContent: "flex-end"} : {};
                        return {
                            left: 0,
                            right: 0,
                            display: "flex",
                            position: "absolute",
                            transition: Le() ? void 0 : "all 230ms cubic-bezier(.21,1.02,.73,1)",
                            transform: `translateY(${t * (n ? 1 : -1)}px)`, ...r, ...a
                        }
                    })(i, u.calculateOffset(n, {reverseOrder: e, gutter: a, defaultPosition: t}));
                    return r.createElement(st, {
                        id: n.id,
                        key: n.id,
                        onHeightUpdate: u.updateHeight,
                        className: n.visible ? ut : "",
                        style: l
                    }, "custom" === n.type ? Ae(n.message, n) : o ? o(n) : r.createElement(lt, {toast: n, position: i}))
                })))
            }), {
                position: "bottom-center",
                toastOptions: {
                    duration: 2e3,
                    style: {
                        background: "#fff",
                        color: "#000",
                        fontSize: "14px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
                    }
                }
            })]
        }))
    })()
})();