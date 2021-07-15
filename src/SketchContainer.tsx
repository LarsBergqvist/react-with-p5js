import p5 from 'p5';
import React from 'react';

//
// Adapted from: https://p5js.org/examples/interaction-follow-3.html
//
class SketchContainer extends React.Component {
    private myRef: any;
    private myP5: any;

    private x: number[] = [];
    private y: number[] = [];
    private readonly segNum = 50;
    private readonly segLength = 8;
    constructor(props: any) {
        super(props);
        for (let i = 0; i < this.segNum; i++) {
            this.x[i] = 0;
            this.y[i] = 0;
          }          
        this.myRef = React.createRef();
    }
      
    Sketch = (p:p5) => {
        p.setup = () => {
            p.createCanvas(710, 400);
            p.strokeWeight(9);
            p.stroke(255, 100);
        };

        p.draw = () => {
            p.background(0);
            const seg = (x: number, y: number, a: number) => {
                p.push();
                p.translate(x, y);
                p.rotate(a);
                p.line(0, 0, this.segLength, 0);
                p.pop();                   
            }
            const dragSegment = (i:number, xin:number, yin:number) => {
                const dx = xin - this.x[i];
                const dy = yin - this.y[i];
                const angle = p.atan2(dy, dx);
                this.x[i] = xin - p.cos(angle) * this.segLength;
                this.y[i] = yin - p.sin(angle) * this.segLength;
                seg(this.x[i], this.y[i], angle);
            }

            dragSegment(0, p.mouseX, p.mouseY);
            for (let i = 0; i < this.x.length - 1; i++) {
              dragSegment(i + 1, this.x[i], this.y[i]);
            }
        };
    }

    componentDidMount() {
        this.myP5 = new p5(this.Sketch, this.myRef.current);
    }

    render() {
        return(
            <div ref={this.myRef}>
            </div>
        )
    }
}

export default SketchContainer;
