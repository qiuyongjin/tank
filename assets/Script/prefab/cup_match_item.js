/**
 * 杯赛预制组件
 */
cc.Class({
    extends: cc.Component,

    properties: {
        itemName: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            Global.cupMatchId = this.itemName.string;
            this.cupMatchDetailPage.active = true;
        }, this);
    },
    init: function (data) {
        this.itemName.string = data.itemName;
        this.cupMatchDetailPage = data.cupMatchDetailPage;
    },
    // update (dt) {},
});
