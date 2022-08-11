
//GAME BOARD CPU CONTAINER 
const cpuAllDivs = document.getElementById('cpu-board')

//GAME BOARD PLAYER CONTAINER 
const playerAllDivs = document.getElementById('player-board')

const cpuShipOneDiv = document.getElementById('cpuS1')
const cpuShipTwoDiv = document.getElementById('cpuS2')
const cpuShipThreeDiv = document.getElementById('cpuS3')
const cpuShipFourDiv = document.getElementById('cpuS4')
const cpuShipFiveDiv = document.getElementById('cpuS5')








// EVENT HANDLER PLAYER BOARD 
playerAllDivs.addEventListener("click",clickGameHandler)

// EVENT HANDLERS 
cpuAllDivs.addEventListener("click",turnBasedPlay)


//GAME BEGINING BEGINING STATE
let gameStart = false

//PLAYERS TURN BOOLEAN
let playerTurn = true



//GAMEBOARD SIZE CHANGE
let promptValue = 10
let gridNum = promptValue 
let numGrid = gridNum*gridNum


// CPU GAME BOX
function gameBoxCpuResize(i){
    let gameDiv = document.createElement('div')
    gameDiv.setAttribute('id',`${i}`)
    gameDiv.classList.add('inner-box')
    gameDiv.style.width = `${gridNum/10 *50}px`;
    gameDiv.style.height = `${gridNum/10 *50}px`;
    cpuAllDivs.style.gridTemplateColumns =`repeat(${promptValue},1fr)`;
    cpuAllDivs.style.gridTemplateRows =`repeat(${promptValue},1fr)`;
    cpuAllDivs.append(gameDiv)
}


//PLAYER GAME BOX
function gameBoxPlayerResize(i){
    let gameDiv = document.createElement('div')
    gameDiv.setAttribute('id',`p${i}`)
    gameDiv.classList.add('inner-box')
    gameDiv.style.width = `${gridNum/10 *50}px`;
    gameDiv.style.height = `${gridNum/10 *50}px`;
    playerAllDivs.style.gridTemplateColumns =`repeat(${promptValue},1fr)`;
    playerAllDivs.style.gridTemplateRows =`repeat(${promptValue},1fr)`;
    playerAllDivs.append(gameDiv)
}


/*--------------------------------------------------------------GET BORDER VALUES---------------------------------------------*/

// ARRAYS FOR BORDER CHECK
const rightBorder = []
const leftBorder = []
const topBorder = []
const bottomBorder = []


// GET BOARDER FOR ALL BOARDS REGARDLESS OF LENGTH OF SIDES AND PUSH INTO ARRAYS ON TOP
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



// OBJECT GAME BOARD FOR CPU AND ME TO CHOOSE  (LOL NEVER AGAIN........ MABY )
const cpuBoardData ={
}

// OBJECT GAME BOARD FOR ME TO CHOOSE AND CPU TO GUESS

const playerBoardData ={
}






/*---------------------------------------------------------------SHIP CLASS SETUP START --------------------------------------------*/
//SHIP CLASS
class Ship{
    constructor(name,positions,spaces,remaining){
        this.name = name
        this.remaining = remaining 
        this.positions = positions
        this.alive = true
    }

    hit(){
        this.remaining--
    }
    isDead(){
        this.alive = false
    }
}


// CREATED SHIP PLAYER
let shipOne = new Ship('shipOne',[],2,2)
let shipTwo = new Ship('shipTwo',[],3,3)
let shipThree = new Ship('shipThree',[],4,4)
let shipFour = new Ship('shipFour',[],5,5)
let shipFive = new Ship('shipFive',[],6,6)


//CREATED SHIP AI (CPU)
let cpuShipOne = new Ship('shipOne',[],2,2)
let cpuShipTwo = new Ship('shipTwo',[],3,3)
let cpuShipThree = new Ship('shipThree',[],4,4)
let cpuShipFour = new Ship('shipFour',[],5,5)
let cpuShipFive = new Ship('shipFive',[],6,6)



/*---------------------------------------------------------------SHIP CLASS SETUP END --------------------------------------------*/





/*---------------------------------------------------------------INITIALIZING --------------------------------------------*/

// FIRST INITIAL RENDER
init()


