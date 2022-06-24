export const getCategoryParentFromNode = (node, findId) => {
  let ref = []
  if (node['_id'] === findId){
    return [{'_id': node['_id'], 'name':node['name']}]
  }
  if (( node.subCategories) && (node.subCategories.length > 0)){
    for (let child of node.subCategories){
      ref = getCategoryParentFromNode(child, findId) || [];
      if (ref.length>0){
        ref.push({'_id': node['_id'], 'name':node['name']})
        return ref;
      }
    }
  }
  return ref;
}

export const getCategoryParentFromTree = ({findId, categories=[]}) =>{
  for(let category of categories){
    let result = getCategoryParentFromNode(category, findId) || [];
    if(result.length > 0){
      return result.reverse()
    }
  }
  return []
}
export const getCategoryChildren = (categories, categoryId) =>{
  let category = categories.filter((c)=>c._id===categoryId)
  if(category.length === 0){
    return [];
  }else{
    category = category[0];
  }
  let coll = [];
  coll.push(category._id);
  for(let sub_category of category.subcategories){
    let sub = getCategoryChildren(categories, sub_category);
    coll = coll.concat(sub)
  }
  return coll
}
