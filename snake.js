$(function() {
    var canvas = $('#canvas')[0];
    var context = canvas.getContext('2d');

    var snake = [
        {x: 50, y: 100, oldX: 0, oldY: 0 },
        {x: 50, y: 90, oldX: 0, oldY: 0 },
        {x: 50, y: 80, oldX: 0, oldY: 0 },
    ];

    var food = { x: 200, y: 200, eaten: false };

    var snakeWidth = snakeHeight = 10;
    var blockSize = 10;

    const LEFT = 65;
    const UP = 87;
    const RIGHT = 68;
    const DOWN = 83;

    var keyPressed = DOWN;
    var score = 0;
    var game;

    game = setInterval(gameLoop, 200);

    // Set a Loop
    function gameLoop() {
        console.log('loop running');
        clearCanvas();
        createFood();
        moveSnake();
        createSnake();
    }

    // Function to move the snake with WASD keys
    function moveSnake() {
        $.each(snake, function(index, value) {
            snake[index].oldX = value.x;
            snake[index].oldY = value.y;
            if(index == 0) {
                if(keyPressed == DOWN) {
                    snake[index].y = value.y + blockSize;
                } else if (keyPressed == UP) {
                    snake[index].y = value.y - blockSize;
                } else if (keyPressed == RIGHT) {
                    snake[index].x = value.x + blockSize;
                } else if (keyPressed == LEFT) {
                    snake[index].x = value.x - blockSize;
                }
            } else {
                snake[index].x = snake[index - 1].oldX;
                snake[index].y = snake[index - 1].oldY;
            }   
    }
        )};

    // Function to initalize and create the Snake
    function createSnake() {
        $.each(snake, function(index, value) {
            context.fillStyle = 'red';
            context.fillRect(value.x, value.y, snakeWidth, snakeHeight);
            context.strokeStyle = 'white';
            context.strokeRect(value.x, value.y, snakeWidth, snakeHeight)
            // Add food to snake
            if (index == 0) {
                // If the Head hits the Body Condition
                if(collided(value.x, value.y)) {
                    gameOver();
                }
                if (ateFood(value.x, value.y)) {
                    score++;
                    $('#score').text(score);
                    console.log('Ate food');
                    addFoodToSnake();
                    food.eaten = true;
                }
            }
        });
    }

    // Function to add Food to the Snake, basically if food is eaten, push the new x, y onto the snake body
    function addFoodToSnake() {
        snake.push({
            x: snake[snake.length - 1].oldX,
            y: snake[snake.length - 1].oldY
        })
    }

    // Function, if the snake collides into the walls, or into it's own body, GAME OVER
    function collided(x, y) {
        return snake.filter(function(value, index) {
            return index != 0 && value.x == x && value.y == y;
        }) .length > 0 || x < 0 || x > canvas.width || y < 0 || y > canvas.height 
        // game over if the x and y positions hit the wall and if the head touches the snake own body;
    }

    // Function to create the Food 
    function createFood() {
        context.fillStyle = 'yellow';
        // If the food eaten is true, then create a new FoodPosition
        if(food.eaten == true) {
            food = getNewPositionForFood();
        }
        context.fillRect(food.x, food.y, snakeWidth, snakeHeight);
    }

    // Function, if the food is eaten
    function ateFood(x, y) {
        return food.x == x && food.y == y;
    }

    // Function to clear the Canvas
    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    $(document).keydown(function(e) {
        // Game crashes if any other key besides UP, DOWN, LEFT, RIGHT CLICKED SO THIS WILL FIX IT
        if ($.inArray(e.which, [DOWN, UP, LEFT, RIGHT]) != -1) {
            keyPressed = checkKeyIsAllowed(e.which);
        }
        console.log(keyPressed)
    })

    // Function used to allow WASD keys to be pressed and move the snake's x and y postions and make it so that the snake cannot go back in the same direction, example, going DOWN, cannot click UP
    function checkKeyIsAllowed(tempKey) {
        let key;
        if(tempKey == DOWN) {
            key = (keyPressed != UP) ? tempKey : keyPressed;
        } else if (tempKey == UP) {
            key = (keyPressed != DOWN) ? tempKey : keyPressed;
        } else if (tempKey == LEFT) {
            key = (keyPressed != RIGHT) ? tempKey : keyPressed;
        } else if (tempKey == RIGHT) {
            key = (keyPressed != LEFT) ? tempKey : keyPressed;
        }
        return key;
    };

    // Function to create Game OVER alert if the snake hits itself or any walls
    function gameOver() {
        clearInterval(game);
        alert('Game Over You Lose! ')
    }

    // Function to create a newPositionForFood after the current FoodPosition is eaten
    function getNewPositionForFood() {
        let xArr = yArr = [], xy; 
        $.each(snake, function(index, value) {
            if($.inArray(value.x, xArr) !== -1) {
                xArr.push(value.x);
            }
            if ($.inArray(value.y, yArr) == -1) {
                yArr.push(value.y);
            }
        });
        xy = getEmptyXY(xArr, yArr);
        return xy;
    }

    function getEmptyXY(xArr,  yArr) {
        let newX, newY;
        newX = getRandomNumber(canvas.width - 10, 10)
        newY = getRandomNumber(canvas.height - 10, 10)
        // make sure random food is not already at position of snake
        if($.inArray(newX, xArr) == -1 && $.inArray(newY, yArr) != -1 ) {
            return {
                x: newX,
                y: newY,
                eaten: false
            }
        } else {
            return getEmptyXY(xArr, yArr);
        }
    }

    function getRandomNumber(max, multipleOf) {
        let result = Math.floor(Math.random() * max);
        result = (result % 10 == 0) ? result : result + (multipleOf - result  % 10);
        return result;
    }
    
});