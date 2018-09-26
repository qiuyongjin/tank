// let base = require('../base').base;
cc.Class({
    extends: cc.Component,

    properties: {
        id: '',
        index: '',
        txtIndex: cc.Label,
        idIcon: cc.Sprite,
        cupIcon: cc.Sprite,
        headPortrait: cc.Sprite,
        nick: cc.Label,
        score: cc.Label,

        idIconItem: [cc.SpriteFrame],
        cupIconItem: [cc.SpriteFrame]

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },
    init (data) {
        this.id = data.id;
        if (data.index > 2) {
            this.txtIndex.string = data.index + 1;
            this.txtIndex.node.active = true;
            this.idIcon.node.active = false;
        } else {
            this.idIcon.spriteFrame = this.idIconItem[data.index];
        }
        this.cupIcon.spriteFrame = this.cupIconItem[(data.index > 2) ? 2 : data.index];
        // 头像
        /*this.getRemoteImg(data.headPortrait, (texture) => {
            this.headPortrait.spriteFrame = new cc.SpriteFrame(texture);
        });*/
        this.nick.string = data.nick;
        this.score.string = data.score;
        this.binEvent();
    },
    /**
     * 绑定TOUCH_END事件
     */
    binEvent () {
        this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            console.log(this.id);
        }, this);
    },
    start () {

    },
    /**
     * // 远程 url 带图片后缀名
     */
    getRemoteImg (remoteUrl, callBack) {
        cc.loader.load(remoteUrl, function (err, texture) {
            callBack(texture);
        });
    },
    // update (dt) {},
});
