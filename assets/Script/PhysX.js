// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        is_debug: true, /*是否显示调试信息*/
        /*重力加速度*/
        gravity: cc.p(0, 0), /*系统默认值为（0，-320）*/
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        /*游戏引擎的总控制
         cc.Director,cc.director的区别呢？
         大写的cc.Director是一个类，小写的cc.director是全局的实例*/
        cc.director.getPhysicsManager().enabled = true;
        /*开启了物理引擎*/
        /*独立的形状，打开一个调试区域，游戏图像的逻辑区域
         开始调试模式*/
        if (this.is_debug) {/*开启调试信息*/
            console.log("物理引擎DeBug已开启");
            var Bits = cc.PhysicsManager.DrawBits;
            /*这个是我们要显示的类型*/
            cc.director.getPhysicsManager().debugDrawFlags = Bits.e_jointBit | Bits.e_shapeBit | Bits.e_aabbBit | Bits.e_pairBit | Bits.e_centerOfMassBit;
        } else {/*关闭调试信息*/
            console.log("物理引擎DeBug已关闭");
            cc.director.getPhysicsManager().debugDrawFlags = 0;
        }
        /*重力加速度的配置*/
        cc.director.getPhysicsManager().gravity = this.gravity;
    },

    start () {

    }


    // update (dt) {},
});
