////////////////////////////////////////////////////////////
// GAME
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */
var startButtonText = 'TAP TO START'; //text for start button
var howToPlayText = 'select two plates that have calories equal to the number in the scale.'
var humanSequence = 20; //total human sequence
var humanX = 300; //human position x
var humanY = 120; //human position y

//food array

var food_number_arr = [100, 150, 200, 300, 350, 400, 450, 500, 550, 600, 700, 750, 800, 900, 2750, 2500, 2200];

var food_arr = [{src:'assets/food1.png', regX:39, regY:-37},
				{src:'assets/food2.png', regX:33, regY:-33},
				{src:'assets/food3.png', regX:36, regY:-41},
				{src:'assets/food4.png', regX:28, regY:-33},
				{src:'assets/food5.png', regX:50, regY:-6},
				{src:'assets/food6.png', regX:40, regY:-14},
				{src:'assets/food7.png', regX:35, regY:-7},
				{src:'assets/food8.png', regX:30, regY:-36},
				{src:'assets/food9.png', regX:33, regY:-22},
				{src:'assets/food10.png', regX:34, regY:-17},
				{src:'assets/food11.png', regX:50, regY:-22},
				{src:'assets/food12.png', regX:38, regY:-27},
				{src:'assets/food13.png', regX:30, regY:-17},
				{src:'assets/food14.png', regX:45, regY:-17},
				{src:'assets/food15.png', regX:34, regY:-34},
				{src:'assets/food16.png', regX:45, regY:-17},
				{src:'assets/food17.png', regX:45, regY:-37}];

//plate place position				
var place_arr = [{x:433, y:174},{x:586, y:174}];

var totalRollPlates = 8; //total plate slot to roll
var mathQuestionTextSpeed = .5; //math question text animation speed

var gameTimer = 45000; //game timer for each math question
var gameScoreText = '[NUMBER]'; //game score text
var gameScoreNum = 50; //game score number
var gameScoreOnTime = true; //enable to get score base on game timer left

var sumCorrectColour = '#2DB200'; //sum correct colour
var sumWrongColour = '#D90000'; //sum wrong colour

//level settings
var level_arr = {sum:5, //starting sum
				sumIncrease:5, //sum increase
				plateTotal:6, //starting total plate
				plateRollingSpeed:1, //starting plate rolling speed
				targetScore:20, //next target score increase
				rollSpeedIncrease:.5, //roll sushi speed when reach target score
				plateTotalIncrease:0}; //total plate increase when reach target score

var resultScoreText = 'YOUR SCORE [NUMBER]'; //text for score, [NUMBER] will replace to score
/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */

var playerData = {score:0, speed:1, sum:0, targetScore:0, fat:1, plate:0, timer:0, timerCount:0};
var gameData = {foodArray:[], foodNum:0, foodIndexArray:[], numberArray:[], plateArray:[], rollArray:[], placeArray:[]};

var endRangeNumber = 55;

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	setupGameArray();
}

function setupGameButton(){
	stage.cursor = "pointer";
	stage.addEventListener("click", handlerMethod);
}

function removeGameButton(){
	stage.cursor = null;
	stage.removeEventListener("click", handlerMethod);
}

function handlerMethod(evt) {
	 switch (evt.type){
		 case 'click':
		 	playSound('soundClick');
		 	goPage('game');
		 	break;
	 }
}

