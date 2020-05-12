var birdsMain = ["Australasian Shoveler",
"Bellbird",
"Black Swan",
"Blackbird",
"Blue Duck",
"Brown Kiwi sp",
"Brown Teal",
"California Quail",
"Canada Goose",
"Chaffinch",
"Common Pheasant",
"Coot",
"Dunnock",
"Eastern Rosella",
"Fantail",
"Fernbird",
"Goldfinch",
"Greenfinch",
"Grey Teal",
"Grey Warbler",
"Hihi",
"Indian Myna",
"Kaka",
"Kea",
"Kokako",
"Long-tailed Cuckoo",
"Magpie",
"Mallard",
"Morepork",
"New Zealand Falcon",
"New Zealand Pipit",
"New Zealand Scaup",
"Paradise Shelduck",
"Redpoll",
"Rifleman",
"Robin",
"Sacred Kingfisher",
"Saddleback",
"Shining Cuckoo",
"Silvereye",
"Skylark",
"Song Thrush",
"Spotless Crake",
"Starling",
"Tomtit",
"Tui",
"Weka",
"Whitehead",
"Yellow-crowned Parakeet",
"Yellowhammer"];
var birds = birdsMain.slice();

var audio = document.getElementById('audio');
var randomItem = null;
var guessCount = 0;
function setUp() {
	randomize();
	autocomplete(document.getElementById("answer"), birdsMain);
}

function hideAnswer() {
	document.getElementById("imageContainer").style.display = "none";
}

function showAnswer() {
	guessCount = 0;
	document.getElementById("imageContainer").style.display = "block";
}

function setUpAnswer() {
	var pic = document.getElementById("birdImage");
	pic.src = "img/" + randomItem + ".jpg";
	var title = document.getElementById("birdTitle").innerHTML = randomItem;
}

function randomize() {
	if(birds.length === 0) {
		alert("You have listened to all of the birds you nerd, I have reset the bird list for you.");
		birds = birdsMain.slice();
	}
	document.getElementById("correctAnswer").innerHTML = "";
	randomItem = birds.splice(Math.floor(Math.random() * birds.length), 1)[0];
	document.getElementById("audio").setAttribute('src', 'sounds/' + randomItem + '.mp3');
	setUpAnswer();
	hideAnswer();
}

function checkAnswer() {
	var answer = document.getElementById("answer").value;
	var correct = document.getElementById("correctAnswer");
	guessCount += 1;
	if(answer === randomItem){
		correct.innerHTML = "CORRECT (Times guessed: "+guessCount+")";
		correct.style.color = "#32CD32";
	} else {
		correct.innerHTML = "INCORRECT (Times guessed: "+guessCount+")";
		correct.style.color = "#DC143C";
	}
}

function autocomplete(inp, arr) {
	/*the autocomplete function takes two arguments,
	the text field element and an array of possible autocompleted values:*/
	var currentFocus;
	/*execute a function when someone writes in the text field:*/
	inp.addEventListener("input", function(e) {
			var a, b, i, val = this.value;
			/*close any already open lists of autocompleted values*/
			closeAllLists();
			if (!val) { return false;}
			currentFocus = -1;
			/*create a DIV element that will contain the birds (values):*/
			a = document.createElement("DIV");
			a.setAttribute("id", this.id + "autocomplete-list");
			a.setAttribute("class", "autocomplete-birds");
			/*append the DIV element as a child of the autocomplete container:*/
			this.parentNode.appendChild(a);
			/*for each item in the array...*/
			for (i = 0; i < arr.length; i++) {
				/*check if the item starts with the same letters as the text field value:*/
				if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
					/*create a DIV element for each matching element:*/
					b = document.createElement("DIV");
					/*make the matching letters bold:*/
					b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
					b.innerHTML += arr[i].substr(val.length);
					/*insert a input field that will hold the current array item's value:*/
					b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
					/*execute a function when someone clicks on the item value (DIV element):*/
							b.addEventListener("click", function(e) {
							/*insert the value for the autocomplete text field:*/
							inp.value = this.getElementsByTagName("input")[0].value;
							/*close the list of autocompleted values,
							(or any other open lists of autocompleted values:*/
							closeAllLists();
					});
					a.appendChild(b);
				}
			}
	});
	/*execute a function presses a key on the keyboard:*/
	inp.addEventListener("keydown", function(e) {
			var x = document.getElementById(this.id + "autocomplete-list");
			if (x) x = x.getElementsByTagName("div");
			if (e.keyCode == 40) {
				/*If the arrow DOWN key is pressed,
				increase the currentFocus variable:*/
				currentFocus++;
				/*and and make the current item more visible:*/
				addActive(x);
			} else if (e.keyCode == 38) { //up
				/*If the arrow UP key is pressed,
				decrease the currentFocus variable:*/
				currentFocus--;
				/*and and make the current item more visible:*/
				addActive(x);
			} else if (e.keyCode == 13) {
				/*If the ENTER key is pressed, prevent the form from being submitted,*/
				e.preventDefault();
				if (currentFocus > -1) {
					/*and simulate a click on the "active" item:*/
					if (x) x[currentFocus].click();
				}
			}
	});
	function addActive(x) {
		/*a function to classify an item as "active":*/
		if (!x) return false;
		/*start by removing the "active" class on all birds:*/
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = (x.length - 1);
		/*add class "autocomplete-active":*/
		x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x) {
		/*a function to remove the "active" class from all autocomplete birds:*/
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove("autocomplete-active");
		}
	}
	function closeAllLists(elmnt) {
		/*close all autocomplete lists in the document,
		except the one passed as an argument:*/
		var x = document.getElementsByClassName("autocomplete-birds");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
			x[i].parentNode.removeChild(x[i]);
		}
	}
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
		closeAllLists(e.target);
});
}
