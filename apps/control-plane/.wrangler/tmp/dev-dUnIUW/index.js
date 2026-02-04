var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
var init_utils = __esm({
  "../../node_modules/unenv/dist/runtime/_internal/utils.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    __name(createNotImplementedError, "createNotImplementedError");
    __name(notImplemented, "notImplemented");
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin, _performanceNow, nodeTiming, PerformanceEntry, PerformanceMark, PerformanceMeasure, PerformanceResourceTiming, PerformanceObserverEntryList, Performance, PerformanceObserver, performance2;
var init_performance = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    init_utils();
    _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
    _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
    nodeTiming = {
      name: "node",
      entryType: "node",
      startTime: 0,
      duration: 0,
      nodeStart: 0,
      v8Start: 0,
      bootstrapComplete: 0,
      environment: 0,
      loopStart: 0,
      loopExit: 0,
      idleTime: 0,
      uvMetricsInfo: {
        loopCount: 0,
        events: 0,
        eventsWaiting: 0
      },
      detail: void 0,
      toJSON() {
        return this;
      }
    };
    PerformanceEntry = class {
      static {
        __name(this, "PerformanceEntry");
      }
      __unenv__ = true;
      detail;
      entryType = "event";
      name;
      startTime;
      constructor(name, options) {
        this.name = name;
        this.startTime = options?.startTime || _performanceNow();
        this.detail = options?.detail;
      }
      get duration() {
        return _performanceNow() - this.startTime;
      }
      toJSON() {
        return {
          name: this.name,
          entryType: this.entryType,
          startTime: this.startTime,
          duration: this.duration,
          detail: this.detail
        };
      }
    };
    PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
      static {
        __name(this, "PerformanceMark");
      }
      entryType = "mark";
      constructor() {
        super(...arguments);
      }
      get duration() {
        return 0;
      }
    };
    PerformanceMeasure = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceMeasure");
      }
      entryType = "measure";
    };
    PerformanceResourceTiming = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceResourceTiming");
      }
      entryType = "resource";
      serverTiming = [];
      connectEnd = 0;
      connectStart = 0;
      decodedBodySize = 0;
      domainLookupEnd = 0;
      domainLookupStart = 0;
      encodedBodySize = 0;
      fetchStart = 0;
      initiatorType = "";
      name = "";
      nextHopProtocol = "";
      redirectEnd = 0;
      redirectStart = 0;
      requestStart = 0;
      responseEnd = 0;
      responseStart = 0;
      secureConnectionStart = 0;
      startTime = 0;
      transferSize = 0;
      workerStart = 0;
      responseStatus = 0;
    };
    PerformanceObserverEntryList = class {
      static {
        __name(this, "PerformanceObserverEntryList");
      }
      __unenv__ = true;
      getEntries() {
        return [];
      }
      getEntriesByName(_name, _type) {
        return [];
      }
      getEntriesByType(type) {
        return [];
      }
    };
    Performance = class {
      static {
        __name(this, "Performance");
      }
      __unenv__ = true;
      timeOrigin = _timeOrigin;
      eventCounts = /* @__PURE__ */ new Map();
      _entries = [];
      _resourceTimingBufferSize = 0;
      navigation = void 0;
      timing = void 0;
      timerify(_fn, _options) {
        throw createNotImplementedError("Performance.timerify");
      }
      get nodeTiming() {
        return nodeTiming;
      }
      eventLoopUtilization() {
        return {};
      }
      markResourceTiming() {
        return new PerformanceResourceTiming("");
      }
      onresourcetimingbufferfull = null;
      now() {
        if (this.timeOrigin === _timeOrigin) {
          return _performanceNow();
        }
        return Date.now() - this.timeOrigin;
      }
      clearMarks(markName) {
        this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
      }
      clearMeasures(measureName) {
        this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
      }
      clearResourceTimings() {
        this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
      }
      getEntries() {
        return this._entries;
      }
      getEntriesByName(name, type) {
        return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
      }
      getEntriesByType(type) {
        return this._entries.filter((e) => e.entryType === type);
      }
      mark(name, options) {
        const entry = new PerformanceMark(name, options);
        this._entries.push(entry);
        return entry;
      }
      measure(measureName, startOrMeasureOptions, endMark) {
        let start;
        let end;
        if (typeof startOrMeasureOptions === "string") {
          start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
          end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
        } else {
          start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
          end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
        }
        const entry = new PerformanceMeasure(measureName, {
          startTime: start,
          detail: {
            start,
            end
          }
        });
        this._entries.push(entry);
        return entry;
      }
      setResourceTimingBufferSize(maxSize) {
        this._resourceTimingBufferSize = maxSize;
      }
      addEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.addEventListener");
      }
      removeEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.removeEventListener");
      }
      dispatchEvent(event) {
        throw createNotImplementedError("Performance.dispatchEvent");
      }
      toJSON() {
        return this;
      }
    };
    PerformanceObserver = class {
      static {
        __name(this, "PerformanceObserver");
      }
      __unenv__ = true;
      static supportedEntryTypes = [];
      _callback = null;
      constructor(callback) {
        this._callback = callback;
      }
      takeRecords() {
        return [];
      }
      disconnect() {
        throw createNotImplementedError("PerformanceObserver.disconnect");
      }
      observe(options) {
        throw createNotImplementedError("PerformanceObserver.observe");
      }
      bind(fn) {
        return fn;
      }
      runInAsyncScope(fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      asyncId() {
        return 0;
      }
      triggerAsyncId() {
        return 0;
      }
      emitDestroy() {
        return this;
      }
    };
    performance2 = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
  }
});

// ../../node_modules/unenv/dist/runtime/node/perf_hooks.mjs
var init_perf_hooks = __esm({
  "../../node_modules/unenv/dist/runtime/node/perf_hooks.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    init_performance();
  }
});

// ../../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
var init_performance2 = __esm({
  "../../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs"() {
    init_perf_hooks();
    globalThis.performance = performance2;
    globalThis.Performance = Performance;
    globalThis.PerformanceEntry = PerformanceEntry;
    globalThis.PerformanceMark = PerformanceMark;
    globalThis.PerformanceMeasure = PerformanceMeasure;
    globalThis.PerformanceObserver = PerformanceObserver;
    globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
    globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime;
var init_hrtime = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
      const now = Date.now();
      const seconds = Math.trunc(now / 1e3);
      const nanos = now % 1e3 * 1e6;
      if (startTime) {
        let diffSeconds = seconds - startTime[0];
        let diffNanos = nanos - startTime[0];
        if (diffNanos < 0) {
          diffSeconds = diffSeconds - 1;
          diffNanos = 1e9 + diffNanos;
        }
        return [diffSeconds, diffNanos];
      }
      return [seconds, nanos];
    }, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
      return BigInt(Date.now() * 1e6);
    }, "bigint") });
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream;
var init_read_stream = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    ReadStream = class {
      static {
        __name(this, "ReadStream");
      }
      fd;
      isRaw = false;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      setRawMode(mode) {
        this.isRaw = mode;
        return this;
      }
    };
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream;
var init_write_stream = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    WriteStream = class {
      static {
        __name(this, "WriteStream");
      }
      fd;
      columns = 80;
      rows = 24;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      clearLine(dir, callback) {
        callback && callback();
        return false;
      }
      clearScreenDown(callback) {
        callback && callback();
        return false;
      }
      cursorTo(x, y, callback) {
        callback && typeof callback === "function" && callback();
        return false;
      }
      moveCursor(dx, dy, callback) {
        callback && callback();
        return false;
      }
      getColorDepth(env2) {
        return 1;
      }
      hasColors(count, env2) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      write(str, encoding, cb) {
        if (str instanceof Uint8Array) {
          str = new TextDecoder().decode(str);
        }
        try {
          console.log(str);
        } catch {
        }
        cb && typeof cb === "function" && cb();
        return false;
      }
    };
  }
});

// ../../node_modules/unenv/dist/runtime/node/tty.mjs
var init_tty = __esm({
  "../../node_modules/unenv/dist/runtime/node/tty.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    init_read_stream();
    init_write_stream();
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION;
var init_node_version = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    NODE_VERSION = "22.14.0";
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";
var Process;
var init_process = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/process/process.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    init_tty();
    init_utils();
    init_node_version();
    Process = class _Process extends EventEmitter {
      static {
        __name(this, "Process");
      }
      env;
      hrtime;
      nextTick;
      constructor(impl) {
        super();
        this.env = impl.env;
        this.hrtime = impl.hrtime;
        this.nextTick = impl.nextTick;
        for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
          const value = this[prop];
          if (typeof value === "function") {
            this[prop] = value.bind(this);
          }
        }
      }
      // --- event emitter ---
      emitWarning(warning, type, code) {
        console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
      }
      emit(...args) {
        return super.emit(...args);
      }
      listeners(eventName) {
        return super.listeners(eventName);
      }
      // --- stdio (lazy initializers) ---
      #stdin;
      #stdout;
      #stderr;
      get stdin() {
        return this.#stdin ??= new ReadStream(0);
      }
      get stdout() {
        return this.#stdout ??= new WriteStream(1);
      }
      get stderr() {
        return this.#stderr ??= new WriteStream(2);
      }
      // --- cwd ---
      #cwd = "/";
      chdir(cwd2) {
        this.#cwd = cwd2;
      }
      cwd() {
        return this.#cwd;
      }
      // --- dummy props and getters ---
      arch = "";
      platform = "";
      argv = [];
      argv0 = "";
      execArgv = [];
      execPath = "";
      title = "";
      pid = 200;
      ppid = 100;
      get version() {
        return `v${NODE_VERSION}`;
      }
      get versions() {
        return { node: NODE_VERSION };
      }
      get allowedNodeEnvironmentFlags() {
        return /* @__PURE__ */ new Set();
      }
      get sourceMapsEnabled() {
        return false;
      }
      get debugPort() {
        return 0;
      }
      get throwDeprecation() {
        return false;
      }
      get traceDeprecation() {
        return false;
      }
      get features() {
        return {};
      }
      get release() {
        return {};
      }
      get connected() {
        return false;
      }
      get config() {
        return {};
      }
      get moduleLoadList() {
        return [];
      }
      constrainedMemory() {
        return 0;
      }
      availableMemory() {
        return 0;
      }
      uptime() {
        return 0;
      }
      resourceUsage() {
        return {};
      }
      // --- noop methods ---
      ref() {
      }
      unref() {
      }
      // --- unimplemented methods ---
      umask() {
        throw createNotImplementedError("process.umask");
      }
      getBuiltinModule() {
        return void 0;
      }
      getActiveResourcesInfo() {
        throw createNotImplementedError("process.getActiveResourcesInfo");
      }
      exit() {
        throw createNotImplementedError("process.exit");
      }
      reallyExit() {
        throw createNotImplementedError("process.reallyExit");
      }
      kill() {
        throw createNotImplementedError("process.kill");
      }
      abort() {
        throw createNotImplementedError("process.abort");
      }
      dlopen() {
        throw createNotImplementedError("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw createNotImplementedError("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw createNotImplementedError("process.loadEnvFile");
      }
      disconnect() {
        throw createNotImplementedError("process.disconnect");
      }
      cpuUsage() {
        throw createNotImplementedError("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw createNotImplementedError("process.initgroups");
      }
      openStdin() {
        throw createNotImplementedError("process.openStdin");
      }
      assert() {
        throw createNotImplementedError("process.assert");
      }
      binding() {
        throw createNotImplementedError("process.binding");
      }
      // --- attached interfaces ---
      permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
      report = {
        directory: "",
        filename: "",
        signal: "SIGUSR2",
        compact: false,
        reportOnFatalError: false,
        reportOnSignal: false,
        reportOnUncaughtException: false,
        getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
        writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
      };
      finalization = {
        register: /* @__PURE__ */ notImplemented("process.finalization.register"),
        unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
        registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
      };
      memoryUsage = Object.assign(() => ({
        arrayBuffers: 0,
        rss: 0,
        external: 0,
        heapTotal: 0,
        heapUsed: 0
      }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
      // --- undefined props ---
      mainModule = void 0;
      domain = void 0;
      // optional
      send = void 0;
      exitCode = void 0;
      channel = void 0;
      getegid = void 0;
      geteuid = void 0;
      getgid = void 0;
      getgroups = void 0;
      getuid = void 0;
      setegid = void 0;
      seteuid = void 0;
      setgid = void 0;
      setgroups = void 0;
      setuid = void 0;
      // internals
      _events = void 0;
      _eventsCount = void 0;
      _exiting = void 0;
      _maxListeners = void 0;
      _debugEnd = void 0;
      _debugProcess = void 0;
      _fatalException = void 0;
      _getActiveHandles = void 0;
      _getActiveRequests = void 0;
      _kill = void 0;
      _preload_modules = void 0;
      _rawDebug = void 0;
      _startProfilerIdleNotifier = void 0;
      _stopProfilerIdleNotifier = void 0;
      _tickCallback = void 0;
      _disconnect = void 0;
      _handleQueue = void 0;
      _pendingMessage = void 0;
      _channel = void 0;
      _send = void 0;
      _linkedBinding = void 0;
    };
  }
});

// ../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess, getBuiltinModule, workerdProcess, isWorkerdProcessV2, unenvProcess, exit, features, platform, env, hrtime3, nextTick, _channel, _disconnect, _events, _eventsCount, _handleQueue, _maxListeners, _pendingMessage, _send, assert, disconnect, mainModule, _debugEnd, _debugProcess, _exiting, _fatalException, _getActiveHandles, _getActiveRequests, _kill, _linkedBinding, _preload_modules, _rawDebug, _startProfilerIdleNotifier, _stopProfilerIdleNotifier, _tickCallback, abort, addListener, allowedNodeEnvironmentFlags, arch, argv, argv0, availableMemory, binding, channel, chdir, config, connected, constrainedMemory, cpuUsage, cwd, debugPort, dlopen, domain, emit, emitWarning, eventNames, execArgv, execPath, exitCode, finalization, getActiveResourcesInfo, getegid, geteuid, getgid, getgroups, getMaxListeners, getuid, hasUncaughtExceptionCaptureCallback, initgroups, kill, listenerCount, listeners, loadEnvFile, memoryUsage, moduleLoadList, off, on, once, openStdin, permission, pid, ppid, prependListener, prependOnceListener, rawListeners, reallyExit, ref, release, removeAllListeners, removeListener, report, resourceUsage, send, setegid, seteuid, setgid, setgroups, setMaxListeners, setSourceMapsEnabled, setuid, setUncaughtExceptionCaptureCallback, sourceMapsEnabled, stderr, stdin, stdout, throwDeprecation, title, traceDeprecation, umask, unref, uptime, version, versions, _process, process_default;
var init_process2 = __esm({
  "../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    init_hrtime();
    init_process();
    globalProcess = globalThis["process"];
    getBuiltinModule = globalProcess.getBuiltinModule;
    workerdProcess = getBuiltinModule("node:process");
    isWorkerdProcessV2 = globalThis.Cloudflare.compatibilityFlags.enable_nodejs_process_v2;
    unenvProcess = new Process({
      env: globalProcess.env,
      // `hrtime` is only available from workerd process v2
      hrtime: isWorkerdProcessV2 ? workerdProcess.hrtime : hrtime,
      // `nextTick` is available from workerd process v1
      nextTick: workerdProcess.nextTick
    });
    ({ exit, features, platform } = workerdProcess);
    ({
      env: (
        // Always implemented by workerd
        env
      ),
      hrtime: (
        // Only implemented in workerd v2
        hrtime3
      ),
      nextTick: (
        // Always implemented by workerd
        nextTick
      )
    } = unenvProcess);
    ({
      _channel,
      _disconnect,
      _events,
      _eventsCount,
      _handleQueue,
      _maxListeners,
      _pendingMessage,
      _send,
      assert,
      disconnect,
      mainModule
    } = unenvProcess);
    ({
      _debugEnd: (
        // @ts-expect-error `_debugEnd` is missing typings
        _debugEnd
      ),
      _debugProcess: (
        // @ts-expect-error `_debugProcess` is missing typings
        _debugProcess
      ),
      _exiting: (
        // @ts-expect-error `_exiting` is missing typings
        _exiting
      ),
      _fatalException: (
        // @ts-expect-error `_fatalException` is missing typings
        _fatalException
      ),
      _getActiveHandles: (
        // @ts-expect-error `_getActiveHandles` is missing typings
        _getActiveHandles
      ),
      _getActiveRequests: (
        // @ts-expect-error `_getActiveRequests` is missing typings
        _getActiveRequests
      ),
      _kill: (
        // @ts-expect-error `_kill` is missing typings
        _kill
      ),
      _linkedBinding: (
        // @ts-expect-error `_linkedBinding` is missing typings
        _linkedBinding
      ),
      _preload_modules: (
        // @ts-expect-error `_preload_modules` is missing typings
        _preload_modules
      ),
      _rawDebug: (
        // @ts-expect-error `_rawDebug` is missing typings
        _rawDebug
      ),
      _startProfilerIdleNotifier: (
        // @ts-expect-error `_startProfilerIdleNotifier` is missing typings
        _startProfilerIdleNotifier
      ),
      _stopProfilerIdleNotifier: (
        // @ts-expect-error `_stopProfilerIdleNotifier` is missing typings
        _stopProfilerIdleNotifier
      ),
      _tickCallback: (
        // @ts-expect-error `_tickCallback` is missing typings
        _tickCallback
      ),
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      arch,
      argv,
      argv0,
      availableMemory,
      binding: (
        // @ts-expect-error `binding` is missing typings
        binding
      ),
      channel,
      chdir,
      config,
      connected,
      constrainedMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      domain: (
        // @ts-expect-error `domain` is missing typings
        domain
      ),
      emit,
      emitWarning,
      eventNames,
      execArgv,
      execPath,
      exitCode,
      finalization,
      getActiveResourcesInfo,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getMaxListeners,
      getuid,
      hasUncaughtExceptionCaptureCallback,
      initgroups: (
        // @ts-expect-error `initgroups` is missing typings
        initgroups
      ),
      kill,
      listenerCount,
      listeners,
      loadEnvFile,
      memoryUsage,
      moduleLoadList: (
        // @ts-expect-error `moduleLoadList` is missing typings
        moduleLoadList
      ),
      off,
      on,
      once,
      openStdin: (
        // @ts-expect-error `openStdin` is missing typings
        openStdin
      ),
      permission,
      pid,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      reallyExit: (
        // @ts-expect-error `reallyExit` is missing typings
        reallyExit
      ),
      ref,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      send,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setMaxListeners,
      setSourceMapsEnabled,
      setuid,
      setUncaughtExceptionCaptureCallback,
      sourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      throwDeprecation,
      title,
      traceDeprecation,
      umask,
      unref,
      uptime,
      version,
      versions
    } = isWorkerdProcessV2 ? workerdProcess : unenvProcess);
    _process = {
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      arch,
      argv,
      argv0,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exit,
      finalization,
      features,
      getBuiltinModule,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime: hrtime3,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      nextTick,
      on,
      off,
      once,
      pid,
      platform,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      throwDeprecation,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions,
      // @ts-expect-error old API
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      openStdin,
      assert,
      binding,
      send,
      exitCode,
      channel,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      permission,
      mainModule,
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      _disconnect,
      _handleQueue,
      _pendingMessage,
      _channel,
      _send,
      _linkedBinding
    };
    process_default = _process;
  }
});

// ../../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process = __esm({
  "../../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process"() {
    init_process2();
    globalThis.process = process_default;
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
  }
});

// ../../node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "../../node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// ../../node_modules/@opentelemetry/api/build/src/platform/browser/globalThis.js
var require_globalThis = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/platform/browser/globalThis.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._globalThis = void 0;
    exports._globalThis = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof window === "object" ? window : typeof global === "object" ? global : {};
  }
});

// ../../node_modules/@opentelemetry/api/build/src/platform/browser/index.js
var require_browser = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/platform/browser/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return m[k];
      }, "get") });
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_globalThis(), exports);
  }
});

// ../../node_modules/@opentelemetry/api/build/src/version.js
var require_version = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/version.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VERSION = void 0;
    exports.VERSION = "1.9.0";
  }
});

// ../../node_modules/@opentelemetry/api/build/src/internal/semver.js
var require_semver = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/internal/semver.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isCompatible = exports._makeCompatibilityCheck = void 0;
    var version_1 = require_version();
    var re = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
    function _makeCompatibilityCheck(ownVersion) {
      const acceptedVersions = /* @__PURE__ */ new Set([ownVersion]);
      const rejectedVersions = /* @__PURE__ */ new Set();
      const myVersionMatch = ownVersion.match(re);
      if (!myVersionMatch) {
        return () => false;
      }
      const ownVersionParsed = {
        major: +myVersionMatch[1],
        minor: +myVersionMatch[2],
        patch: +myVersionMatch[3],
        prerelease: myVersionMatch[4]
      };
      if (ownVersionParsed.prerelease != null) {
        return /* @__PURE__ */ __name(function isExactmatch(globalVersion) {
          return globalVersion === ownVersion;
        }, "isExactmatch");
      }
      function _reject(v) {
        rejectedVersions.add(v);
        return false;
      }
      __name(_reject, "_reject");
      function _accept(v) {
        acceptedVersions.add(v);
        return true;
      }
      __name(_accept, "_accept");
      return /* @__PURE__ */ __name(function isCompatible(globalVersion) {
        if (acceptedVersions.has(globalVersion)) {
          return true;
        }
        if (rejectedVersions.has(globalVersion)) {
          return false;
        }
        const globalVersionMatch = globalVersion.match(re);
        if (!globalVersionMatch) {
          return _reject(globalVersion);
        }
        const globalVersionParsed = {
          major: +globalVersionMatch[1],
          minor: +globalVersionMatch[2],
          patch: +globalVersionMatch[3],
          prerelease: globalVersionMatch[4]
        };
        if (globalVersionParsed.prerelease != null) {
          return _reject(globalVersion);
        }
        if (ownVersionParsed.major !== globalVersionParsed.major) {
          return _reject(globalVersion);
        }
        if (ownVersionParsed.major === 0) {
          if (ownVersionParsed.minor === globalVersionParsed.minor && ownVersionParsed.patch <= globalVersionParsed.patch) {
            return _accept(globalVersion);
          }
          return _reject(globalVersion);
        }
        if (ownVersionParsed.minor <= globalVersionParsed.minor) {
          return _accept(globalVersion);
        }
        return _reject(globalVersion);
      }, "isCompatible");
    }
    __name(_makeCompatibilityCheck, "_makeCompatibilityCheck");
    exports._makeCompatibilityCheck = _makeCompatibilityCheck;
    exports.isCompatible = _makeCompatibilityCheck(version_1.VERSION);
  }
});

// ../../node_modules/@opentelemetry/api/build/src/internal/global-utils.js
var require_global_utils = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/internal/global-utils.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unregisterGlobal = exports.getGlobal = exports.registerGlobal = void 0;
    var platform_1 = require_browser();
    var version_1 = require_version();
    var semver_1 = require_semver();
    var major = version_1.VERSION.split(".")[0];
    var GLOBAL_OPENTELEMETRY_API_KEY = Symbol.for(`opentelemetry.js.api.${major}`);
    var _global = platform_1._globalThis;
    function registerGlobal(type, instance, diag4, allowOverride = false) {
      var _a;
      const api = _global[GLOBAL_OPENTELEMETRY_API_KEY] = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) !== null && _a !== void 0 ? _a : {
        version: version_1.VERSION
      };
      if (!allowOverride && api[type]) {
        const err = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${type}`);
        diag4.error(err.stack || err.message);
        return false;
      }
      if (api.version !== version_1.VERSION) {
        const err = new Error(`@opentelemetry/api: Registration of version v${api.version} for ${type} does not match previously registered API v${version_1.VERSION}`);
        diag4.error(err.stack || err.message);
        return false;
      }
      api[type] = instance;
      diag4.debug(`@opentelemetry/api: Registered a global for ${type} v${version_1.VERSION}.`);
      return true;
    }
    __name(registerGlobal, "registerGlobal");
    exports.registerGlobal = registerGlobal;
    function getGlobal(type) {
      var _a, _b;
      const globalVersion = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _a === void 0 ? void 0 : _a.version;
      if (!globalVersion || !(0, semver_1.isCompatible)(globalVersion)) {
        return;
      }
      return (_b = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _b === void 0 ? void 0 : _b[type];
    }
    __name(getGlobal, "getGlobal");
    exports.getGlobal = getGlobal;
    function unregisterGlobal(type, diag4) {
      diag4.debug(`@opentelemetry/api: Unregistering a global for ${type} v${version_1.VERSION}.`);
      const api = _global[GLOBAL_OPENTELEMETRY_API_KEY];
      if (api) {
        delete api[type];
      }
    }
    __name(unregisterGlobal, "unregisterGlobal");
    exports.unregisterGlobal = unregisterGlobal;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/diag/ComponentLogger.js
var require_ComponentLogger = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/diag/ComponentLogger.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiagComponentLogger = void 0;
    var global_utils_1 = require_global_utils();
    var DiagComponentLogger = class {
      static {
        __name(this, "DiagComponentLogger");
      }
      constructor(props) {
        this._namespace = props.namespace || "DiagComponentLogger";
      }
      debug(...args) {
        return logProxy("debug", this._namespace, args);
      }
      error(...args) {
        return logProxy("error", this._namespace, args);
      }
      info(...args) {
        return logProxy("info", this._namespace, args);
      }
      warn(...args) {
        return logProxy("warn", this._namespace, args);
      }
      verbose(...args) {
        return logProxy("verbose", this._namespace, args);
      }
    };
    exports.DiagComponentLogger = DiagComponentLogger;
    function logProxy(funcName, namespace, args) {
      const logger = (0, global_utils_1.getGlobal)("diag");
      if (!logger) {
        return;
      }
      args.unshift(namespace);
      return logger[funcName](...args);
    }
    __name(logProxy, "logProxy");
  }
});

// ../../node_modules/@opentelemetry/api/build/src/diag/types.js
var require_types = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/diag/types.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiagLogLevel = void 0;
    var DiagLogLevel;
    (function(DiagLogLevel2) {
      DiagLogLevel2[DiagLogLevel2["NONE"] = 0] = "NONE";
      DiagLogLevel2[DiagLogLevel2["ERROR"] = 30] = "ERROR";
      DiagLogLevel2[DiagLogLevel2["WARN"] = 50] = "WARN";
      DiagLogLevel2[DiagLogLevel2["INFO"] = 60] = "INFO";
      DiagLogLevel2[DiagLogLevel2["DEBUG"] = 70] = "DEBUG";
      DiagLogLevel2[DiagLogLevel2["VERBOSE"] = 80] = "VERBOSE";
      DiagLogLevel2[DiagLogLevel2["ALL"] = 9999] = "ALL";
    })(DiagLogLevel = exports.DiagLogLevel || (exports.DiagLogLevel = {}));
  }
});

// ../../node_modules/@opentelemetry/api/build/src/diag/internal/logLevelLogger.js
var require_logLevelLogger = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/diag/internal/logLevelLogger.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createLogLevelDiagLogger = void 0;
    var types_1 = require_types();
    function createLogLevelDiagLogger(maxLevel, logger) {
      if (maxLevel < types_1.DiagLogLevel.NONE) {
        maxLevel = types_1.DiagLogLevel.NONE;
      } else if (maxLevel > types_1.DiagLogLevel.ALL) {
        maxLevel = types_1.DiagLogLevel.ALL;
      }
      logger = logger || {};
      function _filterFunc(funcName, theLevel) {
        const theFunc = logger[funcName];
        if (typeof theFunc === "function" && maxLevel >= theLevel) {
          return theFunc.bind(logger);
        }
        return function() {
        };
      }
      __name(_filterFunc, "_filterFunc");
      return {
        error: _filterFunc("error", types_1.DiagLogLevel.ERROR),
        warn: _filterFunc("warn", types_1.DiagLogLevel.WARN),
        info: _filterFunc("info", types_1.DiagLogLevel.INFO),
        debug: _filterFunc("debug", types_1.DiagLogLevel.DEBUG),
        verbose: _filterFunc("verbose", types_1.DiagLogLevel.VERBOSE)
      };
    }
    __name(createLogLevelDiagLogger, "createLogLevelDiagLogger");
    exports.createLogLevelDiagLogger = createLogLevelDiagLogger;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/api/diag.js
var require_diag = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/api/diag.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiagAPI = void 0;
    var ComponentLogger_1 = require_ComponentLogger();
    var logLevelLogger_1 = require_logLevelLogger();
    var types_1 = require_types();
    var global_utils_1 = require_global_utils();
    var API_NAME = "diag";
    var DiagAPI = class _DiagAPI {
      static {
        __name(this, "DiagAPI");
      }
      /**
       * Private internal constructor
       * @private
       */
      constructor() {
        function _logProxy(funcName) {
          return function(...args) {
            const logger = (0, global_utils_1.getGlobal)("diag");
            if (!logger)
              return;
            return logger[funcName](...args);
          };
        }
        __name(_logProxy, "_logProxy");
        const self2 = this;
        const setLogger = /* @__PURE__ */ __name((logger, optionsOrLogLevel = { logLevel: types_1.DiagLogLevel.INFO }) => {
          var _a, _b, _c;
          if (logger === self2) {
            const err = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
            self2.error((_a = err.stack) !== null && _a !== void 0 ? _a : err.message);
            return false;
          }
          if (typeof optionsOrLogLevel === "number") {
            optionsOrLogLevel = {
              logLevel: optionsOrLogLevel
            };
          }
          const oldLogger = (0, global_utils_1.getGlobal)("diag");
          const newLogger = (0, logLevelLogger_1.createLogLevelDiagLogger)((_b = optionsOrLogLevel.logLevel) !== null && _b !== void 0 ? _b : types_1.DiagLogLevel.INFO, logger);
          if (oldLogger && !optionsOrLogLevel.suppressOverrideMessage) {
            const stack = (_c = new Error().stack) !== null && _c !== void 0 ? _c : "<failed to generate stacktrace>";
            oldLogger.warn(`Current logger will be overwritten from ${stack}`);
            newLogger.warn(`Current logger will overwrite one already registered from ${stack}`);
          }
          return (0, global_utils_1.registerGlobal)("diag", newLogger, self2, true);
        }, "setLogger");
        self2.setLogger = setLogger;
        self2.disable = () => {
          (0, global_utils_1.unregisterGlobal)(API_NAME, self2);
        };
        self2.createComponentLogger = (options) => {
          return new ComponentLogger_1.DiagComponentLogger(options);
        };
        self2.verbose = _logProxy("verbose");
        self2.debug = _logProxy("debug");
        self2.info = _logProxy("info");
        self2.warn = _logProxy("warn");
        self2.error = _logProxy("error");
      }
      /** Get the singleton instance of the DiagAPI API */
      static instance() {
        if (!this._instance) {
          this._instance = new _DiagAPI();
        }
        return this._instance;
      }
    };
    exports.DiagAPI = DiagAPI;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/baggage/internal/baggage-impl.js
var require_baggage_impl = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/baggage/internal/baggage-impl.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BaggageImpl = void 0;
    var BaggageImpl = class _BaggageImpl {
      static {
        __name(this, "BaggageImpl");
      }
      constructor(entries) {
        this._entries = entries ? new Map(entries) : /* @__PURE__ */ new Map();
      }
      getEntry(key) {
        const entry = this._entries.get(key);
        if (!entry) {
          return void 0;
        }
        return Object.assign({}, entry);
      }
      getAllEntries() {
        return Array.from(this._entries.entries()).map(([k, v]) => [k, v]);
      }
      setEntry(key, entry) {
        const newBaggage = new _BaggageImpl(this._entries);
        newBaggage._entries.set(key, entry);
        return newBaggage;
      }
      removeEntry(key) {
        const newBaggage = new _BaggageImpl(this._entries);
        newBaggage._entries.delete(key);
        return newBaggage;
      }
      removeEntries(...keys) {
        const newBaggage = new _BaggageImpl(this._entries);
        for (const key of keys) {
          newBaggage._entries.delete(key);
        }
        return newBaggage;
      }
      clear() {
        return new _BaggageImpl();
      }
    };
    exports.BaggageImpl = BaggageImpl;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/baggage/internal/symbol.js
var require_symbol = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/baggage/internal/symbol.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.baggageEntryMetadataSymbol = void 0;
    exports.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
  }
});

// ../../node_modules/@opentelemetry/api/build/src/baggage/utils.js
var require_utils = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/baggage/utils.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.baggageEntryMetadataFromString = exports.createBaggage = void 0;
    var diag_1 = require_diag();
    var baggage_impl_1 = require_baggage_impl();
    var symbol_1 = require_symbol();
    var diag4 = diag_1.DiagAPI.instance();
    function createBaggage(entries = {}) {
      return new baggage_impl_1.BaggageImpl(new Map(Object.entries(entries)));
    }
    __name(createBaggage, "createBaggage");
    exports.createBaggage = createBaggage;
    function baggageEntryMetadataFromString(str) {
      if (typeof str !== "string") {
        diag4.error(`Cannot create baggage metadata from unknown type: ${typeof str}`);
        str = "";
      }
      return {
        __TYPE__: symbol_1.baggageEntryMetadataSymbol,
        toString() {
          return str;
        }
      };
    }
    __name(baggageEntryMetadataFromString, "baggageEntryMetadataFromString");
    exports.baggageEntryMetadataFromString = baggageEntryMetadataFromString;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/context/context.js
var require_context = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/context/context.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ROOT_CONTEXT = exports.createContextKey = void 0;
    function createContextKey2(description) {
      return Symbol.for(description);
    }
    __name(createContextKey2, "createContextKey");
    exports.createContextKey = createContextKey2;
    var BaseContext = class _BaseContext {
      static {
        __name(this, "BaseContext");
      }
      /**
       * Construct a new context which inherits values from an optional parent context.
       *
       * @param parentContext a context from which to inherit values
       */
      constructor(parentContext) {
        const self2 = this;
        self2._currentContext = parentContext ? new Map(parentContext) : /* @__PURE__ */ new Map();
        self2.getValue = (key) => self2._currentContext.get(key);
        self2.setValue = (key, value) => {
          const context3 = new _BaseContext(self2._currentContext);
          context3._currentContext.set(key, value);
          return context3;
        };
        self2.deleteValue = (key) => {
          const context3 = new _BaseContext(self2._currentContext);
          context3._currentContext.delete(key);
          return context3;
        };
      }
    };
    exports.ROOT_CONTEXT = new BaseContext();
  }
});

// ../../node_modules/@opentelemetry/api/build/src/diag/consoleLogger.js
var require_consoleLogger = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/diag/consoleLogger.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiagConsoleLogger = void 0;
    var consoleMap = [
      { n: "error", c: "error" },
      { n: "warn", c: "warn" },
      { n: "info", c: "info" },
      { n: "debug", c: "debug" },
      { n: "verbose", c: "trace" }
    ];
    var DiagConsoleLogger = class {
      static {
        __name(this, "DiagConsoleLogger");
      }
      constructor() {
        function _consoleFunc(funcName) {
          return function(...args) {
            if (console) {
              let theFunc = console[funcName];
              if (typeof theFunc !== "function") {
                theFunc = console.log;
              }
              if (typeof theFunc === "function") {
                return theFunc.apply(console, args);
              }
            }
          };
        }
        __name(_consoleFunc, "_consoleFunc");
        for (let i = 0; i < consoleMap.length; i++) {
          this[consoleMap[i].n] = _consoleFunc(consoleMap[i].c);
        }
      }
    };
    exports.DiagConsoleLogger = DiagConsoleLogger;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/metrics/NoopMeter.js
var require_NoopMeter = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/metrics/NoopMeter.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createNoopMeter = exports.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = exports.NOOP_OBSERVABLE_GAUGE_METRIC = exports.NOOP_OBSERVABLE_COUNTER_METRIC = exports.NOOP_UP_DOWN_COUNTER_METRIC = exports.NOOP_HISTOGRAM_METRIC = exports.NOOP_GAUGE_METRIC = exports.NOOP_COUNTER_METRIC = exports.NOOP_METER = exports.NoopObservableUpDownCounterMetric = exports.NoopObservableGaugeMetric = exports.NoopObservableCounterMetric = exports.NoopObservableMetric = exports.NoopHistogramMetric = exports.NoopGaugeMetric = exports.NoopUpDownCounterMetric = exports.NoopCounterMetric = exports.NoopMetric = exports.NoopMeter = void 0;
    var NoopMeter = class {
      static {
        __name(this, "NoopMeter");
      }
      constructor() {
      }
      /**
       * @see {@link Meter.createGauge}
       */
      createGauge(_name, _options) {
        return exports.NOOP_GAUGE_METRIC;
      }
      /**
       * @see {@link Meter.createHistogram}
       */
      createHistogram(_name, _options) {
        return exports.NOOP_HISTOGRAM_METRIC;
      }
      /**
       * @see {@link Meter.createCounter}
       */
      createCounter(_name, _options) {
        return exports.NOOP_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.createUpDownCounter}
       */
      createUpDownCounter(_name, _options) {
        return exports.NOOP_UP_DOWN_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.createObservableGauge}
       */
      createObservableGauge(_name, _options) {
        return exports.NOOP_OBSERVABLE_GAUGE_METRIC;
      }
      /**
       * @see {@link Meter.createObservableCounter}
       */
      createObservableCounter(_name, _options) {
        return exports.NOOP_OBSERVABLE_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.createObservableUpDownCounter}
       */
      createObservableUpDownCounter(_name, _options) {
        return exports.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.addBatchObservableCallback}
       */
      addBatchObservableCallback(_callback, _observables) {
      }
      /**
       * @see {@link Meter.removeBatchObservableCallback}
       */
      removeBatchObservableCallback(_callback) {
      }
    };
    exports.NoopMeter = NoopMeter;
    var NoopMetric = class {
      static {
        __name(this, "NoopMetric");
      }
    };
    exports.NoopMetric = NoopMetric;
    var NoopCounterMetric = class extends NoopMetric {
      static {
        __name(this, "NoopCounterMetric");
      }
      add(_value, _attributes) {
      }
    };
    exports.NoopCounterMetric = NoopCounterMetric;
    var NoopUpDownCounterMetric = class extends NoopMetric {
      static {
        __name(this, "NoopUpDownCounterMetric");
      }
      add(_value, _attributes) {
      }
    };
    exports.NoopUpDownCounterMetric = NoopUpDownCounterMetric;
    var NoopGaugeMetric = class extends NoopMetric {
      static {
        __name(this, "NoopGaugeMetric");
      }
      record(_value, _attributes) {
      }
    };
    exports.NoopGaugeMetric = NoopGaugeMetric;
    var NoopHistogramMetric = class extends NoopMetric {
      static {
        __name(this, "NoopHistogramMetric");
      }
      record(_value, _attributes) {
      }
    };
    exports.NoopHistogramMetric = NoopHistogramMetric;
    var NoopObservableMetric = class {
      static {
        __name(this, "NoopObservableMetric");
      }
      addCallback(_callback) {
      }
      removeCallback(_callback) {
      }
    };
    exports.NoopObservableMetric = NoopObservableMetric;
    var NoopObservableCounterMetric = class extends NoopObservableMetric {
      static {
        __name(this, "NoopObservableCounterMetric");
      }
    };
    exports.NoopObservableCounterMetric = NoopObservableCounterMetric;
    var NoopObservableGaugeMetric = class extends NoopObservableMetric {
      static {
        __name(this, "NoopObservableGaugeMetric");
      }
    };
    exports.NoopObservableGaugeMetric = NoopObservableGaugeMetric;
    var NoopObservableUpDownCounterMetric = class extends NoopObservableMetric {
      static {
        __name(this, "NoopObservableUpDownCounterMetric");
      }
    };
    exports.NoopObservableUpDownCounterMetric = NoopObservableUpDownCounterMetric;
    exports.NOOP_METER = new NoopMeter();
    exports.NOOP_COUNTER_METRIC = new NoopCounterMetric();
    exports.NOOP_GAUGE_METRIC = new NoopGaugeMetric();
    exports.NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric();
    exports.NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric();
    exports.NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric();
    exports.NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric();
    exports.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new NoopObservableUpDownCounterMetric();
    function createNoopMeter() {
      return exports.NOOP_METER;
    }
    __name(createNoopMeter, "createNoopMeter");
    exports.createNoopMeter = createNoopMeter;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/metrics/Metric.js
var require_Metric = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/metrics/Metric.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValueType = void 0;
    var ValueType;
    (function(ValueType2) {
      ValueType2[ValueType2["INT"] = 0] = "INT";
      ValueType2[ValueType2["DOUBLE"] = 1] = "DOUBLE";
    })(ValueType = exports.ValueType || (exports.ValueType = {}));
  }
});

// ../../node_modules/@opentelemetry/api/build/src/propagation/TextMapPropagator.js
var require_TextMapPropagator = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/propagation/TextMapPropagator.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultTextMapSetter = exports.defaultTextMapGetter = void 0;
    exports.defaultTextMapGetter = {
      get(carrier, key) {
        if (carrier == null) {
          return void 0;
        }
        return carrier[key];
      },
      keys(carrier) {
        if (carrier == null) {
          return [];
        }
        return Object.keys(carrier);
      }
    };
    exports.defaultTextMapSetter = {
      set(carrier, key, value) {
        if (carrier == null) {
          return;
        }
        carrier[key] = value;
      }
    };
  }
});

// ../../node_modules/@opentelemetry/api/build/src/context/NoopContextManager.js
var require_NoopContextManager = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/context/NoopContextManager.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoopContextManager = void 0;
    var context_1 = require_context();
    var NoopContextManager = class {
      static {
        __name(this, "NoopContextManager");
      }
      active() {
        return context_1.ROOT_CONTEXT;
      }
      with(_context, fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      bind(_context, target) {
        return target;
      }
      enable() {
        return this;
      }
      disable() {
        return this;
      }
    };
    exports.NoopContextManager = NoopContextManager;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/api/context.js
var require_context2 = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/api/context.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ContextAPI = void 0;
    var NoopContextManager_1 = require_NoopContextManager();
    var global_utils_1 = require_global_utils();
    var diag_1 = require_diag();
    var API_NAME = "context";
    var NOOP_CONTEXT_MANAGER = new NoopContextManager_1.NoopContextManager();
    var ContextAPI = class _ContextAPI {
      static {
        __name(this, "ContextAPI");
      }
      /** Empty private constructor prevents end users from constructing a new instance of the API */
      constructor() {
      }
      /** Get the singleton instance of the Context API */
      static getInstance() {
        if (!this._instance) {
          this._instance = new _ContextAPI();
        }
        return this._instance;
      }
      /**
       * Set the current context manager.
       *
       * @returns true if the context manager was successfully registered, else false
       */
      setGlobalContextManager(contextManager) {
        return (0, global_utils_1.registerGlobal)(API_NAME, contextManager, diag_1.DiagAPI.instance());
      }
      /**
       * Get the currently active context
       */
      active() {
        return this._getContextManager().active();
      }
      /**
       * Execute a function with an active context
       *
       * @param context context to be active during function execution
       * @param fn function to execute in a context
       * @param thisArg optional receiver to be used for calling fn
       * @param args optional arguments forwarded to fn
       */
      with(context3, fn, thisArg, ...args) {
        return this._getContextManager().with(context3, fn, thisArg, ...args);
      }
      /**
       * Bind a context to a target function or event emitter
       *
       * @param context context to bind to the event emitter or function. Defaults to the currently active context
       * @param target function or event emitter to bind
       */
      bind(context3, target) {
        return this._getContextManager().bind(context3, target);
      }
      _getContextManager() {
        return (0, global_utils_1.getGlobal)(API_NAME) || NOOP_CONTEXT_MANAGER;
      }
      /** Disable and remove the global context manager */
      disable() {
        this._getContextManager().disable();
        (0, global_utils_1.unregisterGlobal)(API_NAME, diag_1.DiagAPI.instance());
      }
    };
    exports.ContextAPI = ContextAPI;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/trace/trace_flags.js
var require_trace_flags = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/trace/trace_flags.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TraceFlags = void 0;
    var TraceFlags4;
    (function(TraceFlags5) {
      TraceFlags5[TraceFlags5["NONE"] = 0] = "NONE";
      TraceFlags5[TraceFlags5["SAMPLED"] = 1] = "SAMPLED";
    })(TraceFlags4 = exports.TraceFlags || (exports.TraceFlags = {}));
  }
});

// ../../node_modules/@opentelemetry/api/build/src/trace/invalid-span-constants.js
var require_invalid_span_constants = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/trace/invalid-span-constants.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.INVALID_SPAN_CONTEXT = exports.INVALID_TRACEID = exports.INVALID_SPANID = void 0;
    var trace_flags_1 = require_trace_flags();
    exports.INVALID_SPANID = "0000000000000000";
    exports.INVALID_TRACEID = "00000000000000000000000000000000";
    exports.INVALID_SPAN_CONTEXT = {
      traceId: exports.INVALID_TRACEID,
      spanId: exports.INVALID_SPANID,
      traceFlags: trace_flags_1.TraceFlags.NONE
    };
  }
});

// ../../node_modules/@opentelemetry/api/build/src/trace/NonRecordingSpan.js
var require_NonRecordingSpan = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/trace/NonRecordingSpan.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NonRecordingSpan = void 0;
    var invalid_span_constants_1 = require_invalid_span_constants();
    var NonRecordingSpan = class {
      static {
        __name(this, "NonRecordingSpan");
      }
      constructor(_spanContext = invalid_span_constants_1.INVALID_SPAN_CONTEXT) {
        this._spanContext = _spanContext;
      }
      // Returns a SpanContext.
      spanContext() {
        return this._spanContext;
      }
      // By default does nothing
      setAttribute(_key, _value) {
        return this;
      }
      // By default does nothing
      setAttributes(_attributes) {
        return this;
      }
      // By default does nothing
      addEvent(_name, _attributes) {
        return this;
      }
      addLink(_link) {
        return this;
      }
      addLinks(_links) {
        return this;
      }
      // By default does nothing
      setStatus(_status) {
        return this;
      }
      // By default does nothing
      updateName(_name) {
        return this;
      }
      // By default does nothing
      end(_endTime) {
      }
      // isRecording always returns false for NonRecordingSpan.
      isRecording() {
        return false;
      }
      // By default does nothing
      recordException(_exception, _time) {
      }
    };
    exports.NonRecordingSpan = NonRecordingSpan;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/trace/context-utils.js
var require_context_utils = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/trace/context-utils.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSpanContext = exports.setSpanContext = exports.deleteSpan = exports.setSpan = exports.getActiveSpan = exports.getSpan = void 0;
    var context_1 = require_context();
    var NonRecordingSpan_1 = require_NonRecordingSpan();
    var context_2 = require_context2();
    var SPAN_KEY = (0, context_1.createContextKey)("OpenTelemetry Context Key SPAN");
    function getSpan(context3) {
      return context3.getValue(SPAN_KEY) || void 0;
    }
    __name(getSpan, "getSpan");
    exports.getSpan = getSpan;
    function getActiveSpan() {
      return getSpan(context_2.ContextAPI.getInstance().active());
    }
    __name(getActiveSpan, "getActiveSpan");
    exports.getActiveSpan = getActiveSpan;
    function setSpan(context3, span) {
      return context3.setValue(SPAN_KEY, span);
    }
    __name(setSpan, "setSpan");
    exports.setSpan = setSpan;
    function deleteSpan(context3) {
      return context3.deleteValue(SPAN_KEY);
    }
    __name(deleteSpan, "deleteSpan");
    exports.deleteSpan = deleteSpan;
    function setSpanContext(context3, spanContext) {
      return setSpan(context3, new NonRecordingSpan_1.NonRecordingSpan(spanContext));
    }
    __name(setSpanContext, "setSpanContext");
    exports.setSpanContext = setSpanContext;
    function getSpanContext(context3) {
      var _a;
      return (_a = getSpan(context3)) === null || _a === void 0 ? void 0 : _a.spanContext();
    }
    __name(getSpanContext, "getSpanContext");
    exports.getSpanContext = getSpanContext;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/trace/spancontext-utils.js
var require_spancontext_utils = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/trace/spancontext-utils.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wrapSpanContext = exports.isSpanContextValid = exports.isValidSpanId = exports.isValidTraceId = void 0;
    var invalid_span_constants_1 = require_invalid_span_constants();
    var NonRecordingSpan_1 = require_NonRecordingSpan();
    var VALID_TRACEID_REGEX = /^([0-9a-f]{32})$/i;
    var VALID_SPANID_REGEX = /^[0-9a-f]{16}$/i;
    function isValidTraceId2(traceId) {
      return VALID_TRACEID_REGEX.test(traceId) && traceId !== invalid_span_constants_1.INVALID_TRACEID;
    }
    __name(isValidTraceId2, "isValidTraceId");
    exports.isValidTraceId = isValidTraceId2;
    function isValidSpanId(spanId) {
      return VALID_SPANID_REGEX.test(spanId) && spanId !== invalid_span_constants_1.INVALID_SPANID;
    }
    __name(isValidSpanId, "isValidSpanId");
    exports.isValidSpanId = isValidSpanId;
    function isSpanContextValid3(spanContext) {
      return isValidTraceId2(spanContext.traceId) && isValidSpanId(spanContext.spanId);
    }
    __name(isSpanContextValid3, "isSpanContextValid");
    exports.isSpanContextValid = isSpanContextValid3;
    function wrapSpanContext(spanContext) {
      return new NonRecordingSpan_1.NonRecordingSpan(spanContext);
    }
    __name(wrapSpanContext, "wrapSpanContext");
    exports.wrapSpanContext = wrapSpanContext;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/trace/NoopTracer.js
var require_NoopTracer = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/trace/NoopTracer.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoopTracer = void 0;
    var context_1 = require_context2();
    var context_utils_1 = require_context_utils();
    var NonRecordingSpan_1 = require_NonRecordingSpan();
    var spancontext_utils_1 = require_spancontext_utils();
    var contextApi = context_1.ContextAPI.getInstance();
    var NoopTracer = class {
      static {
        __name(this, "NoopTracer");
      }
      // startSpan starts a noop span.
      startSpan(name, options, context3 = contextApi.active()) {
        const root = Boolean(options === null || options === void 0 ? void 0 : options.root);
        if (root) {
          return new NonRecordingSpan_1.NonRecordingSpan();
        }
        const parentFromContext = context3 && (0, context_utils_1.getSpanContext)(context3);
        if (isSpanContext(parentFromContext) && (0, spancontext_utils_1.isSpanContextValid)(parentFromContext)) {
          return new NonRecordingSpan_1.NonRecordingSpan(parentFromContext);
        } else {
          return new NonRecordingSpan_1.NonRecordingSpan();
        }
      }
      startActiveSpan(name, arg2, arg3, arg4) {
        let opts;
        let ctx;
        let fn;
        if (arguments.length < 2) {
          return;
        } else if (arguments.length === 2) {
          fn = arg2;
        } else if (arguments.length === 3) {
          opts = arg2;
          fn = arg3;
        } else {
          opts = arg2;
          ctx = arg3;
          fn = arg4;
        }
        const parentContext = ctx !== null && ctx !== void 0 ? ctx : contextApi.active();
        const span = this.startSpan(name, opts, parentContext);
        const contextWithSpanSet = (0, context_utils_1.setSpan)(parentContext, span);
        return contextApi.with(contextWithSpanSet, fn, void 0, span);
      }
    };
    exports.NoopTracer = NoopTracer;
    function isSpanContext(spanContext) {
      return typeof spanContext === "object" && typeof spanContext["spanId"] === "string" && typeof spanContext["traceId"] === "string" && typeof spanContext["traceFlags"] === "number";
    }
    __name(isSpanContext, "isSpanContext");
  }
});

// ../../node_modules/@opentelemetry/api/build/src/trace/ProxyTracer.js
var require_ProxyTracer = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/trace/ProxyTracer.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProxyTracer = void 0;
    var NoopTracer_1 = require_NoopTracer();
    var NOOP_TRACER = new NoopTracer_1.NoopTracer();
    var ProxyTracer = class {
      static {
        __name(this, "ProxyTracer");
      }
      constructor(_provider, name, version2, options) {
        this._provider = _provider;
        this.name = name;
        this.version = version2;
        this.options = options;
      }
      startSpan(name, options, context3) {
        return this._getTracer().startSpan(name, options, context3);
      }
      startActiveSpan(_name, _options, _context, _fn) {
        const tracer2 = this._getTracer();
        return Reflect.apply(tracer2.startActiveSpan, tracer2, arguments);
      }
      /**
       * Try to get a tracer from the proxy tracer provider.
       * If the proxy tracer provider has no delegate, return a noop tracer.
       */
      _getTracer() {
        if (this._delegate) {
          return this._delegate;
        }
        const tracer2 = this._provider.getDelegateTracer(this.name, this.version, this.options);
        if (!tracer2) {
          return NOOP_TRACER;
        }
        this._delegate = tracer2;
        return this._delegate;
      }
    };
    exports.ProxyTracer = ProxyTracer;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/trace/NoopTracerProvider.js
var require_NoopTracerProvider = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/trace/NoopTracerProvider.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoopTracerProvider = void 0;
    var NoopTracer_1 = require_NoopTracer();
    var NoopTracerProvider = class {
      static {
        __name(this, "NoopTracerProvider");
      }
      getTracer(_name, _version, _options) {
        return new NoopTracer_1.NoopTracer();
      }
    };
    exports.NoopTracerProvider = NoopTracerProvider;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/trace/ProxyTracerProvider.js
var require_ProxyTracerProvider = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/trace/ProxyTracerProvider.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProxyTracerProvider = void 0;
    var ProxyTracer_1 = require_ProxyTracer();
    var NoopTracerProvider_1 = require_NoopTracerProvider();
    var NOOP_TRACER_PROVIDER = new NoopTracerProvider_1.NoopTracerProvider();
    var ProxyTracerProvider = class {
      static {
        __name(this, "ProxyTracerProvider");
      }
      /**
       * Get a {@link ProxyTracer}
       */
      getTracer(name, version2, options) {
        var _a;
        return (_a = this.getDelegateTracer(name, version2, options)) !== null && _a !== void 0 ? _a : new ProxyTracer_1.ProxyTracer(this, name, version2, options);
      }
      getDelegate() {
        var _a;
        return (_a = this._delegate) !== null && _a !== void 0 ? _a : NOOP_TRACER_PROVIDER;
      }
      /**
       * Set the delegate tracer provider
       */
      setDelegate(delegate) {
        this._delegate = delegate;
      }
      getDelegateTracer(name, version2, options) {
        var _a;
        return (_a = this._delegate) === null || _a === void 0 ? void 0 : _a.getTracer(name, version2, options);
      }
    };
    exports.ProxyTracerProvider = ProxyTracerProvider;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/trace/SamplingResult.js
var require_SamplingResult = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/trace/SamplingResult.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SamplingDecision = void 0;
    var SamplingDecision2;
    (function(SamplingDecision3) {
      SamplingDecision3[SamplingDecision3["NOT_RECORD"] = 0] = "NOT_RECORD";
      SamplingDecision3[SamplingDecision3["RECORD"] = 1] = "RECORD";
      SamplingDecision3[SamplingDecision3["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
    })(SamplingDecision2 = exports.SamplingDecision || (exports.SamplingDecision = {}));
  }
});

// ../../node_modules/@opentelemetry/api/build/src/trace/span_kind.js
var require_span_kind = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/trace/span_kind.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpanKind = void 0;
    var SpanKind9;
    (function(SpanKind10) {
      SpanKind10[SpanKind10["INTERNAL"] = 0] = "INTERNAL";
      SpanKind10[SpanKind10["SERVER"] = 1] = "SERVER";
      SpanKind10[SpanKind10["CLIENT"] = 2] = "CLIENT";
      SpanKind10[SpanKind10["PRODUCER"] = 3] = "PRODUCER";
      SpanKind10[SpanKind10["CONSUMER"] = 4] = "CONSUMER";
    })(SpanKind9 = exports.SpanKind || (exports.SpanKind = {}));
  }
});

// ../../node_modules/@opentelemetry/api/build/src/trace/status.js
var require_status = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/trace/status.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpanStatusCode = void 0;
    var SpanStatusCode5;
    (function(SpanStatusCode7) {
      SpanStatusCode7[SpanStatusCode7["UNSET"] = 0] = "UNSET";
      SpanStatusCode7[SpanStatusCode7["OK"] = 1] = "OK";
      SpanStatusCode7[SpanStatusCode7["ERROR"] = 2] = "ERROR";
    })(SpanStatusCode5 = exports.SpanStatusCode || (exports.SpanStatusCode = {}));
  }
});

// ../../node_modules/@opentelemetry/api/build/src/trace/internal/tracestate-validators.js
var require_tracestate_validators = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/trace/internal/tracestate-validators.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateValue = exports.validateKey = void 0;
    var VALID_KEY_CHAR_RANGE2 = "[_0-9a-z-*/]";
    var VALID_KEY2 = `[a-z]${VALID_KEY_CHAR_RANGE2}{0,255}`;
    var VALID_VENDOR_KEY2 = `[a-z0-9]${VALID_KEY_CHAR_RANGE2}{0,240}@[a-z]${VALID_KEY_CHAR_RANGE2}{0,13}`;
    var VALID_KEY_REGEX2 = new RegExp(`^(?:${VALID_KEY2}|${VALID_VENDOR_KEY2})$`);
    var VALID_VALUE_BASE_REGEX2 = /^[ -~]{0,255}[!-~]$/;
    var INVALID_VALUE_COMMA_EQUAL_REGEX2 = /,|=/;
    function validateKey2(key) {
      return VALID_KEY_REGEX2.test(key);
    }
    __name(validateKey2, "validateKey");
    exports.validateKey = validateKey2;
    function validateValue2(value) {
      return VALID_VALUE_BASE_REGEX2.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX2.test(value);
    }
    __name(validateValue2, "validateValue");
    exports.validateValue = validateValue2;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/trace/internal/tracestate-impl.js
var require_tracestate_impl = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/trace/internal/tracestate-impl.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TraceStateImpl = void 0;
    var tracestate_validators_1 = require_tracestate_validators();
    var MAX_TRACE_STATE_ITEMS2 = 32;
    var MAX_TRACE_STATE_LEN2 = 512;
    var LIST_MEMBERS_SEPARATOR2 = ",";
    var LIST_MEMBER_KEY_VALUE_SPLITTER2 = "=";
    var TraceStateImpl = class _TraceStateImpl {
      static {
        __name(this, "TraceStateImpl");
      }
      constructor(rawTraceState) {
        this._internalState = /* @__PURE__ */ new Map();
        if (rawTraceState)
          this._parse(rawTraceState);
      }
      set(key, value) {
        const traceState = this._clone();
        if (traceState._internalState.has(key)) {
          traceState._internalState.delete(key);
        }
        traceState._internalState.set(key, value);
        return traceState;
      }
      unset(key) {
        const traceState = this._clone();
        traceState._internalState.delete(key);
        return traceState;
      }
      get(key) {
        return this._internalState.get(key);
      }
      serialize() {
        return this._keys().reduce((agg, key) => {
          agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER2 + this.get(key));
          return agg;
        }, []).join(LIST_MEMBERS_SEPARATOR2);
      }
      _parse(rawTraceState) {
        if (rawTraceState.length > MAX_TRACE_STATE_LEN2)
          return;
        this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR2).reverse().reduce((agg, part) => {
          const listMember = part.trim();
          const i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER2);
          if (i !== -1) {
            const key = listMember.slice(0, i);
            const value = listMember.slice(i + 1, part.length);
            if ((0, tracestate_validators_1.validateKey)(key) && (0, tracestate_validators_1.validateValue)(value)) {
              agg.set(key, value);
            } else {
            }
          }
          return agg;
        }, /* @__PURE__ */ new Map());
        if (this._internalState.size > MAX_TRACE_STATE_ITEMS2) {
          this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, MAX_TRACE_STATE_ITEMS2));
        }
      }
      _keys() {
        return Array.from(this._internalState.keys()).reverse();
      }
      _clone() {
        const traceState = new _TraceStateImpl();
        traceState._internalState = new Map(this._internalState);
        return traceState;
      }
    };
    exports.TraceStateImpl = TraceStateImpl;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/trace/internal/utils.js
var require_utils2 = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/trace/internal/utils.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createTraceState = void 0;
    var tracestate_impl_1 = require_tracestate_impl();
    function createTraceState(rawTraceState) {
      return new tracestate_impl_1.TraceStateImpl(rawTraceState);
    }
    __name(createTraceState, "createTraceState");
    exports.createTraceState = createTraceState;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/context-api.js
var require_context_api = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/context-api.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.context = void 0;
    var context_1 = require_context2();
    exports.context = context_1.ContextAPI.getInstance();
  }
});

// ../../node_modules/@opentelemetry/api/build/src/diag-api.js
var require_diag_api = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/diag-api.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.diag = void 0;
    var diag_1 = require_diag();
    exports.diag = diag_1.DiagAPI.instance();
  }
});

// ../../node_modules/@opentelemetry/api/build/src/metrics/NoopMeterProvider.js
var require_NoopMeterProvider = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/metrics/NoopMeterProvider.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NOOP_METER_PROVIDER = exports.NoopMeterProvider = void 0;
    var NoopMeter_1 = require_NoopMeter();
    var NoopMeterProvider = class {
      static {
        __name(this, "NoopMeterProvider");
      }
      getMeter(_name, _version, _options) {
        return NoopMeter_1.NOOP_METER;
      }
    };
    exports.NoopMeterProvider = NoopMeterProvider;
    exports.NOOP_METER_PROVIDER = new NoopMeterProvider();
  }
});

// ../../node_modules/@opentelemetry/api/build/src/api/metrics.js
var require_metrics = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/api/metrics.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MetricsAPI = void 0;
    var NoopMeterProvider_1 = require_NoopMeterProvider();
    var global_utils_1 = require_global_utils();
    var diag_1 = require_diag();
    var API_NAME = "metrics";
    var MetricsAPI = class _MetricsAPI {
      static {
        __name(this, "MetricsAPI");
      }
      /** Empty private constructor prevents end users from constructing a new instance of the API */
      constructor() {
      }
      /** Get the singleton instance of the Metrics API */
      static getInstance() {
        if (!this._instance) {
          this._instance = new _MetricsAPI();
        }
        return this._instance;
      }
      /**
       * Set the current global meter provider.
       * Returns true if the meter provider was successfully registered, else false.
       */
      setGlobalMeterProvider(provider) {
        return (0, global_utils_1.registerGlobal)(API_NAME, provider, diag_1.DiagAPI.instance());
      }
      /**
       * Returns the global meter provider.
       */
      getMeterProvider() {
        return (0, global_utils_1.getGlobal)(API_NAME) || NoopMeterProvider_1.NOOP_METER_PROVIDER;
      }
      /**
       * Returns a meter from the global meter provider.
       */
      getMeter(name, version2, options) {
        return this.getMeterProvider().getMeter(name, version2, options);
      }
      /** Remove the global meter provider */
      disable() {
        (0, global_utils_1.unregisterGlobal)(API_NAME, diag_1.DiagAPI.instance());
      }
    };
    exports.MetricsAPI = MetricsAPI;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/metrics-api.js
var require_metrics_api = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/metrics-api.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.metrics = void 0;
    var metrics_1 = require_metrics();
    exports.metrics = metrics_1.MetricsAPI.getInstance();
  }
});

// ../../node_modules/@opentelemetry/api/build/src/propagation/NoopTextMapPropagator.js
var require_NoopTextMapPropagator = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/propagation/NoopTextMapPropagator.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoopTextMapPropagator = void 0;
    var NoopTextMapPropagator = class {
      static {
        __name(this, "NoopTextMapPropagator");
      }
      /** Noop inject function does nothing */
      inject(_context, _carrier) {
      }
      /** Noop extract function does nothing and returns the input context */
      extract(context3, _carrier) {
        return context3;
      }
      fields() {
        return [];
      }
    };
    exports.NoopTextMapPropagator = NoopTextMapPropagator;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/baggage/context-helpers.js
var require_context_helpers = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/baggage/context-helpers.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deleteBaggage = exports.setBaggage = exports.getActiveBaggage = exports.getBaggage = void 0;
    var context_1 = require_context2();
    var context_2 = require_context();
    var BAGGAGE_KEY = (0, context_2.createContextKey)("OpenTelemetry Baggage Key");
    function getBaggage(context3) {
      return context3.getValue(BAGGAGE_KEY) || void 0;
    }
    __name(getBaggage, "getBaggage");
    exports.getBaggage = getBaggage;
    function getActiveBaggage() {
      return getBaggage(context_1.ContextAPI.getInstance().active());
    }
    __name(getActiveBaggage, "getActiveBaggage");
    exports.getActiveBaggage = getActiveBaggage;
    function setBaggage(context3, baggage) {
      return context3.setValue(BAGGAGE_KEY, baggage);
    }
    __name(setBaggage, "setBaggage");
    exports.setBaggage = setBaggage;
    function deleteBaggage(context3) {
      return context3.deleteValue(BAGGAGE_KEY);
    }
    __name(deleteBaggage, "deleteBaggage");
    exports.deleteBaggage = deleteBaggage;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/api/propagation.js
var require_propagation = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/api/propagation.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PropagationAPI = void 0;
    var global_utils_1 = require_global_utils();
    var NoopTextMapPropagator_1 = require_NoopTextMapPropagator();
    var TextMapPropagator_1 = require_TextMapPropagator();
    var context_helpers_1 = require_context_helpers();
    var utils_1 = require_utils();
    var diag_1 = require_diag();
    var API_NAME = "propagation";
    var NOOP_TEXT_MAP_PROPAGATOR = new NoopTextMapPropagator_1.NoopTextMapPropagator();
    var PropagationAPI = class _PropagationAPI {
      static {
        __name(this, "PropagationAPI");
      }
      /** Empty private constructor prevents end users from constructing a new instance of the API */
      constructor() {
        this.createBaggage = utils_1.createBaggage;
        this.getBaggage = context_helpers_1.getBaggage;
        this.getActiveBaggage = context_helpers_1.getActiveBaggage;
        this.setBaggage = context_helpers_1.setBaggage;
        this.deleteBaggage = context_helpers_1.deleteBaggage;
      }
      /** Get the singleton instance of the Propagator API */
      static getInstance() {
        if (!this._instance) {
          this._instance = new _PropagationAPI();
        }
        return this._instance;
      }
      /**
       * Set the current propagator.
       *
       * @returns true if the propagator was successfully registered, else false
       */
      setGlobalPropagator(propagator) {
        return (0, global_utils_1.registerGlobal)(API_NAME, propagator, diag_1.DiagAPI.instance());
      }
      /**
       * Inject context into a carrier to be propagated inter-process
       *
       * @param context Context carrying tracing data to inject
       * @param carrier carrier to inject context into
       * @param setter Function used to set values on the carrier
       */
      inject(context3, carrier, setter = TextMapPropagator_1.defaultTextMapSetter) {
        return this._getGlobalPropagator().inject(context3, carrier, setter);
      }
      /**
       * Extract context from a carrier
       *
       * @param context Context which the newly created context will inherit from
       * @param carrier Carrier to extract context from
       * @param getter Function used to extract keys from a carrier
       */
      extract(context3, carrier, getter = TextMapPropagator_1.defaultTextMapGetter) {
        return this._getGlobalPropagator().extract(context3, carrier, getter);
      }
      /**
       * Return a list of all fields which may be used by the propagator.
       */
      fields() {
        return this._getGlobalPropagator().fields();
      }
      /** Remove the global propagator */
      disable() {
        (0, global_utils_1.unregisterGlobal)(API_NAME, diag_1.DiagAPI.instance());
      }
      _getGlobalPropagator() {
        return (0, global_utils_1.getGlobal)(API_NAME) || NOOP_TEXT_MAP_PROPAGATOR;
      }
    };
    exports.PropagationAPI = PropagationAPI;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/propagation-api.js
var require_propagation_api = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/propagation-api.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.propagation = void 0;
    var propagation_1 = require_propagation();
    exports.propagation = propagation_1.PropagationAPI.getInstance();
  }
});

// ../../node_modules/@opentelemetry/api/build/src/api/trace.js
var require_trace = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/api/trace.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TraceAPI = void 0;
    var global_utils_1 = require_global_utils();
    var ProxyTracerProvider_1 = require_ProxyTracerProvider();
    var spancontext_utils_1 = require_spancontext_utils();
    var context_utils_1 = require_context_utils();
    var diag_1 = require_diag();
    var API_NAME = "trace";
    var TraceAPI = class _TraceAPI {
      static {
        __name(this, "TraceAPI");
      }
      /** Empty private constructor prevents end users from constructing a new instance of the API */
      constructor() {
        this._proxyTracerProvider = new ProxyTracerProvider_1.ProxyTracerProvider();
        this.wrapSpanContext = spancontext_utils_1.wrapSpanContext;
        this.isSpanContextValid = spancontext_utils_1.isSpanContextValid;
        this.deleteSpan = context_utils_1.deleteSpan;
        this.getSpan = context_utils_1.getSpan;
        this.getActiveSpan = context_utils_1.getActiveSpan;
        this.getSpanContext = context_utils_1.getSpanContext;
        this.setSpan = context_utils_1.setSpan;
        this.setSpanContext = context_utils_1.setSpanContext;
      }
      /** Get the singleton instance of the Trace API */
      static getInstance() {
        if (!this._instance) {
          this._instance = new _TraceAPI();
        }
        return this._instance;
      }
      /**
       * Set the current global tracer.
       *
       * @returns true if the tracer provider was successfully registered, else false
       */
      setGlobalTracerProvider(provider) {
        const success = (0, global_utils_1.registerGlobal)(API_NAME, this._proxyTracerProvider, diag_1.DiagAPI.instance());
        if (success) {
          this._proxyTracerProvider.setDelegate(provider);
        }
        return success;
      }
      /**
       * Returns the global tracer provider.
       */
      getTracerProvider() {
        return (0, global_utils_1.getGlobal)(API_NAME) || this._proxyTracerProvider;
      }
      /**
       * Returns a tracer from the global tracer provider.
       */
      getTracer(name, version2) {
        return this.getTracerProvider().getTracer(name, version2);
      }
      /** Remove the global tracer provider */
      disable() {
        (0, global_utils_1.unregisterGlobal)(API_NAME, diag_1.DiagAPI.instance());
        this._proxyTracerProvider = new ProxyTracerProvider_1.ProxyTracerProvider();
      }
    };
    exports.TraceAPI = TraceAPI;
  }
});

// ../../node_modules/@opentelemetry/api/build/src/trace-api.js
var require_trace_api = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/trace-api.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.trace = void 0;
    var trace_1 = require_trace();
    exports.trace = trace_1.TraceAPI.getInstance();
  }
});

// ../../node_modules/@opentelemetry/api/build/src/index.js
var require_src = __commonJS({
  "../../node_modules/@opentelemetry/api/build/src/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.trace = exports.propagation = exports.metrics = exports.diag = exports.context = exports.INVALID_SPAN_CONTEXT = exports.INVALID_TRACEID = exports.INVALID_SPANID = exports.isValidSpanId = exports.isValidTraceId = exports.isSpanContextValid = exports.createTraceState = exports.TraceFlags = exports.SpanStatusCode = exports.SpanKind = exports.SamplingDecision = exports.ProxyTracerProvider = exports.ProxyTracer = exports.defaultTextMapSetter = exports.defaultTextMapGetter = exports.ValueType = exports.createNoopMeter = exports.DiagLogLevel = exports.DiagConsoleLogger = exports.ROOT_CONTEXT = exports.createContextKey = exports.baggageEntryMetadataFromString = void 0;
    var utils_1 = require_utils();
    Object.defineProperty(exports, "baggageEntryMetadataFromString", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return utils_1.baggageEntryMetadataFromString;
    }, "get") });
    var context_1 = require_context();
    Object.defineProperty(exports, "createContextKey", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return context_1.createContextKey;
    }, "get") });
    Object.defineProperty(exports, "ROOT_CONTEXT", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return context_1.ROOT_CONTEXT;
    }, "get") });
    var consoleLogger_1 = require_consoleLogger();
    Object.defineProperty(exports, "DiagConsoleLogger", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return consoleLogger_1.DiagConsoleLogger;
    }, "get") });
    var types_1 = require_types();
    Object.defineProperty(exports, "DiagLogLevel", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return types_1.DiagLogLevel;
    }, "get") });
    var NoopMeter_1 = require_NoopMeter();
    Object.defineProperty(exports, "createNoopMeter", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return NoopMeter_1.createNoopMeter;
    }, "get") });
    var Metric_1 = require_Metric();
    Object.defineProperty(exports, "ValueType", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return Metric_1.ValueType;
    }, "get") });
    var TextMapPropagator_1 = require_TextMapPropagator();
    Object.defineProperty(exports, "defaultTextMapGetter", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return TextMapPropagator_1.defaultTextMapGetter;
    }, "get") });
    Object.defineProperty(exports, "defaultTextMapSetter", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return TextMapPropagator_1.defaultTextMapSetter;
    }, "get") });
    var ProxyTracer_1 = require_ProxyTracer();
    Object.defineProperty(exports, "ProxyTracer", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return ProxyTracer_1.ProxyTracer;
    }, "get") });
    var ProxyTracerProvider_1 = require_ProxyTracerProvider();
    Object.defineProperty(exports, "ProxyTracerProvider", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return ProxyTracerProvider_1.ProxyTracerProvider;
    }, "get") });
    var SamplingResult_1 = require_SamplingResult();
    Object.defineProperty(exports, "SamplingDecision", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return SamplingResult_1.SamplingDecision;
    }, "get") });
    var span_kind_1 = require_span_kind();
    Object.defineProperty(exports, "SpanKind", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return span_kind_1.SpanKind;
    }, "get") });
    var status_1 = require_status();
    Object.defineProperty(exports, "SpanStatusCode", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return status_1.SpanStatusCode;
    }, "get") });
    var trace_flags_1 = require_trace_flags();
    Object.defineProperty(exports, "TraceFlags", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return trace_flags_1.TraceFlags;
    }, "get") });
    var utils_2 = require_utils2();
    Object.defineProperty(exports, "createTraceState", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return utils_2.createTraceState;
    }, "get") });
    var spancontext_utils_1 = require_spancontext_utils();
    Object.defineProperty(exports, "isSpanContextValid", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return spancontext_utils_1.isSpanContextValid;
    }, "get") });
    Object.defineProperty(exports, "isValidTraceId", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return spancontext_utils_1.isValidTraceId;
    }, "get") });
    Object.defineProperty(exports, "isValidSpanId", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return spancontext_utils_1.isValidSpanId;
    }, "get") });
    var invalid_span_constants_1 = require_invalid_span_constants();
    Object.defineProperty(exports, "INVALID_SPANID", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return invalid_span_constants_1.INVALID_SPANID;
    }, "get") });
    Object.defineProperty(exports, "INVALID_TRACEID", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return invalid_span_constants_1.INVALID_TRACEID;
    }, "get") });
    Object.defineProperty(exports, "INVALID_SPAN_CONTEXT", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return invalid_span_constants_1.INVALID_SPAN_CONTEXT;
    }, "get") });
    var context_api_1 = require_context_api();
    Object.defineProperty(exports, "context", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return context_api_1.context;
    }, "get") });
    var diag_api_1 = require_diag_api();
    Object.defineProperty(exports, "diag", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return diag_api_1.diag;
    }, "get") });
    var metrics_api_1 = require_metrics_api();
    Object.defineProperty(exports, "metrics", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return metrics_api_1.metrics;
    }, "get") });
    var propagation_api_1 = require_propagation_api();
    Object.defineProperty(exports, "propagation", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return propagation_api_1.propagation;
    }, "get") });
    var trace_api_1 = require_trace_api();
    Object.defineProperty(exports, "trace", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return trace_api_1.trace;
    }, "get") });
    exports.default = {
      context: context_api_1.context,
      diag: diag_api_1.diag,
      metrics: metrics_api_1.metrics,
      propagation: propagation_api_1.propagation,
      trace: trace_api_1.trace
    };
  }
});

// ../../node_modules/@opentelemetry/semantic-conventions/build/src/internal/utils.js
var require_utils3 = __commonJS({
  "../../node_modules/@opentelemetry/semantic-conventions/build/src/internal/utils.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createConstMap = void 0;
    // @__NO_SIDE_EFFECTS__
    function createConstMap(values) {
      let res = {};
      const len = values.length;
      for (let lp = 0; lp < len; lp++) {
        const val = values[lp];
        if (val) {
          res[String(val).toUpperCase().replace(/[-.]/g, "_")] = val;
        }
      }
      return res;
    }
    __name(createConstMap, "createConstMap");
    exports.createConstMap = createConstMap;
  }
});

// ../../node_modules/@opentelemetry/semantic-conventions/build/src/trace/SemanticAttributes.js
var require_SemanticAttributes = __commonJS({
  "../../node_modules/@opentelemetry/semantic-conventions/build/src/trace/SemanticAttributes.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SEMATTRS_NET_HOST_CARRIER_ICC = exports.SEMATTRS_NET_HOST_CARRIER_MNC = exports.SEMATTRS_NET_HOST_CARRIER_MCC = exports.SEMATTRS_NET_HOST_CARRIER_NAME = exports.SEMATTRS_NET_HOST_CONNECTION_SUBTYPE = exports.SEMATTRS_NET_HOST_CONNECTION_TYPE = exports.SEMATTRS_NET_HOST_NAME = exports.SEMATTRS_NET_HOST_PORT = exports.SEMATTRS_NET_HOST_IP = exports.SEMATTRS_NET_PEER_NAME = exports.SEMATTRS_NET_PEER_PORT = exports.SEMATTRS_NET_PEER_IP = exports.SEMATTRS_NET_TRANSPORT = exports.SEMATTRS_FAAS_INVOKED_REGION = exports.SEMATTRS_FAAS_INVOKED_PROVIDER = exports.SEMATTRS_FAAS_INVOKED_NAME = exports.SEMATTRS_FAAS_COLDSTART = exports.SEMATTRS_FAAS_CRON = exports.SEMATTRS_FAAS_TIME = exports.SEMATTRS_FAAS_DOCUMENT_NAME = exports.SEMATTRS_FAAS_DOCUMENT_TIME = exports.SEMATTRS_FAAS_DOCUMENT_OPERATION = exports.SEMATTRS_FAAS_DOCUMENT_COLLECTION = exports.SEMATTRS_FAAS_EXECUTION = exports.SEMATTRS_FAAS_TRIGGER = exports.SEMATTRS_EXCEPTION_ESCAPED = exports.SEMATTRS_EXCEPTION_STACKTRACE = exports.SEMATTRS_EXCEPTION_MESSAGE = exports.SEMATTRS_EXCEPTION_TYPE = exports.SEMATTRS_DB_SQL_TABLE = exports.SEMATTRS_DB_MONGODB_COLLECTION = exports.SEMATTRS_DB_REDIS_DATABASE_INDEX = exports.SEMATTRS_DB_HBASE_NAMESPACE = exports.SEMATTRS_DB_CASSANDRA_COORDINATOR_DC = exports.SEMATTRS_DB_CASSANDRA_COORDINATOR_ID = exports.SEMATTRS_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT = exports.SEMATTRS_DB_CASSANDRA_IDEMPOTENCE = exports.SEMATTRS_DB_CASSANDRA_TABLE = exports.SEMATTRS_DB_CASSANDRA_CONSISTENCY_LEVEL = exports.SEMATTRS_DB_CASSANDRA_PAGE_SIZE = exports.SEMATTRS_DB_CASSANDRA_KEYSPACE = exports.SEMATTRS_DB_MSSQL_INSTANCE_NAME = exports.SEMATTRS_DB_OPERATION = exports.SEMATTRS_DB_STATEMENT = exports.SEMATTRS_DB_NAME = exports.SEMATTRS_DB_JDBC_DRIVER_CLASSNAME = exports.SEMATTRS_DB_USER = exports.SEMATTRS_DB_CONNECTION_STRING = exports.SEMATTRS_DB_SYSTEM = exports.SEMATTRS_AWS_LAMBDA_INVOKED_ARN = void 0;
    exports.SEMATTRS_MESSAGING_DESTINATION_KIND = exports.SEMATTRS_MESSAGING_DESTINATION = exports.SEMATTRS_MESSAGING_SYSTEM = exports.SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES = exports.SEMATTRS_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS = exports.SEMATTRS_AWS_DYNAMODB_SCANNED_COUNT = exports.SEMATTRS_AWS_DYNAMODB_COUNT = exports.SEMATTRS_AWS_DYNAMODB_TOTAL_SEGMENTS = exports.SEMATTRS_AWS_DYNAMODB_SEGMENT = exports.SEMATTRS_AWS_DYNAMODB_SCAN_FORWARD = exports.SEMATTRS_AWS_DYNAMODB_TABLE_COUNT = exports.SEMATTRS_AWS_DYNAMODB_EXCLUSIVE_START_TABLE = exports.SEMATTRS_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES = exports.SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES = exports.SEMATTRS_AWS_DYNAMODB_SELECT = exports.SEMATTRS_AWS_DYNAMODB_INDEX_NAME = exports.SEMATTRS_AWS_DYNAMODB_ATTRIBUTES_TO_GET = exports.SEMATTRS_AWS_DYNAMODB_LIMIT = exports.SEMATTRS_AWS_DYNAMODB_PROJECTION = exports.SEMATTRS_AWS_DYNAMODB_CONSISTENT_READ = exports.SEMATTRS_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY = exports.SEMATTRS_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY = exports.SEMATTRS_AWS_DYNAMODB_ITEM_COLLECTION_METRICS = exports.SEMATTRS_AWS_DYNAMODB_CONSUMED_CAPACITY = exports.SEMATTRS_AWS_DYNAMODB_TABLE_NAMES = exports.SEMATTRS_HTTP_CLIENT_IP = exports.SEMATTRS_HTTP_ROUTE = exports.SEMATTRS_HTTP_SERVER_NAME = exports.SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED = exports.SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH = exports.SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED = exports.SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH = exports.SEMATTRS_HTTP_USER_AGENT = exports.SEMATTRS_HTTP_FLAVOR = exports.SEMATTRS_HTTP_STATUS_CODE = exports.SEMATTRS_HTTP_SCHEME = exports.SEMATTRS_HTTP_HOST = exports.SEMATTRS_HTTP_TARGET = exports.SEMATTRS_HTTP_URL = exports.SEMATTRS_HTTP_METHOD = exports.SEMATTRS_CODE_LINENO = exports.SEMATTRS_CODE_FILEPATH = exports.SEMATTRS_CODE_NAMESPACE = exports.SEMATTRS_CODE_FUNCTION = exports.SEMATTRS_THREAD_NAME = exports.SEMATTRS_THREAD_ID = exports.SEMATTRS_ENDUSER_SCOPE = exports.SEMATTRS_ENDUSER_ROLE = exports.SEMATTRS_ENDUSER_ID = exports.SEMATTRS_PEER_SERVICE = void 0;
    exports.DBSYSTEMVALUES_FILEMAKER = exports.DBSYSTEMVALUES_DERBY = exports.DBSYSTEMVALUES_FIREBIRD = exports.DBSYSTEMVALUES_ADABAS = exports.DBSYSTEMVALUES_CACHE = exports.DBSYSTEMVALUES_EDB = exports.DBSYSTEMVALUES_FIRSTSQL = exports.DBSYSTEMVALUES_INGRES = exports.DBSYSTEMVALUES_HANADB = exports.DBSYSTEMVALUES_MAXDB = exports.DBSYSTEMVALUES_PROGRESS = exports.DBSYSTEMVALUES_HSQLDB = exports.DBSYSTEMVALUES_CLOUDSCAPE = exports.DBSYSTEMVALUES_HIVE = exports.DBSYSTEMVALUES_REDSHIFT = exports.DBSYSTEMVALUES_POSTGRESQL = exports.DBSYSTEMVALUES_DB2 = exports.DBSYSTEMVALUES_ORACLE = exports.DBSYSTEMVALUES_MYSQL = exports.DBSYSTEMVALUES_MSSQL = exports.DBSYSTEMVALUES_OTHER_SQL = exports.SemanticAttributes = exports.SEMATTRS_MESSAGE_UNCOMPRESSED_SIZE = exports.SEMATTRS_MESSAGE_COMPRESSED_SIZE = exports.SEMATTRS_MESSAGE_ID = exports.SEMATTRS_MESSAGE_TYPE = exports.SEMATTRS_RPC_JSONRPC_ERROR_MESSAGE = exports.SEMATTRS_RPC_JSONRPC_ERROR_CODE = exports.SEMATTRS_RPC_JSONRPC_REQUEST_ID = exports.SEMATTRS_RPC_JSONRPC_VERSION = exports.SEMATTRS_RPC_GRPC_STATUS_CODE = exports.SEMATTRS_RPC_METHOD = exports.SEMATTRS_RPC_SERVICE = exports.SEMATTRS_RPC_SYSTEM = exports.SEMATTRS_MESSAGING_KAFKA_TOMBSTONE = exports.SEMATTRS_MESSAGING_KAFKA_PARTITION = exports.SEMATTRS_MESSAGING_KAFKA_CLIENT_ID = exports.SEMATTRS_MESSAGING_KAFKA_CONSUMER_GROUP = exports.SEMATTRS_MESSAGING_KAFKA_MESSAGE_KEY = exports.SEMATTRS_MESSAGING_RABBITMQ_ROUTING_KEY = exports.SEMATTRS_MESSAGING_CONSUMER_ID = exports.SEMATTRS_MESSAGING_OPERATION = exports.SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES = exports.SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES = exports.SEMATTRS_MESSAGING_CONVERSATION_ID = exports.SEMATTRS_MESSAGING_MESSAGE_ID = exports.SEMATTRS_MESSAGING_URL = exports.SEMATTRS_MESSAGING_PROTOCOL_VERSION = exports.SEMATTRS_MESSAGING_PROTOCOL = exports.SEMATTRS_MESSAGING_TEMP_DESTINATION = void 0;
    exports.FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD = exports.FaasDocumentOperationValues = exports.FAASDOCUMENTOPERATIONVALUES_DELETE = exports.FAASDOCUMENTOPERATIONVALUES_EDIT = exports.FAASDOCUMENTOPERATIONVALUES_INSERT = exports.FaasTriggerValues = exports.FAASTRIGGERVALUES_OTHER = exports.FAASTRIGGERVALUES_TIMER = exports.FAASTRIGGERVALUES_PUBSUB = exports.FAASTRIGGERVALUES_HTTP = exports.FAASTRIGGERVALUES_DATASOURCE = exports.DbCassandraConsistencyLevelValues = exports.DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL = exports.DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL = exports.DBCASSANDRACONSISTENCYLEVELVALUES_ANY = exports.DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE = exports.DBCASSANDRACONSISTENCYLEVELVALUES_THREE = exports.DBCASSANDRACONSISTENCYLEVELVALUES_TWO = exports.DBCASSANDRACONSISTENCYLEVELVALUES_ONE = exports.DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM = exports.DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM = exports.DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM = exports.DBCASSANDRACONSISTENCYLEVELVALUES_ALL = exports.DbSystemValues = exports.DBSYSTEMVALUES_COCKROACHDB = exports.DBSYSTEMVALUES_MEMCACHED = exports.DBSYSTEMVALUES_ELASTICSEARCH = exports.DBSYSTEMVALUES_GEODE = exports.DBSYSTEMVALUES_NEO4J = exports.DBSYSTEMVALUES_DYNAMODB = exports.DBSYSTEMVALUES_COSMOSDB = exports.DBSYSTEMVALUES_COUCHDB = exports.DBSYSTEMVALUES_COUCHBASE = exports.DBSYSTEMVALUES_REDIS = exports.DBSYSTEMVALUES_MONGODB = exports.DBSYSTEMVALUES_HBASE = exports.DBSYSTEMVALUES_CASSANDRA = exports.DBSYSTEMVALUES_COLDFUSION = exports.DBSYSTEMVALUES_H2 = exports.DBSYSTEMVALUES_VERTICA = exports.DBSYSTEMVALUES_TERADATA = exports.DBSYSTEMVALUES_SYBASE = exports.DBSYSTEMVALUES_SQLITE = exports.DBSYSTEMVALUES_POINTBASE = exports.DBSYSTEMVALUES_PERVASIVE = exports.DBSYSTEMVALUES_NETEZZA = exports.DBSYSTEMVALUES_MARIADB = exports.DBSYSTEMVALUES_INTERBASE = exports.DBSYSTEMVALUES_INSTANTDB = exports.DBSYSTEMVALUES_INFORMIX = void 0;
    exports.MESSAGINGOPERATIONVALUES_RECEIVE = exports.MessagingDestinationKindValues = exports.MESSAGINGDESTINATIONKINDVALUES_TOPIC = exports.MESSAGINGDESTINATIONKINDVALUES_QUEUE = exports.HttpFlavorValues = exports.HTTPFLAVORVALUES_QUIC = exports.HTTPFLAVORVALUES_SPDY = exports.HTTPFLAVORVALUES_HTTP_2_0 = exports.HTTPFLAVORVALUES_HTTP_1_1 = exports.HTTPFLAVORVALUES_HTTP_1_0 = exports.NetHostConnectionSubtypeValues = exports.NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA = exports.NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA = exports.NETHOSTCONNECTIONSUBTYPEVALUES_NR = exports.NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN = exports.NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA = exports.NETHOSTCONNECTIONSUBTYPEVALUES_GSM = exports.NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP = exports.NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD = exports.NETHOSTCONNECTIONSUBTYPEVALUES_LTE = exports.NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B = exports.NETHOSTCONNECTIONSUBTYPEVALUES_IDEN = exports.NETHOSTCONNECTIONSUBTYPEVALUES_HSPA = exports.NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA = exports.NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA = exports.NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT = exports.NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A = exports.NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0 = exports.NETHOSTCONNECTIONSUBTYPEVALUES_CDMA = exports.NETHOSTCONNECTIONSUBTYPEVALUES_UMTS = exports.NETHOSTCONNECTIONSUBTYPEVALUES_EDGE = exports.NETHOSTCONNECTIONSUBTYPEVALUES_GPRS = exports.NetHostConnectionTypeValues = exports.NETHOSTCONNECTIONTYPEVALUES_UNKNOWN = exports.NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE = exports.NETHOSTCONNECTIONTYPEVALUES_CELL = exports.NETHOSTCONNECTIONTYPEVALUES_WIRED = exports.NETHOSTCONNECTIONTYPEVALUES_WIFI = exports.NetTransportValues = exports.NETTRANSPORTVALUES_OTHER = exports.NETTRANSPORTVALUES_INPROC = exports.NETTRANSPORTVALUES_PIPE = exports.NETTRANSPORTVALUES_UNIX = exports.NETTRANSPORTVALUES_IP = exports.NETTRANSPORTVALUES_IP_UDP = exports.NETTRANSPORTVALUES_IP_TCP = exports.FaasInvokedProviderValues = exports.FAASINVOKEDPROVIDERVALUES_GCP = exports.FAASINVOKEDPROVIDERVALUES_AZURE = exports.FAASINVOKEDPROVIDERVALUES_AWS = void 0;
    exports.MessageTypeValues = exports.MESSAGETYPEVALUES_RECEIVED = exports.MESSAGETYPEVALUES_SENT = exports.RpcGrpcStatusCodeValues = exports.RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED = exports.RPCGRPCSTATUSCODEVALUES_DATA_LOSS = exports.RPCGRPCSTATUSCODEVALUES_UNAVAILABLE = exports.RPCGRPCSTATUSCODEVALUES_INTERNAL = exports.RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED = exports.RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE = exports.RPCGRPCSTATUSCODEVALUES_ABORTED = exports.RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION = exports.RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED = exports.RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED = exports.RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS = exports.RPCGRPCSTATUSCODEVALUES_NOT_FOUND = exports.RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED = exports.RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT = exports.RPCGRPCSTATUSCODEVALUES_UNKNOWN = exports.RPCGRPCSTATUSCODEVALUES_CANCELLED = exports.RPCGRPCSTATUSCODEVALUES_OK = exports.MessagingOperationValues = exports.MESSAGINGOPERATIONVALUES_PROCESS = void 0;
    var utils_1 = require_utils3();
    var TMP_AWS_LAMBDA_INVOKED_ARN = "aws.lambda.invoked_arn";
    var TMP_DB_SYSTEM = "db.system";
    var TMP_DB_CONNECTION_STRING = "db.connection_string";
    var TMP_DB_USER = "db.user";
    var TMP_DB_JDBC_DRIVER_CLASSNAME = "db.jdbc.driver_classname";
    var TMP_DB_NAME = "db.name";
    var TMP_DB_STATEMENT = "db.statement";
    var TMP_DB_OPERATION = "db.operation";
    var TMP_DB_MSSQL_INSTANCE_NAME = "db.mssql.instance_name";
    var TMP_DB_CASSANDRA_KEYSPACE = "db.cassandra.keyspace";
    var TMP_DB_CASSANDRA_PAGE_SIZE = "db.cassandra.page_size";
    var TMP_DB_CASSANDRA_CONSISTENCY_LEVEL = "db.cassandra.consistency_level";
    var TMP_DB_CASSANDRA_TABLE = "db.cassandra.table";
    var TMP_DB_CASSANDRA_IDEMPOTENCE = "db.cassandra.idempotence";
    var TMP_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT = "db.cassandra.speculative_execution_count";
    var TMP_DB_CASSANDRA_COORDINATOR_ID = "db.cassandra.coordinator.id";
    var TMP_DB_CASSANDRA_COORDINATOR_DC = "db.cassandra.coordinator.dc";
    var TMP_DB_HBASE_NAMESPACE = "db.hbase.namespace";
    var TMP_DB_REDIS_DATABASE_INDEX = "db.redis.database_index";
    var TMP_DB_MONGODB_COLLECTION = "db.mongodb.collection";
    var TMP_DB_SQL_TABLE = "db.sql.table";
    var TMP_EXCEPTION_TYPE = "exception.type";
    var TMP_EXCEPTION_MESSAGE = "exception.message";
    var TMP_EXCEPTION_STACKTRACE = "exception.stacktrace";
    var TMP_EXCEPTION_ESCAPED = "exception.escaped";
    var TMP_FAAS_TRIGGER = "faas.trigger";
    var TMP_FAAS_EXECUTION = "faas.execution";
    var TMP_FAAS_DOCUMENT_COLLECTION = "faas.document.collection";
    var TMP_FAAS_DOCUMENT_OPERATION = "faas.document.operation";
    var TMP_FAAS_DOCUMENT_TIME = "faas.document.time";
    var TMP_FAAS_DOCUMENT_NAME = "faas.document.name";
    var TMP_FAAS_TIME = "faas.time";
    var TMP_FAAS_CRON = "faas.cron";
    var TMP_FAAS_COLDSTART = "faas.coldstart";
    var TMP_FAAS_INVOKED_NAME = "faas.invoked_name";
    var TMP_FAAS_INVOKED_PROVIDER = "faas.invoked_provider";
    var TMP_FAAS_INVOKED_REGION = "faas.invoked_region";
    var TMP_NET_TRANSPORT = "net.transport";
    var TMP_NET_PEER_IP = "net.peer.ip";
    var TMP_NET_PEER_PORT = "net.peer.port";
    var TMP_NET_PEER_NAME = "net.peer.name";
    var TMP_NET_HOST_IP = "net.host.ip";
    var TMP_NET_HOST_PORT = "net.host.port";
    var TMP_NET_HOST_NAME = "net.host.name";
    var TMP_NET_HOST_CONNECTION_TYPE = "net.host.connection.type";
    var TMP_NET_HOST_CONNECTION_SUBTYPE = "net.host.connection.subtype";
    var TMP_NET_HOST_CARRIER_NAME = "net.host.carrier.name";
    var TMP_NET_HOST_CARRIER_MCC = "net.host.carrier.mcc";
    var TMP_NET_HOST_CARRIER_MNC = "net.host.carrier.mnc";
    var TMP_NET_HOST_CARRIER_ICC = "net.host.carrier.icc";
    var TMP_PEER_SERVICE = "peer.service";
    var TMP_ENDUSER_ID = "enduser.id";
    var TMP_ENDUSER_ROLE = "enduser.role";
    var TMP_ENDUSER_SCOPE = "enduser.scope";
    var TMP_THREAD_ID = "thread.id";
    var TMP_THREAD_NAME = "thread.name";
    var TMP_CODE_FUNCTION = "code.function";
    var TMP_CODE_NAMESPACE = "code.namespace";
    var TMP_CODE_FILEPATH = "code.filepath";
    var TMP_CODE_LINENO = "code.lineno";
    var TMP_HTTP_METHOD = "http.method";
    var TMP_HTTP_URL = "http.url";
    var TMP_HTTP_TARGET = "http.target";
    var TMP_HTTP_HOST = "http.host";
    var TMP_HTTP_SCHEME = "http.scheme";
    var TMP_HTTP_STATUS_CODE = "http.status_code";
    var TMP_HTTP_FLAVOR = "http.flavor";
    var TMP_HTTP_USER_AGENT = "http.user_agent";
    var TMP_HTTP_REQUEST_CONTENT_LENGTH = "http.request_content_length";
    var TMP_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED = "http.request_content_length_uncompressed";
    var TMP_HTTP_RESPONSE_CONTENT_LENGTH = "http.response_content_length";
    var TMP_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED = "http.response_content_length_uncompressed";
    var TMP_HTTP_SERVER_NAME = "http.server_name";
    var TMP_HTTP_ROUTE = "http.route";
    var TMP_HTTP_CLIENT_IP = "http.client_ip";
    var TMP_AWS_DYNAMODB_TABLE_NAMES = "aws.dynamodb.table_names";
    var TMP_AWS_DYNAMODB_CONSUMED_CAPACITY = "aws.dynamodb.consumed_capacity";
    var TMP_AWS_DYNAMODB_ITEM_COLLECTION_METRICS = "aws.dynamodb.item_collection_metrics";
    var TMP_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY = "aws.dynamodb.provisioned_read_capacity";
    var TMP_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY = "aws.dynamodb.provisioned_write_capacity";
    var TMP_AWS_DYNAMODB_CONSISTENT_READ = "aws.dynamodb.consistent_read";
    var TMP_AWS_DYNAMODB_PROJECTION = "aws.dynamodb.projection";
    var TMP_AWS_DYNAMODB_LIMIT = "aws.dynamodb.limit";
    var TMP_AWS_DYNAMODB_ATTRIBUTES_TO_GET = "aws.dynamodb.attributes_to_get";
    var TMP_AWS_DYNAMODB_INDEX_NAME = "aws.dynamodb.index_name";
    var TMP_AWS_DYNAMODB_SELECT = "aws.dynamodb.select";
    var TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES = "aws.dynamodb.global_secondary_indexes";
    var TMP_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES = "aws.dynamodb.local_secondary_indexes";
    var TMP_AWS_DYNAMODB_EXCLUSIVE_START_TABLE = "aws.dynamodb.exclusive_start_table";
    var TMP_AWS_DYNAMODB_TABLE_COUNT = "aws.dynamodb.table_count";
    var TMP_AWS_DYNAMODB_SCAN_FORWARD = "aws.dynamodb.scan_forward";
    var TMP_AWS_DYNAMODB_SEGMENT = "aws.dynamodb.segment";
    var TMP_AWS_DYNAMODB_TOTAL_SEGMENTS = "aws.dynamodb.total_segments";
    var TMP_AWS_DYNAMODB_COUNT = "aws.dynamodb.count";
    var TMP_AWS_DYNAMODB_SCANNED_COUNT = "aws.dynamodb.scanned_count";
    var TMP_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS = "aws.dynamodb.attribute_definitions";
    var TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES = "aws.dynamodb.global_secondary_index_updates";
    var TMP_MESSAGING_SYSTEM = "messaging.system";
    var TMP_MESSAGING_DESTINATION = "messaging.destination";
    var TMP_MESSAGING_DESTINATION_KIND = "messaging.destination_kind";
    var TMP_MESSAGING_TEMP_DESTINATION = "messaging.temp_destination";
    var TMP_MESSAGING_PROTOCOL = "messaging.protocol";
    var TMP_MESSAGING_PROTOCOL_VERSION = "messaging.protocol_version";
    var TMP_MESSAGING_URL = "messaging.url";
    var TMP_MESSAGING_MESSAGE_ID = "messaging.message_id";
    var TMP_MESSAGING_CONVERSATION_ID = "messaging.conversation_id";
    var TMP_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES = "messaging.message_payload_size_bytes";
    var TMP_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES = "messaging.message_payload_compressed_size_bytes";
    var TMP_MESSAGING_OPERATION = "messaging.operation";
    var TMP_MESSAGING_CONSUMER_ID = "messaging.consumer_id";
    var TMP_MESSAGING_RABBITMQ_ROUTING_KEY = "messaging.rabbitmq.routing_key";
    var TMP_MESSAGING_KAFKA_MESSAGE_KEY = "messaging.kafka.message_key";
    var TMP_MESSAGING_KAFKA_CONSUMER_GROUP = "messaging.kafka.consumer_group";
    var TMP_MESSAGING_KAFKA_CLIENT_ID = "messaging.kafka.client_id";
    var TMP_MESSAGING_KAFKA_PARTITION = "messaging.kafka.partition";
    var TMP_MESSAGING_KAFKA_TOMBSTONE = "messaging.kafka.tombstone";
    var TMP_RPC_SYSTEM = "rpc.system";
    var TMP_RPC_SERVICE = "rpc.service";
    var TMP_RPC_METHOD = "rpc.method";
    var TMP_RPC_GRPC_STATUS_CODE = "rpc.grpc.status_code";
    var TMP_RPC_JSONRPC_VERSION = "rpc.jsonrpc.version";
    var TMP_RPC_JSONRPC_REQUEST_ID = "rpc.jsonrpc.request_id";
    var TMP_RPC_JSONRPC_ERROR_CODE = "rpc.jsonrpc.error_code";
    var TMP_RPC_JSONRPC_ERROR_MESSAGE = "rpc.jsonrpc.error_message";
    var TMP_MESSAGE_TYPE = "message.type";
    var TMP_MESSAGE_ID = "message.id";
    var TMP_MESSAGE_COMPRESSED_SIZE = "message.compressed_size";
    var TMP_MESSAGE_UNCOMPRESSED_SIZE = "message.uncompressed_size";
    exports.SEMATTRS_AWS_LAMBDA_INVOKED_ARN = TMP_AWS_LAMBDA_INVOKED_ARN;
    exports.SEMATTRS_DB_SYSTEM = TMP_DB_SYSTEM;
    exports.SEMATTRS_DB_CONNECTION_STRING = TMP_DB_CONNECTION_STRING;
    exports.SEMATTRS_DB_USER = TMP_DB_USER;
    exports.SEMATTRS_DB_JDBC_DRIVER_CLASSNAME = TMP_DB_JDBC_DRIVER_CLASSNAME;
    exports.SEMATTRS_DB_NAME = TMP_DB_NAME;
    exports.SEMATTRS_DB_STATEMENT = TMP_DB_STATEMENT;
    exports.SEMATTRS_DB_OPERATION = TMP_DB_OPERATION;
    exports.SEMATTRS_DB_MSSQL_INSTANCE_NAME = TMP_DB_MSSQL_INSTANCE_NAME;
    exports.SEMATTRS_DB_CASSANDRA_KEYSPACE = TMP_DB_CASSANDRA_KEYSPACE;
    exports.SEMATTRS_DB_CASSANDRA_PAGE_SIZE = TMP_DB_CASSANDRA_PAGE_SIZE;
    exports.SEMATTRS_DB_CASSANDRA_CONSISTENCY_LEVEL = TMP_DB_CASSANDRA_CONSISTENCY_LEVEL;
    exports.SEMATTRS_DB_CASSANDRA_TABLE = TMP_DB_CASSANDRA_TABLE;
    exports.SEMATTRS_DB_CASSANDRA_IDEMPOTENCE = TMP_DB_CASSANDRA_IDEMPOTENCE;
    exports.SEMATTRS_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT = TMP_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT;
    exports.SEMATTRS_DB_CASSANDRA_COORDINATOR_ID = TMP_DB_CASSANDRA_COORDINATOR_ID;
    exports.SEMATTRS_DB_CASSANDRA_COORDINATOR_DC = TMP_DB_CASSANDRA_COORDINATOR_DC;
    exports.SEMATTRS_DB_HBASE_NAMESPACE = TMP_DB_HBASE_NAMESPACE;
    exports.SEMATTRS_DB_REDIS_DATABASE_INDEX = TMP_DB_REDIS_DATABASE_INDEX;
    exports.SEMATTRS_DB_MONGODB_COLLECTION = TMP_DB_MONGODB_COLLECTION;
    exports.SEMATTRS_DB_SQL_TABLE = TMP_DB_SQL_TABLE;
    exports.SEMATTRS_EXCEPTION_TYPE = TMP_EXCEPTION_TYPE;
    exports.SEMATTRS_EXCEPTION_MESSAGE = TMP_EXCEPTION_MESSAGE;
    exports.SEMATTRS_EXCEPTION_STACKTRACE = TMP_EXCEPTION_STACKTRACE;
    exports.SEMATTRS_EXCEPTION_ESCAPED = TMP_EXCEPTION_ESCAPED;
    exports.SEMATTRS_FAAS_TRIGGER = TMP_FAAS_TRIGGER;
    exports.SEMATTRS_FAAS_EXECUTION = TMP_FAAS_EXECUTION;
    exports.SEMATTRS_FAAS_DOCUMENT_COLLECTION = TMP_FAAS_DOCUMENT_COLLECTION;
    exports.SEMATTRS_FAAS_DOCUMENT_OPERATION = TMP_FAAS_DOCUMENT_OPERATION;
    exports.SEMATTRS_FAAS_DOCUMENT_TIME = TMP_FAAS_DOCUMENT_TIME;
    exports.SEMATTRS_FAAS_DOCUMENT_NAME = TMP_FAAS_DOCUMENT_NAME;
    exports.SEMATTRS_FAAS_TIME = TMP_FAAS_TIME;
    exports.SEMATTRS_FAAS_CRON = TMP_FAAS_CRON;
    exports.SEMATTRS_FAAS_COLDSTART = TMP_FAAS_COLDSTART;
    exports.SEMATTRS_FAAS_INVOKED_NAME = TMP_FAAS_INVOKED_NAME;
    exports.SEMATTRS_FAAS_INVOKED_PROVIDER = TMP_FAAS_INVOKED_PROVIDER;
    exports.SEMATTRS_FAAS_INVOKED_REGION = TMP_FAAS_INVOKED_REGION;
    exports.SEMATTRS_NET_TRANSPORT = TMP_NET_TRANSPORT;
    exports.SEMATTRS_NET_PEER_IP = TMP_NET_PEER_IP;
    exports.SEMATTRS_NET_PEER_PORT = TMP_NET_PEER_PORT;
    exports.SEMATTRS_NET_PEER_NAME = TMP_NET_PEER_NAME;
    exports.SEMATTRS_NET_HOST_IP = TMP_NET_HOST_IP;
    exports.SEMATTRS_NET_HOST_PORT = TMP_NET_HOST_PORT;
    exports.SEMATTRS_NET_HOST_NAME = TMP_NET_HOST_NAME;
    exports.SEMATTRS_NET_HOST_CONNECTION_TYPE = TMP_NET_HOST_CONNECTION_TYPE;
    exports.SEMATTRS_NET_HOST_CONNECTION_SUBTYPE = TMP_NET_HOST_CONNECTION_SUBTYPE;
    exports.SEMATTRS_NET_HOST_CARRIER_NAME = TMP_NET_HOST_CARRIER_NAME;
    exports.SEMATTRS_NET_HOST_CARRIER_MCC = TMP_NET_HOST_CARRIER_MCC;
    exports.SEMATTRS_NET_HOST_CARRIER_MNC = TMP_NET_HOST_CARRIER_MNC;
    exports.SEMATTRS_NET_HOST_CARRIER_ICC = TMP_NET_HOST_CARRIER_ICC;
    exports.SEMATTRS_PEER_SERVICE = TMP_PEER_SERVICE;
    exports.SEMATTRS_ENDUSER_ID = TMP_ENDUSER_ID;
    exports.SEMATTRS_ENDUSER_ROLE = TMP_ENDUSER_ROLE;
    exports.SEMATTRS_ENDUSER_SCOPE = TMP_ENDUSER_SCOPE;
    exports.SEMATTRS_THREAD_ID = TMP_THREAD_ID;
    exports.SEMATTRS_THREAD_NAME = TMP_THREAD_NAME;
    exports.SEMATTRS_CODE_FUNCTION = TMP_CODE_FUNCTION;
    exports.SEMATTRS_CODE_NAMESPACE = TMP_CODE_NAMESPACE;
    exports.SEMATTRS_CODE_FILEPATH = TMP_CODE_FILEPATH;
    exports.SEMATTRS_CODE_LINENO = TMP_CODE_LINENO;
    exports.SEMATTRS_HTTP_METHOD = TMP_HTTP_METHOD;
    exports.SEMATTRS_HTTP_URL = TMP_HTTP_URL;
    exports.SEMATTRS_HTTP_TARGET = TMP_HTTP_TARGET;
    exports.SEMATTRS_HTTP_HOST = TMP_HTTP_HOST;
    exports.SEMATTRS_HTTP_SCHEME = TMP_HTTP_SCHEME;
    exports.SEMATTRS_HTTP_STATUS_CODE = TMP_HTTP_STATUS_CODE;
    exports.SEMATTRS_HTTP_FLAVOR = TMP_HTTP_FLAVOR;
    exports.SEMATTRS_HTTP_USER_AGENT = TMP_HTTP_USER_AGENT;
    exports.SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH = TMP_HTTP_REQUEST_CONTENT_LENGTH;
    exports.SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED = TMP_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED;
    exports.SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH = TMP_HTTP_RESPONSE_CONTENT_LENGTH;
    exports.SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED = TMP_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED;
    exports.SEMATTRS_HTTP_SERVER_NAME = TMP_HTTP_SERVER_NAME;
    exports.SEMATTRS_HTTP_ROUTE = TMP_HTTP_ROUTE;
    exports.SEMATTRS_HTTP_CLIENT_IP = TMP_HTTP_CLIENT_IP;
    exports.SEMATTRS_AWS_DYNAMODB_TABLE_NAMES = TMP_AWS_DYNAMODB_TABLE_NAMES;
    exports.SEMATTRS_AWS_DYNAMODB_CONSUMED_CAPACITY = TMP_AWS_DYNAMODB_CONSUMED_CAPACITY;
    exports.SEMATTRS_AWS_DYNAMODB_ITEM_COLLECTION_METRICS = TMP_AWS_DYNAMODB_ITEM_COLLECTION_METRICS;
    exports.SEMATTRS_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY = TMP_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY;
    exports.SEMATTRS_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY = TMP_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY;
    exports.SEMATTRS_AWS_DYNAMODB_CONSISTENT_READ = TMP_AWS_DYNAMODB_CONSISTENT_READ;
    exports.SEMATTRS_AWS_DYNAMODB_PROJECTION = TMP_AWS_DYNAMODB_PROJECTION;
    exports.SEMATTRS_AWS_DYNAMODB_LIMIT = TMP_AWS_DYNAMODB_LIMIT;
    exports.SEMATTRS_AWS_DYNAMODB_ATTRIBUTES_TO_GET = TMP_AWS_DYNAMODB_ATTRIBUTES_TO_GET;
    exports.SEMATTRS_AWS_DYNAMODB_INDEX_NAME = TMP_AWS_DYNAMODB_INDEX_NAME;
    exports.SEMATTRS_AWS_DYNAMODB_SELECT = TMP_AWS_DYNAMODB_SELECT;
    exports.SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES = TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES;
    exports.SEMATTRS_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES = TMP_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES;
    exports.SEMATTRS_AWS_DYNAMODB_EXCLUSIVE_START_TABLE = TMP_AWS_DYNAMODB_EXCLUSIVE_START_TABLE;
    exports.SEMATTRS_AWS_DYNAMODB_TABLE_COUNT = TMP_AWS_DYNAMODB_TABLE_COUNT;
    exports.SEMATTRS_AWS_DYNAMODB_SCAN_FORWARD = TMP_AWS_DYNAMODB_SCAN_FORWARD;
    exports.SEMATTRS_AWS_DYNAMODB_SEGMENT = TMP_AWS_DYNAMODB_SEGMENT;
    exports.SEMATTRS_AWS_DYNAMODB_TOTAL_SEGMENTS = TMP_AWS_DYNAMODB_TOTAL_SEGMENTS;
    exports.SEMATTRS_AWS_DYNAMODB_COUNT = TMP_AWS_DYNAMODB_COUNT;
    exports.SEMATTRS_AWS_DYNAMODB_SCANNED_COUNT = TMP_AWS_DYNAMODB_SCANNED_COUNT;
    exports.SEMATTRS_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS = TMP_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS;
    exports.SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES = TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES;
    exports.SEMATTRS_MESSAGING_SYSTEM = TMP_MESSAGING_SYSTEM;
    exports.SEMATTRS_MESSAGING_DESTINATION = TMP_MESSAGING_DESTINATION;
    exports.SEMATTRS_MESSAGING_DESTINATION_KIND = TMP_MESSAGING_DESTINATION_KIND;
    exports.SEMATTRS_MESSAGING_TEMP_DESTINATION = TMP_MESSAGING_TEMP_DESTINATION;
    exports.SEMATTRS_MESSAGING_PROTOCOL = TMP_MESSAGING_PROTOCOL;
    exports.SEMATTRS_MESSAGING_PROTOCOL_VERSION = TMP_MESSAGING_PROTOCOL_VERSION;
    exports.SEMATTRS_MESSAGING_URL = TMP_MESSAGING_URL;
    exports.SEMATTRS_MESSAGING_MESSAGE_ID = TMP_MESSAGING_MESSAGE_ID;
    exports.SEMATTRS_MESSAGING_CONVERSATION_ID = TMP_MESSAGING_CONVERSATION_ID;
    exports.SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES = TMP_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES;
    exports.SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES = TMP_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES;
    exports.SEMATTRS_MESSAGING_OPERATION = TMP_MESSAGING_OPERATION;
    exports.SEMATTRS_MESSAGING_CONSUMER_ID = TMP_MESSAGING_CONSUMER_ID;
    exports.SEMATTRS_MESSAGING_RABBITMQ_ROUTING_KEY = TMP_MESSAGING_RABBITMQ_ROUTING_KEY;
    exports.SEMATTRS_MESSAGING_KAFKA_MESSAGE_KEY = TMP_MESSAGING_KAFKA_MESSAGE_KEY;
    exports.SEMATTRS_MESSAGING_KAFKA_CONSUMER_GROUP = TMP_MESSAGING_KAFKA_CONSUMER_GROUP;
    exports.SEMATTRS_MESSAGING_KAFKA_CLIENT_ID = TMP_MESSAGING_KAFKA_CLIENT_ID;
    exports.SEMATTRS_MESSAGING_KAFKA_PARTITION = TMP_MESSAGING_KAFKA_PARTITION;
    exports.SEMATTRS_MESSAGING_KAFKA_TOMBSTONE = TMP_MESSAGING_KAFKA_TOMBSTONE;
    exports.SEMATTRS_RPC_SYSTEM = TMP_RPC_SYSTEM;
    exports.SEMATTRS_RPC_SERVICE = TMP_RPC_SERVICE;
    exports.SEMATTRS_RPC_METHOD = TMP_RPC_METHOD;
    exports.SEMATTRS_RPC_GRPC_STATUS_CODE = TMP_RPC_GRPC_STATUS_CODE;
    exports.SEMATTRS_RPC_JSONRPC_VERSION = TMP_RPC_JSONRPC_VERSION;
    exports.SEMATTRS_RPC_JSONRPC_REQUEST_ID = TMP_RPC_JSONRPC_REQUEST_ID;
    exports.SEMATTRS_RPC_JSONRPC_ERROR_CODE = TMP_RPC_JSONRPC_ERROR_CODE;
    exports.SEMATTRS_RPC_JSONRPC_ERROR_MESSAGE = TMP_RPC_JSONRPC_ERROR_MESSAGE;
    exports.SEMATTRS_MESSAGE_TYPE = TMP_MESSAGE_TYPE;
    exports.SEMATTRS_MESSAGE_ID = TMP_MESSAGE_ID;
    exports.SEMATTRS_MESSAGE_COMPRESSED_SIZE = TMP_MESSAGE_COMPRESSED_SIZE;
    exports.SEMATTRS_MESSAGE_UNCOMPRESSED_SIZE = TMP_MESSAGE_UNCOMPRESSED_SIZE;
    exports.SemanticAttributes = /* @__PURE__ */ (0, utils_1.createConstMap)([
      TMP_AWS_LAMBDA_INVOKED_ARN,
      TMP_DB_SYSTEM,
      TMP_DB_CONNECTION_STRING,
      TMP_DB_USER,
      TMP_DB_JDBC_DRIVER_CLASSNAME,
      TMP_DB_NAME,
      TMP_DB_STATEMENT,
      TMP_DB_OPERATION,
      TMP_DB_MSSQL_INSTANCE_NAME,
      TMP_DB_CASSANDRA_KEYSPACE,
      TMP_DB_CASSANDRA_PAGE_SIZE,
      TMP_DB_CASSANDRA_CONSISTENCY_LEVEL,
      TMP_DB_CASSANDRA_TABLE,
      TMP_DB_CASSANDRA_IDEMPOTENCE,
      TMP_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT,
      TMP_DB_CASSANDRA_COORDINATOR_ID,
      TMP_DB_CASSANDRA_COORDINATOR_DC,
      TMP_DB_HBASE_NAMESPACE,
      TMP_DB_REDIS_DATABASE_INDEX,
      TMP_DB_MONGODB_COLLECTION,
      TMP_DB_SQL_TABLE,
      TMP_EXCEPTION_TYPE,
      TMP_EXCEPTION_MESSAGE,
      TMP_EXCEPTION_STACKTRACE,
      TMP_EXCEPTION_ESCAPED,
      TMP_FAAS_TRIGGER,
      TMP_FAAS_EXECUTION,
      TMP_FAAS_DOCUMENT_COLLECTION,
      TMP_FAAS_DOCUMENT_OPERATION,
      TMP_FAAS_DOCUMENT_TIME,
      TMP_FAAS_DOCUMENT_NAME,
      TMP_FAAS_TIME,
      TMP_FAAS_CRON,
      TMP_FAAS_COLDSTART,
      TMP_FAAS_INVOKED_NAME,
      TMP_FAAS_INVOKED_PROVIDER,
      TMP_FAAS_INVOKED_REGION,
      TMP_NET_TRANSPORT,
      TMP_NET_PEER_IP,
      TMP_NET_PEER_PORT,
      TMP_NET_PEER_NAME,
      TMP_NET_HOST_IP,
      TMP_NET_HOST_PORT,
      TMP_NET_HOST_NAME,
      TMP_NET_HOST_CONNECTION_TYPE,
      TMP_NET_HOST_CONNECTION_SUBTYPE,
      TMP_NET_HOST_CARRIER_NAME,
      TMP_NET_HOST_CARRIER_MCC,
      TMP_NET_HOST_CARRIER_MNC,
      TMP_NET_HOST_CARRIER_ICC,
      TMP_PEER_SERVICE,
      TMP_ENDUSER_ID,
      TMP_ENDUSER_ROLE,
      TMP_ENDUSER_SCOPE,
      TMP_THREAD_ID,
      TMP_THREAD_NAME,
      TMP_CODE_FUNCTION,
      TMP_CODE_NAMESPACE,
      TMP_CODE_FILEPATH,
      TMP_CODE_LINENO,
      TMP_HTTP_METHOD,
      TMP_HTTP_URL,
      TMP_HTTP_TARGET,
      TMP_HTTP_HOST,
      TMP_HTTP_SCHEME,
      TMP_HTTP_STATUS_CODE,
      TMP_HTTP_FLAVOR,
      TMP_HTTP_USER_AGENT,
      TMP_HTTP_REQUEST_CONTENT_LENGTH,
      TMP_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED,
      TMP_HTTP_RESPONSE_CONTENT_LENGTH,
      TMP_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED,
      TMP_HTTP_SERVER_NAME,
      TMP_HTTP_ROUTE,
      TMP_HTTP_CLIENT_IP,
      TMP_AWS_DYNAMODB_TABLE_NAMES,
      TMP_AWS_DYNAMODB_CONSUMED_CAPACITY,
      TMP_AWS_DYNAMODB_ITEM_COLLECTION_METRICS,
      TMP_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY,
      TMP_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY,
      TMP_AWS_DYNAMODB_CONSISTENT_READ,
      TMP_AWS_DYNAMODB_PROJECTION,
      TMP_AWS_DYNAMODB_LIMIT,
      TMP_AWS_DYNAMODB_ATTRIBUTES_TO_GET,
      TMP_AWS_DYNAMODB_INDEX_NAME,
      TMP_AWS_DYNAMODB_SELECT,
      TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES,
      TMP_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES,
      TMP_AWS_DYNAMODB_EXCLUSIVE_START_TABLE,
      TMP_AWS_DYNAMODB_TABLE_COUNT,
      TMP_AWS_DYNAMODB_SCAN_FORWARD,
      TMP_AWS_DYNAMODB_SEGMENT,
      TMP_AWS_DYNAMODB_TOTAL_SEGMENTS,
      TMP_AWS_DYNAMODB_COUNT,
      TMP_AWS_DYNAMODB_SCANNED_COUNT,
      TMP_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS,
      TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES,
      TMP_MESSAGING_SYSTEM,
      TMP_MESSAGING_DESTINATION,
      TMP_MESSAGING_DESTINATION_KIND,
      TMP_MESSAGING_TEMP_DESTINATION,
      TMP_MESSAGING_PROTOCOL,
      TMP_MESSAGING_PROTOCOL_VERSION,
      TMP_MESSAGING_URL,
      TMP_MESSAGING_MESSAGE_ID,
      TMP_MESSAGING_CONVERSATION_ID,
      TMP_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES,
      TMP_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES,
      TMP_MESSAGING_OPERATION,
      TMP_MESSAGING_CONSUMER_ID,
      TMP_MESSAGING_RABBITMQ_ROUTING_KEY,
      TMP_MESSAGING_KAFKA_MESSAGE_KEY,
      TMP_MESSAGING_KAFKA_CONSUMER_GROUP,
      TMP_MESSAGING_KAFKA_CLIENT_ID,
      TMP_MESSAGING_KAFKA_PARTITION,
      TMP_MESSAGING_KAFKA_TOMBSTONE,
      TMP_RPC_SYSTEM,
      TMP_RPC_SERVICE,
      TMP_RPC_METHOD,
      TMP_RPC_GRPC_STATUS_CODE,
      TMP_RPC_JSONRPC_VERSION,
      TMP_RPC_JSONRPC_REQUEST_ID,
      TMP_RPC_JSONRPC_ERROR_CODE,
      TMP_RPC_JSONRPC_ERROR_MESSAGE,
      TMP_MESSAGE_TYPE,
      TMP_MESSAGE_ID,
      TMP_MESSAGE_COMPRESSED_SIZE,
      TMP_MESSAGE_UNCOMPRESSED_SIZE
    ]);
    var TMP_DBSYSTEMVALUES_OTHER_SQL = "other_sql";
    var TMP_DBSYSTEMVALUES_MSSQL = "mssql";
    var TMP_DBSYSTEMVALUES_MYSQL = "mysql";
    var TMP_DBSYSTEMVALUES_ORACLE = "oracle";
    var TMP_DBSYSTEMVALUES_DB2 = "db2";
    var TMP_DBSYSTEMVALUES_POSTGRESQL = "postgresql";
    var TMP_DBSYSTEMVALUES_REDSHIFT = "redshift";
    var TMP_DBSYSTEMVALUES_HIVE = "hive";
    var TMP_DBSYSTEMVALUES_CLOUDSCAPE = "cloudscape";
    var TMP_DBSYSTEMVALUES_HSQLDB = "hsqldb";
    var TMP_DBSYSTEMVALUES_PROGRESS = "progress";
    var TMP_DBSYSTEMVALUES_MAXDB = "maxdb";
    var TMP_DBSYSTEMVALUES_HANADB = "hanadb";
    var TMP_DBSYSTEMVALUES_INGRES = "ingres";
    var TMP_DBSYSTEMVALUES_FIRSTSQL = "firstsql";
    var TMP_DBSYSTEMVALUES_EDB = "edb";
    var TMP_DBSYSTEMVALUES_CACHE = "cache";
    var TMP_DBSYSTEMVALUES_ADABAS = "adabas";
    var TMP_DBSYSTEMVALUES_FIREBIRD = "firebird";
    var TMP_DBSYSTEMVALUES_DERBY = "derby";
    var TMP_DBSYSTEMVALUES_FILEMAKER = "filemaker";
    var TMP_DBSYSTEMVALUES_INFORMIX = "informix";
    var TMP_DBSYSTEMVALUES_INSTANTDB = "instantdb";
    var TMP_DBSYSTEMVALUES_INTERBASE = "interbase";
    var TMP_DBSYSTEMVALUES_MARIADB = "mariadb";
    var TMP_DBSYSTEMVALUES_NETEZZA = "netezza";
    var TMP_DBSYSTEMVALUES_PERVASIVE = "pervasive";
    var TMP_DBSYSTEMVALUES_POINTBASE = "pointbase";
    var TMP_DBSYSTEMVALUES_SQLITE = "sqlite";
    var TMP_DBSYSTEMVALUES_SYBASE = "sybase";
    var TMP_DBSYSTEMVALUES_TERADATA = "teradata";
    var TMP_DBSYSTEMVALUES_VERTICA = "vertica";
    var TMP_DBSYSTEMVALUES_H2 = "h2";
    var TMP_DBSYSTEMVALUES_COLDFUSION = "coldfusion";
    var TMP_DBSYSTEMVALUES_CASSANDRA = "cassandra";
    var TMP_DBSYSTEMVALUES_HBASE = "hbase";
    var TMP_DBSYSTEMVALUES_MONGODB = "mongodb";
    var TMP_DBSYSTEMVALUES_REDIS = "redis";
    var TMP_DBSYSTEMVALUES_COUCHBASE = "couchbase";
    var TMP_DBSYSTEMVALUES_COUCHDB = "couchdb";
    var TMP_DBSYSTEMVALUES_COSMOSDB = "cosmosdb";
    var TMP_DBSYSTEMVALUES_DYNAMODB = "dynamodb";
    var TMP_DBSYSTEMVALUES_NEO4J = "neo4j";
    var TMP_DBSYSTEMVALUES_GEODE = "geode";
    var TMP_DBSYSTEMVALUES_ELASTICSEARCH = "elasticsearch";
    var TMP_DBSYSTEMVALUES_MEMCACHED = "memcached";
    var TMP_DBSYSTEMVALUES_COCKROACHDB = "cockroachdb";
    exports.DBSYSTEMVALUES_OTHER_SQL = TMP_DBSYSTEMVALUES_OTHER_SQL;
    exports.DBSYSTEMVALUES_MSSQL = TMP_DBSYSTEMVALUES_MSSQL;
    exports.DBSYSTEMVALUES_MYSQL = TMP_DBSYSTEMVALUES_MYSQL;
    exports.DBSYSTEMVALUES_ORACLE = TMP_DBSYSTEMVALUES_ORACLE;
    exports.DBSYSTEMVALUES_DB2 = TMP_DBSYSTEMVALUES_DB2;
    exports.DBSYSTEMVALUES_POSTGRESQL = TMP_DBSYSTEMVALUES_POSTGRESQL;
    exports.DBSYSTEMVALUES_REDSHIFT = TMP_DBSYSTEMVALUES_REDSHIFT;
    exports.DBSYSTEMVALUES_HIVE = TMP_DBSYSTEMVALUES_HIVE;
    exports.DBSYSTEMVALUES_CLOUDSCAPE = TMP_DBSYSTEMVALUES_CLOUDSCAPE;
    exports.DBSYSTEMVALUES_HSQLDB = TMP_DBSYSTEMVALUES_HSQLDB;
    exports.DBSYSTEMVALUES_PROGRESS = TMP_DBSYSTEMVALUES_PROGRESS;
    exports.DBSYSTEMVALUES_MAXDB = TMP_DBSYSTEMVALUES_MAXDB;
    exports.DBSYSTEMVALUES_HANADB = TMP_DBSYSTEMVALUES_HANADB;
    exports.DBSYSTEMVALUES_INGRES = TMP_DBSYSTEMVALUES_INGRES;
    exports.DBSYSTEMVALUES_FIRSTSQL = TMP_DBSYSTEMVALUES_FIRSTSQL;
    exports.DBSYSTEMVALUES_EDB = TMP_DBSYSTEMVALUES_EDB;
    exports.DBSYSTEMVALUES_CACHE = TMP_DBSYSTEMVALUES_CACHE;
    exports.DBSYSTEMVALUES_ADABAS = TMP_DBSYSTEMVALUES_ADABAS;
    exports.DBSYSTEMVALUES_FIREBIRD = TMP_DBSYSTEMVALUES_FIREBIRD;
    exports.DBSYSTEMVALUES_DERBY = TMP_DBSYSTEMVALUES_DERBY;
    exports.DBSYSTEMVALUES_FILEMAKER = TMP_DBSYSTEMVALUES_FILEMAKER;
    exports.DBSYSTEMVALUES_INFORMIX = TMP_DBSYSTEMVALUES_INFORMIX;
    exports.DBSYSTEMVALUES_INSTANTDB = TMP_DBSYSTEMVALUES_INSTANTDB;
    exports.DBSYSTEMVALUES_INTERBASE = TMP_DBSYSTEMVALUES_INTERBASE;
    exports.DBSYSTEMVALUES_MARIADB = TMP_DBSYSTEMVALUES_MARIADB;
    exports.DBSYSTEMVALUES_NETEZZA = TMP_DBSYSTEMVALUES_NETEZZA;
    exports.DBSYSTEMVALUES_PERVASIVE = TMP_DBSYSTEMVALUES_PERVASIVE;
    exports.DBSYSTEMVALUES_POINTBASE = TMP_DBSYSTEMVALUES_POINTBASE;
    exports.DBSYSTEMVALUES_SQLITE = TMP_DBSYSTEMVALUES_SQLITE;
    exports.DBSYSTEMVALUES_SYBASE = TMP_DBSYSTEMVALUES_SYBASE;
    exports.DBSYSTEMVALUES_TERADATA = TMP_DBSYSTEMVALUES_TERADATA;
    exports.DBSYSTEMVALUES_VERTICA = TMP_DBSYSTEMVALUES_VERTICA;
    exports.DBSYSTEMVALUES_H2 = TMP_DBSYSTEMVALUES_H2;
    exports.DBSYSTEMVALUES_COLDFUSION = TMP_DBSYSTEMVALUES_COLDFUSION;
    exports.DBSYSTEMVALUES_CASSANDRA = TMP_DBSYSTEMVALUES_CASSANDRA;
    exports.DBSYSTEMVALUES_HBASE = TMP_DBSYSTEMVALUES_HBASE;
    exports.DBSYSTEMVALUES_MONGODB = TMP_DBSYSTEMVALUES_MONGODB;
    exports.DBSYSTEMVALUES_REDIS = TMP_DBSYSTEMVALUES_REDIS;
    exports.DBSYSTEMVALUES_COUCHBASE = TMP_DBSYSTEMVALUES_COUCHBASE;
    exports.DBSYSTEMVALUES_COUCHDB = TMP_DBSYSTEMVALUES_COUCHDB;
    exports.DBSYSTEMVALUES_COSMOSDB = TMP_DBSYSTEMVALUES_COSMOSDB;
    exports.DBSYSTEMVALUES_DYNAMODB = TMP_DBSYSTEMVALUES_DYNAMODB;
    exports.DBSYSTEMVALUES_NEO4J = TMP_DBSYSTEMVALUES_NEO4J;
    exports.DBSYSTEMVALUES_GEODE = TMP_DBSYSTEMVALUES_GEODE;
    exports.DBSYSTEMVALUES_ELASTICSEARCH = TMP_DBSYSTEMVALUES_ELASTICSEARCH;
    exports.DBSYSTEMVALUES_MEMCACHED = TMP_DBSYSTEMVALUES_MEMCACHED;
    exports.DBSYSTEMVALUES_COCKROACHDB = TMP_DBSYSTEMVALUES_COCKROACHDB;
    exports.DbSystemValues = /* @__PURE__ */ (0, utils_1.createConstMap)([
      TMP_DBSYSTEMVALUES_OTHER_SQL,
      TMP_DBSYSTEMVALUES_MSSQL,
      TMP_DBSYSTEMVALUES_MYSQL,
      TMP_DBSYSTEMVALUES_ORACLE,
      TMP_DBSYSTEMVALUES_DB2,
      TMP_DBSYSTEMVALUES_POSTGRESQL,
      TMP_DBSYSTEMVALUES_REDSHIFT,
      TMP_DBSYSTEMVALUES_HIVE,
      TMP_DBSYSTEMVALUES_CLOUDSCAPE,
      TMP_DBSYSTEMVALUES_HSQLDB,
      TMP_DBSYSTEMVALUES_PROGRESS,
      TMP_DBSYSTEMVALUES_MAXDB,
      TMP_DBSYSTEMVALUES_HANADB,
      TMP_DBSYSTEMVALUES_INGRES,
      TMP_DBSYSTEMVALUES_FIRSTSQL,
      TMP_DBSYSTEMVALUES_EDB,
      TMP_DBSYSTEMVALUES_CACHE,
      TMP_DBSYSTEMVALUES_ADABAS,
      TMP_DBSYSTEMVALUES_FIREBIRD,
      TMP_DBSYSTEMVALUES_DERBY,
      TMP_DBSYSTEMVALUES_FILEMAKER,
      TMP_DBSYSTEMVALUES_INFORMIX,
      TMP_DBSYSTEMVALUES_INSTANTDB,
      TMP_DBSYSTEMVALUES_INTERBASE,
      TMP_DBSYSTEMVALUES_MARIADB,
      TMP_DBSYSTEMVALUES_NETEZZA,
      TMP_DBSYSTEMVALUES_PERVASIVE,
      TMP_DBSYSTEMVALUES_POINTBASE,
      TMP_DBSYSTEMVALUES_SQLITE,
      TMP_DBSYSTEMVALUES_SYBASE,
      TMP_DBSYSTEMVALUES_TERADATA,
      TMP_DBSYSTEMVALUES_VERTICA,
      TMP_DBSYSTEMVALUES_H2,
      TMP_DBSYSTEMVALUES_COLDFUSION,
      TMP_DBSYSTEMVALUES_CASSANDRA,
      TMP_DBSYSTEMVALUES_HBASE,
      TMP_DBSYSTEMVALUES_MONGODB,
      TMP_DBSYSTEMVALUES_REDIS,
      TMP_DBSYSTEMVALUES_COUCHBASE,
      TMP_DBSYSTEMVALUES_COUCHDB,
      TMP_DBSYSTEMVALUES_COSMOSDB,
      TMP_DBSYSTEMVALUES_DYNAMODB,
      TMP_DBSYSTEMVALUES_NEO4J,
      TMP_DBSYSTEMVALUES_GEODE,
      TMP_DBSYSTEMVALUES_ELASTICSEARCH,
      TMP_DBSYSTEMVALUES_MEMCACHED,
      TMP_DBSYSTEMVALUES_COCKROACHDB
    ]);
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ALL = "all";
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM = "each_quorum";
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM = "quorum";
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM = "local_quorum";
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ONE = "one";
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_TWO = "two";
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_THREE = "three";
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE = "local_one";
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ANY = "any";
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL = "serial";
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL = "local_serial";
    exports.DBCASSANDRACONSISTENCYLEVELVALUES_ALL = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ALL;
    exports.DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM;
    exports.DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM;
    exports.DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM;
    exports.DBCASSANDRACONSISTENCYLEVELVALUES_ONE = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ONE;
    exports.DBCASSANDRACONSISTENCYLEVELVALUES_TWO = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_TWO;
    exports.DBCASSANDRACONSISTENCYLEVELVALUES_THREE = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_THREE;
    exports.DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE;
    exports.DBCASSANDRACONSISTENCYLEVELVALUES_ANY = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ANY;
    exports.DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL;
    exports.DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL;
    exports.DbCassandraConsistencyLevelValues = /* @__PURE__ */ (0, utils_1.createConstMap)([
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ALL,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ONE,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_TWO,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_THREE,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ANY,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL
    ]);
    var TMP_FAASTRIGGERVALUES_DATASOURCE = "datasource";
    var TMP_FAASTRIGGERVALUES_HTTP = "http";
    var TMP_FAASTRIGGERVALUES_PUBSUB = "pubsub";
    var TMP_FAASTRIGGERVALUES_TIMER = "timer";
    var TMP_FAASTRIGGERVALUES_OTHER = "other";
    exports.FAASTRIGGERVALUES_DATASOURCE = TMP_FAASTRIGGERVALUES_DATASOURCE;
    exports.FAASTRIGGERVALUES_HTTP = TMP_FAASTRIGGERVALUES_HTTP;
    exports.FAASTRIGGERVALUES_PUBSUB = TMP_FAASTRIGGERVALUES_PUBSUB;
    exports.FAASTRIGGERVALUES_TIMER = TMP_FAASTRIGGERVALUES_TIMER;
    exports.FAASTRIGGERVALUES_OTHER = TMP_FAASTRIGGERVALUES_OTHER;
    exports.FaasTriggerValues = /* @__PURE__ */ (0, utils_1.createConstMap)([
      TMP_FAASTRIGGERVALUES_DATASOURCE,
      TMP_FAASTRIGGERVALUES_HTTP,
      TMP_FAASTRIGGERVALUES_PUBSUB,
      TMP_FAASTRIGGERVALUES_TIMER,
      TMP_FAASTRIGGERVALUES_OTHER
    ]);
    var TMP_FAASDOCUMENTOPERATIONVALUES_INSERT = "insert";
    var TMP_FAASDOCUMENTOPERATIONVALUES_EDIT = "edit";
    var TMP_FAASDOCUMENTOPERATIONVALUES_DELETE = "delete";
    exports.FAASDOCUMENTOPERATIONVALUES_INSERT = TMP_FAASDOCUMENTOPERATIONVALUES_INSERT;
    exports.FAASDOCUMENTOPERATIONVALUES_EDIT = TMP_FAASDOCUMENTOPERATIONVALUES_EDIT;
    exports.FAASDOCUMENTOPERATIONVALUES_DELETE = TMP_FAASDOCUMENTOPERATIONVALUES_DELETE;
    exports.FaasDocumentOperationValues = /* @__PURE__ */ (0, utils_1.createConstMap)([
      TMP_FAASDOCUMENTOPERATIONVALUES_INSERT,
      TMP_FAASDOCUMENTOPERATIONVALUES_EDIT,
      TMP_FAASDOCUMENTOPERATIONVALUES_DELETE
    ]);
    var TMP_FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD = "alibaba_cloud";
    var TMP_FAASINVOKEDPROVIDERVALUES_AWS = "aws";
    var TMP_FAASINVOKEDPROVIDERVALUES_AZURE = "azure";
    var TMP_FAASINVOKEDPROVIDERVALUES_GCP = "gcp";
    exports.FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD = TMP_FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD;
    exports.FAASINVOKEDPROVIDERVALUES_AWS = TMP_FAASINVOKEDPROVIDERVALUES_AWS;
    exports.FAASINVOKEDPROVIDERVALUES_AZURE = TMP_FAASINVOKEDPROVIDERVALUES_AZURE;
    exports.FAASINVOKEDPROVIDERVALUES_GCP = TMP_FAASINVOKEDPROVIDERVALUES_GCP;
    exports.FaasInvokedProviderValues = /* @__PURE__ */ (0, utils_1.createConstMap)([
      TMP_FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD,
      TMP_FAASINVOKEDPROVIDERVALUES_AWS,
      TMP_FAASINVOKEDPROVIDERVALUES_AZURE,
      TMP_FAASINVOKEDPROVIDERVALUES_GCP
    ]);
    var TMP_NETTRANSPORTVALUES_IP_TCP = "ip_tcp";
    var TMP_NETTRANSPORTVALUES_IP_UDP = "ip_udp";
    var TMP_NETTRANSPORTVALUES_IP = "ip";
    var TMP_NETTRANSPORTVALUES_UNIX = "unix";
    var TMP_NETTRANSPORTVALUES_PIPE = "pipe";
    var TMP_NETTRANSPORTVALUES_INPROC = "inproc";
    var TMP_NETTRANSPORTVALUES_OTHER = "other";
    exports.NETTRANSPORTVALUES_IP_TCP = TMP_NETTRANSPORTVALUES_IP_TCP;
    exports.NETTRANSPORTVALUES_IP_UDP = TMP_NETTRANSPORTVALUES_IP_UDP;
    exports.NETTRANSPORTVALUES_IP = TMP_NETTRANSPORTVALUES_IP;
    exports.NETTRANSPORTVALUES_UNIX = TMP_NETTRANSPORTVALUES_UNIX;
    exports.NETTRANSPORTVALUES_PIPE = TMP_NETTRANSPORTVALUES_PIPE;
    exports.NETTRANSPORTVALUES_INPROC = TMP_NETTRANSPORTVALUES_INPROC;
    exports.NETTRANSPORTVALUES_OTHER = TMP_NETTRANSPORTVALUES_OTHER;
    exports.NetTransportValues = /* @__PURE__ */ (0, utils_1.createConstMap)([
      TMP_NETTRANSPORTVALUES_IP_TCP,
      TMP_NETTRANSPORTVALUES_IP_UDP,
      TMP_NETTRANSPORTVALUES_IP,
      TMP_NETTRANSPORTVALUES_UNIX,
      TMP_NETTRANSPORTVALUES_PIPE,
      TMP_NETTRANSPORTVALUES_INPROC,
      TMP_NETTRANSPORTVALUES_OTHER
    ]);
    var TMP_NETHOSTCONNECTIONTYPEVALUES_WIFI = "wifi";
    var TMP_NETHOSTCONNECTIONTYPEVALUES_WIRED = "wired";
    var TMP_NETHOSTCONNECTIONTYPEVALUES_CELL = "cell";
    var TMP_NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE = "unavailable";
    var TMP_NETHOSTCONNECTIONTYPEVALUES_UNKNOWN = "unknown";
    exports.NETHOSTCONNECTIONTYPEVALUES_WIFI = TMP_NETHOSTCONNECTIONTYPEVALUES_WIFI;
    exports.NETHOSTCONNECTIONTYPEVALUES_WIRED = TMP_NETHOSTCONNECTIONTYPEVALUES_WIRED;
    exports.NETHOSTCONNECTIONTYPEVALUES_CELL = TMP_NETHOSTCONNECTIONTYPEVALUES_CELL;
    exports.NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE = TMP_NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE;
    exports.NETHOSTCONNECTIONTYPEVALUES_UNKNOWN = TMP_NETHOSTCONNECTIONTYPEVALUES_UNKNOWN;
    exports.NetHostConnectionTypeValues = /* @__PURE__ */ (0, utils_1.createConstMap)([
      TMP_NETHOSTCONNECTIONTYPEVALUES_WIFI,
      TMP_NETHOSTCONNECTIONTYPEVALUES_WIRED,
      TMP_NETHOSTCONNECTIONTYPEVALUES_CELL,
      TMP_NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE,
      TMP_NETHOSTCONNECTIONTYPEVALUES_UNKNOWN
    ]);
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GPRS = "gprs";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EDGE = "edge";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_UMTS = "umts";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA = "cdma";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0 = "evdo_0";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A = "evdo_a";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT = "cdma2000_1xrtt";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA = "hsdpa";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA = "hsupa";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPA = "hspa";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IDEN = "iden";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B = "evdo_b";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE = "lte";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD = "ehrpd";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP = "hspap";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GSM = "gsm";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA = "td_scdma";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN = "iwlan";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NR = "nr";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA = "nrnsa";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA = "lte_ca";
    exports.NETHOSTCONNECTIONSUBTYPEVALUES_GPRS = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GPRS;
    exports.NETHOSTCONNECTIONSUBTYPEVALUES_EDGE = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EDGE;
    exports.NETHOSTCONNECTIONSUBTYPEVALUES_UMTS = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_UMTS;
    exports.NETHOSTCONNECTIONSUBTYPEVALUES_CDMA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA;
    exports.NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0 = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0;
    exports.NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A;
    exports.NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT;
    exports.NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA;
    exports.NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA;
    exports.NETHOSTCONNECTIONSUBTYPEVALUES_HSPA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPA;
    exports.NETHOSTCONNECTIONSUBTYPEVALUES_IDEN = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IDEN;
    exports.NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B;
    exports.NETHOSTCONNECTIONSUBTYPEVALUES_LTE = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE;
    exports.NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD;
    exports.NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP;
    exports.NETHOSTCONNECTIONSUBTYPEVALUES_GSM = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GSM;
    exports.NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA;
    exports.NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN;
    exports.NETHOSTCONNECTIONSUBTYPEVALUES_NR = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NR;
    exports.NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA;
    exports.NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA;
    exports.NetHostConnectionSubtypeValues = /* @__PURE__ */ (0, utils_1.createConstMap)([
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GPRS,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EDGE,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_UMTS,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPA,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IDEN,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GSM,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NR,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA
    ]);
    var TMP_HTTPFLAVORVALUES_HTTP_1_0 = "1.0";
    var TMP_HTTPFLAVORVALUES_HTTP_1_1 = "1.1";
    var TMP_HTTPFLAVORVALUES_HTTP_2_0 = "2.0";
    var TMP_HTTPFLAVORVALUES_SPDY = "SPDY";
    var TMP_HTTPFLAVORVALUES_QUIC = "QUIC";
    exports.HTTPFLAVORVALUES_HTTP_1_0 = TMP_HTTPFLAVORVALUES_HTTP_1_0;
    exports.HTTPFLAVORVALUES_HTTP_1_1 = TMP_HTTPFLAVORVALUES_HTTP_1_1;
    exports.HTTPFLAVORVALUES_HTTP_2_0 = TMP_HTTPFLAVORVALUES_HTTP_2_0;
    exports.HTTPFLAVORVALUES_SPDY = TMP_HTTPFLAVORVALUES_SPDY;
    exports.HTTPFLAVORVALUES_QUIC = TMP_HTTPFLAVORVALUES_QUIC;
    exports.HttpFlavorValues = {
      HTTP_1_0: TMP_HTTPFLAVORVALUES_HTTP_1_0,
      HTTP_1_1: TMP_HTTPFLAVORVALUES_HTTP_1_1,
      HTTP_2_0: TMP_HTTPFLAVORVALUES_HTTP_2_0,
      SPDY: TMP_HTTPFLAVORVALUES_SPDY,
      QUIC: TMP_HTTPFLAVORVALUES_QUIC
    };
    var TMP_MESSAGINGDESTINATIONKINDVALUES_QUEUE = "queue";
    var TMP_MESSAGINGDESTINATIONKINDVALUES_TOPIC = "topic";
    exports.MESSAGINGDESTINATIONKINDVALUES_QUEUE = TMP_MESSAGINGDESTINATIONKINDVALUES_QUEUE;
    exports.MESSAGINGDESTINATIONKINDVALUES_TOPIC = TMP_MESSAGINGDESTINATIONKINDVALUES_TOPIC;
    exports.MessagingDestinationKindValues = /* @__PURE__ */ (0, utils_1.createConstMap)([
      TMP_MESSAGINGDESTINATIONKINDVALUES_QUEUE,
      TMP_MESSAGINGDESTINATIONKINDVALUES_TOPIC
    ]);
    var TMP_MESSAGINGOPERATIONVALUES_RECEIVE = "receive";
    var TMP_MESSAGINGOPERATIONVALUES_PROCESS = "process";
    exports.MESSAGINGOPERATIONVALUES_RECEIVE = TMP_MESSAGINGOPERATIONVALUES_RECEIVE;
    exports.MESSAGINGOPERATIONVALUES_PROCESS = TMP_MESSAGINGOPERATIONVALUES_PROCESS;
    exports.MessagingOperationValues = /* @__PURE__ */ (0, utils_1.createConstMap)([
      TMP_MESSAGINGOPERATIONVALUES_RECEIVE,
      TMP_MESSAGINGOPERATIONVALUES_PROCESS
    ]);
    var TMP_RPCGRPCSTATUSCODEVALUES_OK = 0;
    var TMP_RPCGRPCSTATUSCODEVALUES_CANCELLED = 1;
    var TMP_RPCGRPCSTATUSCODEVALUES_UNKNOWN = 2;
    var TMP_RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT = 3;
    var TMP_RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED = 4;
    var TMP_RPCGRPCSTATUSCODEVALUES_NOT_FOUND = 5;
    var TMP_RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS = 6;
    var TMP_RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED = 7;
    var TMP_RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED = 8;
    var TMP_RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION = 9;
    var TMP_RPCGRPCSTATUSCODEVALUES_ABORTED = 10;
    var TMP_RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE = 11;
    var TMP_RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED = 12;
    var TMP_RPCGRPCSTATUSCODEVALUES_INTERNAL = 13;
    var TMP_RPCGRPCSTATUSCODEVALUES_UNAVAILABLE = 14;
    var TMP_RPCGRPCSTATUSCODEVALUES_DATA_LOSS = 15;
    var TMP_RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED = 16;
    exports.RPCGRPCSTATUSCODEVALUES_OK = TMP_RPCGRPCSTATUSCODEVALUES_OK;
    exports.RPCGRPCSTATUSCODEVALUES_CANCELLED = TMP_RPCGRPCSTATUSCODEVALUES_CANCELLED;
    exports.RPCGRPCSTATUSCODEVALUES_UNKNOWN = TMP_RPCGRPCSTATUSCODEVALUES_UNKNOWN;
    exports.RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT = TMP_RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT;
    exports.RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED = TMP_RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED;
    exports.RPCGRPCSTATUSCODEVALUES_NOT_FOUND = TMP_RPCGRPCSTATUSCODEVALUES_NOT_FOUND;
    exports.RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS = TMP_RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS;
    exports.RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED = TMP_RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED;
    exports.RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED = TMP_RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED;
    exports.RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION = TMP_RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION;
    exports.RPCGRPCSTATUSCODEVALUES_ABORTED = TMP_RPCGRPCSTATUSCODEVALUES_ABORTED;
    exports.RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE = TMP_RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE;
    exports.RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED = TMP_RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED;
    exports.RPCGRPCSTATUSCODEVALUES_INTERNAL = TMP_RPCGRPCSTATUSCODEVALUES_INTERNAL;
    exports.RPCGRPCSTATUSCODEVALUES_UNAVAILABLE = TMP_RPCGRPCSTATUSCODEVALUES_UNAVAILABLE;
    exports.RPCGRPCSTATUSCODEVALUES_DATA_LOSS = TMP_RPCGRPCSTATUSCODEVALUES_DATA_LOSS;
    exports.RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED = TMP_RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED;
    exports.RpcGrpcStatusCodeValues = {
      OK: TMP_RPCGRPCSTATUSCODEVALUES_OK,
      CANCELLED: TMP_RPCGRPCSTATUSCODEVALUES_CANCELLED,
      UNKNOWN: TMP_RPCGRPCSTATUSCODEVALUES_UNKNOWN,
      INVALID_ARGUMENT: TMP_RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT,
      DEADLINE_EXCEEDED: TMP_RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED,
      NOT_FOUND: TMP_RPCGRPCSTATUSCODEVALUES_NOT_FOUND,
      ALREADY_EXISTS: TMP_RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS,
      PERMISSION_DENIED: TMP_RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED,
      RESOURCE_EXHAUSTED: TMP_RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED,
      FAILED_PRECONDITION: TMP_RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION,
      ABORTED: TMP_RPCGRPCSTATUSCODEVALUES_ABORTED,
      OUT_OF_RANGE: TMP_RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE,
      UNIMPLEMENTED: TMP_RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED,
      INTERNAL: TMP_RPCGRPCSTATUSCODEVALUES_INTERNAL,
      UNAVAILABLE: TMP_RPCGRPCSTATUSCODEVALUES_UNAVAILABLE,
      DATA_LOSS: TMP_RPCGRPCSTATUSCODEVALUES_DATA_LOSS,
      UNAUTHENTICATED: TMP_RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED
    };
    var TMP_MESSAGETYPEVALUES_SENT = "SENT";
    var TMP_MESSAGETYPEVALUES_RECEIVED = "RECEIVED";
    exports.MESSAGETYPEVALUES_SENT = TMP_MESSAGETYPEVALUES_SENT;
    exports.MESSAGETYPEVALUES_RECEIVED = TMP_MESSAGETYPEVALUES_RECEIVED;
    exports.MessageTypeValues = /* @__PURE__ */ (0, utils_1.createConstMap)([
      TMP_MESSAGETYPEVALUES_SENT,
      TMP_MESSAGETYPEVALUES_RECEIVED
    ]);
  }
});

// ../../node_modules/@opentelemetry/semantic-conventions/build/src/trace/index.js
var require_trace2 = __commonJS({
  "../../node_modules/@opentelemetry/semantic-conventions/build/src/trace/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_SemanticAttributes(), exports);
  }
});

// ../../node_modules/@opentelemetry/semantic-conventions/build/src/resource/SemanticResourceAttributes.js
var require_SemanticResourceAttributes = __commonJS({
  "../../node_modules/@opentelemetry/semantic-conventions/build/src/resource/SemanticResourceAttributes.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SEMRESATTRS_K8S_STATEFULSET_NAME = exports.SEMRESATTRS_K8S_STATEFULSET_UID = exports.SEMRESATTRS_K8S_DEPLOYMENT_NAME = exports.SEMRESATTRS_K8S_DEPLOYMENT_UID = exports.SEMRESATTRS_K8S_REPLICASET_NAME = exports.SEMRESATTRS_K8S_REPLICASET_UID = exports.SEMRESATTRS_K8S_CONTAINER_NAME = exports.SEMRESATTRS_K8S_POD_NAME = exports.SEMRESATTRS_K8S_POD_UID = exports.SEMRESATTRS_K8S_NAMESPACE_NAME = exports.SEMRESATTRS_K8S_NODE_UID = exports.SEMRESATTRS_K8S_NODE_NAME = exports.SEMRESATTRS_K8S_CLUSTER_NAME = exports.SEMRESATTRS_HOST_IMAGE_VERSION = exports.SEMRESATTRS_HOST_IMAGE_ID = exports.SEMRESATTRS_HOST_IMAGE_NAME = exports.SEMRESATTRS_HOST_ARCH = exports.SEMRESATTRS_HOST_TYPE = exports.SEMRESATTRS_HOST_NAME = exports.SEMRESATTRS_HOST_ID = exports.SEMRESATTRS_FAAS_MAX_MEMORY = exports.SEMRESATTRS_FAAS_INSTANCE = exports.SEMRESATTRS_FAAS_VERSION = exports.SEMRESATTRS_FAAS_ID = exports.SEMRESATTRS_FAAS_NAME = exports.SEMRESATTRS_DEVICE_MODEL_NAME = exports.SEMRESATTRS_DEVICE_MODEL_IDENTIFIER = exports.SEMRESATTRS_DEVICE_ID = exports.SEMRESATTRS_DEPLOYMENT_ENVIRONMENT = exports.SEMRESATTRS_CONTAINER_IMAGE_TAG = exports.SEMRESATTRS_CONTAINER_IMAGE_NAME = exports.SEMRESATTRS_CONTAINER_RUNTIME = exports.SEMRESATTRS_CONTAINER_ID = exports.SEMRESATTRS_CONTAINER_NAME = exports.SEMRESATTRS_AWS_LOG_STREAM_ARNS = exports.SEMRESATTRS_AWS_LOG_STREAM_NAMES = exports.SEMRESATTRS_AWS_LOG_GROUP_ARNS = exports.SEMRESATTRS_AWS_LOG_GROUP_NAMES = exports.SEMRESATTRS_AWS_EKS_CLUSTER_ARN = exports.SEMRESATTRS_AWS_ECS_TASK_REVISION = exports.SEMRESATTRS_AWS_ECS_TASK_FAMILY = exports.SEMRESATTRS_AWS_ECS_TASK_ARN = exports.SEMRESATTRS_AWS_ECS_LAUNCHTYPE = exports.SEMRESATTRS_AWS_ECS_CLUSTER_ARN = exports.SEMRESATTRS_AWS_ECS_CONTAINER_ARN = exports.SEMRESATTRS_CLOUD_PLATFORM = exports.SEMRESATTRS_CLOUD_AVAILABILITY_ZONE = exports.SEMRESATTRS_CLOUD_REGION = exports.SEMRESATTRS_CLOUD_ACCOUNT_ID = exports.SEMRESATTRS_CLOUD_PROVIDER = void 0;
    exports.CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE = exports.CLOUDPLATFORMVALUES_AZURE_APP_SERVICE = exports.CLOUDPLATFORMVALUES_AZURE_FUNCTIONS = exports.CLOUDPLATFORMVALUES_AZURE_AKS = exports.CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES = exports.CLOUDPLATFORMVALUES_AZURE_VM = exports.CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK = exports.CLOUDPLATFORMVALUES_AWS_LAMBDA = exports.CLOUDPLATFORMVALUES_AWS_EKS = exports.CLOUDPLATFORMVALUES_AWS_ECS = exports.CLOUDPLATFORMVALUES_AWS_EC2 = exports.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC = exports.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS = exports.CloudProviderValues = exports.CLOUDPROVIDERVALUES_GCP = exports.CLOUDPROVIDERVALUES_AZURE = exports.CLOUDPROVIDERVALUES_AWS = exports.CLOUDPROVIDERVALUES_ALIBABA_CLOUD = exports.SemanticResourceAttributes = exports.SEMRESATTRS_WEBENGINE_DESCRIPTION = exports.SEMRESATTRS_WEBENGINE_VERSION = exports.SEMRESATTRS_WEBENGINE_NAME = exports.SEMRESATTRS_TELEMETRY_AUTO_VERSION = exports.SEMRESATTRS_TELEMETRY_SDK_VERSION = exports.SEMRESATTRS_TELEMETRY_SDK_LANGUAGE = exports.SEMRESATTRS_TELEMETRY_SDK_NAME = exports.SEMRESATTRS_SERVICE_VERSION = exports.SEMRESATTRS_SERVICE_INSTANCE_ID = exports.SEMRESATTRS_SERVICE_NAMESPACE = exports.SEMRESATTRS_SERVICE_NAME = exports.SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION = exports.SEMRESATTRS_PROCESS_RUNTIME_VERSION = exports.SEMRESATTRS_PROCESS_RUNTIME_NAME = exports.SEMRESATTRS_PROCESS_OWNER = exports.SEMRESATTRS_PROCESS_COMMAND_ARGS = exports.SEMRESATTRS_PROCESS_COMMAND_LINE = exports.SEMRESATTRS_PROCESS_COMMAND = exports.SEMRESATTRS_PROCESS_EXECUTABLE_PATH = exports.SEMRESATTRS_PROCESS_EXECUTABLE_NAME = exports.SEMRESATTRS_PROCESS_PID = exports.SEMRESATTRS_OS_VERSION = exports.SEMRESATTRS_OS_NAME = exports.SEMRESATTRS_OS_DESCRIPTION = exports.SEMRESATTRS_OS_TYPE = exports.SEMRESATTRS_K8S_CRONJOB_NAME = exports.SEMRESATTRS_K8S_CRONJOB_UID = exports.SEMRESATTRS_K8S_JOB_NAME = exports.SEMRESATTRS_K8S_JOB_UID = exports.SEMRESATTRS_K8S_DAEMONSET_NAME = exports.SEMRESATTRS_K8S_DAEMONSET_UID = void 0;
    exports.TelemetrySdkLanguageValues = exports.TELEMETRYSDKLANGUAGEVALUES_WEBJS = exports.TELEMETRYSDKLANGUAGEVALUES_RUBY = exports.TELEMETRYSDKLANGUAGEVALUES_PYTHON = exports.TELEMETRYSDKLANGUAGEVALUES_PHP = exports.TELEMETRYSDKLANGUAGEVALUES_NODEJS = exports.TELEMETRYSDKLANGUAGEVALUES_JAVA = exports.TELEMETRYSDKLANGUAGEVALUES_GO = exports.TELEMETRYSDKLANGUAGEVALUES_ERLANG = exports.TELEMETRYSDKLANGUAGEVALUES_DOTNET = exports.TELEMETRYSDKLANGUAGEVALUES_CPP = exports.OsTypeValues = exports.OSTYPEVALUES_Z_OS = exports.OSTYPEVALUES_SOLARIS = exports.OSTYPEVALUES_AIX = exports.OSTYPEVALUES_HPUX = exports.OSTYPEVALUES_DRAGONFLYBSD = exports.OSTYPEVALUES_OPENBSD = exports.OSTYPEVALUES_NETBSD = exports.OSTYPEVALUES_FREEBSD = exports.OSTYPEVALUES_DARWIN = exports.OSTYPEVALUES_LINUX = exports.OSTYPEVALUES_WINDOWS = exports.HostArchValues = exports.HOSTARCHVALUES_X86 = exports.HOSTARCHVALUES_PPC64 = exports.HOSTARCHVALUES_PPC32 = exports.HOSTARCHVALUES_IA64 = exports.HOSTARCHVALUES_ARM64 = exports.HOSTARCHVALUES_ARM32 = exports.HOSTARCHVALUES_AMD64 = exports.AwsEcsLaunchtypeValues = exports.AWSECSLAUNCHTYPEVALUES_FARGATE = exports.AWSECSLAUNCHTYPEVALUES_EC2 = exports.CloudPlatformValues = exports.CLOUDPLATFORMVALUES_GCP_APP_ENGINE = exports.CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS = exports.CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE = exports.CLOUDPLATFORMVALUES_GCP_CLOUD_RUN = void 0;
    var utils_1 = require_utils3();
    var TMP_CLOUD_PROVIDER = "cloud.provider";
    var TMP_CLOUD_ACCOUNT_ID = "cloud.account.id";
    var TMP_CLOUD_REGION = "cloud.region";
    var TMP_CLOUD_AVAILABILITY_ZONE = "cloud.availability_zone";
    var TMP_CLOUD_PLATFORM = "cloud.platform";
    var TMP_AWS_ECS_CONTAINER_ARN = "aws.ecs.container.arn";
    var TMP_AWS_ECS_CLUSTER_ARN = "aws.ecs.cluster.arn";
    var TMP_AWS_ECS_LAUNCHTYPE = "aws.ecs.launchtype";
    var TMP_AWS_ECS_TASK_ARN = "aws.ecs.task.arn";
    var TMP_AWS_ECS_TASK_FAMILY = "aws.ecs.task.family";
    var TMP_AWS_ECS_TASK_REVISION = "aws.ecs.task.revision";
    var TMP_AWS_EKS_CLUSTER_ARN = "aws.eks.cluster.arn";
    var TMP_AWS_LOG_GROUP_NAMES = "aws.log.group.names";
    var TMP_AWS_LOG_GROUP_ARNS = "aws.log.group.arns";
    var TMP_AWS_LOG_STREAM_NAMES = "aws.log.stream.names";
    var TMP_AWS_LOG_STREAM_ARNS = "aws.log.stream.arns";
    var TMP_CONTAINER_NAME = "container.name";
    var TMP_CONTAINER_ID = "container.id";
    var TMP_CONTAINER_RUNTIME = "container.runtime";
    var TMP_CONTAINER_IMAGE_NAME = "container.image.name";
    var TMP_CONTAINER_IMAGE_TAG = "container.image.tag";
    var TMP_DEPLOYMENT_ENVIRONMENT = "deployment.environment";
    var TMP_DEVICE_ID = "device.id";
    var TMP_DEVICE_MODEL_IDENTIFIER = "device.model.identifier";
    var TMP_DEVICE_MODEL_NAME = "device.model.name";
    var TMP_FAAS_NAME = "faas.name";
    var TMP_FAAS_ID = "faas.id";
    var TMP_FAAS_VERSION = "faas.version";
    var TMP_FAAS_INSTANCE = "faas.instance";
    var TMP_FAAS_MAX_MEMORY = "faas.max_memory";
    var TMP_HOST_ID = "host.id";
    var TMP_HOST_NAME = "host.name";
    var TMP_HOST_TYPE = "host.type";
    var TMP_HOST_ARCH = "host.arch";
    var TMP_HOST_IMAGE_NAME = "host.image.name";
    var TMP_HOST_IMAGE_ID = "host.image.id";
    var TMP_HOST_IMAGE_VERSION = "host.image.version";
    var TMP_K8S_CLUSTER_NAME = "k8s.cluster.name";
    var TMP_K8S_NODE_NAME = "k8s.node.name";
    var TMP_K8S_NODE_UID = "k8s.node.uid";
    var TMP_K8S_NAMESPACE_NAME = "k8s.namespace.name";
    var TMP_K8S_POD_UID = "k8s.pod.uid";
    var TMP_K8S_POD_NAME = "k8s.pod.name";
    var TMP_K8S_CONTAINER_NAME = "k8s.container.name";
    var TMP_K8S_REPLICASET_UID = "k8s.replicaset.uid";
    var TMP_K8S_REPLICASET_NAME = "k8s.replicaset.name";
    var TMP_K8S_DEPLOYMENT_UID = "k8s.deployment.uid";
    var TMP_K8S_DEPLOYMENT_NAME = "k8s.deployment.name";
    var TMP_K8S_STATEFULSET_UID = "k8s.statefulset.uid";
    var TMP_K8S_STATEFULSET_NAME = "k8s.statefulset.name";
    var TMP_K8S_DAEMONSET_UID = "k8s.daemonset.uid";
    var TMP_K8S_DAEMONSET_NAME = "k8s.daemonset.name";
    var TMP_K8S_JOB_UID = "k8s.job.uid";
    var TMP_K8S_JOB_NAME = "k8s.job.name";
    var TMP_K8S_CRONJOB_UID = "k8s.cronjob.uid";
    var TMP_K8S_CRONJOB_NAME = "k8s.cronjob.name";
    var TMP_OS_TYPE = "os.type";
    var TMP_OS_DESCRIPTION = "os.description";
    var TMP_OS_NAME = "os.name";
    var TMP_OS_VERSION = "os.version";
    var TMP_PROCESS_PID = "process.pid";
    var TMP_PROCESS_EXECUTABLE_NAME = "process.executable.name";
    var TMP_PROCESS_EXECUTABLE_PATH = "process.executable.path";
    var TMP_PROCESS_COMMAND = "process.command";
    var TMP_PROCESS_COMMAND_LINE = "process.command_line";
    var TMP_PROCESS_COMMAND_ARGS = "process.command_args";
    var TMP_PROCESS_OWNER = "process.owner";
    var TMP_PROCESS_RUNTIME_NAME = "process.runtime.name";
    var TMP_PROCESS_RUNTIME_VERSION = "process.runtime.version";
    var TMP_PROCESS_RUNTIME_DESCRIPTION = "process.runtime.description";
    var TMP_SERVICE_NAME = "service.name";
    var TMP_SERVICE_NAMESPACE = "service.namespace";
    var TMP_SERVICE_INSTANCE_ID = "service.instance.id";
    var TMP_SERVICE_VERSION = "service.version";
    var TMP_TELEMETRY_SDK_NAME = "telemetry.sdk.name";
    var TMP_TELEMETRY_SDK_LANGUAGE = "telemetry.sdk.language";
    var TMP_TELEMETRY_SDK_VERSION = "telemetry.sdk.version";
    var TMP_TELEMETRY_AUTO_VERSION = "telemetry.auto.version";
    var TMP_WEBENGINE_NAME = "webengine.name";
    var TMP_WEBENGINE_VERSION = "webengine.version";
    var TMP_WEBENGINE_DESCRIPTION = "webengine.description";
    exports.SEMRESATTRS_CLOUD_PROVIDER = TMP_CLOUD_PROVIDER;
    exports.SEMRESATTRS_CLOUD_ACCOUNT_ID = TMP_CLOUD_ACCOUNT_ID;
    exports.SEMRESATTRS_CLOUD_REGION = TMP_CLOUD_REGION;
    exports.SEMRESATTRS_CLOUD_AVAILABILITY_ZONE = TMP_CLOUD_AVAILABILITY_ZONE;
    exports.SEMRESATTRS_CLOUD_PLATFORM = TMP_CLOUD_PLATFORM;
    exports.SEMRESATTRS_AWS_ECS_CONTAINER_ARN = TMP_AWS_ECS_CONTAINER_ARN;
    exports.SEMRESATTRS_AWS_ECS_CLUSTER_ARN = TMP_AWS_ECS_CLUSTER_ARN;
    exports.SEMRESATTRS_AWS_ECS_LAUNCHTYPE = TMP_AWS_ECS_LAUNCHTYPE;
    exports.SEMRESATTRS_AWS_ECS_TASK_ARN = TMP_AWS_ECS_TASK_ARN;
    exports.SEMRESATTRS_AWS_ECS_TASK_FAMILY = TMP_AWS_ECS_TASK_FAMILY;
    exports.SEMRESATTRS_AWS_ECS_TASK_REVISION = TMP_AWS_ECS_TASK_REVISION;
    exports.SEMRESATTRS_AWS_EKS_CLUSTER_ARN = TMP_AWS_EKS_CLUSTER_ARN;
    exports.SEMRESATTRS_AWS_LOG_GROUP_NAMES = TMP_AWS_LOG_GROUP_NAMES;
    exports.SEMRESATTRS_AWS_LOG_GROUP_ARNS = TMP_AWS_LOG_GROUP_ARNS;
    exports.SEMRESATTRS_AWS_LOG_STREAM_NAMES = TMP_AWS_LOG_STREAM_NAMES;
    exports.SEMRESATTRS_AWS_LOG_STREAM_ARNS = TMP_AWS_LOG_STREAM_ARNS;
    exports.SEMRESATTRS_CONTAINER_NAME = TMP_CONTAINER_NAME;
    exports.SEMRESATTRS_CONTAINER_ID = TMP_CONTAINER_ID;
    exports.SEMRESATTRS_CONTAINER_RUNTIME = TMP_CONTAINER_RUNTIME;
    exports.SEMRESATTRS_CONTAINER_IMAGE_NAME = TMP_CONTAINER_IMAGE_NAME;
    exports.SEMRESATTRS_CONTAINER_IMAGE_TAG = TMP_CONTAINER_IMAGE_TAG;
    exports.SEMRESATTRS_DEPLOYMENT_ENVIRONMENT = TMP_DEPLOYMENT_ENVIRONMENT;
    exports.SEMRESATTRS_DEVICE_ID = TMP_DEVICE_ID;
    exports.SEMRESATTRS_DEVICE_MODEL_IDENTIFIER = TMP_DEVICE_MODEL_IDENTIFIER;
    exports.SEMRESATTRS_DEVICE_MODEL_NAME = TMP_DEVICE_MODEL_NAME;
    exports.SEMRESATTRS_FAAS_NAME = TMP_FAAS_NAME;
    exports.SEMRESATTRS_FAAS_ID = TMP_FAAS_ID;
    exports.SEMRESATTRS_FAAS_VERSION = TMP_FAAS_VERSION;
    exports.SEMRESATTRS_FAAS_INSTANCE = TMP_FAAS_INSTANCE;
    exports.SEMRESATTRS_FAAS_MAX_MEMORY = TMP_FAAS_MAX_MEMORY;
    exports.SEMRESATTRS_HOST_ID = TMP_HOST_ID;
    exports.SEMRESATTRS_HOST_NAME = TMP_HOST_NAME;
    exports.SEMRESATTRS_HOST_TYPE = TMP_HOST_TYPE;
    exports.SEMRESATTRS_HOST_ARCH = TMP_HOST_ARCH;
    exports.SEMRESATTRS_HOST_IMAGE_NAME = TMP_HOST_IMAGE_NAME;
    exports.SEMRESATTRS_HOST_IMAGE_ID = TMP_HOST_IMAGE_ID;
    exports.SEMRESATTRS_HOST_IMAGE_VERSION = TMP_HOST_IMAGE_VERSION;
    exports.SEMRESATTRS_K8S_CLUSTER_NAME = TMP_K8S_CLUSTER_NAME;
    exports.SEMRESATTRS_K8S_NODE_NAME = TMP_K8S_NODE_NAME;
    exports.SEMRESATTRS_K8S_NODE_UID = TMP_K8S_NODE_UID;
    exports.SEMRESATTRS_K8S_NAMESPACE_NAME = TMP_K8S_NAMESPACE_NAME;
    exports.SEMRESATTRS_K8S_POD_UID = TMP_K8S_POD_UID;
    exports.SEMRESATTRS_K8S_POD_NAME = TMP_K8S_POD_NAME;
    exports.SEMRESATTRS_K8S_CONTAINER_NAME = TMP_K8S_CONTAINER_NAME;
    exports.SEMRESATTRS_K8S_REPLICASET_UID = TMP_K8S_REPLICASET_UID;
    exports.SEMRESATTRS_K8S_REPLICASET_NAME = TMP_K8S_REPLICASET_NAME;
    exports.SEMRESATTRS_K8S_DEPLOYMENT_UID = TMP_K8S_DEPLOYMENT_UID;
    exports.SEMRESATTRS_K8S_DEPLOYMENT_NAME = TMP_K8S_DEPLOYMENT_NAME;
    exports.SEMRESATTRS_K8S_STATEFULSET_UID = TMP_K8S_STATEFULSET_UID;
    exports.SEMRESATTRS_K8S_STATEFULSET_NAME = TMP_K8S_STATEFULSET_NAME;
    exports.SEMRESATTRS_K8S_DAEMONSET_UID = TMP_K8S_DAEMONSET_UID;
    exports.SEMRESATTRS_K8S_DAEMONSET_NAME = TMP_K8S_DAEMONSET_NAME;
    exports.SEMRESATTRS_K8S_JOB_UID = TMP_K8S_JOB_UID;
    exports.SEMRESATTRS_K8S_JOB_NAME = TMP_K8S_JOB_NAME;
    exports.SEMRESATTRS_K8S_CRONJOB_UID = TMP_K8S_CRONJOB_UID;
    exports.SEMRESATTRS_K8S_CRONJOB_NAME = TMP_K8S_CRONJOB_NAME;
    exports.SEMRESATTRS_OS_TYPE = TMP_OS_TYPE;
    exports.SEMRESATTRS_OS_DESCRIPTION = TMP_OS_DESCRIPTION;
    exports.SEMRESATTRS_OS_NAME = TMP_OS_NAME;
    exports.SEMRESATTRS_OS_VERSION = TMP_OS_VERSION;
    exports.SEMRESATTRS_PROCESS_PID = TMP_PROCESS_PID;
    exports.SEMRESATTRS_PROCESS_EXECUTABLE_NAME = TMP_PROCESS_EXECUTABLE_NAME;
    exports.SEMRESATTRS_PROCESS_EXECUTABLE_PATH = TMP_PROCESS_EXECUTABLE_PATH;
    exports.SEMRESATTRS_PROCESS_COMMAND = TMP_PROCESS_COMMAND;
    exports.SEMRESATTRS_PROCESS_COMMAND_LINE = TMP_PROCESS_COMMAND_LINE;
    exports.SEMRESATTRS_PROCESS_COMMAND_ARGS = TMP_PROCESS_COMMAND_ARGS;
    exports.SEMRESATTRS_PROCESS_OWNER = TMP_PROCESS_OWNER;
    exports.SEMRESATTRS_PROCESS_RUNTIME_NAME = TMP_PROCESS_RUNTIME_NAME;
    exports.SEMRESATTRS_PROCESS_RUNTIME_VERSION = TMP_PROCESS_RUNTIME_VERSION;
    exports.SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION = TMP_PROCESS_RUNTIME_DESCRIPTION;
    exports.SEMRESATTRS_SERVICE_NAME = TMP_SERVICE_NAME;
    exports.SEMRESATTRS_SERVICE_NAMESPACE = TMP_SERVICE_NAMESPACE;
    exports.SEMRESATTRS_SERVICE_INSTANCE_ID = TMP_SERVICE_INSTANCE_ID;
    exports.SEMRESATTRS_SERVICE_VERSION = TMP_SERVICE_VERSION;
    exports.SEMRESATTRS_TELEMETRY_SDK_NAME = TMP_TELEMETRY_SDK_NAME;
    exports.SEMRESATTRS_TELEMETRY_SDK_LANGUAGE = TMP_TELEMETRY_SDK_LANGUAGE;
    exports.SEMRESATTRS_TELEMETRY_SDK_VERSION = TMP_TELEMETRY_SDK_VERSION;
    exports.SEMRESATTRS_TELEMETRY_AUTO_VERSION = TMP_TELEMETRY_AUTO_VERSION;
    exports.SEMRESATTRS_WEBENGINE_NAME = TMP_WEBENGINE_NAME;
    exports.SEMRESATTRS_WEBENGINE_VERSION = TMP_WEBENGINE_VERSION;
    exports.SEMRESATTRS_WEBENGINE_DESCRIPTION = TMP_WEBENGINE_DESCRIPTION;
    exports.SemanticResourceAttributes = /* @__PURE__ */ (0, utils_1.createConstMap)([
      TMP_CLOUD_PROVIDER,
      TMP_CLOUD_ACCOUNT_ID,
      TMP_CLOUD_REGION,
      TMP_CLOUD_AVAILABILITY_ZONE,
      TMP_CLOUD_PLATFORM,
      TMP_AWS_ECS_CONTAINER_ARN,
      TMP_AWS_ECS_CLUSTER_ARN,
      TMP_AWS_ECS_LAUNCHTYPE,
      TMP_AWS_ECS_TASK_ARN,
      TMP_AWS_ECS_TASK_FAMILY,
      TMP_AWS_ECS_TASK_REVISION,
      TMP_AWS_EKS_CLUSTER_ARN,
      TMP_AWS_LOG_GROUP_NAMES,
      TMP_AWS_LOG_GROUP_ARNS,
      TMP_AWS_LOG_STREAM_NAMES,
      TMP_AWS_LOG_STREAM_ARNS,
      TMP_CONTAINER_NAME,
      TMP_CONTAINER_ID,
      TMP_CONTAINER_RUNTIME,
      TMP_CONTAINER_IMAGE_NAME,
      TMP_CONTAINER_IMAGE_TAG,
      TMP_DEPLOYMENT_ENVIRONMENT,
      TMP_DEVICE_ID,
      TMP_DEVICE_MODEL_IDENTIFIER,
      TMP_DEVICE_MODEL_NAME,
      TMP_FAAS_NAME,
      TMP_FAAS_ID,
      TMP_FAAS_VERSION,
      TMP_FAAS_INSTANCE,
      TMP_FAAS_MAX_MEMORY,
      TMP_HOST_ID,
      TMP_HOST_NAME,
      TMP_HOST_TYPE,
      TMP_HOST_ARCH,
      TMP_HOST_IMAGE_NAME,
      TMP_HOST_IMAGE_ID,
      TMP_HOST_IMAGE_VERSION,
      TMP_K8S_CLUSTER_NAME,
      TMP_K8S_NODE_NAME,
      TMP_K8S_NODE_UID,
      TMP_K8S_NAMESPACE_NAME,
      TMP_K8S_POD_UID,
      TMP_K8S_POD_NAME,
      TMP_K8S_CONTAINER_NAME,
      TMP_K8S_REPLICASET_UID,
      TMP_K8S_REPLICASET_NAME,
      TMP_K8S_DEPLOYMENT_UID,
      TMP_K8S_DEPLOYMENT_NAME,
      TMP_K8S_STATEFULSET_UID,
      TMP_K8S_STATEFULSET_NAME,
      TMP_K8S_DAEMONSET_UID,
      TMP_K8S_DAEMONSET_NAME,
      TMP_K8S_JOB_UID,
      TMP_K8S_JOB_NAME,
      TMP_K8S_CRONJOB_UID,
      TMP_K8S_CRONJOB_NAME,
      TMP_OS_TYPE,
      TMP_OS_DESCRIPTION,
      TMP_OS_NAME,
      TMP_OS_VERSION,
      TMP_PROCESS_PID,
      TMP_PROCESS_EXECUTABLE_NAME,
      TMP_PROCESS_EXECUTABLE_PATH,
      TMP_PROCESS_COMMAND,
      TMP_PROCESS_COMMAND_LINE,
      TMP_PROCESS_COMMAND_ARGS,
      TMP_PROCESS_OWNER,
      TMP_PROCESS_RUNTIME_NAME,
      TMP_PROCESS_RUNTIME_VERSION,
      TMP_PROCESS_RUNTIME_DESCRIPTION,
      TMP_SERVICE_NAME,
      TMP_SERVICE_NAMESPACE,
      TMP_SERVICE_INSTANCE_ID,
      TMP_SERVICE_VERSION,
      TMP_TELEMETRY_SDK_NAME,
      TMP_TELEMETRY_SDK_LANGUAGE,
      TMP_TELEMETRY_SDK_VERSION,
      TMP_TELEMETRY_AUTO_VERSION,
      TMP_WEBENGINE_NAME,
      TMP_WEBENGINE_VERSION,
      TMP_WEBENGINE_DESCRIPTION
    ]);
    var TMP_CLOUDPROVIDERVALUES_ALIBABA_CLOUD = "alibaba_cloud";
    var TMP_CLOUDPROVIDERVALUES_AWS = "aws";
    var TMP_CLOUDPROVIDERVALUES_AZURE = "azure";
    var TMP_CLOUDPROVIDERVALUES_GCP = "gcp";
    exports.CLOUDPROVIDERVALUES_ALIBABA_CLOUD = TMP_CLOUDPROVIDERVALUES_ALIBABA_CLOUD;
    exports.CLOUDPROVIDERVALUES_AWS = TMP_CLOUDPROVIDERVALUES_AWS;
    exports.CLOUDPROVIDERVALUES_AZURE = TMP_CLOUDPROVIDERVALUES_AZURE;
    exports.CLOUDPROVIDERVALUES_GCP = TMP_CLOUDPROVIDERVALUES_GCP;
    exports.CloudProviderValues = /* @__PURE__ */ (0, utils_1.createConstMap)([
      TMP_CLOUDPROVIDERVALUES_ALIBABA_CLOUD,
      TMP_CLOUDPROVIDERVALUES_AWS,
      TMP_CLOUDPROVIDERVALUES_AZURE,
      TMP_CLOUDPROVIDERVALUES_GCP
    ]);
    var TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS = "alibaba_cloud_ecs";
    var TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC = "alibaba_cloud_fc";
    var TMP_CLOUDPLATFORMVALUES_AWS_EC2 = "aws_ec2";
    var TMP_CLOUDPLATFORMVALUES_AWS_ECS = "aws_ecs";
    var TMP_CLOUDPLATFORMVALUES_AWS_EKS = "aws_eks";
    var TMP_CLOUDPLATFORMVALUES_AWS_LAMBDA = "aws_lambda";
    var TMP_CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK = "aws_elastic_beanstalk";
    var TMP_CLOUDPLATFORMVALUES_AZURE_VM = "azure_vm";
    var TMP_CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES = "azure_container_instances";
    var TMP_CLOUDPLATFORMVALUES_AZURE_AKS = "azure_aks";
    var TMP_CLOUDPLATFORMVALUES_AZURE_FUNCTIONS = "azure_functions";
    var TMP_CLOUDPLATFORMVALUES_AZURE_APP_SERVICE = "azure_app_service";
    var TMP_CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE = "gcp_compute_engine";
    var TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_RUN = "gcp_cloud_run";
    var TMP_CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE = "gcp_kubernetes_engine";
    var TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS = "gcp_cloud_functions";
    var TMP_CLOUDPLATFORMVALUES_GCP_APP_ENGINE = "gcp_app_engine";
    exports.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS = TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS;
    exports.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC = TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC;
    exports.CLOUDPLATFORMVALUES_AWS_EC2 = TMP_CLOUDPLATFORMVALUES_AWS_EC2;
    exports.CLOUDPLATFORMVALUES_AWS_ECS = TMP_CLOUDPLATFORMVALUES_AWS_ECS;
    exports.CLOUDPLATFORMVALUES_AWS_EKS = TMP_CLOUDPLATFORMVALUES_AWS_EKS;
    exports.CLOUDPLATFORMVALUES_AWS_LAMBDA = TMP_CLOUDPLATFORMVALUES_AWS_LAMBDA;
    exports.CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK = TMP_CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK;
    exports.CLOUDPLATFORMVALUES_AZURE_VM = TMP_CLOUDPLATFORMVALUES_AZURE_VM;
    exports.CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES = TMP_CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES;
    exports.CLOUDPLATFORMVALUES_AZURE_AKS = TMP_CLOUDPLATFORMVALUES_AZURE_AKS;
    exports.CLOUDPLATFORMVALUES_AZURE_FUNCTIONS = TMP_CLOUDPLATFORMVALUES_AZURE_FUNCTIONS;
    exports.CLOUDPLATFORMVALUES_AZURE_APP_SERVICE = TMP_CLOUDPLATFORMVALUES_AZURE_APP_SERVICE;
    exports.CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE = TMP_CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE;
    exports.CLOUDPLATFORMVALUES_GCP_CLOUD_RUN = TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_RUN;
    exports.CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE = TMP_CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE;
    exports.CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS = TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS;
    exports.CLOUDPLATFORMVALUES_GCP_APP_ENGINE = TMP_CLOUDPLATFORMVALUES_GCP_APP_ENGINE;
    exports.CloudPlatformValues = /* @__PURE__ */ (0, utils_1.createConstMap)([
      TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS,
      TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC,
      TMP_CLOUDPLATFORMVALUES_AWS_EC2,
      TMP_CLOUDPLATFORMVALUES_AWS_ECS,
      TMP_CLOUDPLATFORMVALUES_AWS_EKS,
      TMP_CLOUDPLATFORMVALUES_AWS_LAMBDA,
      TMP_CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK,
      TMP_CLOUDPLATFORMVALUES_AZURE_VM,
      TMP_CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES,
      TMP_CLOUDPLATFORMVALUES_AZURE_AKS,
      TMP_CLOUDPLATFORMVALUES_AZURE_FUNCTIONS,
      TMP_CLOUDPLATFORMVALUES_AZURE_APP_SERVICE,
      TMP_CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE,
      TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_RUN,
      TMP_CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE,
      TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS,
      TMP_CLOUDPLATFORMVALUES_GCP_APP_ENGINE
    ]);
    var TMP_AWSECSLAUNCHTYPEVALUES_EC2 = "ec2";
    var TMP_AWSECSLAUNCHTYPEVALUES_FARGATE = "fargate";
    exports.AWSECSLAUNCHTYPEVALUES_EC2 = TMP_AWSECSLAUNCHTYPEVALUES_EC2;
    exports.AWSECSLAUNCHTYPEVALUES_FARGATE = TMP_AWSECSLAUNCHTYPEVALUES_FARGATE;
    exports.AwsEcsLaunchtypeValues = /* @__PURE__ */ (0, utils_1.createConstMap)([
      TMP_AWSECSLAUNCHTYPEVALUES_EC2,
      TMP_AWSECSLAUNCHTYPEVALUES_FARGATE
    ]);
    var TMP_HOSTARCHVALUES_AMD64 = "amd64";
    var TMP_HOSTARCHVALUES_ARM32 = "arm32";
    var TMP_HOSTARCHVALUES_ARM64 = "arm64";
    var TMP_HOSTARCHVALUES_IA64 = "ia64";
    var TMP_HOSTARCHVALUES_PPC32 = "ppc32";
    var TMP_HOSTARCHVALUES_PPC64 = "ppc64";
    var TMP_HOSTARCHVALUES_X86 = "x86";
    exports.HOSTARCHVALUES_AMD64 = TMP_HOSTARCHVALUES_AMD64;
    exports.HOSTARCHVALUES_ARM32 = TMP_HOSTARCHVALUES_ARM32;
    exports.HOSTARCHVALUES_ARM64 = TMP_HOSTARCHVALUES_ARM64;
    exports.HOSTARCHVALUES_IA64 = TMP_HOSTARCHVALUES_IA64;
    exports.HOSTARCHVALUES_PPC32 = TMP_HOSTARCHVALUES_PPC32;
    exports.HOSTARCHVALUES_PPC64 = TMP_HOSTARCHVALUES_PPC64;
    exports.HOSTARCHVALUES_X86 = TMP_HOSTARCHVALUES_X86;
    exports.HostArchValues = /* @__PURE__ */ (0, utils_1.createConstMap)([
      TMP_HOSTARCHVALUES_AMD64,
      TMP_HOSTARCHVALUES_ARM32,
      TMP_HOSTARCHVALUES_ARM64,
      TMP_HOSTARCHVALUES_IA64,
      TMP_HOSTARCHVALUES_PPC32,
      TMP_HOSTARCHVALUES_PPC64,
      TMP_HOSTARCHVALUES_X86
    ]);
    var TMP_OSTYPEVALUES_WINDOWS = "windows";
    var TMP_OSTYPEVALUES_LINUX = "linux";
    var TMP_OSTYPEVALUES_DARWIN = "darwin";
    var TMP_OSTYPEVALUES_FREEBSD = "freebsd";
    var TMP_OSTYPEVALUES_NETBSD = "netbsd";
    var TMP_OSTYPEVALUES_OPENBSD = "openbsd";
    var TMP_OSTYPEVALUES_DRAGONFLYBSD = "dragonflybsd";
    var TMP_OSTYPEVALUES_HPUX = "hpux";
    var TMP_OSTYPEVALUES_AIX = "aix";
    var TMP_OSTYPEVALUES_SOLARIS = "solaris";
    var TMP_OSTYPEVALUES_Z_OS = "z_os";
    exports.OSTYPEVALUES_WINDOWS = TMP_OSTYPEVALUES_WINDOWS;
    exports.OSTYPEVALUES_LINUX = TMP_OSTYPEVALUES_LINUX;
    exports.OSTYPEVALUES_DARWIN = TMP_OSTYPEVALUES_DARWIN;
    exports.OSTYPEVALUES_FREEBSD = TMP_OSTYPEVALUES_FREEBSD;
    exports.OSTYPEVALUES_NETBSD = TMP_OSTYPEVALUES_NETBSD;
    exports.OSTYPEVALUES_OPENBSD = TMP_OSTYPEVALUES_OPENBSD;
    exports.OSTYPEVALUES_DRAGONFLYBSD = TMP_OSTYPEVALUES_DRAGONFLYBSD;
    exports.OSTYPEVALUES_HPUX = TMP_OSTYPEVALUES_HPUX;
    exports.OSTYPEVALUES_AIX = TMP_OSTYPEVALUES_AIX;
    exports.OSTYPEVALUES_SOLARIS = TMP_OSTYPEVALUES_SOLARIS;
    exports.OSTYPEVALUES_Z_OS = TMP_OSTYPEVALUES_Z_OS;
    exports.OsTypeValues = /* @__PURE__ */ (0, utils_1.createConstMap)([
      TMP_OSTYPEVALUES_WINDOWS,
      TMP_OSTYPEVALUES_LINUX,
      TMP_OSTYPEVALUES_DARWIN,
      TMP_OSTYPEVALUES_FREEBSD,
      TMP_OSTYPEVALUES_NETBSD,
      TMP_OSTYPEVALUES_OPENBSD,
      TMP_OSTYPEVALUES_DRAGONFLYBSD,
      TMP_OSTYPEVALUES_HPUX,
      TMP_OSTYPEVALUES_AIX,
      TMP_OSTYPEVALUES_SOLARIS,
      TMP_OSTYPEVALUES_Z_OS
    ]);
    var TMP_TELEMETRYSDKLANGUAGEVALUES_CPP = "cpp";
    var TMP_TELEMETRYSDKLANGUAGEVALUES_DOTNET = "dotnet";
    var TMP_TELEMETRYSDKLANGUAGEVALUES_ERLANG = "erlang";
    var TMP_TELEMETRYSDKLANGUAGEVALUES_GO = "go";
    var TMP_TELEMETRYSDKLANGUAGEVALUES_JAVA = "java";
    var TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS = "nodejs";
    var TMP_TELEMETRYSDKLANGUAGEVALUES_PHP = "php";
    var TMP_TELEMETRYSDKLANGUAGEVALUES_PYTHON = "python";
    var TMP_TELEMETRYSDKLANGUAGEVALUES_RUBY = "ruby";
    var TMP_TELEMETRYSDKLANGUAGEVALUES_WEBJS = "webjs";
    exports.TELEMETRYSDKLANGUAGEVALUES_CPP = TMP_TELEMETRYSDKLANGUAGEVALUES_CPP;
    exports.TELEMETRYSDKLANGUAGEVALUES_DOTNET = TMP_TELEMETRYSDKLANGUAGEVALUES_DOTNET;
    exports.TELEMETRYSDKLANGUAGEVALUES_ERLANG = TMP_TELEMETRYSDKLANGUAGEVALUES_ERLANG;
    exports.TELEMETRYSDKLANGUAGEVALUES_GO = TMP_TELEMETRYSDKLANGUAGEVALUES_GO;
    exports.TELEMETRYSDKLANGUAGEVALUES_JAVA = TMP_TELEMETRYSDKLANGUAGEVALUES_JAVA;
    exports.TELEMETRYSDKLANGUAGEVALUES_NODEJS = TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS;
    exports.TELEMETRYSDKLANGUAGEVALUES_PHP = TMP_TELEMETRYSDKLANGUAGEVALUES_PHP;
    exports.TELEMETRYSDKLANGUAGEVALUES_PYTHON = TMP_TELEMETRYSDKLANGUAGEVALUES_PYTHON;
    exports.TELEMETRYSDKLANGUAGEVALUES_RUBY = TMP_TELEMETRYSDKLANGUAGEVALUES_RUBY;
    exports.TELEMETRYSDKLANGUAGEVALUES_WEBJS = TMP_TELEMETRYSDKLANGUAGEVALUES_WEBJS;
    exports.TelemetrySdkLanguageValues = /* @__PURE__ */ (0, utils_1.createConstMap)([
      TMP_TELEMETRYSDKLANGUAGEVALUES_CPP,
      TMP_TELEMETRYSDKLANGUAGEVALUES_DOTNET,
      TMP_TELEMETRYSDKLANGUAGEVALUES_ERLANG,
      TMP_TELEMETRYSDKLANGUAGEVALUES_GO,
      TMP_TELEMETRYSDKLANGUAGEVALUES_JAVA,
      TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS,
      TMP_TELEMETRYSDKLANGUAGEVALUES_PHP,
      TMP_TELEMETRYSDKLANGUAGEVALUES_PYTHON,
      TMP_TELEMETRYSDKLANGUAGEVALUES_RUBY,
      TMP_TELEMETRYSDKLANGUAGEVALUES_WEBJS
    ]);
  }
});

// ../../node_modules/@opentelemetry/semantic-conventions/build/src/resource/index.js
var require_resource = __commonJS({
  "../../node_modules/@opentelemetry/semantic-conventions/build/src/resource/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_SemanticResourceAttributes(), exports);
  }
});

// ../../node_modules/@opentelemetry/semantic-conventions/build/src/stable_attributes.js
var require_stable_attributes = __commonJS({
  "../../node_modules/@opentelemetry/semantic-conventions/build/src/stable_attributes.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ATTR_EXCEPTION_TYPE = exports.ATTR_EXCEPTION_STACKTRACE = exports.ATTR_EXCEPTION_MESSAGE = exports.ATTR_EXCEPTION_ESCAPED = exports.ERROR_TYPE_VALUE_OTHER = exports.ATTR_ERROR_TYPE = exports.DOTNET_GC_HEAP_GENERATION_VALUE_POH = exports.DOTNET_GC_HEAP_GENERATION_VALUE_LOH = exports.DOTNET_GC_HEAP_GENERATION_VALUE_GEN2 = exports.DOTNET_GC_HEAP_GENERATION_VALUE_GEN1 = exports.DOTNET_GC_HEAP_GENERATION_VALUE_GEN0 = exports.ATTR_DOTNET_GC_HEAP_GENERATION = exports.DB_SYSTEM_NAME_VALUE_POSTGRESQL = exports.DB_SYSTEM_NAME_VALUE_MYSQL = exports.DB_SYSTEM_NAME_VALUE_MICROSOFT_SQL_SERVER = exports.DB_SYSTEM_NAME_VALUE_MARIADB = exports.ATTR_DB_SYSTEM_NAME = exports.ATTR_DB_STORED_PROCEDURE_NAME = exports.ATTR_DB_RESPONSE_STATUS_CODE = exports.ATTR_DB_QUERY_TEXT = exports.ATTR_DB_QUERY_SUMMARY = exports.ATTR_DB_OPERATION_NAME = exports.ATTR_DB_OPERATION_BATCH_SIZE = exports.ATTR_DB_NAMESPACE = exports.ATTR_DB_COLLECTION_NAME = exports.ATTR_CODE_STACKTRACE = exports.ATTR_CODE_LINE_NUMBER = exports.ATTR_CODE_FUNCTION_NAME = exports.ATTR_CODE_FILE_PATH = exports.ATTR_CODE_COLUMN_NUMBER = exports.ATTR_CLIENT_PORT = exports.ATTR_CLIENT_ADDRESS = exports.ATTR_ASPNETCORE_USER_IS_AUTHENTICATED = exports.ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_SUCCESS = exports.ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_FAILURE = exports.ATTR_ASPNETCORE_ROUTING_MATCH_STATUS = exports.ATTR_ASPNETCORE_ROUTING_IS_FALLBACK = exports.ATTR_ASPNETCORE_REQUEST_IS_UNHANDLED = exports.ASPNETCORE_RATE_LIMITING_RESULT_VALUE_REQUEST_CANCELED = exports.ASPNETCORE_RATE_LIMITING_RESULT_VALUE_GLOBAL_LIMITER = exports.ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ENDPOINT_LIMITER = exports.ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ACQUIRED = exports.ATTR_ASPNETCORE_RATE_LIMITING_RESULT = exports.ATTR_ASPNETCORE_RATE_LIMITING_POLICY = exports.ATTR_ASPNETCORE_DIAGNOSTICS_HANDLER_TYPE = exports.ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_UNHANDLED = exports.ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_SKIPPED = exports.ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_HANDLED = exports.ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_ABORTED = exports.ATTR_ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT = void 0;
    exports.OTEL_STATUS_CODE_VALUE_ERROR = exports.ATTR_OTEL_STATUS_CODE = exports.ATTR_OTEL_SCOPE_VERSION = exports.ATTR_OTEL_SCOPE_NAME = exports.NETWORK_TYPE_VALUE_IPV6 = exports.NETWORK_TYPE_VALUE_IPV4 = exports.ATTR_NETWORK_TYPE = exports.NETWORK_TRANSPORT_VALUE_UNIX = exports.NETWORK_TRANSPORT_VALUE_UDP = exports.NETWORK_TRANSPORT_VALUE_TCP = exports.NETWORK_TRANSPORT_VALUE_QUIC = exports.NETWORK_TRANSPORT_VALUE_PIPE = exports.ATTR_NETWORK_TRANSPORT = exports.ATTR_NETWORK_PROTOCOL_VERSION = exports.ATTR_NETWORK_PROTOCOL_NAME = exports.ATTR_NETWORK_PEER_PORT = exports.ATTR_NETWORK_PEER_ADDRESS = exports.ATTR_NETWORK_LOCAL_PORT = exports.ATTR_NETWORK_LOCAL_ADDRESS = exports.JVM_THREAD_STATE_VALUE_WAITING = exports.JVM_THREAD_STATE_VALUE_TIMED_WAITING = exports.JVM_THREAD_STATE_VALUE_TERMINATED = exports.JVM_THREAD_STATE_VALUE_RUNNABLE = exports.JVM_THREAD_STATE_VALUE_NEW = exports.JVM_THREAD_STATE_VALUE_BLOCKED = exports.ATTR_JVM_THREAD_STATE = exports.ATTR_JVM_THREAD_DAEMON = exports.JVM_MEMORY_TYPE_VALUE_NON_HEAP = exports.JVM_MEMORY_TYPE_VALUE_HEAP = exports.ATTR_JVM_MEMORY_TYPE = exports.ATTR_JVM_MEMORY_POOL_NAME = exports.ATTR_JVM_GC_NAME = exports.ATTR_JVM_GC_ACTION = exports.ATTR_HTTP_ROUTE = exports.ATTR_HTTP_RESPONSE_STATUS_CODE = exports.ATTR_HTTP_RESPONSE_HEADER = exports.ATTR_HTTP_REQUEST_RESEND_COUNT = exports.ATTR_HTTP_REQUEST_METHOD_ORIGINAL = exports.HTTP_REQUEST_METHOD_VALUE_TRACE = exports.HTTP_REQUEST_METHOD_VALUE_PUT = exports.HTTP_REQUEST_METHOD_VALUE_POST = exports.HTTP_REQUEST_METHOD_VALUE_PATCH = exports.HTTP_REQUEST_METHOD_VALUE_OPTIONS = exports.HTTP_REQUEST_METHOD_VALUE_HEAD = exports.HTTP_REQUEST_METHOD_VALUE_GET = exports.HTTP_REQUEST_METHOD_VALUE_DELETE = exports.HTTP_REQUEST_METHOD_VALUE_CONNECT = exports.HTTP_REQUEST_METHOD_VALUE_OTHER = exports.ATTR_HTTP_REQUEST_METHOD = exports.ATTR_HTTP_REQUEST_HEADER = void 0;
    exports.ATTR_USER_AGENT_ORIGINAL = exports.ATTR_URL_SCHEME = exports.ATTR_URL_QUERY = exports.ATTR_URL_PATH = exports.ATTR_URL_FULL = exports.ATTR_URL_FRAGMENT = exports.ATTR_TELEMETRY_SDK_VERSION = exports.ATTR_TELEMETRY_SDK_NAME = exports.TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS = exports.TELEMETRY_SDK_LANGUAGE_VALUE_SWIFT = exports.TELEMETRY_SDK_LANGUAGE_VALUE_RUST = exports.TELEMETRY_SDK_LANGUAGE_VALUE_RUBY = exports.TELEMETRY_SDK_LANGUAGE_VALUE_PYTHON = exports.TELEMETRY_SDK_LANGUAGE_VALUE_PHP = exports.TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS = exports.TELEMETRY_SDK_LANGUAGE_VALUE_JAVA = exports.TELEMETRY_SDK_LANGUAGE_VALUE_GO = exports.TELEMETRY_SDK_LANGUAGE_VALUE_ERLANG = exports.TELEMETRY_SDK_LANGUAGE_VALUE_DOTNET = exports.TELEMETRY_SDK_LANGUAGE_VALUE_CPP = exports.ATTR_TELEMETRY_SDK_LANGUAGE = exports.SIGNALR_TRANSPORT_VALUE_WEB_SOCKETS = exports.SIGNALR_TRANSPORT_VALUE_SERVER_SENT_EVENTS = exports.SIGNALR_TRANSPORT_VALUE_LONG_POLLING = exports.ATTR_SIGNALR_TRANSPORT = exports.SIGNALR_CONNECTION_STATUS_VALUE_TIMEOUT = exports.SIGNALR_CONNECTION_STATUS_VALUE_NORMAL_CLOSURE = exports.SIGNALR_CONNECTION_STATUS_VALUE_APP_SHUTDOWN = exports.ATTR_SIGNALR_CONNECTION_STATUS = exports.ATTR_SERVICE_VERSION = exports.ATTR_SERVICE_NAME = exports.ATTR_SERVER_PORT = exports.ATTR_SERVER_ADDRESS = exports.ATTR_OTEL_STATUS_DESCRIPTION = exports.OTEL_STATUS_CODE_VALUE_OK = void 0;
    exports.ATTR_ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT = "aspnetcore.diagnostics.exception.result";
    exports.ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_ABORTED = "aborted";
    exports.ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_HANDLED = "handled";
    exports.ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_SKIPPED = "skipped";
    exports.ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_UNHANDLED = "unhandled";
    exports.ATTR_ASPNETCORE_DIAGNOSTICS_HANDLER_TYPE = "aspnetcore.diagnostics.handler.type";
    exports.ATTR_ASPNETCORE_RATE_LIMITING_POLICY = "aspnetcore.rate_limiting.policy";
    exports.ATTR_ASPNETCORE_RATE_LIMITING_RESULT = "aspnetcore.rate_limiting.result";
    exports.ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ACQUIRED = "acquired";
    exports.ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ENDPOINT_LIMITER = "endpoint_limiter";
    exports.ASPNETCORE_RATE_LIMITING_RESULT_VALUE_GLOBAL_LIMITER = "global_limiter";
    exports.ASPNETCORE_RATE_LIMITING_RESULT_VALUE_REQUEST_CANCELED = "request_canceled";
    exports.ATTR_ASPNETCORE_REQUEST_IS_UNHANDLED = "aspnetcore.request.is_unhandled";
    exports.ATTR_ASPNETCORE_ROUTING_IS_FALLBACK = "aspnetcore.routing.is_fallback";
    exports.ATTR_ASPNETCORE_ROUTING_MATCH_STATUS = "aspnetcore.routing.match_status";
    exports.ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_FAILURE = "failure";
    exports.ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_SUCCESS = "success";
    exports.ATTR_ASPNETCORE_USER_IS_AUTHENTICATED = "aspnetcore.user.is_authenticated";
    exports.ATTR_CLIENT_ADDRESS = "client.address";
    exports.ATTR_CLIENT_PORT = "client.port";
    exports.ATTR_CODE_COLUMN_NUMBER = "code.column.number";
    exports.ATTR_CODE_FILE_PATH = "code.file.path";
    exports.ATTR_CODE_FUNCTION_NAME = "code.function.name";
    exports.ATTR_CODE_LINE_NUMBER = "code.line.number";
    exports.ATTR_CODE_STACKTRACE = "code.stacktrace";
    exports.ATTR_DB_COLLECTION_NAME = "db.collection.name";
    exports.ATTR_DB_NAMESPACE = "db.namespace";
    exports.ATTR_DB_OPERATION_BATCH_SIZE = "db.operation.batch.size";
    exports.ATTR_DB_OPERATION_NAME = "db.operation.name";
    exports.ATTR_DB_QUERY_SUMMARY = "db.query.summary";
    exports.ATTR_DB_QUERY_TEXT = "db.query.text";
    exports.ATTR_DB_RESPONSE_STATUS_CODE = "db.response.status_code";
    exports.ATTR_DB_STORED_PROCEDURE_NAME = "db.stored_procedure.name";
    exports.ATTR_DB_SYSTEM_NAME = "db.system.name";
    exports.DB_SYSTEM_NAME_VALUE_MARIADB = "mariadb";
    exports.DB_SYSTEM_NAME_VALUE_MICROSOFT_SQL_SERVER = "microsoft.sql_server";
    exports.DB_SYSTEM_NAME_VALUE_MYSQL = "mysql";
    exports.DB_SYSTEM_NAME_VALUE_POSTGRESQL = "postgresql";
    exports.ATTR_DOTNET_GC_HEAP_GENERATION = "dotnet.gc.heap.generation";
    exports.DOTNET_GC_HEAP_GENERATION_VALUE_GEN0 = "gen0";
    exports.DOTNET_GC_HEAP_GENERATION_VALUE_GEN1 = "gen1";
    exports.DOTNET_GC_HEAP_GENERATION_VALUE_GEN2 = "gen2";
    exports.DOTNET_GC_HEAP_GENERATION_VALUE_LOH = "loh";
    exports.DOTNET_GC_HEAP_GENERATION_VALUE_POH = "poh";
    exports.ATTR_ERROR_TYPE = "error.type";
    exports.ERROR_TYPE_VALUE_OTHER = "_OTHER";
    exports.ATTR_EXCEPTION_ESCAPED = "exception.escaped";
    exports.ATTR_EXCEPTION_MESSAGE = "exception.message";
    exports.ATTR_EXCEPTION_STACKTRACE = "exception.stacktrace";
    exports.ATTR_EXCEPTION_TYPE = "exception.type";
    var ATTR_HTTP_REQUEST_HEADER = /* @__PURE__ */ __name((key) => `http.request.header.${key}`, "ATTR_HTTP_REQUEST_HEADER");
    exports.ATTR_HTTP_REQUEST_HEADER = ATTR_HTTP_REQUEST_HEADER;
    exports.ATTR_HTTP_REQUEST_METHOD = "http.request.method";
    exports.HTTP_REQUEST_METHOD_VALUE_OTHER = "_OTHER";
    exports.HTTP_REQUEST_METHOD_VALUE_CONNECT = "CONNECT";
    exports.HTTP_REQUEST_METHOD_VALUE_DELETE = "DELETE";
    exports.HTTP_REQUEST_METHOD_VALUE_GET = "GET";
    exports.HTTP_REQUEST_METHOD_VALUE_HEAD = "HEAD";
    exports.HTTP_REQUEST_METHOD_VALUE_OPTIONS = "OPTIONS";
    exports.HTTP_REQUEST_METHOD_VALUE_PATCH = "PATCH";
    exports.HTTP_REQUEST_METHOD_VALUE_POST = "POST";
    exports.HTTP_REQUEST_METHOD_VALUE_PUT = "PUT";
    exports.HTTP_REQUEST_METHOD_VALUE_TRACE = "TRACE";
    exports.ATTR_HTTP_REQUEST_METHOD_ORIGINAL = "http.request.method_original";
    exports.ATTR_HTTP_REQUEST_RESEND_COUNT = "http.request.resend_count";
    var ATTR_HTTP_RESPONSE_HEADER = /* @__PURE__ */ __name((key) => `http.response.header.${key}`, "ATTR_HTTP_RESPONSE_HEADER");
    exports.ATTR_HTTP_RESPONSE_HEADER = ATTR_HTTP_RESPONSE_HEADER;
    exports.ATTR_HTTP_RESPONSE_STATUS_CODE = "http.response.status_code";
    exports.ATTR_HTTP_ROUTE = "http.route";
    exports.ATTR_JVM_GC_ACTION = "jvm.gc.action";
    exports.ATTR_JVM_GC_NAME = "jvm.gc.name";
    exports.ATTR_JVM_MEMORY_POOL_NAME = "jvm.memory.pool.name";
    exports.ATTR_JVM_MEMORY_TYPE = "jvm.memory.type";
    exports.JVM_MEMORY_TYPE_VALUE_HEAP = "heap";
    exports.JVM_MEMORY_TYPE_VALUE_NON_HEAP = "non_heap";
    exports.ATTR_JVM_THREAD_DAEMON = "jvm.thread.daemon";
    exports.ATTR_JVM_THREAD_STATE = "jvm.thread.state";
    exports.JVM_THREAD_STATE_VALUE_BLOCKED = "blocked";
    exports.JVM_THREAD_STATE_VALUE_NEW = "new";
    exports.JVM_THREAD_STATE_VALUE_RUNNABLE = "runnable";
    exports.JVM_THREAD_STATE_VALUE_TERMINATED = "terminated";
    exports.JVM_THREAD_STATE_VALUE_TIMED_WAITING = "timed_waiting";
    exports.JVM_THREAD_STATE_VALUE_WAITING = "waiting";
    exports.ATTR_NETWORK_LOCAL_ADDRESS = "network.local.address";
    exports.ATTR_NETWORK_LOCAL_PORT = "network.local.port";
    exports.ATTR_NETWORK_PEER_ADDRESS = "network.peer.address";
    exports.ATTR_NETWORK_PEER_PORT = "network.peer.port";
    exports.ATTR_NETWORK_PROTOCOL_NAME = "network.protocol.name";
    exports.ATTR_NETWORK_PROTOCOL_VERSION = "network.protocol.version";
    exports.ATTR_NETWORK_TRANSPORT = "network.transport";
    exports.NETWORK_TRANSPORT_VALUE_PIPE = "pipe";
    exports.NETWORK_TRANSPORT_VALUE_QUIC = "quic";
    exports.NETWORK_TRANSPORT_VALUE_TCP = "tcp";
    exports.NETWORK_TRANSPORT_VALUE_UDP = "udp";
    exports.NETWORK_TRANSPORT_VALUE_UNIX = "unix";
    exports.ATTR_NETWORK_TYPE = "network.type";
    exports.NETWORK_TYPE_VALUE_IPV4 = "ipv4";
    exports.NETWORK_TYPE_VALUE_IPV6 = "ipv6";
    exports.ATTR_OTEL_SCOPE_NAME = "otel.scope.name";
    exports.ATTR_OTEL_SCOPE_VERSION = "otel.scope.version";
    exports.ATTR_OTEL_STATUS_CODE = "otel.status_code";
    exports.OTEL_STATUS_CODE_VALUE_ERROR = "ERROR";
    exports.OTEL_STATUS_CODE_VALUE_OK = "OK";
    exports.ATTR_OTEL_STATUS_DESCRIPTION = "otel.status_description";
    exports.ATTR_SERVER_ADDRESS = "server.address";
    exports.ATTR_SERVER_PORT = "server.port";
    exports.ATTR_SERVICE_NAME = "service.name";
    exports.ATTR_SERVICE_VERSION = "service.version";
    exports.ATTR_SIGNALR_CONNECTION_STATUS = "signalr.connection.status";
    exports.SIGNALR_CONNECTION_STATUS_VALUE_APP_SHUTDOWN = "app_shutdown";
    exports.SIGNALR_CONNECTION_STATUS_VALUE_NORMAL_CLOSURE = "normal_closure";
    exports.SIGNALR_CONNECTION_STATUS_VALUE_TIMEOUT = "timeout";
    exports.ATTR_SIGNALR_TRANSPORT = "signalr.transport";
    exports.SIGNALR_TRANSPORT_VALUE_LONG_POLLING = "long_polling";
    exports.SIGNALR_TRANSPORT_VALUE_SERVER_SENT_EVENTS = "server_sent_events";
    exports.SIGNALR_TRANSPORT_VALUE_WEB_SOCKETS = "web_sockets";
    exports.ATTR_TELEMETRY_SDK_LANGUAGE = "telemetry.sdk.language";
    exports.TELEMETRY_SDK_LANGUAGE_VALUE_CPP = "cpp";
    exports.TELEMETRY_SDK_LANGUAGE_VALUE_DOTNET = "dotnet";
    exports.TELEMETRY_SDK_LANGUAGE_VALUE_ERLANG = "erlang";
    exports.TELEMETRY_SDK_LANGUAGE_VALUE_GO = "go";
    exports.TELEMETRY_SDK_LANGUAGE_VALUE_JAVA = "java";
    exports.TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS = "nodejs";
    exports.TELEMETRY_SDK_LANGUAGE_VALUE_PHP = "php";
    exports.TELEMETRY_SDK_LANGUAGE_VALUE_PYTHON = "python";
    exports.TELEMETRY_SDK_LANGUAGE_VALUE_RUBY = "ruby";
    exports.TELEMETRY_SDK_LANGUAGE_VALUE_RUST = "rust";
    exports.TELEMETRY_SDK_LANGUAGE_VALUE_SWIFT = "swift";
    exports.TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS = "webjs";
    exports.ATTR_TELEMETRY_SDK_NAME = "telemetry.sdk.name";
    exports.ATTR_TELEMETRY_SDK_VERSION = "telemetry.sdk.version";
    exports.ATTR_URL_FRAGMENT = "url.fragment";
    exports.ATTR_URL_FULL = "url.full";
    exports.ATTR_URL_PATH = "url.path";
    exports.ATTR_URL_QUERY = "url.query";
    exports.ATTR_URL_SCHEME = "url.scheme";
    exports.ATTR_USER_AGENT_ORIGINAL = "user_agent.original";
  }
});

// ../../node_modules/@opentelemetry/semantic-conventions/build/src/stable_metrics.js
var require_stable_metrics = __commonJS({
  "../../node_modules/@opentelemetry/semantic-conventions/build/src/stable_metrics.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.METRIC_SIGNALR_SERVER_ACTIVE_CONNECTIONS = exports.METRIC_KESTREL_UPGRADED_CONNECTIONS = exports.METRIC_KESTREL_TLS_HANDSHAKE_DURATION = exports.METRIC_KESTREL_REJECTED_CONNECTIONS = exports.METRIC_KESTREL_QUEUED_REQUESTS = exports.METRIC_KESTREL_QUEUED_CONNECTIONS = exports.METRIC_KESTREL_CONNECTION_DURATION = exports.METRIC_KESTREL_ACTIVE_TLS_HANDSHAKES = exports.METRIC_KESTREL_ACTIVE_CONNECTIONS = exports.METRIC_JVM_THREAD_COUNT = exports.METRIC_JVM_MEMORY_USED_AFTER_LAST_GC = exports.METRIC_JVM_MEMORY_USED = exports.METRIC_JVM_MEMORY_LIMIT = exports.METRIC_JVM_MEMORY_COMMITTED = exports.METRIC_JVM_GC_DURATION = exports.METRIC_JVM_CPU_TIME = exports.METRIC_JVM_CPU_RECENT_UTILIZATION = exports.METRIC_JVM_CPU_COUNT = exports.METRIC_JVM_CLASS_UNLOADED = exports.METRIC_JVM_CLASS_LOADED = exports.METRIC_JVM_CLASS_COUNT = exports.METRIC_HTTP_SERVER_REQUEST_DURATION = exports.METRIC_HTTP_CLIENT_REQUEST_DURATION = exports.METRIC_DOTNET_TIMER_COUNT = exports.METRIC_DOTNET_THREAD_POOL_WORK_ITEM_COUNT = exports.METRIC_DOTNET_THREAD_POOL_THREAD_COUNT = exports.METRIC_DOTNET_THREAD_POOL_QUEUE_LENGTH = exports.METRIC_DOTNET_PROCESS_MEMORY_WORKING_SET = exports.METRIC_DOTNET_PROCESS_CPU_TIME = exports.METRIC_DOTNET_PROCESS_CPU_COUNT = exports.METRIC_DOTNET_MONITOR_LOCK_CONTENTIONS = exports.METRIC_DOTNET_JIT_COMPILED_METHODS = exports.METRIC_DOTNET_JIT_COMPILED_IL_SIZE = exports.METRIC_DOTNET_JIT_COMPILATION_TIME = exports.METRIC_DOTNET_GC_PAUSE_TIME = exports.METRIC_DOTNET_GC_LAST_COLLECTION_MEMORY_COMMITTED_SIZE = exports.METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_SIZE = exports.METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_FRAGMENTATION_SIZE = exports.METRIC_DOTNET_GC_HEAP_TOTAL_ALLOCATED = exports.METRIC_DOTNET_GC_COLLECTIONS = exports.METRIC_DOTNET_EXCEPTIONS = exports.METRIC_DOTNET_ASSEMBLY_COUNT = exports.METRIC_DB_CLIENT_OPERATION_DURATION = exports.METRIC_ASPNETCORE_ROUTING_MATCH_ATTEMPTS = exports.METRIC_ASPNETCORE_RATE_LIMITING_REQUESTS = exports.METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_LEASE_DURATION = exports.METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_TIME_IN_QUEUE = exports.METRIC_ASPNETCORE_RATE_LIMITING_QUEUED_REQUESTS = exports.METRIC_ASPNETCORE_RATE_LIMITING_ACTIVE_REQUEST_LEASES = exports.METRIC_ASPNETCORE_DIAGNOSTICS_EXCEPTIONS = void 0;
    exports.METRIC_SIGNALR_SERVER_CONNECTION_DURATION = void 0;
    exports.METRIC_ASPNETCORE_DIAGNOSTICS_EXCEPTIONS = "aspnetcore.diagnostics.exceptions";
    exports.METRIC_ASPNETCORE_RATE_LIMITING_ACTIVE_REQUEST_LEASES = "aspnetcore.rate_limiting.active_request_leases";
    exports.METRIC_ASPNETCORE_RATE_LIMITING_QUEUED_REQUESTS = "aspnetcore.rate_limiting.queued_requests";
    exports.METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_TIME_IN_QUEUE = "aspnetcore.rate_limiting.request.time_in_queue";
    exports.METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_LEASE_DURATION = "aspnetcore.rate_limiting.request_lease.duration";
    exports.METRIC_ASPNETCORE_RATE_LIMITING_REQUESTS = "aspnetcore.rate_limiting.requests";
    exports.METRIC_ASPNETCORE_ROUTING_MATCH_ATTEMPTS = "aspnetcore.routing.match_attempts";
    exports.METRIC_DB_CLIENT_OPERATION_DURATION = "db.client.operation.duration";
    exports.METRIC_DOTNET_ASSEMBLY_COUNT = "dotnet.assembly.count";
    exports.METRIC_DOTNET_EXCEPTIONS = "dotnet.exceptions";
    exports.METRIC_DOTNET_GC_COLLECTIONS = "dotnet.gc.collections";
    exports.METRIC_DOTNET_GC_HEAP_TOTAL_ALLOCATED = "dotnet.gc.heap.total_allocated";
    exports.METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_FRAGMENTATION_SIZE = "dotnet.gc.last_collection.heap.fragmentation.size";
    exports.METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_SIZE = "dotnet.gc.last_collection.heap.size";
    exports.METRIC_DOTNET_GC_LAST_COLLECTION_MEMORY_COMMITTED_SIZE = "dotnet.gc.last_collection.memory.committed_size";
    exports.METRIC_DOTNET_GC_PAUSE_TIME = "dotnet.gc.pause.time";
    exports.METRIC_DOTNET_JIT_COMPILATION_TIME = "dotnet.jit.compilation.time";
    exports.METRIC_DOTNET_JIT_COMPILED_IL_SIZE = "dotnet.jit.compiled_il.size";
    exports.METRIC_DOTNET_JIT_COMPILED_METHODS = "dotnet.jit.compiled_methods";
    exports.METRIC_DOTNET_MONITOR_LOCK_CONTENTIONS = "dotnet.monitor.lock_contentions";
    exports.METRIC_DOTNET_PROCESS_CPU_COUNT = "dotnet.process.cpu.count";
    exports.METRIC_DOTNET_PROCESS_CPU_TIME = "dotnet.process.cpu.time";
    exports.METRIC_DOTNET_PROCESS_MEMORY_WORKING_SET = "dotnet.process.memory.working_set";
    exports.METRIC_DOTNET_THREAD_POOL_QUEUE_LENGTH = "dotnet.thread_pool.queue.length";
    exports.METRIC_DOTNET_THREAD_POOL_THREAD_COUNT = "dotnet.thread_pool.thread.count";
    exports.METRIC_DOTNET_THREAD_POOL_WORK_ITEM_COUNT = "dotnet.thread_pool.work_item.count";
    exports.METRIC_DOTNET_TIMER_COUNT = "dotnet.timer.count";
    exports.METRIC_HTTP_CLIENT_REQUEST_DURATION = "http.client.request.duration";
    exports.METRIC_HTTP_SERVER_REQUEST_DURATION = "http.server.request.duration";
    exports.METRIC_JVM_CLASS_COUNT = "jvm.class.count";
    exports.METRIC_JVM_CLASS_LOADED = "jvm.class.loaded";
    exports.METRIC_JVM_CLASS_UNLOADED = "jvm.class.unloaded";
    exports.METRIC_JVM_CPU_COUNT = "jvm.cpu.count";
    exports.METRIC_JVM_CPU_RECENT_UTILIZATION = "jvm.cpu.recent_utilization";
    exports.METRIC_JVM_CPU_TIME = "jvm.cpu.time";
    exports.METRIC_JVM_GC_DURATION = "jvm.gc.duration";
    exports.METRIC_JVM_MEMORY_COMMITTED = "jvm.memory.committed";
    exports.METRIC_JVM_MEMORY_LIMIT = "jvm.memory.limit";
    exports.METRIC_JVM_MEMORY_USED = "jvm.memory.used";
    exports.METRIC_JVM_MEMORY_USED_AFTER_LAST_GC = "jvm.memory.used_after_last_gc";
    exports.METRIC_JVM_THREAD_COUNT = "jvm.thread.count";
    exports.METRIC_KESTREL_ACTIVE_CONNECTIONS = "kestrel.active_connections";
    exports.METRIC_KESTREL_ACTIVE_TLS_HANDSHAKES = "kestrel.active_tls_handshakes";
    exports.METRIC_KESTREL_CONNECTION_DURATION = "kestrel.connection.duration";
    exports.METRIC_KESTREL_QUEUED_CONNECTIONS = "kestrel.queued_connections";
    exports.METRIC_KESTREL_QUEUED_REQUESTS = "kestrel.queued_requests";
    exports.METRIC_KESTREL_REJECTED_CONNECTIONS = "kestrel.rejected_connections";
    exports.METRIC_KESTREL_TLS_HANDSHAKE_DURATION = "kestrel.tls_handshake.duration";
    exports.METRIC_KESTREL_UPGRADED_CONNECTIONS = "kestrel.upgraded_connections";
    exports.METRIC_SIGNALR_SERVER_ACTIVE_CONNECTIONS = "signalr.server.active_connections";
    exports.METRIC_SIGNALR_SERVER_CONNECTION_DURATION = "signalr.server.connection.duration";
  }
});

// ../../node_modules/@opentelemetry/semantic-conventions/build/src/stable_events.js
var require_stable_events = __commonJS({
  "../../node_modules/@opentelemetry/semantic-conventions/build/src/stable_events.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EVENT_EXCEPTION = void 0;
    exports.EVENT_EXCEPTION = "exception";
  }
});

// ../../node_modules/@opentelemetry/semantic-conventions/build/src/index.js
var require_src2 = __commonJS({
  "../../node_modules/@opentelemetry/semantic-conventions/build/src/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_trace2(), exports);
    __exportStar(require_resource(), exports);
    __exportStar(require_stable_attributes(), exports);
    __exportStar(require_stable_metrics(), exports);
    __exportStar(require_stable_events(), exports);
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/build/src/OTLPExporterBase.js
var require_OTLPExporterBase = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/build/src/OTLPExporterBase.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OTLPExporterBase = void 0;
    var OTLPExporterBase = class {
      static {
        __name(this, "OTLPExporterBase");
      }
      _delegate;
      constructor(_delegate) {
        this._delegate = _delegate;
      }
      /**
       * Export items.
       * @param items
       * @param resultCallback
       */
      export(items, resultCallback) {
        this._delegate.export(items, resultCallback);
      }
      forceFlush() {
        return this._delegate.forceFlush();
      }
      shutdown() {
        return this._delegate.shutdown();
      }
    };
    exports.OTLPExporterBase = OTLPExporterBase;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/build/src/types.js
var require_types2 = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/build/src/types.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OTLPExporterError = void 0;
    var OTLPExporterError2 = class extends Error {
      static {
        __name(this, "OTLPExporterError");
      }
      code;
      name = "OTLPExporterError";
      data;
      constructor(message, code, data) {
        super(message);
        this.data = data;
        this.code = code;
      }
    };
    exports.OTLPExporterError = OTLPExporterError2;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/build/src/configuration/shared-configuration.js
var require_shared_configuration = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/build/src/configuration/shared-configuration.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSharedConfigurationDefaults = exports.mergeOtlpSharedConfigurationWithDefaults = exports.wrapStaticHeadersInFunction = exports.validateTimeoutMillis = void 0;
    function validateTimeoutMillis(timeoutMillis) {
      if (Number.isFinite(timeoutMillis) && timeoutMillis > 0) {
        return timeoutMillis;
      }
      throw new Error(`Configuration: timeoutMillis is invalid, expected number greater than 0 (actual: '${timeoutMillis}')`);
    }
    __name(validateTimeoutMillis, "validateTimeoutMillis");
    exports.validateTimeoutMillis = validateTimeoutMillis;
    function wrapStaticHeadersInFunction(headers) {
      if (headers == null) {
        return void 0;
      }
      return () => headers;
    }
    __name(wrapStaticHeadersInFunction, "wrapStaticHeadersInFunction");
    exports.wrapStaticHeadersInFunction = wrapStaticHeadersInFunction;
    function mergeOtlpSharedConfigurationWithDefaults(userProvidedConfiguration, fallbackConfiguration, defaultConfiguration) {
      return {
        timeoutMillis: validateTimeoutMillis(userProvidedConfiguration.timeoutMillis ?? fallbackConfiguration.timeoutMillis ?? defaultConfiguration.timeoutMillis),
        concurrencyLimit: userProvidedConfiguration.concurrencyLimit ?? fallbackConfiguration.concurrencyLimit ?? defaultConfiguration.concurrencyLimit,
        compression: userProvidedConfiguration.compression ?? fallbackConfiguration.compression ?? defaultConfiguration.compression
      };
    }
    __name(mergeOtlpSharedConfigurationWithDefaults, "mergeOtlpSharedConfigurationWithDefaults");
    exports.mergeOtlpSharedConfigurationWithDefaults = mergeOtlpSharedConfigurationWithDefaults;
    function getSharedConfigurationDefaults() {
      return {
        timeoutMillis: 1e4,
        concurrencyLimit: 30,
        compression: "none"
      };
    }
    __name(getSharedConfigurationDefaults, "getSharedConfigurationDefaults");
    exports.getSharedConfigurationDefaults = getSharedConfigurationDefaults;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/build/src/configuration/legacy-node-configuration.js
var require_legacy_node_configuration = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/build/src/configuration/legacy-node-configuration.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CompressionAlgorithm = void 0;
    var CompressionAlgorithm;
    (function(CompressionAlgorithm2) {
      CompressionAlgorithm2["NONE"] = "none";
      CompressionAlgorithm2["GZIP"] = "gzip";
    })(CompressionAlgorithm = exports.CompressionAlgorithm || (exports.CompressionAlgorithm = {}));
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/build/src/bounded-queue-export-promise-handler.js
var require_bounded_queue_export_promise_handler = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/build/src/bounded-queue-export-promise-handler.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createBoundedQueueExportPromiseHandler = void 0;
    var BoundedQueueExportPromiseHandler = class {
      static {
        __name(this, "BoundedQueueExportPromiseHandler");
      }
      _concurrencyLimit;
      _sendingPromises = [];
      /**
       * @param concurrencyLimit maximum promises allowed in a queue at the same time.
       */
      constructor(concurrencyLimit) {
        this._concurrencyLimit = concurrencyLimit;
      }
      pushPromise(promise) {
        if (this.hasReachedLimit()) {
          throw new Error("Concurrency Limit reached");
        }
        this._sendingPromises.push(promise);
        const popPromise = /* @__PURE__ */ __name(() => {
          const index = this._sendingPromises.indexOf(promise);
          this._sendingPromises.splice(index, 1);
        }, "popPromise");
        promise.then(popPromise, popPromise);
      }
      hasReachedLimit() {
        return this._sendingPromises.length >= this._concurrencyLimit;
      }
      async awaitAll() {
        await Promise.all(this._sendingPromises);
      }
    };
    function createBoundedQueueExportPromiseHandler(options) {
      return new BoundedQueueExportPromiseHandler(options.concurrencyLimit);
    }
    __name(createBoundedQueueExportPromiseHandler, "createBoundedQueueExportPromiseHandler");
    exports.createBoundedQueueExportPromiseHandler = createBoundedQueueExportPromiseHandler;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/trace/suppress-tracing.js
var require_suppress_tracing = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/trace/suppress-tracing.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isTracingSuppressed = exports.unsuppressTracing = exports.suppressTracing = void 0;
    var api_1 = require_src();
    var SUPPRESS_TRACING_KEY2 = (0, api_1.createContextKey)("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
    function suppressTracing(context3) {
      return context3.setValue(SUPPRESS_TRACING_KEY2, true);
    }
    __name(suppressTracing, "suppressTracing");
    exports.suppressTracing = suppressTracing;
    function unsuppressTracing(context3) {
      return context3.deleteValue(SUPPRESS_TRACING_KEY2);
    }
    __name(unsuppressTracing, "unsuppressTracing");
    exports.unsuppressTracing = unsuppressTracing;
    function isTracingSuppressed2(context3) {
      return context3.getValue(SUPPRESS_TRACING_KEY2) === true;
    }
    __name(isTracingSuppressed2, "isTracingSuppressed");
    exports.isTracingSuppressed = isTracingSuppressed2;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/baggage/constants.js
var require_constants = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/baggage/constants.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BAGGAGE_MAX_TOTAL_LENGTH = exports.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = exports.BAGGAGE_MAX_NAME_VALUE_PAIRS = exports.BAGGAGE_HEADER = exports.BAGGAGE_ITEMS_SEPARATOR = exports.BAGGAGE_PROPERTIES_SEPARATOR = exports.BAGGAGE_KEY_PAIR_SEPARATOR = void 0;
    exports.BAGGAGE_KEY_PAIR_SEPARATOR = "=";
    exports.BAGGAGE_PROPERTIES_SEPARATOR = ";";
    exports.BAGGAGE_ITEMS_SEPARATOR = ",";
    exports.BAGGAGE_HEADER = "baggage";
    exports.BAGGAGE_MAX_NAME_VALUE_PAIRS = 180;
    exports.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = 4096;
    exports.BAGGAGE_MAX_TOTAL_LENGTH = 8192;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/baggage/utils.js
var require_utils4 = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/baggage/utils.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseKeyPairsIntoRecord = exports.parsePairKeyValue = exports.getKeyPairs = exports.serializeKeyPairs = void 0;
    var api_1 = require_src();
    var constants_1 = require_constants();
    function serializeKeyPairs(keyPairs) {
      return keyPairs.reduce((hValue, current) => {
        const value = `${hValue}${hValue !== "" ? constants_1.BAGGAGE_ITEMS_SEPARATOR : ""}${current}`;
        return value.length > constants_1.BAGGAGE_MAX_TOTAL_LENGTH ? hValue : value;
      }, "");
    }
    __name(serializeKeyPairs, "serializeKeyPairs");
    exports.serializeKeyPairs = serializeKeyPairs;
    function getKeyPairs(baggage) {
      return baggage.getAllEntries().map(([key, value]) => {
        let entry = `${encodeURIComponent(key)}=${encodeURIComponent(value.value)}`;
        if (value.metadata !== void 0) {
          entry += constants_1.BAGGAGE_PROPERTIES_SEPARATOR + value.metadata.toString();
        }
        return entry;
      });
    }
    __name(getKeyPairs, "getKeyPairs");
    exports.getKeyPairs = getKeyPairs;
    function parsePairKeyValue(entry) {
      const valueProps = entry.split(constants_1.BAGGAGE_PROPERTIES_SEPARATOR);
      if (valueProps.length <= 0)
        return;
      const keyPairPart = valueProps.shift();
      if (!keyPairPart)
        return;
      const separatorIndex = keyPairPart.indexOf(constants_1.BAGGAGE_KEY_PAIR_SEPARATOR);
      if (separatorIndex <= 0)
        return;
      const key = decodeURIComponent(keyPairPart.substring(0, separatorIndex).trim());
      const value = decodeURIComponent(keyPairPart.substring(separatorIndex + 1).trim());
      let metadata;
      if (valueProps.length > 0) {
        metadata = (0, api_1.baggageEntryMetadataFromString)(valueProps.join(constants_1.BAGGAGE_PROPERTIES_SEPARATOR));
      }
      return { key, value, metadata };
    }
    __name(parsePairKeyValue, "parsePairKeyValue");
    exports.parsePairKeyValue = parsePairKeyValue;
    function parseKeyPairsIntoRecord(value) {
      if (typeof value !== "string" || value.length === 0)
        return {};
      return value.split(constants_1.BAGGAGE_ITEMS_SEPARATOR).map((entry) => {
        return parsePairKeyValue(entry);
      }).filter((keyPair) => keyPair !== void 0 && keyPair.value.length > 0).reduce((headers, keyPair) => {
        headers[keyPair.key] = keyPair.value;
        return headers;
      }, {});
    }
    __name(parseKeyPairsIntoRecord, "parseKeyPairsIntoRecord");
    exports.parseKeyPairsIntoRecord = parseKeyPairsIntoRecord;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/baggage/propagation/W3CBaggagePropagator.js
var require_W3CBaggagePropagator = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/baggage/propagation/W3CBaggagePropagator.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.W3CBaggagePropagator = void 0;
    var api_1 = require_src();
    var suppress_tracing_1 = require_suppress_tracing();
    var constants_1 = require_constants();
    var utils_1 = require_utils4();
    var W3CBaggagePropagator = class {
      static {
        __name(this, "W3CBaggagePropagator");
      }
      inject(context3, carrier, setter) {
        const baggage = api_1.propagation.getBaggage(context3);
        if (!baggage || (0, suppress_tracing_1.isTracingSuppressed)(context3))
          return;
        const keyPairs = (0, utils_1.getKeyPairs)(baggage).filter((pair) => {
          return pair.length <= constants_1.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS;
        }).slice(0, constants_1.BAGGAGE_MAX_NAME_VALUE_PAIRS);
        const headerValue = (0, utils_1.serializeKeyPairs)(keyPairs);
        if (headerValue.length > 0) {
          setter.set(carrier, constants_1.BAGGAGE_HEADER, headerValue);
        }
      }
      extract(context3, carrier, getter) {
        const headerValue = getter.get(carrier, constants_1.BAGGAGE_HEADER);
        const baggageString = Array.isArray(headerValue) ? headerValue.join(constants_1.BAGGAGE_ITEMS_SEPARATOR) : headerValue;
        if (!baggageString)
          return context3;
        const baggage = {};
        if (baggageString.length === 0) {
          return context3;
        }
        const pairs = baggageString.split(constants_1.BAGGAGE_ITEMS_SEPARATOR);
        pairs.forEach((entry) => {
          const keyPair = (0, utils_1.parsePairKeyValue)(entry);
          if (keyPair) {
            const baggageEntry = { value: keyPair.value };
            if (keyPair.metadata) {
              baggageEntry.metadata = keyPair.metadata;
            }
            baggage[keyPair.key] = baggageEntry;
          }
        });
        if (Object.entries(baggage).length === 0) {
          return context3;
        }
        return api_1.propagation.setBaggage(context3, api_1.propagation.createBaggage(baggage));
      }
      fields() {
        return [constants_1.BAGGAGE_HEADER];
      }
    };
    exports.W3CBaggagePropagator = W3CBaggagePropagator;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/common/anchored-clock.js
var require_anchored_clock = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/common/anchored-clock.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AnchoredClock = void 0;
    var AnchoredClock = class {
      static {
        __name(this, "AnchoredClock");
      }
      _monotonicClock;
      _epochMillis;
      _performanceMillis;
      /**
       * Create a new AnchoredClock anchored to the current time returned by systemClock.
       *
       * @param systemClock should be a clock that returns the number of milliseconds since January 1 1970 such as Date
       * @param monotonicClock should be a clock that counts milliseconds monotonically such as window.performance or perf_hooks.performance
       */
      constructor(systemClock, monotonicClock) {
        this._monotonicClock = monotonicClock;
        this._epochMillis = systemClock.now();
        this._performanceMillis = monotonicClock.now();
      }
      /**
       * Returns the current time by adding the number of milliseconds since the
       * AnchoredClock was created to the creation epoch time
       */
      now() {
        const delta = this._monotonicClock.now() - this._performanceMillis;
        return this._epochMillis + delta;
      }
    };
    exports.AnchoredClock = AnchoredClock;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/common/attributes.js
var require_attributes = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/common/attributes.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isAttributeValue = exports.isAttributeKey = exports.sanitizeAttributes = void 0;
    var api_1 = require_src();
    function sanitizeAttributes2(attributes) {
      const out = {};
      if (typeof attributes !== "object" || attributes == null) {
        return out;
      }
      for (const [key, val] of Object.entries(attributes)) {
        if (!isAttributeKey3(key)) {
          api_1.diag.warn(`Invalid attribute key: ${key}`);
          continue;
        }
        if (!isAttributeValue2(val)) {
          api_1.diag.warn(`Invalid attribute value set for key: ${key}`);
          continue;
        }
        if (Array.isArray(val)) {
          out[key] = val.slice();
        } else {
          out[key] = val;
        }
      }
      return out;
    }
    __name(sanitizeAttributes2, "sanitizeAttributes");
    exports.sanitizeAttributes = sanitizeAttributes2;
    function isAttributeKey3(key) {
      return typeof key === "string" && key.length > 0;
    }
    __name(isAttributeKey3, "isAttributeKey");
    exports.isAttributeKey = isAttributeKey3;
    function isAttributeValue2(val) {
      if (val == null) {
        return true;
      }
      if (Array.isArray(val)) {
        return isHomogeneousAttributeValueArray2(val);
      }
      return isValidPrimitiveAttributeValue(val);
    }
    __name(isAttributeValue2, "isAttributeValue");
    exports.isAttributeValue = isAttributeValue2;
    function isHomogeneousAttributeValueArray2(arr) {
      let type;
      for (const element of arr) {
        if (element == null)
          continue;
        if (!type) {
          if (isValidPrimitiveAttributeValue(element)) {
            type = typeof element;
            continue;
          }
          return false;
        }
        if (typeof element === type) {
          continue;
        }
        return false;
      }
      return true;
    }
    __name(isHomogeneousAttributeValueArray2, "isHomogeneousAttributeValueArray");
    function isValidPrimitiveAttributeValue(val) {
      switch (typeof val) {
        case "number":
        case "boolean":
        case "string":
          return true;
      }
      return false;
    }
    __name(isValidPrimitiveAttributeValue, "isValidPrimitiveAttributeValue");
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/common/logging-error-handler.js
var require_logging_error_handler = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/common/logging-error-handler.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loggingErrorHandler = void 0;
    var api_1 = require_src();
    function loggingErrorHandler2() {
      return (ex) => {
        api_1.diag.error(stringifyException2(ex));
      };
    }
    __name(loggingErrorHandler2, "loggingErrorHandler");
    exports.loggingErrorHandler = loggingErrorHandler2;
    function stringifyException2(ex) {
      if (typeof ex === "string") {
        return ex;
      } else {
        return JSON.stringify(flattenException2(ex));
      }
    }
    __name(stringifyException2, "stringifyException");
    function flattenException2(ex) {
      const result = {};
      let current = ex;
      while (current !== null) {
        Object.getOwnPropertyNames(current).forEach((propertyName) => {
          if (result[propertyName])
            return;
          const value = current[propertyName];
          if (value) {
            result[propertyName] = String(value);
          }
        });
        current = Object.getPrototypeOf(current);
      }
      return result;
    }
    __name(flattenException2, "flattenException");
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/common/global-error-handler.js
var require_global_error_handler = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/common/global-error-handler.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.globalErrorHandler = exports.setGlobalErrorHandler = void 0;
    var logging_error_handler_1 = require_logging_error_handler();
    var delegateHandler2 = (0, logging_error_handler_1.loggingErrorHandler)();
    function setGlobalErrorHandler2(handler2) {
      delegateHandler2 = handler2;
    }
    __name(setGlobalErrorHandler2, "setGlobalErrorHandler");
    exports.setGlobalErrorHandler = setGlobalErrorHandler2;
    function globalErrorHandler2(ex) {
      try {
        delegateHandler2(ex);
      } catch {
      }
    }
    __name(globalErrorHandler2, "globalErrorHandler");
    exports.globalErrorHandler = globalErrorHandler2;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/platform/browser/environment.js
var require_environment = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/platform/browser/environment.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getStringListFromEnv = exports.getNumberFromEnv = exports.getBooleanFromEnv = exports.getStringFromEnv = void 0;
    function getStringFromEnv(_) {
      return void 0;
    }
    __name(getStringFromEnv, "getStringFromEnv");
    exports.getStringFromEnv = getStringFromEnv;
    function getBooleanFromEnv(_) {
      return void 0;
    }
    __name(getBooleanFromEnv, "getBooleanFromEnv");
    exports.getBooleanFromEnv = getBooleanFromEnv;
    function getNumberFromEnv(_) {
      return void 0;
    }
    __name(getNumberFromEnv, "getNumberFromEnv");
    exports.getNumberFromEnv = getNumberFromEnv;
    function getStringListFromEnv(_) {
      return void 0;
    }
    __name(getStringListFromEnv, "getStringListFromEnv");
    exports.getStringListFromEnv = getStringListFromEnv;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/platform/browser/globalThis.js
var require_globalThis2 = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/platform/browser/globalThis.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._globalThis = void 0;
    exports._globalThis = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof window === "object" ? window : typeof global === "object" ? global : {};
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/platform/browser/performance.js
var require_performance = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/platform/browser/performance.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.otperformance = void 0;
    exports.otperformance = performance;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/version.js
var require_version2 = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/version.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VERSION = void 0;
    exports.VERSION = "2.0.0";
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/platform/browser/sdk-info.js
var require_sdk_info = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/platform/browser/sdk-info.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SDK_INFO = void 0;
    var version_1 = require_version2();
    var semantic_conventions_1 = require_src2();
    exports.SDK_INFO = {
      [semantic_conventions_1.SEMRESATTRS_TELEMETRY_SDK_NAME]: "opentelemetry",
      [semantic_conventions_1.SEMRESATTRS_PROCESS_RUNTIME_NAME]: "browser",
      [semantic_conventions_1.SEMRESATTRS_TELEMETRY_SDK_LANGUAGE]: semantic_conventions_1.TELEMETRYSDKLANGUAGEVALUES_WEBJS,
      [semantic_conventions_1.SEMRESATTRS_TELEMETRY_SDK_VERSION]: version_1.VERSION
    };
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/platform/browser/timer-util.js
var require_timer_util = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/platform/browser/timer-util.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unrefTimer = void 0;
    function unrefTimer(_timer) {
    }
    __name(unrefTimer, "unrefTimer");
    exports.unrefTimer = unrefTimer;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/platform/browser/index.js
var require_browser2 = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/platform/browser/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unrefTimer = exports.SDK_INFO = exports.otperformance = exports._globalThis = exports.getStringListFromEnv = exports.getNumberFromEnv = exports.getBooleanFromEnv = exports.getStringFromEnv = void 0;
    var environment_1 = require_environment();
    Object.defineProperty(exports, "getStringFromEnv", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return environment_1.getStringFromEnv;
    }, "get") });
    Object.defineProperty(exports, "getBooleanFromEnv", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return environment_1.getBooleanFromEnv;
    }, "get") });
    Object.defineProperty(exports, "getNumberFromEnv", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return environment_1.getNumberFromEnv;
    }, "get") });
    Object.defineProperty(exports, "getStringListFromEnv", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return environment_1.getStringListFromEnv;
    }, "get") });
    var globalThis_1 = require_globalThis2();
    Object.defineProperty(exports, "_globalThis", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return globalThis_1._globalThis;
    }, "get") });
    var performance_1 = require_performance();
    Object.defineProperty(exports, "otperformance", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return performance_1.otperformance;
    }, "get") });
    var sdk_info_1 = require_sdk_info();
    Object.defineProperty(exports, "SDK_INFO", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return sdk_info_1.SDK_INFO;
    }, "get") });
    var timer_util_1 = require_timer_util();
    Object.defineProperty(exports, "unrefTimer", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return timer_util_1.unrefTimer;
    }, "get") });
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/common/time.js
var require_time = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/common/time.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addHrTimes = exports.isTimeInput = exports.isTimeInputHrTime = exports.hrTimeToMicroseconds = exports.hrTimeToMilliseconds = exports.hrTimeToNanoseconds = exports.hrTimeToTimeStamp = exports.hrTimeDuration = exports.timeInputToHrTime = exports.hrTime = exports.getTimeOrigin = exports.millisToHrTime = void 0;
    var platform_1 = require_browser2();
    var NANOSECOND_DIGITS3 = 9;
    var NANOSECOND_DIGITS_IN_MILLIS3 = 6;
    var MILLISECONDS_TO_NANOSECONDS3 = Math.pow(10, NANOSECOND_DIGITS_IN_MILLIS3);
    var SECOND_TO_NANOSECONDS3 = Math.pow(10, NANOSECOND_DIGITS3);
    function millisToHrTime3(epochMillis) {
      const epochSeconds = epochMillis / 1e3;
      const seconds = Math.trunc(epochSeconds);
      const nanos = Math.round(epochMillis % 1e3 * MILLISECONDS_TO_NANOSECONDS3);
      return [seconds, nanos];
    }
    __name(millisToHrTime3, "millisToHrTime");
    exports.millisToHrTime = millisToHrTime3;
    function getTimeOrigin3() {
      let timeOrigin = platform_1.otperformance.timeOrigin;
      if (typeof timeOrigin !== "number") {
        const perf = platform_1.otperformance;
        timeOrigin = perf.timing && perf.timing.fetchStart;
      }
      return timeOrigin;
    }
    __name(getTimeOrigin3, "getTimeOrigin");
    exports.getTimeOrigin = getTimeOrigin3;
    function hrTime3(performanceNow) {
      const timeOrigin = millisToHrTime3(getTimeOrigin3());
      const now = millisToHrTime3(typeof performanceNow === "number" ? performanceNow : platform_1.otperformance.now());
      return addHrTimes3(timeOrigin, now);
    }
    __name(hrTime3, "hrTime");
    exports.hrTime = hrTime3;
    function timeInputToHrTime3(time) {
      if (isTimeInputHrTime3(time)) {
        return time;
      } else if (typeof time === "number") {
        if (time < getTimeOrigin3()) {
          return hrTime3(time);
        } else {
          return millisToHrTime3(time);
        }
      } else if (time instanceof Date) {
        return millisToHrTime3(time.getTime());
      } else {
        throw TypeError("Invalid input type");
      }
    }
    __name(timeInputToHrTime3, "timeInputToHrTime");
    exports.timeInputToHrTime = timeInputToHrTime3;
    function hrTimeDuration3(startTime, endTime) {
      let seconds = endTime[0] - startTime[0];
      let nanos = endTime[1] - startTime[1];
      if (nanos < 0) {
        seconds -= 1;
        nanos += SECOND_TO_NANOSECONDS3;
      }
      return [seconds, nanos];
    }
    __name(hrTimeDuration3, "hrTimeDuration");
    exports.hrTimeDuration = hrTimeDuration3;
    function hrTimeToTimeStamp3(time) {
      const precision = NANOSECOND_DIGITS3;
      const tmp = `${"0".repeat(precision)}${time[1]}Z`;
      const nanoString = tmp.substring(tmp.length - precision - 1);
      const date = new Date(time[0] * 1e3).toISOString();
      return date.replace("000Z", nanoString);
    }
    __name(hrTimeToTimeStamp3, "hrTimeToTimeStamp");
    exports.hrTimeToTimeStamp = hrTimeToTimeStamp3;
    function hrTimeToNanoseconds3(time) {
      return time[0] * SECOND_TO_NANOSECONDS3 + time[1];
    }
    __name(hrTimeToNanoseconds3, "hrTimeToNanoseconds");
    exports.hrTimeToNanoseconds = hrTimeToNanoseconds3;
    function hrTimeToMilliseconds3(time) {
      return time[0] * 1e3 + time[1] / 1e6;
    }
    __name(hrTimeToMilliseconds3, "hrTimeToMilliseconds");
    exports.hrTimeToMilliseconds = hrTimeToMilliseconds3;
    function hrTimeToMicroseconds3(time) {
      return time[0] * 1e6 + time[1] / 1e3;
    }
    __name(hrTimeToMicroseconds3, "hrTimeToMicroseconds");
    exports.hrTimeToMicroseconds = hrTimeToMicroseconds3;
    function isTimeInputHrTime3(value) {
      return Array.isArray(value) && value.length === 2 && typeof value[0] === "number" && typeof value[1] === "number";
    }
    __name(isTimeInputHrTime3, "isTimeInputHrTime");
    exports.isTimeInputHrTime = isTimeInputHrTime3;
    function isTimeInput3(value) {
      return isTimeInputHrTime3(value) || typeof value === "number" || value instanceof Date;
    }
    __name(isTimeInput3, "isTimeInput");
    exports.isTimeInput = isTimeInput3;
    function addHrTimes3(time1, time2) {
      const out = [time1[0] + time2[0], time1[1] + time2[1]];
      if (out[1] >= SECOND_TO_NANOSECONDS3) {
        out[1] -= SECOND_TO_NANOSECONDS3;
        out[0] += 1;
      }
      return out;
    }
    __name(addHrTimes3, "addHrTimes");
    exports.addHrTimes = addHrTimes3;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/ExportResult.js
var require_ExportResult = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/ExportResult.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExportResultCode = void 0;
    var ExportResultCode2;
    (function(ExportResultCode3) {
      ExportResultCode3[ExportResultCode3["SUCCESS"] = 0] = "SUCCESS";
      ExportResultCode3[ExportResultCode3["FAILED"] = 1] = "FAILED";
    })(ExportResultCode2 = exports.ExportResultCode || (exports.ExportResultCode = {}));
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/propagation/composite.js
var require_composite = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/propagation/composite.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CompositePropagator = void 0;
    var api_1 = require_src();
    var CompositePropagator = class {
      static {
        __name(this, "CompositePropagator");
      }
      _propagators;
      _fields;
      /**
       * Construct a composite propagator from a list of propagators.
       *
       * @param [config] Configuration object for composite propagator
       */
      constructor(config2 = {}) {
        this._propagators = config2.propagators ?? [];
        this._fields = Array.from(new Set(this._propagators.map((p) => typeof p.fields === "function" ? p.fields() : []).reduce((x, y) => x.concat(y), [])));
      }
      /**
       * Run each of the configured propagators with the given context and carrier.
       * Propagators are run in the order they are configured, so if multiple
       * propagators write the same carrier key, the propagator later in the list
       * will "win".
       *
       * @param context Context to inject
       * @param carrier Carrier into which context will be injected
       */
      inject(context3, carrier, setter) {
        for (const propagator of this._propagators) {
          try {
            propagator.inject(context3, carrier, setter);
          } catch (err) {
            api_1.diag.warn(`Failed to inject with ${propagator.constructor.name}. Err: ${err.message}`);
          }
        }
      }
      /**
       * Run each of the configured propagators with the given context and carrier.
       * Propagators are run in the order they are configured, so if multiple
       * propagators write the same context key, the propagator later in the list
       * will "win".
       *
       * @param context Context to add values to
       * @param carrier Carrier from which to extract context
       */
      extract(context3, carrier, getter) {
        return this._propagators.reduce((ctx, propagator) => {
          try {
            return propagator.extract(ctx, carrier, getter);
          } catch (err) {
            api_1.diag.warn(`Failed to extract with ${propagator.constructor.name}. Err: ${err.message}`);
          }
          return ctx;
        }, context3);
      }
      fields() {
        return this._fields.slice();
      }
    };
    exports.CompositePropagator = CompositePropagator;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/internal/validators.js
var require_validators = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/internal/validators.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateValue = exports.validateKey = void 0;
    var VALID_KEY_CHAR_RANGE2 = "[_0-9a-z-*/]";
    var VALID_KEY2 = `[a-z]${VALID_KEY_CHAR_RANGE2}{0,255}`;
    var VALID_VENDOR_KEY2 = `[a-z0-9]${VALID_KEY_CHAR_RANGE2}{0,240}@[a-z]${VALID_KEY_CHAR_RANGE2}{0,13}`;
    var VALID_KEY_REGEX2 = new RegExp(`^(?:${VALID_KEY2}|${VALID_VENDOR_KEY2})$`);
    var VALID_VALUE_BASE_REGEX2 = /^[ -~]{0,255}[!-~]$/;
    var INVALID_VALUE_COMMA_EQUAL_REGEX2 = /,|=/;
    function validateKey2(key) {
      return VALID_KEY_REGEX2.test(key);
    }
    __name(validateKey2, "validateKey");
    exports.validateKey = validateKey2;
    function validateValue2(value) {
      return VALID_VALUE_BASE_REGEX2.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX2.test(value);
    }
    __name(validateValue2, "validateValue");
    exports.validateValue = validateValue2;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/trace/TraceState.js
var require_TraceState = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/trace/TraceState.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TraceState = void 0;
    var validators_1 = require_validators();
    var MAX_TRACE_STATE_ITEMS2 = 32;
    var MAX_TRACE_STATE_LEN2 = 512;
    var LIST_MEMBERS_SEPARATOR2 = ",";
    var LIST_MEMBER_KEY_VALUE_SPLITTER2 = "=";
    var TraceState3 = class _TraceState {
      static {
        __name(this, "TraceState");
      }
      _internalState = /* @__PURE__ */ new Map();
      constructor(rawTraceState) {
        if (rawTraceState)
          this._parse(rawTraceState);
      }
      set(key, value) {
        const traceState = this._clone();
        if (traceState._internalState.has(key)) {
          traceState._internalState.delete(key);
        }
        traceState._internalState.set(key, value);
        return traceState;
      }
      unset(key) {
        const traceState = this._clone();
        traceState._internalState.delete(key);
        return traceState;
      }
      get(key) {
        return this._internalState.get(key);
      }
      serialize() {
        return this._keys().reduce((agg, key) => {
          agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER2 + this.get(key));
          return agg;
        }, []).join(LIST_MEMBERS_SEPARATOR2);
      }
      _parse(rawTraceState) {
        if (rawTraceState.length > MAX_TRACE_STATE_LEN2)
          return;
        this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR2).reverse().reduce((agg, part) => {
          const listMember = part.trim();
          const i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER2);
          if (i !== -1) {
            const key = listMember.slice(0, i);
            const value = listMember.slice(i + 1, part.length);
            if ((0, validators_1.validateKey)(key) && (0, validators_1.validateValue)(value)) {
              agg.set(key, value);
            } else {
            }
          }
          return agg;
        }, /* @__PURE__ */ new Map());
        if (this._internalState.size > MAX_TRACE_STATE_ITEMS2) {
          this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, MAX_TRACE_STATE_ITEMS2));
        }
      }
      _keys() {
        return Array.from(this._internalState.keys()).reverse();
      }
      _clone() {
        const traceState = new _TraceState();
        traceState._internalState = new Map(this._internalState);
        return traceState;
      }
    };
    exports.TraceState = TraceState3;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/trace/W3CTraceContextPropagator.js
var require_W3CTraceContextPropagator = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/trace/W3CTraceContextPropagator.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.W3CTraceContextPropagator = exports.parseTraceParent = exports.TRACE_STATE_HEADER = exports.TRACE_PARENT_HEADER = void 0;
    var api_1 = require_src();
    var suppress_tracing_1 = require_suppress_tracing();
    var TraceState_1 = require_TraceState();
    exports.TRACE_PARENT_HEADER = "traceparent";
    exports.TRACE_STATE_HEADER = "tracestate";
    var VERSION2 = "00";
    var VERSION_PART2 = "(?!ff)[\\da-f]{2}";
    var TRACE_ID_PART2 = "(?![0]{32})[\\da-f]{32}";
    var PARENT_ID_PART2 = "(?![0]{16})[\\da-f]{16}";
    var FLAGS_PART2 = "[\\da-f]{2}";
    var TRACE_PARENT_REGEX2 = new RegExp(`^\\s?(${VERSION_PART2})-(${TRACE_ID_PART2})-(${PARENT_ID_PART2})-(${FLAGS_PART2})(-.*)?\\s?$`);
    function parseTraceParent2(traceParent) {
      const match2 = TRACE_PARENT_REGEX2.exec(traceParent);
      if (!match2)
        return null;
      if (match2[1] === "00" && match2[5])
        return null;
      return {
        traceId: match2[2],
        spanId: match2[3],
        traceFlags: parseInt(match2[4], 16)
      };
    }
    __name(parseTraceParent2, "parseTraceParent");
    exports.parseTraceParent = parseTraceParent2;
    var W3CTraceContextPropagator2 = class {
      static {
        __name(this, "W3CTraceContextPropagator");
      }
      inject(context3, carrier, setter) {
        const spanContext = api_1.trace.getSpanContext(context3);
        if (!spanContext || (0, suppress_tracing_1.isTracingSuppressed)(context3) || !(0, api_1.isSpanContextValid)(spanContext))
          return;
        const traceParent = `${VERSION2}-${spanContext.traceId}-${spanContext.spanId}-0${Number(spanContext.traceFlags || api_1.TraceFlags.NONE).toString(16)}`;
        setter.set(carrier, exports.TRACE_PARENT_HEADER, traceParent);
        if (spanContext.traceState) {
          setter.set(carrier, exports.TRACE_STATE_HEADER, spanContext.traceState.serialize());
        }
      }
      extract(context3, carrier, getter) {
        const traceParentHeader = getter.get(carrier, exports.TRACE_PARENT_HEADER);
        if (!traceParentHeader)
          return context3;
        const traceParent = Array.isArray(traceParentHeader) ? traceParentHeader[0] : traceParentHeader;
        if (typeof traceParent !== "string")
          return context3;
        const spanContext = parseTraceParent2(traceParent);
        if (!spanContext)
          return context3;
        spanContext.isRemote = true;
        const traceStateHeader = getter.get(carrier, exports.TRACE_STATE_HEADER);
        if (traceStateHeader) {
          const state = Array.isArray(traceStateHeader) ? traceStateHeader.join(",") : traceStateHeader;
          spanContext.traceState = new TraceState_1.TraceState(typeof state === "string" ? state : void 0);
        }
        return api_1.trace.setSpanContext(context3, spanContext);
      }
      fields() {
        return [exports.TRACE_PARENT_HEADER, exports.TRACE_STATE_HEADER];
      }
    };
    exports.W3CTraceContextPropagator = W3CTraceContextPropagator2;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/trace/rpc-metadata.js
var require_rpc_metadata = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/trace/rpc-metadata.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRPCMetadata = exports.deleteRPCMetadata = exports.setRPCMetadata = exports.RPCType = void 0;
    var api_1 = require_src();
    var RPC_METADATA_KEY = (0, api_1.createContextKey)("OpenTelemetry SDK Context Key RPC_METADATA");
    var RPCType;
    (function(RPCType2) {
      RPCType2["HTTP"] = "http";
    })(RPCType = exports.RPCType || (exports.RPCType = {}));
    function setRPCMetadata(context3, meta) {
      return context3.setValue(RPC_METADATA_KEY, meta);
    }
    __name(setRPCMetadata, "setRPCMetadata");
    exports.setRPCMetadata = setRPCMetadata;
    function deleteRPCMetadata(context3) {
      return context3.deleteValue(RPC_METADATA_KEY);
    }
    __name(deleteRPCMetadata, "deleteRPCMetadata");
    exports.deleteRPCMetadata = deleteRPCMetadata;
    function getRPCMetadata(context3) {
      return context3.getValue(RPC_METADATA_KEY);
    }
    __name(getRPCMetadata, "getRPCMetadata");
    exports.getRPCMetadata = getRPCMetadata;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/utils/lodash.merge.js
var require_lodash_merge = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/utils/lodash.merge.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isPlainObject = void 0;
    var objectTag = "[object Object]";
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    var objectCtorString = funcToString.call(Object);
    var getPrototypeOf = Object.getPrototypeOf;
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
    var nativeObjectToString = objectProto.toString;
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) !== objectTag) {
        return false;
      }
      const proto = getPrototypeOf(value);
      if (proto === null) {
        return true;
      }
      const Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
      return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) === objectCtorString;
    }
    __name(isPlainObject, "isPlainObject");
    exports.isPlainObject = isPlainObject;
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    __name(isObjectLike, "isObjectLike");
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    __name(baseGetTag, "baseGetTag");
    function getRawTag(value) {
      const isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      let unmasked = false;
      try {
        value[symToStringTag] = void 0;
        unmasked = true;
      } catch (e) {
      }
      const result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    __name(getRawTag, "getRawTag");
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    __name(objectToString, "objectToString");
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/utils/merge.js
var require_merge = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/utils/merge.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.merge = void 0;
    var lodash_merge_1 = require_lodash_merge();
    var MAX_LEVEL = 20;
    function merge(...args) {
      let result = args.shift();
      const objects = /* @__PURE__ */ new WeakMap();
      while (args.length > 0) {
        result = mergeTwoObjects(result, args.shift(), 0, objects);
      }
      return result;
    }
    __name(merge, "merge");
    exports.merge = merge;
    function takeValue(value) {
      if (isArray(value)) {
        return value.slice();
      }
      return value;
    }
    __name(takeValue, "takeValue");
    function mergeTwoObjects(one, two, level = 0, objects) {
      let result;
      if (level > MAX_LEVEL) {
        return void 0;
      }
      level++;
      if (isPrimitive(one) || isPrimitive(two) || isFunction(two)) {
        result = takeValue(two);
      } else if (isArray(one)) {
        result = one.slice();
        if (isArray(two)) {
          for (let i = 0, j = two.length; i < j; i++) {
            result.push(takeValue(two[i]));
          }
        } else if (isObject(two)) {
          const keys = Object.keys(two);
          for (let i = 0, j = keys.length; i < j; i++) {
            const key = keys[i];
            result[key] = takeValue(two[key]);
          }
        }
      } else if (isObject(one)) {
        if (isObject(two)) {
          if (!shouldMerge(one, two)) {
            return two;
          }
          result = Object.assign({}, one);
          const keys = Object.keys(two);
          for (let i = 0, j = keys.length; i < j; i++) {
            const key = keys[i];
            const twoValue = two[key];
            if (isPrimitive(twoValue)) {
              if (typeof twoValue === "undefined") {
                delete result[key];
              } else {
                result[key] = twoValue;
              }
            } else {
              const obj1 = result[key];
              const obj2 = twoValue;
              if (wasObjectReferenced(one, key, objects) || wasObjectReferenced(two, key, objects)) {
                delete result[key];
              } else {
                if (isObject(obj1) && isObject(obj2)) {
                  const arr1 = objects.get(obj1) || [];
                  const arr2 = objects.get(obj2) || [];
                  arr1.push({ obj: one, key });
                  arr2.push({ obj: two, key });
                  objects.set(obj1, arr1);
                  objects.set(obj2, arr2);
                }
                result[key] = mergeTwoObjects(result[key], twoValue, level, objects);
              }
            }
          }
        } else {
          result = two;
        }
      }
      return result;
    }
    __name(mergeTwoObjects, "mergeTwoObjects");
    function wasObjectReferenced(obj, key, objects) {
      const arr = objects.get(obj[key]) || [];
      for (let i = 0, j = arr.length; i < j; i++) {
        const info = arr[i];
        if (info.key === key && info.obj === obj) {
          return true;
        }
      }
      return false;
    }
    __name(wasObjectReferenced, "wasObjectReferenced");
    function isArray(value) {
      return Array.isArray(value);
    }
    __name(isArray, "isArray");
    function isFunction(value) {
      return typeof value === "function";
    }
    __name(isFunction, "isFunction");
    function isObject(value) {
      return !isPrimitive(value) && !isArray(value) && !isFunction(value) && typeof value === "object";
    }
    __name(isObject, "isObject");
    function isPrimitive(value) {
      return typeof value === "string" || typeof value === "number" || typeof value === "boolean" || typeof value === "undefined" || value instanceof Date || value instanceof RegExp || value === null;
    }
    __name(isPrimitive, "isPrimitive");
    function shouldMerge(one, two) {
      if (!(0, lodash_merge_1.isPlainObject)(one) || !(0, lodash_merge_1.isPlainObject)(two)) {
        return false;
      }
      return true;
    }
    __name(shouldMerge, "shouldMerge");
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/utils/timeout.js
var require_timeout = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/utils/timeout.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.callWithTimeout = exports.TimeoutError = void 0;
    var TimeoutError = class _TimeoutError extends Error {
      static {
        __name(this, "TimeoutError");
      }
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, _TimeoutError.prototype);
      }
    };
    exports.TimeoutError = TimeoutError;
    function callWithTimeout(promise, timeout) {
      let timeoutHandle;
      const timeoutPromise = new Promise(/* @__PURE__ */ __name(function timeoutFunction(_resolve, reject) {
        timeoutHandle = setTimeout(/* @__PURE__ */ __name(function timeoutHandler() {
          reject(new TimeoutError("Operation timed out."));
        }, "timeoutHandler"), timeout);
      }, "timeoutFunction"));
      return Promise.race([promise, timeoutPromise]).then((result) => {
        clearTimeout(timeoutHandle);
        return result;
      }, (reason) => {
        clearTimeout(timeoutHandle);
        throw reason;
      });
    }
    __name(callWithTimeout, "callWithTimeout");
    exports.callWithTimeout = callWithTimeout;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/utils/url.js
var require_url = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/utils/url.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isUrlIgnored = exports.urlMatches = void 0;
    function urlMatches(url, urlToMatch) {
      if (typeof urlToMatch === "string") {
        return url === urlToMatch;
      } else {
        return !!url.match(urlToMatch);
      }
    }
    __name(urlMatches, "urlMatches");
    exports.urlMatches = urlMatches;
    function isUrlIgnored(url, ignoredUrls) {
      if (!ignoredUrls) {
        return false;
      }
      for (const ignoreUrl of ignoredUrls) {
        if (urlMatches(url, ignoreUrl)) {
          return true;
        }
      }
      return false;
    }
    __name(isUrlIgnored, "isUrlIgnored");
    exports.isUrlIgnored = isUrlIgnored;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/utils/promise.js
var require_promise = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/utils/promise.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Deferred = void 0;
    var Deferred = class {
      static {
        __name(this, "Deferred");
      }
      _promise;
      _resolve;
      _reject;
      constructor() {
        this._promise = new Promise((resolve, reject) => {
          this._resolve = resolve;
          this._reject = reject;
        });
      }
      get promise() {
        return this._promise;
      }
      resolve(val) {
        this._resolve(val);
      }
      reject(err) {
        this._reject(err);
      }
    };
    exports.Deferred = Deferred;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/utils/callback.js
var require_callback = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/utils/callback.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BindOnceFuture = void 0;
    var promise_1 = require_promise();
    var BindOnceFuture = class {
      static {
        __name(this, "BindOnceFuture");
      }
      _callback;
      _that;
      _isCalled = false;
      _deferred = new promise_1.Deferred();
      constructor(_callback, _that) {
        this._callback = _callback;
        this._that = _that;
      }
      get isCalled() {
        return this._isCalled;
      }
      get promise() {
        return this._deferred.promise;
      }
      call(...args) {
        if (!this._isCalled) {
          this._isCalled = true;
          try {
            Promise.resolve(this._callback.call(this._that, ...args)).then((val) => this._deferred.resolve(val), (err) => this._deferred.reject(err));
          } catch (err) {
            this._deferred.reject(err);
          }
        }
        return this._deferred.promise;
      }
    };
    exports.BindOnceFuture = BindOnceFuture;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/utils/configuration.js
var require_configuration = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/utils/configuration.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.diagLogLevelFromString = void 0;
    var api_1 = require_src();
    var logLevelMap = {
      ALL: api_1.DiagLogLevel.ALL,
      VERBOSE: api_1.DiagLogLevel.VERBOSE,
      DEBUG: api_1.DiagLogLevel.DEBUG,
      INFO: api_1.DiagLogLevel.INFO,
      WARN: api_1.DiagLogLevel.WARN,
      ERROR: api_1.DiagLogLevel.ERROR,
      NONE: api_1.DiagLogLevel.NONE
    };
    function diagLogLevelFromString(value) {
      if (value == null) {
        return void 0;
      }
      const resolvedLogLevel = logLevelMap[value.toUpperCase()];
      if (resolvedLogLevel == null) {
        api_1.diag.warn(`Unknown log level "${value}", expected one of ${Object.keys(logLevelMap)}, using default`);
        return api_1.DiagLogLevel.INFO;
      }
      return resolvedLogLevel;
    }
    __name(diagLogLevelFromString, "diagLogLevelFromString");
    exports.diagLogLevelFromString = diagLogLevelFromString;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/internal/exporter.js
var require_exporter = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/internal/exporter.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._export = void 0;
    var api_1 = require_src();
    var suppress_tracing_1 = require_suppress_tracing();
    function _export(exporter, arg) {
      return new Promise((resolve) => {
        api_1.context.with((0, suppress_tracing_1.suppressTracing)(api_1.context.active()), () => {
          exporter.export(arg, (result) => {
            resolve(result);
          });
        });
      });
    }
    __name(_export, "_export");
    exports._export = _export;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/index.js
var require_src3 = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/node_modules/@opentelemetry/core/build/src/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.internal = exports.diagLogLevelFromString = exports.BindOnceFuture = exports.urlMatches = exports.isUrlIgnored = exports.callWithTimeout = exports.TimeoutError = exports.merge = exports.TraceState = exports.unsuppressTracing = exports.suppressTracing = exports.isTracingSuppressed = exports.setRPCMetadata = exports.getRPCMetadata = exports.deleteRPCMetadata = exports.RPCType = exports.parseTraceParent = exports.W3CTraceContextPropagator = exports.TRACE_STATE_HEADER = exports.TRACE_PARENT_HEADER = exports.CompositePropagator = exports.unrefTimer = exports.otperformance = exports.getStringListFromEnv = exports.getNumberFromEnv = exports.getBooleanFromEnv = exports.getStringFromEnv = exports._globalThis = exports.SDK_INFO = exports.parseKeyPairsIntoRecord = exports.ExportResultCode = exports.timeInputToHrTime = exports.millisToHrTime = exports.isTimeInputHrTime = exports.isTimeInput = exports.hrTimeToTimeStamp = exports.hrTimeToNanoseconds = exports.hrTimeToMilliseconds = exports.hrTimeToMicroseconds = exports.hrTimeDuration = exports.hrTime = exports.getTimeOrigin = exports.addHrTimes = exports.loggingErrorHandler = exports.setGlobalErrorHandler = exports.globalErrorHandler = exports.sanitizeAttributes = exports.isAttributeValue = exports.AnchoredClock = exports.W3CBaggagePropagator = void 0;
    var W3CBaggagePropagator_1 = require_W3CBaggagePropagator();
    Object.defineProperty(exports, "W3CBaggagePropagator", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return W3CBaggagePropagator_1.W3CBaggagePropagator;
    }, "get") });
    var anchored_clock_1 = require_anchored_clock();
    Object.defineProperty(exports, "AnchoredClock", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return anchored_clock_1.AnchoredClock;
    }, "get") });
    var attributes_1 = require_attributes();
    Object.defineProperty(exports, "isAttributeValue", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return attributes_1.isAttributeValue;
    }, "get") });
    Object.defineProperty(exports, "sanitizeAttributes", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return attributes_1.sanitizeAttributes;
    }, "get") });
    var global_error_handler_1 = require_global_error_handler();
    Object.defineProperty(exports, "globalErrorHandler", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return global_error_handler_1.globalErrorHandler;
    }, "get") });
    Object.defineProperty(exports, "setGlobalErrorHandler", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return global_error_handler_1.setGlobalErrorHandler;
    }, "get") });
    var logging_error_handler_1 = require_logging_error_handler();
    Object.defineProperty(exports, "loggingErrorHandler", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return logging_error_handler_1.loggingErrorHandler;
    }, "get") });
    var time_1 = require_time();
    Object.defineProperty(exports, "addHrTimes", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return time_1.addHrTimes;
    }, "get") });
    Object.defineProperty(exports, "getTimeOrigin", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return time_1.getTimeOrigin;
    }, "get") });
    Object.defineProperty(exports, "hrTime", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return time_1.hrTime;
    }, "get") });
    Object.defineProperty(exports, "hrTimeDuration", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return time_1.hrTimeDuration;
    }, "get") });
    Object.defineProperty(exports, "hrTimeToMicroseconds", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return time_1.hrTimeToMicroseconds;
    }, "get") });
    Object.defineProperty(exports, "hrTimeToMilliseconds", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return time_1.hrTimeToMilliseconds;
    }, "get") });
    Object.defineProperty(exports, "hrTimeToNanoseconds", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return time_1.hrTimeToNanoseconds;
    }, "get") });
    Object.defineProperty(exports, "hrTimeToTimeStamp", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return time_1.hrTimeToTimeStamp;
    }, "get") });
    Object.defineProperty(exports, "isTimeInput", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return time_1.isTimeInput;
    }, "get") });
    Object.defineProperty(exports, "isTimeInputHrTime", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return time_1.isTimeInputHrTime;
    }, "get") });
    Object.defineProperty(exports, "millisToHrTime", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return time_1.millisToHrTime;
    }, "get") });
    Object.defineProperty(exports, "timeInputToHrTime", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return time_1.timeInputToHrTime;
    }, "get") });
    var ExportResult_1 = require_ExportResult();
    Object.defineProperty(exports, "ExportResultCode", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return ExportResult_1.ExportResultCode;
    }, "get") });
    var utils_1 = require_utils4();
    Object.defineProperty(exports, "parseKeyPairsIntoRecord", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return utils_1.parseKeyPairsIntoRecord;
    }, "get") });
    var platform_1 = require_browser2();
    Object.defineProperty(exports, "SDK_INFO", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return platform_1.SDK_INFO;
    }, "get") });
    Object.defineProperty(exports, "_globalThis", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return platform_1._globalThis;
    }, "get") });
    Object.defineProperty(exports, "getStringFromEnv", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return platform_1.getStringFromEnv;
    }, "get") });
    Object.defineProperty(exports, "getBooleanFromEnv", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return platform_1.getBooleanFromEnv;
    }, "get") });
    Object.defineProperty(exports, "getNumberFromEnv", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return platform_1.getNumberFromEnv;
    }, "get") });
    Object.defineProperty(exports, "getStringListFromEnv", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return platform_1.getStringListFromEnv;
    }, "get") });
    Object.defineProperty(exports, "otperformance", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return platform_1.otperformance;
    }, "get") });
    Object.defineProperty(exports, "unrefTimer", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return platform_1.unrefTimer;
    }, "get") });
    var composite_1 = require_composite();
    Object.defineProperty(exports, "CompositePropagator", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return composite_1.CompositePropagator;
    }, "get") });
    var W3CTraceContextPropagator_1 = require_W3CTraceContextPropagator();
    Object.defineProperty(exports, "TRACE_PARENT_HEADER", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return W3CTraceContextPropagator_1.TRACE_PARENT_HEADER;
    }, "get") });
    Object.defineProperty(exports, "TRACE_STATE_HEADER", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return W3CTraceContextPropagator_1.TRACE_STATE_HEADER;
    }, "get") });
    Object.defineProperty(exports, "W3CTraceContextPropagator", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return W3CTraceContextPropagator_1.W3CTraceContextPropagator;
    }, "get") });
    Object.defineProperty(exports, "parseTraceParent", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return W3CTraceContextPropagator_1.parseTraceParent;
    }, "get") });
    var rpc_metadata_1 = require_rpc_metadata();
    Object.defineProperty(exports, "RPCType", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return rpc_metadata_1.RPCType;
    }, "get") });
    Object.defineProperty(exports, "deleteRPCMetadata", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return rpc_metadata_1.deleteRPCMetadata;
    }, "get") });
    Object.defineProperty(exports, "getRPCMetadata", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return rpc_metadata_1.getRPCMetadata;
    }, "get") });
    Object.defineProperty(exports, "setRPCMetadata", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return rpc_metadata_1.setRPCMetadata;
    }, "get") });
    var suppress_tracing_1 = require_suppress_tracing();
    Object.defineProperty(exports, "isTracingSuppressed", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return suppress_tracing_1.isTracingSuppressed;
    }, "get") });
    Object.defineProperty(exports, "suppressTracing", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return suppress_tracing_1.suppressTracing;
    }, "get") });
    Object.defineProperty(exports, "unsuppressTracing", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return suppress_tracing_1.unsuppressTracing;
    }, "get") });
    var TraceState_1 = require_TraceState();
    Object.defineProperty(exports, "TraceState", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return TraceState_1.TraceState;
    }, "get") });
    var merge_1 = require_merge();
    Object.defineProperty(exports, "merge", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return merge_1.merge;
    }, "get") });
    var timeout_1 = require_timeout();
    Object.defineProperty(exports, "TimeoutError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return timeout_1.TimeoutError;
    }, "get") });
    Object.defineProperty(exports, "callWithTimeout", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return timeout_1.callWithTimeout;
    }, "get") });
    var url_1 = require_url();
    Object.defineProperty(exports, "isUrlIgnored", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return url_1.isUrlIgnored;
    }, "get") });
    Object.defineProperty(exports, "urlMatches", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return url_1.urlMatches;
    }, "get") });
    var callback_1 = require_callback();
    Object.defineProperty(exports, "BindOnceFuture", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return callback_1.BindOnceFuture;
    }, "get") });
    var configuration_1 = require_configuration();
    Object.defineProperty(exports, "diagLogLevelFromString", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return configuration_1.diagLogLevelFromString;
    }, "get") });
    var exporter_1 = require_exporter();
    exports.internal = {
      _export: exporter_1._export
    };
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/build/src/logging-response-handler.js
var require_logging_response_handler = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/build/src/logging-response-handler.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createLoggingPartialSuccessResponseHandler = void 0;
    var api_1 = require_src();
    function isPartialSuccessResponse(response) {
      return Object.prototype.hasOwnProperty.call(response, "partialSuccess");
    }
    __name(isPartialSuccessResponse, "isPartialSuccessResponse");
    function createLoggingPartialSuccessResponseHandler() {
      return {
        handleResponse(response) {
          if (response == null || !isPartialSuccessResponse(response) || response.partialSuccess == null || Object.keys(response.partialSuccess).length === 0) {
            return;
          }
          api_1.diag.warn("Received Partial Success response:", JSON.stringify(response.partialSuccess));
        }
      };
    }
    __name(createLoggingPartialSuccessResponseHandler, "createLoggingPartialSuccessResponseHandler");
    exports.createLoggingPartialSuccessResponseHandler = createLoggingPartialSuccessResponseHandler;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/build/src/otlp-export-delegate.js
var require_otlp_export_delegate = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/build/src/otlp-export-delegate.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createOtlpExportDelegate = void 0;
    var core_1 = require_src3();
    var types_1 = require_types2();
    var logging_response_handler_1 = require_logging_response_handler();
    var api_1 = require_src();
    var OTLPExportDelegate = class {
      static {
        __name(this, "OTLPExportDelegate");
      }
      _transport;
      _serializer;
      _responseHandler;
      _promiseQueue;
      _timeout;
      _diagLogger;
      constructor(_transport, _serializer, _responseHandler, _promiseQueue, _timeout) {
        this._transport = _transport;
        this._serializer = _serializer;
        this._responseHandler = _responseHandler;
        this._promiseQueue = _promiseQueue;
        this._timeout = _timeout;
        this._diagLogger = api_1.diag.createComponentLogger({
          namespace: "OTLPExportDelegate"
        });
      }
      export(internalRepresentation, resultCallback) {
        this._diagLogger.debug("items to be sent", internalRepresentation);
        if (this._promiseQueue.hasReachedLimit()) {
          resultCallback({
            code: core_1.ExportResultCode.FAILED,
            error: new Error("Concurrent export limit reached")
          });
          return;
        }
        const serializedRequest = this._serializer.serializeRequest(internalRepresentation);
        if (serializedRequest == null) {
          resultCallback({
            code: core_1.ExportResultCode.FAILED,
            error: new Error("Nothing to send")
          });
          return;
        }
        this._promiseQueue.pushPromise(this._transport.send(serializedRequest, this._timeout).then((response) => {
          if (response.status === "success") {
            if (response.data != null) {
              try {
                this._responseHandler.handleResponse(this._serializer.deserializeResponse(response.data));
              } catch (e) {
                this._diagLogger.warn("Export succeeded but could not deserialize response - is the response specification compliant?", e, response.data);
              }
            }
            resultCallback({
              code: core_1.ExportResultCode.SUCCESS
            });
            return;
          } else if (response.status === "failure" && response.error) {
            resultCallback({
              code: core_1.ExportResultCode.FAILED,
              error: response.error
            });
            return;
          } else if (response.status === "retryable") {
            resultCallback({
              code: core_1.ExportResultCode.FAILED,
              error: new types_1.OTLPExporterError("Export failed with retryable status")
            });
          } else {
            resultCallback({
              code: core_1.ExportResultCode.FAILED,
              error: new types_1.OTLPExporterError("Export failed with unknown error")
            });
          }
        }, (reason) => resultCallback({
          code: core_1.ExportResultCode.FAILED,
          error: reason
        })));
      }
      forceFlush() {
        return this._promiseQueue.awaitAll();
      }
      async shutdown() {
        this._diagLogger.debug("shutdown started");
        await this.forceFlush();
        this._transport.shutdown();
      }
    };
    function createOtlpExportDelegate(components, settings) {
      return new OTLPExportDelegate(components.transport, components.serializer, (0, logging_response_handler_1.createLoggingPartialSuccessResponseHandler)(), components.promiseHandler, settings.timeout);
    }
    __name(createOtlpExportDelegate, "createOtlpExportDelegate");
    exports.createOtlpExportDelegate = createOtlpExportDelegate;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/build/src/otlp-network-export-delegate.js
var require_otlp_network_export_delegate = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/build/src/otlp-network-export-delegate.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createOtlpNetworkExportDelegate = void 0;
    var bounded_queue_export_promise_handler_1 = require_bounded_queue_export_promise_handler();
    var otlp_export_delegate_1 = require_otlp_export_delegate();
    function createOtlpNetworkExportDelegate(options, serializer, transport) {
      return (0, otlp_export_delegate_1.createOtlpExportDelegate)({
        transport,
        serializer,
        promiseHandler: (0, bounded_queue_export_promise_handler_1.createBoundedQueueExportPromiseHandler)(options)
      }, { timeout: options.timeoutMillis });
    }
    __name(createOtlpNetworkExportDelegate, "createOtlpNetworkExportDelegate");
    exports.createOtlpNetworkExportDelegate = createOtlpNetworkExportDelegate;
  }
});

// ../../node_modules/@opentelemetry/otlp-exporter-base/build/src/index.js
var require_src4 = __commonJS({
  "../../node_modules/@opentelemetry/otlp-exporter-base/build/src/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createOtlpNetworkExportDelegate = exports.CompressionAlgorithm = exports.getSharedConfigurationDefaults = exports.mergeOtlpSharedConfigurationWithDefaults = exports.OTLPExporterError = exports.OTLPExporterBase = void 0;
    var OTLPExporterBase_1 = require_OTLPExporterBase();
    Object.defineProperty(exports, "OTLPExporterBase", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return OTLPExporterBase_1.OTLPExporterBase;
    }, "get") });
    var types_1 = require_types2();
    Object.defineProperty(exports, "OTLPExporterError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return types_1.OTLPExporterError;
    }, "get") });
    var shared_configuration_1 = require_shared_configuration();
    Object.defineProperty(exports, "mergeOtlpSharedConfigurationWithDefaults", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return shared_configuration_1.mergeOtlpSharedConfigurationWithDefaults;
    }, "get") });
    Object.defineProperty(exports, "getSharedConfigurationDefaults", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return shared_configuration_1.getSharedConfigurationDefaults;
    }, "get") });
    var legacy_node_configuration_1 = require_legacy_node_configuration();
    Object.defineProperty(exports, "CompressionAlgorithm", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return legacy_node_configuration_1.CompressionAlgorithm;
    }, "get") });
    var otlp_network_export_delegate_1 = require_otlp_network_export_delegate();
    Object.defineProperty(exports, "createOtlpNetworkExportDelegate", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return otlp_network_export_delegate_1.createOtlpNetworkExportDelegate;
    }, "get") });
  }
});

// ../../node_modules/@opentelemetry/semantic-conventions/build/src/experimental_attributes.js
var require_experimental_attributes = __commonJS({
  "../../node_modules/@opentelemetry/semantic-conventions/build/src/experimental_attributes.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ASPNETCORE_IDENTITY_SIGN_IN_RESULT_VALUE_NOT_ALLOWED = exports.ASPNETCORE_IDENTITY_SIGN_IN_RESULT_VALUE_LOCKED_OUT = exports.ASPNETCORE_IDENTITY_SIGN_IN_RESULT_VALUE_FAILURE = exports.ATTR_ASPNETCORE_IDENTITY_SIGN_IN_RESULT = exports.ASPNETCORE_IDENTITY_RESULT_VALUE_SUCCESS = exports.ASPNETCORE_IDENTITY_RESULT_VALUE_FAILURE = exports.ATTR_ASPNETCORE_IDENTITY_RESULT = exports.ASPNETCORE_IDENTITY_PASSWORD_CHECK_RESULT_VALUE_USER_MISSING = exports.ASPNETCORE_IDENTITY_PASSWORD_CHECK_RESULT_VALUE_SUCCESS_REHASH_NEEDED = exports.ASPNETCORE_IDENTITY_PASSWORD_CHECK_RESULT_VALUE_SUCCESS = exports.ASPNETCORE_IDENTITY_PASSWORD_CHECK_RESULT_VALUE_PASSWORD_MISSING = exports.ASPNETCORE_IDENTITY_PASSWORD_CHECK_RESULT_VALUE_FAILURE = exports.ATTR_ASPNETCORE_IDENTITY_PASSWORD_CHECK_RESULT = exports.ATTR_ASPNETCORE_IDENTITY_ERROR_CODE = exports.ASPNETCORE_AUTHORIZATION_RESULT_VALUE_SUCCESS = exports.ASPNETCORE_AUTHORIZATION_RESULT_VALUE_FAILURE = exports.ATTR_ASPNETCORE_AUTHORIZATION_RESULT = exports.ATTR_ASPNETCORE_AUTHORIZATION_POLICY = exports.ATTR_ASPNETCORE_AUTHENTICATION_SCHEME = exports.ASPNETCORE_AUTHENTICATION_RESULT_VALUE_SUCCESS = exports.ASPNETCORE_AUTHENTICATION_RESULT_VALUE_NONE = exports.ASPNETCORE_AUTHENTICATION_RESULT_VALUE_FAILURE = exports.ATTR_ASPNETCORE_AUTHENTICATION_RESULT = exports.ATTR_ARTIFACT_VERSION = exports.ATTR_ARTIFACT_PURL = exports.ATTR_ARTIFACT_HASH = exports.ATTR_ARTIFACT_FILENAME = exports.ATTR_ARTIFACT_ATTESTATION_ID = exports.ATTR_ARTIFACT_ATTESTATION_HASH = exports.ATTR_ARTIFACT_ATTESTATION_FILENAME = exports.ATTR_APP_WIDGET_NAME = exports.ATTR_APP_WIDGET_ID = exports.ATTR_APP_SCREEN_NAME = exports.ATTR_APP_SCREEN_ID = exports.ATTR_APP_SCREEN_COORDINATE_Y = exports.ATTR_APP_SCREEN_COORDINATE_X = exports.ATTR_APP_JANK_THRESHOLD = exports.ATTR_APP_JANK_PERIOD = exports.ATTR_APP_JANK_FRAME_COUNT = exports.ATTR_APP_INSTALLATION_ID = exports.ATTR_APP_BUILD_ID = exports.ANDROID_STATE_VALUE_FOREGROUND = exports.ANDROID_STATE_VALUE_CREATED = exports.ANDROID_STATE_VALUE_BACKGROUND = exports.ATTR_ANDROID_STATE = exports.ATTR_ANDROID_OS_API_LEVEL = exports.ANDROID_APP_STATE_VALUE_FOREGROUND = exports.ANDROID_APP_STATE_VALUE_CREATED = exports.ANDROID_APP_STATE_VALUE_BACKGROUND = exports.ATTR_ANDROID_APP_STATE = void 0;
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_SET_PHONE_NUMBER = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_SET_PASSKEY = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_SET_LOCKOUT_END_DATE = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_SET_LOCKOUT_ENABLED = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_SET_EMAIL = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_SET_AUTHENTICATION_TOKEN = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_SECURITY_STAMP = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_RESET_PASSWORD = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_RESET_AUTHENTICATOR_KEY = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_RESET_ACCESS_FAILED_COUNT = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_REPLACE_CLAIM = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_REMOVE_PASSWORD = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_REMOVE_PASSKEY = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_REMOVE_LOGIN = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_REMOVE_FROM_ROLES = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_REMOVE_CLAIMS = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_REMOVE_AUTHENTICATION_TOKEN = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_REDEEM_TWO_FACTOR_RECOVERY_CODE = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_PASSWORD_REHASH = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_GENERATE_NEW_TWO_FACTOR_RECOVERY_CODES = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_CONFIRM_EMAIL = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_CHANGE_PHONE_NUMBER = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_CHANGE_PASSWORD = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_CHANGE_EMAIL = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_ADD_TO_ROLES = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_ADD_PASSWORD = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_ADD_LOGIN = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_ADD_CLAIMS = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_ACCESS_FAILED = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_OTHER = exports.ATTR_ASPNETCORE_IDENTITY_USER_UPDATE_TYPE = exports.ASPNETCORE_IDENTITY_TOKEN_VERIFIED_VALUE_SUCCESS = exports.ASPNETCORE_IDENTITY_TOKEN_VERIFIED_VALUE_FAILURE = exports.ATTR_ASPNETCORE_IDENTITY_TOKEN_VERIFIED = exports.ASPNETCORE_IDENTITY_TOKEN_PURPOSE_VALUE_TWO_FACTOR = exports.ASPNETCORE_IDENTITY_TOKEN_PURPOSE_VALUE_RESET_PASSWORD = exports.ASPNETCORE_IDENTITY_TOKEN_PURPOSE_VALUE_EMAIL_CONFIRMATION = exports.ASPNETCORE_IDENTITY_TOKEN_PURPOSE_VALUE_CHANGE_PHONE_NUMBER = exports.ASPNETCORE_IDENTITY_TOKEN_PURPOSE_VALUE_CHANGE_EMAIL = exports.ASPNETCORE_IDENTITY_TOKEN_PURPOSE_VALUE_OTHER = exports.ATTR_ASPNETCORE_IDENTITY_TOKEN_PURPOSE = exports.ASPNETCORE_IDENTITY_SIGN_IN_TYPE_VALUE_TWO_FACTOR_RECOVERY_CODE = exports.ASPNETCORE_IDENTITY_SIGN_IN_TYPE_VALUE_TWO_FACTOR_AUTHENTICATOR = exports.ASPNETCORE_IDENTITY_SIGN_IN_TYPE_VALUE_TWO_FACTOR = exports.ASPNETCORE_IDENTITY_SIGN_IN_TYPE_VALUE_PASSWORD = exports.ASPNETCORE_IDENTITY_SIGN_IN_TYPE_VALUE_PASSKEY = exports.ASPNETCORE_IDENTITY_SIGN_IN_TYPE_VALUE_EXTERNAL = exports.ATTR_ASPNETCORE_IDENTITY_SIGN_IN_TYPE = exports.ASPNETCORE_IDENTITY_SIGN_IN_RESULT_VALUE_SUCCESS = exports.ASPNETCORE_IDENTITY_SIGN_IN_RESULT_VALUE_REQUIRES_TWO_FACTOR = void 0;
    exports.ATTR_AWS_S3_BUCKET = exports.ATTR_AWS_REQUEST_ID = exports.ATTR_AWS_LOG_STREAM_NAMES = exports.ATTR_AWS_LOG_STREAM_ARNS = exports.ATTR_AWS_LOG_GROUP_NAMES = exports.ATTR_AWS_LOG_GROUP_ARNS = exports.ATTR_AWS_LAMBDA_RESOURCE_MAPPING_ID = exports.ATTR_AWS_LAMBDA_INVOKED_ARN = exports.ATTR_AWS_KINESIS_STREAM_NAME = exports.ATTR_AWS_EXTENDED_REQUEST_ID = exports.ATTR_AWS_EKS_CLUSTER_ARN = exports.ATTR_AWS_ECS_TASK_REVISION = exports.ATTR_AWS_ECS_TASK_ID = exports.ATTR_AWS_ECS_TASK_FAMILY = exports.ATTR_AWS_ECS_TASK_ARN = exports.AWS_ECS_LAUNCHTYPE_VALUE_FARGATE = exports.AWS_ECS_LAUNCHTYPE_VALUE_EC2 = exports.ATTR_AWS_ECS_LAUNCHTYPE = exports.ATTR_AWS_ECS_CONTAINER_ARN = exports.ATTR_AWS_ECS_CLUSTER_ARN = exports.ATTR_AWS_DYNAMODB_TOTAL_SEGMENTS = exports.ATTR_AWS_DYNAMODB_TABLE_NAMES = exports.ATTR_AWS_DYNAMODB_TABLE_COUNT = exports.ATTR_AWS_DYNAMODB_SELECT = exports.ATTR_AWS_DYNAMODB_SEGMENT = exports.ATTR_AWS_DYNAMODB_SCANNED_COUNT = exports.ATTR_AWS_DYNAMODB_SCAN_FORWARD = exports.ATTR_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY = exports.ATTR_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY = exports.ATTR_AWS_DYNAMODB_PROJECTION = exports.ATTR_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES = exports.ATTR_AWS_DYNAMODB_LIMIT = exports.ATTR_AWS_DYNAMODB_ITEM_COLLECTION_METRICS = exports.ATTR_AWS_DYNAMODB_INDEX_NAME = exports.ATTR_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES = exports.ATTR_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES = exports.ATTR_AWS_DYNAMODB_EXCLUSIVE_START_TABLE = exports.ATTR_AWS_DYNAMODB_COUNT = exports.ATTR_AWS_DYNAMODB_CONSUMED_CAPACITY = exports.ATTR_AWS_DYNAMODB_CONSISTENT_READ = exports.ATTR_AWS_DYNAMODB_ATTRIBUTES_TO_GET = exports.ATTR_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS = exports.ATTR_AWS_BEDROCK_KNOWLEDGE_BASE_ID = exports.ATTR_AWS_BEDROCK_GUARDRAIL_ID = exports.ATTR_ASPNETCORE_SIGN_IN_IS_PERSISTENT = exports.ATTR_ASPNETCORE_MEMORY_POOL_OWNER = exports.ATTR_ASPNETCORE_IDENTITY_USER_TYPE = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_USER_NAME = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_UPDATE = exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_SET_TWO_FACTOR_ENABLED = void 0;
    exports.ATTR_CICD_PIPELINE_ACTION_NAME = exports.ATTR_CASSANDRA_SPECULATIVE_EXECUTION_COUNT = exports.ATTR_CASSANDRA_QUERY_IDEMPOTENT = exports.ATTR_CASSANDRA_PAGE_SIZE = exports.ATTR_CASSANDRA_COORDINATOR_ID = exports.ATTR_CASSANDRA_COORDINATOR_DC = exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_TWO = exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_THREE = exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_SERIAL = exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_QUORUM = exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_ONE = exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_LOCAL_SERIAL = exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_LOCAL_QUORUM = exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_LOCAL_ONE = exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_EACH_QUORUM = exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_ANY = exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_ALL = exports.ATTR_CASSANDRA_CONSISTENCY_LEVEL = exports.ATTR_BROWSER_PLATFORM = exports.ATTR_BROWSER_MOBILE = exports.ATTR_BROWSER_LANGUAGE = exports.ATTR_BROWSER_BRANDS = exports.ATTR_AZURE_SERVICE_REQUEST_ID = exports.ATTR_AZURE_RESOURCE_PROVIDER_NAMESPACE = exports.ATTR_AZURE_COSMOSDB_RESPONSE_SUB_STATUS_CODE = exports.ATTR_AZURE_COSMOSDB_REQUEST_BODY_SIZE = exports.ATTR_AZURE_COSMOSDB_OPERATION_REQUEST_CHARGE = exports.ATTR_AZURE_COSMOSDB_OPERATION_CONTACTED_REGIONS = exports.AZURE_COSMOSDB_CONSISTENCY_LEVEL_VALUE_STRONG = exports.AZURE_COSMOSDB_CONSISTENCY_LEVEL_VALUE_SESSION = exports.AZURE_COSMOSDB_CONSISTENCY_LEVEL_VALUE_EVENTUAL = exports.AZURE_COSMOSDB_CONSISTENCY_LEVEL_VALUE_CONSISTENT_PREFIX = exports.AZURE_COSMOSDB_CONSISTENCY_LEVEL_VALUE_BOUNDED_STALENESS = exports.ATTR_AZURE_COSMOSDB_CONSISTENCY_LEVEL = exports.AZURE_COSMOSDB_CONNECTION_MODE_VALUE_GATEWAY = exports.AZURE_COSMOSDB_CONNECTION_MODE_VALUE_DIRECT = exports.ATTR_AZURE_COSMOSDB_CONNECTION_MODE = exports.ATTR_AZURE_CLIENT_ID = exports.ATTR_AZ_SERVICE_REQUEST_ID = exports.ATTR_AZ_NAMESPACE = exports.ATTR_AWS_STEP_FUNCTIONS_STATE_MACHINE_ARN = exports.ATTR_AWS_STEP_FUNCTIONS_ACTIVITY_ARN = exports.ATTR_AWS_SQS_QUEUE_URL = exports.ATTR_AWS_SNS_TOPIC_ARN = exports.ATTR_AWS_SECRETSMANAGER_SECRET_ARN = exports.ATTR_AWS_S3_UPLOAD_ID = exports.ATTR_AWS_S3_PART_NUMBER = exports.ATTR_AWS_S3_KEY = exports.ATTR_AWS_S3_DELETE = exports.ATTR_AWS_S3_COPY_SOURCE = void 0;
    exports.CLOUD_PLATFORM_VALUE_AWS_EKS = exports.CLOUD_PLATFORM_VALUE_AWS_ECS = exports.CLOUD_PLATFORM_VALUE_AWS_EC2 = exports.CLOUD_PLATFORM_VALUE_AWS_APP_RUNNER = exports.CLOUD_PLATFORM_VALUE_ALIBABA_CLOUD_OPENSHIFT = exports.CLOUD_PLATFORM_VALUE_ALIBABA_CLOUD_FC = exports.CLOUD_PLATFORM_VALUE_ALIBABA_CLOUD_ECS = exports.CLOUD_PLATFORM_VALUE_AKAMAI_CLOUD_COMPUTE = exports.ATTR_CLOUD_PLATFORM = exports.ATTR_CLOUD_AVAILABILITY_ZONE = exports.ATTR_CLOUD_ACCOUNT_ID = exports.ATTR_CICD_WORKER_URL_FULL = exports.CICD_WORKER_STATE_VALUE_OFFLINE = exports.CICD_WORKER_STATE_VALUE_BUSY = exports.CICD_WORKER_STATE_VALUE_AVAILABLE = exports.ATTR_CICD_WORKER_STATE = exports.ATTR_CICD_WORKER_NAME = exports.ATTR_CICD_WORKER_ID = exports.ATTR_CICD_SYSTEM_COMPONENT = exports.CICD_PIPELINE_TASK_TYPE_VALUE_TEST = exports.CICD_PIPELINE_TASK_TYPE_VALUE_DEPLOY = exports.CICD_PIPELINE_TASK_TYPE_VALUE_BUILD = exports.ATTR_CICD_PIPELINE_TASK_TYPE = exports.ATTR_CICD_PIPELINE_TASK_RUN_URL_FULL = exports.CICD_PIPELINE_TASK_RUN_RESULT_VALUE_TIMEOUT = exports.CICD_PIPELINE_TASK_RUN_RESULT_VALUE_SUCCESS = exports.CICD_PIPELINE_TASK_RUN_RESULT_VALUE_SKIP = exports.CICD_PIPELINE_TASK_RUN_RESULT_VALUE_FAILURE = exports.CICD_PIPELINE_TASK_RUN_RESULT_VALUE_ERROR = exports.CICD_PIPELINE_TASK_RUN_RESULT_VALUE_CANCELLATION = exports.ATTR_CICD_PIPELINE_TASK_RUN_RESULT = exports.ATTR_CICD_PIPELINE_TASK_RUN_ID = exports.ATTR_CICD_PIPELINE_TASK_NAME = exports.ATTR_CICD_PIPELINE_RUN_URL_FULL = exports.CICD_PIPELINE_RUN_STATE_VALUE_PENDING = exports.CICD_PIPELINE_RUN_STATE_VALUE_FINALIZING = exports.CICD_PIPELINE_RUN_STATE_VALUE_EXECUTING = exports.ATTR_CICD_PIPELINE_RUN_STATE = exports.ATTR_CICD_PIPELINE_RUN_ID = exports.CICD_PIPELINE_RESULT_VALUE_TIMEOUT = exports.CICD_PIPELINE_RESULT_VALUE_SUCCESS = exports.CICD_PIPELINE_RESULT_VALUE_SKIP = exports.CICD_PIPELINE_RESULT_VALUE_FAILURE = exports.CICD_PIPELINE_RESULT_VALUE_ERROR = exports.CICD_PIPELINE_RESULT_VALUE_CANCELLATION = exports.ATTR_CICD_PIPELINE_RESULT = exports.ATTR_CICD_PIPELINE_NAME = exports.CICD_PIPELINE_ACTION_NAME_VALUE_SYNC = exports.CICD_PIPELINE_ACTION_NAME_VALUE_RUN = exports.CICD_PIPELINE_ACTION_NAME_VALUE_BUILD = void 0;
    exports.ATTR_CLOUDFOUNDRY_ORG_NAME = exports.ATTR_CLOUDFOUNDRY_ORG_ID = exports.ATTR_CLOUDFOUNDRY_APP_NAME = exports.ATTR_CLOUDFOUNDRY_APP_INSTANCE_ID = exports.ATTR_CLOUDFOUNDRY_APP_ID = exports.ATTR_CLOUDEVENTS_EVENT_TYPE = exports.ATTR_CLOUDEVENTS_EVENT_SUBJECT = exports.ATTR_CLOUDEVENTS_EVENT_SPEC_VERSION = exports.ATTR_CLOUDEVENTS_EVENT_SOURCE = exports.ATTR_CLOUDEVENTS_EVENT_ID = exports.ATTR_CLOUD_RESOURCE_ID = exports.ATTR_CLOUD_REGION = exports.CLOUD_PROVIDER_VALUE_VULTR = exports.CLOUD_PROVIDER_VALUE_TENCENT_CLOUD = exports.CLOUD_PROVIDER_VALUE_ORACLE_CLOUD = exports.CLOUD_PROVIDER_VALUE_IBM_CLOUD = exports.CLOUD_PROVIDER_VALUE_HETZNER = exports.CLOUD_PROVIDER_VALUE_HEROKU = exports.CLOUD_PROVIDER_VALUE_GCP = exports.CLOUD_PROVIDER_VALUE_AZURE = exports.CLOUD_PROVIDER_VALUE_AWS = exports.CLOUD_PROVIDER_VALUE_ALIBABA_CLOUD = exports.CLOUD_PROVIDER_VALUE_AKAMAI_CLOUD = exports.ATTR_CLOUD_PROVIDER = exports.CLOUD_PLATFORM_VALUE_VULTR_CLOUD_COMPUTE = exports.CLOUD_PLATFORM_VALUE_TENCENT_CLOUD_SCF = exports.CLOUD_PLATFORM_VALUE_TENCENT_CLOUD_EKS = exports.CLOUD_PLATFORM_VALUE_TENCENT_CLOUD_CVM = exports.CLOUD_PLATFORM_VALUE_ORACLE_CLOUD_OKE = exports.CLOUD_PLATFORM_VALUE_ORACLE_CLOUD_COMPUTE = exports.CLOUD_PLATFORM_VALUE_IBM_CLOUD_OPENSHIFT = exports.CLOUD_PLATFORM_VALUE_HETZNER_CLOUD_SERVER = exports.CLOUD_PLATFORM_VALUE_GCP_OPENSHIFT = exports.CLOUD_PLATFORM_VALUE_GCP_KUBERNETES_ENGINE = exports.CLOUD_PLATFORM_VALUE_GCP_COMPUTE_ENGINE = exports.CLOUD_PLATFORM_VALUE_GCP_CLOUD_RUN = exports.CLOUD_PLATFORM_VALUE_GCP_CLOUD_FUNCTIONS = exports.CLOUD_PLATFORM_VALUE_GCP_BARE_METAL_SOLUTION = exports.CLOUD_PLATFORM_VALUE_GCP_APP_ENGINE = exports.CLOUD_PLATFORM_VALUE_GCP_AGENT_ENGINE = exports.CLOUD_PLATFORM_VALUE_AZURE_VM = exports.CLOUD_PLATFORM_VALUE_AZURE_OPENSHIFT = exports.CLOUD_PLATFORM_VALUE_AZURE_FUNCTIONS = exports.CLOUD_PLATFORM_VALUE_AZURE_CONTAINER_INSTANCES = exports.CLOUD_PLATFORM_VALUE_AZURE_CONTAINER_APPS = exports.CLOUD_PLATFORM_VALUE_AZURE_APP_SERVICE = exports.CLOUD_PLATFORM_VALUE_AZURE_AKS = exports.CLOUD_PLATFORM_VALUE_AWS_OPENSHIFT = exports.CLOUD_PLATFORM_VALUE_AWS_LAMBDA = exports.CLOUD_PLATFORM_VALUE_AWS_ELASTIC_BEANSTALK = void 0;
    exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_EACH_QUORUM = exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_ANY = exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_ALL = exports.ATTR_DB_CASSANDRA_CONSISTENCY_LEVEL = exports.CPYTHON_GC_GENERATION_VALUE_GENERATION_2 = exports.CPYTHON_GC_GENERATION_VALUE_GENERATION_1 = exports.CPYTHON_GC_GENERATION_VALUE_GENERATION_0 = exports.ATTR_CPYTHON_GC_GENERATION = exports.CPU_MODE_VALUE_USER = exports.CPU_MODE_VALUE_SYSTEM = exports.CPU_MODE_VALUE_STEAL = exports.CPU_MODE_VALUE_NICE = exports.CPU_MODE_VALUE_KERNEL = exports.CPU_MODE_VALUE_IOWAIT = exports.CPU_MODE_VALUE_INTERRUPT = exports.CPU_MODE_VALUE_IDLE = exports.ATTR_CPU_MODE = exports.ATTR_CPU_LOGICAL_NUMBER = exports.ATTR_CONTAINER_RUNTIME_VERSION = exports.ATTR_CONTAINER_RUNTIME_NAME = exports.ATTR_CONTAINER_RUNTIME_DESCRIPTION = exports.ATTR_CONTAINER_RUNTIME = exports.ATTR_CONTAINER_NAME = exports.ATTR_CONTAINER_LABELS = exports.ATTR_CONTAINER_LABEL = exports.ATTR_CONTAINER_IMAGE_TAGS = exports.ATTR_CONTAINER_IMAGE_REPO_DIGESTS = exports.ATTR_CONTAINER_IMAGE_NAME = exports.ATTR_CONTAINER_IMAGE_ID = exports.ATTR_CONTAINER_ID = exports.ATTR_CONTAINER_CSI_VOLUME_ID = exports.ATTR_CONTAINER_CSI_PLUGIN_NAME = exports.CONTAINER_CPU_STATE_VALUE_USER = exports.CONTAINER_CPU_STATE_VALUE_SYSTEM = exports.CONTAINER_CPU_STATE_VALUE_KERNEL = exports.ATTR_CONTAINER_CPU_STATE = exports.ATTR_CONTAINER_COMMAND_LINE = exports.ATTR_CONTAINER_COMMAND_ARGS = exports.ATTR_CONTAINER_COMMAND = exports.ATTR_CODE_NAMESPACE = exports.ATTR_CODE_LINENO = exports.ATTR_CODE_FUNCTION = exports.ATTR_CODE_FILEPATH = exports.ATTR_CODE_COLUMN = exports.ATTR_CLOUDFOUNDRY_SYSTEM_INSTANCE_ID = exports.ATTR_CLOUDFOUNDRY_SYSTEM_ID = exports.ATTR_CLOUDFOUNDRY_SPACE_NAME = exports.ATTR_CLOUDFOUNDRY_SPACE_ID = exports.ATTR_CLOUDFOUNDRY_PROCESS_TYPE = exports.ATTR_CLOUDFOUNDRY_PROCESS_ID = void 0;
    exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_UPSERT = exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_REPLACE = exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_READ_FEED = exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_READ = exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_QUERY_PLAN = exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_QUERY = exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_PATCH = exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_INVALID = exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_HEAD_FEED = exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_HEAD = exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_EXECUTE_JAVASCRIPT = exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_EXECUTE = exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_DELETE = exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_CREATE = exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_BATCH = exports.ATTR_DB_COSMOSDB_OPERATION_TYPE = exports.ATTR_DB_COSMOSDB_CONTAINER = exports.DB_COSMOSDB_CONSISTENCY_LEVEL_VALUE_STRONG = exports.DB_COSMOSDB_CONSISTENCY_LEVEL_VALUE_SESSION = exports.DB_COSMOSDB_CONSISTENCY_LEVEL_VALUE_EVENTUAL = exports.DB_COSMOSDB_CONSISTENCY_LEVEL_VALUE_CONSISTENT_PREFIX = exports.DB_COSMOSDB_CONSISTENCY_LEVEL_VALUE_BOUNDED_STALENESS = exports.ATTR_DB_COSMOSDB_CONSISTENCY_LEVEL = exports.DB_COSMOSDB_CONNECTION_MODE_VALUE_GATEWAY = exports.DB_COSMOSDB_CONNECTION_MODE_VALUE_DIRECT = exports.ATTR_DB_COSMOSDB_CONNECTION_MODE = exports.ATTR_DB_COSMOSDB_CLIENT_ID = exports.ATTR_DB_CONNECTION_STRING = exports.DB_CLIENT_CONNECTIONS_STATE_VALUE_USED = exports.DB_CLIENT_CONNECTIONS_STATE_VALUE_IDLE = exports.ATTR_DB_CLIENT_CONNECTIONS_STATE = exports.ATTR_DB_CLIENT_CONNECTIONS_POOL_NAME = exports.DB_CLIENT_CONNECTION_STATE_VALUE_USED = exports.DB_CLIENT_CONNECTION_STATE_VALUE_IDLE = exports.ATTR_DB_CLIENT_CONNECTION_STATE = exports.ATTR_DB_CLIENT_CONNECTION_POOL_NAME = exports.ATTR_DB_CASSANDRA_TABLE = exports.ATTR_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT = exports.ATTR_DB_CASSANDRA_PAGE_SIZE = exports.ATTR_DB_CASSANDRA_IDEMPOTENCE = exports.ATTR_DB_CASSANDRA_COORDINATOR_ID = exports.ATTR_DB_CASSANDRA_COORDINATOR_DC = exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_TWO = exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_THREE = exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_SERIAL = exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_QUORUM = exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_ONE = exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_LOCAL_SERIAL = exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_LOCAL_QUORUM = exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_LOCAL_ONE = void 0;
    exports.DB_SYSTEM_VALUE_INTERBASE = exports.DB_SYSTEM_VALUE_INSTANTDB = exports.DB_SYSTEM_VALUE_INGRES = exports.DB_SYSTEM_VALUE_INFORMIX = exports.DB_SYSTEM_VALUE_INFLUXDB = exports.DB_SYSTEM_VALUE_HSQLDB = exports.DB_SYSTEM_VALUE_HIVE = exports.DB_SYSTEM_VALUE_HBASE = exports.DB_SYSTEM_VALUE_HANADB = exports.DB_SYSTEM_VALUE_H2 = exports.DB_SYSTEM_VALUE_GEODE = exports.DB_SYSTEM_VALUE_FIRSTSQL = exports.DB_SYSTEM_VALUE_FIREBIRD = exports.DB_SYSTEM_VALUE_FILEMAKER = exports.DB_SYSTEM_VALUE_ELASTICSEARCH = exports.DB_SYSTEM_VALUE_EDB = exports.DB_SYSTEM_VALUE_DYNAMODB = exports.DB_SYSTEM_VALUE_DERBY = exports.DB_SYSTEM_VALUE_DB2 = exports.DB_SYSTEM_VALUE_COUCHDB = exports.DB_SYSTEM_VALUE_COUCHBASE = exports.DB_SYSTEM_VALUE_COSMOSDB = exports.DB_SYSTEM_VALUE_COLDFUSION = exports.DB_SYSTEM_VALUE_COCKROACHDB = exports.DB_SYSTEM_VALUE_CLOUDSCAPE = exports.DB_SYSTEM_VALUE_CLICKHOUSE = exports.DB_SYSTEM_VALUE_CASSANDRA = exports.DB_SYSTEM_VALUE_CACHE = exports.DB_SYSTEM_VALUE_ADABAS = exports.ATTR_DB_SYSTEM = exports.ATTR_DB_STATEMENT = exports.ATTR_DB_SQL_TABLE = exports.ATTR_DB_RESPONSE_RETURNED_ROWS = exports.ATTR_DB_REDIS_DATABASE_INDEX = exports.ATTR_DB_QUERY_PARAMETER = exports.ATTR_DB_OPERATION_PARAMETER = exports.ATTR_DB_OPERATION = exports.ATTR_DB_NAME = exports.ATTR_DB_MSSQL_INSTANCE_NAME = exports.ATTR_DB_MONGODB_COLLECTION = exports.ATTR_DB_JDBC_DRIVER_CLASSNAME = exports.ATTR_DB_INSTANCE_ID = exports.ATTR_DB_ELASTICSEARCH_PATH_PARTS = exports.ATTR_DB_ELASTICSEARCH_NODE_NAME = exports.ATTR_DB_ELASTICSEARCH_CLUSTER_NAME = exports.ATTR_DB_COSMOSDB_SUB_STATUS_CODE = exports.ATTR_DB_COSMOSDB_STATUS_CODE = exports.ATTR_DB_COSMOSDB_REQUEST_CONTENT_LENGTH = exports.ATTR_DB_COSMOSDB_REQUEST_CHARGE = exports.ATTR_DB_COSMOSDB_REGIONS_CONTACTED = void 0;
    exports.DB_SYSTEM_NAME_VALUE_MEMCACHED = exports.DB_SYSTEM_NAME_VALUE_INTERSYSTEMS_CACHE = exports.DB_SYSTEM_NAME_VALUE_INSTANTDB = exports.DB_SYSTEM_NAME_VALUE_INFLUXDB = exports.DB_SYSTEM_NAME_VALUE_IBM_NETEZZA = exports.DB_SYSTEM_NAME_VALUE_IBM_INFORMIX = exports.DB_SYSTEM_NAME_VALUE_IBM_DB2 = exports.DB_SYSTEM_NAME_VALUE_HSQLDB = exports.DB_SYSTEM_NAME_VALUE_HIVE = exports.DB_SYSTEM_NAME_VALUE_HBASE = exports.DB_SYSTEM_NAME_VALUE_H2DATABASE = exports.DB_SYSTEM_NAME_VALUE_GEODE = exports.DB_SYSTEM_NAME_VALUE_GCP_SPANNER = exports.DB_SYSTEM_NAME_VALUE_FIREBIRDSQL = exports.DB_SYSTEM_NAME_VALUE_ELASTICSEARCH = exports.DB_SYSTEM_NAME_VALUE_DERBY = exports.DB_SYSTEM_NAME_VALUE_COUCHDB = exports.DB_SYSTEM_NAME_VALUE_COUCHBASE = exports.DB_SYSTEM_NAME_VALUE_COCKROACHDB = exports.DB_SYSTEM_NAME_VALUE_CLICKHOUSE = exports.DB_SYSTEM_NAME_VALUE_CASSANDRA = exports.DB_SYSTEM_NAME_VALUE_AZURE_COSMOSDB = exports.DB_SYSTEM_NAME_VALUE_AWS_REDSHIFT = exports.DB_SYSTEM_NAME_VALUE_AWS_DYNAMODB = exports.DB_SYSTEM_NAME_VALUE_ACTIAN_INGRES = exports.DB_SYSTEM_VALUE_VERTICA = exports.DB_SYSTEM_VALUE_TRINO = exports.DB_SYSTEM_VALUE_TERADATA = exports.DB_SYSTEM_VALUE_SYBASE = exports.DB_SYSTEM_VALUE_SQLITE = exports.DB_SYSTEM_VALUE_SPANNER = exports.DB_SYSTEM_VALUE_REDSHIFT = exports.DB_SYSTEM_VALUE_REDIS = exports.DB_SYSTEM_VALUE_PROGRESS = exports.DB_SYSTEM_VALUE_POSTGRESQL = exports.DB_SYSTEM_VALUE_POINTBASE = exports.DB_SYSTEM_VALUE_PERVASIVE = exports.DB_SYSTEM_VALUE_OTHER_SQL = exports.DB_SYSTEM_VALUE_ORACLE = exports.DB_SYSTEM_VALUE_OPENSEARCH = exports.DB_SYSTEM_VALUE_NETEZZA = exports.DB_SYSTEM_VALUE_NEO4J = exports.DB_SYSTEM_VALUE_MYSQL = exports.DB_SYSTEM_VALUE_MSSQLCOMPACT = exports.DB_SYSTEM_VALUE_MSSQL = exports.DB_SYSTEM_VALUE_MONGODB = exports.DB_SYSTEM_VALUE_MEMCACHED = exports.DB_SYSTEM_VALUE_MAXDB = exports.DB_SYSTEM_VALUE_MARIADB = exports.DB_SYSTEM_VALUE_INTERSYSTEMS_CACHE = void 0;
    exports.ATTR_FAAS_INVOKED_NAME = exports.ATTR_FAAS_INVOCATION_ID = exports.ATTR_FAAS_INSTANCE = exports.ATTR_FAAS_DOCUMENT_TIME = exports.FAAS_DOCUMENT_OPERATION_VALUE_INSERT = exports.FAAS_DOCUMENT_OPERATION_VALUE_EDIT = exports.FAAS_DOCUMENT_OPERATION_VALUE_DELETE = exports.ATTR_FAAS_DOCUMENT_OPERATION = exports.ATTR_FAAS_DOCUMENT_NAME = exports.ATTR_FAAS_DOCUMENT_COLLECTION = exports.ATTR_FAAS_CRON = exports.ATTR_FAAS_COLDSTART = exports.ATTR_EVENT_NAME = exports.ATTR_ERROR_MESSAGE = exports.ATTR_ENDUSER_SCOPE = exports.ATTR_ENDUSER_ROLE = exports.ATTR_ENDUSER_PSEUDO_ID = exports.ATTR_ENDUSER_ID = exports.ATTR_ELASTICSEARCH_NODE_NAME = exports.ATTR_DNS_QUESTION_NAME = exports.ATTR_DNS_ANSWERS = exports.DISK_IO_DIRECTION_VALUE_WRITE = exports.DISK_IO_DIRECTION_VALUE_READ = exports.ATTR_DISK_IO_DIRECTION = exports.ATTR_DEVICE_MODEL_NAME = exports.ATTR_DEVICE_MODEL_IDENTIFIER = exports.ATTR_DEVICE_MANUFACTURER = exports.ATTR_DEVICE_ID = exports.ATTR_DESTINATION_PORT = exports.ATTR_DESTINATION_ADDRESS = exports.DEPLOYMENT_STATUS_VALUE_SUCCEEDED = exports.DEPLOYMENT_STATUS_VALUE_FAILED = exports.ATTR_DEPLOYMENT_STATUS = exports.ATTR_DEPLOYMENT_NAME = exports.ATTR_DEPLOYMENT_ID = exports.ATTR_DEPLOYMENT_ENVIRONMENT_NAME = exports.ATTR_DEPLOYMENT_ENVIRONMENT = exports.ATTR_DB_USER = exports.DB_SYSTEM_NAME_VALUE_TRINO = exports.DB_SYSTEM_NAME_VALUE_TERADATA = exports.DB_SYSTEM_NAME_VALUE_SQLITE = exports.DB_SYSTEM_NAME_VALUE_SOFTWAREAG_ADABAS = exports.DB_SYSTEM_NAME_VALUE_SAP_MAXDB = exports.DB_SYSTEM_NAME_VALUE_SAP_HANA = exports.DB_SYSTEM_NAME_VALUE_REDIS = exports.DB_SYSTEM_NAME_VALUE_OTHER_SQL = exports.DB_SYSTEM_NAME_VALUE_ORACLE_DB = exports.DB_SYSTEM_NAME_VALUE_OPENSEARCH = exports.DB_SYSTEM_NAME_VALUE_NEO4J = exports.DB_SYSTEM_NAME_VALUE_MONGODB = void 0;
    exports.ATTR_FILE_CREATED = exports.ATTR_FILE_CHANGED = exports.ATTR_FILE_ATTRIBUTES = exports.ATTR_FILE_ACCESSED = exports.ATTR_FEATURE_FLAG_VERSION = exports.ATTR_FEATURE_FLAG_VARIANT = exports.ATTR_FEATURE_FLAG_SET_ID = exports.ATTR_FEATURE_FLAG_RESULT_VARIANT = exports.ATTR_FEATURE_FLAG_RESULT_VALUE = exports.FEATURE_FLAG_RESULT_REASON_VALUE_UNKNOWN = exports.FEATURE_FLAG_RESULT_REASON_VALUE_TARGETING_MATCH = exports.FEATURE_FLAG_RESULT_REASON_VALUE_STATIC = exports.FEATURE_FLAG_RESULT_REASON_VALUE_STALE = exports.FEATURE_FLAG_RESULT_REASON_VALUE_SPLIT = exports.FEATURE_FLAG_RESULT_REASON_VALUE_ERROR = exports.FEATURE_FLAG_RESULT_REASON_VALUE_DISABLED = exports.FEATURE_FLAG_RESULT_REASON_VALUE_DEFAULT = exports.FEATURE_FLAG_RESULT_REASON_VALUE_CACHED = exports.ATTR_FEATURE_FLAG_RESULT_REASON = exports.ATTR_FEATURE_FLAG_PROVIDER_NAME = exports.ATTR_FEATURE_FLAG_KEY = exports.FEATURE_FLAG_EVALUATION_REASON_VALUE_UNKNOWN = exports.FEATURE_FLAG_EVALUATION_REASON_VALUE_TARGETING_MATCH = exports.FEATURE_FLAG_EVALUATION_REASON_VALUE_STATIC = exports.FEATURE_FLAG_EVALUATION_REASON_VALUE_STALE = exports.FEATURE_FLAG_EVALUATION_REASON_VALUE_SPLIT = exports.FEATURE_FLAG_EVALUATION_REASON_VALUE_ERROR = exports.FEATURE_FLAG_EVALUATION_REASON_VALUE_DISABLED = exports.FEATURE_FLAG_EVALUATION_REASON_VALUE_DEFAULT = exports.FEATURE_FLAG_EVALUATION_REASON_VALUE_CACHED = exports.ATTR_FEATURE_FLAG_EVALUATION_REASON = exports.ATTR_FEATURE_FLAG_EVALUATION_ERROR_MESSAGE = exports.ATTR_FEATURE_FLAG_CONTEXT_ID = exports.ATTR_FAAS_VERSION = exports.FAAS_TRIGGER_VALUE_TIMER = exports.FAAS_TRIGGER_VALUE_PUBSUB = exports.FAAS_TRIGGER_VALUE_OTHER = exports.FAAS_TRIGGER_VALUE_HTTP = exports.FAAS_TRIGGER_VALUE_DATASOURCE = exports.ATTR_FAAS_TRIGGER = exports.ATTR_FAAS_TIME = exports.ATTR_FAAS_NAME = exports.ATTR_FAAS_MAX_MEMORY = exports.ATTR_FAAS_INVOKED_REGION = exports.FAAS_INVOKED_PROVIDER_VALUE_TENCENT_CLOUD = exports.FAAS_INVOKED_PROVIDER_VALUE_GCP = exports.FAAS_INVOKED_PROVIDER_VALUE_AZURE = exports.FAAS_INVOKED_PROVIDER_VALUE_AWS = exports.FAAS_INVOKED_PROVIDER_VALUE_ALIBABA_CLOUD = exports.ATTR_FAAS_INVOKED_PROVIDER = void 0;
    exports.GCP_APPHUB_DESTINATION_SERVICE_ENVIRONMENT_TYPE_VALUE_PRODUCTION = exports.GCP_APPHUB_DESTINATION_SERVICE_ENVIRONMENT_TYPE_VALUE_DEVELOPMENT = exports.ATTR_GCP_APPHUB_DESTINATION_SERVICE_ENVIRONMENT_TYPE = exports.GCP_APPHUB_DESTINATION_SERVICE_CRITICALITY_TYPE_VALUE_MISSION_CRITICAL = exports.GCP_APPHUB_DESTINATION_SERVICE_CRITICALITY_TYPE_VALUE_MEDIUM = exports.GCP_APPHUB_DESTINATION_SERVICE_CRITICALITY_TYPE_VALUE_LOW = exports.GCP_APPHUB_DESTINATION_SERVICE_CRITICALITY_TYPE_VALUE_HIGH = exports.ATTR_GCP_APPHUB_DESTINATION_SERVICE_CRITICALITY_TYPE = exports.ATTR_GCP_APPHUB_DESTINATION_APPLICATION_LOCATION = exports.ATTR_GCP_APPHUB_DESTINATION_APPLICATION_ID = exports.ATTR_GCP_APPHUB_DESTINATION_APPLICATION_CONTAINER = exports.ATTR_GCP_APPHUB_WORKLOAD_ID = exports.GCP_APPHUB_WORKLOAD_ENVIRONMENT_TYPE_VALUE_TEST = exports.GCP_APPHUB_WORKLOAD_ENVIRONMENT_TYPE_VALUE_STAGING = exports.GCP_APPHUB_WORKLOAD_ENVIRONMENT_TYPE_VALUE_PRODUCTION = exports.GCP_APPHUB_WORKLOAD_ENVIRONMENT_TYPE_VALUE_DEVELOPMENT = exports.ATTR_GCP_APPHUB_WORKLOAD_ENVIRONMENT_TYPE = exports.GCP_APPHUB_WORKLOAD_CRITICALITY_TYPE_VALUE_MISSION_CRITICAL = exports.GCP_APPHUB_WORKLOAD_CRITICALITY_TYPE_VALUE_MEDIUM = exports.GCP_APPHUB_WORKLOAD_CRITICALITY_TYPE_VALUE_LOW = exports.GCP_APPHUB_WORKLOAD_CRITICALITY_TYPE_VALUE_HIGH = exports.ATTR_GCP_APPHUB_WORKLOAD_CRITICALITY_TYPE = exports.ATTR_GCP_APPHUB_SERVICE_ID = exports.GCP_APPHUB_SERVICE_ENVIRONMENT_TYPE_VALUE_TEST = exports.GCP_APPHUB_SERVICE_ENVIRONMENT_TYPE_VALUE_STAGING = exports.GCP_APPHUB_SERVICE_ENVIRONMENT_TYPE_VALUE_PRODUCTION = exports.GCP_APPHUB_SERVICE_ENVIRONMENT_TYPE_VALUE_DEVELOPMENT = exports.ATTR_GCP_APPHUB_SERVICE_ENVIRONMENT_TYPE = exports.GCP_APPHUB_SERVICE_CRITICALITY_TYPE_VALUE_MISSION_CRITICAL = exports.GCP_APPHUB_SERVICE_CRITICALITY_TYPE_VALUE_MEDIUM = exports.GCP_APPHUB_SERVICE_CRITICALITY_TYPE_VALUE_LOW = exports.GCP_APPHUB_SERVICE_CRITICALITY_TYPE_VALUE_HIGH = exports.ATTR_GCP_APPHUB_SERVICE_CRITICALITY_TYPE = exports.ATTR_GCP_APPHUB_APPLICATION_LOCATION = exports.ATTR_GCP_APPHUB_APPLICATION_ID = exports.ATTR_GCP_APPHUB_APPLICATION_CONTAINER = exports.ATTR_FILE_SYMBOLIC_LINK_TARGET_PATH = exports.ATTR_FILE_SIZE = exports.ATTR_FILE_PATH = exports.ATTR_FILE_OWNER_NAME = exports.ATTR_FILE_OWNER_ID = exports.ATTR_FILE_NAME = exports.ATTR_FILE_MODIFIED = exports.ATTR_FILE_MODE = exports.ATTR_FILE_INODE = exports.ATTR_FILE_GROUP_NAME = exports.ATTR_FILE_GROUP_ID = exports.ATTR_FILE_FORK_NAME = exports.ATTR_FILE_EXTENSION = exports.ATTR_FILE_DIRECTORY = void 0;
    exports.ATTR_GEN_AI_OUTPUT_MESSAGES = exports.GEN_AI_OPERATION_NAME_VALUE_TEXT_COMPLETION = exports.GEN_AI_OPERATION_NAME_VALUE_INVOKE_AGENT = exports.GEN_AI_OPERATION_NAME_VALUE_GENERATE_CONTENT = exports.GEN_AI_OPERATION_NAME_VALUE_EXECUTE_TOOL = exports.GEN_AI_OPERATION_NAME_VALUE_EMBEDDINGS = exports.GEN_AI_OPERATION_NAME_VALUE_CREATE_AGENT = exports.GEN_AI_OPERATION_NAME_VALUE_CHAT = exports.ATTR_GEN_AI_OPERATION_NAME = exports.ATTR_GEN_AI_OPENAI_RESPONSE_SYSTEM_FINGERPRINT = exports.ATTR_GEN_AI_OPENAI_RESPONSE_SERVICE_TIER = exports.GEN_AI_OPENAI_REQUEST_SERVICE_TIER_VALUE_DEFAULT = exports.GEN_AI_OPENAI_REQUEST_SERVICE_TIER_VALUE_AUTO = exports.ATTR_GEN_AI_OPENAI_REQUEST_SERVICE_TIER = exports.ATTR_GEN_AI_OPENAI_REQUEST_SEED = exports.GEN_AI_OPENAI_REQUEST_RESPONSE_FORMAT_VALUE_TEXT = exports.GEN_AI_OPENAI_REQUEST_RESPONSE_FORMAT_VALUE_JSON_SCHEMA = exports.GEN_AI_OPENAI_REQUEST_RESPONSE_FORMAT_VALUE_JSON_OBJECT = exports.ATTR_GEN_AI_OPENAI_REQUEST_RESPONSE_FORMAT = exports.ATTR_GEN_AI_INPUT_MESSAGES = exports.ATTR_GEN_AI_EVALUATION_SCORE_VALUE = exports.ATTR_GEN_AI_EVALUATION_SCORE_LABEL = exports.ATTR_GEN_AI_EVALUATION_NAME = exports.ATTR_GEN_AI_EVALUATION_EXPLANATION = exports.ATTR_GEN_AI_EMBEDDINGS_DIMENSION_COUNT = exports.ATTR_GEN_AI_DATA_SOURCE_ID = exports.ATTR_GEN_AI_CONVERSATION_ID = exports.ATTR_GEN_AI_COMPLETION = exports.ATTR_GEN_AI_AGENT_NAME = exports.ATTR_GEN_AI_AGENT_ID = exports.ATTR_GEN_AI_AGENT_DESCRIPTION = exports.ATTR_GCP_GCE_INSTANCE_NAME = exports.ATTR_GCP_GCE_INSTANCE_HOSTNAME = exports.ATTR_GCP_CLOUD_RUN_JOB_TASK_INDEX = exports.ATTR_GCP_CLOUD_RUN_JOB_EXECUTION = exports.ATTR_GCP_CLIENT_SERVICE = exports.ATTR_GCP_APPHUB_DESTINATION_WORKLOAD_ID = exports.GCP_APPHUB_DESTINATION_WORKLOAD_ENVIRONMENT_TYPE_VALUE_TEST = exports.GCP_APPHUB_DESTINATION_WORKLOAD_ENVIRONMENT_TYPE_VALUE_STAGING = exports.GCP_APPHUB_DESTINATION_WORKLOAD_ENVIRONMENT_TYPE_VALUE_PRODUCTION = exports.GCP_APPHUB_DESTINATION_WORKLOAD_ENVIRONMENT_TYPE_VALUE_DEVELOPMENT = exports.ATTR_GCP_APPHUB_DESTINATION_WORKLOAD_ENVIRONMENT_TYPE = exports.GCP_APPHUB_DESTINATION_WORKLOAD_CRITICALITY_TYPE_VALUE_MISSION_CRITICAL = exports.GCP_APPHUB_DESTINATION_WORKLOAD_CRITICALITY_TYPE_VALUE_MEDIUM = exports.GCP_APPHUB_DESTINATION_WORKLOAD_CRITICALITY_TYPE_VALUE_LOW = exports.GCP_APPHUB_DESTINATION_WORKLOAD_CRITICALITY_TYPE_VALUE_HIGH = exports.ATTR_GCP_APPHUB_DESTINATION_WORKLOAD_CRITICALITY_TYPE = exports.ATTR_GCP_APPHUB_DESTINATION_SERVICE_ID = exports.GCP_APPHUB_DESTINATION_SERVICE_ENVIRONMENT_TYPE_VALUE_TEST = exports.GCP_APPHUB_DESTINATION_SERVICE_ENVIRONMENT_TYPE_VALUE_STAGING = void 0;
    exports.GEN_AI_SYSTEM_VALUE_GEMINI = exports.GEN_AI_SYSTEM_VALUE_GCP_VERTEX_AI = exports.GEN_AI_SYSTEM_VALUE_GCP_GEN_AI = exports.GEN_AI_SYSTEM_VALUE_GCP_GEMINI = exports.GEN_AI_SYSTEM_VALUE_DEEPSEEK = exports.GEN_AI_SYSTEM_VALUE_COHERE = exports.GEN_AI_SYSTEM_VALUE_AZURE_AI_OPENAI = exports.GEN_AI_SYSTEM_VALUE_AZURE_AI_INFERENCE = exports.GEN_AI_SYSTEM_VALUE_AZ_AI_OPENAI = exports.GEN_AI_SYSTEM_VALUE_AZ_AI_INFERENCE = exports.GEN_AI_SYSTEM_VALUE_AWS_BEDROCK = exports.GEN_AI_SYSTEM_VALUE_ANTHROPIC = exports.ATTR_GEN_AI_SYSTEM = exports.ATTR_GEN_AI_RESPONSE_MODEL = exports.ATTR_GEN_AI_RESPONSE_ID = exports.ATTR_GEN_AI_RESPONSE_FINISH_REASONS = exports.ATTR_GEN_AI_REQUEST_TOP_P = exports.ATTR_GEN_AI_REQUEST_TOP_K = exports.ATTR_GEN_AI_REQUEST_TEMPERATURE = exports.ATTR_GEN_AI_REQUEST_STOP_SEQUENCES = exports.ATTR_GEN_AI_REQUEST_SEED = exports.ATTR_GEN_AI_REQUEST_PRESENCE_PENALTY = exports.ATTR_GEN_AI_REQUEST_MODEL = exports.ATTR_GEN_AI_REQUEST_MAX_TOKENS = exports.ATTR_GEN_AI_REQUEST_FREQUENCY_PENALTY = exports.ATTR_GEN_AI_REQUEST_ENCODING_FORMATS = exports.ATTR_GEN_AI_REQUEST_CHOICE_COUNT = exports.GEN_AI_PROVIDER_NAME_VALUE_X_AI = exports.GEN_AI_PROVIDER_NAME_VALUE_PERPLEXITY = exports.GEN_AI_PROVIDER_NAME_VALUE_OPENAI = exports.GEN_AI_PROVIDER_NAME_VALUE_MISTRAL_AI = exports.GEN_AI_PROVIDER_NAME_VALUE_IBM_WATSONX_AI = exports.GEN_AI_PROVIDER_NAME_VALUE_GROQ = exports.GEN_AI_PROVIDER_NAME_VALUE_GCP_VERTEX_AI = exports.GEN_AI_PROVIDER_NAME_VALUE_GCP_GEN_AI = exports.GEN_AI_PROVIDER_NAME_VALUE_GCP_GEMINI = exports.GEN_AI_PROVIDER_NAME_VALUE_DEEPSEEK = exports.GEN_AI_PROVIDER_NAME_VALUE_COHERE = exports.GEN_AI_PROVIDER_NAME_VALUE_AZURE_AI_OPENAI = exports.GEN_AI_PROVIDER_NAME_VALUE_AZURE_AI_INFERENCE = exports.GEN_AI_PROVIDER_NAME_VALUE_AWS_BEDROCK = exports.GEN_AI_PROVIDER_NAME_VALUE_ANTHROPIC = exports.ATTR_GEN_AI_PROVIDER_NAME = exports.ATTR_GEN_AI_PROMPT_NAME = exports.ATTR_GEN_AI_PROMPT = exports.GEN_AI_OUTPUT_TYPE_VALUE_TEXT = exports.GEN_AI_OUTPUT_TYPE_VALUE_SPEECH = exports.GEN_AI_OUTPUT_TYPE_VALUE_JSON = exports.GEN_AI_OUTPUT_TYPE_VALUE_IMAGE = exports.ATTR_GEN_AI_OUTPUT_TYPE = void 0;
    exports.ATTR_HOST_ARCH = exports.ATTR_HEROKU_RELEASE_CREATION_TIMESTAMP = exports.ATTR_HEROKU_RELEASE_COMMIT = exports.ATTR_HEROKU_APP_ID = exports.GRAPHQL_OPERATION_TYPE_VALUE_SUBSCRIPTION = exports.GRAPHQL_OPERATION_TYPE_VALUE_QUERY = exports.GRAPHQL_OPERATION_TYPE_VALUE_MUTATION = exports.ATTR_GRAPHQL_OPERATION_TYPE = exports.ATTR_GRAPHQL_OPERATION_NAME = exports.ATTR_GRAPHQL_DOCUMENT = exports.GO_MEMORY_TYPE_VALUE_STACK = exports.GO_MEMORY_TYPE_VALUE_OTHER = exports.ATTR_GO_MEMORY_TYPE = exports.ATTR_GEO_REGION_ISO_CODE = exports.ATTR_GEO_POSTAL_CODE = exports.ATTR_GEO_LOCATION_LON = exports.ATTR_GEO_LOCATION_LAT = exports.ATTR_GEO_LOCALITY_NAME = exports.ATTR_GEO_COUNTRY_ISO_CODE = exports.GEO_CONTINENT_CODE_VALUE_SA = exports.GEO_CONTINENT_CODE_VALUE_OC = exports.GEO_CONTINENT_CODE_VALUE_NA = exports.GEO_CONTINENT_CODE_VALUE_EU = exports.GEO_CONTINENT_CODE_VALUE_AS = exports.GEO_CONTINENT_CODE_VALUE_AN = exports.GEO_CONTINENT_CODE_VALUE_AF = exports.ATTR_GEO_CONTINENT_CODE = exports.ATTR_GEN_AI_USAGE_PROMPT_TOKENS = exports.ATTR_GEN_AI_USAGE_OUTPUT_TOKENS = exports.ATTR_GEN_AI_USAGE_INPUT_TOKENS = exports.ATTR_GEN_AI_USAGE_COMPLETION_TOKENS = exports.ATTR_GEN_AI_TOOL_TYPE = exports.ATTR_GEN_AI_TOOL_NAME = exports.ATTR_GEN_AI_TOOL_DESCRIPTION = exports.ATTR_GEN_AI_TOOL_DEFINITIONS = exports.ATTR_GEN_AI_TOOL_CALL_RESULT = exports.ATTR_GEN_AI_TOOL_CALL_ID = exports.ATTR_GEN_AI_TOOL_CALL_ARGUMENTS = exports.GEN_AI_TOKEN_TYPE_VALUE_OUTPUT = exports.GEN_AI_TOKEN_TYPE_VALUE_COMPLETION = exports.GEN_AI_TOKEN_TYPE_VALUE_INPUT = exports.ATTR_GEN_AI_TOKEN_TYPE = exports.ATTR_GEN_AI_SYSTEM_INSTRUCTIONS = exports.GEN_AI_SYSTEM_VALUE_XAI = exports.GEN_AI_SYSTEM_VALUE_VERTEX_AI = exports.GEN_AI_SYSTEM_VALUE_PERPLEXITY = exports.GEN_AI_SYSTEM_VALUE_OPENAI = exports.GEN_AI_SYSTEM_VALUE_MISTRAL_AI = exports.GEN_AI_SYSTEM_VALUE_IBM_WATSONX_AI = exports.GEN_AI_SYSTEM_VALUE_GROQ = void 0;
    exports.ATTR_HTTP_USER_AGENT = exports.ATTR_HTTP_URL = exports.ATTR_HTTP_TARGET = exports.ATTR_HTTP_STATUS_CODE = exports.ATTR_HTTP_SERVER_NAME = exports.ATTR_HTTP_SCHEME = exports.ATTR_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED = exports.ATTR_HTTP_RESPONSE_CONTENT_LENGTH = exports.ATTR_HTTP_RESPONSE_SIZE = exports.ATTR_HTTP_RESPONSE_BODY_SIZE = exports.ATTR_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED = exports.ATTR_HTTP_REQUEST_CONTENT_LENGTH = exports.ATTR_HTTP_REQUEST_SIZE = exports.HTTP_REQUEST_METHOD_VALUE_QUERY = exports.ATTR_HTTP_REQUEST_BODY_SIZE = exports.ATTR_HTTP_METHOD = exports.ATTR_HTTP_HOST = exports.HTTP_FLAVOR_VALUE_SPDY = exports.HTTP_FLAVOR_VALUE_QUIC = exports.HTTP_FLAVOR_VALUE_HTTP_3_0 = exports.HTTP_FLAVOR_VALUE_HTTP_2_0 = exports.HTTP_FLAVOR_VALUE_HTTP_1_1 = exports.HTTP_FLAVOR_VALUE_HTTP_1_0 = exports.ATTR_HTTP_FLAVOR = exports.HTTP_CONNECTION_STATE_VALUE_IDLE = exports.HTTP_CONNECTION_STATE_VALUE_ACTIVE = exports.ATTR_HTTP_CONNECTION_STATE = exports.ATTR_HTTP_CLIENT_IP = exports.ATTR_HOST_TYPE = exports.ATTR_HOST_NAME = exports.ATTR_HOST_MAC = exports.ATTR_HOST_IP = exports.ATTR_HOST_IMAGE_VERSION = exports.ATTR_HOST_IMAGE_NAME = exports.ATTR_HOST_IMAGE_ID = exports.ATTR_HOST_ID = exports.ATTR_HOST_CPU_VENDOR_ID = exports.ATTR_HOST_CPU_STEPPING = exports.ATTR_HOST_CPU_MODEL_NAME = exports.ATTR_HOST_CPU_MODEL_ID = exports.ATTR_HOST_CPU_FAMILY = exports.ATTR_HOST_CPU_CACHE_L2_SIZE = exports.HOST_ARCH_VALUE_X86 = exports.HOST_ARCH_VALUE_S390X = exports.HOST_ARCH_VALUE_PPC64 = exports.HOST_ARCH_VALUE_PPC32 = exports.HOST_ARCH_VALUE_IA64 = exports.HOST_ARCH_VALUE_ARM64 = exports.HOST_ARCH_VALUE_ARM32 = exports.HOST_ARCH_VALUE_AMD64 = void 0;
    exports.HW_TAPE_DRIVE_OPERATION_TYPE_VALUE_UNMOUNT = exports.HW_TAPE_DRIVE_OPERATION_TYPE_VALUE_MOUNT = exports.HW_TAPE_DRIVE_OPERATION_TYPE_VALUE_CLEAN = exports.ATTR_HW_TAPE_DRIVE_OPERATION_TYPE = exports.HW_STATE_VALUE_PREDICTED_FAILURE = exports.HW_STATE_VALUE_OK = exports.HW_STATE_VALUE_NEEDS_CLEANING = exports.HW_STATE_VALUE_FAILED = exports.HW_STATE_VALUE_DEGRADED = exports.ATTR_HW_STATE = exports.ATTR_HW_SERIAL_NUMBER = exports.ATTR_HW_SENSOR_LOCATION = exports.ATTR_HW_PHYSICAL_DISK_TYPE = exports.HW_PHYSICAL_DISK_STATE_VALUE_REMAINING = exports.ATTR_HW_PHYSICAL_DISK_STATE = exports.ATTR_HW_PHYSICAL_DISK_SMART_ATTRIBUTE = exports.ATTR_HW_PARENT = exports.ATTR_HW_NETWORK_PHYSICAL_ADDRESS = exports.ATTR_HW_NETWORK_LOGICAL_ADDRESSES = exports.ATTR_HW_NAME = exports.ATTR_HW_MODEL = exports.ATTR_HW_MEMORY_TYPE = exports.HW_LOGICAL_DISK_STATE_VALUE_USED = exports.HW_LOGICAL_DISK_STATE_VALUE_FREE = exports.ATTR_HW_LOGICAL_DISK_STATE = exports.ATTR_HW_LOGICAL_DISK_RAID_LEVEL = exports.HW_LIMIT_TYPE_VALUE_TURBO = exports.HW_LIMIT_TYPE_VALUE_THROTTLED = exports.HW_LIMIT_TYPE_VALUE_MAX = exports.HW_LIMIT_TYPE_VALUE_LOW_DEGRADED = exports.HW_LIMIT_TYPE_VALUE_LOW_CRITICAL = exports.HW_LIMIT_TYPE_VALUE_HIGH_DEGRADED = exports.HW_LIMIT_TYPE_VALUE_HIGH_CRITICAL = exports.HW_LIMIT_TYPE_VALUE_DEGRADED = exports.HW_LIMIT_TYPE_VALUE_CRITICAL = exports.ATTR_HW_LIMIT_TYPE = exports.ATTR_HW_ID = exports.HW_GPU_TASK_VALUE_GENERAL = exports.HW_GPU_TASK_VALUE_ENCODER = exports.HW_GPU_TASK_VALUE_DECODER = exports.ATTR_HW_GPU_TASK = exports.ATTR_HW_FIRMWARE_VERSION = exports.ATTR_HW_ENCLOSURE_TYPE = exports.ATTR_HW_DRIVER_VERSION = exports.ATTR_HW_BIOS_VERSION = exports.HW_BATTERY_STATE_VALUE_DISCHARGING = exports.HW_BATTERY_STATE_VALUE_CHARGING = exports.ATTR_HW_BATTERY_STATE = exports.ATTR_HW_BATTERY_CHEMISTRY = exports.ATTR_HW_BATTERY_CAPACITY = void 0;
    exports.K8S_CONTAINER_STATUS_STATE_VALUE_TERMINATED = exports.K8S_CONTAINER_STATUS_STATE_VALUE_RUNNING = exports.ATTR_K8S_CONTAINER_STATUS_STATE = exports.K8S_CONTAINER_STATUS_REASON_VALUE_OOM_KILLED = exports.K8S_CONTAINER_STATUS_REASON_VALUE_IMAGE_PULL_BACK_OFF = exports.K8S_CONTAINER_STATUS_REASON_VALUE_ERROR = exports.K8S_CONTAINER_STATUS_REASON_VALUE_ERR_IMAGE_PULL = exports.K8S_CONTAINER_STATUS_REASON_VALUE_CREATE_CONTAINER_CONFIG_ERROR = exports.K8S_CONTAINER_STATUS_REASON_VALUE_CRASH_LOOP_BACK_OFF = exports.K8S_CONTAINER_STATUS_REASON_VALUE_CONTAINER_CREATING = exports.K8S_CONTAINER_STATUS_REASON_VALUE_CONTAINER_CANNOT_RUN = exports.K8S_CONTAINER_STATUS_REASON_VALUE_COMPLETED = exports.ATTR_K8S_CONTAINER_STATUS_REASON = exports.ATTR_K8S_CONTAINER_STATUS_LAST_TERMINATED_REASON = exports.ATTR_K8S_CONTAINER_RESTART_COUNT = exports.ATTR_K8S_CONTAINER_NAME = exports.ATTR_K8S_CLUSTER_UID = exports.ATTR_K8S_CLUSTER_NAME = exports.ATTR_JVM_GC_CAUSE = exports.ATTR_JVM_BUFFER_POOL_NAME = exports.ATTR_JSONRPC_REQUEST_ID = exports.ATTR_JSONRPC_PROTOCOL_VERSION = exports.IOS_STATE_VALUE_TERMINATE = exports.IOS_STATE_VALUE_INACTIVE = exports.IOS_STATE_VALUE_FOREGROUND = exports.IOS_STATE_VALUE_BACKGROUND = exports.IOS_STATE_VALUE_ACTIVE = exports.ATTR_IOS_STATE = exports.IOS_APP_STATE_VALUE_TERMINATE = exports.IOS_APP_STATE_VALUE_INACTIVE = exports.IOS_APP_STATE_VALUE_FOREGROUND = exports.IOS_APP_STATE_VALUE_BACKGROUND = exports.IOS_APP_STATE_VALUE_ACTIVE = exports.ATTR_IOS_APP_STATE = exports.ATTR_HW_VENDOR = exports.HW_TYPE_VALUE_VOLTAGE = exports.HW_TYPE_VALUE_TEMPERATURE = exports.HW_TYPE_VALUE_TAPE_DRIVE = exports.HW_TYPE_VALUE_POWER_SUPPLY = exports.HW_TYPE_VALUE_PHYSICAL_DISK = exports.HW_TYPE_VALUE_NETWORK = exports.HW_TYPE_VALUE_MEMORY = exports.HW_TYPE_VALUE_LOGICAL_DISK = exports.HW_TYPE_VALUE_GPU = exports.HW_TYPE_VALUE_FAN = exports.HW_TYPE_VALUE_ENCLOSURE = exports.HW_TYPE_VALUE_DISK_CONTROLLER = exports.HW_TYPE_VALUE_CPU = exports.HW_TYPE_VALUE_BATTERY = exports.ATTR_HW_TYPE = void 0;
    exports.ATTR_K8S_POD_NAME = exports.ATTR_K8S_POD_LABELS = exports.ATTR_K8S_POD_LABEL = exports.ATTR_K8S_POD_IP = exports.ATTR_K8S_POD_HOSTNAME = exports.ATTR_K8S_POD_ANNOTATION = exports.ATTR_K8S_NODE_UID = exports.ATTR_K8S_NODE_NAME = exports.ATTR_K8S_NODE_LABEL = exports.K8S_NODE_CONDITION_TYPE_VALUE_READY = exports.K8S_NODE_CONDITION_TYPE_VALUE_PID_PRESSURE = exports.K8S_NODE_CONDITION_TYPE_VALUE_NETWORK_UNAVAILABLE = exports.K8S_NODE_CONDITION_TYPE_VALUE_MEMORY_PRESSURE = exports.K8S_NODE_CONDITION_TYPE_VALUE_DISK_PRESSURE = exports.ATTR_K8S_NODE_CONDITION_TYPE = exports.K8S_NODE_CONDITION_STATUS_VALUE_CONDITION_UNKNOWN = exports.K8S_NODE_CONDITION_STATUS_VALUE_CONDITION_TRUE = exports.K8S_NODE_CONDITION_STATUS_VALUE_CONDITION_FALSE = exports.ATTR_K8S_NODE_CONDITION_STATUS = exports.ATTR_K8S_NODE_ANNOTATION = exports.K8S_NAMESPACE_PHASE_VALUE_TERMINATING = exports.K8S_NAMESPACE_PHASE_VALUE_ACTIVE = exports.ATTR_K8S_NAMESPACE_PHASE = exports.ATTR_K8S_NAMESPACE_NAME = exports.ATTR_K8S_NAMESPACE_LABEL = exports.ATTR_K8S_NAMESPACE_ANNOTATION = exports.ATTR_K8S_JOB_UID = exports.ATTR_K8S_JOB_NAME = exports.ATTR_K8S_JOB_LABEL = exports.ATTR_K8S_JOB_ANNOTATION = exports.ATTR_K8S_HUGEPAGE_SIZE = exports.ATTR_K8S_HPA_UID = exports.ATTR_K8S_HPA_SCALETARGETREF_NAME = exports.ATTR_K8S_HPA_SCALETARGETREF_KIND = exports.ATTR_K8S_HPA_SCALETARGETREF_API_VERSION = exports.ATTR_K8S_HPA_NAME = exports.ATTR_K8S_HPA_METRIC_TYPE = exports.ATTR_K8S_DEPLOYMENT_UID = exports.ATTR_K8S_DEPLOYMENT_NAME = exports.ATTR_K8S_DEPLOYMENT_LABEL = exports.ATTR_K8S_DEPLOYMENT_ANNOTATION = exports.ATTR_K8S_DAEMONSET_UID = exports.ATTR_K8S_DAEMONSET_NAME = exports.ATTR_K8S_DAEMONSET_LABEL = exports.ATTR_K8S_DAEMONSET_ANNOTATION = exports.ATTR_K8S_CRONJOB_UID = exports.ATTR_K8S_CRONJOB_NAME = exports.ATTR_K8S_CRONJOB_LABEL = exports.ATTR_K8S_CRONJOB_ANNOTATION = exports.K8S_CONTAINER_STATUS_STATE_VALUE_WAITING = void 0;
    exports.ATTR_MCP_METHOD_NAME = exports.ATTR_MAINFRAME_LPAR_NAME = exports.ATTR_LOG_RECORD_UID = exports.ATTR_LOG_RECORD_ORIGINAL = exports.LOG_IOSTREAM_VALUE_STDOUT = exports.LOG_IOSTREAM_VALUE_STDERR = exports.ATTR_LOG_IOSTREAM = exports.ATTR_LOG_FILE_PATH_RESOLVED = exports.ATTR_LOG_FILE_PATH = exports.ATTR_LOG_FILE_NAME_RESOLVED = exports.ATTR_LOG_FILE_NAME = exports.LINUX_MEMORY_SLAB_STATE_VALUE_UNRECLAIMABLE = exports.LINUX_MEMORY_SLAB_STATE_VALUE_RECLAIMABLE = exports.ATTR_LINUX_MEMORY_SLAB_STATE = exports.K8S_VOLUME_TYPE_VALUE_SECRET = exports.K8S_VOLUME_TYPE_VALUE_PERSISTENT_VOLUME_CLAIM = exports.K8S_VOLUME_TYPE_VALUE_LOCAL = exports.K8S_VOLUME_TYPE_VALUE_EMPTY_DIR = exports.K8S_VOLUME_TYPE_VALUE_DOWNWARD_API = exports.K8S_VOLUME_TYPE_VALUE_CONFIG_MAP = exports.ATTR_K8S_VOLUME_TYPE = exports.ATTR_K8S_VOLUME_NAME = exports.ATTR_K8S_STORAGECLASS_NAME = exports.ATTR_K8S_STATEFULSET_UID = exports.ATTR_K8S_STATEFULSET_NAME = exports.ATTR_K8S_STATEFULSET_LABEL = exports.ATTR_K8S_STATEFULSET_ANNOTATION = exports.ATTR_K8S_RESOURCEQUOTA_UID = exports.ATTR_K8S_RESOURCEQUOTA_RESOURCE_NAME = exports.ATTR_K8S_RESOURCEQUOTA_NAME = exports.ATTR_K8S_REPLICATIONCONTROLLER_UID = exports.ATTR_K8S_REPLICATIONCONTROLLER_NAME = exports.ATTR_K8S_REPLICASET_UID = exports.ATTR_K8S_REPLICASET_NAME = exports.ATTR_K8S_REPLICASET_LABEL = exports.ATTR_K8S_REPLICASET_ANNOTATION = exports.ATTR_K8S_POD_UID = exports.K8S_POD_STATUS_REASON_VALUE_UNEXPECTED_ADMISSION_ERROR = exports.K8S_POD_STATUS_REASON_VALUE_SHUTDOWN = exports.K8S_POD_STATUS_REASON_VALUE_NODE_LOST = exports.K8S_POD_STATUS_REASON_VALUE_NODE_AFFINITY = exports.K8S_POD_STATUS_REASON_VALUE_EVICTED = exports.ATTR_K8S_POD_STATUS_REASON = exports.K8S_POD_STATUS_PHASE_VALUE_UNKNOWN = exports.K8S_POD_STATUS_PHASE_VALUE_SUCCEEDED = exports.K8S_POD_STATUS_PHASE_VALUE_RUNNING = exports.K8S_POD_STATUS_PHASE_VALUE_PENDING = exports.K8S_POD_STATUS_PHASE_VALUE_FAILED = exports.ATTR_K8S_POD_STATUS_PHASE = exports.ATTR_K8S_POD_START_TIME = void 0;
    exports.ATTR_MESSAGING_GCP_PUBSUB_MESSAGE_DELIVERY_ATTEMPT = exports.ATTR_MESSAGING_GCP_PUBSUB_MESSAGE_ACK_ID = exports.ATTR_MESSAGING_GCP_PUBSUB_MESSAGE_ACK_DEADLINE = exports.ATTR_MESSAGING_EVENTHUBS_MESSAGE_ENQUEUED_TIME = exports.ATTR_MESSAGING_EVENTHUBS_CONSUMER_GROUP = exports.ATTR_MESSAGING_DESTINATION_PUBLISH_NAME = exports.ATTR_MESSAGING_DESTINATION_PUBLISH_ANONYMOUS = exports.ATTR_MESSAGING_DESTINATION_TEMPORARY = exports.ATTR_MESSAGING_DESTINATION_TEMPLATE = exports.ATTR_MESSAGING_DESTINATION_SUBSCRIPTION_NAME = exports.ATTR_MESSAGING_DESTINATION_PARTITION_ID = exports.ATTR_MESSAGING_DESTINATION_NAME = exports.ATTR_MESSAGING_DESTINATION_ANONYMOUS = exports.ATTR_MESSAGING_CONSUMER_GROUP_NAME = exports.ATTR_MESSAGING_CLIENT_ID = exports.ATTR_MESSAGING_BATCH_MESSAGE_COUNT = exports.ATTR_MESSAGE_UNCOMPRESSED_SIZE = exports.MESSAGE_TYPE_VALUE_SENT = exports.MESSAGE_TYPE_VALUE_RECEIVED = exports.ATTR_MESSAGE_TYPE = exports.ATTR_MESSAGE_ID = exports.ATTR_MESSAGE_COMPRESSED_SIZE = exports.ATTR_MCP_SESSION_ID = exports.ATTR_MCP_RESOURCE_URI = exports.ATTR_MCP_PROTOCOL_VERSION = exports.MCP_METHOD_NAME_VALUE_TOOLS_LIST = exports.MCP_METHOD_NAME_VALUE_TOOLS_CALL = exports.MCP_METHOD_NAME_VALUE_SAMPLING_CREATE_MESSAGE = exports.MCP_METHOD_NAME_VALUE_ROOTS_LIST = exports.MCP_METHOD_NAME_VALUE_RESOURCES_UNSUBSCRIBE = exports.MCP_METHOD_NAME_VALUE_RESOURCES_TEMPLATES_LIST = exports.MCP_METHOD_NAME_VALUE_RESOURCES_SUBSCRIBE = exports.MCP_METHOD_NAME_VALUE_RESOURCES_READ = exports.MCP_METHOD_NAME_VALUE_RESOURCES_LIST = exports.MCP_METHOD_NAME_VALUE_PROMPTS_LIST = exports.MCP_METHOD_NAME_VALUE_PROMPTS_GET = exports.MCP_METHOD_NAME_VALUE_PING = exports.MCP_METHOD_NAME_VALUE_NOTIFICATIONS_TOOLS_LIST_CHANGED = exports.MCP_METHOD_NAME_VALUE_NOTIFICATIONS_ROOTS_LIST_CHANGED = exports.MCP_METHOD_NAME_VALUE_NOTIFICATIONS_RESOURCES_UPDATED = exports.MCP_METHOD_NAME_VALUE_NOTIFICATIONS_RESOURCES_LIST_CHANGED = exports.MCP_METHOD_NAME_VALUE_NOTIFICATIONS_PROMPTS_LIST_CHANGED = exports.MCP_METHOD_NAME_VALUE_NOTIFICATIONS_PROGRESS = exports.MCP_METHOD_NAME_VALUE_NOTIFICATIONS_MESSAGE = exports.MCP_METHOD_NAME_VALUE_NOTIFICATIONS_INITIALIZED = exports.MCP_METHOD_NAME_VALUE_NOTIFICATIONS_CANCELLED = exports.MCP_METHOD_NAME_VALUE_LOGGING_SET_LEVEL = exports.MCP_METHOD_NAME_VALUE_INITIALIZE = exports.MCP_METHOD_NAME_VALUE_ELICITATION_CREATE = exports.MCP_METHOD_NAME_VALUE_COMPLETION_COMPLETE = void 0;
    exports.MESSAGING_SYSTEM_VALUE_AWS_SQS = exports.MESSAGING_SYSTEM_VALUE_AWS_SNS = exports.MESSAGING_SYSTEM_VALUE_ACTIVEMQ = exports.ATTR_MESSAGING_SYSTEM = exports.ATTR_MESSAGING_SERVICEBUS_MESSAGE_ENQUEUED_TIME = exports.ATTR_MESSAGING_SERVICEBUS_MESSAGE_DELIVERY_COUNT = exports.MESSAGING_SERVICEBUS_DISPOSITION_STATUS_VALUE_DEFER = exports.MESSAGING_SERVICEBUS_DISPOSITION_STATUS_VALUE_DEAD_LETTER = exports.MESSAGING_SERVICEBUS_DISPOSITION_STATUS_VALUE_COMPLETE = exports.MESSAGING_SERVICEBUS_DISPOSITION_STATUS_VALUE_ABANDON = exports.ATTR_MESSAGING_SERVICEBUS_DISPOSITION_STATUS = exports.ATTR_MESSAGING_SERVICEBUS_DESTINATION_SUBSCRIPTION_NAME = exports.ATTR_MESSAGING_ROCKETMQ_NAMESPACE = exports.MESSAGING_ROCKETMQ_MESSAGE_TYPE_VALUE_TRANSACTION = exports.MESSAGING_ROCKETMQ_MESSAGE_TYPE_VALUE_NORMAL = exports.MESSAGING_ROCKETMQ_MESSAGE_TYPE_VALUE_FIFO = exports.MESSAGING_ROCKETMQ_MESSAGE_TYPE_VALUE_DELAY = exports.ATTR_MESSAGING_ROCKETMQ_MESSAGE_TYPE = exports.ATTR_MESSAGING_ROCKETMQ_MESSAGE_TAG = exports.ATTR_MESSAGING_ROCKETMQ_MESSAGE_KEYS = exports.ATTR_MESSAGING_ROCKETMQ_MESSAGE_GROUP = exports.ATTR_MESSAGING_ROCKETMQ_MESSAGE_DELIVERY_TIMESTAMP = exports.ATTR_MESSAGING_ROCKETMQ_MESSAGE_DELAY_TIME_LEVEL = exports.MESSAGING_ROCKETMQ_CONSUMPTION_MODEL_VALUE_CLUSTERING = exports.MESSAGING_ROCKETMQ_CONSUMPTION_MODEL_VALUE_BROADCASTING = exports.ATTR_MESSAGING_ROCKETMQ_CONSUMPTION_MODEL = exports.ATTR_MESSAGING_ROCKETMQ_CLIENT_GROUP = exports.ATTR_MESSAGING_RABBITMQ_MESSAGE_DELIVERY_TAG = exports.ATTR_MESSAGING_RABBITMQ_DESTINATION_ROUTING_KEY = exports.MESSAGING_OPERATION_TYPE_VALUE_SETTLE = exports.MESSAGING_OPERATION_TYPE_VALUE_SEND = exports.MESSAGING_OPERATION_TYPE_VALUE_RECEIVE = exports.MESSAGING_OPERATION_TYPE_VALUE_PUBLISH = exports.MESSAGING_OPERATION_TYPE_VALUE_PROCESS = exports.MESSAGING_OPERATION_TYPE_VALUE_DELIVER = exports.MESSAGING_OPERATION_TYPE_VALUE_CREATE = exports.ATTR_MESSAGING_OPERATION_TYPE = exports.ATTR_MESSAGING_OPERATION_NAME = exports.ATTR_MESSAGING_OPERATION = exports.ATTR_MESSAGING_MESSAGE_ID = exports.ATTR_MESSAGING_MESSAGE_ENVELOPE_SIZE = exports.ATTR_MESSAGING_MESSAGE_CONVERSATION_ID = exports.ATTR_MESSAGING_MESSAGE_BODY_SIZE = exports.ATTR_MESSAGING_KAFKA_OFFSET = exports.ATTR_MESSAGING_KAFKA_MESSAGE_TOMBSTONE = exports.ATTR_MESSAGING_KAFKA_MESSAGE_OFFSET = exports.ATTR_MESSAGING_KAFKA_MESSAGE_KEY = exports.ATTR_MESSAGING_KAFKA_DESTINATION_PARTITION = exports.ATTR_MESSAGING_KAFKA_CONSUMER_GROUP = exports.ATTR_MESSAGING_GCP_PUBSUB_MESSAGE_ORDERING_KEY = void 0;
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_CDMA = exports.ATTR_NETWORK_CONNECTION_SUBTYPE = exports.NETWORK_CONNECTION_STATE_VALUE_TIME_WAIT = exports.NETWORK_CONNECTION_STATE_VALUE_SYN_SENT = exports.NETWORK_CONNECTION_STATE_VALUE_SYN_RECEIVED = exports.NETWORK_CONNECTION_STATE_VALUE_LISTEN = exports.NETWORK_CONNECTION_STATE_VALUE_LAST_ACK = exports.NETWORK_CONNECTION_STATE_VALUE_FIN_WAIT_2 = exports.NETWORK_CONNECTION_STATE_VALUE_FIN_WAIT_1 = exports.NETWORK_CONNECTION_STATE_VALUE_ESTABLISHED = exports.NETWORK_CONNECTION_STATE_VALUE_CLOSING = exports.NETWORK_CONNECTION_STATE_VALUE_CLOSED = exports.NETWORK_CONNECTION_STATE_VALUE_CLOSE_WAIT = exports.ATTR_NETWORK_CONNECTION_STATE = exports.ATTR_NETWORK_CARRIER_NAME = exports.ATTR_NETWORK_CARRIER_MNC = exports.ATTR_NETWORK_CARRIER_MCC = exports.ATTR_NETWORK_CARRIER_ICC = exports.NET_TRANSPORT_VALUE_PIPE = exports.NET_TRANSPORT_VALUE_OTHER = exports.NET_TRANSPORT_VALUE_IP_UDP = exports.NET_TRANSPORT_VALUE_IP_TCP = exports.NET_TRANSPORT_VALUE_INPROC = exports.ATTR_NET_TRANSPORT = exports.ATTR_NET_SOCK_PEER_PORT = exports.ATTR_NET_SOCK_PEER_NAME = exports.ATTR_NET_SOCK_PEER_ADDR = exports.ATTR_NET_SOCK_HOST_PORT = exports.ATTR_NET_SOCK_HOST_ADDR = exports.NET_SOCK_FAMILY_VALUE_UNIX = exports.NET_SOCK_FAMILY_VALUE_INET6 = exports.NET_SOCK_FAMILY_VALUE_INET = exports.ATTR_NET_SOCK_FAMILY = exports.ATTR_NET_PROTOCOL_VERSION = exports.ATTR_NET_PROTOCOL_NAME = exports.ATTR_NET_PEER_PORT = exports.ATTR_NET_PEER_NAME = exports.ATTR_NET_PEER_IP = exports.ATTR_NET_HOST_PORT = exports.ATTR_NET_HOST_NAME = exports.ATTR_NET_HOST_IP = exports.MESSAGING_SYSTEM_VALUE_SERVICEBUS = exports.MESSAGING_SYSTEM_VALUE_ROCKETMQ = exports.MESSAGING_SYSTEM_VALUE_RABBITMQ = exports.MESSAGING_SYSTEM_VALUE_PULSAR = exports.MESSAGING_SYSTEM_VALUE_KAFKA = exports.MESSAGING_SYSTEM_VALUE_JMS = exports.MESSAGING_SYSTEM_VALUE_GCP_PUBSUB = exports.MESSAGING_SYSTEM_VALUE_EVENTHUBS = exports.MESSAGING_SYSTEM_VALUE_EVENTGRID = void 0;
    exports.OPENTRACING_REF_TYPE_VALUE_FOLLOWS_FROM = exports.OPENTRACING_REF_TYPE_VALUE_CHILD_OF = exports.ATTR_OPENTRACING_REF_TYPE = exports.ATTR_OPENSHIFT_CLUSTERQUOTA_UID = exports.ATTR_OPENSHIFT_CLUSTERQUOTA_NAME = exports.ATTR_OPENAI_RESPONSE_SYSTEM_FINGERPRINT = exports.ATTR_OPENAI_RESPONSE_SERVICE_TIER = exports.OPENAI_REQUEST_SERVICE_TIER_VALUE_DEFAULT = exports.OPENAI_REQUEST_SERVICE_TIER_VALUE_AUTO = exports.ATTR_OPENAI_REQUEST_SERVICE_TIER = exports.ATTR_ONC_RPC_VERSION = exports.ATTR_ONC_RPC_PROGRAM_NAME = exports.ATTR_ONC_RPC_PROCEDURE_NUMBER = exports.ATTR_ONC_RPC_PROCEDURE_NAME = exports.ATTR_OCI_MANIFEST_DIGEST = exports.NODEJS_EVENTLOOP_STATE_VALUE_IDLE = exports.NODEJS_EVENTLOOP_STATE_VALUE_ACTIVE = exports.ATTR_NODEJS_EVENTLOOP_STATE = exports.ATTR_NFS_SERVER_REPCACHE_STATUS = exports.ATTR_NFS_OPERATION_NAME = exports.NETWORK_IO_DIRECTION_VALUE_TRANSMIT = exports.NETWORK_IO_DIRECTION_VALUE_RECEIVE = exports.ATTR_NETWORK_IO_DIRECTION = exports.ATTR_NETWORK_INTERFACE_NAME = exports.NETWORK_CONNECTION_TYPE_VALUE_WIRED = exports.NETWORK_CONNECTION_TYPE_VALUE_WIFI = exports.NETWORK_CONNECTION_TYPE_VALUE_UNKNOWN = exports.NETWORK_CONNECTION_TYPE_VALUE_UNAVAILABLE = exports.NETWORK_CONNECTION_TYPE_VALUE_CELL = exports.ATTR_NETWORK_CONNECTION_TYPE = exports.NETWORK_CONNECTION_SUBTYPE_VALUE_UMTS = exports.NETWORK_CONNECTION_SUBTYPE_VALUE_TD_SCDMA = exports.NETWORK_CONNECTION_SUBTYPE_VALUE_NRNSA = exports.NETWORK_CONNECTION_SUBTYPE_VALUE_NR = exports.NETWORK_CONNECTION_SUBTYPE_VALUE_LTE_CA = exports.NETWORK_CONNECTION_SUBTYPE_VALUE_LTE = exports.NETWORK_CONNECTION_SUBTYPE_VALUE_IWLAN = exports.NETWORK_CONNECTION_SUBTYPE_VALUE_IDEN = exports.NETWORK_CONNECTION_SUBTYPE_VALUE_HSUPA = exports.NETWORK_CONNECTION_SUBTYPE_VALUE_HSPAP = exports.NETWORK_CONNECTION_SUBTYPE_VALUE_HSPA = exports.NETWORK_CONNECTION_SUBTYPE_VALUE_HSDPA = exports.NETWORK_CONNECTION_SUBTYPE_VALUE_GSM = exports.NETWORK_CONNECTION_SUBTYPE_VALUE_GPRS = exports.NETWORK_CONNECTION_SUBTYPE_VALUE_EVDO_B = exports.NETWORK_CONNECTION_SUBTYPE_VALUE_EVDO_A = exports.NETWORK_CONNECTION_SUBTYPE_VALUE_EVDO_0 = exports.NETWORK_CONNECTION_SUBTYPE_VALUE_EHRPD = exports.NETWORK_CONNECTION_SUBTYPE_VALUE_EDGE = exports.NETWORK_CONNECTION_SUBTYPE_VALUE_CDMA2000_1XRTT = void 0;
    exports.ATTR_PPROF_LOCATION_IS_FOLDED = exports.ATTR_POOL_NAME = exports.ATTR_PEER_SERVICE = exports.OTEL_SPAN_SAMPLING_RESULT_VALUE_RECORD_ONLY = exports.OTEL_SPAN_SAMPLING_RESULT_VALUE_RECORD_AND_SAMPLE = exports.OTEL_SPAN_SAMPLING_RESULT_VALUE_DROP = exports.ATTR_OTEL_SPAN_SAMPLING_RESULT = exports.OTEL_SPAN_PARENT_ORIGIN_VALUE_REMOTE = exports.OTEL_SPAN_PARENT_ORIGIN_VALUE_NONE = exports.OTEL_SPAN_PARENT_ORIGIN_VALUE_LOCAL = exports.ATTR_OTEL_SPAN_PARENT_ORIGIN = exports.ATTR_OTEL_SCOPE_SCHEMA_URL = exports.ATTR_OTEL_LIBRARY_VERSION = exports.ATTR_OTEL_LIBRARY_NAME = exports.ATTR_OTEL_EVENT_NAME = exports.OTEL_COMPONENT_TYPE_VALUE_ZIPKIN_HTTP_SPAN_EXPORTER = exports.OTEL_COMPONENT_TYPE_VALUE_SIMPLE_SPAN_PROCESSOR = exports.OTEL_COMPONENT_TYPE_VALUE_SIMPLE_LOG_PROCESSOR = exports.OTEL_COMPONENT_TYPE_VALUE_PROMETHEUS_HTTP_TEXT_METRIC_EXPORTER = exports.OTEL_COMPONENT_TYPE_VALUE_PERIODIC_METRIC_READER = exports.OTEL_COMPONENT_TYPE_VALUE_OTLP_HTTP_SPAN_EXPORTER = exports.OTEL_COMPONENT_TYPE_VALUE_OTLP_HTTP_METRIC_EXPORTER = exports.OTEL_COMPONENT_TYPE_VALUE_OTLP_HTTP_LOG_EXPORTER = exports.OTEL_COMPONENT_TYPE_VALUE_OTLP_HTTP_JSON_SPAN_EXPORTER = exports.OTEL_COMPONENT_TYPE_VALUE_OTLP_HTTP_JSON_METRIC_EXPORTER = exports.OTEL_COMPONENT_TYPE_VALUE_OTLP_HTTP_JSON_LOG_EXPORTER = exports.OTEL_COMPONENT_TYPE_VALUE_OTLP_GRPC_SPAN_EXPORTER = exports.OTEL_COMPONENT_TYPE_VALUE_OTLP_GRPC_METRIC_EXPORTER = exports.OTEL_COMPONENT_TYPE_VALUE_OTLP_GRPC_LOG_EXPORTER = exports.OTEL_COMPONENT_TYPE_VALUE_BATCHING_SPAN_PROCESSOR = exports.OTEL_COMPONENT_TYPE_VALUE_BATCHING_LOG_PROCESSOR = exports.ATTR_OTEL_COMPONENT_TYPE = exports.ATTR_OTEL_COMPONENT_NAME = exports.ATTR_OS_VERSION = exports.OS_TYPE_VALUE_ZOS = exports.OS_TYPE_VALUE_Z_OS = exports.OS_TYPE_VALUE_WINDOWS = exports.OS_TYPE_VALUE_SOLARIS = exports.OS_TYPE_VALUE_OPENBSD = exports.OS_TYPE_VALUE_NETBSD = exports.OS_TYPE_VALUE_LINUX = exports.OS_TYPE_VALUE_HPUX = exports.OS_TYPE_VALUE_FREEBSD = exports.OS_TYPE_VALUE_DRAGONFLYBSD = exports.OS_TYPE_VALUE_DARWIN = exports.OS_TYPE_VALUE_AIX = exports.ATTR_OS_TYPE = exports.ATTR_OS_NAME = exports.ATTR_OS_DESCRIPTION = exports.ATTR_OS_BUILD_ID = void 0;
    exports.PROCESS_STATE_VALUE_SLEEPING = exports.PROCESS_STATE_VALUE_RUNNING = exports.PROCESS_STATE_VALUE_DEFUNCT = exports.ATTR_PROCESS_STATE = exports.ATTR_PROCESS_SESSION_LEADER_PID = exports.ATTR_PROCESS_SAVED_USER_NAME = exports.ATTR_PROCESS_SAVED_USER_ID = exports.ATTR_PROCESS_RUNTIME_VERSION = exports.ATTR_PROCESS_RUNTIME_NAME = exports.ATTR_PROCESS_RUNTIME_DESCRIPTION = exports.ATTR_PROCESS_REAL_USER_NAME = exports.ATTR_PROCESS_REAL_USER_ID = exports.ATTR_PROCESS_PID = exports.ATTR_PROCESS_PARENT_PID = exports.PROCESS_PAGING_FAULT_TYPE_VALUE_MINOR = exports.PROCESS_PAGING_FAULT_TYPE_VALUE_MAJOR = exports.ATTR_PROCESS_PAGING_FAULT_TYPE = exports.ATTR_PROCESS_OWNER = exports.ATTR_PROCESS_LINUX_CGROUP = exports.ATTR_PROCESS_INTERACTIVE = exports.ATTR_PROCESS_GROUP_LEADER_PID = exports.ATTR_PROCESS_EXIT_TIME = exports.ATTR_PROCESS_EXIT_CODE = exports.ATTR_PROCESS_EXECUTABLE_PATH = exports.ATTR_PROCESS_EXECUTABLE_NAME = exports.ATTR_PROCESS_EXECUTABLE_BUILD_ID_PROFILING = exports.ATTR_PROCESS_EXECUTABLE_BUILD_ID_HTLHASH = exports.ATTR_PROCESS_EXECUTABLE_BUILD_ID_GO = exports.ATTR_PROCESS_EXECUTABLE_BUILD_ID_GNU = exports.ATTR_PROCESS_ENVIRONMENT_VARIABLE = exports.ATTR_PROCESS_CREATION_TIME = exports.PROCESS_CPU_STATE_VALUE_WAIT = exports.PROCESS_CPU_STATE_VALUE_USER = exports.PROCESS_CPU_STATE_VALUE_SYSTEM = exports.ATTR_PROCESS_CPU_STATE = exports.PROCESS_CONTEXT_SWITCH_TYPE_VALUE_VOLUNTARY = exports.PROCESS_CONTEXT_SWITCH_TYPE_VALUE_INVOLUNTARY = exports.ATTR_PROCESS_CONTEXT_SWITCH_TYPE = exports.ATTR_PROCESS_COMMAND_LINE = exports.ATTR_PROCESS_COMMAND_ARGS = exports.ATTR_PROCESS_COMMAND = exports.ATTR_PROCESS_ARGS_COUNT = exports.ATTR_PPROF_PROFILE_KEEP_FRAMES = exports.ATTR_PPROF_PROFILE_DROP_FRAMES = exports.ATTR_PPROF_PROFILE_DOC_URL = exports.ATTR_PPROF_PROFILE_COMMENT = exports.ATTR_PPROF_MAPPING_HAS_LINE_NUMBERS = exports.ATTR_PPROF_MAPPING_HAS_INLINE_FRAMES = exports.ATTR_PPROF_MAPPING_HAS_FUNCTIONS = exports.ATTR_PPROF_MAPPING_HAS_FILENAMES = void 0;
    exports.RPC_GRPC_STATUS_CODE_VALUE_RESOURCE_EXHAUSTED = exports.RPC_GRPC_STATUS_CODE_VALUE_PERMISSION_DENIED = exports.RPC_GRPC_STATUS_CODE_VALUE_ALREADY_EXISTS = exports.RPC_GRPC_STATUS_CODE_VALUE_NOT_FOUND = exports.RPC_GRPC_STATUS_CODE_VALUE_DEADLINE_EXCEEDED = exports.RPC_GRPC_STATUS_CODE_VALUE_INVALID_ARGUMENT = exports.RPC_GRPC_STATUS_CODE_VALUE_UNKNOWN = exports.RPC_GRPC_STATUS_CODE_VALUE_CANCELLED = exports.RPC_GRPC_STATUS_CODE_VALUE_OK = exports.ATTR_RPC_GRPC_STATUS_CODE = exports.ATTR_RPC_GRPC_RESPONSE_METADATA = exports.ATTR_RPC_GRPC_REQUEST_METADATA = exports.ATTR_RPC_CONNECT_RPC_RESPONSE_METADATA = exports.ATTR_RPC_CONNECT_RPC_REQUEST_METADATA = exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_UNKNOWN = exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_UNIMPLEMENTED = exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_UNAVAILABLE = exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_UNAUTHENTICATED = exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_RESOURCE_EXHAUSTED = exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_PERMISSION_DENIED = exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_OUT_OF_RANGE = exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_NOT_FOUND = exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_INVALID_ARGUMENT = exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_INTERNAL = exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_FAILED_PRECONDITION = exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_DEADLINE_EXCEEDED = exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_DATA_LOSS = exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_CANCELLED = exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_ALREADY_EXISTS = exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_ABORTED = exports.ATTR_RPC_CONNECT_RPC_ERROR_CODE = exports.PROFILE_FRAME_TYPE_VALUE_V8JS = exports.PROFILE_FRAME_TYPE_VALUE_RUST = exports.PROFILE_FRAME_TYPE_VALUE_RUBY = exports.PROFILE_FRAME_TYPE_VALUE_PHP = exports.PROFILE_FRAME_TYPE_VALUE_PERL = exports.PROFILE_FRAME_TYPE_VALUE_NATIVE = exports.PROFILE_FRAME_TYPE_VALUE_KERNEL = exports.PROFILE_FRAME_TYPE_VALUE_JVM = exports.PROFILE_FRAME_TYPE_VALUE_GO = exports.PROFILE_FRAME_TYPE_VALUE_DOTNET = exports.PROFILE_FRAME_TYPE_VALUE_CPYTHON = exports.PROFILE_FRAME_TYPE_VALUE_BEAM = exports.ATTR_PROFILE_FRAME_TYPE = exports.ATTR_PROCESS_WORKING_DIRECTORY = exports.ATTR_PROCESS_VPID = exports.ATTR_PROCESS_USER_NAME = exports.ATTR_PROCESS_USER_ID = exports.ATTR_PROCESS_TITLE = exports.PROCESS_STATE_VALUE_STOPPED = void 0;
    exports.ATTR_SESSION_ID = exports.ATTR_SERVICE_PEER_NAMESPACE = exports.ATTR_SERVICE_PEER_NAME = exports.ATTR_SERVICE_NAMESPACE = exports.ATTR_SERVICE_INSTANCE_ID = exports.ATTR_SECURITY_RULE_VERSION = exports.ATTR_SECURITY_RULE_UUID = exports.ATTR_SECURITY_RULE_RULESET_NAME = exports.ATTR_SECURITY_RULE_REFERENCE = exports.ATTR_SECURITY_RULE_NAME = exports.ATTR_SECURITY_RULE_LICENSE = exports.ATTR_SECURITY_RULE_DESCRIPTION = exports.ATTR_SECURITY_RULE_CATEGORY = exports.RPC_SYSTEM_NAME_VALUE_JSONRPC = exports.RPC_SYSTEM_NAME_VALUE_GRPC = exports.RPC_SYSTEM_NAME_VALUE_DUBBO = exports.RPC_SYSTEM_NAME_VALUE_CONNECTRPC = exports.ATTR_RPC_SYSTEM_NAME = exports.RPC_SYSTEM_VALUE_ONC_RPC = exports.RPC_SYSTEM_VALUE_JSONRPC = exports.RPC_SYSTEM_VALUE_JAVA_RMI = exports.RPC_SYSTEM_VALUE_GRPC = exports.RPC_SYSTEM_VALUE_DOTNET_WCF = exports.RPC_SYSTEM_VALUE_CONNECT_RPC = exports.RPC_SYSTEM_VALUE_APACHE_DUBBO = exports.ATTR_RPC_SYSTEM = exports.ATTR_RPC_SERVICE = exports.ATTR_RPC_RESPONSE_STATUS_CODE = exports.ATTR_RPC_RESPONSE_METADATA = exports.ATTR_RPC_REQUEST_METADATA = exports.ATTR_RPC_METHOD_ORIGINAL = exports.ATTR_RPC_METHOD = exports.ATTR_RPC_MESSAGE_UNCOMPRESSED_SIZE = exports.RPC_MESSAGE_TYPE_VALUE_SENT = exports.RPC_MESSAGE_TYPE_VALUE_RECEIVED = exports.ATTR_RPC_MESSAGE_TYPE = exports.ATTR_RPC_MESSAGE_ID = exports.ATTR_RPC_MESSAGE_COMPRESSED_SIZE = exports.ATTR_RPC_JSONRPC_VERSION = exports.ATTR_RPC_JSONRPC_REQUEST_ID = exports.ATTR_RPC_JSONRPC_ERROR_MESSAGE = exports.ATTR_RPC_JSONRPC_ERROR_CODE = exports.RPC_GRPC_STATUS_CODE_VALUE_UNAUTHENTICATED = exports.RPC_GRPC_STATUS_CODE_VALUE_DATA_LOSS = exports.RPC_GRPC_STATUS_CODE_VALUE_UNAVAILABLE = exports.RPC_GRPC_STATUS_CODE_VALUE_INTERNAL = exports.RPC_GRPC_STATUS_CODE_VALUE_UNIMPLEMENTED = exports.RPC_GRPC_STATUS_CODE_VALUE_OUT_OF_RANGE = exports.RPC_GRPC_STATUS_CODE_VALUE_ABORTED = exports.RPC_GRPC_STATUS_CODE_VALUE_FAILED_PRECONDITION = void 0;
    exports.SYSTEM_NETWORK_STATE_VALUE_SYN_SENT = exports.SYSTEM_NETWORK_STATE_VALUE_SYN_RECV = exports.SYSTEM_NETWORK_STATE_VALUE_LISTEN = exports.SYSTEM_NETWORK_STATE_VALUE_LAST_ACK = exports.SYSTEM_NETWORK_STATE_VALUE_FIN_WAIT_2 = exports.SYSTEM_NETWORK_STATE_VALUE_FIN_WAIT_1 = exports.SYSTEM_NETWORK_STATE_VALUE_ESTABLISHED = exports.SYSTEM_NETWORK_STATE_VALUE_DELETE = exports.SYSTEM_NETWORK_STATE_VALUE_CLOSING = exports.SYSTEM_NETWORK_STATE_VALUE_CLOSE_WAIT = exports.SYSTEM_NETWORK_STATE_VALUE_CLOSE = exports.ATTR_SYSTEM_NETWORK_STATE = exports.SYSTEM_MEMORY_STATE_VALUE_USED = exports.SYSTEM_MEMORY_STATE_VALUE_SHARED = exports.SYSTEM_MEMORY_STATE_VALUE_FREE = exports.SYSTEM_MEMORY_STATE_VALUE_CACHED = exports.SYSTEM_MEMORY_STATE_VALUE_BUFFERS = exports.ATTR_SYSTEM_MEMORY_STATE = exports.SYSTEM_MEMORY_LINUX_SLAB_STATE_VALUE_UNRECLAIMABLE = exports.SYSTEM_MEMORY_LINUX_SLAB_STATE_VALUE_RECLAIMABLE = exports.ATTR_SYSTEM_MEMORY_LINUX_SLAB_STATE = exports.SYSTEM_FILESYSTEM_TYPE_VALUE_REFS = exports.SYSTEM_FILESYSTEM_TYPE_VALUE_NTFS = exports.SYSTEM_FILESYSTEM_TYPE_VALUE_HFSPLUS = exports.SYSTEM_FILESYSTEM_TYPE_VALUE_FAT32 = exports.SYSTEM_FILESYSTEM_TYPE_VALUE_EXT4 = exports.SYSTEM_FILESYSTEM_TYPE_VALUE_EXFAT = exports.ATTR_SYSTEM_FILESYSTEM_TYPE = exports.SYSTEM_FILESYSTEM_STATE_VALUE_USED = exports.SYSTEM_FILESYSTEM_STATE_VALUE_RESERVED = exports.SYSTEM_FILESYSTEM_STATE_VALUE_FREE = exports.ATTR_SYSTEM_FILESYSTEM_STATE = exports.ATTR_SYSTEM_FILESYSTEM_MOUNTPOINT = exports.ATTR_SYSTEM_FILESYSTEM_MODE = exports.ATTR_SYSTEM_DEVICE = exports.SYSTEM_CPU_STATE_VALUE_USER = exports.SYSTEM_CPU_STATE_VALUE_SYSTEM = exports.SYSTEM_CPU_STATE_VALUE_STEAL = exports.SYSTEM_CPU_STATE_VALUE_NICE = exports.SYSTEM_CPU_STATE_VALUE_IOWAIT = exports.SYSTEM_CPU_STATE_VALUE_INTERRUPT = exports.SYSTEM_CPU_STATE_VALUE_IDLE = exports.ATTR_SYSTEM_CPU_STATE = exports.ATTR_SYSTEM_CPU_LOGICAL_NUMBER = exports.STATE_VALUE_USED = exports.STATE_VALUE_IDLE = exports.ATTR_STATE = exports.ATTR_SOURCE_PORT = exports.ATTR_SOURCE_ADDRESS = exports.ATTR_SESSION_PREVIOUS_ID = void 0;
    exports.ATTR_TLS_CLIENT_SERVER_NAME = exports.ATTR_TLS_CLIENT_NOT_BEFORE = exports.ATTR_TLS_CLIENT_NOT_AFTER = exports.ATTR_TLS_CLIENT_JA3 = exports.ATTR_TLS_CLIENT_ISSUER = exports.ATTR_TLS_CLIENT_HASH_SHA256 = exports.ATTR_TLS_CLIENT_HASH_SHA1 = exports.ATTR_TLS_CLIENT_HASH_MD5 = exports.ATTR_TLS_CLIENT_CERTIFICATE_CHAIN = exports.ATTR_TLS_CLIENT_CERTIFICATE = exports.ATTR_TLS_CIPHER = exports.ATTR_THREAD_NAME = exports.ATTR_THREAD_ID = exports.TEST_SUITE_RUN_STATUS_VALUE_TIMED_OUT = exports.TEST_SUITE_RUN_STATUS_VALUE_SUCCESS = exports.TEST_SUITE_RUN_STATUS_VALUE_SKIPPED = exports.TEST_SUITE_RUN_STATUS_VALUE_IN_PROGRESS = exports.TEST_SUITE_RUN_STATUS_VALUE_FAILURE = exports.TEST_SUITE_RUN_STATUS_VALUE_ABORTED = exports.ATTR_TEST_SUITE_RUN_STATUS = exports.ATTR_TEST_SUITE_NAME = exports.TEST_CASE_RESULT_STATUS_VALUE_PASS = exports.TEST_CASE_RESULT_STATUS_VALUE_FAIL = exports.ATTR_TEST_CASE_RESULT_STATUS = exports.ATTR_TEST_CASE_NAME = exports.ATTR_TELEMETRY_DISTRO_VERSION = exports.ATTR_TELEMETRY_DISTRO_NAME = exports.SYSTEM_PROCESSES_STATUS_VALUE_STOPPED = exports.SYSTEM_PROCESSES_STATUS_VALUE_SLEEPING = exports.SYSTEM_PROCESSES_STATUS_VALUE_RUNNING = exports.SYSTEM_PROCESSES_STATUS_VALUE_DEFUNCT = exports.ATTR_SYSTEM_PROCESSES_STATUS = exports.SYSTEM_PROCESS_STATUS_VALUE_STOPPED = exports.SYSTEM_PROCESS_STATUS_VALUE_SLEEPING = exports.SYSTEM_PROCESS_STATUS_VALUE_RUNNING = exports.SYSTEM_PROCESS_STATUS_VALUE_DEFUNCT = exports.ATTR_SYSTEM_PROCESS_STATUS = exports.SYSTEM_PAGING_TYPE_VALUE_MINOR = exports.SYSTEM_PAGING_TYPE_VALUE_MAJOR = exports.ATTR_SYSTEM_PAGING_TYPE = exports.SYSTEM_PAGING_STATE_VALUE_USED = exports.SYSTEM_PAGING_STATE_VALUE_FREE = exports.ATTR_SYSTEM_PAGING_STATE = exports.SYSTEM_PAGING_FAULT_TYPE_VALUE_MINOR = exports.SYSTEM_PAGING_FAULT_TYPE_VALUE_MAJOR = exports.ATTR_SYSTEM_PAGING_FAULT_TYPE = exports.SYSTEM_PAGING_DIRECTION_VALUE_OUT = exports.SYSTEM_PAGING_DIRECTION_VALUE_IN = exports.ATTR_SYSTEM_PAGING_DIRECTION = exports.SYSTEM_NETWORK_STATE_VALUE_TIME_WAIT = void 0;
    exports.V8JS_HEAP_SPACE_NAME_VALUE_MAP_SPACE = exports.V8JS_HEAP_SPACE_NAME_VALUE_LARGE_OBJECT_SPACE = exports.V8JS_HEAP_SPACE_NAME_VALUE_CODE_SPACE = exports.ATTR_V8JS_HEAP_SPACE_NAME = exports.V8JS_GC_TYPE_VALUE_WEAKCB = exports.V8JS_GC_TYPE_VALUE_MINOR = exports.V8JS_GC_TYPE_VALUE_MAJOR = exports.V8JS_GC_TYPE_VALUE_INCREMENTAL = exports.ATTR_V8JS_GC_TYPE = exports.ATTR_USER_AGENT_VERSION = exports.USER_AGENT_SYNTHETIC_TYPE_VALUE_TEST = exports.USER_AGENT_SYNTHETIC_TYPE_VALUE_BOT = exports.ATTR_USER_AGENT_SYNTHETIC_TYPE = exports.ATTR_USER_AGENT_OS_VERSION = exports.ATTR_USER_AGENT_OS_NAME = exports.ATTR_USER_AGENT_NAME = exports.ATTR_USER_ROLES = exports.ATTR_USER_NAME = exports.ATTR_USER_ID = exports.ATTR_USER_HASH = exports.ATTR_USER_FULL_NAME = exports.ATTR_USER_EMAIL = exports.ATTR_URL_TOP_LEVEL_DOMAIN = exports.ATTR_URL_TEMPLATE = exports.ATTR_URL_SUBDOMAIN = exports.ATTR_URL_REGISTERED_DOMAIN = exports.ATTR_URL_PORT = exports.ATTR_URL_ORIGINAL = exports.ATTR_URL_EXTENSION = exports.ATTR_URL_DOMAIN = exports.ATTR_TLS_SERVER_SUBJECT = exports.ATTR_TLS_SERVER_NOT_BEFORE = exports.ATTR_TLS_SERVER_NOT_AFTER = exports.ATTR_TLS_SERVER_JA3S = exports.ATTR_TLS_SERVER_ISSUER = exports.ATTR_TLS_SERVER_HASH_SHA256 = exports.ATTR_TLS_SERVER_HASH_SHA1 = exports.ATTR_TLS_SERVER_HASH_MD5 = exports.ATTR_TLS_SERVER_CERTIFICATE_CHAIN = exports.ATTR_TLS_SERVER_CERTIFICATE = exports.ATTR_TLS_RESUMED = exports.ATTR_TLS_PROTOCOL_VERSION = exports.TLS_PROTOCOL_NAME_VALUE_TLS = exports.TLS_PROTOCOL_NAME_VALUE_SSL = exports.ATTR_TLS_PROTOCOL_NAME = exports.ATTR_TLS_NEXT_PROTOCOL = exports.ATTR_TLS_ESTABLISHED = exports.ATTR_TLS_CURVE = exports.ATTR_TLS_CLIENT_SUPPORTED_CIPHERS = exports.ATTR_TLS_CLIENT_SUBJECT = void 0;
    exports.ATTR_ZOS_SYSPLEX_NAME = exports.ATTR_ZOS_SMF_ID = exports.ATTR_WEBENGINE_VERSION = exports.ATTR_WEBENGINE_NAME = exports.ATTR_WEBENGINE_DESCRIPTION = exports.VCS_REVISION_DELTA_DIRECTION_VALUE_BEHIND = exports.VCS_REVISION_DELTA_DIRECTION_VALUE_AHEAD = exports.ATTR_VCS_REVISION_DELTA_DIRECTION = exports.ATTR_VCS_REPOSITORY_URL_FULL = exports.VCS_REPOSITORY_REF_TYPE_VALUE_TAG = exports.VCS_REPOSITORY_REF_TYPE_VALUE_BRANCH = exports.ATTR_VCS_REPOSITORY_REF_TYPE = exports.ATTR_VCS_REPOSITORY_REF_REVISION = exports.ATTR_VCS_REPOSITORY_REF_NAME = exports.ATTR_VCS_REPOSITORY_NAME = exports.ATTR_VCS_REPOSITORY_CHANGE_TITLE = exports.ATTR_VCS_REPOSITORY_CHANGE_ID = exports.VCS_REF_TYPE_VALUE_TAG = exports.VCS_REF_TYPE_VALUE_BRANCH = exports.ATTR_VCS_REF_TYPE = exports.VCS_REF_HEAD_TYPE_VALUE_TAG = exports.VCS_REF_HEAD_TYPE_VALUE_BRANCH = exports.ATTR_VCS_REF_HEAD_TYPE = exports.ATTR_VCS_REF_HEAD_REVISION = exports.ATTR_VCS_REF_HEAD_NAME = exports.VCS_REF_BASE_TYPE_VALUE_TAG = exports.VCS_REF_BASE_TYPE_VALUE_BRANCH = exports.ATTR_VCS_REF_BASE_TYPE = exports.ATTR_VCS_REF_BASE_REVISION = exports.ATTR_VCS_REF_BASE_NAME = exports.VCS_PROVIDER_NAME_VALUE_GITTEA = exports.VCS_PROVIDER_NAME_VALUE_GITLAB = exports.VCS_PROVIDER_NAME_VALUE_GITHUB = exports.VCS_PROVIDER_NAME_VALUE_GITEA = exports.VCS_PROVIDER_NAME_VALUE_BITBUCKET = exports.ATTR_VCS_PROVIDER_NAME = exports.ATTR_VCS_OWNER_NAME = exports.VCS_LINE_CHANGE_TYPE_VALUE_REMOVED = exports.VCS_LINE_CHANGE_TYPE_VALUE_ADDED = exports.ATTR_VCS_LINE_CHANGE_TYPE = exports.ATTR_VCS_CHANGE_TITLE = exports.VCS_CHANGE_STATE_VALUE_WIP = exports.VCS_CHANGE_STATE_VALUE_OPEN = exports.VCS_CHANGE_STATE_VALUE_MERGED = exports.VCS_CHANGE_STATE_VALUE_CLOSED = exports.ATTR_VCS_CHANGE_STATE = exports.ATTR_VCS_CHANGE_ID = exports.V8JS_HEAP_SPACE_NAME_VALUE_OLD_SPACE = exports.V8JS_HEAP_SPACE_NAME_VALUE_NEW_SPACE = void 0;
    exports.ATTR_ANDROID_APP_STATE = "android.app.state";
    exports.ANDROID_APP_STATE_VALUE_BACKGROUND = "background";
    exports.ANDROID_APP_STATE_VALUE_CREATED = "created";
    exports.ANDROID_APP_STATE_VALUE_FOREGROUND = "foreground";
    exports.ATTR_ANDROID_OS_API_LEVEL = "android.os.api_level";
    exports.ATTR_ANDROID_STATE = "android.state";
    exports.ANDROID_STATE_VALUE_BACKGROUND = "background";
    exports.ANDROID_STATE_VALUE_CREATED = "created";
    exports.ANDROID_STATE_VALUE_FOREGROUND = "foreground";
    exports.ATTR_APP_BUILD_ID = "app.build_id";
    exports.ATTR_APP_INSTALLATION_ID = "app.installation.id";
    exports.ATTR_APP_JANK_FRAME_COUNT = "app.jank.frame_count";
    exports.ATTR_APP_JANK_PERIOD = "app.jank.period";
    exports.ATTR_APP_JANK_THRESHOLD = "app.jank.threshold";
    exports.ATTR_APP_SCREEN_COORDINATE_X = "app.screen.coordinate.x";
    exports.ATTR_APP_SCREEN_COORDINATE_Y = "app.screen.coordinate.y";
    exports.ATTR_APP_SCREEN_ID = "app.screen.id";
    exports.ATTR_APP_SCREEN_NAME = "app.screen.name";
    exports.ATTR_APP_WIDGET_ID = "app.widget.id";
    exports.ATTR_APP_WIDGET_NAME = "app.widget.name";
    exports.ATTR_ARTIFACT_ATTESTATION_FILENAME = "artifact.attestation.filename";
    exports.ATTR_ARTIFACT_ATTESTATION_HASH = "artifact.attestation.hash";
    exports.ATTR_ARTIFACT_ATTESTATION_ID = "artifact.attestation.id";
    exports.ATTR_ARTIFACT_FILENAME = "artifact.filename";
    exports.ATTR_ARTIFACT_HASH = "artifact.hash";
    exports.ATTR_ARTIFACT_PURL = "artifact.purl";
    exports.ATTR_ARTIFACT_VERSION = "artifact.version";
    exports.ATTR_ASPNETCORE_AUTHENTICATION_RESULT = "aspnetcore.authentication.result";
    exports.ASPNETCORE_AUTHENTICATION_RESULT_VALUE_FAILURE = "failure";
    exports.ASPNETCORE_AUTHENTICATION_RESULT_VALUE_NONE = "none";
    exports.ASPNETCORE_AUTHENTICATION_RESULT_VALUE_SUCCESS = "success";
    exports.ATTR_ASPNETCORE_AUTHENTICATION_SCHEME = "aspnetcore.authentication.scheme";
    exports.ATTR_ASPNETCORE_AUTHORIZATION_POLICY = "aspnetcore.authorization.policy";
    exports.ATTR_ASPNETCORE_AUTHORIZATION_RESULT = "aspnetcore.authorization.result";
    exports.ASPNETCORE_AUTHORIZATION_RESULT_VALUE_FAILURE = "failure";
    exports.ASPNETCORE_AUTHORIZATION_RESULT_VALUE_SUCCESS = "success";
    exports.ATTR_ASPNETCORE_IDENTITY_ERROR_CODE = "aspnetcore.identity.error_code";
    exports.ATTR_ASPNETCORE_IDENTITY_PASSWORD_CHECK_RESULT = "aspnetcore.identity.password_check_result";
    exports.ASPNETCORE_IDENTITY_PASSWORD_CHECK_RESULT_VALUE_FAILURE = "failure";
    exports.ASPNETCORE_IDENTITY_PASSWORD_CHECK_RESULT_VALUE_PASSWORD_MISSING = "password_missing";
    exports.ASPNETCORE_IDENTITY_PASSWORD_CHECK_RESULT_VALUE_SUCCESS = "success";
    exports.ASPNETCORE_IDENTITY_PASSWORD_CHECK_RESULT_VALUE_SUCCESS_REHASH_NEEDED = "success_rehash_needed";
    exports.ASPNETCORE_IDENTITY_PASSWORD_CHECK_RESULT_VALUE_USER_MISSING = "user_missing";
    exports.ATTR_ASPNETCORE_IDENTITY_RESULT = "aspnetcore.identity.result";
    exports.ASPNETCORE_IDENTITY_RESULT_VALUE_FAILURE = "failure";
    exports.ASPNETCORE_IDENTITY_RESULT_VALUE_SUCCESS = "success";
    exports.ATTR_ASPNETCORE_IDENTITY_SIGN_IN_RESULT = "aspnetcore.identity.sign_in.result";
    exports.ASPNETCORE_IDENTITY_SIGN_IN_RESULT_VALUE_FAILURE = "failure";
    exports.ASPNETCORE_IDENTITY_SIGN_IN_RESULT_VALUE_LOCKED_OUT = "locked_out";
    exports.ASPNETCORE_IDENTITY_SIGN_IN_RESULT_VALUE_NOT_ALLOWED = "not_allowed";
    exports.ASPNETCORE_IDENTITY_SIGN_IN_RESULT_VALUE_REQUIRES_TWO_FACTOR = "requires_two_factor";
    exports.ASPNETCORE_IDENTITY_SIGN_IN_RESULT_VALUE_SUCCESS = "success";
    exports.ATTR_ASPNETCORE_IDENTITY_SIGN_IN_TYPE = "aspnetcore.identity.sign_in.type";
    exports.ASPNETCORE_IDENTITY_SIGN_IN_TYPE_VALUE_EXTERNAL = "external";
    exports.ASPNETCORE_IDENTITY_SIGN_IN_TYPE_VALUE_PASSKEY = "passkey";
    exports.ASPNETCORE_IDENTITY_SIGN_IN_TYPE_VALUE_PASSWORD = "password";
    exports.ASPNETCORE_IDENTITY_SIGN_IN_TYPE_VALUE_TWO_FACTOR = "two_factor";
    exports.ASPNETCORE_IDENTITY_SIGN_IN_TYPE_VALUE_TWO_FACTOR_AUTHENTICATOR = "two_factor_authenticator";
    exports.ASPNETCORE_IDENTITY_SIGN_IN_TYPE_VALUE_TWO_FACTOR_RECOVERY_CODE = "two_factor_recovery_code";
    exports.ATTR_ASPNETCORE_IDENTITY_TOKEN_PURPOSE = "aspnetcore.identity.token_purpose";
    exports.ASPNETCORE_IDENTITY_TOKEN_PURPOSE_VALUE_OTHER = "_OTHER";
    exports.ASPNETCORE_IDENTITY_TOKEN_PURPOSE_VALUE_CHANGE_EMAIL = "change_email";
    exports.ASPNETCORE_IDENTITY_TOKEN_PURPOSE_VALUE_CHANGE_PHONE_NUMBER = "change_phone_number";
    exports.ASPNETCORE_IDENTITY_TOKEN_PURPOSE_VALUE_EMAIL_CONFIRMATION = "email_confirmation";
    exports.ASPNETCORE_IDENTITY_TOKEN_PURPOSE_VALUE_RESET_PASSWORD = "reset_password";
    exports.ASPNETCORE_IDENTITY_TOKEN_PURPOSE_VALUE_TWO_FACTOR = "two_factor";
    exports.ATTR_ASPNETCORE_IDENTITY_TOKEN_VERIFIED = "aspnetcore.identity.token_verified";
    exports.ASPNETCORE_IDENTITY_TOKEN_VERIFIED_VALUE_FAILURE = "failure";
    exports.ASPNETCORE_IDENTITY_TOKEN_VERIFIED_VALUE_SUCCESS = "success";
    exports.ATTR_ASPNETCORE_IDENTITY_USER_UPDATE_TYPE = "aspnetcore.identity.user.update_type";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_OTHER = "_OTHER";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_ACCESS_FAILED = "access_failed";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_ADD_CLAIMS = "add_claims";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_ADD_LOGIN = "add_login";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_ADD_PASSWORD = "add_password";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_ADD_TO_ROLES = "add_to_roles";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_CHANGE_EMAIL = "change_email";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_CHANGE_PASSWORD = "change_password";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_CHANGE_PHONE_NUMBER = "change_phone_number";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_CONFIRM_EMAIL = "confirm_email";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_GENERATE_NEW_TWO_FACTOR_RECOVERY_CODES = "generate_new_two_factor_recovery_codes";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_PASSWORD_REHASH = "password_rehash";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_REDEEM_TWO_FACTOR_RECOVERY_CODE = "redeem_two_factor_recovery_code";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_REMOVE_AUTHENTICATION_TOKEN = "remove_authentication_token";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_REMOVE_CLAIMS = "remove_claims";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_REMOVE_FROM_ROLES = "remove_from_roles";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_REMOVE_LOGIN = "remove_login";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_REMOVE_PASSKEY = "remove_passkey";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_REMOVE_PASSWORD = "remove_password";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_REPLACE_CLAIM = "replace_claim";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_RESET_ACCESS_FAILED_COUNT = "reset_access_failed_count";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_RESET_AUTHENTICATOR_KEY = "reset_authenticator_key";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_RESET_PASSWORD = "reset_password";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_SECURITY_STAMP = "security_stamp";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_SET_AUTHENTICATION_TOKEN = "set_authentication_token";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_SET_EMAIL = "set_email";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_SET_LOCKOUT_ENABLED = "set_lockout_enabled";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_SET_LOCKOUT_END_DATE = "set_lockout_end_date";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_SET_PASSKEY = "set_passkey";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_SET_PHONE_NUMBER = "set_phone_number";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_SET_TWO_FACTOR_ENABLED = "set_two_factor_enabled";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_UPDATE = "update";
    exports.ASPNETCORE_IDENTITY_USER_UPDATE_TYPE_VALUE_USER_NAME = "user_name";
    exports.ATTR_ASPNETCORE_IDENTITY_USER_TYPE = "aspnetcore.identity.user_type";
    exports.ATTR_ASPNETCORE_MEMORY_POOL_OWNER = "aspnetcore.memory_pool.owner";
    exports.ATTR_ASPNETCORE_SIGN_IN_IS_PERSISTENT = "aspnetcore.sign_in.is_persistent";
    exports.ATTR_AWS_BEDROCK_GUARDRAIL_ID = "aws.bedrock.guardrail.id";
    exports.ATTR_AWS_BEDROCK_KNOWLEDGE_BASE_ID = "aws.bedrock.knowledge_base.id";
    exports.ATTR_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS = "aws.dynamodb.attribute_definitions";
    exports.ATTR_AWS_DYNAMODB_ATTRIBUTES_TO_GET = "aws.dynamodb.attributes_to_get";
    exports.ATTR_AWS_DYNAMODB_CONSISTENT_READ = "aws.dynamodb.consistent_read";
    exports.ATTR_AWS_DYNAMODB_CONSUMED_CAPACITY = "aws.dynamodb.consumed_capacity";
    exports.ATTR_AWS_DYNAMODB_COUNT = "aws.dynamodb.count";
    exports.ATTR_AWS_DYNAMODB_EXCLUSIVE_START_TABLE = "aws.dynamodb.exclusive_start_table";
    exports.ATTR_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES = "aws.dynamodb.global_secondary_index_updates";
    exports.ATTR_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES = "aws.dynamodb.global_secondary_indexes";
    exports.ATTR_AWS_DYNAMODB_INDEX_NAME = "aws.dynamodb.index_name";
    exports.ATTR_AWS_DYNAMODB_ITEM_COLLECTION_METRICS = "aws.dynamodb.item_collection_metrics";
    exports.ATTR_AWS_DYNAMODB_LIMIT = "aws.dynamodb.limit";
    exports.ATTR_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES = "aws.dynamodb.local_secondary_indexes";
    exports.ATTR_AWS_DYNAMODB_PROJECTION = "aws.dynamodb.projection";
    exports.ATTR_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY = "aws.dynamodb.provisioned_read_capacity";
    exports.ATTR_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY = "aws.dynamodb.provisioned_write_capacity";
    exports.ATTR_AWS_DYNAMODB_SCAN_FORWARD = "aws.dynamodb.scan_forward";
    exports.ATTR_AWS_DYNAMODB_SCANNED_COUNT = "aws.dynamodb.scanned_count";
    exports.ATTR_AWS_DYNAMODB_SEGMENT = "aws.dynamodb.segment";
    exports.ATTR_AWS_DYNAMODB_SELECT = "aws.dynamodb.select";
    exports.ATTR_AWS_DYNAMODB_TABLE_COUNT = "aws.dynamodb.table_count";
    exports.ATTR_AWS_DYNAMODB_TABLE_NAMES = "aws.dynamodb.table_names";
    exports.ATTR_AWS_DYNAMODB_TOTAL_SEGMENTS = "aws.dynamodb.total_segments";
    exports.ATTR_AWS_ECS_CLUSTER_ARN = "aws.ecs.cluster.arn";
    exports.ATTR_AWS_ECS_CONTAINER_ARN = "aws.ecs.container.arn";
    exports.ATTR_AWS_ECS_LAUNCHTYPE = "aws.ecs.launchtype";
    exports.AWS_ECS_LAUNCHTYPE_VALUE_EC2 = "ec2";
    exports.AWS_ECS_LAUNCHTYPE_VALUE_FARGATE = "fargate";
    exports.ATTR_AWS_ECS_TASK_ARN = "aws.ecs.task.arn";
    exports.ATTR_AWS_ECS_TASK_FAMILY = "aws.ecs.task.family";
    exports.ATTR_AWS_ECS_TASK_ID = "aws.ecs.task.id";
    exports.ATTR_AWS_ECS_TASK_REVISION = "aws.ecs.task.revision";
    exports.ATTR_AWS_EKS_CLUSTER_ARN = "aws.eks.cluster.arn";
    exports.ATTR_AWS_EXTENDED_REQUEST_ID = "aws.extended_request_id";
    exports.ATTR_AWS_KINESIS_STREAM_NAME = "aws.kinesis.stream_name";
    exports.ATTR_AWS_LAMBDA_INVOKED_ARN = "aws.lambda.invoked_arn";
    exports.ATTR_AWS_LAMBDA_RESOURCE_MAPPING_ID = "aws.lambda.resource_mapping.id";
    exports.ATTR_AWS_LOG_GROUP_ARNS = "aws.log.group.arns";
    exports.ATTR_AWS_LOG_GROUP_NAMES = "aws.log.group.names";
    exports.ATTR_AWS_LOG_STREAM_ARNS = "aws.log.stream.arns";
    exports.ATTR_AWS_LOG_STREAM_NAMES = "aws.log.stream.names";
    exports.ATTR_AWS_REQUEST_ID = "aws.request_id";
    exports.ATTR_AWS_S3_BUCKET = "aws.s3.bucket";
    exports.ATTR_AWS_S3_COPY_SOURCE = "aws.s3.copy_source";
    exports.ATTR_AWS_S3_DELETE = "aws.s3.delete";
    exports.ATTR_AWS_S3_KEY = "aws.s3.key";
    exports.ATTR_AWS_S3_PART_NUMBER = "aws.s3.part_number";
    exports.ATTR_AWS_S3_UPLOAD_ID = "aws.s3.upload_id";
    exports.ATTR_AWS_SECRETSMANAGER_SECRET_ARN = "aws.secretsmanager.secret.arn";
    exports.ATTR_AWS_SNS_TOPIC_ARN = "aws.sns.topic.arn";
    exports.ATTR_AWS_SQS_QUEUE_URL = "aws.sqs.queue.url";
    exports.ATTR_AWS_STEP_FUNCTIONS_ACTIVITY_ARN = "aws.step_functions.activity.arn";
    exports.ATTR_AWS_STEP_FUNCTIONS_STATE_MACHINE_ARN = "aws.step_functions.state_machine.arn";
    exports.ATTR_AZ_NAMESPACE = "az.namespace";
    exports.ATTR_AZ_SERVICE_REQUEST_ID = "az.service_request_id";
    exports.ATTR_AZURE_CLIENT_ID = "azure.client.id";
    exports.ATTR_AZURE_COSMOSDB_CONNECTION_MODE = "azure.cosmosdb.connection.mode";
    exports.AZURE_COSMOSDB_CONNECTION_MODE_VALUE_DIRECT = "direct";
    exports.AZURE_COSMOSDB_CONNECTION_MODE_VALUE_GATEWAY = "gateway";
    exports.ATTR_AZURE_COSMOSDB_CONSISTENCY_LEVEL = "azure.cosmosdb.consistency.level";
    exports.AZURE_COSMOSDB_CONSISTENCY_LEVEL_VALUE_BOUNDED_STALENESS = "BoundedStaleness";
    exports.AZURE_COSMOSDB_CONSISTENCY_LEVEL_VALUE_CONSISTENT_PREFIX = "ConsistentPrefix";
    exports.AZURE_COSMOSDB_CONSISTENCY_LEVEL_VALUE_EVENTUAL = "Eventual";
    exports.AZURE_COSMOSDB_CONSISTENCY_LEVEL_VALUE_SESSION = "Session";
    exports.AZURE_COSMOSDB_CONSISTENCY_LEVEL_VALUE_STRONG = "Strong";
    exports.ATTR_AZURE_COSMOSDB_OPERATION_CONTACTED_REGIONS = "azure.cosmosdb.operation.contacted_regions";
    exports.ATTR_AZURE_COSMOSDB_OPERATION_REQUEST_CHARGE = "azure.cosmosdb.operation.request_charge";
    exports.ATTR_AZURE_COSMOSDB_REQUEST_BODY_SIZE = "azure.cosmosdb.request.body.size";
    exports.ATTR_AZURE_COSMOSDB_RESPONSE_SUB_STATUS_CODE = "azure.cosmosdb.response.sub_status_code";
    exports.ATTR_AZURE_RESOURCE_PROVIDER_NAMESPACE = "azure.resource_provider.namespace";
    exports.ATTR_AZURE_SERVICE_REQUEST_ID = "azure.service.request.id";
    exports.ATTR_BROWSER_BRANDS = "browser.brands";
    exports.ATTR_BROWSER_LANGUAGE = "browser.language";
    exports.ATTR_BROWSER_MOBILE = "browser.mobile";
    exports.ATTR_BROWSER_PLATFORM = "browser.platform";
    exports.ATTR_CASSANDRA_CONSISTENCY_LEVEL = "cassandra.consistency.level";
    exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_ALL = "all";
    exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_ANY = "any";
    exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_EACH_QUORUM = "each_quorum";
    exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_LOCAL_ONE = "local_one";
    exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_LOCAL_QUORUM = "local_quorum";
    exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_LOCAL_SERIAL = "local_serial";
    exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_ONE = "one";
    exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_QUORUM = "quorum";
    exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_SERIAL = "serial";
    exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_THREE = "three";
    exports.CASSANDRA_CONSISTENCY_LEVEL_VALUE_TWO = "two";
    exports.ATTR_CASSANDRA_COORDINATOR_DC = "cassandra.coordinator.dc";
    exports.ATTR_CASSANDRA_COORDINATOR_ID = "cassandra.coordinator.id";
    exports.ATTR_CASSANDRA_PAGE_SIZE = "cassandra.page.size";
    exports.ATTR_CASSANDRA_QUERY_IDEMPOTENT = "cassandra.query.idempotent";
    exports.ATTR_CASSANDRA_SPECULATIVE_EXECUTION_COUNT = "cassandra.speculative_execution.count";
    exports.ATTR_CICD_PIPELINE_ACTION_NAME = "cicd.pipeline.action.name";
    exports.CICD_PIPELINE_ACTION_NAME_VALUE_BUILD = "BUILD";
    exports.CICD_PIPELINE_ACTION_NAME_VALUE_RUN = "RUN";
    exports.CICD_PIPELINE_ACTION_NAME_VALUE_SYNC = "SYNC";
    exports.ATTR_CICD_PIPELINE_NAME = "cicd.pipeline.name";
    exports.ATTR_CICD_PIPELINE_RESULT = "cicd.pipeline.result";
    exports.CICD_PIPELINE_RESULT_VALUE_CANCELLATION = "cancellation";
    exports.CICD_PIPELINE_RESULT_VALUE_ERROR = "error";
    exports.CICD_PIPELINE_RESULT_VALUE_FAILURE = "failure";
    exports.CICD_PIPELINE_RESULT_VALUE_SKIP = "skip";
    exports.CICD_PIPELINE_RESULT_VALUE_SUCCESS = "success";
    exports.CICD_PIPELINE_RESULT_VALUE_TIMEOUT = "timeout";
    exports.ATTR_CICD_PIPELINE_RUN_ID = "cicd.pipeline.run.id";
    exports.ATTR_CICD_PIPELINE_RUN_STATE = "cicd.pipeline.run.state";
    exports.CICD_PIPELINE_RUN_STATE_VALUE_EXECUTING = "executing";
    exports.CICD_PIPELINE_RUN_STATE_VALUE_FINALIZING = "finalizing";
    exports.CICD_PIPELINE_RUN_STATE_VALUE_PENDING = "pending";
    exports.ATTR_CICD_PIPELINE_RUN_URL_FULL = "cicd.pipeline.run.url.full";
    exports.ATTR_CICD_PIPELINE_TASK_NAME = "cicd.pipeline.task.name";
    exports.ATTR_CICD_PIPELINE_TASK_RUN_ID = "cicd.pipeline.task.run.id";
    exports.ATTR_CICD_PIPELINE_TASK_RUN_RESULT = "cicd.pipeline.task.run.result";
    exports.CICD_PIPELINE_TASK_RUN_RESULT_VALUE_CANCELLATION = "cancellation";
    exports.CICD_PIPELINE_TASK_RUN_RESULT_VALUE_ERROR = "error";
    exports.CICD_PIPELINE_TASK_RUN_RESULT_VALUE_FAILURE = "failure";
    exports.CICD_PIPELINE_TASK_RUN_RESULT_VALUE_SKIP = "skip";
    exports.CICD_PIPELINE_TASK_RUN_RESULT_VALUE_SUCCESS = "success";
    exports.CICD_PIPELINE_TASK_RUN_RESULT_VALUE_TIMEOUT = "timeout";
    exports.ATTR_CICD_PIPELINE_TASK_RUN_URL_FULL = "cicd.pipeline.task.run.url.full";
    exports.ATTR_CICD_PIPELINE_TASK_TYPE = "cicd.pipeline.task.type";
    exports.CICD_PIPELINE_TASK_TYPE_VALUE_BUILD = "build";
    exports.CICD_PIPELINE_TASK_TYPE_VALUE_DEPLOY = "deploy";
    exports.CICD_PIPELINE_TASK_TYPE_VALUE_TEST = "test";
    exports.ATTR_CICD_SYSTEM_COMPONENT = "cicd.system.component";
    exports.ATTR_CICD_WORKER_ID = "cicd.worker.id";
    exports.ATTR_CICD_WORKER_NAME = "cicd.worker.name";
    exports.ATTR_CICD_WORKER_STATE = "cicd.worker.state";
    exports.CICD_WORKER_STATE_VALUE_AVAILABLE = "available";
    exports.CICD_WORKER_STATE_VALUE_BUSY = "busy";
    exports.CICD_WORKER_STATE_VALUE_OFFLINE = "offline";
    exports.ATTR_CICD_WORKER_URL_FULL = "cicd.worker.url.full";
    exports.ATTR_CLOUD_ACCOUNT_ID = "cloud.account.id";
    exports.ATTR_CLOUD_AVAILABILITY_ZONE = "cloud.availability_zone";
    exports.ATTR_CLOUD_PLATFORM = "cloud.platform";
    exports.CLOUD_PLATFORM_VALUE_AKAMAI_CLOUD_COMPUTE = "akamai_cloud.compute";
    exports.CLOUD_PLATFORM_VALUE_ALIBABA_CLOUD_ECS = "alibaba_cloud_ecs";
    exports.CLOUD_PLATFORM_VALUE_ALIBABA_CLOUD_FC = "alibaba_cloud_fc";
    exports.CLOUD_PLATFORM_VALUE_ALIBABA_CLOUD_OPENSHIFT = "alibaba_cloud_openshift";
    exports.CLOUD_PLATFORM_VALUE_AWS_APP_RUNNER = "aws_app_runner";
    exports.CLOUD_PLATFORM_VALUE_AWS_EC2 = "aws_ec2";
    exports.CLOUD_PLATFORM_VALUE_AWS_ECS = "aws_ecs";
    exports.CLOUD_PLATFORM_VALUE_AWS_EKS = "aws_eks";
    exports.CLOUD_PLATFORM_VALUE_AWS_ELASTIC_BEANSTALK = "aws_elastic_beanstalk";
    exports.CLOUD_PLATFORM_VALUE_AWS_LAMBDA = "aws_lambda";
    exports.CLOUD_PLATFORM_VALUE_AWS_OPENSHIFT = "aws_openshift";
    exports.CLOUD_PLATFORM_VALUE_AZURE_AKS = "azure.aks";
    exports.CLOUD_PLATFORM_VALUE_AZURE_APP_SERVICE = "azure.app_service";
    exports.CLOUD_PLATFORM_VALUE_AZURE_CONTAINER_APPS = "azure.container_apps";
    exports.CLOUD_PLATFORM_VALUE_AZURE_CONTAINER_INSTANCES = "azure.container_instances";
    exports.CLOUD_PLATFORM_VALUE_AZURE_FUNCTIONS = "azure.functions";
    exports.CLOUD_PLATFORM_VALUE_AZURE_OPENSHIFT = "azure.openshift";
    exports.CLOUD_PLATFORM_VALUE_AZURE_VM = "azure.vm";
    exports.CLOUD_PLATFORM_VALUE_GCP_AGENT_ENGINE = "gcp.agent_engine";
    exports.CLOUD_PLATFORM_VALUE_GCP_APP_ENGINE = "gcp_app_engine";
    exports.CLOUD_PLATFORM_VALUE_GCP_BARE_METAL_SOLUTION = "gcp_bare_metal_solution";
    exports.CLOUD_PLATFORM_VALUE_GCP_CLOUD_FUNCTIONS = "gcp_cloud_functions";
    exports.CLOUD_PLATFORM_VALUE_GCP_CLOUD_RUN = "gcp_cloud_run";
    exports.CLOUD_PLATFORM_VALUE_GCP_COMPUTE_ENGINE = "gcp_compute_engine";
    exports.CLOUD_PLATFORM_VALUE_GCP_KUBERNETES_ENGINE = "gcp_kubernetes_engine";
    exports.CLOUD_PLATFORM_VALUE_GCP_OPENSHIFT = "gcp_openshift";
    exports.CLOUD_PLATFORM_VALUE_HETZNER_CLOUD_SERVER = "hetzner.cloud_server";
    exports.CLOUD_PLATFORM_VALUE_IBM_CLOUD_OPENSHIFT = "ibm_cloud_openshift";
    exports.CLOUD_PLATFORM_VALUE_ORACLE_CLOUD_COMPUTE = "oracle_cloud_compute";
    exports.CLOUD_PLATFORM_VALUE_ORACLE_CLOUD_OKE = "oracle_cloud_oke";
    exports.CLOUD_PLATFORM_VALUE_TENCENT_CLOUD_CVM = "tencent_cloud_cvm";
    exports.CLOUD_PLATFORM_VALUE_TENCENT_CLOUD_EKS = "tencent_cloud_eks";
    exports.CLOUD_PLATFORM_VALUE_TENCENT_CLOUD_SCF = "tencent_cloud_scf";
    exports.CLOUD_PLATFORM_VALUE_VULTR_CLOUD_COMPUTE = "vultr.cloud_compute";
    exports.ATTR_CLOUD_PROVIDER = "cloud.provider";
    exports.CLOUD_PROVIDER_VALUE_AKAMAI_CLOUD = "akamai_cloud";
    exports.CLOUD_PROVIDER_VALUE_ALIBABA_CLOUD = "alibaba_cloud";
    exports.CLOUD_PROVIDER_VALUE_AWS = "aws";
    exports.CLOUD_PROVIDER_VALUE_AZURE = "azure";
    exports.CLOUD_PROVIDER_VALUE_GCP = "gcp";
    exports.CLOUD_PROVIDER_VALUE_HEROKU = "heroku";
    exports.CLOUD_PROVIDER_VALUE_HETZNER = "hetzner";
    exports.CLOUD_PROVIDER_VALUE_IBM_CLOUD = "ibm_cloud";
    exports.CLOUD_PROVIDER_VALUE_ORACLE_CLOUD = "oracle_cloud";
    exports.CLOUD_PROVIDER_VALUE_TENCENT_CLOUD = "tencent_cloud";
    exports.CLOUD_PROVIDER_VALUE_VULTR = "vultr";
    exports.ATTR_CLOUD_REGION = "cloud.region";
    exports.ATTR_CLOUD_RESOURCE_ID = "cloud.resource_id";
    exports.ATTR_CLOUDEVENTS_EVENT_ID = "cloudevents.event_id";
    exports.ATTR_CLOUDEVENTS_EVENT_SOURCE = "cloudevents.event_source";
    exports.ATTR_CLOUDEVENTS_EVENT_SPEC_VERSION = "cloudevents.event_spec_version";
    exports.ATTR_CLOUDEVENTS_EVENT_SUBJECT = "cloudevents.event_subject";
    exports.ATTR_CLOUDEVENTS_EVENT_TYPE = "cloudevents.event_type";
    exports.ATTR_CLOUDFOUNDRY_APP_ID = "cloudfoundry.app.id";
    exports.ATTR_CLOUDFOUNDRY_APP_INSTANCE_ID = "cloudfoundry.app.instance.id";
    exports.ATTR_CLOUDFOUNDRY_APP_NAME = "cloudfoundry.app.name";
    exports.ATTR_CLOUDFOUNDRY_ORG_ID = "cloudfoundry.org.id";
    exports.ATTR_CLOUDFOUNDRY_ORG_NAME = "cloudfoundry.org.name";
    exports.ATTR_CLOUDFOUNDRY_PROCESS_ID = "cloudfoundry.process.id";
    exports.ATTR_CLOUDFOUNDRY_PROCESS_TYPE = "cloudfoundry.process.type";
    exports.ATTR_CLOUDFOUNDRY_SPACE_ID = "cloudfoundry.space.id";
    exports.ATTR_CLOUDFOUNDRY_SPACE_NAME = "cloudfoundry.space.name";
    exports.ATTR_CLOUDFOUNDRY_SYSTEM_ID = "cloudfoundry.system.id";
    exports.ATTR_CLOUDFOUNDRY_SYSTEM_INSTANCE_ID = "cloudfoundry.system.instance.id";
    exports.ATTR_CODE_COLUMN = "code.column";
    exports.ATTR_CODE_FILEPATH = "code.filepath";
    exports.ATTR_CODE_FUNCTION = "code.function";
    exports.ATTR_CODE_LINENO = "code.lineno";
    exports.ATTR_CODE_NAMESPACE = "code.namespace";
    exports.ATTR_CONTAINER_COMMAND = "container.command";
    exports.ATTR_CONTAINER_COMMAND_ARGS = "container.command_args";
    exports.ATTR_CONTAINER_COMMAND_LINE = "container.command_line";
    exports.ATTR_CONTAINER_CPU_STATE = "container.cpu.state";
    exports.CONTAINER_CPU_STATE_VALUE_KERNEL = "kernel";
    exports.CONTAINER_CPU_STATE_VALUE_SYSTEM = "system";
    exports.CONTAINER_CPU_STATE_VALUE_USER = "user";
    exports.ATTR_CONTAINER_CSI_PLUGIN_NAME = "container.csi.plugin.name";
    exports.ATTR_CONTAINER_CSI_VOLUME_ID = "container.csi.volume.id";
    exports.ATTR_CONTAINER_ID = "container.id";
    exports.ATTR_CONTAINER_IMAGE_ID = "container.image.id";
    exports.ATTR_CONTAINER_IMAGE_NAME = "container.image.name";
    exports.ATTR_CONTAINER_IMAGE_REPO_DIGESTS = "container.image.repo_digests";
    exports.ATTR_CONTAINER_IMAGE_TAGS = "container.image.tags";
    var ATTR_CONTAINER_LABEL = /* @__PURE__ */ __name((key) => `container.label.${key}`, "ATTR_CONTAINER_LABEL");
    exports.ATTR_CONTAINER_LABEL = ATTR_CONTAINER_LABEL;
    var ATTR_CONTAINER_LABELS = /* @__PURE__ */ __name((key) => `container.labels.${key}`, "ATTR_CONTAINER_LABELS");
    exports.ATTR_CONTAINER_LABELS = ATTR_CONTAINER_LABELS;
    exports.ATTR_CONTAINER_NAME = "container.name";
    exports.ATTR_CONTAINER_RUNTIME = "container.runtime";
    exports.ATTR_CONTAINER_RUNTIME_DESCRIPTION = "container.runtime.description";
    exports.ATTR_CONTAINER_RUNTIME_NAME = "container.runtime.name";
    exports.ATTR_CONTAINER_RUNTIME_VERSION = "container.runtime.version";
    exports.ATTR_CPU_LOGICAL_NUMBER = "cpu.logical_number";
    exports.ATTR_CPU_MODE = "cpu.mode";
    exports.CPU_MODE_VALUE_IDLE = "idle";
    exports.CPU_MODE_VALUE_INTERRUPT = "interrupt";
    exports.CPU_MODE_VALUE_IOWAIT = "iowait";
    exports.CPU_MODE_VALUE_KERNEL = "kernel";
    exports.CPU_MODE_VALUE_NICE = "nice";
    exports.CPU_MODE_VALUE_STEAL = "steal";
    exports.CPU_MODE_VALUE_SYSTEM = "system";
    exports.CPU_MODE_VALUE_USER = "user";
    exports.ATTR_CPYTHON_GC_GENERATION = "cpython.gc.generation";
    exports.CPYTHON_GC_GENERATION_VALUE_GENERATION_0 = 0;
    exports.CPYTHON_GC_GENERATION_VALUE_GENERATION_1 = 1;
    exports.CPYTHON_GC_GENERATION_VALUE_GENERATION_2 = 2;
    exports.ATTR_DB_CASSANDRA_CONSISTENCY_LEVEL = "db.cassandra.consistency_level";
    exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_ALL = "all";
    exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_ANY = "any";
    exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_EACH_QUORUM = "each_quorum";
    exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_LOCAL_ONE = "local_one";
    exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_LOCAL_QUORUM = "local_quorum";
    exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_LOCAL_SERIAL = "local_serial";
    exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_ONE = "one";
    exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_QUORUM = "quorum";
    exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_SERIAL = "serial";
    exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_THREE = "three";
    exports.DB_CASSANDRA_CONSISTENCY_LEVEL_VALUE_TWO = "two";
    exports.ATTR_DB_CASSANDRA_COORDINATOR_DC = "db.cassandra.coordinator.dc";
    exports.ATTR_DB_CASSANDRA_COORDINATOR_ID = "db.cassandra.coordinator.id";
    exports.ATTR_DB_CASSANDRA_IDEMPOTENCE = "db.cassandra.idempotence";
    exports.ATTR_DB_CASSANDRA_PAGE_SIZE = "db.cassandra.page_size";
    exports.ATTR_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT = "db.cassandra.speculative_execution_count";
    exports.ATTR_DB_CASSANDRA_TABLE = "db.cassandra.table";
    exports.ATTR_DB_CLIENT_CONNECTION_POOL_NAME = "db.client.connection.pool.name";
    exports.ATTR_DB_CLIENT_CONNECTION_STATE = "db.client.connection.state";
    exports.DB_CLIENT_CONNECTION_STATE_VALUE_IDLE = "idle";
    exports.DB_CLIENT_CONNECTION_STATE_VALUE_USED = "used";
    exports.ATTR_DB_CLIENT_CONNECTIONS_POOL_NAME = "db.client.connections.pool.name";
    exports.ATTR_DB_CLIENT_CONNECTIONS_STATE = "db.client.connections.state";
    exports.DB_CLIENT_CONNECTIONS_STATE_VALUE_IDLE = "idle";
    exports.DB_CLIENT_CONNECTIONS_STATE_VALUE_USED = "used";
    exports.ATTR_DB_CONNECTION_STRING = "db.connection_string";
    exports.ATTR_DB_COSMOSDB_CLIENT_ID = "db.cosmosdb.client_id";
    exports.ATTR_DB_COSMOSDB_CONNECTION_MODE = "db.cosmosdb.connection_mode";
    exports.DB_COSMOSDB_CONNECTION_MODE_VALUE_DIRECT = "direct";
    exports.DB_COSMOSDB_CONNECTION_MODE_VALUE_GATEWAY = "gateway";
    exports.ATTR_DB_COSMOSDB_CONSISTENCY_LEVEL = "db.cosmosdb.consistency_level";
    exports.DB_COSMOSDB_CONSISTENCY_LEVEL_VALUE_BOUNDED_STALENESS = "BoundedStaleness";
    exports.DB_COSMOSDB_CONSISTENCY_LEVEL_VALUE_CONSISTENT_PREFIX = "ConsistentPrefix";
    exports.DB_COSMOSDB_CONSISTENCY_LEVEL_VALUE_EVENTUAL = "Eventual";
    exports.DB_COSMOSDB_CONSISTENCY_LEVEL_VALUE_SESSION = "Session";
    exports.DB_COSMOSDB_CONSISTENCY_LEVEL_VALUE_STRONG = "Strong";
    exports.ATTR_DB_COSMOSDB_CONTAINER = "db.cosmosdb.container";
    exports.ATTR_DB_COSMOSDB_OPERATION_TYPE = "db.cosmosdb.operation_type";
    exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_BATCH = "batch";
    exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_CREATE = "create";
    exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_DELETE = "delete";
    exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_EXECUTE = "execute";
    exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_EXECUTE_JAVASCRIPT = "execute_javascript";
    exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_HEAD = "head";
    exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_HEAD_FEED = "head_feed";
    exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_INVALID = "invalid";
    exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_PATCH = "patch";
    exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_QUERY = "query";
    exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_QUERY_PLAN = "query_plan";
    exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_READ = "read";
    exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_READ_FEED = "read_feed";
    exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_REPLACE = "replace";
    exports.DB_COSMOSDB_OPERATION_TYPE_VALUE_UPSERT = "upsert";
    exports.ATTR_DB_COSMOSDB_REGIONS_CONTACTED = "db.cosmosdb.regions_contacted";
    exports.ATTR_DB_COSMOSDB_REQUEST_CHARGE = "db.cosmosdb.request_charge";
    exports.ATTR_DB_COSMOSDB_REQUEST_CONTENT_LENGTH = "db.cosmosdb.request_content_length";
    exports.ATTR_DB_COSMOSDB_STATUS_CODE = "db.cosmosdb.status_code";
    exports.ATTR_DB_COSMOSDB_SUB_STATUS_CODE = "db.cosmosdb.sub_status_code";
    exports.ATTR_DB_ELASTICSEARCH_CLUSTER_NAME = "db.elasticsearch.cluster.name";
    exports.ATTR_DB_ELASTICSEARCH_NODE_NAME = "db.elasticsearch.node.name";
    var ATTR_DB_ELASTICSEARCH_PATH_PARTS = /* @__PURE__ */ __name((key) => `db.elasticsearch.path_parts.${key}`, "ATTR_DB_ELASTICSEARCH_PATH_PARTS");
    exports.ATTR_DB_ELASTICSEARCH_PATH_PARTS = ATTR_DB_ELASTICSEARCH_PATH_PARTS;
    exports.ATTR_DB_INSTANCE_ID = "db.instance.id";
    exports.ATTR_DB_JDBC_DRIVER_CLASSNAME = "db.jdbc.driver_classname";
    exports.ATTR_DB_MONGODB_COLLECTION = "db.mongodb.collection";
    exports.ATTR_DB_MSSQL_INSTANCE_NAME = "db.mssql.instance_name";
    exports.ATTR_DB_NAME = "db.name";
    exports.ATTR_DB_OPERATION = "db.operation";
    var ATTR_DB_OPERATION_PARAMETER = /* @__PURE__ */ __name((key) => `db.operation.parameter.${key}`, "ATTR_DB_OPERATION_PARAMETER");
    exports.ATTR_DB_OPERATION_PARAMETER = ATTR_DB_OPERATION_PARAMETER;
    var ATTR_DB_QUERY_PARAMETER = /* @__PURE__ */ __name((key) => `db.query.parameter.${key}`, "ATTR_DB_QUERY_PARAMETER");
    exports.ATTR_DB_QUERY_PARAMETER = ATTR_DB_QUERY_PARAMETER;
    exports.ATTR_DB_REDIS_DATABASE_INDEX = "db.redis.database_index";
    exports.ATTR_DB_RESPONSE_RETURNED_ROWS = "db.response.returned_rows";
    exports.ATTR_DB_SQL_TABLE = "db.sql.table";
    exports.ATTR_DB_STATEMENT = "db.statement";
    exports.ATTR_DB_SYSTEM = "db.system";
    exports.DB_SYSTEM_VALUE_ADABAS = "adabas";
    exports.DB_SYSTEM_VALUE_CACHE = "cache";
    exports.DB_SYSTEM_VALUE_CASSANDRA = "cassandra";
    exports.DB_SYSTEM_VALUE_CLICKHOUSE = "clickhouse";
    exports.DB_SYSTEM_VALUE_CLOUDSCAPE = "cloudscape";
    exports.DB_SYSTEM_VALUE_COCKROACHDB = "cockroachdb";
    exports.DB_SYSTEM_VALUE_COLDFUSION = "coldfusion";
    exports.DB_SYSTEM_VALUE_COSMOSDB = "cosmosdb";
    exports.DB_SYSTEM_VALUE_COUCHBASE = "couchbase";
    exports.DB_SYSTEM_VALUE_COUCHDB = "couchdb";
    exports.DB_SYSTEM_VALUE_DB2 = "db2";
    exports.DB_SYSTEM_VALUE_DERBY = "derby";
    exports.DB_SYSTEM_VALUE_DYNAMODB = "dynamodb";
    exports.DB_SYSTEM_VALUE_EDB = "edb";
    exports.DB_SYSTEM_VALUE_ELASTICSEARCH = "elasticsearch";
    exports.DB_SYSTEM_VALUE_FILEMAKER = "filemaker";
    exports.DB_SYSTEM_VALUE_FIREBIRD = "firebird";
    exports.DB_SYSTEM_VALUE_FIRSTSQL = "firstsql";
    exports.DB_SYSTEM_VALUE_GEODE = "geode";
    exports.DB_SYSTEM_VALUE_H2 = "h2";
    exports.DB_SYSTEM_VALUE_HANADB = "hanadb";
    exports.DB_SYSTEM_VALUE_HBASE = "hbase";
    exports.DB_SYSTEM_VALUE_HIVE = "hive";
    exports.DB_SYSTEM_VALUE_HSQLDB = "hsqldb";
    exports.DB_SYSTEM_VALUE_INFLUXDB = "influxdb";
    exports.DB_SYSTEM_VALUE_INFORMIX = "informix";
    exports.DB_SYSTEM_VALUE_INGRES = "ingres";
    exports.DB_SYSTEM_VALUE_INSTANTDB = "instantdb";
    exports.DB_SYSTEM_VALUE_INTERBASE = "interbase";
    exports.DB_SYSTEM_VALUE_INTERSYSTEMS_CACHE = "intersystems_cache";
    exports.DB_SYSTEM_VALUE_MARIADB = "mariadb";
    exports.DB_SYSTEM_VALUE_MAXDB = "maxdb";
    exports.DB_SYSTEM_VALUE_MEMCACHED = "memcached";
    exports.DB_SYSTEM_VALUE_MONGODB = "mongodb";
    exports.DB_SYSTEM_VALUE_MSSQL = "mssql";
    exports.DB_SYSTEM_VALUE_MSSQLCOMPACT = "mssqlcompact";
    exports.DB_SYSTEM_VALUE_MYSQL = "mysql";
    exports.DB_SYSTEM_VALUE_NEO4J = "neo4j";
    exports.DB_SYSTEM_VALUE_NETEZZA = "netezza";
    exports.DB_SYSTEM_VALUE_OPENSEARCH = "opensearch";
    exports.DB_SYSTEM_VALUE_ORACLE = "oracle";
    exports.DB_SYSTEM_VALUE_OTHER_SQL = "other_sql";
    exports.DB_SYSTEM_VALUE_PERVASIVE = "pervasive";
    exports.DB_SYSTEM_VALUE_POINTBASE = "pointbase";
    exports.DB_SYSTEM_VALUE_POSTGRESQL = "postgresql";
    exports.DB_SYSTEM_VALUE_PROGRESS = "progress";
    exports.DB_SYSTEM_VALUE_REDIS = "redis";
    exports.DB_SYSTEM_VALUE_REDSHIFT = "redshift";
    exports.DB_SYSTEM_VALUE_SPANNER = "spanner";
    exports.DB_SYSTEM_VALUE_SQLITE = "sqlite";
    exports.DB_SYSTEM_VALUE_SYBASE = "sybase";
    exports.DB_SYSTEM_VALUE_TERADATA = "teradata";
    exports.DB_SYSTEM_VALUE_TRINO = "trino";
    exports.DB_SYSTEM_VALUE_VERTICA = "vertica";
    exports.DB_SYSTEM_NAME_VALUE_ACTIAN_INGRES = "actian.ingres";
    exports.DB_SYSTEM_NAME_VALUE_AWS_DYNAMODB = "aws.dynamodb";
    exports.DB_SYSTEM_NAME_VALUE_AWS_REDSHIFT = "aws.redshift";
    exports.DB_SYSTEM_NAME_VALUE_AZURE_COSMOSDB = "azure.cosmosdb";
    exports.DB_SYSTEM_NAME_VALUE_CASSANDRA = "cassandra";
    exports.DB_SYSTEM_NAME_VALUE_CLICKHOUSE = "clickhouse";
    exports.DB_SYSTEM_NAME_VALUE_COCKROACHDB = "cockroachdb";
    exports.DB_SYSTEM_NAME_VALUE_COUCHBASE = "couchbase";
    exports.DB_SYSTEM_NAME_VALUE_COUCHDB = "couchdb";
    exports.DB_SYSTEM_NAME_VALUE_DERBY = "derby";
    exports.DB_SYSTEM_NAME_VALUE_ELASTICSEARCH = "elasticsearch";
    exports.DB_SYSTEM_NAME_VALUE_FIREBIRDSQL = "firebirdsql";
    exports.DB_SYSTEM_NAME_VALUE_GCP_SPANNER = "gcp.spanner";
    exports.DB_SYSTEM_NAME_VALUE_GEODE = "geode";
    exports.DB_SYSTEM_NAME_VALUE_H2DATABASE = "h2database";
    exports.DB_SYSTEM_NAME_VALUE_HBASE = "hbase";
    exports.DB_SYSTEM_NAME_VALUE_HIVE = "hive";
    exports.DB_SYSTEM_NAME_VALUE_HSQLDB = "hsqldb";
    exports.DB_SYSTEM_NAME_VALUE_IBM_DB2 = "ibm.db2";
    exports.DB_SYSTEM_NAME_VALUE_IBM_INFORMIX = "ibm.informix";
    exports.DB_SYSTEM_NAME_VALUE_IBM_NETEZZA = "ibm.netezza";
    exports.DB_SYSTEM_NAME_VALUE_INFLUXDB = "influxdb";
    exports.DB_SYSTEM_NAME_VALUE_INSTANTDB = "instantdb";
    exports.DB_SYSTEM_NAME_VALUE_INTERSYSTEMS_CACHE = "intersystems.cache";
    exports.DB_SYSTEM_NAME_VALUE_MEMCACHED = "memcached";
    exports.DB_SYSTEM_NAME_VALUE_MONGODB = "mongodb";
    exports.DB_SYSTEM_NAME_VALUE_NEO4J = "neo4j";
    exports.DB_SYSTEM_NAME_VALUE_OPENSEARCH = "opensearch";
    exports.DB_SYSTEM_NAME_VALUE_ORACLE_DB = "oracle.db";
    exports.DB_SYSTEM_NAME_VALUE_OTHER_SQL = "other_sql";
    exports.DB_SYSTEM_NAME_VALUE_REDIS = "redis";
    exports.DB_SYSTEM_NAME_VALUE_SAP_HANA = "sap.hana";
    exports.DB_SYSTEM_NAME_VALUE_SAP_MAXDB = "sap.maxdb";
    exports.DB_SYSTEM_NAME_VALUE_SOFTWAREAG_ADABAS = "softwareag.adabas";
    exports.DB_SYSTEM_NAME_VALUE_SQLITE = "sqlite";
    exports.DB_SYSTEM_NAME_VALUE_TERADATA = "teradata";
    exports.DB_SYSTEM_NAME_VALUE_TRINO = "trino";
    exports.ATTR_DB_USER = "db.user";
    exports.ATTR_DEPLOYMENT_ENVIRONMENT = "deployment.environment";
    exports.ATTR_DEPLOYMENT_ENVIRONMENT_NAME = "deployment.environment.name";
    exports.ATTR_DEPLOYMENT_ID = "deployment.id";
    exports.ATTR_DEPLOYMENT_NAME = "deployment.name";
    exports.ATTR_DEPLOYMENT_STATUS = "deployment.status";
    exports.DEPLOYMENT_STATUS_VALUE_FAILED = "failed";
    exports.DEPLOYMENT_STATUS_VALUE_SUCCEEDED = "succeeded";
    exports.ATTR_DESTINATION_ADDRESS = "destination.address";
    exports.ATTR_DESTINATION_PORT = "destination.port";
    exports.ATTR_DEVICE_ID = "device.id";
    exports.ATTR_DEVICE_MANUFACTURER = "device.manufacturer";
    exports.ATTR_DEVICE_MODEL_IDENTIFIER = "device.model.identifier";
    exports.ATTR_DEVICE_MODEL_NAME = "device.model.name";
    exports.ATTR_DISK_IO_DIRECTION = "disk.io.direction";
    exports.DISK_IO_DIRECTION_VALUE_READ = "read";
    exports.DISK_IO_DIRECTION_VALUE_WRITE = "write";
    exports.ATTR_DNS_ANSWERS = "dns.answers";
    exports.ATTR_DNS_QUESTION_NAME = "dns.question.name";
    exports.ATTR_ELASTICSEARCH_NODE_NAME = "elasticsearch.node.name";
    exports.ATTR_ENDUSER_ID = "enduser.id";
    exports.ATTR_ENDUSER_PSEUDO_ID = "enduser.pseudo.id";
    exports.ATTR_ENDUSER_ROLE = "enduser.role";
    exports.ATTR_ENDUSER_SCOPE = "enduser.scope";
    exports.ATTR_ERROR_MESSAGE = "error.message";
    exports.ATTR_EVENT_NAME = "event.name";
    exports.ATTR_FAAS_COLDSTART = "faas.coldstart";
    exports.ATTR_FAAS_CRON = "faas.cron";
    exports.ATTR_FAAS_DOCUMENT_COLLECTION = "faas.document.collection";
    exports.ATTR_FAAS_DOCUMENT_NAME = "faas.document.name";
    exports.ATTR_FAAS_DOCUMENT_OPERATION = "faas.document.operation";
    exports.FAAS_DOCUMENT_OPERATION_VALUE_DELETE = "delete";
    exports.FAAS_DOCUMENT_OPERATION_VALUE_EDIT = "edit";
    exports.FAAS_DOCUMENT_OPERATION_VALUE_INSERT = "insert";
    exports.ATTR_FAAS_DOCUMENT_TIME = "faas.document.time";
    exports.ATTR_FAAS_INSTANCE = "faas.instance";
    exports.ATTR_FAAS_INVOCATION_ID = "faas.invocation_id";
    exports.ATTR_FAAS_INVOKED_NAME = "faas.invoked_name";
    exports.ATTR_FAAS_INVOKED_PROVIDER = "faas.invoked_provider";
    exports.FAAS_INVOKED_PROVIDER_VALUE_ALIBABA_CLOUD = "alibaba_cloud";
    exports.FAAS_INVOKED_PROVIDER_VALUE_AWS = "aws";
    exports.FAAS_INVOKED_PROVIDER_VALUE_AZURE = "azure";
    exports.FAAS_INVOKED_PROVIDER_VALUE_GCP = "gcp";
    exports.FAAS_INVOKED_PROVIDER_VALUE_TENCENT_CLOUD = "tencent_cloud";
    exports.ATTR_FAAS_INVOKED_REGION = "faas.invoked_region";
    exports.ATTR_FAAS_MAX_MEMORY = "faas.max_memory";
    exports.ATTR_FAAS_NAME = "faas.name";
    exports.ATTR_FAAS_TIME = "faas.time";
    exports.ATTR_FAAS_TRIGGER = "faas.trigger";
    exports.FAAS_TRIGGER_VALUE_DATASOURCE = "datasource";
    exports.FAAS_TRIGGER_VALUE_HTTP = "http";
    exports.FAAS_TRIGGER_VALUE_OTHER = "other";
    exports.FAAS_TRIGGER_VALUE_PUBSUB = "pubsub";
    exports.FAAS_TRIGGER_VALUE_TIMER = "timer";
    exports.ATTR_FAAS_VERSION = "faas.version";
    exports.ATTR_FEATURE_FLAG_CONTEXT_ID = "feature_flag.context.id";
    exports.ATTR_FEATURE_FLAG_EVALUATION_ERROR_MESSAGE = "feature_flag.evaluation.error.message";
    exports.ATTR_FEATURE_FLAG_EVALUATION_REASON = "feature_flag.evaluation.reason";
    exports.FEATURE_FLAG_EVALUATION_REASON_VALUE_CACHED = "cached";
    exports.FEATURE_FLAG_EVALUATION_REASON_VALUE_DEFAULT = "default";
    exports.FEATURE_FLAG_EVALUATION_REASON_VALUE_DISABLED = "disabled";
    exports.FEATURE_FLAG_EVALUATION_REASON_VALUE_ERROR = "error";
    exports.FEATURE_FLAG_EVALUATION_REASON_VALUE_SPLIT = "split";
    exports.FEATURE_FLAG_EVALUATION_REASON_VALUE_STALE = "stale";
    exports.FEATURE_FLAG_EVALUATION_REASON_VALUE_STATIC = "static";
    exports.FEATURE_FLAG_EVALUATION_REASON_VALUE_TARGETING_MATCH = "targeting_match";
    exports.FEATURE_FLAG_EVALUATION_REASON_VALUE_UNKNOWN = "unknown";
    exports.ATTR_FEATURE_FLAG_KEY = "feature_flag.key";
    exports.ATTR_FEATURE_FLAG_PROVIDER_NAME = "feature_flag.provider.name";
    exports.ATTR_FEATURE_FLAG_RESULT_REASON = "feature_flag.result.reason";
    exports.FEATURE_FLAG_RESULT_REASON_VALUE_CACHED = "cached";
    exports.FEATURE_FLAG_RESULT_REASON_VALUE_DEFAULT = "default";
    exports.FEATURE_FLAG_RESULT_REASON_VALUE_DISABLED = "disabled";
    exports.FEATURE_FLAG_RESULT_REASON_VALUE_ERROR = "error";
    exports.FEATURE_FLAG_RESULT_REASON_VALUE_SPLIT = "split";
    exports.FEATURE_FLAG_RESULT_REASON_VALUE_STALE = "stale";
    exports.FEATURE_FLAG_RESULT_REASON_VALUE_STATIC = "static";
    exports.FEATURE_FLAG_RESULT_REASON_VALUE_TARGETING_MATCH = "targeting_match";
    exports.FEATURE_FLAG_RESULT_REASON_VALUE_UNKNOWN = "unknown";
    exports.ATTR_FEATURE_FLAG_RESULT_VALUE = "feature_flag.result.value";
    exports.ATTR_FEATURE_FLAG_RESULT_VARIANT = "feature_flag.result.variant";
    exports.ATTR_FEATURE_FLAG_SET_ID = "feature_flag.set.id";
    exports.ATTR_FEATURE_FLAG_VARIANT = "feature_flag.variant";
    exports.ATTR_FEATURE_FLAG_VERSION = "feature_flag.version";
    exports.ATTR_FILE_ACCESSED = "file.accessed";
    exports.ATTR_FILE_ATTRIBUTES = "file.attributes";
    exports.ATTR_FILE_CHANGED = "file.changed";
    exports.ATTR_FILE_CREATED = "file.created";
    exports.ATTR_FILE_DIRECTORY = "file.directory";
    exports.ATTR_FILE_EXTENSION = "file.extension";
    exports.ATTR_FILE_FORK_NAME = "file.fork_name";
    exports.ATTR_FILE_GROUP_ID = "file.group.id";
    exports.ATTR_FILE_GROUP_NAME = "file.group.name";
    exports.ATTR_FILE_INODE = "file.inode";
    exports.ATTR_FILE_MODE = "file.mode";
    exports.ATTR_FILE_MODIFIED = "file.modified";
    exports.ATTR_FILE_NAME = "file.name";
    exports.ATTR_FILE_OWNER_ID = "file.owner.id";
    exports.ATTR_FILE_OWNER_NAME = "file.owner.name";
    exports.ATTR_FILE_PATH = "file.path";
    exports.ATTR_FILE_SIZE = "file.size";
    exports.ATTR_FILE_SYMBOLIC_LINK_TARGET_PATH = "file.symbolic_link.target_path";
    exports.ATTR_GCP_APPHUB_APPLICATION_CONTAINER = "gcp.apphub.application.container";
    exports.ATTR_GCP_APPHUB_APPLICATION_ID = "gcp.apphub.application.id";
    exports.ATTR_GCP_APPHUB_APPLICATION_LOCATION = "gcp.apphub.application.location";
    exports.ATTR_GCP_APPHUB_SERVICE_CRITICALITY_TYPE = "gcp.apphub.service.criticality_type";
    exports.GCP_APPHUB_SERVICE_CRITICALITY_TYPE_VALUE_HIGH = "HIGH";
    exports.GCP_APPHUB_SERVICE_CRITICALITY_TYPE_VALUE_LOW = "LOW";
    exports.GCP_APPHUB_SERVICE_CRITICALITY_TYPE_VALUE_MEDIUM = "MEDIUM";
    exports.GCP_APPHUB_SERVICE_CRITICALITY_TYPE_VALUE_MISSION_CRITICAL = "MISSION_CRITICAL";
    exports.ATTR_GCP_APPHUB_SERVICE_ENVIRONMENT_TYPE = "gcp.apphub.service.environment_type";
    exports.GCP_APPHUB_SERVICE_ENVIRONMENT_TYPE_VALUE_DEVELOPMENT = "DEVELOPMENT";
    exports.GCP_APPHUB_SERVICE_ENVIRONMENT_TYPE_VALUE_PRODUCTION = "PRODUCTION";
    exports.GCP_APPHUB_SERVICE_ENVIRONMENT_TYPE_VALUE_STAGING = "STAGING";
    exports.GCP_APPHUB_SERVICE_ENVIRONMENT_TYPE_VALUE_TEST = "TEST";
    exports.ATTR_GCP_APPHUB_SERVICE_ID = "gcp.apphub.service.id";
    exports.ATTR_GCP_APPHUB_WORKLOAD_CRITICALITY_TYPE = "gcp.apphub.workload.criticality_type";
    exports.GCP_APPHUB_WORKLOAD_CRITICALITY_TYPE_VALUE_HIGH = "HIGH";
    exports.GCP_APPHUB_WORKLOAD_CRITICALITY_TYPE_VALUE_LOW = "LOW";
    exports.GCP_APPHUB_WORKLOAD_CRITICALITY_TYPE_VALUE_MEDIUM = "MEDIUM";
    exports.GCP_APPHUB_WORKLOAD_CRITICALITY_TYPE_VALUE_MISSION_CRITICAL = "MISSION_CRITICAL";
    exports.ATTR_GCP_APPHUB_WORKLOAD_ENVIRONMENT_TYPE = "gcp.apphub.workload.environment_type";
    exports.GCP_APPHUB_WORKLOAD_ENVIRONMENT_TYPE_VALUE_DEVELOPMENT = "DEVELOPMENT";
    exports.GCP_APPHUB_WORKLOAD_ENVIRONMENT_TYPE_VALUE_PRODUCTION = "PRODUCTION";
    exports.GCP_APPHUB_WORKLOAD_ENVIRONMENT_TYPE_VALUE_STAGING = "STAGING";
    exports.GCP_APPHUB_WORKLOAD_ENVIRONMENT_TYPE_VALUE_TEST = "TEST";
    exports.ATTR_GCP_APPHUB_WORKLOAD_ID = "gcp.apphub.workload.id";
    exports.ATTR_GCP_APPHUB_DESTINATION_APPLICATION_CONTAINER = "gcp.apphub_destination.application.container";
    exports.ATTR_GCP_APPHUB_DESTINATION_APPLICATION_ID = "gcp.apphub_destination.application.id";
    exports.ATTR_GCP_APPHUB_DESTINATION_APPLICATION_LOCATION = "gcp.apphub_destination.application.location";
    exports.ATTR_GCP_APPHUB_DESTINATION_SERVICE_CRITICALITY_TYPE = "gcp.apphub_destination.service.criticality_type";
    exports.GCP_APPHUB_DESTINATION_SERVICE_CRITICALITY_TYPE_VALUE_HIGH = "HIGH";
    exports.GCP_APPHUB_DESTINATION_SERVICE_CRITICALITY_TYPE_VALUE_LOW = "LOW";
    exports.GCP_APPHUB_DESTINATION_SERVICE_CRITICALITY_TYPE_VALUE_MEDIUM = "MEDIUM";
    exports.GCP_APPHUB_DESTINATION_SERVICE_CRITICALITY_TYPE_VALUE_MISSION_CRITICAL = "MISSION_CRITICAL";
    exports.ATTR_GCP_APPHUB_DESTINATION_SERVICE_ENVIRONMENT_TYPE = "gcp.apphub_destination.service.environment_type";
    exports.GCP_APPHUB_DESTINATION_SERVICE_ENVIRONMENT_TYPE_VALUE_DEVELOPMENT = "DEVELOPMENT";
    exports.GCP_APPHUB_DESTINATION_SERVICE_ENVIRONMENT_TYPE_VALUE_PRODUCTION = "PRODUCTION";
    exports.GCP_APPHUB_DESTINATION_SERVICE_ENVIRONMENT_TYPE_VALUE_STAGING = "STAGING";
    exports.GCP_APPHUB_DESTINATION_SERVICE_ENVIRONMENT_TYPE_VALUE_TEST = "TEST";
    exports.ATTR_GCP_APPHUB_DESTINATION_SERVICE_ID = "gcp.apphub_destination.service.id";
    exports.ATTR_GCP_APPHUB_DESTINATION_WORKLOAD_CRITICALITY_TYPE = "gcp.apphub_destination.workload.criticality_type";
    exports.GCP_APPHUB_DESTINATION_WORKLOAD_CRITICALITY_TYPE_VALUE_HIGH = "HIGH";
    exports.GCP_APPHUB_DESTINATION_WORKLOAD_CRITICALITY_TYPE_VALUE_LOW = "LOW";
    exports.GCP_APPHUB_DESTINATION_WORKLOAD_CRITICALITY_TYPE_VALUE_MEDIUM = "MEDIUM";
    exports.GCP_APPHUB_DESTINATION_WORKLOAD_CRITICALITY_TYPE_VALUE_MISSION_CRITICAL = "MISSION_CRITICAL";
    exports.ATTR_GCP_APPHUB_DESTINATION_WORKLOAD_ENVIRONMENT_TYPE = "gcp.apphub_destination.workload.environment_type";
    exports.GCP_APPHUB_DESTINATION_WORKLOAD_ENVIRONMENT_TYPE_VALUE_DEVELOPMENT = "DEVELOPMENT";
    exports.GCP_APPHUB_DESTINATION_WORKLOAD_ENVIRONMENT_TYPE_VALUE_PRODUCTION = "PRODUCTION";
    exports.GCP_APPHUB_DESTINATION_WORKLOAD_ENVIRONMENT_TYPE_VALUE_STAGING = "STAGING";
    exports.GCP_APPHUB_DESTINATION_WORKLOAD_ENVIRONMENT_TYPE_VALUE_TEST = "TEST";
    exports.ATTR_GCP_APPHUB_DESTINATION_WORKLOAD_ID = "gcp.apphub_destination.workload.id";
    exports.ATTR_GCP_CLIENT_SERVICE = "gcp.client.service";
    exports.ATTR_GCP_CLOUD_RUN_JOB_EXECUTION = "gcp.cloud_run.job.execution";
    exports.ATTR_GCP_CLOUD_RUN_JOB_TASK_INDEX = "gcp.cloud_run.job.task_index";
    exports.ATTR_GCP_GCE_INSTANCE_HOSTNAME = "gcp.gce.instance.hostname";
    exports.ATTR_GCP_GCE_INSTANCE_NAME = "gcp.gce.instance.name";
    exports.ATTR_GEN_AI_AGENT_DESCRIPTION = "gen_ai.agent.description";
    exports.ATTR_GEN_AI_AGENT_ID = "gen_ai.agent.id";
    exports.ATTR_GEN_AI_AGENT_NAME = "gen_ai.agent.name";
    exports.ATTR_GEN_AI_COMPLETION = "gen_ai.completion";
    exports.ATTR_GEN_AI_CONVERSATION_ID = "gen_ai.conversation.id";
    exports.ATTR_GEN_AI_DATA_SOURCE_ID = "gen_ai.data_source.id";
    exports.ATTR_GEN_AI_EMBEDDINGS_DIMENSION_COUNT = "gen_ai.embeddings.dimension.count";
    exports.ATTR_GEN_AI_EVALUATION_EXPLANATION = "gen_ai.evaluation.explanation";
    exports.ATTR_GEN_AI_EVALUATION_NAME = "gen_ai.evaluation.name";
    exports.ATTR_GEN_AI_EVALUATION_SCORE_LABEL = "gen_ai.evaluation.score.label";
    exports.ATTR_GEN_AI_EVALUATION_SCORE_VALUE = "gen_ai.evaluation.score.value";
    exports.ATTR_GEN_AI_INPUT_MESSAGES = "gen_ai.input.messages";
    exports.ATTR_GEN_AI_OPENAI_REQUEST_RESPONSE_FORMAT = "gen_ai.openai.request.response_format";
    exports.GEN_AI_OPENAI_REQUEST_RESPONSE_FORMAT_VALUE_JSON_OBJECT = "json_object";
    exports.GEN_AI_OPENAI_REQUEST_RESPONSE_FORMAT_VALUE_JSON_SCHEMA = "json_schema";
    exports.GEN_AI_OPENAI_REQUEST_RESPONSE_FORMAT_VALUE_TEXT = "text";
    exports.ATTR_GEN_AI_OPENAI_REQUEST_SEED = "gen_ai.openai.request.seed";
    exports.ATTR_GEN_AI_OPENAI_REQUEST_SERVICE_TIER = "gen_ai.openai.request.service_tier";
    exports.GEN_AI_OPENAI_REQUEST_SERVICE_TIER_VALUE_AUTO = "auto";
    exports.GEN_AI_OPENAI_REQUEST_SERVICE_TIER_VALUE_DEFAULT = "default";
    exports.ATTR_GEN_AI_OPENAI_RESPONSE_SERVICE_TIER = "gen_ai.openai.response.service_tier";
    exports.ATTR_GEN_AI_OPENAI_RESPONSE_SYSTEM_FINGERPRINT = "gen_ai.openai.response.system_fingerprint";
    exports.ATTR_GEN_AI_OPERATION_NAME = "gen_ai.operation.name";
    exports.GEN_AI_OPERATION_NAME_VALUE_CHAT = "chat";
    exports.GEN_AI_OPERATION_NAME_VALUE_CREATE_AGENT = "create_agent";
    exports.GEN_AI_OPERATION_NAME_VALUE_EMBEDDINGS = "embeddings";
    exports.GEN_AI_OPERATION_NAME_VALUE_EXECUTE_TOOL = "execute_tool";
    exports.GEN_AI_OPERATION_NAME_VALUE_GENERATE_CONTENT = "generate_content";
    exports.GEN_AI_OPERATION_NAME_VALUE_INVOKE_AGENT = "invoke_agent";
    exports.GEN_AI_OPERATION_NAME_VALUE_TEXT_COMPLETION = "text_completion";
    exports.ATTR_GEN_AI_OUTPUT_MESSAGES = "gen_ai.output.messages";
    exports.ATTR_GEN_AI_OUTPUT_TYPE = "gen_ai.output.type";
    exports.GEN_AI_OUTPUT_TYPE_VALUE_IMAGE = "image";
    exports.GEN_AI_OUTPUT_TYPE_VALUE_JSON = "json";
    exports.GEN_AI_OUTPUT_TYPE_VALUE_SPEECH = "speech";
    exports.GEN_AI_OUTPUT_TYPE_VALUE_TEXT = "text";
    exports.ATTR_GEN_AI_PROMPT = "gen_ai.prompt";
    exports.ATTR_GEN_AI_PROMPT_NAME = "gen_ai.prompt.name";
    exports.ATTR_GEN_AI_PROVIDER_NAME = "gen_ai.provider.name";
    exports.GEN_AI_PROVIDER_NAME_VALUE_ANTHROPIC = "anthropic";
    exports.GEN_AI_PROVIDER_NAME_VALUE_AWS_BEDROCK = "aws.bedrock";
    exports.GEN_AI_PROVIDER_NAME_VALUE_AZURE_AI_INFERENCE = "azure.ai.inference";
    exports.GEN_AI_PROVIDER_NAME_VALUE_AZURE_AI_OPENAI = "azure.ai.openai";
    exports.GEN_AI_PROVIDER_NAME_VALUE_COHERE = "cohere";
    exports.GEN_AI_PROVIDER_NAME_VALUE_DEEPSEEK = "deepseek";
    exports.GEN_AI_PROVIDER_NAME_VALUE_GCP_GEMINI = "gcp.gemini";
    exports.GEN_AI_PROVIDER_NAME_VALUE_GCP_GEN_AI = "gcp.gen_ai";
    exports.GEN_AI_PROVIDER_NAME_VALUE_GCP_VERTEX_AI = "gcp.vertex_ai";
    exports.GEN_AI_PROVIDER_NAME_VALUE_GROQ = "groq";
    exports.GEN_AI_PROVIDER_NAME_VALUE_IBM_WATSONX_AI = "ibm.watsonx.ai";
    exports.GEN_AI_PROVIDER_NAME_VALUE_MISTRAL_AI = "mistral_ai";
    exports.GEN_AI_PROVIDER_NAME_VALUE_OPENAI = "openai";
    exports.GEN_AI_PROVIDER_NAME_VALUE_PERPLEXITY = "perplexity";
    exports.GEN_AI_PROVIDER_NAME_VALUE_X_AI = "x_ai";
    exports.ATTR_GEN_AI_REQUEST_CHOICE_COUNT = "gen_ai.request.choice.count";
    exports.ATTR_GEN_AI_REQUEST_ENCODING_FORMATS = "gen_ai.request.encoding_formats";
    exports.ATTR_GEN_AI_REQUEST_FREQUENCY_PENALTY = "gen_ai.request.frequency_penalty";
    exports.ATTR_GEN_AI_REQUEST_MAX_TOKENS = "gen_ai.request.max_tokens";
    exports.ATTR_GEN_AI_REQUEST_MODEL = "gen_ai.request.model";
    exports.ATTR_GEN_AI_REQUEST_PRESENCE_PENALTY = "gen_ai.request.presence_penalty";
    exports.ATTR_GEN_AI_REQUEST_SEED = "gen_ai.request.seed";
    exports.ATTR_GEN_AI_REQUEST_STOP_SEQUENCES = "gen_ai.request.stop_sequences";
    exports.ATTR_GEN_AI_REQUEST_TEMPERATURE = "gen_ai.request.temperature";
    exports.ATTR_GEN_AI_REQUEST_TOP_K = "gen_ai.request.top_k";
    exports.ATTR_GEN_AI_REQUEST_TOP_P = "gen_ai.request.top_p";
    exports.ATTR_GEN_AI_RESPONSE_FINISH_REASONS = "gen_ai.response.finish_reasons";
    exports.ATTR_GEN_AI_RESPONSE_ID = "gen_ai.response.id";
    exports.ATTR_GEN_AI_RESPONSE_MODEL = "gen_ai.response.model";
    exports.ATTR_GEN_AI_SYSTEM = "gen_ai.system";
    exports.GEN_AI_SYSTEM_VALUE_ANTHROPIC = "anthropic";
    exports.GEN_AI_SYSTEM_VALUE_AWS_BEDROCK = "aws.bedrock";
    exports.GEN_AI_SYSTEM_VALUE_AZ_AI_INFERENCE = "az.ai.inference";
    exports.GEN_AI_SYSTEM_VALUE_AZ_AI_OPENAI = "az.ai.openai";
    exports.GEN_AI_SYSTEM_VALUE_AZURE_AI_INFERENCE = "azure.ai.inference";
    exports.GEN_AI_SYSTEM_VALUE_AZURE_AI_OPENAI = "azure.ai.openai";
    exports.GEN_AI_SYSTEM_VALUE_COHERE = "cohere";
    exports.GEN_AI_SYSTEM_VALUE_DEEPSEEK = "deepseek";
    exports.GEN_AI_SYSTEM_VALUE_GCP_GEMINI = "gcp.gemini";
    exports.GEN_AI_SYSTEM_VALUE_GCP_GEN_AI = "gcp.gen_ai";
    exports.GEN_AI_SYSTEM_VALUE_GCP_VERTEX_AI = "gcp.vertex_ai";
    exports.GEN_AI_SYSTEM_VALUE_GEMINI = "gemini";
    exports.GEN_AI_SYSTEM_VALUE_GROQ = "groq";
    exports.GEN_AI_SYSTEM_VALUE_IBM_WATSONX_AI = "ibm.watsonx.ai";
    exports.GEN_AI_SYSTEM_VALUE_MISTRAL_AI = "mistral_ai";
    exports.GEN_AI_SYSTEM_VALUE_OPENAI = "openai";
    exports.GEN_AI_SYSTEM_VALUE_PERPLEXITY = "perplexity";
    exports.GEN_AI_SYSTEM_VALUE_VERTEX_AI = "vertex_ai";
    exports.GEN_AI_SYSTEM_VALUE_XAI = "xai";
    exports.ATTR_GEN_AI_SYSTEM_INSTRUCTIONS = "gen_ai.system_instructions";
    exports.ATTR_GEN_AI_TOKEN_TYPE = "gen_ai.token.type";
    exports.GEN_AI_TOKEN_TYPE_VALUE_INPUT = "input";
    exports.GEN_AI_TOKEN_TYPE_VALUE_COMPLETION = "output";
    exports.GEN_AI_TOKEN_TYPE_VALUE_OUTPUT = "output";
    exports.ATTR_GEN_AI_TOOL_CALL_ARGUMENTS = "gen_ai.tool.call.arguments";
    exports.ATTR_GEN_AI_TOOL_CALL_ID = "gen_ai.tool.call.id";
    exports.ATTR_GEN_AI_TOOL_CALL_RESULT = "gen_ai.tool.call.result";
    exports.ATTR_GEN_AI_TOOL_DEFINITIONS = "gen_ai.tool.definitions";
    exports.ATTR_GEN_AI_TOOL_DESCRIPTION = "gen_ai.tool.description";
    exports.ATTR_GEN_AI_TOOL_NAME = "gen_ai.tool.name";
    exports.ATTR_GEN_AI_TOOL_TYPE = "gen_ai.tool.type";
    exports.ATTR_GEN_AI_USAGE_COMPLETION_TOKENS = "gen_ai.usage.completion_tokens";
    exports.ATTR_GEN_AI_USAGE_INPUT_TOKENS = "gen_ai.usage.input_tokens";
    exports.ATTR_GEN_AI_USAGE_OUTPUT_TOKENS = "gen_ai.usage.output_tokens";
    exports.ATTR_GEN_AI_USAGE_PROMPT_TOKENS = "gen_ai.usage.prompt_tokens";
    exports.ATTR_GEO_CONTINENT_CODE = "geo.continent.code";
    exports.GEO_CONTINENT_CODE_VALUE_AF = "AF";
    exports.GEO_CONTINENT_CODE_VALUE_AN = "AN";
    exports.GEO_CONTINENT_CODE_VALUE_AS = "AS";
    exports.GEO_CONTINENT_CODE_VALUE_EU = "EU";
    exports.GEO_CONTINENT_CODE_VALUE_NA = "NA";
    exports.GEO_CONTINENT_CODE_VALUE_OC = "OC";
    exports.GEO_CONTINENT_CODE_VALUE_SA = "SA";
    exports.ATTR_GEO_COUNTRY_ISO_CODE = "geo.country.iso_code";
    exports.ATTR_GEO_LOCALITY_NAME = "geo.locality.name";
    exports.ATTR_GEO_LOCATION_LAT = "geo.location.lat";
    exports.ATTR_GEO_LOCATION_LON = "geo.location.lon";
    exports.ATTR_GEO_POSTAL_CODE = "geo.postal_code";
    exports.ATTR_GEO_REGION_ISO_CODE = "geo.region.iso_code";
    exports.ATTR_GO_MEMORY_TYPE = "go.memory.type";
    exports.GO_MEMORY_TYPE_VALUE_OTHER = "other";
    exports.GO_MEMORY_TYPE_VALUE_STACK = "stack";
    exports.ATTR_GRAPHQL_DOCUMENT = "graphql.document";
    exports.ATTR_GRAPHQL_OPERATION_NAME = "graphql.operation.name";
    exports.ATTR_GRAPHQL_OPERATION_TYPE = "graphql.operation.type";
    exports.GRAPHQL_OPERATION_TYPE_VALUE_MUTATION = "mutation";
    exports.GRAPHQL_OPERATION_TYPE_VALUE_QUERY = "query";
    exports.GRAPHQL_OPERATION_TYPE_VALUE_SUBSCRIPTION = "subscription";
    exports.ATTR_HEROKU_APP_ID = "heroku.app.id";
    exports.ATTR_HEROKU_RELEASE_COMMIT = "heroku.release.commit";
    exports.ATTR_HEROKU_RELEASE_CREATION_TIMESTAMP = "heroku.release.creation_timestamp";
    exports.ATTR_HOST_ARCH = "host.arch";
    exports.HOST_ARCH_VALUE_AMD64 = "amd64";
    exports.HOST_ARCH_VALUE_ARM32 = "arm32";
    exports.HOST_ARCH_VALUE_ARM64 = "arm64";
    exports.HOST_ARCH_VALUE_IA64 = "ia64";
    exports.HOST_ARCH_VALUE_PPC32 = "ppc32";
    exports.HOST_ARCH_VALUE_PPC64 = "ppc64";
    exports.HOST_ARCH_VALUE_S390X = "s390x";
    exports.HOST_ARCH_VALUE_X86 = "x86";
    exports.ATTR_HOST_CPU_CACHE_L2_SIZE = "host.cpu.cache.l2.size";
    exports.ATTR_HOST_CPU_FAMILY = "host.cpu.family";
    exports.ATTR_HOST_CPU_MODEL_ID = "host.cpu.model.id";
    exports.ATTR_HOST_CPU_MODEL_NAME = "host.cpu.model.name";
    exports.ATTR_HOST_CPU_STEPPING = "host.cpu.stepping";
    exports.ATTR_HOST_CPU_VENDOR_ID = "host.cpu.vendor.id";
    exports.ATTR_HOST_ID = "host.id";
    exports.ATTR_HOST_IMAGE_ID = "host.image.id";
    exports.ATTR_HOST_IMAGE_NAME = "host.image.name";
    exports.ATTR_HOST_IMAGE_VERSION = "host.image.version";
    exports.ATTR_HOST_IP = "host.ip";
    exports.ATTR_HOST_MAC = "host.mac";
    exports.ATTR_HOST_NAME = "host.name";
    exports.ATTR_HOST_TYPE = "host.type";
    exports.ATTR_HTTP_CLIENT_IP = "http.client_ip";
    exports.ATTR_HTTP_CONNECTION_STATE = "http.connection.state";
    exports.HTTP_CONNECTION_STATE_VALUE_ACTIVE = "active";
    exports.HTTP_CONNECTION_STATE_VALUE_IDLE = "idle";
    exports.ATTR_HTTP_FLAVOR = "http.flavor";
    exports.HTTP_FLAVOR_VALUE_HTTP_1_0 = "1.0";
    exports.HTTP_FLAVOR_VALUE_HTTP_1_1 = "1.1";
    exports.HTTP_FLAVOR_VALUE_HTTP_2_0 = "2.0";
    exports.HTTP_FLAVOR_VALUE_HTTP_3_0 = "3.0";
    exports.HTTP_FLAVOR_VALUE_QUIC = "QUIC";
    exports.HTTP_FLAVOR_VALUE_SPDY = "SPDY";
    exports.ATTR_HTTP_HOST = "http.host";
    exports.ATTR_HTTP_METHOD = "http.method";
    exports.ATTR_HTTP_REQUEST_BODY_SIZE = "http.request.body.size";
    exports.HTTP_REQUEST_METHOD_VALUE_QUERY = "QUERY";
    exports.ATTR_HTTP_REQUEST_SIZE = "http.request.size";
    exports.ATTR_HTTP_REQUEST_CONTENT_LENGTH = "http.request_content_length";
    exports.ATTR_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED = "http.request_content_length_uncompressed";
    exports.ATTR_HTTP_RESPONSE_BODY_SIZE = "http.response.body.size";
    exports.ATTR_HTTP_RESPONSE_SIZE = "http.response.size";
    exports.ATTR_HTTP_RESPONSE_CONTENT_LENGTH = "http.response_content_length";
    exports.ATTR_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED = "http.response_content_length_uncompressed";
    exports.ATTR_HTTP_SCHEME = "http.scheme";
    exports.ATTR_HTTP_SERVER_NAME = "http.server_name";
    exports.ATTR_HTTP_STATUS_CODE = "http.status_code";
    exports.ATTR_HTTP_TARGET = "http.target";
    exports.ATTR_HTTP_URL = "http.url";
    exports.ATTR_HTTP_USER_AGENT = "http.user_agent";
    exports.ATTR_HW_BATTERY_CAPACITY = "hw.battery.capacity";
    exports.ATTR_HW_BATTERY_CHEMISTRY = "hw.battery.chemistry";
    exports.ATTR_HW_BATTERY_STATE = "hw.battery.state";
    exports.HW_BATTERY_STATE_VALUE_CHARGING = "charging";
    exports.HW_BATTERY_STATE_VALUE_DISCHARGING = "discharging";
    exports.ATTR_HW_BIOS_VERSION = "hw.bios_version";
    exports.ATTR_HW_DRIVER_VERSION = "hw.driver_version";
    exports.ATTR_HW_ENCLOSURE_TYPE = "hw.enclosure.type";
    exports.ATTR_HW_FIRMWARE_VERSION = "hw.firmware_version";
    exports.ATTR_HW_GPU_TASK = "hw.gpu.task";
    exports.HW_GPU_TASK_VALUE_DECODER = "decoder";
    exports.HW_GPU_TASK_VALUE_ENCODER = "encoder";
    exports.HW_GPU_TASK_VALUE_GENERAL = "general";
    exports.ATTR_HW_ID = "hw.id";
    exports.ATTR_HW_LIMIT_TYPE = "hw.limit_type";
    exports.HW_LIMIT_TYPE_VALUE_CRITICAL = "critical";
    exports.HW_LIMIT_TYPE_VALUE_DEGRADED = "degraded";
    exports.HW_LIMIT_TYPE_VALUE_HIGH_CRITICAL = "high.critical";
    exports.HW_LIMIT_TYPE_VALUE_HIGH_DEGRADED = "high.degraded";
    exports.HW_LIMIT_TYPE_VALUE_LOW_CRITICAL = "low.critical";
    exports.HW_LIMIT_TYPE_VALUE_LOW_DEGRADED = "low.degraded";
    exports.HW_LIMIT_TYPE_VALUE_MAX = "max";
    exports.HW_LIMIT_TYPE_VALUE_THROTTLED = "throttled";
    exports.HW_LIMIT_TYPE_VALUE_TURBO = "turbo";
    exports.ATTR_HW_LOGICAL_DISK_RAID_LEVEL = "hw.logical_disk.raid_level";
    exports.ATTR_HW_LOGICAL_DISK_STATE = "hw.logical_disk.state";
    exports.HW_LOGICAL_DISK_STATE_VALUE_FREE = "free";
    exports.HW_LOGICAL_DISK_STATE_VALUE_USED = "used";
    exports.ATTR_HW_MEMORY_TYPE = "hw.memory.type";
    exports.ATTR_HW_MODEL = "hw.model";
    exports.ATTR_HW_NAME = "hw.name";
    exports.ATTR_HW_NETWORK_LOGICAL_ADDRESSES = "hw.network.logical_addresses";
    exports.ATTR_HW_NETWORK_PHYSICAL_ADDRESS = "hw.network.physical_address";
    exports.ATTR_HW_PARENT = "hw.parent";
    exports.ATTR_HW_PHYSICAL_DISK_SMART_ATTRIBUTE = "hw.physical_disk.smart_attribute";
    exports.ATTR_HW_PHYSICAL_DISK_STATE = "hw.physical_disk.state";
    exports.HW_PHYSICAL_DISK_STATE_VALUE_REMAINING = "remaining";
    exports.ATTR_HW_PHYSICAL_DISK_TYPE = "hw.physical_disk.type";
    exports.ATTR_HW_SENSOR_LOCATION = "hw.sensor_location";
    exports.ATTR_HW_SERIAL_NUMBER = "hw.serial_number";
    exports.ATTR_HW_STATE = "hw.state";
    exports.HW_STATE_VALUE_DEGRADED = "degraded";
    exports.HW_STATE_VALUE_FAILED = "failed";
    exports.HW_STATE_VALUE_NEEDS_CLEANING = "needs_cleaning";
    exports.HW_STATE_VALUE_OK = "ok";
    exports.HW_STATE_VALUE_PREDICTED_FAILURE = "predicted_failure";
    exports.ATTR_HW_TAPE_DRIVE_OPERATION_TYPE = "hw.tape_drive.operation_type";
    exports.HW_TAPE_DRIVE_OPERATION_TYPE_VALUE_CLEAN = "clean";
    exports.HW_TAPE_DRIVE_OPERATION_TYPE_VALUE_MOUNT = "mount";
    exports.HW_TAPE_DRIVE_OPERATION_TYPE_VALUE_UNMOUNT = "unmount";
    exports.ATTR_HW_TYPE = "hw.type";
    exports.HW_TYPE_VALUE_BATTERY = "battery";
    exports.HW_TYPE_VALUE_CPU = "cpu";
    exports.HW_TYPE_VALUE_DISK_CONTROLLER = "disk_controller";
    exports.HW_TYPE_VALUE_ENCLOSURE = "enclosure";
    exports.HW_TYPE_VALUE_FAN = "fan";
    exports.HW_TYPE_VALUE_GPU = "gpu";
    exports.HW_TYPE_VALUE_LOGICAL_DISK = "logical_disk";
    exports.HW_TYPE_VALUE_MEMORY = "memory";
    exports.HW_TYPE_VALUE_NETWORK = "network";
    exports.HW_TYPE_VALUE_PHYSICAL_DISK = "physical_disk";
    exports.HW_TYPE_VALUE_POWER_SUPPLY = "power_supply";
    exports.HW_TYPE_VALUE_TAPE_DRIVE = "tape_drive";
    exports.HW_TYPE_VALUE_TEMPERATURE = "temperature";
    exports.HW_TYPE_VALUE_VOLTAGE = "voltage";
    exports.ATTR_HW_VENDOR = "hw.vendor";
    exports.ATTR_IOS_APP_STATE = "ios.app.state";
    exports.IOS_APP_STATE_VALUE_ACTIVE = "active";
    exports.IOS_APP_STATE_VALUE_BACKGROUND = "background";
    exports.IOS_APP_STATE_VALUE_FOREGROUND = "foreground";
    exports.IOS_APP_STATE_VALUE_INACTIVE = "inactive";
    exports.IOS_APP_STATE_VALUE_TERMINATE = "terminate";
    exports.ATTR_IOS_STATE = "ios.state";
    exports.IOS_STATE_VALUE_ACTIVE = "active";
    exports.IOS_STATE_VALUE_BACKGROUND = "background";
    exports.IOS_STATE_VALUE_FOREGROUND = "foreground";
    exports.IOS_STATE_VALUE_INACTIVE = "inactive";
    exports.IOS_STATE_VALUE_TERMINATE = "terminate";
    exports.ATTR_JSONRPC_PROTOCOL_VERSION = "jsonrpc.protocol.version";
    exports.ATTR_JSONRPC_REQUEST_ID = "jsonrpc.request.id";
    exports.ATTR_JVM_BUFFER_POOL_NAME = "jvm.buffer.pool.name";
    exports.ATTR_JVM_GC_CAUSE = "jvm.gc.cause";
    exports.ATTR_K8S_CLUSTER_NAME = "k8s.cluster.name";
    exports.ATTR_K8S_CLUSTER_UID = "k8s.cluster.uid";
    exports.ATTR_K8S_CONTAINER_NAME = "k8s.container.name";
    exports.ATTR_K8S_CONTAINER_RESTART_COUNT = "k8s.container.restart_count";
    exports.ATTR_K8S_CONTAINER_STATUS_LAST_TERMINATED_REASON = "k8s.container.status.last_terminated_reason";
    exports.ATTR_K8S_CONTAINER_STATUS_REASON = "k8s.container.status.reason";
    exports.K8S_CONTAINER_STATUS_REASON_VALUE_COMPLETED = "Completed";
    exports.K8S_CONTAINER_STATUS_REASON_VALUE_CONTAINER_CANNOT_RUN = "ContainerCannotRun";
    exports.K8S_CONTAINER_STATUS_REASON_VALUE_CONTAINER_CREATING = "ContainerCreating";
    exports.K8S_CONTAINER_STATUS_REASON_VALUE_CRASH_LOOP_BACK_OFF = "CrashLoopBackOff";
    exports.K8S_CONTAINER_STATUS_REASON_VALUE_CREATE_CONTAINER_CONFIG_ERROR = "CreateContainerConfigError";
    exports.K8S_CONTAINER_STATUS_REASON_VALUE_ERR_IMAGE_PULL = "ErrImagePull";
    exports.K8S_CONTAINER_STATUS_REASON_VALUE_ERROR = "Error";
    exports.K8S_CONTAINER_STATUS_REASON_VALUE_IMAGE_PULL_BACK_OFF = "ImagePullBackOff";
    exports.K8S_CONTAINER_STATUS_REASON_VALUE_OOM_KILLED = "OOMKilled";
    exports.ATTR_K8S_CONTAINER_STATUS_STATE = "k8s.container.status.state";
    exports.K8S_CONTAINER_STATUS_STATE_VALUE_RUNNING = "running";
    exports.K8S_CONTAINER_STATUS_STATE_VALUE_TERMINATED = "terminated";
    exports.K8S_CONTAINER_STATUS_STATE_VALUE_WAITING = "waiting";
    var ATTR_K8S_CRONJOB_ANNOTATION = /* @__PURE__ */ __name((key) => `k8s.cronjob.annotation.${key}`, "ATTR_K8S_CRONJOB_ANNOTATION");
    exports.ATTR_K8S_CRONJOB_ANNOTATION = ATTR_K8S_CRONJOB_ANNOTATION;
    var ATTR_K8S_CRONJOB_LABEL = /* @__PURE__ */ __name((key) => `k8s.cronjob.label.${key}`, "ATTR_K8S_CRONJOB_LABEL");
    exports.ATTR_K8S_CRONJOB_LABEL = ATTR_K8S_CRONJOB_LABEL;
    exports.ATTR_K8S_CRONJOB_NAME = "k8s.cronjob.name";
    exports.ATTR_K8S_CRONJOB_UID = "k8s.cronjob.uid";
    var ATTR_K8S_DAEMONSET_ANNOTATION = /* @__PURE__ */ __name((key) => `k8s.daemonset.annotation.${key}`, "ATTR_K8S_DAEMONSET_ANNOTATION");
    exports.ATTR_K8S_DAEMONSET_ANNOTATION = ATTR_K8S_DAEMONSET_ANNOTATION;
    var ATTR_K8S_DAEMONSET_LABEL = /* @__PURE__ */ __name((key) => `k8s.daemonset.label.${key}`, "ATTR_K8S_DAEMONSET_LABEL");
    exports.ATTR_K8S_DAEMONSET_LABEL = ATTR_K8S_DAEMONSET_LABEL;
    exports.ATTR_K8S_DAEMONSET_NAME = "k8s.daemonset.name";
    exports.ATTR_K8S_DAEMONSET_UID = "k8s.daemonset.uid";
    var ATTR_K8S_DEPLOYMENT_ANNOTATION = /* @__PURE__ */ __name((key) => `k8s.deployment.annotation.${key}`, "ATTR_K8S_DEPLOYMENT_ANNOTATION");
    exports.ATTR_K8S_DEPLOYMENT_ANNOTATION = ATTR_K8S_DEPLOYMENT_ANNOTATION;
    var ATTR_K8S_DEPLOYMENT_LABEL = /* @__PURE__ */ __name((key) => `k8s.deployment.label.${key}`, "ATTR_K8S_DEPLOYMENT_LABEL");
    exports.ATTR_K8S_DEPLOYMENT_LABEL = ATTR_K8S_DEPLOYMENT_LABEL;
    exports.ATTR_K8S_DEPLOYMENT_NAME = "k8s.deployment.name";
    exports.ATTR_K8S_DEPLOYMENT_UID = "k8s.deployment.uid";
    exports.ATTR_K8S_HPA_METRIC_TYPE = "k8s.hpa.metric.type";
    exports.ATTR_K8S_HPA_NAME = "k8s.hpa.name";
    exports.ATTR_K8S_HPA_SCALETARGETREF_API_VERSION = "k8s.hpa.scaletargetref.api_version";
    exports.ATTR_K8S_HPA_SCALETARGETREF_KIND = "k8s.hpa.scaletargetref.kind";
    exports.ATTR_K8S_HPA_SCALETARGETREF_NAME = "k8s.hpa.scaletargetref.name";
    exports.ATTR_K8S_HPA_UID = "k8s.hpa.uid";
    exports.ATTR_K8S_HUGEPAGE_SIZE = "k8s.hugepage.size";
    var ATTR_K8S_JOB_ANNOTATION = /* @__PURE__ */ __name((key) => `k8s.job.annotation.${key}`, "ATTR_K8S_JOB_ANNOTATION");
    exports.ATTR_K8S_JOB_ANNOTATION = ATTR_K8S_JOB_ANNOTATION;
    var ATTR_K8S_JOB_LABEL = /* @__PURE__ */ __name((key) => `k8s.job.label.${key}`, "ATTR_K8S_JOB_LABEL");
    exports.ATTR_K8S_JOB_LABEL = ATTR_K8S_JOB_LABEL;
    exports.ATTR_K8S_JOB_NAME = "k8s.job.name";
    exports.ATTR_K8S_JOB_UID = "k8s.job.uid";
    var ATTR_K8S_NAMESPACE_ANNOTATION = /* @__PURE__ */ __name((key) => `k8s.namespace.annotation.${key}`, "ATTR_K8S_NAMESPACE_ANNOTATION");
    exports.ATTR_K8S_NAMESPACE_ANNOTATION = ATTR_K8S_NAMESPACE_ANNOTATION;
    var ATTR_K8S_NAMESPACE_LABEL = /* @__PURE__ */ __name((key) => `k8s.namespace.label.${key}`, "ATTR_K8S_NAMESPACE_LABEL");
    exports.ATTR_K8S_NAMESPACE_LABEL = ATTR_K8S_NAMESPACE_LABEL;
    exports.ATTR_K8S_NAMESPACE_NAME = "k8s.namespace.name";
    exports.ATTR_K8S_NAMESPACE_PHASE = "k8s.namespace.phase";
    exports.K8S_NAMESPACE_PHASE_VALUE_ACTIVE = "active";
    exports.K8S_NAMESPACE_PHASE_VALUE_TERMINATING = "terminating";
    var ATTR_K8S_NODE_ANNOTATION = /* @__PURE__ */ __name((key) => `k8s.node.annotation.${key}`, "ATTR_K8S_NODE_ANNOTATION");
    exports.ATTR_K8S_NODE_ANNOTATION = ATTR_K8S_NODE_ANNOTATION;
    exports.ATTR_K8S_NODE_CONDITION_STATUS = "k8s.node.condition.status";
    exports.K8S_NODE_CONDITION_STATUS_VALUE_CONDITION_FALSE = "false";
    exports.K8S_NODE_CONDITION_STATUS_VALUE_CONDITION_TRUE = "true";
    exports.K8S_NODE_CONDITION_STATUS_VALUE_CONDITION_UNKNOWN = "unknown";
    exports.ATTR_K8S_NODE_CONDITION_TYPE = "k8s.node.condition.type";
    exports.K8S_NODE_CONDITION_TYPE_VALUE_DISK_PRESSURE = "DiskPressure";
    exports.K8S_NODE_CONDITION_TYPE_VALUE_MEMORY_PRESSURE = "MemoryPressure";
    exports.K8S_NODE_CONDITION_TYPE_VALUE_NETWORK_UNAVAILABLE = "NetworkUnavailable";
    exports.K8S_NODE_CONDITION_TYPE_VALUE_PID_PRESSURE = "PIDPressure";
    exports.K8S_NODE_CONDITION_TYPE_VALUE_READY = "Ready";
    var ATTR_K8S_NODE_LABEL = /* @__PURE__ */ __name((key) => `k8s.node.label.${key}`, "ATTR_K8S_NODE_LABEL");
    exports.ATTR_K8S_NODE_LABEL = ATTR_K8S_NODE_LABEL;
    exports.ATTR_K8S_NODE_NAME = "k8s.node.name";
    exports.ATTR_K8S_NODE_UID = "k8s.node.uid";
    var ATTR_K8S_POD_ANNOTATION = /* @__PURE__ */ __name((key) => `k8s.pod.annotation.${key}`, "ATTR_K8S_POD_ANNOTATION");
    exports.ATTR_K8S_POD_ANNOTATION = ATTR_K8S_POD_ANNOTATION;
    exports.ATTR_K8S_POD_HOSTNAME = "k8s.pod.hostname";
    exports.ATTR_K8S_POD_IP = "k8s.pod.ip";
    var ATTR_K8S_POD_LABEL = /* @__PURE__ */ __name((key) => `k8s.pod.label.${key}`, "ATTR_K8S_POD_LABEL");
    exports.ATTR_K8S_POD_LABEL = ATTR_K8S_POD_LABEL;
    var ATTR_K8S_POD_LABELS = /* @__PURE__ */ __name((key) => `k8s.pod.labels.${key}`, "ATTR_K8S_POD_LABELS");
    exports.ATTR_K8S_POD_LABELS = ATTR_K8S_POD_LABELS;
    exports.ATTR_K8S_POD_NAME = "k8s.pod.name";
    exports.ATTR_K8S_POD_START_TIME = "k8s.pod.start_time";
    exports.ATTR_K8S_POD_STATUS_PHASE = "k8s.pod.status.phase";
    exports.K8S_POD_STATUS_PHASE_VALUE_FAILED = "Failed";
    exports.K8S_POD_STATUS_PHASE_VALUE_PENDING = "Pending";
    exports.K8S_POD_STATUS_PHASE_VALUE_RUNNING = "Running";
    exports.K8S_POD_STATUS_PHASE_VALUE_SUCCEEDED = "Succeeded";
    exports.K8S_POD_STATUS_PHASE_VALUE_UNKNOWN = "Unknown";
    exports.ATTR_K8S_POD_STATUS_REASON = "k8s.pod.status.reason";
    exports.K8S_POD_STATUS_REASON_VALUE_EVICTED = "Evicted";
    exports.K8S_POD_STATUS_REASON_VALUE_NODE_AFFINITY = "NodeAffinity";
    exports.K8S_POD_STATUS_REASON_VALUE_NODE_LOST = "NodeLost";
    exports.K8S_POD_STATUS_REASON_VALUE_SHUTDOWN = "Shutdown";
    exports.K8S_POD_STATUS_REASON_VALUE_UNEXPECTED_ADMISSION_ERROR = "UnexpectedAdmissionError";
    exports.ATTR_K8S_POD_UID = "k8s.pod.uid";
    var ATTR_K8S_REPLICASET_ANNOTATION = /* @__PURE__ */ __name((key) => `k8s.replicaset.annotation.${key}`, "ATTR_K8S_REPLICASET_ANNOTATION");
    exports.ATTR_K8S_REPLICASET_ANNOTATION = ATTR_K8S_REPLICASET_ANNOTATION;
    var ATTR_K8S_REPLICASET_LABEL = /* @__PURE__ */ __name((key) => `k8s.replicaset.label.${key}`, "ATTR_K8S_REPLICASET_LABEL");
    exports.ATTR_K8S_REPLICASET_LABEL = ATTR_K8S_REPLICASET_LABEL;
    exports.ATTR_K8S_REPLICASET_NAME = "k8s.replicaset.name";
    exports.ATTR_K8S_REPLICASET_UID = "k8s.replicaset.uid";
    exports.ATTR_K8S_REPLICATIONCONTROLLER_NAME = "k8s.replicationcontroller.name";
    exports.ATTR_K8S_REPLICATIONCONTROLLER_UID = "k8s.replicationcontroller.uid";
    exports.ATTR_K8S_RESOURCEQUOTA_NAME = "k8s.resourcequota.name";
    exports.ATTR_K8S_RESOURCEQUOTA_RESOURCE_NAME = "k8s.resourcequota.resource_name";
    exports.ATTR_K8S_RESOURCEQUOTA_UID = "k8s.resourcequota.uid";
    var ATTR_K8S_STATEFULSET_ANNOTATION = /* @__PURE__ */ __name((key) => `k8s.statefulset.annotation.${key}`, "ATTR_K8S_STATEFULSET_ANNOTATION");
    exports.ATTR_K8S_STATEFULSET_ANNOTATION = ATTR_K8S_STATEFULSET_ANNOTATION;
    var ATTR_K8S_STATEFULSET_LABEL = /* @__PURE__ */ __name((key) => `k8s.statefulset.label.${key}`, "ATTR_K8S_STATEFULSET_LABEL");
    exports.ATTR_K8S_STATEFULSET_LABEL = ATTR_K8S_STATEFULSET_LABEL;
    exports.ATTR_K8S_STATEFULSET_NAME = "k8s.statefulset.name";
    exports.ATTR_K8S_STATEFULSET_UID = "k8s.statefulset.uid";
    exports.ATTR_K8S_STORAGECLASS_NAME = "k8s.storageclass.name";
    exports.ATTR_K8S_VOLUME_NAME = "k8s.volume.name";
    exports.ATTR_K8S_VOLUME_TYPE = "k8s.volume.type";
    exports.K8S_VOLUME_TYPE_VALUE_CONFIG_MAP = "configMap";
    exports.K8S_VOLUME_TYPE_VALUE_DOWNWARD_API = "downwardAPI";
    exports.K8S_VOLUME_TYPE_VALUE_EMPTY_DIR = "emptyDir";
    exports.K8S_VOLUME_TYPE_VALUE_LOCAL = "local";
    exports.K8S_VOLUME_TYPE_VALUE_PERSISTENT_VOLUME_CLAIM = "persistentVolumeClaim";
    exports.K8S_VOLUME_TYPE_VALUE_SECRET = "secret";
    exports.ATTR_LINUX_MEMORY_SLAB_STATE = "linux.memory.slab.state";
    exports.LINUX_MEMORY_SLAB_STATE_VALUE_RECLAIMABLE = "reclaimable";
    exports.LINUX_MEMORY_SLAB_STATE_VALUE_UNRECLAIMABLE = "unreclaimable";
    exports.ATTR_LOG_FILE_NAME = "log.file.name";
    exports.ATTR_LOG_FILE_NAME_RESOLVED = "log.file.name_resolved";
    exports.ATTR_LOG_FILE_PATH = "log.file.path";
    exports.ATTR_LOG_FILE_PATH_RESOLVED = "log.file.path_resolved";
    exports.ATTR_LOG_IOSTREAM = "log.iostream";
    exports.LOG_IOSTREAM_VALUE_STDERR = "stderr";
    exports.LOG_IOSTREAM_VALUE_STDOUT = "stdout";
    exports.ATTR_LOG_RECORD_ORIGINAL = "log.record.original";
    exports.ATTR_LOG_RECORD_UID = "log.record.uid";
    exports.ATTR_MAINFRAME_LPAR_NAME = "mainframe.lpar.name";
    exports.ATTR_MCP_METHOD_NAME = "mcp.method.name";
    exports.MCP_METHOD_NAME_VALUE_COMPLETION_COMPLETE = "completion/complete";
    exports.MCP_METHOD_NAME_VALUE_ELICITATION_CREATE = "elicitation/create";
    exports.MCP_METHOD_NAME_VALUE_INITIALIZE = "initialize";
    exports.MCP_METHOD_NAME_VALUE_LOGGING_SET_LEVEL = "logging/setLevel";
    exports.MCP_METHOD_NAME_VALUE_NOTIFICATIONS_CANCELLED = "notifications/cancelled";
    exports.MCP_METHOD_NAME_VALUE_NOTIFICATIONS_INITIALIZED = "notifications/initialized";
    exports.MCP_METHOD_NAME_VALUE_NOTIFICATIONS_MESSAGE = "notifications/message";
    exports.MCP_METHOD_NAME_VALUE_NOTIFICATIONS_PROGRESS = "notifications/progress";
    exports.MCP_METHOD_NAME_VALUE_NOTIFICATIONS_PROMPTS_LIST_CHANGED = "notifications/prompts/list_changed";
    exports.MCP_METHOD_NAME_VALUE_NOTIFICATIONS_RESOURCES_LIST_CHANGED = "notifications/resources/list_changed";
    exports.MCP_METHOD_NAME_VALUE_NOTIFICATIONS_RESOURCES_UPDATED = "notifications/resources/updated";
    exports.MCP_METHOD_NAME_VALUE_NOTIFICATIONS_ROOTS_LIST_CHANGED = "notifications/roots/list_changed";
    exports.MCP_METHOD_NAME_VALUE_NOTIFICATIONS_TOOLS_LIST_CHANGED = "notifications/tools/list_changed";
    exports.MCP_METHOD_NAME_VALUE_PING = "ping";
    exports.MCP_METHOD_NAME_VALUE_PROMPTS_GET = "prompts/get";
    exports.MCP_METHOD_NAME_VALUE_PROMPTS_LIST = "prompts/list";
    exports.MCP_METHOD_NAME_VALUE_RESOURCES_LIST = "resources/list";
    exports.MCP_METHOD_NAME_VALUE_RESOURCES_READ = "resources/read";
    exports.MCP_METHOD_NAME_VALUE_RESOURCES_SUBSCRIBE = "resources/subscribe";
    exports.MCP_METHOD_NAME_VALUE_RESOURCES_TEMPLATES_LIST = "resources/templates/list";
    exports.MCP_METHOD_NAME_VALUE_RESOURCES_UNSUBSCRIBE = "resources/unsubscribe";
    exports.MCP_METHOD_NAME_VALUE_ROOTS_LIST = "roots/list";
    exports.MCP_METHOD_NAME_VALUE_SAMPLING_CREATE_MESSAGE = "sampling/createMessage";
    exports.MCP_METHOD_NAME_VALUE_TOOLS_CALL = "tools/call";
    exports.MCP_METHOD_NAME_VALUE_TOOLS_LIST = "tools/list";
    exports.ATTR_MCP_PROTOCOL_VERSION = "mcp.protocol.version";
    exports.ATTR_MCP_RESOURCE_URI = "mcp.resource.uri";
    exports.ATTR_MCP_SESSION_ID = "mcp.session.id";
    exports.ATTR_MESSAGE_COMPRESSED_SIZE = "message.compressed_size";
    exports.ATTR_MESSAGE_ID = "message.id";
    exports.ATTR_MESSAGE_TYPE = "message.type";
    exports.MESSAGE_TYPE_VALUE_RECEIVED = "RECEIVED";
    exports.MESSAGE_TYPE_VALUE_SENT = "SENT";
    exports.ATTR_MESSAGE_UNCOMPRESSED_SIZE = "message.uncompressed_size";
    exports.ATTR_MESSAGING_BATCH_MESSAGE_COUNT = "messaging.batch.message_count";
    exports.ATTR_MESSAGING_CLIENT_ID = "messaging.client.id";
    exports.ATTR_MESSAGING_CONSUMER_GROUP_NAME = "messaging.consumer.group.name";
    exports.ATTR_MESSAGING_DESTINATION_ANONYMOUS = "messaging.destination.anonymous";
    exports.ATTR_MESSAGING_DESTINATION_NAME = "messaging.destination.name";
    exports.ATTR_MESSAGING_DESTINATION_PARTITION_ID = "messaging.destination.partition.id";
    exports.ATTR_MESSAGING_DESTINATION_SUBSCRIPTION_NAME = "messaging.destination.subscription.name";
    exports.ATTR_MESSAGING_DESTINATION_TEMPLATE = "messaging.destination.template";
    exports.ATTR_MESSAGING_DESTINATION_TEMPORARY = "messaging.destination.temporary";
    exports.ATTR_MESSAGING_DESTINATION_PUBLISH_ANONYMOUS = "messaging.destination_publish.anonymous";
    exports.ATTR_MESSAGING_DESTINATION_PUBLISH_NAME = "messaging.destination_publish.name";
    exports.ATTR_MESSAGING_EVENTHUBS_CONSUMER_GROUP = "messaging.eventhubs.consumer.group";
    exports.ATTR_MESSAGING_EVENTHUBS_MESSAGE_ENQUEUED_TIME = "messaging.eventhubs.message.enqueued_time";
    exports.ATTR_MESSAGING_GCP_PUBSUB_MESSAGE_ACK_DEADLINE = "messaging.gcp_pubsub.message.ack_deadline";
    exports.ATTR_MESSAGING_GCP_PUBSUB_MESSAGE_ACK_ID = "messaging.gcp_pubsub.message.ack_id";
    exports.ATTR_MESSAGING_GCP_PUBSUB_MESSAGE_DELIVERY_ATTEMPT = "messaging.gcp_pubsub.message.delivery_attempt";
    exports.ATTR_MESSAGING_GCP_PUBSUB_MESSAGE_ORDERING_KEY = "messaging.gcp_pubsub.message.ordering_key";
    exports.ATTR_MESSAGING_KAFKA_CONSUMER_GROUP = "messaging.kafka.consumer.group";
    exports.ATTR_MESSAGING_KAFKA_DESTINATION_PARTITION = "messaging.kafka.destination.partition";
    exports.ATTR_MESSAGING_KAFKA_MESSAGE_KEY = "messaging.kafka.message.key";
    exports.ATTR_MESSAGING_KAFKA_MESSAGE_OFFSET = "messaging.kafka.message.offset";
    exports.ATTR_MESSAGING_KAFKA_MESSAGE_TOMBSTONE = "messaging.kafka.message.tombstone";
    exports.ATTR_MESSAGING_KAFKA_OFFSET = "messaging.kafka.offset";
    exports.ATTR_MESSAGING_MESSAGE_BODY_SIZE = "messaging.message.body.size";
    exports.ATTR_MESSAGING_MESSAGE_CONVERSATION_ID = "messaging.message.conversation_id";
    exports.ATTR_MESSAGING_MESSAGE_ENVELOPE_SIZE = "messaging.message.envelope.size";
    exports.ATTR_MESSAGING_MESSAGE_ID = "messaging.message.id";
    exports.ATTR_MESSAGING_OPERATION = "messaging.operation";
    exports.ATTR_MESSAGING_OPERATION_NAME = "messaging.operation.name";
    exports.ATTR_MESSAGING_OPERATION_TYPE = "messaging.operation.type";
    exports.MESSAGING_OPERATION_TYPE_VALUE_CREATE = "create";
    exports.MESSAGING_OPERATION_TYPE_VALUE_DELIVER = "deliver";
    exports.MESSAGING_OPERATION_TYPE_VALUE_PROCESS = "process";
    exports.MESSAGING_OPERATION_TYPE_VALUE_PUBLISH = "publish";
    exports.MESSAGING_OPERATION_TYPE_VALUE_RECEIVE = "receive";
    exports.MESSAGING_OPERATION_TYPE_VALUE_SEND = "send";
    exports.MESSAGING_OPERATION_TYPE_VALUE_SETTLE = "settle";
    exports.ATTR_MESSAGING_RABBITMQ_DESTINATION_ROUTING_KEY = "messaging.rabbitmq.destination.routing_key";
    exports.ATTR_MESSAGING_RABBITMQ_MESSAGE_DELIVERY_TAG = "messaging.rabbitmq.message.delivery_tag";
    exports.ATTR_MESSAGING_ROCKETMQ_CLIENT_GROUP = "messaging.rocketmq.client_group";
    exports.ATTR_MESSAGING_ROCKETMQ_CONSUMPTION_MODEL = "messaging.rocketmq.consumption_model";
    exports.MESSAGING_ROCKETMQ_CONSUMPTION_MODEL_VALUE_BROADCASTING = "broadcasting";
    exports.MESSAGING_ROCKETMQ_CONSUMPTION_MODEL_VALUE_CLUSTERING = "clustering";
    exports.ATTR_MESSAGING_ROCKETMQ_MESSAGE_DELAY_TIME_LEVEL = "messaging.rocketmq.message.delay_time_level";
    exports.ATTR_MESSAGING_ROCKETMQ_MESSAGE_DELIVERY_TIMESTAMP = "messaging.rocketmq.message.delivery_timestamp";
    exports.ATTR_MESSAGING_ROCKETMQ_MESSAGE_GROUP = "messaging.rocketmq.message.group";
    exports.ATTR_MESSAGING_ROCKETMQ_MESSAGE_KEYS = "messaging.rocketmq.message.keys";
    exports.ATTR_MESSAGING_ROCKETMQ_MESSAGE_TAG = "messaging.rocketmq.message.tag";
    exports.ATTR_MESSAGING_ROCKETMQ_MESSAGE_TYPE = "messaging.rocketmq.message.type";
    exports.MESSAGING_ROCKETMQ_MESSAGE_TYPE_VALUE_DELAY = "delay";
    exports.MESSAGING_ROCKETMQ_MESSAGE_TYPE_VALUE_FIFO = "fifo";
    exports.MESSAGING_ROCKETMQ_MESSAGE_TYPE_VALUE_NORMAL = "normal";
    exports.MESSAGING_ROCKETMQ_MESSAGE_TYPE_VALUE_TRANSACTION = "transaction";
    exports.ATTR_MESSAGING_ROCKETMQ_NAMESPACE = "messaging.rocketmq.namespace";
    exports.ATTR_MESSAGING_SERVICEBUS_DESTINATION_SUBSCRIPTION_NAME = "messaging.servicebus.destination.subscription_name";
    exports.ATTR_MESSAGING_SERVICEBUS_DISPOSITION_STATUS = "messaging.servicebus.disposition_status";
    exports.MESSAGING_SERVICEBUS_DISPOSITION_STATUS_VALUE_ABANDON = "abandon";
    exports.MESSAGING_SERVICEBUS_DISPOSITION_STATUS_VALUE_COMPLETE = "complete";
    exports.MESSAGING_SERVICEBUS_DISPOSITION_STATUS_VALUE_DEAD_LETTER = "dead_letter";
    exports.MESSAGING_SERVICEBUS_DISPOSITION_STATUS_VALUE_DEFER = "defer";
    exports.ATTR_MESSAGING_SERVICEBUS_MESSAGE_DELIVERY_COUNT = "messaging.servicebus.message.delivery_count";
    exports.ATTR_MESSAGING_SERVICEBUS_MESSAGE_ENQUEUED_TIME = "messaging.servicebus.message.enqueued_time";
    exports.ATTR_MESSAGING_SYSTEM = "messaging.system";
    exports.MESSAGING_SYSTEM_VALUE_ACTIVEMQ = "activemq";
    exports.MESSAGING_SYSTEM_VALUE_AWS_SNS = "aws.sns";
    exports.MESSAGING_SYSTEM_VALUE_AWS_SQS = "aws_sqs";
    exports.MESSAGING_SYSTEM_VALUE_EVENTGRID = "eventgrid";
    exports.MESSAGING_SYSTEM_VALUE_EVENTHUBS = "eventhubs";
    exports.MESSAGING_SYSTEM_VALUE_GCP_PUBSUB = "gcp_pubsub";
    exports.MESSAGING_SYSTEM_VALUE_JMS = "jms";
    exports.MESSAGING_SYSTEM_VALUE_KAFKA = "kafka";
    exports.MESSAGING_SYSTEM_VALUE_PULSAR = "pulsar";
    exports.MESSAGING_SYSTEM_VALUE_RABBITMQ = "rabbitmq";
    exports.MESSAGING_SYSTEM_VALUE_ROCKETMQ = "rocketmq";
    exports.MESSAGING_SYSTEM_VALUE_SERVICEBUS = "servicebus";
    exports.ATTR_NET_HOST_IP = "net.host.ip";
    exports.ATTR_NET_HOST_NAME = "net.host.name";
    exports.ATTR_NET_HOST_PORT = "net.host.port";
    exports.ATTR_NET_PEER_IP = "net.peer.ip";
    exports.ATTR_NET_PEER_NAME = "net.peer.name";
    exports.ATTR_NET_PEER_PORT = "net.peer.port";
    exports.ATTR_NET_PROTOCOL_NAME = "net.protocol.name";
    exports.ATTR_NET_PROTOCOL_VERSION = "net.protocol.version";
    exports.ATTR_NET_SOCK_FAMILY = "net.sock.family";
    exports.NET_SOCK_FAMILY_VALUE_INET = "inet";
    exports.NET_SOCK_FAMILY_VALUE_INET6 = "inet6";
    exports.NET_SOCK_FAMILY_VALUE_UNIX = "unix";
    exports.ATTR_NET_SOCK_HOST_ADDR = "net.sock.host.addr";
    exports.ATTR_NET_SOCK_HOST_PORT = "net.sock.host.port";
    exports.ATTR_NET_SOCK_PEER_ADDR = "net.sock.peer.addr";
    exports.ATTR_NET_SOCK_PEER_NAME = "net.sock.peer.name";
    exports.ATTR_NET_SOCK_PEER_PORT = "net.sock.peer.port";
    exports.ATTR_NET_TRANSPORT = "net.transport";
    exports.NET_TRANSPORT_VALUE_INPROC = "inproc";
    exports.NET_TRANSPORT_VALUE_IP_TCP = "ip_tcp";
    exports.NET_TRANSPORT_VALUE_IP_UDP = "ip_udp";
    exports.NET_TRANSPORT_VALUE_OTHER = "other";
    exports.NET_TRANSPORT_VALUE_PIPE = "pipe";
    exports.ATTR_NETWORK_CARRIER_ICC = "network.carrier.icc";
    exports.ATTR_NETWORK_CARRIER_MCC = "network.carrier.mcc";
    exports.ATTR_NETWORK_CARRIER_MNC = "network.carrier.mnc";
    exports.ATTR_NETWORK_CARRIER_NAME = "network.carrier.name";
    exports.ATTR_NETWORK_CONNECTION_STATE = "network.connection.state";
    exports.NETWORK_CONNECTION_STATE_VALUE_CLOSE_WAIT = "close_wait";
    exports.NETWORK_CONNECTION_STATE_VALUE_CLOSED = "closed";
    exports.NETWORK_CONNECTION_STATE_VALUE_CLOSING = "closing";
    exports.NETWORK_CONNECTION_STATE_VALUE_ESTABLISHED = "established";
    exports.NETWORK_CONNECTION_STATE_VALUE_FIN_WAIT_1 = "fin_wait_1";
    exports.NETWORK_CONNECTION_STATE_VALUE_FIN_WAIT_2 = "fin_wait_2";
    exports.NETWORK_CONNECTION_STATE_VALUE_LAST_ACK = "last_ack";
    exports.NETWORK_CONNECTION_STATE_VALUE_LISTEN = "listen";
    exports.NETWORK_CONNECTION_STATE_VALUE_SYN_RECEIVED = "syn_received";
    exports.NETWORK_CONNECTION_STATE_VALUE_SYN_SENT = "syn_sent";
    exports.NETWORK_CONNECTION_STATE_VALUE_TIME_WAIT = "time_wait";
    exports.ATTR_NETWORK_CONNECTION_SUBTYPE = "network.connection.subtype";
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_CDMA = "cdma";
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_CDMA2000_1XRTT = "cdma2000_1xrtt";
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_EDGE = "edge";
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_EHRPD = "ehrpd";
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_EVDO_0 = "evdo_0";
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_EVDO_A = "evdo_a";
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_EVDO_B = "evdo_b";
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_GPRS = "gprs";
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_GSM = "gsm";
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_HSDPA = "hsdpa";
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_HSPA = "hspa";
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_HSPAP = "hspap";
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_HSUPA = "hsupa";
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_IDEN = "iden";
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_IWLAN = "iwlan";
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_LTE = "lte";
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_LTE_CA = "lte_ca";
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_NR = "nr";
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_NRNSA = "nrnsa";
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_TD_SCDMA = "td_scdma";
    exports.NETWORK_CONNECTION_SUBTYPE_VALUE_UMTS = "umts";
    exports.ATTR_NETWORK_CONNECTION_TYPE = "network.connection.type";
    exports.NETWORK_CONNECTION_TYPE_VALUE_CELL = "cell";
    exports.NETWORK_CONNECTION_TYPE_VALUE_UNAVAILABLE = "unavailable";
    exports.NETWORK_CONNECTION_TYPE_VALUE_UNKNOWN = "unknown";
    exports.NETWORK_CONNECTION_TYPE_VALUE_WIFI = "wifi";
    exports.NETWORK_CONNECTION_TYPE_VALUE_WIRED = "wired";
    exports.ATTR_NETWORK_INTERFACE_NAME = "network.interface.name";
    exports.ATTR_NETWORK_IO_DIRECTION = "network.io.direction";
    exports.NETWORK_IO_DIRECTION_VALUE_RECEIVE = "receive";
    exports.NETWORK_IO_DIRECTION_VALUE_TRANSMIT = "transmit";
    exports.ATTR_NFS_OPERATION_NAME = "nfs.operation.name";
    exports.ATTR_NFS_SERVER_REPCACHE_STATUS = "nfs.server.repcache.status";
    exports.ATTR_NODEJS_EVENTLOOP_STATE = "nodejs.eventloop.state";
    exports.NODEJS_EVENTLOOP_STATE_VALUE_ACTIVE = "active";
    exports.NODEJS_EVENTLOOP_STATE_VALUE_IDLE = "idle";
    exports.ATTR_OCI_MANIFEST_DIGEST = "oci.manifest.digest";
    exports.ATTR_ONC_RPC_PROCEDURE_NAME = "onc_rpc.procedure.name";
    exports.ATTR_ONC_RPC_PROCEDURE_NUMBER = "onc_rpc.procedure.number";
    exports.ATTR_ONC_RPC_PROGRAM_NAME = "onc_rpc.program.name";
    exports.ATTR_ONC_RPC_VERSION = "onc_rpc.version";
    exports.ATTR_OPENAI_REQUEST_SERVICE_TIER = "openai.request.service_tier";
    exports.OPENAI_REQUEST_SERVICE_TIER_VALUE_AUTO = "auto";
    exports.OPENAI_REQUEST_SERVICE_TIER_VALUE_DEFAULT = "default";
    exports.ATTR_OPENAI_RESPONSE_SERVICE_TIER = "openai.response.service_tier";
    exports.ATTR_OPENAI_RESPONSE_SYSTEM_FINGERPRINT = "openai.response.system_fingerprint";
    exports.ATTR_OPENSHIFT_CLUSTERQUOTA_NAME = "openshift.clusterquota.name";
    exports.ATTR_OPENSHIFT_CLUSTERQUOTA_UID = "openshift.clusterquota.uid";
    exports.ATTR_OPENTRACING_REF_TYPE = "opentracing.ref_type";
    exports.OPENTRACING_REF_TYPE_VALUE_CHILD_OF = "child_of";
    exports.OPENTRACING_REF_TYPE_VALUE_FOLLOWS_FROM = "follows_from";
    exports.ATTR_OS_BUILD_ID = "os.build_id";
    exports.ATTR_OS_DESCRIPTION = "os.description";
    exports.ATTR_OS_NAME = "os.name";
    exports.ATTR_OS_TYPE = "os.type";
    exports.OS_TYPE_VALUE_AIX = "aix";
    exports.OS_TYPE_VALUE_DARWIN = "darwin";
    exports.OS_TYPE_VALUE_DRAGONFLYBSD = "dragonflybsd";
    exports.OS_TYPE_VALUE_FREEBSD = "freebsd";
    exports.OS_TYPE_VALUE_HPUX = "hpux";
    exports.OS_TYPE_VALUE_LINUX = "linux";
    exports.OS_TYPE_VALUE_NETBSD = "netbsd";
    exports.OS_TYPE_VALUE_OPENBSD = "openbsd";
    exports.OS_TYPE_VALUE_SOLARIS = "solaris";
    exports.OS_TYPE_VALUE_WINDOWS = "windows";
    exports.OS_TYPE_VALUE_Z_OS = "z_os";
    exports.OS_TYPE_VALUE_ZOS = "zos";
    exports.ATTR_OS_VERSION = "os.version";
    exports.ATTR_OTEL_COMPONENT_NAME = "otel.component.name";
    exports.ATTR_OTEL_COMPONENT_TYPE = "otel.component.type";
    exports.OTEL_COMPONENT_TYPE_VALUE_BATCHING_LOG_PROCESSOR = "batching_log_processor";
    exports.OTEL_COMPONENT_TYPE_VALUE_BATCHING_SPAN_PROCESSOR = "batching_span_processor";
    exports.OTEL_COMPONENT_TYPE_VALUE_OTLP_GRPC_LOG_EXPORTER = "otlp_grpc_log_exporter";
    exports.OTEL_COMPONENT_TYPE_VALUE_OTLP_GRPC_METRIC_EXPORTER = "otlp_grpc_metric_exporter";
    exports.OTEL_COMPONENT_TYPE_VALUE_OTLP_GRPC_SPAN_EXPORTER = "otlp_grpc_span_exporter";
    exports.OTEL_COMPONENT_TYPE_VALUE_OTLP_HTTP_JSON_LOG_EXPORTER = "otlp_http_json_log_exporter";
    exports.OTEL_COMPONENT_TYPE_VALUE_OTLP_HTTP_JSON_METRIC_EXPORTER = "otlp_http_json_metric_exporter";
    exports.OTEL_COMPONENT_TYPE_VALUE_OTLP_HTTP_JSON_SPAN_EXPORTER = "otlp_http_json_span_exporter";
    exports.OTEL_COMPONENT_TYPE_VALUE_OTLP_HTTP_LOG_EXPORTER = "otlp_http_log_exporter";
    exports.OTEL_COMPONENT_TYPE_VALUE_OTLP_HTTP_METRIC_EXPORTER = "otlp_http_metric_exporter";
    exports.OTEL_COMPONENT_TYPE_VALUE_OTLP_HTTP_SPAN_EXPORTER = "otlp_http_span_exporter";
    exports.OTEL_COMPONENT_TYPE_VALUE_PERIODIC_METRIC_READER = "periodic_metric_reader";
    exports.OTEL_COMPONENT_TYPE_VALUE_PROMETHEUS_HTTP_TEXT_METRIC_EXPORTER = "prometheus_http_text_metric_exporter";
    exports.OTEL_COMPONENT_TYPE_VALUE_SIMPLE_LOG_PROCESSOR = "simple_log_processor";
    exports.OTEL_COMPONENT_TYPE_VALUE_SIMPLE_SPAN_PROCESSOR = "simple_span_processor";
    exports.OTEL_COMPONENT_TYPE_VALUE_ZIPKIN_HTTP_SPAN_EXPORTER = "zipkin_http_span_exporter";
    exports.ATTR_OTEL_EVENT_NAME = "otel.event.name";
    exports.ATTR_OTEL_LIBRARY_NAME = "otel.library.name";
    exports.ATTR_OTEL_LIBRARY_VERSION = "otel.library.version";
    exports.ATTR_OTEL_SCOPE_SCHEMA_URL = "otel.scope.schema_url";
    exports.ATTR_OTEL_SPAN_PARENT_ORIGIN = "otel.span.parent.origin";
    exports.OTEL_SPAN_PARENT_ORIGIN_VALUE_LOCAL = "local";
    exports.OTEL_SPAN_PARENT_ORIGIN_VALUE_NONE = "none";
    exports.OTEL_SPAN_PARENT_ORIGIN_VALUE_REMOTE = "remote";
    exports.ATTR_OTEL_SPAN_SAMPLING_RESULT = "otel.span.sampling_result";
    exports.OTEL_SPAN_SAMPLING_RESULT_VALUE_DROP = "DROP";
    exports.OTEL_SPAN_SAMPLING_RESULT_VALUE_RECORD_AND_SAMPLE = "RECORD_AND_SAMPLE";
    exports.OTEL_SPAN_SAMPLING_RESULT_VALUE_RECORD_ONLY = "RECORD_ONLY";
    exports.ATTR_PEER_SERVICE = "peer.service";
    exports.ATTR_POOL_NAME = "pool.name";
    exports.ATTR_PPROF_LOCATION_IS_FOLDED = "pprof.location.is_folded";
    exports.ATTR_PPROF_MAPPING_HAS_FILENAMES = "pprof.mapping.has_filenames";
    exports.ATTR_PPROF_MAPPING_HAS_FUNCTIONS = "pprof.mapping.has_functions";
    exports.ATTR_PPROF_MAPPING_HAS_INLINE_FRAMES = "pprof.mapping.has_inline_frames";
    exports.ATTR_PPROF_MAPPING_HAS_LINE_NUMBERS = "pprof.mapping.has_line_numbers";
    exports.ATTR_PPROF_PROFILE_COMMENT = "pprof.profile.comment";
    exports.ATTR_PPROF_PROFILE_DOC_URL = "pprof.profile.doc_url";
    exports.ATTR_PPROF_PROFILE_DROP_FRAMES = "pprof.profile.drop_frames";
    exports.ATTR_PPROF_PROFILE_KEEP_FRAMES = "pprof.profile.keep_frames";
    exports.ATTR_PROCESS_ARGS_COUNT = "process.args_count";
    exports.ATTR_PROCESS_COMMAND = "process.command";
    exports.ATTR_PROCESS_COMMAND_ARGS = "process.command_args";
    exports.ATTR_PROCESS_COMMAND_LINE = "process.command_line";
    exports.ATTR_PROCESS_CONTEXT_SWITCH_TYPE = "process.context_switch.type";
    exports.PROCESS_CONTEXT_SWITCH_TYPE_VALUE_INVOLUNTARY = "involuntary";
    exports.PROCESS_CONTEXT_SWITCH_TYPE_VALUE_VOLUNTARY = "voluntary";
    exports.ATTR_PROCESS_CPU_STATE = "process.cpu.state";
    exports.PROCESS_CPU_STATE_VALUE_SYSTEM = "system";
    exports.PROCESS_CPU_STATE_VALUE_USER = "user";
    exports.PROCESS_CPU_STATE_VALUE_WAIT = "wait";
    exports.ATTR_PROCESS_CREATION_TIME = "process.creation.time";
    var ATTR_PROCESS_ENVIRONMENT_VARIABLE = /* @__PURE__ */ __name((key) => `process.environment_variable.${key}`, "ATTR_PROCESS_ENVIRONMENT_VARIABLE");
    exports.ATTR_PROCESS_ENVIRONMENT_VARIABLE = ATTR_PROCESS_ENVIRONMENT_VARIABLE;
    exports.ATTR_PROCESS_EXECUTABLE_BUILD_ID_GNU = "process.executable.build_id.gnu";
    exports.ATTR_PROCESS_EXECUTABLE_BUILD_ID_GO = "process.executable.build_id.go";
    exports.ATTR_PROCESS_EXECUTABLE_BUILD_ID_HTLHASH = "process.executable.build_id.htlhash";
    exports.ATTR_PROCESS_EXECUTABLE_BUILD_ID_PROFILING = "process.executable.build_id.profiling";
    exports.ATTR_PROCESS_EXECUTABLE_NAME = "process.executable.name";
    exports.ATTR_PROCESS_EXECUTABLE_PATH = "process.executable.path";
    exports.ATTR_PROCESS_EXIT_CODE = "process.exit.code";
    exports.ATTR_PROCESS_EXIT_TIME = "process.exit.time";
    exports.ATTR_PROCESS_GROUP_LEADER_PID = "process.group_leader.pid";
    exports.ATTR_PROCESS_INTERACTIVE = "process.interactive";
    exports.ATTR_PROCESS_LINUX_CGROUP = "process.linux.cgroup";
    exports.ATTR_PROCESS_OWNER = "process.owner";
    exports.ATTR_PROCESS_PAGING_FAULT_TYPE = "process.paging.fault_type";
    exports.PROCESS_PAGING_FAULT_TYPE_VALUE_MAJOR = "major";
    exports.PROCESS_PAGING_FAULT_TYPE_VALUE_MINOR = "minor";
    exports.ATTR_PROCESS_PARENT_PID = "process.parent_pid";
    exports.ATTR_PROCESS_PID = "process.pid";
    exports.ATTR_PROCESS_REAL_USER_ID = "process.real_user.id";
    exports.ATTR_PROCESS_REAL_USER_NAME = "process.real_user.name";
    exports.ATTR_PROCESS_RUNTIME_DESCRIPTION = "process.runtime.description";
    exports.ATTR_PROCESS_RUNTIME_NAME = "process.runtime.name";
    exports.ATTR_PROCESS_RUNTIME_VERSION = "process.runtime.version";
    exports.ATTR_PROCESS_SAVED_USER_ID = "process.saved_user.id";
    exports.ATTR_PROCESS_SAVED_USER_NAME = "process.saved_user.name";
    exports.ATTR_PROCESS_SESSION_LEADER_PID = "process.session_leader.pid";
    exports.ATTR_PROCESS_STATE = "process.state";
    exports.PROCESS_STATE_VALUE_DEFUNCT = "defunct";
    exports.PROCESS_STATE_VALUE_RUNNING = "running";
    exports.PROCESS_STATE_VALUE_SLEEPING = "sleeping";
    exports.PROCESS_STATE_VALUE_STOPPED = "stopped";
    exports.ATTR_PROCESS_TITLE = "process.title";
    exports.ATTR_PROCESS_USER_ID = "process.user.id";
    exports.ATTR_PROCESS_USER_NAME = "process.user.name";
    exports.ATTR_PROCESS_VPID = "process.vpid";
    exports.ATTR_PROCESS_WORKING_DIRECTORY = "process.working_directory";
    exports.ATTR_PROFILE_FRAME_TYPE = "profile.frame.type";
    exports.PROFILE_FRAME_TYPE_VALUE_BEAM = "beam";
    exports.PROFILE_FRAME_TYPE_VALUE_CPYTHON = "cpython";
    exports.PROFILE_FRAME_TYPE_VALUE_DOTNET = "dotnet";
    exports.PROFILE_FRAME_TYPE_VALUE_GO = "go";
    exports.PROFILE_FRAME_TYPE_VALUE_JVM = "jvm";
    exports.PROFILE_FRAME_TYPE_VALUE_KERNEL = "kernel";
    exports.PROFILE_FRAME_TYPE_VALUE_NATIVE = "native";
    exports.PROFILE_FRAME_TYPE_VALUE_PERL = "perl";
    exports.PROFILE_FRAME_TYPE_VALUE_PHP = "php";
    exports.PROFILE_FRAME_TYPE_VALUE_RUBY = "ruby";
    exports.PROFILE_FRAME_TYPE_VALUE_RUST = "rust";
    exports.PROFILE_FRAME_TYPE_VALUE_V8JS = "v8js";
    exports.ATTR_RPC_CONNECT_RPC_ERROR_CODE = "rpc.connect_rpc.error_code";
    exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_ABORTED = "aborted";
    exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_ALREADY_EXISTS = "already_exists";
    exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_CANCELLED = "cancelled";
    exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_DATA_LOSS = "data_loss";
    exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_DEADLINE_EXCEEDED = "deadline_exceeded";
    exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_FAILED_PRECONDITION = "failed_precondition";
    exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_INTERNAL = "internal";
    exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_INVALID_ARGUMENT = "invalid_argument";
    exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_NOT_FOUND = "not_found";
    exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_OUT_OF_RANGE = "out_of_range";
    exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_PERMISSION_DENIED = "permission_denied";
    exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_RESOURCE_EXHAUSTED = "resource_exhausted";
    exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_UNAUTHENTICATED = "unauthenticated";
    exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_UNAVAILABLE = "unavailable";
    exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_UNIMPLEMENTED = "unimplemented";
    exports.RPC_CONNECT_RPC_ERROR_CODE_VALUE_UNKNOWN = "unknown";
    var ATTR_RPC_CONNECT_RPC_REQUEST_METADATA = /* @__PURE__ */ __name((key) => `rpc.connect_rpc.request.metadata.${key}`, "ATTR_RPC_CONNECT_RPC_REQUEST_METADATA");
    exports.ATTR_RPC_CONNECT_RPC_REQUEST_METADATA = ATTR_RPC_CONNECT_RPC_REQUEST_METADATA;
    var ATTR_RPC_CONNECT_RPC_RESPONSE_METADATA = /* @__PURE__ */ __name((key) => `rpc.connect_rpc.response.metadata.${key}`, "ATTR_RPC_CONNECT_RPC_RESPONSE_METADATA");
    exports.ATTR_RPC_CONNECT_RPC_RESPONSE_METADATA = ATTR_RPC_CONNECT_RPC_RESPONSE_METADATA;
    var ATTR_RPC_GRPC_REQUEST_METADATA = /* @__PURE__ */ __name((key) => `rpc.grpc.request.metadata.${key}`, "ATTR_RPC_GRPC_REQUEST_METADATA");
    exports.ATTR_RPC_GRPC_REQUEST_METADATA = ATTR_RPC_GRPC_REQUEST_METADATA;
    var ATTR_RPC_GRPC_RESPONSE_METADATA = /* @__PURE__ */ __name((key) => `rpc.grpc.response.metadata.${key}`, "ATTR_RPC_GRPC_RESPONSE_METADATA");
    exports.ATTR_RPC_GRPC_RESPONSE_METADATA = ATTR_RPC_GRPC_RESPONSE_METADATA;
    exports.ATTR_RPC_GRPC_STATUS_CODE = "rpc.grpc.status_code";
    exports.RPC_GRPC_STATUS_CODE_VALUE_OK = 0;
    exports.RPC_GRPC_STATUS_CODE_VALUE_CANCELLED = 1;
    exports.RPC_GRPC_STATUS_CODE_VALUE_UNKNOWN = 2;
    exports.RPC_GRPC_STATUS_CODE_VALUE_INVALID_ARGUMENT = 3;
    exports.RPC_GRPC_STATUS_CODE_VALUE_DEADLINE_EXCEEDED = 4;
    exports.RPC_GRPC_STATUS_CODE_VALUE_NOT_FOUND = 5;
    exports.RPC_GRPC_STATUS_CODE_VALUE_ALREADY_EXISTS = 6;
    exports.RPC_GRPC_STATUS_CODE_VALUE_PERMISSION_DENIED = 7;
    exports.RPC_GRPC_STATUS_CODE_VALUE_RESOURCE_EXHAUSTED = 8;
    exports.RPC_GRPC_STATUS_CODE_VALUE_FAILED_PRECONDITION = 9;
    exports.RPC_GRPC_STATUS_CODE_VALUE_ABORTED = 10;
    exports.RPC_GRPC_STATUS_CODE_VALUE_OUT_OF_RANGE = 11;
    exports.RPC_GRPC_STATUS_CODE_VALUE_UNIMPLEMENTED = 12;
    exports.RPC_GRPC_STATUS_CODE_VALUE_INTERNAL = 13;
    exports.RPC_GRPC_STATUS_CODE_VALUE_UNAVAILABLE = 14;
    exports.RPC_GRPC_STATUS_CODE_VALUE_DATA_LOSS = 15;
    exports.RPC_GRPC_STATUS_CODE_VALUE_UNAUTHENTICATED = 16;
    exports.ATTR_RPC_JSONRPC_ERROR_CODE = "rpc.jsonrpc.error_code";
    exports.ATTR_RPC_JSONRPC_ERROR_MESSAGE = "rpc.jsonrpc.error_message";
    exports.ATTR_RPC_JSONRPC_REQUEST_ID = "rpc.jsonrpc.request_id";
    exports.ATTR_RPC_JSONRPC_VERSION = "rpc.jsonrpc.version";
    exports.ATTR_RPC_MESSAGE_COMPRESSED_SIZE = "rpc.message.compressed_size";
    exports.ATTR_RPC_MESSAGE_ID = "rpc.message.id";
    exports.ATTR_RPC_MESSAGE_TYPE = "rpc.message.type";
    exports.RPC_MESSAGE_TYPE_VALUE_RECEIVED = "RECEIVED";
    exports.RPC_MESSAGE_TYPE_VALUE_SENT = "SENT";
    exports.ATTR_RPC_MESSAGE_UNCOMPRESSED_SIZE = "rpc.message.uncompressed_size";
    exports.ATTR_RPC_METHOD = "rpc.method";
    exports.ATTR_RPC_METHOD_ORIGINAL = "rpc.method_original";
    var ATTR_RPC_REQUEST_METADATA = /* @__PURE__ */ __name((key) => `rpc.request.metadata.${key}`, "ATTR_RPC_REQUEST_METADATA");
    exports.ATTR_RPC_REQUEST_METADATA = ATTR_RPC_REQUEST_METADATA;
    var ATTR_RPC_RESPONSE_METADATA = /* @__PURE__ */ __name((key) => `rpc.response.metadata.${key}`, "ATTR_RPC_RESPONSE_METADATA");
    exports.ATTR_RPC_RESPONSE_METADATA = ATTR_RPC_RESPONSE_METADATA;
    exports.ATTR_RPC_RESPONSE_STATUS_CODE = "rpc.response.status_code";
    exports.ATTR_RPC_SERVICE = "rpc.service";
    exports.ATTR_RPC_SYSTEM = "rpc.system";
    exports.RPC_SYSTEM_VALUE_APACHE_DUBBO = "apache_dubbo";
    exports.RPC_SYSTEM_VALUE_CONNECT_RPC = "connect_rpc";
    exports.RPC_SYSTEM_VALUE_DOTNET_WCF = "dotnet_wcf";
    exports.RPC_SYSTEM_VALUE_GRPC = "grpc";
    exports.RPC_SYSTEM_VALUE_JAVA_RMI = "java_rmi";
    exports.RPC_SYSTEM_VALUE_JSONRPC = "jsonrpc";
    exports.RPC_SYSTEM_VALUE_ONC_RPC = "onc_rpc";
    exports.ATTR_RPC_SYSTEM_NAME = "rpc.system.name";
    exports.RPC_SYSTEM_NAME_VALUE_CONNECTRPC = "connectrpc";
    exports.RPC_SYSTEM_NAME_VALUE_DUBBO = "dubbo";
    exports.RPC_SYSTEM_NAME_VALUE_GRPC = "grpc";
    exports.RPC_SYSTEM_NAME_VALUE_JSONRPC = "jsonrpc";
    exports.ATTR_SECURITY_RULE_CATEGORY = "security_rule.category";
    exports.ATTR_SECURITY_RULE_DESCRIPTION = "security_rule.description";
    exports.ATTR_SECURITY_RULE_LICENSE = "security_rule.license";
    exports.ATTR_SECURITY_RULE_NAME = "security_rule.name";
    exports.ATTR_SECURITY_RULE_REFERENCE = "security_rule.reference";
    exports.ATTR_SECURITY_RULE_RULESET_NAME = "security_rule.ruleset.name";
    exports.ATTR_SECURITY_RULE_UUID = "security_rule.uuid";
    exports.ATTR_SECURITY_RULE_VERSION = "security_rule.version";
    exports.ATTR_SERVICE_INSTANCE_ID = "service.instance.id";
    exports.ATTR_SERVICE_NAMESPACE = "service.namespace";
    exports.ATTR_SERVICE_PEER_NAME = "service.peer.name";
    exports.ATTR_SERVICE_PEER_NAMESPACE = "service.peer.namespace";
    exports.ATTR_SESSION_ID = "session.id";
    exports.ATTR_SESSION_PREVIOUS_ID = "session.previous_id";
    exports.ATTR_SOURCE_ADDRESS = "source.address";
    exports.ATTR_SOURCE_PORT = "source.port";
    exports.ATTR_STATE = "state";
    exports.STATE_VALUE_IDLE = "idle";
    exports.STATE_VALUE_USED = "used";
    exports.ATTR_SYSTEM_CPU_LOGICAL_NUMBER = "system.cpu.logical_number";
    exports.ATTR_SYSTEM_CPU_STATE = "system.cpu.state";
    exports.SYSTEM_CPU_STATE_VALUE_IDLE = "idle";
    exports.SYSTEM_CPU_STATE_VALUE_INTERRUPT = "interrupt";
    exports.SYSTEM_CPU_STATE_VALUE_IOWAIT = "iowait";
    exports.SYSTEM_CPU_STATE_VALUE_NICE = "nice";
    exports.SYSTEM_CPU_STATE_VALUE_STEAL = "steal";
    exports.SYSTEM_CPU_STATE_VALUE_SYSTEM = "system";
    exports.SYSTEM_CPU_STATE_VALUE_USER = "user";
    exports.ATTR_SYSTEM_DEVICE = "system.device";
    exports.ATTR_SYSTEM_FILESYSTEM_MODE = "system.filesystem.mode";
    exports.ATTR_SYSTEM_FILESYSTEM_MOUNTPOINT = "system.filesystem.mountpoint";
    exports.ATTR_SYSTEM_FILESYSTEM_STATE = "system.filesystem.state";
    exports.SYSTEM_FILESYSTEM_STATE_VALUE_FREE = "free";
    exports.SYSTEM_FILESYSTEM_STATE_VALUE_RESERVED = "reserved";
    exports.SYSTEM_FILESYSTEM_STATE_VALUE_USED = "used";
    exports.ATTR_SYSTEM_FILESYSTEM_TYPE = "system.filesystem.type";
    exports.SYSTEM_FILESYSTEM_TYPE_VALUE_EXFAT = "exfat";
    exports.SYSTEM_FILESYSTEM_TYPE_VALUE_EXT4 = "ext4";
    exports.SYSTEM_FILESYSTEM_TYPE_VALUE_FAT32 = "fat32";
    exports.SYSTEM_FILESYSTEM_TYPE_VALUE_HFSPLUS = "hfsplus";
    exports.SYSTEM_FILESYSTEM_TYPE_VALUE_NTFS = "ntfs";
    exports.SYSTEM_FILESYSTEM_TYPE_VALUE_REFS = "refs";
    exports.ATTR_SYSTEM_MEMORY_LINUX_SLAB_STATE = "system.memory.linux.slab.state";
    exports.SYSTEM_MEMORY_LINUX_SLAB_STATE_VALUE_RECLAIMABLE = "reclaimable";
    exports.SYSTEM_MEMORY_LINUX_SLAB_STATE_VALUE_UNRECLAIMABLE = "unreclaimable";
    exports.ATTR_SYSTEM_MEMORY_STATE = "system.memory.state";
    exports.SYSTEM_MEMORY_STATE_VALUE_BUFFERS = "buffers";
    exports.SYSTEM_MEMORY_STATE_VALUE_CACHED = "cached";
    exports.SYSTEM_MEMORY_STATE_VALUE_FREE = "free";
    exports.SYSTEM_MEMORY_STATE_VALUE_SHARED = "shared";
    exports.SYSTEM_MEMORY_STATE_VALUE_USED = "used";
    exports.ATTR_SYSTEM_NETWORK_STATE = "system.network.state";
    exports.SYSTEM_NETWORK_STATE_VALUE_CLOSE = "close";
    exports.SYSTEM_NETWORK_STATE_VALUE_CLOSE_WAIT = "close_wait";
    exports.SYSTEM_NETWORK_STATE_VALUE_CLOSING = "closing";
    exports.SYSTEM_NETWORK_STATE_VALUE_DELETE = "delete";
    exports.SYSTEM_NETWORK_STATE_VALUE_ESTABLISHED = "established";
    exports.SYSTEM_NETWORK_STATE_VALUE_FIN_WAIT_1 = "fin_wait_1";
    exports.SYSTEM_NETWORK_STATE_VALUE_FIN_WAIT_2 = "fin_wait_2";
    exports.SYSTEM_NETWORK_STATE_VALUE_LAST_ACK = "last_ack";
    exports.SYSTEM_NETWORK_STATE_VALUE_LISTEN = "listen";
    exports.SYSTEM_NETWORK_STATE_VALUE_SYN_RECV = "syn_recv";
    exports.SYSTEM_NETWORK_STATE_VALUE_SYN_SENT = "syn_sent";
    exports.SYSTEM_NETWORK_STATE_VALUE_TIME_WAIT = "time_wait";
    exports.ATTR_SYSTEM_PAGING_DIRECTION = "system.paging.direction";
    exports.SYSTEM_PAGING_DIRECTION_VALUE_IN = "in";
    exports.SYSTEM_PAGING_DIRECTION_VALUE_OUT = "out";
    exports.ATTR_SYSTEM_PAGING_FAULT_TYPE = "system.paging.fault.type";
    exports.SYSTEM_PAGING_FAULT_TYPE_VALUE_MAJOR = "major";
    exports.SYSTEM_PAGING_FAULT_TYPE_VALUE_MINOR = "minor";
    exports.ATTR_SYSTEM_PAGING_STATE = "system.paging.state";
    exports.SYSTEM_PAGING_STATE_VALUE_FREE = "free";
    exports.SYSTEM_PAGING_STATE_VALUE_USED = "used";
    exports.ATTR_SYSTEM_PAGING_TYPE = "system.paging.type";
    exports.SYSTEM_PAGING_TYPE_VALUE_MAJOR = "major";
    exports.SYSTEM_PAGING_TYPE_VALUE_MINOR = "minor";
    exports.ATTR_SYSTEM_PROCESS_STATUS = "system.process.status";
    exports.SYSTEM_PROCESS_STATUS_VALUE_DEFUNCT = "defunct";
    exports.SYSTEM_PROCESS_STATUS_VALUE_RUNNING = "running";
    exports.SYSTEM_PROCESS_STATUS_VALUE_SLEEPING = "sleeping";
    exports.SYSTEM_PROCESS_STATUS_VALUE_STOPPED = "stopped";
    exports.ATTR_SYSTEM_PROCESSES_STATUS = "system.processes.status";
    exports.SYSTEM_PROCESSES_STATUS_VALUE_DEFUNCT = "defunct";
    exports.SYSTEM_PROCESSES_STATUS_VALUE_RUNNING = "running";
    exports.SYSTEM_PROCESSES_STATUS_VALUE_SLEEPING = "sleeping";
    exports.SYSTEM_PROCESSES_STATUS_VALUE_STOPPED = "stopped";
    exports.ATTR_TELEMETRY_DISTRO_NAME = "telemetry.distro.name";
    exports.ATTR_TELEMETRY_DISTRO_VERSION = "telemetry.distro.version";
    exports.ATTR_TEST_CASE_NAME = "test.case.name";
    exports.ATTR_TEST_CASE_RESULT_STATUS = "test.case.result.status";
    exports.TEST_CASE_RESULT_STATUS_VALUE_FAIL = "fail";
    exports.TEST_CASE_RESULT_STATUS_VALUE_PASS = "pass";
    exports.ATTR_TEST_SUITE_NAME = "test.suite.name";
    exports.ATTR_TEST_SUITE_RUN_STATUS = "test.suite.run.status";
    exports.TEST_SUITE_RUN_STATUS_VALUE_ABORTED = "aborted";
    exports.TEST_SUITE_RUN_STATUS_VALUE_FAILURE = "failure";
    exports.TEST_SUITE_RUN_STATUS_VALUE_IN_PROGRESS = "in_progress";
    exports.TEST_SUITE_RUN_STATUS_VALUE_SKIPPED = "skipped";
    exports.TEST_SUITE_RUN_STATUS_VALUE_SUCCESS = "success";
    exports.TEST_SUITE_RUN_STATUS_VALUE_TIMED_OUT = "timed_out";
    exports.ATTR_THREAD_ID = "thread.id";
    exports.ATTR_THREAD_NAME = "thread.name";
    exports.ATTR_TLS_CIPHER = "tls.cipher";
    exports.ATTR_TLS_CLIENT_CERTIFICATE = "tls.client.certificate";
    exports.ATTR_TLS_CLIENT_CERTIFICATE_CHAIN = "tls.client.certificate_chain";
    exports.ATTR_TLS_CLIENT_HASH_MD5 = "tls.client.hash.md5";
    exports.ATTR_TLS_CLIENT_HASH_SHA1 = "tls.client.hash.sha1";
    exports.ATTR_TLS_CLIENT_HASH_SHA256 = "tls.client.hash.sha256";
    exports.ATTR_TLS_CLIENT_ISSUER = "tls.client.issuer";
    exports.ATTR_TLS_CLIENT_JA3 = "tls.client.ja3";
    exports.ATTR_TLS_CLIENT_NOT_AFTER = "tls.client.not_after";
    exports.ATTR_TLS_CLIENT_NOT_BEFORE = "tls.client.not_before";
    exports.ATTR_TLS_CLIENT_SERVER_NAME = "tls.client.server_name";
    exports.ATTR_TLS_CLIENT_SUBJECT = "tls.client.subject";
    exports.ATTR_TLS_CLIENT_SUPPORTED_CIPHERS = "tls.client.supported_ciphers";
    exports.ATTR_TLS_CURVE = "tls.curve";
    exports.ATTR_TLS_ESTABLISHED = "tls.established";
    exports.ATTR_TLS_NEXT_PROTOCOL = "tls.next_protocol";
    exports.ATTR_TLS_PROTOCOL_NAME = "tls.protocol.name";
    exports.TLS_PROTOCOL_NAME_VALUE_SSL = "ssl";
    exports.TLS_PROTOCOL_NAME_VALUE_TLS = "tls";
    exports.ATTR_TLS_PROTOCOL_VERSION = "tls.protocol.version";
    exports.ATTR_TLS_RESUMED = "tls.resumed";
    exports.ATTR_TLS_SERVER_CERTIFICATE = "tls.server.certificate";
    exports.ATTR_TLS_SERVER_CERTIFICATE_CHAIN = "tls.server.certificate_chain";
    exports.ATTR_TLS_SERVER_HASH_MD5 = "tls.server.hash.md5";
    exports.ATTR_TLS_SERVER_HASH_SHA1 = "tls.server.hash.sha1";
    exports.ATTR_TLS_SERVER_HASH_SHA256 = "tls.server.hash.sha256";
    exports.ATTR_TLS_SERVER_ISSUER = "tls.server.issuer";
    exports.ATTR_TLS_SERVER_JA3S = "tls.server.ja3s";
    exports.ATTR_TLS_SERVER_NOT_AFTER = "tls.server.not_after";
    exports.ATTR_TLS_SERVER_NOT_BEFORE = "tls.server.not_before";
    exports.ATTR_TLS_SERVER_SUBJECT = "tls.server.subject";
    exports.ATTR_URL_DOMAIN = "url.domain";
    exports.ATTR_URL_EXTENSION = "url.extension";
    exports.ATTR_URL_ORIGINAL = "url.original";
    exports.ATTR_URL_PORT = "url.port";
    exports.ATTR_URL_REGISTERED_DOMAIN = "url.registered_domain";
    exports.ATTR_URL_SUBDOMAIN = "url.subdomain";
    exports.ATTR_URL_TEMPLATE = "url.template";
    exports.ATTR_URL_TOP_LEVEL_DOMAIN = "url.top_level_domain";
    exports.ATTR_USER_EMAIL = "user.email";
    exports.ATTR_USER_FULL_NAME = "user.full_name";
    exports.ATTR_USER_HASH = "user.hash";
    exports.ATTR_USER_ID = "user.id";
    exports.ATTR_USER_NAME = "user.name";
    exports.ATTR_USER_ROLES = "user.roles";
    exports.ATTR_USER_AGENT_NAME = "user_agent.name";
    exports.ATTR_USER_AGENT_OS_NAME = "user_agent.os.name";
    exports.ATTR_USER_AGENT_OS_VERSION = "user_agent.os.version";
    exports.ATTR_USER_AGENT_SYNTHETIC_TYPE = "user_agent.synthetic.type";
    exports.USER_AGENT_SYNTHETIC_TYPE_VALUE_BOT = "bot";
    exports.USER_AGENT_SYNTHETIC_TYPE_VALUE_TEST = "test";
    exports.ATTR_USER_AGENT_VERSION = "user_agent.version";
    exports.ATTR_V8JS_GC_TYPE = "v8js.gc.type";
    exports.V8JS_GC_TYPE_VALUE_INCREMENTAL = "incremental";
    exports.V8JS_GC_TYPE_VALUE_MAJOR = "major";
    exports.V8JS_GC_TYPE_VALUE_MINOR = "minor";
    exports.V8JS_GC_TYPE_VALUE_WEAKCB = "weakcb";
    exports.ATTR_V8JS_HEAP_SPACE_NAME = "v8js.heap.space.name";
    exports.V8JS_HEAP_SPACE_NAME_VALUE_CODE_SPACE = "code_space";
    exports.V8JS_HEAP_SPACE_NAME_VALUE_LARGE_OBJECT_SPACE = "large_object_space";
    exports.V8JS_HEAP_SPACE_NAME_VALUE_MAP_SPACE = "map_space";
    exports.V8JS_HEAP_SPACE_NAME_VALUE_NEW_SPACE = "new_space";
    exports.V8JS_HEAP_SPACE_NAME_VALUE_OLD_SPACE = "old_space";
    exports.ATTR_VCS_CHANGE_ID = "vcs.change.id";
    exports.ATTR_VCS_CHANGE_STATE = "vcs.change.state";
    exports.VCS_CHANGE_STATE_VALUE_CLOSED = "closed";
    exports.VCS_CHANGE_STATE_VALUE_MERGED = "merged";
    exports.VCS_CHANGE_STATE_VALUE_OPEN = "open";
    exports.VCS_CHANGE_STATE_VALUE_WIP = "wip";
    exports.ATTR_VCS_CHANGE_TITLE = "vcs.change.title";
    exports.ATTR_VCS_LINE_CHANGE_TYPE = "vcs.line_change.type";
    exports.VCS_LINE_CHANGE_TYPE_VALUE_ADDED = "added";
    exports.VCS_LINE_CHANGE_TYPE_VALUE_REMOVED = "removed";
    exports.ATTR_VCS_OWNER_NAME = "vcs.owner.name";
    exports.ATTR_VCS_PROVIDER_NAME = "vcs.provider.name";
    exports.VCS_PROVIDER_NAME_VALUE_BITBUCKET = "bitbucket";
    exports.VCS_PROVIDER_NAME_VALUE_GITEA = "gitea";
    exports.VCS_PROVIDER_NAME_VALUE_GITHUB = "github";
    exports.VCS_PROVIDER_NAME_VALUE_GITLAB = "gitlab";
    exports.VCS_PROVIDER_NAME_VALUE_GITTEA = "gittea";
    exports.ATTR_VCS_REF_BASE_NAME = "vcs.ref.base.name";
    exports.ATTR_VCS_REF_BASE_REVISION = "vcs.ref.base.revision";
    exports.ATTR_VCS_REF_BASE_TYPE = "vcs.ref.base.type";
    exports.VCS_REF_BASE_TYPE_VALUE_BRANCH = "branch";
    exports.VCS_REF_BASE_TYPE_VALUE_TAG = "tag";
    exports.ATTR_VCS_REF_HEAD_NAME = "vcs.ref.head.name";
    exports.ATTR_VCS_REF_HEAD_REVISION = "vcs.ref.head.revision";
    exports.ATTR_VCS_REF_HEAD_TYPE = "vcs.ref.head.type";
    exports.VCS_REF_HEAD_TYPE_VALUE_BRANCH = "branch";
    exports.VCS_REF_HEAD_TYPE_VALUE_TAG = "tag";
    exports.ATTR_VCS_REF_TYPE = "vcs.ref.type";
    exports.VCS_REF_TYPE_VALUE_BRANCH = "branch";
    exports.VCS_REF_TYPE_VALUE_TAG = "tag";
    exports.ATTR_VCS_REPOSITORY_CHANGE_ID = "vcs.repository.change.id";
    exports.ATTR_VCS_REPOSITORY_CHANGE_TITLE = "vcs.repository.change.title";
    exports.ATTR_VCS_REPOSITORY_NAME = "vcs.repository.name";
    exports.ATTR_VCS_REPOSITORY_REF_NAME = "vcs.repository.ref.name";
    exports.ATTR_VCS_REPOSITORY_REF_REVISION = "vcs.repository.ref.revision";
    exports.ATTR_VCS_REPOSITORY_REF_TYPE = "vcs.repository.ref.type";
    exports.VCS_REPOSITORY_REF_TYPE_VALUE_BRANCH = "branch";
    exports.VCS_REPOSITORY_REF_TYPE_VALUE_TAG = "tag";
    exports.ATTR_VCS_REPOSITORY_URL_FULL = "vcs.repository.url.full";
    exports.ATTR_VCS_REVISION_DELTA_DIRECTION = "vcs.revision_delta.direction";
    exports.VCS_REVISION_DELTA_DIRECTION_VALUE_AHEAD = "ahead";
    exports.VCS_REVISION_DELTA_DIRECTION_VALUE_BEHIND = "behind";
    exports.ATTR_WEBENGINE_DESCRIPTION = "webengine.description";
    exports.ATTR_WEBENGINE_NAME = "webengine.name";
    exports.ATTR_WEBENGINE_VERSION = "webengine.version";
    exports.ATTR_ZOS_SMF_ID = "zos.smf.id";
    exports.ATTR_ZOS_SYSPLEX_NAME = "zos.sysplex.name";
  }
});

// ../../node_modules/@opentelemetry/semantic-conventions/build/src/experimental_metrics.js
var require_experimental_metrics = __commonJS({
  "../../node_modules/@opentelemetry/semantic-conventions/build/src/experimental_metrics.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.METRIC_DB_CLIENT_CONNECTION_CREATE_TIME = exports.METRIC_DB_CLIENT_CONNECTION_COUNT = exports.METRIC_CPYTHON_GC_UNCOLLECTABLE_OBJECTS = exports.METRIC_CPYTHON_GC_COLLECTIONS = exports.METRIC_CPYTHON_GC_COLLECTED_OBJECTS = exports.METRIC_CPU_UTILIZATION = exports.METRIC_CPU_TIME = exports.METRIC_CPU_FREQUENCY = exports.METRIC_CONTAINER_UPTIME = exports.METRIC_CONTAINER_NETWORK_IO = exports.METRIC_CONTAINER_MEMORY_WORKING_SET = exports.METRIC_CONTAINER_MEMORY_USAGE = exports.METRIC_CONTAINER_MEMORY_RSS = exports.METRIC_CONTAINER_MEMORY_PAGING_FAULTS = exports.METRIC_CONTAINER_MEMORY_AVAILABLE = exports.METRIC_CONTAINER_FILESYSTEM_USAGE = exports.METRIC_CONTAINER_FILESYSTEM_CAPACITY = exports.METRIC_CONTAINER_FILESYSTEM_AVAILABLE = exports.METRIC_CONTAINER_DISK_IO = exports.METRIC_CONTAINER_CPU_USAGE = exports.METRIC_CONTAINER_CPU_TIME = exports.METRIC_CICD_WORKER_COUNT = exports.METRIC_CICD_SYSTEM_ERRORS = exports.METRIC_CICD_PIPELINE_RUN_ERRORS = exports.METRIC_CICD_PIPELINE_RUN_DURATION = exports.METRIC_CICD_PIPELINE_RUN_ACTIVE = exports.METRIC_AZURE_COSMOSDB_CLIENT_OPERATION_REQUEST_CHARGE = exports.METRIC_AZURE_COSMOSDB_CLIENT_ACTIVE_INSTANCE_COUNT = exports.METRIC_ASPNETCORE_MEMORY_POOL_RENTED = exports.METRIC_ASPNETCORE_MEMORY_POOL_POOLED = exports.METRIC_ASPNETCORE_MEMORY_POOL_EVICTED = exports.METRIC_ASPNETCORE_MEMORY_POOL_ALLOCATED = exports.METRIC_ASPNETCORE_IDENTITY_USER_VERIFY_TOKEN_ATTEMPTS = exports.METRIC_ASPNETCORE_IDENTITY_USER_UPDATE_DURATION = exports.METRIC_ASPNETCORE_IDENTITY_USER_GENERATED_TOKENS = exports.METRIC_ASPNETCORE_IDENTITY_USER_DELETE_DURATION = exports.METRIC_ASPNETCORE_IDENTITY_USER_CREATE_DURATION = exports.METRIC_ASPNETCORE_IDENTITY_USER_CHECK_PASSWORD_ATTEMPTS = exports.METRIC_ASPNETCORE_IDENTITY_SIGN_IN_TWO_FACTOR_CLIENTS_REMEMBERED = exports.METRIC_ASPNETCORE_IDENTITY_SIGN_IN_TWO_FACTOR_CLIENTS_FORGOTTEN = exports.METRIC_ASPNETCORE_IDENTITY_SIGN_IN_SIGN_OUTS = exports.METRIC_ASPNETCORE_IDENTITY_SIGN_IN_SIGN_INS = exports.METRIC_ASPNETCORE_IDENTITY_SIGN_IN_CHECK_PASSWORD_ATTEMPTS = exports.METRIC_ASPNETCORE_IDENTITY_SIGN_IN_AUTHENTICATE_DURATION = exports.METRIC_ASPNETCORE_AUTHORIZATION_ATTEMPTS = exports.METRIC_ASPNETCORE_AUTHENTICATION_SIGN_OUTS = exports.METRIC_ASPNETCORE_AUTHENTICATION_SIGN_INS = exports.METRIC_ASPNETCORE_AUTHENTICATION_FORBIDS = exports.METRIC_ASPNETCORE_AUTHENTICATION_CHALLENGES = exports.METRIC_ASPNETCORE_AUTHENTICATION_AUTHENTICATE_DURATION = void 0;
    exports.METRIC_HTTP_SERVER_REQUEST_BODY_SIZE = exports.METRIC_HTTP_SERVER_ACTIVE_REQUESTS = exports.METRIC_HTTP_CLIENT_RESPONSE_BODY_SIZE = exports.METRIC_HTTP_CLIENT_REQUEST_BODY_SIZE = exports.METRIC_HTTP_CLIENT_OPEN_CONNECTIONS = exports.METRIC_HTTP_CLIENT_CONNECTION_DURATION = exports.METRIC_HTTP_CLIENT_ACTIVE_REQUESTS = exports.METRIC_GO_SCHEDULE_DURATION = exports.METRIC_GO_PROCESSOR_LIMIT = exports.METRIC_GO_MEMORY_USED = exports.METRIC_GO_MEMORY_LIMIT = exports.METRIC_GO_MEMORY_GC_GOAL = exports.METRIC_GO_MEMORY_ALLOCATIONS = exports.METRIC_GO_MEMORY_ALLOCATED = exports.METRIC_GO_GOROUTINE_COUNT = exports.METRIC_GO_CONFIG_GOGC = exports.METRIC_GEN_AI_SERVER_TIME_TO_FIRST_TOKEN = exports.METRIC_GEN_AI_SERVER_TIME_PER_OUTPUT_TOKEN = exports.METRIC_GEN_AI_SERVER_REQUEST_DURATION = exports.METRIC_GEN_AI_CLIENT_TOKEN_USAGE = exports.METRIC_GEN_AI_CLIENT_OPERATION_DURATION = exports.METRIC_FAAS_TIMEOUTS = exports.METRIC_FAAS_NET_IO = exports.METRIC_FAAS_MEM_USAGE = exports.METRIC_FAAS_INVOKE_DURATION = exports.METRIC_FAAS_INVOCATIONS = exports.METRIC_FAAS_INIT_DURATION = exports.METRIC_FAAS_ERRORS = exports.METRIC_FAAS_CPU_USAGE = exports.METRIC_FAAS_COLDSTARTS = exports.METRIC_DNS_LOOKUP_DURATION = exports.METRIC_DB_CLIENT_RESPONSE_RETURNED_ROWS = exports.METRIC_DB_CLIENT_COSMOSDB_OPERATION_REQUEST_CHARGE = exports.METRIC_DB_CLIENT_COSMOSDB_ACTIVE_INSTANCE_COUNT = exports.METRIC_DB_CLIENT_CONNECTIONS_WAIT_TIME = exports.METRIC_DB_CLIENT_CONNECTIONS_USE_TIME = exports.METRIC_DB_CLIENT_CONNECTIONS_USAGE = exports.METRIC_DB_CLIENT_CONNECTIONS_TIMEOUTS = exports.METRIC_DB_CLIENT_CONNECTIONS_PENDING_REQUESTS = exports.METRIC_DB_CLIENT_CONNECTIONS_MAX = exports.METRIC_DB_CLIENT_CONNECTIONS_IDLE_MIN = exports.METRIC_DB_CLIENT_CONNECTIONS_IDLE_MAX = exports.METRIC_DB_CLIENT_CONNECTIONS_CREATE_TIME = exports.METRIC_DB_CLIENT_CONNECTION_WAIT_TIME = exports.METRIC_DB_CLIENT_CONNECTION_USE_TIME = exports.METRIC_DB_CLIENT_CONNECTION_TIMEOUTS = exports.METRIC_DB_CLIENT_CONNECTION_PENDING_REQUESTS = exports.METRIC_DB_CLIENT_CONNECTION_MAX = exports.METRIC_DB_CLIENT_CONNECTION_IDLE_MIN = exports.METRIC_DB_CLIENT_CONNECTION_IDLE_MAX = void 0;
    exports.METRIC_JVM_SYSTEM_CPU_LOAD_1M = exports.METRIC_JVM_MEMORY_INIT = exports.METRIC_JVM_FILE_DESCRIPTOR_COUNT = exports.METRIC_JVM_BUFFER_MEMORY_USED = exports.METRIC_JVM_BUFFER_MEMORY_USAGE = exports.METRIC_JVM_BUFFER_MEMORY_LIMIT = exports.METRIC_JVM_BUFFER_COUNT = exports.METRIC_HW_VOLTAGE_NOMINAL = exports.METRIC_HW_VOLTAGE_LIMIT = exports.METRIC_HW_VOLTAGE = exports.METRIC_HW_TEMPERATURE_LIMIT = exports.METRIC_HW_TEMPERATURE = exports.METRIC_HW_TAPE_DRIVE_OPERATIONS = exports.METRIC_HW_STATUS = exports.METRIC_HW_POWER_SUPPLY_UTILIZATION = exports.METRIC_HW_POWER_SUPPLY_USAGE = exports.METRIC_HW_POWER_SUPPLY_LIMIT = exports.METRIC_HW_POWER = exports.METRIC_HW_PHYSICAL_DISK_SMART = exports.METRIC_HW_PHYSICAL_DISK_SIZE = exports.METRIC_HW_PHYSICAL_DISK_ENDURANCE_UTILIZATION = exports.METRIC_HW_NETWORK_UP = exports.METRIC_HW_NETWORK_PACKETS = exports.METRIC_HW_NETWORK_IO = exports.METRIC_HW_NETWORK_BANDWIDTH_UTILIZATION = exports.METRIC_HW_NETWORK_BANDWIDTH_LIMIT = exports.METRIC_HW_MEMORY_SIZE = exports.METRIC_HW_LOGICAL_DISK_UTILIZATION = exports.METRIC_HW_LOGICAL_DISK_USAGE = exports.METRIC_HW_LOGICAL_DISK_LIMIT = exports.METRIC_HW_HOST_POWER = exports.METRIC_HW_HOST_HEATING_MARGIN = exports.METRIC_HW_HOST_ENERGY = exports.METRIC_HW_HOST_AMBIENT_TEMPERATURE = exports.METRIC_HW_GPU_UTILIZATION = exports.METRIC_HW_GPU_MEMORY_UTILIZATION = exports.METRIC_HW_GPU_MEMORY_USAGE = exports.METRIC_HW_GPU_MEMORY_LIMIT = exports.METRIC_HW_GPU_IO = exports.METRIC_HW_FAN_SPEED_RATIO = exports.METRIC_HW_FAN_SPEED_LIMIT = exports.METRIC_HW_FAN_SPEED = exports.METRIC_HW_ERRORS = exports.METRIC_HW_ENERGY = exports.METRIC_HW_CPU_SPEED_LIMIT = exports.METRIC_HW_CPU_SPEED = exports.METRIC_HW_BATTERY_TIME_LEFT = exports.METRIC_HW_BATTERY_CHARGE_LIMIT = exports.METRIC_HW_BATTERY_CHARGE = exports.METRIC_HTTP_SERVER_RESPONSE_BODY_SIZE = void 0;
    exports.METRIC_K8S_JOB_SUCCESSFUL_PODS = exports.METRIC_K8S_JOB_POD_SUCCESSFUL = exports.METRIC_K8S_JOB_POD_MAX_PARALLEL = exports.METRIC_K8S_JOB_POD_FAILED = exports.METRIC_K8S_JOB_POD_DESIRED_SUCCESSFUL = exports.METRIC_K8S_JOB_POD_ACTIVE = exports.METRIC_K8S_JOB_MAX_PARALLEL_PODS = exports.METRIC_K8S_JOB_FAILED_PODS = exports.METRIC_K8S_JOB_DESIRED_SUCCESSFUL_PODS = exports.METRIC_K8S_JOB_ACTIVE_PODS = exports.METRIC_K8S_HPA_POD_MIN = exports.METRIC_K8S_HPA_POD_MAX = exports.METRIC_K8S_HPA_POD_DESIRED = exports.METRIC_K8S_HPA_POD_CURRENT = exports.METRIC_K8S_HPA_MIN_PODS = exports.METRIC_K8S_HPA_METRIC_TARGET_CPU_VALUE = exports.METRIC_K8S_HPA_METRIC_TARGET_CPU_AVERAGE_VALUE = exports.METRIC_K8S_HPA_METRIC_TARGET_CPU_AVERAGE_UTILIZATION = exports.METRIC_K8S_HPA_MAX_PODS = exports.METRIC_K8S_HPA_DESIRED_PODS = exports.METRIC_K8S_HPA_CURRENT_PODS = exports.METRIC_K8S_DEPLOYMENT_POD_DESIRED = exports.METRIC_K8S_DEPLOYMENT_POD_AVAILABLE = exports.METRIC_K8S_DEPLOYMENT_DESIRED_PODS = exports.METRIC_K8S_DEPLOYMENT_AVAILABLE_PODS = exports.METRIC_K8S_DAEMONSET_READY_NODES = exports.METRIC_K8S_DAEMONSET_NODE_READY = exports.METRIC_K8S_DAEMONSET_NODE_MISSCHEDULED = exports.METRIC_K8S_DAEMONSET_NODE_DESIRED_SCHEDULED = exports.METRIC_K8S_DAEMONSET_NODE_CURRENT_SCHEDULED = exports.METRIC_K8S_DAEMONSET_MISSCHEDULED_NODES = exports.METRIC_K8S_DAEMONSET_DESIRED_SCHEDULED_NODES = exports.METRIC_K8S_DAEMONSET_CURRENT_SCHEDULED_NODES = exports.METRIC_K8S_CRONJOB_JOB_ACTIVE = exports.METRIC_K8S_CRONJOB_ACTIVE_JOBS = exports.METRIC_K8S_CONTAINER_STORAGE_REQUEST = exports.METRIC_K8S_CONTAINER_STORAGE_LIMIT = exports.METRIC_K8S_CONTAINER_STATUS_STATE = exports.METRIC_K8S_CONTAINER_STATUS_REASON = exports.METRIC_K8S_CONTAINER_RESTART_COUNT = exports.METRIC_K8S_CONTAINER_READY = exports.METRIC_K8S_CONTAINER_MEMORY_REQUEST = exports.METRIC_K8S_CONTAINER_MEMORY_LIMIT = exports.METRIC_K8S_CONTAINER_EPHEMERAL_STORAGE_REQUEST = exports.METRIC_K8S_CONTAINER_EPHEMERAL_STORAGE_LIMIT = exports.METRIC_K8S_CONTAINER_CPU_REQUEST_UTILIZATION = exports.METRIC_K8S_CONTAINER_CPU_REQUEST = exports.METRIC_K8S_CONTAINER_CPU_LIMIT_UTILIZATION = exports.METRIC_K8S_CONTAINER_CPU_LIMIT = exports.METRIC_JVM_SYSTEM_CPU_UTILIZATION = void 0;
    exports.METRIC_K8S_REPLICATION_CONTROLLER_DESIRED_PODS = exports.METRIC_K8S_REPLICATION_CONTROLLER_AVAILABLE_PODS = exports.METRIC_K8S_REPLICASET_POD_DESIRED = exports.METRIC_K8S_REPLICASET_POD_AVAILABLE = exports.METRIC_K8S_REPLICASET_DESIRED_PODS = exports.METRIC_K8S_REPLICASET_AVAILABLE_PODS = exports.METRIC_K8S_POD_VOLUME_USAGE = exports.METRIC_K8S_POD_VOLUME_INODE_USED = exports.METRIC_K8S_POD_VOLUME_INODE_FREE = exports.METRIC_K8S_POD_VOLUME_INODE_COUNT = exports.METRIC_K8S_POD_VOLUME_CAPACITY = exports.METRIC_K8S_POD_VOLUME_AVAILABLE = exports.METRIC_K8S_POD_UPTIME = exports.METRIC_K8S_POD_STATUS_REASON = exports.METRIC_K8S_POD_STATUS_PHASE = exports.METRIC_K8S_POD_NETWORK_IO = exports.METRIC_K8S_POD_NETWORK_ERRORS = exports.METRIC_K8S_POD_MEMORY_WORKING_SET = exports.METRIC_K8S_POD_MEMORY_USAGE = exports.METRIC_K8S_POD_MEMORY_RSS = exports.METRIC_K8S_POD_MEMORY_PAGING_FAULTS = exports.METRIC_K8S_POD_MEMORY_AVAILABLE = exports.METRIC_K8S_POD_FILESYSTEM_USAGE = exports.METRIC_K8S_POD_FILESYSTEM_CAPACITY = exports.METRIC_K8S_POD_FILESYSTEM_AVAILABLE = exports.METRIC_K8S_POD_CPU_USAGE = exports.METRIC_K8S_POD_CPU_TIME = exports.METRIC_K8S_NODE_UPTIME = exports.METRIC_K8S_NODE_POD_ALLOCATABLE = exports.METRIC_K8S_NODE_NETWORK_IO = exports.METRIC_K8S_NODE_NETWORK_ERRORS = exports.METRIC_K8S_NODE_MEMORY_WORKING_SET = exports.METRIC_K8S_NODE_MEMORY_USAGE = exports.METRIC_K8S_NODE_MEMORY_RSS = exports.METRIC_K8S_NODE_MEMORY_PAGING_FAULTS = exports.METRIC_K8S_NODE_MEMORY_AVAILABLE = exports.METRIC_K8S_NODE_MEMORY_ALLOCATABLE = exports.METRIC_K8S_NODE_FILESYSTEM_USAGE = exports.METRIC_K8S_NODE_FILESYSTEM_CAPACITY = exports.METRIC_K8S_NODE_FILESYSTEM_AVAILABLE = exports.METRIC_K8S_NODE_EPHEMERAL_STORAGE_ALLOCATABLE = exports.METRIC_K8S_NODE_CPU_USAGE = exports.METRIC_K8S_NODE_CPU_TIME = exports.METRIC_K8S_NODE_CPU_ALLOCATABLE = exports.METRIC_K8S_NODE_CONDITION_STATUS = exports.METRIC_K8S_NODE_ALLOCATABLE_PODS = exports.METRIC_K8S_NODE_ALLOCATABLE_MEMORY = exports.METRIC_K8S_NODE_ALLOCATABLE_EPHEMERAL_STORAGE = exports.METRIC_K8S_NODE_ALLOCATABLE_CPU = exports.METRIC_K8S_NAMESPACE_PHASE = void 0;
    exports.METRIC_NFS_CLIENT_PROCEDURE_COUNT = exports.METRIC_NFS_CLIENT_OPERATION_COUNT = exports.METRIC_NFS_CLIENT_NET_TCP_CONNECTION_ACCEPTED = exports.METRIC_NFS_CLIENT_NET_COUNT = exports.METRIC_MESSAGING_RECEIVE_MESSAGES = exports.METRIC_MESSAGING_RECEIVE_DURATION = exports.METRIC_MESSAGING_PUBLISH_MESSAGES = exports.METRIC_MESSAGING_PUBLISH_DURATION = exports.METRIC_MESSAGING_PROCESS_MESSAGES = exports.METRIC_MESSAGING_PROCESS_DURATION = exports.METRIC_MESSAGING_CLIENT_SENT_MESSAGES = exports.METRIC_MESSAGING_CLIENT_PUBLISHED_MESSAGES = exports.METRIC_MESSAGING_CLIENT_OPERATION_DURATION = exports.METRIC_MESSAGING_CLIENT_CONSUMED_MESSAGES = exports.METRIC_MCP_SERVER_SESSION_DURATION = exports.METRIC_MCP_SERVER_OPERATION_DURATION = exports.METRIC_MCP_CLIENT_SESSION_DURATION = exports.METRIC_MCP_CLIENT_OPERATION_DURATION = exports.METRIC_K8S_STATEFULSET_UPDATED_PODS = exports.METRIC_K8S_STATEFULSET_READY_PODS = exports.METRIC_K8S_STATEFULSET_POD_UPDATED = exports.METRIC_K8S_STATEFULSET_POD_READY = exports.METRIC_K8S_STATEFULSET_POD_DESIRED = exports.METRIC_K8S_STATEFULSET_POD_CURRENT = exports.METRIC_K8S_STATEFULSET_DESIRED_PODS = exports.METRIC_K8S_STATEFULSET_CURRENT_PODS = exports.METRIC_K8S_RESOURCEQUOTA_STORAGE_REQUEST_USED = exports.METRIC_K8S_RESOURCEQUOTA_STORAGE_REQUEST_HARD = exports.METRIC_K8S_RESOURCEQUOTA_PERSISTENTVOLUMECLAIM_COUNT_USED = exports.METRIC_K8S_RESOURCEQUOTA_PERSISTENTVOLUMECLAIM_COUNT_HARD = exports.METRIC_K8S_RESOURCEQUOTA_OBJECT_COUNT_USED = exports.METRIC_K8S_RESOURCEQUOTA_OBJECT_COUNT_HARD = exports.METRIC_K8S_RESOURCEQUOTA_MEMORY_REQUEST_USED = exports.METRIC_K8S_RESOURCEQUOTA_MEMORY_REQUEST_HARD = exports.METRIC_K8S_RESOURCEQUOTA_MEMORY_LIMIT_USED = exports.METRIC_K8S_RESOURCEQUOTA_MEMORY_LIMIT_HARD = exports.METRIC_K8S_RESOURCEQUOTA_HUGEPAGE_COUNT_REQUEST_USED = exports.METRIC_K8S_RESOURCEQUOTA_HUGEPAGE_COUNT_REQUEST_HARD = exports.METRIC_K8S_RESOURCEQUOTA_EPHEMERAL_STORAGE_REQUEST_USED = exports.METRIC_K8S_RESOURCEQUOTA_EPHEMERAL_STORAGE_REQUEST_HARD = exports.METRIC_K8S_RESOURCEQUOTA_EPHEMERAL_STORAGE_LIMIT_USED = exports.METRIC_K8S_RESOURCEQUOTA_EPHEMERAL_STORAGE_LIMIT_HARD = exports.METRIC_K8S_RESOURCEQUOTA_CPU_REQUEST_USED = exports.METRIC_K8S_RESOURCEQUOTA_CPU_REQUEST_HARD = exports.METRIC_K8S_RESOURCEQUOTA_CPU_LIMIT_USED = exports.METRIC_K8S_RESOURCEQUOTA_CPU_LIMIT_HARD = exports.METRIC_K8S_REPLICATIONCONTROLLER_POD_DESIRED = exports.METRIC_K8S_REPLICATIONCONTROLLER_POD_AVAILABLE = exports.METRIC_K8S_REPLICATIONCONTROLLER_DESIRED_PODS = exports.METRIC_K8S_REPLICATIONCONTROLLER_AVAILABLE_PODS = void 0;
    exports.METRIC_OTEL_SDK_EXPORTER_SPAN_INFLIGHT_COUNT = exports.METRIC_OTEL_SDK_EXPORTER_SPAN_INFLIGHT = exports.METRIC_OTEL_SDK_EXPORTER_SPAN_EXPORTED_COUNT = exports.METRIC_OTEL_SDK_EXPORTER_SPAN_EXPORTED = exports.METRIC_OTEL_SDK_EXPORTER_OPERATION_DURATION = exports.METRIC_OTEL_SDK_EXPORTER_METRIC_DATA_POINT_INFLIGHT = exports.METRIC_OTEL_SDK_EXPORTER_METRIC_DATA_POINT_EXPORTED = exports.METRIC_OTEL_SDK_EXPORTER_LOG_INFLIGHT = exports.METRIC_OTEL_SDK_EXPORTER_LOG_EXPORTED = exports.METRIC_OPENSHIFT_CLUSTERQUOTA_STORAGE_REQUEST_USED = exports.METRIC_OPENSHIFT_CLUSTERQUOTA_STORAGE_REQUEST_HARD = exports.METRIC_OPENSHIFT_CLUSTERQUOTA_PERSISTENTVOLUMECLAIM_COUNT_USED = exports.METRIC_OPENSHIFT_CLUSTERQUOTA_PERSISTENTVOLUMECLAIM_COUNT_HARD = exports.METRIC_OPENSHIFT_CLUSTERQUOTA_OBJECT_COUNT_USED = exports.METRIC_OPENSHIFT_CLUSTERQUOTA_OBJECT_COUNT_HARD = exports.METRIC_OPENSHIFT_CLUSTERQUOTA_MEMORY_REQUEST_USED = exports.METRIC_OPENSHIFT_CLUSTERQUOTA_MEMORY_REQUEST_HARD = exports.METRIC_OPENSHIFT_CLUSTERQUOTA_MEMORY_LIMIT_USED = exports.METRIC_OPENSHIFT_CLUSTERQUOTA_MEMORY_LIMIT_HARD = exports.METRIC_OPENSHIFT_CLUSTERQUOTA_HUGEPAGE_COUNT_REQUEST_USED = exports.METRIC_OPENSHIFT_CLUSTERQUOTA_HUGEPAGE_COUNT_REQUEST_HARD = exports.METRIC_OPENSHIFT_CLUSTERQUOTA_EPHEMERAL_STORAGE_REQUEST_USED = exports.METRIC_OPENSHIFT_CLUSTERQUOTA_EPHEMERAL_STORAGE_REQUEST_HARD = exports.METRIC_OPENSHIFT_CLUSTERQUOTA_EPHEMERAL_STORAGE_LIMIT_USED = exports.METRIC_OPENSHIFT_CLUSTERQUOTA_EPHEMERAL_STORAGE_LIMIT_HARD = exports.METRIC_OPENSHIFT_CLUSTERQUOTA_CPU_REQUEST_USED = exports.METRIC_OPENSHIFT_CLUSTERQUOTA_CPU_REQUEST_HARD = exports.METRIC_OPENSHIFT_CLUSTERQUOTA_CPU_LIMIT_USED = exports.METRIC_OPENSHIFT_CLUSTERQUOTA_CPU_LIMIT_HARD = exports.METRIC_NODEJS_EVENTLOOP_UTILIZATION = exports.METRIC_NODEJS_EVENTLOOP_TIME = exports.METRIC_NODEJS_EVENTLOOP_DELAY_STDDEV = exports.METRIC_NODEJS_EVENTLOOP_DELAY_P99 = exports.METRIC_NODEJS_EVENTLOOP_DELAY_P90 = exports.METRIC_NODEJS_EVENTLOOP_DELAY_P50 = exports.METRIC_NODEJS_EVENTLOOP_DELAY_MIN = exports.METRIC_NODEJS_EVENTLOOP_DELAY_MEAN = exports.METRIC_NODEJS_EVENTLOOP_DELAY_MAX = exports.METRIC_NFS_SERVER_THREAD_COUNT = exports.METRIC_NFS_SERVER_RPC_COUNT = exports.METRIC_NFS_SERVER_REPCACHE_REQUESTS = exports.METRIC_NFS_SERVER_PROCEDURE_COUNT = exports.METRIC_NFS_SERVER_OPERATION_COUNT = exports.METRIC_NFS_SERVER_NET_TCP_CONNECTION_ACCEPTED = exports.METRIC_NFS_SERVER_NET_COUNT = exports.METRIC_NFS_SERVER_IO = exports.METRIC_NFS_SERVER_FH_STALE_COUNT = exports.METRIC_NFS_CLIENT_RPC_RETRANSMIT_COUNT = exports.METRIC_NFS_CLIENT_RPC_COUNT = exports.METRIC_NFS_CLIENT_RPC_AUTHREFRESH_COUNT = void 0;
    exports.METRIC_SYSTEM_DISK_OPERATIONS = exports.METRIC_SYSTEM_DISK_OPERATION_TIME = exports.METRIC_SYSTEM_DISK_MERGED = exports.METRIC_SYSTEM_DISK_LIMIT = exports.METRIC_SYSTEM_DISK_IO_TIME = exports.METRIC_SYSTEM_DISK_IO = exports.METRIC_SYSTEM_CPU_UTILIZATION = exports.METRIC_SYSTEM_CPU_TIME = exports.METRIC_SYSTEM_CPU_PHYSICAL_COUNT = exports.METRIC_SYSTEM_CPU_LOGICAL_COUNT = exports.METRIC_SYSTEM_CPU_FREQUENCY = exports.METRIC_RPC_SERVER_RESPONSES_PER_RPC = exports.METRIC_RPC_SERVER_RESPONSE_SIZE = exports.METRIC_RPC_SERVER_REQUESTS_PER_RPC = exports.METRIC_RPC_SERVER_REQUEST_SIZE = exports.METRIC_RPC_SERVER_DURATION = exports.METRIC_RPC_SERVER_CALL_DURATION = exports.METRIC_RPC_CLIENT_RESPONSES_PER_RPC = exports.METRIC_RPC_CLIENT_RESPONSE_SIZE = exports.METRIC_RPC_CLIENT_REQUESTS_PER_RPC = exports.METRIC_RPC_CLIENT_REQUEST_SIZE = exports.METRIC_RPC_CLIENT_DURATION = exports.METRIC_RPC_CLIENT_CALL_DURATION = exports.METRIC_PROCESS_WINDOWS_HANDLE_COUNT = exports.METRIC_PROCESS_UPTIME = exports.METRIC_PROCESS_UNIX_FILE_DESCRIPTOR_COUNT = exports.METRIC_PROCESS_THREAD_COUNT = exports.METRIC_PROCESS_PAGING_FAULTS = exports.METRIC_PROCESS_OPEN_FILE_DESCRIPTOR_COUNT = exports.METRIC_PROCESS_NETWORK_IO = exports.METRIC_PROCESS_MEMORY_VIRTUAL = exports.METRIC_PROCESS_MEMORY_USAGE = exports.METRIC_PROCESS_DISK_IO = exports.METRIC_PROCESS_CPU_UTILIZATION = exports.METRIC_PROCESS_CPU_TIME = exports.METRIC_PROCESS_CONTEXT_SWITCHES = exports.METRIC_OTEL_SDK_SPAN_STARTED = exports.METRIC_OTEL_SDK_SPAN_LIVE_COUNT = exports.METRIC_OTEL_SDK_SPAN_LIVE = exports.METRIC_OTEL_SDK_SPAN_ENDED_COUNT = exports.METRIC_OTEL_SDK_SPAN_ENDED = exports.METRIC_OTEL_SDK_PROCESSOR_SPAN_QUEUE_SIZE = exports.METRIC_OTEL_SDK_PROCESSOR_SPAN_QUEUE_CAPACITY = exports.METRIC_OTEL_SDK_PROCESSOR_SPAN_PROCESSED_COUNT = exports.METRIC_OTEL_SDK_PROCESSOR_SPAN_PROCESSED = exports.METRIC_OTEL_SDK_PROCESSOR_LOG_QUEUE_SIZE = exports.METRIC_OTEL_SDK_PROCESSOR_LOG_QUEUE_CAPACITY = exports.METRIC_OTEL_SDK_PROCESSOR_LOG_PROCESSED = exports.METRIC_OTEL_SDK_METRIC_READER_COLLECTION_DURATION = exports.METRIC_OTEL_SDK_LOG_CREATED = void 0;
    exports.METRIC_VCS_REPOSITORY_COUNT = exports.METRIC_VCS_REF_TIME = exports.METRIC_VCS_REF_REVISIONS_DELTA = exports.METRIC_VCS_REF_LINES_DELTA = exports.METRIC_VCS_REF_COUNT = exports.METRIC_VCS_CONTRIBUTOR_COUNT = exports.METRIC_VCS_CHANGE_TIME_TO_MERGE = exports.METRIC_VCS_CHANGE_TIME_TO_APPROVAL = exports.METRIC_VCS_CHANGE_DURATION = exports.METRIC_VCS_CHANGE_COUNT = exports.METRIC_V8JS_MEMORY_HEAP_USED = exports.METRIC_V8JS_MEMORY_HEAP_SPACE_PHYSICAL_SIZE = exports.METRIC_V8JS_MEMORY_HEAP_SPACE_AVAILABLE_SIZE = exports.METRIC_V8JS_MEMORY_HEAP_LIMIT = exports.METRIC_V8JS_HEAP_SPACE_PHYSICAL_SIZE = exports.METRIC_V8JS_HEAP_SPACE_AVAILABLE_SIZE = exports.METRIC_V8JS_GC_DURATION = exports.METRIC_SYSTEM_UPTIME = exports.METRIC_SYSTEM_PROCESS_CREATED = exports.METRIC_SYSTEM_PROCESS_COUNT = exports.METRIC_SYSTEM_PAGING_UTILIZATION = exports.METRIC_SYSTEM_PAGING_USAGE = exports.METRIC_SYSTEM_PAGING_OPERATIONS = exports.METRIC_SYSTEM_PAGING_FAULTS = exports.METRIC_SYSTEM_NETWORK_PACKETS = exports.METRIC_SYSTEM_NETWORK_PACKET_DROPPED = exports.METRIC_SYSTEM_NETWORK_PACKET_COUNT = exports.METRIC_SYSTEM_NETWORK_IO = exports.METRIC_SYSTEM_NETWORK_ERRORS = exports.METRIC_SYSTEM_NETWORK_DROPPED = exports.METRIC_SYSTEM_NETWORK_CONNECTIONS = exports.METRIC_SYSTEM_NETWORK_CONNECTION_COUNT = exports.METRIC_SYSTEM_MEMORY_UTILIZATION = exports.METRIC_SYSTEM_MEMORY_USAGE = exports.METRIC_SYSTEM_MEMORY_SHARED = exports.METRIC_SYSTEM_MEMORY_LINUX_SLAB_USAGE = exports.METRIC_SYSTEM_MEMORY_LINUX_AVAILABLE = exports.METRIC_SYSTEM_MEMORY_LIMIT = exports.METRIC_SYSTEM_LINUX_MEMORY_SLAB_USAGE = exports.METRIC_SYSTEM_LINUX_MEMORY_AVAILABLE = exports.METRIC_SYSTEM_FILESYSTEM_UTILIZATION = exports.METRIC_SYSTEM_FILESYSTEM_USAGE = exports.METRIC_SYSTEM_FILESYSTEM_LIMIT = void 0;
    exports.METRIC_ASPNETCORE_AUTHENTICATION_AUTHENTICATE_DURATION = "aspnetcore.authentication.authenticate.duration";
    exports.METRIC_ASPNETCORE_AUTHENTICATION_CHALLENGES = "aspnetcore.authentication.challenges";
    exports.METRIC_ASPNETCORE_AUTHENTICATION_FORBIDS = "aspnetcore.authentication.forbids";
    exports.METRIC_ASPNETCORE_AUTHENTICATION_SIGN_INS = "aspnetcore.authentication.sign_ins";
    exports.METRIC_ASPNETCORE_AUTHENTICATION_SIGN_OUTS = "aspnetcore.authentication.sign_outs";
    exports.METRIC_ASPNETCORE_AUTHORIZATION_ATTEMPTS = "aspnetcore.authorization.attempts";
    exports.METRIC_ASPNETCORE_IDENTITY_SIGN_IN_AUTHENTICATE_DURATION = "aspnetcore.identity.sign_in.authenticate.duration";
    exports.METRIC_ASPNETCORE_IDENTITY_SIGN_IN_CHECK_PASSWORD_ATTEMPTS = "aspnetcore.identity.sign_in.check_password_attempts";
    exports.METRIC_ASPNETCORE_IDENTITY_SIGN_IN_SIGN_INS = "aspnetcore.identity.sign_in.sign_ins";
    exports.METRIC_ASPNETCORE_IDENTITY_SIGN_IN_SIGN_OUTS = "aspnetcore.identity.sign_in.sign_outs";
    exports.METRIC_ASPNETCORE_IDENTITY_SIGN_IN_TWO_FACTOR_CLIENTS_FORGOTTEN = "aspnetcore.identity.sign_in.two_factor_clients_forgotten";
    exports.METRIC_ASPNETCORE_IDENTITY_SIGN_IN_TWO_FACTOR_CLIENTS_REMEMBERED = "aspnetcore.identity.sign_in.two_factor_clients_remembered";
    exports.METRIC_ASPNETCORE_IDENTITY_USER_CHECK_PASSWORD_ATTEMPTS = "aspnetcore.identity.user.check_password_attempts";
    exports.METRIC_ASPNETCORE_IDENTITY_USER_CREATE_DURATION = "aspnetcore.identity.user.create.duration";
    exports.METRIC_ASPNETCORE_IDENTITY_USER_DELETE_DURATION = "aspnetcore.identity.user.delete.duration";
    exports.METRIC_ASPNETCORE_IDENTITY_USER_GENERATED_TOKENS = "aspnetcore.identity.user.generated_tokens";
    exports.METRIC_ASPNETCORE_IDENTITY_USER_UPDATE_DURATION = "aspnetcore.identity.user.update.duration";
    exports.METRIC_ASPNETCORE_IDENTITY_USER_VERIFY_TOKEN_ATTEMPTS = "aspnetcore.identity.user.verify_token_attempts";
    exports.METRIC_ASPNETCORE_MEMORY_POOL_ALLOCATED = "aspnetcore.memory_pool.allocated";
    exports.METRIC_ASPNETCORE_MEMORY_POOL_EVICTED = "aspnetcore.memory_pool.evicted";
    exports.METRIC_ASPNETCORE_MEMORY_POOL_POOLED = "aspnetcore.memory_pool.pooled";
    exports.METRIC_ASPNETCORE_MEMORY_POOL_RENTED = "aspnetcore.memory_pool.rented";
    exports.METRIC_AZURE_COSMOSDB_CLIENT_ACTIVE_INSTANCE_COUNT = "azure.cosmosdb.client.active_instance.count";
    exports.METRIC_AZURE_COSMOSDB_CLIENT_OPERATION_REQUEST_CHARGE = "azure.cosmosdb.client.operation.request_charge";
    exports.METRIC_CICD_PIPELINE_RUN_ACTIVE = "cicd.pipeline.run.active";
    exports.METRIC_CICD_PIPELINE_RUN_DURATION = "cicd.pipeline.run.duration";
    exports.METRIC_CICD_PIPELINE_RUN_ERRORS = "cicd.pipeline.run.errors";
    exports.METRIC_CICD_SYSTEM_ERRORS = "cicd.system.errors";
    exports.METRIC_CICD_WORKER_COUNT = "cicd.worker.count";
    exports.METRIC_CONTAINER_CPU_TIME = "container.cpu.time";
    exports.METRIC_CONTAINER_CPU_USAGE = "container.cpu.usage";
    exports.METRIC_CONTAINER_DISK_IO = "container.disk.io";
    exports.METRIC_CONTAINER_FILESYSTEM_AVAILABLE = "container.filesystem.available";
    exports.METRIC_CONTAINER_FILESYSTEM_CAPACITY = "container.filesystem.capacity";
    exports.METRIC_CONTAINER_FILESYSTEM_USAGE = "container.filesystem.usage";
    exports.METRIC_CONTAINER_MEMORY_AVAILABLE = "container.memory.available";
    exports.METRIC_CONTAINER_MEMORY_PAGING_FAULTS = "container.memory.paging.faults";
    exports.METRIC_CONTAINER_MEMORY_RSS = "container.memory.rss";
    exports.METRIC_CONTAINER_MEMORY_USAGE = "container.memory.usage";
    exports.METRIC_CONTAINER_MEMORY_WORKING_SET = "container.memory.working_set";
    exports.METRIC_CONTAINER_NETWORK_IO = "container.network.io";
    exports.METRIC_CONTAINER_UPTIME = "container.uptime";
    exports.METRIC_CPU_FREQUENCY = "cpu.frequency";
    exports.METRIC_CPU_TIME = "cpu.time";
    exports.METRIC_CPU_UTILIZATION = "cpu.utilization";
    exports.METRIC_CPYTHON_GC_COLLECTED_OBJECTS = "cpython.gc.collected_objects";
    exports.METRIC_CPYTHON_GC_COLLECTIONS = "cpython.gc.collections";
    exports.METRIC_CPYTHON_GC_UNCOLLECTABLE_OBJECTS = "cpython.gc.uncollectable_objects";
    exports.METRIC_DB_CLIENT_CONNECTION_COUNT = "db.client.connection.count";
    exports.METRIC_DB_CLIENT_CONNECTION_CREATE_TIME = "db.client.connection.create_time";
    exports.METRIC_DB_CLIENT_CONNECTION_IDLE_MAX = "db.client.connection.idle.max";
    exports.METRIC_DB_CLIENT_CONNECTION_IDLE_MIN = "db.client.connection.idle.min";
    exports.METRIC_DB_CLIENT_CONNECTION_MAX = "db.client.connection.max";
    exports.METRIC_DB_CLIENT_CONNECTION_PENDING_REQUESTS = "db.client.connection.pending_requests";
    exports.METRIC_DB_CLIENT_CONNECTION_TIMEOUTS = "db.client.connection.timeouts";
    exports.METRIC_DB_CLIENT_CONNECTION_USE_TIME = "db.client.connection.use_time";
    exports.METRIC_DB_CLIENT_CONNECTION_WAIT_TIME = "db.client.connection.wait_time";
    exports.METRIC_DB_CLIENT_CONNECTIONS_CREATE_TIME = "db.client.connections.create_time";
    exports.METRIC_DB_CLIENT_CONNECTIONS_IDLE_MAX = "db.client.connections.idle.max";
    exports.METRIC_DB_CLIENT_CONNECTIONS_IDLE_MIN = "db.client.connections.idle.min";
    exports.METRIC_DB_CLIENT_CONNECTIONS_MAX = "db.client.connections.max";
    exports.METRIC_DB_CLIENT_CONNECTIONS_PENDING_REQUESTS = "db.client.connections.pending_requests";
    exports.METRIC_DB_CLIENT_CONNECTIONS_TIMEOUTS = "db.client.connections.timeouts";
    exports.METRIC_DB_CLIENT_CONNECTIONS_USAGE = "db.client.connections.usage";
    exports.METRIC_DB_CLIENT_CONNECTIONS_USE_TIME = "db.client.connections.use_time";
    exports.METRIC_DB_CLIENT_CONNECTIONS_WAIT_TIME = "db.client.connections.wait_time";
    exports.METRIC_DB_CLIENT_COSMOSDB_ACTIVE_INSTANCE_COUNT = "db.client.cosmosdb.active_instance.count";
    exports.METRIC_DB_CLIENT_COSMOSDB_OPERATION_REQUEST_CHARGE = "db.client.cosmosdb.operation.request_charge";
    exports.METRIC_DB_CLIENT_RESPONSE_RETURNED_ROWS = "db.client.response.returned_rows";
    exports.METRIC_DNS_LOOKUP_DURATION = "dns.lookup.duration";
    exports.METRIC_FAAS_COLDSTARTS = "faas.coldstarts";
    exports.METRIC_FAAS_CPU_USAGE = "faas.cpu_usage";
    exports.METRIC_FAAS_ERRORS = "faas.errors";
    exports.METRIC_FAAS_INIT_DURATION = "faas.init_duration";
    exports.METRIC_FAAS_INVOCATIONS = "faas.invocations";
    exports.METRIC_FAAS_INVOKE_DURATION = "faas.invoke_duration";
    exports.METRIC_FAAS_MEM_USAGE = "faas.mem_usage";
    exports.METRIC_FAAS_NET_IO = "faas.net_io";
    exports.METRIC_FAAS_TIMEOUTS = "faas.timeouts";
    exports.METRIC_GEN_AI_CLIENT_OPERATION_DURATION = "gen_ai.client.operation.duration";
    exports.METRIC_GEN_AI_CLIENT_TOKEN_USAGE = "gen_ai.client.token.usage";
    exports.METRIC_GEN_AI_SERVER_REQUEST_DURATION = "gen_ai.server.request.duration";
    exports.METRIC_GEN_AI_SERVER_TIME_PER_OUTPUT_TOKEN = "gen_ai.server.time_per_output_token";
    exports.METRIC_GEN_AI_SERVER_TIME_TO_FIRST_TOKEN = "gen_ai.server.time_to_first_token";
    exports.METRIC_GO_CONFIG_GOGC = "go.config.gogc";
    exports.METRIC_GO_GOROUTINE_COUNT = "go.goroutine.count";
    exports.METRIC_GO_MEMORY_ALLOCATED = "go.memory.allocated";
    exports.METRIC_GO_MEMORY_ALLOCATIONS = "go.memory.allocations";
    exports.METRIC_GO_MEMORY_GC_GOAL = "go.memory.gc.goal";
    exports.METRIC_GO_MEMORY_LIMIT = "go.memory.limit";
    exports.METRIC_GO_MEMORY_USED = "go.memory.used";
    exports.METRIC_GO_PROCESSOR_LIMIT = "go.processor.limit";
    exports.METRIC_GO_SCHEDULE_DURATION = "go.schedule.duration";
    exports.METRIC_HTTP_CLIENT_ACTIVE_REQUESTS = "http.client.active_requests";
    exports.METRIC_HTTP_CLIENT_CONNECTION_DURATION = "http.client.connection.duration";
    exports.METRIC_HTTP_CLIENT_OPEN_CONNECTIONS = "http.client.open_connections";
    exports.METRIC_HTTP_CLIENT_REQUEST_BODY_SIZE = "http.client.request.body.size";
    exports.METRIC_HTTP_CLIENT_RESPONSE_BODY_SIZE = "http.client.response.body.size";
    exports.METRIC_HTTP_SERVER_ACTIVE_REQUESTS = "http.server.active_requests";
    exports.METRIC_HTTP_SERVER_REQUEST_BODY_SIZE = "http.server.request.body.size";
    exports.METRIC_HTTP_SERVER_RESPONSE_BODY_SIZE = "http.server.response.body.size";
    exports.METRIC_HW_BATTERY_CHARGE = "hw.battery.charge";
    exports.METRIC_HW_BATTERY_CHARGE_LIMIT = "hw.battery.charge.limit";
    exports.METRIC_HW_BATTERY_TIME_LEFT = "hw.battery.time_left";
    exports.METRIC_HW_CPU_SPEED = "hw.cpu.speed";
    exports.METRIC_HW_CPU_SPEED_LIMIT = "hw.cpu.speed.limit";
    exports.METRIC_HW_ENERGY = "hw.energy";
    exports.METRIC_HW_ERRORS = "hw.errors";
    exports.METRIC_HW_FAN_SPEED = "hw.fan.speed";
    exports.METRIC_HW_FAN_SPEED_LIMIT = "hw.fan.speed.limit";
    exports.METRIC_HW_FAN_SPEED_RATIO = "hw.fan.speed_ratio";
    exports.METRIC_HW_GPU_IO = "hw.gpu.io";
    exports.METRIC_HW_GPU_MEMORY_LIMIT = "hw.gpu.memory.limit";
    exports.METRIC_HW_GPU_MEMORY_USAGE = "hw.gpu.memory.usage";
    exports.METRIC_HW_GPU_MEMORY_UTILIZATION = "hw.gpu.memory.utilization";
    exports.METRIC_HW_GPU_UTILIZATION = "hw.gpu.utilization";
    exports.METRIC_HW_HOST_AMBIENT_TEMPERATURE = "hw.host.ambient_temperature";
    exports.METRIC_HW_HOST_ENERGY = "hw.host.energy";
    exports.METRIC_HW_HOST_HEATING_MARGIN = "hw.host.heating_margin";
    exports.METRIC_HW_HOST_POWER = "hw.host.power";
    exports.METRIC_HW_LOGICAL_DISK_LIMIT = "hw.logical_disk.limit";
    exports.METRIC_HW_LOGICAL_DISK_USAGE = "hw.logical_disk.usage";
    exports.METRIC_HW_LOGICAL_DISK_UTILIZATION = "hw.logical_disk.utilization";
    exports.METRIC_HW_MEMORY_SIZE = "hw.memory.size";
    exports.METRIC_HW_NETWORK_BANDWIDTH_LIMIT = "hw.network.bandwidth.limit";
    exports.METRIC_HW_NETWORK_BANDWIDTH_UTILIZATION = "hw.network.bandwidth.utilization";
    exports.METRIC_HW_NETWORK_IO = "hw.network.io";
    exports.METRIC_HW_NETWORK_PACKETS = "hw.network.packets";
    exports.METRIC_HW_NETWORK_UP = "hw.network.up";
    exports.METRIC_HW_PHYSICAL_DISK_ENDURANCE_UTILIZATION = "hw.physical_disk.endurance_utilization";
    exports.METRIC_HW_PHYSICAL_DISK_SIZE = "hw.physical_disk.size";
    exports.METRIC_HW_PHYSICAL_DISK_SMART = "hw.physical_disk.smart";
    exports.METRIC_HW_POWER = "hw.power";
    exports.METRIC_HW_POWER_SUPPLY_LIMIT = "hw.power_supply.limit";
    exports.METRIC_HW_POWER_SUPPLY_USAGE = "hw.power_supply.usage";
    exports.METRIC_HW_POWER_SUPPLY_UTILIZATION = "hw.power_supply.utilization";
    exports.METRIC_HW_STATUS = "hw.status";
    exports.METRIC_HW_TAPE_DRIVE_OPERATIONS = "hw.tape_drive.operations";
    exports.METRIC_HW_TEMPERATURE = "hw.temperature";
    exports.METRIC_HW_TEMPERATURE_LIMIT = "hw.temperature.limit";
    exports.METRIC_HW_VOLTAGE = "hw.voltage";
    exports.METRIC_HW_VOLTAGE_LIMIT = "hw.voltage.limit";
    exports.METRIC_HW_VOLTAGE_NOMINAL = "hw.voltage.nominal";
    exports.METRIC_JVM_BUFFER_COUNT = "jvm.buffer.count";
    exports.METRIC_JVM_BUFFER_MEMORY_LIMIT = "jvm.buffer.memory.limit";
    exports.METRIC_JVM_BUFFER_MEMORY_USAGE = "jvm.buffer.memory.usage";
    exports.METRIC_JVM_BUFFER_MEMORY_USED = "jvm.buffer.memory.used";
    exports.METRIC_JVM_FILE_DESCRIPTOR_COUNT = "jvm.file_descriptor.count";
    exports.METRIC_JVM_MEMORY_INIT = "jvm.memory.init";
    exports.METRIC_JVM_SYSTEM_CPU_LOAD_1M = "jvm.system.cpu.load_1m";
    exports.METRIC_JVM_SYSTEM_CPU_UTILIZATION = "jvm.system.cpu.utilization";
    exports.METRIC_K8S_CONTAINER_CPU_LIMIT = "k8s.container.cpu.limit";
    exports.METRIC_K8S_CONTAINER_CPU_LIMIT_UTILIZATION = "k8s.container.cpu.limit_utilization";
    exports.METRIC_K8S_CONTAINER_CPU_REQUEST = "k8s.container.cpu.request";
    exports.METRIC_K8S_CONTAINER_CPU_REQUEST_UTILIZATION = "k8s.container.cpu.request_utilization";
    exports.METRIC_K8S_CONTAINER_EPHEMERAL_STORAGE_LIMIT = "k8s.container.ephemeral_storage.limit";
    exports.METRIC_K8S_CONTAINER_EPHEMERAL_STORAGE_REQUEST = "k8s.container.ephemeral_storage.request";
    exports.METRIC_K8S_CONTAINER_MEMORY_LIMIT = "k8s.container.memory.limit";
    exports.METRIC_K8S_CONTAINER_MEMORY_REQUEST = "k8s.container.memory.request";
    exports.METRIC_K8S_CONTAINER_READY = "k8s.container.ready";
    exports.METRIC_K8S_CONTAINER_RESTART_COUNT = "k8s.container.restart.count";
    exports.METRIC_K8S_CONTAINER_STATUS_REASON = "k8s.container.status.reason";
    exports.METRIC_K8S_CONTAINER_STATUS_STATE = "k8s.container.status.state";
    exports.METRIC_K8S_CONTAINER_STORAGE_LIMIT = "k8s.container.storage.limit";
    exports.METRIC_K8S_CONTAINER_STORAGE_REQUEST = "k8s.container.storage.request";
    exports.METRIC_K8S_CRONJOB_ACTIVE_JOBS = "k8s.cronjob.active_jobs";
    exports.METRIC_K8S_CRONJOB_JOB_ACTIVE = "k8s.cronjob.job.active";
    exports.METRIC_K8S_DAEMONSET_CURRENT_SCHEDULED_NODES = "k8s.daemonset.current_scheduled_nodes";
    exports.METRIC_K8S_DAEMONSET_DESIRED_SCHEDULED_NODES = "k8s.daemonset.desired_scheduled_nodes";
    exports.METRIC_K8S_DAEMONSET_MISSCHEDULED_NODES = "k8s.daemonset.misscheduled_nodes";
    exports.METRIC_K8S_DAEMONSET_NODE_CURRENT_SCHEDULED = "k8s.daemonset.node.current_scheduled";
    exports.METRIC_K8S_DAEMONSET_NODE_DESIRED_SCHEDULED = "k8s.daemonset.node.desired_scheduled";
    exports.METRIC_K8S_DAEMONSET_NODE_MISSCHEDULED = "k8s.daemonset.node.misscheduled";
    exports.METRIC_K8S_DAEMONSET_NODE_READY = "k8s.daemonset.node.ready";
    exports.METRIC_K8S_DAEMONSET_READY_NODES = "k8s.daemonset.ready_nodes";
    exports.METRIC_K8S_DEPLOYMENT_AVAILABLE_PODS = "k8s.deployment.available_pods";
    exports.METRIC_K8S_DEPLOYMENT_DESIRED_PODS = "k8s.deployment.desired_pods";
    exports.METRIC_K8S_DEPLOYMENT_POD_AVAILABLE = "k8s.deployment.pod.available";
    exports.METRIC_K8S_DEPLOYMENT_POD_DESIRED = "k8s.deployment.pod.desired";
    exports.METRIC_K8S_HPA_CURRENT_PODS = "k8s.hpa.current_pods";
    exports.METRIC_K8S_HPA_DESIRED_PODS = "k8s.hpa.desired_pods";
    exports.METRIC_K8S_HPA_MAX_PODS = "k8s.hpa.max_pods";
    exports.METRIC_K8S_HPA_METRIC_TARGET_CPU_AVERAGE_UTILIZATION = "k8s.hpa.metric.target.cpu.average_utilization";
    exports.METRIC_K8S_HPA_METRIC_TARGET_CPU_AVERAGE_VALUE = "k8s.hpa.metric.target.cpu.average_value";
    exports.METRIC_K8S_HPA_METRIC_TARGET_CPU_VALUE = "k8s.hpa.metric.target.cpu.value";
    exports.METRIC_K8S_HPA_MIN_PODS = "k8s.hpa.min_pods";
    exports.METRIC_K8S_HPA_POD_CURRENT = "k8s.hpa.pod.current";
    exports.METRIC_K8S_HPA_POD_DESIRED = "k8s.hpa.pod.desired";
    exports.METRIC_K8S_HPA_POD_MAX = "k8s.hpa.pod.max";
    exports.METRIC_K8S_HPA_POD_MIN = "k8s.hpa.pod.min";
    exports.METRIC_K8S_JOB_ACTIVE_PODS = "k8s.job.active_pods";
    exports.METRIC_K8S_JOB_DESIRED_SUCCESSFUL_PODS = "k8s.job.desired_successful_pods";
    exports.METRIC_K8S_JOB_FAILED_PODS = "k8s.job.failed_pods";
    exports.METRIC_K8S_JOB_MAX_PARALLEL_PODS = "k8s.job.max_parallel_pods";
    exports.METRIC_K8S_JOB_POD_ACTIVE = "k8s.job.pod.active";
    exports.METRIC_K8S_JOB_POD_DESIRED_SUCCESSFUL = "k8s.job.pod.desired_successful";
    exports.METRIC_K8S_JOB_POD_FAILED = "k8s.job.pod.failed";
    exports.METRIC_K8S_JOB_POD_MAX_PARALLEL = "k8s.job.pod.max_parallel";
    exports.METRIC_K8S_JOB_POD_SUCCESSFUL = "k8s.job.pod.successful";
    exports.METRIC_K8S_JOB_SUCCESSFUL_PODS = "k8s.job.successful_pods";
    exports.METRIC_K8S_NAMESPACE_PHASE = "k8s.namespace.phase";
    exports.METRIC_K8S_NODE_ALLOCATABLE_CPU = "k8s.node.allocatable.cpu";
    exports.METRIC_K8S_NODE_ALLOCATABLE_EPHEMERAL_STORAGE = "k8s.node.allocatable.ephemeral_storage";
    exports.METRIC_K8S_NODE_ALLOCATABLE_MEMORY = "k8s.node.allocatable.memory";
    exports.METRIC_K8S_NODE_ALLOCATABLE_PODS = "k8s.node.allocatable.pods";
    exports.METRIC_K8S_NODE_CONDITION_STATUS = "k8s.node.condition.status";
    exports.METRIC_K8S_NODE_CPU_ALLOCATABLE = "k8s.node.cpu.allocatable";
    exports.METRIC_K8S_NODE_CPU_TIME = "k8s.node.cpu.time";
    exports.METRIC_K8S_NODE_CPU_USAGE = "k8s.node.cpu.usage";
    exports.METRIC_K8S_NODE_EPHEMERAL_STORAGE_ALLOCATABLE = "k8s.node.ephemeral_storage.allocatable";
    exports.METRIC_K8S_NODE_FILESYSTEM_AVAILABLE = "k8s.node.filesystem.available";
    exports.METRIC_K8S_NODE_FILESYSTEM_CAPACITY = "k8s.node.filesystem.capacity";
    exports.METRIC_K8S_NODE_FILESYSTEM_USAGE = "k8s.node.filesystem.usage";
    exports.METRIC_K8S_NODE_MEMORY_ALLOCATABLE = "k8s.node.memory.allocatable";
    exports.METRIC_K8S_NODE_MEMORY_AVAILABLE = "k8s.node.memory.available";
    exports.METRIC_K8S_NODE_MEMORY_PAGING_FAULTS = "k8s.node.memory.paging.faults";
    exports.METRIC_K8S_NODE_MEMORY_RSS = "k8s.node.memory.rss";
    exports.METRIC_K8S_NODE_MEMORY_USAGE = "k8s.node.memory.usage";
    exports.METRIC_K8S_NODE_MEMORY_WORKING_SET = "k8s.node.memory.working_set";
    exports.METRIC_K8S_NODE_NETWORK_ERRORS = "k8s.node.network.errors";
    exports.METRIC_K8S_NODE_NETWORK_IO = "k8s.node.network.io";
    exports.METRIC_K8S_NODE_POD_ALLOCATABLE = "k8s.node.pod.allocatable";
    exports.METRIC_K8S_NODE_UPTIME = "k8s.node.uptime";
    exports.METRIC_K8S_POD_CPU_TIME = "k8s.pod.cpu.time";
    exports.METRIC_K8S_POD_CPU_USAGE = "k8s.pod.cpu.usage";
    exports.METRIC_K8S_POD_FILESYSTEM_AVAILABLE = "k8s.pod.filesystem.available";
    exports.METRIC_K8S_POD_FILESYSTEM_CAPACITY = "k8s.pod.filesystem.capacity";
    exports.METRIC_K8S_POD_FILESYSTEM_USAGE = "k8s.pod.filesystem.usage";
    exports.METRIC_K8S_POD_MEMORY_AVAILABLE = "k8s.pod.memory.available";
    exports.METRIC_K8S_POD_MEMORY_PAGING_FAULTS = "k8s.pod.memory.paging.faults";
    exports.METRIC_K8S_POD_MEMORY_RSS = "k8s.pod.memory.rss";
    exports.METRIC_K8S_POD_MEMORY_USAGE = "k8s.pod.memory.usage";
    exports.METRIC_K8S_POD_MEMORY_WORKING_SET = "k8s.pod.memory.working_set";
    exports.METRIC_K8S_POD_NETWORK_ERRORS = "k8s.pod.network.errors";
    exports.METRIC_K8S_POD_NETWORK_IO = "k8s.pod.network.io";
    exports.METRIC_K8S_POD_STATUS_PHASE = "k8s.pod.status.phase";
    exports.METRIC_K8S_POD_STATUS_REASON = "k8s.pod.status.reason";
    exports.METRIC_K8S_POD_UPTIME = "k8s.pod.uptime";
    exports.METRIC_K8S_POD_VOLUME_AVAILABLE = "k8s.pod.volume.available";
    exports.METRIC_K8S_POD_VOLUME_CAPACITY = "k8s.pod.volume.capacity";
    exports.METRIC_K8S_POD_VOLUME_INODE_COUNT = "k8s.pod.volume.inode.count";
    exports.METRIC_K8S_POD_VOLUME_INODE_FREE = "k8s.pod.volume.inode.free";
    exports.METRIC_K8S_POD_VOLUME_INODE_USED = "k8s.pod.volume.inode.used";
    exports.METRIC_K8S_POD_VOLUME_USAGE = "k8s.pod.volume.usage";
    exports.METRIC_K8S_REPLICASET_AVAILABLE_PODS = "k8s.replicaset.available_pods";
    exports.METRIC_K8S_REPLICASET_DESIRED_PODS = "k8s.replicaset.desired_pods";
    exports.METRIC_K8S_REPLICASET_POD_AVAILABLE = "k8s.replicaset.pod.available";
    exports.METRIC_K8S_REPLICASET_POD_DESIRED = "k8s.replicaset.pod.desired";
    exports.METRIC_K8S_REPLICATION_CONTROLLER_AVAILABLE_PODS = "k8s.replication_controller.available_pods";
    exports.METRIC_K8S_REPLICATION_CONTROLLER_DESIRED_PODS = "k8s.replication_controller.desired_pods";
    exports.METRIC_K8S_REPLICATIONCONTROLLER_AVAILABLE_PODS = "k8s.replicationcontroller.available_pods";
    exports.METRIC_K8S_REPLICATIONCONTROLLER_DESIRED_PODS = "k8s.replicationcontroller.desired_pods";
    exports.METRIC_K8S_REPLICATIONCONTROLLER_POD_AVAILABLE = "k8s.replicationcontroller.pod.available";
    exports.METRIC_K8S_REPLICATIONCONTROLLER_POD_DESIRED = "k8s.replicationcontroller.pod.desired";
    exports.METRIC_K8S_RESOURCEQUOTA_CPU_LIMIT_HARD = "k8s.resourcequota.cpu.limit.hard";
    exports.METRIC_K8S_RESOURCEQUOTA_CPU_LIMIT_USED = "k8s.resourcequota.cpu.limit.used";
    exports.METRIC_K8S_RESOURCEQUOTA_CPU_REQUEST_HARD = "k8s.resourcequota.cpu.request.hard";
    exports.METRIC_K8S_RESOURCEQUOTA_CPU_REQUEST_USED = "k8s.resourcequota.cpu.request.used";
    exports.METRIC_K8S_RESOURCEQUOTA_EPHEMERAL_STORAGE_LIMIT_HARD = "k8s.resourcequota.ephemeral_storage.limit.hard";
    exports.METRIC_K8S_RESOURCEQUOTA_EPHEMERAL_STORAGE_LIMIT_USED = "k8s.resourcequota.ephemeral_storage.limit.used";
    exports.METRIC_K8S_RESOURCEQUOTA_EPHEMERAL_STORAGE_REQUEST_HARD = "k8s.resourcequota.ephemeral_storage.request.hard";
    exports.METRIC_K8S_RESOURCEQUOTA_EPHEMERAL_STORAGE_REQUEST_USED = "k8s.resourcequota.ephemeral_storage.request.used";
    exports.METRIC_K8S_RESOURCEQUOTA_HUGEPAGE_COUNT_REQUEST_HARD = "k8s.resourcequota.hugepage_count.request.hard";
    exports.METRIC_K8S_RESOURCEQUOTA_HUGEPAGE_COUNT_REQUEST_USED = "k8s.resourcequota.hugepage_count.request.used";
    exports.METRIC_K8S_RESOURCEQUOTA_MEMORY_LIMIT_HARD = "k8s.resourcequota.memory.limit.hard";
    exports.METRIC_K8S_RESOURCEQUOTA_MEMORY_LIMIT_USED = "k8s.resourcequota.memory.limit.used";
    exports.METRIC_K8S_RESOURCEQUOTA_MEMORY_REQUEST_HARD = "k8s.resourcequota.memory.request.hard";
    exports.METRIC_K8S_RESOURCEQUOTA_MEMORY_REQUEST_USED = "k8s.resourcequota.memory.request.used";
    exports.METRIC_K8S_RESOURCEQUOTA_OBJECT_COUNT_HARD = "k8s.resourcequota.object_count.hard";
    exports.METRIC_K8S_RESOURCEQUOTA_OBJECT_COUNT_USED = "k8s.resourcequota.object_count.used";
    exports.METRIC_K8S_RESOURCEQUOTA_PERSISTENTVOLUMECLAIM_COUNT_HARD = "k8s.resourcequota.persistentvolumeclaim_count.hard";
    exports.METRIC_K8S_RESOURCEQUOTA_PERSISTENTVOLUMECLAIM_COUNT_USED = "k8s.resourcequota.persistentvolumeclaim_count.used";
    exports.METRIC_K8S_RESOURCEQUOTA_STORAGE_REQUEST_HARD = "k8s.resourcequota.storage.request.hard";
    exports.METRIC_K8S_RESOURCEQUOTA_STORAGE_REQUEST_USED = "k8s.resourcequota.storage.request.used";
    exports.METRIC_K8S_STATEFULSET_CURRENT_PODS = "k8s.statefulset.current_pods";
    exports.METRIC_K8S_STATEFULSET_DESIRED_PODS = "k8s.statefulset.desired_pods";
    exports.METRIC_K8S_STATEFULSET_POD_CURRENT = "k8s.statefulset.pod.current";
    exports.METRIC_K8S_STATEFULSET_POD_DESIRED = "k8s.statefulset.pod.desired";
    exports.METRIC_K8S_STATEFULSET_POD_READY = "k8s.statefulset.pod.ready";
    exports.METRIC_K8S_STATEFULSET_POD_UPDATED = "k8s.statefulset.pod.updated";
    exports.METRIC_K8S_STATEFULSET_READY_PODS = "k8s.statefulset.ready_pods";
    exports.METRIC_K8S_STATEFULSET_UPDATED_PODS = "k8s.statefulset.updated_pods";
    exports.METRIC_MCP_CLIENT_OPERATION_DURATION = "mcp.client.operation.duration";
    exports.METRIC_MCP_CLIENT_SESSION_DURATION = "mcp.client.session.duration";
    exports.METRIC_MCP_SERVER_OPERATION_DURATION = "mcp.server.operation.duration";
    exports.METRIC_MCP_SERVER_SESSION_DURATION = "mcp.server.session.duration";
    exports.METRIC_MESSAGING_CLIENT_CONSUMED_MESSAGES = "messaging.client.consumed.messages";
    exports.METRIC_MESSAGING_CLIENT_OPERATION_DURATION = "messaging.client.operation.duration";
    exports.METRIC_MESSAGING_CLIENT_PUBLISHED_MESSAGES = "messaging.client.published.messages";
    exports.METRIC_MESSAGING_CLIENT_SENT_MESSAGES = "messaging.client.sent.messages";
    exports.METRIC_MESSAGING_PROCESS_DURATION = "messaging.process.duration";
    exports.METRIC_MESSAGING_PROCESS_MESSAGES = "messaging.process.messages";
    exports.METRIC_MESSAGING_PUBLISH_DURATION = "messaging.publish.duration";
    exports.METRIC_MESSAGING_PUBLISH_MESSAGES = "messaging.publish.messages";
    exports.METRIC_MESSAGING_RECEIVE_DURATION = "messaging.receive.duration";
    exports.METRIC_MESSAGING_RECEIVE_MESSAGES = "messaging.receive.messages";
    exports.METRIC_NFS_CLIENT_NET_COUNT = "nfs.client.net.count";
    exports.METRIC_NFS_CLIENT_NET_TCP_CONNECTION_ACCEPTED = "nfs.client.net.tcp.connection.accepted";
    exports.METRIC_NFS_CLIENT_OPERATION_COUNT = "nfs.client.operation.count";
    exports.METRIC_NFS_CLIENT_PROCEDURE_COUNT = "nfs.client.procedure.count";
    exports.METRIC_NFS_CLIENT_RPC_AUTHREFRESH_COUNT = "nfs.client.rpc.authrefresh.count";
    exports.METRIC_NFS_CLIENT_RPC_COUNT = "nfs.client.rpc.count";
    exports.METRIC_NFS_CLIENT_RPC_RETRANSMIT_COUNT = "nfs.client.rpc.retransmit.count";
    exports.METRIC_NFS_SERVER_FH_STALE_COUNT = "nfs.server.fh.stale.count";
    exports.METRIC_NFS_SERVER_IO = "nfs.server.io";
    exports.METRIC_NFS_SERVER_NET_COUNT = "nfs.server.net.count";
    exports.METRIC_NFS_SERVER_NET_TCP_CONNECTION_ACCEPTED = "nfs.server.net.tcp.connection.accepted";
    exports.METRIC_NFS_SERVER_OPERATION_COUNT = "nfs.server.operation.count";
    exports.METRIC_NFS_SERVER_PROCEDURE_COUNT = "nfs.server.procedure.count";
    exports.METRIC_NFS_SERVER_REPCACHE_REQUESTS = "nfs.server.repcache.requests";
    exports.METRIC_NFS_SERVER_RPC_COUNT = "nfs.server.rpc.count";
    exports.METRIC_NFS_SERVER_THREAD_COUNT = "nfs.server.thread.count";
    exports.METRIC_NODEJS_EVENTLOOP_DELAY_MAX = "nodejs.eventloop.delay.max";
    exports.METRIC_NODEJS_EVENTLOOP_DELAY_MEAN = "nodejs.eventloop.delay.mean";
    exports.METRIC_NODEJS_EVENTLOOP_DELAY_MIN = "nodejs.eventloop.delay.min";
    exports.METRIC_NODEJS_EVENTLOOP_DELAY_P50 = "nodejs.eventloop.delay.p50";
    exports.METRIC_NODEJS_EVENTLOOP_DELAY_P90 = "nodejs.eventloop.delay.p90";
    exports.METRIC_NODEJS_EVENTLOOP_DELAY_P99 = "nodejs.eventloop.delay.p99";
    exports.METRIC_NODEJS_EVENTLOOP_DELAY_STDDEV = "nodejs.eventloop.delay.stddev";
    exports.METRIC_NODEJS_EVENTLOOP_TIME = "nodejs.eventloop.time";
    exports.METRIC_NODEJS_EVENTLOOP_UTILIZATION = "nodejs.eventloop.utilization";
    exports.METRIC_OPENSHIFT_CLUSTERQUOTA_CPU_LIMIT_HARD = "openshift.clusterquota.cpu.limit.hard";
    exports.METRIC_OPENSHIFT_CLUSTERQUOTA_CPU_LIMIT_USED = "openshift.clusterquota.cpu.limit.used";
    exports.METRIC_OPENSHIFT_CLUSTERQUOTA_CPU_REQUEST_HARD = "openshift.clusterquota.cpu.request.hard";
    exports.METRIC_OPENSHIFT_CLUSTERQUOTA_CPU_REQUEST_USED = "openshift.clusterquota.cpu.request.used";
    exports.METRIC_OPENSHIFT_CLUSTERQUOTA_EPHEMERAL_STORAGE_LIMIT_HARD = "openshift.clusterquota.ephemeral_storage.limit.hard";
    exports.METRIC_OPENSHIFT_CLUSTERQUOTA_EPHEMERAL_STORAGE_LIMIT_USED = "openshift.clusterquota.ephemeral_storage.limit.used";
    exports.METRIC_OPENSHIFT_CLUSTERQUOTA_EPHEMERAL_STORAGE_REQUEST_HARD = "openshift.clusterquota.ephemeral_storage.request.hard";
    exports.METRIC_OPENSHIFT_CLUSTERQUOTA_EPHEMERAL_STORAGE_REQUEST_USED = "openshift.clusterquota.ephemeral_storage.request.used";
    exports.METRIC_OPENSHIFT_CLUSTERQUOTA_HUGEPAGE_COUNT_REQUEST_HARD = "openshift.clusterquota.hugepage_count.request.hard";
    exports.METRIC_OPENSHIFT_CLUSTERQUOTA_HUGEPAGE_COUNT_REQUEST_USED = "openshift.clusterquota.hugepage_count.request.used";
    exports.METRIC_OPENSHIFT_CLUSTERQUOTA_MEMORY_LIMIT_HARD = "openshift.clusterquota.memory.limit.hard";
    exports.METRIC_OPENSHIFT_CLUSTERQUOTA_MEMORY_LIMIT_USED = "openshift.clusterquota.memory.limit.used";
    exports.METRIC_OPENSHIFT_CLUSTERQUOTA_MEMORY_REQUEST_HARD = "openshift.clusterquota.memory.request.hard";
    exports.METRIC_OPENSHIFT_CLUSTERQUOTA_MEMORY_REQUEST_USED = "openshift.clusterquota.memory.request.used";
    exports.METRIC_OPENSHIFT_CLUSTERQUOTA_OBJECT_COUNT_HARD = "openshift.clusterquota.object_count.hard";
    exports.METRIC_OPENSHIFT_CLUSTERQUOTA_OBJECT_COUNT_USED = "openshift.clusterquota.object_count.used";
    exports.METRIC_OPENSHIFT_CLUSTERQUOTA_PERSISTENTVOLUMECLAIM_COUNT_HARD = "openshift.clusterquota.persistentvolumeclaim_count.hard";
    exports.METRIC_OPENSHIFT_CLUSTERQUOTA_PERSISTENTVOLUMECLAIM_COUNT_USED = "openshift.clusterquota.persistentvolumeclaim_count.used";
    exports.METRIC_OPENSHIFT_CLUSTERQUOTA_STORAGE_REQUEST_HARD = "openshift.clusterquota.storage.request.hard";
    exports.METRIC_OPENSHIFT_CLUSTERQUOTA_STORAGE_REQUEST_USED = "openshift.clusterquota.storage.request.used";
    exports.METRIC_OTEL_SDK_EXPORTER_LOG_EXPORTED = "otel.sdk.exporter.log.exported";
    exports.METRIC_OTEL_SDK_EXPORTER_LOG_INFLIGHT = "otel.sdk.exporter.log.inflight";
    exports.METRIC_OTEL_SDK_EXPORTER_METRIC_DATA_POINT_EXPORTED = "otel.sdk.exporter.metric_data_point.exported";
    exports.METRIC_OTEL_SDK_EXPORTER_METRIC_DATA_POINT_INFLIGHT = "otel.sdk.exporter.metric_data_point.inflight";
    exports.METRIC_OTEL_SDK_EXPORTER_OPERATION_DURATION = "otel.sdk.exporter.operation.duration";
    exports.METRIC_OTEL_SDK_EXPORTER_SPAN_EXPORTED = "otel.sdk.exporter.span.exported";
    exports.METRIC_OTEL_SDK_EXPORTER_SPAN_EXPORTED_COUNT = "otel.sdk.exporter.span.exported.count";
    exports.METRIC_OTEL_SDK_EXPORTER_SPAN_INFLIGHT = "otel.sdk.exporter.span.inflight";
    exports.METRIC_OTEL_SDK_EXPORTER_SPAN_INFLIGHT_COUNT = "otel.sdk.exporter.span.inflight.count";
    exports.METRIC_OTEL_SDK_LOG_CREATED = "otel.sdk.log.created";
    exports.METRIC_OTEL_SDK_METRIC_READER_COLLECTION_DURATION = "otel.sdk.metric_reader.collection.duration";
    exports.METRIC_OTEL_SDK_PROCESSOR_LOG_PROCESSED = "otel.sdk.processor.log.processed";
    exports.METRIC_OTEL_SDK_PROCESSOR_LOG_QUEUE_CAPACITY = "otel.sdk.processor.log.queue.capacity";
    exports.METRIC_OTEL_SDK_PROCESSOR_LOG_QUEUE_SIZE = "otel.sdk.processor.log.queue.size";
    exports.METRIC_OTEL_SDK_PROCESSOR_SPAN_PROCESSED = "otel.sdk.processor.span.processed";
    exports.METRIC_OTEL_SDK_PROCESSOR_SPAN_PROCESSED_COUNT = "otel.sdk.processor.span.processed.count";
    exports.METRIC_OTEL_SDK_PROCESSOR_SPAN_QUEUE_CAPACITY = "otel.sdk.processor.span.queue.capacity";
    exports.METRIC_OTEL_SDK_PROCESSOR_SPAN_QUEUE_SIZE = "otel.sdk.processor.span.queue.size";
    exports.METRIC_OTEL_SDK_SPAN_ENDED = "otel.sdk.span.ended";
    exports.METRIC_OTEL_SDK_SPAN_ENDED_COUNT = "otel.sdk.span.ended.count";
    exports.METRIC_OTEL_SDK_SPAN_LIVE = "otel.sdk.span.live";
    exports.METRIC_OTEL_SDK_SPAN_LIVE_COUNT = "otel.sdk.span.live.count";
    exports.METRIC_OTEL_SDK_SPAN_STARTED = "otel.sdk.span.started";
    exports.METRIC_PROCESS_CONTEXT_SWITCHES = "process.context_switches";
    exports.METRIC_PROCESS_CPU_TIME = "process.cpu.time";
    exports.METRIC_PROCESS_CPU_UTILIZATION = "process.cpu.utilization";
    exports.METRIC_PROCESS_DISK_IO = "process.disk.io";
    exports.METRIC_PROCESS_MEMORY_USAGE = "process.memory.usage";
    exports.METRIC_PROCESS_MEMORY_VIRTUAL = "process.memory.virtual";
    exports.METRIC_PROCESS_NETWORK_IO = "process.network.io";
    exports.METRIC_PROCESS_OPEN_FILE_DESCRIPTOR_COUNT = "process.open_file_descriptor.count";
    exports.METRIC_PROCESS_PAGING_FAULTS = "process.paging.faults";
    exports.METRIC_PROCESS_THREAD_COUNT = "process.thread.count";
    exports.METRIC_PROCESS_UNIX_FILE_DESCRIPTOR_COUNT = "process.unix.file_descriptor.count";
    exports.METRIC_PROCESS_UPTIME = "process.uptime";
    exports.METRIC_PROCESS_WINDOWS_HANDLE_COUNT = "process.windows.handle.count";
    exports.METRIC_RPC_CLIENT_CALL_DURATION = "rpc.client.call.duration";
    exports.METRIC_RPC_CLIENT_DURATION = "rpc.client.duration";
    exports.METRIC_RPC_CLIENT_REQUEST_SIZE = "rpc.client.request.size";
    exports.METRIC_RPC_CLIENT_REQUESTS_PER_RPC = "rpc.client.requests_per_rpc";
    exports.METRIC_RPC_CLIENT_RESPONSE_SIZE = "rpc.client.response.size";
    exports.METRIC_RPC_CLIENT_RESPONSES_PER_RPC = "rpc.client.responses_per_rpc";
    exports.METRIC_RPC_SERVER_CALL_DURATION = "rpc.server.call.duration";
    exports.METRIC_RPC_SERVER_DURATION = "rpc.server.duration";
    exports.METRIC_RPC_SERVER_REQUEST_SIZE = "rpc.server.request.size";
    exports.METRIC_RPC_SERVER_REQUESTS_PER_RPC = "rpc.server.requests_per_rpc";
    exports.METRIC_RPC_SERVER_RESPONSE_SIZE = "rpc.server.response.size";
    exports.METRIC_RPC_SERVER_RESPONSES_PER_RPC = "rpc.server.responses_per_rpc";
    exports.METRIC_SYSTEM_CPU_FREQUENCY = "system.cpu.frequency";
    exports.METRIC_SYSTEM_CPU_LOGICAL_COUNT = "system.cpu.logical.count";
    exports.METRIC_SYSTEM_CPU_PHYSICAL_COUNT = "system.cpu.physical.count";
    exports.METRIC_SYSTEM_CPU_TIME = "system.cpu.time";
    exports.METRIC_SYSTEM_CPU_UTILIZATION = "system.cpu.utilization";
    exports.METRIC_SYSTEM_DISK_IO = "system.disk.io";
    exports.METRIC_SYSTEM_DISK_IO_TIME = "system.disk.io_time";
    exports.METRIC_SYSTEM_DISK_LIMIT = "system.disk.limit";
    exports.METRIC_SYSTEM_DISK_MERGED = "system.disk.merged";
    exports.METRIC_SYSTEM_DISK_OPERATION_TIME = "system.disk.operation_time";
    exports.METRIC_SYSTEM_DISK_OPERATIONS = "system.disk.operations";
    exports.METRIC_SYSTEM_FILESYSTEM_LIMIT = "system.filesystem.limit";
    exports.METRIC_SYSTEM_FILESYSTEM_USAGE = "system.filesystem.usage";
    exports.METRIC_SYSTEM_FILESYSTEM_UTILIZATION = "system.filesystem.utilization";
    exports.METRIC_SYSTEM_LINUX_MEMORY_AVAILABLE = "system.linux.memory.available";
    exports.METRIC_SYSTEM_LINUX_MEMORY_SLAB_USAGE = "system.linux.memory.slab.usage";
    exports.METRIC_SYSTEM_MEMORY_LIMIT = "system.memory.limit";
    exports.METRIC_SYSTEM_MEMORY_LINUX_AVAILABLE = "system.memory.linux.available";
    exports.METRIC_SYSTEM_MEMORY_LINUX_SLAB_USAGE = "system.memory.linux.slab.usage";
    exports.METRIC_SYSTEM_MEMORY_SHARED = "system.memory.shared";
    exports.METRIC_SYSTEM_MEMORY_USAGE = "system.memory.usage";
    exports.METRIC_SYSTEM_MEMORY_UTILIZATION = "system.memory.utilization";
    exports.METRIC_SYSTEM_NETWORK_CONNECTION_COUNT = "system.network.connection.count";
    exports.METRIC_SYSTEM_NETWORK_CONNECTIONS = "system.network.connections";
    exports.METRIC_SYSTEM_NETWORK_DROPPED = "system.network.dropped";
    exports.METRIC_SYSTEM_NETWORK_ERRORS = "system.network.errors";
    exports.METRIC_SYSTEM_NETWORK_IO = "system.network.io";
    exports.METRIC_SYSTEM_NETWORK_PACKET_COUNT = "system.network.packet.count";
    exports.METRIC_SYSTEM_NETWORK_PACKET_DROPPED = "system.network.packet.dropped";
    exports.METRIC_SYSTEM_NETWORK_PACKETS = "system.network.packets";
    exports.METRIC_SYSTEM_PAGING_FAULTS = "system.paging.faults";
    exports.METRIC_SYSTEM_PAGING_OPERATIONS = "system.paging.operations";
    exports.METRIC_SYSTEM_PAGING_USAGE = "system.paging.usage";
    exports.METRIC_SYSTEM_PAGING_UTILIZATION = "system.paging.utilization";
    exports.METRIC_SYSTEM_PROCESS_COUNT = "system.process.count";
    exports.METRIC_SYSTEM_PROCESS_CREATED = "system.process.created";
    exports.METRIC_SYSTEM_UPTIME = "system.uptime";
    exports.METRIC_V8JS_GC_DURATION = "v8js.gc.duration";
    exports.METRIC_V8JS_HEAP_SPACE_AVAILABLE_SIZE = "v8js.heap.space.available_size";
    exports.METRIC_V8JS_HEAP_SPACE_PHYSICAL_SIZE = "v8js.heap.space.physical_size";
    exports.METRIC_V8JS_MEMORY_HEAP_LIMIT = "v8js.memory.heap.limit";
    exports.METRIC_V8JS_MEMORY_HEAP_SPACE_AVAILABLE_SIZE = "v8js.memory.heap.space.available_size";
    exports.METRIC_V8JS_MEMORY_HEAP_SPACE_PHYSICAL_SIZE = "v8js.memory.heap.space.physical_size";
    exports.METRIC_V8JS_MEMORY_HEAP_USED = "v8js.memory.heap.used";
    exports.METRIC_VCS_CHANGE_COUNT = "vcs.change.count";
    exports.METRIC_VCS_CHANGE_DURATION = "vcs.change.duration";
    exports.METRIC_VCS_CHANGE_TIME_TO_APPROVAL = "vcs.change.time_to_approval";
    exports.METRIC_VCS_CHANGE_TIME_TO_MERGE = "vcs.change.time_to_merge";
    exports.METRIC_VCS_CONTRIBUTOR_COUNT = "vcs.contributor.count";
    exports.METRIC_VCS_REF_COUNT = "vcs.ref.count";
    exports.METRIC_VCS_REF_LINES_DELTA = "vcs.ref.lines_delta";
    exports.METRIC_VCS_REF_REVISIONS_DELTA = "vcs.ref.revisions_delta";
    exports.METRIC_VCS_REF_TIME = "vcs.ref.time";
    exports.METRIC_VCS_REPOSITORY_COUNT = "vcs.repository.count";
  }
});

// ../../node_modules/@opentelemetry/semantic-conventions/build/src/experimental_events.js
var require_experimental_events = __commonJS({
  "../../node_modules/@opentelemetry/semantic-conventions/build/src/experimental_events.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EVENT_SESSION_START = exports.EVENT_SESSION_END = exports.EVENT_RPC_MESSAGE = exports.EVENT_GEN_AI_USER_MESSAGE = exports.EVENT_GEN_AI_TOOL_MESSAGE = exports.EVENT_GEN_AI_SYSTEM_MESSAGE = exports.EVENT_GEN_AI_EVALUATION_RESULT = exports.EVENT_GEN_AI_CLIENT_INFERENCE_OPERATION_DETAILS = exports.EVENT_GEN_AI_CHOICE = exports.EVENT_GEN_AI_ASSISTANT_MESSAGE = exports.EVENT_FEATURE_FLAG_EVALUATION = exports.EVENT_DEVICE_APP_LIFECYCLE = exports.EVENT_BROWSER_WEB_VITAL = exports.EVENT_AZURE_RESOURCE_LOG = exports.EVENT_AZ_RESOURCE_LOG = exports.EVENT_APP_WIDGET_CLICK = exports.EVENT_APP_SCREEN_CLICK = exports.EVENT_APP_JANK = void 0;
    exports.EVENT_APP_JANK = "app.jank";
    exports.EVENT_APP_SCREEN_CLICK = "app.screen.click";
    exports.EVENT_APP_WIDGET_CLICK = "app.widget.click";
    exports.EVENT_AZ_RESOURCE_LOG = "az.resource.log";
    exports.EVENT_AZURE_RESOURCE_LOG = "azure.resource.log";
    exports.EVENT_BROWSER_WEB_VITAL = "browser.web_vital";
    exports.EVENT_DEVICE_APP_LIFECYCLE = "device.app.lifecycle";
    exports.EVENT_FEATURE_FLAG_EVALUATION = "feature_flag.evaluation";
    exports.EVENT_GEN_AI_ASSISTANT_MESSAGE = "gen_ai.assistant.message";
    exports.EVENT_GEN_AI_CHOICE = "gen_ai.choice";
    exports.EVENT_GEN_AI_CLIENT_INFERENCE_OPERATION_DETAILS = "gen_ai.client.inference.operation.details";
    exports.EVENT_GEN_AI_EVALUATION_RESULT = "gen_ai.evaluation.result";
    exports.EVENT_GEN_AI_SYSTEM_MESSAGE = "gen_ai.system.message";
    exports.EVENT_GEN_AI_TOOL_MESSAGE = "gen_ai.tool.message";
    exports.EVENT_GEN_AI_USER_MESSAGE = "gen_ai.user.message";
    exports.EVENT_RPC_MESSAGE = "rpc.message";
    exports.EVENT_SESSION_END = "session.end";
    exports.EVENT_SESSION_START = "session.start";
  }
});

// ../../node_modules/@opentelemetry/semantic-conventions/build/src/index-incubating.js
var require_index_incubating = __commonJS({
  "../../node_modules/@opentelemetry/semantic-conventions/build/src/index-incubating.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_stable_attributes(), exports);
    __exportStar(require_stable_metrics(), exports);
    __exportStar(require_stable_events(), exports);
    __exportStar(require_experimental_attributes(), exports);
    __exportStar(require_experimental_metrics(), exports);
    __exportStar(require_experimental_events(), exports);
  }
});

// .wrangler/tmp/bundle-rgQ56q/middleware-loader.entry.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// .wrangler/tmp/bundle-rgQ56q/middleware-insertion-facade.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// src/index.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/@microlabs/otel-cf-workers/dist/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var import_api8 = __toESM(require_src(), 1);
import { Buffer as Buffer2 } from "node:buffer";

// ../../node_modules/@opentelemetry/sdk-trace-base/build/esm/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/@opentelemetry/core/build/esm/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/@opentelemetry/core/build/esm/trace/suppress-tracing.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var import_api = __toESM(require_src());
var SUPPRESS_TRACING_KEY = (0, import_api.createContextKey)("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
function isTracingSuppressed(context3) {
  return context3.getValue(SUPPRESS_TRACING_KEY) === true;
}
__name(isTracingSuppressed, "isTracingSuppressed");

// ../../node_modules/@opentelemetry/core/build/esm/common/attributes.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var import_api2 = __toESM(require_src());
function sanitizeAttributes(attributes) {
  const out = {};
  if (typeof attributes !== "object" || attributes == null) {
    return out;
  }
  for (const key in attributes) {
    if (!Object.prototype.hasOwnProperty.call(attributes, key)) {
      continue;
    }
    if (!isAttributeKey(key)) {
      import_api2.diag.warn(`Invalid attribute key: ${key}`);
      continue;
    }
    const val = attributes[key];
    if (!isAttributeValue(val)) {
      import_api2.diag.warn(`Invalid attribute value set for key: ${key}`);
      continue;
    }
    if (Array.isArray(val)) {
      out[key] = val.slice();
    } else {
      out[key] = val;
    }
  }
  return out;
}
__name(sanitizeAttributes, "sanitizeAttributes");
function isAttributeKey(key) {
  return typeof key === "string" && key !== "";
}
__name(isAttributeKey, "isAttributeKey");
function isAttributeValue(val) {
  if (val == null) {
    return true;
  }
  if (Array.isArray(val)) {
    return isHomogeneousAttributeValueArray(val);
  }
  return isValidPrimitiveAttributeValueType(typeof val);
}
__name(isAttributeValue, "isAttributeValue");
function isHomogeneousAttributeValueArray(arr) {
  let type;
  for (const element of arr) {
    if (element == null)
      continue;
    const elementType = typeof element;
    if (elementType === type) {
      continue;
    }
    if (!type) {
      if (isValidPrimitiveAttributeValueType(elementType)) {
        type = elementType;
        continue;
      }
      return false;
    }
    return false;
  }
  return true;
}
__name(isHomogeneousAttributeValueArray, "isHomogeneousAttributeValueArray");
function isValidPrimitiveAttributeValueType(valType) {
  switch (valType) {
    case "number":
    case "boolean":
    case "string":
      return true;
  }
  return false;
}
__name(isValidPrimitiveAttributeValueType, "isValidPrimitiveAttributeValueType");

// ../../node_modules/@opentelemetry/core/build/esm/common/global-error-handler.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/@opentelemetry/core/build/esm/common/logging-error-handler.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var import_api3 = __toESM(require_src());
function loggingErrorHandler() {
  return (ex) => {
    import_api3.diag.error(stringifyException(ex));
  };
}
__name(loggingErrorHandler, "loggingErrorHandler");
function stringifyException(ex) {
  if (typeof ex === "string") {
    return ex;
  } else {
    return JSON.stringify(flattenException(ex));
  }
}
__name(stringifyException, "stringifyException");
function flattenException(ex) {
  const result = {};
  let current = ex;
  while (current !== null) {
    Object.getOwnPropertyNames(current).forEach((propertyName) => {
      if (result[propertyName])
        return;
      const value = current[propertyName];
      if (value) {
        result[propertyName] = String(value);
      }
    });
    current = Object.getPrototypeOf(current);
  }
  return result;
}
__name(flattenException, "flattenException");

// ../../node_modules/@opentelemetry/core/build/esm/common/global-error-handler.js
var delegateHandler = loggingErrorHandler();
function globalErrorHandler(ex) {
  try {
    delegateHandler(ex);
  } catch {
  }
}
__name(globalErrorHandler, "globalErrorHandler");

// ../../node_modules/@opentelemetry/core/build/esm/common/time.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var NANOSECOND_DIGITS = 9;
var NANOSECOND_DIGITS_IN_MILLIS = 6;
var MILLISECONDS_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS_IN_MILLIS);
var SECOND_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS);
function hrTimeDuration(startTime, endTime) {
  let seconds = endTime[0] - startTime[0];
  let nanos = endTime[1] - startTime[1];
  if (nanos < 0) {
    seconds -= 1;
    nanos += SECOND_TO_NANOSECONDS;
  }
  return [seconds, nanos];
}
__name(hrTimeDuration, "hrTimeDuration");
function isTimeInputHrTime(value) {
  return Array.isArray(value) && value.length === 2 && typeof value[0] === "number" && typeof value[1] === "number";
}
__name(isTimeInputHrTime, "isTimeInputHrTime");
function isTimeInput(value) {
  return isTimeInputHrTime(value) || typeof value === "number" || value instanceof Date;
}
__name(isTimeInput, "isTimeInput");

// ../../node_modules/@opentelemetry/core/build/esm/ExportResult.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var ExportResultCode;
(function(ExportResultCode2) {
  ExportResultCode2[ExportResultCode2["SUCCESS"] = 0] = "SUCCESS";
  ExportResultCode2[ExportResultCode2["FAILED"] = 1] = "FAILED";
})(ExportResultCode || (ExportResultCode = {}));

// ../../node_modules/@opentelemetry/core/build/esm/trace/W3CTraceContextPropagator.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var import_api4 = __toESM(require_src());

// ../../node_modules/@opentelemetry/core/build/esm/trace/TraceState.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/@opentelemetry/core/build/esm/internal/validators.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var VALID_KEY_CHAR_RANGE = "[_0-9a-z-*/]";
var VALID_KEY = `[a-z]${VALID_KEY_CHAR_RANGE}{0,255}`;
var VALID_VENDOR_KEY = `[a-z0-9]${VALID_KEY_CHAR_RANGE}{0,240}@[a-z]${VALID_KEY_CHAR_RANGE}{0,13}`;
var VALID_KEY_REGEX = new RegExp(`^(?:${VALID_KEY}|${VALID_VENDOR_KEY})$`);
var VALID_VALUE_BASE_REGEX = /^[ -~]{0,255}[!-~]$/;
var INVALID_VALUE_COMMA_EQUAL_REGEX = /,|=/;
function validateKey(key) {
  return VALID_KEY_REGEX.test(key);
}
__name(validateKey, "validateKey");
function validateValue(value) {
  return VALID_VALUE_BASE_REGEX.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX.test(value);
}
__name(validateValue, "validateValue");

// ../../node_modules/@opentelemetry/core/build/esm/trace/TraceState.js
var MAX_TRACE_STATE_ITEMS = 32;
var MAX_TRACE_STATE_LEN = 512;
var LIST_MEMBERS_SEPARATOR = ",";
var LIST_MEMBER_KEY_VALUE_SPLITTER = "=";
var TraceState = class _TraceState {
  static {
    __name(this, "TraceState");
  }
  _internalState = /* @__PURE__ */ new Map();
  constructor(rawTraceState) {
    if (rawTraceState)
      this._parse(rawTraceState);
  }
  set(key, value) {
    const traceState = this._clone();
    if (traceState._internalState.has(key)) {
      traceState._internalState.delete(key);
    }
    traceState._internalState.set(key, value);
    return traceState;
  }
  unset(key) {
    const traceState = this._clone();
    traceState._internalState.delete(key);
    return traceState;
  }
  get(key) {
    return this._internalState.get(key);
  }
  serialize() {
    return this._keys().reduce((agg, key) => {
      agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER + this.get(key));
      return agg;
    }, []).join(LIST_MEMBERS_SEPARATOR);
  }
  _parse(rawTraceState) {
    if (rawTraceState.length > MAX_TRACE_STATE_LEN)
      return;
    this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR).reverse().reduce((agg, part) => {
      const listMember = part.trim();
      const i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER);
      if (i !== -1) {
        const key = listMember.slice(0, i);
        const value = listMember.slice(i + 1, part.length);
        if (validateKey(key) && validateValue(value)) {
          agg.set(key, value);
        } else {
        }
      }
      return agg;
    }, /* @__PURE__ */ new Map());
    if (this._internalState.size > MAX_TRACE_STATE_ITEMS) {
      this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, MAX_TRACE_STATE_ITEMS));
    }
  }
  _keys() {
    return Array.from(this._internalState.keys()).reverse();
  }
  _clone() {
    const traceState = new _TraceState();
    traceState._internalState = new Map(this._internalState);
    return traceState;
  }
};

// ../../node_modules/@opentelemetry/core/build/esm/trace/W3CTraceContextPropagator.js
var TRACE_PARENT_HEADER = "traceparent";
var TRACE_STATE_HEADER = "tracestate";
var VERSION = "00";
var VERSION_PART = "(?!ff)[\\da-f]{2}";
var TRACE_ID_PART = "(?![0]{32})[\\da-f]{32}";
var PARENT_ID_PART = "(?![0]{16})[\\da-f]{16}";
var FLAGS_PART = "[\\da-f]{2}";
var TRACE_PARENT_REGEX = new RegExp(`^\\s?(${VERSION_PART})-(${TRACE_ID_PART})-(${PARENT_ID_PART})-(${FLAGS_PART})(-.*)?\\s?$`);
function parseTraceParent(traceParent) {
  const match2 = TRACE_PARENT_REGEX.exec(traceParent);
  if (!match2)
    return null;
  if (match2[1] === "00" && match2[5])
    return null;
  return {
    traceId: match2[2],
    spanId: match2[3],
    traceFlags: parseInt(match2[4], 16)
  };
}
__name(parseTraceParent, "parseTraceParent");
var W3CTraceContextPropagator = class {
  static {
    __name(this, "W3CTraceContextPropagator");
  }
  inject(context3, carrier, setter) {
    const spanContext = import_api4.trace.getSpanContext(context3);
    if (!spanContext || isTracingSuppressed(context3) || !(0, import_api4.isSpanContextValid)(spanContext))
      return;
    const traceParent = `${VERSION}-${spanContext.traceId}-${spanContext.spanId}-0${Number(spanContext.traceFlags || import_api4.TraceFlags.NONE).toString(16)}`;
    setter.set(carrier, TRACE_PARENT_HEADER, traceParent);
    if (spanContext.traceState) {
      setter.set(carrier, TRACE_STATE_HEADER, spanContext.traceState.serialize());
    }
  }
  extract(context3, carrier, getter) {
    const traceParentHeader = getter.get(carrier, TRACE_PARENT_HEADER);
    if (!traceParentHeader)
      return context3;
    const traceParent = Array.isArray(traceParentHeader) ? traceParentHeader[0] : traceParentHeader;
    if (typeof traceParent !== "string")
      return context3;
    const spanContext = parseTraceParent(traceParent);
    if (!spanContext)
      return context3;
    spanContext.isRemote = true;
    const traceStateHeader = getter.get(carrier, TRACE_STATE_HEADER);
    if (traceStateHeader) {
      const state = Array.isArray(traceStateHeader) ? traceStateHeader.join(",") : traceStateHeader;
      spanContext.traceState = new TraceState(typeof state === "string" ? state : void 0);
    }
    return import_api4.trace.setSpanContext(context3, spanContext);
  }
  fields() {
    return [TRACE_PARENT_HEADER, TRACE_STATE_HEADER];
  }
};

// ../../node_modules/@opentelemetry/resources/build/esm/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/@opentelemetry/resources/build/esm/ResourceImpl.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var import_api5 = __toESM(require_src());

// ../../node_modules/@opentelemetry/resources/build/esm/utils.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var isPromiseLike = /* @__PURE__ */ __name((val) => {
  return val !== null && typeof val === "object" && typeof val.then === "function";
}, "isPromiseLike");

// ../../node_modules/@opentelemetry/resources/build/esm/ResourceImpl.js
var ResourceImpl = class _ResourceImpl {
  static {
    __name(this, "ResourceImpl");
  }
  _rawAttributes;
  _asyncAttributesPending = false;
  _schemaUrl;
  _memoizedAttributes;
  static FromAttributeList(attributes, options) {
    const res = new _ResourceImpl({}, options);
    res._rawAttributes = guardedRawAttributes(attributes);
    res._asyncAttributesPending = attributes.filter(([_, val]) => isPromiseLike(val)).length > 0;
    return res;
  }
  constructor(resource, options) {
    const attributes = resource.attributes ?? {};
    this._rawAttributes = Object.entries(attributes).map(([k, v]) => {
      if (isPromiseLike(v)) {
        this._asyncAttributesPending = true;
      }
      return [k, v];
    });
    this._rawAttributes = guardedRawAttributes(this._rawAttributes);
    this._schemaUrl = validateSchemaUrl(options?.schemaUrl);
  }
  get asyncAttributesPending() {
    return this._asyncAttributesPending;
  }
  async waitForAsyncAttributes() {
    if (!this.asyncAttributesPending) {
      return;
    }
    for (let i = 0; i < this._rawAttributes.length; i++) {
      const [k, v] = this._rawAttributes[i];
      this._rawAttributes[i] = [k, isPromiseLike(v) ? await v : v];
    }
    this._asyncAttributesPending = false;
  }
  get attributes() {
    if (this.asyncAttributesPending) {
      import_api5.diag.error("Accessing resource attributes before async attributes settled");
    }
    if (this._memoizedAttributes) {
      return this._memoizedAttributes;
    }
    const attrs = {};
    for (const [k, v] of this._rawAttributes) {
      if (isPromiseLike(v)) {
        import_api5.diag.debug(`Unsettled resource attribute ${k} skipped`);
        continue;
      }
      if (v != null) {
        attrs[k] ??= v;
      }
    }
    if (!this._asyncAttributesPending) {
      this._memoizedAttributes = attrs;
    }
    return attrs;
  }
  getRawAttributes() {
    return this._rawAttributes;
  }
  get schemaUrl() {
    return this._schemaUrl;
  }
  merge(resource) {
    if (resource == null)
      return this;
    const mergedSchemaUrl = mergeSchemaUrl(this, resource);
    const mergedOptions = mergedSchemaUrl ? { schemaUrl: mergedSchemaUrl } : void 0;
    return _ResourceImpl.FromAttributeList([...resource.getRawAttributes(), ...this.getRawAttributes()], mergedOptions);
  }
};
function resourceFromAttributes(attributes, options) {
  return ResourceImpl.FromAttributeList(Object.entries(attributes), options);
}
__name(resourceFromAttributes, "resourceFromAttributes");
function guardedRawAttributes(attributes) {
  return attributes.map(([k, v]) => {
    if (isPromiseLike(v)) {
      return [
        k,
        v.catch((err) => {
          import_api5.diag.debug("promise rejection for resource attribute: %s - %s", k, err);
          return void 0;
        })
      ];
    }
    return [k, v];
  });
}
__name(guardedRawAttributes, "guardedRawAttributes");
function validateSchemaUrl(schemaUrl) {
  if (typeof schemaUrl === "string" || schemaUrl === void 0) {
    return schemaUrl;
  }
  import_api5.diag.warn("Schema URL must be string or undefined, got %s. Schema URL will be ignored.", schemaUrl);
  return void 0;
}
__name(validateSchemaUrl, "validateSchemaUrl");
function mergeSchemaUrl(old, updating) {
  const oldSchemaUrl = old?.schemaUrl;
  const updatingSchemaUrl = updating?.schemaUrl;
  const isOldEmpty = oldSchemaUrl === void 0 || oldSchemaUrl === "";
  const isUpdatingEmpty = updatingSchemaUrl === void 0 || updatingSchemaUrl === "";
  if (isOldEmpty) {
    return updatingSchemaUrl;
  }
  if (isUpdatingEmpty) {
    return oldSchemaUrl;
  }
  if (oldSchemaUrl === updatingSchemaUrl) {
    return oldSchemaUrl;
  }
  import_api5.diag.warn('Schema URL merge conflict: old resource has "%s", updating resource has "%s". Resulting resource will have undefined Schema URL.', oldSchemaUrl, updatingSchemaUrl);
  return void 0;
}
__name(mergeSchemaUrl, "mergeSchemaUrl");

// ../../node_modules/@opentelemetry/sdk-trace-base/build/esm/sampler/AlwaysOffSampler.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/@opentelemetry/sdk-trace-base/build/esm/Sampler.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var SamplingDecision;
(function(SamplingDecision2) {
  SamplingDecision2[SamplingDecision2["NOT_RECORD"] = 0] = "NOT_RECORD";
  SamplingDecision2[SamplingDecision2["RECORD"] = 1] = "RECORD";
  SamplingDecision2[SamplingDecision2["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
})(SamplingDecision || (SamplingDecision = {}));

// ../../node_modules/@opentelemetry/sdk-trace-base/build/esm/sampler/AlwaysOffSampler.js
var AlwaysOffSampler = class {
  static {
    __name(this, "AlwaysOffSampler");
  }
  shouldSample() {
    return {
      decision: SamplingDecision.NOT_RECORD
    };
  }
  toString() {
    return "AlwaysOffSampler";
  }
};

// ../../node_modules/@opentelemetry/sdk-trace-base/build/esm/sampler/AlwaysOnSampler.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var AlwaysOnSampler = class {
  static {
    __name(this, "AlwaysOnSampler");
  }
  shouldSample() {
    return {
      decision: SamplingDecision.RECORD_AND_SAMPLED
    };
  }
  toString() {
    return "AlwaysOnSampler";
  }
};

// ../../node_modules/@opentelemetry/sdk-trace-base/build/esm/sampler/ParentBasedSampler.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var import_api6 = __toESM(require_src());
var ParentBasedSampler = class {
  static {
    __name(this, "ParentBasedSampler");
  }
  _root;
  _remoteParentSampled;
  _remoteParentNotSampled;
  _localParentSampled;
  _localParentNotSampled;
  constructor(config2) {
    this._root = config2.root;
    if (!this._root) {
      globalErrorHandler(new Error("ParentBasedSampler must have a root sampler configured"));
      this._root = new AlwaysOnSampler();
    }
    this._remoteParentSampled = config2.remoteParentSampled ?? new AlwaysOnSampler();
    this._remoteParentNotSampled = config2.remoteParentNotSampled ?? new AlwaysOffSampler();
    this._localParentSampled = config2.localParentSampled ?? new AlwaysOnSampler();
    this._localParentNotSampled = config2.localParentNotSampled ?? new AlwaysOffSampler();
  }
  shouldSample(context3, traceId, spanName, spanKind, attributes, links) {
    const parentContext = import_api6.trace.getSpanContext(context3);
    if (!parentContext || !(0, import_api6.isSpanContextValid)(parentContext)) {
      return this._root.shouldSample(context3, traceId, spanName, spanKind, attributes, links);
    }
    if (parentContext.isRemote) {
      if (parentContext.traceFlags & import_api6.TraceFlags.SAMPLED) {
        return this._remoteParentSampled.shouldSample(context3, traceId, spanName, spanKind, attributes, links);
      }
      return this._remoteParentNotSampled.shouldSample(context3, traceId, spanName, spanKind, attributes, links);
    }
    if (parentContext.traceFlags & import_api6.TraceFlags.SAMPLED) {
      return this._localParentSampled.shouldSample(context3, traceId, spanName, spanKind, attributes, links);
    }
    return this._localParentNotSampled.shouldSample(context3, traceId, spanName, spanKind, attributes, links);
  }
  toString() {
    return `ParentBased{root=${this._root.toString()}, remoteParentSampled=${this._remoteParentSampled.toString()}, remoteParentNotSampled=${this._remoteParentNotSampled.toString()}, localParentSampled=${this._localParentSampled.toString()}, localParentNotSampled=${this._localParentNotSampled.toString()}}`;
  }
};

// ../../node_modules/@opentelemetry/sdk-trace-base/build/esm/sampler/TraceIdRatioBasedSampler.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var import_api7 = __toESM(require_src());
var TraceIdRatioBasedSampler = class {
  static {
    __name(this, "TraceIdRatioBasedSampler");
  }
  _ratio;
  _upperBound;
  constructor(ratio = 0) {
    this._ratio = this._normalize(ratio);
    this._upperBound = Math.floor(this._ratio * 4294967295);
  }
  shouldSample(context3, traceId) {
    return {
      decision: (0, import_api7.isValidTraceId)(traceId) && this._accumulate(traceId) < this._upperBound ? SamplingDecision.RECORD_AND_SAMPLED : SamplingDecision.NOT_RECORD
    };
  }
  toString() {
    return `TraceIdRatioBased{${this._ratio}}`;
  }
  _normalize(ratio) {
    if (typeof ratio !== "number" || isNaN(ratio))
      return 0;
    return ratio >= 1 ? 1 : ratio <= 0 ? 0 : ratio;
  }
  _accumulate(traceId) {
    let accumulation = 0;
    for (let i = 0; i < traceId.length / 8; i++) {
      const pos = i * 8;
      const part = parseInt(traceId.slice(pos, pos + 8), 16);
      accumulation = (accumulation ^ part) >>> 0;
    }
    return accumulation;
  }
};

// ../../node_modules/@opentelemetry/sdk-trace-base/build/esm/platform/browser/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/@opentelemetry/sdk-trace-base/build/esm/platform/browser/RandomIdGenerator.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var SPAN_ID_BYTES = 8;
var TRACE_ID_BYTES = 16;
var RandomIdGenerator = class {
  static {
    __name(this, "RandomIdGenerator");
  }
  /**
   * Returns a random 16-byte trace ID formatted/encoded as a 32 lowercase hex
   * characters corresponding to 128 bits.
   */
  generateTraceId = getIdGenerator(TRACE_ID_BYTES);
  /**
   * Returns a random 8-byte span ID formatted/encoded as a 16 lowercase hex
   * characters corresponding to 64 bits.
   */
  generateSpanId = getIdGenerator(SPAN_ID_BYTES);
};
var SHARED_CHAR_CODES_ARRAY = Array(32);
function getIdGenerator(bytes) {
  return /* @__PURE__ */ __name(function generateId() {
    for (let i = 0; i < bytes * 2; i++) {
      SHARED_CHAR_CODES_ARRAY[i] = Math.floor(Math.random() * 16) + 48;
      if (SHARED_CHAR_CODES_ARRAY[i] >= 58) {
        SHARED_CHAR_CODES_ARRAY[i] += 39;
      }
    }
    return String.fromCharCode.apply(null, SHARED_CHAR_CODES_ARRAY.slice(0, bytes * 2));
  }, "generateId");
}
__name(getIdGenerator, "getIdGenerator");

// ../../node_modules/@microlabs/otel-cf-workers/dist/index.js
var import_api9 = __toESM(require_src(), 1);
var import_api10 = __toESM(require_src(), 1);
var import_otlp_exporter_base = __toESM(require_src4(), 1);

// ../../node_modules/@opentelemetry/otlp-transformer/build/esm/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/@opentelemetry/otlp-transformer/build/esm/common/utils.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/@opentelemetry/otlp-transformer/node_modules/@opentelemetry/core/build/esm/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/@opentelemetry/otlp-transformer/node_modules/@opentelemetry/core/build/esm/common/time.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var NANOSECOND_DIGITS2 = 9;
var NANOSECOND_DIGITS_IN_MILLIS2 = 6;
var MILLISECONDS_TO_NANOSECONDS2 = Math.pow(10, NANOSECOND_DIGITS_IN_MILLIS2);
var SECOND_TO_NANOSECONDS2 = Math.pow(10, NANOSECOND_DIGITS2);
function hrTimeToNanoseconds2(time) {
  return time[0] * SECOND_TO_NANOSECONDS2 + time[1];
}
__name(hrTimeToNanoseconds2, "hrTimeToNanoseconds");

// ../../node_modules/@opentelemetry/otlp-transformer/build/esm/common/hex-to-binary.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
function intValue(charCode) {
  if (charCode >= 48 && charCode <= 57) {
    return charCode - 48;
  }
  if (charCode >= 97 && charCode <= 102) {
    return charCode - 87;
  }
  return charCode - 55;
}
__name(intValue, "intValue");
function hexToBinary(hexStr) {
  const buf = new Uint8Array(hexStr.length / 2);
  let offset = 0;
  for (let i = 0; i < hexStr.length; i += 2) {
    const hi = intValue(hexStr.charCodeAt(i));
    const lo = intValue(hexStr.charCodeAt(i + 1));
    buf[offset++] = hi << 4 | lo;
  }
  return buf;
}
__name(hexToBinary, "hexToBinary");

// ../../node_modules/@opentelemetry/otlp-transformer/build/esm/common/utils.js
function hrTimeToNanos(hrTime3) {
  const NANOSECONDS = BigInt(1e9);
  return BigInt(hrTime3[0]) * NANOSECONDS + BigInt(hrTime3[1]);
}
__name(hrTimeToNanos, "hrTimeToNanos");
function toLongBits(value) {
  const low = Number(BigInt.asUintN(32, value));
  const high = Number(BigInt.asUintN(32, value >> BigInt(32)));
  return { low, high };
}
__name(toLongBits, "toLongBits");
function encodeAsLongBits(hrTime3) {
  const nanos = hrTimeToNanos(hrTime3);
  return toLongBits(nanos);
}
__name(encodeAsLongBits, "encodeAsLongBits");
function encodeAsString(hrTime3) {
  const nanos = hrTimeToNanos(hrTime3);
  return nanos.toString();
}
__name(encodeAsString, "encodeAsString");
var encodeTimestamp = typeof BigInt !== "undefined" ? encodeAsString : hrTimeToNanoseconds2;
function identity(value) {
  return value;
}
__name(identity, "identity");
function optionalHexToBinary(str) {
  if (str === void 0)
    return void 0;
  return hexToBinary(str);
}
__name(optionalHexToBinary, "optionalHexToBinary");
var DEFAULT_ENCODER = {
  encodeHrTime: encodeAsLongBits,
  encodeSpanContext: hexToBinary,
  encodeOptionalSpanContext: optionalHexToBinary
};
function getOtlpEncoder(options) {
  if (options === void 0) {
    return DEFAULT_ENCODER;
  }
  const useLongBits = options.useLongBits ?? true;
  const useHex = options.useHex ?? false;
  return {
    encodeHrTime: useLongBits ? encodeAsLongBits : encodeTimestamp,
    encodeSpanContext: useHex ? identity : hexToBinary,
    encodeOptionalSpanContext: useHex ? identity : optionalHexToBinary
  };
}
__name(getOtlpEncoder, "getOtlpEncoder");

// ../../node_modules/@opentelemetry/otlp-transformer/build/esm/common/internal.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
function createResource(resource) {
  return {
    attributes: toAttributes(resource.attributes),
    droppedAttributesCount: 0
  };
}
__name(createResource, "createResource");
function createInstrumentationScope(scope) {
  return {
    name: scope.name,
    version: scope.version
  };
}
__name(createInstrumentationScope, "createInstrumentationScope");
function toAttributes(attributes) {
  return Object.keys(attributes).map((key) => toKeyValue(key, attributes[key]));
}
__name(toAttributes, "toAttributes");
function toKeyValue(key, value) {
  return {
    key,
    value: toAnyValue(value)
  };
}
__name(toKeyValue, "toKeyValue");
function toAnyValue(value) {
  const t = typeof value;
  if (t === "string")
    return { stringValue: value };
  if (t === "number") {
    if (!Number.isInteger(value))
      return { doubleValue: value };
    return { intValue: value };
  }
  if (t === "boolean")
    return { boolValue: value };
  if (value instanceof Uint8Array)
    return { bytesValue: value };
  if (Array.isArray(value))
    return { arrayValue: { values: value.map(toAnyValue) } };
  if (t === "object" && value != null)
    return {
      kvlistValue: {
        values: Object.entries(value).map(([k, v]) => toKeyValue(k, v))
      }
    };
  return {};
}
__name(toAnyValue, "toAnyValue");

// ../../node_modules/@opentelemetry/otlp-transformer/build/esm/trace/internal.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
function sdkSpanToOtlpSpan(span, encoder) {
  const ctx = span.spanContext();
  const status = span.status;
  const parentSpanId = span.parentSpanContext?.spanId ? encoder.encodeSpanContext(span.parentSpanContext?.spanId) : void 0;
  return {
    traceId: encoder.encodeSpanContext(ctx.traceId),
    spanId: encoder.encodeSpanContext(ctx.spanId),
    parentSpanId,
    traceState: ctx.traceState?.serialize(),
    name: span.name,
    // Span kind is offset by 1 because the API does not define a value for unset
    kind: span.kind == null ? 0 : span.kind + 1,
    startTimeUnixNano: encoder.encodeHrTime(span.startTime),
    endTimeUnixNano: encoder.encodeHrTime(span.endTime),
    attributes: toAttributes(span.attributes),
    droppedAttributesCount: span.droppedAttributesCount,
    events: span.events.map((event) => toOtlpSpanEvent(event, encoder)),
    droppedEventsCount: span.droppedEventsCount,
    status: {
      // API and proto enums share the same values
      code: status.code,
      message: status.message
    },
    links: span.links.map((link) => toOtlpLink(link, encoder)),
    droppedLinksCount: span.droppedLinksCount
  };
}
__name(sdkSpanToOtlpSpan, "sdkSpanToOtlpSpan");
function toOtlpLink(link, encoder) {
  return {
    attributes: link.attributes ? toAttributes(link.attributes) : [],
    spanId: encoder.encodeSpanContext(link.context.spanId),
    traceId: encoder.encodeSpanContext(link.context.traceId),
    traceState: link.context.traceState?.serialize(),
    droppedAttributesCount: link.droppedAttributesCount || 0
  };
}
__name(toOtlpLink, "toOtlpLink");
function toOtlpSpanEvent(timedEvent, encoder) {
  return {
    attributes: timedEvent.attributes ? toAttributes(timedEvent.attributes) : [],
    name: timedEvent.name,
    timeUnixNano: encoder.encodeHrTime(timedEvent.time),
    droppedAttributesCount: timedEvent.droppedAttributesCount || 0
  };
}
__name(toOtlpSpanEvent, "toOtlpSpanEvent");
function createExportTraceServiceRequest(spans, options) {
  const encoder = getOtlpEncoder(options);
  return {
    resourceSpans: spanRecordsToResourceSpans(spans, encoder)
  };
}
__name(createExportTraceServiceRequest, "createExportTraceServiceRequest");
function createResourceMap(readableSpans) {
  const resourceMap = /* @__PURE__ */ new Map();
  for (const record of readableSpans) {
    let ilsMap = resourceMap.get(record.resource);
    if (!ilsMap) {
      ilsMap = /* @__PURE__ */ new Map();
      resourceMap.set(record.resource, ilsMap);
    }
    const instrumentationScopeKey = `${record.instrumentationScope.name}@${record.instrumentationScope.version || ""}:${record.instrumentationScope.schemaUrl || ""}`;
    let records = ilsMap.get(instrumentationScopeKey);
    if (!records) {
      records = [];
      ilsMap.set(instrumentationScopeKey, records);
    }
    records.push(record);
  }
  return resourceMap;
}
__name(createResourceMap, "createResourceMap");
function spanRecordsToResourceSpans(readableSpans, encoder) {
  const resourceMap = createResourceMap(readableSpans);
  const out = [];
  const entryIterator = resourceMap.entries();
  let entry = entryIterator.next();
  while (!entry.done) {
    const [resource, ilmMap] = entry.value;
    const scopeResourceSpans = [];
    const ilmIterator = ilmMap.values();
    let ilmEntry = ilmIterator.next();
    while (!ilmEntry.done) {
      const scopeSpans = ilmEntry.value;
      if (scopeSpans.length > 0) {
        const spans = scopeSpans.map((readableSpan) => sdkSpanToOtlpSpan(readableSpan, encoder));
        scopeResourceSpans.push({
          scope: createInstrumentationScope(scopeSpans[0].instrumentationScope),
          spans,
          schemaUrl: scopeSpans[0].instrumentationScope.schemaUrl
        });
      }
      ilmEntry = ilmIterator.next();
    }
    const transformedSpans = {
      resource: createResource(resource),
      scopeSpans: scopeResourceSpans,
      schemaUrl: void 0
    };
    out.push(transformedSpans);
    entry = entryIterator.next();
  }
  return out;
}
__name(spanRecordsToResourceSpans, "spanRecordsToResourceSpans");

// ../../node_modules/@opentelemetry/otlp-transformer/build/esm/trace/json/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/@opentelemetry/otlp-transformer/build/esm/trace/json/trace.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var JsonTraceSerializer = {
  serializeRequest: /* @__PURE__ */ __name((arg) => {
    const request = createExportTraceServiceRequest(arg, {
      useHex: true,
      useLongBits: false
    });
    const encoder = new TextEncoder();
    return encoder.encode(JSON.stringify(request));
  }, "serializeRequest"),
  deserializeResponse: /* @__PURE__ */ __name((arg) => {
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(arg));
  }, "deserializeResponse")
};

// ../../node_modules/@microlabs/otel-cf-workers/dist/index.js
var import_api11 = __toESM(require_src(), 1);
var import_api12 = __toESM(require_src(), 1);
var import_api13 = __toESM(require_src(), 1);
import { AsyncLocalStorage } from "node:async_hooks";
import { EventEmitter as EventEmitter2 } from "node:events";
var import_api14 = __toESM(require_src(), 1);
var import_semantic_conventions = __toESM(require_src2(), 1);
var import_api15 = __toESM(require_src(), 1);
var import_api16 = __toESM(require_src(), 1);
var import_api17 = __toESM(require_src(), 1);
var import_incubating = __toESM(require_index_incubating(), 1);
var import_api18 = __toESM(require_src(), 1);
var import_semantic_conventions2 = __toESM(require_src2(), 1);
var import_api19 = __toESM(require_src(), 1);
var import_semantic_conventions3 = __toESM(require_src2(), 1);
var import_api20 = __toESM(require_src(), 1);
var import_semantic_conventions4 = __toESM(require_src2(), 1);
var import_api21 = __toESM(require_src(), 1);
var import_incubating2 = __toESM(require_index_incubating(), 1);
import { DurableObject as DurableObjectClass } from "cloudflare:workers";
var import_api22 = __toESM(require_src(), 1);
var import_incubating3 = __toESM(require_index_incubating(), 1);
globalThis.Buffer = Buffer2;
function multiTailSampler(samplers) {
  return (traceInfo) => {
    return samplers.reduce((result, sampler) => result || sampler(traceInfo), false);
  };
}
__name(multiTailSampler, "multiTailSampler");
var isHeadSampled = /* @__PURE__ */ __name((traceInfo) => {
  const localRootSpan = traceInfo.localRootSpan;
  return (localRootSpan.spanContext().traceFlags & import_api8.TraceFlags.SAMPLED) === import_api8.TraceFlags.SAMPLED;
}, "isHeadSampled");
var isRootErrorSpan = /* @__PURE__ */ __name((traceInfo) => {
  const localRootSpan = traceInfo.localRootSpan;
  return localRootSpan.status.code === import_api8.SpanStatusCode.ERROR;
}, "isRootErrorSpan");
function createSampler(conf) {
  const ratioSampler = new TraceIdRatioBasedSampler(conf.ratio);
  if (typeof conf.acceptRemote === "boolean" && !conf.acceptRemote) {
    return new ParentBasedSampler({
      root: ratioSampler,
      remoteParentSampled: ratioSampler,
      remoteParentNotSampled: ratioSampler
    });
  } else {
    return new ParentBasedSampler({ root: ratioSampler });
  }
}
__name(createSampler, "createSampler");
function isSpanProcessorConfig(config2) {
  return !!config2.spanProcessors;
}
__name(isSpanProcessorConfig, "isSpanProcessorConfig");
var unwrapSymbol = Symbol("unwrap");
function isWrapped(item) {
  return item && !!item[unwrapSymbol];
}
__name(isWrapped, "isWrapped");
function isProxyable(item) {
  return item !== null && typeof item === "object" || typeof item === "function";
}
__name(isProxyable, "isProxyable");
function wrap(item, handler2, autoPassthrough = true) {
  if (isWrapped(item) || !isProxyable(item)) {
    return item;
  }
  const proxyHandler = Object.assign({}, handler2);
  proxyHandler.get = (target, prop, receiver) => {
    if (prop === unwrapSymbol) {
      return item;
    } else {
      if (handler2.get) {
        return handler2.get(target, prop, receiver);
      } else if (prop === "bind") {
        return () => receiver;
      } else if (autoPassthrough) {
        return passthroughGet(target, prop);
      }
    }
  };
  proxyHandler.apply = (target, thisArg, argArray) => {
    if (handler2.apply) {
      return handler2.apply(unwrap(target), unwrap(thisArg), argArray);
    }
  };
  return new Proxy(item, proxyHandler);
}
__name(wrap, "wrap");
function unwrap(item) {
  if (item && isWrapped(item)) {
    return item[unwrapSymbol];
  } else {
    return item;
  }
}
__name(unwrap, "unwrap");
function passthroughGet(target, prop, thisArg) {
  const unwrappedTarget = unwrap(target);
  thisArg = unwrap(thisArg) || unwrappedTarget;
  const value = Reflect.get(unwrappedTarget, prop);
  if (typeof value === "function") {
    if (value.constructor.name === "RpcProperty") {
      return (...args) => unwrappedTarget[prop](...args);
    }
    return value.bind(thisArg);
  } else {
    return value;
  }
}
__name(passthroughGet, "passthroughGet");
var _microlabs_otel_cf_workers = "1.0.0-rc.52";
var node = "20.19.1";
var defaultHeaders = {
  accept: "application/json",
  "content-type": "application/json",
  "user-agent": `Cloudflare Worker @microlabs/otel-cf-workers v${_microlabs_otel_cf_workers}`
};
var OTLPExporter = class {
  static {
    __name(this, "OTLPExporter");
  }
  headers;
  url;
  constructor(config2) {
    this.url = config2.url;
    this.headers = Object.assign({}, defaultHeaders, config2.headers);
  }
  export(items, resultCallback) {
    this._export(items).then(() => {
      resultCallback({ code: ExportResultCode.SUCCESS });
    }).catch((error) => {
      resultCallback({ code: ExportResultCode.FAILED, error });
    });
  }
  _export(items) {
    return new Promise((resolve, reject) => {
      try {
        this.send(items, resolve, reject);
      } catch (e) {
        reject(e);
      }
    });
  }
  send(items, onSuccess, onError) {
    const decoder = new TextDecoder();
    const exportMessage = JsonTraceSerializer.serializeRequest(items);
    const body = decoder.decode(exportMessage);
    const params = {
      method: "POST",
      headers: this.headers,
      body
    };
    unwrap(fetch)(this.url, params).then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError(new import_otlp_exporter_base.OTLPExporterError(`Exporter received a statusCode: ${response.status}`));
      }
    }).catch((error) => {
      onError(new import_otlp_exporter_base.OTLPExporterError(`Exception during export: ${error.toString()}`, error.code, error.stack));
    });
  }
  async shutdown() {
  }
};
function getSampler() {
  const conf = getActiveConfig();
  if (!conf) {
    console.log("Could not find config for sampling, sending everything by default");
  }
  return conf ? conf.sampling.tailSampler : () => true;
}
__name(getSampler, "getSampler");
var TraceState2 = class {
  static {
    __name(this, "TraceState");
  }
  unexportedSpans = [];
  inprogressSpans = /* @__PURE__ */ new Set();
  exporter;
  exportPromises = [];
  localRootSpan;
  traceDecision;
  constructor(exporter) {
    this.exporter = exporter;
  }
  addSpan(span) {
    const readableSpan = span;
    this.localRootSpan = this.localRootSpan || readableSpan;
    this.unexportedSpans.push(readableSpan);
    this.inprogressSpans.add(span.spanContext().spanId);
  }
  endSpan(span) {
    this.inprogressSpans.delete(span.spanContext().spanId);
    if (this.inprogressSpans.size === 0) {
      this.flush();
    }
  }
  sample() {
    if (this.traceDecision === void 0 && this.unexportedSpans.length > 0) {
      const sampler = getSampler();
      this.traceDecision = sampler({
        traceId: this.localRootSpan.spanContext().traceId,
        localRootSpan: this.localRootSpan,
        spans: this.unexportedSpans
      });
    }
    this.unexportedSpans = this.traceDecision ? this.unexportedSpans : [];
  }
  async flush() {
    if (this.unexportedSpans.length > 0) {
      const unfinishedSpans = this.unexportedSpans.filter((span) => this.isSpanInProgress(span));
      for (const span of unfinishedSpans) {
        console.log(`Span ${span.spanContext().spanId} was not ended properly`);
        span.end();
      }
      this.sample();
      this.exportPromises.push(this.exportSpans(this.unexportedSpans));
      this.unexportedSpans = [];
    }
    if (this.exportPromises.length > 0) {
      await Promise.allSettled(this.exportPromises);
    }
  }
  isSpanInProgress(span) {
    return this.inprogressSpans.has(span.spanContext().spanId);
  }
  async exportSpans(spans) {
    await scheduler.wait(1);
    const promise = new Promise((resolve, reject) => {
      this.exporter.export(spans, (result) => {
        if (result.code === ExportResultCode.SUCCESS) {
          resolve();
        } else {
          console.log("exporting spans failed! " + result.error);
          reject(result.error);
        }
      });
    });
    await promise;
  }
};
var BatchTraceSpanProcessor = class {
  static {
    __name(this, "BatchTraceSpanProcessor");
  }
  constructor(exporter) {
    this.exporter = exporter;
  }
  traces = {};
  getTraceState(traceId) {
    const traceState = this.traces[traceId] || new TraceState2(this.exporter);
    this.traces[traceId] = traceState;
    return traceState;
  }
  onStart(span, _parentContext) {
    const traceId = span.spanContext().traceId;
    this.getTraceState(traceId).addSpan(span);
  }
  onEnd(span) {
    const traceId = span.spanContext().traceId;
    this.getTraceState(traceId).endSpan(span);
  }
  async forceFlush(traceId) {
    if (traceId) {
      await this.getTraceState(traceId).flush();
    } else {
      const promises = Object.values(this.traces).map((traceState) => traceState.flush);
      await Promise.allSettled(promises);
    }
  }
  async shutdown() {
    await this.forceFlush();
  }
};
var configSymbol = Symbol("Otel Workers Tracing Configuration");
function setConfig(config2, ctx = import_api10.context.active()) {
  return ctx.setValue(configSymbol, config2);
}
__name(setConfig, "setConfig");
function getActiveConfig() {
  const config2 = import_api10.context.active().getValue(configSymbol);
  return config2 || void 0;
}
__name(getActiveConfig, "getActiveConfig");
function isSpanExporter(exporterConfig) {
  return !!exporterConfig.export;
}
__name(isSpanExporter, "isSpanExporter");
function isSampler(sampler) {
  return !!sampler.shouldSample;
}
__name(isSampler, "isSampler");
function parseConfig(supplied) {
  if (isSpanProcessorConfig(supplied)) {
    const headSampleConf = supplied.sampling?.headSampler || { ratio: 1 };
    const headSampler = isSampler(headSampleConf) ? headSampleConf : createSampler(headSampleConf);
    const spanProcessors = Array.isArray(supplied.spanProcessors) ? supplied.spanProcessors : [supplied.spanProcessors];
    if (spanProcessors.length === 0) {
      console.log(
        "Warning! You must either specify an exporter or your own SpanProcessor(s)/Exporter combination in the open-telemetry configuration."
      );
    }
    return {
      fetch: {
        includeTraceContext: supplied.fetch?.includeTraceContext ?? true
      },
      handlers: {
        fetch: {
          acceptTraceContext: supplied.handlers?.fetch?.acceptTraceContext ?? true
        }
      },
      postProcessor: supplied.postProcessor || ((spans) => spans),
      sampling: {
        headSampler,
        tailSampler: supplied.sampling?.tailSampler || multiTailSampler([isHeadSampled, isRootErrorSpan])
      },
      service: supplied.service,
      spanProcessors,
      propagator: supplied.propagator || new W3CTraceContextPropagator(),
      instrumentation: {
        instrumentGlobalCache: supplied.instrumentation?.instrumentGlobalCache ?? true,
        instrumentGlobalFetch: supplied.instrumentation?.instrumentGlobalFetch ?? true
      }
    };
  } else {
    const exporter = isSpanExporter(supplied.exporter) ? supplied.exporter : new OTLPExporter(supplied.exporter);
    const spanProcessors = [new BatchTraceSpanProcessor(exporter)];
    const newConfig = Object.assign(supplied, { exporter: void 0, spanProcessors });
    return parseConfig(newConfig);
  }
}
__name(parseConfig, "parseConfig");
var ADD_LISTENER_METHODS = [
  "addListener",
  "on",
  "once",
  "prependListener",
  "prependOnceListener"
];
var AbstractAsyncHooksContextManager = class {
  static {
    __name(this, "AbstractAsyncHooksContextManager");
  }
  /**
   * Binds a the certain context or the active one to the target function and then returns the target
   * @param context A context (span) to be bind to target
   * @param target a function or event emitter. When target or one of its callbacks is called,
   *  the provided context will be used as the active context for the duration of the call.
   */
  bind(context3, target) {
    if (target instanceof EventEmitter2) {
      return this._bindEventEmitter(context3, target);
    }
    if (typeof target === "function") {
      return this._bindFunction(context3, target);
    }
    return target;
  }
  _bindFunction(context3, target) {
    const manager = this;
    const contextWrapper = /* @__PURE__ */ __name(function(...args) {
      return manager.with(context3, () => target.apply(this, args));
    }, "contextWrapper");
    Object.defineProperty(contextWrapper, "length", {
      enumerable: false,
      configurable: true,
      writable: false,
      value: target.length
    });
    return contextWrapper;
  }
  /**
   * By default, EventEmitter call their callback with their context, which we do
   * not want, instead we will bind a specific context to all callbacks that
   * go through it.
   * @param context the context we want to bind
   * @param ee EventEmitter an instance of EventEmitter to patch
   */
  _bindEventEmitter(context3, ee) {
    const map = this._getPatchMap(ee);
    if (map !== void 0) return ee;
    this._createPatchMap(ee);
    ADD_LISTENER_METHODS.forEach((methodName) => {
      if (ee[methodName] === void 0) return;
      ee[methodName] = this._patchAddListener(ee, ee[methodName], context3);
    });
    if (typeof ee.removeListener === "function") {
      ee.removeListener = this._patchRemoveListener(ee, ee.removeListener);
    }
    if (typeof ee.off === "function") {
      ee.off = this._patchRemoveListener(ee, ee.off);
    }
    if (typeof ee.removeAllListeners === "function") {
      ee.removeAllListeners = this._patchRemoveAllListeners(ee, ee.removeAllListeners);
    }
    return ee;
  }
  /**
   * Patch methods that remove a given listener so that we match the "patched"
   * version of that listener (the one that propagate context).
   * @param ee EventEmitter instance
   * @param original reference to the patched method
   */
  _patchRemoveListener(ee, original) {
    const contextManager = this;
    return function(event, listener) {
      const events = contextManager._getPatchMap(ee)?.[event];
      if (events === void 0) {
        return original.call(this, event, listener);
      }
      const patchedListener = events.get(listener);
      return original.call(this, event, patchedListener || listener);
    };
  }
  /**
   * Patch methods that remove all listeners so we remove our
   * internal references for a given event.
   * @param ee EventEmitter instance
   * @param original reference to the patched method
   */
  _patchRemoveAllListeners(ee, original) {
    const contextManager = this;
    return function(event) {
      const map = contextManager._getPatchMap(ee);
      if (map !== void 0) {
        if (arguments.length === 0) {
          contextManager._createPatchMap(ee);
        } else if (map[event] !== void 0) {
          delete map[event];
        }
      }
      return original.apply(this, arguments);
    };
  }
  /**
   * Patch methods on an event emitter instance that can add listeners so we
   * can force them to propagate a given context.
   * @param ee EventEmitter instance
   * @param original reference to the patched method
   * @param [context] context to propagate when calling listeners
   */
  _patchAddListener(ee, original, context3) {
    const contextManager = this;
    return function(event, listener) {
      if (contextManager._wrapped) {
        return original.call(this, event, listener);
      }
      let map = contextManager._getPatchMap(ee);
      if (map === void 0) {
        map = contextManager._createPatchMap(ee);
      }
      let listeners2 = map[event];
      if (listeners2 === void 0) {
        listeners2 = /* @__PURE__ */ new WeakMap();
        map[event] = listeners2;
      }
      const patchedListener = contextManager.bind(context3, listener);
      listeners2.set(listener, patchedListener);
      contextManager._wrapped = true;
      try {
        return original.call(this, event, patchedListener);
      } finally {
        contextManager._wrapped = false;
      }
    };
  }
  _createPatchMap(ee) {
    const map = /* @__PURE__ */ Object.create(null);
    ee[this._kOtListeners] = map;
    return map;
  }
  _getPatchMap(ee) {
    return ee[this._kOtListeners];
  }
  _kOtListeners = Symbol("OtListeners");
  _wrapped = false;
};
var AsyncLocalStorageContextManager = class extends AbstractAsyncHooksContextManager {
  static {
    __name(this, "AsyncLocalStorageContextManager");
  }
  _asyncLocalStorage;
  constructor() {
    super();
    this._asyncLocalStorage = new AsyncLocalStorage();
  }
  active() {
    return this._asyncLocalStorage.getStore() ?? import_api12.ROOT_CONTEXT;
  }
  with(context3, fn, thisArg, ...args) {
    const cb = thisArg == null ? fn : fn.bind(thisArg);
    return this._asyncLocalStorage.run(context3, cb, ...args);
  }
  enable() {
    return this;
  }
  disable() {
    this._asyncLocalStorage.disable();
    return this;
  }
};
function transformExceptionAttributes(exception) {
  const attributes = {};
  if (typeof exception === "string") {
    attributes[import_semantic_conventions.SemanticAttributes.EXCEPTION_MESSAGE] = exception;
  } else {
    if (exception.code) {
      attributes[import_semantic_conventions.SemanticAttributes.EXCEPTION_TYPE] = exception.code.toString();
    } else if (exception.name) {
      attributes[import_semantic_conventions.SemanticAttributes.EXCEPTION_TYPE] = exception.name;
    }
    if (exception.message) {
      attributes[import_semantic_conventions.SemanticAttributes.EXCEPTION_MESSAGE] = exception.message;
    }
    if (exception.stack) {
      attributes[import_semantic_conventions.SemanticAttributes.EXCEPTION_STACKTRACE] = exception.stack;
    }
  }
  return attributes;
}
__name(transformExceptionAttributes, "transformExceptionAttributes");
function millisToHr(millis) {
  return [Math.trunc(millis / 1e3), millis % 1e3 * 1e6];
}
__name(millisToHr, "millisToHr");
function getHrTime(input) {
  const now = Date.now();
  if (!input) {
    return millisToHr(now);
  } else if (input instanceof Date) {
    return millisToHr(input.getTime());
  } else if (typeof input === "number") {
    return millisToHr(input);
  } else if (Array.isArray(input)) {
    return input;
  }
  const v = input;
  throw new Error(`unreachable value: ${JSON.stringify(v)}`);
}
__name(getHrTime, "getHrTime");
function isAttributeKey2(key) {
  return typeof key === "string" && key.length > 0;
}
__name(isAttributeKey2, "isAttributeKey");
var SpanImpl = class {
  static {
    __name(this, "SpanImpl");
  }
  name;
  _spanContext;
  onEnd;
  parentSpanId;
  parentSpanContext;
  kind;
  attributes;
  status = {
    code: import_api14.SpanStatusCode.UNSET
  };
  endTime = [0, 0];
  _duration = [0, 0];
  startTime;
  events = [];
  links;
  resource;
  instrumentationScope = { name: "@microlabs/otel-cf-workers" };
  _ended = false;
  _droppedAttributesCount = 0;
  _droppedEventsCount = 0;
  _droppedLinksCount = 0;
  constructor(init2) {
    this.name = init2.name;
    this._spanContext = init2.spanContext;
    this.parentSpanId = init2.parentSpanId;
    this.parentSpanContext = init2.parentSpanContext;
    this.kind = init2.spanKind || import_api14.SpanKind.INTERNAL;
    this.attributes = sanitizeAttributes(init2.attributes);
    this.startTime = getHrTime(init2.startTime);
    this.links = init2.links || [];
    this.resource = init2.resource;
    this.onEnd = init2.onEnd;
  }
  addLink(link) {
    this.links.push(link);
    return this;
  }
  addLinks(links) {
    this.links.push(...links);
    return this;
  }
  spanContext() {
    return this._spanContext;
  }
  setAttribute(key, value) {
    if (isAttributeKey2(key) && isAttributeValue(value)) {
      this.attributes[key] = value;
    }
    return this;
  }
  setAttributes(attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      this.setAttribute(key, value);
    }
    return this;
  }
  addEvent(name, attributesOrStartTime, startTime) {
    if (isTimeInput(attributesOrStartTime)) {
      startTime = attributesOrStartTime;
      attributesOrStartTime = void 0;
    }
    const attributes = sanitizeAttributes(attributesOrStartTime);
    const time = getHrTime(startTime);
    this.events.push({ name, attributes, time });
    return this;
  }
  setStatus(status) {
    this.status = status;
    return this;
  }
  updateName(name) {
    this.name = name;
    return this;
  }
  end(endTime) {
    if (this._ended) {
      return;
    }
    this._ended = true;
    this.endTime = getHrTime(endTime);
    this._duration = hrTimeDuration(this.startTime, this.endTime);
    this.onEnd(this);
  }
  isRecording() {
    return !this._ended;
  }
  recordException(exception, time) {
    const attributes = transformExceptionAttributes(exception);
    this.addEvent("exception", attributes, time);
  }
  get duration() {
    return this._duration;
  }
  get ended() {
    return this._ended;
  }
  get droppedAttributesCount() {
    return this._droppedAttributesCount;
  }
  get droppedEventsCount() {
    return this._droppedEventsCount;
  }
  get droppedLinksCount() {
    return this._droppedLinksCount;
  }
};
var idGenerator = new RandomIdGenerator();
var withNextSpanAttributes;
function getFlagAt(flagSequence, position) {
  return (flagSequence >> position - 1 & 1) * position;
}
__name(getFlagAt, "getFlagAt");
var WorkerTracer = class {
  static {
    __name(this, "WorkerTracer");
  }
  spanProcessors;
  resource;
  constructor(spanProcessors, resource) {
    this.spanProcessors = spanProcessors;
    this.resource = resource;
  }
  async forceFlush(traceId) {
    const promises = this.spanProcessors.map(async (spanProcessor) => {
      await spanProcessor.forceFlush(traceId);
    });
    await Promise.allSettled(promises);
  }
  addToResource(extra) {
    this.resource.merge(extra);
  }
  startSpan(name, options = {}, context3 = import_api13.context.active()) {
    if (options.root) {
      context3 = import_api13.trace.deleteSpan(context3);
    }
    const config2 = getActiveConfig();
    if (!config2) throw new Error("Config is undefined. This is a bug in the instrumentation logic");
    const parentSpanContext = import_api13.trace.getSpan(context3)?.spanContext();
    const { traceId, randomTraceFlag } = getTraceInfo(parentSpanContext);
    const spanKind = options.kind || import_api13.SpanKind.INTERNAL;
    const sanitisedAttrs = sanitizeAttributes(options.attributes);
    const sampler = config2.sampling.headSampler;
    const samplingDecision = sampler.shouldSample(context3, traceId, name, spanKind, sanitisedAttrs, []);
    const { decision, traceState, attributes: attrs } = samplingDecision;
    const attributes = Object.assign({}, options.attributes, attrs, withNextSpanAttributes);
    withNextSpanAttributes = {};
    const spanId = idGenerator.generateSpanId();
    const parentSpanId = parentSpanContext?.spanId;
    const sampleFlag = decision === SamplingDecision.RECORD_AND_SAMPLED ? import_api13.TraceFlags.SAMPLED : import_api13.TraceFlags.NONE;
    const traceFlags = sampleFlag + randomTraceFlag;
    const spanContext = { traceId, spanId, traceFlags, traceState };
    const span = new SpanImpl({
      attributes: sanitizeAttributes(attributes),
      name,
      onEnd: /* @__PURE__ */ __name((span2) => {
        this.spanProcessors.forEach((sp) => {
          sp.onEnd(span2);
        });
      }, "onEnd"),
      resource: this.resource,
      spanContext,
      parentSpanContext,
      parentSpanId,
      spanKind,
      startTime: options.startTime
    });
    this.spanProcessors.forEach((sp) => {
      sp.onStart(span, context3);
    });
    return span;
  }
  startActiveSpan(name, ...args) {
    const options = args.length > 1 ? args[0] : void 0;
    const parentContext = args.length > 2 ? args[1] : import_api13.context.active();
    const fn = args[args.length - 1];
    const span = this.startSpan(name, options, parentContext);
    const contextWithSpanSet = import_api13.trace.setSpan(parentContext, span);
    return import_api13.context.with(contextWithSpanSet, fn, void 0, span);
  }
};
function getTraceInfo(parentSpanContext) {
  if (parentSpanContext && import_api13.trace.isSpanContextValid(parentSpanContext)) {
    const { traceId, traceFlags } = parentSpanContext;
    return { traceId, randomTraceFlag: getFlagAt(traceFlags, 2) };
  } else {
    return {
      traceId: idGenerator.generateTraceId(),
      randomTraceFlag: 2
      /* RANDOM_TRACE_ID_SET */
    };
  }
}
__name(getTraceInfo, "getTraceInfo");
var WorkerTracerProvider = class {
  static {
    __name(this, "WorkerTracerProvider");
  }
  spanProcessors;
  resource;
  tracers = {};
  constructor(spanProcessors, resource) {
    this.spanProcessors = spanProcessors;
    this.resource = resource;
  }
  getTracer(name, version2, options) {
    const key = `${name}@${version2 || ""}:${options?.schemaUrl || ""}`;
    if (!this.tracers[key]) {
      this.tracers[key] = new WorkerTracer(this.spanProcessors, this.resource);
    }
    return this.tracers[key];
  }
  register() {
    import_api11.trace.setGlobalTracerProvider(this);
    import_api11.context.setGlobalContextManager(new AsyncLocalStorageContextManager());
  }
};
var netKeysFromCF = /* @__PURE__ */ new Set(["colo", "country", "request_priority", "tls_cipher", "tls_version", "asn", "tcp_rtt"]);
var camelToSnakeCase = /* @__PURE__ */ __name((s) => {
  return s.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}, "camelToSnakeCase");
var gatherOutgoingCfAttributes = /* @__PURE__ */ __name((cf) => {
  const attrs = {};
  Object.keys(cf).forEach((key) => {
    const value = cf[key];
    const destKey = camelToSnakeCase(key);
    if (!netKeysFromCF.has(destKey)) {
      if (typeof value === "string" || typeof value === "number") {
        attrs[`cf.${destKey}`] = value;
      } else {
        attrs[`cf.${destKey}`] = JSON.stringify(value);
      }
    }
  });
  return attrs;
}, "gatherOutgoingCfAttributes");
function gatherRequestAttributes(request) {
  const attrs = {};
  const headers = request.headers;
  attrs["http.request.method"] = request.method.toUpperCase();
  attrs["network.protocol.name"] = "http";
  attrs["network.protocol.version"] = request.cf?.httpProtocol;
  attrs["http.request.body.size"] = headers.get("content-length");
  attrs["user_agent.original"] = headers.get("user-agent");
  attrs["http.mime_type"] = headers.get("content-type");
  attrs["http.accepts"] = request.cf?.clientAcceptEncoding;
  const u = new URL(request.url);
  attrs["url.full"] = `${u.protocol}//${u.host}${u.pathname}${u.search}`;
  attrs["server.address"] = u.host;
  attrs["url.scheme"] = u.protocol;
  attrs["url.path"] = u.pathname;
  attrs["url.query"] = u.search;
  return attrs;
}
__name(gatherRequestAttributes, "gatherRequestAttributes");
function gatherResponseAttributes(response) {
  const attrs = {};
  attrs["http.response.status_code"] = response.status;
  if (response.headers.get("content-length") == null) {
    attrs["http.response.body.size"] = response.headers.get("content-length");
  }
  attrs["http.mime_type"] = response.headers.get("content-type");
  return attrs;
}
__name(gatherResponseAttributes, "gatherResponseAttributes");
function gatherIncomingCfAttributes(request) {
  const attrs = {};
  attrs["net.colo"] = request.cf?.colo;
  attrs["net.country"] = request.cf?.country;
  attrs["net.request_priority"] = request.cf?.requestPriority;
  attrs["net.tls_cipher"] = request.cf?.tlsCipher;
  attrs["net.tls_version"] = request.cf?.tlsVersion;
  attrs["net.asn"] = request.cf?.asn;
  attrs["net.tcp_rtt"] = request.cf?.clientTcpRtt;
  return attrs;
}
__name(gatherIncomingCfAttributes, "gatherIncomingCfAttributes");
function getParentContextFromHeaders(headers) {
  return import_api15.propagation.extract(import_api15.context.active(), headers, {
    get(headers2, key) {
      return headers2.get(key) || void 0;
    },
    keys(headers2) {
      return [...headers2.keys()];
    }
  });
}
__name(getParentContextFromHeaders, "getParentContextFromHeaders");
function getParentContextFromRequest(request) {
  const workerConfig = getActiveConfig();
  if (workerConfig === void 0) {
    return import_api15.context.active();
  }
  const acceptTraceContext = typeof workerConfig.handlers.fetch.acceptTraceContext === "function" ? workerConfig.handlers.fetch.acceptTraceContext(request) : workerConfig.handlers.fetch.acceptTraceContext ?? true;
  return acceptTraceContext ? getParentContextFromHeaders(request.headers) : import_api15.context.active();
}
__name(getParentContextFromRequest, "getParentContextFromRequest");
function updateSpanNameOnRoute(span, request) {
  const readable = span;
  if (readable.attributes["http.route"]) {
    const method = request.method.toUpperCase();
    span.updateName(`${method} ${readable.attributes["http.route"]}`);
  }
}
__name(updateSpanNameOnRoute, "updateSpanNameOnRoute");
var fetchInstrumentation = {
  getInitialSpanInfo: /* @__PURE__ */ __name((request) => {
    const spanContext = getParentContextFromRequest(request);
    const attributes = {
      ["faas.trigger"]: "http",
      ["faas.invocation_id"]: request.headers.get("cf-ray") ?? void 0
    };
    Object.assign(attributes, gatherRequestAttributes(request));
    Object.assign(attributes, gatherIncomingCfAttributes(request));
    const method = request.method.toUpperCase();
    return {
      name: `fetchHandler ${method}`,
      options: {
        attributes,
        kind: import_api15.SpanKind.SERVER
      },
      context: spanContext
    };
  }, "getInitialSpanInfo"),
  getAttributesFromResult: /* @__PURE__ */ __name((response) => {
    return gatherResponseAttributes(response);
  }, "getAttributesFromResult"),
  executionSucces: updateSpanNameOnRoute,
  executionFailed: updateSpanNameOnRoute
};
function instrumentClientFetch(fetchFn, configFn, attrs) {
  const handler2 = {
    apply: /* @__PURE__ */ __name((target, thisArg, argArray) => {
      const request = new Request(argArray[0], argArray[1]);
      if (!request.url.startsWith("http")) {
        return Reflect.apply(target, thisArg, argArray);
      }
      const workerConfig = getActiveConfig();
      if (!workerConfig) {
        return Reflect.apply(target, thisArg, [request]);
      }
      const config2 = configFn(workerConfig);
      const tracer2 = import_api15.trace.getTracer("fetcher");
      const options = { kind: import_api15.SpanKind.CLIENT, attributes: attrs };
      const host = new URL(request.url).host;
      const method = request.method.toUpperCase();
      const spanName = typeof attrs?.["name"] === "string" ? attrs?.["name"] : `fetch ${method} ${host}`;
      const promise = tracer2.startActiveSpan(spanName, options, async (span) => {
        try {
          const includeTraceContext = typeof config2.includeTraceContext === "function" ? config2.includeTraceContext(request) : config2.includeTraceContext;
          if (includeTraceContext ?? true) {
            import_api15.propagation.inject(import_api15.context.active(), request.headers, {
              set: /* @__PURE__ */ __name((h, k, v) => h.set(k, typeof v === "string" ? v : String(v)), "set")
            });
          }
          span.setAttributes(gatherRequestAttributes(request));
          if (request.cf) span.setAttributes(gatherOutgoingCfAttributes(request.cf));
          const response = await Reflect.apply(target, thisArg, [request]);
          span.setAttributes(gatherResponseAttributes(response));
          return response;
        } catch (error) {
          span.recordException(error);
          span.setStatus({ code: import_api15.SpanStatusCode.ERROR });
          throw error;
        } finally {
          span.end();
        }
      });
      return promise;
    }, "apply")
  };
  return wrap(fetchFn, handler2, true);
}
__name(instrumentClientFetch, "instrumentClientFetch");
function instrumentGlobalFetch() {
  globalThis.fetch = instrumentClientFetch(globalThis.fetch, (config2) => config2.fetch);
}
__name(instrumentGlobalFetch, "instrumentGlobalFetch");
var tracer = import_api16.trace.getTracer("cache instrumentation");
function sanitiseURL(url) {
  const u = new URL(url);
  return `${u.protocol}//${u.host}${u.pathname}${u.search}`;
}
__name(sanitiseURL, "sanitiseURL");
function instrumentFunction(fn, cacheName, op) {
  const handler2 = {
    async apply(target, thisArg, argArray) {
      const attributes = {
        "cache.name": cacheName,
        "http.url": argArray[0].url ? sanitiseURL(argArray[0].url) : void 0,
        "cache.operation": op
      };
      const options = { kind: import_api16.SpanKind.CLIENT, attributes };
      return tracer.startActiveSpan(`Cache ${cacheName} ${op}`, options, async (span) => {
        const result = await Reflect.apply(target, thisArg, argArray);
        if (op === "match") {
          span.setAttribute("cache.hit", !!result);
        }
        span.end();
        return result;
      });
    }
  };
  return wrap(fn, handler2);
}
__name(instrumentFunction, "instrumentFunction");
function instrumentCache(cache, cacheName) {
  const handler2 = {
    get(target, prop) {
      if (prop === "delete" || prop === "match" || prop === "put") {
        const fn = Reflect.get(target, prop).bind(target);
        return instrumentFunction(fn, cacheName, prop);
      } else {
        return Reflect.get(target, prop);
      }
    }
  };
  return wrap(cache, handler2);
}
__name(instrumentCache, "instrumentCache");
function instrumentOpen(openFn) {
  const handler2 = {
    async apply(target, thisArg, argArray) {
      const cacheName = argArray[0];
      const cache = await Reflect.apply(target, thisArg, argArray);
      return instrumentCache(cache, cacheName);
    }
  };
  return wrap(openFn, handler2);
}
__name(instrumentOpen, "instrumentOpen");
function _instrumentGlobalCache() {
  const handler2 = {
    get(target, prop) {
      if (prop === "default") {
        const cache = target.default;
        return instrumentCache(cache, "default");
      } else if (prop === "open") {
        const openFn = Reflect.get(target, prop).bind(target);
        return instrumentOpen(openFn);
      } else {
        return Reflect.get(target, prop);
      }
    }
  };
  globalThis.caches = wrap(caches, handler2);
}
__name(_instrumentGlobalCache, "_instrumentGlobalCache");
function instrumentGlobalCache() {
  return _instrumentGlobalCache();
}
__name(instrumentGlobalCache, "instrumentGlobalCache");
var MessageStatusCount = class {
  static {
    __name(this, "MessageStatusCount");
  }
  succeeded = 0;
  failed = 0;
  implicitly_acked = 0;
  implicitly_retried = 0;
  total;
  constructor(total) {
    this.total = total;
  }
  ack() {
    this.succeeded = this.succeeded + 1;
  }
  ackRemaining() {
    this.implicitly_acked = this.total - this.succeeded - this.failed;
    this.succeeded = this.total - this.failed;
  }
  retry() {
    this.failed = this.failed + 1;
  }
  retryRemaining() {
    this.implicitly_retried = this.total - this.succeeded - this.failed;
    this.failed = this.total - this.succeeded;
  }
  toAttributes() {
    return {
      "queue.messages_count": this.total,
      "queue.messages_success": this.succeeded,
      "queue.messages_failed": this.failed,
      "queue.batch_success": this.succeeded === this.total,
      "queue.implicitly_acked": this.implicitly_acked,
      "queue.implicitly_retried": this.implicitly_retried
    };
  }
};
var addEvent = /* @__PURE__ */ __name((name, msg) => {
  const attrs = {};
  if (msg) {
    attrs["queue.message_id"] = msg.id;
    attrs["queue.message_timestamp"] = msg.timestamp.toISOString();
  }
  import_api17.trace.getActiveSpan()?.addEvent(name, attrs);
}, "addEvent");
var proxyQueueMessage = /* @__PURE__ */ __name((msg, count) => {
  const msgHandler = {
    get: /* @__PURE__ */ __name((target, prop) => {
      if (prop === "ack") {
        const ackFn = Reflect.get(target, prop);
        return new Proxy(ackFn, {
          apply: /* @__PURE__ */ __name((fnTarget) => {
            addEvent("messageAck", msg);
            count.ack();
            Reflect.apply(fnTarget, msg, []);
          }, "apply")
        });
      } else if (prop === "retry") {
        const retryFn = Reflect.get(target, prop);
        return new Proxy(retryFn, {
          apply: /* @__PURE__ */ __name((fnTarget) => {
            addEvent("messageRetry", msg);
            count.retry();
            const result = Reflect.apply(fnTarget, msg, []);
            return result;
          }, "apply")
        });
      } else {
        return Reflect.get(target, prop, msg);
      }
    }, "get")
  };
  return wrap(msg, msgHandler);
}, "proxyQueueMessage");
var proxyMessageBatch = /* @__PURE__ */ __name((batch, count) => {
  const batchHandler = {
    get: /* @__PURE__ */ __name((target, prop) => {
      if (prop === "messages") {
        const messages = Reflect.get(target, prop);
        const messagesHandler = {
          get: /* @__PURE__ */ __name((target2, prop2) => {
            if (typeof prop2 === "string" && !isNaN(parseInt(prop2))) {
              const message = Reflect.get(target2, prop2);
              return proxyQueueMessage(message, count);
            } else {
              return Reflect.get(target2, prop2);
            }
          }, "get")
        };
        return wrap(messages, messagesHandler);
      } else if (prop === "ackAll") {
        const ackFn = Reflect.get(target, prop);
        return new Proxy(ackFn, {
          apply: /* @__PURE__ */ __name((fnTarget) => {
            addEvent("ackAll");
            count.ackRemaining();
            Reflect.apply(fnTarget, batch, []);
          }, "apply")
        });
      } else if (prop === "retryAll") {
        const retryFn = Reflect.get(target, prop);
        return new Proxy(retryFn, {
          apply: /* @__PURE__ */ __name((fnTarget) => {
            addEvent("retryAll");
            count.retryRemaining();
            Reflect.apply(fnTarget, batch, []);
          }, "apply")
        });
      }
      return Reflect.get(target, prop);
    }, "get")
  };
  return wrap(batch, batchHandler);
}, "proxyMessageBatch");
var QueueInstrumentation = class {
  static {
    __name(this, "QueueInstrumentation");
  }
  count;
  getInitialSpanInfo(batch) {
    return {
      name: `queueHandler ${batch.queue}`,
      options: {
        attributes: {
          [import_incubating.ATTR_FAAS_TRIGGER]: import_incubating.FAAS_TRIGGER_VALUE_PUBSUB,
          "queue.name": batch.queue
        },
        kind: import_api17.SpanKind.CONSUMER
      }
    };
  }
  instrumentTrigger(batch) {
    this.count = new MessageStatusCount(batch.messages.length);
    return proxyMessageBatch(batch, this.count);
  }
  executionSucces(span) {
    if (this.count) {
      this.count.ackRemaining();
      span.setAttributes(this.count.toAttributes());
    }
  }
  executionFailed(span) {
    if (this.count) {
      this.count.retryRemaining();
      span.setAttributes(this.count.toAttributes());
    }
  }
};
function instrumentQueueSend(fn, name) {
  const tracer2 = import_api17.trace.getTracer("queueSender");
  const handler2 = {
    apply: /* @__PURE__ */ __name((target, thisArg, argArray) => {
      return tracer2.startActiveSpan(`Queues ${name} send`, async (span) => {
        span.setAttribute("queue.operation", "send");
        await Reflect.apply(target, unwrap(thisArg), argArray);
        span.end();
      });
    }, "apply")
  };
  return wrap(fn, handler2);
}
__name(instrumentQueueSend, "instrumentQueueSend");
function instrumentQueueSendBatch(fn, name) {
  const tracer2 = import_api17.trace.getTracer("queueSender");
  const handler2 = {
    apply: /* @__PURE__ */ __name((target, thisArg, argArray) => {
      return tracer2.startActiveSpan(`Queues ${name} sendBatch`, async (span) => {
        span.setAttribute("queue.operation", "sendBatch");
        await Reflect.apply(target, unwrap(thisArg), argArray);
        span.end();
      });
    }, "apply")
  };
  return wrap(fn, handler2);
}
__name(instrumentQueueSendBatch, "instrumentQueueSendBatch");
function instrumentQueueSender(queue, name) {
  const queueHandler = {
    get: /* @__PURE__ */ __name((target, prop) => {
      if (prop === "send") {
        const sendFn = Reflect.get(target, prop);
        return instrumentQueueSend(sendFn, name);
      } else if (prop === "sendBatch") {
        const sendFn = Reflect.get(target, prop);
        return instrumentQueueSendBatch(sendFn, name);
      } else {
        return Reflect.get(target, prop);
      }
    }, "get")
  };
  return wrap(queue, queueHandler);
}
__name(instrumentQueueSender, "instrumentQueueSender");
var dbSystem = "Cloudflare KV";
var KVAttributes = {
  delete(_argArray) {
    return {};
  },
  get(argArray) {
    const attrs = {};
    const opts = argArray[1];
    if (typeof opts === "string") {
      attrs["db.cf.kv.type"] = opts;
    } else if (typeof opts === "object") {
      attrs["db.cf.kv.type"] = opts.type;
      attrs["db.cf.kv.cache_ttl"] = opts.cacheTtl;
    }
    return attrs;
  },
  getWithMetadata(argArray, result) {
    const attrs = {};
    const opts = argArray[1];
    if (typeof opts === "string") {
      attrs["db.cf.kv.type"] = opts;
    } else if (typeof opts === "object") {
      attrs["db.cf.kv.type"] = opts.type;
      attrs["db.cf.kv.cache_ttl"] = opts.cacheTtl;
    }
    attrs["db.cf.kv.metadata"] = true;
    const { cacheStatus } = result;
    if (typeof cacheStatus === "string") {
      attrs["db.cf.kv.cache_status"] = cacheStatus;
    }
    return attrs;
  },
  list(argArray, result) {
    const attrs = {};
    const opts = argArray[0] || {};
    const { cursor, limit } = opts;
    attrs["db.cf.kv.list_request_cursor"] = cursor || void 0;
    attrs["db.cf.kv.list_limit"] = limit || void 0;
    const { list_complete, cacheStatus } = result;
    attrs["db.cf.kv.list_complete"] = list_complete || void 0;
    if (!list_complete) {
      attrs["db.cf.kv.list_response_cursor"] = cursor || void 0;
    }
    if (typeof cacheStatus === "string") {
      attrs["db.cf.kv.cache_status"] = cacheStatus;
    }
    return attrs;
  },
  put(argArray) {
    const attrs = {};
    if (argArray.length > 2 && argArray[2]) {
      const { expiration, expirationTtl, metadata } = argArray[2];
      attrs["db.cf.kv.expiration"] = expiration;
      attrs["db.cf.kv.expiration_ttl"] = expirationTtl;
      attrs["db.cf.kv.metadata"] = !!metadata;
    }
    return attrs;
  }
};
function instrumentKVFn(fn, name, operation) {
  const tracer2 = import_api18.trace.getTracer("KV");
  const fnHandler = {
    apply: /* @__PURE__ */ __name((target, thisArg, argArray) => {
      const attributes = {
        binding_type: "KV",
        [import_semantic_conventions2.SemanticAttributes.DB_NAME]: name,
        [import_semantic_conventions2.SemanticAttributes.DB_SYSTEM]: dbSystem,
        [import_semantic_conventions2.SemanticAttributes.DB_OPERATION]: operation
      };
      const options = {
        kind: import_api18.SpanKind.CLIENT,
        attributes
      };
      return tracer2.startActiveSpan(`KV ${name} ${operation}`, options, async (span) => {
        const result = await Reflect.apply(target, thisArg, argArray);
        const extraAttrsFn = KVAttributes[operation];
        const extraAttrs = extraAttrsFn ? extraAttrsFn(argArray, result) : {};
        span.setAttributes(extraAttrs);
        if (operation === "list") {
          const opts = argArray[0] || {};
          const { prefix } = opts;
          span.setAttribute(import_semantic_conventions2.SemanticAttributes.DB_STATEMENT, `${operation} ${prefix || void 0}`);
        } else {
          span.setAttribute(import_semantic_conventions2.SemanticAttributes.DB_STATEMENT, `${operation} ${argArray[0]}`);
          span.setAttribute("db.cf.kv.key", argArray[0]);
        }
        if (operation === "getWithMetadata") {
          const hasResults = !!result && !!result.value;
          span.setAttribute("db.cf.kv.has_result", hasResults);
        } else {
          span.setAttribute("db.cf.kv.has_result", !!result);
        }
        span.end();
        return result;
      });
    }, "apply")
  };
  return wrap(fn, fnHandler);
}
__name(instrumentKVFn, "instrumentKVFn");
function instrumentKV(kv, name) {
  const kvHandler = {
    get: /* @__PURE__ */ __name((target, prop, receiver) => {
      const operation = String(prop);
      const fn = Reflect.get(target, prop, receiver);
      return instrumentKVFn(fn, name, operation);
    }, "get")
  };
  return wrap(kv, kvHandler);
}
__name(instrumentKV, "instrumentKV");
function instrumentServiceBinding(fetcher, envName) {
  const fetcherHandler = {
    get(target, prop) {
      if (prop === "fetch") {
        const fetcher2 = Reflect.get(target, prop);
        const attrs = {
          name: `Service Binding ${envName}`
        };
        return instrumentClientFetch(fetcher2, () => ({ includeTraceContext: true }), attrs);
      } else {
        return passthroughGet(target, prop);
      }
    }
  };
  return wrap(fetcher, fetcherHandler);
}
__name(instrumentServiceBinding, "instrumentServiceBinding");
var dbSystem2 = "Cloudflare D1";
function metaAttributes(meta) {
  return {
    "db.cf.d1.rows_read": meta.rows_read,
    "db.cf.d1.rows_written": meta.rows_written,
    "db.cf.d1.duration": meta.duration,
    "db.cf.d1.size_after": meta.size_after,
    "db.cf.d1.last_row_id": meta.last_row_id,
    "db.cf.d1.changed_db": meta.changed_db,
    "db.cf.d1.changes": meta.changes
  };
}
__name(metaAttributes, "metaAttributes");
function spanOptions(dbName, operation, sql) {
  const attributes = {
    binding_type: "D1",
    [import_semantic_conventions3.SemanticAttributes.DB_NAME]: dbName,
    [import_semantic_conventions3.SemanticAttributes.DB_SYSTEM]: dbSystem2,
    [import_semantic_conventions3.SemanticAttributes.DB_OPERATION]: operation
  };
  if (sql) {
    attributes[import_semantic_conventions3.SemanticAttributes.DB_STATEMENT] = sql;
  }
  return {
    kind: import_api19.SpanKind.CLIENT,
    attributes
  };
}
__name(spanOptions, "spanOptions");
function instrumentD1StatementFn(fn, dbName, operation, sql) {
  const tracer2 = import_api19.trace.getTracer("D1");
  const fnHandler = {
    apply: /* @__PURE__ */ __name((target, thisArg, argArray) => {
      if (operation === "bind") {
        const newStmt = Reflect.apply(target, thisArg, argArray);
        return instrumentD1PreparedStatement(newStmt, dbName, sql);
      }
      const options = spanOptions(dbName, operation, sql);
      return tracer2.startActiveSpan(`${dbName} ${operation}`, options, async (span) => {
        try {
          const result = await Reflect.apply(target, thisArg, argArray);
          if (operation === "all" || operation === "run") {
            span.setAttributes(metaAttributes(result.meta));
          }
          span.setStatus({ code: import_api19.SpanStatusCode.OK });
          return result;
        } catch (error) {
          span.recordException(error);
          span.setStatus({ code: import_api19.SpanStatusCode.ERROR });
          throw error;
        } finally {
          span.end();
        }
      });
    }, "apply")
  };
  return wrap(fn, fnHandler);
}
__name(instrumentD1StatementFn, "instrumentD1StatementFn");
function instrumentD1PreparedStatement(stmt, dbName, statement) {
  const statementHandler = {
    get: /* @__PURE__ */ __name((target, prop, receiver) => {
      const operation = String(prop);
      const fn = Reflect.get(target, prop, receiver);
      if (typeof fn === "function") {
        return instrumentD1StatementFn(fn, dbName, operation, statement);
      }
      return fn;
    }, "get")
  };
  return wrap(stmt, statementHandler);
}
__name(instrumentD1PreparedStatement, "instrumentD1PreparedStatement");
function instrumentD1Fn(fn, dbName, operation) {
  const tracer2 = import_api19.trace.getTracer("D1");
  const fnHandler = {
    apply: /* @__PURE__ */ __name((target, thisArg, argArray) => {
      if (operation === "prepare") {
        const sql = argArray[0];
        const stmt = Reflect.apply(target, thisArg, argArray);
        return instrumentD1PreparedStatement(stmt, dbName, sql);
      } else if (operation === "exec") {
        const sql = argArray[0];
        const options = spanOptions(dbName, operation, sql);
        return tracer2.startActiveSpan(`${dbName} ${operation}`, options, async (span) => {
          try {
            const result = await Reflect.apply(target, thisArg, argArray);
            span.setStatus({ code: import_api19.SpanStatusCode.OK });
            return result;
          } catch (error) {
            span.recordException(error);
            span.setStatus({ code: import_api19.SpanStatusCode.ERROR });
            throw error;
          } finally {
            span.end();
          }
        });
      } else if (operation === "batch") {
        const statements = argArray[0];
        return tracer2.startActiveSpan(`${dbName} ${operation}`, async (span) => {
          const subSpans = statements.map(
            (s) => tracer2.startSpan(`${dbName} ${operation} > query`, spanOptions(dbName, operation, s.statement))
          );
          try {
            const result = await Reflect.apply(target, thisArg, argArray);
            result.forEach((r, i) => subSpans[i]?.setAttributes(metaAttributes(r.meta)));
            span.setStatus({ code: import_api19.SpanStatusCode.OK });
            return result;
          } catch (error) {
            span.recordException(error);
            span.setStatus({ code: import_api19.SpanStatusCode.ERROR });
            throw error;
          } finally {
            subSpans.forEach((s) => s.end());
            span.end();
          }
        });
      } else {
        return Reflect.apply(target, thisArg, argArray);
      }
    }, "apply")
  };
  return wrap(fn, fnHandler);
}
__name(instrumentD1Fn, "instrumentD1Fn");
function instrumentD1(database, dbName) {
  const dbHandler = {
    get: /* @__PURE__ */ __name((target, prop, receiver) => {
      const operation = String(prop);
      const fn = Reflect.get(target, prop, receiver);
      if (typeof fn === "function") {
        return instrumentD1Fn(fn, dbName, operation);
      }
      return fn;
    }, "get")
  };
  return wrap(database, dbHandler);
}
__name(instrumentD1, "instrumentD1");
var dbSystem3 = "Cloudflare Analytics Engine";
var AEAttributes = {
  writeDataPoint(argArray) {
    const attrs = {};
    const opts = argArray[0];
    if (typeof opts === "object") {
      attrs["db.cf.ae.indexes"] = opts.indexes.length;
      attrs["db.cf.ae.index"] = opts.indexes[0].toString();
      attrs["db.cf.ae.doubles"] = opts.doubles.length;
      attrs["db.cf.ae.blobs"] = opts.blobs.length;
    }
    return attrs;
  }
};
function instrumentAEFn(fn, name, operation) {
  const tracer2 = import_api20.trace.getTracer("AnalyticsEngine");
  const fnHandler = {
    apply: /* @__PURE__ */ __name((target, thisArg, argArray) => {
      const attributes = {
        binding_type: "AnalyticsEngine",
        [import_semantic_conventions4.SemanticAttributes.DB_NAME]: name,
        [import_semantic_conventions4.SemanticAttributes.DB_SYSTEM]: dbSystem3,
        [import_semantic_conventions4.SemanticAttributes.DB_OPERATION]: operation
      };
      const options = {
        kind: import_api20.SpanKind.CLIENT,
        attributes
      };
      return tracer2.startActiveSpan(`Analytics Engine ${name} ${operation}`, options, async (span) => {
        const result = await Reflect.apply(target, thisArg, argArray);
        const extraAttrsFn = AEAttributes[operation];
        const extraAttrs = extraAttrsFn ? extraAttrsFn(argArray, result) : {};
        span.setAttributes(extraAttrs);
        span.setAttribute(import_semantic_conventions4.SemanticAttributes.DB_STATEMENT, `${operation} ${argArray[0]}`);
        span.end();
        return result;
      });
    }, "apply")
  };
  return wrap(fn, fnHandler);
}
__name(instrumentAEFn, "instrumentAEFn");
function instrumentAnalyticsEngineDataset(dataset, name) {
  const datasetHandler = {
    get: /* @__PURE__ */ __name((target, prop, receiver) => {
      const operation = String(prop);
      const fn = Reflect.get(target, prop, receiver);
      return instrumentAEFn(fn, name, operation);
    }, "get")
  };
  return wrap(dataset, datasetHandler);
}
__name(instrumentAnalyticsEngineDataset, "instrumentAnalyticsEngineDataset");
var isJSRPC = /* @__PURE__ */ __name((item) => {
  return !!item?.["__some_property_that_will_never_exist" + Math.random()];
}, "isJSRPC");
var isKVNamespace = /* @__PURE__ */ __name((item) => {
  return !isJSRPC(item) && !!item?.getWithMetadata;
}, "isKVNamespace");
var isQueue = /* @__PURE__ */ __name((item) => {
  return !isJSRPC(item) && !!item?.sendBatch;
}, "isQueue");
var isDurableObject = /* @__PURE__ */ __name((item) => {
  return !isJSRPC(item) && !!item?.idFromName;
}, "isDurableObject");
var isVersionMetadata = /* @__PURE__ */ __name((item) => {
  return !isJSRPC(item) && typeof item?.id === "string" && typeof item?.tag === "string";
}, "isVersionMetadata");
var isAnalyticsEngineDataset = /* @__PURE__ */ __name((item) => {
  return !isJSRPC(item) && !!item?.writeDataPoint;
}, "isAnalyticsEngineDataset");
var isD1Database = /* @__PURE__ */ __name((item) => {
  return !!item?.exec && !!item?.prepare;
}, "isD1Database");
var instrumentEnv = /* @__PURE__ */ __name((env2) => {
  const envHandler = {
    get: /* @__PURE__ */ __name((target, prop, receiver) => {
      const item = Reflect.get(target, prop, receiver);
      if (!isProxyable(item)) {
        return item;
      }
      if (isJSRPC(item)) {
        return instrumentServiceBinding(item, String(prop));
      } else if (isKVNamespace(item)) {
        return instrumentKV(item, String(prop));
      } else if (isQueue(item)) {
        return instrumentQueueSender(item, String(prop));
      } else if (isDurableObject(item)) {
        return instrumentDOBinding(item, String(prop));
      } else if (isVersionMetadata(item)) {
        return item;
      } else if (isAnalyticsEngineDataset(item)) {
        return instrumentAnalyticsEngineDataset(item, String(prop));
      } else if (isD1Database(item)) {
        return instrumentD1(item, String(prop));
      } else {
        return item;
      }
    }, "get")
  };
  return wrap(env2, envHandler);
}, "instrumentEnv");
function instrumentBindingStub(stub, nsName) {
  const stubHandler = {
    get(target, prop, receiver) {
      if (prop === "fetch") {
        const fetcher = Reflect.get(target, prop);
        const attrs = {
          name: `Durable Object ${nsName}`,
          "do.namespace": nsName,
          "do.id": target.id.toString(),
          "do.id.name": target.id.name
        };
        return instrumentClientFetch(fetcher, () => ({ includeTraceContext: true }), attrs);
      } else {
        return passthroughGet(target, prop, receiver);
      }
    }
  };
  return wrap(stub, stubHandler);
}
__name(instrumentBindingStub, "instrumentBindingStub");
function instrumentBindingGet(getFn, nsName) {
  const getHandler = {
    apply(target, thisArg, argArray) {
      const stub = Reflect.apply(target, thisArg, argArray);
      return instrumentBindingStub(stub, nsName);
    }
  };
  return wrap(getFn, getHandler);
}
__name(instrumentBindingGet, "instrumentBindingGet");
function instrumentDOBinding(ns, nsName) {
  const nsHandler = {
    get(target, prop, receiver) {
      if (prop === "get") {
        const fn = Reflect.get(ns, prop, receiver);
        return instrumentBindingGet(fn, nsName);
      } else {
        return passthroughGet(target, prop, receiver);
      }
    }
  };
  return wrap(ns, nsHandler);
}
__name(instrumentDOBinding, "instrumentDOBinding");
var scheduledInstrumentation = {
  getInitialSpanInfo: /* @__PURE__ */ __name(function(controller) {
    return {
      name: `scheduledHandler ${controller.cron}`,
      options: {
        attributes: {
          [import_incubating2.ATTR_FAAS_TRIGGER]: import_incubating2.FAAS_TRIGGER_VALUE_TIMER,
          [import_incubating2.ATTR_FAAS_CRON]: controller.cron,
          [import_incubating2.ATTR_FAAS_TIME]: new Date(controller.scheduledTime).toISOString()
        },
        kind: import_api21.SpanKind.INTERNAL
      }
    };
  }, "getInitialSpanInfo")
};
function versionAttributes(env2) {
  const attributes = {};
  if (typeof env2 === "object" && env2 !== null) {
    for (const [binding2, data] of Object.entries(env2)) {
      if (isVersionMetadata(data)) {
        attributes["cf.workers_version_metadata.binding"] = binding2;
        attributes["cf.workers_version_metadata.id"] = data.id;
        attributes["cf.workers_version_metadata.tag"] = data.tag;
        break;
      }
    }
  }
  return attributes;
}
__name(versionAttributes, "versionAttributes");
var PromiseTracker = class {
  static {
    __name(this, "PromiseTracker");
  }
  _outstandingPromises = [];
  get outstandingPromiseCount() {
    return this._outstandingPromises.length;
  }
  track(promise) {
    this._outstandingPromises.push(promise);
  }
  async wait() {
    await allSettledMutable(this._outstandingPromises);
  }
};
function createWaitUntil(fn, context3, tracker) {
  const handler2 = {
    apply(target, _thisArg, argArray) {
      tracker.track(argArray[0]);
      return Reflect.apply(target, context3, argArray);
    }
  };
  return wrap(fn, handler2);
}
__name(createWaitUntil, "createWaitUntil");
function proxyExecutionContext(context3) {
  const tracker = new PromiseTracker();
  const ctx = new Proxy(context3, {
    get(target, prop) {
      if (prop === "waitUntil") {
        const fn = Reflect.get(target, prop);
        return createWaitUntil(fn, context3, tracker);
      } else {
        return passthroughGet(target, prop);
      }
    }
  });
  return { ctx, tracker };
}
__name(proxyExecutionContext, "proxyExecutionContext");
async function allSettledMutable(promises) {
  let values;
  do {
    values = await Promise.allSettled(promises);
  } while (values.length !== promises.length);
  return values;
}
__name(allSettledMutable, "allSettledMutable");
function headerAttributes(message) {
  return Object.fromEntries([...message.headers].map(([key, value]) => [`email.header.${key}`, value]));
}
__name(headerAttributes, "headerAttributes");
var emailInstrumentation = {
  getInitialSpanInfo: /* @__PURE__ */ __name((message) => {
    const attributes = {
      [import_incubating3.ATTR_FAAS_TRIGGER]: "other",
      [import_incubating3.ATTR_RPC_MESSAGE_ID]: message.headers.get("Message-Id") ?? void 0,
      [import_incubating3.ATTR_MESSAGING_DESTINATION_NAME]: message.to
    };
    Object.assign(attributes, headerAttributes(message));
    const options = {
      attributes,
      kind: import_api22.SpanKind.CONSUMER
    };
    return {
      name: `emailHandler ${message.to}`,
      options
    };
  }, "getInitialSpanInfo")
};
var createResource2 = /* @__PURE__ */ __name((config2) => {
  const workerResourceAttrs = {
    "cloud.provider": "cloudflare",
    "cloud.platform": "cloudflare.workers",
    "cloud.region": "earth",
    "faas.max_memory": 134217728,
    "telemetry.sdk.language": "js",
    "telemetry.sdk.name": "@microlabs/otel-cf-workers",
    "telemetry.sdk.version": _microlabs_otel_cf_workers,
    "telemetry.sdk.build.node_version": node
  };
  const serviceResource = resourceFromAttributes({
    "service.name": config2.service.name,
    "service.namespace": config2.service.namespace,
    "service.version": config2.service.version
  });
  const resource = resourceFromAttributes(workerResourceAttrs);
  return resource.merge(serviceResource);
}, "createResource");
var initialised = false;
function init(config2) {
  if (!initialised) {
    if (config2.instrumentation.instrumentGlobalCache) {
      instrumentGlobalCache();
    }
    if (config2.instrumentation.instrumentGlobalFetch) {
      instrumentGlobalFetch();
    }
    import_api9.propagation.setGlobalPropagator(config2.propagator);
    const resource = createResource2(config2);
    const provider = new WorkerTracerProvider(config2.spanProcessors, resource);
    provider.register();
    initialised = true;
  }
}
__name(init, "init");
function createInitialiser(config2) {
  if (typeof config2 === "function") {
    return (env2, trigger) => {
      const conf = parseConfig(config2(env2, trigger));
      init(conf);
      return conf;
    };
  } else {
    return () => {
      const conf = parseConfig(config2);
      init(conf);
      return conf;
    };
  }
}
__name(createInitialiser, "createInitialiser");
async function exportSpans(traceId, tracker) {
  const tracer2 = import_api9.trace.getTracer("export");
  if (tracer2 instanceof WorkerTracer) {
    await scheduler.wait(1);
    await tracker?.wait();
    await tracer2.forceFlush(traceId);
  } else {
    console.error("The global tracer is not of type WorkerTracer and can not export spans");
  }
}
__name(exportSpans, "exportSpans");
var cold_start2 = true;
function createHandlerFlowFn(instrumentation) {
  return (handlerFn, args) => {
    const [trigger, env2, context3] = args;
    const proxiedEnv = instrumentEnv(env2);
    const { ctx: proxiedCtx, tracker } = proxyExecutionContext(context3);
    const instrumentedTrigger = instrumentation.instrumentTrigger ? instrumentation.instrumentTrigger(trigger) : trigger;
    const tracer2 = import_api9.trace.getTracer("handler");
    const { name, options, context: spanContext } = instrumentation.getInitialSpanInfo(trigger);
    const attrs = options.attributes || {};
    attrs["faas.coldstart"] = cold_start2;
    options.attributes = attrs;
    Object.assign(attrs, versionAttributes(env2));
    cold_start2 = false;
    const parentContext = spanContext || import_api9.context.active();
    const result = tracer2.startActiveSpan(name, options, parentContext, async (span) => {
      try {
        const result2 = await handlerFn(instrumentedTrigger, proxiedEnv, proxiedCtx);
        if (instrumentation.getAttributesFromResult) {
          const attributes = instrumentation.getAttributesFromResult(result2);
          span.setAttributes(attributes);
        }
        if (instrumentation.executionSucces) {
          instrumentation.executionSucces(span, trigger, result2);
        }
        return result2;
      } catch (error) {
        span.recordException(error);
        span.setStatus({ code: import_api9.SpanStatusCode.ERROR });
        if (instrumentation.executionFailed) {
          instrumentation.executionFailed(span, trigger, error);
        }
        throw error;
      } finally {
        span.end();
        context3.waitUntil(exportSpans(span.spanContext().traceId, tracker));
      }
    });
    return result;
  };
}
__name(createHandlerFlowFn, "createHandlerFlowFn");
function createHandlerProxy(handler2, handlerFn, initialiser, instrumentation) {
  return (trigger, env2, ctx) => {
    const config2 = initialiser(env2, trigger);
    const context3 = setConfig(config2);
    const flowFn = createHandlerFlowFn(instrumentation);
    return import_api9.context.with(context3, flowFn, handler2, handlerFn, [trigger, env2, ctx]);
  };
}
__name(createHandlerProxy, "createHandlerProxy");
function instrument(handler2, config2) {
  const initialiser = createInitialiser(config2);
  if (handler2.fetch) {
    const fetcher = unwrap(handler2.fetch);
    handler2.fetch = createHandlerProxy(handler2, fetcher, initialiser, fetchInstrumentation);
  }
  if (handler2.scheduled) {
    const scheduler2 = unwrap(handler2.scheduled);
    handler2.scheduled = createHandlerProxy(handler2, scheduler2, initialiser, scheduledInstrumentation);
  }
  if (handler2.queue) {
    const queuer = unwrap(handler2.queue);
    handler2.queue = createHandlerProxy(handler2, queuer, initialiser, new QueueInstrumentation());
  }
  if (handler2.email) {
    const emailer = unwrap(handler2.email);
    handler2.email = createHandlerProxy(handler2, emailer, initialiser, emailInstrumentation);
  }
  return handler2;
}
__name(instrument, "instrument");
var __unwrappedFetch = unwrap(fetch);

// ../../node_modules/hono/dist/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/hono/dist/hono.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/hono/dist/hono-base.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/hono/dist/compose.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context3, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler2;
      if (middleware[i]) {
        handler2 = middleware[i][0][0];
        context3.req.routeIndex = i;
      } else {
        handler2 = i === middleware.length && next || void 0;
      }
      if (handler2) {
        try {
          res = await handler2(context3, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context3.error = err;
            res = await onError(err, context3);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context3.finalized === false && onNotFound) {
          res = await onNotFound(context3);
        }
      }
      if (res && (context3.finalized === false || isError)) {
        context3.res = res;
      }
      return context3;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// ../../node_modules/hono/dist/context.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/hono/dist/request.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/hono/dist/http-exception.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/hono/dist/request/constants.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// ../../node_modules/hono/dist/utils/body.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");

// ../../node_modules/hono/dist/utils/url.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const path = url.slice(start, queryIndex === -1 ? void 0 : queryIndex);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// ../../node_modules/hono/dist/request.js
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
var HonoRequest = class {
  static {
    __name(this, "HonoRequest");
  }
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return this.bodyCache.parsedBody ??= await parseBody(this, options);
  }
  #cachedBody = /* @__PURE__ */ __name((key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  }, "#cachedBody");
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// ../../node_modules/hono/dist/utils/html.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context3, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context: context3 }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context3, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// ../../node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var Context = class {
  static {
    __name(this, "Context");
  }
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= new Response(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = new Response(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = /* @__PURE__ */ __name((...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  }, "render");
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = /* @__PURE__ */ __name((layout) => this.#layout = layout, "setLayout");
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = /* @__PURE__ */ __name(() => this.#layout, "getLayout");
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = /* @__PURE__ */ __name((renderer) => {
    this.#renderer = renderer;
  }, "setRenderer");
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = /* @__PURE__ */ __name((name, value, options) => {
    if (this.finalized) {
      this.#res = new Response(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  }, "header");
  status = /* @__PURE__ */ __name((status) => {
    this.#status = status;
  }, "status");
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = /* @__PURE__ */ __name((key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  }, "set");
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = /* @__PURE__ */ __name((key) => {
    return this.#var ? this.#var.get(key) : void 0;
  }, "get");
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return new Response(data, { status, headers: responseHeaders });
  }
  newResponse = /* @__PURE__ */ __name((...args) => this.#newResponse(...args), "newResponse");
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = /* @__PURE__ */ __name((data, arg, headers) => this.#newResponse(data, arg, headers), "body");
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = /* @__PURE__ */ __name((text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  }, "text");
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = /* @__PURE__ */ __name((object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  }, "json");
  html = /* @__PURE__ */ __name((html, arg, headers) => {
    const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  }, "html");
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = /* @__PURE__ */ __name((location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  }, "redirect");
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = /* @__PURE__ */ __name(() => {
    this.#notFoundHandler ??= () => new Response();
    return this.#notFoundHandler(this);
  }, "notFound");
};

// ../../node_modules/hono/dist/router.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
  static {
    __name(this, "UnsupportedPathError");
  }
};

// ../../node_modules/hono/dist/utils/constants.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// ../../node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = class _Hono {
  static {
    __name(this, "_Hono");
  }
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler2) => {
          this.#addRoute(method, this.#path, handler2);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler2) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler2);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler2) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler2);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler2;
      if (app2.errorHandler === errorHandler) {
        handler2 = r.handler;
      } else {
        handler2 = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res, "handler");
        handler2[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler2);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = /* @__PURE__ */ __name((handler2) => {
    this.errorHandler = handler2;
    return this;
  }, "onError");
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = /* @__PURE__ */ __name((handler2) => {
    this.#notFoundHandler = handler2;
    return this;
  }, "notFound");
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler2 = /* @__PURE__ */ __name(async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler2);
    return this;
  }
  #addRoute(method, path, handler2) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { basePath: this._basePath, path, method, handler: handler2 };
    this.router.add(method, path, [handler2, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env2, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env2, "GET")))();
    }
    const path = this.getPath(request, { env: env2 });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env: env2,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context3 = await composed(c);
        if (!context3.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context3.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} Env - env Object
   * @param {ExecutionContext} - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = /* @__PURE__ */ __name((request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  }, "fetch");
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = /* @__PURE__ */ __name((input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  }, "request");
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = /* @__PURE__ */ __name(() => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  }, "fire");
};

// ../../node_modules/hono/dist/router/reg-exp-router/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/hono/dist/router/reg-exp-router/router.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/hono/dist/router/reg-exp-router/matcher.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = /* @__PURE__ */ __name(((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }), "match2");
  this.match = match2;
  return match2(method, path);
}
__name(match, "match");

// ../../node_modules/hono/dist/router/reg-exp-router/node.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
__name(compareKey, "compareKey");
var Node = class _Node {
  static {
    __name(this, "_Node");
  }
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context3, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node2;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node2 = this.#children[regexpStr];
      if (!node2) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node2 = this.#children[regexpStr] = new _Node();
        if (name !== "") {
          node2.#varIndex = context3.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node2.#varIndex]);
      }
    } else {
      node2 = this.#children[token];
      if (!node2) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node2 = this.#children[token] = new _Node();
      }
    }
    node2.insert(restTokens, index, paramMap, context3, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// ../../node_modules/hono/dist/router/reg-exp-router/trie.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var Trie = class {
  static {
    __name(this, "Trie");
  }
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// ../../node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = class {
  static {
    __name(this, "RegExpRouter");
  }
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler2) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler2, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler2, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler2, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// ../../node_modules/hono/dist/router/reg-exp-router/prepared-router.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/hono/dist/router/smart-router/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/hono/dist/router/smart-router/router.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var SmartRouter = class {
  static {
    __name(this, "SmartRouter");
  }
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init2) {
    this.#routers = init2.routers;
  }
  add(method, path, handler2) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler2]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// ../../node_modules/hono/dist/router/trie-router/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/hono/dist/router/trie-router/router.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/hono/dist/router/trie-router/node.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var emptyParams = /* @__PURE__ */ Object.create(null);
var Node2 = class _Node2 {
  static {
    __name(this, "_Node");
  }
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler2, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler2) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler: handler2, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler2) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new _Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler: handler2,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #getHandlerSets(node2, method, nodeParams, params) {
    const handlerSets = [];
    for (let i = 0, len = node2.#methods.length; i < len; i++) {
      const m = node2.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
    return handlerSets;
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node2 = curNodes[j];
        const nextNode = node2.#children[part];
        if (nextNode) {
          nextNode.#params = node2.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              handlerSets.push(
                ...this.#getHandlerSets(nextNode.#children["*"], method, node2.#params)
              );
            }
            handlerSets.push(...this.#getHandlerSets(nextNode, method, node2.#params));
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node2.#patterns.length; k < len3; k++) {
          const pattern = node2.#patterns[k];
          const params = node2.#params === emptyParams ? {} : { ...node2.#params };
          if (pattern === "*") {
            const astNode = node2.#children["*"];
            if (astNode) {
              handlerSets.push(...this.#getHandlerSets(astNode, method, node2.#params));
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node2.#children[key];
          const restPathString = parts.slice(i).join("/");
          if (matcher instanceof RegExp) {
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              handlerSets.push(...this.#getHandlerSets(child, method, node2.#params, params));
              if (Object.keys(child.#children).length) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              handlerSets.push(...this.#getHandlerSets(child, method, params, node2.#params));
              if (child.#children["*"]) {
                handlerSets.push(
                  ...this.#getHandlerSets(child.#children["*"], method, params, node2.#params)
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      curNodes = tempNodes.concat(curNodesQueue.shift() ?? []);
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler: handler2, params }) => [handler2, params])];
  }
};

// ../../node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  static {
    __name(this, "TrieRouter");
  }
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler2) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler2);
      }
      return;
    }
    this.#node.insert(method, path, handler2);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// ../../node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  static {
    __name(this, "Hono");
  }
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// ../../node_modules/hono/dist/helper/cookie/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// ../../node_modules/hono/dist/utils/cookie.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var validCookieNameRegEx = /^[\w!#$%&'*.^`|~+-]+$/;
var validCookieValueRegEx = /^[ !#-:<-[\]-~]*$/;
var parse = /* @__PURE__ */ __name((cookie, name) => {
  if (name && cookie.indexOf(name) === -1) {
    return {};
  }
  const pairs = cookie.trim().split(";");
  const parsedCookie = {};
  for (let pairStr of pairs) {
    pairStr = pairStr.trim();
    const valueStartPos = pairStr.indexOf("=");
    if (valueStartPos === -1) {
      continue;
    }
    const cookieName = pairStr.substring(0, valueStartPos).trim();
    if (name && name !== cookieName || !validCookieNameRegEx.test(cookieName)) {
      continue;
    }
    let cookieValue = pairStr.substring(valueStartPos + 1).trim();
    if (cookieValue.startsWith('"') && cookieValue.endsWith('"')) {
      cookieValue = cookieValue.slice(1, -1);
    }
    if (validCookieValueRegEx.test(cookieValue)) {
      parsedCookie[cookieName] = cookieValue.indexOf("%") !== -1 ? tryDecode(cookieValue, decodeURIComponent_) : cookieValue;
      if (name) {
        break;
      }
    }
  }
  return parsedCookie;
}, "parse");
var _serialize = /* @__PURE__ */ __name((name, value, opt = {}) => {
  let cookie = `${name}=${value}`;
  if (name.startsWith("__Secure-") && !opt.secure) {
    throw new Error("__Secure- Cookie must have Secure attributes");
  }
  if (name.startsWith("__Host-")) {
    if (!opt.secure) {
      throw new Error("__Host- Cookie must have Secure attributes");
    }
    if (opt.path !== "/") {
      throw new Error('__Host- Cookie must have Path attributes with "/"');
    }
    if (opt.domain) {
      throw new Error("__Host- Cookie must not have Domain attributes");
    }
  }
  if (opt && typeof opt.maxAge === "number" && opt.maxAge >= 0) {
    if (opt.maxAge > 3456e4) {
      throw new Error(
        "Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration."
      );
    }
    cookie += `; Max-Age=${opt.maxAge | 0}`;
  }
  if (opt.domain && opt.prefix !== "host") {
    cookie += `; Domain=${opt.domain}`;
  }
  if (opt.path) {
    cookie += `; Path=${opt.path}`;
  }
  if (opt.expires) {
    if (opt.expires.getTime() - Date.now() > 3456e7) {
      throw new Error(
        "Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future."
      );
    }
    cookie += `; Expires=${opt.expires.toUTCString()}`;
  }
  if (opt.httpOnly) {
    cookie += "; HttpOnly";
  }
  if (opt.secure) {
    cookie += "; Secure";
  }
  if (opt.sameSite) {
    cookie += `; SameSite=${opt.sameSite.charAt(0).toUpperCase() + opt.sameSite.slice(1)}`;
  }
  if (opt.priority) {
    cookie += `; Priority=${opt.priority.charAt(0).toUpperCase() + opt.priority.slice(1)}`;
  }
  if (opt.partitioned) {
    if (!opt.secure) {
      throw new Error("Partitioned Cookie must have Secure attributes");
    }
    cookie += "; Partitioned";
  }
  return cookie;
}, "_serialize");
var serialize = /* @__PURE__ */ __name((name, value, opt) => {
  value = encodeURIComponent(value);
  return _serialize(name, value, opt);
}, "serialize");

// ../../node_modules/hono/dist/helper/cookie/index.js
var getCookie = /* @__PURE__ */ __name((c, key, prefix) => {
  const cookie = c.req.raw.headers.get("Cookie");
  if (typeof key === "string") {
    if (!cookie) {
      return void 0;
    }
    let finalKey = key;
    if (prefix === "secure") {
      finalKey = "__Secure-" + key;
    } else if (prefix === "host") {
      finalKey = "__Host-" + key;
    }
    const obj2 = parse(cookie, finalKey);
    return obj2[finalKey];
  }
  if (!cookie) {
    return {};
  }
  const obj = parse(cookie);
  return obj;
}, "getCookie");
var generateCookie = /* @__PURE__ */ __name((name, value, opt) => {
  let cookie;
  if (opt?.prefix === "secure") {
    cookie = serialize("__Secure-" + name, value, { path: "/", ...opt, secure: true });
  } else if (opt?.prefix === "host") {
    cookie = serialize("__Host-" + name, value, {
      ...opt,
      path: "/",
      secure: true,
      domain: void 0
    });
  } else {
    cookie = serialize(name, value, { path: "/", ...opt });
  }
  return cookie;
}, "generateCookie");
var setCookie = /* @__PURE__ */ __name((c, name, value, opt) => {
  const cookie = generateCookie(name, value, opt);
  c.header("Set-Cookie", cookie, { append: true });
}, "setCookie");
var deleteCookie = /* @__PURE__ */ __name((c, name, opt) => {
  const deletedCookie = getCookie(c, name, opt?.prefix);
  setCookie(c, name, "", { ...opt, maxAge: 0 });
  return deletedCookie;
}, "deleteCookie");

// ../../node_modules/hono/dist/middleware/cors/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var cors = /* @__PURE__ */ __name((options) => {
  const defaults = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    allowHeaders: [],
    exposeHeaders: []
  };
  const opts = {
    ...defaults,
    ...options
  };
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") {
      return optsAllowMethods;
    } else if (Array.isArray(optsAllowMethods)) {
      return () => optsAllowMethods;
    } else {
      return () => [];
    }
  })(opts.allowMethods);
  return /* @__PURE__ */ __name(async function cors2(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    __name(set, "set");
    const allowOrigin = await findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (opts.exposeHeaders?.length) {
      set("Access-Control-Expose-Headers", opts.exposeHeaders.join(","));
    }
    if (c.req.method === "OPTIONS") {
      if (opts.origin !== "*") {
        set("Vary", "Origin");
      }
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      const allowMethods = await findAllowMethods(c.req.header("origin") || "", c);
      if (allowMethods.length) {
        set("Access-Control-Allow-Methods", allowMethods.join(","));
      }
      let headers = opts.allowHeaders;
      if (!headers?.length) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      if (headers?.length) {
        set("Access-Control-Allow-Headers", headers.join(","));
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
    if (opts.origin !== "*") {
      c.header("Vary", "Origin", { append: true });
    }
  }, "cors2");
}, "cors");

// src/lib/shopify.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
function isValidShopDomain(shop) {
  return /^[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com$/.test(shop);
}
__name(isValidShopDomain, "isValidShopDomain");
function buildShopifyAuthorizeUrl(args) {
  const { shop, apiKey, scopes, redirectUri, state } = args;
  const u = new URL(`https://${shop}/admin/oauth/authorize`);
  u.searchParams.set("client_id", apiKey);
  u.searchParams.set("scope", scopes);
  u.searchParams.set("redirect_uri", redirectUri);
  u.searchParams.set("state", state);
  u.searchParams.append("grant_options[]", "per-user");
  return u.toString();
}
__name(buildShopifyAuthorizeUrl, "buildShopifyAuthorizeUrl");
async function exchangeAccessToken(args) {
  const { shop, apiKey, apiSecret, code } = args;
  const res = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ client_id: apiKey, client_secret: apiSecret, code })
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to exchange access token (${res.status}): ${text}`);
  }
  const json = await res.json();
  return { accessToken: json.access_token, scope: json.scope };
}
__name(exchangeAccessToken, "exchangeAccessToken");
async function shopifyGraphql(args) {
  const { shop, accessToken, apiVersion, query, variables } = args;
  const res = await fetch(`https://${shop}/admin/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken
    },
    body: JSON.stringify({ query, variables })
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`Shopify GraphQL error (${res.status}): ${JSON.stringify(json)}`);
  }
  if (json.errors) {
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}
__name(shopifyGraphql, "shopifyGraphql");
async function getShopInfo(args) {
  const isMyshopify = /* @__PURE__ */ __name((host) => !!host && host.endsWith(".myshopify.com"), "isMyshopify");
  const base = await shopifyGraphql({
    ...args,
    query: `query {
      shop {
        id
        name
        primaryDomain { host url sslEnabled }
      }
    }`,
    variables: {}
  });
  let bestHost = base.shop.primaryDomain?.host ?? null;
  if (!bestHost || isMyshopify(bestHost)) {
    try {
      const dom = await shopifyGraphql({
        ...args,
        query: `query {
          shop {
            domains {
              host
              url
              sslEnabled
              isPrimary
            }
          }
        }`,
        variables: {}
      });
      const candidates = (dom.shop.domains ?? []).filter((d) => !!d.host && !isMyshopify(d.host) && d.sslEnabled);
      const primary = candidates.find((d) => d.isPrimary) ?? candidates[0];
      if (primary?.host) bestHost = primary.host;
    } catch {
    }
  }
  if (!bestHost || isMyshopify(bestHost)) {
    try {
      const res = await fetch(`https://${args.shop}/admin/api/${args.apiVersion}/shop.json`, {
        headers: {
          "X-Shopify-Access-Token": args.accessToken,
          Accept: "application/json"
        }
      });
      if (res.ok) {
        const json = await res.json();
        const domain2 = json?.shop?.domain ?? null;
        if (domain2 && !isMyshopify(domain2)) bestHost = domain2;
      }
    } catch {
    }
  }
  return {
    shopId: base.shop.id,
    name: base.shop.name,
    primaryDomainHost: bestHost
  };
}
__name(getShopInfo, "getShopInfo");
async function registerAppUninstalledWebhook(args) {
  const mutation = `mutation webhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $webhookSubscription: WebhookSubscriptionInput!) {
    webhookSubscriptionCreate(topic: $topic, webhookSubscription: $webhookSubscription) {
      userErrors { field message }
      webhookSubscription { id }
    }
  }`;
  const variables = {
    topic: "APP_UNINSTALLED",
    webhookSubscription: {
      callbackUrl: args.callbackUrl,
      format: "JSON"
    }
  };
  const data = await shopifyGraphql({
    shop: args.shop,
    accessToken: args.accessToken,
    apiVersion: args.apiVersion,
    query: mutation,
    variables
  });
  const errors = data.webhookSubscriptionCreate?.userErrors ?? [];
  if (errors.length) {
    throw new Error(`Webhook registration error: ${JSON.stringify(errors)}`);
  }
}
__name(registerAppUninstalledWebhook, "registerAppUninstalledWebhook");

// src/lib/shopifyHmac.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();

// src/lib/base64url.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
function base64UrlEncode(data) {
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  const b64 = btoa(binary);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
__name(base64UrlEncode, "base64UrlEncode");
function base64UrlDecodeToBytes(input) {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(input.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
__name(base64UrlDecodeToBytes, "base64UrlDecodeToBytes");
function utf8ToBytes(s) {
  return new TextEncoder().encode(s);
}
__name(utf8ToBytes, "utf8ToBytes");
function bytesToUtf8(bytes) {
  return new TextDecoder().decode(bytes);
}
__name(bytesToUtf8, "bytesToUtf8");

// src/lib/security.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}
__name(timingSafeEqual, "timingSafeEqual");
async function hmacSha256(key, message) {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, message);
  return new Uint8Array(sig);
}
__name(hmacSha256, "hmacSha256");

// src/lib/shopifyHmac.ts
function hexToBytes(hex) {
  const clean = hex.trim();
  if (clean.length % 2 !== 0) throw new Error("Invalid hex string length");
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.substr(i * 2, 2), 16);
  }
  return out;
}
__name(hexToBytes, "hexToBytes");
async function verifyShopifyHmac(args) {
  const sp = new URLSearchParams(args.url.search);
  const hmac = sp.get("hmac");
  if (!hmac) return false;
  sp.delete("hmac");
  sp.delete("signature");
  const pairs = Array.from(sp.entries()).sort(([a], [b]) => a.localeCompare(b));
  const message = pairs.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&");
  const computed = await hmacSha256(utf8ToBytes(args.apiSecret), utf8ToBytes(message));
  const received = hexToBytes(hmac);
  return timingSafeEqual(computed, received);
}
__name(verifyShopifyHmac, "verifyShopifyHmac");
async function verifyShopifyWebhookHmac(args) {
  if (!args.hmacHeader) return false;
  const computed = await hmacSha256(utf8ToBytes(args.apiSecret), args.rawBody);
  const received = Uint8Array.from(atob(args.hmacHeader), (c) => c.charCodeAt(0));
  return timingSafeEqual(computed, received);
}
__name(verifyShopifyWebhookHmac, "verifyShopifyWebhookHmac");

// src/lib/shopifySessionToken.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
async function verifyShopifySessionToken(token, apiKey, apiSecret) {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid session token");
  const headerJson = JSON.parse(bytesToUtf8(base64UrlDecodeToBytes(parts[0])));
  if (headerJson.alg !== "HS256") throw new Error(`Unexpected JWT alg: ${headerJson.alg}`);
  const payload = JSON.parse(bytesToUtf8(base64UrlDecodeToBytes(parts[1])));
  if (payload.aud !== apiKey) throw new Error("Invalid audience");
  const now = Math.floor(Date.now() / 1e3);
  if (payload.exp <= now) throw new Error("Session token expired");
  if (payload.nbf && payload.nbf > now) throw new Error("Session token not yet valid");
  const signingInput = `${parts[0]}.${parts[1]}`;
  const sigBytes = base64UrlDecodeToBytes(parts[2]);
  const expected = await hmacSha256(utf8ToBytes(apiSecret), utf8ToBytes(signingInput));
  if (!timingSafeEqual(sigBytes, expected)) throw new Error("Invalid session token signature");
  return payload;
}
__name(verifyShopifySessionToken, "verifyShopifySessionToken");

// src/lib/apple.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
function stripPem(pem) {
  return pem.replace(/-----BEGIN [^-]+-----/g, "").replace(/-----END [^-]+-----/g, "").replace(/\s+/g, "");
}
__name(stripPem, "stripPem");
async function importRsaPrivateKey(pkcs8Pem) {
  const b64 = stripPem(pkcs8Pem);
  const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  return crypto.subtle.importKey(
    "pkcs8",
    bytes.buffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
}
__name(importRsaPrivateKey, "importRsaPrivateKey");
async function signRs256(privateKey, data) {
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", privateKey, data.buffer);
  return new Uint8Array(sig);
}
__name(signRs256, "signRs256");
function appleBaseUrl(appleEnv) {
  return appleEnv === "sandbox" ? "https://apple-pay-gateway-cert.apple.com" : "https://apple-pay-gateway.apple.com";
}
__name(appleBaseUrl, "appleBaseUrl");
async function createAppleAuthJwt(args) {
  const now = Math.floor(Date.now() / 1e3);
  const header = {
    alg: "RS256",
    typ: "JWT"
  };
  const certB64 = stripPem(args.certificatePem);
  if (certB64) header.x5c = [certB64];
  const payload = {
    iss: args.issuer,
    aud: appleBaseUrl(args.appleEnv),
    iat: now,
    exp: now + 30 * 60
  };
  const encodedHeader = base64UrlEncode(utf8ToBytes(JSON.stringify(header)));
  const encodedPayload = base64UrlEncode(utf8ToBytes(JSON.stringify(payload)));
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const key = await importRsaPrivateKey(args.privateKeyPem);
  const sig = await signRs256(key, utf8ToBytes(signingInput));
  const encodedSig = base64UrlEncode(sig);
  return `${signingInput}.${encodedSig}`;
}
__name(createAppleAuthJwt, "createAppleAuthJwt");
async function appleApiFetch(args) {
  const url = args.pathOrUrl.startsWith("http") ? args.pathOrUrl : `${appleBaseUrl(args.appleEnv)}${args.pathOrUrl}`;
  const headers = new Headers(args.init.headers ?? {});
  headers.set("Accept", "application/json");
  if (!headers.has("Content-Type") && args.init.body) headers.set("Content-Type", "application/json");
  if (args.useJwt) {
    const jwt = await createAppleAuthJwt({
      appleEnv: args.appleEnv,
      issuer: args.issuer,
      certificatePem: args.certificatePem,
      privateKeyPem: args.privateKeyPem
    });
    headers.set("Authorization", `Bearer ${jwt}`);
  }
  return args.fetcher.fetch(url, { ...args.init, headers });
}
__name(appleApiFetch, "appleApiFetch");
async function registerMerchant(args) {
  const body = {
    domainNames: [args.domain],
    encryptTo: args.encryptTo,
    partnerInternalMerchantIdentifier: args.partnerInternalMerchantIdentifier,
    partnerMerchantName: args.partnerMerchantName
  };
  const res = await appleApiFetch({
    fetcher: args.fetcher,
    appleEnv: args.appleEnv,
    pathOrUrl: "/paymentservices/registerMerchant",
    init: { method: "POST", body: JSON.stringify(body) },
    useJwt: args.useJwt,
    issuer: args.issuer,
    certificatePem: args.certificatePem,
    privateKeyPem: args.privateKeyPem
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`registerMerchant failed (${res.status}): ${text}`);
  }
}
__name(registerMerchant, "registerMerchant");
async function getMerchantDetails(args) {
  const res = await appleApiFetch({
    fetcher: args.fetcher,
    appleEnv: args.appleEnv,
    pathOrUrl: `/paymentservices/merchant/${encodeURIComponent(args.merchantIdentifier)}`,
    init: { method: "GET" },
    useJwt: args.useJwt,
    issuer: args.issuer,
    certificatePem: args.certificatePem,
    privateKeyPem: args.privateKeyPem
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`getMerchantDetails failed (${res.status}): ${text}`);
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
__name(getMerchantDetails, "getMerchantDetails");
async function unregisterMerchant(args) {
  const body = { merchantIdentifier: args.merchantIdentifier };
  const res = await appleApiFetch({
    fetcher: args.fetcher,
    appleEnv: args.appleEnv,
    pathOrUrl: "/paymentservices/unregisterMerchant",
    init: { method: "POST", body: JSON.stringify(body) },
    useJwt: args.useJwt,
    issuer: args.issuer,
    certificatePem: args.certificatePem,
    privateKeyPem: args.privateKeyPem
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`unregisterMerchant failed (${res.status}): ${text}`);
  }
}
__name(unregisterMerchant, "unregisterMerchant");
async function createPaymentSession(args) {
  const u = new URL(args.validationUrl);
  if (!u.hostname.includes("apple-pay-gateway") || !u.hostname.endsWith(".apple.com")) {
    throw new Error(`Refusing to call unexpected validationURL host: ${u.hostname}`);
  }
  const body = {
    merchantIdentifier: args.merchantIdentifier,
    displayName: args.displayName,
    initiative: "web",
    initiativeContext: args.initiativeContext
  };
  const res = await args.fetcher.fetch(args.validationUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(body)
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`createPaymentSession failed (${res.status}): ${text}`);
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
__name(createPaymentSession, "createPaymentSession");

// src/lib/cloudflare.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var _CUSTOM_HOSTNAMES_SEG = "custom_hostnames";
var _customHostnamesPath = /* @__PURE__ */ __name((zoneId) => `/zones/${zoneId}/${_CUSTOM_HOSTNAMES_SEG}`, "_customHostnamesPath");
async function cfApiFetch(args) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${args.path}`, {
    ...args.init,
    headers: {
      ...args.init?.headers ?? {},
      Authorization: `Bearer ${args.apiToken}`,
      "Content-Type": "application/json"
    }
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(`Cloudflare API error (${res.status}): ${JSON.stringify(json.errors || json)}`);
  }
  return json.result;
}
__name(cfApiFetch, "cfApiFetch");
async function findCustomHostname(args) {
  const result = await cfApiFetch({
    apiToken: args.apiToken,
    path: `${_customHostnamesPath(args.zoneId)}?hostname=${encodeURIComponent(args.hostname)}`
  });
  return result?.[0] ?? null;
}
__name(findCustomHostname, "findCustomHostname");
async function createCustomHostname(args) {
  return cfApiFetch({
    apiToken: args.apiToken,
    path: _customHostnamesPath(args.zoneId),
    init: {
      method: "POST",
      body: JSON.stringify({
        hostname: args.hostname,
        // Optional metadata for our own tracking/debugging.
        ssl: {
          method: "http",
          type: "dv",
          settings: {
            min_tls_version: "1.2",
            tls_1_3: "on",
            http2: "on"
          }
        }
      })
    }
  });
}
__name(createCustomHostname, "createCustomHostname");
async function deleteCustomHostname(args) {
  await cfApiFetch({
    apiToken: args.apiToken,
    path: `${_customHostnamesPath(args.zoneId)}/${args.customHostnameId}`,
    init: { method: "DELETE" }
  });
}
__name(deleteCustomHostname, "deleteCustomHostname");

// src/lib/db.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
function nowIso() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(nowIso, "nowIso");
async function upsertShop(db, args) {
  const now = nowIso();
  const installedAt = args.installedAt ?? now;
  await db.prepare(
    `INSERT INTO shops (shop, shop_id, shop_name, access_token, scopes, installed_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(shop) DO UPDATE SET
         shop_id=excluded.shop_id,
         shop_name=excluded.shop_name,
         access_token=excluded.access_token,
         scopes=excluded.scopes,
         installed_at=excluded.installed_at,
         uninstalled_at=NULL,
         updated_at=excluded.updated_at`
  ).bind(args.shop, args.shopId, args.shopName, args.accessToken, args.scopes, installedAt, now, now).run();
}
__name(upsertShop, "upsertShop");
async function getShopByShop(db, shop) {
  const row = await db.prepare(`SELECT * FROM shops WHERE shop=?`).bind(shop).first();
  return row ?? null;
}
__name(getShopByShop, "getShopByShop");
async function markShopUninstalled(db, shop, uninstalledAt) {
  const now = nowIso();
  await db.prepare(`UPDATE shops SET uninstalled_at=?, updated_at=? WHERE shop=?`).bind(uninstalledAt ?? now, now, shop).run();
}
__name(markShopUninstalled, "markShopUninstalled");
async function upsertMerchantDomain(db, args) {
  const now = nowIso();
  await db.prepare(
    `INSERT INTO merchant_domains (
          shop,
          shop_id,
          domain,
          partner_internal_merchant_identifier,
          partner_merchant_name,
          encrypt_to,
          environment,
          status,
          last_error,
          apple_last_checked_at,
          cloudflare_hostname_id,
          cloudflare_hostname_status,
          cloudflare_ssl_status,
          created_at,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(domain) DO UPDATE SET
          shop=excluded.shop,
          shop_id=excluded.shop_id,
          partner_internal_merchant_identifier=excluded.partner_internal_merchant_identifier,
          partner_merchant_name=excluded.partner_merchant_name,
          encrypt_to=excluded.encrypt_to,
          environment=excluded.environment,
          status=excluded.status,
          last_error=excluded.last_error,
          apple_last_checked_at=excluded.apple_last_checked_at,
          cloudflare_hostname_id=excluded.cloudflare_hostname_id,
          cloudflare_hostname_status=excluded.cloudflare_hostname_status,
          cloudflare_ssl_status=excluded.cloudflare_ssl_status,
          updated_at=excluded.updated_at`
  ).bind(
    args.shop,
    args.shopId,
    args.domain,
    args.partnerInternalMerchantIdentifier,
    args.partnerMerchantName,
    args.encryptTo,
    args.environment,
    args.status,
    args.lastError ?? null,
    args.appleLastCheckedAt ?? null,
    args.cloudflareHostnameId ?? null,
    args.cloudflareHostnameStatus ?? null,
    args.cloudflareSslStatus ?? null,
    now,
    now
  ).run();
}
__name(upsertMerchantDomain, "upsertMerchantDomain");
async function getMerchantDomainByShop(db, shop) {
  const row = await db.prepare(`SELECT * FROM merchant_domains WHERE shop=? ORDER BY updated_at DESC LIMIT 1`).bind(shop).first();
  return row ?? null;
}
__name(getMerchantDomainByShop, "getMerchantDomainByShop");
async function getMerchantDomainByDomain(db, domain2) {
  const row = await db.prepare(`SELECT * FROM merchant_domains WHERE domain=?`).bind(domain2).first();
  return row ?? null;
}
__name(getMerchantDomainByDomain, "getMerchantDomainByDomain");
async function updateMerchantDomainAppleStatus(db, args) {
  const now = nowIso();
  await db.prepare(
    `UPDATE merchant_domains
       SET status=?, last_error=?, apple_last_checked_at=?, updated_at=?
       WHERE domain=?`
  ).bind(args.status, args.lastError ?? null, args.appleLastCheckedAt ?? null, now, args.domain).run();
}
__name(updateMerchantDomainAppleStatus, "updateMerchantDomainAppleStatus");
async function listMerchantDomainsByShop(db, shop) {
  const res = await db.prepare(`SELECT * FROM merchant_domains WHERE shop = ? ORDER BY updated_at DESC`).bind(shop).all();
  return res.results || [];
}
__name(listMerchantDomainsByShop, "listMerchantDomainsByShop");
async function logWebhookEvent(db, args) {
  const now = nowIso();
  await db.prepare(
    `INSERT INTO webhook_events (shop, topic, webhook_id, payload, received_at, processed_at, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    args.shop ?? null,
    args.topic ?? null,
    args.webhookId ?? null,
    args.payload,
    args.receivedAt ?? now,
    args.processedAt ?? now,
    args.status ?? "ok",
    now
  ).run();
}
__name(logWebhookEvent, "logWebhookEvent");

// src/lib/util.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
function nowIso2() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(nowIso2, "nowIso");
function randomState(bytes = 16) {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return Array.from(buf).map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(randomState, "randomState");

// src/index.ts
function safeError(err) {
  if (err instanceof Error) return { name: err.name, message: err.message, stack: err.stack };
  return { message: String(err) };
}
__name(safeError, "safeError");
function getPathAndHost(reqUrl) {
  try {
    const u = new URL(reqUrl);
    return { host: u.host, path: u.pathname };
  } catch {
    return { host: "unknown", path: "unknown" };
  }
}
__name(getPathAndHost, "getPathAndHost");
function logEvent(c, level, msg, fields = {}) {
  const requestId = c.get("requestId") ?? "unknown";
  const flowId = c.get("flowId") ?? requestId;
  const step = c.get("step") ?? 0;
  const { host, path } = getPathAndHost(c.req.url);
  const payload = {
    ts: (/* @__PURE__ */ new Date()).toISOString(),
    level,
    msg,
    requestId,
    flowId,
    step,
    http: {
      method: c.req.method,
      host,
      path,
      cfRay: c.req.header("cf-ray") ?? null
    },
    ...fields
  };
  const line = JSON.stringify(payload);
  if (level === "error") console.error(line);
  else console.log(line);
}
__name(logEvent, "logEvent");
async function withStep(c, name, fn) {
  const nextStep = (c.get("step") ?? 0) + 1;
  c.set("step", nextStep);
  const started = Date.now();
  logEvent(c, "info", "step.start", { stepName: name });
  try {
    const out = await fn();
    logEvent(c, "info", "step.ok", { stepName: name, durationMs: Date.now() - started });
    return out;
  } catch (err) {
    logEvent(c, "error", "step.error", { stepName: name, durationMs: Date.now() - started, error: safeError(err) });
    throw err;
  }
}
__name(withStep, "withStep");
function normalizeShopParam(raw2) {
  return raw2.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*/, "");
}
__name(normalizeShopParam, "normalizeShopParam");
function oauthBounceHtml(authUrl) {
  const safeUrl = JSON.stringify(authUrl);
  return `<!doctype html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>Redirecting\u2026</title></head><body><script>(function(){var url=${safeUrl};try{if(window.top){window.top.location.href=url;}else{window.location.href=url;}}catch(e){window.location.href=url;}})();<\/script><p>Redirecting to Shopify authentication\u2026</p></body></html>`;
}
__name(oauthBounceHtml, "oauthBounceHtml");
var app = new Hono2();
var WELL_KNOWN_PATH = "/.well-known/apple-developer-merchantid-domain-association";
var DEFAULT_VERIFICATION_KV_KEY = "applepay:partner-verification-file";
var OAUTH_STATE_COOKIE = "__applepay_oauth_state";
app.use("*", async (c, next) => {
  const requestId = c.req.header("x-request-id") || c.req.header("cf-ray") || crypto.randomUUID();
  const flowId = c.req.header("x-flow-id") || requestId;
  c.set("requestId", requestId);
  c.set("flowId", flowId);
  c.set("step", 0);
  const started = Date.now();
  try {
    await next();
  } finally {
    c.header("x-request-id", requestId);
    c.header("x-flow-id", flowId);
    c.header("server-timing", `worker;dur=${Date.now() - started}`);
    logEvent(c, "info", "request.complete", {
      status: c.res?.status ?? null,
      durationMs: Date.now() - started
    });
  }
});
function isAppHost(env2, url) {
  try {
    const appHost = new URL(env2.SHOPIFY_APP_URL).hostname;
    return url.hostname === appHost;
  } catch {
    return false;
  }
}
__name(isAppHost, "isAppHost");
function noStoreHeaders() {
  return {
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    "Pragma": "no-cache",
    "Expires": "0"
  };
}
__name(noStoreHeaders, "noStoreHeaders");
function cspHeaders() {
  return {
    "Content-Security-Policy": [
      "frame-ancestors https://*.myshopify.com https://admin.shopify.com"
    ].join("; ")
  };
}
__name(cspHeaders, "cspHeaders");
async function getPartnerVerificationFile(env2) {
  const key = env2.APPLE_VERIFICATION_KV_KEY ?? DEFAULT_VERIFICATION_KV_KEY;
  const file = await env2.APPLEPAY_KV.get(key);
  if (!file) {
    throw new Error(`Missing partner verification file in KV at key: ${key}`);
  }
  return file;
}
__name(getPartnerVerificationFile, "getPartnerVerificationFile");
async function requireShopifySession(c) {
  const auth = c.req.header("Authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  if (!m) {
    return c.json({ error: "Missing Authorization: Bearer <token>" }, 401);
  }
  const token = m[1];
  let payload;
  try {
    payload = await verifyShopifySessionToken(
      token,
      c.env.SHOPIFY_API_KEY,
      c.env.SHOPIFY_API_SECRET
    );
  } catch {
    return c.json({ error: "Invalid Shopify session token" }, 401);
  }
  return payload;
}
__name(requireShopifySession, "requireShopifySession");
function shopFromDest(dest) {
  const u = new URL(dest);
  return u.hostname;
}
__name(shopFromDest, "shopFromDest");
function toApplePayStatus(row, dnsInstructions = null) {
  if (!row) {
    return {
      domain: null,
      status: "NOT_STARTED",
      lastError: null,
      cloudflareHostnameStatus: null,
      cloudflareSslStatus: null,
      dnsInstructions: null,
      appleMerchantId: null
    };
  }
  return {
    domain: row.domain,
    status: row.status ?? "NOT_STARTED",
    lastError: row.last_error,
    cloudflareHostnameStatus: row.cloudflare_hostname_status,
    cloudflareSslStatus: row.cloudflare_ssl_status,
    dnsInstructions,
    appleMerchantId: row.partner_internal_merchant_identifier
  };
}
__name(toApplePayStatus, "toApplePayStatus");
function dnsInstructionsFor(domain2, target) {
  return {
    recordType: "CNAME",
    host: domain2,
    value: target,
    note: "If your DNS provider does not allow CNAME at the apex (root), use an ALIAS/ANAME (or CNAME flattening if using Cloudflare DNS). After DNS propagates, click \u201CRefresh\u201D in this app."
  };
}
__name(dnsInstructionsFor, "dnsInstructionsFor");
async function proxyMerchantTrafficToShopify(c, u) {
  const host = u.hostname;
  const row = await withStep(c, "db.getMerchantDomainByDomain", async () => {
    const exact = await getMerchantDomainByDomain(c.env.DB, host);
    if (exact) return exact;
    if (host.startsWith("www.")) {
      return await getMerchantDomainByDomain(c.env.DB, host.slice(4));
    }
    return await getMerchantDomainByDomain(c.env.DB, `www.${host}`);
  });
  if (!row) {
    logEvent(c, "warn", "proxy.unknownDomain", { domain: host });
    return fetch(c.req.raw);
  }
  return await withStep(c, "proxy.forwardToShopify", async () => {
    const originUrl = new URL(c.req.url);
    originUrl.protocol = "https:";
    originUrl.hostname = row.shop;
    originUrl.port = "";
    const headers = new Headers(c.req.raw.headers);
    headers.set("host", host);
    headers.set("x-forwarded-host", host);
    headers.set("x-forwarded-proto", "https");
    headers.set("x-forwarded-ssl", "on");
    const ip = headers.get("cf-connecting-ip");
    if (ip) headers.set("x-forwarded-for", ip);
    headers.delete("content-length");
    const method = c.req.method.toUpperCase();
    const body = method === "GET" || method === "HEAD" ? void 0 : c.req.raw.body;
    return fetch(originUrl.toString(), {
      method,
      headers,
      body,
      redirect: "manual"
    });
  });
}
__name(proxyMerchantTrafficToShopify, "proxyMerchantTrafficToShopify");
app.get(WELL_KNOWN_PATH, async (c) => {
  try {
    const file = await withStep(
      c,
      "kv.getPartnerVerificationFile",
      () => getPartnerVerificationFile(c.env)
    );
    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        ...noStoreHeaders()
      }
    });
  } catch (e) {
    return c.text(e?.message || "Missing verification file", 500);
  }
});
app.post(
  "/applepay/session",
  cors({ origin: "*", allowMethods: ["POST", "OPTIONS"], allowHeaders: ["Content-Type"] }),
  async (c) => {
    const host = new URL(c.req.url).hostname;
    const body = await c.req.json().catch(() => null);
    if (!body || typeof body.validationURL !== "string") {
      return c.json({ error: "Missing validationURL" }, 400);
    }
    const row = await withStep(c, "db.getMerchantDomainByDomain", async () => {
      const exact = await getMerchantDomainByDomain(c.env.DB, host);
      if (exact) return exact;
      if (host.startsWith("www.")) {
        return await getMerchantDomainByDomain(c.env.DB, host.slice(4));
      }
      return null;
    });
    if (!row) {
      return c.json({ error: `No merchant registered for domain: ${host}` }, 404);
    }
    if (row.status !== "VERIFIED") {
      return c.json({ error: `Domain not verified/registered yet: ${row.domain}` }, 409);
    }
    const initiativeContext = host;
    const merchantIdentifier = row.partner_internal_merchant_identifier;
    const session = await withStep(
      c,
      "apple.createPaymentSession",
      () => createPaymentSession({
        fetcher: c.env.APPLE_MTLS,
        validationUrl: body.validationURL,
        merchantIdentifier,
        displayName: row.partner_merchant_name,
        initiativeContext
      })
    );
    return c.json(session);
  }
);
app.get("/api/config", async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text("Not Found", 404);
  const missing = [];
  if (!c.env.SHOPIFY_API_KEY) missing.push("SHOPIFY_API_KEY");
  if (!c.env.SHOPIFY_APP_URL) missing.push("SHOPIFY_APP_URL");
  if (missing.length) {
    return c.json(
      {
        error: `Missing required environment variables: ${missing.join(", ")}`
      },
      500,
      {
        ...noStoreHeaders()
      }
    );
  }
  return c.json(
    {
      shopifyApiKey: c.env.SHOPIFY_API_KEY,
      appUrl: c.env.SHOPIFY_APP_URL,
      cnameTarget: c.env.CF_SAAS_CNAME_TARGET
    },
    200,
    {
      ...noStoreHeaders()
    }
  );
});
app.get("/auth", async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text("Not Found", 404);
  const shop = (u.searchParams.get("shop") || "").trim();
  const host = (u.searchParams.get("host") || "").trim();
  if (!isValidShopDomain(shop)) {
    return c.text("Invalid shop parameter", 400);
  }
  if (!host) {
    return c.text("Missing host parameter", 400);
  }
  const state = randomState();
  setCookie(c, OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10
  });
  const redirectUri = `${c.env.SHOPIFY_APP_URL}/auth/callback`;
  const authorizeUrl = buildShopifyAuthorizeUrl({
    shop,
    apiKey: c.env.SHOPIFY_API_KEY,
    scopes: c.env.SHOPIFY_SCOPES,
    redirectUri,
    state
  });
  return c.redirect(authorizeUrl, 302);
});
app.get("/auth/callback", async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text("Not Found", 404);
  const shop = (u.searchParams.get("shop") || "").trim();
  const host = (u.searchParams.get("host") || "").trim();
  const code = (u.searchParams.get("code") || "").trim();
  const state = (u.searchParams.get("state") || "").trim();
  if (!shop || !host || !code || !state) {
    return c.text("Missing OAuth callback parameters", 400);
  }
  if (!await verifyShopifyHmac({ url: u, apiSecret: c.env.SHOPIFY_API_SECRET })) {
    return c.text("Invalid HMAC", 400);
  }
  const cookieState = getCookie(c, OAUTH_STATE_COOKIE);
  if (!cookieState || cookieState !== state) {
    return c.text("Invalid OAuth state", 400);
  }
  deleteCookie(c, OAUTH_STATE_COOKIE, { path: "/" });
  const tokenRes = await exchangeAccessToken({
    shop,
    apiKey: c.env.SHOPIFY_API_KEY,
    apiSecret: c.env.SHOPIFY_API_SECRET,
    code
  });
  const info = await getShopInfo({
    shop,
    accessToken: tokenRes.accessToken,
    apiVersion: c.env.SHOPIFY_API_VERSION
  });
  await upsertShop(c.env.DB, {
    shop,
    shopId: info.shopId,
    shopName: info.name,
    accessToken: tokenRes.accessToken,
    scopes: tokenRes.scope,
    installedAt: nowIso2()
  });
  try {
    await registerAppUninstalledWebhook({
      shop,
      accessToken: tokenRes.accessToken,
      apiVersion: c.env.SHOPIFY_API_VERSION,
      callbackUrl: `${c.env.SHOPIFY_APP_URL}/webhooks/shopify/app-uninstalled`
    });
  } catch (e) {
    const message = e?.message || String(e);
    if (!message.includes("Address for this topic has already been taken")) {
      throw e;
    }
    console.warn("Webhook already registered. Skipping duplicate registration.");
  }
  return c.redirect(`${c.env.SHOPIFY_APP_URL}/?shop=${encodeURIComponent(shop)}&host=${encodeURIComponent(host)}`, 302);
});
app.post("/webhooks/shopify/app-uninstalled", async (c) => {
  const raw2 = await c.req.text();
  const hmac = c.req.header("X-Shopify-Hmac-Sha256") || "";
  const topic = c.req.header("X-Shopify-Topic") || "app/uninstalled";
  const webhookId = c.req.header("X-Shopify-Webhook-Id") || "";
  const shop = (c.req.header("X-Shopify-Shop-Domain") || "").trim();
  const receivedAt = nowIso2();
  let status = "OK";
  try {
    const rawBytes = new TextEncoder().encode(raw2);
    if (!await verifyShopifyWebhookHmac({ apiSecret: c.env.SHOPIFY_API_SECRET, rawBody: rawBytes, hmacHeader: hmac })) {
      status = "ERROR";
      await logWebhookEvent(c.env.DB, {
        shop: shop || "unknown",
        topic,
        webhookId,
        payload: raw2,
        receivedAt,
        processedAt: nowIso2(),
        status: "ERROR"
      });
      return c.text("Invalid webhook HMAC", 401);
    }
    if (shop) {
      await markShopUninstalled(c.env.DB, shop, nowIso2());
      const md = await getMerchantDomainByShop(c.env.DB, shop);
      if (md?.partner_internal_merchant_identifier) {
        try {
          await unregisterMerchant({
            fetcher: c.env.APPLE_MTLS,
            appleEnv: c.env.APPLE_ENV,
            merchantIdentifier: md.partner_internal_merchant_identifier,
            useJwt: c.env.APPLE_USE_JWT === "true",
            issuer: c.env.APPLE_ENCRYPT_TO,
            certificatePem: c.env.APPLE_JWT_CERT_PEM,
            privateKeyPem: c.env.APPLE_JWT_PRIVATE_KEY_PEM
          });
          await updateMerchantDomainAppleStatus(c.env.DB, {
            domain: md.domain,
            status: "UNREGISTERED",
            lastError: null,
            appleLastCheckedAt: nowIso2()
          });
        } catch (e) {
        }
      }
      if (md?.cloudflare_hostname_id) {
        try {
          await deleteCustomHostname({
            apiToken: c.env.CF_API_TOKEN,
            zoneId: c.env.CF_ZONE_ID,
            customHostnameId: md.cloudflare_hostname_id
          });
        } catch {
        }
      }
    }
    await logWebhookEvent(c.env.DB, {
      shop: shop || "unknown",
      topic,
      webhookId,
      payload: raw2,
      receivedAt,
      processedAt: nowIso2(),
      status: "OK"
    });
  } catch (e) {
    status = "ERROR";
    await logWebhookEvent(c.env.DB, {
      shop: shop || "unknown",
      topic,
      webhookId,
      payload: raw2,
      receivedAt,
      processedAt: nowIso2(),
      status: "ERROR"
    });
  }
  return c.text("OK", 200);
});
app.get("/api/shop", async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text("Not Found", 404);
  const payload = await requireShopifySession(c);
  if (payload instanceof Response) return payload;
  const shop = shopFromDest(payload.dest);
  const shopRow = await withStep(
    c,
    "db.getShopByShop",
    () => getShopByShop(c.env.DB, shop)
  );
  if (!shopRow || shopRow.uninstalled_at) {
    return c.json({ error: "App not installed for this shop" }, 401);
  }
  const info = await withStep(
    c,
    "shopify.getShopInfo",
    () => getShopInfo({
      shop,
      accessToken: shopRow.access_token,
      apiVersion: c.env.SHOPIFY_API_VERSION
    })
  );
  const out = {
    shop,
    shopId: info.shopId,
    shopName: info.name,
    primaryDomain: info.primaryDomainHost || null
  };
  return c.json(out, 200, { ...noStoreHeaders() });
});
app.get("/api/applepay/status", async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text("Not Found", 404);
  const payload = await requireShopifySession(c);
  if (payload instanceof Response) return payload;
  const shop = shopFromDest(payload.dest);
  const shopRow = await withStep(
    c,
    "db.getShopByShop",
    () => getShopByShop(c.env.DB, shop)
  );
  if (!shopRow || shopRow.uninstalled_at) {
    return c.json({ error: "App not installed for this shop" }, 401);
  }
  const requestedDomain = (c.req.query("domain") || "").trim().toLowerCase();
  let md = await withStep(c, "db.getMerchantDomain", async () => {
    if (requestedDomain) {
      const byDomain = await getMerchantDomainByDomain(c.env.DB, requestedDomain);
      if (byDomain && byDomain.shop === shop) return byDomain;
    }
    return await getMerchantDomainByShop(c.env.DB, shop);
  });
  return c.json(toApplePayStatus(md), 200, { ...noStoreHeaders() });
});
app.get("/api/applepay/domains", async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text("Not Found", 404);
  const payload = await requireShopifySession(c);
  if (payload instanceof Response) return payload;
  const shop = shopFromDest(payload.dest);
  const shopRow = await getShopByShop(c.env.DB, shop);
  if (!shopRow || shopRow.uninstalled_at) {
    return c.json({ error: "App not installed for this shop" }, 401);
  }
  const rows = await listMerchantDomainsByShop(c.env.DB, shop);
  const domains = rows.map((row) => {
    const dnsInstructions = dnsInstructionsFor(row.domain, c.env.CF_SAAS_CNAME_TARGET);
    const base = toApplePayStatus(row, dnsInstructions);
    return {
      ...base,
      // extra details for the details sidebar
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      cloudflareHostnameId: row.cloudflare_hostname_id
    };
  });
  return c.json({ ok: true, domains }, 200, { ...noStoreHeaders() });
});
app.post("/api/applepay/onboard", async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text("Not Found", 404);
  const payload = await requireShopifySession(c);
  if (payload instanceof Response) return payload;
  const shop = shopFromDest(payload.dest);
  const shopRow = await getShopByShop(c.env.DB, shop);
  if (!shopRow || shopRow.uninstalled_at) {
    return c.json({ error: "App not installed for this shop" }, 401);
  }
  const info = await getShopInfo({
    shop,
    accessToken: shopRow.access_token,
    apiVersion: c.env.SHOPIFY_API_VERSION
  });
  const body = await c.req.json().catch(() => ({}));
  const requested = typeof body?.domain === "string" ? body.domain : "";
  const domain2 = coerceHostname(requested || info.primaryDomainHost || "");
  if (!domain2 || domain2.endsWith(".myshopify.com")) {
    return c.json({ error: "A custom domain is required (not *.myshopify.com)" }, 400);
  }
  const dnsInstructions = dnsInstructionsFor(domain2, c.env.CF_SAAS_CNAME_TARGET);
  let ch = null;
  try {
    const existing = await findCustomHostname({
      apiToken: c.env.CF_API_TOKEN,
      zoneId: c.env.CF_ZONE_ID,
      hostname: domain2
    });
    ch = existing;
    if (!ch) {
      ch = await createCustomHostname({
        apiToken: c.env.CF_API_TOKEN,
        zoneId: c.env.CF_ZONE_ID,
        hostname: domain2,
        customMetadata: {
          shop,
          shop_id: shopRow.shop_id
        }
      });
    }
  } catch (e) {
    await upsertMerchantDomain(c.env.DB, {
      shop,
      shopId: shopRow.shop_id,
      domain: domain2,
      partnerInternalMerchantIdentifier: shopRow.shop_id,
      partnerMerchantName: info.name,
      encryptTo: c.env.APPLE_ENCRYPT_TO,
      environment: c.env.APPLE_ENV,
      status: "ERROR",
      cloudflareHostnameId: null,
      cloudflareHostnameStatus: null,
      cloudflareSslStatus: null,
      lastError: e?.message || String(e),
      appleLastCheckedAt: null
    });
    const md2 = await getMerchantDomainByDomain(c.env.DB, domain2);
    return c.json(toApplePayStatus(md2, dnsInstructions), 200, { ...noStoreHeaders() });
  }
  await upsertMerchantDomain(c.env.DB, {
    shop,
    shopId: shopRow.shop_id,
    domain: domain2,
    partnerInternalMerchantIdentifier: shopRow.shop_id,
    partnerMerchantName: info.name,
    encryptTo: c.env.APPLE_ENCRYPT_TO,
    environment: c.env.APPLE_ENV,
    status: "PENDING",
    cloudflareHostnameId: ch?.id || null,
    cloudflareHostnameStatus: ch?.status || null,
    cloudflareSslStatus: ch?.ssl?.status || null,
    lastError: null,
    appleLastCheckedAt: null
  });
  try {
    await registerMerchant({
      fetcher: c.env.APPLE_MTLS,
      appleEnv: c.env.APPLE_ENV,
      useJwt: c.env.APPLE_USE_JWT === "true",
      issuer: c.env.APPLE_ENCRYPT_TO,
      certificatePem: c.env.APPLE_JWT_CERT_PEM,
      privateKeyPem: c.env.APPLE_JWT_PRIVATE_KEY_PEM,
      domain: domain2,
      partnerMerchantName: info.name,
      partnerInternalMerchantIdentifier: shopRow.shop_id,
      encryptTo: c.env.APPLE_ENCRYPT_TO
    });
    await updateMerchantDomainAppleStatus(c.env.DB, {
      domain: domain2,
      status: "VERIFIED",
      lastError: null,
      appleLastCheckedAt: nowIso2()
    });
  } catch (e) {
    const message = e?.message || String(e);
    const dnsish = /merchantid-domain-association|verification|dns|http\s*404|http\s*522/i.test(message);
    await updateMerchantDomainAppleStatus(c.env.DB, {
      domain: domain2,
      status: dnsish ? "DNS_NOT_CONFIGURED" : "ERROR",
      lastError: message,
      appleLastCheckedAt: nowIso2()
    });
  }
  const md = await getMerchantDomainByDomain(c.env.DB, domain2);
  return c.json(toApplePayStatus(md, dnsInstructions), 200, { ...noStoreHeaders() });
});
function coerceHostname(input) {
  const raw2 = String(input || "").trim();
  if (!raw2) return "";
  try {
    const u = raw2.includes("://") ? new URL(raw2) : new URL(`https://${raw2}`);
    return normalizeHostname(u.hostname);
  } catch {
    return normalizeHostname(raw2.split(/[/?#]/)[0] || "");
  }
}
__name(coerceHostname, "coerceHostname");
app.post("/api/applepay/check", async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text("Not Found", 404);
  const payload = await requireShopifySession(c);
  if (payload instanceof Response) return payload;
  const shop = shopFromDest(payload.dest);
  const shopRow = await withStep(
    c,
    "db.getShopByShop",
    () => getShopByShop(c.env.DB, shop)
  );
  if (!shopRow || shopRow.uninstalled_at) {
    return c.json({ error: "App not installed for this shop" }, 401);
  }
  const md = await withStep(
    c,
    "db.getMerchantDomainByShop",
    () => getMerchantDomainByShop(c.env.DB, shop)
  );
  if (!md) return c.json(toApplePayStatus(null), 200, { ...noStoreHeaders() });
  try {
    const details = await withStep(
      c,
      "apple.getMerchantDetails",
      () => getMerchantDetails({
        fetcher: c.env.APPLE_MTLS,
        appleEnv: c.env.APPLE_ENV,
        merchantIdentifier: md.partner_internal_merchant_identifier,
        useJwt: c.env.APPLE_USE_JWT === "true",
        issuer: c.env.APPLE_ENCRYPT_TO,
        certificatePem: c.env.APPLE_JWT_CERT_PEM,
        privateKeyPem: c.env.APPLE_JWT_PRIVATE_KEY_PEM
      })
    );
    await withStep(
      c,
      "db.updateMerchantDomainAppleStatus",
      () => updateMerchantDomainAppleStatus(c.env.DB, {
        domain: md.domain,
        status: md.status,
        lastError: null,
        appleLastCheckedAt: nowIso2()
      })
    );
    return c.json(
      {
        ...toApplePayStatus(await getMerchantDomainByShop(c.env.DB, shop)),
        details
      },
      200,
      { ...noStoreHeaders() }
    );
  } catch (e) {
    await withStep(
      c,
      "db.updateMerchantDomainAppleStatus",
      () => updateMerchantDomainAppleStatus(c.env.DB, {
        domain: md.domain,
        status: "ERROR",
        lastError: e?.message || String(e),
        appleLastCheckedAt: nowIso2()
      })
    );
    return c.json(toApplePayStatus(await getMerchantDomainByShop(c.env.DB, shop)), 200, { ...noStoreHeaders() });
  }
});
app.all("*", async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) {
    return proxyMerchantTrafficToShopify(c, u);
  }
  if (c.req.method !== "GET") {
    return c.text("Not Found", 404);
  }
  const accept = c.req.header("accept") ?? "";
  if (accept.includes("text/html")) {
    const shopParam = u.searchParams.get("shop");
    const hostParam = u.searchParams.get("host");
    if (shopParam && hostParam) {
      const shop = normalizeShopParam(shopParam);
      if (isValidShopDomain(shop)) {
        const existing = await withStep(
          c,
          "db.getShopByShop",
          () => getShopByShop(c.env.DB, shop)
        );
        if (!existing) {
          const authUrl = new URL("/auth", c.env.SHOPIFY_APP_URL);
          authUrl.searchParams.set("shop", shop);
          authUrl.searchParams.set("host", hostParam);
          return c.html(oauthBounceHtml(authUrl.toString()), 200, {
            ...cspHeaders(),
            ...noStoreHeaders()
          });
        }
      }
    }
  }
  const res = await c.env.ASSETS.fetch(c.req.raw);
  const headers = new Headers(res.headers);
  Object.entries(cspHeaders()).forEach(([k, v]) => headers.set(k, v));
  Object.entries(noStoreHeaders()).forEach(([k, v]) => headers.set(k, v));
  return new Response(res.body, { status: res.status, headers });
});
var otelConfig = /* @__PURE__ */ __name((env2, _trigger) => {
  return {
    exporter: {
      url: env2.OTEL_EXPORTER_OTLP_ENDPOINT || "http://localhost:4318",
      headers: {
        // Safe extraction of the secret header
        "DD-API-KEY": env2.OTEL_EXPORTER_OTLP_HEADERS?.split("=")[1] || ""
      }
    },
    service: { name: env2.OTEL_SERVICE_NAME || "applepay-control-plane" }
  };
}, "otelConfig");
var handler = {
  // 1. Pass web requests to your existing Hono app
  fetch: app.fetch,
  // 2. Add the missing Scheduled handler for Cron triggers
  scheduled: /* @__PURE__ */ __name((_controller, _env, _ctx) => {
    console.log("Cron trigger fired");
  }, "scheduled")
};
app.onError((err, c) => {
  logEvent(c, "error", "unhandled.exception", { error: safeError(err) });
  const requestId = c.get("requestId") ?? "unknown";
  const flowId = c.get("flowId") ?? requestId;
  const accept = c.req.header("accept") ?? "";
  if (accept.includes("text/html")) {
    return c.html(
      `<!doctype html>
      <html><body style="font-family: system-ui; padding: 24px;">
        <h2>Something went wrong</h2>
        <p>Request ID: <code>${requestId}</code></p>
        <p>Flow ID: <code>${flowId}</code></p>
      </body></html>`,
      500
    );
  }
  return c.json({ error: "Internal error", requestId, flowId }, 500);
});
function normalizeHostname(hostname) {
  return hostname.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/:\d+$/, "").replace(/\/.*/, "");
}
__name(normalizeHostname, "normalizeHostname");
var src_default = instrument(handler, otelConfig);

// ../../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-rgQ56q/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// ../../node_modules/wrangler/templates/middleware/common.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-rgQ56q/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init2) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init2.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init2) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init2.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