/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage=''
function goPage(page){
	curPage=page;
	
	mainContainer.visible=false;
	humanContainer.visible=false;
	gameContainer.visible=false;
	resultContainer.visible=false;
	
	removeGameButton();
	stopAnimateButton(buttonStart);
	
	var targetContainer = ''
	switch(page){
		case 'main':
			targetContainer = mainContainer;
			setupGameButton();
			startAnimateButton(buttonStart);
			createMainSushiNumber();
		break;
		
		case 'game':
			targetContainer = gameContainer;
			humanContainer.visible=true;
			startGame();
		break;
		
		case 'result':
			targetContainer = resultContainer;
			
			playSound('soundResult');
			resultScoreTxt.text = resultScoreText.replace('[NUMBER]', playerData.score);
			
			stopGame();
			saveGame(playerData.score);
			setTimeout(function () {
				window.top.location.href = "/winningpoint/"+ playerData.score; //will redirect to your blog page (an ex: blog.html)
			}, 3000);
		break;
	}
	
	targetContainer.alpha=0;
	targetContainer.visible=true;
	$(targetContainer)
	.clearQueue()
	.stop(true,true)
	.animate({ alpha:1 }, 500);
}

/*!
 * 
 * START ANIMATE BUTTON - This is the function that runs to play blinking animation
 * 
 */
function startAnimateButton(obj){
	obj.alpha=0;
	$(obj)
	.animate({ alpha:1}, 500)
	.animate({ alpha:0}, 500, function(){
		startAnimateButton(obj);	
	});
}

/*!
 * 
 * STOP ANIMATE BUTTON - This is the function that runs to stop blinking animation
 * 
 */
function stopAnimateButton(obj){
	obj.alpha=0;
	$(obj)
	.clearQueue()
	.stop(true,true);
}

/*!
 * 
 * SETUP GAME ARRAY - This is the function that runs to setup game array
 * 
 */
function setupGameArray(){
	for(n=0;n<food_arr.length;n++){
		gameData.foodArray.push(n);
	}
	
	for(n=0;n<place_arr.length;n++){
		gameData.placeArray.push(false);
	}
	
	var positionSplit = (canvasW+(endRangeNumber*2))/totalRollPlates;
	for(n=0;n<totalRollPlates;n++){
		gameData.rollArray.push({x:positionSplit*n, y:canvasH/100 *77}); // graph plate position
	}	
}

/*!
 * 
 * START GAME - This is the function that runs to start play game
 * 
 */
function startGame(){
	playerData.score = 0;
	playerData.timer = 0;
	playerData.timerCount = gameTimer;
	scoreTxt.text = gameScoreText.replace('[NUMBER]', playerData.score);
	
	playerData.fat = 1;
	playerData.sum = level_arr.sum;
	playerData.targetScore = level_arr.targetScore;
	playerData.plate = level_arr.plateTotal;
	
	playerData.speed = level_arr.plateRollingSpeed;
	
	humanLeftAnimate.y = humanRightAnimate.y = humanY - 60;
	humanFaceAnimate.gotoAndStop('static');
	humanLeftAnimate.gotoAndStop('static');
	humanRightAnimate.gotoAndStop('static');

	updateHuman();
	//shuffleFoodArray();
	createNumber();
    beforeDate = new Date();
}

 /*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame(){
	toggleGameTimer(false);
			
	TweenMax.killTweensOf(humanContainer);
	TweenMax.killTweensOf(humanFaceAnimate);
	TweenMax.killTweensOf(humanLeftAnimate);
	TweenMax.killTweensOf(humanRightAnimate);
	TweenMax.killTweensOf(playerData);
	TweenMax.killTweensOf(numberTxt);
	TweenMax.killTweensOf(numberAnimateTxt);
	TweenMax.killTweensOf(sumData);
	
	if ( typeof displayB == 'function' ) { 
		displayB();
	}
}

 /*!
 * 
 * SAVE GAME - This is the function that runs to save game
 * 
 */
