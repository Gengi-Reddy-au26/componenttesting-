const getTreshold = (i, tresholds=[]) => {   
  let treshold=_.filter(tresholds, ['id', i.influencer_id]) 
  i.influencer=i.influencer2
  i.treshold=treshold[0] ? treshold[0] : {}  
  return i
}
export {
  getTreshold
}
