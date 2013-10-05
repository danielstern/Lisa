define("story/stories", [], function() {
  return [  {    name:'the one where I buy things',
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
      subject:'I',action:'look', at:"$red:shoes$",
    },
    ],
  },
  {
    name:'the one about Lexys',
    emotions:{pleasure:1,excitement:1},
    sequence:[
    {
      subject:'$many:shoes$', action:'is', at:"Lexy's",general:true
    },
    {
       subject:"shoes", action:'is', object:"pretty",general:true
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
  emotions:{pleasure:2,anxiety:1},
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
  {
  name:'the one where I eat lunch',
  emotions:{pleasure:3,anxiety:1},
  sequence:[
  {
    subject:'the|time',action:'is', object:'3:30', relevance:'context'
  },
  {
    subject:'I',action:'is', at:'the|mall', relevance:'context'
  },
  {
    subject:'I',action:'eat', object:'lunch',
  },
  {
    subject:'I',action:'read', object:'novel',
  },
  {
    subject:'man',action:'run', past:'me',
  },
  {
    subject:'assumed|man',action:'look', like:'biker',
  },
  ],
},
  {
  name:'the one about the biker',
  emotions:{fear:1,anxiety:2},
  sequence:[
  {
    subject:'the|biker', action:'is', object: 'white'
  },
  {
    subject:'assumed|biker', action:'is', object: 'tall'
  },
  {
    subject:'assumed|biker', action:'have', object: 'tattoo'
  },
  ],
},
{
  name:'the one about the tattoo',
  emotions:{curiosity:2},
  sequence:[
  {
    subject:'the|biker', action:'have', object: 'tattoo', on:'his|arm'
  },
  {
    subject:"biker's|tattoo", action:'is', object: '$smiling:mermaid$'
  },
  {
    subject:'assumed|tattoo', action:'is', object: '<blue&green>'
  },
  ],
},
]
})