let Item = cc.Class({
    name: 'RankingItem',
    properties: {
        id: '',
        idIcon: cc.SpriteFrame,
        cupIcon: cc.SpriteFrame,
        headPortrait: cc.SpriteFrame,
        nick: '',
        score: ''
    }
});
cc.Class({
    extends: cc.Component,

    properties: {
        /**
         * listBox
         */
        itemListBox: {
            default: null,
            type: cc.Node
        },
        /**
         * 预制组件
         */
        itemPrefab: cc.Prefab,
        /**
         * 返回按钮
         */
        comeBack: {
            default: null,
            type: cc.Node
        },
        /**
         * 商店页面
         */
        shopPage: {
            default: null,
            type: cc.Node
        },
        /**
         * 数据
         */
        items: {
            default: [],
            type: Item
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        /**
         * 返回
         */
        this.comeBack.on(cc.Node.EventType.TOUCH_END, (event) => {
            // TODO
            this.node.active = false;
            this.shopPage.active = true;
        });

        for (let i = 0; i < this.items.length; ++i) {
            let item = cc.instantiate(this.itemPrefab);
            let data = this.items[i];
            this.itemListBox.addChild(item);
            item.getComponent('ranking_item').init({
                id: data.id,
                idIcon: data.idIcon,
                cupIcon: data.cupIcon,
                headPortrait: data.headPortrait,
                nick: data.nick,
                score: data.score
            });
        }
    },

    // update (dt) {},
});
