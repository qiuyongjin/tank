// 移动方向
let MOVE_PATH = cc.Enum({
    top: 0,
    right: 1,
    down: 2,
    left: 3
});

let thisTank = null;
cc.Class({
    extends: cc.Component,

    properties: {
        /**
         * 坦克等级
         */
        level: 1,
        /**
         * 移动方向
         */
        movePath: {
            default: MOVE_PATH.down,
            type: MOVE_PATH
        },
        /**
         * 坦克贴图 上、下、左、右
         */
        tankTexture: [cc.SpriteFrame],
    },

    onLoad () {
        thisTank = this;
        this.animCtrl = this.node.getComponent(cc.Animation);
    },

    start () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
    },
    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter: function (other, self) {
        let otherTag = other.tag;
        let selfTag = self.tag;

        if (Global.arrCheck([0, 1, 2, 3, 8, 9], otherTag)) {
            // 40,41,42,43，禁止对应行走的方向
            Global.tank.movablePath.remove(selfTag - 40);
        }
        else if (otherTag == 10) {
            // 捡到宝箱
            other.node.destroy();
            this.upgradeTank();
        }

        // 播放动画
        // this.animCtrl.play("tank");
    },
    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionStay: function (other, self) {
        let otherTag = other.tag;
        let selfTag = self.tag;

        if (Global.arrCheck([0, 1, 2, 3, 8, 9], otherTag))
            Global.tank.movablePath.remove(selfTag - 40);
    },
    /**
     * 当碰撞结束后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionExit: function (other, self) {
        let otherTag = other.tag;
        let selfTag = self.tag;

        if (Global.arrCheck([0, 1, 2, 3, 8, 9], otherTag)) {
            // 40,41,42,43，启用对应行走的方向
            let p = selfTag - 40;
            if (!Global.arrCheck(Global.tank.movablePath, p)) {
                Global.tank.movablePath.push(p);
            }
        }
    },
    /**
     * 设置坦克行走方向
     * @param index
     */
    setMovePath (index) {
        thisTank.movePath = index;
        thisTank.updateSkin();
    },
    /**
     * 更新皮肤
     */
    updateSkin () {
        this.getComponent(cc.Sprite).spriteFrame = this.tankTexture[((this.level * 4) - 4) + thisTank.movePath];
    },
    /**
     * 升级坦克
     */
    upgradeTank () {
        if (++this.level > 3)
            this.level = 1;

        if (this.level == 2) {
            Global.tank.speed *= 2;
        }
        this.updateSkin();
    },
    /*update (dt) {

    },*/
});
