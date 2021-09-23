//cette fonction fait apparaitre les deux images background fixe et fait defiler les trois images parallax indentique a la suite pour l'effet parallax.
export function drawBack(background, width, height, parallax){
    ctx.drawImage(background[0], 0, 0, width,height);
    ctx.drawImage(background[1], 0, 0, width,height);    
    for (let i = 0; i < parallax.length; i++) {
        ctx.drawImage(parallax[i], h, 0, width,height)
        h-=0.5;        
        if(h == -width){
            h = 0
        }
    }
    for (let i = 0; i < parallax.length; i++) {
        ctx.drawImage(parallax[i], m, 0, width,height)
        m-=0.5;
        if(m == 0){
            m = width;
        }
    }
}

export const truc = " tests "