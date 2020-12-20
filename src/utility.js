export const randomId = (range)=>{
  const alphaArr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  let uniqueId = '';
  for(let i=1; i<=range; i++){
      uniqueId = uniqueId + alphaArr[Math.floor(Math.random()*alphaArr.length)] 
  }
  return uniqueId;
}
