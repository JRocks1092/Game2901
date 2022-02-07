class PlayerBase{
    constructor(x, y, name, color) {
        this.id = null;
        this.name = name;     
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = 50;
        this.height = 50;
    }    

    display() {        
        fill(this.color);
        rect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        noFill();
    }
}