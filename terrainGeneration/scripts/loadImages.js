const images = {
  'tree': {
    src: 'https://i.imgur.com/GKrsx6y.png',
  },
  'cactus': {
    src: 'https://i.imgur.com/4rHF9nf.png',
  }
}

// convert image src into bitmap
for(let imageName in images) {
  let image = images[imageName]
  Jimp.read(image.src, (err, img) => {
    if(err) throw err
    image.bitmap = img.bitmap
    image.img = img
  })
}