function saveGame(score){
	/*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}

/*!
 * 
 * UPDATE LEVEL - This is the function that runs to update level
 * 
 */
var level = 0;
function updateLevel(con){
    if (con){

        playerData.sum += level_arr.sumIncrease;
        if(gameScoreOnTime){
            playerData.score += gameScoreNum + (level*10);
        }else{
            playerData.score += gameScoreNum;
        }
		level++;
        scoreTxt.text = gameScoreText.replace('[NUMBER]', playerData.score);

        if(playerData.sum >= playerData.targetScore){
            playerData.fat++;
            playerData.fat = playerData.fat > humanSequence ? humanSequence : playerData.fat;
            updateHuman();

            playerData.targetScore += level_arr.targetScore;
            playerData.plate += level_arr.plateTotalIncrease;
            playerData.plate = playerData.plate > (totalRollPlates-2) ? (totalRollPlates-2) : playerData.plate;

            playerData.speed += level_arr.rollSpeedIncrease;
        }
    }

	createNumber();
}

/*!
 * 
 * CREATE SUM NUMBER - This is the function that runs to create new sum number
 * 
 */
function createNumber(){
	numberTxt.alpha = 1;
	numberAnimateTxt.alpha = 0;
		
	toggleGameTimer(true);
	
	sumTxt.text = '';
    var rand1 = Math.floor(generateRandom(food_number_arr.length-3));
    var rand2 = Math.floor(generateRandom(food_number_arr.length-3));
    var correct1 = food_number_arr[rand1];
    var correct2 = food_number_arr[rand2];
	playerData.sum = correct1 + correct2;
	numberTxt.text = numberAnimateTxt.text = playerData.sum;
	animateNumber();
	
	gameData.numberArray = [];
	gameData.numberArray.push(correct1);
	gameData.numberArray.push(correct2);

    gameData.foodIndexArray = [];
    gameData.foodIndexArray.push(rand1);
    gameData.foodIndexArray.push(rand2);

	for(n=0;n<playerData.plate;n++){
        var rand = Math.floor(Math.random()*food_number_arr.length);
		if(playerData.sum == food_number_arr[rand]){
			rand = Math.floor(Math.random()*food_number_arr.length);
		}
        gameData.foodIndexArray.push(rand);
		gameData.numberArray.push(food_number_arr[rand]);
	}
    shuffleFoodAndIndexArray(gameData.numberArray, gameData.foodIndexArray);
	createPlates();
}

/*!
 * 
 * CREATE MAIN SUSHI NUMBER - This is the function that runs to create main sushi number
 * 
 */
function createMainSushiNumber(){
	gameData.numberArray = [];
    gameData.foodIndexArray = [];
	for(n=0;n<totalRollPlates-1;n++){
        rand = Math.floor(generateRandom(food_number_arr.length));
        gameData.foodIndexArray.push(rand);
		gameData.numberArray.push(food_number_arr[rand]);
	}
	createPlates();	
}

/*!
 * 
 * GENERATE RANDOM NUMBER - This is the function that runs to generate random number
 * 
 */
function generateRandom(number){
	var generateNumber = 0;
	for(g=0;g<1;g++){
		generateNumber = Math.floor(Math.random()*number);	
		if(generateNumber == 0 || isDecimalExist(generateNumber)){
			g--;	
		}
	}
	return generateNumber;
}

/*!
 * 
 * UPDATE HUMAN - This is the function that runs to update human
 * 
 */
function updateHuman(){
	for(h=1;h<=humanSequence;h++){
		$.human[h].visible = false;
	}
	$.human[Math.floor(playerData.fat)].visible = true;	
	
	humanFaceAnimate.y = humanY - 115;
	humanFaceAnimate.y -= playerData.fat/20 * 30;
	
	humanLeftAnimate.x = canvasW/100 * 40;
	humanRightAnimate.x = canvasW/100 * 60;
	
	humanLeftAnimate.x -= playerData.fat/20 * 130;
	humanRightAnimate.x += playerData.fat/20 * 130;
}

/*!
 * 
 * ANIMATE HUMAN - This is the function that runs to animate human
 * 
 */
function animateHuman(con,string){
	if(con){
		animateNumber('correct',string);
		playSound('soundScore');
		
		var speedNum = .2;
		TweenMax.to(humanContainer, speedNum, {y:-20, overwrite:true, onComplete:function(){
			TweenMax.to(humanContainer, speedNum, {y:0, overwrite:true});	
		}});
		
		TweenMax.to(humanFaceAnimate, .5, {overwrite:true, onComplete:function(){
			//playSound('soundEat');
			
			for(n=0;n<gameData.placeArray.length;n++){
				for(s=0;s<gameData.plateArray.length;s++){
					if(gameData.plateArray[s].place == n){
						gameData.plateArray[s].food.visible = false;
						gameData.plateArray[s].leftover.visible = true;
					}
				}
			}
			humanFaceAnimate.gotoAndPlay('anime');
			humanLeftAnimate.gotoAndPlay('anime');
			humanRightAnimate.gotoAndPlay('anime');
			
			TweenMax.to(humanFaceAnimate, 1.5, {overwrite:true, onComplete:updateLevel(con)});
		}});
	}else{
		playSound('soundFail');
		animateNumber('wrong',string);
		
		humanFaceAnimate.gotoAndPlay('fail');
        TweenMax.to(humanContainer, speedNum, {y:-20, overwrite:true, onComplete:function(){
            TweenMax.to(humanContainer, speedNum, {y:0, overwrite:true});
        }});

        TweenMax.to(humanFaceAnimate, .5, {overwrite:true, onComplete:function(){
            //playSound('soundEat');

            for(n=0;n<gameData.placeArray.length;n++){
                for(s=0;s<gameData.plateArray.length;s++){
                    if(gameData.plateArray[s].place == n){
                        gameData.plateArray[s].food.visible = false;
                        gameData.plateArray[s].leftover.visible = true;
                    }
                }
            }
            humanFaceAnimate.gotoAndPlay('anime');
            humanLeftAnimate.gotoAndPlay('anime');
            humanRightAnimate.gotoAndPlay('anime');

            TweenMax.to(humanFaceAnimate, 1.5, {overwrite:true, onComplete:updateLevel(con)});
        }});
	}
}

/*!
 * 
 * ANIMATE SUM NUMBER - This is the function that runs to animate sum number
 * 
 */
function animateNumber(con,string){
	var speedNum = .1;
	
	if(con == undefined){
		numberTxt.alpha = 1;
		TweenMax.to(numberTxt, speedNum, {alpha:.2, overwrite:true, onComplete:function(){
			TweenMax.to(numberTxt, speedNum, {alpha:1, overwrite:true, onComplete:function(){
				TweenMax.to(numberTxt, speedNum, {alpha:.2, overwrite:true, onComplete:function(){
					TweenMax.to(numberTxt, speedNum, {alpha:1, overwrite:true});
				}});
			}});
		}});
	}else {
		if(con == 'correct'){
			numberAnimateTxt.color = sumCorrectColour;
		}else{
			numberAnimateTxt.color = sumWrongColour;
		}
		sumData.count = 0;
		sumData.oldCount = 0;
		sumData.string = string;
		sumData.length = string.length;
		TweenMax.to(sumData, mathQuestionTextSpeed, {count:sumData.length, overwrite:true, ease:Linear.easeNone, onUpdate:function(){
			if(sumData.oldCount != Math.floor(sumData.count)){
				sumData.oldCount = Math.floor(sumData.count);
				playSound('soundType');

				numberAnimateTxt.text = sumData.string.substring(0, sumData.oldCount);
			}
		}});
		numberTxt.alpha = 0;
		numberAnimateTxt.alpha = 1;
		TweenMax.to(numberAnimateTxt, speedNum, {alpha:.2, overwrite:true, onComplete:function(){
			TweenMax.to(numberAnimateTxt, speedNum, {alpha:1, overwrite:true, onComplete:function(){
				TweenMax.to(numberAnimateTxt, speedNum, {alpha:.2, overwrite:true, onComplete:function(){
					TweenMax.to(numberAnimateTxt, speedNum, {alpha:1, overwrite:true, onComplete:function(){

					}});
				}});
			}});
		}});
	}
}

/*!
 * 
 * CREATE SUSHI PLATES - This is the function that runs to create sushi plates
 * 
 */
function createPlates(){
	plateContainer.removeAllChildren();
	gameData.plateArray = [];
	
	for(n=0;n<place_arr.length;n++){
		gameData.placeArray[n] = false;
	}
	
	var slot_arr = [];
	for(n=0;n<gameData.rollArray.length;n++){
		slot_arr.push(n);
	}

	for(n=0;n<gameData.numberArray.length;n++){
		createPlate(n, slot_arr[n]);
	}
	playSound('soundReset');

}

/*!
 * 
 * CREATE SUSHI PLATE - This is the function that runs to create sushi plate
 * 
 */
function createPlate(num, rollID){
	var foodRandomNum = Math.floor(gameData.foodIndexArray[num]);
	var newPlate = plate.clone();
	var newFood = $.food[foodRandomNum].clone();
	var newLeftover = leftover.clone();
	newLeftover.visible = false;
	if(randomBoolean()){
		newLeftover.scaleX = -1;	
	}
	
	var newPlateNumber = new createjs.Text();
	newPlateNumber.font = "40px ostrich_sansheavy";
	newPlateNumber.color = "#ffffff";
	newPlateNumber.text = gameData.numberArray[num];
	newPlateNumber.textAlign = "center";
	newPlateNumber.textBaseline='alphabetic';
	
	plateContainer.addChild(newPlate, newFood, newLeftover, newPlateNumber);
	gameData.plateArray.push({plate:newPlate, leftover:newLeftover, food:newFood, number:newPlateNumber, amount:gameData.numberArray[num], roll:true, rollID:rollID, place:-1});
	newPlate.id = num;
	createPlateEvent(newPlate);
}

/*!
 * 
 * CREATE PLATE EVENT - This is the function that runs to create plate click event
 * 
 */
function createPlateEvent(obj){
	obj.cursor = "pointer";
	obj.addEventListener("click", function(evt) {
		if(curPage == 'game')
			toggleTakePlate(evt.target.id);
	});
}

/*!
 * 
 * TOGGLE TAKE PLATE - This is the function that runs to toggle take plate
 * 
 */
function toggleTakePlate(id){
	var randomPlateNum = Math.floor(Math.random()*2)+1;
	playSound('soundPlate'+randomPlateNum);
	
	if(gameData.plateArray[id].roll){
		var checkPlace_arr = [];
		for(t=0;t<gameData.placeArray.length;t++){
			if(!gameData.placeArray[t]){
				checkPlace_arr.push(t);
			}
		}
		
		if(checkPlace_arr.length > 0){
			var randomPlaceNum = Math.floor(Math.random()*checkPlace_arr.length);
			gameData.placeArray[checkPlace_arr[randomPlaceNum]] = true;
			
			gameData.plateArray[id].place = checkPlace_arr[randomPlaceNum];
			gameData.plateArray[id].roll = false;
			gameData.plateArray[id].plate.x = place_arr[checkPlace_arr[randomPlaceNum]].x;
			gameData.plateArray[id].plate.y = place_arr[checkPlace_arr[randomPlaceNum]].y;
			checkSumEquatation();
		}
	}else{
		gameData.placeArray[gameData.plateArray[id].place] = false;
		gameData.plateArray[id].place = -1;
		gameData.plateArray[id].roll = true;
	}
}

/*!
 * 
 * CHECK SUM EQUATATION - This is the function that runs to check sum equatation is correct or wrong
 * 
 */
function checkSumEquatation(){
	var sum_arr = [];
	for(n=0;n<gameData.placeArray.length;n++){
		for(s=0;s<gameData.plateArray.length;s++){
			if(gameData.plateArray[s].place == n){
				sum_arr.push(gameData.plateArray[s].amount);
			}
		}
	}
	
	if(sum_arr.length > 1){
		toggleGameTimer(false);
		
		var sumString = String(sum_arr[0]+'+'+sum_arr[1]+'='+(sum_arr[0]+sum_arr[1]));
		var correctAnswer = false;
		if((sum_arr[0]+sum_arr[1]) == playerData.sum){
			correctAnswer = true;	
		}
		animateHuman(correctAnswer,sumString);
	}
}

/*!
 * 
 * ANIMATE SUM - This is the function that runs to aniamte sum text
 * 
 */
var sumData = {count:0, oldCount:0, length:0};
function animateSum(string, result){
	sumTxt.x = canvasW/100 * 45;
	sumTxt.y = canvasH/100 * 61;
	
	sumData.count = 0;
	sumData.oldCount = 0;
	sumData.string = string;
	sumData.length = string.length;
			
	TweenMax.to(sumData, mathQuestionTextSpeed, {count:sumData.length, overwrite:true, ease:Linear.easeNone, onUpdate:function(){
		if(sumData.oldCount != Math.floor(sumData.count)){
			sumData.oldCount = Math.floor(sumData.count);
			playSound('soundType');
			
			sumTxt.text = sumData.string.substring(0, sumData.oldCount);
		}
	}, onComplete:function(){
		animateHuman(result,string);
	}});
}

/*!
 * 
 * SHUFFLE FOOD - This is the function that runs to shuffle food
 * 
 */
function shuffleFoodArray(){
	shuffle(gameData.foodArray);
}

function shuffleFoodAndIndexArray(array,array2) {
    var currentIndex = array.length
        , temporaryValue
        , randomIndex
        ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * array.length);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        temporaryValue = array2[currentIndex];
        array2[currentIndex] = array2[randomIndex];
        array2[randomIndex] = temporaryValue;
    }

    return array;
}

