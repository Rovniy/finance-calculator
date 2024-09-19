import { category } from './category'
import { owner } from './owner'
import { firebase } from './firebase'
import { transactions } from "./transactions";
import { datetime } from "~/config/datetime";

export const config = {
    isDev: true,
    category,
    firebase,
    transactions,
    datetime,
    owner
}