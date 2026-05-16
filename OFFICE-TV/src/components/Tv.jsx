import React, { useState } from 'react'
import { useEffect,useRef } from 'react'

const Tv = () => {
    let DVD = useRef(null)
    let [coordinate,setCoordinate] = useState([0,0]) 
    let TV = useRef(null);
    useEffect(()=>{
        let el = DVD.current;
        el.style.position = 'absolute';
        let pos = el.getBoundingClientRect();

        let l = pos.left;
        let r = pos.top;
        
        setCoordinate(([x,y])=>{
            return [l,r]
        })
        
        let idx = 0;
        let dir = [[10,10],[-10,10],[-10,-10],[10,-10]]
        let tvEl = TV.current;

        let tvElPos = tvEl.getBoundingClientRect();

        let i = setInterval(()=>{
            setCoordinate(([x,y])=>{
                
                let left = x+dir[idx][0];
                let right = y+dir[idx][1];

                el.style.left = `${left}px`;
                el.style.top = `${right}px`;
                return [left,right];
            });
        },1000);
        return ()=> clearInterval(i)
    },[])
    
  return (
    <div className='TV' ref={TV}>
      <div ref = {DVD} className='DVD' >
        DVD
      </div>
    </div>
  )
}

export default Tv
