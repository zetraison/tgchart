import assert from "assert";
import {describe} from "mocha";
import {first, last, min, max, tail, head, fraction} from "../../src/app/helpers/array";

describe('Helpers Array Test', () => {

    const array = [33, 45, 76, 23, 5, 37, 83];

    describe('#first()', () =>
        it(`should return value ${33} for array [${array}]`, () => assert.equal(first(array), 33)));

    describe('#last()', () =>
        it(`should return value ${83} for array [${array}]`, () => assert.equal(last(array), 83)));

    describe('#min()', () =>
        it(`should return value ${5} for array [${array}]`, () => assert.equal(min(array), 5)));

    describe('#max()', () =>
        it(`should return value ${83} for array [${array}]`, () => assert.equal(max(array), 83)));

    describe('#tail()', () => {
        it(`should return [${tail(array)}] for array [${array}]`, () =>
            [45, 76, 23, 5, 37, 83].forEach((el, idx) =>
                assert.equal(tail(array)[idx], el)));
        it(`should return ${tail(array).length} is length of array tail for array [${array}]`, () =>
            assert.equal(tail(array).length, array.length - 1));
    });

    describe('#head()', () => {
        it(`should return [${head(array)}] for array [${array}]`, () =>
            assert.equal(head(array)[0], 33));
        it(`should return ${head(array).length} is length of array head for array [${array}]`, () =>
            assert.equal(head(array).length, 1));
    });

    describe('#fraction()', () => {
        it(`should return ${fraction(array, 0)} for percentage 0 for array [${array}]`, () =>
            assert.equal(fraction(array,0), 33));
        it(`should return ${fraction(array, 0.5)} for percentage 0.5 for array [${array}]`, () =>
            assert.equal(fraction(array,0.5), 58));
        it(`should return ${fraction(array, 1)} for percentage 1 for array [${array}]`, () =>
            assert.equal(fraction(array,1), 83));
    })
});