cc.Class({
    extends: cc.Component,

    properties: {
        id: '',
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
