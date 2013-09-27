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
/* 
    // general things
    {
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
      is:['useful','handy','helpful'],  
    },
    // role-playing things
    {
      word:'sword',
      is:['sharp','dangerous','deadly','cool'],
      extends:['weapon'],
      plural:'swords',
      associated:['shield','magic'],
    },
    {
      word:'weapon',
      is:['dangerous'],
      extends:['tools'],
      plural:'weapons',
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
      word:'wizard',
      is:['wise','magical','powerful','feared'],
      extends:['person'],
      plural:'wizards',
      associated:['magic'],
    },
    {
      word:'magic',
      is:['dangerous'],
      extends:['force'],
      pronoun:'concept',
      associated:['magic'],
    },
    {
      word:'Algoron',
      is:['mighty','a wizard','from a distant land','a fearsome sorceror'],
      pronoun:'proper',
      extends:['wizard'],
      associated:['Sword of Light']
    },
    {
      word:'king',
      is:['powerful','mighty','respected','feared','brave'],
      extends:['royalty'],
      pronoun:'',
      relationship:{
        object:'kingdom',
        relationship:'rule'
      },
      plural:'kings',
      associated:['queen','throne','sword','kingdom']
    },
    {
      word:'King Omnoth',
      is:['king of Emeraldia','intelligent','brave','much feared'],
      extends:['king'],
      pronoun:'proper',
      relationship:{
        object:'Emeraldia',
        relationship:'rule'
      },
      associated:[]
    },
    {
      word:'Queen Amandia',
      is:['queen of Emeraldia','beautiful','brave','smart','enchanting'],
      extends:['queen'],
      pronoun:'proper',
      relationship:{
        object:'Emeraldia',
        relationship:'rule'
      },
      associated:[]
    },
    {
      word:'zombie',
      is:['undead','dangerous'],
      extends:['monster'],
      plural:'zombies',
      associated:[''],
    },
    {
      word:'monster',
      is:['dangerous'],
      extends:['creature'],
      plural:'monsters',
      associated:[''],
    },
    {
      word:'goblin',
      is:['dangerous'],
      extends:['monster'],
      plural:'goblins',
      associated:[''],
    },
    {
      word:'grimgoblin',
      is:['dangerous'],
      extends:['goblin'],
      plural:'grimgoblins',
      relationship:{
        object:'magic',
        relationship:'use'
      },
      associated:[''],
    },
    {
      word:'royalty',
      is:['powerful','mighty','wealthy','refined'],
      pronoun:'unique',
      associated:['queen','throne','king']
    },
    {
      word:'Queen',
      is:['powerful','sneaky','ambitious','feared','well-connected'],
      extends:['royalty'],
      pronoun:'unique',
      plural:'queens',
      associated:['king','throne','court','kingdom']
    },
    {
      word:'kingdom',
      is:['vast','proud','great','populous','at war'],
      extends:['place'],
      pronoun:'unique',
      plural:'kingdoms',
      associated:['king','queen','court']
    },
   ],
    attributes:[ 
    {
      word:'delicious',
      associated:['tasty','yummy','scrumptious'],
    }
    ],
   expressions:[
   {
     said:'hits the spot.',
     for:'tasty',
   },
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