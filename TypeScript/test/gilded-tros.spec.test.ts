import { Item } from '../src/item';
import { GildedTros, LegendaryItem, SpecialItem } from '../src/gilded-tros';

describe('Test Basic Items - GildedTros', () => {
    const items: Item[] = [
        new Item({
            name: 'lowQualityItem',
            sellIn: 0,
            quality: 0,
        }),
        new Item({
            name: 'mediumQualityItem',
            sellIn: 5,
            quality: 20,
        }),
        new Item({
            name: 'highQualityItem',
            sellIn: 20,
            quality: 100,
        }),
    ];

    const app: GildedTros = new GildedTros(items);

    app.updateQuality();

    it('should decrease sellIn by 1', () => {
        expect(app.items[0].sellIn).toEqual(-1);
    });

    it('should not go below 0 quality', () => {
        expect(app.items[0].quality).toEqual(0);
    });

    it('should have a maximum of 50 quality', () => {
        expect(app.items[2].quality).toEqual(50);
    });

    it('should handle sellin and quality negatively and after sellIn quality drop should double', () => {
        for (let i = 0; i < 5; i++) {
            app.updateQuality();
        }

        const expectedResult = {
            name: 'mediumQualityItem',
            sellIn: -1,
            quality: 13,
        };

        expect(app.items[1]).toEqual(expectedResult);
    });
});

describe('Test Backstage Passes - GildedTros', () => {
    const items: Item[] = [
        new Item({
            name: SpecialItem.BackstagePassesHAXX,
            sellIn: 15,
            quality: 20,
        }),
        new Item({
            name: SpecialItem.BackstagePassesReFactor,
            sellIn: 10,
            quality: 20,
        }),
        new Item({
            name: SpecialItem.BackstagePassesReFactor,
            sellIn: 5,
            quality: 20,
        }),
    ];

    const app: GildedTros = new GildedTros(items);

    app.updateQuality();

    it('should increase quality by 1 when sellIn is above 10', () => {
        expect(app.items[0].quality).toEqual(21);
    });

    it('should increase quality by 2 when sellIn is between 10 and 6', () => {
        expect(app.items[1].quality).toEqual(22);
    });

    it('should increase quality by 3 when sellIn is between 5 and 1', () => {
        expect(app.items[2].quality).toEqual(23);
    });
});

describe('Test Wine Item - GildedTros', () => {
    const items: Item[] = [
        new Item({
            name: SpecialItem.GoodWine,
            sellIn: 0,
            quality: 0,
        }),
    ];

    const app: GildedTros = new GildedTros(items);

    app.updateQuality();

    it('should increase quality after sellIn goes negative', () => {
        expect(app.items[0].quality).toEqual(1);
    });
});

describe('Test B-DAWG Keychain - GildedTros', () => {
    const items: Item[] = [
        new Item({
            name: LegendaryItem.BDAWGKeychain,
            sellIn: 10,
            quality: 80,
        }),
    ];

    const app: GildedTros = new GildedTros(items);

    app.updateQuality();

    it('should not increase or decrease', () => {
        expect(app.items[0]).toEqual({
            name: LegendaryItem.BDAWGKeychain,
            sellIn: 10,
            quality: 80,
        });
    });
});
