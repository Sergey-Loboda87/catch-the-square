var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')
var colors = ['#7CFC00', '#FF0000', '#FF1493', '#FF4500', '#00FFFF', '#FFFF00', '#191970',
'#A0522D', '#0000FF', '#FF00FF', '#FFD700', '#DC143C']

var score = 0
var isGameStarted = false



$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el){
    $el.classList.remove('hide')
}

function hide($el){
    $el.classList.add('hide')
}

function startGame() { 
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')
    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    hide ($start)

   var interval = setInterval(function(){
       var time = parseFloat($time.textContent)
       if (time<=0){
           clearInterval(interval)
           endGame()
       } else{
          $time.textContent = (time - 0.1).toFixed(1)  
       }
   }, 100) 
    renderBox()
}

function setGameResult () {
$result.textContent = score.toString()
}

function setGameTime() {
    var time = parseInt($gameTime.value)
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function handleBoxClick(event) {
    if (!isGameStarted){
        return
    }
    if (event.target.dataset.box){
        score++
        renderBox()
}
}

function endGame(){
    isGameStarted = false
    show ($start)
    $gameTime.removeAttribute('disabled')
    $game.innerHTML = ' '
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)
    setGameResult()
}

function renderBox() {
    $game.innerHTML = ''
    var box = document.createElement('div')
    var boxSize = getRabdom(30, 100)
    var gameSize = $game.getBoundingClientRect()
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize
    var rendomColorIndex = getRabdom(0, colors.length)
 
    // r = Math.floor(Math.random() * (256))
    // g = Math.floor(Math.random() * (256))
    // b = Math.floor(Math.random() * (256))
    // var color = '#' + r.toString(16) + g.toString(16) + b.toString(16)

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = colors [rendomColorIndex]
    box.style.top = getRabdom(0, maxTop) + 'px'
    box.style.left = getRabdom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

function getRabdom(min, max) {
return Math.floor(Math.random() * (max - min) + min)
}