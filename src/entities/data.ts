import {
  DailyData,
  HourlyData,
  Swap,
  WeeklyData,
} from "../../generated/schema"

import { BigInt } from "@graphprotocol/graph-ts"
import { decimal } from "@protofire/subgraph-toolkit"

/* eslint-disable @typescript-eslint/no-non-null-assertion */

export function getHourlyTradeData(
  swap: Swap,
  timestamp: BigInt,
): HourlyData {
  let interval = BigInt.fromI32(60 * 60)
  let hour = timestamp.div(interval).times(interval)
  let id = swap.id + "-hour-" + hour.toString()

  let data = HourlyData.load(id)

  if (data == null) {
    data = new HourlyData(id)
    data.swap = swap.id
    data.timestamp = hour
    data.volume = decimal.ZERO
    data.balances = swap.balances
  }

  return data!
}

export function getDailyTradeData(
  swap: Swap,
  timestamp: BigInt,
): DailyData {
  let interval = BigInt.fromI32(60 * 60 * 24)
  let day = timestamp.div(interval).times(interval)
  let id = swap.id + "-day-" + day.toString()

  let data = DailyData.load(id)

  if (data == null) {
    data = new DailyData(id)
    data.swap = swap.id
    data.timestamp = day
    data.volume = decimal.ZERO
    data.balances = swap.balances
  }

  return data!
}

export function getWeeklyTradeData(
  swap: Swap,
  timestamp: BigInt,
): WeeklyData {
  let interval = BigInt.fromI32(60 * 60 * 24 * 7)
  let week = timestamp.div(interval).times(interval)
  let id = swap.id + "-week-" + week.toString()

  let data = WeeklyData.load(id)

  if (data == null) {
    data = new WeeklyData(id)
    data.swap = swap.id
    data.timestamp = week
    data.volume = decimal.ZERO
    data.balances = swap.balances
  }

  return data!
}
