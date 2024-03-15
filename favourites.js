

function loadFavouritesData()
{
    document.getElementById('favouritesBody').innerHTML = 
    `<div id = 'favouritesContainer'>

    </div>`
    let NoOFCharacters = JSON.parse(localStorage.getItem('favourite_character'));
    
    if(NoOFCharacters)
    {
        if(NoOFCharacters.length > 0)
        {
            let favouritesHTML = '';
            favouritesHTML += `
            <div style = "background-color : red ;height:100px;margin-bottom:10px">
                <h3 style="font-size : xx-large ; margin-left : 40% ; padding : 30px ; color : white" > Favourite Characters </h3>
                <a href='./index.html' style="font-size : x-large ; margin-left : 80% ; padding : 30px ">Go to Home Page</a>
            </div>
            <div class = 'row'  class="container" style = "padding : 4%">`;

            for(var i = 0 ; i < NoOFCharacters.length ; i++)
            {
                let character = NoOFCharacters[i];
                favouritesHTML += `<div class='col-md-3'>`;
                favouritesHTML += `<img src= ${character.path} />`;
                favouritesHTML += `<h3> ${character.name} </h3>`;
                favouritesHTML += `<button class="btn btn-danger" data-charid = '${character.id}' onClick='removeFromFavourites(this)'> Remove from Favourites </button>`;
                favouritesHTML += `</div>`;

                if((i+1) %4 == 0)
                {
                    favouritesHTML += `</div>`;
                    favouritesHTML += `<div class='row' class="container" style = "padding : 4%">`;
                }
            }

            document.getElementById('favouritesContainer').innerHTML = favouritesHTML;
        }else{
            document.getElementById('favouritesContainer').innerHTML = `
                <div style="margin:40px">
                    <h3>No Favourites Added yet</h3>
                    <a href='./index.html'>Go to Home Page</a>
                </div>
            `;
        }
    }else{
        document.getElementById('favouritesContainer').innerHTML = `
                <h3>No Favourites Added yet</h3>
                <a href='./index.html'>Go to Home Page</a>
            `;
    }
  
}

function removeFromFavourites(obj)
{
    let confirmation = confirm('Are you sure want to delete');
    if(confirmation)
    {
        let charId = obj.getAttribute('data-charid');
        let localStorageData = JSON.parse(localStorage.getItem('favourite_character'));
        const index = localStorageData.findIndex((element) => element.id == charId);
        localStorageData.splice(index,1);
        localStorage.setItem('favourite_character',JSON.stringify(localStorageData));
        loadFavouritesData();
    }
}

loadFavouritesData();