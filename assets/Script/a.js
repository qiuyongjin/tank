cc.Class({
    extends: cc.Component,

    properties: {
        z: [cc.Node],

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.z.map((item, index) => {
            let type = 'fun_' + index;
            item.on(cc.Node.EventType.TOUCH_END, this[type], this);
        });
    },

    start () {
        // 打开调试
        try {
            wx.setEnableDebug({
                enableDebug: true
            })
        } catch (err) {

        }
    },
    fun_0 (event) {
        console.log(event.target.getComponent(cc.Label).string);
        wx.showShareMenu();
    },
    fun_1 (event) {
        console.log(event.target.getComponent(cc.Label).string);

    },
    /**
     * 授权
     * @param event
     */
    fun_2 (event) {
        console.log(event.target.getComponent(cc.Label).string);
        wx.getSetting({
            success: res => {
                console.log(res);
            },
            fail: res => {
                console.log(res);
            }
        });
    },
    /**
     * 登录
     * @param event
     */
    fun_3 (event) {
        console.log(event.target.getComponent(cc.Label).string);
        wx.login({
            success: (res) => {
                console.log(res);
            }
        });
    },
    /**
     * 获取用户信息
     * @param event
     */
    fun_4 (event) {
        console.log(event.target.getComponent(cc.Label).string);
        wx.getUserInfo({
            success: (res) => {
                console.log(res);
            },
            fail: (res) => {
                console.log(res);
            }
        });
    }
    // update (dt) {},
});
