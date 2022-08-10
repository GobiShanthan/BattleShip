

const cpuAllDivs = document.getElementById('cpu-board')
const gameBoard = document.querySelector('.board')


//eventHandlers 
cpuAllDivs.addEventListener("click",clickGameHandler)



//GAMEBOARD SIZE CHANGE
let promptValue = 10
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




/*---------------------------------------------------------------SHIP CLASS SETUP--------------------------------------------*/

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



/*---------------------------------------------------------------SHIP CLASS SETUP--------------------------------------------*/





/*---------------------------------------------------------------INITIALIZING --------------------------------------------*/

// FIRST INITIAL RENDER
init()


//BOARD INIT
function init(){
    for(let i =1;i <= numGrid;i++){
       gameBoxResize(i)

       cpuBoardData[`${i}`] = 'empty'
       if(i%promptValue === 0){
           cpuBoardData[`${i}`] ='Right Edge'
       }
       if(i%promptValue -1 === 0){
        cpuBoardData[`${i}`] ='Left edge'
       }
       if(i > 0 && i <= promptValue){
        cpuBoardData[`${i}`] ='Top edge'
       }
       if(i> (promptValue* promptValue - promptValue) && i <promptValue* promptValue){
           cpuBoardData[`${i}`] ='Bottom edge'
       }
       if(i === 1){
        cpuBoardData[`${i}`] ='topLeftCorner'
       }
       if(i === promptValue){
        cpuBoardData[`${i}`] ='topRightCorner'
       }
       if(i === promptValue*promptValue -promptValue){
        cpuBoardData[`${i}`] ='bottomLeftCorner'
       }
       if(i === promptValue*promptValue){
        cpuBoardData[`${i}`] ='topRightCorner'
       }
    }

}

// console.log('board remastered',cpuBoardData)

let cpuBoardDataDeleted =  Object.assign({}, cpuBoardData)






//DISPLAY SHIP FUNCTION 
function shipDisplay(e,ship,color,choiceId){
    document.getElementById(choiceId).style.backgroundColor = color;
    cpuBoardData[`${choiceId}`] =`${ship.name} ${ship.remaining} of ${ship.spaces}`
    ship.positions.push(choiceId)
    ship.remaining = ship.remaining -1
}


// SHIP PLACEMENTS FOR PLOTTING USERS SHIPS
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


// CLICK HANDLER FOR USERS SHIP AND USER GUESSING GAME
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












/////////--------------------------------------------SHIP AI ---------------------------------------////////


//SHIP 3 
let newRandom2 = Math.floor(Math.random()*4)+1
let allCpuEntries2 =  Object.entries(cpuBoardData)
let availableValues2 = allCpuEntries2.filter(val=>val[1].slice(0,4) !== 'ship')
let newFirstNumb2 = Math.floor(Math.random()* availableValues2.length)
let thirdShipFirstChoice = availableValues2[newFirstNumb2][0]
console.log(availableValues2,'third ship-----------------------------')

////////////////////////////////////////////////////////////////

//SHIP 4 


////////////////////////////////////////////////////////////////

//SHIP 5 



////////////////////////////////////////////////////////////////


let cpuChosenShipsArray =[]


aiShipPlacement()


function aiShipPlacement(){
    firstShipFunction(cpuShipOne,'grey')
    secondShipFunction(cpuShipTwo,'red')
    thirdShipFunction(cpuShipThree,'purple')
    fourthShipFunction(cpuShipFour,'yellow')
    fifthShipFunction(cpuShipFive,'cyan')
}




// function firstShipFunction(){
//     console.log('shipOne cpu')
//     console.log(cpuBoardData)
// }












