var _stories = [
  {
    name:'the one where algoron goes to Emeraldia and kills amnon',
    sequence:
    [
      {subject:'Algoron',action:'go',object:'Emeraldia'},
      {subject:'Algoron',action:'kill',object:'Amnon'},
    ]
  },
  {
    name:'the one where algoron battles a warrior',
    sequence:
    [
      {subject:'main|warrior',action:'attack',object:'Algoron'},
      {subject:'Algoron',action:'use',object:'dark magic'},
      {rel: 'so', subject:'Algoron',action:'kill',object:'referenced|warrior'},
    ]
  },
  {
    sequence:
    [
      {subject:'main|knight',action:'attack',object:'goblin',with:'sword'},
      {rel: 'so', subject:'referenced|goblin',action:'die'}
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
      {subject:'Vix the Vile',action:'go',object:'Mount Aur',when:
        {subject:'Algoron',action:'attack',object:'emeraldia'}}
    ],
  },
  {
    sequence:
    [
      {subject:'Algoron',action:'attack',object:'Emeraldia',with:'Theoch'},
    ]
  },
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
      {subject:'Algoron',action:'attack',object:'Axos Braveheart'},
      {rel: 'so', subject:'Axos Braveheart',action:'fight',with:'Algoron'},
      {rel: 'but', subject:'Algoron',action:'use',object:'dark magic'},
      {rel: 'so', subject:'Algoron',action:'retreat',to:'Mount Aur'},
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