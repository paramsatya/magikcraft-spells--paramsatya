const magik = magikcraft.io;

function subtest() {
    if (global.sub) {
        global.sub.unsubscribe();
    }    
    global.sub = eventbus.subscribe(    
        'sitapati.msg', 
        msg => magik.dixit(msg.data.toString())
    );
}