// //////////////////////////////////////////////////////////////////////////FIRST SHIP START ////////////////////////////////////////////////////////////////////////////////////
function firstShipFunction(ship,color){

    const firstChoice = Math.floor(Math.random()* Object.keys(cpuBoardData).length)
    //step 1 - first random piece anywhere
    document.getElementById(firstChoice).style.backgroundColor = color
    cpuBoardData[firstChoice] = ship.name
    cpuBoardDataDeleted[firstChoice] = ship.name
    delete cpuBoardDataDeleted[firstChoice] 

//step 2 - Second piece


let value = Object.keys(cpuBoardData).find(key => cpuBoardData[key] === 'shipOne');






if(value % promptValue === 0 || (value -1) % promptValue === 0 ||value >0 && value < promptValue +1 || value >(promptValue* promptValue)- promptValue && value < promptValue * promptValue){
    if(value % promptValue === 0){

        const rightArray =[2,3,4]
        const newChoiceNum = Math.floor(Math.random()*rightArray.length)
        const newNextChoice = rightArray[newChoiceNum]

        nextChoiceAi(firstChoice,1,color,ship,newNextChoice)
    }else if((value -1) % promptValue === 0 ){

        let leftArray =[1,3,4]
        const newChoiceNum = Math.floor(Math.random()*leftArray.length)
        const newNextChoice = leftArray[newChoiceNum]


        nextChoiceAi(firstChoice,1,color,ship,newNextChoice)

    }else if(value > 0 && value < promptValue +1){
        let topArray =[1,2,3]
        const newChoiceNum = Math.floor(Math.random()*topArray.length)
        const newNextChoice = topArray[newChoiceNum]

        nextChoiceAi(firstChoice,1,color,ship,newNextChoice)

    }else if(value > (promptValue * promptValue) - promptValue && value < (promptValue * promptValue) +1){

        let bottomArray = [1,2,4]
        const newChoiceNum = Math.floor(Math.random()*bottomArray.length)
        const newNextChoice = bottomArray[newChoiceNum]
        nextChoiceAi(firstChoice,1,color,ship,newNextChoice)
    }

}else{
    const nextChoice = Math.floor(Math.random()*4)
    nextChoiceAi(firstChoice,1,color,ship,nextChoice ===0?nextChoice+1:nextChoice)



 }
}

// //////////////////////////////////////////////////////////////////////////FIRST SHIP END ////////////////////////////////////////////////////////////////////////////////////









// //////////////////////////////////////////////////////////////////////////SECOND SHIP START////////////////////////////////////////////////////////////////////////////////////
function secondShipFunction(ship,color){


// ITERATE THROUGH THE OBJECT AND DELETE THE NEW KEYS THAT HAVE SHIPS AND RANDOMIZE LEFT OVER VALUES FOR SECOND SHIP FIRST CHOICE

let allCpuEntries =  Object.entries(cpuBoardData)
let availableValues = allCpuEntries.filter(val=>val[1].slice(0,4) !== 'ship')
let newFirstNumb = Math.floor(Math.random()* availableValues.length)
let firstChoice = availableValues[newFirstNumb][0]



//---------------------------------------------------------------------------//

    const nextChoice = Math.floor(Math.random()*4)+1


// //step 1 - first random piece anywhere
// document.getElementById(firstChoice).style.backgroundColor = color
// cpuBoardData[firstChoice] = ship.name
// cpuBoardDataDeleted[firstChoice] = ship.name
// delete cpuBoardDataDeleted[firstChoice] 

//-------------------------------------------------------------------------//

let value = firstChoice

// console.log('right side',value % promptValue === 0)
// console.log('left side',(value -1) % promptValue === 0 )
// console.log('top side',value > 0 && value < promptValue +1)
// console.log('bottom side',value > (promptValue * promptValue) - promptValue && value < (promptValue * promptValue) +1)

// step 2 - Finish the ship



if(value % promptValue === 0 || (value -1) % promptValue === 0 ||value >0 && value < promptValue +1 || value >(promptValue* promptValue)- promptValue && value < promptValue * promptValue){
    if(value % promptValue === 0){

        const rightArray =[2,3,4]
        const newChoiceNum = Math.floor(Math.random()*rightArray.length)
        const newNextChoice = rightArray[newChoiceNum]

        nextChoiceAi(firstChoice,3,color,ship,newNextChoice)
    }else if((value -1) % promptValue === 0 ){

        let leftArray =[1,3,4]
        const newChoiceNum = Math.floor(Math.random()*leftArray.length)
        const newNextChoice = leftArray[newChoiceNum]


        nextChoiceAi(firstChoice,3,color,ship,newNextChoice)

    }else if(value > 0 && value < promptValue +1){
        let topArray =[1,2,3]
        const newChoiceNum = Math.floor(Math.random()*topArray.length)
        const newNextChoice = topArray[newChoiceNum]

        nextChoiceAi(firstChoice,3,color,ship,newNextChoice)

    }else if(value > (promptValue * promptValue) - promptValue && value < (promptValue * promptValue) +1){

        let bottomArray = [1,2,4]
        const newChoiceNum = Math.floor(Math.random()*bottomArray.length)
        const newNextChoice = bottomArray[newChoiceNum]
        nextChoiceAi(firstChoice,3,color,ship,newNextChoice)
    }

}else{
    nextChoiceAi(firstChoice,3,color,ship,nextChoice === 0?nextChoice +1 :nextChoice)
 }



}

