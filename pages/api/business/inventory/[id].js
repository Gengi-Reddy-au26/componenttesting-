import single from '../../../../process_api/business/inventory/single'
export default async function handler(req, res) {  
  const { id } = req.query  
  const data=await single({id})
  res.status(200).json(data);
}
