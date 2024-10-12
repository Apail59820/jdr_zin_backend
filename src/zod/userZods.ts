import { z } from 'zod';

export const userSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    energy: z.number().int().min(0, { message: "Energy must be a positive integer" }),
    maxEnergy: z.number().int().min(0, { message: "Max energy must be a positive integer" }),
    mana: z.number().int().min(0, { message: "Mana must be a positive integer" }),
    money: z.number().int().min(0, { message: "Money must be a positive integer" }),
    maxMana: z.number().int().min(0, { message: "Max mana must be a positive integer" }),
    maxHealth: z.number().int().min(0, { message: "Max health must be a positive integer" }),
    health: z.number().int().min(0, { message: "Health must be a positive integer" }),
    level: z.number().int().min(1, { message: "Level must be at least 1" }),
});