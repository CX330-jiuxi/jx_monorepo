import { getObjectType, TGetObjectType } from '../getObjectType';

/**
 * @description 判断两个数据类型是否值是否相等
 * @data 2020/9/9
 * @param {*} a 比对数据
 * @param {*} b 目标数据
 * @param {Array<ReturnType<TGetObjectType>>} excludes 忽略校验的类型，只有当新旧数据类型一样前提下，才生效
 * @return {boolean}
 */
export function equalComplex(
  a: any,
  b: any,
  excludes?: Array<ReturnType<TGetObjectType>>,
): boolean {
  // 判断类型
  const tA = getObjectType(a);
  const tB = getObjectType(b);

  if (tA !== tB) return false;
  else if (tA === 'Undefined' || tA === 'Null') return true;
  else if (excludes?.includes(tA)) return true;
  else if (tA === 'String' || tA === 'Number' || tA === 'Boolean' || tA === 'Function')
    return a === b;
  else if (tA === 'Array') {
    if (a?.length !== b?.length) return false;
    else {
      // 循环遍历数组的值进行比较
      for (let i = 0; i < a.length; i++) {
        if (!equalComplex(a[i], b[i], excludes)) return false;
      }
      return true;
    }
  } else if (tA === 'Object') {
    if (Object.keys(a).length !== Object.keys(b).length) return false;
    for (let i in a) {
      if (!equalComplex(a[i], b[i], excludes)) return false;
    }
    return true;
  } else if (tA === 'Set') {
    return equalComplex(Array.from(a), Array.from(b), excludes);
  } else if (tA === 'Map') {
    const aMapArr = [...a];
    const bMapArr = [...b];
    if (aMapArr.length !== bMapArr.length) return false;
    for (let i = 0; i < aMapArr.length; i++) {
      if (
        !equalComplex(aMapArr[i][0], bMapArr[i][0], excludes) ||
        !equalComplex(aMapArr[i][1], bMapArr[i][1], excludes)
      )
        return false;
    }
    return true;
  } else return false;
}
