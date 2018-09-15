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
     * 坦克全局属性
     */
    tank: {
        isMove: false,// 是否在移动
        movePath: 0, // 移动路径
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
        }
        return result;
    },
    /**
     * JS获取n至m随机整数
     */
    rd (n, m) {
        let c = m - n + 1;
        return Math.floor(Math.random() * c + n);
    }
};
