const { nap } = require('./utils')

const phonetics = [
  {
    id: 0,
    name: 'Big Bang',
    sound: 'Boom!'
  }, {
    id: 1,
    name: 'Fairy Dust',
    sound: 'Sprinkle'
  }, {
    id: 2,
    name: 'Frying Pan',
    sound: 'Sizzle'
  }, {
    id: 3,
    name: 'Car Crash',
    sound: 'Screech'
  }, {
    id: 4,
    name: 'Slap',
    sound: 'Thwack'
  }
]

exports.getPhonetic = async (id) => {
  // simulate data access duration
  await nap(500)

  const phonetic = phonetics.find(p => p.id === id)
  if (phonetic) {
    return phonetic
  } else {
    throw new Error('Phonetic not found! *Sad Trumpet Sound*')
  }
}
