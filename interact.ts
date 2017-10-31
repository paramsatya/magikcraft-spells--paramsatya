const magik = magikcraft.io;
declare const Java: any;

const CommandCallback = Java.type("io.magikcraft.CommandCallback"),
    EventPriority = Java.type("org.bukkit.event.EventPriority"),
    EventCallback = Java.type("io.magikcraft.EventCallback");

function interact() {
    magik.getPlugin().registerEvent(
            Java.type("org.bukkit.event.player.PlayerInteractEvent")
.class,
        EventPriority.MONITOR,
        true,
        new EventCallback({
            callback: function (event: any) {
                // Need to do anything?
                magik.dixit("PlayerInteractEvent!");
            }
        }));	
}
