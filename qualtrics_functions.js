var berkeleyLogo;
var nextButton;

function qualtricsHideInterface(){
	berkeleyLogo = document.getElementById("LogoContainer");
	berkeleyLogo.style.display = "none";
	nextButton = document.getElementById("Buttons");
	nextButton.style.display = "none";
}

function qualtricsShowInterface(){
	nextButton.style.display = "block";
	
}

function getRandomizer(){
	randomOption = "${e://Field/randomOption}";	
}