// 移动方向
let MOVE_PATH = cc.Enum({
    top: 0,
    right: 1,
    down: 2,
    left: 3
});

let map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 2, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

/*map = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];*/

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
        },
        /**
         * 铁墙块
         */
        ironWall: {
            default: null,
            type: cc.Prefab
        },
        /**
         * 砖墙
         */
        brickWall: {
            default: null,
            type: cc.Prefab
        },
        /**
         * 宝箱
         */
        treasureBox: {
            default: null,
            type: cc.Prefab
        }
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
            if (++num >= 4 )
                clearInterval(si);
        }, 300);

        Global.gameMap = this.node;

        this.initMap();
    },
    /**
     * 初始化地图
     */
    initMap () {
        let position = [
            cc.v2(-465, 470),
            cc.v2(-155, 470),
            cc.v2(155, 470),
            cc.v2(465, 470)
        ];
        map.map((val, y) => {
            val.map((item, x) => {
                if (item != 0) {
                    this.newWall(item, x, y);
                }
            });
        });
    },
    /**
     * 生成砖块
     * @param type {int} 1：铁墙   2：砖墙
     * @param x
     * @param y
     */
    newWall (type, x, y) {
        let wall = null;
        switch (type) {
            case 1:
                wall = cc.instantiate(this.ironWall);
                break;
            case 2:
                wall = cc.instantiate(this.brickWall);
                break;
            case 3:
                wall = cc.instantiate(this.treasureBox);
                break;
        }
        wall.setPosition(cc.v2(-560 + (x * 80), 560 - (y * 80)));
        this.node.addChild(wall);
    },
    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter (other, self) {
        // 判断坦克是否碰到边缘
        if (other.node._name == 'tank') {
            // 偏移
            let offset = 6;
            Global.tank.isCollision = true;
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
    /**
     * 生产敌方坦克
     */
    newEnemyTank () {
        let position = [
            cc.v2(-465, 470),
            cc.v2(-155, 470),
            cc.v2(155, 470),
            cc.v2(465, 470)
        ];
        let eTank = cc.instantiate(this.enemyTank);
        eTank.getComponent('enemyTank').init({
            moveSpeed: Global.rd(100, 200),
            position: position[Global.rd(0, position.length - 1)]
        });
        this.node.addChild(eTank);
    },
    /*update: function (dt) {

    },*/
});
