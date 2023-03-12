class Snowflake
{
    constructor(sx,sy,sprite)
    {
        let x = sx || random(width);
        let y = sy || random(-100, -10);
        this.sprite = sprite;
        //this.randomize();
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.acc = createVector();
        this.r = this.getRandomSize();
        this.angle = random(TWO_PI);
        this.dir = (random(1) > 0.5) ? 1 : -1;
        this.xOffset = 0;

    }

    applyForce( force )
    {
        // Parallax Effect Hack
        let f = force.copy();
        f.mult( this.r );
        this.acc.add( f );
    }

    randomize()
    {
        let x = random(width);
        let y = random(-100, -10);
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.acc = createVector();
        this.r = this.getRandomSize();
    }

    getRandomSize()
    {
        let r = pow( random(0.5,1), 9 );
        return constrain(r *32, 2, 32);
    }

    update()
    {

        this.xOffset = sin( this.angle * 2 ) * 2 * this.r ;
        
        this.vel.add( this.acc );
        this.vel.limit(this.r * 0.2 );

        if ( this.vel.mag() < 1 )
        {
            this.vel.normalize();
        }
        
        this.pos.add( this.vel );
        this.acc.mult(0)
        // Move on top again if fall out of screen
        if ( this.pos.y > height + this.r)
        {
            this.randomize();
        }
        //Wrapping left & right
        if ( this.pos.x < -this.r )
        {
            this.pos.x = width + this.r;
        }
        if ( this.pos.x > width + this.r )
        {
            this.pos.x = -this.r;
        }


        this.angle += this.dir * this.vel.mag() / 300;
    }

    render()
    {
        push();
        translate( this.pos.x + this.xOffset, this.pos.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(this.sprite, 0, 0 , this.r, this.r );
        pop();
        /*stroke(255);
        strokeWeight(this.r);
        point( this.pos.x, this.pos.y);*/
    }

}