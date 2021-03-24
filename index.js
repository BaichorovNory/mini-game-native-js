let $start = document.querySelector('#start')
let $game = document.querySelector('#game')
let $time = document.querySelector('#time')
let $result = document.querySelector('#result')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $gameTime = document.querySelector('#game-time')
let score = 0

let isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function startGame() {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')
    isGameStarted = true
    hide($resultHeader)
    show($timeHeader)

    var interval = setInterval(() => {
        var countdown = parseFloat($time.textContent)
        if (countdown <= 0) {
            clearInterval()
            endGame()
        } else {
            $time.textContent = (countdown - 0.1).toFixed(1)
        }
    }, 100)

    hide($start)
    $game.style.backgroundColor = 'white'

    renderRandomBox()
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    let time = parseInt($gameTime.value)
    $time.textContent = time.toFixed(1)
}

function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    $game.innerHTML = ''
    show($start)
    $game.style.backgroundColor = '#ccc'
    show($resultHeader)
    hide($timeHeader)
}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return
    }
    if (event.target.dataset.box) {
        score++
        renderRandomBox()
    }
}

function renderRandomBox() {

    $game.innerHTML = ''

    var box = document.createElement('div')
    var boxSize = getRandomBox(30, 100)
    var boxAreaSize = $game.getBoundingClientRect()
    var maxTop = boxAreaSize.height - boxSize
    var maxLeft = boxAreaSize.width - boxSize


    box.style.width = box.style.height = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = getRandomColor()
    box.style.top = getRandomBox(0, maxTop) + 'px'
    box.style.left = getRandomBox(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandomBox(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function getRandomColor() {
    var red = Math.floor(Math.random() * (256)),
        green = Math.floor(Math.random() * (256)),
        blue = Math.floor(Math.random() * (256))
    return '#' + red.toString(16) + green.toString(16) + blue.toString(16)
}