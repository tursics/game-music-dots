var divGame = null;
var guitarNeck = [
	// https://de.wikipedia.org/wiki/Frequenzen_der_gleichstufigen_Stimmung
	{color:'gray',   title:'c1', frequency: '261.626'},
	{color:'black',  title:'cis1', frequency: '277.183'},
	{color:'red',    title:'d1', frequency: '293.665'},
	{color:'yellow', title:'dis1', frequency: '311.127'},
	{color:'gray',   title:'e1', frequency: '329.628'},
	{color:'gray',   title:'f1', frequency: '349.228'},
	{color:'gray',   title:'fis1', frequency: '369.994'},
	{color:'gray',   title:'g1', frequency: '391.995'},
	{color:'gray',   title:'gis1', frequency: '415.305'},
	{color:'gray',   title:'a1', frequency: '440'},
	{color:'gray',   title:'b', frequency: '466.164'},
	{color:'gray',   title:'h1', frequency: '493.883'},
	{color:'gray',   title:'c2', frequency: '523.251'},
	{color:'gray',   title:'cis2', frequency: '554.365'},
	{color:'gray',   title:'d2', frequency: '587.330'},
	{color:'gray',   title:'dis2', frequency: '622.254'},
];

var audioCtx = null;
var volume = null;
var oscillators = [];
var oscillatorIds = 0;

function playNote(dataset) {
	if (null === audioCtx) {
		return;
	}

	var oscillator = audioCtx.createOscillator();
	oscillator.type = 'triangle'; // square triangle
	oscillator.frequency.value = dataset.frequency;
	oscillator.connect(volume);
	oscillator.start();

	++oscillatorIds;
	oscillators[oscillatorIds] = oscillator;
	dataset.oscillator = oscillatorIds;
}

function stopNote(dataset) {
	if (null === audioCtx) {
		return;
	}

	var id = parseInt(dataset.oscillator, 10);

	setTimeout(
		function() {
			oscillators[id].stop();
			delete oscillators[id];
	}, 100);
}

function onButtonStart() {
	if (null === audioCtx) {
		audioCtx = new(window.AudioContext || window.webkitAudioContext)();

		volume = audioCtx.createGain();
		volume.connect(audioCtx.destination);
	}
	volume.gain.value = 0.1;
}

function onTuneEnter(e) {
	playNote(e.target.dataset);
}

function onTuneLeave(e) {
	stopNote(e.target.dataset);
}

function addHeader() {
	var divHeader = document.createElement('div');
	divHeader.classList.add('header');
	divGame.appendChild(divHeader);

	guitarNeck.forEach(tone => {
		var divTone = document.createElement('div');
		divTone.classList.add('tone');
		divTone.classList.add(tone.color);
		divTone.dataset.frequency = tone.frequency;
		divHeader.appendChild(divTone);

		tone.div = divTone;

		divTone.addEventListener('mouseenter', onTuneEnter);
		divTone.addEventListener('mouseleave', onTuneLeave);
	});

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
};

