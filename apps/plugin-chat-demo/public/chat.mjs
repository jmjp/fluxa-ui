var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
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

// ../../node_modules/.pnpm/react@19.2.8/node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "../../node_modules/.pnpm/react@19.2.8/node_modules/react/cjs/react.development.js"(exports, module) {
    "use strict";
    (function() {
      function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              info[0],
              info[1]
            );
          }
        });
      }
      function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable)
          return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
      }
      function warnNoop(publicInstance, callerName) {
        publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
        var warningKey = publicInstance + "." + callerName;
        didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          callerName,
          publicInstance
        ), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
      }
      function Component(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      function ComponentDummy() {
      }
      function PureComponent(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      function noop() {
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        try {
          testStringCoercion(value);
          var JSCompiler_inline_result = false;
        } catch (e) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value);
        }
      }
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        newKey = ReactElement(
          oldElement.type,
          newKey,
          oldElement.props,
          oldElement._owner,
          oldElement._debugStack,
          oldElement._debugTask
        );
        oldElement._store && (newKey._store.validated = oldElement._store.validated);
        return newKey;
      }
      function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
      }
      function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function escape(key) {
        var escaperLookup = { "=": "=0", ":": "=2" };
        return "$" + key.replace(/[=:]/g, function(match) {
          return escaperLookup[match];
        });
      }
      function getElementKey(element, index) {
        return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
      }
      function resolveThenable(thenable) {
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
          default:
            switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
              function(fulfilledValue) {
                "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
              },
              function(error) {
                "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            )), thenable.status) {
              case "fulfilled":
                return thenable.value;
              case "rejected":
                throw thenable.reason;
            }
        }
        throw thenable;
      }
      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        if ("undefined" === type || "boolean" === type) children = null;
        var invokeCallback = false;
        if (null === children) invokeCallback = true;
        else
          switch (type) {
            case "bigint":
            case "string":
            case "number":
              invokeCallback = true;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true;
                  break;
                case REACT_LAZY_TYPE:
                  return invokeCallback = children._init, mapIntoArray(
                    invokeCallback(children._payload),
                    array,
                    escapedPrefix,
                    nameSoFar,
                    callback
                  );
              }
          }
        if (invokeCallback) {
          invokeCallback = children;
          callback = callback(invokeCallback);
          var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
          isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
            return c;
          })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(
            callback,
            escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(
              userProvidedKeyEscapeRegex,
              "$&/"
            ) + "/") + childKey
          ), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
          return 1;
        }
        invokeCallback = 0;
        childKey = "" === nameSoFar ? "." : nameSoFar + ":";
        if (isArrayImpl(children))
          for (var i = 0; i < children.length; i++)
            nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if (i = getIteratorFn(children), "function" === typeof i)
          for (i === children.entries && (didWarnAboutMaps || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), didWarnAboutMaps = true), children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
            nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if ("object" === type) {
          if ("function" === typeof children.then)
            return mapIntoArray(
              resolveThenable(children),
              array,
              escapedPrefix,
              nameSoFar,
              callback
            );
          array = String(children);
          throw Error(
            "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return invokeCallback;
      }
      function mapChildren(children, func, context) {
        if (null == children) return children;
        var result = [], count = 0;
        mapIntoArray(children, result, "", "", function(child) {
          return func.call(context, child, count++);
        });
        return result;
      }
      function lazyInitializer(payload) {
        if (-1 === payload._status) {
          var ioInfo = payload._ioInfo;
          null != ioInfo && (ioInfo.start = ioInfo.end = performance.now());
          ioInfo = payload._result;
          var thenable = ioInfo();
          thenable.then(
            function(moduleObject) {
              if (0 === payload._status || -1 === payload._status) {
                payload._status = 1;
                payload._result = moduleObject;
                var _ioInfo = payload._ioInfo;
                null != _ioInfo && (_ioInfo.end = performance.now());
                void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
              }
            },
            function(error) {
              if (0 === payload._status || -1 === payload._status) {
                payload._status = 2;
                payload._result = error;
                var _ioInfo2 = payload._ioInfo;
                null != _ioInfo2 && (_ioInfo2.end = performance.now());
                void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            }
          );
          ioInfo = payload._ioInfo;
          if (null != ioInfo) {
            ioInfo.value = thenable;
            var displayName = thenable.displayName;
            "string" === typeof displayName && (ioInfo.name = displayName);
          }
          -1 === payload._status && (payload._status = 0, payload._result = thenable);
        }
        if (1 === payload._status)
          return ioInfo = payload._result, void 0 === ioInfo && console.error(
            "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
            ioInfo
          ), "default" in ioInfo || console.error(
            "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
            ioInfo
          ), ioInfo.default;
        throw payload._result;
      }
      function resolveDispatcher() {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
        return dispatcher;
      }
      function releaseAsyncTransition() {
        ReactSharedInternals.asyncTransitions--;
      }
      function enqueueTask(task) {
        if (null === enqueueTaskImpl)
          try {
            var requireString = ("require" + Math.random()).slice(0, 7);
            enqueueTaskImpl = (module && module[requireString]).call(
              module,
              "timers"
            ).setImmediate;
          } catch (_err) {
            enqueueTaskImpl = function(callback) {
              false === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = true, "undefined" === typeof MessageChannel && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var channel = new MessageChannel();
              channel.port1.onmessage = callback;
              channel.port2.postMessage(void 0);
            };
          }
        return enqueueTaskImpl(task);
      }
      function aggregateErrors(errors) {
        return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
      }
      function popActScope(prevActQueue, prevActScopeDepth) {
        prevActScopeDepth !== actScopeDepth - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        );
        actScopeDepth = prevActScopeDepth;
      }
      function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
        var queue = ReactSharedInternals.actQueue;
        if (null !== queue)
          if (0 !== queue.length)
            try {
              flushActQueue(queue);
              enqueueTask(function() {
                return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
              });
              return;
            } catch (error) {
              ReactSharedInternals.thrownErrors.push(error);
            }
          else ReactSharedInternals.actQueue = null;
        0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
      }
      function flushActQueue(queue) {
        if (!isFlushing) {
          isFlushing = true;
          var i = 0;
          try {
            for (; i < queue.length; i++) {
              var callback = queue[i];
              do {
                ReactSharedInternals.didUsePromise = false;
                var continuation = callback(false);
                if (null !== continuation) {
                  if (ReactSharedInternals.didUsePromise) {
                    queue[i] = callback;
                    queue.splice(0, i);
                    return;
                  }
                  callback = continuation;
                } else break;
              } while (1);
            }
            queue.length = 0;
          } catch (error) {
            queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
          } finally {
            isFlushing = false;
          }
        }
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
        isMounted: function() {
          return false;
        },
        enqueueForceUpdate: function(publicInstance) {
          warnNoop(publicInstance, "forceUpdate");
        },
        enqueueReplaceState: function(publicInstance) {
          warnNoop(publicInstance, "replaceState");
        },
        enqueueSetState: function(publicInstance) {
          warnNoop(publicInstance, "setState");
        }
      }, assign = Object.assign, emptyObject = {};
      Object.freeze(emptyObject);
      Component.prototype.isReactComponent = {};
      Component.prototype.setState = function(partialState, callback) {
        if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, partialState, callback, "setState");
      };
      Component.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
      };
      var deprecatedAPIs = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      };
      for (fnName in deprecatedAPIs)
        deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      ComponentDummy.prototype = Component.prototype;
      deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
      deprecatedAPIs.constructor = PureComponent;
      assign(deprecatedAPIs, Component.prototype);
      deprecatedAPIs.isPureReactComponent = true;
      var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference"), ReactSharedInternals = {
        H: null,
        A: null,
        T: null,
        S: null,
        actQueue: null,
        asyncTransitions: 0,
        isBatchingLegacy: false,
        didScheduleLegacyUpdate: false,
        didUsePromise: false,
        thrownErrors: [],
        getCurrentStack: null,
        recentlyCreatedOwnerStacks: 0
      }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      deprecatedAPIs = {
        react_stack_bottom_frame: function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(
        deprecatedAPIs,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
        if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
          var event = new window.ErrorEvent("error", {
            bubbles: true,
            cancelable: true,
            message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
            error
          });
          if (!window.dispatchEvent(event)) return;
        } else if ("object" === typeof process && "function" === typeof process.emit) {
          process.emit("uncaughtException", error);
          return;
        }
        console.error(error);
      }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
        queueMicrotask(function() {
          return queueMicrotask(callback);
        });
      } : enqueueTask;
      deprecatedAPIs = Object.freeze({
        __proto__: null,
        c: function(size) {
          return resolveDispatcher().useMemoCache(size);
        }
      });
      var fnName = {
        map: mapChildren,
        forEach: function(children, forEachFunc, forEachContext) {
          mapChildren(
            children,
            function() {
              forEachFunc.apply(this, arguments);
            },
            forEachContext
          );
        },
        count: function(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        },
        toArray: function(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        },
        only: function(children) {
          if (!isValidElement(children))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return children;
        }
      };
      exports.Activity = REACT_ACTIVITY_TYPE;
      exports.Children = fnName;
      exports.Component = Component;
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.Profiler = REACT_PROFILER_TYPE;
      exports.PureComponent = PureComponent;
      exports.StrictMode = REACT_STRICT_MODE_TYPE;
      exports.Suspense = REACT_SUSPENSE_TYPE;
      exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
      exports.__COMPILER_RUNTIME = deprecatedAPIs;
      exports.act = function(callback) {
        var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
        actScopeDepth++;
        var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = false;
        try {
          var result = callback();
        } catch (error) {
          ReactSharedInternals.thrownErrors.push(error);
        }
        if (0 < ReactSharedInternals.thrownErrors.length)
          throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        if (null !== result && "object" === typeof result && "function" === typeof result.then) {
          var thenable = result;
          queueSeveralMicrotasks(function() {
            didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          });
          return {
            then: function(resolve, reject) {
              didAwaitActCall = true;
              thenable.then(
                function(returnValue) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  if (0 === prevActScopeDepth) {
                    try {
                      flushActQueue(queue), enqueueTask(function() {
                        return recursivelyFlushAsyncActWork(
                          returnValue,
                          resolve,
                          reject
                        );
                      });
                    } catch (error$0) {
                      ReactSharedInternals.thrownErrors.push(error$0);
                    }
                    if (0 < ReactSharedInternals.thrownErrors.length) {
                      var _thrownError = aggregateErrors(
                        ReactSharedInternals.thrownErrors
                      );
                      ReactSharedInternals.thrownErrors.length = 0;
                      reject(_thrownError);
                    }
                  } else resolve(returnValue);
                },
                function(error) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(
                    ReactSharedInternals.thrownErrors
                  ), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
                }
              );
            }
          };
        }
        var returnValue$jscomp$0 = result;
        popActScope(prevActQueue, prevActScopeDepth);
        0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
          didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), ReactSharedInternals.actQueue = null);
        if (0 < ReactSharedInternals.thrownErrors.length)
          throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        return {
          then: function(resolve, reject) {
            didAwaitActCall = true;
            0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
              return recursivelyFlushAsyncActWork(
                returnValue$jscomp$0,
                resolve,
                reject
              );
            })) : resolve(returnValue$jscomp$0);
          }
        };
      };
      exports.cache = function(fn) {
        return function() {
          return fn.apply(null, arguments);
        };
      };
      exports.cacheSignal = function() {
        return null;
      };
      exports.captureOwnerStack = function() {
        var getCurrentStack = ReactSharedInternals.getCurrentStack;
        return null === getCurrentStack ? null : getCurrentStack();
      };
      exports.cloneElement = function(element, config, children) {
        if (null === element || void 0 === element)
          throw Error(
            "The argument must be a React element, but you passed " + element + "."
          );
        var props = assign({}, element.props), key = element.key, owner = element._owner;
        if (null != config) {
          var JSCompiler_inline_result;
          a: {
            if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
              config,
              "ref"
            ).get) && JSCompiler_inline_result.isReactWarning) {
              JSCompiler_inline_result = false;
              break a;
            }
            JSCompiler_inline_result = void 0 !== config.ref;
          }
          JSCompiler_inline_result && (owner = getOwner());
          hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
          for (propName in config)
            !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
        }
        var propName = arguments.length - 2;
        if (1 === propName) props.children = children;
        else if (1 < propName) {
          JSCompiler_inline_result = Array(propName);
          for (var i = 0; i < propName; i++)
            JSCompiler_inline_result[i] = arguments[i + 2];
          props.children = JSCompiler_inline_result;
        }
        props = ReactElement(
          element.type,
          key,
          props,
          owner,
          element._debugStack,
          element._debugTask
        );
        for (key = 2; key < arguments.length; key++)
          validateChildKeys(arguments[key]);
        return props;
      };
      exports.createContext = function(defaultValue) {
        defaultValue = {
          $$typeof: REACT_CONTEXT_TYPE,
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        };
        defaultValue.Provider = defaultValue;
        defaultValue.Consumer = {
          $$typeof: REACT_CONSUMER_TYPE,
          _context: defaultValue
        };
        defaultValue._currentRenderer = null;
        defaultValue._currentRenderer2 = null;
        return defaultValue;
      };
      exports.createElement = function(type, config, children) {
        for (var i = 2; i < arguments.length; i++)
          validateChildKeys(arguments[i]);
        i = {};
        var key = null;
        if (null != config)
          for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), config)
            hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
        var childrenLength = arguments.length - 2;
        if (1 === childrenLength) i.children = children;
        else if (1 < childrenLength) {
          for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
            childArray[_i] = arguments[_i + 2];
          Object.freeze && Object.freeze(childArray);
          i.children = childArray;
        }
        if (type && type.defaultProps)
          for (propName in childrenLength = type.defaultProps, childrenLength)
            void 0 === i[propName] && (i[propName] = childrenLength[propName]);
        key && defineKeyPropWarningGetter(
          i,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return ReactElement(
          type,
          key,
          i,
          getOwner(),
          propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports.createRef = function() {
        var refObject = { current: null };
        Object.seal(refObject);
        return refObject;
      };
      exports.forwardRef = function(render) {
        null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error(
          "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
        ) : "function" !== typeof render ? console.error(
          "forwardRef requires a render function but was given %s.",
          null === render ? "null" : typeof render
        ) : 0 !== render.length && 2 !== render.length && console.error(
          "forwardRef render functions accept exactly two parameters: props and ref. %s",
          1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        );
        null != render && null != render.defaultProps && console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
        var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
        Object.defineProperty(elementType, "displayName", {
          enumerable: false,
          configurable: true,
          get: function() {
            return ownName;
          },
          set: function(name) {
            ownName = name;
            render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
          }
        });
        return elementType;
      };
      exports.isValidElement = isValidElement;
      exports.lazy = function(ctor) {
        ctor = { _status: -1, _result: ctor };
        var lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _payload: ctor,
          _init: lazyInitializer
        }, ioInfo = {
          name: "lazy",
          start: -1,
          end: -1,
          value: null,
          owner: null,
          debugStack: Error("react-stack-top-frame"),
          debugTask: console.createTask ? console.createTask("lazy()") : null
        };
        ctor._ioInfo = ioInfo;
        lazyType._debugInfo = [{ awaited: ioInfo }];
        return lazyType;
      };
      exports.memo = function(type, compare) {
        null == type && console.error(
          "memo: The first argument must be a component. Instead received: %s",
          null === type ? "null" : typeof type
        );
        compare = {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: void 0 === compare ? null : compare
        };
        var ownName;
        Object.defineProperty(compare, "displayName", {
          enumerable: false,
          configurable: true,
          get: function() {
            return ownName;
          },
          set: function(name) {
            ownName = name;
            type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
          }
        });
        return compare;
      };
      exports.startTransition = function(scope) {
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        currentTransition._updatedFibers = /* @__PURE__ */ new Set();
        ReactSharedInternals.T = currentTransition;
        try {
          var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
          null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
          "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && (ReactSharedInternals.asyncTransitions++, returnValue.then(releaseAsyncTransition, releaseAsyncTransition), returnValue.then(noop, reportGlobalError));
        } catch (error) {
          reportGlobalError(error);
        } finally {
          null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), null !== prevTransition && null !== currentTransition.types && (null !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error(
            "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
          ), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
        }
      };
      exports.unstable_useCacheRefresh = function() {
        return resolveDispatcher().useCacheRefresh();
      };
      exports.use = function(usable) {
        return resolveDispatcher().use(usable);
      };
      exports.useActionState = function(action, initialState, permalink) {
        return resolveDispatcher().useActionState(
          action,
          initialState,
          permalink
        );
      };
      exports.useCallback = function(callback, deps) {
        return resolveDispatcher().useCallback(callback, deps);
      };
      exports.useContext = function(Context) {
        var dispatcher = resolveDispatcher();
        Context.$$typeof === REACT_CONSUMER_TYPE && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        );
        return dispatcher.useContext(Context);
      };
      exports.useDebugValue = function(value, formatterFn) {
        return resolveDispatcher().useDebugValue(value, formatterFn);
      };
      exports.useDeferredValue = function(value, initialValue) {
        return resolveDispatcher().useDeferredValue(value, initialValue);
      };
      exports.useEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useEffect(create, deps);
      };
      exports.useEffectEvent = function(callback) {
        return resolveDispatcher().useEffectEvent(callback);
      };
      exports.useId = function() {
        return resolveDispatcher().useId();
      };
      exports.useImperativeHandle = function(ref, create, deps) {
        return resolveDispatcher().useImperativeHandle(ref, create, deps);
      };
      exports.useInsertionEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useInsertionEffect(create, deps);
      };
      exports.useLayoutEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useLayoutEffect(create, deps);
      };
      exports.useMemo = function(create, deps) {
        return resolveDispatcher().useMemo(create, deps);
      };
      exports.useOptimistic = function(passthrough, reducer) {
        return resolveDispatcher().useOptimistic(passthrough, reducer);
      };
      exports.useReducer = function(reducer, initialArg, init) {
        return resolveDispatcher().useReducer(reducer, initialArg, init);
      };
      exports.useRef = function(initialValue) {
        return resolveDispatcher().useRef(initialValue);
      };
      exports.useState = function(initialState) {
        return resolveDispatcher().useState(initialState);
      };
      exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
        return resolveDispatcher().useSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      };
      exports.useTransition = function() {
        return resolveDispatcher().useTransition();
      };
      exports.version = "19.2.8";
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// ../../node_modules/.pnpm/react@19.2.8/node_modules/react/index.js
var require_react = __commonJS({
  "../../node_modules/.pnpm/react@19.2.8/node_modules/react/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_development();
    }
  }
});

