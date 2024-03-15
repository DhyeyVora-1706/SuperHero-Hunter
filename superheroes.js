
async function getSuperHeroData(name)
{
    let superHeroData;
    if(name)
    {
        superHeroData = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=d90c7e04c11ec3229ebe39101239d714&hash=492a3b15ad66b54574dc96121573d1ab&offset=0&limit=100&name=${name}`)
                        .then((response) => response.json())
                        .then((result) => result.data);
    }else{
        superHeroData = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=d90c7e04c11ec3229ebe39101239d714&hash=492a3b15ad66b54574dc96121573d1ab&offset=0&limit=100`)
                        .then((response) => response.json())
                        .then((result) => result.data);
    }
    

    return superHeroData;
}

function onDetailClick()
{
    console.log('Inside OnDetail Click');
}

async function searchSuperHero()
{
        let name = document.getElementById('searchBox').value;

        let data = await getSuperHeroData(name);
        console.log(data);

        if(data.count > 0)
        {
            var string = "";
            string += "<div class='row'>"

            for(var i = 0 ; i < data.results.length ;i++)
            {
                var element = data.results[i];
                let ImagePath = `${element.thumbnail.path}/portrait_fantastic.${element.thumbnail.extension}`;
                string += `<div class='col-md-3'>`;
                string += `<a href= ./details.html?id=${element.id}>`
                string += `<img src = ${ImagePath} />`
                string += `</a>`
                string += `<h3>  ${element.name} </h3>`;
                string += `</div>`;                

                if((i+1) % 4 == 0)
                {
                    string += `</div>`;
                    string += `<div class='row'>`;
                }
            }

            document.getElementById('results').innerHTML = string;

        }
}       


document.getElementById("BtnSearch").addEventListener('click',searchSuperHero);