//CPU AND PLAYER BOARD INIT &&  PUSH ALL EMPTY AND BORDER VALUES INTO GAME 
function init(){
    for(let i =1;i <= numGrid;i++){
       gameBoxCpuResize(i)
       gameBoxPlayerResize(i)

       cpuBoardData[`${i}`] = 'empty'
       playerBoardData[`p${i}`] = 'empty'

       if(i%promptValue === 0){
           cpuBoardData[`${i}`] ='Right Edge'
           playerBoardData[`p${i}`] ='Right Edge'
       }
       if(i%promptValue -1 === 0){
        cpuBoardData[`${i}`] ='Left edge'
        playerBoardData[`p${i}`] ='Left edge'
       }
       if(i > 0 && i <= promptValue){
        cpuBoardData[`${i}`] ='Top edge'
        playerBoardData[`p${i}`] ='Top edge'
       }
       if(i> (promptValue* promptValue - promptValue) && i <promptValue* promptValue){
           cpuBoardData[`${i}`] ='Bottom edge'
           playerBoardData[`p${i}`] ='Bottom edge'
       }
       if(i === 1){
        cpuBoardData[`${i}`] ='topLeftCorner'
        playerBoardData[`p${i}`] ='topLeftCorner'
       }
       if(i === promptValue){
        cpuBoardData[`${i}`] ='topRightCorner'
        playerBoardData[`p${i}`] ='topRightCorner'
       }
       if(i === promptValue * promptValue - (promptValue -1)){
        cpuBoardData[`${i}`] = 'bottomLeftCorner'
        playerBoardData[`p${i}`] = 'bottomLeftCorner'
       }
       if(i === promptValue*promptValue){
        cpuBoardData[`${i}`] ='bottomRightCorner'
        playerBoardData[`p${i}`] ='bottomRightCorner'
       }
    }

}

// console.log('board remastered',cpuBoardData)

let cpuBoardDataDeleted =  Object.assign({}, cpuBoardData)






//DISPLAY SHIP FUNCTION 
function shipDisplay(e,ship,color,choiceId){
    document.getElementById(`p${choiceId}`).style.backgroundColor = color;
    playerBoardData[`p${choiceId}`] =`${ship.name} ${ship.remaining} of ${ship.spaces}`
    ship.positions.push(choiceId)
    ship.remaining = ship.remaining -1
}


