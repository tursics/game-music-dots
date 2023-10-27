var sound = (function () {

	var guitarNeck = [
		// https://de.wikipedia.org/wiki/Frequenzen_der_gleichstufigen_Stimmung
		{title:'C4',  frequency: '261.626'},
//		{title:'C#4', frequency: '277.183'},
		{title:'D4',  frequency: '293.665'},
//		{title:'D#4', frequency: '311.127'},
		{title:'E4',  frequency: '329.628'},
		{title:'F4',  frequency: '349.228'},
//		{title:'F#4', frequency: '369.994'},
		{title:'G4',  frequency: '391.995'},
//		{title:'G#4', frequency: '415.305'},
		{title:'A4',  frequency: '440'},
//		{title:'A#4', frequency: '466.164'},
		{title:'B4',  frequency: '493.883'},
		{title:'C5',  frequency: '523.251'},
//		{title:'C#5', frequency: '554.365'},
		{title:'D5',  frequency: '587.330'},
		{title:'D#5', frequency: '622.254'},
		{title:'E5',  frequency: '659.255'},
		{title:'F5',  frequency: '698.456'},
//		{title:'F#5', frequency: '739.989'},
		{title:'G5',  frequency: '783.991'},
//		{title:'G#5', frequency: '830.609'},
		{title:'A5',  frequency: '880'},
//		{title:'A#5', frequency: '932.328'},
		{title:'B5',  frequency: '987.767'},
		{title:'C6',  frequency: '1046.50'},
	];

	var score = [
		['E5', 4],
		['E5', 4],
		['E5', 4],
		['C5', 8],
		[0, 16],
		['G5', 16],
		['E5', 4],
		['C5', 8],
		[0, 16],
		['G5', 16],
		['E5', 4],
		[0, 4],
		['B5', 4],
		['B5', 4],
		['B5', 4],
		['C6', 8],
		[0, 16],
		['G5', 16],
		['D#5', 4],
		['C5', 8],
		[0, 16],
		['G5', 16],
		['E5', 4]
	];

	var audioCtx = null;
	var volume = null;
	var oscillators = [];
	var oscillatorIds = 0;

	function funcGetGuitarNeck() {
		return guitarNeck;
	}

	function funcPlayNote(dataset) {
		if (null === audioCtx) {
			return;
		}

		var oscillator = audioCtx.createOscillator();
		oscillator.type = 'triangle'; // square, triangle
		oscillator.frequency.value = dataset.frequency;
		oscillator.connect(volume);
		oscillator.start();

		++oscillatorIds;
		oscillators[oscillatorIds] = oscillator;
		dataset.oscillator = oscillatorIds;
	}

	function funcStopNote(dataset) {
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

	function funcReset() {
		if (null === audioCtx) {
			audioCtx = new(window.AudioContext || window.webkitAudioContext)();

			volume = audioCtx.createGain();
			volume.connect(audioCtx.destination);
		}
	}

	function funcSetVolume(value) {
		volume.gain.value = value;
	}

	return {
		getGuitarNeck: funcGetGuitarNeck,
		playNote: funcPlayNote,
		reset: funcReset,
		setVolume: funcSetVolume,
		stopNote: funcStopNote,
	};
}());