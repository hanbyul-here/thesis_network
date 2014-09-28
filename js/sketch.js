
var canvasW = window.innerWidth*8/10;
var canvasH = window.innerHeight-250;

var classes = [];
var thesisLists = [];

var currIndex = 0;

var defLeft  = 30;
var defTop  = 180;

function selectClass(){
  

    currIndex =  document.getElementById("class").value;
    document.getElementById("class_detail").innerHTML = "Total connection : " + classes[currIndex].connection;

    document.getElementById("student_name").innerHTML = "Choose a student"; 
    document.getElementById("tags").innerHTML = ""; 

}

function preload(){
  
  for(var i = 1; i<11; i++){
     thesisLists.push(loadJSON("./json/"+i.toString()+".json"));
    }   
}


function setup() {

    createCanvas(canvasW,canvasH);


    for(var i =0; i< thesisLists.length; i++){

        classes.push(new OneClass(thesisLists[i]));
    }
    colorMode(HSB,250);
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
     for(var j = i; j<classes[currIndex].nodes.length; j++){
        
        if(dist(classes[currIndex].nodes[i].pos.x,classes[currIndex].nodes[i].pos.y,classes[currIndex].nodes[j].pos.x,classes[currIndex].nodes[j].pos.y)<55){

            var tempx = classes[currIndex].nodes[i].pos.x - classes[currIndex].nodes[j].pos.x;
            var tempy = classes[currIndex].nodes[i].pos.y - classes[currIndex].nodes[j].pos.y;

            classes[currIndex].nodes[i].pos.x += (tempx/10);
            classes[currIndex].nodes[i].pos.y += (tempy/10);


            classes[currIndex].nodes[j].pos.x -= (tempx/10);
            classes[currIndex].nodes[j].pos.y -= (tempy/10);

        }

    }
}


  for(var i = 0; i< classes[currIndex].nodes.length; i++){
    
    classes[currIndex].nodes[i].draw();
    classes[currIndex].nodes[i].floating();
    classes[currIndex].nodes[i].showDetail();
    
  }

}

var d = 1000;
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


    if(d < classes[currIndex].nodes[idx].rad){
      
      var urlname =  classes[currIndex].nodes[idx].name.replace(" (","-");
      urlname =  urlname.replace(". ","-");
      urlname =  urlname.replace(") ","-");
      urlname =  urlname.replace(" ","-");

      
      document.getElementById("student_name").innerHTML = "<a href= \"http://itp.nyu.edu/shows/thesis2014/"+urlname+"\" target = \"_new\">"+
      classes[currIndex].nodes[idx].name+"</a>"; 

     var links = document.getElementsByTagName("a");
      
       for(i=0; i<links.length;i++) {
        var col = (currIndex*20+5)*1.5;
        links[i].style.color = "hsl("+col+",50%,50%)";
      }
  


      var ts = classes[currIndex].nodes[idx].tags.split(';');
      var tagshtml = "";
      for(var i =0; i<ts.length; i++){
        tagshtml +=ts[i];
        tagshtml+="<br>";
      }


      document.getElementById("tags").innerHTML = tagshtml;
    
    }

}



function touchStarted(){
    d = canvasW*canvasW;
    idx = -1;

    for(var i =0; i<classes[currIndex].nodes.length; i++){
        if( d > dist(classes[currIndex].nodes[i].pos.x,classes[currIndex].nodes[i].pos.y, ptouchX-defLeft,ptouchY-defTop)){
            d = dist(classes[currIndex].nodes[i].pos.x,classes[currIndex].nodes[i].pos.y, ptouchX-defLeft,ptouchY-defTop);
            idx = i;
        }
    }


    if(d < classes[currIndex].nodes[idx].rad){
      
      var urlname =  classes[currIndex].nodes[idx].name.replace(" (","-");
      urlname =  urlname.replace(". ","-");
      urlname =  urlname.replace(") ","-");
      urlname =  urlname.replace(" ","-");

      
      document.getElementById("student_name").innerHTML = "<a href= \"http://itp.nyu.edu/shows/thesis2014/"+urlname+"\" target = \"_new\">"+
      classes[currIndex].nodes[idx].name+"</a>"; 

     var links = document.getElementsByTagName("a");
      
       for(i=0; i<links.length;i++) {
        var col = (currIndex*20+5)*1.5;
        links[i].style.color = "hsl("+col+",50%,50%)";
      }
  


      var ts = classes[currIndex].nodes[idx].tags.split(';');
      var tagshtml = "";
      for(var i =0; i<ts.length; i++){
        tagshtml +=ts[i];
        tagshtml+="<br>";
      }


      document.getElementById("tags").innerHTML = tagshtml;
    
    }
    
}

function mouseDragged(){


    if(d < classes[currIndex].nodes[idx].rad){
        classes[currIndex].nodes[idx].moveNode(mouseX,mouseY);
    }

}

function touchMoved(){


    if(d < classes[currIndex].nodes[idx].rad){
        classes[currIndex].nodes[idx].moveNode(ptouchX-defLeft,ptouchY-defTop);
    }

}
function touchEnded(){
      if(d < classes[currIndex].nodes[idx].rad){
        classes[currIndex].nodes[idx].moveNode(ptouchX-defLeft,ptouchY-defTop);
    }
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
