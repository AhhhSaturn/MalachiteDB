const fs = require('fs-extra');
const path = require('path');

exports.Database = function Database(location, databaseName) {
	this.location = location;
	this.databaseName = databaseName;
	const filePath = path.join(path.dirname(require.main.filename), location,'/', databaseName +'.json');
	try {
		file = require(filePath);
	} catch (err) {
		if (String(err).search('Unexpected end of JSON input') !== -1) {
			fs.writeFileSync(filePath, '{}');
			file = require(filePath);
		} else if (String(err.code).search('Error: Cannot find module')) throw new Error(`Cound not find ${databaseName}.json, is it in ${filePath}`);
	}
	this.read = (index, arrIndex) => {
		if (index === undefined) return file;
		if (file[index] === undefined) throw new Error(`Could not find index '${index}' in ${databaseName} database`);
		if (arrIndex !== undefined) return file[index][arrIndex];
		return file[index];
	};
	this.write = (index, value) => {
		file[index] = value;
		fs.writeFileSync(filePath, JSON.stringify(file));
	};
	this.remove = (index, arrIndex) => {
		if (file[index] === undefined) throw new Error(`Could not find index '${index}' in ${databaseName} database`);
		if (typeof arrIndex !== 'undefined') {
			let indexLocation = file[index].findIndex((element) => element == arrIndex);
			console.log(file[index]);
			if (indexLocation == -1) throw new Error(`Could not find ${arrIndex} in index '${index}' in ${databaseName} database`);
			file[index].splice(indexLocation, 1);
			console.log(file[index]);
			fs.writeFileSync(filePath, JSON.stringify(file));
		} else {
			delete file[index];
			fs.writeFileSync(filePath, JSON.stringify(file));
		}
	};
};