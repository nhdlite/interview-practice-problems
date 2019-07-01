/*
This question came from an interviewing.io practice interview. The interviewer said that she was a current Google employee on the GEO team. The questions is as follows:

Write a function shuffle(string). The function takes a string input. The output is a rearrangement of the characters such that no character is repeatings. The function should return null if this cannot be done.

EG. AAB - > ABA
AAA -> null
AABB -> ABAB
ABCAA -> ABACA

Note that you just need to return one version of the shuffle. You do not have to go through all the permutations.
*/

const test = require('tape');

function shuffle(input) {
    if (input === null || input === undefined || typeof input != 'string') {
        return null;
    }

    const hashTable = {};
    const characters = input.split('');
    
    // Convert the input to a character hash table
    for (const character of characters) {
        if (hashTable[character]) {
            hashTable[character] += 1;
        }
        else {
            hashTable[character] = 1;
        }
    }

    // Check if we can actually perform the shuffle. If a characters count is greater than the remaining characters + 1, then we cannot form a valid shuffle.
    // Additionally, convert the hash table into an array of objects
    const totalCharacters = input.length;
    const characterMapData = [];
    for (const hashKey in hashTable) {
        characterMapData.push({
            character: hashKey,
            count: hashTable[hashKey],
        });

        if (hashTable[hashKey] > (totalCharacters - hashTable[hashKey] + 1)) {
            console.log('A reshuffle cannot be completed with the given input.');
            return null;
        } 
    }

    // Sort the list from greatest to least
    characterMapData.sort((a,b) => {
        return a.count < b.count ? 1 : 0;
    });

    // Spreat out the values into a shuffle represenation
    if (characterMapData.length <= 0) {
        console.log('There is no data to shuffle.');
        return null;
    }
    
    if (characterMapData.length === 1 && characterMapData[0].count > 1) {
        console.log('There is only one character that repeats more than once. The input cannot be shuffled.');
        return null;
    }

    if (characterMapData.length === 1 && characterMapData[0].count === 1) {
        return characterMapData[0].character;
    }

    const shuffleResult = [];

    for (let i = 0; i < totalCharacters; i += 2) {
        let p1 = 0;
        let p2 = 1;

        while(p1 + 1 < characterMapData.length && (characterMapData[p1].count < characterMapData[p1 + 1].count || characterMapData[p1].count < 1)) {
            p1++;
        }
        while(p2 + 1 < characterMapData.length && (characterMapData[p2].count < characterMapData[p2 + 1].count || characterMapData[p2].count < 1)) {
            p2++;
        }

        if(characterMapData[p1].count > 0) {
            shuffleResult.push(characterMapData[p1].character);
            characterMapData[p1].count -= 1;
        }
        
        if(characterMapData[p2].count > 0) {
            shuffleResult.push(characterMapData[p2].character);
            characterMapData[p2].count -= 1;
        }
    }

    return shuffleResult.join('');
}

function isValidShuffle(input) {
    if (input === null || input === undefined || input.length < 1) {
        return false;
    }

    const characterData = input.split('');
    let currentCharacter = characterData[0];
    for (let i = 1; i < characterData.length; i++) {
        if (currentCharacter === characterData[i]) {
            return false;
        }

        currentCharacter = characterData[i];
    }

    return true;
}

console.log(shuffle('hellllo'));
console.log(shuffle('AABBCC'));

test('ABA returns valid shuffle', (t) => {
    const input = 'ABA';
    const result = shuffle(input);
    t.true(isValidShuffle(result));
    t.end();
});

test('hellllo returns valid shuffle', (t) => {
    const input = 'hellllo';
    const result = shuffle(input);
    t.true(isValidShuffle(result));
    t.end();
});

test('AABBCC returns valid shuffle', (t) => {
    const input = 'AABBCC';
    const result = shuffle(input);
    t.true(isValidShuffle(result));
    t.end();
});

test('AABBCCCCCC returns valid shuffle', (t) => {
    const input = 'AABBCCCCCC';
    const result = shuffle(input);
    t.false(isValidShuffle(result));
    t.end();
});

test('AABBCCCCC returns valid shuffle', (t) => {
    const input = 'AABBCCCCC';
    const result = shuffle(input);
    t.true(isValidShuffle(result));
    t.end();
});