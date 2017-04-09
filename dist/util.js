"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertEnumToColumn(enumType) {
    var col = [];
    col[0] = { options: [] };
    var keys = Object.keys(enumType);
    var length = keys.length / 2;
    for (var i = 0; i < length; i++) {
        col[0].options.push({
            text: keys[i + length],
            value: Number.parseInt(keys[i])
        });
    }
    return col;
}
exports.convertEnumToColumn = convertEnumToColumn;
//# sourceMappingURL=util.js.map