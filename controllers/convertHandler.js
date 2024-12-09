class ConvertHandler {
  // Parses the input to extract the number and validate format
  getNum(input) {
    const numberPattern = /^[\d.\/]+/;
    const match = input.match(numberPattern);

    if (!match) return 1; // Default to 1 if no number is provided

    const numString = match[0];
    const fractionParts = numString.split('/');

    // Reject invalid multiple fractions
    if (fractionParts.length > 2) return 'invalid number';

    try {
      // Evaluate fraction or parse float
      return fractionParts.length === 2
        ? parseFloat(fractionParts[0]) / parseFloat(fractionParts[1])
        : parseFloat(fractionParts[0]);
    } catch (error) {
      return 'invalid number';
    }
  }

  // Extracts and validates the unit from the input
  getUnit(input) {
    const unitPattern = /[a-zA-Z]+$/;
    const match = input.match(unitPattern);

    if (!match) return 'invalid unit';

    const unit = match[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    // Normalize and return units
    return validUnits.includes(unit) ? (unit === 'l' ? 'L' : unit) : 'invalid unit';
  }

  // Maps input units to their respective return units
  getReturnUnit(initUnit) {
    const unitMap = {
      gal: 'L',
      L: 'gal',
      lbs: 'kg',
      kg: 'lbs',
      mi: 'km',
      km: 'mi',
    };
    return unitMap[initUnit] || 'invalid unit';
  }

  // Returns the spelled-out form of units
  spellOutUnit(unit) {
    const spellOutMap = {
      gal: 'gallons',
      L: 'liters',
      lbs: 'pounds',
      kg: 'kilograms',
      mi: 'miles',
      km: 'kilometers',
    };
    return spellOutMap[unit] || 'invalid unit';
  }

  // Converts the given number and unit to the target unit
  convert(initNum, initUnit) {
    const conversionRates = {
      gal: 3.78541, // 1 gal = 3.78541 L
      L: 1 / 3.78541, // 1 L = 0.26417 gal
      lbs: 0.453592, // 1 lbs = 0.453592 kg
      kg: 1 / 0.453592, // 1 kg = 2.20462 lbs
      mi: 1.60934, // 1 mi = 1.60934 km
      km: 1 / 1.60934, // 1 km = 0.62137 mi
    };

    const rate = conversionRates[initUnit];
    if (!rate) return 'invalid unit';

    return parseFloat((initNum * rate).toFixed(5));
  }
}

module.exports = ConvertHandler;
