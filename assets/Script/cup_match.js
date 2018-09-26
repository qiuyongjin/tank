let base = require('base').base;

let Item = cc.Class({
    name: 'Item',
    properties: {
        itemName: '',
    }
});

/**
 * 杯赛组件
 */
cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: {
            default: null,
            type: cc.ScrollView,
        },
        /**
         * 预制组件
         */
        prefab: cc.Prefab,
        /**
         * 杯赛详情页面
         */
        cupMatchDetailPage: {
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
        }
    },

    // onLoad () {},

    start () {
        /**
         * 获取头像
         */
        /*base.getAvatar((texture) => {
            this.node.getChildByName('pic').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture)
        });*/

        for (let i = 0; i < 10; ++i) {
            let item = cc.instantiate(this.prefab);
            // let data = this.items[i];
            this.scrollView.node.children[0].children[0].addChild(item);
            let cupMatchItem = item.getComponent('cup_match_item');
            cupMatchItem.init({
                itemName: 'No.' + i.toString(),
                cupMatchDetailPage: this.cupMatchDetailPage
            });
        }
    },

    // update (dt) {},
});
