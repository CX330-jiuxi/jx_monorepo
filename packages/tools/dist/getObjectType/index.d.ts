export declare type TGetObjectType = (t: any) => 'Array' | 'Object' | 'Function' | 'Undefined' | 'Null' | 'Number' | 'String' | 'Boolean' | 'Set' | 'Map' | 'Error';
/**
 * @description 精确获取object数据类型
 * @data 2020/9/9
 * @param {any} target 目标数据
 */
export declare const getObjectType: TGetObjectType;
