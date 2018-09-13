let base = require('base').base;
cc.Class({
    extends: cc.Component,

    properties: {
        mobile: cc.Label,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.btnConfirm = cc.find('pop_phone/btn_confirm', this.node);
        this.closeBtn = cc.find('pop_phone/icon_close', this.node);
        this.tips = cc.find('pop_phone/tips', this.node);

        this.bindEvent();
    },
    bindEvent () {
        /**
         * 关闭
         */
        this.closeBtn.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.node.active = false;
            this.tips.active = false;
        }, this);
        /**
         * 确定
         */
        this.btnConfirm.on(cc.Node.EventType.TOUCH_END, (event) => {
            let phone = this.mobile.string;
            if (base.isPhone(phone)) {
                cc.find('/mobile/phone', this.node.parent).getComponent(cc.Label).string = phone;
                this.node.active = false;
                this.tips.active = false;
            } else {
                this.tips.active = true;
            }
        }, this);
    },
    // update (dt) {},
});
