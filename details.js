let searchParameters = window.location.search;
let urlparameters = new URLSearchParams(searchParameters);

async function getCharacterDetails()
{
    let characterDataFetch = await fetch(`https://gateway.marvel.com/v1/public/characters/${urlparameters.get('id')}?ts=1&apikey=d90c7e04c11ec3229ebe39101239d714&hash=492a3b15ad66b54574dc96121573d1ab`)
    let characterDataJSON = await characterDataFetch.json();         
    let characterData   =  characterDataJSON.data;


    let comicDataFetch = await fetch(`https://gateway.marvel.com/v1/public/characters/${urlparameters.get('id')}/comics?ts=1&apikey=d90c7e04c11ec3229ebe39101239d714&hash=492a3b15ad66b54574dc96121573d1ab`)
    let comicDataJSON = await comicDataFetch.json();
    let comicData =  comicDataJSON.data;


    

    let eventsDataFetch = await fetch(`https://gateway.marvel.com/v1/public/characters/${urlparameters.get('id')}/events?ts=1&apikey=d90c7e04c11ec3229ebe39101239d714&hash=492a3b15ad66b54574dc96121573d1ab`)
    let eventsDataJSON = await eventsDataFetch.json();
    let eventsData = eventsDataJSON.data;
  

  

    let seriesDataFetch = await fetch(`https://gateway.marvel.com/v1/public/characters/${urlparameters.get('id')}/series?ts=1&apikey=d90c7e04c11ec3229ebe39101239d714&hash=492a3b15ad66b54574dc96121573d1ab`)                
    let seriesDataJSON = await seriesDataFetch.json();
    let seriesData =  seriesDataJSON.data;


    let storiesDataFetch = await fetch(`https://gateway.marvel.com/v1/public/characters/${urlparameters.get('id')}/stories?ts=1&apikey=d90c7e04c11ec3229ebe39101239d714&hash=492a3b15ad66b54574dc96121573d1ab`)
    let storiesDataJSON = await storiesDataFetch.json();
    let storiesData =  storiesDataJSON.data;
 

    
    return {
        'characterData' : characterData,
        'comicData': comicData,
        'eventsData':eventsData,
        'seriesData':seriesData,
        'storiesData':storiesData
    }

}

function displayFavouriteButton(obj)
{
    let displayFavouriteButton = true;
    let localStorageData = JSON.parse(localStorage.getItem('favourite_character'));
    localStorageData.forEach((item) => {
        if(item.id == obj.id){
            displayFavouriteButton = false;
        }
    });

    if(!displayFavouriteButton)
    {
        document.getElementById('add_favourites').style.display = "none";
    }
}


