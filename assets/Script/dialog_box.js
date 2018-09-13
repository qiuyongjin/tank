cc.Class({
    extends: cc.Component,

    properties: {
        /**
         * 关闭按钮
         */
        closeBtn: cc.Node,
        tips: {
            default: null,
            type: cc.Label
        }
    },
    // onLoad () {},

    start () {
        this.dialog = this.node.getChildByName('dialog');

        this.bindEvent();
    },
    bindEvent () {
        let btnConfirm = this.dialog.getChildByName('btn_confirm');
        let btnGet = this.dialog.getChildByName('btn_get');

        /**
         * 确定按钮
         */
        btnConfirm.on(cc.Node.EventType.TOUCH_END, (event) => {
            console.log('a');
            this.tips.string = '测试';
            console.log(this.tips);
        }, this);

        /**
         * 获取参赛券
         */
        btnGet.on(cc.Node.EventType.TOUCH_END, (event) => {
            console.log('b');
            this.tips.string = '获取参赛券';
        }, this);
        /**
         * 关闭窗口
         */
        this.closeBtn.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.funDialogBox(false);
        }, this);
    },
    /**
     * 显示对话框
     * @param type {Boolean}
     */
    funDialogBox (type) {
        this.node.active = type;
    }
    // update (dt) {},
});
