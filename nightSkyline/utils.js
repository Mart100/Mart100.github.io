function randomRange(min, max) {
	return Math.round(min+(Math.random()*(max-min)))
}

async function sleep(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve()
		}, ms)
	})
}

function colorToString(color) {
	return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
}

function gaussianRand(factor=5) {
  var rand = 0;

  for (var i = 0; i < factor; i += 1) {
    rand += Math.random();
  }

  return rand / factor;
}

function gaussianRange(start, end, factor) {
  return Math.floor(start + gaussianRand(factor) * (end - start + 1));
}

function randn_bm(min, max, skew) {
	let u = 0, v = 0;
	while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
	while(v === 0) v = Math.random();
	let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

	num = num / 10.0 + 0.5; // Translate to 0 -> 1
	if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
	num = Math.pow(num, skew); // Skew
	num *= max - min; // Stretch to fill range
	num += min; // offset to min
	return num;
}