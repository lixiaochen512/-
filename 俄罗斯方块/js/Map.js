(function(){
    window.Map = function(){
        // 循环创建地图数组
        this.mapCode = (function(){
            var arr = [];
            for(var i = 0;i < 20;i++){
                arr.push([])

                for(var j = 0;j < 12;j++){
                    arr[i].push(0)
                }
            }

            // 由于地图的最底部没有非0的值，下标越界之后，循环不到第i行和j列，所以会报错
            // 解决方法：在底部手动填充一行非0的数组即可
            arr.push(Array(12).fill('X'))

            return arr;
        })()
        console.log(this.mapCode)
    }


    // 地图渲染
    Map.prototype.render = function(){
        for(var i = 0; i < game.rowAmount;i++){
            for(var j = 0; j < 12; j++){
                // 如果地图中的二维数组有非0的，表示有类名，然后根据当前类名，渲染方块
                if(this.mapCode[i][j] != 0){
                    game.setClass(i, j, this.mapCode[i][j])
                }
            }
        }
    }
})()