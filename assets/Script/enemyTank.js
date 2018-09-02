// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

let directions = cc.Enum({
    Top: 0,
    Right: 1,
    Bottom: 2,
    Left: 3
});

cc.Class({
    extends: cc.Component,

    properties: {
        /**
         * 行走的方向
         */
        direction: {
            default: directions.Right,
            type: directions
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },
    onCollisionEnter: function (other, self) {
        console.log('测试碰撞');
        this.direction = this.rd();
    },
    rd () {
        return Math.floor(Math.random() * 3 + 1);
    },
    update (dt) {
        switch (this.direction) {
            case 0:
                this.node.y += 1;
                break;
            case 1:
                this.node.x += 1;
                break;
            case 2:
                this.node.y -= 1;
                break;
            case 3:
                this.node.x -= 1;
                break;
        }

    },
});
