class Snake {
    constructor() {
        this.body=[];
        this.body[0]=createVector(floor(w/2), floor(h/2)).mult(rez);
        this.xdir=0;
        this.ydir=0;
        this.len=1;
    }
    setDir(x, y) {
        this.xdir=x;
        this.ydir=y;
    }
    update() {
        let head=this.body[this.body.length-1].copy();
        this.body.shift();
        head.x+=this.xdir*rez;
        head.y+=this.ydir*rez;
        this.body.push(head);
        fill(0);
        noStroke();
        this.body.forEach(v => rect(v.x, v.y, rez, rez));
    }
    eat(pos) {
        let head=this.body[this.body.length-1];
        if(head.x!=pos.x||head.y!=pos.y) return false;
        head=head.copy();
        this.len++;
        this.body.push(head);
        return true;
    }
    gameOver() {
        let head=this.body[this.body.length-1];
        if(head.x<0||head.x>=width||head.y<0||head.y>=height) return true;
        for(let i=0;i<this.body.length-1;i++) {
            if(head.equals(this.body[i])) return true;
        }
        return false;
    }
}