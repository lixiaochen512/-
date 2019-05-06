(function(){
    window.Game = function(){
        this.rowAmount = 20;
        this.colAmount = 12;
        this.init()

        this.block = new Block(); //实例化砖块类
        this.map = new Map();     //实例化地图类

        this.start(); //开启定时器
        this.bindEvent()
    }

    // 初始化表格结构
    Game.prototype.init = function(){
        this.dom = document.createElement('table');
        document.getElementById('app').appendChild(this.dom);

        var tr,td;
        // 循环批量生成tr、td
        for(var i = 0;i < this.rowAmount;i++){
            tr = document.createElement('tr');
            this.dom.appendChild(tr);
            for(var j = 0;j < this.colAmount;j++){
                td = document.createElement('td');
                tr.appendChild(td);
            }
        }
    }

    // 提供一个渲染砖块颜色的方法
    Game.prototype.setClass = function(row, col, classname){
        this.dom.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].className = classname;
    }

    // 清屏方法
    Game.prototype.clearClass = function(){
        for(var i = 0;i < this.rowAmount;i++){
            for(var j = 0; j < this.colAmount;j++){
                this.setClass(i, j,'')
            }
        }
    }


    Game.prototype.start = function(){
        this.f = 0;
        this.score = 0;
        var self = this;
        this.timer = setInterval(function(){
            self.f++;
            document.getElementById('info').innerHTML = '帧编号：' + self.f
            document.getElementById('score').innerHTML = '总分数：' + self.score
            // 清屏
            self.clearClass();
            // 渲染方块
            self.block.render();
            // 渲染地图
            self.map.render();
            // 每间隔20帧执行砖块下落
            self.f % 20 === 0 && self.block.down();
        }, 30)
    }

    // 键盘事件监听
    Game.prototype.bindEvent = function(){
        var self = this;
        document.onkeyup = function(e){
            if(e.keyCode == 37){
                self.block.left();
            }else if(e.keyCode == 38){
                self.block.rotate()
            }else if(e.keyCode == 39){
                self.block.right()
            }else if(e.keyCode == 40){
                self.block.goDown()
            }
        }
    }
})()