/**
 * isCollision：我方坦克是否发生碰撞
 * @type {{cupMatchId: number, member: {phone: string}, isCollision: boolean}}
 */
window.Global = {
    cupMatchId: 1,
    member: {
        phone: '15218288177'
    },
    /**
     * 得分，杀死坦克数量
     */
    score: 0,
    /**
     * 地图
     */
    gameMap: cc.Node,
    /**
     * 我方坦克全局属性
     */
    tank: {
        isMove: false,// 是否在移动
        speed: 200, // 移动速度
        movePath: 0, // 移动路径
        movablePath: [0, 1, 2, 3], // 坦克可移动都方向，默认全部可走
        // 是否发生碰撞
        isCollision: false,
    },
    /**
     * 墙壁
     */
    wall: {
        isCollision: false, // 是否发生碰撞
    },
    /**
     * 判断碰撞类型
     * @param type {string}
     * @returns {*}
     */
    collisionType (type) {
        let result = null;
        switch (type) {
            case 'gameMap':
                result = 0;
                break;
            case 'enemyTank':
                result = 1;
                break;
            case 'enemyBullet':
                result = 2;
                break;
        }
        return result;
    },
    /**
     * JS获取n至m随机整数
     */
    rd (n, m) {
        let c = m - n + 1;
        return Math.floor(Math.random() * c + n);
    },
    /**
     * 检查数组是否包含某个值
     */
    arrCheck (arr, val) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                return true;
            }
        }
        return false;
    }
};


Array.prototype.remove = function (val) {
    let index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};