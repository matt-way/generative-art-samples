import p5 from 'p5'

export const run = (state, { domRoot, io }) => {
  // setup sketch instance
  io.p5 = new p5(sketch => {	
  	io.sketch = sketch

  	sketch.setup = function() {
	    sketch.createCanvas(domRoot.clientWidth, 400)
    	sketch.noLoop()
	  }
	}, domRoot)	
}

export const update = (state, { io }) => {
	const { sketch } = io
  
  sketch.draw = () => {
  	sketch.background(255)
		sketch.fill(0,200,200)
  	const x = Math.floor(io.x * 100)
  	const y = Math.floor(io.y * 100)
		sketch.rect(x,y,50,50)  
  }
  sketch.redraw()
}