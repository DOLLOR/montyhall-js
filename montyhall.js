// The Monty Hall Problem

const game = function(change){
    // debugger
    // prepare for the game
    let doorList = [false,false,false];
    doorList[random02()] = true;

    // start the game
    // the player choose a door
    let playerChosen = random02();

    // the host open a wrong door
    let hostOpen;
    if(doorList[playerChosen]){
        // the player chose the right door, the host will open a wrong door
        hostOpen = doorList.findIndex((value,index) => !value);
        // or another wrong door
        if(random01()===1){
            hostOpen = doorList.findIndex((value,index) => index!==hostOpen && !value);
        }
    }else{
        // the player chose the wrong door, the host will open another wrong door
        hostOpen = doorList.findIndex((value,index) => index!==playerChosen && !value);
    }

    let finalChosen = playerChosen;
    // player change
    if(change){
        finalChosen = doorList.findIndex((value,index) => index!==playerChosen && index!==hostOpen);
    }

    return doorList[finalChosen];
};

// 0,1,2
const random02 = () => Math.floor(Math.random() * 3);

// 0,1
const random01 = () => Math.floor(Math.random() * 2);

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
    // check random generators
    let list = [];
    for (let index = 0; index < 10000; index++) {
        list.push(random02());
    }
    console.log('random02',groupPercentBy(list));
}

{
    // check random generators
    let list = [];
    for (let index = 0; index < 10000; index++) {
        list.push(random01());
    }
    console.log('random01',groupPercentBy(list));
}

{
    let nochange = [];
    let change = [];
    for(let i=0;i<10000;i++){
        nochange.push(game(false));
        change.push(game(true));
    }
    console.log('no change',groupPercentBy(nochange));
    console.log('change',groupPercentBy(change));
}
