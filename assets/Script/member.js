let base = require('base').base;

let Item = cc.Class({
    name: 'MemberItem',
    properties: {
        /**
         * 杯赛名称
         */
        title: '',
        /**
         * 最高分
         */
        score: '',
        /**
         * 排名
         */
        ranking: '',
        /**
         * 奖品
         */
        prize: '',
        /**
         * 状态
         */
        status: ''
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
        /**
         * 预制组件
         */
        itemPrefab: cc.Prefab,
        /**
         * 数据
         */
        items: {
            default: [],
            type: Item,
            visible: false
        },
        /**
         * 手机号码
         */
        phoneBox: {
            default: null,
            type: cc.Node
        },
        /**
         * 对话框
         */
        dialog: cc.Node,
        pic: {
            default: null,
            type: cc.Sprite
        }
    },

    // onLoad () {},
    start () {
        this.init();
        this.bindEvent();
        // this.setHeadPortrait();
    },
    init () {
        // 设置手机号码
        this.phoneBox.getChildByName('phone').getComponent(cc.Label).string = Global.member.phone;

        let max = 10;
        for (let i = 1; i <= max; i++) {
            let item = {};
            item.title = '广州季度总决赛' + i;
            item.score = Math.floor(1000 / i);
            item.ranking = i;
            item.prize = 'iPhone' + (max - i);
            item.status = '未发货';
            this.items.push(item);
        }

        // 获取scrollView/content节点
        let content = cc.find('item_list/view/content', this.node);
        for (let i = 0; i < this.items.length; ++i) {
            let item = cc.instantiate(this.itemPrefab);
            let data = this.items[i];
            content.addChild(item);
            item.getComponent('member_item').init({
                title: data.title,
                score: data.score,
                ranking: data.ranking,
                prize: data.prize,
                status: data.status
            });
        }
    },
    /**
     * 设置头像
     */
    setHeadPortrait () {
        setTimeout(() => {
            // 远程 url 带图片后缀名
            let _this = this;
            cc.loader.load("http://localhost:7456/res/import/c1/c10ebf5c-6d80-40ae-a771-383bd942ee28.png", function (err, texture) {
                _this.pic.spriteFrame = new cc.SpriteFrame(texture);
                console.log(texture);
            });
        }, 2000);
    },
    bindEvent () {
        this.phoneBox.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.dialog.active = true;
        }, this);
    }
    // update (dt) {},
});
