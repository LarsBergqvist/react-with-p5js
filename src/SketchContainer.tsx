import p5 from 'p5';
import React from 'react';

type coord = {
    x: number,
    y: number
}
//
// Segment sketch adapted from: https://p5js.org/examples/interaction-follow-3.html
//
class SketchContainer extends React.Component {
    private myRef: any;
    private rot: number;
    private scale: number;

    private x: number[] = [];
    private y: number[] = [];
    private figure: coord[] = [];
    private readonly segNum = 50;
    private readonly segLength = 20;

    constructor(props: any) {
        super(props);
        for (let i = 0; i < this.segNum; i++) {
            this.x[i] = 0;
            this.y[i] = 0;
          }          
        this.myRef = React.createRef();
        this.figure[0]={x: 100, y: 120};
        this.figure[1]={x: 200, y: 120};
        this.figure[2]={x: 200, y: 220};
        this.figure[3]={x: 100, y: 220};
        this.figure[4]={x: 150, y: 170};
        this.figure[5]={x: 100, y: 120};
        this.rot = 0;
        this.scale = 1;
    }
      
    Sketch = (p:p5) => {
        p.setup = () => {
            p.createCanvas(710, 400);
        };

        p.draw = () => {
            p.background(0);

            p.strokeWeight(9);
            p.stroke(255, 200, 100, 100);

            const centX = 100;
            const centY = 120;
            const fig = this.figure;
            for(let i = 0; i < (fig.length-1); i++) {
                //
                // Draw original static figure
                //
                let p1x = fig[i].x;
                let p1y = fig[i].y;
                let p2x = fig[i+1].x;
                let p2y = fig[i+1].y;
                p.line(p1x, p1y, p2x, p2y);

                //
                // Create and draw a figure rotated and scaled around the top left
                // Use manual calculations as an exercise
                //
                const scale = p.abs(p.sin(this.scale));
                p1x = p1x - centX;
                p1y = p1y - centY;
                p2x = p2x - centX;
                p2y = p2y - centY;
                const a = this.rot * 3.14 / 180;
                const pp1x = scale * (p1x * p.cos(a) - p1y*p.sin(a)) + centX;
                const pp1y = scale * (p1x * p.sin(a) + p1y*p.cos(a)) + centY;
                const pp2x = scale * (p2x * p.cos(a) - p2y*p.sin(a)) + centX;
                const pp2y = scale * (p2x * p.sin(a) + p2y*p.cos(a)) + centY;
                p.line(pp1x, pp1y, pp2x, pp2y);
            }
            this.rot ++;
            this.scale += 0.05;

            p.strokeWeight(9);
            p.stroke(255, 100);

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
        new p5(this.Sketch, this.myRef.current);
    }

    render() {
        return(
            <div ref={this.myRef}>
            </div>
        )
    }
}

export default SketchContainer;
