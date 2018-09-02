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
        id: {
            default: '',
            type: cc.String
        },
        hot: cc.Node, // 热销节点
        title: cc.Label, // 券标题
        couponIcon: cc.Sprite, // 券图标
        price: cc.Label // 价格
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init: function (data) {
        this.id = data.id;
        this.title.string = data.title;
        this.couponIcon.spriteFrame = data.couponIcon;
        this.price.string = data.price;
        if (!data.isHot) {
            this.hot.active = false;
        }
        this.binEvent();
    },

    binEvent () {
        this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            console.log(this.id);
        }, this);
    },
    start () {

    },

    // update (dt) {},
});
