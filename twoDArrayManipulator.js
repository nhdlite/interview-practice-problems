// Write an algorithm such that if an element in an MxN matrix is 0, the entire row and column is set to 0.

const test = require('tape');
const _ = require('lodash');

function transformMatrix(twoDMatrix) {
    // Handle edge cases
    // Check for valid array
    // Check for size limits
    // Check MxN for consistent lengths (no zagged 2D array)

    const zeroOutHash = {};

    twoDMatrix.forEach((row, i) => {
        row.forEach((column, j) => {
            if(column === 0) {
                zeroOutHash[`column_${j}`] = true;
                zeroOutHash[`row_${i}`] = true;
            }
        });
    });

    twoDMatrix.forEach((row, i) => {
        row.forEach((column, j) => {
            if(zeroOutHash[`row_${i}`]) {
                twoDMatrix[i][j] = 0;
            }

            if(zeroOutHash[`column_${j}`]) {
                twoDMatrix[i][j] = 0;
            }
        });
    });

    return twoDMatrix;
}

test('Does transform correctly', (t) => {
    const original = [
        [1, 0, 1, 1],
        [1, 1, 0, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1]
    ];

    const expected = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 0, 0, 1],
        [1, 0, 0, 1]
    ];

    const result = transformMatrix(original);

    t.true(_.isEqual(_.sortBy(result), _.sortBy(expected)), 'Array should be properly transformed');
    t.end();
});