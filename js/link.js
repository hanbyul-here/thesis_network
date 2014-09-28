
function Link(_from,_to,thickness){
    
    this.from = _from;
    this.to = _to;
    this.thickness = thickness;
    
    this.draw = function(){
        stroke(250);
        strokeWeight(thickness*3);
        line(this.from.pos.x,this.from.pos.y,this.to.pos.x,this.to.pos.y);
       }

    this.floating = function() {

        var vx = this.to.pos.x - this.from.pos.x;
        var vy = this.to.pos.y - this.from.pos.y;
        var d = mag(vx, vy);
        
        //console.log(vx);
        
        if ( d>220) {
            var f = (200-d)/(d*55);
            var dx = f*vx;
            var dy = f*vy;
            

      // if(abs(vx) < to.center*5 && abs(vy) < to.center*5 ){
        this.to.dx += dx;
        this.to.dy += dy;
        this.from.dx -= dx;
        this.from.dy -= dy;
    }
    //}
  }

    this.drawScore = function(){
        stroke(0);

        strokeWeight(1);

        
        textAlign(CENTER);
        text(thickness.toString(),(this.from.pos.x + this.to.pos.x)/2,(this.from.pos.y + this.to.pos.y)/2
            );
   
    }
    this.checkSelected = function(){
        if(this.from.getSelected()){
            this.to.indirectSelect();
            this.drawScore();
            
            
        }
        if(this.to.getSelected()){
            this.from.indirectSelect();
            this.drawScore();
            
        }
        if(!this.from.getSelected() && !this.to.getSelected){
            this.from.notSelected();
            this.to.notSelected();
            
        }
    }
}