

const cpuAllDivs = document.getElementById('cpu-board')
const gameBoard = document.querySelector('.board')


//eventHandlers 
cpuAllDivs.addEventListener("click",clickGameHandler)



//GAMEBOARD SIZE CHANGE
let promptValue = 15
let gridNum = promptValue 
let numGrid = gridNum*gridNum


// GAMEBOARD FUNCTION
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



/*--------------------------------------------------------------GET BORDER VALUES---------------------------------------------*/


const rightBorder = []
const leftBorder = []
const topBorder = []
const bottomBorder = []



function getBoarderNums(){

    for(let i = 1; i <= promptValue; i++){
        rightBorder.push(promptValue * i)
        leftBorder.push(promptValue * i - (promptValue -1))
        topBorder.push(i)
    }

    for(let i = promptValue; i >= 1; i--){
        bottomBorder.push(promptValue * promptValue +1 -i)
    }

}

getBoarderNums()



/*---------------------------------------------------------------GET BOARDER VALUES--------------------------------------------*/



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


//CPU SHIPS

let cpuShipOne = new Ship('shipOne',[],2,2)
let cpuShipTwo = new Ship('shipTwo',[],3,3)
let cpuShipThree = new Ship('shipThree',[],4,4)
let cpuShipFour = new Ship('shipFour',[],5,5)
let cpuShipFive = new Ship('shipFive',[],6,6)



// FIRST INITIAL RENDER
init()


//BOARD INIT
function init(){
    for(let i =1;i <= numGrid;i++){
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
    const lowestNumber = Math.min(...ship.positions)
    const highestNumber = Math.max(...ship.positions)
    const notXPosition = choiceId - lastPosition !== -1 && choiceId - lastPosition !== 1 && choiceId - lastPosition !== promptValue && choiceId - lastPosition !== -promptValue


    //FIRST POSITION SUBTRACT LAST POSITION INSIDE MATH.ABS TO TURN NEGITIVE VALUES POSITIVE
    const compareFirstLast = Math.abs(firstPosition - lastPosition)

//handles ship one
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
            shipDisplay(e,ship,color,choiceId)
        }else{
            if(choiceId - lowestNumber !==  -promptValue && choiceId - highestNumber !== promptValue)return 
            shipDisplay(e,ship,color,choiceId)
        }
    }
}

}


// CLICK HANDLER
function clickGameHandler(e){
    if(e.target.id ==='cpu-board') return ;
    if(cpuBoardData[e.target.id] !== 'empty' && cpuBoardData[e.target.id] !== 'miss' && cpuBoardData[e.target.id] !== 'hit') return;

    let randomNum = Math.floor(Math.random()* Object.keys(cpuBoardData).length)


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
            if(cpuBoardData[e.target.id] !== 'miss' && cpuBoardData[e.target.id] !== 'hit' && cpuBoardData[e.target.id] !== 'empty'){

                document.getElementById(e.target.id).style.backgroundColor ='orange'
                cpuBoardData[e.target.id] = 'hit'
            }else{
                if(cpuBoardData[e.target.id] === 'empty'){
                    document.getElementById(e.target.id).style.backgroundColor = 'red'
                    cpuBoardData[e.target.id] = 'miss'
                }

            }
        }

    }

    console.log(cpuBoardData)

}


////////////////////////////////////////////////////////////////
const firstChoiceShipOne = Math.floor(Math.random()* Object.keys(cpuBoardData).length)
const firstChoiceShipTwo = Math.floor(Math.random()* Object.keys(cpuBoardData).length)
const firstChoiceShipThree = Math.floor(Math.random()* Object.keys(cpuBoardData).length)
const firstChoiceShipFour = Math.floor(Math.random()* Object.keys(cpuBoardData).length)
const firstChoiceShipFive =Math.floor(Math.random()* Object.keys(cpuBoardData).length)
////////////////////////////////////////////////////////////////




let cpuChosenShipsArray =[]


aiShipPlacement()


function aiShipPlacement(){
    cpuShipMap(cpuShipOne,firstChoiceShipOne,'grey')
    cpuShipMap(cpuShipTwo,firstChoiceShipTwo,'red')
    cpuShipMap(cpuShipThree,firstChoiceShipThree,'green')
    cpuShipMap(cpuShipFour,firstChoiceShipFour,'white')
    cpuShipMap(cpuShipFive,firstChoiceShipFive,'purple')
}










