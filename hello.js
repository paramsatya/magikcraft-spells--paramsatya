const magik = magikcraft.io;
function hello(playername){
    magik.dixit("Hello from " + magik.ego().getName(), playername);
    magik.dixit("You just said 'Hello' to " + playername);
}