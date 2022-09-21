import { Address, BigInt } from "@graphprotocol/graph-ts"

import { TokenIndex } from "../../generated/schema"

export function getOrCreateTokenIndex(
  index: BigInt,
  address: Address
): TokenIndex {
  let id = index.toString() + '-' + address.toHexString()
  let tokenIndex = TokenIndex.load(id)

  if (tokenIndex == null) {
    tokenIndex = new TokenIndex(id)
    tokenIndex.token = address.toHexString()
    tokenIndex.index = index
    tokenIndex.save()
  }

  return tokenIndex as TokenIndex
}