// //////////////////////////////////////////////////////////////////////////SECOND SHIP END////////////////////////////////////////////////////////////////////////////////////









// //////////////////////////////////////////////////////////////////////////THIRD SHIP START////////////////////////////////////////////////////////////////////////////////////
function thirdShipFunction(ship,color){


    let allCpuEntries =  Object.entries(cpuBoardData)
    let availableValues = allCpuEntries.filter(val=>val[1].slice(0,4) !== 'ship')
    let newFirstNumb = Math.floor(Math.random()* availableValues.length)
    let firstChoice = availableValues[newFirstNumb][0]
    console.log(availableValues2,'third ship-----------------------------')





    const nextChoice = Math.floor(Math.random()*4)


// //step 1 - first random piece anywhere
// document.getElementById(firstChoice).style.backgroundColor = color
// cpuBoardData[firstChoice] = ship.name
// cpuBoardDataDeleted[firstChoice] = ship.name
// delete cpuBoardDataDeleted[firstChoice] 

//-------------------------------------------------------------------------//

let value = firstChoice
// console.log('right side',value % promptValue === 0)
// console.log('left side',(value -1) % promptValue === 0 )
// console.log('top side',value > 0 && value < promptValue +1)
// console.log('bottom side',value > (promptValue * promptValue) - promptValue && value < (promptValue * promptValue) +1)

// step 2 - Finish the ship



if(value % promptValue === 0 || (value -1) % promptValue === 0 ||value >0 && value < promptValue +1 || value >(promptValue* promptValue)- promptValue && value < promptValue * promptValue){
    if(value % promptValue === 0){

        const rightArray =[2,3,4]
        const newChoiceNum = Math.floor(Math.random()*rightArray.length)
        const newNextChoice = rightArray[newChoiceNum]

        nextChoiceAi(firstChoice,4,color,ship,newNextChoice)
    }else if((value -1) % promptValue === 0 ){

        let leftArray =[1,3,4]
        const newChoiceNum = Math.floor(Math.random()*leftArray.length)
        const newNextChoice = leftArray[newChoiceNum]


        nextChoiceAi(firstChoice,4,color,ship,newNextChoice)

    }else if(value > 0 && value < promptValue +1){
        let topArray =[1,2,3]
        const newChoiceNum = Math.floor(Math.random()*topArray.length)
        const newNextChoice = topArray[newChoiceNum]

        nextChoiceAi(firstChoice,4,color,ship,newNextChoice)

    }else if(value > (promptValue * promptValue) - promptValue && value < (promptValue * promptValue) +1){

        let bottomArray = [1,2,4]
        const newChoiceNum = Math.floor(Math.random()*bottomArray.length)
        const newNextChoice = bottomArray[newChoiceNum]
        nextChoiceAi(firstChoice,4,color,ship,newNextChoice)
    }

}else{
    nextChoiceAi(firstChoice,4,color,ship,nextChoice === 0?nextChoice +1 :nextChoice)
 }



}

///////////////////////////////////////////////////////////////////////////THIRD SHIP END////////////////////////////////////////////////////////////////////////////////////









