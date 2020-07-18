const red = document.querySelector('#red')
const green = document.querySelector('#green')
const blue = document.querySelector('#blue')


const inputRed = document.querySelector('#inputRed')
const inputGreen = document.querySelector('#inputGreen')
const inputBlue = document.querySelector('#inputBlue')

inputRed.value = red.value;
inputGreen.value = green.value;
inputBlue.value = blue.value;

inputRed.setAttribute('disabled', 'disabled')
inputGreen.setAttribute('disabled', 'disabled')
inputBlue.setAttribute('disabled', 'disabled')



const resultColor = document.querySelector('#resultColor')

red.addEventListener('change', event => {
 inputRed.value = event.target.value
 changeColor()
})

blue.addEventListener('change', event => {
 inputBlue.value = event.target.value
 changeColor()
})


green.addEventListener('change', event => {
 inputGreen.value = event.target.value
 changeColor()
})


const changeColor = () => {
 resultColor.style.backgroundColor =
  `rgb(${inputRed.value},${inputGreen.value},${inputBlue.value})`
}

function hangeColor() {

};