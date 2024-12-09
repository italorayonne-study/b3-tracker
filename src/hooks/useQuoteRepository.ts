import { QuoteDatabase } from '@/src/types';
import { useSQLiteContext } from 'expo-sqlite';

export function useQuoteRepository() {

    const database = useSQLiteContext()

    async function create(data: Omit<QuoteDatabase, 'id'>) {

        const statement = await database.prepareAsync(
            'INSERT INTO quotes (name, stock, logo) VALUES ($name, $stock, $logo)'
        )

        try {

            const result = await statement.executeAsync({
                $name: data.name,
                $stock: data.stock,
                $logo: data.logo
            })

            console.log({
                message: 'resource created!',
                insertedRow: result.lastInsertRowId.toLocaleString()
            })

            return {
                message: 'resource created!',
                insertedRow: result.lastInsertRowId.toLocaleString()
            }

        } catch (e) {
            console.error(e)
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function findAll() {

        const query = 'SELECT * FROM quotes'

        try {
            const quotes = await database.getAllAsync<QuoteDatabase>(query)

            return quotes

        } catch (e) {
            console.error(e)
        }
    }

    async function remove() {
        const statement = 'DELETE FRM quotes'
        try {
            const result = await database.execAsync(statement)

            return result

        } catch (e) {
            console.error(e)
        }
    }

    return { create, findAll, remove }
}   