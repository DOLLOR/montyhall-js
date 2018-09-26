// The Monty Hall Problem 三门问题

/**
 * 游戏主程序
 * @param change {boolean}
 */
const game = function(change){
    // debugger
    // 准备好游戏，随机设置奖品位置
    let doorList = [false,false,false];
    doorList[random02()] = true;

    // 开始游戏
    // 玩家任选一个门
    let playerChosen = random02();

    // 主持人打开一个门
    let hostOpen;
    if(doorList[playerChosen]){
        // 玩家选对了，主持人打开一个错误的门
        hostOpen = doorList.findIndex((value,index) => !value);
        // 或者另一个错误的门
        if(random01()===1){
            hostOpen = doorList.findIndex((value,index) => index!==hostOpen && !value);
        }
    }else{
        // 玩家选错了，主持人打开另一个错误的门
        hostOpen = doorList.findIndex((value,index) => index!==playerChosen && !value);
    }

    let finalChosen = playerChosen;
    // 是否改变选择
    if(change){
        // 最终选择另一个门
        finalChosen = doorList.findIndex((value,index) => index!==playerChosen && index!==hostOpen);
    }

    // 返回选择结果
    return doorList[finalChosen];
};

/**
 * 随机数生成，返回0,1,2中任意一个数字
 */
const random02 = () => Math.floor(Math.random() * 3);

/**
 * 随机数生成，返回0,1中任意一个数字
 */
const random01 = () => Math.floor(Math.random() * 2);

/**
 * 分布统计
 * @param list {Array}
 */
const groupPercentBy = (list) => {
    let obj1 = {};
    list.forEach(val=>{
        if(obj1[val] > 0){
            obj1[val] += 1;
        }else{
            obj1[val] = 1;
        }
    });
    Object.entries(obj1).forEach(([key,val])=>{
        obj1[key] = val/list.length;
    });
    return obj1;
};

{
    // 检查random02的随机性
    let list = [];
    for (let index = 0; index < 10000; index++) {
        list.push(random02());
    }
    console.log('random02结果分布',groupPercentBy(list));
}

{
    // 检查random01的随机性
    let list = [];
    for (let index = 0; index < 10000; index++) {
        list.push(random01());
    }
    console.log('random01结果分布',groupPercentBy(list));
}

{
    // 分别进行10000次不变选择和改变选择的游戏
    let nochange = [];
    let change = [];
    for(let i=0;i<10000;i++){
        nochange.push(game(false));
        change.push(game(true));
    }
    console.log('不变选择的结果分布',groupPercentBy(nochange));
    console.log('改变选择的结果分布',groupPercentBy(change));
}
