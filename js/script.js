const cpuAllDivs = document.getElementById('cpu-board')
const gameBoard = document.querySelector('.board')


//eventHandlers 
cpuAllDivs.addEventListener("click",clickGameHandler)



//GAME BOX SIZE CHANGE
let promptValue =20
let gridNum = promptValue 
let numGrid = gridNum*gridNum

function gameBoxResize(i){
    let gameDiv = document.createElement('div')
    gameDiv.setAttribute('id',`${i}`)
    gameDiv.classList.add('inner-box')
    gameDiv.style.width = `${gridNum/10 *50}px`;
    gameDiv.style.height = `${gridNum/10 *50}px`;
    gameBoard.style.width =`${numGrid*5}px`;
    gameBoard.style.height =`${numGrid*5}px`;
    cpuAllDivs.append(gameDiv)
}






//STATE 
const cpuBoardData ={

}

//GAME BEGINING
let gameStart = false

class Ship{
    constructor(name,positions,spaces,remaining){
        this.name = name
        this.remaining = remaining 
        this.positions = positions
        this.spaces = spaces  
    }
}


// CREATED SHIP CLASSES
let shipOne = new Ship('shipOne',[],2,2)
let shipTwo = new Ship('shipTwo',[],3,3)
let shipThree = new Ship('shipThree',[],4,4)
let shipFour = new Ship('shipFour',[],5,5)
let shipFive = new Ship('shipFive',[],6,6)



// FIRST INITIAL RENDER
init()



//BOARD INIT
function init(){
    for(let i =0;i < numGrid;i++){
       gameBoxResize(i)
       cpuBoardData[`${i}`] = 'empty'
    }
}


//Display ship
function shipDisplay(e,ship,color,choiceId){
    document.getElementById(choiceId).style.backgroundColor = color;
    cpuBoardData[`${choiceId}`] =`${ship.name} ${ship.remaining} of ${ship.spaces}`
    ship.positions.push(choiceId)
    ship.remaining = ship.remaining -1
}




// SHIP PLACEMENTS
function shipPlacement(e,ship,color,){

    // cached values 

    const choiceId = Number(e.target.id)
    const lastPosition = Number(ship.positions[ship.positions.length-1])
    const firstPosition = Number(ship.positions[0])
    const secondPosition = Number(ship.positions[1])
    const lowestNumber = Math.min(...ship.positions)
    const highestNumber = Math.max(...ship.positions)
    const notXPosition = choiceId - lastPosition !== -1 && choiceId - lastPosition !== 1 && choiceId - lastPosition !== promptValue && choiceId - lastPosition !== -promptValue




    //FIRST POSITION SUBTRACT LAST POSITION INSIDE MATH.ABS TO TURN NEGITIVE VALUES POSITIVE
    const compareFirstLast = Math.abs(firstPosition - lastPosition)


if(ship.name === 'shipOne'){
    if(ship.positions.length<1){
        
        shipDisplay(e,ship,color,choiceId)

    }else{
        if(notXPosition )return 
        shipDisplay(e,ship,color,choiceId)
    }
}else{
    if(ship.positions.length < 1){
        
        shipDisplay(e,ship,color,choiceId)

    }else if(ship.positions.length === 1){
        if(notXPosition )return 
        shipDisplay(e,ship,color,choiceId)
    }else{


        if(compareFirstLast < promptValue){
            if(choiceId - lowestNumber !== -1 && choiceId - highestNumber !== 1)return 
            console.log('it is equal to one or negitive one')
            shipDisplay(e,ship,color,choiceId)
        }else{
            console.log('more then value')
        }
        // if(firstPosition - lastPosition <15){
        // if(choiceId - lastPosition === 1 ){
        //     shipDisplay(e,ship,color,choiceId)
            
        // }
            
        // }else{

        //     console.log('ship id is over 15',e.target.id)
        // }
    }
}

}




// CLICK HANDLER
function clickGameHandler(e){
    if(e.target.id ==='cpu-board') return ;
    if(cpuBoardData[e.target.id] !== 'empty') return;

    if(!gameStart){
        if(shipOne.remaining > 0){
            shipPlacement(e,shipOne,'grey')

        }else if(shipTwo.remaining > 0){
            shipPlacement(e,shipTwo,'yellow')

        }
        else if(shipThree.remaining > 0){

            shipPlacement(e,shipThree,'green')

        }
        else if(shipFour.remaining > 0){
            shipPlacement(e,shipFour,'white')

        }
        else if(shipFive.remaining > 0){
            shipPlacement(e,shipFive,'black')

        }
        else{
            document.getElementById(e.target.id).style.backgroundColor = 'red';
            cpuBoardData[`${e.target.id}`] ='miss'
            console.log(cpuBoardData,'cpu object data')
        }




        
    }


    // console.log('shipOne',shipOne)
// console.log('shipTwo',shipTwo)
// console.log('shipThree',shipThree)
// console.log('shipFour',shipFour)
// console.log('shipFive',shipFive)

// console.log(cpuBoardData)
}

