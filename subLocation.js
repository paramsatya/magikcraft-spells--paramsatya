const magik = magikcraft.io;
const locationTopic = 'locations';

// Consume player locations from eventbus
function subLocation(){

    // Create a local location registry
    if (!global.locations) {
        global.locations = {};
    }

    eventbus.subscribe(locationTopic, event => {
        const who = event.data.name;
        const where = event.data.location;
        global.locations[who] = where;
    });
}