function fillHTML(data)
{
    let ImagePath = `${data.characterData.results[0].thumbnail.path}/portrait_fantastic.${data.characterData.results[0].thumbnail.extension}`

    
    let charObj = {
        id : data.characterData.results[0].id,
        name:data.characterData.results[0].name,
        path: ImagePath
    }

    document.getElementById('bodyContainer').innerHTML =
    `<div class="content">
    <button id="customButton" class="btn btn-success custom-button"><a href="./favourites.html" style="color: white;">Favourites</a></button>
    <div class="hero-image">
      <img id="img" alt="Hero Image">
        &nbsp;
        <button type="button" id="add_favourites" data-charObj = '${JSON.stringify(charObj)}' onClick=addToFavourites(this) class="btn btn-primary">Add to Favourites</button>
    </div>
    <div class="info">
      <h2 id="hero_name">Name: </h2>
      <h3>Description</h3><span id="hero_bio"></span>
      <h4>Comics:</h4>
      <ul id="comics_list">
      </ul>
      <h4>Stories:</h4>
      <ul id="stories_list">
      </ul>
      <h4>Series:</h4>
      <ul id="series_list">
      </ul>
      <h4>Events:</h4>
      <ul id="events_list">
      </ul>
    </div>
  </div>`;


    if(JSON.parse(localStorage.getItem('favourite_character')))
    {
        displayFavouriteButton(charObj);
    }
    let characterName = data.characterData.results[0].name;
    document.getElementById('hero_name').innerHTML = `<h2>Name : ${characterName}</h2>`
    if(!data.characterData.results[0].description || data.characterData.results[0].description == '')
    {
        document.getElementById('hero_bio').innerText = `No description available on MARVEL API for ${characterName}`
    }
    else
    {
        document.getElementById('hero_bio').innerHTML = data.characterData.results[0].description;
    }

    
    document.getElementById('img').src = ImagePath;

    let comicHTML = '';

    if(data.comicData.results.length == 0)
    {
        comicHTML = `<li>No Comics available for ${characterName}</li>`;
    }
    else if(data.comicData.results.length > 3)
    {
        for(let i = data.comicData.results.length - 3 ; i < data.comicData.results.length ; i++)
        {   
            let comic = data.comicData.results[i];
            comicHTML += `<li>${comic.title}</li>`
        }
    }
    else
    {
        for(let i = 0 ; i < data.comicData.results.length ; i++)
        {   
            let comic = data.comicData.results[i];
            comicHTML += `<li>${comic.title}</li>`
        }
    }

    document.getElementById('comics_list').innerHTML = comicHTML;

    let eventsHTML = '';

    if(data.eventsData.results.length == 0)
    {
        eventsHTML = `<li>No Events available for ${characterName}</li>`;
    }
    else if(data.eventsData.results.length > 3)
    {
        for(let i = data.eventsData.results.length - 3 ; i < data.eventsData.results.length ; i++)
        {   
            let event = data.eventsData.results[i];
            eventsHTML += `<li>${event.title}</li>`
        }
    }else{
        for(let i = 0 ; i < data.eventsData.results.length ; i++)
        {   
            let event = data.eventsData.results[i];
            eventsHTML += `<li>${event.title}</li>`
        }
    }
    
    document.getElementById('events_list').innerHTML = eventsHTML;

    let seriesHTML = '';

    if(data.seriesData.results.length == 0)
    {
        seriesHTML = `<li>No Series available for ${characterName}</li>`;
    }
    else if(data.seriesData.results.length > 3)
    {
        for(let i = data.seriesData.results.length - 3 ; i < data.seriesData.results.length ; i++)
        {   
            let series = data.seriesData.results[i];
            seriesHTML += `<li>${series.title}</li>`
        }
    }else{
        for(let i = 0 ; i < data.seriesData.results.length ; i++)
        {   
            let series = data.seriesData.results[i];
            seriesHTML += `<li>${series.title}</li>`
        }
    }

    document.getElementById('series_list').innerHTML = seriesHTML;

    let storiesHTML = '';

    if(data.storiesData.results.length == 0)
    {
        storiesHTML = `<li>No Stories available for ${characterName}</li>`;
    }
    else if(data.storiesData.results.length > 3)
    {
        for(let i = data.storiesData.results.length - 3 ; i < data.storiesData.results.length ; i++)
        {   
            let story = data.storiesData.results[i];
            storiesHTML += `<li>${story.title}</li>`
        }
    }else{
        for(let i = 0 ; i < data.storiesData.results.length ; i++)
        {   

            let story = data.storiesData.results[i];
            storiesHTML += `<li>${story.title}</li>`
        }
    }

    document.getElementById('stories_list').innerHTML = storiesHTML;

}

function addToFavourites(obj)
{
   const payLoad = JSON.parse(obj.getAttribute('data-charObj'));

   let fav_characters = [];
    if(!(JSON.parse(localStorage.getItem('favourite_character'))))
    {
        fav_characters.push(payLoad);
        localStorage.setItem('favourite_character',JSON.stringify(fav_characters));
    }
    else{
        fav_characters = JSON.parse(localStorage.getItem('favourite_character'));
        fav_characters.push(payLoad);
        localStorage.setItem(('favourite_character'),JSON.stringify(fav_characters));
    }
    console.log(JSON.parse(localStorage.getItem('favourite_character')));
    alert('Added to favourites');
    displayFavouriteButton(payLoad);
}

getCharacterDetails().then((data) => fillHTML(data));

