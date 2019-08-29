"use strict";

if (void 0 === TextEncoder) {
  var TextEncoder = function TextEncoder() {};

  TextEncoder.prototype.encode = function (e) {
    "use strict";

    for (var t = e.length, o = -1, r = "undefined" == typeof Uint8Array ? new Array(1.5 * t) : new Uint8Array(3 * t), n = 0, i = 0, c = 0; c !== t;) {
      if (n = e.charCodeAt(c), c += 1, n >= 55296 && n <= 56319) {
        if (c === t) {
          r[o += 1] = 239, r[o += 1] = 191, r[o += 1] = 189;
          break;
        }

        if (!((i = e.charCodeAt(c)) >= 56320 && i <= 57343)) {
          r[o += 1] = 239, r[o += 1] = 191, r[o += 1] = 189;
          continue;
        }

        if (c += 1, (n = 1024 * (n - 55296) + i - 56320 + 65536) > 65535) {
          r[o += 1] = 240 | n >>> 18, r[o += 1] = 128 | n >>> 12 & 63, r[o += 1] = 128 | n >>> 6 & 63, r[o += 1] = 128 | 63 & n;
          continue;
        }
      }

      n <= 127 ? r[o += 1] = 0 | n : n <= 2047 ? (r[o += 1] = 192 | n >>> 6, r[o += 1] = 128 | 63 & n) : (r[o += 1] = 224 | n >>> 12, r[o += 1] = 128 | n >>> 6 & 63, r[o += 1] = 128 | 63 & n);
    }

    return "undefined" != typeof Uint8Array ? r.subarray(0, o + 1) : (r.length = o + 1, r);
  }, TextEncoder.prototype.toString = function () {
    return "[object TextEncoder]";
  };

  try {
    Object.defineProperty(TextEncoder.prototype, "encoding", {
      get: function get() {
        if (TextEncoder.prototype.isPrototypeOf(this)) return "utf-8";
        throw TypeError("Illegal invocation");
      }
    });
  } catch (e) {
    TextEncoder.prototype.encoding = "utf-8";
  }

  "undefined" != typeof Symbol && (TextEncoder.prototype[Symbol.toStringTag] = "TextEncoder");
}
