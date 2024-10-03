
interface Params{
    duration ?:number;
}

const detectLongPress = (node:HTMLElement,duration:number=10000)=>{
    return setTimeout(()=>{
        node.dispatchEvent(new CustomEvent('longpress'));
    },duration)
}

export const longpress = (node:HTMLElement,params:Params) =>{
    let mouseInterval : NodeJS.Timeout;
    let touchInterval : NodeJS.Timeout;
    if(!params.duration) params.duration = 1000;
    const mouseDownHandler = (event:MouseEvent)=>{
        mouseInterval = detectLongPress(node,params.duration)
    }

    const mouseUpHandler = (event:MouseEvent)=>{
        clearInterval(mouseInterval);
    }

    const touchStartHandler = (event:TouchEvent)=>{
        touchInterval = detectLongPress(node,params.duration);
    }

    const touchEndHandler = (evnet:TouchEvent)=>{
        clearInterval(touchInterval);
    }

    node.addEventListener('mousedown',mouseDownHandler);
    node.addEventListener('mouseup',mouseUpHandler);
    node.addEventListener("touchstart",touchStartHandler);
    node.addEventListener("touchend",touchEndHandler);

    return{
        destroy: ()=>{
            node.removeEventListener('mousedown',mouseDownHandler);
            node.removeEventListener('mouseup',mouseUpHandler);
            node.removeEventListener('touchstart',touchStartHandler);
            node.removeEventListener('touchend',touchEndHandler);
        },
        update:(newParams:Params)=>{
            params=newParams;
        }
    }
}