const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    test('should correctly read a whole number input', function () {
      assert.equal(convertHandler.getNum('32L'), 32);
    });
  
    test('should correctly read a decimal number input', function () {
      assert.equal(convertHandler.getNum('32.5L'), 32.5);
    });
  
    test('should correctly read a fractional input', function () {
      assert.equal(convertHandler.getNum('1/2L'), 0.5);
    });
  
    test('should correctly read a fractional input with a decimal', function () {
      assert.equal(convertHandler.getNum('5.4/3L'), 1.8);
    });
  
    test('should return an error on a double-fraction', function () {
      assert.equal(convertHandler.getNum('3/2/3L'), 'invalid number');
    });
  
    test('should default to a numerical input of 1 when no number is provided', function () {
      assert.equal(convertHandler.getNum('L'), 1);
    });
  
    test('should correctly read each valid input unit', function () {
      assert.equal(convertHandler.getUnit('32L'), 'L');
      assert.equal(convertHandler.getUnit('32gal'), 'gal');
    });
  
    test('should return an error for an invalid input unit', function () {
      assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
    });
  
    test('should return the correct return unit for each valid input unit', function () {
      assert.equal(convertHandler.getReturnUnit('gal'), 'L');
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    });
  
    test('should correctly return the spelled-out string unit for each valid input unit', function () {
      assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    });
  
    test('should correctly convert gal to L', function () {
      assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
    });
  
    test('should correctly convert L to gal', function () {
      assert.equal(convertHandler.convert(1, 'L'), 0.26417);
    });
  
    test('should correctly convert mi to km', function () {
      assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
    });
  
    test('should correctly convert km to mi', function () {
      assert.equal(convertHandler.convert(1, 'km'), 0.62137);
    });
  
    test('should correctly convert lbs to kg', function () {
      assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
    });
  
    test('should correctly convert kg to lbs', function () {
      assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
    });
  });