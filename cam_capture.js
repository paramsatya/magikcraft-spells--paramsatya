/**
 * Capture a video of your movement in Minecraft.
 */
const magik = magikcraft.io;

function cam_capture(seconds = "--help", fps = 20) {
    if (seconds === "--help") {
        magik.dixit("Usage: /cast cam_capture [secs]");
        magik.dixit("Usage: /cast cam_capture [secs] [fps]");
        return;
    }
    global.film = {};
    film.frames = [];

    film.metadata = {
        fps,
        seconds
    };
    const interval = 1000 / fps;
    const totalFrames = fps * seconds;
    magik.dixit(`Recording ${seconds}s at ${fps} fps`);
    let count = 0;
    const camera = magik.setInterval(()=>{
        const location = magik.getSender().getLocation(); 
        film.frames.push(location);
        count ++;
        if (count > totalFrames) {
            magik.clearInterval(camera);
            magik.dixit('Finished recording!');
        }
    }, interval);
}

