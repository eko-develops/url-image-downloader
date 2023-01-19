const fs = require('fs');
const path = require('path');
const axios = require('axios');

function getData() {
	const data = fs.readFileSync(
		path.join(__dirname, 'data', 'urls.txt'),
		'utf8'
	);

	return data.split('\r\n');
}

async function downloadToLocal(response, url) {
	const fileName = url.split('/');

	const downloadPath = path.join(
		__dirname,
		'downloads',
		fileName[fileName.length - 1]
	);

	const writeStream = await response.data.pipe(
		fs.createWriteStream(downloadPath)
	);

	writeStream.on('finish', () => {
		console.log('Successfully downloaded file', url);
	});

	writeStream.on('error', (err) => {
		console.log('Error download file', url);
	});
}

async function downloadImage(url) {
	try {
		const response = await axios({
			url: url,
			method: 'get',
			responseType: 'stream',
		});
		await downloadToLocal(response, url);
	} catch (e) {
		console.log('error occured', e.message);
	}
}

module.exports = { getData, downloadToLocal, downloadImage };
