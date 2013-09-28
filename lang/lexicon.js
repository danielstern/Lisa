var Lexicon = {
    things:[
    // special things
   {
      word:'self',
      pronoun:'self',
      hidden:'true',
    },
    {
      word:'you',
      pronoun:'none',
      hidden:'true',
    },
    {
      word:'place',
      hidden:'true',
      plural:'places',
    },
    {
      word:'force',
      hidden:'true',
      plural:'forces',
    },
    {
      word:'creature',
      hidden:'true',
      plural:'creatures',
    },
    {
      word:'person',
      hidden:'true',
      plural:'people',
    },
    {
      word:'tool',
      plural:'tools',
    },
    {
      word:'sword',
      extends:['weapon'],
      plural:'swords',
    },
    {
      word:'club',
      extends:['weapon'],
      relationship:[{
        object:'goblin',
        action:'effective'
      }],
      plural:'clubs',
    },
    {
      word:'weapon',
      extends:['tool'],
      plural:'weapons',
    },
    {
      word:'Axos Braveheart',
      extends:['knight'],
      gender:'male',
      pronoun:'proper',
    },
    {
      word:'Axos',
      see:'Axos Braveheart',
      gender:'male',
      pronoun:'proper',
    },
    {
      word:'Sword of Light',
      pronoun:'unique',
      extends:['weapon'],
    },
    {
      word:'axe',
      extends:['weapon'],
      plural:'axes',
    },
    {
      word:'crossbow',
      extends:['weapon'],
      plural:'crossbows',
    },
    {
      word:'bow',
      extends:['weapon'],
      plural:'bows',
    },
    {
      word:'spear',
      extends:['weapon'],
      plural:'spears',
    },
    {
      word:'wizard',
      gender:'male',
      extends:['warrior'],
      plural:'wizards',
    },
    {
      word:'Mount Aur',
      extends:['place'],
      pronoun:'proper',
    },
    {
      word:'barbarian',
      extends:['warrior'],
      gender:'male',
      plural:'barbarians',
    },
    {
      word:'knight',
      gender:'male',
      extends:['warrior'],
      relationship:[{
        object:'sword',
        action:'use'
      }],
      plural:'knights',
    },
    {
      word:'nobleman',
      gender:'male',
      extends:['noble'],
      plural:'noblemen',
      associated:['gold'],
    },
    {
      word:'Vix the Vile',
      gender:'female',
      pronoun:'proper',
      relationship: [
      {
          object:'fire',
          action:'use'
      }],
      extends:['rogue'],
    },
    {
      word:'Vix',
      see:'Vix the Vile',
      pronoun:'proper',
    },
    {
      word:'rogue',
      extends:'person',
      plural:'rogues'
    },
    {
      word:'noble',
      extends:['person'],
      gender:'mixed',
      plural:'nobles',
    },
    {
      word:'noblewoman',
      extends:['noble'],
      gender:'female',
      plural:'noblewomen',
    },
    {
      word:'warrior',
      extends:['person'],
      gender:'male',
      plural:'warriors',
    },
    {
      word:'Theoch',
      is:['fearsome','cunning'],
      extends:['dragon'],
      gender:'male',
      pronoun:'proper'
    },
    {
      word:'dragon',
      extends:['creature'],
      plural:'dragons'
    },
    {
      word:'magic',
      extends:['force'],
      pronoun:'force',
    },
    {
      word:'dark magic',
      extends:['magic'],
      pronoun:'force',
    },
    {
      word:'holy magic',
      extends:['magic'],
      pronoun:'force',
    },
    {
      word:'ice',
      see:'ice magic'
    },
    {
      word:'ice magic',
      extends:['magic'],
      relationship:[{
        object:'dragon',
        action:'effective'
      }],
      pronoun:'force',
    },
    {
      word:'fire',
      extends:['force'],
      pronoun:'force',
    },
    {
      word:'Algoron',
      pronoun:'proper',
      relationship:[{
        object:'magic',
        action:'use'
      },
      {
        object:'dark magic',
        action:'use'
      }
      ],
      extends:['wizard'],
    },
    {
      word:'king',
      extends:['royalty'],
      pronoun:'',
      relationship:[{
        object:'kingdom',
        action:'rule'
      }],
      plural:'kings',
    },
    {
      word:'King Omnoth',
      extends:['king'],
      pronoun:'proper',
      relationship:[{
        object:'Emeraldia',
        action:'rule'
      }],
    },
    {
      word:'King Amnon',
      extends:['king'],
      pronoun:'proper',
    },
    {
      word:'Amnon',
      see:'King Amnon',
       pronoun:'proper',
    },
    {
      word:'Omnoth',
      see:'King Omnoth',
      pronoun:'proper',
    },
    {
      word:'Emeraldia',
      extends:['place'],
      pronoun:'proper',
    },
    {
      word:'Queen Amandia',
      extends:['queen'],
      pronoun:'proper',
      relationship:[{
        object:'Emeraldia',
        action:'rule'
      }],
    },
    {
      word:'Amandia',
      see:'Queen Amandia'
    },
    {
      word:'zombie',
      extends:['monster'],
      relationship:[{
        object:'fire',
        action:'weakness'
      },
      {
        object:'holy magic',
        action:'weakness'
      }
      ],
      plural:'zombies',
    },
    {
      word:'monster',
      extends:['creature'],
      plural:'monsters',
    },
    {
      word:'Willas',
      extends:['Knight'],
      pronoun:'proper',
      gender:'male',
    },
    {
      word:'goblin',
      extends:['monster'],
        relationship:[{
          object:'magic',
          action:'weakness'
        },
      ],
      plural:'goblins',
    },
    {
      word:'grimgoblin',
      extends:['goblin'],
      plural:'grimgoblins',
      relationship:{
        object:'magic',
        relationship:'use'
      },
    },
    {
      word:'royalty',
      pronoun:'unique',
    },
    {
      word:'queen',
      extends:['royalty'],
      plural:'queens',
    },
    {
      word:'The Queen',
      pronoun:'concept',
      see:'Queen Emeraldia'
    },
   ],
    attributes:[ 
    {
      word:'powerful',
      when:[{action:'use',object:'magic'}],
    },
    {
      word:'evil',
      when:[{action:'use',object:'dark magic'}],
      applies:'subject',
      synonyms:['foul','wicked']
    },
    {
      word:'brave',
      when:[{action:'kill',object:'monster'}],
      applies:'subject',
      synonyms:['heroic','fearless']
    }
    ],
   expressions:[
   {
     said:'hello',
     for:'greeting',
    },
  {
    said:'greetings',
    for:'greeting',
   },
  {
     said:'hi',
     for:'greeting',
    },
    {
     said:'howdy',
     for:'greeting',
    },
    {
     said:'hey',
     for:'greeting',
    },
    {
     said:'bye',
     for:'parting',
    },
    {
     said:'bye bye',
     for:'parting',
    },
      {
     said:'seeya',
     for:'parting',
    },
      {
     said:'see you',
     for:'parting',
    },
   {
     said:"what's up?",
     for:'greeting',
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
     said:"fuck you",  
     for:'insult',
    },
    {
     said:"screw you",
     for:'insult',
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
