(function(){
    window.Block = function(){
        var arr = ['I','L', 'J','T', 'O','S','A','B', 'Z'];  //所有的砖块形状
        // 在所有的形状中，选择一个砖块形状
        this.allType = arr[~~(Math.random() * arr.length)]
        // 当前砖块形状的方向个数
        this.allDirectionNumber = block_json[this.allType].length;
        // 根据当前形状的长度，随机一个方向
        this.direction = ~~(Math.random() *  this.allDirectionNumber)
        // 得到当前砖块的形状
        this.code = block_json[this.allType][this.direction]

        // 4 * 4砖块的初始位置
        this.row = 0;
        this.col = 4;  //保证砖块居中下落
    }

    // 渲染砖块方法
    Block.prototype.render = function(){
        for(var i = 0; i < 4;i++){
            for(var j = 0;j < 4;j++){
                // game.setClass(this.row + i, this.col + j, "gray");
                if(this.code[i][j] === 1){
                    game.setClass(this.row + i, this.col + j, this.allType);
                }
            }
        }
    }

    // 砖块下落
    Block.prototype.down = function(){
        // 每次下落时，都要判断是否已经填满地图了
        this.gameover()

        // 如果条件为真，表示可以下落移动
        if(this.check(this.row + 1, this.col)){
            this.row++
        }else{
            // 如果为假，表示碰到非0的砖块了，将当前形状的砖块添加到map地图类中
            this.addDie();
            // 每碰到一次，检测是否可以消行
            this.remove();
            // 同时new一个新的砖块出来
            game.block = new Block();
        }
    }

    // 封装碰撞检测方法（返回true/false），下落、左右移动都要判断是否有碰撞到物体
    Block.prototype.check = function(row, col){
        // 看看是否能移动，取决于两个条件
        // 1. 地图类的下一行不能是非0
        // 2. 方块的下一行不能是“1”
        for(var i = 0;i < 4; i++){
            for(var j = 0;j < 4;j++){
                if(this.code[i][j] != 0 && game.map.mapCode[row + i][col + j] != 0){
                    return false;  //不能移动，返回false
                }
            }
        }
        return true; //能移动，返回true
    }

    // 向左
    Block.prototype.left = function(){
        if(this.check(this.row, this.col-1)){
            this.col--
        }
        document.getElementById('move').play();
    }


    // 向右
    Block.prototype.right = function(){
        if(this.check(this.row, this.col+1)){
            this.col++
        }
        document.getElementById('move').play();
    }

    // 一键到底
    Block.prototype.goDown = function(){
        while(this.check(this.row + 1, this.col)){
            this.row++
        }
        document.getElementById('goDown').play();
    }

    // 添加死亡方块
    Block.prototype.addDie = function(){
        for(var i = 0; i < 4;i++){
            for(var j = 0;j < 4;j++){
                if(this.code[i][j] != 0){
                    game.map.mapCode[this.row + i][this.col + j] = this.allType;
                }
            }
        }
    }

    // 旋转切换砖块方向
    Block.prototype.rotate = function(){
        document.getElementById('rotate').play();
        // 备份旧方向
        var oldDirection = this.direction;

        // 如果旋转的值已经等于自己方向的个数就回到0，重新翻转
        if(this.direction === this.allDirectionNumber-1){
            this.direction = 0;
        }else{
            this.direction++
        }

        // 根据最新this.direction得到当前砖块的形状
        this.code = block_json[this.allType][this.direction]

        // 旋转碰撞检测，条件成立表示已经碰到了
        if(!this.check(this.row, this.col)){
            // 已经碰到了，不可以旋转，恢复原来的形状
            this.direction = oldDirection;
            this.code = block_json[this.allType][this.direction]
            return;
        }
    }


    // 消行判断
    Block.prototype.remove = function(){
        // 判断map地图类中的mapCode数组某一行是不是没有0，就消行
        for(var i = 0;i < game.rowAmount;i++){
            if(!game.map.mapCode[i].includes(0)){
                // 如果没有0，就删除行
                game.map.mapCode.splice(i, 1);
                // 删除行之后，再重新在头部填充一行全是0的
                game.map.mapCode.unshift(new Array(12).fill(0))

                game.score++;
                document.getElementById('goDie').play();
            }
        }
    }

    // 触顶游戏结束
    Block.prototype.gameover = function(){
        // 判断数组第0行有没有不等于0的项，如果有，游戏结束
        game.map.mapCode[0].forEach(function(item){
            if(item != 0){
                clearInterval(game.timer);
                alert('游戏结束')
            }
        })
    }
})()