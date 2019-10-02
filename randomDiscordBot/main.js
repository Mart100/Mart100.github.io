let bot
let dbotsToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NjYyNzU0MzA4ODQ5NjY1MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTY4OTM2NzY0fQ.HaFVn7N6iYa7WfmxnJWz0sdWGypHzcWoyAoK2CTj65s'

$(() => {
  onLoad()
})

async function onLoad() {
  bot = await getRandomBot()
  
}


async function getRandomBot() {
  let bots = await getRandomBots()
  console.log(bots)
}

async function getRandomBots() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'https://discordbots.org/api/bots?search=2&limit=500',
      type: 'GET',
      contentType: 'json',
      beforeSend(xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${dbotsToken}`)
      },
      success(data) {
        console.log(data)
        resolve(data)
      },
    })
  })
}