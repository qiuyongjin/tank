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
        /*enemy: {
            default: null,
            type: cc.Node
        }*/
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },
    onCollisionEnter: function (other, self) {
        /* console.log('测试碰撞');
         if (this.enemy) {
             this.enemy.active = false;
             setTimeout(() => {
                 this.enemy.active = true;
             }, 2000)
         }*/
    },
    update (dt) {

    },
});
