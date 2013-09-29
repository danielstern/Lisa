var Lexicon = {
    things:[
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
      see:'self',
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
      hidden:'true',
      extends:['place'],
      plural:'hills',
    },
    {
      word:'water',
      pronoun:'force',
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
  ],


    attributes:[ 
    {
      word:'powerful',
      form:'adjective',
    },
    {
      word:'scary',
      synonyms:['fearsome','frighting'],
    },
    {
      word:'effective',
      form:'adjective',
    },
    {
      word:'fast',
      form:'adjective',
      synonyms:['quick','speedy'],
    },
    {
      word:'dead',
      form:'adjective',

    },
    {
      word:'new',
      form:'adjective',
    },
    {
      word:'dangerous',
      when:[
        {action:'kill',applies:'with'},
      ],
      form:'adjective',
    },
    {
      word:'fierce',
      form:'adjective',
    },
    {
      word:'cowardly',
      when:[
        {action:'retreat',applies:'subject'},
      ],
      form:'adjective',
      synonyms:['craven','yellow']
    },
    {
      word:'undead',
      form:'adjective',
      synonyms:['hollow']
    },
    {
      word:'hurt',
      form:'adjective',
      synonyms:['injured','wounded'],
    },
    {
      word:'evil',
      form:'adjective',
      synonyms:['foul','wicked']
    },
    {
      word:'brave',
      form:'adjective',
      synonyms:['fearless']
    }
    ],
   expressions:[
   {
     said:'hello',
     for:'greeting',
    },
  {
     said:'hi',
     for:'greeting',
    },
    {
     said:'bye',
     for:'parting',
    },
   {
     said:"",
     for:'silence',
    },
  {
      said:"...",
     for:'silence',
    },
    {
     said:"damn you",
     for:'insult',
    },
    {
     said:"you suck",
     for:'insult',
    },


   ]
  };