// ../../packages/plugin-sdk/src/define-panel.tsx
function definePanel(panel) {
  return panel;
}

// src/panels/chat-main.tsx
var import_react = __toESM(require_react());

// src/lib/api.ts
var BASE = "/api";
async function request(path, init) {
  const resp = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init
  });
  const json = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    throw new Error(json?.error?.message ?? `request failed (${resp.status})`);
  }
  return json?.data;
}
function fetchThread(conversationId, since) {
  const qs = since ? `?since=${encodeURIComponent(since)}` : "";
  return request(`/conversations/${conversationId}/messages${qs}`);
}
function sendInbound(opts) {
  const body = {
    customer_ref: opts.customerRef,
    text: opts.text
  };
  if (opts.channel) body.channel = opts.channel;
  return request(`/channels/webchat_sim/messages`, {
    method: "POST",
    body: JSON.stringify(body)
  });
}
function formatTime(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

// src/panels/chat.css.ts
var FCW_CSS = `
/* \u2500\u2500 tokens (id\xEAnticos ao prot\xF3tipo) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fcw {
  --bg:      oklch(98.6% 0.002 250);
  --surface: oklch(100% 0 0);
  --fg:      oklch(18% 0.008 250);
  --muted:   oklch(47% 0.01 250);
  --border:  oklch(90.5% 0.005 250);
  --accent:  oklch(18% 0.008 250);

  --accent-soft:  color-mix(in oklch, var(--accent) 8%, transparent);
  --accent-mid:   color-mix(in oklch, var(--accent) 30%, white);
  --accent-hover: oklch(31% 0.014 250);
  --fg-soft:      color-mix(in oklch, var(--fg) 6%, transparent);
  --online:       oklch(69% 0.16 152);

  --font-display: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-body:    'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-mono:    ui-monospace, 'SF Mono', 'JetBrains Mono', 'Cascadia Mono', Menlo, monospace;

  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-body);
  font-size: 14px; line-height: 1.5;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
.fcw *, .fcw *::before, .fcw *::after { box-sizing: border-box; }
.fcw button { font: inherit; cursor: pointer; }
.fcw input, .fcw textarea { font: inherit; color: inherit; }
.fcw p { text-wrap: pretty; }
.fcw h1, .fcw h2, .fcw h3 { text-wrap: balance; margin: 0; }
.fcw :focus-visible { outline: 2px solid var(--accent-mid); outline-offset: 2px; border-radius: 6px; }
.fcw .fcw-num { font-family: var(--font-mono); font-variant-numeric: tabular-nums; }

/* \u2500\u2500 panel (janela de chat embutida) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fcw-panel {
  flex: 1 1 auto;
  min-height: 0;
  height: clamp(460px, 66vh, 720px);
  display: flex; flex-direction: column; overflow: hidden;
  background: var(--bg);
  border: 1px solid var(--border); border-radius: 18px;
  box-shadow: 0 24px 70px color-mix(in oklch, var(--accent) 16%, transparent);
}

.fcw-head {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 16px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}
.fcw-brand-avatar {
  width: 40px; height: 40px; border-radius: 12px;
  display: grid; place-items: center;
  background: var(--accent); color: var(--surface);
  font-family: var(--font-display); font-size: 18px; font-weight: 700;
  letter-spacing: -0.02em;
}
.fcw-head-id { flex: 1 1 auto; min-width: 0; }
.fcw-head-id .fcw-name { font-family: var(--font-display); font-size: 15px; font-weight: 700; letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fcw-head-id .fcw-status { display: flex; align-items: center; gap: 6px; color: var(--muted); font-size: 12px; }
.fcw-head-id .fcw-status .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--online); }
.fcw-head-actions { display: flex; gap: 4px; }
.fcw-iconbtn {
  min-width: 40px; min-height: 34px;
  display: grid; place-items: center;
  border: 0; border-radius: 9px; background: transparent; color: var(--muted);
  transition: background 0.15s ease, color 0.15s ease;
}
.fcw-iconbtn:hover { background: var(--fg-soft); color: var(--fg); }
.fcw-iconbtn svg { width: 20px; height: 20px; }

/* \u2500\u2500 thread \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fcw-thread {
  flex: 1 1 auto; overflow-y: auto; padding: 18px 16px 12px;
  display: flex; flex-direction: column; gap: 12px;
}
.fcw-day {
  align-self: center; padding: 4px 12px; border-radius: 999px;
  background: var(--surface); border: 1px solid var(--border);
  color: var(--muted); font-family: var(--font-mono); font-size: 10.5px;
}
.fcw-msg { max-width: 80%; display: flex; flex-direction: column; }
.fcw-msg.in  { align-self: flex-start; }
.fcw-msg.out { align-self: flex-end; align-items: flex-end; }
.fcw-msg .fcw-bubble { padding: 10px 13px; border-radius: 14px; font-size: 13.5px; line-height: 1.5; }
.fcw-msg.in  .fcw-bubble { background: var(--surface); border: 1px solid var(--border); border-top-left-radius: 4px; }
.fcw-msg.out .fcw-bubble { background: var(--accent); color: var(--surface); border-top-right-radius: 4px; }
.fcw-msg .fcw-when { margin-top: 4px; color: var(--muted); font-family: var(--font-mono); font-size: 10px; }
.fcw-card-msg .fcw-bubble { width: 100%; padding: 0; overflow: hidden; }
.fcw-card { width: 100%; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
.fcw-card-top { background: var(--accent); color: var(--surface); padding: 12px 14px; }
.fcw-card-top .fcw-kicker { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.78; }
.fcw-card-top .fcw-card-title { font-family: var(--font-display); font-size: 15px; font-weight: 700; letter-spacing: -0.01em; margin-top: 2px; }
.fcw-card-body { padding: 14px; display: flex; flex-direction: column; gap: 10px; }
.fcw-card-row { display: flex; justify-content: space-between; gap: 12px; font-size: 13px; }
.fcw-card-row .fcw-k { color: var(--muted); }
.fcw-card-row .fcw-v { font-family: var(--font-mono); font-size: 12.5px; font-variant-numeric: tabular-nums; text-align: right; }
.fcw-card-row.total .fcw-v { font-size: 15px; font-weight: 600; }
.fcw-card-body hr { border: 0; border-top: 1px solid var(--border); margin: 0; }
.fcw-card-btn {
  width: 100%; padding: 11px; border: 1px solid var(--accent); border-radius: 9px;
  background: var(--accent); color: var(--surface); font-weight: 600;
  transition: background 0.15s ease;
}
.fcw-card-btn:hover { background: var(--accent-hover); }
.fcw-card-btn.secondary { background: transparent; color: var(--accent); }
.fcw-card-btn.secondary:hover { background: var(--accent-soft); }

/* \u2500\u2500 typing indicator \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fcw-typing { display: inline-flex; gap: 4px; padding: 12px 15px; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; border-top-left-radius: 4px; }
.fcw-typing span { width: 6px; height: 6px; border-radius: 50%; background: var(--muted); animation: fcw-blink 1.2s ease-in-out infinite; }
.fcw-typing span:nth-child(2) { animation-delay: 0.18s; }
.fcw-typing span:nth-child(3) { animation-delay: 0.36s; }
@keyframes fcw-blink { 0%, 80%, 100% { opacity: 0.3; } 40% { opacity: 1; } }
.fcw-hidden { display: none !important; }

/* \u2500\u2500 composer \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fcw-composer { padding: 12px 14px 16px; border-top: 1px solid var(--border); background: var(--surface); }
.fcw-composer-box { display: flex; align-items: flex-end; gap: 8px; padding: 8px 8px 8px 13px; border: 1px solid var(--border); border-radius: 14px; background: var(--surface); transition: border-color 0.15s ease, box-shadow 0.15s ease; }
.fcw-composer-box:focus-within { border-color: var(--accent-mid); box-shadow: 0 0 0 3px var(--accent-soft); }
.fcw-composer-box textarea { flex: 1 1 auto; border: 0; resize: none; background: transparent; font-size: 13.5px; line-height: 1.45; max-height: 96px; padding: 6px 0; }
.fcw-composer-box textarea:focus { outline: none; }
.fcw-send { min-width: 36px; min-height: 36px; flex: 0 0 auto; display: grid; place-items: center; border: 0; border-radius: 9px; background: var(--accent); color: var(--surface); transition: background 0.15s ease, opacity 0.15s ease; }
.fcw-send:hover { background: var(--accent-hover); }
.fcw-send:disabled { opacity: 0.4; cursor: default; }
.fcw-send svg { width: 18px; height: 18px; }

/* \u2500\u2500 rating footer \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fcw-rating { padding: 12px 14px; border-top: 1px solid var(--border); background: var(--surface); display: flex; flex-direction: column; gap: 10px; }
.fcw-rating-title { font-size: 13px; font-weight: 600; }
.fcw-stars { display: flex; gap: 6px; }
.fcw-star { min-width: 38px; min-height: 38px; display: grid; place-items: center; border: 1px solid var(--border); border-radius: 9px; background: transparent; color: var(--muted); transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease; }
.fcw-star:hover { background: var(--fg-soft); color: var(--fg); }
.fcw-star.sel { background: var(--accent); border-color: var(--accent); color: var(--surface); }
.fcw-star svg { width: 17px; height: 17px; }

/* \u2500\u2500 sidebar / contexto (agent) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fcw-detail__title { font-size: 13px; font-weight: 700; margin: 0 0 12px; }
.fcw-rows { display: grid; grid-template-columns: 1fr; gap: 0; margin: 0; }
.fcw-row { display: flex; justify-content: space-between; gap: 12px; padding: 9px 0; border-bottom: 1px solid var(--border); }
.fcw-row:last-child { border-bottom: 0; }
.fcw-row dt { color: var(--muted); font-size: 12px; }
.fcw-row dd { margin: 0; font-weight: 600; font-size: 12px; text-align: right; }
.fcw-actions { display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; }
.fcw-btn { font-weight: 600; font-size: 12px; padding: 8px 14px; border-radius: 10px; border: 1px solid transparent; cursor: pointer; transition: background 0.15s ease; }
.fcw-btn--primary { background: var(--accent); color: var(--surface); }
.fcw-btn--primary:hover { background: var(--accent-hover); }
.fcw-btn--ghost { background: var(--surface); border-color: var(--border); color: var(--accent); }
.fcw-btn--ghost:hover { background: var(--fg-soft); }
.fcw-context { margin-top: 14px; }
.fcw-context__title { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); margin: 0 0 8px; }
.fcw-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.fcw-chipctx { font-size: 11px; background: var(--fg-soft); color: var(--fg); border: 1px solid var(--border); border-radius: 999px; padding: 4px 10px; font-family: var(--font-mono); }

@media (max-width: 480px) {
  .fcw-msg { max-width: 92%; }
}
`;

// src/panels/chat-main.tsx
function ChatMain({ conversationId, context, config }) {
  const [thread, setThread] = (0, import_react.useState)([]);
  const [draft, setDraft] = (0, import_react.useState)("");
  const [sending, setSending] = (0, import_react.useState)(false);
  const [error, setError] = (0, import_react.useState)(null);
  const sinceRef = (0, import_react.useRef)(null);
  const threadRef = (0, import_react.useRef)(null);
  const customerRef = config.customer_ref ?? "";
  const loadThread = (0, import_react.useCallback)(async () => {
    try {
      const list = await fetchThread(conversationId, sinceRef.current ?? void 0);
      setThread((old) => {
        const merged = /* @__PURE__ */ new Map();
        for (const msg of old) merged.set(msg.id, msg);
        for (const msg of list) merged.set(msg.id, msg);
        return [...merged.values()].sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      });
      const latest = list.reduce(
        (acc, msg) => acc && acc >= msg.created_at ? acc : msg.created_at,
        null
      );
      if (latest) sinceRef.current = latest;
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "falha ao carregar a conversa");
    }
  }, [conversationId]);
  const scrollToEnd = (0, import_react.useCallback)(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);
  (0, import_react.useEffect)(() => {
    sinceRef.current = null;
    setThread([]);
    void loadThread();
    const poll = window.setInterval(() => void loadThread(), 2e3);
    return () => window.clearInterval(poll);
  }, [conversationId, loadThread]);
  (0, import_react.useEffect)(() => {
    requestAnimationFrame(scrollToEnd);
  }, [thread.length, scrollToEnd]);
  const send = (0, import_react.useCallback)(async () => {
    const value = draft.trim();
    if (!value || sending || !customerRef) return;
    setSending(true);
    try {
      await sendInbound({ customerRef, text: value, channel: config.channel });
      setDraft("");
      await loadThread();
    } catch (err) {
      setError(err instanceof Error ? err.message : "n\xE3o foi poss\xEDvel enviar");
    } finally {
      setSending(false);
    }
  }, [draft, sending, customerRef, config.channel, loadThread]);
  const headStatus = (0, import_react.useMemo)(
    () => `Online agora${context.order_number ? ` \xB7 ${context.order_number}` : ""}`,
    [context.order_number]
  );
  return /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("div", { className: "fcw" }, /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("style", null, FCW_CSS), /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("div", { className: "fcw-panel", role: "dialog", "aria-label": "Chat com a Fluxa" }, /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("div", { className: "fcw-head" }, /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("span", { className: "fcw-brand-avatar", "aria-hidden": "true" }, "F"), /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("div", { className: "fcw-head-id" }, /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("div", { className: "fcw-name" }, "Fluxa \xB7 Atendimento"), /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("div", { className: "fcw-status" }, /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("span", { className: "dot" }), headStatus)), /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("div", { className: "fcw-head-actions" }, /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("span", { className: "fcw-num fcw-iconbtn", title: `Conversa ${conversationId}`, "aria-label": `Conversa ${conversationId}` }, /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }, /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("path", { d: "M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5z" }))))), /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("div", { className: "fcw-thread", ref: threadRef, role: "log", "aria-live": "polite" }, /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("span", { className: "fcw-day" }, "Hoje"), thread.length === 0 && !error && /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("div", { className: "fcw-day" }, "Carregando conversa\u2026"), thread.map((msg) => {
    const side = msg.direction === "inbound" ? "out" : "in";
    return /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("div", { key: msg.id, className: `fcw-msg ${side}` }, /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("div", { className: "fcw-bubble" }, msg.body), /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("span", { className: "fcw-when" }, formatTime(msg.created_at)));
  }), error && /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("div", { className: "fcw-msg in" }, /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("div", { className: "fcw-bubble" }, error), /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("span", { className: "fcw-when" }, "\u2014"))), /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("div", { className: "fcw-composer" }, /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement(
    "form",
    {
      className: "fcw-composer-box",
      onSubmit: (event) => {
        event.preventDefault();
        void send();
      }
    },
    /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement(
      "textarea",
      {
        rows: 1,
        value: draft,
        placeholder: customerRef ? "Escreva sua mensagem\u2026" : "Nenhuma conversa selecionada",
        "aria-label": "Escreva sua mensagem",
        disabled: !customerRef,
        onChange: (event) => setDraft(event.target.value),
        onKeyDown: (event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            void send();
          }
        }
      }
    ),
    /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement(
      "button",
      {
        className: "fcw-send",
        type: "submit",
        "aria-label": "Enviar mensagem",
        disabled: sending || !customerRef || !draft.trim()
      },
      /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("path", { d: "M3 12l18-8-6 18-3.5-6.5L3 12z" }))
    )
  ))));
}

