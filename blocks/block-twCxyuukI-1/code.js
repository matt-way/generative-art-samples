import p5 from 'p5'

export const run = (state, { domRoot, io }) => {
  
  io.width = domRoot.clientWidth
  io.height = 500
  
  // setup sketch instance
  io.p5 = new p5(s => {	
  	io.s = s

  	s.setup = function() {
      const { CENTER, NORMAL, WEBGL } = s
      
	    s.createCanvas(io.width, io.height, WEBGL)
    	s.noLoop()
      s.smooth(8)
      s.rectMode(CENTER)
      s.pixelDensity(2)
      s.noFill()
      s.stroke(250, 50, 200)
  		s.strokeWeight(3)
  		s.ortho()
      s.noFill()
    }
	}, domRoot)	
}

export const update = (state, { io, timeRunning }) => {
	const { s, width, height } = io 
  const { HALF_PI, PI, TWO_PI, QUARTER_PI, CLOSE } = s
  
  const numFrames = 350
  const t = (timeRunning/(20.0*numFrames))%1
  
  const mn = .5 * s.sqrt(3)
  const ia = s.atan(s.sqrt(0.5))
  
  var x, y, z, tt
	var N = 240
	var R = 75, r, th
  var ee = 3

  function ease(p, g) {
  	if (p < 0.5) {
	    return 0.5 * s.pow(2*p, g)
	  } else {
	    return 1 - 0.5 * s.pow(2*(1 - p), g)
		}
  }  
  
  function thing(q) {
  	s.beginShape()
  	for (var i=0; i<N; i++) {
    	th = TWO_PI*i/N
    	r = s.lerp(R*s.cos(QUARTER_PI)/s.cos(((th+QUARTER_PI)%HALF_PI)-QUARTER_PI), R*s.lerp(s.sqrt(.5), 1, .5), q)
    	s.vertex(r*s.cos(th), r*s.sin(th))
  	}
  	s.endShape(CLOSE)
	}	
  
  function things() {
  	if (t <= .5) {
    	for (var i=-4; i<5; i++) {
      	for (var j=-4; j<5; j++) {
        	s.push()
        	s.translate(s.sqrt(2)*i*R, s.sqrt(2)*j*R)
        	if ((i+j)%2 == 0)
          	thing(ease(s.map(s.cos(TWO_PI*2*t),1,-1,0,1),ee));
        	s.pop()
      	}
    	}
  	}
  	else {
    	for (var i=-4; i<5; i++) {
      	for (var j=-4; j<5; j++) {
	        s.push()
        	s.translate(s.sqrt(2)*i*R, s.sqrt(2)*j*R)
        	if ((i+j)%2 != 0)
          	thing(ease(s.map(s.cos(TWO_PI*2*t),1,-1,0,1),ee))
        	s.pop()
      	}
    	}
  	}
	}
  
  s.background(15)
  s.push()  
  s.stroke(250)
  s.strokeWeight(10)
  things()
  
  s.stroke(15)
  s.strokeWeight(5)
  s.push()
  s.translate(0,0,1)
  things()
  s.pop()
  s.pop()
}
