import React, { useState } from 'react'
import { useEffect,useRef } from 'react'

const Tv = ({speed}) => {
    let DVD = useRef(null)
    let [coordinate,setCoordinate] = useState([0,0]) 
    let TV = useRef(null);
    const randomSpeed = () =>{
      return Math.floor(Math.random()*2)+3
    }

    let dirL = useRef(1)
    let dirT = useRef(1)

    let dL = useRef(randomSpeed())
    let dR = useRef(randomSpeed())
    useEffect(()=>{
      const el = DVD.current;
      const tvEl = TV.current;
      
      
      let elPos = el.getBoundingClientRect();
      let tvElPos = tvEl.getBoundingClientRect();

      let l = elPos.left-tvElPos.left;
      let t = elPos.top-tvElPos.top;
      
      let w =  tvEl.clientWidth-el.offsetWidth;
      let h =  tvEl.clientHeight-el.offsetHeight;
      setCoordinate(([x,y])=>{
          return [Math.floor(Math.random()*w),Math.floor(Math.random()*h)] //[l,t]
      })

      el.style.left = `${l}px`;
      el.style.top = `${t}px`;
    },[])
    useEffect(()=>{
        const el = DVD.current;
        const tvEl = TV.current;
        
        
        let elPos = el.getBoundingClientRect();
        let tvElPos = tvEl.getBoundingClientRect();

        let l = elPos.left-tvElPos.left;
        let t = elPos.top-tvElPos.top;
        
        let w =  tvEl.clientWidth-el.offsetWidth;
        let h =  tvEl.clientHeight-el.offsetHeight;
        // setCoordinate(([x,y])=>{
        //     return [Math.floor(Math.random()*w),Math.floor(Math.random()*h)] //[l,t]
        // })

        // el.style.left = `${l}px`;
        // el.style.top = `${t}px`;
        
        let idx = 0;
        // let dir = [[10,10],[-10,10],[-10,-10],[10,-10]]
        // let dirL = 1
        // let dirT = 1
        
        tvEl.style.position = 'relative'
        el.style.position = 'absolute'

        

        let i = setInterval(()=>{
            setCoordinate(([x,y])=>{
                
                let left = x+dirL.current*dL.current;
                let top = y+dirT.current*dR.current;
                if((left <= 0 && top <= 0)||(left<=0 && top >= tvEl.clientHeight-el.offsetHeight) 
                  || (left >= tvEl.clientWidth-el.offsetWidth && top <= 0) 
                  || (left >= tvEl.clientWidth-el.offsetWidth && top>=tvEl.clientHeight-el.offsetHeight)){
                    el.style.left = `${left}px`;
                    el.style.top = `${top}px`;
                    alert('yeahh!')  
                    location.reload()
                  }
                if(left<0 || left>tvEl.clientWidth-el.offsetWidth){
                  if(left<0) left = 0
                  if(left>tvEl.clientWidth-el.offsetWidth) left = tvEl.clientWidth-el.offsetWidth
                  dirL.current*=-1
                  // left = x+dirL;
                  dL.current = randomSpeed();
                }
                if(top<0 || top>tvEl.clientHeight-el.offsetHeight){
                  if(top<0) top = 0
                  if(top>tvEl.clientHeight-el.offsetHeight) top = tvEl.clientHeight-el.offsetHeight
                  dirT.current*=-1
                  // top = y+dirT;
                  dR.current = randomSpeed();
                }
                
                
                el.style.left = `${left}px`;
                el.style.top = `${top}px`;
                // console.log(speed)
                return [left,top];
            });
        },24/speed);
        // },0.001);
        console.log(speed)
        return ()=> clearInterval(i)
    },[speed])
    
  return (
    <div className='TV' ref={TV}>
      <div ref = {DVD} className='DVD' >
        <span style={{color:"black"}}>DVD</span>
        <span style={{color:"white"}}>VIDEOS</span>
      </div>
    </div>
  )
}

export default Tv
