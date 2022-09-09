

const args={
  home:'/',
  influencerHome:'/app/shop',
  logoText:"platovise",  
  logoImg:"/Logo_Beta.svg",
  fullWidth:false,
  items:[],
  guestItems:[
    {label:"For Businesses", to:"/business"},
    {label:"For Influencers", to:"/influencer"}
  ],
  userItems:[
    {label:"Feedback", to:"/app/feedback"},
  ],
  newUserItems:[
    {label:"OnBoarding", to:"/onboarding"},
  ],
  influencerItems:[     
    {label:"Home", to:"/"},
    {label:"Shop", to:"/app/shop"},
    {label:"Collaborations", to:"/app/collab", match:["/app/collab/[id]"]},
    {label:"Dashboard", to:"/app"},   
  ],
  businessItems:[    
    {label:"Dashboard", to:"/app"}, 
    {label:"Collaborations", to:"/app/collab", match:["/app/collab/[id]"]},   
    {label:"Sales", to:"/app/sales", match:["/app/sales/[id]"]},    
    {label:"Inventory", to:"/app/inventory", match:["/app/inventory/[id]"]},
    
  ],
  adminItems:[    
    {label:"Dashboard", to:"/admin/dashboard"}, 
    {label:"Requests", to:"/admin/collab_requests"}, 
    {label:"Transactions", to:"/admin/transactions"}, 
  ],
  actionHref:"https://forms.office.com/pages/responsepage.aspx?id=ZL06m637OUKL3qOWmfbjrFlWJL_UNG5CgeD-Wga83EZURUJJSTgwQjE3MU40VVlJRzFCOUs5WlFOMSQlQCN0PWcu",  
  isLogged: false,
}
export default args
