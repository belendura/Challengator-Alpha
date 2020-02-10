export const addChallenge = (challengeItems, challengeItemToAdd)=>{
   
    let existingIdInstance= false;
    let idInstance =0;

  do{

    existingIdInstance= false;
    idInstance = parseInt(Math.random() * 1000);
   
    if (challengeItems.find(
        challengeItem=> challengeItem.idInstance === idInstance))
        existingIdInstance= true;
        
    }
   while(existingIdInstance);

        const createdAt= new Date();
        return [...challengeItems, {...challengeItemToAdd,  idInstance: idInstance, createdAt:createdAt, status:"pending"}];   

};

export const removeChallenge = (challengeItems, challengeItemToRemove)=>{

    const existingChallengeItem= challengeItems.find(
        challengeItem=> challengeItem.idInstance ===challengeItemToRemove.idInstance)
 
     return challengeItems.filter(challengeItem => challengeItem.idInstance !== challengeItemToRemove.idInstance)

}