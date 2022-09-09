import UI from '../../ui/lib/view/home_u';
import process from '../process';

const com = ({cat, ...props}) => {  
  //console.log("home", props)
  const args = process()
  //args.navArgs.home="/app/shop/"
  args.noTopGap=true;
  args.showFooter=true 
  args.showShopNav=false  
  //console.log("guest args", args)
  return (
    <UI {...args}></UI>
  )
}
export default com
