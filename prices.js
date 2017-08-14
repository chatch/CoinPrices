const getPrice = asset =>
  fetch(`https://api.coinmarketcap.com/v1/ticker/${asset}/`)
    .then(rsp => rsp.json())
    .then(rsp => rsp[0])
    .catch(error => {
      console.error(error)
    })

export {getPrice}
