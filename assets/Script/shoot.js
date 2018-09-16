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
        }
    },

    // onLoad () {},

    start () {
        this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            let gameMapPosition = this.camera.getPosition();
            let position = cc.v2(-gameMapPosition.x, -gameMapPosition.y);
            let newBullet = cc.instantiate(this.bullet);

            newBullet.getComponent('bullet').init({
                movePath: Global.tank.movePath,
                position: position,
                speed: 500
            });
            this.camera.addChild(newBullet);
        }, this);
    },

    // update (dt) {},
});
