export const BASE_URL = 'https://restcountries.com/v3.1/name/';
export const fetchCountries = url => {
  return fetch(
    `${BASE_URL}/${url}?fileds=name,capital,population,flags,languages`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw Notiflix.Notify.failure('Oops, there is no country with that name');
  });
};