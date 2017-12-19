const magik = magikcraft.io;

const fontData = {
    a: [24 ,60, 36, 102, 126, 126, 102, 102],
    b: [192, 192, 192, 192, 255, 194, 194, 252],
    c: [255, 192, 192, 192, 192, 192, 192, 255],
    d: [254, 195, 195, 195, 195, 195, 195, 254],
    e: [252, 128, 128, 252, 128, 128, 128, 252],
    f: [0, 62, 32, 62, 32, 32, 32, 32],
    g: [255, 255, 192, 192, 199, 195, 255, 255],
    h: [102, 102, 102, 126, 102, 102, 102, 102],
    i: [255, 126, 24, 24, 24, 24, 126, 255]
} 

function write(letters = 'abc') {
    const BLOCK = magik.type('Material').STONE

    const number2binary = num => num.toString(2)
    const addLeadingZeros = line => line.padStart(8, '0')
    const lineBlockArray = line => Array.from(addLeadingZeros(number2binary(line)))
    const binaryMap = letterData => letterData.map(line => lineBlockArray(line))
    const getBlock = (x,y,z) => magik.getSender().getWorld().getBlockAt(x, y, z)

    const here = magik.hic()
    let x = here.getX() + 1
    let y = here.getY() + 1
    let z = here.getZ()

    const chars = Array.from(letters)
    chars.forEach((char, letternum) => 
        binaryMap(fontData[char]).forEach((line, linenum) => 
        line.forEach((char, charnum) => (char == '1' &&
            getBlock(x + charnum + (letternum * 10), y - linenum, z).setType(BLOCK)))))
}