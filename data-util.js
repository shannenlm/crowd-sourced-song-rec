var fs = require('fs');

function restoreOriginalData() {
    fs.writeFileSync('songs.json', fs.readFileSync('songs-orig.json'));
}


function loadData() {
    return JSON.parse(fs.readFileSync('songs.json'));
}

function saveData(data) {
	// poke.json stores the pokemon array under key "pokemon", 
	// so we are recreating the same structure with this object
	var obj = {
		songs: data
	};

	fs.writeFileSync('songs.json', JSON.stringify(obj));
}

module.exports = {
    restoreOriginalData: restoreOriginalData,
    loadData: loadData,
    saveData: saveData,
}
