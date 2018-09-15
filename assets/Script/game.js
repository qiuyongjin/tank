// 移动方向
let MOVE_PATH = cc.Enum({
    top: 0,
    right: 1,
    down: 2,
    left: 3
});

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
        },
        enemyTank: {
            default: null,
            type: cc.Prefab
        },
        movePath: {
            default: MOVE_PATH.left,
            type: MOVE_PATH
        }
    },
    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter (other, self) {
        // 判断坦克是否碰到边缘
        if (other.node._name == 'tank') {
            Global.tank.isCollision = true;

            if (Global.tank.movePath == MOVE_PATH.top) {
                this.moveXY = cc.v2(self.node.x, self.node.y + 10);
            } else if (Global.tank.movePath == MOVE_PATH.right) {
                this.moveXY = cc.v2(self.node.x + 10, self.node.y);
            } else if (Global.tank.movePath == MOVE_PATH.down) {
                this.moveXY = cc.v2(self.node.x, self.node.y - 10);
            } else if (Global.tank.movePath == MOVE_PATH.left) {
                this.moveXY = cc.v2(self.node.x - 10, self.node.y);
            }
            self.node.setPosition(this.moveXY);
        }
    },
    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionStay: function (other, self) {
        // console.log('当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用');
        // console.log(other.node);
    },
    onLoad: function () {
        // this.loading.active = true;
    },
    start () {
        /*this.label.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            console.log('Mouse down');
            this.shop.active = !this.shop.active;
        }, this);*/

        let num = 0;
        let si = setInterval(() => {
            this.newEnemyTank();
            ++num;
            if (num >= 10)
                clearInterval(si);
        }, 300);
    },
    /**
     * 生产敌方坦克
     */
    newEnemyTank () {
        let eTank = cc.instantiate(this.enemyTank);
        eTank.getComponent('enemyTank').init({
            movePath: Math.floor(Math.random() * 4),
            moveSpeed: 50 + Math.floor(Math.random() * 200)
        });
        this.node.addChild(eTank);
    },
    update: function (dt) {

    },
});
