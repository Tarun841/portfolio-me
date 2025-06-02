
window.addEventListener('scroll',()=>{
    const triangle = document.querySelector('.triangle');
    const scrooltop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scroolY = (scrooltop / maxScroll);
    const rotation = (1-scroolY )* 360;
    triangle.style.transform = `translate(-50%,-50%) rotate(${rotation}deg)`;
});
