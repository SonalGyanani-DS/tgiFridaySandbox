export async function fetchInformation(menuId) {

    var requestUrl = "https://api.yextapis.com/v2/accounts/me/menus/" + menuId + "?v=20230324&api_key=745524b32e8d2677328575ad266fabca" // the menu endpoint. make sure to switch the API key to a variable when you publish

    const response = await fetch(requestUrl).then(response => response.json()) // 

    var myOutputArray = []
    if(typeof response.response.sections == 'undefined') {}

    else {

    for (var x = 0; x < response.response.sections.length; x++) {

        var myIds = []
        var myNames = []
        var myDescriptions = []
        var myCosts = []
        var myImages = []
    
    if(typeof response.response.sections[x].items == 'undefined') {}
    else {
        for (var y = 0; y < response.response.sections[x].items.length; y++) {

            myIds.push(response.response.sections[x].items[y].id)
            myNames.push(response.response.sections[x].items[y].name)
            //myCosts.push(response.response.sections[x].items[y].cost.price)
            //myImages.push(response.response.sections[x].items[y].photo.url)
            
            if(typeof response.response.sections[x].items[y].cost.price == 'undefined') {
                myCosts.push("")
            }
            else {
                myCosts.push(response.response.sections[x].items[y].cost.price)
            }

            if(typeof response.response.sections[x].items[y].photo == 'undefined') {
                myImages.push("")
            }
            else {
                myImages.push(response.response.sections[x].items[y].photo.url)
            }

            if(typeof response.response.sections[x].items[y].description == 'undefined') {
                myDescriptions.push("")
            }
            else {
                myDescriptions.push(response.response.sections[x].items[y].description)
            }

        }

        myOutputArray.push(myIds,"***",myNames,"***",myDescriptions,"***",myCosts,"***",myImages,"***")

    }
   }
  }

    return JSON.stringify(myOutputArray)
}