let base = require('../base').base;
/**
 * 全国排名预制组件
 */
cc.Class({
    extends: cc.Component,

    properties: {
        indexIcon: cc.Sprite,
        indexTxt: cc.Label,
        cupIcon: cc.Sprite,
        avatar: cc.Sprite,
        nick: cc.Label,
        score: cc.Label,
        indexIconItem: [cc.SpriteFrame],
        cupIconItem: [cc.SpriteFrame]
    },
    // onLoad () {},

    start () {

    },
    init (data) {
        this.id = data.id;
        if (data.index > 2) {
            this.indexTxt.string = data.index + 1;
            this.indexTxt.node.active = true;
            this.indexIcon.node.active = false;
        } else {
            this.indexIcon.spriteFrame = this.indexIconItem[data.index];
        }
        /*base.getAvatar((texture) => {
            this.avatar.spriteFrame = new cc.SpriteFrame(texture);
        });*/
        this.cupIcon.spriteFrame = this.cupIconItem[(data.index > 2) ? 2 : data.index];
        this.nick.string = data.nick;
        this.score.string = data.score.toString();
    }

    // update (dt) {},
});
