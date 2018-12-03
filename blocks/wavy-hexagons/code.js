import p5 from 'p5'

export const run = (state, { domRoot, io }) => {
  
  io.width = domRoot.clientWidth
  io.height = 500
  
  // setup sketch instance
  io.p5 = new p5(s => {	
  	io.s = s

  	s.setup = function() {
      const { CENTER, NORMAL, WEBGL } = s
      
	    s.createCanvas(io.width, io.height)
    	s.noLoop()
      s.smooth()
      s.rectMode(CENTER)
      s.stroke(32)
  		s.noFill()  		
  		s.blendMode(NORMAL)
	  }
	}, domRoot)	
}

export const update = (state, { io, timeRunning }) => {
	const { s, width, height } = io 
  const { TWO_PI, MULTIPLY } = s
  
  const numFrames = 150
  const t = (timeRunning/(20.0*numFrames))%1
  
  const YELLA = io.yella, CYAN = '#4FDBFF', MAGENTA = '#F012BE'
	const r = io.r * 420
  const mn = .5 * s.sqrt(io.mnSize * 6)
  const ia = s.atan(s.sqrt(0.5))
  
  var wavePhase
     
  function waveVertex(x, y) {
    s.vertex(x + (io.waveX * 30) * s.sin(TWO_PI * t - 0.03 * y + wavePhase), y)
  }
  
  function waveLine(x1, y1, x2, y2) {
    const n = 2 + s.ceil(0.1 * s.dist(x1, y1, x2, y2))
    s.beginShape()
    for (var i=0; i<n; i++) {
      waveVertex(s.map(i, 0, n-1, x1, x2), s.map(i, 0, n-1, y1, y2))
    }
    s.endShape()
  }
  
  function hexx() {
    for (var i=0; i<6; i++) {
      const th = TWO_PI * i/6
      waveLine(-r/2 * s.cos(th) + r * mn * s.sin(th), 
               r * mn * s.cos(th) + r/2 * s.sin(th), 
               r/2 * s.cos(th) + r * mn * s.sin(th), 
               r * mn * s.cos(th) - r/2 * s.sin(th))
    }
  
    for(var i=0; i<5; i++){
      const qq = i/5.0
      waveLine(s.lerp(-r,-r/2,qq), 
               s.lerp(0,-r*mn,qq), 
               s.lerp(-r/2,r/2,qq), 
               r*mn)
      waveLine(s.lerp(-r/2,r/2,qq), 
               -r*mn, s.lerp(r/2,r,qq), 
               s.lerp(r*mn,0,qq))
    } 
  }
    
  s.background(250)
  s.push()
  s.translate(width/2, height/2)
  s.strokeWeight(io.strokeWidth * 3.5 * 4)
  
  s.background(250)
  s.stroke(CYAN)
  wavePhase = 0
  hexx()
  const f1 = s.get()
  
  s.background(250)
  s.stroke(MAGENTA)
  wavePhase = TWO_PI/3
  hexx()
  const f2 = s.get()
  
  s.background(250)
  s.stroke(YELLA)
  wavePhase = 2*TWO_PI/3
  hexx()
  
  s.pop()
  
  s.blend(f1,0,0,width,height,0,0,width,height,MULTIPLY)
  s.blend(f2,0,0,width,height,0,0,width,height,MULTIPLY)
}
