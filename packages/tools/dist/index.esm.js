function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
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

export { equalComplex, getObjectType };
