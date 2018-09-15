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
        /**
         * 碰撞类型
         * 0：墙  1：敌方坦克
         */
        collisionType: null,
        tankNode: {
            default: null,
            type: cc.Sprite,
            visible: false
        }
    },

    onLoad () {
        thisTank = this;
        this.tankNode = this.getComponent(cc.Sprite);
    },

    start () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },
    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter: function (other, self) {
        // 设置坦克碰到什么障碍
        this.collisionType = Global.collisionType(other.node.name);

        if (Global.tank.isMove) {
            Global.tank.isCollision = true;

            /*if (Global.tank.movePath == MOVE_PATH.top) {
                this.moveXY = cc.v2(self.node.x, self.node.y + 10);
            } else if (Global.tank.movePath == MOVE_PATH.right) {
                this.moveXY = cc.v2(self.node.x + 10, self.node.y);
            } else if (Global.tank.movePath == MOVE_PATH.down) {
                this.moveXY = cc.v2(self.node.x, self.node.y - 10);
            } else if (Global.tank.movePath == MOVE_PATH.left) {
                this.moveXY = cc.v2(self.node.x - 10, self.node.y);
            }
            self.node.setPosition(this.moveXY);*/
        }
    },
    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionStay: function (other, self) {
        // console.log('当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用');
    },
    /**
     * 当碰撞结束后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionExit: function (other, self) {
        // console.log(other.node.name);
        if (other.node.name == 'enemyTank' && this.collisionType == 1)
            Global.tank.isCollision = false;

    },
    /**
     * 设置坦克行走方向
     * @param index
     */
    setMovePath (index) {
        thisTank.movePath = index;
        thisTank.tankNode.spriteFrame = this.tankTexture[thisTank.movePath];
    },
    // update (dt) {},
});
