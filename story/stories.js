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
        rel:'then', subject:'Jill',action:'fall', down:"referenced|hill",too:{}
      }
    ]
  },

  {
    name:'2 - the one where i got burned',
    sequence:
    [
      {
        subject:'i',action:'is', object:"fast"
      },
      {
        subject:'i',action:'jump', over:"candlestick"
      },
      {
        rel:'but',subject:'referenced|candlestick',action:'burn', object:'me'
      },
    ]
  },
  {
    name:'3 - the one i heard about the muffin man',
    sequence:
    [
      {
        subject:'Muffin Man',action:'reside', in:"Drury Lane",context:{time:'present'}
      },
    ]
  },
  {
    name:'I - the one with the beanstalk',
    epic:
    [
      {
        name:'I-1 - the one with my mom',
        sequence:
        [
          {
             subject:'my|mother',action:'is', object:'poor',
          },
          {
            subject:'my|mother',action:'have', object:'cow',
          },
          {
             subject:'$name:referenced|cow$',action:'is', object:'Milky-White'
          },
          {
             subject:'referenced|cow',action:'give', object:'milk'
          },
          {
             subject:'<me&my|mother>',action:'bring', object:'referenced|milk',to:'market'
          },
          {
             rel:'then',subject:'referenced|cow',action:'give', object:'$no:milk$'
          }
        ]
      },
    ]
  },
]