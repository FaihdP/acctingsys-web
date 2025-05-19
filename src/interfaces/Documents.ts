import type Expense from "./Expense";
import type Invoice from "./Invoice";
import type Payment from "./Payment";

type Documents = Invoice | Payment | Expense
export type { Documents }