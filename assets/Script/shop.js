let Item = cc.Class({
    name: 'CupCouponItem',
    properties: {
        id: {
            default: '',
            type: cc.String
        },
        isHot: true,// 是否热销
        title: '', // 券标题
        couponIcon: cc.SpriteFrame, // 券图标
        price: "" // 价格
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
        itemListBox: {
            default: null,
            type: cc.Node
        },
        cupCouponItem: {
            default: [],
            type: Item
        },
        itemPrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log('shop onLoad...')
    },

    start () {
        for (let i = 0; i < this.cupCouponItem.length; ++i) {
            let item = cc.instantiate(this.itemPrefab);
            let data = this.cupCouponItem[i];
            this.itemListBox.addChild(item);
            item.getComponent('shop_cup_coupon_item').init({
                id: data.id,
                isHot: data.isHot,
                title: data.title + '参赛券',
                couponIcon: data.couponIcon,
                price: data.price + '元',
            });
        }
    },

    // update (dt) {},
});
