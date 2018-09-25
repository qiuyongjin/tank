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
         * 坦克等级
         */
        level: 1,
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
         * 可行走的方向
         */
        movablePath: [cc.Integer],
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
        enemyTank: {
            default: null,
            type: cc.Prefab
        }
    },

    onLoad () {
        this.animCtrl = this.node.getComponent(cc.Animation);
    },
    init (data) {
        this.level = Global.rd(1, 2);
        this.movePath = MOVE_PATH.down;
        this.moveSpeed = data.moveSpeed;
        this.node.setPosition(data.position);
    },
    start () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.tankNode = this.getComponent(cc.Sprite);
        this.updateSkin();

        setTimeout(() => {
            this.ctrlMove();
        }, 5000);

        this.indirectLaunch();
    },
    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter (other, self) {
        let otherTag = other.tag;
        let selfTag = self.tag;

        if ([0, 1, 2, 3, 8, 9, 40, 41, 42, 43].includes(otherTag)) {
            // 50,51,52,53，禁止对应行走的方向
            this.movablePath.remove(selfTag - 50);
            // 更新坦克行走方向
            this.movePath = this.controlPath();
            this.updateSkin();
        }
        else if (otherTag == 6 && this.isMove) {
            this.isMove = false;
            // 得分
            Global.score += 1;
            // 播放动画
            this.animCtrl.play("enemyTank");
        }
    },
    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionStay: function (other, self) {
        let otherTag = other.tag;
        let selfTag = self.tag;

        if ([0, 1, 2, 3, 8, 9].includes(otherTag))
            this.movablePath.remove(selfTag - 50);
    },
    /**
     * 当碰撞结束后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionExit: function (other, self) {
        let otherTag = other.tag;
        let selfTag = self.tag;
        if ([0, 1, 2, 3, 8, 9, 40, 41, 42, 43].includes(otherTag)) {
            // 50,51,52,53，启用对应行走的方向
            let p = selfTag - 50;
            if (!this.movablePath.includes(p)) {
                this.movablePath.push(p);
            }
        }
    },
    /**
     * 更新坦克方向贴图
     */
    updateSkin () {
        if (this.tankNode)
        // this.tankNode.spriteFrame = this.tankTexture[this.movePath];
            this.tankNode.spriteFrame = this.tankTexture[((this.level * 4) - 4) + this.movePath];
    },
    /**
     * 控制行走路线,避免遇到障碍或坦克时出现继续走同一个方向
     */
    controlPath () {
        // 在可行方向中随机取一个方向
        return this.movablePath[Global.rd(0, this.movablePath.length - 1)];
    },
    /**
     * 控制坦克方向
     */
    ctrlMove () {
        if (this.isMove) {
            let num = Global.rd(1000, 10000);
            setTimeout(() => {
                if (this.node) {
                    this.movePath = this.controlPath();
                    this.updateSkin();
                    this.ctrlMove();
                }
            }, num);
        }
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
    },
    /**
     * 间接发射子弹
     */
    indirectLaunch () {
        this.launchBullet();
        let num = Global.rd(1000, 3000);
        setTimeout(() => {
            this.indirectLaunch();
        }, num);
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
        Global.gameMap.addChild(eTank);
    },
    /**
     * 动画播放完成
     */
    onAnimCompleted () {
        this.newEnemyTank();
        this.node.destroy();
    },
    update (dt) {
        if (this.isMove && this.movablePath.includes(this.movePath)) {
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
