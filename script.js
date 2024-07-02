const user_url = document.querySelector('input');
const imgArea = document.querySelector('#imgArea');
const file = document.querySelector('.file');
const btn = document.querySelector('button');

let id,
	isImage = false;
user_url.oninput = thumbnailGenerator;

function thumbnailGenerator() {
	if (user_url.value.indexOf('https://www.youtube.com/watch') != -1) {
		imgArea.src = `https://img.youtube.com/vi/${user_url.value
			.split('v=')[1]
			.substring(0, 11)}/sddefault.jpg`;
		imgArea.classList.add('show');
		imgArea.classList.remove('hide');
		file.classList.add('hide');
		file.classList.remove('show');
		isImage = true;
	} else if (
		user_url.value.indexOf('https://youtu.be/') != -1 ||
		user_url.value.indexOf('http://y2u.be/') != -1
	) {
		imgArea.src = `https://img.youtube.com/vi/${
			user_url.value.split('.be/')[1]
		}/sddefault.jpg`;
		imgArea.classList.add('show');
		imgArea.classList.remove('hide');
		isImage = true;
		file.classList.add('hide');
		file.classList.remove('show');
	} else if (user_url.value.match(/.(jpe?g|png|webp|gif)$/i)) {
		imgArea.src = user_url.value;
		imgArea.classList.add('show');
		isImage = true;
		imgArea.classList.remove('hide');
		file.classList.add('hide');
		file.classList.remove('show');
	} else {
		imgArea.src = ' ';
		imgArea.classList.remove('show');
		imgArea.classList.add('hide');
		file.classList.remove('hide');
		file.classList.add('show');
		isImage = false;
	}
}

imgArea.onerror = () => {
	imgArea.classList.remove('show');
	isImage = false;
	imgArea.classList.add('hide');
	file.classList.remove('hide');
	file.classList.add('show');
};

btn.onclick = () => {
	fetch(`https://cors-anywhere.herokuapp.com/${imgArea.src}`)
		.then((e) => {
			return e.blob();
		})
		.then((e) => {
			const href = URL.createObjectURL(e);
			const link = document.createElement('a');
			link.href = href;
			link.download = `image`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		})
		.catch((err) => {
			console.log(err);
		});
};
