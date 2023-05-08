import { describe, it, expect } from 'vitest'
import { parseSmartQuery } from '../../src/utils/parse-smart-query'

describe('parseSmartQuery', () => {
    it('should return the correct query for a single key-value pair', () => {
        const query = 'name = "John"'
        const result = parseSmartQuery(query)
        expect(result).toEqual({ name: 'John' })
    })

    it('should return the correct query for multiple key-value pairs joined by "AND"', () => {
        const query = 'name = "John" AND age >= 30 AND city = "New York"'
        const result = parseSmartQuery(query)
        expect(result).toEqual({
            name: 'John',
            age: { $gte: 30 },
            city: 'New York'
        })
    })

    it('should return the correct query for multiple key-value pairs joined by "OR"', () => {
        const query = 'name = "John" OR name = "Jane"'
        const result = parseSmartQuery(query)
        expect(result).toEqual({ $or: [{ name: 'John' }, { name: 'Jane' }] })
    })

    it('should return the correct query for a "NOT-IN" query', () => {
        const query = 'name NOT-IN "Apple","Google","Microsoft"'
        const result = parseSmartQuery(query)
        console.log(result)
        expect(result).toEqual({
            name: { $nin: ['Apple', 'Google', 'Microsoft'] }
        })
    })

    it('should return the correct query for an "IN" query', () => {
        const query = 'name IN "Apple","Google","Microsoft"'
        const result = parseSmartQuery(query)
        expect(result).toEqual({
            name: { $in: ['Apple', 'Google', 'Microsoft'] }
        })
    })

    it('should return the correct query for a query with multiple operators', () => {
        const query = 'name="John" AND age >= 30 OR city = "New York"'
        const result = parseSmartQuery(query)
        expect(result).toEqual({
            $or: [{ age: { $gte: 30 }, name: 'John' }, { city: 'New York' }]
        })
    })
})