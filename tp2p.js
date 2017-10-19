const magik = magikcraft.io;
const locationTopic = 'locations';

function tp2p(name = '@@INIT'){
    // If global.locations doesn't exist, we are not subscribed yet
    if (!global.locations) {
        global.locations = {};
        eventbus.subscribe(locationTopic, event => {
            const who = event.data.name;
            const where = event.data.location;
            global.locations[who] = where;
            magik.dixit(`Received location for ${who}`);
        });
        magik.dixit(`Subscribed to ${locationTopic}`);
    }
    if (name === '@@INIT') {
        return;
    }
    if (!global.locations[name]) {
        magik.dixit(`No published location found for ${name}!`);
        return;
    }

    const whereJSON = global.locations[name];

    // Turn the JSON into a BukkitLocation
    const where = magik.fromJSON(whereJSON);
    magik.ianuae(where);
}