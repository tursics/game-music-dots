var sound = (function () {

	var guitarNeck = [
		// https://de.wikipedia.org/wiki/Frequenzen_der_gleichstufigen_Stimmung
		{name:'C4',  frequency: '261.626'},
//		{name:'C#4', frequency: '277.183'},
		{name:'D4',  frequency: '293.665'},
//		{name:'D#4', frequency: '311.127'},
		{name:'E4',  frequency: '329.628'},
		{name:'F4',  frequency: '349.228'},
//		{name:'F#4', frequency: '369.994'},
		{name:'G4',  frequency: '391.995'},
//		{name:'G#4', frequency: '415.305'},
		{name:'A4',  frequency: '440'},
//		{name:'A#4', frequency: '466.164'},
		{name:'B4',  frequency: '493.883'},
		{name:'C5',  frequency: '523.251'},
//		{name:'C#5', frequency: '554.365'},
		{name:'D5',  frequency: '587.330'},
		{name:'D#5', frequency: '622.254'},
		{name:'E5',  frequency: '659.255'},
		{name:'F5',  frequency: '698.456'},
//		{name:'F#5', frequency: '739.989'},
		{name:'G5',  frequency: '783.991'},
//		{name:'G#5', frequency: '830.609'},
		{name:'A5',  frequency: '880'},
//		{name:'A#5', frequency: '932.328'},
		{name:'B5',  frequency: '987.767'},
		{name:'C6',  frequency: '1046.50'},
	];

	var score = [
		{name: 'E5',  duration: 4},
		{name: 'E5',  duration: 4},
		{name: 'E5',  duration: 4},
		{name: 'C5',  duration: 8},
		{name: '',    duration: 16},
		{name: 'G5',  duration: 16},
		{name: 'E5',  duration: 4},
		{name: 'C5',  duration: 8},
		{name: '',    duration: 16},
		{name: 'G5',  duration: 16},
		{name: 'E5',  duration: 4},
		{name: '',    duration: 4},
		{name: 'B5',  duration: 4},
		{name: 'B5',  duration: 4},
		{name: 'B5',  duration: 4},
		{name: 'C6',  duration: 8},
		{name: '',    duration: 16},
		{name: 'G5',  duration: 16},
		{name: 'D#5', duration: 4},
		{name: 'C5',  duration: 8},
		{name: '',    duration: 16},
		{name: 'G5',  duration: 16},
		{name: 'E5',  duration: 4},
	];

	var audioCtx = null;
	var volume = null;
	var oscillators = [];
	var oscillatorIds = 0;

	function funcGetGuitarNeck() {
		return guitarNeck;
	}

	function funcGetMelody() {
		return score;
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
		getMelody: funcGetMelody,
		playNote: funcPlayNote,
		reset: funcReset,
		setVolume: funcSetVolume,
		stopNote: funcStopNote,
	};
}());