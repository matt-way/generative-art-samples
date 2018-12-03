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
      s.stroke(255)
  		s.strokeWeight(2.5)
  		s.ortho()
	  }
	}, domRoot)	
}

export const update = (state, { io }) => {
	const { s, width, height } = io 
  const { HALF_PI, PI, TWO_PI } = s
  
  const numFrames = 250
  const t = (s.millis()/(20.0*numFrames))%1
  
  const mn = .5 * s.sqrt(3)
  const ia = s.atan(s.sqrt(0.5))
  
  const N = 240 // verts
  const l = 180 // length
  const maxTwist = io.maxTwist * 40
  
  function ease(p, g) {
  	if (p < 0.5) {
	    return 0.5 * s.pow(2*p, g)
	  } else {
	    return 1 - 0.5 * s.pow(2*(1 - p), g)
		}
  }
  
  function c01(g) {
  	return s.constrain(g, 0, 1)
  }
  
  function twistLine(q) {
  	s.beginShape()
  	for (var i=0; i<=N; i++) {
    	const qq = i*1.0/N
    	const x = s.lerp(-l/2, l/2, qq)
    	const y = s.lerp(-l/2, l/2, qq)

    	var twist = s.map(s.cos(TWO_PI*qq), 1, -1, 0, 1)
    	twist = maxTwist*q*s.lerp(twist, 1-s.sqrt(1-twist), 0.75)

    	const x_ = x*s.cos(twist) + y*s.sin(twist)
    	const y_ = y*s.cos(twist) - x*s.sin(twist)

	    const depth = q + 0.4
    
	    s.stroke(s.lerp(40,255,depth))
    	s.vertex(x_, y_)
	  }
  	s.endShape();
	}
  
  function twistX(q) {
  	twistLine(q)
  	s.push()
  	s.rotate(HALF_PI)
  	twistLine(q)
  	s.pop()
	}
  
  function boxx(q) {
  	for (var i=0; i<4; i++) {
    	s.push()
    	s.rotateY(HALF_PI*i)
    	s.translate(0, 0, l/2)
    	twistX(q)
    	s.pop()
  	}

  	for (var i=0; i<2; i++) {
	    s.push()
	    s.rotateX(HALF_PI+PI*i)
	    s.translate(0, 0, l/2)
	    twistX(q)
	    s.pop();
	  }
  }
  
  s.background(0)
  s.push()  
  s.rotateX(-ia)
  s.rotateY(PI/3 - PI*t)

  const twistAmount = ease(s.map(s.cos(TWO_PI*t), 1, -1, 0, 1), 3)
  boxx(twistAmount)
  s.pop()
}
