let DialogBox = require('dialog_box');
let RuleDialogBox = require('rule_dialog');

cc.Class({
    extends: cc.Component,

    properties: {
        itemListBox: {
            default: null,
            type: cc.Node
        },
        /**
         * 杯赛页面
         */
        cupMatchPage: {
            default: null,
            type: cc.Node
        },
        comeBack: cc.Node,
        enterGame: cc.Node,
        itemPrefab: cc.Prefab,
        dialogBox: {
            default: null,
            type: DialogBox
        },
        ruleDialogBox: {
            default: null,
            type: RuleDialogBox
        },
        ruleBtn: cc.Node,
        gameMap: cc.Node
    },

    // onLoad () {},

    start () {
        let items = [];
        for (let i = 1; i <= 10; i++) {
            let item = {};
            item.id = i.toString();
            item.index = i.toString();
            items.push(item);
        }
        for (let i = 0; i < items.length; ++i) {
            let item = cc.instantiate(this.itemPrefab);
            let data = items[i];
            this.itemListBox.addChild(item);
            item.getComponent('national_ranking').init({
                id: data.id,
                index: i,
                nick: 'nick' + i,
                score: Math.floor(1000 / (i + 1))
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
         * 说明
         */
        this.ruleBtn.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.ruleDialogBox.show();
        }, this);
        /**
         * 参赛
         */
        this.enterGame.on(cc.Node.EventType.TOUCH_END, (event) => {
            console.log(Global.cupMatchId);
            // this.dialogBox.funDialogBox(true);
            // 隐藏杯赛页面
            this.cupMatchPage.active = false;
            this.node.active = false;
            this.gameMap.active = true;
        }, this);
    },
    // update (dt) {},
});
