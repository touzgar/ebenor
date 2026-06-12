/**
 * COMPLETE CONSOLE SILENCE - NO OUTPUT AT ALL
 * This runs immediately and blocks EVERYTHING
 */

// Run immediately, before ANY other code
(function() {
  'use strict';
  
  if (typeof window === 'undefined') return;
  
  // Completely disable ALL console methods
  const noop = function() {};
  
  // Override console
  window.console = {
    log: noop,
    warn: noop,
    error: noop,
    info: noop,
    debug: noop,
    trace: noop,
    table: noop,
    dir: noop,
    dirxml: noop,
    group: noop,
    groupCollapsed: noop,
    groupEnd: noop,
    time: noop,
    timeEnd: noop,
    timeLog: noop,
    timeStamp: noop,
    count: noop,
    countReset: noop,
    assert: noop,
    clear: noop,
    profile: noop,
    profileEnd: noop,
  } as any;
  
  // Block ALL error messages
  window.addEventListener('error', function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  }, true);
  
  // Block ALL promise rejections
  window.addEventListener('unhandledrejection', function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  }, true);
  
  // Block ALL rejection handled events
  window.addEventListener('rejectionhandled', function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  }, true);
  
  // Override window.onerror
  window.onerror = function() { return true; };
  
  // Override window.onunhandledrejection
  window.onunhandledrejection = function() { return true; };
  
  // Block console from being restored
  Object.defineProperty(window, 'console', {
    value: {
      log: noop,
      warn: noop,
      error: noop,
      info: noop,
      debug: noop,
      trace: noop,
      table: noop,
      dir: noop,
      dirxml: noop,
      group: noop,
      groupCollapsed: noop,
      groupEnd: noop,
      time: noop,
      timeEnd: noop,
      timeLog: noop,
      timeStamp: noop,
      count: noop,
      countReset: noop,
      assert: noop,
      clear: noop,
      profile: noop,
      profileEnd: noop,
    },
    writable: false,
    configurable: false
  });
  
})();

export {};
