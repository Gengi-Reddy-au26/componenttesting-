import _ from 'lodash'

let init_meta = {requirement:'', goal:'', cap:0}
let goal_options=[
  {label:"Awareness", value:'awareness', name:"goal"},
  {label:"Sales", value:'sales', name:"goal"},
  {label:"Both", value:'both', name:"goal"}      
]
let get_goal = (item) =>{
  let goal_=''
  if( item.meta && item.meta.goal){
    goal_ = _.filter(goal_options, 
        { value: item.meta.goal}
    );
    goal_= goal_[0] ? goal_[0].label : ''
  }
  return goal_
}
export {
  get_goal,
  goal_options,
  init_meta
}
