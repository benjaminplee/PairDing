var danceCard = {
	pairs: [ [ { id: 1, name: 'Andrew'}, { id: 2, name: 'Bob'} ],
	 				 [ { id: 3, name: 'Chris'}, { id: 3, name: 'Dave'} ],
					 [ { id: 5, name: 'Eric'}, { id: 6, name: 'Frank'} ] ],
	singles: [ { id: 7, name: 'Greg'}, { id: 8, name: 'Harry'} ],
	out: [ { id: 9, name: 'Ian'}, { id: 10, name: 'Jack'} ]
}

$(function() {
	
	var firstPeep = undefined;
	$('.peep').live('click', function() {
		var clickedPeep = $(this);
		
		if(firstPeep) {
			// break existing relationships

			danceCard.pairs = [ [ diet(firstPeep), diet(clickedPeep) ] ]

			displayPeeps(danceCard)

			firstPeep = undefined;
		}
		else {
			clickedPeep.toggleClass('selected')
			firstPeep = clickedPeep;
		}
				
		return false
	})
		
	$('h1').click(function() {
		displayPeeps(danceCard)
	})
	
	function diet(fatElement) {
		return { id: firstPeep.id, name: fatElement.children().first().html() }
	}
	
	var peepsContainer = $('#peeps')
	
	function clearContainer() {
		peepsContainer.html('')
	}
	
	function insertPair() {
		peepsContainer.append('<li class="pair"><a href="#" class="peep left" id="' + this[0].id + '"><h2>' + this[0].name + '</h2></a></li>')
		peepsContainer.append('<li class="pair"><a href="#" class="peep right" id="' + this[1].id + '"><h2>' + this[1].name + '</h2></a></li>')		
	}
	
	function insertSingle() {
		peepsContainer.append('<li><a href="#" class="peep" id="' + this.id + '"><h2>' + this.name + '</h2></a></li>')
	}
	
	function insertOut() {
		peepsContainer.append('<li class="no-story"><a href="#" class="peep" id="' + this.id + '"><h2>' + this.name + '</h2></a></li>')
	}
	
	function displayPeeps(peeps) {
		clearContainer()
		$.each(peeps.pairs, insertPair)
		$.each(peeps.singles, insertSingle)
		$.each(peeps.out, insertOut)
	}
});
