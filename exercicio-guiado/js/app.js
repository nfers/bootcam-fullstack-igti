let tabCountries = null;
let tabFavorites = null;

let allCountries = [];

let favoriteCountries = []

let countCountries = 0;
let countFavorites = 0;
let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load', () => {

 tabCountries = document.querySelector('#tabCountries');
 tabFavorites = document.querySelector('#tabFavorites');

 countCountries = document.querySelector('#countCountries');
 countFavorites = document.querySelector('#countFavorites');

 totalPopulationList = document.querySelector('#totalPopulation');
 totalPopulationFavorites = document.querySelector('#totalPopulationFavorites');

 numberFormat = Intl.NumberFormat('pt-BR');


 showCountries()



});





async function showCountries() {
 let url = 'https://restcountries.eu/rest/v2/all'

 const res = await fetch(url)
 const json = await res.json()

 allCountries = json.map(country => {
  const { numericCode, population, translations, flag } = country;

  return {
   id: numericCode,
   name: translations.pt,
   population,
   flag
  }
 });

 favoriteCountries = allCountries

 render()
};

function render() {

 renderCountryList()
 renderFavorites()
 enderSummary()
 renderCountryButtons()
}

function renderCountryList() {

 let contriesHtml = '<div class="countries">'

 allCountries.forEach(country => {
  const { name, flag, id, population } = country;


  const countryHTML = `
  
   <div class='country'>
    <div>
     <a id="${id}" class="waves-effect waves-light btn">+</a>
    </div>
    <div>
     <img src="${flag}" alt="${name}"/>
    </div>
    <div>
     <ul>
      <li>
      ${name}
      </li>
      <li>
      ${population}
      </li>
     </ul>
    </div>
   </div>
  
  `;

  contriesHtml += countryHTML
 });

 contriesHtml.innerHTML += '</div>'
 tabCountries.innerHTML = contriesHtml
}

function renderFavorites() {

 let favoritesHTML = '<div>'

 favoriteCountries.forEach(country => {
  const { name, flag, id, population } = country;


  const favoriteCountryHTML = `
  
   <div class='favorite'>
    <div>
     <a id="${id}" class="waves-effect waves-light btn red darken-5">+</a>
    </div>
    <div>
     <img src="${flag}" alt="${name}"/>
    </div>
    <div>
     <ul>
      <li>
      ${name}
      </li>
      <li>
      ${population}
      </li>
     </ul>
    </div>
   </div>
  
  `;

  favoritesHTML += favoriteCountryHTML
 });

 favoritesHTML += '</div>'
 tabFavorites.innerHTML = favoritesHTML
}

function renderSummary() {

}

function renderCountryButtons() {

}