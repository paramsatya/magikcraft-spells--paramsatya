const magik = magikcraft.io;

const fontData = {
    a: [24 ,60, 36, 102, 126, 126, 102, 102],
    
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
}const magik = magikcraft.io;

