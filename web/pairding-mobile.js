var danceCard = undefined
var firstPeep = undefined;

function fillDanceCard() {
	danceCard = {
		pairs: [ [ { id: 1, name: 'Andrew'}, { id: 2, name: 'Bob'} ],
		 				 [ { id: 3, name: 'Chris'}, { id: 4, name: 'Dave'} ],
						 [ { id: 5, name: 'Eric'}, { id: 6, name: 'Frank'} ] ],
		singles: [ { id: 7, name: 'Greg'}, { id: 8, name: 'Harry'} ],
		out: [ { id: 9, name: 'Ian'}, { id: 10, name: 'Jack'} ]
	}
	firstPeep = undefined
}

function breakOldPair(pair, newGuy) {
	if(pair[0].id === uno.id) {
		danceCard.singles.push(pair[0])
		return null;
	}
	
	else if(pair[1].id === uno.id) {
		danceCard.singles.push(pair[1])
	}
}

function updateDanceCard(uno, dos) {
	danceCard.singles = $.map(danceCard.singles, function(single) {
		if(single.id === uno.id || single.id === dos.id) {
			return null;
		}
		
		return single;
	})
	
	var alreadyAPair = false;
	
	danceCard.pairs = $.map(danceCard.pairs, function(pair) {
		if( (pair[0].id === uno.id && pair[1].id === dos.id) || 
		    (pair[0].id === dos.id && pair[1].id === uno.id) ) {
			danceCard.singles.push(uno)
			danceCard.singles.push(dos)
			alreadyAPair = true;
			return null;
		}
		
		if(pair[0].id === uno.id || pair[0].id == dos.id) {
			danceCard.singles.push(pair[1])
			return null;
		}

		if(pair[1].id === uno.id || pair[1].id == dos.id) {
			danceCard.singles.push(pair[0])
			return null;
		}
		
		return [ pair ]; // double array to get around .map auto-flatten
	})

	if(!alreadyAPair && uno.id != dos.id) {
		danceCard.pairs.push([ uno, dos ]) 
	}
	
	var wasAnOuter = false
	
	danceCard.out = $.map(danceCard.out, function(outer) {
		if(outer.id == uno.id || outer.id == dos.id) {
			if(uno.id == dos.id) {
				wasAnOuter = true;
				danceCard.singles.push(uno)
			}
			
			return null;
		}
		else {
			return outer;
		}
	})
	
	if(!wasAnOuter && uno.id == dos.id) {
		danceCard.out.push(uno)
	}
}

$(function() {
	
	$('.peep').live('click', function() {
		var clickedPeep = $(this);
		
		if(firstPeep) {
			updateDanceCard(diet(firstPeep), diet(clickedPeep));

			displayPeeps()

			firstPeep = undefined;
		}
		else {
			clickedPeep.toggleClass('selected')
			firstPeep = clickedPeep;
		}
				
		return false
	})
		
	$('#addPeep').click(function() {
		fillDanceCard()
		displayPeeps()
	})
	
	function diet(fatElement) {
		return { id: parseInt(fatElement.attr('id')), name: fatElement.children().first().html() }
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
	
	function displayPeeps() {
		clearContainer()
		$.each(danceCard.pairs, insertPair)
		$.each(danceCard.singles, insertSingle)
		$.each(danceCard.out, insertOut)
	}
});
