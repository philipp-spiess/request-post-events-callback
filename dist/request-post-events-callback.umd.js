!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.PostEventsCallback={})}(this,function(e){"function"==typeof window.setImmediate&&/\[native code\]/.test(window.setImmediate.toString())?(e.requestPostEventsCallback=window.setImmediate,e.cancelPostEventsCallback=window.clearImmediate):(e.requestPostEventsCallback=requestAnimationFrame.bind(void 0),e.cancelPostEventsCallback=cancelAnimationFrame.bind(void 0))});
//# sourceMappingURL=request-post-events-callback.umd.js.map
