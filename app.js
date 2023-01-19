const { getData, downloadImage } = require('./scripts.js');

async function main() {
	const data = getData();

	for (const url of data) {
		await downloadImage(url);
	}
}

main();
