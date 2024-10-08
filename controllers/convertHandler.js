class ConvertHandler {
  // Parses the input to extract number and unit
  getNum(input) {
    // Match any pattern that looks like a number, decimal, or fraction
    const numberPattern = /^[\d/.]+/;
    const match = input.match(numberPattern);
    
    if (match) {
      const numStr = match[0];

      // Check if the number contains multiple fractions (more than one '/')
      if (numStr.split('/').length > 2) {
        return 'invalid number'; // Double-fraction is invalid
      }

      try {
        // Try to evaluate the fraction or number (e.g., 1/2, 5.4/3, etc.)
        const result = eval(numStr);
        if (isNaN(result)) {
          return 'invalid number';
        }
        return result;
      } catch (err) {
        return 'invalid number';
      }
    }

    return 1; // Default to 1 if no number is provided
  }

  getUnit(input) {
    // Match alphabet characters at the end of the input to extract unit
    const unitPattern = /[a-zA-Z]+$/;
    const match = input.match(unitPattern);
    if (!match) return 'invalid unit';

    let unit = match[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    if (validUnits.includes(unit)) {
      // Return 'L' for liters (uppercase for this unit only)
      return unit === 'l' ? 'L' : unit;
    } else {
      return 'invalid unit';
    }
  }

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

  convert(initNum, initUnit) {
    const conversionRates = {
      gal: 3.78541,
      L: 1 / 3.78541,
      lbs: 0.453592,
      kg: 1 / 0.453592,
      mi: 1.60934,
      km: 1 / 1.60934,
    };
    // Check if the unit is valid before conversion
    if (!conversionRates[initUnit]) return 'invalid unit';

    return parseFloat((initNum * conversionRates[initUnit]).toFixed(5));
  }
}

module.exports = ConvertHandler;
