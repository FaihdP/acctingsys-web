import type Expense from "./Expense";
import type Invoice from "./Invoice";
import type Payment from "./Payment";

type DocumentsArray = (Invoice | Payment | Expense)[]
export type { DocumentsArray }