cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label, // 杯赛名称
        score: cc.Label, // 最高分
        ranking: cc.Label, // 排名
        prize: cc.Label, // 奖品
        status: cc.Label // 状态
    },

    // onLoad () {},

    start () {

    },
    init: function (data) {
        this.title.string = data.title;
        this.score.string = data.score;
        this.ranking.string = data.ranking;
        this.prize.string = data.prize;
        this.status.string = data.status;
    },

    // update (dt) {},
});