function cpuShipMap(ship,firstChoice,color){
    const nextChoice = Math.floor(Math.random()*4)

 if(ship.name === 'shipOne'){
//step 1 - first random piece anywhere
    document.getElementById(firstChoice).style.backgroundColor = 'green'
    cpuBoardData[firstChoice] = ship.name




//step 2 - Second piece


let value = Object.keys(cpuBoardData).find(key => cpuBoardData[key] === 'shipOne');

console.log('right side',value % promptValue === 0)
console.log('left side',(value -1) % promptValue === 0 )
console.log('top side',value > 0 && value < promptValue +1)
console.log('bottom side',value > (promptValue * promptValue) - promptValue && value < (promptValue * promptValue) +1)

if(value % promptValue === 0 || (value -1) % promptValue === 0 ||value >0 && value < promptValue +1 || value >(promptValue* promptValue)- promptValue && value < promptValue * promptValue){
    if(value % promptValue === 0){
        console.log('rightSide')
        const rightArray =[2,3,4]
        const newChoiceNum = Math.floor(Math.random()*rightArray.length)
        const newNextChoice = rightArray[newChoiceNum]




        nextChoiceAi(firstChoice,1,color,ship,newNextChoice)
    }else if((value -1) % promptValue === 0 ){
        console.log('leftSide')
        let leftArray =[1,3,4]
        const newChoiceNum = Math.floor(Math.random()*leftArray.length)
        const newNextChoice = leftArray[newChoiceNum]







        nextChoiceAi(firstChoice,1,color,ship,newNextChoice)



    }else if(value > 0 && value < promptValue +1){
        let topArray =[1,2,3]
        const newChoiceNum = Math.floor(Math.random()*topArray.length)
        const newNextChoice = topArray[newChoiceNum]
        console.log('topSide')
        nextChoiceAi(firstChoice,1,color,ship,newNextChoice)








    }else if(value > (promptValue * promptValue) - promptValue && value < (promptValue * promptValue) +1){
        console.log(' bottom side')
        let bottomArray = [1,2,4]
        const newChoiceNum = Math.floor(Math.random()*bottomArray.length)
        const newNextChoice = bottomArray[newChoiceNum]
        nextChoiceAi(firstChoice,1,color,ship,newNextChoice)
    }


}else{
    console.log(' in the middle')
    nextChoiceAi(firstChoice,1,color,ship,nextChoice ===0?nextChoice+1:nextChoice)



 }



//  else if(ship.name ==='shipTwo' ){
// if(cpuBoardData[firstChoice] !== 'empty') return


//     nextChoiceAi(firstChoice,4,color,'shipTwo',nextChoice)
 
//  }
//  else if(ship.name ==='shipThree' ){


//     document.getElementById(firstChoice).style.backgroundColor =color
//     cpuBoardData[firstChoice] = 'shipThree'
//     cpuShipOne.positions.push(firstChoice)
//     nextChoiceAi(firstChoice,4,color,'shipThree',nextChoice)

//  }
//  else if(ship.name ==='shipFour' ){


//     document.getElementById(firstChoice).style.backgroundColor =color
//     cpuBoardData[firstChoice] = 'shipFour'
//     cpuShipOne.positions.push(firstChoice)
//     nextChoiceAi(firstChoice,5,color,'shipFour',nextChoice)

//  }
//  else if(ship.name ==='shipFive' ){


//     // if(firstChoice < promptValue -5){console.log('you cant go right',firstChoice)}
//     document.getElementById(firstChoice).style.backgroundColor =color
//     cpuBoardData[firstChoice] = 'shipFive'
//     cpuShipOne.positions.push(firstChoice)
//     nextChoiceAi(firstChoice,6,color,'shipFive',nextChoice)


//     console.log(cpuBoardData)
 
// }

}
}















// //NEXT CHOICE TO DECIDE WHAT DIRECTION THE AI WILL GO WITH THE PEICES
function nextChoiceAi (firstChoice,num,color,ship,nextChoice){
    let arr=[]


    for(let i =1;i <= num; i++){

        if(nextChoice === 1){

                document.getElementById(firstChoice+i).style.backgroundColor =color
                cpuBoardData[firstChoice+i] = ship.name

        }
        if(nextChoice ===2){

                document.getElementById(firstChoice-i).style.backgroundColor =color
                cpuBoardData[firstChoice +i] = ship.name
        }
        if (nextChoice === 3){

                document.getElementById(firstChoice + promptValue * i).style.backgroundColor =color
                cpuBoardData[firstChoice + promptValue * i ] = ship.name

        }
        if (nextChoice ===4){

                document.getElementById(firstChoice - promptValue * i).style.backgroundColor =color
                cpuBoardData[firstChoice - promptValue * i] = ship.name

        }
    }


}





