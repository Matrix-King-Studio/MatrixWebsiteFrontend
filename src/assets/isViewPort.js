function inViewPort(el){
    let ban=(el.getBoundingClientRect().top>0 && el.getBoundingClientRect().bottom-window.outerHeight<parseInt(el.offsetHeight/2))||
    (el.getBoundingClientRect().top<0 && el.getBoundingClientRect().bottom>parseInt(el.offsetHeight/2));
    let scrollBottom = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)+window.outerHeight
    let show = el.getBoundingClientRect().bottom>0 && scrollBottom>el.offsetTop
    return [show,ban]
}
export function animate(el,a=''){
    if(!el) return
    let jd=inViewPort(el)
    if(!jd[0] && el.classList.contains('animated')){
      el.style.opacity='0'
      if(a!='') el.classList.remove("animated",a)
      else el.classList.remove("animated","fadeInUp")  
      
    }
    if(jd[1]){
      if(a!='') el.classList.add("animated",a)
      else el.classList.add("animated","fadeInUp")
    }
}
