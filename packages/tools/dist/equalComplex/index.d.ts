import { TGetObjectType } from '../getObjectType';
/**
 * @description 判断两个数据类型是否值是否相等
 * @data 2020/9/9
 * @param {*} a 比对数据
 * @param {*} b 目标数据
 * @param {Array<ReturnType<TGetObjectType>>} excludes 忽略校验的类型，只有当新旧数据类型一样前提下，才生效
 * @return {boolean}
 */
export declare function equalComplex(a: any, b: any, excludes?: Array<ReturnType<TGetObjectType>>): boolean;
