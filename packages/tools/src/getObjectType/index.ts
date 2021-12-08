export type TGetObjectType = (
  t: any,
) =>
  | 'Array'
  | 'Object'
  | 'Function'
  | 'Undefined'
  | 'Null'
  | 'Number'
  | 'String'
  | 'Boolean'
  | 'Set'
  | 'Map'
  | 'Error';
/**
 * @description 精确获取object数据类型
 * @data 2020/9/9
 * @param {any} target 目标数据
 */
export const getObjectType: TGetObjectType = (target) => {
  const type: string = Object.prototype.toString.call(target);

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
