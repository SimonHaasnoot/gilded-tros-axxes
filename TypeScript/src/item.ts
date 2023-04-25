export type ItemProperties = {
    name: string;
    sellIn: number;
    quality: number;
};

export class Item {
    public name: string;
    public sellIn: number;
    public quality: number;

    constructor(itemProperties: ItemProperties) {
        this.name = itemProperties.name;
        this.sellIn = itemProperties.sellIn;
        this.quality = itemProperties.quality;
    }

    public toString(): string {
        return `${this.name}, ${this.sellIn}, ${this.quality}`;
    }
}
