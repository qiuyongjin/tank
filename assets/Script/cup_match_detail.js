cc.Class({
    extends: cc.Component,

    properties: {
        itemListBox: {
            default: null,
            type: cc.Node
        },
        /*cupCouponItem: {
            default: [],
            type: Item
        },*/
        comeBack: cc.Node,
        enterGame: cc.Node,
        itemPrefab: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        for (let i = 0; i < 3; ++i) {
            let item = cc.instantiate(this.itemPrefab);
            // let data = this.cupCouponItem[i];
            this.itemListBox.addChild(item);
            item.getComponent('national_ranking').init({
                id: i.toString(),
            });
        }

        this.bindEvent();
    },
    /**
     * 绑定事件
     */
    bindEvent () {
        /**
         * 返回
         */
        this.comeBack.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.node.active = false;
        }, this);
        /**
         * 参赛
         */
        this.enterGame.on(cc.Node.EventType.TOUCH_END, (event) => {
            console.log(Global.cupMatchId);
        }, this);
    },
    // update (dt) {},
});
