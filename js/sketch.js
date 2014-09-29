
var canvasW = window.innerWidth*8/10;
var canvasH = window.innerHeight-250;

var classes = [];
var thesisLists = [];

var currIndex = 0;

var defLeft  = 30;
if(window.innerWidth >768) var defTop  = 200;
else var defTop = 300;

var moved = false;

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


window.onmousedown = function(event){

    var pmouseX = event.clientX - defLeft;
    var pmouseY = event.clientY - defTop;

    if( pmouseX > 0 && pmouseX < canvasW && pmouseY > 0 && pmouseY <canvasH){
      

      d = canvasW*canvasW;
      idx = -1;

      for(var i =0; i<classes[currIndex].nodes.length; i++){
        if( d > dist(classes[currIndex].nodes[i].pos.x,classes[currIndex].nodes[i].pos.y, pmouseX,pmouseY)){
            d = dist(classes[currIndex].nodes[i].pos.x,classes[currIndex].nodes[i].pos.y, pmouseX,pmouseY);
            idx = i;
          }
      }

      if(d < classes[currIndex].nodes[idx].rad){
      
      //put site link for selected student 
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
    moved = true;
  }
}


window.onmouseup = function(){
  moved = false;
}



window.onmousemove = function(e){
    
    if(moved === true){
      if(d < classes[currIndex].nodes[idx].rad){
        classes[currIndex].nodes[idx].moveNode(pmouseX,pmouseY);
      }
  }
}




