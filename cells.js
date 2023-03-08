class Cell{
    
    constructor(index, x, y){
        this.x = x;
        this.y = y;
        this.index = index
        this.available = {
            "left":[],
            "up":[],
            "right":[],
            "bottom":[]
        }
        this.neighbors = {
            "left": [true, 0],
            "up":[true, 0],
            "right":[true, 0],
            "bottom":[true, 0]
        }
        this.isCollapsed = false;
    }

    collapsed(img, edges){
        this.img = img;
        this.isCollapsed = true;
        console.log(this.index, this.x, this.y)
        if(this.neighbors["left"][0] == true){
            this.neighbors["left"][1] = this.index-1;
            cells[this.index-1].available["right"] = [edges[0]]
        }
        if(this.neighbors["up"][0] == true){
            this.neighbors["up"][1] = this.index-cols;
            cells[this.index-cols].available["bottom"] = [edges[1]]
        }
        if(this.neighbors["right"][0] == true){
            this.neighbors["right"][1] = this.index+1;
            cells[this.index+1].available["left"] = [edges[2]]
        }
        if(this.neighbors["bottom"][0] == true){
            this.neighbors["bottom"][1] = this.index+cols
            cells[this.index+cols].available["up"] = [edges[3]]
        }
        
    }

    show(){
        if(this.isCollapsed == false){
            rect(this.x * DIM, this.y * DIM, DIM, DIM);
        }
        else{
            
            image(this.img, this.x * DIM, this.y * DIM, DIM, DIM);
        }
    }
}