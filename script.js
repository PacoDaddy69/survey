$(document).ready(function() {
	
	var fbRef = new Firebase("https://burning-inferno-220.firebaseio.com/");

	$('#height-form').submit(function(e)	{
		
		e.preventDefault();
		
		var feet = parseInt($('#feet').val());
		var inches = parseInt($('#inches').val());
		var happiness = parseInt($('#happiness').val());
		
		var answer = {
			
			feet: feet,
			inches: inches,
			happiness: happiness
			
		};

		fbRef.child('answers').push(answer);
		
	});
	
	var submissions = 0;
	
	var totalHappiness = 0;
	
	var totalHeight = 0;
	
	var conversion = 0;
	
	fbRef.child('answers').on('child_added', function(snap)	{
		
		var answer = snap.val();
		
		totalHappiness = totalHappiness + answer.happiness;
		
		conversion = answer.feet * 12;
		
		totalHeight = conversion + answer.inches;

		submissions = submissions + 1;
		
		var avgHappiness = totalHappiness / submissions;
		
		var avgHeight = totalHeight / submissions;
		
		$('#submissions').text(submissions);
		
		$('#avgHappiness').text(avgHappiness);
		
		$('#avgHeight').text(avgHeight);
		
	});

});

