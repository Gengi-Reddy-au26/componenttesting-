import Slate from './slate';
import Input from '../../input2';
import Select from '../../select';

import {get_thumb_src} from '../../get/image';

let ThumbImage=(i)=>{  
  let {src='', path='', tr} = i 
  let src_=get_thumb_src({src, path, tr})  
  let out=(<div className={"bg-cover bg-center rounded-lg"} style={{backgroundImage:'url("'+src_+'")', width:'120px', height:'120px'}}></div>)
  return out
}  

export{
  ThumbImage
}