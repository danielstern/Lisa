var _stories = [
  {
    name:'1 - the one where my father gave me advice',
    sequence:
    [
      {subject:'my|father',action:'say',
        said:"Whenever you feel like criticizing any one, just remember that all the people in this world haven't had the advantages that you've had.",
        to:'me'
      }
    ]
  },
  {
    name:'2 - a generalization about my dad',
    sequence:
    [
      {
        subject:'<my|father&me>',action:'talk', howMuch:'a lot',
          context:{general:true,time:'present'}
      }
    ]
  },
]