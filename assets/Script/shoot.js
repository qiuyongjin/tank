cc.Class({
    extends: cc.Component,

    properties: {
        camera: {
            default: null,
            type: cc.Node
        },
        bullet: {
            default: null,
            type: cc.Prefab
        },
        tank: {
            default: null,
            type: cc.Node
        }
    },

    // onLoad () {},

    start () {
        this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            let newBullet = cc.instantiate(this.bullet);
            newBullet.getComponent('bullet').init({
                movePath: Global.tank.movePath,
                tank: this.tank
            });
            this.camera.addChild(newBullet);
        }, this);
    },

    // update (dt) {},
});
