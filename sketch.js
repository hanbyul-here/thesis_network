
var canvasW = 500;
var canvasH = 500;

var classes = [];
var thesisLists = [];

var currIndex = 0;

function selectClass(){
    currIndex =  document.getElementById("class").value;

}

function preload(){
  
  for(var i = 1; i<12; i++){
     thesisLists.push(loadJSON("./json/"+i.toString()+".json"));
    }   

}


function setup() {

    for(var i =0; i< thesisLists.length; i++){

        classes.push(new OneClass(thesisLists[i]));
    }
    colorMode(HSB,250);
    console.log(thesisLists.length);
    smooth();
}


function draw() {

  // put drawing code here
  background(200);

  for(var i = 0; i< classes[currIndex].links.length; i++){
    
    classes[currIndex].links[i].draw();
    classes[currIndex].links[i].floating();
     
  }
  for(var i = 0; i<classes[currIndex].links.length; i++){
    classes[currIndex].links[i].checkSelected();
  }


  for(var i = 0; i < classes[currIndex].nodes.length; i++){
     for(var j = (i+1); j<classes[currIndex].nodes.length; j++){
        
        if(dist(classes[currIndex].nodes[i].pos.x,classes[currIndex].nodes[i].pos.y,classes[currIndex].nodes[j].pos.x,classes[currIndex].nodes[j].pos.y)<55){

            var tempx = classes[currIndex].nodes[i].pos.x - classes[currIndex].nodes[j].pos.x;
            var tempy = classes[currIndex].nodes[i].pos.y - classes[currIndex].nodes[j].pos.y;

            classes[currIndex].nodes[i].pos.x += (tempx/10);
            classes[currIndex].nodes[i].pos.y += (tempy/10);

        }

    }
}


  for(var i = 0; i< classes[currIndex].nodes.length; i++){
    
    classes[currIndex].nodes[i].draw();
    classes[currIndex].nodes[i].floating();
    classes[currIndex].nodes[i].showDetail();
    
  }

}



var d = canvasW*canvasW;
var idx = -1;

function mousePressed(){
    d = canvasW*canvasW;
    idx = -1;

    for(var i =0; i<classes[currIndex].nodes.length; i++){
        if( d > dist(classes[currIndex].nodes[i].pos.x,classes[currIndex].nodes[i].pos.y, mouseX,mouseY)){
            d = dist(classes[currIndex].nodes[i].pos.x,classes[currIndex].nodes[i].pos.y, mouseX,mouseY);
            idx = i;
        }
    }

    document.getElementById("detail").innerHTML = "wiawoiet";//classes[currIndex].nodes[i].pos.x,classes[currIndex].nodes[i].label;

}

function mouseDragged(){
    if(d < classes[currIndex].nodes[idx].rad){
        classes[currIndex].nodes[idx].moveNode(mouseX,mouseY);
    }
    console.log("?");

}


function Vector(_x,_y){

    this.x = _x;
    this.y = _y;

    this.add= function(v){
        this.x += v.x;
        this.y += v.y;
    }
    

    this.sub = function(v){
        this.x -= v.x;
        this.y -= v.y;
        
    }
    
}


function OneClass(thesisList){

    this.nodes = [];
    this.links = [];
    

  // put setup code here
  for(var i =0; i<thesisList.length; i++){
    this.nodes.push(new Node(thesisList[i]["First Name"],thesisList[i]["TAGS"]));
  }
  
   for(var i = 0; i < thesisList.length; i++){
     for(var j = (i+1); j<thesisList.length; j++){

        var fromTags = thesisList[i].TAGS.split(';');
        var toTags = thesisList[j].TAGS.split(';');
        var thickness = 0;
        for(var k = 0; k<fromTags.length; k++){
            for(var h = k; h<toTags.length; h++){
                if(fromTags[k] === toTags[h]){
                    this.nodes[i].point++;
                    thickness++;
                }
            }
        }
        if(thickness>0) this.links.push(new Link(this.nodes[i],this.nodes[j],thickness));
     }
   }
  
}
