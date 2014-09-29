
function Node(_label,_lastname,_tags){

    this.label = _label;
    this.name = _label + _lastname;
    this.rad = 50;
    this.pos = new Vector(random(50,canvasW-50),random(50,canvasH-50));

    this.speed = new Vector(random(-3,3),random(-3,3));
    this.fillColor = 100;
    this.selected = false;
    this.halfSelected = false;
    this.point = 0;
    this.tags = _tags;

    this.dx = 0;
    this.dy = 0;

    this.place = function(_x,_y){
        this.pos.x = _x;
        this.pos.y = _y;
    }
   
    this.draw = function(){
        

        if(this.selected){
            this.fillColor = 255;

        }else if(this.halfSelected){
            this.fillColor = 180;

        }else{
            this.fillColor = 120;
        }
        fill(currIndex*20+5,200,200,this.fillColor);
        strokeWeight(0);
        
        ellipse(this.pos.x,this.pos.y,this.rad,this.rad);    
        
        textAlign(CENTER);
        strokeWeight(1);
        stroke(0);
        text(this.label,this.pos.x,this.pos.y+3);

    }

    this.floating = function(){

        this.pos.x += constrain(this.dx, -5, 5);
        this.pos.y += constrain(this.dy, -5, 5);
        constrain(this.pos.x ,50,canvasW-50);   
        constrain(this.pos.y ,50,canvasH-50);   
        this.dx /=2;
        this.dy /=2;
       
    }

    this.moveNode = function(_x,_y){
        this.pos.x = _x;
        this.pos.y = _y;
        constrain(this.pos.x ,50,canvasW-50);   
        constrain(this.pos.y ,50,canvasH-50);   
    }


    this.showDetail = function(_x,_y){
        if(dist(this.pos.x,this.pos.y,_x,_y)<this.rad){
            this.fillColor =255;
            this.selected = true;

        }
        else{
            this.fillColor = 100;
            this.halfSelected = false;
            this.selected = false;
        }
    }
    this.getSelected = function(){
        return this.selected;
    }

    this.indirectSelect = function(){
        this.halfSelected = true;
        
    }
    this.notSelected = function(){
        this.halfSelected = false;
        
    }
}
