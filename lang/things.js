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
      word:'part',
      plural:'parts',
      pronoun:'force'
    },
    {
      word:'wall',
      plural:'walls',
      extends:['place'],
    },

    {
      word:'shoe',
      plural:'shoes',
      extends:['clothing'],
    },
    {
      word:"Lexy's",
      pronoun:'proper',
      extends:['store'],
    }, 
    {
      word:"Emily's Convenience",
      pronoun:'proper',
      extends:['store'],
    },
    {
      word:'shoe store',
      plural:'shoe stores',
      extends:['store'],
    },
    {
      word:'mall',
      plural:'malls',
      extends:['place'],
    },
    {
      word:'time',
      plural:'times',
      extends:['concept'],
    },
    {
      word:'safe',
      plural:'safes',
    },
    {
      word:'store',
      plural:'stores',
      extends:['place'],
    },
    {
      word:'money',
      plural:'money',
    },
    {
      word:'today',
      plural:'today',
      pronoun:'force'
    },
    {
      word:'king',
      plural:'kings',
      pronoun:'the',
    },

    {
      word:'sky',
      plural:'skies',
      extends:['place'],
      pronoun:'none'
    },
    {
      word:'houses',
      plural:'houses',
      extends:['building','place'],
    },
    {
      word:'doorstep',
      plural:'doorsteps',
      extends:['place'],
    },
    {
      word:'road',
      plural:'roads',
      extends:['place'],
    },
    {
      word:'there',
      pronoun:'force',
      extends:['place','idea'],
    },
    {
      word:'mother',
      extends:['person'],
      gender:['female'],
      plural:'mothers'
    },
    {
      word:'sun',
      pronoun:'unique',
      plural:'suns'
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
      word:'bed',
      plural:'beds'
    },
    {
      word:'sleep',
      pronoun:'force'
    },
    {
      word:'bean',
      extends:['vegetable'],
      plural:'beans'
    },
    {
      word:'garden',
      plural:'gardens'
    },
    {
      word:'pocket',
      plural:'pockets'
    },
    {
      word:'garden',
      plural:'gardens'
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
      word:'home',
      plural:'homes',
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