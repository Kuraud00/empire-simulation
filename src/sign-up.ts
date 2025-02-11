import { Context, Random } from "koishi";
import { saveData, loadData, userInfo } from "./data-storage";
import path from 'path'

export async function signup(ctx: Context, config: any) {

  //config设置的参数
  const minGold = config.minGold
  const maxGold = config.maxGold
  const bonusCount = config.bonusCount
  const bonusGold = config.bonusGold

  //签到
  ctx.command('签到')
    .action(async ({ session }) => {
      //TO DO: 签到加钱，一天不可多次签到，连续签到有加成
      const userId = session.userId
      const user: userInfo = JSON.parse(await loadData(userId))

      //若从未签到过或今天没签到过，则签到
      if (user.last_sign_up == null || !isToday(user)) {

        if (isContinuous(user)) {
          user.bonus_count++
        }
        //用户信息处理,若连续签到次数大于设置最大次数，则设为最大次数
        let realBonusCount = user.bonus_count
        if (realBonusCount > bonusCount) {
          realBonusCount = bonusCount
        }

        const gold = getGold(minGold, maxGold, realBonusCount, bonusGold)
        console.log('USER:' + user.userId + ' add ' + gold + ' gold')
        user.coins += gold
        user.last_sign_up = new Date()
        saveData(user)
        session.send('今日已签到成功！获得了' + gold + '枚金币！')
      }
      //若已经签到过
      else {
        session.send('今天已经签到过啦！明天再来吧！')
      }
    })
}

//是否重复签到
function isToday(user: userInfo) {
  const temp = Date.now()
  const currentDate = new Date(temp)
  const userDate = new Date(user.last_sign_up)
  if (currentDate.getFullYear() != userDate.getFullYear() || currentDate.getMonth() != userDate.getMonth() || currentDate.getDay() != userDate.getDay()) {
    //不是同一天
    return false
  } else {
    //是同一天
    return true
  }
}

//是否连续签到
function isContinuous(user: userInfo) {
  const temp = Date.now()
  const currentDate = new Date(temp)
  const previousDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000)
  const userDate = new Date(user.last_sign_up)
  if (userDate.getFullYear() != previousDate.getFullYear() || userDate.getMonth() != previousDate.getMonth() || userDate.getDay() != previousDate.getDay()) {
    return true
  } else {
    return false
  }
}

//随机获取金币
function getGold(minGold, maxGold, bonusCount, bonusGold) {
  const gold = Random.int(maxGold - minGold + 1) + minGold + bonusCount * bonusGold
  return gold
}