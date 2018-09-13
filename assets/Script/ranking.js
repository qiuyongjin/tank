let Item = cc.Class({
    name: 'RankingItem',
    properties: {
        id: '',
        index: 0,
        headPortrait: '',
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
            type: Item,
            visible: false
        },
        friendRankingBtn: cc.Node,
        nationalRankingBtn: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        setTimeout(() => {
            // this.itemListBox.removeAllChildren();
        }, 2000)
    },

    start () {
        /**
         * 返回
         */
        this.comeBack.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.node.active = false;
            this.shopPage.active = true;
        });

        this.getItemData('好友排行');
        this.bindEvent();
    },
    /**
     * 获取数据
     */
    getItemData (name) {
        this.items = [];
        this.itemListBox.removeAllChildren();

        for (let i = 1; i <= 10; i++) {
            let item = {};
            item.id = i;
            item.index = i;
            item.headPortrait = "http://localhost:7456/res/import/91/91b1fd4a-adf5-43c0-afd2-115b80c93107.jpg";
            item.nick = name + i.toString();
            item.score = (Math.floor(1000 / i)).toString();
            this.items.push(item);
        }

        for (let i = 0; i < this.items.length; ++i) {
            let item = cc.instantiate(this.itemPrefab);
            let data = this.items[i];
            this.itemListBox.addChild(item);
            item.getComponent('ranking_item').init({
                id: data.id,
                index: i,
                headPortrait: data.headPortrait,
                nick: data.nick,
                score: data.score
            });
        }
        this.node.getChildByName('item_list').getComponent(cc.ScrollView).scrollToTop();
    },
    bindEvent () {
        let _this = this;
        // 好友排行
        this.friendRankingBtn.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.loader.loadRes("nav_friend_sel", cc.SpriteFrame, function (err, spriteFrame) {
                _this.friendRankingBtn.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            cc.loader.loadRes("nav_contry_unsel", cc.SpriteFrame, function (err, spriteFrame) {
                _this.nationalRankingBtn.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            _this.getItemData('好友排行');
        }, this);

        // 全国排行
        this.nationalRankingBtn.on(cc.Node.EventType.TOUCH_END, (event) => {

            cc.loader.loadRes("nav_friend_unsel", cc.SpriteFrame, function (err, spriteFrame) {
                _this.friendRankingBtn.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            cc.loader.loadRes("nav_contry_sel", cc.SpriteFrame, function (err, spriteFrame) {
                _this.nationalRankingBtn.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            _this.getItemData('全国排行');
        }, this);
    },
    // update (dt) {},
});
