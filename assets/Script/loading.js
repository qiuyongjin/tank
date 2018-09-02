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
         * loading
         */
        loading: {
            default: null,
            type: cc.Node
        },
        /**
         * 实际进度条
         */
        progressBar: {
            default: null,
            type: cc.ProgressBar
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.progressBar.progress = 0;
        let seti = setInterval(() => {
            this.progressBar.progress += 0.001;
            if (Math.floor(this.progressBar.progress)) {
                clearInterval(seti);
                this.loading.active = false;
            }
        }, 0);
    },

    // update (dt) {},
});
