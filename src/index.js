const DIGITS = {
        ' ': [0, 0, 0, 0, 0, 0, 0],
        '0': [1, 1, 1, 0, 1, 1, 1],
        '1': [0, 0, 1, 0, 0, 1, 0],
        '2': [1, 0, 1, 1, 1, 0, 1],
        '3': [1, 0, 1, 1, 0, 1, 1],
        '4': [0, 1, 1, 1, 0, 1, 0],
        '5': [1, 1, 0, 1, 0, 1, 1],
        '6': [1, 1, 0, 1, 1, 1, 1],
        '7': [1, 0, 1, 0, 0, 1, 0],
        '8': [1, 1, 1, 1, 1, 1, 1],
        '9': [1, 1, 1, 1, 0, 1, 1]
}

const $body = document.body
const $digits = 
    Array.from(document.querySelectorAll('.digit'))
        .map($digit => Array.from($digit.querySelectorAll('.bar')))
const [$separator1, $separator2] = document.querySelectorAll('.separator')
const $menu = document.getElementById('menu')
const $hour = document.getElementById('hour')
const $min = document.getElementById('min')
const $sec = document.getElementById('sec')
const $beep = document.getElementById('beep')



let startTime, countdown


function parseOrZero(val){
    val = parseInt(val)
    return isNaN(val) ? 0 : val
}

function timeKeyDown(event){
    if((event.keyCode < 48 || event.keyCode > 57) && ![8, 9, 46].includes(event.keyCode)){
        event.preventDefault()
    }
}
function timeFocus(event){
    event.target.select()
}
function timeBlur(event){
    event.target.value = parseOrZero(event.target.value)
}

$hour.addEventListener('keydown', timeKeyDown)
$hour.addEventListener('focus', timeFocus)
$hour.addEventListener('blur', timeBlur)
$min.addEventListener('keydown', timeKeyDown)
$min.addEventListener('focus', timeFocus)
$min.addEventListener('blur', timeBlur)
$sec.addEventListener('keydown', timeKeyDown)
$sec.addEventListener('focus', timeFocus)
$sec.addEventListener('blur', timeBlur)





function digitizer(number, $digit1, $digit2){
    let [digit1, digit2] = number == 0 ? '  ' : number.toString().padStart(2, ' ')

    $digit1.forEach(($bar, index) => {
        $bar.classList.toggle('off', !DIGITS[digit1][index])
    })
    if($digit2){
        $digit2.forEach(($bar, index) => {
            $bar.classList.toggle('off', !DIGITS[digit2][index])
        })
    }
}

function refresh(){
    let subtract = Math.max(0, startTime + countdown - Date.now())
    let d = new Date(949381200000 + subtract)

    let milli = d.getMilliseconds()

    digitizer(d.getHours(), $digits[0], $digits[1])
    digitizer(d.getMinutes(), $digits[2], $digits[3])
    digitizer(d.getSeconds(), $digits[4], $digits[5])
    digitizer(milli, $digits[6], undefined)

    $separator1.classList.toggle('off', milli < 500)
    $separator2.classList.toggle('off', milli < 500)

    if(subtract == 0){
        // cheap hack
        $beep.volume = 0
    }

    window.requestAnimationFrame(refresh)
}

$menu.addEventListener('submit', event => {
    startTime = Date.now()
    countdown = ((parseOrZero($hour.value) * 60 + parseOrZero($min.value)) * 60 + parseOrZero($sec.value) + .9) * 1000
    $body.classList.add('countdown')
    refresh()
    setInterval(() => {
        $beep.play()
    }, 1000)
    $beep.controls = false
    event.preventDefault()
})