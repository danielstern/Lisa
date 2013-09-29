var _stories = [
  {
    name:'the one where algoron goes to Emeraldia and kills amnon',
    sequence:
    [
      {subject:'Algoron',action:'go',to:'Emeraldia'},
      {subject:'Algoron',action:'kill',object:'Amnon'},
    ]
  },
  {
    name:'the one where algoron battles a warrior',
    sequence:
    [
      {subject:'warrior',action:'attack',object:'Algoron'},
      {subject:'Algoron',action:'use',object:'dark magic'},
      {subject:'Algoron',action:'kill',object:'assumed|warrior'},
    ]
  },
  {
    sequence:
    [
      {subject:'main|knight',action:'attack',object:'goblin',with:'sword'},
      {subject:'referenced|goblin',action:'die'}
    ]
  },
  {
    sequence:
    [
      {subject:'skeleton',action:'is',object:'undead',context:{general:true,time:'present'}},
    ]
  },
  {
    sequence:
    [
      {subject:'wizard',action:'use',object:'magic',context:{general:true,time:'present'}},
    ]
  },
  {
    sequence:
    [
      {subject:'club',action:'is',object:'effective',against:'skeleton',context:{general:true,time:'present'}},
    ]
  },
  {
    sequence:
    [
      {subject:'Vix the Vile',action:'use',object:'fire',context:{general:true,time:'present'}},
    ]
  },
  {
    sequence:
    [
      {subject:'knight',action:'use',object:'sword',context:{general:true,time:'present'}},
    ]
  },
  {
    sequence:
    [
      {subject:'knight',action:'kill',object:'goblin',with:'singular|crossbow'},
      {subject:'main|knight',action:'laugh'}
    ]
  },
  {
    sequence:
    [
      {subject:'main|Willas',action:'use',object:'holy magic',against:'Algoron'},
      {subject:'Algoron',action:'retreat'}
    ]
  },
  {
    sequence:
    [
      {subject:'Omnoth',action:'rule',object:'Emeraldia'},
      {rel: 'but', subject:'Omnoth',action:'die'}
    ],
  },
  {
    sequence:
    [
      {subject:'<Willas&sorceress>',action:'go',to:'Emeraldia'},
      {subject:'Willas',action:'buy',object:'$new:Ivory Wand$'},
    ],
  },
  {
    sequence:
    [
      {subject:'Willas',action:'go',to:'Grim Swamps'},
      {subject:'goblin',action:'attack',object:'assumed|Willas'},
      {subject:'Willas',action:'is',object:'injured'},
      {subject:'Willas',action:'use',object:'magic',against:'main|goblin'},
      {subject:'goblin',action:'die'},
    ],
  },
  {
    sequence:
    [
      {subject:'Willas',action:'arrive',at:'Grim Swamps'},
      {subject:'Willas',action:'rest'},
      {subject:'skeletons',action:'attack',object:'assumed|Willas',during:'main|night'},
      {rel:'but', subject:'sorceress',action:'help',object:'assumed|Willas'},
      {subject:'assumed|sorceress',action:'use',object:'magic',against:'main|skeletons'},
      {subject:'main|skeletons',action:'retreat'},
      {rel:'but', subject:'Willas',action:'kill',object:'referenced|skeletons',with:'holy magic'},
    ],
  },
  {
    sequence:
    [
      {subject:'Vix the Vile',action:'go',to:'Mount Aur',when:
      {subject:'Algoron',action:'attack',object:'emeraldia'}}
    ],
  },
  {
    sequence:
    [
      {subject:'Algoron',action:'attack',object:'Emeraldia',with:'Theoch'},
    ]   },
  {
    sequence:
    [
      {subject:'Algoron',action:'kill',object:'Vix the Vile',when:
      {subject:'Algoron',action:'use',object:'dark magic'}}
    ],
  },
  {
    sequence:
    [
      {subject:'Willas',action:'kill',object:'monster',when: {}}
    ],
  },
  {
    sequence:
    [
      {subject:'Algoron',action:'attack',object:'Axos Braveheart'},
      {rel: 'so', subject:'Axos Braveheart',action:'fight',with:'Algoron'},
      {rel: 'but', subject:'Algoron',action:'use',object:'dark magic',against:'assumed|Axos'},
      {subject:'Axos Braveheart',action:'retreat',to:'Mount Aur'},
    ],
  },
  {
    sequence:
    [
      {subject:'grimgoblin',action:'attack',object:'Willas'},
      {subject:'main|grimgoblin',action:'use', object:'club',against:'assumed|Willas'},
    ],
  },
  {
    sequence:
    [
      {subject:'Axos Braveheart',action:'kill',object:'main|zombie',with:'sword'},
    ],
  },
   {
    sequence:
    [
      {subject:'Axos Braveheart',action:'kill',object:'Algoron',with:'Sword of Light'},
      {subject:'assumed|Axos Braveheart',action:'hide',object:'assumed|Sword of Light'},
    ],
  }
]