const INITIAL_STATE={
categories :[
{title:"miscelaneous",
id:0,
items:[
       { 
          id:1,
          title:"A Palé",
          description:"Music Video",
          src:"https://www.youtube.com/embed/gyaFZiH-aQA",
          visualizations: 1,
          difficulty:"low"
  
       },
       {
         id:2,
          title:"No te debí besar",
          description:"Music Video",
          src:"https://www.youtube.com/embed/eGuVONdX-uo",
          visualizations: 1,
          difficulty:"medium"
       }
   ]
},
{title:"ability",
 id:1,
 items:[
     { 
      id:11,
      title:"A Palé",
      description:"Music Video",
      src: "https://www.youtube.com/embed/gyaFZiH-aQA" ,
      visualizations: 1,
      difficulty:"low"

     },
     {
      id:12,
      title:"No te debí besar",
      description:"Music Video",
      src:"https://www.youtube.com/embed/eGuVONdX-uo",
      visualizations: 1,
      difficulty:"medium"
     }
 ]
}, 
{title:"height",
 id:2,
 items:[
    { 
      id:21,
      title:"A Palé",
      description:"Music Video",
      src:"https://www.youtube.com/embed/gyaFZiH-aQA",
      visualizations: 1,
      difficulty:"low"

    },
    {
      id:22,
      title:"No te debí besar",
      description:"Music Video",
      src:"https://www.youtube.com/embed/eGuVONdX-uo",
      visualizations: 1,
      difficulty:"medium"
    }
]
},
{title: "foodie",
 id:3,
 items:[
    { 
      id:31,
      title:"A Palé",
      description:"Music Video",
      src: "https://www.youtube.com/embed/gyaFZiH-aQA",
      visualizations: 1,
      difficulty:"low"

    },
    {
      id:32,
          title:"No te debí besar",
          description:"Music Video",
          src:"https://www.youtube.com/embed/eGuVONdX-uo",
          visualizations: 1,
          difficulty:"medium"
    }
]
},
{title:"dancer",
 id:4,
 items:[
    { 
      id:41,
      title:"A Palé",
      description:"Music Video",
      src: "https://www.youtube.com/embed/gyaFZiH-aQA",
      visualizations: 1,
      difficulty:"low"

    },
    {
      id:42,
      title:"No te debí besar",
      description:"Music Video",
      src:"https://www.youtube.com/embed/eGuVONdX-uo",
      visualizations: 1,
      difficulty:"medium"
    }
]
},
{title:"traveller",
 id:5,
 items:[
    { 
      id:51,
      title:"A Palé",
      description:"Music Video",
      src: "https://www.youtube.com/embed/gyaFZiH-aQA",
      visualizations: 1,
      difficulty:"low"

    },
    {
      id:52,
      title:"No te debí besar",
      description:"Music Video",
      src: "https://www.youtube.com/embed/eGuVONdX-uo",
      visualizations: 1,
      difficulty:"medium"
    }
]
}
]
}

const directoryReducer = (state =INITIAL_STATE, action)=>{
   switch (action.type){
       default:
           return state;
   }
}

export default directoryReducer;