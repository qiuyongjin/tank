// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        /*相应屏幕touch事件的消息有：START(开始点击下去),MOVED(触摸移动),ENDED(触摸在节点范围内弹起),CANCEL(节点范围外弹起)*/
        var movesBg = new Object();
        var ix = null, iy = null;
        var timeTank = null;
        var timeTankBol = true;
        var isTimeTankX = null, isTimeTankY = null;
        var my_tank_degree = null;
        var my_tank_degree_i = 0;
        var moves = new Object();
        clearInterval(timeTank);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            /*操控杆区域的部分*/
            var _this = this;
            var w_point = e.getLocation();
            /*获取触摸小白点的位置*/
            var ctl_lt_half = this.rocker.width * 0.5;
            /*获取操控杆区域的一半宽度，因为宽高相等，取其中一个即可*/
            /*小白点的边界*/
            /*小白点的事件*/
            var dst = this.node.parent.convertToNodeSpaceAR(w_point);
            /*小白点父节点的起始位置*/
            var xie = Math.sqrt(Math.pow(dst.x, 2) + Math.pow(dst.y, 2));
            /*var len = cc.pLength(dir);*/
            /*移动的膜*/
            var r = Math.atan2(dst.y, dst.x);
            /*求出这个距离对应的弧度*/
            var degree = r * 180 / Math.PI;
            /*求出旋转角度*/

            degree = 90 - parseInt(degree);
            if (degree >= -45 && degree < 45) {
                my_tank_degree = 0;
                my_tank_degree_i = 0;
            }
            if (degree >= 45 && degree < 135) {
                my_tank_degree = 90;
                my_tank_degree_i = 1;
            }
            if (degree >= 135 && degree < 225) {
                my_tank_degree = 180;
                my_tank_degree_i = 2;
            }
            if (degree >= 225 && degree <= 270) {
                my_tank_degree = 270;
                my_tank_degree_i = 3;
            }
            if (degree >= -90 && degree < -45) {
                my_tank_degree = 270;
                my_tank_degree_i = 3;
            }

            /*判断距离*/
            if (xie < ctl_lt_half) {
                moves.x = dst.x;
                moves.y = dst.y;
            } else {
                moves.x = ctl_lt_half * Math.cos(r);
                moves.y = ctl_lt_half * Math.sin(r);
            }
            if (isTimeTankX != null || isTimeTankY != null) {
                if (isTimeTankX != Math.cos(-r) || isTimeTankY != Math.sin(-r)) {
                    timeTankBol = true;
                }
            }

            if (timeTankBol) {
                timeTankBol = false;
                clearInterval(timeTank);
                timeTank = setInterval(function () {
                    isTimeTankX = Math.cos(-r);
                    isTimeTankY = Math.sin(-r);
                    if (degree >= -45 && degree < 45) {
                        ix += 0;
                        iy += 5;
                    }
                    if (degree >= 45 && degree < 135) {
                        ix += 5;
                        iy += 0;
                    }
                    if (degree >= 135 && degree < 225) {
                        ix += 0;
                        iy -= 5;
                    }
                    if (degree >= 225 && degree <= 270) {
                        ix -= 5;
                        iy += 0;
                    }
                    if (degree >= -90 && degree < -45) {
                        ix -= 5;
                        iy += 0;
                    }
                    movesBg.x = -ix;
                    movesBg.y = -iy;
                    _this.gameMap.setPosition(movesBg);
                }, 10);
            }

            this.node.setPosition(moves);

        }.bind(this), this);

        this.node.on(cc.Node.EventType.TOUCH_END, (e) => {
            this.node.setPosition(0, 0);
            clearInterval(timeTank);
            timeTankBol = true;
            this.isMove = false;
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, (e) => {
            this.node.setPosition(0, 0);
            clearInterval(timeTank);
            timeTankBol = true;
            this.isMove = false;
        }, this);
    },

    update (dt) {
        if (this.isMove) {
            // console.log(this.gameMap);
            // this.gameMap.setPosition(this.gameMap.x * dt, this.gameMap.y * dt);
        }
    },
});
