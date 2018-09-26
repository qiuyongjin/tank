/**
 * Created by PhpStorm.
 * User: QiuYongJin
 * Date: 2018/9/13
 * Time: 00:03
 */

let base = {
    /**
     * 检查手机号码是否正确
     * @param val {string} 手机号码
     * @returns {boolean} 正确：true   错误：false
     */
    isPhone (val) {
        if (val.length == 11) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 获取头像
     */
    getAvatar (callBack) {
        cc.loader.load("http://192.168.43.166:7456/res/import/f6/f65c0e73-fe33-487b-932f-ea4fe7927b3a.png", function (err, texture) {
            callBack(texture);
        });
    },
    test () {
        return 'hello test';
    }
};

module.exports = {base};