let arr = ['1','1','2','2','3','3','4','4','5','5','6','6','7','7','8','8','9','9','10','10','11','11','12','12']

const boardGame = document.querySelector('#board_game');
const counter = document.getElementById('count');


// let card = document.createElement('div');
// card.className = 'flip-card';
// let card_inner = document.createElement('div');
// card_inner.className = 'flip-card-inner';
// let card_front = document.createElement('div');
// card_front.className = 'flip-card-front'



for(let i = 0; i < 24; i++){
	let card = document.createElement('div');
	card.className = 'flip-card';
	let card_inner = document.createElement('div');
	card_inner.className = 'flip-card-inner';
	let card_front = document.createElement('div');
	card_front.className = 'flip-card-front'
	let card_back = document.createElement('div');
	card_back.className = 'flip-card-back';
	let random = Math.floor(Math.random()*(arr.length));
	card_back.innerHTML = arr.splice(random, 1);
	boardGame.appendChild(card).appendChild(card_inner);
	card_inner.appendChild(card_front);
	card_inner.appendChild(card_back);
}




boardGame.addEventListener('click', handleClick);


let object = {
	count: 0,
	matches: 0,
	cardArr: []
}

function handleClick(e){
	let targetCard = e.target.parentElement.parentElement;
	let card1 = object.cardArr[0]
	if(e.target.classList[0] === 'flip-card-front' && object.cardArr.length < 2 && card1 !==e.target.nextSibling ){
		object.cardArr.push(e.target.nextSibling);
		targetCard.classList.add('flip-card-click')

	if(object.cardArr.length === 2){
		let test = card1.textContent - e.target.nextSibling.textContent;
		if(test === 0){
			object.matches += 1
			if(object.matches === 1){
				document.getElementById('modal_win').classList.remove('show_off')
				document.getElementById('modal_win').classList.add('show_on')
			}
			object.cardArr = [];
		}
		else{
			setTimeout(function(){
				card1.parentElement.parentElement.classList.remove('flip-card-click');
				targetCard.classList.remove('flip-card-click');
				object.cardArr = [];
			}, 700)
			
		}
		object.count += 1
		counter.textContent = object.count
		}
	}
	
};


//Retry button

let retry = document.getElementById('retry')
retry.addEventListener('click', handleRetry);

let newCard = document.getElementsByClassName('flip-card-back')

function handleRetry(e){
	document.getElementById('modal_win').classList.remove('show_on')
	document.getElementById('modal_win').classList.add('show_off')
	object.count = 0;
	counter.textContent = object.count;
	while(document.getElementsByClassName('flip-card-click')[0]){
		document.getElementsByClassName('flip-card-click')[0].classList.remove('flip-card-click')}
	object.matches = 0;
	object.cardArr = []
	arr = ['1','1','2','2','3','3','4','4','5','5','6','6','7','7','8','8','9','9','10','10','11','11','12','12']
	setTimeout(function(){for(let i = 0; i < 24; i++){
		let random = Math.floor(Math.random()*(arr.length));
		newCard[i].innerHTML = arr.splice(random, 1);
	}}, 700 )
}


//Play again button

let play_again = document.getElementById('play_again');
play_again.addEventListener('click', handleRetry )