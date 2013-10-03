var _EmilyStories = [
  {
    name:'the one where I buy things',
    emotions:{pleasure:6},
    sequence:[
    {
      subject:'the|time',action:'is', object:'3:00',
    },
    {
      subject:'I',action:'is', at:"the|mall",
    },
    {
      subject:'I',action:'arrive', at:"Lexy's",
    },
    {
      subject:'I',action:'look', at:"$red|shoes$",
    },
    ],
  },
  {
    name:'the one about Lexys',
    emotions:{pleasure:1,excitement:1},
    sequence:[
    {
      subject:'$many:shoes$', action:'is', at:"Lexy's",context:{general:true}
    },
    {
      subject:"assumed|Lexy's", action:'is', object:"Shoe Store",context:{time:'present'}
    },
    {
       subject:"shoes", action:'is', object:"pretty",context:{general:true}
    }
  ],
  },  
  {
    name:'the one where I look in the safe',
    emotions:{fear:3,anxiety:6},
    sequence:[
    {
      subject:'the|time',action:'is', object:'4:30',
    },
    {
      subject:'I',action:'arrive', at:"Emily's Convenience",
    },
    {
      subject:'I', action:'look', in:'the|safe',
    },
    {
      subject:'there', action: 'is', object:'$no:money$',

    },
    {
      subject:'the|money', action:'is', object:'missing',
    },
    ],
  },
  {
  name:'the one where I get to mall',
  emotions:{please:2,anxiety:1},
  sequence:[
  {
    subject:'the|time',action:'is', object:'2:30', relevance:'context'
  },
  {
    subject:'I',action:'arrive', at:'the|mall',
  },
  {
    subject:'assumed|mall',action:'is', object:'sunny',
  },
  {
    subject:'there',action:'is', object:'$few:people$',
  },
  ],
},
]