// src/panels/chat-data.ts
var DEMO_ORDER = {
  number: "FLX-4821",
  item: "Estante Ordem",
  pay: "Cart\xE3o final 4482",
  status: "Aguardando 1\xAA parcela",
  total: "R$ 189,00"
};

// src/panels/chat-sidebar.tsx
var CONTEXT_LABELS = {
  order_number: "Pedido",
  order_item: "Item",
  order_status: "Status",
  order_total: "Total",
  channel: "Canal",
  rating: "Avalia\xE7\xE3o"
};
var DEFAULT_CONTEXT = [
  ["channel", "webchat"],
  ["language", "pt-BR"],
  ["account", "verada-loft"]
];
function ChatSidebar({ context, onAction }) {
  const orderRows = [
    ["Pedido", context.order_number ?? DEMO_ORDER.number],
    ["Item", context.order_item ?? DEMO_ORDER.item],
    ["Status", context.order_status ?? DEMO_ORDER.status],
    ["Total", context.order_total ?? DEMO_ORDER.total]
  ];
  const otherCtx = [
    ...DEFAULT_CONTEXT,
    ...Object.entries(context).filter(([key]) => !orderRows.some(([k]) => k === key))
  ].filter(([, value]) => value);
  return /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("div", { className: "fcw" }, /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("style", null, FCW_CSS), /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("h3", { className: "fcw-detail__title" }, "Contexto da conversa"), /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("dl", { className: "fcw-rows" }, orderRows.map(([k, v]) => /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("div", { className: "fcw-row", key: k }, /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("dt", null, CONTEXT_LABELS[k] ?? k), /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("dd", null, v)))), /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("div", { className: "fcw-actions" }, /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement(
    "button",
    {
      type: "button",
      className: "fcw-btn fcw-btn--ghost",
      onClick: () => onAction({ type: "suggest_transition", toStepId: "pagamento" })
    },
    "Sugerir Pagamento"
  ), /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement(
    "button",
    {
      type: "button",
      className: "fcw-btn fcw-btn--primary",
      onClick: () => onAction({
        type: "context_update",
        updates: { order_status: "Pago", resolution: "link_pix" }
      })
    },
    "Registrar quita\xE7\xE3o"
  )), otherCtx.length > 0 && /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("div", { className: "fcw-context" }, /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("p", { className: "fcw-context__title" }, "Contexto acumulado"), /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("div", { className: "fcw-chips" }, otherCtx.map(([key, value]) => /* @__PURE__ */ globalThis.__FLUXA_REACT__.createElement("span", { key, className: "fcw-chipctx" }, key, "=", value)))));
}

// src/panels/index.ts
var index_default = [
  definePanel({ slot: "main", component: ChatMain, displayName: "Conversa simulada" }),
  definePanel({ slot: "sidebar", component: ChatSidebar, displayName: "Contexto da conversa" })
];
export {
  index_default as default
};
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
