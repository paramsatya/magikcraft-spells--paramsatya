const magik = magikcraft.io;

function _potionEffect(_type = 'CONFUSION', playerName = null) {
    // const _type = 'CONFUSION';
    const opts = {};
    
    const PotionEffect = magik.type("potion.PotionEffect");
    const PotionEffectType = magik.type("potion.PotionEffectType");
    const Color = magik.type("Color");
    const duration = 200; // 20 tick
    const amplifier = 1;
    const color = opts.color || "GREEN";
    const c = Color[color];
    const l = PotionEffectType[_type];
    const effect = new PotionEffect(l, duration, amplifier, true, true, c);
    
    if (!playerName) {
        magik.getSender().addPotionEffect(effect);
    }
    else {
        magik.getPlugin().getServer().getPlayer(playerName).addPotionEffect(effect);
    }
}