/*!
 * 
 * GAME TIMER - This is the function that runs for game timer
 * 
 */
var gameTimerUpdate = false;
var nowDate;
var beforeDate;

function toggleGameTimer(con){
	if(con){
		playerData.timer = playerData.timer;
		playerData.timerCount = gameTimer;
	
		updateTimer();
	}
	gameTimerUpdate = con;
}

function updateTimer(){
	var rotateNum = (playerData.timer/playerData.timerCount) * 360;
	timerIndicator.rotation = rotateNum;
}

 /*!
 * 
 * GAME LOOP - This is the function that runs to loop game
 * 
 */
function updateGame(event){
	if(gameTimerUpdate){
		nowDate = new Date();
		var elapsedTime = (nowDate.getTime() - beforeDate.getTime());
		playerData.timer = elapsedTime;
		
		updateTimer();
		
		if(playerData.timer >= playerData.timerCount){
			toggleGameTimer(false);
			goPage('result');
		}
	}
	
	sushiRoll.x = ((sushiRoll.x + playerData.speed) % sushiRoll.tileW)-(rollImg.width);
	
	for(p=0;p<gameData.rollArray.length;p++){
		gameData.rollArray[p].x += playerData.speed;
		if(gameData.rollArray[p].x > canvasW+endRangeNumber){
			gameData.rollArray[p].x = -(endRangeNumber);	
		}
	}
	
	for(p=0;p<gameData.plateArray.length;p++){
		if(gameData.plateArray[p].roll){
			gameData.plateArray[p].plate.x = gameData.rollArray[gameData.plateArray[p].rollID].x;
			gameData.plateArray[p].plate.y = gameData.rollArray[gameData.plateArray[p].rollID].y;
		}
		
		gameData.plateArray[p].leftover.y = gameData.plateArray[p].plate.y;
		gameData.plateArray[p].food.y = gameData.plateArray[p].plate.y;
		gameData.plateArray[p].number.y = gameData.plateArray[p].plate.y - 25; // number position graph
		
		gameData.plateArray[p].leftover.x = gameData.plateArray[p].plate.x;
		gameData.plateArray[p].food.x = gameData.plateArray[p].plate.x;
		gameData.plateArray[p].number.x = gameData.plateArray[p].plate.x + 2;
	}
}
