/**
 * 移动方向
 * @type {{top: number, right: number, down: number, left: number}}
 */
let MOVE_PATH = cc.Enum({
    top: 0,
    right: 1,
    down: 2,
    left: 3
});

/**
 * 子弹类
 */
cc.Class({
    extends: cc.Component,

    properties: {
        /**
         * 子弹方向
         */
        movePath: {
            default: MOVE_PATH.top,
            type: MOVE_PATH
        },
        /**
         * 子弹速度
         */
        speed: 200
    },

    // onLoad () {},

    start () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },
    init (data) {
        console.log(data.tank.getPosition());
        this.movePath = data.movePath;
        // this.setPosition(this.tank.node.getPosition());
    },
    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter: function (other, self) {
        this.node.destroy();
        if (other.node.name == 'enemyTank') {
            other.node.destroy();
        }
    },
    update (dt) {
        if (this.movePath == MOVE_PATH.top) {
            this.node.y += this.speed * dt;
        } else if (this.movePath == MOVE_PATH.right) {
            this.node.x += this.speed * dt;
        } else if (this.movePath == MOVE_PATH.down) {
            this.node.y -= this.speed * dt;
        } else if (this.movePath == MOVE_PATH.left) {
            this.node.x -= this.speed * dt;
        }
    },
});
