// tslint:disable
/**
 * 营销通
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface LoginUser
 */
export interface LoginUser {
    /**
     * 
     * @type {number}
     * @memberof LoginUser
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof LoginUser
     */
    user_name: string;
    /**
     * 
     * @type {string}
     * @memberof LoginUser
     */
    nick_name: string;
    /**
     * 
     * @type {string}
     * @memberof LoginUser
     */
    sex: string;
    /**
     * 
     * @type {string}
     * @memberof LoginUser
     */
    avatar: string;
    /**
     * 
     * @type {string}
     * @memberof LoginUser
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof LoginUser
     */
    phone: string;
    /**
     * 
     * @type {string}
     * @memberof LoginUser
     */
    dept: string;
    /**
     * 
     * @type {string}
     * @memberof LoginUser
     */
    job: string;
    /**
     * 
     * @type {boolean}
     * @memberof LoginUser
     */
    enabled: boolean;
    /**
     * 
     * @type {number}
     * @memberof LoginUser
     */
    create_time: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof LoginUser
     */
    roles: Array<string>;
}


