const nameInput = document.querySelector('select');
const allowedNames = [ "mirelda", "morram", "nadon", "puck" ];

nameInput.onSubmit = function() {
	const playerName = sanitizeInput( nameInput.value ); 
	submitToApp( playerName );
};

/**
 * Remove all spaces and set all characters to lowercase.
 * 
 * @params {string} input The text input.
 * 
 * @returns {string} The sanitized text input.
 */
function sanitizeInput( input ) {
	// Could include more sanitizaton (remove special characters, urls etc.)
	// but this should be enough for what we need.
	let playerName = input.replace( " ", "" );
	return playerName.toLowerCase();
}

/**
 * Submits the url to the sererside app.
 * 
 * @params {string} playerName The name of the player.
 * 
 * @returns {null|XMLHttpRequest} Returns either null on incorrect input or the server request.
 */
function submitToApp( playerName ) {
	if ( ! allowedNames.includes( playerName ) ) {
		// @todo Send back an error message that the name is not recognized. 
		return;
	}
	const url = "/player/:" + playerName;
	
	let request = new XMLHttpRequest();
	request.open( "GET", url );
}
