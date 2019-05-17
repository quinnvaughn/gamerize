const fees = {
  USD: { Percent: 2.9, Fixed: 0.3 },
  GBP: { Percent: 2.4, Fixed: 0.2 },
  EUR: { Percent: 2.4, Fixed: 0.24 },
  CAD: { Percent: 2.9, Fixed: 0.3 },
  AUD: { Percent: 2.9, Fixed: 0.3 },
  NOK: { Percent: 2.9, Fixed: 2 },
  DKK: { Percent: 2.9, Fixed: 1.8 },
  SEK: { Percent: 2.9, Fixed: 1.8 },
  JPY: { Percent: 3.6, Fixed: 0 },
  MXN: { Percent: 3.6, Fixed: 3 },
}

function calcFee(amount, currency) {
  const _fee = fees[currency]
  const cost = parseFloat(amount)
  const total =
    (cost + parseFloat(_fee.Fixed)) / (1 - parseFloat(_fee.Percent) / 100)
  const fee = total - cost

  return amount === 0 ? 0 : fee.toFixed(2)
}

export { calcFee }
