import { Context, Schema, h } from 'koishi'
import { } from 'koishi-plugin-puppeteer'
import { } from 'koishi-plugin-smmcat-localstorage'
import { loadData, saveData, userInfo } from './data-storage'
import { signup } from './sign-up'

export const name = 'empire-simulation'

export const inject = ['puppeteer']
export const usage = '目前支持功能：农场种菜'

//前端配件配置数据
export interface Config {
  filePath: string; // 存储地址
  minGold: number; // 单次签到最少金币数
  maxGold: number; // 单次签到最多金币数
  bonusGold: number; // 每连续签到一次额外获得的金币数
  bonusCount: number; // 最多连续签到次数
  farmLevelMultiplier: number; // 农场等级所需经验递增倍数
  farmTimeToGrow: number; // 作物生长时长
  farmMaxLevel: number; // 农场封顶等级
}

//前端插件可修改部分
export const Config: Schema<Config> = Schema.intersect([
  //通用部分
  Schema.object({
    filePath: Schema.string().default('data.json').description('数据文件存储地址')
  }).description('通用'),

  //签到部分配置项目
  Schema.object({
    minGold: Schema.number().default(10).description('单次签到**最少**金币数'),
    maxGold: Schema.number().default(20).description('单次签到**最多**金币数'),
    bonusGold: Schema.number().default(2).description('每连续签到一次额外获得的金币数'),
    bonusCount: Schema.number().default(7).description('最多连续签到次数'),
  }).description('签到部分配置'),

  //农场部分配置项目
  Schema.object({
    farmLevelMultiplier: Schema.number().default(1.1).description('农场等级所需经验递增倍数'),
    farmTimeToGrow: Schema.number().default(2).description('作物生长时长'),
    farmMaxLevel: Schema.number().default(5).description('农场封顶等级'),
  }).description('农场部分配置')
])

export function apply(ctx: Context, config: Config) {

  //注册签到相关指令
  signup(ctx,config)

  ctx.command('个人信息')
    .action(async ({ session }) => {
      const temp: userInfo = JSON.parse(await loadData(session.userId))
      session.send(':\n※持有金币数：' + temp.coins + '\n※农场等级：' + temp.farm_level)
    })

  //种田主命令
  ctx.command('种田')
    .action(({ session }) => {
      session.send('主命令')
    })

  //子命令
  ctx.command('种田').subcommand('.查询')
    .action(async ({ session }) => {
      const temp: userInfo = JSON.parse(await loadData(session.userId))
      //TO DO：查询作物信息，遍历本地数据并更新
    })

  ctx.command('种田').subcommand('.查看农场')
    .action(async ({ session }) => {
      const temp: userInfo = JSON.parse(await loadData(session.userId))

    })
}
