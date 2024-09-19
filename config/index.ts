import { category } from './category'
import { owner } from './owner'
import { firebase } from './firebase'
import {transactions} from "./transactions";

export const config = {
    isDev: true,
    category,
    firebase,
    transactions,
    owner
}