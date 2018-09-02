// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

let Item = cc.Class({
    name: 'Item',
    properties: {
        itemName: '',
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: {
            default: null,
            type: cc.ScrollView,
        },
        items: {
            default: [],
            type: Item
        },
        itemPrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        for (var i = 0; i < 100; ++i) {
            var item = cc.instantiate(this.itemPrefab);
            // var data = this.items[i];
            this.node.addChild(item);
            item.getComponent('ItemTemplate').init({
                itemName: i,
            });
        }
        this.scrollView.scrollToLeft();
    },

    // update (dt) {},
});
