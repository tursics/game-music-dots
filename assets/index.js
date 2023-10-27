var divGame = null;
var guitarColor = ['gray','black','red','yellow','gray','gray','gray','gray','gray','gray','gray','gray','gray','gray','gray','gray'];

function onButtonStart() {
	sound.reset();
	sound.setVolume(.25);
}

function onTuneEnter(e) {
	sound.playNote(e.target.dataset);
}

function onTuneLeave(e) {
	sound.stopNote(e.target.dataset);
}

function addHeader() {
	var divHeader = document.createElement('div');
	divHeader.classList.add('header');
	divGame.appendChild(divHeader);

	var index = 0;
	sound.getGuitarNeck().forEach(tone => {
		var divTone = document.createElement('div');
		divTone.classList.add('tone');
		divTone.classList.add(guitarColor[index]);
		divTone.dataset.frequency = tone.frequency;
		divHeader.appendChild(divTone);

		tone.div = divTone;

		divTone.addEventListener('mouseenter', onTuneEnter);
		divTone.addEventListener('mouseleave', onTuneLeave);

		++index;
	});
}

function addStartButton() {
	var buttonStart = document.createElement('button');
	buttonStart.classList.add('start');
	buttonStart.innerHTML = 'Start';
	divGame.appendChild(buttonStart);

	buttonStart.addEventListener('click', onButtonStart);
}

window.onload = function()
{
	divGame = document.getElementById('game');

	addHeader();
	addStartButton();
};

