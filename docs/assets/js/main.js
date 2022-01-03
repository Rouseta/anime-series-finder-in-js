"use strict";let input=document.querySelector(".js-input");const searchForm=document.querySelector(".form_search");let searchResultList=document.querySelector(".searchresults");const favouriteSelector=document.querySelectorAll(".results"),favouriteListOfAnimes=document.querySelector(".searchresults__favourites"),resetButton=document.querySelector(".js-btn-reset"),alternativeImage="https://via.placeholder.com/210x295/ffffff/666666/?text=TV";let userInput="",animeSeriesArray=[],favouriteSeriesArray=[];function fetchDataAnime(e){e.preventDefault(),searchResultList.innerHTML="",fetch("https://api.jikan.moe/v3/search/anime?q="+input.value).then(e=>e.json()).then(e=>{if(animeSeriesArray=e.results,0===animeSeriesArray.length)searchResultList.innerHTML+='<p class="paragraph">No existe este título. Prueba con otro</p>';else for(let e=0;e<animeSeriesArray.length;e++){const t=animeSeriesArray[e];searchResultList.innerHTML+=`\n                        <article class="results" data-id="${t.mal_id}">\n                            <h3 data-title="${t.title} class="searchresults__title--js" >\n                                ${t.title}\n                            </h3>\n                            <img class="image" src="${t.image_url||alternativeImage}"/>\n                            \n                          \n                        </article>\n                    `;const r=document.querySelectorAll(".results");for(const e of r)e.addEventListener("click",globalFunction)}})}function changeColorFavourite(e){e.currentTarget.classList.toggle("favourite")}function handleFavourites(e){const t=parseInt(e.currentTarget.dataset.id);let r=favouriteSeriesArray.findIndex(e=>e.mal_id===t);if(r>=0)favouriteSeriesArray.splice(r,1);else{const e=animeSeriesArray.find(e=>e.mal_id===t);favouriteSeriesArray.push(e)}localStorage.setItem("favourites",JSON.stringify(favouriteSeriesArray))}function renderFavourites(){favouriteListOfAnimes.innerHTML="";for(let e=0;e<favouriteSeriesArray.length;e++)favouriteListOfAnimes.innerHTML+=`\n        <article class="results">\n            <h3 class= "searchresults__title">${favouriteSeriesArray[e].title}</h3>\n            <img class="image" src="${favouriteSeriesArray[e].image_url}"/>\n        </article> \n        <div>\n            <button class="testing"data-id="${favouriteSeriesArray[e].mal_id}">X</button>\n        </div>\n        `;const e=document.querySelectorAll(".testing");for(const t of e)t.addEventListener("click",resetOne)}function deleteFavourites(){for(let e=0;e<favouriteSeriesArray;e++)favouriteSeriesArray[e].contains("favourite")&&favouriteSeriesArray[e].classList.remove("favourite")}function getStorageData(){const e=JSON.parse(localStorage.getItem("favourites"));null!==e&&(favouriteSeriesArray=e),renderFavourites()}function resetAll(){localStorage.removeItem("favourites"),favouriteSeriesArray=[],renderFavourites()}function resetOne(e){const t=parseInt(e.currentTarget.dataset.id);let r=favouriteSeriesArray.findIndex(e=>e.mal_id===t);r>=0&&favouriteSeriesArray.splice(r),localStorage.setItem("favourites",JSON.stringify(favouriteSeriesArray)),renderFavourites()}function globalFunction(e){handleFavourites(e),changeColorFavourite(e),renderFavourites(),deleteFavourites()}searchForm.addEventListener("submit",fetchDataAnime),resetButton.addEventListener("click",resetAll),getStorageData();