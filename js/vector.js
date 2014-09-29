
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