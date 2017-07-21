////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		resizeGameFunc();
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[{src:'assets/background.jpg', id:'background'},
			{src:'assets/logo.png', id:'logo'},
			{src:'assets/human_face_Spritesheet6x5.png', id:'humanFace'},
			{src:'assets/human_left_Spritesheet5x4.png', id:'humanLeft'},
			{src:'assets/human_right_Spritesheet5x4.png', id:'humanRight'},
			{src:'assets/table.png', id:'table'},
			{src:'assets/roll.png', id:'sushiRoll'},
			{src:'assets/numberBackground.png', id:'numberBackground'},
			{src:'assets/timer.png', id:'timer'},
			{src:'assets/timerIndicator.png', id:'timerIndicator'},
			{src:'assets/plate.png', id:'plate'},
			{src:'assets/leftover.png', id:'leftover'}];
			
	for(n=1;n<=humanSequence;n++){
		manifest.push({src:'assets/human00'+formatNumber(n,2)+'.png', id:'human'+n})
	}
	
	for(n=0;n<food_arr.length;n++){
		manifest.push({src:food_arr[n].src, id:'food'+n})
	}
	
	soundOn = true;		
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'assets/sounds/music.ogg', id:'music'})
		manifest.push({src:'assets/sounds/click.ogg', id:'soundClick'})
		manifest.push({src:'assets/sounds/fail.ogg', id:'soundFail'})
		//manifest.push({src:'assets/sounds/eat.ogg', id:'soundEat'})
		manifest.push({src:'assets/sounds/plate1.ogg', id:'soundPlate1'})
		manifest.push({src:'assets/sounds/plate2.ogg', id:'soundPlate2'})
		manifest.push({src:'assets/sounds/reset.ogg', id:'soundReset'})
		manifest.push({src:'assets/sounds/score.ogg', id:'soundScore'})
		manifest.push({src:'assets/sounds/type.ogg', id:'soundType'})
		manifest.push({src:'assets/sounds/result.ogg', id:'soundResult'})
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader').html(Math.round(loader.progress/1*100)+'%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}