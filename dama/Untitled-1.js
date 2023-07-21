
/* setPassphrase
{
    "code": "200",
    "data": {
        "expire_at": "2023-07-21 14:18:39",
        "passphrase": "htYDzAkcqCIXMqWJ5cxu7e==",
        "second": "172800"
    },
    "time": "1689747519",
    "encrypt": "b6wA56phUdat78UZzM8Cv3=="
}
*/

///////


var n = Object(bi.a)("passphrase");
                    try {
                        e.data = JSON.parse(Ki(e.data, n))
                    } catch (t) {
                        try {
                            e.data = JSON.parse(Ki(e.data, "WmrGowJCtUQd/2PgoyrJuQ=="))
                        } catch (t) {
                            try {
                                var l = Object(bi.a)("before_passphrase");
                                e.data = JSON.parse(Ki(e.data, l))
                            } catch (e) {}
                        }
                    }

/////////////////////////////////////////////////////
function Ki(e, t) {
    var n = Qi.enc.Utf8.parse(t); //A.parse

    return Qi.TripleDES.decrypt({
        ciphertext: Qi.enc.Base64.parse(e) //base64parse
    }, n, {
        mode: Qi.mode.ECB,
        padding: Qi.pad.Pkcs7
    }).toString(Qi.enc.Utf8)
}

