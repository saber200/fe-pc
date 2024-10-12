export enum Actions{
  updateUser,
  updateApp,
  updateEditApp
}

export const UpdateUser =(data:any)=>{
  return {
    type:Actions.updateUser,
    data:data
  }
}
export const UpdateApp =(data:any)=>{
  return {
    type:Actions.updateApp,
    data:data
  }
}


export const UpdateEditApp  = (data:any)=>{
  return {
    type:Actions.updateEditApp,
    data:data
  }
}

