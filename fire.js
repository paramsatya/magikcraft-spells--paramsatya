const magik = magikcraft.io;
function fire() {
    const delay = 100 ;
    const sender = magik.getSender();
    const fireball = magik.type('entity.Fireball').class;
    const hurl = (thing) => () => sender.launchProjectile(thing);
    const volley = () => magik.doNTimes (hurl(fireball) , 15, null, delay);
    magik.doNTimes (volley,15,null, delay*10);
}
    
    // you're welcome!'