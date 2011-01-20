$(function() {
	$('.peep').live('click', function() {
		$(this).toggleClass('selected')
		
		return false
	})
	
	// $('#peeps').append('<li class=""><a href="#" class="xPair" id="2"><h2>Matt</h2></a></li>')
});