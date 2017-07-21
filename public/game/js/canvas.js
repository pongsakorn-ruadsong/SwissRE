////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", tick);	
}

var canvasContainer, humanContainer, tableContainer, plateContainer, mainContainer, gameContainer, resultContainer;
var background, logo, buttonStart, howToPlayTxt, table, humanFaceData, humanFaceAnimate, humanLeftData, humanLeftAnimate, humanRightData, humanRightAnimate, sushiRoll, rollImg, numberBackground, numberTxt, numberAnimateTxt, timer, timerIndicator, plate, leftover, scoreTxt, sumTxt, resultScoreTxt;

$.human={};
$.food={};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	humanContainer = new createjs.Container();
	tableContainer = new createjs.Container();
	plateContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	
	background = new createjs.Bitmap(loader.getResult('background'));
	logo = new createjs.Bitmap(loader.getResult('logo'));
	
	logo.y = -170;
	buttonStart = new createjs.Text();
	buttonStart.font = "80px ostrich_sansheavy";
	buttonStart.color = "#666666";
	buttonStart.text = startButtonText;
	buttonStart.textAlign = "center";
	buttonStart.textBaseline='alphabetic';
	buttonStart.x = canvasW/2;
	buttonStart.y = canvasH/100*36;
	
	howToPlayTxt = new createjs.Text();
	howToPlayTxt.font = "30px ostrich_sansheavy";
	howToPlayTxt.color = "#666666";
	howToPlayTxt.text = howToPlayText;
	howToPlayTxt.textAlign = "center";
	howToPlayTxt.textBaseline='alphabetic';
	howToPlayTxt.x = canvasW/2;
	howToPlayTxt.y = canvasH/100*21;
	table = new createjs.Bitmap(loader.getResult('table'));
	
	for(n=1;n<=humanSequence;n++){
		$.human[n] = new createjs.Bitmap(loader.getResult('human'+n));
		centerReg($.human[n]);
		$.human[n].x = humanX;
		$.human[n].y = humanY;
		
		humanContainer.addChild($.human[n]);
	}
	
	var _frame = {"regX": 130/2, "regY": 90/2, "height": 90, "count": 30, "width": 130};
	var _animations = {static:{frames: [0], speed: 1},
						anime:{frames: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], speed: 1, next:'static'},
						fail:{frames: [21,22,23,24,25,26,27,28,29], speed: 1, next:'failStop'},
						failStop:{frames: [29], speed: 1},};

	humanFaceData = new createjs.SpriteSheet({
		"images": [loader.getResult('humanFace').src],
		"frames": _frame,
		"animations": _animations
	});
	
	humanFaceAnimate = new createjs.Sprite(humanFaceData, "static");
	humanFaceAnimate.framerate = 20;
	
	var _frame = {"regX": 51, "regY": 6, "height": 130, "count": 20, "width": 155};
	var _animations = {static:{frames: [0], speed: 1},
						anime:{frames: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], speed: 1, next:'static'}};
						
	humanLeftData = new createjs.SpriteSheet({
		"images": [loader.getResult('humanLeft').src],
		"frames": _frame,
		"animations": _animations
	});
	
	humanLeftAnimate = new createjs.Sprite(humanLeftData, "static");
	humanLeftAnimate.framerate = 20;
	
	var _frame = {"regX": 65, "regY": 9, "height": 130, "count": 20, "width": 120};
	var _animations = {static:{frames: [0], speed: 1},
						anime:{frames: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], speed: 1, next:'static'}};
						
	humanRightData = new createjs.SpriteSheet({
		"images": [loader.getResult('humanRight').src],
		"frames": _frame,
		"animations": _animations
	});
	
	humanRightAnimate = new createjs.Sprite(humanRightData, "static");
	humanRightAnimate.framerate = 20;
	
	humanFaceAnimate.x = humanX;
	humanFaceAnimate.y = humanY - 115;
	
	humanLeftAnimate.x = canvasW/100 * 40;
	humanRightAnimate.x = canvasW/100 * 60;
	humanLeftAnimate.y = humanRightAnimate.y = humanY - 60;

    numberBackground = new createjs.Text();
    numberBackground.font = "60px ostrich_sansheavy";
    numberBackground.color = "#FFFFFF";
    numberBackground.textAlign = "center";
    numberBackground.textBaseline='alphabetic';
	numberBackground.x = canvasW/2;
	numberBackground.y = canvasH/100 * 60;

	numberTxt = new createjs.Text();
	numberTxt.font = "60px ostrich_sansheavy";
	numberTxt.color = "#FFFFFF";
	numberTxt.text = '500';
	numberTxt.textAlign = "center";
	numberTxt.textBaseline='alphabetic';
	numberTxt.x = numberBackground.x;
	numberTxt.y = numberBackground.y + 20;
	
	numberAnimateTxt = new createjs.Text();
	numberAnimateTxt.font = "60px ostrich_sansheavy";
	numberAnimateTxt.color = "#FFFFFF";
	numberAnimateTxt.text = '500';
	numberAnimateTxt.textAlign = "center";
	numberAnimateTxt.textBaseline='alphabetic';
	numberAnimateTxt.x = numberBackground.x;
	numberAnimateTxt.y = numberBackground.y + 20;
	
	scoreTxt = new createjs.Text();
	scoreTxt.font = "100px ostrich_sansheavy";
	scoreTxt.color = "#666666";
	scoreTxt.text = '0';
	scoreTxt.textAlign = "center";
	scoreTxt.textBaseline='alphabetic';
	scoreTxt.x = canvasW/100 * 20;
	scoreTxt.y = canvasH/100 * 15;
	
	sumTxt = new createjs.Text();
	sumTxt.font = "60px ostrich_sansheavy";
	sumTxt.color = "#666666";
	sumTxt.text = '500';
	sumTxt.textAlign = "center";
	sumTxt.textBaseline='alphabetic';
	
	rollImg = loader.getResult("sushiRoll");
	sushiRoll = new createjs.Shape();
	sushiRoll.graphics.beginBitmapFill(rollImg).drawRect(0, 0, canvasW + (rollImg.width * 2), rollImg.height);
	sushiRoll.tileW = rollImg.width;
	sushiRoll.y = canvasH/100 * 83;
	
	timer = new createjs.Bitmap(loader.getResult('timer'));
	centerReg(timer);
	timer.x = canvasW/100 * 20;
	timer.y = canvasH/100 * 23;
	
	timerIndicator = new createjs.Bitmap(loader.getResult('timerIndicator'));
	centerReg(timerIndicator);
	timerIndicator.regY = timerIndicator.image.naturalHeight - 5;
	timerIndicator.x = timer.x;
	timerIndicator.y = timer.y;
	
	plate = new createjs.Bitmap(loader.getResult('plate'));
	centerReg(plate);
	createHitarea(plate);
	plate.regY = 86;
	plate.x -= plate.image.naturalWidth;
	
	leftover = new createjs.Bitmap(loader.getResult('leftover'));
	centerReg(leftover);
	leftover.x -= leftover.image.naturalWidth;
	
	for(n=0;n<food_arr.length;n++){
		$.food[n] = new createjs.Bitmap(loader.getResult('food'+n));
		$.food[n].regX = food_arr[n].regX;
		$.food[n].regY = food_arr[n].regY;
		$.food[n].x -= $.food[n].image.naturalWidth;
		tableContainer.addChild($.food[n]);
	}

	resultScoreTxt = new createjs.Text();
	resultScoreTxt.font = "150px ostrich_sansheavy";
	resultScoreTxt.color = "#666666";
	resultScoreTxt.text = resultScoreText;
	resultScoreTxt.textAlign = "center";
	resultScoreTxt.textBaseline='alphabetic';
	resultScoreTxt.x = canvasW/2;
	resultScoreTxt.y = canvasH/100*28;

	mainContainer.addChild(logo, buttonStart, howToPlayTxt);
	humanContainer.addChild(humanFaceAnimate, numberBackground, numberTxt, numberAnimateTxt, humanLeftAnimate, humanRightAnimate);
	tableContainer.addChild(table, sushiRoll, plate, leftover);
	gameContainer.addChild(timer, timerIndicator, sumTxt, scoreTxt);
	resultContainer.addChild(resultScoreTxt);
	canvasContainer.addChild(background, humanContainer, tableContainer, plateContainer, mainContainer, gameContainer, resultContainer);
	stage.addChild(canvasContainer);
	
	resizeCanvas();
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		canvasContainer.scaleX=canvasContainer.scaleY=scalePercent;
	}
}

function centerContainer(obj){
	obj.x = (windowW/2) - ((canvasW * scalePercent)/2);
	obj.y = (windowH/2) - ((canvasH * scalePercent)/2);
}

function resizeCanvasItem(){
	centerContainer(canvasContainer);
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame(event);
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));	
}