import p5 from 'p5'

export const run = ({ state, element, events, iteration }) => {
	state.width = element.clientWidth
  state.height = 500
      
  new p5(s => {
    state.s = s
    
    s.setup = () => {
      const { CENTER } = s
      
      s.createCanvas(state.width, state.height)
      s.noLoop()
      s.smooth(8)
      s.rectMode(CENTER)
      s.fill(10)
      s.noStroke()
    }
  }, element)
}

export const update = ({ state, element, events, iteration }) => {
  const { s, width } = state
	const { HALF_PI, PI, TWO_PI, CLOSE } = s
    
  const numFrames = 200
  const samplesPerFrame = 2
	const shutterAngle = 1
  var t = s.map(iteration % numFrames, 0, numFrames, 0, 1)
    
  const mn = 0.5 * s.sqrt(3)
  const ia = s.atan(s.sqrt(0.5))
  
	var x, y, z, tt
	var N = 12
	var r = 60
	var sp = 2*r*mn
	var ee = 3, v = 3, te
	var ORANGE = '#ec973e'

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
  
  function tri() {
  	s.push()
  	s.fill(ORANGE)
  	s.beginShape()
  	for (var i=0; i<3; i++) {
    	s.vertex(r*s.sin(TWO_PI*i/3), -r*s.cos(TWO_PI*i/3))
    }
  	s.endShape(CLOSE)
  	s.pop()
	}

	function thing() {
  	s.fill(10)
  	for (var i=0; i<3; i++) {
    	s.push()
    	s.rotate(TWO_PI*i/3)
    	s.arc(0, -r, r*mn*2, r*mn*2, HALF_PI-PI/6, HALF_PI+PI/6)
	    s.pop()
  	}
	}
  
  s.background(ORANGE)
  s.push()  
  if (t <= .5) {
    t = 2*t
    for (var i=-N; i<=N; i++) {
      for (var j=-N; j<=N; j++) {
        x = i*sp
        y = j*mn*sp
        if (j%2 != 0) {
          x += .5*sp
        }
        tt = c01(v*t - s.map(-y, -width*.55, width*.55, 0, v-1))
        te = ease(tt, ee)
        s.push()
        s.translate(x, y)
        s.translate(0, s.lerp(-sp*2/3.0*mn, 0, te))
        s.rotate(TWO_PI/6*te*(j%2 == 0 ? 1 : -1))
        thing()
        s.pop()
      }
    }
  } else {
    t = 2*t - 1
    s.fill(10)
    for (var i=-N; i<=N; i++) {
      for (var j=-N; j<=N; j++) {
        x = i*sp
        y = (j+2/3.0)*mn*sp
        if (j%2 != 0)
          x += .5*sp
        s.push()
        s.translate(x, y)
        s.ellipse(0, 0, 2*r*mn, 2*r*mn)
        s.pop()
      }
    }

    for (var i=-N; i<=N; i++) {
      for (var j=-N; j<=N; j++) {
        x = i*sp
        y = (j-2/3.0)*mn*sp
        if (j%2 != 0)
          x += .5*sp

        tt = c01(v*t - s.map(-y, -width*.55, width*.55, 0, v-1))
        te = ease(tt, ee)
        s.push()
        s.translate(0, te*2/3.0*mn*sp)
        s.translate(x, y)
        s.rotate(TWO_PI/6*te*(j%2 == 0 ? 1 : -1))
        tri()
        s.pop()
      }
    }
  }
  s.pop()
}
