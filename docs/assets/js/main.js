"use strict";const searchInput=document.querySelector(".js-search-input"),searchButton=document.querySelector(".js-search-button"),resetButton=document.querySelector(".js-reset-button"),resetFavButton=document.querySelector(".js-fav-reset-button"),favListHTML=document.querySelector(".js-favorite-list"),resultList=document.querySelector(".js-result-list"),serverURL="https://api.jikan.moe/v4/anime?q=",formSearch=document.querySelector(".search"),errorMessage=document.querySelector(".js-message"),serverInvalidImage="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png",placeholderImage="https://via.placeholder.com/225x350/3D3D3D/666666/?text=No+image+:(";let animeResultList=[];const animeFavList=[];function setFavoritesInLS(){localStorage.setItem("favorites",JSON.stringify(animeFavList))}function handleFavList(e){const t=parseInt(e.currentTarget.id),n=animeResultList.find(e=>e.mal_id===t),r=animeFavList.findIndex(e=>e.mal_id===t);-1===r?animeFavList.push(n):animeFavList.splice(r,1)}function handleCardClick(e){handleFavList(e),renderCard(animeResultList,resultList),renderCard(animeFavList,favListHTML),setFavoritesInLS()}function listenCard(){const e=document.querySelectorAll(".js-anime-card");for(const t of e)t.addEventListener("click",handleCardClick)}function getFromServer(e){return fetch(serverURL+e).then(e=>e.json()).then(e=>{animeResultList=e.data}).catch(e=>{console.error(e)})}function renderFavoritesFromLS(){const e=JSON.parse(localStorage.getItem("favorites"));if(e){for(const t of e)animeFavList.push(t);renderCard(animeFavList,favListHTML)}}function renderCard(e,t){emptyElement(t);for(const n of e){let e=n.title,r=n.images.jpg.image_url,a=n.mal_id,s="";s=-1!==animeFavList.findIndex(e=>e.mal_id===a)?"fav":"",r===serverInvalidImage&&(r=placeholderImage),t.innerHTML+=`<li class="js-anime-card card ${s}" id="${a}">\n      <img class="card-image" alt"Imagen de ${e}" title="Imagen de ${e}" src="${r}"/>\n      <h3 class="card-title">${e}</h3>\n    </li>`,listenCard()}}function handleButton(e){e.preventDefault();const t=searchInput.value;let n=serverURL+t;""===searchInput.value?errorMessage.innerHTML="Introduce una serie para poder buscar":getFromServer(n).then(()=>{renderCard(animeResultList,resultList)})}function handleReset(e){e.preventDefault(),searchInput.value="",emptyElement(resultList),emptyElement(errorMessage)}function emptyElement(e){e.innerHTML=""}function handleFavReset(e){e.preventDefault();const t=document.querySelectorAll(".fav");for(const e of t)e.classList.remove("fav");animeFavList.length=0,emptyElement(favListHTML),setFavoritesInLS(),renderCard(animeFavList,favListHTML)}renderFavoritesFromLS(),resetButton.addEventListener("click",handleReset),formSearch.addEventListener("click",e=>e.preventDefault),searchInput.addEventListener("click",e=>e.preventDefault),searchButton.addEventListener("click",handleButton),resetFavButton.addEventListener("click",handleFavReset);