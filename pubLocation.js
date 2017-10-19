const magik = magikcraft.io;
const locationTopic = 'locations';

// Publish my location over the eventbus
function pubLocation() {
    const here = magik.hic(); // get player current location
    const hereJSON = magik.toJSON(here); // turn it into a JSON object
    magik.dixit(JSON.stringify(hereJSON)); // you can print it out

    // Publish player location to 'locations' topic on the eventbus
    eventbus.publish(locationTopic, {name: global.PlayerName, location: hereJSON});
}