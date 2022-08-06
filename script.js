const GetHeroBtn =document.getElementById('getHerobtn')
const GetHeroImage=document.getElementById('heroImage')

//gettin the search box value
const searchInput=document.getElementById('searchInput')
//onclick function searchHerobtn
const searchHero=document.getElementById('searchHerobtn')

const GetHeroName = document.getElementById('heroName')
const powerStat=document.getElementById('powerstat')

const heroToken = '10223569763528853'
const heroBaseurl=`https://superheroapi.com/api.php/${heroToken}`
const getRandomSuperHero = (id, name)=>{
    fetch(`${heroBaseurl}/${id}`)
    .then(response=>response.json())
    .then(json=>{
        console.log(json)
        // document.querySelector('body').innerHTML=`<img src='${json.image.url}' />`
        const stat = getPowerStat(json)
        
        GetHeroName.innerHTML=`<h2>${json.name}<h2/>`
        GetHeroImage.innerHTML=` <img src='${json.image.url}' />`
        powerStat.innerHTML=`${stat}`
    })
}
const getrandomhero=()=>{
    const heroId = Math.floor(Math.random()*731) + 1
    return heroId

}
GetHeroBtn.onclick=()=> getRandomSuperHero(getrandomhero())

const statToEmoji={
    combat:'⚔️',
    intelligence:'🧠',
    strength :'💪',
    durability:'🏋🏼',
    power:'⚡',
    speed:'​🚪​🏃​💨​'
}
//getPowerStat function is used show the power status html
const getPowerStat=(character)=>{
    const stats = Object.keys(character.powerstats).map(stat =>{
        return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`
    })
    // console.log(stats)
    return stats.join(' ')
}

// search by name your superHero
const searchSuperHero=(name)=>{
    
    fetch(`${heroBaseurl}/search/${name}`)
    .then(response=>response.json())
    .then(json=>{
        console.log(json)
        const hero = json.results[0]
        GetHeroName.innerHTML=`<h2>${hero.name}<h2/>`
        GetHeroImage.innerHTML=`<img src='${hero.image.url}' />`
        const powerstat=getPowerStat(hero)
        console.log('powerstat')
        powerStat.innerHTML=`${powerstat}`


    })
}


// searchSuperHero('batman' )
searchHero.onclick=()=> searchSuperHero(searchInput.value)
