'use strict';

// script qui sera automatiquement execute au demarrage du serveur
// avec en parametre l'objet serveur
module.exports = function(server) {
	// on recupere les modeles et le datasource mysql
	const models = Object.keys(server.models).concat([
			'BatimentContrainte',
			'CouloirContrainte',
			'EtageContrainte',
			'ChambreContrainte',
			'EtageCouloir',

		]);
	const mysqlDs = server.dataSources.mysql;

	// console.log(models);
	// verifier si le schema de la base correspond aux modeles
	mysqlDs.isActual(models, (err, actual) => {
		// en cas d'erreur
		if (err) {
			console.error('Error checking if database schema is actual', err);
		} else if (!actual) {
			// si le schema diverge du modele
			mysqlDs.autoupdate(models, (err, result) => {
				if (err) {
					// si erreur
					console.error('Error updating database schema', err);
				} else {
					// si c'est bon
					console.log('Database schema updated successfully');
				}
			})
		} else {
			// si la base est a jour
			console.log('Database schema is up to date!');
		}
	});
};
//loopback-swagger/lib/specgen/swagger-spec-generator.js