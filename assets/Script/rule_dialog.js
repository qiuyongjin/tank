cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.iconClose = cc.find("rule/icon_close", this.node);

        this.bindEvent();
    },
    bindEvent () {
        this.iconClose.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.node.active = false;
        }, this);
    },
    show () {
        this.node.active = true;
    },
    // update (dt) {},
});
