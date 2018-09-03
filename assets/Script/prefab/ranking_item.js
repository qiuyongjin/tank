cc.Class({
    extends: cc.Component,

    properties: {
        id: '',
        idIcon: cc.Sprite,
        cupIcon: cc.Sprite,
        headPortrait: cc.Sprite,
        nick: cc.Label,
        score: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },
    init (data) {
        this.id = data.id;
        this.idIcon.spriteFrame = data.idIcon;
        this.cupIcon.spriteFrame = data.cupIcon;
        this.headPortrait.spriteFrame = data.headPortrait;
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

    // update (dt) {},
});