//////////
h = d.Hex = {
            stringify: function(e) {
                for (var t = e.words, n = e.sigBytes, r = [], i = 0; i < n; i++) {
                    var o = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                    r.push((o >>> 4).toString(16)),
                    r.push((15 & o).toString(16))
                }
                return r.join("")
            },
            parse: function(e) {
                for (var t = e.length, n = [], i = 0; i < t; i += 2)
                    n[i >>> 3] |= parseInt(e.substr(i, 2), 16) << 24 - i % 8 * 4;
                return new c.init(n,t / 2)
            }
        }
          , f = d.Latin1 = {
            stringify: function(e) {
                for (var t = e.words, n = e.sigBytes, r = [], i = 0; i < n; i++) {
                    var o = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                    r.push(String.fromCharCode(o))
                }
                return r.join("")
            },
            parse: function(e) {
                for (var t = e.length, n = [], i = 0; i < t; i++)
                    n[i >>> 2] |= (255 & e.charCodeAt(i)) << 24 - i % 4 * 8;
                return new c.init(n,t)
            }
        }
          , A = d.Utf8 = {
            stringify: function(e) {
                try {
                    return decodeURIComponent(escape(f.stringify(e)))
                } catch (e) {
                    throw new Error("Malformed UTF-8 data")
                }
            },
            parse: function(e) {
                return f.parse(unescape(encodeURIComponent(e)))
            }
        }


        ////////////////////////////////////////////////////////////////////base64 parse

        function(e, t, n) {
            var r, o, l;
            e.exports = (r = n(16),
            l = (o = r).lib.WordArray,
            o.enc.Base64 = {
                stringify: function(e) {
                    var t = e.words
                      , n = e.sigBytes
                      , map = this._map;
                    e.clamp();
                    for (var r = [], i = 0; i < n; i += 3)
                        for (var o = (t[i >>> 2] >>> 24 - i % 4 * 8 & 255) << 16 | (t[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255) << 8 | t[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255, l = 0; l < 4 && i + .75 * l < n; l++)
                            r.push(map.charAt(o >>> 6 * (3 - l) & 63));
                    var c = map.charAt(64);
                    if (c)
                        for (; r.length % 4; )
                            r.push(c);
                    return r.join("")
                },
                parse: function(e) {
                    var t = e.length
                      , map = this._map
                      , n = this._reverseMap;
                    if (!n) {
                        n = this._reverseMap = [];
                        for (var r = 0; r < map.length; r++)
                            n[map.charCodeAt(r)] = r
                    }
                    var o = map.charAt(64);
                    if (o) {
                        var c = e.indexOf(o);
                        -1 !== c && (t = c)
                    }
                    return function(e, t, n) {
                        for (var r = [], o = 0, i = 0; i < t; i++)
                            if (i % 4) {
                                var c = n[e.charCodeAt(i - 1)] << i % 4 * 2
                                  , d = n[e.charCodeAt(i)] >>> 6 - i % 4 * 2;
                                r[o >>> 2] |= (c | d) << 24 - o % 4 * 8,
                                o++
                            }
                        return l.create(r, o)
                    }(e, t, n)
                },
                _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
            },
            r.enc.Base64)
        }

        /////////////////////////////////////////////////////////////////////////////

        function(e, t, n) {
            var r;
            e.exports = (r = n(16),
            n(93),
            void (r.lib.Cipher || function(e) {
                var t = r
                  , n = t.lib
                  , o = n.Base
                  , l = n.WordArray
                  , c = n.BufferedBlockAlgorithm
                  , d = t.enc
                  , h = (d.Utf8,
                d.Base64)
                  , f = t.algo
                  , A = f.EvpKDF
                  , m = n.Cipher = c.extend({
                    cfg: o.extend(),
                    createEncryptor: function(e, t) {
                        return this.create(this._ENC_XFORM_MODE, e, t)
                    },
                    createDecryptor: function(e, t) {
                        return this.create(this._DEC_XFORM_MODE, e, t)
                    },
                    init: function(e, t, n) {
                        this.cfg = this.cfg.extend(n),
                        this._xformMode = e,
                        this._key = t,
                        this.reset()
                    },
                    reset: function() {
                        c.reset.call(this),
                        this._doReset()
                    },
                    process: function(e) {
                        return this._append(e),
                        this._process()
                    },
                    finalize: function(e) {
                        e && this._append(e);
                        var t = this._doFinalize();
                        return t
                    },
                    keySize: 4,
                    ivSize: 4,
                    _ENC_XFORM_MODE: 1,
                    _DEC_XFORM_MODE: 2,
                    _createHelper: function() {
                        function e(e) {
                            return "string" == typeof e ? O : B
                        }
                        return function(t) {
                            return {
                                encrypt: function(n, r, o) {
                                    return e(r).encrypt(t, n, r, o)
                                },
                                decrypt: function(n, r, o) {
                                    return e(r).decrypt(t, n, r, o)
                                }
                            }
                        }
                    }()
                })
                  , v = (n.StreamCipher = m.extend({
                    _doFinalize: function() {
                        var e = this._process(!0);
                        return e
                    },
                    blockSize: 1
                }),
                t.mode = {})
                  , y = n.BlockCipherMode = o.extend({
                    createEncryptor: function(e, t) {
                        return this.Encryptor.create(e, t)
                    },
                    createDecryptor: function(e, t) {
                        return this.Decryptor.create(e, t)
                    },
                    init: function(e, t) {
                        this._cipher = e,
                        this._iv = t
                    }
                })
                  , E = v.CBC = function() {
                    var t = y.extend();
                    function n(t, n, r) {
                        var o = this._iv;
                        if (o) {
                            var l = o;
                            this._iv = e
                        } else
                            var l = this._prevBlock;
                        for (var i = 0; i < r; i++)
                            t[n + i] ^= l[i]
                    }
                    return t.Encryptor = t.extend({
                        processBlock: function(e, t) {
                            var r = this._cipher
                              , o = r.blockSize;
                            n.call(this, e, t, o),
                            r.encryptBlock(e, t),
                            this._prevBlock = e.slice(t, t + o)
                        }
                    }),
                    t.Decryptor = t.extend({
                        processBlock: function(e, t) {
                            var r = this._cipher
                              , o = r.blockSize
                              , l = e.slice(t, t + o);
                            r.decryptBlock(e, t),
                            n.call(this, e, t, o),
                            this._prevBlock = l
                        }
                    }),
                    t
                }()
                  , w = t.pad = {}
                  , C = w.Pkcs7 = {
                    pad: function(data, e) {
                        for (var t = 4 * e, n = t - data.sigBytes % t, r = n << 24 | n << 16 | n << 8 | n, o = [], i = 0; i < n; i += 4)
                            o.push(r);
                        var c = l.create(o, n);
                        data.concat(c)
                    },
                    unpad: function(data) {
                        var e = 255 & data.words[data.sigBytes - 1 >>> 2];
                        data.sigBytes -= e
                    }
                }
                  , x = (n.BlockCipher = m.extend({
                    cfg: m.cfg.extend({
                        mode: E,
                        padding: C
                    }),
                    reset: function() {
                        m.reset.call(this);
                        var e = this.cfg
                          , t = e.iv
                          , n = e.mode;
                        if (this._xformMode == this._ENC_XFORM_MODE)
                            var r = n.createEncryptor;
                        else {
                            var r = n.createDecryptor;
                            this._minBufferSize = 1
                        }
                        this._mode && this._mode.__creator == r ? this._mode.init(this, t && t.words) : (this._mode = r.call(n, this, t && t.words),
                        this._mode.__creator = r)
                    },
                    _doProcessBlock: function(e, t) {
                        this._mode.processBlock(e, t)
                    },
                    _doFinalize: function() {
                        var e = this.cfg.padding;
                        if (this._xformMode == this._ENC_XFORM_MODE) {
                            e.pad(this._data, this.blockSize);
                            var t = this._process(!0)
                        } else {
                            var t = this._process(!0);
                            e.unpad(t)
                        }
                        return t
                    },
                    blockSize: 4
                }),
                n.CipherParams = o.extend({
                    init: function(e) {
                        this.mixIn(e)
                    },
                    toString: function(e) {
                        return (e || this.formatter).stringify(this)
                    }
                }))
                  , _ = t.format = {}
                  , S = _.OpenSSL = {
                    stringify: function(e) {
                        var t = e.ciphertext
                          , n = e.salt;
                        if (n)
                            var r = l.create([1398893684, 1701076831]).concat(n).concat(t);
                        else
                            var r = t;
                        return r.toString(h)
                    },
                    parse: function(e) {
                        var t = h.parse(e)
                          , n = t.words;
                        if (1398893684 == n[0] && 1701076831 == n[1]) {
                            var r = l.create(n.slice(2, 4));
                            n.splice(0, 4),
                            t.sigBytes -= 16
                        }
                        return x.create({
                            ciphertext: t,
                            salt: r
                        })
                    }
                }
                  , B = n.SerializableCipher = o.extend({
                    cfg: o.extend({
                        format: S
                    }),
                    encrypt: function(e, t, n, r) {
                        r = this.cfg.extend(r);
                        var o = e.createEncryptor(n, r)
                          , l = o.finalize(t)
                          , c = o.cfg;
                        return x.create({
                            ciphertext: l,
                            key: n,
                            iv: c.iv,
                            algorithm: e,
                            mode: c.mode,
                            padding: c.padding,
                            blockSize: e.blockSize,
                            formatter: r.format
                        })
                    },
                    decrypt: function(e, t, n, r) {
                        r = this.cfg.extend(r),
                        t = this._parse(t, r.format);
                        var o = e.createDecryptor(n, r).finalize(t.ciphertext);
                        return o
                    },
                    _parse: function(e, t) {
                        return "string" == typeof e ? t.parse(e, this) : e
                    }
                })
                  , k = t.kdf = {}
                  , T = k.OpenSSL = {
                    execute: function(e, t, n, r) {
                        r || (r = l.random(8));
                        var o = A.create({
                            keySize: t + n
                        }).compute(e, r)
                          , c = l.create(o.words.slice(t), 4 * n);
                        return o.sigBytes = 4 * t,
                        x.create({
                            key: o,
                            iv: c,
                            salt: r
                        })
                    }
                }
                  , O = n.PasswordBasedCipher = B.extend({
                    cfg: B.cfg.extend({
                        kdf: T
                    }),
                    encrypt: function(e, t, n, r) {
                        var o = (r = this.cfg.extend(r)).kdf.execute(n, e.keySize, e.ivSize);
                        r.iv = o.iv;
                        var l = B.encrypt.call(this, e, t, o.key, r);
                        return l.mixIn(o),
                        l
                    },
                    decrypt: function(e, t, n, r) {
                        r = this.cfg.extend(r),
                        t = this._parse(t, r.format);
                        var o = r.kdf.execute(n, e.keySize, e.ivSize, t.salt);
                        r.iv = o.iv;
                        var l = B.decrypt.call(this, e, t, o.key, r);
                        return l
                    }
                })
            }()))
        }

        ///////////////////////////////////////////

