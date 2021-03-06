define("lang/attributes", [], function ()
{
  return [
  {
    word: 'powerful',
    form: 'adjective',
  },
  {
    word: 'scary',
    synonyms: ['fearsome', 'frighting'],
  },
  {
    word: 'effective',
    form: 'adjective',
  },
  {
    word: 'fast',
    form: 'adjective',
    synonyms: ['quick', 'speedy'],
  },
  {
    word: 'dead',
    form: 'adjective',
  },
  {
    word: 'sunny',
    form: 'adjective',
  },
  {
    word: 'red',
    form: 'adjective',
  },
  {
    word: 'green',
    form: 'adjective',
  },
    {
    word: 'blue',
    form: 'adjective',
  },
  {
    word: 'white',
    form: 'adjective',
  },
  {
    word: 'tall',
    form: 'adjective',
  },
  {
    word: 'the',
    form: 'preposition',
    pronoun: 'none'
  },
  {
    word: 'many',
    form: 'adjective',
    synonyms: ['lots of', 'tons of']
  },
  {
    word: 'nice',
    when: [
    {
      action: 'give',
      to: 'me',
      applies: 'subject'
    }, ],
    form: 'adjective',
    synonyms: ['kind'],
  },
  {
    word: 'missing',
    form: 'adjective',
    synonyms: ['gone', 'not there'],
  },
  {
    word: 'few',
    form: 'adjective',
    synonyms: ['scarcely any', 'not many'],
  },
  {
    word: 'pretty',
    form: 'adjective',
  },
  {
    word: 'old',
    form: 'adjective',
    synonyms: ['wizened', 'ancient']
  },
  {
    word: 'big',
    form: 'adjective',
    synonyms: ['large', 'giant', 'huge', 'immense']
  },
  {
    word: 'straight',
    form: 'adjective',
    synonyms: []
  },
  {
    word: 'near',
    form: 'adjective',
    synonyms: ['close']
  },
  {
    word: 'dark',
    form: 'adjective',
    synonyms: ['dim', 'shadowy']
  },
  {
    word: 'sad',
    form: 'adjective',
    synonyms: ['disheartened', 'upset', 'woebegotten']
  },
  {
    word: 'new',
    form: 'adjective',
  },
  {
    word: 'dangerous',
    when: [
    {
      action: 'kill',
      applies: 'with'
    },
    {
      action: 'burn',
      applies: 'subject'
    }, ],
    form: 'adjective',
  },
  {
    word: 'good',
    when: [
    {
      action: 'is',
      object: 'pretty',
      applies: 'subject'
    }, ],
    form: 'adjective',
  },
  {
    word: 'useful',
    when: [
    {
      action: 'give',
      object: 'milk',
      applies: 'subject'
    }, ],
    form: 'adjective',
    synonyms: ['handy']
  },
  {
    word: 'fun',
    when: [
    {
      action: 'climb',
      applies: 'object'
    },
    {
      action: 'jump',
      applies: 'over'
    }, ],
    form: 'adjective',
    synonyms: ['enjoyable', 'amusing']
  },
  {
    word: 'fierce',
    form: 'adjective',
  },
  {
    word: 'cowardly',
    when: [
    {
      action: 'retreat',
      applies: 'subject'
    }, ],
    form: 'adjective',
    synonyms: ['craven', 'yellow']
  },
  {
    word: 'undead',
    form: 'adjective',
    synonyms: ['hollow']
  },
  {
    word: 'poor',
    when: [
    {
      action: 'have',
      applies: '$no:money$'
    }, ],
    form: 'adjective',
    synonyms: ['broke', 'down and out']
  },
  {
    word: 'no',
    form: 'adjective',
    //noPronoun:true,
    pronoun: 'none'
  },
  {
    word: 'hurt',
    form: 'adjective',
    synonyms: ['injured', 'wounded'],
  },
  {
    word: 'evil',
    form: 'adjective',
    synonyms: ['foul', 'wicked']
  },
  {
    word: 'brave',
    form: 'adjective',
    synonyms: ['fearless']
  }]
})