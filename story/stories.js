var _stories = [
    {
    name:'1 - the one where i go up the hill',
    sequence:
    [
      {
      	subject:'i',action:'need', object:"water"
      },
      {
        subject:'i',action:'go', to:"$top:hill$"
      },
      {
        subject:'i',action:'fall', down:"referenced|hill"
      },
      {
        subject:'i',action:'is', object:"hurt"
      },
      {
        rel:'then', subject:'Jill',action:'fall', down:"referenced|hill"
      }
    ]
  },
]