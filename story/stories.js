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
    name:'3 - the one where i heard about the muffin man',
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
        name:'I-1 - the one where the cow stops giving milk',
        sequence:
        [
          {
             subject:'my|mother',action:'is', object:'poor',
          },
          {
            subject:'assumed|mother',action:'have', object:'cow',
          },
          {
             subject:'$name:referenced|cow$',action:'is', object:'Milky-White'
          },
          {
             subject:'referenced|cow',action:'give', object:'milk'
          },
          {
             subject:'<me&my|mother>',action:'bring', object:'referenced|milk',to:'market',when:'every day'
          },
          {
             rel:'then',subject:'referenced|cow',action:'give', object:'$no:milk$'
          }
        ]
      },
      {
        name:'I-2 - the one where my mother and I talk',
        sequence:
        [
          {
            subject:'my|mother',action:'say', 
              said:'What shall we do, what shall we do?',
              to:'me'
          },
          {
             subject:'my|mother',action:'wring', object:'her|hands'
          },
          {
             subject:'i',action:'say', 
               said:"Cheer up, mother, I'll go and get work somewhere.",
               to:'assumed|mother'
          },
          {
          subject:'my|mother',action:'say', 
               said:"We've tried that before, and nobody would take you. We must sell Milky-white and with the money start a shop, or something.",
               to:'me'
          },
          {
             subject:'i',action:'say', 
               said:"All right, mother. It's market-day today, and I'll soon sell Milky-white, and then we'll see what we can do.",
               to:'assumed|mother'
          },
        ]
      },
      {
        name:'I-3 - the one where we meet the old man',
        sequence:
        [
          {
            subject:'<me&referenced|cow>',action:'is', what:'going', to:'market',
          },
        ]
      },
    ]
  },
]