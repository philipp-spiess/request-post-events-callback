let requestPostEventsCallback, cancelPostEventsCallback;

const hasNativeSetImmediate =
  typeof window.setImmediate === "function" &&
  /\[native code\]/.test(window.setImmediate.toString());

if (hasNativeSetImmediate) {
  // In case of a native setImmediate function (since this might be
  // polyfilled incorrectly, we rely on this function). This will be the
  // case in MS Edge and Internet Explorer.
  requestPostEventsCallback = window.setImmediate;
  cancelPostEventsCallback = window.clearImmediate;
} else {
  // If no one of the above detections work, we fall back to rAF. This
  // should be the case in Chrome and Firefox, where rAF will be fired
  // before the next paint.
  requestPostEventsCallback = requestAnimationFrame.bind(this);
  cancelPostEventsCallback = cancelAnimationFrame.bind(this);
}

export { requestPostEventsCallback, cancelPostEventsCallback };