////////////////////////////////////////////////////////////////////////////FOURTH SHIP START////////////////////////////////////////////////////////////////////////////////////
function fourthShipFunction(ship,color){

    const nextChoice = Math.floor(Math.random()*4)+1
    let allCpuEntries =  Object.entries(cpuBoardData)
    let availableValues = allCpuEntries.filter(val=>val[1].slice(0,4) !== 'ship')
    let newFirstNumb = Math.floor(Math.random()* availableValues.length)
    let firstChoice = availableValues[newFirstNumb][0]

//step 1 - first random piece anywhere
// document.getElementById(firstChoice).style.backgroundColor = color
// cpuBoardData[firstChoice] = ship.name
// cpuBoardDataDeleted[firstChoice] = ship.name
// delete cpuBoardDataDeleted[firstChoice] 

//-------------------------------------------------------------------------//

let value = firstChoice;

// console.log('right side',value % promptValue === 0)
// console.log('left side',(value -1) % promptValue === 0 )
// console.log('top side',value > 0 && value < promptValue +1)
// console.log('bottom side',value > (promptValue * promptValue) - promptValue && value < (promptValue * promptValue) +1)

// step 2 - Finish the ship



if(value % promptValue === 0 || (value -1) % promptValue === 0 ||value >0 && value < promptValue +1 || value >(promptValue* promptValue)- promptValue && value < promptValue * promptValue){
    if(value % promptValue === 0){

        const rightArray =[2,3,4]
        const newChoiceNum = Math.floor(Math.random()*rightArray.length)
        const newNextChoice = rightArray[newChoiceNum]

        nextChoiceAi(firstChoice,5,color,ship,newNextChoice)
    }else if((value -1) % promptValue === 0 ){

        let leftArray =[1,3,4]
        const newChoiceNum = Math.floor(Math.random()*leftArray.length)
        const newNextChoice = leftArray[newChoiceNum]


        nextChoiceAi(firstChoice,5,color,ship,newNextChoice)

    }else if(value > 0 && value < promptValue +1){
        let topArray =[1,2,3]
        const newChoiceNum = Math.floor(Math.random()*topArray.length)
        const newNextChoice = topArray[newChoiceNum]

        nextChoiceAi(firstChoice,5,color,ship,newNextChoice)

    }else if(value > (promptValue * promptValue) - promptValue && value < (promptValue * promptValue) +1){

        let bottomArray = [1,2,4]
        const newChoiceNum = Math.floor(Math.random()*bottomArray.length)
        const newNextChoice = bottomArray[newChoiceNum]
        nextChoiceAi(firstChoice,5,color,ship,newNextChoice)
    }

}else{
    nextChoiceAi(firstChoice,5,color,ship,nextChoice === 0?nextChoice +1 :nextChoice)
 }



}
////////////////////////////////////////////////////////////////////////////FOURTH SHIP START////////////////////////////////////////////////////////////////////////////////////







////////////////////////////////////////////////////////////////////////////FIVE SHIP START////////////////////////////////////////////////////////////////////////////////////
function fifthShipFunction(ship,color){


    let allCpuEntries =  Object.entries(cpuBoardData)
    let availableValues = allCpuEntries.filter(val=>val[1].slice(0,4) !== 'ship')
    let newFirstNumb = Math.floor(Math.random()* availableValues.length)
    let firstChoice = availableValues[newFirstNumb][0]
    const nextChoice = Math.floor(Math.random()*4)


// //step 1 - first random piece anywhere
// document.getElementById(firstChoice).style.backgroundColor = color
// cpuBoardData[firstChoice] = ship.name
// cpuBoardDataDeleted[firstChoice] = ship.name
// delete cpuBoardDataDeleted[firstChoice] 

//-------------------------------------------------------------------------//

let value = firstChoice

// console.log('right side',value % promptValue === 0)
// console.log('left side',(value -1) % promptValue === 0 )
// console.log('top side',value > 0 && value < promptValue +1)
// console.log('bottom side',value > (promptValue * promptValue) - promptValue && value < (promptValue * promptValue) +1)

// // step 2 - Finish the ship



if(value % promptValue === 0 || (value -1) % promptValue === 0 ||value >0 && value < promptValue +1 || value >(promptValue* promptValue)- promptValue && value < promptValue * promptValue){
    if(value % promptValue === 0){

        const rightArray =[2,3,4]
        const newChoiceNum = Math.floor(Math.random()*rightArray.length)
        const newNextChoice = rightArray[newChoiceNum]

        nextChoiceAi(firstChoice,6,color,ship,newNextChoice)
    }else if((value -1) % promptValue === 0 ){

        let leftArray =[1,3,4]
        const newChoiceNum = Math.floor(Math.random()*leftArray.length)
        const newNextChoice = leftArray[newChoiceNum]


        nextChoiceAi(firstChoice,6,color,ship,newNextChoice)

    }else if(value > 0 && value < promptValue +1){
        let topArray =[1,2,3]
        const newChoiceNum = Math.floor(Math.random()*topArray.length)
        const newNextChoice = topArray[newChoiceNum]

        nextChoiceAi(firstChoice,6,color,ship,newNextChoice)

    }else if(value > (promptValue * promptValue) - promptValue && value < (promptValue * promptValue) +1){

        let bottomArray = [1,2,4]
        const newChoiceNum = Math.floor(Math.random()*bottomArray.length)
        const newNextChoice = bottomArray[newChoiceNum]
        nextChoiceAi(firstChoice,6,color,ship,newNextChoice)
    }

}else{
    nextChoiceAi(firstChoice,6,color,ship,nextChoice === 0?nextChoice +1 :nextChoice)
 }



}

