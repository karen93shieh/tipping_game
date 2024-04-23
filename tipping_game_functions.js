/**
				Code from https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js
				This allows setting a random seed 
			*/
			!function(f,a,c){var s,l=256,p="random",d=c.pow(l,6),g=c.pow(2,52),y=2*g,h=l-1;function n(n,t,r){function e(){for(var n=u.g(6),t=d,r=0;n<g;)n=(n+r)*l,t*=l,r=u.g(1);for(;y<=n;)n/=2,t/=2,r>>>=1;return(n+r)/t}var o=[],i=j(function n(t,r){var e,o=[],i=typeof t;if(r&&"object"==i)for(e in t)try{o.push(n(t[e],r-1))}catch(n){}return o.length?o:"string"==i?t:t+"\0"}((t=1==t?{entropy:!0}:t||{}).entropy?[n,S(a)]:null==n?function(){try{var n;return s&&(n=s.randomBytes)?n=n(l):(n=new Uint8Array(l),(f.crypto||f.msCrypto).getRandomValues(n)),S(n)}catch(n){var t=f.navigator,r=t&&t.plugins;return[+new Date,f,r,f.screen,S(a)]}}():n,3),o),u=new m(o);return e.int32=function(){return 0|u.g(4)},e.quick=function(){return u.g(4)/4294967296},e.double=e,j(S(u.S),a),(t.pass||r||function(n,t,r,e){return e&&(e.S&&v(e,u),n.state=function(){return v(u,{})}),r?(c[p]=n,t):n})(e,i,"global"in t?t.global:this==c,t.state)}function m(n){var t,r=n.length,u=this,e=0,o=u.i=u.j=0,i=u.S=[];for(r||(n=[r++]);e<l;)i[e]=e++;for(e=0;e<l;e++)i[e]=i[o=h&o+n[e%r]+(t=i[e])],i[o]=t;(u.g=function(n){for(var t,r=0,e=u.i,o=u.j,i=u.S;n--;)t=i[e=h&e+1],r=r*l+i[h&(i[e]=i[o=h&o+t])+(i[o]=t)];return u.i=e,u.j=o,r})(l)}function v(n,t){return t.i=n.i,t.j=n.j,t.S=n.S.slice(),t}function j(n,t){for(var r,e=n+"",o=0;o<e.length;)t[h&o]=h&(r^=19*t[h&o])+e.charCodeAt(o++);return S(t)}function S(n){return String.fromCharCode.apply(0,n)}if(j(c.random(),a),"object"==typeof module&&module.exports){module.exports=n;try{s=require("crypto")}catch(n){}}else"function"==typeof define&&define.amd?define(function(){return n}):c["seed"+p]=n}("undefined"!=typeof self?self:this,[],Math);
			
			/**
				init(): initializes the webpage.
				input: none
				output: none
			*/
			function init(){
			
				Math.seedrandom(seed);
				//Get all the wrapper 
				mainPagesWrapper = document.getElementById("mainPagesWrapper");
				checkOutWrapper = document.getElementById("checkOutWrapper");
				tipPageWrapper = document.getElementById("tipPageWrapper");
				waitingWrapper = document.getElementById("waitingWrapper");
				var downloadBut = document.getElementById("downloadBut");
				var custodian = document.getElementById("custodian");
				
				//initialize all the sliders 
				var slider = document.getElementsByClassName("slider");
				for(var i=0; i<slider.length; i++){
					sliderLstId.push(slider[i].id);
				}
				var displayVal = document.getElementsByClassName("sliderVal");
				for(var i=0; i<displayVal.length; i++){
					displayValLstId.push(displayVal[i].id)
				}
				
				var needVal = document.getElementsByClassName("targetVal");
				for(var i=0; i<needVal.length; i++){
					needValLstId.push(needVal[i].id)
				}
				
				var tipButs = document.getElementsByClassName("tipButton");
				var totalCost = document.getElementById("totalCost");
				var noneTipButton = document.getElementById('per_0_but');
				
				//initialize all the people in line condition and the tip 
				if (json_data !=0){
					peopleInSelf = json_data['peopleInLine'][loop][0];
					peopleInReg = json_data['peopleInLine'][loop][1];
					document.getElementById("numPeopleSelf").innerHTML = peopleInSelf;
					document.getElementById("numPeopleRegister").innerHTML = peopleInReg;
					
					var cost = json_data['totalPrice'][loop].toFixed(2);
					totalCost.innerHTML = cost;

					for (var i=0; i<3; i++){
						var tip = json_data['tips'][i]
						tipButs[i].value = tip +"  $"+ (parseFloat(tip)*parseFloat(cost)/100).toFixed(2);
					}
					if(!json_data['noneTipButton']){
						noneTipButton.style.display="none";
					}
				}
				
				
				//set the wrappers to invisible for irrelavant 
				checkOutWrapper.style.display="none";
				tipPageWrapper.style.display="none";
				waitingWrapper.style.display="none";
				downloadBut.style.display="none";
				custodian.style.display="none";

			}
			/**
				resetStatus(): reset the slider values and the display values of the items. pre-update the cost and tip amount 
				input: none
				output: none
			*/
			function resetStatus(){
				var slider = document.getElementsByClassName("slider");
				for(var i=0; i<slider.length; i++){
					slider[i].value = 0;
				}
				
				var displayVal = document.getElementsByClassName("sliderVal");
				for(var i=0; i<displayVal.length; i++){
					displayVal[i].innerHTML = '0';
				}
				
				var buttons = document.getElementsByClassName("addMinusButton");
				for(var i=0; i<buttons.length; i++){
					buttons[i].disabled=false;
				}
				
				if(json_data!=0 && loop<json_data["loops"]){
					var totalCost = document.getElementById("totalCost");
					totalCost.innerHTML = json_data['totalPrice'][loop].toFixed(2);
				}
				var custodian = document.getElementById("custodian");
				custodian.style.display="none";
			}
			/**
				autoCheckout(): animation of the checkout process when checkout type is register 
				input: none
				output: none
			*/
			function autoCheckcout(){
				var buttons = document.getElementsByClassName("addMinusButton");
				for(var i=0; i<buttons.length; i++){
					buttons[i].disabled=true;
				}
				
				var custodian = document.getElementById("custodian");
				var custodianName = document.getElementById("custodianName");
				custodian.style.display="block";
				custodianName.innerHTML=listOfNames[Math.floor(Math.random() * (listOfNames.length - 0 + 1) + 0)];
				
				var time = 1000;
				for (var i=0; i<sliderLstId.length; i++) {
					document.getElementById(sliderLstId[i]).value = 0;
					document.getElementById(displayValLstId[i]).innerHTML = '0';
					for(var j=0; j<=targetValLst[i]; j++){
						
						var timer = setTimeout(helperCheckout, time, i, j);
						time +=500;
					}
				}
			}
			/**
				helperCheckout(): helper function for animation of the checkout process when checkout type is register 
				input: none
				output: none
			*/
			function helperCheckout(i, j){
				document.getElementById(sliderLstId[i]).value = j;
				document.getElementById(displayValLstId[i]).innerHTML = j;
				document.getElementById(needValLstId[i]).innerHTML = targetValLst[i]-j;
			}
		
			/**
				activateCheckout(): start the master timer and checkout conditions such as number of people in life.  
				input: checkoutType, 0 if self-checkout, 1 if register 
				output: none
			*/
			function activateCheckout(checkoutType){
				//decision = 0 if self-checkout
				decision = checkoutType;
				
				if(decision==0){
					peopleInLine = peopleInSelf;
				}else{
					peopleInLine = peopleInReg;
				}
				
				
				masterTimeStart = performance.now();
				mainPagesWrapper.style.display="none"
				if(peopleInLine<=0){
					setRandomTarget();
					checkOutWrapper.style.display="block"
					if(decision == 1){
						autoCheckcout();
					}
				}else{
					waitingWrapper.style.display="block";
					setWaitingTimer();
				}
				
			}
			
			/**
				setRandomTarget(): set random number of items to be scanned by user. If a json file exist, read from the json file
				input: none
				output: none
			*/
			function setRandomTarget(){
				var targetText = document.getElementsByClassName('targetVal');
				var maxTarget = 10;
				var minTarget = 0;
				targetValLst=[];
				for(var i=0; i< targetText.length; i++){
					if (json_data!=0){
						var val = json_data["itemQuantity"][loop][i];
					}else{
						var val = Math.floor(Math.random() * (maxTarget - minTarget + 1) + minTarget);

					}
					targetText[i].innerHTML = val;
					targetValDic[targetText[i].id] = val;
					targetValLst.push(val);
					itemQuantity.push(val);
				}
			}
			
			
			//function extractSliderValue(slider, displayValId, targetValId){
			//	displaySpan = document.getElementById(displayValId);
			//	targetSpan = document.getElementById(targetValId);
			//	displaySpan.innerHTML = slider.value;
			//	
			//	targetSpan.innerHTML = targetValDic[targetValId] - slider.value;
			//}
			function updateTarget(updateValue, sliderId, displayValId, targetValId){
				var displaySpan = document.getElementById(displayValId);
				var targetSpan = document.getElementById(targetValId);
				var slider = document.getElementById(sliderId);
				var newValue = parseInt(slider.value) + parseInt(updateValue)
				if (newValue<0){
					return;
				}
				slider.value = newValue;
				displaySpan.innerHTML = slider.value;
				targetSpan.innerHTML = targetValDic[targetValId] - slider.value;
			}	
			
			function setWaitingTimer(){
				var numPeopleTxt = document.getElementById("waitingForNumPpl");
				numPeopleTxt.innerHTML=peopleInLine;
				
				var maxWaitTime = 3000;
				var minWaitTime = 1000;
				
				var totalWaitTime = 0;
				for(var i=peopleInLine; i>0; i--){
					var randomWaitPerPerson = Math.random() * (maxWaitTime - minWaitTime + 1) + minWaitTime;
					console.log(randomWaitPerPerson/1000);
					totalWaitTime+=randomWaitPerPerson;
					var timer = setTimeout(updateWait, totalWaitTime, numPeopleTxt);
				}
				timeInLine = totalWaitTime/1000;
			}
			
			function updateWait(numPeopleTxt){
				peopleInLine-=1;
				if(peopleInLine<=0){
					setRandomTarget();
					checkOutWrapper.style.display="block";
					waitingWrapper.style.display="none";
					if(decision ==1){
						autoCheckcout();
					}
				}else{
					numPeopleTxt.innerHTML=peopleInLine;

				}
			}
			
			
			function activateTipPage(){
				var customizeWrapper = document.getElementById('customizeWrapper');
				var targetText = document.getElementsByClassName('targetVal');
				var correct = true;
				for(var i=0; i< targetText.length; i++){
					targetVal = targetText[i].innerHTML 
					if (targetVal!=0){
						confirm("Please scan the correct number of items!");
						correct = false;
					}
				}
				if(correct){
					checkOutWrapper.style.display="none";
					tipPageWrapper.style.display="block";
					customizeWrapper.style.display = "none";
					tipTimeStart = performance.now();
				}
				
			}
			
			function showCustomTip(){
				var customizeWrapper = document.getElementById('customizeWrapper');
				var warningText = document.getElementById('customTipWarning');
				var tipToPercent = document.getElementById('tipToPercent');
				var customizeTipAmount = document.getElementById('customizeTipAmount');
				warningText.style.display="none";
				tipToPercent.innerHTML ="(0%)";
				customizeTipAmount.value='';
				customizeWrapper.style.display="block";
				

			}
			
			function customTipValueChange(value){
				var warningText = document.getElementById('customTipWarning');
				var tipToPercent = document.getElementById('tipToPercent');
				
				if (json_data != 0){
					var cost = json_data['totalPrice'][loop]

					if (isNaN(value)){
						warningText.style.display="block";
						tipToPercent.innerHTML ="(0%)";
					}else{
						warningText.style.display="none";
						var parcentage =Math.round((value/cost)*100);
						tipToPercent.innerHTML = "("+parcentage+"%)";
					}
				}else{
					if (isNaN(value)){
						warningText.style.display="block";
					}else{
						warningText.style.display="none";
					}
				}
				
			}
			
			function checkNull(tipValue, butID){
				var warningText = document.getElementById('customTipWarning');
				if (tipValue == null || tipValue ==''){
					warningText.style.display="block";
				}else{
					warningText.style.display="none";
					collectTimeStamp(butID);
					saveData(document.getElementById('customizeTipAmount').value);
					returnHomePage();
				}
			}
			
			
			function collectTimeStamp(elemId){
				timeStamp.push([elemId, Date.now()]);
			}
			
			function returnHomePage(){
				mainPagesWrapper.style.display = "block";
				checkOutWrapper.style.display="none";
				tipPageWrapper.style.display="none";
				loop+=1;
				
				
				resetStatus();
				
				var maxPeople = 10;
				var minPeople = 0;
				if (json_data !=0){
					if (loop>=json_data['loops']){
						var downloadBut = document.getElementById("downloadBut");
						var selfCheckoutBut = document.getElementById("selfCheckoutBut");
						var registerBut = document.getElementById("registerBut");
						
						downloadBut.style.display="block";
						selfCheckoutBut.disabled = true;
						registerBut.disabled = true;
					}
				}
				if (json_data ==0){
					peopleInSelf = Math.floor(Math.random() * (maxPeople - minPeople + 1) + minPeople);
					peopleInReg = Math.floor(Math.random() * (maxPeople - minPeople + 1) + minPeople);

				}else if(loop<json_data['loops']){
					peopleInSelf = json_data['peopleInLine'][loop][0];
					peopleInReg = json_data['peopleInLine'][loop][1];
				}
				
				if(loop%5==0){
					seed = Math.seedrandom(seed)
				}
				document.getElementById("numPeopleSelf").innerHTML = peopleInSelf;
				document.getElementById("numPeopleRegister").innerHTML = peopleInReg;
				//Determine when to enable the download button
				var downloadBut = document.getElementById("downloadBut");
				downloadBut.style.display="block";
			}
			
			function saveData(tipPer){
				masterTimeEnd = performance.now();
				tipTimeEnd = performance.now();
				masterTimePassed = (masterTimeEnd - masterTimeStart)/1000;
				tipTimePassed = (tipTimeEnd - tipTimeStart)/1000;
				dataCollectionLst.push({"decision":decision, "peopleInLine":[peopleInSelf, peopleInReg], 
								"timeInLine": timeInLine, "itemQuantity":itemQuantity, "timeElipse":masterTimePassed, 
								"tipInfo":[tipTimePassed, tipPer], "timeStamp":timeStamp});				console.log(dataCollectionLst);
			}
			
			//https://www.jameslmilner.com/posts/downloading-a-file-with-javascript/
			function downloadData(){
				const data_json = JSON.stringify(dataCollectionLst);
				var dataCollection = "${e://Field/dataCollection}";
				Qualtrics.SurveyEngine.setEmbeddedData( 'dataCollection', data_json);
				var dataCollection = "${e://Field/dataCollection}";
				//const data = JSON.stringify(dataCollectionLst);
				//
				//const blob = new Blob([data], { type: "application/json" });
				//const jsonObjectUrl = URL.createObjectURL(blob);
				//
				//const filename = "tipping_game_data.json";
				//const anchorEl = document.createElement("a");
				//anchorEl.href = jsonObjectUrl;
				//anchorEl.download = filename;
				//
				//anchorEl.click();
				//
				//URL.revokeObjectURL(jsonObjectUrl);
			}
			
			