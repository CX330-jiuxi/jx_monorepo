import { jsx } from 'react/jsx-runtime';
import { useContext, useLayoutEffect, useReducer, useRef, createContext } from 'react';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/**
 * @description 精确获取object数据类型
 * @data 2020/9/9
 * @param {any} target 目标数据
 */
var getObjectType = function getObjectType(target) {
  var type = Object.prototype.toString.call(target);

  switch (type) {
    case '[object Array]':
      return 'Array';

    case '[object Object]':
      return 'Object';

    case '[object Function]':
      return 'Function';

    case '[object Undefined]':
      return 'Undefined';

    case '[object Null]':
      return 'Null';

    case '[object Number]':
      return 'Number';

    case '[object String]':
      return 'String';

    case '[object Boolean]':
      return 'Boolean';

    case '[object Set]':
      return 'Set';

    case '[object Map]':
      return 'Map';

    default:
      return 'Error';
  }
};

/**
 * @description 判断两个数据类型是否值是否相等
 * @data 2020/9/9
 * @param {*} a 比对数据
 * @param {*} b 目标数据
 * @param {Array<ReturnType<TGetObjectType>>} excludes 忽略校验的类型，只有当新旧数据类型一样前提下，才生效
 * @return {boolean}
 */

function equalComplex(a, b, excludes) {
  // 判断类型
  var tA = getObjectType(a);
  var tB = getObjectType(b);
  if (tA !== tB) return false;else if (tA === 'Undefined' || tA === 'Null') return true;else if (excludes === null || excludes === void 0 ? void 0 : excludes.includes(tA)) return true;else if (tA === 'String' || tA === 'Number' || tA === 'Boolean' || tA === 'Function') return a === b;else if (tA === 'Array') {
    if ((a === null || a === void 0 ? void 0 : a.length) !== (b === null || b === void 0 ? void 0 : b.length)) return false;else {
      // 循环遍历数组的值进行比较
      for (var i = 0; i < a.length; i++) {
        if (!equalComplex(a[i], b[i], excludes)) return false;
      }

      return true;
    }
  } else if (tA === 'Object') {
    if (Object.keys(a).length !== Object.keys(b).length) return false;

    for (var _i in a) {
      if (!equalComplex(a[_i], b[_i], excludes)) return false;
    }

    return true;
  } else if (tA === 'Set') {
    return equalComplex(Array.from(a), Array.from(b), excludes);
  } else if (tA === 'Map') {
    var aMapArr = _toConsumableArray(a);

    var bMapArr = _toConsumableArray(b);

    if (aMapArr.length !== bMapArr.length) return false;

    for (var _i2 = 0; _i2 < aMapArr.length; _i2++) {
      if (!equalComplex(aMapArr[_i2][0], bMapArr[_i2][0], excludes) || !equalComplex(aMapArr[_i2][1], bMapArr[_i2][1], excludes)) return false;
    }

    return true;
  } else return false;
}

/**
 * 创建状态管理store
 * 注意：当有Function返回时，由于hooks每次执行会生成新function，可能会导致按需rerender失效
 * 简易使用useReducer返回的dispatch，或者对返回function进行缓存
 * @param useHooks 通过hooks 返回原始store结构
 * @return {Provider, useSelector}
 */

function createStore(useHooks) {
  // @ts-ignore
  // 生成上下文，禁止context原由rerender行为
  var Context = /*#__PURE__*/createContext(undefined, function () {
    return 0;
  }); // @ts-ignore
  // 创建数据订阅队列，用于保存使用useSelector组件的更新函数

  var ListenerContext = /*#__PURE__*/createContext(new Set(), function () {
    return 0;
  });
  /**
   * 作用一：抽离context provider包裹，简化使用代码
   * 作用二：当使用store数据更新时，通过useHooks，触发Provider rerender，然后通过数据订阅列表触发使用useSelector 中update（由于Context原由render机制已被禁止）
   * @param initialState store初始化数据支持调用Provider组件时通过props传入
   * @param children
   */

  var Provider = function Provider(_ref) {
    var initialState = _ref.initialState,
        children = _ref.children;
    // 获取store上下文
    var store = useHooks(initialState); // 获取订阅列表上下文

    var listeners = useContext(ListenerContext);
    useLayoutEffect(function () {
      // 创建消息通道
      var _MessageChannel = new MessageChannel(),
          port1 = _MessageChannel.port1,
          port2 = _MessageChannel.port2; // 接受消息


      port1.onmessage = function () {
        listeners.forEach(function (listener) {
          return listener(store);
        });
      }; // 发送消息


      port2.postMessage('');
    }, [store, listeners]);
    return jsx(Context.Provider, {
      value: store,
      children: jsx(ListenerContext.Provider, {
        value: listeners,
        children: children
      }, void 0)
    }, void 0);
  };
  /**
   * 一：从store中筛选出需要数据
   * 二：注册数据订阅，在筛选出得数据改变时，才触发rerender
   * 三：selector接受第二个参数为上次render数据，直接返回也可阻止render
   * @param selector 数据筛选
   */


  function useSelector(selector) {
    var _lastSelectRef$curren;

    // 强制更新
    var _useReducer = useReducer(function () {
      return {};
    }, {}),
        _useReducer2 = _slicedToArray(_useReducer, 2),
        forceUpdate = _useReducer2[1]; // 从context获取store


    var store = useContext(Context); // 获取数据订阅列表

    var listeners = useContext(ListenerContext); // 通过ref保存上次render数据，方便 Effect 依赖为[]时可以访问最新数据，用于新老数据对比，决定是否render

    var lastSelectRef = useRef(); // 获取筛选数据

    var selected = selector(store, (_lastSelectRef$curren = lastSelectRef.current) === null || _lastSelectRef$curren === void 0 ? void 0 : _lastSelectRef$curren.selected); // 在所有子组件render后保存本次render数据

    useLayoutEffect(function () {
      var _lastSelectRef$curren2;

      lastSelectRef.current = {
        store: store,
        selector: selector,
        selected: selector(store, (_lastSelectRef$curren2 = lastSelectRef.current) === null || _lastSelectRef$curren2 === void 0 ? void 0 : _lastSelectRef$curren2.selected)
      };
    }, [selector]);
    useLayoutEffect(function () {
      /**
       * 数据订阅回调
       * @param newStore 更新后的store 由Provider 调用
       */
      function listener(newStore) {
        //  取出上一次缓存
        var lastSelectData = lastSelectRef.current; // 兼容

        if (!lastSelectData) return; // 根据selector 获取新数据

        var newSelected = selector(newStore, lastSelectData.selected); // 新旧数据（就是context）对比，如果一致则直接返回

        if (lastSelectData.store === newStore) return; // 筛选数据对比
        else if (newSelected === lastSelectData.selected) return; // 数据生层次对比
        else if (equalComplex(lastSelectData.selected, newSelected)) return; // 更新
        else forceUpdate();
      } // 注册订阅


      listeners.add(listener);
      return function () {
        // 移除订阅
        listeners.delete(listener);
      };
    }, []); // 返回筛选后的数据

    return selected;
  }
  /**
   * 简化useSelector，只需传入索引key
   * @param keys 所需数据的keys
   */


  function usePicker(keys) {
    return useSelector(function (store) {
      var target = {};
      if (!origin) return target;
      return Object.assign.apply(Object, [target].concat(_toConsumableArray(keys.map(function (key) {
        return _defineProperty({}, key, store[key]);
      }))));
    });
  }

  return {
    Provider: Provider,
    useSelector: useSelector,
    usePicker: usePicker
  };
}

export { createStore };
