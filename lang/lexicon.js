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


    // general things
   /* {
      word:'apple',
      is:['delicious','healthy','crunchy','refreshing'],
      extends:['fruit'],
      plural:'apples',
      associated:['pear','pie'],
    },
    {
      word:'pie',
      is:['delicious','sweet'],
      extends:['dessert'],
      plural:'pies',
      associated:['apple','pecan','oven'],
    },
    {
      word:'dessert',
      is:['delicious','sweet','rich','extravagant','usually after a meal'],
      extends:['food'],
      plural:'desserts',
      associated:['candy','pie'],
    },


    {
      word:'pear',
      is:['delicious','healthy'],
      extends:['fruit'],
      plural:'pears',
      associated:['apple'],
    },
    {
      word:'love',
      is:['tingly','special'],
      extends:['emotion'],
      pronoun:'concept',
      associated:['happiness','sadness',"Valentine's Day"],
    },
    {
      word:'joy',
      is:['desirable','special'],
      extends:['emotion'],
      pronoun:'concept',
      associated:['happiness','sadness',"love"],
    },
    {
      word:'orange',
      is:['sweet','healthy','orange'],
      extends:['fruit'],
      plural:'oranges',
      associated:['apple'],
    },
    {
      word:'fruit',
      is:['delicious','healthy'],
      extends:['food'],
      plural:'fruits',
      associated:['pear','vegetables'],
    },
    {
      word:'bird',
      is:['graceful','airborne'],
      extends:['animal'],
      plural:'birds',
      associated:['hawk','fish'],
    },
    {
      word:'food',
      is:['necessary'],
      pronoun:'concept',
      associated:['water'],
    },
    {
      word:'puppy',
      is:['cute','adorable'],
      extends:['dog'],
      plural:'puppies',
      associated:['kitten'],
    },
    {
      word:'dog',
      is:['reliable','domestic','loyal'],
      extends:['animal'],
      plural:'dogs',
      associated:['fetch','cat'],
    },
    {
      word:'animal',
      is:['alive','living','active'],
      plural:'animals',
      associated:['plant','cat'],
    },
    {
      word:'monkey',
      is:['alive','living','cute','intelligent','a close relative to us humans'],
      plural:'monkeys',
      extends:'animal',
      associated:['business','lion','The Jungle Book'],
    },
    {
      word:'lion',
      is:['alive','dangerous','cunning','king of the jungle'],
      plural:'lions',
      extends:'animal',
      associated:['cat','monkey','jungle','The Jungle Book']
    },
    {
      word:'cat',
      is:['vain','graceful','sneaky'],
      extends:['animal'],
      plural:'cats',
      associated:['dog','mouse'],
    },
    {
      word:'mouse',
      is:['small','quiet','sneaky'],
      extends:['animal'],
      plural:'mice',
      associated:['cat','cheese'],
    },
    {
      word:'snake',
      is:['quiet','sneaky','deadly'],
      extends:['animal'],
      plural:'snakes',
      associated:['poison','mice'],
    },
    {
      word:'cheese',
      is:['tasty','salty'],
      extends:['food'],
      plural:'cheeses',
      associated:['mouse','fruit'],
    },
    {
      word:'potato',
      is:['healthy','starchy'],
      extends:['vegetable'],
      plural:'potatoes',
      associated:['dirt'],
    },
    {
      word:'vegetable',
      is:['healthy','starchy'],
      extends:['food'],
      plural:'vegetables',
      associated:['vitamin'],
    },
    {
      word:'candy',
      is:['delicious','unhealthy'],
      pronoun:'concept',
      plural:'candies',
      extends:['food'],
    },
    {
      word:'fork',
      plural:'forks',
      is:['pointy'],
      extends:['tool']
    },*/
    {
      word:'tool',
      plural:'tools',
    },
    // role-playing things
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
      associated:[],
    },
    {
      word:'weapon',
      is:['dangerous'],
      extends:['tool'],
      plural:'weapons',
      associated:[],
    },
    {
      word:'Axos Braveheart',
      is:['famous'],
      extends:['knight'],
      gender:'male',
      pronoun:'proper',
      associated:[],
    },
    {
      word:'Axos',
      see:'Axos Braveheart',
      pronoun:'proper',
      associated:[],
    },
    {
      word:'Sword of Light',
      is:['very powerful','legendary','secret','hidden in a certain location','buried next to the well'],
      pronoun:'unique',
      extends:['weapon'],
      associated:[]
    },
    {
      word:'axe',
      is:['sharp','dangerous','deadly','cool','mighty','easy to use'],
      extends:['weapon'],
      plural:'axes',
      associated:['sword','tree','magic'],
    },
    {
      word:'crossbow',
      is:['dangerous','easy to use'],
      extends:['weapon'],
      plural:'crossbows',
      associated:[],
    },
    {
      word:'bow',
      is:['versatile'],
      extends:['weapon'],
      plural:'bows',
      associated:[],
    },
    {
      word:'spear',
      is:['versatile'],
      extends:['weapon'],
      plural:'spears',
      associated:[],
    },
    {
      word:'wizard',
      is:['wise','magical','powerful','feared'],
      gender:'male',
      extends:['warrior'],
      plural:'wizards',
      associated:['magic'],
    },
    {
      word:'Mount Aur',
      is:['enchanted','big'],
      extends:['place'],
      pronoun:'proper',
      associated:[],
    },
    {
      word:'barbarian',
      is:['brutish','tough','strong'],
      extends:['warrior'],
      gender:'male',
      plural:'barbarians',
      associated:['sword'],
    },
    {
      word:'knight',
      is:['noble','tough','strong'],
      gender:'male',
      extends:['warrior'],
      relationship:[{
        object:'sword',
        action:'use'
      }],
      plural:'knights',
      associated:['sword'],
    },
    {
      word:'nobleman',
      is:['wealthy','learned','pompous'],
      gender:'male',
      extends:['noble'],
      plural:'noblemen',
      associated:['gold'],
    },
    {
      word:'Vix the Vile',
      is:['mighty','a rogue','from a distant land','a fearsome blackguard'],
      gender:'female',
      pronoun:'proper',
      relationship: [
      {
          object:'fire',
          action:'use'
      }],
      extends:['wizard'],
      associated:['Sword of Light']
    },
    {
      word:'Vix',
      see:'Vix the Vile',
      pronoun:'proper',
    },
    {
      word:'noble',
      is:['wealthy','distinguished'],
      extends:['person'],
      gender:'mixed',
      plural:'nobles',
      associated:['gold'],
    },
    {
      word:'noblewoman',
      is:['gossipy','wealthy','flitty','airy'],
      extends:['noble'],
      gender:'female',
      plural:'noblewomen',
      associated:['gold'],
    },
    {
      word:'warrior',
      is:[],
      extends:['person'],
      gender:'male',
      plural:'warriors',
      associated:[],
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
      is:['fearsome'],
      extends:['creature'],
    },
    {
      word:'magic',
      is:[],
      extends:['force'],
      pronoun:'concept',
      associated:[],
    },
    {
      word:'dark magic',
      is:['deadly'],
      extends:['magic'],
      pronoun:'force',
      associated:[],
    },
    {
      word:'holy magic',
      is:['powerful'],
      extends:['magic'],
      pronoun:'concept',
      associated:[],
    },
    {
      word:'fire',
      is:[],
      extends:['force'],
      pronoun:'force',
      associated:[],
    },
    {
      word:'Algoron',
      is:['mighty','a wizard','from a distant land','a fearsome sorceror'],
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
      associated:['Sword of Light']
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
      associated:[''],
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
      applies:'subject'
    },
    {
      word:'brave',
      when:[{action:'kill',object:'monster'}],
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
