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
        /**
         * 是否在移动
         */
        isMove: {
            default: false,
            visible: false
        },
        /**
         * 移动方向
         */
        movePath: {
            default: null,
            type: MOVE_PATH
        },
        /**
         * 游戏地图
         */
        gameMap: {
            default: null,
            type: cc.Node
        },
        /**
         * 摇杆
         */
        rocker: {
            default: null,
            type: cc.Node
        },
        /**
         * 移动速度
         */
        moveSpeed: 200,
        /**
         * 移动坐标
         */
        moveXY: cc.v2()
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        /*相应屏幕touch事件的消息有：START(开始点击下去),MOVED(触摸移动),ENDED(触摸在节点范围内弹起),CANCEL(节点范围外弹起)*/
        let moves = cc.v2();
        let _this = this;
        /**
         * 触摸移动
         */
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            this.isMove = true;

            /*操控杆区域的部分*/
            let w_point = e.getLocation();
            /*获取触摸小白点的位置*/
            let ctl_lt_half = this.rocker.width * 0.5;
            /*获取操控杆区域的一半宽度，因为宽高相等，取其中一个即可*/
            /*小白点的边界*/
            /*小白点的事件*/
            let dst = this.node.parent.convertToNodeSpaceAR(w_point);
            /*小白点父节点的起始位置*/
            let xie = Math.sqrt(Math.pow(dst.x, 2) + Math.pow(dst.y, 2));
            /*移动的膜*/
            let r = Math.atan2(dst.y, dst.x);
            /*求出这个距离对应的弧度*/
            let degree = r * 180 / Math.PI;

            /*求出旋转角度*/
            degree = 90 - parseInt(degree);
            if (degree >= -45 && degree < 45) {
                _this.movePath = MOVE_PATH.top;
            }
            if (degree >= 45 && degree < 135) {
                _this.movePath = MOVE_PATH.right;
            }
            if (degree >= 135 && degree < 225) {
                _this.movePath = MOVE_PATH.down;
            }
            if (degree >= 225 && degree <= 270) {
                _this.movePath = MOVE_PATH.left;
            }
            if (degree >= -90 && degree < -45) {
                _this.movePath = MOVE_PATH.left;
            }

            /*判断距离*/
            if (xie < ctl_lt_half) {
                moves.x = dst.x;
                moves.y = dst.y;
            } else {
                moves.x = ctl_lt_half * Math.cos(r);
                moves.y = ctl_lt_half * Math.sin(r);
            }

            this.node.setPosition(moves);
        }.bind(this), this);

        /**
         * 触摸结束
         */
        this.node.on(cc.Node.EventType.TOUCH_END, (e) => {
            this.node.setPosition(0, 0);
            this.isMove = false;
        }, this);

        /**
         * 触摸取消
         */
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, (e) => {
            this.node.setPosition(0, 0);
            this.isMove = false;
        }, this);
    },

    update (dt) {
        if (this.isMove) {
            if (this.movePath == MOVE_PATH.top) {
                this.moveXY = cc.v2(this.gameMap.x, this.gameMap.y - (this.moveSpeed * dt));
            } else if (this.movePath == MOVE_PATH.right) {
                this.moveXY = cc.v2(this.gameMap.x - (this.moveSpeed * dt), this.gameMap.y);
            } else if (this.movePath == MOVE_PATH.down) {
                this.moveXY = cc.v2(this.gameMap.x, this.gameMap.y + (this.moveSpeed * dt));
            } else if (this.movePath == MOVE_PATH.left) {
                this.moveXY = cc.v2(this.gameMap.x + (this.moveSpeed * dt), this.gameMap.y);
            }
            this.gameMap.setPosition(this.moveXY);
        }
    },
});
