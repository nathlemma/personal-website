const skyDim = {x: 500, y: 580};
const groundDim =  {x:500, y:170};
const birdDim = {x: 60, y: 45};
const obstacleDim = {x:60, y:300}

const birdInit =  {x: 180, y: skyDim.y/2};
let loc =  {x: birdInit.x, y: birdInit.y};//current birds location
const movSpeed = 0 
const fallSpeed = 3.8
const obstacleSpeed = 6
const fallInterval = 20
const jumpHeight = 80
let fallId
let timerId
let isGameOver = false
let gap = 150
let h_min = 200

function game(){
    const bird = document.querySelector('.bird')
    const playGround = document.querySelector('.play-ground')
    //const ground = document.querySelector('.ground')

    function move(x,y){
        loc.y = y
        loc.x = x
        bird.style.left = x + 'px'
        bird.style.bottom = y + 'px'
        flag = true
    } 

    function freeMotion(){
        //.log("moving: " + loc.x + ':' + loc.y)
        if(loc.y < 0|| loc.x > skyDim.x-birdDim.x-5){
            gameOver()
        }
        else move(loc.x+movSpeed, loc.y-fallSpeed)
    }

    function jump(){
        //console.log("jumping")
        if(loc.y < skyDim.y-birdDim.y){
            move(loc.x,loc.y+Math.min(jumpHeight,skyDim.y-birdDim.y - loc.y ))
        }  
    }

    function control(e){
        if(e.keyCode === 32){
            jump()
        }
    }

    function gameOver(){
        console.log("GAME OVER")
        isGameOver = true
        clearInterval(timerId)
        clearInterval(fallId)
        document.removeEventListener('keydown', control)
        // ground.classList.add('ground')
        // ground.classList.remove('ground-moving')
    }
    function generateObstacle() {
        let obstacleLeft = groundDim.x
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')

        let randomHeight = Math.random() * 150
        let h_1 = h_min + randomHeight
        let h_2 = skyDim.y - (gap + h_1)

        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')

            playGround.appendChild(obstacle)
            playGround.appendChild(topObstacle)

            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            obstacle.style.height = h_1 + 'px'
            topObstacle.style.height = h_2 + 'px'

            obstacle.style.bottom = groundDim.y + 'px'
            topObstacle.style.bottom = skyDim.y + groundDim.y - h_2 + 'px'
        }


        function moveObstacle() {
        
            if(!isGameOver){
                obstacleLeft -=obstacleSpeed
                obstacle.style.left = obstacleLeft + 'px'
                topObstacle.style.left = obstacleLeft + 'px'
            }

            if (obstacleLeft < -10) {
                console.log("REMOVEd")
                clearInterval(timerId)
                playGround.removeChild(obstacle)
                playGround.removeChild(topObstacle)
            }
            if (
                obstacleLeft > birdInit.x && obstacleLeft < (birdInit.x+birdDim.x) &&
                (loc.y < h_1 || loc.y + birdDim.y >  h_1+gap)
                ) {

                    
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle, 20) 
        if (!isGameOver){
            setTimeout(generateObstacle, 1200)
        } 
    }
    
    move(birdInit.x, birdInit.y)
    fallId = setInterval(freeMotion, fallInterval)
    document.addEventListener('keydown', control)
    generateObstacle()
    

}
      
document.addEventListener("DOMContentLoaded", game)