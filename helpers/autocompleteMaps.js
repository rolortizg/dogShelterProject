let address = document.getElementById('address') 
let lat = document.getElementById('lat')
let lng = document.getElementById('lng')


function autoComplete(input, inputLat, inputLng){
  const dropdown = new google.maps.places.Autocomplete(input)
  dropdown.addListener('place_changed', ()=>{
    let place = dropdown.getPlace()
    console.log(place)
    lat.value = place.geometry.location.lat()
    lng.value = place.geometry.location.lng()
  })
}

autoComplete(address, lat, lng)
