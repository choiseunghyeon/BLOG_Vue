export default {
  categoryStructure: function(data){
    let categoryItems = data.filter(val => val.parent == null);
    // in ascending order
    categoryItems.sort((a, b) => a.location - b.location)
    //rootCategory안에 childCategory 넣고 location기준 in ascending order
    for (var i = 0; i < categoryItems.length; i++) {
      categoryItems[i].items = data.filter(val => val.parent == categoryItems[i].id)
      categoryItems[i].items.sort((a,b) => a.location - b.location)
    }
    return categoryItems;
  },
}
