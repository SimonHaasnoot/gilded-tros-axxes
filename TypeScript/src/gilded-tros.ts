import { Item } from './item';

export enum SpecialItem {
    GoodWine = 'Good Wine',
    BackstagePassesReFactor = 'Backstage passes for Re:Factor',
    BackstagePassesHAXX = 'Backstage passes for HAXX',
}

export enum LegendaryItem {
    BDAWGKeychain = 'B-DAWG Keychain',
}

export enum SmellyItem {
    DuplicateCode = 'Duplicate Code',
    LongMethods = 'Long Methods',
    UglyVariableNames = 'Ugly Variable Names',
}

export class GildedTros {
    constructor(public items: Array<Item>) {}

    private increaseQuality(item: Item, incrementOverride?: number): void {
        const qualityIncrement = incrementOverride ? incrementOverride : 1;

        if (item.quality < 50) {
            item.quality = item.quality + qualityIncrement;
        }

        if (item.quality > 50) {
            item.quality = 50;
        }
    }

    private decreaseQuality(item: Item, decrementOverride?: number): void {
        const sellInDatePassed: boolean = item.sellIn < 0;
        const qualityIsZero: boolean = item.quality === 0;
        const qualityDecrement = decrementOverride ? decrementOverride : 1;

        // Quality can never be negative
        if (qualityIsZero) {
            return;
        }

        item.quality = !sellInDatePassed ? item.quality - qualityDecrement : item.quality - (qualityDecrement * 2);

        if (item.quality < 0) {
            item.quality = 0;
        } else if (item.quality > 50) {
            item.quality = 50;
        }
    }

    private isSpecialItem(item: Item): boolean {
        const specialItems: string[] = Object.values(SpecialItem);
        const LegendaryItems: string[] = Object.values(LegendaryItem);

        const merged = [...specialItems, ...LegendaryItems];

        return merged.includes(item.name);
    }

    private handleSellIn(item: Item): void {
        if (item.name !== LegendaryItem.BDAWGKeychain) {
            item.sellIn--;
        }
    }

    private handleBackstagePasses(item: Item): void {
        if (item.name === SpecialItem.BackstagePassesReFactor || item.name === SpecialItem.BackstagePassesHAXX) {
            if (item.sellIn > 10) {
                this.increaseQuality(item);
            } else if (item.sellIn > 5 && item.sellIn < 11) {
                this.increaseQuality(item, 2);
            } else if (item.sellIn > 0 && item.sellIn < 6) {
                this.increaseQuality(item, 3);
            } else if (item.sellIn < 1) {
                item.quality = 0;
            }
        }
    }

    private handleWine(item: Item): void {
        if (item.name === SpecialItem.GoodWine) {
            this.increaseQuality(item);
        }
    }

    private updateItem(item: Item): void {
        // Handle sellIn date first as the quality of an item is dependent on it
        this.handleSellIn(item);

        if (!this.isSpecialItem(item)) {
            const isSmellyItem: boolean = (Object.values(SmellyItem) as string[]).includes(item.name);

            this.decreaseQuality(item, isSmellyItem ? 2 : 1);
        }

        // Quality improves with age
        this.handleWine(item);

        // Quality of backstage passes increases as the concert date approaches
        this.handleBackstagePasses(item);
    }

    public updateQuality(): void {
        for (const item of this.items) {
            this.updateItem(item);
        }
    }

    public printInventory(): void {
        this.items.map((item) => item.toString()).forEach((item) => console.log(item));

        console.log(); // spacing
    }
}
