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
         * 是否移动
         */
        isMove: true,
        /**
         * 行走的方向
         */
        movePath: {
            default: MOVE_PATH.right,
            type: MOVE_PATH
        },
        /**
         * 记录上一个行走方向
         */
        oldMovePath: {
            default: MOVE_PATH.right,
            type: MOVE_PATH
        },
        /**
         * 移动速度
         */
        moveSpeed: {default: null},
        /**
         * 坦克贴图 上、下、左、右
         */
        tankTexture: [cc.SpriteFrame],
        /**
         * 子弹
         */
        bullet: {
            default: null,
            type: cc.Prefab
        },
    },

    // onLoad () {},
    init (data) {
        this.movePath = MOVE_PATH.down;
        this.moveSpeed = data.moveSpeed;
        this.node.setPosition(data.position);
    },
    start () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.tankNode = this.getComponent(cc.Sprite);
        this.updateTexture();
        setTimeout(() => {
            this.ctrlMove();
        }, 5000);

        this.launchBullet();
    },
    onCollisionEnter (other, self) {
        // console.log('坦克移动方向：' + Global.tank.movePath);

        if (other.node.name == 'gameMap') {
            if (this.movePath == MOVE_PATH.top) {
                this.node.y -= 10;
            } else if (this.movePath == MOVE_PATH.right) {
                this.node.x -= 10;
            } else if (this.movePath == MOVE_PATH.down) {
                this.node.y += 10;
            } else if (this.movePath == MOVE_PATH.left) {
                this.node.x += 10;
            }
        }
        // 更新坦克行走方向
        this.movePath = this.controlPath(this.movePath);
        this.updateTexture();
        // console.log(`以前：${MOVE_PATH[this.oldMovePath]},当前：${MOVE_PATH[this.movePath]}`);
    },
    /**
     * 更新坦克方向贴图
     */
    updateTexture () {
        if (this.tankNode)
            this.tankNode.spriteFrame = this.tankTexture[this.movePath];
    },
    /**
     * 生成随机数
     * @returns {number}
     */
    randomNumber (num) {
        return Math.floor(Math.random() * num);
    },
    /**
     * 控制行走路线,避免遇到障碍或坦克时出现继续走同一个方向
     */
    controlPath (path) {
        let arrPath = [];
        for (let i = 0; i < 4; i++) {
            if (i != path && i != this.oldMovePath) {
                arrPath.push(i);
            }
        }
        this.oldMovePath = this.movePath;
        // console.log(arrPath);
        return arrPath[this.randomNumber(arrPath.length)];
    },
    /**
     * 控制坦克停顿
     */
    ctrlMove () {
        let num = Global.rd(1000, 10000);
        setTimeout(() => {
            this.movePath = this.controlPath(this.movePath);
            this.updateTexture();
            this.ctrlMove();
        }, num);
    },
    /**
     * 发射子弹
     */
    launchBullet () {
        if (!this.bullet) return false;
        let newBullet = cc.instantiate(this.bullet);
        newBullet.getComponent('enemyBullet').init({
            movePath: this.movePath,
            tank: this.node,
            speed: this.moveSpeed
        });
        this.node.parent.addChild(newBullet);
        let num = Global.rd(1000, 3000);
        setTimeout(() => {
            this.launchBullet();
        }, num);
    },
    update (dt) {
        if (this.isMove) {
            if (this.movePath == MOVE_PATH.top) {
                this.node.y += this.moveSpeed * dt;
            } else if (this.movePath == MOVE_PATH.right) {
                this.node.x += this.moveSpeed * dt;
            } else if (this.movePath == MOVE_PATH.down) {
                this.node.y -= this.moveSpeed * dt;
            } else if (this.movePath == MOVE_PATH.left) {
                this.node.x -= this.moveSpeed * dt;
            }
        }
    },
});
