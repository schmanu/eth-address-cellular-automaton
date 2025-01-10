// TypeScript implementation of a seeded random number generator using an Ethereum address as the seed

/**
 * Converts an Ethereum address into a numeric seed.
 * @param address - The Ethereum address (20 bytes, hex string starting with 0x)
 * @returns A numeric seed derived from the address
 */
function addressToSeed(address: string): number {
  // Remove the "0x" prefix if present and ensure the address is valid
  const cleanAddress = address.startsWith("0x") ? address.slice(2) : address;

  if (!/^([0-9a-fA-F]{40})$/.test(cleanAddress)) {
    throw new Error("Invalid Ethereum address");
  }

  // Convert the address to a numeric seed (sum of char codes mod 2^31 to avoid overflow)
  let seed = 0;
  for (let i = 0; i < cleanAddress.length; i++) {
    seed = (seed * 16 + parseInt(cleanAddress[i], 16)) % 0x7fffffff; // Mod 2^31
  }

  return seed;
}

/**
 * A seeded random number generator (linear congruential generator)
 */
class SeededRandomGenerator {
  private currentSeed: number;

  constructor(seed: number) {
    this.currentSeed = seed;
  }

  /**
   * Generates the next random number in the sequence.
   * @returns A pseudo-random number between 0 and 1
   */
  nextNumber(): number {
    // Linear Congruential Generator (LCG) parameters
    const a = 1664525;
    const c = 1013904223;
    const m = 0x7fffffff; // 2^31 - 1

    // Update seed and generate a random number
    this.currentSeed = (a * this.currentSeed + c) % m;

    // Normalize to range [0, 1]
    return this.currentSeed / m;
  }
}

/**
 * Creates a seeded random number generator from an Ethereum address.
 * @param address - The Ethereum address (20 bytes, hex string starting with 0x)
 * @returns An instance of SeededRandomGenerator
 */
export function randomFromAddress(address: string): SeededRandomGenerator {
  const seed = addressToSeed(address);
  return new SeededRandomGenerator(seed);
}