// SHIP PLACEMENTS FOR PLOTTING USERS SHIPS
function shipPlacement(e,ship,color,){

    // cached values 
   
    const choiceId = Number(e.target.id.split('p')[1])
    const lastPosition = ship.positions[ship.positions.length-1]
    const firstPosition = Number(ship.positions[0])
    const lowestNumber = Math.min(...ship.positions)
    const highestNumber = Math.max(...ship.positions)
    const notXPosition = choiceId - lastPosition !== -1 && choiceId - lastPosition !== 1 && choiceId - lastPosition !== promptValue && choiceId - lastPosition !== -promptValue


    //FIRST POSITION SUBTRACT LAST POSITION INSIDE MATH.ABS TO TURN NEGITIVE VALUES POSITIVE
    const compareFirstLast = Math.abs(firstPosition - lastPosition)

//handles ship one

if(ship.name === 'shipOne'){
    if(ship.positions.length < 1){
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


/*---------------------------------------------------------------INITIALIZING END --------------------------------------------*/












/////////--------------------------------------------TURN BASED START ---------------------------------------////////




function turnBasedPlay(e){

    while (playerTurn){
        clickCpuBoardHandler(e)
        playerTurn = false
    }
        cpuTurnFunc()
    playerTurn = true
}


//AI GLOBAL HOLD STATES
let firstHit =''
let lastHit =''
let lastDirection = 0

let moveFoward =1
let moveBackWard =1
let moveTop = 1
let moveBottom = 1

let verticle = false

function cpuTurnFunc(){
let cpuAvailableSpots = Object.entries(playerBoardData).filter(val => val[1] !=='hit' && val[1] !=='miss')
let randomNum = Math.floor(Math.random()*cpuAvailableSpots.length)
let availRandomNum = cpuAvailableSpots[randomNum][0]


let hit= true
if(firstHit !== ''){
    let value = Number(firstHit.split('p')[1])
    
    if(lastDirection === 1){
        if(playerBoardData[`p${value +moveFoward}`].slice(0,4) ==='ship'){
            document.getElementById(`p${value +moveFoward}`).style.backgroundColor ='orange'
            playerBoardData[`p${value +moveFoward}`] ='hit'
            lastHit = `p${value +moveFoward}`
            moveFoward++
            console.log('hit')
        }else{
            document.getElementById(`p${value +moveFoward}`).style.backgroundColor ='red'
            lastDirection = 2
            playerBoardData[`p${value +moveFoward}`] ='miss'
            return 
        }
    }
    if(lastDirection ===2){
        console.log('its the second direction turn')
        if(moveFoward >1){
            if(playerBoardData[`p${value -moveBackWard}`].slice(0,4) ==='ship'){
                document.getElementById(`p${value -moveBackWard}`).style.backgroundColor ='orange'
                playerBoardData[`p${value - moveBackWard}`] ='hit'
                lastHit = `p${value - moveBackWard}`
                moveBackWard++
                console.log('hit')
            }else{
                document.getElementById(`p${value - moveBackWard}`).style.backgroundColor ='red'
                lastDirection = 3
                playerBoardData[`p${value - moveBackWard}`] ='miss'
                moveBackWard =0
                moveFoward =0
            }
        }else{
            document.getElementById(`p${value - moveTop * promptValue}`).style.backgroundColor ='orange'
            playerBoardData[`p${value - moveTop * promptValue}`] ='hit'
            lastHit = `p${value - moveTop * promptValue}`
            moveTop++
            console.log('hit')
            lastDirection = 3
        }
        // if(playerBoardData[`p${value -1}`].slice(0,4) ==='ship'){
        //     document.getElementById(`p${value +1}`).style.backgroundColor ='orange'
        //     playerBoardData[`p${value -1}`] ='hit'
        //     lastHit = `p${value -1}`
        //     console.log('hit')
        // }else{
        //     document.getElementById(`p${value -1}`).style.backgroundColor ='red'
        //     lastDirection = 3
        //     playerBoardData[`p${value -1}`] ='miss'
        // }
    }
    // }if(lastDirection ===3){
    //     if(playerBoardData[availRandomNum].slice(0,4) ==='ship'){
    //         document.getElementById(lastHit).style.backgroundColor ='orange'
    //         playerBoardData[lastHit] ='hit'
    //         lastHit = lastHit
    //         console.log('hit')
    //     }else{
    //         document.getElementById(lastHit).style.backgroundColor ='red'
    //         lastDirection = 4
    //         playerBoardData[lastHit] ='miss'
    //     }
    // }
    // if(lastDirection === 4 ){
    //     if(playerBoardData[availRandomNum].slice(0,4) ==='ship'){
    //         document.getElementById(lastHit).style.backgroundColor ='orange'
    //         playerBoardData[lastHit] ='hit'
    //         lastHit = lastHit
    //         console.log('hit')
    //     }else{
    //         document.getElementById(lastHit).style.backgroundColor ='red'
    //         lastDirection = 2
    //         playerBoardData[lastHit] ='miss'
    //     }
    // }

}else{
    if(playerBoardData[availRandomNum].slice(0,4) ==='ship'){
        document.getElementById(availRandomNum).style.backgroundColor ='orange'
        playerBoardData[availRandomNum] ='hit'
        firstHit = availRandomNum
        lastDirection =1
        console.log('hit')
    }else{
        document.getElementById(availRandomNum).style.backgroundColor ='red'
        playerBoardData[availRandomNum] ='miss'
    }

}



 





}




/////////--------------------------------------------TURN BASED END ---------------------------------------////////











/////////--------------------------------------------CLICK HANDLER FOR BOARDS START ---------------------------------------////////


// CLICK HANDLER FOR USERS SHIP AND USER GUESSING GAME
function clickGameHandler(e){


    if(e.target.id === 'player-board') return ;

    if(playerBoardData[e.target.id] === 'miss' && playerBoardData[e.target.id] === 'hit' && playerBoardData[e.target.id].slice(0,4)==='ship' ) return;



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
            shipPlacement(e,shipFive,'aqua')
        }
        else{
          console.log('You cant click on your boards anymore')
        }

    }


}




/////////-------------------------------------------- FOR CPU SHIP AND USER GUESSING GAME START ---------------------------------------////////
function clickCpuBoardHandler(e){

    let myChoice = e.target.id
    if(e.target.id === 'cpu-board') return ;
  
        if(cpuBoardData[myChoice] ==='cpu-board' || cpuBoardData[myChoice]=== 'miss' || cpuBoardData[myChoice] === 'hit') return;

     
        if(cpuBoardData[myChoice] !=='hit' && cpuBoardData[myChoice].slice(0,4) ==='ship'){
            
            
            document.getElementById(e.target.id).style.backgroundColor ='orange'
            if(cpuBoardData[myChoice] ==='shipOne'){
                if(cpuShipOne.alive){
                    cpuShipOne.hit()
                    cpuBoardData[myChoice] = 'hit'
                    if(cpuShipOne.remaining === 0){
                      cpuShipOneDiv.innerText ='SHIP ONE IS DEAD'
                      cpuShipOne.isDead()
                    }
                }else{
                    return
                }

            }
            if(cpuBoardData[myChoice] ==='shipTwo'){
                if(cpuShipTwo.alive){
                    cpuShipTwo.hit()
                    cpuBoardData[myChoice] = 'hit'
                    if(cpuShipTwo.remaining === 0){
                      cpuShipTwoDiv.innerText ='SHIP Two IS DEAD'
                      cpuShipTwo.isDead()
                    }
                }else{
                    return
                }
            }
            if(cpuBoardData[myChoice] ==='shipThree'){
                if(cpuShipThree.alive){
                    cpuShipThree.hit()
                    cpuBoardData[myChoice] = 'hit'
                    if(cpuShipThree.remaining === 0){
                      cpuShipThreeDiv.innerText ='SHIP Three IS DEAD'
                      cpuShipThree.isDead()
                    }
                }else{
                    return
                }
            }
            if(cpuBoardData[myChoice] ==='shipFour'){
                if(cpuShipFour.alive){
                    cpuShipFour.hit()
                    cpuBoardData[myChoice] = 'hit'
                    if(cpuShipFour.remaining === 0){
                      cpuShipFourDiv.innerText ='SHIP Four IS DEAD'
                      cpuShipFour.isDead()
                    }
                }else{
                    return
                }
            }   
            if(cpuBoardData[myChoice] ==='shipFive'){
                if(shipFive.alive){
                    cpuShipFive.hit()
                    cpuBoardData[myChoice] = 'hit'
                    if(cpuShipFive.remaining === 0){
                      cpuShipFiveDiv.innerText ='SHIP Five IS DEAD'
                      cpuShipFive.isDead()
                    }
                }else{
                    return
                }
            }

            // cpuBoardData[myChoice] ='hit'
            
        }else{
            cpuBoardData[myChoice] ='miss'
            document.getElementById(e.target.id).style.backgroundColor ='red'
           
        }

}





/////////-------------------------------------------- FOR CPU SHIP AND USER GUESSING GAME END ---------------------------------------////////


















/////////--------------------------------------------SHIP AI ---------------------------------------////////





let cpuChosenShipsArray =[]

// ALL FIVE SHIPS PLACEMENT START
function aiShipPlacement(){
    firstShipFunction(cpuShipOne,'grey')
    secondShipFunction(cpuShipTwo,'white')
    thirdShipFunction(cpuShipThree,'purple')
    fourthShipFunction(cpuShipFour,'yellow')
    fifthShipFunction(cpuShipFive,'aqua')
}

aiShipPlacement()













////////////////////////////////////////////////////////////////////////////FIRST SHIP START ////////////////////////////////////////////////////////////////////////////////////
function firstShipFunction(ship,color){

    const firstChoice = Math.floor(Math.random()* Object.keys(cpuBoardData).length)+1
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

    const nextChoice = Math.floor(Math.random()*4)

//-------------------------------------------------------------------------//
let value = firstChoice

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



//-------------------------------------------------------------------------//

let value = firstChoice;



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
////////////////////////////////////////////////////////////////////////////FOURTH SHIP END////////////////////////////////////////////////////////////////////////////////////







////////////////////////////////////////////////////////////////////////////FIVE SHIP START////////////////////////////////////////////////////////////////////////////////////
function fifthShipFunction(ship,color){

    //RANDOM BOARD NUMBER CHECK ON EACH SHIP
    let allCpuEntries =  Object.entries(cpuBoardData)
    let availableValues = allCpuEntries.filter(val=>val[1].slice(0,4) !== 'ship')
    let newFirstNumb = Math.floor(Math.random()* availableValues.length)
    let firstChoice = availableValues[newFirstNumb][0]
    const nextChoice = Math.floor(Math.random()*4)

//-------------------------------------------------------------------------//
let value = firstChoice


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

////////////////////////////////////////////////////////////////////////////FIVE SHIP END////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////AI SHIP PLACEMENT VALIDATION START////////////////////////////////////////////////////////////////////////////////////

//FUNCTION TO CHECK IF THE NEXT SPACES FOR SHIP IS (EMPTY, INVALID, OVER AND UNDER BOARD LENGTH)
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
// console.log(arr)
let isUndefined = arr.includes(undefined)

let isEmpty = !isUndefined  ? arr.every((val) =>val.slice(0,4) !== 'ship' ):false



/*---------------------------------------------EDGE VALIDATION START--------------------------------------------------*/
// CHECKS IF ARRAY HAS BOTH RIGHTSIDE AND LEFTSIDE THEN ON THE EDGE GOIGN TO NEXT LINE
let isOnEdge = arr.includes('Right Edge') && arr.includes('Left edge')?true:false;



//CHECKS TOP AND BOTTOM EDGE
let isTopBottom = arr.includes('topLeftCorner') && arr.includes('Bottom edge')?true:false;

// CHECKS IF ARRAY HAS BOTH RIGHTSIDE AND LEFTSIDE THEN ON THE EDGE GOIGN TO NEXT LINE
let isOnTopRight = arr.includes('topRightCorner') && arr.includes('Left edge')?true:false;



let isOnBottomLeft = arr.includes('bottomLeftCorner') && arr.includes('Right Edge')?true:false;


/*---------------------------------------------EDGE VALIDATION END--------------------------------------------------*/








/*---------------------------------------------CORNER VALIDATION START--------------------------------------------------*/

//CHECKS TOP AND BOTTOM LEFT SIDE
let isTopBottomLeftCorner = arr.includes('topLeftCorner') && arr.includes('bottomLeftCorner')?true:false;


//CHECKS TOP AND BOTTOM  RIGHT SIDE
let isTopBottomRightCorner = arr.includes('topRightCorner') && arr.includes('bottomRightCorner')?true:false;

//CHECKS TOP LEFT AND RIGHT
let isTopRightLeftCorner = arr.includes('topLeftCorner') && arr.includes('topRightCorner')?true:false;


//CHECKS BOTTOM LEFT AND RIGHT
let isBottomRightLeftCorner = arr.includes('bottomLeftCorner') && arr.includes('bottomRightCorner')?true:false;

/*---------------------------------------------CORNER VALIDATION END--------------------------------------------------*/







/*---------------------------------------------CHECK EMPTY RETURN OBJECT START--------------------------------------------------*/
let proceed ={
    run:false,
    values:[]
} 
/*---------------------------------------------CHECK EMPTY RETURN OBJECT END--------------------------------------------------*/




//VALIDATION CHECK FOR BELOW BOARD LENGTH AND ABOVE LENGTH OF BOARD DIVS * WIDTH OF BOARD DIVS
let overAndUnderValue = arrValues.every(el=>el >0 && el <= promptValue *promptValue)


//PUSHING ARR VALUES INTO PROCEED.VALUES
proceed.values.push( isEmpty && arr.length === num && !isUndefined && overAndUnderValue?arrValues:null)

// CHECKS IF ARRAY VALUES HAS MORE THEN 0 LENGTH IN ARRAYS
let valuesCheck = proceed.values.length > 0


// SETS RUN BOOL IN PROCEED OBJECT TO TRUE IF ALL CONDITIONS AND VALIDATIONS ARE MET
proceed.run = isEmpty && arr.length === num && !isUndefined && overAndUnderValue && valuesCheck && !isOnEdge && !isOnTopRight && !isOnBottomLeft && !isTopBottomLeftCorner && !isTopBottomRightCorner && !isTopRightLeftCorner && !isBottomRightLeftCorner && !isTopBottom  ?true:false


// RETURNS THE PROCEED VALUE
  return proceed

}
////////////////////////////////////////////////////////////////////////////AI SHIP PLACEMENT VALIDATION START////////////////////////////////////////////////////////////////////////////////////







////////////////////////////////////////////////////////////////////////////RANDOM CHECKER AND IF PASSED VALIDATION PLOT SHIP  START////////////////////////////////////////////////////////////////////////////////////

// //NEXT CHOICE TO DECIDE WHAT DIRECTION THE AI WILL GO WITH THE PEICES
function nextChoiceAi (firstChoice,num,color,ship,nextChoice){
  
let proceed = checkIfEmpty(nextChoice,num,firstChoice)
let iterations =0

            while(!proceed.run){
                if(iterations>6){
                    let newRandom = Math.floor(Math.random()*4)+1
                    let allCpuEntries =  Object.entries(cpuBoardData)
                    let availableValues = allCpuEntries.filter(val=>val[1].slice(0,4) !== 'ship')
                    let newFirstNumb = Math.floor(Math.random()* availableValues.length)
                    let newFirstChoice = availableValues[newFirstNumb]
                    proceed = checkIfEmpty(newRandom,num, Number(newFirstChoice[0]))
                    iterations++
                }else{
                    let newRandom = Math.floor(Math.random()*4)+1
                    proceed = checkIfEmpty(newRandom,num,firstChoice)
                    iterations++
                }
            }


if(proceed.run){

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


////////////////////////////////////////////////////////////////////////////RANDOM CHECKER AND IF PASSED VALIDATION PLOT SHIP END////////////////////////////////////////////////////////////////////////////////////


