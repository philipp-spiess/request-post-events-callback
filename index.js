// @TODO(philipp): The Safari, Edge and Internet Explorer implementation
// are not bulletproof yet so I do not suggest you rely on this.

let requestPostEventsCallback, cancelPostEventsCallback;

const hasNativeSetImmediate =
  typeof window.setImmediate === "function" &&
  /\[native code\]/.test(window.setImmediate.toString());

// TODO(philipp): Find a better way to feature detect Safari and use the
// postMessage implementation.
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (hasNativeSetImmediate) {
  // In case of a native setImmediate function (since this might be
  // polyfilled incorrectly, we rely on this function). This will be the
  // case in MS Edge and Internet Explorer.

  requestPostEventsCallback = window.setImmediate.bind(window);
  cancelPostEventsCallback = window.clearImmediate.bind(window);
} else if (isSafari) {
  // In Safari we can use the postMessage workaround as used in a popular
  // setImmediate polyfill.
  //
  // @see https://github.com/YuzuJS/setImmediate/blob/master/setImmediate.js
  // @see https://developer.mozilla.org/en/DOM/window.postMessage

  let queue = [];
  let nextHandle = 1;

  const messagePrefix = "rPEC$" + Math.random();
  const realm = createRealm();

  const onGlobalMessage = function(event) {
    if (
      event.source === window &&
      event.data === messagePrefix &&
      queue.length > 0
    ) {
      const { fn } = queue.shift();
      fn();
    }
  };

  realm.addEventListener("message", onGlobalMessage);

  requestPostEventsCallback = function(fn) {
    realm.postMessage(messagePrefix, "*");
    queue.push({ fn, handle: nextHandle });
    return nextHandle++;
  };

  cancelPostEventsCallback = function(handle) {
    queue.splice(queue.findIndex(q => q.handle === handle), 1);
  };
} else {
  // If no one of the above detections work, we fall back to rAF. This
  // should be the case in Chrome and Firefox, where rAF will be fired
  // before the next paint.

  requestPostEventsCallback = requestAnimationFrame.bind(window);
  cancelPostEventsCallback = cancelAnimationFrame.bind(window);
}

function createRealm() {
  const iframe = document.createElement("iframe");
  const { documentElement } = document;
  iframe.style.display = "none";
  iframe.setAttribute("aria-hidden", "true");
  documentElement.appendChild(iframe);
  return iframe.contentWindow;
}

export { requestPostEventsCallback, cancelPostEventsCallback };
