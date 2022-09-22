import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './api/fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchInput = document.getElementById('search-box');
const countryInfo = document.querySelector(".country-info");
const countryList = document.querySelector(".country-list");

searchInput.addEventListener('input', debounce(getCountryData, DEBOUNCE_DELAY));

function getCountryData(e) {
  const countryName = e.target.value.trim();
  cleanMarkup(countryList);
  cleanMarkup(countryInfo);
  if (!countryName) {
    return;
  }
fetchCountries(countryName)
    .then(data => {
      if (data.length === 1) {
        markupCountry(data[0]);
      } else if (data.length >= 2 && data.length <= 10) {
        markupCountries(data);
      } else if(data.length > 10){
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );}
        console.log('first', data.length)
    })
    .catch(err => {
      alert(err);
    });
  }

    function markupCountry(countryData) {
      console.log(countryData);
      const {flags, capital, population, name, languages} = countryData;
      const lang = Object.values(languages).join(', ');

        
      return countryInfo.insertAdjacentHTML("beforeend", 
      `<img src=${flags.svg} width = "50"/>
      <span class=spantitle>${name.official}</span>
      <p><span class=spantext>Capital:</span> ${capital}</p>
      <p><span class=spantext>Population:</span> ${population}</p>
      <p><span class=spantext>Languages:</span> ${lang}</p>
      `)
    }
    

    function markupCountries(countryData){
    
    countryData.map(country => {
      const {flags, name} = country;
      return countryList.insertAdjacentHTML("beforeend", 
      `<li class=list><img src=${flags.svg} width = "30"/>
      <spantext>${name.official}</span></li>`)
    })
    }


function cleanMarkup(element) {
  element.innerHTML = '';
}
    


