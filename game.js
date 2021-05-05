let buttonColors = ['red', 'blue', 'green', 'yellow'];

let userClickedPattern = [];
let gamePattern = [];

let started = false;
let level = 0;

$(window).on('keydown', function () {
	if (!started) {
		$('#level-title').text(`Level ${level}`);
		nextSequence();
		started = true;
	}
});

$('.btn').on('click', function (e) {
	let userChosenColor = this.id;
	userClickedPattern.push(userChosenColor);

	playSound(userChosenColor);
	animatePress(userChosenColor);

	checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log('success');
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(() => {
				nextSequence();
			}, 1000);
		}
	} else {
		console.log('wrong');
		playSound('wrong');
		$('body').addClass('game-over');
		setTimeout(() => {
			$('body').removeClass('game-over');
		}, 200);
		$('#level-title').text('Game Over, Press Any Key to Restart');
		startOver();
	}
}

function nextSequence() {
	userClickedPattern = [];

	level++;
	$('#level-title').text('Level ' + level);

	const randomNumber = Math.floor(Math.random() * 4);

	const randomChosenColor = buttonColors[randomNumber];

	gamePattern.push(randomChosenColor);

	$(`#${randomChosenColor}`).fadeIn(500).fadeOut(500).fadeIn(500);

	playSound(randomChosenColor);
}

function playSound(name) {
	const audio = new Audio(`/sounds/${name}.mp3`);
	audio.play();
}

function animatePress(currentColor) {
	$(`#${currentColor}`).addClass('pressed');
	setTimeout(() => {
		$(`#${currentColor}`).removeClass('pressed');
	}, 100);
}

function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}
