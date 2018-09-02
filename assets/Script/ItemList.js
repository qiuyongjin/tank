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
