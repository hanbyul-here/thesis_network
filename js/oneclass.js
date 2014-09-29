
function OneClass(thesisList){

    this.nodes = [];
    this.links = [];
    this.connection = 0;
    

  // put setup code here
  for(var i =0; i<thesisList.length; i++){
    this.nodes.push(new Node(thesisList[i]["First Name"],thesisList[i]["Last Name"],thesisList[i]["TAGS"]));
  }
  
   for(var i = 0; i < thesisList.length; i++){
     for(var j = (i); j<thesisList.length; j++){

        var fromTags = thesisList[i].TAGS.split(';');
        var toTags = thesisList[j].TAGS.split(';');
        var thickness = 0;
        for(var k = 0; k<fromTags.length; k++){
            for(var h = 0; h<toTags.length; h++){
                if(fromTags[k].toLowerCase() === toTags[h].toLowerCase()){
                    thickness++;
                    this.connection++;
                }
            }
        }
        if(thickness>0) this.links.push(new Link(this.nodes[i],this.nodes[j],thickness));
     }
   }
  
}
