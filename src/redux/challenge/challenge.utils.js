export const addChallenge = (challengeItems, challengeItemToAdd)=>{
    console.log("challengeItems",challengeItems);
    console.log("challengeItemToAdd",challengeItemToAdd);
    let existingIdInstance= false;
    let idInstance =0;

  do{

    existingIdInstance= false;
    idInstance = parseInt(Math.random() * 1000);
    console.log("idInstance",idInstance);

    if (challengeItems.find(
        challengeItem=> challengeItem.idInstance === idInstance))
        existingIdInstance= true;
        console.log("idInstance repeated",idInstance);
    }
   while(existingIdInstance);

        return [...challengeItems, {...challengeItemToAdd,  idInstance: idInstance}];   

};

export const removeChallenge = (challengeItems, challengeItemToRemove)=>{

    const existingChallengeItem= challengeItems.find(
        challengeItem=> challengeItem.idInstance ===challengeItemToRemove.idInstance)
 
     return challengeItems.filter(challengeItem => challengeItem.idInstance !== challengeItemToRemove.idInstance)

}