const magik = magikcraft.io;
function sb () {
    const delay = 100 ;
    const sender = magik.getSender();
    const snowball = magik.type('entity.fireball').class;
    const hurl = (thing) => () => sender.launchProjectile(thing);
    const volley = () => magik.doNTimes (hurl(snowball) , 15, null, delay);
    magik.doNTimes (volley,15,null, delay*10);
}
    
    // you're welcome!'