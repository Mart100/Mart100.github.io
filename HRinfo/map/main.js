let map
let imageOverlayMap,
    imageOverlayMapNames,
    imageOverlayChestLocations
$(() => {

  map = L.map('map', {
    minZoom: 1,
    maxZoom: 10,
    center: [-200, 200],
    zoom: 1,
    crs: L.CRS.Simple
  })

  let southWest = map.unproject([0, 800], 1)
  let northEast = map.unproject([800, 0], 1)
  let bounds = new L.LatLngBounds(southWest, northEast)


  imageOverlayMap = L.imageOverlay('backgroundMap.jpg', bounds).addTo(map)

  imageOverlayMapNames = L.imageOverlay('mapNames.png', bounds).addTo(map)

  imageOverlayChestLocations = L.imageOverlay('chestLocations.png', bounds).addTo(map)

})

// controlPanel
$(() => {

  // overlays

  // background map
  $('#controlPanel #overlays #background').on('click', () => {
    let checked = $('#controlPanel #overlays #background').is(':checked')
    if(checked) imageOverlayMap.setOpacity(1)
    else imageOverlayMap.setOpacity(0)
  })

  // Place Names
  $('#controlPanel #overlays #placeNames').on('click', () => {
    let checked = $('#controlPanel #overlays #placeNames').is(':checked')
    if(checked) imageOverlayMapNames.setOpacity(1)
    else imageOverlayMapNames.setOpacity(0)
  })

  
  // Chest Locations
  $('#controlPanel #overlays #chestLocations').on('click', () => {
    let checked = $('#controlPanel #overlays #chestLocations').is(':checked')
    if(checked) imageOverlayChestLocations.setOpacity(1)
    else imageOverlayChestLocations.setOpacity(0)
  })
})