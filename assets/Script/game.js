cc.Class({
    extends: cc.Component,

    properties: {
        loading: {
            default: null,
            type: cc.Node
        },
        shop: {
            default: null,
            type: cc.Node
        }
        // defaults, set visually when attaching this script to the Canvas
    },

    // use this for initialization
    onLoad: function () {
        // this.loading.active = true;
    },
    start () {
        /*this.label.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            console.log('Mouse down');
            this.shop.active = !this.shop.active;
        }, this);*/
    },
    // called every frame
    update: function (dt) {

    },
});
