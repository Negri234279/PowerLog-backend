import postgres from 'pg'
import { DB } from './common'

export const pool = new postgres.Pool(DB)