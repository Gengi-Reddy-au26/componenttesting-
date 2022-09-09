const com = (status) => {   
  const data={
    failed:'Failed',
    pending:'Pending',
    awaiting_processing:'Awaiting Processing',
    delivered:'Delivered',
    paid:'Paid',
  }
  
  return data[status] ? data[status] : status
}
export default com
