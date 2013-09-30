var _things = [
    // special things
   {
      word:'self',
      extends:['person'],
      pronoun:'self',
      hidden:'true',
    },
    {
      word:'you',
      extends:['person'],
      pronoun:'none',
      hidden:'true',
    },
    {
      word:'father',
      extends:['person'],
      plural:'fathers'
    },
    {
      word:'mother',
      extends:['person'],
      gender:['female'],
      plural:'mothers'
    },
    {
      word:'mom',
      extends:['person'],
      gender:['female'],
      see:['mother'],
      plural:'moms'
    },
    {
      word:'cow',
      extends:['animal'],
      plural:'cows'
    },
    {
      word:'hand',
      plural:'hands'
    },
    {
      word:'name',
      plural:'names'
    },
    {
      word:'Milky-White',
      extends:['cow'],
      pronoun:'proper'
    },
    {
      word:'milk',
      pronoun:'none'
    },
    {
      word:'market',
      pronoun:'force'
    },
    {
      word:'man',
      plural:'men',
      extends:['person']
    },
    {
      word:'advice',
      pronoun:'none',
    },
    {
      word:'me',
      see:'self',
      pronoun:'none',
    },
    {
      word:'I',
      see:'me',

      pronoun:'none',
    },
    {
      word:'candlestick',
      plural:'candlesticks',
    },
    {
      word:'place',
      hidden:'true',
      plural:'places',
    },
    {
      word:'hill',
      extends:['place'],
      plural:'hills',
    },
    {
      word:'water',
      pronoun:'force',
    },
    {
      word:'beanstalk',
      plural:'beanstalks'
    },
    {
      word:'top',
      plural:'tops'
    },
    {
      word:'person',
      hidden:'true',
      plural:'people',
    },
    {
      word:'Jill',
      extends:'people',
      pronoun:'proper',
    },
    {
      word:'Muffin Man',
      extends:'people',
      pronoun:'unique',
    },
    {
      word:'Drury Lane',
      extends:['place'],
      pronoun:'proper'
    },
]