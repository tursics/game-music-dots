var divGame = null;
var guitarColor = ['gray','black','red','yellow','gray'];
var melodyPosition = 0;
var noteStorageMax = 100;
var noteStorage = [];
var transitionDelay = 100;
var transitionDuration = 5000;

function dropNote(note) {
	if (note.name === '') {
		return;
	}
	var neckNote = document.querySelector('[data-name="' + note.name + '"]');
	var storageNote = null;

	for (var n = 0; n < noteStorageMax; ++n) {
		var noteCurrent = noteStorage[n];
		if (noteCurrent.classList.contains('hidden')) {
			storageNote = noteCurrent;
			break;
		}
	}

	if (storageNote) {
		storageNote.dataset.frequency = neckNote.dataset.frequency;
		storageNote.classList = neckNote.classList;
		storageNote.classList.add('d' + note.duration);

		window.setTimeout(function() {
			storageNote.style.transitionDuration = transitionDuration + 'ms';
			storageNote.classList.add('falldown');
		}, transitionDelay);
/*		window.setTimeout(function() {
			storageNote.dataset.frequency = 0;
			storageNote.className = '';
			storageNote.classList.add('hidden');
		}, transitionDuration + 1000);*/
	} else {
		console.log('too many notes');
	}
}

function melodyFinished() {
	console.log('finish');
}

function showNextNote() {
	var melody = sound.getMelody();

	if (melodyPosition < melody.length) {
		var note = melody[melodyPosition];
		dropNote(note);

		++melodyPosition;

		window.setTimeout(function() {
			showNextNote();
		}, (1000 / note.duration) + 100);
	} else {
		melodyFinished();
	}
}

function onButtonStart() {
	sound.reset();
	sound.setVolume(.25);

	melodyPosition = 0;

	showNextNote();
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
		divTone.classList.add('n' + index);
		divTone.classList.add(guitarColor[index] || 'gray');
		divTone.dataset.frequency = tone.frequency;
		divTone.dataset.name = tone.name;
		divHeader.appendChild(divTone);

		tone.div = divTone;

		++index;
	});
}

function addGuitar() {
	var divGuitar = document.createElement('div');
	divGuitar.classList.add('guitar');
	divGame.appendChild(divGuitar);

	for (var index = 0; index < noteStorageMax; ++index) {
		var divTone = document.createElement('div');
		divTone.classList.add('tone');
		divTone.classList.add('hidden');
		divTone.addEventListener('mouseenter', onTuneEnter);
		divTone.addEventListener('mouseleave', onTuneLeave);

		divGuitar.appendChild(divTone);
		noteStorage.push(divTone);
	}
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
	addGuitar();
	addStartButton();
};

