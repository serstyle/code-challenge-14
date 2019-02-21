let arr = ['🦊','🐰','🐸','🦁','🐯','🐭','🦄','🐲','🐷','🐺','🐼','🐻','🦊','🐰','🐸','🦁','🐯','🐭','🦄','🐲','🐷','🐺','🐼','🐻']

const boardGame = document.querySelector('#board_game');

const randomizeCard = dom =>{ 
	let random = Math.floor(Math.random()*(arr.length));
	dom.innerHTML = arr.splice(random, 1);
}

const length = arr.length;

for(let i = 0; i < (length); i++){ //create the card's div
	let card = document.createElement('div');
	card.className = 'flip-card';
	let card_inner = document.createElement('div');
	card_inner.className = 'flip-card-inner';
	let card_front = document.createElement('div');
	card_front.className = 'flip-card-front'
	let card_back = document.createElement('div');
	card_back.className = 'flip-card-back';
	randomizeCard(card_back);
	boardGame.appendChild(card).appendChild(card_inner);
	card_inner.appendChild(card_front);
	card_inner.appendChild(card_back);
}




const counter = document.getElementById('count');


boardGame.addEventListener('click', handleClick);


let object = {
	count: 0,
	matches: 0,
	cardArr: [],
	time: -1
}

function handleClick(e){
	let targetCard = e.target.parentElement.parentElement;
	let card1 = object.cardArr[0]
	if(e.target.classList[0] === 'flip-card-front' && object.cardArr.length < 2 && card1 !==e.target.nextSibling ){
		object.cardArr.push(e.target.nextSibling);
		targetCard.classList.add('flip-card-click')

	if(object.cardArr.length === 2){ //check if two cards are selected
		if(card1.textContent === e.target.nextSibling.textContent){ //if there is a match between 2 cards
			object.matches += 1
			if(object.matches === 3){ // FOR THE WIN FIX THE MATCHES TO 12
				document.getElementById('modal_win').classList.remove('show_off');
				document.getElementById('modal_win').classList.add('show_on');
				document.getElementById('score').innerHTML = 'SCORE: ' + (object.count + 1);
				document.getElementById('timeout').innerHTML = 'YOU FINISHED THE GAME IN ' + object.time + ' SEC.';
			}
			object.cardArr = [];
		}
		else{ //else no match turn back both cards
			setTimeout(function(){
				card1.parentElement.parentElement.classList.remove('flip-card-click');
				targetCard.classList.remove('flip-card-click');
				object.cardArr = [];
			}, 700)
			
		}
		object.count += 1 //FOR THE COUNT OF THE MOVES
		counter.textContent = object.count
		}
	}
	
};


//Retry button

let retry = document.getElementById('retry')
retry.addEventListener('click', handleRetry);

let newCard = document.getElementsByClassName('flip-card-back')

function handleRetry(e){
	document.getElementById('modal_win').classList.add('show_off') //if win turn off the modal
	document.getElementById('modal_win').classList.remove('show_on')
	object.count = 0; //score to 0 
	object.time = -1; //time to 0
	counter.textContent = object.count;
	while(document.getElementsByClassName('flip-card-click')[0]){
		document.getElementsByClassName('flip-card-click')[0].classList.remove('flip-card-click')} //turn the cards
	object.matches = 0;
	object.cardArr = []
	arr = ['🦊','🐰','🐸','🦁','🐯','🐭','🦄','🐲','🐷','🐺','🐼','🐻','🦊','🐰','🐸','🦁','🐯','🐭','🦄','🐲','🐷','🐺','🐼','🐻']
	setTimeout(function(){for(let i = 0; i < 24; i++){
		randomizeCard(newCard[i])
	}}, 700 ) //RANDOM THE EMOJI'S PLACE
}


//Play again button

let play_again = document.getElementById('play_again');
play_again.addEventListener('click', handleRetry )

//TIME 

function time() {
object.time += 1
if(object.time < 10){	
	document.getElementById('time').textContent = '00'+object.time;
}
else if(object.time < 100){
	document.getElementById('time').textContent = '0'+object.time;
}
else{
	document.getElementById('time').textContent = object.time;
}
setTimeout('time()',1000);
}

time()