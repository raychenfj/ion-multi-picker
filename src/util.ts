export function convertEnumToColumn(enumType) {
    let col = [];
    col[0] = { options: [] };
    let keys = Object.keys(enumType);
    let length = keys.length / 2;

    for (let i = 0; i < length; i++) {
        col[0].options.push({
            text: keys[i + length],
            value: Number.parseInt(keys[i])
        });
    }

    return col;
}