import { Item } from '../src/item';
import { GildedTros } from '../src/gilded-tros';
import { mockdata } from '../src/data/mockdata';

console.log('AXXES CODE KATA - GILDED TROS');

const app: GildedTros = new GildedTros(mockdata.map((item) => new Item(item)));

let days = 4;
const args = process.argv.slice(2);

if (args.length > 0) {
    days = +args[0] + 1;
}

for (let i = 0; i < days; i++) {
    console.log('-------- day ' + i + ' --------');
    console.log('name, sellIn, quality');

    app.printInventory();

    app.updateQuality();
}
