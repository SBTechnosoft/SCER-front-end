window.Modernizr = function(e, t, n) {
        function r(e) {
            $.cssText = e
        }

        function i(e, t) {
            return typeof e === t
        }

        function o(e, t) {
            return !!~("" + e).indexOf(t)
        }

        function a(e, t) {
            for (var r in e) {
                var i = e[r];
                if (!o(i, "-") && $[i] !== n) return "pfx" == t ? i : !0
            }
            return !1
        }

        function s(e, t, r) {
            for (var o in e) {
                var a = t[e[o]];
                if (a !== n) return r === !1 ? e[o] : i(a, "function") ? a.bind(r || t) : a
            }
            return !1
        }

        function u(e, t, n) {
            var r = e.charAt(0).toUpperCase() + e.slice(1),
                o = (e + " " + w.join(r + " ") + r).split(" ");
            return i(t, "string") || i(t, "undefined") ? a(o, t) : (o = (e + " " + x.join(r + " ") + r).split(" "), s(o, t, n))
        }
        var l, c, f, p = "2.8.3",
            d = {},
            h = !0,
            m = t.documentElement,
            g = "modernizr",
            v = t.createElement(g),
            $ = v.style,
            y = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
            b = "Webkit Moz O ms",
            w = b.split(" "),
            x = b.toLowerCase().split(" "),
            C = {
                svg: "http://www.w3.org/2000/svg"
            },
            k = {},
            S = [],
            E = S.slice,
            T = function(e, n, r, i) {
                var o, a, s, u, l = t.createElement("div"),
                    c = t.body,
                    f = c || t.createElement("body");
                if (parseInt(r, 10))
                    for (; r--;) s = t.createElement("div"), s.id = i ? i[r] : g + (r + 1), l.appendChild(s);
                return o = ["&#173;", '<style id="s', g, '">', e, "</style>"].join(""), l.id = g, (c ? l : f).innerHTML += o, f.appendChild(l), c || (f.style.background = "", f.style.overflow = "hidden", u = m.style.overflow, m.style.overflow = "hidden", m.appendChild(f)), a = n(l, e), c ? l.parentNode.removeChild(l) : (f.parentNode.removeChild(f), m.style.overflow = u), !!a
            },
            D = function() {
                function e(e, o) {
                    o = o || t.createElement(r[e] || "div"), e = "on" + e;
                    var a = e in o;
                    return a || (o.setAttribute || (o = t.createElement("div")), o.setAttribute && o.removeAttribute && (o.setAttribute(e, ""), a = i(o[e], "function"), i(o[e], "undefined") || (o[e] = n), o.removeAttribute(e))), o = null, a
                }
                var r = {
                    select: "input",
                    change: "input",
                    submit: "form",
                    reset: "form",
                    error: "img",
                    load: "img",
                    abort: "img"
                };
                return e
            }(),
            A = {}.hasOwnProperty;
        f = i(A, "undefined") || i(A.call, "undefined") ? function(e, t) {
            return t in e && i(e.constructor.prototype[t], "undefined")
        } : function(e, t) {
            return A.call(e, t)
        }, Function.prototype.bind || (Function.prototype.bind = function(e) {
            var t = this;
            if ("function" != typeof t) throw new TypeError;
            var n = E.call(arguments, 1),
                r = function() {
                    if (this instanceof r) {
                        var i = function() {};
                        i.prototype = t.prototype;
                        var o = new i,
                            a = t.apply(o, n.concat(E.call(arguments)));
                        return Object(a) === a ? a : o
                    }
                    return t.apply(e, n.concat(E.call(arguments)))
                };
            return r
        }), k.canvas = function() {
            var e = t.createElement("canvas");
            return !!e.getContext && !!e.getContext("2d")
        }, k.touch = function() {
            var n;
            return "ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch ? n = !0 : T(["@media (", y.join("touch-enabled),("), g, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(e) {
                n = 9 === e.offsetTop
            }), n
        }, k.draganddrop = function() {
            var e = t.createElement("div");
            return "draggable" in e || "ondragstart" in e && "ondrop" in e
        }, k.rgba = function() {
            return r("background-color:rgba(150,255,150,.5)"), o($.backgroundColor, "rgba")
        }, k.csscolumns = function() {
            return u("columnCount")
        }, k.csstransforms = function() {
            return !!u("transform")
        }, k.csstransforms3d = function() {
            var e = !!u("perspective");
            return e && "webkitPerspective" in m.style && T("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(t, n) {
                e = 9 === t.offsetLeft && 3 === t.offsetHeight
            }), e
        }, k.csstransitions = function() {
            return u("transition")
        }, k.fontface = function() {
            var e;
            return T('@font-face {font-family:"font";src:url("https://")}', function(n, r) {
                var i = t.getElementById("smodernizr"),
                    o = i.sheet || i.styleSheet,
                    a = o ? o.cssRules && o.cssRules[0] ? o.cssRules[0].cssText : o.cssText || "" : "";
                e = /src/i.test(a) && 0 === a.indexOf(r.split(" ")[0])
            }), e
        }, k.localstorage = function() {
            try {
                return localStorage.setItem(g, g), localStorage.removeItem(g), !0
            } catch (e) {
                return !1
            }
        }, k.sessionstorage = function() {
            try {
                return sessionStorage.setItem(g, g), sessionStorage.removeItem(g), !0
            } catch (e) {
                return !1
            }
        }, k.svg = function() {
            return !!t.createElementNS && !!t.createElementNS(C.svg, "svg").createSVGRect
        };
        for (var O in k) f(k, O) && (c = O.toLowerCase(), d[c] = k[O](), S.push((d[c] ? "" : "no-") + c));
        return d.addTest = function(e, t) {
            if ("object" == typeof e)
                for (var r in e) f(e, r) && d.addTest(r, e[r]);
            else {
                if (e = e.toLowerCase(), d[e] !== n) return d;
                t = "function" == typeof t ? t() : t, "undefined" != typeof h && h && (m.className += " " + (t ? "" : "no-") + e), d[e] = t
            }
            return d
        }, r(""), v = l = null, d._version = p, d._prefixes = y, d._domPrefixes = x, d._cssomPrefixes = w, d.hasEvent = D, d.testProp = function(e) {
            return a([e])
        }, d.testAllProps = u, d.testStyles = T, m.className = m.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (h ? " js " + S.join(" ") : ""), d
    }(this, this.document),
    function(e, t, n) {
        function r(e) {
            return "[object Function]" == g.call(e)
        }

        function i(e) {
            return "string" == typeof e
        }

        function o() {}

        function a(e) {
            return !e || "loaded" == e || "complete" == e || "uninitialized" == e
        }

        function s() {
            var e = v.shift();
            $ = 1, e ? e.t ? h(function() {
                ("c" == e.t ? p.injectCss : p.injectJs)(e.s, 0, e.a, e.x, e.e, 1)
            }, 0) : (e(), s()) : $ = 0
        }

        function u(e, n, r, i, o, u, l) {
            function c(t) {
                if (!d && a(f.readyState) && (y.r = d = 1, !$ && s(), f.onload = f.onreadystatechange = null, t)) {
                    "img" != e && h(function() {
                        w.removeChild(f)
                    }, 50);
                    for (var r in E[n]) E[n].hasOwnProperty(r) && E[n][r].onload()
                }
            }
            var l = l || p.errorTimeout,
                f = t.createElement(e),
                d = 0,
                g = 0,
                y = {
                    t: r,
                    s: n,
                    e: o,
                    a: u,
                    x: l
                };
            1 === E[n] && (g = 1, E[n] = []), "object" == e ? f.data = n : (f.src = n, f.type = e), f.width = f.height = "0", f.onerror = f.onload = f.onreadystatechange = function() {
                c.call(this, g)
            }, v.splice(i, 0, y), "img" != e && (g || 2 === E[n] ? (w.insertBefore(f, b ? null : m), h(c, l)) : E[n].push(f))
        }

        function l(e, t, n, r, o) {
            return $ = 0, t = t || "j", i(e) ? u("c" == t ? C : x, e, t, this.i++, n, r, o) : (v.splice(this.i++, 0, e), 1 == v.length && s()), this
        }

        function c() {
            var e = p;
            return e.loader = {
                load: l,
                i: 0
            }, e
        }
        var f, p, d = t.documentElement,
            h = e.setTimeout,
            m = t.getElementsByTagName("script")[0],
            g = {}.toString,
            v = [],
            $ = 0,
            y = "MozAppearance" in d.style,
            b = y && !!t.createRange().compareNode,
            w = b ? d : m.parentNode,
            d = e.opera && "[object Opera]" == g.call(e.opera),
            d = !!t.attachEvent && !d,
            x = y ? "object" : d ? "script" : "img",
            C = d ? "script" : x,
            k = Array.isArray || function(e) {
                return "[object Array]" == g.call(e)
            },
            S = [],
            E = {},
            T = {
                timeout: function(e, t) {
                    return t.length && (e.timeout = t[0]), e
                }
            };
        p = function(e) {
            function t(e) {
                var t, n, r, e = e.split("!"),
                    i = S.length,
                    o = e.pop(),
                    a = e.length,
                    o = {
                        url: o,
                        origUrl: o,
                        prefixes: e
                    };
                for (n = 0; a > n; n++) r = e[n].split("="), (t = T[r.shift()]) && (o = t(o, r));
                for (n = 0; i > n; n++) o = S[n](o);
                return o
            }

            function a(e, i, o, a, s) {
                var u = t(e),
                    l = u.autoCallback;
                u.url.split(".").pop().split("?").shift(), u.bypass || (i && (i = r(i) ? i : i[e] || i[a] || i[e.split("/").pop().split("?")[0]]), u.instead ? u.instead(e, i, o, a, s) : (E[u.url] ? u.noexec = !0 : E[u.url] = 1, o.load(u.url, u.forceCSS || !u.forceJS && "css" == u.url.split(".").pop().split("?").shift() ? "c" : n, u.noexec, u.attrs, u.timeout), (r(i) || r(l)) && o.load(function() {
                    c(), i && i(u.origUrl, s, a), l && l(u.origUrl, s, a), E[u.url] = 2
                })))
            }

            function s(e, t) {
                function n(e, n) {
                    if (e) {
                        if (i(e)) n || (f = function() {
                            var e = [].slice.call(arguments);
                            p.apply(this, e), d()
                        }), a(e, f, t, 0, l);
                        else if (Object(e) === e)
                            for (u in s = function() {
                                    var t, n = 0;
                                    for (t in e) e.hasOwnProperty(t) && n++;
                                    return n
                                }(), e) e.hasOwnProperty(u) && (!n && !--s && (r(f) ? f = function() {
                                var e = [].slice.call(arguments);
                                p.apply(this, e), d()
                            } : f[u] = function(e) {
                                return function() {
                                    var t = [].slice.call(arguments);
                                    e && e.apply(this, t), d()
                                }
                            }(p[u])), a(e[u], f, t, u, l))
                    } else !n && d()
                }
                var s, u, l = !!e.test,
                    c = e.load || e.both,
                    f = e.callback || o,
                    p = f,
                    d = e.complete || o;
                n(l ? e.yep : e.nope, !!c), c && n(c)
            }
            var u, l, f = this.yepnope.loader;
            if (i(e)) a(e, 0, f, 0);
            else if (k(e))
                for (u = 0; u < e.length; u++) l = e[u], i(l) ? a(l, 0, f, 0) : k(l) ? p(l) : Object(l) === l && s(l, f);
            else Object(e) === e && s(e, f)
        }, p.addPrefix = function(e, t) {
            T[e] = t
        }, p.addFilter = function(e) {
            S.push(e)
        }, p.errorTimeout = 1e4, null == t.readyState && t.addEventListener && (t.readyState = "loading", t.addEventListener("DOMContentLoaded", f = function() {
            t.removeEventListener("DOMContentLoaded", f, 0), t.readyState = "complete"
        }, 0)), e.yepnope = c(), e.yepnope.executeStack = s, e.yepnope.injectJs = function(e, n, r, i, u, l) {
            var c, f, d = t.createElement("script"),
                i = i || p.errorTimeout;
            d.src = e;
            for (f in r) d.setAttribute(f, r[f]);
            n = l ? s : n || o, d.onreadystatechange = d.onload = function() {
                !c && a(d.readyState) && (c = 1, n(), d.onload = d.onreadystatechange = null)
            }, h(function() {
                c || (c = 1, n(1))
            }, i), u ? d.onload() : m.parentNode.insertBefore(d, m)
        }, e.yepnope.injectCss = function(e, n, r, i, a, u) {
            var l, i = t.createElement("link"),
                n = u ? s : n || o;
            i.href = e, i.rel = "stylesheet", i.type = "text/css";
            for (l in r) i.setAttribute(l, r[l]);
            a || (m.parentNode.insertBefore(i, m), h(n, 0))
        }
    }(this, document), Modernizr.load = function() {
        yepnope.apply(window, [].slice.call(arguments, 0))
    },
    function(e, t) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
            if (!e.document) throw new Error("jQuery requires a window with a document");
            return t(e)
        } : t(e)
    }("undefined" != typeof window ? window : this, function(e, t) {
        function n(e) {
            var t = "length" in e && e.length,
                n = Q.type(e);
            return "function" === n || Q.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
        }

        function r(e, t, n) {
            if (Q.isFunction(t)) return Q.grep(e, function(e, r) {
                return !!t.call(e, r, e) !== n
            });
            if (t.nodeType) return Q.grep(e, function(e) {
                return e === t !== n
            });
            if ("string" == typeof t) {
                if (se.test(t)) return Q.filter(t, e, n);
                t = Q.filter(t, e)
            }
            return Q.grep(e, function(e) {
                return W.call(t, e) >= 0 !== n
            })
        }

        function i(e, t) {
            for (;
                (e = e[t]) && 1 !== e.nodeType;);
            return e
        }

        function o(e) {
            var t = he[e] = {};
            return Q.each(e.match(de) || [], function(e, n) {
                t[n] = !0
            }), t
        }

        function a() {
            X.removeEventListener("DOMContentLoaded", a, !1), e.removeEventListener("load", a, !1), Q.ready()
        }

        function s() {
            Object.defineProperty(this.cache = {}, 0, {
                get: function() {
                    return {}
                }
            }), this.expando = Q.expando + s.uid++
        }

        function u(e, t, n) {
            var r;
            if (void 0 === n && 1 === e.nodeType)
                if (r = "data-" + t.replace(be, "-$1").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
                    try {
                        n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : ye.test(n) ? Q.parseJSON(n) : n
                    } catch (i) {}
                    $e.set(e, t, n)
                } else n = void 0;
            return n
        }

        function l() {
            return !0
        }

        function c() {
            return !1
        }

        function f() {
            try {
                return X.activeElement
            } catch (e) {}
        }

        function p(e, t) {
            return Q.nodeName(e, "table") && Q.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
        }

        function d(e) {
            return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
        }

        function h(e) {
            var t = Ie.exec(e.type);
            return t ? e.type = t[1] : e.removeAttribute("type"), e
        }

        function m(e, t) {
            for (var n = 0, r = e.length; r > n; n++) ve.set(e[n], "globalEval", !t || ve.get(t[n], "globalEval"))
        }

        function g(e, t) {
            var n, r, i, o, a, s, u, l;
            if (1 === t.nodeType) {
                if (ve.hasData(e) && (o = ve.access(e), a = ve.set(t, o), l = o.events)) {
                    delete a.handle, a.events = {};
                    for (i in l)
                        for (n = 0, r = l[i].length; r > n; n++) Q.event.add(t, i, l[i][n])
                }
                $e.hasData(e) && (s = $e.access(e), u = Q.extend({}, s), $e.set(t, u))
            }
        }

        function v(e, t) {
            var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
            return void 0 === t || t && Q.nodeName(e, t) ? Q.merge([e], n) : n
        }

        function $(e, t) {
            var n = t.nodeName.toLowerCase();
            "input" === n && ke.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }

        function y(t, n) {
            var r, i = Q(n.createElement(t)).appendTo(n.body),
                o = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(i[0])) ? r.display : Q.css(i[0], "display");
            return i.detach(), o
        }

        function b(e) {
            var t = X,
                n = He[e];
            return n || (n = y(e, t), "none" !== n && n || (Fe = (Fe || Q("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = Fe[0].contentDocument, t.write(), t.close(), n = y(e, t), Fe.detach()), He[e] = n), n
        }

        function w(e, t, n) {
            var r, i, o, a, s = e.style;
            return n = n || Ue(e), n && (a = n.getPropertyValue(t) || n[t]), n && ("" !== a || Q.contains(e.ownerDocument, e) || (a = Q.style(e, t)), _e.test(a) && Re.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a
        }

        function x(e, t) {
            return {
                get: function() {
                    return e() ? void delete this.get : (this.get = t).apply(this, arguments)
                }
            }
        }

        function C(e, t) {
            if (t in e) return t;
            for (var n = t[0].toUpperCase() + t.slice(1), r = t, i = Ke.length; i--;)
                if (t = Ke[i] + n, t in e) return t;
            return r
        }

        function k(e, t, n) {
            var r = ze.exec(t);
            return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
        }

        function S(e, t, n, r, i) {
            for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === n && (a += Q.css(e, n + xe[o], !0, i)), r ? ("content" === n && (a -= Q.css(e, "padding" + xe[o], !0, i)), "margin" !== n && (a -= Q.css(e, "border" + xe[o] + "Width", !0, i))) : (a += Q.css(e, "padding" + xe[o], !0, i), "padding" !== n && (a += Q.css(e, "border" + xe[o] + "Width", !0, i)));
            return a
        }

        function E(e, t, n) {
            var r = !0,
                i = "width" === t ? e.offsetWidth : e.offsetHeight,
                o = Ue(e),
                a = "border-box" === Q.css(e, "boxSizing", !1, o);
            if (0 >= i || null == i) {
                if (i = w(e, t, o), (0 > i || null == i) && (i = e.style[t]), _e.test(i)) return i;
                r = a && (J.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
            }
            return i + S(e, t, n || (a ? "border" : "content"), r, o) + "px"
        }

        function T(e, t) {
            for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++) r = e[a], r.style && (o[a] = ve.get(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && Ce(r) && (o[a] = ve.access(r, "olddisplay", b(r.nodeName)))) : (i = Ce(r), "none" === n && i || ve.set(r, "olddisplay", i ? n : Q.css(r, "display"))));
            for (a = 0; s > a; a++) r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
            return e
        }

        function D(e, t, n, r, i) {
            return new D.prototype.init(e, t, n, r, i)
        }

        function A() {
            return setTimeout(function() {
                Je = void 0
            }), Je = Q.now()
        }

        function O(e, t) {
            var n, r = 0,
                i = {
                    height: e
                };
            for (t = t ? 1 : 0; 4 > r; r += 2 - t) n = xe[r], i["margin" + n] = i["padding" + n] = e;
            return t && (i.opacity = i.width = e), i
        }

        function M(e, t, n) {
            for (var r, i = (nt[t] || []).concat(nt["*"]), o = 0, a = i.length; a > o; o++)
                if (r = i[o].call(n, t, e)) return r
        }

        function j(e, t, n) {
            var r, i, o, a, s, u, l, c, f = this,
                p = {},
                d = e.style,
                h = e.nodeType && Ce(e),
                m = ve.get(e, "fxshow");
            n.queue || (s = Q._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function() {
                s.unqueued || u()
            }), s.unqueued++, f.always(function() {
                f.always(function() {
                    s.unqueued--, Q.queue(e, "fx").length || s.empty.fire()
                })
            })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], l = Q.css(e, "display"), c = "none" === l ? ve.get(e, "olddisplay") || b(e.nodeName) : l, "inline" === c && "none" === Q.css(e, "float") && (d.display = "inline-block")), n.overflow && (d.overflow = "hidden", f.always(function() {
                d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
            }));
            for (r in t)
                if (i = t[r], Ze.exec(i)) {
                    if (delete t[r], o = o || "toggle" === i, i === (h ? "hide" : "show")) {
                        if ("show" !== i || !m || void 0 === m[r]) continue;
                        h = !0
                    }
                    p[r] = m && m[r] || Q.style(e, r)
                } else l = void 0;
            if (Q.isEmptyObject(p)) "inline" === ("none" === l ? b(e.nodeName) : l) && (d.display = l);
            else {
                m ? "hidden" in m && (h = m.hidden) : m = ve.access(e, "fxshow", {}), o && (m.hidden = !h), h ? Q(e).show() : f.done(function() {
                    Q(e).hide()
                }), f.done(function() {
                    var t;
                    ve.remove(e, "fxshow");
                    for (t in p) Q.style(e, t, p[t])
                });
                for (r in p) a = M(h ? m[r] : 0, r, f), r in m || (m[r] = a.start, h && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
            }
        }

        function N(e, t) {
            var n, r, i, o, a;
            for (n in e)
                if (r = Q.camelCase(n), i = t[r], o = e[n], Q.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = Q.cssHooks[r], a && "expand" in a) {
                    o = a.expand(o), delete e[r];
                    for (n in o) n in e || (e[n] = o[n], t[n] = i)
                } else t[r] = i
        }

        function P(e, t, n) {
            var r, i, o = 0,
                a = tt.length,
                s = Q.Deferred().always(function() {
                    delete u.elem
                }),
                u = function() {
                    if (i) return !1;
                    for (var t = Je || A(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, a = 0, u = l.tweens.length; u > a; a++) l.tweens[a].run(o);
                    return s.notifyWith(e, [l, o, n]), 1 > o && u ? n : (s.resolveWith(e, [l]), !1)
                },
                l = s.promise({
                    elem: e,
                    props: Q.extend({}, t),
                    opts: Q.extend(!0, {
                        specialEasing: {}
                    }, n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: Je || A(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(t, n) {
                        var r = Q.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                        return l.tweens.push(r), r
                    },
                    stop: function(t) {
                        var n = 0,
                            r = t ? l.tweens.length : 0;
                        if (i) return this;
                        for (i = !0; r > n; n++) l.tweens[n].run(1);
                        return t ? s.resolveWith(e, [l, t]) : s.rejectWith(e, [l, t]), this
                    }
                }),
                c = l.props;
            for (N(c, l.opts.specialEasing); a > o; o++)
                if (r = tt[o].call(l, e, c, l.opts)) return r;
            return Q.map(c, M, l), Q.isFunction(l.opts.start) && l.opts.start.call(e, l), Q.fx.timer(Q.extend(u, {
                elem: e,
                anim: l,
                queue: l.opts.queue
            })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
        }

        function L(e) {
            return function(t, n) {
                "string" != typeof t && (n = t, t = "*");
                var r, i = 0,
                    o = t.toLowerCase().match(de) || [];
                if (Q.isFunction(n))
                    for (; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
            }
        }

        function I(e, t, n, r) {
            function i(s) {
                var u;
                return o[s] = !0, Q.each(e[s] || [], function(e, s) {
                    var l = s(t, n, r);
                    return "string" != typeof l || a || o[l] ? a ? !(u = l) : void 0 : (t.dataTypes.unshift(l), i(l), !1)
                }), u
            }
            var o = {},
                a = e === yt;
            return i(t.dataTypes[0]) || !o["*"] && i("*")
        }

        function q(e, t) {
            var n, r, i = Q.ajaxSettings.flatOptions || {};
            for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
            return r && Q.extend(!0, e, r), e
        }

        function V(e, t, n) {
            for (var r, i, o, a, s = e.contents, u = e.dataTypes;
                "*" === u[0];) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
            if (r)
                for (i in s)
                    if (s[i] && s[i].test(r)) {
                        u.unshift(i);
                        break
                    }
            if (u[0] in n) o = u[0];
            else {
                for (i in n) {
                    if (!u[0] || e.converters[i + " " + u[0]]) {
                        o = i;
                        break
                    }
                    a || (a = i)
                }
                o = o || a
            }
            return o ? (o !== u[0] && u.unshift(o), n[o]) : void 0
        }

        function F(e, t, n, r) {
            var i, o, a, s, u, l = {},
                c = e.dataTypes.slice();
            if (c[1])
                for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
            for (o = c.shift(); o;)
                if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
                    if ("*" === o) o = u;
                    else if ("*" !== u && u !== o) {
                if (a = l[u + " " + o] || l["* " + o], !a)
                    for (i in l)
                        if (s = i.split(" "), s[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                            a === !0 ? a = l[i] : l[i] !== !0 && (o = s[0], c.unshift(s[1]));
                            break
                        }
                if (a !== !0)
                    if (a && e["throws"]) t = a(t);
                    else try {
                        t = a(t)
                    } catch (f) {
                        return {
                            state: "parsererror",
                            error: a ? f : "No conversion from " + u + " to " + o
                        }
                    }
            }
            return {
                state: "success",
                data: t
            }
        }

        function H(e, t, n, r) {
            var i;
            if (Q.isArray(t)) Q.each(t, function(t, i) {
                n || kt.test(e) ? r(e, i) : H(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
            });
            else if (n || "object" !== Q.type(t)) r(e, t);
            else
                for (i in t) H(e + "[" + i + "]", t[i], n, r)
        }

        function R(e) {
            return Q.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
        }
        var _ = [],
            U = _.slice,
            B = _.concat,
            z = _.push,
            W = _.indexOf,
            Y = {},
            G = Y.toString,
            K = Y.hasOwnProperty,
            J = {},
            X = e.document,
            Z = "2.1.4",
            Q = function(e, t) {
                return new Q.fn.init(e, t)
            },
            ee = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            te = /^-ms-/,
            ne = /-([\da-z])/gi,
            re = function(e, t) {
                return t.toUpperCase()
            };
        Q.fn = Q.prototype = {
            jquery: Z,
            constructor: Q,
            selector: "",
            length: 0,
            toArray: function() {
                return U.call(this)
            },
            get: function(e) {
                return null != e ? 0 > e ? this[e + this.length] : this[e] : U.call(this)
            },
            pushStack: function(e) {
                var t = Q.merge(this.constructor(), e);
                return t.prevObject = this, t.context = this.context, t
            },
            each: function(e, t) {
                return Q.each(this, e, t)
            },
            map: function(e) {
                return this.pushStack(Q.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            slice: function() {
                return this.pushStack(U.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(e) {
                var t = this.length,
                    n = +e + (0 > e ? t : 0);
                return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: z,
            sort: _.sort,
            splice: _.splice
        }, Q.extend = Q.fn.extend = function() {
            var e, t, n, r, i, o, a = arguments[0] || {},
                s = 1,
                u = arguments.length,
                l = !1;
            for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || Q.isFunction(a) || (a = {}), s === u && (a = this, s--); u > s; s++)
                if (null != (e = arguments[s]))
                    for (t in e) n = a[t], r = e[t], a !== r && (l && r && (Q.isPlainObject(r) || (i = Q.isArray(r))) ? (i ? (i = !1, o = n && Q.isArray(n) ? n : []) : o = n && Q.isPlainObject(n) ? n : {}, a[t] = Q.extend(l, o, r)) : void 0 !== r && (a[t] = r));
            return a
        }, Q.extend({
            expando: "jQuery" + (Z + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(e) {
                throw new Error(e)
            },
            noop: function() {},
            isFunction: function(e) {
                return "function" === Q.type(e)
            },
            isArray: Array.isArray,
            isWindow: function(e) {
                return null != e && e === e.window
            },
            isNumeric: function(e) {
                return !Q.isArray(e) && e - parseFloat(e) + 1 >= 0
            },
            isPlainObject: function(e) {
                return "object" !== Q.type(e) || e.nodeType || Q.isWindow(e) ? !1 : e.constructor && !K.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e) return !1;
                return !0
            },
            type: function(e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Y[G.call(e)] || "object" : typeof e
            },
            globalEval: function(e) {
                var t, n = eval;
                e = Q.trim(e), e && (1 === e.indexOf("use strict") ? (t = X.createElement("script"), t.text = e, X.head.appendChild(t).parentNode.removeChild(t)) : n(e))
            },
            camelCase: function(e) {
                return e.replace(te, "ms-").replace(ne, re)
            },
            nodeName: function(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function(e, t, r) {
                var i, o = 0,
                    a = e.length,
                    s = n(e);
                if (r) {
                    if (s)
                        for (; a > o && (i = t.apply(e[o], r), i !== !1); o++);
                    else
                        for (o in e)
                            if (i = t.apply(e[o], r), i === !1) break
                } else if (s)
                    for (; a > o && (i = t.call(e[o], o, e[o]), i !== !1); o++);
                else
                    for (o in e)
                        if (i = t.call(e[o], o, e[o]), i === !1) break; return e
            },
            trim: function(e) {
                return null == e ? "" : (e + "").replace(ee, "")
            },
            makeArray: function(e, t) {
                var r = t || [];
                return null != e && (n(Object(e)) ? Q.merge(r, "string" == typeof e ? [e] : e) : z.call(r, e)), r
            },
            inArray: function(e, t, n) {
                return null == t ? -1 : W.call(t, e, n)
            },
            merge: function(e, t) {
                for (var n = +t.length, r = 0, i = e.length; n > r; r++) e[i++] = t[r];
                return e.length = i, e
            },
            grep: function(e, t, n) {
                for (var r, i = [], o = 0, a = e.length, s = !n; a > o; o++) r = !t(e[o], o), r !== s && i.push(e[o]);
                return i
            },
            map: function(e, t, r) {
                var i, o = 0,
                    a = e.length,
                    s = n(e),
                    u = [];
                if (s)
                    for (; a > o; o++) i = t(e[o], o, r), null != i && u.push(i);
                else
                    for (o in e) i = t(e[o], o, r), null != i && u.push(i);
                return B.apply([], u)
            },
            guid: 1,
            proxy: function(e, t) {
                var n, r, i;
                return "string" == typeof t && (n = e[t], t = e, e = n), Q.isFunction(e) ? (r = U.call(arguments, 2), i = function() {
                    return e.apply(t || this, r.concat(U.call(arguments)))
                }, i.guid = e.guid = e.guid || Q.guid++, i) : void 0
            },
            now: Date.now,
            support: J
        }), Q.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
            Y["[object " + t + "]"] = t.toLowerCase()
        });
        var ie = function(e) {
            function t(e, t, n, r) {
                var i, o, a, s, u, l, f, d, h, m;
                if ((t ? t.ownerDocument || t : H) !== j && M(t), t = t || j, n = n || [], s = t.nodeType, "string" != typeof e || !e || 1 !== s && 9 !== s && 11 !== s) return n;
                if (!r && P) {
                    if (11 !== s && (i = $e.exec(e)))
                        if (a = i[1]) {
                            if (9 === s) {
                                if (o = t.getElementById(a), !o || !o.parentNode) return n;
                                if (o.id === a) return n.push(o), n
                            } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && V(t, o) && o.id === a) return n.push(o), n
                        } else {
                            if (i[2]) return Z.apply(n, t.getElementsByTagName(e)), n;
                            if ((a = i[3]) && w.getElementsByClassName) return Z.apply(n, t.getElementsByClassName(a)), n
                        }
                    if (w.qsa && (!L || !L.test(e))) {
                        if (d = f = F, h = t, m = 1 !== s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                            for (l = S(e), (f = t.getAttribute("id")) ? d = f.replace(be, "\\$&") : t.setAttribute("id", d), d = "[id='" + d + "'] ", u = l.length; u--;) l[u] = d + p(l[u]);
                            h = ye.test(e) && c(t.parentNode) || t, m = l.join(",")
                        }
                        if (m) try {
                            return Z.apply(n, h.querySelectorAll(m)), n
                        } catch (g) {} finally {
                            f || t.removeAttribute("id")
                        }
                    }
                }
                return T(e.replace(ue, "$1"), t, n, r)
            }

            function n() {
                function e(n, r) {
                    return t.push(n + " ") > x.cacheLength && delete e[t.shift()], e[n + " "] = r
                }
                var t = [];
                return e
            }

            function r(e) {
                return e[F] = !0, e
            }

            function i(e) {
                var t = j.createElement("div");
                try {
                    return !!e(t)
                } catch (n) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t = null
                }
            }

            function o(e, t) {
                for (var n = e.split("|"), r = e.length; r--;) x.attrHandle[n[r]] = t
            }

            function a(e, t) {
                var n = t && e,
                    r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Y) - (~e.sourceIndex || Y);
                if (r) return r;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === t) return -1;
                return e ? 1 : -1
            }

            function s(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return "input" === n && t.type === e
                }
            }

            function u(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type === e
                }
            }

            function l(e) {
                return r(function(t) {
                    return t = +t, r(function(n, r) {
                        for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                    })
                })
            }

            function c(e) {
                return e && "undefined" != typeof e.getElementsByTagName && e
            }

            function f() {}

            function p(e) {
                for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
                return r
            }

            function d(e, t, n) {
                var r = t.dir,
                    i = n && "parentNode" === r,
                    o = _++;
                return t.first ? function(t, n, o) {
                    for (; t = t[r];)
                        if (1 === t.nodeType || i) return e(t, n, o)
                } : function(t, n, a) {
                    var s, u, l = [R, o];
                    if (a) {
                        for (; t = t[r];)
                            if ((1 === t.nodeType || i) && e(t, n, a)) return !0
                    } else
                        for (; t = t[r];)
                            if (1 === t.nodeType || i) {
                                if (u = t[F] || (t[F] = {}), (s = u[r]) && s[0] === R && s[1] === o) return l[2] = s[2];
                                if (u[r] = l, l[2] = e(t, n, a)) return !0
                            }
                }
            }

            function h(e) {
                return e.length > 1 ? function(t, n, r) {
                    for (var i = e.length; i--;)
                        if (!e[i](t, n, r)) return !1;
                    return !0
                } : e[0]
            }

            function m(e, n, r) {
                for (var i = 0, o = n.length; o > i; i++) t(e, n[i], r);
                return r
            }

            function g(e, t, n, r, i) {
                for (var o, a = [], s = 0, u = e.length, l = null != t; u > s; s++)(o = e[s]) && (!n || n(o, r, i)) && (a.push(o), l && t.push(s));
                return a
            }

            function v(e, t, n, i, o, a) {
                return i && !i[F] && (i = v(i)), o && !o[F] && (o = v(o, a)), r(function(r, a, s, u) {
                    var l, c, f, p = [],
                        d = [],
                        h = a.length,
                        v = r || m(t || "*", s.nodeType ? [s] : s, []),
                        $ = !e || !r && t ? v : g(v, p, e, s, u),
                        y = n ? o || (r ? e : h || i) ? [] : a : $;
                    if (n && n($, y, s, u), i)
                        for (l = g(y, d), i(l, [], s, u), c = l.length; c--;)(f = l[c]) && (y[d[c]] = !($[d[c]] = f));
                    if (r) {
                        if (o || e) {
                            if (o) {
                                for (l = [], c = y.length; c--;)(f = y[c]) && l.push($[c] = f);
                                o(null, y = [], l, u)
                            }
                            for (c = y.length; c--;)(f = y[c]) && (l = o ? ee(r, f) : p[c]) > -1 && (r[l] = !(a[l] = f))
                        }
                    } else y = g(y === a ? y.splice(h, y.length) : y), o ? o(null, a, y, u) : Z.apply(a, y)
                })
            }

            function $(e) {
                for (var t, n, r, i = e.length, o = x.relative[e[0].type], a = o || x.relative[" "], s = o ? 1 : 0, u = d(function(e) {
                        return e === t
                    }, a, !0), l = d(function(e) {
                        return ee(t, e) > -1
                    }, a, !0), c = [function(e, n, r) {
                        var i = !o && (r || n !== D) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r));
                        return t = null, i
                    }]; i > s; s++)
                    if (n = x.relative[e[s].type]) c = [d(h(c), n)];
                    else {
                        if (n = x.filter[e[s].type].apply(null, e[s].matches), n[F]) {
                            for (r = ++s; i > r && !x.relative[e[r].type]; r++);
                            return v(s > 1 && h(c), s > 1 && p(e.slice(0, s - 1).concat({
                                value: " " === e[s - 2].type ? "*" : ""
                            })).replace(ue, "$1"), n, r > s && $(e.slice(s, r)), i > r && $(e = e.slice(r)), i > r && p(e))
                        }
                        c.push(n)
                    }
                return h(c)
            }

            function y(e, n) {
                var i = n.length > 0,
                    o = e.length > 0,
                    a = function(r, a, s, u, l) {
                        var c, f, p, d = 0,
                            h = "0",
                            m = r && [],
                            v = [],
                            $ = D,
                            y = r || o && x.find.TAG("*", l),
                            b = R += null == $ ? 1 : Math.random() || .1,
                            w = y.length;
                        for (l && (D = a !== j && a); h !== w && null != (c = y[h]); h++) {
                            if (o && c) {
                                for (f = 0; p = e[f++];)
                                    if (p(c, a, s)) {
                                        u.push(c);
                                        break
                                    }
                                l && (R = b)
                            }
                            i && ((c = !p && c) && d--, r && m.push(c))
                        }
                        if (d += h, i && h !== d) {
                            for (f = 0; p = n[f++];) p(m, v, a, s);
                            if (r) {
                                if (d > 0)
                                    for (; h--;) m[h] || v[h] || (v[h] = J.call(u));
                                v = g(v)
                            }
                            Z.apply(u, v), l && !r && v.length > 0 && d + n.length > 1 && t.uniqueSort(u)
                        }
                        return l && (R = b, D = $), m
                    };
                return i ? r(a) : a
            }
            var b, w, x, C, k, S, E, T, D, A, O, M, j, N, P, L, I, q, V, F = "sizzle" + 1 * new Date,
                H = e.document,
                R = 0,
                _ = 0,
                U = n(),
                B = n(),
                z = n(),
                W = function(e, t) {
                    return e === t && (O = !0), 0
                },
                Y = 1 << 31,
                G = {}.hasOwnProperty,
                K = [],
                J = K.pop,
                X = K.push,
                Z = K.push,
                Q = K.slice,
                ee = function(e, t) {
                    for (var n = 0, r = e.length; r > n; n++)
                        if (e[n] === t) return n;
                    return -1
                },
                te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                ne = "[\\x20\\t\\r\\n\\f]",
                re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                ie = re.replace("w", "w#"),
                oe = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]",
                ae = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)",
                se = new RegExp(ne + "+", "g"),
                ue = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
                le = new RegExp("^" + ne + "*," + ne + "*"),
                ce = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
                fe = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
                pe = new RegExp(ae),
                de = new RegExp("^" + ie + "$"),
                he = {
                    ID: new RegExp("^#(" + re + ")"),
                    CLASS: new RegExp("^\\.(" + re + ")"),
                    TAG: new RegExp("^(" + re.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + oe),
                    PSEUDO: new RegExp("^" + ae),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + te + ")$", "i"),
                    needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
                },
                me = /^(?:input|select|textarea|button)$/i,
                ge = /^h\d$/i,
                ve = /^[^{]+\{\s*\[native \w/,
                $e = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                ye = /[+~]/,
                be = /'|\\/g,
                we = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
                xe = function(e, t, n) {
                    var r = "0x" + t - 65536;
                    return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
                },
                Ce = function() {
                    M()
                };
            try {
                Z.apply(K = Q.call(H.childNodes), H.childNodes), K[H.childNodes.length].nodeType
            } catch (ke) {
                Z = {
                    apply: K.length ? function(e, t) {
                        X.apply(e, Q.call(t))
                    } : function(e, t) {
                        for (var n = e.length, r = 0; e[n++] = t[r++];);
                        e.length = n - 1
                    }
                }
            }
            w = t.support = {}, k = t.isXML = function(e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return t ? "HTML" !== t.nodeName : !1
            }, M = t.setDocument = function(e) {
                var t, n, r = e ? e.ownerDocument || e : H;
                return r !== j && 9 === r.nodeType && r.documentElement ? (j = r, N = r.documentElement, n = r.defaultView, n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", Ce, !1) : n.attachEvent && n.attachEvent("onunload", Ce)), P = !k(r), w.attributes = i(function(e) {
                    return e.className = "i", !e.getAttribute("className")
                }), w.getElementsByTagName = i(function(e) {
                    return e.appendChild(r.createComment("")), !e.getElementsByTagName("*").length
                }), w.getElementsByClassName = ve.test(r.getElementsByClassName), w.getById = i(function(e) {
                    return N.appendChild(e).id = F, !r.getElementsByName || !r.getElementsByName(F).length
                }), w.getById ? (x.find.ID = function(e, t) {
                    if ("undefined" != typeof t.getElementById && P) {
                        var n = t.getElementById(e);
                        return n && n.parentNode ? [n] : []
                    }
                }, x.filter.ID = function(e) {
                    var t = e.replace(we, xe);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }) : (delete x.find.ID, x.filter.ID = function(e) {
                    var t = e.replace(we, xe);
                    return function(e) {
                        var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }), x.find.TAG = w.getElementsByTagName ? function(e, t) {
                    return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0
                } : function(e, t) {
                    var n, r = [],
                        i = 0,
                        o = t.getElementsByTagName(e);
                    if ("*" === e) {
                        for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                        return r
                    }
                    return o
                }, x.find.CLASS = w.getElementsByClassName && function(e, t) {
                    return P ? t.getElementsByClassName(e) : void 0
                }, I = [], L = [], (w.qsa = ve.test(r.querySelectorAll)) && (i(function(e) {
                    N.appendChild(e).innerHTML = "<a id='" + F + "'></a><select id='" + F + "-\f]' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && L.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || L.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + F + "-]").length || L.push("~="), e.querySelectorAll(":checked").length || L.push(":checked"), e.querySelectorAll("a#" + F + "+*").length || L.push(".#.+[+~]")
                }), i(function(e) {
                    var t = r.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && L.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || L.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), L.push(",.*:")
                })), (w.matchesSelector = ve.test(q = N.matches || N.webkitMatchesSelector || N.mozMatchesSelector || N.oMatchesSelector || N.msMatchesSelector)) && i(function(e) {
                    w.disconnectedMatch = q.call(e, "div"), q.call(e, "[s!='']:x"), I.push("!=", ae)
                }), L = L.length && new RegExp(L.join("|")), I = I.length && new RegExp(I.join("|")), t = ve.test(N.compareDocumentPosition), V = t || ve.test(N.contains) ? function(e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                        r = t && t.parentNode;
                    return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                } : function(e, t) {
                    if (t)
                        for (; t = t.parentNode;)
                            if (t === e) return !0;
                    return !1
                }, W = t ? function(e, t) {
                    if (e === t) return O = !0, 0;
                    var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !w.sortDetached && t.compareDocumentPosition(e) === n ? e === r || e.ownerDocument === H && V(H, e) ? -1 : t === r || t.ownerDocument === H && V(H, t) ? 1 : A ? ee(A, e) - ee(A, t) : 0 : 4 & n ? -1 : 1)
                } : function(e, t) {
                    if (e === t) return O = !0, 0;
                    var n, i = 0,
                        o = e.parentNode,
                        s = t.parentNode,
                        u = [e],
                        l = [t];
                    if (!o || !s) return e === r ? -1 : t === r ? 1 : o ? -1 : s ? 1 : A ? ee(A, e) - ee(A, t) : 0;
                    if (o === s) return a(e, t);
                    for (n = e; n = n.parentNode;) u.unshift(n);
                    for (n = t; n = n.parentNode;) l.unshift(n);
                    for (; u[i] === l[i];) i++;
                    return i ? a(u[i], l[i]) : u[i] === H ? -1 : l[i] === H ? 1 : 0
                }, r) : j
            }, t.matches = function(e, n) {
                return t(e, null, null, n)
            }, t.matchesSelector = function(e, n) {
                if ((e.ownerDocument || e) !== j && M(e), n = n.replace(fe, "='$1']"), !(!w.matchesSelector || !P || I && I.test(n) || L && L.test(n))) try {
                    var r = q.call(e, n);
                    if (r || w.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
                } catch (i) {}
                return t(n, j, null, [e]).length > 0
            }, t.contains = function(e, t) {
                return (e.ownerDocument || e) !== j && M(e), V(e, t)
            }, t.attr = function(e, t) {
                (e.ownerDocument || e) !== j && M(e);
                var n = x.attrHandle[t.toLowerCase()],
                    r = n && G.call(x.attrHandle, t.toLowerCase()) ? n(e, t, !P) : void 0;

                return void 0 !== r ? r : w.attributes || !P ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }, t.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, t.uniqueSort = function(e) {
                var t, n = [],
                    r = 0,
                    i = 0;
                if (O = !w.detectDuplicates, A = !w.sortStable && e.slice(0), e.sort(W), O) {
                    for (; t = e[i++];) t === e[i] && (r = n.push(i));
                    for (; r--;) e.splice(n[r], 1)
                }
                return A = null, e
            }, C = t.getText = function(e) {
                var t, n = "",
                    r = 0,
                    i = e.nodeType;
                if (i) {
                    if (1 === i || 9 === i || 11 === i) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += C(e)
                    } else if (3 === i || 4 === i) return e.nodeValue
                } else
                    for (; t = e[r++];) n += C(t);
                return n
            }, x = t.selectors = {
                cacheLength: 50,
                createPseudo: r,
                match: he,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(we, xe), e[3] = (e[3] || e[4] || e[5] || "").replace(we, xe), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, n = !e[6] && e[2];
                        return he.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && pe.test(n) && (t = S(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(we, xe).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = U[e + " "];
                        return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && U(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(e, n, r) {
                        return function(i) {
                            var o = t.attr(i, e);
                            return null == o ? "!=" === n : n ? (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(se, " ") + " ").indexOf(r) > -1 : "|=" === n ? o === r || o.slice(0, r.length + 1) === r + "-" : !1) : !0
                        }
                    },
                    CHILD: function(e, t, n, r, i) {
                        var o = "nth" !== e.slice(0, 3),
                            a = "last" !== e.slice(-4),
                            s = "of-type" === t;
                        return 1 === r && 0 === i ? function(e) {
                            return !!e.parentNode
                        } : function(t, n, u) {
                            var l, c, f, p, d, h, m = o !== a ? "nextSibling" : "previousSibling",
                                g = t.parentNode,
                                v = s && t.nodeName.toLowerCase(),
                                $ = !u && !s;
                            if (g) {
                                if (o) {
                                    for (; m;) {
                                        for (f = t; f = f[m];)
                                            if (s ? f.nodeName.toLowerCase() === v : 1 === f.nodeType) return !1;
                                        h = m = "only" === e && !h && "nextSibling"
                                    }
                                    return !0
                                }
                                if (h = [a ? g.firstChild : g.lastChild], a && $) {
                                    for (c = g[F] || (g[F] = {}), l = c[e] || [], d = l[0] === R && l[1], p = l[0] === R && l[2], f = d && g.childNodes[d]; f = ++d && f && f[m] || (p = d = 0) || h.pop();)
                                        if (1 === f.nodeType && ++p && f === t) {
                                            c[e] = [R, d, p];
                                            break
                                        }
                                } else if ($ && (l = (t[F] || (t[F] = {}))[e]) && l[0] === R) p = l[1];
                                else
                                    for (;
                                        (f = ++d && f && f[m] || (p = d = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++p || ($ && ((f[F] || (f[F] = {}))[e] = [R, p]), f !== t)););
                                return p -= i, p === r || p % r === 0 && p / r >= 0
                            }
                        }
                    },
                    PSEUDO: function(e, n) {
                        var i, o = x.pseudos[e] || x.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                        return o[F] ? o(n) : o.length > 1 ? (i = [e, e, "", n], x.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
                            for (var r, i = o(e, n), a = i.length; a--;) r = ee(e, i[a]), e[r] = !(t[r] = i[a])
                        }) : function(e) {
                            return o(e, 0, i)
                        }) : o
                    }
                },
                pseudos: {
                    not: r(function(e) {
                        var t = [],
                            n = [],
                            i = E(e.replace(ue, "$1"));
                        return i[F] ? r(function(e, t, n, r) {
                            for (var o, a = i(e, null, r, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                        }) : function(e, r, o) {
                            return t[0] = e, i(t, null, o, n), t[0] = null, !n.pop()
                        }
                    }),
                    has: r(function(e) {
                        return function(n) {
                            return t(e, n).length > 0
                        }
                    }),
                    contains: r(function(e) {
                        return e = e.replace(we, xe),
                            function(t) {
                                return (t.textContent || t.innerText || C(t)).indexOf(e) > -1
                            }
                    }),
                    lang: r(function(e) {
                        return de.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(we, xe).toLowerCase(),
                            function(t) {
                                var n;
                                do
                                    if (n = P ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
                                while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                    }),
                    target: function(t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    },
                    root: function(e) {
                        return e === N
                    },
                    focus: function(e) {
                        return e === j.activeElement && (!j.hasFocus || j.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: function(e) {
                        return e.disabled === !1
                    },
                    disabled: function(e) {
                        return e.disabled === !0
                    },
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !x.pseudos.empty(e)
                    },
                    header: function(e) {
                        return ge.test(e.nodeName)
                    },
                    input: function(e) {
                        return me.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function(e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                    },
                    first: l(function() {
                        return [0]
                    }),
                    last: l(function(e, t) {
                        return [t - 1]
                    }),
                    eq: l(function(e, t, n) {
                        return [0 > n ? n + t : n]
                    }),
                    even: l(function(e, t) {
                        for (var n = 0; t > n; n += 2) e.push(n);
                        return e
                    }),
                    odd: l(function(e, t) {
                        for (var n = 1; t > n; n += 2) e.push(n);
                        return e
                    }),
                    lt: l(function(e, t, n) {
                        for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
                        return e
                    }),
                    gt: l(function(e, t, n) {
                        for (var r = 0 > n ? n + t : n; ++r < t;) e.push(r);
                        return e
                    })
                }
            }, x.pseudos.nth = x.pseudos.eq;
            for (b in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) x.pseudos[b] = s(b);
            for (b in {
                    submit: !0,
                    reset: !0
                }) x.pseudos[b] = u(b);
            return f.prototype = x.filters = x.pseudos, x.setFilters = new f, S = t.tokenize = function(e, n) {
                var r, i, o, a, s, u, l, c = B[e + " "];
                if (c) return n ? 0 : c.slice(0);
                for (s = e, u = [], l = x.preFilter; s;) {
                    (!r || (i = le.exec(s))) && (i && (s = s.slice(i[0].length) || s), u.push(o = [])), r = !1, (i = ce.exec(s)) && (r = i.shift(), o.push({
                        value: r,
                        type: i[0].replace(ue, " ")
                    }), s = s.slice(r.length));
                    for (a in x.filter) !(i = he[a].exec(s)) || l[a] && !(i = l[a](i)) || (r = i.shift(), o.push({
                        value: r,
                        type: a,
                        matches: i
                    }), s = s.slice(r.length));
                    if (!r) break
                }
                return n ? s.length : s ? t.error(e) : B(e, u).slice(0)
            }, E = t.compile = function(e, t) {
                var n, r = [],
                    i = [],
                    o = z[e + " "];
                if (!o) {
                    for (t || (t = S(e)), n = t.length; n--;) o = $(t[n]), o[F] ? r.push(o) : i.push(o);
                    o = z(e, y(i, r)), o.selector = e
                }
                return o
            }, T = t.select = function(e, t, n, r) {
                var i, o, a, s, u, l = "function" == typeof e && e,
                    f = !r && S(e = l.selector || e);
                if (n = n || [], 1 === f.length) {
                    if (o = f[0] = f[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && w.getById && 9 === t.nodeType && P && x.relative[o[1].type]) {
                        if (t = (x.find.ID(a.matches[0].replace(we, xe), t) || [])[0], !t) return n;
                        l && (t = t.parentNode), e = e.slice(o.shift().value.length)
                    }
                    for (i = he.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !x.relative[s = a.type]);)
                        if ((u = x.find[s]) && (r = u(a.matches[0].replace(we, xe), ye.test(o[0].type) && c(t.parentNode) || t))) {
                            if (o.splice(i, 1), e = r.length && p(o), !e) return Z.apply(n, r), n;
                            break
                        }
                }
                return (l || E(e, f))(r, t, !P, n, ye.test(e) && c(t.parentNode) || t), n
            }, w.sortStable = F.split("").sort(W).join("") === F, w.detectDuplicates = !!O, M(), w.sortDetached = i(function(e) {
                return 1 & e.compareDocumentPosition(j.createElement("div"))
            }), i(function(e) {
                return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
            }) || o("type|href|height|width", function(e, t, n) {
                return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }), w.attributes && i(function(e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
            }) || o("value", function(e, t, n) {
                return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
            }), i(function(e) {
                return null == e.getAttribute("disabled")
            }) || o(te, function(e, t, n) {
                var r;
                return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }), t
        }(e);
        Q.find = ie, Q.expr = ie.selectors, Q.expr[":"] = Q.expr.pseudos, Q.unique = ie.uniqueSort, Q.text = ie.getText, Q.isXMLDoc = ie.isXML, Q.contains = ie.contains;
        var oe = Q.expr.match.needsContext,
            ae = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            se = /^.[^:#\[\.,]*$/;
        Q.filter = function(e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? Q.find.matchesSelector(r, e) ? [r] : [] : Q.find.matches(e, Q.grep(t, function(e) {
                return 1 === e.nodeType
            }))
        }, Q.fn.extend({
            find: function(e) {
                var t, n = this.length,
                    r = [],
                    i = this;
                if ("string" != typeof e) return this.pushStack(Q(e).filter(function() {
                    for (t = 0; n > t; t++)
                        if (Q.contains(i[t], this)) return !0
                }));
                for (t = 0; n > t; t++) Q.find(e, i[t], r);
                return r = this.pushStack(n > 1 ? Q.unique(r) : r), r.selector = this.selector ? this.selector + " " + e : e, r
            },
            filter: function(e) {
                return this.pushStack(r(this, e || [], !1))
            },
            not: function(e) {
                return this.pushStack(r(this, e || [], !0))
            },
            is: function(e) {
                return !!r(this, "string" == typeof e && oe.test(e) ? Q(e) : e || [], !1).length
            }
        });
        var ue, le = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            ce = Q.fn.init = function(e, t) {
                var n, r;
                if (!e) return this;
                if ("string" == typeof e) {
                    if (n = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : le.exec(e), !n || !n[1] && t) return !t || t.jquery ? (t || ue).find(e) : this.constructor(t).find(e);
                    if (n[1]) {
                        if (t = t instanceof Q ? t[0] : t, Q.merge(this, Q.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : X, !0)), ae.test(n[1]) && Q.isPlainObject(t))
                            for (n in t) Q.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                        return this
                    }
                    return r = X.getElementById(n[2]), r && r.parentNode && (this.length = 1, this[0] = r), this.context = X, this.selector = e, this
                }
                return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : Q.isFunction(e) ? "undefined" != typeof ue.ready ? ue.ready(e) : e(Q) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), Q.makeArray(e, this))
            };
        ce.prototype = Q.fn, ue = Q(X);
        var fe = /^(?:parents|prev(?:Until|All))/,
            pe = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        Q.extend({
            dir: function(e, t, n) {
                for (var r = [], i = void 0 !== n;
                    (e = e[t]) && 9 !== e.nodeType;)
                    if (1 === e.nodeType) {
                        if (i && Q(e).is(n)) break;
                        r.push(e)
                    }
                return r
            },
            sibling: function(e, t) {
                for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                return n
            }
        }), Q.fn.extend({
            has: function(e) {
                var t = Q(e, this),
                    n = t.length;
                return this.filter(function() {
                    for (var e = 0; n > e; e++)
                        if (Q.contains(this, t[e])) return !0
                })
            },
            closest: function(e, t) {
                for (var n, r = 0, i = this.length, o = [], a = oe.test(e) || "string" != typeof e ? Q(e, t || this.context) : 0; i > r; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && Q.find.matchesSelector(n, e))) {
                            o.push(n);
                            break
                        }
                return this.pushStack(o.length > 1 ? Q.unique(o) : o)
            },
            index: function(e) {
                return e ? "string" == typeof e ? W.call(Q(e), this[0]) : W.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                return this.pushStack(Q.unique(Q.merge(this.get(), Q(e, t))))
            },
            addBack: function(e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }), Q.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function(e) {
                return Q.dir(e, "parentNode")
            },
            parentsUntil: function(e, t, n) {
                return Q.dir(e, "parentNode", n)
            },
            next: function(e) {
                return i(e, "nextSibling")
            },
            prev: function(e) {
                return i(e, "previousSibling")
            },
            nextAll: function(e) {
                return Q.dir(e, "nextSibling")
            },
            prevAll: function(e) {
                return Q.dir(e, "previousSibling")
            },
            nextUntil: function(e, t, n) {
                return Q.dir(e, "nextSibling", n)
            },
            prevUntil: function(e, t, n) {
                return Q.dir(e, "previousSibling", n)
            },
            siblings: function(e) {
                return Q.sibling((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return Q.sibling(e.firstChild)
            },
            contents: function(e) {
                return e.contentDocument || Q.merge([], e.childNodes)
            }
        }, function(e, t) {
            Q.fn[e] = function(n, r) {
                var i = Q.map(this, t, n);
                return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = Q.filter(r, i)), this.length > 1 && (pe[e] || Q.unique(i), fe.test(e) && i.reverse()), this.pushStack(i)
            }
        });
        var de = /\S+/g,
            he = {};
        Q.Callbacks = function(e) {
            e = "string" == typeof e ? he[e] || o(e) : Q.extend({}, e);
            var t, n, r, i, a, s, u = [],
                l = !e.once && [],
                c = function(o) {
                    for (t = e.memory && o, n = !0, s = i || 0, i = 0, a = u.length, r = !0; u && a > s; s++)
                        if (u[s].apply(o[0], o[1]) === !1 && e.stopOnFalse) {
                            t = !1;
                            break
                        }
                    r = !1, u && (l ? l.length && c(l.shift()) : t ? u = [] : f.disable())
                },
                f = {
                    add: function() {
                        if (u) {
                            var n = u.length;
                            ! function o(t) {
                                Q.each(t, function(t, n) {
                                    var r = Q.type(n);
                                    "function" === r ? e.unique && f.has(n) || u.push(n) : n && n.length && "string" !== r && o(n)
                                })
                            }(arguments), r ? a = u.length : t && (i = n, c(t))
                        }
                        return this
                    },
                    remove: function() {
                        return u && Q.each(arguments, function(e, t) {
                            for (var n;
                                (n = Q.inArray(t, u, n)) > -1;) u.splice(n, 1), r && (a >= n && a--, s >= n && s--)
                        }), this
                    },
                    has: function(e) {
                        return e ? Q.inArray(e, u) > -1 : !(!u || !u.length)
                    },
                    empty: function() {
                        return u = [], a = 0, this
                    },
                    disable: function() {
                        return u = l = t = void 0, this
                    },
                    disabled: function() {
                        return !u
                    },
                    lock: function() {
                        return l = void 0, t || f.disable(), this
                    },
                    locked: function() {
                        return !l
                    },
                    fireWith: function(e, t) {
                        return !u || n && !l || (t = t || [], t = [e, t.slice ? t.slice() : t], r ? l.push(t) : c(t)), this
                    },
                    fire: function() {
                        return f.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!n
                    }
                };
            return f
        }, Q.extend({
            Deferred: function(e) {
                var t = [
                        ["resolve", "done", Q.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", Q.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", Q.Callbacks("memory")]
                    ],
                    n = "pending",
                    r = {
                        state: function() {
                            return n
                        },
                        always: function() {
                            return i.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var e = arguments;
                            return Q.Deferred(function(n) {
                                Q.each(t, function(t, o) {
                                    var a = Q.isFunction(e[t]) && e[t];
                                    i[o[1]](function() {
                                        var e = a && a.apply(this, arguments);
                                        e && Q.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                                    })
                                }), e = null
                            }).promise()
                        },
                        promise: function(e) {
                            return null != e ? Q.extend(e, r) : r
                        }
                    },
                    i = {};
                return r.pipe = r.then, Q.each(t, function(e, o) {
                    var a = o[2],
                        s = o[3];
                    r[o[1]] = a.add, s && a.add(function() {
                        n = s
                    }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function() {
                        return i[o[0] + "With"](this === i ? r : this, arguments), this
                    }, i[o[0] + "With"] = a.fireWith
                }), r.promise(i), e && e.call(i, i), i
            },
            when: function(e) {
                var t, n, r, i = 0,
                    o = U.call(arguments),
                    a = o.length,
                    s = 1 !== a || e && Q.isFunction(e.promise) ? a : 0,
                    u = 1 === s ? e : Q.Deferred(),
                    l = function(e, n, r) {
                        return function(i) {
                            n[e] = this, r[e] = arguments.length > 1 ? U.call(arguments) : i, r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r)
                        }
                    };
                if (a > 1)
                    for (t = new Array(a), n = new Array(a), r = new Array(a); a > i; i++) o[i] && Q.isFunction(o[i].promise) ? o[i].promise().done(l(i, r, o)).fail(u.reject).progress(l(i, n, t)) : --s;
                return s || u.resolveWith(r, o), u.promise()
            }
        });
        var me;
        Q.fn.ready = function(e) {
            return Q.ready.promise().done(e), this
        }, Q.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(e) {
                e ? Q.readyWait++ : Q.ready(!0)
            },
            ready: function(e) {
                (e === !0 ? --Q.readyWait : Q.isReady) || (Q.isReady = !0, e !== !0 && --Q.readyWait > 0 || (me.resolveWith(X, [Q]), Q.fn.triggerHandler && (Q(X).triggerHandler("ready"), Q(X).off("ready"))))
            }
        }), Q.ready.promise = function(t) {
            return me || (me = Q.Deferred(), "complete" === X.readyState ? setTimeout(Q.ready) : (X.addEventListener("DOMContentLoaded", a, !1), e.addEventListener("load", a, !1))), me.promise(t)
        }, Q.ready.promise();
        var ge = Q.access = function(e, t, n, r, i, o, a) {
            var s = 0,
                u = e.length,
                l = null == n;
            if ("object" === Q.type(n)) {
                i = !0;
                for (s in n) Q.access(e, t, s, n[s], !0, o, a)
            } else if (void 0 !== r && (i = !0, Q.isFunction(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function(e, t, n) {
                    return l.call(Q(e), n)
                })), t))
                for (; u > s; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
            return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
        };
        Q.acceptData = function(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        }, s.uid = 1, s.accepts = Q.acceptData, s.prototype = {
            key: function(e) {
                if (!s.accepts(e)) return 0;
                var t = {},
                    n = e[this.expando];
                if (!n) {
                    n = s.uid++;
                    try {
                        t[this.expando] = {
                            value: n
                        }, Object.defineProperties(e, t)
                    } catch (r) {
                        t[this.expando] = n, Q.extend(e, t)
                    }
                }
                return this.cache[n] || (this.cache[n] = {}), n
            },
            set: function(e, t, n) {
                var r, i = this.key(e),
                    o = this.cache[i];
                if ("string" == typeof t) o[t] = n;
                else if (Q.isEmptyObject(o)) Q.extend(this.cache[i], t);
                else
                    for (r in t) o[r] = t[r];
                return o
            },
            get: function(e, t) {
                var n = this.cache[this.key(e)];
                return void 0 === t ? n : n[t]
            },
            access: function(e, t, n) {
                var r;
                return void 0 === t || t && "string" == typeof t && void 0 === n ? (r = this.get(e, t), void 0 !== r ? r : this.get(e, Q.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t)
            },
            remove: function(e, t) {
                var n, r, i, o = this.key(e),
                    a = this.cache[o];
                if (void 0 === t) this.cache[o] = {};
                else {
                    Q.isArray(t) ? r = t.concat(t.map(Q.camelCase)) : (i = Q.camelCase(t), t in a ? r = [t, i] : (r = i, r = r in a ? [r] : r.match(de) || [])), n = r.length;
                    for (; n--;) delete a[r[n]]
                }
            },
            hasData: function(e) {
                return !Q.isEmptyObject(this.cache[e[this.expando]] || {})
            },
            discard: function(e) {
                e[this.expando] && delete this.cache[e[this.expando]]
            }
        };
        var ve = new s,
            $e = new s,
            ye = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            be = /([A-Z])/g;
        Q.extend({
            hasData: function(e) {
                return $e.hasData(e) || ve.hasData(e)
            },
            data: function(e, t, n) {
                return $e.access(e, t, n)
            },
            removeData: function(e, t) {
                $e.remove(e, t)
            },
            _data: function(e, t, n) {
                return ve.access(e, t, n)
            },
            _removeData: function(e, t) {
                ve.remove(e, t)
            }
        }), Q.fn.extend({
            data: function(e, t) {
                var n, r, i, o = this[0],
                    a = o && o.attributes;
                if (void 0 === e) {
                    if (this.length && (i = $e.get(o), 1 === o.nodeType && !ve.get(o, "hasDataAttrs"))) {
                        for (n = a.length; n--;) a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = Q.camelCase(r.slice(5)), u(o, r, i[r])));
                        ve.set(o, "hasDataAttrs", !0)
                    }
                    return i
                }
                return "object" == typeof e ? this.each(function() {
                    $e.set(this, e)
                }) : ge(this, function(t) {
                    var n, r = Q.camelCase(e);
                    if (o && void 0 === t) {
                        if (n = $e.get(o, e), void 0 !== n) return n;
                        if (n = $e.get(o, r), void 0 !== n) return n;
                        if (n = u(o, r, void 0), void 0 !== n) return n
                    } else this.each(function() {
                        var n = $e.get(this, r);
                        $e.set(this, r, t), -1 !== e.indexOf("-") && void 0 !== n && $e.set(this, e, t)
                    })
                }, null, t, arguments.length > 1, null, !0)
            },
            removeData: function(e) {
                return this.each(function() {
                    $e.remove(this, e)
                })
            }
        }), Q.extend({
            queue: function(e, t, n) {
                var r;
                return e ? (t = (t || "fx") + "queue", r = ve.get(e, t), n && (!r || Q.isArray(n) ? r = ve.access(e, t, Q.makeArray(n)) : r.push(n)), r || []) : void 0
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = Q.queue(e, t),
                    r = n.length,
                    i = n.shift(),
                    o = Q._queueHooks(e, t),
                    a = function() {
                        Q.dequeue(e, t)
                    };
                "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return ve.get(e, n) || ve.access(e, n, {
                    empty: Q.Callbacks("once memory").add(function() {
                        ve.remove(e, [t + "queue", n])
                    })
                })
            }
        }), Q.fn.extend({
            queue: function(e, t) {
                var n = 2;
                return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? Q.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                    var n = Q.queue(this, e, t);
                    Q._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && Q.dequeue(this, e)
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    Q.dequeue(this, e)
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, t) {
                var n, r = 1,
                    i = Q.Deferred(),
                    o = this,
                    a = this.length,
                    s = function() {
                        --r || i.resolveWith(o, [o])
                    };
                for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) n = ve.get(o[a], e + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
                return s(), i.promise(t)
            }
        });
        var we = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            xe = ["Top", "Right", "Bottom", "Left"],
            Ce = function(e, t) {
                return e = t || e, "none" === Q.css(e, "display") || !Q.contains(e.ownerDocument, e)
            },
            ke = /^(?:checkbox|radio)$/i;
        ! function() {
            var e = X.createDocumentFragment(),
                t = e.appendChild(X.createElement("div")),
                n = X.createElement("input");
            n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), J.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", J.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
        }();
        var Se = "undefined";
        J.focusinBubbles = "onfocusin" in e;
        var Ee = /^key/,
            Te = /^(?:mouse|pointer|contextmenu)|click/,
            De = /^(?:focusinfocus|focusoutblur)$/,
            Ae = /^([^.]*)(?:\.(.+)|)$/;
        Q.event = {
            global: {},
            add: function(e, t, n, r, i) {
                var o, a, s, u, l, c, f, p, d, h, m, g = ve.get(e);
                if (g)
                    for (n.handler && (o = n, n = o.handler, i = o.selector), n.guid || (n.guid = Q.guid++), (u = g.events) || (u = g.events = {}), (a = g.handle) || (a = g.handle = function(t) {
                            return typeof Q !== Se && Q.event.triggered !== t.type ? Q.event.dispatch.apply(e, arguments) : void 0
                        }), t = (t || "").match(de) || [""], l = t.length; l--;) s = Ae.exec(t[l]) || [], d = m = s[1], h = (s[2] || "").split(".").sort(), d && (f = Q.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = Q.event.special[d] || {}, c = Q.extend({
                        type: d,
                        origType: m,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: i,
                        needsContext: i && Q.expr.match.needsContext.test(i),
                        namespace: h.join(".")
                    }, o), (p = u[d]) || (p = u[d] = [], p.delegateCount = 0, f.setup && f.setup.call(e, r, h, a) !== !1 || e.addEventListener && e.addEventListener(d, a, !1)), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), Q.event.global[d] = !0)
            },
            remove: function(e, t, n, r, i) {
                var o, a, s, u, l, c, f, p, d, h, m, g = ve.hasData(e) && ve.get(e);
                if (g && (u = g.events)) {
                    for (t = (t || "").match(de) || [""], l = t.length; l--;)
                        if (s = Ae.exec(t[l]) || [], d = m = s[1], h = (s[2] || "").split(".").sort(), d) {
                            for (f = Q.event.special[d] || {}, d = (r ? f.delegateType : f.bindType) || d, p = u[d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length; o--;) c = p[o], !i && m !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
                            a && !p.length && (f.teardown && f.teardown.call(e, h, g.handle) !== !1 || Q.removeEvent(e, d, g.handle), delete u[d])
                        } else
                            for (d in u) Q.event.remove(e, d + t[l], n, r, !0);
                    Q.isEmptyObject(u) && (delete g.handle, ve.remove(e, "events"))
                }
            },
            trigger: function(t, n, r, i) {
                var o, a, s, u, l, c, f, p = [r || X],
                    d = K.call(t, "type") ? t.type : t,
                    h = K.call(t, "namespace") ? t.namespace.split(".") : [];
                if (a = s = r = r || X, 3 !== r.nodeType && 8 !== r.nodeType && !De.test(d + Q.event.triggered) && (d.indexOf(".") >= 0 && (h = d.split("."), d = h.shift(), h.sort()), l = d.indexOf(":") < 0 && "on" + d, t = t[Q.expando] ? t : new Q.Event(d, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = h.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : Q.makeArray(n, [t]), f = Q.event.special[d] || {}, i || !f.trigger || f.trigger.apply(r, n) !== !1)) {
                    if (!i && !f.noBubble && !Q.isWindow(r)) {
                        for (u = f.delegateType || d, De.test(u + d) || (a = a.parentNode); a; a = a.parentNode) p.push(a), s = a;
                        s === (r.ownerDocument || X) && p.push(s.defaultView || s.parentWindow || e)
                    }
                    for (o = 0;
                        (a = p[o++]) && !t.isPropagationStopped();) t.type = o > 1 ? u : f.bindType || d, c = (ve.get(a, "events") || {})[t.type] && ve.get(a, "handle"), c && c.apply(a, n), c = l && a[l], c && c.apply && Q.acceptData(a) && (t.result = c.apply(a, n), t.result === !1 && t.preventDefault());
                    return t.type = d, i || t.isDefaultPrevented() || f._default && f._default.apply(p.pop(), n) !== !1 || !Q.acceptData(r) || l && Q.isFunction(r[d]) && !Q.isWindow(r) && (s = r[l], s && (r[l] = null), Q.event.triggered = d, r[d](), Q.event.triggered = void 0, s && (r[l] = s)), t.result
                }
            },
            dispatch: function(e) {
                e = Q.event.fix(e);
                var t, n, r, i, o, a = [],
                    s = U.call(arguments),
                    u = (ve.get(this, "events") || {})[e.type] || [],
                    l = Q.event.special[e.type] || {};
                if (s[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                    for (a = Q.event.handlers.call(this, e, u), t = 0;
                        (i = a[t++]) && !e.isPropagationStopped();)
                        for (e.currentTarget = i.elem, n = 0;
                            (o = i.handlers[n++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, e.data = o.data, r = ((Q.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s), void 0 !== r && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
                    return l.postDispatch && l.postDispatch.call(this, e), e.result
                }
            },
            handlers: function(e, t) {
                var n, r, i, o, a = [],
                    s = t.delegateCount,
                    u = e.target;
                if (s && u.nodeType && (!e.button || "click" !== e.type))
                    for (; u !== this; u = u.parentNode || this)
                        if (u.disabled !== !0 || "click" !== e.type) {
                            for (r = [], n = 0; s > n; n++) o = t[n], i = o.selector + " ", void 0 === r[i] && (r[i] = o.needsContext ? Q(i, this).index(u) >= 0 : Q.find(i, this, null, [u]).length), r[i] && r.push(o);
                            r.length && a.push({
                                elem: u,
                                handlers: r
                            })
                        }
                return s < t.length && a.push({
                    elem: this,
                    handlers: t.slice(s)
                }), a
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(e, t) {
                    return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(e, t) {
                    var n, r, i, o = t.button;
                    return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || X, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
                }
            },
            fix: function(e) {
                if (e[Q.expando]) return e;
                var t, n, r, i = e.type,
                    o = e,
                    a = this.fixHooks[i];
                for (a || (this.fixHooks[i] = a = Te.test(i) ? this.mouseHooks : Ee.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new Q.Event(o), t = r.length; t--;) n = r[t], e[n] = o[n];
                return e.target || (e.target = X), 3 === e.target.nodeType && (e.target = e.target.parentNode), a.filter ? a.filter(e, o) : e
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        return this !== f() && this.focus ? (this.focus(), !1) : void 0
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        return this === f() && this.blur ? (this.blur(), !1) : void 0
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        return "checkbox" === this.type && this.click && Q.nodeName(this, "input") ? (this.click(), !1) : void 0
                    },
                    _default: function(e) {
                        return Q.nodeName(e.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(e) {
                        void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            },
            simulate: function(e, t, n, r) {
                var i = Q.extend(new Q.Event, n, {
                    type: e,
                    isSimulated: !0,
                    originalEvent: {}
                });
                r ? Q.event.trigger(i, null, t) : Q.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
            }
        }, Q.removeEvent = function(e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n, !1)
        }, Q.Event = function(e, t) {
            return this instanceof Q.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? l : c) : this.type = e, t && Q.extend(this, t), this.timeStamp = e && e.timeStamp || Q.now(), void(this[Q.expando] = !0)) : new Q.Event(e, t)
        }, Q.Event.prototype = {
            isDefaultPrevented: c,
            isPropagationStopped: c,
            isImmediatePropagationStopped: c,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = l, e && e.preventDefault && e.preventDefault()
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = l, e && e.stopPropagation && e.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = l, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
            }
        }, Q.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(e, t) {
            Q.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(e) {
                    var n, r = this,
                        i = e.relatedTarget,
                        o = e.handleObj;
                    return (!i || i !== r && !Q.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
                }
            }
        }), J.focusinBubbles || Q.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            var n = function(e) {
                Q.event.simulate(t, e.target, Q.event.fix(e), !0)
            };
            Q.event.special[t] = {
                setup: function() {
                    var r = this.ownerDocument || this,
                        i = ve.access(r, t);
                    i || r.addEventListener(e, n, !0), ve.access(r, t, (i || 0) + 1)
                },
                teardown: function() {
                    var r = this.ownerDocument || this,
                        i = ve.access(r, t) - 1;
                    i ? ve.access(r, t, i) : (r.removeEventListener(e, n, !0), ve.remove(r, t))
                }
            }
        }), Q.fn.extend({
            on: function(e, t, n, r, i) {
                var o, a;
                if ("object" == typeof e) {
                    "string" != typeof t && (n = n || t, t = void 0);
                    for (a in e) this.on(a, t, n, e[a], i);
                    return this
                }
                if (null == n && null == r ? (r = t, n = t = void 0) : null == r && ("string" == typeof t ? (r = n, n = void 0) : (r = n, n = t, t = void 0)), r === !1) r = c;
                else if (!r) return this;
                return 1 === i && (o = r, r = function(e) {
                    return Q().off(e), o.apply(this, arguments)
                }, r.guid = o.guid || (o.guid = Q.guid++)), this.each(function() {
                    Q.event.add(this, e, r, n, t)
                })
            },
            one: function(e, t, n, r) {
                return this.on(e, t, n, r, 1)
            },
            off: function(e, t, n) {
                var r, i;
                if (e && e.preventDefault && e.handleObj) return r = e.handleObj, Q(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                if ("object" == typeof e) {
                    for (i in e) this.off(i, t, e[i]);
                    return this
                }
                return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = c), this.each(function() {
                    Q.event.remove(this, e, n, t)
                })
            },
            trigger: function(e, t) {
                return this.each(function() {
                    Q.event.trigger(e, t, this)
                })
            },
            triggerHandler: function(e, t) {
                var n = this[0];
                return n ? Q.event.trigger(e, t, n, !0) : void 0
            }
        });
        var Oe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            Me = /<([\w:]+)/,
            je = /<|&#?\w+;/,
            Ne = /<(?:script|style|link)/i,
            Pe = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Le = /^$|\/(?:java|ecma)script/i,
            Ie = /^true\/(.*)/,
            qe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            Ve = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        Ve.optgroup = Ve.option, Ve.tbody = Ve.tfoot = Ve.colgroup = Ve.caption = Ve.thead, Ve.th = Ve.td, Q.extend({
            clone: function(e, t, n) {
                var r, i, o, a, s = e.cloneNode(!0),
                    u = Q.contains(e.ownerDocument, e);
                if (!(J.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || Q.isXMLDoc(e)))
                    for (a = v(s), o = v(e), r = 0, i = o.length; i > r; r++) $(o[r], a[r]);
                if (t)
                    if (n)
                        for (o = o || v(e), a = a || v(s), r = 0, i = o.length; i > r; r++) g(o[r], a[r]);
                    else g(e, s);
                return a = v(s, "script"), a.length > 0 && m(a, !u && v(e, "script")), s
            },
            buildFragment: function(e, t, n, r) {
                for (var i, o, a, s, u, l, c = t.createDocumentFragment(), f = [], p = 0, d = e.length; d > p; p++)
                    if (i = e[p], i || 0 === i)
                        if ("object" === Q.type(i)) Q.merge(f, i.nodeType ? [i] : i);
                        else if (je.test(i)) {
                    for (o = o || c.appendChild(t.createElement("div")), a = (Me.exec(i) || ["", ""])[1].toLowerCase(), s = Ve[a] || Ve._default, o.innerHTML = s[1] + i.replace(Oe, "<$1></$2>") + s[2], l = s[0]; l--;) o = o.lastChild;
                    Q.merge(f, o.childNodes), o = c.firstChild, o.textContent = ""
                } else f.push(t.createTextNode(i));
                for (c.textContent = "", p = 0; i = f[p++];)
                    if ((!r || -1 === Q.inArray(i, r)) && (u = Q.contains(i.ownerDocument, i), o = v(c.appendChild(i), "script"), u && m(o), n))
                        for (l = 0; i = o[l++];) Le.test(i.type || "") && n.push(i);
                return c
            },
            cleanData: function(e) {
                for (var t, n, r, i, o = Q.event.special, a = 0; void 0 !== (n = e[a]); a++) {
                    if (Q.acceptData(n) && (i = n[ve.expando], i && (t = ve.cache[i]))) {
                        if (t.events)
                            for (r in t.events) o[r] ? Q.event.remove(n, r) : Q.removeEvent(n, r, t.handle);
                        ve.cache[i] && delete ve.cache[i]
                    }
                    delete $e.cache[n[$e.expando]]
                }
            }
        }), Q.fn.extend({
            text: function(e) {
                return ge(this, function(e) {
                    return void 0 === e ? Q.text(this) : this.empty().each(function() {
                        (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e)
                    })
                }, null, e, arguments.length)
            },
            append: function() {
                return this.domManip(arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = p(this, e);
                        t.appendChild(e)
                    }
                })
            },
            prepend: function() {
                return this.domManip(arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = p(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            },
            before: function() {
                return this.domManip(arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function() {
                return this.domManip(arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            remove: function(e, t) {
                for (var n, r = e ? Q.filter(e, this) : this, i = 0; null != (n = r[i]); i++) t || 1 !== n.nodeType || Q.cleanData(v(n)), n.parentNode && (t && Q.contains(n.ownerDocument, n) && m(v(n, "script")), n.parentNode.removeChild(n));
                return this
            },
            empty: function() {
                for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (Q.cleanData(v(e, !1)), e.textContent = "");
                return this
            },
            clone: function(e, t) {
                return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                    return Q.clone(this, e, t)
                })
            },
            html: function(e) {
                return ge(this, function(e) {
                    var t = this[0] || {},
                        n = 0,
                        r = this.length;
                    if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                    if ("string" == typeof e && !Ne.test(e) && !Ve[(Me.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = e.replace(Oe, "<$1></$2>");
                        try {
                            for (; r > n; n++) t = this[n] || {}, 1 === t.nodeType && (Q.cleanData(v(t, !1)), t.innerHTML = e);
                            t = 0
                        } catch (i) {}
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function() {
                var e = arguments[0];
                return this.domManip(arguments, function(t) {
                    e = this.parentNode, Q.cleanData(v(this)), e && e.replaceChild(t, this)
                }), e && (e.length || e.nodeType) ? this : this.remove()
            },
            detach: function(e) {
                return this.remove(e, !0)
            },
            domManip: function(e, t) {
                e = B.apply([], e);
                var n, r, i, o, a, s, u = 0,
                    l = this.length,
                    c = this,
                    f = l - 1,
                    p = e[0],
                    m = Q.isFunction(p);
                if (m || l > 1 && "string" == typeof p && !J.checkClone && Pe.test(p)) return this.each(function(n) {
                    var r = c.eq(n);
                    m && (e[0] = p.call(this, n, r.html())), r.domManip(e, t)
                });
                if (l && (n = Q.buildFragment(e, this[0].ownerDocument, !1, this),
                        r = n.firstChild, 1 === n.childNodes.length && (n = r), r)) {
                    for (i = Q.map(v(n, "script"), d), o = i.length; l > u; u++) a = n, u !== f && (a = Q.clone(a, !0, !0), o && Q.merge(i, v(a, "script"))), t.call(this[u], a, u);
                    if (o)
                        for (s = i[i.length - 1].ownerDocument, Q.map(i, h), u = 0; o > u; u++) a = i[u], Le.test(a.type || "") && !ve.access(a, "globalEval") && Q.contains(s, a) && (a.src ? Q._evalUrl && Q._evalUrl(a.src) : Q.globalEval(a.textContent.replace(qe, "")))
                }
                return this
            }
        }), Q.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, t) {
            Q.fn[e] = function(e) {
                for (var n, r = [], i = Q(e), o = i.length - 1, a = 0; o >= a; a++) n = a === o ? this : this.clone(!0), Q(i[a])[t](n), z.apply(r, n.get());
                return this.pushStack(r)
            }
        });
        var Fe, He = {},
            Re = /^margin/,
            _e = new RegExp("^(" + we + ")(?!px)[a-z%]+$", "i"),
            Ue = function(t) {
                return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null)
            };
        ! function() {
            function t() {
                a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", a.innerHTML = "", i.appendChild(o);
                var t = e.getComputedStyle(a, null);
                n = "1%" !== t.top, r = "4px" === t.width, i.removeChild(o)
            }
            var n, r, i = X.documentElement,
                o = X.createElement("div"),
                a = X.createElement("div");
            a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", J.clearCloneStyle = "content-box" === a.style.backgroundClip, o.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", o.appendChild(a), e.getComputedStyle && Q.extend(J, {
                pixelPosition: function() {
                    return t(), n
                },
                boxSizingReliable: function() {
                    return null == r && t(), r
                },
                reliableMarginRight: function() {
                    var t, n = a.appendChild(X.createElement("div"));
                    return n.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", a.style.width = "1px", i.appendChild(o), t = !parseFloat(e.getComputedStyle(n, null).marginRight), i.removeChild(o), a.removeChild(n), t
                }
            }))
        }(), Q.swap = function(e, t, n, r) {
            var i, o, a = {};
            for (o in t) a[o] = e.style[o], e.style[o] = t[o];
            i = n.apply(e, r || []);
            for (o in t) e.style[o] = a[o];
            return i
        };
        var Be = /^(none|table(?!-c[ea]).+)/,
            ze = new RegExp("^(" + we + ")(.*)$", "i"),
            We = new RegExp("^([+-])=(" + we + ")", "i"),
            Ye = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            Ge = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            Ke = ["Webkit", "O", "Moz", "ms"];
        Q.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var n = w(e, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": "cssFloat"
            },
            style: function(e, t, n, r) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var i, o, a, s = Q.camelCase(t),
                        u = e.style;
                    return t = Q.cssProps[s] || (Q.cssProps[s] = C(u, s)), a = Q.cssHooks[t] || Q.cssHooks[s], void 0 === n ? a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : u[t] : (o = typeof n, "string" === o && (i = We.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(Q.css(e, t)), o = "number"), null != n && n === n && ("number" !== o || Q.cssNumber[s] || (n += "px"), J.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u[t] = n)), void 0)
                }
            },
            css: function(e, t, n, r) {
                var i, o, a, s = Q.camelCase(t);
                return t = Q.cssProps[s] || (Q.cssProps[s] = C(e.style, s)), a = Q.cssHooks[t] || Q.cssHooks[s], a && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = w(e, t, r)), "normal" === i && t in Ge && (i = Ge[t]), "" === n || n ? (o = parseFloat(i), n === !0 || Q.isNumeric(o) ? o || 0 : i) : i
            }
        }), Q.each(["height", "width"], function(e, t) {
            Q.cssHooks[t] = {
                get: function(e, n, r) {
                    return n ? Be.test(Q.css(e, "display")) && 0 === e.offsetWidth ? Q.swap(e, Ye, function() {
                        return E(e, t, r)
                    }) : E(e, t, r) : void 0
                },
                set: function(e, n, r) {
                    var i = r && Ue(e);
                    return k(e, n, r ? S(e, t, r, "border-box" === Q.css(e, "boxSizing", !1, i), i) : 0)
                }
            }
        }), Q.cssHooks.marginRight = x(J.reliableMarginRight, function(e, t) {
            return t ? Q.swap(e, {
                display: "inline-block"
            }, w, [e, "marginRight"]) : void 0
        }), Q.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(e, t) {
            Q.cssHooks[e + t] = {
                expand: function(n) {
                    for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + xe[r] + t] = o[r] || o[r - 2] || o[0];
                    return i
                }
            }, Re.test(e) || (Q.cssHooks[e + t].set = k)
        }), Q.fn.extend({
            css: function(e, t) {
                return ge(this, function(e, t, n) {
                    var r, i, o = {},
                        a = 0;
                    if (Q.isArray(t)) {
                        for (r = Ue(e), i = t.length; i > a; a++) o[t[a]] = Q.css(e, t[a], !1, r);
                        return o
                    }
                    return void 0 !== n ? Q.style(e, t, n) : Q.css(e, t)
                }, e, t, arguments.length > 1)
            },
            show: function() {
                return T(this, !0)
            },
            hide: function() {
                return T(this)
            },
            toggle: function(e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                    Ce(this) ? Q(this).show() : Q(this).hide()
                })
            }
        }), Q.Tween = D, D.prototype = {
            constructor: D,
            init: function(e, t, n, r, i, o) {
                this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (Q.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var e = D.propHooks[this.prop];
                return e && e.get ? e.get(this) : D.propHooks._default.get(this)
            },
            run: function(e) {
                var t, n = D.propHooks[this.prop];
                return this.pos = t = this.options.duration ? Q.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : D.propHooks._default.set(this), this
            }
        }, D.prototype.init.prototype = D.prototype, D.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = Q.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
                },
                set: function(e) {
                    Q.fx.step[e.prop] ? Q.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[Q.cssProps[e.prop]] || Q.cssHooks[e.prop]) ? Q.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                }
            }
        }, D.propHooks.scrollTop = D.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        }, Q.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            }
        }, Q.fx = D.prototype.init, Q.fx.step = {};
        var Je, Xe, Ze = /^(?:toggle|show|hide)$/,
            Qe = new RegExp("^(?:([+-])=|)(" + we + ")([a-z%]*)$", "i"),
            et = /queueHooks$/,
            tt = [j],
            nt = {
                "*": [function(e, t) {
                    var n = this.createTween(e, t),
                        r = n.cur(),
                        i = Qe.exec(t),
                        o = i && i[3] || (Q.cssNumber[e] ? "" : "px"),
                        a = (Q.cssNumber[e] || "px" !== o && +r) && Qe.exec(Q.css(n.elem, e)),
                        s = 1,
                        u = 20;
                    if (a && a[3] !== o) {
                        o = o || a[3], i = i || [], a = +r || 1;
                        do s = s || ".5", a /= s, Q.style(n.elem, e, a + o); while (s !== (s = n.cur() / r) && 1 !== s && --u)
                    }
                    return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), n
                }]
            };
        Q.Animation = Q.extend(P, {
                tweener: function(e, t) {
                    Q.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                    for (var n, r = 0, i = e.length; i > r; r++) n = e[r], nt[n] = nt[n] || [], nt[n].unshift(t)
                },
                prefilter: function(e, t) {
                    t ? tt.unshift(e) : tt.push(e)
                }
            }), Q.speed = function(e, t, n) {
                var r = e && "object" == typeof e ? Q.extend({}, e) : {
                    complete: n || !n && t || Q.isFunction(e) && e,
                    duration: e,
                    easing: n && t || t && !Q.isFunction(t) && t
                };
                return r.duration = Q.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in Q.fx.speeds ? Q.fx.speeds[r.duration] : Q.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                    Q.isFunction(r.old) && r.old.call(this), r.queue && Q.dequeue(this, r.queue)
                }, r
            }, Q.fn.extend({
                fadeTo: function(e, t, n, r) {
                    return this.filter(Ce).css("opacity", 0).show().end().animate({
                        opacity: t
                    }, e, n, r)
                },
                animate: function(e, t, n, r) {
                    var i = Q.isEmptyObject(e),
                        o = Q.speed(t, n, r),
                        a = function() {
                            var t = P(this, Q.extend({}, e), o);
                            (i || ve.get(this, "finish")) && t.stop(!0)
                        };
                    return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
                },
                stop: function(e, t, n) {
                    var r = function(e) {
                        var t = e.stop;
                        delete e.stop, t(n)
                    };
                    return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                        var t = !0,
                            i = null != e && e + "queueHooks",
                            o = Q.timers,
                            a = ve.get(this);
                        if (i) a[i] && a[i].stop && r(a[i]);
                        else
                            for (i in a) a[i] && a[i].stop && et.test(i) && r(a[i]);
                        for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                        (t || !n) && Q.dequeue(this, e)
                    })
                },
                finish: function(e) {
                    return e !== !1 && (e = e || "fx"), this.each(function() {
                        var t, n = ve.get(this),
                            r = n[e + "queue"],
                            i = n[e + "queueHooks"],
                            o = Q.timers,
                            a = r ? r.length : 0;
                        for (n.finish = !0, Q.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                        for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                        delete n.finish
                    })
                }
            }), Q.each(["toggle", "show", "hide"], function(e, t) {
                var n = Q.fn[t];
                Q.fn[t] = function(e, r, i) {
                    return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(O(t, !0), e, r, i)
                }
            }), Q.each({
                slideDown: O("show"),
                slideUp: O("hide"),
                slideToggle: O("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(e, t) {
                Q.fn[e] = function(e, n, r) {
                    return this.animate(t, e, n, r)
                }
            }), Q.timers = [], Q.fx.tick = function() {
                var e, t = 0,
                    n = Q.timers;
                for (Je = Q.now(); t < n.length; t++) e = n[t], e() || n[t] !== e || n.splice(t--, 1);
                n.length || Q.fx.stop(), Je = void 0
            }, Q.fx.timer = function(e) {
                Q.timers.push(e), e() ? Q.fx.start() : Q.timers.pop()
            }, Q.fx.interval = 13, Q.fx.start = function() {
                Xe || (Xe = setInterval(Q.fx.tick, Q.fx.interval))
            }, Q.fx.stop = function() {
                clearInterval(Xe), Xe = null
            }, Q.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, Q.fn.delay = function(e, t) {
                return e = Q.fx ? Q.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                    var r = setTimeout(t, e);
                    n.stop = function() {
                        clearTimeout(r)
                    }
                })
            },
            function() {
                var e = X.createElement("input"),
                    t = X.createElement("select"),
                    n = t.appendChild(X.createElement("option"));
                e.type = "checkbox", J.checkOn = "" !== e.value, J.optSelected = n.selected, t.disabled = !0, J.optDisabled = !n.disabled, e = X.createElement("input"), e.value = "t", e.type = "radio", J.radioValue = "t" === e.value
            }();
        var rt, it, ot = Q.expr.attrHandle;
        Q.fn.extend({
            attr: function(e, t) {
                return ge(this, Q.attr, e, t, arguments.length > 1)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    Q.removeAttr(this, e)
                })
            }
        }), Q.extend({
            attr: function(e, t, n) {
                var r, i, o = e.nodeType;
                if (e && 3 !== o && 8 !== o && 2 !== o) return typeof e.getAttribute === Se ? Q.prop(e, t, n) : (1 === o && Q.isXMLDoc(e) || (t = t.toLowerCase(), r = Q.attrHooks[t] || (Q.expr.match.bool.test(t) ? it : rt)), void 0 === n ? r && "get" in r && null !== (i = r.get(e, t)) ? i : (i = Q.find.attr(e, t), null == i ? void 0 : i) : null !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : void Q.removeAttr(e, t))
            },
            removeAttr: function(e, t) {
                var n, r, i = 0,
                    o = t && t.match(de);
                if (o && 1 === e.nodeType)
                    for (; n = o[i++];) r = Q.propFix[n] || n, Q.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!J.radioValue && "radio" === t && Q.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t), n && (e.value = n), t
                        }
                    }
                }
            }
        }), it = {
            set: function(e, t, n) {
                return t === !1 ? Q.removeAttr(e, n) : e.setAttribute(n, n), n
            }
        }, Q.each(Q.expr.match.bool.source.match(/\w+/g), function(e, t) {
            var n = ot[t] || Q.find.attr;
            ot[t] = function(e, t, r) {
                var i, o;
                return r || (o = ot[t], ot[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, ot[t] = o), i
            }
        });
        var at = /^(?:input|select|textarea|button)$/i;
        Q.fn.extend({
            prop: function(e, t) {
                return ge(this, Q.prop, e, t, arguments.length > 1)
            },
            removeProp: function(e) {
                return this.each(function() {
                    delete this[Q.propFix[e] || e]
                })
            }
        }), Q.extend({
            propFix: {
                "for": "htmlFor",
                "class": "className"
            },
            prop: function(e, t, n) {
                var r, i, o, a = e.nodeType;
                if (e && 3 !== a && 8 !== a && 2 !== a) return o = 1 !== a || !Q.isXMLDoc(e), o && (t = Q.propFix[t] || t, i = Q.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        return e.hasAttribute("tabindex") || at.test(e.nodeName) || e.href ? e.tabIndex : -1
                    }
                }
            }
        }), J.optSelected || (Q.propHooks.selected = {
            get: function(e) {
                var t = e.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex, null
            }
        }), Q.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            Q.propFix[this.toLowerCase()] = this
        });
        var st = /[\t\r\n\f]/g;
        Q.fn.extend({
            addClass: function(e) {
                var t, n, r, i, o, a, s = "string" == typeof e && e,
                    u = 0,
                    l = this.length;
                if (Q.isFunction(e)) return this.each(function(t) {
                    Q(this).addClass(e.call(this, t, this.className))
                });
                if (s)
                    for (t = (e || "").match(de) || []; l > u; u++)
                        if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(st, " ") : " ")) {
                            for (o = 0; i = t[o++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                            a = Q.trim(r), n.className !== a && (n.className = a)
                        }
                return this
            },
            removeClass: function(e) {
                var t, n, r, i, o, a, s = 0 === arguments.length || "string" == typeof e && e,
                    u = 0,
                    l = this.length;
                if (Q.isFunction(e)) return this.each(function(t) {
                    Q(this).removeClass(e.call(this, t, this.className))
                });
                if (s)
                    for (t = (e || "").match(de) || []; l > u; u++)
                        if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(st, " ") : "")) {
                            for (o = 0; i = t[o++];)
                                for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
                            a = e ? Q.trim(r) : "", n.className !== a && (n.className = a)
                        }
                return this
            },
            toggleClass: function(e, t) {
                var n = typeof e;
                return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(Q.isFunction(e) ? function(n) {
                    Q(this).toggleClass(e.call(this, n, this.className, t), t)
                } : function() {
                    if ("string" === n)
                        for (var t, r = 0, i = Q(this), o = e.match(de) || []; t = o[r++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                    else(n === Se || "boolean" === n) && (this.className && ve.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ve.get(this, "__className__") || "")
                })
            },
            hasClass: function(e) {
                for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)
                    if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(st, " ").indexOf(t) >= 0) return !0;
                return !1
            }
        });
        var ut = /\r/g;
        Q.fn.extend({
            val: function(e) {
                var t, n, r, i = this[0]; {
                    if (arguments.length) return r = Q.isFunction(e), this.each(function(n) {
                        var i;
                        1 === this.nodeType && (i = r ? e.call(this, n, Q(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : Q.isArray(i) && (i = Q.map(i, function(e) {
                            return null == e ? "" : e + ""
                        })), t = Q.valHooks[this.type] || Q.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                    });
                    if (i) return t = Q.valHooks[i.type] || Q.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(ut, "") : null == n ? "" : n)
                }
            }
        }), Q.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = Q.find.attr(e, "value");
                        return null != t ? t : Q.trim(Q.text(e))
                    }
                },
                select: {
                    get: function(e) {
                        for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, u = 0 > i ? s : o ? i : 0; s > u; u++)
                            if (n = r[u], !(!n.selected && u !== i || (J.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && Q.nodeName(n.parentNode, "optgroup"))) {
                                if (t = Q(n).val(), o) return t;
                                a.push(t)
                            }
                        return a
                    },
                    set: function(e, t) {
                        for (var n, r, i = e.options, o = Q.makeArray(t), a = i.length; a--;) r = i[a], (r.selected = Q.inArray(r.value, o) >= 0) && (n = !0);
                        return n || (e.selectedIndex = -1), o
                    }
                }
            }
        }), Q.each(["radio", "checkbox"], function() {
            Q.valHooks[this] = {
                set: function(e, t) {
                    return Q.isArray(t) ? e.checked = Q.inArray(Q(e).val(), t) >= 0 : void 0
                }
            }, J.checkOn || (Q.valHooks[this].get = function(e) {
                return null === e.getAttribute("value") ? "on" : e.value
            })
        }), Q.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
            Q.fn[t] = function(e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }
        }), Q.fn.extend({
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            },
            bind: function(e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            delegate: function(e, t, n, r) {
                return this.on(t, e, n, r)
            },
            undelegate: function(e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            }
        });
        var lt = Q.now(),
            ct = /\?/;
        Q.parseJSON = function(e) {
            return JSON.parse(e + "")
        }, Q.parseXML = function(e) {
            var t, n;
            if (!e || "string" != typeof e) return null;
            try {
                n = new DOMParser, t = n.parseFromString(e, "text/xml")
            } catch (r) {
                t = void 0
            }
            return (!t || t.getElementsByTagName("parsererror").length) && Q.error("Invalid XML: " + e), t
        };
        var ft = /#.*$/,
            pt = /([?&])_=[^&]*/,
            dt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            ht = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            mt = /^(?:GET|HEAD)$/,
            gt = /^\/\//,
            vt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            $t = {},
            yt = {},
            bt = "*/".concat("*"),
            wt = e.location.href,
            xt = vt.exec(wt.toLowerCase()) || [];
        Q.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: wt,
                type: "GET",
                isLocal: ht.test(xt[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": bt,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": Q.parseJSON,
                    "text xml": Q.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(e, t) {
                return t ? q(q(e, Q.ajaxSettings), t) : q(Q.ajaxSettings, e)
            },
            ajaxPrefilter: L($t),
            ajaxTransport: L(yt),
            ajax: function(e, t) {
                function n(e, t, n, a) {
                    var u, c, v, $, b, x = t;
                    2 !== y && (y = 2, s && clearTimeout(s), r = void 0, o = a || "", w.readyState = e > 0 ? 4 : 0, u = e >= 200 && 300 > e || 304 === e, n && ($ = V(f, w, n)), $ = F(f, $, w, u), u ? (f.ifModified && (b = w.getResponseHeader("Last-Modified"), b && (Q.lastModified[i] = b), b = w.getResponseHeader("etag"), b && (Q.etag[i] = b)), 204 === e || "HEAD" === f.type ? x = "nocontent" : 304 === e ? x = "notmodified" : (x = $.state, c = $.data, v = $.error, u = !v)) : (v = x, (e || !x) && (x = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (t || x) + "", u ? h.resolveWith(p, [c, x, w]) : h.rejectWith(p, [w, x, v]), w.statusCode(g), g = void 0, l && d.trigger(u ? "ajaxSuccess" : "ajaxError", [w, f, u ? c : v]), m.fireWith(p, [w, x]), l && (d.trigger("ajaxComplete", [w, f]), --Q.active || Q.event.trigger("ajaxStop")))
                }
                "object" == typeof e && (t = e, e = void 0), t = t || {};
                var r, i, o, a, s, u, l, c, f = Q.ajaxSetup({}, t),
                    p = f.context || f,
                    d = f.context && (p.nodeType || p.jquery) ? Q(p) : Q.event,
                    h = Q.Deferred(),
                    m = Q.Callbacks("once memory"),
                    g = f.statusCode || {},
                    v = {},
                    $ = {},
                    y = 0,
                    b = "canceled",
                    w = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (2 === y) {
                                if (!a)
                                    for (a = {}; t = dt.exec(o);) a[t[1].toLowerCase()] = t[2];
                                t = a[e.toLowerCase()]
                            }
                            return null == t ? null : t
                        },
                        getAllResponseHeaders: function() {
                            return 2 === y ? o : null
                        },
                        setRequestHeader: function(e, t) {
                            var n = e.toLowerCase();
                            return y || (e = $[n] = $[n] || e, v[e] = t), this
                        },
                        overrideMimeType: function(e) {
                            return y || (f.mimeType = e), this
                        },
                        statusCode: function(e) {
                            var t;
                            if (e)
                                if (2 > y)
                                    for (t in e) g[t] = [g[t], e[t]];
                                else w.always(e[w.status]);
                            return this
                        },
                        abort: function(e) {
                            var t = e || b;
                            return r && r.abort(t), n(0, t), this
                        }
                    };
                if (h.promise(w).complete = m.add, w.success = w.done, w.error = w.fail, f.url = ((e || f.url || wt) + "").replace(ft, "").replace(gt, xt[1] + "//"), f.type = t.method || t.type || f.method || f.type, f.dataTypes = Q.trim(f.dataType || "*").toLowerCase().match(de) || [""], null == f.crossDomain && (u = vt.exec(f.url.toLowerCase()), f.crossDomain = !(!u || u[1] === xt[1] && u[2] === xt[2] && (u[3] || ("http:" === u[1] ? "80" : "443")) === (xt[3] || ("http:" === xt[1] ? "80" : "443")))), f.data && f.processData && "string" != typeof f.data && (f.data = Q.param(f.data, f.traditional)), I($t, f, t, w), 2 === y) return w;
                l = Q.event && f.global, l && 0 === Q.active++ && Q.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !mt.test(f.type), i = f.url, f.hasContent || (f.data && (i = f.url += (ct.test(i) ? "&" : "?") + f.data, delete f.data), f.cache === !1 && (f.url = pt.test(i) ? i.replace(pt, "$1_=" + lt++) : i + (ct.test(i) ? "&" : "?") + "_=" + lt++)), f.ifModified && (Q.lastModified[i] && w.setRequestHeader("If-Modified-Since", Q.lastModified[i]), Q.etag[i] && w.setRequestHeader("If-None-Match", Q.etag[i])), (f.data && f.hasContent && f.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", f.contentType), w.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + bt + "; q=0.01" : "") : f.accepts["*"]);
                for (c in f.headers) w.setRequestHeader(c, f.headers[c]);
                if (f.beforeSend && (f.beforeSend.call(p, w, f) === !1 || 2 === y)) return w.abort();
                b = "abort";
                for (c in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) w[c](f[c]);
                if (r = I(yt, f, t, w)) {
                    w.readyState = 1, l && d.trigger("ajaxSend", [w, f]), f.async && f.timeout > 0 && (s = setTimeout(function() {
                        w.abort("timeout")
                    }, f.timeout));
                    try {
                        y = 1, r.send(v, n)
                    } catch (x) {
                        if (!(2 > y)) throw x;
                        n(-1, x)
                    }
                } else n(-1, "No Transport");
                return w
            },
            getJSON: function(e, t, n) {
                return Q.get(e, t, n, "json")
            },
            getScript: function(e, t) {
                return Q.get(e, void 0, t, "script")
            }
        }), Q.each(["get", "post"], function(e, t) {
            Q[t] = function(e, n, r, i) {
                return Q.isFunction(n) && (i = i || r, r = n, n = void 0), Q.ajax({
                    url: e,
                    type: t,
                    dataType: i,
                    data: n,
                    success: r
                })
            }
        }), Q._evalUrl = function(e) {
            return Q.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }, Q.fn.extend({
            wrapAll: function(e) {
                var t;
                return Q.isFunction(e) ? this.each(function(t) {
                    Q(this).wrapAll(e.call(this, t))
                }) : (this[0] && (t = Q(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                    return e
                }).append(this)), this)
            },
            wrapInner: function(e) {
                return this.each(Q.isFunction(e) ? function(t) {
                    Q(this).wrapInner(e.call(this, t))
                } : function() {
                    var t = Q(this),
                        n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            },
            wrap: function(e) {
                var t = Q.isFunction(e);
                return this.each(function(n) {
                    Q(this).wrapAll(t ? e.call(this, n) : e)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    Q.nodeName(this, "body") || Q(this).replaceWith(this.childNodes)
                }).end()
            }
        }), Q.expr.filters.hidden = function(e) {
            return e.offsetWidth <= 0 && e.offsetHeight <= 0
        }, Q.expr.filters.visible = function(e) {
            return !Q.expr.filters.hidden(e)
        };
        var Ct = /%20/g,
            kt = /\[\]$/,
            St = /\r?\n/g,
            Et = /^(?:submit|button|image|reset|file)$/i,
            Tt = /^(?:input|select|textarea|keygen)/i;
        Q.param = function(e, t) {
            var n, r = [],
                i = function(e, t) {
                    t = Q.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                };
            if (void 0 === t && (t = Q.ajaxSettings && Q.ajaxSettings.traditional), Q.isArray(e) || e.jquery && !Q.isPlainObject(e)) Q.each(e, function() {
                i(this.name, this.value)
            });
            else
                for (n in e) H(n, e[n], t, i);
            return r.join("&").replace(Ct, "+")
        }, Q.fn.extend({
            serialize: function() {
                return Q.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var e = Q.prop(this, "elements");
                    return e ? Q.makeArray(e) : this
                }).filter(function() {
                    var e = this.type;
                    return this.name && !Q(this).is(":disabled") && Tt.test(this.nodeName) && !Et.test(e) && (this.checked || !ke.test(e))
                }).map(function(e, t) {
                    var n = Q(this).val();
                    return null == n ? null : Q.isArray(n) ? Q.map(n, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(St, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(St, "\r\n")
                    }
                }).get()
            }
        }), Q.ajaxSettings.xhr = function() {
            try {
                return new XMLHttpRequest
            } catch (e) {}
        };
        var Dt = 0,
            At = {},
            Ot = {
                0: 200,
                1223: 204
            },
            Mt = Q.ajaxSettings.xhr();
        e.attachEvent && e.attachEvent("onunload", function() {
            for (var e in At) At[e]()
        }), J.cors = !!Mt && "withCredentials" in Mt, J.ajax = Mt = !!Mt, Q.ajaxTransport(function(e) {
            var t;
            return J.cors || Mt && !e.crossDomain ? {
                send: function(n, r) {
                    var i, o = e.xhr(),
                        a = ++Dt;
                    if (o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                        for (i in e.xhrFields) o[i] = e.xhrFields[i];
                    e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                    for (i in n) o.setRequestHeader(i, n[i]);
                    t = function(e) {
                        return function() {
                            t && (delete At[a], t = o.onload = o.onerror = null, "abort" === e ? o.abort() : "error" === e ? r(o.status, o.statusText) : r(Ot[o.status] || o.status, o.statusText, "string" == typeof o.responseText ? {
                                text: o.responseText
                            } : void 0, o.getAllResponseHeaders()))
                        }
                    }, o.onload = t(), o.onerror = t("error"), t = At[a] = t("abort");
                    try {
                        o.send(e.hasContent && e.data || null)
                    } catch (s) {
                        if (t) throw s
                    }
                },
                abort: function() {
                    t && t()
                }
            } : void 0
        }), Q.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function(e) {
                    return Q.globalEval(e), e
                }
            }
        }), Q.ajaxPrefilter("script", function(e) {
            void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
        }), Q.ajaxTransport("script", function(e) {
            if (e.crossDomain) {
                var t, n;
                return {
                    send: function(r, i) {
                        t = Q("<script>").prop({
                            async: !0,
                            charset: e.scriptCharset,
                            src: e.url
                        }).on("load error", n = function(e) {
                            t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
                        }), X.head.appendChild(t[0])
                    },
                    abort: function() {
                        n && n()
                    }
                }
            }
        });
        var jt = [],
            Nt = /(=)\?(?=&|$)|\?\?/;
        Q.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = jt.pop() || Q.expando + "_" + lt++;
                return this[e] = !0, e
            }
        }), Q.ajaxPrefilter("json jsonp", function(t, n, r) {
            var i, o, a, s = t.jsonp !== !1 && (Nt.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && Nt.test(t.data) && "data");
            return s || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = Q.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Nt, "$1" + i) : t.jsonp !== !1 && (t.url += (ct.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
                return a || Q.error(i + " was not called"), a[0]
            }, t.dataTypes[0] = "json", o = e[i], e[i] = function() {
                a = arguments
            }, r.always(function() {
                e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, jt.push(i)), a && Q.isFunction(o) && o(a[0]), a = o = void 0
            }), "script") : void 0
        }), Q.parseHTML = function(e, t, n) {
            if (!e || "string" != typeof e) return null;
            "boolean" == typeof t && (n = t, t = !1), t = t || X;
            var r = ae.exec(e),
                i = !n && [];
            return r ? [t.createElement(r[1])] : (r = Q.buildFragment([e], t, i), i && i.length && Q(i).remove(), Q.merge([], r.childNodes))
        };
        var Pt = Q.fn.load;
        Q.fn.load = function(e, t, n) {
            if ("string" != typeof e && Pt) return Pt.apply(this, arguments);
            var r, i, o, a = this,
                s = e.indexOf(" ");
            return s >= 0 && (r = Q.trim(e.slice(s)), e = e.slice(0, s)), Q.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), a.length > 0 && Q.ajax({
                url: e,
                type: i,
                dataType: "html",
                data: t
            }).done(function(e) {
                o = arguments, a.html(r ? Q("<div>").append(Q.parseHTML(e)).find(r) : e)
            }).complete(n && function(e, t) {
                a.each(n, o || [e.responseText, t, e])
            }), this
        }, Q.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
            Q.fn[t] = function(e) {
                return this.on(t, e)
            }
        }), Q.expr.filters.animated = function(e) {
            return Q.grep(Q.timers, function(t) {
                return e === t.elem
            }).length
        };
        var Lt = e.document.documentElement;
        Q.offset = {
            setOffset: function(e, t, n) {
                var r, i, o, a, s, u, l, c = Q.css(e, "position"),
                    f = Q(e),
                    p = {};
                "static" === c && (e.style.position = "relative"), s = f.offset(), o = Q.css(e, "top"), u = Q.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1, l ? (r = f.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), Q.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (p.top = t.top - s.top + a), null != t.left && (p.left = t.left - s.left + i), "using" in t ? t.using.call(e, p) : f.css(p)
            }
        }, Q.fn.extend({
            offset: function(e) {
                if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                    Q.offset.setOffset(this, e, t)
                });
                var t, n, r = this[0],
                    i = {
                        top: 0,
                        left: 0
                    },
                    o = r && r.ownerDocument;
                if (o) return t = o.documentElement, Q.contains(t, r) ? (typeof r.getBoundingClientRect !== Se && (i = r.getBoundingClientRect()), n = R(o), {
                    top: i.top + n.pageYOffset - t.clientTop,
                    left: i.left + n.pageXOffset - t.clientLeft
                }) : i
            },
            position: function() {
                if (this[0]) {
                    var e, t, n = this[0],
                        r = {
                            top: 0,
                            left: 0
                        };
                    return "fixed" === Q.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), Q.nodeName(e[0], "html") || (r = e.offset()), r.top += Q.css(e[0], "borderTopWidth", !0), r.left += Q.css(e[0], "borderLeftWidth", !0)), {
                        top: t.top - r.top - Q.css(n, "marginTop", !0),
                        left: t.left - r.left - Q.css(n, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var e = this.offsetParent || Lt; e && !Q.nodeName(e, "html") && "static" === Q.css(e, "position");) e = e.offsetParent;
                    return e || Lt
                })
            }
        }), Q.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(t, n) {
            var r = "pageYOffset" === n;
            Q.fn[t] = function(i) {
                return ge(this, function(t, i, o) {
                    var a = R(t);
                    return void 0 === o ? a ? a[n] : t[i] : void(a ? a.scrollTo(r ? e.pageXOffset : o, r ? o : e.pageYOffset) : t[i] = o)
                }, t, i, arguments.length, null)
            }
        }), Q.each(["top", "left"], function(e, t) {
            Q.cssHooks[t] = x(J.pixelPosition, function(e, n) {
                return n ? (n = w(e, t), _e.test(n) ? Q(e).position()[t] + "px" : n) : void 0
            })
        }), Q.each({
            Height: "height",
            Width: "width"
        }, function(e, t) {
            Q.each({
                padding: "inner" + e,
                content: t,
                "": "outer" + e
            }, function(n, r) {
                Q.fn[r] = function(r, i) {
                    var o = arguments.length && (n || "boolean" != typeof r),
                        a = n || (r === !0 || i === !0 ? "margin" : "border");
                    return ge(this, function(t, n, r) {
                        var i;
                        return Q.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? Q.css(t, n, a) : Q.style(t, n, r, a)
                    }, t, o ? r : void 0, o, null)
                }
            })
        }), Q.fn.size = function() {
            return this.length
        }, Q.fn.andSelf = Q.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
            return Q
        });
        var It = e.jQuery,
            qt = e.$;
        return Q.noConflict = function(t) {
            return e.$ === Q && (e.$ = qt), t && e.jQuery === Q && (e.jQuery = It), Q
        }, typeof t === Se && (e.jQuery = e.$ = Q), Q
    }),
    function(e, t, n) {
        "use strict";

        function r(e, t) {
            return t = t || Error,
                function() {
                    var n, r, i = 2,
                        o = arguments,
                        a = o[0],
                        s = "[" + (e ? e + ":" : "") + a + "] ",
                        u = o[1];
                    for (s += u.replace(/\{\d+\}/g, function(e) {
                            var t = +e.slice(1, -1),
                                n = t + i;
                            return n < o.length ? ye(o[n]) : e
                        }), s += "\nhttp://errors.angularjs.org/1.4.3/" + (e ? e + "/" : "") + a, r = i, n = "?"; r < o.length; r++, n = "&") s += n + "p" + (r - i) + "=" + encodeURIComponent(ye(o[r]));
                    return new t(s)
                }
        }

        function i(e) {
            if (null == e || D(e)) return !1;
            var t = "length" in Object(e) && e.length;
            return e.nodeType === Yr && t ? !0 : C(e) || Vr(e) || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
        }

        function o(e, t, n) {
            var r, a;
            if (e)
                if (E(e))
                    for (r in e) "prototype" == r || "length" == r || "name" == r || e.hasOwnProperty && !e.hasOwnProperty(r) || t.call(n, e[r], r, e);
                else if (Vr(e) || i(e)) {
                var s = "object" != typeof e;
                for (r = 0, a = e.length; a > r; r++)(s || r in e) && t.call(n, e[r], r, e)
            } else if (e.forEach && e.forEach !== o) e.forEach(t, n, e);
            else if (x(e))
                for (r in e) t.call(n, e[r], r, e);
            else if ("function" == typeof e.hasOwnProperty)
                for (r in e) e.hasOwnProperty(r) && t.call(n, e[r], r, e);
            else
                for (r in e) wr.call(e, r) && t.call(n, e[r], r, e);
            return e
        }

        function a(e, t, n) {
            for (var r = Object.keys(e).sort(), i = 0; i < r.length; i++) t.call(n, e[r[i]], r[i]);
            return r
        }

        function s(e) {
            return function(t, n) {
                e(n, t)
            }
        }

        function u() {
            return ++Ir
        }

        function l(e, t) {
            t ? e.$$hashKey = t : delete e.$$hashKey
        }

        function c(e, t, n) {
            for (var r = e.$$hashKey, i = 0, o = t.length; o > i; ++i) {
                var a = t[i];
                if (w(a) || E(a))
                    for (var s = Object.keys(a), u = 0, f = s.length; f > u; u++) {
                        var p = s[u],
                            d = a[p];
                        n && w(d) ? S(d) ? e[p] = new Date(d.valueOf()) : (w(e[p]) || (e[p] = Vr(d) ? [] : {}), c(e[p], [d], !0)) : e[p] = d
                    }
            }
            return l(e, r), e
        }

        function f(e) {
            return c(e, Ar.call(arguments, 1), !1)
        }

        function p(e) {
            return c(e, Ar.call(arguments, 1), !0)
        }

        function d(e) {
            return parseInt(e, 10)
        }

        function h(e, t) {
            return f(Object.create(e), t)
        }

        function m() {}

        function g(e) {
            return e
        }

        function v(e) {
            return function() {
                return e
            }
        }

        function $(e) {
            return E(e.toString) && e.toString !== Object.prototype.toString
        }

        function y(e) {
            return "undefined" == typeof e
        }

        function b(e) {
            return "undefined" != typeof e
        }

        function w(e) {
            return null !== e && "object" == typeof e
        }

        function x(e) {
            return null !== e && "object" == typeof e && !Nr(e)
        }

        function C(e) {
            return "string" == typeof e
        }

        function k(e) {
            return "number" == typeof e
        }

        function S(e) {
            return "[object Date]" === jr.call(e)
        }

        function E(e) {
            return "function" == typeof e
        }

        function T(e) {
            return "[object RegExp]" === jr.call(e)
        }

        function D(e) {
            return e && e.window === e
        }

        function A(e) {
            return e && e.$evalAsync && e.$watch
        }

        function O(e) {
            return "[object File]" === jr.call(e)
        }

        function M(e) {
            return "[object FormData]" === jr.call(e)
        }

        function j(e) {
            return "[object Blob]" === jr.call(e)
        }

        function N(e) {
            return "boolean" == typeof e
        }

        function P(e) {
            return e && E(e.then)
        }

        function L(e) {
            return Fr.test(jr.call(e))
        }

        function I(e) {
            return !(!e || !(e.nodeName || e.prop && e.attr && e.find))
        }

        function q(e) {
            var t, n = {},
                r = e.split(",");
            for (t = 0; t < r.length; t++) n[r[t]] = !0;
            return n
        }

        function V(e) {
            return br(e.nodeName || e[0] && e[0].nodeName)
        }

        function F(e, t) {
            var n = e.indexOf(t);
            return n >= 0 && e.splice(n, 1), n
        }

        function H(e, t, n, r) {
            if (D(e) || A(e)) throw Pr("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
            if (L(t)) throw Pr("cpta", "Can't copy! TypedArray destination cannot be mutated.");
            if (t) {
                if (e === t) throw Pr("cpi", "Can't copy! Source and destination are identical.");
                n = n || [], r = r || [], w(e) && (n.push(e), r.push(t));
                var i;
                if (Vr(e)) {
                    t.length = 0;
                    for (var a = 0; a < e.length; a++) t.push(H(e[a], null, n, r))
                } else {
                    var s = t.$$hashKey;
                    if (Vr(t) ? t.length = 0 : o(t, function(e, n) {
                            delete t[n]
                        }), x(e))
                        for (i in e) t[i] = H(e[i], null, n, r);
                    else if (e && "function" == typeof e.hasOwnProperty)
                        for (i in e) e.hasOwnProperty(i) && (t[i] = H(e[i], null, n, r));
                    else
                        for (i in e) wr.call(e, i) && (t[i] = H(e[i], null, n, r));
                    l(t, s)
                }
            } else if (t = e, w(e)) {
                var u;
                if (n && -1 !== (u = n.indexOf(e))) return r[u];
                if (Vr(e)) return H(e, [], n, r);
                if (L(e)) t = new e.constructor(e);
                else if (S(e)) t = new Date(e.getTime());
                else {
                    if (!T(e)) {
                        var c = Object.create(Nr(e));
                        return H(e, c, n, r)
                    }
                    t = new RegExp(e.source, e.toString().match(/[^\/]*$/)[0]), t.lastIndex = e.lastIndex
                }
                r && (n.push(e), r.push(t))
            }
            return t
        }

        function R(e, t) {
            if (Vr(e)) {
                t = t || [];
                for (var n = 0, r = e.length; r > n; n++) t[n] = e[n]
            } else if (w(e)) {
                t = t || {};
                for (var i in e)("$" !== i.charAt(0) || "$" !== i.charAt(1)) && (t[i] = e[i])
            }
            return t || e
        }

        function _(e, t) {
            if (e === t) return !0;
            if (null === e || null === t) return !1;
            if (e !== e && t !== t) return !0;
            var r, i, o, a = typeof e,
                s = typeof t;
            if (a == s && "object" == a) {
                if (!Vr(e)) {
                    if (S(e)) return S(t) ? _(e.getTime(), t.getTime()) : !1;
                    if (T(e)) return T(t) ? e.toString() == t.toString() : !1;
                    if (A(e) || A(t) || D(e) || D(t) || Vr(t) || S(t) || T(t)) return !1;
                    o = ge();
                    for (i in e)
                        if ("$" !== i.charAt(0) && !E(e[i])) {
                            if (!_(e[i], t[i])) return !1;
                            o[i] = !0
                        }
                    for (i in t)
                        if (!(i in o || "$" === i.charAt(0) || t[i] === n || E(t[i]))) return !1;
                    return !0
                }
                if (!Vr(t)) return !1;
                if ((r = e.length) == t.length) {
                    for (i = 0; r > i; i++)
                        if (!_(e[i], t[i])) return !1;
                    return !0
                }
            }
            return !1
        }

        function U(e, t, n) {
            return e.concat(Ar.call(t, n))
        }

        function B(e, t) {
            return Ar.call(e, t || 0)
        }

        function z(e, t) {
            var n = arguments.length > 2 ? B(arguments, 2) : [];
            return !E(t) || t instanceof RegExp ? t : n.length ? function() {
                return arguments.length ? t.apply(e, U(n, arguments, 0)) : t.apply(e, n)
            } : function() {
                return arguments.length ? t.apply(e, arguments) : t.call(e)
            }
        }

        function W(e, r) {
            var i = r;
            return "string" == typeof e && "$" === e.charAt(0) && "$" === e.charAt(1) ? i = n : D(r) ? i = "$WINDOW" : r && t === r ? i = "$DOCUMENT" : A(r) && (i = "$SCOPE"), i
        }

        function Y(e, t) {
            return "undefined" == typeof e ? n : (k(t) || (t = t ? 2 : null), JSON.stringify(e, W, t))
        }

        function G(e) {
            return C(e) ? JSON.parse(e) : e
        }

        function K(e, t) {
            var n = Date.parse("Jan 01, 1970 00:00:00 " + e) / 6e4;
            return isNaN(n) ? t : n
        }

        function J(e, t) {
            return e = new Date(e.getTime()), e.setMinutes(e.getMinutes() + t), e
        }

        function X(e, t, n) {
            n = n ? -1 : 1;
            var r = K(t, e.getTimezoneOffset());
            return J(e, n * (r - e.getTimezoneOffset()))
        }

        function Z(e) {
            e = Er(e).clone();
            try {
                e.empty()
            } catch (t) {}
            var n = Er("<div>").append(e).html();
            try {
                return e[0].nodeType === Kr ? br(n) : n.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(e, t) {
                    return "<" + br(t)
                })
            } catch (t) {
                return br(n)
            }
        }

        function Q(e) {
            try {
                return decodeURIComponent(e)
            } catch (t) {}
        }

        function ee(e) {
            var t, n, r = {};
            return o((e || "").split("&"), function(e) {
                if (e && (t = e.replace(/\+/g, "%20").split("="), n = Q(t[0]), b(n))) {
                    var i = b(t[1]) ? Q(t[1]) : !0;
                    wr.call(r, n) ? Vr(r[n]) ? r[n].push(i) : r[n] = [r[n], i] : r[n] = i
                }
            }), r
        }

        function te(e) {
            var t = [];
            return o(e, function(e, n) {
                Vr(e) ? o(e, function(e) {
                    t.push(re(n, !0) + (e === !0 ? "" : "=" + re(e, !0)))
                }) : t.push(re(n, !0) + (e === !0 ? "" : "=" + re(e, !0)))
            }), t.length ? t.join("&") : ""
        }

        function ne(e) {
            return re(e, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
        }

        function re(e, t) {
            return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, t ? "%20" : "+")
        }

        function ie(e, t) {
            var n, r, i = Br.length;
            for (r = 0; i > r; ++r)
                if (n = Br[r] + t, C(n = e.getAttribute(n))) return n;
            return null
        }

        function oe(e, t) {
            var n, r, i = {};
            o(Br, function(t) {
                var i = t + "app";
                !n && e.hasAttribute && e.hasAttribute(i) && (n = e, r = e.getAttribute(i))
            }), o(Br, function(t) {
                var i, o = t + "app";
                !n && (i = e.querySelector("[" + o.replace(":", "\\:") + "]")) && (n = i, r = i.getAttribute(o))
            }), n && (i.strictDi = null !== ie(n, "strict-di"), t(n, r ? [r] : [], i))
        }

        function ae(n, r, i) {
            w(i) || (i = {});
            var a = {
                strictDi: !1
            };
            i = f(a, i);
            var s = function() {
                    if (n = Er(n), n.injector()) {
                        var e = n[0] === t ? "document" : Z(n);
                        throw Pr("btstrpd", "App Already Bootstrapped with this Element '{0}'", e.replace(/</, "&lt;").replace(/>/, "&gt;"))
                    }
                    r = r || [], r.unshift(["$provide", function(e) {
                        e.value("$rootElement", n)
                    }]), i.debugInfoEnabled && r.push(["$compileProvider", function(e) {
                        e.debugInfoEnabled(!0)
                    }]), r.unshift("ng");
                    var o = Ze(r, i.strictDi);
                    return o.invoke(["$rootScope", "$rootElement", "$compile", "$injector", function(e, t, n, r) {
                        e.$apply(function() {
                            t.data("$injector", r), n(t)(e)
                        })
                    }]), o
                },
                u = /^NG_ENABLE_DEBUG_INFO!/,
                l = /^NG_DEFER_BOOTSTRAP!/;
            return e && u.test(e.name) && (i.debugInfoEnabled = !0, e.name = e.name.replace(u, "")), e && !l.test(e.name) ? s() : (e.name = e.name.replace(l, ""), Lr.resumeBootstrap = function(e) {
                return o(e, function(e) {
                    r.push(e)
                }), s()
            }, void(E(Lr.resumeDeferredBootstrap) && Lr.resumeDeferredBootstrap()))
        }

        function se() {
            e.name = "NG_ENABLE_DEBUG_INFO!" + e.name, e.location.reload()
        }

        function ue(e) {
            var t = Lr.element(e).injector();
            if (!t) throw Pr("test", "no injector found for element argument to getTestability");
            return t.get("$$testability")
        }

        function le(e, t) {
            return t = t || "_", e.replace(zr, function(e, n) {
                return (n ? t : "") + e.toLowerCase()
            })
        }

        function ce() {
            var t;
            if (!Wr) {
                var r = Ur();
                Tr = e.jQuery, b(r) && (Tr = null === r ? n : e[r]), Tr && Tr.fn.on ? (Er = Tr, f(Tr.fn, {
                    scope: di.scope,
                    isolateScope: di.isolateScope,
                    controller: di.controller,
                    injector: di.injector,
                    inheritedData: di.inheritedData
                }), t = Tr.cleanData, Tr.cleanData = function(e) {
                    var n;
                    if (qr) qr = !1;
                    else
                        for (var r, i = 0; null != (r = e[i]); i++) n = Tr._data(r, "events"), n && n.$destroy && Tr(r).triggerHandler("$destroy");
                    t(e)
                }) : Er = De, Lr.element = Er, Wr = !0
            }
        }

        function fe(e, t, n) {
            if (!e) throw Pr("areq", "Argument '{0}' is {1}", t || "?", n || "required");
            return e
        }

        function pe(e, t, n) {
            return n && Vr(e) && (e = e[e.length - 1]), fe(E(e), t, "not a function, got " + (e && "object" == typeof e ? e.constructor.name || "Object" : typeof e)), e
        }

        function de(e, t) {
            if ("hasOwnProperty" === e) throw Pr("badname", "hasOwnProperty is not a valid {0} name", t)
        }

        function he(e, t, n) {
            if (!t) return e;
            for (var r, i = t.split("."), o = e, a = i.length, s = 0; a > s; s++) r = i[s], e && (e = (o = e)[r]);
            return !n && E(e) ? z(o, e) : e
        }

        function me(e) {
            var t = e[0],
                n = e[e.length - 1],
                r = [t];
            do {
                if (t = t.nextSibling, !t) break;
                r.push(t)
            } while (t !== n);
            return Er(r)
        }

        function ge() {
            return Object.create(null)
        }

        function ve(e) {
            function t(e, t, n) {
                return e[t] || (e[t] = n())
            }
            var n = r("$injector"),
                i = r("ng"),
                o = t(e, "angular", Object);
            return o.$$minErr = o.$$minErr || r, t(o, "module", function() {
                var e = {};
                return function(r, o, a) {
                    var s = function(e, t) {
                        if ("hasOwnProperty" === e) throw i("badname", "hasOwnProperty is not a valid {0} name", t)
                    };
                    return s(r, "module"), o && e.hasOwnProperty(r) && (e[r] = null), t(e, r, function() {
                        function e(e, t, n, r) {
                            return r || (r = i),
                                function() {
                                    return r[n || "push"]([e, t, arguments]), c
                                }
                        }

                        function t(e, t) {
                            return function(n, o) {
                                return o && E(o) && (o.$$moduleName = r), i.push([e, t, arguments]), c
                            }
                        }
                        if (!o) throw n("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", r);
                        var i = [],
                            s = [],
                            u = [],
                            l = e("$injector", "invoke", "push", s),
                            c = {
                                _invokeQueue: i,
                                _configBlocks: s,
                                _runBlocks: u,
                                requires: o,
                                name: r,
                                provider: t("$provide", "provider"),
                                factory: t("$provide", "factory"),
                                service: t("$provide", "service"),
                                value: e("$provide", "value"),
                                constant: e("$provide", "constant", "unshift"),
                                decorator: t("$provide", "decorator"),
                                animation: t("$animateProvider", "register"),
                                filter: t("$filterProvider", "register"),
                                controller: t("$controllerProvider", "register"),
                                directive: t("$compileProvider", "directive"),
                                config: l,
                                run: function(e) {
                                    return u.push(e), this
                                }
                            };
                        return a && l(a), c
                    })
                }
            })
        }

        function $e(e) {
            var t = [];
            return JSON.stringify(e, function(e, n) {
                if (n = W(e, n), w(n)) {
                    if (t.indexOf(n) >= 0) return "<<already seen>>";
                    t.push(n)
                }
                return n
            })
        }

        function ye(e) {
            return "function" == typeof e ? e.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof e ? "undefined" : "string" != typeof e ? $e(e) : e
        }

        function be(t) {
            f(t, {
                bootstrap: ae,
                copy: H,
                extend: f,
                merge: p,
                equals: _,
                element: Er,
                forEach: o,
                injector: Ze,
                noop: m,
                bind: z,
                toJson: Y,
                fromJson: G,
                identity: g,
                isUndefined: y,
                isDefined: b,
                isString: C,
                isFunction: E,
                isObject: w,
                isNumber: k,
                isElement: I,
                isArray: Vr,
                version: Qr,
                isDate: S,
                lowercase: br,
                uppercase: xr,
                callbacks: {
                    counter: 0
                },
                getTestability: ue,
                $$minErr: r,
                $$csp: _r,
                reloadWithDebugInfo: se
            }), Dr = ve(e);
            try {
                Dr("ngLocale")
            } catch (n) {
                Dr("ngLocale", []).provider("$locale", Mt)
            }
            Dr("ng", ["ngLocale"], ["$provide", function(e) {
                e.provider({
                    $$sanitizeUri: vn
                }), e.provider("$compile", ut).directive({
                    a: lo,
                    input: To,
                    textarea: To,
                    form: mo,
                    script: ya,
                    select: xa,
                    style: ka,
                    option: Ca,
                    ngBind: Oo,
                    ngBindHtml: jo,
                    ngBindTemplate: Mo,
                    ngClass: Po,
                    ngClassEven: Io,
                    ngClassOdd: Lo,
                    ngCloak: qo,
                    ngController: Vo,
                    ngForm: go,
                    ngHide: da,
                    ngIf: Ro,
                    ngInclude: _o,
                    ngInit: Bo,
                    ngNonBindable: ia,
                    ngPluralize: ua,
                    ngRepeat: la,
                    ngShow: pa,
                    ngStyle: ha,
                    ngSwitch: ma,
                    ngSwitchWhen: ga,
                    ngSwitchDefault: va,
                    ngOptions: sa,
                    ngTransclude: $a,
                    ngModel: ta,
                    ngList: zo,
                    ngChange: No,
                    pattern: Ea,
                    ngPattern: Ea,
                    required: Sa,
                    ngRequired: Sa,
                    minlength: Da,
                    ngMinlength: Da,
                    maxlength: Ta,
                    ngMaxlength: Ta,
                    ngValue: Ao,
                    ngModelOptions: ra
                }).directive({
                    ngInclude: Uo
                }).directive(co).directive(Fo), e.provider({
                    $anchorScroll: Qe,
                    $animate: Di,
                    $$animateQueue: Ti,
                    $$AnimateRunner: Ei,
                    $browser: ot,
                    $cacheFactory: at,
                    $controller: dt,
                    $document: ht,
                    $exceptionHandler: mt,
                    $filter: Mn,
                    $interpolate: At,
                    $interval: Ot,
                    $http: St,
                    $httpParamSerializer: vt,
                    $httpParamSerializerJQLike: $t,
                    $httpBackend: Tt,
                    $location: zt,
                    $log: Wt,
                    $parse: fn,
                    $rootScope: gn,
                    $q: pn,
                    $$q: dn,
                    $sce: wn,
                    $sceDelegate: bn,
                    $sniffer: xn,
                    $templateCache: st,
                    $templateRequest: Cn,
                    $$testability: kn,
                    $timeout: Sn,
                    $window: Dn,
                    $$rAF: mn,
                    $$jqLite: Ye,
                    $$HashMap: vi,
                    $$cookieReader: On
                })
            }])
        }

        function we() {
            return ++ti
        }

        function xe(e) {
            return e.replace(ii, function(e, t, n, r) {
                return r ? n.toUpperCase() : n
            }).replace(oi, "Moz$1")
        }

        function Ce(e) {
            return !li.test(e)
        }

        function ke(e) {
            var t = e.nodeType;
            return t === Yr || !t || t === Xr
        }

        function Se(e) {
            for (var t in ei[e.ng339]) return !0;
            return !1
        }

        function Ee(e, t) {
            var n, r, i, a, s = t.createDocumentFragment(),
                u = [];
            if (Ce(e)) u.push(t.createTextNode(e));
            else {
                for (n = n || s.appendChild(t.createElement("div")), r = (ci.exec(e) || ["", ""])[1].toLowerCase(), i = pi[r] || pi._default, n.innerHTML = i[1] + e.replace(fi, "<$1></$2>") + i[2], a = i[0]; a--;) n = n.lastChild;
                u = U(u, n.childNodes), n = s.firstChild, n.textContent = ""
            }
            return s.textContent = "", s.innerHTML = "", o(u, function(e) {
                s.appendChild(e)
            }), s
        }

        function Te(e, n) {
            n = n || t;
            var r;
            return (r = ui.exec(e)) ? [n.createElement(r[1])] : (r = Ee(e, n)) ? r.childNodes : []
        }

        function De(e) {
            if (e instanceof De) return e;
            var t;
            if (C(e) && (e = Hr(e), t = !0), !(this instanceof De)) {
                if (t && "<" != e.charAt(0)) throw si("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
                return new De(e)
            }
            t ? Ve(this, Te(e)) : Ve(this, e)
        }

        function Ae(e) {
            return e.cloneNode(!0)
        }

        function Oe(e, t) {
            if (t || je(e), e.querySelectorAll)
                for (var n = e.querySelectorAll("*"), r = 0, i = n.length; i > r; r++) je(n[r])
        }

        function Me(e, t, n, r) {
            if (b(r)) throw si("offargs", "jqLite#off() does not support the `selector` argument");
            var i = Ne(e),
                a = i && i.events,
                s = i && i.handle;
            if (s)
                if (t) o(t.split(" "), function(t) {
                    if (b(n)) {
                        var r = a[t];
                        if (F(r || [], n), r && r.length > 0) return
                    }
                    ri(e, t, s), delete a[t]
                });
                else
                    for (t in a) "$destroy" !== t && ri(e, t, s), delete a[t]
        }

        function je(e, t) {
            var r = e.ng339,
                i = r && ei[r];
            if (i) {
                if (t) return void delete i.data[t];
                i.handle && (i.events.$destroy && i.handle({}, "$destroy"), Me(e)), delete ei[r], e.ng339 = n
            }
        }

        function Ne(e, t) {
            var r = e.ng339,
                i = r && ei[r];
            return t && !i && (e.ng339 = r = we(), i = ei[r] = {
                events: {},
                data: {},
                handle: n
            }), i
        }

        function Pe(e, t, n) {
            if (ke(e)) {
                var r = b(n),
                    i = !r && t && !w(t),
                    o = !t,
                    a = Ne(e, !i),
                    s = a && a.data;
                if (r) s[t] = n;
                else {
                    if (o) return s;
                    if (i) return s && s[t];
                    f(s, t)
                }
            }
        }

        function Le(e, t) {
            return e.getAttribute ? (" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + t + " ") > -1 : !1
        }

        function Ie(e, t) {
            t && e.setAttribute && o(t.split(" "), function(t) {
                e.setAttribute("class", Hr((" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + Hr(t) + " ", " ")))
            })
        }

        function qe(e, t) {
            if (t && e.setAttribute) {
                var n = (" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
                o(t.split(" "), function(e) {
                    e = Hr(e), -1 === n.indexOf(" " + e + " ") && (n += e + " ")
                }), e.setAttribute("class", Hr(n))
            }
        }

        function Ve(e, t) {
            if (t)
                if (t.nodeType) e[e.length++] = t;
                else {
                    var n = t.length;
                    if ("number" == typeof n && t.window !== t) {
                        if (n)
                            for (var r = 0; n > r; r++) e[e.length++] = t[r]
                    } else e[e.length++] = t
                }
        }

        function Fe(e, t) {
            return He(e, "$" + (t || "ngController") + "Controller")
        }

        function He(e, t, r) {
            e.nodeType == Xr && (e = e.documentElement);
            for (var i = Vr(t) ? t : [t]; e;) {
                for (var o = 0, a = i.length; a > o; o++)
                    if ((r = Er.data(e, i[o])) !== n) return r;
                e = e.parentNode || e.nodeType === Zr && e.host
            }
        }

        function Re(e) {
            for (Oe(e, !0); e.firstChild;) e.removeChild(e.firstChild)
        }

        function _e(e, t) {
            t || Oe(e);
            var n = e.parentNode;
            n && n.removeChild(e)
        }

        function Ue(t, n) {
            n = n || e, "complete" === n.document.readyState ? n.setTimeout(t) : Er(n).on("load", t)
        }

        function Be(e, t) {
            var n = hi[t.toLowerCase()];
            return n && mi[V(e)] && n
        }

        function ze(e, t) {
            var n = e.nodeName;
            return ("INPUT" === n || "TEXTAREA" === n) && gi[t]
        }

        function We(e, t) {
            var n = function(n, r) {
                n.isDefaultPrevented = function() {
                    return n.defaultPrevented
                };
                var i = t[r || n.type],
                    o = i ? i.length : 0;
                if (o) {
                    if (y(n.immediatePropagationStopped)) {
                        var a = n.stopImmediatePropagation;
                        n.stopImmediatePropagation = function() {
                            n.immediatePropagationStopped = !0, n.stopPropagation && n.stopPropagation(), a && a.call(n)
                        }
                    }
                    n.isImmediatePropagationStopped = function() {
                        return n.immediatePropagationStopped === !0
                    }, o > 1 && (i = R(i));
                    for (var s = 0; o > s; s++) n.isImmediatePropagationStopped() || i[s].call(e, n)
                }
            };
            return n.elem = e, n
        }

        function Ye() {
            this.$get = function() {
                return f(De, {
                    hasClass: function(e, t) {
                        return e.attr && (e = e[0]), Le(e, t)
                    },
                    addClass: function(e, t) {
                        return e.attr && (e = e[0]), qe(e, t)
                    },
                    removeClass: function(e, t) {
                        return e.attr && (e = e[0]), Ie(e, t)
                    }
                })
            }
        }

        function Ge(e, t) {
            var n = e && e.$$hashKey;
            if (n) return "function" == typeof n && (n = e.$$hashKey()), n;
            var r = typeof e;
            return n = "function" == r || "object" == r && null !== e ? e.$$hashKey = r + ":" + (t || u)() : r + ":" + e
        }

        function Ke(e, t) {
            if (t) {
                var n = 0;
                this.nextUid = function() {
                    return ++n
                }
            }
            o(e, this.put, this)
        }

        function Je(e) {
            var t = e.toString().replace(wi, ""),
                n = t.match($i);
            return n ? "function(" + (n[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn"
        }

        function Xe(e, t, n) {
            var r, i, a, s;
            if ("function" == typeof e) {
                if (!(r = e.$inject)) {
                    if (r = [], e.length) {
                        if (t) throw C(n) && n || (n = e.name || Je(e)), xi("strictdi", "{0} is not using explicit annotation and cannot be invoked in strict mode", n);
                        i = e.toString().replace(wi, ""), a = i.match($i), o(a[1].split(yi), function(e) {
                            e.replace(bi, function(e, t, n) {
                                r.push(n)
                            })
                        })
                    }
                    e.$inject = r
                }
            } else Vr(e) ? (s = e.length - 1, pe(e[s], "fn"), r = e.slice(0, s)) : pe(e, "fn", !0);
            return r
        }

        function Ze(e, t) {
            function r(e) {
                return function(t, n) {
                    return w(t) ? void o(t, s(e)) : e(t, n)
                }
            }

            function i(e, t) {
                if (de(e, "service"), (E(t) || Vr(t)) && (t = k.instantiate(t)), !t.$get) throw xi("pget", "Provider '{0}' must define $get factory method.", e);
                return x[e + g] = t
            }

            function a(e, t) {
                return function() {
                    var n = T.invoke(t, this);
                    if (y(n)) throw xi("undef", "Provider '{0}' must return a value from $get factory method.", e);
                    return n
                }
            }

            function u(e, t, n) {
                return i(e, {
                    $get: n !== !1 ? a(e, t) : t
                })
            }

            function l(e, t) {
                return u(e, ["$injector", function(e) {
                    return e.instantiate(t)
                }])
            }

            function c(e, t) {
                return u(e, v(t), !1)
            }

            function f(e, t) {
                de(e, "constant"), x[e] = t, S[e] = t
            }

            function p(e, t) {
                var n = k.get(e + g),
                    r = n.$get;
                n.$get = function() {
                    var e = T.invoke(r, n);
                    return T.invoke(t, null, {
                        $delegate: e
                    })
                }
            }

            function d(e) {
                var t, n = [];
                return o(e, function(e) {
                    function r(e) {
                        var t, n;
                        for (t = 0, n = e.length; n > t; t++) {
                            var r = e[t],
                                i = k.get(r[0]);
                            i[r[1]].apply(i, r[2])
                        }
                    }
                    if (!b.get(e)) {
                        b.put(e, !0);
                        try {
                            C(e) ? (t = Dr(e), n = n.concat(d(t.requires)).concat(t._runBlocks), r(t._invokeQueue), r(t._configBlocks)) : E(e) ? n.push(k.invoke(e)) : Vr(e) ? n.push(k.invoke(e)) : pe(e, "module")
                        } catch (i) {
                            throw Vr(e) && (e = e[e.length - 1]), i.message && i.stack && -1 == i.stack.indexOf(i.message) && (i = i.message + "\n" + i.stack), xi("modulerr", "Failed to instantiate module {0} due to:\n{1}", e, i.stack || i.message || i)
                        }
                    }
                }), n
            }

            function h(e, n) {
                function r(t, r) {
                    if (e.hasOwnProperty(t)) {
                        if (e[t] === m) throw xi("cdep", "Circular dependency found: {0}", t + " <- " + $.join(" <- "));
                        return e[t]
                    }
                    try {
                        return $.unshift(t), e[t] = m, e[t] = n(t, r)
                    } catch (i) {
                        throw e[t] === m && delete e[t], i
                    } finally {
                        $.shift()
                    }
                }

                function i(e, n, i, o) {
                    "string" == typeof i && (o = i, i = null);
                    var a, s, u, l = [],
                        c = Ze.$$annotate(e, t, o);
                    for (s = 0, a = c.length; a > s; s++) {
                        if (u = c[s], "string" != typeof u) throw xi("itkn", "Incorrect injection token! Expected service name as string, got {0}", u);
                        l.push(i && i.hasOwnProperty(u) ? i[u] : r(u, o))
                    }
                    return Vr(e) && (e = e[a]), e.apply(n, l)
                }

                function o(e, t, n) {
                    var r = Object.create((Vr(e) ? e[e.length - 1] : e).prototype || null),
                        o = i(e, r, t, n);
                    return w(o) || E(o) ? o : r
                }
                return {
                    invoke: i,
                    instantiate: o,
                    get: r,
                    annotate: Ze.$$annotate,
                    has: function(t) {
                        return x.hasOwnProperty(t + g) || e.hasOwnProperty(t)
                    }
                }
            }
            t = t === !0;
            var m = {},
                g = "Provider",
                $ = [],
                b = new Ke([], !0),
                x = {
                    $provide: {
                        provider: r(i),
                        factory: r(u),
                        service: r(l),
                        value: r(c),
                        constant: r(f),
                        decorator: p
                    }
                },
                k = x.$injector = h(x, function(e, t) {
                    throw Lr.isString(t) && $.push(t), xi("unpr", "Unknown provider: {0}", $.join(" <- "))
                }),
                S = {},
                T = S.$injector = h(S, function(e, t) {
                    var r = k.get(e + g, t);
                    return T.invoke(r.$get, r, n, e)
                });
            return o(d(e), function(e) {
                e && T.invoke(e)
            }), T
        }

        function Qe() {
            var e = !0;
            this.disableAutoScrolling = function() {
                e = !1
            }, this.$get = ["$window", "$location", "$rootScope", function(t, n, r) {
                function i(e) {
                    var t = null;
                    return Array.prototype.some.call(e, function(e) {
                        return "a" === V(e) ? (t = e, !0) : void 0
                    }), t
                }

                function o() {
                    var e = s.yOffset;
                    if (E(e)) e = e();
                    else if (I(e)) {
                        var n = e[0],
                            r = t.getComputedStyle(n);
                        e = "fixed" !== r.position ? 0 : n.getBoundingClientRect().bottom
                    } else k(e) || (e = 0);
                    return e
                }

                function a(e) {
                    if (e) {
                        e.scrollIntoView();
                        var n = o();
                        if (n) {
                            var r = e.getBoundingClientRect().top;
                            t.scrollBy(0, r - n)
                        }
                    } else t.scrollTo(0, 0)
                }

                function s(e) {
                    e = C(e) ? e : n.hash();
                    var t;
                    e ? (t = u.getElementById(e)) ? a(t) : (t = i(u.getElementsByName(e))) ? a(t) : "top" === e && a(null) : a(null)
                }
                var u = t.document;
                return e && r.$watch(function() {
                    return n.hash()
                }, function(e, t) {
                    (e !== t || "" !== e) && Ue(function() {
                        r.$evalAsync(s)
                    })
                }), s
            }]
        }

        function et(e, t) {
            return e || t ? e ? t ? (Vr(e) && (e = e.join(" ")), Vr(t) && (t = t.join(" ")), e + " " + t) : e : t : ""
        }

        function tt(e) {
            for (var t = 0; t < e.length; t++) {
                var n = e[t];
                if (n.nodeType === ki) return n
            }
        }

        function nt(e) {
            C(e) && (e = e.split(" "));
            var t = ge();
            return o(e, function(e) {
                e.length && (t[e] = !0)
            }), t
        }

        function rt(e) {
            return w(e) ? e : {}
        }

        function it(e, t, n, r) {
            function i(e) {
                try {
                    e.apply(null, B(arguments, 1))
                } finally {
                    if ($--, 0 === $)
                        for (; b.length;) try {
                            b.pop()()
                        } catch (t) {
                            n.error(t)
                        }
                }
            }

            function a(e) {
                var t = e.indexOf("#");
                return -1 === t ? "" : e.substr(t)
            }

            function s() {
                l(), c()
            }

            function u() {
                try {
                    return d.state
                } catch (e) {}
            }

            function l() {
                w = u(), w = y(w) ? null : w, _(w, D) && (w = D), D = w
            }

            function c() {
                (C !== f.url() || x !== w) && (C = f.url(), x = w, o(E, function(e) {
                    e(f.url(), w)
                }))
            }
            var f = this,
                p = (t[0], e.location),
                d = e.history,
                h = e.setTimeout,
                g = e.clearTimeout,
                v = {};
            f.isMock = !1;
            var $ = 0,
                b = [];
            f.$$completeOutstandingRequest = i, f.$$incOutstandingRequestCount = function() {
                $++
            }, f.notifyWhenNoOutstandingRequests = function(e) {
                0 === $ ? e() : b.push(e)
            };
            var w, x, C = p.href,
                k = t.find("base"),
                S = null;
            l(), x = w, f.url = function(t, n, i) {
                if (y(i) && (i = null), p !== e.location && (p = e.location), d !== e.history && (d = e.history), t) {
                    var o = x === i;
                    if (C === t && (!r.history || o)) return f;
                    var s = C && It(C) === It(t);
                    return C = t, x = i, !r.history || s && o ? ((!s || S) && (S = t), n ? p.replace(t) : s ? p.hash = a(t) : p.href = t) : (d[n ? "replaceState" : "pushState"](i, "", t), l(), x = w), f
                }
                return S || p.href.replace(/%27/g, "'")
            }, f.state = function() {
                return w
            };
            var E = [],
                T = !1,
                D = null;
            f.onUrlChange = function(t) {
                return T || (r.history && Er(e).on("popstate", s), Er(e).on("hashchange", s), T = !0), E.push(t), t
            }, f.$$applicationDestroyed = function() {
                Er(e).off("hashchange popstate", s)
            }, f.$$checkUrlChange = c, f.baseHref = function() {
                var e = k.attr("href");
                return e ? e.replace(/^(https?\:)?\/\/[^\/]*/, "") : ""
            }, f.defer = function(e, t) {
                var n;
                return $++, n = h(function() {
                    delete v[n], i(e)
                }, t || 0), v[n] = !0, n
            }, f.defer.cancel = function(e) {
                return v[e] ? (delete v[e], g(e), i(m), !0) : !1
            }
        }

        function ot() {
            this.$get = ["$window", "$log", "$sniffer", "$document", function(e, t, n, r) {
                return new it(e, r, t, n)
            }]
        }

        function at() {
            this.$get = function() {
                function e(e, n) {
                    function i(e) {
                        e != p && (d ? d == e && (d = e.n) : d = e, o(e.n, e.p), o(e, p), p = e, p.n = null)
                    }

                    function o(e, t) {
                        e != t && (e && (e.p = t), t && (t.n = e))
                    }
                    if (e in t) throw r("$cacheFactory")("iid", "CacheId '{0}' is already taken!", e);
                    var a = 0,
                        s = f({}, n, {
                            id: e
                        }),
                        u = {},
                        l = n && n.capacity || Number.MAX_VALUE,
                        c = {},
                        p = null,
                        d = null;
                    return t[e] = {
                        put: function(e, t) {
                            if (!y(t)) {
                                if (l < Number.MAX_VALUE) {
                                    var n = c[e] || (c[e] = {
                                        key: e
                                    });
                                    i(n)
                                }
                                return e in u || a++, u[e] = t, a > l && this.remove(d.key), t
                            }
                        },
                        get: function(e) {
                            if (l < Number.MAX_VALUE) {
                                var t = c[e];
                                if (!t) return;
                                i(t)
                            }
                            return u[e]
                        },
                        remove: function(e) {
                            if (l < Number.MAX_VALUE) {
                                var t = c[e];
                                if (!t) return;
                                t == p && (p = t.p), t == d && (d = t.n), o(t.n, t.p), delete c[e]
                            }
                            delete u[e], a--
                        },
                        removeAll: function() {
                            u = {}, a = 0, c = {}, p = d = null
                        },
                        destroy: function() {
                            u = null, s = null, c = null, delete t[e]
                        },
                        info: function() {
                            return f({}, s, {
                                size: a
                            })
                        }
                    }
                }
                var t = {};
                return e.info = function() {
                    var e = {};
                    return o(t, function(t, n) {
                        e[n] = t.info()
                    }), e
                }, e.get = function(e) {
                    return t[e]
                }, e
            }
        }

        function st() {
            this.$get = ["$cacheFactory", function(e) {
                return e("templates")
            }]
        }

        function ut(e, r) {
            function i(e, t, n) {
                var r = /^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,
                    i = {};
                return o(e, function(e, o) {
                    var a = e.match(r);
                    if (!a) throw Ai("iscp", "Invalid {3} for directive '{0}'. Definition: {... {1}: '{2}' ...}", t, o, e, n ? "controller bindings definition" : "isolate scope definition");
                    i[o] = {
                        mode: a[1][0],
                        collection: "*" === a[2],
                        optional: "?" === a[3],
                        attrName: a[4] || o
                    }
                }), i
            }

            function a(e, t) {
                var n = {
                    isolateScope: null,
                    bindToController: null
                };
                if (w(e.scope) && (e.bindToController === !0 ? (n.bindToController = i(e.scope, t, !0), n.isolateScope = {}) : n.isolateScope = i(e.scope, t, !1)), w(e.bindToController) && (n.bindToController = i(e.bindToController, t, !0)), w(n.bindToController)) {
                    var r = e.controller,
                        o = e.controllerAs;
                    if (!r) throw Ai("noctrl", "Cannot bind to controller without directive '{0}'s controller.", t);
                    if (!pt(r, o)) throw Ai("noident", "Cannot bind to controller without identifier for directive '{0}'.", t)
                }
                return n
            }

            function u(e) {
                var t = e.charAt(0);
                if (!t || t !== br(t)) throw Ai("baddir", "Directive name '{0}' is invalid. The first character must be a lowercase letter", e);
                if (e !== e.trim()) throw Ai("baddir", "Directive name '{0}' is invalid. The name should not contain leading or trailing whitespaces", e)
            }
            var l = {},
                c = "Directive",
                p = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/,
                d = /(([\w\-]+)(?:\:([^;]+))?;?)/,
                $ = q("ngSrc,ngSrcset,src,srcset"),
                y = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/,
                x = /^(on[a-z]+|formaction)$/;
            this.directive = function S(t, n) {
                return de(t, "directive"), C(t) ? (u(t), fe(n, "directiveFactory"), l.hasOwnProperty(t) || (l[t] = [], e.factory(t + c, ["$injector", "$exceptionHandler", function(e, n) {
                    var r = [];
                    return o(l[t], function(i, o) {
                        try {
                            var s = e.invoke(i);
                            E(s) ? s = {
                                compile: v(s)
                            } : !s.compile && s.link && (s.compile = v(s.link)), s.priority = s.priority || 0, s.index = o, s.name = s.name || t, s.require = s.require || s.controller && s.name, s.restrict = s.restrict || "EA";
                            var u = s.$$bindings = a(s, s.name);
                            w(u.isolateScope) && (s.$$isolateBindings = u.isolateScope), s.$$moduleName = i.$$moduleName, r.push(s)
                        } catch (l) {
                            n(l)
                        }
                    }), r
                }])), l[t].push(n)) : o(t, s(S)), this
            }, this.aHrefSanitizationWhitelist = function(e) {
                return b(e) ? (r.aHrefSanitizationWhitelist(e), this) : r.aHrefSanitizationWhitelist()
            }, this.imgSrcSanitizationWhitelist = function(e) {
                return b(e) ? (r.imgSrcSanitizationWhitelist(e), this) : r.imgSrcSanitizationWhitelist()
            };
            var k = !0;
            this.debugInfoEnabled = function(e) {
                return b(e) ? (k = e, this) : k
            }, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function(e, r, i, a, s, u, v, b, S, T, D) {
                function O(e, t) {
                    try {
                        e.addClass(t)
                    } catch (n) {}
                }

                function M(e, t, n, r, i) {
                    e instanceof Er || (e = Er(e)), o(e, function(t, n) {
                        t.nodeType == Kr && t.nodeValue.match(/\S+/) && (e[n] = Er(t).wrap("<span></span>").parent()[0])
                    });
                    var a = N(e, t, e, n, r, i);
                    M.$$addScopeClass(e);
                    var s = null;
                    return function(t, n, r) {
                        fe(t, "scope"), r = r || {};
                        var i = r.parentBoundTranscludeFn,
                            o = r.transcludeControllers,
                            u = r.futureParentElement;
                        i && i.$$boundTransclude && (i = i.$$boundTransclude), s || (s = j(u));
                        var l;
                        if (l = "html" !== s ? Er(X(s, Er("<div>").append(e).html())) : n ? di.clone.call(e) : e, o)
                            for (var c in o) l.data("$" + c + "Controller", o[c].instance);
                        return M.$$addScopeInfo(l, t), n && n(l, t), a && a(t, l, l, i), l
                    }
                }

                function j(e) {
                    var t = e && e[0];
                    return t && "foreignobject" !== V(t) && t.toString().match(/SVG/) ? "svg" : "html"
                }

                function N(e, t, r, i, o, a) {
                    function s(e, r, i, o) {
                        var a, s, u, l, c, f, p, d, g;
                        if (h) {
                            var v = r.length;
                            for (g = new Array(v), c = 0; c < m.length; c += 3) p = m[c], g[p] = r[p]
                        } else g = r;
                        for (c = 0, f = m.length; f > c;)
                            if (u = g[m[c++]], a = m[c++], s = m[c++], a) {
                                if (a.scope) {
                                    l = e.$new(), M.$$addScopeInfo(Er(u), l);
                                    var $ = a.$$destroyBindings;
                                    $ && (a.$$destroyBindings = null, l.$on("$destroyed", $))
                                } else l = e;
                                d = a.transcludeOnThisElement ? P(e, a.transclude, o) : !a.templateOnThisElement && o ? o : !o && t ? P(e, t) : null, a(s, l, u, i, d, a)
                            } else s && s(e, u.childNodes, n, o)
                    }
                    for (var u, l, c, f, p, d, h, m = [], g = 0; g < e.length; g++) u = new oe, l = L(e[g], [], u, 0 === g ? i : n, o), c = l.length ? H(l, e[g], u, t, r, null, [], [], a) : null, c && c.scope && M.$$addScopeClass(u.$$element), p = c && c.terminal || !(f = e[g].childNodes) || !f.length ? null : N(f, c ? (c.transcludeOnThisElement || !c.templateOnThisElement) && c.transclude : t), (c || p) && (m.push(g, c, p), d = !0, h = h || c), a = null;
                    return d ? s : null
                }

                function P(e, t, n) {
                    var r = function(r, i, o, a, s) {
                        return r || (r = e.$new(!1, s), r.$$transcluded = !0), t(r, i, {
                            parentBoundTranscludeFn: n,
                            transcludeControllers: o,
                            futureParentElement: a
                        })
                    };
                    return r
                }

                function L(e, t, n, r, i) {
                    var o, a, s = e.nodeType,
                        u = n.$attr;
                    switch (s) {
                        case Yr:
                            U(t, lt(V(e)), "E", r, i);
                            for (var l, c, f, h, m, g, v = e.attributes, $ = 0, y = v && v.length; y > $; $++) {
                                var b = !1,
                                    x = !1;
                                l = v[$], c = l.name, m = Hr(l.value), h = lt(c), (g = ce.test(h)) && (c = c.replace(Oi, "").substr(8).replace(/_(.)/g, function(e, t) {
                                    return t.toUpperCase()
                                }));
                                var k = h.replace(/(Start|End)$/, "");
                                z(k) && h === k + "Start" && (b = c, x = c.substr(0, c.length - 5) + "end", c = c.substr(0, c.length - 6)), f = lt(c.toLowerCase()), u[f] = c, (g || !n.hasOwnProperty(f)) && (n[f] = m, Be(e, f) && (n[f] = !0)), ee(e, t, m, f, g), U(t, f, "A", r, i, b, x)
                            }
                            if (a = e.className, w(a) && (a = a.animVal), C(a) && "" !== a)
                                for (; o = d.exec(a);) f = lt(o[2]), U(t, f, "C", r, i) && (n[f] = Hr(o[3])), a = a.substr(o.index + o[0].length);
                            break;
                        case Kr:
                            if (11 === Sr)
                                for (; e.parentNode && e.nextSibling && e.nextSibling.nodeType === Kr;) e.nodeValue = e.nodeValue + e.nextSibling.nodeValue, e.parentNode.removeChild(e.nextSibling);
                            J(t, e.nodeValue);
                            break;
                        case Jr:
                            try {
                                o = p.exec(e.nodeValue), o && (f = lt(o[1]), U(t, f, "M", r, i) && (n[f] = Hr(o[2])))
                            } catch (S) {}
                    }
                    return t.sort(G), t
                }

                function I(e, t, n) {
                    var r = [],
                        i = 0;
                    if (t && e.hasAttribute && e.hasAttribute(t)) {
                        do {
                            if (!e) throw Ai("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", t, n);
                            e.nodeType == Yr && (e.hasAttribute(t) && i++, e.hasAttribute(n) && i--), r.push(e), e = e.nextSibling
                        } while (i > 0)
                    } else r.push(e);
                    return Er(r)
                }

                function q(e, t, n) {
                    return function(r, i, o, a, s) {
                        return i = I(i[0], t, n), e(r, i, o, a, s)
                    }
                }

                function H(e, r, o, a, s, l, c, f, p) {
                    function d(e, t, n, r) {
                        e && (n && (e = q(e, n, r)), e.require = v.require, e.directiveName = $, (O === v || v.$$isolateScope) && (e = ne(e, {
                            isolateScope: !0
                        })), c.push(e)), t && (n && (t = q(t, n, r)), t.require = v.require, t.directiveName = $, (O === v || v.$$isolateScope) && (t = ne(t, {
                            isolateScope: !0
                        })), f.push(t))
                    }

                    function h(e, t, n, r) {
                        var i;
                        if (C(t)) {
                            var o = t.match(y),
                                a = t.substring(o[0].length),
                                s = o[1] || o[3],
                                u = "?" === o[2];
                            if ("^^" === s ? n = n.parent() : (i = r && r[a], i = i && i.instance), !i) {
                                var l = "$" + a + "Controller";
                                i = s ? n.inheritedData(l) : n.data(l)
                            }
                            if (!i && !u) throw Ai("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", a, e)
                        } else if (Vr(t)) {
                            i = [];
                            for (var c = 0, f = t.length; f > c; c++) i[c] = h(e, t[c], n, r)
                        }
                        return i || null
                    }

                    function m(e, t, n, r, i, o) {
                        var a = ge();
                        for (var s in r) {
                            var l = r[s],
                                c = {
                                    $scope: l === O || l.$$isolateScope ? i : o,
                                    $element: e,
                                    $attrs: t,
                                    $transclude: n
                                },
                                f = l.controller;
                            "@" == f && (f = t[l.name]);
                            var p = u(f, c, !0, l.controllerAs);
                            a[l.name] = p, F || e.data("$" + l.name + "Controller", p.instance)
                        }
                        return a
                    }

                    function g(e, t, i, a, s, u) {
                        function l(e, t, r) {
                            var i;
                            return A(e) || (r = t, t = e, e = n), F && (i = y), r || (r = F ? w.parent() : w), s(e, t, i, r, N)
                        }
                        var p, d, g, v, $, y, b, w, x;
                        if (r === i ? (x = o, w = o.$$element) : (w = Er(i), x = new oe(w, o)), O && ($ = t.$new(!0)), s && (b = l, b.$$boundTransclude = s), D && (y = m(w, x, b, D, $, t)), O && (M.$$addScopeInfo(w, $, !0, !(j && (j === O || j === O.$$originalDirective))), M.$$addScopeClass(w, !0), $.$$isolateBindings = O.$$isolateBindings, ie(t, x, $, $.$$isolateBindings, O, $)), y) {
                            var C, k, S = O || T;
                            S && y[S.name] && (C = S.$$bindings.bindToController, v = y[S.name], v && v.identifier && C && (k = v, u.$$destroyBindings = ie(t, x, v.instance, C, S)));
                            for (p in y) {
                                v = y[p];
                                var E = v();
                                E !== v.instance && (v.instance = E, w.data("$" + p + "Controller", E), v === k && (u.$$destroyBindings(), u.$$destroyBindings = ie(t, x, E, C, S)))
                            }
                        }
                        for (p = 0, d = c.length; d > p; p++) g = c[p], re(g, g.isolateScope ? $ : t, w, x, g.require && h(g.directiveName, g.require, w, y), b);
                        var N = t;
                        for (O && (O.template || null === O.templateUrl) && (N = $), e && e(N, i.childNodes, n, s), p = f.length - 1; p >= 0; p--) g = f[p], re(g, g.isolateScope ? $ : t, w, x, g.require && h(g.directiveName, g.require, w, y), b)
                    }
                    p = p || {};
                    for (var v, $, b, x, k, S = -Number.MAX_VALUE, T = p.newScopeDirective, D = p.controllerDirectives, O = p.newIsolateScopeDirective, j = p.templateDirective, N = p.nonTlbTranscludeDirective, P = !1, V = !1, F = p.hasElementTranscludeDirective, H = o.$$element = Er(r), _ = l, U = a, z = 0, G = e.length; G > z; z++) {
                        v = e[z];
                        var J = v.$$start,
                            Q = v.$$end;
                        if (J && (H = I(r, J, Q)), b = n, S > v.priority) break;
                        if ((k = v.scope) && (v.templateUrl || (w(k) ? (K("new/isolated scope", O || T, v, H), O = v) : K("new/isolated scope", O, v, H)), T = T || v), $ = v.name, !v.templateUrl && v.controller && (k = v.controller, D = D || ge(), K("'" + $ + "' controller", D[$], v, H), D[$] = v), (k = v.transclude) && (P = !0, v.$$tlb || (K("transclusion", N, v, H), N = v), "element" == k ? (F = !0, S = v.priority, b = H, H = o.$$element = Er(t.createComment(" " + $ + ": " + o[$] + " ")), r = H[0], te(s, B(b), r), U = M(b, a, S, _ && _.name, {
                                nonTlbTranscludeDirective: N
                            })) : (b = Er(Ae(r)).contents(), H.empty(), U = M(b, a))), v.template)
                            if (V = !0, K("template", j, v, H), j = v, k = E(v.template) ? v.template(H, o) : v.template, k = ue(k), v.replace) {
                                if (_ = v, b = Ce(k) ? [] : ft(X(v.templateNamespace, Hr(k))), r = b[0], 1 != b.length || r.nodeType !== Yr) throw Ai("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", $, "");
                                te(s, H, r);
                                var ee = {
                                        $attr: {}
                                    },
                                    ae = L(r, [], ee),
                                    se = e.splice(z + 1, e.length - (z + 1));
                                O && R(ae), e = e.concat(ae).concat(se), W(o, ee), G = e.length
                            } else H.html(k);
                        if (v.templateUrl) V = !0, K("template", j, v, H), j = v, v.replace && (_ = v), g = Y(e.splice(z, e.length - z), H, o, s, P && U, c, f, {
                            controllerDirectives: D,
                            newScopeDirective: T !== v && T,
                            newIsolateScopeDirective: O,
                            templateDirective: j,
                            nonTlbTranscludeDirective: N
                        }), G = e.length;
                        else if (v.compile) try {
                            x = v.compile(H, o, U), E(x) ? d(null, x, J, Q) : x && d(x.pre, x.post, J, Q)
                        } catch (le) {
                            i(le, Z(H))
                        }
                        v.terminal && (g.terminal = !0, S = Math.max(S, v.priority))
                    }
                    return g.scope = T && T.scope === !0, g.transcludeOnThisElement = P, g.templateOnThisElement = V, g.transclude = U, p.hasElementTranscludeDirective = F, g
                }

                function R(e) {
                    for (var t = 0, n = e.length; n > t; t++) e[t] = h(e[t], {
                        $$isolateScope: !0
                    })
                }

                function U(t, r, o, a, s, u, f) {
                    if (r === s) return null;
                    var p = null;
                    if (l.hasOwnProperty(r))
                        for (var d, m = e.get(r + c), g = 0, v = m.length; v > g; g++) try {
                            d = m[g], (a === n || a > d.priority) && -1 != d.restrict.indexOf(o) && (u && (d = h(d, {
                                $$start: u,
                                $$end: f
                            })), t.push(d), p = d)
                        } catch ($) {
                            i($)
                        }
                    return p
                }

                function z(t) {
                    if (l.hasOwnProperty(t))
                        for (var n, r = e.get(t + c), i = 0, o = r.length; o > i; i++)
                            if (n = r[i], n.multiElement) return !0;
                    return !1
                }

                function W(e, t) {
                    var n = t.$attr,
                        r = e.$attr,
                        i = e.$$element;
                    o(e, function(r, i) {
                        "$" != i.charAt(0) && (t[i] && t[i] !== r && (r += ("style" === i ? ";" : " ") + t[i]), e.$set(i, r, !0, n[i]))
                    }), o(t, function(t, o) {
                        "class" == o ? (O(i, t), e["class"] = (e["class"] ? e["class"] + " " : "") + t) : "style" == o ? (i.attr("style", i.attr("style") + ";" + t), e.style = (e.style ? e.style + ";" : "") + t) : "$" == o.charAt(0) || e.hasOwnProperty(o) || (e[o] = t, r[o] = n[o])
                    })
                }

                function Y(e, t, n, r, i, s, u, l) {
                    var c, f, p = [],
                        d = t[0],
                        m = e.shift(),
                        g = h(m, {
                            templateUrl: null,
                            transclude: null,
                            replace: null,
                            $$originalDirective: m
                        }),
                        v = E(m.templateUrl) ? m.templateUrl(t, n) : m.templateUrl,
                        $ = m.templateNamespace;
                    return t.empty(), a(v).then(function(a) {
                            var h, y, b, x;
                            if (a = ue(a), m.replace) {
                                if (b = Ce(a) ? [] : ft(X($, Hr(a))), h = b[0], 1 != b.length || h.nodeType !== Yr) throw Ai("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", m.name, v);
                                y = {
                                    $attr: {}
                                }, te(r, t, h);
                                var C = L(h, [], y);
                                w(m.scope) && R(C), e = C.concat(e), W(n, y)
                            } else h = d, t.html(a);
                            for (e.unshift(g), c = H(e, h, n, i, t, m, s, u, l), o(r, function(e, n) {
                                    e == h && (r[n] = t[0])
                                }), f = N(t[0].childNodes, i); p.length;) {
                                var k = p.shift(),
                                    S = p.shift(),
                                    E = p.shift(),
                                    T = p.shift(),
                                    D = t[0];
                                if (!k.$$destroyed) {
                                    if (S !== d) {
                                        var A = S.className;
                                        l.hasElementTranscludeDirective && m.replace || (D = Ae(h)), te(E, Er(S), D), O(Er(D), A)
                                    }
                                    x = c.transcludeOnThisElement ? P(k, c.transclude, T) : T, c(f, k, D, r, x, c)
                                }
                            }
                            p = null
                        }),
                        function(e, t, n, r, i) {
                            var o = i;
                            t.$$destroyed || (p ? p.push(t, n, r, o) : (c.transcludeOnThisElement && (o = P(t, c.transclude, i)), c(f, t, n, r, o, c)))
                        }
                }

                function G(e, t) {
                    var n = t.priority - e.priority;
                    return 0 !== n ? n : e.name !== t.name ? e.name < t.name ? -1 : 1 : e.index - t.index
                }

                function K(e, t, n, r) {
                    function i(e) {
                        return e ? " (module: " + e + ")" : ""
                    }
                    if (t) throw Ai("multidir", "Multiple directives [{0}{1}, {2}{3}] asking for {4} on: {5}", t.name, i(t.$$moduleName), n.name, i(n.$$moduleName), e, Z(r))
                }

                function J(e, t) {
                    var n = r(t, !0);
                    n && e.push({
                        priority: 0,
                        compile: function(e) {
                            var t = e.parent(),
                                r = !!t.length;
                            return r && M.$$addBindingClass(t),
                                function(e, t) {
                                    var i = t.parent();
                                    r || M.$$addBindingClass(i), M.$$addBindingInfo(i, n.expressions), e.$watch(n, function(e) {
                                        t[0].nodeValue = e
                                    })
                                }
                        }
                    })
                }

                function X(e, n) {
                    switch (e = br(e || "html")) {
                        case "svg":
                        case "math":
                            var r = t.createElement("div");
                            return r.innerHTML = "<" + e + ">" + n + "</" + e + ">", r.childNodes[0].childNodes;
                        default:
                            return n
                    }
                }

                function Q(e, t) {
                    if ("srcdoc" == t) return S.HTML;
                    var n = V(e);
                    return "xlinkHref" == t || "form" == n && "action" == t || "img" != n && ("src" == t || "ngSrc" == t) ? S.RESOURCE_URL : void 0
                }

                function ee(e, t, n, i, o) {
                    var a = Q(e, i);
                    o = $[i] || o;
                    var s = r(n, !0, a, o);
                    if (s) {
                        if ("multiple" === i && "select" === V(e)) throw Ai("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", Z(e));
                        t.push({
                            priority: 100,
                            compile: function() {
                                return {
                                    pre: function(e, t, u) {
                                        var l = u.$$observers || (u.$$observers = {});
                                        if (x.test(i)) throw Ai("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                                        var c = u[i];
                                        c !== n && (s = c && r(c, !0, a, o), n = c), s && (u[i] = s(e), (l[i] || (l[i] = [])).$$inter = !0, (u.$$observers && u.$$observers[i].$$scope || e).$watch(s, function(e, t) {
                                            "class" === i && e != t ? u.$updateClass(e, t) : u.$set(i, e)
                                        }))
                                    }
                                }
                            }
                        })
                    }
                }

                function te(e, n, r) {
                    var i, o, a = n[0],
                        s = n.length,
                        u = a.parentNode;
                    if (e)
                        for (i = 0, o = e.length; o > i; i++)
                            if (e[i] == a) {
                                e[i++] = r;
                                for (var l = i, c = l + s - 1, f = e.length; f > l; l++, c++) f > c ? e[l] = e[c] : delete e[l];
                                e.length -= s - 1, e.context === a && (e.context = r);
                                break
                            }
                    u && u.replaceChild(r, a);
                    var p = t.createDocumentFragment();
                    p.appendChild(a), Er.hasData(a) && (Er(r).data(Er(a).data()), Tr ? (qr = !0, Tr.cleanData([a])) : delete Er.cache[a[Er.expando]]);
                    for (var d = 1, h = n.length; h > d; d++) {
                        var m = n[d];
                        Er(m).remove(), p.appendChild(m), delete n[d]
                    }
                    n[0] = r, n.length = 1
                }

                function ne(e, t) {
                    return f(function() {
                        return e.apply(null, arguments)
                    }, e, t)
                }

                function re(e, t, n, r, o, a) {
                    try {
                        e(t, n, r, o, a)
                    } catch (s) {
                        i(s, Z(n))
                    }
                }

                function ie(e, t, i, a, u, l) {
                    var c;
                    o(a, function(o, a) {
                        var l, f, p, d, h = o.attrName,
                            g = o.optional,
                            v = o.mode;
                        switch (wr.call(t, h) || (t[h] = n), v) {
                            case "@":
                                t[h] || g || (i[a] = n), t.$observe(h, function(e) {
                                    i[a] = e
                                }), t.$$observers[h].$$scope = e, t[h] && (i[a] = r(t[h])(e));
                                break;
                            case "=":
                                if (g && !t[h]) return;
                                f = s(t[h]), d = f.literal ? _ : function(e, t) {
                                    return e === t || e !== e && t !== t
                                }, p = f.assign || function() {
                                    throw l = i[a] = f(e), Ai("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", t[h], u.name)
                                }, l = i[a] = f(e);
                                var $ = function(t) {
                                    return d(t, i[a]) || (d(t, l) ? p(e, t = i[a]) : i[a] = t), l = t
                                };
                                $.$stateful = !0;
                                var y;
                                y = o.collection ? e.$watchCollection(t[h], $) : e.$watch(s(t[h], $), null, f.literal), c = c || [], c.push(y);
                                break;
                            case "&":
                                if (f = s(t[h]), f === m && g) break;
                                i[a] = function(t) {
                                    return f(e, t)
                                }
                        }
                    });
                    var f = c ? function() {
                        for (var e = 0, t = c.length; t > e; ++e) c[e]()
                    } : m;
                    return l && f !== m ? (l.$on("$destroy", f), m) : f
                }
                var oe = function(e, t) {
                    if (t) {
                        var n, r, i, o = Object.keys(t);
                        for (n = 0, r = o.length; r > n; n++) i = o[n], this[i] = t[i]
                    } else this.$attr = {};
                    this.$$element = e
                };
                oe.prototype = {
                    $normalize: lt,
                    $addClass: function(e) {
                        e && e.length > 0 && T.addClass(this.$$element, e)
                    },
                    $removeClass: function(e) {
                        e && e.length > 0 && T.removeClass(this.$$element, e)
                    },
                    $updateClass: function(e, t) {
                        var n = ct(e, t);
                        n && n.length && T.addClass(this.$$element, n);
                        var r = ct(t, e);
                        r && r.length && T.removeClass(this.$$element, r)
                    },
                    $set: function(e, t, r, a) {
                        var s, u = this.$$element[0],
                            l = Be(u, e),
                            c = ze(u, e),
                            f = e;
                        if (l ? (this.$$element.prop(e, t), a = l) : c && (this[c] = t, f = c), this[e] = t, a ? this.$attr[e] = a : (a = this.$attr[e], a || (this.$attr[e] = a = le(e, "-"))), s = V(this.$$element), "a" === s && "href" === e || "img" === s && "src" === e) this[e] = t = D(t, "src" === e);
                        else if ("img" === s && "srcset" === e) {
                            for (var p = "", d = Hr(t), h = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, m = /\s/.test(d) ? h : /(,)/, g = d.split(m), v = Math.floor(g.length / 2), $ = 0; v > $; $++) {
                                var y = 2 * $;
                                p += D(Hr(g[y]), !0), p += " " + Hr(g[y + 1])
                            }
                            var b = Hr(g[2 * $]).split(/\s/);
                            p += D(Hr(b[0]), !0), 2 === b.length && (p += " " + Hr(b[1])), this[e] = t = p
                        }
                        r !== !1 && (null === t || t === n ? this.$$element.removeAttr(a) : this.$$element.attr(a, t));
                        var w = this.$$observers;
                        w && o(w[f], function(e) {
                            try {
                                e(t)
                            } catch (n) {
                                i(n)
                            }
                        })
                    },
                    $observe: function(e, t) {
                        var n = this,
                            r = n.$$observers || (n.$$observers = ge()),
                            i = r[e] || (r[e] = []);
                        return i.push(t), v.$evalAsync(function() {
                                !i.$$inter && n.hasOwnProperty(e) && t(n[e])
                            }),
                            function() {
                                F(i, t)
                            }
                    }
                };
                var ae = r.startSymbol(),
                    se = r.endSymbol(),
                    ue = "{{" == ae || "}}" == se ? g : function(e) {
                        return e.replace(/\{\{/g, ae).replace(/}}/g, se)
                    },
                    ce = /^ngAttr[A-Z]/;
                return M.$$addBindingInfo = k ? function(e, t) {
                    var n = e.data("$binding") || [];
                    Vr(t) ? n = n.concat(t) : n.push(t), e.data("$binding", n)
                } : m, M.$$addBindingClass = k ? function(e) {
                    O(e, "ng-binding")
                } : m, M.$$addScopeInfo = k ? function(e, t, n, r) {
                    var i = n ? r ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope";
                    e.data(i, t)
                } : m, M.$$addScopeClass = k ? function(e, t) {
                    O(e, t ? "ng-isolate-scope" : "ng-scope")
                } : m, M
            }]
        }

        function lt(e) {
            return xe(e.replace(Oi, ""))
        }

        function ct(e, t) {
            var n = "",
                r = e.split(/\s+/),
                i = t.split(/\s+/);
            e: for (var o = 0; o < r.length; o++) {
                for (var a = r[o], s = 0; s < i.length; s++)
                    if (a == i[s]) continue e;
                n += (n.length > 0 ? " " : "") + a
            }
            return n
        }

        function ft(e) {
            e = Er(e);
            var t = e.length;
            if (1 >= t) return e;
            for (; t--;) {
                var n = e[t];
                n.nodeType === Jr && Or.call(e, t, 1)
            }
            return e
        }

        function pt(e, t) {
            if (t && C(t)) return t;
            if (C(e)) {
                var n = ji.exec(e);
                if (n) return n[3]
            }
        }

        function dt() {
            var e = {},
                t = !1;
            this.register = function(t, n) {
                de(t, "controller"), w(t) ? f(e, t) : e[t] = n
            }, this.allowGlobals = function() {
                t = !0
            }, this.$get = ["$injector", "$window", function(i, o) {
                function a(e, t, n, i) {
                    if (!e || !w(e.$scope)) throw r("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", i, t);
                    e.$scope[t] = n
                }
                return function(r, s, u, l) {
                    var c, p, d, h;
                    if (u = u === !0, l && C(l) && (h = l), C(r)) {
                        if (p = r.match(ji), !p) throw Mi("ctrlfmt", "Badly formed controller string '{0}'. Must match `__name__ as __id__` or `__name__`.", r);
                        d = p[1], h = h || p[3], r = e.hasOwnProperty(d) ? e[d] : he(s.$scope, d, !0) || (t ? he(o, d, !0) : n), pe(r, d, !0)
                    }
                    if (u) {
                        var m = (Vr(r) ? r[r.length - 1] : r).prototype;
                        c = Object.create(m || null), h && a(s, h, c, d || r.name);
                        var g;
                        return g = f(function() {
                            var e = i.invoke(r, c, s, d);
                            return e !== c && (w(e) || E(e)) && (c = e, h && a(s, h, c, d || r.name)), c
                        }, {
                            instance: c,
                            identifier: h
                        })
                    }
                    return c = i.instantiate(r, s, d), h && a(s, h, c, d || r.name), c
                }
            }]
        }

        function ht() {
            this.$get = ["$window", function(e) {
                return Er(e.document)
            }]
        }

        function mt() {
            this.$get = ["$log", function(e) {
                return function(t, n) {
                    e.error.apply(e, arguments)
                }
            }]
        }

        function gt(e) {
            return w(e) ? S(e) ? e.toISOString() : Y(e) : e
        }

        function vt() {
            this.$get = function() {
                return function(e) {
                    if (!e) return "";
                    var t = [];
                    return a(e, function(e, n) {
                        null === e || y(e) || (Vr(e) ? o(e, function(e, r) {
                            t.push(re(n) + "=" + re(gt(e)))
                        }) : t.push(re(n) + "=" + re(gt(e))))
                    }), t.join("&")
                }
            }
        }

        function $t() {
            this.$get = function() {
                return function(e) {
                    function t(e, r, i) {
                        null === e || y(e) || (Vr(e) ? o(e, function(e) {
                            t(e, r + "[]")
                        }) : w(e) && !S(e) ? a(e, function(e, n) {
                            t(e, r + (i ? "" : "[") + n + (i ? "" : "]"))
                        }) : n.push(re(r) + "=" + re(gt(e))))
                    }
                    if (!e) return "";
                    var n = [];
                    return t(e, "", !0), n.join("&")
                }
            }
        }

        function yt(e, t) {
            if (C(e)) {
                var n = e.replace(qi, "").trim();
                if (n) {
                    var r = t("Content-Type");
                    (r && 0 === r.indexOf(Ni) || bt(n)) && (e = G(n))
                }
            }
            return e
        }

        function bt(e) {
            var t = e.match(Li);
            return t && Ii[t[0]].test(e)
        }

        function wt(e) {
            function t(e, t) {
                e && (r[e] = r[e] ? r[e] + ", " + t : t)
            }
            var n, r = ge();
            return C(e) ? o(e.split("\n"), function(e) {
                n = e.indexOf(":"), t(br(Hr(e.substr(0, n))), Hr(e.substr(n + 1)))
            }) : w(e) && o(e, function(e, n) {
                t(br(n), Hr(e))
            }), r
        }

        function xt(e) {
            var t;
            return function(n) {
                if (t || (t = wt(e)), n) {
                    var r = t[br(n)];
                    return void 0 === r && (r = null), r
                }
                return t
            }
        }

        function Ct(e, t, n, r) {
            return E(r) ? r(e, t, n) : (o(r, function(r) {
                e = r(e, t, n)
            }), e)
        }

        function kt(e) {
            return e >= 200 && 300 > e
        }

        function St() {
            var e = this.defaults = {
                    transformResponse: [yt],
                    transformRequest: [function(e) {
                        return !w(e) || O(e) || j(e) || M(e) ? e : Y(e)
                    }],
                    headers: {
                        common: {
                            Accept: "application/json, text/plain, */*"
                        },
                        post: R(Pi),
                        put: R(Pi),
                        patch: R(Pi)
                    },
                    xsrfCookieName: "XSRF-TOKEN",
                    xsrfHeaderName: "X-XSRF-TOKEN",
                    paramSerializer: "$httpParamSerializer"
                },
                t = !1;
            this.useApplyAsync = function(e) {
                return b(e) ? (t = !!e, this) : t
            };
            var i = this.interceptors = [];
            this.$get = ["$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", function(a, s, u, l, c, p) {
                function d(t) {
                    function i(e) {
                        var t = f({}, e);
                        return t.data = e.data ? Ct(e.data, e.headers, e.status, u.transformResponse) : e.data, kt(e.status) ? t : c.reject(t)
                    }

                    function a(e, t) {
                        var n, r = {};
                        return o(e, function(e, i) {
                            E(e) ? (n = e(t), null != n && (r[i] = n)) : r[i] = e
                        }), r
                    }

                    function s(t) {
                        var n, r, i, o = e.headers,
                            s = f({}, t.headers);
                        o = f({}, o.common, o[br(t.method)]);
                        e: for (n in o) {
                            r = br(n);
                            for (i in s)
                                if (br(i) === r) continue e;
                            s[n] = o[n]
                        }
                        return a(s, R(t))
                    }
                    if (!Lr.isObject(t)) throw r("$http")("badreq", "Http request configuration must be an object.  Received: {0}", t);
                    var u = f({
                        method: "get",
                        transformRequest: e.transformRequest,
                        transformResponse: e.transformResponse,
                        paramSerializer: e.paramSerializer
                    }, t);
                    u.headers = s(t), u.method = xr(u.method), u.paramSerializer = C(u.paramSerializer) ? p.get(u.paramSerializer) : u.paramSerializer;
                    var l = function(t) {
                            var r = t.headers,
                                a = Ct(t.data, xt(r), n, t.transformRequest);
                            return y(a) && o(r, function(e, t) {
                                "content-type" === br(t) && delete r[t]
                            }), y(t.withCredentials) && !y(e.withCredentials) && (t.withCredentials = e.withCredentials), g(t, a).then(i, i)
                        },
                        d = [l, n],
                        h = c.when(u);
                    for (o(x, function(e) {
                            (e.request || e.requestError) && d.unshift(e.request, e.requestError), (e.response || e.responseError) && d.push(e.response, e.responseError)
                        }); d.length;) {
                        var m = d.shift(),
                            v = d.shift();
                        h = h.then(m, v)
                    }
                    return h.success = function(e) {
                        return pe(e, "fn"), h.then(function(t) {
                            e(t.data, t.status, t.headers, u)
                        }), h
                    }, h.error = function(e) {
                        return pe(e, "fn"), h.then(null, function(t) {
                            e(t.data, t.status, t.headers, u)
                        }), h
                    }, h
                }

                function h(e) {
                    o(arguments, function(e) {
                        d[e] = function(t, n) {
                            return d(f({}, n || {}, {
                                method: e,
                                url: t
                            }))
                        }
                    })
                }

                function m(e) {
                    o(arguments, function(e) {
                        d[e] = function(t, n, r) {
                            return d(f({}, r || {}, {
                                method: e,
                                url: t,
                                data: n
                            }))
                        }
                    })
                }

                function g(r, i) {
                    function o(e, n, r, i) {
                        function o() {
                            u(n, e, r, i)
                        }
                        h && (kt(e) ? h.put(k, [e, n, wt(r), i]) : h.remove(k)), t ? l.$applyAsync(o) : (o(), l.$$phase || l.$apply())
                    }

                    function u(e, t, n, i) {
                        t = Math.max(t, 0), (kt(t) ? g.resolve : g.reject)({
                            data: e,
                            status: t,
                            headers: xt(n),
                            config: r,
                            statusText: i
                        })
                    }

                    function f(e) {
                        u(e.data, e.status, R(e.headers()), e.statusText)
                    }

                    function p() {
                        var e = d.pendingRequests.indexOf(r); - 1 !== e && d.pendingRequests.splice(e, 1)
                    }
                    var h, m, g = c.defer(),
                        x = g.promise,
                        C = r.headers,
                        k = v(r.url, r.paramSerializer(r.params));
                    if (d.pendingRequests.push(r), x.then(p, p), !r.cache && !e.cache || r.cache === !1 || "GET" !== r.method && "JSONP" !== r.method || (h = w(r.cache) ? r.cache : w(e.cache) ? e.cache : $), h && (m = h.get(k), b(m) ? P(m) ? m.then(f, f) : Vr(m) ? u(m[1], m[0], R(m[2]), m[3]) : u(m, 200, {}, "OK") : h.put(k, x)), y(m)) {
                        var S = Tn(r.url) ? s()[r.xsrfCookieName || e.xsrfCookieName] : n;
                        S && (C[r.xsrfHeaderName || e.xsrfHeaderName] = S), a(r.method, k, i, o, C, r.timeout, r.withCredentials, r.responseType)
                    }
                    return x
                }

                function v(e, t) {
                    return t.length > 0 && (e += (-1 == e.indexOf("?") ? "?" : "&") + t), e
                }
                var $ = u("$http");
                e.paramSerializer = C(e.paramSerializer) ? p.get(e.paramSerializer) : e.paramSerializer;
                var x = [];
                return o(i, function(e) {
                    x.unshift(C(e) ? p.get(e) : p.invoke(e))
                }), d.pendingRequests = [], h("get", "delete", "head", "jsonp"), m("post", "put", "patch"), d.defaults = e, d
            }]
        }

        function Et() {
            return new e.XMLHttpRequest
        }

        function Tt() {
            this.$get = ["$browser", "$window", "$document", function(e, t, n) {
                return Dt(e, Et, e.defer, t.angular.callbacks, n[0])
            }]
        }

        function Dt(e, t, r, i, a) {
            function s(e, t, n) {
                var r = a.createElement("script"),
                    o = null;
                return r.type = "text/javascript", r.src = e, r.async = !0, o = function(e) {
                    ri(r, "load", o), ri(r, "error", o), a.body.removeChild(r), r = null;
                    var s = -1,
                        u = "unknown";
                    e && ("load" !== e.type || i[t].called || (e = {
                        type: "error"
                    }), u = e.type, s = "error" === e.type ? 404 : 200), n && n(s, u)
                }, ni(r, "load", o), ni(r, "error", o), a.body.appendChild(r), o
            }
            return function(a, u, l, c, f, p, d, h) {
                function g() {
                    y && y(), w && w.abort()
                }

                function v(t, i, o, a, s) {
                    k !== n && r.cancel(k), y = w = null, t(i, o, a, s), e.$$completeOutstandingRequest(m)
                }
                if (e.$$incOutstandingRequestCount(), u = u || e.url(), "jsonp" == br(a)) {
                    var $ = "_" + (i.counter++).toString(36);
                    i[$] = function(e) {
                        i[$].data = e, i[$].called = !0
                    };
                    var y = s(u.replace("JSON_CALLBACK", "angular.callbacks." + $), $, function(e, t) {
                        v(c, e, i[$].data, "", t), i[$] = m
                    })
                } else {
                    var w = t();
                    w.open(a, u, !0), o(f, function(e, t) {
                        b(e) && w.setRequestHeader(t, e)
                    }), w.onload = function() {
                        var e = w.statusText || "",
                            t = "response" in w ? w.response : w.responseText,
                            n = 1223 === w.status ? 204 : w.status;
                        0 === n && (n = t ? 200 : "file" == En(u).protocol ? 404 : 0), v(c, n, t, w.getAllResponseHeaders(), e)
                    };
                    var x = function() {
                        v(c, -1, null, null, "")
                    };
                    if (w.onerror = x, w.onabort = x, d && (w.withCredentials = !0), h) try {
                        w.responseType = h
                    } catch (C) {
                        if ("json" !== h) throw C
                    }
                    w.send(l)
                }
                if (p > 0) var k = r(g, p);
                else P(p) && p.then(g)
            }
        }

        function At() {
            var e = "{{",
                t = "}}";
            this.startSymbol = function(t) {
                return t ? (e = t, this) : e
            }, this.endSymbol = function(e) {
                return e ? (t = e, this) : t
            }, this.$get = ["$parse", "$exceptionHandler", "$sce", function(n, r, i) {
                function o(e) {
                    return "\\\\\\" + e
                }

                function a(n) {
                    return n.replace(p, e).replace(d, t)
                }

                function s(e) {
                    if (null == e) return "";
                    switch (typeof e) {
                        case "string":
                            break;
                        case "number":
                            e = "" + e;
                            break;
                        default:
                            e = Y(e)
                    }
                    return e
                }

                function u(o, u, p, d) {
                    function h(e) {
                        try {
                            return e = D(e), d && !b(e) ? e : s(e)
                        } catch (t) {
                            r(Vi.interr(o, t))
                        }
                    }
                    d = !!d;
                    for (var m, g, v, $ = 0, w = [], x = [], C = o.length, k = [], S = []; C > $;) {
                        if (-1 == (m = o.indexOf(e, $)) || -1 == (g = o.indexOf(t, m + l))) {
                            $ !== C && k.push(a(o.substring($)));
                            break
                        }
                        $ !== m && k.push(a(o.substring($, m))), v = o.substring(m + l, g), w.push(v), x.push(n(v, h)), $ = g + c, S.push(k.length), k.push("")
                    }
                    if (p && k.length > 1 && Vi.throwNoconcat(o), !u || w.length) {
                        var T = function(e) {
                                for (var t = 0, n = w.length; n > t; t++) {
                                    if (d && y(e[t])) return;
                                    k[S[t]] = e[t]
                                }
                                return k.join("")
                            },
                            D = function(e) {
                                return p ? i.getTrusted(p, e) : i.valueOf(e)
                            };
                        return f(function(e) {
                            var t = 0,
                                n = w.length,
                                i = new Array(n);
                            try {
                                for (; n > t; t++) i[t] = x[t](e);
                                return T(i)
                            } catch (a) {
                                r(Vi.interr(o, a))
                            }
                        }, {
                            exp: o,
                            expressions: w,
                            $$watchDelegate: function(e, t) {
                                var n;
                                return e.$watchGroup(x, function(r, i) {
                                    var o = T(r);
                                    E(t) && t.call(this, o, r !== i ? n : o, e), n = o
                                })
                            }
                        })
                    }
                }
                var l = e.length,
                    c = t.length,
                    p = new RegExp(e.replace(/./g, o), "g"),
                    d = new RegExp(t.replace(/./g, o), "g");
                return u.startSymbol = function() {
                    return e
                }, u.endSymbol = function() {
                    return t
                }, u
            }]
        }

        function Ot() {
            this.$get = ["$rootScope", "$window", "$q", "$$q", function(e, t, n, r) {
                function i(i, a, s, u) {
                    var l = arguments.length > 4,
                        c = l ? B(arguments, 4) : [],
                        f = t.setInterval,
                        p = t.clearInterval,
                        d = 0,
                        h = b(u) && !u,
                        m = (h ? r : n).defer(),
                        g = m.promise;
                    return s = b(s) ? s : 0, g.then(null, null, l ? function() {
                        i.apply(null, c)
                    } : i), g.$$intervalId = f(function() {
                        m.notify(d++), s > 0 && d >= s && (m.resolve(d), p(g.$$intervalId), delete o[g.$$intervalId]), h || e.$apply()
                    }, a), o[g.$$intervalId] = m, g
                }
                var o = {};
                return i.cancel = function(e) {
                    return e && e.$$intervalId in o ? (o[e.$$intervalId].reject("canceled"), t.clearInterval(e.$$intervalId), delete o[e.$$intervalId], !0) : !1
                }, i
            }]
        }

        function Mt() {
            this.$get = function() {
                return {
                    id: "en-us",
                    NUMBER_FORMATS: {
                        DECIMAL_SEP: ".",
                        GROUP_SEP: ",",
                        PATTERNS: [{
                            minInt: 1,
                            minFrac: 0,
                            maxFrac: 3,
                            posPre: "",
                            posSuf: "",
                            negPre: "-",
                            negSuf: "",
                            gSize: 3,
                            lgSize: 3
                        }, {
                            minInt: 1,
                            minFrac: 2,
                            maxFrac: 2,
                            posPre: "¤",
                            posSuf: "",
                            negPre: "(¤",
                            negSuf: ")",
                            gSize: 3,
                            lgSize: 3
                        }],
                        CURRENCY_SYM: "$"
                    },
                    DATETIME_FORMATS: {
                        MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
                        SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
                        DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
                        SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
                        AMPMS: ["AM", "PM"],
                        medium: "MMM d, y h:mm:ss a",
                        "short": "M/d/yy h:mm a",
                        fullDate: "EEEE, MMMM d, y",
                        longDate: "MMMM d, y",
                        mediumDate: "MMM d, y",
                        shortDate: "M/d/yy",
                        mediumTime: "h:mm:ss a",
                        shortTime: "h:mm a",
                        ERANAMES: ["Before Christ", "Anno Domini"],
                        ERAS: ["BC", "AD"]
                    },
                    pluralCat: function(e) {
                        return 1 === e ? "one" : "other"
                    }
                }
            }
        }

        function jt(e) {
            for (var t = e.split("/"), n = t.length; n--;) t[n] = ne(t[n]);
            return t.join("/")
        }

        function Nt(e, t) {
            var n = En(e);
            t.$$protocol = n.protocol, t.$$host = n.hostname, t.$$port = d(n.port) || Hi[n.protocol] || null
        }

        function Pt(e, t) {
            var n = "/" !== e.charAt(0);
            n && (e = "/" + e);
            var r = En(e);
            t.$$path = decodeURIComponent(n && "/" === r.pathname.charAt(0) ? r.pathname.substring(1) : r.pathname), t.$$search = ee(r.search), t.$$hash = decodeURIComponent(r.hash), t.$$path && "/" != t.$$path.charAt(0) && (t.$$path = "/" + t.$$path)
        }

        function Lt(e, t) {
            return 0 === t.indexOf(e) ? t.substr(e.length) : void 0
        }

        function It(e) {
            var t = e.indexOf("#");
            return -1 == t ? e : e.substr(0, t)
        }

        function qt(e) {
            return e.replace(/(#.+)|#$/, "$1")
        }

        function Vt(e) {
            return e.substr(0, It(e).lastIndexOf("/") + 1)
        }

        function Ft(e) {
            return e.substring(0, e.indexOf("/", e.indexOf("//") + 2))
        }

        function Ht(e, t) {
            this.$$html5 = !0, t = t || "";
            var r = Vt(e);
            Nt(e, this), this.$$parse = function(e) {
                var t = Lt(r, e);
                if (!C(t)) throw Ri("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', e, r);
                Pt(t, this), this.$$path || (this.$$path = "/"), this.$$compose()
            }, this.$$compose = function() {
                var e = te(this.$$search),
                    t = this.$$hash ? "#" + ne(this.$$hash) : "";
                this.$$url = jt(this.$$path) + (e ? "?" + e : "") + t, this.$$absUrl = r + this.$$url.substr(1)
            }, this.$$parseLinkUrl = function(i, o) {
                if (o && "#" === o[0]) return this.hash(o.slice(1)), !0;
                var a, s, u;
                return (a = Lt(e, i)) !== n ? (s = a, u = (a = Lt(t, a)) !== n ? r + (Lt("/", a) || a) : e + s) : (a = Lt(r, i)) !== n ? u = r + a : r == i + "/" && (u = r), u && this.$$parse(u), !!u
            }
        }

        function Rt(e, t) {
            var n = Vt(e);
            Nt(e, this), this.$$parse = function(r) {
                function i(e, t, n) {
                    var r, i = /^\/[A-Z]:(\/.*)/;
                    return 0 === t.indexOf(n) && (t = t.replace(n, "")), i.exec(t) ? e : (r = i.exec(e), r ? r[1] : e)
                }
                var o, a = Lt(e, r) || Lt(n, r);
                y(a) || "#" !== a.charAt(0) ? this.$$html5 ? o = a : (o = "", y(a) && (e = r, this.replace())) : (o = Lt(t, a), y(o) && (o = a)), Pt(o, this), this.$$path = i(this.$$path, o, e), this.$$compose()
            }, this.$$compose = function() {
                var n = te(this.$$search),
                    r = this.$$hash ? "#" + ne(this.$$hash) : "";
                this.$$url = jt(this.$$path) + (n ? "?" + n : "") + r, this.$$absUrl = e + (this.$$url ? t + this.$$url : "")
            }, this.$$parseLinkUrl = function(t, n) {
                return It(e) == It(t) ? (this.$$parse(t), !0) : !1
            }
        }

        function _t(e, t) {
            this.$$html5 = !0, Rt.apply(this, arguments);
            var n = Vt(e);
            this.$$parseLinkUrl = function(r, i) {
                if (i && "#" === i[0]) return this.hash(i.slice(1)), !0;
                var o, a;
                return e == It(r) ? o = r : (a = Lt(n, r)) ? o = e + t + a : n === r + "/" && (o = n), o && this.$$parse(o), !!o
            }, this.$$compose = function() {
                var n = te(this.$$search),
                    r = this.$$hash ? "#" + ne(this.$$hash) : "";
                this.$$url = jt(this.$$path) + (n ? "?" + n : "") + r, this.$$absUrl = e + t + this.$$url
            }
        }

        function Ut(e) {
            return function() {
                return this[e]
            }
        }

        function Bt(e, t) {
            return function(n) {
                return y(n) ? this[e] : (this[e] = t(n), this.$$compose(), this)
            }
        }

        function zt() {
            var e = "",
                t = {
                    enabled: !1,
                    requireBase: !0,
                    rewriteLinks: !0
                };
            this.hashPrefix = function(t) {
                return b(t) ? (e = t, this) : e
            }, this.html5Mode = function(e) {
                return N(e) ? (t.enabled = e, this) : w(e) ? (N(e.enabled) && (t.enabled = e.enabled), N(e.requireBase) && (t.requireBase = e.requireBase), N(e.rewriteLinks) && (t.rewriteLinks = e.rewriteLinks), this) : t
            }, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function(n, r, i, o, a) {
                function s(e, t, n) {
                    var i = l.url(),
                        o = l.$$state;
                    try {
                        r.url(e, t, n), l.$$state = r.state()
                    } catch (a) {
                        throw l.url(i), l.$$state = o, a
                    }
                }

                function u(e, t) {
                    n.$broadcast("$locationChangeSuccess", l.absUrl(), e, l.$$state, t)
                }
                var l, c, f, p = r.baseHref(),
                    d = r.url();
                if (t.enabled) {
                    if (!p && t.requireBase) throw Ri("nobase", "$location in HTML5 mode requires a <base> tag to be present!");
                    f = Ft(d) + (p || "/"), c = i.history ? Ht : _t
                } else f = It(d), c = Rt;
                l = new c(f, "#" + e), l.$$parseLinkUrl(d, d), l.$$state = r.state();
                var h = /^\s*(javascript|mailto):/i;
                o.on("click", function(e) {
                    if (t.rewriteLinks && !e.ctrlKey && !e.metaKey && !e.shiftKey && 2 != e.which && 2 != e.button) {
                        for (var i = Er(e.target);
                            "a" !== V(i[0]);)
                            if (i[0] === o[0] || !(i = i.parent())[0]) return;
                        var s = i.prop("href"),
                            u = i.attr("href") || i.attr("xlink:href");
                        w(s) && "[object SVGAnimatedString]" === s.toString() && (s = En(s.animVal).href), h.test(s) || !s || i.attr("target") || e.isDefaultPrevented() || l.$$parseLinkUrl(s, u) && (e.preventDefault(), l.absUrl() != r.url() && (n.$apply(), a.angular["ff-684208-preventDefault"] = !0))
                    }
                }), qt(l.absUrl()) != qt(d) && r.url(l.absUrl(), !0);
                var m = !0;
                return r.onUrlChange(function(e, t) {
                    n.$evalAsync(function() {
                        var r, i = l.absUrl(),
                            o = l.$$state;
                        l.$$parse(e), l.$$state = t, r = n.$broadcast("$locationChangeStart", e, i, t, o).defaultPrevented, l.absUrl() === e && (r ? (l.$$parse(i), l.$$state = o, s(i, !1, o)) : (m = !1, u(i, o)))
                    }), n.$$phase || n.$digest()
                }), n.$watch(function() {
                    var e = qt(r.url()),
                        t = qt(l.absUrl()),
                        o = r.state(),
                        a = l.$$replace,
                        c = e !== t || l.$$html5 && i.history && o !== l.$$state;
                    (m || c) && (m = !1, n.$evalAsync(function() {
                        var t = l.absUrl(),
                            r = n.$broadcast("$locationChangeStart", t, e, l.$$state, o).defaultPrevented;
                        l.absUrl() === t && (r ? (l.$$parse(e), l.$$state = o) : (c && s(t, a, o === l.$$state ? null : l.$$state), u(e, o)))
                    })), l.$$replace = !1
                }), l
            }]
        }

        function Wt() {
            var e = !0,
                t = this;
            this.debugEnabled = function(t) {
                return b(t) ? (e = t, this) : e
            }, this.$get = ["$window", function(n) {
                function r(e) {
                    return e instanceof Error && (e.stack ? e = e.message && -1 === e.stack.indexOf(e.message) ? "Error: " + e.message + "\n" + e.stack : e.stack : e.sourceURL && (e = e.message + "\n" + e.sourceURL + ":" + e.line)), e
                }

                function i(e) {
                    var t = n.console || {},
                        i = t[e] || t.log || m,
                        a = !1;
                    try {
                        a = !!i.apply
                    } catch (s) {}
                    return a ? function() {
                        var e = [];
                        return o(arguments, function(t) {
                            e.push(r(t))
                        }), i.apply(t, e)
                    } : function(e, t) {
                        i(e, null == t ? "" : t)
                    }
                }
                return {
                    log: i("log"),
                    info: i("info"),
                    warn: i("warn"),
                    error: i("error"),
                    debug: function() {
                        var n = i("debug");
                        return function() {
                            e && n.apply(t, arguments)
                        }
                    }()
                }
            }]
        }

        function Yt(e, t) {
            if ("__defineGetter__" === e || "__defineSetter__" === e || "__lookupGetter__" === e || "__lookupSetter__" === e || "__proto__" === e) throw Ui("isecfld", "Attempting to access a disallowed field in Angular expressions! Expression: {0}", t);
            return e
        }

        function Gt(e, t) {
            if (e) {
                if (e.constructor === e) throw Ui("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", t);
                if (e.window === e) throw Ui("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", t);
                if (e.children && (e.nodeName || e.prop && e.attr && e.find)) throw Ui("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", t);
                if (e === Object) throw Ui("isecobj", "Referencing Object in Angular expressions is disallowed! Expression: {0}", t)
            }
            return e
        }

        function Kt(e, t) {
            if (e) {
                if (e.constructor === e) throw Ui("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", t);
                if (e === Bi || e === zi || e === Wi) throw Ui("isecff", "Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}", t)
            }
        }

        function Jt(e, t) {
            return "undefined" != typeof e ? e : t
        }

        function Xt(e, t) {
            return "undefined" == typeof e ? t : "undefined" == typeof t ? e : e + t
        }

        function Zt(e, t) {
            var n = e(t);
            return !n.$stateful
        }

        function Qt(e, t) {
            var n, r;
            switch (e.type) {
                case Ji.Program:
                    n = !0, o(e.body, function(e) {
                        Qt(e.expression, t), n = n && e.expression.constant
                    }), e.constant = n;
                    break;
                case Ji.Literal:
                    e.constant = !0, e.toWatch = [];
                    break;
                case Ji.UnaryExpression:
                    Qt(e.argument, t), e.constant = e.argument.constant, e.toWatch = e.argument.toWatch;
                    break;
                case Ji.BinaryExpression:
                    Qt(e.left, t), Qt(e.right, t), e.constant = e.left.constant && e.right.constant, e.toWatch = e.left.toWatch.concat(e.right.toWatch);
                    break;
                case Ji.LogicalExpression:
                    Qt(e.left, t), Qt(e.right, t), e.constant = e.left.constant && e.right.constant, e.toWatch = e.constant ? [] : [e];
                    break;
                case Ji.ConditionalExpression:
                    Qt(e.test, t), Qt(e.alternate, t), Qt(e.consequent, t), e.constant = e.test.constant && e.alternate.constant && e.consequent.constant, e.toWatch = e.constant ? [] : [e];
                    break;
                case Ji.Identifier:
                    e.constant = !1, e.toWatch = [e];
                    break;
                case Ji.MemberExpression:
                    Qt(e.object, t), e.computed && Qt(e.property, t), e.constant = e.object.constant && (!e.computed || e.property.constant), e.toWatch = [e];
                    break;
                case Ji.CallExpression:
                    n = e.filter ? Zt(t, e.callee.name) : !1, r = [], o(e.arguments, function(e) {
                        Qt(e, t), n = n && e.constant, e.constant || r.push.apply(r, e.toWatch)
                    }), e.constant = n, e.toWatch = e.filter && Zt(t, e.callee.name) ? r : [e];
                    break;
                case Ji.AssignmentExpression:
                    Qt(e.left, t), Qt(e.right, t), e.constant = e.left.constant && e.right.constant, e.toWatch = [e];
                    break;
                case Ji.ArrayExpression:
                    n = !0, r = [], o(e.elements, function(e) {
                        Qt(e, t), n = n && e.constant, e.constant || r.push.apply(r, e.toWatch)
                    }), e.constant = n, e.toWatch = r;
                    break;
                case Ji.ObjectExpression:
                    n = !0, r = [], o(e.properties, function(e) {
                        Qt(e.value, t), n = n && e.value.constant, e.value.constant || r.push.apply(r, e.value.toWatch)
                    }), e.constant = n, e.toWatch = r;
                    break;
                case Ji.ThisExpression:
                    e.constant = !1, e.toWatch = []
            }
        }

        function en(e) {
            if (1 == e.length) {
                var t = e[0].expression,
                    r = t.toWatch;
                return 1 !== r.length ? r : r[0] !== t ? r : n
            }
        }

        function tn(e) {
            return e.type === Ji.Identifier || e.type === Ji.MemberExpression
        }

        function nn(e) {
            return 1 === e.body.length && tn(e.body[0].expression) ? {
                type: Ji.AssignmentExpression,
                left: e.body[0].expression,
                right: {
                    type: Ji.NGValueParameter
                },
                operator: "="
            } : void 0
        }

        function rn(e) {
            return 0 === e.body.length || 1 === e.body.length && (e.body[0].expression.type === Ji.Literal || e.body[0].expression.type === Ji.ArrayExpression || e.body[0].expression.type === Ji.ObjectExpression)
        }

        function on(e) {
            return e.constant
        }

        function an(e, t) {
            this.astBuilder = e, this.$filter = t
        }

        function sn(e, t) {
            this.astBuilder = e, this.$filter = t
        }

        function un(e, t, n, r) {
            Gt(e, r);
            for (var i, o = t.split("."), a = 0; o.length > 1; a++) {
                i = Yt(o.shift(), r);
                var s = Gt(e[i], r);
                s || (s = {}, e[i] = s), e = s
            }
            return i = Yt(o.shift(), r), Gt(e[i], r), e[i] = n, n
        }

        function ln(e) {
            return "constructor" == e
        }

        function cn(e) {
            return E(e.valueOf) ? e.valueOf() : Zi.call(e)
        }

        function fn() {
            var e = ge(),
                t = ge();
            this.$get = ["$filter", "$sniffer", function(r, i) {
                function a(e, t) {
                    return null == e || null == t ? e === t : "object" == typeof e && (e = cn(e), "object" == typeof e) ? !1 : e === t || e !== e && t !== t
                }

                function s(e, t, r, i, o) {
                    var s, u = i.inputs;
                    if (1 === u.length) {
                        var l = a;
                        return u = u[0], e.$watch(function(e) {
                            var t = u(e);
                            return a(t, l) || (s = i(e, n, n, [t]), l = t && cn(t)), s
                        }, t, r, o)
                    }
                    for (var c = [], f = [], p = 0, d = u.length; d > p; p++) c[p] = a, f[p] = null;
                    return e.$watch(function(e) {
                        for (var t = !1, r = 0, o = u.length; o > r; r++) {
                            var l = u[r](e);
                            (t || (t = !a(l, c[r]))) && (f[r] = l, c[r] = l && cn(l))
                        }
                        return t && (s = i(e, n, n, f)), s
                    }, t, r, o)
                }

                function u(e, t, n, r) {
                    var i, o;
                    return i = e.$watch(function(e) {
                        return r(e)
                    }, function(e, n, r) {
                        o = e, E(t) && t.apply(this, arguments), b(e) && r.$$postDigest(function() {
                            b(o) && i()
                        })
                    }, n)
                }

                function l(e, t, n, r) {
                    function i(e) {
                        var t = !0;
                        return o(e, function(e) {
                            b(e) || (t = !1)
                        }), t
                    }
                    var a, s;
                    return a = e.$watch(function(e) {
                        return r(e)
                    }, function(e, n, r) {
                        s = e, E(t) && t.call(this, e, n, r), i(e) && r.$$postDigest(function() {
                            i(s) && a()
                        })
                    }, n)
                }

                function c(e, t, n, r) {
                    var i;
                    return i = e.$watch(function(e) {
                        return r(e)
                    }, function(e, n, r) {
                        E(t) && t.apply(this, arguments), i()
                    }, n)
                }

                function f(e, t) {
                    if (!t) return e;
                    var n = e.$$watchDelegate,
                        r = n !== l && n !== u,
                        i = r ? function(n, r, i, o) {
                            var a = e(n, r, i, o);
                            return t(a, n, r)
                        } : function(n, r, i, o) {
                            var a = e(n, r, i, o),
                                s = t(a, n, r);
                            return b(a) ? s : a
                        };
                    return e.$$watchDelegate && e.$$watchDelegate !== s ? i.$$watchDelegate = e.$$watchDelegate : t.$stateful || (i.$$watchDelegate = s, i.inputs = e.inputs ? e.inputs : [e]), i
                }
                var p = {
                        csp: i.csp,
                        expensiveChecks: !1
                    },
                    d = {
                        csp: i.csp,
                        expensiveChecks: !0
                    };
                return function(n, i, o) {
                    var a, h, g;
                    switch (typeof n) {
                        case "string":
                            n = n.trim(), g = n;
                            var v = o ? t : e;
                            if (a = v[g], !a) {
                                ":" === n.charAt(0) && ":" === n.charAt(1) && (h = !0, n = n.substring(2));
                                var $ = o ? d : p,
                                    y = new Ki($),
                                    b = new Xi(y, r, $);
                                a = b.parse(n), a.constant ? a.$$watchDelegate = c : h ? a.$$watchDelegate = a.literal ? l : u : a.inputs && (a.$$watchDelegate = s), v[g] = a
                            }
                            return f(a, i);
                        case "function":
                            return f(n, i);
                        default:
                            return m
                    }
                }
            }]
        }

        function pn() {
            this.$get = ["$rootScope", "$exceptionHandler", function(e, t) {
                return hn(function(t) {
                    e.$evalAsync(t)
                }, t)
            }]
        }

        function dn() {
            this.$get = ["$browser", "$exceptionHandler", function(e, t) {
                return hn(function(t) {
                    e.defer(t)
                }, t)
            }]
        }

        function hn(e, t) {
            function i(e, t, n) {
                function r(t) {
                    return function(n) {
                        i || (i = !0, t.call(e, n))
                    }
                }
                var i = !1;
                return [r(t), r(n)]
            }

            function a() {
                this.$$state = {
                    status: 0
                }
            }

            function s(e, t) {
                return function(n) {
                    t.call(e, n)
                }
            }

            function u(e) {
                var r, i, o;
                o = e.pending, e.processScheduled = !1, e.pending = n;
                for (var a = 0, s = o.length; s > a; ++a) {
                    i = o[a][0], r = o[a][e.status];
                    try {
                        E(r) ? i.resolve(r(e.value)) : 1 === e.status ? i.resolve(e.value) : i.reject(e.value)
                    } catch (u) {
                        i.reject(u), t(u)
                    }
                }
            }

            function l(t) {
                !t.processScheduled && t.pending && (t.processScheduled = !0, e(function() {
                    u(t)
                }))
            }

            function c() {
                this.promise = new a, this.resolve = s(this, this.resolve), this.reject = s(this, this.reject), this.notify = s(this, this.notify)
            }

            function f(e) {
                var t = new c,
                    n = 0,
                    r = Vr(e) ? [] : {};
                return o(e, function(e, i) {
                    n++, v(e).then(function(e) {
                        r.hasOwnProperty(i) || (r[i] = e, --n || t.resolve(r))
                    }, function(e) {
                        r.hasOwnProperty(i) || t.reject(e)
                    })
                }), 0 === n && t.resolve(r), t.promise
            }
            var p = r("$q", TypeError),
                d = function() {
                    return new c
                };
            a.prototype = {
                then: function(e, t, n) {
                    var r = new c;
                    return this.$$state.pending = this.$$state.pending || [], this.$$state.pending.push([r, e, t, n]), this.$$state.status > 0 && l(this.$$state), r.promise
                },
                "catch": function(e) {
                    return this.then(null, e)
                },
                "finally": function(e, t) {
                    return this.then(function(t) {
                        return g(t, !0, e)
                    }, function(t) {
                        return g(t, !1, e)
                    }, t)
                }
            }, c.prototype = {
                resolve: function(e) {
                    this.promise.$$state.status || (e === this.promise ? this.$$reject(p("qcycle", "Expected promise to be resolved with value other than itself '{0}'", e)) : this.$$resolve(e))
                },
                $$resolve: function(e) {
                    var n, r;
                    r = i(this, this.$$resolve, this.$$reject);
                    try {
                        (w(e) || E(e)) && (n = e && e.then), E(n) ? (this.promise.$$state.status = -1, n.call(e, r[0], r[1], this.notify)) : (this.promise.$$state.value = e, this.promise.$$state.status = 1, l(this.promise.$$state))
                    } catch (o) {
                        r[1](o), t(o)
                    }
                },
                reject: function(e) {
                    this.promise.$$state.status || this.$$reject(e)
                },
                $$reject: function(e) {
                    this.promise.$$state.value = e, this.promise.$$state.status = 2, l(this.promise.$$state)
                },
                notify: function(n) {
                    var r = this.promise.$$state.pending;
                    this.promise.$$state.status <= 0 && r && r.length && e(function() {
                        for (var e, i, o = 0, a = r.length; a > o; o++) {
                            i = r[o][0], e = r[o][3];
                            try {
                                i.notify(E(e) ? e(n) : n)
                            } catch (s) {
                                t(s)
                            }
                        }
                    })
                }
            };
            var h = function(e) {
                    var t = new c;
                    return t.reject(e), t.promise
                },
                m = function(e, t) {
                    var n = new c;
                    return t ? n.resolve(e) : n.reject(e), n.promise
                },
                g = function(e, t, n) {
                    var r = null;
                    try {
                        E(n) && (r = n())
                    } catch (i) {
                        return m(i, !1)
                    }
                    return P(r) ? r.then(function() {
                        return m(e, t)
                    }, function(e) {
                        return m(e, !1)
                    }) : m(e, t)
                },
                v = function(e, t, n, r) {
                    var i = new c;
                    return i.resolve(e), i.promise.then(t, n, r)
                },
                $ = v,
                y = function b(e) {
                    function t(e) {
                        r.resolve(e)
                    }

                    function n(e) {
                        r.reject(e)
                    }
                    if (!E(e)) throw p("norslvr", "Expected resolverFn, got '{0}'", e);
                    if (!(this instanceof b)) return new b(e);
                    var r = new c;
                    return e(t, n), r.promise
                };
            return y.defer = d, y.reject = h, y.when = v, y.resolve = $, y.all = f, y
        }

        function mn() {
            this.$get = ["$window", "$timeout", function(e, t) {
                function n() {
                    for (var e = 0; e < c.length; e++) {
                        var t = c[e];
                        t && (c[e] = null, t())
                    }
                    l = c.length = 0
                }

                function r(e) {
                    var t = c.length;
                    return l++, c.push(e), 0 === t && (u = s(n)),
                        function() {
                            t >= 0 && (c[t] = null, t = null, 0 === --l && u && (u(), u = null, c.length = 0))
                        }
                }
                var i = e.requestAnimationFrame || e.webkitRequestAnimationFrame,
                    o = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.webkitCancelRequestAnimationFrame,
                    a = !!i,
                    s = a ? function(e) {
                        var t = i(e);
                        return function() {
                            o(t)
                        }
                    } : function(e) {
                        var n = t(e, 16.66, !1);
                        return function() {
                            t.cancel(n)
                        }
                    };
                r.supported = a;
                var u, l = 0,
                    c = [];
                return r
            }]
        }

        function gn() {
            function e(e) {
                function t() {
                    this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$id = u(), this.$$ChildScope = null
                }
                return t.prototype = e, t
            }
            var t = 10,
                n = r("$rootScope"),
                a = null,
                s = null;
            this.digestTtl = function(e) {
                return arguments.length && (t = e), t
            }, this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser", function(r, l, c, f) {
                function p(e) {
                    e.currentScope.$$destroyed = !0
                }

                function d() {
                    this.$id = u(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this.$root = this, this.$$destroyed = !1, this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$$isolateBindings = null
                }

                function h(e) {
                    if (k.$$phase) throw n("inprog", "{0} already in progress", k.$$phase);
                    k.$$phase = e
                }

                function g() {
                    k.$$phase = null
                }

                function v(e, t) {
                    do e.$$watchersCount += t; while (e = e.$parent)
                }

                function $(e, t, n) {
                    do e.$$listenerCount[n] -= t, 0 === e.$$listenerCount[n] && delete e.$$listenerCount[n]; while (e = e.$parent)
                }

                function b() {}

                function x() {
                    for (; D.length;) try {
                        D.shift()()
                    } catch (e) {
                        l(e)
                    }
                    s = null
                }

                function C() {
                    null === s && (s = f.defer(function() {
                        k.$apply(x)
                    }))
                }
                d.prototype = {
                    constructor: d,
                    $new: function(t, n) {
                        var r;
                        return n = n || this, t ? (r = new d, r.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = e(this)), r = new this.$$ChildScope), r.$parent = n, r.$$prevSibling = n.$$childTail, n.$$childHead ? (n.$$childTail.$$nextSibling = r, n.$$childTail = r) : n.$$childHead = n.$$childTail = r, (t || n != this) && r.$on("$destroy", p), r
                    },
                    $watch: function(e, t, n, r) {
                        var i = c(e);
                        if (i.$$watchDelegate) return i.$$watchDelegate(this, t, n, i, e);
                        var o = this,
                            s = o.$$watchers,
                            u = {
                                fn: t,
                                last: b,
                                get: i,
                                exp: r || e,
                                eq: !!n
                            };
                        return a = null, E(t) || (u.fn = m), s || (s = o.$$watchers = []), s.unshift(u), v(this, 1),
                            function() {
                                F(s, u) >= 0 && v(o, -1), a = null
                            }
                    },
                    $watchGroup: function(e, t) {
                        function n() {
                            u = !1, l ? (l = !1, t(i, i, s)) : t(i, r, s)
                        }
                        var r = new Array(e.length),
                            i = new Array(e.length),
                            a = [],
                            s = this,
                            u = !1,
                            l = !0;
                        if (!e.length) {
                            var c = !0;
                            return s.$evalAsync(function() {
                                    c && t(i, i, s)
                                }),
                                function() {
                                    c = !1
                                }
                        }
                        return 1 === e.length ? this.$watch(e[0], function(e, n, o) {
                            i[0] = e, r[0] = n, t(i, e === n ? i : r, o)
                        }) : (o(e, function(e, t) {
                            var o = s.$watch(e, function(e, o) {
                                i[t] = e, r[t] = o, u || (u = !0, s.$evalAsync(n))
                            });
                            a.push(o)
                        }), function() {
                            for (; a.length;) a.shift()()
                        })
                    },
                    $watchCollection: function(e, t) {
                        function n(e) {
                            o = e;
                            var t, n, r, s, u;
                            if (!y(o)) {
                                if (w(o))
                                    if (i(o)) {
                                        a !== d && (a = d, g = a.length = 0, f++), t = o.length, g !== t && (f++, a.length = g = t);
                                        for (var l = 0; t > l; l++) u = a[l], s = o[l], r = u !== u && s !== s, r || u === s || (f++, a[l] = s)
                                    } else {
                                        a !== h && (a = h = {}, g = 0, f++), t = 0;
                                        for (n in o) o.hasOwnProperty(n) && (t++, s = o[n], u = a[n], n in a ? (r = u !== u && s !== s, r || u === s || (f++, a[n] = s)) : (g++, a[n] = s, f++));
                                        if (g > t) {
                                            f++;
                                            for (n in a) o.hasOwnProperty(n) || (g--, delete a[n])
                                        }
                                    }
                                else a !== o && (a = o, f++);
                                return f
                            }
                        }

                        function r() {
                            if (m ? (m = !1, t(o, o, u)) : t(o, s, u), l)
                                if (w(o))
                                    if (i(o)) {
                                        s = new Array(o.length);
                                        for (var e = 0; e < o.length; e++) s[e] = o[e]
                                    } else {
                                        s = {};
                                        for (var n in o) wr.call(o, n) && (s[n] = o[n])
                                    }
                            else s = o
                        }
                        n.$stateful = !0;
                        var o, a, s, u = this,
                            l = t.length > 1,
                            f = 0,
                            p = c(e, n),
                            d = [],
                            h = {},
                            m = !0,
                            g = 0;
                        return this.$watch(p, r)
                    },
                    $digest: function() {
                        var e, r, i, o, u, c, p, d, m, v, $ = t,
                            y = this,
                            w = [];
                        h("$digest"), f.$$checkUrlChange(), this === k && null !== s && (f.defer.cancel(s), x()), a = null;
                        do {
                            for (c = !1, d = y; S.length;) {
                                try {
                                    v = S.shift(), v.scope.$eval(v.expression, v.locals)
                                } catch (C) {
                                    l(C)
                                }
                                a = null
                            }
                            e: do {
                                if (o = d.$$watchers)
                                    for (u = o.length; u--;) try {
                                        if (e = o[u])
                                            if ((r = e.get(d)) === (i = e.last) || (e.eq ? _(r, i) : "number" == typeof r && "number" == typeof i && isNaN(r) && isNaN(i))) {
                                                if (e === a) {
                                                    c = !1;
                                                    break e
                                                }
                                            } else c = !0, a = e, e.last = e.eq ? H(r, null) : r, e.fn(r, i === b ? r : i, d), 5 > $ && (m = 4 - $, w[m] || (w[m] = []), w[m].push({
                                                msg: E(e.exp) ? "fn: " + (e.exp.name || e.exp.toString()) : e.exp,
                                                newVal: r,
                                                oldVal: i
                                            }))
                                    } catch (C) {
                                        l(C)
                                    }
                                if (!(p = d.$$watchersCount && d.$$childHead || d !== y && d.$$nextSibling))
                                    for (; d !== y && !(p = d.$$nextSibling);) d = d.$parent
                            } while (d = p);
                            if ((c || S.length) && !$--) throw g(), n("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", t, w)
                        } while (c || S.length);
                        for (g(); T.length;) try {
                            T.shift()()
                        } catch (C) {
                            l(C)
                        }
                    },
                    $destroy: function() {
                        if (!this.$$destroyed) {
                            var e = this.$parent;
                            this.$broadcast("$destroy"), this.$$destroyed = !0, this === k && f.$$applicationDestroyed(), v(this, -this.$$watchersCount);
                            for (var t in this.$$listenerCount) $(this, this.$$listenerCount[t], t);
                            e && e.$$childHead == this && (e.$$childHead = this.$$nextSibling), e && e.$$childTail == this && (e.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = m, this.$on = this.$watch = this.$watchGroup = function() {
                                return m
                            }, this.$$listeners = {}, this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = this.$$watchers = null
                        }
                    },
                    $eval: function(e, t) {
                        return c(e)(this, t)
                    },
                    $evalAsync: function(e, t) {
                        k.$$phase || S.length || f.defer(function() {
                            S.length && k.$digest()
                        }), S.push({
                            scope: this,
                            expression: e,
                            locals: t
                        })
                    },
                    $$postDigest: function(e) {
                        T.push(e)
                    },
                    $apply: function(e) {
                        try {
                            return h("$apply"), this.$eval(e)
                        } catch (t) {
                            l(t)
                        } finally {
                            g();
                            try {
                                k.$digest()
                            } catch (t) {
                                throw l(t), t
                            }
                        }
                    },
                    $applyAsync: function(e) {
                        function t() {
                            n.$eval(e)
                        }
                        var n = this;
                        e && D.push(t), C()
                    },
                    $on: function(e, t) {
                        var n = this.$$listeners[e];
                        n || (this.$$listeners[e] = n = []), n.push(t);
                        var r = this;
                        do r.$$listenerCount[e] || (r.$$listenerCount[e] = 0), r.$$listenerCount[e]++; while (r = r.$parent);
                        var i = this;
                        return function() {
                            var r = n.indexOf(t); - 1 !== r && (n[r] = null, $(i, 1, e))
                        }
                    },
                    $emit: function(e, t) {
                        var n, r, i, o = [],
                            a = this,
                            s = !1,
                            u = {
                                name: e,
                                targetScope: a,
                                stopPropagation: function() {
                                    s = !0
                                },
                                preventDefault: function() {
                                    u.defaultPrevented = !0
                                },
                                defaultPrevented: !1
                            },
                            c = U([u], arguments, 1);
                        do {
                            for (n = a.$$listeners[e] || o, u.currentScope = a, r = 0, i = n.length; i > r; r++)
                                if (n[r]) try {
                                    n[r].apply(null, c)
                                } catch (f) {
                                    l(f)
                                } else n.splice(r, 1), r--, i--;
                            if (s) return u.currentScope = null, u;
                            a = a.$parent
                        } while (a);
                        return u.currentScope = null, u
                    },
                    $broadcast: function(e, t) {
                        var n = this,
                            r = n,
                            i = n,
                            o = {
                                name: e,
                                targetScope: n,
                                preventDefault: function() {
                                    o.defaultPrevented = !0
                                },
                                defaultPrevented: !1
                            };
                        if (!n.$$listenerCount[e]) return o;
                        for (var a, s, u, c = U([o], arguments, 1); r = i;) {
                            for (o.currentScope = r, a = r.$$listeners[e] || [], s = 0, u = a.length; u > s; s++)
                                if (a[s]) try {
                                    a[s].apply(null, c)
                                } catch (f) {
                                    l(f)
                                } else a.splice(s, 1), s--, u--;
                            if (!(i = r.$$listenerCount[e] && r.$$childHead || r !== n && r.$$nextSibling))
                                for (; r !== n && !(i = r.$$nextSibling);) r = r.$parent
                        }
                        return o.currentScope = null, o
                    }
                };
                var k = new d,
                    S = k.$$asyncQueue = [],
                    T = k.$$postDigestQueue = [],
                    D = k.$$applyAsyncQueue = [];
                return k
            }]
        }

        function vn() {
            var e = /^\s*(https?|ftp|mailto|tel|file):/,
                t = /^\s*((https?|ftp|file|blob):|data:image\/)/;
            this.aHrefSanitizationWhitelist = function(t) {
                return b(t) ? (e = t, this) : e
            }, this.imgSrcSanitizationWhitelist = function(e) {
                return b(e) ? (t = e, this) : t
            }, this.$get = function() {
                return function(n, r) {
                    var i, o = r ? t : e;
                    return i = En(n).href, "" === i || i.match(o) ? n : "unsafe:" + i
                }
            }
        }

        function $n(e) {
            if ("self" === e) return e;
            if (C(e)) {
                if (e.indexOf("***") > -1) throw Qi("iwcard", "Illegal sequence *** in string matcher.  String: {0}", e);
                return e = Rr(e).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), new RegExp("^" + e + "$")
            }
            if (T(e)) return new RegExp("^" + e.source + "$");
            throw Qi("imatcher", 'Matchers may only be "self", string patterns or RegExp objects')
        }

        function yn(e) {
            var t = [];
            return b(e) && o(e, function(e) {
                t.push($n(e))
            }), t
        }

        function bn() {
            this.SCE_CONTEXTS = eo;
            var e = ["self"],
                t = [];
            this.resourceUrlWhitelist = function(t) {
                return arguments.length && (e = yn(t)), e
            }, this.resourceUrlBlacklist = function(e) {
                return arguments.length && (t = yn(e)), t
            }, this.$get = ["$injector", function(r) {
                function i(e, t) {
                    return "self" === e ? Tn(t) : !!e.exec(t.href)
                }

                function o(n) {
                    var r, o, a = En(n.toString()),
                        s = !1;
                    for (r = 0, o = e.length; o > r; r++)
                        if (i(e[r], a)) {
                            s = !0;
                            break
                        }
                    if (s)
                        for (r = 0, o = t.length; o > r; r++)
                            if (i(t[r], a)) {
                                s = !1;
                                break
                            }
                    return s
                }

                function a(e) {
                    var t = function(e) {
                        this.$$unwrapTrustedValue = function() {
                            return e
                        }
                    };
                    return e && (t.prototype = new e), t.prototype.valueOf = function() {
                        return this.$$unwrapTrustedValue()
                    }, t.prototype.toString = function() {
                        return this.$$unwrapTrustedValue().toString()
                    }, t
                }

                function s(e, t) {
                    var r = p.hasOwnProperty(e) ? p[e] : null;
                    if (!r) throw Qi("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", e, t);
                    if (null === t || t === n || "" === t) return t;
                    if ("string" != typeof t) throw Qi("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", e);
                    return new r(t)
                }

                function u(e) {
                    return e instanceof f ? e.$$unwrapTrustedValue() : e
                }

                function l(e, t) {
                    if (null === t || t === n || "" === t) return t;
                    var r = p.hasOwnProperty(e) ? p[e] : null;
                    if (r && t instanceof r) return t.$$unwrapTrustedValue();
                    if (e === eo.RESOURCE_URL) {
                        if (o(t)) return t;
                        throw Qi("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", t.toString())
                    }
                    if (e === eo.HTML) return c(t);
                    throw Qi("unsafe", "Attempting to use an unsafe value in a safe context.")
                }
                var c = function(e) {
                    throw Qi("unsafe", "Attempting to use an unsafe value in a safe context.")
                };
                r.has("$sanitize") && (c = r.get("$sanitize"));
                var f = a(),
                    p = {};
                return p[eo.HTML] = a(f), p[eo.CSS] = a(f), p[eo.URL] = a(f), p[eo.JS] = a(f), p[eo.RESOURCE_URL] = a(p[eo.URL]), {
                    trustAs: s,
                    getTrusted: l,
                    valueOf: u
                }
            }]
        }

        function wn() {
            var e = !0;
            this.enabled = function(t) {
                return arguments.length && (e = !!t), e
            }, this.$get = ["$parse", "$sceDelegate", function(t, n) {
                if (e && 8 > Sr) throw Qi("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
                var r = R(eo);
                r.isEnabled = function() {
                    return e
                }, r.trustAs = n.trustAs, r.getTrusted = n.getTrusted, r.valueOf = n.valueOf, e || (r.trustAs = r.getTrusted = function(e, t) {
                    return t
                }, r.valueOf = g), r.parseAs = function(e, n) {
                    var i = t(n);
                    return i.literal && i.constant ? i : t(n, function(t) {
                        return r.getTrusted(e, t)
                    })
                };
                var i = r.parseAs,
                    a = r.getTrusted,
                    s = r.trustAs;
                return o(eo, function(e, t) {
                    var n = br(t);
                    r[xe("parse_as_" + n)] = function(t) {
                        return i(e, t)
                    }, r[xe("get_trusted_" + n)] = function(t) {
                        return a(e, t)
                    }, r[xe("trust_as_" + n)] = function(t) {
                        return s(e, t)
                    }
                }), r
            }]
        }

        function xn() {
            this.$get = ["$window", "$document", function(e, t) {
                var n, r, i = {},
                    o = d((/android (\d+)/.exec(br((e.navigator || {}).userAgent)) || [])[1]),
                    a = /Boxee/i.test((e.navigator || {}).userAgent),
                    s = t[0] || {},
                    u = /^(Moz|webkit|ms)(?=[A-Z])/,
                    l = s.body && s.body.style,
                    c = !1,
                    f = !1;
                if (l) {
                    for (var p in l)
                        if (r = u.exec(p)) {
                            n = r[0], n = n.substr(0, 1).toUpperCase() + n.substr(1);
                            break
                        }
                    n || (n = "WebkitOpacity" in l && "webkit"), c = !!("transition" in l || n + "Transition" in l), f = !!("animation" in l || n + "Animation" in l), !o || c && f || (c = C(l.webkitTransition), f = C(l.webkitAnimation))
                }
                return {
                    history: !(!e.history || !e.history.pushState || 4 > o || a),
                    hasEvent: function(e) {
                        if ("input" === e && 11 >= Sr) return !1;
                        if (y(i[e])) {
                            var t = s.createElement("div");
                            i[e] = "on" + e in t
                        }
                        return i[e]
                    },
                    csp: _r(),
                    vendorPrefix: n,
                    transitions: c,
                    animations: f,
                    android: o
                }
            }]
        }

        function Cn() {
            this.$get = ["$templateCache", "$http", "$q", "$sce", function(e, t, n, r) {
                function i(o, a) {
                    function s(e) {
                        if (!a) throw Ai("tpload", "Failed to load template: {0} (HTTP status: {1} {2})", o, e.status, e.statusText);
                        return n.reject(e)
                    }
                    i.totalPendingRequests++, C(o) && e.get(o) || (o = r.getTrustedResourceUrl(o));
                    var u = t.defaults && t.defaults.transformResponse;
                    Vr(u) ? u = u.filter(function(e) {
                        return e !== yt
                    }) : u === yt && (u = null);
                    var l = {
                        cache: e,
                        transformResponse: u
                    };
                    return t.get(o, l)["finally"](function() {
                        i.totalPendingRequests--
                    }).then(function(t) {
                        return e.put(o, t.data), t.data
                    }, s)
                }
                return i.totalPendingRequests = 0, i
            }]
        }

        function kn() {
            this.$get = ["$rootScope", "$browser", "$location", function(e, t, n) {
                var r = {};
                return r.findBindings = function(e, t, n) {
                    var r = e.getElementsByClassName("ng-binding"),
                        i = [];
                    return o(r, function(e) {
                        var r = Lr.element(e).data("$binding");
                        r && o(r, function(r) {
                            if (n) {
                                var o = new RegExp("(^|\\s)" + Rr(t) + "(\\s|\\||$)");
                                o.test(r) && i.push(e)
                            } else -1 != r.indexOf(t) && i.push(e)
                        })
                    }), i
                }, r.findModels = function(e, t, n) {
                    for (var r = ["ng-", "data-ng-", "ng\\:"], i = 0; i < r.length; ++i) {
                        var o = n ? "=" : "*=",
                            a = "[" + r[i] + "model" + o + '"' + t + '"]',
                            s = e.querySelectorAll(a);
                        if (s.length) return s
                    }
                }, r.getLocation = function() {
                    return n.url()
                }, r.setLocation = function(t) {
                    t !== n.url() && (n.url(t), e.$digest())
                }, r.whenStable = function(e) {
                    t.notifyWhenNoOutstandingRequests(e)
                }, r
            }]
        }

        function Sn() {
            this.$get = ["$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function(e, t, n, r, i) {
                function o(o, s, u) {
                    E(o) || (u = s, s = o, o = m);
                    var l, c = B(arguments, 3),
                        f = b(u) && !u,
                        p = (f ? r : n).defer(),
                        d = p.promise;
                    return l = t.defer(function() {
                        try {
                            p.resolve(o.apply(null, c))
                        } catch (t) {
                            p.reject(t), i(t)
                        } finally {
                            delete a[d.$$timeoutId]
                        }
                        f || e.$apply()
                    }, s), d.$$timeoutId = l, a[l] = p, d
                }
                var a = {};
                return o.cancel = function(e) {
                    return e && e.$$timeoutId in a ? (a[e.$$timeoutId].reject("canceled"), delete a[e.$$timeoutId], t.defer.cancel(e.$$timeoutId)) : !1
                }, o
            }]
        }

        function En(e) {
            var t = e;
            return Sr && (to.setAttribute("href", t), t = to.href), to.setAttribute("href", t), {
                href: to.href,
                protocol: to.protocol ? to.protocol.replace(/:$/, "") : "",
                host: to.host,
                search: to.search ? to.search.replace(/^\?/, "") : "",
                hash: to.hash ? to.hash.replace(/^#/, "") : "",
                hostname: to.hostname,
                port: to.port,
                pathname: "/" === to.pathname.charAt(0) ? to.pathname : "/" + to.pathname
            }
        }

        function Tn(e) {
            var t = C(e) ? En(e) : e;
            return t.protocol === no.protocol && t.host === no.host
        }

        function Dn() {
            this.$get = v(e)
        }

        function An(e) {
            function t(e) {
                try {
                    return decodeURIComponent(e)
                } catch (t) {
                    return e
                }
            }
            var r = e[0] || {},
                i = {},
                o = "";
            return function() {
                var e, a, s, u, l, c = r.cookie || "";
                if (c !== o)
                    for (o = c, e = o.split("; "), i = {}, s = 0; s < e.length; s++) a = e[s], u = a.indexOf("="), u > 0 && (l = t(a.substring(0, u)), i[l] === n && (i[l] = t(a.substring(u + 1))));
                return i
            }
        }

        function On() {
            this.$get = An
        }

        function Mn(e) {
            function t(r, i) {
                if (w(r)) {
                    var a = {};
                    return o(r, function(e, n) {
                        a[n] = t(n, e)
                    }), a
                }
                return e.factory(r + n, i)
            }
            var n = "Filter";
            this.register = t, this.$get = ["$injector", function(e) {
                return function(t) {
                    return e.get(t + n)
                }
            }], t("currency", In), t("date", Kn), t("filter", jn), t("json", Jn), t("limitTo", Xn), t("lowercase", so), t("number", qn), t("orderBy", Zn), t("uppercase", uo)
        }

        function jn() {
            return function(e, t, n) {
                if (!i(e)) {
                    if (null == e) return e;
                    throw r("filter")("notarray", "Expected array but received: {0}", e)
                }
                var o, a, s = Ln(t);
                switch (s) {
                    case "function":
                        o = t;
                        break;
                    case "boolean":
                    case "null":
                    case "number":
                    case "string":
                        a = !0;
                    case "object":
                        o = Nn(t, n, a);
                        break;
                    default:
                        return e
                }
                return Array.prototype.filter.call(e, o)
            }
        }

        function Nn(e, t, n) {
            var r, i = w(e) && "$" in e;
            return t === !0 ? t = _ : E(t) || (t = function(e, t) {
                return y(e) ? !1 : null === e || null === t ? e === t : w(t) || w(e) && !$(e) ? !1 : (e = br("" + e), t = br("" + t), -1 !== e.indexOf(t))
            }), r = function(r) {
                return i && !w(r) ? Pn(r, e.$, t, !1) : Pn(r, e, t, n)
            }
        }

        function Pn(e, t, n, r, i) {
            var o = Ln(e),
                a = Ln(t);
            if ("string" === a && "!" === t.charAt(0)) return !Pn(e, t.substring(1), n, r);
            if (Vr(e)) return e.some(function(e) {
                return Pn(e, t, n, r)
            });
            switch (o) {
                case "object":
                    var s;
                    if (r) {
                        for (s in e)
                            if ("$" !== s.charAt(0) && Pn(e[s], t, n, !0)) return !0;
                        return i ? !1 : Pn(e, t, n, !1)
                    }
                    if ("object" === a) {
                        for (s in t) {
                            var u = t[s];
                            if (!E(u) && !y(u)) {
                                var l = "$" === s,
                                    c = l ? e : e[s];
                                if (!Pn(c, u, n, l, l)) return !1
                            }
                        }
                        return !0
                    }
                    return n(e, t);
                case "function":
                    return !1;
                default:
                    return n(e, t)
            }
        }

        function Ln(e) {
            return null === e ? "null" : typeof e
        }

        function In(e) {
            var t = e.NUMBER_FORMATS;
            return function(e, n, r) {
                return y(n) && (n = t.CURRENCY_SYM), y(r) && (r = t.PATTERNS[1].maxFrac), null == e ? e : Vn(e, t.PATTERNS[1], t.GROUP_SEP, t.DECIMAL_SEP, r).replace(/\u00A4/g, n)
            }
        }

        function qn(e) {
            var t = e.NUMBER_FORMATS;
            return function(e, n) {
                return null == e ? e : Vn(e, t.PATTERNS[0], t.GROUP_SEP, t.DECIMAL_SEP, n)
            }
        }

        function Vn(e, t, n, r, i) {
            if (w(e)) return "";
            var o = 0 > e;
            e = Math.abs(e);
            var a = e === 1 / 0;
            if (!a && !isFinite(e)) return "";
            var s = e + "",
                u = "",
                l = !1,
                c = [];
            if (a && (u = "∞"), !a && -1 !== s.indexOf("e")) {
                var f = s.match(/([\d\.]+)e(-?)(\d+)/);
                f && "-" == f[2] && f[3] > i + 1 ? e = 0 : (u = s, l = !0)
            }
            if (a || l) i > 0 && 1 > e && (u = e.toFixed(i), e = parseFloat(u));
            else {
                var p = (s.split(ro)[1] || "").length;
                y(i) && (i = Math.min(Math.max(t.minFrac, p), t.maxFrac)), e = +(Math.round(+(e.toString() + "e" + i)).toString() + "e" + -i);
                var d = ("" + e).split(ro),
                    h = d[0];
                d = d[1] || "";
                var m, g = 0,
                    v = t.lgSize,
                    $ = t.gSize;
                if (h.length >= v + $)
                    for (g = h.length - v, m = 0; g > m; m++)(g - m) % $ === 0 && 0 !== m && (u += n), u += h.charAt(m);
                for (m = g; m < h.length; m++)(h.length - m) % v === 0 && 0 !== m && (u += n), u += h.charAt(m);
                for (; d.length < i;) d += "0";
                i && "0" !== i && (u += r + d.substr(0, i))
            }
            return 0 === e && (o = !1), c.push(o ? t.negPre : t.posPre, u, o ? t.negSuf : t.posSuf), c.join("")
        }

        function Fn(e, t, n) {
            var r = "";
            for (0 > e && (r = "-", e = -e), e = "" + e; e.length < t;) e = "0" + e;
            return n && (e = e.substr(e.length - t)), r + e
        }

        function Hn(e, t, n, r) {
            return n = n || 0,
                function(i) {
                    var o = i["get" + e]();
                    return (n > 0 || o > -n) && (o += n), 0 === o && -12 == n && (o = 12), Fn(o, t, r)
                }
        }

        function Rn(e, t) {
            return function(n, r) {
                var i = n["get" + e](),
                    o = xr(t ? "SHORT" + e : e);
                return r[o][i]
            }
        }

        function _n(e, t, n) {
            var r = -1 * n,
                i = r >= 0 ? "+" : "";
            return i += Fn(Math[r > 0 ? "floor" : "ceil"](r / 60), 2) + Fn(Math.abs(r % 60), 2)
        }

        function Un(e) {
            var t = new Date(e, 0, 1).getDay();
            return new Date(e, 0, (4 >= t ? 5 : 12) - t)
        }

        function Bn(e) {
            return new Date(e.getFullYear(), e.getMonth(), e.getDate() + (4 - e.getDay()))
        }

        function zn(e) {
            return function(t) {
                var n = Un(t.getFullYear()),
                    r = Bn(t),
                    i = +r - +n,
                    o = 1 + Math.round(i / 6048e5);
                return Fn(o, e)
            }
        }

        function Wn(e, t) {
            return e.getHours() < 12 ? t.AMPMS[0] : t.AMPMS[1]
        }

        function Yn(e, t) {
            return e.getFullYear() <= 0 ? t.ERAS[0] : t.ERAS[1]
        }

        function Gn(e, t) {
            return e.getFullYear() <= 0 ? t.ERANAMES[0] : t.ERANAMES[1]
        }

        function Kn(e) {
            function t(e) {
                var t;
                if (t = e.match(n)) {
                    var r = new Date(0),
                        i = 0,
                        o = 0,
                        a = t[8] ? r.setUTCFullYear : r.setFullYear,
                        s = t[8] ? r.setUTCHours : r.setHours;
                    t[9] && (i = d(t[9] + t[10]), o = d(t[9] + t[11])), a.call(r, d(t[1]), d(t[2]) - 1, d(t[3]));
                    var u = d(t[4] || 0) - i,
                        l = d(t[5] || 0) - o,
                        c = d(t[6] || 0),
                        f = Math.round(1e3 * parseFloat("0." + (t[7] || 0)));
                    return s.call(r, u, l, c, f), r
                }
                return e
            }
            var n = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
            return function(n, r, i) {
                var a, s, u = "",
                    l = [];
                if (r = r || "mediumDate", r = e.DATETIME_FORMATS[r] || r, C(n) && (n = ao.test(n) ? d(n) : t(n)), k(n) && (n = new Date(n)), !S(n) || !isFinite(n.getTime())) return n;
                for (; r;) s = oo.exec(r), s ? (l = U(l, s, 1), r = l.pop()) : (l.push(r), r = null);
                var c = n.getTimezoneOffset();
                return i && (c = K(i, n.getTimezoneOffset()), n = X(n, i, !0)), o(l, function(t) {
                    a = io[t], u += a ? a(n, e.DATETIME_FORMATS, c) : t.replace(/(^'|'$)/g, "").replace(/''/g, "'")
                }), u
            }
        }

        function Jn() {
            return function(e, t) {
                return y(t) && (t = 2), Y(e, t)
            }
        }

        function Xn() {
            return function(e, t, n) {
                return t = Math.abs(Number(t)) === 1 / 0 ? Number(t) : d(t), isNaN(t) ? e : (k(e) && (e = e.toString()), Vr(e) || C(e) ? (n = !n || isNaN(n) ? 0 : d(n), n = 0 > n && n >= -e.length ? e.length + n : n, t >= 0 ? e.slice(n, n + t) : 0 === n ? e.slice(t, e.length) : e.slice(Math.max(0, n + t), n)) : e)
            }
        }

        function Zn(e) {
            function t(t, n) {
                return n = n ? -1 : 1, t.map(function(t) {
                    var r = 1,
                        i = g;
                    if (E(t)) i = t;
                    else if (C(t) && (("+" == t.charAt(0) || "-" == t.charAt(0)) && (r = "-" == t.charAt(0) ? -1 : 1, t = t.substring(1)), "" !== t && (i = e(t), i.constant))) {
                        var o = i();
                        i = function(e) {
                            return e[o]
                        }
                    }
                    return {
                        get: i,
                        descending: r * n
                    }
                })
            }

            function n(e) {
                switch (typeof e) {
                    case "number":
                    case "boolean":
                    case "string":
                        return !0;
                    default:
                        return !1
                }
            }

            function r(e, t) {
                return "function" == typeof e.valueOf && (e = e.valueOf(), n(e)) ? e : $(e) && (e = e.toString(), n(e)) ? e : t
            }

            function o(e, t) {
                var n = typeof e;
                return null === e ? (n = "string", e = "null") : "string" === n ? e = e.toLowerCase() : "object" === n && (e = r(e, t)), {
                    value: e,
                    type: n
                }
            }

            function a(e, t) {
                var n = 0;
                return e.type === t.type ? e.value !== t.value && (n = e.value < t.value ? -1 : 1) : n = e.type < t.type ? -1 : 1, n
            }
            return function(e, n, r) {
                function s(e, t) {
                    return {
                        value: e,
                        predicateValues: l.map(function(n) {
                            return o(n.get(e), t)
                        })
                    }
                }

                function u(e, t) {
                    for (var n = 0, r = 0, i = l.length; i > r && !(n = a(e.predicateValues[r], t.predicateValues[r]) * l[r].descending); ++r);
                    return n
                }
                if (!i(e)) return e;
                Vr(n) || (n = [n]), 0 === n.length && (n = ["+"]);
                var l = t(n, r),
                    c = Array.prototype.map.call(e, s);
                return c.sort(u), e = c.map(function(e) {
                    return e.value
                })
            }
        }

        function Qn(e) {
            return E(e) && (e = {
                link: e
            }), e.restrict = e.restrict || "AC", v(e)
        }

        function er(e, t) {
            e.$name = t
        }

        function tr(e, t, r, i, a) {
            var s = this,
                u = [],
                l = s.$$parentForm = e.parent().controller("form") || fo;
            s.$error = {}, s.$$success = {}, s.$pending = n, s.$name = a(t.name || t.ngForm || "")(r), s.$dirty = !1, s.$pristine = !0, s.$valid = !0, s.$invalid = !1, s.$submitted = !1, l.$addControl(s), s.$rollbackViewValue = function() {
                o(u, function(e) {
                    e.$rollbackViewValue()
                })
            }, s.$commitViewValue = function() {
                o(u, function(e) {
                    e.$commitViewValue()
                })
            }, s.$addControl = function(e) {
                de(e.$name, "input"), u.push(e), e.$name && (s[e.$name] = e)
            }, s.$$renameControl = function(e, t) {
                var n = e.$name;
                s[n] === e && delete s[n], s[t] = e, e.$name = t
            }, s.$removeControl = function(e) {
                e.$name && s[e.$name] === e && delete s[e.$name], o(s.$pending, function(t, n) {
                    s.$setValidity(n, null, e)
                }), o(s.$error, function(t, n) {
                    s.$setValidity(n, null, e)
                }), o(s.$$success, function(t, n) {
                    s.$setValidity(n, null, e)
                }), F(u, e)
            }, gr({
                ctrl: this,
                $element: e,
                set: function(e, t, n) {
                    var r = e[t];
                    if (r) {
                        var i = r.indexOf(n); - 1 === i && r.push(n)
                    } else e[t] = [n]
                },
                unset: function(e, t, n) {
                    var r = e[t];
                    r && (F(r, n), 0 === r.length && delete e[t])
                },
                parentForm: l,
                $animate: i
            }), s.$setDirty = function() {
                i.removeClass(e, Go), i.addClass(e, Ko), s.$dirty = !0, s.$pristine = !1, l.$setDirty()
            }, s.$setPristine = function() {
                i.setClass(e, Go, Ko + " " + po), s.$dirty = !1, s.$pristine = !0, s.$submitted = !1, o(u, function(e) {
                    e.$setPristine()
                })
            }, s.$setUntouched = function() {
                o(u, function(e) {
                    e.$setUntouched()
                })
            }, s.$setSubmitted = function() {
                i.addClass(e, po), s.$submitted = !0, l.$setSubmitted()
            }
        }

        function nr(e) {
            e.$formatters.push(function(t) {
                return e.$isEmpty(t) ? t : t.toString()
            })
        }

        function rr(e, t, n, r, i, o) {
            ir(e, t, n, r, i, o), nr(r)
        }

        function ir(e, t, n, r, i, o) {
            var a = br(t[0].type);
            if (!i.android) {
                var s = !1;
                t.on("compositionstart", function(e) {
                    s = !0
                }), t.on("compositionend", function() {
                    s = !1, u()
                })
            }
            var u = function(e) {
                if (l && (o.defer.cancel(l), l = null), !s) {
                    var i = t.val(),
                        u = e && e.type;
                    "password" === a || n.ngTrim && "false" === n.ngTrim || (i = Hr(i)), (r.$viewValue !== i || "" === i && r.$$hasNativeValidators) && r.$setViewValue(i, u)
                }
            };
            if (i.hasEvent("input")) t.on("input", u);
            else {
                var l, c = function(e, t, n) {
                    l || (l = o.defer(function() {
                        l = null, t && t.value === n || u(e)
                    }))
                };
                t.on("keydown", function(e) {
                    var t = e.keyCode;
                    91 === t || t > 15 && 19 > t || t >= 37 && 40 >= t || c(e, this, this.value)
                }), i.hasEvent("paste") && t.on("paste cut", c)
            }
            t.on("change", u), r.$render = function() {
                t.val(r.$isEmpty(r.$viewValue) ? "" : r.$viewValue)
            }
        }

        function or(e, t) {
            if (S(e)) return e;
            if (C(e)) {
                Co.lastIndex = 0;
                var n = Co.exec(e);
                if (n) {
                    var r = +n[1],
                        i = +n[2],
                        o = 0,
                        a = 0,
                        s = 0,
                        u = 0,
                        l = Un(r),
                        c = 7 * (i - 1);
                    return t && (o = t.getHours(), a = t.getMinutes(), s = t.getSeconds(), u = t.getMilliseconds()), new Date(r, 0, l.getDate() + c, o, a, s, u)
                }
            }
            return 0 / 0
        }

        function ar(e, t) {
            return function(n, r) {
                var i, a;
                if (S(n)) return n;
                if (C(n)) {
                    if ('"' == n.charAt(0) && '"' == n.charAt(n.length - 1) && (n = n.substring(1, n.length - 1)), vo.test(n)) return new Date(n);
                    if (e.lastIndex = 0, i = e.exec(n)) return i.shift(), a = r ? {
                        yyyy: r.getFullYear(),
                        MM: r.getMonth() + 1,
                        dd: r.getDate(),
                        HH: r.getHours(),
                        mm: r.getMinutes(),
                        ss: r.getSeconds(),
                        sss: r.getMilliseconds() / 1e3
                    } : {
                        yyyy: 1970,
                        MM: 1,
                        dd: 1,
                        HH: 0,
                        mm: 0,
                        ss: 0,
                        sss: 0
                    }, o(i, function(e, n) {
                        n < t.length && (a[t[n]] = +e)
                    }), new Date(a.yyyy, a.MM - 1, a.dd, a.HH, a.mm, a.ss || 0, 1e3 * a.sss || 0)
                }
                return 0 / 0
            }
        }

        function sr(e, t, r, i) {
            return function(o, a, s, u, l, c, f) {
                function p(e) {
                    return e && !(e.getTime && e.getTime() !== e.getTime())
                }

                function d(e) {
                    return b(e) ? S(e) ? e : r(e) : n
                }
                ur(o, a, s, u), ir(o, a, s, u, l, c);
                var h, m = u && u.$options && u.$options.timezone;
                if (u.$$parserName = e, u.$parsers.push(function(e) {
                        if (u.$isEmpty(e)) return null;
                        if (t.test(e)) {
                            var i = r(e, h);
                            return m && (i = X(i, m)), i
                        }
                        return n
                    }), u.$formatters.push(function(e) {
                        if (e && !S(e)) throw Qo("datefmt", "Expected `{0}` to be a date", e);
                        return p(e) ? (h = e, h && m && (h = X(h, m, !0)), f("date")(e, i, m)) : (h = null, "")
                    }), b(s.min) || s.ngMin) {
                    var g;
                    u.$validators.min = function(e) {
                        return !p(e) || y(g) || r(e) >= g
                    }, s.$observe("min", function(e) {
                        g = d(e), u.$validate()
                    })
                }
                if (b(s.max) || s.ngMax) {
                    var v;
                    u.$validators.max = function(e) {
                        return !p(e) || y(v) || r(e) <= v
                    }, s.$observe("max", function(e) {
                        v = d(e), u.$validate()
                    })
                }
            }
        }

        function ur(e, t, r, i) {
            var o = t[0],
                a = i.$$hasNativeValidators = w(o.validity);
            a && i.$parsers.push(function(e) {
                var r = t.prop(yr) || {};
                return r.badInput && !r.typeMismatch ? n : e
            })
        }

        function lr(e, t, r, i, o, a) {
            if (ur(e, t, r, i), ir(e, t, r, i, o, a), i.$$parserName = "number", i.$parsers.push(function(e) {
                    return i.$isEmpty(e) ? null : bo.test(e) ? parseFloat(e) : n
                }), i.$formatters.push(function(e) {
                    if (!i.$isEmpty(e)) {
                        if (!k(e)) throw Qo("numfmt", "Expected `{0}` to be a number", e);
                        e = e.toString()
                    }
                    return e
                }), b(r.min) || r.ngMin) {
                var s;
                i.$validators.min = function(e) {
                    return i.$isEmpty(e) || y(s) || e >= s
                }, r.$observe("min", function(e) {
                    b(e) && !k(e) && (e = parseFloat(e, 10)), s = k(e) && !isNaN(e) ? e : n, i.$validate()
                })
            }
            if (b(r.max) || r.ngMax) {
                var u;
                i.$validators.max = function(e) {
                    return i.$isEmpty(e) || y(u) || u >= e
                }, r.$observe("max", function(e) {
                    b(e) && !k(e) && (e = parseFloat(e, 10)), u = k(e) && !isNaN(e) ? e : n, i.$validate()
                })
            }
        }

        function cr(e, t, n, r, i, o) {
            ir(e, t, n, r, i, o), nr(r), r.$$parserName = "url", r.$validators.url = function(e, t) {
                var n = e || t;
                return r.$isEmpty(n) || $o.test(n)
            }
        }

        function fr(e, t, n, r, i, o) {
            ir(e, t, n, r, i, o), nr(r), r.$$parserName = "email", r.$validators.email = function(e, t) {
                var n = e || t;
                return r.$isEmpty(n) || yo.test(n)
            }
        }

        function pr(e, t, n, r) {
            y(n.name) && t.attr("name", u());
            var i = function(e) {
                t[0].checked && r.$setViewValue(n.value, e && e.type)
            };
            t.on("click", i), r.$render = function() {
                var e = n.value;
                t[0].checked = e == r.$viewValue
            }, n.$observe("value", r.$render)
        }

        function dr(e, t, n, i, o) {
            var a;
            if (b(i)) {
                if (a = e(i), !a.constant) throw r("ngModel")("constexpr", "Expected constant expression for `{0}`, but saw `{1}`.", n, i);
                return a(t)
            }
            return o
        }

        function hr(e, t, n, r, i, o, a, s) {
            var u = dr(s, e, "ngTrueValue", n.ngTrueValue, !0),
                l = dr(s, e, "ngFalseValue", n.ngFalseValue, !1),
                c = function(e) {
                    r.$setViewValue(t[0].checked, e && e.type)
                };
            t.on("click", c), r.$render = function() {
                t[0].checked = r.$viewValue
            }, r.$isEmpty = function(e) {
                return e === !1
            }, r.$formatters.push(function(e) {
                return _(e, u)
            }), r.$parsers.push(function(e) {
                return e ? u : l
            })
        }

        function mr(e, t) {
            return e = "ngClass" + e, ["$animate", function(n) {
                function r(e, t) {
                    var n = [];
                    e: for (var r = 0; r < e.length; r++) {
                        for (var i = e[r], o = 0; o < t.length; o++)
                            if (i == t[o]) continue e;
                        n.push(i)
                    }
                    return n
                }

                function i(e) {
                    var t = [];
                    return Vr(e) ? (o(e, function(e) {
                        t = t.concat(i(e))
                    }), t) : C(e) ? e.split(" ") : w(e) ? (o(e, function(e, n) {
                        e && (t = t.concat(n.split(" ")))
                    }), t) : e
                }
                return {
                    restrict: "AC",
                    link: function(a, s, u) {
                        function l(e) {
                            var t = f(e, 1);
                            u.$addClass(t)
                        }

                        function c(e) {
                            var t = f(e, -1);
                            u.$removeClass(t)
                        }

                        function f(e, t) {
                            var n = s.data("$classCounts") || ge(),
                                r = [];
                            return o(e, function(e) {
                                (t > 0 || n[e]) && (n[e] = (n[e] || 0) + t, n[e] === +(t > 0) && r.push(e))
                            }), s.data("$classCounts", n), r.join(" ")
                        }

                        function p(e, t) {
                            var i = r(t, e),
                                o = r(e, t);
                            i = f(i, 1), o = f(o, -1), i && i.length && n.addClass(s, i), o && o.length && n.removeClass(s, o)
                        }

                        function d(e) {
                            if (t === !0 || a.$index % 2 === t) {
                                var n = i(e || []);
                                if (h) {
                                    if (!_(e, h)) {
                                        var r = i(h);
                                        p(r, n)
                                    }
                                } else l(n)
                            }
                            h = R(e)
                        }
                        var h;
                        a.$watch(u[e], d, !0), u.$observe("class", function(t) {
                            d(a.$eval(u[e]))
                        }), "ngClass" !== e && a.$watch("$index", function(n, r) {
                            var o = 1 & n;
                            if (o !== (1 & r)) {
                                var s = i(a.$eval(u[e]));
                                o === t ? l(s) : c(s)
                            }
                        })
                    }
                }
            }]
        }

        function gr(e) {
            function t(e, t, u) {
                t === n ? r("$pending", e, u) : i("$pending", e, u), N(t) ? t ? (f(s.$error, e, u), c(s.$$success, e, u)) : (c(s.$error, e, u), f(s.$$success, e, u)) : (f(s.$error, e, u), f(s.$$success, e, u)), s.$pending ? (o(Zo, !0), s.$valid = s.$invalid = n, a("", null)) : (o(Zo, !1), s.$valid = vr(s.$error), s.$invalid = !s.$valid, a("", s.$valid));
                var l;
                l = s.$pending && s.$pending[e] ? n : s.$error[e] ? !1 : s.$$success[e] ? !0 : null, a(e, l), p.$setValidity(e, l, s)
            }

            function r(e, t, n) {
                s[e] || (s[e] = {}), c(s[e], t, n)
            }

            function i(e, t, r) {
                s[e] && f(s[e], t, r), vr(s[e]) && (s[e] = n)
            }

            function o(e, t) {
                t && !l[e] ? (d.addClass(u, e), l[e] = !0) : !t && l[e] && (d.removeClass(u, e), l[e] = !1)
            }

            function a(e, t) {
                e = e ? "-" + le(e, "-") : "", o(Wo + e, t === !0), o(Yo + e, t === !1)
            }
            var s = e.ctrl,
                u = e.$element,
                l = {},
                c = e.set,
                f = e.unset,
                p = e.parentForm,
                d = e.$animate;
            l[Yo] = !(l[Wo] = u.hasClass(Wo)), s.$setValidity = t
        }

        function vr(e) {
            if (e)
                for (var t in e)
                    if (e.hasOwnProperty(t)) return !1;
            return !0
        }
        var $r = /^\/(.+)\/([a-z]*)$/,
            yr = "validity",
            br = function(e) {
                return C(e) ? e.toLowerCase() : e
            },
            wr = Object.prototype.hasOwnProperty,
            xr = function(e) {
                return C(e) ? e.toUpperCase() : e
            },
            Cr = function(e) {
                return C(e) ? e.replace(/[A-Z]/g, function(e) {
                    return String.fromCharCode(32 | e.charCodeAt(0))
                }) : e
            },
            kr = function(e) {
                return C(e) ? e.replace(/[a-z]/g, function(e) {
                    return String.fromCharCode(-33 & e.charCodeAt(0))
                }) : e
            };
        "i" !== "I".toLowerCase() && (br = Cr, xr = kr);
        var Sr, Er, Tr, Dr, Ar = [].slice,
            Or = [].splice,
            Mr = [].push,
            jr = Object.prototype.toString,
            Nr = Object.getPrototypeOf,
            Pr = r("ng"),
            Lr = e.angular || (e.angular = {}),
            Ir = 0;
        Sr = t.documentMode, m.$inject = [], g.$inject = [];
        var qr, Vr = Array.isArray,
            Fr = /^\[object (Uint8(Clamped)?)|(Uint16)|(Uint32)|(Int8)|(Int16)|(Int32)|(Float(32)|(64))Array\]$/,
            Hr = function(e) {
                return C(e) ? e.trim() : e
            },
            Rr = function(e) {
                return e.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
            },
            _r = function() {
                if (b(_r.isActive_)) return _r.isActive_;
                var e = !(!t.querySelector("[ng-csp]") && !t.querySelector("[data-ng-csp]"));
                if (!e) try {
                    new Function("")
                } catch (n) {
                    e = !0
                }
                return _r.isActive_ = e
            },
            Ur = function() {
                if (b(Ur.name_)) return Ur.name_;
                var e, n, r, i, o = Br.length;
                for (n = 0; o > n; ++n)
                    if (r = Br[n], e = t.querySelector("[" + r.replace(":", "\\:") + "jq]")) {
                        i = e.getAttribute(r + "jq");
                        break
                    }
                return Ur.name_ = i
            },
            Br = ["ng-", "data-ng-", "ng:", "x-ng-"],
            zr = /[A-Z]/g,
            Wr = !1,
            Yr = 1,
            Gr = 2,
            Kr = 3,
            Jr = 8,
            Xr = 9,
            Zr = 11,
            Qr = {
                full: "1.4.3",
                major: 1,
                minor: 4,
                dot: 3,
                codeName: "foam-acceleration"
            };
        De.expando = "ng339";
        var ei = De.cache = {},
            ti = 1,
            ni = function(e, t, n) {
                e.addEventListener(t, n, !1)
            },
            ri = function(e, t, n) {
                e.removeEventListener(t, n, !1)
            };
        De._data = function(e) {
            return this.cache[e[this.expando]] || {}
        };
        var ii = /([\:\-\_]+(.))/g,
            oi = /^moz([A-Z])/,
            ai = {
                mouseleave: "mouseout",
                mouseenter: "mouseover"
            },
            si = r("jqLite"),
            ui = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            li = /<|&#?\w+;/,
            ci = /<([\w:]+)/,
            fi = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            pi = {
                option: [1, '<select multiple="multiple">', "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        pi.optgroup = pi.option, pi.tbody = pi.tfoot = pi.colgroup = pi.caption = pi.thead, pi.th = pi.td;
        var di = De.prototype = {
                ready: function(n) {
                    function r() {
                        i || (i = !0, n())
                    }
                    var i = !1;
                    "complete" === t.readyState ? setTimeout(r) : (this.on("DOMContentLoaded", r), De(e).on("load", r))
                },
                toString: function() {
                    var e = [];
                    return o(this, function(t) {
                        e.push("" + t)
                    }), "[" + e.join(", ") + "]"
                },
                eq: function(e) {
                    return Er(e >= 0 ? this[e] : this[this.length + e])
                },
                length: 0,
                push: Mr,
                sort: [].sort,
                splice: [].splice
            },
            hi = {};
        o("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(e) {
            hi[br(e)] = e
        });
        var mi = {};
        o("input,select,option,textarea,button,form,details".split(","), function(e) {
            mi[e] = !0
        });
        var gi = {
            ngMinlength: "minlength",
            ngMaxlength: "maxlength",
            ngMin: "min",
            ngMax: "max",
            ngPattern: "pattern"
        };
        o({
            data: Pe,
            removeData: je,
            hasData: Se
        }, function(e, t) {
            De[t] = e
        }), o({
            data: Pe,
            inheritedData: He,
            scope: function(e) {
                return Er.data(e, "$scope") || He(e.parentNode || e, ["$isolateScope", "$scope"])
            },
            isolateScope: function(e) {
                return Er.data(e, "$isolateScope") || Er.data(e, "$isolateScopeNoTemplate")
            },
            controller: Fe,
            injector: function(e) {
                return He(e, "$injector")
            },
            removeAttr: function(e, t) {
                e.removeAttribute(t)
            },
            hasClass: Le,
            css: function(e, t, n) {
                return t = xe(t), b(n) ? void(e.style[t] = n) : e.style[t]
            },
            attr: function(e, t, r) {
                var i = e.nodeType;
                if (i !== Kr && i !== Gr && i !== Jr) {
                    var o = br(t);
                    if (hi[o]) {
                        if (!b(r)) return e[t] || (e.attributes.getNamedItem(t) || m).specified ? o : n;
                        r ? (e[t] = !0, e.setAttribute(t, o)) : (e[t] = !1, e.removeAttribute(o))
                    } else if (b(r)) e.setAttribute(t, r);
                    else if (e.getAttribute) {
                        var a = e.getAttribute(t, 2);
                        return null === a ? n : a
                    }
                }
            },
            prop: function(e, t, n) {
                return b(n) ? void(e[t] = n) : e[t]
            },
            text: function() {
                function e(e, t) {
                    if (y(t)) {
                        var n = e.nodeType;
                        return n === Yr || n === Kr ? e.textContent : ""
                    }
                    e.textContent = t
                }
                return e.$dv = "", e
            }(),
            val: function(e, t) {
                if (y(t)) {
                    if (e.multiple && "select" === V(e)) {
                        var n = [];
                        return o(e.options, function(e) {
                            e.selected && n.push(e.value || e.text)
                        }), 0 === n.length ? null : n
                    }
                    return e.value
                }
                e.value = t
            },
            html: function(e, t) {
                return y(t) ? e.innerHTML : (Oe(e, !0), void(e.innerHTML = t))
            },
            empty: Re
        }, function(e, t) {
            De.prototype[t] = function(t, r) {
                var i, o, a = this.length;
                if (e !== Re && (2 == e.length && e !== Le && e !== Fe ? t : r) === n) {
                    if (w(t)) {
                        for (i = 0; a > i; i++)
                            if (e === Pe) e(this[i], t);
                            else
                                for (o in t) e(this[i], o, t[o]);
                        return this
                    }
                    for (var s = e.$dv, u = s === n ? Math.min(a, 1) : a, l = 0; u > l; l++) {
                        var c = e(this[l], t, r);
                        s = s ? s + c : c
                    }
                    return s
                }
                for (i = 0; a > i; i++) e(this[i], t, r);
                return this
            }
        }), o({
            removeData: je,
            on: function Aa(e, t, n, r) {
                if (b(r)) throw si("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
                if (ke(e)) {
                    var i = Ne(e, !0),
                        o = i.events,
                        a = i.handle;
                    a || (a = i.handle = We(e, o));
                    for (var s = t.indexOf(" ") >= 0 ? t.split(" ") : [t], u = s.length; u--;) {
                        t = s[u];
                        var l = o[t];
                        l || (o[t] = [], "mouseenter" === t || "mouseleave" === t ? Aa(e, ai[t], function(e) {
                            var n = this,
                                r = e.relatedTarget;
                            (!r || r !== n && !n.contains(r)) && a(e, t)
                        }) : "$destroy" !== t && ni(e, t, a), l = o[t]), l.push(n)
                    }
                }
            },
            off: Me,
            one: function(e, t, n) {
                e = Er(e), e.on(t, function r() {
                    e.off(t, n), e.off(t, r)
                }), e.on(t, n)
            },
            replaceWith: function(e, t) {
                var n, r = e.parentNode;
                Oe(e), o(new De(t), function(t) {
                    n ? r.insertBefore(t, n.nextSibling) : r.replaceChild(t, e), n = t
                })
            },
            children: function(e) {
                var t = [];
                return o(e.childNodes, function(e) {
                    e.nodeType === Yr && t.push(e)
                }), t
            },
            contents: function(e) {
                return e.contentDocument || e.childNodes || []
            },
            append: function(e, t) {
                var n = e.nodeType;
                if (n === Yr || n === Zr) {
                    t = new De(t);
                    for (var r = 0, i = t.length; i > r; r++) {
                        var o = t[r];
                        e.appendChild(o)
                    }
                }
            },
            prepend: function(e, t) {
                if (e.nodeType === Yr) {
                    var n = e.firstChild;
                    o(new De(t), function(t) {
                        e.insertBefore(t, n)
                    })
                }
            },
            wrap: function(e, t) {
                t = Er(t).eq(0).clone()[0];
                var n = e.parentNode;
                n && n.replaceChild(t, e), t.appendChild(e)
            },
            remove: _e,
            detach: function(e) {
                _e(e, !0)
            },
            after: function(e, t) {
                var n = e,
                    r = e.parentNode;
                t = new De(t);
                for (var i = 0, o = t.length; o > i; i++) {
                    var a = t[i];
                    r.insertBefore(a, n.nextSibling), n = a
                }
            },
            addClass: qe,
            removeClass: Ie,
            toggleClass: function(e, t, n) {
                t && o(t.split(" "), function(t) {
                    var r = n;
                    y(r) && (r = !Le(e, t)), (r ? qe : Ie)(e, t)
                })
            },
            parent: function(e) {
                var t = e.parentNode;
                return t && t.nodeType !== Zr ? t : null
            },
            next: function(e) {
                return e.nextElementSibling
            },
            find: function(e, t) {
                return e.getElementsByTagName ? e.getElementsByTagName(t) : []
            },
            clone: Ae,
            triggerHandler: function(e, t, n) {
                var r, i, a, s = t.type || t,
                    u = Ne(e),
                    l = u && u.events,
                    c = l && l[s];
                c && (r = {
                    preventDefault: function() {
                        this.defaultPrevented = !0
                    },
                    isDefaultPrevented: function() {
                        return this.defaultPrevented === !0
                    },
                    stopImmediatePropagation: function() {
                        this.immediatePropagationStopped = !0
                    },
                    isImmediatePropagationStopped: function() {
                        return this.immediatePropagationStopped === !0
                    },
                    stopPropagation: m,
                    type: s,
                    target: e
                }, t.type && (r = f(r, t)), i = R(c), a = n ? [r].concat(n) : [r], o(i, function(t) {
                    r.isImmediatePropagationStopped() || t.apply(e, a)
                }))
            }
        }, function(e, t) {
            De.prototype[t] = function(t, n, r) {
                for (var i, o = 0, a = this.length; a > o; o++) y(i) ? (i = e(this[o], t, n, r), b(i) && (i = Er(i))) : Ve(i, e(this[o], t, n, r));
                return b(i) ? i : this
            }, De.prototype.bind = De.prototype.on, De.prototype.unbind = De.prototype.off
        }), Ke.prototype = {
            put: function(e, t) {
                this[Ge(e, this.nextUid)] = t
            },
            get: function(e) {
                return this[Ge(e, this.nextUid)]
            },
            remove: function(e) {
                var t = this[e = Ge(e, this.nextUid)];
                return delete this[e], t
            }
        };
        var vi = [function() {
                this.$get = [function() {
                    return Ke;

                }]
            }],
            $i = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
            yi = /,/,
            bi = /^\s*(_?)(\S+?)\1\s*$/,
            wi = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
            xi = r("$injector");
        Ze.$$annotate = Xe;
        var Ci = r("$animate"),
            ki = 1,
            Si = "ng-animate",
            Ei = function() {
                this.$get = ["$q", "$$rAF", function(e, t) {
                    function n() {}
                    return n.all = m, n.chain = m, n.prototype = {
                        end: m,
                        cancel: m,
                        resume: m,
                        pause: m,
                        complete: m,
                        then: function(n, r) {
                            return e(function(e) {
                                t(function() {
                                    e()
                                })
                            }).then(n, r)
                        }
                    }, n
                }]
            },
            Ti = function() {
                var e = new Ke,
                    t = [];
                this.$get = ["$$AnimateRunner", "$rootScope", function(n, r) {
                    function i(n, i, a) {
                        var s = e.get(n);
                        s || (e.put(n, s = {}), t.push(n)), i && o(i.split(" "), function(e) {
                            e && (s[e] = !0)
                        }), a && o(a.split(" "), function(e) {
                            e && (s[e] = !1)
                        }), t.length > 1 || r.$$postDigest(function() {
                            o(t, function(t) {
                                var n = e.get(t);
                                if (n) {
                                    var r = nt(t.attr("class")),
                                        i = "",
                                        a = "";
                                    o(n, function(e, t) {
                                        var n = !!r[t];
                                        e !== n && (e ? i += (i.length ? " " : "") + t : a += (a.length ? " " : "") + t)
                                    }), o(t, function(e) {
                                        i && qe(e, i), a && Ie(e, a)
                                    }), e.remove(t)
                                }
                            }), t.length = 0
                        })
                    }
                    return {
                        enabled: m,
                        on: m,
                        off: m,
                        pin: m,
                        push: function(e, t, r, o) {
                            return o && o(), r = r || {}, r.from && e.css(r.from), r.to && e.css(r.to), (r.addClass || r.removeClass) && i(e, r.addClass, r.removeClass), new n
                        }
                    }
                }]
            },
            Di = ["$provide", function(e) {
                var t = this;
                this.$$registeredAnimations = Object.create(null), this.register = function(n, r) {
                    if (n && "." !== n.charAt(0)) throw Ci("notcsel", "Expecting class selector starting with '.' got '{0}'.", n);
                    var i = n + "-animation";
                    t.$$registeredAnimations[n.substr(1)] = i, e.factory(i, r)
                }, this.classNameFilter = function(e) {
                    if (1 === arguments.length && (this.$$classNameFilter = e instanceof RegExp ? e : null, this.$$classNameFilter)) {
                        var t = new RegExp("(\\s+|\\/)" + Si + "(\\s+|\\/)");
                        if (t.test(this.$$classNameFilter.toString())) throw Ci("nongcls", '$animateProvider.classNameFilter(regex) prohibits accepting a regex value which matches/contains the "{0}" CSS class.', Si)
                    }
                    return this.$$classNameFilter
                }, this.$get = ["$$animateQueue", function(e) {
                    function t(e, t, n) {
                        if (n) {
                            var r = tt(n);
                            !r || r.parentNode || r.previousElementSibling || (n = null)
                        }
                        n ? n.after(e) : t.prepend(e)
                    }
                    return {
                        on: e.on,
                        off: e.off,
                        pin: e.pin,
                        enabled: e.enabled,
                        cancel: function(e) {
                            e.end && e.end()
                        },
                        enter: function(n, r, i, o) {
                            return r = r && Er(r), i = i && Er(i), r = r || i.parent(), t(n, r, i), e.push(n, "enter", rt(o))
                        },
                        move: function(n, r, i, o) {
                            return r = r && Er(r), i = i && Er(i), r = r || i.parent(), t(n, r, i), e.push(n, "move", rt(o))
                        },
                        leave: function(t, n) {
                            return e.push(t, "leave", rt(n), function() {
                                t.remove()
                            })
                        },
                        addClass: function(t, n, r) {
                            return r = rt(r), r.addClass = et(r.addclass, n), e.push(t, "addClass", r)
                        },
                        removeClass: function(t, n, r) {
                            return r = rt(r), r.removeClass = et(r.removeClass, n), e.push(t, "removeClass", r)
                        },
                        setClass: function(t, n, r, i) {
                            return i = rt(i), i.addClass = et(i.addClass, n), i.removeClass = et(i.removeClass, r), e.push(t, "setClass", i)
                        },
                        animate: function(t, n, r, i, o) {
                            return o = rt(o), o.from = o.from ? f(o.from, n) : n, o.to = o.to ? f(o.to, r) : r, i = i || "ng-inline-animate", o.tempClasses = et(o.tempClasses, i), e.push(t, "animate", o)
                        }
                    }
                }]
            }],
            Ai = r("$compile");
        ut.$inject = ["$provide", "$$sanitizeUriProvider"];
        var Oi = /^((?:x|data)[\:\-_])/i,
            Mi = r("$controller"),
            ji = /^(\S+)(\s+as\s+(\w+))?$/,
            Ni = "application/json",
            Pi = {
                "Content-Type": Ni + ";charset=utf-8"
            },
            Li = /^\[|^\{(?!\{)/,
            Ii = {
                "[": /]$/,
                "{": /}$/
            },
            qi = /^\)\]\}',?\n/,
            Vi = Lr.$interpolateMinErr = r("$interpolate");
        Vi.throwNoconcat = function(e) {
            throw Vi("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", e)
        }, Vi.interr = function(e, t) {
            return Vi("interr", "Can't interpolate: {0}\n{1}", e, t.toString())
        };
        var Fi = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
            Hi = {
                http: 80,
                https: 443,
                ftp: 21
            },
            Ri = r("$location"),
            _i = {
                $$html5: !1,
                $$replace: !1,
                absUrl: Ut("$$absUrl"),
                url: function(e) {
                    if (y(e)) return this.$$url;
                    var t = Fi.exec(e);
                    return (t[1] || "" === e) && this.path(decodeURIComponent(t[1])), (t[2] || t[1] || "" === e) && this.search(t[3] || ""), this.hash(t[5] || ""), this
                },
                protocol: Ut("$$protocol"),
                host: Ut("$$host"),
                port: Ut("$$port"),
                path: Bt("$$path", function(e) {
                    return e = null !== e ? e.toString() : "", "/" == e.charAt(0) ? e : "/" + e
                }),
                search: function(e, t) {
                    switch (arguments.length) {
                        case 0:
                            return this.$$search;
                        case 1:
                            if (C(e) || k(e)) e = e.toString(), this.$$search = ee(e);
                            else {
                                if (!w(e)) throw Ri("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
                                e = H(e, {}), o(e, function(t, n) {
                                    null == t && delete e[n]
                                }), this.$$search = e
                            }
                            break;
                        default:
                            y(t) || null === t ? delete this.$$search[e] : this.$$search[e] = t
                    }
                    return this.$$compose(), this
                },
                hash: Bt("$$hash", function(e) {
                    return null !== e ? e.toString() : ""
                }),
                replace: function() {
                    return this.$$replace = !0, this
                }
            };
        o([_t, Rt, Ht], function(e) {
            e.prototype = Object.create(_i), e.prototype.state = function(t) {
                if (!arguments.length) return this.$$state;
                if (e !== Ht || !this.$$html5) throw Ri("nostate", "History API state support is available only in HTML5 mode and only in browsers supporting HTML5 History API");
                return this.$$state = y(t) ? null : t, this
            }
        });
        var Ui = r("$parse"),
            Bi = Function.prototype.call,
            zi = Function.prototype.apply,
            Wi = Function.prototype.bind,
            Yi = ge();
        o("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function(e) {
            Yi[e] = !0
        });
        var Gi = {
                n: "\n",
                f: "\f",
                r: "\r",
                t: "	",
                v: "",
                "'": "'",
                '"': '"'
            },
            Ki = function(e) {
                this.options = e
            };
        Ki.prototype = {
            constructor: Ki,
            lex: function(e) {
                for (this.text = e, this.index = 0, this.tokens = []; this.index < this.text.length;) {
                    var t = this.text.charAt(this.index);
                    if ('"' === t || "'" === t) this.readString(t);
                    else if (this.isNumber(t) || "." === t && this.isNumber(this.peek())) this.readNumber();
                    else if (this.isIdent(t)) this.readIdent();
                    else if (this.is(t, "(){}[].,;:?")) this.tokens.push({
                        index: this.index,
                        text: t
                    }), this.index++;
                    else if (this.isWhitespace(t)) this.index++;
                    else {
                        var n = t + this.peek(),
                            r = n + this.peek(2),
                            i = Yi[t],
                            o = Yi[n],
                            a = Yi[r];
                        if (i || o || a) {
                            var s = a ? r : o ? n : t;
                            this.tokens.push({
                                index: this.index,
                                text: s,
                                operator: !0
                            }), this.index += s.length
                        } else this.throwError("Unexpected next character ", this.index, this.index + 1)
                    }
                }
                return this.tokens
            },
            is: function(e, t) {
                return -1 !== t.indexOf(e)
            },
            peek: function(e) {
                var t = e || 1;
                return this.index + t < this.text.length ? this.text.charAt(this.index + t) : !1
            },
            isNumber: function(e) {
                return e >= "0" && "9" >= e && "string" == typeof e
            },
            isWhitespace: function(e) {
                return " " === e || "\r" === e || "	" === e || "\n" === e || "" === e || " " === e
            },
            isIdent: function(e) {
                return e >= "a" && "z" >= e || e >= "A" && "Z" >= e || "_" === e || "$" === e
            },
            isExpOperator: function(e) {
                return "-" === e || "+" === e || this.isNumber(e)
            },
            throwError: function(e, t, n) {
                n = n || this.index;
                var r = b(t) ? "s " + t + "-" + this.index + " [" + this.text.substring(t, n) + "]" : " " + n;
                throw Ui("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", e, r, this.text)
            },
            readNumber: function() {
                for (var e = "", t = this.index; this.index < this.text.length;) {
                    var n = br(this.text.charAt(this.index));
                    if ("." == n || this.isNumber(n)) e += n;
                    else {
                        var r = this.peek();
                        if ("e" == n && this.isExpOperator(r)) e += n;
                        else if (this.isExpOperator(n) && r && this.isNumber(r) && "e" == e.charAt(e.length - 1)) e += n;
                        else {
                            if (!this.isExpOperator(n) || r && this.isNumber(r) || "e" != e.charAt(e.length - 1)) break;
                            this.throwError("Invalid exponent")
                        }
                    }
                    this.index++
                }
                this.tokens.push({
                    index: t,
                    text: e,
                    constant: !0,
                    value: Number(e)
                })
            },
            readIdent: function() {
                for (var e = this.index; this.index < this.text.length;) {
                    var t = this.text.charAt(this.index);
                    if (!this.isIdent(t) && !this.isNumber(t)) break;
                    this.index++
                }
                this.tokens.push({
                    index: e,
                    text: this.text.slice(e, this.index),
                    identifier: !0
                })
            },
            readString: function(e) {
                var t = this.index;
                this.index++;
                for (var n = "", r = e, i = !1; this.index < this.text.length;) {
                    var o = this.text.charAt(this.index);
                    if (r += o, i) {
                        if ("u" === o) {
                            var a = this.text.substring(this.index + 1, this.index + 5);
                            a.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + a + "]"), this.index += 4, n += String.fromCharCode(parseInt(a, 16))
                        } else {
                            var s = Gi[o];
                            n += s || o
                        }
                        i = !1
                    } else if ("\\" === o) i = !0;
                    else {
                        if (o === e) return this.index++, void this.tokens.push({
                            index: t,
                            text: r,
                            constant: !0,
                            value: n
                        });
                        n += o
                    }
                    this.index++
                }
                this.throwError("Unterminated quote", t)
            }
        };
        var Ji = function(e, t) {
            this.lexer = e, this.options = t
        };
        Ji.Program = "Program", Ji.ExpressionStatement = "ExpressionStatement", Ji.AssignmentExpression = "AssignmentExpression", Ji.ConditionalExpression = "ConditionalExpression", Ji.LogicalExpression = "LogicalExpression", Ji.BinaryExpression = "BinaryExpression", Ji.UnaryExpression = "UnaryExpression", Ji.CallExpression = "CallExpression", Ji.MemberExpression = "MemberExpression", Ji.Identifier = "Identifier", Ji.Literal = "Literal", Ji.ArrayExpression = "ArrayExpression", Ji.Property = "Property", Ji.ObjectExpression = "ObjectExpression", Ji.ThisExpression = "ThisExpression", Ji.NGValueParameter = "NGValueParameter", Ji.prototype = {
            ast: function(e) {
                this.text = e, this.tokens = this.lexer.lex(e);
                var t = this.program();
                return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), t
            },
            program: function() {
                for (var e = [];;)
                    if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && e.push(this.expressionStatement()), !this.expect(";")) return {
                        type: Ji.Program,
                        body: e
                    }
            },
            expressionStatement: function() {
                return {
                    type: Ji.ExpressionStatement,
                    expression: this.filterChain()
                }
            },
            filterChain: function() {
                for (var e, t = this.expression(); e = this.expect("|");) t = this.filter(t);
                return t
            },
            expression: function() {
                return this.assignment()
            },
            assignment: function() {
                var e = this.ternary();
                return this.expect("=") && (e = {
                    type: Ji.AssignmentExpression,
                    left: e,
                    right: this.assignment(),
                    operator: "="
                }), e
            },
            ternary: function() {
                var e, t, n = this.logicalOR();
                return this.expect("?") && (e = this.expression(), this.consume(":")) ? (t = this.expression(), {
                    type: Ji.ConditionalExpression,
                    test: n,
                    alternate: e,
                    consequent: t
                }) : n
            },
            logicalOR: function() {
                for (var e = this.logicalAND(); this.expect("||");) e = {
                    type: Ji.LogicalExpression,
                    operator: "||",
                    left: e,
                    right: this.logicalAND()
                };
                return e
            },
            logicalAND: function() {
                for (var e = this.equality(); this.expect("&&");) e = {
                    type: Ji.LogicalExpression,
                    operator: "&&",
                    left: e,
                    right: this.equality()
                };
                return e
            },
            equality: function() {
                for (var e, t = this.relational(); e = this.expect("==", "!=", "===", "!==");) t = {
                    type: Ji.BinaryExpression,
                    operator: e.text,
                    left: t,
                    right: this.relational()
                };
                return t
            },
            relational: function() {
                for (var e, t = this.additive(); e = this.expect("<", ">", "<=", ">=");) t = {
                    type: Ji.BinaryExpression,
                    operator: e.text,
                    left: t,
                    right: this.additive()
                };
                return t
            },
            additive: function() {
                for (var e, t = this.multiplicative(); e = this.expect("+", "-");) t = {
                    type: Ji.BinaryExpression,
                    operator: e.text,
                    left: t,
                    right: this.multiplicative()
                };
                return t
            },
            multiplicative: function() {
                for (var e, t = this.unary(); e = this.expect("*", "/", "%");) t = {
                    type: Ji.BinaryExpression,
                    operator: e.text,
                    left: t,
                    right: this.unary()
                };
                return t
            },
            unary: function() {
                var e;
                return (e = this.expect("+", "-", "!")) ? {
                    type: Ji.UnaryExpression,
                    operator: e.text,
                    prefix: !0,
                    argument: this.unary()
                } : this.primary()
            },
            primary: function() {
                var e;
                this.expect("(") ? (e = this.filterChain(), this.consume(")")) : this.expect("[") ? e = this.arrayDeclaration() : this.expect("{") ? e = this.object() : this.constants.hasOwnProperty(this.peek().text) ? e = H(this.constants[this.consume().text]) : this.peek().identifier ? e = this.identifier() : this.peek().constant ? e = this.constant() : this.throwError("not a primary expression", this.peek());
                for (var t; t = this.expect("(", "[", ".");) "(" === t.text ? (e = {
                    type: Ji.CallExpression,
                    callee: e,
                    arguments: this.parseArguments()
                }, this.consume(")")) : "[" === t.text ? (e = {
                    type: Ji.MemberExpression,
                    object: e,
                    property: this.expression(),
                    computed: !0
                }, this.consume("]")) : "." === t.text ? e = {
                    type: Ji.MemberExpression,
                    object: e,
                    property: this.identifier(),
                    computed: !1
                } : this.throwError("IMPOSSIBLE");
                return e
            },
            filter: function(e) {
                for (var t = [e], n = {
                        type: Ji.CallExpression,
                        callee: this.identifier(),
                        arguments: t,
                        filter: !0
                    }; this.expect(":");) t.push(this.expression());
                return n
            },
            parseArguments: function() {
                var e = [];
                if (")" !== this.peekToken().text)
                    do e.push(this.expression()); while (this.expect(","));
                return e
            },
            identifier: function() {
                var e = this.consume();
                return e.identifier || this.throwError("is not a valid identifier", e), {
                    type: Ji.Identifier,
                    name: e.text
                }
            },
            constant: function() {
                return {
                    type: Ji.Literal,
                    value: this.consume().value
                }
            },
            arrayDeclaration: function() {
                var e = [];
                if ("]" !== this.peekToken().text)
                    do {
                        if (this.peek("]")) break;
                        e.push(this.expression())
                    } while (this.expect(","));
                return this.consume("]"), {
                    type: Ji.ArrayExpression,
                    elements: e
                }
            },
            object: function() {
                var e, t = [];
                if ("}" !== this.peekToken().text)
                    do {
                        if (this.peek("}")) break;
                        e = {
                            type: Ji.Property,
                            kind: "init"
                        }, this.peek().constant ? e.key = this.constant() : this.peek().identifier ? e.key = this.identifier() : this.throwError("invalid key", this.peek()), this.consume(":"), e.value = this.expression(), t.push(e)
                    } while (this.expect(","));
                return this.consume("}"), {
                    type: Ji.ObjectExpression,
                    properties: t
                }
            },
            throwError: function(e, t) {
                throw Ui("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", t.text, e, t.index + 1, this.text, this.text.substring(t.index))
            },
            consume: function(e) {
                if (0 === this.tokens.length) throw Ui("ueoe", "Unexpected end of expression: {0}", this.text);
                var t = this.expect(e);
                return t || this.throwError("is unexpected, expecting [" + e + "]", this.peek()), t
            },
            peekToken: function() {
                if (0 === this.tokens.length) throw Ui("ueoe", "Unexpected end of expression: {0}", this.text);
                return this.tokens[0]
            },
            peek: function(e, t, n, r) {
                return this.peekAhead(0, e, t, n, r)
            },
            peekAhead: function(e, t, n, r, i) {
                if (this.tokens.length > e) {
                    var o = this.tokens[e],
                        a = o.text;
                    if (a === t || a === n || a === r || a === i || !t && !n && !r && !i) return o
                }
                return !1
            },
            expect: function(e, t, n, r) {
                var i = this.peek(e, t, n, r);
                return i ? (this.tokens.shift(), i) : !1
            },
            constants: {
                "true": {
                    type: Ji.Literal,
                    value: !0
                },
                "false": {
                    type: Ji.Literal,
                    value: !1
                },
                "null": {
                    type: Ji.Literal,
                    value: null
                },
                undefined: {
                    type: Ji.Literal,
                    value: n
                },
                "this": {
                    type: Ji.ThisExpression
                }
            }
        }, an.prototype = {
            compile: function(e, t) {
                var r = this,
                    i = this.astBuilder.ast(e);
                this.state = {
                    nextId: 0,
                    filters: {},
                    expensiveChecks: t,
                    fn: {
                        vars: [],
                        body: [],
                        own: {}
                    },
                    assign: {
                        vars: [],
                        body: [],
                        own: {}
                    },
                    inputs: []
                }, Qt(i, r.$filter);
                var a, s = "";
                if (this.stage = "assign", a = nn(i)) {
                    this.state.computing = "assign";
                    var u = this.nextId();
                    this.recurse(a, u), s = "fn.assign=" + this.generateFunction("assign", "s,v,l")
                }
                var l = en(i.body);
                r.stage = "inputs", o(l, function(e, t) {
                    var n = "fn" + t;
                    r.state[n] = {
                        vars: [],
                        body: [],
                        own: {}
                    }, r.state.computing = n;
                    var i = r.nextId();
                    r.recurse(e, i), r.return_(i), r.state.inputs.push(n), e.watchId = t
                }), this.state.computing = "fn", this.stage = "main", this.recurse(i);
                var c = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + s + this.watchFns() + "return fn;",
                    f = new Function("$filter", "ensureSafeMemberName", "ensureSafeObject", "ensureSafeFunction", "ifDefined", "plus", "text", c)(this.$filter, Yt, Gt, Kt, Jt, Xt, e);
                return this.state = this.stage = n, f.literal = rn(i), f.constant = on(i), f
            },
            USE: "use",
            STRICT: "strict",
            watchFns: function() {
                var e = [],
                    t = this.state.inputs,
                    n = this;
                return o(t, function(t) {
                    e.push("var " + t + "=" + n.generateFunction(t, "s"))
                }), t.length && e.push("fn.inputs=[" + t.join(",") + "];"), e.join("")
            },
            generateFunction: function(e, t) {
                return "function(" + t + "){" + this.varsPrefix(e) + this.body(e) + "};"
            },
            filterPrefix: function() {
                var e = [],
                    t = this;
                return o(this.state.filters, function(n, r) {
                    e.push(n + "=$filter(" + t.escape(r) + ")")
                }), e.length ? "var " + e.join(",") + ";" : ""
            },
            varsPrefix: function(e) {
                return this.state[e].vars.length ? "var " + this.state[e].vars.join(",") + ";" : ""
            },
            body: function(e) {
                return this.state[e].body.join("")
            },
            recurse: function(e, t, r, i, a, s) {
                var u, l, c, f, p = this;
                if (i = i || m, !s && b(e.watchId)) return t = t || this.nextId(), void this.if_("i", this.lazyAssign(t, this.computedMember("i", e.watchId)), this.lazyRecurse(e, t, r, i, a, !0));
                switch (e.type) {
                    case Ji.Program:
                        o(e.body, function(t, r) {
                            p.recurse(t.expression, n, n, function(e) {
                                l = e
                            }), r !== e.body.length - 1 ? p.current().body.push(l, ";") : p.return_(l)
                        });
                        break;
                    case Ji.Literal:
                        f = this.escape(e.value), this.assign(t, f), i(f);
                        break;
                    case Ji.UnaryExpression:
                        this.recurse(e.argument, n, n, function(e) {
                            l = e
                        }), f = e.operator + "(" + this.ifDefined(l, 0) + ")", this.assign(t, f), i(f);
                        break;
                    case Ji.BinaryExpression:
                        this.recurse(e.left, n, n, function(e) {
                            u = e
                        }), this.recurse(e.right, n, n, function(e) {
                            l = e
                        }), f = "+" === e.operator ? this.plus(u, l) : "-" === e.operator ? this.ifDefined(u, 0) + e.operator + this.ifDefined(l, 0) : "(" + u + ")" + e.operator + "(" + l + ")", this.assign(t, f), i(f);
                        break;
                    case Ji.LogicalExpression:
                        t = t || this.nextId(), p.recurse(e.left, t), p.if_("&&" === e.operator ? t : p.not(t), p.lazyRecurse(e.right, t)), i(t);
                        break;
                    case Ji.ConditionalExpression:
                        t = t || this.nextId(), p.recurse(e.test, t), p.if_(t, p.lazyRecurse(e.alternate, t), p.lazyRecurse(e.consequent, t)), i(t);
                        break;
                    case Ji.Identifier:
                        t = t || this.nextId(), r && (r.context = "inputs" === p.stage ? "s" : this.assign(this.nextId(), this.getHasOwnProperty("l", e.name) + "?l:s"), r.computed = !1, r.name = e.name), Yt(e.name), p.if_("inputs" === p.stage || p.not(p.getHasOwnProperty("l", e.name)), function() {
                            p.if_("inputs" === p.stage || "s", function() {
                                a && 1 !== a && p.if_(p.not(p.nonComputedMember("s", e.name)), p.lazyAssign(p.nonComputedMember("s", e.name), "{}")), p.assign(t, p.nonComputedMember("s", e.name))
                            })
                        }, t && p.lazyAssign(t, p.nonComputedMember("l", e.name))), (p.state.expensiveChecks || ln(e.name)) && p.addEnsureSafeObject(t), i(t);
                        break;
                    case Ji.MemberExpression:
                        u = r && (r.context = this.nextId()) || this.nextId(), t = t || this.nextId(), p.recurse(e.object, u, n, function() {
                            p.if_(p.notNull(u), function() {
                                e.computed ? (l = p.nextId(), p.recurse(e.property, l), p.addEnsureSafeMemberName(l), a && 1 !== a && p.if_(p.not(p.computedMember(u, l)), p.lazyAssign(p.computedMember(u, l), "{}")), f = p.ensureSafeObject(p.computedMember(u, l)), p.assign(t, f), r && (r.computed = !0, r.name = l)) : (Yt(e.property.name), a && 1 !== a && p.if_(p.not(p.nonComputedMember(u, e.property.name)), p.lazyAssign(p.nonComputedMember(u, e.property.name), "{}")), f = p.nonComputedMember(u, e.property.name), (p.state.expensiveChecks || ln(e.property.name)) && (f = p.ensureSafeObject(f)), p.assign(t, f), r && (r.computed = !1, r.name = e.property.name))
                            }, function() {
                                p.assign(t, "undefined")
                            }), i(t)
                        }, !!a);
                        break;
                    case Ji.CallExpression:
                        t = t || this.nextId(), e.filter ? (l = p.filter(e.callee.name), c = [], o(e.arguments, function(e) {
                            var t = p.nextId();
                            p.recurse(e, t), c.push(t)
                        }), f = l + "(" + c.join(",") + ")", p.assign(t, f), i(t)) : (l = p.nextId(), u = {}, c = [], p.recurse(e.callee, l, u, function() {
                            p.if_(p.notNull(l), function() {
                                p.addEnsureSafeFunction(l), o(e.arguments, function(e) {
                                    p.recurse(e, p.nextId(), n, function(e) {
                                        c.push(p.ensureSafeObject(e))
                                    })
                                }), u.name ? (p.state.expensiveChecks || p.addEnsureSafeObject(u.context), f = p.member(u.context, u.name, u.computed) + "(" + c.join(",") + ")") : f = l + "(" + c.join(",") + ")", f = p.ensureSafeObject(f), p.assign(t, f)
                            }, function() {
                                p.assign(t, "undefined")
                            }), i(t)
                        }));
                        break;
                    case Ji.AssignmentExpression:
                        if (l = this.nextId(), u = {}, !tn(e.left)) throw Ui("lval", "Trying to assing a value to a non l-value");
                        this.recurse(e.left, n, u, function() {
                            p.if_(p.notNull(u.context), function() {
                                p.recurse(e.right, l), p.addEnsureSafeObject(p.member(u.context, u.name, u.computed)), f = p.member(u.context, u.name, u.computed) + e.operator + l, p.assign(t, f), i(t || f)
                            })
                        }, 1);
                        break;
                    case Ji.ArrayExpression:
                        c = [], o(e.elements, function(e) {
                            p.recurse(e, p.nextId(), n, function(e) {
                                c.push(e)
                            })
                        }), f = "[" + c.join(",") + "]", this.assign(t, f), i(f);
                        break;
                    case Ji.ObjectExpression:
                        c = [], o(e.properties, function(e) {
                            p.recurse(e.value, p.nextId(), n, function(t) {
                                c.push(p.escape(e.key.type === Ji.Identifier ? e.key.name : "" + e.key.value) + ":" + t)
                            })
                        }), f = "{" + c.join(",") + "}", this.assign(t, f), i(f);
                        break;
                    case Ji.ThisExpression:
                        this.assign(t, "s"), i("s");
                        break;
                    case Ji.NGValueParameter:
                        this.assign(t, "v"), i("v")
                }
            },
            getHasOwnProperty: function(e, t) {
                var n = e + "." + t,
                    r = this.current().own;
                return r.hasOwnProperty(n) || (r[n] = this.nextId(!1, e + "&&(" + this.escape(t) + " in " + e + ")")), r[n]
            },
            assign: function(e, t) {
                return e ? (this.current().body.push(e, "=", t, ";"), e) : void 0
            },
            filter: function(e) {
                return this.state.filters.hasOwnProperty(e) || (this.state.filters[e] = this.nextId(!0)), this.state.filters[e]
            },
            ifDefined: function(e, t) {
                return "ifDefined(" + e + "," + this.escape(t) + ")"
            },
            plus: function(e, t) {
                return "plus(" + e + "," + t + ")"
            },
            return_: function(e) {
                this.current().body.push("return ", e, ";")
            },
            if_: function(e, t, n) {
                if (e === !0) t();
                else {
                    var r = this.current().body;
                    r.push("if(", e, "){"), t(), r.push("}"), n && (r.push("else{"), n(), r.push("}"))
                }
            },
            not: function(e) {
                return "!(" + e + ")"
            },
            notNull: function(e) {
                return e + "!=null"
            },
            nonComputedMember: function(e, t) {
                return e + "." + t
            },
            computedMember: function(e, t) {
                return e + "[" + t + "]"
            },
            member: function(e, t, n) {
                return n ? this.computedMember(e, t) : this.nonComputedMember(e, t)
            },
            addEnsureSafeObject: function(e) {
                this.current().body.push(this.ensureSafeObject(e), ";")
            },
            addEnsureSafeMemberName: function(e) {
                this.current().body.push(this.ensureSafeMemberName(e), ";")
            },
            addEnsureSafeFunction: function(e) {
                this.current().body.push(this.ensureSafeFunction(e), ";")
            },
            ensureSafeObject: function(e) {
                return "ensureSafeObject(" + e + ",text)"
            },
            ensureSafeMemberName: function(e) {
                return "ensureSafeMemberName(" + e + ",text)"
            },
            ensureSafeFunction: function(e) {
                return "ensureSafeFunction(" + e + ",text)"
            },
            lazyRecurse: function(e, t, n, r, i, o) {
                var a = this;
                return function() {
                    a.recurse(e, t, n, r, i, o)
                }
            },
            lazyAssign: function(e, t) {
                var n = this;
                return function() {
                    n.assign(e, t)
                }
            },
            stringEscapeRegex: /[^ a-zA-Z0-9]/g,
            stringEscapeFn: function(e) {
                return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            },
            escape: function(e) {
                if (C(e)) return "'" + e.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'";
                if (k(e)) return e.toString();
                if (e === !0) return "true";
                if (e === !1) return "false";
                if (null === e) return "null";
                if ("undefined" == typeof e) return "undefined";
                throw Ui("esc", "IMPOSSIBLE")
            },
            nextId: function(e, t) {
                var n = "v" + this.state.nextId++;
                return e || this.current().vars.push(n + (t ? "=" + t : "")), n
            },
            current: function() {
                return this.state[this.state.computing]
            }
        }, sn.prototype = {
            compile: function(e, t) {
                var n = this,
                    r = this.astBuilder.ast(e);
                this.expression = e, this.expensiveChecks = t, Qt(r, n.$filter);
                var i, a;
                (i = nn(r)) && (a = this.recurse(i));
                var s, u = en(r.body);
                u && (s = [], o(u, function(e, t) {
                    var r = n.recurse(e);
                    e.input = r, s.push(r), e.watchId = t
                }));
                var l = [];
                o(r.body, function(e) {
                    l.push(n.recurse(e.expression))
                });
                var c = 0 === r.body.length ? function() {} : 1 === r.body.length ? l[0] : function(e, t) {
                    var n;
                    return o(l, function(r) {
                        n = r(e, t)
                    }), n
                };
                return a && (c.assign = function(e, t, n) {
                    return a(e, n, t)
                }), s && (c.inputs = s), c.literal = rn(r), c.constant = on(r), c
            },
            recurse: function(e, t, r) {
                var i, a, s, u = this;
                if (e.input) return this.inputs(e.input, e.watchId);
                switch (e.type) {
                    case Ji.Literal:
                        return this.value(e.value, t);
                    case Ji.UnaryExpression:
                        return a = this.recurse(e.argument), this["unary" + e.operator](a, t);
                    case Ji.BinaryExpression:
                        return i = this.recurse(e.left), a = this.recurse(e.right), this["binary" + e.operator](i, a, t);
                    case Ji.LogicalExpression:
                        return i = this.recurse(e.left), a = this.recurse(e.right), this["binary" + e.operator](i, a, t);
                    case Ji.ConditionalExpression:
                        return this["ternary?:"](this.recurse(e.test), this.recurse(e.alternate), this.recurse(e.consequent), t);
                    case Ji.Identifier:
                        return Yt(e.name, u.expression), u.identifier(e.name, u.expensiveChecks || ln(e.name), t, r, u.expression);
                    case Ji.MemberExpression:
                        return i = this.recurse(e.object, !1, !!r), e.computed || (Yt(e.property.name, u.expression), a = e.property.name), e.computed && (a = this.recurse(e.property)), e.computed ? this.computedMember(i, a, t, r, u.expression) : this.nonComputedMember(i, a, u.expensiveChecks, t, r, u.expression);
                    case Ji.CallExpression:
                        return s = [], o(e.arguments, function(e) {
                            s.push(u.recurse(e))
                        }), e.filter && (a = this.$filter(e.callee.name)), e.filter || (a = this.recurse(e.callee, !0)), e.filter ? function(e, r, i, o) {
                            for (var u = [], l = 0; l < s.length; ++l) u.push(s[l](e, r, i, o));
                            var c = a.apply(n, u, o);
                            return t ? {
                                context: n,
                                name: n,
                                value: c
                            } : c
                        } : function(e, n, r, i) {
                            var o, l = a(e, n, r, i);
                            if (null != l.value) {
                                Gt(l.context, u.expression), Kt(l.value, u.expression);
                                for (var c = [], f = 0; f < s.length; ++f) c.push(Gt(s[f](e, n, r, i), u.expression));
                                o = Gt(l.value.apply(l.context, c), u.expression)
                            }
                            return t ? {
                                value: o
                            } : o
                        };
                    case Ji.AssignmentExpression:
                        return i = this.recurse(e.left, !0, 1), a = this.recurse(e.right),
                            function(e, n, r, o) {
                                var s = i(e, n, r, o),
                                    l = a(e, n, r, o);
                                return Gt(s.value, u.expression), s.context[s.name] = l, t ? {
                                    value: l
                                } : l
                            };
                    case Ji.ArrayExpression:
                        return s = [], o(e.elements, function(e) {
                                s.push(u.recurse(e))
                            }),
                            function(e, n, r, i) {
                                for (var o = [], a = 0; a < s.length; ++a) o.push(s[a](e, n, r, i));
                                return t ? {
                                    value: o
                                } : o
                            };
                    case Ji.ObjectExpression:
                        return s = [], o(e.properties, function(e) {
                                s.push({
                                    key: e.key.type === Ji.Identifier ? e.key.name : "" + e.key.value,
                                    value: u.recurse(e.value)
                                })
                            }),
                            function(e, n, r, i) {
                                for (var o = {}, a = 0; a < s.length; ++a) o[s[a].key] = s[a].value(e, n, r, i);
                                return t ? {
                                    value: o
                                } : o
                            };
                    case Ji.ThisExpression:
                        return function(e) {
                            return t ? {
                                value: e
                            } : e
                        };
                    case Ji.NGValueParameter:
                        return function(e, n, r, i) {
                            return t ? {
                                value: r
                            } : r
                        }
                }
            },
            "unary+": function(e, t) {
                return function(n, r, i, o) {
                    var a = e(n, r, i, o);
                    return a = b(a) ? +a : 0, t ? {
                        value: a
                    } : a
                }
            },
            "unary-": function(e, t) {
                return function(n, r, i, o) {
                    var a = e(n, r, i, o);
                    return a = b(a) ? -a : 0, t ? {
                        value: a
                    } : a
                }
            },
            "unary!": function(e, t) {
                return function(n, r, i, o) {
                    var a = !e(n, r, i, o);
                    return t ? {
                        value: a
                    } : a
                }
            },
            "binary+": function(e, t, n) {
                return function(r, i, o, a) {
                    var s = e(r, i, o, a),
                        u = t(r, i, o, a),
                        l = Xt(s, u);
                    return n ? {
                        value: l
                    } : l
                }
            },
            "binary-": function(e, t, n) {
                return function(r, i, o, a) {
                    var s = e(r, i, o, a),
                        u = t(r, i, o, a),
                        l = (b(s) ? s : 0) - (b(u) ? u : 0);
                    return n ? {
                        value: l
                    } : l
                }
            },
            "binary*": function(e, t, n) {
                return function(r, i, o, a) {
                    var s = e(r, i, o, a) * t(r, i, o, a);
                    return n ? {
                        value: s
                    } : s
                }
            },
            "binary/": function(e, t, n) {
                return function(r, i, o, a) {
                    var s = e(r, i, o, a) / t(r, i, o, a);
                    return n ? {
                        value: s
                    } : s
                }
            },
            "binary%": function(e, t, n) {
                return function(r, i, o, a) {
                    var s = e(r, i, o, a) % t(r, i, o, a);
                    return n ? {
                        value: s
                    } : s
                }
            },
            "binary===": function(e, t, n) {
                return function(r, i, o, a) {
                    var s = e(r, i, o, a) === t(r, i, o, a);
                    return n ? {
                        value: s
                    } : s
                }
            },
            "binary!==": function(e, t, n) {
                return function(r, i, o, a) {
                    var s = e(r, i, o, a) !== t(r, i, o, a);
                    return n ? {
                        value: s
                    } : s
                }
            },
            "binary==": function(e, t, n) {
                return function(r, i, o, a) {
                    var s = e(r, i, o, a) == t(r, i, o, a);
                    return n ? {
                        value: s
                    } : s
                }
            },
            "binary!=": function(e, t, n) {
                return function(r, i, o, a) {
                    var s = e(r, i, o, a) != t(r, i, o, a);
                    return n ? {
                        value: s
                    } : s
                }
            },
            "binary<": function(e, t, n) {
                return function(r, i, o, a) {
                    var s = e(r, i, o, a) < t(r, i, o, a);
                    return n ? {
                        value: s
                    } : s
                }
            },
            "binary>": function(e, t, n) {
                return function(r, i, o, a) {
                    var s = e(r, i, o, a) > t(r, i, o, a);
                    return n ? {
                        value: s
                    } : s
                }
            },
            "binary<=": function(e, t, n) {
                return function(r, i, o, a) {
                    var s = e(r, i, o, a) <= t(r, i, o, a);
                    return n ? {
                        value: s
                    } : s
                }
            },
            "binary>=": function(e, t, n) {
                return function(r, i, o, a) {
                    var s = e(r, i, o, a) >= t(r, i, o, a);
                    return n ? {
                        value: s
                    } : s
                }
            },
            "binary&&": function(e, t, n) {
                return function(r, i, o, a) {
                    var s = e(r, i, o, a) && t(r, i, o, a);
                    return n ? {
                        value: s
                    } : s
                }
            },
            "binary||": function(e, t, n) {
                return function(r, i, o, a) {
                    var s = e(r, i, o, a) || t(r, i, o, a);
                    return n ? {
                        value: s
                    } : s
                }
            },
            "ternary?:": function(e, t, n, r) {
                return function(i, o, a, s) {
                    var u = e(i, o, a, s) ? t(i, o, a, s) : n(i, o, a, s);
                    return r ? {
                        value: u
                    } : u
                }
            },
            value: function(e, t) {
                return function() {
                    return t ? {
                        context: n,
                        name: n,
                        value: e
                    } : e
                }
            },
            identifier: function(e, t, r, i, o) {
                return function(a, s, u, l) {
                    var c = s && e in s ? s : a;
                    i && 1 !== i && c && !c[e] && (c[e] = {});
                    var f = c ? c[e] : n;
                    return t && Gt(f, o), r ? {
                        context: c,
                        name: e,
                        value: f
                    } : f
                }
            },
            computedMember: function(e, t, n, r, i) {
                return function(o, a, s, u) {
                    var l, c, f = e(o, a, s, u);
                    return null != f && (l = t(o, a, s, u), Yt(l, i), r && 1 !== r && f && !f[l] && (f[l] = {}), c = f[l], Gt(c, i)), n ? {
                        context: f,
                        name: l,
                        value: c
                    } : c
                }
            },
            nonComputedMember: function(e, t, r, i, o, a) {
                return function(s, u, l, c) {
                    var f = e(s, u, l, c);
                    o && 1 !== o && f && !f[t] && (f[t] = {});
                    var p = null != f ? f[t] : n;
                    return (r || ln(t)) && Gt(p, a), i ? {
                        context: f,
                        name: t,
                        value: p
                    } : p
                }
            },
            inputs: function(e, t) {
                return function(n, r, i, o) {
                    return o ? o[t] : e(n, r, i)
                }
            }
        };
        var Xi = function(e, t, n) {
            this.lexer = e, this.$filter = t, this.options = n, this.ast = new Ji(this.lexer), this.astCompiler = n.csp ? new sn(this.ast, t) : new an(this.ast, t)
        };
        Xi.prototype = {
            constructor: Xi,
            parse: function(e) {
                return this.astCompiler.compile(e, this.options.expensiveChecks)
            }
        };
        var Zi = (ge(), ge(), Object.prototype.valueOf),
            Qi = r("$sce"),
            eo = {
                HTML: "html",
                CSS: "css",
                URL: "url",
                RESOURCE_URL: "resourceUrl",
                JS: "js"
            },
            Ai = r("$compile"),
            to = t.createElement("a"),
            no = En(e.location.href);
        An.$inject = ["$document"], Mn.$inject = ["$provide"], In.$inject = ["$locale"], qn.$inject = ["$locale"];
        var ro = ".",
            io = {
                yyyy: Hn("FullYear", 4),
                yy: Hn("FullYear", 2, 0, !0),
                y: Hn("FullYear", 1),
                MMMM: Rn("Month"),
                MMM: Rn("Month", !0),
                MM: Hn("Month", 2, 1),
                M: Hn("Month", 1, 1),
                dd: Hn("Date", 2),
                d: Hn("Date", 1),
                HH: Hn("Hours", 2),
                H: Hn("Hours", 1),
                hh: Hn("Hours", 2, -12),
                h: Hn("Hours", 1, -12),
                mm: Hn("Minutes", 2),
                m: Hn("Minutes", 1),
                ss: Hn("Seconds", 2),
                s: Hn("Seconds", 1),
                sss: Hn("Milliseconds", 3),
                EEEE: Rn("Day"),
                EEE: Rn("Day", !0),
                a: Wn,
                Z: _n,
                ww: zn(2),
                w: zn(1),
                G: Yn,
                GG: Yn,
                GGG: Yn,
                GGGG: Gn
            },
            oo = /((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,
            ao = /^\-?\d+$/;
        Kn.$inject = ["$locale"];
        var so = v(br),
            uo = v(xr);
        Zn.$inject = ["$parse"];
        var lo = v({
                restrict: "E",
                compile: function(e, t) {
                    return t.href || t.xlinkHref ? void 0 : function(e, t) {
                        if ("a" === t[0].nodeName.toLowerCase()) {
                            var n = "[object SVGAnimatedString]" === jr.call(t.prop("href")) ? "xlink:href" : "href";
                            t.on("click", function(e) {
                                t.attr(n) || e.preventDefault()
                            })
                        }
                    }
                }
            }),
            co = {};
        o(hi, function(e, t) {
            function n(e, n, i) {
                e.$watch(i[r], function(e) {
                    i.$set(t, !!e)
                })
            }
            if ("multiple" != e) {
                var r = lt("ng-" + t),
                    i = n;
                "checked" === e && (i = function(e, t, i) {
                    i.ngModel !== i[r] && n(e, t, i)
                }), co[r] = function() {
                    return {
                        restrict: "A",
                        priority: 100,
                        link: i
                    }
                }
            }
        }), o(gi, function(e, t) {
            co[t] = function() {
                return {
                    priority: 100,
                    link: function(e, n, r) {
                        if ("ngPattern" === t && "/" == r.ngPattern.charAt(0)) {
                            var i = r.ngPattern.match($r);
                            if (i) return void r.$set("ngPattern", new RegExp(i[1], i[2]))
                        }
                        e.$watch(r[t], function(e) {
                            r.$set(t, e)
                        })
                    }
                }
            }
        }), o(["src", "srcset", "href"], function(e) {
            var t = lt("ng-" + e);
            co[t] = function() {
                return {
                    priority: 99,
                    link: function(n, r, i) {
                        var o = e,
                            a = e;
                        "href" === e && "[object SVGAnimatedString]" === jr.call(r.prop("href")) && (a = "xlinkHref", i.$attr[a] = "xlink:href", o = null), i.$observe(t, function(t) {
                            return t ? (i.$set(a, t), void(Sr && o && r.prop(o, i[a]))) : void("href" === e && i.$set(a, null))
                        })
                    }
                }
            }
        });
        var fo = {
                $addControl: m,
                $$renameControl: er,
                $removeControl: m,
                $setValidity: m,
                $setDirty: m,
                $setPristine: m,
                $setSubmitted: m
            },
            po = "ng-submitted";
        tr.$inject = ["$element", "$attrs", "$scope", "$animate", "$interpolate"];
        var ho = function(e) {
                return ["$timeout", function(t) {
                    var r = {
                        name: "form",
                        restrict: e ? "EAC" : "E",
                        controller: tr,
                        compile: function(r, i) {
                            r.addClass(Go).addClass(Wo);
                            var o = i.name ? "name" : e && i.ngForm ? "ngForm" : !1;
                            return {
                                pre: function(e, r, i, a) {
                                    if (!("action" in i)) {
                                        var s = function(t) {
                                            e.$apply(function() {
                                                a.$commitViewValue(), a.$setSubmitted()
                                            }), t.preventDefault()
                                        };
                                        ni(r[0], "submit", s), r.on("$destroy", function() {
                                            t(function() {
                                                ri(r[0], "submit", s)
                                            }, 0, !1)
                                        })
                                    }
                                    var u = a.$$parentForm;
                                    o && (un(e, a.$name, a, a.$name), i.$observe(o, function(t) {
                                        a.$name !== t && (un(e, a.$name, n, a.$name), u.$$renameControl(a, t), un(e, a.$name, a, a.$name))
                                    })), r.on("$destroy", function() {
                                        u.$removeControl(a), o && un(e, i[o], n, a.$name), f(a, fo)
                                    })
                                }
                            }
                        }
                    };
                    return r
                }]
            },
            mo = ho(),
            go = ho(!0),
            vo = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
            $o = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
            yo = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
            bo = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,
            wo = /^(\d{4})-(\d{2})-(\d{2})$/,
            xo = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
            Co = /^(\d{4})-W(\d\d)$/,
            ko = /^(\d{4})-(\d\d)$/,
            So = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
            Eo = {
                text: rr,
                date: sr("date", wo, ar(wo, ["yyyy", "MM", "dd"]), "yyyy-MM-dd"),
                "datetime-local": sr("datetimelocal", xo, ar(xo, ["yyyy", "MM", "dd", "HH", "mm", "ss", "sss"]), "yyyy-MM-ddTHH:mm:ss.sss"),
                time: sr("time", So, ar(So, ["HH", "mm", "ss", "sss"]), "HH:mm:ss.sss"),
                week: sr("week", Co, or, "yyyy-Www"),
                month: sr("month", ko, ar(ko, ["yyyy", "MM"]), "yyyy-MM"),
                number: lr,
                url: cr,
                email: fr,
                radio: pr,
                checkbox: hr,
                hidden: m,
                button: m,
                submit: m,
                reset: m,
                file: m
            },
            To = ["$browser", "$sniffer", "$filter", "$parse", function(e, t, n, r) {
                return {
                    restrict: "E",
                    require: ["?ngModel"],
                    link: {
                        pre: function(i, o, a, s) {
                            s[0] && (Eo[br(a.type)] || Eo.text)(i, o, a, s[0], t, e, n, r)
                        }
                    }
                }
            }],
            Do = /^(true|false|\d+)$/,
            Ao = function() {
                return {
                    restrict: "A",
                    priority: 100,
                    compile: function(e, t) {
                        return Do.test(t.ngValue) ? function(e, t, n) {
                            n.$set("value", e.$eval(n.ngValue))
                        } : function(e, t, n) {
                            e.$watch(n.ngValue, function(e) {
                                n.$set("value", e)
                            })
                        }
                    }
                }
            },
            Oo = ["$compile", function(e) {
                return {
                    restrict: "AC",
                    compile: function(t) {
                        return e.$$addBindingClass(t),
                            function(t, r, i) {
                                e.$$addBindingInfo(r, i.ngBind), r = r[0], t.$watch(i.ngBind, function(e) {
                                    r.textContent = e === n ? "" : e
                                })
                            }
                    }
                }
            }],
            Mo = ["$interpolate", "$compile", function(e, t) {
                return {
                    compile: function(r) {
                        return t.$$addBindingClass(r),
                            function(r, i, o) {
                                var a = e(i.attr(o.$attr.ngBindTemplate));
                                t.$$addBindingInfo(i, a.expressions), i = i[0], o.$observe("ngBindTemplate", function(e) {
                                    i.textContent = e === n ? "" : e
                                })
                            }
                    }
                }
            }],
            jo = ["$sce", "$parse", "$compile", function(e, t, n) {
                return {
                    restrict: "A",
                    compile: function(r, i) {
                        var o = t(i.ngBindHtml),
                            a = t(i.ngBindHtml, function(e) {
                                return (e || "").toString()
                            });
                        return n.$$addBindingClass(r),
                            function(t, r, i) {
                                n.$$addBindingInfo(r, i.ngBindHtml),
                                    t.$watch(a, function() {
                                        r.html(e.getTrustedHtml(o(t)) || "")
                                    })
                            }
                    }
                }
            }],
            No = v({
                restrict: "A",
                require: "ngModel",
                link: function(e, t, n, r) {
                    r.$viewChangeListeners.push(function() {
                        e.$eval(n.ngChange)
                    })
                }
            }),
            Po = mr("", !0),
            Lo = mr("Odd", 0),
            Io = mr("Even", 1),
            qo = Qn({
                compile: function(e, t) {
                    t.$set("ngCloak", n), e.removeClass("ng-cloak")
                }
            }),
            Vo = [function() {
                return {
                    restrict: "A",
                    scope: !0,
                    controller: "@",
                    priority: 500
                }
            }],
            Fo = {},
            Ho = {
                blur: !0,
                focus: !0
            };
        o("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(e) {
            var t = lt("ng-" + e);
            Fo[t] = ["$parse", "$rootScope", function(n, r) {
                return {
                    restrict: "A",
                    compile: function(i, o) {
                        var a = n(o[t], null, !0);
                        return function(t, n) {
                            n.on(e, function(n) {
                                var i = function() {
                                    a(t, {
                                        $event: n
                                    })
                                };
                                Ho[e] && r.$$phase ? t.$evalAsync(i) : t.$apply(i)
                            })
                        }
                    }
                }
            }]
        });
        var Ro = ["$animate", function(e) {
                return {
                    multiElement: !0,
                    transclude: "element",
                    priority: 600,
                    terminal: !0,
                    restrict: "A",
                    $$tlb: !0,
                    link: function(n, r, i, o, a) {
                        var s, u, l;
                        n.$watch(i.ngIf, function(n) {
                            n ? u || a(function(n, o) {
                                u = o, n[n.length++] = t.createComment(" end ngIf: " + i.ngIf + " "), s = {
                                    clone: n
                                }, e.enter(n, r.parent(), r)
                            }) : (l && (l.remove(), l = null), u && (u.$destroy(), u = null), s && (l = me(s.clone), e.leave(l).then(function() {
                                l = null
                            }), s = null))
                        })
                    }
                }
            }],
            _o = ["$templateRequest", "$anchorScroll", "$animate", function(e, t, n) {
                return {
                    restrict: "ECA",
                    priority: 400,
                    terminal: !0,
                    transclude: "element",
                    controller: Lr.noop,
                    compile: function(r, i) {
                        var o = i.ngInclude || i.src,
                            a = i.onload || "",
                            s = i.autoscroll;
                        return function(r, i, u, l, c) {
                            var f, p, d, h = 0,
                                m = function() {
                                    p && (p.remove(), p = null), f && (f.$destroy(), f = null), d && (n.leave(d).then(function() {
                                        p = null
                                    }), p = d, d = null)
                                };
                            r.$watch(o, function(o) {
                                var u = function() {
                                        !b(s) || s && !r.$eval(s) || t()
                                    },
                                    p = ++h;
                                o ? (e(o, !0).then(function(e) {
                                    if (p === h) {
                                        var t = r.$new();
                                        l.template = e;
                                        var s = c(t, function(e) {
                                            m(), n.enter(e, null, i).then(u)
                                        });
                                        f = t, d = s, f.$emit("$includeContentLoaded", o), r.$eval(a)
                                    }
                                }, function() {
                                    p === h && (m(), r.$emit("$includeContentError", o))
                                }), r.$emit("$includeContentRequested", o)) : (m(), l.template = null)
                            })
                        }
                    }
                }
            }],
            Uo = ["$compile", function(e) {
                return {
                    restrict: "ECA",
                    priority: -400,
                    require: "ngInclude",
                    link: function(n, r, i, o) {
                        return /SVG/.test(r[0].toString()) ? (r.empty(), void e(Ee(o.template, t).childNodes)(n, function(e) {
                            r.append(e)
                        }, {
                            futureParentElement: r
                        })) : (r.html(o.template), void e(r.contents())(n))
                    }
                }
            }],
            Bo = Qn({
                priority: 450,
                compile: function() {
                    return {
                        pre: function(e, t, n) {
                            e.$eval(n.ngInit)
                        }
                    }
                }
            }),
            zo = function() {
                return {
                    restrict: "A",
                    priority: 100,
                    require: "ngModel",
                    link: function(e, t, r, i) {
                        var a = t.attr(r.$attr.ngList) || ", ",
                            s = "false" !== r.ngTrim,
                            u = s ? Hr(a) : a,
                            l = function(e) {
                                if (!y(e)) {
                                    var t = [];
                                    return e && o(e.split(u), function(e) {
                                        e && t.push(s ? Hr(e) : e)
                                    }), t
                                }
                            };
                        i.$parsers.push(l), i.$formatters.push(function(e) {
                            return Vr(e) ? e.join(a) : n
                        }), i.$isEmpty = function(e) {
                            return !e || !e.length
                        }
                    }
                }
            },
            Wo = "ng-valid",
            Yo = "ng-invalid",
            Go = "ng-pristine",
            Ko = "ng-dirty",
            Jo = "ng-untouched",
            Xo = "ng-touched",
            Zo = "ng-pending",
            Qo = new r("ngModel"),
            ea = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function(e, t, r, i, a, s, u, l, c, f) {
                this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$$rawModelValue = n, this.$validators = {}, this.$asyncValidators = {}, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$untouched = !0, this.$touched = !1, this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$error = {}, this.$$success = {}, this.$pending = n, this.$name = f(r.name || "", !1)(e);
                var p, d = a(r.ngModel),
                    h = d.assign,
                    g = d,
                    v = h,
                    $ = null,
                    w = this;
                this.$$setOptions = function(e) {
                    if (w.$options = e, e && e.getterSetter) {
                        var t = a(r.ngModel + "()"),
                            n = a(r.ngModel + "($$$p)");
                        g = function(e) {
                            var n = d(e);
                            return E(n) && (n = t(e)), n
                        }, v = function(e, t) {
                            E(d(e)) ? n(e, {
                                $$$p: w.$modelValue
                            }) : h(e, w.$modelValue)
                        }
                    } else if (!d.assign) throw Qo("nonassign", "Expression '{0}' is non-assignable. Element: {1}", r.ngModel, Z(i))
                }, this.$render = m, this.$isEmpty = function(e) {
                    return y(e) || "" === e || null === e || e !== e
                };
                var x = i.inheritedData("$formController") || fo,
                    C = 0;
                gr({
                    ctrl: this,
                    $element: i,
                    set: function(e, t) {
                        e[t] = !0
                    },
                    unset: function(e, t) {
                        delete e[t]
                    },
                    parentForm: x,
                    $animate: s
                }), this.$setPristine = function() {
                    w.$dirty = !1, w.$pristine = !0, s.removeClass(i, Ko), s.addClass(i, Go)
                }, this.$setDirty = function() {
                    w.$dirty = !0, w.$pristine = !1, s.removeClass(i, Go), s.addClass(i, Ko), x.$setDirty()
                }, this.$setUntouched = function() {
                    w.$touched = !1, w.$untouched = !0, s.setClass(i, Jo, Xo)
                }, this.$setTouched = function() {
                    w.$touched = !0, w.$untouched = !1, s.setClass(i, Xo, Jo)
                }, this.$rollbackViewValue = function() {
                    u.cancel($), w.$viewValue = w.$$lastCommittedViewValue, w.$render()
                }, this.$validate = function() {
                    if (!k(w.$modelValue) || !isNaN(w.$modelValue)) {
                        var e = w.$$lastCommittedViewValue,
                            t = w.$$rawModelValue,
                            r = w.$valid,
                            i = w.$modelValue,
                            o = w.$options && w.$options.allowInvalid;
                        w.$$runValidators(t, e, function(e) {
                            o || r === e || (w.$modelValue = e ? t : n, w.$modelValue !== i && w.$$writeModelToScope())
                        })
                    }
                }, this.$$runValidators = function(e, t, r) {
                    function i() {
                        var e = w.$$parserName || "parse";
                        return p !== n ? (p || (o(w.$validators, function(e, t) {
                            u(t, null)
                        }), o(w.$asyncValidators, function(e, t) {
                            u(t, null)
                        })), u(e, p), p) : (u(e, null), !0)
                    }

                    function a() {
                        var n = !0;
                        return o(w.$validators, function(r, i) {
                            var o = r(e, t);
                            n = n && o, u(i, o)
                        }), n ? !0 : (o(w.$asyncValidators, function(e, t) {
                            u(t, null)
                        }), !1)
                    }

                    function s() {
                        var r = [],
                            i = !0;
                        o(w.$asyncValidators, function(o, a) {
                            var s = o(e, t);
                            if (!P(s)) throw Qo("$asyncValidators", "Expected asynchronous validator to return a promise but got '{0}' instead.", s);
                            u(a, n), r.push(s.then(function() {
                                u(a, !0)
                            }, function(e) {
                                i = !1, u(a, !1)
                            }))
                        }), r.length ? c.all(r).then(function() {
                            l(i)
                        }, m) : l(!0)
                    }

                    function u(e, t) {
                        f === C && w.$setValidity(e, t)
                    }

                    function l(e) {
                        f === C && r(e)
                    }
                    C++;
                    var f = C;
                    return i() && a() ? void s() : void l(!1)
                }, this.$commitViewValue = function() {
                    var e = w.$viewValue;
                    u.cancel($), (w.$$lastCommittedViewValue !== e || "" === e && w.$$hasNativeValidators) && (w.$$lastCommittedViewValue = e, w.$pristine && this.$setDirty(), this.$$parseAndValidate())
                }, this.$$parseAndValidate = function() {
                    function t() {
                        w.$modelValue !== a && w.$$writeModelToScope()
                    }
                    var r = w.$$lastCommittedViewValue,
                        i = r;
                    if (p = y(i) ? n : !0)
                        for (var o = 0; o < w.$parsers.length; o++)
                            if (i = w.$parsers[o](i), y(i)) {
                                p = !1;
                                break
                            }
                    k(w.$modelValue) && isNaN(w.$modelValue) && (w.$modelValue = g(e));
                    var a = w.$modelValue,
                        s = w.$options && w.$options.allowInvalid;
                    w.$$rawModelValue = i, s && (w.$modelValue = i, t()), w.$$runValidators(i, w.$$lastCommittedViewValue, function(e) {
                        s || (w.$modelValue = e ? i : n, t())
                    })
                }, this.$$writeModelToScope = function() {
                    v(e, w.$modelValue), o(w.$viewChangeListeners, function(e) {
                        try {
                            e()
                        } catch (n) {
                            t(n)
                        }
                    })
                }, this.$setViewValue = function(e, t) {
                    w.$viewValue = e, (!w.$options || w.$options.updateOnDefault) && w.$$debounceViewValueCommit(t)
                }, this.$$debounceViewValueCommit = function(t) {
                    var n, r = 0,
                        i = w.$options;
                    i && b(i.debounce) && (n = i.debounce, k(n) ? r = n : k(n[t]) ? r = n[t] : k(n["default"]) && (r = n["default"])), u.cancel($), r ? $ = u(function() {
                        w.$commitViewValue()
                    }, r) : l.$$phase ? w.$commitViewValue() : e.$apply(function() {
                        w.$commitViewValue()
                    })
                }, e.$watch(function() {
                    var t = g(e);
                    if (t !== w.$modelValue && (w.$modelValue === w.$modelValue || t === t)) {
                        w.$modelValue = w.$$rawModelValue = t, p = n;
                        for (var r = w.$formatters, i = r.length, o = t; i--;) o = r[i](o);
                        w.$viewValue !== o && (w.$viewValue = w.$$lastCommittedViewValue = o, w.$render(), w.$$runValidators(t, o, m))
                    }
                    return t
                })
            }],
            ta = ["$rootScope", function(e) {
                return {
                    restrict: "A",
                    require: ["ngModel", "^?form", "^?ngModelOptions"],
                    controller: ea,
                    priority: 1,
                    compile: function(t) {
                        return t.addClass(Go).addClass(Jo).addClass(Wo), {
                            pre: function(e, t, n, r) {
                                var i = r[0],
                                    o = r[1] || fo;
                                i.$$setOptions(r[2] && r[2].$options), o.$addControl(i), n.$observe("name", function(e) {
                                    i.$name !== e && o.$$renameControl(i, e)
                                }), e.$on("$destroy", function() {
                                    o.$removeControl(i)
                                })
                            },
                            post: function(t, n, r, i) {
                                var o = i[0];
                                o.$options && o.$options.updateOn && n.on(o.$options.updateOn, function(e) {
                                    o.$$debounceViewValueCommit(e && e.type)
                                }), n.on("blur", function(n) {
                                    o.$touched || (e.$$phase ? t.$evalAsync(o.$setTouched) : t.$apply(o.$setTouched))
                                })
                            }
                        }
                    }
                }
            }],
            na = /(\s+|^)default(\s+|$)/,
            ra = function() {
                return {
                    restrict: "A",
                    controller: ["$scope", "$attrs", function(e, t) {
                        var r = this;
                        this.$options = H(e.$eval(t.ngModelOptions)), this.$options.updateOn !== n ? (this.$options.updateOnDefault = !1, this.$options.updateOn = Hr(this.$options.updateOn.replace(na, function() {
                            return r.$options.updateOnDefault = !0, " "
                        }))) : this.$options.updateOnDefault = !0
                    }]
                }
            },
            ia = Qn({
                terminal: !0,
                priority: 1e3
            }),
            oa = r("ngOptions"),
            aa = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
            sa = ["$compile", "$parse", function(e, n) {
                function r(e, t, r) {
                    function o(e, t, n, r, i) {
                        this.selectValue = e, this.viewValue = t, this.label = n, this.group = r, this.disabled = i
                    }

                    function a(e) {
                        var t;
                        if (!l && i(e)) t = e;
                        else {
                            t = [];
                            for (var n in e) e.hasOwnProperty(n) && "$" !== n.charAt(0) && t.push(n)
                        }
                        return t
                    }
                    var s = e.match(aa);
                    if (!s) throw oa("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", e, Z(t));
                    var u = s[5] || s[7],
                        l = s[6],
                        c = / as /.test(s[0]) && s[1],
                        f = s[9],
                        p = n(s[2] ? s[1] : u),
                        d = c && n(c),
                        h = d || p,
                        m = f && n(f),
                        g = f ? function(e, t) {
                            return m(r, t)
                        } : function(e) {
                            return Ge(e)
                        },
                        v = function(e, t) {
                            return g(e, C(e, t))
                        },
                        $ = n(s[2] || s[1]),
                        y = n(s[3] || ""),
                        b = n(s[4] || ""),
                        w = n(s[8]),
                        x = {},
                        C = l ? function(e, t) {
                            return x[l] = t, x[u] = e, x
                        } : function(e) {
                            return x[u] = e, x
                        };
                    return {
                        trackBy: f,
                        getTrackByValue: v,
                        getWatchables: n(w, function(e) {
                            var t = [];
                            e = e || [];
                            for (var n = a(e), i = n.length, o = 0; i > o; o++) {
                                var u = e === n ? o : n[o],
                                    l = (e[u], C(e[u], u)),
                                    c = g(e[u], l);
                                if (t.push(c), s[2] || s[1]) {
                                    var f = $(r, l);
                                    t.push(f)
                                }
                                if (s[4]) {
                                    var p = b(r, l);
                                    t.push(p)
                                }
                            }
                            return t
                        }),
                        getOptions: function() {
                            for (var e = [], t = {}, n = w(r) || [], i = a(n), s = i.length, u = 0; s > u; u++) {
                                var l = n === i ? u : i[u],
                                    c = n[l],
                                    p = C(c, l),
                                    d = h(r, p),
                                    m = g(d, p),
                                    x = $(r, p),
                                    k = y(r, p),
                                    S = b(r, p),
                                    E = new o(m, d, x, k, S);
                                e.push(E), t[m] = E
                            }
                            return {
                                items: e,
                                selectValueMap: t,
                                getOptionFromViewValue: function(e) {
                                    return t[v(e)]
                                },
                                getViewValueFromOption: function(e) {
                                    return f ? Lr.copy(e.viewValue) : e.viewValue
                                }
                            }
                        }
                    }
                }
                var a = t.createElement("option"),
                    s = t.createElement("optgroup");
                return {
                    restrict: "A",
                    terminal: !0,
                    require: ["select", "?ngModel"],
                    link: function(t, n, i, u) {
                        function l(e, t) {
                            e.element = t, t.disabled = e.disabled, e.value !== t.value && (t.value = e.selectValue), e.label !== t.label && (t.label = e.label, t.textContent = e.label)
                        }

                        function c(e, t, n, r) {
                            var i;
                            return t && br(t.nodeName) === n ? i = t : (i = r.cloneNode(!1), t ? e.insertBefore(i, t) : e.appendChild(i)), i
                        }

                        function f(e) {
                            for (var t; e;) t = e.nextSibling, _e(e), e = t
                        }

                        function p(e) {
                            var t = m && m[0],
                                n = x && x[0];
                            if (t || n)
                                for (; e && (e === t || e === n);) e = e.nextSibling;
                            return e
                        }

                        function d() {
                            var e = C && g.readValue();
                            C = k.getOptions();
                            var t = {},
                                r = n[0].firstChild;
                            if (w && n.prepend(m), r = p(r), C.items.forEach(function(e) {
                                    var i, o, u;
                                    e.group ? (i = t[e.group], i || (o = c(n[0], r, "optgroup", s), r = o.nextSibling, o.label = e.group, i = t[e.group] = {
                                        groupElement: o,
                                        currentOptionElement: o.firstChild
                                    }), u = c(i.groupElement, i.currentOptionElement, "option", a), l(e, u), i.currentOptionElement = u.nextSibling) : (u = c(n[0], r, "option", a), l(e, u), r = u.nextSibling)
                                }), Object.keys(t).forEach(function(e) {
                                    f(t[e].currentOptionElement)
                                }), f(r), h.$render(), !h.$isEmpty(e)) {
                                var i = g.readValue();
                                (k.trackBy ? _(e, i) : e === i) || (h.$setViewValue(i), h.$render())
                            }
                        }
                        var h = u[1];
                        if (h) {
                            for (var m, g = u[0], v = i.multiple, $ = 0, y = n.children(), b = y.length; b > $; $++)
                                if ("" === y[$].value) {
                                    m = y.eq($);
                                    break
                                }
                            var w = !!m,
                                x = Er(a.cloneNode(!1));
                            x.val("?");
                            var C, k = r(i.ngOptions, n, t),
                                S = function() {
                                    w || n.prepend(m), n.val(""), m.prop("selected", !0), m.attr("selected", !0)
                                },
                                E = function() {
                                    w || m.remove()
                                },
                                T = function() {
                                    n.prepend(x), n.val("?"), x.prop("selected", !0), x.attr("selected", !0)
                                },
                                D = function() {
                                    x.remove()
                                };
                            v ? (h.$isEmpty = function(e) {
                                return !e || 0 === e.length
                            }, g.writeValue = function(e) {
                                C.items.forEach(function(e) {
                                    e.element.selected = !1
                                }), e && e.forEach(function(e) {
                                    var t = C.getOptionFromViewValue(e);
                                    t && !t.disabled && (t.element.selected = !0)
                                })
                            }, g.readValue = function() {
                                var e = n.val() || [],
                                    t = [];
                                return o(e, function(e) {
                                    var n = C.selectValueMap[e];
                                    n.disabled || t.push(C.getViewValueFromOption(n))
                                }), t
                            }, k.trackBy && t.$watchCollection(function() {
                                return Vr(h.$viewValue) ? h.$viewValue.map(function(e) {
                                    return k.getTrackByValue(e)
                                }) : void 0
                            }, function() {
                                h.$render()
                            })) : (g.writeValue = function(e) {
                                var t = C.getOptionFromViewValue(e);
                                t && !t.disabled ? n[0].value !== t.selectValue && (D(), E(), n[0].value = t.selectValue, t.element.selected = !0, t.element.setAttribute("selected", "selected")) : null === e || w ? (D(), S()) : (E(), T())
                            }, g.readValue = function() {
                                var e = C.selectValueMap[n.val()];
                                return e && !e.disabled ? (E(), D(), C.getViewValueFromOption(e)) : null
                            }, k.trackBy && t.$watch(function() {
                                return k.getTrackByValue(h.$viewValue)
                            }, function() {
                                h.$render()
                            })), w ? (m.remove(), e(m)(t), m.removeClass("ng-scope")) : m = Er(a.cloneNode(!1)), d(), t.$watchCollection(k.getWatchables, d)
                        }
                    }
                }
            }],
            ua = ["$locale", "$interpolate", "$log", function(e, t, n) {
                var r = /{}/g,
                    i = /^when(Minus)?(.+)$/;
                return {
                    link: function(a, s, u) {
                        function l(e) {
                            s.text(e || "")
                        }
                        var c, f = u.count,
                            p = u.$attr.when && s.attr(u.$attr.when),
                            d = u.offset || 0,
                            h = a.$eval(p) || {},
                            g = {},
                            v = t.startSymbol(),
                            $ = t.endSymbol(),
                            b = v + f + "-" + d + $,
                            w = Lr.noop;
                        o(u, function(e, t) {
                            var n = i.exec(t);
                            if (n) {
                                var r = (n[1] ? "-" : "") + br(n[2]);
                                h[r] = s.attr(u.$attr[t])
                            }
                        }), o(h, function(e, n) {
                            g[n] = t(e.replace(r, b))
                        }), a.$watch(f, function(t) {
                            var r = parseFloat(t),
                                i = isNaN(r);
                            if (i || r in h || (r = e.pluralCat(r - d)), r !== c && !(i && k(c) && isNaN(c))) {
                                w();
                                var o = g[r];
                                y(o) ? (null != t && n.debug("ngPluralize: no rule defined for '" + r + "' in " + p), w = m, l()) : w = a.$watch(o, l), c = r
                            }
                        })
                    }
                }
            }],
            la = ["$parse", "$animate", function(e, a) {
                var s = "$$NG_REMOVED",
                    u = r("ngRepeat"),
                    l = function(e, t, n, r, i, o, a) {
                        e[n] = r, i && (e[i] = o), e.$index = t, e.$first = 0 === t, e.$last = t === a - 1, e.$middle = !(e.$first || e.$last), e.$odd = !(e.$even = 0 === (1 & t))
                    },
                    c = function(e) {
                        return e.clone[0]
                    },
                    f = function(e) {
                        return e.clone[e.clone.length - 1]
                    };
                return {
                    restrict: "A",
                    multiElement: !0,
                    transclude: "element",
                    priority: 1e3,
                    terminal: !0,
                    $$tlb: !0,
                    compile: function(r, p) {
                        var d = p.ngRepeat,
                            h = t.createComment(" end ngRepeat: " + d + " "),
                            m = d.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                        if (!m) throw u("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", d);
                        var g = m[1],
                            v = m[2],
                            $ = m[3],
                            y = m[4];
                        if (m = g.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/), !m) throw u("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", g);
                        var b = m[3] || m[1],
                            w = m[2];
                        if ($ && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test($) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test($))) throw u("badident", "alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.", $);
                        var x, C, k, S, E = {
                            $id: Ge
                        };
                        return y ? x = e(y) : (k = function(e, t) {
                                return Ge(t)
                            }, S = function(e) {
                                return e
                            }),
                            function(e, t, r, p, m) {
                                x && (C = function(t, n, r) {
                                    return w && (E[w] = t), E[b] = n, E.$index = r, x(e, E)
                                });
                                var g = ge();
                                e.$watchCollection(v, function(r) {
                                    var p, v, y, x, E, T, D, A, O, M, j, N, P = t[0],
                                        L = ge();
                                    if ($ && (e[$] = r), i(r)) O = r, A = C || k;
                                    else {
                                        A = C || S, O = [];
                                        for (var I in r) r.hasOwnProperty(I) && "$" !== I.charAt(0) && O.push(I)
                                    }
                                    for (x = O.length, j = new Array(x), p = 0; x > p; p++)
                                        if (E = r === O ? p : O[p], T = r[E], D = A(E, T, p), g[D]) M = g[D], delete g[D], L[D] = M, j[p] = M;
                                        else {
                                            if (L[D]) throw o(j, function(e) {
                                                e && e.scope && (g[e.id] = e)
                                            }), u("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}", d, D, T);
                                            j[p] = {
                                                id: D,
                                                scope: n,
                                                clone: n
                                            }, L[D] = !0
                                        }
                                    for (var q in g) {
                                        if (M = g[q], N = me(M.clone), a.leave(N), N[0].parentNode)
                                            for (p = 0, v = N.length; v > p; p++) N[p][s] = !0;
                                        M.scope.$destroy()
                                    }
                                    for (p = 0; x > p; p++)
                                        if (E = r === O ? p : O[p], T = r[E], M = j[p], M.scope) {
                                            y = P;
                                            do y = y.nextSibling; while (y && y[s]);
                                            c(M) != y && a.move(me(M.clone), null, Er(P)), P = f(M), l(M.scope, p, b, T, w, E, x)
                                        } else m(function(e, t) {
                                            M.scope = t;
                                            var n = h.cloneNode(!1);
                                            e[e.length++] = n, a.enter(e, null, Er(P)), P = n, M.clone = e, L[M.id] = M, l(M.scope, p, b, T, w, E, x)
                                        });
                                    g = L
                                })
                            }
                    }
                }
            }],
            ca = "ng-hide",
            fa = "ng-hide-animate",
            pa = ["$animate", function(e) {
                return {
                    restrict: "A",
                    multiElement: !0,
                    link: function(t, n, r) {
                        t.$watch(r.ngShow, function(t) {
                            e[t ? "removeClass" : "addClass"](n, ca, {
                                tempClasses: fa
                            })
                        })
                    }
                }
            }],
            da = ["$animate", function(e) {
                return {
                    restrict: "A",
                    multiElement: !0,
                    link: function(t, n, r) {
                        t.$watch(r.ngHide, function(t) {
                            e[t ? "addClass" : "removeClass"](n, ca, {
                                tempClasses: fa
                            })
                        })
                    }
                }
            }],
            ha = Qn(function(e, t, n) {
                e.$watch(n.ngStyle, function(e, n) {
                    n && e !== n && o(n, function(e, n) {
                        t.css(n, "")
                    }), e && t.css(e)
                }, !0)
            }),
            ma = ["$animate", function(e) {
                return {
                    require: "ngSwitch",
                    controller: ["$scope", function() {
                        this.cases = {}
                    }],
                    link: function(n, r, i, a) {
                        var s = i.ngSwitch || i.on,
                            u = [],
                            l = [],
                            c = [],
                            f = [],
                            p = function(e, t) {
                                return function() {
                                    e.splice(t, 1)
                                }
                            };
                        n.$watch(s, function(n) {
                            var r, i;
                            for (r = 0, i = c.length; i > r; ++r) e.cancel(c[r]);
                            for (c.length = 0, r = 0, i = f.length; i > r; ++r) {
                                var s = me(l[r].clone);
                                f[r].$destroy();
                                var d = c[r] = e.leave(s);
                                d.then(p(c, r))
                            }
                            l.length = 0, f.length = 0, (u = a.cases["!" + n] || a.cases["?"]) && o(u, function(n) {
                                n.transclude(function(r, i) {
                                    f.push(i);
                                    var o = n.element;
                                    r[r.length++] = t.createComment(" end ngSwitchWhen: ");
                                    var a = {
                                        clone: r
                                    };
                                    l.push(a), e.enter(r, o.parent(), o)
                                })
                            })
                        })
                    }
                }
            }],
            ga = Qn({
                transclude: "element",
                priority: 1200,
                require: "^ngSwitch",
                multiElement: !0,
                link: function(e, t, n, r, i) {
                    r.cases["!" + n.ngSwitchWhen] = r.cases["!" + n.ngSwitchWhen] || [], r.cases["!" + n.ngSwitchWhen].push({
                        transclude: i,
                        element: t
                    })
                }
            }),
            va = Qn({
                transclude: "element",
                priority: 1200,
                require: "^ngSwitch",
                multiElement: !0,
                link: function(e, t, n, r, i) {
                    r.cases["?"] = r.cases["?"] || [], r.cases["?"].push({
                        transclude: i,
                        element: t
                    })
                }
            }),
            $a = Qn({
                restrict: "EAC",
                link: function(e, t, n, i, o) {
                    if (!o) throw r("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", Z(t));
                    o(function(e) {
                        t.empty(), t.append(e)
                    })
                }
            }),
            ya = ["$templateCache", function(e) {
                return {
                    restrict: "E",
                    terminal: !0,
                    compile: function(t, n) {
                        if ("text/ng-template" == n.type) {
                            var r = n.id,
                                i = t[0].text;
                            e.put(r, i)
                        }
                    }
                }
            }],
            ba = {
                $setViewValue: m,
                $render: m
            },
            wa = ["$element", "$scope", "$attrs", function(e, r, i) {
                var o = this,
                    a = new Ke;
                o.ngModelCtrl = ba, o.unknownOption = Er(t.createElement("option")), o.renderUnknownOption = function(t) {
                    var n = "? " + Ge(t) + " ?";
                    o.unknownOption.val(n), e.prepend(o.unknownOption), e.val(n)
                }, r.$on("$destroy", function() {
                    o.renderUnknownOption = m
                }), o.removeUnknownOption = function() {
                    o.unknownOption.parent() && o.unknownOption.remove()
                }, o.readValue = function() {
                    return o.removeUnknownOption(), e.val()
                }, o.writeValue = function(t) {
                    o.hasOption(t) ? (o.removeUnknownOption(), e.val(t), "" === t && o.emptyOption.prop("selected", !0)) : null == t && o.emptyOption ? (o.removeUnknownOption(), e.val("")) : o.renderUnknownOption(t)
                }, o.addOption = function(e, t) {
                    de(e, '"option value"'), "" === e && (o.emptyOption = t);
                    var n = a.get(e) || 0;
                    a.put(e, n + 1)
                }, o.removeOption = function(e) {
                    var t = a.get(e);
                    t && (1 === t ? (a.remove(e), "" === e && (o.emptyOption = n)) : a.put(e, t - 1))
                }, o.hasOption = function(e) {
                    return !!a.get(e)
                }
            }],
            xa = function() {
                return {
                    restrict: "E",
                    require: ["select", "?ngModel"],
                    controller: wa,
                    link: function(e, t, n, r) {
                        var i = r[1];
                        if (i) {
                            var a = r[0];
                            if (a.ngModelCtrl = i, i.$render = function() {
                                    a.writeValue(i.$viewValue)
                                }, t.on("change", function() {
                                    e.$apply(function() {
                                        i.$setViewValue(a.readValue())
                                    })
                                }), n.multiple) {
                                a.readValue = function() {
                                    var e = [];
                                    return o(t.find("option"), function(t) {
                                        t.selected && e.push(t.value)
                                    }), e
                                }, a.writeValue = function(e) {
                                    var n = new Ke(e);
                                    o(t.find("option"), function(e) {
                                        e.selected = b(n.get(e.value))
                                    })
                                };
                                var s, u = 0 / 0;
                                e.$watch(function() {
                                    u !== i.$viewValue || _(s, i.$viewValue) || (s = R(i.$viewValue), i.$render()), u = i.$viewValue
                                }), i.$isEmpty = function(e) {
                                    return !e || 0 === e.length
                                }
                            }
                        }
                    }
                }
            },
            Ca = ["$interpolate", function(e) {
                function t(e) {
                    e[0].hasAttribute("selected") && (e[0].selected = !0)
                }
                return {
                    restrict: "E",
                    priority: 100,
                    compile: function(n, r) {
                        if (y(r.value)) {
                            var i = e(n.text(), !0);
                            i || r.$set("value", n.text())
                        }
                        return function(e, n, r) {
                            var o = "$selectController",
                                a = n.parent(),
                                s = a.data(o) || a.parent().data(o);
                            s && s.ngModelCtrl && (i ? e.$watch(i, function(e, i) {
                                r.$set("value", e), i !== e && s.removeOption(i), s.addOption(e, n), s.ngModelCtrl.$render(), t(n)
                            }) : (s.addOption(r.value, n), s.ngModelCtrl.$render(), t(n)), n.on("$destroy", function() {
                                s.removeOption(r.value), s.ngModelCtrl.$render()
                            }))
                        }
                    }
                }
            }],
            ka = v({
                restrict: "E",
                terminal: !1
            }),
            Sa = function() {
                return {
                    restrict: "A",
                    require: "?ngModel",
                    link: function(e, t, n, r) {
                        r && (n.required = !0, r.$validators.required = function(e, t) {
                            return !n.required || !r.$isEmpty(t)
                        }, n.$observe("required", function() {
                            r.$validate()
                        }))
                    }
                }
            },
            Ea = function() {
                return {
                    restrict: "A",
                    require: "?ngModel",
                    link: function(e, t, i, o) {
                        if (o) {
                            var a, s = i.ngPattern || i.pattern;
                            i.$observe("pattern", function(e) {
                                if (C(e) && e.length > 0 && (e = new RegExp("^" + e + "$")), e && !e.test) throw r("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", s, e, Z(t));
                                a = e || n, o.$validate()
                            }), o.$validators.pattern = function(e) {
                                return o.$isEmpty(e) || y(a) || a.test(e)
                            }
                        }
                    }
                }
            },
            Ta = function() {
                return {
                    restrict: "A",
                    require: "?ngModel",
                    link: function(e, t, n, r) {
                        if (r) {
                            var i = -1;
                            n.$observe("maxlength", function(e) {
                                var t = d(e);
                                i = isNaN(t) ? -1 : t, r.$validate()
                            }), r.$validators.maxlength = function(e, t) {
                                return 0 > i || r.$isEmpty(t) || t.length <= i
                            }
                        }
                    }
                }
            },
            Da = function() {
                return {
                    restrict: "A",
                    require: "?ngModel",
                    link: function(e, t, n, r) {
                        if (r) {
                            var i = 0;
                            n.$observe("minlength", function(e) {
                                i = d(e) || 0, r.$validate()
                            }), r.$validators.minlength = function(e, t) {
                                return r.$isEmpty(t) || t.length >= i
                            }
                        }
                    }
                }
            };
        return e.angular.bootstrap ? void console.log("WARNING: Tried to load angular more than once.") : (ce(), be(Lr), void Er(t).ready(function() {
            oe(t, ae)
        }))
    }(window, document), !window.angular.$$csp() && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>'),
    function(e, t, n) {
        "use strict";

        function r() {
            function e(e, n) {
                return t.extend(Object.create(e), n)
            }

            function n(e, t) {
                var n = t.caseInsensitiveMatch,
                    r = {
                        originalPath: e,
                        regexp: e
                    },
                    i = r.keys = [];
                return e = e.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function(e, t, n, r) {
                    var o = "?" === r ? r : null,
                        a = "*" === r ? r : null;
                    return i.push({
                        name: n,
                        optional: !!o
                    }), t = t || "", "" + (o ? "" : t) + "(?:" + (o ? t : "") + (a && "(.+?)" || "([^/]+)") + (o || "") + ")" + (o || "")
                }).replace(/([\/$\*])/g, "\\$1"), r.regexp = new RegExp("^" + e + "$", n ? "i" : ""), r
            }
            var r = {};
            this.when = function(e, i) {
                var o = t.copy(i);
                if (t.isUndefined(o.reloadOnSearch) && (o.reloadOnSearch = !0), t.isUndefined(o.caseInsensitiveMatch) && (o.caseInsensitiveMatch = this.caseInsensitiveMatch), r[e] = t.extend(o, e && n(e, o)), e) {
                    var a = "/" == e[e.length - 1] ? e.substr(0, e.length - 1) : e + "/";
                    r[a] = t.extend({
                        redirectTo: e
                    }, n(a, o))
                }
                return this
            }, this.caseInsensitiveMatch = !1, this.otherwise = function(e) {
                return "string" == typeof e && (e = {
                    redirectTo: e
                }), this.when(null, e), this
            }, this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$templateRequest", "$sce", function(n, i, o, a, s, l, c) {
                function f(e, t) {
                    var n = t.keys,
                        r = {};
                    if (!t.regexp) return null;
                    var i = t.regexp.exec(e);
                    if (!i) return null;
                    for (var o = 1, a = i.length; a > o; ++o) {
                        var s = n[o - 1],
                            u = i[o];
                        s && u && (r[s.name] = u)
                    }
                    return r
                }

                function p(e) {
                    var r = y.current;
                    g = h(), v = g && r && g.$$route === r.$$route && t.equals(g.pathParams, r.pathParams) && !g.reloadOnSearch && !$, v || !r && !g || n.$broadcast("$routeChangeStart", g, r).defaultPrevented && e && e.preventDefault()
                }

                function d() {
                    var e = y.current,
                        r = g;
                    v ? (e.params = r.params, t.copy(e.params, o), n.$broadcast("$routeUpdate", e)) : (r || e) && ($ = !1, y.current = r, r && r.redirectTo && (t.isString(r.redirectTo) ? i.path(m(r.redirectTo, r.params)).search(r.params).replace() : i.url(r.redirectTo(r.pathParams, i.path(), i.search())).replace()), a.when(r).then(function() {
                        if (r) {
                            var e, n, i = t.extend({}, r.resolve);
                            return t.forEach(i, function(e, n) {
                                i[n] = t.isString(e) ? s.get(e) : s.invoke(e, null, null, n)
                            }), t.isDefined(e = r.template) ? t.isFunction(e) && (e = e(r.params)) : t.isDefined(n = r.templateUrl) && (t.isFunction(n) && (n = n(r.params)), t.isDefined(n) && (r.loadedTemplateUrl = c.valueOf(n), e = l(n))), t.isDefined(e) && (i.$template = e), a.all(i)
                        }
                    }).then(function(i) {
                        r == y.current && (r && (r.locals = i, t.copy(r.params, o)), n.$broadcast("$routeChangeSuccess", r, e))
                    }, function(t) {
                        r == y.current && n.$broadcast("$routeChangeError", r, e, t)
                    }))
                }

                function h() {
                    var n, o;
                    return t.forEach(r, function(r, a) {
                        !o && (n = f(i.path(), r)) && (o = e(r, {
                            params: t.extend({}, i.search(), n),
                            pathParams: n
                        }), o.$$route = r)
                    }), o || r[null] && e(r[null], {
                        params: {},
                        pathParams: {}
                    })
                }

                function m(e, n) {
                    var r = [];
                    return t.forEach((e || "").split(":"), function(e, t) {
                        if (0 === t) r.push(e);
                        else {
                            var i = e.match(/(\w+)(?:[?*])?(.*)/),
                                o = i[1];
                            r.push(n[o]), r.push(i[2] || ""), delete n[o]
                        }
                    }), r.join("")
                }
                var g, v, $ = !1,
                    y = {
                        routes: r,
                        reload: function() {
                            $ = !0, n.$evalAsync(function() {
                                p(), d()
                            })
                        },
                        updateParams: function(e) {
                            if (!this.current || !this.current.$$route) throw u("norout", "Tried updating route when with no current route");
                            e = t.extend({}, this.current.params, e), i.path(m(this.current.$$route.originalPath, e)), i.search(e)
                        }
                    };
                return n.$on("$locationChangeStart", p), n.$on("$locationChangeSuccess", d), y
            }]
        }

        function i() {
            this.$get = function() {
                return {}
            }
        }

        function o(e, n, r) {
            return {
                restrict: "ECA",
                terminal: !0,
                priority: 400,
                transclude: "element",
                link: function(i, o, a, s, u) {
                    function l() {
                        d && (r.cancel(d), d = null), f && (f.$destroy(), f = null), p && (d = r.leave(p), d.then(function() {
                            d = null
                        }), p = null)
                    }

                    function c() {
                        var a = e.current && e.current.locals,
                            s = a && a.$template;
                        if (t.isDefined(s)) {
                            var c = i.$new(),
                                d = e.current,
                                g = u(c, function(e) {
                                    r.enter(e, null, p || o).then(function() {
                                        !t.isDefined(h) || h && !i.$eval(h) || n()
                                    }), l()
                                });
                            p = g, f = d.scope = c, f.$emit("$viewContentLoaded"), f.$eval(m)
                        } else l()
                    }
                    var f, p, d, h = a.autoscroll,
                        m = a.onload || "";
                    i.$on("$routeChangeSuccess", c), c()
                }
            }
        }

        function a(e, t, n) {
            return {
                restrict: "ECA",
                priority: -400,
                link: function(r, i) {
                    var o = n.current,
                        a = o.locals;
                    i.html(a.$template);
                    var s = e(i.contents());
                    if (o.controller) {
                        a.$scope = r;
                        var u = t(o.controller, a);
                        o.controllerAs && (r[o.controllerAs] = u), i.data("$ngControllerController", u), i.children().data("$ngControllerController", u)
                    }
                    s(r)
                }
            }
        }
        var s = t.module("ngRoute", ["ng"]).provider("$route", r),
            u = t.$$minErr("ngRoute");
        s.provider("$routeParams", i), s.directive("ngView", o), s.directive("ngView", a), o.$inject = ["$route", "$anchorScroll", "$animate"], a.$inject = ["$compile", "$controller", "$route"]
    }(window, window.angular),
    function(e, t, n) {
        "use strict";

        function r(e, r, i) {
            function o(e, i, o) {
                var s, u;
                o = o || {}, u = o.expires, s = t.isDefined(o.path) ? o.path : a, i === n && (u = "Thu, 01 Jan 1970 00:00:00 GMT", i = ""), t.isString(u) && (u = new Date(u));
                var l = encodeURIComponent(e) + "=" + encodeURIComponent(i);
                l += s ? ";path=" + s : "", l += o.domain ? ";domain=" + o.domain : "", l += u ? ";expires=" + u.toUTCString() : "", l += o.secure ? ";secure" : "";
                var c = l.length + 1;
                return c > 4096 && r.warn("Cookie '" + e + "' possibly not set or overflowed because it was too large (" + c + " > 4096 bytes)!"), l
            }
            var a = i.baseHref(),
                s = e[0];
            return function(e, t, n) {
                s.cookie = o(e, t, n)
            }
        }
        t.module("ngCookies", ["ng"]).provider("$cookies", [function() {
            function e(e) {
                return e ? t.extend({}, r, e) : r
            }
            var r = this.defaults = {};
            this.$get = ["$$cookieReader", "$$cookieWriter", function(r, i) {
                return {
                    get: function(e) {
                        return r()[e]
                    },
                    getObject: function(e) {
                        var n = this.get(e);
                        return n ? t.fromJson(n) : n
                    },
                    getAll: function() {
                        return r()
                    },
                    put: function(t, n, r) {
                        i(t, n, e(r))
                    },
                    putObject: function(e, n, r) {
                        this.put(e, t.toJson(n), r)
                    },
                    remove: function(t, r) {
                        i(t, n, e(r))
                    }
                }
            }]
        }]), t.module("ngCookies").factory("$cookieStore", ["$cookies", function(e) {
            return {
                get: function(t) {
                    return e.getObject(t)
                },
                put: function(t, n) {
                    e.putObject(t, n)
                },
                remove: function(t) {
                    e.remove(t)
                }
            }
        }]), r.$inject = ["$document", "$log", "$browser"], t.module("ngCookies").provider("$$cookieWriter", function() {
            this.$get = r
        })
    }(window, window.angular),
    function(e, t, n) {
        "use strict";

        function r(e, t, n) {
            if (!e) throw ngMinErr("areq", "Argument '{0}' is {1}", t || "?", n || "required");
            return e
        }

        function i(e, t) {
            return e || t ? e ? t ? (V(e) && (e = e.join(" ")), V(t) && (t = t.join(" ")), e + " " + t) : e : t : ""
        }

        function o(e) {
            var t = {};
            return e && (e.to || e.from) && (t.to = e.to, t.from = e.from), t
        }

        function a(e, t, n) {
            var r = "";
            return e = V(e) ? e : e && F(e) && e.length ? e.split(/\s+/) : [], q(e, function(e, i) {
                e && e.length > 0 && (r += i > 0 ? " " : "", r += n ? t + e : e + t)
            }), r
        }

        function s(e, t) {
            var n = e.indexOf(t);
            t >= 0 && e.splice(n, 1)
        }

        function u(e) {
            if (e instanceof I) switch (e.length) {
                case 0:
                    return [];
                case 1:
                    if (e[0].nodeType === z) return e;
                    break;
                default:
                    return I(l(e))
            }
            return e.nodeType === z ? I(e) : void 0
        }

        function l(e) {
            if (!e[0]) return e;
            for (var t = 0; t < e.length; t++) {
                var n = e[t];
                if (n.nodeType == z) return n
            }
        }

        function c(e, t, n) {
            q(t, function(t) {
                e.addClass(t, n)
            })
        }

        function f(e, t, n) {
            q(t, function(t) {
                e.removeClass(t, n)
            })
        }

        function p(e) {
            return function(t, n) {
                n.addClass && (c(e, t, n.addClass), n.addClass = null), n.removeClass && (f(e, t, n.removeClass), n.removeClass = null)
            }
        }

        function d(e) {
            if (e = e || {}, !e.$$prepared) {
                var t = e.domOperation || P;
                e.domOperation = function() {
                    e.$$domOperationFired = !0, t(), t = P
                }, e.$$prepared = !0
            }
            return e
        }

        function h(e, t) {
            m(e, t), g(e, t)
        }

        function m(e, t) {
            t.from && (e.css(t.from), t.from = null)
        }

        function g(e, t) {
            t.to && (e.css(t.to), t.to = null)
        }

        function v(e, t, n) {
            var r = (t.addClass || "") + " " + (n.addClass || ""),
                i = (t.removeClass || "") + " " + (n.removeClass || ""),
                o = $(e.attr("class"), r, i);
            return L(t, n), t.addClass = o.addClass ? o.addClass : null, t.removeClass = o.removeClass ? o.removeClass : null, t
        }

        function $(e, t, n) {
            function r(e) {
                F(e) && (e = e.split(" "));
                var t = {};
                return q(e, function(e) {
                    e.length && (t[e] = !0)
                }), t
            }
            var i = 1,
                o = -1,
                a = {};
            e = r(e), t = r(t), q(t, function(e, t) {
                a[t] = i
            }), n = r(n), q(n, function(e, t) {
                a[t] = a[t] === i ? null : o
            });
            var s = {
                addClass: "",
                removeClass: ""
            };
            return q(a, function(t, n) {
                var r, a;
                t === i ? (r = "addClass", a = !e[n]) : t === o && (r = "removeClass", a = e[n]), a && (s[r].length && (s[r] += " "), s[r] += n)
            }), s
        }

        function y(e) {
            return e instanceof t.element ? e[0] : e
        }

        function b(e, t, n) {
            var r = Object.create(null),
                i = e.getComputedStyle(t) || {};
            return q(n, function(e, t) {
                var n = i[e];
                if (n) {
                    var o = n.charAt(0);
                    ("-" === o || "+" === o || o >= 0) && (n = w(n)), 0 === n && (n = null), r[t] = n
                }
            }), r
        }

        function w(e) {
            var t = 0,
                n = e.split(/\s*,\s*/);
            return q(n, function(e) {
                "s" == e.charAt(e.length - 1) && (e = e.substring(0, e.length - 1)), e = parseFloat(e) || 0, t = t ? Math.max(e, t) : e
            }), t
        }

        function x(e) {
            return 0 === e || null != e
        }

        function C(e, t) {
            var n = O,
                r = e + "s";
            return t ? n += X : r += " linear all", [n, r]
        }

        function k(e) {
            return [ue, e + "s"]
        }

        function S(e, t) {
            var n = t ? se : le;
            return [n, e + "s"]
        }

        function E(e, t) {
            var n = t ? "-" + t + "s" : "";
            return D(e, [le, n]), [le, n]
        }

        function T(e, t) {
            var n = t ? "paused" : "",
                r = j + ne;
            return D(e, [r, n]), [r, n]
        }

        function D(e, t) {
            var n = t[0],
                r = t[1];
            e.style[n] = r
        }

        function A() {
            var e = Object.create(null);
            return {
                flush: function() {
                    e = Object.create(null)
                },
                count: function(t) {
                    var n = e[t];
                    return n ? n.total : 0
                },
                get: function(t) {
                    var n = e[t];
                    return n && n.value
                },
                put: function(t, n) {
                    e[t] ? e[t].total++ : e[t] = {
                        total: 1,
                        value: n
                    }
                }
            }
        }
        var O, M, j, N, P = t.noop,
            L = t.extend,
            I = t.element,
            q = t.forEach,
            V = t.isArray,
            F = t.isString,
            H = t.isObject,
            R = t.isUndefined,
            _ = t.isDefined,
            U = t.isFunction,
            B = t.isElement,
            z = 1,
            W = "ng-animate",
            Y = "$$ngAnimateChildren",
            G = ["$$rAF", function(e) {
                function t(e) {
                    o.push([].concat(e)), n()
                }

                function n() {
                    if (o.length) {
                        for (var t = [], a = 0; a < o.length; a++) {
                            var s = o[a];
                            r(s), s.length && t.push(s)
                        }
                        o = t, i || e(function() {
                            i || n()
                        })
                    }
                }

                function r(e) {
                    var t = e.shift();
                    t()
                }
                var i, o = [];
                return t.waitUntilQuiet = function(t) {
                    i && i(), i = e(function() {
                        i = null, t(), n()
                    })
                }, t
            }],
            K = [function() {
                return function(e, n, r) {
                    var i = r.ngAnimateChildren;
                    t.isString(i) && 0 === i.length ? n.data(Y, !0) : r.$observe("ngAnimateChildren", function(e) {
                        e = "on" === e || "true" === e, n.data(Y, e)
                    })
                }
            }],
            J = "";
        e.ontransitionend === n && e.onwebkittransitionend !== n ? (J = "-webkit-", O = "WebkitTransition", M = "webkitTransitionEnd transitionend") : (O = "transition", M = "transitionend"), e.onanimationend === n && e.onwebkitanimationend !== n ? (J = "-webkit-", j = "WebkitAnimation", N = "webkitAnimationEnd animationend") : (j = "animation", N = "animationend");
        var X = "Duration",
            Z = "Property",
            Q = "Delay",
            ee = "TimingFunction",
            te = "IterationCount",
            ne = "PlayState",
            re = 3,
            ie = 1.5,
            oe = 1e3,
            ae = 9999,
            se = j + Q,
            ue = j + X,
            le = O + Q,
            ce = O + X,
            fe = {
                transitionDuration: ce,
                transitionDelay: le,
                transitionProperty: O + Z,
                animationDuration: ue,
                animationDelay: se,
                animationIterationCount: j + te
            },
            pe = {
                transitionDuration: ce,
                transitionDelay: le,
                animationDuration: ue,
                animationDelay: se
            },
            de = ["$animateProvider", function(e) {
                var t = A(),
                    n = A();
                this.$get = ["$window", "$$jqLite", "$$AnimateRunner", "$timeout", "$document", "$sniffer", "$$rAFScheduler", function(e, r, i, u, l, c, f) {
                    function v(e, t) {
                        var n = "$$ngAnimateParentKey",
                            r = e.parentNode,
                            i = r[n] || (r[n] = ++F);
                        return i + "-" + e.getAttribute("class") + "-" + t
                    }

                    function $(n, r, i, o) {
                        var a = t.get(i);
                        return a || (a = b(e, n, o), "infinite" === a.animationIterationCount && (a.animationIterationCount = 1)), t.put(i, a), a
                    }

                    function w(i, o, s, u) {
                        var l;
                        if (t.count(s) > 0 && (l = n.get(s), !l)) {
                            var c = a(o, "-stagger");
                            r.addClass(i, c), l = b(e, i, u), l.animationDuration = Math.max(l.animationDuration, 0),
                                l.transitionDuration = Math.max(l.transitionDuration, 0), r.removeClass(i, c), n.put(s, l)
                        }
                        return l || {}
                    }

                    function A(e) {
                        R.push(e), f.waitUntilQuiet(function() {
                            t.flush(), n.flush();
                            for (var e = H.offsetWidth + 1, r = 0; r < R.length; r++) R[r](e);
                            R.length = 0
                        })
                    }

                    function P(e, t, n) {
                        var r = $(e, t, n, fe),
                            i = r.animationDelay,
                            o = r.transitionDelay;
                        return r.maxDelay = i && o ? Math.max(i, o) : i || o, r.maxDuration = Math.max(r.animationDuration * r.animationIterationCount, r.transitionDuration), r
                    }

                    function L(e, n) {
                        function l() {
                            p()
                        }

                        function f() {
                            p(!0)
                        }

                        function p(t) {
                            H || _ && R || (H = !0, R = !1, r.removeClass(e, ue), r.removeClass(e, ce), T(F, !1), E(F, !1), q(K, function(e) {
                                F.style[e[0]] = ""
                            }), I(e, n), h(e, n), n.onDone && n.onDone(), U && U.complete(!t))
                        }

                        function $(e) {
                            Se.blockTransition && E(F, e), Se.blockKeyframeAnimation && T(F, !!e)
                        }

                        function b() {
                            return U = new i({
                                end: l,
                                cancel: f
                            }), p(), {
                                $$willAnimate: !1,
                                start: function() {
                                    return U
                                },
                                end: l
                            }
                        }

                        function L() {
                            function t() {
                                if (!H) {
                                    if ($(!1), q(K, function(e) {
                                            var t = e[0],
                                                n = e[1];
                                            F.style[t] = n
                                        }), I(e, n), r.addClass(e, ce), Se.recalculateTimingStyles) {
                                        if (le = F.className + " " + ue, he = v(F, le), Ce = P(F, le, he), ke = Ce.maxDelay, z = Math.max(ke, 0), Y = Ce.maxDuration, 0 === Y) return void p();
                                        Se.hasTransitions = Ce.transitionDuration > 0, Se.hasAnimations = Ce.animationDuration > 0
                                    }
                                    if (Se.applyTransitionDelay || Se.applyAnimationDelay) {
                                        ke = "boolean" != typeof n.delay && x(n.delay) ? parseFloat(n.delay) : ke, z = Math.max(ke, 0);
                                        var t;
                                        Se.applyTransitionDelay && (Ce.transitionDelay = ke, t = S(ke), K.push(t), F.style[t[0]] = t[1]), Se.applyAnimationDelay && (Ce.animationDelay = ke, t = S(ke, !0), K.push(t), F.style[t[0]] = t[1])
                                    }
                                    if (W = z * oe, G = Y * oe, n.easing) {
                                        var s, c = n.easing;
                                        Se.hasTransitions && (s = O + ee, K.push([s, c]), F.style[s] = c), Se.hasAnimations && (s = j + ee, K.push([s, c]), F.style[s] = c)
                                    }
                                    Ce.transitionDuration && l.push(M), Ce.animationDuration && l.push(N), a = Date.now(), e.on(l.join(" "), o), u(i, W + ie * G), g(e, n)
                                }
                            }

                            function i() {
                                p()
                            }

                            function o(e) {
                                e.stopPropagation();
                                var t = e.originalEvent || e,
                                    n = t.$manualTimeStamp || t.timeStamp || Date.now(),
                                    r = parseFloat(t.elapsedTime.toFixed(re));
                                Math.max(n - a, 0) >= W && r >= Y && (_ = !0, p())
                            }
                            if (!H) {
                                if (!F.parentNode) return void p();
                                var a, l = [],
                                    c = function(e) {
                                        if (_) R && e && (R = !1, p());
                                        else if (R = !e, Ce.animationDuration) {
                                            var t = T(F, R);
                                            R ? K.push(t) : s(K, t)
                                        }
                                    },
                                    f = we > 0 && (Ce.transitionDuration && 0 === me.transitionDuration || Ce.animationDuration && 0 === me.animationDuration) && Math.max(me.animationDelay, me.transitionDelay);
                                f ? u(t, Math.floor(f * we * oe), !1) : t(), B.resume = function() {
                                    c(!0)
                                }, B.pause = function() {
                                    c(!1)
                                }
                            }
                        }
                        var F = y(e);
                        if (!F || !F.parentNode) return b();
                        n = d(n);
                        var H, R, _, U, B, z, W, Y, G, K = [],
                            J = e.attr("class"),
                            X = o(n);
                        if (0 === n.duration || !c.animations && !c.transitions) return b();
                        var Q = n.event && V(n.event) ? n.event.join(" ") : n.event,
                            te = Q && n.structural,
                            ne = "",
                            se = "";
                        te ? ne = a(Q, "ng-", !0) : Q && (ne = Q), n.addClass && (se += a(n.addClass, "-add")), n.removeClass && (se.length && (se += " "), se += a(n.removeClass, "-remove")), n.applyClassesEarly && se.length && (I(e, n), se = "");
                        var ue = [ne, se].join(" ").trim(),
                            le = J + " " + ue,
                            ce = a(ue, "-active"),
                            fe = X.to && Object.keys(X.to).length > 0,
                            de = (n.keyframeStyle || "").length > 0;
                        if (!de && !fe && !ue) return b();
                        var he, me;
                        if (n.stagger > 0) {
                            var ge = parseFloat(n.stagger);
                            me = {
                                transitionDelay: ge,
                                animationDelay: ge,
                                transitionDuration: 0,
                                animationDuration: 0
                            }
                        } else he = v(F, le), me = w(F, ue, he, pe);
                        r.addClass(e, ue);
                        var ve;
                        if (n.transitionStyle) {
                            var $e = [O, n.transitionStyle];
                            D(F, $e), K.push($e)
                        }
                        if (n.duration >= 0) {
                            ve = F.style[O].length > 0;
                            var ye = C(n.duration, ve);
                            D(F, ye), K.push(ye)
                        }
                        if (n.keyframeStyle) {
                            var be = [j, n.keyframeStyle];
                            D(F, be), K.push(be)
                        }
                        var we = me ? n.staggerIndex >= 0 ? n.staggerIndex : t.count(he) : 0,
                            xe = 0 === we;
                        xe && E(F, ae);
                        var Ce = P(F, le, he),
                            ke = Ce.maxDelay;
                        z = Math.max(ke, 0), Y = Ce.maxDuration;
                        var Se = {};
                        return Se.hasTransitions = Ce.transitionDuration > 0, Se.hasAnimations = Ce.animationDuration > 0, Se.hasTransitionAll = Se.hasTransitions && "all" == Ce.transitionProperty, Se.applyTransitionDuration = fe && (Se.hasTransitions && !Se.hasTransitionAll || Se.hasAnimations && !Se.hasTransitions), Se.applyAnimationDuration = n.duration && Se.hasAnimations, Se.applyTransitionDelay = x(n.delay) && (Se.applyTransitionDuration || Se.hasTransitions), Se.applyAnimationDelay = x(n.delay) && Se.hasAnimations, Se.recalculateTimingStyles = se.length > 0, (Se.applyTransitionDuration || Se.applyAnimationDuration) && (Y = n.duration ? parseFloat(n.duration) : Y, Se.applyTransitionDuration && (Se.hasTransitions = !0, Ce.transitionDuration = Y, ve = F.style[O + Z].length > 0, K.push(C(Y, ve))), Se.applyAnimationDuration && (Se.hasAnimations = !0, Ce.animationDuration = Y, K.push(k(Y)))), 0 !== Y || Se.recalculateTimingStyles ? (null == n.duration && Ce.transitionDuration > 0 && (Se.recalculateTimingStyles = Se.recalculateTimingStyles || xe), W = z * oe, G = Y * oe, n.skipBlocking || (Se.blockTransition = Ce.transitionDuration > 0, Se.blockKeyframeAnimation = Ce.animationDuration > 0 && me.animationDelay > 0 && 0 === me.animationDuration), m(e, n), Se.blockTransition || E(F, !1), $(Y), {
                            $$willAnimate: !0,
                            end: l,
                            start: function() {
                                return H ? void 0 : (B = {
                                    end: l,
                                    cancel: f,
                                    resume: null,
                                    pause: null
                                }, U = new i(B), A(L), U)
                            }
                        }) : b()
                    }
                    var I = p(r),
                        F = 0,
                        H = y(l).body,
                        R = [];
                    return L
                }]
            }],
            he = ["$$animationProvider", function(e) {
                e.drivers.push("$$animateCssDriver");
                var t = "ng-animate-shim",
                    n = "ng-anchor",
                    r = "ng-anchor-out",
                    i = "ng-anchor-in";
                this.$get = ["$animateCss", "$rootScope", "$$AnimateRunner", "$rootElement", "$document", "$sniffer", function(e, o, a, s, u, l) {
                    function c(e) {
                        return e.replace(/\bng-\S+\b/g, "")
                    }

                    function f(e, t) {
                        return F(e) && (e = e.split(" ")), F(t) && (t = t.split(" ")), e.filter(function(e) {
                            return -1 === t.indexOf(e)
                        }).join(" ")
                    }

                    function p(o, s, u) {
                        function l(e) {
                            var t = {},
                                n = y(e).getBoundingClientRect();
                            return q(["width", "height", "top", "left"], function(e) {
                                var r = n[e];
                                switch (e) {
                                    case "top":
                                        r += m.scrollTop;
                                        break;
                                    case "left":
                                        r += m.scrollLeft
                                }
                                t[e] = Math.floor(r) + "px"
                            }), t
                        }

                        function p() {
                            var t = e($, {
                                addClass: r,
                                delay: !0,
                                from: l(s)
                            });
                            return t.$$willAnimate ? t : null
                        }

                        function d(e) {
                            return e.attr("class") || ""
                        }

                        function h() {
                            var t = c(d(u)),
                                n = f(t, b),
                                o = f(b, t),
                                a = e($, {
                                    to: l(u),
                                    addClass: i + " " + n,
                                    removeClass: r + " " + o,
                                    delay: !0
                                });
                            return a.$$willAnimate ? a : null
                        }

                        function g() {
                            $.remove(), s.removeClass(t), u.removeClass(t)
                        }
                        var $ = I(y(s).cloneNode(!0)),
                            b = c(d($));
                        s.addClass(t), u.addClass(t), $.addClass(n), v.append($);
                        var w, x = p();
                        if (!x && (w = h(), !w)) return g();
                        var C = x || w;
                        return {
                            start: function() {
                                function e() {
                                    n && n.end()
                                }
                                var t, n = C.start();
                                return n.done(function() {
                                    return n = null, !w && (w = h()) ? (n = w.start(), n.done(function() {
                                        n = null, g(), t.complete()
                                    }), n) : (g(), void t.complete())
                                }), t = new a({
                                    end: e,
                                    cancel: e
                                })
                            }
                        }
                    }

                    function d(e, t, n, r) {
                        var i = h(e),
                            o = h(t),
                            s = [];
                        return q(r, function(e) {
                            var t = e.out,
                                r = e["in"],
                                i = p(n, t, r);
                            i && s.push(i)
                        }), i || o || 0 !== s.length ? {
                            start: function() {
                                function e() {
                                    q(t, function(e) {
                                        e.end()
                                    })
                                }
                                var t = [];
                                i && t.push(i.start()), o && t.push(o.start()), q(s, function(e) {
                                    t.push(e.start())
                                });
                                var n = new a({
                                    end: e,
                                    cancel: e
                                });
                                return a.all(t, function(e) {
                                    n.complete(e)
                                }), n
                            }
                        } : void 0
                    }

                    function h(t) {
                        var n = t.element,
                            r = t.options || {};
                        t.structural ? (r.structural = r.applyClassesEarly = !0, r.event = t.event, "leave" === r.event && (r.onDone = r.domOperation)) : r.event = null;
                        var i = e(n, r);
                        return i.$$willAnimate ? i : null
                    }
                    if (!l.animations && !l.transitions) return P;
                    var m = y(u).body,
                        g = y(s),
                        v = I(m.parentNode === g ? m : g);
                    return function(e) {
                        return e.from && e.to ? d(e.from, e.to, e.classes, e.anchors) : h(e)
                    }
                }]
            }],
            me = ["$animateProvider", function(e) {
                this.$get = ["$injector", "$$AnimateRunner", "$$rAFMutex", "$$jqLite", function(t, n, r, i) {
                    function o(n) {
                        n = V(n) ? n : n.split(" ");
                        for (var r = [], i = {}, o = 0; o < n.length; o++) {
                            var a = n[o],
                                s = e.$$registeredAnimations[a];
                            s && !i[a] && (r.push(t.get(s)), i[a] = !0)
                        }
                        return r
                    }
                    var a = p(i);
                    return function(e, t, r, i) {
                        function s() {
                            i.domOperation(), a(e, i)
                        }

                        function u(e, t, r, i, o) {
                            var a;
                            switch (r) {
                                case "animate":
                                    a = [t, i.from, i.to, o];
                                    break;
                                case "setClass":
                                    a = [t, m, g, o];
                                    break;
                                case "addClass":
                                    a = [t, m, o];
                                    break;
                                case "removeClass":
                                    a = [t, g, o];
                                    break;
                                default:
                                    a = [t, o]
                            }
                            a.push(i);
                            var s = e.apply(e, a);
                            if (s)
                                if (U(s.start) && (s = s.start()), s instanceof n) s.done(o);
                                else if (U(s)) return s;
                            return P
                        }

                        function l(e, t, r, i, o) {
                            var a = [];
                            return q(i, function(i) {
                                var s = i[o];
                                s && a.push(function() {
                                    var i, o, a = !1,
                                        l = function(e) {
                                            a || (a = !0, (o || P)(e), i.complete(!e))
                                        };
                                    return i = new n({
                                        end: function() {
                                            l()
                                        },
                                        cancel: function() {
                                            l(!0)
                                        }
                                    }), o = u(s, e, t, r, function(e) {
                                        var t = e === !1;
                                        l(t)
                                    }), i
                                })
                            }), a
                        }

                        function c(e, t, r, i, o) {
                            var a = l(e, t, r, i, o);
                            if (0 === a.length) {
                                var s, u;
                                "beforeSetClass" === o ? (s = l(e, "removeClass", r, i, "beforeRemoveClass"), u = l(e, "addClass", r, i, "beforeAddClass")) : "setClass" === o && (s = l(e, "removeClass", r, i, "removeClass"), u = l(e, "addClass", r, i, "addClass")), s && (a = a.concat(s)), u && (a = a.concat(u))
                            }
                            if (0 !== a.length) return function(e) {
                                var t = [];
                                return a.length && q(a, function(e) {
                                        t.push(e())
                                    }), t.length ? n.all(t, e) : e(),
                                    function(e) {
                                        q(t, function(t) {
                                            e ? t.cancel() : t.end()
                                        })
                                    }
                            }
                        }
                        3 === arguments.length && H(r) && (i = r, r = null), i = d(i), r || (r = e.attr("class") || "", i.addClass && (r += " " + i.addClass), i.removeClass && (r += " " + i.removeClass));
                        var f, p, m = i.addClass,
                            g = i.removeClass,
                            v = o(r);
                        if (v.length) {
                            var $, y;
                            "leave" == t ? (y = "leave", $ = "afterLeave") : (y = "before" + t.charAt(0).toUpperCase() + t.substr(1), $ = t), "enter" !== t && "move" !== t && (f = c(e, t, i, v, y)), p = c(e, t, i, v, $)
                        }
                        return f || p ? {
                            start: function() {
                                function t(t) {
                                    u = !0, s(), h(e, i), l.complete(t)
                                }

                                function r(e) {
                                    u || ((o || P)(e), t(e))
                                }
                                var o, a = [];
                                f && a.push(function(e) {
                                    o = f(e)
                                }), a.length ? a.push(function(e) {
                                    s(), e(!0)
                                }) : s(), p && a.push(function(e) {
                                    o = p(e)
                                });
                                var u = !1,
                                    l = new n({
                                        end: function() {
                                            r()
                                        },
                                        cancel: function() {
                                            r(!0)
                                        }
                                    });
                                return n.chain(a, t), l
                            }
                        } : void 0
                    }
                }]
            }],
            ge = ["$$animationProvider", function(e) {
                e.drivers.push("$$animateJsDriver"), this.$get = ["$$animateJs", "$$AnimateRunner", function(e, t) {
                    function n(t) {
                        var n = t.element,
                            r = t.event,
                            i = t.options,
                            o = t.classes;
                        return e(n, r, o, i)
                    }
                    return function(e) {
                        if (e.from && e.to) {
                            var r = n(e.from),
                                i = n(e.to);
                            if (!r && !i) return;
                            return {
                                start: function() {
                                    function e() {
                                        return function() {
                                            q(o, function(e) {
                                                e.end()
                                            })
                                        }
                                    }

                                    function n(e) {
                                        a.complete(e)
                                    }
                                    var o = [];
                                    r && o.push(r.start()), i && o.push(i.start()), t.all(o, n);
                                    var a = new t({
                                        end: e(),
                                        cancel: e()
                                    });
                                    return a
                                }
                            }
                        }
                        return n(e)
                    }
                }]
            }],
            ve = "data-ng-animate",
            $e = "$ngAnimatePin",
            ye = ["$animateProvider", function(e) {
                function t(e, t, n, r) {
                    return a[e].some(function(e) {
                        return e(t, n, r)
                    })
                }

                function n(e, t) {
                    e = e || {};
                    var n = (e.addClass || "").length > 0,
                        r = (e.removeClass || "").length > 0;
                    return t ? n && r : n || r
                }
                var i = 1,
                    o = 2,
                    a = this.rules = {
                        skip: [],
                        cancel: [],
                        join: []
                    };
                a.join.push(function(e, t, r) {
                    return !t.structural && n(t.options)
                }), a.skip.push(function(e, t, r) {
                    return !t.structural && !n(t.options)
                }), a.skip.push(function(e, t, n) {
                    return "leave" == n.event && t.structural
                }), a.skip.push(function(e, t, n) {
                    return n.structural && !t.structural
                }), a.cancel.push(function(e, t, n) {
                    return n.structural && t.structural
                }), a.cancel.push(function(e, t, n) {
                    return n.state === o && t.structural
                }), a.cancel.push(function(e, t, n) {
                    var r = t.options,
                        i = n.options;
                    return r.addClass && r.addClass === i.removeClass || r.removeClass && r.removeClass === i.addClass
                }), this.$get = ["$$rAF", "$rootScope", "$rootElement", "$document", "$$HashMap", "$$animation", "$$AnimateRunner", "$templateRequest", "$$jqLite", function(a, s, c, f, m, g, $, b, w) {
                    function x(e, t) {
                        return v(e, t, {})
                    }

                    function C(e, t) {
                        var n = y(e),
                            r = [],
                            i = W[t];
                        return i && q(i, function(e) {
                            e.node.contains(n) && r.push(e.callback)
                        }), r
                    }

                    function k(e, t, n, r) {
                        a(function() {
                            q(C(t, e), function(e) {
                                e(t, n, r)
                            })
                        })
                    }

                    function S(e, r, a) {
                        function l(t, n, r, i) {
                            k(n, e, r, i), t.progress(n, r, i)
                        }

                        function c(t) {
                            J(e, a), h(e, a), a.domOperation(), m.complete(!t)
                        }
                        var f, p;
                        e = u(e), e && (f = y(e), p = e.parent()), a = d(a);
                        var m = new $;
                        if (!f) return c(), m;
                        V(a.addClass) && (a.addClass = a.addClass.join(" ")), V(a.removeClass) && (a.removeClass = a.removeClass.join(" ")), a.from && !H(a.from) && (a.from = null), a.to && !H(a.to) && (a.to = null);
                        var b = [f.className, a.addClass, a.removeClass].join(" ");
                        if (!K(b)) return c(), m;
                        var w = ["enter", "move", "leave"].indexOf(r) >= 0,
                            C = !P || N.get(f),
                            S = !C && j.get(f) || {},
                            D = !!S.state;
                        if (C || D && S.state == i || (C = !O(e, p, r)), C) return c(), m;
                        w && E(e);
                        var L = {
                            structural: w,
                            element: e,
                            event: r,
                            close: c,
                            options: a,
                            runner: m
                        };
                        if (D) {
                            var I = t("skip", e, L, S);
                            if (I) return S.state === o ? (c(), m) : (v(e, S.options, a), S.runner);
                            var q = t("cancel", e, L, S);
                            if (q) S.state === o ? S.runner.end() : S.structural ? S.close() : v(e, L.options, S.options);
                            else {
                                var F = t("join", e, L, S);
                                if (F) {
                                    if (S.state !== o) return r = L.event = S.event, a = v(e, S.options, L.options), m;
                                    x(e, a)
                                }
                            }
                        } else x(e, a);
                        var R = L.structural;
                        if (R || (R = "animate" === L.event && Object.keys(L.options.to || {}).length > 0 || n(L.options)), !R) return c(), T(e), m;
                        w && A(p);
                        var _ = (S.counter || 0) + 1;
                        return L.counter = _, M(e, i, L), s.$$postDigest(function() {
                            var t = j.get(f),
                                i = !t;
                            t = t || {};
                            var s = e.parent() || [],
                                u = s.length > 0 && ("animate" === t.event || t.structural || n(t.options));
                            if (i || t.counter !== _ || !u) return i && (J(e, a), h(e, a)), (i || w && t.event !== r) && (a.domOperation(), m.end()), void(u || T(e));
                            r = !t.structural && n(t.options, !0) ? "setClass" : t.event, t.structural && A(s), M(e, o);
                            var p = g(e, r, t.options);
                            p.done(function(t) {
                                c(!t);
                                var n = j.get(f);
                                n && n.counter === _ && T(y(e)), l(m, r, "close", {})
                            }), m.setHost(p), l(m, r, "start", {})
                        }), m
                    }

                    function E(e) {
                        var t = y(e),
                            n = t.querySelectorAll("[" + ve + "]");
                        q(n, function(e) {
                            var t = parseInt(e.getAttribute(ve)),
                                n = j.get(e);
                            switch (t) {
                                case o:
                                    n.runner.end();
                                case i:
                                    n && j.remove(e)
                            }
                        })
                    }

                    function T(e) {
                        var t = y(e);
                        t.removeAttribute(ve), j.remove(t)
                    }

                    function D(e, t) {
                        return y(e) === y(t)
                    }

                    function A(e) {
                        function t(e, t) {
                            !t.structural && n(t.options) && (t.state === o && t.runner.end(), T(e))
                        }
                        for (var r = y(e);;) {
                            if (!r || r.nodeType !== z) break;
                            var i = j.get(r);
                            i && t(r, i), r = r.parentNode
                        }
                    }

                    function O(e, t, n) {
                        var r, i = !1,
                            o = !1,
                            a = !1,
                            s = e.data($e);
                        for (s && (t = s); t && t.length;) {
                            o || (o = D(t, c));
                            var u = t[0];
                            if (u.nodeType !== z) break;
                            var l = j.get(u) || {};
                            if (a || (a = l.structural || N.get(u)), R(r) || r === !0) {
                                var f = t.data(Y);
                                _(f) && (r = f)
                            }
                            if (a && r === !1) break;
                            o || (o = D(t, c), o || (s = t.data($e), s && (t = s))), i || (i = D(t, U)), t = t.parent()
                        }
                        var p = !a || r;
                        return p && o && i
                    }

                    function M(e, t, n) {
                        n = n || {}, n.state = t;
                        var r = y(e);
                        r.setAttribute(ve, t);
                        var i = j.get(r),
                            o = i ? L(i, n) : n;
                        j.put(r, o)
                    }
                    var j = new m,
                        N = new m,
                        P = null,
                        F = s.$watch(function() {
                            return 0 === b.totalPendingRequests
                        }, function(e) {
                            e && (F(), s.$$postDigest(function() {
                                s.$$postDigest(function() {
                                    null === P && (P = !0)
                                })
                            }))
                        }),
                        U = I(f[0].body),
                        W = {},
                        G = e.classNameFilter(),
                        K = G ? function(e) {
                            return G.test(e)
                        } : function() {
                            return !0
                        },
                        J = p(w);
                    return {
                        on: function(e, t, n) {
                            var r = l(t);
                            W[e] = W[e] || [], W[e].push({
                                node: r,
                                callback: n
                            })
                        },
                        off: function(e, t, n) {
                            function r(e, t, n) {
                                var r = l(t);
                                return e.filter(function(e) {
                                    var t = e.node === r && (!n || e.callback === n);
                                    return !t
                                })
                            }
                            var i = W[e];
                            i && (W[e] = 1 === arguments.length ? null : r(i, t, n))
                        },
                        pin: function(e, t) {
                            r(B(e), "element", "not an element"), r(B(t), "parentElement", "not an element"), e.data($e, t)
                        },
                        push: function(e, t, n, r) {
                            return n = n || {}, n.domOperation = r, S(e, t, n)
                        },
                        enabled: function(e, t) {
                            var n = arguments.length;
                            if (0 === n) t = !!P;
                            else {
                                var r = B(e);
                                if (r) {
                                    var i = y(e),
                                        o = N.get(i);
                                    1 === n ? t = !o : (t = !!t, t ? o && N.remove(i) : N.put(i, !0))
                                } else t = P = !!e
                            }
                            return t
                        }
                    }
                }]
            }],
            be = ["$$rAF", function(e) {
                return function() {
                    var t = !1;
                    return e(function() {
                            t = !0
                        }),
                        function(n) {
                            t ? n() : e(n)
                        }
                }
            }],
            we = ["$q", "$$rAFMutex", function(e, t) {
                function n(e) {
                    this.setHost(e), this._doneCallbacks = [], this._runInAnimationFrame = t(), this._state = 0
                }
                var r = 0,
                    i = 1,
                    o = 2;
                return n.chain = function(e, t) {
                    function n() {
                        return r === e.length ? void t(!0) : void e[r](function(e) {
                            return e === !1 ? void t(!1) : (r++, void n())
                        })
                    }
                    var r = 0;
                    n()
                }, n.all = function(e, t) {
                    function n(n) {
                        i = i && n, ++r === e.length && t(i)
                    }
                    var r = 0,
                        i = !0;
                    q(e, function(e) {
                        e.done(n)
                    })
                }, n.prototype = {
                    setHost: function(e) {
                        this.host = e || {}
                    },
                    done: function(e) {
                        this._state === o ? e() : this._doneCallbacks.push(e)
                    },
                    progress: P,
                    getPromise: function() {
                        if (!this.promise) {
                            var t = this;
                            this.promise = e(function(e, n) {
                                t.done(function(t) {
                                    t === !1 ? n() : e()
                                })
                            })
                        }
                        return this.promise
                    },
                    then: function(e, t) {
                        return this.getPromise().then(e, t)
                    },
                    "catch": function(e) {
                        return this.getPromise()["catch"](e)
                    },
                    "finally": function(e) {
                        return this.getPromise()["finally"](e)
                    },
                    pause: function() {
                        this.host.pause && this.host.pause()
                    },
                    resume: function() {
                        this.host.resume && this.host.resume()
                    },
                    end: function() {
                        this.host.end && this.host.end(), this._resolve(!0)
                    },
                    cancel: function() {
                        this.host.cancel && this.host.cancel(), this._resolve(!1)
                    },
                    complete: function(e) {
                        var t = this;
                        t._state === r && (t._state = i, t._runInAnimationFrame(function() {
                            t._resolve(e)
                        }))
                    },
                    _resolve: function(e) {
                        this._state !== o && (q(this._doneCallbacks, function(t) {
                            t(e)
                        }), this._doneCallbacks.length = 0, this._state = o)
                    }
                }, n
            }],
            xe = ["$animateProvider", function(e) {
                function t(e, t) {
                    e.data(s, t)
                }

                function n(e) {
                    e.removeData(s)
                }

                function r(e) {
                    return e.data(s)
                }
                var o = "ng-animate-ref",
                    a = this.drivers = [],
                    s = "$$animationRunner";
                this.$get = ["$$jqLite", "$rootScope", "$injector", "$$AnimateRunner", "$$rAFScheduler", function(e, s, u, l, c) {
                    var f = [],
                        m = p(e),
                        g = 0,
                        v = 0,
                        $ = [];
                    return function(p, b, w) {
                        function x(e) {
                            var t = "[" + o + "]",
                                n = e.hasAttribute(o) ? [e] : e.querySelectorAll(t),
                                r = [];
                            return q(n, function(e) {
                                var t = e.getAttribute(o);
                                t && t.length && r.push(e)
                            }), r
                        }

                        function C(e) {
                            var t = [],
                                n = {};
                            q(e, function(e, r) {
                                var i = e.element,
                                    a = y(i),
                                    s = e.event,
                                    u = ["enter", "move"].indexOf(s) >= 0,
                                    l = e.structural ? x(a) : [];
                                if (l.length) {
                                    var c = u ? "to" : "from";
                                    q(l, function(e) {
                                        var t = e.getAttribute(o);
                                        n[t] = n[t] || {}, n[t][c] = {
                                            animationID: r,
                                            element: I(e)
                                        }
                                    })
                                } else t.push(e)
                            });
                            var r = {},
                                i = {};
                            return q(n, function(n, o) {
                                var a = n.from,
                                    s = n.to;
                                if (!a || !s) {
                                    var u = a ? a.animationID : s.animationID,
                                        l = u.toString();
                                    return void(r[l] || (r[l] = !0, t.push(e[u])))
                                }
                                var c = e[a.animationID],
                                    f = e[s.animationID],
                                    p = a.animationID.toString();
                                if (!i[p]) {
                                    var d = i[p] = {
                                        structural: !0,
                                        beforeStart: function() {
                                            c.beforeStart(), f.beforeStart()
                                        },
                                        close: function() {
                                            c.close(), f.close()
                                        },
                                        classes: k(c.classes, f.classes),
                                        from: c,
                                        to: f,
                                        anchors: []
                                    };
                                    d.classes.length ? t.push(d) : (t.push(c), t.push(f))
                                }
                                i[p].anchors.push({
                                    out: a.element,
                                    "in": s.element
                                })
                            }), t
                        }

                        function k(e, t) {
                            e = e.split(" "), t = t.split(" ");
                            for (var n = [], r = 0; r < e.length; r++) {
                                var i = e[r];
                                if ("ng-" !== i.substring(0, 3))
                                    for (var o = 0; o < t.length; o++)
                                        if (i === t[o]) {
                                            n.push(i);
                                            break
                                        }
                            }
                            return n.join(" ")
                        }

                        function S(e) {
                            for (var t = a.length - 1; t >= 0; t--) {
                                var n = a[t];
                                if (u.has(n)) {
                                    var r = u.get(n),
                                        i = r(e);
                                    if (i) return i
                                }
                            }
                        }

                        function E() {
                            p.addClass(W), N && e.addClass(p, N)
                        }

                        function T(e, t) {
                            function n(e) {
                                r(e).setHost(t)
                            }
                            e.from && e.to ? (n(e.from.element), n(e.to.element)) : n(e.element)
                        }

                        function D() {
                            var e = r(p);
                            !e || "leave" === b && w.$$domOperationFired || e.end()
                        }

                        function A(t) {
                            p.off("$destroy", D), n(p), m(p, w), h(p, w), w.domOperation(), N && e.removeClass(p, N), p.removeClass(W), M.complete(!t)
                        }
                        w = d(w);
                        var O = ["enter", "move", "leave"].indexOf(b) >= 0,
                            M = new l({
                                end: function() {
                                    A()
                                },
                                cancel: function() {
                                    A(!0)
                                }
                            });
                        if (!a.length) return A(), M;
                        t(p, M);
                        var j = i(p.attr("class"), i(w.addClass, w.removeClass)),
                            N = w.tempClasses;
                        N && (j += " " + N, w.tempClasses = null);
                        var P;
                        return O || (P = g, g += 1), f.push({
                            element: p,
                            classes: j,
                            event: b,
                            classBasedIndex: P,
                            structural: O,
                            options: w,
                            beforeStart: E,
                            close: A
                        }), p.on("$destroy", D), f.length > 1 ? M : (s.$$postDigest(function() {
                            v = g, g = 0, $.length = 0;
                            var e = [];
                            q(f, function(t) {
                                r(t.element) && e.push(t)
                            }), f.length = 0, q(C(e), function(e) {
                                function t() {
                                    e.beforeStart();
                                    var t, n = e.close,
                                        i = e.anchors ? e.from.element || e.to.element : e.element;
                                    if (r(i) && y(i).parentNode) {
                                        var o = S(e);
                                        o && (t = o.start)
                                    }
                                    if (t) {
                                        var a = t();
                                        a.done(function(e) {
                                            n(!e)
                                        }), T(e, a)
                                    } else n()
                                }
                                e.structural ? t() : ($.push({
                                    node: y(e.element),
                                    fn: t
                                }), e.classBasedIndex === v - 1 && ($ = $.sort(function(e, t) {
                                    return t.node.contains(e.node)
                                }).map(function(e) {
                                    return e.fn
                                }), c($)))
                            })
                        }), M)
                    }
                }]
            }];
        t.module("ngAnimate", []).directive("ngAnimateChildren", K).factory("$$rAFMutex", be).factory("$$rAFScheduler", G).factory("$$AnimateRunner", we).provider("$$animateQueue", ye).provider("$$animation", xe).provider("$animateCss", de).provider("$$animateCssDriver", he).provider("$$animateJs", me).provider("$$animateJsDriver", ge)
    }(window, window.angular), "undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "ui.router"),
    function(e, t, n) {
        "use strict";

        function r(e, t) {
            return L(new(L(function() {}, {
                prototype: e
            })), t)
        }

        function i(e) {
            return P(arguments, function(t) {
                t !== e && P(t, function(t, n) {
                    e.hasOwnProperty(n) || (e[n] = t)
                })
            }), e
        }

        function o(e, t) {
            var n = [];
            for (var r in e.path) {
                if (e.path[r] !== t.path[r]) break;
                n.push(e.path[r])
            }
            return n
        }

        function a(e) {
            if (Object.keys) return Object.keys(e);
            var n = [];
            return t.forEach(e, function(e, t) {
                n.push(t)
            }), n
        }

        function s(e, t) {
            if (Array.prototype.indexOf) return e.indexOf(t, Number(arguments[2]) || 0);
            var n = e.length >>> 0,
                r = Number(arguments[2]) || 0;
            for (r = 0 > r ? Math.ceil(r) : Math.floor(r), 0 > r && (r += n); n > r; r++)
                if (r in e && e[r] === t) return r;
            return -1
        }

        function u(e, t, n, r) {
            var i, u = o(n, r),
                l = {},
                c = [];
            for (var f in u)
                if (u[f].params && (i = a(u[f].params), i.length))
                    for (var p in i) s(c, i[p]) >= 0 || (c.push(i[p]), l[i[p]] = e[i[p]]);
            return L({}, l, t)
        }

        function l(e, t, n) {
            if (!n) {
                n = [];
                for (var r in e) n.push(r)
            }
            for (var i = 0; i < n.length; i++) {
                var o = n[i];
                if (e[o] != t[o]) return !1
            }
            return !0
        }

        function c(e, t) {
            var n = {};
            return P(e, function(e) {
                n[e] = t[e]
            }), n
        }

        function f(e, t) {
            var r = 1,
                o = 2,
                a = {},
                s = [],
                u = a,
                l = L(e.when(a), {
                    $$promises: a,
                    $$values: a
                });
            this.study = function(a) {
                function c(e, n) {
                    if (h[n] !== o) {
                        if (d.push(n), h[n] === r) throw d.splice(0, d.indexOf(n)), new Error("Cyclic dependency: " + d.join(" -> "));
                        if (h[n] = r, M(e)) p.push(n, [function() {
                            return t.get(e)
                        }], s);
                        else {
                            var i = t.annotate(e);
                            P(i, function(e) {
                                e !== n && a.hasOwnProperty(e) && c(a[e], e)
                            }), p.push(n, e, i)
                        }
                        d.pop(), h[n] = o
                    }
                }

                function f(e) {
                    return j(e) && e.then && e.$$promises
                }
                if (!j(a)) throw new Error("'invocables' must be an object");
                var p = [],
                    d = [],
                    h = {};
                return P(a, c), a = d = h = null,
                    function(r, o, a) {
                        function s() {
                            --$ || (y || i(v, o.$$values), m.$$values = v, m.$$promises = !0, delete m.$$inheritedValues, h.resolve(v))
                        }

                        function c(e) {
                            m.$$failure = e, h.reject(e)
                        }

                        function d(n, i, o) {
                            function u(e) {
                                f.reject(e), c(e)
                            }

                            function l() {
                                if (!A(m.$$failure)) try {
                                    f.resolve(t.invoke(i, a, v)), f.promise.then(function(e) {
                                        v[n] = e, s()
                                    }, u)
                                } catch (e) {
                                    u(e)
                                }
                            }
                            var f = e.defer(),
                                p = 0;
                            P(o, function(e) {
                                g.hasOwnProperty(e) && !r.hasOwnProperty(e) && (p++, g[e].then(function(t) {
                                    v[e] = t, --p || l()
                                }, u))
                            }), p || l(), g[n] = f.promise
                        }
                        if (f(r) && a === n && (a = o, o = r, r = null), r) {
                            if (!j(r)) throw new Error("'locals' must be an object")
                        } else r = u;
                        if (o) {
                            if (!f(o)) throw new Error("'parent' must be a promise returned by $resolve.resolve()")
                        } else o = l;
                        var h = e.defer(),
                            m = h.promise,
                            g = m.$$promises = {},
                            v = L({}, r),
                            $ = 1 + p.length / 3,
                            y = !1;
                        if (A(o.$$failure)) return c(o.$$failure), m;
                        o.$$inheritedValues && i(v, o.$$inheritedValues), o.$$values ? (y = i(v, o.$$values), m.$$inheritedValues = o.$$values, s()) : (o.$$inheritedValues && (m.$$inheritedValues = o.$$inheritedValues), L(g, o.$$promises), o.then(s, c));
                        for (var b = 0, w = p.length; w > b; b += 3) r.hasOwnProperty(p[b]) ? s() : d(p[b], p[b + 1], p[b + 2]);
                        return m
                    }
            }, this.resolve = function(e, t, n, r) {
                return this.study(e)(t, n, r)
            }
        }

        function p(e, t, n) {
            this.fromConfig = function(e, t, n) {
                return A(e.template) ? this.fromString(e.template, t) : A(e.templateUrl) ? this.fromUrl(e.templateUrl, t) : A(e.templateProvider) ? this.fromProvider(e.templateProvider, t, n) : null
            }, this.fromString = function(e, t) {
                return O(e) ? e(t) : e
            }, this.fromUrl = function(n, r) {
                return O(n) && (n = n(r)), null == n ? null : e.get(n, {
                    cache: t
                }).then(function(e) {
                    return e.data
                })
            }, this.fromProvider = function(e, t, r) {
                return n.invoke(e, null, r || {
                    params: t
                })
            }
        }

        function d(e, r) {
            function i(e) {
                return A(e) ? this.type.decode(e) : m.$$getDefaultValue(this)
            }

            function o(t, n, r) {
                if (!/^\w+(-+\w+)*$/.test(t)) throw new Error("Invalid parameter name '" + t + "' in pattern '" + e + "'");
                if (d[t]) throw new Error("Duplicate parameter name '" + t + "' in pattern '" + e + "'");
                d[t] = L({
                    type: n || new h,
                    $value: i
                }, r)
            }

            function a(e, t, n) {
                var r = e.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
                if (!t) return r;
                var i = n ? "?" : "";
                return r + i + "(" + t + ")" + i
            }

            function s(e) {
                if (!r.params || !r.params[e]) return {};
                var t = r.params[e];
                return j(t) ? t : {
                    value: t
                }
            }
            r = t.isObject(r) ? r : {};
            var u, l = /([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
                c = "^",
                f = 0,
                p = this.segments = [],
                d = this.params = {};
            this.source = e;
            for (var g, v, $, y, b;
                (u = l.exec(e)) && (g = u[2] || u[3], v = u[4] || ("*" == u[1] ? ".*" : "[^/]*"), $ = e.substring(f, u.index), y = this.$types[v] || new h({
                    pattern: new RegExp(v)
                }), b = s(g), !($.indexOf("?") >= 0));) c += a($, y.$subPattern(), A(b.value)), o(g, y, b), p.push($), f = l.lastIndex;
            $ = e.substring(f);
            var w = $.indexOf("?");
            if (w >= 0) {
                var x = this.sourceSearch = $.substring(w);
                $ = $.substring(0, w), this.sourcePath = e.substring(0, f + w), P(x.substring(1).split(/[&?]/), function(e) {
                    o(e, null, s(e))
                })
            } else this.sourcePath = e, this.sourceSearch = "";
            c += a($) + (r.strict === !1 ? "/?" : "") + "$", p.push($), this.regexp = new RegExp(c, r.caseInsensitive ? "i" : n), this.prefix = p[0]
        }

        function h(e) {
            L(this, e)
        }

        function m() {
            function e() {
                return {
                    strict: o,
                    caseInsensitive: i
                }
            }

            function t(e) {
                return O(e) || N(e) && O(e[e.length - 1])
            }

            function n() {
                P(s, function(e) {
                    if (d.prototype.$types[e.name]) throw new Error("A type named '" + e.name + "' has already been defined.");
                    var n = new h(t(e.def) ? r.invoke(e.def) : e.def);
                    d.prototype.$types[e.name] = n
                })
            }
            var r, i = !1,
                o = !0,
                a = !0,
                s = [],
                u = {
                    "int": {
                        decode: function(e) {
                            return parseInt(e, 10)
                        },
                        is: function(e) {
                            return A(e) ? this.decode(e.toString()) === e : !1
                        },
                        pattern: /\d+/
                    },
                    bool: {
                        encode: function(e) {
                            return e ? 1 : 0
                        },
                        decode: function(e) {
                            return 0 === parseInt(e, 10) ? !1 : !0
                        },
                        is: function(e) {
                            return e === !0 || e === !1
                        },
                        pattern: /0|1/
                    },
                    string: {
                        pattern: /[^\/]*/
                    },
                    date: {
                        equals: function(e, t) {
                            return e.toISOString() === t.toISOString()
                        },
                        decode: function(e) {
                            return new Date(e)
                        },
                        encode: function(e) {
                            return [e.getFullYear(), ("0" + (e.getMonth() + 1)).slice(-2), ("0" + e.getDate()).slice(-2)].join("-")
                        },
                        pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/
                    }
                };
            m.$$getDefaultValue = function(e) {
                if (!t(e.value)) return e.value;
                if (!r) throw new Error("Injectable functions cannot be called at configuration time");
                return r.invoke(e.value)
            }, this.caseInsensitive = function(e) {
                i = e
            }, this.strictMode = function(e) {
                o = e
            }, this.compile = function(t, n) {
                return new d(t, L(e(), n))
            }, this.isMatcher = function(e) {
                if (!j(e)) return !1;
                var t = !0;
                return P(d.prototype, function(n, r) {
                    O(n) && (t = t && A(e[r]) && O(e[r]))
                }), t
            }, this.type = function(e, t) {
                return A(t) ? (s.push({
                    name: e,
                    def: t
                }), a || n(), this) : d.prototype.$types[e]
            }, this.$get = ["$injector", function(e) {
                return r = e, a = !1, d.prototype.$types = {}, n(), P(u, function(e, t) {
                    d.prototype.$types[t] || (d.prototype.$types[t] = new h(e))
                }), this
            }]
        }

        function g(e, t) {
            function r(e) {
                var t = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(e.source);
                return null != t ? t[1].replace(/\\(.)/g, "$1") : ""
            }

            function i(e, t) {
                return e.replace(/\$(\$|\d{1,2})/, function(e, n) {
                    return t["$" === n ? 0 : Number(n)]
                })
            }

            function o(e, t, n) {
                if (!n) return !1;
                var r = e.invoke(t, t, {
                    $match: n
                });
                return A(r) ? r : !0
            }

            function a(t, n, r, i) {
                function o(e, t, n) {
                    return "/" === p ? e : t ? p.slice(0, -1) + e : n ? p.slice(1) + e : e
                }

                function a(e) {
                    function n(e) {
                        var n = e(r, t);
                        return n ? (M(n) && t.replace().url(n), !0) : !1
                    }
                    if (!e || !e.defaultPrevented) {
                        var i, o = u.length;
                        for (i = 0; o > i; i++)
                            if (n(u[i])) return;
                        l && n(l)
                    }
                }

                function f() {
                    return s = s || n.$on("$locationChangeSuccess", a)
                }
                var p = i.baseHref(),
                    d = t.url();
                return c || f(), {
                    sync: function() {
                        a()
                    },
                    listen: function() {
                        return f()
                    },
                    update: function(e) {
                        return e ? void(d = t.url()) : void(t.url() !== d && (t.url(d), t.replace()))
                    },
                    push: function(e, n, r) {
                        t.url(e.format(n || {})), r && r.replace && t.replace()
                    },
                    href: function(n, r, i) {
                        if (!n.validates(r)) return null;
                        var a = e.html5Mode(),
                            s = n.format(r);
                        if (i = i || {}, a || null === s || (s = "#" + e.hashPrefix() + s), s = o(s, a, i.absolute), !i.absolute || !s) return s;
                        var u = !a && s ? "/" : "",
                            l = t.port();
                        return l = 80 === l || 443 === l ? "" : ":" + l, [t.protocol(), "://", t.host(), l, u, s].join("")
                    }
                }
            }
            var s, u = [],
                l = null,
                c = !1;
            this.rule = function(e) {
                if (!O(e)) throw new Error("'rule' must be a function");
                return u.push(e), this
            }, this.otherwise = function(e) {
                if (M(e)) {
                    var t = e;
                    e = function() {
                        return t
                    }
                } else if (!O(e)) throw new Error("'rule' must be a function");
                return l = e, this
            }, this.when = function(e, n) {
                var a, s = M(n);
                if (M(e) && (e = t.compile(e)), !s && !O(n) && !N(n)) throw new Error("invalid 'handler' in when()");
                var u = {
                        matcher: function(e, n) {
                            return s && (a = t.compile(n), n = ["$match", function(e) {
                                return a.format(e)
                            }]), L(function(t, r) {
                                return o(t, n, e.exec(r.path(), r.search()))
                            }, {
                                prefix: M(e.prefix) ? e.prefix : ""
                            })
                        },
                        regex: function(e, t) {
                            if (e.global || e.sticky) throw new Error("when() RegExp must not be global or sticky");
                            return s && (a = t, t = ["$match", function(e) {
                                return i(a, e)
                            }]), L(function(n, r) {
                                return o(n, t, e.exec(r.path()))
                            }, {
                                prefix: r(e)
                            })
                        }
                    },
                    l = {
                        matcher: t.isMatcher(e),
                        regex: e instanceof RegExp
                    };
                for (var c in l)
                    if (l[c]) return this.rule(u[c](e, n));
                throw new Error("invalid 'what' in when()")
            }, this.deferIntercept = function(e) {
                e === n && (e = !0), c = e
            }, this.$get = a, a.$inject = ["$location", "$rootScope", "$injector", "$browser"]
        }

        function v(e, i) {
            function o(e) {
                return 0 === e.indexOf(".") || 0 === e.indexOf("^")
            }

            function s(e, t) {
                if (!e) return n;
                var r = M(e),
                    i = r ? e : e.name,
                    a = o(i);
                if (a) {
                    if (!t) throw new Error("No reference point given for path '" + i + "'");
                    for (var s = i.split("."), u = 0, l = s.length, c = t; l > u; u++)
                        if ("" !== s[u] || 0 !== u) {
                            if ("^" !== s[u]) break;
                            if (!c.parent) throw new Error("Path '" + i + "' not valid for state '" + t.name + "'");
                            c = c.parent
                        } else c = t;
                    s = s.slice(u).join("."), i = c.name + (c.name && s ? "." : "") + s
                }
                var f = w[i];
                return !f || !r && (r || f !== e && f.self !== e) ? n : f
            }

            function f(e, t) {
                x[e] || (x[e] = []), x[e].push(t)
            }

            function p(t) {
                t = r(t, {
                    self: t,
                    resolve: t.resolve || {},
                    toString: function() {
                        return this.name
                    }
                });
                var n = t.name;
                if (!M(n) || n.indexOf("@") >= 0) throw new Error("State must have a valid name");
                if (w.hasOwnProperty(n)) throw new Error("State '" + n + "'' is already defined");
                var i = -1 !== n.indexOf(".") ? n.substring(0, n.lastIndexOf(".")) : M(t.parent) ? t.parent : "";
                if (i && !w[i]) return f(i, t.self);
                for (var o in k) O(k[o]) && (t[o] = k[o](t, k.$delegates[o]));
                if (w[n] = t, !t[C] && t.url && e.when(t.url, ["$match", "$stateParams", function(e, n) {
                        b.$current.navigable == t && l(e, n) || b.transitionTo(t, e, {
                            location: !1
                        })
                    }]), x[n])
                    for (var a = 0; a < x[n].length; a++) p(x[n][a]);
                return t
            }

            function d(e) {
                return e.indexOf("*") > -1
            }

            function h(e) {
                var t = e.split("."),
                    n = b.$current.name.split(".");
                if ("**" === t[0] && (n = n.slice(n.indexOf(t[1])), n.unshift("**")), "**" === t[t.length - 1] && (n.splice(n.indexOf(t[t.length - 2]) + 1, Number.MAX_VALUE), n.push("**")), t.length != n.length) return !1;
                for (var r = 0, i = t.length; i > r; r++) "*" === t[r] && (n[r] = "*");
                return n.join("") === t.join("")
            }

            function m(e, t) {
                return M(e) && !A(t) ? k[e] : O(t) && M(e) ? (k[e] && !k.$delegates[e] && (k.$delegates[e] = k[e]), k[e] = t, this) : this
            }

            function g(e, t) {
                return j(e) ? t = e : t.name = e, p(t), this
            }

            function v(e, i, o, f, p, m, g) {
                function v(t, n, r, o) {
                    var a = e.$broadcast("$stateNotFound", t, n, r);
                    if (a.defaultPrevented) return g.update(), E;
                    if (!a.retry) return null;
                    if (o.$retry) return g.update(), T;
                    var s = b.transition = i.when(a.retry);
                    return s.then(function() {
                        return s !== b.transition ? k : (t.options.$retry = !0, b.transitionTo(t.to, t.toParams, t.options))
                    }, function() {
                        return E
                    }), g.update(), s
                }

                function x(e, n, r, s, u) {
                    var l = r ? n : c(a(e.params), n),
                        d = {
                            $stateParams: l
                        };
                    u.resolve = p.resolve(e.resolve, d, u.resolve, e);
                    var h = [u.resolve.then(function(e) {
                        u.globals = e
                    })];
                    return s && h.push(s), P(e.views, function(n, r) {
                        var i = n.resolve && n.resolve !== e.resolve ? n.resolve : {};
                        i.$template = [function() {
                            return o.load(r, {
                                view: n,
                                locals: d,
                                params: l
                            }) || ""
                        }], h.push(p.resolve(i, d, u.resolve, e).then(function(o) {
                            if (O(n.controllerProvider) || N(n.controllerProvider)) {
                                var a = t.extend({}, i, d);
                                o.$$controller = f.invoke(n.controllerProvider, null, a)
                            } else o.$$controller = n.controller;
                            o.$$state = e, o.$$controllerAs = n.controllerAs, u[r] = o
                        }))
                    }), i.all(h).then(function(e) {
                        return u
                    })
                }
                var k = i.reject(new Error("transition superseded")),
                    S = i.reject(new Error("transition prevented")),
                    E = i.reject(new Error("transition aborted")),
                    T = i.reject(new Error("transition failed"));
                return y.locals = {
                    resolve: null,
                    globals: {
                        $stateParams: {}
                    }
                }, b = {
                    params: {},
                    current: y.self,
                    $current: y,
                    transition: null
                }, b.reload = function() {
                    b.transitionTo(b.current, m, {
                        reload: !0,
                        inherit: !1,
                        notify: !1
                    })
                }, b.go = function(e, t, n) {
                    return b.transitionTo(e, t, L({
                        inherit: !0,
                        relative: b.$current
                    }, n))
                }, b.transitionTo = function(t, n, o) {
                    n = n || {}, o = L({
                        location: !0,
                        inherit: !1,
                        relative: null,
                        notify: !0,
                        reload: !1,
                        $retry: !1
                    }, o || {});
                    var p, d = b.$current,
                        h = b.params,
                        w = d.path,
                        E = s(t, o.relative);
                    if (!A(E)) {
                        var T = {
                                to: t,
                                toParams: n,
                                options: o
                            },
                            D = v(T, d.self, h, o);
                        if (D) return D;
                        if (t = T.to, n = T.toParams, o = T.options, E = s(t, o.relative), !A(E)) {
                            if (!o.relative) throw new Error("No such state '" + t + "'");
                            throw new Error("Could not resolve '" + t + "' from state '" + o.relative + "'")
                        }
                    }
                    if (E[C]) throw new Error("Cannot transition to abstract state '" + t + "'");
                    o.inherit && (n = u(m, n || {}, b.$current, E)), t = E;
                    var O = t.path,
                        M = 0,
                        j = O[M],
                        N = y.locals,
                        P = [];
                    if (!o.reload)
                        for (; j && j === w[M] && l(n, h, j.ownParams);) N = P[M] = j.locals, M++, j = O[M];
                    if ($(t, d, N, o)) return t.self.reloadOnSearch !== !1 && g.update(), b.transition = null, i.when(b.current);
                    if (n = c(a(t.params), n || {}), o.notify && e.$broadcast("$stateChangeStart", t.self, n, d.self, h).defaultPrevented) return g.update(), S;
                    for (var q = i.when(N), V = M; V < O.length; V++, j = O[V]) N = P[V] = r(N), q = x(j, n, j === t, q, N);
                    var F = b.transition = q.then(function() {
                        var r, i, a;
                        if (b.transition !== F) return k;
                        for (r = w.length - 1; r >= M; r--) a = w[r], a.self.onExit && f.invoke(a.self.onExit, a.self, a.locals.globals), a.locals = null;
                        for (r = M; r < O.length; r++) i = O[r], i.locals = P[r], i.self.onEnter && f.invoke(i.self.onEnter, i.self, i.locals.globals);
                        return b.transition !== F ? k : (b.$current = t, b.current = t.self, b.params = n, I(b.params, m), b.transition = null, o.location && t.navigable && g.push(t.navigable.url, t.navigable.locals.globals.$stateParams, {
                            replace: "replace" === o.location
                        }), o.notify && e.$broadcast("$stateChangeSuccess", t.self, n, d.self, h), g.update(!0), b.current)
                    }, function(r) {
                        return b.transition !== F ? k : (b.transition = null, p = e.$broadcast("$stateChangeError", t.self, n, d.self, h, r), p.defaultPrevented || g.update(), i.reject(r))
                    });
                    return F
                }, b.is = function(e, r) {
                    var i = s(e);
                    return A(i) ? b.$current !== i ? !1 : A(r) && null !== r ? t.equals(m, r) : !0 : n
                }, b.includes = function(e, t) {
                    if (M(e) && d(e)) {
                        if (!h(e)) return !1;
                        e = b.$current.name
                    }
                    var r = s(e);
                    return A(r) ? A(b.$current.includes[r.name]) ? l(t, m) : !1 : n
                }, b.href = function(e, t, n) {
                    n = L({
                        lossy: !0,
                        inherit: !0,
                        absolute: !1,
                        relative: b.$current
                    }, n || {});
                    var r = s(e, n.relative);
                    if (!A(r)) return null;
                    n.inherit && (t = u(m, t || {}, b.$current, r));
                    var i = r && n.lossy ? r.navigable : r;
                    return i && i.url ? g.href(i.url, c(a(r.params), t || {}), {
                        absolute: n.absolute
                    }) : null
                }, b.get = function(e, t) {
                    if (0 === arguments.length) return a(w).map(function(e) {
                        return w[e].self
                    });
                    var n = s(e, t);
                    return n && n.self ? n.self : null
                }, b
            }

            function $(e, t, n, r) {
                return e !== t || (n !== t.locals || r.reload) && e.self.reloadOnSearch !== !1 ? void 0 : !0
            }
            var y, b, w = {},
                x = {},
                C = "abstract",
                k = {
                    parent: function(e) {
                        if (A(e.parent) && e.parent) return s(e.parent);
                        var t = /^(.+)\.[^.]+$/.exec(e.name);
                        return t ? s(t[1]) : y
                    },
                    data: function(e) {
                        return e.parent && e.parent.data && (e.data = e.self.data = L({}, e.parent.data, e.data)), e.data
                    },
                    url: function(e) {
                        var t = e.url,
                            n = {
                                params: e.params || {}
                            };
                        if (M(t)) return "^" == t.charAt(0) ? i.compile(t.substring(1), n) : (e.parent.navigable || y).url.concat(t, n);
                        if (!t || i.isMatcher(t)) return t;
                        throw new Error("Invalid url '" + t + "' in state '" + e + "'")
                    },
                    navigable: function(e) {
                        return e.url ? e : e.parent ? e.parent.navigable : null
                    },
                    params: function(e) {
                        return e.params ? e.params : e.url ? e.url.params : e.parent.params
                    },
                    views: function(e) {
                        var t = {};
                        return P(A(e.views) ? e.views : {
                            "": e
                        }, function(n, r) {
                            r.indexOf("@") < 0 && (r += "@" + e.parent.name), t[r] = n
                        }), t
                    },
                    ownParams: function(e) {
                        if (e.params = e.params || {}, !e.parent) return a(e.params);
                        var t = {};
                        P(e.params, function(e, n) {
                            t[n] = !0
                        }), P(e.parent.params, function(n, r) {
                            if (!t[r]) throw new Error("Missing required parameter '" + r + "' in state '" + e.name + "'");
                            t[r] = !1
                        });
                        var n = [];
                        return P(t, function(e, t) {
                            e && n.push(t)
                        }), n
                    },
                    path: function(e) {
                        return e.parent ? e.parent.path.concat(e) : []
                    },
                    includes: function(e) {
                        var t = e.parent ? L({}, e.parent.includes) : {};
                        return t[e.name] = !0, t
                    },
                    $delegates: {}
                };
            y = p({
                name: "",
                url: "^",
                views: null,
                "abstract": !0
            }), y.navigable = null, this.decorator = m, this.state = g, this.$get = v, v.$inject = ["$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$urlRouter"]
        }

        function $() {
            function e(e, t) {
                return {
                    load: function(n, r) {
                        var i, o = {
                            template: null,
                            controller: null,
                            view: null,
                            locals: null,
                            notify: !0,
                            async: !0,
                            params: {}
                        };
                        return r = L(o, r), r.view && (i = t.fromConfig(r.view, r.params, r.locals)), i && r.notify && e.$broadcast("$viewContentLoading", r), i
                    }
                }
            }
            this.$get = e, e.$inject = ["$rootScope", "$templateFactory"]
        }

        function y() {
            var e = !1;
            this.useAnchorScroll = function() {
                e = !0
            }, this.$get = ["$anchorScroll", "$timeout", function(t, n) {
                return e ? t : function(e) {
                    n(function() {
                        e[0].scrollIntoView()
                    }, 0, !1)
                }
            }]
        }

        function b(e, n, r) {
            function i() {
                return n.has ? function(e) {
                    return n.has(e) ? n.get(e) : null
                } : function(e) {
                    try {
                        return n.get(e)
                    } catch (t) {
                        return null
                    }
                }
            }

            function o(e, t) {
                var n = function() {
                    return {
                        enter: function(e, t, n) {
                            t.after(e), n()
                        },
                        leave: function(e, t) {
                            e.remove(), t()
                        }
                    }
                };
                if (u) return {
                    enter: function(e, t, n) {
                        u.enter(e, null, t, n)
                    },
                    leave: function(e, t) {
                        u.leave(e, t)
                    }
                };
                if (s) {
                    var r = s && s(t, e);
                    return {
                        enter: function(e, t, n) {
                            r.enter(e, null, t), n()
                        },
                        leave: function(e, t) {
                            r.leave(e), t()
                        }
                    }
                }
                return n()
            }
            var a = i(),
                s = a("$animator"),
                u = a("$animate"),
                l = {
                    restrict: "ECA",
                    terminal: !0,
                    priority: 400,
                    transclude: "element",
                    compile: function(n, i, a) {
                        return function(n, i, s) {
                            function u() {
                                c && (c.remove(), c = null), p && (p.$destroy(), p = null), f && (g.leave(f, function() {
                                    c = null
                                }), c = f, f = null)
                            }

                            function l(o) {
                                var l, c = x(s, i.inheritedData("$uiView")),
                                    v = c && e.$current && e.$current.locals[c];
                                if (o || v !== d) {
                                    l = n.$new(), d = e.$current.locals[c];
                                    var $ = a(l, function(e) {
                                        g.enter(e, i, function() {
                                            (t.isDefined(m) && !m || n.$eval(m)) && r(e)
                                        }), u()
                                    });
                                    f = $, p = l, p.$emit("$viewContentLoaded"), p.$eval(h)
                                }
                            }
                            var c, f, p, d, h = s.onload || "",
                                m = s.autoscroll,
                                g = o(s, n);
                            n.$on("$stateChangeSuccess", function() {
                                l(!1)
                            }), n.$on("$viewContentLoading", function() {
                                l(!1)
                            }), l(!0)
                        }
                    }
                };
            return l
        }

        function w(e, t, n) {
            return {
                restrict: "ECA",
                priority: -400,
                compile: function(r) {
                    var i = r.html();
                    return function(r, o, a) {
                        var s = n.$current,
                            u = x(a, o.inheritedData("$uiView")),
                            l = s && s.locals[u];
                        if (l) {
                            o.data("$uiView", {
                                name: u,
                                state: l.$$state
                            }), o.html(l.$template ? l.$template : i);
                            var c = e(o.contents());
                            if (l.$$controller) {
                                l.$scope = r;
                                var f = t(l.$$controller, l);
                                l.$$controllerAs && (r[l.$$controllerAs] = f), o.data("$ngControllerController", f), o.children().data("$ngControllerController", f)
                            }
                            c(r)
                        }
                    }
                }
            }
        }

        function x(e, t) {
            var n = e.uiView || e.name || "";
            return n.indexOf("@") >= 0 ? n : n + "@" + (t ? t.state.name : "")
        }

        function C(e, t) {
            var n, r = e.match(/^\s*({[^}]*})\s*$/);
            if (r && (e = t + "(" + r[1] + ")"), n = e.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/), !n || 4 !== n.length) throw new Error("Invalid state ref '" + e + "'");
            return {
                state: n[1],
                paramExpr: n[3] || null
            }
        }

        function k(e) {
            var t = e.parent().inheritedData("$uiView");
            return t && t.state && t.state.name ? t.state : void 0
        }

        function S(e, n) {
            var r = ["location", "inherit", "reload"];
            return {
                restrict: "A",
                require: ["?^uiSrefActive", "?^uiSrefActiveEq"],
                link: function(i, o, a, s) {
                    var u = C(a.uiSref, e.current.name),
                        l = null,
                        c = k(o) || e.$current,
                        f = "FORM" === o[0].nodeName,
                        p = f ? "action" : "href",
                        d = !0,
                        h = {
                            relative: c,
                            inherit: !0
                        },
                        m = i.$eval(a.uiSrefOpts) || {};
                    t.forEach(r, function(e) {
                        e in m && (h[e] = m[e])
                    });
                    var g = function(t) {
                        if (t && (l = t), d) {
                            var n = e.href(u.state, l, h),
                                r = s[1] || s[0];
                            return r && r.$$setStateInfo(u.state, l), null === n ? (d = !1, !1) : void(o[0][p] = n)
                        }
                    };
                    u.paramExpr && (i.$watch(u.paramExpr, function(e, t) {
                        e !== l && g(e)
                    }, !0), l = i.$eval(u.paramExpr)), g(), f || o.bind("click", function(t) {
                        var r = t.which || t.button;
                        if (!(r > 1 || t.ctrlKey || t.metaKey || t.shiftKey || o.attr("target"))) {
                            var i = n(function() {
                                e.go(u.state, l, h)
                            });
                            t.preventDefault(), t.preventDefault = function() {
                                n.cancel(i)
                            }
                        }
                    })
                }
            }
        }

        function E(e, t, n) {
            return {
                restrict: "A",
                controller: ["$scope", "$element", "$attrs", function(r, i, o) {
                    function a() {
                        s() ? i.addClass(p) : i.removeClass(p)
                    }

                    function s() {
                        return "undefined" != typeof o.uiSrefActiveEq ? e.$current.self === c && u() : e.includes(c.name) && u()
                    }

                    function u() {
                        return !f || l(f, t)
                    }
                    var c, f, p;
                    p = n(o.uiSrefActiveEq || o.uiSrefActive || "", !1)(r), this.$$setStateInfo = function(t, n) {
                        c = e.get(t, k(i)), f = n, a()
                    }, r.$on("$stateChangeSuccess", a)
                }]
            }
        }

        function T(e) {
            return function(t) {
                return e.is(t)
            }
        }

        function D(e) {
            return function(t) {
                return e.includes(t)
            }
        }
        var A = t.isDefined,
            O = t.isFunction,
            M = t.isString,
            j = t.isObject,
            N = t.isArray,
            P = t.forEach,
            L = t.extend,
            I = t.copy;
        t.module("ui.router.util", ["ng"]), t.module("ui.router.router", ["ui.router.util"]), t.module("ui.router.state", ["ui.router.router", "ui.router.util"]), t.module("ui.router", ["ui.router.state"]), t.module("ui.router.compat", ["ui.router"]), f.$inject = ["$q", "$injector"], t.module("ui.router.util").service("$resolve", f), p.$inject = ["$http", "$templateCache", "$injector"], t.module("ui.router.util").service("$templateFactory", p), d.prototype.concat = function(e, t) {
            return new d(this.sourcePath + e + this.sourceSearch, t)
        }, d.prototype.toString = function() {
            return this.source
        }, d.prototype.exec = function(e, t) {
            var n = this.regexp.exec(e);
            if (!n) return null;
            t = t || {};
            var r, i, o, a = this.parameters(),
                s = a.length,
                u = this.segments.length - 1,
                l = {};
            if (u !== n.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");
            for (r = 0; u > r; r++) o = a[r], i = this.params[o], l[o] = i.$value(n[r + 1]);
            for (; s > r; r++) o = a[r], i = this.params[o], l[o] = i.$value(t[o]);
            return l
        }, d.prototype.parameters = function(e) {
            return A(e) ? this.params[e] || null : a(this.params)
        }, d.prototype.validates = function(e) {
            var t, n, r = !0,
                i = this;
            return P(e, function(e, o) {
                i.params[o] && (n = i.params[o], t = !e && A(n.value), r = r && (t || n.type.is(e)))
            }), r
        }, d.prototype.format = function(e) {
            var t = this.segments,
                n = this.parameters();
            if (!e) return t.join("").replace("//", "/");
            var r, i, o, a, s, u, l = t.length - 1,
                c = n.length,
                f = t[0];
            if (!this.validates(e)) return null;
            for (r = 0; l > r; r++) a = n[r], o = e[a], s = this.params[a], (A(o) || "/" !== t[r] && "/" !== t[r + 1]) && (null != o && (f += encodeURIComponent(s.type.encode(o))), f += t[r + 1]);
            for (; c > r; r++) a = n[r], o = e[a], null != o && (u = N(o), u && (o = o.map(encodeURIComponent).join("&" + a + "=")), f += (i ? "&" : "?") + a + "=" + (u ? o : encodeURIComponent(o)), i = !0);
            return f
        }, d.prototype.$types = {}, h.prototype.is = function(e, t) {
            return !0
        }, h.prototype.encode = function(e, t) {
            return e
        }, h.prototype.decode = function(e, t) {
            return e
        }, h.prototype.equals = function(e, t) {
            return e == t
        }, h.prototype.$subPattern = function() {
            var e = this.pattern.toString();
            return e.substr(1, e.length - 2)
        }, h.prototype.pattern = /.*/, t.module("ui.router.util").provider("$urlMatcherFactory", m), g.$inject = ["$locationProvider", "$urlMatcherFactoryProvider"], t.module("ui.router.router").provider("$urlRouter", g), v.$inject = ["$urlRouterProvider", "$urlMatcherFactoryProvider"], t.module("ui.router.state").value("$stateParams", {}).provider("$state", v), $.$inject = [], t.module("ui.router.state").provider("$view", $), t.module("ui.router.state").provider("$uiViewScroll", y), b.$inject = ["$state", "$injector", "$uiViewScroll"], w.$inject = ["$compile", "$controller", "$state"], t.module("ui.router.state").directive("uiView", b), t.module("ui.router.state").directive("uiView", w), S.$inject = ["$state", "$timeout"], E.$inject = ["$state", "$stateParams", "$interpolate"], t.module("ui.router.state").directive("uiSref", S).directive("uiSrefActive", E).directive("uiSrefActiveEq", E), T.$inject = ["$state"], D.$inject = ["$state"], t.module("ui.router.state").filter("isState", T).filter("includedByState", D)
    }(window, window.angular),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["angular"], t) : "object" == typeof exports ? module.exports = t(require("angular")) : t(e.angular)
    }(this, function(e) {
        "use strict";

        function t(t) {
            return function() {
                var n = "ngStorage-";
                this.setKeyPrefix = function(e) {
                    if ("string" != typeof e) throw new TypeError("[ngStorage] - " + t + "Provider.setKeyPrefix() expects a String.");
                    n = e
                };
                var r = e.toJson,
                    i = e.fromJson;
                this.setSerializer = function(e) {
                    if ("function" != typeof e) throw new TypeError("[ngStorage] - " + t + "Provider.setSerializer expects a function.");
                    r = e
                }, this.setDeserializer = function(e) {
                    if ("function" != typeof e) throw new TypeError("[ngStorage] - " + t + "Provider.setDeserializer expects a function.");
                    i = s
                }, this.$get = ["$rootScope", "$window", "$log", "$timeout", function(o, a, s, u) {
                    function l(e) {
                        var t;
                        try {
                            t = a[e]
                        } catch (n) {
                            t = !1
                        }
                        if (t && "localStorage" === e) {
                            var r = "__" + Math.round(1e7 * Math.random());
                            try {
                                localStorage.setItem(r, r), localStorage.removeItem(r)
                            } catch (n) {
                                t = !1
                            }
                        }
                        return t
                    }
                    var c, f, p = l(t) || (s.warn("This browser does not support Web Storage!"), {
                            setItem: e.noop,
                            getItem: e.noop
                        }),
                        d = {
                            $default: function(t) {
                                for (var n in t) e.isDefined(d[n]) || (d[n] = t[n]);
                                return d.$sync(), d
                            },
                            $reset: function(e) {
                                for (var t in d) "$" === t[0] || delete d[t] && p.removeItem(n + t);
                                return d.$default(e)
                            },
                            $sync: function() {
                                for (var e, t = 0, r = p.length; r > t; t++)(e = p.key(t)) && n === e.slice(0, 10) && (d[e.slice(10)] = i(p.getItem(e)))
                            }
                        };
                    return d.$sync(), c = e.copy(d), o.$watch(function() {
                        var t;
                        f || (f = u(function() {
                            if (f = null, !e.equals(d, c)) {
                                t = e.copy(c), e.forEach(d, function(i, o) {
                                    e.isDefined(i) && "$" !== o[0] && p.setItem(n + o, r(i)), delete t[o]
                                });
                                for (var i in t) p.removeItem(n + i);
                                c = e.copy(d)
                            }
                        }, 100, !1))
                    }), a.addEventListener && a.addEventListener("storage", function(t) {
                        n === t.key.slice(0, 10) && (t.newValue ? d[t.key.slice(10)] = i(t.newValue) : delete d[t.key.slice(10)], c = e.copy(d), o.$apply())
                    }), d
                }]
            }
        }
        return e = e || window.angular, e.module("ngStorage", []).provider("$localStorage", t("localStorage")).provider("$sessionStorage", t("sessionStorage"))
    }), angular.module("ui.alias", []).config(["$compileProvider", "uiAliasConfig", function(e, t) {
        t = t || {}, angular.forEach(t, function(t, n) {
            angular.isString(t) && (t = {
                replace: !0,
                template: t
            }), e.directive(n, function() {
                return t
            })
        })
    }]), angular.module("ui.event", []).directive("uiEvent", ["$parse", function(e) {
        return function(t, n, r) {
            var i = t.$eval(r.uiEvent);
            angular.forEach(i, function(r, i) {
                var o = e(r);
                n.bind(i, function(e) {
                    var n = Array.prototype.slice.call(arguments);
                    n = n.splice(1), o(t, {
                        $event: e,
                        $params: n
                    }), t.$$phase || t.$apply()
                })
            })
        }
    }]), angular.module("ui.format", []).filter("format", function() {
        return function(e, t) {
            var n = e;
            if (angular.isString(n) && void 0 !== t)
                if (angular.isArray(t) || angular.isObject(t) || (t = [t]), angular.isArray(t)) {
                    var r = t.length,
                        i = function(e, n) {
                            return n = parseInt(n, 10), n >= 0 && r > n ? t[n] : e
                        };
                    n = n.replace(/\$([0-9]+)/g, i)
                } else angular.forEach(t, function(e, t) {
                    n = n.split(":" + t).join(e)
                });
            return n
        }
    }), angular.module("ui.highlight", []).filter("highlight", function() {
        return function(e, t, n) {
            return t || angular.isNumber(t) ? (e = e.toString(), t = t.toString(), n ? e.split(t).join('<span class="ui-match">' + t + "</span>") : e.replace(new RegExp(t, "gi"), '<span class="ui-match">$&</span>')) : e
        }
    }), angular.module("ui.include", []).directive("uiInclude", ["$http", "$templateCache", "$anchorScroll", "$compile", function(e, t, n, r) {
        return {
            restrict: "ECA",
            terminal: !0,
            compile: function(i, o) {
                var a = o.uiInclude || o.src,
                    s = o.fragment || "",
                    u = o.onload || "",
                    l = o.autoscroll;
                return function(i, o) {
                    function c() {
                        var c = ++p,
                            h = i.$eval(a),
                            m = i.$eval(s);
                        h ? e.get(h, {
                            cache: t
                        }).success(function(e) {
                            if (c === p) {
                                f && f.$destroy(), f = i.$new();
                                var t;
                                t = m ? angular.element("<div/>").html(e).find(m) : angular.element("<div/>").html(e).contents(), o.html(t), r(t)(f), !angular.isDefined(l) || l && !i.$eval(l) || n(), f.$emit("$includeContentLoaded"), i.$eval(u)
                            }
                        }).error(function() {
                            c === p && d()
                        }) : d()
                    }
                    var f, p = 0,
                        d = function() {
                            f && (f.$destroy(), f = null), o.html("")
                        };
                    i.$watch(s, c), i.$watch(a, c)
                }
            }
        }
    }]), angular.module("ui.indeterminate", []).directive("uiIndeterminate", [function() {
        return {
            compile: function(e, t) {
                return t.type && "checkbox" === t.type.toLowerCase() ? function(e, t, n) {
                    e.$watch(n.uiIndeterminate, function(e) {
                        t[0].indeterminate = !!e
                    })
                } : angular.noop
            }
        }
    }]), angular.module("ui.inflector", []).filter("inflector", function() {
        function e(e) {
            return e.replace(/^([a-z])|\s+([a-z])/g, function(e) {
                return e.toUpperCase()
            })
        }

        function t(e, t) {
            return e.replace(/[A-Z]/g, function(e) {
                return t + e
            })
        }
        var n = {
            humanize: function(n) {
                return e(t(n, " ").split("_").join(" "))
            },
            underscore: function(e) {
                return e.substr(0, 1).toLowerCase() + t(e.substr(1), "_").toLowerCase().split(" ").join("_")
            },
            variable: function(t) {
                return t = t.substr(0, 1).toLowerCase() + e(t.split("_").join(" ")).substr(1).split(" ").join("")
            }
        };
        return function(e, t) {
            return t !== !1 && angular.isString(e) ? (t = t || "humanize", n[t](e)) : e
        }
    }), angular.module("ui.jq", []).value("uiJqConfig", {}).directive("uiJq", ["uiJqConfig", "$timeout", function(e, t) {
        return {
            restrict: "A",
            compile: function(n, r) {
                if (!angular.isFunction(n[r.uiJq])) throw new Error('ui-jq: The "' + r.uiJq + '" function does not exist');
                var i = e && e[r.uiJq];
                return function(e, n, r) {
                    function o() {
                        t(function() {
                            n[r.uiJq].apply(n, a)
                        }, 0, !1)
                    }
                    var a = [];
                    r.uiOptions ? (a = e.$eval("[" + r.uiOptions + "]"), angular.isObject(i) && angular.isObject(a[0]) && (a[0] = angular.extend({}, i, a[0]))) : i && (a = [i]), r.ngModel && n.is("select,input,textarea") && n.bind("change", function() {
                        n.trigger("input")
                    }), r.uiRefresh && e.$watch(r.uiRefresh, function() {
                        o()
                    }), o()
                }
            }
        }
    }]), angular.module("ui.keypress", []).factory("keypressHelper", ["$parse", function(e) {
        var t = {
                8: "backspace",
                9: "tab",
                13: "enter",
                27: "esc",
                32: "space",
                33: "pageup",
                34: "pagedown",
                35: "end",
                36: "home",
                37: "left",
                38: "up",
                39: "right",
                40: "down",
                45: "insert",
                46: "delete"
            },
            n = function(e) {
                return e.charAt(0).toUpperCase() + e.slice(1)
            };
        return function(r, i, o, a) {
            var s, u = [];
            s = i.$eval(a["ui" + n(r)]), angular.forEach(s, function(t, n) {
                var r, i;
                i = e(t), angular.forEach(n.split(" "), function(e) {
                    r = {
                        expression: i,
                        keys: {}
                    }, angular.forEach(e.split("-"), function(e) {
                        r.keys[e] = !0
                    }), u.push(r)
                })
            }), o.bind(r, function(e) {
                var n = !(!e.metaKey || e.ctrlKey),
                    o = !!e.altKey,
                    a = !!e.ctrlKey,
                    s = !!e.shiftKey,
                    l = e.keyCode;
                "keypress" === r && !s && l >= 97 && 122 >= l && (l -= 32), angular.forEach(u, function(r) {
                    var u = r.keys[t[l]] || r.keys[l.toString()],
                        c = !!r.keys.meta,
                        f = !!r.keys.alt,
                        p = !!r.keys.ctrl,
                        d = !!r.keys.shift;
                    u && c === n && f === o && p === a && d === s && i.$apply(function() {
                        r.expression(i, {
                            $event: e
                        })
                    })
                })
            })
        }
    }]), angular.module("ui.keypress").directive("uiKeydown", ["keypressHelper", function(e) {
        return {
            link: function(t, n, r) {
                e("keydown", t, n, r)
            }
        }
    }]), angular.module("ui.keypress").directive("uiKeypress", ["keypressHelper", function(e) {
        return {
            link: function(t, n, r) {
                e("keypress", t, n, r)
            }
        }
    }]), angular.module("ui.keypress").directive("uiKeyup", ["keypressHelper", function(e) {
        return {
            link: function(t, n, r) {
                e("keyup", t, n, r)
            }
        }
    }]), angular.module("ui.mask", []).value("uiMaskConfig", {
        maskDefinitions: {
            9: /\d/,
            A: /[a-zA-Z]/,
            "*": /[a-zA-Z0-9]/
        }
    }).directive("uiMask", ["uiMaskConfig", function(e) {
        return {
            priority: 100,
            require: "ngModel",
            restrict: "A",
            compile: function() {
                var t = e;
                return function(e, n, r, i) {
                    function o(e) {
                        return angular.isDefined(e) ? ($(e), F ? (c(), f(), !0) : l()) : l()
                    }

                    function a(e) {
                        angular.isDefined(e) && (A = e, F && x())
                    }

                    function s(e) {
                        return F ? (j = h(e || ""), P = d(j), i.$setValidity("mask", P), P && j.length ? m(j) : void 0) : e
                    }

                    function u(e) {
                        return F ? (j = h(e || ""), P = d(j), i.$viewValue = j.length ? m(j) : "", i.$setValidity("mask", P), "" === j && void 0 !== i.$error.required && i.$setValidity("required", !1), P ? j : void 0) : e
                    }

                    function l() {
                        return F = !1, p(), angular.isDefined(R) ? n.attr("placeholder", R) : n.removeAttr("placeholder"), angular.isDefined(_) ? n.attr("maxlength", _) : n.removeAttr("maxlength"), n.val(i.$modelValue), i.$viewValue = i.$modelValue, !1
                    }

                    function c() {
                        j = I = h(i.$modelValue || ""), N = L = m(j), P = d(j);
                        var e = P && j.length ? N : "";
                        r.maxlength && n.attr("maxlength", 2 * T[T.length - 1]), n.attr("placeholder", A), n.val(e), i.$viewValue = e
                    }

                    function f() {
                        H || (n.bind("blur", y), n.bind("mousedown mouseup", b), n.bind("input keyup click focus", x), H = !0)
                    }

                    function p() {
                        H && (n.unbind("blur", y), n.unbind("mousedown", b), n.unbind("mouseup", b), n.unbind("input", x), n.unbind("keyup", x), n.unbind("click", x), n.unbind("focus", x), H = !1)
                    }

                    function d(e) {
                        return e.length ? e.length >= M : !0
                    }

                    function h(e) {
                        var t = "",
                            n = D.slice();
                        return e = e.toString(), angular.forEach(O, function(t) {
                            e = e.replace(t, "")
                        }), angular.forEach(e.split(""), function(e) {
                            n.length && n[0].test(e) && (t += e, n.shift())
                        }), t
                    }

                    function m(e) {
                        var t = "",
                            n = T.slice();
                        return angular.forEach(A.split(""), function(r, i) {
                            e.length && i === n[0] ? (t += e.charAt(0) || "_", e = e.substr(1), n.shift()) : t += r
                        }), t
                    }

                    function g(e) {
                        var t = r.placeholder;
                        return "undefined" != typeof t && t[e] ? t[e] : "_"
                    }

                    function v() {
                        return A.replace(/[_]+/g, "_").replace(/([^_]+)([a-zA-Z0-9])([^_])/g, "$1$2_$3").split("_")
                    }

                    function $(e) {
                        var t = 0;
                        if (T = [], D = [], A = "", "string" == typeof e) {
                            M = 0;
                            var n = !1,
                                r = e.split("");
                            angular.forEach(r, function(e, r) {
                                U.maskDefinitions[e] ? (T.push(t), A += g(r), D.push(U.maskDefinitions[e]), t++, n || M++) : "?" === e ? n = !0 : (A += e, t++)
                            })
                        }
                        T.push(T.slice().pop() + 1), O = v(), F = T.length > 1 ? !0 : !1
                    }

                    function y() {
                        q = 0, V = 0, P && 0 !== j.length || (N = "", n.val(""), e.$apply(function() {
                            i.$setViewValue("")
                        }))
                    }

                    function b(e) {
                        "mousedown" === e.type ? n.bind("mouseout", w) : n.unbind("mouseout", w)
                    }

                    function w() {
                        V = E(this), n.unbind("mouseout", w)
                    }

                    function x(t) {
                        t = t || {};
                        var r = t.which,
                            o = t.type;
                        if (16 !== r && 91 !== r) {
                            var a, s = n.val(),
                                u = L,
                                l = h(s),
                                c = I,
                                f = !1,
                                p = k(this) || 0,
                                d = q || 0,
                                g = p - d,
                                v = T[0],
                                $ = T[l.length] || T.slice().shift(),
                                y = V || 0,
                                b = E(this) > 0,
                                w = y > 0,
                                x = s.length > u.length || y && s.length > u.length - y,
                                D = s.length < u.length || y && s.length === u.length - y,
                                A = r >= 37 && 40 >= r && t.shiftKey,
                                O = 37 === r,
                                M = 8 === r || "keyup" !== o && D && -1 === g,
                                j = 46 === r || "keyup" !== o && D && 0 === g && !w,
                                N = (O || M || "click" === o) && p > v;
                            if (V = E(this), !A && (!b || "click" !== o && "keyup" !== o)) {
                                if ("input" === o && D && !w && l === c) {
                                    for (; M && p > v && !C(p);) p--;
                                    for (; j && $ > p && -1 === T.indexOf(p);) p++;
                                    var P = T.indexOf(p);
                                    l = l.substring(0, P) + l.substring(P + 1), f = !0
                                }
                                for (a = m(l), L = a, I = l, n.val(a), f && e.$apply(function() {
                                        i.$setViewValue(l)
                                    }), x && v >= p && (p = v + 1), N && p--, p = p > $ ? $ : v > p ? v : p; !C(p) && p > v && $ > p;) p += N ? -1 : 1;
                                (N && $ > p || x && !C(d)) && p++, q = p, S(this, p)
                            }
                        }
                    }

                    function C(e) {
                        return T.indexOf(e) > -1
                    }

                    function k(e) {
                        if (!e) return 0;
                        if (void 0 !== e.selectionStart) return e.selectionStart;
                        if (document.selection) {
                            e.focus();
                            var t = document.selection.createRange();
                            return t.moveStart("character", -e.value.length), t.text.length
                        }
                        return 0
                    }

                    function S(e, t) {
                        if (!e) return 0;
                        if (0 !== e.offsetWidth && 0 !== e.offsetHeight)
                            if (e.setSelectionRange) e.focus(), e.setSelectionRange(t, t);
                            else if (e.createTextRange) {
                            var n = e.createTextRange();
                            n.collapse(!0), n.moveEnd("character", t), n.moveStart("character", t), n.select()
                        }
                    }

                    function E(e) {
                        return e ? void 0 !== e.selectionStart ? e.selectionEnd - e.selectionStart : document.selection ? document.selection.createRange().text.length : 0 : 0
                    }
                    var T, D, A, O, M, j, N, P, L, I, q, V, F = !1,
                        H = !1,
                        R = r.placeholder,
                        _ = r.maxlength,
                        U = {};
                    r.uiOptions ? (U = e.$eval("[" + r.uiOptions + "]"), angular.isObject(U[0]) && (U = function(e, t) {
                        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] ? angular.extend(t[n], e[n]) : t[n] = angular.copy(e[n]));
                        return t
                    }(t, U[0]))) : U = t, r.$observe("uiMask", o), r.$observe("placeholder", a), i.$formatters.push(s), i.$parsers.push(u), n.bind("mousedown mouseup", b), Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
                        if (null === this) throw new TypeError;
                        var t = Object(this),
                            n = t.length >>> 0;
                        if (0 === n) return -1;
                        var r = 0;
                        if (arguments.length > 1 && (r = Number(arguments[1]), r !== r ? r = 0 : 0 !== r && r !== 1 / 0 && r !== -(1 / 0) && (r = (r > 0 || -1) * Math.floor(Math.abs(r)))), r >= n) return -1;
                        for (var i = r >= 0 ? r : Math.max(n - Math.abs(r), 0); n > i; i++)
                            if (i in t && t[i] === e) return i;
                        return -1
                    })
                }
            }
        }
    }]), angular.module("ui.reset", []).value("uiResetConfig", null).directive("uiReset", ["uiResetConfig", function(e) {
        var t = null;
        return void 0 !== e && (t = e), {
            require: "ngModel",
            link: function(e, n, r, i) {
                var o;
                o = angular.element('<a class="ui-reset" />'), n.wrap('<span class="ui-resetwrap" />').after(o), o.bind("click", function(n) {
                    n.preventDefault(), e.$apply(function() {
                        i.$setViewValue(r.uiReset ? e.$eval(r.uiReset) : t), i.$render()
                    })
                })
            }
        }
    }]), angular.module("ui.route", []).directive("uiRoute", ["$location", "$parse", function(e, t) {
        return {
            restrict: "AC",
            scope: !0,
            compile: function(n, r) {
                var i;
                if (r.uiRoute) i = "uiRoute";
                else if (r.ngHref) i = "ngHref";
                else {
                    if (!r.href) throw new Error("uiRoute missing a route or href property on " + n[0]);
                    i = "href"
                }
                return function(n, r, o) {
                    function a(t) {
                        var r = t.indexOf("#");
                        r > -1 && (t = t.substr(r + 1)), (l = function() {
                            u(n, e.path().indexOf(t) > -1)
                        })()
                    }

                    function s(t) {
                        var r = t.indexOf("#");
                        r > -1 && (t = t.substr(r + 1)), (l = function() {
                            var r = new RegExp("^" + t + "$", ["i"]);
                            u(n, r.test(e.path()))
                        })()
                    }
                    var u = t(o.ngModel || o.routeModel || "$uiRoute").assign,
                        l = angular.noop;
                    switch (i) {
                        case "uiRoute":
                            o.uiRoute ? s(o.uiRoute) : o.$observe("uiRoute", s);
                            break;
                        case "ngHref":
                            o.ngHref ? a(o.ngHref) : o.$observe("ngHref", a);
                            break;
                        case "href":
                            a(o.href)
                    }
                    n.$on("$routeChangeSuccess", function() {
                        l()
                    }), n.$on("$stateChangeSuccess", function() {
                        l()
                    })
                }
            }
        }
    }]), angular.module("ui.scroll.jqlite", ["ui.scroll"]).service("jqLiteExtras", ["$log", "$window", function(e, t) {
        return {
            registerFor: function(e) {
                var n, r, i, o, a, s, u;
                return r = angular.element.prototype.css, e.prototype.css = function(e, t) {
                    var n, i;
                    return i = this, n = i[0], n && 3 !== n.nodeType && 8 !== n.nodeType && n.style ? r.call(i, e, t) : void 0
                }, s = function(e) {
                    return e && e.document && e.location && e.alert && e.setInterval
                }, u = function(e, t, n) {
                    var r, i, o, a, u;
                    return r = e[0], u = {
                        top: ["scrollTop", "pageYOffset", "scrollLeft"],
                        left: ["scrollLeft", "pageXOffset", "scrollTop"]
                    }[t], i = u[0], a = u[1], o = u[2], s(r) ? angular.isDefined(n) ? r.scrollTo(e[o].call(e), n) : a in r ? r[a] : r.document.documentElement[i] : angular.isDefined(n) ? r[i] = n : r[i]
                }, t.getComputedStyle ? (o = function(e) {
                    return t.getComputedStyle(e, null)
                }, n = function(e, t) {
                    return parseFloat(t)
                }) : (o = function(e) {
                    return e.currentStyle
                }, n = function(e, t) {
                    var n, r, i, o, a, s, u;
                    return n = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, o = new RegExp("^(" + n + ")(?!px)[a-z%]+$", "i"), o.test(t) ? (u = e.style, r = u.left, a = e.runtimeStyle, s = a && a.left, a && (a.left = u.left), u.left = t, i = u.pixelLeft, u.left = r, s && (a.left = s), i) : parseFloat(t)
                }), i = function(e, t) {
                    var r, i, a, u, l, c, f, p, d, h, m, g, v;
                    return s(e) ? (r = document.documentElement[{
                        height: "clientHeight",
                        width: "clientWidth"
                    }[t]], {
                        base: r,
                        padding: 0,
                        border: 0,
                        margin: 0
                    }) : (v = {
                        width: [e.offsetWidth, "Left", "Right"],
                        height: [e.offsetHeight, "Top", "Bottom"]
                    }[t], r = v[0], f = v[1], p = v[2], c = o(e), m = n(e, c["padding" + f]) || 0, g = n(e, c["padding" + p]) || 0, i = n(e, c["border" + f + "Width"]) || 0, a = n(e, c["border" + p + "Width"]) || 0, u = c["margin" + f], l = c["margin" + p], d = n(e, u) || 0, h = n(e, l) || 0, {
                        base: r,
                        padding: m + g,
                        border: i + a,
                        margin: d + h
                    })
                }, a = function(e, t, n) {
                    var r, a, s;
                    return a = i(e, t), a.base > 0 ? {
                        base: a.base - a.padding - a.border,
                        outer: a.base,
                        outerfull: a.base + a.margin
                    }[n] : (r = o(e), s = r[t], (0 > s || null === s) && (s = e.style[t] || 0), s = parseFloat(s) || 0, {
                        base: s - a.padding - a.border,
                        outer: s,
                        outerfull: s + a.padding + a.border + a.margin
                    }[n])
                }, angular.forEach({
                    before: function(e) {
                        var t, n, r, i, o, a, s;
                        if (o = this, n = o[0], i = o.parent(), t = i.contents(), t[0] === n) return i.prepend(e);
                        for (r = a = 1, s = t.length - 1; s >= 1 ? s >= a : a >= s; r = s >= 1 ? ++a : --a)
                            if (t[r] === n) return void angular.element(t[r - 1]).after(e);
                        throw new Error("invalid DOM structure " + n.outerHTML)
                    },
                    height: function(e) {
                        var t;
                        return t = this, angular.isDefined(e) ? (angular.isNumber(e) && (e += "px"), r.call(t, "height", e)) : a(this[0], "height", "base")
                    },
                    outerHeight: function(e) {
                        return a(this[0], "height", e ? "outerfull" : "outer")
                    },
                    offset: function(e) {
                        var t, n, r, i, o, a;
                        return o = this, arguments.length ? void 0 === e ? o : e : (t = {
                            top: 0,
                            left: 0
                        }, i = o[0], (n = i && i.ownerDocument) ? (r = n.documentElement, i.getBoundingClientRect && (t = i.getBoundingClientRect()), a = n.defaultView || n.parentWindow, {
                            top: t.top + (a.pageYOffset || r.scrollTop) - (r.clientTop || 0),
                            left: t.left + (a.pageXOffset || r.scrollLeft) - (r.clientLeft || 0)
                        }) : void 0)
                    },
                    scrollTop: function(e) {
                        return u(this, "top", e)
                    },
                    scrollLeft: function(e) {
                        return u(this, "left", e)
                    }
                }, function(t, n) {
                    return e.prototype[n] ? void 0 : e.prototype[n] = t
                })
            }
        }
    }]).run(["$log", "$window", "jqLiteExtras", function(e, t, n) {
        return t.jQuery ? void 0 : n.registerFor(angular.element)
    }]), angular.module("ui.scroll", []).directive("ngScrollViewport", ["$log", function() {
        return {
            controller: ["$scope", "$element", function(e, t) {
                return t
            }]
        }
    }]).directive("ngScroll", ["$log", "$injector", "$rootScope", "$timeout", function(e, t, n, r) {
        return {
            require: ["?^ngScrollViewport"],
            transclude: "element",
            priority: 1e3,
            terminal: !0,
            compile: function(i, o, a) {
                return function(o, s, u, l) {
                    var c, f, p, d, h, m, g, v, $, y, b, w, x, C, k, S, E, T, D, A, O, M, j, N, P, L, I, q, V, F, H, R, _, U, B, z;
                    if (N = u.ngScroll.match(/^\s*(\w+)\s+in\s+(\w+)\s*$/), !N) throw new Error('Expected ngScroll in form of "item_ in _datasource_" but got "' + u.ngScroll + '"');
                    if (M = N[1], w = N[2], A = function(e) {
                            return angular.isObject(e) && e.get && angular.isFunction(e.get)
                        }, b = o[w], !A(b) && (b = t.get(w), !A(b))) throw new Error(w + " is not a valid datasource");
                    return v = Math.max(3, +u.bufferSize || 10), g = function() {
                        return z.height() * Math.max(.1, +u.padding || .1)
                    }, H = function(e) {
                        return e[0].scrollHeight || e[0].document.documentElement.scrollHeight
                    }, c = null, a(U = o.$new(), function(e) {
                        var t, n, r, o, a, s;
                        if (o = e[0].localName, "dl" === o) throw new Error("ng-scroll directive does not support <" + e[0].localName + "> as a repeating tag: " + e[0].outerHTML);
                        return "li" !== o && "tr" !== o && (o = "div"), s = l[0] || angular.element(window), s.css({
                            "overflow-y": "auto",
                            display: "block"
                        }), r = function(e) {
                            var t, n, r;
                            switch (e) {
                                case "tr":
                                    return r = angular.element("<table><tr><td><div></div></td></tr></table>"), t = r.find("div"), n = r.find("tr"), n.paddingHeight = function() {
                                        return t.height.apply(t, arguments)
                                    }, n;
                                default:
                                    return n = angular.element("<" + e + "></" + e + ">"), n.paddingHeight = n.height, n
                            }
                        }, n = function(e, t, n) {
                            return t[{
                                top: "before",
                                bottom: "after"
                            }[n]](e), {
                                paddingHeight: function() {
                                    return e.paddingHeight.apply(e, arguments)
                                },
                                insert: function(t) {
                                    return e[{
                                        top: "after",
                                        bottom: "before"
                                    }[n]](t)
                                }
                            }
                        }, a = n(r(o), i, "top"), t = n(r(o), i, "bottom"), U.$destroy(), c = {
                            viewport: s,
                            topPadding: a.paddingHeight,
                            bottomPadding: t.paddingHeight,
                            append: t.insert,
                            prepend: a.insert,
                            bottomDataPos: function() {
                                return H(s) - t.paddingHeight()
                            },
                            topDataPos: function() {
                                return a.paddingHeight()
                            }
                        }
                    }), z = c.viewport, T = 1, P = 1, m = [], L = [], C = !1, d = !1, j = b.loading || function() {}, O = !1, q = function(e, t) {
                        var n, r;
                        for (n = r = e; t >= e ? t > r : r > t; n = t >= e ? ++r : --r) m[n].scope.$destroy(), m[n].element.remove();
                        return m.splice(e, t - e)
                    }, I = function() {
                        return T = 1, P = 1, q(0, m.length), c.topPadding(0), c.bottomPadding(0), L = [], C = !1, d = !1, f(!1)
                    }, h = function() {
                        return z.scrollTop() + z.height()
                    }, B = function() {
                        return z.scrollTop()
                    }, R = function() {
                        return !C && c.bottomDataPos() < h() + g()
                    }, $ = function() {
                        var t, n, r, i, o, a;
                        for (t = 0, i = 0, n = o = a = m.length - 1;
                            (0 >= a ? 0 >= o : o >= 0) && (r = m[n].element.outerHeight(!0), c.bottomDataPos() - t - r > h() + g()); n = 0 >= a ? ++o : --o) t += r, i++, C = !1;
                        return i > 0 ? (c.bottomPadding(c.bottomPadding() + t), q(m.length - i, m.length), P -= i, e.log("clipped off bottom " + i + " bottom padding " + c.bottomPadding())) : void 0
                    }, _ = function() {
                        return !d && c.topDataPos() > B() - g()
                    }, y = function() {
                        var t, n, r, i, o, a;
                        for (i = 0, r = 0, o = 0, a = m.length; a > o && (t = m[o], n = t.element.outerHeight(!0), c.topDataPos() + i + n < B() - g()); o++) i += n, r++, d = !1;
                        return r > 0 ? (c.topPadding(c.topPadding() + i), q(0, r), T += r, e.log("clipped off top " + r + " top padding " + c.topPadding())) : void 0
                    }, x = function(e, t) {
                        return O || (O = !0, j(!0)), 1 === L.push(e) ? S(t) : void 0
                    }, D = function(e, t) {
                        var n, r, i;
                        return n = o.$new(), n[M] = t, r = e > T, n.$index = e, r && n.$index--, i = {
                            scope: n
                        }, a(n, function(t) {
                            return i.element = t, r ? e === P ? (c.append(t), m.push(i)) : (m[e - T].element.after(t), m.splice(e - T + 1, 0, i)) : (c.prepend(t), m.unshift(i))
                        }), {
                            appended: r,
                            wrapper: i
                        }
                    }, p = function(e, t) {
                        var n;
                        return e ? c.bottomPadding(Math.max(0, c.bottomPadding() - t.element.outerHeight(!0))) : (n = c.topPadding() - t.element.outerHeight(!0), n >= 0 ? c.topPadding(n) : z.scrollTop(z.scrollTop() + t.element.outerHeight(!0)))
                    }, f = function(t, n, i) {
                        var o;
                        return o = function() {
                            return e.log("top {actual=" + c.topDataPos() + " visible from=" + B() + " bottom {visible through=" + h() + " actual=" + c.bottomDataPos() + "}"), R() ? x(!0, t) : _() && x(!1, t), i ? i() : void 0
                        }, n ? r(function() {
                            var e, t, r;
                            for (t = 0, r = n.length; r > t; t++) e = n[t], p(e.appended, e.wrapper);
                            return o()
                        }) : o()
                    }, E = function(e, t) {
                        return f(e, t, function() {
                            return L.shift(), 0 === L.length ? (O = !1, j(!1)) : S(e)
                        })
                    }, S = function(t) {
                        var n;
                        return n = L[0], n ? m.length && !R() ? E(t) : b.get(P, v, function(n) {
                            var r, i, o, a;
                            if (i = [], 0 === n.length) C = !0, c.bottomPadding(0), e.log("appended: requested " + v + " records starting from " + P + " recieved: eof");
                            else {
                                for (y(), o = 0, a = n.length; a > o; o++) r = n[o], i.push(D(++P, r));
                                e.log("appended: requested " + v + " received " + n.length + " buffer size " + m.length + " first " + T + " next " + P)
                            }
                            return E(t, i)
                        }) : m.length && !_() ? E(t) : b.get(T - v, v, function(n) {
                            var r, i, o, a;
                            if (i = [], 0 === n.length) d = !0, c.topPadding(0), e.log("prepended: requested " + v + " records starting from " + (T - v) + " recieved: bof");
                            else {
                                for ($(), r = o = a = n.length - 1; 0 >= a ? 0 >= o : o >= 0; r = 0 >= a ? ++o : --o) i.unshift(D(--T, n[r]));
                                e.log("prepended: requested " + v + " received " + n.length + " buffer size " + m.length + " first " + T + " next " + P)
                            }
                            return E(t, i)
                        })
                    }, V = function() {
                        return n.$$phase || O ? void 0 : (f(!1), o.$apply())
                    }, z.bind("resize", V), F = function() {
                        return n.$$phase || O ? void 0 : (f(!0), o.$apply())
                    }, z.bind("scroll", F), o.$watch(b.revision, function() {
                        return I()
                    }), k = b.scope ? b.scope.$new() : o.$new(), o.$on("$destroy", function() {
                        return k.$destroy(), z.unbind("resize", V), z.unbind("scroll", F)
                    }), k.$on("update.items", function(e, t, n) {
                        var r, i, o, a, s;
                        if (angular.isFunction(t))
                            for (i = function(e) {
                                    return t(e.scope)
                                }, o = 0, a = m.length; a > o; o++) r = m[o], i(r);
                        else 0 <= (s = t - T - 1) && s < m.length && (m[t - T - 1].scope[M] = n);
                        return null
                    }), k.$on("delete.items", function(e, t) {
                        var n, r, i, o, a, s, u, l, c, p, d, h;
                        if (angular.isFunction(t)) {
                            for (i = [], s = 0, c = m.length; c > s; s++) r = m[s], i.unshift(r);
                            for (a = function(e) {
                                    return t(e.scope) ? (q(i.length - 1 - n, i.length - n), P--) : void 0
                                }, n = u = 0, p = i.length; p > u; n = ++u) o = i[n], a(o)
                        } else 0 <= (h = t - T - 1) && h < m.length && (q(t - T - 1, t - T), P--);
                        for (n = l = 0, d = m.length; d > l; n = ++l) r = m[n], r.scope.$index = T + n;
                        return f(!1)
                    }), k.$on("insert.item", function(e, t, n) {
                        var r, i, o, a, s, u, l, c, p, d, h, g;
                        if (i = [], angular.isFunction(t)) {
                            for (o = [], u = 0, p = m.length; p > u; u++) n = m[u], o.unshift(n);
                            for (s = function(e) {
                                    var o, a, s, u, l;
                                    if (a = t(e.scope)) {
                                        if (D = function(e, t) {
                                                return D(e, t), P++
                                            }, angular.isArray(a)) {
                                            for (l = [], o = s = 0, u = a.length; u > s; o = ++s) n = a[o], l.push(i.push(D(r + o, n)));
                                            return l
                                        }
                                        return i.push(D(r, a))
                                    }
                                }, r = l = 0, d = o.length; d > l; r = ++l) a = o[r], s(a)
                        } else 0 <= (g = t - T - 1) && g < m.length && (i.push(D(t, n)), P++);
                        for (r = c = 0, h = m.length; h > c; r = ++c) n = m[r], n.scope.$index = T + r;
                        return f(!1, i)
                    })
                }
            }
        }
    }]), angular.module("ui.scrollfix", []).directive("uiScrollfix", ["$window", function(e) {
        return {
            require: "^?uiScrollfixTarget",
            link: function(t, n, r, i) {
                function o() {
                    var t;
                    if (angular.isDefined(e.pageYOffset)) t = e.pageYOffset;
                    else {
                        var i = document.compatMode && "BackCompat" !== document.compatMode ? document.documentElement : document.body;
                        t = i.scrollTop
                    }!n.hasClass("ui-scrollfix") && t > r.uiScrollfix ? n.addClass("ui-scrollfix") : n.hasClass("ui-scrollfix") && t < r.uiScrollfix && n.removeClass("ui-scrollfix")
                }
                var a = n[0].offsetTop,
                    s = i && i.$element || angular.element(e);
                r.uiScrollfix ? "string" == typeof r.uiScrollfix && ("-" === r.uiScrollfix.charAt(0) ? r.uiScrollfix = a - parseFloat(r.uiScrollfix.substr(1)) : "+" === r.uiScrollfix.charAt(0) && (r.uiScrollfix = a + parseFloat(r.uiScrollfix.substr(1)))) : r.uiScrollfix = a,
                    s.on("scroll", o), t.$on("$destroy", function() {
                        s.off("scroll", o)
                    })
            }
        }
    }]).directive("uiScrollfixTarget", [function() {
        return {
            controller: ["$element", function(e) {
                this.$element = e
            }]
        }
    }]), angular.module("ui.showhide", []).directive("uiShow", [function() {
        return function(e, t, n) {
            e.$watch(n.uiShow, function(e) {
                e ? t.addClass("ui-show") : t.removeClass("ui-show")
            })
        }
    }]).directive("uiHide", [function() {
        return function(e, t, n) {
            e.$watch(n.uiHide, function(e) {
                e ? t.addClass("ui-hide") : t.removeClass("ui-hide")
            })
        }
    }]).directive("uiToggle", [function() {
        return function(e, t, n) {
            e.$watch(n.uiToggle, function(e) {
                e ? t.removeClass("ui-hide").addClass("ui-show") : t.removeClass("ui-show").addClass("ui-hide")
            })
        }
    }]), angular.module("ui.unique", []).filter("unique", ["$parse", function(e) {
        return function(t, n) {
            if (n === !1) return t;
            if ((n || angular.isUndefined(n)) && angular.isArray(t)) {
                var r = [],
                    i = angular.isString(n) ? e(n) : function(e) {
                        return e
                    },
                    o = function(e) {
                        return angular.isObject(e) ? i(e) : e
                    };
                angular.forEach(t, function(e) {
                    for (var t = !1, n = 0; n < r.length; n++)
                        if (angular.equals(o(r[n]), o(e))) {
                            t = !0;
                            break
                        }
                    t || r.push(e)
                }), t = r
            }
            return t
        }
    }]), angular.module("ui.validate", []).directive("uiValidate", function() {
        return {
            restrict: "A",
            require: "ngModel",
            link: function(e, t, n, r) {
                function i(t) {
                    return angular.isString(t) ? void e.$watch(t, function() {
                        angular.forEach(a, function(e) {
                            e(r.$modelValue)
                        })
                    }) : angular.isArray(t) ? void angular.forEach(t, function(t) {
                        e.$watch(t, function() {
                            angular.forEach(a, function(e) {
                                e(r.$modelValue)
                            })
                        })
                    }) : void(angular.isObject(t) && angular.forEach(t, function(t, n) {
                        angular.isString(t) && e.$watch(t, function() {
                            a[n](r.$modelValue)
                        }), angular.isArray(t) && angular.forEach(t, function(t) {
                            e.$watch(t, function() {
                                a[n](r.$modelValue)
                            })
                        })
                    }))
                }
                var o, a = {},
                    s = e.$eval(n.uiValidate);
                s && (angular.isString(s) && (s = {
                    validator: s
                }), angular.forEach(s, function(t, n) {
                    o = function(i) {
                        var o = e.$eval(t, {
                            $value: i
                        });
                        return angular.isObject(o) && angular.isFunction(o.then) ? (o.then(function() {
                            r.$setValidity(n, !0)
                        }, function() {
                            r.$setValidity(n, !1)
                        }), i) : o ? (r.$setValidity(n, !0), i) : (r.$setValidity(n, !1), i)
                    }, a[n] = o, r.$formatters.push(o), r.$parsers.push(o)
                }), n.uiValidateWatch && i(e.$eval(n.uiValidateWatch)))
            }
        }
    }), angular.module("ui.utils", ["ui.event", "ui.format", "ui.highlight", "ui.include", "ui.indeterminate", "ui.inflector", "ui.jq", "ui.keypress", "ui.mask", "ui.reset", "ui.route", "ui.scrollfix", "ui.scroll", "ui.scroll.jqlite", "ui.showhide", "ui.unique", "ui.validate"]), angular.module("pascalprecht.translate", ["ng"]).run(["$translate", function(e) {
        var t = e.storageKey(),
            n = e.storage();
        n ? n.get(t) ? e.use(n.get(t)) : angular.isString(e.preferredLanguage()) ? e.use(e.preferredLanguage()) : n.set(t, e.use()) : angular.isString(e.preferredLanguage()) && e.use(e.preferredLanguage())
    }]), angular.module("pascalprecht.translate").provider("$translate", ["$STORAGE_KEY", function(e) {
        var t, n, r, i, o, a, s, u, l, c, f, p, d, h, m, g = {},
            v = [],
            $ = e,
            y = [],
            b = !1,
            w = "translate-cloak",
            x = !1,
            C = ".",
            k = "2.4.2",
            S = function() {
                var e = window.navigator;
                return ((angular.isArray(e.languages) ? e.languages[0] : e.language || e.browserLanguage || e.systemLanguage || e.userLanguage) || "").split("-").join("_")
            },
            E = function(e, t) {
                for (var n = 0, r = e.length; r > n; n++)
                    if (e[n] === t) return n;
                return -1
            },
            T = function() {
                return this.replace(/^\s+|\s+$/g, "")
            },
            D = function(e) {
                for (var t = [], r = angular.lowercase(e), i = 0, o = v.length; o > i; i++) t.push(angular.lowercase(v[i]));
                if (E(t, r) > -1) return e;
                if (n) {
                    var a;
                    for (var s in n) {
                        var u = !1,
                            l = Object.prototype.hasOwnProperty.call(n, s) && angular.lowercase(s) === angular.lowercase(e);
                        if ("*" === s.slice(-1) && (u = s.slice(0, -1) === e.slice(0, s.length - 1)), (l || u) && (a = n[s], E(t, angular.lowercase(a)) > -1)) return a
                    }
                }
                var c = e.split("_");
                return c.length > 1 && E(t, angular.lowercase(c[0])) > -1 ? c[0] : e
            },
            A = function(e, t) {
                if (!e && !t) return g;
                if (e && !t) {
                    if (angular.isString(e)) return g[e]
                } else angular.isObject(g[e]) || (g[e] = {}), angular.extend(g[e], O(t));
                return this
            };
        this.translations = A, this.cloakClassName = function(e) {
            return e ? (w = e, this) : w
        };
        var O = function(e, t, n, r) {
            var i, o, a, s;
            t || (t = []), n || (n = {});
            for (i in e) Object.prototype.hasOwnProperty.call(e, i) && (s = e[i], angular.isObject(s) ? O(s, t.concat(i), n, i) : (o = t.length ? "" + t.join(C) + C + i : i, t.length && i === r && (a = "" + t.join(C), n[a] = "@:" + o), n[o] = s));
            return n
        };
        this.addInterpolation = function(e) {
            return y.push(e), this
        }, this.useMessageFormatInterpolation = function() {
            return this.useInterpolation("$translateMessageFormatInterpolation")
        }, this.useInterpolation = function(e) {
            return c = e, this
        }, this.useSanitizeValueStrategy = function(e) {
            return b = e, this
        }, this.preferredLanguage = function(e) {
            return M(e), this
        };
        var M = function(e) {
            return e && (t = e), t
        };
        this.translationNotFoundIndicator = function(e) {
            return this.translationNotFoundIndicatorLeft(e), this.translationNotFoundIndicatorRight(e), this
        }, this.translationNotFoundIndicatorLeft = function(e) {
            return e ? (d = e, this) : d
        }, this.translationNotFoundIndicatorRight = function(e) {
            return e ? (h = e, this) : h
        }, this.fallbackLanguage = function(e) {
            return j(e), this
        };
        var j = function(e) {
            return e ? (angular.isString(e) ? (i = !0, r = [e]) : angular.isArray(e) && (i = !1, r = e), angular.isString(t) && E(r, t) < 0 && r.push(t), this) : i ? r[0] : r
        };
        this.use = function(e) {
            if (e) {
                if (!g[e] && !f) throw new Error("$translateProvider couldn't find translationTable for langKey: '" + e + "'");
                return o = e, this
            }
            return o
        };
        var N = function(e) {
            return e ? void($ = e) : u ? u + $ : $
        };
        this.storageKey = N, this.useUrlLoader = function(e, t) {
            return this.useLoader("$translateUrlLoader", angular.extend({
                url: e
            }, t))
        }, this.useStaticFilesLoader = function(e) {
            return this.useLoader("$translateStaticFilesLoader", e)
        }, this.useLoader = function(e, t) {
            return f = e, p = t || {}, this
        }, this.useLocalStorage = function() {
            return this.useStorage("$translateLocalStorage")
        }, this.useCookieStorage = function() {
            return this.useStorage("$translateCookieStorage")
        }, this.useStorage = function(e) {
            return s = e, this
        }, this.storagePrefix = function(e) {
            return e ? (u = e, this) : e
        }, this.useMissingTranslationHandlerLog = function() {
            return this.useMissingTranslationHandler("$translateMissingTranslationHandlerLog")
        }, this.useMissingTranslationHandler = function(e) {
            return l = e, this
        }, this.usePostCompiling = function(e) {
            return x = !!e, this
        }, this.determinePreferredLanguage = function(e) {
            var n = e && angular.isFunction(e) ? e() : S();
            return t = v.length ? D(n) : n, this
        }, this.registerAvailableLanguageKeys = function(e, t) {
            return e ? (v = e, t && (n = t), this) : v
        }, this.useLoaderCache = function(e) {
            return e === !1 ? m = void 0 : e === !0 ? m = !0 : "undefined" == typeof e ? m = "$translationCache" : e && (m = e), this
        }, this.$get = ["$log", "$injector", "$rootScope", "$q", function(e, n, u, v) {
            var C, S, P, L = n.get(c || "$translateDefaultInterpolation"),
                I = !1,
                q = {},
                V = {},
                F = function(e, n, i) {
                    if (angular.isArray(e)) {
                        var a = function(e) {
                            for (var t = {}, r = [], o = function(e) {
                                    var r = v.defer(),
                                        o = function(n) {
                                            t[e] = n, r.resolve([e, n])
                                        };
                                    return F(e, n, i).then(o, o), r.promise
                                }, a = 0, s = e.length; s > a; a++) r.push(o(e[a]));
                            return v.all(r).then(function() {
                                return t
                            })
                        };
                        return a(e)
                    }
                    var u = v.defer();
                    e && (e = T.apply(e));
                    var l = function() {
                        var e = t ? V[t] : V[o];
                        if (S = 0, s && !e) {
                            var n = C.get($);
                            if (e = V[n], r && r.length) {
                                var i = E(r, n);
                                S = 0 === i ? 1 : 0, E(r, t) < 0 && r.push(t)
                            }
                        }
                        return e
                    }();
                    return l ? l.then(function() {
                        X(e, n, i).then(u.resolve, u.reject)
                    }, u.reject) : X(e, n, i).then(u.resolve, u.reject), u.promise
                },
                H = function(e) {
                    return d && (e = [d, e].join(" ")), h && (e = [e, h].join(" ")), e
                },
                R = function(e) {
                    o = e, u.$emit("$translateChangeSuccess", {
                        language: e
                    }), s && C.set(F.storageKey(), o), L.setLocale(o), angular.forEach(q, function(e, t) {
                        q[t].setLocale(o)
                    }), u.$emit("$translateChangeEnd", {
                        language: e
                    })
                },
                _ = function(e) {
                    if (!e) throw "No language key specified for loading.";
                    var t = v.defer();
                    u.$emit("$translateLoadingStart", {
                        language: e
                    }), I = !0;
                    var r = m;
                    "string" == typeof r && (r = n.get(r));
                    var i = angular.extend({}, p, {
                        key: e,
                        $http: angular.extend({}, {
                            cache: r
                        }, p.$http)
                    });
                    return n.get(f)(i).then(function(n) {
                        var r = {};
                        u.$emit("$translateLoadingSuccess", {
                            language: e
                        }), angular.isArray(n) ? angular.forEach(n, function(e) {
                            angular.extend(r, O(e))
                        }) : angular.extend(r, O(n)), I = !1, t.resolve({
                            key: e,
                            table: r
                        }), u.$emit("$translateLoadingEnd", {
                            language: e
                        })
                    }, function(e) {
                        u.$emit("$translateLoadingError", {
                            language: e
                        }), t.reject(e), u.$emit("$translateLoadingEnd", {
                            language: e
                        })
                    }), t.promise
                };
            if (s && (C = n.get(s), !C.get || !C.set)) throw new Error("Couldn't use storage '" + s + "', missing get() or set() method!");
            angular.isFunction(L.useSanitizeValueStrategy) && L.useSanitizeValueStrategy(b), y.length && angular.forEach(y, function(e) {
                var r = n.get(e);
                r.setLocale(t || o), angular.isFunction(r.useSanitizeValueStrategy) && r.useSanitizeValueStrategy(b), q[r.getInterpolationIdentifier()] = r
            });
            var U = function(e) {
                    var t = v.defer();
                    return Object.prototype.hasOwnProperty.call(g, e) ? t.resolve(g[e]) : V[e] ? V[e].then(function(e) {
                        A(e.key, e.table), t.resolve(e.table)
                    }, t.reject) : t.reject(), t.promise
                },
                B = function(e, t, n, r) {
                    var i = v.defer();
                    return U(e).then(function(a) {
                        Object.prototype.hasOwnProperty.call(a, t) ? (r.setLocale(e), i.resolve(r.interpolate(a[t], n)), r.setLocale(o)) : i.reject()
                    }, i.reject), i.promise
                },
                z = function(e, t, n, r) {
                    var i, a = g[e];
                    return Object.prototype.hasOwnProperty.call(a, t) && (r.setLocale(e), i = r.interpolate(a[t], n), r.setLocale(o)), i
                },
                W = function(e) {
                    if (l) {
                        var t = n.get(l)(e, o);
                        return void 0 !== t ? t : e
                    }
                    return e
                },
                Y = function(e, t, n, i) {
                    var o = v.defer();
                    if (e < r.length) {
                        var a = r[e];
                        B(a, t, n, i).then(o.resolve, function() {
                            Y(e + 1, t, n, i).then(o.resolve)
                        })
                    } else o.resolve(W(t));
                    return o.promise
                },
                G = function(e, t, n, i) {
                    var o;
                    if (e < r.length) {
                        var a = r[e];
                        o = z(a, t, n, i), o || (o = G(e + 1, t, n, i))
                    }
                    return o
                },
                K = function(e, t, n) {
                    return Y(P > 0 ? P : S, e, t, n)
                },
                J = function(e, t, n) {
                    return G(P > 0 ? P : S, e, t, n)
                },
                X = function(e, t, n) {
                    var i = v.defer(),
                        a = o ? g[o] : g,
                        s = n ? q[n] : L;
                    if (a && Object.prototype.hasOwnProperty.call(a, e)) {
                        var u = a[e];
                        "@:" === u.substr(0, 2) ? F(u.substr(2), t, n).then(i.resolve, i.reject) : i.resolve(s.interpolate(u, t))
                    } else {
                        var c;
                        l && !I && (c = W(e)), o && r && r.length ? K(e, t, s).then(function(e) {
                            i.resolve(e)
                        }, function(e) {
                            i.reject(H(e))
                        }) : l && !I && c ? i.resolve(c) : i.reject(H(e))
                    }
                    return i.promise
                },
                Z = function(e, t, n) {
                    var i, a = o ? g[o] : g,
                        s = n ? q[n] : L;
                    if (a && Object.prototype.hasOwnProperty.call(a, e)) {
                        var u = a[e];
                        i = "@:" === u.substr(0, 2) ? Z(u.substr(2), t, n) : s.interpolate(u, t)
                    } else {
                        var c;
                        l && !I && (c = W(e)), o && r && r.length ? (S = 0, i = J(e, t, s)) : i = l && !I && c ? c : H(e)
                    }
                    return i
                };
            if (F.preferredLanguage = function(e) {
                    return e && M(e), t
                }, F.cloakClassName = function() {
                    return w
                }, F.fallbackLanguage = function(e) {
                    if (void 0 !== e && null !== e) {
                        if (j(e), f && r && r.length)
                            for (var t = 0, n = r.length; n > t; t++) V[r[t]] || (V[r[t]] = _(r[t]));
                        F.use(F.use())
                    }
                    return i ? r[0] : r
                }, F.useFallbackLanguage = function(e) {
                    if (void 0 !== e && null !== e)
                        if (e) {
                            var t = E(r, e);
                            t > -1 && (P = t)
                        } else P = 0
                }, F.proposedLanguage = function() {
                    return a
                }, F.storage = function() {
                    return C
                }, F.use = function(e) {
                    if (!e) return o;
                    var t = v.defer();
                    u.$emit("$translateChangeStart", {
                        language: e
                    });
                    var n = D(e);
                    return n && (e = n), g[e] || !f || V[e] ? (t.resolve(e), R(e)) : (a = e, V[e] = _(e).then(function(n) {
                        A(n.key, n.table), t.resolve(n.key), R(n.key), a === e && (a = void 0)
                    }, function(e) {
                        a === e && (a = void 0), u.$emit("$translateChangeError", {
                            language: e
                        }), t.reject(e), u.$emit("$translateChangeEnd", {
                            language: e
                        })
                    })), t.promise
                }, F.storageKey = function() {
                    return N()
                }, F.isPostCompilingEnabled = function() {
                    return x
                }, F.refresh = function(e) {
                    function t() {
                        i.resolve(), u.$emit("$translateRefreshEnd", {
                            language: e
                        })
                    }

                    function n() {
                        i.reject(), u.$emit("$translateRefreshEnd", {
                            language: e
                        })
                    }
                    if (!f) throw new Error("Couldn't refresh translation table, no loader registered!");
                    var i = v.defer();
                    if (u.$emit("$translateRefreshStart", {
                            language: e
                        }), e) g[e] ? _(e).then(function(n) {
                        A(n.key, n.table), e === o && R(o), t()
                    }, n) : n();
                    else {
                        var a = [],
                            s = {};
                        if (r && r.length)
                            for (var l = 0, c = r.length; c > l; l++) a.push(_(r[l])), s[r[l]] = !0;
                        o && !s[o] && a.push(_(o)), v.all(a).then(function(e) {
                            angular.forEach(e, function(e) {
                                g[e.key] && delete g[e.key], A(e.key, e.table)
                            }), o && R(o), t()
                        })
                    }
                    return i.promise
                }, F.instant = function(e, n, i) {
                    if (null === e || angular.isUndefined(e)) return e;
                    if (angular.isArray(e)) {
                        for (var a = {}, s = 0, u = e.length; u > s; s++) a[e[s]] = F.instant(e[s], n, i);
                        return a
                    }
                    if (angular.isString(e) && e.length < 1) return e;
                    e && (e = T.apply(e));
                    var c, f = [];
                    t && f.push(t), o && f.push(o), r && r.length && (f = f.concat(r));
                    for (var p = 0, d = f.length; d > p; p++) {
                        var h = f[p];
                        if (g[h] && "undefined" != typeof g[h][e] && (c = Z(e, n, i)), "undefined" != typeof c) break
                    }
                    return c || "" === c || (c = L.interpolate(e, n), l && !I && (c = W(e))), c
                }, F.versionInfo = function() {
                    return k
                }, F.loaderCache = function() {
                    return m
                }, f && (angular.equals(g, {}) && F.use(F.use()), r && r.length))
                for (var Q = function(e) {
                        A(e.key, e.table), u.$emit("$translateChangeEnd", {
                            language: e.key
                        })
                    }, ee = 0, te = r.length; te > ee; ee++) V[r[ee]] = _(r[ee]).then(Q);
            return F
        }]
    }]), angular.module("pascalprecht.translate").factory("$translateDefaultInterpolation", ["$interpolate", function(e) {
        var t, n = {},
            r = "default",
            i = null,
            o = {
                escaped: function(e) {
                    var t = {};
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = angular.element("<div></div>").text(e[n]).html());
                    return t
                }
            },
            a = function(e) {
                var t;
                return t = angular.isFunction(o[i]) ? o[i](e) : e
            };
        return n.setLocale = function(e) {
            t = e
        }, n.getInterpolationIdentifier = function() {
            return r
        }, n.useSanitizeValueStrategy = function(e) {
            return i = e, this
        }, n.interpolate = function(t, n) {
            return i && (n = a(n)), e(t)(n || {})
        }, n
    }]), angular.module("pascalprecht.translate").constant("$STORAGE_KEY", "NG_TRANSLATE_LANG_KEY"), angular.module("pascalprecht.translate").directive("translate", ["$translate", "$q", "$interpolate", "$compile", "$parse", "$rootScope", function(e, t, n, r, i, o) {
        return {
            restrict: "AE",
            scope: !0,
            compile: function(t, a) {
                var s = a.translateValues ? a.translateValues : void 0,
                    u = a.translateInterpolation ? a.translateInterpolation : void 0,
                    l = t[0].outerHTML.match(/translate-value-+/i),
                    c = "^(.*)(" + n.startSymbol() + ".*" + n.endSymbol() + ")(.*)";
                return function(t, f, p) {
                    if (t.interpolateParams = {}, t.preText = "", t.postText = "", p.$observe("translate", function(e) {
                            if (angular.equals(e, "") || !angular.isDefined(e)) {
                                var r = f.text().match(c);
                                angular.isArray(r) ? (t.preText = r[1], t.postText = r[3], t.translationId = n(r[2])(t.$parent)) : t.translationId = f.text().replace(/^\s+|\s+$/g, "")
                            } else t.translationId = e
                        }), p.$observe("translateDefault", function(e) {
                            t.defaultText = e
                        }), s && p.$observe("translateValues", function(e) {
                            e && t.$parent.$watch(function() {
                                angular.extend(t.interpolateParams, i(e)(t.$parent))
                            })
                        }), l) {
                        var d = function(e) {
                            p.$observe(e, function(n) {
                                t.interpolateParams[angular.lowercase(e.substr(14, 1)) + e.substr(15)] = n
                            })
                        };
                        for (var h in p) Object.prototype.hasOwnProperty.call(p, h) && "translateValue" === h.substr(0, 14) && "translateValues" !== h && d(h)
                    }
                    var m = function(t, n, i) {
                            i || "undefined" == typeof n.defaultText || (t = n.defaultText), f.html(n.preText + t + n.postText);
                            var o = e.isPostCompilingEnabled(),
                                s = "undefined" != typeof a.translateCompile,
                                u = s && "false" !== a.translateCompile;
                            (o && !s || u) && r(f.contents())(n)
                        },
                        g = function() {
                            return s || l ? function() {
                                var n = function() {
                                    t.translationId && t.interpolateParams && e(t.translationId, t.interpolateParams, u).then(function(e) {
                                        m(e, t, !0)
                                    }, function(e) {
                                        m(e, t, !1)
                                    })
                                };
                                t.$watch("interpolateParams", n, !0), t.$watch("translationId", n)
                            } : function() {
                                var n = t.$watch("translationId", function(r) {
                                    t.translationId && r && e(r, {}, u).then(function(e) {
                                        m(e, t, !0), n()
                                    }, function(e) {
                                        m(e, t, !1), n()
                                    })
                                }, !0)
                            }
                        }(),
                        v = o.$on("$translateChangeSuccess", g);
                    g(), t.$on("$destroy", v)
                }
            }
        }
    }]), angular.module("pascalprecht.translate").directive("translateCloak", ["$rootScope", "$translate", function(e, t) {
        return {
            compile: function(n) {
                var r = function() {
                        n.addClass(t.cloakClassName())
                    },
                    i = function() {
                        n.removeClass(t.cloakClassName())
                    },
                    o = e.$on("$translateChangeEnd", function() {
                        i(), o(), o = null
                    });
                return r(),
                    function(e, n, o) {
                        o.translateCloak && o.translateCloak.length && o.$observe("translateCloak", function(e) {
                            t(e).then(i, r)
                        })
                    }
            }
        }
    }]), angular.module("pascalprecht.translate").filter("translate", ["$parse", "$translate", function(e, t) {
        var n = function(n, r, i) {
            return angular.isObject(r) || (r = e(r)(this)), t.instant(n, r, i)
        };
        return n.$stateful = !0, n
    }]), angular.module("pascalprecht.translate").factory("$translateUrlLoader", ["$q", "$http", function(e, t) {
        return function(n) {
            if (!n || !n.url) throw new Error("Couldn't use urlLoader since no url is given!");
            var r = e.defer();
            return t(angular.extend({
                url: n.url,
                params: {
                    lang: n.key
                },
                method: "GET"
            }, n.$http)).success(function(e) {
                r.resolve(e)
            }).error(function(e) {
                r.reject(n.key)
            }), r.promise
        }
    }]), angular.module("pascalprecht.translate").factory("$translateStaticFilesLoader", ["$q", "$http", function(e, t) {
        return function(n) {
            if (!n || !angular.isString(n.prefix) || !angular.isString(n.suffix)) throw new Error("Couldn't load static files, no prefix or suffix specified!");
            var r = e.defer();
            return t(angular.extend({
                url: [n.prefix, n.key, n.suffix].join(""),
                method: "GET",
                params: ""
            }, n.$http)).success(function(e) {
                r.resolve(e)
            }).error(function(e) {
                r.reject(n.key)
            }), r.promise
        }
    }]), angular.module("pascalprecht.translate").factory("$translateLocalStorage", ["$window", "$translateCookieStorage", function(e, t) {
        var n = function() {
                var t;
                return {
                    get: function(n) {
                        return t || (t = e.localStorage.getItem(n)), t
                    },
                    set: function(n, r) {
                        t = r, e.localStorage.setItem(n, r)
                    }
                }
            }(),
            r = "localStorage" in e;
        if (r) {
            var i = "pascalprecht.translate.storageTest";
            try {
                null !== e.localStorage ? (e.localStorage.setItem(i, "foo"), e.localStorage.removeItem(i), r = !0) : r = !1
            } catch (o) {
                r = !1
            }
        }
        var a = r ? n : t;
        return a
    }]), angular.module("pascalprecht.translate").factory("$translateCookieStorage", ["$cookieStore", function(e) {
        var t = {
            get: function(t) {
                return e.get(t)
            },
            set: function(t, n) {
                e.put(t, n)
            }
        };
        return t
    }]),
    function(e, t) {
        "use strict";
        var n = ["ng", "oc.lazyLoad"],
            r = {},
            i = [],
            o = [],
            a = [],
            s = [],
            u = e.noop,
            l = {},
            c = [],
            f = e.module("oc.lazyLoad", ["ng"]);
        f.provider("$ocLazyLoad", ["$controllerProvider", "$provide", "$compileProvider", "$filterProvider", "$injector", "$animateProvider", function(f, p, m, g, v, $) {
            function y(t, r, i) {
                if (r) {
                    var o, s, f, p = [];
                    for (o = r.length - 1; o >= 0; o--)
                        if (s = r[o], e.isString(s) || (s = x(s)), s && -1 === c.indexOf(s) && (!k[s] || -1 !== a.indexOf(s))) {
                            var d = -1 === n.indexOf(s);
                            if (f = h(s), d && (n.push(s), y(t, f.requires, i)), f._runBlocks.length > 0)
                                for (l[s] = []; f._runBlocks.length > 0;) l[s].push(f._runBlocks.shift());
                            e.isDefined(l[s]) && (d || i.rerun) && (p = p.concat(l[s])), w(t, f._invokeQueue, s, i.reconfig), w(t, f._configBlocks, s, i.reconfig), u(d ? "ocLazyLoad.moduleLoaded" : "ocLazyLoad.moduleReloaded", s), r.pop(), c.push(s)
                        }
                    var m = t.getInstanceInjector();
                    e.forEach(p, function(e) {
                        m.invoke(e)
                    })
                }
            }

            function b(t, n) {
                function i(t) {
                    return e.isArray(t) ? O(t.toString()) : e.isObject(t) ? O(A(t)) : e.isDefined(t) && null !== t ? O(t.toString()) : t
                }
                var o = t[2][0],
                    a = t[1],
                    s = !1;
                e.isUndefined(r[n]) && (r[n] = {}), e.isUndefined(r[n][a]) && (r[n][a] = {});
                var l = function(e, t) {
                    r[n][a].hasOwnProperty(e) || (r[n][a][e] = []), -1 === r[n][a][e].indexOf(t) && (s = !0, r[n][a][e].push(t), u("ocLazyLoad.componentLoaded", [n, a, e]))
                };
                if (e.isString(o)) l(o, i(t[2][1]));
                else {
                    if (!e.isObject(o)) return !1;
                    e.forEach(o, function(t, n) {
                        e.isString(t) ? l(t, i(o[1])) : l(n, i(t))
                    })
                }
                return s
            }

            function w(t, n, r, o) {
                if (n) {
                    var a, s, u, l;
                    for (a = 0, s = n.length; s > a; a++)
                        if (u = n[a], e.isArray(u)) {
                            if (null !== t) {
                                if (!t.hasOwnProperty(u[0])) throw new Error("unsupported provider " + u[0]);
                                l = t[u[0]]
                            }
                            var c = b(u, r);
                            if ("invoke" !== u[1]) c && e.isDefined(l) && l[u[1]].apply(l, u[2]);
                            else {
                                var f = function(t) {
                                    var n = i.indexOf(r + "-" + t);
                                    (-1 === n || o) && (-1 === n && i.push(r + "-" + t), e.isDefined(l) && l[u[1]].apply(l, u[2]))
                                };
                                if (e.isFunction(u[2][0])) f(u[2][0]);
                                else if (e.isArray(u[2][0]))
                                    for (var p = 0, d = u[2][0].length; d > p; p++) e.isFunction(u[2][0][p]) && f(u[2][0][p])
                            }
                        }
                }
            }

            function x(t) {
                var n = null;
                return e.isString(t) ? n = t : e.isObject(t) && t.hasOwnProperty("name") && e.isString(t.name) && (n = t.name), n
            }

            function C(t) {
                if (!e.isString(t)) return !1;
                try {
                    return h(t)
                } catch (n) {
                    if (/No module/.test(n) || n.message.indexOf("$injector:nomod") > -1) return !1
                }
            }
            var k = {},
                S = {
                    $controllerProvider: f,
                    $compileProvider: m,
                    $filterProvider: g,
                    $provide: p,
                    $injector: v,
                    $animateProvider: $
                },
                E = !1,
                T = !1,
                D = [];
            D.push = function(e) {
                -1 === this.indexOf(e) && Array.prototype.push.apply(this, arguments)
            }, this.config = function(t) {
                e.isDefined(t.modules) && (e.isArray(t.modules) ? e.forEach(t.modules, function(e) {
                    k[e.name] = e
                }) : k[t.modules.name] = t.modules), e.isDefined(t.debug) && (E = t.debug), e.isDefined(t.events) && (T = t.events)
            }, this._init = function(r) {
                if (0 === o.length) {
                    var i = [r],
                        a = ["ng:app", "ng-app", "x-ng-app", "data-ng-app"],
                        u = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/,
                        l = function(e) {
                            return e && i.push(e)
                        };
                    e.forEach(a, function(t) {
                        a[t] = !0, l(document.getElementById(t)), t = t.replace(":", "\\:"), "undefined" != typeof r[0] && r[0].querySelectorAll && (e.forEach(r[0].querySelectorAll("." + t), l), e.forEach(r[0].querySelectorAll("." + t + "\\:"), l), e.forEach(r[0].querySelectorAll("[" + t + "]"), l))
                    }), e.forEach(i, function(t) {
                        if (0 === o.length) {
                            var n = " " + r.className + " ",
                                i = u.exec(n);
                            i ? o.push((i[2] || "").replace(/\s+/g, ",")) : e.forEach(t.attributes, function(e) {
                                0 === o.length && a[e.name] && o.push(e.value)
                            })
                        }
                    })
                }
                0 !== o.length || (t.jasmine || t.mocha) && e.isDefined(e.mock) || console.error("No module found during bootstrap, unable to init ocLazyLoad. You should always use the ng-app directive or angular.boostrap when you use ocLazyLoad.");
                var c = function f(t) {
                    if (-1 === n.indexOf(t)) {
                        n.push(t);
                        var r = e.module(t);
                        w(null, r._invokeQueue, t), w(null, r._configBlocks, t), e.forEach(r.requires, f)
                    }
                };
                e.forEach(o, function(e) {
                    c(e)
                }), o = [], s.pop()
            };
            var A = function(t) {
                    var n = [];
                    return JSON.stringify(t, function(t, r) {
                        if (e.isObject(r) && null !== r) {
                            if (-1 !== n.indexOf(r)) return;
                            n.push(r)
                        }
                        return r
                    })
                },
                O = function(e) {
                    var t, n, r, i = 0;
                    if (0 == e.length) return i;
                    for (t = 0, r = e.length; r > t; t++) n = e.charCodeAt(t), i = (i << 5) - i + n, i |= 0;
                    return i
                };
            this.$get = ["$log", "$rootElement", "$rootScope", "$cacheFactory", "$q", function(t, r, i, a, l) {
                function f(e) {
                    var n = l.defer();
                    return t.error(e.message), n.reject(e), n.promise
                }
                var p, m = a("ocLazyLoad");
                return E || (t = {}, t.error = e.noop, t.warn = e.noop, t.info = e.noop), S.getInstanceInjector = function() {
                    return p ? p : p = r.data("$injector") || e.injector()
                }, u = function(e, n) {
                    T && i.$broadcast(e, n), E && t.info(e, n)
                }, {
                    _broadcast: u,
                    _$log: t,
                    _getFilesCache: function() {
                        return m
                    },
                    toggleWatch: function(e) {
                        e ? s.push(!0) : s.pop()
                    },
                    getModuleConfig: function(t) {
                        if (!e.isString(t)) throw new Error("You need to give the name of the module to get");
                        return k[t] ? e.copy(k[t]) : null
                    },
                    setModuleConfig: function(t) {
                        if (!e.isObject(t)) throw new Error("You need to give the module config object to set");
                        return k[t.name] = t, t
                    },
                    getModules: function() {
                        return n
                    },
                    isLoaded: function(t) {
                        var r = function(e) {
                            var t = n.indexOf(e) > -1;
                            return t || (t = !!C(e)), t
                        };
                        if (e.isString(t) && (t = [t]), e.isArray(t)) {
                            var i, o;
                            for (i = 0, o = t.length; o > i; i++)
                                if (!r(t[i])) return !1;
                            return !0
                        }
                        throw new Error("You need to define the module(s) name(s)")
                    },
                    _getModuleName: x,
                    _getModule: function(e) {
                        try {
                            return h(e)
                        } catch (t) {
                            throw (/No module/.test(t) || t.message.indexOf("$injector:nomod") > -1) && (t.message = 'The module "' + A(e) + '" that you are trying to load does not exist. ' + t.message), t
                        }
                    },
                    moduleExists: C,
                    _loadDependencies: function(t, n) {
                        var r, i, o, a = [],
                            s = this;
                        if (t = s._getModuleName(t), null === t) return l.when();
                        try {
                            r = s._getModule(t)
                        } catch (u) {
                            return f(u)
                        }
                        return i = s.getRequires(r), e.forEach(i, function(r) {
                            if (e.isString(r)) {
                                var i = s.getModuleConfig(r);
                                if (null === i) return void D.push(r);
                                r = i, i.name = void 0
                            }
                            if (s.moduleExists(r.name)) return o = r.files.filter(function(e) {
                                return s.getModuleConfig(r.name).files.indexOf(e) < 0
                            }), 0 !== o.length && s._$log.warn('Module "', t, '" attempted to redefine configuration for dependency. "', r.name, '"\n Additional Files Loaded:', o), e.isDefined(s.filesLoader) ? void a.push(s.filesLoader(r, n).then(function() {
                                return s._loadDependencies(r)
                            })) : f(new Error("Error: New dependencies need to be loaded from external files (" + r.files + "), but no loader has been defined."));
                            if (e.isArray(r)) {
                                var u = [];
                                e.forEach(r, function(e) {
                                    var t = s.getModuleConfig(e);
                                    null === t ? u.push(e) : t.files && (u = u.concat(t.files))
                                }), u.length > 0 && (r = {
                                    files: u
                                })
                            } else e.isObject(r) && r.hasOwnProperty("name") && r.name && (s.setModuleConfig(r), D.push(r.name));
                            if (e.isDefined(r.files) && 0 !== r.files.length) {
                                if (!e.isDefined(s.filesLoader)) return f(new Error('Error: the module "' + r.name + '" is defined in external files (' + r.files + "), but no loader has been defined."));
                                a.push(s.filesLoader(r, n).then(function() {
                                    return s._loadDependencies(r)
                                }))
                            }
                        }), l.all(a)
                    },
                    inject: function(t) {
                        var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                            r = this,
                            i = l.defer();
                        if (e.isDefined(t) && null !== t) {
                            if (e.isArray(t)) {
                                var a = [];
                                return e.forEach(t, function(e) {
                                    a.push(r.inject(e))
                                }), l.all(a)
                            }
                            r._addToLoadList(r._getModuleName(t), !0)
                        }
                        if (o.length > 0) {
                            var s = o.slice(),
                                u = function f(e) {
                                    D.push(e), r._loadDependencies(e, n).then(function() {
                                        try {
                                            c = [], y(S, D, n)
                                        } catch (e) {
                                            return r._$log.error(e.message), void i.reject(e)
                                        }
                                        o.length > 0 ? f(o.shift()) : i.resolve(s)
                                    }, function(e) {
                                        i.reject(e)
                                    })
                                };
                            u(o.shift())
                        } else i.resolve();
                        return i.promise
                    },
                    getRequires: function(t) {
                        var r = [];
                        return e.forEach(t.requires, function(e) {
                            -1 === n.indexOf(e) && r.push(e)
                        }), r
                    },
                    _invokeQueue: w,
                    _registerInvokeList: b,
                    _register: y,
                    _addToLoadList: d
                }
            }], this._init(e.element(t.document))
        }]);
        var p = e.bootstrap;
        e.bootstrap = function(t, n, r) {
            return e.forEach(n.slice(), function(e) {
                d(e, !0, !0)
            }), p(t, n, r)
        };
        var d = function(t, n, r) {
                (s.length > 0 || n) && e.isString(t) && -1 === o.indexOf(t) && (o.push(t), r && a.push(t))
            },
            h = e.module;
        e.module = function(e, t, n) {
            return d(e, !1, !0), h(e, t, n)
        }, "undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "oc.lazyLoad")
    }(angular, window),
    function(e) {
        "use strict";
        e.module("oc.lazyLoad").directive("ocLazyLoad", ["$ocLazyLoad", "$compile", "$animate", "$parse", function(t, n, r, i) {
            return {
                restrict: "A",
                terminal: !0,
                priority: 1e3,
                compile: function(o, a) {
                    var s = o[0].innerHTML;
                    return o.html(""),
                        function(a, u, l) {
                            var c = i(l.ocLazyLoad);
                            a.$watch(function() {
                                return c(a) || l.ocLazyLoad
                            }, function(i) {
                                e.isDefined(i) && t.load(i).then(function() {
                                    r.enter(s, u);
                                    var t = o.contents();
                                    e.forEach(t, function(e) {
                                        3 !== e.nodeType && n(e)(a)
                                    })
                                })
                            }, !0)
                        }
                }
            }
        }])
    }(angular),
    function(e) {
        "use strict";
        e.module("oc.lazyLoad").config(["$provide", function(t) {
            t.decorator("$ocLazyLoad", ["$delegate", "$q", "$window", "$interval", function(t, n, r, i) {
                var o = !1,
                    a = !1,
                    s = r.document.getElementsByTagName("head")[0] || r.document.getElementsByTagName("body")[0];
                return t.buildElement = function(u, l, c) {
                    var f, p, d = n.defer(),
                        h = t._getFilesCache(),
                        m = function(e) {
                            var t = (new Date).getTime();
                            return e.indexOf("?") >= 0 ? "&" === e.substring(0, e.length - 1) ? e + "_dc=" + t : e + "&_dc=" + t : e + "?_dc=" + t
                        };
                    switch (e.isUndefined(h.get(l)) && h.put(l, d.promise), u) {
                        case "css":
                            f = r.document.createElement("link"), f.type = "text/css", f.rel = "stylesheet", f.href = c.cache === !1 ? m(l) : l;
                            break;
                        case "js":
                            f = r.document.createElement("script"), f.src = c.cache === !1 ? m(l) : l;
                            break;
                        default:
                            h.remove(l), d.reject(new Error('Requested type "' + u + '" is not known. Could not inject "' + l + '"'))
                    }
                    f.onload = f.onreadystatechange = function(e) {
                        f.readyState && !/^c|loade/.test(f.readyState) || p || (f.onload = f.onreadystatechange = null, p = 1, t._broadcast("ocLazyLoad.fileLoaded", l), d.resolve())
                    }, f.onerror = function() {
                        h.remove(l), d.reject(new Error("Unable to load " + l))
                    }, f.async = c.serie ? 0 : 1;
                    var g = s.lastChild;
                    if (c.insertBefore) {
                        var v = e.element(e.isDefined(window.jQuery) ? c.insertBefore : document.querySelector(c.insertBefore));
                        v && v.length > 0 && (g = v[0])
                    }
                    if (g.parentNode.insertBefore(f, g), "css" == u) {
                        if (!o) {
                            var $ = r.navigator.userAgent.toLowerCase();
                            if (/iP(hone|od|ad)/.test(r.navigator.platform)) {
                                var y = r.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                                    b = parseFloat([parseInt(y[1], 10), parseInt(y[2], 10), parseInt(y[3] || 0, 10)].join("."));
                                a = 6 > b
                            } else if ($.indexOf("android") > -1) {
                                var w = parseFloat($.slice($.indexOf("android") + 8));
                                a = 4.4 > w
                            } else if ($.indexOf("safari") > -1) {
                                var x = $.match(/version\/([\.\d]+)/i);
                                a = x && x[1] && parseFloat(x[1]) < 6
                            }
                        }
                        if (a) var C = 1e3,
                            k = i(function() {
                                try {
                                    f.sheet.cssRules, i.cancel(k), f.onload()
                                } catch (e) {
                                    --C <= 0 && f.onerror()
                                }
                            }, 20)
                    }
                    return d.promise
                }, t
            }])
        }])
    }(angular),
    function(e) {
        "use strict";
        e.module("oc.lazyLoad").config(["$provide", function(t) {
            t.decorator("$ocLazyLoad", ["$delegate", "$q", function(t, n) {
                return t.filesLoader = function(r) {
                    var i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                        o = [],
                        a = [],
                        s = [],
                        u = [],
                        l = null,
                        c = t._getFilesCache();
                    t.toggleWatch(!0), e.extend(i, r);
                    var f = function(n) {
                        var r, f = null;
                        if (e.isObject(n) && (f = n.type, n = n.path), l = c.get(n), e.isUndefined(l) || i.cache === !1) {
                            if (null !== (r = /^(css|less|html|htm|js)?(?=!)/.exec(n)) && (f = r[1], n = n.substr(r[1].length + 1, n.length)), !f)
                                if (null !== (r = /[.](css|less|html|htm|js)?((\?|#).*)?$/.exec(n))) f = r[1];
                                else {
                                    if (t.jsLoader.hasOwnProperty("ocLazyLoadLoader") || !t.jsLoader.hasOwnProperty("load")) return void t._$log.error("File type could not be determined. " + n);
                                    f = "js"
                                }
                                "css" !== f && "less" !== f || -1 !== o.indexOf(n) ? "html" !== f && "htm" !== f || -1 !== a.indexOf(n) ? "js" === f || -1 === s.indexOf(n) ? s.push(n) : t._$log.error("File type is not valid. " + n) : a.push(n) : o.push(n)
                        } else l && u.push(l)
                    };
                    if (i.serie ? f(i.files.shift()) : e.forEach(i.files, function(e) {
                            f(e)
                        }), o.length > 0) {
                        var p = n.defer();
                        t.cssLoader(o, function(n) {
                            e.isDefined(n) && t.cssLoader.hasOwnProperty("ocLazyLoadLoader") ? (t._$log.error(n), p.reject(n)) : p.resolve()
                        }, i), u.push(p.promise)
                    }
                    if (a.length > 0) {
                        var d = n.defer();
                        t.templatesLoader(a, function(n) {
                            e.isDefined(n) && t.templatesLoader.hasOwnProperty("ocLazyLoadLoader") ? (t._$log.error(n), d.reject(n)) : d.resolve()
                        }, i), u.push(d.promise)
                    }
                    if (s.length > 0) {
                        var h = n.defer();
                        t.jsLoader(s, function(n) {
                            e.isDefined(n) && t.jsLoader.hasOwnProperty("ocLazyLoadLoader") ? (t._$log.error(n), h.reject(n)) : h.resolve()
                        }, i), u.push(h.promise)
                    }
                    if (0 === u.length) {
                        var m = n.defer(),
                            g = "Error: no file to load has been found, if you're trying to load an existing module you should use the 'inject' method instead of 'load'.";
                        return t._$log.error(g), m.reject(g), m.promise
                    }
                    return i.serie && i.files.length > 0 ? n.all(u).then(function() {
                        return t.filesLoader(r, i)
                    }) : n.all(u)["finally"](function(e) {
                        return t.toggleWatch(!1), e
                    })
                }, t.load = function(r) {
                    var i, o = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                        a = this,
                        s = null,
                        u = [],
                        l = n.defer(),
                        c = e.copy(r),
                        f = e.copy(o);
                    if (e.isArray(c)) return e.forEach(c, function(e) {
                        u.push(a.load(e, f))
                    }), n.all(u).then(function(e) {
                        l.resolve(e)
                    }, function(e) {
                        l.reject(e)
                    }), l.promise;
                    if (e.isString(c) ? (s = a.getModuleConfig(c), s || (s = {
                            files: [c]
                        })) : e.isObject(c) && (s = e.isDefined(c.path) && e.isDefined(c.type) ? {
                            files: [c]
                        } : a.setModuleConfig(c)), null === s) {
                        var p = a._getModuleName(c);
                        return i = 'Module "' + (p || "unknown") + '" is not configured, cannot load.', t._$log.error(i), l.reject(new Error(i)), l.promise
                    }
                    e.isDefined(s.template) && (e.isUndefined(s.files) && (s.files = []), e.isString(s.template) ? s.files.push(s.template) : e.isArray(s.template) && s.files.concat(s.template));
                    var d = e.extend({}, f, s);
                    return e.isUndefined(s.files) && e.isDefined(s.name) && t.moduleExists(s.name) ? t.inject(s.name, d) : (t.filesLoader(s, d).then(function() {
                        t.inject(null, d).then(function(e) {
                            l.resolve(e)
                        }, function(e) {
                            l.reject(e)
                        })
                    }, function(e) {
                        l.reject(e)
                    }), l.promise)
                }, t
            }])
        }])
    }(angular),
    function(e) {
        "use strict";
        e.module("oc.lazyLoad").config(["$provide", function(t) {
            t.decorator("$ocLazyLoad", ["$delegate", "$q", function(t, n) {
                return t.cssLoader = function(r, i, o) {
                    var a = [];
                    e.forEach(r, function(e) {
                        a.push(t.buildElement("css", e, o))
                    }), n.all(a).then(function() {
                        i()
                    }, function(e) {
                        i(e)
                    })
                }, t.cssLoader.ocLazyLoadLoader = !0, t
            }])
        }])
    }(angular),
    function(e) {
        "use strict";
        e.module("oc.lazyLoad").config(["$provide", function(t) {
            t.decorator("$ocLazyLoad", ["$delegate", "$q", function(t, n) {
                return t.jsLoader = function(r, i, o) {
                    var a = [];
                    e.forEach(r, function(e) {
                        a.push(t.buildElement("js", e, o))
                    }), n.all(a).then(function() {
                        i()
                    }, function(e) {
                        i(e)
                    })
                }, t.jsLoader.ocLazyLoadLoader = !0, t
            }])
        }])
    }(angular),
    function(e) {
        "use strict";
        e.module("oc.lazyLoad").config(["$provide", function(t) {
            t.decorator("$ocLazyLoad", ["$delegate", "$templateCache", "$q", "$http", function(t, n, r, i) {
                return t.templatesLoader = function(o, a, s) {
                    var u = [],
                        l = t._getFilesCache();
                    return e.forEach(o, function(t) {
                        var o = r.defer();
                        u.push(o.promise), i.get(t, s).success(function(r) {
                            e.isString(r) && r.length > 0 && e.forEach(e.element(r), function(e) {
                                "SCRIPT" === e.nodeName && "text/ng-template" === e.type && n.put(e.id, e.innerHTML)
                            }), e.isUndefined(l.get(t)) && l.put(t, !0), o.resolve()
                        }).error(function(e) {
                            o.reject(new Error('Unable to load template file "' + t + '": ' + e))
                        })
                    }), r.all(u).then(function() {
                        a()
                    }, function(e) {
                        a(e)
                    })
                }, t.templatesLoader.ocLazyLoadLoader = !0, t
            }])
        }])
    }(angular), Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
        var n;
        if (null == this) throw new TypeError('"this" is null or not defined');
        var r = Object(this),
            i = r.length >>> 0;
        if (0 === i) return -1;
        var o = +t || 0;
        if (Math.abs(o) === 1 / 0 && (o = 0), o >= i) return -1;
        for (n = Math.max(o >= 0 ? o : i - Math.abs(o), 0); i > n;) {
            if (n in r && r[n] === e) return n;
            n++
        }
        return -1
    }), angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.bindHtml", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.dateparser", "ui.bootstrap.position", "ui.bootstrap.datepicker", "ui.bootstrap.dropdown", "ui.bootstrap.modal", "ui.bootstrap.pagination", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.timepicker", "ui.bootstrap.transition", "ui.bootstrap.typeahead"]),
    angular.module("ui.bootstrap.tpls", ["template/accordion/accordion-group.html", "template/accordion/accordion.html", "template/alert/alert.html", "template/carousel/carousel.html", "template/carousel/slide.html", "template/datepicker/datepicker.html", "template/datepicker/day.html", "template/datepicker/month.html", "template/datepicker/popup.html", "template/datepicker/year.html", "template/modal/backdrop.html", "template/modal/window.html", "template/pagination/pager.html", "template/pagination/pagination.html", "template/tooltip/tooltip-html-popup.html", "template/tooltip/tooltip-html-unsafe-popup.html", "template/tooltip/tooltip-popup.html", "template/tooltip/tooltip-template-popup.html", "template/popover/popover-html.html", "template/popover/popover-template.html", "template/popover/popover.html", "template/progressbar/bar.html", "template/progressbar/progress.html", "template/progressbar/progressbar.html", "template/rating/rating.html", "template/tabs/tab.html", "template/tabs/tabset.html", "template/timepicker/timepicker.html", "template/typeahead/typeahead-match.html", "template/typeahead/typeahead-popup.html"]), angular.module("ui.bootstrap.collapse", []).directive("collapse", ["$animate", function(e) {
        return {
            link: function(t, n, r) {
                function i() {
                    n.removeClass("collapse").addClass("collapsing").attr("aria-expanded", !0).attr("aria-hidden", !1), e.addClass(n, "in", {
                        to: {
                            height: n[0].scrollHeight + "px"
                        }
                    }).then(o)
                }

                function o() {
                    n.removeClass("collapsing"), n.css({
                        height: "auto"
                    })
                }

                function a() {
                    return n.hasClass("collapse") || n.hasClass("in") ? (n.css({
                        height: n[0].scrollHeight + "px"
                    }).removeClass("collapse").addClass("collapsing").attr("aria-expanded", !1).attr("aria-hidden", !0), void e.removeClass(n, "in", {
                        to: {
                            height: "0"
                        }
                    }).then(s)) : s()
                }

                function s() {
                    n.css({
                        height: "0"
                    }), n.removeClass("collapsing"), n.addClass("collapse")
                }
                t.$watch(r.collapse, function(e) {
                    e ? a() : i()
                })
            }
        }
    }]), angular.module("ui.bootstrap.accordion", ["ui.bootstrap.collapse"]).constant("accordionConfig", {
        closeOthers: !0
    }).controller("AccordionController", ["$scope", "$attrs", "accordionConfig", function(e, t, n) {
        this.groups = [], this.closeOthers = function(r) {
            var i = angular.isDefined(t.closeOthers) ? e.$eval(t.closeOthers) : n.closeOthers;
            i && angular.forEach(this.groups, function(e) {
                e !== r && (e.isOpen = !1)
            })
        }, this.addGroup = function(e) {
            var t = this;
            this.groups.push(e), e.$on("$destroy", function(n) {
                t.removeGroup(e)
            })
        }, this.removeGroup = function(e) {
            var t = this.groups.indexOf(e); - 1 !== t && this.groups.splice(t, 1)
        }
    }]).directive("accordion", function() {
        return {
            restrict: "EA",
            controller: "AccordionController",
            controllerAs: "accordion",
            transclude: !0,
            replace: !1,
            templateUrl: function(e, t) {
                return t.templateUrl || "template/accordion/accordion.html"
            }
        }
    }).directive("accordionGroup", function() {
        return {
            require: "^accordion",
            restrict: "EA",
            transclude: !0,
            replace: !0,
            templateUrl: function(e, t) {
                return t.templateUrl || "template/accordion/accordion-group.html"
            },
            scope: {
                heading: "@",
                isOpen: "=?",
                isDisabled: "=?"
            },
            controller: function() {
                this.setHeading = function(e) {
                    this.heading = e
                }
            },
            link: function(e, t, n, r) {
                r.addGroup(e), e.$watch("isOpen", function(t) {
                    t && r.closeOthers(e)
                }), e.toggleOpen = function() {
                    e.isDisabled || (e.isOpen = !e.isOpen)
                }
            }
        }
    }).directive("accordionHeading", function() {
        return {
            restrict: "EA",
            transclude: !0,
            template: "",
            replace: !0,
            require: "^accordionGroup",
            link: function(e, t, n, r, i) {
                r.setHeading(i(e, angular.noop))
            }
        }
    }).directive("accordionTransclude", function() {
        return {
            require: "^accordionGroup",
            link: function(e, t, n, r) {
                e.$watch(function() {
                    return r[n.accordionTransclude]
                }, function(e) {
                    e && (t.find("span").html(""), t.find("span").append(e))
                })
            }
        }
    }), angular.module("ui.bootstrap.alert", []).controller("AlertController", ["$scope", "$attrs", function(e, t) {
        e.closeable = !!t.close, this.close = e.close
    }]).directive("alert", function() {
        return {
            restrict: "EA",
            controller: "AlertController",
            controllerAs: "alert",
            templateUrl: function(e, t) {
                return t.templateUrl || "template/alert/alert.html"
            },
            transclude: !0,
            replace: !0,
            scope: {
                type: "@",
                close: "&"
            }
        }
    }).directive("dismissOnTimeout", ["$timeout", function(e) {
        return {
            require: "alert",
            link: function(t, n, r, i) {
                e(function() {
                    i.close()
                }, parseInt(r.dismissOnTimeout, 10))
            }
        }
    }]), angular.module("ui.bootstrap.bindHtml", []).value("$bindHtmlUnsafeSuppressDeprecated", !1).directive("bindHtmlUnsafe", ["$log", "$bindHtmlUnsafeSuppressDeprecated", function(e, t) {
        return function(n, r, i) {
            t || e.warn("bindHtmlUnsafe is now deprecated. Use ngBindHtml instead"), r.addClass("ng-binding").data("$binding", i.bindHtmlUnsafe), n.$watch(i.bindHtmlUnsafe, function(e) {
                r.html(e || "")
            })
        }
    }]), angular.module("ui.bootstrap.buttons", []).constant("buttonConfig", {
        activeClass: "active",
        toggleEvent: "click"
    }).controller("ButtonsController", ["buttonConfig", function(e) {
        this.activeClass = e.activeClass || "active", this.toggleEvent = e.toggleEvent || "click"
    }]).directive("btnRadio", function() {
        return {
            require: ["btnRadio", "ngModel"],
            controller: "ButtonsController",
            controllerAs: "buttons",
            link: function(e, t, n, r) {
                var i = r[0],
                    o = r[1];
                o.$render = function() {
                    t.toggleClass(i.activeClass, angular.equals(o.$modelValue, e.$eval(n.btnRadio)))
                }, t.bind(i.toggleEvent, function() {
                    if (!n.disabled) {
                        var r = t.hasClass(i.activeClass);
                        (!r || angular.isDefined(n.uncheckable)) && e.$apply(function() {
                            o.$setViewValue(r ? null : e.$eval(n.btnRadio)), o.$render()
                        })
                    }
                })
            }
        }
    }).directive("btnCheckbox", function() {
        return {
            require: ["btnCheckbox", "ngModel"],
            controller: "ButtonsController",
            controllerAs: "button",
            link: function(e, t, n, r) {
                function i() {
                    return a(n.btnCheckboxTrue, !0)
                }

                function o() {
                    return a(n.btnCheckboxFalse, !1)
                }

                function a(t, n) {
                    var r = e.$eval(t);
                    return angular.isDefined(r) ? r : n
                }
                var s = r[0],
                    u = r[1];
                u.$render = function() {
                    t.toggleClass(s.activeClass, angular.equals(u.$modelValue, i()))
                }, t.bind(s.toggleEvent, function() {
                    n.disabled || e.$apply(function() {
                        u.$setViewValue(t.hasClass(s.activeClass) ? o() : i()), u.$render()
                    })
                })
            }
        }
    }), angular.module("ui.bootstrap.carousel", []).controller("CarouselController", ["$scope", "$element", "$interval", "$animate", function(e, t, n, r) {
        function i(t, n, i) {
            v || (angular.extend(t, {
                direction: i,
                active: !0
            }), angular.extend(f.currentSlide || {}, {
                direction: i,
                active: !1
            }), r.enabled() && !e.noTransition && !e.$currentTransition && t.$element && f.slides.length > 1 && (t.$element.data(m, t.direction), f.currentSlide && f.currentSlide.$element && f.currentSlide.$element.data(m, t.direction), e.$currentTransition = !0, d ? r.on("addClass", t.$element, function(t, n) {
                "close" === n && (e.$currentTransition = null, r.off("addClass", t))
            }) : t.$element.one("$animate:close", function() {
                e.$currentTransition = null
            })), f.currentSlide = t, g = n, a())
        }

        function o(e) {
            if (angular.isUndefined(p[e].index)) return p[e]; {
                var t;
                p.length
            }
            for (t = 0; t < p.length; ++t)
                if (p[t].index == e) return p[t]
        }

        function a() {
            s();
            var t = +e.interval;
            !isNaN(t) && t > 0 && (l = n(u, t))
        }

        function s() {
            l && (n.cancel(l), l = null)
        }

        function u() {
            var t = +e.interval;
            c && !isNaN(t) && t > 0 && p.length ? e.next() : e.pause()
        }
        var l, c, f = this,
            p = f.slides = e.slides = [],
            d = angular.version.minor >= 4,
            h = "uib-noTransition",
            m = "uib-slideDirection",
            g = -1;
        f.currentSlide = null;
        var v = !1;
        f.select = e.select = function(t, n) {
            var r = e.indexOfSlide(t);
            void 0 === n && (n = r > f.getCurrentIndex() ? "next" : "prev"), t && t !== f.currentSlide && !e.$currentTransition && i(t, r, n)
        }, e.$on("$destroy", function() {
            v = !0
        }), f.getCurrentIndex = function() {
            return f.currentSlide && angular.isDefined(f.currentSlide.index) ? +f.currentSlide.index : g
        }, e.indexOfSlide = function(e) {
            return angular.isDefined(e.index) ? +e.index : p.indexOf(e)
        }, e.next = function() {
            var t = (f.getCurrentIndex() + 1) % p.length;
            return 0 === t && e.noWrap() ? void e.pause() : f.select(o(t), "next")
        }, e.prev = function() {
            var t = f.getCurrentIndex() - 1 < 0 ? p.length - 1 : f.getCurrentIndex() - 1;
            return e.noWrap() && t === p.length - 1 ? void e.pause() : f.select(o(t), "prev")
        }, e.isActive = function(e) {
            return f.currentSlide === e
        }, e.$watch("interval", a), e.$on("$destroy", s), e.play = function() {
            c || (c = !0, a())
        }, e.pause = function() {
            e.noPause || (c = !1, s())
        }, f.addSlide = function(t, n) {
            t.$element = n, p.push(t), 1 === p.length || t.active ? (f.select(p[p.length - 1]), 1 == p.length && e.play()) : t.active = !1
        }, f.removeSlide = function(e) {
            angular.isDefined(e.index) && p.sort(function(e, t) {
                return +e.index > +t.index
            });
            var t = p.indexOf(e);
            p.splice(t, 1), p.length > 0 && e.active ? f.select(t >= p.length ? p[t - 1] : p[t]) : g > t && g--, 0 === p.length && (f.currentSlide = null)
        }, e.$watch("noTransition", function(e) {
            t.data(h, e)
        })
    }]).directive("carousel", [function() {
        return {
            restrict: "EA",
            transclude: !0,
            replace: !0,
            controller: "CarouselController",
            controllerAs: "carousel",
            require: "carousel",
            templateUrl: function(e, t) {
                return t.templateUrl || "template/carousel/carousel.html"
            },
            scope: {
                interval: "=",
                noTransition: "=",
                noPause: "=",
                noWrap: "&"
            }
        }
    }]).directive("slide", function() {
        return {
            require: "^carousel",
            restrict: "EA",
            transclude: !0,
            replace: !0,
            templateUrl: function(e, t) {
                return t.templateUrl || "template/carousel/slide.html"
            },
            scope: {
                active: "=?",
                index: "=?"
            },
            link: function(e, t, n, r) {
                r.addSlide(e, t), e.$on("$destroy", function() {
                    r.removeSlide(e)
                }), e.$watch("active", function(t) {
                    t && r.select(e)
                })
            }
        }
    }).animation(".item", ["$injector", "$animate", function(e, t) {
        function n(e, t, n) {
            e.removeClass(t), n && n()
        }
        var r = "uib-noTransition",
            i = "uib-slideDirection",
            o = null;
        return e.has("$animateCss") && (o = e.get("$animateCss")), {
            beforeAddClass: function(e, a, s) {
                if ("active" == a && e.parent() && !e.parent().data(r)) {
                    var u = !1,
                        l = e.data(i),
                        c = "next" == l ? "left" : "right",
                        f = n.bind(this, e, c + " " + l, s);
                    return e.addClass(l), o ? o(e, {
                            addClass: c
                        }).start().done(f) : t.addClass(e, c).then(function() {
                            u || f(), s()
                        }),
                        function() {
                            u = !0
                        }
                }
                s()
            },
            beforeRemoveClass: function(e, a, s) {
                if ("active" === a && e.parent() && !e.parent().data(r)) {
                    var u = !1,
                        l = e.data(i),
                        c = "next" == l ? "left" : "right",
                        f = n.bind(this, e, c, s);
                    return o ? o(e, {
                            addClass: c
                        }).start().done(f) : t.addClass(e, c).then(function() {
                            u || f(), s()
                        }),
                        function() {
                            u = !0
                        }
                }
                s()
            }
        }
    }]), angular.module("ui.bootstrap.dateparser", []).service("dateParser", ["$log", "$locale", "orderByFilter", function(e, t, n) {
        function r(e) {
            var t = [],
                r = e.split("");
            return angular.forEach(a, function(n, i) {
                var o = e.indexOf(i);
                if (o > -1) {
                    e = e.split(""), r[o] = "(" + n.regex + ")", e[o] = "$";
                    for (var a = o + 1, s = o + i.length; s > a; a++) r[a] = "", e[a] = "$";
                    e = e.join(""), t.push({
                        index: o,
                        apply: n.apply
                    })
                }
            }), {
                regex: new RegExp("^" + r.join("") + "$"),
                map: n(t, "index")
            }
        }

        function i(e, t, n) {
            return 1 > n ? !1 : 1 === t && n > 28 ? 29 === n && (e % 4 === 0 && e % 100 !== 0 || e % 400 === 0) : 3 === t || 5 === t || 8 === t || 10 === t ? 31 > n : !0
        }
        var o = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
        this.parsers = {};
        var a = {
            yyyy: {
                regex: "\\d{4}",
                apply: function(e) {
                    this.year = +e
                }
            },
            yy: {
                regex: "\\d{2}",
                apply: function(e) {
                    this.year = +e + 2e3
                }
            },
            y: {
                regex: "\\d{1,4}",
                apply: function(e) {
                    this.year = +e
                }
            },
            MMMM: {
                regex: t.DATETIME_FORMATS.MONTH.join("|"),
                apply: function(e) {
                    this.month = t.DATETIME_FORMATS.MONTH.indexOf(e)
                }
            },
            MMM: {
                regex: t.DATETIME_FORMATS.SHORTMONTH.join("|"),
                apply: function(e) {
                    this.month = t.DATETIME_FORMATS.SHORTMONTH.indexOf(e)
                }
            },
            MM: {
                regex: "0[1-9]|1[0-2]",
                apply: function(e) {
                    this.month = e - 1
                }
            },
            M: {
                regex: "[1-9]|1[0-2]",
                apply: function(e) {
                    this.month = e - 1
                }
            },
            dd: {
                regex: "[0-2][0-9]{1}|3[0-1]{1}",
                apply: function(e) {
                    this.date = +e
                }
            },
            d: {
                regex: "[1-2]?[0-9]{1}|3[0-1]{1}",
                apply: function(e) {
                    this.date = +e
                }
            },
            EEEE: {
                regex: t.DATETIME_FORMATS.DAY.join("|")
            },
            EEE: {
                regex: t.DATETIME_FORMATS.SHORTDAY.join("|")
            },
            HH: {
                regex: "(?:0|1)[0-9]|2[0-3]",
                apply: function(e) {
                    this.hours = +e
                }
            },
            hh: {
                regex: "0[0-9]|1[0-2]",
                apply: function(e) {
                    this.hours = +e
                }
            },
            H: {
                regex: "1?[0-9]|2[0-3]",
                apply: function(e) {
                    this.hours = +e
                }
            },
            mm: {
                regex: "[0-5][0-9]",
                apply: function(e) {
                    this.minutes = +e
                }
            },
            m: {
                regex: "[0-9]|[1-5][0-9]",
                apply: function(e) {
                    this.minutes = +e
                }
            },
            sss: {
                regex: "[0-9][0-9][0-9]",
                apply: function(e) {
                    this.milliseconds = +e
                }
            },
            ss: {
                regex: "[0-5][0-9]",
                apply: function(e) {
                    this.seconds = +e
                }
            },
            s: {
                regex: "[0-9]|[1-5][0-9]",
                apply: function(e) {
                    this.seconds = +e
                }
            },
            a: {
                regex: t.DATETIME_FORMATS.AMPMS.join("|"),
                apply: function(e) {
                    12 === this.hours && (this.hours = 0), "PM" === e && (this.hours += 12)
                }
            }
        };
        this.parse = function(n, a, s) {
            if (!angular.isString(n) || !a) return n;
            a = t.DATETIME_FORMATS[a] || a, a = a.replace(o, "\\$&"), this.parsers[a] || (this.parsers[a] = r(a));
            var u = this.parsers[a],
                l = u.regex,
                c = u.map,
                f = n.match(l);
            if (f && f.length) {
                var p, d;
                angular.isDate(s) && !isNaN(s.getTime()) ? p = {
                    year: s.getFullYear(),
                    month: s.getMonth(),
                    date: s.getDate(),
                    hours: s.getHours(),
                    minutes: s.getMinutes(),
                    seconds: s.getSeconds(),
                    milliseconds: s.getMilliseconds()
                } : (s && e.warn("dateparser:", "baseDate is not a valid date"), p = {
                    year: 1900,
                    month: 0,
                    date: 1,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    milliseconds: 0
                });
                for (var h = 1, m = f.length; m > h; h++) {
                    var g = c[h - 1];
                    g.apply && g.apply.call(p, f[h])
                }
                return i(p.year, p.month, p.date) && (d = new Date(p.year, p.month, p.date, p.hours, p.minutes, p.seconds, p.milliseconds || 0)), d
            }
        }
    }]), angular.module("ui.bootstrap.position", []).factory("$position", ["$document", "$window", function(e, t) {
        function n(e, n) {
            return e.currentStyle ? e.currentStyle[n] : t.getComputedStyle ? t.getComputedStyle(e)[n] : e.style[n]
        }

        function r(e) {
            return "static" === (n(e, "position") || "static")
        }
        var i = function(t) {
            for (var n = e[0], i = t.offsetParent || n; i && i !== n && r(i);) i = i.offsetParent;
            return i || n
        };
        return {
            position: function(t) {
                var n = this.offset(t),
                    r = {
                        top: 0,
                        left: 0
                    },
                    o = i(t[0]);
                o != e[0] && (r = this.offset(angular.element(o)), r.top += o.clientTop - o.scrollTop, r.left += o.clientLeft - o.scrollLeft);
                var a = t[0].getBoundingClientRect();
                return {
                    width: a.width || t.prop("offsetWidth"),
                    height: a.height || t.prop("offsetHeight"),
                    top: n.top - r.top,
                    left: n.left - r.left
                }
            },
            offset: function(n) {
                var r = n[0].getBoundingClientRect();
                return {
                    width: r.width || n.prop("offsetWidth"),
                    height: r.height || n.prop("offsetHeight"),
                    top: r.top + (t.pageYOffset || e[0].documentElement.scrollTop),
                    left: r.left + (t.pageXOffset || e[0].documentElement.scrollLeft)
                }
            },
            positionElements: function(e, t, n, r) {
                var i, o, a, s, u = n.split("-"),
                    l = u[0],
                    c = u[1] || "center";
                i = r ? this.offset(e) : this.position(e), o = t.prop("offsetWidth"), a = t.prop("offsetHeight");
                var f = {
                        center: function() {
                            return i.left + i.width / 2 - o / 2
                        },
                        left: function() {
                            return i.left
                        },
                        right: function() {
                            return i.left + i.width
                        }
                    },
                    p = {
                        center: function() {
                            return i.top + i.height / 2 - a / 2
                        },
                        top: function() {
                            return i.top
                        },
                        bottom: function() {
                            return i.top + i.height
                        }
                    };
                switch (l) {
                    case "right":
                        s = {
                            top: p[c](),
                            left: f[l]()
                        };
                        break;
                    case "left":
                        s = {
                            top: p[c](),
                            left: i.left - o
                        };
                        break;
                    case "bottom":
                        s = {
                            top: p[l](),
                            left: f[c]()
                        };
                        break;
                    default:
                        s = {
                            top: i.top - a,
                            left: f[c]()
                        }
                }
                return s
            }
        }
    }]), angular.module("ui.bootstrap.datepicker", ["ui.bootstrap.dateparser", "ui.bootstrap.position"]).value("$datepickerSuppressError", !1).constant("datepickerConfig", {
        formatDay: "dd",
        formatMonth: "MMMM",
        formatYear: "yyyy",
        formatDayHeader: "EEE",
        formatDayTitle: "MMMM yyyy",
        formatMonthTitle: "yyyy",
        datepickerMode: "day",
        minMode: "day",
        maxMode: "year",
        showWeeks: !0,
        startingDay: 0,
        yearRange: 20,
        minDate: null,
        maxDate: null,
        shortcutPropagation: !1
    }).controller("DatepickerController", ["$scope", "$attrs", "$parse", "$interpolate", "$log", "dateFilter", "datepickerConfig", "$datepickerSuppressError", function(e, t, n, r, i, o, a, s) {
        var u = this,
            l = {
                $setViewValue: angular.noop
            };
        this.modes = ["day", "month", "year"], angular.forEach(["formatDay", "formatMonth", "formatYear", "formatDayHeader", "formatDayTitle", "formatMonthTitle", "showWeeks", "startingDay", "yearRange", "shortcutPropagation"], function(n, i) {
            u[n] = angular.isDefined(t[n]) ? 6 > i ? r(t[n])(e.$parent) : e.$parent.$eval(t[n]) : a[n]
        }), angular.forEach(["minDate", "maxDate"], function(r) {
            t[r] ? e.$parent.$watch(n(t[r]), function(e) {
                u[r] = e ? new Date(e) : null, u.refreshView()
            }) : u[r] = a[r] ? new Date(a[r]) : null
        }), angular.forEach(["minMode", "maxMode"], function(r) {
            t[r] ? e.$parent.$watch(n(t[r]), function(n) {
                u[r] = angular.isDefined(n) ? n : t[r], e[r] = u[r], ("minMode" == r && u.modes.indexOf(e.datepickerMode) < u.modes.indexOf(u[r]) || "maxMode" == r && u.modes.indexOf(e.datepickerMode) > u.modes.indexOf(u[r])) && (e.datepickerMode = u[r])
            }) : (u[r] = a[r] || null, e[r] = u[r])
        }), e.datepickerMode = e.datepickerMode || a.datepickerMode, e.uniqueId = "datepicker-" + e.$id + "-" + Math.floor(1e4 * Math.random()), angular.isDefined(t.initDate) ? (this.activeDate = e.$parent.$eval(t.initDate) || new Date, e.$parent.$watch(t.initDate, function(e) {
            e && (l.$isEmpty(l.$modelValue) || l.$invalid) && (u.activeDate = e, u.refreshView())
        })) : this.activeDate = new Date, e.isActive = function(t) {
            return 0 === u.compare(t.date, u.activeDate) ? (e.activeDateId = t.uid, !0) : !1
        }, this.init = function(e) {
            l = e, l.$render = function() {
                u.render()
            }
        }, this.render = function() {
            if (l.$viewValue) {
                var e = new Date(l.$viewValue),
                    t = !isNaN(e);
                t ? this.activeDate = e : s || i.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')
            }
            this.refreshView()
        }, this.refreshView = function() {
            if (this.element) {
                this._refreshView();
                var e = l.$viewValue ? new Date(l.$viewValue) : null;
                l.$setValidity("dateDisabled", !e || this.element && !this.isDisabled(e))
            }
        }, this.createDateObject = function(e, t) {
            var n = l.$viewValue ? new Date(l.$viewValue) : null;
            return {
                date: e,
                label: o(e, t),
                selected: n && 0 === this.compare(e, n),
                disabled: this.isDisabled(e),
                current: 0 === this.compare(e, new Date),
                customClass: this.customClass(e)
            }
        }, this.isDisabled = function(n) {
            return this.minDate && this.compare(n, this.minDate) < 0 || this.maxDate && this.compare(n, this.maxDate) > 0 || t.dateDisabled && e.dateDisabled({
                date: n,
                mode: e.datepickerMode
            })
        }, this.customClass = function(t) {
            return e.customClass({
                date: t,
                mode: e.datepickerMode
            })
        }, this.split = function(e, t) {
            for (var n = []; e.length > 0;) n.push(e.splice(0, t));
            return n
        }, this.fixTimeZone = function(e) {
            var t = e.getHours();
            e.setHours(23 === t ? t + 2 : 0)
        }, e.select = function(t) {
            if (e.datepickerMode === u.minMode) {
                var n = l.$viewValue ? new Date(l.$viewValue) : new Date(0, 0, 0, 0, 0, 0, 0);
                n.setFullYear(t.getFullYear(), t.getMonth(), t.getDate()), l.$setViewValue(n), l.$render()
            } else u.activeDate = t, e.datepickerMode = u.modes[u.modes.indexOf(e.datepickerMode) - 1]
        }, e.move = function(e) {
            var t = u.activeDate.getFullYear() + e * (u.step.years || 0),
                n = u.activeDate.getMonth() + e * (u.step.months || 0);
            u.activeDate.setFullYear(t, n, 1), u.refreshView()
        }, e.toggleMode = function(t) {
            t = t || 1, e.datepickerMode === u.maxMode && 1 === t || e.datepickerMode === u.minMode && -1 === t || (e.datepickerMode = u.modes[u.modes.indexOf(e.datepickerMode) + t])
        }, e.keys = {
            13: "enter",
            32: "space",
            33: "pageup",
            34: "pagedown",
            35: "end",
            36: "home",
            37: "left",
            38: "up",
            39: "right",
            40: "down"
        };
        var c = function() {
            u.element[0].focus()
        };
        e.$on("datepicker.focus", c), e.keydown = function(t) {
            var n = e.keys[t.which];
            if (n && !t.shiftKey && !t.altKey)
                if (t.preventDefault(), u.shortcutPropagation || t.stopPropagation(), "enter" === n || "space" === n) {
                    if (u.isDisabled(u.activeDate)) return;
                    e.select(u.activeDate), c()
                } else !t.ctrlKey || "up" !== n && "down" !== n ? (u.handleKeyDown(n, t), u.refreshView()) : (e.toggleMode("up" === n ? 1 : -1), c())
        }
    }]).directive("datepicker", function() {
        return {
            restrict: "EA",
            replace: !0,
            templateUrl: function(e, t) {
                return t.templateUrl || "template/datepicker/datepicker.html"
            },
            scope: {
                datepickerMode: "=?",
                dateDisabled: "&",
                customClass: "&",
                shortcutPropagation: "&?"
            },
            require: ["datepicker", "^ngModel"],
            controller: "DatepickerController",
            controllerAs: "datepicker",
            link: function(e, t, n, r) {
                var i = r[0],
                    o = r[1];
                i.init(o)
            }
        }
    }).directive("daypicker", ["dateFilter", function(e) {
        return {
            restrict: "EA",
            replace: !0,
            templateUrl: "template/datepicker/day.html",
            require: "^datepicker",
            link: function(t, n, r, i) {
                function o(e, t) {
                    return 1 !== t || e % 4 !== 0 || e % 100 === 0 && e % 400 !== 0 ? u[t] : 29
                }

                function a(e, t) {
                    for (var n, r = new Array(t), o = new Date(e), a = 0; t > a;) n = new Date(o), i.fixTimeZone(n), r[a++] = n, o.setDate(o.getDate() + 1);
                    return r
                }

                function s(e) {
                    var t = new Date(e);
                    t.setDate(t.getDate() + 4 - (t.getDay() || 7));
                    var n = t.getTime();
                    return t.setMonth(0), t.setDate(1), Math.floor(Math.round((n - t) / 864e5) / 7) + 1
                }
                t.showWeeks = i.showWeeks, i.step = {
                    months: 1
                }, i.element = n;
                var u = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                i._refreshView = function() {
                    var n = i.activeDate.getFullYear(),
                        r = i.activeDate.getMonth(),
                        o = new Date(n, r, 1),
                        u = i.startingDay - o.getDay(),
                        l = u > 0 ? 7 - u : -u,
                        c = new Date(o);
                    l > 0 && c.setDate(-l + 1);
                    for (var f = a(c, 42), p = 0; 42 > p; p++) f[p] = angular.extend(i.createDateObject(f[p], i.formatDay), {
                        secondary: f[p].getMonth() !== r,
                        uid: t.uniqueId + "-" + p
                    });
                    t.labels = new Array(7);
                    for (var d = 0; 7 > d; d++) t.labels[d] = {
                        abbr: e(f[d].date, i.formatDayHeader),
                        full: e(f[d].date, "EEEE")
                    };
                    if (t.title = e(i.activeDate, i.formatDayTitle), t.rows = i.split(f, 7), t.showWeeks) {
                        t.weekNumbers = [];
                        for (var h = (11 - i.startingDay) % 7, m = t.rows.length, g = 0; m > g; g++) t.weekNumbers.push(s(t.rows[g][h].date))
                    }
                }, i.compare = function(e, t) {
                    return new Date(e.getFullYear(), e.getMonth(), e.getDate()) - new Date(t.getFullYear(), t.getMonth(), t.getDate())
                }, i.handleKeyDown = function(e, t) {
                    var n = i.activeDate.getDate();
                    if ("left" === e) n -= 1;
                    else if ("up" === e) n -= 7;
                    else if ("right" === e) n += 1;
                    else if ("down" === e) n += 7;
                    else if ("pageup" === e || "pagedown" === e) {
                        var r = i.activeDate.getMonth() + ("pageup" === e ? -1 : 1);
                        i.activeDate.setMonth(r, 1), n = Math.min(o(i.activeDate.getFullYear(), i.activeDate.getMonth()), n)
                    } else "home" === e ? n = 1 : "end" === e && (n = o(i.activeDate.getFullYear(), i.activeDate.getMonth()));
                    i.activeDate.setDate(n)
                }, i.refreshView()
            }
        }
    }]).directive("monthpicker", ["dateFilter", function(e) {
        return {
            restrict: "EA",
            replace: !0,
            templateUrl: "template/datepicker/month.html",
            require: "^datepicker",
            link: function(t, n, r, i) {
                i.step = {
                    years: 1
                }, i.element = n, i._refreshView = function() {
                    for (var n, r = new Array(12), o = i.activeDate.getFullYear(), a = 0; 12 > a; a++) n = new Date(o, a, 1), i.fixTimeZone(n), r[a] = angular.extend(i.createDateObject(n, i.formatMonth), {
                        uid: t.uniqueId + "-" + a
                    });
                    t.title = e(i.activeDate, i.formatMonthTitle), t.rows = i.split(r, 3)
                }, i.compare = function(e, t) {
                    return new Date(e.getFullYear(), e.getMonth()) - new Date(t.getFullYear(), t.getMonth())
                }, i.handleKeyDown = function(e, t) {
                    var n = i.activeDate.getMonth();
                    if ("left" === e) n -= 1;
                    else if ("up" === e) n -= 3;
                    else if ("right" === e) n += 1;
                    else if ("down" === e) n += 3;
                    else if ("pageup" === e || "pagedown" === e) {
                        var r = i.activeDate.getFullYear() + ("pageup" === e ? -1 : 1);
                        i.activeDate.setFullYear(r)
                    } else "home" === e ? n = 0 : "end" === e && (n = 11);
                    i.activeDate.setMonth(n)
                }, i.refreshView()
            }
        }
    }]).directive("yearpicker", ["dateFilter", function(e) {
        return {
            restrict: "EA",
            replace: !0,
            templateUrl: "template/datepicker/year.html",
            require: "^datepicker",
            link: function(e, t, n, r) {
                function i(e) {
                    return parseInt((e - 1) / o, 10) * o + 1
                }
                var o = r.yearRange;
                r.step = {
                    years: o
                }, r.element = t, r._refreshView = function() {
                    for (var t, n = new Array(o), a = 0, s = i(r.activeDate.getFullYear()); o > a; a++) t = new Date(s + a, 0, 1), r.fixTimeZone(t), n[a] = angular.extend(r.createDateObject(t, r.formatYear), {
                        uid: e.uniqueId + "-" + a
                    });
                    e.title = [n[0].label, n[o - 1].label].join(" - "), e.rows = r.split(n, 5)
                }, r.compare = function(e, t) {
                    return e.getFullYear() - t.getFullYear()
                }, r.handleKeyDown = function(e, t) {
                    var n = r.activeDate.getFullYear();
                    "left" === e ? n -= 1 : "up" === e ? n -= 5 : "right" === e ? n += 1 : "down" === e ? n += 5 : "pageup" === e || "pagedown" === e ? n += ("pageup" === e ? -1 : 1) * r.step.years : "home" === e ? n = i(r.activeDate.getFullYear()) : "end" === e && (n = i(r.activeDate.getFullYear()) + o - 1), r.activeDate.setFullYear(n)
                }, r.refreshView()
            }
        }
    }]).constant("datepickerPopupConfig", {
        datepickerPopup: "yyyy-MM-dd",
        datepickerPopupTemplateUrl: "template/datepicker/popup.html",
        datepickerTemplateUrl: "template/datepicker/datepicker.html",
        html5Types: {
            date: "yyyy-MM-dd",
            "datetime-local": "yyyy-MM-ddTHH:mm:ss.sss",
            month: "yyyy-MM"
        },
        currentText: "Today",
        clearText: "Clear",
        closeText: "Done",
        closeOnDateSelection: !0,
        appendToBody: !1,
        showButtonBar: !0,
        onOpenFocus: !0
    }).directive("datepickerPopup", ["$compile", "$parse", "$document", "$rootScope", "$position", "dateFilter", "dateParser", "datepickerPopupConfig", "$timeout", function(e, t, n, r, i, o, a, s, u) {
        return {
            restrict: "EA",
            require: "ngModel",
            scope: {
                isOpen: "=?",
                currentText: "@",
                clearText: "@",
                closeText: "@",
                dateDisabled: "&",
                customClass: "&"
            },
            link: function(l, c, f, p) {
                function d(e) {
                    return e.replace(/([A-Z])/g, function(e) {
                        return "-" + e.toLowerCase()
                    })
                }

                function h(e) {
                    if (angular.isNumber(e) && (e = new Date(e)), e) {
                        if (angular.isDate(e) && !isNaN(e)) return e;
                        if (angular.isString(e)) {
                            var t = a.parse(e, g, l.date);
                            return isNaN(t) ? void 0 : t
                        }
                        return void 0
                    }
                    return null
                }

                function m(e, t) {
                    var n = e || t;
                    if (!f.ngRequired && !n) return !0;
                    if (angular.isNumber(n) && (n = new Date(n)), n) {
                        if (angular.isDate(n) && !isNaN(n)) return !0;
                        if (angular.isString(n)) {
                            var r = a.parse(n, g);
                            return !isNaN(r)
                        }
                        return !1
                    }
                    return !0
                }
                var g, v = angular.isDefined(f.closeOnDateSelection) ? l.$parent.$eval(f.closeOnDateSelection) : s.closeOnDateSelection,
                    $ = angular.isDefined(f.datepickerAppendToBody) ? l.$parent.$eval(f.datepickerAppendToBody) : s.appendToBody,
                    y = angular.isDefined(f.onOpenFocus) ? l.$parent.$eval(f.onOpenFocus) : s.onOpenFocus,
                    b = angular.isDefined(f.datepickerPopupTemplateUrl) ? f.datepickerPopupTemplateUrl : s.datepickerPopupTemplateUrl,
                    w = angular.isDefined(f.datepickerTemplateUrl) ? f.datepickerTemplateUrl : s.datepickerTemplateUrl;
                l.showButtonBar = angular.isDefined(f.showButtonBar) ? l.$parent.$eval(f.showButtonBar) : s.showButtonBar, l.getText = function(e) {
                    return l[e + "Text"] || s[e + "Text"]
                };
                var x = !1;
                if (s.html5Types[f.type] ? (g = s.html5Types[f.type], x = !0) : (g = f.datepickerPopup || s.datepickerPopup, f.$observe("datepickerPopup", function(e, t) {
                        var n = e || s.datepickerPopup;
                        if (n !== g && (g = n, p.$modelValue = null, !g)) throw new Error("datepickerPopup must have a date format specified.")
                    })), !g) throw new Error("datepickerPopup must have a date format specified.");
                if (x && f.datepickerPopup) throw new Error("HTML5 date input types do not support custom formats.");
                var C = angular.element("<div datepicker-popup-wrap><div datepicker></div></div>");
                C.attr({
                    "ng-model": "date",
                    "ng-change": "dateSelection(date)",
                    "template-url": b
                });
                var k = angular.element(C.children()[0]);
                if (k.attr("template-url", w), x && "month" == f.type && (k.attr("datepicker-mode", '"month"'), k.attr("min-mode", "month")), f.datepickerOptions) {
                    var S = l.$parent.$eval(f.datepickerOptions);
                    S && S.initDate && (l.initDate = S.initDate, k.attr("init-date", "initDate"), delete S.initDate), angular.forEach(S, function(e, t) {
                        k.attr(d(t), e)
                    })
                }
                l.watchData = {}, angular.forEach(["minMode", "maxMode", "minDate", "maxDate", "datepickerMode", "initDate", "shortcutPropagation"], function(e) {
                    if (f[e]) {
                        var n = t(f[e]);
                        if (l.$parent.$watch(n, function(t) {
                                l.watchData[e] = t
                            }), k.attr(d(e), "watchData." + e), "datepickerMode" === e) {
                            var r = n.assign;
                            l.$watch("watchData." + e, function(e, t) {
                                angular.isFunction(r) && e !== t && r(l.$parent, e)
                            })
                        }
                    }
                }), f.dateDisabled && k.attr("date-disabled", "dateDisabled({ date: date, mode: mode })"), f.showWeeks && k.attr("show-weeks", f.showWeeks), f.customClass && k.attr("custom-class", "customClass({ date: date, mode: mode })"), x ? p.$formatters.push(function(e) {
                    return l.date = e, e
                }) : (p.$$parserName = "date", p.$validators.date = m, p.$parsers.unshift(h), p.$formatters.push(function(e) {
                    return l.date = e, p.$isEmpty(e) ? e : o(e, g)
                })), l.dateSelection = function(e) {
                    angular.isDefined(e) && (l.date = e);
                    var t = l.date ? o(l.date, g) : null;
                    c.val(t), p.$setViewValue(t), v && (l.isOpen = !1, c[0].focus())
                }, p.$viewChangeListeners.push(function() {
                    l.date = a.parse(p.$viewValue, g, l.date)
                });
                var E = function(e) {
                        l.isOpen && !c[0].contains(e.target) && l.$apply(function() {
                            l.isOpen = !1
                        })
                    },
                    T = function(e) {
                        27 === e.which && l.isOpen ? (e.preventDefault(), e.stopPropagation(), l.$apply(function() {
                            l.isOpen = !1
                        }), c[0].focus()) : 40 !== e.which || l.isOpen || (e.preventDefault(), e.stopPropagation(), l.$apply(function() {
                            l.isOpen = !0
                        }))
                    };
                c.bind("keydown", T), l.keydown = function(e) {
                    27 === e.which && (l.isOpen = !1, c[0].focus())
                }, l.$watch("isOpen", function(e) {
                    e ? (l.position = $ ? i.offset(c) : i.position(c), l.position.top = l.position.top + c.prop("offsetHeight"), u(function() {
                        y && l.$broadcast("datepicker.focus"), n.bind("click", E)
                    }, 0, !1)) : n.unbind("click", E)
                }), l.select = function(e) {
                    if ("today" === e) {
                        var t = new Date;
                        angular.isDate(l.date) ? (e = new Date(l.date), e.setFullYear(t.getFullYear(), t.getMonth(), t.getDate())) : e = new Date(t.setHours(0, 0, 0, 0))
                    }
                    l.dateSelection(e)
                }, l.close = function() {
                    l.isOpen = !1, c[0].focus()
                };
                var D = e(C)(l);
                C.remove(), $ ? n.find("body").append(D) : c.after(D), l.$on("$destroy", function() {
                    l.isOpen === !0 && (r.$$phase || l.$apply(function() {
                        l.isOpen = !1
                    })), D.remove(), c.unbind("keydown", T), n.unbind("click", E)
                })
            }
        }
    }]).directive("datepickerPopupWrap", function() {
        return {
            restrict: "EA",
            replace: !0,
            transclude: !0,
            templateUrl: function(e, t) {
                return t.templateUrl || "template/datepicker/popup.html"
            }
        }
    }), angular.module("ui.bootstrap.dropdown", ["ui.bootstrap.position"]).constant("dropdownConfig", {
        openClass: "open"
    }).service("dropdownService", ["$document", "$rootScope", function(e, t) {
        var n = null;
        this.open = function(t) {
            n || (e.bind("click", r), e.bind("keydown", i)), n && n !== t && (n.isOpen = !1), n = t
        }, this.close = function(t) {
            n === t && (n = null, e.unbind("click", r), e.unbind("keydown", i))
        };
        var r = function(e) {
                if (n && (!e || "disabled" !== n.getAutoClose())) {
                    var r = n.getToggleElement();
                    if (!(e && r && r[0].contains(e.target))) {
                        var i = n.getDropdownElement();
                        e && "outsideClick" === n.getAutoClose() && i && i[0].contains(e.target) || (n.isOpen = !1, t.$$phase || n.$apply())
                    }
                }
            },
            i = function(e) {
                27 === e.which ? (n.focusToggleElement(), r()) : n.isKeynavEnabled() && /(38|40)/.test(e.which) && n.isOpen && (e.preventDefault(), e.stopPropagation(), n.focusDropdownEntry(e.which))
            }
    }]).controller("DropdownController", ["$scope", "$attrs", "$parse", "dropdownConfig", "dropdownService", "$animate", "$position", "$document", "$compile", "$templateRequest", function(e, t, n, r, i, o, a, s, u, l) {
        var c, f, p = this,
            d = e.$new(),
            h = r.openClass,
            m = angular.noop,
            g = t.onToggle ? n(t.onToggle) : angular.noop,
            v = !1,
            $ = !1;
        this.init = function(r) {
            p.$element = r, t.isOpen && (f = n(t.isOpen), m = f.assign, e.$watch(f, function(e) {
                d.isOpen = !!e
            })), v = angular.isDefined(t.dropdownAppendToBody), $ = angular.isDefined(t.keyboardNav), v && p.dropdownMenu && (s.find("body").append(p.dropdownMenu), r.on("$destroy", function() {
                p.dropdownMenu.remove()
            }))
        }, this.toggle = function(e) {
            return d.isOpen = arguments.length ? !!e : !d.isOpen
        }, this.isOpen = function() {
            return d.isOpen
        }, d.getToggleElement = function() {
            return p.toggleElement
        }, d.getAutoClose = function() {
            return t.autoClose || "always"
        }, d.getElement = function() {
            return p.$element
        }, d.isKeynavEnabled = function() {
            return $
        }, d.focusDropdownEntry = function(e) {
            var t = p.dropdownMenu ? angular.element(p.dropdownMenu).find("a") : angular.element(p.$element).find("ul").eq(0).find("a");
            switch (e) {
                case 40:
                    p.selectedOption = angular.isNumber(p.selectedOption) ? p.selectedOption === t.length - 1 ? p.selectedOption : p.selectedOption + 1 : 0;
                    break;
                case 38:
                    if (!angular.isNumber(p.selectedOption)) return;
                    p.selectedOption = 0 === p.selectedOption ? 0 : p.selectedOption - 1
            }
            t[p.selectedOption].focus()
        }, d.getDropdownElement = function() {
            return p.dropdownMenu
        }, d.focusToggleElement = function() {
            p.toggleElement && p.toggleElement[0].focus()
        }, d.$watch("isOpen", function(t, n) {
            if (v && p.dropdownMenu) {
                var r = a.positionElements(p.$element, p.dropdownMenu, "bottom-left", !0),
                    s = {
                        top: r.top + "px",
                        display: t ? "block" : "none"
                    },
                    f = p.dropdownMenu.hasClass("dropdown-menu-right");
                f ? (s.left = "auto", s.right = window.innerWidth - (r.left + p.$element.prop("offsetWidth")) + "px") : (s.left = r.left + "px", s.right = "auto"), p.dropdownMenu.css(s)
            }
            if (o[t ? "addClass" : "removeClass"](p.$element, h).then(function() {
                    angular.isDefined(t) && t !== n && g(e, {
                        open: !!t
                    })
                }), t) p.dropdownMenuTemplateUrl && l(p.dropdownMenuTemplateUrl).then(function(e) {
                c = d.$new(), u(e.trim())(c, function(e) {
                    var t = e;
                    p.dropdownMenu.replaceWith(t), p.dropdownMenu = t
                })
            }), d.focusToggleElement(), i.open(d);
            else {
                if (p.dropdownMenuTemplateUrl) {
                    c && c.$destroy();
                    var $ = angular.element('<ul class="dropdown-menu"></ul>');
                    p.dropdownMenu.replaceWith($), p.dropdownMenu = $
                }
                i.close(d), p.selectedOption = null
            }
            angular.isFunction(m) && m(e, t)
        }), e.$on("$locationChangeSuccess", function() {
            "disabled" !== d.getAutoClose() && (d.isOpen = !1)
        }), e.$on("$destroy", function() {
            d.$destroy()
        })
    }]).directive("dropdown", function() {
        return {
            controller: "DropdownController",
            link: function(e, t, n, r) {
                r.init(t), t.addClass("dropdown")
            }
        }
    }).directive("dropdownMenu", function() {
        return {
            restrict: "AC",
            require: "?^dropdown",
            link: function(e, t, n, r) {
                if (r) {
                    var i = n.templateUrl;
                    i && (r.dropdownMenuTemplateUrl = i), r.dropdownMenu || (r.dropdownMenu = t)
                }
            }
        }
    }).directive("keyboardNav", function() {
        return {
            restrict: "A",
            require: "?^dropdown",
            link: function(e, t, n, r) {
                t.bind("keydown", function(e) {
                    if (-1 !== [38, 40].indexOf(e.which)) {
                        e.preventDefault(), e.stopPropagation();
                        var t = r.dropdownMenu.find("a");
                        switch (e.which) {
                            case 40:
                                r.selectedOption = angular.isNumber(r.selectedOption) ? r.selectedOption === t.length - 1 ? r.selectedOption : r.selectedOption + 1 : 0;
                                break;
                            case 38:
                                r.selectedOption = 0 === r.selectedOption ? 0 : r.selectedOption - 1
                        }
                        t[r.selectedOption].focus()
                    }
                })
            }
        }
    }).directive("dropdownToggle", function() {
        return {
            require: "?^dropdown",
            link: function(e, t, n, r) {
                if (r) {
                    t.addClass("dropdown-toggle"), r.toggleElement = t;
                    var i = function(i) {
                        i.preventDefault(), t.hasClass("disabled") || n.disabled || e.$apply(function() {
                            r.toggle()
                        })
                    };
                    t.bind("click", i), t.attr({
                        "aria-haspopup": !0,
                        "aria-expanded": !1
                    }), e.$watch(r.isOpen, function(e) {
                        t.attr("aria-expanded", !!e)
                    }), e.$on("$destroy", function() {
                        t.unbind("click", i)
                    })
                }
            }
        }
    }), angular.module("ui.bootstrap.modal", []).factory("$$stackedMap", function() {
        return {
            createNew: function() {
                var e = [];
                return {
                    add: function(t, n) {
                        e.push({
                            key: t,
                            value: n
                        })
                    },
                    get: function(t) {
                        for (var n = 0; n < e.length; n++)
                            if (t == e[n].key) return e[n]
                    },
                    keys: function() {
                        for (var t = [], n = 0; n < e.length; n++) t.push(e[n].key);
                        return t
                    },
                    top: function() {
                        return e[e.length - 1]
                    },
                    remove: function(t) {
                        for (var n = -1, r = 0; r < e.length; r++)
                            if (t == e[r].key) {
                                n = r;
                                break
                            }
                        return e.splice(n, 1)[0]
                    },
                    removeTop: function() {
                        return e.splice(e.length - 1, 1)[0]
                    },
                    length: function() {
                        return e.length
                    }
                }
            }
        }
    }).directive("modalBackdrop", ["$animate", "$injector", "$modalStack", function(e, t, n) {
        function r(t, r, o) {
            o.modalInClass && (i ? i(r, {
                addClass: o.modalInClass
            }).start() : e.addClass(r, o.modalInClass), t.$on(n.NOW_CLOSING_EVENT, function(t, n) {
                var a = n();
                i ? i(r, {
                    removeClass: o.modalInClass
                }).start().then(a) : e.removeClass(r, o.modalInClass).then(a)
            }))
        }
        var i = null;
        return t.has("$animateCss") && (i = t.get("$animateCss")), {
            restrict: "EA",
            replace: !0,
            templateUrl: "template/modal/backdrop.html",
            compile: function(e, t) {
                return e.addClass(t.backdropClass), r
            }
        }
    }]).directive("modalWindow", ["$modalStack", "$q", "$animate", "$injector", function(e, t, n, r) {
        var i = null;
        return r.has("$animateCss") && (i = r.get("$animateCss")), {
            restrict: "EA",
            scope: {
                index: "@"
            },
            replace: !0,
            transclude: !0,
            templateUrl: function(e, t) {
                return t.templateUrl || "template/modal/window.html"
            },
            link: function(r, o, a) {
                o.addClass(a.windowClass || ""), r.size = a.size, r.close = function(t) {
                    var n = e.getTop();
                    n && n.value.backdrop && "static" != n.value.backdrop && t.target === t.currentTarget && (t.preventDefault(), t.stopPropagation(), e.dismiss(n.key, "backdrop click"))
                }, r.$isRendered = !0;
                var s = t.defer();
                a.$observe("modalRender", function(e) {
                    "true" == e && s.resolve()
                }), s.promise.then(function() {
                    a.modalInClass && (i ? i(o, {
                        addClass: a.modalInClass
                    }).start() : n.addClass(o, a.modalInClass), r.$on(e.NOW_CLOSING_EVENT, function(e, t) {
                        var r = t();
                        i ? i(o, {
                            removeClass: a.modalInClass
                        }).start().then(r) : n.removeClass(o, a.modalInClass).then(r)
                    }));
                    var t = o[0].querySelectorAll("[autofocus]");
                    t.length ? t[0].focus() : o[0].focus();
                    var s = e.getTop();
                    s && e.modalRendered(s.key)
                })
            }
        }
    }]).directive("modalAnimationClass", [function() {
        return {
            compile: function(e, t) {
                t.modalAnimation && e.addClass(t.modalAnimationClass)
            }
        }
    }]).directive("modalTransclude", function() {
        return {
            link: function(e, t, n, r, i) {
                i(e.$parent, function(e) {
                    t.empty(), t.append(e)
                })
            }
        }
    }).factory("$modalStack", ["$animate", "$timeout", "$document", "$compile", "$rootScope", "$q", "$injector", "$$stackedMap", function(e, t, n, r, i, o, a, s) {
        function u() {
            for (var e = -1, t = $.keys(), n = 0; n < t.length; n++) $.get(t[n]).value.backdrop && (e = n);
            return e
        }

        function l(e, t) {
            var r = n.find("body").eq(0),
                i = $.get(e).value;
            $.remove(e), f(i.modalDomEl, i.modalScope, function() {
                r.toggleClass(e.openedClass || v, $.length() > 0)
            }), c(), t && t.focus ? t.focus() : r.focus()
        }

        function c() {
            if (h && -1 == u()) {
                var e = m;
                f(h, m, function() {
                    e = null
                }), h = void 0, m = void 0
            }
        }

        function f(t, n, r) {
            function i() {
                i.done || (i.done = !0, d ? d(t, {
                    event: "leave"
                }).start().then(function() {
                    t.remove()
                }) : e.leave(t), n.$destroy(), r && r())
            }
            var a, s = null,
                u = function() {
                    return a || (a = o.defer(), s = a.promise),
                        function() {
                            a.resolve()
                        }
                };
            return n.$broadcast(y.NOW_CLOSING_EVENT, u), o.when(s).then(i)
        }

        function p(e, t, n) {
            return !e.value.modalScope.$broadcast("modal.closing", t, n).defaultPrevented
        }
        var d = null;
        a.has("$animateCss") && (d = a.get("$animateCss"));
        var h, m, g, v = "modal-open",
            $ = s.createNew(),
            y = {
                NOW_CLOSING_EVENT: "modal.stack.now-closing"
            },
            b = 0,
            w = "a[href], area[href], input:not([disabled]), button:not([disabled]),select:not([disabled]), textarea:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable=true]";
        return i.$watch(u, function(e) {
            m && (m.index = e)
        }), n.bind("keydown", function(e) {
            if (e.isDefaultPrevented()) return e;
            var t = $.top();
            if (t && t.value.keyboard) switch (e.which) {
                case 27:
                    e.preventDefault(), i.$apply(function() {
                        y.dismiss(t.key, "escape key press")
                    });
                    break;
                case 9:
                    y.loadFocusElementList(t);
                    var n = !1;
                    e.shiftKey ? y.isFocusInFirstItem(e) && (n = y.focusLastFocusableElement()) : y.isFocusInLastItem(e) && (n = y.focusFirstFocusableElement()), n && (e.preventDefault(), e.stopPropagation())
            }
        }), y.open = function(e, t) {
            var o = n[0].activeElement;
            $.add(e, {
                deferred: t.deferred,
                renderDeferred: t.renderDeferred,
                modalScope: t.scope,
                backdrop: t.backdrop,
                keyboard: t.keyboard,
                openedClass: t.openedClass
            });
            var a = n.find("body").eq(0),
                s = u();
            if (s >= 0 && !h) {
                m = i.$new(!0), m.index = s;
                var l = angular.element('<div modal-backdrop="modal-backdrop"></div>');
                l.attr("backdrop-class", t.backdropClass), t.animation && l.attr("modal-animation", "true"), h = r(l)(m), a.append(h)
            }
            var c = angular.element('<div modal-window="modal-window"></div>');
            c.attr({
                "template-url": t.windowTemplateUrl,
                "window-class": t.windowClass,
                size: t.size,
                index: $.length() - 1,
                animate: "animate"
            }).html(t.content), t.animation && c.attr("modal-animation", "true");
            var f = r(c)(t.scope);
            $.top().value.modalDomEl = f, $.top().value.modalOpener = o, a.append(f), a.addClass(t.openedClass || v), y.clearFocusListCache()
        }, y.close = function(e, t) {
            var n = $.get(e);
            return n && p(n, t, !0) ? (n.value.modalScope.$$uibDestructionScheduled = !0, n.value.deferred.resolve(t), l(e, n.value.modalOpener), !0) : !n
        }, y.dismiss = function(e, t) {
            var n = $.get(e);
            return n && p(n, t, !1) ? (n.value.modalScope.$$uibDestructionScheduled = !0, n.value.deferred.reject(t), l(e, n.value.modalOpener), !0) : !n
        }, y.dismissAll = function(e) {
            for (var t = this.getTop(); t && this.dismiss(t.key, e);) t = this.getTop()
        }, y.getTop = function() {
            return $.top()
        }, y.modalRendered = function(e) {
            var t = $.get(e);
            t && t.value.renderDeferred.resolve()
        }, y.focusFirstFocusableElement = function() {
            return g.length > 0 ? (g[0].focus(), !0) : !1
        }, y.focusLastFocusableElement = function() {
            return g.length > 0 ? (g[g.length - 1].focus(), !0) : !1
        }, y.isFocusInFirstItem = function(e) {
            return g.length > 0 ? (e.target || e.srcElement) == g[0] : !1
        }, y.isFocusInLastItem = function(e) {
            return g.length > 0 ? (e.target || e.srcElement) == g[g.length - 1] : !1
        }, y.clearFocusListCache = function() {
            g = [], b = 0
        }, y.loadFocusElementList = function(e) {
            if ((void 0 === g || !g.length0) && e) {
                var t = e.value.modalDomEl;
                t && t.length && (g = t[0].querySelectorAll(w))
            }
        }, y
    }]).provider("$modal", function() {
        var e = {
            options: {
                animation: !0,
                backdrop: !0,
                keyboard: !0
            },
            $get: ["$injector", "$rootScope", "$q", "$templateRequest", "$controller", "$modalStack", function(t, n, r, i, o, a) {
                function s(e) {
                    return e.template ? r.when(e.template) : i(angular.isFunction(e.templateUrl) ? e.templateUrl() : e.templateUrl)
                }

                function u(e) {
                    var n = [];
                    return angular.forEach(e, function(e) {
                        angular.isFunction(e) || angular.isArray(e) ? n.push(r.when(t.invoke(e))) : angular.isString(e) && n.push(r.when(t.get(e)))
                    }), n
                }
                var l = {};
                return l.open = function(t) {
                    var i = r.defer(),
                        l = r.defer(),
                        c = r.defer(),
                        f = {
                            result: i.promise,
                            opened: l.promise,
                            rendered: c.promise,
                            close: function(e) {
                                return a.close(f, e)
                            },
                            dismiss: function(e) {
                                return a.dismiss(f, e)
                            }
                        };
                    if (t = angular.extend({}, e.options, t), t.resolve = t.resolve || {}, !t.template && !t.templateUrl) throw new Error("One of template or templateUrl options is required.");
                    var p = r.all([s(t)].concat(u(t.resolve)));
                    return p.then(function(e) {
                        var r = (t.scope || n).$new();
                        r.$close = f.close, r.$dismiss = f.dismiss, r.$on("$destroy", function() {
                            r.$$uibDestructionScheduled || r.$dismiss("$uibUnscheduledDestruction")
                        });
                        var s, u = {},
                            l = 1;
                        t.controller && (u.$scope = r, u.$modalInstance = f, angular.forEach(t.resolve, function(t, n) {
                            u[n] = e[l++]
                        }), s = o(t.controller, u), t.controllerAs && (t.bindToController && angular.extend(s, r), r[t.controllerAs] = s)), a.open(f, {
                            scope: r,
                            deferred: i,
                            renderDeferred: c,
                            content: e[0],
                            animation: t.animation,
                            backdrop: t.backdrop,
                            keyboard: t.keyboard,
                            backdropClass: t.backdropClass,
                            windowClass: t.windowClass,
                            windowTemplateUrl: t.windowTemplateUrl,
                            size: t.size,
                            openedClass: t.openedClass
                        })
                    }, function(e) {
                        i.reject(e)
                    }), p.then(function() {
                        l.resolve(!0)
                    }, function(e) {
                        l.reject(e)
                    }), f
                }, l
            }]
        };
        return e
    }), angular.module("ui.bootstrap.pagination", []).controller("PaginationController", ["$scope", "$attrs", "$parse", function(e, t, n) {
        var r = this,
            i = {
                $setViewValue: angular.noop
            },
            o = t.numPages ? n(t.numPages).assign : angular.noop;
        this.init = function(a, s) {
            i = a, this.config = s, i.$render = function() {
                r.render()
            }, t.itemsPerPage ? e.$parent.$watch(n(t.itemsPerPage), function(t) {
                r.itemsPerPage = parseInt(t, 10), e.totalPages = r.calculateTotalPages()
            }) : this.itemsPerPage = s.itemsPerPage, e.$watch("totalItems", function() {
                e.totalPages = r.calculateTotalPages()
            }), e.$watch("totalPages", function(t) {
                o(e.$parent, t), e.page > t ? e.selectPage(t) : i.$render()
            })
        }, this.calculateTotalPages = function() {
            var t = this.itemsPerPage < 1 ? 1 : Math.ceil(e.totalItems / this.itemsPerPage);
            return Math.max(t || 0, 1)
        }, this.render = function() {
            e.page = parseInt(i.$viewValue, 10) || 1
        }, e.selectPage = function(t, n) {
            n && n.preventDefault();
            var r = !e.ngDisabled || !n;
            r && e.page !== t && t > 0 && t <= e.totalPages && (n && n.target && n.target.blur(), i.$setViewValue(t), i.$render())
        }, e.getText = function(t) {
            return e[t + "Text"] || r.config[t + "Text"]
        }, e.noPrevious = function() {
            return 1 === e.page
        }, e.noNext = function() {
            return e.page === e.totalPages
        }
    }]).constant("paginationConfig", {
        itemsPerPage: 10,
        boundaryLinks: !1,
        directionLinks: !0,
        firstText: "First",
        previousText: "Previous",
        nextText: "Next",
        lastText: "Last",
        rotate: !0
    }).directive("pagination", ["$parse", "paginationConfig", function(e, t) {
        return {
            restrict: "EA",
            scope: {
                totalItems: "=",
                firstText: "@",
                previousText: "@",
                nextText: "@",
                lastText: "@",
                ngDisabled: "="
            },
            require: ["pagination", "?ngModel"],
            controller: "PaginationController",
            controllerAs: "pagination",
            templateUrl: function(e, t) {
                return t.templateUrl || "template/pagination/pagination.html"
            },
            replace: !0,
            link: function(n, r, i, o) {
                function a(e, t, n) {
                    return {
                        number: e,
                        text: t,
                        active: n
                    }
                }

                function s(e, t) {
                    var n = [],
                        r = 1,
                        i = t,
                        o = angular.isDefined(c) && t > c;
                    o && (f ? (r = Math.max(e - Math.floor(c / 2), 1), i = r + c - 1, i > t && (i = t, r = i - c + 1)) : (r = (Math.ceil(e / c) - 1) * c + 1, i = Math.min(r + c - 1, t)));
                    for (var s = r; i >= s; s++) {
                        var u = a(s, s, s === e);
                        n.push(u)
                    }
                    if (o && !f) {
                        if (r > 1) {
                            var l = a(r - 1, "...", !1);
                            n.unshift(l)
                        }
                        if (t > i) {
                            var p = a(i + 1, "...", !1);
                            n.push(p)
                        }
                    }
                    return n
                }
                var u = o[0],
                    l = o[1];
                if (l) {
                    var c = angular.isDefined(i.maxSize) ? n.$parent.$eval(i.maxSize) : t.maxSize,
                        f = angular.isDefined(i.rotate) ? n.$parent.$eval(i.rotate) : t.rotate;
                    n.boundaryLinks = angular.isDefined(i.boundaryLinks) ? n.$parent.$eval(i.boundaryLinks) : t.boundaryLinks, n.directionLinks = angular.isDefined(i.directionLinks) ? n.$parent.$eval(i.directionLinks) : t.directionLinks, u.init(l, t), i.maxSize && n.$parent.$watch(e(i.maxSize), function(e) {
                        c = parseInt(e, 10), u.render()
                    });
                    var p = u.render;
                    u.render = function() {
                        p(), n.page > 0 && n.page <= n.totalPages && (n.pages = s(n.page, n.totalPages))
                    }
                }
            }
        }
    }]).constant("pagerConfig", {
        itemsPerPage: 10,
        previousText: "« Previous",
        nextText: "Next »",
        align: !0
    }).directive("pager", ["pagerConfig", function(e) {
        return {
            restrict: "EA",
            scope: {
                totalItems: "=",
                previousText: "@",
                nextText: "@"
            },
            require: ["pager", "?ngModel"],
            controller: "PaginationController",
            templateUrl: "template/pagination/pager.html",
            replace: !0,
            link: function(t, n, r, i) {
                var o = i[0],
                    a = i[1];
                a && (t.align = angular.isDefined(r.align) ? t.$parent.$eval(r.align) : e.align, o.init(a, e))
            }
        }
    }]), angular.module("ui.bootstrap.tooltip", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).provider("$tooltip", function() {
        function e(e) {
            var t = /[A-Z]/g,
                n = "-";
            return e.replace(t, function(e, t) {
                return (t ? n : "") + e.toLowerCase()
            })
        }
        var t = {
                placement: "top",
                animation: !0,
                popupDelay: 0,
                useContentExp: !1
            },
            n = {
                mouseenter: "mouseleave",
                click: "click",
                focus: "blur"
            },
            r = {};
        this.options = function(e) {
            angular.extend(r, e)
        }, this.setTriggers = function(e) {
            angular.extend(n, e)
        }, this.$get = ["$window", "$compile", "$timeout", "$document", "$position", "$interpolate", "$rootScope", function(i, o, a, s, u, l, c) {
            return function(i, f, p, d) {
                function h(e) {
                    var t = (e || d.trigger || p).split(" "),
                        r = t.map(function(e) {
                            return n[e] || e
                        });
                    return {
                        show: t,
                        hide: r
                    }
                }
                d = angular.extend({}, t, r, d);
                var m = e(i),
                    g = l.startSymbol(),
                    v = l.endSymbol(),
                    $ = "<div " + m + '-popup title="' + g + "title" + v + '" ' + (d.useContentExp ? 'content-exp="contentExp()" ' : 'content="' + g + "content" + v + '" ') + 'placement="' + g + "placement" + v + '" popup-class="' + g + "popupClass" + v + '" animation="animation" is-open="isOpen"origin-scope="origScope" ></div>';
                return {
                    restrict: "EA",
                    compile: function(e, t) {
                        var n = o($);
                        return function(e, t, r, o) {
                            function l() {
                                j.isOpen ? m() : p()
                            }

                            function p() {
                                (!M || e.$eval(r[f + "Enable"])) && (b(), j.popupDelay ? D || (D = a(g, j.popupDelay, !1), D.then(function(e) {
                                    e()
                                })) : g()())
                            }

                            function m() {
                                v(), c.$$phase || c.$digest()
                            }

                            function g() {
                                return D = null, T && (a.cancel(T), T = null), (d.useContentExp ? j.contentExp() : j.content) ? ($(), S.css({
                                    top: 0,
                                    left: 0,
                                    display: "block"
                                }), P(), j.isOpen = !0, j.$apply(), P) : angular.noop
                            }

                            function v() {
                                j.isOpen = !1, a.cancel(D), D = null, j.animation ? T || (T = a(y, 500)) : y()
                            }

                            function $() {
                                S && y(), E = j.$new(), S = n(E, function(e) {
                                    A ? s.find("body").append(e) : t.after(e)
                                }), d.useContentExp && (E.$watch("contentExp()", function(e) {
                                    !e && j.isOpen && v()
                                }), E.$watch(function() {
                                    N || (N = !0, E.$$postDigest(function() {
                                        N = !1, L()
                                    }))
                                }))
                            }

                            function y() {
                                T = null, S && (S.remove(), S = null), E && (E.$destroy(), E = null)
                            }

                            function b() {
                                w(), x(), C()
                            }

                            function w() {
                                j.popupClass = r[f + "Class"]
                            }

                            function x() {
                                var e = r[f + "Placement"];
                                j.placement = angular.isDefined(e) ? e : d.placement
                            }

                            function C() {
                                var e = r[f + "PopupDelay"],
                                    t = parseInt(e, 10);
                                j.popupDelay = isNaN(t) ? d.popupDelay : t
                            }

                            function k() {
                                var e = r[f + "Trigger"];
                                I(), O = h(e), O.show.forEach(function(e, n) {
                                    e === O.hide[n] ? t.bind(e, l) : e && (t.bind(e, p), t.bind(O.hide[n], m))
                                })
                            }
                            var S, E, T, D, A = angular.isDefined(d.appendToBody) ? d.appendToBody : !1,
                                O = h(void 0),
                                M = angular.isDefined(r[f + "Enable"]),
                                j = e.$new(!0),
                                N = !1,
                                P = function() {
                                    if (S) {
                                        var e = u.positionElements(t, S, j.placement, A);
                                        e.top += "px", e.left += "px", S.css(e)
                                    }
                                },
                                L = function() {
                                    a(P, 0, !1)
                                };
                            j.origScope = e, j.isOpen = !1, j.contentExp = function() {
                                return e.$eval(r[i])
                            }, d.useContentExp || r.$observe(i, function(e) {
                                j.content = e, !e && j.isOpen ? v() : L()
                            }), r.$observe("disabled", function(e) {
                                D && e && a.cancel(D), e && j.isOpen && v()
                            }), r.$observe(f + "Title", function(e) {
                                j.title = e, L()
                            }), r.$observe(f + "Placement", function() {
                                j.isOpen && a(function() {
                                    x(), g()()
                                }, 0, !1)
                            });
                            var I = function() {
                                O.show.forEach(function(e) {
                                    t.unbind(e, p)
                                }), O.hide.forEach(function(e) {
                                    t.unbind(e, m)
                                })
                            };
                            k();
                            var q = e.$eval(r[f + "Animation"]);
                            j.animation = angular.isDefined(q) ? !!q : d.animation;
                            var V = e.$eval(r[f + "AppendToBody"]);
                            A = angular.isDefined(V) ? V : A, A && e.$on("$locationChangeSuccess", function() {
                                j.isOpen && v()
                            }), e.$on("$destroy", function() {
                                a.cancel(T), a.cancel(D), I(), y(), j = null
                            })
                        }
                    }
                }
            }
        }]
    }).directive("tooltipTemplateTransclude", ["$animate", "$sce", "$compile", "$templateRequest", function(e, t, n, r) {
        return {
            link: function(i, o, a) {
                var s, u, l, c = i.$eval(a.tooltipTemplateTranscludeScope),
                    f = 0,
                    p = function() {
                        u && (u.remove(), u = null), s && (s.$destroy(), s = null), l && (e.leave(l).then(function() {
                            u = null
                        }), u = l, l = null)
                    };
                i.$watch(t.parseAsResourceUrl(a.tooltipTemplateTransclude), function(t) {
                    var a = ++f;
                    t ? (r(t, !0).then(function(r) {
                        if (a === f) {
                            var i = c.$new(),
                                u = r,
                                d = n(u)(i, function(t) {
                                    p(), e.enter(t, o)
                                });
                            s = i, l = d, s.$emit("$includeContentLoaded", t)
                        }
                    }, function() {
                        a === f && (p(), i.$emit("$includeContentError", t))
                    }), i.$emit("$includeContentRequested", t)) : p()
                }), i.$on("$destroy", p)
            }
        }
    }]).directive("tooltipClasses", function() {
        return {
            restrict: "A",
            link: function(e, t, n) {
                e.placement && t.addClass(e.placement), e.popupClass && t.addClass(e.popupClass), e.animation() && t.addClass(n.tooltipAnimationClass)
            }
        }
    }).directive("tooltipPopup", function() {
        return {
            restrict: "EA",
            replace: !0,
            scope: {
                content: "@",
                placement: "@",
                popupClass: "@",
                animation: "&",
                isOpen: "&"
            },
            templateUrl: "template/tooltip/tooltip-popup.html"
        }
    }).directive("tooltip", ["$tooltip", function(e) {
        return e("tooltip", "tooltip", "mouseenter")
    }]).directive("tooltipTemplatePopup", function() {
        return {
            restrict: "EA",
            replace: !0,
            scope: {
                contentExp: "&",
                placement: "@",
                popupClass: "@",
                animation: "&",
                isOpen: "&",
                originScope: "&"
            },
            templateUrl: "template/tooltip/tooltip-template-popup.html"
        }
    }).directive("tooltipTemplate", ["$tooltip", function(e) {
        return e("tooltipTemplate", "tooltip", "mouseenter", {
            useContentExp: !0
        })
    }]).directive("tooltipHtmlPopup", function() {
        return {
            restrict: "EA",
            replace: !0,
            scope: {
                contentExp: "&",
                placement: "@",
                popupClass: "@",
                animation: "&",
                isOpen: "&"
            },
            templateUrl: "template/tooltip/tooltip-html-popup.html"
        }
    }).directive("tooltipHtml", ["$tooltip", function(e) {
        return e("tooltipHtml", "tooltip", "mouseenter", {
            useContentExp: !0
        })
    }]).directive("tooltipHtmlUnsafePopup", function() {
        return {
            restrict: "EA",
            replace: !0,
            scope: {
                content: "@",
                placement: "@",
                popupClass: "@",
                animation: "&",
                isOpen: "&"
            },
            templateUrl: "template/tooltip/tooltip-html-unsafe-popup.html"
        }
    }).value("tooltipHtmlUnsafeSuppressDeprecated", !1).directive("tooltipHtmlUnsafe", ["$tooltip", "tooltipHtmlUnsafeSuppressDeprecated", "$log", function(e, t, n) {
        return t || n.warn("tooltip-html-unsafe is now deprecated. Use tooltip-html or tooltip-template instead."), e("tooltipHtmlUnsafe", "tooltip", "mouseenter")
    }]), angular.module("ui.bootstrap.popover", ["ui.bootstrap.tooltip"]).directive("popoverTemplatePopup", function() {
        return {
            restrict: "EA",
            replace: !0,
            scope: {
                title: "@",
                contentExp: "&",
                placement: "@",
                popupClass: "@",
                animation: "&",
                isOpen: "&",
                originScope: "&"
            },
            templateUrl: "template/popover/popover-template.html"
        }
    }).directive("popoverTemplate", ["$tooltip", function(e) {
        return e("popoverTemplate", "popover", "click", {
            useContentExp: !0
        })
    }]).directive("popoverHtmlPopup", function() {
        return {
            restrict: "EA",
            replace: !0,
            scope: {
                contentExp: "&",
                title: "@",
                placement: "@",
                popupClass: "@",
                animation: "&",
                isOpen: "&"
            },
            templateUrl: "template/popover/popover-html.html"
        }
    }).directive("popoverHtml", ["$tooltip", function(e) {
        return e("popoverHtml", "popover", "click", {
            useContentExp: !0
        })
    }]).directive("popoverPopup", function() {
        return {
            restrict: "EA",
            replace: !0,
            scope: {
                title: "@",
                content: "@",
                placement: "@",
                popupClass: "@",
                animation: "&",
                isOpen: "&"
            },
            templateUrl: "template/popover/popover.html"
        }
    }).directive("popover", ["$tooltip", function(e) {
        return e("popover", "popover", "click")
    }]), angular.module("ui.bootstrap.progressbar", []).constant("progressConfig", {
        animate: !0,
        max: 100
    }).controller("ProgressController", ["$scope", "$attrs", "progressConfig", function(e, t, n) {
        var r = this,
            i = angular.isDefined(t.animate) ? e.$parent.$eval(t.animate) : n.animate;
        this.bars = [], e.max = angular.isDefined(e.max) ? e.max : n.max, this.addBar = function(t, n) {
            i || n.css({
                transition: "none"
            }), this.bars.push(t), t.max = e.max, t.$watch("value", function(e) {
                t.recalculatePercentage()
            }), t.recalculatePercentage = function() {
                t.percent = +(100 * t.value / t.max).toFixed(2);
                var e = 0;
                r.bars.forEach(function(t) {
                    e += t.percent
                }), e > 100 && (t.percent -= e - 100)
            }, t.$on("$destroy", function() {
                n = null, r.removeBar(t)
            })
        }, this.removeBar = function(e) {
            this.bars.splice(this.bars.indexOf(e), 1)
        }, e.$watch("max", function(t) {
            r.bars.forEach(function(t) {
                t.max = e.max, t.recalculatePercentage()
            })
        })
    }]).directive("progress", function() {
        return {
            restrict: "EA",
            replace: !0,
            transclude: !0,
            controller: "ProgressController",
            require: "progress",
            scope: {
                max: "=?"
            },
            templateUrl: "template/progressbar/progress.html"
        }
    }).directive("bar", function() {
        return {
            restrict: "EA",
            replace: !0,
            transclude: !0,
            require: "^progress",
            scope: {
                value: "=",
                type: "@"
            },
            templateUrl: "template/progressbar/bar.html",
            link: function(e, t, n, r) {
                r.addBar(e, t)
            }
        }
    }).directive("progressbar", function() {
        return {
            restrict: "EA",
            replace: !0,
            transclude: !0,
            controller: "ProgressController",
            scope: {
                value: "=",
                max: "=?",
                type: "@"
            },
            templateUrl: "template/progressbar/progressbar.html",
            link: function(e, t, n, r) {
                r.addBar(e, angular.element(t.children()[0]))
            }
        }
    }), angular.module("ui.bootstrap.rating", []).constant("ratingConfig", {
        max: 5,
        stateOn: null,
        stateOff: null,
        titles: ["one", "two", "three", "four", "five"]
    }).controller("RatingController", ["$scope", "$attrs", "ratingConfig", function(e, t, n) {
        var r = {
            $setViewValue: angular.noop
        };
        this.init = function(i) {
            r = i, r.$render = this.render, r.$formatters.push(function(e) {
                return angular.isNumber(e) && e << 0 !== e && (e = Math.round(e)), e
            }), this.stateOn = angular.isDefined(t.stateOn) ? e.$parent.$eval(t.stateOn) : n.stateOn, this.stateOff = angular.isDefined(t.stateOff) ? e.$parent.$eval(t.stateOff) : n.stateOff;
            var o = angular.isDefined(t.titles) ? e.$parent.$eval(t.titles) : n.titles;
            this.titles = angular.isArray(o) && o.length > 0 ? o : n.titles;
            var a = angular.isDefined(t.ratingStates) ? e.$parent.$eval(t.ratingStates) : new Array(angular.isDefined(t.max) ? e.$parent.$eval(t.max) : n.max);
            e.range = this.buildTemplateObjects(a)
        }, this.buildTemplateObjects = function(e) {
            for (var t = 0, n = e.length; n > t; t++) e[t] = angular.extend({
                index: t
            }, {
                stateOn: this.stateOn,
                stateOff: this.stateOff,
                title: this.getTitle(t)
            }, e[t]);
            return e
        }, this.getTitle = function(e) {
            return e >= this.titles.length ? e + 1 : this.titles[e]
        }, e.rate = function(t) {
            !e.readonly && t >= 0 && t <= e.range.length && (r.$setViewValue(r.$viewValue === t ? 0 : t), r.$render())
        }, e.enter = function(t) {
            e.readonly || (e.value = t), e.onHover({
                value: t
            })
        }, e.reset = function() {
            e.value = r.$viewValue, e.onLeave()
        }, e.onKeydown = function(t) {
            /(37|38|39|40)/.test(t.which) && (t.preventDefault(), t.stopPropagation(), e.rate(e.value + (38 === t.which || 39 === t.which ? 1 : -1)))
        }, this.render = function() {
            e.value = r.$viewValue
        }
    }]).directive("rating", function() {
        return {
            restrict: "EA",
            require: ["rating", "ngModel"],
            scope: {
                readonly: "=?",
                onHover: "&",
                onLeave: "&"
            },
            controller: "RatingController",
            templateUrl: "template/rating/rating.html",
            replace: !0,
            link: function(e, t, n, r) {
                var i = r[0],
                    o = r[1];
                i.init(o)
            }
        }
    }), angular.module("ui.bootstrap.tabs", []).controller("TabsetController", ["$scope", function(e) {
        var t = this,
            n = t.tabs = e.tabs = [];
        t.select = function(e) {
            angular.forEach(n, function(t) {
                t.active && t !== e && (t.active = !1, t.onDeselect())
            }), e.active = !0, e.onSelect()
        }, t.addTab = function(e) {
            n.push(e), 1 === n.length && e.active !== !1 ? e.active = !0 : e.active ? t.select(e) : e.active = !1
        }, t.removeTab = function(e) {
            var i = n.indexOf(e);
            if (e.active && n.length > 1 && !r) {
                var o = i == n.length - 1 ? i - 1 : i + 1;
                t.select(n[o])
            }
            n.splice(i, 1)
        };
        var r;
        e.$on("$destroy", function() {
            r = !0
        })
    }]).directive("tabset", function() {
        return {
            restrict: "EA",
            transclude: !0,
            replace: !0,
            scope: {
                type: "@"
            },
            controller: "TabsetController",
            templateUrl: "template/tabs/tabset.html",
            link: function(e, t, n) {
                e.vertical = angular.isDefined(n.vertical) ? e.$parent.$eval(n.vertical) : !1, e.justified = angular.isDefined(n.justified) ? e.$parent.$eval(n.justified) : !1
            }
        }
    }).directive("tab", ["$parse", "$log", function(e, t) {
        return {
            require: "^tabset",
            restrict: "EA",
            replace: !0,
            templateUrl: "template/tabs/tab.html",
            transclude: !0,
            scope: {
                active: "=?",
                heading: "@",
                onSelect: "&select",
                onDeselect: "&deselect"
            },
            controller: function() {},
            link: function(n, r, i, o, a) {
                n.$watch("active", function(e) {
                    e && o.select(n)
                }), n.disabled = !1, i.disable && n.$parent.$watch(e(i.disable), function(e) {
                    n.disabled = !!e
                }), i.disabled && (t.warn('Use of "disabled" attribute has been deprecated, please use "disable"'), n.$parent.$watch(e(i.disabled), function(e) {
                    n.disabled = !!e
                })), n.select = function() {
                    n.disabled || (n.active = !0)
                }, o.addTab(n), n.$on("$destroy", function() {
                    o.removeTab(n)
                }), n.$transcludeFn = a
            }
        }
    }]).directive("tabHeadingTransclude", [function() {
        return {
            restrict: "A",
            require: "^tab",
            link: function(e, t, n, r) {
                e.$watch("headingElement", function(e) {
                    e && (t.html(""), t.append(e))
                })
            }
        }
    }]).directive("tabContentTransclude", function() {
        function e(e) {
            return e.tagName && (e.hasAttribute("tab-heading") || e.hasAttribute("data-tab-heading") || "tab-heading" === e.tagName.toLowerCase() || "data-tab-heading" === e.tagName.toLowerCase())
        }
        return {
            restrict: "A",
            require: "^tabset",
            link: function(t, n, r) {
                var i = t.$eval(r.tabContentTransclude);
                i.$transcludeFn(i.$parent, function(t) {
                    angular.forEach(t, function(t) {
                        e(t) ? i.headingElement = t : n.append(t)
                    })
                })
            }
        }
    }), angular.module("ui.bootstrap.timepicker", []).constant("timepickerConfig", {
        hourStep: 1,
        minuteStep: 1,
        showMeridian: !0,
        meridians: null,
        readonlyInput: !1,
        mousewheel: !0,
        arrowkeys: !0,
        showSpinners: !0
    }).controller("TimepickerController", ["$scope", "$attrs", "$parse", "$log", "$locale", "timepickerConfig", function(e, t, n, r, i, o) {
        function a() {
            var t = parseInt(e.hours, 10),
                n = e.showMeridian ? t > 0 && 13 > t : t >= 0 && 24 > t;
            return n ? (e.showMeridian && (12 === t && (t = 0), e.meridian === g[1] && (t += 12)), t) : void 0
        }

        function s() {
            var t = parseInt(e.minutes, 10);
            return t >= 0 && 60 > t ? t : void 0
        }

        function u(e) {
            return angular.isDefined(e) && e.toString().length < 2 ? "0" + e : e.toString()
        }

        function l(e) {
            c(), m.$setViewValue(new Date(h)), f(e)
        }

        function c() {
            m.$setValidity("time", !0), e.invalidHours = !1, e.invalidMinutes = !1
        }

        function f(t) {
            var n = h.getHours(),
                r = h.getMinutes();
            e.showMeridian && (n = 0 === n || 12 === n ? 12 : n % 12), e.hours = "h" === t ? n : u(n), "m" !== t && (e.minutes = u(r)), e.meridian = h.getHours() < 12 ? g[0] : g[1]
        }

        function p(e, t) {
            var n = new Date(e.getTime() + 6e4 * t),
                r = new Date(e);
            return r.setHours(n.getHours(), n.getMinutes()), r
        }

        function d(e) {
            h = p(h, e), l()
        }
        var h = new Date,
            m = {
                $setViewValue: angular.noop
            },
            g = angular.isDefined(t.meridians) ? e.$parent.$eval(t.meridians) : o.meridians || i.DATETIME_FORMATS.AMPMS;
        this.init = function(n, r) {
            m = n, m.$render = this.render, m.$formatters.unshift(function(e) {
                return e ? new Date(e) : null
            });
            var i = r.eq(0),
                a = r.eq(1),
                s = angular.isDefined(t.mousewheel) ? e.$parent.$eval(t.mousewheel) : o.mousewheel;
            s && this.setupMousewheelEvents(i, a);
            var u = angular.isDefined(t.arrowkeys) ? e.$parent.$eval(t.arrowkeys) : o.arrowkeys;
            u && this.setupArrowkeyEvents(i, a), e.readonlyInput = angular.isDefined(t.readonlyInput) ? e.$parent.$eval(t.readonlyInput) : o.readonlyInput, this.setupInputEvents(i, a)
        };
        var v = o.hourStep;
        t.hourStep && e.$parent.$watch(n(t.hourStep), function(e) {
            v = parseInt(e, 10)
        });
        var $ = o.minuteStep;
        t.minuteStep && e.$parent.$watch(n(t.minuteStep), function(e) {
            $ = parseInt(e, 10)
        });
        var y;
        e.$parent.$watch(n(t.min), function(e) {
            var t = new Date(e);
            y = isNaN(t) ? void 0 : t
        });
        var b;
        e.$parent.$watch(n(t.max), function(e) {
            var t = new Date(e);
            b = isNaN(t) ? void 0 : t
        }), e.noIncrementHours = function() {
            var e = p(h, 60 * v);
            return e > b || h > e && y > e
        }, e.noDecrementHours = function() {
            var e = p(h, 60 * -v);
            return y > e || e > h && e > b
        }, e.noIncrementMinutes = function() {
            var e = p(h, $);
            return e > b || h > e && y > e
        }, e.noDecrementMinutes = function() {
            var e = p(h, -$);
            return y > e || e > h && e > b
        }, e.noToggleMeridian = function() {
            return h.getHours() < 13 ? p(h, 720) > b : p(h, -720) < y
        }, e.showMeridian = o.showMeridian, t.showMeridian && e.$parent.$watch(n(t.showMeridian), function(t) {
            if (e.showMeridian = !!t, m.$error.time) {
                var n = a(),
                    r = s();
                angular.isDefined(n) && angular.isDefined(r) && (h.setHours(n), l())
            } else f()
        }), this.setupMousewheelEvents = function(t, n) {
            var r = function(e) {
                e.originalEvent && (e = e.originalEvent);
                var t = e.wheelDelta ? e.wheelDelta : -e.deltaY;
                return e.detail || t > 0
            };
            t.bind("mousewheel wheel", function(t) {
                e.$apply(r(t) ? e.incrementHours() : e.decrementHours()), t.preventDefault()
            }), n.bind("mousewheel wheel", function(t) {
                e.$apply(r(t) ? e.incrementMinutes() : e.decrementMinutes()), t.preventDefault()
            })
        }, this.setupArrowkeyEvents = function(t, n) {
            t.bind("keydown", function(t) {
                38 === t.which ? (t.preventDefault(), e.incrementHours(), e.$apply()) : 40 === t.which && (t.preventDefault(), e.decrementHours(), e.$apply())
            }), n.bind("keydown", function(t) {
                38 === t.which ? (t.preventDefault(), e.incrementMinutes(), e.$apply()) : 40 === t.which && (t.preventDefault(), e.decrementMinutes(), e.$apply())
            })
        }, this.setupInputEvents = function(t, n) {
            if (e.readonlyInput) return e.updateHours = angular.noop, void(e.updateMinutes = angular.noop);
            var r = function(t, n) {
                m.$setViewValue(null), m.$setValidity("time", !1), angular.isDefined(t) && (e.invalidHours = t), angular.isDefined(n) && (e.invalidMinutes = n)
            };
            e.updateHours = function() {
                var e = a();
                angular.isDefined(e) ? (h.setHours(e), y > h || h > b ? r(!0) : l("h")) : r(!0)
            }, t.bind("blur", function(t) {
                !e.invalidHours && e.hours < 10 && e.$apply(function() {
                    e.hours = u(e.hours)
                })
            }), e.updateMinutes = function() {
                var e = s();
                angular.isDefined(e) ? (h.setMinutes(e), y > h || h > b ? r(void 0, !0) : l("m")) : r(void 0, !0)
            }, n.bind("blur", function(t) {
                !e.invalidMinutes && e.minutes < 10 && e.$apply(function() {
                    e.minutes = u(e.minutes)
                })
            })
        }, this.render = function() {
            var t = m.$viewValue;
            isNaN(t) ? (m.$setValidity("time", !1), r.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')) : (t && (h = t), y > h || h > b ? (m.$setValidity("time", !1), e.invalidHours = !0, e.invalidMinutes = !0) : c(), f())
        }, e.showSpinners = angular.isDefined(t.showSpinners) ? e.$parent.$eval(t.showSpinners) : o.showSpinners, e.incrementHours = function() {
            e.noIncrementHours() || d(60 * v)
        }, e.decrementHours = function() {
            e.noDecrementHours() || d(60 * -v)
        }, e.incrementMinutes = function() {
            e.noIncrementMinutes() || d($)
        }, e.decrementMinutes = function() {
            e.noDecrementMinutes() || d(-$)
        }, e.toggleMeridian = function() {
            e.noToggleMeridian() || d(720 * (h.getHours() < 12 ? 1 : -1))
        }
    }]).directive("timepicker", function() {
        return {
            restrict: "EA",
            require: ["timepicker", "?^ngModel"],
            controller: "TimepickerController",
            replace: !0,
            scope: {},
            templateUrl: "template/timepicker/timepicker.html",
            link: function(e, t, n, r) {
                var i = r[0],
                    o = r[1];
                o && i.init(o, t.find("input"))
            }
        }
    }), angular.module("ui.bootstrap.transition", []).value("$transitionSuppressDeprecated", !1).factory("$transition", ["$q", "$timeout", "$rootScope", "$log", "$transitionSuppressDeprecated", function(e, t, n, r, i) {
        function o(e) {
            for (var t in e)
                if (void 0 !== s.style[t]) return e[t]
        }
        i || r.warn("$transition is now deprecated. Use $animate from ngAnimate instead.");
        var a = function(r, i, o) {
                o = o || {};
                var s = e.defer(),
                    u = a[o.animation ? "animationEndEventName" : "transitionEndEventName"],
                    l = function(e) {
                        n.$apply(function() {
                            r.unbind(u, l), s.resolve(r)
                        })
                    };
                return u && r.bind(u, l), t(function() {
                    angular.isString(i) ? r.addClass(i) : angular.isFunction(i) ? i(r) : angular.isObject(i) && r.css(i), u || s.resolve(r)
                }), s.promise.cancel = function() {
                    u && r.unbind(u, l), s.reject("Transition cancelled")
                }, s.promise
            },
            s = document.createElement("trans"),
            u = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd",
                transition: "transitionend"
            },
            l = {
                WebkitTransition: "webkitAnimationEnd",
                MozTransition: "animationend",
                OTransition: "oAnimationEnd",
                transition: "animationend"
            };
        return a.transitionEndEventName = o(u), a.animationEndEventName = o(l), a
    }]), angular.module("ui.bootstrap.typeahead", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).factory("typeaheadParser", ["$parse", function(e) {
        var t = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
        return {
            parse: function(n) {
                var r = n.match(t);
                if (!r) throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "' + n + '".');
                return {
                    itemName: r[3],
                    source: e(r[4]),
                    viewMapper: e(r[2] || r[1]),
                    modelMapper: e(r[1])
                }
            }
        }
    }]).directive("typeahead", ["$compile", "$parse", "$q", "$timeout", "$document", "$window", "$rootScope", "$position", "typeaheadParser", function(e, t, n, r, i, o, a, s, u) {
        var l = [9, 13, 27, 38, 40],
            c = 200;
        return {
            require: "ngModel",
            link: function(f, p, d, h) {
                function m() {
                    j.moveInProgress || (j.moveInProgress = !0, j.$digest()), F && r.cancel(F), F = r(function() {
                        j.matches.length && g(), j.moveInProgress = !1, j.$digest()
                    }, c)
                }

                function g() {
                    j.position = T ? s.offset(p) : s.position(p), j.position.top += p.prop("offsetHeight")
                }
                var v = f.$eval(d.typeaheadMinLength);
                v || 0 === v || (v = 1);
                var $, y, b = f.$eval(d.typeaheadWaitMs) || 0,
                    w = f.$eval(d.typeaheadEditable) !== !1,
                    x = t(d.typeaheadLoading).assign || angular.noop,
                    C = t(d.typeaheadOnSelect),
                    k = angular.isDefined(d.typeaheadSelectOnBlur) ? f.$eval(d.typeaheadSelectOnBlur) : !1,
                    S = t(d.typeaheadNoResults).assign || angular.noop,
                    E = d.typeaheadInputFormatter ? t(d.typeaheadInputFormatter) : void 0,
                    T = d.typeaheadAppendToBody ? f.$eval(d.typeaheadAppendToBody) : !1,
                    D = f.$eval(d.typeaheadFocusFirst) !== !1,
                    A = d.typeaheadSelectOnExact ? f.$eval(d.typeaheadSelectOnExact) : !1,
                    O = t(d.ngModel).assign,
                    M = u.parse(d.typeahead),
                    j = f.$new();
                f.$on("$destroy", function() {
                    j.$destroy()
                });
                var N = "typeahead-" + j.$id + "-" + Math.floor(1e4 * Math.random());
                p.attr({
                    "aria-autocomplete": "list",
                    "aria-expanded": !1,
                    "aria-owns": N
                });
                var P = angular.element("<div typeahead-popup></div>");
                P.attr({
                    id: N,
                    matches: "matches",
                    active: "activeIdx",
                    select: "select(activeIdx)",
                    "move-in-progress": "moveInProgress",
                    query: "query",
                    position: "position"
                }), angular.isDefined(d.typeaheadTemplateUrl) && P.attr("template-url", d.typeaheadTemplateUrl);
                var L = function() {
                        j.matches = [], j.activeIdx = -1, p.attr("aria-expanded", !1)
                    },
                    I = function(e) {
                        return N + "-option-" + e
                    };
                j.$watch("activeIdx", function(e) {
                    0 > e ? p.removeAttr("aria-activedescendant") : p.attr("aria-activedescendant", I(e))
                });
                var q = function(e, t) {
                        return j.matches.length > t && e ? e.toUpperCase() === j.matches[t].label.toUpperCase() : !1
                    },
                    V = function(e) {
                        var t = {
                            $viewValue: e
                        };
                        x(f, !0), S(f, !1), n.when(M.source(f, t)).then(function(n) {
                            var r = e === h.$viewValue;
                            if (r && $)
                                if (n && n.length > 0) {
                                    j.activeIdx = D ? 0 : -1, S(f, !1), j.matches.length = 0;
                                    for (var i = 0; i < n.length; i++) t[M.itemName] = n[i], j.matches.push({
                                        id: I(i),
                                        label: M.viewMapper(j, t),
                                        model: n[i]
                                    });
                                    j.query = e, g(), p.attr("aria-expanded", !0), A && 1 === j.matches.length && q(e, 0) && j.select(0)
                                } else L(), S(f, !0);
                            r && x(f, !1)
                        }, function() {
                            L(), x(f, !1), S(f, !0)
                        })
                    };
                T && (angular.element(o).bind("resize", m), i.find("body").bind("scroll", m));
                var F;
                j.moveInProgress = !1, L(), j.query = void 0;
                var H, R = function(e) {
                        H = r(function() {
                            V(e)
                        }, b)
                    },
                    _ = function() {
                        H && r.cancel(H)
                    };
                h.$parsers.unshift(function(e) {
                    return $ = !0, 0 === v || e && e.length >= v ? b > 0 ? (_(), R(e)) : V(e) : (x(f, !1),
                        _(), L()), w ? e : e ? void h.$setValidity("editable", !1) : (h.$setValidity("editable", !0), null)
                }), h.$formatters.push(function(e) {
                    var t, n, r = {};
                    return w || h.$setValidity("editable", !0), E ? (r.$model = e, E(f, r)) : (r[M.itemName] = e, t = M.viewMapper(f, r), r[M.itemName] = void 0, n = M.viewMapper(f, r), t !== n ? t : e)
                }), j.select = function(e) {
                    var t, n, i = {};
                    y = !0, i[M.itemName] = n = j.matches[e].model, t = M.modelMapper(f, i), O(f, t), h.$setValidity("editable", !0), h.$setValidity("parse", !0), C(f, {
                        $item: n,
                        $model: t,
                        $label: M.viewMapper(f, i)
                    }), L(), r(function() {
                        p[0].focus()
                    }, 0, !1)
                }, p.bind("keydown", function(e) {
                    if (0 !== j.matches.length && -1 !== l.indexOf(e.which)) {
                        if (-1 === j.activeIdx && (9 === e.which || 13 === e.which)) return L(), void j.$digest();
                        e.preventDefault(), 40 === e.which ? (j.activeIdx = (j.activeIdx + 1) % j.matches.length, j.$digest()) : 38 === e.which ? (j.activeIdx = (j.activeIdx > 0 ? j.activeIdx : j.matches.length) - 1, j.$digest()) : 13 === e.which || 9 === e.which ? j.$apply(function() {
                            j.select(j.activeIdx)
                        }) : 27 === e.which && (e.stopPropagation(), L(), j.$digest())
                    }
                }), p.bind("blur", function() {
                    k && j.matches.length && -1 !== j.activeIdx && !y && (y = !0, j.$apply(function() {
                        j.select(j.activeIdx)
                    })), $ = !1, y = !1
                });
                var U = function(e) {
                    p[0] !== e.target && 3 !== e.which && 0 !== j.matches.length && (L(), a.$$phase || j.$digest())
                };
                i.bind("click", U), f.$on("$destroy", function() {
                    i.unbind("click", U), T && B.remove(), P.remove()
                });
                var B = e(P)(j);
                T ? i.find("body").append(B) : p.after(B)
            }
        }
    }]).directive("typeaheadPopup", function() {
        return {
            restrict: "EA",
            scope: {
                matches: "=",
                query: "=",
                active: "=",
                position: "&",
                moveInProgress: "=",
                select: "&"
            },
            replace: !0,
            templateUrl: "template/typeahead/typeahead-popup.html",
            link: function(e, t, n) {
                e.templateUrl = n.templateUrl, e.isOpen = function() {
                    return e.matches.length > 0
                }, e.isActive = function(t) {
                    return e.active == t
                }, e.selectActive = function(t) {
                    e.active = t
                }, e.selectMatch = function(t) {
                    e.select({
                        activeIdx: t
                    })
                }
            }
        }
    }).directive("typeaheadMatch", ["$templateRequest", "$compile", "$parse", function(e, t, n) {
        return {
            restrict: "EA",
            scope: {
                index: "=",
                match: "=",
                query: "="
            },
            link: function(r, i, o) {
                var a = n(o.templateUrl)(r.$parent) || "template/typeahead/typeahead-match.html";
                e(a).then(function(e) {
                    t(e.trim())(r, function(e) {
                        i.replaceWith(e)
                    })
                })
            }
        }
    }]).filter("typeaheadHighlight", function() {
        function e(e) {
            return e.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
        }
        return function(t, n) {
            return n ? ("" + t).replace(new RegExp(e(n), "gi"), "<strong>$&</strong>") : t
        }
    }), angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function(e) {
        e.put("template/accordion/accordion-group.html", '<div class="panel panel-default" ng-class="{\'panel-open\': isOpen}">\n  <div class="panel-heading">\n    <h4 class="panel-title">\n      <a href tabindex="0" class="accordion-toggle" ng-click="toggleOpen()" accordion-transclude="heading"><span ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n    </h4>\n  </div>\n  <div class="panel-collapse collapse" collapse="!isOpen">\n	  <div class="panel-body" ng-transclude></div>\n  </div>\n</div>\n')
    }]), angular.module("template/accordion/accordion.html", []).run(["$templateCache", function(e) {
        e.put("template/accordion/accordion.html", '<div class="panel-group" ng-transclude></div>')
    }]), angular.module("template/alert/alert.html", []).run(["$templateCache", function(e) {
        e.put("template/alert/alert.html", '<div class="alert" ng-class="[\'alert-\' + (type || \'warning\'), closeable ? \'alert-dismissible\' : null]" role="alert">\n    <button ng-show="closeable" type="button" class="close" ng-click="close($event)">\n        <span aria-hidden="true">&times;</span>\n        <span class="sr-only">Close</span>\n    </button>\n    <div ng-transclude></div>\n</div>\n')
    }]), angular.module("template/carousel/carousel.html", []).run(["$templateCache", function(e) {
        e.put("template/carousel/carousel.html", '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" ng-swipe-right="prev()" ng-swipe-left="next()">\n    <ol class="carousel-indicators" ng-show="slides.length > 1">\n        <li ng-repeat="slide in slides | orderBy:indexOfSlide track by $index" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n    <a class="left carousel-control" ng-click="prev()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-left"></span></a>\n    <a class="right carousel-control" ng-click="next()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-right"></span></a>\n</div>\n')
    }]), angular.module("template/carousel/slide.html", []).run(["$templateCache", function(e) {
        e.put("template/carousel/slide.html", '<div ng-class="{\n    \'active\': active\n  }" class="item text-center" ng-transclude></div>\n')
    }]), angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function(e) {
        e.put("template/datepicker/datepicker.html", '<div ng-switch="datepickerMode" role="application" ng-keydown="keydown($event)">\n  <daypicker ng-switch-when="day" tabindex="0"></daypicker>\n  <monthpicker ng-switch-when="month" tabindex="0"></monthpicker>\n  <yearpicker ng-switch-when="year" tabindex="0"></yearpicker>\n</div>')
    }]), angular.module("template/datepicker/day.html", []).run(["$templateCache", function(e) {
        e.put("template/datepicker/day.html", '<table role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{::5 + showWeeks}}"><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n    <tr>\n      <th ng-if="showWeeks" class="text-center"></th>\n      <th ng-repeat="label in ::labels track by $index" class="text-center"><small aria-label="{{::label.full}}">{{::label.abbr}}</small></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-if="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{::dt.uid}}" ng-class="::dt.customClass">\n        <button type="button" style="min-width:100%;" class="btn btn-default btn-sm" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="::{\'text-muted\': dt.secondary, \'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
    }]), angular.module("template/datepicker/month.html", []).run(["$templateCache", function(e) {
        e.put("template/datepicker/month.html", '<table role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{::dt.uid}}" ng-class="::dt.customClass">\n        <button type="button" style="min-width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="::{\'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
    }]), angular.module("template/datepicker/popup.html", []).run(["$templateCache", function(e) {
        e.put("template/datepicker/popup.html", '<ul class="dropdown-menu" ng-if="isOpen" style="display: block" ng-style="{top: position.top+\'px\', left: position.left+\'px\'}" ng-keydown="keydown($event)" ng-click="$event.stopPropagation()">\n	<li ng-transclude></li>\n	<li ng-if="showButtonBar" style="padding:10px 9px 2px">\n		<span class="btn-group pull-left">\n			<button type="button" class="btn btn-sm btn-info" ng-click="select(\'today\')">{{ getText(\'current\') }}</button>\n			<button type="button" class="btn btn-sm btn-danger" ng-click="select(null)">{{ getText(\'clear\') }}</button>\n		</span>\n		<button type="button" class="btn btn-sm btn-success pull-right" ng-click="close()">{{ getText(\'close\') }}</button>\n	</li>\n</ul>\n')
    }]), angular.module("template/datepicker/year.html", []).run(["$templateCache", function(e) {
        e.put("template/datepicker/year.html", '<table role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="3"><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{::dt.uid}}">\n        <button type="button" style="min-width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="::{\'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
    }]), angular.module("template/modal/backdrop.html", []).run(["$templateCache", function(e) {
        e.put("template/modal/backdrop.html", '<div class="modal-backdrop"\n     modal-animation-class="fade"\n     modal-in-class="in"\n     ng-style="{\'z-index\': 1040 + (index && 1 || 0) + index*10}"\n></div>\n')
    }]), angular.module("template/modal/window.html", []).run(["$templateCache", function(e) {
        e.put("template/modal/window.html", '<div modal-render="{{$isRendered}}" tabindex="-1" role="dialog" class="modal"\n    modal-animation-class="fade"\n    modal-in-class="in"\n	ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" >\n    <div class="modal-dialog my-model1-dialog" ng-class="size ? \'modal-\' + size : \'\'"><div class="modal-content" modal-transclude></div></div>\n</div>\n')
    }]), angular.module("template/pagination/pager.html", []).run(["$templateCache", function(e) {
        e.put("template/pagination/pager.html", '<ul class="pager">\n  <li ng-class="{disabled: noPrevious(), previous: align}"><a href ng-click="selectPage(page - 1, $event)">{{::getText(\'previous\')}}</a></li>\n  <li ng-class="{disabled: noNext(), next: align}"><a href ng-click="selectPage(page + 1, $event)">{{::getText(\'next\')}}</a></li>\n</ul>')
    }]), angular.module("template/pagination/pagination.html", []).run(["$templateCache", function(e) {
        e.put("template/pagination/pagination.html", '<ul class="pagination">\n  <li ng-if="::boundaryLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-first"><a href ng-click="selectPage(1, $event)">{{::getText(\'first\')}}</a></li>\n  <li ng-if="::directionLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-prev"><a href ng-click="selectPage(page - 1, $event)">{{::getText(\'previous\')}}</a></li>\n  <li ng-repeat="page in pages track by $index" ng-class="{active: page.active,disabled: ngDisabled&&!page.active}" class="pagination-page"><a href ng-click="selectPage(page.number, $event)">{{page.text}}</a></li>\n  <li ng-if="::directionLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-next"><a href ng-click="selectPage(page + 1, $event)">{{::getText(\'next\')}}</a></li>\n  <li ng-if="::boundaryLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-last"><a href ng-click="selectPage(totalPages, $event)">{{::getText(\'last\')}}</a></li>\n</ul>\n')
    }]), angular.module("template/tooltip/tooltip-html-popup.html", []).run(["$templateCache", function(e) {
        e.put("template/tooltip/tooltip-html-popup.html", '<div class="tooltip"\n  tooltip-animation-class="fade"\n  tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind-html="contentExp()"></div>\n</div>\n')
    }]), angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run(["$templateCache", function(e) {
        e.put("template/tooltip/tooltip-html-unsafe-popup.html", '<div class="tooltip"\n  tooltip-animation-class="fade"\n  tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" bind-html-unsafe="content"></div>\n</div>\n')
    }]), angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache", function(e) {
        e.put("template/tooltip/tooltip-popup.html", '<div class="tooltip"\n  tooltip-animation-class="fade"\n  tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n')
    }]), angular.module("template/tooltip/tooltip-template-popup.html", []).run(["$templateCache", function(e) {
        e.put("template/tooltip/tooltip-template-popup.html", '<div class="tooltip"\n  tooltip-animation-class="fade"\n  tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner"\n    tooltip-template-transclude="contentExp()"\n    tooltip-template-transclude-scope="originScope()"></div>\n</div>\n')
    }]), angular.module("template/popover/popover-html.html", []).run(["$templateCache", function(e) {
        e.put("template/popover/popover-html.html", '<div class="popover"\n  tooltip-animation-class="fade"\n  tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-if="title"></h3>\n      <div class="popover-content" ng-bind-html="contentExp()"></div>\n  </div>\n</div>\n')
    }]), angular.module("template/popover/popover-template.html", []).run(["$templateCache", function(e) {
        e.put("template/popover/popover-template.html", '<div class="popover"\n  tooltip-animation-class="fade"\n  tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-if="title"></h3>\n      <div class="popover-content"\n        tooltip-template-transclude="contentExp()"\n        tooltip-template-transclude-scope="originScope()"></div>\n  </div>\n</div>\n')
    }]), angular.module("template/popover/popover.html", []).run(["$templateCache", function(e) {
        e.put("template/popover/popover.html", '<div class="popover"\n  tooltip-animation-class="fade"\n  tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-if="title"></h3>\n      <div class="popover-content" ng-bind="content"></div>\n  </div>\n</div>\n')
    }]), angular.module("template/progressbar/bar.html", []).run(["$templateCache", function(e) {
        e.put("template/progressbar/bar.html", '<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + \'%\'}" aria-valuetext="{{percent | number:0}}%" style="min-width: 0;" ng-transclude></div>\n')
    }]), angular.module("template/progressbar/progress.html", []).run(["$templateCache", function(e) {
        e.put("template/progressbar/progress.html", '<div class="progress" ng-transclude></div>')
    }]), angular.module("template/progressbar/progressbar.html", []).run(["$templateCache", function(e) {
        e.put("template/progressbar/progressbar.html", '<div class="progress">\n  <div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + \'%\'}" aria-valuetext="{{percent | number:0}}%" style="min-width: 0;" ng-transclude></div>\n</div>\n')
    }]), angular.module("template/rating/rating.html", []).run(["$templateCache", function(e) {
        e.put("template/rating/rating.html", '<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}">\n    <span ng-repeat-start="r in range track by $index" class="sr-only">({{ $index < value ? \'*\' : \' \' }})</span>\n    <i ng-repeat-end ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < value && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')" ng-attr-title="{{r.title}}" ></i>\n</span>\n')
    }]), angular.module("template/tabs/tab.html", []).run(["$templateCache", function(e) {
        e.put("template/tabs/tab.html", '<li ng-class="{active: active, disabled: disabled}">\n  <a href ng-click="select()" tab-heading-transclude>{{heading}}</a>\n</li>\n')
    }]), angular.module("template/tabs/tabset.html", []).run(["$templateCache", function(e) {
        e.put("template/tabs/tabset.html", '<div>\n  <ul class="nav nav-{{type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane" \n         ng-repeat="tab in tabs" \n         ng-class="{active: tab.active}"\n         tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n')
    }]), angular.module("template/timepicker/timepicker.html", []).run(["$templateCache", function(e) {
        e.put("template/timepicker/timepicker.html", '<table>\n  <tbody>\n    <tr class="text-center" ng-show="::showSpinners">\n      <td><a ng-click="incrementHours()" ng-class="{disabled: noIncrementHours()}" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n      <td>&nbsp;</td>\n      <td><a ng-click="incrementMinutes()" ng-class="{disabled: noIncrementMinutes()}" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n      <td ng-show="showMeridian"></td>\n    </tr>\n    <tr>\n      <td class="form-group" ng-class="{\'has-error\': invalidHours}">\n        <input style="width:50px;" type="text" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-readonly="::readonlyInput" maxlength="2">\n      </td>\n      <td>:</td>\n      <td class="form-group" ng-class="{\'has-error\': invalidMinutes}">\n        <input style="width:50px;" type="text" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="::readonlyInput" maxlength="2">\n      </td>\n      <td ng-show="showMeridian"><button type="button" ng-class="{disabled: noToggleMeridian()}" class="btn btn-default text-center" ng-click="toggleMeridian()">{{meridian}}</button></td>\n    </tr>\n    <tr class="text-center" ng-show="::showSpinners">\n      <td><a ng-click="decrementHours()" ng-class="{disabled: noDecrementHours()}" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n      <td>&nbsp;</td>\n      <td><a ng-click="decrementMinutes()" ng-class="{disabled: noDecrementMinutes()}" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n      <td ng-show="showMeridian"></td>\n    </tr>\n  </tbody>\n</table>\n')
    }]), angular.module("template/typeahead/typeahead-match.html", []).run(["$templateCache", function(e) {
        e.put("template/typeahead/typeahead-match.html", '<a href tabindex="-1" bind-html-unsafe="match.label | typeaheadHighlight:query"></a>\n')
    }]), angular.module("template/typeahead/typeahead-popup.html", []).run(["$templateCache", function(e) {
        e.put("template/typeahead/typeahead-popup.html", '<ul class="dropdown-menu" ng-show="isOpen() && !moveInProgress" ng-style="{top: position().top+\'px\', left: position().left+\'px\'}" style="display: block;" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)" role="option" id="{{::match.id}}">\n        <div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>\n')
    }]), !angular.$$csp() && angular.element(document).find("head").prepend('<style type="text/css">.ng-animate.item:not(.left):not(.right){-webkit-transition:0s ease-in-out left;transition:0s ease-in-out left}</style>'),
    function() {
        "use strict";
        angular.module("angular-loading-bar", ["cfp.loadingBarInterceptor"]), angular.module("chieffancypants.loadingBar", ["cfp.loadingBarInterceptor"]), angular.module("cfp.loadingBarInterceptor", ["cfp.loadingBar"]).config(["$httpProvider", function(e) {
            var t = ["$q", "$cacheFactory", "$timeout", "$rootScope", "cfpLoadingBar", function(t, n, r, i, o) {
                function a() {
                    r.cancel(u), o.complete(), c = 0, l = 0
                }

                function s(t) {
                    var r, i = n.get("$http"),
                        o = e.defaults;
                    !t.cache && !o.cache || t.cache === !1 || "GET" !== t.method && "JSONP" !== t.method || (r = angular.isObject(t.cache) ? t.cache : angular.isObject(o.cache) ? o.cache : i);
                    var a = void 0 !== r ? void 0 !== r.get(t.url) : !1;
                    return void 0 !== t.cached && a !== t.cached ? t.cached : (t.cached = a, a)
                }
                var u, l = 0,
                    c = 0,
                    f = o.latencyThreshold;
                return {
                    request: function(e) {
                        return e.ignoreLoadingBar || s(e) || (i.$broadcast("cfpLoadingBar:loading", {
                            url: e.url
                        }), 0 === l && (u = r(function() {
                            o.start()
                        }, f)), l++, o.set(c / l)), e
                    },
                    response: function(e) {
                        return e.config.ignoreLoadingBar || s(e.config) || (c++, i.$broadcast("cfpLoadingBar:loaded", {
                            url: e.config.url
                        }), c >= l ? a() : o.set(c / l)), e
                    },
                    responseError: function(e) {
                        return e.config.ignoreLoadingBar || s(e.config) || (c++, i.$broadcast("cfpLoadingBar:loaded", {
                            url: e.config.url
                        }), c >= l ? a() : o.set(c / l)), t.reject(e)
                    }
                }
            }];
            e.interceptors.push(t)
        }]), angular.module("cfp.loadingBar", []).provider("cfpLoadingBar", function() {
            this.includeSpinner = !0, this.includeBar = !0, this.latencyThreshold = 100, this.startSize = .02, this.parentSelector = "body", this.spinnerTemplate = '<div id="loading-bar-spinner" ><div class="spinner-icon"></div></div>', this.loadingBarTemplate = '<div id="loading-bar"  style="top:81px" ><div class="bar"  ><div class="peg"></div></div></div>', this.$get = ["$injector", "$document", "$timeout", "$rootScope", function(e, t, n, r) {
                function i() {
                    c || (c = e.get("$animate"));
                    var i = t.find(d).eq(0);
                    n.cancel(p), v || (r.$broadcast("cfpLoadingBar:started"), v = !0, b && c.enter(h, i), y && c.enter(g, i), o(w))
                }

                function o(e) {
                    if (v) {
                        var t = 100 * e + "%";
                        m.css("width", t), $ = e, n.cancel(f), f = n(function() {
                            a()
                        }, 250)
                    }
                }

                function a() {
                    if (!(s() >= 1)) {
                        var e = 0,
                            t = s();
                        e = t >= 0 && .25 > t ? (3 * Math.random() + 3) / 100 : t >= .25 && .65 > t ? 3 * Math.random() / 100 : t >= .65 && .9 > t ? 2 * Math.random() / 100 : t >= .9 && .99 > t ? .005 : 0;
                        var n = s() + e;
                        o(n)
                    }
                }

                function s() {
                    return $
                }

                function u() {
                    $ = 0, v = !1
                }

                function l() {
                    c || (c = e.get("$animate")), r.$broadcast("cfpLoadingBar:completed"), o(1), n.cancel(p), p = n(function() {
                        var e = c.leave(h, u);
                        e && e.then && e.then(u), c.leave(g)
                    }, 500)
                }
                var c, f, p, d = this.parentSelector,
                    h = angular.element(this.loadingBarTemplate),
                    m = h.find("div").eq(0),
                    g = angular.element(this.spinnerTemplate),
                    v = !1,
                    $ = 0,
                    y = this.includeSpinner,
                    b = this.includeBar,
                    w = this.startSize;
                return {
                    start: i,
                    set: o,
                    status: s,
                    inc: a,
                    complete: l,
                    includeSpinner: this.includeSpinner,
                    latencyThreshold: this.latencyThreshold,
                    parentSelector: this.parentSelector,
                    startSize: this.startSize
                }
            }]
        })
    }();