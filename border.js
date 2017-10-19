const magik = magikcraft.io;
const { bar, color, style } = require('magikcraft-lore-ui-bar');
const finalsize = 5;
const blocksPerSecond = 5;

const STATE = {
    PROGRESS: 'border.game.progress',
    RUNNING: 'border.game.running',
    BAR: 'border.bar',
    LISTENER: 'border.progress.listener'
};

function border(size = 200) {

    if (size == 'reset') {
        // Use this to halt a game
        gameOver();
        return;
    }

    if (size == 'clear') {
        // Use this when the UI bar has disappeared
        magik.playerMap.remove(STATE.BAR);
        magik.playerMap.remove(STATE.LISTENER);
        return;
    }

    magik.dixit('Setting up...');

    function getBar() {
        if (magik.playerMap.containsKey(STATE.BAR)) {
            // Return a reference to the existing UI Bar
            return magik.playerMap.get(STATE.BAR);
        } else {
            // Or create a new UI bar
            magik.dixit('Creating UI bar...');
            const _b = bar();
            // Stash a reference to it
            magik.playerMap.put(STATE.BAR, _b);
            return _b;
        }
    }

    const b = getBar()
        .text("RUN 4 YR LYFE!!!")
        .color(color.GREEN)
        .style(style.NOTCHED_20)
        .progress(100)
        .show();

    function getBorder() {
        return magik.getSender().getWorld().getWorldBorder();
    }

    function initialiseBorder() {
        const border = getBorder();
        // magik.dixit(border.getSize().toString());
        const here = magik.hic();
        const zDelta = Math.random() * 100 - 50;
        const xDelta = Math.random() * 100 - 50;

        here.setZ(here.getZ() + zDelta);
        here.setX(here.getX() + xDelta);

        border.setCenter(here);
        border.setSize(size);
        // magik.dixit(`Set border size to ${size}`);
        return border;
    }

    function shrink(border) {
        const newSize = border.getSize() - blocksPerSecond;
        if (newSize === finalsize) {
            magik.clearInterval(loop);
            const tenSeconds = 10000;
            magik.setTimeout(() => gameOver(), tenSeconds);
            return;
        }
        const barProgress = ((newSize - finalsize) / size) * 100;
        eventbus.publish(STATE.PROGRESS, barProgress);
        border.setSize(newSize);
        return newSize;
    }

    function gameOver() {
        magik.dixit('Game Over!');
        getBorder().setSize(600000);
        magik.globalMap.put(STATE.RUNNING, false);
        eventbus.publish(STATE.PROGRESS, false);
        getBar().text("GAME OVER!!").progress(0);
    }


    function listenProgress(msg) {
        const barProgress = msg.data;
        magik.getSender().sendMessage(msg);
        const b = magik.playerMap.get(STATE.BAR);
        if (!barProgress) {
            b.text("GAME OVER!!");
            return;
        }
        if (barProgress > 50) {
            b.color(color.GREEN)
                .progress(barProgress);
        }

        if (barProgress < 50) {
            b.color(color.YELLOW)
                .progress(barProgress)
                .text("HURRY!");
        }
        if (barProgress < 25) {
            b.color(color.RED)
                .progress(barProgress);
            return;
        }
    }

    function isRunning() {
        if (magik.globalMap.containsKey(STATE.RUNNING)) {
            const state = magik.globalMap.get(STATE.RUNNING);
            return state;
        } else {
            return false;
        }
    }

    function startGame() {
        joinGameTopic();
        if (isRunning()) {
            magik.dixit('Game running, I\'ved joined!');
            return;
        }
        const border = initialiseBorder();
        magik.globalMap.put(STATE.RUNNING, true);
        magik.dixit('Let the game begin!');
        return magik.setInterval(() => shrink(border), 1000);
    }

    function joinGameTopic() {
        if (magik.playerMap.containsKey(STATE.LISTENER)) {
            return magik.playerMap.get(STATE.LISTENER);
        } else {
            const listener = eventbus.subscribe(STATE.PROGRESS, listenProgress);
            magik.playerMap.put(STATE.LISTENER, listener);
            return listener;
        }
    }

    // Start a game if one isn't running
    const loop = startGame();
}