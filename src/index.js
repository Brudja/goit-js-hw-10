import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './api/fetchCountries';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const searchInput = document.getElementById('search-box');

searchInput.addEventListener('input', debounce(getCountryData, DEBOUNCE_DELAY));

function getCountryData(e) {
  const countryName = e.target.value;
}

fetchCountries('peru')
  .then(data => console.log(data))
  .catch(err => {
    alert(err);
  });
