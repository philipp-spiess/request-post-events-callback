var i,e;"function"==typeof window.setImmediate&&/\[native code\]/.test(window.setImmediate.toString())?(i=window.setImmediate.bind(window),e=window.clearImmediate.bind(window)):(i=requestAnimationFrame.bind(window),e=cancelAnimationFrame.bind(window));export{i as requestPostEventsCallback,e as cancelPostEventsCallback};
//# sourceMappingURL=request-post-events-callback.m.js.map
