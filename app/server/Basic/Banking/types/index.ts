export interface IBankCard {
  bank_card_id: number,
  balance: number,
  pin_code: number,
  is_default: boolean
}

export interface IBankAccount {
  bank_account_id: number,
  cards: IBankCard[]
}