////////////////////////////////////////////////////////////////////////////FIVE SHIP START////////////////////////////////////////////////////////////////////////////////////







function checkIfEmpty(nextChoice,num,firstChoice){
    let arr=[] 
    let arrValues=[]


    if(nextChoice === 1){

        for(let i = 1 ; i <= num; i++){
            arr.push(cpuBoardData[firstChoice + i])
            arrValues.push(firstChoice + i)
        
        }

    }else if (nextChoice === 2){

        for(let i = 1; i <=num ; i++){
            arr.push(cpuBoardData[firstChoice - i])
            arrValues.push(firstChoice - i)
        }

    }else if (nextChoice === 3){

        for(let i = 1; i <=num ; i++){
            arr.push(cpuBoardData[firstChoice + promptValue * i])
            arrValues.push(firstChoice + promptValue * i)

        }
    }else if (nextChoice === 4){

        for(let i = 1 ; i <= num; i++){
            arr.push(cpuBoardData[firstChoice - promptValue * i])
            arrValues.push(firstChoice - promptValue * i)

        }

    }
console.log(arr)
let isUndefined = arr.includes(undefined)
console.log('isUndefined',isUndefined)
let isEmpty = !isUndefined  ? arr.every((val) =>val.slice(0,4) !== 'ship' ):false

console.log('isEmpty',isEmpty)
console.log('values',arrValues)
console.log(arr.length,num)





let proceed ={
    run:false,
    values:[]
} 
let overAndUnderValue = arrValues.every(el=>el >0 && el <=100)
console.log(overAndUnderValue,'just over and under<<<<<<<<-------------')

//pushing arrValues into proceed values
proceed.values.push( isEmpty && arr.length === num && !isUndefined && overAndUnderValue?arrValues:null)

let valuesCheck = proceed.values.length > 0
console.log('this is the values property',valuesCheck)

proceed.run = isEmpty && arr.length === num && !isUndefined && overAndUnderValue && valuesCheck ?true:false
console.log(proceed.run,'full proceed<<<<<<<<-------------')
  return proceed

}

function generateNewNumberCpuBoard(){
    return Math.floor(Math.random()*Object.keys(cpuBoardData).length)

}

// //NEXT CHOICE TO DECIDE WHAT DIRECTION THE AI WILL GO WITH THE PEICES
function nextChoiceAi (firstChoice,num,color,ship,nextChoice){
  
let proceed = checkIfEmpty(nextChoice,num,firstChoice)


let iterations =0

            while(!proceed.run){



                if(iterations>6){
                    let newRandom = Math.floor(Math.random()*4)+1
                    let = allCpuEntries =  Object.entries(cpuBoardData)
                    let availableValues = allCpuEntries.filter(val=>val[1].slice(0,4) !== 'ship')
                    let newFirstNumb = Math.floor(Math.random()* availableValues.length)

                    let newFirstChoice = availableValues[newFirstNumb]
                   
                    proceed = checkIfEmpty(newRandom,num, Number(newFirstChoice[0]))
                
                    console.log('iterations',iterations)
                    iterations++
                    console.log('iterations',iterations)
                }else{
                    let newRandom = Math.floor(Math.random()*4)+1
                    proceed = checkIfEmpty(newRandom,num,firstChoice)
                    iterations++
                    console.log('iterations',iterations)
                }
            
            }


 

    console.log(proceed.run,' i can proceed with the plotting of ships')
if(proceed.run){
    console.log('i am running the ship function')
if(proceed.values.length >0){
for(let i = 0 ; i < proceed.values[0].length;i++){
    document.getElementById(proceed.values[0][i]).style.backgroundColor =color
                cpuBoardData[proceed.values[0][i]] = ship.name
                cpuBoardDataDeleted[proceed.values[0][i]] = ship.name
                delete cpuBoardDataDeleted[proceed.values[0][i]]



}

}
}





}





