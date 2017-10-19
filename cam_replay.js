/**
 * Replay a sequence recorded with cam_capture. 
 * Optionally takes a playback speed, for example:
 * /cast cam_replay(2) for 2x playback.
 * Cast cam_replay while it is replaying to halt playback.
 */
const magik = magikcraft.io;

magik.dixit('Replaying...');

function cam_replay(speedx = 1) {

    // Cancel playback if we're called while replaying
    // Doesn't work, because you can't cast anything during playback
    // because teleporting
    if (global._playing == true) {
        global._cancelPlayback = true;
        global._playing = false;
        magik.dixit('Cancelling playback...');
        return;
    }

    const film = global.film;
    const { fps } = film.metadata;
    // Scale playback rate
    magik.dixit(`Playing at ${speedx}x`);
    const interval = 1000 / (fps * speedx);

    global._cancelPlayback = false;
    global._playing = true;

    const playback = film.frames.map((frame, index) => {
        magik.setTimeout(function (){
            magik.ianuae(frame);
            // This allows us to cancel playback mid-way through
            if (global._cancelPlayback) {
                playback.forEach(frame => magik.clearTimeout(frame));
                global._playing = false;
                global._cancelPlayback = false;
            }
        }, interval * index);
    });

    // This final task resets the system state to "not playing"
    playback.push(magik.setTimeout(() => {
        global._cancelPlayback = false;
        global._playing = false;
    }, interval * playback.length));

}

