import { Item } from './item';

export class GildedTros {
    constructor(public items: Array<Item>) {}

    private increaseQuality(item: Item): void {
        if (item.quality < 50) {
            item.quality++;
        }
    }

    private decreaseQuality(item: Item): void {
        if (item.quality > 0) {
            item.quality--;
        }
    }

    private isSpecialItem(item: Item): boolean {
        const specialItems = ['Good Wine', 'Backstage passes for Re:Factor', 'Backstage passes for HAXX', 'B-DAWG Keychain'];
        return specialItems.includes(item.name);
    }

    private updateItem(item: Item): void {
        if (!this.isSpecialItem(item)) {
            this.decreaseQuality(item);
        } else {
            this.increaseQuality(item);

            if (item.name === 'Backstage passes for Re:Factor') {
                if (item.sellIn < 11) {
                    this.increaseQuality(item);
                }

                if (item.sellIn < 6) {
                    this.increaseQuality(item);
                }
            }
        }

        if (item.name !== 'B-DAWG Keychain') {
            item.sellIn--;
        }

        if (item.sellIn < 0) {
            if (item.name === 'Good Wine') {
                this.increaseQuality(item);
            } else if (item.name === 'Backstage passes for Re:Factor' || item.name === 'Backstage passes for HAXX') {
                item.quality = 0;
            } else {
                this.decreaseQuality(item);
            }
        }
    }

    public updateQuality(): void {
        for (const item of this.items) {
            this.updateItem(item);
        }
    }

    public printInventory(): void {
        this.items.map((item) => item.toString()).forEach((item) => console.log(item));

        console.log();
    }
}
