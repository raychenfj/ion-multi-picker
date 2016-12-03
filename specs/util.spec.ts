import { convertEnumToColumn } from '../src/util';

enum MockFruit{
    Apple,
    Orange,
    Melon,
    Banana,
    Pear,
}

describe('Util',()=>{
    it('should convert enum to column',()=>{
        let col = convertEnumToColumn(MockFruit);
        expect(col.length).toBe(1);
        expect(col[0].options.length).toBe(5);
        expect(col[0].options[0].value).toBe(0);
        expect(col[0].options[0].text).toBe("Apple");
        expect(col[0].options[1].value).toBe(1);
        expect(col[0].options[1].text).toBe("Orange");
        expect(col[0].options[2].value).toBe(2);
        expect(col[0].options[2].text).toBe("Melon");
        expect(col[0].options[3].value).toBe(3);
        expect(col[0].options[3].text).toBe("Banana");
        expect(col[0].options[4].value).toBe(4);
        expect(col[0].options[4].text).toBe("Pear");
    });
});             